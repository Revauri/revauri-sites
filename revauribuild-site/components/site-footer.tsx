import { Logo } from "@/components/logo";

const footerLink =
  "text-steel-muted transition-colors hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

export function SiteFooter() {
  return (
    <footer className="border-t border-steel-line bg-steel text-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <nav
          aria-label="Page sections"
          className="mb-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-steel-line pb-8 font-mono text-xs uppercase tracking-[0.15em]"
        >
          <a href="#how-we-build" className={footerLink}>
            How we build
          </a>
          <a href="#in-charge" className={footerLink}>
            In charge
          </a>
          <a href="#phone-answering" className={footerLink}>
            Phone answering
          </a>
          <a href="https://revauri.ai/book" className={footerLink}>
            Book a 20-minute call
          </a>
        </nav>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-steel-muted">
              A Revauri company.
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-steel-muted">
              725 Joralemon Street, Unit 127, Belleville, NJ 07109
            </p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.15em] text-steel-muted md:items-end">
            <a href="mailto:joseph@revauri.com" className={footerLink}>
              joseph@revauri.com
            </a>
            <a href="https://revauri.ai/privacy" className={footerLink}>
              Privacy
            </a>
            <a href="https://revauri.ai/terms" className={footerLink}>
              Terms
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-steel-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-steel-muted">
            Website design is a different product, at{" "}
            <a
              href="https://revauri.com"
              className="underline underline-offset-4 transition-colors hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            >
              revauri.com
            </a>
            .
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-steel-muted">
            © 2026 Revauri
          </p>
        </div>
      </div>
    </footer>
  );
}
