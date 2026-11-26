// Sheet 13, the bath: GDP counts how fast the tap runs, not how full the bath is.
// It measures the flow of spending, not what is left in store; what drains away is not taken off;
// a spill and its clean-up count as more flow; care given for free has no meter at all.
// Fair to it: it was built to answer how much is being made and sold, and it answers that well.
// Kuznets, who built the US national accounts, warned in 1934 against reading welfare from them.
// Argued in throughput-cost, money-as-signal, energy-income-inheritance (sheet 3 is its neighbour).
import { B, T, soft, gold, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(13, 'the bath');
const FL = 720; // the floor
const WALL = 712, PY = 384, SX = 536; // wall, pipe height, spout x
// the bath, side on: rolled rim, round body, two feet
const L = 110, R = 580, RIM = 486, BOT = 660;
const bath = `<path d="M${L - 12} ${RIM}H${R + 12}"/><path d="M${L} ${RIM}C${L} ${BOT - 40} ${L + 40} ${BOT} ${L + 110} ${BOT}H${R - 110}C${R - 40} ${BOT} ${R} ${BOT - 40} ${R} ${RIM}"/>` +
  `<path d="M${L + 70} ${BOT - 4}L${L + 58} ${FL}M${L + 82} ${BOT}L${L + 74} ${FL}M${R - 70} ${BOT - 4}L${R - 58} ${FL}M${R - 82} ${BOT}L${R - 74} ${FL}" stroke-width="2.8"/>`;
// the water: a gold wavy top, and soft gold hatching below it
const WY = 540;
let wave = `M${L + 6} ${WY}`; for (let x = L + 6; x < R - 26; x += 28) wave += ` q7 -7 14 0 t14 0`;
let hatch = ''; for (let x = L + 40; x < R - 20; x += 36) hatch += `M${x} ${WY + 18}l-18 ${x < L + 80 || x > R - 80 ? 34 : 70}`;
const water = `<g stroke="${B.sun}"><path d="${wave}" stroke-width="3"/><path d="${hatch}" stroke-width="1.8" stroke-opacity="0.6"/></g>`;
// the tap: out of the wall, through the meter, down to the spout, and the stream falling into the bath
const meterX = 630;
const tap = `<path d="M${WALL} 250V${FL}" stroke-width="2.4"/><path d="M${WALL} ${PY - 9}H${SX - 9}V${PY + 40}M${WALL} ${PY + 9}H${SX + 9}V${PY + 40}M${SX - 14} ${PY + 40}H${SX + 14}"/>` +
  `<circle cx="${meterX}" cy="${PY}" r="30" fill="${B.paper}"/><path d="M${meterX - 20} ${PY + 8}A22 22 0 0 1 ${meterX + 20} ${PY + 8}" stroke-width="1.8"/><path d="M${meterX} ${PY + 6}L${meterX + 14} ${PY - 14}" stroke-width="2.6"/>` +
  `<path d="M${SX - 4} ${PY + 46}q-5 13 0 26t0 26t0 26t0 26M${SX + 5} ${PY + 46}q5 13 0 26t0 26t0 26t0 26" stroke-width="2.2" stroke="${B.soft}"/>`;
// the plug hole and the pipe away under the floor, dripping
const PX = 250;
const plug = `<path d="M${PX - 12} ${BOT}H${PX + 12}" stroke-width="4"/><path d="M${PX - 6} ${BOT}V${FL + 40}Q${PX - 6} ${FL + 52} ${PX + 6} ${FL + 52}H${PX + 60}M${PX + 6} ${BOT}V${FL + 38}H${PX + 60}" stroke-width="2.4"/>` +
  [0, 1].map((i) => `<path d="M${PX + 72 + i * 6} ${FL + 50 + i * 18}q-4 7 0 10q4 -3 0 -10" stroke-width="2" stroke="${B.soft}"/>`).join('');
// splashes over the rim, a puddle on the floor, and a mop
const mop = `<path d="M${R + 4} ${RIM - 14}q6 -8 10 0M${R + 18} ${RIM + 6}q5 -7 9 0M${R + 8} ${RIM + 40}q5 -7 9 0" stroke-width="2" stroke="${B.soft}"/>` +
  `<path d="M560 ${FL - 2}Q600 ${FL - 14} 650 ${FL - 4}Q680 ${FL - 12} 700 ${FL - 3}" stroke="${B.soft}" stroke-width="2.2"/>` +
  `<path d="M676 540L624 ${FL - 32}"/><path d="M612 ${FL - 34}L640 ${FL - 28}M610 ${FL - 30}L596 ${FL - 4}M618 ${FL - 30}L610 ${FL - 4}M626 ${FL - 29}L626 ${FL - 4}M634 ${FL - 28}L642 ${FL - 4}" stroke-width="2.4"/>`;

const strokes =
  `<path d="M44 ${FL}H${WALL}"/>` + bath + water + tap + plug + mop +
  lead([[480, 252], [560, 300], [meterX - 10, PY - 27]]) + // the meter
  lead([[120, 272], [150, 400], [200, WY - 2]]) + // the water
  lead([[150, 776], [210, 740], [PX - 4, BOT + 4]]) + // the plug hole
  lead([[520, 776], [580, 750], [608, FL - 12]]) + // the mop
  `<path d="M50 924H376V1080H50Z" stroke-width="2"/><path d="M404 924H730V1080H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 13, the bath: GDP counts how fast the tap runs, not how full the bath is',
  seed: 13,
  strokes,
  text: T(50, 78, 'GDP WATCHES THE TAP', 40) + T(50, 112, 'not how full the bath is', 25, soft) +
    T(440, 188, 'THE METER', 22) + T(440, 216, 'how fast money is spent:', 19) + T(440, 240, 'all that is made and sold.', 19) +
    T(50, 186, 'THE WATER IN THE BATH', 22, gold) + T(50, 214, 'what is left to live on:', 19, gold) + T(50, 238, 'homes, soil, health, skills.', 19, gold) + T(50, 262, 'no meter on it.', 19, gold) +
    T(50, 800, 'THE PLUG HOLE', 22) + T(50, 828, 'what wears out or is used up.', 19) + T(50, 852, 'not taken off.', 19) +
    T(440, 800, 'THE MOP', 22) + T(440, 828, 'paid to clean up a spill.', 19) + T(440, 852, 'counts as more running.', 19) +
    T(68, 960, 'WHAT IT WAS BUILT FOR', 20) + T(68, 992, 'how much is made and sold', 18) + T(68, 1016, 'this year: what you need to', 18) + T(68, 1040, 'know in a slump or a war.', 18) + T(68, 1072, 'it answers that well.', 17, soft) +
    T(422, 960, 'WHAT IT CAN’T SEE', 20) + T(422, 992, 'how full the bath is.', 18) + T(422, 1016, 'care given for free.', 18) + T(422, 1040, 'savings spent, as if pay.', 18) + T(422, 1072, 'long word: gross domestic product', 14.5, soft) +
    T(50, 900, 'the old saying: not everything that counts can be counted.', 17, soft) + T(50, 1136, 'the man who built it warned', 17, soft) + T(50, 1160, 'in 1934: it can’t tell you', 17, soft) + T(50, 1184, 'how well people live.', 17, soft) +
    tb.text,
});
