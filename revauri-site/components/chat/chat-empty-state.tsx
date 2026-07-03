import { Briefcase, Calendar, ChevronRight, DollarSign } from "lucide-react";
import { BubbleShell } from "@/components/chat/chat-message-bubble";

const STARTER_ROWS = [
  { label: "Get pricing", icon: DollarSign },
  { label: "Book a call", icon: Calendar },
  { label: "View portfolio", icon: Briefcase },
];

export function ChatEmptyState({
  mode,
  onSelect,
}: {
  mode: "initial" | "reset";
  onSelect: (text: string) => void;
}) {
  return (
    <div>
      <BubbleShell isUser={false}>
        <p className="font-semibold text-brand-dark dark:text-brand-cream">
          {mode === "initial" ? "Hi, I'm the Revauri assistant." : "Conversation cleared"}
        </p>
        <p className="mt-1 text-brand-mid-gray">
          {mode === "initial"
            ? "Ask about pricing, timelines, or anything else — I'm here to help."
            : "Ask a new question whenever you're ready."}
        </p>
      </BubbleShell>
      {mode === "initial" && (
        <div className="mt-3.5 flex w-full flex-col gap-2">
          {STARTER_ROWS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className="group flex items-center justify-between gap-2 rounded-xl bg-brand-light-gray/40 px-4 py-3.5 text-left transition-colors hover:bg-brand-orange/10 dark:bg-brand-mid-gray/10 dark:hover:bg-brand-orange/15"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-[18px] w-[18px] text-brand-orange" />
                <span className="text-sm font-medium text-brand-dark dark:text-brand-cream">
                  {label}
                </span>
              </div>
              <ChevronRight className="h-[18px] w-[18px] text-brand-mid-gray transition-colors group-hover:text-brand-dark dark:group-hover:text-brand-cream" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
