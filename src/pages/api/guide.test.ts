// The Opus cap under concurrency: overlapping requests on one session must not
// all pass the cap check while the first is still waiting on Anthropic — and
// must not when they land on different serverless instances either (#369).
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { issueSession } from '../../lib/guide-session';
import { OPUS_PER_SESSION, MODELS } from '../../lib/guide-request';
import { memoryStore } from '../../lib/guide-store';

const KEY = 'sk-test-not-a-real-key';

const history = [
  { role: 'user', content: "i don't understand the action functional" },
  { role: 'assistant', content: 'It is an integral over the trajectory...' },
];
const message = "i still don't understand the action functional";

// Every call is served by a FRESH instance of the endpoint: the module is
// re-imported, so nothing held in module memory carries from one call to the
// next. Only what the shared store holds can.
let ipSeq = 0;
async function call(session: string, ip: string) {
  vi.resetModules();
  const { POST } = await import('./guide');
  const request = new Request('https://example.test/api/guide', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify({ message, history, session }),
  });
  return (await POST({ request } as any)) as Response;
}

// Upstash's REST API, played by an in-memory store: ['EVAL', script, '1', key, ...args].
const KV_URL = 'https://kv.example.test';
let redis = memoryStore();
let redisDown = false;
async function kv(init: RequestInit): Promise<Response> {
  if (redisDown) return new Response('down', { status: 503 });
  const [, script, , key, ...args] = JSON.parse(String(init.body));
  let result: unknown = 0;
  if (script.includes('PTTL')) {
    const { count, resetMs } = await redis.hit(key, Number(args[0]));
    result = [count, resetMs];
  } else if (script.includes('ARGV[2]')) {
    result = (await redis.take(key, Number(args[0]), Number(args[1]))) ? 1 : 0;
  } else {
    await redis.give(key);
  }
  return new Response(JSON.stringify({ result }), { status: 200 });
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
  const fn = vi.fn(async (url: string, init: RequestInit) => {
    if (String(url).startsWith(KV_URL)) return kv(init);
    const model = JSON.parse(String(init.body)).model;
    models.push(model);
    await gate;
    return respond(model);
  });
  vi.stubGlobal('fetch', fn);
  return { models, release };
}

async function until(cond: () => boolean) {
  const end = Date.now() + 3000;
  while (!cond() && Date.now() < end) await new Promise((r) => setTimeout(r, 1));
}

beforeEach(() => {
  redis = memoryStore();
  redisDown = false;
  vi.stubEnv('ANTHROPIC_API_KEY', KEY);
  vi.stubEnv('KV_REST_API_URL', KV_URL);
  vi.stubEnv('KV_REST_API_TOKEN', 'kv-test-token');
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

describe('the counters are shared across instances (#369)', () => {
  it('a replayed early token on a fresh instance each time still gets only the cap in Opus', async () => {
    const early = issueSession(KEY, { turns: 1, opus: 0 });
    const ip = `10.0.1.${++ipSeq}`;
    const held = heldFetch();
    held.release();
    const families: string[] = [];
    for (let i = 0; i < 3; i++) families.push((await (await call(early, ip)).json()).model);
    expect(families.filter((f) => f === 'opus')).toHaveLength(OPUS_PER_SESSION);
    expect(families.filter((f) => f === 'sonnet')).toHaveLength(3 - OPUS_PER_SESSION);
  });

  it('the per-IP budget holds across instances', async () => {
    const ip = `10.0.2.${++ipSeq}`;
    const held = heldFetch();
    held.release();
    const statuses: number[] = [];
    for (let i = 0; i < 16; i++) statuses.push((await call('', ip)).status);
    expect(statuses.slice(0, 15).every((s) => s === 200)).toBe(true);
    expect(statuses[15]).toBe(429);
  });

  it('store down: the stuck turn is answered by Sonnet, not refused and not Opus', async () => {
    redisDown = true;
    const held = heldFetch();
    held.release();
    const res = await call(issueSession(KEY, { turns: 1, opus: 0 }), `10.0.3.${++ipSeq}`);
    expect(res.status).toBe(200);
    expect((await res.json()).model).toBe('sonnet');
    expect(held.models).toEqual([MODELS.sonnet]);
  });

  it('no store configured: same — Sonnet', async () => {
    vi.stubEnv('KV_REST_API_URL', '');
    const held = heldFetch();
    held.release();
    const body = await (await call(issueSession(KEY, { turns: 1, opus: 0 }), `10.0.4.${++ipSeq}`)).json();
    expect(body.model).toBe('sonnet');
  });
});
