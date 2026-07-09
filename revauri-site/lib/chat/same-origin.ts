// Browsers send an Origin header (or at least a Referer) on cross-site fetch
// POSTs, so requiring it to match our own Host header blocks other sites from
// calling these routes — in prod and localhost dev alike. When both headers are
// absent (same-origin non-CORS requests may omit them), the request is allowed.
export function isSameOrigin(req: Request): boolean {
  const source = req.headers.get("origin") ?? req.headers.get("referer");
  if (!source) return true;
  try {
    return new URL(source).host === req.headers.get("host");
  } catch {
    return false; // malformed Origin/Referer — treat as cross-origin
  }
}
