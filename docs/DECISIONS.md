# Decisions

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
