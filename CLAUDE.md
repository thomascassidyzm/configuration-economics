# CLAUDE.md - Project Context for AI Assistants

## Project Overview

**Configuration Economics** is a living epistemic work that applies physics-grounded accounting to economic value. It's the 2026 application of **Distinction Physics** (2025 foundational work).

**Core thesis**: Value = configurations that expand future option space under bounded energy flux.

## Current State (v0.7.0, May 2026)

### What Exists
- **30 proposition nodes** with surface text + underlying logic
- **Essay 1** (11 sections) mapped to propositions
- **Alexander** (the Guide) - proposition-aware epistemic companion. As of v0.7.0, mounted on every grokkable surface (essay, overview, explore, research-frontier, lineage, objections, applications/moves, practice) with mode-adaptive register tuned to each surface's resolution.
- **Epistemic status markers** - established, derived, contested, open
- **/explore page** showing all propositions
- **/applications/moves** - the local Δω rule operating on six worked cases, plus Alexander wielding it on reader-supplied moves
- **/lineage** - predecessors, debts, and CE's specific delta against each
- **/objections** - the strongest attacks engaged with steelman + response + concession
- **Version + build tracking** (semantic version + git hash)

### Key Files

```
src/
├── content/
│   ├── propositions.ts      # 30 proposition nodes with logic
│   ├── version-history.ts   # Version-grain changelog
│   └── essay-1/
│       └── config.ts        # Essay section metadata
├── lib/
│   ├── guide-prompt.ts      # Alexander's system prompt + proposition index
│   └── version.ts           # Version tracking
├── pages/
│   ├── index.astro          # Landing page
│   ├── essay/index.astro    # Main essay with Guide panel
│   ├── explore.astro        # Proposition browser
│   ├── lineage.astro        # Predecessors and CE's specific delta
│   ├── objections.astro     # Strongest attacks engaged
│   ├── applications/
│   │   └── moves.astro      # Worked Δω examples
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

v0.4: configuration-not-information

v0.5: option-space-measurability, viable-objective

v0.6: observer-relative-option-space, exergy-not-energy, binding-constraint,
      option-space-as-chess-moves

v0.7: labour-as-allocator, asymmetry-of-option-space-change,
      configuration-generates-configuration
```

Bucket counts (v0.4.0 release): 1 established / 19 derived / 9 contested / 1 open.
All four populated. The single `open` is `option-space-measurability`,
explicitly the framework's central open problem.

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
Configuration Economics builds on Distinction Physics (separate project at `/Users/tomcassidy/distinction-physics/`):

- **Distinction Physics**: Distinctions are primitive, cost energy, observers have finite budgets
- **Configuration Economics**: Configurations (patterns of distinctions) expand or contract future distinction-making potential

Per v0.2 direction (April 2026, see `PLAN.md`), CE's main argument now stands on non-equilibrium thermodynamics + ecological economics. DP is offered as preferred foundational vocabulary, not required grounding. A specific §4.2 variational bridge is worked out as one optional formalisation of option space.

### Option Space Definition (Working)
> **Option Space** = Future distinction-making potential

A configuration with high option space enables many stable distinction-patterns to be realized with bounded energy. This connects to:
- Lee Cronin's Assembly Theory (backward complexity)
- Our need for forward-looking measure (Option Potential)

### The Viable Objective
> Prefer moves that keep R_living(C, B, T) open for every major class of life and every relevant horizon; reject moves that asymptotically empty it.

A no-regret criterion over moves, not a scalar maximisation over states. Closer to *first do no harm* than *maximise this number*. State-comparison is the static frame (partial order over configurations); move-evaluation is the dynamic frame (Δω over horizons). Both are needed.

Earlier framings as "maximise durable flourishing per unit of bounded throughput" were tighter to read but smuggled in an aggregation rule the criterion does not require. See `viable-objective` (P22) and `option-space-as-chess-moves` for the v0.2.0 reframe.

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

- **Distinction Physics** (`/Users/tomcassidy/distinction-physics/`) - Foundational meta-theory, actively evolving. CE treats it as preferred foundational vocabulary, not required grounding (see `PLAN.md` v0.2 direction).
- This work is the 2026 application of that foundation, now decoupled from any single DP version.

## Style Notes

- Calm, invitational, legible design
- Dark theme with blue accent (#4a9eff)
- Fonts: Cormorant Garamond (display), Sora (body), JetBrains Mono (code)
- No preaching, no urgency - let the physics speak
