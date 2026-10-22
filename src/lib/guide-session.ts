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
import { createHmac, timingSafeEqual } from 'node:crypto';
import { OPUS_PER_SESSION } from './guide-request';

export interface SessionState {
  /** User turns this server has answered in the session. */
  turns: number;
  /** Opus answers spent in the session. */
  opus: number;
}

const FRESH: SessionState = { turns: 0, opus: 0 };

function keyFrom(apiKey: string): Buffer {
  return createHmac('sha256', 'alexander-session-v1').update(apiKey).digest();
}

function sign(key: Buffer, payload: string): string {
  return createHmac('sha256', key).update(payload).digest('base64url');
}

export function issueSession(apiKey: string, state: SessionState): string {
  const payload = Buffer.from(JSON.stringify({ v: 1, t: state.turns, o: state.opus })).toString('base64url');
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
    if (p?.v !== 1 || !Number.isInteger(p.t) || !Number.isInteger(p.o) || p.t < 0 || p.o < 0) return null;
    return { turns: p.t, opus: p.o };
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
  const state = proven ?? FRESH;
  const opusAllowed =
    proven !== null && historyUserTurns <= proven.turns && proven.opus < OPUS_PER_SESSION;
  return { state, opusAllowed };
}
