import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — Revauri Designs",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2dd4bf]"
      >
        404
      </p>
      <h1
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="mb-4 text-3xl font-bold tracking-tight text-[#f8fafc] sm:text-4xl"
      >
        Page not found
      </h1>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-[#64748b]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{ background: "#2dd4bf" }}
        className="inline-block rounded-sm px-6 py-3 text-sm font-semibold text-[#0f172a] transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </section>
  );
}
