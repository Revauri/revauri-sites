import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid #334155" }}
      className="bg-[#0f172a] px-6 py-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 22,
                  height: 22,
                  background: "#2dd4bf",
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
                aria-hidden="true"
              />
              <span
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="text-sm font-bold tracking-tight text-[#f8fafc]"
              >
                Revauri <span className="text-[#2dd4bf]">Designs</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
              Custom website design and development for US small and medium businesses. Remote-first. Built to perform.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#64748b]"
            >
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/process", label: "Process" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94a3b8] transition-colors hover:text-[#f8fafc]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#64748b]"
            >
              Contact
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#94a3b8]">
              <a
                href="mailto:ryan.calloway@revauridesigns.com"
                className="break-all transition-colors hover:text-[#2dd4bf]"
              >
                ryan.calloway@revauridesigns.com
              </a>
              <address className="not-italic leading-relaxed">
                725 Joralemon Street, Unit 127<br />
                Belleville, NJ 07109
              </address>
            </div>
            <div className="mt-6 flex gap-4">
              <Link
                href="/privacy"
                className="text-xs text-[#64748b] transition-colors hover:text-[#94a3b8]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[#64748b] transition-colors hover:text-[#94a3b8]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid #1e293b" }}
          className="mt-10 pt-6 text-xs text-[#64748b]"
        >
          &copy; 2026 Revauri LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
