import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PAGE_HEROES } from "@/lib/marketing-copy";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";
import { PostCard, PostImageFallback, formatDate } from "@/components/blog/post-card";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { slugifyCategory } from "@/lib/category-slug";

export const metadata: Metadata = {
  title: "Blog — Revauri AI",
  description:
    "Notes on putting an AI employee on the work you'd otherwise hire for — what the workflows do, what stays your call, and what we learn running them.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = featured ? posts.filter((post) => post.slug !== featured.slug) : posts;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Revauri AI Blog",
    url: "https://revauri.ai/blog",
    description:
      "Notes on putting an AI employee on work you'd otherwise hire someone to do.",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        badge={PAGE_HEROES.blog.badge}
        title={PAGE_HEROES.blog.title}
        subtitle={PAGE_HEROES.blog.subtitle}
      />

      {posts.length === 0 ? (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <FadeInWhenVisible>
              <p className="text-lg text-brand-dark/60 dark:text-brand-cream/60">
                Notes are coming.{" "}
                <Link href="/capabilities" className="font-medium text-brand-orange hover:underline">
                  See the jobs
                </Link>{" "}
                or{" "}
                <Link href="/book" className="font-medium text-brand-orange hover:underline">
                  book a call
                </Link>
                .
              </p>
            </FadeInWhenVisible>
          </div>
        </section>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <section className="pt-10 pb-6 lg:pt-12">
              <div className="mx-auto max-w-5xl px-6">
                <FadeInWhenVisible>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group block focus-visible:outline-none"
                    aria-label={`Read featured post: ${featured.title}`}
                  >
                    <BlendedDemoFrame>
                      <article className="grid grid-cols-1 overflow-hidden rounded-[16px] border border-black/[0.08] bg-brand-white transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-brand-orange dark:border-white/[0.08] dark:bg-[#1a1a19] md:grid-cols-2">
                        <div className="relative aspect-[16/9] bg-brand-light-gray/40 dark:bg-brand-mid-gray/10 md:aspect-auto">
                          {featured.image ? (
                            <Image
                              src={featured.image}
                              alt={featured.imageAlt ?? ""}
                              fill
                              sizes="(min-width: 768px) 50vw, 100vw"
                              className="object-cover"
                              priority
                            />
                          ) : (
                            <PostImageFallback category={featured.category} />
                          )}
                        </div>
                        <div className="flex flex-col justify-center p-8">
                          <span className="section-eyebrow mb-3">Featured</span>
                          <h2 className="text-2xl font-bold text-brand-dark dark:text-brand-cream">
                            {featured.title}
                          </h2>
                          <p className="mt-3 text-base leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                            {featured.description}
                          </p>
                          <div className="mt-6 flex items-center gap-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-brand-mid-gray">
                              <Clock className="h-3 w-3" />
                              {featured.readingTime}
                            </span>
                            <span className="text-xs text-brand-mid-gray">
                              {formatDate(featured.date)}
                            </span>
                          </div>
                          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange">
                            Read post
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </article>
                    </BlendedDemoFrame>
                  </Link>
                </FadeInWhenVisible>
              </div>
            </section>
          )}

          {/* Category filters */}
          {categories.length > 0 && (
            <section className="pb-6">
              <div className="mx-auto max-w-5xl px-6">
                <FadeInWhenVisible>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/blog/category/${slugifyCategory(category)}`}
                        className="rounded-full border border-brand-light-gray/60 px-4 py-1.5 text-sm font-medium text-brand-dark/70 transition-colors hover:border-brand-orange/40 hover:text-brand-orange dark:border-brand-mid-gray/20 dark:text-brand-cream/70"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </FadeInWhenVisible>
              </div>
            </section>
          )}

          {/* Card grid */}
          {rest.length > 0 && (
            <section className="pt-4 pb-16 lg:pb-20">
              <div className="mx-auto max-w-5xl px-6">
                <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </StaggerChildren>
              </div>
            </section>
          )}
        </>
      )}

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
              Ready to hand the work off?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 text-lg text-brand-dark/60 dark:text-brand-cream/60">
              Book a short call. Name the job. We take it from there.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.16}>
            <Link
              href="/book"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
