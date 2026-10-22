// How a guide request is ASSEMBLED and PRICED.
//
// Two jobs live here, and both are pure functions so they can be unit-tested
// without an API key or a network:
//
//   1. buildSystemBlocks() — lays the prompt out as stable-prefix layers with
//      Anthropic `cache_control` breakpoints, so ten questions about one
//      section pay that section's read cost once instead of ten times.
//
//   2. selectTier() — decides which rung of the distinction-distance ladder
//      this turn has earned, from the reader's own words. Server-side only.
//
// ---------------------------------------------------------------------------
// The layering
// ---------------------------------------------------------------------------
// Anthropic's cache is a PREFIX match, and the render order is
// `tools` -> `system` -> `messages`. Any byte that changes anywhere in the
// prefix invalidates everything after it. So the layers run outermost (most
// stable) first:
//
//   tools      GUIDE_TOOLS — a module-level constant, byte-identical always.
//   system[0]  Pedagogy core + treatise overlay + site index. Identical for
//              every reader of every section; changes only when Tom publishes.
//              << BREAKPOINT 1 >>  (also caches `tools`, which render before it)
//   system[1]  The section the reader currently has open, its module overview
//              and concept cards. Stable for a reading session.
//              << BREAKPOINT 2 >>
//   messages   Conversation history, this question, tool results. Volatile by
//              construction — never cached, always after the last breakpoint.
//
// WHY THE SECTION GOES IN `system` AND NOT IN `messages`
// Two reasons. First, `system` renders before `messages`,
// so a breakpoint there covers the section for EVERY subsequent turn no matter
// how the conversation grows; a block parked in messages[0] would be equally
// cacheable but would sit tangled up with history that the tool loop rewrites
// mid-request. Second, it keeps the reader's turn as the last thing in the prefix, which
// is exactly where the volatile content belongs.
//
// WHAT USED TO BREAK THIS
// buildPromptWithContext() appended a `## CURRENT CONTEXT` block carrying the
// section title and module concepts onto the END of the system STRING — which
// is to say, into the middle of the prefix, ahead of nothing but with the whole
// global prompt behind it. That was fine for correctness and fatal for caching:
// one string means one cache entry, so moving between sections re-wrote the
// pedagogy core every time. Splitting global from per-section is the single
// most valuable edit in this file.

// ---------------------------------------------------------------------------
// Model and ladder
// ---------------------------------------------------------------------------

// Three families, each on its latest version, chosen by CODE per turn (Tom,
// 2026-10-22: "haiku for the greeting, Sonnet for the main body of
// interactions — Opus only escalated to if someone is really being obtuse").
// The rest of the file speaks in family names; this map is the one place a
// version id lives, so moving to the next release is a three-line edit.
export const MODELS = {
  haiku: 'claude-haiku-5-5',
  sonnet: 'claude-sonnet-5-5',
  opus: 'claude-opus-5-5',
} as const;
export type Family = keyof typeof MODELS;

// THE CACHE ARGUMENT, WEIGHED. Caches are MODEL-SCOPED, so every change of
// family writes the prefix fresh for the new model. That is why the deep rungs
// on the body model are still built from effort (effort is not part of the
// prefix), and why the families sit where they do:
//   - haiku -> sonnet happens once, at turn 2. Turn 1 on an all-Sonnet ladder
//     would have written the Sonnet prefix anyway, so the switch only MOVES that
//     write one turn later and adds Haiku's own write, which is priced at a
//     twentieth of Sonnet's. Net: cheaper, not dearer.
//   - sonnet -> opus is the real cost: one Opus write of the prefix per Opus
//     turn. The Sonnet cache is still warm when the reader drops back (5-minute
//     TTL), so the return costs nothing. Opus is capped per session (below), so
//     that write is bounded per session too.
//
// Effort is set explicitly on every rung: Sonnet defaults to `high` and Haiku
// and Opus to `medium` if nothing is said, which would silently price trivial
// questions at the dear rate.
export type Tier = 'base' | 'deep';
export type Effort = 'low' | 'high' | 'xhigh';
export type Rung = 'greet' | 'base' | 'high' | 'xhigh' | 'stuck';

// max_tokens caps thinking AND text together, so the dearer rungs need real
// headroom or answers truncate mid-sentence.
export const RUNGS: Record<Rung, { family: Family; effort: Effort; maxTokens: number; tier: Tier }> = {
  greet: { family: 'haiku', effort: 'low', maxTokens: 2048, tier: 'base' },
  base: { family: 'sonnet', effort: 'low', maxTokens: 2048, tier: 'base' },
  high: { family: 'sonnet', effort: 'high', maxTokens: 8192, tier: 'deep' },
  xhigh: { family: 'sonnet', effort: 'xhigh', maxTokens: 12288, tier: 'deep' },
  stuck: { family: 'opus', effort: 'high', maxTokens: 8192, tier: 'deep' },
};

// Hard ceiling on Opus answers in one reading session, enforced by a signed
// session token (guide-session.ts). Past it, repeated confusion is served by
// Sonnet at high effort, as it was before Opus was on the ladder.
export const OPUS_PER_SESSION = 2;

export type EscalationReason =
  | 'none'
  | 'greeting'
  | 'explicit-deeper'
  | 'cross-section-comparison'
  | 'repeated-confusion';

export interface TierDecision {
  family: Family;
  model: (typeof MODELS)[Family];
  rung: Rung;
  tier: Tier;
  effort: Effort;
  maxTokens: number;
  reason: EscalationReason;
  /** True when the reader pressed Deeper, as opposed to the server inferring it. */
  explicit: boolean;
}

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

// A reference to a NAMED PART OF THE SITE. Two notations, because the three
// Alexanders address their content differently and must still behave
// identically: numeric sections (§4.13, 4.2, 8.5.1 — the dot is required so a
// bare year or count doesn't read as a section) and kebab-case slugs
// (`option-space-formalisation`, configuration-value), which is how the
// configuration-economics and tomcassidy-site indexes name propositions,
// documents and standalone pages.
const SECTION_REF = /§?\b(\d\.\d+(?:\.\d+)?)\b|`?\b([a-z][a-z0-9]*(?:-[a-z0-9]+){1,4})\b`?/g;

// Words that name a part of the site without identifying which one — "that
// other section", "your earlier essay". Enough to count as a target when the
// reader has clearly put it in opposition to something.
const NAMED_TARGET =
  /\b(section|sections|essay|essays|module|modules|chapter|proposition|propositions|document|page|passage|piece)\b/i;

// The reader setting one part of the treatise against another. This is the
// specimen Tom showed us: "compare with 4.13's treatment - least-time learning".
const COMPARISON_VERB =
  /\b(compare[ds]?|comparison|contrast(?:s|ed|ing)?|versus|vs\.?|differ(?:s|ence|ences)?|distinguish(?:es)?|reconcile|tension|square with|set against|consistent with|relate[ds]? to|same as|whereas|unlike)\b/i;

// The reader coming back at the same thing, not understanding it yet.
// A reader saying hello or asking where to start. Only ever consulted on the
// opening turn of a session, and only when nothing else in the message has
// earned a dearer rung.
const GREETING =
  /^\W*(hi|hello|hey|hiya|good (?:morning|afternoon|evening)|thanks|thank you|who are you|what (?:is|'s) this|what can you do|where (?:do|should) i (?:start|begin)|help)\b/i;

const CONFUSION_MARKER =
  /\b(still (?:don'?t|do not|not|unclear|confus)|i'?m confus|i don'?t (?:get|understand|follow|see)|doesn'?t make sense|makes no sense|not following|lost me|you said|as i said|again[,:]|rephrase|say that again|what do you mean|i asked)\b/i;

// Common English kebab compounds that are not site identifiers. Without this,
// "well-known" or "counter-intuitive" would read as a reference to a named
// page. Deliberately does NOT list articles like `the-`: real slugs begin with
// them (`the-sausage-machine`, `the-cassidy-method`), so excluding them threw
// away genuine references. A backticked token is always taken as a reference
// regardless — backticks are how a reader quotes an id.
const NOT_A_SLUG =
  /^(well|so|self|non|semi|pre|post|re|co|multi|inter|intra|anti|counter|long|short|high|low|first|second|third|day|year|state|open|close|built|based|driven|related|specific|and|but|for|not)-/;

function sectionRefs(text: string): string[] {
  const out = new Set<string>();
  for (const m of text.matchAll(SECTION_REF)) {
    const numeric = m[1];
    const slug = m[2];
    if (numeric) {
      out.add(numeric);
    } else if (slug) {
      // Backticked means the reader is quoting an id at us; trust it outright.
      const backticked = m[0].startsWith('`');
      if (backticked || !NOT_A_SLUG.test(slug)) out.add(slug);
    }
  }
  return [...out];
}

/**
 * Fraction of the shorter message's meaningful words that also appear in the
 * longer one. A blunt instrument on purpose — it is only ever used as one of
 * two conditions for the re-ask signal, never on its own.
 */
function overlap(a: string, b: string): number {
  const words = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );
  const wa = words(a);
  const wb = words(b);
  if (wa.size === 0 || wb.size === 0) return 0;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared += 1;
  return shared / Math.min(wa.size, wb.size);
}

/**
 * Which rung this turn has earned.
 *
 * Tom's frame: this is the DISTINCTION-DISTANCE LADDER applied to the guide.
 * Shared-sense questions get the cheap wide-rung model; fine-instrument
 * questions earn the fine instrument. The reader never names a rung — they ask
 * a question, and the shape of the question is the signal.
 *
 * Escalation is a property of THE CURRENT TURN, not a latch on the session:
 * this function is called fresh on every request and reads the current message
 * first, so a simple follow-up after a deep answer falls straight back to base.
 *
 * SERVER-SIDE ONLY. The only thing taken from the caller is `escalate`, a
 * boolean from the Deeper button. Nothing here reads a model name, a tier name
 * or an effort level from the request body — those cannot reach this function.
 */
export function selectTier(input: {
  message: string;
  history?: ChatTurn[];
  escalate?: boolean;
  /** Set when the escalated budget is spent; auto-escalation then declines quietly. */
  escalatedBudgetSpent?: boolean;
  /**
   * True only when the endpoint has PROVEN this session may still reach Opus:
   * a valid signed session token, history no longer than the turns the server
   * actually served, and the per-session cap not yet spent. Absent means no:
   * missing evidence never opens the dearest rung.
   */
  opusAllowed?: boolean;
}): TierDecision {
  const message = typeof input.message === 'string' ? input.message : '';
  const history = Array.isArray(input.history) ? input.history : [];

  const at = (rung: Rung, reason: EscalationReason, explicit: boolean): TierDecision => {
    const r = RUNGS[rung];
    return {
      family: r.family,
      model: MODELS[r.family],
      rung,
      tier: r.tier,
      effort: r.effort,
      maxTokens: r.maxTokens,
      reason,
      explicit,
    };
  };

  // The Deeper button — the reader asked, in as many words. Sonnet at xhigh,
  // never Opus: Opus is for the reader who is stuck, not the one who is keen.
  // Strict equality, so 'true', 1 and 'opus' all fall through to base.
  if (input.escalate === true) return at('xhigh', 'explicit-deeper', true);

  // Auto-escalation spends from the escalated budget like any other deep
  // answer. When that budget is gone the answer is still served — at base —
  // rather than 429'd, because the reader never asked for the dear tier and
  // shouldn't be punished for a server-side heuristic.
  if (input.escalatedBudgetSpent) return at('base', 'none', false);

  // Repeated confusion is the ONLY road to Opus, and only while the session
  // has proven Opus headroom. Otherwise it is what it always was: Sonnet, high.
  const stuck = (): TierDecision =>
    at(input.opusAllowed === true ? 'stuck' : 'high', 'repeated-confusion', false);

  const userTurns = history.filter((t) => t?.role === 'user').map((t) => String(t?.content ?? ''));

  // Rung 2a — cross-section comparison. Either the reader names two different
  // sections in one breath, or they use a comparison verb about a section
  // other than the one in front of them.
  const refs = sectionRefs(message);
  const comparing = COMPARISON_VERB.test(message);
  if (refs.length >= 2 || (refs.length >= 1 && comparing) || (comparing && NAMED_TARGET.test(message))) {
    return at('high', 'cross-section-comparison', false);
  }

  // Rung 2b — repeated confusion. Two independent readings of "coming back at
  // the same thing": saying so outright while having said so before, or asking
  // a near-identical question again. One alone is noise; either pattern here
  // needs corroboration from the history.
  if (CONFUSION_MARKER.test(message)) {
    const priorConfusion = userTurns.some((t) => CONFUSION_MARKER.test(t));
    const priorSimilar = userTurns.some((t) => overlap(message, t) >= 0.5);
    // Confusion said twice is the reader still stuck after an answer aimed
    // at them: Opus territory. Confusion once, corroborated only by a
    // similar earlier question, is the first "I don't get it" — Sonnet high.
    if (priorConfusion) return stuck();
    if (priorSimilar) return at('high', 'repeated-confusion', false);
  }

  // Three consecutive user turns circling one point, even politely worded.
  const recent = userTurns.slice(-2);
  if (recent.length === 2 && recent.every((t) => overlap(message, t) >= 0.6)) {
    return stuck();
  }

  // The opening turn of a session, when it is a hello rather than a question
  // about the text: Haiku. Anything substantive, even on turn one, is Sonnet's.
  const words = message.trim().split(/\s+/).filter(Boolean).length;
  if (userTurns.length === 0 && (GREETING.test(message) || words <= 3)) {
    return at('greet', 'greeting', false);
  }

  return at('base', 'none', false);
}

// ---------------------------------------------------------------------------
// Prompt layering
// ---------------------------------------------------------------------------

export interface SystemBlock {
  type: 'text';
  text: string;
  cache_control?: { type: 'ephemeral' };
}

/**
 * The system array, laid out as cacheable layers.
 *
 * `globalPrompt` must be byte-identical for every reader — pedagogy core,
 * treatise overlay, site index. `sectionContext` is whatever is specific to the
 * section currently open, however it was obtained: read out of the shipped
 * content modules, or fetched live by #456's read_section tool. The breakpoint
 * sits around "the section text, however it was obtained", so both shapes fit.
 *
 * TTL is the 5-minute default deliberately. A reader's questions about one
 * section arrive minutes apart, so 5 minutes covers the real pattern; the 1h
 * TTL costs 2x on write rather than 1.25x and needs three-plus reads to break
 * even where the 5-minute one needs two.
 *
 * A section shorter than the model's minimum cacheable prefix simply will not
 * cache — silently, with `cache_creation_input_tokens: 0` and
 * no error. The breakpoint is then a harmless no-op: it costs nothing, and it
 * also saves nothing. Do not report a saving that did not occur.
 */
export function buildSystemBlocks(input: {
  globalPrompt: string;
  sectionContext?: string | null;
}): SystemBlock[] {
  const blocks: SystemBlock[] = [
    {
      type: 'text',
      text: input.globalPrompt,
      // Breakpoint 1. Covers `tools` too — they render ahead of `system`.
      cache_control: { type: 'ephemeral' },
    },
  ];

  const section = input.sectionContext?.trim();
  if (section) {
    blocks.push({
      type: 'text',
      text: section,
      // Breakpoint 2.
      cache_control: { type: 'ephemeral' },
    });
  }

  return blocks;
}

// The depth instruction. This used to be APPENDED TO THE SYSTEM PROMPT on
// escalation, which changed the prefix and threw away the whole cache at
// precisely the moment the request became expensive. It belongs after the last
// breakpoint, so it rides in the user turn instead.
const DEPTH_PASS = `

---
DEPTH PASS — the reader has asked for a deeper answer to the exchange above;
they have already read the shorter one. Do not restate it. Go further: work the
argument through rather than summarising it, name the load-bearing assumption
and what would break it, follow the consequence past the first step, and say
where the claim is genuinely unsettled. Length only where the extra length is
doing work.`;

// The comparison instruction, for turns the server escalated on its own. The
// reader did not press anything, so this says what the extra depth is FOR
// rather than announcing a tier.
const COMPARISON_PASS = `

---
This question sets one part of the treatise against another. Read whatever you
need before answering, then give an actual comparison — where the two treatments
agree, where they genuinely differ, and which epistemic status each carries. Do
not apologise for not having the text; go and read it.`;

/**
 * The reader's turn, with any tier-specific instruction trailing it.
 *
 * Everything this function returns sits AFTER the last cache breakpoint, which
 * is the whole point: escalating changes the tail of the prompt, never the
 * cached prefix.
 */
export function buildUserTurn(message: string, decision: TierDecision): string {
  if (decision.reason === 'explicit-deeper') return `${message}${DEPTH_PASS}`;
  if (decision.reason === 'cross-section-comparison') return `${message}${COMPARISON_PASS}`;
  return message;
}
