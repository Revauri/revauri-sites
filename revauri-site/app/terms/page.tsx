import type { Metadata } from "next";
import { PageHero, GradientText } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms of Service — Revauri",
  description:
    "Terms of Service for Revauri's website design and development services.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        badge="LEGAL"
        title={
          <>
            Terms of <GradientText>Service</GradientText>
          </>
        }
        subtitle="Last updated: April 1, 2026"
      />

      <article className="prose prose-neutral mx-auto max-w-3xl px-6 py-16 dark:prose-invert lg:py-20 [&_h2]:text-brand-dark [&_h2]:dark:text-brand-cream [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-brand-dark [&_h3]:dark:text-brand-cream [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-brand-dark/70 [&_p]:dark:text-brand-cream/70 [&_p]:leading-relaxed [&_li]:text-brand-dark/70 [&_li]:dark:text-brand-cream/70 [&_a]:text-brand-orange [&_a]:hover:underline">
        <h2>Agreement</h2>
        <p>
          By accessing or using revauri.com and engaging with Revauri LLC&apos;s services,
          you agree to be bound by these Terms of Service. If you do not agree, please do
          not use our services.
        </p>

        <h2>Services</h2>
        <p>
          Revauri provides website design, development, hosting, and maintenance services
          for small businesses. Our service offerings include:
        </p>
        <ul>
          <li>Custom website design and development</li>
          <li>Free homepage redesign samples</li>
          <li>Managed hosting on Vercel infrastructure</li>
          <li>Ongoing website maintenance and updates</li>
          <li>Content writing and SEO optimization</li>
        </ul>

        <h2>Pricing & Payment</h2>
        <ul>
          <li>All prices are in USD and listed on our pricing page</li>
          <li>Upfront project fees are due before work begins beyond the free sample</li>
          <li>Monthly retainer fees are billed on the 1st of each month</li>
          <li>Your first retainer payment begins 30 days after site launch</li>
          <li>Payments are processed securely through Stripe</li>
        </ul>

        <h2>Free Sample Redesign</h2>
        <p>
          We offer a free homepage redesign sample to prospective clients. This sample
          remains the property of Revauri until a paid engagement begins. The sample is
          provided for evaluation purposes only and may not be used, copied, or deployed
          without a paid agreement.
        </p>

        <h2>Intellectual Property</h2>
        <ul>
          <li>Upon full payment of the upfront project fee, you own the custom design and content created for your project</li>
          <li>Revauri retains ownership of underlying code frameworks, tools, and templates used across projects</li>
          <li>We reserve the right to showcase your completed project in our portfolio unless you opt out in writing</li>
        </ul>

        <h2>Cancellation</h2>
        <ul>
          <li>You may cancel your monthly retainer with 30 days&apos; written notice</li>
          <li>Service continues through the end of your current billing period</li>
          <li>Upon cancellation, you may request an export of your site source code</li>
          <li>No refunds are provided for partial months or upfront project fees after work has begun</li>
        </ul>

        <h2>Revisions</h2>
        <p>
          Each package includes two rounds of design revisions. Additional revision rounds
          may be available at an agreed-upon rate. Minor text and content updates are
          included in your monthly retainer at no extra charge.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Revauri&apos;s total liability for any claim arising from our services shall not
          exceed the amount you paid to us in the 12 months preceding the claim. We are
          not liable for indirect, incidental, or consequential damages.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of New Jersey. Any disputes
          shall be resolved in the courts of Essex County, New Jersey.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of our services after
          changes constitutes acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email us at{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>
        </p>
      </article>
    </div>
  );
}
