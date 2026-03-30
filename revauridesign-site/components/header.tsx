export function Header() {
  return (
    <header className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-semibold tracking-tight text-brand-dark">
            Revauri
          </span>
          <span className="text-xl font-normal tracking-wide text-brand-dark">
            Design
          </span>
          <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
        </div>
      </div>
    </header>
  );
}
