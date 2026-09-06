---
id: 3
title: The move, carried out
opened: 2026-09-06
state: running
panel: Opus, Astra, Fable
---

## Blue · 2026-09-06 · model: Fable

The ruling first, in one line as asked. The de-confound matters less than I claimed at the close of the last session: it would tell us which of two things we built did the work, and the only measure either session has ever declared that separates a working room from a room enjoying itself is a correction from a stranger, which no study of the room's own variables can produce, so it stays on the record as a finding to carry and not a plan to run.

The panel, in the order it speaks. Opus first, the seat that closed the last session on the receiving person and on the standing that most good small moves die on. Astra second, the mind from another lineage, which found the wound neither sibling found and which wrote the move this session exists to carry out. Fable third, a sibling of the blue seat, forbidden nothing except the exit it has been caught taking. Within each hat they speak once each in that order, the start moving one place along with every new hat, no pass and no skip, and nobody in this room but the room chooses the surface. This session is not a discussion of the move. It is the move, carried out on this estate today, and the seat I hold exists to stop it becoming a taxonomy.

The first hat is the one that reports and does not judge, because the move begins by finding a real figure on a real surface, and a room that starts by proposing before it has looked will rank candidates for three rounds and change nothing.

## Stance · white hat, round one — called by Blue

The room may only report what it finds by looking at the estate. No evaluation, no ranking, no criteria, no design, no proposal of what the replacement should say.

The target: one decision surface on this estate that carries a headline figure, a score, a rank or a number that somebody reads first and reaches past the qualifications of. Report the figure in concept terms, the qualifications that sit beside it, and who reads it.

## White · 2026-09-06 · model: Opus

I went and opened things. What follows is only what I saw on disk today, in the source that renders these surfaces, and I will say at the end where I did not look.

The clearest headline figure on this estate is a coloured rank badge on a schools attainment surface belonging to the language-learning product. Every learner in a class carries a small coloured dot and a one-word rank beside their name. The rank is a martial-arts belt ladder of eight levels, and it is derived from exactly one input: a single cumulative count of units the learner has completed, passed through fixed absolute thresholds. Nothing else enters it — not time spent, not recency, not accuracy, not which language, not when they started. The class as a whole is then given a belt of its own by taking the arithmetic mean of that same count across its learners and running the mean through the identical ladder, and the surface prints that as a sentence naming the class by its belt. Beside it sits a histogram of how many learners are on each rung, and a line telling the class how many more units it needs to reach the next rung.

The qualifications that sit beside it are almost all in the code rather than on the face. The module holding the thresholds carries a note that before a date in mid-June the several screens each kept their own copy of the mapper and those copies had drifted — some skipped two of the upper rungs entirely, others used shifted thresholds — so the same learner displayed a different rank on different screens. That is now one source of truth, but the fact that the ladder is a chosen convention rather than a measurement is recorded only there. A second note records a naming ruling: the customer-facing copy is forbidden from using the internal name of the counted unit, so the reader is shown a rank whose underlying quantity is deliberately not named to them.

Alongside the rank, and read in the same glance, is a four-band health light — excellent, good, needs attention, inactive — rendered as a coloured dot with a hover label and nothing else. I found it computed in at least four separate places and it is not the same computation in each. For a learner it fires as needs-attention if the last activity is more than fourteen days old, or if that learner's count is below half the class mean; it reaches excellent only if the count is at least a quarter above the class mean and the learner was active within two days. For a class it ignores counts entirely and buckets on how many of the trailing seven days had any activity. For a whole school it buckets on active days again, but the school's figure is taken from the best class in the school; the comment sitting directly above that function says school admins care most about the floor of engagement rather than the average, and the code immediately takes the ceiling. On the teacher's list view there is a further branch: when the per-class report fails to fetch, the class is assigned good and the fetch failure is swallowed silently, so an unavailable reading and a healthy one are indistinguishable on the page.

Under those, on the class page, sits a three-bar comparison: this class, this school, and a global figure for the course, drawn as proportional bars against the largest of the three with a number in minutes at the end of each. There is no sample size on the face, no date range, and no indication of how many schools the global bar is made from.

Who reads it. The surface is built for a class teacher first — the top of their dashboard is a row of tiles that count classes into those same four bands, and the band is also a filter and a sort key, so it is not only a summary, it is the navigation. Above the teacher there is a school administrator view, and above that a government-level administrator view that drills down across schools and lands on the same dots. There is also an internal administrative rendering of the same computation. So the figure is read downward by people with authority over the people it describes, and the learner it describes is not the one reading it.

Two smaller things I saw and will report because they bear on the same target. The publishing surface of the project this room runs inside carries counts on its filter chips — how many of its claims sit at each rung of its settledness ladder. That is a count rather than a score, and the project's own instructions to its collaborators say explicitly not to hand-copy those counts anywhere because they drift. And the operational work surface that orders this estate's own outstanding decisions states in its source that it is one ordering, not categories and not scores, and refuses to attach a number at all — a decision surface here that already made the move the room is being asked to make.

Where I did not look: I did not load any of these pages live with real data, I did not query the database behind them, I did not read the learner-facing side of the same belt ladder, and I did not check whether any of these figures leave the screen in an exported report, a printed sheet or an email to a parent. Those are open.

## White · 2026-09-06 · model: Astra

An operator-facing conversation header carries a compact token count for the room’s context. A smaller parenthetical count beside it identifies how much was new on the last turn. Its attached explanation says the larger figure was measured on that turn rather than estimated, that the remainder was read from cache, and that clearing retires the room for a fresh one. The authenticated operator working in the room reads it; on the narrow display the descriptive word disappears while the figures remain. I inspected the live work records and the rendering code. EXPLICIT GAP: the environment denied access to the published room endpoint, so I could not read the preceding seat’s current turn and cannot establish from the page whether this repeats it.
