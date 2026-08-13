import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat inbox — Revauri",
  robots: { index: false, follow: false },
};

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[60vh] bg-brand-cream dark:bg-brand-dark">{children}</div>;
}
