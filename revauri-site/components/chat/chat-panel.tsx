"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ChatMessageBubble } from "./chat-message-bubble";
import { QuickReplies } from "./quick-replies";

const PANEL_CARD_CLASS =
  "rounded-2xl border border-brand-light-gray/60 bg-brand-white shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]";

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isStreaming = status === "submitted" || status === "streaming";

  function handleSend(text: string) {
    if (!text.trim()) return;
    sendMessage({ text });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSend(draft);
    setDraft("");
  }

  return (
    <div
      className={`flex h-[32rem] w-[22rem] flex-col overflow-hidden ${PANEL_CARD_CLASS}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-light-gray/60 px-4 py-3 dark:border-brand-mid-gray/20">
        <Logo />
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 dark:text-brand-cream"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        {messages.length === 0 && (
          <QuickReplies onSelect={(text) => handleSend(text)} />
        )}

        {isStreaming && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl bg-brand-cream px-4 py-3 dark:bg-brand-light-gray/10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-mid-gray [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-mid-gray [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-mid-gray" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-brand-light-gray/60 px-3 py-3 dark:border-brand-mid-gray/20"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-brand-light-gray bg-brand-cream/50 px-3 py-2 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:brightness-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          Send
        </button>
      </form>
    </div>
  );
}
