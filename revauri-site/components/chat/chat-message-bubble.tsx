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

// iMessage-style tail: two overlapping pseudo-elements — `before` is the
// colored tip, `after` is a page-colored cutout that curves its outer edge.
// Proportions adapted from the widely-used iOS bubble technique
// (https://samuelkraft.com/blog/ios-chat-bubbles-css), scaled down to match
// our smaller bubble radius.
const TAIL_CLASS =
  "before:absolute before:bottom-0 before:h-[14px] before:w-[11px] before:content-[''] after:absolute after:bottom-0 after:h-[14px] after:w-[15px] after:content-['']";

export function BubbleShell({ isUser, children }: { isUser: boolean; children: ReactNode }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[85%] whitespace-pre-wrap rounded-[14px] px-[13px] py-[10px] text-xs leading-relaxed ${TAIL_CLASS} ${
          isUser
            ? "bg-brand-dark font-medium text-brand-cream before:-right-1 before:rounded-bl-[9px_8px] before:bg-brand-dark after:-right-[15px] after:rounded-bl-[6px] after:bg-brand-white dark:bg-brand-cream dark:text-brand-dark dark:before:bg-brand-cream dark:after:bg-[#1a1a19]"
            : "bg-brand-cream text-brand-dark before:-left-1 before:rounded-br-[9px_8px] before:bg-brand-cream after:-left-[15px] after:rounded-br-[6px] after:bg-brand-white dark:bg-brand-light-gray/10 dark:text-brand-cream dark:before:bg-brand-light-gray/10 dark:after:bg-[#1a1a19]"
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
