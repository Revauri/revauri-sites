import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { INBOX_COOKIE_NAME, verifyInboxToken } from "@/lib/chat/inbox-auth";

function isPublicInboxPath(pathname: string): boolean {
  return pathname === "/inbox/login" || pathname === "/api/inbox/login" || pathname === "/api/inbox/purge";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isInboxPage = pathname === "/inbox" || pathname.startsWith("/inbox/");
  const isInboxApi = pathname.startsWith("/api/inbox/");
  if (!isInboxPage && !isInboxApi) return NextResponse.next();
  if (isPublicInboxPath(pathname)) return NextResponse.next();

  if (verifyInboxToken(request.cookies.get(INBOX_COOKIE_NAME)?.value)) {
    return NextResponse.next();
  }

  if (isInboxApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/inbox/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/inbox", "/inbox/:path*", "/api/inbox/:path*"],
};
