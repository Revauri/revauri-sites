const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const requestLog = new Map<string, number[]>();

export function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, timestamps);
    return { allowed: false };
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return { allowed: true };
}
