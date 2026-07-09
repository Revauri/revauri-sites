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
      className="group block overflow-hidden rounded-xl border border-brand-light-gray/60 bg-brand-white transition-colors hover:border-brand-orange/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-brand-mid-gray/20 dark:bg-[#1a1a19] dark:hover:border-brand-orange/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-light-gray/40 dark:bg-brand-mid-gray/10">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          className="h-full w-full object-cover"
          sizes="300px"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-brand-dark dark:text-brand-cream">
          {project.name}
        </p>
        <p className="mt-0.5 text-xs text-brand-mid-gray">{project.tagline}</p>
        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-orange">
          View project
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
