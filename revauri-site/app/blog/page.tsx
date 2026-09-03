import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FadeInWhenVisible, StaggerChildren } from "@/components/motion-wrappers";
import BlendedDemoFrame from "@/components/blended-demo-frame";
import { PostCard, PostImageFallback, formatDate } from "@/components/blog/post-card";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { slugifyCategory } from "@/lib/category-slug";

export const metadata: Metadata = {
  title: "Blog — Revauri",
  description:
    "Insights on web design, pricing, and building sites that convert — for law firms, fintech companies, and senior care businesses.",
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
    name: "Revauri Blog",
    url: "https://www.revauri.com/blog",
    description:
      "Insights on web design, pricing, and building sites that convert.",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        badge="BLOG"
        title="The Blog"
        subtitle="Practical advice on web design, pricing, and building sites that convert — drawn from real client work."
      />

      {posts.length === 0 ? (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <FadeInWhenVisible>
              <p className="text-lg text-brand-dark/60 dark:text-brand-cream/60">
                No posts yet — check back soon. In the meantime,{" "}
                <Link href="/portfolio" className="font-medium text-brand-orange hover:underline">
                  see our work
                </Link>{" "}
                or{" "}
                <Link href="/book" className="font-medium text-brand-orange hover:underline">
                  book a free strategy call
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
                      <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-brand-light-gray/60 bg-brand-white transition-all duration-300 group-hover:border-brand-orange/30 group-focus-visible:ring-2 group-focus-visible:ring-brand-orange dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] md:grid-cols-2">
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
                          <span className="mb-3 inline-flex w-fit items-center rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-orange">
                            Featured
                          </span>
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
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
              Ready to build something{" "}
              <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                worth sharing
              </span>
              ?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="mt-4 text-lg text-brand-dark/60 dark:text-brand-cream/60">
              Book a free call and see a custom redesign of your site — before
              you spend a dime.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.16}>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 animate-pulse-glow"
            >
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
