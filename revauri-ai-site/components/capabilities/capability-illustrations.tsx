"use client";

import { Phone } from "lucide-react";
import { motion, type Transition } from "framer-motion";

/**
 * Idle-animated product mocks for the capability cards.
 * Accent comes from `currentColor` (set on the wrapper via `--accent`),
 * neutral "ink" strokes come from `--ink` (dark on cream, cream on dark).
 */

export type IllustrationProps = { animate: boolean };

const INK = "var(--ink)";

const loop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut",
});

const SVG_PROPS = {
  viewBox: "0 0 280 200",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-full w-full",
  "aria-hidden": true,
} as const;

function starPoints(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

/* 01 — Lead follow-up: SMS thread, quote sent, typing, reply */
export function LeadFollowUpMock({ animate }: IllustrationProps) {
  const cycle = 7;
  return (
    <svg {...SVG_PROPS}>
      <rect x="28" y="10" width="224" height="180" rx="10" stroke={INK} strokeOpacity="0.2" />
      <rect x="28" y="10" width="224" height="24" rx="10" fill="currentColor" fillOpacity="0.06" />
      <circle cx="44" cy="22" r="5" fill="currentColor" fillOpacity="0.45" />
      <rect x="54" y="19" width="44" height="5" rx="2.5" fill={INK} fillOpacity="0.35" />
      <rect x="54" y="27" width="26" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4" />

      {/* incoming */}
      <rect x="40" y="48" width="112" height="22" rx="8" fill={INK} fillOpacity="0.1" />
      <rect x="50" y="56" width="70" height="5" rx="2.5" fill={INK} fillOpacity="0.3" />

      {/* outgoing: quote sent */}
      <motion.g
        animate={animate ? { opacity: [0, 1, 1, 1, 0], y: [6, 0, 0, 0, 0] } : undefined}
        transition={loop(cycle, 0)}
      >
        <rect x="118" y="78" width="122" height="30" rx="8" fill="currentColor" fillOpacity="0.85" />
        <rect x="128" y="86" width="82" height="5" rx="2.5" fill="#fff" fillOpacity="0.85" />
        <rect x="128" y="95" width="52" height="4" rx="2" fill="#fff" fillOpacity="0.55" />
      </motion.g>

      {/* typing dots */}
      <motion.g
        animate={animate ? { opacity: [0, 0, 1, 1, 0, 0] } : undefined}
        transition={loop(cycle, 0)}
      >
        <rect x="40" y="118" width="44" height="18" rx="8" fill={INK} fillOpacity="0.1" />
        {[52, 62, 72].map((cx, i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy="127"
            r="2.4"
            fill={INK}
            fillOpacity="0.4"
            animate={animate ? { y: [0, -3, 0] } : undefined}
            transition={loop(0.9, i * 0.15)}
          />
        ))}
      </motion.g>

      {/* reply */}
      <motion.g
        animate={animate ? { opacity: [0, 0, 0, 1, 1, 0], y: [6, 6, 6, 0, 0, 0] } : undefined}
        transition={loop(cycle, 0)}
      >
        <rect x="40" y="144" width="132" height="26" rx="8" fill={INK} fillOpacity="0.12" />
        <rect x="50" y="152" width="96" height="5" rx="2.5" fill={INK} fillOpacity="0.4" />
        <rect x="50" y="160" width="58" height="4" rx="2" fill={INK} fillOpacity="0.25" />
      </motion.g>

      {/* status chip */}
      <motion.g
        animate={animate ? { opacity: [0.35, 0.35, 0.35, 1, 1, 0.35] } : undefined}
        transition={loop(cycle, 0)}
      >
        <rect x="176" y="150" width="64" height="16" rx="8" fill="currentColor" fillOpacity="0.14" />
        <circle cx="186" cy="158" r="2.5" fill="currentColor" />
        <rect x="193" y="156" width="38" height="4" rx="2" fill="currentColor" fillOpacity="0.7" />
      </motion.g>
    </svg>
  );
}

/* Incoming call — same Lucide Phone mark as the headline hire */
export function MissedCallMock({ animate }: IllustrationProps) {
  return (
    <svg {...SVG_PROPS}>
      <rect x="92" y="6" width="96" height="188" rx="20" stroke={INK} strokeOpacity="0.22" strokeWidth="1.4" />
      <rect x="92" y="6" width="96" height="188" rx="20" fill="currentColor" fillOpacity="0.04" />
      <rect x="88" y="48" width="4" height="18" rx="1.5" fill={INK} fillOpacity="0.16" />
      <rect x="88" y="74" width="4" height="28" rx="1.5" fill={INK} fillOpacity="0.16" />
      <rect x="124" y="14" width="32" height="5" rx="2.5" fill={INK} fillOpacity="0.28" />

      {[26, 36, 46].map((r, i) => (
        <motion.circle
          key={r}
          cx="140"
          cy="86"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          animate={animate ? { opacity: [0.4, 0, 0.4], scale: [0.88, 1.06, 0.88] } : undefined}
          transition={loop(2.2, i * 0.28)}
        />
      ))}

      <motion.circle
        cx="140"
        cy="86"
        r="22"
        fill="currentColor"
        fillOpacity="0.92"
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={loop(1.6)}
      />
      <Phone
        x={128}
        y={74}
        width={24}
        height={24}
        color="#fff"
        strokeWidth={2}
        aria-hidden="true"
      />

      <rect x="116" y="118" width="48" height="5" rx="2.5" fill={INK} fillOpacity="0.45" />
      <rect x="124" y="128" width="32" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.5" />

      <circle cx="118" cy="162" r="11" fill={INK} fillOpacity="0.1" />
      <circle cx="118" cy="162" r="11" stroke={INK} strokeOpacity="0.2" />
      <path d="M114 162 h8" stroke={INK} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />

      <motion.circle
        cx="162"
        cy="162"
        r="11"
        fill="currentColor"
        animate={animate ? { fillOpacity: [0.7, 1, 0.7] } : undefined}
        transition={loop(1.4)}
        fillOpacity="0.9"
      />

      <rect x="126" y="182" width="28" height="3" rx="1.5" fill={INK} fillOpacity="0.22" />
    </svg>
  );
}

/* 03 — Reviews & check-ins: "How did we do?", stars fill, review reply */
export function ReviewsMock({ animate }: IllustrationProps) {
  const cycle = 6;
  return (
    <svg {...SVG_PROPS}>
      {/* check-in bubble */}
      <rect x="24" y="14" width="118" height="30" rx="9" fill="currentColor" fillOpacity="0.85" />
      <rect x="34" y="23" width="84" height="5" rx="2.5" fill="#fff" fillOpacity="0.85" />
      <rect x="34" y="32" width="48" height="4" rx="2" fill="#fff" fillOpacity="0.55" />

      {/* review card */}
      <rect x="40" y="62" width="200" height="124" rx="10" stroke={INK} strokeOpacity="0.2" />
      <rect x="40" y="62" width="200" height="124" rx="10" fill={INK} fillOpacity="0.03" />
      <circle cx="62" cy="86" r="10" fill="currentColor" fillOpacity="0.25" />
      <circle cx="62" cy="86" r="10" stroke="currentColor" strokeOpacity="0.5" />
      <rect x="80" y="79" width="62" height="5" rx="2.5" fill={INK} fillOpacity="0.45" />
      <rect x="80" y="89" width="38" height="4" rx="2" fill={INK} fillOpacity="0.22" />

      {/* stars — own row under the name, inset from the card edge */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <polygon points={starPoints(86 + i * 14, 108, 5)} fill={INK} fillOpacity="0.12" />
          <motion.polygon
            points={starPoints(86 + i * 14, 108, 5)}
            fill="currentColor"
            animate={animate ? { opacity: [0, 0, 1, 1, 1, 0] } : undefined}
            transition={{ ...loop(cycle), times: [0, 0.1 + i * 0.07, 0.18 + i * 0.07, 0.8, 0.9, 1] }}
          />
        </g>
      ))}

      <rect x="56" y="120" width="168" height="5" rx="2.5" fill={INK} fillOpacity="0.3" />
      <rect x="56" y="130" width="140" height="5" rx="2.5" fill={INK} fillOpacity="0.3" />

      {/* reply */}
      <motion.g
        animate={animate ? { opacity: [0, 0, 0, 1, 1, 0], y: [4, 4, 4, 0, 0, 0] } : undefined}
        transition={loop(cycle)}
      >
        <rect x="56" y="148" width="168" height="26" rx="7" fill="currentColor" fillOpacity="0.1" />
        <path d="M66 161 l-4 -3.5 4 -3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="74" y="155" width="92" height="4" rx="2" fill="currentColor" fillOpacity="0.7" />
        <rect x="74" y="163" width="60" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.4" />
      </motion.g>
    </svg>
  );
}

/* 04 — Reminders & no-shows: calendar, highlighted day, reminder toast */
export function RemindersMock({ animate }: IllustrationProps) {
  const cycle = 6;
  const cols = 7;
  const rows = 4;
  const cellW = 24;
  const cellH = 20;
  const gx = 30;
  const gy = 58;
  const highlight = { c: 3, r: 1 };
  return (
    <svg {...SVG_PROPS}>
      <rect x="20" y="14" width="196" height="172" rx="10" stroke={INK} strokeOpacity="0.2" />
      <rect x="20" y="14" width="196" height="30" rx="10" fill="currentColor" fillOpacity="0.07" />
      <rect x="32" y="26" width="52" height="6" rx="3" fill={INK} fillOpacity="0.45" />
      <rect x="180" y="26" width="6" height="6" rx="1.5" fill={INK} fillOpacity="0.25" />
      <rect x="194" y="26" width="6" height="6" rx="1.5" fill={INK} fillOpacity="0.25" />

      {Array.from({ length: cols }).map((_, c) => (
        <rect key={`h${c}`} x={gx + c * cellW + 6} y="49" width="10" height="3" rx="1.5" fill={INK} fillOpacity="0.2" />
      ))}

      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const isHi = c === highlight.c && r === highlight.r;
          const x = gx + c * cellW;
          const y = gy + r * cellH + 4;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x + 2} y={y} width={cellW - 4} height={cellH - 4} rx="4" fill={INK} fillOpacity="0.045" />
              {isHi ? (
                <>
                  <motion.rect
                    x={x + 2}
                    y={y}
                    width={cellW - 4}
                    height={cellH - 4}
                    rx="4"
                    fill="currentColor"
                    animate={animate ? { fillOpacity: [0.5, 0.95, 0.5] } : undefined}
                    transition={loop(2)}
                    fillOpacity="0.8"
                  />
                  <rect x={x + 7} y={y + 6} width="10" height="3" rx="1.5" fill="#fff" fillOpacity="0.9" />
                </>
              ) : (
                <rect x={x + 7} y={y + 6} width={r === 3 && c > 4 ? 0 : 8} height="3" rx="1.5" fill={INK} fillOpacity="0.2" />
              )}
            </g>
          );
        }),
      )}

      {/* footer note */}
      <rect x="32" y="150" width="80" height="4" rx="2" fill={INK} fillOpacity="0.2" />
      <rect x="32" y="160" width="120" height="4" rx="2" fill={INK} fillOpacity="0.14" />

      {/* reminder toast */}
      <motion.g
        animate={animate ? { opacity: [0, 1, 1, 1, 0], x: [16, 0, 0, 0, 0] } : undefined}
        transition={loop(cycle)}
      >
        <rect x="146" y="104" width="118" height="44" rx="9" fill="currentColor" fillOpacity="0.12" />
        <rect x="146" y="104" width="118" height="44" rx="9" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="164" cy="126" r="8" fill="currentColor" fillOpacity="0.9" />
        <motion.path
          d="M160 126 l3 3 5 -6"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={animate ? { pathLength: [0, 0, 1, 1, 1] } : undefined}
          transition={loop(cycle)}
        />
        <rect x="180" y="116" width="70" height="5" rx="2.5" fill={INK} fillOpacity="0.5" />
        <rect x="180" y="126" width="48" height="4" rx="2" fill="currentColor" fillOpacity="0.7" />
        <rect x="180" y="134" width="30" height="3.5" rx="1.75" fill={INK} fillOpacity="0.25" />
      </motion.g>
    </svg>
  );
}

/* 05 — Inbox & admin: rows get handled one by one */
export function InboxMock({ animate }: IllustrationProps) {
  const rows = [0, 1, 2, 3, 4, 5];
  const cycle = 7;
  const rowY = (i: number) => 44 + i * 24;
  return (
    <svg {...SVG_PROPS}>
      <rect x="22" y="12" width="236" height="178" rx="10" stroke={INK} strokeOpacity="0.2" />
      <rect x="22" y="12" width="236" height="22" rx="10" fill="currentColor" fillOpacity="0.06" />
      <rect x="34" y="20" width="40" height="5" rx="2.5" fill={INK} fillOpacity="0.4" />
      <rect x="196" y="20" width="50" height="6" rx="3" fill="currentColor" fillOpacity="0.55" />

      {/* moving highlight */}
      <motion.rect
        x="26"
        y={rowY(0) - 6}
        width="228"
        height="20"
        rx="5"
        fill="currentColor"
        fillOpacity="0.1"
        animate={animate ? { y: rows.map((i) => (rowY(i) - rowY(0))) } : undefined}
        transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut", times: [0, 0.17, 0.34, 0.51, 0.68, 0.85] }}
      />

      {rows.map((i) => {
        const y = rowY(i);
        return (
          <g key={i}>
            <motion.circle
              cx="38"
              cy={y + 4}
              r="3"
              fill="currentColor"
              animate={
                animate
                  ? { opacity: [1, 1, 0.15, 0.15, 1] }
                  : undefined
              }
              transition={{
                ...loop(cycle),
                times: [0, 0.05 + i * 0.17, 0.12 + i * 0.17, 0.97, 1],
              }}
            />
            <rect x="50" y={y} width={62 + (i % 3) * 10} height="5" rx="2.5" fill={INK} fillOpacity="0.4" />
            <rect x="50" y={y + 9} width={120 - (i % 4) * 14} height="3.5" rx="1.75" fill={INK} fillOpacity="0.18" />
            <rect x="224" y={y + 1} width="22" height="4" rx="2" fill={INK} fillOpacity="0.2" />
            <motion.g
              animate={animate ? { opacity: [0, 0, 1, 1, 0] } : undefined}
              transition={{ ...loop(cycle), times: [0, 0.05 + i * 0.17, 0.12 + i * 0.17, 0.97, 1] }}
            >
              <circle cx="204" cy={y + 5} r="5.5" fill="currentColor" fillOpacity="0.9" />
              <path d={`M201.5 ${y + 5} l2 2 3.5 -4`} stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
            {i < rows.length - 1 ? (
              <line x1="34" y1={y + 17} x2="246" y2={y + 17} stroke={INK} strokeOpacity="0.07" />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/* 06 — Win-back: orbit of dormant contacts, one lights up */
export function WinbackMock({ animate }: IllustrationProps) {
  const cx = 96;
  const cy = 100;
  const R = 56;
  const nodes = Array.from({ length: 6 }).map((_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), i };
  });
  return (
    <svg {...SVG_PROPS}>
      <circle cx={cx} cy={cy} r="82" fill="currentColor" fillOpacity="0.04" />
      <motion.circle
        cx={cx}
        cy={cy}
        r="70"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="0.8"
        strokeDasharray="5 6"
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <circle cx={cx} cy={cy} r={R} stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.8" />
      {nodes.map((n) => (
        <line key={`l${n.i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="currentColor" strokeOpacity="0.16" strokeWidth="0.6" />
      ))}
      <circle cx={cx} cy={cy} r="22" fill="currentColor" fillOpacity="0.12" />
      <circle cx={cx} cy={cy} r="22" stroke="currentColor" strokeOpacity="0.5" />
      <motion.circle
        cx={cx}
        cy={cy}
        r="9"
        fill="currentColor"
        animate={animate ? { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] } : undefined}
        transition={loop(2.2)}
      />

      {nodes.map((n) => (
        <g key={n.i}>
          <circle cx={n.x} cy={n.y} r="9" fill={INK} fillOpacity="0.06" />
          <circle cx={n.x} cy={n.y} r="9" stroke={INK} strokeOpacity="0.18" />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="9"
            fill="currentColor"
            animate={animate ? { opacity: [0.15, 0.15, 1, 1, 0.15, 0.15] } : undefined}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, n.i * 0.14, n.i * 0.14 + 0.02, n.i * 0.14 + 0.1, n.i * 0.14 + 0.13, 1],
            }}
          />
          <circle cx={n.x} cy={n.y - 2} r="2.4" fill={INK} fillOpacity="0.5" />
          <path d={`M${n.x - 4} ${n.y + 5} a4 3.5 0 0 1 8 0`} fill={INK} fillOpacity="0.5" />
        </g>
      ))}

      {/* contact list */}
      <rect x="186" y="26" width="78" height="148" rx="9" stroke={INK} strokeOpacity="0.2" />
      <rect x="186" y="26" width="78" height="148" rx="9" fill={INK} fillOpacity="0.02" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 40 + i * 26;
        return (
          <g key={i}>
            <motion.circle
              cx="200"
              cy={y + 5}
              r="5"
              fill="currentColor"
              animate={animate ? { opacity: [0.2, 0.2, 1, 1, 0.2, 0.2] } : undefined}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, i * 0.17, i * 0.17 + 0.03, i * 0.17 + 0.12, i * 0.17 + 0.15, 1],
              }}
            />
            <rect x="210" y={y} width="42" height="4.5" rx="2.25" fill={INK} fillOpacity="0.4" />
            <rect x="210" y={y + 8} width="28" height="3.5" rx="1.75" fill={INK} fillOpacity="0.18" />
          </g>
        );
      })}
      <motion.rect
        x="196"
        y="152"
        width="58"
        height="12"
        rx="6"
        fill="currentColor"
        animate={animate ? { fillOpacity: [0.5, 0.9, 0.5] } : undefined}
        transition={loop(2.2)}
        fillOpacity="0.7"
      />
      <rect x="208" y="156.5" width="34" height="3" rx="1.5" fill="#fff" fillOpacity="0.85" />
    </svg>
  );
}

/* Quotes: estimate doc + follow-up nudge */
export function QuotesMock({ animate }: IllustrationProps) {
  const cycle = 6.5;
  return (
    <svg {...SVG_PROPS}>
      <rect x="28" y="14" width="148" height="172" rx="10" stroke={INK} strokeOpacity="0.2" />
      <rect x="28" y="14" width="148" height="28" rx="10" fill="currentColor" fillOpacity="0.07" />
      <rect x="40" y="24" width="54" height="6" rx="3" fill={INK} fillOpacity="0.45" />
      <rect x="136" y="24" width="28" height="8" rx="4" fill="currentColor" fillOpacity="0.55" />

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="40" y={56 + i * 22} width={70 + (i % 2) * 18} height="5" rx="2.5" fill={INK} fillOpacity="0.32" />
          <rect x="136" y={56 + i * 22} width="24" height="5" rx="2.5" fill={INK} fillOpacity="0.2" />
        </g>
      ))}

      <line x1="40" y1="146" x2="164" y2="146" stroke={INK} strokeOpacity="0.12" />
      <rect x="40" y="156" width="36" height="5" rx="2.5" fill={INK} fillOpacity="0.4" />
      <motion.rect
        x="128"
        y="154"
        width="36"
        height="10"
        rx="5"
        fill="currentColor"
        animate={animate ? { fillOpacity: [0.45, 0.9, 0.45] } : undefined}
        transition={loop(2.4)}
        fillOpacity="0.7"
      />
      <rect x="136" y="157.5" width="20" height="3" rx="1.5" fill="#fff" fillOpacity="0.85" />

      <motion.g
        animate={animate ? { opacity: [0, 1, 1, 1, 0], x: [12, 0, 0, 0, 0] } : undefined}
        transition={loop(cycle)}
      >
        <rect x="188" y="48" width="76" height="88" rx="9" fill="currentColor" fillOpacity="0.1" />
        <rect x="188" y="48" width="76" height="88" rx="9" stroke="currentColor" strokeOpacity="0.35" />
        <rect x="200" y="60" width="52" height="5" rx="2.5" fill={INK} fillOpacity="0.45" />
        <rect x="200" y="72" width="38" height="4" rx="2" fill={INK} fillOpacity="0.22" />
        <rect x="200" y="92" width="52" height="22" rx="6" fill="currentColor" fillOpacity="0.85" />
        <rect x="210" y="100" width="32" height="5" rx="2.5" fill="#fff" fillOpacity="0.85" />
      </motion.g>
    </svg>
  );
}

/* Payroll: hours grid + packet sent */
export function PayrollMock({ animate }: IllustrationProps) {
  const cycle = 7;
  return (
    <svg {...SVG_PROPS}>
      <rect x="22" y="16" width="168" height="168" rx="10" stroke={INK} strokeOpacity="0.2" />
      <rect x="22" y="16" width="168" height="26" rx="10" fill="currentColor" fillOpacity="0.07" />
      <rect x="34" y="25" width="48" height="6" rx="3" fill={INK} fillOpacity="0.45" />

      {["M", "T", "W", "T", "F"].map((d, i) => (
        <rect key={d + i} x={40 + i * 28} y="52" width="14" height="4" rx="2" fill={INK} fillOpacity="0.22" />
      ))}

      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => {
          const filled = r < 3 || c < 3;
          return (
            <rect
              key={`${r}-${c}`}
              x={36 + c * 28}
              y={66 + r * 22}
              width="22"
              height="12"
              rx="3"
              fill={filled ? "currentColor" : INK}
              fillOpacity={filled ? 0.16 + (c % 3) * 0.06 : 0.05}
            />
          );
        }),
      )}

      <motion.g
        animate={animate ? { opacity: [0.4, 1, 1, 0.4], y: [6, 0, 0, 0] } : undefined}
        transition={loop(cycle)}
      >
        <rect x="202" y="40" width="58" height="78" rx="7" fill={INK} fillOpacity="0.04" />
        <rect x="202" y="40" width="58" height="78" rx="7" stroke="currentColor" strokeOpacity="0.35" />
        <rect x="212" y="52" width="38" height="5" rx="2.5" fill={INK} fillOpacity="0.4" />
        <rect x="212" y="64" width="28" height="4" rx="2" fill={INK} fillOpacity="0.2" />
        <rect x="212" y="74" width="32" height="4" rx="2" fill={INK} fillOpacity="0.2" />
        <rect x="212" y="96" width="38" height="10" rx="5" fill="currentColor" fillOpacity="0.85" />
        <rect x="220" y="99.5" width="22" height="3" rx="1.5" fill="#fff" fillOpacity="0.9" />
      </motion.g>

      <motion.g
        animate={animate ? { opacity: [0, 0, 1, 1, 0] } : undefined}
        transition={loop(cycle)}
      >
        <circle cx="231" cy="148" r="14" fill="currentColor" fillOpacity="0.9" />
        <path d="M225 148 l5 5 8 -9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}
