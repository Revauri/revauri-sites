import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Revauri Design",
  description:
    "Revauri Design's privacy policy. Learn how we collect, use, and protect your information at revauridesign.com.",
  alternates: { canonical: "https://revauridesign.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-brand-light-gray bg-brand-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Legal
            </p>
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[1.1] tracking-tight text-brand-dark sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-brand-mid-gray">Last updated: June 29, 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-20 [&_a]:text-brand-orange [&_a]:hover:underline [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand-dark [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-brand-dark [&_li]:text-brand-dark/70 [&_p]:leading-relaxed [&_p]:text-brand-dark/70">

        <h2>1. Overview</h2>
        <p>
          Revauri LLC (&quot;Revauri Design,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a New Jersey limited liability
          company. Address: 725 Joralemon Street, Unit 127, Belleville, NJ 07109. This Privacy
          Policy describes how we collect, use, and share information when you visit
          revauridesign.com, receive communications from us, or engage with our services. By
          using our website or services, you agree to the practices described in this policy.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>Information You Provide</h3>
        <ul>
          <li>Name, email address, and business name when you contact us or submit a project inquiry</li>
          <li>Business website URL when you request a redesign or service review</li>
          <li>Content and materials you provide during a project (logos, photos, copy)</li>
          <li>Any additional information you share in emails or calls</li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <ul>
          <li>Usage data: pages visited, time on site, referral source, interactions</li>
          <li>Device and browser information (type, operating system, screen resolution)</li>
          <li>IP address (used for analytics and security; anonymized where possible)</li>
          <li>Cookies and similar technologies (see Cookies section below)</li>
        </ul>

        <h3>Information from Public Sources</h3>
        <p>
          We collect business information from publicly available sources and third-party data
          providers for the purpose of identifying businesses that may benefit from our services.
          This may include: business name, business owner name, business website URL, publicly
          listed email addresses, publicly listed phone numbers, industry and company size. This
          information is used solely for business-to-business outreach and is not used to contact
          individuals in their personal capacity.
        </p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve our website design and hosting services</li>
          <li>To communicate with you about your project or inquiry</li>
          <li>To identify businesses that may benefit from our services and conduct outreach</li>
          <li>To respond to your inquiries and support requests</li>
          <li>To analyze website usage and enhance user experience</li>
          <li>To comply with legal obligations and enforce our terms</li>
        </ul>

        <h2>4. Cold Outreach and Opt-Out</h2>
        <p>
          We may contact business owners and decision-makers via email to introduce our services.
          These communications are sent to business email addresses obtained from publicly
          available sources and third-party data providers. Every outreach email includes a clear
          way to opt out. If you reply with &quot;unsubscribe&quot; or otherwise request to be removed, we
          will: add your email address to our permanent suppression list, cease all future
          outreach to that address, and complete the removal within 10 business days (typically
          within 72 hours). Suppression list records are maintained indefinitely to ensure we do
          not contact you again. If you received an email from us and would like to be removed,
          contact{" "}
          <a href="mailto:david.mercer@revauridesign.com">david.mercer@revauridesign.com</a>.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>We use the following services that may process your data:</p>
        <ul>
          <li>
            <strong>Vercel</strong> &mdash; Website hosting and performance infrastructure
          </li>
          <li>
            <strong>Web3Forms</strong> &mdash; Contact form submissions (no account required)
          </li>
          <li>
            <strong>Google Analytics</strong> &mdash; Website analytics (with IP anonymization enabled, if used)
          </li>
        </ul>
        <p>
          We also use third-party data providers for business contact information and
          third-party email delivery platforms for sending communications. Each third-party
          service operates under its own privacy policy and terms.
        </p>

        <h2>6. Data Sharing</h2>
        <p>
          We do not sell your personal information. We do not share your personal information
          for cross-context behavioral advertising. We share information only in these circumstances:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong>: With third-party services that help us operate our
            business (hosting, analytics, email delivery), under agreements that require them to
            protect your data
          </li>
          <li>
            <strong>Legal requirements</strong>: When required by law, regulation, legal process,
            or governmental request
          </li>
          <li>
            <strong>Business transfers</strong>: In connection with a merger, acquisition, or sale
            of assets, with notice to affected individuals
          </li>
          <li>
            <strong>With your consent</strong>: When you have given us explicit permission
          </li>
        </ul>

        <h2>7. Do Not Sell or Share</h2>
        <p>
          We do not sell your personal information as defined by the California Consumer Privacy
          Act (CCPA) or any other applicable state privacy law. We do not share your personal
          information for cross-context behavioral advertising purposes.
        </p>

        <h2>8. Your Privacy Rights</h2>
        <p>
          Depending on your state of residence, you may have the following rights regarding
          your personal information:
        </p>
        <ul>
          <li>
            <strong>Right to Know</strong>: Request what personal information we have collected
            about you, the sources, the purposes, and the categories of third parties with whom
            we share it
          </li>
          <li>
            <strong>Right to Delete</strong>: Request deletion of your personal information,
            subject to certain legal exceptions
          </li>
          <li>
            <strong>Right to Correct</strong>: Request correction of inaccurate personal
            information
          </li>
          <li>
            <strong>Right to Opt Out</strong>: Opt out of the sale or sharing of your personal
            information (we do not sell or share your data, but you may still exercise this right)
          </li>
          <li>
            <strong>Right to Non-Discrimination</strong>: We will not discriminate against you
            for exercising any of these rights
          </li>
        </ul>
        <p>
          To submit a privacy request, email us at{" "}
          <a href="mailto:david.mercer@revauridesign.com">david.mercer@revauridesign.com</a> with
          the subject line &quot;Privacy Request.&quot; We will verify your identity and respond within 45
          days.
        </p>

        <h2>9. Data Retention</h2>
        <ul>
          <li>
            <strong>Client data</strong>: Retained for the duration of the service relationship
            and for a reasonable period afterward as required by law or legitimate business
            purposes
          </li>
          <li>
            <strong>Outreach data</strong>: Contact information for unconverted prospects is
            archived or deleted 90 days after the outreach campaign ends
          </li>
          <li>
            <strong>Suppression lists</strong>: Email addresses of individuals who have opted
            out are retained indefinitely to prevent re-contact
          </li>
          <li>
            <strong>Analytics data</strong>: Retained according to our analytics settings
          </li>
        </ul>
        <p>
          You may request deletion of your data at any time by contacting us (subject to legal
          retention requirements).
        </p>

        <h2>10. Cookies</h2>
        <p>
          We use essential cookies to maintain site functionality and security. We may also use
          analytics cookies to understand how visitors use our site and improve the experience.
          You can control cookie preferences through your browser settings. Disabling cookies may
          affect some site functionality.
        </p>

        <h2>11. Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your
          information, including encryption in transit (HTTPS), secure hosting infrastructure,
          and access controls. No method of transmission or storage is 100% secure, but we are
          committed to protecting your data using industry-standard practices.
        </p>

        <h2>12. Data Breach Notification</h2>
        <p>
          In the event of a data breach affecting your personal information, we will notify
          affected individuals and applicable state authorities in accordance with applicable law.
          We aim to provide notification within 72 hours of confirming a breach.
        </p>

        <h2>13. Children&apos;s Privacy</h2>
        <p>
          Our services are not directed at individuals under the age of 13. We do not knowingly
          collect personal information from children under 13. If you believe a child has
          provided us with personal information, please contact us at{" "}
          <a href="mailto:david.mercer@revauridesign.com">david.mercer@revauridesign.com</a>.
        </p>

        <h2>14. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material
          changes by posting the updated policy on this page with a new effective date.
        </p>

        <h2>15. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise your privacy
          rights, contact us at:{" "}
          <a href="mailto:david.mercer@revauridesign.com">david.mercer@revauridesign.com</a>.
          You may also write to us at:
        </p>
        <p>
          Revauri LLC<br />
          725 Joralemon Street, Unit 127<br />
          Belleville, NJ 07109
        </p>
      </article>
    </>
  );
}
