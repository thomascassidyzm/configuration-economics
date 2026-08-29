# CE RIG v0 — the triad as an agent objective

A closed toy world in which ten identical agents, differing only in the objective clause
of their prompt, act through a deterministic simulator. Built to Tom Cassidy's brief.

Three things are borrowed from SwarmWorld (arXiv 2608.26081) and nothing else:
homogeneous agents with no assigned roles; **stigmergy** — coordination only through
persistent artefacts in the shared world, never messages; and **proposal/consequence
separation** — the agent authors a plan and a narrative, and `world.py` alone decides
what actually happens.

## Files

| file | what it is |
|---|---|
| `world.py` | the simulator. Grid, finite resources, recipes, artefacts, decay, action validation. The only thing that mutates state. |
| `metrics.py` | possibility space, operationalised. SUM / MIN / JOINT per tick. |
| `run.py` | orchestrator. One `claude -p` call per agent per tick; plans applied in a fixed per-seed order. |
| `prompts/build_prompts.py` | generates the three condition prompts from one shared body — they differ **only** in the OBJECTIVE block. |
| `prompts/{A_control,B_optimiser,C_triad}.txt` | the prompts as actually used. |
| `analyse.py` | per-condition outcome and behaviour table from the logs. |
| `plot.py` | pure-Python SVG plots (no pip on this box) + phone-readable sparklines. |
| `logs/` | one `.jsonl` per run with **every narrative stored**, plus `.series.json` metric series. |
| `plots/` | the figures. |

## The world

10×10 grid. Four finite resources (fibre, stone, ore, spark) in 24 nodes, ~597 units
total, no regrowth. Seven craft recipes and four buildable artefacts, in a tech tree:
`workbench → frame → well → elixir`, `kiln → alloy → beacon → orrery`. An artefact is
**public** — placed on a cell, usable, maintainable, withdrawable-from and dismantleable
by any agent. Every artefact loses 2 integrity per tick from 100 and vanishes at 0
unless someone spends a fibre to maintain it. Vision and reachability radius 3.

## Running

```
python3 rig/run.py --cond C --seed 1 --ticks 150 --workers 6 --out rig/logs
python3 rig/analyse.py rig/logs
python3 rig/plot.py rig/logs rig/plots
```
