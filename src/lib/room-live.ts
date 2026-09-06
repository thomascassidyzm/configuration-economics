// Reading the room LIVE, off the disk, at request time.
//
// The room is files in the repo, and on Vercel that is exactly right: a turn
// arrives as a commit, the deploy publishes it, and `import.meta.glob` bakes
// the store into the build. But a session takes hours, and during those hours
// the only place the new turns exist is the working tree of whichever checkout
// is writing them. A build-time glob cannot see a file that did not exist when
// the build ran, so on a build-time store there is nothing to open while a
// session runs — which was the whole complaint.
//
// So: when ROOM_DIR is set, the store is read from that directory with fs on
// every request, and the page is as current as the filesystem. When it is not
// set, nothing changes and the glob is used. One switch, no second renderer,
// and the deployed site keeps the immutable-store property that makes the
// no-edit rule auditable.
//
// SERVER ONLY. Never import this from client script.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The room files as { path: contents }, in the same shape `loadRoom` takes
 * from the glob, read fresh from ROOM_DIR. Null when ROOM_DIR is unset, which
 * is the caller's signal to use its build-time glob instead.
 *
 * A read that fails returns null rather than throwing: a half-written file
 * during a live session must not take the page down. The watcher then sees the
 * store as of the last good read, which is a stale page rather than no page.
 */
export function readLiveRoom(): Record<string, string> | null {
  const raw = process.env.ROOM_DIR;
  if (!raw) return null;
  // A colon-separated list, because a live session is written in whichever
  // checkout the session's own worker was given, and guessing which one
  // wrongly means a watcher stares at a page that never moves. Later
  // directories win on a name collision, so the live tree is named last.
  const dirs = raw.split(':').map(d => d.trim()).filter(Boolean);
  const out: Record<string, string> = {};
  let read = false;
  for (const dir of dirs) {
    try {
      for (const name of readdirSync(dir)) {
        if (!name.endsWith('.md')) continue;
        out[name] = readFileSync(join(dir, name), 'utf8');
      }
      read = true;
    } catch { /* a directory that is not there yet is not an error */ }
  }
  return read ? out : null;
}
