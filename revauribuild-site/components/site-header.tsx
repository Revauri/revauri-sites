import Link from "next/link";
import { Logo } from "@/components/logo";

const BOOK_URL = "https://revauri.ai/book";

export function SiteHeader() {
  return (
    <header className="border-b border-steel-line bg-steel text-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          aria-label="Revauri AI home"
          className="inline-flex rounded-[1px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          <Logo variant="dark" />
        </Link>
        <a
          href={BOOK_URL}
          className="inline-flex items-center gap-2 rounded-[2px] bg-copper px-4 py-2 font-sans text-sm font-medium text-steel shadow-[inset_0_-2px_0_0_rgba(22,24,29,0.25)] transition-colors hover:bg-copper-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
        >
          Book a 20-minute call
        </a>
      </div>
    </header>
  );
}
