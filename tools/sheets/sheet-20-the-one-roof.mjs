// Sheet 20, the one roof: too small alone, so the village owns one co-op that runs them all.
// The community co-operative (cooperativa di comunità), after Giovanni Teneggi and the Apennine co-operatives,
// such as Valle dei Cavalieri at Succiso: a bar first, in the old school, then a shop, a restaurant, guest rooms
// and a flock for pecorino, all one co-operative of the people who live there.
// Sources: Teneggi and Zandonai, "The Community Enterprises of the Appennino Tosco-Emiliano UNESCO Biosphere
// Reserve" (JEOD 6:1, 2017): "multi-functional community hubs"; "Trust is the most important product";
// the closing of the bar in Succiso as the moment the village reacted. Legacoop, "Le cooperative di comunità":
// a single activity rarely pays its way in a fragile place; the needed ones are carried by others that pay better,
// often sold to a wider public than the residents. Valle dei Cavalieri's own presentation (Regione Emilia-Romagna):
// 65 people live in Succiso; the bar opened in the closed primary school; shop, restaurant, agriturismo, sheep.
// Not argued in CE; drawn as a neighbour. Not on any page yet.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(20, 'the one roof');
const G = 700; // the ground
const L = 92, R = 616, WT = 530; // the house: left and right walls, top of the walls
const bay = (R - L) / 3;
// hills and trees behind the village, soft
const hills = `<path d="M44 452C120 380 180 360 250 404C320 340 400 316 470 372C540 330 640 340 736 410" stroke="${B.soft}" stroke-width="2.4"/>` +
  [[150, 398], [190, 388], [410, 348], [600, 356], [640, 364]].map(([x, y]) => `<path d="M${x} ${y + 26}V${y + 10}M${x - 10} ${y + 14}L${x} ${y - 12}L${x + 10} ${y + 14}Z" stroke="${B.soft}" stroke-width="2"/>`).join('');
// the one roof, gold, with a chimney
const roof = `<g stroke="${B.sun}"><path d="M${L - 26} ${WT + 4}L${L + 40} 440H${R - 40}L${R + 26} ${WT + 4}Z" fill="${B.paper}"/>` +
  `<path d="M${L + 4} ${WT - 22}H${R - 4}" stroke-width="2"/><path d="M${L + 30} 484H${R - 30}" stroke-width="2"/>` +
  `<path d="M480 446V408H510V446" fill="${B.paper}"/></g>` +
  `<path d="M496 398c-10 -14 8 -22 -2 -36c-8 -12 6 -20 0 -30" stroke="${B.soft}" stroke-width="2"/>`;
// the walls, and three doors under the one roof
const door = (x) => `<path d="M${x} ${G}V${G - 88}Q${x + 22} ${G - 104} ${x + 44} ${G - 88}V${G}" stroke-width="2.8"/><circle cx="${x + 36}" cy="${G - 44}" r="2.5" fill="${B.ink}"/>`;
const win = (x, y, w = 70, h = 56) => `<path d="M${x} ${y}H${x + w}V${y + h}H${x}Z" stroke-width="2.6"/>`;
// what each window shows: a cup, loaves on a shelf, a bed
const cup = (x, y) => `<path d="M${x - 14} ${y - 10}H${x + 12}V${y + 6}Q${x + 12} ${y + 16} ${x - 1} ${y + 16}Q${x - 14} ${y + 16} ${x - 14} ${y + 6}Z" stroke-width="2.4"/><path d="M${x + 12} ${y - 4}Q${x + 22} ${y - 2} ${x + 12} ${y + 8}" stroke-width="2.2"/><path d="M${x - 6} ${y - 16}q4 -6 0 -12M${x + 4} ${y - 16}q4 -6 0 -12" stroke-width="1.8"/>`;
const loaves = (x, y) => `<path d="M${x - 28} ${y + 8}H${x + 28}" stroke-width="2.2"/>` + [-16, 2, 18].map((dx) => `<path d="M${x + dx - 9} ${y + 8}Q${x + dx - 9} ${y - 8} ${x + dx} ${y - 8}Q${x + dx + 9} ${y - 8} ${x + dx + 9} ${y + 8}" stroke-width="2.2"/>`).join('');
const bed = (x, y) => `<path d="M${x - 26} ${y + 14}V${y - 10}M${x - 26} ${y + 4}H${x + 26}V${y + 14}M${x - 26} ${y - 2}H${x + 24}" stroke-width="2.2"/><path d="M${x - 22} ${y - 4}q6 -8 14 0" stroke-width="2"/>`;
const house =
  `<path d="M${L} ${G}V${WT}M${R} ${G}V${WT}"/>` +
  [0, 1, 2].map((i) => door(L + bay * i + 24)).join('') +
  win(L + 0 * bay + 86, 584) + cup(L + 0 * bay + 121, 614) +
  win(L + 1 * bay + 86, 584) + loaves(L + 1 * bay + 121, 612) +
  win(L + 2 * bay + 86, 584) + bed(L + 2 * bay + 121, 612) +
  [1, 2].map((i) => `<path d="M${L + bay * i} ${WT + 14}V${G}" stroke="${B.soft}" stroke-width="1.6" stroke-dasharray="5 7"/>`).join('');
// the flock, beside the house
const sheep = (x, y) => {
  let o = `<path d="M${x - 30} ${y}`; const n = 7;
  for (let i = 0; i <= n; i++) { const a = Math.PI + i / n * Math.PI; o += ` A10 10 0 0 1 ${(x + Math.cos(a) * 30).toFixed(1)} ${(y + Math.sin(a) * 18).toFixed(1)}`; }
  o += ` Q${x + 30} ${y + 18} ${x} ${y + 18} Q${x - 30} ${y + 18} ${x - 30} ${y}"/>`;
  return o + `<ellipse cx="${x + 36}" cy="${y - 2}" rx="10" ry="8" stroke-width="2.6"/><path d="M${x - 16} ${y + 18}V${y + 34}M${x - 6} ${y + 18}V${y + 34}M${x + 10} ${y + 18}V${y + 34}M${x + 20} ${y + 18}V${y + 34}" stroke-width="2.6"/>`;
};
const flock = sheep(668, 666) + `<g transform="translate(692 384) scale(0.42) translate(-692 -384)" stroke-width="5">${sheep(692, 384)}</g>`;
// one person at the shop door
const person = (x, y) => `<circle cx="${x}" cy="${y - 44}" r="8"/><path d="M${x} ${y - 36}V${y - 16}M${x - 10} ${y}L${x} ${y - 16}L${x + 10} ${y}M${x - 11} ${y - 22}L${x} ${y - 30}L${x + 12} ${y - 24}M${x + 14} ${y}L${x + 12} ${y - 24}" stroke-width="2.8"/>`;

const strokes =
  hills + roof + house + flock + person(L + bay + 92 + 60, G) +
  `<path d="M44 ${G}H736"/>` + [60, 640, 712].map((x) => `<path d="M${x} ${G}l-5 -12M${x + 8} ${G}l3 -14" stroke-width="2" stroke="${B.soft}"/>`).join('') +
  lead([[120, 252], [150, 330], [200, 460]]) + // one roof
  lead([[664, 262], [664, 450], [668, 654]]) + // the flock
  lead([[80, 746], [100, 722], [L + 46, G - 40]]) + // the bar
  lead([[330, 746], [320, 722], [L + bay + 46, G - 40]]) + // the shop
  lead([[566, 746], [526, 722], [L + 2 * bay + 46, G - 40]]) + // the beds
  `<path d="M50 920H376V1090H50Z" stroke-width="2"/><path d="M404 920H730V1090H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 20, the one roof: too small alone, so the village owns one co-op that runs them all (after Giovanni Teneggi and the community co-operatives of the Apennines)',
  seed: 11,
  strokes,
  text: T(50, 78, 'TOO SMALL ALONE', 40) + T(50, 112, 'so the village owns one co-op that runs them all', 25, soft) +
    T(50, 196, 'ONE ROOF', 25, gold) + T(50, 224, 'one co-op, owned by', 20, gold) + T(50, 248, 'the people who live here.', 20, gold) +
    T(470, 196, 'THE FLOCK', 22) + T(470, 224, 'cheese to sell.', 19) + T(470, 248, 'an old trade kept.', 19) +
    T(50, 778, 'THE BAR', 22) + T(50, 806, 'where it began:', 18) + T(50, 830, 'the village square.', 18) +
    T(290, 778, 'THE SHOP', 22) + T(290, 806, 'too few buyers to', 18) + T(290, 830, 'pay its own way.', 18) +
    T(520, 778, 'THE BEDS', 22) + T(520, 806, 'visitors pay well,', 18) + T(520, 830, 'and help carry the rest.', 18) +
    T(50, 884, 'the old saying: l’unione fa la forza. together, we are strong.', 17, soft) +
    T(68, 956, 'EACH ON ITS OWN', 21) + T(68, 988, 'too few people for a', 18) + T(68, 1014, 'shop, a bar and beds to', 18) + T(68, 1040, 'pay their way. one shuts,', 18) + T(68, 1066, 'then the next.', 18) +
    T(422, 956, 'ALL UNDER ONE ROOF', 21) + T(422, 988, 'one co-op, one team.', 18) + T(422, 1014, 'the busy parts carry', 18) + T(422, 1040, 'the quiet ones.', 18) + T(422, 1072, 'long word: a many-purpose co-op', 15, soft) +
    T(50, 1126, '“trust is the most important', 16, soft) + T(50, 1148, 'product.” Teneggi and Zandonai', 16, soft) +
    T(50, 1176, 'after Giovanni Teneggi and the', 14, soft) + T(50, 1194, 'community co-ops of the Apennines', 14, soft) +
    tb.text,
});
