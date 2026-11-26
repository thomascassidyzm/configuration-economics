// Sheet 11, the receipt: the cost that lands somewhere else.
// The till prints the part of the bill it can see. The rest of the bill runs on, out of the shop,
// and ends in the hand of someone who was never there: another place, or a later time.
// Argued in proposition displaced-costs and src/content/open/NOTES-razor-blade-case.md §2.1–2.2.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(11, 'the receipt');
// centre line of the paper: straight down out of the till, round the bend, across, and down to a hand
const cub = (p0, p1, p2, p3, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]); });
const line = (a, b, n = 8) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
const RX = 200, HW = 38, TEAR = 600;
const C = [...line([RX, TEAR], [RX, 650]), ...cub([RX, 650], [RX, 736], [262, 756], [340, 756]).slice(1), ...line([340, 756], [500, 756]).slice(1), ...cub([500, 756], [580, 756], [612, 780], [620, 836]).slice(1)];
const normal = (i) => { const a = C[Math.max(0, i - 1)], b = C[Math.min(C.length - 1, i + 1)], L = Math.hypot(b[0] - a[0], b[1] - a[1]); return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L]; };
const side = (s) => C.map((p, i) => { const n = normal(i); return [p[0] + n[0] * HW * s, p[1] + n[1] * HW * s]; });
// the tear: a zigzag across the paper
const zig = (y, x0, x1, k = 8) => Array.from({ length: k + 1 }, (_, i) => [x0 + (x1 - x0) * i / k, y + (i % 2 ? 7 : -3)]);
// the rest of the bill: gold dashed edges, with its lines still printed across it
const ghost = () => {
  let o = `<path d="${d(side(1))}" stroke-dasharray="10 8"/><path d="${d(side(-1))}" stroke-dasharray="10 8"/>`;
  for (let i = 4; i < C.length - 2; i += 3) { const n = normal(i), p = C[i]; o += `<path d="M${p[0] + n[0] * 22} ${p[1] + n[1] * 22}L${p[0] - n[0] * 22} ${p[1] - n[1] * 22}" stroke-width="2"/>`; }
  const e = C[C.length - 1], a = side(1)[C.length - 1], b = side(-1)[C.length - 1];
  o += `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke-dasharray="10 8"/>`;
  return `<g stroke="${B.sun}">${o}</g>` + `<circle cx="${e[0] + 26}" cy="${e[1] + 6}" r="0" />`;
};
// the shop: a counter with a till on it; the printed receipt hangs down the front
const shop =
  `<path d="M54 420H360V560H54Z"/><path d="M44 420H370"/>` + // counter
  `<path d="M120 420L132 316H290L302 420Z"/><path d="M150 330H272V362H150Z" stroke-width="2.4"/>` + // till and its window
  [0, 1, 2, 3, 4, 5].map((j) => `<path d="M${152 + j * 20} 375h10v9h-10Z" stroke-width="2"/>`).join('') + // keys
  `<path d="M${RX - HW} 398H${RX + HW}"/>` + // the slot
  `<path d="${d([[RX - HW, 398], [RX - HW, TEAR], ...zig(TEAR, RX - HW, RX + HW), [RX + HW, 398]])}" fill="${B.paper}"/>` +
  [430, 452, 474, 496].map((y, i) => `<path d="M${RX - 26} ${y}H${RX + (i % 2 ? 8 : 22)}" stroke-width="2" stroke="${B.soft}"/>`).join('') +
  `<path d="M${RX - 26} 528H${RX + 26}" stroke-width="2"/>`;
// someone else, far away, holding the end
const P = { x: 692, y: 742 };
const other = `<circle cx="${P.x}" cy="${P.y}" r="16"/><path d="M${P.x} ${P.y + 16}V${P.y + 92}L${P.x - 18} ${P.y + 160}M${P.x} ${P.y + 92}L${P.x + 18} ${P.y + 160}"/>` +
  `<path d="M${P.x} ${P.y + 34}L${P.x - 40} ${P.y + 92}M${P.x} ${P.y + 38}L${P.x + 26} ${P.y + 94}"/>`;
const strokes =
  shop + ghost() + other +
  lead([[80, 258], [64, 432], [RX - 14, 466]]) + // the receipt
  lead([[318, 588], [276, 600], [RX + 24, TEAR + 2]]) + // the tear
  lead([[200, 850], [250, 812], [300, 756]]) + // the rest of the bill
  lead([[620, 560], [660, 640], [686, 724]]) + // someone else
  `<path d="M50 920H376V1090H50Z" stroke-width="2"/><path d="M404 920H730V1090H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 11, the receipt: the cost that lands somewhere else',
  seed: 8,
  strokes,
  text: T(50, 78, 'THE COST THAT LANDS', 40) + T(50, 112, 'somewhere else, or later', 25, soft) +
    T(50, 190, 'THE RECEIPT', 22) + T(50, 218, 'what the till can see.', 20) + T(50, 242, 'paid. all square. a good deal.', 20) +
    T(204, 513, 'PAID', 14, { anchor: 'middle' }) +
    T(330, 584, 'THE TEAR', 22) + T(330, 612, 'where the till stops counting.', 19) + T(330, 640, 'nobody has to be hiding anything.', 17, soft) + T(330, 662, 'the till just can’t see that far.', 17, soft) +
    T(440, 452, 'SOMEONE ELSE', 22) + T(440, 480, 'in another place,', 19) + T(440, 504, 'or later on.', 19) + T(440, 530, 'was never in the shop.', 19) +
    T(50, 870, 'THE REST OF THE BILL', 22, gold) + T(50, 896, 'wear, waste, fewer choices.', 19, gold) +
    T(68, 956, 'COUNTED AT THE TILL', 20) + T(68, 988, 'here, and right now.', 18) + T(68, 1014, 'it can look like a gain.', 18) + T(68, 1046, 'the till is right about', 17, soft) + T(68, 1068, 'what it can see.', 17, soft) +
    T(422, 956, 'COUNTED ALL THE WAY', 20) + T(422, 988, 'everywhere it lands,', 18) + T(422, 1014, 'for as long as it lasts.', 18) + T(422, 1040, 'the same move can be a loss.', 18) + T(422, 1072, 'long word: displaced costs', 15, soft) +
    tb.text,
});
