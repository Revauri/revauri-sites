export type PortfolioTag = "Client Work" | "Founder Project";

export interface PortfolioImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface PortfolioTestimonial {
  quote: string;
  author: string;
  title: string;
  avatar: string | null;
}

export interface PortfolioProject {
  slug: "cryptrac" | "lion-law" | "ultaura";
  name: string;
  tagline: string;
  industry: string;
  tag: PortfolioTag;
  shortDescription: string;
  liveUrl: string | null;
  status: string;
  hasRealImages: boolean;
  heroImage: PortfolioImage;
  gallery: PortfolioImage[];
  challenge: string;
  approach: string[];
  built: string[];
  testimonial: PortfolioTestimonial | null;
}

export const PROJECTS: readonly PortfolioProject[] = [
  {
    slug: "ultaura",
    name: "Ultaura",
    tagline: "An AI voice companion for seniors.",
    industry: "AI / Healthcare Technology",
    tag: "Founder Project",
    shortDescription:
      "An AI voice companion for seniors. Daily outbound phone calls from a friendly AI voice, family dashboard for loved ones, and a safety system that surfaces early signs of cognitive or health changes. No app required for the senior.",
    liveUrl: "https://ultaura.com",
    status: "Live",
    hasRealImages: true,
    heroImage: {
      src: "/portfolio/ultaura/hero.png",
      alt: "Ultaura public landing page with the AI voice companion value prop",
      width: 2932,
      height: 1474,
    },
    gallery: [
      { src: "/portfolio/ultaura/gallery-1.png", alt: "Dashboard home for family members", width: 2940, height: 1480 },
      { src: "/portfolio/ultaura/gallery-2.png", alt: "Line detail page with usage, schedule, and reminders", width: 2940, height: 1480 },
      { src: "/portfolio/ultaura/gallery-3.png", alt: "Insights hub showing mood, memory, and safety signals", width: 2940, height: 1476 },
      { src: "/portfolio/ultaura/gallery-4.png", alt: "Pricing page with Care, Comfort, and Family plans", width: 2940, height: 1487 },
      { src: "/portfolio/ultaura/gallery-5.png", alt: "Health profile / admin view", width: 2940, height: 1486 },
    ],
    challenge:
      "Loneliness and undetected cognitive decline are two of the hardest problems families face with aging parents — and both require daily, patient attention that humans can't always give. Ultaura is a voice-first AI that calls the senior every day, remembers their life, and quietly flags changes the family should know about.",
    approach: [
      "Voice-first, app-free for the senior — if they can answer a phone, they can use Ultaura. No downloads, no logins, no touchscreens to navigate. The whole product is designed around that single constraint, meeting seniors exactly where they already are.",
      "Family dashboard with encrypted memories, schedules, and insights for loved ones — while the senior's experience stays app-free with large tap targets, high contrast, and simple flows.",
      "Multi-layer safety classifier that escalates concerning moments to family immediately, backed by per-line AES-256-GCM encryption so one family's data is never readable by another.",
    ],
    built: [
      "37+ dashboard routes and 128 Supabase migrations",
      "75 registered voice agent tools running through xAI Grok realtime over WebSocket",
      "Twilio telephony orchestration via a dedicated Express service",
      "Per-line AES-256-GCM encryption with isolated data keys",
      "Multi-layer safety classifier (AI + heuristics + keyword scanning)",
      "Stripe subscription + metered billing for per-minute overages",
      "Cypress E2E test suite and an 11-section admin operations guide",
    ],
    testimonial: null,
  },
  {
    slug: "lion-law",
    name: "Lion Law",
    tagline: "Where strength meets strategy.",
    industry: "Legal / Professional Services",
    tag: "Client Work",
    shortDescription:
      "A premium personal injury law firm website for Alphonse Petracco, Esq. in Nutley, NJ. 17 pages of pure HTML/CSS/JS — no framework, no build step — with an AI chatbot, practice-area carousel, and six SEO-optimized blog posts.",
    liveUrl: "https://www.accidentsinjurylawyer.com",
    status: "Live",
    hasRealImages: true,
    heroImage: {
      src: "/portfolio/lion-law/hero.png",
      alt: "Lion Law homepage with the 'Where Strength Meets Strategy' tagline",
      width: 2940,
      height: 1483,
    },
    gallery: [
      { src: "/portfolio/lion-law/gallery-1.png", alt: "Practice areas carousel", width: 2940, height: 1482 },
      { src: "/portfolio/lion-law/gallery-2.png", alt: "Case results page", width: 2940, height: 1502 },
      { src: "/portfolio/lion-law/gallery-3.png", alt: "FAQ page with search", width: 2940, height: 1490 },
      { src: "/portfolio/lion-law/gallery-4.png", alt: "AI chatbot widget in open state", width: 2940, height: 1490 },
      { src: "/portfolio/lion-law/gallery-5.png", alt: "Consultation modal with backdrop blur", width: 2940, height: 1488 },
    ],
    challenge:
      "Personal injury law is a crowded, high-stakes category where trust is everything. Lion Law needed a site that looks like a firm with serious wins — but also loads fast, ranks well locally, and makes it trivial for an injured visitor to get help at 2 a.m.",
    approach: [
      "Gold-on-black brand system with Cormorant Garamond display type — the visual weight of a premium firm, not a template lawyer site. Every color, font weight, and spacing decision reinforces credibility before a visitor reads a single word.",
      "Pure static HTML/CSS/JS with zero build step — fast, indexable, and impossible to break — with backdrop-blur consultation modals and an animated practice-area carousel that make it feel modern without slowing it down.",
      "AI chatbot widget powered by GPT-4o through a Vercel Edge Function for 24/7 first-contact triage, plus six long-form SEO blog posts targeting the exact practice-area keywords the firm wants to rank for.",
    ],
    built: [
      "17 static HTML pages, hand-written, no framework",
      "AI chatbot widget integrated via Vercel Edge Function (GPT-4o)",
      "Practice-area carousel with keyboard and touch support",
      "FAQ page with client-side search",
      "Consultation modal with backdrop blur and focus trapping",
      "Six SEO-optimized blog posts targeting local practice keywords",
    ],
    testimonial: {
      quote:
        "I love it. This is exactly what we wanted and our message comes across perfectly. Simple and clean.",
      author: "Alphonse Petracco, Esq.",
      title: "Lead Attorney, Lion Law",
      avatar: "/portfolio/lion-law/testimonial-avatar.jpg",
    },
  },
  {
    slug: "cryptrac",
    name: "Cryptrac",
    tagline: "Crypto payment platform for businesses.",
    industry: "Fintech / SaaS",
    tag: "Founder Project",
    shortDescription:
      "A non-custodial crypto payment platform for businesses. Merchants create payment links, customers pay in any of 82+ cryptocurrencies, and funds go straight to the merchant's wallet — Cryptrac never holds a cent.",
    liveUrl: "https://www.cryptrac.com",
    status: "Live",
    hasRealImages: true,
    heroImage: {
      src: "/portfolio/cryptrac/hero.png",
      alt: "Cryptrac homepage showing the 'Get paid in crypto' hero and supported networks",
      width: 2940,
      height: 1484,
    },
    gallery: [
      { src: "/portfolio/cryptrac/gallery-1.png", alt: "Payment link creation form with live checkout preview", width: 2940, height: 1479 },
      { src: "/portfolio/cryptrac/gallery-2.png", alt: "Public checkout page at /pay/[link_id]", width: 2940, height: 1477 },
      { src: "/portfolio/cryptrac/gallery-3.png", alt: "Merchant dashboard payment history with status badges", width: 2940, height: 1480 },
      { src: "/portfolio/cryptrac/gallery-4.png", alt: "Supported cryptocurrencies grid", width: 2940, height: 1478 },
      { src: "/portfolio/cryptrac/gallery-5.png", alt: "Pricing page with the $19 and $29 plans", width: 2940, height: 1482 },
    ],
    challenge:
      "Most crypto payment tools either custody funds (which is a regulatory and trust problem) or force merchants to stitch together five different SDKs to accept a single coin. Cryptrac is the thing merchants actually want: one link, any chain, money in your wallet, no intermediary.",
    approach: [
      "Non-custodial by architecture — Cryptrac never holds customer funds or merchant private keys. That constraint shapes every design decision, from how checkout flows work to how wallets connect, not just the marketing copy.",
      "One unified payment link that accepts 82+ cryptocurrencies across multiple networks, with automatic network detection and routing so merchants don't need to think about chains, tokens, or wallet compatibility.",
      "Stripe-style developer experience — clean dashboard, shareable checkout URLs, webhooks, real-time tax via TaxJar, and subscription billing — all in a Turborepo monorepo with shared types across marketing site, dashboard, checkout, and API.",
    ],
    built: [
      "13+ authenticated dashboard routes and 10+ marketing pages, all typed end-to-end",
      "Supabase Postgres with row-level security for per-merchant isolation",
      "NOWPayments webhook integration with timing-safe signature verification",
      "Multi-network crypto handling across 82+ supported currencies",
      "English and Spanish i18n, built in from day one",
      "Full test matrix covering checkout, webhooks, and subscription flows",
    ],
    testimonial: null,
  },
];

export function getAllProjects(): readonly PortfolioProject[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
