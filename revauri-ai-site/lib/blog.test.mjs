import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts, getRelatedPosts } from "./blog.ts";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

function writePost(filename, frontmatter, body = "Body content.") {
  const yaml = Object.entries(frontmatter)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(POSTS_DIR, filename), `---\n${yaml}\n---\n${body}\n`);
}

function cleanup(filenames) {
  for (const filename of filenames) {
    fs.rmSync(path.join(POSTS_DIR, filename), { force: true });
  }
}

test("getAllPosts parses slugs from filenames and sorts newest first", async () => {
  const files = ["post-a.mdx", "post-b.mdx"];
  writePost("post-a.mdx", {
    title: "Post A",
    description: "desc",
    date: "2026-01-01",
    category: "Legal",
    tags: ["law"],
    image: "/a.png",
    imageAlt: "a",
    featured: false,
    draft: false,
  });
  writePost("post-b.mdx", {
    title: "Post B",
    description: "desc",
    date: "2026-02-01",
    category: "Legal",
    tags: ["law"],
    image: "/b.png",
    imageAlt: "b",
    featured: false,
    draft: false,
  });

  try {
    const posts = getAllPosts();
    const slugs = posts.map((p) => p.slug);
    assert.ok(slugs.includes("post-a"));
    assert.ok(slugs.includes("post-b"));
    assert.ok(slugs.indexOf("post-b") < slugs.indexOf("post-a"));
  } finally {
    cleanup(files);
  }
});

test("getAllPosts tolerates a post with no image", async () => {
  const files = ["no-image.mdx"];
  writePost("no-image.mdx", {
    title: "No Image Post",
    description: "desc",
    date: "2026-01-01",
    category: "Legal",
    tags: [],
    featured: false,
    draft: false,
  });

  try {
    const post = getAllPosts().find((p) => p.slug === "no-image");
    assert.ok(post);
    assert.equal(post.image, undefined);
    assert.equal(post.imageAlt, undefined);
  } finally {
    cleanup(files);
  }
});

test("getAllPosts excludes draft posts in production, includes them otherwise", async () => {
  const files = ["draft-post.mdx"];
  writePost("draft-post.mdx", {
    title: "Draft Post",
    description: "desc",
    date: "2026-01-01",
    category: "Legal",
    tags: [],
    image: "/d.png",
    imageAlt: "d",
    featured: false,
    draft: true,
  });

  const originalEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = "development";
    assert.ok(getAllPosts().some((p) => p.slug === "draft-post"));

    process.env.NODE_ENV = "production";
    assert.ok(!getAllPosts().some((p) => p.slug === "draft-post"));
  } finally {
    process.env.NODE_ENV = originalEnv;
    cleanup(files);
  }
});

test("getRelatedPosts ranks by shared tags, then category, then recency", async () => {
  const files = ["current.mdx", "shared-tags.mdx", "same-category.mdx", "unrelated.mdx"];
  writePost("current.mdx", {
    title: "Current",
    description: "desc",
    date: "2026-03-01",
    category: "Legal",
    tags: ["injury", "nj"],
    image: "/c.png",
    imageAlt: "c",
    featured: false,
    draft: false,
  });
  writePost("shared-tags.mdx", {
    title: "Shared Tags",
    description: "desc",
    date: "2025-01-01",
    category: "Fintech",
    tags: ["injury"],
    image: "/s.png",
    imageAlt: "s",
    featured: false,
    draft: false,
  });
  writePost("same-category.mdx", {
    title: "Same Category",
    description: "desc",
    date: "2026-02-01",
    category: "Legal",
    tags: [],
    image: "/sc.png",
    imageAlt: "sc",
    featured: false,
    draft: false,
  });
  writePost("unrelated.mdx", {
    title: "Unrelated",
    description: "desc",
    date: "2026-02-15",
    category: "Senior Care",
    tags: [],
    image: "/u.png",
    imageAlt: "u",
    featured: false,
    draft: false,
  });

  try {
    const related = getRelatedPosts("current", 2);
    assert.deepEqual(
      related.map((p) => p.slug),
      ["shared-tags", "same-category"],
    );
  } finally {
    cleanup(files);
  }
});
