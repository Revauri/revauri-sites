import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { isSameOrigin } from "@/lib/chat/same-origin";
import {
  expectedInboxPassword,
  INBOX_COOKIE_MAX_AGE_SEC,
  INBOX_COOKIE_NAME,
  passwordsMatch,
  signInboxToken,
} from "@/lib/chat/inbox-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(`inbox-login:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password =
    typeof body === "object" && body !== null && "password" in body && typeof body.password === "string"
      ? body.password
      : "";

  if (!passwordsMatch(password, expectedInboxPassword())) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set({
    name: INBOX_COOKIE_NAME,
    value: signInboxToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: INBOX_COOKIE_MAX_AGE_SEC,
  });
  return response;
}
