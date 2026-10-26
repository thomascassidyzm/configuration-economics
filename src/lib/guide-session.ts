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
import { counterStore } from './guide-store';

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
// ({t:3,o:0} after the reader has since spent the cap), and nothing held in one
// serverless instance's memory can stop a replay that lands on another (#369).
// So the token's Opus count is only a cheap first check; the cap itself is a
// counter per session id in the shared store (guide-store.ts), taken BEFORE the
// Anthropic call — check and take are one atomic step there, so overlapping
// requests on any mix of instances cannot all see the same headroom — and
// given back if the call fails. A replayed token carries the same session id,
// so it meets the same counter.
//
// The counter outlives any reading session the token could prove (6 h).
const OPUS_TTL_MS = 6 * 60 * 60 * 1000;

export interface OpusReservation {
  /** The Opus answer was served: the slot stays spent. */
  commit(): void;
  /** The call failed: give the slot back. */
  release(): void;
}

/**
 * Take one Opus slot for this session from the shared counter, or null if the
 * cap — answers spent AND calls in flight, across every instance — is full.
 * Null too when the store is missing or down: failing closed means Sonnet.
 */
export async function reserveOpus(state: SessionState, site: string): Promise<OpusReservation | null> {
  if (!state.sid) return null;
  const store = counterStore();
  if (!store) return null;
  const key = `alexander:${site}:opus:${state.sid}`;
  try {
    if (!(await store.take(key, OPUS_PER_SESSION, OPUS_TTL_MS))) return null;
  } catch (err) {
    console.warn('[guide] counter store unavailable; Opus shut for this turn:', err);
    return null;
  }
  let settled = false;
  return {
    commit: () => {
      settled = true;
    },
    release: () => {
      if (settled) return;
      settled = true;
      // Best effort: a lost give-back leaves the reader one Opus short, never one over.
      store.give(key).catch(() => {});
    },
  };
}

function keyFrom(apiKey: string): Buffer {
  return createHmac('sha256', 'alexander-session-v1').update(apiKey).digest();
}

function sign(key: Buffer, payload: string): string {
  return createHmac('sha256', key).update(payload).digest('base64url');
}

export function issueSession(apiKey: string, state: SessionState): string {
  const sid = state.sid ?? randomBytes(12).toString('base64url');
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
  // The shared counter in reserveOpus() is the cap; this only spares it a
  // round trip when the token itself already says the cap is spent.
  const opusAllowed = historyUserTurns <= proven.turns && proven.opus < OPUS_PER_SESSION;
  return { state: proven, opusAllowed };
}
