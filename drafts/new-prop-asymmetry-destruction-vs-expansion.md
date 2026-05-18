# Proposed proposition: asymmetry-of-option-space-change

Working title: **"Asymmetry of Option-Space Change"**

Draft for voice-review. Do not promote without Tom's pass.

---

## Why now

P22 (`viable-objective`) states a no-regret preservation criterion: reject moves that asymptotically empty R_living for any major class at any relevant horizon. As currently presented, that criterion reads as a stance — defensible, but it could be mistaken for a conservative temperament rather than a structural claim. The asymmetry proposition supplies the missing structural reason: option-space destruction is typically fast and local, while option-space expansion is typically slow and systemic, so a fast-local irreversible loss cannot reliably be offset by a slow-systemic uncertain gain. P9 (`prevention-over-repair`) and P11 (`time-asymmetry`) gesture at adjacent points — prevention is cheaper than repair; some losses don't reverse — but neither names the asymmetry as a property of *option-space change itself*. P19 (`transition-fragility`) addresses transitions, not the steady-state asymmetry. With this proposition explicit, the no-regret framing in P22 stops being a temperament and becomes a derived consequence: under structural asymmetry between destruction-rates and expansion-rates, expected-value maximisation systematically misprices irreversible loss, and no-regret becomes the operationally tighter rule.

---

## Proposed TypeScript object

Honest status call: **`derived`**. The asymmetry follows from P11 (time-asymmetry of losses vs gains) combined with the empirical observation that biological, geological, institutional, and ecological build-up processes occur on slower timescales than the breakdown processes that destroy them. It is not categorical — counter-examples exist (post-glacial recolonisation, internet adoption) — but the pattern is structural enough across the cases that matter for the viable objective that "derived" rather than "contested" is the honest fit. The proposition is contested at the edges (whether the asymmetry is universal or domain-specific) but the central claim — that for the configurations P22 protects, destruction outpaces expansion — survives the steelmen below.

```typescript
{
  id: 'asymmetry-of-option-space-change',
  title: 'Destruction Is Fast and Local; Expansion Is Slow and Systemic',
  epistemicStatus: 'derived',
  surface: `Option-space change is not symmetric in time or in scale.

A configuration that took millennia to assemble — a soil profile, a language community, a coral reef, a trust-bearing institution — can be dismantled in years or hours. The reverse rarely holds. The arrangements that expand future possibility are typically built slowly, through processes that integrate many small adjustments across many parts of a system. The arrangements that contract it are typically broken quickly, through processes that need only one well-placed failure.

This is not a moral observation. It is a structural one. Build-up processes are systemic and gradient-following; breakdown processes are local and gradient-releasing. The two have different characteristic rates because they are doing different physical work.

Where this asymmetry holds, expected-value reasoning misprices irreversible loss. A fast-local certain destruction cannot be reliably offset by a slow-systemic uncertain expansion. The no-regret stance is not conservatism by temperament; it is the operationally tighter rule under the asymmetry.`,
  logic: {
    claim: 'Destruction of option space is typically fast and local; expansion of option space is typically slow and systemic. This asymmetry is structural, not incidental, and it is what makes a no-regret preservation criterion operationally tighter than expected-value maximisation.',
    premises: [
      'Building configurations that expand option space requires the gradual accumulation and stabilisation of many interacting components (soil formation, language acquisition across a community, institutional trust, ecological succession).',
      'Destroying such configurations requires only the failure of a small number of load-bearing components or relationships, which then propagates.',
      'Physical, biological, and institutional build-up processes are gradient-following — they integrate against entropy and require continuous exergy input over their build-time. Breakdown processes are gradient-releasing — they convert stored order into dispersal and require only the removal of what was holding them together.',
      'Where build-time and break-time differ by orders of magnitude, expected-value averaging over symmetric distributions of outcomes systematically understates the cost of irreversible loss, because the recovery path is not available on a timescale that would balance the loss.'
    ],
    conclusion: 'Under the asymmetry, expected-value maximisation over option-space outcomes is structurally biased toward accepting fast-local losses against slow-systemic gains. A no-regret criterion that refuses moves which asymptotically empty R_living for any major class at any relevant horizon is the operationally tighter rule. P22 is a consequence of this asymmetry, not a separate temperament.',
    predictive: 'Domains where the asymmetry is sharpest (extinction, soil loss, institutional trust collapse, language extinction, antibiotic resistance, peatland drainage) will show the worst performance under expected-value optimisation and the largest no-regret advantage. Domains where expansion can be fast (technology adoption, post-disturbance ecological recolonisation, platform deployment) will show smaller no-regret advantage and the asymmetry must be argued empirically per case rather than assumed.'
  },
  layers: {
    coreClaim: 'It is faster to break option space than to build it. That asymmetry is what makes "first do no harm" tighter than "maximise expected value" in the cases that matter most.',
    formalDefinition: 'Let τ_break be the characteristic timescale over which a given configuration is degraded to a state of substantially reduced R_living, and τ_build the characteristic timescale over which a comparable configuration is assembled from a state of low R_living. For the configurations that P22 protects — soils, ecosystems, languages, institutions, atmospheric and oceanic sinks, biospheric integrity — τ_build / τ_break ≫ 1, typically by two to six orders of magnitude. Under this ratio, the expected option-space change from a symmetric bet on a fast-local destruction against a slow-systemic expansion is structurally negative once the horizon is set to the longer of the two timescales (which is the horizon P22 requires).',
    implications: 'Expected-value maximisation over option-space outcomes is not a neutral decision rule. Where τ_build / τ_break ≫ 1, it is a rule that systematically discounts the irreversibility of fast-local loss against the speculativeness of slow-systemic gain. No-regret preservation is not conservatism; it is the rule that prices the asymmetry correctly. P22 follows from this asymmetry rather than from a separate ethical premise. The proposition also reframes P9 (prevention-over-repair) at a different scale: prevention is structurally favoured not only because avoided costs are invisible to standard measures, but because the recovery path is on a timescale that does not balance the loss.',
    openQuestions: 'The asymmetry is not categorical. Some expansions are fast (industrial revolution, internet adoption, mRNA platform deployment, post-glacial recolonisation under favourable conditions). Some destructions are slow (desertification, salinisation, slow institutional drift). Whether τ_build / τ_break ≫ 1 is general enough to justify the no-regret rule across all P22-relevant domains, or whether it must be argued per case, remains open. The cases where expansion is fast tend to be cases where the substrate (a body of prior knowledge, a connected population, a permissive substrate condition) was already in place — so the apparent fast expansion is the final assembly step of a long build-up, not the build-up itself. This is a candidate resolution but it needs empirical work.'
  },
  revisedAt: '2026-05-18',
  linksTo: ['value-option-space', 'time-asymmetry', 'prevention-over-repair', 'transition-fragility', 'viable-objective', 'option-space-as-chess-moves']
}
```

---

## Examples (for the implications layer)

Honest about ratios. Rates are order-of-magnitude where the underlying processes are themselves only known to order of magnitude. The point is not the exact number but the consistency of the asymmetry across very different domains.

### Extinction events
- **Destruction rate**: a species can be eliminated in years to decades under sustained pressure (passenger pigeon: ~50 years from billions to extinct; many recent vertebrate losses on similar timescales).
- **Restoration rate**: speciation timescales are 10^5 to 10^6 years for new vertebrate species; functional ecological replacement (a different species filling a similar role) is faster but still 10^3 to 10^4 years and not always available.
- **Irreversibility horizon**: effectively permanent on any horizon P22 would set. Loss is fast; restoration is not on the menu.

### Soil mineral depletion
- **Destruction rate**: substantial topsoil loss in years to decades under industrial tillage; mineral depletion in similar timeframes under continuous monoculture without replenishment.
- **Restoration rate**: deep fertile topsoil formation is roughly 10^2 to 10^4 years per centimetre under natural conditions; agroecological rebuild of degraded soil is faster (decades) but does not reconstitute the deep profile.
- **Irreversibility horizon**: practically irreversible on any economically meaningful horizon, though partially restorable on multi-generational ones.

### Institutional trust collapse
- **Destruction rate**: trust in a specific institution can be substantially damaged in single events (months) and broadly degraded across years.
- **Restoration rate**: rebuilding institutional trust is empirically slow — decades, often longer, and not reliably achievable.
- **Irreversibility horizon**: not categorically irreversible, but the rebuild path is uncertain enough that expected-value reasoning treating a 50% chance of restoration in 50 years as offsetting a present loss is dishonest about the actual distribution.

### Language extinction
- **Destruction rate**: a language with no intergenerational transmission can lose its last fluent speakers in one generation.
- **Restoration rate**: revival from documentation is possible (Hebrew, Wampanoag, Cornish to varying degrees) but takes generations and never reconstitutes the original speech community.
- **Irreversibility horizon**: revivable in form, not in continuity. The configuration that is lost — a living community of speakers with embedded oral tradition — is not the configuration that revival produces.

### Antibiotic resistance
- **Destruction rate**: effective antibiotic-susceptible bacterial populations are degraded over years to decades under sustained selective pressure.
- **Restoration rate**: re-evolution of susceptibility under removed pressure is possible but slow and incomplete; new antibiotic discovery has empirically slowed.
- **Irreversibility horizon**: the option of treating a given infection with a given drug, once lost at population scale, is not restored on any horizon useful to current patients.

### Peatland drainage
- **Destruction rate**: drainage and oxidation of peat releases stored carbon over years to decades; the bog ecology collapses on similar timescales.
- **Restoration rate**: peat accumulation is roughly 1 mm per year under favourable conditions; full hydrological and ecological restoration takes centuries to millennia.
- **Irreversibility horizon**: bog *function* (water table, carbon storage) can be restored in decades to centuries with active rewetting. Bog *configuration* (deep peat profile, specific moss community, accumulated carbon) takes much longer.

### Counter-examples — be honest

The asymmetry is not categorical. Three classes of case where expansion is fast:

- **Post-glacial recolonisation**. After the last glacial maximum, forests advanced across deglaciated land at kilometres per decade. Fast by any measure. But: the substrate (soil, climate, seed dispersers, a refugium nearby with intact biota) was already in place. The expansion was the final assembly step, not the build-up. The biota that recolonised had been built over the prior glacial-interglacial cycles.

- **Internet adoption**. Roughly four decades from research network to majority adoption of basic internet access. Fast at civilisational timescales. But: the substrate (electrification, computing hardware, telecoms infrastructure, literacy, regulatory permissiveness) had taken a century or more to assemble. The fast expansion rode on a slow build-up.

- **mRNA vaccine platform**. Years from concept to deployment, at planetary scale, during the pandemic. Genuinely fast. But: the underlying technology (lipid nanoparticle delivery, in vitro transcription, sequence design tools, regulatory infrastructure, manufacturing capacity) had taken three decades of foundational work.

The pattern across the counter-examples: apparent fast expansion is the final assembly step of a long, distributed build-up. The substrate is what is slow; the visible expansion is the integration step that becomes possible once the substrate is in place. This is a candidate structural resolution but it is not a proof — some genuinely fast expansions of option space may exist that do not fit this pattern, and the proposition should be honest that the empirical question is live.

For P22's purposes the asymmetry holds where it matters most: where the configuration being protected is itself a substrate that took long build-up, the loss of that substrate cannot be reliably offset by a faster downstream gain elsewhere, because the gain is conditional on a substrate that is not in question.

---

## Lineage notes (for Tom)

Honest about what each prior author actually claimed.

### Holling's adaptive cycle (resilience theory)
Holling's r-K-Ω-α model describes the four phases: rapid growth (r), conservation (K), release (Ω), and reorganisation (α). The release phase (Ω) is fast; the reorganisation and growth phases together (α → r → K) are slow. This is *exactly* the asymmetry, observed empirically in ecological systems and extended by Holling and Gunderson into the "panarchy" framing for nested adaptive cycles. The asymmetry-of-option-space proposition can cite Holling directly: the release-reorganisation rate asymmetry is the underlying pattern. The proposition's contribution over Holling is that it ties the asymmetry to a structural property of build-up vs breakdown processes and uses it to derive a decision rule (no-regret) rather than just describing the cycle.

### Walker & Salt (Resilience Thinking, 2006)
Walker and Salt extend Holling into management practice. Their central claim is that systems have *thresholds* (regime shifts) and that once crossed, the system enters a new basin of attraction from which return is slow, costly, or impossible. This is the asymmetry expressed as a basin-of-attraction property. The proposition is compatible with Walker & Salt's framing and can cite it for the management literature it has generated. Their work does not formalise the τ_build / τ_break ratio explicitly but the worked cases (Goulburn-Broken catchment, Caribbean reefs, Florida Everglades) all instantiate it.

### Taleb on fragility / antifragility
Be careful. Taleb's frame is different and the convergence is partial.

Taleb's *fragility* is the property of systems that suffer disproportionately from large negative shocks (concave payoff under volatility). *Antifragility* is the opposite — systems that benefit from volatility (convex payoff). The asymmetry Taleb names is *between payoff shapes under uncertainty*, not between build-up and breakdown timescales.

Convergence: both frames identify cases where standard expected-value reasoning under-prices tail losses. Both motivate something like a precautionary rule. The recommended "do not blow up" stance in Taleb's *via negativa* maps onto P22's no-regret.

Divergence: Taleb's argument is about the *shape* of the payoff function under uncertainty, not about *rates* of build-up vs breakdown. A system can be Taleb-fragile without exhibiting build-up/breakdown asymmetry (a leveraged bet with symmetric build and break rates but convex losses). It can exhibit build-up/breakdown asymmetry without being Taleb-fragile in the strict sense (a slowly-built, slowly-broken configuration). The asymmetry-of-option-space proposition is closer to Holling than to Taleb. Cite Taleb for the precautionary motivation; don't claim he made this argument.

### Daly on uneconomic growth
Daly's *uneconomic growth* names the condition where additional throughput reduces welfare on net, once externalities and depletion are properly accounted. His argument rests on the empirical claim that the marginal benefit of additional growth has fallen below the marginal cost in much of the developed world. The asymmetry proposition is compatible with Daly — uneconomic growth is partly a consequence of fast destruction (of ecological and social substrate) outpacing slow expansion (of welfare-relevant configurations) — but Daly does not state the rate-asymmetry explicitly. Cite him for the ecological-economics lineage and the general stance; the rate-asymmetry argument is the proposition's own.

### Aubin's viability theory
Already cited in CE (P22, P26, observer-relative draft). Aubin formalises admissible trajectories under non-empty constraint sets — a trajectory is viable iff it keeps the constraint set non-empty for all relevant times. The asymmetry proposition relates to viability theory in a specific way: it identifies *why* keeping the constraint set non-empty is asymmetrically important. Loss-of-viability is fast and not recoverable on viability-theory-relevant timescales; gain-of-viability is slow and conditional. The proposition strengthens the case for viability-theoretic decision rules over optimisation rules by explaining the structural reason they outperform. Already in the framework's lineage; deepens rather than adds to it.

---

## Where it could go wrong (steelman against)

### Objection 1: "Expansion isn't always slow — industrial revolution, internet, mRNA"
Addressed in the counter-examples section. The candidate resolution: apparent fast expansions ride on slow substrate build-up. The fast step is the final integration, not the build-up itself. The proposition's surface text should be careful to say *typically* fast/local for destruction and *typically* slow/systemic for expansion, not *always*. Where the asymmetry holds, the no-regret rule applies. Where it does not, expected-value reasoning may be defensible — but it must be argued per case, not assumed.

This concession does not weaken P22, because P22 operates on the configurations that *are* the substrate (soils, ecosystems, languages, institutions, biospheric sinks). For those, the asymmetry holds robustly. P22 does not claim no fast expansions ever happen; it claims that fast-local destruction of a slow-systemic substrate cannot reliably be offset by another slow-systemic expansion elsewhere.

### Objection 2: "Destruction isn't always fast — desertification, salinisation"
True. Some destructions are slow. The asymmetry as stated is about *typical* rates, not exclusive ones. Slow destruction does not invalidate the proposition; it complicates the picture for any particular case. The proposition's predictive claim already concedes this: domains where the asymmetry is sharpest will show the largest no-regret advantage; domains where it is muted must be argued empirically.

Note also that many "slow" destructions are in fact slow build-ups of conditions that *enable* a fast destruction (salinisation gradually undermining a water table until a fast crop failure cascade). This is the same pattern as the counter-examples — the visible event is fast; the substrate change is slow. The asymmetry shows up at multiple levels.

### Objection 3: "The asymmetry might be empirical, not structural"
This is the strongest objection. If the asymmetry is a contingent fact about the particular substrates we care about (biological, geological, institutional) rather than a property of build-up vs breakdown processes in general, the proposition's structural framing is overreach.

Honest response: the structural framing is a conjecture, not a theorem. The candidate structural reason — that build-up integrates against entropy and requires continuous exergy over its build-time, while breakdown releases stored order and needs only removal of constraints — is consistent with the empirical pattern but does not prove it. The proposition should be honest that the structural claim is the most parsimonious explanation, not the only possible one. "Derived" rather than "established" reflects this. If a future analysis shows the asymmetry is purely empirical and not structural, the proposition still does the work P22 needs of it — the no-regret rule applies wherever the empirical asymmetry holds — but its lineage status changes.

### Objection 4: "Expected-value reasoning can be fixed with proper accounting for irreversibility"
True in principle. A sufficiently sophisticated expected-value framework that prices irreversibility correctly, weights tail outcomes appropriately, and uses horizons matched to recovery timescales would converge on similar verdicts to no-regret. The objection is that the asymmetry argument does not require abandoning expected-value; it requires implementing it better.

Concede the point. The proposition's claim is operational rather than categorical. Under realistic conditions where expected-value frameworks compress horizons, discount irreversible losses, and average across symmetric distributions, the no-regret rule produces better verdicts at lower cognitive overhead. If a well-implemented expected-value framework also produces the right verdicts, the asymmetry argument is consistent with that. The proposition does not say expected-value is wrong in principle; it says no-regret is operationally tighter under the asymmetry, given the failure modes that expected-value frameworks actually exhibit.

### Objection 5: "The proposition smuggles in the no-regret rule as an obvious consequence — but reasonable people accept slow-systemic certain gains over fast-local certain losses all the time"
True, and important. The asymmetry does not on its own license refusing every fast-local loss. A vaccine programme involves fast-local costs (rare adverse events) for slow-systemic gains (population immunity); we accept it because the asymmetry of *magnitudes* favours the gain even under the asymmetry of *rates*.

The proposition's claim is narrower: where the fast-local loss is *irreversible* and the slow-systemic gain is *uncertain*, the asymmetry of rates compounds the asymmetry of certainty in a way that breaks symmetric expected-value reasoning. The no-regret rule applies specifically to irreversible-loss cases, not to all fast-vs-slow tradeoffs. P22 reflects this — it rejects moves that *asymptotically empty* R_living, not moves that merely impose fast-local costs.

The surface text should make this scope clear. Without it, the proposition reads as licensing universal precaution, which is not what it says and not what P22 needs.

---

## Voice match check

Existing — `time-asymmetry` (P11) surface text:

> Economic decisions are often discussed as if time were neutral. Costs and benefits are discounted, averaged, or projected forward as though losses and gains could be freely exchanged across decades. Yet many changes do not reverse. Forests regrow slowly, if at all. Species vanish permanently. Skills atrophy. Trust erodes quietly. Time does not treat all actions equally. Some close doors forever.

Proposed — `asymmetry-of-option-space-change` surface text (opening):

> Option-space change is not symmetric in time or in scale. A configuration that took millennia to assemble — a soil profile, a language community, a coral reef, a trust-bearing institution — can be dismantled in years or hours. The reverse rarely holds. The arrangements that expand future possibility are typically built slowly, through processes that integrate many small adjustments across many parts of a system. The arrangements that contract it are typically broken quickly, through processes that need only one well-placed failure.

Same register: calm, declarative, restrained, concrete examples in apposition, the structural claim stated as observation rather than urgency. The asymmetry proposition extends P11's directional arrow with a quantified ratio, but it stays in the same voice. It does not dramatise. The closing of P11 ("Some close doors forever") and the closing of the proposed text ("the no-regret stance is not conservatism by temperament; it is the operationally tighter rule under the asymmetry") both land the structural point without raising the volume.

---

## Section-mapping suggestion (for if Tom promotes)

If this proposition lands, sections to consider for `SECTION_PROPOSITIONS`:
- Wherever `time-asymmetry` (P11) currently appears — this proposition extends it.
- Wherever `viable-objective` (P22) currently appears — this proposition is the structural justification for the no-regret form.
- Wherever `transition-fragility` (P19) currently appears — the rate asymmetry compounds during transitions when buffers are thin.

Status mapping if promoted: would land in `derived`. Current v0.6 counts (1 established / 18 derived / 7 contested / 1 open) would become 1 / 19 / 7 / 1.

---

## Judgment calls for Tom

1. **Status: `derived` or `contested`?** I called `derived` because the asymmetry follows from established sub-claims (P11 + empirical build-up vs breakdown timescales) for the configurations P22 protects. The structural-vs-empirical question (Objection 3) could justify `contested`. Genuine call — Tom decides.
2. **Title.** "Destruction Is Fast and Local; Expansion Is Slow and Systemic" is descriptive but long. Alternatives: "Asymmetry of Option-Space Change" (matches working title, less surface clarity), "The Build / Break Asymmetry" (snappier, may read as too punchy for the register). Tom's call.
3. **τ_build / τ_break notation.** The formal definition introduces timescale ratios as the operational form of the asymmetry. This is the smallest formal addition that does the work; alternatives (information-theoretic, exergy-cost-of-restoration) would be more aligned with the rest of the framework but would require more setup. I went with timescales for legibility. Open to substitution if Tom prefers an exergy framing — the substantive content survives the swap.
4. **Predator-prey / disturbance ecology.** Some fast destructions (a forest fire, a predation event) are *part of* the build-up cycle and the asymmetry framing risks reading them as universally bad. The proposition's scope is P22-relevant destruction (asymptotic emptying of R_living for a major class) rather than the local releases that are themselves part of the adaptive cycle. The surface text doesn't currently make this distinction. If it muddies the reading, worth adding a sentence; if it doesn't, leave it.
