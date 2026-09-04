import { CalendarCheck, Check, ClipboardList, Phone, PhoneIncoming, UserRound } from "lucide-react";

// Static illustration of the phone hire on an after-hours call. Mirrors the
// homepage mocks (product-frame + floating report card); nothing here is live.
const TIMELINE = [
  {
    icon: PhoneIncoming,
    time: "8:42 PM",
    title: "Picked up",
    detail: "After hours \u2014 would have gone to voicemail.",
  },
  {
    icon: UserRound,
    time: "8:43 PM",
    title: "Name and number taken",
    detail: "Elena V. \u00b7 (555) 012-3456",
  },
  {
    icon: ClipboardList,
    time: "8:44 PM",
    title: "Job noted",
    detail: "Tooth pain, upper left. No price guessed.",
  },
  {
    icon: CalendarCheck,
    time: "8:45 PM",
    title: "Callback held",
    detail: "Thu 9:00 AM \u00b7 a slot you pre-approved",
  },
] as const;

export function PhoneCallMock() {
  return (
    <div className="relative min-h-[360px] max-[767px]:min-h-[320px]">
      <div className="product-frame relative overflow-hidden min-[900px]:w-[76%]">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-brand-orange/10 text-brand-orange shadow-[inset_0_0_0_1px_rgba(217,119,87,0.18)]">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12px] font-medium leading-tight text-brand-dark dark:text-brand-cream">
                After-hours call
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-brand-dark/45 dark:text-brand-cream/45">
                Tuesday · office closed at 5:00 PM
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/15 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Answered
          </span>
        </div>

        <ol className="relative px-4 pb-10 pt-4">
          <span
            aria-hidden="true"
            className="absolute bottom-14 left-[31px] top-7 w-px bg-black/[0.08] dark:bg-white/[0.1]"
          />
          {TIMELINE.map(({ icon: Icon, time, title, detail }) => (
            <li key={title} className="relative flex gap-3 pb-4 last:pb-0">
              <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-brand-dark/70 shadow-sm dark:border-white/[0.1] dark:bg-[#242321] dark:text-brand-cream/70">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
                    {title}
                  </p>
                  <span className="shrink-0 font-mono text-[9px] tabular-nums text-brand-dark/40 dark:text-brand-cream/40">
                    {time}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-brand-dark/55 dark:text-brand-cream/55">
                  {detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <span className="absolute bottom-3 left-3 font-mono text-[8px] leading-[11px] text-brand-dark/40 dark:text-brand-cream/40">
          Example — after-hours call
        </span>
      </div>

      <div className="absolute right-0 top-16 w-[min(44%,240px)] rounded-[16px] border border-black/[0.08] bg-white/95 p-4 shadow-[0_18px_40px_-24px_rgba(20,20,19,0.45)] max-[899px]:relative max-[899px]:right-auto max-[899px]:top-3 max-[899px]:mx-3 max-[899px]:mb-3 max-[899px]:w-auto dark:border-white/[0.08] dark:bg-[#242321]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
            Needs your call
          </p>
          <span className="font-mono text-[8px] text-brand-dark/40 dark:text-brand-cream/40">
            Example
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-[11px] font-semibold text-brand-orange">
            EV
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium text-brand-dark dark:text-brand-cream">
              Elena V.
            </p>
            <p className="truncate text-[10px] text-brand-dark/45 dark:text-brand-cream/45">
              Tooth pain · new patient
            </p>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5 text-[11px]">
          <li className="flex items-center gap-2 text-brand-dark/70 dark:text-brand-cream/70">
            <Check className="h-3 w-3 shrink-0 text-brand-orange" aria-hidden="true" />
            Hold Thursday 9:00 AM
          </li>
          <li className="flex items-center gap-2 text-brand-dark/70 dark:text-brand-cream/70">
            <Check className="h-3 w-3 shrink-0 text-brand-orange" aria-hidden="true" />
            Nothing quoted
          </li>
        </ul>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="mt-4 w-full rounded-[8px] bg-brand-dark py-2 text-[12px] font-medium text-brand-cream dark:bg-brand-cream dark:text-brand-dark"
        >
          Call back
        </button>
      </div>
    </div>
  );
}
