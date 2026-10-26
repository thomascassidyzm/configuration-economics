// The Opus cap under concurrency: overlapping requests on one session must not
// all pass the cap check while the first is still waiting on Anthropic.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { POST } from './guide';
import { issueSession, _resetSessionLedger } from '../../lib/guide-session';
import { OPUS_PER_SESSION, MODELS } from '../../lib/guide-request';

const KEY = 'sk-test-not-a-real-key';

const history = [
  { role: 'user', content: "i don't understand the action functional" },
  { role: 'assistant', content: 'It is an integral over the trajectory...' },
];
const message = "i still don't understand the action functional";

let ipSeq = 0;
function call(session: string, ip: string) {
  const request = new Request('https://example.test/api/guide', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify({ message, history, session }),
  });
  return POST({ request } as any) as Promise<Response>;
}

const answer = () =>
  new Response(JSON.stringify({ content: [{ type: 'text', text: 'ok' }], stop_reason: 'end_turn', usage: {} }), {
    status: 200,
  });

// Holds every Anthropic call open until release(), recording which model it asked for.
function heldFetch(respond: (model: string) => Response = answer) {
  const models: string[] = [];
  let release!: () => void;
  const gate = new Promise<void>((r) => (release = r));
  const fn = vi.fn(async (_url: string, init: RequestInit) => {
    const model = JSON.parse(String(init.body)).model;
    models.push(model);
    await gate;
    return respond(model);
  });
  vi.stubGlobal('fetch', fn);
  return { models, release };
}

async function until(cond: () => boolean) {
  for (let i = 0; i < 200 && !cond(); i++) await new Promise((r) => setTimeout(r, 1));
}

beforeEach(() => {
  _resetSessionLedger();
  vi.stubEnv('ANTHROPIC_API_KEY', KEY);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('Opus cap — reserved before the call', () => {
  it('three overlapping stuck requests on one session get at most the cap in Opus', async () => {
    const token = issueSession(KEY, { turns: 1, opus: 0 });
    const ip = `10.0.0.${++ipSeq}`;
    const held = heldFetch();

    const pending = [call(token, ip), call(token, ip), call(token, ip)];
    await until(() => held.models.length === 3);
    // All three are in flight at once; the cap was decided before any returned.
    expect(held.models).toHaveLength(3);
    expect(held.models.filter((m) => m === MODELS.opus)).toHaveLength(OPUS_PER_SESSION);

    held.release();
    const bodies = await Promise.all(pending.map(async (p) => (await p).json()));
    expect(bodies.filter((b) => b.model === 'opus')).toHaveLength(OPUS_PER_SESSION);
    expect(bodies.filter((b) => b.model === 'sonnet')).toHaveLength(3 - OPUS_PER_SESSION);
  });

  it('a failed Opus call gives its slot back', async () => {
    const token = issueSession(KEY, { turns: 1, opus: OPUS_PER_SESSION - 1 });
    const ip = `10.0.0.${++ipSeq}`;

    const failing = heldFetch(() => new Response('upstream down', { status: 529 }));
    failing.release();
    expect((await call(token, ip)).status).toBe(500);
    expect(failing.models).toEqual([MODELS.opus]);

    const ok = heldFetch();
    ok.release();
    const body = await (await call(token, ip)).json();
    expect(body.model).toBe('opus');
  });
});
