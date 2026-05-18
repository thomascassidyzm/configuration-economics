# Page scaffold: /applications/moves

Captured 2026-05-18 as a draft scaffold for a new page demonstrating the local Δω rule operating on real-world moves. Sits alongside `observer-relative-option-space-and-chess-moves.md` and `polychess-as-teaching-device.md`; this is the *applications* counterpart to those two — where the theory gets used on cases that bite back.

**Status:** Draft scaffold only. Not the final page. Voice review needed before any of it lands as canonical, and at least one move-analysis probably needs an empirical-literature pass before promotion. Lives in `drafts/`; do not promote without review.

**Format on promotion:** A new Astro page at `src/pages/applications/moves.astro`, mirroring `src/pages/research-frontier.astro`'s shape. Possibly siblings to follow at `/applications/<other>` for other framework operations (state-comparison, observer-class disagreement worked examples, etc.).

---

## Page intent

This page demonstrates that the local Δω rule on R_living(C, B, T) — established in P26 (`option-space-as-chess-moves`) and licensed by P23 (`option-space-measurability`)'s global/local split — actually decides things. It is not a policy programme. Each worked move gets the same structured analysis, and the honest output sometimes is *this move's Δω is ambiguous and here is why* — that demonstrates the rule's edges, which is as valuable as a clean answer. The page exists so a reader can verify, case by case, that the framework's central decision procedure has traction on real configuration-changes without collapsing into either feel-good environmentalism or technocratic dismissal.

---

## Proposed page structure

Mirror `/research-frontier`'s shape — same nav, same dark theme, same typography, same `<main>` width (~820px), same use of left-bordered list items per case. Concrete sections:

1. **Top nav** — identical to research-frontier (home, overview, essay, explore, version, build). Add `/applications/moves` link to other top navs once promoted.
2. **Page header** — `<h1>Moves</h1>`, subtitle "The framework, in operation", note "Worked examples of the local Δω rule on R_living. The page demonstrates the decision procedure; the page is not a policy programme."
3. **Intro block** — three short paragraphs explaining what's being demonstrated, why move-evaluation (not state-comparison, see P23), and that an ambiguous verdict is a legitimate output of the rule, not a failure of it. Inline cite P26, P22, P25.
4. **How to read a move** — a short legend explaining the analysis template's fields (one paragraph). Treat it as a key, not pedagogy.
5. **Worked moves** — the list of cases. Each rendered as a `<section>` with the per-move template below. Same visual rhythm as `frontier-item` in `/research-frontier`. Verdict badge styled like a `status` badge (degrading / preserving / expanding / ambiguous) — four colours, parallel to the four epistemic-status colours but distinct enough not to confuse.
6. **Where this rule runs out** — honest limits section, before the footer. Cited inline to the same propositions. Not a list of "future work" — a list of cases where move-level Δω genuinely fails to discharge the decision.
7. **Footer** — link back to overview, essay, explore, research-frontier. Optional link to a future `/applications` index if more application pages get drafted.

Astro file lives at `src/pages/applications/moves.astro`. Don't create it yet — this is scaffold-only. The visual implementation is for Tom; mirror `research-frontier.astro` line-for-line where structure allows.

---

## Per-move analysis template

Each move gets the following fields, in this order, rendered consistently across the page. Where a field genuinely cannot be filled with conviction, write the struggle into the field rather than fudging an answer.

- **Move name** — short label.
- **Brief description** — one to two sentences naming the configuration-change concretely. What is actually being done, by whom, at what scale.
- **Pre-move R_living estimate (qualitative)** — what classes of life depend on what configurations *now*. Not a number; a sketch of the reachable set as it stands.
- **Post-move R_living estimate (qualitative)** — what classes of life depend on what configurations *after the move propagates*. What's added, what's foreclosed, what's narrowed.
- **Irreversibility horizon** — years / decades / centuries / millennia / permanent. The honest scale at which the move's effects can be undone, if at all.
- **Who bears the costs** — which observer-classes (per P25) see R_living contract.
- **Who bears the benefits** — which observer-classes see R_living expand.
- **What evidence would change the assessment** — the empirical or theoretical findings that would flip the verdict. Concrete, falsifiable where possible.
- **Suggested Δω directional verdict** — one of *degrading*, *preserving*, *expanding*, or *ambiguous*. Per P26, this is a directional comparison, not a magnitude.
- **One-paragraph reasoning** — why the rule produces that verdict. Inline citations to the propositions the case leans on. If the verdict is ambiguous, the paragraph explains which features of the move drive the ambiguity, not which the analyst's preferences are.

---

## Worked moves

Six cases, chosen to span the four verdicts and to stress-test the rule. Two clearly degrading, one clearly preserving, one clearly expanding, two ambiguous. Selection criteria: each move is a real and ongoing configuration-change with a documentable evidence base, and at least two cases produce verdicts that don't track the conventional sustainability consensus — so the rule visibly does its own work rather than ratifying priors.

---

### Move 1 — Continued expansion of fossil-fuel extraction infrastructure

**Brief description.** New oil, gas, and coal extraction projects (licensing, pipelines, LNG terminals, refineries) on a scale consistent with current trajectories — i.e. the infrastructure commitments made by major producers and importers between roughly 2024 and 2030. The configuration-change is the lock-in of physical and financial capital with multi-decade amortisation horizons.

**Pre-move R_living estimate.** A biosphere already operating near several planetary boundaries (P28 `binding-constraint`: atmospheric and oceanic sinks are the close walls, not solar influx). R_living for most major classes of life is bounded by climate stability within roughly the Holocene envelope, on which functional diversity and current ecosystem geometry depend.

**Post-move R_living estimate.** Additional cumulative emissions and longer use-lives for the marginal infrastructure. Probability mass shifts toward warming trajectories above the thresholds at which coral, low-altitude polar, montane, and major-river-delta ecosystems lose their current configurations. R_living for those classes contracts toward zero on multi-decade horizons; R_living for most other classes narrows by removing the lower-warming branches of the reachable set.

**Irreversibility horizon.** Centuries to millennia for the climatic effects (CO₂ residence time, ice-sheet hysteresis). Decades for the infrastructure-financial lock-in.

**Who bears the costs.** Most major classes of life, with steepest loss to ecosystems already at the edge of their climatic envelope. Human communities in low-lying coastal and arid-margin regions disproportionately. Future generations who inherit a configuration with permanently narrower R_living (P11 `time-asymmetry`).

**Who bears the benefits.** Existing fossil-capital holders, in financial terms, over the lock-in window. Some short-horizon energy-security observer-classes. Nothing at category level for life-persisting observers (P25).

**What evidence would change the assessment.** A demonstrated, scaled atmospheric-sink technology with no net-additional planetary boundary cost — i.e. a substitution for the absorption-side invariant flagged in P14 (`substitution-limits`). Not promises; demonstrated. Or evidence that current emissions trajectories do not in fact narrow R_living for the named ecosystem classes — the IPCC's own confidence intervals would have to shift substantially. Neither is currently in evidence.

**Verdict.** *Degrading.*

**Reasoning.** This is the textbook case for an unambiguous Δω-negative verdict. The move adds configurations to the reachable set (more energy throughput at the financial-board score, per `polychess-as-teaching-device.md` Layer 3) while subtracting them at every longer-horizon, larger-class-of-life board it is also being played on. P22's no-regret form rejects moves that asymptotically empty R_living for some major class at some relevant horizon; this move does that for several. The verdict survives observer-relativity (P25): even adopting human-only observer-classes, the long-horizon humans lose more than the short-horizon humans gain. The rule produces the conventional environmental verdict here — but it produces it by the framework's own logic, not by importing one.

---

### Move 2 — Strengthened antibiotic stewardship across human and veterinary use

**Brief description.** Coordinated reduction in non-therapeutic antibiotic use (livestock prophylaxis, mild human prescription overuse), combined with stewardship protocols that preserve last-line antibiotics for genuinely necessary cases. Configuration-change is in the prescribing rules, agricultural practice, and the surveillance infrastructure that monitors resistance.

**Pre-move R_living estimate.** A current configuration in which several pathogen lineages are accumulating resistance to multiple antibiotic classes at a rate faster than new compounds are reaching clinical use. R_living for the medical-intervention-dependent classes of human life (post-surgical recovery, immunocompromised populations, neonatal medicine) currently includes survival pathways that depend on antibiotic efficacy continuing to exist as a configuration.

**Post-move R_living estimate.** Slower drift toward broad-spectrum resistance. Antibiotic efficacy preserved as a usable configuration for longer — possibly long enough for replacement therapies (phages, narrower-spectrum agents) to mature. R_living for the affected human-life classes is preserved that would otherwise contract.

**Irreversibility horizon.** Decades for resistance evolution; the lost configurations are not easily restorable once antibiotic classes are exhausted.

**Who bears the costs.** Livestock producers operating on tight margins where prophylactic antibiotics substitute for housing or husbandry capital. Some short-horizon human patients whose prescriptions are narrowed.

**Who bears the benefits.** Future patients in all the affected human-life classes. Hospital systems whose capacity to perform routine high-risk procedures continues to exist. Animal populations themselves, at category level, by reducing selection pressure for resistance reservoirs.

**What evidence would change the assessment.** A demonstrated, broadly applicable replacement for the antibiotic configuration (e.g. mature, regulated phage therapy at clinical scale) that materially reduces dependence on the current antibiotic classes within the decision horizon. This would weaken the case for stewardship, not eliminate it.

**Verdict.** *Preserving.*

**Reasoning.** A configuration whose efficacy depends on bounded use is being protected from a tragedy-of-the-commons collapse. P9 (`prevention-over-repair`) is doing the load-bearing work: the move's value is in the configurations it keeps reachable rather than in any new configurations it creates. P8 (`care-as-configuration`) directly applies — stewardship is configuration-maintenance, not sentiment. The rule's verdict matches the medical-consensus verdict, again by the framework's own logic. Worth keeping in the page partly because it shows the rule isn't only useful when it disagrees with consensus.

---

### Move 3 — Stratospheric aerosol injection (SAI) at deployment scale

**Brief description.** Sustained release of reflective aerosols (likely sulfate-based) into the stratosphere at a scale sufficient to offset roughly 0.5–1.5°C of warming, maintained over decades. The configuration-change is the introduction of an ongoing planetary-scale operation whose cessation reverses the cooling effect rapidly.

**Pre-move R_living estimate.** A biosphere on a warming trajectory whose upper bound depends on emissions decisions made over the same window. R_living for several ecosystem classes contracts as warming proceeds; SAI is being evaluated as a move that could preserve some of that R_living temporarily.

**Post-move R_living estimate.** Honestly hard to estimate cleanly. Two things happen at once: (a) some currently-contracting R_living is held open (coral, polar, montane systems get more time), and (b) a new dependency is introduced — the biosphere now sits inside a configuration that requires *continued operation of the SAI programme* to remain in its post-move state. Cessation produces termination shock with steep rebound warming. Side effects (regional precipitation pattern changes, ozone interactions, stratospheric chemistry) further narrow R_living for classes whose configurations depend on regional rainfall or stratospheric ozone.

**Irreversibility horizon.** The aerosols themselves wash out in years; the warming they masked is centuries-scale; the configuration-dependence — the biosphere now requiring the programme — is open-ended for as long as the underlying CO₂ remains elevated.

**Who bears the costs.** Regions affected by altered precipitation patterns (monsoon-dependent agriculture in particular). Future generations who inherit the dependency. Observer-classes whose R_living depends on stratospheric chemistry remaining within its current envelope.

**Who bears the benefits.** Ecosystems whose climatic envelope is preserved during the operation window. Short-to-medium-horizon human populations in regions where the warming-offset matters more than the regional-pattern cost.

**What evidence would change the assessment.** Robust regional-pattern modelling showing precipitation effects are smaller than current ensembles suggest. Demonstrated parallel decarbonisation at a rate that converts SAI from "permanent dependency" to "bridging measure". Evidence that termination-shock risk can be governed institutionally over centuries — which is itself a strong claim about coordination-wealth (P17) persistence.

**Verdict.** *Ambiguous.*

**Reasoning.** This is the case that demonstrates the rule's edge. The move expands R_living on some boards (per `polychess-as-teaching-device.md` Layer 3 — climate-sensitive ecosystem persistence) and contracts it on others (regional precipitation, dependency on continued operation across centuries). Crucially the *coupling* matters — the new configuration is one that asymptotically requires continued maintenance; cessation produces collapse. P19 (`transition-fragility`) and P10 (`stability-not-stasis`) cut against it: the post-move configuration is structurally less stable than the pre-move one because it depends on perpetual external work. P22's no-regret form is *almost but not quite* triggered — the move doesn't obviously empty R_living for some major class at some relevant horizon, but it does introduce dependence-relations whose own collapse modes would. The honest output of the rule is that this is not a move the framework either endorses or rejects on local Δω evaluation alone; it requires a judgement about the *probability of the dependency being maintained* over the relevant horizon, which is a coordination-wealth question rather than a physical-Δω question. Cases like this are why the page exists.

---

### Move 4 — Subsidies for measured soil-regenerative agriculture

**Brief description.** Public payments to farmers, conditioned on documented practices (cover-cropping, reduced tillage, integrated grazing rotations, measured soil organic carbon over time) that rebuild topsoil structure and microbial communities on agricultural land. Configuration-change is in incentive structure plus the slow, decade-scale rebuild of the underlying soil substrate.

**Pre-move R_living estimate.** Agricultural land currently in net-degrading configuration in most of the world's major breadbaskets — topsoil loss exceeding regeneration, organic matter declining, increasing dependence on synthetic inputs (P14 `substitution-limits` applies: topsoil is one of the named bounded invariants). R_living for agriculturally-dependent classes of human life is presently maintained by drawing down a stock that does not replenish on relevant horizons.

**Post-move R_living estimate.** Slow rebuild of topsoil structure on enrolled land, with knock-on effects: increased water retention, microbial diversity, carbon sequestration as side-product. R_living expands for classes that depend on soil persistence (most agriculturally-dependent classes), and also for some pollinator and soil-fauna classes whose configurations recover with reduced disturbance.

**Irreversibility horizon.** Decades to centuries on the build side (soil organic matter accumulates slowly). The configuration-change itself is reversible — policy can be withdrawn — but the gains, once present, are themselves durable.

**Who bears the costs.** Public budgets, in fiscal terms. Short-horizon yield in some transition years, partially offset by reduced input costs.

**Who bears the benefits.** Long-horizon humans dependent on continued agricultural productivity. Soil-fauna and pollinator categories. Watersheds downstream of enrolled land (reduced run-off, sediment, fertiliser export). The atmosphere, modestly, as carbon sink-side bonus.

**What evidence would change the assessment.** Demonstration that the practice-bundle does not in fact rebuild soil at the rates claimed in the better field-trial literature. Or that the enrolment cost displaces other interventions with larger Δω (an opportunity-cost argument, not a Δω-on-this-move argument). Neither is currently in evidence at scale.

**Verdict.** *Expanding.*

**Reasoning.** This is a move that adds configurations to R_living rather than merely preserving what's there. The rebuilt soil substrate is a higher-AI configuration than the depleted one (echoes the ω₃ direction in `option-space-formalisation.md`); the practices also expand R_living for the non-agricultural classes whose configurations were being contracted by the prior intensification. P9 (`prevention-over-repair`) and P8 (`care-as-configuration`) both apply, but the move actually overshoots — it doesn't only prevent loss, it *increases* the size of the reachable set. The rule produces an unambiguous verdict here, and the verdict is rare enough (*expanding*, not just *preserving*) to be worth showing.

---

### Move 5 — Extension of copyright term to life + 95 years (or beyond)

**Brief description.** Statutory extension of copyright terms beyond the already-long current durations, retroactively where possible, on the standard maximalist pattern of the past several decades. Configuration-change is in the legal-institutional structure governing which cultural-and-knowledge configurations are reusable, derivable, and remixable.

**Pre-move R_living estimate.** A cultural-and-knowledge configuration in which works enter the public domain on a delayed but eventual schedule. R_living for cultural-and-coordination observer-classes (per P17 `coordination-wealth`) currently includes the reachable set of derivative, educational, remixed, archived, and translated configurations that depend on public-domain access.

**Post-move R_living estimate.** That reachable set contracts. Derivative configurations not made because rights can't be cleared. Orphan works whose rights-holders cannot be located but whose use is legally exposed. Educational and archival configurations that decay because no party has both the right and the incentive to maintain them. The R_living of the *cultural* class of life — the configurations that propagate distinction-making across generations — narrows for the duration of the extension and, crucially, for the works that fall out of preservation entirely during it.

**Irreversibility horizon.** Decades for the policy itself; permanent for the works lost to non-preservation during the extension window. Historical precedent: substantial volumes of early-20th-century film, recorded music, and printed material are now physically lost because no party had both rights and incentive to preserve them during their long extended terms.

**Who bears the costs.** Cultural-and-coordination observer-classes broadly. Future generations who inherit a narrower preserved-cultural-substrate. Educators, translators, archivists, derivative creators, and the publics they serve.

**Who bears the benefits.** Existing rights-holders during the extension window, financially. A small minority of works generate meaningful residual income that far out; the modal effect is non-use.

**What evidence would change the assessment.** A demonstrated, robust mechanism by which longer terms increase the rate at which valuable cultural configurations get created or preserved. The empirical economics literature (Heald, Pollock, the Hargreaves review and successors) currently runs the other way; the move would need that body of work to be substantially wrong.

**Verdict.** *Degrading.*

**Reasoning.** This is the case that demonstrates the rule biting at the coordination-wealth level (P17), not the biophysical level. The mistake of reading CE as exclusively about ecosystems falls away here: the framework treats cultural-and-knowledge configurations as part of R_living because they are part of how life-persisting observers maintain themselves and make distinctions (P25; cultural transmission is configuration-maintenance per P8). The move's Δω is negative not because it consumes exergy but because it contracts the reachable set of derivable, preservable, recombinable cultural configurations. P18 (`legibility-truth-tradeoff`) lurks behind it too — the configuration-loss is invisible in the metrics that drove the extension. Including this case prevents the page from looking like a list of environmental policies.

---

### Move 6 — Biodiversity offsetting as a permitting mechanism for habitat loss

**Brief description.** A regulatory configuration in which a development project that destroys habitat at site A is permitted on condition of creating, restoring, or protecting "equivalent" habitat at site B. Configuration-change is in the licensing rule that makes destruction-with-offset a normal route to permission.

**Pre-move R_living estimate.** A habitat-and-species configuration in which destruction at site A would, without the rule, either not be permitted or require a more substantial showing. R_living for the affected species and ecological-community classes currently depends on site A's specific configuration — soil, hydrology, microbial communities, mycorrhizal networks, age-class structure, embeddedness in the surrounding landscape — much of which is not readily reproducible at site B (P14 `substitution-limits`; P10 `stability-not-stasis` applied to ecosystems).

**Post-move R_living estimate.** Honestly, this is the empirically interesting case. The literature on offset *outcomes* (zu Ermgassen and collaborators on no-net-loss; Maron and others; UK Defra and Australian state reviews) is consistently worse than the literature on offset *designs* suggests it should be. Created or restored habitats routinely fail to reach equivalence within the regulatory monitoring horizons; "protection" offsets that prevent loss that would not have happened anyway add no R_living at all (the additionality problem). The post-move R_living, evaluated against the counterfactual *of not granting the permit*, is on average smaller than the pre-move R_living. Evaluated against the counterfactual *of granting the permit with no offset*, it is marginally larger. Both counterfactuals are real; which one to take as the comparison is a framework-internal question.

**Irreversibility horizon.** Decades to centuries for the destroyed configurations at site A; the offset rule itself is reversible policy. The decision-precedent is institutionally sticky.

**Who bears the costs.** The species and ecological communities specific to site A, where local extinction or community collapse is rarely fully compensated. Long-horizon ecological-integrity observer-classes. The future ecological-economics community whose evidence base accumulates against the practice while regulators continue to permit it.

**Who bears the benefits.** The developer at site A, immediately. The regulator, in administrative-legibility terms (the rule makes permit decisions more rule-bound, less discretionary). Some restored sites that genuinely succeed and constitute net additions where they would not otherwise exist.

**What evidence would change the assessment.** A monitoring-and-enforcement regime that demonstrably achieves ecological equivalence within tractable horizons, with additionality verified case-by-case rather than presumed. Empirically, this is what the better offset regimes (UK biodiversity net gain at design intent; some Australian state schemes) are trying to be; whether they will be in operation is, as of this writing, contested.

**Verdict.** *Ambiguous, leaning degrading at category level on current evidence.*

**Reasoning.** The rule's output here matters: it tells you that a policy *designed* to be Δω-neutral is, in practice and on the available evidence, Δω-negative more often than not — but the verdict is sensitive to the counterfactual and to scheme design. P9 (`prevention-over-repair`) cuts against the move because restoration is more expensive and less reliable than preservation. P11 (`time-asymmetry`) cuts against it because the destruction is faster and more reliable than the restoration. P18 (`legibility-truth-tradeoff`) cuts against it because "no net loss" is a legible-but-misleading metric that masks the structural mismatch. Yet the move is not unambiguously degrading because some schemes do create real ecological value, and the alternative is not always "no permit" but sometimes "permit without offset." This case shows the rule producing a *qualified* verdict that depends on empirical questions the rule itself does not answer — exactly the kind of output Tom asked for: an honest "ambiguous, here is why, and here is what would resolve it."

---

## Where this rule runs out

Six worked cases is enough to demonstrate the rule working. The page should also be honest about the cases where local Δω evaluation does not suffice.

- **Competing horizons.** A move that expands R_living at a 50-year horizon and contracts it at a 5,000-year horizon is rejected by P22's no-regret form, but P22 itself flags that *when no available move avoids long-horizon collapse, the criterion has nothing to say*. SAI sits near this edge. The fallback ("minimise the horizon at which collapse becomes asymptotic") is sketched in P22's open questions but not operational. The rule does not, in those cases, give a verdict — it gives a refusal-condition and an underspecified fallback.

- **Competing classes of life.** The rule operates at category level (P25, P22 implications: not aggregating individuals, preserving the *capacity for life to exist as a category*). Cases where preserving R_living for one major class requires contracting it for another, at category level, are not unambiguously decidable by Δω alone. The honest answer is that this is exactly where the rule pushes the question to the next layer — operationalising "major class of life", which P25 and P22 both flag as open.

- **Reversibility coupling.** SAI again. Some moves *introduce* reversibility-dependence — the post-move configuration is contingent on a maintained operation. The rule treats reversibility as a property of the move; it has less to say about moves that create new *dependency structures*. P19 (`transition-fragility`) gestures at this but it is not formalised at the move level.

- **The counterfactual non-move has its own Δω.** Strictly, a "move" is a comparison between the post-move R_living and the counterfactual post-non-move R_living, not between post-move and pre-move. The biodiversity-offsetting case made this explicit: the verdict shifts depending on which counterfactual is taken. The rule does not specify the counterfactual; that is a framework-user decision and a place where motivated reasoning can re-enter. This is not unique to CE — every counterfactual-dependent decision rule has the same problem — but the rule does not solve it.

- **Boundary-of-system effects.** Polychess (per the teaching draft) makes externalities into "moves on other boards you didn't know you were playing on." The rule, applied honestly, requires enumerating those boards. Enumeration is bounded by what the analyst can see (P18 `legibility-truth-tradeoff`). The rule produces *better* verdicts than rules that ignore other boards, but it does not produce *complete* verdicts. It is an improvement, not a closure.

- **The "move" abstraction itself.** Real configuration-changes are not discrete moves but continuous co-evolutions, made by many agents simultaneously (per `polychess-as-teaching-device.md` Layer 4 — discrete-vs-continuous, players-vs-non-player-participants). Treating a policy decision as a "move" is a simplification. For most consequential cases the simplification holds; for some (slow norm shifts, accumulating cultural changes, gradient policy environments), the move-as-discrete-event frame is the wrong unit, and a different mode of analysis — possibly state-comparison via the global ω measure P23 still treats as open — would be needed.

The page should close with a version of this list, not with a triumphant summary. The rule decides things, and the page demonstrates that. The rule does not decide everything, and the page demonstrates that too.

---

## Notes on the moves not chosen

For Tom's reference, the candidate moves from the brief I did not include in the worked-six, with reasons:

- **AI training-data commons vs enclosure.** Genuinely contested at the level of *what counts as the move*; analysing it well would require committing to a specific configuration-change description that is itself contested. Worth a future case, but better when the underlying empirics settle a bit. Probably belongs in a v2 of this page.
- **Peatland drainage for agriculture.** Substantively similar verdict-shape to fossil-fuel expansion (degrading, long irreversibility, displaced costs per P12) and to topsoil loss. Including it would have duplicated the demonstration without showing the rule doing new work. Worth holding for a future page that focuses specifically on land-use moves.
- **Ocean fertilisation.** Structurally similar to SAI (geoengineering, dependency, ambiguous-leaning-cautious). Including both would have over-weighted geoengineering in the page's case-mix. SAI is the better-known case and the literature is denser; ocean fertilisation can be a future addition or a sidebar.

---

## Open scaffolding questions for Tom

Things I deliberately did not resolve. Surface for voice review:

- *Page name.* "Moves: the framework in operation" is the working title from the brief. Possible alternatives: "Applications: Moves" (matches a future `/applications/` series), "Worked Moves" (terser), or just "/applications/moves" with no title-line elaboration. The third is closest to the existing site's calm voice.
- *Whether to render the verdict badge with colour at all,* or to leave verdict as plain text below the move name. The four-status palette on `/research-frontier` is load-bearing; adding a parallel verdict palette risks visual collision. Tom's call.
- *Whether to include a "How would you analyse a different move?" prompt at the foot* — Alexander could be useful here as the move-evaluation companion, given the page is structurally about the rule operating. If yes, parallels the existing Alexander-integration pattern; if no, the page stays a static demonstration. My weak preference: include the prompt, since the page's purpose is to make the rule *usable*, not just *visible*.
- *Whether move 5 (copyright term) is too far from CE's centre of gravity.* I included it deliberately because the page would otherwise look biophysical-only and the framework is explicitly broader (R_living spans cultural-and-coordination configurations, per P25 and the polychess Layer 3 reframe). If Tom wants the page tighter on biosphere-scale cases for v1, this move is the cleanest to drop, but the page loses something honest by dropping it.
- *Whether the "Where this rule runs out" section needs a small contributing-questions block* directing readers to Alexander or to specific propositions where the limits are tracked (P22 open questions, P23 open questions, P25 open questions). My instinct is yes — the limits-section is exactly where the framework's living-epistemic-work format earns its keep.

---

## Status note

Scaffold-only. Written 2026-05-18 in one pass to give Tom something concrete to react to rather than a blank page; per the existing draft convention, retains no canonical status until voice-reviewed. The Astro implementation is for Tom; mirror `src/pages/research-frontier.astro` line-for-line where structure allows, and the per-move template should render with the same calm rhythm as the frontier-item list. Six worked moves is the load-bearing payload; the "Where this rule runs out" section is what stops the page from being triumphalist.
