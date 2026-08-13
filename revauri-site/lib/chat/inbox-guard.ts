import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { INBOX_COOKIE_NAME, verifyInboxToken } from "@/lib/chat/inbox-auth";

export async function requireInboxAuth(): Promise<void> {
  const jar = await cookies();
  if (!verifyInboxToken(jar.get(INBOX_COOKIE_NAME)?.value)) {
    redirect("/inbox/login");
  }
}
