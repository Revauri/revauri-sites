"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function InboxLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const res = await fetch("/api/inbox/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.status === 429) {
        setError("Too many attempts. Wait a minute and try again.");
        return;
      }
      if (!res.ok) {
        setError("That password did not work.");
        return;
      }
      router.replace("/inbox");
      router.refresh();
    } catch {
      setError("Could not reach the inbox. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-16">
      <h1 className="text-2xl font-semibold text-brand-dark dark:text-brand-cream">Chat inbox</h1>
      <p className="mt-2 text-sm text-brand-mid-gray">Enter the inbox password to review visitor chats.</p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-brand-dark dark:text-brand-cream">
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-h-11 rounded-xl border border-brand-light-gray/80 bg-brand-white px-3 text-base text-brand-dark outline-none focus:border-brand-orange dark:border-brand-mid-gray/30 dark:bg-[#1a1a19] dark:text-brand-cream"
          />
        </label>
        {error ? <p className="text-sm text-red-700 dark:text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={pending || !password}
          className="min-h-11 rounded-xl bg-brand-orange px-4 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Open inbox"}
        </button>
      </form>
    </div>
  );
}
