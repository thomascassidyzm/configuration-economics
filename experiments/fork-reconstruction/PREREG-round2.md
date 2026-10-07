# Fork reconstruction, round 2 — pre-registration

Written and committed 2026-10-07 BEFORE any round-2 menu build, mapping or selection run exists.

## Design (pilot = round 1's 20 forks, so the two rounds compare)
- **Richer snapshot** = (a) rulings in force at the fork (known before the deciding message, not yet
  superseded), top 25 by BM25 against the fork question; (b) the same-room tail before the deciding
  message (as round 1); (c) other-room traffic in the 72 h before the fork, top-ranked by BM25. Leak
  guard: nothing timestamped at or after the deciding message, the deciding quote absent, the taken and
  later ruling texts absent.
- **Canonical menu** = 24 independent Haiku proposal draws, pooled, then one Opus pass that authors
  8–14 canonical options (label, gloss, kind ∈ status_quo | defer | change) WITHOUT seeing the ruling.
  The whole build (24 draws + merge) is run twice independently: build A and build B.
- **Keys** = two independent mappers, Opus and GPT-6 Astra, each mapping the taken ruling (and the later
  replacement of a struck ruling) onto each build's menu. Keys frozen (sha256 + timestamp) before any
  selection run.
- **Selection** = 20 Haiku runs per fork × build × arm. Each run returns the open set (2–6 labels) and
  the single option it thinks Tom most likely takes. Arms: `base` (round-1 framing), `frame`
  (status-quo-neutral framing), `effort` (base framing, `--effort high`).
- Scoring is model-free (exact label match against the frozen menu).

## Stability thresholds (all four must hold to scale)
- **S1 menu equivalence.** Of the "core" options in one build (selected as open by ≥50% of base runs),
  ≥80% have an equivalent option in the other build, averaged over both directions and all forks.
  Equivalence is judged by a Sonnet alignment pass (measurement only, not scoring); raw one-to-one F1
  is reported beside it.
- **S2 key presence.** The taken option is on-menu (per the Opus key) in both builds at ≥85% of forks,
  and on-menu status agrees across builds at ≥90% of forks.
- **S3 score reproducibility.** |taken-rate(A) − taken-rate(B)| ≤ 0.20 (base arm, open-set inclusion)
  at ≥80% of forks where the taken option is on both menus.
- **S4 mapper agreement.** Opus and Astra pick the same option (or both say absent) for the taken
  ruling in ≥80% of fork × build cells.

If S1–S4 hold, scale to every usable fork in the record with one build and the better arm.
If not, report which failed and by how much.

## Status-quo bias (measured, no threshold)
SQ rate = fraction of runs whose "most likely" pick is a status_quo/defer option, set against the
fraction of forks where Tom's taken option was one. Countermeasure judged by the change in taken-hit
(open-set and most-likely) and later-winner hit vs `base`.
