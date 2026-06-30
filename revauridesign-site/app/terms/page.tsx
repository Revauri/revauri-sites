import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Revauri Design",
  description:
    "Terms of Service for Revauri Design's website design and development services.",
  alternates: { canonical: "https://revauridesign.com/terms" },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-5 text-brand-mid-gray">Last updated: June 29, 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-20 [&_a]:text-brand-orange [&_a]:hover:underline [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand-dark [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-brand-dark [&_li]:text-brand-dark/70 [&_p]:leading-relaxed [&_p]:text-brand-dark/70">

        <h2>1. Agreement</h2>
        <p>
          By accessing or using revauridesign.com and engaging with Revauri Design&apos;s services,
          you agree to be bound by these Terms of Service. Revauri LLC (&quot;Revauri Design,&quot;
          &quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a New Jersey limited liability company located at 725
          Joralemon Street, Unit 127, Belleville, NJ 07109. If you do not agree to these terms,
          please do not use our website or services. Paid client engagements are additionally
          governed by a separate signed Service Agreement.
        </p>

        <h2>2. Services</h2>
        <p>Revauri Design provides website design, development, hosting, and maintenance services for small and medium businesses. Our service offerings include:</p>
        <ul>
          <li>Custom website design and development (built with Next.js, Tailwind CSS, and Vercel)</li>
          <li>Website redesigns</li>
          <li>Mobile-first responsive design</li>
          <li>Technical SEO foundations</li>
          <li>Managed hosting and ongoing support</li>
        </ul>

        <h2>3. Pricing and Payment</h2>
        <ul>
          <li>All prices are in USD and are discussed and agreed upon prior to project start</li>
          <li>Upfront project fees are due upon execution of the Service Agreement and before work begins</li>
          <li>The upfront fee is non-refundable once the build phase has commenced</li>
          <li>Retainer fees for hosting and support are billed monthly</li>
          <li>Payments not received within five (5) business days of the due date may incur a late fee of one and one-half percent (1.5%) per month, or the maximum rate permitted by New Jersey law, whichever is lower</li>
          <li>Revauri Design reserves the right to suspend services, including hosting, until overdue payments are brought current</li>
        </ul>

        <h2>4. Revisions</h2>
        <p>
          Each project includes two (2) rounds of design revisions. A &quot;round of revisions&quot; is a
          single set of written feedback covering all desired changes. Additional revisions are
          billed at our standard hourly rate, communicated at the time of request. Minor content
          updates are included in the monthly retainer.
        </p>

        <h2>5. Project Timeline and Delivery</h2>
        <p>
          Delivery timelines are scoped per project. Delays caused by the client — including
          failure to provide assets, delayed feedback, or unresponsiveness for more than 5
          business days — may extend the delivery timeline. If a client is unresponsive or fails
          to provide required materials for more than thirty (30) consecutive calendar days,
          Revauri Design may treat the project as abandoned. The upfront fee is non-refundable
          in that case.
        </p>

        <h2>6. Intellectual Property</h2>
        <ul>
          <li>Upon full payment of the upfront project fee, you own the custom website design and original content created specifically for your project</li>
          <li>Revauri Design retains the right to reuse general design patterns, code frameworks, and non-client-specific components across other projects</li>
          <li>Ownership does not extend to third-party assets including stock imagery, icon libraries, and open-source software, which remain subject to their respective license terms</li>
          <li>Revauri Design reserves the right to showcase completed projects in our marketing materials. By default, projects are anonymized. You may grant or revoke permission for named use with written notice.</li>
        </ul>

        <h2>7. Client Responsibilities</h2>
        <p>As a client, you are responsible for:</p>
        <ul>
          <li>Providing brand assets (logo files, photos, brand guidelines) in a timely manner</li>
          <li>Reviewing and approving all content before your website goes live</li>
          <li>Ensuring the accuracy of all factual claims about your business</li>
          <li>Responding to requests for feedback or approval within a reasonable timeframe</li>
          <li>Maintaining your own domain registration (unless domain management is included)</li>
        </ul>
        <p>
          Revauri Design is not liable for content accuracy, legal compliance of your business
          claims, or the appropriateness of materials you provide.
        </p>

        <h2>8. Client Approval</h2>
        <p>
          You must provide written approval before your website goes live. If you do not respond
          to a written request for final approval within ten (10) business days, the website will
          be deemed approved and Revauri Design may proceed with deployment.
        </p>

        <h2>9. Hosting</h2>
        <p>
          Your website is hosted on Vercel. Hosting is included in your monthly retainer. We
          target 99.9% uptime but do not guarantee uninterrupted availability. Upon retainer
          cancellation, your website is taken offline 14 days after the cancellation effective
          date.
        </p>

        <h2>10. Cancellation</h2>
        <ul>
          <li>You may cancel your monthly retainer at any time with 30 days&apos; written notice to{" "}<a href="mailto:david.mercer@revauridesign.com">david.mercer@revauridesign.com</a></li>
          <li>Service continues through the end of your current billing period</li>
          <li>Within 14 days of the cancellation effective date, you may request a full source code export. We will deliver within seven (7) business days.</li>
          <li>No refunds are provided for the upfront project fee after the build phase has commenced, or for partial retainer periods</li>
          <li>If you wish to terminate before the build phase begins, you will receive a full refund of the upfront fee</li>
        </ul>

        <h2>11. No Guarantee of Results</h2>
        <p>
          Revauri Design does not guarantee specific search engine rankings, website traffic,
          lead generation, conversion rates, or revenue outcomes. We commit to best-practice
          design, development, and optimization, but results depend on many factors outside our
          control.
        </p>

        <h2>12. Limitation of Liability</h2>
        <p>
          Revauri Design&apos;s total liability for any claim arising from our services shall not
          exceed the total fees actually paid by you under the applicable Service Agreement. In
          no event shall Revauri Design be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to loss of revenue, loss
          of profits, or reputational harm, regardless of the theory of liability.
        </p>

        <h2>13. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Revauri LLC and its members,
          officers, employees, and agents from any claims, damages, losses, liabilities, costs,
          and expenses (including reasonable attorneys&apos; fees) arising from: (a) content, materials,
          or data you provide; (b) your use of the website in a manner not contemplated by these
          terms; or (c) your breach of any obligation under these terms.
        </p>

        <h2>14. Warranty and Disclaimer</h2>
        <p>
          Revauri Design warrants that services will be performed in a professional and
          workmanlike manner consistent with industry standards. If you notify us of a defect in
          workmanship within thirty (30) days of your website launch date, we will correct the
          defect at no additional charge.
        </p>
        <p className="text-xs uppercase">
          EXCEPT FOR THE EXPRESS WARRANTY ABOVE, REVAURI DESIGN PROVIDES ALL SERVICES AND THE
          WEBSITE ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE DISCLAIM ALL OTHER WARRANTIES,
          WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>

        <h2>15. Third-Party Services</h2>
        <p>
          Our services may integrate with third-party platforms including Vercel (hosting) and
          others. Your use of these services is subject to their respective terms and privacy
          policies. Revauri Design is not responsible for the performance or availability of any
          third-party service.
        </p>

        <h2>16. Acceptable Use</h2>
        <p>
          You agree not to provide or publish content through your website that is illegal,
          defamatory, obscene, threatening, infringing on third-party rights, or otherwise
          objectionable. Revauri Design reserves the right to refuse or terminate services if we
          reasonably determine that your content violates this provision or applicable law.
        </p>

        <h2>17. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any proprietary or sensitive information
          shared during the engagement, including business strategies, customer data, financial
          information, and trade secrets. This obligation survives termination for two (2) years.
        </p>

        <h2>18. Force Majeure</h2>
        <p>
          Neither party shall be liable for delays caused by events beyond reasonable control,
          including natural disasters, internet infrastructure failures, acts of government, or
          labor disputes. If a force majeure event prevents performance for more than sixty (60)
          consecutive calendar days, either party may terminate without penalty.
        </p>

        <h2>19. Governing Law and Dispute Resolution</h2>
        <p>
          These terms are governed by the laws of the State of New Jersey.
        </p>
        <p>
          For disputes in which the total amount is ten thousand dollars ($10,000) or less,
          either party may bring the claim in small claims court in New Jersey.
        </p>
        <p>
          For disputes exceeding ten thousand dollars ($10,000), the dispute shall be resolved
          through binding arbitration in New Jersey in accordance with the rules of the American
          Arbitration Association. The prevailing party shall be entitled to recover reasonable
          arbitration fees and costs.
        </p>
        <p>
          <strong>
            By agreeing to these terms, you acknowledge that you are waiving your right to a
            trial by jury and to participate in a class action for disputes exceeding $10,000.
            If you do not agree to this waiver, do not use our services.
          </strong>
        </p>

        <h2>20. Severability</h2>
        <p>
          If any provision of these terms is found to be unenforceable or invalid, that provision
          will be limited or eliminated to the minimum extent necessary, and the remaining
          provisions will remain in full force and effect.
        </p>

        <h2>21. Service Agreement</h2>
        <p>
          Paid client engagements are governed by a separate Service Agreement that includes
          additional terms regarding project scope, deliverables, and timelines. In the event of
          a conflict between these Terms of Service and a signed Service Agreement, the Service
          Agreement shall control.
        </p>

        <h2>22. Changes</h2>
        <p>
          We may update these terms from time to time. We will notify you of material changes by
          posting updated terms on this page with a new effective date. Continued use of our
          services after changes constitutes acceptance of the updated terms.
        </p>

        <h2>23. Contact</h2>
        <p>
          Questions about these terms? Contact us at:{" "}
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
