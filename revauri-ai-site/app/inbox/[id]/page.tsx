import Link from "next/link";
import { notFound } from "next/navigation";
import { getConversation } from "@/lib/chat/db";
import { requireInboxAuth } from "@/lib/chat/inbox-guard";
import { DeleteConversationButton } from "../delete-button";

const CARD_LABEL: Record<string, string> = {
  booking: "Showed booking times",
  portfolio: "Showed portfolio",
  highlight: "Showed project highlight",
  lead: "Lead card",
};

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function InboxConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireInboxAuth();
  const { id } = await params;
  const conversation = await getConversation(id);
  if (!conversation) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/inbox" className="min-h-11 text-sm font-medium text-brand-orange hover:underline">
          ← All conversations
        </Link>
        <DeleteConversationButton id={conversation.id} />
      </div>

      <h1 className="mt-6 text-2xl font-semibold text-brand-dark dark:text-brand-cream">
        {conversation.preview || "Conversation"}
      </h1>
      <p className="mt-2 text-sm text-brand-mid-gray">
        {formatWhen(conversation.updatedAt)} · {conversation.lastPathname}
        {conversation.leadSubmitted ? " · Lead sent" : ""}
      </p>

      <ol className="mt-8 flex flex-col gap-3">
        {conversation.messages.map((message, index) => (
          <li
            key={`${message.role}-${index}`}
            className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "self-end bg-brand-orange text-white"
                : "self-start bg-brand-white text-brand-dark dark:bg-[#1a1a19] dark:text-brand-cream"
            }`}
          >
            {message.text ? <p className="whitespace-pre-wrap">{message.text}</p> : null}
            {message.cards?.length ? (
              <p className={`mt-1 text-xs ${message.role === "user" ? "text-white/80" : "text-brand-mid-gray"}`}>
                {message.cards.map((card) => CARD_LABEL[card] ?? card).join(" · ")}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
