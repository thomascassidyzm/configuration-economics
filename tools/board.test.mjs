#!/usr/bin/env node
// The Open Board store's own test. Run with `node tools/board.test.mjs`.
// The three seed runs are real answers; each must yield its opening and only
// its opening, because the board reads it out of the verbatim text.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractOpening, loadBoard, pickUpBrief, seedPasteText, publicOrigin } from '../src/lib/board.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(ROOT, 'src/content/board');
const files = Object.fromEntries(readdirSync(dir).filter(f => f.endsWith('.md')).map(f => [`board/${f}`, readFileSync(resolve(dir, f), 'utf8')]));

test('every seed run yields its own opening, stopping at the next part', () => {
  const runs = loadBoard(files);
  const get = (id) => runs.find(r => r.id === id);
  const schools = get('2026-10-27-schools-zenjin-hour').opening;
  assert.match(schools, /^\*\*Build the transfer map for GCSE maths/);
  assert.match(schools, /production cards are missing/);
  assert.doesNotMatch(schools, /changed premise|Attention is the human flux/i);
  const ogwen = get('2026-10-27-ogwen-warm-homes').opening;
  assert.match(ogwen, /hourly record of the quarry discharge/);
  assert.match(ogwen, /measured fabric baseline/);
  assert.doesNotMatch(ogwen, /Sell the outcome/);
  const mobility = get('2026-10-27-town-mobility').opening;
  assert.match(mobility, /village-to-town pilot/);
  assert.doesNotMatch(mobility, /Replace/);
  for (const r of runs) assert.ok(r.problem.length > 40, `${r.id} has its problem`);
});

test('a bold run-in opening is read from the same line, and the first one wins', () => {
  const body = 'Intro.\n\n**4. One opening for the next person.** Log the outflow.\nFor a year.\n\n**5. A changed premise.** No.\n\n**4. One opening for the next person.** Second copy.';
  assert.equal(extractOpening(body), 'Log the outflow.\nFor a year.');
});

test('an answer with no opening says so rather than inventing one', () => {
  assert.equal(extractOpening('# A run\n\nJust prose about opening doors for the next person.'), null);
});

test('continues links a later run under the opening it carried', () => {
  const later = '---\ntitle: Quarry logger, first month\nby: Tom\ndate: 2026-11-01\nseed: v1\nproblem: p\ncontinues: 2026-10-27-ogwen-warm-homes\n---\n\n### 4. One opening for the next person\nNext.';
  const runs = loadBoard({ ...files, 'board/2026-11-01-quarry.md': later });
  assert.deepEqual(runs.find(r => r.id === '2026-10-27-ogwen-warm-homes').continuedBy, ['2026-11-01-quarry']);
  assert.equal(runs[0].id, '2026-11-01-quarry', 'newest first');
});

test('the pick-up brief is the Seed with the opening as the problem', () => {
  const seedRaw = readFileSync(resolve(ROOT, 'src/content/seed.md'), 'utf8');
  const run = loadBoard(files).find(r => r.id === '2026-10-27-town-mobility');
  const brief = pickUpBrief(run, seedPasteText(seedRaw), 'https://example.org');
  assert.match(brief, /^# The CE Seed, v1\n\n## What this is/);
  assert.equal(brief.match(/\*My problem:\*/g).length, 1, 'one problem line, not the Seed\'s empty one plus ours');
  assert.match(brief, /> Design one village-to-town pilot/);
  assert.match(brief, /https:\/\/example\.org\/board\/2026-10-27-town-mobility/);
});

test('the feed links carry the host the caller used, not the function\'s internal origin', () => {
  const h = (o) => ({ get: (k) => o[k] ?? null });
  const internal = new URL('https://localhost/board.json');
  assert.equal(publicOrigin(h({ 'x-forwarded-host': 'ce.example.org', 'x-forwarded-proto': 'https' }), internal), 'https://ce.example.org');
  assert.equal(publicOrigin(h({}), new URL('http://localhost:4321/board.json')), 'http://localhost:4321');
});
