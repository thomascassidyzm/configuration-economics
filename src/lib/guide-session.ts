// The reading session, as the SERVER saw it.
//
// The endpoint is stateless and the client owns the history, so "how many Opus
// answers has this session had?" cannot be answered from anything the client
// says. Instead the server hands back a signed token after every answer —
// turns served, Opus answers spent — and the client echoes it on the next
// request. The HMAC makes the count unforgeable; dropping the token just starts
// a new session at zero turns, and a zero-turn session cannot reach Opus,
// because Opus is only ever earned by REPEATED confusion over turns the server
// itself served.
//
// The signing key is derived from ANTHROPIC_API_KEY so the cap needs no new
// environment variable: anyone who can forge it already holds the key it
// protects. Rotating that key simply starts every live session afresh.
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { OPUS_PER_SESSION } from './guide-request';

export interface SessionState {
  /** User turns this server has answered in the session. */
  turns: number;
  /** Opus answers spent in the session. */
  opus: number;
  /** Server-minted session id; lets the server notice a replayed older token. */
  sid?: string;
}

const FRESH: SessionState = { turns: 0, opus: 0 };

// A signature stops EDITING a token, not REPLAYING an earlier genuine one
// ({t:3,o:0} after the reader has since spent the cap). So the server also
// remembers, per session id, the furthest state it has ever issued, and a token
// that is behind that mark is stale: it is treated as already past the cap.
// Module-level like the rate limiter — it holds within one serverless instance
// and is bounded (TTL + size cap). Across cold instances a replay can still
// fork the session; the per-IP escalated budget in guide.ts is the backstop.
//
// The ledger also holds Opus RESERVATIONS. Eligibility is checked before the
// Anthropic call and the use is only recorded after it, so without a hold every
// request that overlaps in that window sees the same headroom and all of them
// get Opus. reserveOpus() takes the slot synchronously — no await between the
// check and the take — and the endpoint commits it when the answer is served
// or releases it when the call fails.
const LEDGER_TTL_MS = 6 * 60 * 60 * 1000;
const LEDGER_MAX = 5000;
interface LedgerEntry { turns: number; opus: number; held: number; at: number }
const ledger = new Map<string, LedgerEntry>();

function prune(keep: string): void {
  const now = Date.now();
  for (const [k, v] of ledger) if (v.held === 0 && now - v.at > LEDGER_TTL_MS) ledger.delete(k);
  if (ledger.size < LEDGER_MAX || ledger.has(keep)) return;
  for (const [k, v] of ledger) {
    if (ledger.size < LEDGER_MAX) break;
    if (v.held === 0) ledger.delete(k);
  }
}

function entryFor(sid: string): LedgerEntry {
  let e = ledger.get(sid);
  if (!e) {
    prune(sid);
    e = { turns: 0, opus: 0, held: 0, at: Date.now() };
    ledger.set(sid, e);
  }
  return e;
}

function remember(sid: string, state: SessionState): void {
  const e = entryFor(sid);
  e.turns = Math.max(e.turns, state.turns);
  e.opus = Math.max(e.opus, state.opus);
  e.at = Date.now();
}

export interface OpusReservation {
  /** The Opus answer was served: the slot becomes a spent use. */
  commit(): void;
  /** The call failed: give the slot back. */
  release(): void;
}

/**
 * Take one Opus slot for this session, or null if the cap — counting answers
 * already spent AND calls still in flight — is full. Synchronous on purpose:
 * the check and the take cannot be split by another request.
 */
export function reserveOpus(state: SessionState): OpusReservation | null {
  if (!state.sid) return null;
  const e = entryFor(state.sid);
  e.opus = Math.max(e.opus, state.opus);
  if (e.opus + e.held >= OPUS_PER_SESSION) return null;
  e.held += 1;
  e.at = Date.now();
  let settled = false;
  const settle = (spent: boolean) => {
    if (settled) return;
    settled = true;
    e.held -= 1;
    if (spent) e.opus += 1;
    e.at = Date.now();
  };
  return { commit: () => settle(true), release: () => settle(false) };
}

/** Test hook: forget every remembered session. */
export function _resetSessionLedger(): void {
  ledger.clear();
}

function keyFrom(apiKey: string): Buffer {
  return createHmac('sha256', 'alexander-session-v1').update(apiKey).digest();
}

function sign(key: Buffer, payload: string): string {
  return createHmac('sha256', key).update(payload).digest('base64url');
}

export function issueSession(apiKey: string, state: SessionState): string {
  const sid = state.sid ?? randomBytes(12).toString('base64url');
  remember(sid, state);
  const payload = Buffer.from(JSON.stringify({ v: 2, t: state.turns, o: state.opus, s: sid })).toString('base64url');
  return `${payload}.${sign(keyFrom(apiKey), payload)}`;
}

/** The state the token proves, or null if it is absent, malformed or forged. */
export function readSession(apiKey: string, token: unknown): SessionState | null {
  if (typeof token !== 'string' || token.length > 512) return null;
  const [payload, mac] = token.split('.');
  if (!payload || !mac) return null;
  const expected = Buffer.from(sign(keyFrom(apiKey), payload));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const p = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (p?.v !== 2 || !Number.isInteger(p.t) || !Number.isInteger(p.o) || p.t < 0 || p.o < 0) return null;
    if (typeof p.s !== 'string' || p.s.length === 0 || p.s.length > 64) return null;
    return { turns: p.t, opus: p.o, sid: p.s };
  } catch {
    return null;
  }
}

/**
 * Where this request stands, and whether Opus is still reachable.
 *
 * Opus needs all three: a genuine token, a history no longer than the turns
 * the server actually served (the client trims history, so shorter is fine;
 * longer means the confusion being cited was never answered here), and cap
 * headroom. An invalid or missing token is a fresh session — never an error,
 * because a reader opening a new tab is not misbehaving.
 */
export function sessionGate(
  apiKey: string,
  token: unknown,
  historyUserTurns: number,
): { state: SessionState; opusAllowed: boolean } {
  const proven = readSession(apiKey, token);
  if (proven === null) return { state: FRESH, opusAllowed: false };
  // Replay guard: a token behind the server's own record of this session is
  // stale. Carry the record forward (so the re-issued token is current) and
  // shut Opus, since the reader has already had at least what the record says.
  const seen = proven.sid ? ledger.get(proven.sid) : undefined;
  const stale = !!seen && (proven.opus < seen.opus || proven.turns < seen.turns);
  const state: SessionState = stale
    ? { turns: seen!.turns, opus: seen!.opus, sid: proven.sid }
    : proven;
  const opusAllowed =
    !stale &&
    historyUserTurns <= proven.turns &&
    proven.opus + (seen?.held ?? 0) < OPUS_PER_SESSION;
  return { state, opusAllowed };
}
