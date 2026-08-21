const BOOK_URL = "https://revauri.ai/book";
const PRODUCT_URL = "https://revauri.ai";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-copper px-6 py-3 font-sans text-base font-medium text-charcoal transition-colors hover:bg-copper-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

const steps = [
  {
    index: "01",
    name: "Look",
    body: "We look at how the work runs today. How the job you hate actually gets done in your business. We learn that before we build anything.",
  },
  {
    index: "02",
    name: "Build",
    body: "We build two workflows around your business. Not a template. Built for the way you already work.",
  },
  {
    index: "03",
    name: "Run",
    body: "We run them. The work gets done, and every week you get a note on what it did.",
  },
];

const inCharge = [
  "Nothing customer-facing goes out without your written yes.",
  "The workflows are built around your business, so the work is done your way.",
  "Every week, you get a note on what the work did.",
];

const guardrails = [
  "It is not a receptionist replacement.",
  "It does not guess prices.",
  "It does not give medical or legal advice.",
];

export default function Home() {
  return (
    <>
      <section className="blueprint-grid bg-charcoal text-paper">
        <div className="mx-auto max-w-6xl animate-fade-up px-5 py-24 md:px-8 md:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">
            Revauri AI
          </p>
          <h1 className="mt-6 font-sans text-5xl leading-[1.05] font-medium tracking-[-0.02em] md:text-7xl">
            We build the hire<span className="text-copper">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper-muted md:text-lg">
            We look at the job you hate, build the workflow around your
            business, and run it. You stay the boss.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <a
              href={PRODUCT_URL}
              className="text-copper underline-offset-4 hover:underline"
            >
              See Revauri AI
            </a>
          </div>
          <p className="mt-12 max-w-xl font-mono text-xs leading-relaxed tracking-[0.15em] text-paper-muted">
            Got an email from @revauribuild.com? That was us. This domain is a
            door. The company is Revauri AI.
          </p>
        </div>
      </section>

      <section id="how-we-build" className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-deep">
            How we build
          </p>
          <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
            Look. Build. Run.
          </h2>
          <div className="mt-10 divide-y divide-hairline md:grid md:grid-cols-3 md:gap-10 md:divide-y-0">
            {steps.map((step) => (
              <div
                key={step.index}
                className="py-8 first:pt-0 last:pb-0 md:border-t-2 md:border-charcoal md:py-0 md:pt-6"
              >
                <p className="font-mono text-sm font-medium text-copper-deep">
                  {step.index}
                </p>
                <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-charcoal">
                  {step.name}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="in-charge" className="border-y border-hairline bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-deep">
            Your call
          </p>
          <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
            What you stay in charge of
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
            You stay the boss. That is the whole arrangement.
          </p>
          <div className="mt-10 divide-y divide-hairline">
            {inCharge.map((line) => (
              <div key={line} className="flex items-start gap-4 py-4">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-[2px] w-[10px] shrink-0 rounded-[1px] bg-copper"
                />
                <p className="font-sans text-lg text-charcoal">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="phone-answering" className="bg-charcoal text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">
                The extra hire
              </p>
              <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight md:text-4xl">
                Phone answering
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-paper-muted">
                Phone answering is a headline extra hire. It is quoted on the
                call, not before. If the phone is the job you hate, ask about
                it then.
              </p>
            </div>
            <div className="self-center divide-y divide-hairline-dark">
              {guardrails.map((line) => (
                <p
                  key={line}
                  className="py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center md:px-8 md:py-32">
          <h2 className="font-sans text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
            Hand off the job you hate<span className="text-copper-deep">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-muted">
            Twenty minutes. We talk about the work. You decide.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <a
              href={PRODUCT_URL}
              className="text-copper-deep underline decoration-hairline underline-offset-4 hover:decoration-copper-deep"
            >
              See Revauri AI
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
