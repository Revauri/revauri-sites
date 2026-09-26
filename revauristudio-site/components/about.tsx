"use client";

import Image from "next/image";
import { FadeInWhenVisible } from "./motion-wrappers";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 lg:py-24"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a19 0%, #141413 70%)",
      }}
    >
      {/* Blur orb */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-orange/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Headshot */}
          <FadeInWhenVisible direction="left">
            <div className="relative mx-auto lg:mx-0">
              <div
                className="absolute -inset-4 rounded-2xl bg-brand-orange/10 blur-2xl"
                aria-hidden="true"
              />
              <Image
                src="/joseph-headshot.jpg"
                alt="Joseph Silvagnoli, founder of Revauri"
                width={224}
                height={224}
                className="relative h-56 w-56 rounded-2xl object-cover object-top ring-1 ring-brand-mid-gray/20 shadow-[var(--shadow-xl)]"
              />
            </div>
          </FadeInWhenVisible>

          {/* Text */}
          <div>
            <FadeInWhenVisible>
              <h2 className="text-2xl font-bold text-brand-cream sm:text-3xl">
                Built by a founder who{" "}
                <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                  builds for founders and specialists.
                </span>
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.08}>
              <p className="mt-6 text-lg leading-relaxed text-brand-cream/70">
                Hi, I&apos;m Joseph. I started Revauri because I kept seeing the
                same thing: great businesses with websites that don&apos;t do them
                justice. Your website should work as hard as you do — bringing in
                leads, building trust, and making it easy for customers to say yes.
                Every site we build is designed with that goal in mind.
              </p>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
