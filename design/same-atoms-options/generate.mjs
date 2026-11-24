// "Same atoms, better configurations": three candidates (A, B, C) as standalone SVGs.
// Run: node design/same-atoms-options/generate.mjs   then render.mjs for the 390x844 phone PNGs.
// On-drawing words: Tom's own phrases (2026-11-24) plus one- or two-word labels only.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const OUT = dirname(fileURLToPath(import.meta.url));

// site colours (src/pages/index.astro) + sun, piece and sand tones
const C = { void: '#0a0a0c', text: '#e8e8f0', sec: '#a0a0b8', muted: '#606080', accent: '#4a9eff', sun: '#f2b84b', piece: '#d4d4e4', sand: '#d9c08a' };
const W = 390, H = 844;
const f = (n) => n.toFixed(1);
const lerp = (a, b, t) => a + (b - a) * t;
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const head = (title, desc) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
<title id="t">${title}</title><desc id="d">${desc}</desc>
<style>
  text { font-family: Sora, 'Helvetica Neue', Arial, sans-serif; fill: ${C.text}; }
  .key { font-size: 15px; font-weight: 600; }
  .lab { font-size: 12.5px; fill: ${C.sec}; }
  .small { font-size: 11px; fill: ${C.muted}; letter-spacing: 0.03em; }
  .eq { font-size: 15px; font-weight: 600; }
  .rule { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 22px; fill: ${C.text}; }
</style>
<rect width="${W}" height="${H}" fill="${C.void}"/>
<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.accent}"/></marker>
  <radialGradient id="sunG"><stop offset="0" stop-color="#fff3c4"/><stop offset="0.55" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
</defs>
`;
// the identical sun, drawn the same at every stage: the constant
const sun = (x, y, r = 10) => {
  let s = `<circle cx="${x}" cy="${y}" r="${r * 2}" fill="url(#sunG)" opacity="0.3"/><circle cx="${x}" cy="${y}" r="${r}" fill="${C.sun}"/>`;
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; s += `<line x1="${f(x + Math.cos(a) * r * 1.4)}" y1="${f(y + Math.sin(a) * r * 1.4)}" x2="${f(x + Math.cos(a) * r * 1.85)}" y2="${f(y + Math.sin(a) * r * 1.85)}" stroke="${C.sun}" stroke-width="1.8" stroke-linecap="round"/>`; }
  return s;
};
const sameSun = (x, y) => sun(x, y) + `<text class="small" x="${x}" y="${y + 34}" text-anchor="middle">same sun</text>`;
// a small blue spark between stages: pattern intelligence doing the rearranging
const spark = (x, y, r = 7) => `<path d="M${x},${y - r} Q${x},${y} ${x + r},${y} Q${x},${y} ${x},${y + r} Q${x},${y} ${x - r},${y} Q${x},${y} ${x},${y - r}z" fill="${C.accent}"/>`;
const step = (x, y) => spark(x, y) + `<path d="M${x},${y + 16} V${y + 11}" stroke="none"/>`;
// growth arrow up the side
const growth = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${C.accent}" stroke-width="2" marker-end="url(#arr)"/>
<text class="key" transform="translate(${x - 8},${(y1 + y2) / 2}) rotate(-90)" text-anchor="middle" style="fill:${C.accent}">growth</text>`;
// Tom's equation, each term in the colour it wears on the drawing
const equation = (y) => {
  const lines = [['same atoms', C.piece, ''], ['constant solar flux', C.sun, '× '], ['pattern intelligence', C.accent, '× '], ['better configurations', C.text, '= ']];
  return `<line x1="120" y1="${y - 26}" x2="270" y2="${y - 26}" stroke="${C.muted}" stroke-width="1"/>` +
    lines.map(([t, col, op], i) => `<text class="eq" x="${W / 2}" y="${y + i * 23}" text-anchor="middle"><tspan style="fill:${C.muted}">${op}</tspan><tspan style="fill:${col}">${t}</tspan></text>`).join('');
};
const rule = (y) => `<text class="rule" x="${W / 2}" y="${y}" text-anchor="middle">leave it better than you found it</text>`;
const dot = (x, y, r, op = 1) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${C.piece}" opacity="${op}"/>`;
const link = (a, b, op = 0.8, w = 2) => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${C.accent}" stroke-width="${w}" opacity="${op}" stroke-linecap="round"/>`;

// ---------- A: the helix kept; every turn carries the same 12 atoms, more joined up each turn ----------
function optionA() {
  seed = 11;
  const cx = 205, R = 105, r = 18, pitch = 140, yB = 595, turns = 4, N = 12;
  let s = head('Same atoms, better configurations: the helix', 'A rising coil of four turns. Every turn carries the same twelve atoms. At the bottom they are a loose heap; each turn up they are joined into a better arrangement: pairs, a ring, a web. The same sun shines beside every turn. The rise is labelled growth.');
  s += growth(cx, yB - 22, yB - pitch * (turns - 1) - 70);
  const labels = ['a heap', 'pairs', 'a ring', 'a web'];
  for (let k = 0; k < turns; k++) {
    const yc = yB - k * pitch;
    // the faint coil for this turn
    let back = '', front = '';
    for (let i = 0; i < 120; i++) {
      const t0 = (i / 120) * 2 * Math.PI, t1 = ((i + 1) / 120) * 2 * Math.PI;
      const p = (t) => [cx + R * Math.sin(t), yc - (pitch * t) / (2 * Math.PI) * 0 + r * Math.cos(t)];
      const [x0, y0] = p(t0), [x1, y1] = p(t1);
      const seg = `<path d="M${f(x0)},${f(y0)}L${f(x1)},${f(y1)}" stroke="#222b40" stroke-width="1.4" fill="none"/>`;
      if (Math.cos((t0 + t1) / 2) < 0) back += seg; else front += seg;
    }
    if (k < turns - 1) s += `<path d="M${cx},${yc - r} C${cx - R * 0.9},${yc - r - 10} ${cx - R * 0.9},${yc - pitch + r + 10} ${cx},${yc - pitch + r}" stroke="#222b40" stroke-width="1.4" fill="none"/>`;
    // the 12 atoms on this turn
    const pts = [];
    for (let j = 0; j < N; j++) {
      const t = (j / N) * 2 * Math.PI + 0.26;
      let x = cx + R * Math.sin(t), y = yc + r * Math.cos(t);
      const depth = Math.cos(t);
      if (k === 0) { // loose heap: tumbled to the floor of the turn
        const rows = [5, 4, 2, 1]; let row = 0, i = j; while (i >= rows[row]) { i -= rows[row]; row++; }
        x = cx + (i - (rows[row] - 1) / 2) * 15 + (rnd() - 0.5) * 6; y = yc + 18 - row * 12 + (rnd() - 0.5) * 4;
      }
      pts.push({ x, y, depth: k === 0 ? 1 : depth });
    }
    s += back + front;
    let links = [];
    if (k === 1) for (let j = 0; j < N; j += 2) links.push([j, j + 1]);
    if (k >= 2) for (let j = 0; j < N; j++) links.push([j, (j + 1) % N]);
    if (k === 3) for (let j = 0; j < N / 2; j++) links.push([j, j + N / 2]);
    for (const [a, b] of links) { const d = (pts[a].depth + pts[b].depth) / 2; s += link([pts[a].x, pts[a].y], [pts[b].x, pts[b].y], d < 0 && k !== 3 ? 0.35 : (k === 3 && Math.abs(a - b) === N / 2 ? 0.45 : 0.85), k === 3 && Math.abs(a - b) === N / 2 ? 1.2 : 2); }
    for (const p of pts) s += dot(p.x, p.y, p.depth < 0 ? 4.2 : 5.6, p.depth < 0 ? 0.55 : 1);
    s += sameSun(40, yc - 6);
    s += `<text class="key" x="372" y="${yc - 2}" text-anchor="end">${labels[k]}</text><text class="small" x="372" y="${yc + 15}" text-anchor="end">12 atoms</text>`;
  }
  s += equation(680) + rule(800);
  return s + '</svg>\n';
}

// ---------- B: no helix; one box of 12 blocks built four ways ----------
function optionB() {
  seed = 3;
  let s = head('Same atoms, better configurations: one box of blocks', 'The same twelve blocks four times, rising up the page: a heap, a wall, a bridge, a home. Each build can do more than the one below. The same sun shines beside every stage. The rise is labelled growth.');
  const P = 17, B = 15, cx = 185;
  const block = (gx, gy, base, ox, rot = 0) => { const x = ox + gx * P, y = base - (gy + 1) * P; return `<rect x="${f(x)}" y="${f(y)}" width="${B}" height="${B}" rx="2" fill="${C.piece}" stroke="#8a8aa6" stroke-width="1" transform="rotate(${f(rot)} ${f(x + B / 2)} ${f(y + B / 2)})"/>`; };
  const builds = [
    { name: 'a heap', cells: (() => { const c = []; [[0, 5], [1, 4], [2, 2], [3, 1]].forEach(([row, n]) => { for (let i = 0; i < n; i++) c.push([i + row * 0.5 + (rnd() - 0.5) * 0.35, row * 0.82, (rnd() - 0.5) * 40]); }); return c; })(), w: 5 },
    { name: 'a wall', cells: [...Array(12)].map((_, i) => [i % 6, Math.floor(i / 6), 0]), w: 6 },
    { name: 'a bridge', cells: [[1, 0], [1, 1], [6, 0], [6, 1], ...[...Array(8)].map((_, i) => [i, 2])].map((c) => [...c, 0]), w: 8, water: true },
    { name: 'a home', cells: [[0, 0], [0, 1], [0, 2], [3, 0], [3, 1], [3, 2], [0, 3], [1, 3], [2, 3], [3, 3], [1, 4], [2, 4]].map((c) => [...c, 0]), w: 4 },
  ];
  const bases = [575, 440, 305, 170];
  s += growth(26, 600, 52);
  builds.forEach((b, k) => {
    const base = bases[k], ox = cx - (b.w * P) / 2;
    s += `<line x1="${ox - 14}" y1="${base + 1}" x2="${ox + b.w * P + 12}" y2="${base + 1}" stroke="${C.muted}" stroke-width="1"/>`;
    if (b.water) s += `<path d="M${ox + 2 * P + 4},${base - 9} q8,-5 16,0 t16,0 t16,0 t16,0 t16,0" stroke="${C.accent}" stroke-width="1.5" fill="none" opacity="0.6"/>`;
    for (const [gx, gy, rot] of b.cells) s += block(gx, gy, base, ox, rot);
    s += `<text class="key" x="${cx}" y="${base + 22}" text-anchor="middle">${b.name}</text><text class="small" x="${cx}" y="${base + 38}" text-anchor="middle">12 blocks</text>`;
    s += sameSun(335, base - 26);
    if (k < 3) s += spark(cx, [500, 377, 232][k]);
  });
  s += equation(680) + rule(800);
  return s + '</svg>\n';
}

// ---------- C: a true one. Sand to glass to solar panel: the same silicon atoms, rearranged ----------
function optionC() {
  seed = 5;
  let s = head('Same atoms, better configurations: sand, glass, solar panel', 'Three stages rising up the page, with a close-up of the same nine silicon atoms in each. Sand: the atoms sit in separate loose grains. Glass: melted into one tangled net, which lets light through. Solar panel: one neat grid, which turns sunlight into power. The same sun shines beside every stage. The rise is labelled growth.');
  const rows = [550, 375, 200];
  const ix = 95, zx = 235, zr = 50;
  s += growth(18, 595, 120);
  const zoom = (cy, inner) => `<circle cx="${zx}" cy="${cy}" r="${zr}" fill="#11131a" stroke="${C.muted}" stroke-width="1.2"/>${inner}`;
  const si = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="5" fill="${C.piece}"/>`;
  const lk = (a, b) => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${C.accent}" stroke-width="2" opacity="0.85"/>`;
  // 1. sand: three separate grains, three atoms each, joined only inside a grain
  {
    const cy = rows[0];
    let pile = '';
    for (let i = 0; i < 70; i++) { const u = rnd(), v = rnd(); const x = ix + (u - 0.5) * 110 * (1 - v * 0.8); const y = cy + 28 - v * 46 * (1 - Math.abs(u - 0.5) * 1.4); pile += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2 + rnd() * 1.6)}" fill="${C.sand}" opacity="${f(0.6 + rnd() * 0.4)}"/>`; }
    s += pile;
    let z = '';
    [[zx - 22, cy - 18, 0.3], [zx + 22, cy - 12, -0.5], [zx - 2, cy + 24, 1.1]].forEach(([gx, gy, a]) => {
      z += `<ellipse cx="${gx}" cy="${gy}" rx="17" ry="14" fill="none" stroke="${C.sand}" stroke-width="1.4" opacity="0.7" transform="rotate(${f(a * 40)} ${gx} ${gy})"/>`;
      const p = [0, 1, 2].map((i) => [gx + 8 * Math.cos(a + (i * 2 * Math.PI) / 3), gy + 8 * Math.sin(a + (i * 2 * Math.PI) / 3)]);
      z += lk(p[0], p[1]) + lk(p[1], p[2]) + lk(p[2], p[0]) + p.map((q) => si(...q)).join('');
    });
    s += zoom(cy, z);
    s += `<text class="key" x="${ix}" y="${cy + 54}" text-anchor="middle">sand</text>`;
    s += `<text class="small" x="${zx}" y="${cy + zr + 18}" text-anchor="middle">9 silicon</text>`;
    s += sameSun(352, cy - 6);
  }
  // 2. glass: one irregular net; a window that lets light through
  {
    const cy = rows[1];
    s += `<rect x="${ix - 42}" y="${cy - 44}" width="84" height="80" rx="3" fill="${C.accent}" fill-opacity="0.12" stroke="${C.sec}" stroke-width="3"/>`;
    s += `<line x1="${ix}" y1="${cy - 44}" x2="${ix}" y2="${cy + 36}" stroke="${C.sec}" stroke-width="2.5"/><line x1="${ix - 42}" y1="${cy - 4}" x2="${ix + 42}" y2="${cy - 4}" stroke="${C.sec}" stroke-width="2.5"/>`;
    s += `<path d="M${ix - 34},${cy - 34} l14,-0 M${ix + 8},${cy - 34} l10,0" stroke="#ffffff" stroke-width="2" opacity="0.35" stroke-linecap="round"/>`;
    const p = [[-28, -22], [-4, -32], [22, -24], [-32, 4], [-8, -6], [26, 2], [-18, 26], [8, 22], [30, 28]].map(([x, y]) => [zx + x + (rnd() - 0.5) * 6, cy + y + (rnd() - 0.5) * 6]);
    const L = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [6, 7], [5, 8], [7, 8]];
    s += zoom(cy, L.map(([a, b]) => lk(p[a], p[b])).join('') + p.map((q) => si(...q)).join(''));
    s += `<text class="key" x="${ix}" y="${cy + 62}" text-anchor="middle">glass</text>`;
    s += `<text class="small" x="${zx}" y="${cy + zr + 18}" text-anchor="middle">9 silicon</text>`;
    s += sameSun(352, cy - 6);
  }
  // 3. solar panel: one neat grid; catches the same sun and makes power
  {
    const cy = rows[2];
    const px = ix - 46, py = cy - 36, pw = 92, ph = 62;
    s += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="2" fill="#1d3766" stroke="${C.sec}" stroke-width="2"/>`;
    for (let i = 1; i < 4; i++) s += `<line x1="${px + (pw * i) / 4}" y1="${py}" x2="${px + (pw * i) / 4}" y2="${py + ph}" stroke="#6f8fc8" stroke-width="1"/>`;
    for (let i = 1; i < 3; i++) s += `<line x1="${px}" y1="${py + (ph * i) / 3}" x2="${px + pw}" y2="${py + (ph * i) / 3}" stroke="#6f8fc8" stroke-width="1"/>`;
    s += `<line x1="${ix}" y1="${py + ph}" x2="${ix}" y2="${py + ph + 14}" stroke="${C.sec}" stroke-width="2.5"/>`;
    s += `<path d="M${px + pw + 14},${cy - 20} l-8,16 h8 l-8,16" stroke="${C.sun}" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    const g = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) g.push([zx - 26 + c * 26, cy - 26 + r * 26]);
    let L = ''; for (let i = 0; i < 9; i++) { if (i % 3 < 2) L += lk(g[i], g[i + 1]); if (i < 6) L += lk(g[i], g[i + 3]); }
    s += zoom(cy, L + g.map((q) => si(...q)).join(''));
    s += `<text class="key" x="${ix}" y="${cy + 54}" text-anchor="middle">solar panel</text>`;
    s += `<text class="small" x="${zx}" y="${cy + zr + 18}" text-anchor="middle">9 silicon</text>`;
    s += sameSun(352, cy - 6);
  }
  // magnifier ties and steps
  for (const cy of rows) s += `<line x1="${ix + 52}" y1="${cy - 4}" x2="${zx - zr}" y2="${cy - 4}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="2 4"/>`;
  s += spark(ix, rows[0] - 88) + spark(ix, rows[1] - 92);
  s += equation(680) + rule(800);
  return s + '</svg>\n';
}

writeFileSync(join(OUT, 'option-A.svg'), optionA());
writeFileSync(join(OUT, 'option-B.svg'), optionB());
writeFileSync(join(OUT, 'option-C.svg'), optionC());
console.log('wrote A, B, C');
