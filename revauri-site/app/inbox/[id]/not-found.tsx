import Link from "next/link";

export default function InboxNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream">Conversation not found</h1>
      <p className="mt-2 text-sm text-brand-mid-gray">It may have been deleted or the link is no longer valid.</p>
      <Link href="/inbox" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-brand-orange hover:underline">
        ← Back to inbox
      </Link>
    </div>
  );
}
