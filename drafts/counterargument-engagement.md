# Page scaffold: `/objections` (and what you're refreshing)

This is a refresh of the April 2026 draft, retargeted as a ship-ready scaffold for a dedicated `/objections` page rather than as an internal brief. The original document — five engaged responses to Lens 6's adversarial pass — is largely sound in its arguments; what has changed is the canon around it. Six propositions that were drafts in April are now canonical (`option-space-as-chess-moves`, `observer-relative-option-space`, `exergy-not-energy`, `binding-constraint`, `asymmetry-of-option-space-change`, `configuration-generates-configuration`); the proposed `substitution-limits` rewrite landed in v0.2.0; the decoupling and services-economy engagements both partly landed in essay §2 and §3. The responses are tightened to cite current canon and defer to landed essay-side work where it exists. `/lineage` shipped in v0.4.0 as the first credibility surface; `/objections` is the second — engagement with attacks rather than with predecessors.

**Status:** Draft scaffold for Tom's voice-review. Do not promote. Tone calibration on individual responses, ordering, and the *what remains genuinely open* list are the places this draft most needs your eye.

---

## Page intent

This page exists because the main essay is calm and the citations are quiet. An informed reader, having read the essay, has a right to ask *what are the strongest objections, and how does this work answer them?* The objections page is where that question gets a serious answer.

It is the second credibility surface, paired with `/lineage`. The lineage page records debts to predecessors; the objections page records engagement with attacks. Both exist so the essay can stay invitational while readers who want the harder work can find it. Neither is a marketing page. Where Configuration Economics concedes, it concedes specifically. Where the response runs out, the page says so rather than papering over the gap.

The objections engaged here are the ones the framework cannot afford to ignore — the ones that would land as fatal openings if unanswered. Other objections are real but resolved by other work (the lineage page, the proposition-tightening rounds, the v0.2.0 essay updates) and are noted as such rather than re-litigated. A small set of objections are flagged as genuinely open and named as future work rather than answered with a confident response that does not yet exist.

---

## How this differs from `/lineage`

The lineage page asks *who said what already, and what is actually new here?* It is a structured statement of inheritance. The objections page asks *what are the strongest reasons this might be wrong, and how does the framework answer them?* It is a structured statement of defended ground. The two surfaces are complementary: a reader who finishes the essay can take either route into the credibility apparatus depending on whether their next question is about ancestors or about adversaries. The pages share visual rhythm and editorial discipline; they do different work.

---

## Five engaged objections

Each objection is stated in its strongest form, engaged in calm prose, and closed with a concessive note on what the response does not resolve. Where the engagement defers to landed essay-side work, the page says so rather than repeating it. Proposition references are by `id`; the rule operating on real cases lives at `/applications/moves`.

### 1. Measurability

> *"Option space has no unit, no measurement procedure, no error bars. You propose it replaces GDP. Give me the unit."*

The attack assumes the framework requires a global state measure ω(C) — a scalar over configurations that ranks states the way GDP ranks economies. It does not.

Two distinct evaluation modes are available, and the attack only lands against one of them.

**Global ω(C) — state measurement of total option space.** Currently non-computable for all four candidate measures (cardinality, diversity-weighted, Assembly-weighted, compositional). The work concedes this directly in `option-space-measurability`, which carries epistemic status `open`. This is the central remaining open problem and the framework says so.

**Local Δω(move) — gradient evaluation of moves.** This is operational now. Chess engines work this way: not by computing the full game tree but by evaluating whether a move opens or closes the resulting position. Mass extinction events, monoculture conversions, fossil-fuel commitments locking in 4°C lock-in are unambiguously option-space-degrading even when the global ω of the post-state is not computable. The framework ships with a usable decision procedure: evaluate moves by their effect on `R_living(C, B, T)` — the configurations reachable from the current state, under exergy budget B, over horizon T, in which life-persisting observers continue to exist and make distinctions. Local gradient evaluation is tractable where global value computation is not.

This is the canonical content of `option-space-as-chess-moves`, with the observer-class restriction supplied by `observer-relative-option-space` and the budget vocabulary supplied by `exergy-not-energy`. The lineage is named openly in those propositions and on `/lineage`: Snowden's next-best-move stance, Aubin's viability theory, and Real Options (Dixit & Pindyck) are the operational ancestors; CE's specific delta is the physical grounding (exergy budget, life-persisting observer class) and the retained forward-looking measurement aspiration.

The rule is not a thought experiment. `/applications/moves` runs the procedure on six worked cases: continued fossil-fuel expansion, antibiotic stewardship, stratospheric aerosol injection at scale, regenerative-agriculture subsidy, copyright term extension, and biodiversity offsetting. Two come out unambiguously degrading, one preserving, one expanding, two ambiguous-with-reasons. The verdicts are produced by the framework's own logic. Where they match conventional consensus, that is incidental. Where they diverge — or where the rule refuses to deliver a clean verdict — the page says so. The point of `/applications/moves` is to demonstrate that the rule decides things; that it has structure even where it does not have a cardinal score.

**What a hostile critic would still say.** *"Local Δω is just qualitative judgement dressed in symbols. You're calling 'this seems bad' a measurement."*

The criterion has structure even where it does not yet have units. *A move is option-space-degrading iff it asymptotically eliminates `R_living` for some major class of life over horizon T.* This is binary at the limit, graded in practice, and convergent across observers in the most consequential cases (extinction events, irreversible lock-ins, ecosystem collapse). Convergent inter-observer verdicts on the high-stakes cases is exactly what a useful evaluation procedure provides. It does not have to produce a real-valued cardinal score to be more informative than GDP, and the framework does not claim it does.

**What's honest to concede.** The state measure is open and the work says so by giving `option-space-measurability` the only `open` status in the entire proposition set. Aggregation across simultaneous moves by many agents (the biosphere has many players; chess has one) is partly handled by the observer-class restriction but needs further articulation for edge cases. The operational definition of "major class of life" (phylum-level? functional ecological role? capacity for distinction-making?) is named as open in `option-space-as-chess-moves` and `viable-objective`. Gradations between elimination and narrowing of `R_living` are real and the binary form of the criterion is a deliberate simplification at the limit, not a claim that all real moves are categorical.

These are real open questions, not artefacts of the framing. The framework names them as such; it does not paper over them.

### 2. Degrowth-in-disguise

> *"This is rebranded ecological economics with less humility and no empirical work. It's degrowth in a physics costume."*

No — and the distinction matters.

**Degrowth's primary move:** reduce aggregate output. Less consumption, less production, less throughput. Usually paired with redistribution and political reorientation.

**Configuration Economics' primary move:** redefine what counts as value. Throughput is a cost (`throughput-cost`); configuration quality is the productive content. The question stops being *how much* and becomes *of what and in what arrangement*.

The two can look similar in consequence — both predict lower throughput in some sectors — but they differ in what they prescribe and why.

Under CE, some sectors should *grow*: ecological restoration, care, learning, research, coordination, cultural production, maintenance. These are configuration-positive (`care-as-configuration`, `complexity-maintenance`, `prevention-over-repair`, `configuration-generates-configuration`). Under standard degrowth framings these tend to be discussed as beneficiaries of redistributed resources from contracting sectors; under CE they are the primary productive content, full stop.

Under CE, markets, trade, innovation, and ambition are preserved and redirected, not constrained. Degrowth literature is more ambivalent about these.

Under CE, the argument is descriptive (what follows from physical constraint plus a forward-looking value frame). Degrowth literature is more often normative (what people *should* want and how society *should* be arranged). The family resemblance is real. CE positions itself as an accounting reframe, not a political programme, and the reframe has different implications.

The structural-asymmetry argument tightens the distinction further. `asymmetry-of-option-space-change` says that destruction of option space is typically fast and local; expansion is typically slow and systemic. Under that asymmetry, expected-value maximisation over option-space outcomes systematically misprices irreversible loss. No-regret preservation is not conservatism by temperament; it is the operationally tighter rule under the build-vs-break time-scale ratio. CE's central decision rule rests on this structural argument rather than on a prescriptive aggregate-throughput target. Degrowth and CE agree on a wide class of policy verdicts, but they reach them differently and they part ways on the moves where the prescriptive content differs (configuration-positive expansion under exergy restraint is CE-positive; in some degrowth framings it is suspect).

**Where the degrowth literature is right.** Jason Hickel's empirical case against absolute decoupling at the scale and pace required by planetary boundaries is strong work and the framework inherits it openly — essay §2 engages it directly, and `/lineage` names Hickel under cluster 6. Tim Jackson's *Prosperity Without Growth* is closer to CE's descriptive mode than most of the literature and is named for the same reason. Kate Raworth's doughnut is the closest mainstream analogue to CE's bounded-operating-space framing; the difference is that the doughnut is a static target zone and CE's `Δω` rule is a dynamic move-evaluation procedure.

**What's honest to concede.** CE's tone of descriptiveness — *this is accounting, not ideology* — is itself a political choice, in the sense that choosing to bracket political economy is a political stance. A reader who sees this is not wrong. The honest reply is that CE acknowledges the limits of its own scope and does not claim normative neutrality as such, only disciplinary restraint about what the framework itself entails. The coordination-mechanism question — what institutional arrangements actually implement a no-regret rule under physical constraint — is named as open in the project's roadmap and is not solved here. That is a scope limit, not a hidden ideology.

### 3. The services economy

> *"~80% of advanced-economy GDP is services. Those sectors use relatively little throughput. Your critique of throughput-based value is pointing at a problem that's already resolving itself."*

Three moves, the last of which is the one CE uniquely makes.

**First**, services are not throughput-light at the point that matters. Healthcare depends on pharmaceuticals, imaging equipment, hospital construction, transport. Education depends on buildings, energy for heating and lighting, transport, technology. Finance depends on enormous data centres (collectively in the low single-digit percent of global electricity). Retail depends on logistics infrastructure. The classification *as* services does not remove the physical substrate; it hides it. Under consumption-based accounting (as opposed to territorial), embodied throughput is attributed to the consuming sector — and under consumption-based accounting, the services economy carries far more physical weight than its headline GDP share suggests. This is the move essay §2 makes directly in its decoupling-literature engagement; the same accounting distinction lands here.

**Second**, even sectors with genuinely low direct throughput (software, pure consulting) remain embedded in throughput-dependent supply chains. Software engineers use laptops, live in heated houses, eat food produced with substantial fossil inputs. The service's throughput footprint includes the embodied throughput of its workers' lives and the substrate the work runs on. `displaced-costs` is the canonical version of this argument: costs displaced in space and time still count.

**Third** — and this is the move CE uniquely makes — *within* a service economy, configuration matters more, not less. Services are configurations of human time, skill, institutions, and infrastructure. `configuration-generates-configuration` lands here directly: each well-formed service configuration makes further service configurations reachable (a literate population enables further institutions; a functioning health system enables further specialisation; trusted civic infrastructure enables further coordination). A well-configured healthcare system delivers more option space per unit of physical input than a badly-configured one. The service economy is exactly where CE's framework has most to offer, because throughput-centred analysis is least useful there. Essay §3 makes this argument in landed form: *the shift toward services increases the weight of configuration-centred analysis; it does not decrease it.*

The objection treats the throughput critique as the whole of CE. It is not. The throughput critique is one half of the diagnostic; the configuration argument is the productive half. The services economy is where the productive half does its strongest work.

**What's honest to concede.** Earlier framings of `throughput-cost` were sometimes read as implying that all throughput-based activity is pathological. That is not the claim, and the essay was tightened in v0.2.0 to make the differential relevance of throughput across sectors explicit. A reader who saw the earlier framing and not the revised one would be working with a stronger claim than CE actually makes. The framework's surface-language has not always been careful about scope; the underlying claim has been.

### 4. The decoupling data

> *"Some advanced economies have grown GDP while per-capita material footprint declined. IEA and OECD data show this. Your 'growth slows because savings decline' claim is empirically false, or at least under-specified."*

This requires careful engagement with the empirical literature, and it largely lives in essay §2 rather than here. The page is a brief gloss on what the essay already does.

Two distinctions the attack usually elides:

- **Relative vs absolute decoupling.** Most cited decoupling is relative — GDP grows *faster* than throughput, but both grow. Absolute decoupling requires GDP to grow while throughput declines. The latter is rarer and context-specific.
- **Territorial vs consumption-based accounting.** Under territorial accounting (where goods are produced), some advanced economies show apparent absolute decoupling. Under consumption-based accounting (where goods are consumed), the decoupling mostly disappears — it turns out to be production offshoring, not actual reduction.

The Hickel–Kallis meta-analysis (2019) and related work conclude that absolute decoupling of GDP from material throughput and CO₂ at the scale and rate required for 2°C targets has no empirical precedent. Where partial absolute decoupling has occurred (some EU territorial CO₂ trends), it has been context-specific, slow, and dependent on offshoring. Extrapolating to global scale at the required rate is unsupported.

CE's distinctive claim should be stated more carefully than older drafts sometimes did. The accurate version, which is what essay §2 now carries:

- Aggregate productivity growth has slowed in advanced economies since the 1970s. This is well documented.
- Multiple candidate explanations exist: declining EROI (Hall, Ayres & Warr), technological exhaustion (Gordon), declining corporate investment, demographic transition, political-economic shifts.
- CE's distinctive claim is that *one* major factor is declining energy-return-on-investment as fossil stocks deplete — supported by the EROI literature and consistent with the broader thermodynamic-economics tradition.
- CE does not claim this is the *only* factor. Overclaiming here would be dishonest and would invite easy refutation. The essay states this directly in §2.

The decoupling-and-EROI engagement landed in essay §2 in v0.2.0 (changelog: *engages the decoupling literature (relative/absolute, territorial/consumption-based, Hickel–Kallis); EROI decline is one major factor among several, not monocausal*). The page defers to that landed work rather than repeating it. The objection no longer lands cleanly against the current essay; readers who want the engagement should be pointed at §2.

**What's honest to concede.** Where absolute decoupling has occurred under specific conditions (some EU CO₂ trends), the framework should not dismiss the finding. The honest position is that partial absolute decoupling is real but bounded, dependent on offshoring in most cited cases, and not at the rate or scale required by planetary boundaries under continued growth. The empirical literature is the right register here; the framework's contribution is the accounting reframe, not new decoupling data.

### 5. The Solow substitutability attack

> *"Capital and technology substitute for natural resources. Solow showed this in 1974; Stiglitz formalised it further. Your claim that substitution has limits is true but trivially so — nobody serious claims substitution is unlimited. The interesting question is how much substitution is feasible, and that's empirical."*

This is the strongest mainstream objection and deserves direct engagement. The objection is partly fair: the *general* claim that substitution has limits is too weak to do work. The objection lands against an older framing of `substitution-limits` that no longer holds.

The current canonical form (revised in v0.2.0 per the Lens 2 audit) is sharper. `substitution-limits` now reads:

> *Substitution is empirically bounded by specific physical and ecological invariants that no technology has demonstrated the ability to circumvent.*

Premises spell out the empirical content. Substitution has succeeded historically for many resources (whale oil → petroleum, horses → engines, timber → steel) where the function depended on a class of physical property rather than on a specific atom or sink. Some functions depend on specific physical invariants: phosphorus cannot be synthesised, only extracted; atmospheric and oceanic sinks for CO₂ have no technological replicate at planetary scale; extinct species cannot be re-created; deep fertile topsoil regenerates over millennia, not decades. Manufactured substitutes for invariant-dependent functions (hydroponic agriculture, direct-air capture, geoengineering) carry their own dependencies on inputs that circle back to the same invariants.

The conclusion: relying on substitution for the specific invariants currently binding (phosphorus stocks, atmospheric sink capacity, biodiversity, topsoil, fresh water) is not merely risky but structurally incoherent. The strong-sustainability position (Daly, Hickel) is the defensible default; weak-sustainability claims (Solow, Stiglitz) generalise from a substitution record that does not transfer to invariant-dependent cases. The cornucopian extrapolation is a category error, not just an empirical mistake.

`binding-constraint` does adjacent load-bearing work: the operative physical constraints on human economic activity are entropy-dump capacity, specific materials at their extraction-and-regeneration rate, and biosphere integrity — not total energy influx. The Solow tradition was right that energy-as-such is not the binding constraint at planetary scale (Earth receives ~175 PW of solar exergy; humans dissipate ~18 TW). The binding-constraint proposition concedes that point explicitly. What it adds is that the operative constraints lie elsewhere, and that the Solow substitution argument does not generalise from energy carriers (where it has worked) to sinks, specific atoms, and biospheric configurations (where it has not).

The Daly–Solow–Stiglitz debate is a live disagreement and CE positions itself recognisably on the Daly side, with the empirical specifics carrying the case rather than a general principle. `asymmetry-of-option-space-change` tightens the argument further: in the cases where substitution does not work — extinct species, eroded topsoil, depleted phosphorus rock, lost ecosystem functions — the recovery path is on a timescale that does not balance the loss. The asymmetry is what makes the cornucopian bet structurally incoherent, not just risky.

**What's honest to concede.** The strong-sustainability case is empirical, not categorical. It remains testable as new technologies arrive. The case is strongest for phosphorus and atmospheric sinks; somewhat softer for individual species (functional redundancy is real) and topsoil (rebuildable but slow). The framework does not claim categorical non-substitutability for everything currently cited as an invariant; it claims that the specific invariants now binding have not been substituted by any demonstrated technology and that the extrapolation from past substitution success to future substitution of these invariants is unsupported. That is a strong claim. It is also a falsifiable one.

---

## What's been resolved by other work

Several attacks from the Lens 6 round are no longer serious objections against the current framework, because the work they were attacking has shifted under them.

**Attack #7 — normatively smuggled propositions.** The proposition-tightening rounds landed in v0.2.0–v0.4.0 (revisedAt dates on `value-option-space`, `participation-limits`, `money-as-signal`, `legibility-truth-tradeoff`, `ignoring-physics`, `substitution-limits`, and the v0.6/v0.7 additions). The propositions now distinguish structural claims from normative ones explicitly in their `layers.formalDefinition` sections, and the surface text was tightened to remove the normative slide the attack named. The attack is treated as resolved.

**Attack #10 — novelty and lineage.** Resolved by `/lineage` in v0.4.0. The strongest form of the novelty attack — *Soddy 1926, Georgescu-Roegen 1971, Daly 1977, Tainter 1988, Holling, Kauffman, Fuller, Hickel — what is new here?* — gets a calm answer on that page: observer-relative `R_living`, local `Δω` on chess-moves, the asymmetry-as-structural-justification, configuration-not-information, labour-as-allocator, and the living-epistemic format. Everything else is inheritance, and the work owes it openly.

**Attack #6 — solar-flux scale.** Handled by `binding-constraint` (canon since v0.6): the operative constraints are sinks, specific materials, and biosphere integrity, not the thermodynamic ceiling. Framing economic constraint as *running into the second law* is wrong and invites cornucopian dismissal. The framework's honest framing is that the sink wall is close, the material-rate wall is close, the biosphere wall is close — the ceiling is far.

### Partially resolved

**Attack #8 — political economy.** CE deliberately brackets political economy as scope-limited. The framework names coordination-mechanism-under-physical-constraint as an open question in its roadmap and does not claim to resolve it. This is a real scope limit and a reader who sees it is not wrong to note it; it is not a hidden ideology but it is also not a closed question. See *what remains genuinely open* below.

**Attack #9 — AI guide trust.** Alexander (the guide) carries a system prompt that explicitly prohibits making contested claims authoritatively, requires citing propositions by `id`, and routes substantive questions back to the canonical text. This is partial. Retrieval-grounding against the proposition set and the essay sections is in place via the `currentSection` / `currentSectionId` context-awareness mechanism. The deeper question — *can an AI guide be trusted not to drift under sustained adversarial use?* — remains an open structural question for the format and is named as such in *what remains genuinely open*.

**Attack #13 — AI-symbiotic authorship.** Acknowledged in `CLAUDE.md` and visible in the git history via Co-Authored-By trailers on commits that involved AI drafting. The framework's editorial position is that AI was used as drafting and structural-review apparatus with human oversight on all substantive claims; the propositions, essay sections, and decision rules are authored, not generated. This is becoming standard practice in the field and the page acknowledges it without ceremony. A short *how this was written* note may belong on the overview rather than here.

**Attack #14 — living document is unstable.** Partly addressed by the v0.2.0 editorial stance (status badge in the nav showing current version and build, `revisedAt` dates on every proposition that has been touched since initial publication, a versioned changelog accessible via the explore page). Full version-pinning URLs (`/v0.4.1/essay` or git-hash-anchored citations) remain a future possibility. A reader who wants to cite a stable snapshot can currently cite the version + build pair; URL-level immutability is not yet shipped.

**Attack #15 — category error in epistemic status.** The four-bucket status system (`established / derived / contested / open`) does blur some distinctions — physical vs empirical vs conceptual vs normative are not all the same kind of claim, and a single certainty axis treats them as if they were. This is a real structural critique of the format and is named in *what remains genuinely open*. A two-dimensional status system (certainty × claim-type) is one candidate response; whether it earns its complexity is undecided.

---

## What remains genuinely open

A small set of objections are not resolved here, are not partially resolved by landed work, and are not answerable with a confident response that the framework does not in fact have. The honest move is to name them as future work rather than answer them weakly.

**Political-economy depth.** CE brackets the political economy of transition. The framework's claim is that the accounting reframe is logically prior to the political question — you cannot design coordination mechanisms for *configuration quality preservation under physical constraint* until you have named what is being preserved. That is a real claim but it is not the same as having solved the political question. Coordination mechanisms under constraint may turn out to be the binding bottleneck on whether any of this matters. The framework owes this work and does not yet have it. The most honest version of the response is that political-economy depth is the next research frontier, not the current page.

**AI-guide trust under sustained adversarial use.** Alexander's system prompt is well-formed and the retrieval grounding is in place. Whether the guide remains trustworthy under sustained adversarial probing — repeated attempts to elicit contested claims as authoritative, jailbreaks against the system prompt, drift through long conversational context — is not something the framework has tested at scale. The pattern is becoming general (proposition-aware AI guides are increasingly common) and the trust question is general with it. CE inherits the open problem; it does not solve it.

**The category error in the epistemic status system.** The four-bucket system (`established / derived / contested / open`) compresses two distinct dimensions: how confident the claim is, and what kind of claim it is. A normative claim and an empirical claim can both be `contested` for very different reasons; treating them as equivalent in status is a category error. A two-dimensional system (certainty axis × claim-type axis) is one candidate fix. Whether the added complexity earns its keep — whether readers actually navigate the two-axis system better than the one-axis system — is genuinely undecided. The format owes this work too.

---

## Proposed `/objections.astro` page structure

Mirroring the `/lineage` shape, render rhythm rather than Astro code:

- **Header band** matching `/lineage`: title (*Objections*), subtitle (*the strongest attacks and where this work answers them*), small note (*the second credibility surface; paired with `/lineage`*).
- **One short orienting block** carrying the *Page intent* paragraph above, tightened.
- **Differentiation block** carrying *How this differs from `/lineage`* — one paragraph, lighter weight visually than the orienting block.
- **Five engaged-objection blocks**, each rendered as a section with: objection number + short name as `<h2>`; the steelman quoted in a left-bordered blockquote with italic styling; the response prose; a *what's honest to concede* element rendered as a distinct visual block (use the *delta line* treatment from `/lineage` — labelled, left-bordered, lighter background). The steelman blockquote and the concession block want to be the two most visually distinct elements on the page; the response prose is the connective tissue between them.
- **Resolved-by-other-work block**: a single section with three fully resolved attacks (#7, #10, #6) as short entries, then a sub-block with five partially resolved attacks (#8, #9, #13, #14, #15) as slightly longer entries. Visual weight lighter than the engaged-objection blocks.
- **What remains genuinely open block**: three entries, same styling as the open-question boxes on `/research-frontier` or the *item-open* shape used on `/lineage` predecessor deltas. This block wants to read honestly, not defensively — the entries are confessions, not bullet points.
- **Footer band** matching `/lineage`: links back to overview, essay, explore, applications/moves, lineage, research-frontier.

Cluster headers want enough vertical breathing room to feel like sections. The five engaged-objection sections want to be heavy enough to invite reading; the resolved and open sections want to be lighter so the page does not over-state its own credibility apparatus. Aim for the same overall density as `/lineage` — long but scannable. Status badge in nav: same treatment as version/build elsewhere.

Ordering note: the proposed sequence is measurability → degrowth → services → decoupling → Solow. Measurability is the most fundamental and most likely to be the reader's first question; the rest follow in declining order of how much novel argument the response makes (degrowth and Solow rely more on canon-level structural claims; services and decoupling defer more heavily to essay-side landed work). Reverse-order or by-strength-of-objection are both plausible alternatives; the proposed sequence is the one that reads best as a single document.

---

## Open editorial questions for Tom

A small list of decisions that want your eye before this is promoted.

1. **Ordering of the five engaged objections.** Currently measurability → degrowth → services → decoupling → Solow. Alternative: lead with Solow (strongest mainstream objection, makes the framework defend its hardest ground first) or lead with degrowth (most likely framing the reader brings in). The current ordering is by reader-priority; the alternatives are by argumentative-priority. Your call.

2. **Whether to include or exclude attacks #8/#9/#13/#14/#15 in the partial-resolution block.** Including them is honest and pairs the page with `/lineage` in admitting limits. Excluding the AI-trust and authorship attacks (#9, #13) and keeping only the framework-structural ones (#8, #14, #15) is a defensible alternative — the AI-trust questions arguably belong on a *how this was written* note on the overview rather than here. My instinct is to keep all five for completeness; you may prefer to slim.

3. **Tone on the Solow response.** The current response is confident — it leans on the v0.2.0 tightening of `substitution-limits` and on `binding-constraint`'s explicit concession that the Solow tradition was right about the energy ceiling. Whether the response reads as appropriately confident or as overclaiming is a voice-calibration question I cannot resolve. The Daly–Solow–Stiglitz debate is sufficiently live that a slightly more humble register may serve better; equally, the v0.2.0 tightening earned the right to a sharper claim and softening it would be false modesty. Your eye.

4. **The category-error point in *what remains genuinely open*.** This is a real structural critique of the living-epistemic format and naming it on `/objections` is consonant with the format's own discipline. It is also the most format-internal of the three open items and may feel out of place next to political-economy depth and AI-trust. Reasonable alternative: move it to a separate *format* note (overview, or a dedicated meta-page). Currently included; flag if you want it relocated.

5. **Length.** The draft is around 500 lines including this scaffold metadata. The page proper (everything below *Page intent* through the footer band proposal) is around 320 lines. The brief sets a 700-line ceiling. Current draft is well under; expansion room exists if any specific response wants to land harder. My instinct is that the page reads at its current length; further expansion risks making it feel defensive. Flag if you want any specific response (Solow and measurability are the candidates) to grow.
