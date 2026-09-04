import type { UIMessage } from "ai";
import { ChevronRight } from "lucide-react";

// Follow-up nudges under Rev's latest reply, keyed to what just happened: a
// booking or lead card is its own CTA (chips underneath would be noise).
// Anything else gets the default trio — the same prompts as the empty-state
// starters.
export function followupsFor(message: UIMessage): string[] {
  let hasCardCta = false;
  for (const part of message.parts) {
    if (!("state" in part)) continue;
    if (
      (part.type === "tool-offer_booking" || part.type === "tool-capture_lead") &&
      part.state !== "output-error"
    ) {
      hasCardCta = true;
    }
  }
  if (hasCardCta) return [];
  return ["What jobs can you take?", "How does pricing work?", "Hire one"];
}

export function FollowupChips({
  chips,
  onSelect,
}: {
  chips: string[];
  onSelect: (text: string) => void;
}) {
  return (
    <div aria-label="Suggested follow-ups" className="flex flex-wrap gap-1.5 pt-0.5">
      {chips.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(label)}
          className="group inline-flex items-center gap-1 rounded-full border border-brand-dark/[0.08] bg-brand-white px-3 py-1.5 text-xs font-medium text-brand-dark shadow-sm transition-all duration-200 hover:border-brand-orange/50 hover:bg-brand-orange/[0.06] hover:text-brand-orange active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-brand-cream dark:hover:bg-brand-orange/10 dark:hover:text-brand-orange dark:focus-visible:ring-offset-[#161615]"
        >
          {label}
          <ChevronRight
            className="h-3 w-3 text-brand-dark/30 transition-all group-hover:translate-x-0.5 group-hover:text-brand-orange dark:text-brand-cream/30"
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
