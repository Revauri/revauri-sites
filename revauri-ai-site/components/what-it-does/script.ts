export type FeatureId = "catch" | "follow-up" | "keep-running";

export interface AccordionItem {
  code: string;
  title: string;
  line: string;
  how: string;
  tryAsk: string;
  delivers: string[];
  strip: [string, string, string];
}

export interface FeatureSection {
  id: FeatureId;
  kicker: string;
  heading: string;
  body: string;
  side: "copy-left" | "copy-right";
  items: AccordionItem[];
}

export const WHAT_IT_DOES_INTRO = {
  eyebrow: "What the hire does",
  h2Line1: "Stay on the job.",
  h2Line2: "Put the AI employee on the rest.",
  body: "Name the outcome. We bring the workflow, keep it aligned to how you already work, and leave you in control of what goes out.",
} as const;

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    id: "catch",
    kicker: "1.0 — CATCH",
    heading: "The hire catches the work that currently goes to voicemail.",
    body: "After-hours, overflow, missed. It answers, takes the name and the job, and holds a callback you already approved.",
    side: "copy-left",
    items: [
      {
        code: "1.1",
        title: "After-hours calls",
        line: "When you can’t pick up, the hire does.",
        how: "It answers after hours, takes the name, the number, and what they need, then holds a callback or a slot you already approved. Urgent, it texts you.",
        tryAsk: "“Answer after 5pm and text me if it’s urgent.”",
        delivers: ["Call summary", "Name and number", "What they need", "Hold on the calendar"],
        strip: ["Incoming", "Captured", "Waiting on you"],
      },
      {
        code: "1.2",
        title: "Missed and overflow",
        line: "The call that would have gone to voicemail still gets a person on the line.",
        how: "Overflow and missed calls get the same capture. It never guesses a price. Anything sensitive comes straight back to you.",
        tryAsk: "“Catch the calls we miss during jobs.”",
        delivers: ["Missed-call log", "Capture", "Callback hold", "Hand-off when needed"],
        strip: ["Missed", "Captured", "Hand-off"],
      },
      {
        code: "1.3",
        title: "Capture name, number, job",
        line: "Enough to call them back. Not a novel.",
        how: "Name, number, what they need. Written up the same evening so you are not reconstructing voicemails.",
        tryAsk: "“Take a message I can actually use.”",
        delivers: ["Name", "Number", "Job", "Same-day summary"],
        strip: ["Call", "Notes", "Summary"],
      },
      {
        code: "1.4",
        title: "Hold a callback",
        line: "A time on the calendar, not a promise you didn’t make.",
        how: "It holds times you have pre-approved. It does not invent availability or prices.",
        tryAsk: "“Hold Thursday morning if they need a visit.”",
        delivers: ["Held slot", "Your approval rules", "Reminder to you"],
        strip: ["Request", "Hold", "Your calendar"],
      },
    ],
  },
  {
    id: "follow-up",
    kicker: "2.0 — FOLLOW UP",
    heading: "The hire finds the quiet work and gives people a reason to reply.",
    body: "Quiet leads, sitting quotes, past customers. Follow-ups go out in your voice. Nothing licensed, and no guessed prices.",
    side: "copy-right",
    items: [
      {
        code: "2.1",
        title: "Quiet leads",
        line: "A form, a call, a quote that went quiet.",
        how: "It waits the time you agreed, then follows up in your voice. After setup it runs without you chasing it.",
        tryAsk: "“Follow up if they haven’t replied in five days.”",
        delivers: ["Timed follow-up", "Your voice", "Weekly note"],
        strip: ["Quiet", "Wait", "Follow-up"],
      },
      {
        code: "2.2",
        title: "Quotes sitting still",
        line: "The estimate went out. Nobody nudged it.",
        how: "The next check-in goes out so the quote doesn’t sit. You are not paying someone to chase paper.",
        tryAsk: "“Nudge quotes that have been quiet for a week.”",
        delivers: ["Quote follow-up", "Ranking of open quotes", "Your approval during setup"],
        strip: ["Sent", "Sitting", "Nudge"],
      },
      {
        code: "2.3",
        title: "Past customers",
        line: "People who used you once and went quiet.",
        how: "A simple check-back. Work you were never going to get to.",
        tryAsk: "“Check back with last year’s customers this month.”",
        delivers: ["Check-back", "In your voice", "A list of who heard from you"],
        strip: ["Past", "Check-back", "Heard from you"],
      },
      {
        code: "2.4",
        title: "In your voice",
        line: "It sounds like you. That is the point of setup.",
        how: "During setup you approve wording so it learns. After that it runs. You can still jump in.",
        tryAsk: "“Make it sound like me, not like a robot.”",
        delivers: ["Approved voice", "Running follow-ups", "An override when you want it"],
        strip: ["Draft", "Your voice", "Running"],
      },
    ],
  },
  {
    id: "keep-running",
    kicker: "3.0 — KEEP RUNNING",
    heading: "The hire keeps the busywork moving after you leave the site.",
    body: "Review asks, reminders, check-ins, inbox. Same hire, same voice, running every week. You get a note. You are not in it.",
    side: "copy-left",
    items: [
      {
        code: "3.1",
        title: "Review asks",
        line: "After a good job, someone asks. It isn’t you.",
        how: "A short thank-you with a review link, timed for when they’re happiest. New reviews get a reply.",
        tryAsk: "“Ask for a Google review the day after we finish.”",
        delivers: ["Review ask", "Reply to new reviews", "You stay out of it"],
        strip: ["Job done", "Ask", "Reply"],
      },
      {
        code: "3.2",
        title: "Reminders / no-shows",
        line: "Fewer no-shows. Less of you playing secretary.",
        how: "A reminder before the visit, and a follow-up if they miss.",
        tryAsk: "“Remind them the morning of the appointment.”",
        delivers: ["Reminder", "Miss follow-up", "Weekly note"],
        strip: ["Booked", "Remind", "If they miss"],
      },
      {
        code: "3.3",
        title: "After-the-job check-in",
        line: "“How did we do?” Then a review or a next booking.",
        how: "It happens after you leave the site.",
        tryAsk: "“Check in the day after every job.”",
        delivers: ["Check-in", "Review ask if they’re happy", "Next-booking nudge"],
        strip: ["Left site", "Check-in", "Next"],
      },
      {
        code: "3.4",
        title: "Inbox busywork",
        line: "The same email, rewritten by you, every week.",
        how: "Repetitive replies and reminders leave your plate. Not a salary.",
        tryAsk: "“Handle the appointment-change emails.”",
        delivers: ["Replies", "Reminders", "Anything sensitive comes back to you"],
        strip: ["Inbox", "Reply", "Hand-back"],
      },
    ],
  },
];

export const ACCORDION_ITEMS: AccordionItem[] = FEATURE_SECTIONS.flatMap(
  (section) => section.items,
);

/** Desktop tracks: mock always 1fr, copy always ~340px. */
export function featureGridCols(side: FeatureSection["side"]): string {
  return side === "copy-right"
    ? "min-[1000px]:grid-cols-[1fr_minmax(280px,340px)]"
    : "min-[1000px]:grid-cols-[minmax(280px,340px)_1fr]";
}
