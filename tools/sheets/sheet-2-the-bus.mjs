// Sheet 2, the bus: a better seat on the bus is not the same as a longer trip.
// Winning a seat (symmetry) is not the same as the trip going on (continuity).
// Argued in src/content/open/NOTES-worse-for-none.md §4.
import { B, T, soft, gold, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(2, 'the bus');
const road = 530, edge = 520;
const head = (x, y) => `<circle cx="${x}" cy="${y}" r="11"/><path d="M${x - 15} ${y + 30}Q${x} ${y + 6} ${x + 15} ${y + 30}"/>`;
const win = (x) => `<path d="M${x} 452H${x + 52}V500H${x}Z" stroke-width="2.4"/>`;
let sea = `M${edge + 6} 842`; for (let i = 0; i < 4; i++) sea += ` q14 -14 28 0 t28 0`;
const strokes =
  `<path d="M40 ${road}H${edge}V830"/><path d="M${edge} 600l-16 22M${edge} 680l-20 26M${edge} 760l-14 20" stroke-width="2" stroke="${B.soft}"/>` +
  `<path d="${sea}" stroke="${B.soft}" stroke-width="2.4"/><path d="${sea.replace('842', '868')}" stroke="${B.soft}" stroke-width="2"/>` +
  `<path d="M${edge + 8} ${road}H742" stroke-dasharray="14 12" stroke="${B.sun}"/><path d="M${edge + 70} ${road}V574M${edge + 150} ${road}V574" stroke-dasharray="6 8" stroke="${B.sun}" stroke-width="2"/>` +
  `<g transform="translate(-50 -60)"><path d="M150 426Q150 414 164 414H432Q452 414 456 436L462 540Q462 552 450 552H164Q150 552 150 540Z"/>` +
  [176, 244, 312, 380].map(win).join('') + [202, 270, 338].map((x) => head(x, 474)).join('') + head(406, 474) +
  `<path d="M394 456l6 -12 6 8 6 -8 6 12" stroke="${B.sun}" stroke-width="2.4"/>` +
  `<circle cx="212" cy="558" r="26" fill="${B.paper}"/><circle cx="212" cy="558" r="8"/><circle cx="400" cy="558" r="26" fill="${B.paper}"/><circle cx="400" cy="558" r="8"/>` +
  `<path d="M476 480H530M514 468L532 480L514 492" stroke-width="3"/></g>` +
  lead([[420, 262], [380, 310], [358, 384]]) + lead([[110, 262], [130, 320], [150, 386]]) + lead([[640, 478], [640, 500], [630, 524]]) +
  `<path d="M50 936H376V1076H50Z" stroke-width="2"/><path d="M404 936H730V1076H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 2, the bus: a better seat on the bus is not the same as a longer trip',
  strokes,
  text: T(50, 78, 'A BETTER SEAT ON THE BUS', 40) + T(50, 112, 'is not the same as a longer trip', 25, soft) +
    T(360, 190, 'THE FRONT SEAT', 22, gold) + T(360, 218, 'best view, most room.', 20) + T(360, 242, 'looks like winning.', 20) +
    T(50, 190, 'THE BACK SEAT', 22) + T(50, 218, 'less of everything.', 20) + T(50, 242, 'same bus.', 20) +
    T(548, 640, 'THE EDGE', 22) + T(548, 668, 'every seat goes', 19) + T(548, 692, 'over together.', 19) + T(548, 724, 'hard to see from', 17, soft) + T(548, 746, 'inside: everyone is', 17, soft) + T(548, 768, 'looking at the seats.', 17, soft) +
    T(560, 440, 'MORE ROAD', 22, gold) + T(560, 466, 'what we’re for', 19, gold) +
    T(50, 620, 'THE USUAL FIGHT', 22) + T(50, 650, 'is about who sits where.', 20) + T(50, 696, 'THIS IS NOT THAT.', 22) + T(50, 726, 'nobody is asked to move back.', 20) + T(50, 752, 'the job is to make the road', 20) + T(50, 778, 'go on for longer, for every seat.', 20) +
    T(50, 916, 'TWO WAYS TO LOOK AT IT', 19, soft) +
    T(68, 972, 'WHO HAS THE BEST SEAT?', 21) + T(68, 1004, 'compares people, right now.', 18) + T(68, 1052, 'long word: symmetry', 17, soft) +
    T(422, 972, 'HOW FAR DOES IT GO?', 21) + T(422, 1004, 'for everyone, for how long.', 18) + T(422, 1052, 'long word: continuity', 17, soft) +
    tb.text,
});
