import {
  Briefcase,
  Calendar,
  ChevronRight,
  DollarSign,
  ListChecks,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { BubbleShell } from "@/components/chat/chat-message-bubble";

type StarterRow = { label: string; icon: LucideIcon };

const DEFAULT_ROWS: StarterRow[] = [
  { label: "Get pricing", icon: DollarSign },
  { label: "Book a call", icon: Calendar },
  { label: "View portfolio", icon: Briefcase },
];

const PRICING_ROWS: StarterRow[] = [
  { label: "How does pricing work?", icon: DollarSign },
  { label: "What's included?", icon: ListChecks },
  { label: "Book a call", icon: Calendar },
];

const PORTFOLIO_ROWS: StarterRow[] = [
  { label: "What have you built?", icon: Briefcase },
  { label: "Could you build something like this for me?", icon: Sparkles },
  { label: "Book a call", icon: Calendar },
];

const PROJECT_ROWS: StarterRow[] = [
  { label: "Tell me about this project", icon: Briefcase },
  { label: "Could you build something like this for me?", icon: Sparkles },
  { label: "Book a call", icon: Calendar },
];

// Always exactly three rows; only the copy varies by page.
function startersFor(pathname: string): StarterRow[] {
  if (pathname === "/pricing") return PRICING_ROWS;
  if (pathname === "/portfolio") return PORTFOLIO_ROWS;
  if (pathname.startsWith("/portfolio/")) return PROJECT_ROWS;
  return DEFAULT_ROWS;
}

export function ChatEmptyState({
  mode,
  pathname,
  onSelect,
}: {
  mode: "initial" | "reset";
  pathname: string;
  onSelect: (text: string) => void;
}) {
  return (
    <div>
      <BubbleShell isUser={false}>
        <p className="font-semibold text-brand-dark dark:text-brand-cream">
          {mode === "initial" ? "Hi, I'm Rev." : "Conversation cleared"}
        </p>
        <p className="mt-1 text-brand-mid-gray">
          {mode === "initial"
            ? "Ask about pricing, timelines, or anything else — I'm here to help."
            : "Ask a new question whenever you're ready."}
        </p>
        {mode === "initial" ? (
          <p className="mt-2 text-[12px] leading-snug text-brand-mid-gray/80">
            Conversations may be reviewed by our team.
          </p>
        ) : null}
      </BubbleShell>
      {mode === "initial" && (
        <div className="mt-3.5 flex w-full flex-col gap-2">
          {startersFor(pathname).map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className="group flex items-center justify-between gap-2 rounded-xl bg-brand-light-gray/40 px-4 py-3.5 text-left transition-colors hover:bg-brand-orange/10 dark:bg-brand-mid-gray/10 dark:hover:bg-brand-orange/15"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-[18px] w-[18px] shrink-0 text-brand-orange" />
                <span className="text-sm font-medium text-brand-dark dark:text-brand-cream">
                  {label}
                </span>
              </div>
              <ChevronRight className="h-[18px] w-[18px] shrink-0 text-brand-mid-gray transition-colors group-hover:text-brand-dark dark:group-hover:text-brand-cream" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
