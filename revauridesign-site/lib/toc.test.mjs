import { test } from "node:test";
import assert from "node:assert/strict";
import { extractToc } from "./toc.ts";

test("extractToc pulls H2 and H3 headings in order, ignoring H1 and H4+", () => {
  const source = [
    "# Title",
    "",
    "Intro paragraph.",
    "",
    "## First section",
    "",
    "### A subsection",
    "",
    "#### Too deep",
    "",
    "## Second section",
  ].join("\n");

  const entries = extractToc(source);

  assert.deepEqual(
    entries.map((e) => [e.depth, e.text]),
    [
      [2, "First section"],
      [3, "A subsection"],
      [2, "Second section"],
    ]
  );
});

test("extractToc ignores headings inside fenced code blocks", () => {
  const source = [
    "## Real heading",
    "",
    "```",
    "# not a heading",
    "## also not a heading",
    "```",
    "",
    "### Another real heading",
  ].join("\n");

  const entries = extractToc(source);

  assert.deepEqual(
    entries.map((e) => e.text),
    ["Real heading", "Another real heading"]
  );
});

test("extractToc dedupes slugs for repeated heading text, matching github-slugger", () => {
  const source = ["## Overview", "", "## Overview"].join("\n");

  const entries = extractToc(source);

  assert.deepEqual(
    entries.map((e) => e.slug),
    ["overview", "overview-1"]
  );
});

test("extractToc strips inline markdown from heading text", () => {
  const source = "## Use `npm install` and **bold** text with a [link](/foo)";

  const entries = extractToc(source);

  assert.equal(entries[0].text, "Use npm install and bold text with a link");
  assert.equal(entries[0].slug, "use-npm-install-and-bold-text-with-a-link");
});
