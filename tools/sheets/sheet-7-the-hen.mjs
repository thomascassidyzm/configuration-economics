// Sheet 7, the hen: a full basket of eggs is not the same as the hen that lays them.
// Two quantities: what you can do now (the eggs) and the power to make more (the hen).
// A move can fill the basket by spending the hen, and the basket still looks full for a while.
// Argued in src/content/open/NOTES-worse-for-none.md §5.
import { B, T, soft, gold, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(7, 'the hen');
const ground = 720;
// the hen, facing right towards the basket, drawn in gold: she is the thing the sheet is for
function hen(ox, oy) {
  const p = (s) => s.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${+x + ox} ${+y + oy}`);
  const body = p('M362 452 C400 480 412 560 360 600 C310 640 210 630 180 582 C162 548 160 504 160 462 L150 378 C190 408 212 440 250 464 C290 476 330 470 350 450');
  const tail = p('M164 456 L176 404 M182 470 L194 424');
  const head = `<circle cx="${ox + 372}" cy="${oy + 422}" r="28"/>`;
  const beak = p('M398 412 L424 423 L398 433');
  const comb = p('M352 404 Q352 380 366 396 Q372 374 382 394 Q394 378 396 404');
  const wattle = p('M398 440 Q408 456 394 462');
  const wing = p('M226 512 C268 488 326 498 346 532 C306 566 252 560 226 512 M250 518 C276 520 300 528 318 540 M262 534 C284 538 300 546 312 552');
  const legs = p('M282 622 V680 M266 694 L282 680 L302 692 M282 680 L280 698 M322 618 V680 M306 694 L322 680 L342 692 M322 680 L320 698');
  return `<g stroke="${B.sun}"><path d="${body}"/><path d="${tail}" stroke-width="2.4"/>${head}<path d="${beak}"/><path d="${comb}"/><path d="${wattle}" stroke-width="2.6"/>` +
    `<path d="${wing}" stroke-width="2.8"/><circle cx="${ox + 380}" cy="${oy + 416}" r="3.5" fill="${B.sun}"/><path d="${legs}" stroke-width="2.8"/></g>`;
}
// the basket, heaped with eggs
const BK = { L: 470, R: 690, top: 630 };
function basket() {
  const { L, R, top } = BK, bot = ground;
  const egg = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="22" fill="${B.paper}" stroke-width="2.8"/>`;
  const eggs = [[500, 614], [538, 612], [576, 614], [614, 612], [652, 614], [518, 580], [556, 576], [594, 578], [632, 582], [538, 546], [576, 544], [612, 550], [574, 512]];
  return `<path d="M${L + 10} ${top}C${L + 10} 440 ${R - 10} 440 ${R - 10} ${top}" stroke-width="3"/>` + eggs.map(([x, y]) => egg(x, y)).join('') +
    `<path d="M${L} ${top}H${R}L${R - 20} ${bot}H${L + 20}Z" fill="${B.paper}"/>` +
    `<path d="M${L + 6} ${top + 30}H${R - 6}M${L + 12} ${top + 60}H${R - 12}" stroke-width="2"/>` +
    [0.2, 0.4, 0.6, 0.8].map((k) => `<path d="M${L + (R - L) * k} ${top}L${L + 20 + (R - L - 40) * k} ${bot}" stroke-width="2"/>`).join('');
}

const strokes =
  `<path d="M50 ${ground}H730"/>` + [80, 140, 420, 712].map((x) => `<path d="M${x} ${ground}l-5 -12M${x + 8} ${ground}l3 -14" stroke-width="2" stroke="${B.soft}"/>`).join('') +
  hen(-60, 26) + basket() +
  lead([[70, 290], [64, 520], [118, 606]]) +
  lead([[560, 330], [570, 420], [576, 522]]) +
  `<path d="M50 836H376V1076H50Z" stroke-width="2"/><path d="M404 836H730V1076H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 7, the hen: a full basket of eggs is not the same as the hen that lays them',
  seed: 7,
  strokes,
  text: T(50, 78, 'A FULL BASKET OF EGGS', 40) + T(50, 112, 'is not the same as the hen that lays them', 25, soft) +
    T(50, 210, 'THE HEN', 25, gold) + T(50, 240, 'what makes more.', 20, gold) + T(50, 266, 'the thing to look after.', 20, gold) +
    T(470, 236, 'THE BASKET', 22) + T(470, 264, 'what you can do now.', 20) + T(470, 290, 'easy to count.', 20) +
    T(50, 796, 'TWO MORE THINGS', 19, soft) +
    T(68, 872, 'WHY IT’S HARD TO SEE', 21) + T(68, 906, 'eat the hen: a big dinner', 18) + T(68, 930, 'today, and the basket still', 18) + T(68, 954, 'looks full for a few days.', 18) + T(68, 988, 'by the time it is empty,', 18) + T(68, 1012, 'there is no hen.', 18) + T(68, 1052, 'sometimes you must. say so.', 17, soft) +
    T(422, 872, 'ONE WAY TO RANK A MOVE', 21) + T(422, 912, 'best: more hens.', 20) + T(422, 944, 'good: more eggs.', 20) + T(422, 976, 'never: eggs paid', 20) + T(422, 1002, 'for with the hen.', 20) + T(422, 1052, 'a proposal, still argued.', 17, soft) +
    T(50, 1146, 'in real life the hen is hard', 19, soft) + T(50, 1172, 'to see: good soil, skills, trust.', 19, soft) +
    tb.text,
});
