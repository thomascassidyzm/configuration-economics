import type { APIRoute } from 'astro';
import { buildPromptWithContext, type GuideContext } from '../../lib/guide-prompt';

export const prerender = false;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GuideRequest {
  message: string;
  history?: ChatMessage[];
  context?: GuideContext;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: GuideRequest = await request.json();
    const { message, history = [], context = {} } = body;

    // Debug logging (remove in production)
    console.log('[Guide API] Received context:', JSON.stringify(context));

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
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

    // Debug: log the end of the system prompt to see context block
    const contextPortion = systemPrompt.slice(-500);
    console.log('[Guide API] Prompt ends with:', contextPortion);

    // Build messages array with history
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
        model: 'claude-sonnet-4-20250514',
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

    return new Response(JSON.stringify({
      message: assistantMessage,
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
