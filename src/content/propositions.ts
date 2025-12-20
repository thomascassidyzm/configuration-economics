// Proposition Nodes v0.1
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
