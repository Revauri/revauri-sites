"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { FAQAccordion } from "./faq-accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

function slugify(category: string) {
  return "faq-" + category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function FAQContent({ data }: { data: FAQCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(data[0]?.category ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isClickScrolling = useRef(false);

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    data.forEach(({ category }) => {
      const el = sectionRefs.current.get(category);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isClickScrolling.current) {
            setActiveCategory(category);
          }
        },
        { threshold: 0.1, rootMargin: "-100px 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [data]);

  const scrollToCategory = useCallback((category: string) => {
    const el = sectionRefs.current.get(category);
    if (!el) return;
    setActiveCategory(category);
    isClickScrolling.current = true;
    const headerOffset = 100;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
    // Re-enable scroll spy after animation settles
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  // Filter logic
  const trimmedQuery = query.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const filteredData: FAQCategory[] = isSearching
    ? data
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(trimmedQuery) ||
              item.answer.toLowerCase().includes(trimmedQuery)
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : data;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
      {/* Search bar */}
      <div className="relative mb-10">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-mid-gray" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 py-3 pl-10 pr-4 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream dark:placeholder:text-brand-mid-gray/60"
        />
      </div>

      {/* Search results: flat list */}
      {isSearching ? (
        filteredData.length === 0 ? (
          <p className="py-16 text-center text-sm text-brand-dark/50 dark:text-brand-cream/40">
            No results found for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="space-y-10">
            {filteredData.map((cat) => (
              <div key={cat.category}>
                <h2 className="mb-4 text-lg font-semibold text-brand-orange">
                  {cat.category}
                </h2>
                <FAQAccordion items={cat.items} />
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          {/* Mobile: horizontal scrollable pills */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden" style={{ scrollbarWidth: "none" }}>
            {data.map(({ category }) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-brand-orange text-white"
                    : "bg-brand-light-gray/40 text-brand-dark/60 hover:bg-brand-light-gray/70 dark:bg-brand-mid-gray/20 dark:text-brand-cream/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Desktop: sidebar + content grid */}
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
            {/* Sticky sidebar — desktop only */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24 flex flex-col gap-1">
                {data.map(({ category }) => (
                  <button
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    className={`w-full rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                      activeCategory === category
                        ? "border-l-2 border-brand-orange bg-brand-orange/10 font-semibold text-brand-orange"
                        : "border-l-2 border-transparent text-brand-dark/60 hover:bg-brand-orange/[0.03] hover:text-brand-dark dark:text-brand-cream/60 dark:hover:text-brand-cream"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="space-y-12">
              {data.map(({ category, items }) => (
                <section
                  key={category}
                  id={slugify(category)}
                  ref={(el) => {
                    if (el) sectionRefs.current.set(category, el);
                    else sectionRefs.current.delete(category);
                  }}
                >
                  <h2 className="mb-4 text-lg font-semibold text-brand-orange">
                    {category}
                  </h2>
                  <FAQAccordion items={items} />
                </section>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
