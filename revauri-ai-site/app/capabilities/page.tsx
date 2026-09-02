import type { Metadata } from "next";
import {
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
import { PageHero } from "@/components/page-hero";
import { PageCTA } from "@/components/page-cta";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
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
    does: "Asks after a good job, replies to new reviews.",
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
    does: "Handles the repetitive replies and reminders.",
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
      "It runs every week. After setup, you are not in the busywork. A weekly note so you know what went out.",
  },
];

const NOT_DOING = [
  "Do the licensed job — the actual roofing, plumbing, clinical work. That still needs your tech.",
  "Guess at prices",
  "Give medical, legal, or licensed professional advice",
];

const HERO = PAGE_HEROES.capabilities;

export default function CapabilitiesPage() {
  return (
    <div>
      <PageHero badge={HERO.badge} title={HERO.title} subtitle={HERO.subtitle} />

      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <div className="hairline-card relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-orange/60 via-brand-orange/20 to-transparent"
              />
              <span className="icon-tile">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="section-eyebrow mt-4 text-brand-orange!">Headline hire</p>
              <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
                The phone
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70 md:text-base">
                Missed calls are lost jobs. A voice hire picks up what currently
                goes to voicemail.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PHONE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      <Check className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-brand-dark/80 dark:text-brand-cream/80">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-black/[0.06] pt-6 dark:border-white/[0.06]">
                <p className="text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  It is a cheaper hire for the calls nobody is answering. It can
                  take the phone seat. It does not do the licensed job, and it
                  never invents prices.
                </p>
                <p className="mt-3 text-sm text-brand-dark/45 dark:text-brand-cream/45">
                  Live voice answering is scoped on the call.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <section className="dotted-grid py-12 sm:py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <p className="section-eyebrow">The roster</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              Other jobs we hire for
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-brand-dark/60 dark:text-brand-cream/60">
              Pick the painful one. We build that workflow and run it.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <ol className="mt-10 grid grid-cols-1 gap-x-12 lg:grid-cols-2">
              {JOBS.map(({ icon: Icon, job, does }, index) => (
                <li
                  key={job}
                  className="flex items-start gap-4 border-t border-black/[0.08] py-5 dark:border-white/[0.08] first:border-t-0 lg:[&:nth-child(2)]:border-t-0 lg:last:col-span-2"
                >
                  <span className="w-7 shrink-0 pt-2 text-[12px] tabular-nums text-brand-dark/40 dark:text-brand-cream/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="icon-tile shrink-0">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-brand-dark dark:text-brand-cream">
                      {job}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                      {does}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeInWhenVisible>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <p className="section-eyebrow">The process</p>
            <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
              What you get
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className="hairline-card hairline-card-hover h-full p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] tabular-nums text-brand-dark/40 dark:text-brand-cream/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="icon-tile">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-dark dark:text-brand-cream">
                  {title}
                </h3>
                <div className="mt-5 h-px w-full bg-black/[0.08] dark:bg-white/[0.08]" />
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                  {description}
                </p>
              </div>
            ))}
          </StaggerChildren>

          <FadeInWhenVisible delay={0.1}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              A standard hire covers two workflows and the weekly running of
              them. Anything bigger gets quoted before we start.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      <section className="bg-brand-orange/5 py-12 dark:bg-brand-orange/[0.03] sm:py-16 lg:py-20">
        <div className="section-measure px-6">
          <FadeInWhenVisible>
            <div className="hairline-card max-w-3xl p-6 sm:p-8">
              <p className="section-eyebrow">Guardrails</p>
              <h2 className="section-h2 mt-4 text-brand-dark dark:text-brand-cream">
                What we do not do
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-3">
                {NOT_DOING.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black/[0.05] text-brand-dark/60 dark:bg-white/[0.08] dark:text-brand-cream/60">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-brand-dark/80 dark:text-brand-cream/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
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
