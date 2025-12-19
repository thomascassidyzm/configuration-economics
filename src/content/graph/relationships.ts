// Distinction Network: Relationship Definitions
// Edges that show how concepts depend on or lead to each other

export type RelationType =
  | 'depends_on'      // A requires B to be understood
  | 'implies'         // A logically leads to B
  | 'contrasts_with'  // A and B are often confused
  | 'exemplifies'     // A is an instance of B
  | 'part_of'         // A is a component of B
  | 'prerequisite';   // Must understand B before A

export interface Relationship {
  id: string;
  source: string;           // concept id
  target: string;           // concept id
  type: RelationType;
  strength: 'strong' | 'moderate' | 'weak';
  explanation: string;
  bidirectional: boolean;
}

export const RELATIONSHIPS: Relationship[] = [
  // Foundation chain
  {
    id: 'envelope-grounds-all',
    source: 'physical-envelope',
    target: 'configuration',
    type: 'prerequisite',
    strength: 'strong',
    explanation: 'The physical envelope must be understood before configuration makes sense as a value concept - configuration operates within these constraints.',
    bidirectional: false
  },
  {
    id: 'energy-types-form-envelope',
    source: 'energy-income',
    target: 'physical-envelope',
    type: 'part_of',
    strength: 'strong',
    explanation: 'The income/savings distinction is a key component of the physical envelope.',
    bidirectional: false
  },
  {
    id: 'energy-savings-form-envelope',
    source: 'energy-savings',
    target: 'physical-envelope',
    type: 'part_of',
    strength: 'strong',
    explanation: 'The income/savings distinction is a key component of the physical envelope.',
    bidirectional: false
  },

  // Core concept relationships
  {
    id: 'config-enables-option',
    source: 'configuration',
    target: 'option-space',
    type: 'implies',
    strength: 'strong',
    explanation: 'Configuration is the arrangement that determines option space. Good configuration expands it.',
    bidirectional: false
  },
  {
    id: 'option-defines-value',
    source: 'option-space',
    target: 'value',
    type: 'part_of',
    strength: 'strong',
    explanation: 'Value is defined in terms of option space expansion under constraints.',
    bidirectional: false
  },
  {
    id: 'throughput-contrasts-config',
    source: 'throughput',
    target: 'configuration',
    type: 'contrasts_with',
    strength: 'strong',
    explanation: 'Throughput and configuration are the two sides of economic activity - cost vs value.',
    bidirectional: true
  },

  // Life and entropy
  {
    id: 'negentropy-exemplifies-config',
    source: 'negentropy',
    target: 'configuration',
    type: 'exemplifies',
    strength: 'moderate',
    explanation: 'Living systems maintaining order against entropy is the biological example of valuable configuration.',
    bidirectional: false
  },

  // Critique chain
  {
    id: 'error-misclassifies-energy',
    source: 'accounting-error',
    target: 'energy-savings',
    type: 'depends_on',
    strength: 'strong',
    explanation: 'The accounting error specifically concerns the misclassification of energy savings.',
    bidirectional: false
  },
  {
    id: 'throughput-enabled-error',
    source: 'throughput',
    target: 'accounting-error',
    type: 'implies',
    strength: 'moderate',
    explanation: 'Using throughput as the value proxy enabled the accounting error to persist unnoticed.',
    bidirectional: false
  },

  // Social concepts
  {
    id: 'work-contrasts-participation',
    source: 'work',
    target: 'participation',
    type: 'contrasts_with',
    strength: 'strong',
    explanation: 'Work and participation represent different framings of how people engage with economic systems.',
    bidirectional: true
  },
  {
    id: 'participation-depends-envelope',
    source: 'participation',
    target: 'physical-envelope',
    type: 'depends_on',
    strength: 'moderate',
    explanation: 'Participation must be bounded by physical constraints to be coherent.',
    bidirectional: false
  },
  {
    id: 'objective-integrates-all',
    source: 'viable-objective',
    target: 'configuration',
    type: 'depends_on',
    strength: 'strong',
    explanation: 'The viable objective is defined in terms of configuration quality per unit throughput.',
    bidirectional: false
  },
  {
    id: 'objective-integrates-throughput',
    source: 'viable-objective',
    target: 'throughput',
    type: 'depends_on',
    strength: 'strong',
    explanation: 'The viable objective constrains throughput as the denominator.',
    bidirectional: false
  },

  // Meta relationships
  {
    id: 'info-subset-config',
    source: 'information',
    target: 'configuration',
    type: 'part_of',
    strength: 'strong',
    explanation: 'Information is a subset of configuration - the symbolic part without physical maintenance.',
    bidirectional: false
  },
  {
    id: 'info-contrasts-config',
    source: 'information',
    target: 'configuration',
    type: 'contrasts_with',
    strength: 'moderate',
    explanation: 'Despite being a subset, information is often confused with the full concept of configuration.',
    bidirectional: true
  }
];

// Query utilities
export function getRelationshipsFrom(conceptId: string): Relationship[] {
  return RELATIONSHIPS.filter(r => r.source === conceptId);
}

export function getRelationshipsTo(conceptId: string): Relationship[] {
  return RELATIONSHIPS.filter(r => r.target === conceptId);
}

export function getRelationshipsFor(conceptId: string): Relationship[] {
  return RELATIONSHIPS.filter(r =>
    r.source === conceptId || r.target === conceptId
  );
}

export function getPrerequisites(conceptId: string): string[] {
  return RELATIONSHIPS
    .filter(r => r.target === conceptId && r.type === 'prerequisite')
    .map(r => r.source);
}

export function getDependents(conceptId: string): string[] {
  return RELATIONSHIPS
    .filter(r => r.source === conceptId && r.type === 'prerequisite')
    .map(r => r.target);
}
