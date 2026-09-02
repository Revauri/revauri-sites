export type ToolsTabId = "approve" | "parallel" | "scoped";

export interface ToolsTab {
  id: ToolsTabId;
  label: string;
}

export const TOOLS_INTRO = {
  h2Line1: "The tools the hire needs.",
  h2Line2: "Approvals, parallel jobs, your rules.",
  body: "Agents get context, tools, and a stop line. Nothing that matters ships without you.",
} as const;

export const TOOLS_TABS: ToolsTab[] = [
  {
    id: "approve",
    label: "You stay in control — nothing sends without your approval",
  },
  {
    id: "parallel",
    label: "It runs several jobs at the same time",
  },
  {
    id: "scoped",
    label: "Built around how you already work",
  },
];

export type ApproveTabId = "catch" | "follow-up" | "review" | "queue";

export const APPROVE_TABS: readonly {
  id: ApproveTabId;
  label: string;
}[] = [
  { id: "catch", label: "After-hours catch" },
  { id: "follow-up", label: "Quiet-lead follow-up" },
  { id: "review", label: "Review ask" },
  { id: "queue", label: "This week’s jobs" },
];

export const APPROVE_DRAFTS = [
  {
    to: "Elena V.",
    toEmail: "elena@example.com",
    from: "Your shop",
    fromNote: "in your voice",
    subject: "Following up on Thursday",
    greeting: "Hi Elena,",
    body: "Holding Thursday 9:00 AM as we discussed. Reply if you need a different time. We’ll confirm the visit, not a price, on the call.",
  },
  {
    to: "Maya Chen",
    toEmail: "maya@example.com",
    from: "Your shop",
    fromNote: "in your voice",
    subject: "Checking in on your quote",
    greeting: "Hi Maya,",
    body: "Just circling back on the estimate we sent last week. Happy to answer questions or hold a time that already works on the calendar.",
    closing: "Whenever you’re ready — no pressure.",
  },
  {
    to: "Elena V.",
    toEmail: "elena@example.com",
    from: "Your shop",
    fromNote: "in your voice",
    subject: "How did Thursday go?",
    greeting: "Hi Elena,",
    body: "Hope the visit went smoothly. If you have a minute, a short review helps the next person find us — only if you’re happy to.",
  },
] as const;

export const APPROVE_QUEUE_LABEL = "Follow-up queue";

export const APPROVE_WEEK_JOBS = [
  { name: "After-hours catch — Elena V.", tag: "CATCH", state: "Ready" },
  { name: "Quiet-lead follow-up — Maya Chen", tag: "FOLLOW UP", state: "Ready" },
  { name: "Review ask — Elena V.", tag: "FRONT DESK", state: "Ready" },
  { name: "Thursday hold reminder", tag: "CATCH", state: "Waiting" },
] as const;

export type LaneId = "phone" | "follow-ups" | "reviews" | "reminders" | "inbox";
export type LaneTag = "CATCH" | "FOLLOW UP" | "FRONT DESK";
export type JobStatus = "ready" | "running" | "completed" | "blocked";

export interface OpsLane {
  id: LaneId;
  label: string;
  enabled: boolean;
}

export interface LaneJob {
  name: string;
  tag: LaneTag;
  status: JobStatus;
}

export const OPS_LANES: readonly OpsLane[] = [
  { id: "phone", label: "Phone", enabled: true },
  { id: "inbox", label: "Inbox", enabled: false },
  { id: "reviews", label: "Reviews", enabled: true },
  { id: "reminders", label: "Reminders", enabled: true },
  { id: "follow-ups", label: "Follow-ups", enabled: false },
];

export const LANE_QUEUES: Record<LaneId, readonly LaneJob[]> = {
  phone: [
    { name: "After-hours call — Elena V.", tag: "CATCH", status: "ready" },
    { name: "Overflow hold", tag: "CATCH", status: "running" },
    { name: "Missed call logged", tag: "CATCH", status: "completed" },
  ],
  inbox: [],
  reviews: [
    { name: "Review ask — Elena V.", tag: "FRONT DESK", status: "ready" },
    { name: "After-the-job check-in", tag: "FRONT DESK", status: "running" },
    { name: "Review asked — Mike R.", tag: "FRONT DESK", status: "completed" },
    { name: "Review asked — Dan T.", tag: "FRONT DESK", status: "completed" },
  ],
  reminders: [
    { name: "Thursday 9:00 AM hold", tag: "CATCH", status: "ready" },
    { name: "No-show reminder", tag: "FRONT DESK", status: "running" },
    { name: "Appointment reminder sent", tag: "FRONT DESK", status: "completed" },
    { name: "Hold needs your call", tag: "CATCH", status: "blocked" },
  ],
  "follow-ups": [],
};

export type StatusGroup = "ready" | "running" | "completed" | "blocked";

export const STATUS_GROUPS: readonly {
  id: StatusGroup;
  label: string;
}[] = [
  { id: "ready", label: "Ready to review" },
  { id: "running", label: "Running" },
  { id: "completed", label: "Completed" },
  { id: "blocked", label: "Blocked" },
];

export function laneCounts(lane: OpsLane) {
  const jobs = LANE_QUEUES[lane.id];
  return {
    ready: jobs.filter((job) => job.status === "ready").length,
    running: jobs.filter((job) => job.status === "running").length,
    completed: jobs.filter((job) => job.status === "completed").length,
    blocked: jobs.filter((job) => job.status === "blocked").length,
  };
}

export type ScopedHighlight = "trigger" | "jobs" | "icons";

export const SCOPED_SETUP = {
  title: "Customize hire setup",
  nameLabel: "Name",
  name: "Agent",
  voiceLabel: "Voice",
  voice: "Your shop",
  rulesLabel: "Rules",
  rules: "After-hours catch. No prices. Licensed work stays with the shop.",
  triggerLabel: "Add trigger",
  hireName: "Agent",
  hireRole: "The hire",
  addJobLabel: "Add job",
  jobs: [
    { name: "Catch", role: "Job" },
    { name: "Follow up", role: "Job" },
    { name: "Running", role: "Job" },
  ],
} as const;

export const SCOPED_TRIGGER = {
  title: "Add trigger",
  scheduleLabel: "On a schedule",
  eventLabel: "On an event",
  everyLabel: "Every",
  everyValue: "Night",
  atLabel: "At",
  atValue: "After hours",
  endingLabel: "Ending",
  endingValue: "Never",
  eventWhenLabel: "When",
  eventWhenValue: "Missed call",
  eventSourceLabel: "Source",
  eventSourceValue: "Phone",
} as const;

export const SCOPED_JOB_FORM = {
  title: "Add job",
  outcomeLabel: "Outcome",
  outcome: "Hold a callback",
  channelLabel: "Channel",
  channel: "Phone + text",
  approvalLabel: "Approval",
  approval: "Required to send",
} as const;
