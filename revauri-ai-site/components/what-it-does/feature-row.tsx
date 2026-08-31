"use client";

import {
  featureGridCols,
  type AccordionItem,
  type FeatureSection,
} from "./script";
import { CatchKanban } from "./mocks/catch-kanban";
import { FollowUpEmail } from "./mocks/follow-up-email";
import { KeepRunningOps } from "./mocks/keep-running-ops";

function Mock({ id }: { id: FeatureSection["id"] }) {
  if (id === "catch") return <CatchKanban />;
  if (id === "follow-up") return <FollowUpEmail />;
  return <KeepRunningOps />;
}

export function FeatureRow({
  section,
  openCode,
  onOpen,
}: {
  section: FeatureSection;
  openCode: string | null;
  onOpen: (item: AccordionItem) => void;
}) {
  const copy = (
    <div className="flex flex-col">
      <p className="section-eyebrow">{section.kicker}</p>
      <h3 className="mt-4 max-w-[22rem] text-[28px] font-semibold leading-[1.15] tracking-tight text-brand-dark dark:text-brand-cream min-[767px]:text-[32px] min-[1000px]:text-[36px]">
        {section.heading}
      </h3>
      <p className="mt-4 max-w-[22rem] text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
        {section.body}
      </p>
      <ul className="mt-6 flex max-w-[22rem] flex-col gap-2">
        {section.items.map((item) => {
          const isOpen = openCode === item.code;
          return (
            <li key={item.code}>
              <button
                type="button"
                className="accordion-row focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                onClick={() => onOpen(item)}
              >
                <span className="w-8 shrink-0 text-[12px] tabular-nums text-brand-dark/40 dark:text-brand-cream/40">
                  {item.code}
                </span>
                <span className="flex-1 text-[14px] font-medium text-brand-dark dark:text-brand-cream">
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center text-lg leading-none text-brand-dark/40 dark:text-brand-cream/40"
                >
                  {isOpen ? "×" : "+"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div
      className={`grid items-start gap-10 min-[1000px]:gap-12 ${featureGridCols(section.side)}`}
    >
      <div
        className={
          section.side === "copy-right" ? "min-[1000px]:order-2" : undefined
        }
      >
        {copy}
      </div>
      <div className="min-w-0 max-w-full">
        <Mock id={section.id} />
      </div>
    </div>
  );
}
