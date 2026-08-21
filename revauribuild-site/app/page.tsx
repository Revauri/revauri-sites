const BOOK_URL = "https://revauri.ai/book";
const PRODUCT_URL = "https://revauri.ai";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[2px] bg-copper px-6 py-3 font-sans text-base font-medium text-steel shadow-[inset_0_-2px_0_0_rgba(22,24,29,0.25)] transition-colors hover:bg-copper-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

const textLink =
  "text-copper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

const fade = "opacity-0 animate-fade-up";

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
      <section className="shop-grid bg-steel text-paper">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <p
            className={`${fade} flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-copper`}
          >
            <span aria-hidden="true" className="h-[2px] w-8 bg-copper" />
            Revauri AI
          </p>
          <h1
            className={`${fade} mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-[-0.01em] [animation-delay:80ms] md:text-7xl`}
          >
            We build the hire<span className="text-copper">.</span>
          </h1>
          <p
            className={`${fade} mt-6 max-w-xl text-base leading-relaxed text-steel-muted [animation-delay:160ms] md:text-lg`}
          >
            We look at the job you hate, build the workflow around your
            business, and run it. You stay the boss.
          </p>
          <div
            className={`${fade} mt-10 flex flex-col gap-4 [animation-delay:240ms] sm:flex-row sm:items-center`}
          >
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <a href={PRODUCT_URL} className={textLink}>
              See Revauri AI
            </a>
          </div>
          <p
            className={`${fade} mt-12 max-w-xl border-t border-steel-line pt-5 font-mono text-xs leading-relaxed tracking-[0.15em] text-steel-muted [animation-delay:320ms]`}
          >
            Got an email from @revauribuild.com? That was us. This domain is a
            door. The company is Revauri AI.
          </p>
        </div>
      </section>

      <section className="bg-steel">
        <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <div className="rounded-[2px] border border-black/50 bg-paper shadow-[0_1px_0_rgba(0,0,0,0.5),0_24px_48px_-24px_rgba(0,0,0,0.6)]">
            <div
              aria-hidden="true"
              className="h-[3px] rounded-t-[2px] bg-copper"
            />
            <div className="flex items-center justify-between gap-4 border-b border-paper-line bg-paper-deep px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted md:px-10">
              <span>Work order — No. 001</span>
              <span>Revauri AI</span>
            </div>

            <div id="how-we-build" className="px-6 py-10 md:px-10 md:py-14">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-deep">
                How we build
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-steel md:text-4xl">
                Look. Build. Run.
              </h2>
              <div className="mt-10 divide-y divide-paper-line border-y border-paper-line">
                {steps.map((step) => (
                  <div
                    key={step.index}
                    className="group py-6 md:grid md:grid-cols-[13rem_1fr] md:gap-x-10"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-8 w-11 shrink-0 items-center justify-center border border-paper-line font-mono text-sm font-medium text-copper-deep transition-colors group-hover:border-copper-deep">
                        {step.index}
                      </span>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-steel">
                        {step.name}
                      </h3>
                    </div>
                    <p className="mt-3 leading-relaxed text-ink-muted md:mt-1">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="mx-6 border-t border-dashed border-paper-line md:mx-10"
            />

            <div id="in-charge" className="px-6 py-10 md:px-10 md:py-14">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-deep">
                Your call
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-steel md:text-4xl">
                What you stay in charge of
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
                You stay the boss. That is the whole arrangement.
              </p>
              <div className="mt-10 divide-y divide-paper-line border-y border-paper-line">
                {inCharge.map((line) => (
                  <div key={line} className="flex items-start gap-4 py-4">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-[2px] w-[10px] shrink-0 rounded-[1px] bg-copper"
                    />
                    <p className="font-sans text-lg text-steel">{line}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="phone-answering"
        className="border-y border-steel-line bg-steel-panel text-paper"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">
                The extra hire
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
                Phone answering
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-steel-muted">
                Phone answering is a headline extra hire. It is quoted on the
                call, not before. If the phone is the job you hate, ask about
                it then.
              </p>
            </div>
            <div className="self-center divide-y divide-steel-line border-y border-steel-line">
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

      <section className="bg-steel">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center md:px-8 md:py-32">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-paper md:text-5xl">
            Hand off the job you hate<span className="text-copper">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-steel-muted">
            Twenty minutes. We talk about the work. You decide.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <a href={PRODUCT_URL} className={textLink}>
              See Revauri AI
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
