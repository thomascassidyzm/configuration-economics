#!/usr/bin/env python3
"""Fork reconstruction, round 3 (the control): stronger selectors and further question wordings on the
round-2 misses. Reads round 2's frozen snapshots, menus and keys read-only from --r2; writes every new call
into --data. One process, one thread pool, resumable (an ok call file is never re-run; failures are retried).
See PREREG-round3.md, committed before any run.

  sets                      build sets.json (M = missed 90, S = split 80, R = 30 reconstructed sample)
  wordings                  W_sonnet (Sonnet) and W_astra (GPT-6 Astra) questions for set M
  select                    all selection runs (part 1 and part 2) in one pool
  score                     model-free scoring -> scores3.json
"""
import argparse, json, os, random, re, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import recon2 as R2

MODELS = {'haiku': R2.HAIKU, 'sonnet': 'sonnet', 'opus': 'opus'}   # haiku pinned exactly as round 2
N = 10

def P(a, *x): return os.path.join(a.data, *x)
def Q(a, *x): return os.path.join(a.r2, *x)

def step_sets(a):
    rows = json.load(open(Q(a, 'scores2.annot.json')))['rows']
    by = {}
    for r in rows: by.setdefault(r['cls'], []).append(r['key'])
    sets = {'M': sorted(by['missed']), 'S': sorted(by['split']),
            'R': sorted(random.Random(3).sample(sorted(by['reconstructed']), 30))}
    json.dump(sets, open(P(a, 'sets.json'), 'w'), indent=1)
    print({k: len(v) for k, v in sets.items()})

def forks_by_key(a): return {f['key']: f for f in json.load(open(Q(a, 'forks-all.json')))}

def run_jobs(jobs, workers, passes=4):
    for p in range(passes):
        todo = []
        for path, fn in jobs:
            if os.path.exists(path):
                try:
                    if json.load(open(path)).get('ok'): continue
                except Exception: pass
            todo.append((path, fn))
        print(f"pass {p}: {len(jobs)} calls, {len(todo)} to run {time.strftime('%H:%M:%S')}", flush=True)
        if not todo: return
        done = [0]
        def one(j):
            path, fn = j
            r = fn()
            tmp = path + '.tmp'; json.dump(r, open(tmp, 'w'), ensure_ascii=False); os.replace(tmp, path)
            done[0] += 1
            if done[0] % 100 == 0: print(f"  {done[0]}/{len(todo)} {time.strftime('%H:%M:%S')}", flush=True)
        with ThreadPoolExecutor(workers) as ex: list(ex.map(one, todo))
        if p < passes - 1: time.sleep(60)

def qprompt(r):   # the round-2 question prompt, verbatim
    return (f"A ruling recorded in a founder's work log:\n\nRULING: {r['rule']}\nTHE WORDS THAT MADE IT: {r.get('quote','')}\n\n"
            "1) is_fork: was this a genuine decision among alternatives (who/what/whether/how much/which way), as opposed to a statement "
            "of fact, a definition, a description, a personal preference about wording/style, or a bug report? Pure style or voice rules "
            "are not forks. 2) question: write ONE neutral question that poses the decision point as it stood BEFORE it was made. The "
            "question must name the topic and the scope of the choice, must NOT reveal, hint at or lean toward the answer, and must not "
            "use any distinctive word or number from the ruling that only the answer would contain. Plain English, one sentence.")

def step_wordings(a):
    sets = json.load(open(P(a, 'sets.json'))); fk = forks_by_key(a); full, _ = R2.load_rulings()
    os.makedirs(P(a, 'wordings'), exist_ok=True)
    jobs = [(P(a, 'wordings', f"{k}.sonnet.call.json"),
             (lambda pr=qprompt(full[fk[k]['id']]): R2.claude_call(pr, R2.Q_SCHEMA, model='sonnet', system="Answer only with the requested JSON.")))
            for k in sets['M']]
    run_jobs(jobs, a.workers)
    todo = [k for k in sets['M'] if not os.path.exists(P(a, 'wordings', f"{k}.astra.json"))]
    for s in range(0, len(todo), 25):
        chunk = todo[s:s + 25]
        parts = [f"### FORK {k}\n" + qprompt(full[fk[k]['id']]) for k in chunk]
        pr = ("You are an independent writer. For EACH ruling below, answer the two numbered items it asks for. Work only from the text "
              "given; do not read files. Reply with ONLY a JSON object, no prose and no code fence, of the form "
              "{\"<fork key>\": {\"is_fork\": bool, \"question\": str, \"why\": str}, ...}\n\n" + '\n\n'.join(parts))
        pf = P(a, 'wordings', f"astra.{s:03d}.prompt.md"); rf = pf.replace('.prompt.md', '.reply.md'); open(pf, 'w').write(pr)
        p = subprocess.run(['node', R2.ASTRA, pf, rf], env={**os.environ, 'ASTRA_LANE': a.lane}, capture_output=True, text=True)
        print(p.stdout.strip(), p.stderr.strip()[-400:], flush=True)
        if p.returncode != 0: continue
        txt = open(rf).read(); txt = txt[txt.find('{'):txt.rfind('}') + 1]
        try: d = json.loads(txt)
        except Exception as e: print('astra parse fail', e); continue
        for k in chunk:
            if k in d: json.dump({'ok': True, 'out': d[k], 'model': 'gpt-6-astra'}, open(P(a, 'wordings', f"{k}.astra.json"), 'w'))
    ws = {}
    for k in sets['M']:
        ws[k] = {'opus': fk[k]['q']}
        for w, fn in (('sonnet', f"{k}.sonnet.call.json"), ('astra', f"{k}.astra.json")):
            p = P(a, 'wordings', fn)
            if os.path.exists(p):
                c = json.load(open(p))
                if c.get('ok') and (c['out'].get('question') or '').strip(): ws[k][w] = c['out']['question'].strip()
    json.dump(ws, open(P(a, 'wordings.json'), 'w'), indent=1, ensure_ascii=False)
    print('wordings:', sum(len(v) for v in ws.values()), 'for', len(ws), 'forks')

def cells(a):
    sets = json.load(open(P(a, 'sets.json'))); fk = forks_by_key(a)
    ws = json.load(open(P(a, 'wordings.json'))) if os.path.exists(P(a, 'wordings.json')) else {}
    out = []   # (key, wording, model, question)
    for k in sets['M'] + sets['S'] + sets['R']:
        for m in MODELS: out.append((k, 'opus', m, fk[k]['q']))
    if a.part >= 2:
        for k in sets['M']:
            for w in ('sonnet', 'astra'):
                if w in ws.get(k, {}):
                    for m in MODELS: out.append((k, w, m, ws[k][w]))
    return out

def step_select(a):
    os.makedirs(P(a, 'calls'), exist_ok=True)
    jobs = []
    snaps, menus = {}, {}
    for k, w, m, q in cells(a):
        if k not in snaps:
            snaps[k] = open(Q(a, 'snapshots', k + '.txt')).read()
            menus[k] = json.load(open(Q(a, 'calls', f"{k}.A.merge.call.json")))['out']['options']
        for i in range(N):
            pr = R2.sel_prompt(snaps[k], q, menus[k], 'base', f"{k}:A:{i}")
            jobs.append((P(a, 'calls', f"{k}.W{w}.{m}.sel{i:02d}.call.json"),
                         (lambda pr=pr, m=m: R2.claude_call(pr, R2.SEL_SCHEMA, model=MODELS[m]))))
    # interleave models so the pool never stalls on one model's rate limit
    random.Random(0).shuffle(jobs)
    run_jobs(jobs, a.workers)

def step_score(a):
    sets = json.load(open(P(a, 'sets.json'))); fk = forks_by_key(a)
    r2rows = {r['key']: r for r in json.load(open(Q(a, 'scores2.annot.json')))['rows']}
    ws = json.load(open(P(a, 'wordings.json'))) if os.path.exists(P(a, 'wordings.json')) else {}
    setof = {k: s for s in sets for k in sets[s]}
    rows, served, cost, fails = [], {}, 0.0, 0
    for k in sets['M'] + sets['S'] + sets['R']:
        r2 = r2rows[k]['b']['A']; meta = json.load(open(Q(a, 'snapshots', k + '.meta.json')))
        menu = json.load(open(Q(a, 'calls', f"{k}.A.merge.call.json")))['out']['options']
        labels = [R2.norm(o['label']) for o in menu]; kinds = [o['kind'] for o in menu]
        sq = {i for i, kd in enumerate(kinds) if kd in ('status_quo', 'defer')}
        t, ta = r2['taken_opus'], r2['taken_astra']
        row = {'key': k, 'set': setof[k], 'id': fk[k]['id'], 'struck': meta['struck'], 'haiku_r2': r2['arms']['base']['taken_open'],
               'haiku_r2_sq': r2['arms']['base']['sq_likely'], 'taken': t, 'taken_astra': ta, 'cells': {}}
        for w in ('opus', 'sonnet', 'astra'):
            for m in MODELS:
                runs = []
                for i in range(N):
                    p = P(a, 'calls', f"{k}.W{w}.{m}.sel{i:02d}.call.json")
                    if not os.path.exists(p): continue
                    c = json.load(open(p)); cost += c.get('cost') or 0
                    for mm in c.get('models') or []: served[mm] = served.get(mm, 0) + 1
                    if not c['ok']: fails += 1; continue
                    op = {labels.index(R2.norm(x)) for x in c['out']['open'] if R2.norm(x) in labels}
                    lk = R2.norm(c['out']['likely']); runs.append((op, labels.index(lk) if lk in labels else None))
                if not runs: continue
                n = len(runs)
                row['cells'][f"{w}/{m}"] = {
                    'n': n,
                    'p': round(sum(t in r[0] for r in runs) / n, 2) if t is not None and t >= 0 else None,
                    'p_astra_key': round(sum(ta in r[0] for r in runs) / n, 2) if ta is not None and ta >= 0 else None,
                    'likely': round(sum(r[1] == t for r in runs) / n, 2) if t is not None and t >= 0 else None,
                    'sq_likely': round(sum(r[1] in sq for r in runs) / n, 2),
                    'size': round(sum(len(r[0]) for r in runs) / n, 2),
                    'freq': [round(sum(i in r[0] for r in runs) / n, 1) for i in range(len(menu))]}
        rows.append(row)
    json.dump({'rows': rows, 'served': served, 'cost_usd_list': round(cost, 2), 'fails': fails},
              open(P(a, 'scores3.json'), 'w'), indent=1, ensure_ascii=False)
    print('rows', len(rows), 'served', served, 'cost', round(cost, 2), 'fails', fails)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('step'); ap.add_argument('--data', required=True)
    ap.add_argument('--r2', default=os.path.expanduser('~/ce-experiments/fork-recon-r2-scale'))
    ap.add_argument('--workers', type=int, default=14); ap.add_argument('--lane', default='3'); ap.add_argument('--part', type=int, default=2)
    a = ap.parse_args(); os.makedirs(a.data, exist_ok=True)
    globals()['step_' + a.step](a)

if __name__ == '__main__':
    main()
