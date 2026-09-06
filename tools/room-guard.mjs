#!/usr/bin/env node
// The world computer room — the publish-time guard.
//
// Everything said in the room is public the instant it is said, and the
// room's best evidence comes from a working estate that is private. The wall
// is not a paragraph of doctrine — doctrine rots — it is this gate, and the
// build runs it.
//
//   CONCEPTS ARE COMPRESSIONS: derivable, universal, language-independent.
//   FACTS ARE AGREEMENTS: arbitrary, social, local. Names, ids, paths,
//   people, repos, prices. The compression is the publishable half BY
//   CONSTRUCTION.
//
// So: "two things that must agree, with nothing comparing them, failing in
// the direction that looks like progress" passes. The same observation
// naming the repo, the file and the job id does not.
//
// Precision over aggression. A guard that blocks every number is a guard
// people switch off, so a general claim carrying a number — "a dozen
// dispatches asked for one model and silently ran another" — passes, and
// where the call cannot be made mechanically the guard WARNS and prints,
// rather than blocking.
//
// Usage:
//   node tools/room-guard.mjs            scan the whole store
//   node tools/room-guard.mjs <file...>  scan named files
// Exit 1 on any block. Warnings never fail the build; they are printed.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALLOWED_PROPER_NOUNS, ALLOWED_HOSTS } from './room-allowlist.mjs';

const ALLOWED = new Set(ALLOWED_PROPER_NOUNS);

const CODE_EXT = 'ts|tsx|js|jsx|mjs|cjs|md|json|astro|py|sh|bash|yml|yaml|sql|toml|env|html|css|csv|log|txt';
const PATHY_ROOTS = 'src|docs|tools|lib|bin|etc|var|usr|home|opt|tmp|node_modules|public|dist|build|scripts|content|pages|components';

// Each rule: { name, severity, re, why }. `re` must be global.
const RULES = [
  { name: 'absolute-path', severity: 'block',
    re: /(?:^|[\s"'(])(?:~|\.{1,2})?\/[A-Za-z0-9._-]+\/[A-Za-z0-9._/-]*/g,
    why: 'a filesystem path is an agreement, not a compression' },
  { name: 'repo-path', severity: 'block',
    re: new RegExp(`\\b(?:${PATHY_ROOTS})\\/[A-Za-z0-9._/-]+`, 'g'),
    why: 'a repo-relative path names a private tree' },
  { name: 'filename', severity: 'block',
    re: new RegExp(`\\b[A-Za-z0-9._-]+\\.(?:${CODE_EXT})\\b`, 'g'),
    why: 'a filename is a local agreement' },
  { name: 'uuid', severity: 'block',
    re: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
    why: 'an id points at one private object' },
  { name: 'hex-id', severity: 'block', re: /\b[0-9a-f]{7,}\b/g,
    why: 'a commit sha or hex id points at one private object' },
  { name: 'issue-id', severity: 'block', re: /#\d+\b/g,
    why: 'a job or issue number points at one private object' },
  { name: 'email', severity: 'block', re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    why: 'an email address is a person' },
  { name: 'internal-host', severity: 'block',
    re: /\b(?:localhost|127\.0\.0\.1|\d{1,3}(?:\.\d{1,3}){3}|[a-z0-9-]+\.(?:local|internal|lan|ts\.net))\b/gi,
    why: 'an internal host is infrastructure' },
  { name: 'port', severity: 'block', re: /(?:^|[\s\w]):\d{2,5}\b/g,
    why: 'a port number is infrastructure' },
  { name: 'url', severity: 'block', re: /\bhttps?:\/\/\S+/gi,
    why: 'a URL is an address; allowlist it if it is genuinely public' },
  { name: 'money', severity: 'block', re: /[£$€¥]\s?\d[\d,.]*|\b\d[\d,.]*\s?(?:GBP|USD|EUR)\b/g,
    why: 'a price is an agreement with provenance' },
  { name: 'counted-number', severity: 'block', re: /\b\d{1,3}(?:,\d{3})+\b/g,
    why: 'a grouped count is a number with provenance; state the compression instead' },
  { name: 'bare-number', severity: 'warn', re: /\b\d{3,}\b/g,
    why: 'a large bare number often carries provenance — check it is a general claim' },
];

/** Strip fenced code and inline code before scanning prose. */
function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, m => ' '.repeat(m.length))
             .replace(/`[^`\n]*`/g, m => ' '.repeat(m.length));
}

function lineOf(text, idx) {
  return text.slice(0, idx).split('\n').length;
}

const SENTENCE_OPENERS = new Set(['.', '!', '?', ':', ';', '\n', '—', '–', '-', '*', '>', '|', '']);

/** Is the capitalised word at `idx` the first word of a sentence? */
function atSentenceStart(text, idx) {
  let i = idx - 1;
  while (i >= 0 && /[\s"'“‘’(\[]/.test(text[i])) {
    if (text[i] === '\n') return true;
    i--;
  }
  if (i < 0) return true;
  return SENTENCE_OPENERS.has(text[i]);
}

/**
 * Scan one blob of prose. Returns { blocks, warns }, each entry
 * { rule, match, line, why }.
 */
export function scanText(text, label = 'text') {
  const blocks = [];
  const warns = [];
  const prose = stripCode(text);

  for (const rule of RULES) {
    rule.re.lastIndex = 0;
    let m;
    while ((m = rule.re.exec(prose)) !== null) {
      const hit = m[0].trim();
      if (!hit) continue;
      if (rule.name === 'url' && ALLOWED_HOSTS.some(h => hit.includes(h))) continue;
      // A date like 2026-09-06 is a public timestamp, not provenance.
      if (rule.name === 'bare-number' && /\b(19|20)\d{2}\b/.test(hit)) continue;
      const entry = { rule: rule.name, match: hit, line: lineOf(prose, m.index), why: rule.why, label };
      (rule.severity === 'block' ? blocks : warns).push(entry);
    }
  }

  // Proper nouns not on the allowlist. Only Capitalised-then-lowercase words
  // are candidates: SHOUTED words are this house's emphasis, not names.
  const nounRe = /\b[A-Z][a-z]+(?:'s)?\b/g;
  let m;
  while ((m = nounRe.exec(prose)) !== null) {
    const word = m[0].replace(/'s$/, '');
    if (ALLOWED.has(word)) continue;
    if (atSentenceStart(prose, m.index)) continue;
    blocks.push({
      rule: 'proper-noun', match: m[0], line: lineOf(prose, m.index), label,
      why: 'a proper noun is an agreement — generalise it, or add it to the allowlist if it is already public',
    });
  }

  return { blocks, warns };
}

/**
 * Scan a session file: only the prose a reader will see — turn text, the
 * move, and the title. Frontmatter dates and speaker stamps are the room's
 * own public metadata and are not scanned.
 */
export function scanSessionFile(raw, label) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = fm ? fm[1] : '';
  const body = fm ? raw.slice(fm[0].length) : raw;
  const title = (meta.match(/^title:\s*(.*)$/m) || [, ''])[1];

  // Headings are scanned too: a stance name is written in its heading, and a
  // stance name is prose the room chose, so it goes over the wall like the
  // rest. Speaker names and date stamps live there as well and are handled by
  // the allowlist, which is where a name belongs.
  const parts = body.split(/^##\s+/m).slice(1);
  const prose = parts.join('\n\n');

  return scanText(`${title}\n\n${prose}`, label);
}

function main(argv) {
  const here = dirname(fileURLToPath(import.meta.url));
  // Both arms of the experiment, under the identical wall. The carried arm
  // gets no exemption: it is hand-transported, not privileged.
  const stores = [
    resolve(here, '..', 'src', 'content', 'room'),
    resolve(here, '..', 'src', 'content', 'carried'),
  ];
  const files = argv.length
    ? argv
    : stores.filter(existsSync).flatMap(store =>
        readdirSync(store).filter(f => f.endsWith('.md')).sort().map(f => join(store, f)));
  if (!files.length) { console.log('room-guard: no session store yet — nothing to check.'); return; }

  let blocks = 0, warns = 0;
  for (const f of files) {
    const { blocks: b, warns: w } = scanSessionFile(readFileSync(f, 'utf-8'), f);
    for (const e of b) { console.error(`BLOCK ${e.label}:${e.line}  [${e.rule}] "${e.match}" — ${e.why}`); blocks++; }
    for (const e of w) { console.warn(`warn  ${e.label}:${e.line}  [${e.rule}] "${e.match}" — ${e.why}`); warns++; }
  }
  const n = files.length;
  if (blocks) {
    console.error(`\nroom-guard: ${blocks} block(s) across ${n} session file(s). Nothing publishes until these are compressed.`);
    process.exit(1);
  }
  console.log(`room-guard: ${n} session file(s) clean${warns ? `, ${warns} warning(s) above` : ''}.`);
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv.slice(2));
