const BOOK_URL = "https://revauri.ai/book";
const PRODUCT_URL = "https://revauri.ai";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[2px] bg-stamp px-6 py-3 font-sans text-base font-semibold text-ink transition-colors hover:bg-stamp-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const jobs = [
  {
    index: "01",
    name: "Quiet leads",
    body: "A form, call, or quote goes quiet. The hire waits the agreed time, then sends a short follow-up in the owner’s voice.",
  },
  {
    index: "02",
    name: "After-hours / missed calls",
    body: "The hire answers, takes a name and number, and books only what you pre-approve.",
  },
  {
    index: "03",
    name: "Quotes with no second follow-up",
    body: "The hire sends the next note so the quote does not die in the inbox.",
  },
  {
    index: "04",
    name: "Reviews",
    body: "When a new review lands, it drafts a reply for your yes / no.",
  },
  {
    index: "05",
    name: "Appointment reminders / no-shows",
    body: "The hire sends the reminder you already meant to send.",
  },
  {
    index: "06",
    name: "After-the-job check-in",
    body: "A short “how did it go?” so the job does not end in silence.",
  },
  {
    index: "07",
    name: "Inbox / admin busywork",
    body: "Repeatable messages and filing the hire can run the same way every time.",
  },
  {
    index: "08",
    name: "Reactivating past customers",
    body: "A polite check-in to people who already know you.",
  },
  {
    index: "09",
    name: "Something else",
    body: "If the job is repeatable, we can usually take it. We name it on the call.",
  },
];

const supportLines = [
  "We build the workflow. We run it. You stay the boss.",
  "Every week, you get a note on what the work did.",
  "Nothing customer-facing goes out without your yes.",
];

export default function Home() {
  return (
    <>
      <section className="ledger-grid bg-paper">
        <div className="mx-auto max-w-6xl animate-fade-up px-5 py-24 md:px-8 md:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp-deep">
            Revauri AI
          </p>
          <h1 className="mt-6 font-sans text-4xl leading-[1.05] font-bold tracking-[-0.02em] text-ink md:text-6xl">
            The <span className="text-stamp-deep">jobs</span> a hire can take.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            Quiet leads. Missed calls. Quotes that die. Reviews. Reminders. The
            busywork you keep meaning to hand off.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <a
              href={PRODUCT_URL}
              className="text-stamp-deep underline decoration-hairline underline-offset-4 hover:decoration-stamp-deep"
            >
              See Revauri AI
            </a>
          </div>
          <p className="mt-12 max-w-xl font-mono text-xs leading-relaxed tracking-[0.15em] text-ink-muted">
            Got an email from @revauribuilds.com? That was us. This domain is a
            door. The company is Revauri AI.
          </p>
        </div>
      </section>

      <section id="jobs" className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
          <div className="grid grid-cols-1 border-t border-l border-hairline md:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.index}
                className="border-b border-r border-hairline p-6 md:p-7"
              >
                <p className="font-mono text-sm font-bold text-stamp-deep">
                  {job.index}
                </p>
                <h2 className="mt-3 font-sans text-lg font-semibold tracking-tight text-ink">
                  {job.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {job.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-paper-sunk">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <h2 className="text-center font-sans text-3xl font-bold tracking-tight text-ink md:text-4xl">
            A standard hire starts with{" "}
            <span className="text-stamp-deep">two</span> of these.
          </h2>
          <div className="mx-auto mt-8 max-w-xl divide-y divide-hairline">
            {supportLines.map((line) => (
              <p
                key={line}
                className="py-3 font-sans text-base text-ink md:text-lg"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
              Twenty minutes. We talk about the work. You decide.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
