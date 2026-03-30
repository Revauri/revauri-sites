export function Header() {
  return (
    <header className="bg-brand-white">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex flex-col items-start">
          <span className="text-xl font-normal uppercase tracking-[0.15em] text-brand-dark">
            Revauri{" "}
            <span className="font-light">Designs</span>
          </span>
          <div className="mt-2 h-0.5 w-10 bg-brand-orange" />
        </div>
      </div>
    </header>
  );
}
