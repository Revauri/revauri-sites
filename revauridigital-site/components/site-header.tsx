import Link from "next/link";
import { Logo } from "@/components/logo";

const BOOK_URL = "https://revauri.ai/book";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Revauri AI home" className="inline-flex">
          <Logo variant="dark" />
        </Link>
        <a
          href={BOOK_URL}
          className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text transition-colors hover:border-signal/50 hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          Book a 20-minute call
        </a>
      </div>
    </header>
  );
}
