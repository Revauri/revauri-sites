"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInWhenVisible } from "./motion-wrappers";

const TESTIMONIALS = [
  {
    highlight: "Our leads tripled in the first month after launch.",
    content:
      "We'd been running the same site for 5 years. Revauri rebuilt it and the difference was immediate. More calls, more form fills, more people actually finding us on Google.",
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
    highlight: "The attention to detail was unreal.",
    content:
      "I needed a site for a product launch. Joseph and team nailed every detail — the copy, the layout, the mobile experience. It looked like we'd spent months on it. Mobile-perfect, fast, and the copy actually sounds like us.",
    author: "Alex M.",
    role: "Co-founder, GreenLeaf Supplements",
    location: "Portland, OR",
    stars: 4.5,
  },
  {
    highlight: "We went from invisible online to ranking on page one.",
    content:
      "Our old site wasn't even showing up on Google. Revauri rebuilt everything with SEO baked in from day one. Within two months, we were ranking for keywords we'd been chasing for years.",
    author: "Marcus J.",
    role: "Owner, Precision Auto Detail",
    location: "Atlanta, GA",
    stars: 4,
  },
  {
    highlight: "Best money I've ever spent on my business.",
    content:
      "I was paying a WordPress developer $200/month and still had issues. Revauri gave me a site that's 10x better, faster, and I never have to think about it. The retainer pays for itself.",
    author: "Priya S.",
    role: "Founder, Bloom Wellness Studio",
    location: "San Diego, CA",
    stars: 5,
  },
  {
    highlight: "They actually listen and deliver exactly what you ask for.",
    content:
      "Other agencies showed me generic templates and told me to 'trust the process.' Joseph asked real questions, understood my customers, and built something that feels like it was made just for us.",
    author: "Tom B.",
    role: "Director, Horizon Property Management",
    location: "Phoenix, AZ",
    stars: 4.5,
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
        return (
          <span key={i} className="text-amber-400/20">
            ★
          </span>
        );
      })}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
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
          {testimonial.author
            .split(" ")
            .map((n) => n[0])
            .join("")}
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
  );
}

const ARROW_CLASS =
  "rounded-full border border-brand-light-gray p-2.5 text-brand-dark/60 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange disabled:opacity-30 dark:border-brand-mid-gray/20 dark:text-brand-cream/60";

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Track whether we're on desktop (lg breakpoint = 1024px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const scrollByPage = useCallback((direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = direction === "next" ? container.clientWidth : -container.clientWidth;
    container.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  // Sync currentIndex from scroll position (for dots + arrow disable states)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const children = Array.from(container.children) as HTMLElement[];
        let closestIndex = 0;
        let closestDistance = Infinity;
        children.forEach((child, i) => {
          const distance = Math.abs(child.offsetLeft - scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        });
        setCurrentIndex(closestIndex);
      }, 80);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Auto-advance on mobile/tablet only (not desktop)
  useEffect(() => {
    if (isDesktop || isPaused || prefersReducedMotion) return;
    const id = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;
      const atEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 4;
      if (atEnd) {
        container.scrollTo({ left: 0, behavior: "instant" });
      } else {
        container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(id);
  }, [isDesktop, isPaused, prefersReducedMotion]);

  const atStart = currentIndex === 0;
  // For desktop (3 visible) we have pages 0,1,2; tablet (2 visible) pages 0,1,2,3; mobile pages 0-4
  // We derive "at end" from the scroll position rather than index to handle all breakpoints
  const atEnd = (() => {
    const container = scrollRef.current;
    if (!container) return currentIndex === TESTIMONIALS.length - 1;
    return container.scrollLeft + container.clientWidth >= container.scrollWidth - 4;
  })();

  // Number of dot indicators: depends on visible cards per breakpoint
  // We show dots only on mobile/tablet (hidden on lg). On mobile: 5 dots, on md: fewer pages.
  // Simplest: always show 5 dots, hide on lg.
  const dots = TESTIMONIALS.map((_, i) => i);

  return (
    <div className="w-full">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-1"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.author}
            className="w-full shrink-0 md:w-[calc((100%-1.5rem)/2)] md:min-w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] lg:min-w-[calc((100%-3rem)/3)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* Pagination: arrows + dots underneath */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => scrollByPage("prev")}
          disabled={atStart}
          className={`${ARROW_CLASS} flex items-center justify-center`}
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {dots.map((i) => (
            <button
              key={i}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                const card = container.children[i] as HTMLElement;
                if (card) {
                  container.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
                }
              }}
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
          onClick={() => scrollByPage("next")}
          disabled={atEnd}
          className={`${ARROW_CLASS} flex items-center justify-center`}
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center space-y-8">
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

          <div className="w-full">
            <TestimonialsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
