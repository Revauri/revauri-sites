"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { PortfolioProject } from "@/lib/portfolio-data";
import styles from "./portfolio-filmstrip.module.css";

const RAIL_COPIES = 3;
const COMPACT_BREAKPOINT = 650;

export type FilmstripProject = Pick<
  PortfolioProject,
  "slug" | "name" | "industry" | "hasRealImages" | "heroImage"
>;

type RailCard = FilmstripProject & { railIndex: number; displayIndex: number };

function wrapDelta(index: number, phase: number, count: number) {
  let delta = index - phase;
  while (delta > count / 2) delta -= count;
  while (delta < -count / 2) delta += count;
  return delta;
}

export function PortfolioFilmstrip({
  projects,
}: {
  projects: readonly FilmstripProject[];
}) {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uniqueCount = projects.length;
  const rail: RailCard[] = Array.from({ length: uniqueCount * RAIL_COPIES }, (_, railIndex) => {
    const project = projects[railIndex % uniqueCount];
    return {
      ...project,
      railIndex,
      displayIndex: (railIndex % uniqueCount) + 1,
    };
  });
  const count = rail.length;
  const startIndex = uniqueCount;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || count === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = {
      phase: startIndex,
      target: startIndex,
      base: startIndex,
      pointerX: 0,
      pointerY: 0,
      active: false,
      lastInput: performance.now(),
    };

    const nearestIndex = () => ((Math.round(state.phase) % count) + count) % count;

    const moveTo = (index: number) => {
      const current = nearestIndex();
      let delta = index - current;
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      state.base += delta;
      state.target = state.base;
      state.active = false;
      state.lastInput = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      state.pointerX = nx;
      state.pointerY = ny;
      state.active = true;
      state.target = state.base + (window.innerWidth < COMPACT_BREAKPOINT ? ny * 0.4 : nx * 0.5);
      state.lastInput = performance.now();
    };

    const onPointerLeave = () => {
      state.active = false;
      state.pointerX = 0;
      state.pointerY = 0;
      state.target = state.base;
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const pixels = event.deltaMode === 1 ? event.deltaX * 16 : event.deltaMode === 2 ? event.deltaX * 800 : event.deltaX;
      const step = Math.max(-0.08, Math.min(0.08, pixels * 0.00075));
      if (!step) return;
      state.base += step;
      state.target = state.base;
      state.active = false;
      state.lastInput = performance.now();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
      const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
      if (!forward && !backward) return;
      event.preventDefault();
      state.base += forward ? 1 : -1;
      state.target = state.base;
      state.active = false;
      state.lastInput = performance.now();
    };

    const onCardClick = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const index = Number(button.dataset.index);
      if (nearestIndex() === index) {
        const slug = button.dataset.slug;
        if (slug) router.push(`/portfolio/${slug}`);
        return;
      }
      moveTo(index);
    };

    const onCardFocus = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      moveTo(Number(button.dataset.index));
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("keydown", onKeyDown);

    const cards = cardRefs.current.filter((card): card is HTMLButtonElement => card !== null);
    for (const card of cards) {
      card.addEventListener("click", onCardClick);
      card.addEventListener("focus", onCardFocus);
    }

    let previousTime = performance.now();
    let frame = 0;

    const render = (time: number) => {
      const deltaTime = Math.min(32, time - previousTime);
      previousTime = time;
      const ease = reducedMotion ? 1 : 1 - Math.pow(0.08, deltaTime / 1000);

      if (!reducedMotion && !state.active && time - state.lastInput > 8000) {
        const idle = time - state.lastInput - 8000;
        state.target = state.base + Math.sin(idle * 0.00012) * 0.35;
      }

      state.phase += (state.target - state.phase) * ease;
      const compact = window.innerWidth < COMPACT_BREAKPOINT;
      const activeIndex = nearestIndex();
      const horizontalSpacing = Math.min(340, Math.max(210, window.innerWidth * 0.2));
      const verticalSpacing = Math.min(150, Math.max(100, window.innerHeight * 0.13));

      for (const [index, card] of cards.entries()) {
        const delta = wrapDelta(index, state.phase, count);
        const distance = Math.abs(delta);
        const focus = Math.exp(-distance * distance * 1.28);
        const side = Math.max(0, 1 - distance / 5);
        const direction = Math.sign(delta);
        const x = compact
          ? delta * 24 + Math.sin(delta * 0.9) * 25
          : delta * horizontalSpacing;
        const y = compact
          ? delta * verticalSpacing
          : distance * 8 + state.pointerY * focus * 10;
        const z = focus * 145 - distance * 148;
        const scale = 0.54 + side * 0.15 + focus * 0.54;
        const rotateX = compact ? delta * 2.1 : -state.pointerY * focus * 3.5;
        const rotateY = compact
          ? -delta * 5
          : -direction * (distance > 0.2 ? 14 + Math.min(distance, 3) * 5 : 0) +
            state.pointerX * focus * 3;
        const rotateZ = compact ? delta * -1.4 : delta * 0.7;

        card.style.setProperty("--focus", focus.toFixed(4));
        card.style.zIndex = String(Math.round(1000 - distance * 100));
        card.style.opacity = String(Math.max(0.13, side * 0.76 + focus * 0.24));
        card.style.filter = `blur(${Math.max(0, distance - 1.5) * 0.38}px)`;
        card.style.transform = [
          "translate(-50%, -50%)",
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px)`,
          `rotateX(${rotateX.toFixed(2)}deg)`,
          `rotateY(${rotateY.toFixed(2)}deg)`,
          `rotateZ(${rotateZ.toFixed(2)}deg)`,
          `scale(${scale.toFixed(4)})`,
        ].join(" ");
        if (index === activeIndex) card.setAttribute("aria-current", "true");
        else card.removeAttribute("aria-current");
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("keydown", onKeyDown);
      for (const card of cards) {
        card.removeEventListener("click", onCardClick);
        card.removeEventListener("focus", onCardFocus);
      }
    };
  }, [count, router, startIndex]);

  if (uniqueCount === 0) return null;

  return (
    <div>
      <div
        ref={stageRef}
        className={styles.stage}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Portfolio filmstrip"
      >
        <div className={styles.deck}>
          {rail.map((project, index) => (
            <button
              key={`${project.slug}-${index}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              type="button"
              className={styles.card}
              data-index={index}
              data-slug={project.slug}
              aria-label={`View project: ${project.name}`}
              aria-current={index === startIndex ? "true" : undefined}
            >
              <span className={styles.portrait}>
                {project.hasRealImages ? (
                  <Image
                    src={project.heroImage.src}
                    alt={project.heroImage.alt}
                    width={project.heroImage.width}
                    height={project.heroImage.height}
                    sizes="420px"
                    draggable={false}
                  />
                ) : null}
              </span>
              <span className={styles.footer}>
                <span className={styles.index}>
                  {String(project.displayIndex).padStart(2, "0")}
                </span>
                <span className={styles.meta}>
                  <span className={styles.name}>{project.name}</span>
                  <span className={styles.role}>{project.industry}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className={styles.hint}>Move · Swipe sideways · Arrow keys · Tap to open</p>
    </div>
  );
}
