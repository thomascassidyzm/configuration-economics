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

### Round 4 results

_(filled in from `scores4.json` when the run completes — see below)_
