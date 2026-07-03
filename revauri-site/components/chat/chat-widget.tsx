"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatLauncherButton } from "./chat-launcher-button";
import { ChatPanel } from "./chat-panel";

const OPEN_STORAGE_KEY = "revauri-chat-open";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

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

  return (
    <>
      {!isOpen && <ChatLauncherButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] sm:inset-auto sm:bottom-6 sm:right-6"
          >
            <ChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
