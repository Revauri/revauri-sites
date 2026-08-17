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

  // Render parts in the order the model produced them: consecutive text parts
  // merge into one bubble, and each tool card renders where its call sits.
  // (Merging all text into one bubble above all cards put sentences meant to
  // follow a card above it, and a silent tool call showed the card before any
  // text arrived.)
  const blocks: ReactNode[] = [];
  let textParts: string[] = [];
  // Highlight cards live inside the text bubble, so they collect with the
  // pending text and flush into the same BubbleShell.
  let pendingHighlights: Array<{ key: string; props: HighlightCardProps }> = [];

  function flushBubble() {
    // Blank line between text parts (the bubble is whitespace-pre-wrap) — a
    // reply split around a tool call would otherwise run its sentences together.
    const text = textParts.join("\n\n");
    if (!text && pendingHighlights.length === 0) return;
    const highlights = pendingHighlights;
    textParts = [];
    pendingHighlights = [];
    blocks.push(
      <BubbleShell key={`bubble-${blocks.length}`} isUser={isUser}>
        {/* Linkify assistant replies only — user-typed text stays plain. */}
        {isUser ? text : renderInlineContent(text)}
        {highlights.map((h) => (
          <HighlightCard key={h.key} {...h.props} />
        ))}
      </BubbleShell>,
    );
  }

  // A message can carry several calls to the same tool — render every one,
  // keyed by toolCallId, not just the first.
  for (const part of message.parts) {
    if (part.type === "text") {
      if (part.text.length > 0) textParts.push(part.text);
      continue;
    }

    if (part.type === "tool-get_project_highlight") {
      if ("state" in part && part.state === "output-available") {
        pendingHighlights.push({ key: part.toolCallId, props: part.output as HighlightCardProps });
      }
      continue;
    }

    if (part.type === "tool-offer_booking" && "state" in part) {
      flushBubble();
      if (part.state === "output-available") {
        blocks.push(
          <BookingCard key={part.toolCallId} {...(part.output as BookingCardProps)} />,
        );
      } else if (part.state !== "output-error") {
        if (isLastMessage) {
          // Live availability is being fetched server-side — show a skeleton.
          blocks.push(
            <div
              key={part.toolCallId}
              className="h-24 animate-pulse rounded-xl border border-brand-orange/20 bg-brand-orange/[0.06] dark:border-brand-orange/30 dark:bg-brand-orange/10"
            />,
          );
        } else {
          // An earlier message can never receive its output (e.g. a session
          // restored mid-fetch) — degrade to the plain "Book a call" card
          // instead of pulsing forever.
          blocks.push(<BookingCard key={part.toolCallId} fallback />);
        }
      }
      continue;
    }

    if (part.type === "tool-show_portfolio") {
      if ("state" in part && part.state === "output-available") {
        flushBubble();
        for (const project of (part.output as { projects: PortfolioCardData[] }).projects) {
          blocks.push(
            <PortfolioCard key={`${part.toolCallId}-${project.slug}`} project={project} />,
          );
        }
      }
      continue;
    }

    if (part.type === "tool-capture_lead" && "state" in part) {
      flushBubble();
      if (part.state === "input-available") {
        blocks.push(
          <LeadConfirmationCard
            key={part.toolCallId}
            proposed={(part.input ?? {}) as LeadProposedInput}
            expired={!isLastMessage || !onLeadResolve}
            onResolve={(output) => onLeadResolve?.(part.toolCallId, output)}
          />,
        );
      } else if (part.state === "output-available") {
        blocks.push(
          <LeadResolvedCard key={part.toolCallId} output={part.output as LeadToolOutput} />,
        );
      } else if (part.state === "output-error") {
        blocks.push(<LeadResolvedCard key={part.toolCallId} output={{ success: false }} />);
      }
    }
  }
  flushBubble();

  // Tool-only turns with nothing renderable (e.g. a still-streaming tool
  // input) would otherwise produce an empty wrapper.
  if (blocks.length === 0) return null;

  return (
    // Subtle fade + rise on entry, matching the panel's easing (chat-widget.tsx).
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2.5"
    >
      {blocks}
    </motion.div>
  );
}
