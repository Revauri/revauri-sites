const BOOK_URL = "https://revauri.ai/book";
const PRODUCT_URL = "https://revauri.ai";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3 font-sans text-base font-medium text-ink transition-colors hover:bg-signal-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

const logLines = [
  { time: "02:14:07", verb: "SENT", message: "Quote follow-up, day 3" },
  { time: "02:14:41", verb: "FILED", message: "Invoice thread to receipts" },
  { time: "03:02:19", verb: "SENT", message: "Appointment reminder" },
  { time: "04:37:52", verb: "SNOOZED", message: "Vendor thread, 2 days" },
  { time: "05:21:03", verb: "HELD", message: "Draft reply, needs your yes" },
];

const jobs = [
  {
    index: "01",
    name: "Follow-ups that do not die",
    body: "When a quote or form goes quiet, the hire sends the next note in your voice, on the schedule you approved.",
  },
  {
    index: "02",
    name: "Inbox and admin",
    body: "Repeatable replies, filing, the copy-paste work that eats the afternoon.",
  },
  {
    index: "03",
    name: "Reminders and check-ins",
    body: "Appointments, no-shows, after-the-job notes — the same message, every time, without you remembering.",
  },
];

const approvalPoints = [
  {
    text: "Every week, a short note: what the hire did and what it plans next.",
    live: false,
  },
  {
    text: "Two workflows. Built for your business, run by us.",
    live: false,
  },
  {
    text: "You stay the boss. Change the wording, the schedule, or stop a workflow at any time.",
    live: true,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div aria-hidden="true" className="log-roll absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32 lg:grid lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-16">
          <div className="max-w-xl">
            <p className="animate-fade-up font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal">
              Revauri AI
            </p>
            <h1
              className="mt-6 animate-fade-up font-sans text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.03em] text-text md:text-[4rem]"
              style={{ animationDelay: "60ms" }}
            >
              The digital work that never ends
              <span className="text-signal">.</span>
            </h1>
            <p
              className="mt-6 animate-fade-up text-base leading-[1.65] text-muted md:text-[1.0625rem]"
              style={{ animationDelay: "120ms" }}
            >
              Follow-ups. Inbox. Reminders. The tabs you leave open. We build a
              hire for that work and we run it.
            </p>
            <div
              className="mt-10 animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              <a href={BOOK_URL} className={primaryButton}>
                Book a 20-minute call
              </a>
            </div>
            <p
              className="mt-8 animate-fade-up font-mono text-xs leading-relaxed text-faint"
              style={{ animationDelay: "240ms" }}
            >
              Got an email from an @revauridigital.com address? That was us.
              This domain is a door. The company is Revauri AI.
            </p>
          </div>

          <div
            className="mt-14 animate-fade-up lg:mt-0"
            style={{ animationDelay: "300ms" }}
          >
            <div className="rounded-md border border-line bg-panel">
              <div className="flex items-center gap-2 border-b border-line-soft px-4 py-3">
                <span aria-hidden="true" className="dot dot--idle" />
                <span aria-hidden="true" className="dot dot--idle" />
                <span aria-hidden="true" className="dot dot--idle" />
                <span className="ml-2 font-mono text-xs text-faint">
                  tonight.log
                </span>
              </div>
              <div className="divide-y divide-line-soft px-4">
                {logLines.map((line) => (
                  <p
                    key={line.time}
                    className="flex items-baseline gap-3 py-2 font-mono text-[13px] leading-[1.9]"
                  >
                    <span className="shrink-0 text-faint">{line.time}</span>
                    <span className="w-16 shrink-0 uppercase tracking-[0.06em] text-signal">
                      {line.verb}
                    </span>
                    <span className="text-muted">{line.message}</span>
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-line-soft px-4 py-3">
                <span aria-hidden="true" className="dot animate-lamp-breathe" />
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                  All threads watched
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="jobs" className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal">
            The work the hire takes
          </p>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-text md:text-[2.5rem]">
            The work the hire takes
          </h2>
          <p className="mt-4 max-w-xl leading-[1.65] text-muted">
            The standard hire is two workflows, built around the job you hate
            most.
          </p>
          <div className="mt-12 border-t border-line">
            <div className="divide-y divide-line">
              {jobs.map((job) => (
                <div
                  key={job.index}
                  className="grid gap-3 py-8 transition-colors hover:bg-panel-hover md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <p className="font-mono text-sm text-faint">{job.index}</p>
                  <div>
                    <h3 className="font-sans text-lg font-medium tracking-tight text-text md:text-xl">
                      {job.name}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-muted">
                      {job.body}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                    <span aria-hidden="true" className="dot" />
                    Covered
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="approval" className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28 lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="lg:self-start">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal">
              Your call
            </p>
            <h2 className="mt-4 font-sans text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-text md:text-[2.5rem]">
              How approval works
            </h2>
            <p className="mt-6 text-lg leading-[1.65] text-text">
              You approve anything a customer will see.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 font-mono text-xs text-muted">
              <span aria-hidden="true" className="dot dot--needs-you" />
              Fourteen days of silence pauses those sends. Internal steps keep
              running.
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="space-y-10 border-l border-line pl-8">
              {approvalPoints.map((point) => (
                <div key={point.text} className="relative">
                  <span
                    aria-hidden="true"
                    className={
                      point.live
                        ? "dot animate-lamp-breathe absolute top-[0.45em] -left-[37px]"
                        : "dot dot--idle absolute top-[0.45em] -left-[37px]"
                    }
                  />
                  <p className="font-sans text-base text-text md:text-lg">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <div className="flex flex-col gap-3 rounded-md border border-line bg-panel px-6 py-6 md:flex-row md:items-center md:gap-6 md:px-8">
            <span aria-hidden="true" className="dot dot--idle shrink-0" />
            <p className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal">
              Extra hire
            </p>
            <p className="flex-1 leading-relaxed text-muted">
              Phone answering is available as an extra hire. The hire answers
              the calls you miss and takes the message. It is not a
              receptionist. If it sounds useful, ask about it on the call.
            </p>
            <span className="shrink-0 self-start rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-faint md:self-auto">
              Optional
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <div aria-hidden="true" className="log-roll absolute inset-0" />
        <div className="relative mx-auto max-w-2xl px-5 py-24 text-center md:px-8 md:py-32">
          <p className="inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal">
            <span aria-hidden="true" className="dot animate-lamp-breathe" />
            Revauri AI
          </p>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-text md:text-[2.5rem]">
            Hand off the work that never ends
            <span className="text-signal">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-[1.65] text-muted">
            Twenty minutes. Tell us the job you hate. We will tell you what the
            hire would do.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <a href={BOOK_URL} className={primaryButton}>
              Book a 20-minute call
            </a>
            <a
              href={PRODUCT_URL}
              className="font-mono text-xs uppercase tracking-[0.16em] text-faint transition-colors hover:text-signal"
            >
              See Revauri AI
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
