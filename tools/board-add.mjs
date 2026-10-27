#!/usr/bin/env node
// Add one Seed run to the CE Open Board.
//
//   node tools/board-add.mjs <answer.md> --title "Warm homes in Dyffryn Ogwen" \
//     --by "Claude Sonnet" --problem "the problem pasted after the Seed" \
//     [--continues <run-id>] [--date YYYY-MM-DD] [--seed v1] [--source "how it was run"]
//
// <answer.md> is the AI's answer, pasted verbatim (use - for stdin). The tool
// writes src/content/board/<date>-<slug>.md with the header and the answer,
// and refuses if the answer has no "One opening for the next person" part,
// because a run with no opening has nothing to put on the board. Pass
// --allow-silent to list it anyway, as a run that left no opening.
// --continues names the run whose opening this answer picked up (an issue
// brought back from the board says which one).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractOpening } from '../src/lib/board.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (k) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined; };
const file = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && args[i - 1] !== '--allow-silent'));
const die = (m) => { console.error(`board-add: ${m}`); process.exit(1); };

if (!file) die('give the answer file (or - for stdin). See the header of this file for usage.');
const title = flag('title'), by = flag('by'), problem = flag('problem');
if (!title || !by || !problem) die('--title, --by and --problem are all required.');
const date = flag('date') ?? new Date().toISOString().slice(0, 10);
const continues = flag('continues');
if (continues && !existsSync(resolve(ROOT, 'src/content/board', `${continues}.md`))) die(`--continues ${continues}: no such run on the board.`);

const answer = readFileSync(file === '-' ? 0 : file, 'utf8').trim();
const opening = extractOpening(answer);
if (!opening && !args.includes('--allow-silent')) die('no "One opening for the next person" part found in the answer. Pass --allow-silent to add it anyway.');

const q = (v) => `"${String(v).replace(/\s+/g, ' ').replace(/"/g, "'")}"`;
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 6).join('-');
const out = resolve(ROOT, 'src/content/board', `${date}-${slug}.md`);
if (existsSync(out)) die(`${out} already exists; change --title.`);
const head = [
  '---',
  `title: ${q(title)}`,
  `by: ${q(by)}`,
  `date: ${q(date)}`,
  `seed: ${q(flag('seed') ?? 'v1')}`,
  ...(flag('source') ? [`source: ${q(flag('source'))}`] : []),
  ...(continues ? [`continues: ${q(continues)}`] : []),
  `problem: ${q(problem)}`,
  '---',
  '',
].join('\n');
writeFileSync(out, `${head}\n${answer}\n`);
console.log(`wrote ${out}`);
console.log(opening ? `opening: ${opening.split('\n')[0].slice(0, 100)}…` : 'no opening (listed as silent)');
