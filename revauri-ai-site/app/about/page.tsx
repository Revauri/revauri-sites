import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Workflow, ClipboardList, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PageCTA } from "@/components/page-cta";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import { PAGE_HEROES } from "@/lib/marketing-copy";

export const metadata: Metadata = {
  title: "About Revauri AI — AI Employees for Local Service Businesses",
  description:
    "Revauri AI is a product of Revauri, founded by Joseph Silvagnoli. We put an AI employee on the work you'd otherwise hire someone for, build it, and run it. Less payroll. Your time back.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "We take it off you",
    description:
      "After setup, you are not the one doing the follow-ups, the reviews, and the phone catch. We run it. You get the time back.",
  },
  {
    icon: Workflow,
    title: "We build around how you already work",
    description:
      "No new system to learn. The hire fits the way the job already runs.",
  },
  {
    icon: ClipboardList,
    title: "No surprise scope",
    description:
      "A standard hire is two workflows. Anything heavier gets quoted before we start.",
  },
  {
    icon: Phone,
    title: "The phone is a hire, not a gimmick",
    description:
      "It answers the calls that currently go to voicemail. It never invents prices. It does not do the licensed job.",
  },
];

const HERO = PAGE_HEROES.about;

export default function AboutPage() {
  return (
    <div>
      <PageHero
        badge={HERO.badge}
        title={HERO.title}
        muted={HERO.muted}
        subtitle={HERO.subtitle}
      />

      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="section-measure px-6">
          <div className="grid grid-cols-1 items-start justify-items-center gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:justify-items-stretch lg:gap-16">
            <FadeInWhenVisible direction="left" className="mx-auto w-fit lg:mx-0">
              <div className="relative isolate mx-auto w-fit lg:mx-0">
                <div
                  aria-hidden
                  className="dotted-grid absolute -top-6 -left-6 h-full w-full rounded-2xl opacity-70"
                />
                <Image
                  src="/joseph-headshot.jpg"
                  alt="Joseph Silvagnoli, founder of Revauri"
                  width={320}
                  height={320}
                  className="relative z-10 block h-64 w-64 rounded-2xl object-cover object-top shadow-[var(--shadow-lg)] ring-1 ring-black/[0.08] sm:h-72 sm:w-72 lg:h-80 lg:w-80 dark:ring-white/[0.1]"
                />
              </div>
            </FadeInWhenVisible>

            <div className="w-full">
              <FadeInWhenVisible>
                <p className="section-eyebrow">The founder</p>
                <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
                  Hi, I&apos;m Joseph.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.08}>
                <p className="mt-6 text-base leading-relaxed text-brand-dark/80 dark:text-brand-cream/80 md:text-lg">
                  I run Revauri. Working with local service businesses, I kept
                  hearing the same thing: the owner is the one chasing quiet
                  leads at 9pm, missing calls during a job, and never getting
                  around to asking for reviews. Not because they do not know
                  better — because there is no one left to do it.
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.14}>
                <p className="mt-4 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70 md:text-base">
                  So I build AI employees for those jobs. You name the work
                  you&apos;d otherwise hire someone to do. I build the workflow
                  around how your business already runs, and I keep it running
                  every week. After setup, you are not the one doing it at 9pm.
                  That includes the phone.
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.2}>
                <p className="mt-4 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70 md:text-base">
                  Revauri AI is a product of Revauri, not a separate company. If
                  what you actually need is a new website, that is a different
                  door —{" "}
                  <a
                    href="https://revauri.com"
                    className="font-medium text-brand-orange hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  >
                    revauri.com
                  </a>
                  , quoted separately.
                </p>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>

      <section className="dotted-grid py-12 sm:py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <p className="section-eyebrow">What you can count on</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              How we work
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="hairline-card hairline-card-hover h-full bg-white/90 p-6 dark:bg-[#1c1b19]/92"
                >
                  <span className="icon-tile">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-brand-dark dark:text-brand-cream">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      <PageCTA
        heading="Tell me the job you hate."
        body="A short call is enough to name the two jobs worth handing off first."
      />
    </div>
  );
}
