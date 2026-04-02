"use client";

import Link from "next/link";
import { ArrowRight, Mail, BookOpen } from "lucide-react";
import { FadeInWhenVisible } from "@/components/motion-wrappers";

export function ContactContent() {
  return (
    <>
      {/* Contact Form */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <FadeInWhenVisible>
            <h2 className="mb-8 text-center text-2xl font-bold text-brand-dark dark:text-brand-cream sm:text-3xl">
              Send us a{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                message
              </span>
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.08}>
            <form
              action="https://formsubmit.co/joseph@revauri.com"
              method="POST"
              className="rounded-2xl border border-brand-light-gray/60 bg-brand-white p-8 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
            >
              {/* FormSubmit config */}
              <input type="hidden" name="_next" value="https://revauri.com/contact?sent=true" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New message from revauri.com" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} />

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream">
                    Name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream">
                    Email <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream">
                    Phone <span className="text-xs text-brand-mid-gray">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
                  />
                </div>

                {/* Company + Website side by side */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream">
                      Company Name <span className="text-xs text-brand-mid-gray">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your business name"
                      className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream">
                      Current Website <span className="text-xs text-brand-mid-gray">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      placeholder="https://yourbusiness.com"
                      className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
                    />
                  </div>
                </div>

                {/* How did you hear about us */}
                <div>
                  <label htmlFor="referral" className="mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream">
                    How did you hear about us? <span className="text-xs text-brand-mid-gray">(optional)</span>
                  </label>
                  <select
                    id="referral"
                    name="referral"
                    defaultValue=""
                    className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 px-4 py-3 text-sm text-brand-dark focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
                  >
                    <option value="" disabled className="text-brand-mid-gray">Select an option</option>
                    <option value="Google">Google</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Cold Email">Cold Email</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-dark dark:text-brand-cream">
                    Message <span className="text-brand-orange">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your project or what you're looking for..."
                    className="w-full rounded-lg border border-brand-light-gray bg-brand-cream/50 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 dark:border-brand-mid-gray/20 dark:bg-brand-dark/50 dark:text-brand-cream"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Other ways to reach us */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-2xl px-6">
          <FadeInWhenVisible>
            <h2 className="mb-8 text-center text-2xl font-bold text-brand-dark dark:text-brand-cream sm:text-3xl">
              Other ways to{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                reach us
              </span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid gap-4 sm:grid-cols-2">
            <FadeInWhenVisible delay={0.08}>
              <a
                href="mailto:joseph@revauri.com"
                className="group flex h-full w-full min-h-[96px] items-center gap-4 rounded-2xl border border-brand-light-gray/60 bg-brand-cream px-6 py-5 shadow-[var(--shadow-md)] transition-all duration-300 hover:border-brand-orange/30 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
              >
                <div className="shrink-0 rounded-xl bg-brand-orange/10 p-2.5 transition-colors duration-200 group-hover:bg-brand-orange">
                  <Mail className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                    Email Us
                  </h3>
                  <p className="text-xs text-brand-mid-gray">
                    We reply within a few hours
                  </p>
                  <p className="mt-1 text-xs font-medium text-brand-orange">
                    joseph@revauri.com &rarr;
                  </p>
                </div>
              </a>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.14}>
              <Link
                href="/faq"
                className="group flex h-full w-full min-h-[96px] items-center gap-4 rounded-2xl border border-brand-light-gray/60 bg-brand-cream px-6 py-5 shadow-[var(--shadow-md)] transition-all duration-300 hover:border-brand-orange/30 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]"
              >
                <div className="shrink-0 rounded-xl bg-brand-orange/10 p-2.5 transition-colors duration-200 group-hover:bg-brand-orange">
                  <BookOpen className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
                    Browse FAQ
                  </h3>
                  <p className="text-xs text-brand-mid-gray">
                    Answers to common questions
                  </p>
                  <p className="mt-1 text-xs font-medium text-brand-orange">
                    View FAQ &rarr;
                  </p>
                </div>
              </Link>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </>
  );
}
