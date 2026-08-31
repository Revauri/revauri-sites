import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { StaggerChildren, FadeInWhenVisible } from "@/components/motion-wrappers";
import { PostCard } from "@/components/blog/post-card";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import { slugifyCategory, findCategoryBySlug } from "@/lib/category-slug";

export async function generateStaticParams(): Promise<Array<{ category: string }>> {
  return getAllCategories().map((category) => ({ category: slugifyCategory(category) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);
  if (!category) return { title: "Blog — Revauri AI" };

  return {
    title: `${category} — Revauri AI`,
    description: `Posts about ${category} from the Revauri AI blog.`,
    alternates: {
      canonical: `/blog/category/${categorySlug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function BlogCategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);
  if (!category) notFound();
  const posts = getPostsByCategory(category);
  if (posts.length === 0) notFound();

  return (
    <div>
      <div className="bg-brand-cream pt-6 dark:bg-brand-dark">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark/60 transition-colors hover:text-brand-orange dark:text-brand-cream/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blog
          </Link>
        </div>
      </div>

      <PageHero
        badge="Blog"
        title={category}
        subtitle={`Posts filed under ${category}.`}
      />

      <section className="pt-10 pb-16 lg:pt-12 lg:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </StaggerChildren>
        </div>
      </section>

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
