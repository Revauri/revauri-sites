import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-light-gray bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo suffix="Design" />
            <p className="mt-3 text-sm leading-relaxed text-brand-mid-gray">
              Handcrafted websites for small businesses that care about the details.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-mid-gray">
              Pages
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-dark/60 transition-colors duration-200 hover:text-brand-orange"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + legal */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-mid-gray">
              Contact
            </p>
            <a
              href="mailto:david.mercer@revauridesign.com"
              className="text-sm text-brand-dark/60 transition-colors duration-200 hover:text-brand-orange"
            >
              david.mercer@revauridesign.com
            </a>
            <address className="mt-3 text-sm not-italic leading-relaxed text-brand-mid-gray">
              725 Joralemon Street, Unit 127<br />
              Belleville, NJ 07109
            </address>
            <ul className="mt-5 flex gap-4">
              {[
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-brand-mid-gray transition-colors duration-200 hover:text-brand-orange"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-light-gray pt-6 text-center text-xs text-brand-mid-gray">
          &copy; 2026 Revauri LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
