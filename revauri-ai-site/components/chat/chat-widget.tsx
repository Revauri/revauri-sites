"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ChatLauncherButton } from "./chat-launcher-button";
import { isCookieBannerVisible, onCookieBannerVisibilityChanged } from "@/lib/analytics";

// Loaded on demand so visitors who never open the chat don't download the
// panel + AI SDK code. A panel-shaped shell masks the brief first load.
const ChatPanel = dynamic(() => import("./chat-panel").then((mod) => mod.ChatPanel), {
  ssr: false,
  loading: () => <ChatPanelShell />,
});

// Warm the panel chunk before the visitor clicks (launcher hover/focus/press).
function prefetchChatPanel() {
  void import("./chat-panel");
}

const OPEN_STORAGE_KEY = "revauri-chat-open";
const SM_MQ = "(min-width: 640px)";

const PANEL_SHELL_CLASS =
  "flex h-full w-full flex-col overflow-hidden rounded-none border border-brand-light-gray/60 bg-brand-white shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:h-[561px] sm:max-h-[calc((100dvh-3rem)/1.1)] sm:w-[352px] sm:rounded-[22px] sm:[zoom:1.1]";

/** Placeholder that matches panel chrome so open animation never runs on an empty box. */
function ChatPanelShell() {
  return (
    <div className={PANEL_SHELL_CLASS} aria-busy="true" aria-label="Loading chat">
      <div className="flex items-center justify-between border-b border-brand-light-gray/60 px-[18px] pt-[max(1.125rem,env(safe-area-inset-top))] pb-3.5 sm:pt-[18px] dark:border-brand-mid-gray/20">
        <div>
          <div className="h-6 w-24 animate-pulse rounded bg-brand-light-gray/60 dark:bg-brand-mid-gray/20" />
          <div className="mt-1 h-2.5 w-16 animate-pulse rounded bg-brand-light-gray/40 dark:bg-brand-mid-gray/15" />
        </div>
      </div>
      <div className="flex-1" />
      <div className="border-t border-brand-light-gray/60 px-4 pt-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:pb-3.5 dark:border-brand-mid-gray/20">
        <div className="h-10 animate-pulse rounded-[22px] bg-brand-light-gray/40 dark:bg-brand-mid-gray/15" />
      </div>
    </div>
  );
}

function clearKeyboardPadding(node: HTMLElement) {
  node.style.paddingTop = "";
  node.style.paddingBottom = "";
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // Once opened, the panel stays mounted (hidden when closed) so an in-flight
  // reply keeps streaming to completion — closing the chat no longer aborts it.
  const [hasOpened, setHasOpened] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const pathWhenOpenedRef = useRef<string | null>(null);
  const bodyLockScrollYRef = useRef(0);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setCookieBannerOpen(isCookieBannerVisible());
    return onCookieBannerVisibilityChanged(() => setCookieBannerOpen(isCookieBannerVisible()));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(SM_MQ);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    try {
      setIsOpen(sessionStorage.getItem(OPEN_STORAGE_KEY) === "1");
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(OPEN_STORAGE_KEY, isOpen ? "1" : "0");
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
  }, [isOpen, hydrated]);

  useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  // Escape closes the panel from anywhere on the page.
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Return focus to the launcher after the panel closes (never on page load).
  useEffect(() => {
    if (!isOpen && wasOpenRef.current) launcherRef.current?.focus();
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Capture the route only at the moment the panel opens (not on later
  // navigations). Close when the visitor leaves that route so destinations
  // like /book aren't hidden behind the fullscreen mobile panel.
  useEffect(() => {
    if (!isOpen) {
      pathWhenOpenedRef.current = null;
      return;
    }
    if (pathWhenOpenedRef.current === null) {
      pathWhenOpenedRef.current = pathname;
    }
  }, [isOpen, pathname]);

  useEffect(() => {
    if (!isOpen || pathWhenOpenedRef.current === null) return;
    if (pathname !== pathWhenOpenedRef.current) setIsOpen(false);
  }, [pathname, isOpen]);

  // Hard body lock on mobile: position:fixed freezes the page under the
  // panel so iOS keyboard dismiss can't scroll the document into view.
  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia(SM_MQ);
    const body = document.body;
    const html = document.documentElement;

    function lock() {
      if (mq.matches) {
        body.style.overflow = "";
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        html.style.overflow = "";
        return;
      }
      bodyLockScrollYRef.current = window.scrollY;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${bodyLockScrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    }

    function unlock() {
      const y = bodyLockScrollYRef.current;
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, y);
    }

    lock();
    mq.addEventListener("change", lock);
    return () => {
      mq.removeEventListener("change", lock);
      unlock();
    };
  }, [isOpen]);

  // Warm the panel chunk after idle so the first tap is less likely cold.
  // Skip when the user has requested reduced data.
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (nav.connection?.saveData) return;

    let cancelled = false;
    const run = () => {
      if (!cancelled) prefetchChatPanel();
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(run, { timeout: 3000 });
    } else {
      timeoutId = setTimeout(run, 2000);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  // Keyboard avoidance without moving the shell:
  // The overlay stays fixed inset-0 with an opaque fill for the whole layout
  // viewport — that is what prevents the site from flashing through when iOS
  // animates the keyboard. We only pad the shell so the chat UI sits in the
  // visual viewport; we never change top/height of the overlay itself.
  useEffect(() => {
    if (!isOpen) return;
    const node = outerRef.current;
    if (!node) return;

    function sync() {
      if (!node) return;
      if (window.matchMedia(SM_MQ).matches) {
        clearKeyboardPadding(node);
        return;
      }
      const vv = window.visualViewport;
      if (!vv) {
        clearKeyboardPadding(node);
        return;
      }
      const top = Math.max(0, Math.round(vv.offsetTop));
      const bottom = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      node.style.paddingTop = top > 0 ? `${top}px` : "";
      node.style.paddingBottom = bottom > 0 ? `${bottom}px` : "";
    }

    const vv = window.visualViewport;
    if (!vv) return;

    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);
    sync();
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      clearKeyboardPadding(node);
    };
  }, [isOpen]);

  // Mobile: fade + slight rise (sheet-like). Desktop: slide in from the right.
  // Opacity-only motion would also work; keep a small rise for polish. Never
  // animate height/top — those fight the keyboard.
  const motionInitial = reducedMotion
    ? { opacity: 0 }
    : isDesktop
      ? { opacity: 0, x: 24, y: 0 }
      : { opacity: 0, x: 0, y: 12 };
  const motionExit = reducedMotion
    ? { opacity: 0 }
    : isDesktop
      ? { opacity: 0, x: 24, y: 0 }
      : { opacity: 0, x: 0, y: 12 };
  const motionTransition = reducedMotion
    ? { duration: 0.01 }
    : isDesktop
      ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
      : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };

  if (pathname.startsWith("/inbox")) return null;

  return (
    <>
      {!isOpen && (
        <ChatLauncherButton
          ref={launcherRef}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          onPrefetch={prefetchChatPanel}
          cookieBannerOpen={cookieBannerOpen}
        />
      )}

      {hasOpened && (
        <motion.div
          ref={outerRef}
          initial={motionInitial}
          // visibility flips at the start of the open animation / end of the
          // close one, so the hidden panel never intercepts clicks or focus.
          animate={
            isOpen
              ? { opacity: 1, x: 0, y: 0, visibility: "visible" as const }
              : { ...motionExit, visibility: "hidden" as const }
          }
          transition={motionTransition}
          aria-hidden={!isOpen}
          // z-[90] above cookie banner (z-80). Mobile: opaque full-bleed
          // shell that never leaves inset-0 — page content cannot show through
          // during keyboard transitions. Desktop: transparent around the card.
          className={`fixed inset-0 z-[90] flex flex-col overflow-hidden overscroll-none bg-brand-white dark:bg-[#1a1a19] sm:inset-auto sm:bottom-6 sm:right-6 sm:block sm:overflow-visible sm:bg-transparent ${
            cookieBannerOpen ? "lg:bottom-32" : ""
          } ${isOpen ? "" : "pointer-events-none"}`}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col sm:block sm:flex-none">
            <ChatPanel onClose={() => setIsOpen(false)} isOpen={isOpen} />
          </div>
        </motion.div>
      )}
    </>
  );
}
