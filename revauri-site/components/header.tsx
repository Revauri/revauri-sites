"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";

const navLinks = [
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
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-orange after:transition-all after:duration-300 ${
                  pathname === link.href
                    ? "text-brand-dark after:w-full dark:text-brand-cream"
                    : "text-brand-dark/70 after:w-0 hover:text-brand-dark hover:after:w-full dark:text-brand-cream/70 dark:hover:text-brand-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact#book"
              className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
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
              className="flex flex-col items-center gap-6 pt-16"
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
                    className={`text-lg font-medium transition-colors ${
                      pathname === link.href
                        ? "text-brand-orange"
                        : "text-brand-dark/70 hover:text-brand-dark dark:text-brand-cream/70 dark:hover:text-brand-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href="/contact#book"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 inline-block rounded-lg bg-brand-orange px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-orange/90"
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
