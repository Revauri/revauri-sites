import { Briefcase, Calendar, ChevronRight, DollarSign, MessageCircle } from "lucide-react";

const STARTER_ROWS = [
  { label: "See pricing approach", icon: DollarSign },
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
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange/70">
          <MessageCircle className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-bold text-brand-dark dark:text-brand-cream">
          {mode === "initial" ? "Hi, I'm the Revauri assistant." : "Conversation cleared"}
        </h3>
        <p className="max-w-[280px] text-center text-sm text-brand-mid-gray">
          {mode === "initial"
            ? "Ask about pricing, timelines, or anything else — I'm here to help."
            : "Ask a new question whenever you're ready."}
        </p>
      </div>
      {mode === "initial" && (
        <div className="mt-6 flex w-full flex-col gap-2">
          {STARTER_ROWS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className="group flex items-center justify-between gap-3 rounded-2xl bg-brand-light-gray/40 px-3.5 py-3.5 text-left transition-colors hover:bg-brand-light-gray/60 dark:bg-brand-mid-gray/10"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-brand-orange" />
                <span className="text-[13.5px] font-medium text-brand-dark dark:text-brand-cream">
                  {label}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-brand-mid-gray transition-colors group-hover:text-brand-dark" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
