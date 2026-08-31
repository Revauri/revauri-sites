"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, BookOpen, RotateCcw } from "lucide-react";
import { FadeInWhenVisible } from "@/components/motion-wrappers";
import {
  onConsentChanged,
  resetContactFormLeadDedup,
  trackContactFormLead,
} from "@/lib/analytics";

type ContactContentProps = {
  isSubmitted?: boolean;
};

const FORM_CARD_CLASS =
  "hairline-card p-6 sm:p-8";

const FIELD_CLASS =
  "w-full rounded-[10px] border border-black/[0.08] bg-white/60 px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-mid-gray outline-none transition-[border-color,box-shadow] focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/15 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-brand-cream";

const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream";

const SUCCESS_PATH = "/contact?sent=true";

const ICON_SQUARE_CLASS =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-black/[0.08] text-brand-dark/70 dark:border-white/[0.08] dark:text-brand-cream/70";

export function ContactContent({ isSubmitted = false }: ContactContentProps) {
  // Web3Forms needs an absolute redirect URL, so build it from the current
  // origin once mounted — that keeps local submissions on localhost instead
  // of bouncing to another Revauri domain.
  const [successUrl, setSuccessUrl] = useState(`https://revauri.ai${SUCCESS_PATH}`);

  useEffect(() => {
    setSuccessUrl(`${window.location.origin}${SUCCESS_PATH}`);
  }, []);

  // Tracks the confirmed success view as a lead exactly once. If the
  // visitor hasn't granted analytics consent yet, trackContactFormLead()
  // no-ops; re-running it on every consent change catches the case where
  // they accept while still on this success page (but never if declined).
  useEffect(() => {
    if (!isSubmitted) {
      resetContactFormLeadDedup();
      return;
    }
    trackContactFormLead();
    return onConsentChanged(() => trackContactFormLead());
  }, [isSubmitted]);

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <FadeInWhenVisible className="lg:sticky lg:top-28">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-dark dark:text-brand-cream">
            Get in touch
          </h2>
          <p className="mt-3 text-brand-dark/60 dark:text-brand-cream/60">
            We typically respond within a few hours.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <ContactMethod
              href="mailto:joseph@revauri.com"
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              label="joseph@revauri.com"
            />
            <ContactMethod
              href="/book"
              icon={<Phone className="h-4 w-4" aria-hidden="true" />}
              label="Hire one"
              internal
            />
            <ContactMethod
              href="https://maps.google.com/?q=725+Joralemon+Street,+Unit+127,+Belleville,+NJ+07109"
              icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
              label="725 Joralemon St, Unit 127, Belleville, NJ"
              external
            />
          </ul>

          <p className="mt-8 text-sm text-brand-dark/55 dark:text-brand-cream/55">
            Looking for a quick answer?
          </p>
          <Link
            href="/faq"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Browse the FAQ
          </Link>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.08}>
          {isSubmitted ? (
            <div className={`${FORM_CARD_CLASS} relative overflow-hidden`}>
              <div
                className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-brand-orange/15 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/12 ring-1 ring-brand-orange/20">
                  <CheckCircle2 className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-brand-dark dark:text-brand-cream">
                  Message received
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-brand-dark/65 dark:text-brand-cream/65">
                  Thanks for reaching out. We&apos;ve got your note and someone from Revauri AI
                  will follow up shortly, usually within a few hours.
                </p>
                <div className="mt-6 grid w-full gap-3 rounded-2xl border border-brand-light-gray/50 bg-brand-cream/60 p-4 text-left dark:border-brand-mid-gray/20 dark:bg-brand-dark/40 sm:grid-cols-2">
                  <div className="rounded-xl border border-brand-light-gray/40 bg-brand-white/70 p-4 dark:border-brand-mid-gray/20 dark:bg-[#181817]">
                    <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                      What happens next
                    </p>
                    <p className="mt-2 text-xs leading-5 text-brand-dark/60 dark:text-brand-cream/60">
                      We&apos;ll read what you sent, reply by email, and tell you whether we
                      can take that job off you.
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-light-gray/40 bg-brand-white/70 p-4 dark:border-brand-mid-gray/20 dark:bg-[#181817]">
                    <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                      Need to talk sooner?
                    </p>
                    <p className="mt-2 text-xs leading-5 text-brand-dark/60 dark:text-brand-cream/60">
                      Pick a time instead if you&apos;d rather talk it through out
                      loud. No obligation.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                  <Link
                    href="/book"
                    className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  >
                    Hire one
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-brand-orange/25 px-6 py-3.5 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  >
                    Send Another Message
                    <RotateCcw className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className={FORM_CARD_CLASS}
            >
              {/* Web3Forms config */}
              <input type="hidden" name="access_key" value="84431b19-9bc8-45f0-a60a-eb6d683a0008" />
              <input type="hidden" name="redirect" value={successUrl} />
              <input type="hidden" name="subject" value="New message from revauri.ai" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={LABEL_CLASS}>
                    Name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>
                    Email <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={LABEL_CLASS}>
                    Phone <span className="text-xs text-brand-mid-gray">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    className={FIELD_CLASS}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className={LABEL_CLASS}>
                      Company Name <span className="text-xs text-brand-mid-gray">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your business name"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className={LABEL_CLASS}>
                      Current Website <span className="text-xs text-brand-mid-gray">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      placeholder="https://yourbusiness.com"
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="referral" className={LABEL_CLASS}>
                    How did you hear about us? <span className="text-xs text-brand-mid-gray">(optional)</span>
                  </label>
                  <select
                    id="referral"
                    name="referral"
                    defaultValue=""
                    className={FIELD_CLASS}
                  >
                    <option value="" disabled className="text-brand-mid-gray">Select an option</option>
                    <option value="Google">Google</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Cold Email">Cold Email</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={LABEL_CLASS}>
                    Message <span className="text-brand-orange">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us the job you'd otherwise put someone on payroll to do..."
                    className={FIELD_CLASS}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-brand-orange/90 hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

function ContactMethod({
  href,
  icon,
  label,
  internal = false,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  internal?: boolean;
  external?: boolean;
}) {
  const className =
    "group flex items-center gap-3 rounded-lg text-brand-dark/80 outline-none transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:text-brand-cream/80 dark:hover:text-brand-cream";

  const content = (
    <>
      <span className={ICON_SQUARE_CLASS}>{icon}</span>
      <span>{label}</span>
    </>
  );

  if (internal) {
    return (
      <li>
        <Link href={href} className={className}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    </li>
  );
}
