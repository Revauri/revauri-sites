import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  ClipboardCheck,
  FileText,
  Inbox,
  MessageSquare,
  Phone,
  PlayCircle,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";

export const metadata: Metadata = {
  title: "Capabilities — Revauri AI",
  description:
    "The jobs a Revauri AI employee takes on — the phone, quiet leads, quotes, reviews, reminders, and admin busywork. The work you'd otherwise hire someone for. We build the workflow and run it.",
  alternates: { canonical: "/capabilities" },
};

const PHONE_POINTS = [
  "Answers the missed, after-hours, and overflow calls",
  "Takes the name, the number, and what they need",
  "Books only what you have pre-approved, or gets them a fast callback",
  "Never guesses at prices, medical advice, or legal advice",
  "Hands anything sensitive straight back to you",
];

const JOBS = [
  {
    icon: MessageSquare,
    job: "Quiet leads",
    does: "Follows up when a call, form, or quote goes silent.",
  },
  {
    icon: Phone,
    job: "After-hours / missed calls",
    does: "Catches the inquiry and starts the follow-up.",
  },
  {
    icon: FileText,
    job: "Quotes with no second follow-up",
    does: "Sends the next nudge so estimates do not die.",
  },
  {
    icon: Star,
    job: "Reviews",
    does: "Asks after a good job, drafts replies to new reviews.",
  },
  {
    icon: CalendarClock,
    job: "Appointment reminders / no-shows",
    does: "Reminds them, and follows up if they miss.",
  },
  {
    icon: ClipboardCheck,
    job: "After-the-job check-in",
    does: "\u201CHow did we do?\u201D Then a review or a next booking.",
  },
  {
    icon: Inbox,
    job: "Inbox / admin busywork",
    does: "Drafts the repetitive replies and reminders.",
  },
  {
    icon: RefreshCw,
    job: "Reactivating past customers",
    does: "Checks back with people who have gone quiet.",
  },
  {
    icon: Sparkles,
    job: "Something else",
    does: "You name the mess. We tell you if we can take it.",
  },
];

const STEPS = [
  {
    icon: Search,
    title: "Look",
    description: "We learn how that job works in your business today.",
  },
  {
    icon: Wrench,
    title: "Build",
    description: "We install the workflow around the way you already work.",
  },
  {
    icon: PlayCircle,
    title: "Run",
    description:
      "Weekly note, drafts waiting for your yes or no, small improvements.",
  },
];

const NOT_DOING = [
  "Replace a real receptionist, tech, or office manager",
  "Send emails, texts, or posts to your customers without your approval",
  "Give medical, legal, or licensed professional advice",
  "Run your ads",
  "Rebuild your website — that is a separate quote",
  "Let the phone hire invent prices or book work you did not authorize",
];

export default function CapabilitiesPage() {
  return (
    <div>
      <PageHero
        badge="CAPABILITIES"
        title={
          <>
            Example <GradientText>hires</GradientText>
          </>
        }
        subtitle="The work you'd otherwise hire someone for. Pick the painful one. We build that workflow and run it — a lot cheaper than payroll."
      />

      {/* Headline hire: the phone */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible>
            <div className="rounded-2xl border border-brand-light-gray/60 bg-brand-cream p-8 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] lg:p-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10">
                  <Phone className="h-5 w-5 text-brand-orange" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
                  Headline hire
                </p>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-brand-dark dark:text-brand-cream sm:text-3xl">
                The phone
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                Missed calls are lost jobs. A voice hire picks up the calls that
                currently go to voicemail.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PHONE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-brand-dark/80 dark:text-brand-cream/80">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-brand-light-gray/60 pt-6 dark:border-brand-mid-gray/20">
                <p className="text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  It is a cheaper hire for the calls nobody is answering. It
                  does not sit at the front desk.
                </p>
                <p className="mt-3 text-sm text-brand-mid-gray">
                  Live voice answering is scoped on the call.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Other jobs */}
      <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInWhenVisible>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
                Other jobs we <GradientText>hire for</GradientText>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-brand-dark/60 dark:text-brand-cream/60">
                Pick the painful one. We build that workflow and run it.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {JOBS.map(({ icon: Icon, job, does }) => (
              <div
                key={job}
                className="group rounded-2xl border border-brand-light-gray/60 bg-brand-white p-6 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-brand-orange/10 p-3 transition-colors duration-200 group-hover:bg-brand-orange">
                  <Icon className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
                </div>
                <h3 className="text-base font-semibold text-brand-dark dark:text-brand-cream">
                  {job}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                  {does}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible>
            <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              What you <GradientText>get</GradientText>
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-light-gray/60 bg-brand-white p-6 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-semibold text-brand-orange">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-brand-orange" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-dark dark:text-brand-cream">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                  {description}
                </p>
              </div>
            ))}
          </StaggerChildren>

          <FadeInWhenVisible delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              A standard hire covers two workflows and the weekly running of
              them. Anything bigger gets quoted before we start.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* What we do not do */}
      <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <FadeInWhenVisible>
            <h2 className="text-center text-2xl font-semibold text-brand-dark dark:text-brand-cream sm:text-3xl">
              What we do not do
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <ul className="mt-8 grid grid-cols-1 gap-4">
              {NOT_DOING.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-brand-mid-gray" />
                  <span className="text-sm text-brand-dark/80 dark:text-brand-cream/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Which job goes <GradientText>first?</GradientText>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 text-lg text-brand-dark/60 dark:text-brand-cream/60">
              Tell us the job you&apos;d otherwise hire for. We will say what
              an AI employee would take over, and what it would not.
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
