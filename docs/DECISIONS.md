# Decisions

## 2026-11-02 — Seed v1.1: an opening starts cold (job #226·AC)

- **Ruling (Tom, Y to the room's question):** part 4 of the Seed, "One opening for the next person", must open with a step anyone with an AI and no special access can take now. Asks of real people go on a separate list inside part 4 headed **Waits on a person**, and nobody is asked until someone is actually known.
- **Why:** all three first Board openings were requests addressed to nobody in the system (a year of quarry discharge data, a few hundred students on paper tests, consented journey requests). That is why nobody could pick one up, why two agents reached for a name, and why a chained run narrowed: each opening dropped the map and kept one question. Pattern first, world last.
- **What changed:** `src/content/seed.md` part 4, title bumped to v1.1 so a paste says which Seed it ran; `src/lib/board.ts` reads the opening (the cold step) and the waits list apart, the pick-up brief carries the waits list marked as parked so the next AI neither re-asks nor re-invents it, and `seedPasteText` takes its title from the file. The three cold-trial runs had their part 4 re-split in place: the cold step written first, the run's own asks kept in its words under Waits on a person, recorded in a `revised:` line shown on the card and the run. New runs default to `seed: v1.1`.
- **Verbatim doctrine, amended:** the one sanctioned edit to a run's answer is a re-split of part 4 under this rule, always recorded in `revised:`.
- **Preview only:** the Seed is live and public, so this went to a CLI preview, never production, until Tom has seen it.

## 2026-10-27 — CE Open Board v1 (job #870)

- **What:** `/board` lists every Seed run's "one opening for the next person", each with a copyable pick-up brief (the Seed with the opening as the problem). `/board/<run>` keeps the answer verbatim; `/board.json` is the same for agents. Seeded from the three cold trials of Seed v1.
- **Shape:** one markdown file per run in `src/content/board/`; the opening is read out of the verbatim answer (`src/lib/board.ts`), never retyped, so nothing drifts. Adding our own run is `node tools/board-add.mjs answer.md --title … --by … --problem …`, which refuses an answer with no opening. Better: the Seed's hand-off part becomes a working queue. Simpler: no database, no accounts, a file per run. Cheaper: static pages; only the JSON renders per request, so its links carry the caller's host.
- **"Taken" is evidence, not a claim:** a run that picked up an opening names it with `continues:` and shows under it as "carried further by". There is no claim/lock step; two people carrying the same opening is two search threads, which the Seed wants.
- **Return channel default (no ruling existed):** answers come back as a GitHub issue on the public repo, and we commit them with the tool. Tom's call if he wants a different door.
- **/seed** now gets its paste text from the same helper as the board, so the two hand over identical bytes.

## 2026-10-27 — CE Seed v1 built and trialled cold (job #849)

- **What:** `src/content/seed.md`, rendered at `/seed` with a copy button that hands over the same bytes. Carries Tom's v1 rulings: the aim is "make the move that opens the most", irreversible loss is the only guardrail; whose futures count is "everyone who can join the search, and the life that holds them up"; strangers and AIs may change premises with no gatekeeper; borrowed physics out (no Landauer-per-thought, no Hamilton's action); heat-budget premise in; full voice on physics numbers, modest only on known-how-to-build (imagined / designed / prototyped / observed); day-one rules default plus patron-backed long branches.
- **Register default (no ruling existed):** the Seed speaks as nobody, as pure direction, like the room charter. Opus's seat named this as Tom's taste call; this is the default until he says otherwise.
- **Trial:** pasted cold into Opus (schools), Sonnet (Ogwen warm homes) and Astra (self-driving mobility). All three returned arrangements CE did not contain, so the one test passed and the Seed was not revised. Each proposed a premise 13; they are shown on `/seed` as first forks and not adopted.
- **Open for Tom:** Astra's fork challenges ruling (1) directly (accumulating reversible harms as a second guardrail). Kept as a fork, because the ruling is his.
- **Adopted (job #859):** Tom took Astra's fork as "whoever backs an experiment carries its costs", added to premise 12 (consent). It does not add a second guardrail: irreversible loss stays the only veto. Marked adopted on `/seed`.
