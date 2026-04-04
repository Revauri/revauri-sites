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
        subtitle="Last updated: April 3, 2026"
      />

      <article className="prose prose-neutral mx-auto max-w-3xl px-6 py-16 dark:prose-invert lg:py-20 [&_h2]:text-brand-dark [&_h2]:dark:text-brand-cream [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-brand-dark [&_h3]:dark:text-brand-cream [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-brand-dark/70 [&_p]:dark:text-brand-cream/70 [&_p]:leading-relaxed [&_li]:text-brand-dark/70 [&_li]:dark:text-brand-cream/70 [&_a]:text-brand-orange [&_a]:hover:underline">

        <h2>1. Agreement</h2>
        <p>
          By accessing or using revauri.com and engaging with Revauri LLC&apos;s
          services, you agree to be bound by these Terms of Service. Revauri LLC
          (&quot;Revauri,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a New Jersey limited liability
          company located at 725 Joralemon Street, Unit 127, Belleville, NJ 07109.
          If you do not agree to these terms, please do not use our website or
          services. These Terms of Service govern your use of our website and
          general engagement with our services. Paid client engagements are
          additionally governed by a separate signed Service Agreement.
        </p>

        <h2>2. Services</h2>
        <p>
          Revauri provides AI-powered website design, development, hosting, and
          maintenance services for small and medium businesses. Our service
          offerings include:
        </p>
        <ul>
          <li>Custom website design and development (built with modern frameworks)</li>
          <li>Free homepage redesign samples for prospective clients</li>
          <li>Professional copywriting and content creation</li>
          <li>Managed hosting on enterprise-grade infrastructure</li>
          <li>Ongoing website maintenance, updates, and support</li>
          <li>Search engine optimization and analytics setup</li>
          <li>AI chatbot integration and other add-on services</li>
        </ul>
        <p>
          We use AI-powered tools and automation to assist with various aspects of
          our service delivery, including website auditing, design generation, and
          content creation. All AI-assisted work is subject to human review and
          quality assurance.
        </p>

        <h2>3. Free Sample Redesign</h2>
        <p>
          We may create free homepage redesign samples for prospective clients
          using publicly available information from their existing website.
          Important terms regarding these samples:
        </p>
        <ul>
          <li>Free samples remain the exclusive property of Revauri LLC until a paid engagement is executed</li>
          <li>Samples are provided for evaluation purposes only and do not create a client relationship, obligation, or expectation of future work</li>
          <li>Samples are generated with AI assistance and may not perfectly represent the final deliverable of a paid engagement</li>
          <li>Samples may not be used, copied, reproduced, or deployed by the recipient without a signed Service Agreement</li>
          <li>Revauri reserves the right to modify or remove any sample at any time</li>
          <li>No warranty is made regarding the accuracy, completeness, or suitability of a free sample</li>
        </ul>

        <h2>4. Pricing and Payment</h2>
        <ul>
          <li>All prices are in USD and are listed on our pricing page</li>
          <li>Upfront project fees are due upon execution of the Service Agreement and before the build phase begins</li>
          <li>The upfront fee is non-refundable once the build phase has commenced (defined as Revauri beginning any design or development work)</li>
          <li>Monthly retainer fees are required for all clients and include managed hosting and ongoing support</li>
          <li>Your first retainer payment begins 30 days after the site launch date</li>
          <li>Retainer is billed monthly via Stripe on the same calendar date each month</li>
          <li>Payments are processed securely through Stripe. We do not store your credit card information.</li>
          <li>Any payment not received within five (5) business days of the due date may incur a late fee of one and one-half percent (1.5%) per month, or the maximum rate permitted by New Jersey law, whichever is lower</li>
          <li>Revauri reserves the right to suspend all services, including hosting, until overdue payments are brought current. Suspension does not relieve you of your obligation to pay outstanding balances.</li>
        </ul>

        <h2>5. Revisions</h2>
        <p>
          Each project includes two (2) rounds of design revisions. A &quot;round of
          revisions&quot; is a single set of written feedback covering all desired
          changes. Additional revisions beyond the included two rounds are billed
          at $75 per hour. Minor text and content updates are included in your
          monthly retainer at no extra charge.
        </p>

        <h2>6. Project Timeline and Delivery</h2>
        <p>
          Delivery timelines depend on the selected package (typically 4 to 6
          weeks from the completion of the Project Brief). Delays caused by the
          client &mdash; including failure to provide assets, delayed feedback, or
          unresponsiveness for more than 5 business days &mdash; may extend the
          delivery timeline. If a client is unresponsive or fails to provide
          required materials for more than thirty (30) consecutive calendar days
          during the build phase, Revauri may treat the project as abandoned. Upon
          project abandonment, the upfront fee is non-refundable and a reactivation
          fee of $500 applies if the client wishes to resume.
        </p>

        <h2>7. Intellectual Property</h2>
        <ul>
          <li>Upon full payment of the upfront project fee, you own the custom website design and original content created specifically for your project</li>
          <li>Revauri retains the right to reuse general design patterns, code frameworks, templates, and non-client-specific components across other projects</li>
          <li>Ownership does not extend to third-party assets, including stock imagery, icon libraries, open-source software, and third-party plugins, which remain subject to their respective license terms</li>
          <li>Elements created with AI assistance are provided as part of the deliverable, but given the evolving legal landscape around AI-generated content, no specific intellectual property warranty is made regarding AI-generated elements beyond what is expressly stated in the Service Agreement</li>
          <li>Revauri reserves the right to showcase completed projects in our portfolio and marketing materials. By default, projects are anonymized. You may grant or revoke permission for named use at any time with written notice.</li>
        </ul>

        <h2>8. Client Responsibilities</h2>
        <p>As a client, you are responsible for:</p>
        <ul>
          <li>Providing brand assets (logo files, photos, brand guidelines) in a timely manner</li>
          <li>Reviewing and approving all content before your website goes live</li>
          <li>Ensuring the accuracy of all factual claims about your business</li>
          <li>Responding to requests for feedback or approval within a reasonable timeframe</li>
          <li>Maintaining your own domain registration (unless domain management is included as an add-on)</li>
        </ul>
        <p>
          Revauri is not liable for content accuracy, legal compliance of your
          business claims, or the appropriateness of materials you provide.
        </p>

        <h2>9. Client Approval</h2>
        <p>
          You must provide written approval (email is sufficient) before your
          website goes live. Once you approve the final version, Revauri will
          deploy the site to production. If you do not respond to a written request
          for final approval within ten (10) business days, the website will be
          deemed approved and Revauri may proceed with deployment.
        </p>

        <h2>10. Hosting</h2>
        <p>
          Your website is hosted on Revauri&apos;s managed infrastructure (Vercel).
          Hosting is included in your monthly retainer. We target 99.9% uptime but
          do not guarantee uninterrupted availability. Hosting performance and
          uptime are subject to our infrastructure provider&apos;s service levels. In
          the event of hosting issues, we will work to resolve them within 24
          business hours. Upon retainer cancellation, your website is taken offline
          14 days after the cancellation effective date.
        </p>

        <h2>11. Cancellation</h2>
        <ul>
          <li>You may cancel your monthly retainer at any time with 30 days&apos; written notice to{" "}<a href="mailto:joseph@revauri.com">joseph@revauri.com</a></li>
          <li>Service continues through the end of your current billing period</li>
          <li>Within 14 days of the cancellation effective date, you may request a full source code export of your website. We will deliver the export within seven (7) business days.</li>
          <li>Your website will be taken offline 14 days after the cancellation effective date</li>
          <li>Revauri has no obligation to maintain or host your website after the cancellation effective date</li>
          <li>No refunds are provided for the upfront project fee after the build phase has commenced, or for partial retainer periods</li>
          <li>If you wish to terminate before the build phase begins, you will receive a full refund of the upfront fee</li>
        </ul>

        <h2>12. No Guarantee of Results</h2>
        <p>
          Revauri does not guarantee specific search engine rankings, website
          traffic, lead generation, conversion rates, or revenue outcomes. We
          commit to best-practice design, development, and optimization, but
          results depend on many factors outside our control, including your
          industry, competition, content, marketing efforts, and market conditions.
        </p>

        <h2>13. Limitation of Liability</h2>
        <p>
          Revauri&apos;s total liability for any claim arising from our services shall
          not exceed the total fees actually paid by you to Revauri under the
          applicable Service Agreement. In no event shall Revauri be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including but not limited to loss of revenue, loss of profits, loss of
          business, loss of data, or reputational harm, regardless of the theory of
          liability.
        </p>

        <h2>14. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Revauri and its
          members, officers, employees, and agents from any claims, damages,
          losses, liabilities, costs, and expenses (including reasonable
          attorneys&apos; fees) arising from: (a) content, materials, or data you
          provide; (b) your use of the website in a manner not contemplated by
          these terms or the Service Agreement; or (c) your breach of any
          representation or obligation under these terms. Revauri agrees to
          indemnify you from claims arising from our gross negligence, willful
          misconduct, or infringement of third-party intellectual property rights
          by our original work product (excluding any infringement caused by
          materials you provided).
        </p>

        <h2>15. Warranty and Disclaimer</h2>
        <p>
          Revauri warrants that services will be performed in a professional and
          workmanlike manner consistent with industry standards. If you notify us
          of a defect in workmanship within thirty (30) days of your website launch
          date, we will correct the defect at no additional charge. This warranty
          does not cover issues caused by your modifications, third-party
          interference, or factors outside our reasonable control.
        </p>
        <p className="uppercase text-xs">
          EXCEPT FOR THE EXPRESS WARRANTY ABOVE, REVAURI PROVIDES ALL SERVICES AND
          THE WEBSITE ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE DISCLAIM ALL OTHER
          WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE
          UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. AI-ASSISTED ELEMENTS ARE
          NOT WARRANTED TO BE ERROR-FREE OR ORIGINAL.
        </p>

        <h2>16. Third-Party Services</h2>
        <p>
          Our services integrate with third-party platforms including Stripe
          (payments), Vercel (hosting), Calendly (scheduling), and Google Analytics
          (analytics). Your use of these services is subject to their respective
          terms and privacy policies. Revauri is not responsible for the
          performance, availability, pricing changes, or policy changes of any
          third-party service. We are not liable for any loss or damage caused by
          third-party service failures or interruptions.
        </p>

        <h2>17. Acceptable Use</h2>
        <p>
          You agree not to provide or publish content through your website that is
          illegal, defamatory, obscene, threatening, infringing on third-party
          rights, or otherwise objectionable. Revauri reserves the right to refuse
          or terminate services if we reasonably determine that your content
          violates this provision or applicable law. You may not use our
          deliverables for spam, deceptive marketing, or any illegal purpose.
        </p>

        <h2>18. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any proprietary or sensitive
          information shared during the engagement, including business strategies,
          customer data, financial information, login credentials, and trade
          secrets. This confidentiality obligation survives termination of the
          engagement for a period of two (2) years.
        </p>

        <h2>19. Force Majeure</h2>
        <p>
          Neither party shall be liable for delays or failures in performance
          caused by events beyond reasonable control, including natural disasters,
          pandemic-related disruptions, internet infrastructure failures, acts of
          government, war, terrorism, or labor disputes. The affected party will
          notify the other party promptly. If a force majeure event prevents
          performance for more than sixty (60) consecutive calendar days, either
          party may terminate without penalty.
        </p>

        <h2>20. Governing Law and Dispute Resolution</h2>
        <p>
          These terms are governed by the laws of the State of New Jersey.
        </p>
        <p>
          For disputes in which the total amount is ten thousand dollars ($10,000)
          or less, either party may bring the claim in small claims court in New
          Jersey.
        </p>
        <p>
          For disputes exceeding ten thousand dollars ($10,000), the dispute shall
          be resolved through binding arbitration in New Jersey in accordance with
          the rules of the American Arbitration Association. The prevailing party
          shall be entitled to recover reasonable arbitration fees and costs.
        </p>
        <p>
          <strong>
            IMPORTANT: By agreeing to these terms, you acknowledge that you are
            waiving your right to a trial by jury and to participate in a class
            action for disputes exceeding $10,000. This waiver is made knowingly
            and voluntarily. If you do not agree to this waiver, do not use our
            services.
          </strong>
        </p>

        <h2>21. Severability</h2>
        <p>
          If any provision of these terms is found to be unenforceable or invalid,
          that provision will be limited or eliminated to the minimum extent
          necessary, and the remaining provisions will remain in full force and
          effect.
        </p>

        <h2>22. Service Agreement</h2>
        <p>
          Paid client engagements are governed by a separate Service Agreement that
          includes additional terms regarding project scope, deliverables, and
          timelines. In the event of a conflict between these Terms of Service and
          a signed Service Agreement, the Service Agreement shall control.
        </p>

        <h2>23. Changes</h2>
        <p>
          We may update these terms from time to time. We will notify you of
          material changes by posting updated terms on this page with a new
          effective date. Continued use of our services after changes constitutes
          acceptance of the updated terms.
        </p>

        <h2>24. Contact</h2>
        <p>
          Questions about these terms? Contact us at:{" "}
          <a href="mailto:joseph@revauri.com">joseph@revauri.com</a>. You may also
          write to us at:<br />
          Revauri LLC<br />
          725 Joralemon Street<br />
          Unit 127<br />
          Belleville, NJ 07109
        </p>
      </article>
    </div>
  );
}
