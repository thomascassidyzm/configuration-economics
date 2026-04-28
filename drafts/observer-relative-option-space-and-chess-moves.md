# Observer-Relative Option Space, Chess-Moves, and the No-Regret Viable Objective

Captured from session 2026-04-29 (Tom + Claude). The conversation produced moves that, if they hold up under voice-review, change the structure of `option-space-formalisation.md` (the keystone draft) in load-bearing places. This document captures the moves before they decay back into the transcript.

**Status:** Draft. Tom's fingerprints on the moves; my drafting. Needs voice review before any of it gets promoted. The keystone draft retains structural precedence; this is supplementary until both are reviewed together.

**Format on promotion:** Probably folded into `option-space-formalisation.md` as a Round 3 section, plus a candidate proposition `option-space-as-chess-moves` derived for `proposed-propositions.md`. Possibly also a P22 second-pass rewrite in `proposition-tightening.md`.

---

## Why this exists

The keystone draft's open question #5 — *option space for whom?* — was flagged with "the framework should own this." That isn't an answer. Tonight produced a structural answer.

The keystone's measurability concession — all four candidate ω-measures non-computable — was flagged honestly but left awkward. "Physics-grounded accounting" with non-computable measures is a soft target. Tonight produced a way around it.

P22 (`viable-objective`) had already been revised in the keystone from scalar maximisation to partial-order dominance. Tonight produced a *further* revision: from optimisation to no-regret preservation.

These three moves cohere. This document captures them as a unit so they can be reviewed together.

---

## Move 1 — Observer-relativity from Wolfram

The keystone's open #5: *Option space for whom? Humanity? A particular economic actor? The biosphere?* Different observers have different reachable sets. The draft conceded this and stopped.

**Wolfram's *Observers Like Us* is the missing ground.** Wolfram's claim is that the laws of physics we observe aren't intrinsic to the ruliad — they're the slice the ruliad presents to observers of *our class* (computationally bounded, persistent, sequentialising). Different observer-classes carve up the same underlying structure differently. Physics already concedes this.

The parallel move for CE:

> Option space isn't intrinsic to the configuration space. It's the slice life-persisting observers access.

So the formal object becomes:

```
R_living(C, B, T) = configurations reachable from C, exergy ≤ B, time ≤ T,
                    in which living entities continue to exist and make distinctions.
```

This is observer-relative *by design*, not by concession. The "for whom" question gets a principled answer: for the class of beings that maintain themselves, persist, and make distinctions. Wolfram-shaped, DP-compatible (every observer with a finite energy budget has a different R; that's what energy-budget-as-axiom-2 of DP buys us), and connectable to existing physics rather than apologising to it.

**What this strengthens.** The physics-grounding claim *increases* in resolution. Observer-relativity isn't a hand-wave; it's the same move physics already made.

**What this still leaves open.**
- *Major class of life vs individual.* A wolf eating a deer expands wolf R_living, contracts deer's to zero. Aggregating across individuals is the hard problem. Provisional answer: criterion is at the *category* level — "preserves the capacity for life to exist as a category, with current functional diversity, over the relevant horizon." Not utilitarian aggregation.
- *Operational definition of "living entity."* Phylum? Functional ecological role? Capacity for distinction-making (which folds back into DP)? Open.
- *Wolfram parallel: formal or analogical?* The Observers-Like-Us framing is suggestive. Whether CE commits to Wolfram's full formalism or treats it as guiding analogy is a strategic decision. Probably analogical for v0.2; formal commitment can come later.

---

## Move 2 — Chess-moves as operationalisation

The keystone admits all four candidate measures (cardinality, diversity-weighted, Assembly-weighted, compositional) are non-computable in practice. That's awkward when the framework markets itself as physics-grounded *accounting*.

**The dodge: don't compute ω(C). Compute Δω(move).**

In chess, engines don't compute the full game tree (intractable). They evaluate move quality via heuristics that approximate preserved flexibility. *Did this move open up the position or close it?* Even directionally, this is enough to play.

The same move works here. Each policy decision, infrastructure commitment, land-use change, institutional reform is a *move* on the configuration. Evaluate locally:

> Does this move expand or contract R_living on balance, over the horizon a class of life depends on?

Local gradient evaluation can be tractable when global value computation isn't. Three concrete consequences:

1. **The framework ships with a usable decision-procedure.** "Is this configuration valuable?" is hard. "Is this move opening or closing R_living?" is easier — sometimes obviously so. Mass extinction events, monoculture conversions, fossil-fuel commitments locking in 4°C are unambiguous Δω-negative even when global ω(post-state) is non-computable.

2. **GDP gets attacked at category level.** GDP is a scalar tally of throughput. Chess-evaluation of moves is differential, longitudinal, life-weighted. Different category of measurement entirely. The format claim writes itself.

3. **The measurability attack (keystone Lens 6 #2) becomes non-fatal.** Critic: "Option space has no unit, no measurement procedure, no error bars." Response: global ω is open research; local Δω is evaluable now, and that's enough to prefer moves over moves.

**What this still leaves open.**
- *Aggregation across simultaneous moves.* Chess has one player. Biosphere has billions of agents making interacting moves. The structural criterion in Move 1 (preserve capacity for life as a category) probably handles this — we don't need to aggregate utility across agents, we need to check whether the *pattern* of moves preserves R_living's category-level structure.
- *Δω for whom.* Moves that expand wolf R_living and contract deer R_living are net-what? Likely answer: at category level (Carnivora and Cervidae both persist), this is a wash; predator-prey dynamics are option-space-preserving for the system. The criterion is structural, not summed.
- *"On balance" needs a structural criterion.* Sums need weights and weights are contestable. Better: a move is *option-space-degrading* iff it eliminates a major class of life's R_living entirely or asymptotically. Aubin's viability theory framing — admissible trajectories must keep all major constraint sets non-empty.

---

## Move 3 — Longitudinal as trump

A move that expands R_living for the next year and collapses it over the next millennium is bad. A move that contracts R_living for the next year and enables much higher R_living over the next millennium might be good. Horizon matters.

**Horizon (B, T) becomes a parameter the framework owns**, not a hidden choice. Every option-space measurement comes tagged with the budget and horizon under which it was evaluated. The partial order is (B, T)-relative.

This rules out the most common failure mode: trading future R_living for present consumption while reporting only the present numbers. Extractivism's accounting trick.

It also gives the framework principled handling of the cases that look paradoxical at one horizon and obvious at another (slow restoration projects, geological-time carbon commitments, multi-generational infrastructure decisions).

**What this still leaves open.**
- *Choosing the horizon for any specific decision.* Probably context-dependent, with a default to "the longest horizon any major class of life depends on." Contestable but explicit is better than hidden.
- *Discounting.* Standard economic discounting assumes preferences over time. The framework's stance: don't discount; report at multiple horizons; let moves dominate or fail explicitly at each.

---

## Move 4 — The synthesis: viable objective as no-regret

P22's original form: "Maximise durable flourishing per unit of bounded throughput." Scalar.

The keystone's revision (already drafted): partial order over configurations, accept incomparability where it exists. Still a *state-comparison* frame.

**Tonight's revision: shift from state-comparison to move-evaluation, from optimisation to no-regret preservation.**

Candidate restatement:

> Prefer configuration-changes that preserve R_living for all major classes of life across all relevant horizons. Reject configuration-changes that asymptotically collapse R_living for any such class at any such horizon.

This is a *no-regret* objective. Structurally different from maximisation. Closer to medical *first do no harm* than to economic optimisation. It tolerates incomparability between dominant configurations — it doesn't need to pick a winner among non-dominated states; it just needs to refuse moves that close categorical R_living.

**Three reasons this is the right reformulation.**

1. **It's implementable.** Every actual decision is a move. No-regret over moves is operational; maximisation over states isn't.
2. **It matches the chess-moves frame from Move 2.** State-frame and move-frame are now coherent — viable objective is the move-quality criterion.
3. **It survives observer-relativity.** The criterion is at category level, not at aggregated welfare. Different observer-classes can disagree on optimal states and still agree on which moves are option-space-degrading.

**What this still leaves open.**
- *Major-class definition.* See Move 1.
- *Asymptotic collapse vs degradation.* When does a move *eliminate* a class's R_living vs merely *narrow* it? The criterion as stated is binary; the reality is graded. Probably needs thresholds calibrated empirically per domain.
- *Trade-offs between horizons.* If a move preserves R_living at 100 years and collapses it at 10,000, the no-regret criterion says reject. But if no available move avoids long-horizon collapse, the criterion has nothing to say. Probably needs a fallback: "minimise the horizon at which collapse becomes asymptotic."

---

## What this updates in the keystone draft

Tracking specifically because the keystone is the document of record.

| Keystone section | Update |
|---|---|
| Setup (R(C, B, T)) | Replace with R_living(C, B, T) — observer-relative restriction is principled, not optional |
| Open #5 (the observer) | Move from "framework should own this" to a structural answer (life-persisting class via Wolfram parallel) |
| Open #1 (computing R) | Partially closed via local Δω evaluation; global R remains research-open |
| §"What this doesn't solve" — measurability concession | Stronger response now available: global ω non-computable, local Δω evaluable directionally |
| Four candidate measures (ω₁–ω₄) | Still hold for *global* ω. Chess-moves frame is a *separate* (local) mode of evaluation. Both are useful — global gives directional preference between configurations; local gives traction on actual decisions |
| Worked example (forest vs monoculture) | Reframe as a move-evaluation: "the conversion from A to B is a move that asymptotically collapses R_living for many classes of life over 50-year horizons. Move-evaluation is unambiguous even when global ω(B) isn't computable." Stronger than the original "informal ω₃ comparison." |
| §P22 implication (partial-order revision) | Updated again: partial order over states is the static frame; no-regret over moves is the dynamic frame. Both are needed |

---

## What this means for the other drafts

- **`proposition-tightening.md`.** The P22 rewrite needs another pass. The partial-order revision was right but incomplete; the no-regret reformulation is the more complete move.
- **`proposed-propositions.md`.** Add candidate `option-space-as-chess-moves` (Move 2) and possibly `living-entity-class-relative-r` (Move 1). Both worth drafting once this document is voice-reviewed.
- **`counterargument-engagement.md`.** Lens 6 #2 (measurability) gets a substantively stronger response. Worth rewriting that section after the chess-moves frame is canonical.
- **`option-space-formalisation.md`.** Cross-reference section added in parallel commit. Full integration on next promotion pass.

---

## Pressure points still open (don't pretend they're solved)

1. **Wolfram parallel is suggestive, not formally worked out.** Either commit to the formalism or be explicit it's analogy. v0.2 stance: analogical, with the option to formalise later.
2. **"Major class of life" needs operational definition.** Phylum-level? Functional ecological role? Capacity for distinction-making (DP-grounded)? Open.
3. **Relevant-horizon selection is contested per decision.** Framework owns the parameter; doesn't dictate the value.
4. **Real options theory (Dixit & Pindyck) and viability theory (Aubin) are the closest prior art.** Real options literally measures reachable configurations under uncertainty. Viability theory formalises admissible trajectories under non-empty constraint sets. Both must be cited and engaged in `lineage-and-positioning.md`. The framework's specific delta over each:
   - vs. Real Options: forward, *for living-entity-class observers*, with structural rather than monetary valuation
   - vs. Viability Theory: option-space *expansion* rather than viability-set *non-emptiness* (CE wants more than survival; it wants flourishing)
5. **Aggregation across simultaneous agents.** Chess has one player. Biosphere has many. Structural criterion (Move 2 last bullet) probably handles it but needs articulation.

---

## The shape of the keystone after these moves

If all four moves stand, the keystone draft's overall shape becomes:

1. **Setup.** R_living(C, B, T) — observer-relative reachable set, life-persisting class.
2. **Two evaluation modes.** Global ω (non-computable, candidate measures, partial order over configurations) AND local Δω (computable directionally, move-evaluation, no-regret over horizons).
3. **The viable objective.** No-regret preservation: prefer moves preserving R_living for all major life-classes at all relevant horizons; reject moves collapsing it for any such class at any such horizon.
4. **Worked examples.** Forest-vs-monoculture (move-evaluation), policy commitment cases (chess-moves over R_living).
5. **Open problems.** Major-class definition, horizon selection, prior-art engagement, formal Wolfram commitment.

This is structurally tighter than the existing keystone. The measurability attack genuinely loses its bite. The "for whom" question genuinely gets answered. P22 becomes implementable.

That's a substantive v0.2 advance, captured in one session. Worth the careful voice-review before promotion.

---

## Status note

This draft was written fast (~15 min wall-clock) at the end of a session, specifically to capture the conversation before it decays. Expect rough edges. Do not promote without voice-review. The keystone document and the existing drafts retain canonical priority until you've decided which of the four moves above survive your scrutiny.

The companion update — Round 3 cross-reference section in `option-space-formalisation.md` and a Round 8 entry in `PLAN.md` — was made in the same commit by a parallel agent, to keep the document of record consistent with the new draft.
