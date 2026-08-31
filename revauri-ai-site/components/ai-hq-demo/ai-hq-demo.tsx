"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  Folder,
  Inbox,
  Phone,
  Search,
  Send,
  Star,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  ACTIVITY,
  FRAME_CAPTION,
  INPUT_PLACEHOLDER,
  NODES,
  PHASE_MS,
  SCENARIOS,
  TABS,
  TYPING_LEAD_MS,
  TYPING_MS_PER_CHAR,
  TYPING_TAIL_MS,
  scenarioAnnouncement,
  type BadgeCounts,
  type NodeId,
  type Phase,
  type Scenario,
  type TabId,
  type TaskItem,
} from "./script";

/* ------------------------------------------------------------------ */
/* Playback engine                                                     */
/* ------------------------------------------------------------------ */

interface Pos {
  scenario: number;
  phase: Phase;
}

/** How far playback has advanced; used to derive what's visible. */
const PHASE_RANK: Record<Phase, number> = {
  idle: -1,
  typing: 0,
  user: 1,
  reply: 2,
  tasks: 3,
  progress: 4,
  hold: 5,
  fadeout: 6,
};

function phaseDuration(pos: Pos): number {
  switch (pos.phase) {
    case "idle":
      return 0;
    case "typing":
      return (
        TYPING_LEAD_MS +
        SCENARIOS[pos.scenario].user.length * TYPING_MS_PER_CHAR +
        TYPING_TAIL_MS
      );
    case "user":
    case "reply":
    case "tasks":
    case "progress":
    case "hold":
    case "fadeout":
      return PHASE_MS[pos.phase];
    default: {
      const exhaustive: never = pos.phase;
      return exhaustive;
    }
  }
}

function nextPos(pos: Pos): Pos {
  switch (pos.phase) {
    case "idle":
      return { scenario: 0, phase: "typing" };
    case "typing":
      return { ...pos, phase: "user" };
    case "user":
      return { ...pos, phase: "reply" };
    case "reply":
      return { ...pos, phase: "tasks" };
    case "tasks":
      return { ...pos, phase: "progress" };
    case "progress":
      return pos.scenario < SCENARIOS.length - 1
        ? { scenario: pos.scenario + 1, phase: "typing" }
        : { ...pos, phase: "hold" };
    case "hold":
      return { ...pos, phase: "fadeout" };
    case "fadeout":
      return { scenario: 0, phase: "typing" };
    default: {
      const exhaustive: never = pos.phase;
      return exhaustive;
    }
  }
}

interface SectionView {
  scenario: Scenario;
  showReply: boolean;
  showTasks: boolean;
  progressed: boolean;
}

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

const ROW_SHELL =
  "rounded-[8px] bg-gradient-to-b from-brand-dark/[0.03] to-brand-dark/[0.015] shadow-[0_0_0_1px_rgba(20,20,19,0.04),0_1.5px_0_0_#FFF_inset] dark:from-white/[0.05] dark:to-white/[0.02] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_1px_0_0_rgba(255,255,255,0.05)_inset]";

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

/** Inner spoke dots sit just off the hub. Left/right need more radius
 *  because the card is wider than it is tall (same visual gap as top/bottom). */
function innerSpokeR(index: number): number {
  return index % 4 === 2 ? 58 : 44;
}

/** Outer spoke dots sit just shy of the job pill. Left/right and
 *  diagonals need a shorter radius because the pill is wider than tall. */
function outerSpokeR(index: number): number {
  const slot = index % 4;
  if (slot === 0) return 175;
  if (slot === 2) return 150;
  return 167;
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
      [444, 116, 490, 116],
      [490, 116, 490, 104],
    ],
    dots: [[490, 116]],
    cards: [[490, 85]],
  },
  {
    // Quotes (right): out right, elbow down
    lines: [
      [504, 260, 550, 260],
      [550, 260, 550, 272],
    ],
    dots: [[550, 260]],
    cards: [[550, 291]],
  },
  {
    // Reviews (SE): out right, elbow down
    lines: [
      [444, 404, 490, 404],
      [490, 404, 490, 416],
    ],
    dots: [[490, 404]],
    cards: [[490, 435]],
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
      [76, 404, 30, 404],
      [30, 404, 30, 416],
    ],
    dots: [[30, 404]],
    cards: [[30, 435]],
  },
  {
    // Payroll (left): out left, elbow down
    lines: [
      [16, 260, -30, 260],
      [-30, 260, -30, 272],
    ],
    dots: [[-30, 260]],
    cards: [[-30, 291]],
  },
  {
    // Outreach (NW): out left, elbow up
    lines: [
      [76, 116, 30, 116],
      [30, 116, 30, 104],
    ],
    dots: [[30, 116]],
    cards: [[30, 85]],
  },
];

function GhostCard({ x, y }: { x: number; y: number }) {
  return (
    <g className="opacity-30">
      <rect
        x={x - 26}
        y={y - 17}
        width="52"
        height="34"
        rx="6"
        className="fill-white stroke-brand-dark/10 dark:fill-white/[0.06] dark:stroke-white/10"
        strokeWidth="0.8"
      />
      <line
        x1={x - 14}
        y1={y - 4}
        x2={x + 6}
        y2={y - 4}
        strokeWidth="1.6"
        strokeLinecap="round"
        className="stroke-brand-dark/45 dark:stroke-white/45"
      />
      <line
        x1={x - 14}
        y1={y + 5}
        x2={x + 13}
        y2={y + 5}
        strokeWidth="1.6"
        strokeLinecap="round"
        className="stroke-brand-dark/35 dark:stroke-white/35"
      />
    </g>
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

const NODE_ICONS: Record<NodeId, LucideIcon> = {
  calls: Phone,
  leads: Users,
  quotes: FileText,
  reviews: Star,
  calendar: Calendar,
  inbox: Inbox,
  payroll: Wallet,
  outreach: Send,
};

function OrbitalDiagram({
  litBadges,
  flashNodes,
  flashKey,
  reducedMotion,
}: {
  litBadges: Partial<Record<NodeId, BadgeCounts>>;
  /** Nodes whose spokes flash orange (work being dispatched right now). */
  flashNodes: NodeId[];
  flashKey: number;
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
          const p1 = nodePoint(i, innerSpokeR(i));
          const p2 = nodePoint(i, outerSpokeR(i));
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

        {/* Story flash: the spoke lights up and a hub-style dot travels
            along it when a scenario's tasks appear */}
        {!reducedMotion
          ? NODES.map((node, i) => {
              if (!flashNodes.includes(node.id)) return null;
              const p1 = nodePoint(i, innerSpokeR(i));
              const p2 = nodePoint(i, outerSpokeR(i));
              return (
                <g key={`flash-${flashKey}-${node.id}`}>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className="ai-hq-spoke-flash-line stroke-brand-orange"
                  />
                  <circle
                    r="2.5"
                    cx={p1.x}
                    cy={p1.y}
                    strokeWidth="0.5"
                    className="ai-hq-spoke-flash fill-brand-orange stroke-brand-orange"
                  />
                  <circle
                    r="2.5"
                    cx={p2.x}
                    cy={p2.y}
                    strokeWidth="0.5"
                    className="ai-hq-spoke-flash fill-brand-orange stroke-brand-orange"
                  />
                  <circle
                    r="2.5"
                    cx={p1.x}
                    cy={p1.y}
                    strokeWidth="0.5"
                    className="ai-hq-spoke-flash fill-brand-orange stroke-brand-orange"
                  >
                    <animate
                      attributeName="cx"
                      values={`${p1.x};${p2.x}`}
                      dur="0.85s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="cy"
                      values={`${p1.y};${p2.y}`}
                      dur="0.85s"
                      fill="freeze"
                    />
                  </circle>
                </g>
              );
            })
          : null}

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
              const p1 = nodePoint(i, innerSpokeR(i) + 4);
              const p2 = nodePoint(i, outerSpokeR(i));
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
          const Icon = NODE_ICONS[node.id];
          return (
            <foreignObject
              key={`node-${node.id}`}
              x={p.x - 62}
              y={p.y - 26}
              width="124"
              height="52"
              className="overflow-visible"
            >
              <div className="flex h-full w-full items-center justify-center">
                <div
                  className={`flex w-[88px] items-center justify-center gap-1 rounded-[7px] bg-white px-1.5 py-3 text-center text-[11px] leading-tight transition-colors duration-500 max-sm:w-[102px] max-sm:py-3.5 max-sm:text-[13px] dark:bg-[#2A2824] ${
                    active
                      ? "font-medium text-brand-orange"
                      : "text-brand-dark/60 dark:text-brand-cream/60"
                  } ${HAIRLINE_CARD_SHADOW}`}
                >
                  <Icon
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 max-sm:h-3 max-sm:w-3"
                    strokeWidth={1.75}
                  />
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
              x={p.x - 55}
              y={p.y - 41}
              width="110"
              height="24"
              className="overflow-visible"
            >
              <div className="flex h-full w-full items-start justify-center">
                <NodeBadge counts={counts} />
              </div>
            </foreignObject>
          );
        })}

        {/* Center card */}
        <foreignObject x={CX - 50} y={CY - 28} width="100" height="56" className="overflow-visible">
          <div className="flex h-full w-full items-center justify-center">
            <div
              className={`flex h-[46px] w-[84px] items-center justify-center rounded-[7px] bg-[#FBF9F2] max-sm:h-[54px] max-sm:w-[98px] dark:bg-[#302E29] ${HAIRLINE_CARD_SHADOW}`}
            >
              {/* Mini version of the nav wordmark (see components/logo.tsx) */}
              <span className="inline-flex items-baseline text-[12px] font-semibold tracking-tight text-brand-dark max-sm:text-[14px] dark:text-brand-cream">
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

type TaskStatus = TaskItem["status"] | "done";

function StatusPill({ status }: { status: TaskStatus }) {
  switch (status) {
    case "running":
      return (
        <span className="inline-flex shrink-0 items-center rounded-[3px] bg-brand-orange/15 px-[5px] py-[2px] text-[8px] font-medium leading-[9.5px] text-[#9A4B2E] dark:bg-brand-orange/20 dark:text-[#EDA383]">
          Running
        </span>
      );
    case "queued":
      return (
        <span className="inline-flex shrink-0 items-center rounded-[3px] border border-brand-dark/15 px-[5px] py-[2px] text-[8px] font-medium leading-[9.5px] text-brand-dark/50 dark:border-brand-cream/15 dark:text-brand-cream/50">
          Queued
        </span>
      );
    case "done":
      return (
        <span className="inline-flex shrink-0 items-center rounded-[3px] bg-[#71CE45]/15 px-[5px] py-[2px] text-[8px] font-medium leading-[9.5px] text-[#3F7A2E] dark:bg-[#71CE45]/20 dark:text-[#8FD96C]">
          Done
        </span>
      );
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function TaskGlyph({ status }: { status: TaskStatus }) {
  if (status === "running") return <Spinner size={8} />;
  if (status === "done") {
    return (
      <span aria-hidden className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#71CE45]" />
    );
  }
  return (
    <span aria-hidden className="h-[6px] w-[6px] shrink-0 rounded-full bg-brand-mid-gray/70" />
  );
}

function TaskRow({
  task,
  status,
  delayMs,
}: {
  task: TaskItem;
  status: TaskStatus;
  delayMs: number;
}) {
  return (
    <div
      className={`ai-hq-block-in flex items-center gap-2 px-[10px] py-2 ${ROW_SHELL}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <TaskGlyph status={status} />
      <span className="shrink-0 text-[10px] font-medium leading-[15px] text-brand-dark/85 dark:text-brand-cream/85">
        {task.agent}
      </span>
      <span className="min-w-0 flex-1 truncate text-[9px] leading-[15px] text-brand-dark/50 dark:text-brand-cream/50">
        {task.detail}
      </span>
      <StatusPill status={status} />
    </div>
  );
}

function JobsPane({
  litBadges,
}: {
  litBadges: Partial<Record<NodeId, BadgeCounts>>;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[6px] overflow-y-auto px-3 pb-3 pt-[10px]">
      {NODES.map((node) => {
        const counts = litBadges[node.id];
        return (
          <div
            key={node.id}
            className={`ai-hq-block-in flex items-center gap-2 px-[10px] py-2 ${ROW_SHELL}`}
          >
            {counts ? (
              <Spinner size={8} />
            ) : (
              <span
                aria-hidden
                className="h-[6px] w-[6px] shrink-0 rounded-full bg-brand-mid-gray/70"
              />
            )}
            <span className="shrink-0 text-[10px] font-medium leading-[15px] text-brand-dark/85 dark:text-brand-cream/85">
              {node.label}
            </span>
            <span className="min-w-0 flex-1 truncate text-right text-[9px] leading-[15px] text-brand-dark/50 dark:text-brand-cream/50">
              {counts
                ? `${counts.running} running · ${counts.queued} queued · ${counts.done} done`
                : "Idle — ready for work"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ActivityPane() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[6px] overflow-y-auto px-3 pb-3 pt-[10px]">
      {ACTIVITY.map((item, i) => (
        <div
          key={i}
          className={`ai-hq-block-in flex items-start gap-2 px-[10px] py-2 ${ROW_SHELL}`}
        >
          {item.state === "done" ? (
            <span
              aria-hidden
              className="mt-[2px] flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#30D158]"
            >
              <Check className="h-2 w-2 text-white" strokeWidth={3.5} />
            </span>
          ) : (
            <span
              aria-hidden
              className="ai-hq-badge-blink mt-[5px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-orange"
            />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[10px] font-medium leading-[15px] text-brand-dark/85 dark:text-brand-cream/85">
              {item.text}
            </span>
            <span className="block truncate text-[9px] leading-[14px] text-brand-dark/50 dark:text-brand-cream/50">
              {item.meta}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

const TAB_RETURN_MS = 8000;

function ChatPanel({
  sections,
  typingText,
  fading,
  litBadges,
  scrollKey,
  className,
}: {
  sections: SectionView[];
  typingText: string | null;
  fading: boolean;
  litBadges: Partial<Record<NodeId, BadgeCounts>>;
  scrollKey: number;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("home");

  // Curious visitors can peek at Jobs/Activity; snap back so the story resumes.
  useEffect(() => {
    if (activeTab === "home") return;
    const timer = window.setTimeout(() => setActiveTab("home"), TAB_RETURN_MS);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (sections.length === 0) {
      el.scrollTop = 0;
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [scrollKey, sections.length, activeTab]);

  return (
    <div
      className={`flex flex-col items-center overflow-hidden rounded-[7px] bg-[#F5F3EC] pb-1 pl-1 pr-1 pt-0 shadow-[0_0_0_0.7px_#FFF_inset,0_0_0_0.7px_rgba(20,20,19,0.08),0_2px_8px_rgba(20,20,19,0.03)] dark:bg-[#22211E] dark:shadow-[0_0_0_0.7px_rgba(255,255,255,0.06)_inset,0_0_0_0.7px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.35)] ${className ?? ""}`}
    >
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="AI employee panels"
        className="flex items-center gap-[8px] px-2 py-[9px]"
      >
        {TABS.map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-[21px] items-center justify-center whitespace-nowrap rounded-[4px] px-[7px] text-[10px] font-medium leading-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                selected
                  ? "border border-black/5 bg-black/5 text-brand-dark/80 dark:border-white/5 dark:bg-white/10 dark:text-brand-cream/80"
                  : "text-brand-dark/60 hover:bg-black/[0.03] hover:text-brand-dark/80 dark:text-brand-cream/60 dark:hover:bg-white/[0.05] dark:hover:text-brand-cream/80"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Inner panel card */}
      <div
        role="tabpanel"
        className="flex w-full min-h-0 flex-1 flex-col overflow-hidden rounded-[7px] bg-[#FCFAF4] shadow-[0_0_0_0.7px_#FFF_inset,0_0_0_0.7px_rgba(20,20,19,0.08)] dark:bg-[#191816] dark:shadow-[0_0_0_0.7px_rgba(255,255,255,0.05)_inset,0_0_0_0.7px_rgba(0,0,0,0.5)]"
      >
        {activeTab === "jobs" ? <JobsPane litBadges={litBadges} /> : null}
        {activeTab === "activity" ? <ActivityPane /> : null}

        {activeTab === "home" ? (
          <>
            <div
              ref={scrollRef}
              className={`flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-2 pt-[10px] ${
                fading ? "ai-hq-fade-out" : ""
              }`}
              style={{ scrollbarWidth: "none" }}
            >
              {sections.map(({ scenario, showReply, showTasks, progressed }) => (
                <div
                  key={scenario.id}
                  className="ai-hq-section-in mt-[26px] flex flex-col first:mt-0"
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
                        <TaskRow
                          key={ti}
                          task={task}
                          status={
                            progressed
                              ? ti === 0
                                ? "done"
                                : "running"
                              : task.status
                          }
                          delayMs={ti * 250}
                        />
                      ))}
                      {progressed && scenario.approval ? (
                        <div className="ai-hq-block-in mt-[2px] flex">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-[0_0_0_0.8px_rgba(20,20,19,0.08)] dark:bg-white/[0.06] dark:shadow-[0_0_0_0.8px_rgba(255,255,255,0.08)]">
                            <span
                              aria-hidden
                              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#30D158]"
                            >
                              <Check className="h-2 w-2 text-white" strokeWidth={3.5} />
                            </span>
                            <span className="text-[9px] font-medium leading-none text-brand-dark/70 dark:text-brand-cream/70">
                              {scenario.approval}
                            </span>
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Decorative input bar — types the next owner message */}
            <div className="mx-2 mb-2" aria-hidden>
              <div className="flex min-h-[36px] items-center gap-[14px] rounded-[8px] bg-white px-3 py-2 shadow-[0_0_0_1px_#FFF_inset,0_0_0_1px_rgba(20,20,19,0.08),0_4px_10px_rgba(20,20,19,0.06)] dark:bg-white/[0.05] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(0,0,0,0.5),0_4px_10px_rgba(0,0,0,0.3)]">
                {typingText !== null ? (
                  <span className="flex-1 text-[10px] leading-[1.55] text-brand-dark/75 dark:text-brand-cream/75">
                    {typingText}
                    <span className="ai-hq-caret-blink ml-[1px] inline-block h-[11px] w-[1.5px] translate-y-[2px] bg-brand-orange" />
                  </span>
                ) : (
                  <span className="flex-1 text-[10px] leading-[1.55] text-brand-dark/30 dark:text-brand-cream/30">
                    {INPUT_PLACEHOLDER}
                  </span>
                )}
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] border border-[#383838] bg-gradient-to-b from-[#4F4F4F] to-[#202020] shadow-[0_1.5px_0_0_rgba(255,255,255,0.24)_inset,0_-0.5px_2px_rgba(0,0,0,0.25)_inset]">
                  <ArrowUp className="h-[11px] w-[11px] text-[#E7E7E3]" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const FEATURE_BLURBS = [
  {
    title: "Always answering",
    body: "Calls, texts, and emails get picked up the moment they arrive, day or night.",
  },
  {
    title: "You stay in control",
    body: "Anything customer-facing waits for your approval before it sends.",
  },
  {
    title: "Built for your trade",
    body: "Every agent is set up around how your business actually runs.",
  },
] as const;

export function AiHqDemo() {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [pos, setPos] = useState<Pos>({ scenario: 0, phase: "idle" });
  const [typed, setTyped] = useState("");

  // Track visibility continuously so playback pauses off-screen.
  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Phase machine: each phase schedules the next; pausing just clears the timer.
  useEffect(() => {
    if (reducedMotion || !inView) return;
    const timer = window.setTimeout(() => setPos(nextPos(pos)), phaseDuration(pos));
    return () => window.clearTimeout(timer);
  }, [pos, inView, reducedMotion]);

  // Character-by-character typing into the decorative input bar.
  useEffect(() => {
    if (reducedMotion || !inView || pos.phase !== "typing") {
      setTyped("");
      return;
    }
    const message = SCENARIOS[pos.scenario].user;
    let count = 0;
    const interval = window.setInterval(() => {
      count += 1;
      setTyped(message.slice(0, count));
      if (count >= message.length) window.clearInterval(interval);
    }, TYPING_MS_PER_CHAR);
    return () => window.clearInterval(interval);
  }, [pos, inView, reducedMotion]);

  // Under reduced motion, show the finished transcript with all work progressed.
  const view: Pos = reducedMotion
    ? { scenario: SCENARIOS.length - 1, phase: "hold" }
    : pos;
  const rank = PHASE_RANK[view.phase];

  const sections: SectionView[] = SCENARIOS.flatMap((scenario, i) => {
    const started = i < view.scenario || (i === view.scenario && rank >= 1);
    if (!started) return [];
    const current = i === view.scenario;
    return [
      {
        scenario,
        showReply: !current || rank >= 2,
        showTasks: !current || rank >= 3,
        progressed: !current || rank >= 4,
      },
    ];
  });

  const litBadges: Partial<Record<NodeId, BadgeCounts>> = {};
  SCENARIOS.forEach((scenario, i) => {
    if (i < view.scenario || (i === view.scenario && rank >= 3)) {
      Object.assign(litBadges, scenario.badges);
    }
  });

  const flashing = !reducedMotion && pos.phase === "tasks";
  const flashNodes = flashing
    ? (Object.keys(SCENARIOS[pos.scenario].badges) as NodeId[])
    : [];

  const typingText = !reducedMotion && pos.phase === "typing" ? typed : null;
  const fading = !reducedMotion && pos.phase === "fadeout";
  const scrollKey = view.scenario * 10 + rank;

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
          {view.phase === "idle" ? "" : scenarioAnnouncement(view.scenario)}
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
                <OrbitalDiagram
                  litBadges={litBadges}
                  flashNodes={flashNodes}
                  flashKey={pos.scenario}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>

            {/* Right: chat panel (desktop) */}
            <div className="hidden shrink-0 flex-col p-2 pl-0 min-[1000px]:flex">
              <ChatPanel
                sections={sections}
                typingText={typingText}
                fading={fading}
                litBadges={litBadges}
                scrollKey={scrollKey}
                className="h-[580px] w-[328px]"
              />
            </div>
          </div>

          {/* Chat panel (mobile/tablet) */}
          <div className="w-full p-2 pt-0 min-[1000px]:hidden">
            <ChatPanel
              sections={sections}
              typingText={typingText}
              fading={fading}
              litBadges={litBadges}
              scrollKey={scrollKey}
              className="h-[300px] w-full"
            />
          </div>
        </div>

        {/* Feature blurbs */}
        <div className="mt-10 grid w-full grid-cols-1 gap-8 min-[1000px]:mt-20 min-[1000px]:grid-cols-3 min-[1000px]:gap-10">
          {FEATURE_BLURBS.map(({ title, body }) => (
            <div key={title} className="max-w-[473px]">
              <span
                aria-hidden
                className="mb-3 block h-px w-8 bg-brand-orange/70"
              />
              <p className="m-0 text-[16px] font-medium leading-snug text-brand-dark dark:text-brand-cream">
                {title}
              </p>
              <p className="m-0 mt-2 text-[15px] leading-[1.45] text-brand-dark/65 dark:text-brand-cream/65">
                {body}
              </p>
            </div>
          ))}
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
            Name the job
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
