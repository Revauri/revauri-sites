import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Search, LifeBuoy, Repeat2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Revauri Design",
  description:
    "Custom website design and development, website redesigns, mobile-first responsive design, technical SEO foundations, and managed hosting for US small businesses.",
  alternates: { canonical: "https://revauridesign.com/services" },
};

const services = [
  {
    icon: Monitor,
    title: "Custom Website Design & Development",
    description:
      "We design and build your site from scratch — no templates, no page builders. The visual design is tailored to your brand, and the code is clean, maintainable, and built on a modern stack (Next.js, Tailwind CSS, Vercel). You get a site that loads fast and holds up over time.",
    what: [
      "Visual design — layout, typography, color, imagery guidance",
      "Responsive front-end development",
      "Clear calls-to-action and intuitive navigation",
      "Deployment to production with custom domain setup",
    ],
  },
  {
    icon: Repeat2,
    title: "Website Redesigns",
    description:
      "If your current site is outdated, slow, or just doesn't represent your business well, we'll rebuild it. We carry over what matters (content, brand direction) and rethink everything else. The result is a site that feels current and performs to modern standards.",
    what: [
      "Audit of your existing site",
      "Redesigned layout and visual identity",
      "Rebuilt on a fast, modern stack",
      "Content migration and SEO-friendly URL handling",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile-First Responsive Design",
    description:
      "All our sites are designed mobile-first. That means the phone experience is the starting point, and the layout scales up gracefully from there — not shrunk down awkwardly from a desktop version. Every breakpoint is tested before anything ships.",
    what: [
      "Designed and tested across phones, tablets, and desktops",
      "Touch-friendly interactions",
      "Images and assets optimized for each screen size",
    ],
  },
  {
    icon: Search,
    title: "Technical SEO Foundations",
    description:
      "We build sites with the technical structure search engines expect: semantic HTML, proper heading hierarchy, meta tags, canonical URLs, structured data, a sitemap, and a robots.txt. This gives your content the best chance of being read and ranked correctly. We don't promise specific rankings — that depends on many factors outside any developer's control — but we make sure the foundation is solid.",
    what: [
      "Semantic HTML structure",
      "Page-level meta titles and descriptions",
      "Canonical URLs and sitemap generation",
      "Structured data (JSON-LD) where appropriate",
      "Core Web Vitals optimization",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Managed Hosting & Ongoing Support",
    description:
      "After launch, your site is hosted on Vercel's infrastructure — fast, reliable, and globally distributed. We handle updates, security patches, and routine maintenance. If something breaks or you need a content change, you have someone to contact. We aim to keep things simple: no surprise bills, no chasing someone down for basic support.",
    what: [
      "Hosting on Vercel (global CDN, automatic HTTPS)",
      "Routine maintenance and dependency updates",
      "Content updates and minor changes",
      "Monitoring and issue response",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b border-brand-light-gray bg-brand-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Services
            </p>
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[1.1] tracking-tight text-brand-dark sm:text-6xl">
            What we build, and how.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-dark/60">
            Everything we offer is aimed at one outcome: a website that works
            properly and represents your business honestly.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-16">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="grid grid-cols-1 gap-8 border-b border-brand-light-gray pb-16 last:border-0 last:pb-0 lg:grid-cols-[56px_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
                  <s.icon className="h-5 w-5 text-brand-orange" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-mid-gray">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-serif text-2xl font-semibold text-brand-dark sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-brand-dark/60">
                    {s.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.what.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-brand-dark/60">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5F2EC] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark">
            Not sure which service fits?
          </h2>
          <p className="mt-5 text-brand-dark/60">
            Just tell us where you are and what you need. We&apos;ll figure out the
            right scope together.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-4 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange/90 hover:shadow-lg"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
