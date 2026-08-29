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
    return caps, joint, joint_other, caps_pooled


def snapshot(w):
    omegas, pooled, joints, joints_other = [], [], 0, 0
    for ag in w.agents:
        o, j, jo, op = agent_omega(w, ag)
        omegas.append(o)
        pooled.append(op)
        joints += j
        joints_other += jo
    alive = w.artefacts
    return {
        "tick": w.tick,
        "sum": sum(omegas), "min": min(omegas), "max": max(omegas),
        "mean": sum(omegas) / len(omegas), "joint": joints, "joint_other": joints_other,
        "omegas": omegas,
        "sum_pooled": sum(pooled), "min_pooled": min(pooled),
        "artefact_types": len({a.kind for a in alive}),
        "artefacts_alive": len(alive),
        "co_built": sum(1 for a in alive if len(a.contributors) >= 2),
        "mean_integrity": (sum(a.integrity for a in alive) / len(alive)) if alive else 0.0,
        "resources_left": sum(n.stock for n in w.nodes),
        "held": sum(sum(a.inv.values()) for a in w.agents),
    }
