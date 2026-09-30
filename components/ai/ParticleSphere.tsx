"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };

function fibonacciSphere(count: number): Point[] {
  const pts: Point[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

/** A softly rotating particle sphere, canvas-rendered. */
export function ParticleSphere({ size = 460 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const points = fibonacciSphere(560);
    const R = size * 0.36;
    const cx = size / 2;
    const cy = size / 2;
    const focal = 2.6;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const t = reduceMotion ? 0 : (now - start) / 1000;
      const angleY = t * 0.22;
      const angleX = Math.sin(t * 0.15) * 0.22;

      ctx.clearRect(0, 0, size, size);

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

      const projected = points.map((p) => {
        // rotate around Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const scale = focal / (focal + z2);
        return {
          sx: cx + x1 * R * scale,
          sy: cy + y2 * R * scale,
          z: z2,
          scale,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        const depth = (p.z + 1) / 2; // 0 (back) .. 1 (front)
        const radius = Math.max(0.5, 1.9 * p.scale);
        const alpha = 0.15 + depth * 0.65;

        // blend from teal -> blue -> purple across the sphere's vertical band, with a mostly-white/blue core
        const hueMix = depth;
        const r = Math.round(120 + hueMix * 100);
        const g = Math.round(170 + hueMix * 20);
        const b = 255;

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ display: "block" }} />;
}
