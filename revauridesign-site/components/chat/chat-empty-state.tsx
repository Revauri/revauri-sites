import {
  Briefcase,
  Calendar,
  ChevronRight,
  DollarSign,
  ListChecks,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

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
    <div className="pt-2">
      {/* Greeting sits directly on the message surface (not in a bubble) so the
          first thing visitors see reads as an intro, not as a reply. */}
      <div className="px-1">
        <p className="text-[15px] font-semibold leading-tight tracking-tight text-brand-dark dark:text-brand-cream">
          {mode === "initial" ? "Hi, I'm Rev." : "Conversation cleared"}
        </p>
        <p className="mt-1.5 max-w-[30ch] text-[13px] leading-[1.55] text-brand-dark/60 dark:text-brand-cream/60">
          {mode === "initial"
            ? "Ask about pricing, timelines, or anything else — I'm here to help."
            : "Ask a new question whenever you're ready."}
        </p>
      </div>
      {mode === "initial" && (
        <>
          <div className="mt-5 flex w-full flex-col gap-2">
            {startersFor(pathname).map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => onSelect(label)}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-brand-dark/[0.06] bg-brand-white px-3 py-2.5 text-left shadow-sm transition-all duration-200 hover:border-brand-orange/40 hover:shadow-[0_8px_20px_-10px_rgba(217,119,87,0.45)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream dark:border-white/[0.08] dark:bg-white/[0.05] dark:hover:border-brand-orange/50 dark:focus-visible:ring-offset-[#161615]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white dark:bg-brand-orange/15">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-brand-dark dark:text-brand-cream">
                    {label}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-brand-dark/30 transition-all group-hover:translate-x-0.5 group-hover:text-brand-orange dark:text-brand-cream/30" />
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] leading-snug text-brand-dark/45 dark:text-brand-cream/45">
            Conversations may be reviewed by our team.
          </p>
        </>
      )}
    </div>
  );
}
