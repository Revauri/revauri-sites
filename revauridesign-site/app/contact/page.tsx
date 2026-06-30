import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Revauri Design",
  description:
    "Get in touch with Revauri Design. Email david.mercer@revauridesign.com to start a project or ask a question. We typically reply within a couple of business days.",
  alternates: { canonical: "https://revauridesign.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b border-brand-light-gray bg-brand-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Contact
            </p>
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[1.1] tracking-tight text-brand-dark sm:text-6xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-dark/60">
            The best first step is a short email. Tell us what you&apos;re building,
            what you have now, and what you&apos;re hoping to change. We&apos;ll take it from
            there.
          </p>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_480px]">
            {/* Left: contact info */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                  <Mail className="h-4 w-4 text-brand-orange" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">Email</p>
                  <a
                    href="mailto:david.mercer@revauridesign.com"
                    className="mt-1 block text-brand-orange hover:underline"
                  >
                    david.mercer@revauridesign.com
                  </a>
                  <p className="mt-1 text-sm text-brand-mid-gray">
                    We typically reply within a couple of business days.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                  <MapPin className="h-4 w-4 text-brand-orange" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">Mailing address</p>
                  <address className="mt-1 text-sm not-italic leading-relaxed text-brand-mid-gray">
                    Revauri LLC<br />
                    725 Joralemon Street, Unit 127<br />
                    Belleville, NJ 07109
                  </address>
                  <p className="mt-2 text-sm text-brand-mid-gray">
                    We work remotely with clients across the United States.
                  </p>
                </div>
              </div>

              <div className="mt-12 rounded-2xl border border-brand-light-gray bg-[#F5F2EC] p-6">
                <p className="text-sm font-semibold text-brand-dark">What to include in your message</p>
                <ul className="mt-4 space-y-2">
                  {[
                    "A brief description of your business",
                    "Whether you have an existing site or are starting fresh",
                    "What you're looking to achieve with a new site",
                    "Any timeline or budget constraints worth knowing",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-brand-dark/60">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: contact form */}
            <div>
              <form
                action="https://formsubmit.co/david.mercer@revauridesign.com"
                method="POST"
                className="space-y-5"
              >
                {/* FormSubmit config */}
                <input type="hidden" name="_subject" value="New project inquiry — Revauri Design" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" className="hidden" />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-dark">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 block w-full rounded-lg border border-brand-light-gray bg-brand-white px-4 py-3 text-sm text-brand-dark placeholder-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-dark">
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-2 block w-full rounded-lg border border-brand-light-gray bg-brand-white px-4 py-3 text-sm text-brand-dark placeholder-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="business" className="block text-sm font-medium text-brand-dark">
                    Business name
                  </label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    autoComplete="organization"
                    className="mt-2 block w-full rounded-lg border border-brand-light-gray bg-brand-white px-4 py-3 text-sm text-brand-dark placeholder-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                    placeholder="Acme Co."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-dark">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 block w-full resize-none rounded-lg border border-brand-light-gray bg-brand-white px-4 py-3 text-sm text-brand-dark placeholder-brand-mid-gray focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                    placeholder="What do you need, and where are you starting from?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange/90 hover:shadow-lg"
                >
                  Send message
                </button>

                <p className="text-center text-xs text-brand-mid-gray">
                  Prefer to email directly?{" "}
                  <a
                    href="mailto:david.mercer@revauridesign.com"
                    className="text-brand-orange hover:underline"
                  >
                    david.mercer@revauridesign.com
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
