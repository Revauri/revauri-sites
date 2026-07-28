"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const update = () => {
      const rect = target.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(Math.max(-rect.top, 0), scrollable) / scrollable : rect.top <= 0 ? 1 : 0;
      setProgress(ratio * 100);
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-[3px]">
      <div
        className={`h-full bg-brand-orange ${prefersReducedMotion ? "" : "transition-[width] duration-150 ease-out"}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
