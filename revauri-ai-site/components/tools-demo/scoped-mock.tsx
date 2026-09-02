"use client";

import { useState } from "react";
import {
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Star,
} from "lucide-react";
import {
  SCOPED_JOB_FORM,
  SCOPED_SETUP,
  SCOPED_TRIGGER,
  type ScopedHighlight,
} from "./script";
import { Tracer } from "./tracer";

type TriggerMode = "schedule" | "event";
type SidebarPanel = "setup" | "trigger" | "jobs";

function NodeGlyph({
  variant,
  accent = false,
}: {
  variant: "grid" | "cross" | "tri" | "plus";
  accent?: boolean;
}) {
  const cells =
    variant === "grid"
      ? [0, 1, 2, 3, 4, 5, 6, 7, 8]
      : variant === "cross"
        ? [1, 3, 4, 5, 7]
        : variant === "tri"
          ? [1, 3, 5]
          : [0, 2, 4, 6, 8];

  return (
    <span
      aria-hidden
      className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-black/[0.035] shadow-[inset_0_0_0_1px_rgba(20,20,19,0.05)] dark:bg-white/[0.04] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
    >
      <span className="grid size-[15px] grid-cols-3 grid-rows-3 place-items-center">
        {Array.from({ length: 9 }, (_, index) => (
          <span
            key={index}
            className={`h-[2.5px] w-[2.5px] rounded-full ${
              cells.includes(index)
                ? accent
                  ? "bg-brand-orange"
                  : "bg-brand-dark/55 dark:bg-brand-cream/60"
                : accent
                  ? "bg-brand-orange/20"
                  : "bg-brand-dark/12 dark:bg-brand-cream/15"
            }`}
          />
        ))}
      </span>
    </span>
  );
}

function highlightRing(active: boolean): string {
  return active
    ? "ring-2 ring-brand-orange/45 ring-offset-2 ring-offset-[#FBFAF6] dark:ring-offset-[#1C1B19]"
    : "";
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative h-4 w-7 shrink-0 rounded-full shadow-[inset_0_1px_1px_rgba(20,20,19,0.08)] transition-colors ${
        on ? "bg-brand-orange" : "bg-black/12 dark:bg-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-[0_1px_2px_rgba(20,20,19,0.25)] transition-[left] ${
          on ? "left-3.5" : "left-0.5"
        }`}
      />
    </span>
  );
}

function SidebarTitle({ children }: { children: string }) {
  return (
    <h3 className="text-[12px] leading-tight font-medium tracking-[0.01em] text-brand-dark/80 dark:text-brand-cream/80">
      {children}
    </h3>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] leading-none font-medium text-brand-dark/55 dark:text-brand-cream/55">
        {label}
      </span>
      <span className="rounded-[7px] bg-white px-2.5 py-1.5 text-[12px] leading-snug font-medium text-brand-dark/85 shadow-[inset_0_0_0_1px_rgba(20,20,19,0.09)] dark:bg-white/[0.04] dark:text-brand-cream/85 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]">
        {value}
      </span>
    </div>
  );
}

function SetupSidebar() {
  return (
    <>
      <SidebarTitle>{SCOPED_SETUP.title}</SidebarTitle>
      <div className="mt-4 space-y-3.5">
        <Field label={SCOPED_SETUP.nameLabel} value={SCOPED_SETUP.name} />
        <Field label={SCOPED_SETUP.voiceLabel} value={SCOPED_SETUP.voice} />
        <Field label={SCOPED_SETUP.rulesLabel} value={SCOPED_SETUP.rules} />
      </div>
    </>
  );
}

function TriggerSidebar({
  mode,
  onMode,
}: {
  mode: TriggerMode;
  onMode: (mode: TriggerMode) => void;
}) {
  return (
    <>
      <SidebarTitle>{SCOPED_TRIGGER.title}</SidebarTitle>
      <div className="mt-4 space-y-3.5">
        <button
          type="button"
          onClick={() => onMode("schedule")}
          className="w-full rounded-[7px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60"
        >
          <span className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-brand-dark/85 dark:text-brand-cream/85">
              {SCOPED_TRIGGER.scheduleLabel}
            </span>
            <Toggle on={mode === "schedule"} />
          </span>
          {mode === "schedule" ? (
            <div className="mt-3 space-y-3">
              <Field
                label={SCOPED_TRIGGER.everyLabel}
                value={SCOPED_TRIGGER.everyValue}
              />
              <Field
                label={SCOPED_TRIGGER.atLabel}
                value={SCOPED_TRIGGER.atValue}
              />
              <Field
                label={SCOPED_TRIGGER.endingLabel}
                value={SCOPED_TRIGGER.endingValue}
              />
            </div>
          ) : null}
        </button>
        <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />
        <button
          type="button"
          onClick={() => onMode("event")}
          className="w-full rounded-[7px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60"
        >
          <span className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-brand-dark/85 dark:text-brand-cream/85">
              {SCOPED_TRIGGER.eventLabel}
            </span>
            <Toggle on={mode === "event"} />
          </span>
          {mode === "event" ? (
            <div className="mt-3 space-y-3">
              <Field
                label={SCOPED_TRIGGER.eventWhenLabel}
                value={SCOPED_TRIGGER.eventWhenValue}
              />
              <Field
                label={SCOPED_TRIGGER.eventSourceLabel}
                value={SCOPED_TRIGGER.eventSourceValue}
              />
            </div>
          ) : null}
        </button>
      </div>
    </>
  );
}

function JobSidebar() {
  return (
    <>
      <SidebarTitle>{SCOPED_JOB_FORM.title}</SidebarTitle>
      <div className="mt-4 space-y-3.5">
        <Field
          label={SCOPED_JOB_FORM.outcomeLabel}
          value={SCOPED_JOB_FORM.outcome}
        />
        <Field
          label={SCOPED_JOB_FORM.channelLabel}
          value={SCOPED_JOB_FORM.channel}
        />
        <Field
          label={SCOPED_JOB_FORM.approvalLabel}
          value={SCOPED_JOB_FORM.approval}
        />
      </div>
    </>
  );
}

function Sidebar({
  panel,
  triggerMode,
  onTriggerMode,
}: {
  panel: SidebarPanel;
  triggerMode: TriggerMode;
  onTriggerMode: (mode: TriggerMode) => void;
}) {
  switch (panel) {
    case "setup":
      return <SetupSidebar />;
    case "trigger":
      return <TriggerSidebar mode={triggerMode} onMode={onTriggerMode} />;
    case "jobs":
      return <JobSidebar />;
    default: {
      const _exhaustive: never = panel;
      return _exhaustive;
    }
  }
}

function sidebarPanel(highlight: ScopedHighlight | null): SidebarPanel {
  switch (highlight) {
    case "trigger":
      return "trigger";
    case "jobs":
      return "jobs";
    case "icons":
    case null:
      return "setup";
    default: {
      const _exhaustive: never = highlight;
      return _exhaustive;
    }
  }
}

export function ScopedMock() {
  const [highlight, setHighlight] = useState<ScopedHighlight | null>(null);
  const [triggerMode, setTriggerMode] = useState<TriggerMode>("schedule");

  function toggle(region: ScopedHighlight) {
    setHighlight((current) => (current === region ? null : region));
  }

  return (
    <div className="grid h-full min-h-[400px] grid-cols-1 min-[767px]:min-h-0 min-[767px]:grid-cols-[236px_1fr]">
      <div className="p-1.5 min-[767px]:pr-0">
        <div className="demo-card h-full rounded-[10px] p-3">
          <Sidebar
            panel={sidebarPanel(highlight)}
            triggerMode={triggerMode}
            onTriggerMode={setTriggerMode}
          />
        </div>
      </div>

      <div className="relative flex min-w-0 flex-col items-center px-3 py-5 min-[767px]:px-6 min-[767px]:py-6">
        <button
          type="button"
          onClick={() => toggle("trigger")}
          className={`rounded-[7px] bg-brand-dark px-2.5 py-1 text-[11px] leading-snug font-medium text-brand-cream shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_1px_2px_0_rgba(20,20,19,0.25)] transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 dark:bg-brand-cream dark:text-brand-dark dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.4)] ${highlightRing(highlight === "trigger")}`}
        >
          {SCOPED_SETUP.triggerLabel}
        </button>
        <Tracer direction="vertical" className="my-1 h-4" />
        <button
          type="button"
          onClick={() => toggle("trigger")}
          className={`demo-plus flex size-[18px] items-center justify-center rounded-[4px] transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 ${highlightRing(highlight === "trigger")}`}
          aria-label={SCOPED_SETUP.triggerLabel}
        >
          <Plus className="h-3 w-3" aria-hidden strokeWidth={2.75} />
        </button>
        <Tracer direction="vertical" className="my-1 h-5" endNode />

        <div className="demo-card flex items-center gap-2.5 rounded-[10px] py-2 pr-3.5 pl-2">
          <NodeGlyph variant="grid" accent />
          <div>
            <p className="text-[12px] leading-tight font-medium text-brand-dark/85 dark:text-brand-cream/85">
              {SCOPED_SETUP.hireName}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-brand-dark/45 dark:text-brand-cream/45">
              {SCOPED_SETUP.hireRole}
            </p>
          </div>
        </div>

        <Tracer direction="vertical" className="my-1 h-5" startNode />
        <button
          type="button"
          onClick={() => toggle("jobs")}
          className={`rounded-[7px] bg-brand-dark px-2.5 py-1 text-[11px] leading-snug font-medium text-brand-cream shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_1px_2px_0_rgba(20,20,19,0.25)] transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 dark:bg-brand-cream dark:text-brand-dark dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.4)] ${highlightRing(highlight === "jobs")}`}
        >
          {SCOPED_SETUP.addJobLabel}
        </button>
        <Tracer direction="vertical" className="my-1 h-4" />
        <button
          type="button"
          onClick={() => toggle("jobs")}
          className={`demo-plus flex size-[18px] items-center justify-center rounded-[4px] transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 ${highlightRing(highlight === "jobs")}`}
          aria-label={SCOPED_SETUP.addJobLabel}
        >
          <Plus className="h-3 w-3" aria-hidden strokeWidth={2.75} />
        </button>
        <Tracer direction="vertical" className="my-1 h-4" />

        <div className="relative flex w-full max-w-[420px] items-start justify-center gap-2 pt-1 min-[767px]:gap-3">
          <span
            aria-hidden
            className="absolute top-0 right-[16%] left-[16%] flex -translate-y-1/2"
          >
            <Tracer direction="horizontal" />
          </span>
          {SCOPED_SETUP.jobs.map((job, index) => {
            const variant =
              index === 0 ? "cross" : index === 1 ? "tri" : "plus";
            return (
              <div
                key={job.name}
                className="flex min-w-0 flex-1 flex-col items-center"
              >
                <Tracer direction="vertical" className="mb-1 h-3" endNode />
                <div className="demo-card flex h-11 w-full items-center gap-2 rounded-[10px] pr-2.5 pl-2">
                  <NodeGlyph variant={variant} />
                  <div className="min-w-0">
                    <p className="truncate text-[12px] leading-tight font-medium text-brand-dark/85 dark:text-brand-cream/85">
                      {job.name}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-brand-dark/45 dark:text-brand-cream/45">
                      {job.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex items-center justify-center pt-5">
          <button
            type="button"
            onClick={() => toggle("icons")}
            className={`flex items-center gap-2 rounded-[7px] py-1 pr-2 pl-2 transition-[background-color,box-shadow] duration-150 hover:bg-white/80 hover:shadow-[inset_0_0_0.5px_1.5px_rgba(255,255,255,0.35),inset_0_2px_0_0_#fff,0_0_2px_0_rgba(20,20,19,0.2),0_0_0_4px_rgba(232,230,220,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ${highlightRing(highlight === "icons")}`}
            aria-label="Connected tools"
          >
            <Phone className="h-3.5 w-3.5 text-brand-orange" aria-hidden />
            <Mail className="h-3.5 w-3.5 text-brand-orange" aria-hidden />
            <Calendar className="h-3.5 w-3.5 text-brand-orange" aria-hidden />
            <MessageCircle
              className="h-3.5 w-3.5 text-brand-orange"
              aria-hidden
            />
            <Star className="h-3.5 w-3.5 text-brand-orange" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
