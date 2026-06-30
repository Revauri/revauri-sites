import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HomeValueProps } from "@/components/home-value-props";
import { HomeServices } from "@/components/home-services";
import { HomeProcess } from "@/components/home-process";

export const metadata: Metadata = {
  title: "Revauri Designs — Fast, Modern Websites for US Businesses",
  description:
    "Custom website design and development for small and medium businesses. Built on Next.js, Tailwind, and Vercel. Mobile-first, performance-ready, built to last.",
  alternates: { canonical: "https://revauridesigns.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Revauri Designs",
  legalName: "Revauri LLC",
  url: "https://revauridesigns.com",
  description:
    "Custom website design and development for small and medium businesses across the United States. Built on Next.js, Tailwind CSS, and Vercel.",
  areaServed: "US",
  email: "ryan.calloway@revauridesigns.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "725 Joralemon Street, Unit 127",
    addressLocality: "Belleville",
    addressRegion: "NJ",
    postalCode: "07109",
    addressCountry: "US",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f172a] py-24 lg:py-36">
        {/* Dot grid texture */}
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0"
        />
        {/* Teal radial glow, top-left */}
        <div
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 0% 0%, rgba(45,212,191,0.07) 0%, transparent 70%)",
          }}
          className="pointer-events-none absolute inset-0"
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <p
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
              >
                Web Design &amp; Development
              </p>
              <h1
                style={{ fontFamily: "var(--font-space-grotesk)", textWrap: "balance" }}
                className="text-4xl font-bold leading-[1.1] tracking-tight text-[#f8fafc] opacity-0 animate-fade-up sm:text-5xl lg:text-[3.5rem]"
              >
                We build fast, modern websites that perform.
              </h1>
              <p
                className="mt-6 max-w-lg text-lg leading-relaxed text-[#94a3b8] opacity-0 animate-fade-up"
                style={{ animationDelay: "150ms" }}
              >
                Revauri Designs is a US web studio crafting custom sites for small and medium businesses — engineered on Next.js, Tailwind, and Vercel from day one.
              </p>
              <div
                className="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-fade-up"
                style={{ animationDelay: "280ms" }}
              >
                <Link
                  href="/contact"
                  style={{ background: "#2dd4bf" }}
                  className="inline-block rounded-sm px-6 py-3 text-sm font-semibold text-[#0f172a] transition-opacity hover:opacity-90"
                >
                  Get in touch
                </Link>
                <Link
                  href="/services"
                  className="inline-block text-sm font-medium text-[#94a3b8] underline underline-offset-4 transition-colors hover:text-[#f8fafc]"
                >
                  View services
                </Link>
              </div>
            </div>

            {/* Right: hero image */}
            <div
              className="relative overflow-hidden rounded-sm opacity-0 animate-fade-up"
              style={{ aspectRatio: "16/9", animationDelay: "200ms" }}
            >
              <Image
                src="/generated/hero.webp"
                alt="Cool, modern architectural interior at blue hour"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle teal border glow */}
              <div
                aria-hidden="true"
                style={{ boxShadow: "inset 0 0 0 1px rgba(45,212,191,0.2)" }}
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <HomeValueProps />

      {/* Services overview */}
      <HomeServices />

      {/* Process teaser */}
      <HomeProcess />

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[#1e293b] py-20">
        <div
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 500px 300px at 100% 100%, rgba(45,212,191,0.06) 0%, transparent 70%)",
          }}
          className="pointer-events-none absolute inset-0"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
          >
            Ready to start?
          </p>
          <h2
            style={{ fontFamily: "var(--font-space-grotesk)", textWrap: "balance" }}
            className="text-3xl font-bold tracking-tight text-[#f8fafc] sm:text-4xl"
          >
            Let&apos;s build something worth visiting.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#94a3b8]">
            Drop us a line and we&apos;ll respond within a couple of business days. No hard sell — just a straight conversation about your project.
          </p>
          <Link
            href="/contact"
            style={{ background: "#2dd4bf" }}
            className="mt-8 inline-block rounded-sm px-8 py-3 text-sm font-semibold text-[#0f172a] transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
