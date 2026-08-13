"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from "ai";
import { ArrowDown, ArrowUp, RotateCcw, Square, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { BubbleShell, ChatMessageBubble } from "./chat-message-bubble";
import { ChatEmptyState } from "@/components/chat/chat-empty-state";
import type { LeadToolOutput } from "@/components/chat/lead-confirmation-card";
import { notifyNewChat } from "@/lib/chat/notify-new-chat";

const PANEL_CARD_CLASS =
  "rounded-none border border-brand-light-gray/60 bg-brand-white shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:rounded-[22px]";

const TEXTAREA_MAX_HEIGHT = 120; // ~5 lines incl. padding; beyond this it scrolls internally
const MESSAGES_STORAGE_KEY = "revauri-chat-messages";
const CONVERSATION_ID_KEY = "revauri-chat-conversation-id";
const NOTIFIED_KEY = "revauri-chat-notified";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function loadOrCreateConversationId(): string {
  try {
    const existing = sessionStorage.getItem(CONVERSATION_ID_KEY);
    if (existing && UUID_RE.test(existing)) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(CONVERSATION_ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function wasAlreadyNotified(): boolean {
  try {
    return sessionStorage.getItem(NOTIFIED_KEY) === "1";
  } catch {
    return false;
  }
}

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
  const [isMobileModal, setIsMobileModal] = useState(false);
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
  const conversationIdRef = useRef(loadOrCreateConversationId());
  const notifiedRef = useRef(wasAlreadyNotified());
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);
  const [transport] = useState(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ id, messages, body, trigger, messageId }) => ({
          body: {
            ...body,
            id,
            messages,
            trigger,
            messageId,
            pathname: pathnameRef.current,
            conversationId: conversationIdRef.current || undefined,
          },
        }),
      }),
  );
  // True while handleSend is resolving a pending confirmation card as
  // "dismissed": it keeps sendAutomaticallyWhen from firing its own request
  // for that tool output, so the dismissal and the typed message travel in
  // the single request sendMessage makes right after.
  const suppressAutoSendRef = useRef(false);
  const { messages, sendMessage, setMessages, status, stop, addToolOutput, error, regenerate } = useChat({
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: (options) =>
      !suppressAutoSendRef.current && lastAssistantMessageIsCompleteWithToolCalls(options),
  });

  // Resolves a pending capture_lead confirmation card with the real Web3Forms
  // delivery result; sendAutomaticallyWhen then triggers Rev's follow-up. Works for
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

  // Fullscreen on mobile acts as a modal; desktop floating card does not
  // (page behind stays interactive — see handlePanelKeyDown).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobileModal(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Land at the latest message when the panel opens. Autofocus the textarea
  // only on desktop — on mobile it would pop the soft keyboard mid-open and
  // fight the entrance animation / visual viewport.
  useEffect(() => {
    scrollToBottom("instant");
    const desktop = window.matchMedia("(min-width: 640px)").matches;
    if (desktop) {
      textareaRef.current?.focus({ preventScroll: true });
    } else {
      panelRef.current?.focus({ preventScroll: true });
    }
  }, []);

  // Internal links (booking, portfolio, etc.) navigate under the layout-level
  // chat shell — close immediately so the destination is visible. External /
  // new-tab links (Calendly slot deep links) leave the panel open.
  function handlePanelClickCapture(e: MouseEvent<HTMLDivElement>) {
    const anchor = (e.target as Element | null)?.closest?.("a");
    if (!anchor) return;
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }
    const isInternal =
      href.startsWith("/") ||
      (typeof window !== "undefined" && href.startsWith(window.location.origin));
    if (isInternal) onClose();
  }

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

  async function handleSend(text: string) {
    if (!text.trim()) return;
    // A typed reply while a "confirm your details" card is still pending
    // resolves the card as dismissed first, so the tool call completes (the
    // server drops dangling tool calls entirely) and the model knows nothing
    // was sent. The suppress ref makes the SDK's auto-send check — evaluated
    // while addToolOutput applies the output — return false, so no request
    // fires here; the dismissal rides along with the typed message below.
    const last = messages[messages.length - 1];
    const pendingLead =
      last?.role === "assistant"
        ? last.parts.find(
            (part): part is Extract<(typeof last.parts)[number], { type: `tool-${string}` }> =>
              part.type === "tool-capture_lead" && "state" in part && part.state === "input-available",
          )
        : undefined;
    if (pendingLead) {
      suppressAutoSendRef.current = true;
      try {
        await addToolOutput({
          tool: "capture_lead",
          toolCallId: pendingLead.toolCallId,
          output: { status: "dismissed", success: false } satisfies LeadToolOutput,
        });
      } finally {
        suppressAutoSendRef.current = false;
      }
    }
    const preview = text.trim();
    if (!notifiedRef.current && preview) {
      notifiedRef.current = true;
      try {
        sessionStorage.setItem(NOTIFIED_KEY, "1");
      } catch {
        // private browsing — still send the email once via the ref
      }
      void notifyNewChat({
        preview: preview.slice(0, 180),
        pathname: pathnameRef.current || "/",
        conversationId: conversationIdRef.current,
      });
    }
    sendMessage({ text });
  }

  // Auto-grow: measure the content, clamp at TEXTAREA_MAX_HEIGHT, and let the
  // textarea's own overflow-y-auto take over past the cap so text always stays
  // inside the field's border.
  function resizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    if (el.value) el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
  }

  function submitDraft() {
    if (isStreaming) return; // no sends mid-stream; the button is a stop control
    void handleSend(draft);
    setDraft("");
    // The DOM value clears on the next render; drop the inline height now so
    // the field snaps back to a single line (rows={1}).
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
    notifiedRef.current = false;
    const nextId = crypto.randomUUID();
    conversationIdRef.current = nextId;
    try {
      sessionStorage.removeItem(MESSAGES_STORAGE_KEY);
      sessionStorage.removeItem(NOTIFIED_KEY);
      sessionStorage.setItem(CONVERSATION_ID_KEY, nextId);
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
  }

  return (
    <div
      ref={panelRef}
      role={isMobileModal ? "dialog" : undefined}
      aria-modal={isMobileModal ? true : undefined}
      aria-label="Chat with Rev"
      tabIndex={-1}
      onClickCapture={handlePanelClickCapture}
      onKeyDown={handlePanelKeyDown}
      className={`flex h-full w-full flex-col overflow-hidden outline-none sm:h-[561px] sm:max-h-[calc(100dvh-3rem)] sm:w-[352px] ${PANEL_CARD_CLASS}`}
    >
      {/* Header — top safe-area on mobile fullscreen so status bar / notch clear */}
      <div className="flex items-center justify-between border-b border-brand-light-gray/60 px-[18px] pt-[max(1.125rem,env(safe-area-inset-top))] pb-3.5 sm:pt-[18px] dark:border-brand-mid-gray/20">
        <div>
          <Logo />
          <p className="mt-0.5 text-[10px] leading-tight text-brand-mid-gray">
            Rev · AI assistant
          </p>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={handleReset}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 active:scale-[0.92] active:bg-brand-light-gray/70 sm:h-[28px] sm:w-[28px] dark:text-brand-cream"
            aria-label="Reset conversation"
          >
            <RotateCcw className="h-[18px] w-[18px]" />
          </button>
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 active:scale-[0.92] active:bg-brand-light-gray/70 sm:h-[28px] sm:w-[28px] dark:text-brand-cream"
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
          className="h-full space-y-3.5 overflow-y-auto overscroll-y-contain px-[18px] py-[18px] [-webkit-overflow-scrolling:touch]"
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

      {/* Input — bottom safe-area on mobile fullscreen for home indicator */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-brand-light-gray/60 px-4 pt-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:pb-3.5 dark:border-brand-mid-gray/20"
      >
        {/* rounded-[22px] (not rounded-full) so the corner curve stays constant as the
            field grows — a fully-round radius on a multi-line field sweeps inward past
            the side padding and text appears outside the border. items-end keeps the
            send button anchored to the bottom row while the field grows beside it. */}
        <div className="flex items-end gap-2 rounded-[22px] border border-transparent bg-brand-light-gray/40 px-3.5 py-1.5 transition-colors focus-within:border-brand-orange dark:bg-brand-light-gray/10">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            aria-label="Message Rev"
            rows={1}
            style={{ maxHeight: TEXTAREA_MAX_HEIGHT }}
            // py-1/sm:py-1.5 makes the single-line field exactly the send button's 32px
            // height at both line heights (same alignment as before) and insets scrolled
            // text from the pill edges.
            // text-base at mobile widths — anything under 16px makes iOS zoom on focus
            className="min-w-0 flex-1 resize-none overflow-y-auto bg-transparent py-1 text-base text-brand-dark placeholder:text-brand-mid-gray focus:outline-none sm:py-1.5 sm:text-sm dark:text-brand-cream"
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
