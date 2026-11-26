// Sheet 10, the steps: your reach, not your lead.
// A stepladder by a bookcase: everyone can now reach the top shelf, nobody can reach less,
// and the gap between the tall one and the short one shrinks. That gap is a real thing to lose.
// Argued in src/content/open/NOTES-worse-for-none.md §4 and objection 5. An open point of debate.
import { B, T, soft, gold, lead, dim, box, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(10, 'the steps');
const FLOOR = 880, CL = 260, CR = 450, SHELVES = [300, 440, 580, 720];
// a person: head centre (x, y), head radius r, shoulder/hip heights, one hand raised to (hx, hy)
const person = (x, y, r, hip, hx, hy) => {
  const sh = y + r + 16;
  return `<circle cx="${x}" cy="${y}" r="${r}"/><path d="M${x} ${y + r}V${hip}M${x} ${hip}L${x - 20} ${FLOOR}M${x} ${hip}L${x + 20} ${FLOOR}"/>` +
    `<path d="M${x} ${sh}L${hx} ${hy}M${x} ${sh + 6}L${x + 26} ${sh + 92}"/>`;
};
// books on a shelf: [x, width, height] standing on the shelf at y
const books = (y, list) => list.map(([x, w, h]) => box(x, y - h, w, h, 2.4)).join('');
const bookcase =
  `<path d="M${CL} ${FLOOR}V${SHELVES[0]}H${CR}V${FLOOR}"/>` + SHELVES.slice(1).map((y) => `<path d="M${CL} ${y}H${CR}"/>`).join('') + `<path d="M${CL - 8} ${FLOOR}H${CR + 8}"/>` +
  books(440, [[272, 22, 70], [296, 18, 62], [320, 26, 74], [368, 20, 66], [392, 24, 72]]) +
  books(580, [[274, 24, 64], [302, 20, 58], [332, 28, 66], [370, 18, 60], [408, 26, 64]]) +
  books(720, [[272, 20, 74], [296, 28, 86], [328, 20, 70], [380, 24, 80], [408, 20, 72]]) +
  books(FLOOR, [[274, 30, 96], [308, 24, 88], [366, 28, 100], [400, 22, 86]]);
// the stepladder, standing to the left of the bookcase
const steps =
  `<path d="M52 ${FLOOR}L92 468M150 ${FLOOR}L114 468M84 466H122"/>` +
  [560, 660, 760].map((y) => { const t = (FLOOR - y) / (FLOOR - 468); return `<path d="M${52 + 40 * t} ${y}H${150 - 36 * t}" stroke-width="2.8"/>`; }).join('');
const TH = 500, SH = 652; // the hands: tall, short
const strokes =
  steps + bookcase +
  person(205, 560, 17, 730, CL, TH) + person(520, 724, 14, 808, CR + 4, SH) +
  `<path d="M${CL + 4} ${TH}H${CR + 26}" stroke="${B.soft}" stroke-width="2" stroke-dasharray="6 7"/>` +
  `<path d="M104 352H${CR - 4}" stroke="${B.sun}" stroke-width="3" stroke-dasharray="12 10"/>` +
  dim(CR + 34, TH, SH) +
  lead([[90, 260], [120, 300], [150, 352]]) + // the steps' reach
  lead([[548, 590], [520, 590], [CR + 36, (TH + SH) / 2]]) + // the lead
  lead([[580, 262], [560, 400], [CR + 26, TH]]) + // tall's reach
  lead([[580, 780], [550, 760], [528, 734]]) + // short
  `<path d="M50 920H376V1090H50Z" stroke-width="2"/><path d="M404 920H730V1090H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 10, the steps: your reach, not your lead',
  seed: 6,
  strokes,
  text: T(50, 78, 'YOUR REACH, NOT YOUR LEAD', 40) + T(50, 112, 'what this keeps safe, and what it doesn’t', 25, soft) +
    T(50, 190, 'WITH THE STEPS', 22, gold) + T(50, 218, 'anyone can reach', 20, gold) + T(50, 242, 'the top shelf.', 20, gold) +
    T(470, 190, 'TALL', 22) + T(470, 218, 'could reach this high.', 20) + T(470, 242, 'still can.', 20, soft) +
    T(556, 566, 'THE LEAD', 22) + T(556, 594, 'how much higher', 18) + T(556, 616, 'tall can reach.', 18) + T(556, 646, 'with the steps,', 18, soft) + T(556, 668, 'it gets smaller.', 18, soft) +
    T(590, 790, 'SHORT', 22) + T(590, 818, 'could reach', 18) + T(590, 840, 'this high.', 18) + T(590, 866, 'still can.', 18, soft) +
    T(68, 956, 'YOUR REACH', 21) + T(68, 988, 'what you can get to.', 18) + T(68, 1014, 'it went up for both.', 18) + T(68, 1040, 'nobody’s went down.', 18) + T(68, 1072, 'this is what the rule keeps safe.', 15, soft) +
    T(422, 956, 'YOUR LEAD', 21) + T(422, 988, 'how far ahead of others you are.', 17) + T(422, 1014, 'it can shrink. if being ahead', 17) + T(422, 1038, 'matters to you, that is a real loss.', 16) + T(422, 1072, 'does it count? still argued about.', 15, soft) +
    tb.text,
});
