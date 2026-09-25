import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/portfolio-data";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://www.revauridesigns.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.revauridesigns.com/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revauridesigns.com/book",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revauridesigns.com/contact",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.revauridesigns.com/faq",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.revauridesigns.com/portfolio",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revauridesigns.com/pricing",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revauridesigns.com/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.revauridesigns.com/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://www.revauridesigns.com/terms",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...getAllProjects().map((project) => ({
      url: `https://www.revauridesigns.com/portfolio/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `https://www.revauridesigns.com/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
