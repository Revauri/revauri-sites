"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

interface Props {
  id?: string;
  children: React.ReactNode;
}

export function HomeRevealSection({ id, children }: Props) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div id={id} ref={ref} className="reveal">
      {children}
    </div>
  );
}
