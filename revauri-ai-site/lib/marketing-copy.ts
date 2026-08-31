/** Canonical marketing strings. UI and tests import from here. */

export const HERO_COPY = {
  h1Line1: "Hire an AI employee.",
  h1Line2: "Not another salary.",
  body: "We build it. We run it. The busywork leaves your plate while you stay on the job — and off the clock.",
  primary: "Book a call",
  secondary: "See the jobs",
  micro: "After setup, you are not in the busywork.",
} as const;

export const FINAL_CTA_COPY = {
  h2: "Ready to hand the work off?",
  body: "Book a short call. Name the job. We take it from there — and quote it against hiring a person, not against a software tool.",
  button: "Book a call",
  chip: "No obligation",
} as const;

export const SUPPORT_COPY = {
  h2: "Need a hand?",
  channels: [
    {
      title: "Book a call",
      line: "The work you want off your plate",
      cta: "Schedule now",
    },
    {
      title: "Email us",
      line: "We reply within a few hours",
      cta: "joseph@revauri.com",
    },
    {
      title: "Browse FAQ",
      line: "Answers to common questions",
      cta: "View FAQ",
    },
  ],
} as const;

export const FOOTER_BLURB =
  "An AI employee for the work you'd otherwise hire for.";

export const PAGE_HEROES = {
  capabilities: {
    badge: "Capabilities",
    title: "Example hires",
    subtitle:
      "The phone, the follow-ups, the busywork. We build the workflow and run it.",
  },
  pricing: {
    badge: "Pricing",
    title: "Priced on the job",
    muted: "not on a software tier",
    subtitle:
      "A lot less than putting another person on payroll. Quoted on a short call. No public price list.",
  },
  about: {
    badge: "About",
    title: "Hire the work",
    muted: "not another person",
    subtitle:
      "Revauri AI is a product of Revauri. We build AI employees for local service businesses and run them.",
  },
  faq: {
    badge: "FAQ",
    title: "Questions",
    subtitle:
      "What the hire does, what it costs relative to a person, and how you get your time back.",
  },
  contact: {
    badge: "Contact",
    title: "Get in touch",
    subtitle: "Name the job. Or book a call — that’s faster.",
  },
  book: {
    badge: "Book a call",
    title: "Name the job",
    muted: "you’d otherwise hire for",
    subtitle:
      "Twenty minutes. We hear the mess, tell you if we can take it, and quote it against a person.",
  },
  blog: {
    badge: "Blog",
    title: "Notes",
    subtitle:
      "What we learn building and running AI employees for local service businesses.",
  },
  privacy: {
    badge: "Legal",
    title: "Privacy Policy",
    subtitle: "Last updated: August 13, 2026",
  },
  terms: {
    badge: "Legal",
    title: "Terms of Service",
    subtitle: "Last updated: August 27, 2026",
  },
} as const;
