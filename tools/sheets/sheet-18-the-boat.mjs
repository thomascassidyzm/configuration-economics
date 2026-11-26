// Sheet 18, the boat: a company that belongs to what it is for. After the Purpose network (steward-ownership).
// Purpose's two principles: self-governance (control stays with stewards, people active in or closely connected to
// the company's mission; control can never be sold or inherited like an asset, only passed to another steward) and
// profits serve purpose (profits are reinvested, used to repay capital, shared with stakeholders or donated;
// founders and investors get a fair return). The company "belongs to itself and its purpose".
// Sources read: Purpose Foundation, "Steward-ownership: a short guidebook to legal frameworks" (2021,
// purpose-economy.org), pp. 4-6 and the Bosch case; purpose-economy.org/en/whats-steward-ownership/
// (which names Zeiss, Bosch and Carlsberg among its examples).
// Not CE's argument: the sheet shows their idea only.
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(18, 'the boat');
const DK = 700; // the deck
const MX = 420; // the mast
// the hull: square stern on the left, pointed bow on the right
const hull = `<path d="M96 ${DK}L700 ${DK - 14}C680 ${DK + 40} 650 ${DK + 86} 590 ${DK + 98}H170C130 ${DK + 90} 112 ${DK + 60} 104 ${DK + 4}Z" fill="${B.paper}"/>` +
  `<path d="M104 ${DK + 22}L690 ${DK + 8}" stroke-width="2"/>`;
// the sea, with the hull sitting in it
let wave = ''; for (let i = 0; i < 11; i++) wave += ` q15 -12 30 0 t30 0`;
const sea = `<path d="M44 ${DK + 82}${wave}" stroke="${B.soft}" stroke-width="2.4"/><path d="M60 ${DK + 116}${wave.slice(0, wave.length * 0.92)}" stroke="${B.soft}" stroke-width="2"/>`;
// the mast with its stays, and the flag at the top in gold: what the boat is for
const FT = 250;
const mast = `<path d="M${MX} ${DK}V${FT - 4}"/>`;
const flag = `<path d="M${MX + 2} ${FT}C${MX + 36} ${FT - 10} ${MX + 60} ${FT + 14} ${MX + 96} ${FT + 6}C${MX + 80} ${FT + 22} ${MX + 86} ${FT + 34} ${MX + 92} ${FT + 46}C${MX + 60} ${FT + 52} ${MX + 34} ${FT + 30} ${MX + 2} ${FT + 42}" stroke="${B.sun}" fill="${B.paper}"/>`;
// the wheel at the stern, on its post
const WX = 236, WY = DK - 80, WR = 32;
let spokes = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; spokes += `M${WX + Math.cos(a) * 6} ${WY + Math.sin(a) * 6}L${WX + Math.cos(a) * (WR + 12)} ${WY + Math.sin(a) * (WR + 12)}`; }
const wheel = `<path d="M${WX - 8} ${DK}L${WX - 4} ${WY + 20}M${WX + 8} ${DK}L${WX + 4} ${WY + 20}" stroke-width="2.6"/><circle cx="${WX}" cy="${WY}" r="${WR}" fill="${B.paper}"/><circle cx="${WX}" cy="${WY}" r="6"/><path d="${spokes}" stroke-width="2.6"/>`;
// two people: the steerer letting go, and the next steerer taking hold
const body = (x, arms) => `<circle cx="${x}" cy="${DK - 108}" r="14"/><path d="M${x} ${DK - 94}V${DK - 44}L${x - 14} ${DK}M${x} ${DK - 44}L${x + 14} ${DK}${arms}"/>`;
const A = 168, Bx = 312;
const steerer = body(A, `M${A} ${DK - 78}L${WX - WR - 8} ${WY - 10}M${A} ${DK - 78}L${A - 24} ${DK - 52}`);
const next = body(Bx, `M${Bx} ${DK - 78}L${WX + WR + 10} ${WY + 6}M${Bx} ${DK - 78}L${Bx + 22} ${DK - 54}`);
// the catch: a crate of fish on the deck near the bow
const CL = 520, CR = 610, CT = DK - 46;
const fish = (x, y) => `<path d="M${x} ${y}q14 -10 28 0q-14 10 -28 0M${x + 28} ${y}l8 -6v12z" stroke-width="2"/>`;
const crate = [[CL + 8, CT - 2], [CL + 44, CT - 6], [CL + 24, CT - 14]].map(([x, y]) => fish(x, y)).join('') +
  `<path d="M${CL} ${CT}H${CR}V${DK - 6}H${CL}Z" fill="${B.paper}"/><path d="M${CL} ${CT + 20}H${CR}" stroke-width="2"/>`;

const strokes =
  sea + mast + hull + flag + wheel + steerer + next + crate +
  lead([[300, 232], [360, 252], [MX + 40, FT + 14]]) + // what it is for
  lead([[300, 350], [296, 450], [WX + 16, WY - 28]]) + // the wheel
  lead([[80, 486], [110, 540], [A - 3, DK - 72]]) + // the steward
  lead([[500, 446], [400, 470], [Bx + 8, DK - 112]]) + // handed on
  lead([[484, 510], [494, 566], [CL + 16, CT + 12]]) + // the catch
  `<path d="M50 926H376V1060H50Z" stroke-width="2"/><path d="M404 926H730V1060H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 18, the boat: a company that belongs to what it is for. After the Purpose network, steward-ownership',
  seed: 3,
  strokes,
  text: T(50, 78, 'A COMPANY THAT BELONGS', 40) + T(50, 112, 'to what it is for, not to whoever can buy it', 25, soft) +
    T(50, 178, 'WHAT IT IS FOR', 22, gold) + T(50, 206, 'the boat belongs to its work,', 19, gold) + T(50, 230, 'not to anyone’s pocket.', 19, gold) +
    T(50, 300, 'THE WHEEL', 22) + T(50, 328, 'steered by people who', 19) + T(50, 352, 'work for what it is for.', 19) +
    T(50, 424, 'THE STEWARD', 22) + T(50, 452, 'looks after the boat', 19) + T(50, 476, 'for a while, then lets go.', 19) +
    T(500, 330, 'HANDED ON', 22) + T(500, 358, 'to the next steerer,', 19) + T(500, 382, 'chosen to carry on', 19) + T(500, 406, 'the work. never sold,', 19) + T(500, 430, 'never handed down.', 19) +
    T(500, 478, 'THE CATCH', 21) + T(500, 504, 'goes back into the work,', 18) + T(500, 528, 'the crew, a good cause.', 18) + T(500, 552, 'lenders get a fair share.', 18) +
    T(MX - 40, DK + 66, 'NOT FOR SALE', 20, { anchor: 'middle' }) +
    T(MX - 40, DK + 160, 'nobody can buy the boat to cash it in.', 19, { anchor: 'middle' }) +
    T(68, 960, 'OWNED AS A THING', 20) + T(68, 988, 'bought, sold, handed down.', 18) + T(68, 1014, 'the money goes to the owner.', 18) +
    T(422, 960, 'HELD FOR ITS PURPOSE', 20) + T(422, 988, 'its stewards look after it,', 18) + T(422, 1014, 'then pass it on.', 18) + T(422, 1046, 'long word: steward-ownership', 15, soft) +
    T(50, 1128, 'the old saying: leave it better than you found it.', 16, soft) + T(50, 1158, 'after the Purpose network. for example:', 16, soft) + T(50, 1182, 'Zeiss, Bosch, Carlsberg', 16, soft) +
    tb.text,
});
