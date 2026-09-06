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
//   ## Stance · how might we — called by Tom
//   ...what everyone is doing for as long as this runs...
//
//   ## Stance ends · how might we
//   ...optionally, what it produced — including nothing...
//
//   ## Move
//   ...the one thing somebody could do differently tomorrow...
//
// A CALLED STANCE is alongsideness: a named direction of thinking that every
// participant is in at once, for a span. It is a property of the ROOM at a
// moment, never of a person — nobody is "the critic"; the room is in black,
// and then it isn't. Yes-and is the floor rule; a called stance is the second
// gear, and it costs nothing and blocks nobody. It is also the only real
// answer to blandness: under a called stance the sharp thing is REQUIRED
// rather than rude, and it ends when the stance ends.
//
// Stances are append-only like everything else. A stance that produced
// nothing stays in the record, and there is no picker, no taxonomy and no
// enforcement: the stance is whatever the room called it, kept as text.
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
  /** The stance the room was in when this turn was taken, if any. */
  stance: string | null;
}

export interface RoomStance {
  /** What the room called it. Whatever it called it — no taxonomy. */
  name: string;
  /** The rest of the heading: who called it, or why. May be empty. */
  called: string;
  /** What the room agreed it was doing for the span. */
  paragraphs: string[];
  /** What the span produced, written when it ended. Empty is a real answer. */
  closing: string[];
  /** Turn indices covered, in order. A stance may legitimately cover none. */
  turns: number[];
  /** Still running at the end of the session record. */
  open: boolean;
}

export interface RoomSession {
  id: number;
  title: string;
  opened: string;
  state: string;
  turns: RoomTurn[];
  /** Stances called during the session, in order. */
  stances: RoomStance[];
  /** Rendering order: turns and stance markers as they occurred. */
  items: RoomItem[];
  /** The move, or null when the session produced none. */
  move: string[] | null;
}

export type RoomItem =
  | { kind: 'turn'; turn: RoomTurn }
  | { kind: 'stance-open'; stance: RoomStance }
  | { kind: 'stance-close'; stance: RoomStance };

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
  const stances: RoomStance[] = [];
  const items: RoomItem[] = [];
  let move: string[] | null = null;
  let current: RoomStance | null = null;
  const id = Number(meta.id ?? 0);

  for (const part of parts) {
    const nl = part.indexOf('\n');
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const rest = nl === -1 ? '' : part.slice(nl + 1);

    if (/^move$/i.test(heading)) {
      move = paragraphs(rest);
      continue;
    }

    // "Stance ends · how might we" closes whatever is running. A stance is
    // never edited shut: the close is its own entry in the record.
    if (/^stance\s+ends\b/i.test(heading)) {
      if (current) {
        current.closing = paragraphs(rest);
        current.open = false;
        items.push({ kind: 'stance-close', stance: current });
        current = null;
      }
      continue;
    }

    // "Stance · how might we — called by Tom"
    if (/^stance\b/i.test(heading)) {
      const after = heading.replace(/^stance\s*[·:—-]?\s*/i, '');
      const [name, ...called] = after.split('—').map(x => x.trim());
      current = {
        name: name || 'a stance',
        called: called.join(' — '),
        paragraphs: paragraphs(rest),
        closing: [],
        turns: [],
        open: true,
      };
      stances.push(current);
      items.push({ kind: 'stance-open', stance: current });
      continue;
    }

    const [speaker, stamp] = heading.split('·').map(s => s.trim());
    const turn: RoomTurn = {
      index: counter.n++,
      session: id,
      speaker: speaker ?? heading,
      stamp: stamp ?? '',
      paragraphs: paragraphs(rest),
      stance: current ? current.name : null,
    };
    if (current) current.turns.push(turn.index);
    turns.push(turn);
    items.push({ kind: 'turn', turn });
  }

  return {
    id,
    title: meta.title ?? `Session ${id}`,
    opened: meta.opened ?? '',
    state: meta.state ?? 'running',
    turns,
    stances,
    items,
    move,
  };
}

/** Every session in the store, oldest first, with global turn indices. */
export function loadRoom(files: Record<string, string>): RoomSession[] {
  const ordered = Object.keys(files).sort();
  const counter = { n: 0 };
  return ordered.map(k => parseSession(files[k], counter));
}
