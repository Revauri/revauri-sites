"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Eye, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { FadeInWhenVisible } from "./motion-wrappers";
import BlendedDemoFrame from "./blended-demo-frame";

function BeforeAfterMockup() {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetPositionRef = useRef(50);
  const animationFrameRef = useRef<number | null>(null);

  const commitPosition = (nextPosition: number, immediate = false) => {
    targetPositionRef.current = nextPosition;

    if (immediate || prefersReducedMotion) {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setPosition(nextPosition);
      return;
    }

    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      setPosition(targetPositionRef.current);
    });
  };

  const updatePosition = (clientX: number, immediate = false) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(8, Math.min(92, (x / rect.width) * 100));
    commitPosition(pct, immediate || isDragging);
  };

  const shouldStartDrag = (clientX: number, pointerType: string) => {
    if (pointerType !== "touch") return true;
    const container = containerRef.current;
    if (!container) return false;
    const rect = container.getBoundingClientRect();
    const handleX = rect.left + (position / 100) * rect.width;
    return Math.abs(clientX - handleX) <= 56;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || !shouldStartDrag(e.clientX, e.pointerType)) return;
    setIsDragging(true);
    updatePosition(e.clientX, true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event: PointerEvent) => {
      event.preventDefault();
      updatePosition(event.clientX);
    };

    const handlePointerUp = () => {
      stopDragging();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const sliderStyles = {
    "--slider-position": `${position}%`,
  } as React.CSSProperties;

  return (
    <BlendedDemoFrame>
    <>
    <div className="rounded-2xl border border-brand-light-gray/40 bg-brand-white/80 p-1 dark:border-brand-mid-gray/20 dark:bg-[#1a1a19]/80">
      {/* Mock browser chrome */}
      <div className="rounded-t-xl bg-brand-cream/80 px-4 pt-3 pb-2 dark:bg-brand-dark/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          </div>
          <div className="mx-auto flex-1">
            <div className="mx-auto max-w-[200px] rounded-md bg-brand-light-gray/40 px-3 py-1 text-center text-[10px] text-brand-mid-gray dark:bg-brand-mid-gray/20">
              yourbusiness.com
            </div>
          </div>
        </div>
        {/* Before / After labels */}
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-gray-500/70 px-2.5 py-0.5 text-[9px] font-medium text-white">
            Before
          </span>
          <span className="rounded-full bg-brand-orange/90 px-2.5 py-0.5 text-[9px] font-medium text-white">
            After
          </span>
        </div>
      </div>

      {/* Before / After split content */}
      <div
        ref={containerRef}
        className="relative h-[360px] overflow-hidden rounded-b-xl select-none sm:h-[430px]"
        style={{
          ...sliderStyles,
          cursor: prefersReducedMotion ? "default" : isDragging ? "grabbing" : "ew-resize",
          touchAction: prefersReducedMotion ? "auto" : isDragging ? "none" : "pan-y",
        }}
        onPointerDown={handlePointerDown}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-black/4 to-transparent dark:from-white/[0.03]" />
        {/* ── BEFORE side (full width, underneath) ── */}
        <div className="absolute inset-0 flex flex-col bg-[#dcdcdc] dark:bg-[#1c1c1b]">
          {/* Garish teal announcement bar */}
          <div className="bg-[#008B8B] px-3 py-0.5">
            <p className="text-center font-mono text-[5px] font-bold uppercase text-white">*** SPECIAL OFFER THIS MONTH ONLY — CALL NOW!!! ***</p>
          </div>
          {/* Ugly cramped nav */}
          <div className="border-b-4 border-gray-500 bg-[#c0c0c0] px-2 py-1.5 dark:bg-[#2a2a28]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] font-black uppercase tracking-tight text-gray-700 dark:text-gray-400" style={{ letterSpacing: "-0.02em" }}>ACME Corp.</span>
              <span className="font-mono text-[5px] text-gray-600 dark:text-gray-500" style={{ letterSpacing: "0.05em" }}>HOME&nbsp;&nbsp;|&nbsp;&nbsp;ABOUT&nbsp;&nbsp;|&nbsp;&nbsp;SERVICES&nbsp;&nbsp;|&nbsp;&nbsp;CONTACT&nbsp;&nbsp;|&nbsp;&nbsp;FAQ&nbsp;&nbsp;|&nbsp;&nbsp;SITEMAP</span>
            </div>
          </div>
          {/* Dated hero banner */}
          <div className="bg-[#a8a8a8] px-3 py-2 dark:bg-[#333330]">
            <p className="font-mono text-[9px] font-black uppercase leading-tight tracking-widest text-gray-700 dark:text-gray-300" style={{ letterSpacing: "0.12em" }}>WELCOME TO OUR BUSINESS!!</p>
            <p className="mt-0.5 font-mono text-[5px] font-bold uppercase leading-tight tracking-wider text-gray-600 dark:text-gray-400">EST. 1998 — QUALITY YOU CAN TRUST</p>
            <p className="mt-0.5 font-mono text-[5px] leading-tight text-gray-500 dark:text-gray-500">We provide quality services since 1998. Call us today for a free quote. We serve the tri-state area.</p>
            <div className="mt-1 flex items-center gap-1.5">
              {/* Broken image placeholder */}
              <div className="flex h-8 w-8 flex-col items-center justify-center border-2 border-gray-500 bg-[#b8b8b8] dark:bg-[#2a2a28]">
                <X className="h-2.5 w-2.5 text-gray-500" />
                <span className="font-mono text-[4px] text-gray-400">img</span>
              </div>
              <div className="flex h-8 w-8 flex-col items-center justify-center border-2 border-gray-500 bg-[#b8b8b8] dark:bg-[#2a2a28]">
                <X className="h-2.5 w-2.5 text-gray-500" />
                <span className="font-mono text-[4px] text-gray-400">img</span>
              </div>
              <div className="ml-1 inline-block border-2 border-gray-600 bg-[#336699] px-2 py-1">
                <span className="font-mono text-[6px] font-black uppercase tracking-wider text-white">CLICK HERE</span>
              </div>
            </div>
          </div>
          {/* Garish green "sale" bar */}
          <div className="bg-[#228B22] px-3 py-0.5">
            <p className="text-center font-mono text-[5px] font-bold text-yellow-300">&#9733; NEW WEBSITE COMING SOON &#9733;&nbsp;&nbsp;CHECK BACK LATER</p>
          </div>
          {/* Boxy content blocks */}
          <div className="flex flex-1 flex-col gap-0 px-2 pt-1.5">
            <div className="grid grid-cols-3 gap-0.5">
              <div className="border-2 border-gray-500/60 bg-[#cccccc] p-1 dark:bg-[#252523]">
                <p className="font-mono text-[5px] font-black uppercase text-gray-700 dark:text-gray-400">Our Services</p>
                <p className="mt-0.5 font-mono text-[4px] leading-tight text-gray-600 dark:text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing elit sed.</p>
              </div>
              <div className="border-2 border-gray-500/60 bg-[#cccccc] p-1 dark:bg-[#252523]">
                <p className="font-mono text-[5px] font-black uppercase text-gray-700 dark:text-gray-400">About Us</p>
                <p className="mt-0.5 font-mono text-[4px] leading-tight text-gray-600 dark:text-gray-500">In business for over 20 years serving all clients big and small.</p>
              </div>
              <div className="border-2 border-gray-500/60 bg-[#cccccc] p-1 dark:bg-[#252523]">
                <p className="font-mono text-[5px] font-black uppercase text-gray-700 dark:text-gray-400">Contact</p>
                <p className="mt-0.5 font-mono text-[4px] leading-tight text-gray-600 dark:text-gray-500">Call (555) 012-3456 Mon–Fri 9–5pm EST. Leave msg.</p>
              </div>
            </div>
            <div className="mt-0.5 border-2 border-gray-500/60 bg-[#cccccc] p-1.5 dark:bg-[#252523]">
              <p className="font-mono text-[5px] font-black uppercase text-gray-700 dark:text-gray-400">Latest News &amp; Updates</p>
              <p className="mt-0.5 font-mono text-[4px] leading-tight text-gray-500 dark:text-gray-500">Check back soon for updates and announcements from our team. Last updated March 2015.</p>
              <p className="font-mono text-[4px] leading-tight text-gray-500/70 dark:text-gray-600">We are working on exciting new things. Please be patient. Thank you for your continued support.</p>
              <p className="mt-0.5 font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">Click here to read more &gt;&gt;</p>
            </div>
            <div className="mt-0.5 grid grid-cols-2 gap-0.5">
              <div className="border-2 border-gray-500/60 bg-[#cccccc] p-1 dark:bg-[#252523]">
                <p className="font-mono text-[5px] font-black uppercase text-gray-700 dark:text-gray-400">Testimonials</p>
                <p className="mt-0.5 font-mono text-[4px] leading-tight text-gray-500 dark:text-gray-500">&quot;Great company!&quot; — Bob J.</p>
                <p className="font-mono text-[4px] leading-tight text-gray-500/60 dark:text-gray-600">&quot;Would recommend.&quot; — Sue T.</p>
                <p className="font-mono text-[4px] leading-tight text-gray-500/60 dark:text-gray-600">&quot;Good.&quot; — Anonymous</p>
              </div>
              <div className="border-2 border-gray-500/60 bg-[#cccccc] p-1 dark:bg-[#252523]">
                <p className="font-mono text-[5px] font-black uppercase text-gray-700 dark:text-gray-400">Directions</p>
                <p className="mt-0.5 font-mono text-[4px] leading-tight text-gray-500 dark:text-gray-500">123 Main St, Suite 4B. Take exit 12 off I-90 turn left go 2mi then right on Oak.</p>
                <p className="font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">View map &gt;&gt;</p>
              </div>
            </div>
            <div className="mt-0.5 border-2 border-gray-500/60 bg-[#cccccc] p-1 dark:bg-[#252523]">
              <p className="font-mono text-[5px] font-black uppercase text-gray-700 dark:text-gray-400">Important Links</p>
              <div className="mt-0.5 flex flex-wrap gap-x-2">
                <p className="font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">Home</p>
                <p className="font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">About</p>
                <p className="font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">Services</p>
                <p className="font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">FAQ</p>
                <p className="font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">Privacy</p>
                <p className="font-mono text-[4px] leading-tight text-blue-600 underline dark:text-blue-400">Sitemap</p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="bg-gray-600 px-3 py-1 dark:bg-[#111110]">
            <p className="font-mono text-[4px] text-gray-300 dark:text-gray-500">© 2015 ACME Corp. All Rights Reserved. | Privacy Policy | Terms | Sitemap | Accessibility | Disclaimer</p>
            <p className="font-mono text-[4px] text-gray-400/60 dark:text-gray-600">Best viewed in Internet Explorer 8. 800x600 resolution recommended.</p>
          </div>
        </div>

        {/* ── AFTER side (clips from left based on position) ── */}
        <div
          className="absolute inset-0 will-change-[clip-path]"
          style={{
            clipPath: "inset(0 0 0 var(--slider-position))",
            transition: isDragging ? "none" : "clip-path 180ms ease-out",
          }}
        >
          {/* Base website layer */}
          <div className="absolute inset-0 flex flex-col bg-brand-white dark:bg-[#1a1a19]">
            {/* Clean modern nav */}
            <div className="flex items-center justify-between border-b border-brand-light-gray/30 px-4 py-2 dark:border-brand-mid-gray/20">
              <span className="text-[7px] font-bold text-brand-dark dark:text-brand-cream">Acme</span>
              <div className="flex items-center gap-2">
                <span className="text-[5px] text-brand-dark/50 dark:text-brand-cream/50">Home</span>
                <span className="text-[5px] text-brand-dark/50 dark:text-brand-cream/50">About</span>
                <span className="text-[5px] text-brand-dark/50 dark:text-brand-cream/50">Services</span>
                <span className="text-[5px] text-brand-dark/50 dark:text-brand-cream/50">Portfolio</span>
                <span className="text-[5px] text-brand-dark/50 dark:text-brand-cream/50">Pricing</span>
                <span className="text-[5px] text-brand-dark/50 dark:text-brand-cream/50">Contact</span>
                <span className="rounded-full bg-brand-orange px-1.5 text-[5px] font-bold leading-[12px] text-white shadow-sm">Sign up</span>
              </div>
            </div>

            {/* Hero section with subtle gradient bg */}
            <div className="bg-gradient-to-br from-brand-cream/80 to-brand-orange/[0.04] px-4 py-3 dark:from-brand-dark dark:to-brand-orange/[0.03]">
              <div className="flex items-start gap-2">
                {/* Hero image placeholders — left side */}
                <div className="flex shrink-0 gap-1.5">
                  {/* Hero thumb — landscape / photography */}
                  <div className="relative h-16 w-[4.5rem] overflow-hidden rounded-lg border border-brand-orange/22 bg-gradient-to-br from-brand-cream via-brand-orange/[0.2] to-brand-orange/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_1px_2px_rgba(217,119,87,0.1)] dark:border-white/12 dark:from-[#34312e] dark:via-brand-orange/[0.22] dark:to-[#1f1e1c] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.2)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_35%_-10%,rgba(255,255,255,0.72)_0%,transparent_55%)] opacity-85 dark:opacity-55"
                    />
                    <svg
                      className="relative h-full w-full p-1"
                      viewBox="0 0 52 44"
                      fill="none"
                      aria-hidden
                    >
                      <rect
                        x="4"
                        y="5"
                        width="44"
                        height="34"
                        rx="3"
                        className="fill-brand-orange/[0.11] stroke-brand-orange/30 dark:fill-white/[0.08] dark:stroke-white/16"
                        strokeWidth="0.75"
                      />
                      <circle cx="38" cy="14" r="4" className="fill-brand-orange/45 dark:fill-brand-orange/55" />
                      <path
                        d="M8 32 L18 22 L26 28 L34 18 L44 26 V36 H8 Z"
                        className="fill-brand-orange/28 dark:fill-brand-orange/38"
                      />
                    </svg>
                  </div>
                  {/* Hero thumb — product / UI frame */}
                  <div className="relative h-16 w-[4.5rem] overflow-hidden rounded-lg border border-brand-orange/18 bg-gradient-to-br from-white via-brand-cream/95 to-brand-orange/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_2px_rgba(217,119,87,0.09)] dark:border-white/10 dark:from-[#2e2c29] dark:via-brand-mid-gray/28 dark:to-[#1c1b1a] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.25)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_0%,rgba(217,119,87,0.2)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_80%_0%,rgba(217,119,87,0.32)_0%,transparent_50%)]"
                    />
                    <svg
                      className="relative h-full w-full p-1"
                      viewBox="0 0 52 44"
                      fill="none"
                      aria-hidden
                    >
                      <rect
                        x="9"
                        y="7"
                        width="34"
                        height="30"
                        rx="3.5"
                        className="fill-brand-orange/[0.1] stroke-brand-orange/26 dark:fill-white/[0.06] dark:stroke-white/18"
                        strokeWidth="0.75"
                      />
                      <rect x="14" y="12" width="22" height="2.25" rx="1" className="fill-brand-orange/32 dark:fill-brand-orange/48" />
                      <rect x="14" y="17" width="16" height="2" rx="1" className="fill-brand-orange/22 dark:fill-brand-orange/32" />
                      <rect x="14" y="22" width="18" height="2" rx="1" className="fill-brand-orange/16 dark:fill-brand-orange/24" />
                      <rect x="14" y="27" width="12" height="2" rx="1" className="fill-brand-orange/12 dark:fill-brand-orange/18" />
                    </svg>
                  </div>
                  {/* Hero thumb — video / motion */}
                  <div className="relative h-16 w-[4.5rem] overflow-hidden rounded-lg border border-brand-orange/20 bg-gradient-to-br from-brand-cream/95 via-brand-orange/[0.16] to-brand-orange/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(217,119,87,0.09)] dark:border-white/11 dark:from-[#32302d] dark:via-brand-orange/[0.18] dark:to-[#1a1918] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_1px_2px_rgba(0,0,0,0.22)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_20%_100%,rgba(217,119,87,0.22)_0%,transparent_55%)] dark:bg-[radial-gradient(ellipse_70%_55%_at_20%_100%,rgba(217,119,87,0.35)_0%,transparent_55%)]"
                    />
                    <svg
                      className="relative h-full w-full p-1"
                      viewBox="0 0 52 44"
                      fill="none"
                      aria-hidden
                    >
                      <rect
                        x="5"
                        y="6"
                        width="42"
                        height="32"
                        rx="3.5"
                        className="fill-brand-orange/[0.09] stroke-brand-orange/28 dark:fill-white/[0.05] dark:stroke-white/15"
                        strokeWidth="0.75"
                      />
                      <circle
                        cx="26"
                        cy="22"
                        r="7"
                        className="fill-brand-orange/25 stroke-brand-orange/35 dark:fill-brand-orange/30 dark:stroke-brand-orange/45"
                        strokeWidth="0.75"
                      />
                      <path
                        d="M24 18.5 L30.5 22 L24 25.5 V18.5Z"
                        className="fill-brand-cream dark:fill-brand-cream/95"
                      />
                    </svg>
                  </div>
                </div>
                {/* Text — right-aligned */}
                <div className="flex-1 text-right">
                  <p className="text-[10px] font-bold leading-tight text-brand-dark dark:text-brand-cream">Grow Your Business</p>
                  <p className="text-[10px] font-bold leading-tight bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">Online, Faster.</p>
                  <p className="mt-1 text-[5px] leading-relaxed text-brand-dark/50 dark:text-brand-cream/50">Custom websites that convert visitors into customers.</p>
                  <div className="mt-1.5 flex items-center justify-end gap-1">
                    <span className="inline-block rounded-sm bg-brand-orange px-1.5 text-[5px] font-semibold leading-[14px] text-white shadow-sm shadow-brand-orange/20">Get Started Free</span>
                    <span className="inline-block rounded-sm border border-brand-orange/40 px-1.5 text-[5px] font-medium leading-[14px] text-brand-orange">See Our Work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards with icons */}
            <div className="grid grid-cols-3 gap-1.5 px-4 pt-2">
              <div className="rounded-lg border border-brand-light-gray/40 bg-brand-cream/20 p-1.5 dark:border-brand-mid-gray/20 dark:bg-brand-mid-gray/5">
                <div className="flex h-3 w-3 items-center justify-center rounded-md bg-brand-orange/15">
                  <svg className="h-1.5 w-1.5 text-brand-orange" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" /></svg>
                </div>
                <p className="mt-1 text-[5px] font-bold text-brand-dark dark:text-brand-cream">Lightning Fast</p>
                <p className="text-[4px] text-brand-dark/40 dark:text-brand-cream/40">Sub-second loads</p>
              </div>
              <div className="rounded-lg border border-brand-light-gray/40 bg-brand-cream/20 p-1.5 dark:border-brand-mid-gray/20 dark:bg-brand-mid-gray/5">
                <div className="flex h-3 w-3 items-center justify-center rounded-md bg-brand-orange/15">
                  <svg className="h-1.5 w-1.5 text-brand-orange" viewBox="0 0 12 12" fill="currentColor"><rect x="3" y="1" width="6" height="10" rx="1" /></svg>
                </div>
                <p className="mt-1 text-[5px] font-bold text-brand-dark dark:text-brand-cream">Mobile-First</p>
                <p className="text-[4px] text-brand-dark/40 dark:text-brand-cream/40">Any screen, any device</p>
              </div>
              <div className="rounded-lg border border-brand-light-gray/40 bg-brand-cream/20 p-1.5 dark:border-brand-mid-gray/20 dark:bg-brand-mid-gray/5">
                <div className="flex h-3 w-3 items-center justify-center rounded-md bg-brand-orange/15">
                  <svg className="h-1.5 w-1.5 text-brand-orange" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="5" r="3" /><path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4" /></svg>
                </div>
                <p className="mt-1 text-[5px] font-bold text-brand-dark dark:text-brand-cream">SEO Ready</p>
                <p className="text-[4px] text-brand-dark/40 dark:text-brand-cream/40">Rank on Google</p>
              </div>
            </div>

            {/* Testimonial card with stars */}
            <div className="mx-4 mt-2 rounded-xl border border-brand-light-gray/40 bg-brand-cream/30 p-2 dark:border-brand-mid-gray/20 dark:bg-brand-mid-gray/10">
              <div className="flex items-start gap-2">
                <div className="shrink-0">
                  <div className="h-4 w-4 rounded-full bg-brand-orange/25" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-0.5">
                    <span className="text-[5px] text-amber-400">★★★★★</span>
                  </div>
                  <p className="mt-0.5 text-[5px] leading-tight text-brand-dark/60 dark:text-brand-cream/50">&ldquo;Our new site brought in 3x more leads in the first month.&rdquo;</p>
                  <p className="mt-0.5 text-[4px] font-semibold text-brand-dark/50 dark:text-brand-cream/40">Sarah K. · Business Owner</p>
                </div>
              </div>
            </div>

            {/* Stats + Conversion Rate side by side */}
            <div className="mx-4 mt-2 grid grid-cols-[1fr_auto] gap-1.5">
              {/* Stats bar */}
              <div className="grid grid-cols-4 gap-1 rounded-lg bg-brand-dark/[0.03] px-2 py-2.5 dark:bg-brand-cream/[0.03]">
                <div className="text-center">
                  <p className="text-[9px] font-bold text-brand-orange">100+</p>
                  <p className="text-[5px] text-brand-dark/40 dark:text-brand-cream/40">Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-brand-orange">4.9★</p>
                  <p className="text-[5px] text-brand-dark/40 dark:text-brand-cream/40">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-brand-orange">98</p>
                  <p className="text-[5px] text-brand-dark/40 dark:text-brand-cream/40">Speed</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-brand-orange">24h</p>
                  <p className="text-[5px] text-brand-dark/40 dark:text-brand-cream/40">Support</p>
                </div>
              </div>
              {/* Conversion Rate card */}
              <div className="rounded-lg border border-brand-light-gray/40 bg-brand-cream/30 px-2 py-1.5 dark:border-brand-mid-gray/20 dark:bg-brand-mid-gray/10" style={{ width: 72 }}>
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-bold text-emerald-500">↑ 47%</span>
                  <span className="rounded-full bg-emerald-100 px-1 py-0.5 text-[3px] font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">Live</span>
                </div>
                <p className="text-[4px] text-brand-dark/40 dark:text-brand-cream/40">Conversions</p>
                <svg className="mt-0.5 w-full" height="10" viewBox="0 0 64 10" fill="none">
                  <polyline points="0,8 10,7 20,6 30,8 40,4 50,3 60,1 64,0" stroke="#10b981" strokeWidth="1" strokeLinecap="round" fill="none" />
                  <polyline points="0,8 10,7 20,6 30,8 40,4 50,3 60,1 64,0 64,10 0,10" fill="#10b981" fillOpacity="0.06" stroke="none" />
                </svg>
              </div>
            </div>

            {/* CTA banner */}
            <div className="mx-4 mt-2 rounded-lg bg-gradient-to-r from-brand-orange to-amber-500 px-3 py-2.5 text-center" style={{ boxShadow: "0 0 20px 4px rgba(217,119,87,0.2), 0 0 40px 8px rgba(217,119,87,0.08)" }}>
              <p className="text-[7px] font-bold text-white">Ready to grow? Book a free strategy call.</p>
              <span className="mt-1 inline-block rounded-sm bg-white/90 px-2.5 text-[5px] font-semibold leading-[14px] text-brand-orange">Schedule Now →</span>
            </div>

            {/* Trusted by logos */}
            <div className="mt-2 mb-3 px-4">
              <p className="text-center text-[4px] font-medium uppercase tracking-wider text-brand-dark/30 dark:text-brand-cream/30">Trusted by businesses nationwide</p>
              <div className="mt-1 flex items-center justify-center gap-3">
                <div className="h-1.5 w-8 rounded bg-brand-dark/10 dark:bg-brand-cream/10" />
                <div className="h-1.5 w-6 rounded bg-brand-dark/10 dark:bg-brand-cream/10" />
                <div className="h-1.5 w-10 rounded bg-brand-dark/10 dark:bg-brand-cream/10" />
                <div className="h-1.5 w-7 rounded bg-brand-dark/10 dark:bg-brand-cream/10" />
              </div>
            </div>

            <div className="flex-1" />

            {/* Mock footer */}
            <div className="border-t border-brand-light-gray/30 bg-brand-dark/[0.03] px-4 py-2 dark:border-brand-mid-gray/20 dark:bg-brand-cream/[0.02]">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <p className="text-[5px] font-bold text-brand-dark dark:text-brand-cream">Acme</p>
                  <p className="mt-0.5 text-[4px] leading-relaxed text-brand-dark/30 dark:text-brand-cream/30">Modern websites for growing businesses.</p>
                </div>
                <div>
                  <p className="text-[4px] font-semibold text-brand-dark/50 dark:text-brand-cream/50">Company</p>
                  <div className="mt-0.5 flex flex-col gap-px">
                    <span className="text-[3.5px] text-brand-dark/30 dark:text-brand-cream/30">About</span>
                    <span className="text-[3.5px] text-brand-dark/30 dark:text-brand-cream/30">Careers</span>
                    <span className="text-[3.5px] text-brand-dark/30 dark:text-brand-cream/30">Blog</span>
                  </div>
                </div>
                <div>
                  <p className="text-[4px] font-semibold text-brand-dark/50 dark:text-brand-cream/50">Support</p>
                  <div className="mt-0.5 flex flex-col gap-px">
                    <span className="text-[3.5px] text-brand-dark/30 dark:text-brand-cream/30">Contact</span>
                    <span className="text-[3.5px] text-brand-dark/30 dark:text-brand-cream/30">FAQ</span>
                    <span className="text-[3.5px] text-brand-dark/30 dark:text-brand-cream/30">Privacy</span>
                  </div>
                </div>
                <div>
                  <p className="text-[4px] font-semibold text-brand-dark/50 dark:text-brand-cream/50">Connect</p>
                  <div className="mt-0.5 flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-brand-dark/15 dark:bg-brand-cream/15" />
                    <div className="h-2 w-2 rounded-full bg-brand-dark/15 dark:bg-brand-cream/15" />
                    <div className="h-2 w-2 rounded-full bg-brand-dark/15 dark:bg-brand-cream/15" />
                  </div>
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between border-t border-brand-light-gray/20 pt-1 dark:border-brand-mid-gray/10">
                <p className="text-[3.5px] text-brand-dark/25 dark:text-brand-cream/25">© 2025 Acme Inc. All rights reserved.</p>
                <div className="flex items-center gap-0.5 rounded-full bg-brand-orange/10 px-1.5 py-0.5">
                  <svg width="7" height="7" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="8" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle cx="11" cy="11" r="8" fill="none" stroke="#D97757" strokeWidth="3" strokeLinecap="round" strokeDasharray="49.6" strokeDashoffset="1" transform="rotate(-90 11 11)" />
                  </svg>
                  <span className="text-[3.5px] font-bold text-brand-orange">98</span>
                </div>
              </div>
            </div>
          </div>

          {/* Glowing divider line (left edge of After panel) */}
          <div
            className="absolute bottom-0 left-0 top-0 w-px"
            style={{
              background: "linear-gradient(180deg, transparent, #D97757 30%, #D97757 70%, transparent)",
              boxShadow: "0 0 12px rgba(217,119,87,0.4), 0 0 24px rgba(217,119,87,0.15)",
            }}
          />
        </div>

        {/* ── Draggable divider handle ── */}
        {!prefersReducedMotion && (
          <div
            className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
            style={{
              left: "var(--slider-position)",
              transform: "translateX(-50%)",
              transition: isDragging ? "none" : "left 180ms ease-out",
            }}
          >
            {/* Vertical glow line */}
            <div
              className="absolute top-0 bottom-0 w-0.5"
              style={{
                background: "linear-gradient(180deg, transparent, #D97757 20%, #D97757 80%, transparent)",
                boxShadow: "0 0 12px rgba(217,119,87,0.4)",
              }}
            />
            {/* Center grab handle */}
            <button
              type="button"
              aria-label="Drag to compare before and after"
              onPointerDown={handlePointerDown}
              className="relative z-10 flex h-11 w-11 cursor-ew-resize items-center justify-center rounded-full border-2 border-brand-orange bg-white shadow-xl transition-transform hover:scale-110 active:scale-95 dark:bg-brand-dark sm:h-10 sm:w-10"
              style={{ boxShadow: "0 0 12px rgba(217,119,87,0.4), 0 4px 16px rgba(0,0,0,0.15)" }}
              data-slider-handle
            >
              <ChevronLeft className="h-3 w-3 text-brand-orange" />
              <ChevronRight className="h-3 w-3 text-brand-orange" />
            </button>
          </div>
        )}

      </div>
    </div>

	    {/* Outer frame top edge (half above / half inside) */}
	    <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-orange/30 bg-brand-white px-3 py-1 text-[11px] font-medium text-brand-orange shadow-lg dark:bg-brand-dark sm:px-4 sm:py-1.5 sm:text-xs">
	      Your site, reimagined
	    </div>
    </>
    </BlendedDemoFrame>
  );
}

export function Hero() {
  return (
    <section className="hero-honeycomb relative overflow-hidden bg-brand-cream py-20 dark:bg-brand-dark lg:py-28">

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left Column — Copy */}
          <div className="flex min-w-0 flex-col space-y-5">
            <FadeInWhenVisible>
              <span className="inline-flex w-fit items-center rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-medium text-brand-orange">
                Your website should work as hard as you do
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.08}>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-dark dark:text-brand-cream sm:text-5xl md:text-[3.3rem] xl:text-[3.75rem]">
                <span className="block leading-[1.1]">
                  Don&apos;t let an{" "}
                  <span className="whitespace-nowrap">outdated site</span>
                </span>
                <span className="block leading-[1.1] bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">
                  cost you customers
                </span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.14}>
              <p className="max-w-2xl text-lg leading-relaxed text-brand-dark/60 dark:text-brand-cream/60 lg:text-xl">
                We build fast, conversion-focused websites for small to medium
                sized businesses.
                See a free custom redesign of your actual site before you spend
                a dime.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.18}>
              <p className="border-l-2 border-brand-orange/40 pl-3 text-base italic text-brand-dark/70 dark:text-brand-cream/70">
                75% of people judge a business&apos;s credibility by its website.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.22} margin="200px">
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange animate-pulse-glow"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-orange/30 px-6 py-3 text-base font-medium text-brand-orange transition-all duration-200 hover:bg-brand-orange/5"
                >
                  <Eye className="h-5 w-5" />
                  View Pricing
                </Link>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.26} margin="200px">
              <span className="mt-2 flex items-center gap-1.5 text-xs text-brand-orange sm:justify-start">
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                Free sample &middot; No obligation &middot; Quality guaranteed
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.30} margin="200px">
              <div className="grid gap-2 text-sm text-brand-dark/60 dark:text-brand-cream/60 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Free homepage redesign before you commit
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Mobile-first, fast-loading by default
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Built on Vercel &amp; Next.js infrastructure
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-orange" />
                  Unlimited updates, managed for you
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Right Column — Before/After Visual */}
          <FadeInWhenVisible delay={0.3} direction="right">
            <div className="mt-8 w-full min-w-0 lg:mt-0">
              <BeforeAfterMockup />
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
