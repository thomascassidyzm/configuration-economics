// Sheet 9, the plank: a try is not a change.
// Pencil lines are tries (cheap, rubbed out); the saw cut is the change, and the rule is for the cut.
// Argued in src/content/open/NOTES-worse-for-none.md §2.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(9, 'the plank');
// the plank, seen a little from above: top face from the back edge (y BK) to the front edge (y FR), then its thickness
const BK = 545, FR = 620, TH = 34, SL = 44; // SL: how far the front edge sits left of the back edge
const L = 110, R = 690;
const plank =
  `<path d="M${L} ${BK}H${R}L${R - SL} ${FR}H${L - SL}Z"/>` + // top face
  `<path d="M${L - SL} ${FR}V${FR + TH}H${R - SL}V${FR}M${R - SL} ${FR + TH}L${R} ${BK + TH}V${BK}"/>`; // front face and end
// a pencil line across the top face, at back-edge x
const pl = (x, o = '') => `<path d="M${x} ${BK + 6}L${x - SL + 4} ${FR - 6}" stroke="${B.soft}" stroke-width="2"${o}/>`;
const cross = (x) => { const y = (BK + FR) / 2, cx = x - SL / 2; return `<path d="M${cx - 10} ${y - 10}L${cx + 10} ${y + 10}M${cx + 10} ${y - 10}L${cx - 10} ${y + 10}" stroke="${B.soft}" stroke-width="2"/>`; };
const rubbed = (x) => pl(x, ' stroke-dasharray="3 7" stroke-opacity="0.7"');
// two trestles under the plank
const trestle = (x) => `<path d="M${x - 46} ${FR + TH}H${x + 46}M${x - 34} ${FR + TH}L${x - 56} 800M${x + 34} ${FR + TH}L${x + 56} 800M${x - 48} 740H${x + 48}"/>`;
// the saw: toe resting in the cut, heel and handle up to the right
const CUT = 400, toe = [CUT - SL / 2 + 2, (BK + FR) / 2 + 4];
const u = [0.62, -0.785], n = [-0.785, -0.62]; // along the blade, and across it (towards the back)
const at = (s, w) => [toe[0] + u[0] * s + n[0] * w, toe[1] + u[1] * s + n[1] * w];
function saw() {
  const len = 250, teeth = []; for (let i = 0; i <= 26; i++) { const s = len * i / 26; teeth.push(at(s, i % 2 ? -5 : 0)); }
  const blade = `<path d="${d([at(0, 0), ...teeth.slice(1), at(len, 0), at(len, 78), at(0, 26)])}Z" fill="${B.paper}"/>`;
  const h = (s, w) => at(len + s, w);
  const handle = `<path d="${d([h(0, -4), h(58, -4), h(70, 10), h(70, 82), h(52, 96), h(0, 92)])}" />` +
    `<path d="${d([h(18, 22), h(48, 22), h(50, 66), h(18, 70)])}Z" stroke-width="2.6"/>`;
  return blade + handle;
}
// the pencil, lying on the front-left of the plank; the rubber, front-right
const pencil = `<path d="M150 ${FR - 14}L300 ${FR - 26}L312 ${FR - 18}L300 ${FR - 10}L150 ${FR + 2}Z" fill="${B.paper}"/><path d="M300 ${FR - 26}L300 ${FR - 10}"/>`;
const rubber = `<path d="M556 ${FR - 34}L608 ${FR - 40}L612 ${FR - 18}L560 ${FR - 12}Z" fill="${B.paper}"/><path d="M548 ${FR - 6}h3M622 ${FR - 26}h3M540 ${FR - 20}h2" stroke="${B.soft}"/>`;

const strokes =
  trestle(210) + trestle(570) + plank +
  [180, 214, 246, 282, 320].map((x) => pl(x)).join('') + cross(214) + cross(282) +
  [470, 496, 524].map(rubbed).join('') +
  `<path d="M${CUT} ${BK}L${CUT - SL} ${FR}V${FR + TH}" stroke="${B.sun}" stroke-width="${B.sw * 1.2}"/>` +
  pencil + rubber + saw() +
  lead([[110, 252], [140, 330], [222, (BK + FR) / 2 - 8]]) + // pencil lines
  lead([[640, 516], [600, 548], [492, (BK + FR) / 2 + 6]]) + // rubbed out
  lead([[330, 722], [344, 700], [CUT - SL + 2, FR + TH / 2 + 2]]) + // the cut
  lead([[430, 258], [424, 340], at(90, 36)]) + // the saw
  `<path d="M50 920H376V1090H50Z" stroke-width="2"/><path d="M404 920H730V1090H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 9, the plank: a try is not a change',
  seed: 5,
  strokes,
  text: T(50, 78, 'A TRY IS NOT A CHANGE', 40) + T(50, 112, 'draw lots of lines. the rule is for the cut.', 25, soft) +
    T(50, 190, 'PENCIL LINES', 22) + T(50, 218, 'each one is a try.', 20) + T(50, 242, 'draw as many as you like.', 20) +
    T(440, 190, 'THE SAW', 22) + T(440, 218, 'once it cuts, the wood', 20) + T(440, 242, 'is changed for good.', 20) +
    T(600, 410, 'RUBBED OUT', 22) + T(600, 438, 'a wrong try', 19) + T(600, 462, 'costs almost', 19) + T(600, 486, 'nothing.', 19) +
    T(300, 748, 'THE CUT', 24, gold) + T(300, 776, 'the real change.', 20, gold) + T(300, 802, 'no rubbing it out.', 20, gold) +
    T(50, 872, 'the old saying: measure twice, cut once.', 18, soft) +
    T(68, 956, 'A TRY', 21) + T(68, 988, 'on paper, in a model,', 18) + T(68, 1014, 'or a small test.', 18) + T(68, 1060, 'it can fail. the muddle goes here.', 17, soft) +
    T(422, 956, 'A CHANGE', 21) + T(422, 988, 'made for real, in the world.', 18) + T(422, 1016, 'the rule is for this one:', 16, soft) + T(422, 1046, 'better for someone.', 19) + T(422, 1072, 'worse for no one.', 19) +
    tb.text,
});
