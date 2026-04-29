# Polychess — A Layered Teaching Device for the Chess-Moves Frame

Captured from session 2026-04-29 (Tom + Claude, continuation of the same evening that produced `observer-relative-option-space-and-chess-moves.md`). The conversation produced a structured way to teach the chess-moves move at four nested resolutions, using the framework's own progressive-disclosure architecture rather than forcing a single naming choice.

**Status:** Draft. Tom's metaphor extensions; my structuring. Needs voice review before promotion. Probably belongs eventually as either a `/polychess` page or a teaching appendix to whatever proposition formalises chess-moves on R_living.

---

## Why a metaphor here at all

The framework already commits to progressive disclosure as a practice (see `/practice` and the `layers` schema on every proposition). Different readers, different layers, same claim. Framing decisions don't need single answers — they need *consistent refinement* across layers, where deeper layers tighten rather than contradict the earlier ones.

Chess works as the entry metaphor for the move-evaluation move (see `observer-relative-option-space-and-chess-moves.md`, Move 2) because chess engines genuinely *do* what we're describing: not computing the full game tree, but evaluating moves by preserved flexibility. That part is load-bearing and survives all the way down.

What chess *doesn't* do at vanilla level — single-player, closed game, fixed rules, complete information — turns out to be exactly the curriculum. Each missing feature is a lesson about how the actual system differs from the simplest case. The metaphor extends rather than fails.

This document captures four layers: vanilla chess at the coreClaim, extended chess at the implications layer, polychess at the deeper observational layer, and formal Δω at the most rigorous layer. Each refines, none contradicts.

---

## Layer 1 — Vanilla chess (coreClaim resolution)

**What survives all the way down.** Chess engines don't compute the full game tree. They evaluate moves by whether the resulting position has more or fewer good options. *Did this move open up the position or close it?* Even directionally, this is enough to play.

Map to CE: every policy decision, infrastructure commitment, land-use change is a move. Evaluate locally — does this move expand or contract R_living on balance, over the horizon a class of life depends on? Local gradient evaluation is tractable when global value computation isn't.

This layer is enough for a general reader. They get the central idea: value lives in moves that preserve future flexibility. They can apply it loosely to decisions in their own life.

---

## Layer 2 — Extended chess (implications resolution)

The simple chess metaphor has limits. Each limit, when surfaced, teaches a real feature of the system being modelled.

### Reversibility classes (already in the base game)

Chess natively teaches four classes of move. No metaphor extension needed.

- **Reversible moves** — knight forward, knight back. Most moves can be inverted in principle. *Maps to:* most policy reversals, regulation rollbacks, recoverable ecological state.
- **Captures** — irreversible, asymmetric, zero-sum at the piece level. The piece is gone from the board permanently. *Maps to:* mass extinction, soil loss, language death, killed-off institutional knowledge. Once it's off, no inverse move restores it. The negative irreversibility — destruction.
- **Castling** — one-shot, preconditional, structural. You can only do it once, only under specific board states, and you can never un-castle. *Maps to:* constitutional moments, treaty lock-ins, infrastructure commitments — configurational changes that consume their own option to be made. The structural irreversibility — lock-in.
- **Pawn promotion** — forward-asymmetric and irreversible. Pawns can become queens; queens can't become pawns. *Maps to:* emergence — configurations producing new kinds of agents, technologies, institutions that didn't exist before. The positive irreversibility — creation.

Four classes of move-quality, all present in the base game: reversible / irreversibly-destructive / structurally-locking / emergently-creating. The framework inherits the distinction without further work.

### Extensions that surface real features

Each "now imagine that's not true" is a lesson about the actual system:

- **Two players per team, who can't talk to each other.** *Captures:* coordination without communication. Multiple actors on "the same side" (humanity, all life) sharing interests but unable to centrally coordinate. *Maps to:* P17 (`coordination-wealth`) — coordination is itself a costly configuration, not a free given.
- **Unknown number of players.** *Captures:* open systems. Future generations are players we can't enumerate. Bacterial communities make moves we don't see. *Maps to:* the observer-relativity of Move 1, the structural-criterion-not-aggregation argument.
- **Rules not invariant.** *Captures:* the system co-evolves with the moves. Climate shifts the board. Tipping points change the geometry. The thermodynamic envelope shifts as configurations are exhausted. *Maps to:* P19 (`transition-fragility`), P11 (`time-asymmetry`), the non-equilibrium framing.
- **One side can control the rules.** *Captures:* asymmetric power. Capital, states, accounting standards shape what counts as a valid move. GDP is itself a rule-controlling move. *Maps to:* P18 (`legibility-truth-tradeoff`) — Scott's seeing-like-a-state.
- **The board itself is alive.** *Captures:* ecosystem agency. Squares can refuse moves, nurture pieces, or die. The substrate has its own dynamics. *Maps to:* P8 (`care-as-configuration`), the active-stewardship register.
- **Pieces can become squares and vice versa.** *Captures:* configuration-vs-content fluidity. Today's actor is tomorrow's structure. Yesterday's institution shapes today's agents.
- **Some moves cost more than others.** *Captures:* exergy budgets are real. Standard chess gives unlimited move-rights; R_living doesn't. *Maps to:* P2 (`throughput-cost`).
- **Pieces multiply or die.** *Captures:* populations change. Living entities aren't fixed pieces; they regenerate, decline, evolve.
- **The score is computed by the board, not the players.** *Captures:* value is structural (whether life persists), not preference-based. The board scores. *Maps to:* P3 (`value-option-space`), P22 (`viable-objective`) in its no-regret form.
- **You don't know which side you're on until you play.** *Captures:* the observer-class question. Whose R_living are you preserving? You find out by playing.
- **Some moves disable other players.** *Captures:* collapse cascades. One team's move (pollution, monoculture, lock-in) eliminates pieces from another team's roster.

This layer is enough for an engaged reader who wants to understand what the framework actually claims. Each extension is a teaching point. They can run examples through the metaphor and check intuitions.

---

## Layer 3 — Polychess (the deeper observational layer)

The biggest extension. Chess assumes one board. The actual system has many.

**Polychess:** multiple games happening simultaneously, on multiple boards, with pieces shared across boards, players often unaware that other games are even being played.

A piece on board A is also a piece on boards B, C, D — possibly with different roles on each. A move on board A might be the same physical action that registers as a move on boards B, C, D — possibly catastrophic on one while optimal on another. Different players have visibility into different subsets of boards. Some boards have rules other boards don't.

### What polychess teaches that vanilla and extended chess can't

- **Externalities at depth.** They're not "side effects" of your move on *your* board. They are *moves on other boards you didn't know you were also playing on*. This reframes externalities from "unintended consequences" to "uncounted moves," which is a crisper claim and a sharper attack on standard accounting.
- **Scale interaction.** Micro / meso / macro as separate boards with shared pieces. Your individual life-decision is simultaneously a community-scale move and an ecological-scale move. Each board scores it differently.
- **Why GDP is wrong becomes vivid.** GDP is the score on one specific board. Polychess says: there are other boards where your moves are also being played, scored differently, with different king-pieces. You can win the GDP-board while losing every other board you didn't know you were playing on.
- **The legibility problem (Scott / P18).** You can only see boards you can read. Boards you can't read still register your moves. Indigenous land knowledge, ecosystem dynamics, intergenerational care relations — these are boards modern accounting can't see, but moves still register on them.
- **Coordination failure.** Many "irrational" outcomes are people optimising on the boards they can see, while moves cascade across boards they can't. The local optimisation is rational; the global outcome is collapse.
- **Why one-board frameworks fail.** Steady-state economics (Daly), degrowth (Hickel), planetary boundaries (Rockström) all add *constraints* to a one-board game. Polychess says the structural problem isn't insufficient constraints on the game — it's that the game itself is multi-board, and any one-board framework misses by construction.

### CE's specific delta in polychess language

Standard economics: plays one board (financial), ignores others.
Ecological economics: adds one more board (biophysical), still treats it as one game.
Configuration Economics: explicitly polychess. Many boards, shared pieces, partial visibility. The unit of value is preserved option space across the *poly-board*, not the score on any single board.

This is the move that justifies why CE isn't reducible to ecological economics or to systems theory or to complexity economics — it's a polychess framing where the others are still single-board (just with more constraints).

---

## Layer 4 — Formal (the rigorous resolution)

Beyond polychess, the formal language drops the metaphor:

- **Δω(move) on R_living(C, B, T)** — local gradient evaluation of moves on the observer-relative reachable set, exergy-bounded, horizon-tagged.
- **Snowden's *next best move*** — the methodological lineage. Probe-sense-respond, vector measurement, constraint-mapping. CE adds physics-grounding and forward-looking measurement aspiration.
- **Aubin's viability theory** — admissible trajectories under non-empty constraint sets. The mathematical anchor for "preserve major classes from collapse."
- **Real options (Dixit & Pindyck)** — measurement of reachable configurations under uncertainty, in the financial register. CE generalises to structural rather than monetary valuation.
- **Wolfram's Observers Like Us** — observer-relative slicing of the configuration space. The principled ground for restricting R to life-persisting observers.

This layer is for the academic reader, the formal reviewer, the collaborator working on extensions. They get the citations, the mathematical apparatus, the open-research-program flagging.

---

## What polychess still doesn't teach

Honest about the metaphor's residual limits even at the deepest extension:

- **Discrete moves vs continuous evolution.** Chess has turn-based discrete moves; reality has continuous co-evolution. The discrete framing is a simplification — useful for pedagogy, possibly distorting for formalisation.
- **Crisp rules vs negotiated norms.** Chess rules are fixed and known to all players (even when extended to "rules can change"). Real-world "rules" are continuously contested and negotiated. The polychess extension flags this but doesn't fully capture it.
- **Distinct boards vs nested embedding.** Polychess presents boards as distinct entities. Real systems are nested — board A is *embedded in* board B, not parallel to it. Phylum is in ecosystem is in biosphere is in solar-flux-budget. Hierarchy, not parallelism.
- **Players vs non-player participants.** Chess has players and pieces. Reality has agents at multiple levels — bacteria, individuals, institutions, ecosystems — each with partial agency. The player/piece distinction is a useful simplification but not exact.

These limits are honest. They're also where the formal layer (Δω, Aubin, Snowden) takes over from metaphor entirely.

---

## Positioning: polychess as a brand asset

Snowden uses gardening. Equilibrium economics uses Newtonian mechanics. Evolutionary biology uses fitness landscapes. Complexity economics uses adaptive landscapes. Each framework's chosen metaphor *is* part of its brand, and each metaphor structurally pre-commits the user to a way of seeing.

**Polychess** is distinctive territory:

- *Game-theoretic* — captures strategic interaction
- *Multi-scale* — captures cross-board cascades
- *Partial-information* — captures legibility limits
- *Living-system-friendly* — pieces multiply, die, transform
- *Reversibility-aware* — the four chess-native classes of move are already there

It also signals where CE differs from its neighbours:
- vs. standard economics: polychess instead of single-board equilibrium
- vs. ecological economics: polychess instead of single-board-with-biophysical-constraint
- vs. complexity economics: polychess with explicit observer-class restriction
- vs. Snowden's gardening: polychess as the structural model behind the gardening practice

This is brand-grade. Worth using.

---

## The recursive observation

Tom resolved the chess-vs-Snowden naming tension by *extending* the existing chess metaphor rather than replacing it. That's the same operation as preserving R(framework) by adding without committing exclusively. The framework keeps eating its own dogfood at the design layer.

This document is itself a polychess move on the framework: it adds a teaching layer (one board) without closing the formal layer (another board), without committing exclusively to the metaphor (which would close the academic-credibility board). The metaphor and the formalism live in parallel, scored differently by different reader-classes.

The fact that this works *as a framing decision* is meta-evidence the polychess frame is operational. It just played itself.

---

## Where this attaches

- **`observer-relative-option-space-and-chess-moves.md`** — Move 2 should reference this document for the layered teaching shape; the lineage note already cites Snowden, polychess fits as the deeper metaphor extension before the formal Δω.
- **Candidate proposition `option-space-as-chess-moves`** (queued in `proposed-propositions.md`) — when drafted, structure with vanilla → extended → polychess → formal across the `layers` schema (coreClaim / formalDefinition / implications / openQuestions). The chess metaphor lives at coreClaim; polychess at implications; Δω + Snowden + Aubin at formalDefinition.
- **`lineage-and-positioning.md`** — Snowden entry already cited; polychess could be flagged in CE's "specific delta" section as the structural framing that distinguishes CE from single-board predecessors.
- **Possible `/polychess` page** — once promoted, this whole layered teaching device probably wants its own surface, especially if used in talks or external writing. Vivid, popular, structurally honest.

---

## Status note

Captured fast (~30 min wall-clock) in a continuation session. Tom's fingerprints on the polychess naming and several extensions; my structuring of the four-layer progression and the residual-limits section. Voice review still needed before promotion. The draft retains the same status as `observer-relative-option-space-and-chess-moves.md` — supplementary to the keystone, awaiting deliberate promotion.
