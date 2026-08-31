export function FollowUpEmail() {
  return (
    <div className="relative min-h-[360px] max-[767px]:min-h-[320px]">
      <div className="product-frame relative mr-0 overflow-hidden min-[640px]:w-[74%]">
        <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
          <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
            Email preview
          </p>
        </div>
        <dl className="divide-y divide-black/[0.06] text-[12px] dark:divide-white/[0.06]">
          <div className="grid grid-cols-[72px_1fr] gap-3 px-4 py-2.5">
            <dt className="text-brand-dark/40 dark:text-brand-cream/40">To</dt>
            <dd className="text-brand-dark dark:text-brand-cream">
              Maya Chen{" "}
              <span className="text-brand-dark/40 dark:text-brand-cream/40">
                maya@example.com
              </span>
            </dd>
          </div>
          <div className="grid grid-cols-[72px_1fr] gap-3 px-4 py-2.5">
            <dt className="text-brand-dark/40 dark:text-brand-cream/40">From</dt>
            <dd className="text-brand-dark dark:text-brand-cream">
              Your shop{" "}
              <span className="text-brand-dark/40 dark:text-brand-cream/40">
                in your voice
              </span>
            </dd>
          </div>
          <div className="grid grid-cols-[72px_1fr] gap-3 px-4 py-2.5">
            <dt className="text-brand-dark/40 dark:text-brand-cream/40">Subject</dt>
            <dd className="font-medium text-brand-dark dark:text-brand-cream">
              Checking in on your quote
            </dd>
          </div>
        </dl>
        <div className="space-y-3 px-4 pb-9 pt-4 text-[12px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
          <p>Hi Maya,</p>
          <p>
            Just circling back on the estimate we sent last week. Happy to
            answer questions or hold a time that already works on the
            calendar.
          </p>
          <p>Whenever you’re ready — no pressure.</p>
        </div>
        <span className="absolute bottom-3 left-3 font-mono text-[8px] leading-[11px] text-brand-dark/40 dark:text-brand-cream/40">
          Example — follow-up
        </span>
      </div>

      <div className="absolute right-0 top-14 w-[min(42%,236px)] rounded-[16px] border border-black/[0.08] bg-white/95 p-4 shadow-[0_18px_40px_-24px_rgba(20,20,19,0.45)] max-[639px]:relative max-[639px]:right-auto max-[639px]:top-3 max-[639px]:mx-3 max-[639px]:mb-3 max-[639px]:w-auto dark:border-white/[0.08] dark:bg-[#242321]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-brand-dark dark:text-brand-cream">
            Follow-up report
          </p>
          <span className="font-mono text-[8px] text-brand-dark/40 dark:text-brand-cream/40">
            Example
          </span>
        </div>
        <ul className="mt-4 space-y-2.5 text-[12px]">
          <li className="flex items-center justify-between text-brand-dark/70 dark:text-brand-cream/70">
            <span>Sent</span>
            <span className="font-medium text-brand-dark dark:text-brand-cream">
              18
            </span>
          </li>
          <li className="flex items-center justify-between text-brand-dark/70 dark:text-brand-cream/70">
            <span>Opened</span>
            <span className="font-medium text-brand-dark dark:text-brand-cream">
              11
            </span>
          </li>
          <li className="flex items-center justify-between text-brand-dark/70 dark:text-brand-cream/70">
            <span>Replied</span>
            <span className="font-medium text-brand-dark dark:text-brand-cream">
              4
            </span>
          </li>
        </ul>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="mt-4 w-full rounded-[8px] border border-black/[0.08] py-2 text-[12px] text-brand-dark/60 dark:border-white/[0.1] dark:text-brand-cream/60"
        >
          View details
        </button>
      </div>
    </div>
  );
}
