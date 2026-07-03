"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ChatMessageBubble } from "./chat-message-bubble";
import { ChatEmptyState } from "@/components/chat/chat-empty-state";
import { captureLeadInputSchema, submitLead } from "@/lib/chat/tools";

const PANEL_CARD_CLASS =
  "rounded-none border border-brand-light-gray/60 bg-brand-white shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:rounded-[26px]";

const TEXTAREA_MAX_HEIGHT = 96; // ~4 lines, keeps the panel's fixed height usable

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState("");
  const [wasReset, setWasReset] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, setMessages, status, stop, addToolResult } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName !== "capture_lead") return;
      const input = captureLeadInputSchema.parse(toolCall.input);
      const output = await submitLead(input);
      addToolResult({ tool: "capture_lead", toolCallId: toolCall.toolCallId, output });
    },
  });

  const isStreaming = status === "submitted" || status === "streaming";

  function handleSend(text: string) {
    if (!text.trim()) return;
    sendMessage({ text });
  }

  function submitDraft() {
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
  }

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden sm:h-[664px] sm:w-[408px] ${PANEL_CARD_CLASS}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-light-gray/60 px-5 pt-5 pb-4 dark:border-brand-mid-gray/20">
        <div className="flex flex-col gap-0.5">
          <Logo />
          <span className="text-xs font-medium text-brand-mid-gray">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 active:scale-[0.92] active:bg-brand-light-gray/70 dark:text-brand-cream"
            aria-label="Reset conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="flex h-[30px] w-auto items-center justify-center rounded-lg px-2 text-brand-dark transition-colors hover:bg-brand-light-gray/50 active:scale-[0.92] active:bg-brand-light-gray/70 dark:text-brand-cream sm:w-[30px] sm:px-0"
            aria-label="Close chat"
          >
            <X className="hidden h-4 w-4 sm:block" />
            <span className="text-sm font-medium sm:hidden">Close</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3.5 overflow-y-auto px-5 py-5">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        {messages.length === 0 && (
          <ChatEmptyState mode={wasReset ? "reset" : "initial"} onSelect={handleSend} />
        )}

        {isStreaming && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl bg-brand-cream px-4 py-3 dark:bg-brand-light-gray/10">
              <span className="h-1.5 w-1.5 animate-dot-wave rounded-full bg-brand-orange [animation-delay:0s]" />
              <span className="h-1.5 w-1.5 animate-dot-wave rounded-full bg-brand-orange [animation-delay:0.15s]" />
              <span className="h-1.5 w-1.5 animate-dot-wave rounded-full bg-brand-orange [animation-delay:0.3s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="border-t border-brand-light-gray/60 px-[18px] pt-[14px] pb-2 dark:border-brand-mid-gray/20"
        >
          <div className="flex items-end gap-2 rounded-full bg-brand-light-gray/40 px-4 py-2 dark:bg-brand-light-gray/10">
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
              rows={1}
              style={{ maxHeight: TEXTAREA_MAX_HEIGHT }}
              className="flex-1 resize-none overflow-y-auto bg-transparent text-sm text-brand-dark placeholder:text-brand-mid-gray focus:outline-none dark:text-brand-cream"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white transition-transform hover:brightness-[1.04] active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </form>
        <p className="pb-[18px] pt-2 text-center text-[10.5px] uppercase tracking-[0.08em] text-brand-mid-gray">
          Powered by Revauri AI
        </p>
      </div>
    </div>
  );
}
