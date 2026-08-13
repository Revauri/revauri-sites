import Link from "next/link";
import { listConversations } from "@/lib/chat/db";
import { requireInboxAuth } from "@/lib/chat/inbox-guard";
import { LogoutButton } from "./logout-button";

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function InboxPage() {
  await requireInboxAuth();
  const conversations = await listConversations();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream">Chat inbox</h1>
          <p className="mt-1 text-sm text-brand-mid-gray">Visitor conversations from the Revauri.com chatbot.</p>
        </div>
        <LogoutButton />
      </div>

      {conversations.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-brand-light-gray/70 bg-brand-white px-5 py-10 text-center text-sm text-brand-mid-gray dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
          No conversations yet.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-brand-light-gray/70 overflow-hidden rounded-2xl border border-brand-light-gray/70 bg-brand-white dark:divide-brand-mid-gray/20 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <Link
                href={`/inbox/${conversation.id}`}
                className="flex min-h-14 flex-col gap-1 px-4 py-3.5 hover:bg-brand-orange/5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-brand-dark dark:text-brand-cream">
                    {conversation.preview || "(no preview)"}
                  </p>
                  <p className="mt-1 text-xs text-brand-mid-gray">
                    {conversation.lastPathname} · {conversation.messageCount}{" "}
                    {conversation.messageCount === 1 ? "message" : "messages"}
                    {conversation.leadSubmitted ? " · Lead sent" : ""}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-brand-mid-gray">{formatWhen(conversation.updatedAt)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
