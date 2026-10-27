// The Open Board — the store.
//
// A public list of unfinished possibilities. Every answer to the Seed ends
// with "One opening for the next person": a precise unfinished piece that
// someone else, or their AI, could pick up. The board is those openings,
// gathered, each one copyable as a brief any agent can run.
//
// One file per Seed run, in src/content/board/. The answer is kept verbatim
// and the opening is READ OUT OF IT, never retyped, so there is no second
// copy to drift. Adding a run is dropping a file (tools/board-add.mjs writes
// the header for you). Format:
//
//   ---
//   title: Warm homes in Dyffryn Ogwen
//   by: Claude Sonnet          # who ran it: a person, or a model family
//   date: 2026-10-27
//   seed: v1
//   problem: the problem pasted after the Seed, one line
//   source: optional, how the run was made
//   continues: optional, the id of the run whose opening this one picked up
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
  opening: string | null;
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
export function extractOpening(body: string): string | null {
  const lines = body.split(/\r?\n/);
  const isMarker = (l: string) => /one opening for the next person/i.test(l) && /^(#{1,6}\s|\*\*|\d+\.\s)/.test(l.trim());
  const start = lines.findIndex(isMarker);
  if (start < 0) return null;
  const first = lines[start].trim();
  const out: string[] = [];
  // A bold run-in carries its text on the same line, after the label.
  const runIn = first.match(/^\*\*[^*]*one opening for the next person[^*]*\*\*\s*(.*)$/i);
  if (runIn && runIn[1]) out.push(runIn[1]);
  for (let i = start + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (/^#{1,6}\s/.test(t) || /^---+$/.test(t) || /^\*\*\d+\.\s/.test(t)) break;
    out.push(lines[i]);
  }
  const text = out.join('\n').trim();
  return text || null;
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
      opening: extractOpening(body),
      body: body.trim(),
      continuedBy: [],
    };
  });
  const byId = new Map(runs.map(r => [r.id, r]));
  for (const r of runs) if (r.continues) byId.get(r.continues)?.continuedBy.push(r.id);
  // Newest first; a stable tie-break on id keeps the order reproducible.
  return runs.sort((a, b) => (b.date.localeCompare(a.date)) || a.id.localeCompare(b.id));
}

// What gets pasted from the Seed: the brief from "What this is" down, without
// the page's own how-to-use line above the first rule. /seed and the board
// both hand over exactly this, so the two can never disagree.
export function seedPasteText(seedRaw: string): string {
  return '# The CE Seed, v1\n\n' + seedRaw.slice(seedRaw.indexOf('## What this is'));
}

// What an agent is handed: the Seed, then the opening it is picking up as the
// problem, then how to bring the answer back. Self-contained, so it can be
// pasted cold into any AI.
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
    (run.opening ?? '').split('\n').map(l => (l ? `> ${l}` : '>')).join('\n'),
    '',
    `The full answer that left it is at ${site}/board/${run.id}`,
    '',
    'Carry the opening as far as you can. Return the four parts the Seed asks for, and leave your own opening for the next person.',
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
