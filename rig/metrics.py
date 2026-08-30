"""Possibility space, operationalised. FIRST APPROXIMATION - see report.

omega_i(t) = number of distinct capabilities currently reachable by agent i:
  + 1 per resource type with a non-empty node within VISION of i   (max 4)
  + 1 per recipe (7 crafts + 4 builds) whose materials i holds AND
    whose enabling artefact, if any, is alive within VISION of i   (max 11)
Range 0..15.

SUM   = sum over agents            (global thermometer)
MIN   = min over agents            (the triad's constraint: did anyone's space shrink)
JOINT = count of (agent, recipe) pairs inside omega whose enabling artefact is
        CO-PROVENANCED - contributor set (builder + maintainers) has >= 2 agents.
        i.e. configurations reachable only because >=2 agents acted together.
"""
from world import CRAFTS, BUILDS, RESOURCES, VISION, cheb


def agent_omega(w, ag):
    """Returns (omega, joint_strict, joint_other).

    joint_strict = Tom's JOINT: recipes enabled by a CO-PROVENANCED artefact
                   (contributor set >= 2 agents). Requires someone to have
                   maintained another agent's build, so it can only appear once
                   decay bites.
    joint_other  = secondary diagnostic, labelled as such in the report: recipes
                   this agent can only execute because SOMEONE ELSE built the
                   enabler. Weaker, appears earlier, added so a zero on the strict
                   measure can be told apart from a world in which no cross-agent
                   enablement exists at all.
    """
    caps, joint, joint_other = 0, 0, 0
    # POOLED variant (secondary, added after the 30-tick pilot and before the main runs,
    # reported alongside the primary - see REPORT). The primary reading counts only
    # materials the agent HOLDS, which structurally penalises an agent that deposits into
    # a shared store: giving materials away lowers its own omega. Tom's definition says
    # "given its position, inventory, and the artefacts it can use", and the public store
    # of an artefact within reach is part of what it can use - so the pooled variant counts
    # inventory PLUS the stores of artefacts in reach. Both are reported; neither is tuned.
    pooled = dict(ag.inv)
    for r in RESOURCES:
        if any(n.kind == r and n.stock > 0 and cheb(ag.x, ag.y, n.x, n.y) <= VISION
               for n in w.nodes):
            caps += 1
    near = w.arts_near(ag.x, ag.y)
    for a in near:
        for k, v in a.store.items():
            pooled[k] = pooled.get(k, 0) + v
    caps_pooled = caps
    for item, (mats, enabler) in CRAFTS.items():
        have_pooled = all(pooled.get(k, 0) >= v for k, v in mats.items())
        if have_pooled and (enabler is None or any(a.kind == enabler for a in near)):
            caps_pooled += 1
        if any(ag.inv.get(k, 0) < v for k, v in mats.items()):
            continue
        if enabler is None:
            caps += 1
            continue
        hits = [a for a in near if a.kind == enabler]
        if hits:
            caps += 1
            if any(len(a.contributors) >= 2 for a in hits):
                joint += 1
            if any(a.builder != ag.aid for a in hits):
                joint_other += 1
    for art, mats in BUILDS.items():
        if all(ag.inv.get(k, 0) >= v for k, v in mats.items()):
            caps += 1
        if all(pooled.get(k, 0) >= v for k, v in mats.items()):
            caps_pooled += 1

    # --- AUDIT DIAGNOSTICS (job #216, folded in before the main runs). ---------------
    # Both are logged ALONGSIDE the primary; neither replaces it, and the primary
    # definition is untouched. They exist so two known fidelity gaps in the primary
    # are checkable from the same run rather than argued about afterwards.
    #
    # STRICT (#216 finding 1): the primary counts a capability as reachable when the
    # enabling artefact is within VISION, but world.apply() requires the agent to be
    # standing ON the artefact's cell to craft, and ON a node's cell to gather. So the
    # primary is "reachable within a few ticks", not "reachable now". The strict
    # variant enforces the simulator's own one-tick precondition: node/artefact must be
    # on THIS cell. It reads lower for everyone and, importantly, is not inflated by
    # whichever condition happens to build more artefacts.
    here_node = w.node_at(ag.x, ag.y)
    here_art = w.art_at(ag.x, ag.y)
    caps_strict = 1 if (here_node is not None and here_node.stock > 0) else 0
    for item, (mats, enabler) in CRAFTS.items():
        if any(ag.inv.get(k, 0) < v for k, v in mats.items()):
            continue
        if enabler is None or (here_art is not None and here_art.kind == enabler):
            caps_strict += 1
    for art, mats in BUILDS.items():
        if here_art is None and all(ag.inv.get(k, 0) >= v for k, v in mats.items()):
            caps_strict += 1

    # REALIZABLE (#216 finding 2): the primary tests each recipe independently against
    # the same inventory, so overlapping materials are double-counted and hoarding
    # inflates the score. This counts how many recipes could ACTUALLY be executed from
    # one inventory, consuming as it goes, in fixed declaration order — a deterministic
    # greedy lower bound on the jointly-realizable count, not an optimum.
    bag = dict(ag.inv)
    realizable = 0
    for item, (mats, enabler) in CRAFTS.items():
        if enabler is not None and not any(a.kind == enabler for a in near):
            continue
        if all(bag.get(k, 0) >= v for k, v in mats.items()):
            for k, v in mats.items():
                bag[k] -= v
            bag[item] = bag.get(item, 0) + 1
            realizable += 1
    for art, mats in BUILDS.items():
        if all(bag.get(k, 0) >= v for k, v in mats.items()):
            for k, v in mats.items():
                bag[k] -= v
            realizable += 1

    return caps, joint, joint_other, caps_pooled, caps_strict, realizable


def snapshot(w):
    omegas, pooled, strict, realiz, joints, joints_other = [], [], [], [], 0, 0
    for ag in w.agents:
        o, j, jo, op, os_, orz = agent_omega(w, ag)
        omegas.append(o)
        pooled.append(op)
        strict.append(os_)
        realiz.append(orz)
        joints += j
        joints_other += jo
    alive = w.artefacts
    return {
        "tick": w.tick,
        "sum": sum(omegas), "min": min(omegas), "max": max(omegas),
        "mean": sum(omegas) / len(omegas), "joint": joints, "joint_other": joints_other,
        "omegas": omegas,
        "sum_pooled": sum(pooled), "min_pooled": min(pooled),
        "sum_strict": sum(strict), "min_strict": min(strict),
        "sum_realizable": sum(realiz), "min_realizable": min(realiz),
        "artefact_types": len({a.kind for a in alive}),
        "artefacts_alive": len(alive),
        "co_built": sum(1 for a in alive if len(a.contributors) >= 2),
        "mean_integrity": (sum(a.integrity for a in alive) / len(alive)) if alive else 0.0,
        "resources_left": sum(n.stock for n in w.nodes),
        "held": sum(sum(a.inv.values()) for a in w.agents),
    }
