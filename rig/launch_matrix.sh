#!/usr/bin/env bash
# CE RIG v0 - launch the full 3x3 matrix DETACHED, so it outlives the session that
# started it. The previous attempt was launched as a session-owned background task and
# died with the turn; that is the failure this script exists to make impossible.
#
#   setsid  - new session+process group, no controlling terminal, reparented to init
#   nohup   - immune to SIGHUP
#   >log    - all output on disk, so progress is checkable without the launcher
#
# Each of the 9 runs is its OWN process: one crashing cannot take the others with it.
set -u
cd "$(dirname "$0")/.."
TICKS=${TICKS:-200}
MODEL=${MODEL:-sonnet}
EFFORT=${EFFORT:-low}
WORKERS=${WORKERS:-5}       # 5 x 9 runs = max 45 concurrent claude calls on a 4-core box
OUT=rig/logs
RL=rig/runlogs
mkdir -p "$OUT" "$RL"
for cond in A B C; do
  for seed in 1 2 3; do
    tag="${cond}_seed${seed}"
    setsid nohup python3 -u rig/run.py --cond "$cond" --seed "$seed" --ticks "$TICKS" \
      --model "$MODEL" --effort "$EFFORT" --workers "$WORKERS" --out "$OUT" \
      > "$RL/${tag}.out" 2>&1 < /dev/null &
    disown
    echo "launched $tag pid=$! -> $RL/${tag}.out"
    sleep 2
  done
done
echo "all 9 launched at $(date -Is); ticks=$TICKS model=$MODEL effort=$EFFORT workers=$WORKERS"
