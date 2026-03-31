"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle /book deep link
  useEffect(() => {
    if (window.location.pathname === "/book") {
      setTimeout(() => {
        document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-white/95 shadow-sm backdrop-blur-sm"
            : "bg-brand-cream"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0.5">
            <span className="text-xl font-bold tracking-tight text-brand-dark">
              Revauri
            </span>
            <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-dark/70 transition-colors hover:text-brand-dark"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              Book a Free Call
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay — rendered outside <header> to avoid sticky containment */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-brand-white md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <a
              href="#"
              className="flex items-center gap-0.5"
              onClick={handleNavClick}
            >
              <span className="text-xl font-bold tracking-tight text-brand-dark">
                Revauri
              </span>
              <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
            </a>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-6 pt-16">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-lg font-medium text-brand-dark/70 transition-colors hover:text-brand-dark"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={handleNavClick}
              className="mt-4 rounded-lg bg-brand-orange px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-orange/90"
            >
              Book a Free Call
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
