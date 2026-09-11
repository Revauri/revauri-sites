import Image from "next/image";
import { CLIENT_REVIEWS, type ClientReview } from "@/lib/reviews-data";
import { FadeInWhenVisible } from "./motion-wrappers";

type ClientReviewsProps = {
  variant?: "full" | "compact";
};

const STAR_PATH =
  "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z";

function starFills(rating: number, lastStarFill: number, max: number): number[] {
  const full = Math.min(max, Math.floor(rating));
  return Array.from({ length: max }, (_, index) => {
    if (index < full) return 1;
    if (index === full) return lastStarFill;
    return 0;
  });
}

function StarGlyph({ fill }: { fill: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[1em] shrink-0 align-[-0.125em]">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute inset-0 h-[1em] w-[1em] text-amber-400/25"
      >
        <path d={STAR_PATH} fill="currentColor" />
      </svg>
      {fill > 0 ? (
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${Math.min(1, fill) * 100}%` }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[1em] w-[1em] text-amber-400"
          >
            <path d={STAR_PATH} fill="currentColor" />
          </svg>
        </span>
      ) : null}
    </span>
  );
}

function StarRating({ review }: { review: ClientReview }) {
  const fills = starFills(review.rating, review.lastStarFill, review.ratingMax);
  const label = `${review.rating.toFixed(1)} out of ${review.ratingMax}`;

  return (
    <p className="text-amber-400" aria-label={label}>
      {fills.map((fill, index) => (
        <StarGlyph key={index} fill={fill} />
      ))}
    </p>
  );
}

function ReviewAvatar({
  review,
  size,
}: {
  review: ClientReview;
  size: "full" | "compact";
}) {
  const initials = review.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const box = size === "compact" ? "h-8 w-8" : "h-10 w-10";

  return (
    <span
      className={`relative ${box} shrink-0 overflow-hidden rounded-full bg-brand-orange/15`}
    >
      {review.avatar ? (
        <Image
          src={review.avatar}
          alt={review.author}
          width={size === "compact" ? 32 : 40}
          height={size === "compact" ? 32 : 40}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="grid h-full w-full place-items-center text-[11px] font-medium text-brand-orange">
          {initials}
        </span>
      )}
    </span>
  );
}

function ReviewColumn({
  review,
  variant,
}: {
  review: ClientReview;
  variant: "full" | "compact";
}) {
  const compact = variant === "compact";
  const score = `${review.rating.toFixed(1)} out of ${review.ratingMax}`;

  return (
    <article className="flex h-full flex-col">
      <div
        className={`text-center ${compact ? "px-4 py-3" : "px-5 py-3.5 sm:px-6"}`}
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand-dark/40 uppercase break-all dark:text-brand-cream/40">
          {review.domain}
        </p>
        <div className="mt-1.5 text-sm">
          <StarRating review={review} />
        </div>
        <p className="mt-1 text-sm font-medium text-brand-dark dark:text-brand-cream">
          {score}
        </p>
      </div>

      <div
        className={`flex flex-1 flex-col border-t border-brand-light-gray/60 bg-brand-cream text-center dark:border-brand-mid-gray/20 dark:bg-white/[0.04] ${
          compact ? "px-4 py-4" : "px-5 py-5 sm:px-6"
        }`}
      >
        <p
          className="text-2xl leading-none text-brand-dark/20 dark:text-brand-cream/20"
          aria-hidden
        >
          &ldquo;
        </p>
        <blockquote
          className={`mx-auto max-w-md text-pretty leading-relaxed text-brand-dark/80 dark:text-brand-cream/80 ${
            compact ? "mt-2 text-sm" : "mt-2.5 text-[15px] sm:text-base"
          }`}
        >
          {review.quote}
        </blockquote>
        <footer
          className={`mt-auto flex items-center justify-center gap-2.5 ${
            compact ? "pt-3" : "pt-4"
          }`}
        >
          <ReviewAvatar review={review} size={variant} />
          <div className="text-left">
            <p className="text-sm font-medium text-brand-dark dark:text-brand-cream">
              {review.author}
            </p>
            <p className="text-xs text-brand-dark/50 dark:text-brand-cream/50">
              {review.role}
            </p>
            <p className="text-xs text-brand-dark/50 dark:text-brand-cream/50">
              {review.company}
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
}

export function ClientReviews({ variant = "full" }: ClientReviewsProps) {
  const compact = variant === "compact";

  return (
    <section
      className={`bg-brand-cream dark:bg-brand-dark ${
        compact ? "pt-5 pb-3 sm:pt-6 sm:pb-4" : "py-10 lg:py-12"
      }`}
      aria-labelledby="client-reviews-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible>
          <p
            id="client-reviews-heading"
            className="section-eyebrow text-center"
          >
            Client reviews
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-brand-light-gray/60 bg-brand-white shadow-[var(--shadow-md)] dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]">
            <div className="grid divide-y divide-brand-light-gray/60 md:grid-cols-2 md:divide-x md:divide-y-0 dark:divide-brand-mid-gray/20">
              {CLIENT_REVIEWS.map((review) => (
                <ReviewColumn
                  key={review.domain}
                  review={review}
                  variant={variant}
                />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
