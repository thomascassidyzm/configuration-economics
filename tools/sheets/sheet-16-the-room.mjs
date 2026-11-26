// Sheet 16, the room: a floor and a roof. After Kate Raworth, Doughnut Economics (2017)
// and the Doughnut Economics Action Lab. Her idea, drawn fresh (not her doughnut diagram): an economy should meet
// the needs of all people (a floor nobody falls through) within the means of the living planet (a roof nobody
// breaks through). Between the two is the safe and just space.
// Sources read: kateraworth.com/doughnut; doughnuteconomics.org/about-doughnut-economics.
// Not CE's argument: the sheet shows her idea only. CE's relation is in src/pages/lineage.astro (Raworth).
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(16, 'the room');
const FL = 760, FB = 788; // floor: top and underside
const WL = 130, WR = 650; // walls
const EL = [110, 446], PK = [390, 292], ER = [670, 446]; // roof: left eave, peak, right eave
const RT = 16; // roof thickness
const onRoof = (x, k = 0) => { const [a, b] = x < PK[0] ? [EL, PK] : [PK, ER]; return [x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]) + k]; };
// the pile of stuff that has pushed up through the roof: boxes of all sizes, stacked anyhow
const PL = 496, PR = 600;
const stack = [[96, 70, 0], [80, 62, 12], [104, 56, -4], [70, 70, 18], [92, 58, 4], [76, 66, 14], [84, 60, 8]];
let py = 760;
const pile = stack.map(([w, h, dx], i) => {
  const x = PL + dx, y = py - h; py = y;
  const tilt = i % 2 ? 4 : -3;
  return `<path d="M${x} ${y + h}L${x + tilt} ${y}H${x + w + tilt}L${x + w} ${y + h}Z" fill="${B.paper}"/>` + (i % 3 === 0 ? `<path d="M${x + 14} ${y + h / 2}H${x + w - 14}" stroke-width="2"/>` : `<path d="M${x + w / 2} ${y + 6}V${y + 22}" stroke-width="2"/>`);
}).join('');
const PTOP = py;
// the roof, outer and inner line, broken where the pile comes through
const gapL = PL + 2, gapR = PR + 20;
const roofSide = (k) => `<path d="${d([onRoof(EL[0], k), onRoof(PK[0], k), onRoof(gapL, k)])}"/><path d="${d([onRoof(gapR, k), onRoof(ER[0], k)])}"/>`;
const crack = (x, s) => { const [cx, cy] = onRoof(x, RT / 2); return `<path d="M${cx} ${cy}l${s * 14} -18M${cx} ${cy}l${s * 20} 6M${cx} ${cy}l${s * 6} 22" stroke-width="2.2"/>`; };
const roof = roofSide(0) + roofSide(RT) + `<path d="M${EL[0]} ${EL[1]}L${EL[0]} ${EL[1] + RT}M${ER[0]} ${ER[1]}L${ER[0]} ${ER[1] + RT}"/>` + crack(gapL - 4, -1) + crack(gapR + 4, 1);
// the walls and the floor, with a hole where boards are missing
const HL = 206, HR = 266;
const walls = `<path d="M${WL} ${onRoof(WL, RT)[1]}V${FL}M${WR} ${onRoof(WR, RT)[1]}V${FL}"/>`;
const floor = `<path d="M${WL - 30} ${FL}H${HL}M${HR} ${FL}H${WR + 30}M${WL - 30} ${FB}H${HL}M${HR} ${FB}H${WR + 30}M${WL - 30} ${FL}V${FB}M${WR + 30} ${FL}V${FB}M${HL} ${FL}V${FB}M${HR} ${FL}V${FB}"/>` +
  [140, 176, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660].map((x) => `<path d="M${x} ${FL + 4}V${FB - 4}" stroke-width="2" stroke="${B.soft}"/>`).join('');
// people standing in the room, and one who has gone through the hole, holding on
const person = (x) => `<circle cx="${x}" cy="${FL - 96}" r="14"/><path d="M${x} ${FL - 82}V${FL - 40}L${x - 14} ${FL}M${x} ${FL - 40}L${x + 14} ${FL}M${x - 20} ${FL - 58}L${x} ${FL - 70}L${x + 20} ${FL - 58}"/>`;
const HX = (HL + HR) / 2;
const fallen = `<circle cx="${HX}" cy="${FL - 4}" r="14" fill="${B.paper}"/><path d="M${HX} ${FL + 10}V${FB + 34}L${HX - 12} ${FB + 66}M${HX} ${FB + 34}L${HX + 12} ${FB + 66}M${HX} ${FL + 18}L${HL - 14} ${FL - 4}M${HX} ${FL + 18}L${HR + 14} ${FL - 4}"/>`;
// the space between: a gold measure from floor to roof
const MX = 168, mTop = onRoof(MX, RT)[1] + 8, mBot = FL - 8;
const measure = `<g stroke="${B.sun}" stroke-width="2.6"><path d="M${MX} ${mTop}V${mBot}"/><path d="M${MX - 10} ${mTop + 14}L${MX} ${mTop}L${MX + 10} ${mTop + 14}M${MX - 10} ${mBot - 14}L${MX} ${mBot}L${MX + 10} ${mBot - 14}"/></g>`;

const strokes =
  roof + walls + floor + pile + person(320) + person(376) + person(432) + fallen + measure +
  lead([[120, 256], [150, 330], onRoof(220)]) + // the roof
  lead([[600, 256], [596, 300], [560, PTOP + 30]]) + // through the roof
  lead([[120, 866], [150, 838], [HX - 6, FB + 26]]) + // a hole in the floor
  lead([[470, 866], [430, 830], [400, FB - 6]]) + // the floor
  lead([[240, 544], [214, 576], [MX + 1, 596]]) + // the room between
  `<path d="M50 990H376V1092H50Z" stroke-width="2"/><path d="M404 990H730V1092H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 16, the room: a floor and a roof. After Kate Raworth',
  seed: 6,
  strokes,
  text: T(50, 78, 'A FLOOR AND A ROOF', 40) + T(50, 112, 'nobody falls through one, nothing breaks through the other', 23, soft) +
    T(50, 178, 'THE ROOF', 22) + T(50, 206, 'what the living planet can bear:', 19) + T(50, 230, 'steady weather, good soil, the ozone layer.', 19) +
    T(470, 178, 'THROUGH THE ROOF', 22) + T(470, 206, 'taking more than', 19) + T(470, 230, 'the planet can bear.', 19) +
    T(196, 474, 'THE ROOM BETWEEN', 22, gold) + T(196, 500, 'safe for the planet,', 19, gold) + T(196, 524, 'fair to everyone.', 19, gold) +
    T(50, 892, 'A HOLE IN THE FLOOR', 21) + T(50, 918, 'someone left without what', 18) + T(50, 942, 'they need to live.', 18) +
    T(410, 892, 'THE FLOOR', 21) + T(410, 918, 'enough for everyone: food,', 18) + T(410, 942, 'a home, health, a say.', 18) +
    T(68, 1024, 'THE USUAL AIM', 20) + T(68, 1052, 'a bigger house, every year.', 18) + T(68, 1078, 'nothing grows for ever.', 17, soft) +
    T(422, 1024, 'HER AIM', 20) + T(422, 1052, 'everyone in, nothing broken.', 18) + T(422, 1078, 'thrive, rather than grow.', 17, soft) +
    T(50, 1140, 'the old saying: live within your means.', 17, soft) + T(50, 1166, 'after Kate Raworth,', 16, soft) + T(50, 1188, 'Doughnut Economics', 16, soft) +
    tb.text,
});
