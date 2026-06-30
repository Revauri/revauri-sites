import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-brand-dark sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-5 max-w-md text-brand-dark/60">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved. Let&apos;s get
        you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange/90"
      >
        Go home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
