"use client";

import Link from "next/link";
import { Mail, BookOpen, Phone } from "lucide-react";
import { FadeInWhenVisible, StaggerChildren } from "./motion-wrappers";

export function SupportChannels() {
  return (
    <section className="bg-brand-white py-16 dark:bg-brand-dark lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center space-y-8">
          <FadeInWhenVisible>
            <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Need help?{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                We&apos;ve got you
              </span>
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 [&>div]:w-full">
            {/* Call */}
            <Link
              href="/book"
              className="group flex h-full w-full min-h-[96px] items-center gap-4 rounded-2xl border border-brand-light-gray/60 bg-brand-cream px-6 py-5 shadow-[var(--shadow-md)] transition-all duration-300 hover:border-brand-orange/30 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
            >
              <div className="shrink-0 rounded-xl bg-brand-orange/10 p-2.5 transition-colors duration-200 group-hover:bg-brand-orange">
                <Phone className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                  Book a Call
                </h3>
                <p className="text-xs text-brand-mid-gray">
                  Free 15-minute strategy session
                </p>
                <p className="mt-1 text-xs font-medium text-brand-orange">
                  Schedule now &rarr;
                </p>
              </div>
            </Link>

            {/* Email */}
            <a
              href="mailto:joseph@revauri.com"
              className="group flex h-full w-full min-h-[96px] items-center gap-4 rounded-2xl border border-brand-light-gray/60 bg-brand-cream px-6 py-5 shadow-[var(--shadow-md)] transition-all duration-300 hover:border-brand-orange/30 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
            >
              <div className="shrink-0 rounded-xl bg-brand-orange/10 p-2.5 transition-colors duration-200 group-hover:bg-brand-orange">
                <Mail className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                  Email Us
                </h3>
                <p className="text-xs text-brand-mid-gray">
                  We reply within a few hours
                </p>
                <p className="mt-1 text-xs font-medium text-brand-orange">
                  joseph@revauri.com &rarr;
                </p>
              </div>
            </a>

            {/* FAQ */}
            <Link
              href="/faq"
              className="group flex h-full w-full min-h-[96px] items-center gap-4 rounded-2xl border border-brand-light-gray/60 bg-brand-cream px-6 py-5 shadow-[var(--shadow-md)] transition-all duration-300 hover:border-brand-orange/30 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
            >
              <div className="shrink-0 rounded-xl bg-brand-orange/10 p-2.5 transition-colors duration-200 group-hover:bg-brand-orange">
                <BookOpen className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                  Browse FAQ
                </h3>
                <p className="text-xs text-brand-mid-gray">
                  Answers to common questions
                </p>
                <p className="mt-1 text-xs font-medium text-brand-orange">
                  View FAQ &rarr;
                </p>
              </div>
            </Link>
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
