const WEB3FORMS_ACCESS_KEY = "84431b19-9bc8-45f0-a60a-eb6d683a0008";
const SUBMIT_TIMEOUT_MS = 8_000;

export async function notifyNewChat(input: {
  preview: string;
  pathname: string;
  conversationId: string;
}): Promise<{ success: boolean }> {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.revauri.com";
  const inboxUrl = `${origin}/inbox/${input.conversationId}`;
  const page = input.pathname || "/";
  const preview = input.preview.trim() || "(no preview)";

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New chat started — revauri.com",
        name: "Rev chatbot",
        email: "joseph@revauri.com",
        message: [
          "Someone started a chat on revauri.com.",
          "",
          `Page: ${page}`,
          `First message: ${preview}`,
          "",
          `Open inbox: ${inboxUrl}`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    return { success: res.ok && data?.success === true };
  } catch {
    return { success: false };
  }
}
