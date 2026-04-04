import type { Metadata } from "next";
import { PageHero, GradientText } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy — Revauri",
  description:
    "Revauri's privacy policy. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        badge="LEGAL"
        title={
          <>
            Privacy <GradientText>Policy</GradientText>
          </>
        }
        subtitle="Last updated: April 3, 2026"
      />

      <article className="prose prose-neutral mx-auto max-w-3xl px-6 py-16 dark:prose-invert lg:py-20 [&_h2]:text-brand-dark [&_h2]:dark:text-brand-cream [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-brand-dark [&_h3]:dark:text-brand-cream [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-brand-dark/70 [&_p]:dark:text-brand-cream/70 [&_p]:leading-relaxed [&_li]:text-brand-dark/70 [&_li]:dark:text-brand-cream/70 [&_a]:text-brand-orange [&_a]:hover:underline">

        <h2>1. Overview</h2>
        <p>
          Revauri LLC (&quot;Revauri,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a New Jersey limited liability company.
          Address: 725 Joralemon Street, Unit 127, Belleville, NJ 07109. This Privacy Policy describes how we collect,
          use, and share information when you visit revauri.com, receive communications from us, or engage with our
          services. By using our website or services, you agree to the practices described in this policy.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>Information You Provide</h3>
        <ul>
          <li>Name, email address, phone number when you book a call or contact us</li>
          <li>Business name and website URL when you request a redesign</li>
          <li>
            Payment information when you purchase a package (processed securely by Stripe &mdash; we do not store
            your card details)
          </li>
          <li>Content and materials you provide during a project (logos, photos, copy)</li>
          <li>Any additional information you share during calls or in emails</li>
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
          We collect business information from publicly available sources and third-party data providers for the
          purpose of identifying businesses that may benefit from our services. This may include: business name,
          business owner name, business website URL, publicly listed email addresses, publicly listed phone numbers,
          industry and company size. This information is used solely for business-to-business outreach and is not
          used to contact individuals in their personal capacity.
        </p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve our website design and hosting services</li>
          <li>To communicate with you about your project or inquiry</li>
          <li>To process payments and manage your account</li>
          <li>To identify businesses that may benefit from our services and conduct outreach</li>
          <li>To generate website audits and sample redesigns using AI-powered tools</li>
          <li>To send you updates about your website or our services (if applicable)</li>
          <li>To respond to your inquiries and support requests</li>
          <li>To analyze website usage, improve our marketing, and enhance user experience</li>
          <li>To comply with legal obligations and enforce our terms</li>
        </ul>

        <h2>4. AI and Automation</h2>
        <p>
          We use AI-powered tools and automation as part of our service delivery. This includes using automated tools
          for identifying potential clients, auditing websites, generating sample redesigns, and assisting with
          content creation. AI-generated outputs are reviewed as part of our quality assurance process. If you have
          questions about how automation affects your data, contact us at{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>.
        </p>

        <h2>5. Cold Outreach and Opt-Out</h2>
        <p>
          We may contact business owners and decision-makers via email to introduce our services. These
          communications are sent to business email addresses obtained from publicly available sources and
          third-party data providers. Every outreach email includes a clear way to opt out. If you reply with
          &quot;unsubscribe&quot; or otherwise request to be removed, we will: add your email address to our permanent
          suppression list, cease all future outreach to that address, and complete the removal within 10 business
          days (typically within 72 hours). Suppression list records are maintained indefinitely to ensure we do not
          contact you again. If you received an email from us and would like to be removed, contact{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>.
        </p>

        <h2>6. Third-Party Services</h2>
        <p>We use the following services that may process your data:</p>
        <ul>
          <li>
            <strong>Stripe</strong> &mdash; Payment processing. Stripe handles all payment information directly. We
            do not store credit card numbers.
          </li>
          <li>
            <strong>Vercel</strong> &mdash; Website hosting and performance infrastructure
          </li>
          <li>
            <strong>Calendly</strong> &mdash; Appointment scheduling
          </li>
          <li>
            <strong>Google Analytics</strong> &mdash; Website analytics (with IP anonymization enabled)
          </li>
        </ul>
        <p>
          We also use third-party data providers for business contact information and third-party email delivery
          platforms for sending communications. Each third-party service operates under its own privacy policy and
          terms. We encourage you to review their policies.
        </p>

        <h2>7. Data Sharing</h2>
        <p>
          We do not sell your personal information. We do not share your personal information for cross-context
          behavioral advertising. We share information only in these circumstances:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong>: With third-party services that help us operate our business (payment
            processing, hosting, analytics, email delivery), under agreements that require them to protect your data
          </li>
          <li>
            <strong>Legal requirements</strong>: When required by law, regulation, legal process, or governmental
            request
          </li>
          <li>
            <strong>Business transfers</strong>: In connection with a merger, acquisition, or sale of assets, with
            notice to affected individuals
          </li>
          <li>
            <strong>With your consent</strong>: When you have given us explicit permission
          </li>
        </ul>

        <h2>8. Do Not Sell or Share</h2>
        <p>
          We do not sell your personal information as defined by the California Consumer Privacy Act (CCPA) or any
          other applicable state privacy law. We do not share your personal information for cross-context behavioral
          advertising purposes.
        </p>

        <h2>9. Your Privacy Rights</h2>
        <p>
          Depending on your state of residence, you may have the following rights regarding your personal
          information:
        </p>
        <ul>
          <li>
            <strong>Right to Know</strong>: Request what personal information we have collected about you, the
            sources, the purposes, and the categories of third parties with whom we share it
          </li>
          <li>
            <strong>Right to Delete</strong>: Request deletion of your personal information, subject to certain
            legal exceptions
          </li>
          <li>
            <strong>Right to Correct</strong>: Request correction of inaccurate personal information
          </li>
          <li>
            <strong>Right to Opt Out</strong>: Opt out of the sale or sharing of your personal information (we do
            not sell or share your data, but you may still exercise this right)
          </li>
          <li>
            <strong>Right to Non-Discrimination</strong>: We will not discriminate against you for exercising any
            of these rights
          </li>
        </ul>
        <p>
          To submit a privacy request, email us at{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a> with the subject line &quot;Privacy
          Request.&quot; We will verify your identity and respond within 45 days. If we need additional time, we
          will notify you of the extension and the reason.
        </p>

        <h2>10. Data Retention</h2>
        <ul>
          <li>
            <strong>Client data</strong>: Retained for the duration of the service relationship and for a
            reasonable period afterward as required by law or legitimate business purposes
          </li>
          <li>
            <strong>Outreach data</strong>: Contact information for unconverted prospects is archived or deleted 90
            days after the outreach campaign ends
          </li>
          <li>
            <strong>Suppression lists</strong>: Email addresses of individuals who have opted out are retained
            indefinitely to prevent re-contact
          </li>
          <li>
            <strong>Analytics data</strong>: Retained according to our Google Analytics settings (currently 14
            months)
          </li>
          <li>
            <strong>Payment records</strong>: Retained as required by tax and financial regulations
          </li>
        </ul>
        <p>
          You may request deletion of your data at any time by contacting us (subject to legal retention
          requirements).
        </p>

        <h2>11. Cookies</h2>
        <p>
          We use essential cookies to maintain site functionality and security. We may also use analytics cookies
          (via Google Analytics) to understand how visitors use our site and improve the experience. You can control
          cookie preferences through your browser settings. Disabling cookies may affect some site functionality.
        </p>

        <h2>12. Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your information, including
          encryption in transit (HTTPS), secure hosting infrastructure, and access controls. No method of
          transmission or storage is 100% secure, and we cannot guarantee absolute security, but we are committed
          to protecting your data using industry-standard practices.
        </p>

        <h2>13. Data Breach Notification</h2>
        <p>
          In the event of a data breach affecting your personal information, we will notify affected individuals
          and applicable state authorities in accordance with applicable law. We aim to provide notification within
          72 hours of confirming a breach, including a description of the breach, the types of data affected, and
          the steps we are taking to address it.
        </p>

        <h2>14. Children&apos;s Privacy</h2>
        <p>
          Our services are not directed at individuals under the age of 13. We do not knowingly collect personal
          information from children under 13. If we learn that we have collected information from a child under 13,
          we will delete it promptly. If you believe a child has provided us with personal information, please
          contact us at{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>.
        </p>

        <h2>15. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, services, or
          legal requirements. We will notify you of material changes by posting the updated policy on this page
          with a new effective date. We encourage you to review this policy periodically.
        </p>

        <h2>16. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us
          at:{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>. You may also write to us at:
        </p>
        <p>
          Revauri LLC<br />
          725 Joralemon Street, Unit 127<br />
          Belleville, NJ 07109
        </p>
      </article>
    </div>
  );
}
