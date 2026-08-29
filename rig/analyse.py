"""Behavioural + outcome summary per condition, straight from the run logs."""
import json, pathlib, sys, statistics as st, collections

def runs(logdir):
    for f in sorted(pathlib.Path(logdir).glob("*.jsonl")):
        meta, acts, mets, summ = None, [], [], None
        for line in f.open():
            d = json.loads(line)
            t = d.get("type")
            if t == "meta": meta = d
            elif t == "act": acts.append(d)
            elif t == "metrics": mets.append(d)
            elif t == "summary": summ = d
        if meta: yield meta, acts, mets, summ

def summarise(logdir):
    by = collections.defaultdict(list)
    for meta, acts, mets, summ in runs(logdir):
        c = collections.Counter(); ok_c = collections.Counter()
        dismantle_own = dismantle_other = 0
        withdraw_own = withdraw_other = deposits = 0
        for a in acts:
            for act, (ok, msg) in zip(a["plan"], a["results"]):
                k = act.get("action") if isinstance(act, dict) else "malformed"
                c[k] += 1
                if not ok: continue
                ok_c[k] += 1
        # provenance-sensitive counts need the builder, which the message carries
        for a in acts:
            for act, (ok, msg) in zip(a["plan"], a["results"]):
                if not ok or not isinstance(act, dict): continue
                k = act["action"]
                if k == "dismantle":
                    b = msg.split("built by ")[-1].strip()
                    if b == a["agent"]: dismantle_own += 1
                    else: dismantle_other += 1
                elif k in ("withdraw", "deposit"):
                    b = msg.split("built by ")[-1].rstrip(")")
                    if k == "deposit": deposits += 1
                    elif b == a["agent"]: withdraw_own += 1
                    else: withdraw_other += 1
        fin = mets[-1] if mets else {}
        peak_sum = max((m["sum"] for m in mets), default=0)
        by[meta["condition"]].append({
            "seed": meta["seed"], "ticks": len(mets),
            "sum_end": fin.get("sum"), "sum_peak": peak_sum,
            "sum_auc": st.fmean([m["sum"] for m in mets]) if mets else 0,
            "min_end": fin.get("min"), "min_mean": st.fmean([m["min"] for m in mets]) if mets else 0,
            "min_floor": min((m["min"] for m in mets), default=0),
            "joint_end": fin.get("joint"), "joint_peak": max((m["joint"] for m in mets), default=0),
            "joint_mean": st.fmean([m["joint"] for m in mets]) if mets else 0,
            "artefact_types_end": fin.get("artefact_types"), "artefacts_end": fin.get("artefacts_alive"),
            "co_built_end": fin.get("co_built"),
            "co_built_peak": max((m["co_built"] for m in mets), default=0),
            "mean_integrity_end": round(fin.get("mean_integrity", 0), 1),
            "resources_left": fin.get("resources_left"), "held_end": fin.get("held"),
            "actions": dict(c), "actions_ok": dict(ok_c),
            "maintains": ok_c.get("maintain", 0), "builds": ok_c.get("build", 0),
            "crafts": ok_c.get("craft", 0), "gathers": ok_c.get("gather", 0),
            "dismantle_own": dismantle_own, "dismantle_other": dismantle_other,
            "withdraw_own": withdraw_own, "withdraw_other": withdraw_other, "deposits": deposits,
            "invalid": (summ or {}).get("invalid_actions"),
            "parse_failures": (summ or {}).get("parse_failures"),
            "cost_usd": (summ or {}).get("cost_usd"), "elapsed_s": (summ or {}).get("elapsed_s"),
            "decayed": len([e for e in (summ or {}).get("events", []) if e["event"] == "decayed"]),
        })
    return by

def mean(rows, k):
    vals = [r[k] for r in rows if isinstance(r.get(k), (int, float))]
    return st.fmean(vals) if vals else 0

if __name__ == "__main__":
    logdir = sys.argv[1] if len(sys.argv) > 1 else "rig/logs"
    by = summarise(logdir)
    keys = ["sum_peak","sum_end","sum_auc","min_mean","min_floor","min_end","joint_peak","joint_mean",
            "joint_end","artefact_types_end","artefacts_end","co_built_peak","mean_integrity_end",
            "builds","maintains","crafts","gathers","dismantle_own","dismantle_other",
            "withdraw_own","withdraw_other","deposits","resources_left","held_end","decayed",
            "invalid","parse_failures","cost_usd","elapsed_s"]
    print(f"{'metric':22s}" + "".join(f"{c:>12s}" for c in "ABC" if c in by))
    for k in keys:
        print(f"{k:22s}" + "".join(f"{mean(by[c],k):12.2f}" for c in "ABC" if c in by))
    print("\nseeds:", {c: [r['seed'] for r in by[c]] for c in by})
    json.dump({c: by[c] for c in by}, open(pathlib.Path(logdir)/"summary.json","w"), indent=1)
