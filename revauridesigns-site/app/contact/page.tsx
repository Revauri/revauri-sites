import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Revauri Designs",
  description:
    "Reach out to Revauri Designs. Email us at ryan.calloway@revauridesigns.com — we typically reply within a couple of business days.",
  alternates: { canonical: "https://revauridesigns.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Email is the best way to reach us. We typically reply within a couple of business days."
      />

      <section className="bg-[#0f172a] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#2dd4bf]" strokeWidth={1.5} />
                  <p
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="text-xs font-semibold uppercase tracking-widest text-[#64748b]"
                  >
                    Email
                  </p>
                </div>
                <a
                  href="mailto:ryan.calloway@revauridesigns.com"
                  className="text-base font-medium text-[#f8fafc] underline underline-offset-4 decoration-[#334155] transition-colors hover:text-[#2dd4bf] hover:decoration-[#2dd4bf]"
                >
                  ryan.calloway@revauridesigns.com
                </a>
                <p className="mt-2 text-sm text-[#64748b]">
                  We typically reply within a couple of business days.
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#2dd4bf]" strokeWidth={1.5} />
                  <p
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="text-xs font-semibold uppercase tracking-widest text-[#64748b]"
                  >
                    Mailing address
                  </p>
                </div>
                <address className="not-italic text-sm leading-relaxed text-[#94a3b8]">
                  Revauri LLC<br />
                  725 Joralemon Street, Unit 127<br />
                  Belleville, NJ 07109
                </address>
              </div>

              <div
                style={{ borderLeft: "2px solid #2dd4bf" }}
                className="pl-4"
              >
                <p className="text-sm leading-relaxed text-[#64748b]">
                  We work remotely with businesses across the United States. All project communication happens over email and video — no office visit required.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-sm border border-[#334155] bg-[#1e293b] p-8">
              <p
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="mb-6 text-sm font-semibold text-[#f8fafc]"
              >
                Send a message
              </p>
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="access_key" value="84431b19-9bc8-45f0-a60a-eb6d683a0008" />
                <input type="hidden" name="subject" value="New inquiry from revauridesigns.com" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />

                <div>
                  <label
                    htmlFor="name"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#64748b]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-sm border border-[#334155] bg-[#0f172a] px-4 py-3 text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors focus:border-[#2dd4bf]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#64748b]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-sm border border-[#334155] bg-[#0f172a] px-4 py-3 text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors focus:border-[#2dd4bf]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#64748b]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project or what you're looking for"
                    className="w-full rounded-sm border border-[#334155] bg-[#0f172a] px-4 py-3 text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors focus:border-[#2dd4bf]"
                  />
                </div>

                <button
                  type="submit"
                  style={{ background: "#2dd4bf" }}
                  className="rounded-sm px-6 py-3 text-sm font-semibold text-[#0f172a] transition-opacity hover:opacity-90"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
