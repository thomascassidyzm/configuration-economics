// Sheet 6, the stump: broken fast, built slow, so a seedling does not pay for the tree.
// A hundred years in the rings, one afternoon to cut, and the new one only a maybe.
// Argued in src/content/propositions.ts: asymmetry-of-option-space-change (and time-asymmetry).
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(6, 'the stump');
const ground = 880, S = { cx: 300, top: 800, rx: 80, ry: 22 };
const ell = (cx, cy, rx, ry, o = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${o}/>`;

// the stump: a short drum with its rings on top, and a little flare of root at the foot
function stump() {
  const { cx, top, rx, ry } = S, L = cx - rx, R = cx + rx;
  const rings = [0.78, 0.58, 0.4, 0.22].map((k) => ell(cx + 4 * (1 - k), top + 1, rx * k, ry * k)).join('');
  return `<path d="M${L} ${top}V${ground - 10}Q${L - 6} ${ground} ${L - 24} ${ground}M${R} ${top}V${ground - 10}Q${R + 6} ${ground} ${R + 26} ${ground}"/>` +
    `<path d="M${cx - 30} ${ground}q8 -14 20 -2M${cx + 22} ${ground}q8 -10 18 0" stroke-width="2.4"/>` +
    ell(cx, top, rx, ry) + `<g stroke="${B.sun}" stroke-width="2.2">${rings}<circle cx="${cx + 4}" cy="${top + 1}" r="2.5"/></g>`;
}
// the axe, left standing in the stump
function axe() {
  const [bx, by] = [S.cx + 36, S.top + 4], u = [0.72, -0.69], n = [0.69, 0.72];
  const at = (a, b) => [bx + u[0] * a + n[0] * b, by + u[1] * a + n[1] * b];
  const head = [at(14, -26), at(30, -26), at(36, 10), at(8, 12)];
  return `<path d="${d([at(22, -18), at(170, -18)])}"/>` +
    `<path d="${d(head)}Z" fill="${B.paper}" stroke-width="3"/><path d="${d([at(12, 4), at(34, 3)])}" stroke-width="2"/>`;
}
// where the tree was: a dashed trunk and crown standing over the stump
function ghost() {
  const { cx, top, rx } = S, cy = 370, a = 205, b = 175, n = 15, p = [];
  for (let i = 0; i <= 240; i++) {
    const t = i / 240 * Math.PI * 2, bump = 1 + 0.07 * Math.abs(Math.sin(t * n / 2));
    p.push([cx + a * bump * Math.cos(t), cy + b * bump * Math.sin(t)]);
  }
  const dash = `stroke="${B.soft}" stroke-dasharray="12 10" stroke-width="2.6"`;
  return `<path d="${d(p)}Z" ${dash}/>` +
    `<path d="M${cx - rx + 4} ${top - 6}L${cx - 58} 530M${cx + rx - 4} ${top - 6}L${cx + 58} 530" ${dash}/>` +
    `<path d="M${cx - 30} 520L${cx - 110} 420M${cx + 30} 520L${cx + 120} 400M${cx} 520L${cx + 6} 300" ${dash}/>`;
}
// the new one: a seedling with two leaves and a stake
const SEED = [610, ground];
function seedling() {
  const [x, y] = SEED;
  return `<path d="M${x} ${y}V${y - 46}"/><path d="M${x} ${y - 34}q-26 -4 -30 -22q22 -2 30 22M${x} ${y - 46}q22 -10 30 -26q-26 0 -30 26" stroke-width="2.6"/>` +
    `<path d="M${x + 22} ${y}V${y - 70}" stroke="${B.soft}" stroke-width="2.4"/>`;
}

const strokes =
  `<path d="M50 ${ground}H730"/>` + [90, 150, 470, 520, 690].map((x) => `<path d="M${x} ${ground}l-5 -12M${x + 8} ${ground}l3 -14" stroke-width="2" stroke="${B.soft}"/>`).join('') +
  ghost() + stump() + axe() + seedling() +
  lead([[560, 246], [530, 260], [508, 300]]) +
  lead([[180, 688], [240, 730], [282, 800]]) +
  lead([[556, 624], [496, 684], [404, 715]]) +
  lead([[590, 818], [600, 830], [608, 848]]) +
  `<path d="M50 940H376V1076H50Z" stroke-width="2"/><path d="M404 940H730V1076H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 6, the stump: broken fast, built slow, so a seedling does not pay for the tree',
  seed: 6,
  strokes,
  text: T(50, 78, 'BROKEN FAST, BUILT SLOW', 40) + T(50, 112, 'so a seedling does not pay for the tree', 25, soft) +
    T(560, 216, 'WHERE IT STOOD', 21) + T(560, 244, 'shade, nests, roots', 19) + T(560, 268, 'holding the hill.', 19) +
    T(50, 610, 'THE RINGS', 24, gold) + T(50, 638, 'one for every year.', 19, gold) + T(50, 662, 'a hundred years,', 19, gold) + T(50, 686, 'kept in the wood.', 19, gold) +
    T(560, 588, 'THE CUT', 22) + T(560, 616, 'one afternoon.', 19) + T(560, 650, 'maybe for a good', 17, soft) + T(560, 672, 'reason: this sheet is', 17, soft) + T(560, 694, 'about the clock,', 17, soft) + T(560, 716, 'not the cutter.', 17, soft) +
    T(560, 752, 'THE NEW ONE', 22) + T(560, 778, 'planted to make up', 18) + T(560, 800, 'for it. may not take.', 18) +
    T(50, 920, 'TWO CLOCKS', 19, soft) +
    T(68, 976, 'TO BREAK', 21) + T(68, 1008, 'an afternoon.', 19) + T(68, 1036, 'for sure.', 19) +
    T(422, 976, 'TO BUILD AGAIN', 21) + T(422, 1008, 'a hundred years.', 19) + T(422, 1036, 'if it takes.', 19) +
    T(50, 1138, 'a sure loss now is not', 21) + T(50, 1166, 'paid back by a maybe, later.', 21) +
    tb.text,
});
