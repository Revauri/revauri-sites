const QUICK_REPLIES = [
  "See pricing approach",
  "Book a call",
  "View portfolio",
  "Talk to a person",
];

export function QuickReplies({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_REPLIES.map((text) => (
        <button
          key={text}
          onClick={() => onSelect(text)}
          className="whitespace-nowrap rounded-full bg-brand-light-gray/40 px-4 py-2 text-[12.5px] font-medium text-brand-dark/60 transition-colors hover:bg-brand-light-gray/70 dark:bg-brand-mid-gray/20 dark:text-brand-cream/60"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
