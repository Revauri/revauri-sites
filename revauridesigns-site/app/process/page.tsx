import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Process — Revauri Designs",
  description:
    "How Revauri Designs approaches a web project: discovery, design, build, launch, and support. A clear, structured process for every engagement.",
  alternates: { canonical: "https://revauridesigns.com/process" },
};

const stages = [
  {
    label: "Discovery",
    description:
      "Every project starts with understanding your business. We ask about your audience, your goals, what you offer, and what you want visitors to do when they land on your site. We review your existing site if one exists, and we establish what success looks like before any design or code gets written.",
    details: [
      "Goals and audience alignment",
      "Review of existing site and assets",
      "Scope definition and project agreement",
    ],
  },
  {
    label: "Design",
    description:
      "With the scope defined, we move into visual design. We produce wireframes to establish layout and structure, then apply your visual identity — color, typography, and content hierarchy. Design is reviewed and refined with your input before development begins.",
    details: [
      "Wireframes for key pages",
      "Visual design application",
      "Two rounds of design review",
    ],
  },
  {
    label: "Build",
    description:
      "Once design is approved, we build the site using Next.js and Tailwind CSS. Every component is written specifically for your project — no page builders, no drag-and-drop platforms. We include proper metadata, structured data, sitemaps, and mobile responsiveness as standard.",
    details: [
      "Development on Next.js + Tailwind",
      "Technical SEO built in",
      "Fully responsive across devices",
    ],
  },
  {
    label: "Launch",
    description:
      "Before going live, we test across common browsers and screen sizes, verify load times, and confirm all links, forms, and redirects work correctly. We get your explicit written approval, then deploy to production on Vercel.",
    details: [
      "Cross-browser and device testing",
      "Written approval before deployment",
      "Vercel production deployment",
    ],
  },
  {
    label: "Support",
    description:
      "After launch, we remain available for content updates, technical questions, and routine maintenance. Your site is hosted on Vercel's managed infrastructure, monitored for uptime, and updated as needed. There is no ticket queue — you have a direct contact.",
    details: [
      "Managed hosting on Vercel",
      "Routine updates and content changes",
      "Direct contact for questions",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="How we work"
        subtitle="A structured approach to every project — from first conversation through ongoing support. No surprises, no shifting expectations."
      />

      <section className="bg-[#0f172a] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative flex flex-col gap-0">
            {stages.map((stage, i) => (
              <div key={stage.label} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Vertical connector line */}
                {i < stages.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[17px] top-9 h-full w-px bg-[#334155]"
                  />
                )}

                {/* Step indicator */}
                <div className="relative shrink-0">
                  <div
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontVariantNumeric: "tabular-nums",
                      border: "1px solid #2dd4bf",
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#0f172a] text-xs font-semibold text-[#2dd4bf]"
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h2
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="mb-3 text-lg font-semibold text-[#f8fafc]"
                  >
                    {stage.label}
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-[#94a3b8]">
                    {stage.description}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {stage.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2.5 text-sm text-[#64748b]"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 shrink-0 rounded-full bg-[#2dd4bf]"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{ borderTop: "1px solid #334155" }}
            className="mt-12 pt-10 text-center"
          >
            <p className="mb-4 text-sm text-[#64748b]">
              Ready to start a project?
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
