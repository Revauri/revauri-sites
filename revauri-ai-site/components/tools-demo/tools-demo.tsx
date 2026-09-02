"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeInWhenVisible } from "../motion-wrappers";
import { ApproveMock } from "./approve-mock";
import { ParallelMock } from "./parallel-mock";
import { ScopedMock } from "./scoped-mock";
import { TOOLS_INTRO, TOOLS_TABS, type ToolsTabId } from "./script";

const ROTATE_MS = 6_500;
const PANEL_EASE = [0.16, 1, 0.3, 1] as const;

function ToolsPanel({ active }: { active: ToolsTabId }) {
  switch (active) {
    case "approve":
      return <ApproveMock />;
    case "parallel":
      return <ParallelMock />;
    case "scoped":
      return <ScopedMock />;
    default: {
      const _exhaustive: never = active;
      return _exhaustive;
    }
  }
}

export function ToolsDemo() {
  const [active, setActive] = useState<ToolsTabId>("approve");
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  // Bumped on any interaction inside the stage so the rotation timer restarts.
  const [interactionTick, setInteractionTick] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || hovered || !inView) return;
    const timer = window.setTimeout(() => {
      setActive((current) => {
        const index = TOOLS_TABS.findIndex((tab) => tab.id === current);
        return TOOLS_TABS[(index + 1) % TOOLS_TABS.length].id;
      });
    }, ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [active, hovered, inView, reducedMotion, interactionTick]);

  const bumpInteraction = () => setInteractionTick((tick) => tick + 1);

  return (
    <section className="bg-brand-cream py-16 dark:bg-brand-dark md:py-24">
      <div className="section-measure px-6">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              {TOOLS_INTRO.h2Line1}
              <br />
              <span className="section-h2-muted">{TOOLS_INTRO.h2Line2}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
              {TOOLS_INTRO.body}
            </p>
          </div>
        </FadeInWhenVisible>
      </div>

      <div className="dotted-grid relative mt-12 overflow-hidden pt-10 md:mt-16 md:pt-14">
        <div className="section-measure px-6">
          <div
            role="tablist"
            aria-label="Hire tools"
            className="mx-auto grid max-w-4xl grid-cols-1 min-[1000px]:grid-cols-3"
          >
            {TOOLS_TABS.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <div
                  key={tab.id}
                  className={
                    index > 0
                      ? "min-[1000px]:border-l min-[1000px]:border-black/10 dark:min-[1000px]:border-white/10"
                      : undefined
                  }
                >
                  <button
                    type="button"
                    role="tab"
                    id={`tools-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls="tools-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    onKeyDown={(event) => {
                      if (
                        event.key !== "ArrowRight" &&
                        event.key !== "ArrowLeft"
                      )
                        return;
                      event.preventDefault();
                      const delta = event.key === "ArrowRight" ? 1 : -1;
                      const next =
                        TOOLS_TABS[
                          (index + delta + TOOLS_TABS.length) %
                            TOOLS_TABS.length
                        ];
                      setActive(next.id);
                      document
                        .getElementById(`tools-tab-${next.id}`)
                        ?.focus();
                    }}
                    className={`min-h-11 w-full border-l-2 px-4 py-3 text-left text-[14px] leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 ${
                      selected
                        ? "border-brand-orange font-medium text-brand-dark dark:text-brand-cream"
                        : "border-transparent text-brand-dark/40 hover:text-brand-dark/70 dark:text-brand-cream/40 dark:hover:text-brand-cream/70"
                    }`}
                  >
                    {tab.label}
                  </button>
                </div>
              );
            })}
          </div>

          <div
            ref={stageRef}
            className="relative z-10 mx-auto mt-10 w-full min-[767px]:mt-14 min-[1000px]:w-[800px]"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onPointerDownCapture={bumpInteraction}
            onKeyDownCapture={bumpInteraction}
          >
            <div className="relative isolate rounded-[20px] bg-[#ECEAE2] p-3 shadow-[0_0_0_1px_rgba(20,20,19,0.04)] dark:bg-[#232220] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div
                id="tools-panel"
                role="tabpanel"
                aria-labelledby={`tools-tab-${active}`}
                className="demo-stage relative min-h-[400px] overflow-hidden min-[767px]:h-[440px] min-[767px]:min-h-0"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    className="h-full"
                    initial={{ opacity: 0, y: 18, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.985 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.48,
                      ease: PANEL_EASE,
                    }}
                  >
                    <ToolsPanel active={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10 min-[767px]:h-16" />
      </div>
    </section>
  );
}
