// Sheet 15, the tide: a rising tide hides the rocks.
// While the total grows, everyone can get more at once and the questions of who gets what stay under water.
// If growth slows, the water drops and those questions show. Growth is not the trouble; the rocks were there all along.
// Argued in proposition growth-masks-strain (premises: expanding systems absorb conflict; stagnant ones expose
// allocation choices; energy limits expansion, sheet 3).
import { B, T, soft, gold, d, lead, dim, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(15, 'the tide');
const HW = 480, LW = 690, BED = 800; // high water, low water, sea bed
let sea = `M44 ${HW}`; for (let x = 44; x < 724; x += 34) sea += ` q8.5 -9 17 0 t17 0`;
const bed = `<path d="${d([[44, BED], [140, BED - 8], [260, BED + 4], [380, BED - 6], [520, BED + 6], [640, BED - 4], [736, BED]])}" stroke="${B.soft}" stroke-width="2.4"/>`;
// the rocks, in gold, standing up from the sea bed: their tops sit above low water
// each rock is a craggy lump: up from the bed, a broken top, back down; a crack or two
const rock = (x, top, w) => { const p = [[x - w, BED], [x - w * 0.8, top + 52], [x - w * 0.55, top + 22], [x - w * 0.3, top + 4], [x - w * 0.05, top + 14], [x + w * 0.2, top], [x + w * 0.5, top + 18], [x + w * 0.75, top + 46], [x + w, BED]];
  return `<path d="${d(p)}"/><path d="M${x - w * 0.25} ${top + 34}l14 26l-6 18M${x + w * 0.35} ${top + 60}l12 22" stroke-width="2"/>`; };
const rocks = `<g stroke="${B.sun}">${rock(200, 646, 96)}${rock(420, 630, 80)}${rock(616, 654, 84)}</g>`;
// the low-water mark, dashed, below the tops of the rocks
const low = [[44, 106], [302, 346], [492, 538], [694, 700]].map(([a, b]) => `<path d="M${a} ${LW}H${b}" stroke="${B.soft}" stroke-width="2.2" stroke-dasharray="12 10"/>`).join('');
// a sailing boat and a small rowing boat, both afloat on high water
const big = `<path d="M110 ${HW - 30}H350L322 ${HW + 14}H140Z" fill="${B.paper}"/><path d="M232 ${HW - 30}V270"/><path d="M226 286L130 ${HW - 44}H226M240 300L322 ${HW - 44}H240" stroke-width="2.8"/>`;
const small = `<path d="M488 ${HW - 16}H616L600 ${HW + 12}H504Z" fill="${B.paper}"/><path d="M512 ${HW - 24}L590 ${HW - 2}" stroke-width="2.4"/><circle cx="552" cy="${HW - 44}" r="10"/><path d="M552 ${HW - 34}V${HW - 16}" stroke-width="2.6"/>`;

const strokes =
  `<path d="${sea}"/>` + bed + rocks + low + big + small + dim(712, HW + 10, LW) +
  lead([[70, 270], [64, 380], [80, HW - 2]]) + // high water
  lead([[470, 264], [520, 330], [580, HW + 6]]) + // the boats
  lead([[130, 852], [160, 820], [190, 720]]) + // the rocks
  lead([[512, 852], [516, 780], [516, LW]]) + // low water
  `<path d="M50 960H376V1086H50Z" stroke-width="2"/><path d="M404 960H730V1086H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 15, the tide: a rising tide lifts the boats, and hides the rocks',
  seed: 15,
  strokes,
  text: T(50, 78, 'A RISING TIDE', 40) + T(50, 112, 'lifts the boats, and hides the rocks', 25, soft) +
    T(50, 196, 'HIGH WATER', 22) + T(50, 224, 'the total keeps growing.', 19) + T(50, 248, 'there is more every year.', 19) +
    T(440, 196, 'BOTH BOATS GO UP', 22) + T(440, 224, 'the gap between them stays,', 19) + T(440, 248, 'but it is easier to live with.', 19) +
    T(50, 870, 'THE ROCKS', 22, gold) + T(50, 898, 'who gets what. there all', 19, gold) + T(50, 922, 'along, under the water.', 19, gold) +
    T(440, 870, 'LOW WATER', 22) + T(440, 898, 'if growth slows, the water', 19) + T(440, 922, 'drops, and the rocks show.', 19) +
    T(68, 994, 'WHILE THE WATER RISES', 20) + T(68, 1024, 'everyone can get more at once.', 17) + T(68, 1048, 'arguments over shares can wait.', 17) + T(68, 1074, 'growth is not the trouble.', 15, soft) +
    T(422, 994, 'WHEN IT STOPS RISING', 20) + T(422, 1024, 'more for one is less for another.', 17) + T(422, 1048, 'the choices come into the open.', 17) + T(422, 1074, 'long word: distribution', 15, soft) +
    T(50, 1138, 'the old saying: a rising tide', 16, soft) + T(50, 1160, 'lifts all boats. true. it also', 16, soft) + T(50, 1182, 'covers what is underneath.', 16, soft) +
    tb.text,
});
