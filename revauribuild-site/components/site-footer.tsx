import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline-dark bg-charcoal text-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
              A Revauri company.
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
              725 Joralemon Street, Unit 127, Belleville, NJ 07109
            </p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.15em] text-paper-muted md:items-end">
            <a
              href="mailto:joseph@revauri.com"
              className="transition-colors hover:text-copper"
            >
              joseph@revauri.com
            </a>
            <a
              href="https://revauri.ai/privacy"
              className="transition-colors hover:text-copper"
            >
              Privacy
            </a>
            <a
              href="https://revauri.ai/terms"
              className="transition-colors hover:text-copper"
            >
              Terms
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-hairline-dark pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
            Website design is a different product, at{" "}
            <a
              href="https://revauri.com"
              className="underline underline-offset-4 transition-colors hover:text-copper"
            >
              revauri.com
            </a>
            .
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
            © 2026 Revauri
          </p>
        </div>
      </div>
    </footer>
  );
}
