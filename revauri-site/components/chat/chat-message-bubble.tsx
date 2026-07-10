"use client";

import type { ReactNode } from "react";
import type { UIMessage } from "ai";
import { motion, useReducedMotion } from "framer-motion";
import { HighlightCard, type HighlightCardProps } from "@/components/chat/highlight-card";
import { BookingCard, type BookingCardProps } from "@/components/chat/booking-card";
import { PortfolioCard, type PortfolioCardData } from "@/components/chat/portfolio-card";
import {
  LeadConfirmationCard,
  LeadResolvedCard,
  type LeadProposedInput,
  type LeadToolOutput,
} from "@/components/chat/lead-confirmation-card";

const LINK_CLASS =
  "text-brand-orange underline underline-offset-2 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

// Matches, in priority order: markdown links `[label](url)`, bare http(s) URLs,
// bare site-relative paths (e.g. "/book" or "/Book/" typed without markdown
// formatting, any letter case, with or without a trailing slash), and bare
// email addresses. No markdown library — the model only ever produces these
// patterns, so a single regex pass is enough. The bare-path branch excludes
// matches preceded by a word character, "/", or "." so it doesn't fire inside
// things like "24/7", "and/or", or a full URL's own path segment.
const INLINE_PATTERN =
  /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)|(?<![\w/.])(\/[A-Za-z][A-Za-z0-9-]*(?:\/[A-Za-z0-9-]+)*\/?)|([\w.+-]+@[\w-]+\.[\w.-]+)/g;

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
          {barePath.replace(/^\/|\/$/g, "").replace(/[-_]/g, " ")}
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
  // Blank line between text parts (the bubble is whitespace-pre-wrap) — a
  // reply split around a tool call would otherwise run its sentences together.
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .filter((text) => text.length > 0)
    .join("\n\n");
}

export function BubbleShell({ isUser, children }: { isUser: boolean; children: ReactNode }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-[16px] px-[13px] py-[10px] text-xs leading-relaxed ${
          isUser
            ? "bg-brand-dark font-medium text-brand-cream dark:bg-brand-cream dark:text-brand-dark"
            : "bg-brand-cream text-brand-dark dark:bg-brand-light-gray/10 dark:text-brand-cream"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

type ToolPart = Extract<UIMessage["parts"][number], { type: `tool-${string}` }>;

export function ChatMessageBubble({
  message,
  isLastMessage = false,
  onLeadResolve,
}: {
  message: UIMessage;
  isLastMessage?: boolean;
  // Resolves a pending capture_lead tool call (wired to addToolOutput). The
  // SDK only attaches tool outputs to the last message, so pending cards on
  // earlier messages render in an expired state instead.
  onLeadResolve?: (toolCallId: string, output: LeadToolOutput) => void;
}) {
  const reducedMotion = useReducedMotion();
  const isUser = message.role === "user";
  const text = getMessageText(message);
  // A message can carry several calls to the same tool — render every one,
  // keyed by toolCallId, not just the first.
  const highlightParts = message.parts.filter(
    (p): p is ToolPart & { output: HighlightCardProps } =>
      p.type === "tool-get_project_highlight" && "state" in p && p.state === "output-available",
  );
  const bookingParts = message.parts.filter(
    (p): p is ToolPart => p.type === "tool-offer_booking" && "state" in p,
  );
  const portfolioParts = message.parts.filter(
    (p): p is ToolPart & { output: { projects: PortfolioCardData[] } } =>
      p.type === "tool-show_portfolio" && "state" in p && p.state === "output-available",
  );
  const leadParts = message.parts.filter(
    (p): p is ToolPart => p.type === "tool-capture_lead" && "state" in p,
  );

  const bubble = (text || highlightParts.length > 0) && (
    <BubbleShell isUser={isUser}>
      {/* Linkify assistant replies only — user-typed text stays plain. */}
      {isUser ? text : renderInlineContent(text)}
      {highlightParts.map((part) => (
        <HighlightCard key={part.toolCallId} {...part.output} />
      ))}
    </BubbleShell>
  );

  const cards: ReactNode[] = [];

  for (const bookingPart of bookingParts) {
    if (bookingPart.state === "output-available") {
      cards.push(
        <BookingCard key={bookingPart.toolCallId} {...(bookingPart.output as BookingCardProps)} />,
      );
    } else if (bookingPart.state !== "output-error") {
      if (isLastMessage) {
        // Live availability is being fetched server-side — show a skeleton.
        cards.push(
          <div
            key={bookingPart.toolCallId}
            className="h-24 animate-pulse rounded-xl border border-brand-orange/20 bg-brand-orange/[0.06] dark:border-brand-orange/30 dark:bg-brand-orange/10"
          />,
        );
      } else {
        // An earlier message can never receive its output (e.g. a session
        // restored mid-fetch) — degrade to the plain "Book a call" card
        // instead of pulsing forever.
        cards.push(<BookingCard key={bookingPart.toolCallId} fallback />);
      }
    }
  }

  for (const portfolioPart of portfolioParts) {
    for (const project of portfolioPart.output.projects) {
      cards.push(<PortfolioCard key={`${portfolioPart.toolCallId}-${project.slug}`} project={project} />);
    }
  }

  for (const leadPart of leadParts) {
    if (leadPart.state === "input-available") {
      cards.push(
        <LeadConfirmationCard
          key={leadPart.toolCallId}
          proposed={(leadPart.input ?? {}) as LeadProposedInput}
          expired={!isLastMessage || !onLeadResolve}
          onResolve={(output) => onLeadResolve?.(leadPart.toolCallId, output)}
        />,
      );
    } else if (leadPart.state === "output-available") {
      cards.push(
        <LeadResolvedCard key={leadPart.toolCallId} output={leadPart.output as LeadToolOutput} />,
      );
    } else if (leadPart.state === "output-error") {
      cards.push(<LeadResolvedCard key={leadPart.toolCallId} output={{ success: false }} />);
    }
  }

  // Tool-only turns with nothing renderable (e.g. a still-streaming tool
  // input) would otherwise produce an empty bubble.
  if (!bubble && cards.length === 0) return null;

  return (
    // Subtle fade + rise on entry, matching the panel's easing (chat-widget.tsx).
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2.5"
    >
      {bubble}
      {cards}
    </motion.div>
  );
}
