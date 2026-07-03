import type { ReactNode } from "react";
import type { UIMessage } from "ai";
import { HighlightCard, type HighlightCardProps } from "@/components/chat/highlight-card";

const LINK_CLASS =
  "text-brand-orange underline underline-offset-2 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

// Matches, in priority order: markdown links `[label](url)`, bare http(s) URLs,
// and bare email addresses. No markdown library — the model only ever produces
// these three patterns, so a single regex pass is enough.
const INLINE_PATTERN =
  /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)|([\w.+-]+@[\w-]+\.[\w.-]+)/g;

function renderInlineContent(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [full, mdLabel, mdUrl, bareUrl, email] = match;
    if (mdLabel && mdUrl) {
      nodes.push(
        <a key={key++} href={mdUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {mdLabel}
        </a>,
      );
    } else if (bareUrl) {
      nodes.push(
        <a key={key++} href={bareUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {bareUrl}
        </a>,
      );
    } else if (email) {
      nodes.push(
        <a key={key++} href={`mailto:${email}`} className={LINK_CLASS}>
          {email}
        </a>,
      );
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function BubbleShell({ isUser, children }: { isUser: boolean; children: ReactNode }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 text-[13px] leading-relaxed ${
          isUser
            ? "rounded-[16px_4px_16px_16px] bg-brand-dark font-medium text-brand-cream dark:bg-brand-cream dark:text-brand-dark"
            : "rounded-[4px_16px_16px_16px] bg-brand-cream text-brand-dark dark:bg-brand-light-gray/10 dark:text-brand-cream"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function ChatMessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = getMessageText(message);
  const highlightPart = message.parts.find(
    (p): p is (typeof message.parts)[number] & { output: HighlightCardProps } =>
      p.type === "tool-get_project_highlight" && "state" in p && p.state === "output-available",
  );

  return (
    <BubbleShell isUser={isUser}>
      {renderInlineContent(text)}
      {highlightPart && <HighlightCard {...highlightPart.output} />}
    </BubbleShell>
  );
}
