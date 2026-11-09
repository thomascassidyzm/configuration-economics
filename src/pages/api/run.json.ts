import type { APIRoute } from 'astro';
import { getRun, listRuns } from '../../lib/run-store';

export const prerender = false;

// The run as data, for agents and for the page's own poll. Read-only, no
// cookie, records nothing. ?id=run-001 for one run; no id lists them all.
export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id');
  const body = id ? await getRun(id) : { runs: await listRuns() };
  return new Response(JSON.stringify(body), {
    status: body ? 200 : 404,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'access-control-allow-origin': '*' },
  });
};
