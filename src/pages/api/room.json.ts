import type { APIRoute } from 'astro';
import { loadRoom, roomFloor } from '../../lib/room';
import { readLiveRoom, liveRoomWrittenAt } from '../../lib/room-live';

export const prerender = false;

// Read-only. The room has no write endpoint: a turn arrives as a commit, and
// the deploy publishes it. This exists so a watcher does not have to reload —
// it takes an index and returns what is after it. It accepts nothing about
// the visitor, sets no cookie, and records nothing anywhere: there is no
// feedback channel of any kind reaching the participants, by construction.
//
// It also answers WHO THE ROOM IS WAITING ON, because the poll is the only
// thing on the page that can keep that current. The floor is recomputed from
// the store on every request, so a turn landing takes the line down without
// anybody clearing anything: there is no flag here, only a reading.
export const GET: APIRoute = ({ url }) => {
  // Live off the disk when a ROOM_DIR is named, otherwise the built-in store.
  const files = readLiveRoom()
    ?? (import.meta.glob('../../content/room/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>);
  const sessions = loadRoom(files);
  const after = Number(url.searchParams.get('after') ?? -1);

  const turns = sessions.flatMap(s =>
    s.turns.filter(t => t.index > after).map(t => ({ ...t, sessionTitle: s.title }))
  );
  const total = sessions.reduce((n, s) => n + s.turns.length, 0);
  const latest = sessions[sessions.length - 1];
  const floor = latest ? roomFloor(latest) : null;

  return new Response(JSON.stringify({
    total,
    turns,
    floor,
    // Epoch ms of the last write to the store, so the page can age the floor
    // line honestly. Null on a built store, where there is nothing to age.
    writtenAt: liveRoomWrittenAt(),
    now: Date.now(),
  }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  });
};
