import { getAllCategories } from "@/lib/blog";

/** Slugifies a category display name (e.g. "Pricing" -> "pricing") for use in URLs. */
export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Resolves a URL slug back to the original category display name. */
export function findCategoryBySlug(slug: string): string | undefined {
  return getAllCategories().find((category) => slugifyCategory(category) === slug);
}
