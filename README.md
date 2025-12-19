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

- **Multiple collapse modes**: Overview, Essay, Academic, Explore, Guided, Research Frontier
- **Epistemic status visual language**: Established, Derived, Contested, Open
- **Resolution layers**: Same content at multiple depths
- **Integrated epistemic guide**: AI companion trained on the corpus
- **Adversarial transparency**: Critiques published alongside canonical text
- **Versioned evolution**: Living document with visible history

## Project Structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Entry point
│   │   ├── concept-dark.astro    # Format exploration (dark)
│   │   ├── concept-light.astro   # Format exploration (light)
│   │   └── api/
│   │       └── guide.ts          # Guide API endpoint
│   ├── lib/
│   │   └── guide-prompt.ts       # Guide system prompt
│   ├── content/
│   │   └── GUIDE_SYSTEM_PROMPT.md
│   └── components/
├── public/
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
