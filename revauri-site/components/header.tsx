"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";

const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-white/95 shadow-[var(--shadow-md)] backdrop-blur-sm dark:bg-brand-dark/95"
            : "bg-brand-cream dark:bg-brand-dark"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-5 md:flex lg:gap-6"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-[0.8125rem] font-medium uppercase tracking-wider transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-orange after:transition-[width] after:duration-300 after:ease-out ${
                    pathname === link.href
                      ? "text-brand-dark after:w-full dark:text-brand-cream"
                      : "text-brand-dark/65 after:w-0 hover:text-brand-dark hover:after:w-full dark:text-brand-cream/65 dark:hover:text-brand-cream"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <span
              aria-hidden
              className="h-5 w-px shrink-0 bg-brand-orange/45 dark:bg-brand-orange/50"
            />
            <Link
              href="/book"
              className="rounded-xl bg-brand-orange px-5 py-[0.55rem] text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_14px_-2px_rgba(217,119,87,0.45)] transition-[box-shadow,filter] duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(217,119,87,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange active:brightness-[0.97]"
            >
              Book a Free Call
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 md:hidden dark:text-brand-cream"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-brand-white md:hidden dark:bg-brand-dark"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
                <Logo />
              </Link>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light-gray/50 dark:text-brand-cream"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              className="flex flex-col items-center gap-5 pt-16"
              aria-label="Main navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`relative pb-1 text-lg font-medium uppercase tracking-wider transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-brand-orange after:transition-[width] after:duration-300 after:ease-out ${
                      pathname === link.href
                        ? "text-brand-dark after:w-10 dark:text-brand-cream"
                        : "text-brand-dark/65 hover:text-brand-dark hover:after:w-10 dark:text-brand-cream/65 dark:hover:text-brand-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: { opacity: 1, scaleX: 1 },
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-2 h-px w-12 origin-center bg-brand-orange/45 dark:bg-brand-orange/50"
                aria-hidden
              />
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href="/book"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-block rounded-xl bg-brand-orange px-8 py-[0.6875rem] text-base font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_14px_-2px_rgba(217,119,87,0.45)] transition-[box-shadow,filter] duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(217,119,87,0.55)] active:brightness-[0.97]"
                >
                  Book a Free Call
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
