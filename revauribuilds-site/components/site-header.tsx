import { Logo } from "@/components/logo";

const BOOK_URL = "https://revauri.ai/book";
const PRODUCT_URL = "https://revauri.ai";

export function SiteHeader() {
  return (
    <header className="border-b border-hairline bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href={PRODUCT_URL} aria-label="Revauri AI" className="inline-flex">
          <Logo variant="light" />
        </a>
        <a
          href={BOOK_URL}
          className="inline-flex items-center gap-2 rounded-[2px] bg-stamp px-4 py-2 font-sans text-sm font-semibold text-ink transition-colors hover:bg-stamp-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Book a 20-minute call
        </a>
      </div>
    </header>
  );
}
