"use client";

import { useEffect, useRef, useState } from "react";

/* shrinks a fixed-width composition to fit its column (desktop only) */
export function ScaleFit({ width, children }: { width: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; h: number } | null>(null);
  useEffect(() => {
    const el = outer.current;
    const inn = inner.current;
    if (!el || !inn) return;
    const measure = () => {
      if (window.innerWidth < 1024) return setBox(null);
      setBox({ scale: Math.min(1, el.clientWidth / width), h: inn.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(inn);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [width]);
  return (
    <div ref={outer} style={box ? { height: box.h * box.scale } : undefined}>
      <div ref={inner} style={box ? { width, transform: `scale(${box.scale})`, transformOrigin: "top left" } : undefined}>
        {children}
      </div>
    </div>
  );
}
