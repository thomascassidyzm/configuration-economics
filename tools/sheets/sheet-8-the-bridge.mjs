// Sheet 8, the bridge: people just use a bridge, so ask who it reaches and what carries the rest.
// The bridge test: no campaign, no act of faith; each crossing is worth it for the one crossing, on day one.
// A bridge has a catchment; the far edge is often the people who need it most; and nobody asked the fish.
// Argued in src/content/open/NOTES-recursive-fitness-and-bridge-test.md, NOTES-ratchet-cell.md,
// src/content/propositions.ts: bridge-catchment, and Tom's aside in NOTES-worse-for-none.md §4.
import { B, T, soft, gold, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(8, 'the bridge');
const G = 620, deck = 606, water = 722, bed = 800;
const person = (x, y, s = 1) => `<circle cx="${x}" cy="${y - 44 * s}" r="${8 * s}"/><path d="M${x} ${y - 36 * s}V${y - 16 * s}M${x - 10 * s} ${y}L${x} ${y - 16 * s}L${x + 10 * s} ${y}M${x - 11 * s} ${y - 22 * s}L${x} ${y - 30 * s}L${x + 12 * s} ${y - 24 * s}" stroke-width="2.8"/>`;

// the land: a steep hill up to the far house, a short flat bank, the river, and the good land over it
const land =
  `<path d="M50 450C90 450 110 470 130 530C140 580 150 615 172 ${G}H262L282 ${water}L290 ${bed}H510L518 ${water}L538 ${G}H730"/>` +
  [580, 612, 644, 676, 708].map((x) => `<path d="M${x} ${G}l-6 -16M${x} ${G}l0 -20M${x} ${G}l6 -16" stroke-width="2" stroke="${B.soft}"/>`).join('');
let w1 = `M286 ${water}`, w2 = `M288 ${water + 26}`; for (let i = 0; i < 4; i++) { w1 += ' q14 -12 28 0 t28 0'; w2 += ' q14 -12 28 0 t28 0'; }
const river = `<path d="${w1}" stroke="${B.soft}" stroke-width="2.4"/><path d="${w2}" stroke="${B.soft}" stroke-width="2"/>` +
  `<path d="M336 776C350 762 372 762 384 776C372 790 350 790 336 776ZM336 776L320 764V788Z" stroke-width="2.6"/><circle cx="374" cy="774" r="2" fill="${B.ink}"/>`;
// the bridge, in gold: deck, rail, and one arch springing from the banks at the water
const bridge = `<g stroke="${B.sun}"><path d="M248 ${deck}H552"/><path d="M276 ${water}Q400 540 524 ${water}"/>` +
  `<path d="M256 ${deck - 20}H544" stroke-width="2.4"/>` + [256, 316, 376, 436, 496, 544].map((x) => `<path d="M${x} ${deck}V${deck - 20}" stroke-width="2.4"/>`).join('') +
  [300, 340, 460, 500].map((x) => { const t = (x - 276) / 248, y = (1 - t) * (1 - t) * water + 2 * t * (1 - t) * 540 + t * t * water; return `<path d="M${x} ${deck}V${y.toFixed(0)}" stroke-width="2.2"/>`; }).join('') + `</g>`;
// the far house on the hill, and the little cart that carries the rest down to the bridge
const house = `<path d="M62 446V418H106V446M56 420L84 398L112 420" stroke-width="2.8"/><path d="M78 446V430H90V446" stroke-width="2"/>`;
const cart = `<g transform="rotate(38 108 470)"><path d="M92 462H124V474H92Z" stroke-width="2.6"/><circle cx="98" cy="480" r="5" fill="${B.paper}" stroke-width="2.4"/><circle cx="118" cy="480" r="5" fill="${B.paper}" stroke-width="2.4"/></g>`;

const strokes = land + river + bridge + house + cart + person(360, deck) + person(452, deck) + person(206, G, 0.95) +
  lead([[80, 334], [82, 370], [84, 400]]) +
  lead([[380, 300], [398, 420], [400, 604]]) +
  lead([[536, 412], [494, 476], [458, 556]]) +
  lead([[150, 494], [130, 482], [114, 474]]) +
  lead([[640, 528], [646, 560], [644, 606]]) +
  lead([[338, 828], [344, 800], [352, 778]]) + lead([[150, 656], [180, 648], [206, 641]]) +
  `<path d="M176 640H254M176 632V648M254 632V648" stroke="${B.soft}" stroke-width="2"/>` +
  `<path d="M50 936H730V1076H50Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 8, the bridge: people just use a bridge, so ask who it reaches and what carries the rest',
  seed: 8,
  strokes,
  text: T(50, 78, 'PEOPLE JUST USE A BRIDGE', 40) + T(50, 112, 'so ask who it reaches, and what carries the rest', 24, soft) +
    T(50, 230, 'THE FAR HOUSE', 21) + T(50, 258, 'too far, too steep.', 18) + T(50, 286, 'often the ones who', 17, soft) + T(50, 308, 'need it most.', 17, soft) +
    T(330, 210, 'THE BRIDGE', 25, gold) + T(330, 240, 'nobody has to be talked into it.', 20, gold) + T(330, 266, 'people just walk over.', 20, gold) +
    T(540, 320, 'EACH PERSON', 21) + T(540, 346, 'crosses because it’s', 18) + T(540, 370, 'easier for them, today.', 18) + T(540, 400, 'no meeting. no faith.', 17, soft) +
    T(156, 430, 'WHAT CARRIES', 18) + T(156, 452, 'THE REST', 18) + T(156, 476, 'a lift, paid for,', 16, soft) + T(156, 496, 'not hoped for.', 16, soft) +
    T(584, 500, 'THE GOOD LAND', 18) +
    T(56, 674, 'WHO IT REACHES', 17, soft) + T(56, 696, 'near enough', 16, soft) + T(56, 716, 'to walk.', 16, soft) +
    T(300, 850, 'THE FISH', 21) + T(300, 876, 'nobody asked the river.', 18) + T(300, 900, 'maybe not the fish.', 17, soft) +
    T(70, 976, 'THE TEST', 21) + T(70, 1008, 'if most people have to be pushed across, it fails.', 19) +
    T(70, 1036, 'if they just use it, ask who it reaches, and what carries the rest.', 17) + T(70, 1062, 'long word: catchment', 16, soft) +
    tb.text,
});
