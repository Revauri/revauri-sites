import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/inbox",
    },
    sitemap: "https://revauri.ai/sitemap.xml",
  };
}
