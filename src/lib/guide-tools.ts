// Alexander's read-on-demand tool: the map lives in the prompt, the territory
// does not.
//
// PORT. The reference implementation is ~/distinction-physics/src/lib/guide-tools.ts;
// the third copy is ~/tomcassidy-site/src/lib/guide-tools.ts. Same file name,
// same tool name, same registry shape, same bounds — change the shape in the
// reference first, then port here.
//
// Why this exists
// ---------------
// Alexander used to be shipped a frozen prose summary of every essay section in
// his system prompt, which meant publishing and updating the guide were two
// acts and the second one got forgotten. Now the prompt carries the INDEX —
// small, structural, generated from the content that already exists — and the
// TEXT is read on demand.
//
// Resolution is entirely IN-PROCESS. Every surface below is already inside the
// serverless bundle, so a lookup is a function call: same deployment as the
// rendered page, therefore exactly as fresh, but faster, free, and impossible
// to rate-limit or fail on a network blip. No HTTP hop, no public route.
//
// Safety: the model never supplies a URL or a path. It supplies a key, and the
// registry IS the allowlist. An unknown key returns the index rather than an
// error, so Alexander recovers by looking again instead of apologising.

import { getSectionMarkdown, getEssayOverview } from './section-renderer';
import { SECTIONS as SECTION_META } from '../content/essay-1/config';
import { PROPOSITIONS, getPropositionById } from '../content/propositions';

// Published markdown surfaces that have pages but whose text is not otherwise
// reachable from this process. Globbed, not listed — add a file and it becomes
// readable with no edit here.
const OPEN_DOCS = import.meta.glob('../content/open/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FRONTIER_DOCS = import.meta.glob('../content/frontier/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// ---------------------------------------------------------------------------
// Bounds. All three sites use the same numbers.
// ---------------------------------------------------------------------------

export const MAX_TOOL_ROUNDS = 3;
export const MAX_TOOL_CHARS_TOTAL = 40_000;
export const MAX_TOOL_CHARS_PER_RESULT = 20_000;

export function truncate(text: string, limit = MAX_TOOL_CHARS_PER_RESULT): string {
  if (text.length <= limit) return text;
  return (
    text.slice(0, limit) +
    `\n\n[…truncated at ${limit} characters. This resource is longer than the ` +
    `tool budget allows in one read; the text above is the opening of it, not ` +
    `the whole thing. Say so if you rely on a part that may have been cut.]`
  );
}

// ---------------------------------------------------------------------------
// The registry, generated from the content that already exists.
// ---------------------------------------------------------------------------

interface DocEntry {
  slug: string;
  title: string;
  markdown: string;
}

function toDocEntries(mods: Record<string, string>): DocEntry[] {
  return Object.entries(mods)
    .map(([path, content]) => {
      const slug = path.split('/').pop()!.replace(/\.md$/, '');
      const h1 = content.match(/^#\s+(.+)$/m);
      return { slug, title: h1 ? h1[1].trim() : slug, markdown: content };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

const OPEN_ENTRIES = toDocEntries(OPEN_DOCS);
const FRONTIER_ENTRIES = toDocEntries(FRONTIER_DOCS);

function normaliseKey(raw: string): string {
  return String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/^§+/, '')
    .replace(/^(section|proposition|prop)[\s:-]+/, '')
    .replace(/\.$/, '');
}

// Section id and section number both resolve to the same section.
const SECTION_KEYS = new Map<string, string>();
for (const meta of SECTION_META) {
  SECTION_KEYS.set(normaliseKey(meta.id), meta.id);
  SECTION_KEYS.set(normaliseKey(meta.number), meta.id);
}

const PROPOSITION_KEYS = new Map<string, string>();
for (const prop of PROPOSITIONS) {
  PROPOSITION_KEYS.set(normaliseKey(prop.id), prop.id);
}

const DOC_KEYS = new Map<string, DocEntry>();
for (const entry of [...FRONTIER_ENTRIES, ...OPEN_ENTRIES]) {
  DOC_KEYS.set(normaliseKey(entry.slug), entry);
}

function renderProposition(id: string): string | null {
  const prop = getPropositionById(id);
  if (!prop) return null;
  let out = `# ${prop.title} (\`${prop.id}\`) [${prop.epistemicStatus}]\n\n`;
  out += `${prop.surface}\n\n`;
  out += `**Claim.** ${prop.logic.claim}\n\n`;
  out += `**Premises.**\n${prop.logic.premises.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n`;
  out += `**Conclusion.** ${prop.logic.conclusion}\n`;
  if (prop.logic.predictive) out += `\n**Predictive consequence.** ${prop.logic.predictive}\n`;
  return out;
}

/**
 * The MAP: every section, proposition and published document, by key. Small,
 * structural, and generated — nobody has to remember to edit it when content
 * ships. This is the only content listing that belongs in the system prompt.
 */
export function buildSiteIndex(): string {
  let out = `### Essay 1 — "Value under Physical Constraint" (key \`essay-1\` for the overview)\n\n`;
  for (const meta of SECTION_META) {
    out += `- §${meta.number} \`${meta.id}\` — ${meta.title} [${meta.epistemicStatus}]\n`;
  }

  out += `\n### Propositions (${PROPOSITIONS.length}) — read any by its id\n\n`;
  out += PROPOSITIONS.map((p) => `\`${p.id}\` [${p.epistemicStatus}]`).join(', ') + '\n';

  if (FRONTIER_ENTRIES.length > 0) {
    out += `\n### Research-frontier documents\n\n`;
    for (const d of FRONTIER_ENTRIES) out += `- \`${d.slug}\` — ${d.title}\n`;
  }

  if (OPEN_ENTRIES.length > 0) {
    out += `\n### Open notebook (\`/open\` — published working documents)\n\n`;
    for (const d of OPEN_ENTRIES) out += `- \`${d.slug}\` — ${d.title}\n`;
  }

  return out;
}

function buildShortIndex(): string {
  return [
    `Essay sections: ${SECTION_META.map((s) => `§${s.number} \`${s.id}\``).join(', ')} (plus \`essay-1\` for the overview)`,
    `Propositions: ${PROPOSITIONS.map((p) => `\`${p.id}\``).join(', ')}`,
    `Documents: ${[...FRONTIER_ENTRIES, ...OPEN_ENTRIES].map((d) => `\`${d.slug}\``).join(', ')}`,
  ].join('\n\n');
}

// ---------------------------------------------------------------------------
// The tool.
// ---------------------------------------------------------------------------

export const READ_SECTION_TOOL = {
  name: 'read_section',
  description:
    'Read the live text of any essay section, proposition or published document ' +
    'of this site. Use this BEFORE saying you do not have something — every id ' +
    'in the index in your system prompt is readable this way. Accepts an essay ' +
    'section id or number ("configuration-value", "4.5"), "essay-1" for the ' +
    'essay overview, a proposition id ("value-option-space"), or a document ' +
    'slug ("option-space-formalisation"). If the id is unknown you get the ' +
    'index back, so you can look again.',
  input_schema: {
    type: 'object' as const,
    properties: {
      id: {
        type: 'string' as const,
        description:
          'An essay section id or number, "essay-1", a proposition id, or a ' +
          'document slug — all listed in the index in your system prompt.',
      },
    },
    required: ['id'],
  },
};

export const GUIDE_TOOLS = [READ_SECTION_TOOL];

export interface ToolRunResult {
  text: string;
  found: boolean;
}

/**
 * Resolve one tool call. Never throws, never takes a URL, never touches the
 * network: the id is looked up in the registry or it is not found.
 */
export function runGuideTool(name: string, input: unknown): ToolRunResult {
  if (name !== READ_SECTION_TOOL.name) {
    return { text: `No such tool: ${name}. The only tool available is read_section.`, found: false };
  }

  const rawId = (input as { id?: unknown } | null)?.id;
  if (typeof rawId !== 'string' || rawId.trim() === '') {
    return {
      text: `read_section needs an \`id\`. Available ids:\n\n${buildShortIndex()}`,
      found: false,
    };
  }

  const key = normaliseKey(rawId);

  if (key === 'essay-1' || key === 'essay') {
    return { text: truncate(getEssayOverview()), found: true };
  }

  const sectionId = SECTION_KEYS.get(key);
  if (sectionId) {
    const md = getSectionMarkdown(sectionId);
    if (md) return { text: truncate(md), found: true };
  }

  const propId = PROPOSITION_KEYS.get(key);
  if (propId) {
    const md = renderProposition(propId);
    if (md) return { text: truncate(md), found: true };
  }

  const doc = DOC_KEYS.get(key);
  if (doc) {
    return { text: truncate(doc.markdown), found: true };
  }

  return {
    text:
      `No resource with id "${rawId}" exists on this site. That is a lookup ` +
      `miss, not a gap in the site — check the index below and try the right ` +
      `id. If the thing the reader asked about genuinely is not in this list, ` +
      `then it is not on the site, and you should say so plainly.\n\n` +
      buildShortIndex(),
    found: false,
  };
}

/**
 * The prompt block that tells Alexander the tool exists and how to use it.
 * Carries the generated index, so the map is always current.
 */
export function buildReadingInstructions(): string {
  return `## READING THIS SITE ON DEMAND

You have a tool, \`read_section\`, that returns the live text of any essay
section, proposition or published document listed below. The text is read from
the same deployment that renders the page, so it is always current.

**Use the tool before saying you do not have something.** If a reader asks you
to compare the section they are on with another one, quote another section,
work from a proposition's full premises, or follow a cross-reference, read it
first and then answer from the actual text. Saying "I don't have that section"
when it is in the index below is a failure — it is one lookup away.

The honest refusal still stands, and it matters: if something genuinely is not
in the index below, it is not on this site, and you say so plainly rather than
inventing it. What you must never do is refuse over content that IS here.

Reading is for grounding your own answer, not for reciting. The rule in
PEDAGOGICAL APPROACH stands: do not read a section back to a reader who is
looking at it — build from it.

You may read up to ${MAX_TOOL_ROUNDS} times per question, so read what you need
in one go where you can — the tool accepts one id per call, but you may make
several calls in the same turn.

${buildSiteIndex()}`;
}
