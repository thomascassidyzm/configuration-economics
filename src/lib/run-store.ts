// The world computer's runs — where a page finds them.
//
// A run in progress lives in the site's Upstash store (the same one Alexander
// counts in), written by tools/wc-run.mjs after every event, so the thread is
// public as it happens with no build per turn. A finished run is ALSO
// committed to src/content/runs/<id>.json, which is the durable, git-audited
// copy and what the page falls back to when the store is unreachable.
//
// SERVER ONLY. Read-only: the one write a visitor can make is a question for
// Sagredo, and that goes through /api/run-question, never through here.

export interface RunItem {
  kind: 'turn' | 'research' | 'ledger';
  n: number;
  at: string;
  round?: number;
  speaker?: string;
  model?: string;
  text?: string;
  changes?: string[];
  asks?: string[];
  readerQuestions?: number;
  costUsd?: number;
  // research
  label?: string;
  askedBy?: string;
  question?: string;
  line?: string;
  sources?: string[];
  loop?: { step: string; what: string }[];
  full?: string;
  state?: string;
  // ledger
  loss?: number;
  objections?: { id: string; by: string; text: string; status: string }[];
  claims?: { id: string; text: string; status: string; by?: string }[];
  fewerOptions?: { who: string; how: string }[];
  parseFailed?: boolean;
}

export interface Run {
  id: string;
  title: string;
  question: string;
  note: string;
  noteSlug: string;
  noteSha: string;
  seats: Record<string, { model: string; role: string }>;
  clerk: string;
  researcher: string;
  critic: string;
  budget: { usdCap: number; usdReserve: number; maxRounds: number; minRounds: number; patience: number; maxResearch: number };
  state: 'running' | 'checkpointing' | 'critic' | 'stopped' | 'failed';
  stopReason: string | null;
  startedAt: string;
  updatedAt: string;
  endedAt: string | null;
  spentUsd: number;
  round: number;
  researchCount: number;
  loss: { round: number; loss: number; objections: number; claims: number; fewerOptions: number }[];
  items: RunItem[];
  checkpoint: null | { diff: string; changed: boolean; costUsd: number; model: string; lossAtStop: number; baselineLoss: number };
  critic: null | { pass: boolean; score: number | null; better?: string[]; worse?: string[]; unsupported?: string[]; verdict: string; model: string; costUsd: number };
  published: boolean;
}

function committed(): Record<string, Run> {
  const files = import.meta.glob('../content/runs/run-*[0-9].json', { import: 'default', eager: true }) as Record<string, Run>;
  const out: Record<string, Run> = {};
  for (const r of Object.values(files)) out[r.id] = r;
  return out;
}

async function kv(cmd: unknown[]): Promise<unknown> {
  const url = process.env.KV_REST_API_URL ?? import.meta.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_READ_ONLY_TOKEN ?? import.meta.env.KV_REST_API_READ_ONLY_TOKEN
    ?? process.env.KV_REST_API_TOKEN ?? import.meta.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 1500);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd),
      signal: ctl.signal,
    });
    if (!res.ok) return null;
    return (await res.json()).result;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/** Every run id, oldest first: the live index merged with the committed ones. */
export async function listRuns(): Promise<string[]> {
  const live = await kv(['GET', 'ce-room:runs']);
  const ids = new Set<string>(Object.keys(committed()));
  try { for (const id of JSON.parse(String(live ?? '[]'))) ids.add(id); } catch { /* stale index is fine */ }
  return [...ids].sort();
}

/**
 * One run. The live copy wins while it is newer (a run in progress); the
 * committed copy is the fallback, and the truth once the run has landed.
 */
export async function getRun(id: string): Promise<Run | null> {
  if (!/^run-\d{3}$/.test(id)) return null;
  const fileRun = committed()[id] ?? null;
  const raw = await kv(['GET', `ce-room:run:${id}`]);
  let liveRun: Run | null = null;
  try { liveRun = raw ? JSON.parse(String(raw)) : null; } catch { liveRun = null; }
  if (liveRun && (!fileRun || liveRun.updatedAt >= fileRun.updatedAt)) return liveRun;
  return fileRun;
}
