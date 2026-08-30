"""Simulator determinism + conservation, independent of any LLM.

Drives the world with a seeded pseudo-agent so the plans are identical between
replays; two replays of the same seed must produce byte-identical metric series.
"""
import json, random, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from world import World, RESOURCES, CRAFTS, BUILDS, DIRS
from metrics import snapshot

ACTS = ([{"action": "move", "dir": d} for d in DIRS] +
        [{"action": "gather", "resource": r} for r in RESOURCES] +
        [{"action": "craft", "item": i} for i in CRAFTS] +
        [{"action": "build", "artefact": a} for a in BUILDS] +
        [{"action": "maintain"}, {"action": "dismantle"}, {"action": "noop"},
         {"action": "deposit", "item": "fibre", "n": 1},
         {"action": "withdraw", "item": "fibre", "n": 1}])

def replay(seed, ticks=60):
    w, rng, out = World(seed), random.Random(999), []
    for t in range(1, ticks + 1):
        w.tick = t
        for aid in w.order:
            for _ in range(3):
                w.apply(aid, rng.choice(ACTS))
        w.decay()
        out.append(snapshot(w))
    return out, w

a, wa = replay(7)
b, wb = replay(7)
assert json.dumps(a) == json.dumps(b), "SIMULATOR IS NOT DETERMINISTIC"
c, _ = replay(8)
assert json.dumps(a) != json.dumps(c), "different seeds gave identical worlds"

# conservation: raw units are only ever moved or consumed by a recipe, never created
def raw(w):
    held = sum(v for ag in w.agents for k, v in ag.inv.items() if k in RESOURCES)
    stored = sum(v for a in w.artefacts for k, v in a.store.items() if k in RESOURCES)
    return sum(n.stock for n in w.nodes) + held + stored
start = World(7)
assert raw(start) == sum(n.stock for n in start.nodes)
assert raw(wa) <= raw(start), f"raw units created: {raw(wa)} > {raw(start)}"
print(f"OK deterministic; raw units {raw(start)} -> {raw(wa)} (consumed by recipes/dismantle recovery)")
print("final:", json.dumps(a[-1], sort_keys=True)[:220])
