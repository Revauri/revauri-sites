"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";
import {
  HIRE_DEMO_JOBS,
  isCustomJob,
  type HireDemoJobId,
} from "@/lib/hire-demo-jobs";

export function JobPicker() {
  const [selectedId, setSelectedId] = useState<HireDemoJobId>("quiet-leads");
  const [customJob, setCustomJob] = useState("");

  const selected =
    HIRE_DEMO_JOBS.find((job) => job.id === selectedId) ?? HIRE_DEMO_JOBS[0];
  const custom = isCustomJob(selected);
  const customTitle = customJob.trim();

  return (
    <section
      id="jobs"
      className="scroll-mt-24 bg-brand-white py-20 dark:bg-brand-dark lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
              The jobs
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Pick the job you&apos;d otherwise{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                hire for
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-brand-dark/60 dark:text-brand-cream/60">
              Pick one. That&apos;s work leaving your plate — and a hire you
              don&apos;t have to make.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-8">
          <div className="flex flex-col gap-2">
            {HIRE_DEMO_JOBS.map((job) => {
              const isSelected = job.id === selectedId;
              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setSelectedId(job.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[44px] rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                    isSelected
                      ? "border-brand-orange bg-brand-orange/10 font-semibold text-brand-dark dark:text-brand-cream"
                      : "border-brand-light-gray text-brand-dark/70 hover:border-brand-orange/40 hover:text-brand-dark dark:border-brand-mid-gray/20 dark:text-brand-cream/70 dark:hover:text-brand-cream"
                  }`}
                >
                  {job.label}
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            className="rounded-2xl border border-brand-light-gray/60 bg-brand-cream p-6 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:p-8"
          >
            <div key={selected.id} className="animate-fade-in">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
                What the AI employee does
              </p>

              <h3 className="mt-3 text-xl font-semibold text-brand-dark dark:text-brand-cream sm:text-2xl">
                {custom && customTitle ? customTitle : selected.label}
              </h3>

              {custom ? (
                <div className="mt-5 space-y-5">
                  <div>
                    <label
                      htmlFor="custom-job"
                      className="block text-sm font-medium text-brand-dark dark:text-brand-cream"
                    >
                      What is the job?
                    </label>
                    <input
                      id="custom-job"
                      type="text"
                      value={customJob}
                      onChange={(event) => setCustomJob(event.target.value)}
                      placeholder="The task you keep putting off"
                      className="mt-2 w-full rounded-lg border border-brand-light-gray bg-brand-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-brand-mid-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-brand-mid-gray/20 dark:bg-brand-dark dark:text-brand-cream"
                    />
                  </div>

                  <p className="text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                    {selected.caption}
                  </p>

                  <ol className="space-y-2.5">
                    {selected.steps.map((step, index) => (
                      <li
                        key={step}
                        className="flex gap-3 text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-semibold text-brand-orange">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <p className="text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                    {selected.caption}
                  </p>
                  {selected.note ? (
                    <p className="text-sm leading-relaxed text-brand-mid-gray">
                      {selected.note}
                    </p>
                  ) : null}
                </div>
              )}

              <div className="mt-8 border-t border-brand-light-gray/60 pt-6 dark:border-brand-mid-gray/20">
                <Link
                  href="/book"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:brightness-[1.04] hover:shadow-[0_10px_28px_-12px_rgba(217,119,87,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
