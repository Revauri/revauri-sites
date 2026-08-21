"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

const CUSTOM_ID = "something-else";

interface Job {
  id: string;
  label: string;
  preview: string;
  note?: string;
}

const jobs: Job[] = [
  {
    id: "quiet-leads",
    label: "Quiet leads",
    preview:
      "A form, call, or quote goes quiet. The hire waits the agreed time, then sends a short follow-up in the owner\u2019s voice. You approve the first ones. After that it runs the same way.",
  },
  {
    id: "missed-calls",
    label: "After-hours / missed calls",
    preview:
      "Someone calls when you cannot pick up. The hire captures name, number, and what they need, then starts the follow-up so the job does not die in voicemail.",
    note: "Live voice answering is available and scoped on the call.",
  },
  {
    id: "quotes",
    label: "Quotes with no second follow-up",
    preview:
      "The estimate went out. Nobody nudged it. The hire sends the next check-in so the quote does not sit forever.",
  },
  {
    id: "reviews",
    label: "Reviews",
    preview:
      "After a good job, the hire asks for the review. When a new review lands, it drafts a reply for your yes / no.",
  },
  {
    id: "reminders",
    label: "Appointment reminders / no-shows",
    preview:
      "The hire reminds them before the visit, and follows up if they miss.",
  },
  {
    id: "check-in",
    label: "After-the-job check-in",
    preview:
      "\u201CHow did we do?\u201D Then a review ask or a next booking, if they are happy.",
  },
  {
    id: "admin",
    label: "Inbox / admin busywork",
    preview:
      "The hire drafts the repetitive replies and reminders so you are not rewriting the same email.",
  },
  {
    id: "reactivation",
    label: "Reactivating past customers",
    preview: "People who used you once and went quiet get a simple check-back.",
  },
  {
    id: CUSTOM_ID,
    label: "Something else",
    preview:
      "Name the mess and we will tell you if we can take it. A custom hire gets built the same way.",
  },
];

const customSteps = [
  "We look at how that mess works today.",
  "We name the steps.",
  "We build the hire.",
  "You approve what your customers see.",
];

export function JobPicker() {
  const [selectedId, setSelectedId] = useState(jobs[0].id);
  const [customJob, setCustomJob] = useState("");

  const selected = jobs.find((job) => job.id === selectedId) ?? jobs[0];
  const isCustom = selected.id === CUSTOM_ID;
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
              Pick the job you want{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                off your plate
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-brand-dark/60 dark:text-brand-cream/60">
              Pick one and see what the hire does. Then book a short call.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-8">
          <div className="flex flex-col gap-2">
            {jobs.map((job) => {
              const isSelected = job.id === selectedId;
              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setSelectedId(job.id)}
                  aria-pressed={isSelected}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
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
                What the hire does
              </p>

              <h3 className="mt-3 text-xl font-semibold text-brand-dark dark:text-brand-cream sm:text-2xl">
                {isCustom && customTitle ? customTitle : selected.label}
              </h3>

              {isCustom ? (
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
                    {selected.preview}
                  </p>

                  <ol className="space-y-2.5">
                    {customSteps.map((step, index) => (
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
                    {selected.preview}
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
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:brightness-[1.04] hover:shadow-[0_10px_28px_-12px_rgba(217,119,87,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
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
