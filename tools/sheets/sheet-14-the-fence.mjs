// Sheet 14, the fence: a fence at the top of the cliff costs less than the ambulance at the bottom,
// and is harder to see. The fall that never happened leaves no bill, so the counting sees the ambulance.
// After Joseph Malins, "The Ambulance Down in the Valley" (1895), and "a stitch in time saves nine".
// Argued in proposition prevention-over-repair.
import { B, T, soft, gold, d, lead, seeded, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(14, 'the fence');
const TOP = 430, FL = 790; // cliff top, valley floor
// the cliff: grassy top running in from the left, a rounded lip, then a rocky face down to the valley
const rnd = seeded(14);
const face = [[318, TOP], [334, TOP + 8], [342, TOP + 30]];
for (let y = TOP + 70; y < FL; y += 52) face.push([344 + (y - TOP) * 0.14 + (rnd() - 0.5) * 26, y]);
face.push([404, FL]);
const cliff = `<path d="${d([[44, TOP], ...face])}"/>` +
  [[360, 560, 30], [372, 660, 26], [384, 740, 22]].map(([x, y, w]) => `<path d="M${x - w} ${y}l${w} 6" stroke-width="2" stroke="${B.soft}"/>`).join('') + // ledges in the rock
  [70, 140, 210].map((x) => `<path d="M${x} ${TOP}l-4 -11M${x + 7} ${TOP}l3 -13" stroke-width="2" stroke="${B.soft}"/>`).join('');
// the fence, in gold: four posts and two rails along the lip
const fence = `<g stroke="${B.sun}">` + [214, 264, 314].map((x) => `<path d="M${x} ${TOP + 2}V${TOP - 54}"/>`).join('') +
  `<path d="M214 ${TOP - 42}H314M214 ${TOP - 18}H314" stroke-width="3"/></g>`;
// layers in the rock, under the cliff top, stopping short of the face
const faceX = (y) => { for (let i = 1; i < face.length; i++) if (face[i][1] >= y) { const [x0, y0] = face[i - 1], [x1, y1] = face[i]; return x0 + (x1 - x0) * (y - y0) / (y1 - y0); } return 404; };
const rock = [520, 610, 700].map((y, i) => `<path d="M${60 + i * 30} ${y}H${faceX(y) - 22}" stroke="${B.soft}" stroke-width="2" stroke-dasharray="${18 + i * 6} 12"/>`).join('');
// someone out for a walk on the cliff top
const W = 130;
const walker = `<circle cx="${W}" cy="${TOP - 92}" r="13"/><path d="M${W} ${TOP - 79}V${TOP - 36}L${W - 14} ${TOP - 2}M${W} ${TOP - 36}L${W + 16} ${TOP - 2}M${W} ${TOP - 66}L${W - 18} ${TOP - 44}M${W} ${TOP - 66}L${W + 20} ${TOP - 48}"/>`;
// the ambulance at the bottom, facing the cliff
const AX = 470, AY = FL - 23;
const wheel = (x) => `<circle cx="${x}" cy="${AY}" r="22" fill="${B.paper}"/><circle cx="${x}" cy="${AY}" r="7"/>`;
const amb = `<path d="M${AX + 60} ${AY}H${AX + 250}V${AY - 128}H${AX + 70}V${AY - 92}H${AX + 30}L${AX + 6} ${AY - 56}V${AY}H${AX + 30}"/>` +
  `<path d="M${AX + 36} ${AY - 84}H${AX + 64}V${AY - 58}H${AX + 18}Z" stroke-width="2.4"/>` + // the cab window
  `<path d="M${AX + 160} ${AY - 92}V${AY - 40}M${AX + 134} ${AY - 66}H${AX + 186}" stroke-width="7"/>` + // the cross
  `<path d="M${AX + 110} ${AY - 128}V${AY - 144}H${AX + 136}V${AY - 128}" stroke-width="2.6"/><path d="M${AX + 100} ${AY - 152}l-12 -10M${AX + 146} ${AY - 152}l12 -10M${AX + 123} ${AY - 156}V${AY - 172}" stroke-width="2" stroke="${B.soft}"/>` + // the light
  wheel(AX + 60) + wheel(AX + 200);

const strokes =
  cliff + rock + `<path d="M404 ${FL}H736"/>` + fence + walker + amb +
  lead([[90, 270], [100, 320], [W - 4, TOP - 106]]) + // the walker
  lead([[460, 270], [380, 330], [314, TOP - 30]]) + // the fence
  lead([[200, 860], [300, 830], [418, FL]]) + // no fall
  lead([[560, 856], [600, 840], [618, AY - 8]]) + // the ambulance
  `<path d="M50 960H376V1086H50Z" stroke-width="2"/><path d="M404 960H730V1086H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 14, the fence: a fence at the top of the cliff costs less than the ambulance at the bottom, and is harder to see',
  seed: 14,
  strokes,
  text: T(50, 78, 'A FENCE AT THE TOP', 40) + T(50, 112, 'costs less than the ambulance, and is harder to see', 23, soft) +
    T(50, 196, 'THE WALK', 22) + T(50, 224, 'people come up here', 19) + T(50, 248, 'every day.', 19) +
    T(440, 196, 'THE FENCE', 22, gold) + T(440, 224, 'cheap, and dull.', 19, gold) + T(440, 248, 'it stops the fall.', 19, gold) +
    T(440, 420, 'THE OLD SAYINGS', 17, soft) + T(440, 446, 'a stitch in time saves nine.', 17, soft) + T(440, 476, 'a fence at the top of the cliff,', 17, soft) + T(440, 498, 'not an ambulance down', 17, soft) + T(440, 520, 'in the valley.', 17, soft) +
    T(50, 860, 'NO FALL', 22) + T(50, 888, 'no bill, no news.', 19) + T(50, 912, 'nothing to count.', 19) +
    T(440, 880, 'THE AMBULANCE', 22) + T(440, 908, 'costs a lot, and is needed.', 19) + T(440, 932, 'every trip is counted.', 19) +
    T(68, 994, 'WHAT GETS COUNTED', 20) + T(68, 1024, 'call-outs, trips, bills.', 18) + T(68, 1048, 'busy looks like doing well.', 18) + T(68, 1074, 'long word: prevention', 15, soft) +
    T(422, 994, 'WHAT GETS MISSED', 20) + T(422, 1024, 'every fall that never came.', 18) + T(422, 1048, 'so the money goes below.', 18) + T(422, 1074, 'we need both. pay for both.', 15, soft) +
    T(50, 1150, 'after Joseph Malins, The Ambulance', 15, soft) + T(50, 1172, 'Down in the Valley (1895)', 15, soft) +
    tb.text,
});
