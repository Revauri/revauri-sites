import { StaggerChildren } from "@/components/motion-wrappers";
import { PostCard } from "./post-card";
import type { PostMeta } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <div className="section-measure px-6">
        <h2 className="section-h2 text-brand-dark dark:text-brand-cream">
          Related reading
        </h2>
        <StaggerChildren className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
