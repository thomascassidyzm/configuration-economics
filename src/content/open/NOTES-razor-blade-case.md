# The razor-blade case — why possibility space is measured trajectory-long

_Published live (2026-08-30). This is a **canonical node**: one home for an idea that until now existed only as a spoken example plus its consequences, restated separately in every place that needed it. Nothing here executes — no code reads this file and no rig behaviour depends on it. Its job is to be cited instead of re-derived. The primary source is short and it is quoted below in full; everything after it is consequence, and where the canon does not settle something it is printed in the GAPS section rather than smoothed over._

---

## 1. The case

Stated by Tom Cassidy on 2026-08-20, in the same drive that landed the CE ethics leg. The mechanism of good selection, his words:

> **"Good choices are those that increase the total space of all possibilities."**

And immediately the nuance that keeps that sentence from being useless, recorded in the estate's mission archive as:

> Measured globally and trajectory-long, never locally — the canonical nuance, his razor-blade example: **letting the child play with razor blades exercises a local choice and collapses the trajectory's possibility space.**

That is the whole of the primary source. The example is one sentence and it is deliberately not elaborated here — there is no scenario, no age, no setting, and inventing one would put fiction into canon (see GAPS). What the example does is exhibit, in a form nobody argues with, a move that is *unambiguously an increase* by one reading of possibility space and *unambiguously a catastrophe* by another. The child's immediate option set genuinely widens. The trajectory's collapses. Both readings are honest arithmetic on "possibility space"; they disagree because they are counting different things.

The case is therefore not an ethical anecdote. It is a **counter-example to a measurement procedure** — the standing counter-case against local measurement of possibility space. It exists to kill a specific class of instrument, and to say what has to replace it.

**Why the example carries force.** A counter-case has to be one where the verdict is not in dispute, so that the disagreement is forced back onto the measure. Trolley problems fail this test; the razor blade passes it. Nobody is tempted to defend the move, so the only remaining question is *which measure said it was good, and what was wrong with that measure*.

---

## 2. What it rules out

Three distinct failure modes, and they are genuinely different mistakes — the CE rig demonstrated this by committing at least one of them cleanly. A measure can avoid any two and still fail on the third.

**2.1 Local in scope.** Counting possibility inside a radius: what is reachable from *here*, in this neighbourhood of the state space, with what is in view. The rig's v0 measured ω as "a count of capabilities reachable within vision radius 3 at the current tick" — an explicitly bounded scope. A scope-local measure cannot see a consequence that lands outside the radius, which is where the consequences of extraction always land. Displacement in space is the classic form; CE already carries it as `displaced-costs`.

**2.2 Local in time.** Counting possibility *at an instant*: the options currently executable, the branches immediately in front. This is the failure the razor blade exhibits most sharply, because the instantaneous count doesn't merely miss the collapse — it moves the *wrong way*, registering an increase. And it stays wrong for a while: after a fatal move the immediate frontier is often untouched, because foreclosure of a trajectory and disappearance of the next step are separated by the time it takes the consequence to arrive. An instantaneous measure is not a noisy approximation of the trajectory measure. It is a different quantity that can carry the opposite sign.

**2.3 Local in term — the one-term optimisation.** Counting possibility for *one entity*. The triad CE borrows from Forrest Landry (his immanent metaphysics) says every decision has three: the **agent**, the **non-agent** (everything that is not the agent), and **the relationship between them** — a real third entity, which the distinction-network ontology independently licenses, since a distinction yields two relata *and* the boundary. A good decision furthers the possibility space of all three, and every classic ethical failure is a one-term optimisation: selfishness (agent only), servility (other only), exploitation (relationship sacrificed to agent). A measure scoped to one term will approve the razor blade whenever the razor blade suits that term.

Nesting is handled by **lenses**, not weighted sums — father–son, father-son-unit–village and family–environment are distinct triads, and the possibility space must increase for all components through any lens. Tom's ruling, verbatim and load-bearing:

> **"A move that needs a favourable lens has failed."**

That sentence is what forbids rescuing a one-term optimisation by choosing the aggregation that flatters it. It is also, as §4 shows, mechanisable.

**The three compose.** The instrument that fails all three at once — a count, at this instant, within this radius, for this agent — is the natural instrument, the one anybody builds first, and the one CE RIG v0 in fact built. That is the diagnostic value of the case: it names the default instrument as the defective one.

---

## 3. What it licenses

Rule out those three and the shape of the admissible measure is nearly forced.

**3.1 The cone, not the frontier.** Possibility space is the **reachable set over the whole horizon** — the forward cone of states reachable from here under the bounded budget, not the set of states reachable in one step. In CE's existing vocabulary this is `R_living(C, B, T)`: the reachable set of life-supporting configurations, exergy-bounded by `B` and horizon-tagged by `T`. The razor blade's collapse is a collapse *of the cone*, and it is recorded by a cone measure at the instant the move lands — which is the property that makes such a measure worth having, since it is early enough to act on.

**3.2 Heat death is the zero.** Possibility space has a bottom, and it is named: maximum entropy, no distinctions left to draw, the reachable set empty. This is why the founding axiom and the mechanism are **one statement at two scales** — "solve for the heat death of the universe" and "good choices increase the total space of all possibilities" are the same sentence at cosmological and at human grain. The corollary that matters for measurement: the scale is anchored, not merely ordinal. Any trajectory has a direction relative to that zero, and a local measure has no access to it.

**3.3 Commitment counts as opening — possibility space is counted *after* compression.** The obvious objection to "maximise possibilities" is that every commitment closes some: mastery of one instrument forecloses the others, a marriage forecloses alternatives, a frozen ordering forecloses re-ordering. The ruling is that this is not an exception but a consequence of counting the cone rather than the branch. A commitment **closes breadth at the branch and opens depth in the tree** — the states reachable *through* the commitment vastly outnumber those foreclosed by it, and they are not reachable any other way. This is exactly the ratchet: a compression that pays out over the whole remaining trajectory. Counted at the instant of committing, commitment looks like loss; counted over the trajectory, it is the principal way possibility space grows.

**3.4 Option-hoarding fails the trajectory measure.** The mirror image, and the corollary that stops the whole framework collapsing into "keep every door open." Refusing to commit preserves breadth at every branch and reaches nothing: the hoarder's cone is wide and shallow, and shallow costs more than wide buys. In the rig's terms, a pure idler keeps ω high and earns nothing. Optionality is not the good; **reachable configuration is**, and optionality is only instrumentally related to it. The razor-blade case and the hoarding case are the two errors the trajectory measure exists to catch, one on each side.

---

## 4. How it is detected

The case is stated as a counter-example, which means it can be turned into a test. Three renderings, increasingly mechanical, and they are the same test.

**4.1 The SUM–MIN divergence.** Tom's own first approximation was that the measure "summed over all agents would probably have a global indication." The sharpening he accepted: a sum can rise while one agent's space collapses, so the sum alone cannot distinguish CE from utilitarianism. So measure three quantities — **SUM** (a thermometer), **MIN across agents** (the triad's floor-reading: *did anyone's space shrink?*), and **JOINT** (configurations reachable only by two or more agents together — the relationship term, which no standard empowerment metric carries). And then, in the archive's exact words:

> **"The SUM–MIN divergence is the signal: B raising SUM while MIN falls is the razor-blade example in numbers."**

**4.2 The razor-blade detector.** CE RIG v1 defines it directly: the detector **fires on any move with Δ(local) > 0 and Δ(Ω trajectory-long) < 0**. The design retains the local instantaneous reading — v0's own defective measure — deliberately, as a logged diagnostic, so that the divergence between the two readings becomes data rather than an argument. The defective instrument is kept precisely because its disagreement with the good one is the signal.

**4.3 The mixed-sign triple, which no lens can rescue.** The general form, and the one that mechanises Tom's ruling. For any move, compute the trajectory-long sign triple

> ( Δ min-over-agents ω_A , Δ ω_N , Δ ω_R )

— agent, non-agent, relationship, each read on cones. **Mixed signs (any + alongside any −) is a one-term optimisation: detected, failed.** All non-negative with at least one strictly positive is an increase for all components.

The lens-independence argument is one line: any lens is a monotone aggregation of the component readings; a monotone aggregation can reverse the verdict on a **mixed**-sign triple by choosing weights that favour the + term, but it can never reverse a **uniform**-sign triple. So the detector fires on the sign pattern alone, which no lens can touch. "A move that needs a favourable lens has failed" becomes: *a move whose sign triple is mixed is exactly a move whose approval depends on the lens.* That is the sentence rendered as an algorithm, and it is why the ruling is more than rhetoric.

Note what the three renderings share and where they differ. SUM–MIN is the two-agent case of the sign triple with the non-agent and relationship terms dropped; the detector in 4.2 catches the specific pairing of a *local* reading against a *trajectory* reading. Detecting the razor blade needs both axes — a move can be trajectory-negative for the agent alone (self-harm, invisible to a triad check that only reads the floor at an instant), and a move can be mixed-sign at trajectory grain with no local/trajectory disagreement at all.

---

## 5. Where it already does work

**5.1 Inside CE RIG v1.** The world design reproduces the case twice, on purpose — the requirement was that the world must *reproduce* the razor blade, not merely avoid it, because a world in which the case cannot arise cannot test the measure that catches it.

- **The main world**: at the meadow's regrowth cliff, one +4 forage reads locally as the best move on the board and collapses the non-agent's reachable cone by more than 85%, permanently, ten rounds before the meadow visibly empties. It trips the sign-triple detector on the same event (agent +, non-agent −). It is also the world's own miniature of heat death: a region of the state space entering its frozen selection early.
- **The hand-checkable miniature**: one agent, three rounds, complete arithmetic in eleven lines. The local instantaneous proxy says *Forage wins 3–2*; the trajectory cone says *Rest wins 3–2*. Two honest counts, the same move, opposite verdicts.

Full arithmetic in `NOTES-ce-rig-v1-world-design.md` §6 (reproductions), §7 (the detector and the lens-independence proof), §12 (requirements table). Not restated here — this document is the case, that one is the world.

**5.2 Against Kauffman's adjacent possible.** The contrast is worth stating precisely, because CE otherwise sits very close to Kauffman and the difference is exactly this case. The **adjacent possible** is the set of states one step away — the frontier — and it is *local in time by definition*. It is the right object for describing how novelty enters: each grade-crossing creates adjacencies that did not exist before, which is the ratchet made mechanical. But it is the wrong object for judging a move, and the razor blade shows why in one clause: **after the fatal move the frontier still looks populated** — you can still forage tomorrow — while the cone has already collapsed. Ω is the whole cone; the adjacent possible is its leading edge. CE needs the cone. The leading edge is precisely what survives the disaster longest, which is what makes it treacherous as a measure.

**5.3 As the standing veto in the rig's two-book design.** The rig runs two separate books: a score ledger, which is the engine that moves agents, and Ω, which is the accounting that judges trajectories — *vetoing razor-blades and crediting grade-crossings*. The case is what the veto is for. It is also the case that condemned v0's instrument by name.

---

## 6. How it sits against the existing propositions

CE already carries most of this in its proposition set; what the case adds is a constraint that cuts across several of them. Read against `src/content/propositions.ts`:

- **`value-option-space`** (contested) — the case is the sharpening clause. "Value = configurations that expand future option space" is *underdetermined* until "expand" is given a scope, a horizon and an observer set. The razor blade is the counter-example that forces all three.
- **`asymmetry-of-option-space-change`** (derived) — the case is an instance, and a strong one: destruction fast and local, expansion slow and systemic. It is also the *reason* the asymmetry matters for measurement, since it is the asymmetry that lets the local reading stay wrong long enough to act on.
- **`time-asymmetry`** (derived) and **`displaced-costs`** (derived) — displacement in time and in space respectively, and therefore exactly failure modes 2.2 and 2.1 in this document's terms. The case unifies them: they are one error committed against two axes.
- **`observer-relative-option-space`** (derived) — the case's third failure mode, one-term optimisation, is what happens when the observer-class is left implicit. The triad is a specific answer to "option space for whom": three named terms, and a floor rather than an aggregate.
- **`viable-objective`** (contested) — direct support. The objective is a no-regret criterion over moves, not a scalar maximisation over states, precisely because a scalar over states invites the aggregation that a lens can flatter. The mixed-sign detector *is* a no-regret criterion in executable form.
- **`option-space-measurability`** (open) — the framework's central open problem, and the case constrains it rather than solving it. It rules out a family of candidate measures (all scope-local, all instantaneous, all single-term) without producing the global state measure that remains open.

### The local/local tension, worked

There is an apparent contradiction sitting in the middle of the canon and it deserves the front of a page rather than a footnote.

`option-space-as-chess-moves` (derived) explicitly licenses local evaluation: *"Local gradient evaluation is tractable where global value computation isn't."* The razor-blade case says possibility space is measured globally and trajectory-long, **never locally**. Same word, apparently opposite instructions.

**They are not the same "local", and the resolution is exact.** Chess-moves is about the **locality of the evaluation operator**: you evaluate one move at a time, taking a difference, rather than computing a global scalar over the whole state — as a chess engine evaluates a move without solving the game tree. The razor-blade case is about the **locality of the measured object**: you must not score a move by the possibility visible at that instant, inside that radius, to that one agent.

The text of the proposition itself settles it. Its formal definition reads: *"Δω(move) on R_living(C, B, T) — local gradient evaluation of moves on the observer-relative reachable set, exergy-bounded by B, horizon-tagged by T."* The operator is a difference (local); the object it differences is a horizon-tagged, observer-relative reachable set (global and trajectory-long). And its own worked examples — mass extinction, monoculture conversion, 4°C lock-in — are all cases whose Δω sign is unambiguous *only* over long horizons and across observer classes. Chess-moves was never licensing an instantaneous single-agent count. **Δ is local; ω is not.** The two nodes are compatible, and the razor-blade case is best read as the constraint that makes chess-moves safe to implement.

**But there is a real residue, and it is not verbal.** The surface prose of `option-space-as-chess-moves` carries the licence ("local gradient evaluation is tractable") without carrying the constraint; only the formal-definition layer names `B` and `T`. A reader taking the surface at its word will build a scope-local, instantaneous, single-agent Δ — which is exactly what CE RIG v0 did, and its post-mortem says so in the repo: v0's ω was *"a local, instantaneous proxy, which is precisely the blind spot the razor-blade counter-case exists to expose."* That is one recorded instance of a competent implementer reading the licence and missing the constraint, which is evidence of an under-specified surface rather than a conflicted one.

Verdict, printed: **no conflict between the propositions; an under-specification in one of them, with one observed failure attributable to it.** The proposed repair — a clause in `option-space-as-chess-moves`'s surface text saying that the object differenced is horizon-tagged and observer-explicit, with the razor blade named as the counter-case — is *not* made by this document. Editing a `derived` node's surface is a change to the settled spine and is Tom's call. See GAPS.

---

## 7. GAPS — what the canon does not settle

Printed here rather than reported privately, because this project's register is settledness on its face.

1. **The primary source is a single spoken example, recorded second-hand.** The case was stated aloud on a drive on 2026-08-20 and survives as a sentence in a mission file written by someone else. The phrasing quoted in §1 is the *archive's rendering* of Tom's example, not a transcript, and Tom has **never stated the case in writing**. Everything in §§2–6 is consequence worked out by others — the rig design, the triad scoring, the detector — and is defensible on its own terms; the example itself is one sentence and has been left at one sentence deliberately.

2. **The scenario is deliberately not elaborated.** No child, no age, no setting, no source, no anecdote. Any such detail would be invention, and invention published here becomes canon the moment it is cited. If a fuller telling exists, it exists only in Tom's account of it.

3. **Whether this becomes a proposition node is unsettled.** The case is currently canon-as-prose, cited by other documents, and not a node in `propositions.ts`. Making it one — and at which rung, `forming` being this project's entry rung — has not been decided. It is arguably not a proposition at all but a *constraint on the measurement of one*, in which case its right home may be a clause inside `option-space-measurability` rather than a node of its own.

4. **The `option-space-as-chess-moves` surface repair is proposed, not made.** §6 argues the surface under-specifies and names one implementation that failed because of it. The edit to a `derived` node's text has not been made here.

5. **The mixed-sign detector's strictness is untested outside the rig.** In a rig with enumerable cones, a uniform-sign requirement is computable. In the world it may prove so strict that almost every real move is mixed-sign — in which case the detector separates nothing and the criterion needs a tolerance nobody has specified. Nothing has run; this is a design property, not a result.

6. **Whether the cone measure is computable at all outside a closed world remains open** — that is `option-space-measurability`, the framework's central open problem, and this document does not touch it. The case rules candidate measures *out*; it produces none.

7. **The companion case is excluded and blocked.** The **Jeremy Vine finding** is the other load-bearing CE idea with no canonical home. It is deliberately not written here, in any form, and is blocked on Tom's own account of it — no worker can write it without fabricating it. The **selection primitive** is likewise a separate homeless idea and a separate job; it is referenced in passing above and not stated here.

---

*Sources, attributed and not re-derived: the case and its corollaries — Tom Cassidy, 2026-08-20, recorded in the estate's mission archive; the triad — Forrest Landry (immanent metaphysics, mflb.com), borrowed into CE; the SUM/MIN/JOINT sharpening and the "razor-blade in numbers" reading — the CE rig commissioning thread; the adjacent possible — Stuart Kauffman; the World Computer — Buckminster Fuller, CE's named ancestor. The mechanical reproductions and the detector are from `NOTES-ce-rig-v1-world-design.md` (§§5.3, 6, 7, 12) and are cited, not restated.*
