"use client";

import { useEffect } from "react";

/* Scroll-reveal for the Manufacturing page. Content is visible without JS; on mount, blocks below
   the fold get a hidden state and animate in as they enter the viewport. Grid children stagger. */
export function MfMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".mf-root");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const grids = ".mf-steps, .mf-g3, .mf-g4, .mf-g5, .mf-g6, .mf-flow";
    const items = new Set<HTMLElement>();
    root.querySelectorAll<HTMLElement>(".mf-wrap > *").forEach((el) => {
      if (el.matches(grids)) return;
      items.add(el);
    });
    root.querySelectorAll<HTMLElement>(grids).forEach((g) => {
      Array.from(g.children).forEach((c, i) => {
        const el = c as HTMLElement;
        el.style.setProperty("--mf-d", `${Math.min(i, 7) * 80}ms`);
        items.add(el);
      });
    });
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("mf-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.9) return; // already on screen: leave as is
      el.classList.add("mf-rv");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
