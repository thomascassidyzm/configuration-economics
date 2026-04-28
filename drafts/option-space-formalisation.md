# Option Space — A Candidate Formalisation

This is the keystone work from step 1 of the v0.2 push plan. It responds directly to Lens 4's sketch (reachable configurations under bounded exergy budget) and Lens 6's measurability attack. It is NOT the final formalisation — it is a candidate written so you have something concrete to react to rather than a blank page.

**Status:** Draft. Needs your voice, your judgment, and probably at least one mathematically-literate critic's eyes before promotion.

**Format on promotion:** Probably either (a) a new essay chapter titled "The Measurement Question" or (b) an appendix titled "Option Space: A Candidate Formalisation." Option (b) keeps the main essay accessible and gives interested readers a place to go. My instinct: (b).

---

## Why a formalisation is needed

Lens 6's most urgent attack (#2 in the ranked list): "Option space has no unit, no measurement procedure, no error bars — yet you propose it replaces GDP. Give me the unit."

Lens 3 independently: "A dissertation defending option space would need a non-circular formal definition, a worked example, and a bridge to existing operationalisable concepts (Sen's capabilities, real options, Assembly Index)."

Lens 1: If CE rides on DP §4.2, option space is the forward dual of DP's trajectory cost functional.

All three converge on the same point: without a formalisation, the central concept is rhetorical.

The `option-space-measurability` proposition (added 2026-04-23, status `open`) is the correct admission. But the admission opens a gap. This draft proposes filling it — not by claiming the gap is closed, but by staking a candidate formalisation the field can attack.

---

## The setup

Let:

- **S** = a system (economic, ecological, or hybrid)
- **C** = a configuration of S at some time t₀ (a full specification of physical arrangements, institutions, skills, infrastructures)
- **B** = exergy budget available to S over the horizon under consideration (solar flux integrated over time, plus initial stocks, minus maintenance overhead)
- **T** = time horizon of interest (could be a decade, a century, a millennium)
- **C** evolves through physics, human action, and stochastic events to reach future configurations {C'₁, C'₂, ...}

**The reachable set** from C given budget B over horizon T:

```
R(C, B, T) = { C' : C' is reachable from C using exergy ≤ B in time ≤ T,
               under physical and biophysical constraints,
               and under some set of admissible human decisions }
```

This set is finite in principle (discrete physical states, bounded by entropy considerations) but astronomically large in practice.

---

## The option space measure

The reachable set R is a mathematical object. To get a scalar "option space measure" ω(C, B, T), we need to reduce R to a number (or, more honestly, a partial ordering over configurations).

Several candidate measures. Each has strengths and failure modes.

### Candidate 1: Cardinality

```
ω₁(C, B, T) = |R(C, B, T)|
```

Count reachable configurations.

- **Strength:** Simplest possible. Well-defined in principle.
- **Failure:** Treats all reachable configurations as equivalent. A state where the system can reach 10^20 near-identical fossil-fuel-burning configurations scores the same as one where it can reach 10^20 diverse ones.
- **Verdict:** Too crude. Rejected.

### Candidate 2: Diversity-weighted

```
ω₂(C, B, T) = Σ_{C' ∈ R} w(C', R)
```

where w(C', R) weights each reachable configuration by its distinctness from the others.

- **Strength:** Values diversity.
- **Failure:** Requires a distance metric d(C', C'') on configurations. Defining such a metric is itself hard — it's the problem.
- **Verdict:** Pushes the problem one level deeper. But pushes it toward a tractable research question: what metric on configurations is right?

### Candidate 3: Assembly-weighted

```
ω₃(C, B, T) = Σ_{C' ∈ R} AI(C')
```

where AI(C') is the Assembly Index (Cronin) of C'.

- **Strength:** Weights reachable configurations by their construction complexity. A state reaching many high-complexity configurations is more valuable than one reaching many trivial ones. Directly connects to Cronin's backward-looking measure.
- **Failure:** Assembly Index is defined for molecules and chemistry; extension to socio-economic configurations is not yet developed. Also: AI measures what it took to build, not what the configuration enables.
- **Verdict:** Most interesting candidate. Develops the CE/AT bridge meaningfully. The specific novelty-delta that CE claims over Cronin is that ω₃ is computed over a FORWARD set, whereas AI is computed over a single object's HISTORY. The pairing is the contribution.

### Candidate 4: Compositional

```
ω₄(C, B, T) = sup { Σ_i L(Cⱼ) : {Cⱼ} ⊂ R is an achievable trajectory }
```

where L is some local utility or "livingness" measure.

- **Strength:** Connects to ecological-economics work on sustainability.
- **Failure:** Requires L, which is essentially the problem we were trying to avoid.
- **Verdict:** Defers to utility theory. Reasonable for economists; unsatisfying from physics.

### Recommendation

**Start with ω₃ (Assembly-weighted reachable set).** Reasons:

1. It's the measure most directly supportable by Distinction Physics (distinctions-as-primitive gives a path to counting construction steps).
2. It's the measure that makes the CE/AT bridge genuinely novel rather than rhetorical.
3. It's the measure that handles the Lens 6 "forest vs database of trees" case correctly — the forest's high-AI future states (complex ecosystems) weight more than the database's low-AI future states (more files).
4. It's formally definable even if currently non-computable, which is more than can be said for the current rhetoric.

**Treat ω₃ as the current candidate, explicitly open, with the expectation that the right measure will emerge from empirical work and mathematical refinement.**

---

## The partial ordering

Whatever ω is chosen, value comparisons should be read as a *partial* order, not a total one:

```
C ≽ C' iff ω(C, B, T) ≥ ω(C', B, T) for all relevant (B, T)
```

Some pairs (C, C') will be incomparable — C is better under some budgets and horizons, C' under others. This is a feature, not a bug. It matches the intuition that there is no single "best" configuration across all contexts.

**Implication for P22 (`viable-objective`):** The viable-objective ratio is not a scalar to be maximised but a partial order to be respected. "Maximise durable flourishing per unit of bounded throughput" reads as scalar; honest form is "prefer configurations that dominate in the partial order, accept tradeoffs where they don't."

This is a substantive revision to P22. Consider.

---

## A worked example: forest vs. industrial-agriculture configuration

**Configuration A: Diverse forest ecosystem**
- Initial state: mixed-age forest, diverse species, mycorrhizal networks, soil carbon, pollinator communities
- Exergy budget: solar flux (~1 kW/m² integrated over 50 years), minimal human inputs
- Reachable set includes: slow succession toward old-growth; selective timber harvests preserving canopy; mushroom/nut cultivation; continued carbon sequestration; species migration under climate change; diverse water-cycle regulation; configurations supporting future human settlement with low throughput cost

**Configuration B: Industrial monoculture on same land**
- Initial state: clearcut, single-species tree plantation, compacted soil, fertiliser dependence
- Same exergy budget (solar flux)
- Reachable set includes: continued monoculture with increasing fertiliser; clearcut → replant cycle; eventual soil depletion; pest outbreak + total loss; conversion to another monoculture

**Informal ω₃ comparison:**

R(A) contains many high-AI future configurations: the complex ecosystem states, the multi-species human-settlement states, the adaptive-to-climate-change states. Many of these would require substantial construction history if starting from scratch — they're Assembly-heavy.

R(B) contains fewer high-AI configurations. Most reachable states are low-AI: another monoculture, a degraded field, a simpler plantation. The clearcut has narrowed the reachable set in a way that exergy alone cannot restore — some pathways require stored biological information (seed banks, mycorrhizal networks) that was destroyed.

**ω₃(A) >> ω₃(B)** — the forest dominates on the partial order.

This is the kind of comparison CE needs to be able to make *rigorously*, not just *illustratively*. The example shows the direction.

---

## What this doesn't solve

### Unresolved issues

1. **How to compute R(C, B, T).** In principle: a search over physical trajectories. In practice: computationally intractable for systems of interest. Requires approximation, heuristics, or bounds.

2. **How to compute AI(C') for socio-economic configurations.** Cronin's AI is defined for molecules via construction graphs. Extension to institutions, skills, infrastructures requires a generalised notion of construction. Possibly: minimum number of decision-steps (in some primitive alphabet) to build the configuration. This is speculative.

3. **How to handle stochasticity.** Many reachable configurations are possible only probabilistically. Expected option space vs worst-case option space are different measures. Risk-aversion becomes a parameter.

4. **How to handle human agency.** R(C, B, T) depends on what decisions humans make. This is either a feature (option space respects agency) or a bug (it collapses into subjective choice). Probably: condition on "admissible" decisions — those compatible with physical survival and some minimal ethics — and measure R over that restricted set.

5. **How to handle the observer.** Option space for whom? Humanity? A particular economic actor? The biosphere? Different observers have different reachable sets. The framework should own this.

### Items to flag as open

All five above should be explicitly open questions. Honest scope for v0.2 is: "here's a candidate formalisation, here's what it resolves, here's what it doesn't." Not: "we have a measure."

---

## Connection to DP §4.2 (the optional deepening)

Per v0.2 direction, DP is offered as optional vocabulary, not required grounding. For readers who want it:

DP §4.2 defines a trajectory cost functional over distinction-space. The forward dual of that functional is precisely R(C, B, T): the set of trajectories starting from C, bounded by cost B, reaching time T. Option space is then a measure on that reachable set.

This is the Lens 1 bridge. It's available. It's not required. Readers without DP exposure can read the formalisation as pure non-equilibrium thermodynamics + ecological economics; readers with DP exposure see the additional structure.

---

## Status as a proposition

Currently `option-space-measurability` is the only proposition covering this. It's `open`, which is correct.

After promotion of this draft, consider:

- **Keep `option-space-measurability` as `open`** — nothing in this draft closes it. This is a candidate, not a solution.
- **Consider adding `option-space-as-reachable-set`** (status: `contested`) — the specific claim that option space is best formalised as R(C, B, T) with ω₃ weighting. That this candidate is the right one is itself contested.

---

## What to do with this

1. **Read it.** Probably with skepticism. It's my best articulation of Lens 4's sketch, not yours.
2. **React.** Which candidate measure feels right? Are the open questions the right ones? Is Assembly-weighted the move, or is there a better candidate I haven't considered?
3. **Promote** as either appendix or new chapter once it feels like your voice. Expect substantial rewriting.
4. **Cite it** from P3 (`value-option-space`) and P22 (`viable-objective`) once promoted.

The measurability attack is fatal to the current draft. This is the draft that makes it non-fatal. Worth time.

---

## Length note

This is ~300 lines. On promotion, probably 2-4x that, with worked examples, clearer math, and your framing. An appendix of 1000-2000 lines is defensible; this is the kind of technical depth academic readers will specifically look for to judge the work.

The main essay stays accessible; the appendix carries the technical weight.
