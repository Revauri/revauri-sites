import type { Metadata } from "next";
import { Check, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhoneCallMock } from "@/components/capabilities/phone-call-mock";
import { CapabilityCards } from "@/components/capabilities/capability-cards";
import { PageCTA } from "@/components/page-cta";
import { FadeInWhenVisible } from "@/components/motion-wrappers";
import { PAGE_HEROES } from "@/lib/marketing-copy";

export const metadata: Metadata = {
  title: "Capabilities — Revauri AI",
  description:
    "The jobs a Revauri AI employee takes on — the phone, quiet leads, quotes, reviews, reminders, and admin. The work you'd otherwise hire for. We build it, we run it, and after setup you are out of it.",
  alternates: { canonical: "/capabilities" },
};

const PHONE_POINTS = [
  "Answers the missed, after-hours, and overflow calls",
  "Takes the name, the number, and what they need",
  "Books only what you have pre-approved, or gets them a fast callback",
  "Never guesses at prices, medical advice, or legal advice",
  "Hands anything sensitive straight back to you",
];

const HERO = PAGE_HEROES.capabilities;

export default function CapabilitiesPage() {
  return (
    <div>
      <PageHero badge={HERO.badge} title={HERO.title} subtitle={HERO.subtitle} />

      <section className="dotted-grid py-12 sm:py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <p className="section-eyebrow">The roster</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              Jobs we hire for
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-brand-dark/60 dark:text-brand-cream/60">
              Pick the painful one. We build that workflow and run it. Do not
              see yours? Name the mess and we will tell you if we can take it.
            </p>
          </FadeInWhenVisible>

          <CapabilityCards />

          <FadeInWhenVisible delay={0.1}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              A standard hire covers two of these, run weekly. No guessing at
              prices, no medical, legal, or licensed advice — that still needs
              your tech.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <div className="grid items-start gap-10 min-[1000px]:grid-cols-[minmax(300px,380px)_1fr] min-[1000px]:gap-14">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center text-brand-orange">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="section-eyebrow text-brand-orange!">Headline hire</p>
                </div>
                <h2 className="section-h2 mt-5 text-brand-dark dark:text-brand-cream">
                  The phone
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 md:text-base">
                  Missed calls are lost jobs. A voice hire picks up what currently
                  goes to voicemail.
                </p>

                <ul className="mt-7 flex flex-col gap-2">
                  {PHONE_POINTS.map((point, index) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 rounded-[10px] border border-black/[0.08] bg-white/60 px-3.5 py-3 dark:border-white/[0.08] dark:bg-white/[0.04]"
                    >
                      <span className="w-6 shrink-0 pt-px text-[11px] tabular-nums text-brand-dark/40 dark:text-brand-cream/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-[14px] leading-snug text-brand-dark dark:text-brand-cream">
                        {point}
                      </span>
                      <Check
                        className="mt-px h-4 w-4 shrink-0 text-brand-orange"
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-l-2 border-brand-orange/40 pl-4">
                  <p className="text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                    It is a cheaper hire for the calls nobody is answering. It can
                    take the phone seat. It does not do the licensed job, and it
                    never invents prices.
                  </p>
                  <p className="mt-2 text-sm text-brand-dark/45 dark:text-brand-cream/45">
                    Live voice answering is scoped on the call.
                  </p>
                </div>
              </div>

              <div className="min-w-0 max-w-full min-[1000px]:sticky min-[1000px]:top-28 min-[1000px]:pt-2">
                <PhoneCallMock />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <PageCTA
        heading="Which job goes first?"
        body="Name the job you'd otherwise hire for."
      />
    </div>
  );
}
