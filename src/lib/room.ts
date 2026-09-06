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
//   ## The far side · 2026-09-06 · model: Gemini · carried by hand
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
// A MODEL NAME BELONGS TO A TURN, NEVER TO A PARTICIPANT. The name of a
// model family is not a fixed property of a seat: today's Opus is a
// different model from next year's Opus, and a seat can change what is
// behind it mid-transcript. So the name is written into the turn's own
// heading, as of that turn's stamp, and is read back the same way — never
// as a standing label on the page. A turn with no `model:` segment simply
// records none, which is honest rather than empty.
//
// What the name discloses is the FAMILY and nothing else. Routing, tier,
// effort, account and version are one-way facts about how work is
// allocated and stay behind the wall; the family is what lets a reader
// weigh the record at all. The guard enforces that line mechanically.
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
  /** Anything further in the heading — on the carried arm, the transport. */
  note: string;
  /**
   * The model family behind this turn, as of this turn's stamp — written
   * `model: Opus` in the heading. A property of the turn, never of the
   * speaker: a seat's model may change between turns and the record must be
   * able to say so. Null when the turn does not record one.
   */
  model: string | null;
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
  /**
   * The panel, in the order blue announced it — written `panel: Opus, Astra,
   * Fable` in the frontmatter. Empty for a session that ran before the panel
   * rule, which is honest rather than back-filled.
   */
  panel: string[];
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

/** Speakers with a seat. A seat is a role in the room, never a model name. */
export const SEATS: { name: string; role: string; note: string }[] = [
  { name: 'Tom', role: 'the selector', note: 'Brings the question in from outside, and decides.' },
  { name: 'Watson', role: 'a mind in the room', note: 'Proposes, and is wrong in public when it is wrong.' },
  { name: '環 RBF', role: 'a mind in the room', note: 'Reads the frame, and concedes in public when it concedes.' },
  { name: 'Astra', role: 'a mind from another lineage', note: 'The seat existed before the occupant did, on purpose: two minds from one training distribution checking each other are siblings, not independents. It was filled live in session 002 — turns taken in the room, under a hat, not carried in by hand.' },
  { name: 'Blue', role: 'the conductor', note: 'Process, not content. Introduces the panel, then improvises only which hat comes next and why — never who speaks. Reads what the room did, and reports what was learned, especially from what failed.' },
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

    const [speaker, stamp, ...rest2] = heading.split('·').map(s => s.trim());
    // `model: Opus` is lifted out of the heading segments into its own field
    // and removed from the note, so the name is queryable per turn rather
    // than buried in free text. Last one wins if a heading repeats it.
    const modelSegs = rest2.filter(s => /^model\s*:/i.test(s));
    const note = rest2.filter(s => !/^model\s*:/i.test(s));
    const model = modelSegs.length
      ? modelSegs[modelSegs.length - 1].replace(/^model\s*:\s*/i, '').trim() || null
      : null;
    const turn: RoomTurn = {
      index: counter.n++,
      session: id,
      speaker: speaker ?? heading,
      stamp: stamp ?? '',
      note: note.join(' · '),
      model,
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
    panel: (meta.panel ?? '').split(',').map(x => x.trim()).filter(Boolean),
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

// ---------------------------------------------------------------------------
// The hat rotation.
//
// A HAT IS A CALLED STANCE. That is not a convenience, it is the whole design:
// a hat is a named direction of thinking the room is in for a span, which is
// exactly what a stance already is, already parsed and already rendered. So
// there is no hat schema, no picker and no new format — a hat is written as
// a stance whose name reads `black hat, round two`, and the rotation is READ
// BACK out of the record rather than stored beside it.
//
// A HAT IS A REFUSAL: under black you may only attack, under green you may
// only generate, and you are forbidden the others for that turn. That is what
// keeps a swarm from collapsing into mush — the parallel voices are
// structurally incapable of agreeing prematurely, because the hat forbids it.
// The refusal lives in the prompt of the turn, not in this file; what lives
// here is the audit that says whether the room kept to it.
//
// EVERY AGENT WEARS THE SAME HAT AT THE SAME TIME. This is de Bono's actual
// rule and it replaces the opposed-hats arrangement session 002 ran. The
// reason is a fact about the participants rather than a preference: models are
// trained in a way that rewards winning an exchange, so hats held in
// opposition at the same moment produce a scrap over terminology that READS
// like rigour and is not. When the whole room is in one hat, the only thing
// left to push against is the material.
//
// THE ADVERSARIAL PRESSURE COMES FROM THE SEQUENCE, NOT FROM OPPOSITION
// INSIDE A ROUND. The room builds under green and then TURNS and wears black
// at what it just built — its own turns included. Nobody is assigned the
// objection; the room objects to itself, later. So a stance covers MANY turns
// from many models, which is what a stance always was, and calling WHEN to
// turn is the whole experimental design. That call belongs to blue.
//
// THE PANEL IS SEQUENCED, THE HATS ARE IMPROVISED. Blue opens a session by
// INTRODUCING THE PANEL — naming the agents in an announced order — and that
// introduction is a real turn on the page. Within each hat the panel then
// speaks ONCE EACH, in that order, strictly one at a time. There is no pass
// and no skip: under a shared hat an agent with nothing new to add says so,
// and that is itself a reading of where the room has got to.
//
// THE STARTING POSITION SHIFTS BY ONE FOR EACH NEW HAT. Speaking last is a
// real advantage — you have read everyone — and a fixed order would hand it to
// the same agent every time. Rotating the start makes it even, with no extra
// machinery.
//
// Blue improvises ONLY the hat sequence: which hat comes next, and why, in one
// line. It does not choose speakers.
//
// AND THAT IS THE WHOLE CONCURRENCY DESIGN, so do not add to it. Strict
// one-at-a-time IS the latency. There are no concurrent writes to the room, so
// there are no collisions to detect, no order to reconstruct and no forks to
// draw — and a serialised credential behind any one seat stops being a
// constraint at all, because by construction only one agent is ever writing.
// Timers, artificial latency, floor-granting protocols, stale-view rejection
// and optimistic-concurrency stamps were all considered and are all ruled out.
// If you are reaching for one, the sequence has already solved it.
//
// There is therefore no per-model hat assignment and no rotation to enforce:
// the old "no model owns a hat" check is gone, because under this rule no
// model is given one in the first place. `hatRotation` still reads back who
// spoke under which hat, because that is a fact about the record worth having.
// `rotationDefects` keeps only the checks that still mean something, and it is
// deliberately a report rather than a throw — the room publishes its own
// defects rather than refusing to render them.
//
// THE CONDUCTOR CALLS ONE HAT AT A TIME, LIVE. Blue is not a scheduler and the
// hat order is NOT a rota. Blue reads the state of the room and calls the next
// hat from it, one at a time, saying in one line why that hat now. A round
// whose whole order was fixed before the round ran has not been conducted; it
// has been timetabled, and the difference is visible in the record because a
// live call leaves a Blue turn in front of every hat. `conductorCadence` reads
// that back off the record, so which of the two happened is checkable rather
// than claimed.
//
// AND BLUE'S FITNESS FUNCTION IS DIRECTION, NOT RIGOUR. The room is here to
// build possibilities and be open to usefulness, not to be academically
// respectable, and Blue is the sentinel for that direction: it calls a hat
// change the MOMENT the room stops generating possibility and starts defending
// itself. Caveats, definitional argument, methodological throat-clearing and
// unearned precision are the failure it exists to catch, and it may say so
// bluntly mid-round and redirect. Rigour is not its job — accuracy, citation
// and the wall belong to the registrar layer precisely so that Blue can spend
// itself entirely on whether the room is still going anywhere.
//
// Toward a round that collapses, its stance is Fuller's: now we're learning.

/** The hat colours the room uses. de Bono's, in his colours. */
export const HATS = ['white', 'yellow', 'black', 'green', 'red', 'blue'] as const;
export type Hat = (typeof HATS)[number];

const ORDINALS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
};

const HAT_STANCE = new RegExp(
  `^(${HATS.join('|')})\\s+hat(?:\\s*,\\s*round\\s+([a-z]+|\\d+))?\\s*$`, 'i');

/**
 * Read a stance name as a hat, or null when it is an ordinary stance.
 * `black hat, round two` → { hat: 'black', round: 2 }. A hat stance with no
 * round reads as round null, which is honest rather than guessed.
 */
export function parseHatStance(name: string): { hat: Hat; round: number | null } | null {
  const m = name.trim().match(HAT_STANCE);
  if (!m) return null;
  const raw = (m[2] ?? '').toLowerCase();
  const round = raw ? (ORDINALS[raw] ?? (/^\d+$/.test(raw) ? Number(raw) : null)) : null;
  return { hat: m[1].toLowerCase() as Hat, round };
}

export interface HatWearing {
  /** Round number as written in the stance name, or null when unnumbered. */
  round: number | null;
  hat: Hat;
  /** The model behind the turn, per the turn's own heading. Null if unrecorded. */
  model: string | null;
  speaker: string;
  /** Global turn index, so a defect can be pointed at. */
  turn: number;
}

/** Who wore which hat, in which round, in document order. */
export function hatRotation(sessions: RoomSession[]): HatWearing[] {
  const out: HatWearing[] = [];
  for (const session of sessions) {
    const byIndex = new Map(session.turns.map(t => [t.index, t]));
    for (const stance of session.stances) {
      const parsed = parseHatStance(stance.name);
      if (!parsed) continue;
      for (const i of stance.turns) {
        const turn = byIndex.get(i);
        if (!turn) continue;
        out.push({ round: parsed.round, hat: parsed.hat, model: turn.model, speaker: turn.speaker, turn: i });
      }
    }
  }
  return out;
}

/**
 * What the record got wrong about its own hats, in plain sentences a reader
 * can check against it. Empty means the bookkeeping held.
 *
 * Three defects, and only three, because a check nobody can verify by eye is a
 * check nobody trusts: a hat turn that records no model (the record is
 * unreadable at that point), a hat stance covering no turn at all (a hat was
 * called and nobody wore it), and a hat stance the room never closed.
 *
 * The unclosed-hat check was added after session 002 published with two hats
 * left open, which the record's own bookkeeping did not notice and an outside
 * read did. A hat is a refusal with a timer on it, and a refusal nobody ends
 * is not a refusal.
 *
 * A FOURTH CHECK USED TO LIVE HERE AND HAS BEEN REMOVED: that no model wore
 * the same hat in consecutive rounds. It enforced an arrangement that is no
 * longer the design. The whole room wears one hat at a time, so there is no
 * per-model assignment to rotate, and a check that enforces a superseded rule
 * is worse than no check — it fails work that is correct.
 */
export function rotationDefects(sessions: RoomSession[]): string[] {
  const defects: string[] = [];
  const worn = hatRotation(sessions);

  for (const w of worn) {
    if (!w.model) defects.push(`the ${w.hat} hat turn by ${w.speaker} records no model, so the rotation cannot be read there`);
  }

  for (const session of sessions) {
    // A HAT THE ROOM IS STILL WEARING IS NOT A HAT IT LEFT ON. While a
    // session is running its last stance is open because the room is in it,
    // and its turns are still arriving — so reporting either as a defect
    // accuses the room of a fault that is just the present tense. This only
    // became visible when the page started rendering sessions mid-flight;
    // before that every session was read after it had closed. A defect that
    // fires on correct work is worse than no defect.
    const running = session.state === 'running';
    const last = session.stances[session.stances.length - 1];

    for (const stance of session.stances) {
      if (!parseHatStance(stance.name)) continue;
      // Still WEARING it: the last stance of a running session, still open.
      // A stance the room closed is finished business whatever the session
      // state says, so a closed hat with no turns is still a real defect.
      const inFlight = running && stance === last && stance.open;
      if (stance.turns.length === 0 && !inFlight) {
        defects.push(`the stance "${stance.name}" was called and no turn was taken under it`);
      }
      if (stance.open && !inFlight) {
        defects.push(`the stance "${stance.name}" was never closed — the room left a hat on`);
      }
    }
  }

  return defects;
}

/**
 * How the conductor ran: called live, hat by hat, or scheduled a round at a
 * time. Read off the record, because the difference is visible in it — a live
 * call leaves a conductor's turn in front of the hat it calls, and a timetable
 * leaves one turn in front of a whole round of them.
 *
 * This is a report and not a rule. A session that was timetabled is not
 * invalid; it is a different thing from a conducted one, and the page should
 * be able to say which it was rather than letting the reader assume.
 */
export interface ConductorCadence {
  /** Hat stances in the session. */
  hats: number;
  /** Hats with a conductor's turn immediately in front of them. */
  called: number;
  cadence: 'live' | 'scheduled' | 'mixed' | 'none';
}

/** The speaker holding the conductor's seat. Process, never content. */
const CONDUCTOR = 'blue';

export function conductorCadence(session: RoomSession): ConductorCadence {
  const byIndex = new Map(session.turns.map(t => [t.index, t]));
  let hats = 0;
  let called = 0;
  // A conductor's turn is one taken OUTSIDE every hat — inside a hat it is
  // wearing one, and a hat turn is content, not a call.
  let pendingCall = false;

  for (const item of session.items) {
    if (item.kind === 'turn') {
      const turn = byIndex.get(item.turn.index);
      if (!turn) continue;
      if (!turn.stance && turn.speaker.trim().toLowerCase() === CONDUCTOR) pendingCall = true;
      continue;
    }
    if (item.kind === 'stance-open' && parseHatStance(item.stance.name)) {
      hats++;
      if (pendingCall) called++;
      pendingCall = false;
    }
  }

  const cadence: ConductorCadence['cadence'] =
    hats === 0 ? 'none' : called === hats ? 'live' : called === 0 ? 'scheduled' : 'mixed';
  return { hats, called, cadence };
}

/**
 * Whether the panel took its turns as announced: once each, in order, with the
 * starting position shifted by one for each new hat.
 *
 * A report, not a gate. A session with no announced panel returns nothing,
 * because it ran before the rule and back-filling it would be a lie.
 */
export function panelDefects(session: RoomSession): string[] {
  const panel = session.panel;
  if (panel.length === 0) return [];

  const out: string[] = [];
  const byIndex = new Map(session.turns.map(t => [t.index, t]));
  const hats = session.stances.filter(st => parseHatStance(st.name));

  // The hat the room is still in is a round in progress, not a short one.
  const lastStance = session.stances[session.stances.length - 1];
  const inFlight = session.state === 'running' && lastStance?.open ? lastStance : null;

  hats.forEach((stance, k) => {
    // The announced order, started one place further along for each new hat.
    const expected = panel.map((_, i) => panel[(i + k) % panel.length]);
    const spoke = stance.turns
      .map(i => byIndex.get(i))
      .filter((t): t is RoomTurn => Boolean(t))
      .map(t => t.model ?? t.speaker);

    // A round still being spoken is judged on what it has done so far: if the
    // turns taken match the announced order as a PREFIX, there is nothing
    // wrong yet and saying so would be a false alarm on a live page. If they
    // have already diverged, that is a real defect and it is reported now
    // rather than held back until the round happens to end.
    if (stance === inFlight && spoke.length < expected.length) {
      const prefix = expected.slice(0, spoke.length);
      if (spoke.join('|') !== prefix.join('|')) {
        out.push(`under "${stance.name}", still being spoken, the panel has gone ${spoke.join(', ')} — the announced order for this hat starts ${prefix.join(', ')}`);
      }
      return;
    }

    if (spoke.length !== expected.length) {
      out.push(`under "${stance.name}" the panel of ${panel.length} spoke ${spoke.length} times — the panel speaks once each, with no pass and no skip`);
      return;
    }
    if (spoke.join('|') === expected.join('|')) return;

    const sorted = (xs: string[]) => [...xs].sort().join('|');
    out.push(sorted(spoke) === sorted(expected)
      ? `under "${stance.name}" the panel spoke ${spoke.join(', ')} — the announced order, started one place on for this hat, is ${expected.join(', ')}`
      : `under "${stance.name}" the speakers were ${spoke.join(', ')}, which is not the announced panel ${panel.join(', ')}`);
  });

  return out;
}
