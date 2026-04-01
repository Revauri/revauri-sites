"use client";

import { ChevronUp } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-t-brand-orange/20 bg-brand-dark py-12">
      {/* Blur orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Top row: Logo + Back to top */}
        <div className="flex items-center justify-between">
          <Logo variant="dark" />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-sm text-brand-mid-gray transition-colors hover:text-brand-cream"
          >
            Back to top
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-4 text-sm text-brand-mid-gray">
          Modern websites for businesses that are ready to grow
        </p>

        {/* Nav links */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "About", href: "#about" },
            { label: "FAQ", href: "#faq" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-brand-mid-gray transition-colors hover:text-brand-cream"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 h-px bg-brand-mid-gray/20" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-brand-mid-gray">
            &copy; 2026 Revauri LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:joseph@revauri.com"
              className="text-sm text-brand-mid-gray transition-colors hover:text-brand-cream"
            >
              joseph@revauri.com
            </a>
            <span className="text-brand-mid-gray/40">|</span>
            <a
              href="#"
              className="text-sm text-brand-mid-gray transition-colors hover:text-brand-cream"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
