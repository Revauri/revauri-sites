import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { FINAL_CTA_COPY } from "@/lib/marketing-copy";
import { FadeInWhenVisible } from "./motion-wrappers";

type PageCTAProps = {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  buttonLabel?: string;
  href?: string;
  chip?: string;
};

export function PageCTA({
  eyebrow = "Next step",
  heading,
  body,
  buttonLabel = "Hire one",
  href = "/book",
  chip = FINAL_CTA_COPY.chip,
}: PageCTAProps) {
  return (
    <section className="py-14 sm:py-16 lg:py-24">
      <div className="section-measure px-6">
        <div className="hairline-card relative overflow-hidden p-7 sm:p-10 lg:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl dark:bg-brand-orange/[0.12]"
          />
          <div className="relative flex max-w-2xl flex-col items-start gap-5">
            <FadeInWhenVisible>
              <div>
                <p className="section-eyebrow">{eyebrow}</p>
                <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
                  {heading}
                </h2>
              </div>
            </FadeInWhenVisible>

            {body ? (
              <FadeInWhenVisible delay={0.08}>
                <p className="text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 md:text-base">
                  {body}
                </p>
              </FadeInWhenVisible>
            ) : null}

            <FadeInWhenVisible delay={0.16}>
              <div className="flex w-full flex-col items-start gap-5">
                <Link
                  href={href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:brightness-[1.04] hover:shadow-[0_10px_28px_-12px_rgba(217,119,87,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:w-auto"
                >
                  {buttonLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-1 text-xs text-brand-dark/45 dark:border-white/[0.08] dark:text-brand-cream/45">
                  <Shield className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
                  {chip}
                </span>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
