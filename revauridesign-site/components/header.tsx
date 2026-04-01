import { Logo } from "./logo";

export function Header() {
  return (
    <header className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <Logo suffix="Design" />
      </div>
    </header>
  );
}
