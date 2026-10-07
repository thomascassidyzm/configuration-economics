#!/usr/bin/env node
/**
 * #688 — ONE Astra question, one shot: `node astra.cjs <prompt.md> <reply.md>`. The argv is the surface's
 * own (command-surface/foreign-models.js buildRun, read-only sandbox, the model id it pins); the
 * question goes in on stdin, so a long batch never meets the argv limit. Serial by construction: the
 * reader calls this once at a time, as ops/ssi-poi-nightly.js does ("never two, never parallel" — all
 * codex models share one credential store). Exit 0 with the answer written, else non-zero.
 * LANE (command-surface job #757): the codex family has four logged-in homes, ~/.codex-lanes/1..4.
 * `ASTRA_LANE=N` (read.py's --lane / CS_CODEX_LANE) runs this question under lane N's CODEX_HOME so a
 * direct call never shares an auth.json with the surface's own codex workers or another reader. The
 * reader owns its lane for the run: pick one no surface job is using. Unset = the legacy ~/.codex.
 * LOCK (job #775): each call takes <home>/.held (command-surface lane-lock.js) for the length of the
 * question, waiting if a surface job holds that home, so the surface never hands the same home to a job
 * while this runs (a shared auth.json can log a lane out). Skipped with a warning if lane-lock.js is
 * not yet in the surface checkout.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const FM = require(process.env.CS_FOREIGN_MODELS || path.join(os.homedir(), 'command-surface', 'foreign-models.js'));

const [promptFile, replyFile] = process.argv.slice(2);
const lane = process.env.ASTRA_LANE || process.env.CS_CODEX_LANE || '';
const home = lane ? path.join(os.homedir(), '.codex-lanes', lane) : undefined;
const auth = FM.authState('astra');
if (!auth.ok) { console.error(auth.message); process.exit(2); }
if (home && !fs.existsSync(path.join(home, 'auth.json'))) { console.error(`codex lane ${lane} is not logged in (${home})`); process.exit(2); }
let LL = null;
try { LL = require(path.join(path.dirname(require.resolve(process.env.CS_FOREIGN_MODELS || path.join(os.homedir(), 'command-surface', 'foreign-models.js'))), 'lane-lock.js')); }
catch { if (home) console.error('astra: lane-lock.js not in the surface checkout yet; running unlocked'); }
if (home && LL) {
  const until = Date.now() + Number(process.env.ASTRA_LOCK_WAIT_MS || 60 * 60 * 1000);
  while (!LL.tryTake(home, 'astra.cjs')) {
    if (Date.now() > until) { console.error(`codex lane ${lane} stayed held by ${JSON.stringify(LL.holder(home))}`); process.exit(2); }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000);
  }
  const drop = () => LL.release(home);
  process.on('exit', drop);
  for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(130));
}
const cwd = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'astra-'));
const run = FM.buildRun({ model: 'astra', prompt: '-', cwd, readOnly: true, home });
const t0 = Date.now();
const res = spawnSync(run.bin, run.args, { env: run.env, cwd, input: fs.readFileSync(promptFile, 'utf8'), encoding: 'utf8',
  timeout: Number(process.env.ASTRA_TIMEOUT_MS || 40 * 60 * 1000), maxBuffer: 256 * 1024 * 1024 });
let answer = '';
try { answer = fs.readFileSync(run.lastMsgFile, 'utf8').trim(); } catch {}
try { fs.unlinkSync(run.lastMsgFile); } catch {}
fs.rmSync(cwd, { recursive: true, force: true });
const secs = Math.round((Date.now() - t0) / 1000);
if (res.error || res.status !== 0 || !answer) {
  console.error(`astra failed after ${secs}s: ${res.error ? res.error.message : `exit ${res.status}`}\n${String(res.stderr || '').split('\n').slice(-15).join('\n')}`);
  process.exit(1);
}
fs.writeFileSync(replyFile, answer + '\n');
console.log(`astra answered in ${secs}s (${answer.length} chars)`);
