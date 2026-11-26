// Sheet 22, the tent: room for everybody, made by doing more with less.
// After Buckminster Fuller: his aim, "to make the world work for 100% of humanity, in the shortest possible time,
// through spontaneous cooperation, without ecological offense or the disadvantage of anyone", and his way to it,
// doing more with less (ephemeralization, Nine Chains to the Moon, 1938). A lineage sheet: it draws his idea, not CE's.
// Lineage: src/pages/lineage.astro (cluster 2b); src/content/open/NOTES-circular-to-helical.md §5.
import { B, T, soft, gold, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(22, 'the tent');
const G = 720; // the ground
// the tent, seen from the front: the cloth, and the open door with its two thin poles
const AP = [390, 326], BL = [118, G], BR = [662, G]; // apex, base left, base right
const DA = [390, 424], DL = [232, G], DR = [548, G]; // door apex and foot of each pole
const at = (a, b, y) => a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]); // x on the line a–b at height y
const cloth = `<path d="M${BL[0]} ${BL[1]}L${AP[0]} ${AP[1]}L${BR[0]} ${BR[1]}"/>` +
  `<path d="M${AP[0]} ${AP[1]}V${DA[1]}" stroke-width="2"/>` + // the seam down to the door
  `<path d="M${AP[0]} ${AP[1]}l-6 -34h12z" stroke-width="2.6"/>`; // the top of the pole, poking through
const poles = `<path d="M${DL[0]} ${DL[1]}L${DA[0]} ${DA[1]}L${DR[0]} ${DR[1]}" stroke-width="${B.sw * 1.3}"/>`;
// the door flaps, rolled back and tied
const flap = (s) => { const y = 600, x = at(DA, s < 0 ? DL : DR, y); return `<path d="M${x} ${y}q${s * 26} -6 ${s * 34} 10q${-s * 8} 10 ${-s * 34} -10" stroke-width="2.4"/>`; };
// everybody inside, side by side in sleeping bags: drawn in gold, they are what the sheet is for
const sleeper = (x) => `<path d="M${x - 17} ${G - 2}V${672}Q${x} 660 ${x + 17} 672V${G - 2}" fill="${B.paper}"/><circle cx="${x}" cy="652" r="14" fill="${B.paper}"/><path d="M${x - 6} 650h0M${x + 6} 650h0" stroke-width="4"/>`;
const XS = [310, 350, 390, 430, 470];
const people = `<g stroke="${B.sun}">${XS.map(sleeper).join('')}</g>`;
// guy ropes from the cloth out to a peg each side
const RL = [at(AP, BL, 480), 480], PL = [64, G], RR = [at(AP, BR, 480), 480], PR = [716, G];
const peg = ([x, y]) => `<path d="M${x - 6} ${y - 14}L${x} ${y + 6}L${x + 6} ${y - 14}Z" stroke-width="2.4"/>`;
const ropes = `<path d="M${RL[0]} ${RL[1]}L${PL[0]} ${PL[1] - 12}M${RR[0]} ${RR[1]}L${PR[0]} ${PR[1] - 12}" stroke-width="2.2"/>` + peg(PL) + peg(PR);
let grass = ''; for (const x of [150, 200, 580, 620, 740 - 70]) grass += `M${x} ${G}l-4 -11M${x + 7} ${G}l2 -13`;

const strokes =
  `<path d="M50 ${G}H730"/><path d="${grass}" stroke="${B.soft}" stroke-width="2"/>` +
  cloth + poles + flap(-1) + flap(1) + ropes + people +
  lead([[184, 262], [250, 420], [at(DA, DL, 560) + 2, 560]]) + // the thin poles
  lead([[560, 284], [520, 400], [470, 640]]) + // everybody in
  lead([[96, 486], [112, 540], [(RL[0] + PL[0]) / 2, (RL[1] + PL[1] - 12) / 2]]) + // the guy ropes
  lead([[676, 536], [702, 620], [PR[0], PR[1] - 16]]) + // the pegs
  `<path d="M50 836H376V1076H50Z" stroke-width="2"/><path d="M404 836H730V1076H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 22, the tent: room for everybody, made by doing more with less (after Buckminster Fuller)',
  seed: 6,
  strokes,
  text: T(50, 78, 'ROOM FOR EVERYBODY', 40) + T(50, 112, 'made by doing more with less', 25, soft) +
    T(50, 190, 'TWO THIN POLES', 22) + T(50, 218, 'a little stuff, used well,', 20) + T(50, 242, 'holds the whole thing up.', 20) +
    T(470, 190, 'EVERYBODY IN', 22, gold) + T(470, 218, 'not most people: all.', 20, gold) + T(470, 242, 'nobody sleeps out so', 19, gold) + T(470, 266, 'someone else sleeps in.', 19, gold) +
    T(50, 440, 'GUY ROPES', 22) + T(50, 466, 'each pulls a little.', 19) +
    T(566, 440, 'THE PEGS', 22) + T(566, 466, 'pull them out,', 19) + T(566, 490, 'the grass grows', 19) + T(566, 514, 'back.', 19) +
    T(50, 796, 'the old saying: waste not, want not.', 18, soft) +
    T(68, 872, 'THE AIM', 21) + T(68, 906, 'a world that works for', 18) + T(68, 930, 'every single person, soon,', 18) + T(68, 954, 'with people choosing to', 18) + T(68, 978, 'help, no harm to the living', 18) + T(68, 1002, 'world, and nobody losing out.', 18) + T(68, 1052, 'his words: “100% of humanity”', 16, soft) +
    T(422, 872, 'THE WAY', 21) + T(422, 906, 'do more with less:', 18) + T(422, 930, 'the same job, less stuff.', 18) + T(422, 966, 'each time we learn how,', 18) + T(422, 990, 'there is more to go round.', 18) + T(422, 1052, 'long word: ephemeralisation', 16, soft) +
    T(50, 1146, 'after Buckminster Fuller', 19, soft) + T(50, 1172, '(1895–1983)', 17, soft) +
    tb.text,
});
