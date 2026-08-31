"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, ChevronDown, Folder, Search } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  CYCLE_RESET_MS,
  FRAME_CAPTION,
  INPUT_PLACEHOLDER,
  NODES,
  SCENARIOS,
  STEPS_PER_SCENARIO,
  TAB_LABELS,
  TOTAL_STEPS,
  scenarioAnnouncement,
  stepStartMs,
  type BadgeCounts,
  type NodeId,
  type TaskItem,
} from "./script";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Spinner({ size = 8 }: { size?: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 10 10"
      className="block shrink-0"
    >
      <circle
        cx="5"
        cy="5"
        r="3.5"
        fill="none"
        stroke="#D97757"
        strokeLinecap="round"
        strokeWidth="1.6"
        strokeDasharray="12 10"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 5 5"
          to="360 5 5"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/** Small pixel-grid glyph marking assistant replies (mirrors the site mark's spirit). */
function AssistantGlyph() {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className="mt-[3px] shrink-0"
    >
      <rect x="3" y="3" width="2" height="2" className="fill-brand-dark/60 dark:fill-brand-cream/60" />
      <rect x="7" y="3" width="2" height="2" className="fill-brand-dark/60 dark:fill-brand-cream/60" />
      <rect x="2" y="7" width="2" height="2" className="fill-brand-dark/60 dark:fill-brand-cream/60" />
      <rect x="8" y="7" width="2" height="2" className="fill-brand-dark/60 dark:fill-brand-cream/60" />
      <rect x="5" y="7" width="2" height="2" className="fill-brand-orange" />
    </svg>
  );
}

const HAIRLINE_CARD_SHADOW =
  "shadow-[0_0_0_0.8px_#FFF_inset,0_0_0_0.8px_rgba(20,20,19,0.08),0_4px_12px_rgba(20,20,19,0.06)] dark:shadow-[0_0_0_0.8px_rgba(255,255,255,0.07)_inset,0_0_0_0.8px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.4)]";

/* ------------------------------------------------------------------ */
/* Orbital diagram                                                     */
/* ------------------------------------------------------------------ */

const CX = 260;
const CY = 260;
const RING_R = 204;

function nodePoint(index: number, radius: number): { x: number; y: number } {
  const rad = ((index * 45 - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

/**
 * Ghost sub-trees continuing outward past each node, one entry per node
 * (clockwise from top). All connectors are orthogonal, org-chart style:
 * lines are [x1, y1, x2, y2], dots mark junctions, cards are ghost centers.
 */
const GHOSTS: {
  lines: [number, number, number, number][];
  dots: [number, number][];
  cards: [number, number][];
}[] = [
  {
    // Calls (top): stub up, T-bar, two children above
    lines: [
      [260, 36, 260, 24],
      [190, 24, 330, 24],
      [190, 24, 190, 14],
      [330, 24, 330, 14],
    ],
    dots: [
      [190, 24],
      [330, 24],
    ],
    cards: [
      [190, -4],
      [330, -4],
    ],
  },
  {
    // Leads (NE): out right, elbow up
    lines: [
      [444, 116, 466, 116],
      [466, 116, 466, 104],
    ],
    dots: [[466, 116]],
    cards: [[466, 85]],
  },
  {
    // Quotes (right): out right, elbow down
    lines: [
      [504, 260, 526, 260],
      [526, 260, 526, 272],
    ],
    dots: [[526, 260]],
    cards: [[526, 291]],
  },
  {
    // Reviews (SE): out right, elbow down
    lines: [
      [444, 404, 466, 404],
      [466, 404, 466, 416],
    ],
    dots: [[466, 404]],
    cards: [[466, 435]],
  },
  {
    // Calendar (bottom): stub down, T-bar, two children below
    lines: [
      [260, 484, 260, 496],
      [190, 496, 330, 496],
      [190, 496, 190, 506],
      [330, 496, 330, 506],
    ],
    dots: [
      [190, 496],
      [330, 496],
    ],
    cards: [
      [190, 523],
      [330, 523],
    ],
  },
  {
    // Inbox (SW): out left, elbow down
    lines: [
      [76, 404, 54, 404],
      [54, 404, 54, 416],
    ],
    dots: [[54, 404]],
    cards: [[54, 435]],
  },
  {
    // Payroll (left): out left, elbow down
    lines: [
      [16, 260, -6, 260],
      [-6, 260, -6, 272],
    ],
    dots: [[-6, 260]],
    cards: [[-6, 291]],
  },
  {
    // Outreach (NW): out left, elbow up
    lines: [
      [76, 116, 54, 116],
      [54, 116, 54, 104],
    ],
    dots: [[54, 116]],
    cards: [[54, 85]],
  },
];

function GhostCard({ x, y }: { x: number; y: number }) {
  return (
    <rect
      x={x - 26}
      y={y - 17}
      width="52"
      height="34"
      rx="6"
      className="fill-white stroke-brand-dark/10 opacity-30 dark:fill-white/[0.06] dark:stroke-white/10"
      strokeWidth="0.8"
    />
  );
}

function EndpointDot({ x, y }: { x: number; y: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r="2.5"
      strokeWidth="0.5"
      className="fill-brand-cream stroke-brand-dark/15 dark:fill-brand-dark dark:stroke-brand-cream/20"
    />
  );
}

function NodeBadge({ counts }: { counts: BadgeCounts }) {
  return (
    <div className="ai-hq-badge-in inline-flex items-center gap-[6px] rounded-[5px] bg-brand-cream/95 px-2 py-1 shadow-[0_0_0_0.6px_#FFF_inset,0_0_0_0.9px_rgba(20,20,19,0.08)] dark:bg-[#1C1B19]/95 dark:shadow-[0_0_0_0.6px_rgba(255,255,255,0.08)_inset,0_0_0_0.9px_rgba(0,0,0,0.5)]">
      <span className="inline-flex items-center gap-1">
        <span
          aria-hidden
          className="ai-hq-badge-blink h-[5px] w-[5px] shrink-0 rounded-full bg-[#EEC75D]"
        />
        <span className="text-[8px] leading-none tabular-nums text-brand-dark/80 dark:text-brand-cream/80">
          {counts.queued}
        </span>
      </span>
      <span className="inline-flex items-center gap-1">
        <Spinner size={7} />
        <span className="text-[8px] leading-none tabular-nums text-brand-dark/80 dark:text-brand-cream/80">
          {counts.running}
        </span>
      </span>
      <span className="inline-flex items-center gap-1">
        <span aria-hidden className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#71CE45]" />
        <span className="text-[8px] leading-none tabular-nums text-brand-dark/80 dark:text-brand-cream/80">
          {counts.done}
        </span>
      </span>
    </div>
  );
}

function OrbitalDiagram({
  litBadges,
  reducedMotion,
}: {
  litBadges: Partial<Record<NodeId, BadgeCounts>>;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      <svg
        viewBox="0 0 520 520"
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <circle
          cx={CX}
          cy={CY}
          r={RING_R}
          strokeWidth="1"
          className="stroke-brand-dark/10 dark:stroke-brand-cream/10"
        />

        {/* Spokes from center card to each node, with endpoint dots */}
        {NODES.map((node, i) => {
          const p1 = nodePoint(i, 44);
          const p2 = nodePoint(i, 183);
          return (
            <g key={`spoke-${node.id}`}>
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeDasharray="4.5 4.5"
                className="stroke-brand-dark/10 dark:stroke-brand-cream/10"
              />
              <EndpointDot x={p1.x} y={p1.y} />
              <EndpointDot x={p2.x} y={p2.y} />
            </g>
          );
        })}

        {/* Ghost sub-trees continuing outward past each node (orthogonal) */}
        {NODES.map((node, i) => {
          const ghost = GHOSTS[i];
          return (
            <g key={`ghost-${node.id}`}>
              {ghost.lines.map(([x1, y1, x2, y2], li) => (
                <line
                  key={li}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  className="stroke-brand-dark/[0.08] dark:stroke-brand-cream/[0.08]"
                />
              ))}
              {ghost.dots.map(([x, y], di) => (
                <g key={di} opacity="0.5">
                  <EndpointDot x={x} y={y} />
                </g>
              ))}
              {ghost.cards.map(([x, y], ci) => (
                <GhostCard key={ci} x={x} y={y} />
              ))}
            </g>
          );
        })}

        {/* Subtle orange pulses traveling from the center toward each job */}
        {!reducedMotion
          ? NODES.map((node, i) => {
              const p1 = nodePoint(i, 48);
              const p2 = nodePoint(i, 180);
              const dur = "3.6s";
              const begin = `${(i * 0.45).toFixed(2)}s`;
              return (
                <circle
                  key={`pulse-${node.id}`}
                  r="2.2"
                  cx={p1.x}
                  cy={p1.y}
                  opacity="0"
                  className="fill-brand-orange"
                >
                  <animate
                    attributeName="cx"
                    values={`${p1.x};${p2.x};${p2.x}`}
                    keyTimes="0;0.32;1"
                    dur={dur}
                    begin={begin}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${p1.y};${p2.y};${p2.y}`}
                    keyTimes="0;0.32;1"
                    dur={dur}
                    begin={begin}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.5;0.5;0;0"
                    keyTimes="0;0.06;0.24;0.32;1"
                    dur={dur}
                    begin={begin}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })
          : null}

        {/* Job node cards — label glows orange while the job has agents on it */}
        {NODES.map((node, i) => {
          const p = nodePoint(i, RING_R);
          const active = Boolean(litBadges[node.id]);
          return (
            <foreignObject
              key={`node-${node.id}`}
              x={p.x - 55}
              y={p.y - 24}
              width="110"
              height="48"
              className="overflow-visible"
            >
              <div className="flex h-full w-full items-center justify-center">
                <div
                  className={`flex w-[74px] items-center justify-center rounded-[7px] bg-white px-2 py-3 text-center text-[11px] leading-tight transition-colors duration-500 dark:bg-[#2A2824] ${
                    active
                      ? "font-medium text-brand-orange"
                      : "text-brand-dark/60 dark:text-brand-cream/60"
                  } ${HAIRLINE_CARD_SHADOW}`}
                >
                  {node.label}
                </div>
              </div>
            </foreignObject>
          );
        })}

        {/* Activity badges on nodes involved in the playing scenarios */}
        {NODES.map((node, i) => {
          const counts = litBadges[node.id];
          if (!counts) return null;
          const p = nodePoint(i, RING_R);
          return (
            <foreignObject
              key={`badge-${node.id}`}
              x={p.x - 4}
              y={p.y - 40}
              width="110"
              height="30"
              className="overflow-visible"
            >
              <NodeBadge counts={counts} />
            </foreignObject>
          );
        })}

        {/* Center card */}
        <foreignObject x={CX - 50} y={CY - 26} width="100" height="52" className="overflow-visible">
          <div className="flex h-full w-full items-center justify-center">
            <div
              className={`flex h-[46px] w-[84px] items-center justify-center rounded-[7px] bg-[#FBF9F2] dark:bg-[#302E29] ${HAIRLINE_CARD_SHADOW}`}
            >
              {/* Mini version of the nav wordmark (see components/logo.tsx) */}
              <span className="inline-flex items-baseline text-[12px] font-semibold tracking-tight text-brand-dark dark:text-brand-cream">
                <span className="relative">
                  Revauri
                  <span
                    aria-hidden
                    className="absolute bg-brand-orange"
                    style={{
                      width: "5px",
                      height: "1.6px",
                      borderRadius: "1px",
                      right: "0px",
                      top: "0.15em",
                      transform: "rotate(-35deg)",
                    }}
                  />
                </span>
                <span className="ml-[2px] text-brand-orange">AI</span>
              </span>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chat panel                                                          */
/* ------------------------------------------------------------------ */

function StatusPill({ status }: { status: TaskItem["status"] }) {
  if (status === "running") {
    return (
      <span className="inline-flex shrink-0 items-center rounded-[3px] bg-brand-orange/15 px-[5px] py-[2px] text-[8px] font-medium leading-[9.5px] text-[#9A4B2E] dark:bg-brand-orange/20 dark:text-[#EDA383]">
        Running
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded-[3px] border border-brand-dark/15 px-[5px] py-[2px] text-[8px] font-medium leading-[9.5px] text-brand-dark/50 dark:border-brand-cream/15 dark:text-brand-cream/50">
      Queued
    </span>
  );
}

function TaskRow({ task, delayMs }: { task: TaskItem; delayMs: number }) {
  return (
    <div
      className="ai-hq-block-in flex items-center gap-2 rounded-[8px] bg-gradient-to-b from-brand-dark/[0.03] to-brand-dark/[0.015] px-[10px] py-2 shadow-[0_0_0_1px_rgba(20,20,19,0.04),0_1.5px_0_0_#FFF_inset] dark:from-white/[0.05] dark:to-white/[0.02] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_1px_0_0_rgba(255,255,255,0.05)_inset]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {task.status === "running" ? (
        <Spinner size={8} />
      ) : (
        <span
          aria-hidden
          className="h-[6px] w-[6px] shrink-0 rounded-full bg-brand-mid-gray/70"
        />
      )}
      <span className="shrink-0 text-[10px] font-medium leading-[15px] text-brand-dark/85 dark:text-brand-cream/85">
        {task.agent}
      </span>
      <span className="min-w-0 flex-1 truncate text-[9px] leading-[15px] text-brand-dark/50 dark:text-brand-cream/50">
        {task.detail}
      </span>
      <StatusPill status={task.status} />
    </div>
  );
}

function ChatPanel({ step, className }: { step: number; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (step === 0) {
      el.scrollTop = 0;
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [step]);

  return (
    <div
      className={`flex flex-col items-center overflow-hidden rounded-[7px] bg-[#F5F3EC] pb-1 pl-1 pr-1 pt-0 shadow-[0_0_0_0.7px_#FFF_inset,0_0_0_0.7px_rgba(20,20,19,0.08),0_2px_8px_rgba(20,20,19,0.03)] dark:bg-[#22211E] dark:shadow-[0_0_0_0.7px_rgba(255,255,255,0.06)_inset,0_0_0_0.7px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.35)] ${className ?? ""}`}
    >
      {/* Tab bar */}
      <div className="flex items-center gap-[8px] px-2 py-[13px]">
        {TAB_LABELS.map((label, i) => (
          <span
            key={label}
            className={`flex h-[17px] items-center justify-center whitespace-nowrap rounded-[4px] px-[6px] text-[10px] font-medium leading-none ${
              i === 0
                ? "border border-black/5 bg-black/5 text-brand-dark/80 dark:border-white/5 dark:bg-white/10 dark:text-brand-cream/80"
                : "text-brand-dark/60 dark:text-brand-cream/60"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Inner chat card */}
      <div className="flex w-full min-h-0 flex-1 flex-col overflow-hidden rounded-[7px] bg-[#FCFAF4] shadow-[0_0_0_0.7px_#FFF_inset,0_0_0_0.7px_rgba(20,20,19,0.08)] dark:bg-[#191816] dark:shadow-[0_0_0_0.7px_rgba(255,255,255,0.05)_inset,0_0_0_0.7px_rgba(0,0,0,0.5)]">
        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-2 pt-[10px]"
          style={{ scrollbarWidth: "none" }}
        >
          {SCENARIOS.map((scenario, i) => {
            const base = i * STEPS_PER_SCENARIO;
            const showUser = step >= base + 1;
            const showReply = step >= base + 2;
            const showTasks = step >= base + 3;
            if (!showUser) return null;
            return (
              <div
                key={scenario.id}
                className={`ai-hq-section-in flex flex-col ${i === 0 ? "mt-0" : "mt-[26px]"}`}
              >
                <div className="ai-hq-block-in flex justify-end">
                  <div className="max-w-[82%] rounded-[8px] border border-black/[0.06] bg-brand-dark/[0.04] px-3 py-[9px] text-[11px] font-medium leading-normal text-brand-dark/85 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-brand-cream/85">
                    {scenario.user}
                  </div>
                </div>

                {showReply ? (
                  <div className="ai-hq-block-in mt-[18px] flex items-start gap-2">
                    <AssistantGlyph />
                    <p className="m-0 flex-1 text-[11px] font-normal leading-[1.6] text-brand-dark/70 dark:text-brand-cream/70">
                      <span>{scenario.replyBefore}</span>
                      <span className="font-semibold text-brand-dark/85 dark:text-brand-cream/85">
                        {scenario.replyBold}
                      </span>
                      {scenario.replyAfter ? <span>{scenario.replyAfter}</span> : null}
                    </p>
                  </div>
                ) : null}

                {showTasks ? (
                  <div className="mt-[18px] flex flex-col gap-[6px]">
                    {scenario.tasks.map((task, ti) => (
                      <TaskRow key={ti} task={task} delayMs={ti * 250} />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Decorative input bar */}
        <div className="mx-2 mb-2" aria-hidden>
          <div className="flex min-h-[36px] items-center gap-[14px] rounded-[8px] bg-white px-3 py-2 shadow-[0_0_0_1px_#FFF_inset,0_0_0_1px_rgba(20,20,19,0.08),0_4px_10px_rgba(20,20,19,0.06)] dark:bg-white/[0.05] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(0,0,0,0.5),0_4px_10px_rgba(0,0,0,0.3)]">
            <span className="flex-1 text-[10px] leading-[1.55] text-brand-dark/30 dark:text-brand-cream/30">
              {INPUT_PLACEHOLDER}
            </span>
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] border border-[#383838] bg-gradient-to-b from-[#4F4F4F] to-[#202020] shadow-[0_1.5px_0_0_rgba(255,255,255,0.24)_inset,0_-0.5px_2px_rgba(0,0,0,0.25)_inset]">
              <ArrowUp className="h-[11px] w-[11px] text-[#E7E7E3]" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function AiHqDemo() {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setStep(TOTAL_STEPS);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !started) return;

    setStep(0);
    const timers: number[] = [];
    for (let s = 1; s <= TOTAL_STEPS; s += 1) {
      timers.push(window.setTimeout(() => setStep(s), stepStartMs(s)));
    }
    timers.push(
      window.setTimeout(() => setCycle((c) => c + 1), CYCLE_RESET_MS),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [started, cycle, reducedMotion]);

  // Badges accumulate as scenarios' task rows appear, and clear on loop reset.
  const litBadges: Partial<Record<NodeId, BadgeCounts>> = {};
  SCENARIOS.forEach((scenario, i) => {
    if (step >= (i + 1) * STEPS_PER_SCENARIO) {
      Object.assign(litBadges, scenario.badges);
    }
  });

  const activeScenario = step === 0 ? -1 : Math.floor((step - 1) / STEPS_PER_SCENARIO);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-cream pb-20 pt-16 dark:bg-brand-dark md:pb-28"
      aria-label="See your AI employee at work"
    >
      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-6">
        <div className="w-full text-center">
          <h2 className="mx-auto text-[28px] font-semibold leading-[1.15] tracking-tight min-[767px]:text-[32px] min-[1000px]:text-[40px]">
            <span className="text-brand-dark dark:text-brand-cream">
              One AI employee, working every job
            </span>
            <br />
            <span className="text-brand-dark/50 dark:text-brand-cream/50">
              while you stay on the work that pays
            </span>
          </h2>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {scenarioAnnouncement(activeScenario)}
        </div>

        {/* App-window frame */}
        <div className="relative mt-10 flex h-auto w-full flex-col overflow-hidden rounded-[16px] bg-[#F1EFE7] shadow-[inset_0_0_0.5px_1.5px_rgba(255,255,255,0.35),inset_0_2px_0_0_#FFF,0_0_2px_0_rgba(20,20,19,0.25),0_0_0_4px_rgba(232,230,220,0.4)] dark:bg-[#1C1B19] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_2px_0_rgba(0,0,0,0.6),0_0_0_4px_rgba(255,255,255,0.04)] min-[768px]:mt-20 min-[1000px]:h-[600px]">
          {/* Bottom-left mono caption */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 max-[767px]:hidden">
            <span className="font-mono text-[8px] leading-[11px] text-brand-dark/40 dark:text-brand-cream/40">
              {FRAME_CAPTION}
            </span>
          </div>

          <div className="flex flex-1 items-stretch max-[999px]:flex-col">
            {/* Left: chrome + diagram */}
            <div className="flex flex-1 flex-col max-[999px]:flex-none">
              <div className="flex items-center justify-between px-3 pt-3 max-[767px]:hidden">
                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center gap-2 rounded-[4px] border border-black/10 bg-brand-dark/[0.03] px-[6px] py-[5px] dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-light-gray dark:bg-white/10">
                      <span className="text-[8px] font-medium text-brand-dark/50 dark:text-brand-cream/60">
                        RV
                      </span>
                    </div>
                    <span className="whitespace-nowrap text-[10px] font-medium text-brand-dark/60 dark:text-brand-cream/60">
                      Revauri AI…
                    </span>
                    <ChevronDown
                      aria-hidden
                      className="h-2.5 w-2.5 text-brand-dark/30 dark:text-brand-cream/30"
                    />
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[10px] font-medium text-brand-dark/30 dark:text-brand-cream/30">
                      Z
                    </span>
                    <span className="text-[10px] font-medium text-brand-dark/40 dark:text-brand-cream/40">
                      60%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-[10px] pr-4">
                  <Folder
                    aria-hidden
                    className="h-[11px] w-[11px] text-brand-dark/40 dark:text-brand-cream/40"
                    strokeWidth={1.5}
                  />
                  <Search
                    aria-hidden
                    className="h-[12px] w-[12px] text-brand-dark/40 dark:text-brand-cream/40"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center px-10 pb-20 pt-0 max-[999px]:flex-none max-[999px]:px-5 max-[999px]:pb-5 max-[999px]:pt-5">
                <OrbitalDiagram litBadges={litBadges} reducedMotion={reducedMotion} />
              </div>
            </div>

            {/* Right: chat panel (desktop) */}
            <div className="hidden shrink-0 flex-col p-2 pl-0 min-[1000px]:flex">
              <ChatPanel step={step} className="h-[580px] w-[328px]" />
            </div>
          </div>

          {/* Chat panel (mobile/tablet) */}
          <div className="w-full p-2 pt-0 min-[1000px]:hidden">
            <ChatPanel step={step} className="h-[300px] w-full" />
          </div>
        </div>

        {/* Feature blurbs */}
        <div className="mt-10 grid w-full grid-cols-1 gap-6 min-[1000px]:mt-20 min-[1000px]:grid-cols-3 min-[1000px]:gap-10">
          <p className="m-0 max-w-[473px] text-[15px] leading-[1.4]">
            <span className="font-medium text-brand-dark dark:text-brand-cream">
              Always answering
            </span>
            <span className="text-brand-dark/70 dark:text-brand-cream/70">
              {" "}
              — calls, texts, and emails get picked up the moment they arrive,
              day or night.
            </span>
          </p>
          <p className="m-0 max-w-[473px] text-[15px] leading-[1.4]">
            <span className="font-medium text-brand-dark dark:text-brand-cream">
              You stay in control
            </span>
            <span className="text-brand-dark/70 dark:text-brand-cream/70">
              {" "}
              — anything customer-facing waits for your approval before it
              sends.
            </span>
          </p>
          <p className="m-0 max-w-[473px] text-[15px] leading-[1.4]">
            <span className="font-medium text-brand-dark dark:text-brand-cream">
              Built for your trade
            </span>
            <span className="text-brand-dark/70 dark:text-brand-cream/70">
              {" "}
              — every agent is set up around how your business actually runs.
            </span>
          </p>
        </div>

        {/* CTA row */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center min-[768px]:flex-row min-[768px]:gap-6 min-[768px]:text-left">
          <p className="m-0 max-w-[460px] text-[15px] leading-[1.4] text-brand-dark/70 dark:text-brand-cream/70">
            Tell us the jobs that eat your week, and we&apos;ll set your AI
            employee up around them.
          </p>
          <Link
            href="/book"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-[15px] font-semibold text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:brightness-[1.04] hover:shadow-[0_10px_28px_-12px_rgba(217,119,87,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
