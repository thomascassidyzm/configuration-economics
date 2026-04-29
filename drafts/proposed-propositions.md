# Proposed Propositions — April 2026

Three candidates. The first two are drafted in response to the physics-rigour review (Lens 4) and address specific gaps flagged as load-bearing. The third (`option-space-as-chess-moves`) follows from the 2026-04-29 session that produced the local-Δω + Wolfram observer-relative + no-regret reformulation moves; it shares its session and review timing with the P22 rewrite.

---

## 1. `exergy-not-energy` — would fill the empty `established` bucket

**Rationale (from Lens 4 memo):** Nearly every "energy flux / savings / income" in the essay is really exergy. Energy is conserved; you never spend it. Exergy (free energy, available work) is what tracks the economic cost. Using the precise term disarms the single most pervasive physics-reader objection to the current draft.

**Status call:** `established`. First-law conservation and the exergy-as-availability definition are textbook thermodynamics. No reasonable disagreement.

**To promote:** paste into `propositions.ts` in the v0.5 section.

```typescript
{
  id: 'exergy-not-energy',
  title: 'What Is Actually Spent Is Exergy',
  epistemicStatus: 'established',
  surface: `When this work speaks of economies "spending energy" or "running on energy income," the physically precise term is exergy: the portion of energy available to do useful work.

Energy itself is conserved. It cannot be spent. What is spent is its ability to do work — its distance from thermodynamic equilibrium with the surroundings. A battery contains the same energy before and after it powers a laptop; what changed is that a usable gradient has become dispersed heat.

This distinction is implicit throughout. Where the essay uses "energy" in economic contexts, "exergy" is what the physics supports.

In accessible prose, "energy" reads better and is familiar. In formal claims, "exergy" is precise.`,
  logic: {
    claim: 'Economic activity that "consumes energy" is rigorously described as exergy destruction; energy itself is conserved.',
    premises: [
      'The first law of thermodynamics: energy is conserved in any closed process.',
      'Economic processes reduce the availability of energy to do further work — they increase entropy.',
      'Exergy (available work) tracks this reduction; energy does not.'
    ],
    conclusion: 'Accurate physical accounting of economic activity measures exergy throughput, not energy throughput.'
  },
  linksTo: ['throughput-cost', 'energy-income-inheritance']
}
```

**Section mapping to add in `SECTION_PROPOSITIONS`:**
- `physical-envelope`: add `exergy-not-energy`
- `accounting-error`: add `exergy-not-energy`
- `throughput-proxy`: add `exergy-not-energy`

---

## 2. `binding-constraint` — the solar-flux / scale concession

**Rationale (from Lens 4 memo):** Earth receives ~175 PW solar exergy continuously; human civilisation dissipates ~18 TW. We are nowhere near a raw thermodynamic ceiling. A common reading of "bounded energy flux" is that we're running into the second law at planetary scale — we are not. The active constraints are elsewhere: entropy-dump capacity (waste heat + waste configurations), specific materials (phosphorus, rare earths, fresh water, topsoil), and biosphere integrity.

Without this concession, any physics-literate reader dismisses the work in the first chapter. With it, the argument shifts from "we're hitting the thermodynamic wall" (which is wrong) to "we're hitting the sink wall and the material-rate wall and the biosphere wall" (which is right and defensible).

**Status call:** `derived`. The scale comparison is empirical (established in its components); the conclusion that the constraint operates *elsewhere than raw flux* follows from those components.

**To promote:** paste into `propositions.ts` in the v0.5 section.

```typescript
{
  id: 'binding-constraint',
  title: 'The Binding Constraint Is Not Energy Influx',
  epistemicStatus: 'derived',
  surface: `Earth receives solar exergy at roughly 175 PW continuously. Human civilisation dissipates roughly 18 TW. By the raw thermodynamic budget, we are nowhere near a ceiling.

This matters because a common reading of "bounded energy flux" is that economic activity is hitting the second law. At planetary scale, it is not. The active constraints are elsewhere.

Waste heat and waste configurations must go somewhere, and the biosphere, oceans, and atmosphere are the sink. Specific materials — phosphorus, rare earths, fresh water, topsoil — are bounded not by total quantity but by extraction and regeneration rates. Biospheric integrity governs which configurations remain stable at all.

"Bounded energy flux" in this work names these practical bindings, not the distant thermodynamic ceiling. The ceiling is far; the floor of what the biosphere can absorb is close.`,
  logic: {
    claim: 'The operative physical constraints on human economic activity are entropy-dump capacity, specific materials, and biosphere integrity — not total energy influx.',
    premises: [
      'Solar exergy influx to Earth (~175 PW) vastly exceeds current human dissipation (~18 TW).',
      'Waste heat and waste configurations must be absorbed by finite biospheric, oceanic, and atmospheric sinks.',
      'Specific materials face extraction-rate and regeneration-rate bindings independent of total stock.',
      'Biosphere integrity governs which configurations remain stable.'
    ],
    conclusion: '"Bounded energy flux" names these practical bindings, not the thermodynamic ceiling.'
  },
  linksTo: ['exergy-not-energy', 'energy-income-inheritance', 'displaced-costs', 'configuration-not-information']
}
```

**Section mapping to add in `SECTION_PROPOSITIONS`:**
- `physical-envelope`: add `binding-constraint`
- `accounting-error`: add `binding-constraint`

**Essay-level note:** §1 (`physical-envelope`) currently reads "Energy flows are bounded. Entropy increases globally, even where local order is temporarily created." The word "temporarily" is the weak point Lens 4 flagged — life has persisted 3.8 Gyr, there's nothing obviously temporary about it at the relevant timescale. A rewrite of §1 to reference `binding-constraint` explicitly would tighten this.

---

## 3. `option-space-as-chess-moves` — the local-Δω operationalisation

**Rationale (from session 2026-04-29, captured in `observer-relative-option-space-and-chess-moves.md` and `polychess-as-teaching-device.md`):** The keystone draft concedes all four candidate ω-measures are non-computable. That's an awkward soft target for a framework that markets itself as physics-grounded *accounting*. The dodge is structural: don't compute ω(C); compute Δω(move). Local gradient evaluation can be tractable when global value computation isn't. This is the move that makes the framework usable now, before measurement matures, and it has direct lineage in Snowden's *next best move* (Cynefin, ~2003–present) and Aubin's viability theory.

It also slots cleanly into the framework's `layers` schema. Vanilla chess at coreClaim (accessible), formal Δω at formalDefinition (rigorous), polychess at implications (the deeper observational frame), aggregation/horizon/major-class questions at openQuestions. Progressive disclosure rather than a single naming choice — see the framing-decision principle in `polychess-as-teaching-device.md`.

**Status call:** `derived`. Follows from `value-option-space` + `option-space-measurability` once you accept that local move-evaluation can substitute for global state-evaluation. The Snowden lineage demonstrates this works in practice; CE's contribution is the physical grounding (Δω evaluated over R_living, exergy-budgeted, horizon-tagged) and the retained forward-looking measurement aspiration.

**To promote:** paste into `propositions.ts` in the v0.5 section.

```typescript
{
  id: 'option-space-as-chess-moves',
  title: 'Option Space Is Evaluated Move by Move',
  epistemicStatus: 'derived',
  surface: `If global option space is hard to measure, the practical question is whether it can be evaluated locally — move by move — well enough to act on.

Chess engines do not compute the full game tree. They evaluate moves by whether the resulting position has more or fewer good options. *Did this move open up the position or close it?* Even directionally, this is enough to play.

The same operation is available here. Every policy decision, infrastructure commitment, land-use change, institutional reform is a *move* on the configuration. The question is local: does this move expand or contract the reachable set of life-supporting configurations, over the horizon a class of life depends on?

Mass extinction events, monoculture conversions, fossil-fuel commitments locking in 4°C are unambiguously option-space-degrading even when global option space after the move is non-computable. Local gradient evaluation is tractable where global value computation isn't.

This is not new. Dave Snowden has articulated *next best move* as the central practical primitive in complex domains since Cynefin took its modern form. Aubin's viability theory formalises admissible trajectories under non-empty constraint sets. This work inherits both lineages and adds physical grounding — moves are evaluated over an explicit exergy budget and horizon, restricted to the class of observers that maintain themselves and persist.`,
  logic: {
    claim: 'Option space is evaluable locally as the differential effect of moves, even where it is not computable globally as a state measure.',
    premises: [
      'Global option space ω(C) is currently non-computable for all candidate measures (cardinality, diversity-weighted, Assembly-weighted, compositional).',
      'Local move evaluation Δω(move) does not require global computation — it requires only directional comparison between the pre-move and post-move reachable sets.',
      'In practice, many consequential moves (mass extinction, irreversible lock-in, asymptotic ecosystem collapse) have unambiguous Δω signs even when global ω remains non-computable.',
      'Snowden\'s next-best-move stance and Aubin\'s viability theory establish that local evaluation under structural criteria is operational in complex domains.'
    ],
    conclusion: 'The framework ships with a usable decision procedure: evaluate moves by their effect on the reachable set of life-supporting configurations, over the horizon a class of life depends on.',
    predictive: 'Move-evaluation will produce convergent verdicts across observers on the most consequential cases (irreversible loss, structural lock-in, asymptotic collapse), even where state-comparison remains contested.'
  },
  layers: {
    coreClaim: 'Don\'t compute the whole board. Evaluate each move by whether it opens or closes future options. Chess engines do this; the same logic applies to policy and infrastructure choices.',
    formalDefinition: 'Δω(move) on R_living(C, B, T) — local gradient evaluation of moves on the observer-relative reachable set, exergy-bounded by B, horizon-tagged by T, restricted to the class of life-persisting observers. Lineage: Snowden\'s next best move (Cynefin, ~2003–present) for the operational stance; Aubin\'s viability theory for admissible trajectories under non-empty constraint sets; Real Options theory (Dixit & Pindyck) as the financial-register precedent. This work\'s addition: physical grounding (R_living defined over an exergy budget) and the retained forward-looking measurement aspiration.',
    implications: 'The single-board chess metaphor extends to *polychess* — multiple games on multiple boards, with pieces shared across boards, players often unaware that other games are even being played. Externalities reframe from "side effects" to *uncounted moves on boards you didn\'t know you were playing on*. GDP is the score on one board. Standard economics plays one board; ecological economics adds one more; this work is explicitly polychess. The unit of value is preserved option space across the poly-board, not the score on any single board. See `polychess-as-teaching-device.md` for the layered teaching device.',
    openQuestions: 'Aggregation across simultaneous moves by many agents (chess has one player; the biosphere has many). The operational definition of "major class of life" — phylum-level? Functional ecological role? Capacity for distinction-making? Selection of the relevant horizon for any specific decision (default: the longest horizon any major class depends on, but this is contestable). When does a move *eliminate* a class\'s reachable set vs. merely *narrow* it — the criterion as currently stated is binary; reality is graded.'
  },
  linksTo: ['value-option-space', 'option-space-measurability', 'viable-objective', 'transition-fragility', 'displaced-costs']
}
```

**Section mapping to add in `SECTION_PROPOSITIONS`:**
- Wherever `option-space-measurability` currently appears: add `option-space-as-chess-moves` (it's the operational counterpart)
- The viable-objective section: add `option-space-as-chess-moves` (move-evaluation is the implementable form of the no-regret criterion)

**Coupling with P22 rewrite.** This proposition coheres with the no-regret reformulation of P22 (`viable-objective`) drafted in `observer-relative-option-space-and-chess-moves.md`. State-comparison is the static frame; move-evaluation is the dynamic frame. Both are needed. Promote together when the P22 voice review lands.

**Possible follow-on:** a `/polychess` page or teaching appendix once promotion lands. The polychess draft is structured to support it.

---

## If you promote all three

The `established / derived / contested / open` counts become: **1 established, 17 derived, 7 contested, 1 open**. All four buckets populated; the format's promise is honestly represented across the whole set.
