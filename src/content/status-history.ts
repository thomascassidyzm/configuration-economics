// Status histories — the visible climb.
//
// A Living Epistemic Work has no backstage. Every proposition enters in public
// and migrates up the settledness spine where the reader can watch it. This
// table records, per proposition, the version at which it entered each status.
//
// Honesty note (load-bearing): the entries below for everything published
// before v0.11.0 are *reconstructed* from version-history.ts at the
// version-grain. Under the old editorial regime, propositions were thought
// through behind a draft/voice-review wall and then published already-settled
// — which is exactly why almost every legacy node enters straight at `derived`
// or `contested` rather than climbing from `forming`. That flatness is not a
// gap in the record; it is the record of the regime this reform replaces.
// From v0.11.0 onward, nodes enter at `forming` and the climb is real, not
// reconstructed.

import type { EpistemicStatus, Proposition, StatusStep } from './propositions';

// Per-proposition climb. The last entry's status is the live one and must equal
// the proposition's epistemicStatus. Single-entry histories mean the node has
// held one rung since it entered.
export const STATUS_HISTORY: Record<string, StatusStep[]> = {
  // v0.1.1 (2025-12-20) — the first five nodes, published already-settled.
  'energy-income-inheritance': [{ version: 'v0.1.1', status: 'derived' }],
  'throughput-cost': [{ version: 'v0.1.1', status: 'derived' }],
  'value-option-space': [{ version: 'v0.1.1', status: 'contested' }],
  'work-wrong-question': [{ version: 'v0.1.1', status: 'derived' }],
  'participation-limits': [{ version: 'v0.1.1', status: 'contested' }],

  // v0.1.2 (2025-12-20) — the configuration-maintenance cluster.
  'structural-memory': [{ version: 'v0.1.2', status: 'derived' }],
  'complexity-maintenance': [{ version: 'v0.1.2', status: 'contested' }],
  'care-as-configuration': [{ version: 'v0.1.2', status: 'derived' }],
  'prevention-over-repair': [{ version: 'v0.1.2', status: 'derived' }],
  'stability-not-stasis': [{ version: 'v0.1.2', status: 'derived' }],

  // v0.1.3 (2025-12-21) — ten propositions across the framework.
  'time-asymmetry': [{ version: 'v0.1.3', status: 'derived' }],
  'displaced-costs': [{ version: 'v0.1.3', status: 'derived' }],
  'contextual-scarcity': [{ version: 'v0.1.3', status: 'derived' }],
  'substitution-limits': [
    { version: 'v0.1.3', status: 'contested' },
    { version: 'v0.2.0', status: 'contested', note: 'sharpened to specific physical invariants (P, sinks, biodiversity, topsoil)' },
  ],
  'growth-masks-strain': [{ version: 'v0.1.3', status: 'derived' }],
  'money-as-signal': [{ version: 'v0.1.3', status: 'derived' }],
  'coordination-wealth': [{ version: 'v0.1.3', status: 'derived' }],
  'legibility-truth-tradeoff': [{ version: 'v0.1.3', status: 'contested' }],
  'transition-fragility': [{ version: 'v0.1.3', status: 'derived' }],
  'ignoring-physics': [{ version: 'v0.1.3', status: 'derived' }],

  // v0.1.4 (2025-12-22) — closing the v0.1 set.
  'configuration-not-information': [{ version: 'v0.1.4', status: 'contested' }],
  'viable-objective': [
    { version: 'v0.1.4', status: 'contested', note: 'entered as durable-flourishing-per-throughput' },
    { version: 'v0.2.0', status: 'contested', note: 'reformulated to no-regret preservation over moves' },
  ],
  // Sole `open` node. Entry reconstructed to the v0.1.4 frontier set; the
  // 2026-05-10 revision was an inter-version refinement not given its own tag.
  'option-space-measurability': [{ version: 'v0.1.4', status: 'open' }],

  // v0.2.0 (2026-04-30) — observer-relativity, chess-moves, exergy.
  'exergy-not-energy': [{ version: 'v0.2.0', status: 'established' }],
  'binding-constraint': [{ version: 'v0.2.0', status: 'derived' }],
  'option-space-as-chess-moves': [{ version: 'v0.2.0', status: 'derived' }],
  'observer-relative-option-space': [{ version: 'v0.2.0', status: 'derived' }],

  // v0.3.0 (2026-05-18) — labour-as-allocator and the asymmetry.
  'labour-as-allocator': [{ version: 'v0.3.0', status: 'contested' }],
  'asymmetry-of-option-space-change': [{ version: 'v0.3.0', status: 'derived' }],

  // v0.4.0 (2026-05-18) — the generative-side proposition.
  'configuration-generates-configuration': [{ version: 'v0.4.0', status: 'contested' }],

  // v0.9.0 (2026-06-06) — coordination as move-evaluation.
  'coordination-as-move-evaluation': [{ version: 'v0.9.0', status: 'contested' }],

  // v0.10.0 (2026-06-07) — the infinite game.
  'infinite-game': [{ version: 'v0.10.0', status: 'contested' }],
};

// Resolve a proposition's climb. Precedence: an inline statusHistory on the
// node (the going-forward source for `forming` nodes), then the reconstructed
// backfill table, then a single synthetic step from the live status.
export function getStatusHistory(prop: Proposition): StatusStep[] {
  if (prop.statusHistory && prop.statusHistory.length) return prop.statusHistory;
  const backfilled = STATUS_HISTORY[prop.id];
  if (backfilled && backfilled.length) return backfilled;
  return [{ version: '—', status: prop.epistemicStatus }];
}

// True when a node has actually changed rung (not merely been refined within
// one). Useful for surfacing the nodes that have genuinely climbed.
export function hasClimbed(prop: Proposition): boolean {
  const steps = getStatusHistory(prop);
  const rungs = new Set<EpistemicStatus>(steps.map(s => s.status));
  return rungs.size > 1;
}
