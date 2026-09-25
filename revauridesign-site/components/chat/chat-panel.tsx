"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { ChatEmptyState } from "@/components/chat/chat-empty-state";

const CONTACT_EMAIL = "david.mercer@revauridesign.com";

const PANEL_CARD_CLASS =
  "rounded-none border border-brand-dark/[0.06] bg-brand-white shadow-[0_24px_64px_-16px_rgba(20,20,19,0.28),0_0_0_1px_rgba(20,20,19,0.04)] dark:border-white/[0.08] dark:bg-[#1a1a19] dark:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.75)] sm:rounded-[20px]";

const ICON_BUTTON_CLASS =
  "flex h-11 w-11 items-center justify-center rounded-full text-brand-dark/70 transition-colors hover:bg-brand-dark/[0.05] hover:text-brand-dark active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-white sm:h-8 sm:w-8 dark:text-brand-cream/70 dark:hover:bg-white/[0.06] dark:hover:text-brand-cream dark:focus-visible:ring-offset-[#1a1a19]";

const TEXTAREA_MAX_HEIGHT = 120;

export function ChatPanel({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) {
  const [draft, setDraft] = useState("");
  const [wasReset, setWasReset] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [isMobileModal, setIsMobileModal] = useState(false);
  const pathname = usePathname();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function resizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
  }

  function scrollToBottom() {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobileModal(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom();
    const desktop = window.matchMedia("(min-width: 640px)").matches;
    if (desktop) {
      textareaRef.current?.focus({ preventScroll: true });
    } else {
      panelRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

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

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNote(trimmed);
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleReset() {
    setNote(null);
    setDraft("");
    setWasReset(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
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
      className={`flex h-full w-full flex-col overflow-hidden outline-none sm:h-[600px] sm:max-h-[calc(100dvh-3rem)] sm:w-[380px] ${PANEL_CARD_CLASS}`}
    >
      <div className="flex items-center justify-between border-b border-brand-dark/[0.06] bg-brand-white/85 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md sm:pt-4 dark:border-white/[0.08] dark:bg-[#1a1a19]/85">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-cream shadow-[0_6px_16px_-4px_rgba(217,119,87,0.45)] ring-1 ring-brand-orange/50 ring-offset-2 ring-offset-brand-white dark:bg-brand-cream dark:ring-offset-[#1a1a19]"
          >
            <Image src="/apple-icon.png" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight tracking-tight text-brand-dark dark:text-brand-cream">
              Rev
            </p>
            <p className="mt-1 text-[11px] leading-none text-brand-dark/60 dark:text-brand-cream/60">
              Email us
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button type="button" onClick={handleReset} className={ICON_BUTTON_CLASS} aria-label="Reset conversation">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button type="button" onClick={onClose} className={ICON_BUTTON_CLASS} aria-label="Close chat">
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden bg-brand-cream/70 dark:bg-[#161615]">
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="Conversation with Rev"
          className="h-full space-y-3 overflow-y-auto overscroll-y-contain px-4 py-4 [-webkit-overflow-scrolling:touch]"
        >
          {note ? (
            <>
              <div className="flex justify-end">
                <div className="max-w-[86%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-dark px-3.5 py-2.5 text-[13px] font-medium leading-[1.55] text-brand-cream shadow-[0_4px_12px_-6px_rgba(20,20,19,0.4)] dark:bg-brand-cream dark:text-brand-dark">
                  {note}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-brand-dark/[0.06] bg-brand-white px-3.5 py-2.5 text-[13px] leading-[1.55] text-brand-dark shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-brand-cream">
                  Email{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-brand-orange underline decoration-brand-orange/40 underline-offset-[3px] transition-colors hover:decoration-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 rounded-sm"
                  >
                    {CONTACT_EMAIL}
                  </a>{" "}
                  and we&apos;ll pick this up from there.
                </div>
              </div>
            </>
          ) : (
            <ChatEmptyState
              mode={wasReset ? "reset" : "initial"}
              pathname={pathname}
              onSelect={handleSend}
            />
          )}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSend(draft);
        }}
        className="border-t border-brand-dark/[0.06] bg-brand-white px-3.5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3 dark:border-white/[0.08] dark:bg-[#1a1a19]"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-brand-dark/[0.08] bg-brand-white py-1.5 pl-3.5 pr-1.5 shadow-sm transition-[border-color,box-shadow] duration-200 focus-within:border-brand-orange/50 focus-within:ring-4 focus-within:ring-brand-orange/10 dark:border-white/[0.1] dark:bg-white/[0.04] dark:focus-within:border-brand-orange/60">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend(draft);
              }
            }}
            placeholder="Type a message..."
            aria-label="Message Rev"
            rows={1}
            style={{ maxHeight: TEXTAREA_MAX_HEIGHT }}
            className="min-w-0 flex-1 resize-none overflow-y-auto bg-transparent py-[5px] text-base text-brand-dark placeholder:text-brand-dark/45 focus:outline-none sm:py-[7px] sm:text-sm dark:text-brand-cream dark:placeholder:text-brand-cream/45"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white shadow-[0_4px_12px_-4px_rgba(217,119,87,0.6)] transition-all hover:shadow-[0_6px_16px_-4px_rgba(217,119,87,0.7)] hover:brightness-[1.05] active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-brand-dark/[0.08] disabled:text-brand-dark/35 disabled:shadow-none disabled:hover:brightness-100 disabled:active:scale-100 dark:disabled:bg-white/[0.08] dark:disabled:text-brand-cream/35"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
}
