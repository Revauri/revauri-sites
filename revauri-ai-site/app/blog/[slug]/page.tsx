import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FadeInWhenVisible } from "@/components/motion-wrappers";
import { AuthorByline } from "@/components/blog/author-byline";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { formatDate } from "@/components/blog/post-card";
import { getAllPosts, getPostBySlug, getRelatedPosts, AUTHOR } from "@/lib/blog";
import { extractToc } from "@/lib/toc";
import { mdxComponents } from "@/mdx-components";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function getPublishablePost(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) return undefined;
  if (post.draft && process.env.NODE_ENV === "production") return undefined;
  return post;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishablePost(slug);
  if (!post) return { title: "Blog — Revauri AI" };

  return {
    title: `${post.title} — Revauri AI`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [AUTHOR.name],
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPublishablePost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const headings = extractToc(post.content);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.image ? { image: `https://revauri.ai${post.image}` } : {}),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Revauri AI",
      url: "https://revauri.ai",
    },
    mainEntityOfPage: `https://revauri.ai/blog/${post.slug}`,
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://revauri.ai/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `https://revauri.ai/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div>
      <ReadingProgress targetId="post-body" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* Section 1 — Back-to-blog strip */}
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

      {/* Section 2 — PageHero with date + reading time */}
      <PageHero
        badge={post.category.toUpperCase()}
        title={post.title}
        subtitle={post.description}
      >
        <div className="flex items-center gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-brand-mid-gray">
            {formatDate(post.date)}
          </span>
          <span className="text-brand-mid-gray/40">•</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-brand-mid-gray">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
      </PageHero>

      {/* Section 3 — MDX body */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:grid lg:max-w-[calc(48rem+260px+3rem)] lg:grid-cols-[minmax(0,48rem)_260px] lg:gap-12">
          <div className="lg:col-start-2 lg:row-start-1 lg:h-full">
            <TableOfContents headings={headings} />
          </div>
          <div className="lg:col-start-1 lg:row-start-1">
            <FadeInWhenVisible>
              <div id="post-body" className="prose blog-article dark:prose-invert max-w-none">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
                />
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Section 4 — Author byline */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <FadeInWhenVisible>
            <AuthorByline author={AUTHOR} />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Section 5 — Related posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Section 6 — Closing CTA */}
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
