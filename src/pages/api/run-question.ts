import type { APIRoute } from 'astro';
import { counterStore } from '../../lib/guide-store';
import { getRun } from '../../lib/run-store';

export const prerender = false;

// A reader's question for Sagredo. The ONE write a visitor can make to the
// room, and it is narrow on purpose: only while a run is live, 400 characters,
// three an hour per address, twenty waiting at most. The question is never
// shown verbatim on the page: Sagredo carries it in his own words, so the
// public thread is only ever what a seat said. It reaches no person.
const MAX_LEN = 400;
const PER_HOUR = 3;
const QUEUE_CAP = 20;

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}

export const POST: APIRoute = async ({ request }) => {
  let body: { id?: unknown; q?: unknown };
  try { body = await request.json(); } catch { return json(400, { error: 'send JSON: {"id":"run-001","q":"your question"}' }); }
  const id = typeof body.id === 'string' ? body.id : '';
  const q = typeof body.q === 'string' ? body.q.replace(/\s+/g, ' ').trim() : '';
  if (!q || q.length > MAX_LEN) return json(400, { error: `a question of 1-${MAX_LEN} characters` });

  const run = await getRun(id);
  if (!run || run.state !== 'running') return json(409, { error: 'questions are taken only while a run is live' });

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const store = counterStore();
  if (!url || !token || !store) return json(503, { error: 'the room store is unavailable' });

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  try {
    const { count } = await store.hit(`ce-room:q:ip:${ip}`, 60 * 60 * 1000);
    if (count > PER_HOUR) return json(429, { error: 'three questions an hour, please' });
    const call = async (cmd: unknown[]) => {
      const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd), signal: AbortSignal.timeout(1500) });
      if (!res.ok) throw new Error(String(res.status));
      return (await res.json()).result;
    };
    const key = `ce-room:run:${id}:questions`;
    if (Number(await call(['LLEN', key])) >= QUEUE_CAP) return json(429, { error: 'Sagredo already has a full pocket of questions' });
    await call(['RPUSH', key, q]);
    await call(['EXPIRE', key, 60 * 60 * 24]);
  } catch {
    return json(503, { error: 'the room store did not answer' });
  }
  return json(200, { ok: true, note: 'Sagredo will carry it, in his own words, at his next turn.' });
};
