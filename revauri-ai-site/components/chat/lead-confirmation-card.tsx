"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/chat/tools";

// The capture_lead tool result: the real delivery outcome plus the (possibly
// edited) fields, so Rev confirms the details the visitor actually sent.
// `status` states the outcome unambiguously for the model — "sent" means the
// inquiry was actually delivered and the card has collapsed to a read-only
// summary (it can no longer be edited or re-sent); "dismissed" means the
// visitor typed a reply instead of using the card, so nothing was sent (see
// handleSend in chat-panel.tsx); the system prompt keys its post-resolution
// rules off this field. `success`/`cancelled` are kept alongside for the UI
// and for older messages restored from sessionStorage.
export type LeadToolOutput = {
  status?: "sent" | "cancelled" | "failed" | "dismissed";
  success: boolean;
  cancelled?: boolean;
  name?: string;
  email?: string;
  company?: string;
  projectDetails?: string;
};

export type LeadProposedInput = {
  name?: string;
  email?: string;
  company?: string;
  projectDetails?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rev is told to leave unknown capture_lead fields empty, but models still
// sometimes fill them with placeholder junk ("[pending]", "unknown", "TBD").
// Treat those as blank so the visitor sees empty labeled fields instead of
// fake text to delete. Genuinely provided values pass through untouched.
const PLACEHOLDER_PATTERN = new RegExp(
  "^(?:" +
    [
      "[\\[<{(].*[\\]>})]", // bracketed: [pending], <your name>, (unknown)
      "pending",
      "unknown",
      "tbd",
      "n\\/?a",
      "none",
      "null",
      "undefined",
      "not (?:provided|specified|given|available|known)(?: yet)?",
      "x{2,}",
      "-+",
      "\\.+",
      "\\?+",
      "your (?:full )?name",
      "your e-?mail(?: address)?",
      "your company(?: name)?",
      "(?:name|email|user|your\\.?email)@(?:example|company|email|domain)\\.[a-z]+",
      "you@company\\.com",
    ].join("|") +
    ")$",
  "i",
);

function sanitizeProposed(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  return PLACEHOLDER_PATTERN.test(trimmed) ? "" : trimmed;
}

const CARD_CLASS =
  "flex flex-col gap-2 rounded-2xl border border-brand-orange/15 bg-gradient-to-b from-brand-orange/[0.08] to-brand-orange/[0.03] p-3.5 dark:border-brand-orange/25 dark:from-brand-orange/[0.14] dark:to-brand-orange/[0.06]";

const FIELD_CLASS =
  "w-full rounded-xl border border-brand-dark/[0.08] bg-brand-white px-3 py-2 text-xs text-brand-dark shadow-sm transition-[border-color,box-shadow] placeholder:text-brand-dark/40 focus:border-brand-orange/60 focus:outline-none focus:ring-2 focus:ring-brand-orange/25 disabled:opacity-60 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-brand-cream dark:placeholder:text-brand-cream/40";

const LABEL_CLASS = "text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-dark/50 dark:text-brand-cream/50";

// Editable "confirm your details" card shown for a pending capture_lead tool
// call. Nothing is sent until the visitor clicks "Send inquiry" — submitLead
// posts to Web3Forms and the real { success } result (plus the edited fields)
// is fed back to the model via addToolOutput.
export function LeadConfirmationCard({
  proposed,
  expired = false,
  onResolve,
}: {
  proposed: LeadProposedInput;
  // True when this pending card can no longer be resolved (e.g. it was
  // restored from an earlier message the SDK can't attach results to).
  expired?: boolean;
  onResolve?: (output: LeadToolOutput) => void;
}) {
  const [name, setName] = useState(() => sanitizeProposed(proposed.name));
  const [email, setEmail] = useState(() => sanitizeProposed(proposed.email));
  const [company, setCompany] = useState(() => sanitizeProposed(proposed.company));
  const [projectDetails, setProjectDetails] = useState(() =>
    sanitizeProposed(proposed.projectDetails),
  );
  const [pending, setPending] = useState(false);

  const emailValid = EMAIL_PATTERN.test(email.trim());
  const disabled = expired || pending;
  const canSend = !disabled && name.trim() !== "" && emailValid && projectDetails.trim() !== "";

  async function handleSend() {
    if (!canSend) return; // also guards double-submit: `pending` blocks canSend
    setPending(true);
    const fields = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      projectDetails: projectDetails.trim(),
    };
    const { success } = await submitLead(fields);
    onResolve?.({ status: success ? "sent" : "failed", success, ...fields });
  }

  return (
    <div className={CARD_CLASS}>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
        CONFIRM YOUR DETAILS
      </span>
      <label className="flex flex-col gap-1">
        <span className={LABEL_CLASS}>Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          placeholder="Your name"
          className={FIELD_CLASS}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className={LABEL_CLASS}>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          placeholder="you@company.com"
          aria-invalid={email.trim() !== "" && !emailValid}
          className={`${FIELD_CLASS} ${
            email.trim() !== "" && !emailValid ? "border-red-400 focus:border-red-400 focus:ring-red-400/25 dark:border-red-500" : ""
          }`}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className={LABEL_CLASS}>Company (optional)</span>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={disabled}
          placeholder="Company name"
          className={FIELD_CLASS}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className={LABEL_CLASS}>Project details</span>
        <textarea
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          disabled={disabled}
          rows={3}
          placeholder="What you're looking for"
          className={`${FIELD_CLASS} resize-none`}
        />
      </label>
      {expired ? (
        <p className="text-[11px] text-brand-dark/60 dark:text-brand-cream/60">
          This card is no longer active — ask Rev to send your details again.
        </p>
      ) : (
        <div className="mt-0.5 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-orange px-3.5 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(217,119,87,0.6)] transition-all hover:brightness-[1.05] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2"
          >
            {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {pending ? "Sending..." : "Send inquiry"}
          </button>
          <button
            type="button"
            onClick={() => onResolve?.({ status: "cancelled", success: false, cancelled: true })}
            disabled={pending}
            className="rounded-xl px-3 py-2 text-xs font-medium text-brand-dark/60 transition-colors hover:bg-brand-dark/[0.05] hover:text-brand-dark disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 dark:text-brand-cream/60 dark:hover:bg-white/[0.06] dark:hover:text-brand-cream"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// Compact read-only summary shown once the card is resolved, so history
// stays tidy after the send/cancel.
export function LeadResolvedCard({ output }: { output: LeadToolOutput }) {
  return (
    <div className={CARD_CLASS}>
      {output.success ? (
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs font-semibold text-brand-dark dark:text-brand-cream">
          <Check className="h-3.5 w-3.5 text-brand-orange" />
          Inquiry sent
          {output.email && (
            <span className="min-w-0 break-all font-normal text-brand-dark/60 dark:text-brand-cream/60">· {output.email}</span>
          )}
        </div>
      ) : (
        <p className="text-xs text-brand-dark/60 dark:text-brand-cream/60">Inquiry not sent</p>
      )}
    </div>
  );
}
