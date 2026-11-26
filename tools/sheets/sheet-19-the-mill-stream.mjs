// Sheet 19, the mill stream: let the money go round, and turn the town's own wheels before it leaves.
// Community wealth building, after Neil McInroy and CLES (the Preston model) and the Democracy Collaborative:
// the big local buyers (hospital, council, college: "anchors", "sticky capital") spend through firms in the place,
// so the same money turns one local wheel after another, and the wheels are owned by many, so what they earn stays too.
// Sources: CLES, "Community wealth building: a history" (the five pillars); McInroy, "Community wealth building:
// reorganising an economy for all" (Stir to Action); CLES and Preston City Council, "How we built community wealth
// in Preston" (2019): anchor spend retained in Preston 5% in 2012/13, 18.2% in 2016/17.
// Not argued in CE; drawn as a neighbour. Not on any page yet.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(19, 'the mill stream');
// a smooth line through points (Catmull-Rom), sampled
function smooth(P, n = 14) {
  const out = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(P[P.length - 1]);
  return out;
}
const banks = (C, hw) => {
  const nrm = (i) => { const a = C[Math.max(0, i - 1)], b = C[Math.min(C.length - 1, i + 1)], L = Math.hypot(b[0] - a[0], b[1] - a[1]); return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L]; };
  const side = (s) => C.map((p, i) => { const q = nrm(i); return [p[0] + q[0] * hw * s, p[1] + q[1] * hw * s]; });
  return [side(1), side(-1)];
};
// little ripples along the middle of a stream
const ripples = (C, every = 9) => { let o = ''; for (let i = 3; i < C.length - 3; i += every) { const [x, y] = C[i]; o += `<path d="M${x - 9} ${y}q4.5 -5 9 0t9 0" stroke-width="2"/>`; } return o; };
const arrowHead = ([x, y], [px, py]) => { const a = Math.atan2(y - py, x - px), q = (da) => `${x - Math.cos(a + da) * 18} ${y - Math.sin(a + da) * 18}`; return `<path d="M${q(0.5)} L${x} ${y} L${q(-0.5)}"/>`; };

// the stream: out of the big buyers' building to the fork; one way straight out of town, one way past the wheels
const HW = 15;
const FORK = [372, 418];
const main = smooth([[246, 392], [300, 402], FORK]);
const outA = smooth([FORK, [470, 392], [600, 386], [722, 386]]);
const wayB = smooth([FORK, [408, 480], [370, 552], [250, 566], [130, 570], [84, 636], [110, 708], [200, 746], [380, 750], [560, 746], [700, 728]]);
const stream = (C, o = '') => { const [l, r] = banks(C, HW); return `<path d="${d(l)}"${o}/><path d="${d(r)}"${o}/>`; };

// the big buyers: one wide public building, columns and steps, with a spout into the stream
const buyers =
  `<path d="M60 384V300H232V384"/><path d="M48 300L146 252L244 300Z"/><path d="M52 384H240M44 396H248"/>` +
  [86, 122, 158, 194].map((x) => `<path d="M${x} 314V374M${x + 18} 314V374" stroke-width="2.4"/>`).join('') +
  `<path d="M232 384H252V400H232" stroke-width="2.6"/>` +
  `<circle cx="146" cy="280" r="9" stroke-width="2.2"/>`;

// a water wheel, rim, hub, spokes and paddles
function wheel(cx, cy, r = 44, col = B.ink) {
  let o = `<circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="7"/>`;
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.2; o += `<path d="M${cx + Math.cos(a) * 7} ${cy + Math.sin(a) * 7}L${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}" stroke-width="2.2"/>`; }
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.1; o += `<path d="M${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}L${cx + Math.cos(a) * (r + 13)} ${cy + Math.sin(a) * (r + 13)}" stroke-width="2.6"/>`; }
  return `<g stroke="${col}">${o}</g>`;
}
// a small mill house beside a wheel; door, window, pitched roof
const hut = (x, y, w = 92, h = 66) =>
  `<path d="M${x} ${y + h}V${y}H${x + w}V${y + h}"/><path d="M${x - 8} ${y + 4}L${x + w / 2} ${y - 34}L${x + w + 8} ${y + 4}"/>` +
  `<path d="M${x + 14} ${y + h}V${y + 30}H${x + 34}V${y + h}" stroke-width="2.4"/><path d="M${x + 52} ${y + 16}H${x + 76}V${y + 38}H${x + 52}Z" stroke-width="2.2"/>`;
const person = (x, y, s = 1) => `<circle cx="${x}" cy="${y - 40 * s}" r="${7.5 * s}"/><path d="M${x} ${y - 32 * s}V${y - 14 * s}M${x - 9 * s} ${y}L${x} ${y - 14 * s}L${x + 9 * s} ${y}M${x - 10 * s} ${y - 20 * s}L${x} ${y - 27 * s}L${x + 11 * s} ${y - 21 * s}" stroke-width="2.6"/>`;

// three wheels on the town's way: one on the upper run, two on the lower run
const W1 = [248, 508], W2 = [300, 688], W3 = [520, 688];
const mills =
  hut(146, 470, 66, 52) + wheel(W1[0], W1[1], 38, B.sun) +
  hut(190, 640, 76, 56) + wheel(W2[0], W2[1], 40, B.sun) +
  hut(380, 622, 74, 54) + wheel(W3[0], W3[1], 40, B.sun) +
  person(598, 716, 0.66) + person(622, 716, 0.66) + person(646, 716, 0.66) + person(670, 716, 0.66);

const strokes =
  buyers + stream(main) + `<g stroke="${B.soft}">${stream(outA, ' stroke-width="2.8"')}${ripples(outA)}${arrowHead([738, 392], [716, 392])}</g>` +
  `<g stroke="${B.sun}">${stream(wayB)}${ripples(wayB, 11)}${arrowHead([724, 716], [700, 724])}</g>` + `<g stroke="${B.soft}">${ripples(main, 8)}</g>` +
  mills +
  lead([[100, 232], [96, 256], [112, 284]]) + // the big buyers
  lead([[560, 470], [470, 470], [FORK[0] + 6, FORK[1] + 4]]) + // the fork
  lead([[600, 264], [640, 324], [650, 386]]) + // straight out
  lead([[600, 624], [560, 640], [W3[0] + 14, W3[1] - 26]]) + // the town's own wheels
  lead([[700, 826], [704, 770], [648, 696]]) + // owned by many
  `<path d="M50 920H376V1090H50Z" stroke-width="2"/><path d="M404 920H730V1090H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 19, the mill stream: let the money go round, and turn the town’s own wheels before it leaves (after Neil McInroy and community wealth building)',
  seed: 9,
  strokes,
  text: T(50, 78, 'LET THE MONEY GO ROUND', 40) + T(50, 112, 'turn the town’s own wheels before it leaves', 25, soft) +
    T(50, 172, 'THE BIG BUYERS', 22) + T(50, 200, 'hospital, council, college.', 19) + T(50, 224, 'they spend every year, and stay put.', 19) +
    T(470, 196, 'STRAIGHT OUT', 22) + T(470, 224, 'bought from far away.', 19) + T(470, 248, 'turns no wheel here.', 19) +
    T(566, 466, 'THE FORK', 22) + T(566, 494, 'who do they', 19) + T(566, 518, 'buy from?', 19) +
    T(452, 550, 'THE TOWN’S OWN WHEELS', 22, gold) + T(452, 576, 'the same pound turns one,', 19, gold) + T(452, 600, 'then the next.', 19, gold) +
    T(470, 794, 'it leaves in the end, too.', 17, soft) +
    T(400, 852, 'OWNED BY MANY', 22) + T(400, 878, 'the people who work it, or the town.', 18) +
    T(50, 852, 'the old saying: the mill cannot', 17, soft) + T(50, 874, 'grind with the water that is past.', 17, soft) +
    T(68, 956, 'SPEND IT HERE', 21) + T(68, 988, 'big buyers buy from', 18) + T(68, 1014, 'firms in the place', 18) + T(68, 1040, 'wherever they can.', 18) + T(68, 1072, 'long word: procurement', 15, soft) +
    T(422, 956, 'OWN IT HERE', 21) + T(422, 988, 'when more people own', 18) + T(422, 1014, 'the wheels, what they earn', 18) + T(422, 1040, 'stays in the place too.', 18) + T(422, 1072, 'long word: plural ownership', 15, soft) +
    T(50, 1124, 'Preston, 2013 to 2017: of each £1', 16, soft) + T(50, 1146, 'its big buyers spent, the part spent', 16, soft) + T(50, 1168, 'in Preston went from 5p to 18p.', 16, soft) +
    T(50, 1192, 'after Neil McInroy, CLES; Democracy Collaborative', 14, soft) +
    tb.text,
});
