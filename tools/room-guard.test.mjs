#!/usr/bin/env node
// The world computer room — the guard's own test.
//
// A verifier proven only in the direction it is supposed to fire is an
// untested verifier holding the lever. So: strings that MUST block, and
// strings that MUST pass. Run with `node tools/room-guard.test.mjs`.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanText, scanSessionFile, buildQuoteCorpus, scanQuotes } from './room-guard.mjs';

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
  // The model line: the family publishes, the routing around it does not.
  ['model version', 'The turn came back from Opus 5 in about an hour.'],
  ['effort level', 'It was run at low effort and still found the move.'],
  ['account routing', 'That one went on the second account for the afternoon.'],
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
  ['the model families, named and bare', 'The far side was Gemini and this side was Opus, with a hand between them.'],
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

// Headings are prose too: a stance name is chosen by the room and goes over
// the same wall. Scanning only turn bodies would let a name through in the one
// place the room writes freely.
const SESSION_HEADING_LEAK = `---
id: 9
title: A session
---

## Stance · black on the Bethesda numbers

Everyone in it at once.

## Watson · 2026-09-06

Nothing to see here.
`;
if (scanSessionFile(SESSION_HEADING_LEAK, 'heading').blocks.length === 0) {
  console.error('FAIL (should block) a proper noun in a stance heading');
  failures++;
}

const SESSION_CLEAN = `---
id: 9
title: A session
---

## Stance · how might we — called by the selector

Everyone in it at once, for as long as it runs.

## Watson · 2026-09-06

Two things that must agree, with nothing comparing them.
`;
if (scanSessionFile(SESSION_CLEAN, 'clean').blocks.length > 0) {
  console.error('FAIL (should pass) a clean session file');
  failures++;
}

// The quote guard: a paraphrase must never pass as a quote. Proven both
// ways — a real quotation passes, the same quotation paraphrased blocks —
// against the actual corpus, not a fixture, so the test exercises the real
// tokenisation of the real record.
const here = dirname(fileURLToPath(import.meta.url));
const roomFile = resolve(here, '..', 'src', 'content', 'room', 'session-001-the-room-that-runs.md');
const carriedFile = resolve(here, '..', 'src', 'content', 'carried', 'exchange-001-the-expiring-no.md');
const quoteCorpus = buildQuoteCorpus([readFileSync(roomFile, 'utf-8'), readFileSync(carriedFile, 'utf-8')]);

let quoteFailures = 0;

// 1. Genuine verbatim quotation from session 001, attributed correctly -> passes silently.
{
  const text = 'Watson said: "The world computer is probably not a thing you build. It is a thing you notice is already running."';
  const { blocks, warns } = scanQuotes(text, quoteCorpus, 'verbatim-attributed');
  if (blocks.length > 0 || warns.length > 0) {
    console.error(`FAIL (should pass silently) verbatim quote attributed to Watson`);
    for (const e of [...blocks, ...warns]) console.error(`        [${e.rule}] "${e.match}"`);
    quoteFailures++;
  }
}

// 2. The same sentence paraphrased (a word changed, a clause reordered), same
// attribution -> blocks, and the message names the speaker and the nearest
// actual text.
{
  const text = 'Watson said: "It is a thing you notice already running, and the world computer is probably not something you build."';
  const { blocks } = scanQuotes(text, quoteCorpus, 'paraphrase-attributed');
  const b = blocks[0];
  if (!b) {
    console.error('FAIL (should block) paraphrased quote attributed to Watson');
    quoteFailures++;
  } else if (b.speaker !== 'Watson' || !b.nearest) {
    console.error(`FAIL (block must name speaker and nearest text): speaker="${b.speaker}" nearest="${b.nearest}"`);
    quoteFailures++;
  }
}

// 3. Curly quotes, doubled whitespace, and a dropped trailing full stop ->
// still passes: normalisation works.
{
  const text = 'Watson said: “Accept   the offer, extend it, hand it back changed”';
  const { blocks, warns } = scanQuotes(text, quoteCorpus, 'normalised-attributed');
  if (blocks.length > 0 || warns.length > 0) {
    console.error('FAIL (should pass) curly-quote/whitespace/trailing-stop variant');
    for (const e of [...blocks, ...warns]) console.error(`        [${e.rule}] "${e.match}"`);
    quoteFailures++;
  }
}

// 4. Six-plus-word quotation with no detectable attribution -> warns, never blocks.
{
  const text = 'Somebody mentioned that "The world computer is probably not a thing you build." during the session.';
  const { blocks, warns } = scanQuotes(text, quoteCorpus, 'unattributed');
  if (blocks.length > 0) {
    console.error('FAIL (should never block) unattributed six-plus-word quote');
    quoteFailures++;
  }
  if (warns.length !== 1) {
    console.error(`FAIL (should warn once) unattributed six-plus-word quote: got ${warns.length} warning(s)`);
    quoteFailures++;
  }
}

// 5. A short quoted phrase (under six words) is not checked at all.
{
  const text = 'Tom said: "Three pushes."';
  const { blocks, warns } = scanQuotes(text, quoteCorpus, 'short-quote');
  if (blocks.length > 0 || warns.length > 0) {
    console.error('FAIL (should be ignored entirely) short quoted phrase');
    quoteFailures++;
  }
}

failures += quoteFailures;

if (failures) {
  console.error(`\nroom-guard test: ${failures} failure(s) of ${MUST_BLOCK.length + MUST_PASS.length + 7} (2 heading/clean + 5 quote-guard cases).`);
  process.exit(1);
}
console.log(`room-guard test: ${MUST_BLOCK.length} block cases, ${MUST_PASS.length} pass cases, and 5 quote-guard cases, all green.`);
