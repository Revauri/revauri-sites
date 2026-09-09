"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Check,
  ChevronRight,
  Clock,
  ListTodo,
  Timer,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

export const HIRING_A_PERSON = [
  "Weeks to recruit and train",
  "Payroll, taxes, and overhead",
  "They only work when they're there",
  "You still carry the busywork",
];

export const AI_EMPLOYEE = [
  "Built around how you already work",
  "We run it — on the job and after hours",
  "After setup, you are not in the busywork",
  "A lot cheaper than putting someone on payroll",
];

type TradeKey = "start" | "cost" | "hours" | "busywork";

type Trade = {
  key: TradeKey;
  title: string;
  person: string;
  hire: string;
  icon: LucideIcon;
};

const TRADES: Record<TradeKey, Trade> = {
  start: {
    key: "start",
    title: "Time to start",
    person: HIRING_A_PERSON[0],
    hire: AI_EMPLOYEE[0],
    icon: Timer,
  },
  cost: {
    key: "cost",
    title: "What it costs",
    person: HIRING_A_PERSON[1],
    hire: AI_EMPLOYEE[3],
    icon: Wallet,
  },
  hours: {
    key: "hours",
    title: "When it works",
    person: HIRING_A_PERSON[2],
    hire: AI_EMPLOYEE[1],
    icon: Clock,
  },
  busywork: {
    key: "busywork",
    title: "Who carries it",
    person: HIRING_A_PERSON[3],
    hire: AI_EMPLOYEE[2],
    icon: ListTodo,
  },
};

const TRADE_ORDER: TradeKey[] = ["start", "cost", "hours", "busywork"];

function isTradeKey(value: string): value is TradeKey {
  return Object.hasOwn(TRADES, value);
}

export function HireComparison() {
  const [activeKey, setActiveKey] = useState<TradeKey>("start");
  const reduced = useReducedMotion();
  const active = TRADES[activeKey];
  const ActiveIcon = active.icon;

  function select(key: string) {
    if (!isTradeKey(key) || key === activeKey) return;
    setActiveKey(key);
  }

  return (
    <section className="dotted-grid py-12 sm:py-16 lg:py-20">
      <div className="section-measure px-6">
        <FadeInWhenVisible>
          <div>
            <p className="section-eyebrow">The trade</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              A person on payroll vs an AI employee
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              Same work. Less payroll. Your time back.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.08}>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-12">
            <div
              className="space-y-1"
              aria-label="A person on payroll versus an AI employee"
            >
              {TRADE_ORDER.map((key) => {
                const trade = TRADES[key];
                const Icon = trade.icon;
                const on = key === activeKey;

                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => select(key)}
                    onFocus={() => select(key)}
                    onClick={() => select(key)}
                    className={`flex w-full items-center gap-3.5 border-l-2 px-4 py-3.5 text-left transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                      on
                        ? "border-brand-orange bg-white/70 dark:bg-white/[0.04]"
                        : "border-transparent hover:bg-white/40 dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="icon-tile">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-brand-dark dark:text-brand-cream">
                        {trade.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-brand-dark/50 dark:text-brand-cream/50">
                        {trade.hire}
                      </span>
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                        on ? "text-brand-orange" : "text-brand-dark/25 dark:text-brand-cream/25"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <div>
              <div className="hairline-card min-h-[320px] overflow-hidden bg-white/80 dark:bg-[#1c1b19]/92">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={active.key}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{
                      duration: 0.16,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    aria-live="polite"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-6 py-3 dark:border-white/[0.08] sm:px-8">
                      <p className="text-[11px] font-medium tracking-[0.16em] text-brand-dark/40 uppercase dark:text-brand-cream/40">
                        {active.title}
                      </p>
                      <span className="rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[11px] font-medium text-brand-orange">
                        The hire
                      </span>
                    </div>
                    <div className="min-h-[260px] p-6 sm:p-8">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-orange/10 text-brand-orange shadow-[inset_0_0_0_1px_rgba(217,119,87,0.18)] dark:bg-brand-orange/14 dark:shadow-[inset_0_0_0_1px_rgba(217,119,87,0.28)]">
                        <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand-dark dark:text-brand-cream">
                        {active.hire}
                      </h3>
                      <dl className="mt-7 grid max-w-md grid-cols-1 gap-5 border-t border-black/[0.08] pt-6 sm:grid-cols-2 dark:border-white/[0.08]">
                        <div>
                          <dt className="text-[11px] font-medium tracking-[0.16em] text-brand-dark/40 uppercase dark:text-brand-cream/40">
                            Hiring a person
                          </dt>
                          <dd className="mt-1.5 text-sm leading-relaxed text-brand-dark/55 dark:text-brand-cream/55">
                            {active.person}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] font-medium tracking-[0.16em] text-brand-orange uppercase">
                            The hire
                          </dt>
                          <dd className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed font-medium text-brand-dark dark:text-brand-cream">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange"
                              aria-hidden="true"
                            />
                            {active.hire}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-3 text-xs text-brand-dark/40 dark:text-brand-cream/40">
                Hover or tap a row to see the trade.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
