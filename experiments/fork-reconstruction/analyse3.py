#!/usr/bin/env python3
"""Round 3 analysis: applies PREREG-round3.md to scores3.json. Model-free; prints markdown tables and
writes analysis3.json beside the scores."""
import json, os, sys, statistics as st
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import recon2 as R2

D = sys.argv[1]; R2D = os.path.expanduser('~/ce-experiments/fork-recon-r2-scale')
S = json.load(open(os.path.join(D, 'scores3.json'))); rows = S['rows']
full, sup = R2.load_rulings()
annot = {r['key']: r for r in json.load(open(os.path.join(R2D, 'scores2.annot.json')))['rows']}
MODELS = ('haiku', 'sonnet', 'opus'); WS = ('opus', 'sonnet', 'astra')
def p(r, w, m, k='p'): return (r['cells'].get(f"{w}/{m}") or {}).get(k)
def mean(v): v = [x for x in v if x is not None]; return round(st.mean(v), 2) if v else None
out = {}

# ---- part 1, set M
M = [r for r in rows if r['set'] == 'M']
for r in M:
    h, s, o = p(r, 'opus', 'haiku'), p(r, 'opus', 'sonnet'), p(r, 'opus', 'opus')
    if h is None or s is None or o is None: r['verdict'] = 'incomplete'
    elif h >= .5: r['verdict'] = 'noise'
    elif max(s, o) >= .5: r['verdict'] = 'model limit'
    elif h <= .2 and s <= .2 and o <= .2: r['verdict'] = 'outside the frame'
    else: r['verdict'] = 'unresolved'
    allc = [p(r, w, m) for w in WS for m in MODELS]
    r['hard_core'] = len([x for x in allc if x is not None]) == 9 and all(x <= .2 for x in allc)
    r['all9'] = allc
cnt = {}
for r in M: cnt[r['verdict']] = cnt.get(r['verdict'], 0) + 1
out['M_verdicts'] = cnt
v = 'mostly Haiku\'s limit' if cnt.get('model limit', 0) >= 45 else 'mostly outside the frame' if cnt.get('outside the frame', 0) >= 45 else 'mixed'
out['M_aggregate'] = v
cand = [r for r in M if r['verdict'] == 'outside the frame']
hc = [r for r in M if r['hard_core']]
out['hard_core'] = len(hc); out['candidates_W_opus'] = len(cand)
out['cand_survive_all_wordings'] = sum(r['hard_core'] for r in cand)
print(f"## Set M (90 missed)\nverdicts {cnt} -> {v}\noutside-frame candidates on W_opus {len(cand)}; hard core (<=0.2 in all 9 cells) {len(hc)}")

def table(sub, name):
    print(f"\n### {name} (n={len(sub)}) mean p / likely-hit / sq_likely / open-set size")
    print("| wording | model | mean p | p>=0.8 | p<=0.2 | p>=0.5 | likely=Tom | SQ likely | open size |\n|---|---|---|---|---|---|---|---|---|")
    res = {}
    for w in WS:
        for m in MODELS:
            ps = [p(r, w, m) for r in sub]; ps = [x for x in ps if x is not None]
            if not ps: continue
            d = {'n': len(ps), 'mean_p': mean(ps), 'ge80': sum(x >= .8 for x in ps), 'le20': sum(x <= .2 for x in ps), 'ge50': sum(x >= .5 for x in ps),
                 'likely': mean([p(r, w, m, 'likely') for r in sub]), 'sq': mean([p(r, w, m, 'sq_likely') for r in sub]),
                 'size': mean([p(r, w, m, 'size') for r in sub])}
            res[f"{w}/{m}"] = d
            print(f"| {w} | {m} | {d['mean_p']} | {d['ge80']} | {d['le20']} | {d['ge50']} | {d['likely']} | {d['sq']} | {d['size']} |")
    return res
for s, name in (('M', 'Missed'), ('S', 'Split'), ('R', 'Reconstructed sample')):
    sub = [r for r in rows if r['set'] == s]
    out[f'table_{s}'] = table(sub, name)
    out[f'haiku_r2_mean_{s}'] = mean([r['haiku_r2'] for r in sub])
    print(f"round-2 Haiku mean p on this set: {out[f'haiku_r2_mean_{s}']}")

# astra-key sensitivity on M verdict
alt = 0
for r in M:
    s, o = p(r, 'opus', 'sonnet', 'p_astra_key'), p(r, 'opus', 'opus', 'p_astra_key')
    if s is not None and o is not None and max(s, o) >= .5: alt += 1
out['M_recovered_astra_key'] = alt

# split resolution
Ss = [r for r in rows if r['set'] == 'S']
for m in ('sonnet', 'opus'):
    out[f'S_{m}_minus_haiku'] = round((mean([p(r, 'opus', m) for r in Ss]) or 0) - (mean([p(r, 'opus', 'haiku') for r in Ss]) or 0), 2)
# calibration
Rr = [r for r in rows if r['set'] == 'R']
for m in MODELS: out[f'R_{m}_below50'] = sum((p(r, 'opus', m) or 0) < .5 for r in Rr)

# status quo per model on M∪S∪R (W_opus), vs Tom
allr = rows
kinds_taken = []
for r in allr:
    menu = json.load(open(os.path.join(R2D, 'calls', f"{r['key']}.A.merge.call.json")))['out']['options']
    r['taken_kind'] = menu[r['taken']]['kind'] if r['taken'] is not None and r['taken'] >= 0 else None
    r['taken_fit'] = annot[r['key']]['b']['A']['taken_fit_opus']
out['sq'] = {m: mean([p(r, 'opus', m, 'sq_likely') for r in allr]) for m in MODELS}
out['sq']['haiku_r2'] = mean([r['haiku_r2_sq'] for r in allr])
out['sq']['tom'] = round(sum(r['taken_kind'] in ('status_quo', 'defer') for r in allr) / len(allr), 2)
out['sq_by_set'] = {s: {**{m: mean([p(r, 'opus', m, 'sq_likely') for r in allr if r['set'] == s]) for m in MODELS},
                        'tom': round(sum(r['taken_kind'] in ('status_quo', 'defer') for r in allr if r['set'] == s) / max(1, sum(r['set'] == s for r in allr)), 2)}
                    for s in 'MSR'}
print('\nSQ', out['sq'], out['sq_by_set'])

# ---- part 3: deterministic characterisation of the hard core vs the rest of the 279
def char(r):
    rid = r['id']; rr = full[rid]; meta = json.load(open(os.path.join(R2D, 'snapshots', r['key'] + '.meta.json')))
    a2 = annot[r['key']]['b']['A']
    menu = json.load(open(os.path.join(R2D, 'calls', f"{r['key']}.A.merge.call.json")))['out']['options']
    t = a2['taken_opus']
    return {'kind': menu[t]['kind'] if t is not None and t >= 0 else 'absent', 'fit': a2['taken_fit_opus'],
            'mappers_agree': a2['taken_opus'] == a2['taken_astra'], 'reversal': bool(rr.get('supersedes')),
            'later_struck': rid in sup, 'room_chars': meta['parts']['room_chars'], 'rulings_live': meta['parts']['rulings_live']}
hck = {r['key'] for r in hc}
groups = {'hard core': [], 'other missed': [], 'split': [], 'reconstructed': []}
for k, a in annot.items():
    if a['cls'] == 'absent': continue
    g = 'hard core' if k in hck else ('other missed' if a['cls'] == 'missed' else a['cls'])
    groups[g].append(char({'key': k, 'id': next(f['id'] for f in json.load(open(os.path.join(R2D, 'forks-all.json'))) if f['key'] == k)}))
print("\n### Part 3: characterisation (shares)\n| group | n | taken=change | taken=keep/defer | fit approx | mappers disagree | reversal | later struck | median room chars | median live rulings |\n|---|---|---|---|---|---|---|---|---|---|")
out['part3'] = {}
for g, cs in groups.items():
    n = len(cs)
    if not n: continue
    d = {'n': n, 'change': round(sum(c['kind'] == 'change' for c in cs) / n, 2), 'sqdefer': round(sum(c['kind'] in ('status_quo', 'defer') for c in cs) / n, 2),
         'approx': round(sum(c['fit'] == 'approx' for c in cs) / n, 2), 'disagree': round(sum(not c['mappers_agree'] for c in cs) / n, 2),
         'reversal': round(sum(c['reversal'] for c in cs) / n, 2), 'struck': round(sum(c['later_struck'] for c in cs) / n, 2),
         'room': int(st.median(c['room_chars'] for c in cs)), 'rul': int(st.median(c['rulings_live'] for c in cs))}
    out['part3'][g] = d
    print(f"| {g} | {n} | {d['change']} | {d['sqdefer']} | {d['approx']} | {d['disagree']} | {d['reversal']} | {d['struck']} | {d['room']} | {d['rul']} |")

out['served'] = S['served']; out['cost_usd_list'] = S['cost_usd_list']; out['fails'] = S['fails']
out['per_fork'] = [{'key': r['key'], 'set': r['set'], 'id': r['id'], 'haiku_r2': r['haiku_r2'],
                    **{f"{w}/{m}": p(r, w, m) for w in WS for m in MODELS if p(r, w, m) is not None},
                    'verdict': r.get('verdict'), 'hard_core': r.get('hard_core')} for r in rows]
json.dump(out, open(os.path.join(D, 'analysis3.json'), 'w'), indent=1, ensure_ascii=False)
print('\nserved', S['served'], 'cost', S['cost_usd_list'], 'fails', S['fails'])
