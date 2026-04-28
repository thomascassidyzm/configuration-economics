// Render the live Essay 1 section the reader is currently viewing into
// markdown for injection into Alexander's system prompt. Edit the section
// content in src/content/essay-1/sections.ts and Alexander automatically
// reads the new text on the next request — no prompt curation needed.
//
// Configuration Economics has a simpler content shape than Distinction
// Physics: each section is plain markdown + an optional keyPoints array,
// with metadata (number, title, epistemic status) in essay-1/config.ts.
// The renderer joins these into a single markdown bundle.

import { SECTIONS as SECTION_CONTENT } from '../content/essay-1/sections';
import { SECTIONS as SECTION_META, ESSAY_META } from '../content/essay-1/config';

export function getSectionMarkdown(sectionId: string): string | null {
  const content = SECTION_CONTENT.find(s => s.id === sectionId);
  if (!content) return null;

  const meta = SECTION_META.find(s => s.id === sectionId);

  let out = '';
  if (meta) {
    out += `# §${meta.number} — ${meta.title}\n`;
    out += `[epistemic status: ${meta.epistemicStatus}]\n\n`;
  } else {
    out += `# ${sectionId}\n\n`;
  }

  out += content.content + '\n';

  if (content.keyPoints && content.keyPoints.length > 0) {
    out += `\n**Key points.**\n${content.keyPoints.map(p => `- ${p}`).join('\n')}\n`;
  }

  return out;
}

export function getEssayOverview(): string {
  let out = `# ${ESSAY_META.title}\n`;
  out += `*${ESSAY_META.status}, ${ESSAY_META.date}*\n\n`;
  out += `Sections: ${SECTION_META.map(s => `§${s.number} ${s.shortTitle} [${s.epistemicStatus}]`).join('; ')}.\n`;
  return out;
}
