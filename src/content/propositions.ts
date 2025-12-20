// Proposition Nodes v0.2
// Self-contained, meaningful in isolation, connected by simple links

export interface Proposition {
  id: string;
  title: string;

  // Surface text: observational, invitational, non-didactic
  surface: string;

  // Underlying propositional structure: explicit, precise
  logic: {
    claim: string;
    premises: string[];
    conclusion: string;
    predictive?: string;  // Optional predictive consequence
  };

  // Simple non-semantic links
  linksTo: string[];
}

export const PROPOSITIONS: Proposition[] = [
  {
    id: 'energy-income-inheritance',
    title: 'Energy Income and Inheritance',
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
    linksTo: ['throughput-cost', 'value-option-space']
  },

  {
    id: 'throughput-cost',
    title: 'Throughput and Cost',
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
    linksTo: ['energy-income-inheritance', 'value-option-space']
  },

  {
    id: 'value-option-space',
    title: 'Value and Future Option Space',
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
    linksTo: ['throughput-cost', 'work-wrong-question', 'participation-limits']
  },

  {
    id: 'work-wrong-question',
    title: 'Why Work Stops Being the Right Question',
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
    linksTo: ['value-option-space', 'participation-limits']
  },

  {
    id: 'participation-limits',
    title: 'Participation within Physical Limits',
    surface: `Any economy that intends to persist must decide how people remain part of it.

Guaranteeing participation does not mean promising comfort, abundance, or uniform outcomes. It means ensuring that exclusion is not used as the primary means of coordination.

When participation is bounded by physical reality rather than enforced scarcity, contribution can be aligned with what actually improves future conditions rather than with what merely satisfies accounting proxies.

Scarcity remains. Trade-offs remain. What changes is how they are handled.`,
    logic: {
      claim: 'Stable economies guarantee participation within physical limits rather than enforcing labour as a condition of survival.',
      premises: [
        'Participation is necessary for social stability.',
        'Energy and material availability are bounded.',
        'Deprivation is a blunt coordination mechanism.'
      ],
      conclusion: 'Participation should be unconditional within physical constraints; contribution can remain differentiated.'
    },
    linksTo: ['value-option-space', 'work-wrong-question']
  },

  // --- v0.2 additions ---

  {
    id: 'structural-memory',
    title: 'Economies Remember Through Structure',
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
    linksTo: ['value-option-space', 'complexity-maintenance']
  },

  {
    id: 'complexity-maintenance',
    title: 'Complexity Has a Maintenance Cost',
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
    linksTo: ['energy-income-inheritance', 'structural-memory', 'care-as-configuration']
  },

  {
    id: 'care-as-configuration',
    title: 'Care as Configuration, Not Sentiment',
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
    linksTo: ['value-option-space', 'complexity-maintenance', 'prevention-over-repair']
  },

  {
    id: 'prevention-over-repair',
    title: 'Prevention Is Cheaper Than Repair (But Harder to See)',
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
    linksTo: ['care-as-configuration', 'throughput-cost']
  },

  {
    id: 'stability-not-stasis',
    title: 'Stability Is Not Stasis',
    surface: `Stability is often mistaken for stillness.

In living systems, stability comes from continual adjustment. Forests shift, bodies adapt, languages evolve. What remains stable is not the arrangement, but the ability to respond without breaking.

Economic systems that confuse stability with freezing existing structures become brittle. When conditions change, they crack rather than flex.

A stable economy is one that keeps moving—carefully.`,
    logic: {
      claim: 'Stability arises from adaptive capacity, not static preservation.',
      premises: [
        'Environments change over time.',
        'Fixed structures resist adjustment.',
        'Flexibility preserves function under variation.'
      ],
      conclusion: 'Systems must prioritise adaptability over preservation of form.'
    },
    linksTo: ['value-option-space', 'structural-memory']
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

export function getAllLinks(): { from: string; to: string }[] {
  const links: { from: string; to: string }[] = [];
  PROPOSITIONS.forEach(prop => {
    prop.linksTo.forEach(linkId => {
      links.push({ from: prop.id, to: linkId });
    });
  });
  return links;
}
