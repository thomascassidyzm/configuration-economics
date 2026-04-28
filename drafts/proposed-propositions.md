# Proposed Propositions — April 2026

Two candidates drafted in response to the physics-rigour review (Lens 4). Both address specific gaps flagged as load-bearing.

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

## If you promote both

The `established / derived / contested / open` counts become: **1 established, 16 derived, 7 contested, 1 open**. All four buckets populated; the format's promise is honestly represented across the whole set.
