import Image from "next/image";
import type { Author } from "@/lib/blog";

export function AuthorByline({ author }: { author: Author }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-brand-light-gray/60 bg-brand-white p-4 shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] sm:items-center sm:gap-4 sm:p-6">
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
          {author.name}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
          Founder of Revauri. Builds custom websites for law firms, fintech
          companies, and senior care businesses that want to stand out.
        </p>
      </div>
    </div>
  );
}
