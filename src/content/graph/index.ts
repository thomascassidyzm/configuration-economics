// Distinction Network: Main Index
// Unified interface to the knowledge graph

export * from './concepts';
export * from './distinctions';
export * from './relationships';

import { CONCEPTS, getConceptById, type Concept } from './concepts';
import { DISTINCTIONS, getDistinctionById, getDistinctionsForConcept, type Distinction } from './distinctions';
import { RELATIONSHIPS, getRelationshipsFor, getPrerequisites, type Relationship } from './relationships';

// Graph Statistics
export function getGraphStats() {
  return {
    conceptCount: CONCEPTS.length,
    distinctionCount: DISTINCTIONS.length,
    relationshipCount: RELATIONSHIPS.length,
    establishedCount: CONCEPTS.filter(c => c.epistemicStatus === 'established').length,
    derivedCount: CONCEPTS.filter(c => c.epistemicStatus === 'derived').length,
    contestedCount: CONCEPTS.filter(c => c.epistemicStatus === 'contested').length,
    openCount: CONCEPTS.filter(c => c.epistemicStatus === 'open').length,
  };
}

// Full context for a concept
export interface ConceptContext {
  concept: Concept;
  distinctions: Distinction[];
  relationships: Relationship[];
  prerequisites: Concept[];
  relatedConcepts: Concept[];
}

export function getConceptContext(conceptId: string): ConceptContext | undefined {
  const concept = getConceptById(conceptId);
  if (!concept) return undefined;

  const distinctions = getDistinctionsForConcept(conceptId);
  const relationships = getRelationshipsFor(conceptId);
  const prerequisiteIds = getPrerequisites(conceptId);
  const prerequisites = prerequisiteIds
    .map(id => getConceptById(id))
    .filter((c): c is Concept => c !== undefined);

  // Get all related concepts from distinctions and relationships
  const relatedIds = new Set<string>();
  distinctions.forEach(d => {
    if (d.conceptA !== conceptId) relatedIds.add(d.conceptA);
    if (d.conceptB !== conceptId) relatedIds.add(d.conceptB);
  });
  relationships.forEach(r => {
    if (r.source !== conceptId) relatedIds.add(r.source);
    if (r.target !== conceptId) relatedIds.add(r.target);
  });
  const relatedConcepts = Array.from(relatedIds)
    .map(id => getConceptById(id))
    .filter((c): c is Concept => c !== undefined);

  return {
    concept,
    distinctions,
    relationships,
    prerequisites,
    relatedConcepts
  };
}

// Learning path: concepts in dependency order
export function getLearningPath(targetConceptId: string): Concept[] {
  const visited = new Set<string>();
  const path: Concept[] = [];

  function visit(conceptId: string) {
    if (visited.has(conceptId)) return;
    visited.add(conceptId);

    // Visit prerequisites first
    const prereqs = getPrerequisites(conceptId);
    prereqs.forEach(visit);

    const concept = getConceptById(conceptId);
    if (concept) path.push(concept);
  }

  visit(targetConceptId);
  return path;
}

// Find concepts related by a specific type
export function findRelatedByType(conceptId: string, relationType: string): Concept[] {
  const rels = RELATIONSHIPS.filter(r =>
    (r.source === conceptId || r.target === conceptId) &&
    r.type === relationType
  );

  const ids = rels.map(r => r.source === conceptId ? r.target : r.source);
  return ids
    .map(id => getConceptById(id))
    .filter((c): c is Concept => c !== undefined);
}

// Search concepts by text
export function searchConcepts(query: string): Concept[] {
  const q = query.toLowerCase();
  return CONCEPTS.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.definition.toLowerCase().includes(q) ||
    c.resolutions.simple.toLowerCase().includes(q) ||
    c.tags.some(t => t.toLowerCase().includes(q))
  );
}

// Get concepts for a section
export function getConceptsForSection(sectionId: string): Concept[] {
  return CONCEPTS.filter(c =>
    c.sourceAnchors.some(a => a.sectionId === sectionId)
  );
}

// Validate graph integrity
export function validateGraph(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check all distinction references point to real concepts
  DISTINCTIONS.forEach(d => {
    if (!getConceptById(d.conceptA)) {
      errors.push(`Distinction ${d.id} references unknown concept: ${d.conceptA}`);
    }
    if (!getConceptById(d.conceptB)) {
      errors.push(`Distinction ${d.id} references unknown concept: ${d.conceptB}`);
    }
  });

  // Check all relationship references point to real concepts
  RELATIONSHIPS.forEach(r => {
    if (!getConceptById(r.source)) {
      errors.push(`Relationship ${r.id} references unknown source: ${r.source}`);
    }
    if (!getConceptById(r.target)) {
      errors.push(`Relationship ${r.id} references unknown target: ${r.target}`);
    }
  });

  return { valid: errors.length === 0, errors };
}
