// The Open Board — the store.
//
// A public list of unfinished possibilities. Every answer to the Seed ends
// with "One opening for the next person": a precise unfinished piece that
// someone else, or their AI, could pick up. The board is those openings,
// gathered, each one copyable as a brief any agent can run.
//
// THE COLD-FIRST RULE (Tom, 2026-11-02, Seed v1.1): an opening opens with a
// step anyone with an AI and no special access can take now. Whatever needs a
// real person (data nobody has recorded, consent, access, money) sits under a
// "Waits on a person" list inside part 4. The board reads the two apart: the
// OPENING is the cold step and is what a pick-up brief hands over as the
// problem; the WAITS list travels with it marked as parked, so the next AI
// neither re-asks for it nor re-invents it as its own opening. Nobody is asked
// until someone is actually known.
//
// One file per Seed run, in src/content/board/. The answer is kept verbatim
// and the opening is READ OUT OF IT, never retyped, so there is no second
// copy to drift. The one sanctioned edit is a re-split of part 4 under the
// cold-first rule, recorded in `revised:` and shown on the run. Adding a run is
// dropping a file (tools/board-add.mjs writes the header for you). Format:
//
//   ---
//   title: Warm homes in Dyffryn Ogwen
//   by: Claude Sonnet          # who ran it: a person, or a model family
//   date: 2026-10-27
//   seed: v1
//   problem: the problem pasted after the Seed, one line
//   source: optional, how the run was made
//   continues: optional, the id of the run whose opening this one picked up
//   revised: optional, when and why part 4 was re-split (the only edit allowed)
//   ---
//
//   ...the answer, verbatim...
//
// A run whose answer has no "One opening for the next person" part still
// lists, honestly, as a run that left no opening. A run that is continued by
// a later run shows that later run beside its opening: the board's only
// notion of "taken" is that somebody actually brought an answer back.

export interface BoardRun {
  id: string;
  title: string;
  by: string;
  date: string;
  seed: string;
  problem: string;
  source?: string;
  continues?: string;
  revised?: string;
  opening: string | null;
  waits: string | null;
  body: string;
  continuedBy: string[];
}

export function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    meta[kv[1]] = v;
  }
  return { meta, body: raw.slice(m[0].length) };
}

// The Seed's fourth return part. Answers mark it as a heading
// ("### 4. One opening for the next person") or as a bold run-in
// ("**4. One opening for the next person.** text…"); either way the part runs
// until the next heading, the next numbered bold part, or a rule. The first
// occurrence wins: a long answer followed by its own short form says the same
// thing twice.
const OPENING = /one opening for the next person/i;
const WAITS = /waits on a person/i;
const isPart = (l: string) => /^(#{1,6}\s|\*\*|\d+\.\s)/.test(l.trim());
const isOpeningMarker = (l: string) => OPENING.test(l) && isPart(l);
const isWaitsMarker = (l: string) => WAITS.test(l) && /^(#{1,6}\s|\*\*|[-*]\s+\*\*)/.test(l.trim());
const isStop = (t: string) => /^#{1,6}\s/.test(t) || /^---+$/.test(t) || /^\*\*\d+\.\s/.test(t);

// Reads the text of one labelled part: a bold run-in carries its text on the
// same line after the label; either way the part runs until a heading, a
// numbered bold part, a rule, or (for the opening) the waits marker.
function readPart(lines: string[], start: number, label: RegExp, stopAt: (t: string) => boolean): string | null {
  const first = lines[start].trim();
  const out: string[] = [];
  const runIn = first.match(/^(?:[-*]\s+)?\*\*[^*]*\*\*:?\s*(.*)$/);
  if (runIn && runIn[1] && label.test(first)) out.push(runIn[1]);
  for (let i = start + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (stopAt(t)) break;
    out.push(lines[i]);
  }
  const text = out.join('\n').trim();
  return text || null;
}

// The opening: the cold step the next person can take now. It is the part 4
// text up to the "Waits on a person" marker, if there is one. The first
// occurrence wins: a long answer followed by its own short form says the same
// thing twice.
export function extractOpening(body: string): string | null {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex(isOpeningMarker);
  if (start < 0) return null;
  return readPart(lines, start, OPENING, t => isStop(t) || isWaitsMarker(t));
}

// The waits list: what the run says needs a real person, read from inside
// part 4 only, so a stray mention elsewhere in the answer is not a list.
export function extractWaits(body: string): string | null {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex(isOpeningMarker);
  if (start < 0) return null;
  let w = -1;
  for (let i = start + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (isWaitsMarker(t)) { w = i; break; }
    if (isStop(t)) break;
  }
  if (w < 0) return null;
  return readPart(lines, w, WAITS, isStop);
}

export function loadBoard(files: Record<string, string>): BoardRun[] {
  const runs: BoardRun[] = Object.entries(files).map(([path, raw]) => {
    const id = path.split('/').pop()!.replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(raw);
    return {
      id,
      title: meta.title ?? id,
      by: meta.by ?? 'unnamed',
      date: meta.date ?? '',
      seed: meta.seed ?? '',
      problem: meta.problem ?? '',
      source: meta.source || undefined,
      continues: meta.continues || undefined,
      revised: meta.revised || undefined,
      opening: extractOpening(body),
      waits: extractWaits(body),
      body: body.trim(),
      continuedBy: [],
    };
  });
  const byId = new Map(runs.map(r => [r.id, r]));
  for (const r of runs) if (r.continues) byId.get(r.continues)?.continuedBy.push(r.id);
  // Newest first; a stable tie-break on id keeps the order reproducible.
  return runs.sort((a, b) => (b.date.localeCompare(a.date)) || a.id.localeCompare(b.id));
}

// What gets pasted from the Seed: its own title line (which carries the
// version), then the brief from "What this is" down, without the page's own
// how-to-use line above the first rule. /seed and the board both hand over
// exactly this, so the two can never disagree.
export function seedPasteText(seedRaw: string): string {
  const title = seedRaw.split(/\r?\n/)[0].trim();
  return title + '\n\n' + seedRaw.slice(seedRaw.indexOf('## What this is'));
}

// What an agent is handed: the Seed, then the opening it is picking up as the
// problem, then how to bring the answer back. Self-contained, so it can be
// pasted cold into any AI.
const quote = (text: string) => text.split('\n').map(l => (l ? `> ${l}` : '>')).join('\n');

export function pickUpBrief(run: BoardRun, seedText: string, site: string): string {
  const seed = seedText.trim().replace(/\n\*My problem:\*\s*$/, '').trim();
  return [
    seed,
    '',
    `*My problem:* pick up an opening from the CE Open Board. A previous run of this Seed (${run.by}, ${run.date}) worked this problem:`,
    '',
    `> ${run.problem}`,
    '',
    'It ended by leaving this opening for the next person:',
    '',
    quote(run.opening ?? ''),
    ...(run.waits ? [
      '',
      'It also left these, parked until a real person is known. Do not ask anyone for them; you may sharpen what each would need to settle:',
      '',
      quote(run.waits),
    ] : []),
    '',
    `The full answer that left it is at ${site}/board/${run.id}`,
    '',
    'Carry the opening as far as you can. Return the four parts the Seed asks for, and leave your own opening for the next person, one that opens with a step anyone with an AI can take now.',
  ].join('\n');
}

// The public origin a request came in on. Behind Vercel the function sees an
// internal origin (https://localhost), so the forwarded host wins.
export function publicOrigin(headers: { get(name: string): string | null }, url: URL): string {
  const host = headers.get('x-forwarded-host') ?? headers.get('host');
  if (!host) return url.origin;
  const proto = headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '');
  return `${proto}://${host.split(',')[0].trim()}`;
}
