import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/inbox",
    },
    sitemap: "https://www.revauridesign.com/sitemap.xml",
  };
}
