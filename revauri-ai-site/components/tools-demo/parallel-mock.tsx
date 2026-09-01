"use client";

import { useState } from "react";
import { Check, RotateCw } from "lucide-react";
import {
  LANE_QUEUES,
  OPS_LANES,
  STATUS_GROUPS,
  laneCounts,
  type JobStatus,
  type LaneId,
  type StatusGroup,
} from "./script";

function statusBadgeClass(status: StatusGroup): string {
  switch (status) {
    case "ready":
      return "bg-[#F3E0D4] text-[#C26A4A] dark:bg-brand-orange/15 dark:text-brand-orange";
    case "running":
      return "bg-[#D7E6F5] text-[#3B6FA0] dark:bg-sky-400/15 dark:text-sky-300";
    case "completed":
      return "bg-[#D8EBD8] text-[#3D7A4A] dark:bg-emerald-400/15 dark:text-emerald-300";
    case "blocked":
      return "bg-[#F4D4D2] text-[#C45C5C] dark:bg-red-400/15 dark:text-red-300";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function cardColumnClass(laneId: LaneId): string {
  switch (laneId) {
    case "phone":
      return "min-[767px]:col-start-1 min-[767px]:col-end-2";
    case "inbox":
      return "min-[767px]:col-start-2 min-[767px]:col-end-3";
    case "reviews":
      return "min-[767px]:col-start-3 min-[767px]:col-end-4";
    case "reminders":
      return "min-[767px]:col-start-4 min-[767px]:col-end-5";
    case "follow-ups":
      return "min-[767px]:col-start-5 min-[767px]:col-end-6";
    default: {
      const _exhaustive: never = laneId;
      return _exhaustive;
    }
  }
}

function cardAlignClass(laneId: LaneId): string {
  switch (laneId) {
    case "phone":
    case "inbox":
      return "min-[767px]:self-start";
    case "reviews":
    case "reminders":
      return "";
    case "follow-ups":
      return "min-[767px]:self-end";
    default: {
      const _exhaustive: never = laneId;
      return _exhaustive;
    }
  }
}

function StatusIcon({ status }: { status: JobStatus }) {
  switch (status) {
    case "ready":
    case "blocked":
      return (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-current"
        />
      );
    case "running":
      return <RotateCw className="h-3 w-3" aria-hidden strokeWidth={2.25} />;
    case "completed":
      return <Check className="h-3 w-3" aria-hidden strokeWidth={2.25} />;
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function ParallelMock() {
  const [laneId, setLaneId] = useState<LaneId>("phone");
  const jobs = LANE_QUEUES[laneId];

  return (
    <div className="grid h-full min-h-[400px] grid-cols-2 grid-rows-[1fr_auto] gap-x-2 px-3 pb-4 pt-6 min-[767px]:min-h-[440px] min-[767px]:grid-cols-5 min-[767px]:px-5 min-[767px]:pt-8">
      <div
        className={`col-span-2 row-start-1 flex flex-col items-center ${cardColumnClass(laneId)}`}
      >
        <div
          className={`relative z-10 w-full max-w-[260px] rounded-xl bg-white px-3 py-2.5 shadow-[0_8px_24px_-14px_rgba(20,20,19,0.35)] min-[767px]:w-[260px] min-[767px]:max-w-none dark:bg-[#242321] dark:shadow-[0_8px_24px_-14px_rgba(0,0,0,0.55)] ${cardAlignClass(laneId)}`}
        >
          {STATUS_GROUPS.map((group, groupIndex) => {
            const groupJobs = jobs.filter((job) => job.status === group.id);
            if (groupJobs.length === 0) return null;
            return (
              <div
                key={group.id}
                className={
                  groupIndex > 0
                    ? "mt-2 border-t border-dashed border-brand-orange pt-2"
                    : undefined
                }
              >
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[9px] font-medium ${statusBadgeClass(group.id)}`}
                >
                  <StatusIcon status={group.id} />
                  {group.label}
                </span>
                <ul className="mt-1.5 space-y-1">
                  {groupJobs.map((job) => (
                    <li
                      key={job.name}
                      className="flex items-baseline justify-between gap-2"
                    >
                      <p className="text-[12px] leading-snug font-medium text-brand-dark dark:text-brand-cream">
                        {job.name}
                      </p>
                      <span className="shrink-0 text-[8px] font-medium uppercase tracking-[0.12em] text-brand-dark/35 dark:text-brand-cream/35">
                        {job.tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div
          aria-hidden
          className="h-8 w-px flex-1 border-l border-dashed border-brand-orange"
        />
      </div>

      {OPS_LANES.map((lane) => {
        const selected = lane.id === laneId;
        const counts = laneCounts(lane);
        const showCounts = lane.enabled;
        return (
          <div
            key={lane.id}
            className="row-start-2 flex flex-col items-center justify-end pt-1"
          >
            {showCounts ? (
              <div
                aria-hidden
                className="mb-1.5 flex items-center gap-1 rounded-full bg-black/[0.05] px-1.5 py-0.5 dark:bg-white/[0.06]"
              >
                <span className="flex items-center gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C26A4A]" />
                  <span className="text-[8px] tabular-nums text-brand-dark/50 dark:text-brand-cream/50">
                    {counts.ready}
                  </span>
                </span>
                <span className="flex items-center gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B6FA0]" />
                  <span className="text-[8px] tabular-nums text-brand-dark/50 dark:text-brand-cream/50">
                    {counts.running}
                  </span>
                </span>
                <span className="flex items-center gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D7A4A]" />
                  <span className="text-[8px] tabular-nums text-brand-dark/50 dark:text-brand-cream/50">
                    {counts.completed}
                  </span>
                </span>
                {counts.blocked > 0 ? (
                  <span className="flex items-center gap-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C45C5C]" />
                    <span className="text-[8px] tabular-nums text-brand-dark/50 dark:text-brand-cream/50">
                      {counts.blocked}
                    </span>
                  </span>
                ) : null}
              </div>
            ) : (
              <div className="mb-1.5 h-[18px]" aria-hidden />
            )}
            <button
              type="button"
              aria-pressed={selected}
              aria-disabled={!lane.enabled}
              tabIndex={lane.enabled ? undefined : -1}
              onClick={() => {
                if (!lane.enabled) return;
                setLaneId(lane.id);
              }}
              className={`min-h-9 w-full max-w-[108px] rounded-full border px-2 py-1.5 text-[12px] font-medium transition-colors ${
                !lane.enabled
                  ? "cursor-default border-black/[0.06] bg-white/50 text-brand-dark/30 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-brand-cream/25"
                  : selected
                    ? "border-brand-orange/40 bg-white text-brand-dark shadow-[0_4px_12px_-8px_rgba(20,20,19,0.4)] dark:border-brand-orange/40 dark:bg-[#2a2926] dark:text-brand-cream"
                    : "border-black/[0.08] bg-white text-brand-dark/70 hover:border-black/15 dark:border-white/[0.1] dark:bg-[#2a2926] dark:text-brand-cream/70"
              }`}
            >
              {lane.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}
