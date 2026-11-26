// Blueprint sheets: one idea, one sheet, plain words on the drawing.
// Each sheet is its own file, tools/sheets/sheet-<n>-<name>.mjs, built from tools/sheets/kit.mjs
// (the house rules are at the top of the kit).
//
//   node tools/sheets.mjs                  writes public/sheets/<name>.svg for every sheet
//   node tools/sheets.mjs --png <dir>      also photographs each sheet to <dir>/<name>.png, to check it by eye
//   node tools/sheets.mjs --only sheet-2   limits either to sheets whose name contains the text
//
// --png needs Playwright with a Chromium; it is not a dependency of this repo. Set PLAYWRIGHT_FROM to a
// directory whose node_modules has it (default: your home directory).
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { ROOT, W } from './sheets/kit.mjs';

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const only = arg('--only'), pngDir = arg('--png');
const files = readdirSync(join(ROOT, 'tools/sheets')).filter((f) => /^sheet-.*\.mjs$/.test(f) && (!only || f.includes(only))).sort();
mkdirSync(join(ROOT, 'public/sheets'), { recursive: true });
const made = [];
for (const f of files) {
  const name = f.replace(/\.mjs$/, ''), svg = (await import('./sheets/' + f)).default;
  writeFileSync(join(ROOT, 'public/sheets', name + '.svg'), svg + '\n'); made.push([name, svg]);
  console.log('wrote public/sheets/' + name + '.svg');
}
if (pngDir) {
  const require = createRequire(join(process.env.PLAYWRIGHT_FROM || process.env.HOME, 'node_modules') + '/');
  const { chromium } = require('playwright');
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: W, height: 1300 }, deviceScaleFactor: 1.5 });
  mkdirSync(pngDir, { recursive: true });
  for (const [name, svg] of made) {
    const H = +svg.match(/height="(\d+)"/)[1];
    await page.setContent(`<html><body style="margin:0;background:#000">${svg}</body></html>`); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(300);
    await page.screenshot({ path: join(pngDir, name + '.png'), clip: { x: 0, y: 0, width: W, height: H } });
    console.log('photographed ' + join(pngDir, name + '.png'));
  }
  await browser.close();
}
