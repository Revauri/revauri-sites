import type { ReactNode } from "react";
import type { UIMessage } from "ai";
import { HighlightCard, type HighlightCardProps } from "@/components/chat/highlight-card";

const LINK_CLASS =
  "text-brand-orange underline underline-offset-2 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

// Matches, in priority order: markdown links `[label](url)`, bare http(s) URLs,
// bare site-relative paths (e.g. "/book" typed without markdown formatting),
// and bare email addresses. No markdown library — the model only ever produces
// these patterns, so a single regex pass is enough. The bare-path branch
// requires a lowercase letter right after the slash and excludes matches
// preceded by a word character, "/", or "." so it doesn't fire inside things
// like "24/7", "and/or", or a full URL's own path segment.
const INLINE_PATTERN =
  /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)|(?<![\w/.])(\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*)|([\w.+-]+@[\w-]+\.[\w.-]+)/g;

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

    const [full, mdLabel, mdUrl, bareUrl, barePath, email] = match;
    if (mdLabel && mdUrl) {
      nodes.push(
        <a key={key++} href={mdUrl} className={LINK_CLASS}>
          {mdLabel}
        </a>,
      );
    } else if (bareUrl) {
      nodes.push(
        <a key={key++} href={bareUrl} className={LINK_CLASS}>
          {bareUrl}
        </a>,
      );
    } else if (barePath) {
      nodes.push(
        <a key={key++} href={barePath} className={LINK_CLASS}>
          {barePath.slice(1).replace(/[-_]/g, " ")}
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
  "before:absolute before:bottom-0 before:h-4 before:w-[13px] before:content-[''] after:absolute after:bottom-0 after:h-4 after:w-[18px] after:content-['']";

export function BubbleShell({ isUser, children }: { isUser: boolean; children: ReactNode }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[85%] whitespace-pre-wrap rounded-[14px] px-[13px] py-[10px] text-xs leading-relaxed ${TAIL_CLASS} ${
          isUser
            ? "bg-brand-dark font-medium text-brand-cream before:-right-[5px] before:rounded-bl-[10px_9px] before:bg-brand-dark after:-right-[18px] after:rounded-bl-[7px] after:bg-brand-white dark:bg-brand-cream dark:text-brand-dark dark:before:bg-brand-cream dark:after:bg-[#1a1a19]"
            : "bg-brand-cream text-brand-dark before:-left-[5px] before:rounded-br-[10px_9px] before:bg-brand-cream after:-left-[18px] after:rounded-br-[7px] after:bg-brand-white dark:bg-brand-light-gray/10 dark:text-brand-cream dark:before:bg-brand-light-gray/10 dark:after:bg-[#1a1a19]"
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
