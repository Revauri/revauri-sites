const STATS = [
  { label: "Reviews asked", value: "12" },
  { label: "Reminders sent", value: "8" },
  { label: "Check-ins", value: "5" },
] as const;

const WEEK = [
  { name: "Elena V.", job: "Review asked", status: "Sent" },
  { name: "Mike R.", job: "Reminder", status: "Sent" },
  { name: "Priya S.", job: "After-the-job check-in", status: "Queued" },
  { name: "Dan T.", job: "Review asked", status: "Sent" },
] as const;

export function KeepRunningOps() {
  return (
    <div className="relative min-h-[360px] max-[767px]:min-h-[320px]">
      <div className="product-frame relative min-h-[360px] overflow-hidden p-4 max-[767px]:min-h-[320px] min-[767px]:p-5">
        <div className="grid grid-cols-3 gap-3 border-b border-black/[0.06] pb-4 max-[479px]:grid-cols-1 dark:border-white/[0.06]">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-[10px] text-brand-dark/40 dark:text-brand-cream/40">
                {stat.label}
              </p>
              <p className="mt-1 text-[22px] font-semibold tabular-nums leading-none tracking-tight text-brand-dark dark:text-brand-cream">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex h-28 items-end gap-1.5 px-1">
          {[42, 58, 36, 72, 48, 80, 54, 66, 40, 74, 52, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[3px] bg-brand-dark/[0.12] dark:bg-brand-cream/[0.12]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <span className="absolute bottom-3 left-3 font-mono text-[8px] leading-[11px] text-brand-dark/40 dark:text-brand-cream/40">
          Example — weekly run
        </span>
      </div>

      <div className="absolute bottom-6 right-4 w-[min(58%,260px)] rounded-[16px] border border-black/[0.08] bg-white/95 p-3.5 shadow-[0_18px_40px_-24px_rgba(20,20,19,0.45)] max-[899px]:relative max-[899px]:bottom-auto max-[899px]:right-auto max-[899px]:mx-3 max-[899px]:-mt-8 max-[899px]:mb-3 max-[899px]:w-auto dark:border-white/[0.08] dark:bg-[#242321]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
            This week
          </p>
          <span className="font-mono text-[8px] text-brand-dark/40 dark:text-brand-cream/40">
            Example
          </span>
        </div>
        <ul className="space-y-2">
          {WEEK.map((row) => (
            <li
              key={row.name + row.job}
              className="flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-brand-dark dark:text-brand-cream">
                  {row.name}
                </p>
                <p className="truncate text-[10px] text-brand-dark/45 dark:text-brand-cream/45">
                  {row.job}
                </p>
              </div>
              <span className="shrink-0 text-[10px] text-brand-dark/40 dark:text-brand-cream/40">
                {row.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
