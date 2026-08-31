"use client";

import Link from "next/link";
import { SUPPORT_COPY } from "@/lib/marketing-copy";
import { FadeInWhenVisible } from "./motion-wrappers";

const CHANNELS = [
  {
    ...SUPPORT_COPY.channels[0],
    href: "/book",
  },
  {
    ...SUPPORT_COPY.channels[1],
    href: "mailto:joseph@revauri.com",
  },
  {
    ...SUPPORT_COPY.channels[2],
    href: "/faq",
  },
] as const;

export function SupportChannels() {
  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark lg:py-20">
      <div className="section-measure px-6">
        <div className="flex flex-col items-start space-y-8">
          <FadeInWhenVisible>
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              {SUPPORT_COPY.h2}
            </h2>
          </FadeInWhenVisible>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            {CHANNELS.map((channel) => {
              const className =
                "hairline-card flex h-full min-h-[96px] flex-col justify-center px-5 py-5 transition-colors hover:bg-white/80 dark:hover:bg-white/[0.06]";
              const body = (
                <>
                  <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                    {channel.title}
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark/45 dark:text-brand-cream/45">
                    {channel.line}
                  </p>
                  <p className="mt-2 text-xs font-medium text-brand-dark/70 dark:text-brand-cream/70">
                    {channel.cta} →
                  </p>
                </>
              );
              if (channel.href.startsWith("mailto:")) {
                return (
                  <a key={channel.title} href={channel.href} className={className}>
                    {body}
                  </a>
                );
              }
              return (
                <Link key={channel.title} href={channel.href} className={className}>
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
