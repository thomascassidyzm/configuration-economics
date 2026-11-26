// Sheet 17, the chain: the good of all is multiplied, not added up. After Stefano Zamagni, with Luigino Bruni (civil economy).
// Zamagni: the total good is an addition, where one person's good can be cancelled out if someone else gains more;
// the common good is a multiplication, where cancelling out just one factor reduces the whole product to zero, so
// nobody's good can be traded away. Reciprocity: a relation valued for itself, not as a means; relational goods
// exist only between people who know who the other is.
// Sources read: S. Zamagni, "The common good as principle for business" (ordosocialis.de), §2;
// S. Zamagni, "Reciprocity, civil economy, common good" (ordosocialis.de), §3.
// Not CE's argument: the sheet shows their idea only. CE's relation is in src/pages/lineage.astro (Bruni and Zamagni).
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(17, 'the chain');
const CX = 390, TOP = 236, LK = 46; // chain centre line, where it hangs from, link pitch
const N = 9, WEAK = 4; // links, and which one is worn thin
// the branch it hangs from, with a few leaves
const leaf = (x, y, a) => `<path d="M${x} ${y}q${12 * Math.cos(a) - 8 * Math.sin(a)} ${12 * Math.sin(a) + 8 * Math.cos(a)} ${24 * Math.cos(a)} ${24 * Math.sin(a)}q${-12 * Math.cos(a) - 8 * Math.sin(a) * -1} ${-12 * Math.sin(a) - 8 * Math.cos(a) * -1} ${-24 * Math.cos(a)} ${-24 * Math.sin(a)}" stroke-width="2.2"/>`;
const branch = `<path d="M44 ${TOP - 4}C160 ${TOP - 20} 300 ${TOP - 2} ${CX + 90} ${TOP - 18}C${CX + 140} ${TOP - 26} ${CX + 180} ${TOP - 46} ${CX + 210} ${TOP - 70}"/>` +
  `<path d="M44 ${TOP + 22}C160 ${TOP + 8} 300 ${TOP + 24} ${CX + 80} ${TOP + 6}C${CX + 130} ${TOP - 2} ${CX + 170} ${TOP - 24} ${CX + 214} ${TOP - 52}"/>` +
  `<path d="M${CX + 120} ${TOP - 18}l30 -40M${CX + 150} ${TOP - 58}l24 -10" stroke-width="2.6"/>` +
  [[CX + 174, TOP - 68, -0.4], [CX + 150, TOP - 60, -1.9], [CX + 214, TOP - 64, -1.1], [140, TOP - 14, -2.2], [230, TOP - 12, -1.0]].map(([x, y, a]) => leaf(x, y, a)).join('');
// the chain: links alternate face-on (an oval) and side-on (a narrow bar); one is worn thin and cracked
const linkY = (i) => TOP + 26 + i * LK;
let chain = `<path d="M${CX - 10} ${TOP + 8}Q${CX} ${TOP - 6} ${CX + 10} ${TOP + 8}" stroke-width="3"/>`;
for (let i = 0; i < N; i++) {
  const y = linkY(i);
  if (i === WEAK) chain += `<path d="M${CX - 3} ${y - 27}C${CX - 24} ${y - 26} ${CX - 24} ${y + 26} ${CX} ${y + 27}C${CX + 24} ${y + 26} ${CX + 24} ${y - 8} ${CX + 15} ${y - 14}" stroke-width="1.5"/>` +
    `<path d="M${CX + 8} ${y - 24}l8 -8M${CX + 18} ${y - 20}l12 -2M${CX + 12} ${y - 28}l2 -12" stroke-width="1.8"/>`;
  else if (i % 2 === 0) chain += `<ellipse cx="${CX}" cy="${y}" rx="17" ry="27" stroke-width="3.6"/>`;
  else chain += `<path d="M${CX - 4} ${y - 28}V${y + 28}M${CX + 4} ${y - 28}V${y + 28}M${CX - 4} ${y - 28}Q${CX} ${y - 34} ${CX + 4} ${y - 28}M${CX - 4} ${y + 28}Q${CX} ${y + 34} ${CX + 4} ${y + 28}" stroke-width="3"/>`;
}
const chainEnd = linkY(N - 1) + 26;
// the tyre swing, hanging upright from the chain
const TY = chainEnd + 70;
const tyre = `<path d="M${CX} ${chainEnd - 4}V${TY - 62}"/><ellipse cx="${CX}" cy="${TY}" rx="86" ry="66" fill="${B.paper}"/><ellipse cx="${CX}" cy="${TY + 2}" rx="44" ry="30"/>` +
  [-2.2, -1.5, 1.5, 2.2].map((k) => `<path d="M${CX + Math.sin(k) * 62} ${TY - Math.cos(k) * 46}L${CX + Math.sin(k) * 80} ${TY - Math.cos(k) * 60}" stroke-width="2"/>`).join('');
// a child on the ground, reaching up to the tyre
const GY = 900, KX = 250;
const child = `<circle cx="${KX}" cy="${GY - 92}" r="15"/><path d="M${KX} ${GY - 77}V${GY - 36}L${KX - 13} ${GY}M${KX} ${GY - 36}L${KX + 13} ${GY}M${KX} ${GY - 64}L${KX + 34} ${GY - 98}L${CX - 88} ${TY - 10}M${KX} ${GY - 64}L${KX - 22} ${GY - 44}"/>`;
const ground = `<path d="M60 ${GY}H720"/>` + [100, 160, 560, 640, 700].map((x) => `<path d="M${x} ${GY}l-5 -12M${x + 8} ${GY}l3 -14" stroke-width="2" stroke="${B.soft}"/>`).join('');

const strokes =
  branch + ground + `<g stroke="${B.sun}">${chain}</g>` + tyre + child +
  lead([[560, linkY(1) + 6], [500, linkY(1) + 10], [CX + 17, linkY(2) - 4]]) + // each link
  lead([[236, linkY(3) - 14], [300, linkY(3) - 14], [CX - 4, linkY(3) + 10]]) + // the hold
  lead([[560, linkY(WEAK) + 60], [490, linkY(WEAK) + 50], [CX + 20, linkY(WEAK) + 10]]) + // one worn link
  lead([[260, linkY(7) + 16], [310, linkY(7) + 10], [CX - 4, linkY(7)]]) + // the whole chain
  lead([[560, TY - 6], [520, TY + 4], [CX + 85, TY + 12]]) + // the swing
  `<path d="M50 984H376V1092H50Z" stroke-width="2"/><path d="M404 984H730V1092H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 17, the chain: the good of all is multiplied, not added up. After Stefano Zamagni, with Luigino Bruni',
  seed: 9,
  strokes,
  text: T(50, 78, 'THE GOOD OF ALL IS MULTIPLIED', 37) + T(50, 112, 'not added up: leave anyone at nothing, and it comes to nothing', 22, soft) +
    T(570, linkY(1) - 4, 'EACH LINK', 22) + T(570, linkY(1) + 22, 'one person,', 19) + T(570, linkY(1) + 46, 'one family.', 19) +
    T(50, linkY(3) - 70, 'THE HOLD', 22) + T(50, linkY(3) - 42, 'each link holds the next', 19) + T(50, linkY(3) - 18, 'and is held by it.', 19) + T(50, linkY(3) + 12, 'you can swap a shop.', 17, soft) + T(50, linkY(3) + 34, 'you can’t swap a friend.', 17, soft) +
    T(570, linkY(WEAK) + 56, 'ONE LINK', 22) + T(570, linkY(WEAK) + 80, 'AT NOTHING', 22) + T(570, linkY(WEAK) + 108, 'and the swing', 19) + T(570, linkY(WEAK) + 132, 'falls, however', 19) + T(570, linkY(WEAK) + 156, 'strong the rest.', 19) +
    T(50, linkY(7) - 4, 'THE WHOLE CHAIN', 22, gold) + T(50, linkY(7) + 24, 'everyone’s good,', 19, gold) + T(50, linkY(7) + 48, 'multiplied.', 19, gold) +
    T(570, TY - 12, 'THE SWING', 22) + T(570, TY + 14, 'what it holds', 19) + T(570, TY + 38, 'up for all.', 19) +
    T(50, 950, 'the old saying: a chain is only as strong as its weakest link.', 17, soft) +
    T(68, 1018, 'ADDING UP', 20) + T(68, 1046, 'take from one, give more to', 17) + T(68, 1068, 'another, and the sum still grows.', 17) + T(240, 1018, 'total good', 15, soft) +
    T(422, 1018, 'MULTIPLYING', 20) + T(422, 1046, 'nobody’s good can be traded', 17) + T(422, 1068, 'away for someone else’s.', 17) + T(600, 1018, 'common good', 15, soft) +
    T(50, 1146, 'after Stefano Zamagni,', 16, soft) + T(50, 1168, 'with Luigino Bruni:', 16, soft) + T(50, 1190, 'the civil economy', 16, soft) +
    tb.text,
});
