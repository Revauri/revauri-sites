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
      "A form, call, or quote goes quiet. The hire waits the agreed time, then sends a short follow-up in the owner\u2019s voice. You approve the first ones. After that it runs the same way.",
  },
  {
    id: "missed-calls",
    label: "After-hours / missed calls",
    caption:
      "Someone calls when you cannot pick up. The hire captures name, number, and what they need, then starts the follow-up so the job does not die in voicemail.",
    note: "Live voice answering is available and scoped on the call.",
  },
  {
    id: "quotes",
    label: "Quotes with no second follow-up",
    caption:
      "The estimate went out. Nobody nudged it. The hire sends the next check-in so the quote does not sit forever.",
  },
  {
    id: "reviews",
    label: "Reviews",
    caption:
      "After a good job, the hire asks for the review. When a new review lands, it drafts a reply for your yes / no.",
  },
  {
    id: "reminders",
    label: "Appointment reminders / no-shows",
    caption: "The hire reminds them before the visit, and follows up if they miss.",
  },
  {
    id: "check-in",
    label: "After-the-job check-in",
    caption: "\u201CHow did we do?\u201D Then a review ask or a next booking, if they are happy.",
  },
  {
    id: "admin",
    label: "Inbox / admin busywork",
    caption:
      "The hire drafts the repetitive replies and reminders so you are not rewriting the same email.",
  },
  {
    id: "reactivation",
    label: "Reactivating past customers",
    caption: "People who used you once and went quiet get a simple check-back.",
  },
  {
    id: "something-else",
    label: "Something else",
    caption:
      "Name the mess and we will tell you if we can take it. A custom hire gets built the same way.",
    steps: [
      "We look at how that mess works today.",
      "We name the steps.",
      "We build the hire.",
      "You approve what your customers see.",
    ],
  },
];

export function isCustomJob(
  job: HireDemoJob,
): job is Extract<HireDemoJob, { id: "something-else" }> {
  return job.id === "something-else";
}
