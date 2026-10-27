import { describe, it, expect } from 'vitest';
import { runGuideTool, buildSiteIndex } from './guide-tools';
import { SYSTEM_PROMPT_WITH_INDEX } from './guide-prompt';

// Alexander reads the Seed from the same file /seed renders, so a premise
// changed there reaches him with no second edit.
describe('Alexander can read the CE Seed', () => {
  it('resolves read_section("seed") to the live Seed text, premise 12 included', () => {
    const r = runGuideTool('read_section', { id: 'seed' });
    expect(r.found).toBe(true);
    expect(r.text).toMatch(/^# The CE Seed/);
    expect(r.text).toContain('Whoever backs an experiment carries its costs');
    expect(r.text).toContain('Irreversible loss stays the only veto');
  });

  it('lists the Seed in the generated index and names it in the prompt', () => {
    expect(buildSiteIndex()).toContain('`seed`');
    expect(SYSTEM_PROMPT_WITH_INDEX).toContain('/seed');
    expect(SYSTEM_PROMPT_WITH_INDEX).toContain('Open Board');
  });
});
