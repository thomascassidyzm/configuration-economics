# Drafts

In-progress material not yet promoted to canonical content. Each draft here is a proposal responding to the April 2026 review (memos on Desktop at `configecon-review-2026-04-23/`).

## Contents

### Round 1 (first autonomous session, 2026-04-23)

- `proposed-propositions.md` — Two candidate propositions drafted in response to the physics-rigour review: `exergy-not-energy` (would fill the empty `established` bucket) and `binding-constraint` (handles the solar-flux / scale concession).
- `exergy-terminology-notes.md` — Targeted proposed edits to existing essay prose and proposition logic blocks where energy/exergy precision matters. Organised as a redline list so you can accept or reject each.
- `lineage-and-positioning.md` — Scaffold for a Positioning / Prior Art section or page. Predecessors mapped (Soddy, Georgescu-Roegen, Daly, Tainter, Scott, Waring, Cronin, Arthur, Hickel/Jackson) with the specific delta CE claims over each. Needs your voice for the framing, but the structure and claims-per-predecessor are drafted.

### Round 2 (second autonomous session, 2026-04-23)

- `option-space-formalisation.md` — **The keystone draft.** Candidate formal definition of option space as reachable configurations under bounded exergy budget, with four candidate measures (cardinality, diversity-weighted, Assembly-weighted, compositional) and a recommendation for Assembly-weighted as the starting point. Worked example (forest vs monoculture). Lists the five concrete open problems the formalisation doesn't solve. Highest-leverage draft in the set — without something like this, the measurability attack (Lens 6 #2) is fatal.
- `counterargument-engagement.md` — Drafted responses to the five most urgent adversarial attacks not covered by the lineage draft: measurability, degrowth-in-disguise, services economy, decoupling data, Solow substitutability. Each as steelman + response + concession. Proposes a dedicated "Objections and Responses" chapter.
- `proposition-tightening.md` — Low-risk, high-leverage rewrites of P5, P10, P16, P19 removing the normative smuggle Lens 2 flagged. Each rewrite gains a `predictive` field, bringing total predictive propositions from 3 to 7. ~5 minutes per rewrite to promote.

## Prioritisation matrix

ROI estimates. Use this to decide order when reviewing.

| Draft | Cost to promote | Leverage | Dependencies | Suggested order |
|---|---|---|---|---|
| `proposition-tightening.md` | ~20 min | High (4 props become cleaner + gain `predictive` fields) | None | **1st — quick win** |
| `proposed-propositions.md` | ~15 min | High (fills empty `established` + `derived` buckets) | None | **2nd** |
| `exergy-terminology-notes.md` Level 2 | ~15 min | Medium (makes logic blocks physics-precise) | Depends on `exergy-not-energy` proposition being promoted first | **3rd** |
| `counterargument-engagement.md` | ~2 hrs (rewrite in your voice + structure as chapter) | Very high (defends against top-urgency attacks) | None, but benefits from lineage promotion first | **4th** |
| `lineage-and-positioning.md` | ~2 hrs (voice rewrite + choose format) | Very high (answers the novelty attack) | None | **5th — can swap with counterargument** |
| `option-space-formalisation.md` | ~4-8 hrs (deep engagement) | Keystone — highest conceptual leverage | Loose dependency on having read lineage + counterargument | **6th — biggest, do last** |

Total promotion time estimate: ~10-14 hours of focused work for the full v0.2 content set, plus any custom editing.

Minimum viable v0.2 subset (highest-ROI, lowest-cost): `proposition-tightening` + `proposed-propositions` + Level 2 exergy edits = ~50 minutes for substantial credibility gain.

## Review flow

1. Read each draft.
2. For propositions: promote to `src/content/propositions.ts` with any edits; update `SECTION_PROPOSITIONS` in `src/lib/guide-prompt.ts`.
3. For exergy edits: apply inline to `src/content/essay-1/sections.ts` and `src/content/propositions.ts`.
4. For lineage / counterargument: decide format (new essay section? `/lineage` + `/objections` pages? appendices?) and promote.
5. For option space formalisation: probably promote as appendix titled "Option Space: A Candidate Formalisation." Expect substantial rewriting.
6. Delete each draft after promotion, or leave for future reference.

## Why drafts, not live

These are substantive content moves. Your voice matters; so does your judgment on what's ready. Leaving them as drafts keeps the canonical essay under your direct control while still moving forward on the iteration push. After promotion, drafts can be deleted — their purpose was the raw material, not the final form.
