import { z } from "zod";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { isSameOrigin } from "@/lib/chat/same-origin";

export const runtime = "nodejs";
export const maxDuration = 15;

const SUBMIT_TIMEOUT_MS = 8_000;

const leadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  company: z.string().max(200).optional(),
  projectDetails: z.string().min(1).max(2_000),
});

// Delivers chatbot leads to joseph@revauri.com via Web3Forms (free tier, JSON
// API built for server-side calls) and returns a real { success } — unlike the
// old fire-and-forget iframe hack this replaced. FormSubmit is not usable here:
// its Cloudflare bot challenge blocks server-side fetches for this account
// (previously documented in lib/chat/tools.ts), and its AJAX mode has no CORS
// allow-origin for browser calls either. Without WEB3FORMS_KEY set, the route
// reports failure honestly so Rev can point the visitor at direct email.
export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return new Response(JSON.stringify({ success: false, error: "Forbidden" }), { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed } = checkRateLimit(`lead:${ip}`);
  if (!allowed) {
    return new Response(JSON.stringify({ success: false, error: "Too many requests" }), {
      status: 429,
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: "Invalid JSON" }), { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ success: false, error: "Invalid request" }), {
      status: 400,
    });
  }

  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    console.error("WEB3FORMS_KEY is not set — chatbot lead could not be delivered");
    return Response.json({ success: false });
  }

  const { name, email, company, projectDetails } = parsed.data;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New chatbot lead from revauri.com",
        name,
        email,
        company: company ?? "",
        message: `[Submitted via chatbot]\n\n${projectDetails}`,
      }),
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    return Response.json({ success: res.ok && data?.success === true });
  } catch {
    // Network failure or timeout — report honestly so Rev never claims success.
    return Response.json({ success: false });
  }
}
