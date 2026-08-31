import { test } from "node:test";
import assert from "node:assert/strict";
import {
  HERO_COPY,
  FINAL_CTA_COPY,
  SUPPORT_COPY,
  FOOTER_BLURB,
  PAGE_HEROES,
} from "./marketing-copy.ts";
import {
  ACCORDION_ITEMS,
  FEATURE_SECTIONS,
  WHAT_IT_DOES_INTRO,
  featureGridCols,
} from "../components/what-it-does/script.ts";
import { TOOLS_TABS } from "../components/tools-demo/script.ts";
import {
  TRADE_WORDS,
  WORD_SEARCH_COLS,
  WORD_SEARCH_GRID,
  gridHasWord,
} from "../components/trades-word-search/script.ts";
import { HOW_WE_WORK_CARDS } from "../components/how-we-work-data.ts";

test("hero copy matches the plan verbatim", () => {
  assert.equal(HERO_COPY.h1Line1, "Hire an AI employee.");
  assert.equal(HERO_COPY.h1Line2, "Not another salary.");
  assert.equal(
    HERO_COPY.body,
    "We build it. We run it. The busywork leaves your plate while you stay on the job — and off the clock.",
  );
  assert.equal(HERO_COPY.primary, "Book a call");
  assert.equal(HERO_COPY.secondary, "See the jobs");
  assert.equal(HERO_COPY.micro, "After setup, you are not in the busywork.");
});

test("final CTA, support, and footer blurb match the plan verbatim", () => {
  assert.equal(FINAL_CTA_COPY.h2, "Ready to hand the work off?");
  assert.equal(
    FINAL_CTA_COPY.body,
    "Book a short call. Name the job. We take it from there — and quote it against hiring a person, not against a software tool.",
  );
  assert.equal(FINAL_CTA_COPY.button, "Book a call");
  assert.equal(FINAL_CTA_COPY.chip, "No obligation");
  assert.equal(SUPPORT_COPY.h2, "Need a hand?");
  assert.deepEqual(
    SUPPORT_COPY.channels.map((c) => [c.title, c.line, c.cta]),
    [
      ["Book a call", "The work you want off your plate", "Schedule now"],
      ["Email us", "We reply within a few hours", "joseph@revauri.com"],
      ["Browse FAQ", "Answers to common questions", "View FAQ"],
    ],
  );
  assert.equal(
    FOOTER_BLURB,
    "An AI employee for the work you'd otherwise hire for.",
  );
});

test("PageHero table strings match the plan verbatim", () => {
  assert.equal(PAGE_HEROES.capabilities.badge, "Capabilities");
  assert.equal(PAGE_HEROES.capabilities.title, "Example hires");
  assert.equal(
    PAGE_HEROES.capabilities.subtitle,
    "The phone, the follow-ups, the busywork. We build the workflow and run it.",
  );
  assert.equal(PAGE_HEROES.pricing.title, "Priced on the job");
  assert.equal(PAGE_HEROES.pricing.muted, "not on a software tier");
  assert.equal(
    PAGE_HEROES.pricing.subtitle,
    "A lot less than putting another person on payroll. Quoted on a short call. No public price list.",
  );
  assert.equal(PAGE_HEROES.about.title, "Hire the work");
  assert.equal(PAGE_HEROES.about.muted, "not another person");
  assert.equal(PAGE_HEROES.faq.title, "Questions");
  assert.equal(PAGE_HEROES.contact.title, "Get in touch");
  assert.equal(
    PAGE_HEROES.contact.subtitle,
    "Name the job. Or book a call — that’s faster.",
  );
  assert.equal(PAGE_HEROES.book.title, "Name the job");
  assert.equal(PAGE_HEROES.book.muted, "you’d otherwise hire for");
  assert.equal(PAGE_HEROES.blog.title, "Notes");
  assert.equal(PAGE_HEROES.privacy.title, "Privacy Policy");
  assert.equal(PAGE_HEROES.privacy.subtitle, "Last updated: August 13, 2026");
  assert.equal(PAGE_HEROES.terms.title, "Terms of Service");
});

test("what-it-does intro and 1.1–3.4 accordion titles match the plan", () => {
  assert.equal(WHAT_IT_DOES_INTRO.eyebrow, "What the hire does");
  assert.equal(WHAT_IT_DOES_INTRO.h2Line1, "Stay on the job.");
  assert.equal(WHAT_IT_DOES_INTRO.h2Line2, "Put the AI employee on the rest.");
  assert.equal(FEATURE_SECTIONS.length, 3);
  assert.equal(FEATURE_SECTIONS[0].kicker, "1.0 — CATCH");
  assert.equal(FEATURE_SECTIONS[1].kicker, "2.0 — FOLLOW UP");
  assert.equal(FEATURE_SECTIONS[2].kicker, "3.0 — KEEP RUNNING");
  const expected = [
    ["1.1", "After-hours calls"],
    ["1.2", "Missed and overflow"],
    ["1.3", "Capture name, number, job"],
    ["1.4", "Hold a callback"],
    ["2.1", "Quiet leads"],
    ["2.2", "Quotes sitting still"],
    ["2.3", "Past customers"],
    ["2.4", "In your voice"],
    ["3.1", "Review asks"],
    ["3.2", "Reminders / no-shows"],
    ["3.3", "After-the-job check-in"],
    ["3.4", "Inbox busywork"],
  ];
  assert.equal(ACCORDION_ITEMS.length, 12);
  assert.deepEqual(
    ACCORDION_ITEMS.map((item) => [item.code, item.title]),
    expected,
  );
});

test("follow-up row gives the mock the 1fr track and copy the 340px track", () => {
  const catchRow = FEATURE_SECTIONS.find((s) => s.id === "catch");
  const followUp = FEATURE_SECTIONS.find((s) => s.id === "follow-up");
  const keep = FEATURE_SECTIONS.find((s) => s.id === "keep-running");
  assert.equal(catchRow.side, "copy-left");
  assert.equal(followUp.side, "copy-right");
  assert.equal(keep.side, "copy-left");
  assert.equal(
    featureGridCols(followUp.side),
    "min-[1000px]:grid-cols-[1fr_minmax(280px,340px)]",
  );
  assert.equal(
    featureGridCols(catchRow.side),
    "min-[1000px]:grid-cols-[minmax(280px,340px)_1fr]",
  );
  assert.equal(featureGridCols(keep.side), featureGridCols(catchRow.side));
});

test("tools tab labels match the three plan claims", () => {
  assert.deepEqual(
    TOOLS_TABS.map((tab) => tab.label),
    [
      "You stay in control — nothing sends without your approval",
      "It runs several jobs at the same time",
      "Built around how you already work",
    ],
  );
  assert.deepEqual(
    TOOLS_TABS.map((tab) => tab.id),
    ["approve", "parallel", "scoped"],
  );
});

test("word-search grid is 17 columns and contains all 10 trade words", () => {
  assert.equal(WORD_SEARCH_COLS, 17);
  assert.equal(TRADE_WORDS.length, 10);
  for (const row of WORD_SEARCH_GRID) {
    assert.equal(row.length, WORD_SEARCH_COLS);
  }
  for (const word of TRADE_WORDS) {
    assert.equal(
      gridHasWord(word),
      true,
      `${word} missing from the shipped 17-column grid`,
    );
  }
});

test("how-we-work cards link to the plan routes", () => {
  assert.deepEqual(
    HOW_WE_WORK_CARDS.map((card) => [card.roman, card.href]),
    [
      ["I", "/book"],
      ["II", "/capabilities"],
      ["III", "/about"],
      ["IV", "/book"],
    ],
  );
});
