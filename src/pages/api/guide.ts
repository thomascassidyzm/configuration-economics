import type { APIRoute } from 'astro';
import { buildPromptWithContext, type GuideContext } from '../../lib/guide-prompt';
import { extractAndRenderMath } from '../../lib/math';

export const prerender = false;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MODEL = 'claude-haiku-4-5-20251001';

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 20;
const MAX_BODY_BYTES = 50 * 1024;

// Sliding-window rate limit, keyed on client IP. Module-level Map is fine for
// a single serverless instance; entries are pruned on every request so it
// cannot grow unbounded.
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;
const requestLog = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  for (const [key, timestamps] of requestLog) {
    const kept = timestamps.filter((t) => t > windowStart);
    if (kept.length === 0) {
      requestLog.delete(key);
    } else {
      requestLog.set(key, kept);
    }
  }

  const timestamps = requestLog.get(ip) ?? [];
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = Math.min(...timestamps);
    const retryAfterSeconds = Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return { allowed: true, retryAfterSeconds: 0 };
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
    const originHost = new URL(origin).host;
    const requestHost = new URL(request.url).host;
    return originHost === requestHost;
  } catch {
    return false;
  }
}

interface GuideRequest {
  message: string;
  history?: ChatMessage[];
  context?: GuideContext;
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
    const rateLimit = checkRateLimit(clientIp);
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

    const apiKey = import.meta.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = buildPromptWithContext(message, context);

    const messages = [
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        system: systemPrompt,
        messages,
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

    const data = await response.json();
    const assistantMessage = data.content[0]?.text || 'I apologize, but I was unable to generate a response.';
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
