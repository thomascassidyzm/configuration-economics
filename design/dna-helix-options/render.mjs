// Photographs each option at 390x844 (phone portrait), one PNG per option, with the site's fonts.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(process.env.HOME + '/node_modules/');
const { chromium } = require('playwright');
const OUT = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-linux64/chrome-headless-shell' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
for (const k of ['A', 'B', 'C']) {
  const svg = readFileSync(join(OUT, `option-${k}.svg`), 'utf8');
  await page.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap" rel="stylesheet"><style>body{margin:0;background:#0a0a0c}</style></head><body>${svg}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, `option-${k}.png`), clip: { x: 0, y: 0, width: 390, height: 844 } });
}
await browser.close();
console.log('rendered');
