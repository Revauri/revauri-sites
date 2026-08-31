/** Canonical marketing strings. UI and tests import from here. */

export const HERO_COPY = {
  h1Line1: "Hire an AI employee.",
  h1Line2: "Not another salary.",
  body: "We build it. We run it. The work leaves your plate so you can focus on what matters — on and off the clock.",
  primary: "Hire one",
  secondary: "Check out what it does",
  micro: "A custom-built agent that reports results, not complaints.",
} as const;

export const FINAL_CTA_COPY = {
  h2: "Ready to hand the work off?",
  body: "Twenty minutes. Name the job. We take it from there — and quote it against hiring a person, not against a software tool.",
  button: "Hire one",
  chip: "No obligation",
} as const;

export const SUPPORT_COPY = {
  h2: "Need a hand?",
  channels: [
    {
      title: "Hire one",
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
    subtitle: "Send a note. Or hire one — that’s faster.",
  },
  book: {
    badge: "The hire",
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
