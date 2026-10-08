# Fork reconstruction, round 3 (the control) — pre-registration

Written and committed 2026-10-08 BEFORE any round-3 model call exists.

## The question
Round 2 (279 real forks, Haiku, 20 runs each) left 90 forks MISSED (Tom's actual move judged open by
≤20% of runs) and 80 SPLIT. Are the misses Haiku's limit, or moves the record never prepared
(the selector going outside the frame)?

## What is held fixed
Everything from round 2's scale run (`~/ce-experiments/fork-recon-r2-scale/`), read-only: the snapshot
per fork, the canonical menu (build A), the frozen Opus/Astra keys (keys.frozen.jsonl), the selection
prompt (`sel_prompt`, arm `base`), and model-free scoring (exact label match). The primary key is the
Opus mapping of the taken ruling, as in round 2; the Astra key is reported as sensitivity.

## Runs (10 per cell; menu shuffles use seeds 0..9, identical across models)
- **Set M** = the 90 missed forks. **Set S** = the 80 split forks. **Set R** = a calibration sample of
  30 reconstructed forks (deterministic: `random.Random(3).sample` over the 107, sorted).
- **Part 1 (models).** On the round-2 question wording (Opus-written, W_opus): Haiku re-run (same
  pinned model as round 2 — the regression-to-the-mean control, since M and S were selected on Haiku's
  own low scores), Sonnet, Opus. Sets M, S, R.
- **Part 2 (wording).** For set M, two further neutral wordings from the round-2 question prompt
  unchanged, each by a different writer: W_sonnet (Sonnet) and W_astra (GPT-6 Astra, a different
  family). Only the question line changes; snapshot and menu stay frozen. Each wording × {Haiku,
  Sonnet, Opus} × 10 runs.

## Pre-registered reading (p = share of 10 runs that put Tom's taken option in the open set)
Per missed fork, on W_opus:
- **noise** — Haiku re-run p ≥ 0.5 (the round-2 miss does not reproduce).
- **model limit** — not noise, and max(p_Sonnet, p_Opus) ≥ 0.5.
- **outside the frame (candidate)** — p_Haiku-rerun ≤ 0.2, p_Sonnet ≤ 0.2 and p_Opus ≤ 0.2.
- **unresolved** — anything else.

Aggregate verdict on the 90: **"mostly Haiku's limit"** if model-limit ≥ 45 (50%); **"mostly outside the
frame"** if outside-the-frame ≥ 45; otherwise **"mixed"**, reported as the four counts.

**The finding (hard core)** = missed forks with p ≤ 0.2 in ALL 9 cells (3 wordings × 3 models). Wording
robustness is reported as: of the forks that are outside-the-frame candidates on W_opus, how many stay
≤ 0.2 under W_sonnet and W_astra for every model.

Split forks: a stronger model "resolves" the split set upward if its mean p exceeds Haiku re-run's by
≥ 0.15; per fork, band moves into reconstructed (≥0.8) / missed (≤0.2) reported.

Calibration (set R): if Sonnet or Opus drop below 0.5 on more than a third of R, the stronger models are
reading the menus differently rather than better, and any "recovery" on M is reported with that caveat.

Status quo: per model, share of runs whose single "likely" pick is a status_quo/defer option, on M∪S∪R,
against Haiku re-run on the same forks and Tom's own rate on the same forks.

## Part 3 (characterising the hard core) — deterministic, no new model judgement
For hard-core forks vs the rest of the 279, from labels that already exist: menu kind of the taken
option (status_quo / defer / change); Opus key fit (exact / approx); Opus–Astra key agreement;
**reversal** = the ruling `supersedes` an earlier ruling (the record then held the opposite rule in
force); **later retired** = the ruling was later superseded (`superseded_by`); snapshot composition
(same-room characters, live rulings). "New mechanism" and "reframe" have no existing label in the
record or the mapping; they are not scored.
