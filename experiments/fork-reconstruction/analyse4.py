#!/usr/bin/env python3
"""Round 4 analysis: applies PREREG-round4.md to scores4.json (+ round 3's scores3.json). Model-free.
  python3 analyse4.py --data ~/ce-experiments/fork-recon-r4-ceiling  -> analysis4.json + a printed summary"""
import argparse, json, os
ap = argparse.ArgumentParser(); ap.add_argument('--data', required=True)
ap.add_argument('--r3', default=os.path.expanduser('~/ce-experiments/fork-recon-r3-control'))
a = ap.parse_args()
s4 = json.load(open(os.path.join(a.data, 'scores4.json'))); s3 = json.load(open(os.path.join(a.r3, 'scores3.json')))
rows = s4['rows']; A = [r for r in rows if r['part'] == 'A']; B = {r['key']: r for r in rows if r['part'] == 'B'}
def mean(v):
    v = [x for x in v if x is not None]
    return round(sum(v) / len(v), 3) if v else None
def band(p): return None if p is None else ('reconstructed' if p >= 0.8 else 'missed' if p <= 0.2 else 'split')
out = {}

# Part A + whole-set Opus bands (round 3 Opus on M/S/R, round 4 Opus on the other 77)
opus = {r['key']: (r['cells'].get('opus/opus') or {}).get('p') for r in s3['rows']}
for r in A: opus[r['key']] = (r['std'] or {}).get('p')
bands = {}
for k, p in opus.items():
    if p is not None: bands[band(p)] = bands.get(band(p), 0) + 1
out['partA'] = {'n': len(A), 'mean_p': mean([r['std']['p'] for r in A if r['std'] and r['std']['p'] is not None]),
                'bands_77': {b: sum(band((r['std'] or {}).get('p')) == b for r in A) for b in ('reconstructed', 'split', 'missed')},
                'opus_bands_all': bands, 'opus_n_all': sum(bands.values()),
                'sq_likely': mean([r['std']['sq_likely'] for r in A if r['std']]), 'tom_sq': mean([1.0 if r['tom_sq'] else 0.0 for r in A])}

# Part B
def pw(r): return (r.get('wide') or {}).get('p')
def ps(r): return (r.get('std') or {}).get('p')
R = [r for r in B.values() if r['set'] == 'R']; M = [r for r in B.values() if r['set'] == 'M']
dil = [pw(r) - ps(r) for r in R + [m for m in M if (ps(m) or 0) >= 0.5] if pw(r) is not None and ps(r) is not None]
out['dilution'] = {'n': len(dil), 'mean_delta': mean(dil), 'dilutes': (mean(dil) or 0) < -0.15,
                   'R_std': mean([ps(r) for r in R]), 'R_wide': mean([pw(r) for r in R]),
                   'R_below_half_wide': sum(pw(r) < 0.5 for r in R if pw(r) is not None)}
miss = [r for r in M if ps(r) is not None and ps(r) <= 0.2]
def verdict(r):
    p = pw(r)
    if p is None: return 'no data'
    return 'record held it' if p >= 0.5 else 'outside the record (survives)' if p <= 0.2 else 'unresolved'
cls = {}
per = []
for r in sorted(miss, key=lambda r: r['key']):
    v = verdict(r); cls[v] = cls.get(v, 0) + 1
    prior = r['meta']['prior_tom_sim']
    per.append({'key': r['key'], 'id': r['id'], 'hard': r['hard'], 'p_std': ps(r), 'p_wide': pw(r),
                'p_wide_astra_key': (r.get('wide') or {}).get('p_astra_key'), 'likely_wide': (r.get('wide') or {}).get('likely'),
                'verdict': v, 'prior_tom_sim': prior, 'mislocated': v == 'record held it' and prior >= 0.5,
                'chars': r['meta']['chars'], 'chars_r2': r['meta']['chars_r2']})
held, outside = cls.get('record held it', 0), cls.get('outside the record (survives)', 0)
out['opus_misses'] = {'n': len(miss), 'counts': cls,
                      'aggregate': 'mostly the snapshot' if held >= 12 else 'mostly outside the record' if outside >= 12 else 'mixed',
                      'hard_core': {v: sum(1 for x in per if x['hard'] and x['verdict'] == v) for v in set(x['verdict'] for x in per)},
                      'mislocated': [x['key'] for x in per if x['mislocated']], 'per_fork': per}
out['M_all'] = {'n': len(M), 'mean_std': mean([ps(r) for r in M]), 'mean_wide': mean([pw(r) for r in M]),
                'ge_half_std': sum((ps(r) or 0) >= 0.5 for r in M), 'ge_half_wide': sum((pw(r) or 0) >= 0.5 for r in M),
                'sq_std': mean([(r['std'] or {}).get('sq_likely', 0) for r in M]), 'sq_wide': mean([(r['wide'] or {}).get('sq_likely', 0) for r in M]),
                'size_std': mean([(r['std'] or {}).get('size', 0) for r in M]), 'size_wide': mean([(r['wide'] or {}).get('size', 0) for r in M])}
out['cost_usd_list'] = s4['cost_usd_list']; out['served'] = s4['served']; out['fails'] = s4['fails']
json.dump(out, open(os.path.join(a.data, 'analysis4.json'), 'w'), indent=1, ensure_ascii=False)
print(json.dumps({k: v for k, v in out.items() if k != 'opus_misses'}, indent=1))
print(json.dumps({k: v for k, v in out['opus_misses'].items() if k != 'per_fork'}, indent=1))
for x in per: print(x['key'], 'HARD' if x['hard'] else '    ', x['p_std'], '->', x['p_wide'], f"(astra key {x['p_wide_astra_key']})", x['verdict'], 'prior', x['prior_tom_sim'], x['id'][:60])
