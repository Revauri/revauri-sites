import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Workflow, ClipboardList, Phone } from "lucide-react";
import { GradientText, PageHero } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";

export const metadata: Metadata = {
  title: "About Revauri AI — AI Employees for Local Service Businesses",
  description:
    "Revauri AI is a product of Revauri, founded by Joseph Silvagnoli. We put an AI employee on the job you hate, build the workflow, and run it every week. You stay the boss.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "You approve what customers see",
    description:
      "Nothing goes out to a customer unless you have said yes. Drafts wait for you, not the other way around.",
  },
  {
    icon: Workflow,
    title: "We build around how you already work",
    description:
      "No new system to learn, no rebuilding your business to fit a tool. The hire fits the way the job already runs.",
  },
  {
    icon: ClipboardList,
    title: "No surprise scope",
    description:
      "A standard hire is two workflows. Anything heavier gets quoted before we start, so there is no surprise invoice.",
  },
  {
    icon: Phone,
    title: "The phone is a hire, not a gimmick",
    description:
      "It answers the calls that currently go to voicemail. It does not pretend to be your receptionist, and it never invents prices.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        badge="ABOUT"
        title={
          <>
            Hire the work, <GradientText>not another person</GradientText>
          </>
        }
        subtitle="Revauri AI is a product of Revauri. We build AI employees for local service businesses and run them every week."
      />

      {/* Founder Story */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 items-center justify-items-center gap-12 lg:grid-cols-[auto_1fr] lg:justify-items-stretch lg:gap-16">
            <FadeInWhenVisible direction="left" className="mx-auto w-fit lg:mx-0">
              <div className="relative isolate mx-auto w-fit lg:mx-0">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-brand-orange/12 blur-2xl"
                />
                <div className="relative rounded-[2rem] border border-brand-orange/15 bg-gradient-to-br from-brand-cream/15 via-transparent to-brand-orange/10 p-3 shadow-[0_24px_50px_-32px_rgba(217,119,87,0.42)] dark:from-brand-dark/50 dark:to-brand-orange/8">
                  <Image
                    src="/joseph-headshot.jpg"
                    alt="Joseph Silvagnoli, founder of Revauri"
                    width={224}
                    height={224}
                    className="block h-52 w-52 rounded-[1.5rem] object-cover object-top ring-1 ring-white/10 sm:h-56 sm:w-56"
                  />
                </div>
              </div>
            </FadeInWhenVisible>

            <div className="w-full">
              <FadeInWhenVisible>
                <h2 className="text-2xl font-bold text-brand-dark dark:text-brand-cream sm:text-3xl">
                  Hi, I&apos;m Joseph.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.08}>
                <p className="mt-6 text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  I run Revauri. Working with local service businesses, I kept
                  hearing the same thing: the owner is the one chasing quiet
                  leads at 9pm, missing calls during a job, and never getting
                  around to asking for reviews. Not because they do not know
                  better — because there is no one left to do it.
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.14}>
                <p className="mt-4 text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  So I build AI employees for those jobs. You name the work you
                  hate, I build the workflow around how your business already
                  runs, and I keep it running every week. That includes the
                  phone. You stay the boss — nothing reaches a customer without
                  your yes.
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.2}>
                <p className="mt-4 text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
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

      {/* Values Grid */}
      <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInWhenVisible>
            <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              How we <GradientText>work</GradientText>
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-brand-light-gray/60 bg-brand-white p-6 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-brand-orange/10 p-3 transition-colors duration-200 group-hover:bg-brand-orange">
                    <Icon className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-dark dark:text-brand-cream">
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

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Tell me the job you <GradientText>hate</GradientText>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 text-lg text-brand-dark/60 dark:text-brand-cream/60">
              A short call is enough to name the two jobs worth handing off
              first.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.16}>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
