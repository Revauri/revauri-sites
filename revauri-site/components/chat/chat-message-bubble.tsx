"use client";

import type { ReactNode } from "react";
import type { UIMessage } from "ai";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
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
  "font-medium text-brand-orange underline decoration-brand-orange/40 underline-offset-[3px] transition-colors hover:decoration-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 rounded-sm";

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
        className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.55] ${
          isUser
            ? "rounded-br-md bg-brand-dark font-medium text-brand-cream shadow-[0_4px_12px_-6px_rgba(20,20,19,0.4)] dark:bg-brand-cream dark:text-brand-dark"
            : "rounded-bl-md border border-brand-dark/[0.06] bg-brand-white text-brand-dark shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-brand-cream"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Blinking block cursor pinned to the tip of the text while a reply streams —
// marks the bubble as still-going, and unmounts the moment the stream settles
// (no exit fade, so it never lingers over finished text).
function StreamingCursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[1em] w-[2px] animate-cursor-blink rounded-full bg-brand-orange align-[-0.15em] shadow-[0_0_6px_rgba(217,119,87,0.6)] motion-reduce:animate-none"
    />
  );
}

// Every block (bubble or card) fades/rises on mount, so a card arriving a beat
// after its text bubble — the common case with in-order rendering — animates in
// deliberately instead of popping.
export function Arrival({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Mirrors the loaded booking card's structure (eyebrow + slot rows) at roughly
// the 3-slot height, so the swap to real times barely moves the conversation.
function BookingSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col gap-1.5 rounded-2xl border border-brand-orange/15 bg-gradient-to-b from-brand-orange/[0.08] to-brand-orange/[0.03] p-3.5 dark:border-brand-orange/25 dark:from-brand-orange/[0.14] dark:to-brand-orange/[0.06]"
    >
      <div className="h-2.5 w-24 rounded bg-brand-orange/20 dark:bg-brand-orange/25" />
      <div className="h-2.5 w-44 rounded bg-brand-orange/15 dark:bg-brand-orange/20" />
      <div className="mt-1 flex flex-col gap-1.5">
        <div className="h-9 rounded-xl border border-brand-dark/[0.06] bg-brand-white dark:border-white/[0.08] dark:bg-white/[0.04]" />
        <div className="h-9 rounded-xl border border-brand-dark/[0.06] bg-brand-white dark:border-white/[0.08] dark:bg-white/[0.04]" />
        <div className="h-9 rounded-xl border border-brand-dark/[0.06] bg-brand-white dark:border-white/[0.08] dark:bg-white/[0.04]" />
      </div>
      <div className="mt-0.5 h-2.5 w-20 rounded bg-brand-orange/15 dark:bg-brand-orange/20" />
    </div>
  );
}

// Slim status pill for server tools with real latency (booking's Calendly
// fetch, portfolio's model round-trip): spins while the tool runs, flips to a
// green check when the output lands, and stays as a receipt above the card.
function ToolChip({
  state,
  pendingLabel,
  doneLabel,
}: {
  state: "pending" | "done";
  pendingLabel: string;
  doneLabel: string;
}) {
  if (state === "pending") {
    return (
      <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-dark/[0.06] bg-brand-white px-2.5 py-1 text-[11px] font-medium text-brand-dark/60 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-brand-cream/60">
        <Loader2 className="h-3 w-3 animate-spin text-brand-orange" aria-hidden="true" />
        {pendingLabel}
      </div>
    );
  }
  return (
    <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-600/15 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
      <Check className="h-3 w-3" aria-hidden="true" />
      {doneLabel}
    </div>
  );
}

export function ChatMessageBubble({
  message,
  isLastMessage = false,
  isStreaming = false,
  onLeadResolve,
}: {
  message: UIMessage;
  isLastMessage?: boolean;
  // True while any reply is in flight; only the trailing text bubble of the
  // last assistant message actually renders the cursor.
  isStreaming?: boolean;
  // Resolves a pending capture_lead tool call (wired to addToolOutput). The
  // SDK only attaches tool outputs to the last message, so pending cards on
  // earlier messages render in an expired state instead.
  onLeadResolve?: (toolCallId: string, output: LeadToolOutput) => void;
}) {
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

  function flushBubble(showCursor = false) {
    // Blank line between text parts (the bubble is whitespace-pre-wrap) — a
    // reply split around a tool call would otherwise run its sentences together.
    const text = textParts.join("\n\n");
    if (!text && pendingHighlights.length === 0) return;
    const highlights = pendingHighlights;
    textParts = [];
    pendingHighlights = [];
    blocks.push(
      <Arrival key={`bubble-${blocks.length}`}>
        <BubbleShell isUser={isUser}>
          {/* Linkify assistant replies only — user-typed text stays plain. */}
          {isUser ? text : renderInlineContent(text)}
          {showCursor && text.length > 0 && <StreamingCursor />}
          {highlights.map((h) => (
            <HighlightCard key={h.key} {...h.props} />
          ))}
        </BubbleShell>
      </Arrival>,
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
        const output = part.output as BookingCardProps;
        const hasSlots = !output.fallback && (output.slots ?? []).length > 0;
        blocks.push(
          <Arrival key={part.toolCallId}>
            <div className="flex flex-col items-start gap-2">
              <ToolChip
                state="done"
                pendingLabel="Checking availability…"
                doneLabel={hasSlots ? "Found open times" : "Booking link ready"}
              />
              <BookingCard {...output} />
            </div>
          </Arrival>,
        );
      } else if (part.state !== "output-error") {
        // Server-side tool: pending is only plausible mid-stream. If the chat
        // has settled with the call still pending (interrupted stream), no
        // output can ever arrive — degrade to the fallback card.
        if (isLastMessage && isStreaming) {
          // Live availability is being fetched server-side — chip + skeleton.
          blocks.push(
            <Arrival key={part.toolCallId}>
              <div className="flex flex-col items-start gap-2">
                <ToolChip
                  state="pending"
                  pendingLabel="Checking availability…"
                  doneLabel="Found open times"
                />
                <BookingSkeleton />
              </div>
            </Arrival>,
          );
        } else {
          // An earlier message can never receive its output (e.g. a session
          // restored mid-fetch) — degrade to the plain "Book a call" card
          // instead of pulsing forever. No chip: it never checked.
          blocks.push(
            <Arrival key={part.toolCallId}>
              <BookingCard fallback />
            </Arrival>,
          );
        }
      }
      continue;
    }

    if (part.type === "tool-show_portfolio" && "state" in part) {
      flushBubble();
      if (part.state === "output-available") {
        const projects = (part.output as { projects: PortfolioCardData[] }).projects;
        blocks.push(
          <Arrival key={part.toolCallId}>
            <div className="flex flex-col items-start gap-2">
              <ToolChip state="done" pendingLabel="Pulling up projects…" doneLabel="Projects ready" />
              {projects.map((project) => (
                <PortfolioCard key={project.slug} project={project} />
              ))}
            </div>
          </Arrival>,
        );
      } else if (part.state !== "output-error" && isLastMessage && isStreaming) {
        // The model is mid tool-call — fills the gap before the cards land.
        // Settled + still pending = orphaned call (interrupted stream): render
        // nothing rather than a chip that spins forever.
        blocks.push(
          <Arrival key={part.toolCallId}>
            <ToolChip state="pending" pendingLabel="Pulling up projects…" doneLabel="Projects ready" />
          </Arrival>,
        );
      }
      continue;
    }

    if (part.type === "tool-capture_lead" && "state" in part) {
      flushBubble();
      if (part.state === "input-available") {
        blocks.push(
          <Arrival key={part.toolCallId}>
            <LeadConfirmationCard
              proposed={(part.input ?? {}) as LeadProposedInput}
              expired={!isLastMessage || !onLeadResolve}
              onResolve={(output) => onLeadResolve?.(part.toolCallId, output)}
            />
          </Arrival>,
        );
      } else if (part.state === "output-available") {
        blocks.push(
          <Arrival key={part.toolCallId}>
            <LeadResolvedCard output={part.output as LeadToolOutput} />
          </Arrival>,
        );
      } else if (part.state === "output-error") {
        blocks.push(
          <Arrival key={part.toolCallId}>
            <LeadResolvedCard output={{ success: false }} />
          </Arrival>,
        );
      }
    }
  }
  // The trailing flush is the only block that can still be growing — earlier
  // flushes were cut off by a tool card, so their text is final.
  flushBubble(isStreaming && isLastMessage && !isUser);

  // Tool-only turns with nothing renderable (e.g. a still-streaming tool
  // input) would otherwise produce an empty wrapper.
  if (blocks.length === 0) return null;

  return <div className="space-y-2.5">{blocks}</div>;
}
