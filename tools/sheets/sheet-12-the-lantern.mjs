// Sheet 12, the lantern: you can only see the ground near you, so choose the next step from here, then look again.
// The next best step is not the highest ground in sight; it is the one with the most ground left round it, clear of the edge.
// Propositions option-space-as-chess-moves and viable-objective (src/content/propositions.ts);
// after Dave Snowden: start journeys with a sense of direction rather than a goal (cynefin.io, Vector theory of change).
import { B, T, soft, gold, d, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(12, 'the lantern');
// the pool of lantern light on the ground, seen a little from above
const P = { x: 390, y: 620, rx: 250, ry: 160 };
// where the next step lands, and the light that will come with you there
const STEP = [420, 532], NEXT = { x: 420, y: 532, rx: 140, ry: 98 };
// the little hill: rings of equal height, like on a walking map
const H = [228, 652];
const hill = [[66, 40], [44, 26], [22, 12]].map(([rx, ry]) => `<ellipse cx="${H[0]}" cy="${H[1]}" rx="${rx}" ry="${ry}"/>`).join('') + `<path d="M${H[0]} ${H[1]}V${H[1] - 30}l18 6 -18 6" stroke-width="2.6"/>`;
// the edge: the ground stops, with the drop shown as short strokes falling away from it
const edgePts = []; for (let i = 0; i <= 12; i++) { const u = i / 12, v = 1 - u; edgePts.push([v * v * 538 + 2 * u * v * 622 + u * u * 540 + Math.sin(u * 11) * 4, v * v * 504 + 2 * u * v * 616 + u * u * 744]); }
let drop = ''; for (let i = 1; i < 12; i++) { const [x, y] = edgePts[i]; drop += `M${(x + 5).toFixed(1)} ${y.toFixed(1)}l16 14`; }
// the fog: low clouds lying round the outside of the light
const cloud = (x, y, n, r = 22) => { let o = `M${x} ${y}`; for (let i = 0; i < n; i++) o += ` a${r} ${r * 0.8} 0 0 1 ${2 * r} 0`; return o; };
const fog = [cloud(70, 300, 4), cloud(96, 326, 3), cloud(552, 318, 4), cloud(578, 344, 3), cloud(56, 540, 2), cloud(660, 560, 1, 26), cloud(62, 760, 1, 24), cloud(670, 780, 1, 24)].join('');
// the walker, holding a lantern up on the right
const person = `<circle cx="390" cy="664" r="14"/><path d="M390 679V716M390 716L378 744M390 716L402 744M390 692L370 714M390 692L414 678L426 654"/>` +
  `<path d="M418 662H436V684H418Z" fill="${B.paper}" stroke-width="2.6"/><path d="M421 662Q427 650 433 662" stroke-width="2.2"/>` +
  `<path d="M446 662l12 -6M448 674h13M446 686l12 6" stroke="${B.soft}" stroke-width="2"/>`;
// the next step: a gold arrow from the walker's feet to open ground, with a mark where it lands
const a = Math.atan2(STEP[1] + 10 - 640, STEP[0] - 388), ex = STEP[0], ey = STEP[1] + 10;
const tip = (da) => `${(ex - Math.cos(a + da) * 16).toFixed(1)} ${(ey - Math.sin(a + da) * 16).toFixed(1)}`;
const step = `<g stroke="${B.sun}"><path d="M392 642Q396 588 ${ex} ${ey}" stroke-dasharray="10 9"/><path d="M${tip(0.5)}L${ex} ${ey}L${tip(-0.5)}"/>` +
  `<ellipse cx="${STEP[0]}" cy="${STEP[1]}" rx="20" ry="8" stroke-width="2.6"/></g>`;
// a few tufts of grass on the open ground
let grass = ''; for (const [x, y] of [[330, 500], [470, 498], [500, 590], [300, 700], [470, 720], [520, 650], [345, 560]]) grass += `M${x} ${y}l4 -9M${x + 6} ${y}l0 -11M${x + 12} ${y}l-4 -9`;

const strokes =
  `<path d="${fog}" stroke="${B.soft}" stroke-width="2.3"/>` +
  `<ellipse cx="${P.x}" cy="${P.y}" rx="${P.rx}" ry="${P.ry}" stroke="${B.soft}" stroke-width="2.4"/>` +
  `<ellipse cx="${NEXT.x}" cy="${NEXT.y}" rx="${NEXT.rx}" ry="${NEXT.ry}" stroke="${B.soft}" stroke-width="2.2" stroke-dasharray="8 9"/>` +
  `<path d="${grass}" stroke="${B.soft}" stroke-width="2"/>` +
  hill + `<path d="${d(edgePts)}"/><path d="${drop}" stroke-width="2.4"/>` +
  person + step +
  lead([[110, 250], [124, 276], [138, 296]]) + // the fog
  lead([[470, 252], [436, 330], [NEXT.x + 10, NEXT.y - NEXT.ry]]) + // look again
  lead([[236, 452], [320, 500], [STEP[0] - 20, STEP[1]]]) + // the next best step
  lead([[150, 830], [196, 720], [H[0], H[1] + 6]]) + // the little hill
  lead([[520, 830], [570, 780], edgePts[10]]) + // the edge
  lead([[372, 794], [380, 760], [386, 724]]) + // you are here
  `<path d="M50 940H376V1084H50Z" stroke-width="2"/><path d="M404 940H730V1084H404Z" stroke-width="2"/>` + tb.strokes;

export default sheet({
  title: 'Blueprint sheet 12, the lantern: you can only see the ground near you, so take the best next step from here, then look again',
  seed: 8,
  strokes,
  text: T(50, 78, 'CHOOSE FROM WHERE YOU STAND', 37) + T(50, 112, 'take the best step from here, then look again', 25, soft) +
    T(50, 178, 'THE FOG', 22) + T(50, 206, 'past the light, nobody can see.', 19) + T(50, 230, 'not you, not anyone.', 19) +
    T(440, 178, 'LOOK AGAIN', 22) + T(440, 206, 'after each step', 19) + T(440, 230, 'the light comes with you.', 19) +
    T(50, 384, 'THE NEXT BEST STEP', 22, gold) + T(50, 412, 'lots of ground all round it,', 19, gold) + T(50, 436, 'clear of the edge.', 19, gold) +
    T(50, 852, 'THE LITTLE HILL', 21) + T(50, 878, 'the highest ground in sight.', 18) + T(50, 902, 'on top, every way is down.', 18) +
    T(450, 852, 'THE EDGE', 21) + T(450, 878, 'one step over it', 18) + T(450, 902, 'and there is no way back.', 18) +
    T(300, 814, 'YOU ARE HERE', 19) +
    T(68, 976, 'PLAN THE WHOLE ROUTE', 21) + T(68, 1008, 'works when you can see the map.', 18) + T(68, 1034, 'a good tool. here the map is fog.', 18) +
    T(422, 976, 'LOOK, STEP, LOOK AGAIN', 21) + T(422, 1008, 'start with a way to head,', 18) + T(422, 1034, 'not a place to get to.', 18) + T(422, 1068, 'after Dave Snowden', 16, soft) +
    tb.text,
});
