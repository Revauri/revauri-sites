import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://revauri.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://revauri.com/portfolio",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getAllProjects().map((project) => ({
      url: `https://revauri.com/portfolio/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
