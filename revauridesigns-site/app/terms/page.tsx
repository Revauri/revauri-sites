import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms of Service — Revauri Designs",
  description:
    "Terms of Service for Revauri Designs website design and development services.",
  alternates: { canonical: "https://revauridesigns.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last updated: June 29, 2026"
      />

      <section className="bg-[#0f172a] py-16 lg:py-20">
        <article
          className="mx-auto max-w-3xl px-6 [&_a]:text-[#2dd4bf] [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-opacity [&_a:hover]:opacity-80 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#f8fafc] [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#f8fafc] [&_li]:mb-1.5 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-[#94a3b8] [&_p]:mb-4 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-[#94a3b8] [&_ul]:mb-4 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:text-[#94a3b8]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >

          <h2>1. Agreement</h2>
          <p>
            By accessing or using revauridesigns.com and engaging with Revauri LLC&apos;s
            services, you agree to be bound by these Terms of Service. Revauri LLC
            (&quot;Revauri Designs,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a New Jersey limited liability
            company located at 725 Joralemon Street, Unit 127, Belleville, NJ 07109.
            If you do not agree to these terms, please do not use our website or
            services. Paid client engagements are additionally governed by a separate
            signed Service Agreement.
          </p>

          <h2>2. Services</h2>
          <p>
            Revauri Designs provides website design, development, hosting, and
            maintenance services for small and medium businesses. Our service
            offerings include:
          </p>
          <ul>
            <li>Custom website design and development (built with modern frameworks)</li>
            <li>Website redesigns</li>
            <li>Mobile-first responsive design</li>
            <li>Technical SEO foundations</li>
            <li>Managed hosting on enterprise-grade infrastructure</li>
            <li>Ongoing website maintenance, updates, and support</li>
          </ul>

          <h2>3. Pricing and Payment</h2>
          <ul>
            <li>All prices are in USD</li>
            <li>Upfront project fees are due upon execution of the Service Agreement and before the build phase begins</li>
            <li>The upfront fee is non-refundable once the build phase has commenced</li>
            <li>Monthly retainer fees are required for managed hosting and ongoing support</li>
            <li>Payments are processed securely through Stripe. We do not store your credit card information.</li>
            <li>Any payment not received within five (5) business days of the due date may incur a late fee of one and one-half percent (1.5%) per month, or the maximum rate permitted by New Jersey law, whichever is lower</li>
          </ul>

          <h2>4. Revisions</h2>
          <p>
            Each project includes two (2) rounds of design revisions. A &quot;round of
            revisions&quot; is a single set of written feedback covering all desired
            changes. Additional revisions beyond the included two rounds are billed
            at our standard hourly rate, communicated at the time of request.
          </p>

          <h2>5. Project Timeline and Delivery</h2>
          <p>
            Delivery timelines are scoped per project. Delays caused by the client —
            including failure to provide assets, delayed feedback, or unresponsiveness
            for more than 5 business days — may extend the delivery timeline. If a
            client is unresponsive for more than thirty (30) consecutive calendar days
            during the build phase, Revauri may treat the project as abandoned.
          </p>

          <h2>6. Intellectual Property</h2>
          <ul>
            <li>Upon full payment of the upfront project fee, you own the custom website design and original content created specifically for your project</li>
            <li>Revauri retains the right to reuse general design patterns, code frameworks, and non-client-specific components across other projects</li>
            <li>Ownership does not extend to third-party assets including stock imagery, icon libraries, and open-source software, which remain subject to their respective license terms</li>
            <li>Revauri reserves the right to showcase completed projects in our portfolio and marketing materials. By default, projects are anonymized. You may grant or revoke permission for named use at any time with written notice.</li>
          </ul>

          <h2>7. Client Responsibilities</h2>
          <p>As a client, you are responsible for:</p>
          <ul>
            <li>Providing brand assets (logo files, photos, brand guidelines) in a timely manner</li>
            <li>Reviewing and approving all content before your website goes live</li>
            <li>Ensuring the accuracy of all factual claims about your business</li>
            <li>Responding to requests for feedback or approval within a reasonable timeframe</li>
            <li>Maintaining your own domain registration (unless domain management is included as an add-on)</li>
          </ul>

          <h2>8. Hosting</h2>
          <p>
            Your website is hosted on Revauri&apos;s managed infrastructure (Vercel).
            Hosting is included in your monthly retainer. We target 99.9% uptime but
            do not guarantee uninterrupted availability. Upon retainer cancellation,
            your website is taken offline 14 days after the cancellation effective date.
          </p>

          <h2>9. Cancellation</h2>
          <ul>
            <li>You may cancel your monthly retainer at any time with 30 days&apos; written notice to{" "}<a href="mailto:ryan.calloway@revauridesigns.com">ryan.calloway@revauridesigns.com</a></li>
            <li>Service continues through the end of your current billing period</li>
            <li>Within 14 days of the cancellation effective date, you may request a full source code export of your website</li>
            <li>Your website will be taken offline 14 days after the cancellation effective date</li>
            <li>No refunds are provided for the upfront project fee after the build phase has commenced, or for partial retainer periods</li>
          </ul>

          <h2>10. No Guarantee of Results</h2>
          <p>
            Revauri Designs does not guarantee specific search engine rankings, website
            traffic, lead generation, conversion rates, or revenue outcomes. We commit
            to best-practice design, development, and optimization, but results depend
            on many factors outside our control.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            Revauri&apos;s total liability for any claim arising from our services shall
            not exceed the total fees actually paid by you to Revauri under the
            applicable Service Agreement. In no event shall Revauri be liable for any
            indirect, incidental, special, consequential, or punitive damages.
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Revauri and its members, officers,
            employees, and agents from any claims, damages, losses, and expenses arising
            from content you provide, your use of the website in violation of these terms,
            or your breach of any obligation herein.
          </p>

          <h2>13. Warranty and Disclaimer</h2>
          <p>
            Revauri warrants that services will be performed in a professional and
            workmanlike manner consistent with industry standards. If you notify us of a
            defect in workmanship within thirty (30) days of launch, we will correct it
            at no charge.
          </p>
          <p className="uppercase text-xs !text-[#64748b]">
            EXCEPT FOR THE EXPRESS WARRANTY ABOVE, REVAURI PROVIDES ALL SERVICES ON AN
            &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY OTHER WARRANTIES, WHETHER
            EXPRESS, IMPLIED, OR STATUTORY.
          </p>

          <h2>14. Acceptable Use</h2>
          <p>
            You agree not to provide or publish content through your website that is
            illegal, defamatory, obscene, threatening, or otherwise objectionable.
            Revauri reserves the right to refuse or terminate services if we determine
            your content violates this provision or applicable law.
          </p>

          <h2>15. Confidentiality</h2>
          <p>
            Both parties agree to keep confidential any proprietary or sensitive
            information shared during the engagement. This obligation survives
            termination for two (2) years.
          </p>

          <h2>16. Force Majeure</h2>
          <p>
            Neither party shall be liable for delays caused by events beyond reasonable
            control, including natural disasters, internet infrastructure failures, or
            acts of government. If a force majeure event prevents performance for more
            than sixty (60) days, either party may terminate without penalty.
          </p>

          <h2>17. Governing Law and Dispute Resolution</h2>
          <p>
            These terms are governed by the laws of the State of New Jersey.
          </p>
          <p>
            For disputes in which the total amount is ten thousand dollars ($10,000)
            or less, either party may bring the claim in small claims court in New Jersey.
          </p>
          <p>
            For disputes exceeding ten thousand dollars ($10,000), the dispute shall
            be resolved through binding arbitration in New Jersey in accordance with
            the rules of the American Arbitration Association.
          </p>
          <p>
            <strong className="text-[#f8fafc]">
              IMPORTANT: By agreeing to these terms, you acknowledge that you are
              waiving your right to a trial by jury and to participate in a class
              action for disputes exceeding $10,000.
            </strong>
          </p>

          <h2>18. Severability</h2>
          <p>
            If any provision of these terms is found to be unenforceable, that provision
            will be limited to the minimum extent necessary, and the remaining provisions
            will remain in full force.
          </p>

          <h2>19. Changes</h2>
          <p>
            We may update these terms from time to time. We will notify you of material
            changes by posting updated terms on this page with a new effective date.
            Continued use of our services after changes constitutes acceptance.
          </p>

          <h2>20. Contact</h2>
          <p>
            Questions about these terms? Contact us at:{" "}
            <a href="mailto:ryan.calloway@revauridesigns.com">ryan.calloway@revauridesigns.com</a>
          </p>
          <p>
            Revauri LLC<br />
            725 Joralemon Street, Unit 127<br />
            Belleville, NJ 07109
          </p>
        </article>
      </section>
    </>
  );
}
