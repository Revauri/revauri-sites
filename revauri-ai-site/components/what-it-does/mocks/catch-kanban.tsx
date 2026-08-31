const COLUMNS = [
  {
    name: "Incoming",
    count: "2",
    cards: [
      { title: "After-hours call", meta: "Elena V., tooth pain" },
      { title: "Overflow", meta: "quote request" },
    ],
  },
  {
    name: "Captured",
    count: "1",
    cards: [{ title: "Overflow · quote request", meta: "Name and number in" }],
  },
  {
    name: "Waiting on you",
    count: "1",
    cards: [{ title: "Hold Thursday 9:00 AM", meta: "Pre-approved slot" }],
  },
] as const;

export function CatchKanban() {
  return (
    <div className="max-w-full overflow-x-auto">
    <div className="product-frame relative min-h-[360px] overflow-hidden max-[767px]:min-h-[300px] max-[767px]:min-w-[540px]">
      <div className="dotted-grid grid h-full min-h-[360px] grid-cols-3 max-[767px]:min-h-[300px]">
        {COLUMNS.map((col, i) => (
          <div
            key={col.name}
            className={`flex flex-col gap-3 p-3 min-[767px]:p-4 ${
              i < COLUMNS.length - 1
                ? "border-r border-black/[0.06] dark:border-white/[0.06]"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-black/[0.08] bg-white/70 px-2 py-0.5 text-[10px] font-medium text-brand-dark/70 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-brand-cream/70">
                {col.name}
              </span>
              <span className="text-[10px] text-brand-dark/35 dark:text-brand-cream/35">
                {col.count}
              </span>
            </div>
            <div
              className="flex flex-col gap-2"
              style={{ marginTop: i === 0 ? 96 : i === 1 ? 48 : 8 }}
            >
              {col.cards.map((card) => (
                <div
                  key={card.title}
                  className="flex items-start justify-between gap-2 rounded-[10px] border border-black/[0.08] bg-white/90 px-2.5 py-2 shadow-[0_1px_2px_rgba(20,20,19,0.04)] dark:border-white/[0.08] dark:bg-[#242321]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium leading-tight text-brand-dark dark:text-brand-cream">
                      {card.title}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-brand-dark/45 dark:text-brand-cream/45">
                      {card.meta}
                    </p>
                  </div>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-black/[0.08] text-[10px] text-brand-dark/40 dark:border-white/[0.1] dark:text-brand-cream/40"
                  >
                    →
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className="absolute bottom-3 left-3 font-mono text-[8px] leading-[11px] text-brand-dark/40 dark:text-brand-cream/40">
        Example — phone hire
      </span>
    </div>
    </div>
  );
}
