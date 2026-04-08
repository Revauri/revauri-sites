"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, ExternalLink, Clock } from "lucide-react";
import BlendedDemoFrame from "@/components/blended-demo-frame";
import { FadeInWhenVisible } from "@/components/motion-wrappers";
import type { PortfolioImage } from "@/lib/portfolio-data";

function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
      <div className="w-full max-w-[320px] space-y-3">
        <div className="h-3 w-3/4 rounded bg-brand-mid-gray/20" />
        <div className="h-3 w-full rounded bg-brand-mid-gray/15" />
        <div className="h-3 w-5/6 rounded bg-brand-mid-gray/15" />
        <div className="mt-4 flex gap-2">
          <div className="h-8 w-24 rounded bg-brand-orange/20" />
          <div className="h-8 w-20 rounded bg-brand-mid-gray/15" />
        </div>
      </div>
    </div>
  );
}

interface Props {
  heroImage: PortfolioImage;
  images: PortfolioImage[];
  hasRealImages: boolean;
  liveUrl: string | null;
}

export default function GallerySection({ heroImage, images, hasRealImages, liveUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Hero is the first image in the combined list
  const allImages: PortfolioImage[] = hasRealImages ? [heroImage, ...images] : images;
  const hasGallery = hasRealImages && allImages.length > 0;

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length),
    [allImages.length],
  );

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % allImages.length),
    [allImages.length],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6">

          {/* Hero screenshot */}
          <FadeInWhenVisible>
            <BlendedDemoFrame>
              <div
                className={`relative overflow-hidden rounded-[1.35rem] bg-brand-light-gray/40 dark:bg-brand-mid-gray/10${hasGallery ? " cursor-pointer group" : ""}`}
                style={
                  hasRealImages
                    ? { aspectRatio: `${heroImage.width} / ${heroImage.height}` }
                    : { aspectRatio: "16 / 9" }
                }
                onClick={hasGallery ? () => openAt(0) : undefined}
                role={hasGallery ? "button" : undefined}
                tabIndex={hasGallery ? 0 : undefined}
                onKeyDown={hasGallery ? (e) => e.key === "Enter" && openAt(0) : undefined}
                aria-label={hasGallery ? "View screenshots" : undefined}
              >
                {hasRealImages ? (
                  <>
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt}
                      width={heroImage.width}
                      height={heroImage.height}
                      className="h-full w-full object-cover transition duration-300 group-hover:brightness-90"
                      sizes="(min-width: 1024px) 960px, 100vw"
                      priority
                    />
                    {hasGallery && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="rounded-full bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                          View screenshots
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <HeroPlaceholder />
                )}
              </div>
            </BlendedDemoFrame>
          </FadeInWhenVisible>

          {/* Thumbnail strip — sits above the "View live site" button */}
          {hasGallery && (
            <FadeInWhenVisible delay={0.12}>
              {/* Mobile: 2-col scrollable grid */}
              <div className="mt-5 grid grid-cols-2 gap-2 overflow-y-auto max-h-56 pt-0.5 px-0.5 sm:hidden">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => openAt(i)}
                    className="relative aspect-video rounded-xl ring-2 ring-transparent transition hover:ring-brand-orange focus-visible:outline-none focus-visible:ring-brand-orange"
                    aria-label={`View screenshot ${i + 1}`}
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-[10px]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Desktop: horizontal scrollable strip, centered */}
              <div className="mt-5 hidden gap-2 overflow-x-auto pt-0.5 pb-1.5 sm:flex sm:justify-center">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => openAt(i)}
                    className="relative aspect-video h-20 flex-shrink-0 rounded-xl ring-2 ring-transparent transition hover:ring-brand-orange focus-visible:outline-none focus-visible:ring-brand-orange"
                    aria-label={`View screenshot ${i + 1}`}
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-[10px]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </FadeInWhenVisible>
          )}

          {/* View live site / Launching soon */}
          <FadeInWhenVisible delay={0.2}>
            <div className="mt-6 flex justify-center">
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-orange/25 px-6 py-3 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange/5"
                >
                  View live site
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-mid-gray/40 bg-brand-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-brand-mid-gray dark:bg-brand-dark/60">
                  <Clock className="h-3.5 w-3.5" />
                  Launching soon
                </span>
              )}
            </div>
          </FadeInWhenVisible>

        </div>
      </section>

      {/* Lightbox modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                aria-label="Next image"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={allImages[activeIndex].src}
                  alt={allImages[activeIndex].alt}
                  width={allImages[activeIndex].width}
                  height={allImages[activeIndex].height}
                  className="max-h-[80vh] w-auto object-contain"
                  sizes="85vw"
                  priority
                />
              </div>
              {allImages[activeIndex].caption && (
                <p className="mt-3 text-sm text-white/70">{allImages[activeIndex].caption}</p>
              )}
              <p className="mt-2 text-xs text-white/40">
                {activeIndex + 1} / {allImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
