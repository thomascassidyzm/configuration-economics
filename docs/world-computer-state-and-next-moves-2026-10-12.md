# World Computer — state and next moves (2026-10-12)

A research note for the next CE sitting (#981·O, ramp #967 stream 5). It records facts, open threads and scored
candidates. It is not canon, rules on nothing and drafts nothing in Tom's voice. The decisions belong to the CE room.

## 1. Facts, verified 2026-10-12

**The room.**
- `room.tomcassidy.co/world-computer` answers 200 and is idle: three sessions on record, the last closed 6 Sep.
- The serving setup is unchanged since the 2026-10-01 status doc (/d/6913c98e). `ce-room-world-computer.service` runs
  `astro dev` from `~/wt-ce-room-service`, which sits detached on the unmerged `cs/881` tip.
- `ROOM_DIR` points at three job worktrees. One of them, `778-run-world-computer-session-003-a`, is already missing.
- Session 003 is only on `cs/778-world-computer-session-003-first`, also unmerged. Both branches are on origin.
- The public site (`main`, v0.12.0) still shows sessions 001–002 only.

**The cadence.** "CE twice a week, Astra leads" still has no trigger. No room session has run since 6 Sep. Since the
status doc, CE's only work has been the fork-reconstruction experiment (three rounds, 7–8 Oct), which Tom started on
2026-10-07 as the first real-world attack on `option-space-measurability`, the framework's sole open node.

**The instrument so far.** The question: can models, reading only what the estate record held before a real decision,
reconstruct the options that were open, including the one Tom took? Scoring is model-free throughout (exact label match
against a frozen menu and frozen keys).

| Round | What it established |
|---|---|
| 1 (#34·L, 20 forks, Haiku) | Agreement given a shared menu is good (κ 0.68). The free vocabulary is a lottery (label overlap 0.03). |
| 2 (#36·L, 279 forks, Haiku) | A canonical menu (24 draws merged blind by Opus) reproduces across independent builds (4/4 pre-registered tests passed). Haiku: 38% reconstructed, 29% split, 32% missed. It over-picks the status quo at ~2.5× Tom's rate. |
| 3 (#180·L, control) | The misses were mostly the reader. Opus recovers 63/90, Sonnet 24, Haiku's re-run 2. A hard core of **8 forks** is missed by every model under every wording, and half of them are reversals of a ruling in force. Opus's status-quo rate (12%) is near Tom's (7%). |

**What round 3 left unearned.** It read the hard core as "moves the record did not prepare". But every round read
the same narrow snapshot of the record:
- ~7k characters of the same room, each message cut at 1,400;
- ~5k characters from other rooms over 72 hours;
- the 25 most relevant rulings in force.

That is ~17k characters, against a record of ~48k messages. "Outside the record" and "outside the snapshot" were not
yet told apart. Round 3's Opus figure for the whole set (~219/279 reconstructed) was also an extrapolation from 30
forks, not a measurement.

**Housekeeping found.** The raw data from rounds 1–3 (~128 MB, ~30k paid model outputs) sat in `~/ce-experiments`,
which was not a repo, in the same class of directory the 2026-10-09 reaper emptied. The code sat on three unmerged
branches. Both are now fixed (§4).

## 2. Open threads

1. **Frozen value line** (frozen / unbuilt / enclosed). The status doc's first item for Tom. Three forming nodes have
   waited on it since v0.11. Only Tom can draw it.
2. **Can his selections carry a claim, or only run an instrument?** This decides what the World Computer is for. The
   fork-reconstruction instrument bears on it directly: it is the first large, scored log of his selections against
   what the record made available.
3. **§6 of the selection primitive** ("one primitive at two scales"). Awaits Tom.
4. **What "Astra leads" means** for a one-shot mind. Plumbing: a card for Tom to strike, not a sitting.
5. **The room's fragility.** The record lives on unmerged branches and the page is served from reaper-exposed
   worktrees. This needs no ruling from Tom except the act of publishing 003.
6. **The instrument's own next blocker.** Is the hard core real, i.e. does it survive a wider read? (§3, candidate A.)

## 3. Candidate next moves, scored Better × Simpler × Cheaper

| | Candidate | Better | Simpler | Cheaper | Verdict |
|---|---|---|---|---|---|
| **A** | **Record ceiling.** Opus re-reads the 90 misses and a 30-fork control with a ~5× wider, leak-guarded slice of the record. Grafted: complete the Opus baseline on the 77 unsampled reconstructed forks. | Turns round 3's one CE-relevant claim ("moves outside the record") from asserted to tested, and the 219/279 extrapolation into a measurement. | Reuses every frozen input (menus, keys, prompt, seeds). Only the snapshot budget changes. One script. | ~1,970 Opus calls, ~$350 list on the subscription, under an hour. No Tom time. | **Run now.** All three legs hold. |
| B | Frozen-value ambiguous-case packet: agents gather candidate cases that plausibly sit on two sides of the line, each with its consequence visible. | High: it prepares the status doc's first Tom item. | Moderate. | Cheap in tokens. | **Hold for the room.** The dialogue's black hat holds: agents choosing the cases frame where his line can fall. Whether to build it, and how, is the room's call (Astra's lead), not a worker's. |
| C | Make the room durable: a built server off a merged branch, and `ROOM_DIR` moved out of job worktrees. | Removes the risk that the live room goes blank. | Moderate: the live unit has to be touched. | Cheap. | **Prepare, don't act.** Merging cs/881 + 003 publishes 003, which is Tom's call. Touching a live unit this job didn't start is out of scope. A one-line card goes to the room. |
| D | Ask the hard core directly: put the 8 surviving forks to Tom ("what did you know here that the record didn't?"). | The only way to name what sat outside the record. | Simple. | Costs Tom's attention. | **After A.** Only the forks that survive A deserve his minutes, and A decides how many there are. |
| E | Scale the instrument forward: rebuild menus for rulings since 8 Oct. | More n. | Mechanical. | Moderate. | **Not yet.** More n on an untested snapshot multiplies the open question. |

**Recommendation.** Run A (done in this job, §4). Bring D to the next CE sitting with only the survivors, alongside the
status doc's frozen-value item. Put C to the room as a one-line card. Leave B's shape to Astra's lead.

## 4. What this job ran

- **Data backed up.** `~/ce-experiments` is now the private repo `thomascassidyzm/ce-experiments`, holding rounds 1–4
  raw data. The CE repo is public and the snapshots are private conversation, so raw data never enters this repo.
- **Code consolidated.** Rounds 1–3's code (`cs/180`, which contains `cs/34` and `cs/36`) is merged into this branch,
  plus round 4.
- **Round 4.** Pre-registered in `experiments/fork-reconstruction/PREREG-round4.md`, committed before any call. Harness:
  `experiments/fork-reconstruction/recon4.py`.

### Round 4 results (2026-10-12, 1,970 Opus calls, every pre-registered threshold applied as written)

**Verdict: the hard core is real.** Opus read ~4.8× more of the record: a median of 82k characters against round 2's
17k, leak-guarded, with no fork dropped by the guard. **All 8 hard-core forks survive.** Of the 23 forks Opus missed,
15 survive, 4 flip ("record held it") and 4 stay unresolved. The pre-registered aggregate is "mostly outside the
record". No flip carries the prior-voicing flag (Tom had not said the same thing earlier in the retrieved record).

| Check | Pre-registered bar | Result |
|---|---|---|
| Dilution (R + recovered M forks, n = 93) | mean(p_wide − p_std) ≥ −0.15 | **−0.02**: no dilution. R stays at 0.99. |
| Opus misses (23) | record-held ≥ 12 → snapshot; outside ≥ 12 → outside | **15 outside / 4 held / 4 unresolved** |
| Hard core (8) | reported as its own line | **8/8 outside** (max p_wide 0.2) |
| Whole missed set (90) | — | mean p 0.68 → 0.70; forks ≥ 0.5: 63 → 65 |

The four that flipped (F106, F123, F125, F148) are ordinary context misses. The wider room tail held what the
1,400-character cut had hidden. The survivors are mostly mid-course reversals of a standing ruling: account routing,
voice and label choices, and audio spend above a cap. That is the round-3 shape, now no longer attributable to the
snapshot.

**Opus baseline, measured not extrapolated (part A).** On the 77 unsampled reconstructed forks: 69 reconstructed, 4
split, 4 missed. Across all 277 scored forks, Opus reconstructs **214 (77%)**, splits 24 and misses 39. Round 3
extrapolated ~219. For comparison, Haiku reconstructed 107 (38%).

**Status quo.** Opus names keep/defer as Tom's single move 12% of the time on the part-A forks, where Tom's own rate is
23%, and 14% on the missed set. The lean round 2 found is gone at Opus.

**What this does and does not license.**
- The instrument now has a stable menu, a reader at 77% reconstruction, and a residue of 15 forks that does not
  dissolve under a much wider read. That residue is the first measured instance of "moves the record did not prepare".
- A residue of 15 does not decide *what* those moves were: new information from outside the record, taste, or
  pattern-intelligence. Only Tom can say what he knew at those forks (candidate D).
- Retrieval is BM25 on the question and the room's tail, so some of the record may still sit beyond both queries.

**Cost.**
- 1,970 Opus calls; $359.77 at list price, subscription-billed.
- Tokens: 42.5M cache-write, 1.6M cache-read, 0.97M output.
- Accounts:
  - iCloud: 1,467 calls;
  - claude@: 474 calls, under the ramp rule of < 90% weekly and < 70% five-hour, else wait;
  - mac.com: 29 calls, before that rule reached this job. It is outside the ramp's allowed accounts.
- About 2.5 hours of wall time across one reboot and one five-hour limit.
- Data: private repo `ce-experiments`, `fork-recon-r4-ceiling/` (`scores4.json`, `analysis4.json`).

**Next, for the room.** Put the 8 hard-core forks (or all 15 survivors) to Tom as one card each: what was known at the
fork that the record did not hold? That is the selector speaking about its own selections (open thread 2). Each answer
is either new information the record should have carried, which is an instrument fix, or the selector moving from
outside the record, which is the claim's evidence.
