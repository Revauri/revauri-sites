"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatLauncherButton } from "./chat-launcher-button";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

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
            className="fixed inset-0 z-40 sm:inset-auto sm:bottom-6 sm:right-6"
          >
            <ChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
