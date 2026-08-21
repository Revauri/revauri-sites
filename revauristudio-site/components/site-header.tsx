import Link from "next/link";
import { Logo } from "@/components/logo";

const BOOK_URL = "https://revauri.ai/book";

export function SiteHeader() {
  return (
    <header className="bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Revauri AI home" className="inline-flex">
          <Logo variant="light" />
        </Link>
        <a
          href={BOOK_URL}
          className="inline-flex items-center gap-2 rounded-none bg-claret px-4 py-2 font-sans text-sm font-semibold text-paper transition-colors hover:bg-claret-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claret"
        >
          Book a 20-minute call
        </a>
      </div>
      <div aria-hidden="true" className="border-t border-ink" />
      <div aria-hidden="true" className="mt-[3px] border-t border-hairline" />
    </header>
  );
}
