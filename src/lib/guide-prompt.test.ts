import { describe, it, expect } from 'vitest';
import { buildSystemBlocks } from './guide-request';
import { SYSTEM_PROMPT_WITH_INDEX, buildSectionContext, buildPromptWithContext } from './guide-prompt';

// The mechanism, pinned against the REAL prompt builder rather than fixtures.
describe('the old single-string shape vs the new layered shape', () => {
  const a = { currentSection: 'configuration-value' } as never;
  const b = { currentSection: 'essay-1' } as never;

  it('proves the old shape offered no cache boundary at the global/section seam', () => {
    // OLD: one string, so one cache_control breakpoint, at its very end — the
    // entry is keyed on the whole string, section included, so moving section
    // leaves nothing to read back.
    expect(buildPromptWithContext('q', a)).not.toBe(buildPromptWithContext('q', b));

    // NEW: two blocks, two breakpoints. The first is keyed on the global layer
    // alone and survives the move; only the second is rewritten.
    const newA = buildSystemBlocks({ globalPrompt: SYSTEM_PROMPT_WITH_INDEX, sectionContext: buildSectionContext(a) });
    const newB = buildSystemBlocks({ globalPrompt: SYSTEM_PROMPT_WITH_INDEX, sectionContext: buildSectionContext(b) });

    expect(newA[0].text).toBe(newB[0].text);
    expect(newA[0].cache_control).toEqual({ type: 'ephemeral' });
    expect(newA[1].text).not.toBe(newB[1].text);
  });

  it('carries no per-request volatility into the cached global layer', () => {
    // Silent invalidators: a timestamp, a uuid, a per-request id in the prefix.
    expect(SYSTEM_PROMPT_WITH_INDEX).not.toMatch(/\b20\d\d-\d\d-\d\dT\d\d:/);
    expect(SYSTEM_PROMPT_WITH_INDEX).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    // Comfortably over Sonnet 5's 1024-token minimum cacheable prefix (~4 chars/token),
    // so breakpoint 1 always actually caches rather than silently no-opping.
    expect(SYSTEM_PROMPT_WITH_INDEX.length).toBeGreaterThan(1024 * 4);
  });
});
