// The blueprint-sheet kit. One idea, one sheet, plain words on the drawing.
//
// HOUSE RULES (Tom, 2026-11-26)
// - A sheet is something a person could redraw from memory to explain the idea to someone else.
//   One main object, about six labels. Do not make it busier than sheets 1 and 2.
// - Labels use words a ten-year-old owns. A long word may appear once, small, as "long word: …".
// - White line on blue; gold only for the one thing the sheet is for (the sun, "more road").
// - Every label that names a part has a pointer line that ends ON that part.
// - Nothing overlaps and nothing touches the frame. Render it and look before you call it done.
//
// A sheet file is tools/sheets/sheet-<n>-<name>.mjs and default-exports sheet({...}).
// Canvas is 780 wide and 1240 tall; keep clear of the frame (x 40–740, y 40–1200).
// Title at (50,78) size 40, subtitle at (50,112) size 25 soft; title block bottom right via titleBlock()
// (it occupies x 420–736, y 1106–1200; keep your drawing clear of it).
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bake } from './bake.mjs';
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FONTS = `@font-face{font-family:Arch;src:url(data:font/ttf;base64,${readFileSync(join(ROOT, 'tools/sheets-fonts/ArchitectsDaughter-Regular.ttf')).toString('base64')})}`;
export const W = 780;
export const B = { paper: '#1c4b8a', ink: '#f2f6ff', sun: '#ffd97a', soft: '#a9c6f2', font: 'Arch', sw: 3.4 };
// path through a list of [x, y] points
export const d = (p) => 'M' + p.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');
// repeatable random numbers, so a sheet draws the same every time
export const seeded = (seed = 7) => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };

// TEXT. T(x, y, 'words', size, soft | gold). Text is not wobbled; strokes are (the wobble is baked
// into the line by bake.mjs when the sheet is made, so it stays clean at any size).
export const soft = { fill: B.soft }, gold = { fill: B.sun };
export const T = (x, y, s, size = 21, o = {}) => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${o.anchor || 'start'}" fill="${o.fill || B.ink}"${o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : ''}>${s}</text>`;

// STROKES. Everything below returns SVG to concatenate into `strokes`.
// pointer line from a label to a part; the LAST point is the dot that sits on the part
export const lead = (pts) => `<path d="${d(pts)}" stroke="${B.soft}" stroke-width="${B.sw * 0.5}"/><circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="4" fill="${B.soft}" stroke="none"/>`;
// dimension mark, blueprint style: a short vertical line with a tick at each end
export const dim = (x, y1, y2) => `<path d="M${x} ${y1}V${y2}M${x - 9} ${y1}H${x + 9}M${x - 9} ${y2}H${x + 9}" stroke="${B.soft}" stroke-width="2"/>`;
export const box = (x, y, w, h, sw = 2) => `<path d="M${x} ${y}H${x + w}V${y + h}H${x}Z" stroke-width="${sw}"/>`;
// the title block, bottom right. Returns { strokes, text }.
export const titleBlock = (n, name) => ({
  strokes: `<path d="M420 1106H736V1200H420Z" stroke-width="2"/><path d="M420 1138H736M420 1175H736" stroke-width="2"/>`,
  text: T(436, 1130, 'CONFIGURATION ECONOMICS', 20) + T(436, 1153, 'a living blueprint for a world', 14.5, soft) + T(436, 1169, 'that works for everybody', 14.5, soft) +
    T(436, 1193, `sheet ${n} · ${name}`, 15, soft) + T(638, 1193, 'not to scale', 14, soft),
});
// the sun, off to the side, with one ray landing on each turn
export function sun(sx, sy, targets) {
  let o = `<circle cx="${sx}" cy="${sy}" r="34"/>`;
  for (let i = 0; i < 11; i++) { const a = i / 11 * Math.PI * 2 + 0.3; if (Math.cos(a) < -0.45) continue; o += `<line x1="${sx + Math.cos(a) * 46}" y1="${sy + Math.sin(a) * 46}" x2="${sx + Math.cos(a) * 62}" y2="${sy + Math.sin(a) * 62}"/>`; }
  for (const [tx, ty] of targets) {
    const a = Math.atan2(ty - sy, tx - sx), x1 = sx + Math.cos(a) * 52, y1 = sy + Math.sin(a) * 52, L = Math.hypot(tx - x1, ty - y1), nx = -Math.sin(a), ny = Math.cos(a);
    const p = []; for (let i = 0; i <= 40; i++) { const u = i / 40, w = Math.sin(u * Math.PI * 5) * 7 * (1 - u * 0.6); p.push([x1 + Math.cos(a) * L * u + nx * w, y1 + Math.sin(a) * L * u + ny * w]); }
    const q = (da) => `${tx - Math.cos(a + da) * 20} ${ty - Math.sin(a + da) * 20}`;
    o += `<path d="${d(p)}"/><path d="M${q(0.5)} L${tx} ${ty} L${q(-0.5)}"/>`;
  }
  return `<g stroke="${B.sun}">${o}</g>`;
}

// THE SHEET. strokes: the drawing; text: the labels; title: one sentence for screen readers.
export function sheet({ strokes, text, title, seed = 4, height = 1240 }) {
  const H = height;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"><title>${title}</title><defs><style>${FONTS}</style>
 <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0"/></filter>
 <pattern id="grid" width="39" height="39" patternUnits="userSpaceOnUse"><path d="M39 0H0V39" fill="none" stroke="#ffffff" stroke-opacity="0.09" stroke-width="1"/></pattern></defs>
 <rect width="${W}" height="${H}" fill="${B.paper}"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect width="${W}" height="${H}" filter="url(#paper)"/><g>${bake(`<rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="${B.ink}" stroke-width="2.5"/>`, seed)}
 <g stroke="${B.ink}" stroke-width="${B.sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">${bake(strokes, seed)}</g>
 <g font-family="${B.font}" fill="${B.ink}">${text}</g></g></svg>`;
}
