import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Services — Revauri Designs",
  description:
    "Custom website design and development, redesigns, mobile-first responsive design, technical SEO, and managed hosting. Services for US small and medium businesses.",
  alternates: { canonical: "https://revauridesigns.com/services" },
};

const services = [
  {
    title: "Custom Website Design & Development",
    description:
      "A fully custom site built around your business — not a theme or a page-builder. We handle design, development, and deployment end-to-end, from initial wireframes through launch.",
    outcomes: [
      "A site that accurately represents your brand and offering",
      "Clean, maintainable code on a modern stack",
      "Delivered ready to go live",
    ],
  },
  {
    title: "Website Redesigns",
    description:
      "If your current site is outdated, hard to navigate, or underperforming on mobile, we can rebuild it. We start by auditing what you have, then restructure and redesign where it counts.",
    outcomes: [
      "Updated visual design aligned to your current brand",
      "Improved structure and user flow",
      "Mobile-ready and performance-optimized",
    ],
  },
  {
    title: "Mobile-First Responsive Design",
    description:
      "Mobile visitors account for the majority of web traffic across most industries. We treat mobile as the primary design context, then scale up to tablet and desktop — not the other way around.",
    outcomes: [
      "Consistent experience on phones, tablets, and desktops",
      "Touch-friendly navigation and interactions",
      "No layout breakages across common screen sizes",
    ],
  },
  {
    title: "Technical SEO Foundations",
    description:
      "Search engine optimization starts with technical groundwork: proper metadata, structured data, fast load times, clean URL structure, and accurate sitemaps. We build this into every project rather than adding it as an afterthought.",
    outcomes: [
      "Correct Open Graph and page metadata",
      "JSON-LD structured data",
      "Sitemap and robots.txt configured for indexing",
    ],
  },
  {
    title: "Managed Hosting & Ongoing Support",
    description:
      "Sites we build are hosted on Vercel's managed infrastructure. After launch, we stay available for routine updates, content changes, and ongoing support. You have a direct line of contact — not a ticket queue.",
    outcomes: [
      "Reliable, fast hosting with no infrastructure management required from you",
      "Routine content and maintenance updates included",
      "A direct contact for questions and requests",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we build and maintain"
        subtitle="A focused set of services for businesses that want a proper web presence — designed well, built correctly, and kept current."
      />

      <section className="bg-[#0f172a] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-12">
            {services.map((service, i) => (
              <article
                key={service.title}
                className="rounded-sm border border-[#334155] bg-[#1e293b] p-8"
              >
                <div className="mb-4 flex items-start gap-4">
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                    className="mt-0.5 text-xs font-semibold text-[#2dd4bf]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="text-lg font-semibold text-[#f8fafc]"
                  >
                    {service.title}
                  </h2>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-[#94a3b8]">
                  {service.description}
                </p>
                <div style={{ borderTop: "1px solid #334155" }} className="pt-5">
                  <p
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#64748b]"
                  >
                    What you get
                  </p>
                  <ul className="flex flex-col gap-2">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-[#64748b]">
              Questions about scope or pricing?
            </p>
            <Link
              href="/contact"
              style={{ background: "#2dd4bf" }}
              className="inline-block rounded-sm px-6 py-3 text-sm font-semibold text-[#0f172a] transition-opacity hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
