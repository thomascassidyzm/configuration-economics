# Fork reconstruction — precondition test

Can independent cheap-model runs agree on the options open at a REAL recorded fork (a ruling in the estate record),
using only what was known before it? `recon.py snapshots|vocab|select|score --data <private dir>`.

All data — fork list, snapshots, model outputs, answer key — lives outside this public repo (the record is private).
First run: 2026-10-07, 20 forks × (3 vocab + 30 selection) Haiku 5.5 calls, $0.84. Verdict: selection agreement is
good (κ≈0.68) but the free-proposed vocabulary is unstable (exact overlap ≈0.03), so scoring needs a stabilised menu first.

## Round 2 (2026-10-07/08) — `recon2.py`, thresholds in `PREREG-round2.md`
Canonical menu = 24 Haiku proposal draws merged by one blind Opus pass; richer snapshots (rulings in force + other-room
context, leak-guarded); two independent mappers (Opus, GPT-6 Astra), keys frozen before selection. Pilot (20 forks, two
independent builds) passed all four pre-registered stability tests (core-option coverage 0.90, Tom's move on both menus
20/20, cross-build score agreement 85%, mapper agreement 95%), so it was scaled to all 279 locatable forks: 38% reconstructed,
29% split, 32% confidently missed. Haiku over-picks keep/defer ~2.5× Tom's rate; neutral framing and high effort did not fix it.

## Round 3: the control (2026-10-08)
`recon3.py` + `analyse3.py`, pre-registered in `PREREG-round3.md`. Same frozen round-2 snapshots, menus and keys; 10 runs per cell;
Haiku re-run / Sonnet / Opus on the 90 missed, 80 split and 30 reconstructed forks, plus two further question wordings (Sonnet,
GPT-6 Astra) on the 90 missed. 11,400 calls. Verdict: mostly Haiku's limit — Opus recovers 63/90 misses (50 under every wording),
Haiku's own re-run recovers 2 (not regression to the mean). Hard core: 8 forks missed by every model under every wording; half are
reversals of a ruling in force at the fork. Status-quo picks: Haiku 33%, Sonnet 25%, Opus 12%, Tom 7%. Data (private):
`~/ce-experiments/fork-recon-r3-control/`.
