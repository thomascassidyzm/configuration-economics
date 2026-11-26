// Bakes the hand-drawn wobble into the lines themselves.
// The sheets used to get their wobble from an SVG filter, which a browser draws at the size the
// picture is shown: as a thumbnail, zoomed, the lines broke into steps (Tom, 2026-11-26). Here every
// shape is turned into a path of closely spaced points, and each point is nudged by smooth noise.
// The result is plain vector line that stays clean at any size.

// smooth 2D noise, two octaves, repeatable for a given seed; returns roughly -1..1
function noise2(seed) {
  const h = (x, y, k) => { let n = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed + k * 101, 2147483647); n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967295 * 2 - 1; };
  const s = (t) => t * t * (3 - 2 * t);
  const one = (x, y, k) => { const xi = Math.floor(x), yi = Math.floor(y), u = s(x - xi), v = s(y - yi); const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), e = h(xi + 1, yi + 1, k); return a + (b - a) * u + (c - a) * v + (a - b - c + e) * u * v; };
  return (x, y, k) => one(x / 62, y / 62, k) * 0.7 + one(x / 31, y / 31, k + 7) * 0.3;
}

// SVG path data -> list of subpaths, each { pts: [[x, y], ...], closed }
function flatten(dStr, step = 4) {
  const tok = dStr.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  const subs = []; let cur = null, i = 0, cmd = '', x = 0, y = 0, sx = 0, sy = 0, px = 0, py = 0, last = '';
  const num = () => parseFloat(tok[i++]);
  const more = () => i < tok.length && !/^[a-zA-Z]$/.test(tok[i]);
  const start = (nx, ny) => { cur = { pts: [[nx, ny]], closed: false }; subs.push(cur); x = sx = nx; y = sy = ny; };
  const curve = (f, len) => { const n = Math.max(2, Math.ceil(len / step)); for (let k = 1; k <= n; k++) cur.pts.push(f(k / n)); };
  const lineTo = (nx, ny) => { const x0 = x, y0 = y; curve((t) => [x0 + (nx - x0) * t, y0 + (ny - y0) * t], Math.hypot(nx - x0, ny - y0)); x = nx; y = ny; };
  const cubic = (x1, y1, x2, y2, nx, ny) => { const x0 = x, y0 = y; const len = Math.hypot(x1 - x0, y1 - y0) + Math.hypot(x2 - x1, y2 - y1) + Math.hypot(nx - x2, ny - y2);
    curve((t) => { const m = 1 - t; return [m * m * m * x0 + 3 * m * m * t * x1 + 3 * m * t * t * x2 + t * t * t * nx, m * m * m * y0 + 3 * m * m * t * y1 + 3 * m * t * t * y2 + t * t * t * ny]; }, len); px = x2; py = y2; x = nx; y = ny; };
  const quad = (x1, y1, nx, ny) => { const x0 = x, y0 = y; const len = Math.hypot(x1 - x0, y1 - y0) + Math.hypot(nx - x1, ny - y1);
    curve((t) => { const m = 1 - t; return [m * m * x0 + 2 * m * t * x1 + t * t * nx, m * m * y0 + 2 * m * t * y1 + t * t * ny]; }, len); px = x1; py = y1; x = nx; y = ny; };
  const arc = (rx, ry, rot, large, sweep, nx, ny) => { // SVG spec, appendix F.6.5
    const x0 = x, y0 = y; if (!rx || !ry || (x0 === nx && y0 === ny)) return lineTo(nx, ny);
    rx = Math.abs(rx); ry = Math.abs(ry); const ph = rot * Math.PI / 180, c = Math.cos(ph), s = Math.sin(ph);
    const dx = (x0 - nx) / 2, dy = (y0 - ny) / 2, x1 = c * dx + s * dy, y1 = -s * dx + c * dy;
    const lam = x1 * x1 / (rx * rx) + y1 * y1 / (ry * ry); if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
    const q = Math.sqrt(Math.max(0, (rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) / (rx * rx * y1 * y1 + ry * ry * x1 * x1))) * (large === sweep ? -1 : 1);
    const cx1 = q * rx * y1 / ry, cy1 = -q * ry * x1 / rx, cx = c * cx1 - s * cy1 + (x0 + nx) / 2, cy = s * cx1 + c * cy1 + (y0 + ny) / 2;
    const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
    const t1 = ang(1, 0, (x1 - cx1) / rx, (y1 - cy1) / ry); let dt = ang((x1 - cx1) / rx, (y1 - cy1) / ry, (-x1 - cx1) / rx, (-y1 - cy1) / ry);
    if (!sweep && dt > 0) dt -= 2 * Math.PI; if (sweep && dt < 0) dt += 2 * Math.PI;
    curve((t) => { const a = t1 + dt * t; return [cx + rx * Math.cos(a) * c - ry * Math.sin(a) * s, cy + rx * Math.cos(a) * s + ry * Math.sin(a) * c]; }, Math.abs(dt) * Math.max(rx, ry)); x = nx; y = ny; };
  while (i < tok.length) {
    if (/^[a-zA-Z]$/.test(tok[i])) cmd = tok[i++];
    const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase(), ox = rel ? x : 0, oy = rel ? y : 0;
    if (C === 'Z') { if (cur) { lineTo(sx, sy); cur.closed = true; } last = C; continue; }
    if (!more()) break;
    if (C === 'M') { start(ox + num(), oy + num()); cmd = rel ? 'l' : 'L'; }
    else if (C === 'L') lineTo(ox + num(), oy + num());
    else if (C === 'H') lineTo(ox + num(), y);
    else if (C === 'V') lineTo(x, oy + num());
    else if (C === 'C') cubic(ox + num(), oy + num(), ox + num(), oy + num(), ox + num(), oy + num());
    else if (C === 'S') { const rx1 = /[CS]/.test(last) ? 2 * x - px : x, ry1 = /[CS]/.test(last) ? 2 * y - py : y; cubic(rx1, ry1, ox + num(), oy + num(), ox + num(), oy + num()); }
    else if (C === 'Q') quad(ox + num(), oy + num(), ox + num(), oy + num());
    else if (C === 'T') { const qx = /[QT]/.test(last) ? 2 * x - px : x, qy = /[QT]/.test(last) ? 2 * y - py : y; quad(qx, qy, ox + num(), oy + num()); }
    else if (C === 'A') arc(num(), num(), num(), num(), num(), ox + num(), oy + num());
    else break;
    last = C;
  }
  return subs;
}

const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`)); return m ? m[1] : null; };
const strip = (tag, names) => names.reduce((t, n) => t.replace(new RegExp(`\\s${n}="[^"]*"`), ''), tag);
const ell = (cx, cy, rx, ry) => `M${cx + rx} ${cy}A${rx} ${ry} 0 1 1 ${cx - rx} ${cy}A${rx} ${ry} 0 1 1 ${cx + rx} ${cy}Z`;

// Replace every path, circle, ellipse, line and rect in `svg` with a wobbled path. Other attributes are kept.
export function bake(svg, seed = 4, amount = 3.2) {
  const n = noise2(seed);
  const out = (dStr) => flatten(dStr).map((s) => { const p = s.closed ? s.pts.slice(0, -1) : s.pts;
    return 'M' + p.map(([x, y]) => `${(x + n(x, y, 1) * amount).toFixed(1)} ${(y + n(x, y, 2) * amount).toFixed(1)}`).join('L') + (s.closed ? 'Z' : ''); }).join('');
  const f = (t, k, d0 = 0) => parseFloat(attr(t, k) ?? d0);
  return svg
    .replace(/<path\b[^>]*\/>/g, (t) => { const dStr = attr(t, 'd'); return dStr == null ? t : t.replace(/\sd="[^"]*"/, ` d="${out(dStr)}"`); })
    .replace(/<circle\b[^>]*\/>/g, (t) => strip(t, ['cx', 'cy', 'r']).replace('<circle', `<path d="${out(ell(f(t, 'cx'), f(t, 'cy'), f(t, 'r'), f(t, 'r')))}"`))
    .replace(/<ellipse\b[^>]*\/>/g, (t) => strip(t, ['cx', 'cy', 'rx', 'ry']).replace('<ellipse', `<path d="${out(ell(f(t, 'cx'), f(t, 'cy'), f(t, 'rx'), f(t, 'ry')))}"`))
    .replace(/<line\b[^>]*\/>/g, (t) => strip(t, ['x1', 'y1', 'x2', 'y2']).replace('<line', `<path d="${out(`M${f(t, 'x1')} ${f(t, 'y1')}L${f(t, 'x2')} ${f(t, 'y2')}`)}"`))
    .replace(/<rect\b[^>]*\/>/g, (t) => { const x = f(t, 'x'), y = f(t, 'y'), w = f(t, 'width'), hh = f(t, 'height'); return strip(t, ['x', 'y', 'width', 'height']).replace('<rect', `<path d="${out(`M${x} ${y}H${x + w}V${y + hh}H${x}Z`)}"`); });
}
