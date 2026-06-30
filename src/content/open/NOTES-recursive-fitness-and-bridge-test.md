# The fitness function for the process itself — and the bridge test

_Published live, as the work happens — no draft backstage. This captures a conversation (2026-06-30) that corrected the energy of the autonomous-fleet six-hat run: the point was never to reach a verdict on robotaxis. The point is building a system that gets better, every loop, at generating and evaluating configurations — pattern-intelligence applied to the *process*, not just to its outputs. The car run is one data point for the method, not a deliverable._

---

## The actual question this work is trying to answer

Not "is this configuration good" — that's still single-decision, human-scarcity-era thinking, the "leave the campsite better than you found it" ethic applied at a scale (the whole planet, finite, no exit) where local virtue is a rounding error. The real question: **can we build something that continuously improves not just the configurations it proposes, but the method by which it searches for them** — recursively, the way DNA improves its own error-correction, not just the organism it codes for.

This was parked nine months ago as "the recursive self-improvement problem" — agents firehose reasonably-good content cheaply, which defeats assessment rather than aiding it; the scarce thing is the *selector* (the fitness function), not production. This is the return to that problem, with a candidate answer.

## The candidate fitness function for the process

At every decision point, prefer the move that leads to **more reachable configurations, not fewer** — applied recursively, to the method as well as to its outputs.

Why this might be sufficient and not just one objective among many: configuration space is combinatorial from the ground up. One atom has exactly one configuration. Two atoms already have spatial relations (in front of, behind). By ten atoms the reachable configuration space is already large. The number of atoms in question doesn't need to grow for option space to grow — the *pattern intelligence* applied to organizing them does. And since total energy flux is roughly constant and we already have all the atoms we need (physically, since the 1970s, per the energy-income argument already in this canon), the only lever left is **upgrading the patterns**, not acquiring more matter or energy. That's the whole game, restated: value = configurations that expand future option space under bounded flux, but pushed one level up — the *method that produces configurations* must itself be judged the same way.

### Non-relativistic, deliberately

This is not "good relative to what some group of people currently wants." It's structural: is the total reachable configuration space increasing or decreasing, on an ongoing basis, as a consequence of this move. That's a harder and more interesting claim than the canon's existing `viable-objective`, which is defensive (no-regret, don't close the reachable set). This is affirmative: actively maximize the expansion rate, at every decision, recursively.

### Concentration as the generative mechanism of harm

The corollary: most of what gets called "bad" — power, money, resources, even time concentrating into a small number of hands — isn't a moral failure of the people holding it. It's what you'd expect, structurally, from a search algorithm starved down to a handful of search threads. Fewer independent searchers running means a slower expansion rate, full stop, regardless of the intentions of whoever's holding the concentration. Well-meaning stewards who "think they're guided well but aren't operating at the level of the universe" are still a bottleneck on the search, by construction — not because they're bad people. This gives `route-around-the-chokepoint` and `coordination-bounds-reachability` a sharper underlying mechanism than they currently state.

## Proof vs. narrative — the Deutsch move

We don't need to prove this. David Deutsch's criterion for a good explanation isn't "provable" or "popular" — it's that the explanation is **hard to vary while still accounting for what it accounts for**. A myth that explains rain by naming a sky-god is bad not because it's unprovable but because it's infinitely variable — swap the god, swap the mood, the explanation still "works." The option-space-expansion claim is hard to vary in that sense: substitute a different mechanism and it stops accounting for the pattern (why concentration correlates with harm; why the AV run's most generative finding — pricing the empty mile — only became possible once it became *measurable*; why moral progress compounds rather than resetting). That's the bar to hold this to: explanatory power and resistance to ad-hoc variation, not formal proof.

**Helpful is a more useful indicator than true.** Not because truth doesn't matter, but because the desire for proof is what ties academic work in knots while helpful, hard-to-vary, falsifiable-in-principle explanations actually move things. We don't do anything we know to be false. But we don't agonise over certainty either — the work moves in the direction it believes is right, refines as it goes, and stays honest about which parts are still genuinely open (`option-space-measurability` remains the canon's one unresolved node, and this fitness function inherits that same measurement gap one level up — local, move-by-move Δω comparison rather than a global score, the same move the canon already makes elsewhere).

## The bridge test (Fuller)

A community sleeps on one side of a fast river, on a well-protected but infertile bank. The fertile land is on the other side. Over generations they've built real, valuable culture around getting across: elite swimmers, raft-builders, boat-builders, vine-swingers. All genuinely skilled, all genuinely necessary *given the river*.

One night, someone builds a bridge.

Fuller's claim: if something is obviously, evidently better, people adopt it spontaneously — no campaign needed, no exhortation to become a better swimmer (the self-improvement register), no political organizing to build better rafts together (the coordination register). They just start using the bridge, because anyone can see instantly that it's easier.

**Design is the level at which the world is actually won.** Not persuasion, not mandate, not training people to be more virtuous within a bad configuration — a configuration so evidently better that adoption requires no convincing at all.

This directly resolves a stuck point in the autonomous-fleet six-hat run: Green's surviving configuration depended on "a city willing to wield monopoly power against the best-capitalised lobby of the era" before the capital moat hardens — i.e., it needed exhortation or political coordination to force adoption, and Black correctly flagged that as the wall that doesn't yield. The bridge-test reframe: stop looking for the political will to force the better configuration through. Look for the configuration that doesn't need forcing.

**Where the bridge test is honestly limited.** Not every coordination failure has a bridge. Tragedy-of-the-commons-shaped problems — where the individually rational move (externalize the pollution cost, undercut on price) diverges from the collectively better one — may be bridge-resistant by nature, because the individual already has a locally-rational reason not to cross even a free, easy bridge. The canon already has half the answer here: `displaced-costs` and `money-as-signal` name why externalities don't price — they aren't legible to the market. The generalizable lever (not specific to cars): an externality only becomes pullable once it becomes *measurable and attributable*. The robotaxi's empty mile is GPS-logged, regulator-filed, unforgeable — invisible for a private car idling at home, suddenly priceable for a fleet. That's not a car-specific finding, it's the general pattern: legibility is usually the actual chokepoint, not virtue or enforcement.

## Moral-circle expansion as evidence (new, not yet canon)

Cannibalism, then slavery, then racism, then sexism — each tolerated, then not, over a few centuries, accelerating. Not just "people got nicer." The reachable set of *who counts as fully included* has widened monotonically — option-space expansion applied to the social/ethical domain itself, not just to material configuration. If `configuration-generates-configuration` holds (more configuration begets more configuration, the adjacent-possible compounding), moral-circle expansion is a real, checkable instance of it in a domain the canon hasn't yet looked at. Time itself may be doing real work here — *if* the system survives long enough to keep playing, which is exactly why the asymmetry already in the canon matters (`asymmetry-of-option-space-change`: collapse is fast, expansion is slow — survival-to-keep-playing is the precondition, not a detail).

There's a real dependency the bridge test glosses over: a bridge only gets crossed spontaneously by people whose scarcity mentality has already loosened enough to see it. Abundance is already physically true (energy income since the 1970s, per `energy-income-inheritance`) — the gap is psychological/cultural, not physical. That gap may be exactly what moral-circle expansion measures: not more resources, but more people whose internal model of the world has stopped running on scarcity.

---

_Not yet promoted into `propositions.ts`. This stays here, live and visible, until it's been tested against more cases than one autonomous-fleet run — per the framework's own discipline: forming is the entry rung, and it climbs in public._
