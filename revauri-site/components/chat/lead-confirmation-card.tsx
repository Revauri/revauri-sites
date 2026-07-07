"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/chat/tools";

// The capture_lead tool result: the real delivery outcome plus the (possibly
// edited) fields, so Rev confirms the details the visitor actually sent.
export type LeadToolOutput = {
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

const CARD_CLASS =
  "flex flex-col gap-2 rounded-xl border border-brand-orange/20 bg-brand-orange/[0.06] p-3 dark:border-brand-orange/30 dark:bg-brand-orange/10";

const FIELD_CLASS =
  "w-full rounded-lg border border-brand-light-gray/60 bg-brand-white px-2.5 py-2 text-xs text-brand-dark placeholder:text-brand-mid-gray focus:border-brand-orange focus:outline-none disabled:opacity-60 dark:border-brand-mid-gray/30 dark:bg-brand-dark/40 dark:text-brand-cream";

const LABEL_CLASS = "text-[10px] font-semibold uppercase tracking-wide text-brand-mid-gray";

// Editable "confirm your details" card shown for a pending capture_lead tool
// call. Nothing is sent until the visitor clicks "Send to Joseph" — the POST
// goes to /api/lead and the real { success } result (plus the edited fields)
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
  const [name, setName] = useState(proposed.name ?? "");
  const [email, setEmail] = useState(proposed.email ?? "");
  const [company, setCompany] = useState(proposed.company ?? "");
  const [projectDetails, setProjectDetails] = useState(proposed.projectDetails ?? "");
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
    onResolve?.({ success, ...fields });
  }

  return (
    <div className={CARD_CLASS}>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-orange">
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
            email.trim() !== "" && !emailValid ? "border-red-400 dark:border-red-500" : ""
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
        <p className="text-[11px] text-brand-mid-gray">
          This session expired — ask Rev to send your details again.
        </p>
      ) : (
        <div className="mt-0.5 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3.5 py-2 text-xs font-semibold text-white transition-all hover:brightness-[1.04] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {pending ? "Sending..." : "Send to Joseph"}
          </button>
          <button
            type="button"
            onClick={() => onResolve?.({ success: false, cancelled: true })}
            disabled={pending}
            className="rounded-full px-3 py-2 text-xs font-medium text-brand-mid-gray transition-colors hover:text-brand-dark disabled:opacity-50 dark:hover:text-brand-cream"
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
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-dark dark:text-brand-cream">
          <Check className="h-3.5 w-3.5 text-brand-orange" />
          Sent to Joseph
          {output.email && (
            <span className="font-normal text-brand-mid-gray">· {output.email}</span>
          )}
        </div>
      ) : (
        <p className="text-xs text-brand-mid-gray">Not sent</p>
      )}
    </div>
  );
}
