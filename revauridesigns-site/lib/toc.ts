import GithubSlugger from "github-slugger";

export interface TocEntry {
  depth: 2 | 3;
  text: string;
  slug: string;
}

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*#*$/;

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .trim();
}

export function extractToc(source: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inCodeFence = false;

  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = HEADING_RE.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = stripInlineMarkdown(match[2]);
    entries.push({ depth, text, slug: slugger.slug(text) });
  }

  return entries;
}
