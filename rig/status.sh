#!/usr/bin/env bash
# Where is the matrix? Reads only what is on disk - safe to run any time, by anyone.
cd "$(dirname "$0")/.."
echo "=== processes ==="
ps -o pid,ppid,etime,rss,args -C python3 2>/dev/null | grep -E 'rig/run.py|PID' || echo "NO run.py PROCESSES ALIVE"
echo "=== claude calls in flight: $(pgrep -fc -- '-p --model sonnet' 2>/dev/null || echo 0) ==="
echo "=== progress ==="
python3 - <<'PY'
import json,glob,os,time
tot=0.0; done=0
for f in sorted(glob.glob('rig/logs/*.jsonl')):
    mx=0; c=0.0; target=200
    for line in open(f, errors='replace'):
        try: d=json.loads(line)
        except Exception: continue
        if d.get('type')=='meta': target=d.get('ticks',200); st=d.get('started')
        elif d.get('type')=='metrics': mx=d['tick']
        elif d.get('type')=='act': c+=d.get('cost',0)
        elif d.get('type')=='summary': done+=1
    tot+=c
    age=time.time()-os.path.getmtime(f)
    print(f"{os.path.basename(f):18s} tick {mx:3d}/{target}  ${c:6.2f}  last write {age:5.0f}s ago")
print(f"TOTAL SPEND ${tot:.2f} | runs finished: {done}/9")
PY
