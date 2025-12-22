// Site Version
// Living epistemic work - versioning reflects both ideas and implementation

// Semantic version: bump manually for significant changes
// - Major: fundamental framework changes
// - Minor: new propositions, significant rewrites
// - Patch: refinements, fixes, code improvements
export const VERSION = 'v0.1.4';

// Build number: injected at build time from git (commit count + short hash)
// @ts-ignore - __BUILD_NUMBER__ is defined by Vite at build time
export const BUILD: string = typeof __BUILD_NUMBER__ !== 'undefined' ? __BUILD_NUMBER__ : 'dev';

// Combined display
export function getVersionString(): string {
  return `${VERSION}`;
}

export function getBuildString(): string {
  return `build ${BUILD}`;
}
