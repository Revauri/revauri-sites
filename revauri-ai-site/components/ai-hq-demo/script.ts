// Script data + timing constants for the autoplaying "AI employee HQ" demo.
// Pure data — no logic lives here.

export type NodeId =
  | "calls"
  | "leads"
  | "quotes"
  | "reviews"
  | "calendar"
  | "inbox"
  | "payroll"
  | "outreach";

/** Diagram nodes, clockwise from the top of the circle (45° apart). */
export const NODES: { id: NodeId; label: string }[] = [
  { id: "calls", label: "Calls" },
  { id: "leads", label: "Leads" },
  { id: "quotes", label: "Quotes" },
  { id: "reviews", label: "Reviews" },
  { id: "calendar", label: "Calendar" },
  { id: "inbox", label: "Inbox" },
  { id: "payroll", label: "Payroll" },
  { id: "outreach", label: "Outreach" },
];

export interface TaskItem {
  agent: string;
  detail: string;
  status: "running" | "queued";
}

/** Counts shown inside a node's activity badge: [queued, running, done]. */
export interface BadgeCounts {
  queued: number;
  running: number;
  done: number;
}

export interface Scenario {
  id: string;
  user: string;
  /** Reply, split so one human-in-the-loop sentence renders bold. */
  replyBefore: string;
  replyBold: string;
  replyAfter?: string;
  tasks: [TaskItem, TaskItem];
  /** Nodes whose activity badges light up when this scenario plays. */
  badges: Partial<Record<NodeId, BadgeCounts>>;
  /** Optional chip shown once the scenario's work has progressed. */
  approval?: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "calls",
    user: "I'm on jobs all day and calls keep going to voicemail.",
    replyBefore:
      "From now on I pick up when you can't. I answer, take the name and the job, and book them straight into your calendar. Anything urgent, I text you right away. ",
    replyBold: "You'll see every call summary the same evening.",
    tasks: [
      {
        agent: "Phone Agent",
        detail: "Answering after-hours call · Elena V., tooth pain",
        status: "running",
      },
      {
        agent: "Calendar Agent",
        detail: "Holding Thursday 9:00 AM for confirmation",
        status: "queued",
      },
    ],
    badges: {
      calls: { queued: 2, running: 1, done: 3 },
      calendar: { queued: 1, running: 1, done: 2 },
    },
  },
  {
    id: "quotes",
    user: "Can you chase the quotes I sent out last week?",
    replyBefore:
      "On it. Sam's patio quote has been quiet for 11 days, so I'm drafting a friendly nudge, and I'm flagging the two that look closest to a yes. ",
    replyBold: "Nothing sends until you approve the wording.",
    tasks: [
      {
        agent: "Quotes Agent",
        detail: "Drafting follow-up · Sam, patio quote",
        status: "running",
      },
      {
        agent: "Quotes Agent",
        detail: "Ranking open quotes by likelihood to close",
        status: "queued",
      },
    ],
    badges: {
      quotes: { queued: 2, running: 1, done: 4 },
      outreach: { queued: 1, running: 1, done: 2 },
    },
  },
  {
    id: "reviews",
    user: "We need more Google reviews. I always forget to ask.",
    replyBefore:
      "I'll handle the asking. After every finished job I send a short thank-you with a review link, timed for when customers are happiest. ",
    replyBold: "You approve the message once — I keep it running.",
    tasks: [
      {
        agent: "Reviews Agent",
        detail: "Sending review ask · yesterday's install",
        status: "running",
      },
      {
        agent: "Reviews Agent",
        detail: "Watching for replies that need you",
        status: "queued",
      },
    ],
    badges: {
      reviews: { queued: 1, running: 2, done: 5 },
      inbox: { queued: 2, running: 1, done: 3 },
    },
    approval: "Approved by you · review ask sent 4:05 PM",
  },
  {
    id: "inbox",
    user: "My inbox is a mess — invoices, spam, and bookings all mixed together.",
    replyBefore:
      "Sorting it now. Supplier invoices filed, spam gone, and the Saturday 7pm reservation is flagged at the top for you. ",
    replyBold: "Only the things that need you actually reach you.",
    tasks: [
      {
        agent: "Inbox Agent",
        detail: "Filing 4 supplier invoices + receipts",
        status: "running",
      },
      {
        agent: "Inbox Agent",
        detail: "Flagging Sat 7:00 PM reservation",
        status: "queued",
      },
    ],
    badges: {
      inbox: { queued: 3, running: 1, done: 4 },
      payroll: { queued: 1, running: 1, done: 2 },
    },
  },
];

/** Playback phases within a scenario, plus end-of-cycle phases. */
export type Phase =
  | "idle"
  | "typing"
  | "user"
  | "reply"
  | "tasks"
  | "progress"
  | "hold"
  | "fadeout";

export const TYPING_MS_PER_CHAR = 28;
/** Delay before typing begins + hold after the message finishes typing. */
export const TYPING_LEAD_MS = 350;
export const TYPING_TAIL_MS = 500;

export const PHASE_MS: Record<Exclude<Phase, "idle" | "typing">, number> = {
  user: 900,
  reply: 900,
  tasks: 2800,
  progress: 1600,
  hold: 2400,
  fadeout: 500,
};

export type TabId = "home" | "jobs" | "activity";

export const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "jobs", label: "Jobs" },
  { id: "activity", label: "Activity" },
];

/** Rows shown in the Activity tab. */
export const ACTIVITY: {
  text: string;
  meta: string;
  state: "done" | "awaiting";
}[] = [
  {
    text: "After-hours call answered · Elena V.",
    meta: "Booked Thu 9:00 AM · 7:42 PM",
    state: "done",
  },
  {
    text: "Review ask sent · yesterday's install",
    meta: "Approved by you · 4:05 PM",
    state: "done",
  },
  {
    text: "Quote follow-up drafted · Sam, patio",
    meta: "Awaiting your approval",
    state: "awaiting",
  },
  {
    text: "Inbox sorted · 4 filed, 1 flagged",
    meta: "Done before you were up · 6:12 AM",
    state: "done",
  },
  {
    text: "Payroll packet prepared",
    meta: "Sent to Gusto · 3:20 PM",
    state: "done",
  },
];

export const INPUT_PLACEHOLDER = "Ask your AI employee to pick up a new job…";
export const FRAME_CAPTION = "revauri/your-business";

/** Screen-reader summary for the currently playing scenario. */
export function scenarioAnnouncement(scenarioIndex: number): string {
  const s = SCENARIOS[scenarioIndex];
  if (!s) return "";
  return `Owner: ${s.user} AI employee: ${s.replyBefore}${s.replyBold}${s.replyAfter ?? ""}`;
}
