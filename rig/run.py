"""CE RIG v0 orchestrator. Agents propose; world.py disposes."""
import json, os, re, subprocess, sys, time, pathlib, argparse
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from world import World, N_AGENTS
from metrics import snapshot

ROOT = pathlib.Path(__file__).parent
CLAUDE = os.path.expanduser("~/.local/bin/claude")
PROMPTS = {"A": "A_control.txt", "B": "B_optimiser.txt", "C": "C_triad.txt"}
NOTOOLS = ["Bash", "Read", "Edit", "Write", "Glob", "Grep", "WebFetch", "WebSearch",
           "Task", "TodoWrite", "NotebookEdit"]


def call_agent(sysprompt, obs, model, effort, tries=2):
    """One agent, one tick. Returns (parsed_or_None, cost, raw, err)."""
    user = ("Current observation:\n" + json.dumps(obs, separators=(",", ":")) +
            "\nEmit your JSON object now.")
    cost = 0.0
    for attempt in range(tries):
        try:
            p = subprocess.run(
                [CLAUDE, "-p", "--model", model, "--effort", effort,
                 "--output-format", "json", "--system-prompt", sysprompt,
                 "--disallowed-tools", *NOTOOLS],
                input=user, capture_output=True, text=True, timeout=180,
                env={**os.environ, "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"})
            env = json.loads(p.stdout)
            cost += float(env.get("total_cost_usd") or 0.0)
            raw = env.get("result", "")
            m = re.search(r"\{.*\}", raw, re.S)
            if not m:
                continue
            d = json.loads(m.group(0))
            if isinstance(d.get("plan"), list):
                return d, cost, raw, None
        except Exception as e:                       # timeout / bad JSON / CLI failure
            err = f"{type(e).__name__}: {e}"
            if attempt == tries - 1:
                return None, cost, "", err
    return None, cost, raw if 'raw' in dir() else "", "unparseable"


def run(cond, seed, ticks, model, effort, outdir, workers=8):
    sysprompt = (ROOT / "prompts" / PROMPTS[cond]).read_text()
    w = World(seed)
    outdir.mkdir(parents=True, exist_ok=True)
    tag = f"{cond}_seed{seed}"
    log = open(outdir / f"{tag}.jsonl", "w")
    series, total_cost, fails, invalid = [], 0.0, 0, 0
    meta = {"condition": cond, "seed": seed, "ticks": ticks, "model": model,
            "effort": effort, "prompt_file": PROMPTS[cond], "started": time.time()}
    log.write(json.dumps({"type": "meta", **meta}) + "\n")
    t0 = time.time()

    for t in range(1, ticks + 1):
        w.tick = t
        obs = {a.aid: w.observe(a.aid) for a in w.agents}   # simultaneous observation
        with ThreadPoolExecutor(max_workers=workers) as ex:
            futs = {aid: ex.submit(call_agent, sysprompt, obs[aid], model, effort)
                    for aid in obs}
            replies = {aid: f.result() for aid, f in futs.items()}

        for aid in w.order:                                 # deterministic resolution
            d, c, raw, err = replies[aid]
            total_cost += c
            if d is None:
                fails += 1
                log.write(json.dumps({"type": "parse_fail", "tick": t, "agent": aid,
                                      "err": err, "raw": raw[:500]}) + "\n")
                continue
            ag = w.agent(aid)
            ag.memory = str(d.get("memory", ""))[:400]
            results = []
            for act in d["plan"][:3]:
                if not isinstance(act, dict):
                    results.append([False, "malformed action"]); invalid += 1; continue
                ok, msg = w.apply(aid, act)
                if not ok:
                    invalid += 1
                results.append([ok, msg])
            log.write(json.dumps({"type": "act", "tick": t, "agent": aid,
                                  "plan": d["plan"][:3], "results": results,
                                  "narrative": str(d.get("narrative", ""))[:1500],
                                  "memory": ag.memory, "cost": round(c, 6)}) + "\n")
        w.decay()
        snap = snapshot(w)
        series.append(snap)
        log.write(json.dumps({"type": "metrics", **snap}) + "\n")
        log.flush()
        if t % 5 == 0 or t == 1:
            print(f"[{tag}] t={t}/{ticks} sum={snap['sum']} min={snap['min']} "
                  f"joint={snap['joint']} art={snap['artefacts_alive']} "
                  f"${total_cost:.2f} {time.time()-t0:.0f}s", flush=True)

    summary = {"type": "summary", **meta, "elapsed_s": round(time.time() - t0, 1),
               "cost_usd": round(total_cost, 4), "parse_failures": fails,
               "invalid_actions": invalid, "final": series[-1] if series else None,
               "events": w.events}
    log.write(json.dumps(summary) + "\n")
    log.close()
    (outdir / f"{tag}.series.json").write_text(json.dumps({"meta": meta, "series": series,
        "cost_usd": summary["cost_usd"], "parse_failures": fails,
        "invalid_actions": invalid, "elapsed_s": summary["elapsed_s"]}))
    print(f"[{tag}] DONE cost=${total_cost:.2f} fails={fails} invalid={invalid}", flush=True)
    return summary


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--cond", required=True)
    ap.add_argument("--seed", type=int, required=True)
    ap.add_argument("--ticks", type=int, default=40)
    ap.add_argument("--model", default="sonnet")
    ap.add_argument("--effort", default="low")
    ap.add_argument("--out", default=str(ROOT / "logs"))
    ap.add_argument("--workers", type=int, default=8)
    a = ap.parse_args()
    run(a.cond, a.seed, a.ticks, a.model, a.effort, pathlib.Path(a.out), a.workers)
