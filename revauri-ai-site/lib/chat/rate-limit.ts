const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MAX_TRACKED_KEYS = 1_000;

// Per-instance, in-memory limiter. On serverless each instance has its own Map,
// so the limit is approximate — accepted by design (no Redis); the OpenRouter
// dashboard spend cap is the real cost backstop. The Map is bounded: its
// insertion order doubles as LRU order (entries are re-inserted on every hit),
// and the oldest key is evicted once MAX_TRACKED_KEYS is exceeded.
const requestLog = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  requestLog.delete(key); // re-insert below so this key becomes most-recently-used
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(key, timestamps);
    return { allowed: false };
  }
  timestamps.push(now);
  requestLog.set(key, timestamps);
  if (requestLog.size > MAX_TRACKED_KEYS) {
    requestLog.delete(requestLog.keys().next().value!);
  }
  return { allowed: true };
}
