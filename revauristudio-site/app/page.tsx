const BOOK_URL = "https://revauri.ai/book";
const PRODUCT_URL = "https://revauri.ai";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-none bg-claret px-6 py-3 font-sans text-base font-semibold text-paper transition-colors hover:bg-claret-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claret";

const steps = [
  {
    numeral: "I",
    name: "Look",
    body: "How the job runs today. Who talks to the customer. What you will and will not allow.",
    meta: "Study first",
  },
  {
    numeral: "II",
    name: "Build",
    body: "Two workflows, written for this business. A walkthrough. A written “does / does not.”",
    meta: "Designed around you",
  },
  {
    numeral: "III",
    name: "Run",
    body: "We operate it. You get a weekly note. Drafts wait for your yes.",
    meta: "You stay the boss",
  },
];

const craftPoints = [
  "Run by us, with a note to you every week.",
  "Nothing customer-facing goes out without your yes.",
];

export default function Home() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="animate-fade-up font-sans text-xs font-semibold uppercase tracking-[0.22em] text-claret">
            Revauri AI
          </p>
          <h1
            className="mt-6 max-w-3xl animate-fade-up font-display text-5xl leading-[1.05] font-semibold text-ink md:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Designed around{" "}
            <span className="italic text-claret">your business</span>.
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-ink-muted md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            We do not drop in a generic bot. We watch how the work runs,
            design two workflows that sound like you, and we run them.
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <a
              href={PRODUCT_URL}
              className="text-claret underline decoration-hairline underline-offset-4 hover:decoration-claret focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claret"
            >
              See Revauri AI
            </a>
          </div>
          <p className="mt-12 max-w-xl text-sm leading-relaxed text-ink-muted">
            Got an email from @revauristudio.com? That was us. This domain is
            a door. The company is Revauri AI.
          </p>
        </div>
      </section>

      <section id="the-craft" className="border-y border-hairline bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex items-baseline gap-4">
            <p className="font-display text-lg font-semibold text-claret">
              No. 01
            </p>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-claret">
              The craft
            </p>
          </div>
          <h2 className="mt-4 font-display text-3xl leading-[1.1] font-medium text-ink md:text-4xl">
            Studio, not factory.
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
            <p className="drop-cap">
              A hire from Revauri AI is an AI employee for the job you hate.
              We build the workflow. We run it. You stay the boss.
            </p>
            <p>
              The standard hire is two workflows, designed around how your
              business already talks to customers. They are written to sound
              like you, because they are designed from the way the work
              already runs.
            </p>
          </div>
          <div className="mt-10 max-w-xl divide-y divide-hairline border-t border-hairline">
            {craftPoints.map((line) => (
              <p key={line} className="py-4 font-sans text-lg text-ink">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex items-baseline gap-4">
            <p className="font-display text-lg font-semibold text-claret">
              No. 02
            </p>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-claret">
              The process
            </p>
          </div>
          <h2 className="mt-4 font-display text-3xl leading-[1.1] font-medium text-ink md:text-4xl">
            Look. Build. Run.
          </h2>
          <div className="mt-10 divide-y divide-hairline md:grid md:grid-cols-3 md:gap-10 md:divide-y-0">
            {steps.map((step) => (
              <div
                key={step.numeral}
                className="py-8 first:pt-0 last:pb-0 md:py-0"
              >
                <p className="font-display text-3xl font-semibold text-claret">
                  {step.numeral}
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-ink">
                  {step.name}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  {step.body}
                </p>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-ink-muted">
                  {step.meta}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-xl font-sans text-xs uppercase tracking-[0.18em] text-ink-muted">
            Phone is an extra hire, scoped on the call. It is not a
            receptionist.
          </p>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center md:px-8 md:py-32">
          <p className="mx-auto max-w-3xl font-display text-3xl leading-[1.15] font-medium text-paper md:text-5xl">
            If it is not repeatable, we will{" "}
            <span className="italic text-claret-light">not fake</span> a
            system for it.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center md:px-8 md:py-32">
          <div className="flex items-baseline justify-center gap-4">
            <p className="font-display text-lg font-semibold text-claret">
              No. 03
            </p>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-claret">
              Revauri AI
            </p>
          </div>
          <h2 className="mt-4 font-display text-3xl leading-[1.1] font-medium text-ink md:text-4xl">
            Show us the job you hate.
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
              className="text-claret underline decoration-hairline underline-offset-4 hover:decoration-claret focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claret"
            >
              See Revauri AI
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
