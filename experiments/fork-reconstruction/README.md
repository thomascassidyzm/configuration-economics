# Fork reconstruction — precondition test

Can independent cheap-model runs agree on the options open at a REAL recorded fork (a ruling in the estate record),
using only what was known before it? `recon.py snapshots|vocab|select|score --data <private dir>`.

All data — fork list, snapshots, model outputs, answer key — lives outside this public repo (the record is private).
First run: 2026-10-07, 20 forks × (3 vocab + 30 selection) Haiku 5.5 calls, $0.84. Verdict: selection agreement is
good (κ≈0.68) but the free-proposed vocabulary is unstable (exact overlap ≈0.03), so scoring needs a stabilised menu first.
