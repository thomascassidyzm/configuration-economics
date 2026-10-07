#!/usr/bin/env python3
"""Fork reconstruction, round 2: stabilised menu, richer snapshots, two mappers, status-quo arms.

Real forks only (rulings in command-surface ops/rulings.jsonl, located at the human message that made
them). Every model output lands in --data (private, outside this repo). Steps are resumable: a call
file that exists is never re-run. See PREREG-round2.md for the thresholds, committed before any run.

  forks-all                      build forks-all.json from every locatable ruling (scale stage)
  questions                      Opus authors a neutral fork question per fork (scale stage only)
  snapshots                      richer snapshot per fork + leak guard
  propose  --build A             N Haiku proposal draws per fork
  merge    --build A             one Opus pass -> canonical menu (blind to the ruling)
  align                          Sonnet aligns menu A <-> menu B (measurement only)
  key-opus --build A             Opus maps taken/later ruling onto the menu
  key-astra --build A            GPT-6 Astra does the same, independently (batched)
  freeze                         sha256 + timestamp over every key file
  select   --build A --arm base  M Haiku selection runs per fork
  score                          model-free scoring -> scores2.json
"""
import argparse, hashlib, itertools, json, math, os, random, re, sqlite3, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone, timedelta

DB = '/home/tomcassidy/command-surface/command-surface.db'
RULINGS = '/home/tomcassidy/command-surface/ops/rulings.jsonl'
HAIKU = 'claude-haiku-5-5'
CLAUDE = os.path.expanduser('~/.local/bin/claude')
ASTRA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'astra_call.cjs')

# ---------------------------------------------------------------- record
def iso_ms(s): return int(datetime.fromisoformat(s.replace('Z', '+00:00')).timestamp() * 1000)

def load_rulings():
    rs = [json.loads(l) for l in open(RULINGS) if l.strip()]
    full = {}
    for r in rs:
        if r.get('rule') and r['id'] not in full: full[r['id']] = r
    sup = {}
    for r in rs:
        if r.get('superseded_by'): sup[r['id']] = r['superseded_by']
        for old in r.get('supersedes') or []: sup.setdefault(old, r['id'])
    return full, sup

def known_at(r):
    """Earliest instant the ruling is safely known: recorded time, or the end of the day BEFORE its date
    is never used (conservative) -- a ruling dated strictly before the fork's day counts from its day end."""
    rec = (r.get('recorded') or {}).get('at')
    t = iso_ms(rec) if rec else None
    if r.get('date'):
        d = int(datetime.fromisoformat(r['date']).replace(tzinfo=timezone.utc).timestamp() * 1000) + 86400000
        t = d if t is None else min(t, d)
    return t

def locate(db, quote):
    frag = quote.split('...')[0].split('…')[0].strip()[:60]
    if len(frag) < 15: return None, frag
    return db.execute("select job_id,seq,ts from events where kind='reply' and data like ? and "
                      "json_extract(data,'$.source')='human' order by ts limit 1", ('%' + frag + '%',)).fetchone(), frag

STOP = set("the a an and or of to in on for is are be it this that with as at by from we i you he they not but if so do does was "
           "were have has had will would should can could what which who how when then than there their our your its into out about "
           "just like get got all any one more no yes ok also only up now".split())
def toks(s): return [w for w in re.findall(r"[a-z0-9]+", (s or '').lower()) if len(w) > 2 and w not in STOP]

def bm25_rank(query, docs, k1=1.4, b=0.75):
    q = set(toks(query)); dt = [toks(d) for d in docs]
    N = len(docs) or 1; avg = sum(map(len, dt)) / N or 1
    df = {}
    for t in dt:
        for w in set(t): df[w] = df.get(w, 0) + 1
    sc = []
    for i, t in enumerate(dt):
        tf = {}
        for w in t: tf[w] = tf.get(w, 0) + 1
        s = 0
        for w in q:
            if w in tf:
                idf = math.log(1 + (N - df[w] + .5) / (df[w] + .5))
                s += idf * tf[w] * (k1 + 1) / (tf[w] + k1 * (1 - b + b * len(t) / avg))
        sc.append(s)
    return sorted(range(len(docs)), key=lambda i: -sc[i]), sc

def who_of(src): return 'Tom' if src == 'human' else ('Worker/system report' if src in ('worker', 'surface', 'agent') else 'Message')

def same_room(db, job, ts, budget=7000, per=1400):
    items = []
    for t, d in db.execute("select ts,data from events where job_id=? and kind='reply' and ts<? order by ts desc limit 40", (job, ts)):
        d = json.loads(d); items.append((t, who_of(d.get('source')), d.get('text', '')))
    for t, res in db.execute("select ended,result from turns where job_id=? and ended<? and result is not null order by ended desc limit 25", (job, ts)):
        items.append((t, 'Watson (assistant)', res or ''))
    items.sort(reverse=True)
    out, n, maxts = [], 0, 0
    for t, who, txt in items:
        txt = (txt or '').strip()
        if not txt: continue
        if len(txt) > per: txt = txt[:per] + ' …[truncated]'
        blk = f"[{who}]\n{txt}"
        if n + len(blk) > budget: break
        out.append(blk); n += len(blk); maxts = max(maxts, t)
    return '\n\n'.join(reversed(out)), maxts

def other_rooms(db, job, ts, query, hours=72, budget=5000, per=700):
    lo = ts - hours * 3600000
    labels = dict(db.execute("select id,label from jobs"))
    items = []
    for j, t, d in db.execute("select job_id,ts,data from events where kind='reply' and ts>=? and ts<? and job_id<>?", (lo, ts, job)):
        d = json.loads(d); txt = (d.get('text') or '').strip()
        if len(txt) > 40: items.append((t, j, who_of(d.get('source')), txt))
    for j, t, res in db.execute("select job_id,ended,result from turns where ended>=? and ended<? and job_id<>? and result is not null", (lo, ts, job)):
        if res and len(res) > 40: items.append((t, j, 'Assistant', res.strip()))
    if not items: return '', 0
    order, sc = bm25_rank(query, [x[3] for x in items])
    pick, n, maxts = [], 0, 0
    for i in order:
        if sc[i] <= 0: break
        t, j, who, txt = items[i]
        if len(txt) > per: txt = txt[:per] + ' …[truncated]'
        when = datetime.fromtimestamp(t / 1000, timezone.utc).strftime('%m-%d %H:%MZ')
        blk = f"[{when} · room \"{(labels.get(j) or '?')[:50]}\" · {who}]\n{txt}"
        if n + len(blk) > budget: continue
        pick.append((t, blk)); n += len(blk); maxts = max(maxts, t)
        if n > budget - 200: break
    pick.sort()
    return '\n\n'.join(b for _, b in pick), maxts

def rulings_in_force(full, sup, ts, query, exclude, top=25):
    live = []
    for rid, r in full.items():
        if rid in exclude: continue
        k = known_at(r)
        if k is None or k >= ts: continue
        nxt = sup.get(rid)
        if nxt and nxt in full and (known_at(full[nxt]) or 1e18) < ts: continue   # already superseded then
        live.append(r)
    order, sc = bm25_rank(query, [r['rule'] for r in live])
    sel = [live[i] for i in order[:top] if sc[i] > 0]
    return '\n'.join(f"- ({r.get('date') or '?'}) {r['rule']}" for r in sel), len(live), max((known_at(r) for r in sel), default=0)

# ---------------------------------------------------------------- model calls
SYS = ("You reconstruct real decision points from a work record. You see only what was known at the moment "
       "just before a decision was made; nothing after it. Answer only with the requested JSON.")

def claude_call(prompt, schema, model=HAIKU, effort=None, system=SYS):
    env = dict(os.environ); env.pop('CLAUDECODE', None)
    cfg = env.get('CLAUDE_CONFIG_DIR')
    if cfg and not env.get('CLAUDE_CODE_OAUTH_TOKEN'):
        try: env['CLAUDE_CODE_OAUTH_TOKEN'] = open(os.path.join(cfg, '.cs-oauth-token')).read().strip()
        except OSError: pass
    args = [CLAUDE, '-p', '--model', model, '--system-prompt', system, '--tools', '', '--setting-sources', '',
            '--strict-mcp-config', '--no-session-persistence', '--output-format', 'json', '--json-schema', json.dumps(schema)]
    if effort: args += ['--effort', effort]
    for attempt in range(3):
        t0 = time.time()
        try: p = subprocess.run(args, input=prompt, capture_output=True, text=True, env=env, timeout=900)
        except subprocess.TimeoutExpired: d = {'is_error': True, 'raw': 'timeout'}; continue
        try: d = json.loads(p.stdout)
        except Exception: d = {'is_error': True, 'raw': p.stdout[-500:], 'stderr': p.stderr[-500:]}
        if not d.get('is_error') and d.get('structured_output') is not None: break
        time.sleep(5 * (attempt + 1))
    mu = d.get('modelUsage') or {}
    tok = {}
    for m in mu.values():
        for k in ('inputTokens', 'outputTokens', 'cacheReadInputTokens', 'cacheCreationInputTokens'): tok[k] = tok.get(k, 0) + m.get(k, 0)
    return {'ok': not d.get('is_error') and d.get('structured_output') is not None, 'out': d.get('structured_output'),
            'cost': d.get('total_cost_usd') or 0, 'wall': time.time() - t0, 'models': list(mu.keys()), 'tok': tok, 'effort': effort,
            'err': None if not d.get('is_error') else str(d.get('result') or d.get('raw'))[:300]}

def run_jobs(jobs, workers):
    todo = [j for j in jobs if not os.path.exists(j[0])]
    print(f"{len(jobs)} calls, {len(todo)} to run", flush=True)
    done = [0]
    def one(j):
        path, fn = j
        r = fn()
        tmp = path + '.tmp'; json.dump(r, open(tmp, 'w'), ensure_ascii=False); os.replace(tmp, path)
        done[0] += 1
        if done[0] % 50 == 0: print(f"  {done[0]}/{len(todo)} {time.strftime('%H:%M:%S')}", flush=True)
    with ThreadPoolExecutor(workers) as ex: list(ex.map(one, todo))

def head(snap, q):
    return (f"RECORD (what was knowable just before the decision; nothing after it):\n<<<\n{snap}\n>>>\n\n"
            f"THE FORK: {q}\nThe decision-maker is Tom (founder). Work only from what the record shows was known then.\n\n")

LIST_SCHEMA = {"type": "object", "properties": {"options": {"type": "array", "items": {"type": "string"}}}, "required": ["options"]}
MENU_SCHEMA = {"type": "object", "properties": {"options": {"type": "array", "items": {"type": "object", "properties": {
    "label": {"type": "string"}, "gloss": {"type": "string"}, "kind": {"type": "string", "enum": ["status_quo", "defer", "change"]},
    "support": {"type": "integer"}}, "required": ["label", "gloss", "kind", "support"]}}}, "required": ["options"]}
SEL_SCHEMA = {"type": "object", "properties": {"open": {"type": "array", "items": {"type": "string"}}, "likely": {"type": "string"}},
              "required": ["open", "likely"]}
KEY_SCHEMA = {"type": "object", "properties": {"taken": {"type": "integer"}, "taken_fit": {"type": "string", "enum": ["exact", "approx", "absent"]},
              "later": {"type": "integer"}, "later_fit": {"type": "string", "enum": ["exact", "approx", "absent", "n/a"]}, "why": {"type": "string"}},
              "required": ["taken", "taken_fit", "later", "later_fit", "why"]}
ALIGN_SCHEMA = {"type": "object", "properties": {"pairs": {"type": "array", "items": {"type": "object", "properties": {
    "a": {"type": "integer"}, "b": {"type": "integer"}}, "required": ["a", "b"]}}}, "required": ["pairs"]}
Q_SCHEMA = {"type": "object", "properties": {"is_fork": {"type": "boolean"}, "question": {"type": "string"}, "why": {"type": "string"}},
            "required": ["is_fork", "question", "why"]}

def norm(s): return ' '.join(''.join(c.lower() if c.isalnum() else ' ' for c in s).split())

PROPOSE = ("List the 8 to 12 distinct options that were genuinely open to the decision-maker at this moment. "
           "Include the status quo / do-nothing / defer option if it was open. Each option is a canonical short label: 3 to 10 words, "
           "plain lowercase English, no numbering, specific enough to tell the options apart. Options should be mutually exclusive where possible.")

def merge_prompt(snap, q, pool):
    lines = '\n'.join(f"- ({c}) {l}" for l, c in pool)
    return (head(snap, q) + f"Independent analysts each listed the options open at this fork. Below is every label they proposed, "
            f"with how many of the drafts proposed it (after exact de-duplication):\n{lines}\n\n"
            "Author the ONE canonical menu for this fork: 8 to 14 options. Merge paraphrases and near-duplicates into one option; "
            "keep genuinely different options apart (a different actor, amount, scope or timing is a different option). Prefer options "
            "many drafts proposed; drop idiosyncratic ones unless the record clearly shows they were live. If any draft proposed keeping "
            "things as they are or deferring, the menu must contain that option. Each option: label (3 to 10 words, plain lowercase, "
            "distinct), gloss (one sentence saying exactly what choosing it means), kind (status_quo = keep the current arrangement; "
            "defer = decide later / gather more first; change = anything else), support (your estimate of how many drafts it covers). "
            "Order by support, highest first.")

ARMS = {
    'base': ("Select the options that were GENUINELY OPEN at this moment: reachable and live given what was known then, not merely "
             "conceivable. Choose between 2 and 6. Copy each chosen label EXACTLY as written in the menu into \"open\". "
             "Then put in \"likely\" the ONE menu option you judge Tom most likely chose, copied exactly."),
    'frame': ("Select the options that were GENUINELY OPEN at this moment: reachable and live given what was known then, not merely "
              "conceivable. Choose between 2 and 6. Copy each chosen label EXACTLY as written in the menu into \"open\". "
              "Then put in \"likely\" the ONE menu option you judge Tom most likely chose, copied exactly. "
              "Keeping things as they are, or deferring, is NOT a safe default: it is one option among the others and needs the same "
              "positive evidence from the record as any change. Weigh each option only on what the record shows Tom wanting, the "
              "standing rulings, and what was actually reachable."),
}

def sel_prompt(snap, q, menu, arm, seed):
    m = [o['label'] for o in menu]; random.Random(seed).shuffle(m)
    return head(snap, q) + "MENU of candidate options:\n" + '\n'.join('- ' + x for x in m) + "\n\n" + ARMS['frame' if arm == 'frame' else 'base']

def key_prompt(menu, meta, q):
    lines = '\n'.join(f"{i}. {o['label']} — {o['gloss']}" for i, o in enumerate(menu))
    later = meta.get('later')
    return (f"THE FORK: {q}\n\nMENU (index. label — gloss):\n{lines}\n\nWHAT TOM ACTUALLY DECIDED (the taken ruling):\n{meta['taken']}\n\n"
            + (f"WHAT LATER REPLACED IT (the later ruling):\n{later}\n\n" if later else "LATER RULING: none (the ruling still holds).\n\n") +
            "Map each ruling onto the ONE menu option that best captures its direction. 'exact' = the option says what the ruling decided; "
            "'approx' = the option captures the ruling's main direction but misses a material part; 'absent' = no option captures it (index -1). "
            "If there is no later ruling, later = -1 and later_fit = 'n/a'. Give a one-line why.")

# ---------------------------------------------------------------- steps
def P(data, *a): return os.path.join(data, *a)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('step'); ap.add_argument('--data', required=True)
    ap.add_argument('--forks', default='forks.json'); ap.add_argument('--build', default='A'); ap.add_argument('--arm', default='base')
    ap.add_argument('--draws', type=int, default=24); ap.add_argument('--n', type=int, default=20)
    ap.add_argument('--workers', type=int, default=8); ap.add_argument('--only'); ap.add_argument('--lane', default='4')
    a = ap.parse_args()
    os.makedirs(P(a.data, 'calls'), exist_ok=True)
    if a.step == 'forks-all': return forks_all(a)
    forks = json.load(open(P(a.data, a.forks)))
    if a.only: forks = [f for f in forks if f['key'] in a.only.split(',')]
    forks = [f for f in forks if f.get('q')] if a.step != 'questions' else forks
    globals()['step_' + a.step.replace('-', '_')](a, forks)

def forks_all(a):
    full, sup = load_rulings(); db = sqlite3.connect(DB); out, skip = [], {}
    for rid, r in sorted(full.items(), key=lambda kv: known_at(kv[1]) or 0):
        if not r.get('quote'): skip['no quote'] = skip.get('no quote', 0) + 1; continue
        loc, frag = locate(db, r['quote'])
        if not loc: skip['not located'] = skip.get('not located', 0) + 1; continue
        out.append({'key': f"F{len(out)+1:03d}", 'id': rid})
    json.dump(out, open(P(a.data, 'forks-all.json'), 'w'), indent=0)
    print(len(out), skip)

def step_questions(a, forks):
    full, sup = load_rulings(); jobs = []
    for f in forks:
        if f.get('q'): continue
        r = full[f['id']]
        pr = (f"A ruling recorded in a founder's work log:\n\nRULING: {r['rule']}\nTHE WORDS THAT MADE IT: {r.get('quote','')}\n\n"
              "1) is_fork: was this a genuine decision among alternatives (who/what/whether/how much/which way), as opposed to a statement "
              "of fact, a definition, a description, a personal preference about wording/style, or a bug report? Pure style or voice rules "
              "are not forks. 2) question: write ONE neutral question that poses the decision point as it stood BEFORE it was made. The "
              "question must name the topic and the scope of the choice, must NOT reveal, hint at or lean toward the answer, and must not "
              "use any distinctive word or number from the ruling that only the answer would contain. Plain English, one sentence.")
        jobs.append((P(a.data, 'calls', f"{f['key']}.question.call.json"), (lambda pr=pr: claude_call(pr, Q_SCHEMA, model='opus', system="Answer only with the requested JSON."))))
    run_jobs(jobs, a.workers)
    for f in forks:
        p = P(a.data, 'calls', f"{f['key']}.question.call.json")
        if not f.get('q') and os.path.exists(p):
            c = json.load(open(p))
            if c['ok']: f['is_fork'] = c['out']['is_fork']; f['q'] = c['out']['question'] if c['out']['is_fork'] else None
    json.dump(forks, open(P(a.data, a.forks), 'w'), indent=0, ensure_ascii=False)
    print(sum(1 for f in forks if f.get('q')), 'usable forks of', len(forks))

def step_snapshots(a, forks):
    full, sup = load_rulings(); db = sqlite3.connect(DB)
    os.makedirs(P(a.data, 'snapshots'), exist_ok=True)
    for f in forks:
        sp = P(a.data, 'snapshots', f['key'] + '.txt')
        if os.path.exists(sp): continue
        r = full[f['id']]; loc, frag = locate(db, r['quote']); job, ts = loc[0], loc[2]
        later_id = sup.get(f['id']); later = full.get(later_id, {}).get('rule')
        tail, t1 = same_room(db, job, ts)
        query = f['q'] + '\n' + tail[-3000:]
        rul, nlive, t2 = rulings_in_force(full, sup, ts, query, exclude={f['id'], later_id})
        oth, t3 = other_rooms(db, job, ts, query)
        snap = (f"== STANDING RULINGS IN FORCE AT THE TIME (most relevant {min(25, nlive)} of {nlive}) ==\n{rul or '(none)'}\n\n"
                f"== RECENT TRAFFIC IN OTHER ROOMS (last 72 h, most relevant) ==\n{oth or '(none)'}\n\n"
                f"== THIS ROOM, UP TO THE DECISION ==\n{tail}")
        # leak guard
        assert max(t1, t2, t3) < ts, f"{f['key']}: item at/after fork"
        assert frag not in snap, f"{f['key']}: deciding quote leaked"
        assert r['rule'][:80] not in snap, f"{f['key']}: taken ruling leaked"
        if later: assert later[:80] not in snap, f"{f['key']}: later ruling leaked"
        meta = {'key': f['key'], 'id': f['id'], 'job': job, 'fork_ts': ts,
                'fork_iso': datetime.fromtimestamp(ts / 1000, timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
                'taken': r['rule'], 'struck': f['id'] in sup, 'later_id': later_id, 'later': later, 'chars': len(snap),
                'parts': {'rulings_live': nlive, 'rulings_chars': len(rul), 'other_chars': len(oth), 'room_chars': len(tail)}}
        open(sp, 'w').write(snap)
        json.dump(meta, open(P(a.data, 'snapshots', f['key'] + '.meta.json'), 'w'), ensure_ascii=False, indent=1)
        print(f['key'], meta['fork_iso'], meta['chars'], meta['parts'], flush=True)

def snap_of(a, f): return open(P(a.data, 'snapshots', f['key'] + '.txt')).read()
def meta_of(a, f): return json.load(open(P(a.data, 'snapshots', f['key'] + '.meta.json')))
def menu_of(a, f, b): return json.load(open(P(a.data, 'calls', f"{f['key']}.{b}.merge.call.json")))['out']['options']

def step_propose(a, forks):
    jobs = []
    for f in forks:
        pr = head(snap_of(a, f), f['q']) + PROPOSE
        for i in range(a.draws):
            jobs.append((P(a.data, 'calls', f"{f['key']}.{a.build}.prop{i:02d}.call.json"), (lambda pr=pr: claude_call(pr, LIST_SCHEMA))))
    run_jobs(jobs, a.workers)

def pool_of(a, f, b):
    cnt, show = {}, {}
    for i in range(a.draws):
        p = P(a.data, 'calls', f"{f['key']}.{b}.prop{i:02d}.call.json")
        if not os.path.exists(p): continue
        c = json.load(open(p))
        for l in set((c.get('out') or {}).get('options', [])):
            k = norm(l); cnt[k] = cnt.get(k, 0) + 1; show.setdefault(k, l.strip())
    return sorted(((show[k], v) for k, v in cnt.items()), key=lambda x: (-x[1], x[0]))

def step_merge(a, forks):
    jobs = []
    for f in forks:
        pr = merge_prompt(snap_of(a, f), f['q'], pool_of(a, f, a.build))
        jobs.append((P(a.data, 'calls', f"{f['key']}.{a.build}.merge.call.json"),
                     (lambda pr=pr: claude_call(pr, MENU_SCHEMA, model='opus', system=SYS))))
    run_jobs(jobs, min(a.workers, 4))

def step_align(a, forks):
    jobs = []
    for f in forks:
        A, B = menu_of(a, f, 'A'), menu_of(a, f, 'B')
        la = '\n'.join(f"{i}. {o['label']} — {o['gloss']}" for i, o in enumerate(A))
        lb = '\n'.join(f"{i}. {o['label']} — {o['gloss']}" for i, o in enumerate(B))
        pr = (f"THE FORK: {f['q']}\n\nMENU A:\n{la}\n\nMENU B:\n{lb}\n\nTwo independently built menus of the options open at the same "
              "decision point. Pair each option in A with the option in B that means the SAME choice (same actor, direction, scope; wording "
              "may differ). One-to-one: each B option used at most once. Leave an option unpaired if B has no equivalent. Return only the "
              "pairs as {a: index, b: index}.")
        jobs.append((P(a.data, 'calls', f"{f['key']}.align.call.json"),
                     (lambda pr=pr: claude_call(pr, ALIGN_SCHEMA, model='sonnet', system="Answer only with the requested JSON."))))
    run_jobs(jobs, a.workers)

def step_key_opus(a, forks):
    jobs = []
    for f in forks:
        pr = key_prompt(menu_of(a, f, a.build), meta_of(a, f), f['q'])
        jobs.append((P(a.data, 'keys', f"{f['key']}.{a.build}.opus.call.json"),
                     (lambda pr=pr: claude_call(pr, KEY_SCHEMA, model='opus', system="Answer only with the requested JSON."))))
    os.makedirs(P(a.data, 'keys'), exist_ok=True)
    run_jobs(jobs, min(a.workers, 4))

def step_key_astra(a, forks, batch=25):
    os.makedirs(P(a.data, 'keys'), exist_ok=True)
    todo = [f for f in forks if not os.path.exists(P(a.data, 'keys', f"{f['key']}.{a.build}.astra.json"))]
    for s in range(0, len(todo), batch):
        chunk = todo[s:s + batch]
        parts = [f"### FORK {f['key']}\n" + key_prompt(menu_of(a, f, a.build), meta_of(a, f), f['q']) for f in chunk]
        pr = ("You are an independent annotator. For EACH fork below, do the mapping it asks for. Work only from the text given; do not "
              "read files. Reply with ONLY a JSON object, no prose and no code fence, of the form "
              "{\"<fork key>\": {\"taken\": int, \"taken_fit\": \"exact|approx|absent\", \"later\": int, \"later_fit\": \"exact|approx|absent|n/a\", \"why\": str}, ...}\n\n"
              + '\n\n'.join(parts))
        pf = P(a.data, 'keys', f"astra.{a.build}.{s:03d}.prompt.md"); rf = pf.replace('.prompt.md', '.reply.md')
        open(pf, 'w').write(pr)
        t0 = time.time()
        p = subprocess.run(['node', ASTRA, pf, rf], env={**os.environ, 'ASTRA_LANE': a.lane}, capture_output=True, text=True)
        print(p.stdout.strip(), p.stderr.strip()[-400:], flush=True)
        if p.returncode != 0: continue
        txt = open(rf).read(); txt = txt[txt.find('{'):txt.rfind('}') + 1]
        try: d = json.loads(txt)
        except Exception as e: print('astra parse fail', e); continue
        for f in chunk:
            if f['key'] in d:
                json.dump({'out': d[f['key']], 'wall': time.time() - t0, 'model': 'gpt-6-astra'},
                          open(P(a.data, 'keys', f"{f['key']}.{a.build}.astra.json"), 'w'))

def step_freeze(a, forks):
    h = hashlib.sha256(); files = sorted(x for x in os.listdir(P(a.data, 'keys')) if x.endswith('.json'))
    for x in files: h.update(x.encode()); h.update(open(P(a.data, 'keys', x), 'rb').read())
    rec = {'sha256': h.hexdigest(), 'files': len(files), 'frozen_at': datetime.now(timezone.utc).isoformat()}
    open(P(a.data, 'keys.frozen.jsonl'), 'a').write(json.dumps(rec) + '\n'); print(rec)

def step_select(a, forks):
    jobs = []
    for f in forks:
        snap, menu = snap_of(a, f), menu_of(a, f, a.build)
        for i in range(a.n):
            pr = sel_prompt(snap, f['q'], menu, a.arm, f"{f['key']}:{a.build}:{i}")
            eff = 'high' if a.arm == 'effort' else None
            jobs.append((P(a.data, 'calls', f"{f['key']}.{a.build}.{a.arm}.sel{i:02d}.call.json"),
                         (lambda pr=pr, eff=eff: claude_call(pr, SEL_SCHEMA, effort=eff))))
    run_jobs(jobs, a.workers)

def jacc(x, y): return len(x & y) / len(x | y) if x | y else 1.0

def fleiss(sets, labels):
    n = len(sets); N = len(labels)
    if n < 2 or N == 0: return None
    P_, pj = [], [0, 0]
    for l in labels:
        y = sum(l in s for s in sets); no = n - y
        P_.append((y * (y - 1) + no * (no - 1)) / (n * (n - 1))); pj[0] += y; pj[1] += no
    Pbar = sum(P_) / N; tot = n * N; Pe = (pj[0] / tot) ** 2 + (pj[1] / tot) ** 2
    return (Pbar - Pe) / (1 - Pe) if Pe < 1 else None

def load_key(a, f, b, who):
    p = P(a.data, 'keys', f"{f['key']}.{b}.{who}.call.json" if who == 'opus' else f"{f['key']}.{b}.{who}.json")
    if not os.path.exists(p): return None
    d = json.load(open(p)); return d.get('out')

def runs_of(a, f, b, arm, menu):
    labels = [norm(o['label']) for o in menu]; out = []; cost = 0; fails = 0
    for i in range(a.n):
        p = P(a.data, 'calls', f"{f['key']}.{b}.{arm}.sel{i:02d}.call.json")
        if not os.path.exists(p): continue
        c = json.load(open(p)); cost += c['cost']
        if not c['ok']: fails += 1; continue
        op = frozenset(labels.index(norm(x)) for x in c['out']['open'] if norm(x) in labels)
        lk = norm(c['out']['likely']); out.append((op, labels.index(lk) if lk in labels else None))
    return out, cost, fails

def r2(x): return None if x is None else round(x, 2)

def step_score(a, forks):
    builds = [b for b in ('A', 'B') if all(os.path.exists(P(a.data, 'calls', f"{f['key']}.{b}.merge.call.json")) for f in forks)]
    arms = [x for x in ('base', 'frame', 'effort') if any(os.path.exists(P(a.data, 'calls', f"{f['key']}.{builds[0]}.{x}.sel00.call.json")) for f in forks)]
    rows, cost = [], 0
    for f in forks:
        meta = meta_of(a, f); row = {'key': f['key'], 'struck': meta['struck'], 'q': f['q'], 'fork_iso': meta['fork_iso'], 'b': {}}
        for b in builds:
            menu = menu_of(a, f, b); kinds = [o['kind'] for o in menu]
            ko, ka = load_key(a, f, b, 'opus'), load_key(a, f, b, 'astra')
            def idx(k, w):
                if not k: return None
                i = k.get(w); fit = k.get(w + '_fit')
                return i if fit in ('exact', 'approx') and isinstance(i, int) and 0 <= i < len(menu) else -1
            br = {'menu': len(menu), 'taken_opus': idx(ko, 'taken'), 'taken_astra': idx(ka, 'taken'),
                  'later_opus': idx(ko, 'later') if meta['struck'] else None, 'later_astra': idx(ka, 'later') if meta['struck'] else None,
                  'taken_fit_opus': (ko or {}).get('taken_fit'), 'kinds': kinds, 'arms': {}}
            t = br['taken_opus']; L = br['later_opus']
            br['taken_kind'] = kinds[t] if t is not None and t >= 0 else None
            for arm in arms:
                runs, c, fails = runs_of(a, f, b, arm, menu); cost += c
                if not runs: continue
                sets = [r[0] for r in runs]; pairs = list(itertools.combinations(sets, 2))
                freq = [sum(i in s for s in sets) / len(sets) for i in range(len(menu))]
                sq = [i for i, k in enumerate(kinds) if k in ('status_quo', 'defer')]
                br['arms'][arm] = {
                    'runs': len(runs), 'fails': fails,
                    'jaccard': r2(sum(jacc(x, y) for x, y in pairs) / len(pairs)) if pairs else None,
                    'kappa': r2(fleiss(sets, list(range(len(menu))))), 'freq': [round(x, 2) for x in freq],
                    'core': [i for i, x in enumerate(freq) if x >= .5],
                    'sq_likely': r2(sum(r[1] in sq for r in runs) / len(runs)),
                    'sq_open': r2(sum(bool(r[0] & set(sq)) for r in runs) / len(runs)),
                    'likely_mode': max(set(r[1] for r in runs), key=lambda v: sum(r[1] == v for r in runs)),
                    'taken_open': r2(sum(t in r[0] for r in runs) / len(runs)) if t is not None and t >= 0 else None,
                    'taken_likely': r2(sum(r[1] == t for r in runs) / len(runs)) if t is not None and t >= 0 else None,
                    'later_open': r2(sum(L in r[0] for r in runs) / len(runs)) if L is not None and L >= 0 else None,
                    'later_likely': r2(sum(r[1] == L for r in runs) / len(runs)) if L is not None and L >= 0 else None,
                }
            row['b'][b] = br
        if 'A' in row['b'] and 'B' in row['b'] and os.path.exists(P(a.data, 'calls', f"{f['key']}.align.call.json")):
            al = json.load(open(P(a.data, 'calls', f"{f['key']}.align.call.json")))['out']['pairs']
            A, B = row['b']['A'], row['b']['B']
            pa = {p['a'] for p in al}; pb = {p['b'] for p in al}
            row['align_f1'] = r2(2 * len(al) / (A['menu'] + B['menu']))
            if 'base' in A['arms'] and 'base' in B['arms']:
                ca, cb = A['arms']['base']['core'], B['arms']['base']['core']
                cov = [sum(i in pa for i in ca) / len(ca) if ca else None, sum(i in pb for i in cb) / len(cb) if cb else None]
                cov = [x for x in cov if x is not None]
                row['core_cov'] = r2(sum(cov) / len(cov)) if cov else None
                amap = {p['a']: p['b'] for p in al}
                ta, tb = A['taken_opus'], B['taken_opus']
                row['taken_same_option'] = (ta is not None and ta >= 0 and amap.get(ta) == tb)
        rows.append(row)
    # aggregates
    agg = {'builds': builds, 'arms': arms, 'cost_usd_selection': round(cost, 3), 'n_forks': len(rows)}
    if len(builds) == 2:
        cc = [r['core_cov'] for r in rows if r.get('core_cov') is not None]
        agg['S1_core_coverage'] = r2(sum(cc) / len(cc)) if cc else None
        agg['align_f1'] = r2(sum(r['align_f1'] for r in rows if r.get('align_f1') is not None) / max(1, sum(1 for r in rows if r.get('align_f1') is not None)))
        onA = [r['b']['A']['taken_opus'] not in (None, -1) for r in rows]; onB = [r['b']['B']['taken_opus'] not in (None, -1) for r in rows]
        agg['S2_taken_on_both'] = r2(sum(x and y for x, y in zip(onA, onB)) / len(rows))
        agg['S2_presence_agree'] = r2(sum(x == y for x, y in zip(onA, onB)) / len(rows))
        d = [abs(r['b']['A']['arms']['base']['taken_open'] - r['b']['B']['arms']['base']['taken_open']) for r in rows
             if 'base' in r['b']['A']['arms'] and 'base' in r['b']['B']['arms'] and r['b']['A']['arms']['base']['taken_open'] is not None
             and r['b']['B']['arms']['base']['taken_open'] is not None]
        agg['S3_within_0.2'] = r2(sum(x <= .2 for x in d) / len(d)) if d else None; agg['S3_n'] = len(d)
        agg['S3_mean_absdiff'] = r2(sum(d) / len(d)) if d else None
    cells = [(r['b'][b]['taken_opus'], r['b'][b]['taken_astra']) for r in rows for b in builds if r['b'][b]['taken_astra'] is not None]
    agg['S4_mapper_agree'] = r2(sum(x == y for x, y in cells) / len(cells)) if cells else None; agg['S4_n'] = len(cells)
    lc = [(r['b'][b]['later_opus'], r['b'][b]['later_astra']) for r in rows for b in builds if r['struck'] and r['b'][b]['later_astra'] is not None]
    agg['later_mapper_agree'] = r2(sum(x == y for x, y in lc) / len(lc)) if lc else None
    for arm in arms:
        cells = [r['b'][b]['arms'][arm] for r in rows for b in builds if arm in r['b'][b]['arms']]
        def m(k): v = [c[k] for c in cells if c.get(k) is not None]; return r2(sum(v) / len(v)) if v else None
        agg[arm] = {k: m(k) for k in ('jaccard', 'kappa', 'sq_likely', 'sq_open', 'taken_open', 'taken_likely', 'later_open', 'later_likely')}
        agg[arm]['taken_open_ge80'] = sum(1 for c in cells if (c.get('taken_open') or 0) >= .8); agg[arm]['cells'] = len(cells)
    tk = [r['b'][b]['taken_kind'] for r in rows for b in builds]
    agg['tom_taken_sq_share'] = r2(sum(k in ('status_quo', 'defer') for k in tk) / len(tk))
    json.dump({'agg': agg, 'rows': rows}, open(P(a.data, 'scores2.json'), 'w'), indent=1, ensure_ascii=False)
    print(json.dumps(agg, indent=1))

if __name__ == '__main__':
    main()
