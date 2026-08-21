import { NextResponse } from "next/server";
import { INBOX_COOKIE_NAME } from "@/lib/chat/inbox-auth";
import { isSameOrigin } from "@/lib/chat/same-origin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set({
    name: INBOX_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
