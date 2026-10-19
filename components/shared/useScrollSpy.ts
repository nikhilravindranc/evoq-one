"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";

/* Scroll-spy for tabbed sections that are laid out as stacked chapters:
   whichever chapter crosses the reading line (just above the middle of the
   screen) is the active tab, and clicking a tab scrolls to its chapter. */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(0);
  const key = ids.join("|");

  useEffect(() => {
    const list = key.split("|");
    const els = list.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = list.indexOf(e.target.id);
          if (i >= 0) setActive(i);
        });
      },
      { rootMargin: "-30% 0px -62% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);

  const go = useCallback(
    (i: number) => (e?: MouseEvent) => {
      e?.preventDefault();
      const el = document.getElementById(key.split("|")[i]);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      setActive(i);
    },
    [key]
  );

  return { active, go };
}
