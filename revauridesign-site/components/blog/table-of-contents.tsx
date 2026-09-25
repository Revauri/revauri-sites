"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/toc";

function TocList({ headings, activeSlug }: { headings: TocEntry[]; activeSlug: string | null }) {
  return (
    <ul className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.slug} className={heading.depth === 3 ? "ml-4" : ""}>
          <a
            href={`#${heading.slug}`}
            aria-current={activeSlug === heading.slug ? "location" : undefined}
            className={`block border-l-2 py-0.5 pl-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
              activeSlug === heading.slug
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-brand-dark/60 hover:text-brand-dark dark:text-brand-cream/60 dark:hover:text-brand-cream"
            }`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="lg:h-full">
      {/* Mobile / tablet: collapsed by default so it never pushes the article down */}
      <details className="mb-8 rounded-xl border border-brand-light-gray/60 bg-brand-white p-4 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-brand-dark dark:text-brand-cream">
          On this page
        </summary>
        <div className="mt-4">
          <TocList headings={headings} activeSlug={activeSlug} />
        </div>
      </details>

      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <p className="mb-3 text-sm font-semibold text-brand-dark dark:text-brand-cream">
          On this page
        </p>
        <TocList headings={headings} activeSlug={activeSlug} />
      </div>
    </nav>
  );
}
