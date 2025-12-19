// Distinction Network: Distinction Definitions
// Edges that clarify how concepts differ

import type { EpistemicStatus } from '../essay-1/config';

export interface Distinction {
  id: string;
  conceptA: string;
  conceptB: string;
  dimension: string;
  explanation: string;
  epistemicStatus: EpistemicStatus;

  comparison: {
    sharedProperty: string;
    differingProperty: string;
    aPosition: string;
    bPosition: string;
  };

  sourceAnchors: {
    sectionId: string;
    quote?: string;
  }[];
}

export const DISTINCTIONS: Distinction[] = [
  {
    id: 'energy-income-vs-energy-savings',
    conceptA: 'energy-income',
    conceptB: 'energy-savings',
    dimension: 'Renewability and persistence',
    explanation: 'This is the foundational physical distinction that grounds the entire framework. Confusing these two categories is the "accounting error" at the heart of modern growth economics.',
    epistemicStatus: 'established',
    comparison: {
      sharedProperty: 'Both are energy sources that can power economic activity',
      differingProperty: 'Temporal character - one flows continuously, one depletes',
      aPosition: 'Continuous flux that renews within human timescales (solar, wind, ecological cycles)',
      bPosition: 'Finite stock accumulated over geological time, non-renewable on human timescales'
    },
    sourceAnchors: [
      { sectionId: 'physical-envelope', quote: 'distinction between renewable income and finite savings' },
      { sectionId: 'accounting-error', quote: 'Fossil fuels are not a revenue stream. They are a one-time inheritance' }
    ]
  },

  {
    id: 'configuration-vs-information',
    conceptA: 'configuration',
    conceptB: 'information',
    dimension: 'Physical embodiment and maintenance',
    explanation: 'This distinction prevents the shallow optimism that digitalisation alone can solve physical constraints. Configuration includes bodies, skills, institutions, infrastructure - not just data.',
    epistemicStatus: 'contested',
    comparison: {
      sharedProperty: 'Both involve structured arrangements that carry meaning or enable action',
      differingProperty: 'Physical embodiment and maintenance requirements',
      aPosition: 'Includes physical arrangements (bodies, buildings, ecosystems) with maintenance costs; can be good or bad',
      bPosition: 'Symbols and data that can be copied at near-zero cost; lacks physical maintenance dimension'
    },
    sourceAnchors: [
      { sectionId: 'configuration-not-information', quote: 'Configuration is often mistaken for information, symbols, or data' },
      { sectionId: 'configuration-not-information', quote: 'Configuration is broader and more demanding' }
    ]
  },

  {
    id: 'configuration-vs-throughput',
    conceptA: 'configuration',
    conceptB: 'throughput',
    dimension: 'Value creation vs resource cost',
    explanation: 'This distinction reframes what economics should measure. Throughput became a proxy for value when energy was cheap; it is actually a cost, not a measure of success.',
    epistemicStatus: 'derived',
    comparison: {
      sharedProperty: 'Both are involved in economic activity',
      differingProperty: 'Relationship to value - one creates it, one costs it',
      aPosition: 'The patterning that creates value - can compound, persist, and expand option space',
      bPosition: 'The material/energy flow required - a necessary cost but not inherently valuable'
    },
    sourceAnchors: [
      { sectionId: 'throughput-proxy', quote: 'Throughput is a cost, not a measure of success' },
      { sectionId: 'configuration-value', quote: 'Configuration differs from throughput in three crucial ways' }
    ]
  },

  {
    id: 'work-vs-participation',
    conceptA: 'work',
    conceptB: 'participation',
    dimension: 'Gating function for resource access',
    explanation: 'Work bundles production with resource access; participation separates them. This matters because automation is breaking the historical coincidence.',
    epistemicStatus: 'contested',
    comparison: {
      sharedProperty: 'Both describe how people engage with economic systems',
      differingProperty: 'Whether resource access is conditional on productive labour',
      aPosition: 'Gates resource access to labour contribution; valuable activities outside wage labour are invisible',
      bPosition: 'Decouples existence rights from labour; contribution remains possible but not required for survival'
    },
    sourceAnchors: [
      { sectionId: 'work-wrong-question', quote: 'work served two functions simultaneously' },
      { sectionId: 'universal-participation', quote: 'Participation is primary. Labour is instrumental.' }
    ]
  },

  {
    id: 'throughput-growth-vs-configuration-growth',
    conceptA: 'throughput',
    conceptB: 'configuration',
    dimension: 'What it means to "grow"',
    explanation: 'Growth measured as throughput collides with physical reality. Growth measured as configuration quality changes the picture - the economy reorients rather than merely expands.',
    epistemicStatus: 'contested',
    comparison: {
      sharedProperty: 'Both can be framed as measures of economic "growth"',
      differingProperty: 'Physical constraints and long-term viability',
      aPosition: 'More stuff flowing through - eventually hits thermodynamic limits',
      bPosition: 'Better arrangements enabling more possibilities - can continue within energy constraints'
    },
    sourceAnchors: [
      { sectionId: 'viable-objective', quote: 'When growth is measured primarily as increased throughput, it eventually collides with physical reality' },
      { sectionId: 'viable-objective', quote: 'The economy does not grow or shrink in any absolute sense. It reorients.' }
    ]
  },

  {
    id: 'established-vs-contested',
    conceptA: 'epistemic-status',
    conceptB: 'epistemic-status',
    dimension: 'Degree of certainty',
    explanation: 'This meta-distinction clarifies how to engage with different claims. Physical constraints are not negotiable; participation frameworks are up for debate.',
    epistemicStatus: 'established',
    comparison: {
      sharedProperty: 'Both are epistemic classifications within the framework',
      differingProperty: 'Warrant for certainty',
      aPosition: 'Established: Physical laws and definitions - "energy is conserved" is not up for debate',
      bPosition: 'Contested: Reasonable people disagree, or the framework takes a position with alternatives'
    },
    sourceAnchors: [
      { sectionId: 'orientation', quote: 'epistemic status of each claim' }
    ]
  },

  {
    id: 'value-conventional-vs-configuration',
    conceptA: 'value',
    conceptB: 'throughput',
    dimension: 'Definition of economic value',
    explanation: 'Conventional economics implicitly defines value via throughput proxies (GDP, labour hours, money exchanged). Configuration economics proposes value as option-space expansion.',
    epistemicStatus: 'contested',
    comparison: {
      sharedProperty: 'Both attempt to capture what economies should optimise for',
      differingProperty: 'Physical grounding and long-term coherence',
      aPosition: 'Value = configurations that expand option space under bounded energy flux (proposed definition)',
      bPosition: 'Value proxied by throughput measures - worked when energy surplus masked flaws'
    },
    sourceAnchors: [
      { sectionId: 'throughput-proxy', quote: 'In a world of apparent abundance, throughput became an acceptable proxy for value' },
      { sectionId: 'orientation', quote: 'value is understood not as throughput or labour' }
    ]
  },

  {
    id: 'descriptive-vs-prescriptive',
    conceptA: 'physical-envelope',
    conceptB: 'participation',
    dimension: 'Type of claim being made',
    explanation: 'The framework describes physical constraints (descriptive) but does not prescribe political programmes (prescriptive). This is crucial for understanding what it is and isn\'t.',
    epistemicStatus: 'established',
    comparison: {
      sharedProperty: 'Both appear in the framework',
      differingProperty: 'Whether they are claims about what IS vs what SHOULD BE',
      aPosition: 'Physical constraints are descriptive - atoms are conserved whether we like it or not',
      bPosition: 'Participation frameworks involve contested value choices - reasonable alternatives exist'
    },
    sourceAnchors: [
      { sectionId: 'orientation', quote: 'This essay does not propose a political programme' },
      { sectionId: 'what-replaces', quote: 'Configuration economics does not abolish existing mechanisms. It re-situates them.' }
    ]
  }
];

// Query utilities
export function getDistinctionById(id: string): Distinction | undefined {
  return DISTINCTIONS.find(d => d.id === id);
}

export function getDistinctionsForConcept(conceptId: string): Distinction[] {
  return DISTINCTIONS.filter(d =>
    d.conceptA === conceptId || d.conceptB === conceptId
  );
}

export function getDistinctionBetween(conceptA: string, conceptB: string): Distinction | undefined {
  return DISTINCTIONS.find(d =>
    (d.conceptA === conceptA && d.conceptB === conceptB) ||
    (d.conceptA === conceptB && d.conceptB === conceptA)
  );
}
