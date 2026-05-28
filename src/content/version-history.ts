// Version history for Configuration Economics
//
// Living-epistemic-work provenance: this file enumerates what changed in each
// version. Code-level history lives in git; this file is the human-facing
// summary of substantive moves at the version-grain.
//
// Convention (from src/lib/version.ts):
//   Major: fundamental framework changes
//   Minor: new propositions, significant rewrites
//   Patch: refinements, fixes, code improvements

export interface VersionChange {
  added?: string[];
  revised?: string[];
  structural?: string[];
}

export interface VersionEntry {
  version: string;
  date: string;       // ISO YYYY-MM-DD
  title: string;
  summary: string;
  changes: VersionChange;
}

export const VERSION_HISTORY: VersionEntry[] = [
  {
    version: 'v0.8.0',
    date: '2026-05-28',
    title: 'Attack a premise — the format demonstrates itself',
    summary: `The format's central claim has been that a claim is not a monolith — it is an explicit set of premises with an epistemic status and a connective neighbourhood, so any single premise can be stress-tested on its own. v0.8.0 makes that claim operable. A new /attack surface lets a reader target one premise and get a four-step response from the guide: steelman the strongest version of the attack, respond from canon, concede what the attack legitimately costs, and trace the blast radius — which connected propositions actually lean on the premise and which survive without it. Three worked examples span the epistemic-status tiers (an established premise, a contested premise, an open premise) to show the response calibrates to confidence: the established premise gets a strong defence and a scope-level concession; the open premise is not defended at all, only located. The same affordance is wired in-place on /explore: open any proposition's logic and each premise carries an attack control. This is the demonstration a printed paper cannot offer — interactive, per-premise falsifiability over the work's own dependency structure.`,
    changes: {
      added: [
        '/attack page — three worked premise-attacks, one per epistemic-status tier. `exergy-not-energy` (established): the attack that the closed-system idealisation is wrong, answered by showing exergy is the open-system-correct currency; concession is about operationalisation, not truth. `value-option-space` (contested): the teleology/circularity attack on the keystone premise, answered structurally via selection rather than intention; concession names the genuine is-to-value gap that the contested status marks. `option-space-measurability` (open): the vacuity attack, not defended — the honest split between the open global measure and the operational local Δω, conceding the state-comparison ambitions while keeping the move-level procedure. Each case carries a steelman → response → concession → blast-radius structure, with blast-radius chips computed live from the link graph so they cannot drift from canon.',
        'Per-premise attack control on /explore — opening a proposition\'s logic now shows an ⚔ attack affordance on every premise. Clicking hands the guide that exact premise in premise-defense mode.',
        'New ReaderMode value: `attack`. The guide adopts a premise-defense register bound to the targeted premise, calibrated to its epistemic status: a strong defence and small concession for `established`, genuine give-and-take for `contested`, and "this isn\'t settled — here is the candidate, here is what would close it" for `open`. An `open` premise defended as if established is explicitly named as a failure of the mode.',
        'New `attackFocus` field on GuideContext (proposition id + premise text). buildPromptWithContext injects an ATTACK FOCUS block naming the targeted claim, its full premise list, its status, and its connective neighbourhood, with an explicit instruction to judge real dependence rather than echo the non-semantic link list.',
        'New SECTION_PROPOSITIONS entry for `attack` (the three worked-example propositions plus the keystone). New AVAILABLE SURFACES entry for /attack. GuidePanel URL inference routes /attack → attack mode; the panel exposes an `attackPremise()` entry point that pre-fills the input rather than auto-sending, so no billed model call fires on a click.',
        'New `getDependents` and `getNeighbourhood` helpers in propositions.ts (inbound and combined links) backing the blast-radius computation.',
      ],
      structural: [
        '/attack linked from index.astro, /overview footer, /research-frontier footer, /objections footer, and /lineage footer. It is the third member of the credibility apparatus alongside /lineage (inheritance) and /objections (defended ground): where /objections engages whole-framework attacks chosen in advance, /attack hands the reader the scalpel for any premise of any proposition, including ones no one has attacked yet.',
      ],
    },
  },
  {
    version: 'v0.7.0',
    date: '2026-05-19',
    title: 'Alexander present on every grokkable surface',
    summary: `Alexander, the guide, is now mounted on every surface where there is grokkable text — not just on /essay and /applications/moves. The mode-adaptive register that has existed since v0.1.5 is now actually reachable everywhere it was designed for: /overview adopts overview register, /explore adopts explore register, /research-frontier adopts research-frontier register, /lineage and /objections gain dedicated registers (predecessor-mapping and critique-response companions), /practice reuses overview. Each surface gives the reader the same calm guide tuned to the resolution that surface is operating at.`,
    changes: {
      added: [
        'Two new ReaderMode values: `lineage` (predecessor-mapping companion — surfaces both inheritance and CE\'s delta, cites by proposition id, names framing differences rather than papering over them) and `objections` (critique-response companion — steelmans the objection fairly, gives the response leaning on canonical proposition ids, names the concession, and flags the three genuinely-open structural critiques rather than pretending they are answered).',
        'New SECTION_PROPOSITIONS entries for `lineage` (the "What CE adds" set: observer-relative-option-space, option-space-as-chess-moves, asymmetry-of-option-space-change, configuration-generates-configuration, configuration-not-information, labour-as-allocator, viable-objective) and `objections` (the propositions doing load-bearing work in the five engaged responses).',
        'GuidePanel mounted on /overview, /explore, /research-frontier, /lineage, /objections, /practice. Layout reserves 460px on the right on screens wider than 1100px; below that the panel collapses to a mobile trigger. URL inference routes /lineage→lineage, /objections→objections, /practice and /changelog→overview register.',
      ],
      structural: [
        'The mode-adaptive register architecture from v0.1.5 is now fully realised. Modes that were defined but dormant on most surfaces (overview, explore, research-frontier) are now actually entered when readers land on those pages. The guide is, for the first time, an ambient companion across the work rather than an essay-side feature.',
      ],
    },
  },
  {
    version: 'v0.6.0',
    date: '2026-05-19',
    title: 'Alexander as move-evaluator on /applications/moves',
    summary: `Push 3: the rule becomes an instrument. Alexander is now wired into /applications/moves with a dedicated move-evaluator register. A reader who brings their own move — a policy, an infrastructure commitment, a land-use change, an institutional reform — gets the structured analysis the page's six worked cases use, produced by the framework's own logic. Where the verdict is ambiguous, Alexander says so. Where the move sits near one of the five failure modes in "Where this rule runs out", Alexander names the edge plainly. The credibility apparatus from v0.5.0 backs the verdicts when readers push back: Alexander can defer to /lineage for predecessors and /objections for engaged attacks.`,
    changes: {
      added: [
        'New ReaderMode value: `applications`. Alexander adopts a move-evaluation register when the reader is on /applications/moves. The system prompt names the nine-step structured analysis template (brief description; pre-move R_living; post-move R_living; irreversibility horizon; who bears costs; who bears benefits; what would change the assessment; suggested verdict; reasoning) and instructs Alexander to produce ambiguous verdicts where appropriate rather than forcing certainty.',
        'New SECTION_PROPOSITIONS entry for `applications` injecting the nine move-evaluation-relevant propositions: `option-space-as-chess-moves`, `observer-relative-option-space`, `viable-objective`, `asymmetry-of-option-space-change`, `configuration-generates-configuration`, `option-space-measurability`, `displaced-costs`, `time-asymmetry`, `binding-constraint`.',
        'New AVAILABLE SURFACES section in the system prompt listing all eleven discoverable surfaces so Alexander can point readers to the right route when their question is about *where to go next* rather than *what is true*.',
        '"Bring your own move" CTA on /applications/moves above the verdict legend, inviting readers to engage Alexander in move-evaluation mode.',
        'GuidePanel mounted on /applications/moves (previously essay-only). Layout adjusted to reserve 460px on the right for the panel on screens wider than 1100px; below that the panel collapses to a mobile trigger.',
        'URL inference in GuidePanel updated: `/applications/*` paths now route to `applications` mode automatically.',
      ],
      structural: [
        'CE\'s actionability surface gains its instrument. /applications/moves was previously a museum of worked examples; it is now a venue where the rule is wielded. Pairs with the v0.5.0 credibility apparatus — verdicts produced under pressure can defer to /lineage (the predecessors that make the rule defensibly novel) and /objections (the attacks the rule has survived).',
      ],
    },
  },
  {
    version: 'v0.5.0',
    date: '2026-05-19',
    title: '/objections — the second credibility surface',
    summary: `The long-pending counterargument-engagement draft lands as /objections, pairing structurally with /lineage. Five engaged objections — measurability, degrowth-in-disguise, services economy, decoupling data, Solow substitutability — each as steelman → response → concession. Three attacks recorded as resolved by other work (normatively smuggled propositions, novelty/lineage, solar-flux scale); five recorded as partly resolved (political economy, AI guide trust, AI-symbiotic authorship, living-document instability, category error in epistemic status). Three genuinely open structural critiques named as future work rather than answered weakly.`,
    changes: {
      added: [
        '/objections page — five engaged objections plus resolved-by-other-work and what-remains-open sections. Mirrors /lineage shape with distinct visual treatment for steelman (red left border, italic), concession blocks (blue left border, labelled), and open entries (purple left border, /research-frontier-style). Lineage names openly: the chess-moves frame, observer-relativity, asymmetry, generative dynamics, binding-constraint all carry response load. Every proposition reference by id in backticks; /applications/moves cited as the live demonstration that the rule decides things.',
      ],
      revised: [
        'CE credibility apparatus now complete in v0.5.0: /lineage records inheritance; /objections records defended ground; /applications/moves demonstrates the rule operating on real cases. The three credibility surfaces pair so a reader who finishes the essay can take any route into the apparatus depending on what they want to verify.',
      ],
      structural: [
        '/objections linked from index.astro, /overview footer, /research-frontier footer, /lineage footer. Top-nav of /objections includes /lineage as a sibling credibility surface.',
        'counterargument-engagement.md draft marked as landed in drafts/README.md.',
      ],
    },
  },
  {
    version: 'v0.4.1',
    date: '2026-05-19',
    title: 'Essay §4 integrated with configuration-generates-configuration',
    summary: `Integration pass following the v0.4.0 push. §4 (configuration-value) prose carried the generative-mechanism claim implicitly throughout — "structures that store, transmit, and reuse information"; "compound without proportional energy increase" — without naming the structural move. The integration adds one sentence to the biological-evolution paragraph that names the mechanism (each configured arrangement makes further arrangements reachable; accumulated arrangement lowers the cost of further arrangement), and a clause to the "compound without proportional energy increase" line that surfaces the rate-grows-with-accumulation claim. §4.5 was already tight — the productive/destructive distinction is named in prose; no integration touch needed there.`,
    changes: {
      revised: [
        'Essay §4 configuration-value — added one sentence after the biological-evolution paragraph naming the generative mechanism explicitly. Extended the "compound without proportional energy increase" line with the rate-grows-with-accumulation clause. keyPoints gained a fourth entry on the runaway-when-substrate-preserved point. revisedAt: 2026-05-19.',
        'Alexander system-prompt §4 summary tightened to mention configuration-generates-configuration and the structural mechanism it names. §4.5 summary already current.',
      ],
    },
  },
  {
    version: 'v0.4.0',
    date: '2026-05-18',
    title: 'Generative-side proposition + /lineage page',
    summary: `The expansion-side counterpart to v0.3.0's asymmetry lands as a third v0.7 proposition: configuration-generates-configuration. With it, CE has both faces of the option-space dynamic — fast-local destruction (asymmetry) and slow-systemic compounding expansion (generative). The /lineage page ships alongside, separating the credibility apparatus from the calm essay. Seven predecessor clusters with explicit deltas, and an honest update to how CE relates to Cronin/Walker's Assembly Theory now that the 2023–24 reformulation has closed part of the gap CE had been citing.`,
    changes: {
      added: [
        '`configuration-generates-configuration` [contested] — the expansion-side proposition. Each configured arrangement makes further configurations reachable that were not reachable before; the rate at which new configurations become reachable grows with accumulated configuration. The generative counterpart to asymmetry. Stands on the weaker defensible claim and carries Walker/Cronin\'s stronger time-emergent-from-assembly view without depending on it.',
        '`/lineage` page — seven predecessor clusters (Physical grounding; Configuration as primitive [sub-split into 2a Configuration space dynamics + 2b Capability accumulation]; Complexity, resilience, and breakdown; Labour, allocation, and what economies actually do; Decision under deep uncertainty; Scoping and growth limits; Foundational meta-theory). Each predecessor paragraph closes with CE\'s specific delta. Includes a "What CE adds" tight list and a note on novelty. Linked from the index, overview, and research-frontier footers.',
      ],
      revised: [
        'Predecessor architecture for CE: Kauffman, Fuller, Walker/Cronin (assembly theory and its 2023–24 reformulation) folded in. James C. Scott folded into the labour-and-allocation cluster on the legibility theme. Taleb dropped — intellectual convergence partial; brand-association cost exceeds lineage benefit for a public-facing page.',
        'CE\'s relationship with Cronin/Walker updated honestly: the 2023–24 work closes part of the gap CE had been citing about Assembly Theory being backward-only. The framings now overlap more than they diverge; the relationship is collaborative rather than corrective.',
        'Bucket counts: 1 established / 19 derived / 9 contested / 1 open. 30 propositions total.',
        'SECTION_PROPOSITIONS updated to surface configuration-generates-configuration in essay sections §4 (configuration-value), §4.5 (configuration-not-information), and §7 (viable-objective).',
      ],
      structural: [
        'Backlinks added from value-option-space, option-space-measurability, option-space-as-chess-moves, and asymmetry-of-option-space-change to configuration-generates-configuration.',
        '/lineage linked from index.astro, /overview footer, /research-frontier footer.',
      ],
    },
  },
  {
    version: 'v0.3.2',
    date: '2026-05-18',
    title: 'Cross-links and navigation closed around the v0.7 push',
    summary: `Mechanical finishing touches on the v0.7 integration. Seven existing propositions gain backlinks to the new v0.7 propositions where the relationship is meaningful in both directions. /overview and /research-frontier now point at /applications/moves alongside the existing route map — the rule's operational surface is now discoverable from both the structural-view modes and the open-boundary mode.`,
    changes: {
      structural: [
        '`work-wrong-question` (P4) and `participation-limits` (P5) → linksTo `labour-as-allocator`. The historical predecessor is now reachable from the propositions it underwrites.',
        '`prevention-over-repair` (P9), `time-asymmetry` (P11), `transition-fragility` (P19), `viable-objective` (P22), and `option-space-as-chess-moves` (P26) → linksTo `asymmetry-of-option-space-change`. The structural justification is now reachable from each proposition that leans on it. Strongest backlink: P22, where the asymmetry is the missing premise that turns no-regret from temperament into derived consequence.',
        '/overview footer extended to surface /applications/moves and /research-frontier alongside /essay and /explore.',
        '/research-frontier gains a paragraph naming /applications/moves as the operational counterpart — "where the framework is least open" set against the frontier as "where it is most".',
      ],
    },
  },
  {
    version: 'v0.3.1',
    date: '2026-05-18',
    title: 'Essay §5 and §7 integrated with the v0.7 propositions',
    summary: `Integration pass on the essay. §5 (work-wrong-question) prose now gestures toward labour-as-allocator's structural distinction — allocation as load-bearing, production as its visible form — rather than re-performing the move implicitly. §7 (viable-objective) prose carries a real drift fix: the section was still shipping the pre-v0.2.0 "maximisation of durable human flourishing" framing even after P22 was reformulated to no-regret in v0.2.0. The Alexander system-prompt summary was updated then; the essay's own prose was missed. §7 now ships the no-regret form and names asymmetry-of-option-space-change as the structural reason for it.`,
    changes: {
      revised: [
        'Essay §5 work-wrong-question — opening flipped to put allocation before production; one sentence added naming the allocator-vs-source distinction; "performative activity" sentence layered with the proposition\'s framing ("an allocator continuing to operate after the thing it was allocating has changed shape"). revisedAt: 2026-05-18.',
        'Essay §7 viable-objective — drift fix replacing "maximisation of durable human flourishing per unit of constrained throughput" with the no-regret form from P22\'s v0.2.0 reframe; new paragraph names asymmetry-of-option-space-change as the structural reason no-regret is operationally tighter than expected-value. Humans foregrounded alongside the wider community of life. keyPoints array updated to match. revisedAt: 2026-05-18.',
        'Alexander system-prompt §5 summary tightened to mention labour-as-allocator. §7 summary was already current from v0.2.0.',
      ],
    },
  },
  {
    version: 'v0.3.0',
    date: '2026-05-18',
    title: 'Labour-as-allocator, the asymmetry, and the rule in operation',
    summary: `Two propositions promoted that the framework had been gesturing at without naming: labour as allocation mechanism (not source of value) and the structural asymmetry between option-space destruction and expansion. With them, work-wrong-question gains its historical reframing and viable-objective's no-regret form becomes a derived consequence rather than a stance. A new /applications/moves surface lands alongside, showing the local Δω rule operating on six worked cases — fossil-fuel infrastructure, antibiotic stewardship, stratospheric aerosol injection, soil-regenerative subsidies, copyright term extension, biodiversity offsetting — with two ambiguous verdicts to demonstrate the rule's edges.`,
    changes: {
      added: [
        '`labour-as-allocator` — labour was historically the mechanism by which people were allocated access to life-supporting configurations under scarcity; it was never the source of value. The conflation was tolerable while the allocator tracked configuration-contribution closely enough. As the composition of scarcity shifts, the allocator and the value-source come apart. Status: contested. Lineage: Polanyi (commodity fiction), Graeber (Debt, Bullshit Jobs), Sahlins, Daly, Fuller.',
        '`asymmetry-of-option-space-change` — destruction of option space is typically fast and local; expansion is typically slow and systemic. The asymmetry is structural (gradient-following build vs gradient-releasing breakdown) and explains why no-regret preservation is the operationally tighter rule, not just a conservative temperament. P22 follows from this asymmetry. Status: derived. Lineage: Holling, Walker & Salt, Aubin, Daly.',
      ],
      structural: [
        'New page `/applications/moves` — the framework in operation. Worked Δω evaluation on six real moves spanning all four verdicts (degrading / preserving / expanding / ambiguous). Includes a "Where this rule runs out" section naming five concrete failure modes of move-level evaluation. Demonstrates the rule deciding things on cases that bite back, including non-biophysical cases (copyright) and genuinely ambiguous ones (SAI, biodiversity offsetting). Linked from the index page.',
        'Bucket counts now: 1 established / 19 derived / 8 contested / 1 open. Total 29 propositions.',
        'Two new propositions added to `SECTION_PROPOSITIONS` (work-wrong-question, universal-participation, viable-objective, what-replaces, inevitability) so Alexander surfaces them where relevant.',
      ],
    },
  },
  {
    version: 'v0.2.0',
    date: '2026-04-30',
    title: 'Observer-relativity, chess-moves, drafts/canon wall collapsed',
    summary: `The framework gains a structural answer to "option space for whom?" via Wolfram-style observer-relativity, and an operational counterpart via local move-evaluation in the spirit of Snowden's next-best-move. P22's viable objective shifts from scalar maximisation to no-regret preservation over moves. Three essay sections rewritten to engage the physics-rigour and decoupling literatures directly. Editorial practice changes: drafts no longer queue behind voice-review for canonical promotion; revisions ship straight to canon with a revisedAt date, surfaced as a UI badge.`,
    changes: {
      added: [
        '`exergy-not-energy` — populates the previously empty `established` bucket. What economic activity actually consumes is exergy, not energy. Energy is conserved.',
        '`binding-constraint` — the operative physical constraints are sink capacity, specific materials, and biosphere integrity, not raw solar influx (~175 PW available vs ~18 TW used).',
        '`option-space-as-chess-moves` — local Δω evaluation as the operational counterpart to non-computable global ω. Lineage: Snowden\'s next best move (Cynefin), Aubin\'s viability theory, Real Options theory. Polychess as the implications-layer teaching device.',
        '`observer-relative-option-space` — R_living(C, B, T) is the slice life-persisting observers access, following Wolfram\'s Observers Like Us. Gives "for whom" a structural answer at category level, not utilitarian aggregation.',
      ],
      revised: [
        'P22 `viable-objective` — from scalar maximisation to no-regret preservation over moves. State-comparison is the static frame; move-evaluation is the dynamic frame. Both needed.',
        'P5 `participation-limits`, P10 `stability-not-stasis`, P16 `money-as-signal`, P19 `transition-fragility` — removes "should/must/require" normative slide; descriptive/predictive throughout. All four gain explicit predictive fields.',
        'P14 `substitution-limits` — sharpened from "substitution is limited" (true but trivial) to specific physical invariants (phosphorus, atmospheric sinks, biodiversity, topsoil). Daly–Solow–Stiglitz framed explicitly.',
        'Essay §1 The Physical Envelope — replaces the "temporarily" weak point; pulls in binding-constraint; uses exergy correctly.',
        'Essay §2 The Accounting Error — engages the decoupling literature (relative/absolute, territorial/consumption-based, Hickel–Kallis); EROI decline is one major factor among several, not monocausal.',
        'Essay §3 Throughput as Proxy — engages the services-economy objection (consumption-based accounting, supply-chain embedding, configuration matters more in services).',
      ],
      structural: [
        '`revisedAt` provenance field added to Proposition and Section types; rendered as a "revised YYYY-MM-DD" badge on /explore and /essay so revision is visible to readers, not just in git.',
        'Drafts/canon wall collapsed in editorial practice. The previous queue ("draft now, voice-review later, then promote") manufactured friction against the living-epistemic-work stance. New rule: ship structural changes straight to canon; drafts become provenance, not pre-canon.',
        'Essay metadata updated to "Living Draft, April 2026" — matches the editorial stance.',
        'Bucket counts now: 1 established / 18 derived / 7 contested / 1 open. All four populated for the first time.',
      ],
    },
  },
  {
    version: 'v0.1.5',
    date: '2025-12-22',
    title: 'Alexander proposition awareness',
    summary: `Alexander, the in-site epistemic guide, becomes proposition-aware: the system prompt receives the propositions relevant to whichever essay section the reader is on, and Alexander references them naturally rather than constantly. Final v0.1 release before the v0.2 push.`,
    changes: {
      structural: [
        'Section-to-proposition mapping in `guide-prompt.ts` so Alexander surfaces the right propositions per section.',
        'Context-handling fixes for "this section" queries.',
      ],
    },
  },
  {
    version: 'v0.1.4',
    date: '2025-12-22',
    title: 'Configuration ≠ Information; the viable objective',
    summary: `Two propositions added that close the v0.1 set at 22 nodes — one disarming the techno-optimist "everything is digitisable" move, one naming what replaces throughput as the unit of success.`,
    changes: {
      added: [
        '`configuration-not-information` — configuration includes bodies, skills, institutions; cannot be reduced to symbols.',
        '`viable-objective` — durable flourishing per unit of bounded throughput (later revised to no-regret form in v0.2.0).',
      ],
    },
  },
  {
    version: 'v0.1.3',
    date: '2025-12-21',
    title: 'Ten more propositions across the framework',
    summary: `Substantial expansion of the proposition set — time asymmetry, displaced costs, contextual scarcity, substitution limits, growth and distributional strain, money as signal, coordination as wealth, the legibility/truth tradeoff, transition fragility, and the choice to ignore physics. Brings the explore surface to twenty nodes.`,
    changes: {
      added: [
        '`time-asymmetry`, `displaced-costs`, `contextual-scarcity`, `substitution-limits`, `growth-masks-strain`, `money-as-signal`, `coordination-wealth`, `legibility-truth-tradeoff`, `transition-fragility`, `ignoring-physics`.',
      ],
    },
  },
  {
    version: 'v0.1.2',
    date: '2025-12-20',
    title: 'Five propositions on memory, complexity, and care',
    summary: `Adds the configuration-maintenance cluster: structural memory, complexity\'s ongoing cost, care as configuration rather than sentiment, the prevention/repair asymmetry, and the distinction between stability and stasis.`,
    changes: {
      added: [
        '`structural-memory`, `complexity-maintenance`, `care-as-configuration`, `prevention-over-repair`, `stability-not-stasis`.',
      ],
    },
  },
  {
    version: 'v0.1.1',
    date: '2025-12-20',
    title: 'Proposition nodes replace the graph',
    summary: `Architectural shift away from a typed-graph data model toward proposition nodes that are self-contained and meaningful in isolation. Links remain non-semantic ("links to" only). Restraint — not expanding surface area prematurely — becomes the design principle.`,
    changes: {
      structural: [
        'Replaces the distinction-network graph data model with proposition nodes carrying surface text + underlying logic + epistemic status.',
        'Five initial v0.1 propositions: `energy-income-inheritance`, `throughput-cost`, `value-option-space`, `work-wrong-question`, `participation-limits`.',
      ],
    },
  },
  {
    version: 'v0.1.0',
    date: '2025-12-19',
    title: 'Initial publication: format exploration',
    summary: `First public version. Establishes the living-epistemic-work format: essay with collapse modes, an in-site epistemic guide (Alexander), and the framing that economics needs a physics-grounded reframe. The essay "Value under Physical Constraint" lands in eleven sections; Alexander handles reader questions in voice; concept popovers surface key terms inline.`,
    changes: {
      structural: [
        'Essay 1 ("Value under Physical Constraint") published in eleven sections with overview / essay / academic collapse modes.',
        'Alexander, the in-site guide, with API-backed conversation, follow-up buttons, and persistent right-hand panel.',
        'Concept popovers in the essay surface key terms inline.',
      ],
    },
  },
];
