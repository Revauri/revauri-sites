"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  speed: number;
  color: string;
  length: number;
};

const PARTICLE_COUNT = 315;
const SPEED_MULTIPLIER = 1.1;
const FOV = 260;
const DEPTH = 1000;

function particleColor() {
  return Math.random() > 0.5 ? "0, 0, 0" : "217, 119, 87";
}

function spawnParticle(atFarPlane: boolean): Particle {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 520;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius - 150,
    z: atFarPlane ? DEPTH : Math.random() * DEPTH,
    speed: (Math.random() * 2 + 1) * SPEED_MULTIPLIER,
    color: particleColor(),
    length: (Math.random() * 2 + 0.5) * 2.4,
  };
}

function sectionFill(dark: boolean) {
  return dark ? "rgb(26, 23, 21)" : "rgb(248, 243, 237)";
}

function fadeFill(dark: boolean) {
  return dark ? "rgba(26, 23, 21, 0.16)" : "rgba(248, 243, 237, 0.16)";
}

export function ParticleNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let originX = 0;
    let originY = 0;
    let frame = 0;
    let visible = true;
    let dark = document.documentElement.classList.contains("dark");

    const resetParticle = (particle: Particle) => {
      const next = spawnParticle(true);
      particle.x = next.x;
      particle.y = next.y;
      particle.z = next.z;
      particle.speed = next.speed;
      particle.color = next.color;
      particle.length = next.length;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = false;
      originX = width / 2;
      originY = height * 0.62;
      context.fillStyle = sectionFill(dark);
      context.fillRect(0, 0, width, height);
    };

    const drawParticle = (particle: Particle) => {
      const scale = FOV / particle.z;
      const px = originX + particle.x * scale;
      const py = originY + particle.y * scale;
      const prevZ = particle.z + particle.speed * particle.length;
      const prevScale = FOV / prevZ;
      const prevPx = originX + particle.x * prevScale;
      const prevPy = originY + particle.y * prevScale;

      let opacity = 1 - particle.z / DEPTH;
      if (particle.z < 100) opacity = particle.z / 100;
      if (opacity < 0) opacity = 0;

      context.beginPath();
      context.moveTo(prevPx, prevPy);
      context.lineTo(px, py);
      context.strokeStyle = `rgba(${particle.color}, ${Math.min(1, opacity * 1.35)})`;
      context.lineWidth = Math.max(0.35, (1 - particle.z / DEPTH) * 0.5);
      context.lineCap = "butt";
      context.lineJoin = "miter";
      context.stroke();
    };

    const paint = (fade: boolean) => {
      context.fillStyle = fade ? fadeFill(dark) : sectionFill(dark);
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        drawParticle(particle);
      }
    };

    const tick = () => {
      if (visible) {
        for (const particle of particles) {
          particle.z -= particle.speed;
          if (particle.z <= 0) resetParticle(particle);
        }
        paint(true);
      }
      frame = window.requestAnimationFrame(tick);
    };

    resize();
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      particles.push(spawnParticle(false));
    }
    paint(false);
    if (!reducedMotion) frame = window.requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      paint(false);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
      paint(false);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
