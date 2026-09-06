// The world computer room — the store.
//
// An append-only room, held as files in the repo. There is no database and
// there is no write endpoint: a turn arrives as a commit, and the deploy
// publishes it. Git history is what makes the no-edit / no-delete rule
// auditable by anybody, which is the strongest version of that rule.
//
// One file per session, in src/content/room/. Format:
//
//   ---
//   id: 1
//   title: ...
//   opened: 2026-09-06
//   state: closed | running
//   ---
//
//   ## Watson · 2026-09-06
//   ...prose...
//
//   ## Move
//   ...the one thing somebody could do differently tomorrow...
//
// A session with no `## Move` section did not produce a move. That is a
// first-class rendered state, not an empty div: the page says so plainly
// rather than dressing discussion up as a result.

export interface RoomTurn {
  /** Global index across the whole room, 0-based, in file+document order. */
  index: number;
  /** Session id this turn belongs to. */
  session: number;
  /** Speaker, exactly as written in the heading. */
  speaker: string;
  /** Date stamp as written in the heading (may be empty). */
  stamp: string;
  /** Paragraphs of the turn, already split. */
  paragraphs: string[];
}

export interface RoomSession {
  id: number;
  title: string;
  opened: string;
  state: string;
  turns: RoomTurn[];
  /** The move, or null when the session produced none. */
  move: string[] | null;
}

/** Speakers with a seat. Astra's seat is real and currently empty. */
export const SEATS: { name: string; role: string; note: string }[] = [
  { name: 'Tom', role: 'the selector', note: 'Brings the question in from outside, and decides.' },
  { name: 'Watson', role: 'a mind in the room', note: 'Proposes, and is wrong in public when it is wrong.' },
  { name: '環 RBF', role: 'a mind in the room', note: 'Reads the frame, and concedes in public when it concedes.' },
  { name: 'Astra', role: 'a seat, currently empty', note: 'A mind from another lineage. No turns yet — the seat exists before the occupant does, on purpose: two minds from one training distribution checking each other are siblings, not independents.' },
];

function parseFrontmatter(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

function paragraphs(body: string): string[] {
  return body.trim().split(/\n{2,}/).map(p => p.replace(/\n/g, ' ').trim()).filter(Boolean);
}

/** Parse one session file. `counter` supplies the running global turn index. */
export function parseSession(raw: string, counter: { n: number }): RoomSession {
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = parseFrontmatter(fm ? fm[1] : '');
  const body = fm ? raw.slice(fm[0].length) : raw;

  const parts = body.split(/^##\s+/m).slice(1);
  const turns: RoomTurn[] = [];
  let move: string[] | null = null;
  const id = Number(meta.id ?? 0);

  for (const part of parts) {
    const nl = part.indexOf('\n');
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const rest = nl === -1 ? '' : part.slice(nl + 1);
    if (/^move$/i.test(heading)) {
      move = paragraphs(rest);
      continue;
    }
    const [speaker, stamp] = heading.split('·').map(s => s.trim());
    turns.push({
      index: counter.n++,
      session: id,
      speaker: speaker ?? heading,
      stamp: stamp ?? '',
      paragraphs: paragraphs(rest),
    });
  }

  return {
    id,
    title: meta.title ?? `Session ${id}`,
    opened: meta.opened ?? '',
    state: meta.state ?? 'running',
    turns,
    move,
  };
}

/** Every session in the store, oldest first, with global turn indices. */
export function loadRoom(files: Record<string, string>): RoomSession[] {
  const ordered = Object.keys(files).sort();
  const counter = { n: 0 };
  return ordered.map(k => parseSession(files[k], counter));
}
