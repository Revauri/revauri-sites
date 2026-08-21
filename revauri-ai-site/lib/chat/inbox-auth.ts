import { createHmac, timingSafeEqual } from "node:crypto";

export const INBOX_COOKIE_NAME = "revauri_inbox";
export const INBOX_COOKIE_MAX_AGE_SEC = 14 * 24 * 60 * 60;

function signingSecret(): string {
  return process.env.CHAT_INBOX_SECRET ?? "";
}

export function expectedInboxPassword(): string {
  return process.env.CHAT_INBOX_PASSWORD ?? "";
}

export function signInboxToken(now = Date.now()): string {
  const exp = Math.floor(now / 1000) + INBOX_COOKIE_MAX_AGE_SEC;
  const payload = `v1.${exp}`;
  const mac = createHmac("sha256", signingSecret()).update(payload).digest("hex");
  return `${payload}.${mac}`;
}

export function verifyInboxToken(token: string | undefined, now = Date.now()): boolean {
  if (!token || !signingSecret()) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp * 1000 <= now) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = createHmac("sha256", signingSecret()).update(payload).digest("hex");
  try {
    const a = Buffer.from(parts[2], "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function passwordsMatch(given: string, expected: string): boolean {
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    const dummy = Buffer.alloc(32);
    timingSafeEqual(dummy, dummy);
    return false;
  }
  return timingSafeEqual(a, b);
}
