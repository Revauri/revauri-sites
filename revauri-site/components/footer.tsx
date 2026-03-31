export function Footer() {
  return (
    <footer className="bg-brand-dark py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-brand-mid-gray">
          &copy; 2026 Revauri LLC
        </p>
        <p className="text-sm text-brand-mid-gray">
          Modern websites for businesses that are ready to grow
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:joseph@revauri.com"
            className="text-sm text-brand-mid-gray transition-colors hover:text-brand-cream"
          >
            joseph@revauri.com
          </a>
          <span className="text-brand-mid-gray/40">|</span>
          <a
            href="#"
            className="text-sm text-brand-mid-gray transition-colors hover:text-brand-cream"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
