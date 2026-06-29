// Proposition Nodes v0.4
// Self-contained, meaningful in isolation, connected by simple links

// The settledness spine. `forming` is the entry rung — thinking that is
// published and live but not yet load-bearing. There is no backstage and no
// "draft": a node enters at `forming` and migrates up the spine in public.
export type EpistemicStatus = 'forming' | 'established' | 'derived' | 'contested' | 'open';

// A single step in a proposition's settledness climb: the version at which it
// entered the given status. The last entry's status is the live one and must
// equal `epistemicStatus`. This is what makes the migration watchable — a node
// is not a fixed label but a path the reader can follow.
export interface StatusStep {
  version: string;       // e.g. 'v0.11.0'
  status: EpistemicStatus;
  note?: string;         // optional one-line reason the status changed
}

// Resolution layers for progressive disclosure — matches the concept-page spec.
// Each proposition can optionally carry four depths of formulation, letting
// the reader (or a mode) surface the one that fits.
export interface ResolutionLayers {
  coreClaim: string;         // The idea, accessibly stated
  formalDefinition: string;  // The precise statement
  implications: string;      // What follows, what changes
  openQuestions?: string;    // What remains unresolved
}

export interface Proposition {
  id: string;
  title: string;

  // The live status — the last rung the node has reached on the settledness
  // spine. Denormalised from statusHistory (= its final entry) so every
  // existing renderer keeps working; keep the two in sync.
  epistemicStatus: EpistemicStatus;

  // The visible climb. Optional during rollout — renderers fall back to the
  // single epistemicStatus when absent. When present, the last entry's status
  // must equal epistemicStatus. A node that has only ever been `forming` has a
  // one-entry history; a node that has migrated shows every step it took.
  statusHistory?: StatusStep[];

  // Surface text: observational, invitational, non-didactic
  surface: string;

  // Underlying propositional structure: explicit, precise
  logic: {
    claim: string;
    premises: string[];
    conclusion: string;
    predictive?: string;  // Optional predictive consequence
  };

  // Progressive-disclosure layers. Optional during rollout — renderers fall
  // back to surface/logic when absent. Populate over time per proposition.
  layers?: ResolutionLayers;

  // ISO date (YYYY-MM-DD) marking the most recent substantive revision to
  // claim/premises/conclusion or surface text. Living-epistemic-work
  // provenance — set when a proposition is added or rewritten, not on
  // typo fixes. Renderers may surface this as a "revised" badge.
  revisedAt?: string;

  // Simple non-semantic links
  linksTo: string[];
}

export const PROPOSITIONS: Proposition[] = [
  {
    id: 'energy-income-inheritance',
    title: 'Energy Income and Inheritance',
    epistemicStatus: 'derived',
    surface: `There is something slightly misleading about the way modern economies speak about growth.

For most of human history, energy arrived as a steady flow. What could be used this year looked much like what would be available next year. Planning, scarcity, and effort all took place within that rhythm.

Industrial society changed this without ever fully renaming it. Large parts of what now counts as ordinary economic activity depend on releasing energy that was accumulated over vast stretches of time and then spent very quickly.

The language of income still works. Budgets balance. Productivity graphs rise and fall. But the meaning of those numbers has quietly shifted.

Once you notice this, many familiar arguments begin to feel oddly misaligned.`,
    logic: {
      claim: 'Modern economies behave as though they are living on income while materially spending down finite energy stocks.',
      premises: [
        'Fossil fuels are finite energy accumulations formed over geological time.',
        'Their use is treated in economic accounting as part of ordinary ongoing production.',
        'Income and savings have different implications for long-term stability.'
      ],
      conclusion: 'Economic signals conflate liquidation with sustainable productivity.',
      predictive: 'As energy stocks decline, growth slows independently of managerial or policy competence.'
    },
    layers: {
      coreClaim: 'Modern economies treat spending fossil savings as if it were earning income. It isn\'t.',
      formalDefinition: 'Modern economies behave as though they are living on income while materially spending down finite energy stocks accumulated over geological time.',
      implications: 'Growth slows as stocks decline, independently of managerial or policy competence. Productivity signals mislead: what looks like earned value is partly liquidation of an inheritance.',
      openQuestions: 'How much of recent growth is inheritance-dependent, and at what rate remaining stocks tighten, are live empirical questions.'
    },
    linksTo: ['throughput-cost', 'value-option-space']
  },

  {
    id: 'throughput-cost',
    title: 'Throughput and Cost',
    epistemicStatus: 'derived',
    surface: `Economic activity is often described in terms of how much is happening: how much energy is used, how much material is processed, how many hours are worked.

This focus made sense when energy was cheap and abundant enough that its use rarely constrained outcomes. Under those conditions, doing more often coincided with achieving more.

As those conditions change, something becomes clearer. Energy and materials do not disappear when they are used. They are transformed, dissipated, and made unavailable for other purposes.

What increases is not value by default, but expenditure.`,
    logic: {
      claim: 'Material and energy throughput measure cost, not success.',
      premises: [
        'Throughput corresponds to energy dissipation and material transformation.',
        'Dissipation reduces future availability.',
        'Value depends on the durability and usefulness of resulting configurations.'
      ],
      conclusion: 'High throughput can indicate waste as easily as achievement.'
    },
    layers: {
      coreClaim: 'What you use up isn\'t what you have. Throughput is a cost, not a measure of success.',
      formalDefinition: 'Material and energy throughput measure cost, not success. Value depends on the durability and usefulness of the resulting configurations.',
      implications: 'High throughput can indicate waste as easily as achievement. Measuring productivity via throughput systematically rewards dissipation.',
      openQuestions: 'What measures capture configuration quality directly, rather than relying on throughput as a proxy? See option-space-measurability.'
    },
    linksTo: ['energy-income-inheritance', 'value-option-space']
  },

  {
    id: 'value-option-space',
    title: 'Value and Future Option Space',
    epistemicStatus: 'contested',
    surface: `Living systems persist by making the future easier to inhabit.

A forest that stabilises soil, a skill that shortens learning time, a language that enables coordination—none of these consume much energy once established, yet all make many future actions possible that were previously difficult or impossible.

Some arrangements do the opposite. They produce short-term gains while narrowing what can be done next, often by creating dependencies, fragility, or irreversible damage.

If value exists anywhere beyond immediate preference, it appears here.`,
    logic: {
      claim: 'Value consists in configurations that expand future option space under bounded energy flux.',
      premises: [
        'Life maintains local order to preserve future action possibilities.',
        'Configurations shape which future states remain reachable.',
        'Energy availability is bounded over time.'
      ],
      conclusion: 'Configurations that expand future options are value-positive; those that contract them are value-negative.'
    },
    layers: {
      coreClaim: 'Value is about what enables future possibilities, not what gets consumed.',
      formalDefinition: 'Value = configurations that increase future option space for living systems under bounded energy flux.',
      implications: 'This distinguishes value from price, preference, labour, or throughput. Short-term gains can be value-negative if they reduce future configurability.',
      openQuestions: 'How do we measure option space? Over what time horizons? How do we handle trade-offs between different living systems? See option-space-measurability.'
    },
    linksTo: ['throughput-cost', 'work-wrong-question', 'participation-limits', 'configuration-generates-configuration', 'infinite-game']
  },

  {
    id: 'work-wrong-question',
    title: 'Why Work Stops Being the Right Question',
    epistemicStatus: 'derived',
    surface: `For a long time, work solved two problems at once. It produced what people needed, and it determined who was allowed access to those needs.

As long as those functions aligned, tying survival to labour appeared both practical and fair.

That alignment is loosening. Many necessities can now be produced with little human labour, while many activities that matter most to long-term stability—care, learning, coordination—do not resemble jobs in any conventional sense.

Under these conditions, societies often respond by inventing activity whose main purpose is to justify entitlement rather than to improve outcomes.`,
    logic: {
      claim: 'When labour is used as the gatekeeper of participation, misaligned incentives produce performative work.',
      premises: [
        'Labour historically linked production and access.',
        'Automation decouples production from labour input.',
        'Access remains conditional on labour.'
      ],
      conclusion: 'Activity is generated to satisfy the condition rather than the need.'
    },
    layers: {
      coreClaim: 'When survival is tied to labour but production no longer needs labour, work becomes something other than productive activity.',
      formalDefinition: 'When labour is used as the gatekeeper of participation, misaligned incentives produce performative work.',
      implications: 'Activity is generated to satisfy the access-condition rather than underlying need. The mismatch grows as automation advances.'
    },
    linksTo: ['value-option-space', 'participation-limits', 'labour-as-allocator']
  },

  {
    id: 'participation-limits',
    title: 'Participation within Physical Limits',
    epistemicStatus: 'contested',
    surface: `Any economy that intends to persist must decide how people remain part of it.

Guaranteeing participation does not mean promising comfort, abundance, or uniform outcomes. It means ensuring that exclusion is not used as the primary means of coordination.

When participation is bounded by physical reality rather than enforced scarcity, contribution can be aligned with what actually improves future conditions rather than with what merely satisfies accounting proxies.

Scarcity remains. Trade-offs remain. What changes is how they are handled.`,
    logic: {
      claim: 'Economies that maintain long-term social stability tend to decouple basic participation from labour performance.',
      premises: [
        'Long-term social stability depends on continued broad-based participation.',
        'Automation and energy constraints are decoupling production from human labour input.',
        'Economies that use deprivation as the primary participation-enforcement mechanism accumulate instability faster than the instability they prevent.'
      ],
      conclusion: 'Under physical constraint, economies that condition basic access on labour tend to accumulate instability; those that decouple access from labour tend to persist.',
      predictive: 'The correlation between coercive-labour arrangements and system instability will strengthen as automation and energy constraints both tighten.'
    },
    layers: {
      coreClaim: 'Economies that persist find ways for everyone to participate without making participation depend on forced labour.',
      formalDefinition: 'Economies that maintain long-term social stability tend to decouple basic participation from labour performance.',
      implications: 'Deprivation as a coordination mechanism accumulates instability faster than the instability it prevents. Economies relying on it become harder to sustain over time.',
      openQuestions: 'What non-coercive coordination mechanisms scale without falling back on deprivation is a live research and design question.'
    },
    revisedAt: '2026-04-29',
    linksTo: ['value-option-space', 'work-wrong-question', 'labour-as-allocator', 'coordination-as-move-evaluation']
  },

  // --- v0.2 additions ---

  {
    id: 'structural-memory',
    title: 'Economies Remember Through Structure',
    epistemicStatus: 'derived',
    surface: `Societies remember in more ways than one.

Some memory lives in people: skills, habits, expectations. Some lives in things: buildings, tools, institutions, laws. Much of it is not written down at all, but embedded in how easily certain actions can be taken and how difficult others become.

When these structures are well aligned with reality, they make sensible behaviour easy. When they are misaligned, effort increases while outcomes worsen.

An economy is not just a system of exchange. It is a system of memory.`,
    logic: {
      claim: 'Economic systems encode past decisions as structural memory that shapes future behaviour.',
      premises: [
        'Configurations persist over time and constrain action.',
        'Institutions and infrastructures embody accumulated choices.',
        'Behaviour responds to ease and friction more than intention.'
      ],
      conclusion: 'Misaligned structures perpetuate errors even when intentions improve.'
    },
    layers: {
      coreClaim: 'Economies remember through buildings, institutions, and habits — not just through what people think.',
      formalDefinition: 'Economic systems encode past decisions as structural memory that shapes future behaviour.',
      implications: 'Even when intentions improve, misaligned structures continue to produce misaligned outcomes. Changing behaviour requires changing the embedded friction, not just persuading people.'
    },
    linksTo: ['value-option-space', 'complexity-maintenance']
  },

  {
    id: 'complexity-maintenance',
    title: 'Complexity Has a Maintenance Cost',
    epistemicStatus: 'contested',
    surface: `Complex systems feel powerful when they are first built.

They coordinate large populations, move resources efficiently, and solve problems that once seemed impossible. Over time, however, something quieter happens. Keeping the system running begins to require more effort, more oversight, more energy.

When the surrounding conditions are generous, this cost stays hidden. When they tighten, complexity starts to weigh on the system that produced it.

Complexity is never free. It borrows from the future.`,
    logic: {
      claim: 'Increasing complexity carries an ongoing maintenance cost that grows over time.',
      premises: [
        'Complex systems require coordination, monitoring, and repair.',
        'Maintenance consumes energy and attention.',
        'Energy income is bounded.'
      ],
      conclusion: 'Excess complexity can reduce net capacity even if it once increased it.',
      predictive: 'Late-stage systems experience rising overhead and declining flexibility.'
    },
    layers: {
      coreClaim: 'Complex systems are powerful at first, but keeping them running gets more expensive over time.',
      formalDefinition: 'Increasing complexity carries an ongoing maintenance cost that grows relative to the benefits it produces.',
      implications: 'Late-stage systems experience rising overhead and declining flexibility. Energy once available for new capabilities gets consumed by maintenance.',
      openQuestions: 'Whether this pattern applies as a general law or only in specific conditions — Tainter\'s thesis is contested in historiography — remains open.'
    },
    linksTo: ['energy-income-inheritance', 'structural-memory', 'care-as-configuration']
  },

  {
    id: 'care-as-configuration',
    title: 'Care as Configuration, Not Sentiment',
    epistemicStatus: 'derived',
    surface: `Care is often spoken about in emotional terms, as something personal or moral.

But care also has a structural dimension. It preserves capacity. It prevents damage from becoming irreversible. It keeps options open that would otherwise close quietly and permanently.

When care is absent, systems do not fail immediately. They degrade. Possibilities narrow. Recovery becomes expensive or impossible.

Seen this way, care is not a luxury. It is a form of configuration maintenance.`,
    logic: {
      claim: 'Care functions as configuration maintenance that preserves future option space.',
      premises: [
        'Living systems degrade without ongoing attention.',
        'Early intervention prevents compounding damage.',
        'Restoration costs exceed maintenance costs.'
      ],
      conclusion: 'Care is value-positive even when it produces no immediate output.'
    },
    layers: {
      coreClaim: 'Care is not just sentiment — it is maintenance of the arrangements that keep possibility open.',
      formalDefinition: 'Care functions as configuration maintenance that preserves future option space.',
      implications: 'What looks like emotional labour is also structural work. Systems without adequate care degrade — possibilities narrow silently until recovery becomes expensive or impossible.'
    },
    linksTo: ['value-option-space', 'complexity-maintenance', 'prevention-over-repair']
  },

  {
    id: 'prevention-over-repair',
    title: 'Prevention Is Cheaper Than Repair (But Harder to See)',
    epistemicStatus: 'derived',
    surface: `Many of the most important economic actions leave little trace.

A problem that never materialises does not show up in statistics. A crisis that is quietly avoided rarely becomes a headline. What remains visible is the effort that follows failure, not the attention that prevented it.

This creates a bias. Systems that reward visible response over quiet prevention slowly train themselves to fail first and fix later.

Over time, this is expensive.`,
    logic: {
      claim: 'Preventive actions generate more value than reactive ones but are systematically undervalued.',
      premises: [
        'Prevention avoids irreversible damage.',
        'Avoided costs are difficult to attribute.',
        'Economic signals favour visible activity.'
      ],
      conclusion: 'Systems drift toward reactive expenditure even when it is inefficient.'
    },
    layers: {
      coreClaim: 'What\'s prevented never becomes visible — so systems that reward response over prevention accumulate hidden cost.',
      formalDefinition: 'Preventive actions generate more value than reactive ones but are systematically undervalued because avoided costs are invisible to standard measures.',
      implications: 'Systems drift toward reactive expenditure even when it is inefficient. The invisible nature of prevention\'s payoff is a measurement problem, not a value problem.'
    },
    linksTo: ['care-as-configuration', 'throughput-cost', 'asymmetry-of-option-space-change']
  },

  {
    id: 'stability-not-stasis',
    title: 'Stability Is Not Stasis',
    epistemicStatus: 'derived',
    surface: `Stability is often mistaken for stillness.

In living systems, stability comes from continual adjustment. Forests shift, bodies adapt, languages evolve. What remains stable is not the arrangement, but the ability to respond without breaking.

Economic systems that confuse stability with freezing existing structures become brittle. When conditions change, they crack rather than flex.

A stable economy is one that keeps moving—carefully.`,
    logic: {
      claim: 'Stability in living and social systems emerges from adaptive capacity rather than static preservation.',
      premises: [
        'Environments change over time at scales relevant to any persistent system.',
        'Systems with fixed structures resist adjustment and accumulate mismatch between form and conditions.',
        'Systems with adaptive capacity can preserve function while adjusting form.'
      ],
      conclusion: 'Systems that persist under changing conditions exhibit adaptive capacity; those that prioritise preservation of form become brittle.',
      predictive: 'Systems facing regime-level environmental or technological change will show differential persistence correlated with adaptive capacity.'
    },
    layers: {
      coreClaim: 'Stability doesn\'t mean standing still — it means being able to move without breaking.',
      formalDefinition: 'Stability arises from adaptive capacity, not static preservation.',
      implications: 'Systems that confuse stability with freezing existing structures become brittle. Those that adapt preserve function across varying conditions.'
    },
    revisedAt: '2026-04-29',
    linksTo: ['value-option-space', 'structural-memory']
  },

  // --- v0.3 additions ---

  {
    id: 'time-asymmetry',
    title: 'Time Is Not Symmetric',
    epistemicStatus: 'derived',
    surface: `Economic decisions are often discussed as if time were neutral.

Costs and benefits are discounted, averaged, or projected forward as though losses and gains could be freely exchanged across decades. Yet many changes do not reverse. Forests regrow slowly, if at all. Species vanish permanently. Skills atrophy. Trust erodes quietly.

Time does not treat all actions equally. Some close doors forever.`,
    logic: {
      claim: 'Economic effects are time-asymmetric; losses are often irreversible while gains are not.',
      premises: [
        'Physical and biological processes are path-dependent.',
        'Some damages permanently reduce future option space.',
        'Discounting obscures irreversibility.'
      ],
      conclusion: 'Accounting systems that treat time symmetrically misprice risk.'
    },
    layers: {
      coreClaim: 'Some damages cannot be undone. Time is not symmetric for economic decisions.',
      formalDefinition: 'Economic effects are time-asymmetric; losses are often irreversible while gains are not.',
      implications: 'Accounting systems that discount or average across time misprice risk, because discounting assumes reversibility that many physical and ecological processes do not provide.'
    },
    linksTo: ['value-option-space', 'prevention-over-repair', 'asymmetry-of-option-space-change']
  },

  {
    id: 'displaced-costs',
    title: 'Not All Costs Appear at the Point of Exchange',
    epistemicStatus: 'derived',
    surface: `Many transactions look clean at the moment they occur.

Payment is made. Goods change hands. Accounts balance. What does not appear is what has been displaced: the wear transferred elsewhere, the waste deferred, the future constrained.

Costs often arrive later, or in places no longer connected to the original decision.`,
    logic: {
      claim: 'Significant costs are displaced in time, space, or system boundaries.',
      premises: [
        'Physical effects propagate beyond transaction boundaries.',
        'Markets price what is legible, not what is distant.',
        'Deferred costs compound.'
      ],
      conclusion: 'Local optimisation creates global instability.'
    },
    layers: {
      coreClaim: 'Not every cost of a transaction appears at the point of exchange — many are paid elsewhere, by someone else, later.',
      formalDefinition: 'Significant costs are displaced in time, space, or system boundaries.',
      implications: 'Local optimisation creates global instability. Costs deferred compound; costs transferred arrive without the history that would let them be priced correctly.'
    },
    linksTo: ['throughput-cost', 'time-asymmetry', 'prevention-over-repair']
  },

  {
    id: 'contextual-scarcity',
    title: 'Scarcity Is Contextual, Not Absolute',
    epistemicStatus: 'derived',
    surface: `Scarcity is usually spoken of as a fixed condition.

In practice, it shifts with technology, organisation, and configuration. What is scarce in one arrangement becomes abundant in another. What seems plentiful can vanish when coordination fails.

Scarcity is not simply "how much exists". It is how easily something can be accessed, reused, or substituted.`,
    logic: {
      claim: 'Scarcity depends on configuration, not just quantity.',
      premises: [
        'Access and substitution affect availability.',
        'Configuration alters effective supply.',
        'Breakdown increases scarcity without reducing stock.'
      ],
      conclusion: 'Managing scarcity requires managing arrangements, not just extraction.'
    },
    layers: {
      coreClaim: 'Scarcity isn\'t fixed — it depends on how things are arranged, not just how much exists.',
      formalDefinition: 'Scarcity depends on configuration, not just quantity.',
      implications: 'Managing scarcity requires managing arrangements — coordination, access, substitution — not only extraction or production.'
    },
    linksTo: ['value-option-space', 'coordination-wealth']
  },

  {
    id: 'substitution-limits',
    title: 'Substitution Has Limits',
    epistemicStatus: 'contested',
    surface: `Technological optimism often rests on substitution.

If one resource runs short, another will replace it. If one process becomes expensive, a new one will emerge. This has sometimes been true — but not without friction, delay, or loss.

Some substitutions are slow. Some are partial. Some trade one constraint for another.`,
    logic: {
      claim: 'Substitution is empirically bounded by specific physical and ecological invariants that no technology has demonstrated the ability to circumvent.',
      premises: [
        'Substitution has succeeded historically for many resources (whale oil → petroleum, horses → engines, timber → steel) where the function depended on a class of physical property rather than a specific atom or sink.',
        'Some functions depend on specific physical invariants: phosphorus cannot be synthesised, only extracted; atmospheric and oceanic sinks for CO₂ have no technological replicate at planetary scale; extinct species cannot be re-created; deep fertile topsoil regenerates over millennia, not decades.',
        'Manufactured substitutes for invariant-dependent functions (hydroponic agriculture, direct-air capture, geoengineering) carry their own dependencies on inputs that circle back to the same invariants.'
      ],
      conclusion: 'Relying on substitution for the specific invariants currently binding (phosphorus stocks, atmospheric sink capacity, biodiversity, topsoil, fresh water) is not merely risky but structurally incoherent. The strong-sustainability position (Daly, Hickel) is the defensible default; weak-sustainability claims (Solow, Stiglitz) generalise from a substitution record that does not transfer to invariant-dependent cases.',
      predictive: 'Policy and investment built on assumed substitution of currently-binding invariants will fail at the substitution boundary; the failure will not be gradual but threshold-like, since invariants do not degrade smoothly.'
    },
    layers: {
      coreClaim: 'Technology has found substitutes before — but not for everything, not always, and not without loss. Some atoms, some sinks, some ecological functions have no demonstrated technological replacement.',
      formalDefinition: 'Substitution is empirically bounded by specific physical and ecological invariants that no technology has demonstrated the ability to circumvent. The Daly–Solow–Stiglitz debate (1970s–present) crystallised this as the strong-vs-weak sustainability disagreement; the strong-sustainability position is defended by the empirical specifics (phosphorus, atmospheric sinks, biodiversity, topsoil), not by a general principle.',
      implications: 'Cornucopian techno-optimism generalises from a real but bounded substitution record (energy carriers, materials with shared physical properties) to a domain (invariant-dependent functions) where the record does not apply. The cornucopian extrapolation is a category error, not just an empirical mistake.',
      openQuestions: 'Which currently-cited invariants are truly non-substitutable versus not-yet-substituted is a live empirical question — the strong-sustainability case is empirical, not categorical, and remains testable as new technologies arrive. The case is strongest for phosphorus and atmospheric sinks; somewhat softer for individual species (functional redundancy) and topsoil (rebuildable but slow).'
    },
    revisedAt: '2026-04-29',
    linksTo: ['energy-income-inheritance', 'transition-fragility', 'binding-constraint', 'displaced-costs']
  },

  {
    id: 'growth-masks-strain',
    title: 'Growth Masks Distributional Strain',
    epistemicStatus: 'derived',
    surface: `When total output increases, tensions often soften.

Losses in one place are offset by gains elsewhere. Conflict can be deferred. Inequality feels tolerable when absolute conditions improve.

When growth slows, these buffers vanish. Distributional questions move from background noise to central concern.`,
    logic: {
      claim: 'Growth suppresses visibility of distributional stress.',
      premises: [
        'Expanding systems absorb conflict.',
        'Stagnant systems expose allocation choices.',
        'Energy constraints limit expansion.'
      ],
      conclusion: 'Slowing growth forces explicit value decisions.'
    },
    layers: {
      coreClaim: 'Growth hides distributional conflict — when it stops, the conflict becomes visible.',
      formalDefinition: 'Growth suppresses visibility of distributional stress.',
      implications: 'Expanding systems can defer allocation conflict by redistributing gains. Stagnant systems force explicit decisions. Slowing growth is not just an economic issue — it exposes political choices.'
    },
    linksTo: ['energy-income-inheritance', 'participation-limits']
  },

  {
    id: 'money-as-signal',
    title: 'Money Is a Signal, Not a Substance',
    epistemicStatus: 'derived',
    surface: `Money coordinates action by compressing complexity.

Prices summarise many variables into a single figure. This is powerful, but also dangerous. When the signal detaches from physical reality, coordination continues even as the underlying system degrades.

The signal remains legible long after its referent has changed.`,
    logic: {
      claim: 'Monetary signals track physical reality only insofar as feedback mechanisms maintain their correspondence.',
      premises: [
        'Prices abstract away material specifics by design.',
        'Feedback delays between monetary and physical quantities allow divergence to accumulate.',
        'Market optimisation targets signals (prices) rather than substrates (physical stocks, flows, or sinks).'
      ],
      conclusion: 'Absent explicit feedback between monetary signals and physical accounting, monetary signals lose informativeness about physical state over time.',
      predictive: 'Economies whose monetary signals are detached from physical feedback mechanisms will show growing divergence between financial performance and physical performance — eventually resolving in either re-alignment or disorderly correction.'
    },
    layers: {
      coreClaim: 'Prices are signals about physical reality — and like any signal, they can drift from what they\'re meant to track.',
      formalDefinition: 'Monetary signals track physical reality only insofar as feedback mechanisms maintain their correspondence.',
      implications: 'Without explicit feedback between monetary signals and physical accounting, monetary signals lose informativeness over time. Coordination continues on price, even as the underlying system degrades.',
      openQuestions: 'What feedback mechanisms could re-anchor monetary signals to physical reality, and how disruptive that re-anchoring would be, remain open.'
    },
    revisedAt: '2026-04-29',
    linksTo: ['throughput-cost', 'legibility-truth-tradeoff']
  },

  {
    id: 'coordination-wealth',
    title: 'Coordination Is a Form of Wealth',
    epistemicStatus: 'derived',
    surface: `Some societies achieve more with less.

They waste less energy resolving conflict, duplicating effort, or repairing avoidable damage. Much of their "wealth" lies not in assets, but in shared understanding and trust.

Coordination reduces the cost of acting together.`,
    logic: {
      claim: 'Effective coordination reduces throughput requirements.',
      premises: [
        'Misalignment generates friction.',
        'Trust lowers transaction costs.',
        'Coordination compounds over time.'
      ],
      conclusion: 'Social coherence is configuration-positive.'
    },
    layers: {
      coreClaim: 'Societies that coordinate well achieve more with less.',
      formalDefinition: 'Effective coordination reduces throughput requirements.',
      implications: 'Trust, shared understanding, and well-designed institutions are configuration-positive: they compound over time and do their work with little energy input. Friction from misalignment is where throughput gets spent uselessly.'
    },
    linksTo: ['structural-memory', 'participation-limits', 'care-as-configuration', 'coordination-as-move-evaluation']
  },

  {
    id: 'legibility-truth-tradeoff',
    title: 'Legibility Trades Off Against Truth',
    epistemicStatus: 'contested',
    surface: `Systems prefer what can be counted.

Simple metrics travel well. They fit dashboards, headlines, incentives. Unfortunately, the most important things often resist simplification.

As legibility increases, nuance is lost. What cannot be seen stops being protected.`,
    logic: {
      claim: 'Metrics simplify reality at the cost of accuracy.',
      premises: [
        'Measurement requires reduction.',
        'Incentives follow metrics.',
        'Unmeasured factors decay.'
      ],
      conclusion: 'Over-legibility accelerates hidden loss.'
    },
    layers: {
      coreClaim: 'What can be counted gets measured. What can\'t, gets ignored — until its absence becomes a crisis.',
      formalDefinition: 'Metrics simplify reality at the cost of accuracy; incentives follow metrics; unmeasured factors decay.',
      implications: 'Over-legibility accelerates hidden loss. The cost is paid by what the metric didn\'t see until it\'s gone.',
      openQuestions: 'Whether better metrics solve this, or whether some values must remain partially illegible to remain what they are, is philosophically live.'
    },
    linksTo: ['complexity-maintenance', 'prevention-over-repair', 'money-as-signal']
  },

  {
    id: 'transition-fragility',
    title: 'Transitions Are the Most Fragile Phase',
    epistemicStatus: 'derived',
    surface: `Stable systems tolerate inefficiency.

Unstable ones do not. During transitions, buffers shrink. Old supports weaken before new ones fully form. Errors that were once survivable become critical.

This is when accounting honesty matters most.`,
    logic: {
      claim: 'System transitions amplify error sensitivity and narrow the margin for correction.',
      premises: [
        'During transitions, redundancy in the outgoing configuration declines before the incoming configuration matures.',
        'New configurations have untested failure modes and smaller recovery buffers.',
        'Environmental and systemic shocks continue independently of transition state.'
      ],
      conclusion: 'Transitional periods are disproportionately sensitive to error, and trajectories through them show high sensitivity to initial conditions and early decisions.',
      predictive: 'Systems traversing transitions with the error-handling tolerances appropriate to steady-state operation fail at rates substantially higher than equivalent non-transitional failures.'
    },
    layers: {
      coreClaim: 'Systems changing form are more fragile than systems at rest — errors that were survivable become critical.',
      formalDefinition: 'System transitions amplify error sensitivity and narrow the margin for correction.',
      implications: 'Transitional periods benefit from conservative assumptions because small mistakes compound faster when buffers have thinned. The right tolerances for a steady-state system are wrong for a transitioning one.'
    },
    revisedAt: '2026-04-29',
    linksTo: ['energy-income-inheritance', 'complexity-maintenance', 'stability-not-stasis', 'asymmetry-of-option-space-change']
  },

  {
    id: 'ignoring-physics',
    title: 'Ignoring Physics Is Still a Choice',
    epistemicStatus: 'derived',
    surface: `No economy escapes physical reality.

What differs is whether limits are acknowledged early or imposed later. Ignoring constraints does not remove them. It merely postpones their effects until they arrive uninvited.

Denial is not neutral. It is a decision with predictable consequences.`,
    logic: {
      claim: 'Disregarding physical limits produces delayed but amplified failure.',
      premises: [
        'Physical constraints operate regardless of belief.',
        'Delay increases system brittleness.',
        'Correction costs rise over time.'
      ],
      conclusion: 'Early alignment is cheaper than forced adjustment.'
    },
    layers: {
      coreClaim: 'Denying physical limits doesn\'t remove them. It delays when they arrive and makes arrival more expensive.',
      formalDefinition: 'Disregarding physical limits produces delayed but amplified failure.',
      implications: 'Early alignment with physical constraint is cheaper than forced adjustment. Denial is a choice with predictable consequences, not a neutral stance.'
    },
    linksTo: ['energy-income-inheritance', 'time-asymmetry', 'transition-fragility']
  },

  // --- v0.4 additions ---

  {
    id: 'configuration-not-information',
    title: 'Configuration Is Not Information Alone',
    epistemicStatus: 'contested',
    surface: `There is a tempting shortcut in discussions of configuration.

If value lies in arrangement rather than material, perhaps everything can be digitised. Data is cheap to copy. Symbols travel freely. The constraints that bind physical systems might be escaped through abstraction.

This is a misunderstanding. Configuration includes bodies, skills, relationships, institutions, infrastructures, and ecological arrangements. Most of it cannot be uploaded. All of it must be maintained.

A forest is not a database of trees. A skill is not a video of someone performing it. A functioning institution is not its org chart.

Configuration that ignores its physical substrate is not configuration at all. It is description.`,
    logic: {
      claim: 'Configuration is broader than information and cannot be reduced to symbols or data.',
      premises: [
        'Information can be copied at near-zero marginal cost; configuration cannot.',
        'Configuration includes physical arrangements with ongoing maintenance requirements.',
        'Digitisation preserves description but not function.'
      ],
      conclusion: 'Optimism about escaping physical constraints through abstraction is misplaced.'
    },
    layers: {
      coreClaim: 'Not everything valuable can be digitised. Configuration includes bodies, skills, institutions — things that must be maintained, not just copied.',
      formalDefinition: 'Configuration is broader than information and cannot be reduced to symbols or data.',
      implications: 'Optimism about escaping physical constraints through abstraction is misplaced. Information is cheap to copy; configuration is not. Digitisation preserves description, not function.',
      openQuestions: 'Where exactly the boundary lies between configuration and information, and how to measure the difference, remains under-specified.'
    },
    linksTo: ['value-option-space', 'complexity-maintenance', 'care-as-configuration']
  },

  // --- v0.5 additions (April 2026, from 6-critic review) ---

  {
    id: 'option-space-measurability',
    title: 'How to Measure Option Space',
    epistemicStatus: 'open',
    surface: `If value is configurations that expand future option space, a practical question follows: how is option space measured?

The question splits in two.

*Global* option space — a scalar over a configuration capturing how much future possibility a state contains — remains genuinely open. Backward-looking measures exist: Cronin's Assembly Theory counts the minimum steps required to construct an object; Bennett's logical depth captures computational history embedded in an arrangement. Both measure history, not forward potential. Candidate forward-looking formalisations exist — reachable configurations under a bounded exergy budget, Kauffman's adjacent possible, state-space cones in control theory — but none has been shown to be economically operational at the state level.

*Local* option space — the differential effect of a move on the reachable set — is tractable. Δω evaluation requires only directional comparison between pre-move and post-move reachable sets, not a global scalar. Mass extinction, monoculture conversion, fossil-fuel lock-in to 4°C are unambiguously option-space-degrading even where global ω cannot be computed. See option-space-as-chess-moves.

What remains open is the global state measure. Until it lands, "option space" at the state level functions as a direction for measurement rather than a measurement. At the move level, the framework already ships with a usable decision procedure.`,
    logic: {
      claim: 'Global option space as a state measure currently lacks a rigorous measurement procedure suitable for economic use; local Δω evaluation as a move measure is operational.',
      premises: [
        'Value as defined in this work depends on option space.',
        'Backward-looking complexity measures (Assembly Index, logical depth) capture construction history, not forward potential.',
        'Candidate forward-looking state measures exist but have not been demonstrated to be economically operational.',
        'Local Δω evaluation does not require a global state measure — it requires only directional comparison between pre-move and post-move reachable sets (option-space-as-chess-moves).'
      ],
      conclusion: 'The state-level measurement of option space remains a genuinely open research problem; the move-level measurement is already operational.',
      predictive: 'Operationalising the state-level measure is a prerequisite for state-comparison applications (ranking configurations, scoring economies). Move-evaluation applications (policy choices, infrastructure commitments, irreversibility detection) do not wait on it.'
    },
    layers: {
      coreClaim: 'Option space at the state level isn\'t measured yet. Option space at the move level — directionally — already is.',
      formalDefinition: 'Global option space as a scalar over configurations lacks a rigorous measurement procedure; existing complexity measures (Assembly Index, logical depth) are backward-looking. Local Δω evaluation on R_living(C, B, T) — the directional comparison between pre-move and post-move reachable sets — is operational, per option-space-as-chess-moves.',
      implications: 'The framework is prescriptive at the move level (next-best-move evaluation against R_living) and diagnostic at the state level (no scalar to maximise across configurations). State-comparison applications wait on the global measure; move-evaluation applications do not.',
      openQuestions: 'Candidate global measures (reachable configurations under an exergy budget, Kauffman\'s adjacent possible, Assembly-weighted reachable sets) exist. None has been shown to be economically operational at state level. This — the global state measure — is the central remaining open problem. The move-level measure is no longer open.'
    },
    revisedAt: '2026-05-10',
    linksTo: ['value-option-space', 'viable-objective', 'configuration-not-information', 'option-space-as-chess-moves', 'configuration-generates-configuration']
  },

  {
    id: 'viable-objective',
    title: 'The Viable Objective',
    epistemicStatus: 'contested',
    surface: `If throughput cannot serve as the measure of success, what replaces it?

The instinctive move is to nominate a new quantity to maximise — durable flourishing, well-being, sustainability, configuration quality. Each of these names something real, but each runs into the same trouble: maximising a single scalar across many living systems requires an aggregation rule, and any aggregation rule trades off against some class of life it weighs lightly.

A different shape is available. Instead of asking *which configuration is best*, ask *which moves preserve the future*. The objective becomes a no-regret criterion over moves rather than an optimisation over states.

Prefer changes that keep the reachable set of life-supporting configurations open for all major classes of life across all relevant horizons. Reject changes that asymptotically close that reachable set for any such class at any such horizon.

This is closer to medicine's *first do no harm* than to economics' *maximise utility*. It tolerates incomparability between dominant configurations — it does not need to pick a winner among non-dominated states. It only needs to refuse moves that close categorical possibility.

Under this framing, the economy does not grow or shrink as a whole. It reorients toward moves that keep major classes of life in play.`,
    logic: {
      claim: 'A viable economic objective under physical constraint is no-regret preservation of reachable life-supporting configurations across all major classes of life and all relevant horizons.',
      premises: [
        'Throughput is a cost, not a benefit; the question is what is preserved per unit of cost.',
        'Single-scalar maximisation requires an aggregation rule that trades off against some class of life it weighs lightly.',
        'Move-evaluation is implementable where state-comparison is not (see option-space-as-chess-moves).',
        'No-regret over moves tolerates incomparability between dominant states — it only refuses moves that close categorical possibility.'
      ],
      conclusion: 'Prefer configuration-changes that preserve the reachable set of life-supporting configurations for all major classes of life across all relevant horizons; reject configuration-changes that asymptotically collapse that reachable set for any such class at any such horizon.',
      predictive: 'Decision-procedures organised around this criterion will favour reversibility, redundancy, restoration, and structural preservation over speed, accumulation, and short-term yield. They will also produce convergent verdicts across observers on the most consequential cases — irreversible loss, structural lock-in, asymptotic collapse — even where state-comparison remains contested.'
    },
    layers: {
      coreClaim: 'The objective is not a quantity to maximise but a class of moves to refuse: anything that asymptotically closes future possibility for major classes of life. Closer to first-do-no-harm than to maximise-this-number.',
      formalDefinition: 'A viable economic objective is a no-regret preservation criterion over moves: prefer Δω(move) ≥ 0 on R_living(C, B, T) for every major class of life and every relevant horizon T; reject any move that asymptotically empties R_living for some such class at some such horizon. State-comparison is the static frame (partial order over configurations); move-evaluation is the dynamic frame (no-regret over horizons). Both are needed.',
      implications: 'The economy does not grow or shrink as a whole. It reorients toward moves that keep major classes of life in play. Earlier framings of this proposition as scalar maximisation ("maximise durable flourishing per unit of throughput") were tighter to read but smuggled in an aggregation rule the criterion does not require. The no-regret form survives observer-relativity (different observer-classes can disagree on optimal states and still agree on which moves are option-space-degrading) and matches the chess-moves operationalisation.',
      openQuestions: 'The operational definition of "major class of life" — phylum-level, functional ecological role, capacity for distinction-making? Selection of the relevant horizon for any specific decision (default: the longest horizon any major class depends on, but this is contestable). Gradations between elimination and narrowing of R_living. What to do when no available move avoids long-horizon collapse — probably a fallback like "minimise the horizon at which collapse becomes asymptotic."'
    },
    revisedAt: '2026-04-29',
    linksTo: ['throughput-cost', 'value-option-space', 'energy-income-inheritance', 'option-space-as-chess-moves', 'option-space-measurability', 'asymmetry-of-option-space-change', 'infinite-game']
  },

  // --- v0.6 additions (April 2026, from physics-rigour review and the
  // observer-relative / chess-moves session 2026-04-29) ---

  {
    id: 'observer-relative-option-space',
    title: 'Option Space Is Observer-Relative',
    epistemicStatus: 'derived',
    surface: `If value lies in configurations that expand future option space, a question follows immediately: option space *for whom*?

The same physical state contains very different reachable sets depending on which observer asks. A configuration that opens many futures for a corporation may foreclose them for a watershed; a configuration that secures a phylum's continuation may eliminate a species within it.

Standard responses are unsatisfactory. Aggregating across all conceivable observers requires a weighting rule that simply pushes the disagreement up one level. Choosing humanity as the privileged observer is parochial and unstable across timescales.

A different move is available, and physics has already made it. Stephen Wolfram's *Observers Like Us* argues that the laws of physics we observe aren't intrinsic to the underlying structure of reality — they're the slice that observers of our class (computationally bounded, persistent, sequentialising) access. Different observer-classes carve up the same underlying structure differently. The principled move is to make the observer-class explicit, not to deny it.

The parallel for value accounting: option space isn't intrinsic to configuration space. It's the slice that **life-persisting observers** access — the set of futures in which living entities continue to exist and make distinctions. Reachable configurations are tagged with the observer-class that can reach them.

Formally: R_living(C, B, T) — configurations reachable from C, given an exergy budget B and horizon T, in which living entities continue to exist and make distinctions. Observer-relative by design, not by concession.

This gives the "for whom" question a structural answer. Not utilitarian aggregation across individuals — most living individuals will be replaced over any meaningful horizon. The criterion is at the **category** level: preserves the capacity for life to exist as a category, with current functional diversity, over the relevant horizon.`,
    logic: {
      claim: 'Option space is not intrinsic to configuration space; it is observer-relative, and the structurally principled observer-class for value accounting is the class of life-persisting observers — those that maintain themselves and make distinctions.',
      premises: [
        'Different observer-classes have different reachable sets of the same configuration space (Wolfram, Observers Like Us).',
        'Aggregating reachable sets across all observers requires a weighting rule that displaces rather than resolves the question of "for whom."',
        'Living systems share the structural property of maintaining themselves and persisting — a non-arbitrary basis for an observer-class.',
        'Aubin\'s viability theory formalises admissible trajectories under non-empty constraint sets; the life-persisting observer-class corresponds to the constraint that some major class of life remains viable.'
      ],
      conclusion: 'The reachable set R_living(C, B, T) — configurations reachable from C under exergy budget B over horizon T in which life persists — is the operative object of value-accounting under physical constraint. The "for whom" question gets a structural answer at category level.',
      predictive: 'Frameworks that treat option space as observer-neutral will produce incoherent verdicts on cases where observer-classes diverge (predator-prey dynamics, structural-vs-individual trade-offs, intergenerational decisions). The observer-relative formulation produces coherent verdicts in the same cases by being explicit about the class.'
    },
    layers: {
      coreClaim: 'Option space depends on whose existence the question is asked from. The structurally honest answer is to make the observer-class explicit — and the principled choice is the class of beings that maintain themselves and persist.',
      formalDefinition: 'R_living(C, B, T) = the set of configurations reachable from C, given an exergy budget B over horizon T, in which living entities continue to exist and make distinctions. Observer-relativity follows Wolfram\'s Observers Like Us framing — physics already concedes that observed laws are observer-class-relative; this work transports the move to value accounting. Aubin\'s viability theory provides the mathematical anchor: admissible trajectories under non-empty constraint sets, where the constraint is that some major class of life remains viable.',
      implications: 'The "for whom" question receives a structural answer rather than a utilitarian aggregation. The criterion operates at category level — preserving the capacity for life to exist *as a category* with current functional diversity, not aggregating welfare across individuals. Predator-prey dynamics, structural-vs-individual trade-offs, and intergenerational decisions become coherent: a wolf eating a deer expands wolf R_living and contracts deer R_living to zero, but at category level (Carnivora, Cervidae both persist) the dynamics are option-space-preserving for the system. The criterion is structural, not summed.',
      openQuestions: 'Operational definition of "living entity" — phylum-level? Functional ecological role? Capacity for distinction-making (which folds back into Distinction Physics)? Open. Whether CE commits to Wolfram\'s full formalism or treats Observers Like Us as guiding analogy is a strategic call: probably analogical for v0.2, formal commitment can come later. Aggregation across simultaneous moves by many agents (the biosphere has many "players"; chess has one) — the structural-criterion-at-category-level handles the typical cases but needs further articulation for edge cases.'
    },
    revisedAt: '2026-04-30',
    linksTo: ['value-option-space', 'option-space-as-chess-moves', 'option-space-measurability', 'viable-objective', 'configuration-not-information']
  },

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
    layers: {
      coreClaim: 'Economies don\'t consume energy — energy is conserved. What they consume is exergy: the usable, work-capable fraction of energy.',
      formalDefinition: 'Economic activity that "consumes energy" is rigorously described as exergy destruction. Exergy is the portion of energy available to do useful work, measured as distance from thermodynamic equilibrium with the surroundings.',
      implications: 'The casual language of "energy consumption" misnames the physics. What rises with economic activity is entropy; what declines is the exergy stock available to future work. Where this work uses "energy" in accessible prose, exergy is the precise referent.',
      openQuestions: 'How to render exergy accounting at the resolution of actual economic decisions — sectoral exergy budgets, exergy-LCA — is operationalisable in principle but not standard in policy or business accounting.'
    },
    revisedAt: '2026-04-29',
    linksTo: ['throughput-cost', 'energy-income-inheritance']
  },

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
    layers: {
      coreClaim: 'Earth gets ~175 PW of solar exergy; humans use ~18 TW. We\'re nowhere near the thermodynamic ceiling. The real limits are sinks (where waste goes), specific materials, and biosphere integrity.',
      formalDefinition: 'The operative physical constraints on human economic activity are entropy-dump capacity (atmospheric, oceanic, biospheric sinks), specific materials at their extraction/regeneration rate, and biosphere integrity. Total solar exergy influx is not the binding constraint at current civilisational scale.',
      implications: 'Framing economic constraint as "running into the second law" is wrong and invites cornucopian dismissal. The honest framing is: the sink wall is close, the material-rate wall is close, the biosphere wall is close. These are the bindings the framework names. The ceiling is far.',
      openQuestions: 'How to integrate sink-side, material-rate, and biosphere-integrity constraints into a unified accounting frame remains open. Each is currently tracked by different communities (climate, ecological economics, industrial ecology, planetary boundaries) with limited cross-talk.'
    },
    revisedAt: '2026-04-29',
    linksTo: ['exergy-not-energy', 'energy-income-inheritance', 'displaced-costs', 'configuration-not-information']
  },

  {
    id: 'option-space-as-chess-moves',
    title: 'Option Space Is Evaluated Move by Move',
    epistemicStatus: 'derived',
    surface: `If global option space is hard to measure, the practical question is whether it can be evaluated locally — move by move — well enough to act on.

Chess engines do not compute the full game tree. They evaluate moves by whether the resulting position has more or fewer good options. Did this move open up the position or close it? Even directionally, this is enough to play.

The same operation is available here. Every policy decision, infrastructure commitment, land-use change, institutional reform is a move on the configuration. The question is local: does this move expand or contract the reachable set of life-supporting configurations, over the horizon a class of life depends on?

Mass extinction events, monoculture conversions, fossil-fuel commitments locking in 4°C are unambiguously option-space-degrading even when global option space after the move is non-computable. Local gradient evaluation is tractable where global value computation isn't.

This is not new. Dave Snowden has articulated next best move as the central practical primitive in complex domains since Cynefin took its modern form. Aubin's viability theory formalises admissible trajectories under non-empty constraint sets. This work inherits both lineages and adds physical grounding — moves are evaluated over an explicit exergy budget and horizon, restricted to the class of observers that maintain themselves and persist.`,
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
      implications: 'The single-board chess metaphor extends to polychess — multiple games on multiple boards, with pieces shared across boards, players often unaware that other games are even being played. Externalities reframe from "side effects" to uncounted moves on boards you didn\'t know you were playing on. GDP is the score on one board. Standard economics plays one board; ecological economics adds one more; this work is explicitly polychess. The unit of value is preserved option space across the poly-board, not the score on any single board.',
      openQuestions: 'Aggregation across simultaneous moves by many agents (chess has one player; the biosphere has many). The operational definition of "major class of life" — phylum-level, functional ecological role, capacity for distinction-making? Selection of the relevant horizon for any specific decision (default: the longest horizon any major class depends on, but this is contestable). When does a move eliminate a class\'s reachable set vs. merely narrow it — the criterion as currently stated is binary; reality is graded.'
    },
    revisedAt: '2026-04-29',
    linksTo: ['value-option-space', 'option-space-measurability', 'viable-objective', 'transition-fragility', 'displaced-costs', 'asymmetry-of-option-space-change', 'configuration-generates-configuration', 'infinite-game']
  },

  // --- v0.7 additions (May 2026, from session 2026-05-18) ---
  // labour-as-allocator: the historical reframing that makes work-wrong-question land harder.
  // asymmetry-of-option-space-change: the structural justification for P22's no-regret form.
  // configuration-generates-configuration: the expansion-side companion to asymmetry.

  {
    id: 'labour-as-allocator',
    title: 'Labour as Allocation Mechanism, Not Source of Value',
    epistemicStatus: 'contested',
    surface: `Labour has long been described as the source of economic value — the thing that turns raw nature into wealth, the substance that prices are supposed to track.

A different reading is available. For most of human history, labour was the mechanism by which people were allocated access to life-supporting configurations under conditions of scarcity. It was the coordination machinery scarcity required, not the thing being coordinated.

The two roles were rarely distinguished because, under those conditions, they coincided closely enough. Where production needed many hands, allocating access by hours worked was a serviceable approximation. The allocation mechanism tracked what mattered — roughly, locally, well enough to organise life.

As the composition of scarcity shifts — energy carriers, materials, automation, machine cognition — the mechanism begins to drift from what it was tracking. Hours worked no longer index contribution to configuration, and never did directly; they indexed eligibility under a particular scarcity regime.

When the regime changes, the index does not automatically re-anchor. It keeps measuring eligibility under a regime that no longer obtains.`,
    logic: {
      claim: 'Labour has functioned historically as an allocation mechanism for access to life-supporting configurations, not as the source of the value those configurations carry. The conflation was tolerable while the allocator tracked configuration-contribution closely enough; it becomes visibly mistaken as the composition of scarcity shifts.',
      premises: [
        'Value, in this work, resides in configurations that expand future option space under bounded exergy flux (value-option-space).',
        'Configurations are produced, maintained, and extended by combinations of exergy, accumulated structure (tools, institutions, knowledge), and directed human attention.',
        'Under historical conditions of low automation, low energy availability, and limited accumulated structure, the marginal contribution of human attention to configuration was high, and hours worked correlated roughly with that contribution.',
        'Allocating access to the resulting configurations by hours worked solved a real coordination problem: scarcity of production capacity meant access had to be rationed, and hours-worked was a legible, locally-verifiable proxy.',
        'As exergy availability, automation, and accumulated structure grow, the marginal contribution of human attention to many configurations falls, while the allocator (hours worked) continues to govern access.'
      ],
      conclusion: 'Labour was always functioning as an allocator, not as a value-source. The two roles can be empirically distinguished now that the regime in which they coincided is dissolving.',
      predictive: 'Economies that continue to treat hours-worked as the index of value-contribution under shifting scarcity composition will display growing divergence between the activities they reward and the activities that actually maintain or expand life-supporting configurations. The divergence will be visible as a rising share of paid activity that does not survive the question "what configuration does this maintain?"'
    },
    layers: {
      coreClaim: 'Labour was the way scarcity got rationed, not the thing that made anything valuable. Those two things were easy to confuse while they overlapped — and they no longer overlap as cleanly as they did.',
      formalDefinition: 'Labour has functioned historically as an allocation mechanism for access to life-supporting configurations rather than as the source of the value those configurations carry. The conflation between allocation-mechanism and value-source was tractable under historical scarcity regimes (low automation, low energy, limited accumulated structure) because the allocator tracked contribution-to-configuration closely enough for practical purposes. As the composition of scarcity changes, the allocator and the value-source visibly come apart.',
      implications: 'Several existing puzzles become legible. The labour theory of value and marginal-productivity wage theory both describe local properties of an allocation mechanism rather than the substance of value itself; both work under specific scarcity regimes and break under others. Bullshit jobs (Graeber) are not anomalies but expected outputs of a system that retains an allocator after the thing it was allocating has changed shape. The historical anthropological record — many pre-market societies organised access to configurations without wage labour — stops looking exotic and starts looking like evidence that labour-as-allocator was one mechanism among several. This proposition does not say what should replace the allocator; the question of replacement is separate (see participation-limits) and political, not physical.',
      openQuestions: 'What proportion of historically-attributed "labour value" was really configuration-contribution being correctly tracked by the allocator, versus rent or coercion being laundered through it, is empirically thick and contested. The marginal-productivity tradition has a serious case in some domains; identifying where that case still holds — and where it has dissolved — is live work, not settled. Whether the analysis transfers cleanly to historically non-wage allocators (kinship obligation, ritual exchange, command economies) or whether each requires its own treatment is open.'
    },
    revisedAt: '2026-05-18',
    linksTo: ['value-option-space', 'work-wrong-question', 'participation-limits', 'coordination-wealth', 'money-as-signal', 'coordination-as-move-evaluation']
  },

  {
    id: 'asymmetry-of-option-space-change',
    title: 'Asymmetry of Option-Space Change',
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
      formalDefinition: 'Let τ_break be the characteristic timescale over which a given configuration is degraded to a state of substantially reduced R_living, and τ_build the characteristic timescale over which a comparable configuration is assembled from a state of low R_living. For the configurations that viable-objective protects — soils, ecosystems, languages, institutions, atmospheric and oceanic sinks, biospheric integrity — τ_build / τ_break ≫ 1, typically by two to six orders of magnitude. Under this ratio, the expected option-space change from a symmetric bet on a fast-local destruction against a slow-systemic expansion is structurally negative once the horizon is set to the longer of the two timescales.',
      implications: 'Expected-value maximisation over option-space outcomes is not a neutral decision rule. Where τ_build / τ_break ≫ 1, it is a rule that systematically discounts the irreversibility of fast-local loss against the speculativeness of slow-systemic gain. No-regret preservation is not conservatism; it is the rule that prices the asymmetry correctly. Viable-objective follows from this asymmetry rather than from a separate ethical premise. The proposition also reframes prevention-over-repair at a different scale: prevention is structurally favoured not only because avoided costs are invisible to standard measures, but because the recovery path is on a timescale that does not balance the loss.',
      openQuestions: 'The asymmetry is not categorical. Some expansions are fast (industrial revolution, internet adoption, mRNA platform deployment, post-glacial recolonisation under favourable conditions). Some destructions are slow (desertification, salinisation, slow institutional drift). Whether τ_build / τ_break ≫ 1 is general enough to justify the no-regret rule across all viable-objective-relevant domains, or whether it must be argued per case, remains open. The cases where expansion is fast tend to be cases where the substrate (a body of prior knowledge, a connected population, a permissive substrate condition) was already in place — so the apparent fast expansion is the final assembly step of a long build-up, not the build-up itself. This is a candidate resolution but it needs empirical work.'
    },
    revisedAt: '2026-05-18',
    linksTo: ['value-option-space', 'time-asymmetry', 'prevention-over-repair', 'transition-fragility', 'viable-objective', 'option-space-as-chess-moves', 'configuration-generates-configuration']
  },

  {
    id: 'configuration-generates-configuration',
    title: 'Configuration Generates Configuration',
    epistemicStatus: 'contested',
    surface: `Each configured arrangement makes further configurations reachable that were not reachable before.

An enzyme makes a reaction accessible that chemistry alone did not provide. A notation makes a proof accessible that the same idea, unwritten, did not. A road makes a settlement accessible that geography alone did not. A standard makes an interoperation accessible that two compatible systems, unstandardised, did not.

Once enough configuration has accumulated, the rate at which new configurations become reachable grows with what is already there. This is not a moral observation. It is a structural one — the same mechanism that makes destruction fast and local, run in reverse, makes expansion slow but compounding. Each addition opens a neighbourhood of further additions that the prior state did not contain.

The compounding is not unlimited and it is not always benign. Configurations that expand option space for one observer can contract it for another. Substrates that took long build-up can be removed faster than they accrued. The asymmetry of rates between expansion and destruction is what makes the slow generative process structurally vulnerable to the fast destructive one.

Where this generativity holds, value is not stored in configurations as a stock; it is produced by configurations as a flow into the adjacent possible.`,
    logic: {
      claim: 'Each configured arrangement enables further configurations that were not reachable from the prior state. The rate at which new configurations become reachable grows with accumulated configuration. This is the generative counterpart to the asymmetry of option-space change: destruction is fast and local; expansion is slow, conditional on substrate, and compounding.',
      premises: [
        'Configurations are not isolated points in configuration space; each occupies a position from which certain further configurations are reachable and others are not (Kauffman, adjacent possible).',
        'The set of configurations reachable from a given configuration is larger than the set reachable from a less-configured prior state, for the configurations that constitute relevant substrate (tools, institutions, knowledge, biological complexity, infrastructural and notational scaffolds).',
        'The cost of assembling new configurations falls as accumulated configuration grows, because new configurations can recruit existing ones as components rather than re-deriving them (Fuller, ephemeralisation; Arthur, combinatorial technology).',
        'The asymmetry-of-option-space-change proposition holds in reverse: build-up is gradient-following, integrates many small adjustments across many parts of a system, and requires continuous exergy input over its build-time. Where the substrate persists, the build-up compounds.'
      ],
      conclusion: 'Option-space expansion is not a property a configuration can incidentally possess; it is the structural consequence of configurations being able to recruit other configurations. The runaway character of expansion — apparent in biological evolution, technological accumulation, language, and mathematics — is the same mechanism observed at scale. It is slow at any single step, compounding across steps, and conditional on the substrate not being removed faster than it accrues.',
      predictive: 'Domains where the substrate of accumulated configuration is preserved will show compounding expansion of reachable configurations on long timescales (biological diversification under stable conditions, technological capability under maintained scientific and industrial substrate, mathematical and notational depth under preserved transmission). Domains where the substrate is removed — by collapse, extinction, censorship, infrastructural loss — will show that the apparent generative process halts and does not resume on the timescale of the loss. The runaway is conditional, not automatic.'
    },
    layers: {
      coreClaim: 'Each configured arrangement makes new configurations reachable that were not reachable before. The more configuration accumulates, the more new configurations become reachable per step. This is how option space actually expands.',
      formalDefinition: 'For a configuration C with accumulated structure S(C), the reachable set R_living(C, B, T) under a fixed exergy budget B and horizon T strictly contains R_living(C\', B, T) for any C\' with S(C\') ⊂ S(C), where the configurations in S(C) function as substrate for further assembly. The marginal cost of reaching a new configuration C\'\' from C falls as S(C) grows, because C\'\' can recruit elements of S(C) as components rather than re-deriving them from the unconfigured state. The proposition is the structural counterpart to asymmetry-of-option-space-change: τ_expand at any single step remains long relative to τ_break, but the number of steps available per unit time grows with S(C), so cumulative expansion compounds where the substrate is preserved.',
      implications: 'Value as defined in value-option-space stops being a static property of configurations and becomes a function of the generative process they participate in. Configurations that preserve and extend substrate are value-positive not only by what they themselves enable but by the further configurations they make reachable. Configurations that consume substrate without replacing it are value-negative on the same axis. The "runaway" of capability that Fuller named ephemeralisation, that Arthur and Beinhocker formalise as combinatorial recursion, that biology exhibits as evolutionary diversification, and that Kauffman names as the adjacent possible — these are not separate phenomena but instances of the same structural mechanism. The proposition also clarifies an asymmetry within the canon: prevention-over-repair, complexity-maintenance, and care-as-configuration are not just defensive postures; they are the conditions under which the generative process continues at all.',
      openQuestions: 'Whether the rate-of-rate-growth is genuinely structural or is an empirical regularity over specific substrates (biology, post-Enlightenment technology, written mathematics) is open. The strongest articulation available — Walker and Cronin\'s reading of Assembly Theory as a forward arrow, in which the universe\'s trajectory through configuration space is what time is — would make the generativity metaphysical rather than empirical. That move is contested in physics and the proposition does not depend on it. The weaker claim — that configurations enable configurations and the rate grows with accumulation — is defensible without the metaphysics. Whether the proposition adds anything to endogenous-growth theory (Romer) beyond physical grounding is also open; the substantive overlap is real but the framing here is configurational rather than knowledge-as-input-to-production.'
    },
    revisedAt: '2026-05-18',
    linksTo: ['value-option-space', 'asymmetry-of-option-space-change', 'option-space-measurability', 'structural-memory', 'complexity-maintenance', 'care-as-configuration', 'option-space-as-chess-moves']
  },

  // --- v0.9 addition (June 2026) — the generative turn ---
  // coordination-as-move-evaluation: with labour-as-allocator dissolving, this
  // reframes the framework's central open political question. A direction, not a
  // mechanism — the mechanism is loaded into openQuestions and stays open.
  {
    id: 'coordination-as-move-evaluation',
    title: 'Coordination Is a Move-Evaluation Problem, Not a Pricing Problem',
    epistemicStatus: 'contested',
    surface: `An economy has to do two things at once: decide who gets access to the configurations that support life, and aim collective attention at the work worth doing.

For most of history a single mechanism did both. Labour rationed access — you ate if you worked — and pointed attention, because effort flowed to where it was paid. The two jobs rode on one rail, and while they rode together it was natural to mistake the rail for the thing it carried.

That rail is coming loose. As automation decouples production from labour and the composition of scarcity shifts from things-made to sinks-and-substrate, the mechanism that did both jobs begins to fail at both. The instrument reached for instead — the market price — was only ever doing one of them, and only on one board.

The reflex is to ask how to price the missing costs better. But a better price is still a price: one number, on one board, drifting from what it tracks. The deeper question is what kind of problem coordination is in the first place.

A different shape is available. A market asks for one thing — the price at which the board clears. A game of chess asks something else of every player: is this move better or worse than that one, given the position I can see? No player computes the whole tree; none needs a global valuation; directional, local evaluation is enough to play well. If value is generated move by move, coordinating it may be less like finding a price and more like playing well across many boards at once.`,
    logic: {
      claim: 'Coordination in a generative economy is better modelled as distributed, local move-evaluation across multiple boards than as the discovery of a single clearing price.',
      premises: [
        'Labour has functioned as the joint mechanism for allocating access and directing attention, and that mechanism is decoupling from production (labour-as-allocator, participation-limits).',
        'The market price evaluates moves on a single board and drifts from its physical referent absent explicit feedback (money-as-signal, displaced-costs).',
        'Global option space is not computable, but local Δω — the directional effect of a move on the reachable set — is evaluable (option-space-as-chess-moves, option-space-measurability).',
        'Trust and shared understanding lower the cost of reading one another\'s moves, which is what makes distributed evaluation affordable (coordination-wealth).'
      ],
      conclusion: 'A coordination mechanism adequate to a generative economy must evaluate moves directionally across many boards, decouple basic participation from labour without re-importing deprivation, and keep its signals bound to physical substrate — rather than collapse value into a single clearing price or a single score.',
      predictive: 'Attempts to repair coordination by improving the price signal alone — better externality pricing, or a single new welfare or sustainability index — will reproduce single-board foreclosure and signal-drift; mechanisms that keep the boards plural and evaluate moves directionally will track the physical state more durably.'
    },
    layers: {
      coreClaim: 'We keep trying to solve coordination as a pricing problem — finding the right number — and it keeps not solving. A generative economy coordinates more the way a chess game is played than the way a market clears: many players evaluating their next move directionally across the boards they can see.',
      formalDefinition: 'For an economy whose value is generated move by move (configuration-generates-configuration), coordination is the problem of distributed local Δω-evaluation on R_living across multiple observer-relative boards, inside institutions whose role is to widen the set of boards each agent can see (internalising uncounted moves) and to protect the substrate (keeping the reachable set open) — not the problem of discovering a single market-clearing price. Markets are one board within this — fast and useful — not the arbiter.',
      implications: 'Six constraints follow for any candidate mechanism: aim at Δω, not a single-board score; read many boards without collapsing them into one number; run on local directional signals (the global measure is open); decouple participation from labour without deprivation as the enforcer; keep the signal bound to substrate; refuse the foreclosing move (no-regret). Five comfortable failure modes are ruled out: the single-number trap (a new GDP), the central-planner trap (which inherits the non-computability of global ω), the legibility-decay trap, the deprivation relapse, and one-board recapture. The proposition names the shape an adequate mechanism must take and refuses the false comforts; it does not name the institutions.',
      openQuestions: 'The institutions themselves are unbuilt and unspecified — this is a direction, not a mechanism. Coordination across many simultaneous players on shared boards is genuinely harder than one engine on one board, and the chess analogy is weakest exactly there. Whether plural, non-collapsed accounts can resist re-collapse into a single price under real institutional pressure is open. What concretely aims attention at the generative-but-invisible work — care, prevention, maintenance, substrate-building — without metering it into decay is the live design problem.'
    },
    revisedAt: '2026-06-06',
    linksTo: ['labour-as-allocator', 'coordination-wealth', 'money-as-signal', 'participation-limits', 'legibility-truth-tradeoff', 'option-space-as-chess-moves', 'displaced-costs', 'viable-objective']
  },

  // --- v0.10 addition (June 2026) — naming the telos ---
  // infinite-game: Carse's distinction names what the viable objective has been
  // all along. The work's own public framing (an invitation to an infinite game)
  // brought into the canon. Pairs with Fuller (means) in the lineage.
  {
    id: 'infinite-game',
    title: 'The Infinite Game',
    epistemicStatus: 'contested',
    surface: `Ask what an economy is *for*, and the usual answers name a finish line: a target rate of growth, a level of output, a steady state to be reached and held. Each treats the economy as a game to be won — played to arrive somewhere and stop.

There is an older distinction that cuts the other way. A finite game is played to win; it ends when someone does. An infinite game is played to continue the play. Its purpose is not to reach a final state but to keep the game going, and to bring others in. The two are not different strategies for the same game. They are different kinds of game.

Read the viable objective again in that light. To prefer moves that keep the reachable set of life-supporting futures open, and to refuse moves that asymptotically close it, is not a finite player's strategy for winning. It is the rule of an infinite game: make no move that ends the play. The point was never to win the economy. The point is to keep it open, and to keep the distinctions coming.

Stated in the terms of this work, option space *is* the infinite game given a physical substrate. R_living is the set of futures in which living systems continue to exist and make distinctions — which is to say, continue to play. To preserve it is to keep the game in play; to empty it is to end the game for some class of player, permanently.

Naming it does real work. It tells you what kind of thing the objective is, so you stop looking for the win that was never there — and it restores the register the diagnostic frame loses: an infinite game is an invitation, not an emergency. The work has said as much from the outside in — an invitation to an infinite game, the point of which is not to win or finish it but to keep it going and bring others in, continuing the work begun by people like Buckminster Fuller. This proposition brings that framing inside. Fuller gives the means — ever more with ever less, in service of all life — and Carse gives the purpose those means serve.`,
    logic: {
      claim: 'The framework\'s objective is structurally an infinite game in Carse\'s sense: its purpose is not to reach and hold a winning state but to keep the play — the making of distinctions by living systems — going.',
      premises: [
        'A finite game is played to win and ends when someone wins; an infinite game is played to continue the play and has no terminal winning state (Carse, Finite and Infinite Games).',
        'The viable objective is a no-regret preservation rule: prefer moves that keep R_living open, reject moves that asymptotically empty it (viable-objective).',
        'A rule that refuses any move which ends the reachable set of continued play, and that names no winning move, is by definition the rule of an infinite game rather than a strategy for winning a finite one.',
        'R_living — the futures in which living systems continue to exist and make distinctions — is precisely the set whose preservation keeps the play going.'
      ],
      conclusion: 'Value-as-option-space is the infinite game given a thermodynamic substrate; the economic task is not to win but to keep the game open and bring others in.',
      predictive: 'Objectives framed as finite games — a growth target, an output level, a steady state to be reached and held — keep generating terminal-state optimisation and its foreclosures; reframing the objective as keeping the game open shifts evaluation from "have we arrived?" to "is the play still possible, and for whom?"'
    },
    layers: {
      coreClaim: 'The economy is not a game to be won. It is an infinite game in James Carse\'s sense — the point is not to win it or finish it, but to keep it going and bring others in. The viable objective is that game\'s only rule: make no move that ends the play.',
      formalDefinition: 'Carse\'s distinction: a finite game is played for the purpose of winning and terminates in a win; an infinite game is played for the purpose of continuing the play and has no terminal winning state. The no-regret viable objective — preserve R_living(C, B, T) non-empty for every major class of life over every relevant horizon — is the rule of an infinite game: it admits no winning move, only the refusal of game-ending ones. Option space is that game given a physical substrate: R_living is the set of futures in which living systems continue to make distinctions (continue to play), and to preserve it is to keep the game in play. Lineage: James Carse (Finite and Infinite Games, 1986) for the distinction; Buckminster Fuller for the generative means (ever more with ever less, in service of all life).',
      implications: 'The framework\'s telos is continuation, not optimisation. Targets that name a finishing line — a growth rate, an output level, a steady state to be reached and held — are finite-game framings, and they generate terminal-state optimisation and the foreclosures that come with it. Reframing the objective as an infinite game changes the question from "how much, by when?" to "is the play still possible, for whom, over what horizon?" It also recovers the affective core the diagnostic register loses: an infinite game is an invitation, not an emergency — the point is to keep it going and bring others in. The /polychess surface is built to make exactly this turn felt: a player chases the finite score, finds the board cannot be won, and arrives at the game that has no win.',
      openQuestions: 'Whether the identification of the viable objective with Carse\'s infinite game is a derivation or a productive analogy is itself open — Carse\'s vision is philosophical and social, and transporting it to a thermodynamic and ecological frame may carry more or less than the original. The hardest edge is the same one viable-objective flags: an infinite game has no rule for what to do when continuation for one class of player requires ending it for another. Naming the telos does not resolve that; it locates it.'
    },
    revisedAt: '2026-06-07',
    linksTo: ['viable-objective', 'value-option-space', 'option-space-as-chess-moves', 'configuration-generates-configuration', 'asymmetry-of-option-space-change', 'coordination-as-move-evaluation']
  },
  {
    id: 'held-value-not-reachable',
    title: 'Held Value Is Not Reachable Value',
    epistemicStatus: 'forming',
    surface: `This one is still taking shape, and it should be read that way.

The work already says value lives in what is reachable, not in what is stored. There seems to be a corollary that has not been stated: value that is held but is not reaching anything is, in option-space terms, closer to dead than to stored. It sits on the books as wealth while doing little for the reachable set.

Two things that look unrelated may be the same thing. Money hoarded — kept precisely so it is not exchanged — converts the live optionality money is good for into a static claim. A privately owned car stores a great deal of material value in one configuration that is idle for most of its life. On paper both are wealth. In option-space terms both are capital frozen out of reach for as long as they stay that way.

If that holds, the demurrage intuition — money that decays if hoarded — was never really about money or about fairness. It would be one case of a more general thing: configurations that lock value out of reach are mispriced as wealth.

What stops this being glib is that not all holding is dead. A seed bank, a reserve, savings against a shock, slack in a system — these are held and not reaching, and they are plainly valuable, because they widen the reachable set against future contingency. So the claim is not "storage is waste." The real work, still undone, is drawing the line cleanly between value held as live contingency and value frozen with no contingent return.

The sharpest objection, shipped with this claim: that thawing a frozen asset only moves option space around rather than making more of it — a shared car reaches more people but is the same car, so this is redistribution wearing physics vocabulary. The honest answer is that the distinction is real (a thaw can lower the frozen capital a given set of journeys requires, which is a genuine reduction and not a transfer) but unproven: no case here measures a thaw that demonstrably expands the reachable set rather than merely transferring it. Until one does, the claim holds only for the cleanest cases — redundant duplicates, hoards held as hoards — and that is exactly why it sits at forming.`,
    logic: {
      claim: 'Held value and reachable value come apart: capital locked into a configuration that contributes nothing to the reachable set is, in option-space terms, mispriced as wealth.',
      premises: [
        'Value is reachability — the size and quality of the set of futures a configuration keeps open (value-option-space).',
        'Some held assets actively widen the reachable set against contingency (reserves, buffers, slack); others lock value into a static configuration with no contingent return (a hoard, an asset idle most of its life).',
        'The optionality that makes the second kind look like wealth is largely notional — most of the value is not, at any given time, reaching anything.'
      ],
      conclusion: 'A configuration that holds value out of reach should be counted closer to dead than to stored; the live buffer and the dead hoard are different objects that current accounting treats alike.',
      predictive: 'Where this line can be drawn and priced, frozen capital (idle owned assets, hoarded claims) should show up as option-space-negative relative to the same value put into circulation or held as genuine contingency — and arrangements that thaw it (sharing, demurrage, mutual credit) should read as expanding the reachable set, not merely redistributing it.'
    },
    statusHistory: [
      { version: 'v0.11.0', status: 'forming', note: 'first articulation — moved onto the spine from working notes, voice still settling' }
    ],
    revisedAt: '2026-06-19',
    linksTo: ['value-option-space', 'money-as-signal', 'throughput-cost', 'displaced-costs']
  },
  {
    id: 'coordination-bounds-reachability',
    title: 'The Reachable Set Is Bounded by Coordination, Not Only Physics',
    epistemicStatus: 'established',
    surface: `This entered as forming and has since climbed: the coordination/enclosure edge has held across several worked applications, and the work now leans on it.

The work has mostly drawn the edge of the reachable set with physics: what an exergy budget, a material stock, or a biospheric sink will allow. There seems to be a second edge, drawn by something else. Some configurations are physically buildable right now — every component exists, every step is known — and they still cannot be reached. Not because nature forbids them, but because the pieces are held apart by who owns what, who is paid for what, and which institutions will or will not combine.

Three cases point the same way. The best possible phone is not buildable, because the strongest pieces sit inside Apple, Google, Samsung, Qualcomm and others who will not pool the rights to assemble them into one device. A cure for a disease that affects a few hundred people goes unmade, not because the biology is harder, but because the configuration is unprofitable to assemble. And the sharp case: a billionaire with that disease cannot buy the cure, because no amount of willingness to pay reaches a configuration that better coordination between hospitals, labs, and researchers would have produced but did not. The money is real and the demand is total; the assembled know-how simply does not exist to be bought.

That last case is the one that does the work. It says the boundary is not always scarcity of means. Unlimited means can sit on one side of a configuration that is physically permitted and still out of reach — held there by coordination and enclosure, not by physics. If that holds, market efficiency fails from the inside: the price system cannot clear a trade for a thing that has never been assembled, however much someone would pay.

What stops this being a complaint about monopoly is that the same enclosures often exist to fund the assembling. Patents and profits are how the know-how got created in the first place. So the claim is not "enclosure is theft." The undone work is drawing the line between enclosure that funds the building of capability and enclosure that only freezes capability already built.

The sharpest objection, shipped with this claim: that the unreachable cure is not news but a textbook fixed-cost problem — markets are already known to under-provide any good whose assembly cost exceeds a single buyer's willingness to pay times the number of people it would serve. The honest answer is that this may be a re-description of the public-goods account in configuration vocabulary rather than an addition to it; whether the coordination edge names something the fixed-cost story misses is the live frontier. What the configuration framing adds — and what has held across the worked cases — is the diagnosis that the boundary is reachability, not means, and the prediction that pooling the held pieces makes physically-buildable configurations reachable with no change in the physical budget. That the boundary has a coordination edge at all is now load-bearing; whether that edge is strictly more than the textbook public-goods case is the part still being settled.`,
    logic: {
      claim: 'The reachable set of configurations is bounded by coordination and enclosure as well as by physics: some physically-buildable configurations are held out of reach by incentives, intellectual property, and institutional arrangement, not by any material or thermodynamic limit.',
      premises: [
        'Reachability defines value in this work (value-option-space); the reachable set is bounded by an exergy budget, material stocks, and biospheric sinks (binding-constraint).',
        'A configuration can be fully physically permitted — every component built, every assembly step known — and still not be assembled, because the components are owned, priced, or institutionally held by parties who will not combine them.',
        'Coordination is itself a form of wealth that lowers the cost of acting together (coordination-wealth); its absence is therefore a binding constraint on what can be reached, distinct from the physical constraints.',
        'Willingness to pay can only clear a trade for a configuration that exists or that some party is assembling; it cannot reach a configuration that has never been coordinated into being, however large the willingness.'
      ],
      conclusion: 'The boundary of the reachable set has a coordination-and-enclosure edge that is independent of the physical edge. Configurations inside the physical frontier but outside the coordination frontier are held out of reach by institutional arrangement, and unlimited means cannot necessarily reach them — which locates a failure of market efficiency inside the price system rather than outside it.',
      predictive: 'Where the coordination/enclosure edge binds, pooling the held pieces (patent pools, open standards, public or philanthropic assembly of unprofitable capability, mission-directed coordination) should make physically-buildable configurations suddenly reachable with no change in the physical budget — the gain appears as newly reachable configurations, not as new throughput. Conversely, removing the enclosure that was funding the creation of the know-how should, in the cases where it was load-bearing, shrink the rate at which new capability is built.'
    },
    statusHistory: [
      { version: 'v0.11.0', status: 'forming', note: 'first articulation — the coordination/enclosure edge of the reachable set, distinct from the physical edge; voice still settling' },
      { version: 'v0.11.1', status: 'established', note: 'climbs from forming — the coordination/enclosure edge has held across multiple worked applications (Ogwen DNA-economy, route-around-the-chokepoint); the reachable set being bounded by coordination as well as physics is now load-bearing for downstream nodes' }
    ],
    revisedAt: '2026-06-29',
    linksTo: ['value-option-space', 'coordination-wealth', 'binding-constraint', 'coordination-as-move-evaluation', 'held-value-not-reachable', 'configuration-generates-configuration', 'displaced-costs']
  },
  {
    id: 'pattern-intelligence-constraint',
    title: 'The Possibility Space Yields to Action × Pattern-Intelligence',
    epistemicStatus: 'forming',
    surface: `This is still forming, and it is the load-bearing one — so read it with the most care and the least credence.

Start from the question of what actually bounds the reachable. The work has already moved the wall off energy: Earth receives solar exergy at ~175 PW and civilisation dissipates ~18 TW, so the thermodynamic ceiling is distant (binding-constraint). Atoms are abundant too. What is scarce is knowing which arrangement of available atoms would expand the reachable set, and being able to assemble and coordinate it.

Distinction Physics gives this a precise spine. Every change of configuration is a trajectory through a space of distinctions, and its cost is the action S = ∫E dt — energy integrated over time, the same quantity classical mechanics calls action (DP, Module 4). A desired configuration is reachable when some feasible trajectory of bounded action reaches it. So the cost of reaching anything is action — energy × time — and "this problem is hard" turns out to mean only "this trajectory requires a great deal of action." Hardness is a magnitude, not a category. Nothing a configuration's difficulty alone can do puts it outside the possibility space.

What does put a configuration outside it is a physical invariant — a wall physics forbids crossing at any action (a conservation law, the entropy floor, an irreversibility on the relevant horizon). Those are the only true walls, and binding-constraint already names them. Everything else we call hard, scarce, unprofitable, or unreachable is a question of how much action a goal needs, whether anyone can find a low-action path to it, and whether anyone mounts the action at all.

Here is where intelligence enters, in DP's own terms. In physics, nature selects the least-action path for free — δS = 0 is a law of motion. But among configurations that do not yet exist, nothing selects it automatically; the low-action path has to be searched for. That search is what pattern-intelligence is: the faculty that approximates the least-action trajectory to a desired configuration — doing deliberately what nature does for nothing. It does not repeal the action cost; it finds the short way through, so the same goal costs far less action than blind search would.

So the framing, offered as direction rather than a settled law: the possibility space yields to action × pattern-intelligence. Action (energy × time) is the fuel; pattern-intelligence is what spends it on the right path instead of wandering — DP's "excess action" is exactly the wandering intelligence removes. Read this way, a step-change in pattern-intelligence — machine pattern-intelligence at scale — is potentially the largest lever we have ever had on the reachable set: tools that improve thinking that build the next tools, each round finding lower-action paths the last could not (configuration-generates-configuration, run forward and faster).

Two edges keep this honest, and they belong inside the claim, not after it.

First, it relaxes the search, assembly, and coordination constraints — not the physical ones. The sinks, the specific materials, the biosphere, entropy itself stay exactly where binding-constraint put them, and pattern-intelligence aimed at throughput presses harder against them, not softer. The lever is real; the floor is unchanged.

Second, the asymmetry cuts both ways. A bigger lever moves the world faster in whichever direction it points, and option-space destruction is fast and local while expansion is slow and systemic (asymmetry-of-option-space-change). Pattern-intelligence aimed at a configuration that is itself shrinking the reachable set accelerates foreclosure. By default — unaimed, or aimed at yield under a price that cannot see the sink — that is the cheaper direction. So this is better called the greatest available amplifier than the greatest lever: it makes the question of aim (coordination-as-move-evaluation) and of objective (viable-objective) more urgent, not less. In the terms of infinite-game, it is a far more powerful way to either keep the game open or end it.

That is also why money is not the thing. Money is neither action nor pattern-intelligence; it is a claim on them, and it converts to mounted action only where coordination and incentive carry it there. For a configuration that is unprofitable to assemble or whose pieces are held apart, the claim never converts — which is why unlimited willingness-to-pay can sit beside a physically-permitted cure whose low-action path no one ever traverses. The path is not forbidden and may not even be especially long; it is simply never taken.

The sharpest objection, shipped with this claim: that every general-purpose technology was, in its moment, going to end scarcity — steam, electricity, the Green Revolution, nuclear, the internet — and each relaxed a specific constraint only for the constraint to relocate, often to an irreversibility (aquifer drawdown, nuclear waste, attention capture, data-centre load). The base rate for "this one finally escapes scarcity" is poor. And the lever has a footprint: under the prevailing aim — yield under a price that cannot see the sink — a cheaper way to produce is first of all more production, so the rebound loads the binding constraints before it relaxes anything. The honest answer concedes both, which is why the claim is narrowed to relaxing the non-physical, arrangement-bound constraints that have actually been binding, while the physical floor stands and is pushed harder by default. That pattern-intelligence acts on the configuration-finding process itself may make it different in kind — but that earns a wider error bar, not a presumption of rescue. Hence forming, and hence amplifier rather than lever.`,
    logic: {
      claim: 'The reachable set of configurations yields to action and pattern-intelligence: action (energy × time, DP\'s S = ∫E dt) is the cost of any trajectory through configuration space, and pattern-intelligence is the faculty that approximates the least-action path to a desired configuration. Since energy influx is not binding and atoms are abundant, the active levers on what is reachable are pattern-intelligence and coordination, not energy or matter — bounded only by the physical invariants.',
      premises: [
        'Value is reachability — the set of life-supporting futures a configuration keeps open (value-option-space).',
        'Every change of configuration is a trajectory through a distinction space whose cost is the action S = ∫E dt (energy integrated over time), feasible only within a bounded action budget (Distinction Physics, Module 4; binding-constraint supplies the budget — solar exergy is not the limiting term).',
        'A configuration\'s difficulty is the magnitude of action its trajectory requires, not a separate kind of barrier: only a physical invariant places a configuration outside the possibility space at any action (binding-constraint).',
        'In physics the least-action path is selected automatically (δS = 0); among not-yet-existing configurations nothing selects it, so it must be searched for — and that search is pattern-intelligence, which lowers the action a given goal requires rather than removing the cost.',
        'Pattern-intelligence is itself a configuration that recruits prior configurations, so the reachable set grows with accumulated pattern-intelligence (configuration-generates-configuration); machine pattern-intelligence at scale is a step-change in that capacity, applicable recursively.'
      ],
      conclusion: 'The active levers on reachable value are pattern-intelligence and coordination, not energy or matter. A step-change in pattern-intelligence is the largest available amplifier of the reachable set — including the thawing of frozen capability, where the low-action path exists but is never traversed for want of coordination. It preserves binding-constraint rather than overturning it: the physical invariants remain the only walls, and aimed at throughput the lever presses on them harder. And because option-space change is asymmetric, the same amplifier aimed at a contracting configuration accelerates foreclosure — so its value is conditional on aim, raising the stakes on move-evaluation and the viable objective.',
      predictive: 'Domains where a step-change in pattern-intelligence is applied to search, assembly, and coordination (materials and molecule design, logistics, matching dispersed expertise) should expand the reachable set far faster than energy or raw-material trends predict; domains gated by genuine physical invariants (sink capacity, biosphere integrity, irreversible loss) should not yield at the same rate, and may foreclose faster where the same intelligence is pointed at throughput. The two signatures are empirically distinguishable.'
    },
    statusHistory: [
      { version: 'v0.11.0', status: 'forming', note: 'first articulation of the keystone — possibility space yields to action × pattern-intelligence, grounded in DP\'s least-action functional S = ∫E dt; "amplifier not lever" and the physical-invariant floor carried in-node; line still settling' }
    ],
    revisedAt: '2026-06-19',
    linksTo: ['value-option-space', 'binding-constraint', 'configuration-generates-configuration', 'exergy-not-energy', 'contextual-scarcity', 'asymmetry-of-option-space-change', 'coordination-as-move-evaluation', 'viable-objective', 'infinite-game', 'held-value-not-reachable', 'coordination-bounds-reachability']
  },
  {
    id: 'route-around-the-chokepoint',
    title: 'Route Around the Control Chokepoint — and Own It Together',
    epistemicStatus: 'forming',
    surface: `This one is still forming, and it is worth saying where it came from: it generalised out of a single worked case (a north-Wales valley evaluated against this framework), which is how the work is meant to grow — an application throwing off a principle.

The case kept hitting a wall, and the wall was not physics. The energy was there, the demand was there, the configuration was buildable. What stopped it was the regulated grid: the connection queue, the licensing boundary that turns a shared network into a regulated utility, the powers held far above the locality. That is coordination-bounds-reachability wearing infrastructure: a configuration fenced not by atoms but by who controls the wire and the rules.

The general shape: the binding boundary on a reachable configuration is often a control chokepoint — a centralised point where access is permissioned — not a physical limit. And a chokepoint has a double nature worth naming. The grid is the one place where electrical power and political power are the same object: centralised generation feeds centralised wires feeds centralised permission feeds centralised control. So distributing the physical thing distributes the political thing with it. To route around the chokepoint is not only an engineering move; it is a redistribution of control.

The move the case pointed at: architect at the largest scale that still stays below the boundary, so the centralised system becomes optional — a buffer, not the spine. For energy that means generating, storing and using behind the meter, at building and cluster scale, where no queue and no licence reach.

Two things keep this honest and belong inside the claim. First, you buy autonomy with redundancy. The reason shared grids exist is diversity: separate peaks need less total storage than the sum of self-sufficient units. Drop below the boundary and each unit over-provisions for its own worst case. So the rule is the largest unit that stays below the boundary, not the smallest possible one — a privately-owned cluster recovers most of the pooling a public grid would have given, without crossing into it. Second, the boundary re-enters at the point of exchange: the moment you sell the thing across the boundary to others, you can trip the regulation you routed around. The value-capture has to be built so it is not, in the regulated sense, supply.

And the gate that decides whether this brings greater life to all or only to some: it has to be owned collectively. Routed around individually, decentralisation is just the comfortable seceding to private abundance, leaving everyone who cannot afford the kit stranded on a thinning shared system whose fixed costs they now carry alone. Owned together, the same hardware becomes greater life to all. The hardware decentralises; the ownership must not.

The sharpest objection, shipped with this claim: that routing around shared infrastructure is, historically, exactly how the comfortable secede — gated communities, private security, private schools — and calling it collective only fixes it inside the cell, not between cells. A rich valley can island itself; a poor one cannot, and a county of self-sufficient wealthy cells beside stranded poor ones is not greater life to all, it is the death spiral moved up a level. The honest answer is that collective ownership passes the gate within a cell but does not by itself supply the inter-cell redistribution a centralised, universal-service system was also doing; the principle routes around the control chokepoint without yet saying what replaces the solidarity the chokepoint also carried. A second edge: regulatory boundaries move — push enough value below a boundary and it tends to follow you down to recapture it — so routing-around may work at small scale and self-defeat at scale. Both are why this sits at forming: it names a real and powerful move and does not yet close the equity and scale questions it opens.`,
    logic: {
      claim: 'The binding boundary on a reachable configuration is often a control chokepoint — a centralised, permissioned point of access (regulatory or ownership), not a physical limit; the option-space-opening move is to architect at the largest scale that stays below the chokepoint, owned collectively, so the centralised system becomes optional rather than load-bearing.',
      premises: [
        'Many physically-buildable configurations are held out of reach by coordination and enclosure rather than by physics (coordination-bounds-reachability); in infrastructure this enclosure takes the form of a centralised access point that must grant permission.',
        'A centralised distribution system co-locates physical capacity and political control: whoever controls the shared conduit controls access, so the conduit is at once an energy (or information, or finance) channel and a control channel.',
        'Generating, storing and consuming below the regulatory/ownership boundary (behind the meter, on private wires) escapes the permission layer and makes the centralised system a buffer rather than the spine.',
        'Shared systems exist largely for diversity-pooling, so routing below the boundary trades a permission-cost for an over-provisioning-cost; a collectively-owned cluster recovers most of the pooling without crossing the boundary.',
        'Whether routing-around brings greater life to all or only to some turns on ownership: individual routing strands those who cannot afford to leave on a death-spiralling shared system (displaced-costs); collective ownership avoids this (viable-objective).'
      ],
      conclusion: 'Where the binding constraint is a control chokepoint, the move is to distribute generation/storage/use to the largest scale that stays below the chokepoint and to own it collectively — which redistributes control along with the physical capacity, and passes the no-regret gate only when the ownership is collective.',
      predictive: 'Where a centralised conduit is the binding constraint, building-and-cluster-scale provision below the regulatory boundary should make locally-feasible configurations suddenly reachable with no change in the physical budget and no permission from the centre — while the same move made individually rather than collectively should show up as exported cost (rising fixed charges, worsening service) on those left on the shared system.'
    },
    statusHistory: [
      { version: 'v0.11.0', status: 'forming', note: 'first articulation — generalised from a worked application (the Ogwen DNA-economy evaluation); the control-chokepoint corollary of coordination-bounds-reachability; voice still settling' }
    ],
    revisedAt: '2026-06-21',
    linksTo: ['coordination-bounds-reachability', 'binding-constraint', 'pattern-intelligence-constraint', 'value-option-space', 'coordination-wealth', 'viable-objective', 'displaced-costs', 'coordination-as-move-evaluation']
  },
  {
    id: 'cleanliness-and-scale',
    title: 'Cleanliness and Scale Trade Off When Value Flows From Harm',
    epistemicStatus: 'forming',
    surface: `This one is still forming, and it generalised out of a worked evaluation — a six-hat run on whether a UK law firm could take the Saudi football money on these principles — which is how the work grows: an application throwing off a principle.

The setup is general. A large flow of value comes from a source tied to credible harm, and you are tempted to take some of it ethically — to do the clean version, raise a floor, build a good institution, and tell yourself the good work justifies the proximity to the money.

Here is the counterintuitive core. When the money is buying legitimacy, your legitimacy is the product. The credibility you build doing the clean work does not stay attached to the clean work; your name is fungible, and that name then sits on the thing that harms. So sincerity can launder more efficiently than cynicism: a visibly principled actor is a better reputational asset for the harm than a cynical one, precisely because more credible. The cleaner you are, the better the cover you supply.

It follows that cleanliness and scale are inversely correlated. The large money is indivisible from the laundering, because presence is indivisible — the seat at the lucrative table is bought by doing the thing that harms. A genuinely clean configuration does exist, but it is small and adversarial: you make your money by resisting the harm rather than receiving its coin — acting for the harmed party, for the financier who can impose a floor, for the union, in a forum the harm-doer cannot police. You profit by swimming across the current, not riding it. And the tell that you have crossed back over is the word significant: the moment a clean role has to be significant to be worth it, it is reaching for the harm-doer's shilling.

Two things keep this honest. First, less to none is a gate, not a sum: a real benefit to some does not net off the cover you manufacture for harm to many, so you cannot offset one against the other. Second, even the adversarial clean position is rarely perfectly clean — you may have reached it on credibility the wider market gave you — so it is floor-raise with a residual cover cost, a difference of degree, not a halo.

The operational line, the part worth carrying to any loaded domain: four tests separate floor-raising from laundering. Counterparty — is your client the harmed party, or a non-sovereign actor imposing the floor, and never the harm-doer. Forum — does the remedy attach where the harm-doer cannot police it. Brand-spend — does your name, when spoken, subtract legitimacy from the harm rather than supply it. Indivisibility — because presence is indivisible, it is a fork, not a portfolio you can balance: you cannot serve both sides and call the good half your defence.

The sharpest objection, shipped with this claim: that it perversely tells good actors to abandon the field to bad ones — if sincerity launders more, the ethical actor should withdraw and leave the harm-doer to the cynic, which makes the world worse, not better; and everyone, even the worst client, is entitled to representation. The honest answer is that the claim does not say withdraw from the domain — it says move to the other side of it (act for the harmed, the financier, the union), which keeps a principled actor engaged exactly where they raise a floor; the conflation it refuses is between leaving the harm-doer and leaving the field. But the concession is real: in some domains there is no adversarial perch, and there the principle does counsel exit — and whether that helps, or merely leaves the cynics unopposed, is genuinely unresolved. That, and the fact that the line between subtracting and supplying legitimacy is a judgment rather than a measurement, is why this sits at forming.`,
    logic: {
      claim: 'Where a large flow of value comes from a source tied to credible harm, the amount you can take and the cleanliness of taking it are inversely correlated — because when the money is buying legitimacy, your own legitimacy is the product, so sincere involvement launders more efficiently than cynical involvement; the genuinely clean configuration exists but is small and adversarial (profiting by resisting the harm, not receiving its coin).',
      premises: [
        'The viable objective is no-regret and less-to-none is a gate, not a sum: a benefit to some protected class does not offset a harm manufactured for others (viable-objective, displaced-costs).',
        'When a harm-doer spends to buy legitimacy, the legitimacy a credible third party confers is itself the thing being bought; a credible actor therefore supplies more cover than a cynical one, in proportion to their credibility.',
        'Presence and brand are indivisible and fungible: the reputation built doing clean work attaches to the actor\'s name, which then sits on the harmful activity that bought the actor its seat, so the clean work cannot be ring-fenced from the cover it supplies.',
        'Real leverage to impose a floor is held not by anyone the harm-doer can route around, but by non-sovereign parties it must satisfy (the harmed party in an unpoliced forum, the financier, the union) — so the clean role is adversarial and forgoes the harm-doer\'s fees (route-around-the-chokepoint, coordination-bounds-reachability).'
      ],
      conclusion: 'In any domain where value is tied to credible harm, a clean positive-sum configuration exists but cannot be both significant and clean; the operational line between floor-raising and laundering is four tests — counterparty (client is the harmed or a non-sovereign floor-imposer, never the harm-doer), forum (remedy where the harm-doer cannot police it), brand-spend (your name subtracts rather than supplies legitimacy), and indivisibility (a fork, not a balanced portfolio).',
      predictive: 'Actors who take the harm-doer\'s coin while pointing to clean side-work as justification should, on inspection, supply net legitimacy-cover that scales with their credibility; actors who relocate to the adversarial side (harmed party, financier, union, in an unpoliced forum) should generate smaller fees but pass all four tests — and the appearance of the word "significant" attached to a clean role predicts the line has been crossed back toward laundering.'
    },
    statusHistory: [
      { version: 'v0.11.0', status: 'forming', note: 'first articulation — generalised from the Saudi-football-legal six-hat run (an application throwing off a principle); the cleanliness-vs-scale tradeoff, sincerity-as-laundering, and the four-test line; voice still settling' }
    ],
    revisedAt: '2026-06-22',
    linksTo: ['viable-objective', 'displaced-costs', 'value-option-space', 'route-around-the-chokepoint', 'coordination-bounds-reachability', 'asymmetry-of-option-space-change']
  }
];

// Simple query utilities
export function getPropositionById(id: string): Proposition | undefined {
  return PROPOSITIONS.find(p => p.id === id);
}

export function getLinkedPropositions(id: string): Proposition[] {
  const prop = getPropositionById(id);
  if (!prop) return [];
  return prop.linksTo
    .map(linkId => getPropositionById(linkId))
    .filter((p): p is Proposition => p !== undefined);
}

// Inbound links: propositions that point AT this one. Links are non-semantic
// ("links to", not "depends on"), so this returns the connective neighbourhood
// a reader should check when a premise here is attacked — not a proven
// dependency. The attack surface surfaces these as "what to check next."
export function getDependents(id: string): Proposition[] {
  return PROPOSITIONS.filter(p => p.linksTo.includes(id));
}

// Both directions, de-duplicated — the full connective neighbourhood of a
// proposition, used by the attack surface to show what a premise touches.
export function getNeighbourhood(id: string): Proposition[] {
  const out = getLinkedPropositions(id);
  const inb = getDependents(id);
  const seen = new Set<string>();
  return [...out, ...inb].filter(p => {
    if (p.id === id || seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

export function getAllLinks(): { from: string; to: string }[] {
  const links: { from: string; to: string }[] = [];
  PROPOSITIONS.forEach(prop => {
    prop.linksTo.forEach(linkId => {
      links.push({ from: prop.id, to: linkId });
    });
  });
  return links;
}

export function getPropositionsByStatus(status: EpistemicStatus): Proposition[] {
  return PROPOSITIONS.filter(p => p.epistemicStatus === status);
}
