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
  return ["What jobs can you take?", "How does pricing work?", "Book a call"];
}

export function FollowupChips({
  chips,
  onSelect,
}: {
  chips: string[];
  onSelect: (text: string) => void;
}) {
  return (
    <div aria-label="Suggested follow-ups" className="flex flex-wrap gap-1.5">
      {chips.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(label)}
          className="group inline-flex items-center gap-1 rounded-full border border-brand-light-gray/70 px-3 py-1.5 text-xs font-medium text-brand-dark transition-all hover:border-brand-orange/50 hover:bg-brand-orange/10 active:scale-[0.97] dark:border-brand-mid-gray/30 dark:text-brand-cream dark:hover:bg-brand-orange/15"
        >
          {label}
          <ChevronRight
            className="h-3 w-3 text-brand-mid-gray transition-colors group-hover:text-brand-orange"
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
