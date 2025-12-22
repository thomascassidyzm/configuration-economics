# Configuration Economics - Integration Plan

## Vision

**2025**: Distinction physics (foundational work)
**2026**: Apply distinction physics to economics → Configuration Economics

**Two deliverables:**
1. A valuable piece of work for the planet - accessible at any level
2. A proposed format for future academic publishing

**Alexander is the bridge** - the epistemic guide that demonstrates both accessibility and the new format.

---

## Current State (v0.1.4, Dec 2025)

### What exists:
- **22 proposition nodes** with surface text + underlying logic
- **Essay 1** (11 sections) mapped to propositions
- **Alexander** present as contextual guide (right panel)
- **Epistemic status markers** (established, derived, contested, open)
- **Version + build tracking**
- **/explore page** showing all propositions

### What's working:
- Propositions are self-contained, meaningful in isolation
- Essay reads well as linear narrative
- Alexander responds contextually
- Site feels calm, invitational, legible

### Known gaps:
- Alexander doesn't explicitly know the propositions
- No way to enter at different levels
- One open question: coordination mechanisms under constraint
- Essay and propositions exist in parallel but aren't deeply connected

---

## Deeper Integration: What It Means

### 1. Alexander becomes proposition-aware

Currently Alexander is a general guide. Next step: Alexander knows the 22 propositions and can:

- Reference them by name when relevant
- Explain the underlying logic when asked
- Show how propositions connect to each other
- Navigate a reader to the right proposition for their question
- Distinguish established vs contested claims

**Implementation:**
- Update Alexander's system prompt with proposition summaries
- Give Alexander explicit permission to say "This relates to the proposition on X..."
- Allow Alexander to surface the logical structure on demand

### 2. Multiple entry points

Currently: Essay is the main entry, /explore is secondary.

Needed:
- **"How to read this" page** - orients new readers, legitimizes non-linear use
- **Question-based entry** - "What is configuration?" → Alexander guides to relevant proposition
- **Level adaptation** - same content, different depth based on reader

**Implementation:**
- Create /about or /guide page (calm, short, explains the format)
- Consider: Alexander on homepage as entry point?
- Proposition pages could have "simple" and "formal" views

### 3. Essay ↔ Proposition connection

Currently: We've mapped them manually, but the site doesn't show this.

Options (in order of increasing complexity):
- **Minimal**: "Related propositions" note at end of each essay section
- **Medium**: Clickable links from essay to propositions
- **Full**: Bidirectional - propositions show which essay sections use them

**Recommendation:** Start minimal. Add "Related propositions" to essay sections. See if it helps.

### 4. Epistemic transparency

The format's innovation is honesty about uncertainty.

Currently: Status badges exist but aren't explained.
Needed:
- Clear explanation of what established/derived/contested/open mean
- Alexander should reference epistemic status when relevant
- Open questions should be explicitly marked as open (not gaps to fill)

---

## Proposed Next Steps (Priority Order)

### Phase 1: Alexander Integration ✓ (v0.1.5)
1. ✓ Updated Alexander's prompt to include proposition awareness
2. ✓ Added compact proposition index (22 propositions with titles + claims)
3. ✓ Section-to-proposition mapping for contextual injection
4. ✓ Relevant propositions injected into prompt based on current section
5. Test: Can Alexander reference propositions appropriately?
6. Test: Can Alexander explain logic when asked?

### Phase 2: Reader Orientation
5. Create "How to read this" page
6. Add minimal essay → proposition links (end of section notes)
7. Ensure epistemic status is explained somewhere

### Phase 3: Entry Points
8. Consider Alexander on homepage
9. Consider question-based navigation
10. Consider level-based views (simple/formal toggle)

### Phase 4: Adversarial Testing
11. Have agents attack the propositions
12. Identify weak links, contradictions, unsupported claims
13. Refine or mark as contested

---

## Open Questions (Genuinely Open)

1. **What coordination mechanisms remain coherent under physical constraint?**
   - Markets as we know them may be part of the problem
   - Left intentionally open - work to be done

2. **How much should Alexander lead vs follow?**
   - Currently reactive (answers questions)
   - Could be proactive (suggests what to read next)
   - Balance: helpful without being pushy

3. **What's the right level of proposition granularity?**
   - 22 feels right for Essay 1
   - Too few = can't navigate; too many = overwhelming
   - Let it emerge from use

4. **How to handle disagreement with the framework?**
   - Alexander should steelman objections
   - Contested status exists for a reason
   - The format should welcome critique, not deflect it

---

## Success Criteria

**For the work itself:**
- Someone can understand Configuration Economics at their level
- The argument is traceable - every claim has backing
- Open questions are honestly marked
- The work could survive serious critique

**For the format:**
- Demonstrates that AI guides can enhance understanding
- Shows propositions + essays + guide as a coherent system
- Other academics could adopt this format
- Living document that improves over time

---

## Technical Notes

### Files to modify for Alexander integration:
- `/src/lib/guide-prompt.ts` - Alexander's system prompt
- Potentially create `/src/content/propositions-summary.ts` for compact version

### Files to create:
- `/src/pages/guide.astro` or `/src/pages/about.astro` - "How to read this"
- Possibly `/src/pages/nodes/[id].astro` - individual proposition pages (later)

### Current proposition IDs (for reference):
```
v0.1: energy-income-inheritance, throughput-cost, value-option-space,
      work-wrong-question, participation-limits

v0.2: structural-memory, complexity-maintenance, care-as-configuration,
      prevention-over-repair, stability-not-stasis

v0.3: time-asymmetry, displaced-costs, contextual-scarcity, substitution-limits,
      growth-masks-strain, money-as-signal, coordination-wealth,
      legibility-truth-tradeoff, transition-fragility, ignoring-physics

v0.4: configuration-not-information, viable-objective
```

---

## Notes for Future Sessions

- This document is the reference for where we are and where we're going
- Start with Phase 1 (Alexander integration) - it's highest leverage
- Don't expand surface area until integration is solid
- The goal is depth and coherence, not breadth
- Restraint is a feature
