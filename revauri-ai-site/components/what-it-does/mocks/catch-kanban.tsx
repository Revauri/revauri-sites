"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CardDef = { id: string; title: string; meta: string };

type Connection = {
  from: string;
  to: string;
};

type Anchor = {
  left: number;
  right: number;
  cy: number;
};

type JobScene = {
  incoming: CardDef;
  captured: [CardDef, CardDef];
  waiting: [CardDef, CardDef, CardDef];
};

const COLUMN_NAMES = ["Incoming", "Captured", "Waiting on you"] as const;

const JOBS: JobScene[] = [
  {
    incoming: { id: "in-1", title: "After-hours call", meta: "Elena V., tooth pain" },
    captured: [
      { id: "cap-1", title: "Name and number in", meta: "Elena V." },
      { id: "cap-2", title: "Job noted", meta: "Tooth pain" },
    ],
    waiting: [
      { id: "wait-1", title: "Needs your call", meta: "Elena V." },
      { id: "wait-2", title: "Hold Thursday 9:00 AM", meta: "Pre-approved slot" },
      { id: "wait-3", title: "Text if urgent", meta: "After-hours rule" },
    ],
  },
  {
    incoming: { id: "in-1", title: "Overflow", meta: "Quote request" },
    captured: [
      { id: "cap-1", title: "Name and number in", meta: "Caller logged" },
      { id: "cap-2", title: "Quote request", meta: "No price guessed" },
    ],
    waiting: [
      { id: "wait-1", title: "Needs your call", meta: "Caller" },
      { id: "wait-2", title: "Hold a callback", meta: "Your calendar" },
      { id: "wait-3", title: "Review before send", meta: "Your approval" },
    ],
  },
  {
    incoming: { id: "in-1", title: "Missed call", meta: "Mike R., leak" },
    captured: [
      { id: "cap-1", title: "Name and number in", meta: "Mike R." },
      { id: "cap-2", title: "Job noted", meta: "Leak" },
    ],
    waiting: [
      { id: "wait-1", title: "Needs your call", meta: "Mike R." },
      { id: "wait-2", title: "Hold Friday 8:00 AM", meta: "Pre-approved slot" },
      { id: "wait-3", title: "Same-day summary", meta: "Evening note" },
    ],
  },
];

const SEQUENCE: Connection[] = [
  { from: "in-1", to: "cap-1" },
  { from: "in-1", to: "cap-2" },
  { from: "cap-1", to: "wait-1" },
  { from: "cap-1", to: "wait-2" },
  { from: "cap-2", to: "wait-3" },
];

const CAPTURE_HOPS = 2;
const INITIAL_MS = 700;
const DRAW_MS = 1350;
const GAP_MS = 280;
const GROUP_GAP_MS = 550;
const HOLD_MS = 2600;

const STROKE = "#D97757";
const CORNER_RADIUS = 8;
const NODE_R = 2.4;

function columnsFor(job: JobScene): { name: string; cards: CardDef[] }[] {
  return [
    { name: COLUMN_NAMES[0], cards: [job.incoming] },
    { name: COLUMN_NAMES[1], cards: [...job.captured] },
    { name: COLUMN_NAMES[2], cards: [...job.waiting] },
  ];
}

function forkX(from: Anchor, tos: Anchor[]): number {
  const nearest = Math.min(...tos.map((to) => to.left));
  const gap = nearest - from.right;
  return from.right + Math.max(gap * 0.48, 10);
}

function orthogonalPath(x1: number, y1: number, x2: number, y2: number, midX: number): string {
  const dy = y2 - y1;
  if (Math.abs(dy) < 1.5) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const radius = Math.min(
    CORNER_RADIUS,
    Math.abs(dy) / 2,
    Math.abs(midX - x1) / 2,
    Math.abs(x2 - midX) / 2,
  );
  const sign = dy > 0 ? 1 : -1;

  return [
    `M ${x1} ${y1}`,
    `L ${midX - radius} ${y1}`,
    `Q ${midX} ${y1} ${midX} ${y1 + sign * radius}`,
    `L ${midX} ${y2 - sign * radius}`,
    `Q ${midX} ${y2} ${midX + radius} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}

function ConnectorNode({ cx, cy }: { cx: number; cy: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={NODE_R}
      stroke={STROKE}
      strokeWidth="1"
      className="fill-white dark:fill-[#242321]"
    />
  );
}

function TravelPath({
  d,
  status,
  reducedMotion,
}: {
  d: string;
  status: "drawing" | "done";
  reducedMotion: boolean;
}) {
  const drawing = status === "drawing" && !reducedMotion;

  return (
    <path
      d={d}
      fill="none"
      stroke={STROKE}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={drawing ? 1 : undefined}
      strokeDasharray={drawing ? "1" : "3.5 5"}
      className={
        reducedMotion ? undefined : drawing ? "kanban-draw" : "kanban-flow"
      }
    />
  );
}

function KanbanConnectors({
  anchors,
  completed,
  drawingIndex,
  reducedMotion,
}: {
  anchors: Record<string, Anchor>;
  completed: number;
  drawingIndex: number;
  reducedMotion: boolean;
}) {
  const rawId = useId();
  const fillId = rawId.replace(/:/g, "");
  const visible = SEQUENCE.map((connection, index) => ({
    connection,
    status:
      index < completed ? "done" : index === drawingIndex ? "drawing" : null,
  })).filter((item): item is { connection: Connection; status: "drawing" | "done" } =>
    item.status !== null,
  );

  const sourceIds = new Set(visible.map((item) => item.connection.from));
  const destIds = new Set(
    visible.filter((item) => item.status === "done").map((item) => item.connection.to),
  );

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      {visible.map(({ connection, status }) => {
        const from = anchors[connection.from];
        const to = anchors[connection.to];
        if (!from || !to) return null;

        const siblings = SEQUENCE.flatMap((candidate) => {
          if (candidate.from !== connection.from) return [];
          const sibling = anchors[candidate.to];
          return sibling ? [sibling] : [];
        });

        return (
          <TravelPath
            key={`${connection.from}-${connection.to}-${status}`}
            d={orthogonalPath(from.right, from.cy, to.left, to.cy, forkX(from, siblings))}
            status={status}
            reducedMotion={reducedMotion}
          />
        );
      })}
      {Array.from(sourceIds, (id) => {
        const anchor = anchors[id];
        if (!anchor) return null;
        return <ConnectorNode key={`${fillId}-out-${id}`} cx={anchor.right} cy={anchor.cy} />;
      })}
      {Array.from(destIds, (id) => {
        const anchor = anchors[id];
        if (!anchor) return null;
        return <ConnectorNode key={`${fillId}-in-${id}`} cx={anchor.left} cy={anchor.cy} />;
      })}
    </svg>
  );
}

function KanbanCard({
  card,
  reached,
  lit,
}: {
  card: CardDef;
  reached: boolean;
  lit: boolean;
}) {
  return (
    <div
      data-card-id={card.id}
      className={`flex items-center justify-between gap-2 rounded-lg border border-black/[0.06] bg-white/95 px-2 py-1.5 shadow-[0_1px_1px_rgba(20,20,19,0.03)] transition-opacity duration-300 dark:border-white/[0.07] dark:bg-[#242321] ${
        reached ? (lit ? "kanban-card-lit" : "") : "opacity-[0.38]"
      }`}
    >
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium leading-none tracking-tight text-brand-dark dark:text-brand-cream">
          {card.title}
        </p>
        <p className="mt-1 truncate text-[9px] leading-none text-brand-dark/40 dark:text-brand-cream/40">
          {card.meta}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border border-black/[0.06] text-[9px] leading-none text-brand-dark/30 dark:border-white/[0.08] dark:text-brand-cream/30"
      >
        →
      </span>
    </div>
  );
}

/** Which board the mobile carousel should show. Scrolls as hops draw
 *  toward the next column so the dotted line and the stage move together. */
function focusColumn(drawingIndex: number, completed: number): number {
  const hop = drawingIndex >= 0 ? drawingIndex : completed - 1;
  if (hop < 0) return 0;
  if (hop < CAPTURE_HOPS) return 1;
  return 2;
}

function reachedIds(completed: number): Set<string> {
  const ids = new Set<string>(["in-1"]);
  for (let index = 0; index < completed; index += 1) {
    const hop = SEQUENCE[index];
    if (!hop) continue;
    ids.add(hop.from);
    ids.add(hop.to);
  }
  return ids;
}

export function CatchKanban() {
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [anchors, setAnchors] = useState<Record<string, Anchor>>({});
  const [jobIndex, setJobIndex] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [drawingIndex, setDrawingIndex] = useState(-1);
  const reducedMotion = Boolean(useReducedMotion());

  const job = JOBS[jobIndex] ?? JOBS[0];
  const columns = columnsFor(job);
  const reached = reachedIds(reducedMotion ? SEQUENCE.length : completed);
  const focus = reducedMotion
    ? 0
    : focusColumn(drawingIndex, completed);

  useEffect(() => {
    if (reducedMotion) {
      setCompleted(SEQUENCE.length);
      setDrawingIndex(-1);
      return;
    }

    setCompleted(0);
    setDrawingIndex(-1);
    const timers: number[] = [];
    let at = INITIAL_MS;

    SEQUENCE.forEach((_, index) => {
      timers.push(window.setTimeout(() => setDrawingIndex(index), at));
      at += DRAW_MS;
      timers.push(
        window.setTimeout(() => {
          setCompleted(index + 1);
          setDrawingIndex(-1);
        }, at),
      );
      at += index === CAPTURE_HOPS - 1 ? GROUP_GAP_MS : GAP_MS;
    });

    timers.push(
      window.setTimeout(() => {
        setJobIndex((current) => (current + 1) % JOBS.length);
        setCompleted(0);
        setDrawingIndex(-1);
      }, at + HOLD_MS),
    );

    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [jobIndex, reducedMotion]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const root = frame.getBoundingClientRect();
      const next: Record<string, Anchor> = {};

      for (const column of columns) {
        for (const card of column.cards) {
          const el = frame.querySelector(`[data-card-id="${card.id}"]`);
          if (!(el instanceof HTMLElement)) continue;
          const rect = el.getBoundingClientRect();
          next[card.id] = {
            left: rect.left - root.left,
            right: rect.right - root.left,
            cy: rect.top - root.top + rect.height / 2,
          };
        }
      }

      setAnchors(next);

      const shell = shellRef.current;
      const focusedCol = frame.querySelector(`[data-kanban-col="${focus}"]`);
      if (shell) {
        if (
          window.matchMedia("(max-width: 767px)").matches &&
          focusedCol instanceof HTMLElement
        ) {
          shell.style.height = `${focusedCol.offsetHeight}px`;
        } else {
          shell.style.height = "";
        }
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    for (const stack of frame.querySelectorAll("[data-card-stack]")) {
      observer.observe(stack);
    }
    return () => observer.disconnect();
  }, [jobIndex, focus]);

  return (
    <div
      className={
        reducedMotion
          ? "max-w-full overflow-x-auto"
          : "max-w-full overflow-hidden"
      }
    >
      <div
        ref={shellRef}
        className="product-frame relative overflow-hidden min-[768px]:min-h-[360px]"
      >
        <div
          ref={frameRef}
          key={jobIndex}
          className={`dotted-grid relative max-[767px]:flex max-[767px]:w-[264%] max-[767px]:items-start max-[767px]:ease-in-out min-[768px]:grid min-[768px]:h-full min-[768px]:min-h-[360px] min-[768px]:w-full min-[768px]:grid-cols-3 ${
            reducedMotion
              ? ""
              : "max-[767px]:transition-transform max-[767px]:duration-[1350ms]"
          } ${
            focus === 1
              ? "max-[767px]:-translate-x-1/3"
              : focus === 2
                ? "max-[767px]:-translate-x-[calc(100%-100%/2.64)]"
                : "max-[767px]:translate-x-0"
          }`}
        >
          {columns.map((col, i) => (
            <div
              key={col.name}
              data-kanban-col={i}
              className={`flex w-1/3 shrink-0 flex-col self-start px-2.5 pt-2.5 pb-6 min-[768px]:h-full min-[768px]:w-auto min-[768px]:self-auto min-[768px]:p-4 ${
                i < columns.length - 1
                  ? "border-r border-black/[0.06] dark:border-white/[0.06]"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="max-w-full truncate rounded-full border border-black/[0.08] bg-white/70 px-2 py-0.5 text-[10px] font-medium text-brand-dark/70 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-brand-cream/70">
                  {col.name}
                </span>
                <span className="text-[10px] text-brand-orange">
                  {col.cards.length}
                </span>
              </div>
              <div
                data-card-stack
                className="mt-3 flex flex-col gap-2 min-[768px]:mt-0 min-[768px]:min-h-0 min-[768px]:flex-1 min-[768px]:justify-center"
              >
                {col.cards.map((card) => (
                  <KanbanCard
                    key={card.id}
                    card={card}
                    reached={reached.has(card.id)}
                    lit={card.id !== "in-1" && reached.has(card.id)}
                  />
                ))}
              </div>
            </div>
          ))}
          <KanbanConnectors
            anchors={anchors}
            completed={reducedMotion ? SEQUENCE.length : completed}
            drawingIndex={reducedMotion ? -1 : drawingIndex}
            reducedMotion={reducedMotion}
          />
        </div>
        <span className="absolute bottom-2 left-2.5 font-mono text-[8px] leading-[11px] text-brand-dark/40 dark:text-brand-cream/40">
          Example — phone hire
        </span>
      </div>
    </div>
  );
}
