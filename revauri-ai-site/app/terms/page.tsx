import type { Metadata } from "next";
import { PageHero, GradientText } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms of Service — Revauri AI",
  description:
    "Terms of Service for the AI workflows Revauri builds and runs for small and medium businesses.",
  alternates: { canonical: "/terms" },
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
        subtitle="Last updated: August 27, 2026"
      />

      <article className="prose prose-neutral mx-auto max-w-3xl px-6 py-16 dark:prose-invert lg:py-20 [&_h2]:text-brand-dark [&_h2]:dark:text-brand-cream [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-brand-dark [&_h3]:dark:text-brand-cream [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-brand-dark/70 [&_p]:dark:text-brand-cream/70 [&_p]:leading-relaxed [&_li]:text-brand-dark/70 [&_li]:dark:text-brand-cream/70 [&_a]:text-brand-orange [&_a]:hover:underline">

        <h2>1. Agreement</h2>
        <p>
          By accessing or using revauri.ai and engaging with Revauri LLC&apos;s
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
          Revauri AI builds and runs AI workflows &mdash; an AI hire &mdash; for
          jobs a business owner wants off their plate. A standard hire includes:
        </p>
        <ul>
          <li>A short look at how the work is handled in your business today</li>
          <li>Two workflows, designed and built around how your business already runs</li>
          <li>A walkthrough and a written &quot;what it does / what it does not do&quot;</li>
          <li>Ongoing operation of those workflows by us, with a weekly plain-English note</li>
          <li>Customer-facing messages approved by you during setup so the hire learns your voice, then sent as part of the running workflow</li>
        </ul>
        <p>The following are quoted separately and are not part of a standard hire:</p>
        <ul>
          <li>Phone answering for missed, after-hours, and overflow calls, available as an add-on and scoped in your written quote</li>
          <li>Additional workflows beyond the two included</li>
          <li>Work that is materially larger than the scope described in your Service Agreement, which we quote before we start</li>
          <li>Website design and development, which is a separate Revauri product quoted separately at revauri.com and is not part of this product</li>
        </ul>
        <p>
          The phone add-on takes a caller&apos;s name, number, and what they need,
          and either books what you have pre-approved or arranges a callback. It
          can take receptionist, front-desk, and phone work. It does not do the
          licensed technician&apos;s job, it does not quote prices we have not
          agreed in writing, and it does not give medical, legal, or any other
          licensed professional advice. Anything outside its scope is routed back
          to you.
        </p>

        <h2>3. Pre-Engagement Calls and Quotes</h2>
        <p>
          Before a paid engagement, we may hold an introductory call, review how
          your business currently handles the work you want handed off, and
          provide a written scope and quote. Important terms regarding that
          pre-engagement work:
        </p>
        <ul>
          <li>Any workflow plan, scope, or quote we prepare remains the exclusive property of Revauri LLC until a paid engagement is executed</li>
          <li>It is provided for evaluation purposes only and does not create a client relationship, obligation, or expectation of future work</li>
          <li>Recommendations are prepared with AI assistance and may change once we see how the work actually runs</li>
          <li>It may not be used, copied, reproduced, or implemented by the recipient without a signed Service Agreement</li>
          <li>Revauri reserves the right to modify or withdraw any quote at any time before a Service Agreement is executed</li>
          <li>No warranty is made regarding the accuracy, completeness, or suitability of a pre-engagement recommendation or quote</li>
        </ul>

        <h2>4. Fees and Payment</h2>
        <ul>
          <li>All fees are in USD and are set out in your written quote and Service Agreement. We do not publish product pricing on this website.</li>
          <li>The one-time setup fee is due upon execution of the Service Agreement and before we begin building your workflows</li>
          <li>The setup fee is non-refundable once the build has commenced (defined as Revauri beginning any configuration or development work on your workflows)</li>
          <li>A monthly fee is required for the duration of the hire and covers running your workflows, the weekly note, and small improvements within the agreed scope</li>
          <li>The monthly fee begins on the date stated in your Service Agreement and is billed monthly via Stripe on the same calendar date each month</li>
          <li>Payments are processed securely through Stripe. We do not store your credit card information.</li>
          <li>Any payment not received within five (5) business days of the due date may incur a late fee of one and one-half percent (1.5%) per month, or the maximum rate permitted by New Jersey law, whichever is lower</li>
          <li>Revauri reserves the right to pause the operation of your workflows until overdue amounts are brought current. A pause does not relieve you of your obligation to pay outstanding balances.</li>
        </ul>

        <h2>5. Changes to Your Workflows</h2>
        <p>
          Changes to the workflows and scripts we run for you are included to the
          extent set out in your Service Agreement. Small adjustments inside the
          scope of your included workflows &mdash; wording, timing, and routing
          &mdash; are covered by your monthly fee. A change that adds a new
          workflow, materially expands what an existing workflow does, or takes
          the ongoing work beyond the weekly effort described in your Service
          Agreement is quoted before we build it.
        </p>

        <h2>6. Setup and Delivery</h2>
        <p>
          Setup begins once the two jobs being handed off are agreed in writing
          and the setup fee is paid. Setup is typically completed within days of
          that point, and we give you a specific timeline after we have seen the
          work. Delays caused by the client &mdash; including failure to provide
          access, accounts, or business facts we need, delayed feedback, or
          unresponsiveness for more than 5 business days &mdash; may extend that
          timeline. If a client is unresponsive or fails to provide required
          materials for more than thirty (30) consecutive calendar days during
          setup, Revauri may treat the engagement as abandoned. Upon abandonment,
          the setup fee is non-refundable and a reactivation fee may apply if the
          client wishes to resume.
        </p>

        <h2>7. Approvals</h2>
        <p>
          During setup, customer-facing messages go out after your written yes
          (email is sufficient) so the hire learns your voice. After setup, those
          workflows send as part of the running hire unless you ask to stay in the
          loop or we pause them. If you do not respond to setup approval requests
          for fourteen (14) consecutive calendar days, we pause customer-facing
          sends until you respond. After the hire is running, 14-day notice pauses
          or cancels the engagement as set out in these Terms. The hire does not
          do the licensed job, guess prices, or give medical, legal, or other
          licensed professional advice.
        </p>

        <h2>8. Intellectual Property</h2>
        <ul>
          <li>You own your business data, your customer records, and the content you provide to us</li>
          <li>Ownership of workflow configurations, scripts, and message templates written specifically for you is as stated in your Service Agreement</li>
          <li>Revauri retains all rights in its own tools, platforms, infrastructure, prompts, and general methods, including patterns and components reused across clients</li>
          <li>Ownership does not extend to third-party assets and services, including software, models, and integrations, which remain subject to their respective license terms</li>
          <li>Elements created with AI assistance are provided as part of the deliverable, but given the evolving legal landscape around AI-generated content, no specific intellectual property warranty is made regarding AI-generated elements beyond what is expressly stated in the Service Agreement</li>
          <li>Revauri will not identify you by name in marketing materials without your written permission, which you may revoke at any time with written notice</li>
        </ul>

        <h2>9. Client Responsibilities</h2>
        <p>As a client, you are responsible for:</p>
        <ul>
          <li>Providing the access, accounts, and business facts the workflows need to run</li>
          <li>Reviewing and approving drafts within a reasonable timeframe</li>
          <li>Ensuring the accuracy of all factual claims about your business, including services, availability, and any pricing you ask us to state</li>
          <li>Not asking the hire to do anything unlawful, deceptive, or in violation of messaging, calling, or recording regulations that apply to your business</li>
          <li>Not asking the hire to impersonate a licensed professional or to give medical, legal, financial, or other licensed advice</li>
          <li>Maintaining your own accounts with third-party platforms the workflows connect to, unless management of those accounts is included in your Service Agreement</li>
        </ul>
        <p>
          Revauri is not liable for content accuracy, legal compliance of your
          business claims, or the appropriateness of materials you provide.
        </p>

        <h2>10. Cancellation</h2>
        <ul>
          <li>You may pause or cancel the hire at any time with fourteen (14) days&apos; written notice to{" "}<a href="mailto:joseph@revauri.com">joseph@revauri.com</a></li>
          <li>We may end the engagement on the same fourteen (14) days&apos; written notice</li>
          <li>Service continues through the end of the notice period</li>
          <li>On the cancellation effective date we stop running your workflows. We do not continue sending to your customers on your behalf after that date.</li>
          <li>Within 14 days of the cancellation effective date, you may request an export of your business data held in the workflows we ran for you. We will deliver the export within seven (7) business days.</li>
          <li>Revauri has no obligation to operate, monitor, or maintain any workflow after the cancellation effective date</li>
          <li>No refunds are provided for the setup fee after the build has commenced, or for partial monthly periods</li>
          <li>If you wish to terminate before the build begins, you will receive a full refund of the setup fee</li>
        </ul>

        <h2>11. No Guarantee of Results</h2>
        <p>
          Revauri does not guarantee bookings, appointments, answered call volume,
          recovered leads, reviews, revenue, or any other business outcome. We
          commit to building and running the agreed workflows competently, but
          results depend on many factors outside our control, including your
          industry, competition, pricing, capacity, how your customers respond,
          and market conditions.
        </p>

        <h2>12. Limitation of Liability</h2>
        <p>
          Revauri&apos;s total liability for any claim arising from our services shall
          not exceed the total fees actually paid by you to Revauri under the
          applicable Service Agreement. In no event shall Revauri be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including but not limited to loss of revenue, loss of profits, loss of
          business, loss of data, or reputational harm, regardless of the theory of
          liability.
        </p>

        <h2>13. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Revauri and its
          members, officers, employees, and agents from any claims, damages,
          losses, liabilities, costs, and expenses (including reasonable
          attorneys&apos; fees) arising from: (a) content, materials, or data you
          provide; (b) your use of the services in a manner not contemplated by
          these terms or the Service Agreement; or (c) your breach of any
          representation or obligation under these terms. Revauri agrees to
          indemnify you from claims arising from our gross negligence, willful
          misconduct, or infringement of third-party intellectual property rights
          by our original work product (excluding any infringement caused by
          materials you provided).
        </p>

        <h2>14. Warranty and Disclaimer</h2>
        <p>
          Revauri warrants that services will be performed in a professional and
          workmanlike manner consistent with industry standards. If you notify us
          that a workflow is not behaving as described in your written &quot;what it
          does / what it does not do,&quot; we will correct it at no additional charge.
          This warranty does not cover issues caused by your modifications,
          inaccurate information you provided, third-party service changes, or
          factors outside our reasonable control.
        </p>
        <p className="uppercase text-xs">
          EXCEPT FOR THE EXPRESS WARRANTY ABOVE, REVAURI PROVIDES ALL SERVICES AND
          THE WEBSITE ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE DISCLAIM ALL OTHER
          WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE
          UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. AI-ASSISTED ELEMENTS ARE
          NOT WARRANTED TO BE ERROR-FREE OR ORIGINAL.
        </p>

        <h2>15. Third-Party Services</h2>
        <p>
          Our services run on third-party platforms, including Stripe (payments),
          Vercel (our infrastructure), Calendly (scheduling), and Google Analytics
          (analytics), along with the messaging, calling, and business tools your
          workflows connect to. Your use of these services is subject to their
          respective terms and privacy policies. Revauri is not responsible for
          the performance, availability, pricing changes, or policy changes of any
          third-party service. We are not liable for any loss or damage caused by
          third-party service failures or interruptions.
        </p>

        <h2>16. Acceptable Use</h2>
        <p>
          You agree not to use the hire, or ask us to send content on your behalf,
          that is illegal, defamatory, obscene, threatening, infringing on
          third-party rights, or otherwise objectionable. You may not use our
          services for spam, deceptive marketing, contacting people who have
          opted out, or any illegal purpose. Revauri reserves the right to refuse
          or terminate services if we reasonably determine that a request violates
          this provision or applicable law.
        </p>

        <h2>17. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any proprietary or sensitive
          information shared during the engagement, including business strategies,
          customer data, financial information, login credentials, and trade
          secrets. This confidentiality obligation survives termination of the
          engagement for a period of two (2) years.
        </p>

        <h2>18. Force Majeure</h2>
        <p>
          Neither party shall be liable for delays or failures in performance
          caused by events beyond reasonable control, including natural disasters,
          pandemic-related disruptions, internet infrastructure failures, acts of
          government, war, terrorism, or labor disputes. The affected party will
          notify the other party promptly. If a force majeure event prevents
          performance for more than sixty (60) consecutive calendar days, either
          party may terminate without penalty.
        </p>

        <h2>19. Governing Law and Dispute Resolution</h2>
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

        <h2>20. Severability</h2>
        <p>
          If any provision of these terms is found to be unenforceable or invalid,
          that provision will be limited or eliminated to the minimum extent
          necessary, and the remaining provisions will remain in full force and
          effect.
        </p>

        <h2>21. Service Agreement</h2>
        <p>
          Paid client engagements are governed by a separate Service Agreement that
          includes additional terms regarding scope, the specific workflows we
          build and run, fees, and timelines. In the event of a conflict between
          these Terms of Service and a signed Service Agreement, the Service
          Agreement shall control.
        </p>

        <h2>22. Changes</h2>
        <p>
          We may update these terms from time to time. We will notify you of
          material changes by posting updated terms on this page with a new
          effective date. Continued use of our services after changes constitutes
          acceptance of the updated terms.
        </p>

        <h2>23. Contact</h2>
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
