"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  "flex h-full w-full flex-col overflow-hidden rounded-none border border-brand-light-gray/60 bg-brand-white shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:h-[561px] sm:max-h-[calc(100dvh-3rem)] sm:w-[352px] sm:rounded-[22px]";

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

function clearViewportBox(node: HTMLElement) {
  node.style.top = "";
  node.style.left = "";
  node.style.right = "";
  node.style.bottom = "";
  node.style.height = "";
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const pathWhenOpenedRef = useRef<string | null>(null);
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

  // Lock body scroll while the mobile fullscreen panel is open.
  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia(SM_MQ);
    function apply() {
      document.body.style.overflow = mq.matches ? "" : "hidden";
    }
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.overflow = "";
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

  // Mobile keyboard (standard pattern): keep the shell matched 1:1 to the
  // visual viewport with no CSS transitions. No blur/focus special cases —
  // the panel resizes with the keyboard the way native chat apps do.
  // Desktop leaves the floating card alone. Browsers that honor
  // interactive-widget=resizes-content still benefit from this on iOS.
  useEffect(() => {
    if (!isOpen) return;
    const node = outerRef.current;
    const vv = window.visualViewport;
    if (!node) return;

    function sync() {
      if (!node) return;
      if (window.matchMedia(SM_MQ).matches) {
        clearViewportBox(node);
        return;
      }
      if (!vv) {
        // No visualViewport API — rely on inset-0 + dvh.
        clearViewportBox(node);
        return;
      }
      node.style.top = `${vv.offsetTop}px`;
      node.style.left = "0px";
      node.style.right = "0px";
      node.style.bottom = "auto";
      node.style.height = `${vv.height}px`;
    }

    if (!vv) {
      sync();
      return;
    }

    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);
    sync();
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      clearViewportBox(node);
    };
  }, [isOpen]);

  // Mobile: fade + slight rise (sheet-like). Desktop: slide in from the right.
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={outerRef}
            initial={motionInitial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={motionExit}
            transition={motionTransition}
            // z-[90] sits above the cookie banner (z-80) so open chat is never blocked.
            className={`fixed inset-0 z-[90] h-dvh sm:inset-auto sm:bottom-6 sm:right-6 sm:h-auto ${
              cookieBannerOpen ? "lg:bottom-32" : ""
            }`}
          >
            <ChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
