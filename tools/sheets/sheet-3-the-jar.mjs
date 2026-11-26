// Sheet 3, the jar: the sun is pay that comes every day; coal, oil and gas are savings you can spend once.
// Proposition energy-income-inheritance (src/content/propositions.ts).
import { B, T, soft, gold, lead, dim, sun, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(3, 'the jar');
const G = 610; // the ground
// the house: walls, roof, door, two windows
const house = `<path d="M182 ${G}V482H418V${G}"/><path d="M160 484L300 386L440 484"/>` +
  `<path d="M282 ${G}V544H318V${G}" stroke-width="2.4"/><path d="M204 512H252V552H204Z" stroke-width="2.4"/><path d="M348 512H396V552H348Z" stroke-width="2.4"/>`;
// under the ground: soft hatching, then the jar of old sunshine with a pipe down into it
let hatch = ''; for (let x = 60; x < 730; x += 34) if (x > 520) hatch += `M${x} ${G + 10}l-14 18`;
const jar = `<path d="M300 660V700Q300 730 222 750Q172 764 172 810V928Q172 970 212 970H448Q488 970 488 928V810Q488 764 438 750Q360 730 360 700V660"/><path d="M288 660H372" stroke-width="4"/>`;
const pipe = `<path d="M322 ${G}V944M338 ${G}V944" stroke-width="2.6"/>`;
let level = 'M176 880'; for (let x = 176; x < 316; x += 20) level += ` q5 -5 10 0 t10 0`;
let level2 = 'M344 880'; for (let x = 344; x < 484; x += 20) level2 += ` q5 -5 10 0 t10 0`;
const lumps = [[200, 910], [236, 940], [270, 905], [394, 920], [430, 946], [458, 902], [220, 952], [372, 950]].map(([x, y]) => `<path d="M${x} ${y}l9 -6 8 5 -3 8 -10 2Z" stroke-width="2" stroke="${B.soft}"/>`).join('');
const SUN = [640, 322];

export default sheet({
  title: 'Blueprint sheet 3, the jar: the sun is pay that comes every day; coal, oil and gas are savings you can spend once',
  strokes: house + `<path d="M44 ${G}H736"/><path d="${hatch}" stroke="${B.soft}" stroke-width="2"/>` + jar + pipe +
    `<path d="M186 776H474" stroke="${B.soft}" stroke-width="2" stroke-dasharray="8 9"/>` +
    `<path d="${level}" stroke-width="2.6"/><path d="${level2}" stroke-width="2.6"/>` + lumps +
    sun(...SUN, [[372, 432], [424, 476]]) +
    dim(146, 782, 876) +
    lead([[560, 266], [596, 282], [616, 298]]) +
    lead([[200, 650], [262, 652], [322, 652]]) +
    lead([[152, 762], [170, 768], [196, 776]]) +
    lead([[524, 660], [502, 690], [486, 806]]) +
    lead([[526, 930], [500, 930], [476, 884]]) +
    `<path d="M50 1012H360V1196H50Z" stroke-width="2.4"/>` + tb.strokes,
  text: T(50, 78, 'THE SUN IS PAY', 40) + T(50, 112, 'coal, oil and gas are savings: they spend once', 25, soft) +
    T(440, 170, 'THE SUN', 25, gold) + T(440, 198, 'comes again every day.', 20, gold) + T(440, 224, 'use it today, and', 20, gold) + T(440, 250, 'more comes tomorrow.', 20, gold) +
    T(50, 646, 'THE PIPE', 21) + T(50, 672, 'the house runs', 19) + T(50, 696, 'on both at once', 19) +
    T(56, 758, 'full, once', 18, soft) +
    T(532, 666, 'THE JAR', 22) + T(532, 694, 'old sunshine: plants', 19) + T(532, 718, 'from long, long ago,', 19) + T(532, 742, 'pressed into coal,', 19) + T(532, 766, 'oil and gas.', 19) +
    T(532, 790, 'took millions of', 19) + T(532, 814, 'years to fill.', 19) + T(532, 848, 'long word: inheritance', 17, soft) + T(52, 806, 'used up in', 17, soft) + T(52, 828, 'about two', 17, soft) + T(52, 850, 'hundred', 17, soft) + T(52, 872, 'years', 17, soft) +
    T(536, 936, 'THE LEVEL', 21) + T(536, 962, 'only goes down.', 19) + T(536, 986, 'nothing tops it up.', 19) +
    T(68, 1050, 'THE MIX-UP', 22) + T(68, 1086, 'on the bill, both look', 20) + T(68, 1112, 'like pay coming in.', 20) +
    T(68, 1148, 'one comes back tomorrow.', 18, soft) + T(68, 1174, 'one does not.', 18, soft) +
    tb.text,
});
