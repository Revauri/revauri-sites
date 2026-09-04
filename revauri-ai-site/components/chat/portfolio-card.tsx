import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Matches the shape produced by the show_portfolio tool (lib/chat/tools.ts),
// which maps real PROJECTS entries from lib/portfolio-data.ts.
export type PortfolioCardData = {
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  href: string;
};

export function PortfolioCard({ project }: { project: PortfolioCardData }) {
  return (
    <Link
      href={project.href}
      className="group block overflow-hidden rounded-2xl border border-brand-dark/[0.06] bg-brand-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-[0_12px_28px_-12px_rgba(20,20,19,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream dark:border-white/[0.08] dark:bg-white/[0.05] dark:hover:border-brand-orange/50 dark:focus-visible:ring-offset-[#161615]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-light-gray/40 dark:bg-white/[0.04]">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="300px"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
          {project.name}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">{project.tagline}</p>
        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-orange">
          View project
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
