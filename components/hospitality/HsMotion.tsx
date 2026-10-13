"use client";

import { useEffect } from "react";

/* Gentle scroll reveal for the Hospitality page. Content stays visible without JS; blocks below the fold fade up on entry. */
export function HsMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hs-root");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("hs-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    root.querySelectorAll<HTMLElement>("[data-rv]").forEach((el, i) => {
      if (el.getBoundingClientRect().top < vh * 0.9) return;
      el.style.setProperty("--hs-d", `${(Number(el.dataset.rv) || 0) * 90}ms`);
      el.classList.add("hs-rv");
      io.observe(el);
      void i;
    });
    return () => io.disconnect();
  }, []);
  return null;
}
