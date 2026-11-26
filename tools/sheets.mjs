// Blueprint sheets: one idea, one sheet, plain words on the drawing.
// Writes public/sheets/*.svg (hand-lettering font embedded, so each file stands alone).
// Run: node tools/sheets.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = `@font-face{font-family:Arch;src:url(data:font/ttf;base64,${readFileSync(join(ROOT, 'tools/sheets-fonts/ArchitectsDaughter-Regular.ttf')).toString('base64')})}`;
const W = 780;
let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const d = (p) => 'M' + p.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');

const THEMES = {
  napkin: { bg: '#3a2f28', paper: '#f7f3ea', ink: '#22409a', sun: '#22409a', soft: '#22409a', font: 'Hand', sw: 4 },
  blue: { bg: '#163d73', paper: '#1c4b8a', ink: '#f2f6ff', sun: '#ffd97a', soft: '#a9c6f2', font: 'Arch', sw: 3.4 },
};

// the coil: 3.25 turns, widening as it climbs, ending on its left edge where the pen is already going up
const C = { cx: 330, y0: 740, turns: 3.25, R0: 118, R1: 168, sq: 0.36, rise: 105 };
const A1 = Math.PI, A0 = A1 - C.turns * 2 * Math.PI;
const cpt = (a) => { const t = (a - A0) / (A1 - A0), R = C.R0 + (C.R1 - C.R0) * t; return [C.cx + R * Math.cos(a), C.y0 + R * C.sq * Math.sin(a) - C.rise * (a - A0) / (2 * Math.PI)]; };
function coil(T) {
  const n = 400, segs = []; let cur = null;
  for (let i = 0; i <= n; i++) { const a = A0 + (A1 - A0) * i / n, front = Math.sin(a) > 0; if (!cur || cur.front !== front) { const p = cur ? cur.p[cur.p.length - 1] : null; cur = { front, p: p ? [p] : [] }; segs.push(cur); } cur.p.push(cpt(a)); }
  const [ex, ey] = cpt(A1);
  const arrow = `<path d="M${ex} ${ey} C${ex - 2} ${ey - 50} ${ex + 4} ${ey - 90} ${ex + 12} ${ey - 135}"/><path d="M${ex - 8} ${ey - 108} L${ex + 12} ${ey - 137} L${ex + 27} ${ey - 104}"/>`;
  return segs.filter((s) => !s.front).map((s) => `<path d="${d(s.p)}"/>`).join('') +
    segs.filter((s) => s.front).map((s) => `<path d="${d(s.p.slice(2, -2))}" stroke="${T.paper}" stroke-width="${T.sw * 4.5}" stroke-linecap="butt"/><path d="${d(s.p)}"/>`).join('') + arrow;
}
// the sun, off to the side, with one ray landing on each turn
function sun(T, sx, sy, targets) {
  let o = `<circle cx="${sx}" cy="${sy}" r="34"/>`;
  for (let i = 0; i < 11; i++) { const a = i / 11 * Math.PI * 2 + 0.3; if (Math.cos(a) < -0.45) continue; o += `<line x1="${sx + Math.cos(a) * 46}" y1="${sy + Math.sin(a) * 46}" x2="${sx + Math.cos(a) * 62}" y2="${sy + Math.sin(a) * 62}"/>`; }
  for (const [tx, ty] of targets) {
    const a = Math.atan2(ty - sy, tx - sx), x1 = sx + Math.cos(a) * 52, y1 = sy + Math.sin(a) * 52, L = Math.hypot(tx - x1, ty - y1), nx = -Math.sin(a), ny = Math.cos(a);
    const p = []; for (let i = 0; i <= 40; i++) { const u = i / 40, w = Math.sin(u * Math.PI * 5) * 7 * (1 - u * 0.6); p.push([x1 + Math.cos(a) * L * u + nx * w, y1 + Math.sin(a) * L * u + ny * w]); }
    const q = (da) => `${tx - Math.cos(a + da) * 20} ${ty - Math.sin(a + da) * 20}`;
    o += `<path d="${d(p)}"/><path d="M${q(0.5)} L${tx} ${ty} L${q(-0.5)}"/>`;
  }
  return `<g stroke="${T.sun}">${o}</g>`;
}
const rightEdges = () => [0.75, 1.75, 2.75].map((t) => { const [x, y] = cpt(A0 + t * 2 * Math.PI); return [x + 22, y]; });

// the close-up: a lot of wandering that ends a little higher than it began
function wander(cx, cy, r) {
  seed = 23; const pts = [[cx - r * 0.78, cy + r * 0.28]]; let [x, y] = pts[0], a = -0.4;
  for (let i = 0; i < 46; i++) { a += (rnd() - 0.5) * 2.6; const s = 13 + rnd() * 9; x += Math.cos(a) * s + 3.1; y += Math.sin(a) * s - 1.15; const dx = x - cx, dy = y - cy, h = Math.hypot(dx, dy); if (h > r * 0.8) { x = cx + dx / h * r * 0.8; y = cy + dy / h * r * 0.8; a += Math.PI * 0.7; } pts.push([x, y]); }
  const end = [cx + r * 0.76, cy - r * 0.2]; pts.push([end[0] - 14, end[1] + 8], end);
  let o = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]; o += ` C${(p1[0] + (p2[0] - p0[0]) / 5).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 5).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 5).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 5).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`; }
  return { path: o, start: pts[0], end };
}
function loupe(T, big) {
  const [sx, sy] = cpt(A0 + 0.55), sr = 24, { cx, cy, r } = big, w = wander(cx, cy, r);
  const a = Math.atan2(cy - sy, cx - sx), n = [-Math.sin(a), Math.cos(a)];
  const tie = (s) => `<line x1="${sx + n[0] * sr * s}" y1="${sy + n[1] * sr * s}" x2="${cx + n[0] * r * s}" y2="${cy + n[1] * r * s}" stroke-width="${T.sw * 0.55}" stroke="${T.soft}"/>`;
  return `<circle cx="${sx}" cy="${sy}" r="${sr}"/>${tie(1)}${tie(-1)}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${T.paper}"/>
  <path d="${w.path}" stroke-width="${T.sw * 0.75}"/>
  <path d="M${w.start[0]} ${w.start[1]} L${w.end[0]} ${w.end[1]}" stroke-dasharray="3 11" stroke-width="${T.sw * 0.7}" stroke="${T.soft}"/>
  <circle cx="${w.start[0]}" cy="${w.start[1]}" r="5" fill="${T.ink}"/><circle cx="${w.end[0]}" cy="${w.end[1]}" r="5" fill="${T.ink}"/>`;
}
const txt = (T, x, y, s, size = 34, o = {}) => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${o.anchor || 'start'}" fill="${o.fill || T.ink}"${o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : ''}>${s}</text>`;
const lead = (T, pts) => `<path d="${d(pts)}" stroke="${T.soft}" stroke-width="${T.sw * 0.5}"/><circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="4" fill="${T.soft}" stroke="none"/>`;

function sheet(T, H, strokes, text, seedN = 4, dy = 0, title = '') {
  const napkin = T === THEMES.napkin;
  const ground = napkin
    ? `<rect width="${W}" height="${H}" fill="${T.bg}"/><g transform="rotate(-1.2 390 ${H / 2})"><rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="${T.paper}"/><rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="url(#emb)"/><rect x="62" y="62" width="${W - 124}" height="${H - 124}" fill="${T.paper}"/><rect x="26" y="26" width="${W - 52}" height="${H - 52}" filter="url(#paper)"/>`
    : `<rect width="${W}" height="${H}" fill="${T.paper}"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect width="${W}" height="${H}" filter="url(#paper)"/><g><rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="${T.ink}" stroke-width="2.5" filter="url(#wob)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"><title>${title}</title><defs><style>${FONTS}</style>
 <filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="2" seed="${seedN}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="8"/></filter>
 <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2"/><feColorMatrix values="${napkin ? '0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.09 0' : '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0'}"/></filter>
 <pattern id="emb" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1.6" fill="#e2dbcb"/></pattern>
 <pattern id="grid" width="39" height="39" patternUnits="userSpaceOnUse"><path d="M39 0H0V39" fill="none" stroke="#ffffff" stroke-opacity="0.09" stroke-width="1"/></pattern></defs>
 ${ground}
 <g filter="url(#wob)" stroke="${T.ink}" stroke-width="${T.sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(0 ${dy})">${strokes}</g></g>
 <g font-family="${T.font}" fill="${T.ink}" transform="translate(0 ${dy})">${text}</g></g></svg>`;
}


const B = THEMES.blue;
const SUN = [672, 520];
const T = (x, y, str, size = 21, o = {}) => txt(B, x, y, str, size, o);
const soft = { fill: B.soft }, gold = { fill: B.sun };
const block = (title) => `<path d="M420 1108H736V1196H420Z" stroke-width="2"/><path d="M420 1156H736" stroke-width="2"/>`;
const blockT = (sheetName) => T(436, 1142, 'CONFIGURATION ECONOMICS') + T(436, 1184, sheetName, 18, soft) + T(622, 1184, 'not to scale', 17, soft);
// dimension mark, blueprint style: a short line with a tick at each end
const dim = (x, y1, y2) => `<path d="M${x} ${y1}V${y2}M${x - 9} ${y1}H${x + 9}M${x - 9} ${y2}H${x + 9}" stroke="${B.soft}" stroke-width="2"/>`;
const front = (t) => cpt(A0 + t * 2 * Math.PI);
const pages = {
  'sheet-1-the-coil': sheet(B, 1240, coil(B) + sun(B, ...SUN, rightEdges()) +
    dim(300, front(1)[1] + 6, front(0)[1] - 8) +
    lead(B, [[556, 262], [470, 262], [196, 292]]) + lead(B, [[640, 428], [652, 452], [660, 470]]) +
    lead(B, [[520, 784], [470, 784], [338, 780]]) +
    lead(B, [[150, 836], [240, 800], [296, 742]]) +
    `<path d="M420 880H736V1076H420Z" stroke-width="2.4"/>` +
    `<path d="M62 1066L150 1030M132 1026L152 1029L142 1046" stroke-width="3"/><ellipse cx="108" cy="1150" rx="46" ry="22" stroke-width="3"/>` + block(),
    T(50, 78, 'HOW THINGS GET BETTER', 40) + T(50, 112, 'without using more stuff', 25, soft) +
    T(556, 256, 'UP = more things', 22) + T(556, 284, 'you can do next', 22) +
    T(536, 362, 'THE SUN', 25, gold) + T(536, 390, 'turns up every day.', 20, gold) + T(536, 416, 'nothing else is added.', 20, gold) +
    T(528, 694, 'EACH TURN IS WIDER', 21) + T(528, 720, 'one better way makes', 19) + T(528, 743, 'the next easier to find', 19) +
    T(528, 792, 'THE SAME STUFF', 21) + T(528, 818, 'going round again', 19) + T(528, 841, '(nothing new dug up)', 18, soft) +
    T(50, 862, 'THE LIFT', 24) + T(50, 892, 'each time round, the stuff is', 20) + T(50, 917, 'put together a bit better.', 20) + T(50, 946, 'the sun can’t do this part.', 20, soft) + T(50, 971, 'someone has to work it out.', 20, soft) +
    T(440, 916, 'THE RULE FOR EVERY TURN', 21) + T(440, 958, 'better for someone.', 25) + T(440, 990, 'worse for no one.', 25) + T(440, 1030, 'that’s the aim.', 18, soft) + T(440, 1054, 'it can be hard to find.', 18, soft) +
    T(50, 1016, 'THE OTHER TWO WAYS', 19, soft) + T(172, 1050, 'USE IT UP', 20) + T(172, 1074, 'goes up, runs out', 18, soft) + T(172, 1148, 'ROUND AND ROUND', 20) + T(172, 1172, 'lasts, gets no higher', 18, soft) +
    blockT('sheet 1 · the coil'), 4, 0, 'Blueprint sheet 1, the coil: how things get better without using more stuff'),
};
// sheet 2: the bus. winning a seat (symmetry) is not the same as the trip going on (continuity)
{
  const road = 530, edge = 520;
  const head = (x, y) => `<circle cx="${x}" cy="${y}" r="11"/><path d="M${x - 15} ${y + 30}Q${x} ${y + 6} ${x + 15} ${y + 30}"/>`;
  const win = (x) => `<path d="M${x} 452H${x + 52}V500H${x}Z" stroke-width="2.4"/>`;
  let sea = `M${edge + 6} 842`; for (let i = 0; i < 4; i++) sea += ` q14 -14 28 0 t28 0`;
  const strokes =
    `<path d="M40 ${road}H${edge}V830"/><path d="M${edge} 600l-16 22M${edge} 680l-20 26M${edge} 760l-14 20" stroke-width="2" stroke="${B.soft}"/>` +
    `<path d="${sea}" stroke="${B.soft}" stroke-width="2.4"/><path d="${sea.replace('842', '868')}" stroke="${B.soft}" stroke-width="2"/>` +
    `<path d="M${edge + 8} ${road}H742" stroke-dasharray="14 12" stroke="${B.sun}"/><path d="M${edge + 70} ${road}V574M${edge + 150} ${road}V574" stroke-dasharray="6 8" stroke="${B.sun}" stroke-width="2"/>` +
    `<g transform="translate(-50 -60)"><path d="M150 426Q150 414 164 414H432Q452 414 456 436L462 540Q462 552 450 552H164Q150 552 150 540Z"/>` +
    [176, 244, 312, 380].map(win).join('') + [202, 270, 338].map((x) => head(x, 474)).join('') + head(406, 474) +
    `<path d="M394 456l6 -12 6 8 6 -8 6 12" stroke="${B.sun}" stroke-width="2.4"/>` +
    `<circle cx="212" cy="558" r="26" fill="${B.paper}"/><circle cx="212" cy="558" r="8"/><circle cx="400" cy="558" r="26" fill="${B.paper}"/><circle cx="400" cy="558" r="8"/>` +
    `<path d="M476 480H530M514 468L532 480L514 492" stroke-width="3"/></g>` +
    lead(B, [[420, 262], [380, 310], [358, 384]]) + lead(B, [[110, 262], [130, 320], [150, 386]]) + lead(B, [[640, 478], [640, 500], [630, 524]]) +
    `<path d="M50 936H376V1076H50Z" stroke-width="2"/><path d="M404 936H730V1076H404Z" stroke-width="2"/>` + block();
  pages['sheet-2-the-bus'] = sheet(B, 1240, strokes,
    T(50, 78, 'A BETTER SEAT ON THE BUS', 40) + T(50, 112, 'is not the same as a longer trip', 25, soft) +
    T(360, 190, 'THE FRONT SEAT', 22, gold) + T(360, 218, 'best view, most room.', 20) + T(360, 242, 'looks like winning.', 20) +
    T(50, 190, 'THE BACK SEAT', 22) + T(50, 218, 'less of everything.', 20) + T(50, 242, 'same bus.', 20) +
    T(548, 640, 'THE EDGE', 22) + T(548, 668, 'every seat goes', 19) + T(548, 692, 'over together.', 19) + T(548, 724, 'hard to see from', 17, soft) + T(548, 746, 'inside: everyone is', 17, soft) + T(548, 768, 'looking at the seats.', 17, soft) +
    T(560, 440, 'MORE ROAD', 22, gold) + T(560, 466, 'what we’re for', 19, gold) +
    T(50, 620, 'THE USUAL FIGHT', 22) + T(50, 650, 'is about who sits where.', 20) + T(50, 696, 'THIS IS NOT THAT.', 22) + T(50, 726, 'nobody is asked to move back.', 20) + T(50, 752, 'the job is to make the road', 20) + T(50, 778, 'go on for longer, for every seat.', 20) +
    T(50, 916, 'TWO WAYS TO LOOK AT IT', 19, soft) +
    T(68, 972, 'WHO HAS THE BEST SEAT?', 21) + T(68, 1004, 'compares people, right now.', 18) + T(68, 1052, 'long word: symmetry', 17, soft) +
    T(422, 972, 'HOW FAR DOES IT GO?', 21) + T(422, 1004, 'for everyone, for how long.', 18) + T(422, 1052, 'long word: continuity', 17, soft) +
    blockT('sheet 2 · the bus'), 4, 0, 'Blueprint sheet 2, the bus: a better seat on the bus is not the same as a longer trip');
}
mkdirSync(join(ROOT, 'public/sheets'), { recursive: true });
for (const [k, svg] of Object.entries(pages)) { writeFileSync(join(ROOT, 'public/sheets', k + '.svg'), svg + '\n'); console.log('wrote public/sheets/' + k + '.svg'); }
