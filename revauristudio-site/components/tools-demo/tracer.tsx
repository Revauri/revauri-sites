/* Dotted connector matching the CatchKanban travel paths: brand-orange 1px,
   3.5/5 dash, round caps, marching `kanban-flow` animation, optional endpoint nodes. */

const STROKE = "#D97757";
const NODE_R = 2.4;
const THICKNESS = 7;
const MID = THICKNESS / 2;
const NODE_INSET = NODE_R + 0.5;

function Node({
  cx,
  cy,
  shift,
}: {
  cx: number | string;
  cy: number | string;
  shift?: string;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={NODE_R}
      stroke={STROKE}
      strokeWidth="1"
      transform={shift}
      className="fill-white dark:fill-[#2a2926]"
    />
  );
}

export function Tracer({
  direction,
  className = "",
  startNode = false,
  endNode = false,
}: {
  direction: "vertical" | "horizontal";
  className?: string;
  startNode?: boolean;
  endNode?: boolean;
}) {
  const vertical = direction === "vertical";

  return (
    // Zero intrinsic size along the stretch axis: an attribute-less <svg> is
    // 300x150 by default, which inflates flex/grid min-content sizing.
    <svg
      aria-hidden
      width={vertical ? THICKNESS : 0}
      height={vertical ? 0 : THICKNESS}
      className={`block shrink-0 overflow-visible ${
        vertical ? "w-[7px]" : "h-[7px] w-full"
      } ${className}`}
    >
      <line
        x1={vertical ? MID : 0}
        y1={vertical ? 0 : MID}
        x2={vertical ? MID : "100%"}
        y2={vertical ? "100%" : MID}
        stroke={STROKE}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="3.5 5"
        className="kanban-flow"
      />
      {startNode ? (
        <Node
          cx={vertical ? MID : NODE_INSET}
          cy={vertical ? NODE_INSET : MID}
        />
      ) : null}
      {endNode ? (
        <Node
          cx={vertical ? MID : "100%"}
          cy={vertical ? "100%" : MID}
          shift={
            vertical
              ? `translate(0 ${-NODE_INSET})`
              : `translate(${-NODE_INSET} 0)`
          }
        />
      ) : null}
    </svg>
  );
}
