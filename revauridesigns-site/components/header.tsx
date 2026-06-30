"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(51, 65, 85, 0.6)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Revauri Designs home"
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "#2dd4bf",
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
            aria-hidden="true"
          />
          <span
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="text-lg font-bold tracking-tight text-[#f8fafc]"
          >
            Revauri{" "}
            <span className="text-[#2dd4bf]">Designs</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "text-sm font-medium tracking-wide transition-colors duration-150",
                pathname === link.href
                  ? "text-[#2dd4bf]"
                  : "text-[#94a3b8] hover:text-[#f8fafc]",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{ background: "#2dd4bf" }}
            className="rounded-sm px-4 py-2 text-sm font-semibold text-[#0f172a] transition-opacity duration-150 hover:opacity-90"
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded p-2 text-[#94a3b8] hover:text-[#f8fafc] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          className="border-t border-[#334155] px-6 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                    pathname === link.href
                      ? "bg-[#1e293b] text-[#2dd4bf]"
                      : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc]",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
