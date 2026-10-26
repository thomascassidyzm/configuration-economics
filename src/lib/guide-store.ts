// The one counter every serverless instance shares.
//
// Vercel runs the guide on as many instances as traffic wants, so a module-level
// Map only ever saw one instance's share of a reader: three overlapping stuck
// requests landing on three cold instances each found an empty ledger and all
// got Opus (#369). Both the per-session Opus cap and the per-IP budgets now
// count in one Upstash Redis store (Vercel KV, the team's existing
// upstash-kv-champagne-bell, connected to this project's env as
// KV_REST_API_URL / KV_REST_API_TOKEN), each counter a single atomic Lua call.
//
// Failure is never silent and never generous: no store configured, a timeout,
// or a non-200 makes every call here THROW, and the endpoint decides what that
// means — Opus shut (the turn goes to Sonnet), IP budgets back on the
// per-instance limiter.
//
// Keys are namespaced alexander:<site>:… because the store is shared with
// other projects in the team.

export interface CounterStore {
  /** Count one hit on `key`; the window starts at the first hit and lasts ttlMs. */
  hit(key: string, ttlMs: number): Promise<{ count: number; resetMs: number }>;
  /** Take one unit iff the count is below `cap`, atomically. True if taken. */
  take(key: string, cap: number, ttlMs: number): Promise<boolean>;
  /** Give one unit back (never below zero). */
  give(key: string): Promise<void>;
}

const TIMEOUT_MS = 800;

// INCR, start the window on the first hit, report the count and time left.
const HIT = `local n = redis.call('INCR', KEYS[1])
if n == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end
return {n, redis.call('PTTL', KEYS[1])}`;

// Check and take in one step, so no other request can land between them.
const TAKE = `local n = tonumber(redis.call('GET', KEYS[1]) or '0')
if n >= tonumber(ARGV[1]) then return 0 end
redis.call('INCR', KEYS[1])
redis.call('PEXPIRE', KEYS[1], ARGV[2])
return 1`;

const GIVE = `local n = tonumber(redis.call('GET', KEYS[1]) or '0')
if n > 0 then redis.call('DECR', KEYS[1]) end
return 0`;

export function upstashStore(url: string, token: string): CounterStore {
  async function evalScript(script: string, key: string, ...args: (string | number)[]): Promise<unknown> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', script, '1', key, ...args.map(String)]),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`counter store ${res.status}`);
    const body = (await res.json()) as { result?: unknown; error?: string };
    if (body.error) throw new Error(`counter store: ${body.error}`);
    return body.result;
  }
  return {
    async hit(key, ttlMs) {
      const r = await evalScript(HIT, key, ttlMs);
      if (!Array.isArray(r)) throw new Error('counter store: bad reply');
      const ttl = Number(r[1]);
      return { count: Number(r[0]), resetMs: ttl > 0 ? ttl : ttlMs };
    },
    async take(key, cap, ttlMs) {
      return Number(await evalScript(TAKE, key, cap, ttlMs)) === 1;
    },
    async give(key) {
      await evalScript(GIVE, key);
    },
  };
}

let override: CounterStore | null | undefined;

/** The shared store, or null when none is configured (treated as down). */
export function counterStore(): CounterStore | null {
  if (override !== undefined) return override;
  // Runtime env, read per call: Vercel injects these into the function, and
  // they are not baked into the build.
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  return url && token ? upstashStore(url, token) : null;
}

/** Test hook: a store to use instead of the env one (null = down; undefined = env). */
export function _setCounterStore(store: CounterStore | null | undefined): void {
  override = store;
}

/** An in-process CounterStore with the same semantics — tests stand it in for Redis. */
export function memoryStore(): CounterStore & { values: Map<string, number> } {
  const values = new Map<string, number>();
  const expires = new Map<string, number>();
  const live = (key: string) => {
    const at = expires.get(key);
    if (at !== undefined && at <= Date.now()) {
      values.delete(key);
      expires.delete(key);
    }
    return values.get(key) ?? 0;
  };
  return {
    values,
    async hit(key, ttlMs) {
      const n = live(key) + 1;
      values.set(key, n);
      if (n === 1) expires.set(key, Date.now() + ttlMs);
      return { count: n, resetMs: expires.get(key)! - Date.now() };
    },
    async take(key, cap, ttlMs) {
      if (live(key) >= cap) return false;
      values.set(key, live(key) + 1);
      expires.set(key, Date.now() + ttlMs);
      return true;
    },
    async give(key) {
      if (live(key) > 0) values.set(key, live(key) - 1);
    },
  };
}
