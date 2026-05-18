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
        '`asymmetry-of-option-space-change` — destruction of option space is typically fast and local; expansion is typically slow and systemic. The asymmetry is structural (gradient-following build vs gradient-releasing breakdown) and explains why no-regret preservation is the operationally tighter rule, not just a conservative temperament. P22 follows from this asymmetry. Status: derived. Lineage: Holling, Walker & Salt, Aubin, Daly; cited Taleb carefully (different frame).',
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
