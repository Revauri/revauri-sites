"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from "ai";
import { ArrowDown, ArrowUp, RotateCcw, Square, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { BubbleShell, ChatMessageBubble } from "./chat-message-bubble";
import { ChatEmptyState } from "@/components/chat/chat-empty-state";
import type { LeadToolOutput } from "@/components/chat/lead-confirmation-card";

const PANEL_CARD_CLASS =
  "rounded-none border border-brand-light-gray/60 bg-brand-white shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:rounded-[22px]";

const TEXTAREA_MAX_HEIGHT = 96; // ~4 lines, keeps the panel's fixed height usable
const MESSAGES_STORAGE_KEY = "revauri-chat-messages";

function loadStoredMessages(): UIMessage[] | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(MESSAGES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

// Mirrors what ChatMessageBubble renders, so the typing dots disappear the
// moment the reply shows anything — first text token or a card/skeleton.
function hasVisibleContent(message: UIMessage) {
  return message.parts.some((part) => {
    if (part.type === "text") return part.text.length > 0;
    if (!("state" in part)) return false;
    switch (part.type) {
      case "tool-offer_booking":
        return part.state !== "output-error"; // skeleton renders before output
      case "tool-capture_lead":
        return part.state !== "input-streaming";
      case "tool-get_project_highlight":
      case "tool-show_portfolio":
        return part.state === "output-available";
      default:
        return false;
    }
  });
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState("");
  const [wasReset, setWasReset] = useState(false);
  const [initialMessages] = useState(loadStoredMessages);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true); // whether the view is stuck to the newest message
  const [showJump, setShowJump] = useState(false);
  const pathname = usePathname();
  // The panel stays mounted across client navigations, so the transport reads
  // the pathname from a ref at send time — each request carries the page the
  // visitor is actually on (see prepareSendMessagesRequest below).
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);
  const [transport] = useState(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ id, messages, body, trigger, messageId }) => ({
          body: { ...body, id, messages, trigger, messageId, pathname: pathnameRef.current },
        }),
      }),
  );
  const { messages, sendMessage, setMessages, status, stop, addToolOutput, error, regenerate } = useChat({
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  // Resolves a pending capture_lead confirmation card with the real /api/lead
  // result; sendAutomaticallyWhen then triggers Rev's follow-up. Works for
  // cards restored from sessionStorage too, as long as they sit on the last
  // message (the SDK only attaches outputs there — earlier pending cards
  // render as expired).
  function handleLeadResolve(toolCallId: string, output: LeadToolOutput) {
    addToolOutput({ tool: "capture_lead", toolCallId, output });
  }

  useEffect(() => {
    try {
      sessionStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
  }, [messages]);

  const isStreaming = status === "submitted" || status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const showTypingDots =
    status === "submitted" ||
    (status === "streaming" &&
      !(lastMessage?.role === "assistant" && hasVisibleContent(lastMessage)));
  // The transport surfaces non-2xx bodies as the error message, so the route's
  // 429 body ({"error":"Too many requests"}) is detectable here.
  const isRateLimited = error?.message.includes("Too many requests") ?? false;

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }

  // Land at the latest message and move focus into the panel when it opens.
  useEffect(() => {
    scrollToBottom("instant");
    textareaRef.current?.focus({ preventScroll: true });
  }, []);

  // On small screens the panel is fullscreen (fixed inset-0), so keep Tab and
  // Shift+Tab cycling inside it. Desktop keeps normal tab order — the page
  // behind the floating panel stays interactive there.
  function handlePanelKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab" || window.matchMedia("(min-width: 640px)").matches) return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables?.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // Follow new content while pinned to the bottom; otherwise offer a jump pill.
  useEffect(() => {
    if (pinnedRef.current) scrollToBottom();
    else setShowJump(true);
  }, [messages, status, error]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    pinnedRef.current = atBottom;
    if (atBottom) setShowJump(false);
  }

  // Abort any in-flight stream when the panel unmounts (e.g. closed mid-reply).
  // stop() is a no-op when the chat is idle.
  useEffect(() => {
    return () => {
      void stop();
    };
  }, [stop]);

  function handleSend(text: string) {
    if (!text.trim()) return;
    sendMessage({ text });
  }

  function submitDraft() {
    if (isStreaming) return; // no sends mid-stream; the button is a stop control
    handleSend(draft);
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitDraft();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitDraft();
    }
  }

  function handleReset() {
    stop();
    setMessages([]);
    setWasReset(true);
    try {
      sessionStorage.removeItem(MESSAGES_STORAGE_KEY);
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
  }

  return (
    <div
      ref={panelRef}
      onKeyDown={handlePanelKeyDown}
      className={`flex h-full w-full flex-col overflow-hidden sm:h-[561px] sm:max-h-[calc(100dvh-3rem)] sm:w-[352px] ${PANEL_CARD_CLASS}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-light-gray/60 px-[18px] pt-[18px] pb-3.5 dark:border-brand-mid-gray/20">
        <div>
          <Logo />
          <p className="mt-0.5 text-[10px] leading-tight text-brand-mid-gray">
            Rev · AI assistant — replies are automated.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 active:scale-[0.92] active:bg-brand-light-gray/70 dark:text-brand-cream"
            aria-label="Reset conversation"
          >
            <RotateCcw className="h-[18px] w-[18px]" />
          </button>
          <button
            onClick={onClose}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 active:scale-[0.92] active:bg-brand-light-gray/70 dark:text-brand-cream"
            aria-label="Close chat"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          role="log"
          aria-live="polite"
          aria-label="Conversation with Rev"
          className="h-full space-y-3.5 overflow-y-auto px-[18px] py-[18px]"
        >
          {messages.map((message, index) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              isLastMessage={index === messages.length - 1}
              onLeadResolve={handleLeadResolve}
            />
          ))}

          {messages.length === 0 && (
            <ChatEmptyState
              mode={wasReset ? "reset" : "initial"}
              pathname={pathname}
              onSelect={handleSend}
            />
          )}

          {showTypingDots && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl bg-brand-cream px-4 py-3 dark:bg-brand-light-gray/10">
                <span className="sr-only">Rev is typing…</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-dot-wave rounded-full bg-brand-orange [animation-delay:0s]" />
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-dot-wave rounded-full bg-brand-orange [animation-delay:0.15s]" />
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-dot-wave rounded-full bg-brand-orange [animation-delay:0.3s]" />
              </div>
            </div>
          )}

          {error && !isStreaming && (
            <BubbleShell isUser={false}>
              {isRateLimited ? (
                <span>
                  {"You're sending messages quickly — give it a few seconds and try again."}
                </span>
              ) : (
                <>
                  <span>
                    {"Something went wrong on my end — try again, or email joseph@revauri.com."}
                  </span>
                  <button
                    type="button"
                    onClick={() => regenerate()}
                    className="mt-2 block rounded-full bg-brand-orange px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-[1.04] active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  >
                    Retry
                  </button>
                </>
              )}
            </BubbleShell>
          )}
        </div>

        {showJump && (
          <button
            type="button"
            onClick={() => {
              pinnedRef.current = true;
              setShowJump(false);
              scrollToBottom();
            }}
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-dark px-3.5 py-1.5 text-xs font-semibold text-brand-cream shadow-md transition-all hover:brightness-110 active:scale-[0.95] dark:bg-brand-cream dark:text-brand-dark"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            Jump to latest
          </button>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-brand-light-gray/60 px-4 py-3.5 dark:border-brand-mid-gray/20"
      >
        <div className="flex items-center gap-2 rounded-full border border-transparent bg-brand-light-gray/40 px-3.5 py-1.5 transition-colors focus-within:border-brand-orange dark:bg-brand-light-gray/10">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            aria-label="Message Rev"
            rows={1}
            style={{ maxHeight: TEXTAREA_MAX_HEIGHT }}
            // text-base at mobile widths — anything under 16px makes iOS zoom on focus
            className="flex-1 resize-none overflow-y-auto bg-transparent text-base text-brand-dark placeholder:text-brand-mid-gray focus:outline-none sm:text-sm dark:text-brand-cream"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={() => stop()}
              aria-label="Stop generating"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white transition-all hover:shadow-[0_0_14px_rgba(217,119,87,0.65)] hover:brightness-[1.04] active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white transition-all hover:shadow-[0_0_14px_rgba(217,119,87,0.65)] hover:brightness-[1.04] active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none disabled:hover:brightness-100 disabled:active:scale-100"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
