// Sheet 5, the stepping stones: what a stone is worth is the ways on it leaves you, judged a step at a time.
// Propositions value-option-space and option-space-as-chess-moves (src/content/propositions.ts);
// the razor-blade note (src/content/open/NOTES-razor-blade-case.md) is why the fog says look as far as you can.
import { B, T, soft, gold, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(5, 'the stones');
const stone = ([x, y], o = '') => `<ellipse cx="${x}" cy="${y}" rx="46" ry="16"${o}/><path d="M${x - 26} ${y - 5}Q${x} ${y - 11} ${x + 22} ${y - 6}" stroke-width="2" stroke="${B.soft}"/>`;
const faint = ([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="38" ry="13" stroke="${B.soft}" stroke-width="2.2" stroke-dasharray="7 7"/>`;
// a jump: an arc from the top of one stone to the top of the next
// (from is where the jump leaves; it lands on the top of stone `to`, with a small arrowhead)
const jump = ([x1, y1], [x2, y2], o = '', c = B.ink, land = 0) => {
  const mx = (x1 + x2) / 2, my = Math.min(y1, y2 - 20) - 70, ex = x2 + land, ey = y2 - 22, a = Math.atan2(ey - my, ex - mx);
  const q = (da) => `${(ex - Math.cos(a + da) * 16).toFixed(1)} ${(ey - Math.sin(a + da) * 16).toFixed(1)}`;
  return `<path d="M${x1} ${y1}Q${mx} ${my} ${ex} ${ey}"${o}/><path d="M${q(0.5)}L${ex} ${ey}L${q(-0.5)}" stroke="${c}" stroke-width="2.6"/>`;
};
const S = [380, 850], Lt = [270, 730], R = [612, 650], A = [[130, 610], [310, 566], [430, 606]];
const far = [[180, 470], [310, 440], [130, 380], [250, 350]];
let water = ''; for (const [x, y] of [[90, 760], [520, 560], [660, 540], [600, 800], [200, 520], [540, 390], [680, 720], [70, 470], [390, 530], [670, 420], [130, 880], [620, 880], [520, 870]]) water += `M${x} ${y}q8 -7 16 0t16 0t16 0`;
// the fog: a low bank of cloud lying on the water, two rows of soft bumps
let fog = ''; for (const [y, x0, r] of [[300, 56, 34], [330, 80, 30]]) { fog += `M${x0} ${y}`; for (let x = x0; x + 2 * r <= 724; x += 2 * r) fog += ` a${r} ${r * 0.8} 0 0 1 ${2 * r} 0`; }
const person = `<circle cx="380" cy="760" r="14"/><path d="M380 775V812M380 812L368 836M380 812L392 836M380 788L360 808M380 788L402 804"/>`;
const dashW = ` stroke-dasharray="10 10" stroke-width="2.6"`, dashG = ` stroke="${B.sun}" stroke-dasharray="10 9"`;

export default sheet({
  title: 'Blueprint sheet 5, the stepping stones: a stone is worth the ways on it leaves you, judged one step at a time',
  seed: 6,
  strokes: `<path d="${water}" stroke="${B.soft}" stroke-width="2"/><path d="${fog}" stroke="${B.soft}" stroke-width="2.4"/>` +
    far.map(faint).join('') + [S, Lt, R, ...A].map((p) => stone(p)).join('') +
    `<path d="M44 912Q200 900 390 910T736 906"/>` +
    person + jump([362, 770], Lt, dashW, B.ink, 20) + jump([398, 766], R, dashW) + A.map((a) => jump([Lt[0] - 14, Lt[1] - 18], a, dashG, B.sun)).join('') +
    lead([[470, 236], [490, 256], [504, 276]]) +
    lead([[560, 510], [586, 580], [604, 636]]) +
    lead([[440, 786], [420, 790], [392, 796]]) +
    lead([[180, 786], [210, 760], [230, 738]]) +
    lead([[110, 668], [156, 640], [194, 596]]) +
    `<path d="M50 960H376V1084H50Z" stroke-width="2"/><path d="M404 960H730V1084H404Z" stroke-width="2"/>` + tb.strokes,
  text: T(50, 78, 'WHAT A STONE IS WORTH', 40) + T(50, 112, 'the ways on it leaves you, one step at a time', 25, soft) +
    T(420, 166, 'THE FOG', 22) + T(420, 194, 'nobody sees the whole river.', 19) + T(420, 218, 'look as far as you can.', 19) +
    T(440, 420, 'THE BIG JUMP', 22) + T(440, 448, 'further across.', 19) + T(440, 472, 'looks like winning.', 19) + T(440, 496, 'from here, nowhere to go.', 19) +
    T(450, 790, 'YOU ARE HERE', 20) +
    T(50, 690, 'WAYS ON', 22, gold) + T(50, 716, 'what a stone', 19, gold) + T(50, 740, 'is worth', 19, gold) +
    T(50, 808, 'THIS STONE', 21) + T(50, 834, 'not as far across.', 19) + T(50, 858, 'three ways on.', 19) +
    T(68, 996, 'HOW FAR ACROSS?', 21) + T(68, 1028, 'one score, easy to read.', 18) + T(68, 1052, 'here it picks the big jump.', 18) +
    T(422, 996, 'HOW MANY WAYS ON?', 21) + T(422, 1028, 'asked again at every step.', 18) + T(422, 1066, 'chess players think this way', 17, soft) +
    tb.text,
});
