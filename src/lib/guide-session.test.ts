import { describe, it, expect } from 'vitest';
import { issueSession, readSession, sessionGate } from './guide-session';
import { OPUS_PER_SESSION } from './guide-request';

const KEY = 'sk-test-not-a-real-key';

describe('the signed session — the hard per-session Opus cap', () => {
  it('round-trips what it signed', () => {
    const token = issueSession(KEY, { turns: 3, opus: 1 });
    expect(readSession(KEY, token)).toEqual({ turns: 3, opus: 1 });
  });

  it('rejects a token signed with another key', () => {
    expect(readSession(KEY, issueSession('another-key', { turns: 9, opus: 0 }))).toBeNull();
  });

  it('rejects a payload edited to reset the Opus count', () => {
    const token = issueSession(KEY, { turns: 4, opus: OPUS_PER_SESSION });
    const [, mac] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ v: 1, t: 4, o: 0 })).toString('base64url');
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
    expect(g.state).toEqual({ turns: 0, opus: 0 });
    expect(g.opusAllowed).toBe(false);
  });
});
