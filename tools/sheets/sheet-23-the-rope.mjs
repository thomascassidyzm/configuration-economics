// Sheet 23, the rope (a skipping game): some games are played to win, some to keep the play going.
// After James P. Carse, Finite and Infinite Games (1986): "A finite game is played for the purpose of winning,
// an infinite game for the purpose of continuing the play." A lineage sheet: it draws his idea, not CE's.
// Argued as proposition infinite-game (src/content/propositions.ts); lineage in src/pages/lineage.astro.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(23, 'the rope');
const G = 740; // the ground
// a stick figure: head at (x, y); arms and legs given as end points
const fig = (x, y, { armL, armR, legL, legR, hip = 92 }) => {
  const nk = y + 16, sh = y + 34, hp = y + hip;
  return `<circle cx="${x}" cy="${y}" r="16"/><path d="M${x} ${nk}L${x} ${hp}"/>` +
    `<path d="M${x} ${sh}L${armL[0]} ${armL[1]}M${x} ${sh}L${armR[0]} ${armR[1]}"/>` +
    `<path d="M${x} ${hp}L${legL[0]} ${legL[1]}M${x} ${hp}L${legR[0]} ${legR[1]}"/>`;
};
// the two turners, each holding an end of the rope out towards the middle
const HL = [146, 596], HR = [534, 596];
const turnL = fig(100, 548, { armL: [74, 630], armR: HL, legL: [82, G], legR: [118, G] });
const turnR = fig(580, 548, { armL: HR, armR: [606, 630], legL: [562, G], legR: [598, G] });
// the jumper in the middle, feet off the ground
const jump = fig(340, 566, { armL: [306, 606], armR: [374, 606], legL: [324, 708], legR: [356, 708], hip: 90 });
// a smaller one at the side, leaning in, about to jump in
const runner = `<g transform="translate(676 606) scale(0.8)">` +
  `<circle cx="-8" cy="0" r="16"/><path d="M-4 16L10 96"/><path d="M-1 34L-46 40M-1 34L-40 66"/><path d="M10 96L-24 168M10 96L34 136L58 168"/>` + `</g>`;
// the rope, at the top of its swing, in gold; and where it was a moment ago, faint, near the ground
const top = `M${HL[0]} ${HL[1]}C${HL[0] + 34} 214 ${HR[0] - 34} 214 ${HR[0]} ${HR[1]}`;
const low = `M${HL[0]} ${HL[1]}C${HL[0] + 50} 790 ${HR[0] - 50} 790 ${HR[0]} ${HR[1]}`;
// small marks showing which way it turns
const turnMarks = `<path d="M196 440q-14 30 -10 60M188 486l-2 16 12 -10M484 440q14 30 10 60M492 486l2 16 -12 -10" stroke="${B.soft}" stroke-width="2.2"/>`;
let grass = ''; for (const x of [60, 200, 260, 420, 500, 640]) grass += `M${x} ${G}l-4 -11M${x + 7} ${G}l2 -13`;

const strokes =
  `<path d="M50 ${G}H730"/><path d="${grass}" stroke="${B.soft}" stroke-width="2"/>` +
  `<path d="${low}" stroke="${B.soft}" stroke-width="2" stroke-dasharray="6 9"/>` +
  `<path d="${top}" stroke="${B.sun}" stroke-width="${B.sw * 1.2}"/>` + turnMarks +
  turnL + turnR + jump + runner +
  lead([[300, 254], [330, 290], [340, 334]]) + // the rope
  lead([[140, 778], [140, 680], [HL[0] - 2, HL[1] + 4]]) + // the turners
  lead([[680, 472], [690, 540], [672, 596]]) + // jumping in
  lead([[420, 778], [380, 760], [358, 708]]) + // in the middle
  `<path d="M50 880H376V1088H50Z" stroke-width="2"/><path d="M404 880H730V1088H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 23, the skipping rope: some games are played to win, some to keep the play going (after James Carse)',
  seed: 9,
  strokes,
  text: T(50, 78, 'A GAME TO KEEP GOING', 40) + T(50, 112, 'not every game is played to be won', 25, soft) +
    T(50, 190, 'THE ROPE', 24, gold) + T(50, 218, 'keep it turning.', 20, gold) + T(50, 242, 'that is what the game is for.', 20, gold) +
    T(50, 806, 'THE TURNERS', 21) + T(50, 832, 'slow the beat when', 18) + T(50, 856, 'a small one joins.', 18) +
    T(560, 400, 'JUMPING IN', 22) + T(560, 426, 'always room', 19) + T(560, 450, 'for one more.', 19) +
    T(410, 806, 'IN THE MIDDLE', 21) + T(410, 832, 'trip? swap over.', 18) + T(410, 856, 'nobody is out for good.', 18) +
    T(68, 916, 'A GAME TO WIN', 21) + T(68, 948, 'played to win.', 18) + T(68, 974, 'it ends when someone wins.', 18) + T(68, 1000, 'the rules stay fixed', 18) + T(68, 1024, 'till the end.', 18) + T(68, 1070, 'his word: a finite game', 16, soft) +
    T(422, 916, 'A GAME TO KEEP GOING', 21) + T(422, 948, 'played so the play goes on,', 18) + T(422, 974, 'and more can join in.', 18) + T(422, 1000, 'the rules can change, so', 18) + T(422, 1024, 'nobody wins and ends it.', 18) + T(422, 1070, 'his word: an infinite game', 16, soft) +
    T(50, 1132, 'the old saying: the more, the merrier.', 17, soft) + T(50, 1166, 'after James Carse,', 18, soft) + T(50, 1190, 'Finite and Infinite Games, 1986', 15, soft) +
    tb.text,
});
