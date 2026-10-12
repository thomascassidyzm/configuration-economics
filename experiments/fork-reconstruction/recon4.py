#!/usr/bin/env python3
"""Fork reconstruction, round 4 (the record ceiling): does Opus recover the misses when it reads a much wider slice of
the record? Plus the Opus baseline on the reconstructed forks round 3 did not sample. Reads round 2 (snapshots, menus,
keys) and round 3 (sets, scores) read-only; writes into --data. Resumable: an ok call file is never re-run.
See PREREG-round4.md, committed before any run.

  wide      build wide snapshots for sets M and R (+ leak guard, + prior_tom_sim flag)
  select    part A (77 reconstructed, round-2 snapshot) and part B (M + R, wide snapshot), Opus x 10, one pool
  score     model-free scoring -> scores4.json
"""
import argparse, json, os, random, sqlite3, sys
from datetime import datetime, timezone
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import recon2 as R2
import recon3 as R3

N = 10
MODEL = 'opus'
WIDE = dict(room_budget=40000, room_per=4000, room_events=200, room_turns=100,
            other_hours=336, other_budget=30000, other_per=2000, rulings_top=60)

def P(a, *x): return os.path.join(a.data, *x)
def Q2(a, *x): return os.path.join(a.r2, *x)
def Q3(a, *x): return os.path.join(a.r3, *x)

def same_room_wide(db, job, ts):
    items = []
    for t, d in db.execute("select ts,data from events where job_id=? and kind='reply' and ts<? order by ts desc limit ?",
                           (job, ts, WIDE['room_events'])):
        d = json.loads(d); items.append((t, R2.who_of(d.get('source')), d.get('text', '')))
    for t, res in db.execute("select ended,result from turns where job_id=? and ended<? and result is not null order by ended desc limit ?",
                             (job, ts, WIDE['room_turns'])):
        items.append((t, 'Watson (assistant)', res or ''))
    items.sort(reverse=True)
    out, n, maxts, tom = [], 0, 0, []
    for t, who, txt in items:
        txt = (txt or '').strip()
        if not txt: continue
        if len(txt) > WIDE['room_per']: txt = txt[:WIDE['room_per']] + ' …[truncated]'
        blk = f"[{who}]\n{txt}"
        if n + len(blk) > WIDE['room_budget']: break
        out.append(blk); n += len(blk); maxts = max(maxts, t)
        if who == 'Tom': tom.append(txt)
    return '\n\n'.join(reversed(out)), maxts, tom

def other_rooms_wide(db, job, ts, query):
    lo = ts - WIDE['other_hours'] * 3600000
    labels = dict(db.execute("select id,label from jobs"))
    items = []
    for j, t, d in db.execute("select job_id,ts,data from events where kind='reply' and ts>=? and ts<? and job_id<>?", (lo, ts, job)):
        d = json.loads(d); txt = (d.get('text') or '').strip()
        if len(txt) > 40: items.append((t, j, R2.who_of(d.get('source')), txt))
    for j, t, res in db.execute("select job_id,ended,result from turns where ended>=? and ended<? and job_id<>? and result is not null", (lo, ts, job)):
        if res and len(res) > 40: items.append((t, j, 'Assistant', res.strip()))
    if not items: return '', 0, []
    order, sc = R2.bm25_rank(query, [x[3] for x in items])
    pick, n, maxts, tom = [], 0, 0, []
    for i in order:
        if sc[i] <= 0: break
        t, j, who, txt = items[i]
        if len(txt) > WIDE['other_per']: txt = txt[:WIDE['other_per']] + ' …[truncated]'
        when = datetime.fromtimestamp(t / 1000, timezone.utc).strftime('%m-%d %H:%MZ')
        blk = f"[{when} · room \"{(labels.get(j) or '?')[:50]}\" · {who}]\n{txt}"
        if n + len(blk) > WIDE['other_budget']: continue
        pick.append((t, blk)); n += len(blk); maxts = max(maxts, t)
        if who == 'Tom': tom.append(txt)
        if n > WIDE['other_budget'] - 200: break
    pick.sort()
    return '\n\n'.join(b for _, b in pick), maxts, tom

def overlap(rule, txt):
    r = set(R2.toks(rule))
    return len(r & set(R2.toks(txt))) / len(r) if r else 0.0

def step_wide(a):
    sets = json.load(open(Q3(a, 'sets.json'))); fk = R3.forks_by_key(argparse.Namespace(r2=a.r2))
    full, sup = R2.load_rulings(); db = sqlite3.connect(f"file:{R2.DB}?mode=ro", uri=True)
    os.makedirs(P(a, 'snapshots'), exist_ok=True)
    for k in sets['M'] + sets['R']:
        sp = P(a, 'snapshots', k + '.txt')
        if os.path.exists(sp): continue
        f = fk[k]; m2 = json.load(open(Q2(a, 'snapshots', k + '.meta.json')))
        r = full[f['id']]; loc, frag = R2.locate(db, r['quote']); job, ts = loc[0], loc[2]
        assert (job, ts) == (m2['job'], m2['fork_ts']), f"{k}: fork relocated since round 2"
        later_id = sup.get(f['id']); later = full.get(later_id, {}).get('rule')
        tail, t1, tom1 = same_room_wide(db, job, ts)
        query = f['q'] + '\n' + tail[-3000:]
        rul, nlive, t2 = R2.rulings_in_force(full, sup, ts, query, exclude={f['id'], later_id}, top=WIDE['rulings_top'])
        oth, t3, tom2 = other_rooms_wide(db, job, ts, query)
        snap = (f"== STANDING RULINGS IN FORCE AT THE TIME (most relevant {min(WIDE['rulings_top'], nlive)} of {nlive}) ==\n{rul or '(none)'}\n\n"
                f"== TRAFFIC IN OTHER ROOMS (last 14 days, most relevant) ==\n{oth or '(none)'}\n\n"
                f"== THIS ROOM, UP TO THE DECISION ==\n{tail}")
        try:
            assert max(t1, t2, t3) < ts, f"{k}: item at/after fork"
            assert frag not in snap, f"{k}: deciding quote leaked"
            assert r['rule'][:80] not in snap, f"{k}: taken ruling leaked"
            if later: assert later[:80] not in snap, f"{k}: later ruling leaked"
        except AssertionError as e:
            open(P(a, 'snapshot-skips.log'), 'a').write(f"{e}\n"); print('SKIP', e, flush=True); continue
        sims = [overlap(r['rule'], t) for t in tom1 + tom2]
        meta = {'key': k, 'id': f['id'], 'job': job, 'fork_ts': ts, 'chars': len(snap), 'chars_r2': m2['chars'],
                'prior_tom_sim': round(max(sims, default=0), 2), 'tom_msgs': len(sims),
                'parts': {'rulings_live': nlive, 'rulings_chars': len(rul), 'other_chars': len(oth), 'room_chars': len(tail)}}
        open(sp, 'w').write(snap)
        json.dump(meta, open(P(a, 'snapshots', k + '.meta.json'), 'w'), ensure_ascii=False, indent=1)
        print(k, meta['chars'], 'vs', m2['chars'], meta['prior_tom_sim'], flush=True)

def part_a_keys(a):
    sets = json.load(open(Q3(a, 'sets.json')))
    rows = json.load(open(Q2(a, 'scores2.annot.json')))['rows']
    return sorted(r['key'] for r in rows if r['cls'] == 'reconstructed' and r['key'] not in set(sets['R']))

def cells(a):
    sets = json.load(open(Q3(a, 'sets.json')))
    out = [(k, 'A', Q2(a, 'snapshots', k + '.txt')) for k in part_a_keys(a)]
    out += [(k, 'B', P(a, 'snapshots', k + '.txt')) for k in sets['M'] + sets['R'] if os.path.exists(P(a, 'snapshots', k + '.txt'))]
    return out

def step_select(a):
    os.makedirs(P(a, 'calls'), exist_ok=True)
    fk = R3.forks_by_key(argparse.Namespace(r2=a.r2)); jobs = []
    for k, part, sp in cells(a):
        snap = open(sp).read(); menu = json.load(open(Q2(a, 'calls', f"{k}.A.merge.call.json")))['out']['options']
        for i in range(N):
            pr = R2.sel_prompt(snap, fk[k]['q'], menu, 'base', f"{k}:A:{i}")
            jobs.append((P(a, 'calls', f"{k}.{part}.{MODEL}.sel{i:02d}.call.json"),
                         (lambda pr=pr: R2.claude_call(pr, R2.SEL_SCHEMA, model=MODEL))))
    random.Random(4).shuffle(jobs)
    R3.run_jobs(jobs, a.workers)

def runs_of(path_fmt, labels):
    runs, cost, fails, served = [], 0.0, 0, {}
    for i in range(N):
        p = path_fmt.format(i=i)
        if not os.path.exists(p): continue
        c = json.load(open(p)); cost += c.get('cost') or 0
        for mm in c.get('models') or []: served[mm] = served.get(mm, 0) + 1
        if not c['ok']: fails += 1; continue
        op = {labels.index(R2.norm(x)) for x in c['out']['open'] if R2.norm(x) in labels}
        lk = R2.norm(c['out']['likely']); runs.append((op, labels.index(lk) if lk in labels else None))
    return runs, cost, fails, served

def cell(runs, t, ta, sq):
    if not runs: return None
    n = len(runs)
    f = lambda idx: round(sum(idx in r[0] for r in runs) / n, 2) if idx is not None and idx >= 0 else None
    return {'n': n, 'p': f(t), 'p_astra_key': f(ta),
            'likely': round(sum(r[1] == t for r in runs) / n, 2) if t is not None and t >= 0 else None,
            'sq_likely': round(sum(r[1] in sq for r in runs) / n, 2), 'size': round(sum(len(r[0]) for r in runs) / n, 2)}

def step_score(a):
    sets = json.load(open(Q3(a, 'sets.json')))
    r2rows = {r['key']: r for r in json.load(open(Q2(a, 'scores2.annot.json')))['rows']}
    r3rows = {r['key']: r for r in json.load(open(Q3(a, 'scores3.json')))['rows']}
    setof = {k: s for s in sets for k in sets[s]}
    fk = R3.forks_by_key(argparse.Namespace(r2=a.r2))
    rows, cost, fails, served = [], 0.0, 0, {}
    for k, part, _ in cells(a):
        r2 = r2rows[k]['b']['A']; t, ta = r2['taken_opus'], r2['taken_astra']
        menu = json.load(open(Q2(a, 'calls', f"{k}.A.merge.call.json")))['out']['options']
        labels = [R2.norm(o['label']) for o in menu]
        sq = {i for i, o in enumerate(menu) if o['kind'] in ('status_quo', 'defer')}
        runs, c, fl, sv = runs_of(P(a, 'calls', f"{k}.{part}.{MODEL}.sel{{i:02d}}.call.json"), labels)
        cost += c; fails += fl
        for m, v in sv.items(): served[m] = served.get(m, 0) + v
        row = {'key': k, 'part': part, 'set': setof.get(k, 'A'), 'id': fk[k]['id'],
               'taken': t, 'tom_sq': t in sq if t is not None else None, 'haiku_r2': r2['arms']['base']['taken_open'],
               'wide' if part == 'B' else 'std': cell(runs, t, ta, sq)}
        if part == 'B':
            row['std'] = r3rows[k]['cells'].get('opus/opus')
            row['hard'] = all(((r3rows[k]['cells'].get(f'{w}/{m}') or {}).get('p') or 0) <= 0.2
                              for w in ('opus', 'sonnet', 'astra') for m in ('haiku', 'sonnet', 'opus')) if setof[k] == 'M' else False
            row['meta'] = json.load(open(P(a, 'snapshots', k + '.meta.json')))
        rows.append(row)
    json.dump({'rows': rows, 'served': served, 'cost_usd_list': round(cost, 2), 'fails': fails},
              open(P(a, 'scores4.json'), 'w'), indent=1, ensure_ascii=False)
    print('rows', len(rows), 'served', served, 'cost', round(cost, 2), 'fails', fails)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('step'); ap.add_argument('--data', required=True)
    ap.add_argument('--r2', default=os.path.expanduser('~/ce-experiments/fork-recon-r2-scale'))
    ap.add_argument('--r3', default=os.path.expanduser('~/ce-experiments/fork-recon-r3-control'))
    ap.add_argument('--workers', type=int, default=6)
    a = ap.parse_args(); os.makedirs(a.data, exist_ok=True)
    globals()['step_' + a.step](a)

if __name__ == '__main__':
    main()
