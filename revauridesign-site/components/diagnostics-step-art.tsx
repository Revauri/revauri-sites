"use client";

import { useEffect, useRef } from "react";

export type DiagnosticsStepVariant = "layers" | "nodes" | "flow";

function stroke(alpha: number) {
  return `rgba(217, 119, 87, ${alpha})`;
}

function projectIso(x: number, y: number, z: number) {
  const angle = Math.PI / 6;
  return {
    x: (x - z) * Math.cos(angle),
    y: y + (x + z) * Math.sin(angle),
  };
}

function drawLayers(ctx: CanvasRenderingContext2D, time: number) {
  const size = 42;
  const layers = 5;
  const gap = 20;
  ctx.lineWidth = 1;

  for (let index = layers - 1; index >= 0; index -= 1) {
    const yOff = index * gap - (layers * gap) / 2 + Math.sin(time + index * 0.4) * 4;
    const p1 = projectIso(-size, yOff, -size);
    const p2 = projectIso(size, yOff, -size);
    const p3 = projectIso(size, yOff, size);
    const p4 = projectIso(-size, yOff, size);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.strokeStyle = index === 0 ? stroke(0.85) : stroke(0.2);
    ctx.stroke();

    if (index === 0) {
      ctx.save();
      const center = projectIso(0, yOff, 0);
      ctx.translate(center.x, center.y);
      ctx.scale(1, 0.5);
      const square = size * 0.55;
      ctx.beginPath();
      ctx.rect(-square, -square, square * 2, square * 2);
      ctx.strokeStyle = stroke(0.45);
      ctx.stroke();
      ctx.clip();
      for (let scan = -square; scan < square; scan += 4) {
        ctx.beginPath();
        ctx.moveTo(-square, scan);
        ctx.lineTo(square, scan);
        ctx.strokeStyle = stroke(0.22);
        ctx.stroke();
      }
      ctx.restore();
    }

    if (index < layers - 1) {
      const nextY =
        (index + 1) * gap - (layers * gap) / 2 + Math.sin(time + (index + 1) * 0.4) * 4;
      const next1 = projectIso(-size, nextY, -size);
      const next3 = projectIso(size, nextY, size);
      ctx.beginPath();
      ctx.setLineDash([2, 2]);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(next1.x, next1.y);
      ctx.moveTo(p3.x, p3.y);
      ctx.lineTo(next3.x, next3.y);
      ctx.strokeStyle = stroke(0.14);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
}

function drawCube(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  z: number,
  size: number,
  color: string,
) {
  const points = [
    projectIso(x - size, y - size, z - size),
    projectIso(x + size, y - size, z - size),
    projectIso(x + size, y - size, z + size),
    projectIso(x - size, y - size, z + size),
    projectIso(x - size, y + size, z - size),
    projectIso(x + size, y + size, z - size),
    projectIso(x + size, y + size, z + size),
    projectIso(x - size, y + size, z + size),
  ];

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.lineTo(points[3].x, points[3].y);
  ctx.closePath();
  ctx.moveTo(points[4].x, points[4].y);
  ctx.lineTo(points[5].x, points[5].y);
  ctx.lineTo(points[6].x, points[6].y);
  ctx.lineTo(points[7].x, points[7].y);
  ctx.closePath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[4].x, points[4].y);
  ctx.moveTo(points[1].x, points[1].y);
  ctx.lineTo(points[5].x, points[5].y);
  ctx.moveTo(points[2].x, points[2].y);
  ctx.lineTo(points[6].x, points[6].y);
  ctx.moveTo(points[3].x, points[3].y);
  ctx.lineTo(points[7].x, points[7].y);
  ctx.stroke();
}

function drawNodes(ctx: CanvasRenderingContext2D, time: number) {
  const size = 22;
  const float = Math.sin(time) * 4;
  drawCube(ctx, -35, -float, -35, size, stroke(0.2));
  drawCube(ctx, 35, float, -35, size, stroke(0.2));
  drawCube(ctx, -35, float, 35, size, stroke(0.2));
  drawCube(ctx, 35, -float, 35, size, stroke(0.2));
  drawCube(ctx, 0, Math.cos(time) * 6 - 15, 0, size * 0.9, stroke(0.7));
}

function drawFlow(ctx: CanvasRenderingContext2D, time: number) {
  const size = 58;
  const segments = 18;
  const step = (size * 2) / segments;
  ctx.lineWidth = 1;

  const heightAt = (x: number, z: number) => {
    const distance = Math.sqrt(x * x + z * z);
    const peak = Math.max(0, 45 - distance * 1.1);
    const wave = Math.sin(x * 0.2 + time * 1.5) * Math.cos(z * 0.2 + time * 1.5) * 5;
    return -peak - wave + 15;
  };

  for (let z = -size; z < size; z += step) {
    for (let x = -size; x < size; x += step) {
      const y1 = heightAt(x, z);
      const y2 = heightAt(x + step, z);
      const y3 = heightAt(x + step, z + step);
      const y4 = heightAt(x, z + step);
      const p1 = projectIso(x, y1, z);
      const p2 = projectIso(x + step, y2, z);
      const p3 = projectIso(x + step, y3, z + step);
      const p4 = projectIso(x, y4, z + step);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();

      const heightRatio = Math.max(0, -y1 / 30);
      const alpha = 0.08 + heightRatio * 0.45;
      ctx.strokeStyle = heightRatio > 0.6 ? stroke(alpha + 0.28) : stroke(alpha);
      ctx.stroke();
    }
  }
}

function drawVariant(
  ctx: CanvasRenderingContext2D,
  variant: DiagnosticsStepVariant,
  time: number,
) {
  switch (variant) {
    case "layers":
      drawLayers(ctx, time);
      return;
    case "nodes":
      drawNodes(ctx, time);
      return;
    case "flow":
      drawFlow(ctx, time);
      return;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function DiagnosticsStepArt({
  variant,
}: {
  variant: DiagnosticsStepVariant;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let time = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = () => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2 + 4);
      context.scale(Math.min(width, height) / 210, Math.min(width, height) / 210);
      drawVariant(context, variant, time);
      context.restore();
    };

    const tick = () => {
      time += 0.015;
      paint();
      frame = window.requestAnimationFrame(tick);
    };

    resize();
    paint();
    if (!reducedMotion) frame = window.requestAnimationFrame(tick);

    const onResize = () => {
      resize();
      paint();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none h-44 w-44"
      aria-hidden="true"
    />
  );
}
