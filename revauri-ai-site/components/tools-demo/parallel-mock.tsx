"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  Mail,
  MessageCircle,
  Phone,
  RotateCw,
  Star,
  type LucideIcon,
} from "lucide-react";
import {
  LANE_QUEUES,
  OPS_LANES,
  STATUS_GROUPS,
  laneCounts,
  type JobStatus,
  type LaneId,
  type StatusGroup,
} from "./script";
import { Tracer } from "./tracer";

function laneIcon(laneId: LaneId): LucideIcon {
  switch (laneId) {
    case "phone":
      return Phone;
    case "inbox":
      return Mail;
    case "reviews":
      return Star;
    case "reminders":
      return Calendar;
    case "follow-ups":
      return MessageCircle;
    default: {
      const _exhaustive: never = laneId;
      return _exhaustive;
    }
  }
}

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
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
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

function CountsPill({
  counts,
  className = "",
}: {
  counts: ReturnType<typeof laneCounts>;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center gap-1.5 rounded-[6px] bg-white/70 px-1.5 py-[3px] shadow-[0_0_0_1px_rgba(20,20,19,0.06)] dark:bg-white/[0.05] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07)] ${className}`}
    >
      <span className="flex items-center gap-[3px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C26A4A]" />
        <span className="text-[9px] leading-none font-medium tabular-nums text-brand-dark/55 dark:text-brand-cream/55">
          {counts.ready}
        </span>
      </span>
      <span className="flex items-center gap-[3px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3B6FA0]" />
        <span className="text-[9px] leading-none font-medium tabular-nums text-brand-dark/55 dark:text-brand-cream/55">
          {counts.running}
        </span>
      </span>
      <span className="flex items-center gap-[3px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3D7A4A]" />
        <span className="text-[9px] leading-none font-medium tabular-nums text-brand-dark/55 dark:text-brand-cream/55">
          {counts.completed}
        </span>
      </span>
      {counts.blocked > 0 ? (
        <span className="flex items-center gap-[3px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C45C5C]" />
          <span className="text-[9px] leading-none font-medium tabular-nums text-brand-dark/55 dark:text-brand-cream/55">
            {counts.blocked}
          </span>
        </span>
      ) : null}
    </div>
  );
}

export function ParallelMock() {
  const [laneId, setLaneId] = useState<LaneId>("phone");
  const jobs = LANE_QUEUES[laneId];
  const activeLane =
    OPS_LANES.find((lane) => lane.id === laneId) ?? OPS_LANES[0];
  const ActiveIcon = laneIcon(laneId);

  return (
    <div className="flex h-full min-h-[400px] flex-col px-3 pb-4 pt-4 min-[767px]:grid min-[767px]:min-h-0 min-[767px]:grid-cols-5 min-[767px]:grid-rows-[1fr_auto] min-[767px]:gap-x-2 min-[767px]:px-5 min-[767px]:pt-5">
      <div
        className={`flex flex-1 flex-col items-center min-[767px]:row-start-1 ${cardColumnClass(laneId)}`}
      >
        <div
          className={`demo-card relative z-10 w-full rounded-[12px] px-3.5 py-3 min-[767px]:w-[260px] ${cardAlignClass(laneId)}`}
        >
          <div className="-mx-3.5 -mt-3 mb-3 flex items-center gap-2 border-b border-black/[0.06] px-3.5 py-2.5 dark:border-white/[0.06] min-[767px]:hidden">
            <span
              aria-hidden
              className="flex size-5 items-center justify-center rounded-[5px] bg-brand-orange/12 text-brand-orange dark:bg-brand-orange/18"
            >
              <ActiveIcon className="h-3 w-3" strokeWidth={2} />
            </span>
            <p className="flex-1 text-[12px] font-medium text-brand-dark/85 dark:text-brand-cream/85">
              {activeLane.label}
            </p>
            <CountsPill counts={laneCounts(activeLane)} />
          </div>
          {STATUS_GROUPS.map((group, groupIndex) => {
            const groupJobs = jobs.filter((job) => job.status === group.id);
            if (groupJobs.length === 0) return null;
            return (
              <div
                key={group.id}
                className={
                  groupIndex > 0
                    ? "mt-2.5 border-t border-dashed border-black/[0.12] pt-2.5 dark:border-white/[0.12]"
                    : undefined
                }
              >
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-[3px] font-mono text-[9.5px] leading-none font-medium tracking-[-0.01em] ${statusBadgeClass(group.id)}`}
                >
                  <StatusIcon status={group.id} />
                  {group.label}
                </span>
                <ul className="mt-2 space-y-1.5">
                  {groupJobs.map((job) => (
                    <li
                      key={job.name}
                      className="flex items-baseline justify-between gap-2"
                    >
                      <p className="text-[12px] leading-snug font-medium text-brand-dark/85 dark:text-brand-cream/85">
                        {job.name}
                      </p>
                      <span className="shrink-0 text-[8px] font-medium tracking-[0.12em] text-brand-dark/35 uppercase dark:text-brand-cream/35">
                        {job.tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <Tracer
          direction="vertical"
          className="mt-1 min-h-8 flex-1"
          startNode
          endNode
        />
      </div>

      <div className="relative mt-1 flex w-full items-start gap-1 pt-1 min-[767px]:contents">
        <span
          aria-hidden
          className="absolute top-0 right-[10%] left-[10%] flex -translate-y-1/2 min-[767px]:hidden"
        >
          <Tracer direction="horizontal" />
        </span>
        {OPS_LANES.map((lane) => {
          const selected = lane.id === laneId;
          const showCounts = lane.enabled;
          const Icon = laneIcon(lane.id);
          return (
            <div
              key={lane.id}
              className="flex min-w-0 flex-1 flex-col items-center justify-end pt-1 min-[767px]:row-start-2"
            >
              <Tracer
                direction="vertical"
                className="mb-1 h-3 min-[767px]:hidden"
                endNode
              />
              {showCounts ? (
                <CountsPill
                  counts={laneCounts(lane)}
                  className="mb-2 hidden min-[767px]:flex"
                />
              ) : (
                <div
                  className="mb-2 hidden h-[18px] min-[767px]:block"
                  aria-hidden
                />
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
                className={`flex min-h-9 w-full flex-col items-center gap-1.5 rounded-[10px] px-0 py-2 text-[12px] font-medium transition-[background-color,box-shadow,color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 min-[767px]:block min-[767px]:max-w-[108px] min-[767px]:px-2 min-[767px]:py-1.5 ${
                  !lane.enabled
                    ? "cursor-default bg-white/40 text-brand-dark/30 shadow-[0_0_0_1px_rgba(20,20,19,0.05)] dark:bg-white/[0.02] dark:text-brand-cream/25 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
                    : selected
                      ? "bg-white text-brand-dark shadow-[inset_0_0_0_1px_#fff,0_0_0_1px_rgba(20,20,19,0.14),0_2px_3px_0_rgba(20,20,19,0.06),0_8px_16px_-8px_rgba(20,20,19,0.18)] dark:bg-[#33322e] dark:text-brand-cream dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),0_0_0_1px_rgba(255,255,255,0.14),0_8px_16px_-8px_rgba(0,0,0,0.6)]"
                      : "bg-white/85 text-brand-dark/65 shadow-[inset_0_0_0_1px_#fff,0_0_0_1px_rgba(20,20,19,0.08),0_1px_2px_0_rgba(20,20,19,0.04)] hover:bg-white hover:text-brand-dark/85 hover:shadow-[inset_0_0_0_1px_#fff,0_0_0_1px_rgba(20,20,19,0.12),0_2px_3px_0_rgba(20,20,19,0.06)] dark:bg-white/[0.05] dark:text-brand-cream/65 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_0_0_1px_rgba(255,255,255,0.08)] dark:hover:bg-white/[0.08] dark:hover:text-brand-cream/85"
                }`}
              >
                <Icon
                  className="h-4 w-4 min-[767px]:hidden"
                  strokeWidth={1.9}
                  aria-hidden
                />
                <span className="block max-w-full truncate text-[9.5px] tracking-[-0.02em] min-[767px]:text-[12px] min-[767px]:tracking-normal">
                  {lane.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
