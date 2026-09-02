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
  "hairline-card relative overflow-hidden p-6 sm:p-8 shadow-[var(--shadow-md)]";

const FORM_ACCENT_CLASS =
  "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-orange/60 via-brand-orange/20 to-transparent";

const FIELD_CLASS =
  "w-full min-w-0 max-w-full rounded-lg border border-black/[0.08] bg-white/70 px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-mid-gray outline-none transition-[border-color,box-shadow] hover:border-black/[0.14] focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/15 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-brand-cream dark:hover:border-white/[0.14]";

const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream";

const PRIMARY_BUTTON_CLASS =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:brightness-[1.04] hover:shadow-[0_10px_28px_-12px_rgba(217,119,87,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

const SUCCESS_PATH = "/contact?sent=true";

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
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
      <div className="section-measure grid items-start gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <FadeInWhenVisible className="lg:sticky lg:top-28">
          <p className="section-eyebrow">Direct line</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl dark:text-brand-cream">
            Reach us directly
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

          <div className="hairline-card mt-8 p-4">
            <div className="flex items-start gap-3">
              <span className="icon-tile shrink-0">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-brand-dark/55 dark:text-brand-cream/55">
                  Looking for a quick answer?
                </p>
                <Link
                  href="/faq"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  Browse the FAQ
                </Link>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.08}>
          {isSubmitted ? (
            <div className={FORM_CARD_CLASS}>
              <div aria-hidden className={FORM_ACCENT_CLASS} />
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/12 ring-1 ring-brand-orange/20">
                  <CheckCircle2 className="h-8 w-8 text-brand-orange" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-brand-dark dark:text-brand-cream">
                  Message received
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-brand-dark/65 dark:text-brand-cream/65">
                  Thanks for reaching out. We&apos;ve got your note and someone from Revauri AI
                  will follow up shortly, usually within a few hours.
                </p>
                <div className="mt-6 grid w-full gap-3 text-left sm:grid-cols-2">
                  <div className="hairline-card p-4">
                    <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                      What happens next
                    </p>
                    <p className="mt-2 text-xs leading-5 text-brand-dark/60 dark:text-brand-cream/60">
                      We&apos;ll read what you sent, reply by email, and tell you whether we
                      can take that job off you.
                    </p>
                  </div>
                  <div className="hairline-card p-4">
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
                    className={`${PRIMARY_BUTTON_CLASS} flex-1 sm:w-auto`}
                  >
                    Hire one
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-brand-light-gray bg-brand-white/70 px-6 py-3.5 text-base font-semibold text-brand-dark transition-colors duration-200 hover:border-brand-orange/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-brand-mid-gray/20 dark:bg-brand-dark/70 dark:text-brand-cream"
                  >
                    Send Another Message
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
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
              <div aria-hidden className={FORM_ACCENT_CLASS} />
              {/* Web3Forms config */}
              <input type="hidden" name="access_key" value="84431b19-9bc8-45f0-a60a-eb6d683a0008" />
              <input type="hidden" name="redirect" value={successUrl} />
              <input type="hidden" name="subject" value="New message from revauri.ai" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />

              <div className="relative space-y-5">
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
                  className={PRIMARY_BUTTON_CLASS}
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
    "group -mx-2 flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 text-brand-dark/80 outline-none transition-colors hover:bg-black/[0.03] hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:text-brand-cream/80 dark:hover:bg-white/[0.04] dark:hover:text-brand-cream";

  const content = (
    <>
      <span className="icon-tile">{icon}</span>
      <span className="min-w-0 break-words text-[15px]">{label}</span>
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
