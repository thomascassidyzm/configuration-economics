// Sheet 1, the coil: how things get better without using more stuff.
// Argued in src/content/open/NOTES-circular-to-helical.md.
import { B, T, soft, gold, d, lead, dim, sun, titleBlock, sheet } from './kit.mjs';

// the coil: 3.25 turns, widening as it climbs, ending on its left edge where the pen is already going up
const C = { cx: 330, y0: 740, turns: 3.25, R0: 118, R1: 168, sq: 0.36, rise: 105 };
const A1 = Math.PI, A0 = A1 - C.turns * 2 * Math.PI;
const cpt = (a) => { const t = (a - A0) / (A1 - A0), R = C.R0 + (C.R1 - C.R0) * t; return [C.cx + R * Math.cos(a), C.y0 + R * C.sq * Math.sin(a) - C.rise * (a - A0) / (2 * Math.PI)]; };
function coil() {
  const n = 400, segs = []; let cur = null;
  for (let i = 0; i <= n; i++) { const a = A0 + (A1 - A0) * i / n, front = Math.sin(a) > 0; if (!cur || cur.front !== front) { const p = cur ? cur.p[cur.p.length - 1] : null; cur = { front, p: p ? [p] : [] }; segs.push(cur); } cur.p.push(cpt(a)); }
  const [ex, ey] = cpt(A1);
  const arrow = `<path d="M${ex} ${ey} C${ex - 2} ${ey - 50} ${ex + 4} ${ey - 90} ${ex + 12} ${ey - 135}"/><path d="M${ex - 8} ${ey - 108} L${ex + 12} ${ey - 137} L${ex + 27} ${ey - 104}"/>`;
  return segs.filter((s) => !s.front).map((s) => `<path d="${d(s.p)}"/>`).join('') +
    segs.filter((s) => s.front).map((s) => `<path d="${d(s.p.slice(2, -2))}" stroke="${B.paper}" stroke-width="${B.sw * 4.5}" stroke-linecap="butt"/><path d="${d(s.p)}"/>`).join('') + arrow;
}
const rightEdges = () => [0.75, 1.75, 2.75].map((t) => { const [x, y] = cpt(A0 + t * 2 * Math.PI); return [x + 22, y]; });
const front = (t) => cpt(A0 + t * 2 * Math.PI);
const SUN = [672, 520];
const tb = titleBlock(1, 'the coil');

export default sheet({
  title: 'Blueprint sheet 1, the coil: how things get better without using more stuff',
  strokes: coil() + sun(...SUN, rightEdges()) +
    dim(300, front(1)[1] + 6, front(0)[1] - 8) +
    lead([[556, 262], [470, 262], [196, 292]]) + lead([[640, 428], [652, 452], [660, 470]]) +
    lead([[520, 784], [470, 784], [338, 780]]) +
    lead([[150, 836], [240, 800], [296, 742]]) +
    `<path d="M420 868H736V1064H420Z" stroke-width="2.4"/>` +
    `<path d="M62 1066L150 1030M132 1026L152 1029L142 1046" stroke-width="3"/><ellipse cx="108" cy="1150" rx="46" ry="22" stroke-width="3"/>` + tb.strokes,
  text: T(50, 78, 'HOW THINGS GET BETTER', 40) + T(50, 112, 'without using more stuff', 25, soft) +
    T(556, 256, 'UP = more things', 22) + T(556, 284, 'you can do next', 22) +
    T(536, 362, 'THE SUN', 25, gold) + T(536, 390, 'turns up every day.', 20, gold) + T(536, 416, 'nothing else is added.', 20, gold) +
    T(528, 694, 'EACH TURN IS WIDER', 21) + T(528, 720, 'one better way makes', 19) + T(528, 743, 'the next easier to find', 19) +
    T(528, 792, 'THE SAME STUFF', 21) + T(528, 818, 'going round again', 19) + T(528, 841, '(nothing new dug up)', 18, soft) +
    T(50, 862, 'THE LIFT', 24) + T(50, 892, 'each time round, the stuff is', 20) + T(50, 917, 'put together a bit better.', 20) + T(50, 946, 'the sun can’t do this part.', 20, soft) + T(50, 971, 'someone has to work it out.', 20, soft) +
    T(440, 904, 'THE RULE FOR EVERY TURN', 21) + T(440, 946, 'better for someone.', 25) + T(440, 978, 'worse for no one.', 25) + T(440, 1018, 'that’s the aim.', 18, soft) + T(440, 1042, 'it can be hard to find.', 18, soft) +
    T(50, 1016, 'THE OTHER TWO WAYS', 19, soft) + T(172, 1050, 'USE IT UP', 20) + T(172, 1074, 'goes up, runs out', 18, soft) + T(172, 1148, 'ROUND AND ROUND', 20) + T(172, 1172, 'lasts, gets no higher', 18, soft) +
    tb.text,
});
