import { describe, it, expect, beforeEach } from 'vitest';
import { issueSession, readSession, sessionGate, _resetSessionLedger } from './guide-session';
import { OPUS_PER_SESSION } from './guide-request';

const KEY = 'sk-test-not-a-real-key';
beforeEach(() => _resetSessionLedger());

describe('the signed session — the hard per-session Opus cap', () => {
  it('round-trips what it signed', () => {
    const token = issueSession(KEY, { turns: 3, opus: 1 });
    expect(readSession(KEY, token)).toMatchObject({ turns: 3, opus: 1 });
  });

  it('rejects a token signed with another key', () => {
    expect(readSession(KEY, issueSession('another-key', { turns: 9, opus: 0 }))).toBeNull();
  });

  it('rejects a payload edited to reset the Opus count', () => {
    const token = issueSession(KEY, { turns: 4, opus: OPUS_PER_SESSION });
    const [, mac] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ v: 2, t: 4, o: 0, s: 'x' })).toString('base64url');
    expect(readSession(KEY, `${forged}.${mac}`)).toBeNull();
  });

  it('treats garbage as no session', () => {
    for (const t of [undefined, null, '', 'abc', 'a.b', 42, {}, 'x'.repeat(600)]) {
      expect(readSession(KEY, t)).toBeNull();
    }
  });

  it('opens Opus only for a proven session within the cap', () => {
    const ok = sessionGate(KEY, issueSession(KEY, { turns: 2, opus: 0 }), 2);
    expect(ok.opusAllowed).toBe(true);
  });

  it('shuts Opus once the cap is spent', () => {
    const spent = sessionGate(KEY, issueSession(KEY, { turns: 5, opus: OPUS_PER_SESSION }), 3);
    expect(spent.opusAllowed).toBe(false);
  });

  it('shuts Opus when the history cites turns the server never served', () => {
    const g = sessionGate(KEY, issueSession(KEY, { turns: 1, opus: 0 }), 4);
    expect(g.opusAllowed).toBe(false);
  });

  it('starts a fresh session, Opus shut, when the token is missing', () => {
    const g = sessionGate(KEY, undefined, 3);
    expect(g.state).toMatchObject({ turns: 0, opus: 0 });
    expect(g.opusAllowed).toBe(false);
  });

  it('does not let a replayed earlier token reset the Opus count', () => {
    // The server grants Opus up to the cap, re-signing each time; the attacker
    // keeps the early {t:3,o:0} token and replays it instead of the fresh one.
    const early = issueSession(KEY, { turns: 3, opus: 0 });
    const sid = readSession(KEY, early)!.sid;
    let granted = 0;
    let token = early;
    for (let i = 0; i < 5; i++) {
      const g = sessionGate(KEY, token, 3);
      if (g.opusAllowed) granted++;
      issueSession(KEY, { sid, turns: g.state.turns + 1, opus: g.state.opus + (g.opusAllowed ? 1 : 0) });
      token = early;
    }
    expect(granted).toBeLessThanOrEqual(OPUS_PER_SESSION);
    expect(sessionGate(KEY, early, 3).opusAllowed).toBe(false);
  });
});
