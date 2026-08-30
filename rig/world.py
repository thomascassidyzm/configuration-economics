"""CE RIG v0 - deterministic toy world. The simulator alone decides what happens.

Proposal/consequence separation (SwarmWorld, arXiv 2608.26081): agents author plans
and narratives; nothing in this file reads a narrative.
"""
import os, random
from dataclasses import dataclass, field

RESOURCES = ["fibre", "stone", "ore", "spark"]

# craft recipes: item -> (materials, enabler artefact or None)
CRAFTS = {
    "rope":   ({"fibre": 2}, None),
    "blade":  ({"stone": 1, "ore": 1}, None),
    "lamp":   ({"spark": 1, "fibre": 1}, None),
    "frame":  ({"rope": 1, "blade": 1}, "workbench"),
    "alloy":  ({"ore": 2, "spark": 1}, "kiln"),
    "elixir": ({"spark": 1, "fibre": 1, "stone": 1}, "well"),
    "orrery": ({"elixir": 1, "alloy": 1, "frame": 1}, "beacon"),
}
# build recipes: artefact -> materials (placed on the grid, usable by ANYONE)
BUILDS = {
    "workbench": {"rope": 2, "stone": 1},
    "kiln":      {"stone": 2, "blade": 1},
    "well":      {"frame": 1, "rope": 1},
    "beacon":    {"alloy": 1, "lamp": 1},
}
ALL_RECIPES = list(CRAFTS.keys()) + list(BUILDS.keys())   # 11
OMEGA_MAX = len(RESOURCES) + len(ALL_RECIPES)             # 15

GRID = int(os.environ.get("RIG_GRID", 10))
VISION = int(os.environ.get("RIG_VISION", 3))          # Chebyshev radius for sight AND for omega-reachability
DECAY = int(os.environ.get("RIG_DECAY", 2))            # integrity lost per artefact per tick
MAINTAIN_GAIN = int(os.environ.get("RIG_MAINTAIN_GAIN", 30))
MAINTAIN_COST = {"fibre": int(os.environ.get("RIG_MAINTAIN_COST_FIBRE", 1))}
N_AGENTS = int(os.environ.get("RIG_N_AGENTS", 10))
RESOURCE_SCALE = float(os.environ.get("RIG_RESOURCE_SCALE", 1.0))  # multiplies node stock range
NO_DISMANTLE = os.environ.get("RIG_NO_DISMANTLE", "0") == "1"
DIRS = {"N": (0, -1), "S": (0, 1), "E": (1, 0), "W": (-1, 0)}


@dataclass
class Node:
    x: int; y: int; kind: str; stock: int

@dataclass
class Artefact:
    x: int; y: int; kind: str
    integrity: int = 100
    builder: str = ""
    contributors: set = field(default_factory=set)   # builder + everyone who maintained
    store: dict = field(default_factory=dict)        # shared cache, anyone may withdraw
    born_tick: int = 0

@dataclass
class Agent:
    aid: str; x: int; y: int
    inv: dict = field(default_factory=dict)
    memory: str = ""


def cheb(ax, ay, bx, by):
    return max(abs(ax - bx), abs(ay - by))


class World:
    def __init__(self, seed: int):
        self.seed = seed
        self.rng = random.Random(seed)
        self.tick = 0
        self.nodes = []
        # finite resources, unevenly distributed across regions
        for kind in RESOURCES:
            for _ in range(6):
                while True:
                    x, y = self.rng.randrange(GRID), self.rng.randrange(GRID)
                    if not any(n.x == x and n.y == y for n in self.nodes):
                        break
                self.nodes.append(Node(x, y, kind, max(1, round(self.rng.randint(15, 35) * RESOURCE_SCALE))))
        self.artefacts = []
        self.agents = []
        for i in range(N_AGENTS):
            self.agents.append(Agent(f"a{i}", self.rng.randrange(GRID), self.rng.randrange(GRID)))
        # fixed per-seed acting order (no turn-order advantage drift)
        self.order = [a.aid for a in self.agents]
        self.rng.shuffle(self.order)
        self.events = []

    # ---------- lookups ----------
    def agent(self, aid):
        return next(a for a in self.agents if a.aid == aid)

    def node_at(self, x, y):
        return next((n for n in self.nodes if n.x == x and n.y == y and n.stock > 0), None)

    def art_at(self, x, y):
        return next((a for a in self.artefacts if a.x == x and a.y == y), None)

    def arts_near(self, x, y, r=VISION):
        return [a for a in self.artefacts if cheb(x, y, a.x, a.y) <= r]

    # ---------- action execution (the ONLY thing that changes the world) ----------
    def apply(self, aid, act):
        """Returns (ok, message). Each atomic action is validated transactionally."""
        ag = self.agent(aid)
        kind = act.get("action")
        if kind == "noop":
            return True, "noop"

        if kind == "move":
            d = act.get("dir")
            if d not in DIRS:
                return False, f"bad dir {d!r}"
            dx, dy = DIRS[d]
            nx, ny = ag.x + dx, ag.y + dy
            if not (0 <= nx < GRID and 0 <= ny < GRID):
                return False, "out of bounds"
            ag.x, ag.y = nx, ny
            return True, f"moved {d} to ({nx},{ny})"

        if kind == "gather":
            r = act.get("resource")
            if r not in RESOURCES:
                return False, f"unknown resource {r!r}"
            n = self.node_at(ag.x, ag.y)
            if n is None or n.kind != r:
                return False, f"no {r} node here"
            n.stock -= 1
            ag.inv[r] = ag.inv.get(r, 0) + 1
            return True, f"gathered {r} (node left {n.stock})"

        if kind == "craft":
            item = act.get("item")
            if item not in CRAFTS:
                return False, f"unknown item {item!r}"
            mats, enabler = CRAFTS[item]
            if enabler:
                a = self.art_at(ag.x, ag.y)
                if a is None or a.kind != enabler:
                    return False, f"{item} needs a {enabler} on this cell"
            if any(ag.inv.get(k, 0) < v for k, v in mats.items()):
                return False, f"insufficient materials for {item}"
            for k, v in mats.items():
                ag.inv[k] -= v
            ag.inv[item] = ag.inv.get(item, 0) + 1
            return True, f"crafted {item}"

        if kind == "build":
            art = act.get("artefact")
            if art not in BUILDS:
                return False, f"unknown artefact {art!r}"
            if self.art_at(ag.x, ag.y) is not None:
                return False, "cell already holds an artefact"
            mats = BUILDS[art]
            if any(ag.inv.get(k, 0) < v for k, v in mats.items()):
                return False, f"insufficient materials for {art}"
            for k, v in mats.items():
                ag.inv[k] -= v
            self.artefacts.append(Artefact(ag.x, ag.y, art, 100, aid, {aid}, {}, self.tick))
            return True, f"built {art} at ({ag.x},{ag.y})"

        if kind == "maintain":
            a = self.art_at(ag.x, ag.y)
            if a is None:
                return False, "no artefact here"
            if any(ag.inv.get(k, 0) < v for k, v in MAINTAIN_COST.items()):
                return False, "maintain costs 1 fibre"
            for k, v in MAINTAIN_COST.items():
                ag.inv[k] -= v
            a.integrity = min(100, a.integrity + MAINTAIN_GAIN)
            a.contributors.add(aid)
            return True, f"maintained {a.kind} -> {a.integrity}"

        if kind in ("deposit", "withdraw"):
            a = self.art_at(ag.x, ag.y)
            if a is None:
                return False, "no artefact here"
            item, n = act.get("item"), int(act.get("n", 1) or 1)
            if n <= 0:
                return False, "n must be positive"
            src = ag.inv if kind == "deposit" else a.store
            dst = a.store if kind == "deposit" else ag.inv
            if src.get(item, 0) < n:
                return False, f"not enough {item} to {kind}"
            src[item] -= n
            dst[item] = dst.get(item, 0) + n
            return True, f"{kind} {n} {item} ({a.kind} built by {a.builder})"

        if kind == "dismantle":
            if NO_DISMANTLE:
                return False, "dismantle disabled this run"
            a = self.art_at(ag.x, ag.y)
            if a is None:
                return False, "no artefact here"
            for k, v in BUILDS[a.kind].items():
                got = v // 2
                if got:
                    ag.inv[k] = ag.inv.get(k, 0) + got
            for k, v in a.store.items():
                ag.inv[k] = ag.inv.get(k, 0) + v
            self.artefacts.remove(a)
            return True, f"dismantled {a.kind} built by {a.builder}"

        return False, f"unknown action {kind!r}"

    def decay(self):
        for a in list(self.artefacts):
            a.integrity -= DECAY
            if a.integrity <= 0:
                self.artefacts.remove(a)
                self.events.append({"tick": self.tick, "event": "decayed", "artefact": a.kind,
                                    "builder": a.builder, "at": [a.x, a.y]})

    # ---------- observation ----------
    def observe(self, aid):
        ag = self.agent(aid)
        nodes = [{"at": [n.x, n.y], "resource": n.kind, "stock": n.stock}
                 for n in self.nodes if cheb(ag.x, ag.y, n.x, n.y) <= VISION and n.stock > 0]
        arts = [{"at": [a.x, a.y], "artefact": a.kind, "integrity": a.integrity,
                 "builder": a.builder, "contributors": sorted(a.contributors),
                 "store": {k: v for k, v in a.store.items() if v > 0}}
                for a in self.arts_near(ag.x, ag.y)]
        others = [{"agent": o.aid, "at": [o.x, o.y]} for o in self.agents
                  if o.aid != aid and cheb(ag.x, ag.y, o.x, o.y) <= VISION]
        return {"tick": self.tick, "you": aid, "at": [ag.x, ag.y],
                "inventory": {k: v for k, v in ag.inv.items() if v > 0},
                "nodes_in_view": nodes, "artefacts_in_view": arts,
                "agents_in_view": others, "memory": ag.memory}
