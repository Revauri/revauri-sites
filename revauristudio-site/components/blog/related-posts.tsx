import { GradientText } from "@/components/page-hero";
import { StaggerChildren } from "@/components/motion-wrappers";
import { PostCard } from "./post-card";
import type { PostMeta } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-cream sm:text-4xl">
          Related <GradientText>reading</GradientText>
        </h2>
        <StaggerChildren className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
