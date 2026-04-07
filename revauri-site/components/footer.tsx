"use client";

import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { Logo } from "./logo";

const YEAR = new Date().getFullYear();

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-brand-light-gray dark:border-brand-mid-gray/20">
      <div className="bg-brand-white pt-10 pb-8 dark:bg-brand-dark lg:pt-12 lg:pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            <div className="flex flex-col space-y-2.5">
              <FooterGroupHeading>Services</FooterGroupHeading>
              <ul className="flex flex-col space-y-2">
                <FooterLink>
                  <Link href="/pricing">Pricing</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/portfolio">Portfolio</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/#how-it-works">How It Works</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/book">Book a Call</Link>
                </FooterLink>
              </ul>
            </div>

            <div className="flex flex-col space-y-2.5">
              <FooterGroupHeading>Company</FooterGroupHeading>
              <ul className="flex flex-col space-y-2">
                <FooterLink>
                  <Link href="/about">About</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/faq">FAQ</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/contact">Contact</Link>
                </FooterLink>
              </ul>
            </div>

            <div className="flex flex-col space-y-2.5">
              <FooterGroupHeading>Legal</FooterGroupHeading>
              <ul className="flex flex-col space-y-2">
                <FooterLink>
                  <Link href="/privacy">Privacy Policy</Link>
                </FooterLink>
                <FooterLink>
                  <Link href="/terms">Terms of Service</Link>
                </FooterLink>
              </ul>
            </div>

            <div className="flex flex-col space-y-2.5">
              <FooterGroupHeading>Get in Touch</FooterGroupHeading>
              <ul className="flex flex-col space-y-2">
                <FooterLink>
                  <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>
                </FooterLink>
                <FooterLink>
                  <Link href="/contact">Send a message</Link>
                </FooterLink>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
      </div>

      <div className="bg-brand-white py-6 dark:bg-brand-dark lg:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-sm text-brand-mid-gray transition-colors hover:text-brand-dark dark:hover:text-brand-cream"
            >
              Back to top
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-brand-light-gray dark:bg-brand-mid-gray/20" />
      </div>

      <div className="bg-brand-white pt-6 pb-8 dark:bg-brand-dark lg:pt-8 lg:pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4">
            <Logo variant="auto" />
            <p className="text-sm text-brand-mid-gray">
              Custom websites for founders and businesses that refuse to settle.
            </p>
            <p className="text-xs text-brand-mid-gray/70">
              &copy; {YEAR} Revauri LLC. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroupHeading({ children }: React.PropsWithChildren) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
      {children}
    </p>
  );
}

function FooterLink({ children }: React.PropsWithChildren) {
  return (
    <li className="text-xs text-brand-dark/70 dark:text-brand-cream/70 [&>a]:transition-colors [&>a]:duration-200 [&>a]:hover:text-brand-orange">
      {children}
    </li>
  );
}
