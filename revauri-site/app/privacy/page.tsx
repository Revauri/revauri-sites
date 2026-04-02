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
        subtitle="Last updated: April 1, 2026"
      />

      <article className="prose prose-neutral mx-auto max-w-3xl px-6 py-16 dark:prose-invert lg:py-20 [&_h2]:text-brand-dark [&_h2]:dark:text-brand-cream [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-brand-dark [&_h3]:dark:text-brand-cream [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-brand-dark/70 [&_p]:dark:text-brand-cream/70 [&_p]:leading-relaxed [&_li]:text-brand-dark/70 [&_li]:dark:text-brand-cream/70 [&_a]:text-brand-orange [&_a]:hover:underline">
        <h2>Overview</h2>
        <p>
          Revauri LLC (&quot;Revauri,&quot; &quot;we,&quot; &quot;us&quot;) respects your
          privacy. This Privacy Policy describes how we collect, use, and share information
          when you visit our website at revauri.com or engage with our services.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li>Name, email address, and phone number when you book a call or contact us</li>
          <li>Business name and website URL when you request a redesign sample</li>
          <li>Payment information when you purchase a package (processed by Stripe)</li>
          <li>Any additional information you share during calls or in emails</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>Usage data: pages visited, time on site, referral source</li>
          <li>Device and browser information</li>
          <li>IP address (anonymized for analytics)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve our services</li>
          <li>To communicate with you about your project</li>
          <li>To send you updates about your website (if applicable)</li>
          <li>To respond to your inquiries and support requests</li>
          <li>To analyze website usage and improve our marketing</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We use the following services that may process your data:</p>
        <ul>
          <li><strong>Vercel</strong> — Website hosting and analytics</li>
          <li><strong>Calendly</strong> — Appointment scheduling</li>
          <li><strong>Stripe</strong> — Payment processing</li>
          <li><strong>Google Analytics</strong> — Website analytics (anonymized)</li>
        </ul>
        <p>
          Each of these services has its own privacy policy governing their use of your data.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to provide our services
          and fulfill the purposes described in this policy. You may request deletion of your
          data at any time by contacting us.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information</li>
          <li>Object to or restrict processing of your data</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to maintain site functionality and optional analytics cookies
          to understand how visitors use our site. You can disable cookies in your browser settings.
        </p>

        <h2>Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your information.
          All data is transmitted over HTTPS and stored securely.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will notify you of material changes by
          posting the updated policy on this page with a new effective date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>
        </p>
      </article>
    </div>
  );
}
