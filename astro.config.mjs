// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { execSync } from 'child_process';

// Get git commit count for build number
function getBuildNumber() {
  try {
    const count = execSync('git rev-list --count HEAD', { encoding: 'utf-8' }).trim();
    const shortHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    return `${count}.${shortHash}`;
  } catch {
    return 'dev';
  }
}

const buildNumber = getBuildNumber();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    define: {
      '__BUILD_NUMBER__': JSON.stringify(buildNumber),
    },
    server: {
      // Serving the dev server behind a tailnet proxy so a session can be
      // WATCHED while it runs — Vite rejects a Host header it was not told
      // about, and the room is worth nothing if it cannot be opened on a
      // phone. Dev-server only: this has no effect on the Vercel build.
      // Extra hosts come from ALLOWED_HOSTS, comma-separated.
      allowedHosts: [
        'watson-1.tail4968cb.ts.net',
        ...(process.env.ALLOWED_HOSTS ?? '').split(',').map(h => h.trim()).filter(Boolean),
      ],
    },
  },
});
