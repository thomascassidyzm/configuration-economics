# CLAUDE.md - Project Context for AI Assistants

## Project Overview

**Configuration Economics** is a living epistemic work that applies physics-grounded accounting to economic value. It's the 2026 application of **Distinction Physics** (2025 foundational work).

**Core thesis**: Value = configurations that expand future option space under bounded energy flux.

## Current State (v0.1.5, Dec 2025)

### What Exists
- **22 proposition nodes** with surface text + underlying logic
- **Essay 1** (11 sections) mapped to propositions
- **Alexander** (the Guide) - proposition-aware epistemic companion
- **Epistemic status markers** - established, derived, contested, open
- **/explore page** showing all propositions
- **Version + build tracking** (semantic version + git hash)

### Key Files

```
src/
├── content/
│   ├── propositions.ts      # 22 proposition nodes with logic
│   └── essay-1/
│       └── config.ts        # Essay section metadata
├── lib/
│   ├── guide-prompt.ts      # Alexander's system prompt + proposition index
│   └── version.ts           # Version tracking (v0.1.x)
├── pages/
│   ├── index.astro          # Landing page
│   ├── essay/index.astro    # Main essay with Guide panel
│   ├── explore.astro        # Proposition browser
│   └── api/guide.ts         # Claude API endpoint
└── components/
    └── GuidePanel.astro     # Right-side Guide interface
```

### Proposition IDs
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

## Architecture Decisions

### Propositions, Not Graphs
- Text remains canonical; propositions support, not replace
- Nodes must be meaningful in isolation
- Links are non-semantic ("links to" only, not typed relationships)
- Restraint is a feature - don't expand surface area prematurely

### Alexander Integration
- Receives section context via `currentSection` / `currentSectionId`
- Propositions injected based on current essay section (see `SECTION_PROPOSITIONS` mapping)
- Should reference propositions naturally when relevant, not constantly
- Uses "CONTEXT AWARENESS" section to understand "this section" queries

### Epistemic Status
- **Established**: Grounded in physics, widely accepted
- **Derived**: Follows logically from established claims
- **Contested**: Reasonable disagreement exists
- **Open**: Genuinely unresolved question

## Theoretical Foundation

### Connection to Distinction Physics
Configuration Economics builds on Distinction Physics (separate project at `/Users/tomcassidy/Distinction_Project/`):

- **Distinction Physics**: Distinctions are primitive, cost energy, observers have finite budgets
- **Configuration Economics**: Configurations (patterns of distinctions) expand or contract future distinction-making potential

### Option Space Definition (Working)
> **Option Space** = Future distinction-making potential

A configuration with high option space enables many stable distinction-patterns to be realized with bounded energy. This connects to:
- Lee Cronin's Assembly Theory (backward complexity)
- Our need for forward-looking measure (Option Potential)

### The Viable Objective
> Maximize durable flourishing per unit of bounded throughput

Or in distinction terms:
> Maximize sustainable future distinction-making potential per unit of constrained energy throughput

## Development

```bash
npm install          # Install dependencies
npm run dev          # Dev server (localhost:4321)
npm run build        # Production build
```

Environment: `ANTHROPIC_API_KEY` required for Guide functionality.

Deployed on Vercel - auto-deploys from main branch.

## Open Questions

1. **Coordination mechanisms under physical constraint** - Markets may be part of the problem; left intentionally open
2. **How to measure option space empirically** - Assembly Theory connection explored but not resolved
3. **How much should Alexander lead vs follow** - Currently reactive, could be proactive

## Roadmap (see PLAN.md)

- **Phase 1**: Alexander Integration ✓ (v0.1.5)
- **Phase 2**: Reader Orientation (How to read this page, essay→proposition links)
- **Phase 3**: Entry Points (question-based navigation)
- **Phase 4**: Adversarial Testing (agents attack propositions)

## Related Projects

- **Distinction Physics** (`/Users/tomcassidy/Distinction_Project/`) - Foundational meta-theory, V7 in progress
- This work is the 2026 application of that foundation

## Style Notes

- Calm, invitational, legible design
- Dark theme with blue accent (#4a9eff)
- Fonts: Cormorant Garamond (display), Sora (body), JetBrains Mono (code)
- No preaching, no urgency - let the physics speak
