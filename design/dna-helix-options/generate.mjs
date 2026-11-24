// Generates the three DNA-economy helix candidates (A, B, C) as standalone SVGs.
// Run: node design/dna-helix-options/generate.mjs   then render.mjs for the phone PNGs.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const OUT = dirname(fileURLToPath(import.meta.url));

const C = { void: '#0a0a0c', text: '#e8e8f0', sec: '#a0a0b8', muted: '#606080', accent: '#4a9eff', sun: '#f2b84b', atom: '#a0a0b8' };
const W = 390, H = 844;
const f = (n) => n.toFixed(1);
const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], t)).toString(16).padStart(2, '0')).join(''); };

const head = (title, desc) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
<title id="t">${title}</title><desc id="d">${desc}</desc>
<style>
  text { font-family: Sora, 'Helvetica Neue', Arial, sans-serif; fill: ${C.text}; }
  .lab { font-size: 13px; fill: ${C.sec}; }
  .key { font-size: 15px; font-weight: 600; }
  .small { font-size: 11.5px; fill: ${C.muted}; letter-spacing: 0.02em; }
  .rule { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 23px; fill: ${C.text}; }
</style>
<rect width="${W}" height="${H}" fill="${C.void}"/>
<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.accent}"/></marker>
  <marker id="arrS" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.sun}"/></marker>
  <marker id="arrG" viewBox="0 0 10 10" refX="3" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.sec}"/></marker>
  <radialGradient id="sunG"><stop offset="0" stop-color="#fff3c4"/><stop offset="0.55" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
</defs>
`;
const sun = (x, y, r, rays = true) => {
  let s = `<circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="url(#sunG)" opacity="0.35"/><circle cx="${x}" cy="${y}" r="${r}" fill="${C.sun}"/>`;
  if (rays) for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += `<line x1="${f(x + Math.cos(a) * r * 1.3)}" y1="${f(y + Math.sin(a) * r * 1.3)}" x2="${f(x + Math.cos(a) * r * 1.7)}" y2="${f(y + Math.sin(a) * r * 1.7)}" stroke="${C.sun}" stroke-width="2" stroke-linecap="round"/>`; }
  return s;
};
const rule = (y) => `<text class="rule" x="${W / 2}" y="${y}" text-anchor="middle">leave it better than you found it</text>`;

// helper: sample a 3D-ish curve into back/front segments
function coil({ cx, R, r, yBottom, pitch, turns, phase = 0, colour, width, steps = 720 }) {
  const back = [], front = [];
  const N = steps * turns;
  for (let i = 0; i < N; i++) {
    const t0 = (i / steps) * 2 * Math.PI + phase, t1 = ((i + 1) / steps) * 2 * Math.PI + phase;
    const u = i / N;
    const p = (t) => [cx + R * Math.sin(t), yBottom - (pitch * (t - phase)) / (2 * Math.PI) + r * Math.cos(t)];
    const [x0, y0] = p(t0), [x1, y1] = p(t1);
    const depth = Math.cos((t0 + t1) / 2);
    const seg = { d: `M${f(x0)},${f(y0)}L${f(x1)},${f(y1)}`, col: colour(u), w: width(u), depth };
    (depth < 0 ? back : front).push(seg);
  }
  const draw = (arr, op, wk) => arr.map((s) => `<path d="${s.d}" stroke="${s.col}" stroke-width="${f(s.w * wk)}" stroke-linecap="round" fill="none" opacity="${op}"/>`).join('');
  return { back: draw(back, 0.32, 0.7), front: draw(front, 1, 1) };
}

// ---------- A: one rising coil, side view, sun beside ----------
function optionA() {
  const turns = 4, yB = 630, pitch = 100, cx = 222, R = 100, r = 24;
  const c = coil({ cx, R, r, yBottom: yB, pitch, turns, phase: -Math.PI / 2,
    colour: (u) => mix('#3a4c6e', C.accent, u), width: (u) => lerp(4, 7, u) });
  const top = yB - pitch * turns;
  let s = head('A DNA economy, drawn as a rising coil', 'One coil seen from the side. Every turn is the same width, because the atoms are fixed. The sun beside it turns it each day. Each turn starts higher than the last: what rises is what becomes possible.');
  // axis of the rise
  s += `<line x1="${cx}" y1="${yB + 30}" x2="${cx}" y2="${top - 40}" stroke="${C.accent}" stroke-width="1.6" stroke-dasharray="3 6" marker-end="url(#arr)" opacity="0.9"/>`;
  s += c.back + c.front;
  // width bracket: same every turn
  const bx1 = cx - R, bx2 = cx + R, by = yB + 56;
  s += `<path d="M${bx1},${by - 6}V${by}H${bx2}V${by - 6}" stroke="${C.sec}" stroke-width="1.4" fill="none"/>`;
  s += `<text class="key" x="${cx}" y="${by + 24}" text-anchor="middle">a fixed number of atoms</text>`;
  s += `<text class="lab" x="${cx}" y="${by + 43}" text-anchor="middle">same width every turn</text>`;
  // sun on the left, arrow showing it turns the coil
  const sx = 48, sy = 330;
  s += sun(sx, sy, 17);
  s += `<path d="M${sx + 30},${sy + 22} Q${sx + 30},${sy + 90} ${cx - R - 4},${yB - 2 * pitch - 8}" stroke="${C.sun}" stroke-width="1.8" fill="none" marker-end="url(#arrS)"/>`;
  s += `<text class="key" x="20" y="${sy - 74}">a fixed daily</text><text class="key" x="20" y="${sy - 55}">solar flux</text>`;
  s += `<text class="lab" x="20" y="${sy - 36}">turns it</text>`;
  // the rise
  s += `<text class="key" x="${W / 2}" y="${top - 112}" text-anchor="middle">unbounded pattern intelligence</text>`;
  s += `<text class="lab" x="${W / 2}" y="${top - 90}" text-anchor="middle" style="fill:${C.accent}">rises: what becomes possible</text>`;
  s += `<text class="small" x="${W / 2}" y="${top - 72}" text-anchor="middle">know-how, not more stuff</text>`;
  s += rule(814);
  s += `<line x1="140" y1="772" x2="250" y2="772" stroke="${C.muted}" stroke-width="1"/>`;
  return s + '</svg>\n';
}

// ---------- B: true double helix, atoms strand + know-how strand, sunlight rungs ----------
function optionB() {
  const cx = 195, A = 92, yB = 640, yT = 190, twists = 2, steps = 900, P0 = Math.PI / 2;
  const N = steps * twists, h = yB - yT;
  const pt = (t, ph) => [cx + A * Math.sin(t + ph + P0), yB - (h * t) / (2 * Math.PI * twists)];
  const segs = [];
  for (const [ph, kind] of [[Math.PI, 'atoms'], [0, 'know']]) {
    for (let i = 0; i < N; i++) {
      const t0 = (i / steps) * 2 * Math.PI, t1 = ((i + 1) / steps) * 2 * Math.PI, u = i / N;
      const [x0, y0] = pt(t0, ph), [x1, y1] = pt(t1, ph);
      const depth = Math.cos((t0 + t1) / 2 + ph + P0);
      const col = kind === 'atoms' ? C.atom : mix('#35507e', C.accent, u);
      const w = kind === 'atoms' ? 5 : lerp(3, 9, u);
      segs.push({ d: `M${f(x0)},${f(y0)}L${f(x1)},${f(y1)}`, col, w, depth });
    }
  }
  const draw = (arr, op) => arr.map((s) => `<path d="${s.d}" stroke="${s.col}" stroke-width="${f(s.w * (op < 1 ? 0.75 : 1))}" stroke-linecap="round" fill="none" opacity="${op}"/>`).join('');
  let s = head('A DNA economy, drawn as a double helix', 'Two strands twist upwards. One strand is the atoms: the same thickness all the way up. The other is know-how: it gets stronger with every turn. The rungs joining them are sunlight, one per day. The whole thing rises: what rises is what becomes possible.');
  s += draw(segs.filter((x) => x.depth < 0), 0.3);
  // rungs = days of sunlight
  const rungs = 14;
  for (let k = 0; k < rungs; k++) {
    const t = ((k + 0.5) / rungs) * 2 * Math.PI * twists;
    const [x0, y] = pt(t, 0), [x1] = pt(t, Math.PI);
    if (Math.abs(x1 - x0) < 18) continue;
    s += `<line x1="${f(x0)}" y1="${f(y)}" x2="${f(x1)}" y2="${f(y)}" stroke="${C.sun}" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>`;
  }
  s += draw(segs.filter((x) => x.depth >= 0), 1);
  // rise arrow on the right
  s += `<line x1="362" y1="${yB}" x2="362" y2="${yT - 20}" stroke="${C.accent}" stroke-width="1.8" marker-end="url(#arr)"/>`;
  s += `<text class="lab" transform="translate(352 ${(yB + yT) / 2}) rotate(-90)" text-anchor="middle" style="fill:${C.accent}">what becomes possible</text>`;
  // labels at the foot: strand identities
  const [ax] = pt(0, Math.PI), [kx] = pt(0, 0);
  s += `<line x1="${f(ax)}" y1="${yB + 6}" x2="${f(ax) - 10}" y2="${yB + 38}" stroke="${C.sec}" stroke-width="1"/>`;
  s += `<line x1="${f(kx)}" y1="${yB + 6}" x2="${f(kx) + 10}" y2="${yB + 38}" stroke="${C.sec}" stroke-width="1"/>`;
  s += `<text class="key" x="20" y="${yB + 62}">a fixed number</text><text class="key" x="20" y="${yB + 81}">of atoms</text>`;
  s += `<text class="lab" x="20" y="${yB + 99}">same strand all the way up</text>`;
  s += `<text class="key" x="${W - 20}" y="${yB + 62}" text-anchor="end">unbounded pattern</text><text class="key" x="${W - 20}" y="${yB + 81}" text-anchor="end">intelligence</text>`;
  s += `<text class="lab" x="${W - 20}" y="${yB + 99}" text-anchor="end">stronger every turn</text>`;
  // sunlight rungs label at top
  s += sun(52, 106, 14);
  s += `<text class="key" x="86" y="100">a fixed daily solar flux</text>`;
  s += `<text class="lab" x="86" y="119">each rung is a day of sunlight</text>`;
  s += `<line x1="140" y1="${H - 66}" x2="250" y2="${H - 66}" stroke="${C.muted}" stroke-width="1"/>`;
  s += rule(H - 30);
  return s + '</svg>\n';
}

// ---------- C: same loop, two views: from above a circle, from the side a climb ----------
function optionC() {
  const turns = ['energy', 'heat', 'food', 'making'];
  const cols = ['#f2b84b', '#e8806a', '#7cc48a', '#4a9eff'];
  let s = head('A DNA economy, seen from above and from the side', 'From above, the loop is a circle: the atoms go round, turned by the sun at its centre. From the side, the same loop climbs: each time round starts higher. What rises is what becomes possible.');
  // --- plan view ---
  const px = 195, py = 205, PR = 92;
  s += `<text class="small" x="${px}" y="58" text-anchor="middle">FROM ABOVE: IT GOES ROUND</text>`;
  for (let i = 0; i < 4; i++) {
    const a0 = -Math.PI / 2 + (i * Math.PI) / 2 + 0.1, a1 = a0 + Math.PI / 2 - 0.2;
    const x0 = px + PR * Math.cos(a0), y0 = py + PR * Math.sin(a0), x1 = px + PR * Math.cos(a1), y1 = py + PR * Math.sin(a1);
    s += `<path d="M${f(x0)},${f(y0)} A${PR},${PR} 0 0 1 ${f(x1)},${f(y1)}" stroke="${cols[i]}" stroke-width="7" fill="none" stroke-linecap="round" marker-end="url(#arrG)"/>`;
    const am = (a0 + a1) / 2, lr = PR + 24;
    const lx = px + lr * Math.cos(am), ly = py + lr * Math.sin(am) + 4;
    s += `<text class="lab" x="${f(lx)}" y="${f(ly)}" text-anchor="${Math.cos(am) > 0.2 ? 'start' : Math.cos(am) < -0.2 ? 'end' : 'middle'}" style="fill:${cols[i]}">${turns[i]}</text>`;
  }
  s += sun(px, py, 16);
  s += `<text class="key" x="${px}" y="${py + PR + 62}" text-anchor="middle">a fixed number of atoms</text>`;
  s += `<text class="lab" x="${px}" y="${py + PR + 81}" text-anchor="middle">go round, turned by</text>`;
  s += `<text class="lab" x="${px}" y="${py + PR + 99}" text-anchor="middle"><tspan style="fill:${C.sun}">a fixed daily solar flux</tspan></text>`;
  // --- divider ---
  const dy = 412;
  s += `<line x1="40" y1="${dy}" x2="350" y2="${dy}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="2 5"/>`;
  s += `<text class="small" x="${px}" y="${dy + 30}" text-anchor="middle">FROM THE SIDE: IT CLIMBS</text>`;
  // --- elevation: same circle, sides seen edge-on, four laps stepping up ---
  const ex = 205, ER = 105, er = 16, yB = 728, pitch = 66, laps = 4;
  const steps = 600, N = steps * laps; const back = [], front = [];
  for (let i = 0; i < N; i++) {
    const t0 = (i / steps) * 2 * Math.PI, t1 = ((i + 1) / steps) * 2 * Math.PI;
    const P = (t) => [ex + ER * Math.sin(t), yB - (pitch * t) / (2 * Math.PI) + er * Math.cos(t)];
    const [x0, y0] = P(t0), [x1, y1] = P(t1);
    const tm = ((t0 + t1) / 2) % (2 * Math.PI), q = Math.min(3, Math.floor(((tm + Math.PI) % (2 * Math.PI)) / (Math.PI / 2)));
    const lap = Math.floor(i / steps);
    const seg = `<path d="M${f(x0)},${f(y0)}L${f(x1)},${f(y1)}" stroke="${cols[q]}" stroke-width="${Math.cos((t0 + t1) / 2) < 0 ? 3 : 5.5}" stroke-linecap="round" fill="none" opacity="${Math.cos((t0 + t1) / 2) < 0 ? 0.28 : lerp(0.6, 1, lap / 3)}"/>`;
    (Math.cos((t0 + t1) / 2) < 0 ? back : front).push(seg);
  }
  s += back.join('') + front.join('');
  // rise arrow + label on the left
  const top = yB - pitch * laps;
  s += `<line x1="52" y1="${yB + 14}" x2="52" y2="${top - 8}" stroke="${C.accent}" stroke-width="1.8" marker-end="url(#arr)"/>`;
  s += `<text class="key" transform="translate(30 ${(yB + top) / 2 + 2}) rotate(-90)" text-anchor="middle">unbounded pattern intelligence</text>`;
  s += `<text class="lab" transform="translate(76 ${(yB + top) / 2 + 2}) rotate(-90)" text-anchor="middle" style="fill:${C.accent}">rises: what becomes possible</text>`;
  s += rule(H - 30);
  return s + '</svg>\n';
}

for (const [k, fn] of [['A', optionA], ['B', optionB], ['C', optionC]]) {
  writeFileSync(join(OUT, `option-${k}.svg`), fn());
}
console.log('wrote option-A/B/C.svg');
