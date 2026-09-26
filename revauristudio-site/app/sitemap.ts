import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://revauristudio.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://revauristudio.com/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://revauristudio.com/book",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://revauristudio.com/capabilities",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://revauristudio.com/contact",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://revauristudio.com/faq",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://revauristudio.com/pricing",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://revauristudio.com/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://revauristudio.com/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://revauristudio.com/terms",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...getAllPosts().map((post) => ({
      url: `https://revauristudio.com/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
