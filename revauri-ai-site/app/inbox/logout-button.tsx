"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleClick() {
    await fetch("/api/inbox/logout", { method: "POST" });
    router.replace("/inbox/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      className="min-h-11 rounded-xl px-3 text-sm font-medium text-brand-mid-gray hover:text-brand-dark dark:hover:text-brand-cream"
    >
      Sign out
    </button>
  );
}
