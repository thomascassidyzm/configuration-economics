# Proposition Tightening — P5, P10, P16, P19

Response to Lens 2's audit (§1 per-proposition table). Four propositions carry descriptive premises but arrive at normative conclusions via an un-flagged "must" / "should" / "require". Each can be reframed to preserve the claim's substance while removing the normative smuggle.

**Status:** Proposed rewrites. Each below shows the current version, the issue per Lens 2, and the proposed tightening. Low-risk if accepted wholesale; your voice may prefer different phrasings.

**Promotion cost:** 5 minutes per proposition. Copy the new logic block into `src/content/propositions.ts`, rebuild, ship.

---

## P5: `participation-limits`

### Current

```typescript
logic: {
  claim: 'Stable economies guarantee participation within physical limits rather than enforcing labour as a condition of survival.',
  premises: [
    'Participation is necessary for social stability.',
    'Energy and material availability are bounded.',
    'Deprivation is a blunt coordination mechanism.'
  ],
  conclusion: 'Participation should be unconditional within physical constraints; contribution can remain differentiated.'
}
```

### The issue (per Lens 2)

Premises are descriptive. Conclusion contains "should" — a normative slide. The claim also reads as "stable economies guarantee participation" — conflating a normative "should" with an empirical "do." A hostile reader hears: "you're asserting that economies *ought* to do X, dressed as a description that stable ones *do* X."

### Proposed tightening

```typescript
logic: {
  claim: 'Economies that maintain long-term social stability tend to decouple basic participation from labour performance.',
  premises: [
    'Long-term social stability depends on continued broad-based participation.',
    'Automation and energy constraints are decoupling production from human labour input.',
    'Economies that use deprivation as the primary participation-enforcement mechanism accumulate instability faster than the instability they prevent.'
  ],
  conclusion: 'Under physical constraint, economies that condition basic access on labour tend to accumulate instability; those that decouple access from labour tend to persist.',
  predictive: 'The correlation between coercive-labour arrangements and system instability will strengthen as automation and energy constraints both tighten.'
}
```

### What changed

- Claim reframed from prescriptive ("guarantee") to empirical ("tend to decouple").
- Premises tightened to be defensible claims about dynamics, not about moral requirements.
- Conclusion is a predictive statement about what economies that fail vs persist look like — descriptive, not normative.
- Added a `predictive` field to make the empirical commitment explicit and falsifiable.

The normative implication is still there — a reader who follows the argument will conclude that unconditional participation is a better design — but the proposition itself makes the descriptive case and lets the normative follow, rather than smuggling it in.

---

## P10: `stability-not-stasis`

### Current

```typescript
logic: {
  claim: 'Stability arises from adaptive capacity, not static preservation.',
  premises: [
    'Environments change over time.',
    'Fixed structures resist adjustment.',
    'Flexibility preserves function under variation.'
  ],
  conclusion: 'Systems must prioritise adaptability over preservation of form.'
}
```

### The issue (per Lens 2)

Conclusion uses "must" — a deontic/normative slide from purely descriptive premises. A reader hears "you're telling systems what they must do." This is a cheap tell; easy to tighten.

### Proposed tightening

```typescript
logic: {
  claim: 'Stability in living and social systems emerges from adaptive capacity rather than static preservation.',
  premises: [
    'Environments change over time at scales relevant to any persistent system.',
    'Systems with fixed structures resist adjustment and accumulate mismatch between form and conditions.',
    'Systems with adaptive capacity can preserve function while adjusting form.'
  ],
  conclusion: 'Systems that persist under changing conditions exhibit adaptive capacity; those that prioritise preservation of form become brittle.',
  predictive: 'Systems facing regime-level environmental or technological change will show differential persistence correlated with adaptive capacity.'
}
```

### What changed

- "Must prioritise" replaced with "exhibit" (descriptive) and a contrast class ("those that prioritise preservation... become brittle").
- Conclusion states what correlates with persistence, not what systems ought to do.
- Added `predictive` — a falsifiable claim about regime changes.

---

## P16: `money-as-signal`

### Current

```typescript
logic: {
  claim: 'Monetary signals do not guarantee physical correspondence.',
  premises: [
    'Prices abstract away material specifics.',
    'Feedback delays allow divergence.',
    'Markets optimise signals, not substrates.'
  ],
  conclusion: 'Money must be anchored to physical accounting to remain informative.'
}
```

### The issue (per Lens 2)

Same pattern: descriptive premises about signal-divergence, normative conclusion ("must be anchored"). The slide reads as "you're telling monetary systems what they must do."

Additionally: the claim "must be anchored" implies a single solution (physical anchoring) when the problem admits multiple solutions (physical anchoring, feedback correction, non-price coordination mechanisms, etc.).

### Proposed tightening

```typescript
logic: {
  claim: 'Monetary signals track physical reality only insofar as feedback mechanisms maintain their correspondence.',
  premises: [
    'Prices abstract away material specifics by design.',
    'Feedback delays between monetary and physical quantities allow divergence to accumulate.',
    'Market optimisation targets signals (prices) rather than substrates (physical stocks, flows, or sinks).'
  ],
  conclusion: 'Absent explicit feedback between monetary signals and physical accounting, monetary signals lose informativeness about physical state over time.',
  predictive: 'Economies whose monetary signals are detached from physical feedback mechanisms will show growing divergence between financial performance and physical performance — eventually resolving in either re-alignment or disorderly correction.'
}
```

### What changed

- "Must be anchored" replaced with "absent explicit feedback... lose informativeness" — a dynamical claim, not a prescriptive one.
- Claim made precise: signals track reality only under feedback; premises detail why.
- Conclusion is a statement about signal degradation under specific conditions, not a prescription.
- Added `predictive` — a falsifiable claim about divergence dynamics. This is actually testable via divergence metrics between real-economy and financial-economy indicators.

### Note on "informativeness"

This is a loaded word. Consider whether "informativeness" or "correspondence with physical state" or some other term is more precise. I'd go with "correspondence" on final rewrite but "informativeness" reads more clearly in the claim.

---

## P19: `transition-fragility`

### Current

```typescript
logic: {
  claim: 'System transitions amplify risk and error sensitivity.',
  premises: [
    'Redundancy declines during change.',
    'New configurations are immature.',
    'External shocks persist.'
  ],
  conclusion: 'Transitional periods require conservative assumptions.'
}
```

### The issue (per Lens 2)

Conclusion uses "require" — again, a prescriptive slide. The premises establish fragility; the conclusion prescribes behaviour. Same pattern, same fix.

### Proposed tightening

```typescript
logic: {
  claim: 'System transitions amplify error sensitivity and narrow the margin for correction.',
  premises: [
    'During transitions, redundancy in the outgoing configuration declines before the incoming configuration matures.',
    'New configurations have untested failure modes and smaller recovery buffers.',
    'Environmental and systemic shocks continue independently of transition state.'
  ],
  conclusion: 'Transitional periods are disproportionately sensitive to error, and trajectories through them show high sensitivity to initial conditions and early decisions.',
  predictive: 'Systems traversing transitions with the error-handling tolerances appropriate to steady-state operation fail at rates substantially higher than equivalent non-transitional failures.'
}
```

### What changed

- "Require conservative assumptions" replaced with "are disproportionately sensitive" — descriptive claim about dynamics.
- Added a claim about sensitivity to initial conditions — this is an interesting consequence that a reader can engage with.
- Premises refined: each now makes a specific structural point rather than a gesture.
- Added `predictive` — a falsifiable claim about failure-rate differential between transition-state and steady-state failures.

---

## Summary of the four rewrites

All four preserve the intended intuition while:

1. **Removing "should" / "must" / "require"** from conclusions, replacing with descriptive statements about dynamics, persistence, or correlation.
2. **Adding `predictive` fields** where the rewrites surface falsifiable empirical claims (new additions in P5, P10, P16, P19).
3. **Sharpening premises** to be defensible individually.

The normative implications the essay carries are not removed — they remain in the prose, in the section-level framing, and in the reader's inference from the propositions. But the proposition set itself becomes purely descriptive/predictive, which is what the format promises.

### Effect on the proposition set

Post-rewrite, the descriptive/normative audit changes:

| Before | After |
|---|---|
| P5: normative conclusion | P5: empirical/predictive |
| P10: normative conclusion | P10: empirical/predictive |
| P16: normative conclusion | P16: empirical/predictive |
| P19: normative conclusion | P19: empirical/predictive |

All four gain `predictive` fields, bringing the total count of predictive propositions from 3 (P1, P7, P22) to 7. This is meaningful — it increases the falsifiable content of the work substantially.

### Epistemic-status implications

Under the tightened versions:

- **P5** could stay `contested` — the empirical claim about labour-coercion and stability is defensible but empirical evidence is mixed.
- **P10** could be reclassified from `derived` to `derived` (no change; it's cleaner derivation now).
- **P16** could stay `derived`; the tightening makes the derivation cleaner.
- **P19** could stay `derived`; same.

No status reclassifications forced, but the P5 `contested` becomes more defensibly-contested (about the empirical pattern) rather than awkwardly-contested (about a normative claim).

---

## Promotion

Five minutes each. In `src/content/propositions.ts`, find each proposition and replace its `logic: { ... }` block with the version above. Verify with `npm run build`. Done.

No UI changes needed — the `/explore` page already renders any `predictive` field present.

## Consider deferring

P22 (`viable-objective`) was also flagged by Lens 2 as having definitional smuggle. That's a harder rewrite and interacts with the option space formalisation (see `drafts/option-space-formalisation.md`). Defer until after you've decided on the formalisation direction.

P3 (`value-option-space`) similarly has definitional smuggle. Defer for the same reason.

## Length note

~280 lines. Short because the four rewrites are short. The payoff-per-line is high — this is the cheapest draft to promote in the set.
