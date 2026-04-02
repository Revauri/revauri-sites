"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

const TESTIMONIALS = [
  {
    highlight: "Our leads tripled in the first month after launch.",
    content:
      "We'd been running the same site for 5 years. Revauri rebuilt it in 10 days and the difference was immediate. More calls, more form fills, more people actually finding us on Google.",
    author: "David R.",
    role: "Owner, DR Plumbing",
    location: "Austin, TX",
    stars: 5,
  },
  {
    highlight: "I finally have a website I'm proud to share.",
    content:
      "Before Revauri, I'd avoid giving out my URL. It looked like it was built in 2012 — because it was. Now clients tell me my site looks better than firms ten times our size.",
    author: "Maria L.",
    role: "Founder, Lumina Design Studio",
    location: "Miami, FL",
    stars: 5,
  },
  {
    highlight: "The free sample sold me before the call even started.",
    content:
      "They rebuilt my homepage with my actual content and branding before I paid anything. I opened the preview link and immediately knew I wanted the full site. No other agency does that.",
    author: "James K.",
    role: "Owner, Summit Roofing",
    location: "Denver, CO",
    stars: 4.5,
  },
  {
    highlight: "I don't worry about my website anymore.",
    content:
      "Updates, hosting, speed — Revauri handles everything. I used to spend hours fighting with WordPress. Now I just send a quick email and changes go live the same day.",
    author: "Sarah T.",
    role: "Director, Bright Path Tutoring",
    location: "Chicago, IL",
    stars: 5,
  },
  {
    highlight: "7 days from call to launch. They weren't kidding.",
    content:
      "I needed a site fast for a product launch. Joseph and team turned it around in a week and it looked like we spent months on it. Mobile-perfect, fast, and the copy actually sounds like us.",
    author: "Alex M.",
    role: "Co-founder, GreenLeaf Supplements",
    location: "Portland, OR",
    stars: 4.5,
  },
  {
    highlight: "My bounce rate dropped by 60% and conversions went up.",
    content:
      "The old site was slow and confusing. Revauri simplified everything — clear sections, obvious CTAs, fast load times. The numbers speak for themselves.",
    author: "Rachel W.",
    role: "Marketing Lead, ClearView Financial",
    location: "Boston, MA",
    stars: 5,
  },
];

function StarRating({ stars }: { stars: number }) {
  const fullStars = Math.floor(stars);
  const hasHalf = stars % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5 text-lg text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) return <span key={i}>★</span>;
        if (i === fullStars && hasHalf) {
          return (
            <span key={i} className="relative inline-block">
              <span className="text-amber-400/20">★</span>
              <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                <span className="text-amber-400">★</span>
              </span>
            </span>
          );
        }
        return <span key={i} className="text-amber-400/20">★</span>;
      })}
    </div>
  );
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToCard = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, TESTIMONIALS.length - 1));
    setCurrentIndex(clamped);
    if (scrollRef.current) {
      const card = scrollRef.current.children[clamped] as HTMLElement;
      if (card) {
        scrollRef.current.scrollTo({
          left: card.offsetLeft - scrollRef.current.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev >= TESTIMONIALS.length - 1 ? 0 : prev + 1;
        scrollToCard(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused, prefersReducedMotion, scrollToCard]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const children = Array.from(container.children) as HTMLElement[];
      let closestIndex = 0;
      let closestDistance = Infinity;
      children.forEach((child, i) => {
        const distance = Math.abs(child.offsetLeft - container.offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      setCurrentIndex(closestIndex);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative flex flex-col items-center space-y-8">
          <FadeInWhenVisible>
            <div className="w-full max-w-6xl space-y-3 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
                What{" "}
                <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                  our clients
                </span>{" "}
                are saying
              </h2>
              <p className="text-lg text-brand-dark/60 dark:text-brand-cream/60">
                Real results from real businesses.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Carousel */}
          <div className="w-full overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="w-full flex-shrink-0 sm:w-[340px] md:w-[calc((100%-1.5rem)/2)] md:min-w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] lg:min-w-[calc((100%-3rem)/3)]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="flex h-full flex-col rounded-2xl border border-brand-light-gray/60 border-l-2 border-l-brand-orange/30 bg-brand-white p-6 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:border-l-brand-orange/30 dark:bg-[#1a1a19]">
                    <StarRating stars={testimonial.stars} />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-dark/70 dark:text-brand-cream/70">
                      <span className="font-semibold text-brand-dark dark:text-brand-cream">
                        &ldquo;{testimonial.highlight}&rdquo;
                      </span>{" "}
                      {testimonial.content}
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t border-brand-light-gray/40 pt-4 dark:border-brand-mid-gray/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/15 text-sm font-semibold text-brand-orange">
                        {testimonial.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-brand-dark dark:text-brand-cream">
                          {testimonial.author}
                        </span>
                        <span className="text-xs text-brand-mid-gray">
                          {testimonial.role} &middot; {testimonial.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToCard(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="rounded-full border border-brand-light-gray p-2 text-brand-dark/60 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange disabled:opacity-30 dark:border-brand-mid-gray/20 dark:text-brand-cream/60"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-brand-orange"
                      : "w-2 bg-brand-light-gray hover:bg-brand-orange/40 dark:bg-brand-mid-gray/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollToCard(currentIndex + 1)}
              disabled={currentIndex === TESTIMONIALS.length - 1}
              className="rounded-full border border-brand-light-gray p-2 text-brand-dark/60 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange disabled:opacity-30 dark:border-brand-mid-gray/20 dark:text-brand-cream/60"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
