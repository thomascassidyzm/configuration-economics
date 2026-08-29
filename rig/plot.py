"""Pure-python SVG plotting (no pip available on this box). Dark, phone-legible."""
import json, pathlib, sys, statistics as st

BG, FG, MUT, GRID = "#0e1116", "#e6edf3", "#8b98a8", "#243040"
METRIC_COLS = {"sum": "#4a9eff", "min": "#ffb347", "joint": "#5ddc9a"}
COND_COLS = {"A": "#8b98a8", "B": "#ff6b6b", "C": "#5ddc9a"}
CONDS = {"A": "A - control", "B": "B - one-term optimiser", "C": "C - triad"}
W, PH, PAD_L, PAD_R, PAD_T, PAD_B = 760, 250, 62, 18, 40, 46


def load(logdir):
    """Prefer the .series.json written at run end; fall back to rebuilding the series
    from the incremental .jsonl so a run killed mid-flight is still plottable."""
    out, seen = {}, set()
    for f in sorted(pathlib.Path(logdir).glob("*.series.json")):
        d = json.loads(f.read_text())
        out.setdefault(d["meta"]["condition"], {})[d["meta"]["seed"]] = d
        seen.add(f.name[:-len(".series.json")])
    for f in sorted(pathlib.Path(logdir).glob("*.jsonl")):
        if f.stem in seen:
            continue
        meta, series = None, []
        for line in f.open():
            try:
                d = json.loads(line)
            except json.JSONDecodeError:
                continue                      # a truncated final line from a killed run
            if d.get("type") == "meta":
                meta = d
            elif d.get("type") == "metrics":
                series.append(d)
        if meta and series:
            out.setdefault(meta["condition"], {})[meta["seed"]] = {"meta": meta, "series": series,
                "cost_usd": None, "partial": True}
            print(f"note: {f.name} rebuilt from jsonl ({len(series)} ticks, run incomplete)")
    return out


def agg(runs, key):
    ser = [r["series"] for r in runs.values()]
    n = min(len(s) for s in ser)
    return ([st.fmean(s[i][key] for s in ser) for i in range(n)],
            [min(s[i][key] for s in ser) for i in range(n)],
            [max(s[i][key] for s in ser) for i in range(n)])


def _pts(ys, x0, yt, xw, yh, tmax, vmax):
    return [(x0 + xw * (i / max(1, tmax - 1)), yt + yh - yh * min(1.0, v / vmax))
            for i, v in enumerate(ys)]


def panel(title, series, colours, tmax, vmax, y0):
    x0, xw, yh = PAD_L, W - PAD_L - PAD_R, PH - PAD_T - PAD_B
    yt = y0 + PAD_T
    s = [f'<text x="{x0}" y="{y0+24}" fill="{FG}" font-size="19" font-weight="600">{title}</text>']
    for frac in (0, .25, .5, .75, 1):
        yy = yt + yh - yh * frac
        s.append(f'<line x1="{x0}" y1="{yy:.1f}" x2="{x0+xw}" y2="{yy:.1f}" stroke="{GRID}"/>')
        s.append(f'<text x="{x0-10}" y="{yy+5:.1f}" fill="{MUT}" font-size="14" '
                 f'text-anchor="end">{vmax*frac:.0f}</text>')
    for label, (mean, lo, hi) in series.items():
        col = colours[label]
        if any(a != b for a, b in zip(lo, hi)):
            up = _pts(hi, x0, yt, xw, yh, tmax, vmax)
            dn = _pts(lo, x0, yt, xw, yh, tmax, vmax)[::-1]
            d = "M " + " L ".join(f"{x:.1f},{y:.1f}" for x, y in up + dn) + " Z"
            s.append(f'<path d="{d}" fill="{col}" opacity="0.15"/>')
        d = "M " + " L ".join(f"{x:.1f},{y:.1f}" for x, y in _pts(mean, x0, yt, xw, yh, tmax, vmax))
        s.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="2.6"/>')
    for i, label in enumerate(series):
        lx = x0 + i * 124
        s.append(f'<rect x="{lx}" y="{y0+PH-27}" width="24" height="4" fill="{colours[label]}"/>')
        s.append(f'<text x="{lx+31}" y="{y0+PH-20}" fill="{MUT}" font-size="15">{label}</text>')
    s.append(f'<text x="{x0+xw}" y="{y0+PH-20}" fill="{MUT}" font-size="13" '
             f'text-anchor="end">tick 1 to {tmax}</text>')
    return "".join(s)


def figure(panels, out):
    h = len(panels) * PH + 16
    body = "".join(panel(t, ser, col, tmax, vmax, 8 + i * PH)
                   for i, (t, ser, col, tmax, vmax) in enumerate(panels))
    out.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{h}" '
                   f'viewBox="0 0 {W} {h}"><rect width="{W}" height="{h}" fill="{BG}"/>'
                   f'<style>text{{font-family:system-ui,-apple-system,sans-serif}}</style>'
                   f'{body}</svg>')
    print("wrote", out)


def sparkline(vals, vmax, width=34):
    blocks = "▁▂▃▄▅▆▇█"
    step = len(vals) / width
    out = []
    for i in range(width):
        chunk = vals[int(i * step):max(int(i * step) + 1, int((i + 1) * step))]
        v = (st.fmean(chunk) / vmax) if vmax else 0
        out.append(blocks[min(7, max(0, int(v * 7.999)))])
    return "".join(out)


def main(logdir, outdir):
    outdir = pathlib.Path(outdir); outdir.mkdir(parents=True, exist_ok=True)
    data = load(logdir)
    if not data:
        sys.exit("no series found in " + str(logdir))
    allser = [r["series"] for runs in data.values() for r in runs.values()]
    tmax = max(len(s) for s in allser)
    smax = 10 * (max(p["sum"] for s in allser for p in s) // 10 + 1)
    jmax = max(1, max(p["joint"] for s in allser for p in s))
    jmax = 5 * (jmax // 5 + 1)

    figure([(CONDS[c], {k.upper(): agg(data[c], k) for k in METRIC_COLS},
             {k.upper(): v for k, v in METRIC_COLS.items()}, tmax, smax)
            for c in "ABC" if c in data],
           outdir / "fig1-three-curves-per-condition.svg")

    figure([(cap, {c: agg(data[c], key) for c in "ABC" if c in data}, COND_COLS, tmax, vm)
            for key, cap, vm in (("sum", "SUM omega - global thermometer", smax),
                                 ("min", "MIN omega - the triad's constraint", 15),
                                 ("joint", "JOINT - reachable only together", jmax))],
           outdir / "fig2-conditions-overlaid.svg")

    lines = []
    for c in "ABC":
        if c not in data:
            continue
        for key, vm in (("sum", smax), ("min", 15), ("joint", jmax)):
            m, _, _ = agg(data[c], key)
            lines.append(f"{c} {key.upper():5s} |{sparkline(m, vm)}| "
                         f"peak {max(m):5.1f}  end {m[-1]:5.1f}")
        lines.append("")
    (outdir / "sparklines.txt").write_text("\n".join(lines))
    print("\n".join(lines))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "rig/logs",
         sys.argv[2] if len(sys.argv) > 2 else "rig/plots")
