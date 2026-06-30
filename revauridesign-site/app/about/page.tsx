import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, Smartphone, Zap, LifeBuoy } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Revauri Design",
  description:
    "Revauri Design is the web design practice of Revauri LLC, a New Jersey studio serving small and medium businesses across the US. Learn about our approach and the modern stack we build on.",
  alternates: { canonical: "https://revauridesign.com/about" },
};

const pillars = [
  {
    icon: Code,
    title: "Modern stack, no excuses",
    body: "We build on Next.js, Tailwind CSS, and Vercel — a combination that produces genuinely fast, maintainable sites. No slow-loading page builders, no vendor lock-in spaghetti.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first, always",
    body: "More than half your visitors are on a phone. We design for that reality first and work outward, so the experience is right at every size.",
  },
  {
    icon: Zap,
    title: "Performance as a feature",
    body: "A site that loads fast earns trust instantly. Core Web Vitals aren't a bonus — they're baked into how we build.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing, not one-and-done",
    body: "We offer managed hosting and support so your site stays healthy after launch. No mystery bills, no waiting for a developer to return your calls.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b border-brand-light-gray bg-brand-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              About
            </p>
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[1.1] tracking-tight text-brand-dark sm:text-6xl">
            A small studio that takes its work seriously.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-dark/60">
            Revauri Design is the web design practice of Revauri LLC — a New Jersey
            company that works remotely with small and medium businesses across the
            United States.
          </p>
        </div>
      </section>

      {/* Studio description */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-brand-dark">
                What we do
              </h2>
              <div className="mt-6 space-y-5 text-brand-dark/60">
                <p className="leading-relaxed">
                  We design and develop custom websites for businesses that want an
                  online presence they can be proud of. That means something
                  fast, well-structured, and actually representative of the quality
                  of what you offer.
                </p>
                <p className="leading-relaxed">
                  Our work covers everything from initial concept and visual design
                  through development, launch, and ongoing maintenance. We handle the
                  technical side completely — you shouldn&apos;t need to know what a
                  hosting provider is.
                </p>
                <p className="leading-relaxed">
                  We&apos;re a small operation, which means you get direct communication
                  and genuine attention to your project. No account managers, no
                  handoffs, no surprises.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold text-brand-dark">
                Our philosophy
              </h2>
              <div className="mt-6 space-y-5 text-brand-dark/60">
                <p className="leading-relaxed">
                  Good websites are invisible in the best way — visitors find what
                  they&apos;re looking for without friction, trust builds naturally, and
                  the right action (a call, a form submission, a purchase) feels
                  obvious. That&apos;s what we&apos;re aiming for.
                </p>
                <p className="leading-relaxed">
                  We believe in doing less, better. A focused site with clean
                  structure will outperform a sprawling one with flashy effects. We
                  push back when something would add complexity without adding value.
                </p>
                <p className="leading-relaxed">
                  We also believe websites should be honest. No inflated claims, no
                  fake urgency — just a clear picture of what you do and why someone
                  should choose you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#F5F2EC] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              How we build
            </p>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
            Principles we don&apos;t compromise on.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-brand-light-gray bg-brand-cream p-6 sm:p-8"
              >
                <p.icon className="h-5 w-5 text-brand-orange" strokeWidth={1.5} />
                <h3 className="mt-4 text-base font-semibold text-brand-dark">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-mid-gray">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark">
            Let&apos;s talk about your project.
          </h2>
          <p className="mt-5 text-brand-dark/60">
            We&apos;d love to hear what you&apos;re working on and see if we&apos;re a good fit.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-4 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange/90 hover:shadow-lg"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
