// Sheet 21, the watering can: most need, least care. Good care tends to go where it is least needed.
// The inverse care law, after Julian Tudor Hart, "The inverse care law", The Lancet, 27 February 1971, 1(7696):405-12:
// "The availability of good medical care tends to vary inversely with the need for it in the population served.
// This inverse care law operates more completely where medical care is most exposed to market forces, and less so
// where such exposure is reduced." And: "In areas with most sickness and death, general practitioners have more work,
// larger lists, less hospital support ... and hospital doctors shoulder heavier case-loads with less staff and
// equipment, more obsolete buildings". Reversing it: Lord Victor Adebowale's stated mission (RCGP interview, 2024).
// Not argued in CE; drawn as a neighbour. Not on any page yet.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(21, 'the watering can');
const G = 690; // the ground
// a healthy flower: straight stem, two leaves, a full head
const flower = (x, h) => {
  const y = G - h; let o = `<path d="M${x} ${G - 10}V${y + 10}"/>`;
  o += `<path d="M${x} ${G - h * 0.45}q-26 -6 -30 -26q22 0 30 20M${x} ${G - h * 0.62}q26 -6 30 -26q-22 0 -30 20" stroke-width="2.6"/>`;
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; o += `<circle cx="${(x + Math.cos(a) * 13).toFixed(1)}" cy="${(y + Math.sin(a) * 13).toFixed(1)}" r="7" stroke-width="2.4"/>`; }
  return o + `<circle cx="${x}" cy="${y}" r="7" fill="${B.paper}" stroke-width="2.4"/>`;
};
// a thirsty flower: the stem bends over and the head hangs down
const droop = (x, h, s = 1) => {
  const tx = x + 30 * s, ty = G - h + 30;
  let o = `<path d="M${x} ${G - 10}C${x} ${G - h * 0.7} ${x + 4 * s} ${G - h} ${x + 20 * s} ${G - h}C${x + 32 * s} ${G - h} ${tx} ${G - h + 10} ${tx} ${ty - 8}"/>`;
  o += `<path d="M${x} ${G - h * 0.35}q${-20 * s} 4 ${-24 * s} 22" stroke-width="2.4"/>`;
  o += `<circle cx="${tx}" cy="${ty}" r="7" stroke-width="2.4"/>` + [-1, 0, 1].map((k) => `<path d="M${tx + k * 7} ${ty + 6}l${k * 4} 14" stroke-width="2.2"/>`).join('');
  return o;
};
// the two beds: one heaped and dark with water, one cracked
const greenBed = `<path d="M60 ${G}Q190 ${G - 28} 320 ${G}"/>` + [[100, 130], [146, 168], [196, 150], [244, 176], [288, 136]].map(([x, h]) => flower(x, h)).join('') +
  [[90, G - 8], [130, G - 14], [180, G - 18], [230, G - 16], [280, G - 10]].map(([x, y]) => `<path d="M${x} ${y}h10" stroke="${B.soft}" stroke-width="2"/>`).join('');
const dryBed = `<path d="M440 ${G}Q580 ${G - 22} 724 ${G}"/>` + [[476, 96], [530, 112], [588, 90], [640, 106]].map(([x, h], i) => droop(x, h, i % 2 ? 1 : 0.9)).join('') +
  `<path d="M470 ${G - 6}l10 -6l6 4l8 -7M560 ${G - 14}l8 -6l10 4l6 -6M650 ${G - 10}l10 -6l8 5l8 -5" stroke-width="2.2"/>`;
// the gardener, and the can pouring on the green bed
const P = { x: 392, top: 352 };
const gardener = `<circle cx="${P.x}" cy="${P.top}" r="17"/><path d="M${P.x} ${P.top + 17}V${P.top + 160}M${P.x} ${P.top + 160}L${P.x - 28} ${G}M${P.x} ${P.top + 160}L${P.x + 28} ${G}"/>` +
  `<path d="M${P.x} ${P.top + 50}L${P.x - 46} ${P.top + 90}L${P.x - 70} ${P.top + 92}M${P.x} ${P.top + 56}L${P.x + 34} ${P.top + 108}"/>`;
const CAN = { x: 300, y: 446 }; // middle of the can body
const can = `<g transform="rotate(-24 ${CAN.x} ${CAN.y})">` +
  `<path d="M${CAN.x - 36} ${CAN.y - 30}H${CAN.x + 36}L${CAN.x + 30} ${CAN.y + 30}H${CAN.x - 30}Z" fill="${B.paper}"/>` +
  `<path d="M${CAN.x - 22} ${CAN.y - 30}Q${CAN.x} ${CAN.y - 64} ${CAN.x + 24} ${CAN.y - 30}" stroke-width="3"/>` +
  `<path d="M${CAN.x - 32} ${CAN.y + 14}L${CAN.x - 96} ${CAN.y - 22}"/><path d="M${CAN.x - 96} ${CAN.y - 34}L${CAN.x - 110} ${CAN.y - 18}L${CAN.x - 90} ${CAN.y - 8}Z" stroke-width="2.6"/></g>`;
// the water, gold: drops falling from the rose onto the green bed
const drops = `<g stroke="${B.sun}">` + [[176, 478], [192, 500], [208, 482], [170, 518], [200, 532], [224, 508], [184, 552], [214, 566], [236, 540], [160, 560]].map(([x, y]) => `<path d="M${x} ${y}q-5 9 0 12q5 -3 0 -12" stroke-width="2.4" fill="${B.sun}"/>`).join('') + `</g>`;

const strokes =
  greenBed + dryBed + gardener + can + drops +
  `<path d="M44 ${G}H736"/>` +
  lead([[120, 262], [150, 380], [196, 506]]) + // the water
  lead([[520, 262], [470, 300], [P.x + 8, P.top + 90]]) + // the gardener
  lead([[90, 748], [96, 722], [130, G - 10]]) + // the green bed
  lead([[472, 748], [500, 720], [566, G - 12]]) + // the dry bed
  `<path d="M50 920H376V1090H50Z" stroke-width="2"/><path d="M404 920H730V1090H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 21, the watering can: most need, least care (after Julian Tudor Hart, the inverse care law, 1971)',
  seed: 12,
  strokes,
  text: T(50, 78, 'MOST NEED, LEAST CARE', 40) + T(50, 112, 'good care tends to go where it’s least needed', 25, soft) +
    T(50, 196, 'THE WATER', 25, gold) + T(50, 224, 'good care: doctors,', 20, gold) + T(50, 248, 'time, help, beds.', 20, gold) +
    T(470, 196, 'THE GARDENER', 22) + T(470, 224, 'nobody has to mean it', 19) + T(470, 248, 'for the water to fall here.', 19) +
    T(50, 778, 'THE GREEN BED', 22) + T(50, 806, 'least need.', 19) + T(50, 830, 'most water.', 19) +
    T(440, 778, 'THE DRY BED', 22) + T(440, 806, 'most need. least water.', 19) + T(440, 834, 'more work, longer lists,', 17, soft) + T(440, 856, 'older buildings, less help.', 17, soft) +
    T(50, 884, 'the old saying: them as has, gets.', 17, soft) +
    T(68, 956, 'THE LAW, 1971', 21) + T(68, 986, '“the availability of good', 16) + T(68, 1008, 'medical care tends to vary', 16) + T(68, 1030, 'inversely with the need for it', 16) + T(68, 1052, 'in the population served.”', 16) + T(68, 1078, 'long word: the inverse care law', 15, soft) +
    T(422, 956, 'STRONGEST WHERE IT’S SOLD', 20) + T(422, 988, 'the more care is bought', 18) + T(422, 1014, 'and sold, the stronger', 18) + T(422, 1040, 'the pull. weaker where', 18) + T(422, 1066, 'it is not.', 18) +
    T(50, 1130, 'after Julian Tudor Hart, a doctor', 16, soft) + T(50, 1152, 'in a Welsh mining village.', 16, soft) +
    T(50, 1176, 'turning it round is the stated aim', 15, soft) + T(50, 1194, 'of Lord Victor Adebowale.', 15, soft) +
    tb.text,
});
