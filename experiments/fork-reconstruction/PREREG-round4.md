# Fork reconstruction, round 4 (the record ceiling) — pre-registration

Written and committed 2026-10-12 BEFORE any round-4 model call exists.

## The question
Round 3 left 23 of the 90 missed forks that Opus also misses (Tom's move judged open by ≤ 20% of 10 runs), 8 of them
missed by every model under every wording (the hard core). Round 3 called these "moves the record did not prepare".
But every round so far read a NARROW snapshot of the record: ~7k characters of the same room (each message cut at
1,400), ~5k from other rooms over 72 hours, the 25 most relevant rulings in force — about 17k characters. The record
itself is far larger. So the claim is not yet earned: a miss may be the snapshot's limit, not the record's.

Round 4 asks: **give the strongest reader a much wider slice of the record. Do the misses survive?**
- If they survive, "Tom moved from outside the record" is a finding about the selector — option-space information the
  record did not carry.
- If they flip, the record held it and the narrow snapshot hid it; the instrument's snapshot is the next thing to fix.

It also completes the Opus baseline: round 3 extrapolated Opus to ~219/279 reconstructed from a 30-fork sample. Part A
measures it.

## What is held fixed
Round 2's scale run (`fork-recon-r2-scale/`), read-only: fork list and question (W_opus, the Opus-written wording),
canonical menu (build A), frozen keys (`keys.frozen.jsonl`; primary key = Opus mapping of the taken ruling, Astra key
as sensitivity), selection prompt `sel_prompt` arm `base`, menu shuffle seeds `"{key}:A:{i}"` for i = 0..9 (identical
to round 3), model-free scoring by exact label match. Reader: Opus (family name, latest), 10 runs per cell.

## Part A — Opus baseline completion
The 77 reconstructed forks NOT in round 3's calibration sample, on the round-2 snapshot, Opus × 10. Together with
round 3's Opus cells (200 forks) this gives Opus on all 277 scored forks (2 have Tom's move absent from the menu).
Reported: bands (reconstructed p ≥ 0.8 / split / missed p ≤ 0.2), against Haiku's round-2 bands and against round 3's
extrapolation (~219 reconstructed).

## Part B — the record ceiling
**Wide snapshot**, built by the same code path with larger budgets and the same leak guard:
- this room: the last 200 replies and 100 turns before the fork, each kept to 4,000 characters, 40,000 total;
- other rooms: the previous **14 days** (not 72 hours), BM25-ranked on the fork question + this room's tail exactly as
  round 2 (the ruling text is never a retrieval query), each item kept to 2,000 characters, 30,000 total;
- standing rulings in force: the 60 most relevant (not 25).
Leak guard as round 2: nothing at or after the deciding message; the deciding quote, the taken ruling text and any
later ruling text must be absent. A fork that trips the guard is dropped and listed.

Sets: **M** (round 3's 90 missed) and **R** (round 3's 30 reconstructed calibration sample), Opus × 10 on the wide
snapshot = 1,200 calls.

## Pre-registered reading
p = share of 10 runs whose open set contains Tom's taken option (Opus key). p_std = round 3's Opus cell (W_opus, round-2
snapshot); p_wide = this round.

**Dilution check (read first).** On R and on the M forks with p_std ≥ 0.5: if mean(p_wide − p_std) < −0.15, the wide
snapshot dilutes the signal, and every flip below is reported with that caveat.

**Per fork, for the 23 Opus misses (p_std ≤ 0.2):**
- **record held it** — p_wide ≥ 0.5;
- **outside the record (survives)** — p_wide ≤ 0.2;
- **unresolved** — otherwise.

**Aggregate verdict on the 23:** "mostly the snapshot" if record-held ≥ 12; "mostly outside the record" if
outside ≥ 12; otherwise "mixed", reported as the three counts. The 8 hard-core forks are reported as their own line.

**Prior voicing (deterministic flag, no model).** For each wide snapshot, `prior_tom_sim` = the largest share of the
taken ruling's content words found in any single message of Tom's included in the snapshot. A flipped fork with
prior_tom_sim ≥ 0.5 is reported as "Tom had already said it earlier in the record — the fork is mislocated", not as
"the record prepared it". This flag is computed for analysis only and is never shown to a model.

**Status quo.** Per part, share of runs whose single "likely" pick is a status_quo/defer option, against round 3's
Opus rate on the same forks and Tom's own rate.

## What this round cannot tell
A survivor is a move the record *as retrieved here* did not prepare. Retrieval is BM25 on the question and the room's
tail, so a survivor could still sit somewhere in the record that neither query reaches; that residue is named, not
claimed away. Keys remain round 2's (about half "approx" fits).
