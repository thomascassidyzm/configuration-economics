// Sheet 24, the bicycle: what a bike is worth is what it lets this person do.
// After Amartya Sen, the capability approach (Commodities and Capabilities, 1985; Development as Freedom, 1999):
// judge how well off someone is by what they are actually able to do and be, not by what they own or earn.
// The bike is Sen's own example. A lineage sheet: it draws his idea, not CE's.
// Lineage: src/pages/lineage.astro; nearest CE propositions value-option-space and observer-relative-option-space.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(24, 'the bicycle');
const G = 744; // the road
// the bike, side on, facing right
const RW = [170, 684], FW = [410, 684], R = 58, BB = [280, 684];
const ST = [254, 590], HT = [386, 588]; // top of the seat tube, top of the head tube
const wheel = ([x, y]) => `<circle cx="${x}" cy="${y}" r="${R}"/><circle cx="${x}" cy="${y}" r="5"/>` +
  [0, 1, 2, 3, 4, 5].map((k) => { const a = k * Math.PI / 6; return `<path d="M${x + Math.cos(a) * 8} ${y + Math.sin(a) * 8}L${x + Math.cos(a) * (R - 3)} ${y + Math.sin(a) * (R - 3)}M${x - Math.cos(a) * 8} ${y - Math.sin(a) * 8}L${x - Math.cos(a) * (R - 3)} ${y - Math.sin(a) * (R - 3)}"/>`; }).join('');
const bike = `<g stroke-width="2.2">${wheel(RW)}${wheel(FW)}</g>` +
  `<path d="M${RW[0]} ${RW[1]}L${BB[0]} ${BB[1]}L${ST[0]} ${ST[1]}L${RW[0]} ${RW[1]}"/>` + // back triangle
  `<path d="M${ST[0]} ${ST[1]}L${HT[0]} ${HT[1]}L${BB[0]} ${BB[1]}"/><path d="M${HT[0]} ${HT[1]}L${FW[0]} ${FW[1]}"/>` + // front triangle and fork
  `<path d="M${ST[0] - 6} ${ST[1] - 2}L${ST[0] - 8} ${ST[1] - 14}M${ST[0] - 32} ${ST[1] - 16}H${ST[0] + 16}" stroke-width="4"/>` + // saddle
  `<path d="M${HT[0]} ${HT[1]}L${HT[0] - 4} ${HT[1] - 22}Q${HT[0] + 22} ${HT[1] - 34} ${HT[0] + 26} ${HT[1] - 14}"/>` + // handlebar
  `<circle cx="${BB[0]}" cy="${BB[1]}" r="12" stroke-width="2.4"/><path d="M${BB[0] + 8} ${BB[1] + 9}l14 18h14" stroke-width="2.6"/>`; // pedal
// the rider: this person, on the bike
const HD = [322, 510];
const rider = `<circle cx="${HD[0]}" cy="${HD[1]}" r="16"/>` +
  `<path d="M${HD[0] - 6} ${HD[1] + 16}L${ST[0] - 4} ${ST[1] - 20}"/>` + // back, down to the saddle
  `<path d="M${HD[0] - 10} ${HD[1] + 32}L${HT[0] + 20} ${HT[1] - 22}"/>` + // arm to the bar
  `<path d="M${ST[0] - 2} ${ST[1] - 20}L${BB[0] + 44} ${BB[1] - 54}L${BB[0] + 30} ${BB[1] + 26}"/>`; // leg to the pedal
// the roads it opens: from the road ahead, branching to places she could go. one taken today (solid), the rest open (dashed)
const F = [512, G - 4];
const ends = { school: [688, 600], work: [662, 452], friend: [596, 318] };
const branch = (e, bend) => `M${F[0]} ${F[1]}Q${(F[0] + e[0]) / 2 + bend[0]} ${(F[1] + e[1]) / 2 + bend[1]} ${e[0]} ${e[1]}`;
const arrow = ([x, y], a) => `<path d="M${x + Math.cos(a + 0.5) * 16} ${y + Math.sin(a + 0.5) * 16}L${x} ${y}L${x + Math.cos(a - 0.5) * 16} ${y + Math.sin(a - 0.5) * 16}"/>`;
const roads = `<g stroke="${B.sun}"><path d="M${FW[0] + R + 8} ${G}H${F[0]}" stroke-width="${B.sw * 1.1}"/>` +
  `<path d="${branch(ends.school, [40, 50])}" stroke-dasharray="12 9"/>` + arrow(ends.school, 1.75) +
  `<path d="${branch(ends.work, [30, 60])}"/>` + arrow(ends.work, 1.45) +
  `<path d="${branch(ends.friend, [-20, 40])}" stroke-dasharray="12 9"/>` + arrow(ends.friend, 1.5) + `</g>`;

const strokes =
  `<path d="M50 ${G}H730"/>` + [90, 330, 600].map((x) => `<path d="M${x} ${G + 14}h26" stroke="${B.soft}" stroke-width="2"/>`).join('') +
  bike + rider + roads +
  lead([[90, 500], [110, 570], [(ST[0] + RW[0]) / 2 + 2, (ST[1] + RW[1]) / 2]]) + // the bike (dot on the back of the frame)
  lead([[170, 252], [260, 380], [HD[0] - 8, HD[1] - 14]]) + // this person
  lead([[560, 252], [520, 420], [553, 520]]) + // what it lets her do (dot on the road to school)
  lead([[230, 812], [210, 790], [200, G]]) + // the road
  `<path d="M50 896H376V1090H50Z" stroke-width="2"/><path d="M404 896H730V1090H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 24, the bicycle: what a bike is worth is what it lets this person do (after Amartya Sen)',
  seed: 3,
  strokes,
  text: T(50, 78, 'WHAT A BIKE IS WORTH', 40) + T(50, 112, 'is what it lets this person do and be', 25, soft) +
    T(440, 186, 'WHAT IT LETS HER DO', 22, gold) + T(440, 214, 'the places it can take her.', 19, gold) + T(440, 238, 'this is what it is worth.', 19, gold) +
    T(50, 186, 'THIS PERSON', 22) + T(50, 212, 'can she ride? is it', 19) + T(50, 236, 'safe for her to ride?', 19) +
    T(ends.school[0], ends.school[1] - 22, 'school', 18, { ...gold, anchor: 'middle' }) + T(ends.work[0] - 6, ends.work[1] - 22, 'work: today', 18, { ...gold, anchor: 'middle' }) + T(ends.friend[0], ends.friend[1] - 22, 'a friend', 18, { ...gold, anchor: 'middle' }) +
    T(50, 420, 'THE BIKE', 22) + T(50, 446, 'what she owns.', 19) + T(50, 470, 'easy to count.', 19) +
    T(244, 832, 'THE ROAD', 21) + T(244, 858, 'no road, no ride: what is round her counts too.', 17) +
    T(68, 932, 'WHAT YOU HAVE', 21) + T(68, 964, 'money and things.', 18) + T(68, 990, 'they matter for what', 18) + T(68, 1014, 'they let you do.', 18) + T(68, 1050, 'the same bike, to someone', 17, soft) + T(68, 1072, 'who cannot ride: worth little.', 17, soft) +
    T(422, 932, 'WHAT YOU CAN DO AND BE', 21) + T(422, 964, 'the real choices open to you.', 18) + T(422, 990, 'you take one road today;', 18) + T(422, 1014, 'having the others counts too.', 18) + T(422, 1072, 'long word: capabilities', 16, soft) +
    T(50, 1132, 'the old saying: money isn’t everything.', 17, soft) + T(50, 1166, 'after Amartya Sen,', 18, soft) + T(50, 1190, 'Development as Freedom, 1999', 15, soft) +
    tb.text,
});
