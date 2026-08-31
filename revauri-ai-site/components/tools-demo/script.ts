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

export const PARALLEL_JOBS = [
  { name: "Review ask", status: "Completed" as const },
  { name: "Quiet-lead follow-up", status: "Running" as const },
  { name: "Reminder", status: "Ready to review" as const },
];

export const SCOPED_HIRE = {
  title: "Hire for this business",
  rows: [
    { label: "Business type", value: "Local HVAC" },
    { label: "Hours", value: "8–5, after-hours catch" },
    { label: "What it may book", value: "Callbacks you already approved" },
    { label: "What it must hand back", value: "Prices, anything licensed" },
  ],
} as const;
