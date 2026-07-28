import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

export function formatDate(iso: string): string {
  // Date-only frontmatter ("2026-07-27") parses as UTC midnight, so formatting
  // in local time renders the previous day anywhere behind UTC. Pin to UTC.
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function PostImageFallback({ category }: { category: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-brand-orange/10">
      <span className="rounded-full bg-brand-orange/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-orange">
        {category}
      </span>
    </div>
  );
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`Read post: ${post.title}`}
    >
      <article className="overflow-hidden rounded-2xl border border-brand-light-gray/60 bg-brand-white transition-all duration-300 group-hover:border-brand-orange/30 group-focus-visible:ring-2 group-focus-visible:ring-brand-orange dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
        <div className="relative aspect-[16/9] bg-brand-light-gray/40 dark:bg-brand-mid-gray/10">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.imageAlt ?? ""}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <PostImageFallback category={post.category} />
          )}
        </div>
        <div className="p-6">
          <span className="mb-2 inline-block rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-orange">
            {post.category}
          </span>
          <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-cream">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
            {post.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs text-brand-mid-gray">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange">
              <span className="group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-amber-500 group-hover:bg-clip-text group-hover:text-transparent">
                Read post
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
