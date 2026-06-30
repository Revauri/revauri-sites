import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About — Revauri Designs",
  description:
    "Revauri Designs is the web-design practice of Revauri LLC, a New Jersey studio building custom websites for US small and medium businesses.",
  alternates: { canonical: "https://revauridesigns.com/about" },
};

const pillars = [
  {
    label: "Clear scope",
    body: "Every project starts with a defined scope and shared understanding of what success looks like. No ambiguity, no scope creep by default.",
  },
  {
    label: "Performance by default",
    body: "The stack we use — Next.js, Tailwind, Vercel — is optimized for Core Web Vitals from first render. Good scores aren't retrofitted; they're built in.",
  },
  {
    label: "Direct communication",
    body: "You talk to the person doing the work. No account managers, no relay layers. Feedback loops are short because the chain is short.",
  },
  {
    label: "Practical design",
    body: "Design decisions are grounded in your audience's context, not visual trends. Clarity and usability come first.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A focused web studio for US businesses"
        subtitle="Revauri Designs is the web-design practice of Revauri LLC — a New Jersey studio building custom websites for small and medium businesses across the United States."
      />

      {/* Main content */}
      <section className="bg-[#0f172a] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Left: prose */}
            <div className="flex flex-col gap-8 text-base leading-relaxed text-[#94a3b8]">
              <p>
                We work with businesses that need a proper web presence — not a template that could belong to anyone, but a site built specifically for who they are and what they offer.
              </p>
              <p>
                Our work is fully remote. Clients are located across the United States; we communicate over email and video, which keeps the process lean and responsive.
              </p>
              <p>
                The technical stack is intentional: Next.js for rendering and routing, Tailwind CSS for design precision, and Vercel for hosting and deployment. These tools produce fast, maintainable sites that hold up well over time and don&apos;t require specialized maintenance to keep running.
              </p>
              <p>
                We keep engagements focused. A clearly defined project with a clear outcome is better than a sprawling one with vague deliverables. If your goals evolve, scope can be extended — but we always start with clarity.
              </p>
            </div>

            {/* Right: texture image + pillars */}
            <div>
              <div
                className="relative mb-8 overflow-hidden rounded-sm"
                style={{ aspectRatio: "3/2" }}
              >
                <Image
                  src="/generated/texture.webp"
                  alt="Cool slate geometry representing structured, modern design"
                  fill
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(45,212,191,0.15)" }}
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>

          {/* Approach pillars */}
          <div
            style={{ borderTop: "1px solid #334155" }}
            className="mt-14 pt-14"
          >
            <p
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="mb-8 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
            >
              How we approach the work
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="rounded-sm border border-[#334155] bg-[#1e293b] p-6"
                >
                  <h3
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="mb-2 text-sm font-semibold text-[#f8fafc]"
                  >
                    {p.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#64748b]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
