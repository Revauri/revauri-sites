import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export interface Author {
  name: string;
  avatar: string;
}

export const AUTHOR: Author = {
  name: "Joseph Silvagnoli",
  avatar: "/joseph-headshot.jpg",
};

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string | null;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured: boolean;
  draft: boolean;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated ?? null,
    category: data.category,
    tags: data.tags ?? [],
    image: data.image ?? undefined,
    imageAlt: data.imageAlt ?? undefined,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    readingTime: readingTime(content).text,
    content,
  };
}

function readAllPostFiles(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(readPostFile);
}

export function getAllPosts(): PostMeta[] {
  const isProduction = process.env.NODE_ENV === "production";

  return readAllPostFiles()
    .filter((post) => !(isProduction && post.draft))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | undefined {
  return readAllPostFiles().find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map((post) => post.category));
  return Array.from(categories);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(slug: string, limit: number): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => current.tags.includes(tag)).length;
      const sameCategory = post.category === current.category ? 1 : 0;
      return { post, sharedTags, sameCategory };
    })
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      if (b.sameCategory !== a.sameCategory) return b.sameCategory - a.sameCategory;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
