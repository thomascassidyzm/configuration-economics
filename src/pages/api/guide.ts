import type { APIRoute } from 'astro';
import { SYSTEM_PROMPT_WITH_INDEX, buildSectionContext, type GuideContext } from '../../lib/guide-prompt';
import {
  selectTier,
  buildSystemBlocks,
  buildUserTurn,
} from '../../lib/guide-request';
import { sessionGate, issueSession, reserveOpus } from '../../lib/guide-session';
import { counterStore } from '../../lib/guide-store';
import { extractAndRenderMath } from '../../lib/math';
import {
  GUIDE_TOOLS,
  runGuideTool,
  truncate,
  MAX_TOOL_ROUNDS,
  MAX_TOOL_CHARS_TOTAL,
  MAX_TOOL_CHARS_PER_RESULT,
} from '../../lib/guide-tools';

export const prerender = false;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Model selection is SERVER-SIDE ONLY. The caller sends intent — a boolean
// `escalate` — never a model name and never a tier the server trusts. The
// rungs in guide-request.ts are the complete set the endpoint can ever reach:
// there is no code path from any request body to any model. A request that names a model is rejected outright (400)
// rather than silently downgraded, so the refusal is visible to whoever sent
// it.
// Haiku greets, Sonnet carries the body (its deep rungs differ by effort, not
// model, so climbing them keeps the cache), and Opus answers only REPEATED
// confusion, capped per session by a server-signed token. The model never
// chooses its own rung. See guide-request.ts and guide-session.ts.

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 20;
const MAX_BODY_BYTES = 50 * 1024;

// Rate limit, keyed on client IP, counted in the shared store so every
// serverless instance sees the same budget (#369). The module-level Maps below
// are only the fallback for when that store is down: per-instance, so weaker,
// but a reader is never locked out because Redis blinked.
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;
// Escalated answers cost roughly an order of magnitude more than base ones, so
// they get their own, much tighter budget. 4 per 5 minutes per IP is enough for
// a reader who genuinely wants the deeper answer on a handful of questions in a
// sitting, and far too few to be worth farming. Escalated requests spend from
// BOTH budgets — the deep limit is a sub-limit of the chat limit, not a bypass.
const ESCALATED_RATE_LIMIT_MAX_REQUESTS = 4;
const requestLog = new Map<string, number[]>();
const escalatedRequestLog = new Map<string, number[]>();

// Which site's keys these are in the store the team's projects share.
const SITE = 'ce';

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return 'unknown';
}

function checkRateLimit(
  ip: string,
  log: Map<string, number[]> = requestLog,
  max: number = RATE_LIMIT_MAX_REQUESTS,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  for (const [key, timestamps] of log) {
    const kept = timestamps.filter((t) => t > windowStart);
    if (kept.length === 0) {
      log.delete(key);
    } else {
      log.set(key, kept);
    }
  }

  const timestamps = log.get(ip) ?? [];
  if (timestamps.length >= max) {
    const oldest = Math.min(...timestamps);
    const retryAfterSeconds = Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  log.set(ip, timestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}

async function spendBudget(
  ip: string,
  budget: 'chat' | 'deep',
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const max = budget === 'deep' ? ESCALATED_RATE_LIMIT_MAX_REQUESTS : RATE_LIMIT_MAX_REQUESTS;
  const store = counterStore();
  if (store) {
    try {
      const { count, resetMs } = await store.hit(`alexander:${SITE}:rl:${budget}:${ip}`, RATE_LIMIT_WINDOW_MS);
      return { allowed: count <= max, retryAfterSeconds: Math.max(1, Math.ceil(resetMs / 1000)) };
    } catch (err) {
      console.warn('[guide] counter store unavailable; per-instance rate limit:', err);
    }
  }
  return checkRateLimit(ip, budget === 'deep' ? escalatedRequestLog : requestLog, max);
}

// The set of hostnames that count as "this site" for the same-origin check.
//
// `new URL(request.url).host` is NOT the public hostname behind Vercel's proxy —
// the serverless invocation sees an internal host, so comparing Origin against it
// rejected every real browser request with a 403 while curl (which sends no
// Origin) sailed through. The public hostname arrives in the forwarding headers
// instead. Neither `x-forwarded-host` nor `host` is reachable from page JS —
// browsers set Host themselves and refuse `x-forwarded-host` as a forbidden
// header, and Vercel's edge overwrites both — so trusting them here does not
// widen the guard: a genuine cross-site caller still fails on its own Origin.
function allowedHosts(request: Request): string[] {
  const hosts = [
    request.headers.get('x-forwarded-host'),
    request.headers.get('host'),
  ];
  try {
    hosts.push(new URL(request.url).host);
  } catch {
    // request.url unparseable; the forwarding headers still carry the answer.
  }
  return hosts.filter((h): h is string => Boolean(h)).map((h) => h.toLowerCase());
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) {
    // Same-origin requests don't always carry an Origin header (e.g. plain
    // GET-style navigations); absence alone isn't evidence of cross-origin
    // abuse, so we don't reject on it. Cross-origin fetch() POSTs do send it.
    return true;
  }
  try {
    const originHost = new URL(origin).host.toLowerCase();
    return allowedHosts(request).includes(originHost);
  } catch {
    return false;
  }
}

interface GuideRequest {
  message: string;
  history?: ChatMessage[];
  context?: GuideContext;
  // The Deeper button's signal. Anything other than boolean true is treated as
  // false — a string, a model name, a tier label all fall through to base.
  escalate?: boolean;
  // The server's own signed session token, echoed back. Opaque to the client.
  session?: string | null;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isSameOrigin(request)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const clientIp = getClientIp(request);
    const rateLimit = await spendBudget(clientIp, 'chat');
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      });
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: 'Request too large' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body: GuideRequest = JSON.parse(rawBody);
    const { message, history = [], context = {} } = body;

    // A caller naming a model is refused, not quietly ignored. There is no
    // request shape that selects a model; this exists so the refusal is
    // legible rather than looking like the request worked as asked.
    if (body !== null && typeof body === 'object' && 'model' in body) {
      return new Response(JSON.stringify({
        error: 'Model selection is not caller-controlled',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // The only escalation signal. Strict equality, so 'true', 1, 'opus' and
    // every other creative value resolve to the base tier.
    const escalate = body.escalate === true;

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(JSON.stringify({ error: 'Message too long' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!Array.isArray(history) || history.length > MAX_HISTORY_TURNS) {
      return new Response(JSON.stringify({ error: 'History too long' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Which rung this turn earned. Decided here and nowhere else, from the
    // message and history the client already sends — never from a client-
    // supplied tier field, which does not exist.
    const apiKey = import.meta.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // What this session has proven to the server, and whether Opus is still
    // within its cap. Computed before selectTier so the ladder never offers a
    // rung the session cannot have.
    const historyUserTurns = history.filter((m) => m?.role === 'user').length;
    const { state: session, opusAllowed } = sessionGate(apiKey, body.session, historyUserTurns);

    let decision = selectTier({ message, history, escalate, opusAllowed });

    // Every deep answer spends from the escalated budget, whether the reader
    // pressed Deeper or the server inferred it — otherwise auto-escalation is
    // a hole in that budget. But when the budget is gone the two cases
    // diverge: an inferred escalation declines quietly to base rather than
    // 429ing a reader who never asked for the dear tier.
    if (decision.tier === 'deep') {
      const deepLimit = await spendBudget(clientIp, 'deep');
      if (!deepLimit.allowed) {
        if (decision.explicit) {
          return new Response(JSON.stringify({ error: 'Too many deeper requests' }), {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(deepLimit.retryAfterSeconds),
            },
          });
        }
        decision = selectTier({ message, history, escalate, opusAllowed, escalatedBudgetSpent: true });
      }
    }

    // Opus is RESERVED before the call, not recorded after it: overlapping
    // requests on one session otherwise all pass the cap check while the first
    // is still waiting on Anthropic. No slot left, or the shared counter is
    // down → the same turn at Sonnet.
    const opusHold = decision.family === 'opus' ? await reserveOpus(session, SITE) : null;
    if (decision.family === 'opus' && !opusHold) {
      decision = selectTier({ message, history, escalate, opusAllowed: false });
    }

    // The layered, cacheable prompt: global material first with a breakpoint
    // on it, then the section the reader has open with a second breakpoint,
    // then nothing — the conversation goes in `messages`, after both.
    const systemBlocks = buildSystemBlocks({
      globalPrompt: SYSTEM_PROMPT_WITH_INDEX,
      sectionContext: buildSectionContext(context),
    });

    const messages = [
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        // Any tier-specific instruction rides the USER turn, after the last
        // breakpoint. Appending it to the system prompt — as this endpoint
        // used to do for the depth pass — changes the prefix and discards the
        // entire cache at exactly the moment the request got expensive.
        content: buildUserTurn(message, decision),
      },
    ];

    // ---------------------------------------------------------------------
    // Bounded tool loop.
    //
    // Alexander carries the site's INDEX in his prompt and reads the TEXT on
    // demand through read_section, so publishing a section and updating the
    // guide are the same act. The loop is a plain `while` around the same
    // non-streaming call the endpoint always made — no SSE plumbing.
    //
    // It is bounded twice over: at most MAX_TOOL_ROUNDS rounds, and at most
    // MAX_TOOL_CHARS_TOTAL characters of fetched content per user message.
    // When either bound is reached the final call is made with no `tools`
    // array at all, so the model cannot ask again and must answer in text.
    //
    // Tool rounds sit INSIDE one already-rate-limited request, so the per-IP
    // limits above are unchanged. max_tokens caps each call's own output, not
    // the transcript, so the deep tier's headroom is unaffected by rounds;
    // tool results are input tokens.
    //
    // Resolution is in-process (see guide-tools.ts) — no network hop, no path
    // or URL ever taken from the model.
    // ---------------------------------------------------------------------
    const conversation: unknown[] = [...messages];
    const readIds: string[] = [];
    let toolRounds = 0;
    let toolCharsUsed = 0;
    let data: any;
    // Accumulated across ALL tool rounds, not just the final call. A question
    // that made Alexander go and read something costs the rounds it took;
    // reporting only the last call would under-report the real price of
    // exactly the questions we most want to price.
    const totals = { input: 0, cache_write: 0, cache_read: 0, output: 0 };

    // The Opus slot is committed only if an answer is served; any early
    // return or throw in the loop gives it back.
    let served = false;
    try {
      for (;;) {
        const toolsAllowed = toolRounds < MAX_TOOL_ROUNDS && toolCharsUsed < MAX_TOOL_CHARS_TOTAL;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: decision.model,
            max_tokens: decision.maxTokens,
            // Every family defaults to medium or high effort when this is
            // omitted, so silence here means silently paying for depth on every
            // trivial question.
            output_config: { effort: decision.effort },
            system: systemBlocks,
            messages: conversation,
            // `tools` ALWAYS goes on the wire, byte-identical, every round.
            // Tools render at position 0 of the prefix — ahead of `system` — so
            // dropping the array would change byte 0 and invalidate the ENTIRE
            // cache on the last and most context-heavy call. tool_choice
            // reaches the same end and preserves the tools+system cache.
            tools: GUIDE_TOOLS,
            ...(toolsAllowed ? {} : { tool_choice: { type: 'none' } }),
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          console.error('Anthropic API error:', error);
          return new Response(JSON.stringify({ error: 'Guide unavailable' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        data = await response.json();
        const ru = data?.usage ?? {};
        totals.input += ru.input_tokens ?? 0;
        totals.cache_write += ru.cache_creation_input_tokens ?? 0;
        totals.cache_read += ru.cache_read_input_tokens ?? 0;
        totals.output += ru.output_tokens ?? 0;

        if (!toolsAllowed || data?.stop_reason !== 'tool_use') break;

        const blocks: any[] = Array.isArray(data.content) ? data.content : [];
        const toolUses = blocks.filter((b) => b?.type === 'tool_use');
        if (toolUses.length === 0) break;

        toolRounds += 1;
        // Push the assistant turn back VERBATIM — thinking blocks and their
        // signatures must survive intact on the escalated tier.
        conversation.push({ role: 'assistant', content: blocks });

        const toolResults = toolUses.map((tu) => {
          const remaining = MAX_TOOL_CHARS_TOTAL - toolCharsUsed;
          let text: string;
          if (remaining <= 0) {
            text =
              'Reading budget for this question is used up. Answer from what you ' +
              'have already read, and say plainly if that means you cannot fully ' +
              'answer.';
          } else {
            const result = runGuideTool(tu.name, tu.input);
            text = truncate(result.text, Math.min(MAX_TOOL_CHARS_PER_RESULT, remaining));
            toolCharsUsed += text.length;
            if (result.found && typeof tu.input?.id === 'string') readIds.push(tu.input.id);
          }
          return { type: 'tool_result', tool_use_id: tu.id, content: text };
        });

        conversation.push({ role: 'user', content: toolResults });
      }
        served = true;
    } finally {
      if (served) opusHold?.commit();
      else opusHold?.release();
    }

    // Cache verification. If cache_read stays at zero across repeated
    // identical-prefix requests, a silent invalidator has crept into the
    // prefix and the layering above is doing nothing.
    console.log(
      `[guide] model=${decision.model} rung=${decision.rung} effort=${decision.effort} reason=${decision.reason} ` +
        `rounds=${toolRounds} input=${totals.input} cache_write=${totals.cache_write} ` +
        `cache_read=${totals.cache_read} output=${totals.output}`,
    );

    // Take the first TEXT block, not content[0]: the escalated tier runs with
    // adaptive thinking, so content[0] can be a thinking block.
    const textBlock = Array.isArray(data.content)
      ? data.content.find((block: { type?: string }) => block?.type === 'text')
      : undefined;
    const assistantMessage = textBlock?.text || 'I apologize, but I was unable to generate a response.';
    const { text: messageWithTokens, math: mathBlocks } = extractAndRenderMath(assistantMessage);

    return new Response(JSON.stringify({
      // Display version (math replaced with XXMATH<n>XX tokens). Used by the
      // client for rendering with substituteMath().
      message: messageWithTokens,
      math: mathBlocks,
      // Raw version (original LaTeX intact). The client stores this in
      // conversation history so subsequent turns send the model real LaTeX,
      // not opaque placeholder tokens.
      rawMessage: assistantMessage,
      // Which tier actually served this answer, decided here and nowhere else.
      // The client uses it to label the response and to hide the Deeper button
      // once the deep tier has already answered.
      tier: decision.tier,
      // Which family answered — haiku, sonnet or opus. A label, never an input.
      model: decision.family,
      // The session, re-signed with this turn counted. The client echoes it.
      session: issueSession(apiKey, {
        sid: session.sid,
        turns: session.turns + 1,
        opus: session.opus + (opusHold ? 1 : 0),
      }),
      // Why this tier. Never taken from the request; always the server's own
      // decision.
      tierReason: decision.reason,
      // Token accounting, returned so the caching is verifiable from outside.
      usage: { ...totals, rounds: toolRounds },
      // Which site resources Alexander actually went and read to answer this.
      // Diagnostic, not display: it is how you tell "he read the section" from
      // "he talked about the section".
      reads: readIds,
      context: context,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Guide API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
