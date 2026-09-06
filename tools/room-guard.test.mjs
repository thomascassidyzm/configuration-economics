#!/usr/bin/env node
// The world computer room — the guard's own test.
//
// A verifier proven only in the direction it is supposed to fire is an
// untested verifier holding the lever. So: strings that MUST block, and
// strings that MUST pass. Run with `node tools/room-guard.test.mjs`.

import { scanText } from './room-guard.mjs';

// Agreement-layer. Every one of these must be refused.
const MUST_BLOCK = [
  ['absolute path', 'The globs live in /home/someone/work/thing and break there.'],
  ['repo path', 'The content globs exclude docs/canonical in that repo.'],
  ['filename', 'It was a one-line fix in propositions.ts, of all places.'],
  ['uuid', 'The run was a5fc52bb-f6c9-4c3d-96c8-c9d0c97e1a12 and it died silently.'],
  ['commit sha', 'It regressed at 82495ef1a2b and nobody noticed for a week.'],
  ['issue id', 'That was raised as #712 and closed without a decision.'],
  ['email', 'The alert went to someone@example.com and bounced.'],
  ['internal host', 'The surface answers on localhost and nowhere else.'],
  ['port', 'It listens on :4317 behind the tunnel.'],
  ['url', 'See https://internal.example.net/dash for the numbers.'],
  ['money', 'The contract was £384,000 over three years.'],
  ['counted number', 'The sweep found 1,383 skips in one pass.'],
  ['proper noun', 'The problem showed up first in Bethesda, then everywhere.'],
  ['proper noun mid-sentence', 'We saw it again when Gwynedd ran the same loop.'],
];

// Concept-layer. Every one of these must pass: these are compressions, and
// the compression is the publishable half.
const MUST_PASS = [
  ['the worked example', 'Two things that must agree, with nothing comparing them, failing in the direction that looks like progress.'],
  ['a general claim with a number', 'A dozen dispatches asked for one model and silently ran another.'],
  ['a small count', 'Three of the four candidates collapse into the same move.'],
  ['a year', 'The window closes in 2028, which is soon enough to matter.'],
  ['participants named', 'Watson was wrong twice and RBF conceded outright.'],
  ['the thinkers', 'Think along the lines of Bucky Fuller, Edward de Bono, David Deutsch, James Carse.'],
  ['the frameworks', 'Configuration Economics builds on Distinction Physics; AlphaGo is the wrong analogy.'],
  ['shouting is emphasis, not a name', 'The failure mode is not showing off, it is BLANDNESS.'],
  ['sentence starts are not names', 'Persistence is not goodness. Heat death is maximally persistent.'],
  ['quoted sentence starts', 'He said: "Descendant count measures the path, not the space."'],
  ['hyphenated prose', 'An undetectable foreclosure is unrecoverable even when technically reversible.'],
  ['a plain slash pair', 'It is not thesis/antithesis/synthesis; it is closer to six-hat thinking.'],
];

let failures = 0;

for (const [name, text] of MUST_BLOCK) {
  const { blocks } = scanText(text, name);
  if (blocks.length === 0) {
    console.error(`FAIL (should block) ${name}: ${text}`);
    failures++;
  }
}

for (const [name, text] of MUST_PASS) {
  const { blocks } = scanText(text, name);
  if (blocks.length > 0) {
    console.error(`FAIL (should pass) ${name}: ${text}`);
    for (const b of blocks) console.error(`        [${b.rule}] "${b.match}"`);
    failures++;
  }
}

if (failures) {
  console.error(`\nroom-guard test: ${failures} failure(s) of ${MUST_BLOCK.length + MUST_PASS.length}.`);
  process.exit(1);
}
console.log(`room-guard test: ${MUST_BLOCK.length} block cases and ${MUST_PASS.length} pass cases, all green.`);
