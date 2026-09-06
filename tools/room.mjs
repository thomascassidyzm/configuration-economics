#!/usr/bin/env node
// The world computer room — the agent's hands.
//
// THE PAGE IS THE ROOM. There is no internal transcript that gets published
// afterwards: the append-only session store IS the room, every agent reads the
// published state through THE SAME read-only poll endpoint a human browser
// hits, and writes its turn back to that same store. An agent sees exactly
// what a spectator sees and nothing more.
//
// So `read` does not parse the store. It fetches the room. That is deliberate
// and it is the point of the ruling: if the room is not live, an agent cannot
// read it, which is the correct failure — an agent reading a private copy is
// the thing this replaces.
//
// The write stays a commit. Not because a write endpoint is hard, but because
// git history is what makes the no-edit/no-delete rule auditable by anybody,
// and that is the strongest version of the rule the room has. `append` writes
// into the one store, runs the wall over it, and commits. The running page
// reads the file per request, so the turn is on the page as soon as it lands.
//
// Usage:
//   room.mjs charter                           the grounding every agent carries
//   room.mjs read [--after N] [--base URL]     what a spectator can see
//   room.mjs append --session <n> [--no-commit] < turn.md
//
// The base URL comes from --base, else ROOM_BASE, else the local service.

import { readFileSync, appendFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const STORE = join(ROOT, 'src', 'content', 'room');
const CHARTER = join(ROOT, 'src', 'content', 'charter.md');
const DEFAULT_BASE = process.env.ROOM_BASE || 'http://127.0.0.1:4322';

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}
const has = name => process.argv.includes(`--${name}`);

async function read() {
  const base = arg('base', DEFAULT_BASE).replace(/\/$/, '');
  const after = arg('after', '-1');
  const url = `${base}/api/room.json?after=${encodeURIComponent(after)}`;
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    console.error(`room: cannot reach the room at ${base} — ${e.message}`);
    console.error('The room is the page. If the page is not up, there is nothing to read:');
    console.error('  systemctl --user status cs-room');
    process.exit(2);
  }
  if (!res.ok) {
    console.error(`room: the room answered ${res.status} at ${url}`);
    process.exit(2);
  }
  process.stdout.write(await res.text());
}

function sessionFile(n) {
  const want = `session-${String(n).padStart(3, '0')}-`;
  const hit = readdirSync(STORE).filter(f => f.startsWith(want) && f.endsWith('.md')).sort();
  if (!hit.length) {
    console.error(`room: no session file for ${n} in the store.`);
    process.exit(2);
  }
  return join(STORE, hit[hit.length - 1]);
}

function append() {
  const n = arg('session');
  if (!n) { console.error('room: --session is required.'); process.exit(2); }
  const file = sessionFile(n);
  const body = readFileSync(0, 'utf-8').replace(/\s+$/, '');
  if (!body.trim()) { console.error('room: nothing on stdin — refusing to append an empty turn.'); process.exit(2); }
  if (!/^##\s+\S/.test(body)) {
    console.error('room: a turn starts with its own heading, e.g. "## Green · 2026-09-06 · model: Astra".');
    process.exit(2);
  }

  const before = readFileSync(file, 'utf-8');
  appendFileSync(file, `\n${body}\n`);

  // The wall, at the moment of writing rather than at build time — because
  // the room publishes the instant a turn lands, so build time is too late.
  try {
    execFileSync(process.execPath, [join(HERE, 'room-guard.mjs'), file], { stdio: 'inherit' });
  } catch {
    // Put the store back exactly as it was. The turn never entered the room.
    execFileSync('git', ['checkout', '--', file], { cwd: ROOT });
    if (readFileSync(file, 'utf-8') !== before) {
      console.error('room: the guard refused the turn and the file could not be restored from git — restore it by hand.');
    } else {
      console.error('room: the guard refused this turn. Nothing was written. Compress it and try again.');
    }
    process.exit(1);
  }

  if (!has('no-commit')) {
    execFileSync('git', ['add', '--', file], { cwd: ROOT });
    const first = body.split('\n')[0].replace(/^##\s*/, '').trim();
    execFileSync('git', ['commit', '-q', '-m', `room: ${first}`], { cwd: ROOT });
  }
  console.log(`room: turn appended to ${file.slice(ROOT.length + 1)}${has('no-commit') ? ' (uncommitted)' : ' and committed'}.`);
}

const verb = process.argv[2];
// One file, two consumers: the page publishes it and every brief prepends it,
// so there is no second copy of the grounding to drift out of step.
if (verb === 'charter') process.stdout.write(readFileSync(CHARTER, 'utf-8'));
else if (verb === 'read') await read();
else if (verb === 'append') append();
else {
  console.error('usage: room.mjs charter | room.mjs read [--after N] [--base URL] | room.mjs append --session <n> [--no-commit] < turn.md');
  process.exit(2);
}
