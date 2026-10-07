#!/usr/bin/env python3
"""Fork-reconstruction agreement test (precondition for option-space measurement on the estate record).

Real forks only: each fork is a ruling in command-surface ops/rulings.jsonl, located at the human
message that made it (events table). The snapshot is the conversation tail strictly BEFORE that
message. Haiku reconstructs the options open at that moment; agreement and hit-rates are scored
with no model call.

Data (snapshots, model outputs, the fork list, the answer key) lives OUTSIDE this public repo, in
--data. Steps:  snapshots | vocab | select | score   (each resumable; outputs are skipped if present)
"""
import argparse, json, os, random, sqlite3, subprocess, sys, time, itertools
from concurrent.futures import ThreadPoolExecutor

DB = '/home/tomcassidy/command-surface/command-surface.db'
RULINGS = '/home/tomcassidy/command-surface/ops/rulings.jsonl'
MODEL = 'claude-haiku-5-5'
CLAUDE = os.path.expanduser('~/.local/bin/claude')

def load_rulings():
    rs = [json.loads(l) for l in open(RULINGS) if l.strip()]
    full = {}
    for r in rs:
        if r.get('rule') and r['id'] not in full: full[r['id']] = r
    sup = {r['id']: r['superseded_by'] for r in rs if r.get('superseded_by')}
    return full, sup

def locate(db, quote):
    frag = quote.split('...')[0].strip()[:60]
    return db.execute("select job_id,seq,ts from events where kind='reply' and data like ? and "
                      "json_extract(data,'$.source')='human' order by ts limit 1", ('%' + frag + '%',)).fetchone()

def context(db, job, ts, budget=7000, per=1400):
    items = []
    for t, d in db.execute("select ts,data from events where job_id=? and kind='reply' and ts<? order by ts desc limit 40", (job, ts)):
        d = json.loads(d); src = d.get('source')
        who = 'Tom' if src == 'human' else ('System/worker report' if src in ('worker', 'surface', 'agent') else 'Message')
        items.append((t, who, d.get('text', '')))
    for t, res in db.execute("select ended,result from turns where job_id=? and ended<? and result is not null order by ended desc limit 25", (job, ts)):
        items.append((t, 'Watson (assistant)', res or ''))
    items.sort(reverse=True)
    out, n = [], 0
    for t, who, txt in items:
        txt = (txt or '').strip()
        if not txt: continue
        if len(txt) > per: txt = txt[:per] + ' …[truncated]'
        blk = f"[{who}]\n{txt}"
        if n + len(blk) > budget: break
        out.append(blk); n += len(blk)
    return '\n\n'.join(reversed(out))

SYS = ("You reconstruct real decision points from a work record. You see only what was known at the moment "
       "just before a decision was made; nothing after it. Answer only with the requested JSON.")

def call(prompt, schema):
    env = dict(os.environ); env.pop('CLAUDECODE', None)
    cfg = env.get('CLAUDE_CONFIG_DIR')
    if cfg and not env.get('CLAUDE_CODE_OAUTH_TOKEN'):
        try: env['CLAUDE_CODE_OAUTH_TOKEN'] = open(os.path.join(cfg, '.cs-oauth-token')).read().strip()
        except OSError: pass
    args = [CLAUDE, '-p', '--model', MODEL, '--system-prompt', SYS, '--tools', '', '--setting-sources', '',
            '--strict-mcp-config', '--no-session-persistence', '--output-format', 'json', '--json-schema', json.dumps(schema)]
    t0 = time.time()
    p = subprocess.run(args, input=prompt, capture_output=True, text=True, env=env, timeout=300)
    try: d = json.loads(p.stdout)
    except Exception: d = {'is_error': True, 'raw': p.stdout[-500:], 'stderr': p.stderr[-500:]}
    mu = (d.get('modelUsage') or {}).get(MODEL, {})
    return {'ok': not d.get('is_error') and d.get('structured_output') is not None, 'out': d.get('structured_output'),
            'cost': d.get('total_cost_usd') or 0, 'wall': time.time() - t0, 'models': list((d.get('modelUsage') or {}).keys()),
            'tok': {k: mu.get(k, 0) for k in ('inputTokens', 'outputTokens', 'cacheReadInputTokens', 'cacheCreationInputTokens')},
            'err': None if not d.get('is_error') else str(d.get('result') or d.get('raw'))[:300]}

def head(snap, q):
    return (f"RECORD (conversation up to, not including, the decision):\n<<<\n{snap}\n>>>\n\n"
            f"THE FORK: {q}\nThe decision-maker is Tom (founder). Work only from what the record shows was known then.\n\n")

VOCAB_SCHEMA = {"type": "object", "properties": {"options": {"type": "array", "items": {"type": "string"}}}, "required": ["options"]}
SEL_SCHEMA = {"type": "object", "properties": {"open": {"type": "array", "items": {"type": "string"}},
                                               "added": {"type": "array", "items": {"type": "string"}}}, "required": ["open", "added"]}

def norm(s): return ' '.join(''.join(c.lower() if c.isalnum() else ' ' for c in s).split())

def spent(data):
    tot = 0
    for root, _, fs in os.walk(data):
        for f in fs:
            if f.endswith('.call.json'):
                try: tot += json.load(open(os.path.join(root, f))).get('cost', 0)
                except Exception: pass
    return tot

def guarded(data, cap):
    s = spent(data)
    if s >= cap: sys.exit(f"STOP: spend ${s:.3f} reached cap ${cap}")
    return s

def run_jobs(jobs, data, cap, workers):
    def one(j):
        path, prompt, schema = j
        if os.path.exists(path): return
        if spent_live[0] >= cap: return
        r = call(prompt, schema)
        spent_live[0] += r['cost']
        json.dump(r, open(path, 'w'), ensure_ascii=False)
    spent_live = [spent(data)]
    with ThreadPoolExecutor(workers) as ex: list(ex.map(one, jobs))
    if spent_live[0] >= cap: sys.exit(f"STOP: spend ${spent_live[0]:.3f} reached cap ${cap}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('step', choices=['snapshots', 'vocab', 'select', 'score'])
    ap.add_argument('--data', required=True); ap.add_argument('--n', type=int, default=30)
    ap.add_argument('--vocab-runs', type=int, default=3); ap.add_argument('--cap', type=float, default=4.5)
    ap.add_argument('--workers', type=int, default=6); ap.add_argument('--only')
    a = ap.parse_args()
    forks = json.load(open(os.path.join(a.data, 'forks.json')))
    if a.only: forks = [f for f in forks if f['key'] in a.only.split(',')]
    os.makedirs(os.path.join(a.data, 'calls'), exist_ok=True)
    if a.step == 'snapshots':
        full, sup = load_rulings(); db = sqlite3.connect(DB)
        os.makedirs(os.path.join(a.data, 'snapshots'), exist_ok=True)
        for f in forks:
            r = full[f['id']]; loc = locate(db, r['quote'])
            snap = context(db, loc[0], loc[2])
            frag = r['quote'].split('...')[0].strip()[:60]
            assert frag not in snap, f"{f['key']}: deciding message leaked into snapshot"
            meta = {'key': f['key'], 'job': loc[0], 'fork_ts': loc[2], 'fork_iso': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(loc[2] / 1000)),
                    'taken': r['rule'], 'struck': f['id'] in sup, 'later': full.get(sup.get(f['id']), {}).get('rule'), 'chars': len(snap)}
            open(os.path.join(a.data, 'snapshots', f['key'] + '.txt'), 'w').write(snap)
            json.dump(meta, open(os.path.join(a.data, 'snapshots', f['key'] + '.meta.json'), 'w'), ensure_ascii=False, indent=1)
            print(f['key'], meta['fork_iso'], meta['chars'])
    elif a.step == 'vocab':
        jobs = []
        for f in forks:
            snap = open(os.path.join(a.data, 'snapshots', f['key'] + '.txt')).read()
            p = head(snap, f['q']) + ("List the 8 to 12 distinct options that were genuinely open to the decision-maker at this moment. "
                 "Include the status quo / do-nothing / defer option if it was open. Each option is a canonical short label: 3 to 10 words, "
                 "plain lowercase English, no numbering, specific enough to tell the options apart. Options should be mutually exclusive where possible.")
            for i in range(a.vocab_runs): jobs.append((os.path.join(a.data, 'calls', f"{f['key']}.vocab{i}.call.json"), p, VOCAB_SCHEMA))
        run_jobs(jobs, a.data, a.cap, a.workers)
    elif a.step == 'select':
        jobs = []
        for f in forks:
            snap = open(os.path.join(a.data, 'snapshots', f['key'] + '.txt')).read()
            menu = json.load(open(os.path.join(a.data, 'calls', f"{f['key']}.vocab0.call.json")))['out']['options']
            for i in range(a.n):
                m = menu[:]; random.Random(f"{f['key']}:{i}").shuffle(m)  # per-run order, deterministic
                p = head(snap, f['q']) + ("MENU of candidate options (canonical labels):\n" + '\n'.join('- ' + x for x in m) +
                     "\n\nSelect the options that were GENUINELY OPEN at this moment: reachable and live given what was known then, not merely "
                     "conceivable. Choose between 2 and 6. Copy each chosen label EXACTLY as written in the menu into \"open\". "
                     "If a genuinely open option is missing from the menu, put it as a short label in \"added\" (at most 2; usually none).")
                jobs.append((os.path.join(a.data, 'calls', f"{f['key']}.sel{i:02d}.call.json"), p, SEL_SCHEMA))
        run_jobs(jobs, a.data, a.cap, a.workers)
    elif a.step == 'score':
        score(a, forks)

def jacc(a, b): return len(a & b) / len(a | b) if a | b else 1.0

def fleiss(sets, labels):
    n = len(sets); N = len(labels)
    if n < 2 or N == 0: return None
    P, pj = [], [0, 0]
    for l in labels:
        y = sum(l in s for s in sets); no = n - y
        P.append((y * (y - 1) + no * (no - 1)) / (n * (n - 1))); pj[0] += y; pj[1] += no
    Pbar = sum(P) / N; tot = n * N; Pe = (pj[0] / tot) ** 2 + (pj[1] / tot) ** 2
    return (Pbar - Pe) / (1 - Pe) if Pe < 1 else None

def score(a, forks):
    key = json.load(open(os.path.join(a.data, 'key.json')))
    rows, cost, wall, tok = [], 0, 0, {}
    for f in forks:
        meta = json.load(open(os.path.join(a.data, 'snapshots', f['key'] + '.meta.json')))
        vocabs = []
        for i in range(a.vocab_runs):
            c = json.load(open(os.path.join(a.data, 'calls', f"{f['key']}.vocab{i}.call.json")))
            cost += c['cost']; wall += c['wall']; [tok.__setitem__(k, tok.get(k, 0) + v) for k, v in c['tok'].items()]
            vocabs.append({norm(x) for x in (c['out'] or {}).get('options', [])})
        menu = [norm(x) for x in vocabs and json.load(open(os.path.join(a.data, 'calls', f"{f['key']}.vocab0.call.json")))['out']['options']]
        sets, offmenu, added, fails = [], 0, 0, 0
        for i in range(a.n):
            p = os.path.join(a.data, 'calls', f"{f['key']}.sel{i:02d}.call.json")
            if not os.path.exists(p): continue
            c = json.load(open(p)); cost += c['cost']; wall += c['wall']; [tok.__setitem__(k, tok.get(k, 0) + v) for k, v in c['tok'].items()]
            if not c['ok']: fails += 1; continue
            chosen = [norm(x) for x in c['out'].get('open', [])]
            offmenu += sum(x not in menu for x in chosen); added += len(c['out'].get('added', []))
            sets.append(frozenset(x for x in chosen if x in menu))
        k = key[f['key']]
        taken = {norm(menu[i]) for i in k.get('taken', [])}; later = {norm(menu[i]) for i in k.get('later', [])}
        pairs = list(itertools.combinations(sets, 2))
        freq = {l: sum(l in s for s in sets) / len(sets) for l in menu} if sets else {}
        rows.append({
            'key': f['key'], 'kind': 'struck' if meta['struck'] else 'held', 'runs': len(sets), 'fails': fails,
            'menu': len(menu), 'mean_sel': round(sum(map(len, sets)) / len(sets), 2) if sets else None,
            'jaccard': round(sum(jacc(x, y) for x, y in pairs) / len(pairs), 3) if pairs else None,
            'kappa': round(fleiss(sets, menu), 3) if sets else None,
            'decisive': round(sum(1 for v in freq.values() if v >= .8 or v <= .2) / len(freq), 2) if freq else None,
            'vocab_overlap': round(sum(jacc(x, y) for x, y in itertools.combinations(vocabs, 2)) / max(1, len(vocabs) * (len(vocabs) - 1) // 2), 3),
            'taken_in_menu': bool(taken), 'taken_rate': round(sum(bool(s & taken) for s in sets) / len(sets), 2) if taken and sets else None,
            'later_in_menu': bool(later) if meta['struck'] else None,
            'later_rate': round(sum(bool(s & later) for s in sets) / len(sets), 2) if later and sets else None,
            'offmenu': offmenu, 'added': added,
        })
    out = {'rows': rows, 'cost_usd': round(cost, 4), 'model_seconds_summed': round(wall, 1), 'tokens': tok}
    json.dump(out, open(os.path.join(a.data, 'scores.json'), 'w'), indent=1)
    print(json.dumps(out, indent=1))

if __name__ == '__main__':
    main()
