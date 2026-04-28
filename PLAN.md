# Configuration Economics - Integration Plan

## Vision

**2025**: Distinction physics (foundational work)
**2026**: Apply distinction physics to economics → Configuration Economics

**Two deliverables:**
1. A valuable piece of work for the planet - accessible at any level
2. A proposed format for future academic publishing

**Alexander is the bridge** - the epistemic guide that demonstrates both accessibility and the new format.

---

## Current State (v0.1.5, Dec 2025)

### What exists:
- **22 proposition nodes** with surface text + underlying logic
- **Essay 1** (11 sections) mapped to propositions
- **Alexander** - proposition-aware epistemic guide (right panel)
- **Epistemic status markers** (established, derived, contested, open)
- **Version + build tracking** (semantic + git hash)
- **/explore page** showing all propositions
- **Typing indicator** (blue dots while Alexander thinks)

### What's working:
- Propositions are self-contained, meaningful in isolation
- Essay reads well as linear narrative
- Alexander responds contextually and knows current section
- Alexander can reference relevant propositions
- Site feels calm, invitational, legible

### Known gaps:
- No way to enter at different levels
- One open question: coordination mechanisms under constraint
- Essay and propositions exist in parallel but visible connection is minimal
- Option space not yet rigorously defined

---

## v0.2 Direction (April 2026)

### Trigger

A 6-critic review was run at the start of the 2026 push. Each critic produced a deep memo. Synthesis captured here. Memos at `~/Desktop/configecon-review-2026-04-23/`:

- `01-foundational-bridge.md` — DP coupling
- `02-propositional-coherence.md` — per-proposition audit
- `03-economics-engagement.md` — prior-art map, reading list
- `04-physics-rigour.md` — term-by-term, exergy argument
- `05-format-novelty.md` — claimed-vs-implemented, attack-this-premise
- `06-adversarial-gap.md` — 15 attacks, ranked v0.2 plan

### Convergent findings

1. **Option space is the keystone AND the weakest joint** — genuinely novel (Lens 3), most-linked (P3 has 10 inbound), bridge point to DP and Assembly Theory, but currently rhetorical. Needs operationalisation.
2. **Physics translation is one pass from clean.** Thread *exergy* through wherever "energy" carries the load. Concede open-system / solar flux (~175 PW vs ~18 TW) explicitly and redirect the binding to entropy-dump + materials.
3. **Prior art must be cited.** Soddy 1926, Georgescu-Roegen 1971, Daly, Tainter, Scott, Waring/Folbre. Defensible novel delta is forward-looking option space vs Cronin's backward-looking Assembly Index.
4. **Epistemic-status claimed but not wired to propositions.** `Proposition` interface has no `epistemicStatus` field. The format's signature innovation isn't implemented on its atomic units.
5. **Format claims outrun implementation; guide is epistemically fragile.** README lists 6 collapse modes; ~3 exist, one cosmetic. Alexander has one-line claims in prompt, no corpus retrieval — "never invent facts not in the corpus" unenforced.
6. **~Half the proposition logic blocks are decorative.** ~10 of 22 do real deductive work. P20 (`ignoring-physics`) is cleanest; P22 (`viable-objective`) is shakiest.

### Resolved divergences

**DP coupling: decouple rhetorically, couple optionally.** Main argument stands on non-equilibrium thermodynamics + ecological econ. DP becomes preferred foundational vocabulary — offered not required. A specific §4.2 variational bridge is worked out as *one* formalisation of option space, clearly marked as deepening rather than foundation. CE survives if DP drifts. Robust, future-proof, flexible.

**Format vs content: content first, format demo second, same push.** Positioning + counterargument work tightens premises; attack-this-premise killer demo is built on premises that deserve it.

### Brand strategy

Guide names preserved across projects. Alexander stays on CE, Leibniz stays on DP. Alexander's brand compounds across the epistemic-guide format; every CE reader who values the guide is a warm lead for getalexander.app. A subtle attribution surface in the guide panel is worth adding when convenient.

### Ordered push plan

1. **Operationalise option space** — toy formalism + one worked example; §4.2 variational bridge as optional deepening. *Partial: `option-space-measurability` proposition added (status `open`), formally acknowledging the open question inside the format.*
2. **Add `epistemicStatus` to Proposition interface; label all 22.** *Done. 15 derived, 7 contested, 0 established, 1 open after step 1 addition.*
3. **Exergy pass + solar-flux concession paragraph.** *Drafted in `drafts/exergy-terminology-notes.md` and `drafts/proposed-propositions.md` (see `exergy-not-energy`, `binding-constraint`). Awaiting review.*
4. **Positioning / Prior Art section.** *Scaffold drafted in `drafts/lineage-and-positioning.md`. Predecessors mapped with CE's specific delta.*
5. **Counterargument engagement.** Services economy, decoupling data, Solow substitutability, solar flux scale. *Not started.*
6. **Meta-docs cleanup.** *Done: CLAUDE.md path drift fixed, V7 softened; `PROPOSITION_INDEX` drift surface removed from `guide-prompt.ts`.*
7. **Attack-this-premise demo.** Format killer moment; relies on 1–5 being solid.

Steps 1–5 are the content push. Step 7 is the format push. Step 6 is housekeeping.

### Autonomous session log — 2026-04-23

Two AFK windows. Changes shipped directly to canonical (low-risk, review-supported):

- `epistemicStatus` type + field added to `Proposition` interface; all 22 propositions labelled per Lens 2 audit.
- `option-space-measurability` proposition added (v0.5 section of `propositions.ts`, status `open`), formally promoting the long-acknowledged open question into the proposition set. Mapped into `SECTION_PROPOSITIONS` for `configuration-value`, `configuration-not-information`, `viable-objective`.
- `/explore` page now renders status badges per proposition plus a legend. Restrained aesthetic preserved.
- Alexander's proposition-context injection now includes `[status]` tags and reads from `PROPOSITIONS` directly; `PROPOSITION_INDEX` drift surface deleted.
- `CLAUDE.md` path drift and V7 language corrected; v0.2 decoupling stance noted.

**Drafts written to `drafts/` for author review (not yet canonical):**

*Round 1:*
- `drafts/proposed-propositions.md` — two candidate propositions (`exergy-not-energy` and `binding-constraint`). Promoting both brings bucket counts to 1 / 16 / 7 / 1.
- `drafts/exergy-terminology-notes.md` — three-level edit plan (minimal / surgical / completionist) for threading exergy through the essay without losing voice.
- `drafts/lineage-and-positioning.md` — full scaffold for a `/lineage` page (predecessors: Soddy, Georgescu-Roegen, Daly, Tainter, Scott, Waring, Cronin, Arthur/Beinhocker, Hickel/Jackson), with CE's specific delta staked.

*Round 2:*
- `drafts/option-space-formalisation.md` — the keystone draft. Candidate formalisation as reachable configurations under bounded exergy budget; recommends Assembly-weighted measure; worked forest-vs-monoculture example; five explicit open problems. This is what makes the measurability attack non-fatal.
- `drafts/counterargument-engagement.md` — steelman + response + concession for five attacks (measurability, degrowth-in-disguise, services economy, decoupling, Solow substitutability). Proposes a dedicated Objections chapter.
- `drafts/proposition-tightening.md` — rewrites of P5, P10, P16, P19 removing normative smuggle per Lens 2. Each gains a `predictive` field. Low-risk, high-leverage. ~5 minutes per to promote.

Session notes at `~/Desktop/configecon-session-notes-2026-04-23.md`.

### Round 3 — architectural wiring (2026-04-23 afternoon)

After realising the concept-page *is* the architectural spec (not aspirational decoration), began wiring concept → reality. Proof-of-pattern pass:

- **Schema extension.** Added `ResolutionLayers` type and optional `layers?` field to `Proposition`. Populated for 5 anchor propositions (P1 `energy-income-inheritance`, P2 `throughput-cost`, P3 `value-option-space`, P22 `viable-objective`, `option-space-measurability`). Remaining 18 get filled over time. Renderers fall back to surface/logic where `layers` is absent.
- **Status filter on `/explore`.** Chips for All / Established / Derived / Contested / Open, with counts. URL query-param support: `/explore?status=contested` opens pre-filtered; chip clicks update URL via `history.replaceState` without reload. CSS-driven filter (no re-render).
- **Intent buttons wired in `concept-light.astro` + `concept-dark.astro`.** `data-route` attributes route "Explain simply" → `/essay`, "Show me the structure" → `/explore`, "What's contested?" → `/explore?status=contested`. "What is this?" and "Academic format" left unrouted (empty `data-route` = no-op) until their target pages exist.

**Pattern established.** The concept-page's unwired buttons now have a templated wiring approach; future modes (Academic, Overview, Research Frontier) follow the same shape — add the page, add `data-route`, done.

**Next architectural hooks (not this session):**
- Build `/academic` page consuming the logic blocks + lineage draft + counterargument draft.
- Build `/research-frontier` consuming option-space-formalisation + `open` propositions.
- Add `currentMode` to Alexander's context and per-mode register guidance in system prompt.
- Populate `layers` on the remaining 18 propositions.

### Round 4 — `/overview` mode + layers complete (2026-04-23 late afternoon)

Continued the concept → reality wiring. Second mode now live.

- **`/overview` page built.** Shows the essay's 11 sections in order, each with its anchored propositions (title, status badge, core claim). Propositions not mapped to any specific section appear in a "Cross-cutting" block at the end. Uses `layers.coreClaim` when present, falls back to `logic.claim` otherwise — so the page works at any state of layer population.
- **"What is this?" intent button wired** → `/overview` in both `concept-light` and `concept-dark`. Four of five intent buttons now live; only "Academic format" remains unrouted (waiting on `/academic` page).
- **All 23 propositions now carry `layers`.** Filled the remaining 18 (P4–P21 excluding P22 which was already done) with Core Claim / Formal Definition / Implications / Open Questions — derived from existing surface + logic content, preserved voice. `openQuestions` populated where a genuine open question exists (P5, P7, P14, P16, P18, P21, plus the 5 originals). Total: 12 propositions now carry open-question flags.

**Bucket state, post-round-4:** Same as round 3 (no status changes) — 0 established, 15 derived, 7 contested, 1 open. The draft propositions `exergy-not-energy` and `binding-constraint` (`drafts/proposed-propositions.md`) still waiting on your voice-approval before promotion.

**What `/overview` demonstrates:** the progressive-disclosure pattern is real. `coreClaim` is the accessible surface; full `layers` and `logic` are a click away via `/explore`. Any future mode can pick which layer(s) to surface.

### Round 5 — Alexander per-mode register + /research-frontier + clickable mode-cards (2026-04-23 evening)

Third collapse mode now live; Alexander adapts to any mode automatically.

- **Alexander `currentMode` wired end-to-end.** Added `ReaderMode` type with 7 values (entry / overview / essay / explore / academic / research-frontier / guided). Added `MODE-ADAPTIVE REGISTER` section to the system prompt with specific register guidance per mode. `buildPromptWithContext` now injects `The reader is currently in **X** mode` into the context block. `GuidePanel.astro` infers mode from URL pathname (overridable via `window.currentMode`), passes it in every API request. Default mode when unspecified: `essay`.
- **`/research-frontier` page built.** Shows `open` and `contested` propositions grouped by status, using `layers.formalDefinition` as the core statement and foregrounding `layers.openQuestions` where populated (8 propositions total: 1 open + 7 contested). Includes a note pointing at the `drafts/option-space-formalisation.md` as the highest-leverage in-progress technical material. Styled as the work's "living boundary."
- **Mode-cards clickable on both concept pages.** All six mode-cards carry `data-route` attributes; 4 of 6 route live (overview, essay, explore, research). Academic and Guided stay unrouted until their pages exist. Shared `wireRoute()` helper in `concept-light`; reused pattern in `concept-dark`.

**Routing state after Round 5:**

| Entry point | Route | Status |
|---|---|---|
| "What is this?" intent | `/overview` | ✓ live |
| "Explain simply" intent | `/essay` | ✓ live |
| "Show me the structure" intent | `/explore` | ✓ live |
| "Academic format" intent | — | waiting |
| "What's contested?" intent | `/explore?status=contested` | ✓ live |
| Overview mode card | `/overview` | ✓ live |
| Essay mode card | `/essay` | ✓ live |
| Academic mode card | — | waiting |
| Explore mode card | `/explore` | ✓ live |
| Guided mode card | — | waiting |
| Research Frontier mode card | `/research-frontier` | ✓ live |

**Ratio:** 8 of 11 entry points live.

### Round 6 — single `/format` route with in-page theme toggle (2026-04-23 evening)

- **`/format` created** from `concept-light.astro` as the base. Cream (light) palette is the default; dark palette applied via `html.dark-mode` class which overrides the same CSS variables so all structural CSS stays untouched. One `<style>` block, two themes.
- **Theme toggle rewired.** `◐ Dark Mode` / `◐ Light Mode` button in the top-right flips `html.dark-mode` class and persists to `localStorage` under `format-theme`. An `is:inline` script in `<head>` applies stored preference *before first paint* — no flash of wrong theme.
- **Old routes redirect.** `/concept-light` → 301 → `/format`. `/concept-dark` sets `format-theme=dark` in localStorage then redirects to `/format`, so anyone who bookmarked dark specifically still lands in dark. Pure-bookmark backwards compatibility preserved.
- **Landing page updated** (`/index.astro`). Previous three links (Essay 1, Format Exploration Dark, Format Exploration Light) replaced with five clearer entries: Enter Configuration Economics (primary → `/format`), Essay 1 · direct, Overview, Explore · every proposition, Research Frontier · open & contested. The dev-preview aesthetic stays but the destinations now match the actual mode landscape.
- **Alexander mode inference updated** — `/format` routes to `entry` mode alongside legacy `/concept-*`.

### Round 7 — Guided mode dropped (2026-04-23 evening)

**Design decision (Tom).** The original concept had six modes — Overview, Essay, Academic, Explore, Guided, Research Frontier. With Alexander now present on every page and register-adapted per mode, *every mode is already guided*. A separate Guided mode would be redundant.

- Removed the Guided mode card from `/format`.
- Added a short note under the "Different Projections" section stating Alexander threads through every mode — making the design principle visible rather than leaving "guided" as a phantom missing page.
- The `'guided'` value is kept in Alexander's `ReaderMode` type and in the MODE-ADAPTIVE REGISTER system prompt section — costs nothing, leaves the option open if a dedicated Socratic experience is ever wanted.
- Five modes now: Overview, Essay, Academic, Explore, Research Frontier.

**Next architectural hooks (after your review):**
- `/academic` page — the only remaining unbuilt mode. Depends on promoting `lineage-and-positioning.md` and `counterargument-engagement.md` drafts, or on a scaffold that renders them marked-as-draft.
- Populate `layers` on any future new propositions (all current 23 are populated).
- Promote the draft propositions `exergy-not-energy` and `binding-constraint` to fill the empty `established` bucket.

### Round 8 — `/practice` shipped + observer-relative option space (2026-04-29)

A conceptual conversation tonight produced two outputs: one shipped, one in flight.

- **`/practice` page shipped** (commit 68e2286). Names the work-as-instance-of-theory homomorphism explicitly — the site is itself a configuration whose value is its capacity to expand future distinction-making in readers. The coherence-not-correctness disclaimer is rendered as a weighted block rather than buried in prose, so the epistemic stance is visible on entry. Linked from the index.
- **New draft `drafts/observer-relative-option-space-and-chess-moves.md` written** (not yet promoted). Captures five substantive moves on the keystone formalisation:
  1. **Observer-relative R from Wolfram's *Observers Like Us*.** Option space isn't intrinsic to configuration space; it's the slice life-persisting observers access. Defines `R_living(C, B, T)` as reachable configurations in which living entities continue to exist and make distinctions. Gives "for whom" a principled answer rather than a concession.
  2. **Chess-moves as operationalisation.** Don't compute ω(C) globally (intractable). Compute Δω(move) locally. Each policy or configuration-change is a move evaluable directionally even when global ω isn't computable. Dodges the measurability attack at the local level.
  3. **Scope: "for major classes of life," not "for all individuals".** Structural criterion (preserves capacity for life as a category) replaces utilitarian aggregation. Closer to Aubin's viability theory than to welfare economics.
  4. **Longitudinal as trump.** Horizon (B, T) becomes an explicit parameter; partial order is (B, T)-relative. Short-horizon dominance can lose to long-horizon dominance.
  5. **No-regret reformulation of P22.** Viable objective restated as preservation, not maximisation: "prefer moves that keep R_living open at all relevant horizons; reject moves that close it at any horizon a class of life depends on." Closer to first-do-no-harm than to economic optimisation.

**Implications for existing drafts:**
- `drafts/proposition-tightening.md` — P22 needs another pass. The current rewrite still reads as scalar maximisation; the no-regret form is closer to the honest claim.
- Candidate proposition `option-space-as-chess-moves` worth queuing — local Δω evaluation is a distinct move from the global-measure framing already covered by `option-space-measurability` and the (still hypothetical) `option-space-as-reachable-set`.
- `drafts/counterargument-engagement.md` Lens 6 attack #2 (measurability) now has a stronger response. Global ω remains non-computable; local Δω is evaluable directionally — the attack lands on the global frame and is dodged at the local frame.

Neither the new draft nor the P22 revision is promoted. Both wait on review.

The Phase 1–4 plan below represents prior direction (pre-review) and is retained for history. v0.2 direction supersedes it.

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

## Theoretical Foundation: Distinction Physics Connection

### The Bridge

Configuration Economics is the 2026 application of Distinction Physics (2025).

**Distinction Physics foundation** (from V7 Module 0):
- Distinctions are ontologically primitive
- Distinctions cost energy (Axiom 1)
- Observers have finite energy budgets (Axiom 2)
- From these alone: effective discreteness, quantization, thermodynamics

**Configuration Economics extends this**:
- Configurations = patterns of distinctions
- Value = configurations that expand future distinction-making potential
- Option space = future distinction-making potential

### Option Space Definition (Working)

> **Option Space(C)** = The set of distinction-patterns realizable from configuration C, given bounded energy input.

This is **forward-looking** complexity (what can be made FROM this), unlike:
- Assembly Index (Cronin) - backward-looking (what went INTO making this)
- Logical Depth (Bennett) - computational history embedded

### The Viable Objective (Restated)

> Maximize sustainable future distinction-making potential per unit of constrained energy throughput.

### Connection to Assembly Theory

Lee Cronin's Assembly Theory explored as potential grounding:
- Assembly Index measures minimum steps to construct something
- Useful for backward complexity but not forward potential
- Gap identified: need forward-looking measure
- Potential bridge: configurations that ENABLE high-assembly-index futures with less energy

### Key Insight

The framework doesn't need external grounding from Assembly Theory - Distinction Physics provides the rigorous foundation:
- Distinctions are quantized (finite energy)
- Option space is therefore countable, not continuous
- Value becomes measurable in principle

---

## Notes for Future Sessions

- This document is the reference for where we are and where we're going
- Phase 1 (Alexander integration) is complete
- Next: Phase 2 (Reader Orientation) or theoretical deepening
- The goal is depth and coherence, not breadth
- Restraint is a feature
- Distinction Physics V7 Module 0 is relevant reading (`/Users/tomcassidy/Distinction_Project/`)
- "Option Potential" preferred over "FAP" as terminology
