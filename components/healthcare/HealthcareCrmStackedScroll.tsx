"use client";

import { useEffect, useRef, useState } from "react";

const BASE_HOLD = 0.55; // minimum read-time each panel gets once fully revealed, as a fraction of viewport height
const REVEAL = 0.7; // scroll distance (as a fraction of viewport height) for the next panel to slide up and cover this one

const MEASURE_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  visibility: "hidden",
  pointerEvents: "none",
  zIndex: -1,
};

const PANEL_STYLE: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  background: "white",
  willChange: "transform",
};

/**
 * Reproduces the "stacked cards" scroll effect with a scroll listener
 * instead of CSS `position: sticky` (some browsers were confirmed, via
 * computed-style inspection, to apply `position: sticky` without visually
 * pinning). Unlike a naive reimplementation that forces every panel into
 * exactly one viewport height, this measures each panel's real content
 * height and, if it's taller than the viewport, scrolls it upward within
 * itself first (mirroring what native `position: sticky` does for free) so
 * nothing is ever clipped on a shorter screen — then holds briefly, then
 * lets the next panel slide up from below and cover it.
 */
export function HealthcareCrmStackedScroll({ panels }: { panels: React.ReactNode[] }) {
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  // `null` means "not measured yet" — renders the same deterministic vh-based
  // fallback on the server and on the client's first paint (see totalHeight
  // below), avoiding a hydration mismatch. Updated to real pixel values from
  // an effect, once the panels are actually in the DOM to measure.
  const [heights, setHeights] = useState<number[] | null>(null);
  const [frame, setFrame] = useState<{ current: number; currentY: number; incoming: number | null; incomingT: number; vh: number } | null>(null);

  useEffect(() => {
    function remeasure() {
      setHeights(measureRefs.current.map((el) => el?.offsetHeight ?? 0));
    }
    remeasure();
    window.addEventListener("resize", remeasure);
    const ro = new ResizeObserver(remeasure);
    measureRefs.current.forEach((el) => el && ro.observe(el));
    return () => {
      window.removeEventListener("resize", remeasure);
      ro.disconnect();
    };
  }, [panels.length]);

  useEffect(() => {
    let raf = 0;

    function windowFor(i: number, vh: number) {
      const overflow = Math.max(0, (heights?.[i] ?? vh) - vh);
      const hold = overflow + BASE_HOLD * vh;
      const reveal = i + 1 < panels.length ? REVEAL * vh : 0;
      return { overflow, hold, reveal, total: hold + reveal };
    }

    function measure() {
      raf = 0;
      const el = spacerRef.current;
      if (!el || !heights) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0) {
        setFrame(null);
        return;
      }
      if (rect.top > 0) {
        // The spacer hasn't reached the top of the viewport yet. Rather than
        // showing nothing (a blank gap) for up to a full screen height while
        // scrolling toward it, slide the first panel up from below the same
        // way every later panel slides up over the one before it.
        if (rect.top < vh) {
          const t = 1 - rect.top / vh;
          setFrame({ current: -1, currentY: 0, incoming: 0, incomingT: t, vh });
        } else {
          setFrame(null);
        }
        return;
      }
      let remaining = -rect.top;
      for (let i = 0; i < panels.length; i++) {
        const w = windowFor(i, vh);
        if (remaining < w.total || i === panels.length - 1) {
          if (remaining < w.hold) {
            const currentY = -Math.min(w.overflow, remaining);
            setFrame({ current: i, currentY, incoming: null, incomingT: 0, vh });
          } else {
            const t = w.reveal > 0 ? Math.min(1, (remaining - w.hold) / w.reveal) : 1;
            setFrame({ current: i, currentY: -w.overflow, incoming: i + 1 < panels.length ? i + 1 : null, incomingT: t, vh });
          }
          return;
        }
        remaining -= w.total;
      }
      setFrame(null);
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [panels.length, heights]);

  // Deterministic fallback (matches server + first client paint exactly, so
  // there's no hydration mismatch) until `heights` is measured client-side.
  const totalHeight =
    heights === null
      ? `${panels.length * (100 + BASE_HOLD * 100 + REVEAL * 100)}vh`
      : (() => {
          const vh = typeof window !== "undefined" ? window.innerHeight : 900;
          let sum = 0;
          for (let i = 0; i < panels.length; i++) {
            const overflow = Math.max(0, heights[i] - vh);
            const hold = overflow + BASE_HOLD * vh;
            const reveal = i + 1 < panels.length ? REVEAL * vh : 0;
            sum += hold + reveal;
          }
          return `${sum}px`;
        })();

  return (
    <div ref={spacerRef} style={{ position: "relative", height: totalHeight }}>
      {/* invisible, always-in-flow copies used only to measure each panel's natural height */}
      {panels.map((panel, i) => (
        <div
          key={`m-${i}`}
          ref={(el) => {
            measureRefs.current[i] = el;
          }}
          style={MEASURE_STYLE}
          aria-hidden
        >
          {panel}
        </div>
      ))}

      {panels.map((panel, i) => {
        let show = false;
        let translateY = "100vh";
        if (frame) {
          if (i === frame.current) {
            show = true;
            translateY = `${frame.currentY}px`;
          } else if (i === frame.incoming) {
            show = true;
            // Pixels, not a `%` transform — percentages resolve against the
            // panel's OWN height, not the viewport, so on a panel much
            // taller than the screen (e.g. content that stacks to a single
            // column on mobile) a "100%" slide would move it thousands of
            // pixels rather than exactly one screen height, pushing it
            // completely off-screen instead of covering the viewport.
            translateY = `${(1 - frame.incomingT) * frame.vh}px`;
          }
        }
        return (
          <div
            key={i}
            style={{
              ...PANEL_STYLE,
              zIndex: i + 1,
              display: show ? "block" : "none",
              transform: `translateY(${translateY})`,
            }}
          >
            {panel}
          </div>
        );
      })}
    </div>
  );
}
