# Configuration Economics

A **Living Epistemic Work** — a new publication format where content exists in superposition until the reader's intent causes collapse into an appropriate projection.

## What This Is

Configuration Economics is:
- An accounting reframing grounded in physics
- A physics-aligned value system
- A way to make hidden costs and future losses legible

The work redefines value as: **configurations that increase future option space for living systems under bounded energy flux.**

## The Format

This isn't just content — it's a new publication format featuring:

- **Multiple collapse modes**: Overview, Essay, Explore, and Research Frontier, chosen from `/format` — the same work entered at the depth the reader wants. The Essay carries an in-page Academic register with citations and formal structure.
- **Epistemic status visual language**: Established, Derived, Contested, Open — wired to every proposition
- **Resolution layers**: the same claim at core-claim, formal-definition, implications, and open-questions depth
- **Integrated epistemic guide (Alexander)**: an AI companion grounded in the corpus, present on every surface — which is why there is no separate "Guided" mode
- **Adversarial transparency**: critiques published alongside canonical text — `/objections` (whole-framework attacks) and `/attack` (per-premise stress-testing)
- **Worked application**: `/applications/moves` runs the framework's local Δω rule on real cases
- **Lineage**: `/lineage` stakes the framework's specific delta against its predecessors
- **Versioned evolution**: a living document with visible history (`/changelog`) and its in-progress drafts left readable (`/drafts`)

## Project Structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Landing / entry point
│   │   ├── format.astro             # Projection chooser + light/dark toggle
│   │   ├── overview.astro           # Essay sections with anchored propositions
│   │   ├── essay/index.astro        # Main essay (incl. Academic register)
│   │   ├── explore.astro            # Proposition browser + epistemic-status filter
│   │   ├── research-frontier.astro  # Open & contested propositions
│   │   ├── lineage.astro            # Predecessors and CE's specific delta
│   │   ├── objections.astro         # Strongest whole-framework attacks, engaged
│   │   ├── attack.astro             # Per-premise stress-testing
│   │   ├── applications/moves.astro # Worked local-Δω evaluations
│   │   ├── practice.astro           # The work as an instance of its own theory
│   │   ├── changelog.astro          # Version-grain history
│   │   ├── drafts/                  # In-progress drafts, rendered read-only
│   │   ├── concept-dark.astro       # 301 → /format (legacy bookmark redirect)
│   │   ├── concept-light.astro      # 301 → /format (legacy bookmark redirect)
│   │   └── api/guide.ts             # Guide (Alexander) API endpoint
│   ├── content/
│   │   ├── propositions.ts          # The proposition canon
│   │   ├── version-history.ts       # Version-grain changelog data
│   │   ├── GUIDE_SYSTEM_PROMPT.md   # Alexander's epistemic contract
│   │   └── essay-1/                 # Essay section metadata + text
│   ├── lib/
│   │   ├── guide-prompt.ts          # Alexander's system prompt + proposition index
│   │   ├── version.ts               # Version tracking
│   │   ├── section-renderer.ts      # Essay section rendering
│   │   └── math.ts                  # Option-space formal helpers
│   └── components/
│       ├── GuidePanel.astro         # Right-side Guide interface
│       └── Guide.astro              # Guide mount
├── drafts/                          # Draft markdown (source for /drafts)
├── public/
├── CLAUDE.md                        # Project context for AI assistants
├── PLAN.md                          # Session log / provenance
└── package.json
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

For Vercel deployment, set:

```
ANTHROPIC_API_KEY=your-api-key
```

## Deployment

This project is configured for Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add `ANTHROPIC_API_KEY` to environment variables
4. Deploy

## The Guide

The epistemic guide is an AI companion that:
- Helps readers form precise distinctions
- Adapts to their resolution level
- Knows the epistemic status of claims
- Never invents facts outside the corpus
- Acknowledges open questions honestly

See `src/content/GUIDE_SYSTEM_PROMPT.md` for the full epistemic contract.

## License

TBD

---

*Configuration Economics is a living work. This repository will evolve.*
