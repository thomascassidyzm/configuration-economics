// Distinction Network: Concept Definitions
// Core nodes of the knowledge graph

import type { EpistemicStatus } from '../essay-1/config';

export interface Concept {
  id: string;
  name: string;
  definition: string;
  epistemicStatus: EpistemicStatus;

  resolutions: {
    simple: string;
    formal: string;
    implications: string[];
  };

  sourceAnchors: {
    sectionId: string;
    quote?: string;
  }[];

  tags: string[];
}

export const CONCEPTS: Concept[] = [
  // Foundational Physics Concepts
  {
    id: 'physical-envelope',
    name: 'Physical Envelope',
    definition: 'The set of physical constraints that bound all economic activity',
    epistemicStatus: 'established',
    resolutions: {
      simple: 'The basic rules of physics that no economy can escape - atoms are conserved, energy flows are limited, entropy always increases',
      formal: 'The thermodynamic constraints governing matter-energy transformations: conservation laws, bounded flux rates, and entropic increase',
      implications: [
        'Economic theories that ignore these constraints accumulate hidden fragility',
        'No policy or technology can override thermodynamic limits',
        'Systems must operate within these bounds to persist'
      ]
    },
    sourceAnchors: [
      { sectionId: 'physical-envelope', quote: 'Every economy operates inside a physical envelope that is not subject to negotiation' }
    ],
    tags: ['foundational', 'physics', 'constraints']
  },

  {
    id: 'energy-income',
    name: 'Energy Income',
    definition: 'Continuous renewable flux - solar radiation, wind, ecological cycles',
    epistemicStatus: 'established',
    resolutions: {
      simple: 'Energy that keeps flowing - sunlight, wind, plant growth. It renews itself.',
      formal: 'Continuous energy flux from renewable sources operating within current solar-driven cycles',
      implications: [
        'An economy living on energy income can persist indefinitely',
        'Flow rate is bounded by physical capture limits',
        'Does not deplete a finite stock'
      ]
    },
    sourceAnchors: [
      { sectionId: 'physical-envelope', quote: 'An economy that lives on continuous energy income can, in principle, persist indefinitely' }
    ],
    tags: ['foundational', 'energy', 'renewable']
  },

  {
    id: 'energy-savings',
    name: 'Energy Savings',
    definition: 'Finite stores accumulated over geological time - fossil fuels, mineral concentrations',
    epistemicStatus: 'established',
    resolutions: {
      simple: 'Stored energy from the past - coal, oil, gas. Once used, it\'s gone.',
      formal: 'Energy stocks accumulated over geological timescales, extractable at rates exceeding natural replenishment',
      implications: [
        'An economy depending on depleting savings cannot persist indefinitely',
        'Treating savings as income produces false signals of abundance',
        'Depletion rates matter as much as total reserves'
      ]
    },
    sourceAnchors: [
      { sectionId: 'physical-envelope', quote: 'An economy that depends on drawing down finite energy savings cannot' },
      { sectionId: 'accounting-error', quote: 'Fossil fuels are not a revenue stream. They are a one-time inheritance' }
    ],
    tags: ['foundational', 'energy', 'finite']
  },

  // Core Framework Concepts
  {
    id: 'configuration',
    name: 'Configuration',
    definition: 'Structured arrangement of matter, energy, or information enabling future action',
    epistemicStatus: 'derived',
    resolutions: {
      simple: 'How things are arranged in ways that make future things possible. A book is paper configured to carry meaning.',
      formal: 'A structured arrangement of elements such that future actions become easier, richer, or more varied',
      implications: [
        'Can compound without proportional energy increase',
        'Can be copied and transmitted at low marginal cost',
        'Can expand future option space rather than merely satisfy present demand'
      ]
    },
    sourceAnchors: [
      { sectionId: 'configuration-value', quote: 'patterning of matter across time' },
      { sectionId: 'configuration-value', quote: 'arrangement of elements such that future actions become easier, richer, or more varied' }
    ],
    tags: ['core', 'value', 'central-concept']
  },

  {
    id: 'option-space',
    name: 'Option Space',
    definition: 'The set of reachable future states from a given configuration',
    epistemicStatus: 'derived',
    resolutions: {
      simple: 'All the things you could do next, given how things are arranged now',
      formal: 'The set of accessible future states of a system given its current configuration and environmental constraints',
      implications: [
        'Some configurations expand option space; others constrain it',
        'Measurement is possible in principle',
        'Preservation of option space is a coherent objective'
      ]
    },
    sourceAnchors: [
      { sectionId: 'orientation', quote: 'configuration that preserves and expands future option space' }
    ],
    tags: ['core', 'value', 'central-concept']
  },

  {
    id: 'throughput',
    name: 'Throughput',
    definition: 'Material/energy flow through a system - a cost, not inherently a measure of value',
    epistemicStatus: 'derived',
    resolutions: {
      simple: 'Stuff and energy flowing through - burning fuel, moving materials. It\'s what you spend, not what you gain.',
      formal: 'The rate of matter-energy transformation in a system; necessary for action but not equivalent to value creation',
      implications: [
        'Throughput is a cost, not a measure of success',
        'Higher throughput does not imply higher value',
        'Efficient configurations minimise throughput per unit of value'
      ]
    },
    sourceAnchors: [
      { sectionId: 'throughput-proxy', quote: 'Throughput is a cost, not a measure of success' }
    ],
    tags: ['core', 'measurement', 'proxy']
  },

  {
    id: 'negentropy',
    name: 'Negentropy',
    definition: 'Locally maintained order against entropy - what living systems do',
    epistemicStatus: 'established',
    resolutions: {
      simple: 'Keeping things organised against the natural tendency toward disorder. Life does this.',
      formal: 'Local reduction of entropy through energy processing; the thermodynamic signature of living systems',
      implications: [
        'Requires continuous energy input',
        'Observable across all scales from cells to ecosystems',
        'Configuration is accumulated negentropy'
      ]
    },
    sourceAnchors: [
      { sectionId: 'configuration-value', quote: 'refining structures that store, transmit, and reuse information' }
    ],
    tags: ['foundational', 'physics', 'life']
  },

  // Economic Reframe Concepts
  {
    id: 'value',
    name: 'Value (Configuration Economics)',
    definition: 'Configurations that increase future option space for living systems under bounded energy flux',
    epistemicStatus: 'contested',
    resolutions: {
      simple: 'Things are valuable if they give us more good options for the future, without burning through resources we can\'t replace',
      formal: 'Value = configurations that expand option space for living systems while operating within thermodynamic constraints',
      implications: [
        'This is a proposed definition, not a discovery of existing meaning',
        'Reframes value from throughput to configuration',
        'Makes physics central to economic measurement'
      ]
    },
    sourceAnchors: [
      { sectionId: 'orientation', quote: 'value is understood not as throughput or labour, but as configuration that preserves and expands future option space under bounded energy flux' }
    ],
    tags: ['core', 'definition', 'contested']
  },

  {
    id: 'accounting-error',
    name: 'Accounting Error',
    definition: 'The systematic misclassification of energy savings as energy income',
    epistemicStatus: 'derived',
    resolutions: {
      simple: 'Treating your inheritance as a salary - spending savings while thinking you\'re earning',
      formal: 'The categorical error of treating depletable energy stocks as renewable income flows in economic accounting',
      implications: [
        'Produces false signals of productivity and growth',
        'Hides future costs of depletion',
        'Many economic puzzles dissolve once corrected'
      ]
    },
    sourceAnchors: [
      { sectionId: 'accounting-error', quote: 'treatment of energy savings as income' }
    ],
    tags: ['core', 'critique', 'measurement']
  },

  {
    id: 'participation',
    name: 'Participation',
    definition: 'The right to exist, learn, care, and contribute within physical constraints',
    epistemicStatus: 'contested',
    resolutions: {
      simple: 'Everyone gets to be part of things - to live, learn, help others, and contribute - within what\'s actually possible',
      formal: 'Universal access to a sustainable share of system resources, decoupled from labour as the sole gate to legitimacy',
      implications: [
        'Replaces work as the gatekeeper of resource access',
        'Bounded by physical constraints, not unlimited',
        'Excludes exclusion as a control mechanism'
      ]
    },
    sourceAnchors: [
      { sectionId: 'universal-participation', quote: 'every person retains the right to exist, learn, care, and contribute' }
    ],
    tags: ['social', 'contested', 'ethics']
  },

  {
    id: 'work',
    name: 'Work (as concept)',
    definition: 'Activity that historically served both production and resource-access functions',
    epistemicStatus: 'derived',
    resolutions: {
      simple: 'Jobs used to both make things AND be how you got money to live. Those two functions are coming apart.',
      formal: 'Labour that simultaneously produces goods/services and gates access to resources; a bundled function now unbundling',
      implications: [
        'The coincidence of production and access is breaking',
        'Many valuable activities don\'t map to wage labour',
        'Forcing work to justify participation creates performative activity'
      ]
    },
    sourceAnchors: [
      { sectionId: 'work-wrong-question', quote: 'work served two functions simultaneously: it produced necessary goods and services, and it acted as the gate through which individuals accessed resources' }
    ],
    tags: ['social', 'economics', 'labour']
  },

  {
    id: 'viable-objective',
    name: 'Viable Objective',
    definition: 'Maximise durable human flourishing per unit of constrained throughput',
    epistemicStatus: 'contested',
    resolutions: {
      simple: 'Get the most lasting wellbeing from the least resource use',
      formal: 'Optimise for durable flourishing under throughput constraints rather than throughput growth under no constraints',
      implications: [
        'Reframes success away from volume toward quality',
        'Resilience over speed, learning over accumulation',
        'The economy reorients rather than grows or shrinks'
      ]
    },
    sourceAnchors: [
      { sectionId: 'viable-objective', quote: 'maximisation of durable human flourishing per unit of constrained throughput' }
    ],
    tags: ['core', 'objective', 'contested']
  },

  // Meta Concepts
  {
    id: 'information',
    name: 'Information',
    definition: 'Symbols, data, or encoded patterns - a subset of configuration',
    epistemicStatus: 'established',
    resolutions: {
      simple: 'Data, symbols, things written down or stored digitally',
      formal: 'Encoded patterns that can be transmitted symbolically; a subset of configuration that excludes physical arrangements',
      implications: [
        'Often confused with configuration',
        'Digitalisation alone cannot resolve physical constraints',
        'Lacks the maintenance cost dimension of full configuration'
      ]
    },
    sourceAnchors: [
      { sectionId: 'configuration-not-information', quote: 'Configuration is often mistaken for information, symbols, or data' }
    ],
    tags: ['distinction', 'clarification']
  },

  {
    id: 'epistemic-status',
    name: 'Epistemic Status',
    definition: 'The degree of certainty or contestation attached to a claim',
    epistemicStatus: 'established',
    resolutions: {
      simple: 'How sure we are about something - is it proven physics, logically derived, debatable, or an open question?',
      formal: 'Classification of claims by their epistemic warrant: established (physical law), derived (logical consequence), contested (reasonable disagreement), open (acknowledged unknown)',
      implications: [
        'Enables honest uncertainty communication',
        'Prevents false certainty',
        'Different statuses warrant different treatment'
      ]
    },
    sourceAnchors: [
      { sectionId: 'orientation', quote: 'epistemic status of each claim' }
    ],
    tags: ['meta', 'methodology']
  }
];

// Query utilities
export function getConceptById(id: string): Concept | undefined {
  return CONCEPTS.find(c => c.id === id);
}

export function getConceptsByTag(tag: string): Concept[] {
  return CONCEPTS.filter(c => c.tags.includes(tag));
}

export function getConceptsByStatus(status: EpistemicStatus): Concept[] {
  return CONCEPTS.filter(c => c.epistemicStatus === status);
}

export function getConceptsInSection(sectionId: string): Concept[] {
  return CONCEPTS.filter(c =>
    c.sourceAnchors.some(a => a.sectionId === sectionId)
  );
}
