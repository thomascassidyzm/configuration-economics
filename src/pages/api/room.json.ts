import type { APIRoute } from 'astro';
import { loadRoom } from '../../lib/room';

export const prerender = false;

// Read-only. The room has no write endpoint: a turn arrives as a commit, and
// the deploy publishes it. This exists so a watcher does not have to reload —
// it takes an index and returns what is after it. It accepts nothing about
// the visitor, sets no cookie, and records nothing anywhere: there is no
// feedback channel of any kind reaching the participants, by construction.
export const GET: APIRoute = ({ url }) => {
  const files = import.meta.glob('../../content/room/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
  const sessions = loadRoom(files);
  const after = Number(url.searchParams.get('after') ?? -1);

  const turns = sessions.flatMap(s =>
    s.turns.filter(t => t.index > after).map(t => ({ ...t, sessionTitle: s.title }))
  );
  const total = sessions.reduce((n, s) => n + s.turns.length, 0);

  return new Response(JSON.stringify({ total, turns }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  });
};
