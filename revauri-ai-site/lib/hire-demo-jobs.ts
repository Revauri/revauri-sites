export type HireDemoJobId =
  | "quiet-leads"
  | "missed-calls"
  | "quotes"
  | "reviews"
  | "reminders"
  | "check-in"
  | "admin"
  | "reactivation"
  | "something-else";

export type HireDemoJob =
  | {
      id: Exclude<HireDemoJobId, "something-else">;
      label: string;
      caption: string;
      note?: string;
    }
  | {
      id: "something-else";
      label: string;
      caption: string;
      steps: string[];
    };

export const HIRE_DEMO_JOBS: HireDemoJob[] = [
  {
    id: "quiet-leads",
    label: "Quiet leads",
    caption:
      "A form, call, or quote goes quiet. The hire waits the agreed time, then follows up in your voice while you're on a job. After setup it runs the same way without you chasing it.",
  },
  {
    id: "missed-calls",
    label: "After-hours / missed calls",
    caption:
      "Someone calls when you cannot pick up. The hire captures name, number, and what they need, then starts the follow-up so the job does not die in voicemail. You don't staff a person just to catch the phone.",
    note: "Live voice answering is available and scoped on the call.",
  },
  {
    id: "quotes",
    label: "Quotes with no second follow-up",
    caption:
      "The estimate went out. Nobody nudged it. The hire sends the next check-in so the quote does not sit forever — and you are not paying someone to chase paper.",
  },
  {
    id: "reviews",
    label: "Reviews",
    caption:
      "After a good job, the hire asks for the review. When a new review lands, it replies. You are already on the next job.",
  },
  {
    id: "reminders",
    label: "Appointment reminders / no-shows",
    caption:
      "The hire reminds them before the visit, and follows up if they miss. Fewer no-shows. Less of you playing secretary.",
  },
  {
    id: "check-in",
    label: "After-the-job check-in",
    caption:
      "\u201CHow did we do?\u201D Then a review ask or a next booking, if they are happy. Happens after you leave the site.",
  },
  {
    id: "admin",
    label: "Inbox / admin busywork",
    caption:
      "The hire handles the repetitive replies and reminders so you are not rewriting the same email — and so that isn't a salary.",
  },
  {
    id: "reactivation",
    label: "Reactivating past customers",
    caption:
      "People who used you once and went quiet get a simple check-back. Work you were never going to get to.",
  },
  {
    id: "something-else",
    label: "Something else",
    caption:
      "Name the mess. If it's work you'd hire a person for, we will tell you if we can take it.",
    steps: [
      "We look at how that mess works today.",
      "We name the steps.",
      "We build the hire and run it.",
      "During setup you approve so it learns your voice. Then it runs.",
    ],
  },
];

export function isCustomJob(
  job: HireDemoJob,
): job is Extract<HireDemoJob, { id: "something-else" }> {
  return job.id === "something-else";
}
