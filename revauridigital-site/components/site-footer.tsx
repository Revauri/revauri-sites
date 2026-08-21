import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo variant="dark" />
            <p className="mt-3 font-mono text-xs text-faint">
              A Revauri company.
            </p>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-faint md:text-right md:text-xs">
            <p>725 Joralemon Street, Unit 127, Belleville, NJ 07109</p>
            <p>
              <a
                href="mailto:joseph@revauri.com"
                className="transition-colors hover:text-teal"
              >
                joseph@revauri.com
              </a>
            </p>
            <p>
              <a
                href="https://revauri.ai/privacy"
                className="uppercase tracking-[0.08em] transition-colors hover:text-text"
              >
                Privacy
              </a>
              <span aria-hidden="true"> · </span>
              <a
                href="https://revauri.ai/terms"
                className="uppercase tracking-[0.08em] transition-colors hover:text-text"
              >
                Terms
              </a>
            </p>
            <p>
              Website design is a different product at{" "}
              <a
                href="https://revauri.com"
                className="underline underline-offset-4 transition-colors hover:text-teal"
              >
                revauri.com
              </a>
              .
            </p>
            <p>© 2026 Revauri</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
