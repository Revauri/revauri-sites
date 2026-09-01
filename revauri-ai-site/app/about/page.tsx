import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Workflow, ClipboardList, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
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

      <section className="py-16 lg:py-20">
        <div className="section-measure px-6">
          <div className="grid grid-cols-1 items-center justify-items-center gap-12 lg:grid-cols-[auto_1fr] lg:justify-items-stretch lg:gap-16">
            <FadeInWhenVisible direction="left" className="mx-auto w-fit lg:mx-0">
              <div className="relative isolate mx-auto w-fit lg:mx-0">
                <Image
                  src="/joseph-headshot.jpg"
                  alt="Joseph Silvagnoli, founder of Revauri"
                  width={224}
                  height={224}
                  className="block h-40 w-40 rounded-[16px] object-cover object-top ring-1 ring-black/[0.08] sm:h-52 sm:w-52 lg:h-56 lg:w-56 dark:ring-white/[0.08]"
                />
              </div>
            </FadeInWhenVisible>

            <div className="w-full">
              <FadeInWhenVisible>
                <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
                  Hi, I&apos;m Joseph.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.08}>
                <p className="mt-6 text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70 md:text-base">
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
                    className="font-medium text-brand-orange hover:underline"
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

      <section className="py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              How we work
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="hairline-card p-6">
                  <Icon className="h-4 w-4 text-brand-dark/40 dark:text-brand-cream/40" />
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

      <section className="py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              Tell me the job you hate.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 max-w-xl text-[15px] text-brand-dark/60 dark:text-brand-cream/60 md:text-base">
              A short call is enough to name the two jobs worth handing off
              first.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.16}>
            <Link
              href="/book"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              Hire one
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
