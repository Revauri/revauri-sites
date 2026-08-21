"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteConversationButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!window.confirm("Delete this conversation?")) return;
    setPending(true);
    setError("");
    try {
      const res = await fetch(`/api/inbox/conversations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Could not delete this chat.");
        return;
      }
      router.replace("/inbox");
      router.refresh();
    } catch {
      setError("Could not delete this chat.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={() => void handleClick()}
        disabled={pending}
        className="min-h-11 rounded-xl border border-red-200 px-4 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/60 dark:text-red-300 dark:hover:bg-red-950/40"
      >
        {pending ? "Deleting…" : "Delete conversation"}
      </button>
      {error ? <p className="text-sm text-red-700 dark:text-red-400">{error}</p> : null}
    </div>
  );
}
