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
  },
});
