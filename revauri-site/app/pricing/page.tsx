import type { Metadata } from "next";
import {
  Check,
  ArrowRight,
  Users,
  Building2,
  Layers,
  Bot,
  Mail,
  Palette,
  FileText,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { PageHero, GradientText } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";

export const metadata: Metadata = {
  title: "Pricing — Revauri",
  description:
    "Custom website quotes for your business. Free preview redesign included. Schedule a discovery call to get your quote.",
  alternates: { canonical: "/pricing" },
};

const CERTAINTY_ITEMS = [
  "Free custom redesign concept built before you commit. No surprises.",
  "Two rounds of revisions are included in every package. We work with you until it's right.",
  "Your monthly retainer payment doesn't start until 30 days after your site goes live.",
  "Cancel the monthly retainer anytime with 30-day notice. You keep the code, no penalties.",
  "Every site includes your Website Care Plan — hosting, SSL, and unlimited minor updates.",
  "Need something specific? We offer individual add-ons for chatbots, analytics, and more.",
];

const SCOPE_PATHS = [
  {
    icon: Users,
    title: "Solo & Micro",
    profile: "Single owner, 1–5 employees, simple service business",
    scope:
      "Typical scope: homepage + 4–5 inner pages, mobile-first design, contact form, ongoing care",
  },
  {
    icon: Building2,
    title: "Standard Small Business",
    profile: "5–15 employees, established local business",
    scope:
      "Typical scope: homepage + 6–8 inner pages, online booking or scheduling, SEO foundation, ongoing care",
  },
  {
    icon: Layers,
    title: "Multi-location or e-Commerce",
    profile: "Multiple locations, online sales, integrations",
    scope:
      "Typical scope: full site + integrations, custom features, priority delivery, ongoing care + content",
  },
];

const ADD_ONS = [
  {
    icon: Bot,
    title: "AI chatbot integration",
    description:
      "Trained on your content. Answers visitors 24/7 so leads never bounce.",
  },
  {
    icon: Mail,
    title: "Lead capture forms with email automation",
    description:
      "Forms that route to your inbox or CRM and auto-respond instantly.",
  },
  {
    icon: Palette,
    title: "Custom illustrations and animations",
    description:
      "Original artwork and motion your competitors can't copy from a template.",
  },
  {
    icon: FileText,
    title: "Monthly content (blog posts, social)",
    description:
      "Written in your brand voice. Publish-ready every month, no scrambling.",
  },
  {
    icon: Sparkles,
    title: "Cloud-hosted AI assistant for your business",
    description:
      "A private AI workspace your team uses to move faster every day.",
  },
  {
    icon: Target,
    title: "Done-for-you lead generation",
    description:
      "Targeted outbound campaigns that fill your pipeline with qualified prospects.",
  },
];

export default function PricingPage() {
  return (
    <div>
      <PageHero
        badge="PRICING"
        title={
          <>
            Custom website quotes, built around{" "}
            <GradientText>your business</GradientText>
          </>
        }
        subtitle="Every project is scoped after a short discovery call. Free preview redesign included."
      />

      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        {/* How custom quotes work */}
        <FadeInWhenVisible>
          <section className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream sm:text-3xl">
              How custom quotes work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              Every project is scoped after a free 15-minute discovery call where we
              understand your business, current site, and where you want to go.
              You&apos;ll get a clear quote afterward, based on the actual scope
              instead of a generic package.
            </p>
          </section>
        </FadeInWhenVisible>

        {/* Three scope paths */}
        <StaggerChildren className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {SCOPE_PATHS.map(({ icon: Icon, title, profile, scope }) => (
            <BlendedDemoFrame key={title} className="pt-4">
              <div className="flex h-full flex-col rounded-2xl border border-brand-light-gray bg-brand-white p-8 transition-colors duration-300 hover:border-brand-orange/30 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
                <Icon className="h-6 w-6 text-brand-orange" />
                <h3 className="mt-4 text-lg font-semibold text-brand-dark dark:text-brand-cream">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-brand-dark/60 dark:text-brand-cream/60">
                  {profile}
                </p>
                <div className="my-5 h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
                <p className="text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                  {scope}
                </p>
              </div>
            </BlendedDemoFrame>
          ))}
        </StaggerChildren>

        {/* Certainty block */}
        <FadeInWhenVisible>
          <section className="mt-20">
            <h2 className="mb-6 text-center text-xl font-semibold text-brand-dark dark:text-brand-cream">
              No surprises. Here&apos;s exactly what to expect.
            </h2>
            <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              {CERTAINTY_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm text-brand-dark/80 dark:text-brand-cream/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </FadeInWhenVisible>

        {/* Add-ons */}
        <FadeInWhenVisible>
          <section className="mt-20 rounded-2xl bg-brand-orange/10 px-6 py-12 lg:px-10 lg:py-14">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream sm:text-3xl">
                Add-ons and other services available
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-brand-mid-gray">
                Each priced individually based on scope.
              </p>
            </div>

            <StaggerChildren className="mt-10 grid grid-cols-1 auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ADD_ONS.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group relative flex h-full flex-col items-center p-6 text-center"
                >
                  <div className="relative grid h-12 w-12 shrink-0 place-items-center">
                    <span
                      className="pointer-events-none absolute inset-[-8px] rounded-full bg-brand-orange/30 opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-brand-orange/22"
                      aria-hidden
                    />
                    <div className="relative z-[1] flex h-full w-full items-center justify-center rounded-full bg-brand-dark text-brand-cream shadow-[0_0_14px_8px_rgba(217,119,87,0.14)] dark:bg-brand-cream dark:text-brand-dark">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h4 className="mt-5 text-base font-semibold text-brand-dark dark:text-brand-cream">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                    {description}
                  </p>
                </div>
              ))}
            </StaggerChildren>
          </section>
        </FadeInWhenVisible>

        {/* CTA */}
        <FadeInWhenVisible delay={0.2}>
          <section className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream sm:text-3xl">
              Get your custom quote
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
              A 15-minute discovery call gets you a tailored quote within 24 hours.
            </p>
            <div className="mt-8">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
              >
                Schedule a Free Discovery Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
