"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topbar } from "./Topbar";
import { ArrowRight } from "./icons";
import { GetStartedModal } from "@/components/shared/GetStartedModal";

type HeroTab = "growth" | "operations" | "people";

const HERO_TABS: { key: HeroTab; label: string; video: string }[] = [
  { key: "growth", label: "Growth", video: "/videos/Growth.mp4" },
  { key: "operations", label: "Operations", video: "/videos/Operations.mp4" },
  { key: "people", label: "People", video: "/videos/People.mp4" },
];

/* The "logo halo" layer (3rd in the stack) is positioned via --logo-x/--logo-y,
 * CSS custom properties kept in sync with the logo tile's actual on-screen
 * position (see the resize/observer effect below). The layout that places the
 * logo tile is width-capped (max-width: 1168) and centered, while this
 * gradient paints across the full-bleed hero -- so the logo's position as a
 * fraction of hero width is NOT constant across viewport widths. Percentages
 * alone drift out of alignment on large screens; measuring the real DOM
 * position is the only way to keep the halo locked to the logo at every size.
 */
const GRADIENT =
  `radial-gradient(90% 75% at 100% 15%, #9333EA 0%, rgba(147,51,234,0.7) 40%, rgba(147,51,234,0) 72%),
   radial-gradient(46% 42% at var(--logo-x, 69%) var(--logo-y, 51%), rgba(242,242,255,0.55) 0%, rgba(242,242,255,0) 62%),
   radial-gradient(32% 40% at var(--topbar-logo-x, 6%) var(--topbar-logo-y, 8%), rgba(242,242,255,0.32) 0%, rgba(242,242,255,0.14) 40%, rgba(242,242,255,0) 75%),
   linear-gradient(96deg, #6366F6 0%, #6658F2 32%, #6D4AE8 58%, #7C3AED 78%, #9333EA 100%)`;

const GRAIN_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function HeroSection() {
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<HeroTab>("growth");
  // 'checking' -> 'ok' | 'missing', resolved via a HEAD request rather than
  // the <video> element's own error event: that event races with hydration
  // (a fast local 404 can fire before React attaches its listener), so it
  // isn't reliable enough to gate what renders.
  const [videoStatus, setVideoStatus] = useState<Record<HeroTab, "checking" | "ok" | "missing">>({
    growth: "checking",
    operations: "checking",
    people: "checking",
  });
  const frameRef = useRef<HTMLDivElement>(null);
  const [logoPos, setLogoPos] = useState<{ x: string; y: string }>({ x: "69%", y: "51%" });
  const [topbarLogoPos, setTopbarLogoPos] = useState<{ x: string; y: string }>({ x: "6%", y: "8%" });

  useEffect(() => {
    let cancelled = false;
    HERO_TABS.forEach((tab) => {
      fetch(tab.video, { method: "HEAD" })
        .then((res) => {
          if (cancelled) return;
          setVideoStatus((prev) => ({ ...prev, [tab.key]: res.ok ? "ok" : "missing" }));
        })
        .catch(() => {
          if (cancelled) return;
          setVideoStatus((prev) => ({ ...prev, [tab.key]: "missing" }));
        });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const frameRect = frame.getBoundingClientRect();

      const logo = document.getElementById("hero-logo-anchor");
      if (logo) {
        const logoRect = logo.getBoundingClientRect();
        const x = logoRect.left + logoRect.width / 2 - frameRect.left;
        const y = logoRect.top + logoRect.height / 2 - frameRect.top;
        setLogoPos({ x: `${x}px`, y: `${y}px` });
      }

      const topbarLogo = document.getElementById("hero-topbar-logo");
      if (topbarLogo) {
        const tRect = topbarLogo.getBoundingClientRect();
        const x = tRect.left + tRect.width / 2 - frameRect.left;
        const y = tRect.top + tRect.height / 2 - frameRect.top;
        setTopbarLogoPos({ x: `${x}px`, y: `${y}px` });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    // logo tile fades/scales in via framer-motion, so re-measure once that settles too
    const t = setTimeout(measure, 550);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Full-width hero — no max-width cap, no rounded card */}
      <div className="w-full">
        {/*
         * Hero frame: fixed 840px tall, overflow hidden.
         * Uses flex-column so topbar takes its natural height and stage
         * fills the exact remainder -- no hardcoded topbar constant needed.
         */}
        <div
          ref={frameRef}
          style={{
            position: "relative",
            width: "100%",
            height: 840,
            overflow: "hidden",
            isolation: "isolate",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Gradient background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: GRADIENT,
              backgroundBlendMode: "screen, normal, normal, normal",
              // @ts-expect-error -- CSS custom properties aren't in CSSProperties
              "--logo-x": logoPos.x,
              "--logo-y": logoPos.y,
              "--topbar-logo-x": topbarLogoPos.x,
              "--topbar-logo-y": topbarLogoPos.y,
            }}
          />
          {/* Film grain */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: GRAIN_SVG,
              mixBlendMode: "overlay",
              opacity: 0.35,
              pointerEvents: "none",
            }}
          />
          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 80% at 50% 110%, rgba(0,0,153,0.75) 0%, rgba(0,0,153,0) 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Topbar -- shrinks to its natural height */}
          <div style={{ position: "relative", zIndex: 3, flexShrink: 0 }}>
            <Topbar darkCTA />
          </div>

          {/* Stage -- grows to fill all remaining height exactly */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              flex: "1 1 0",
              display: "flex",
              justifyContent: "center",
              padding: "0 80px 48px",
              minHeight: 0, // needed for flex children with overflow
            }}
          >
          {/* Inner container -- capped to match the width used by sections below the hero */}
          <div
            style={{
              width: "100%",
              maxWidth: 1168,
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              alignItems: "stretch",
              gap: 32,
            }}
          >
            {/* Left column */}
            <motion.section
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 24px 0 0",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 48,
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  Every part of your business.
                  <br />
                  <span style={{ color: "#BDBDFF" }}>Working together.</span>
                </h1>

                <p
                  style={{
                    marginTop: 20,
                    maxWidth: "52ch",
                    fontFamily: "var(--font-sans)",
                    fontSize: 15.5,
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  From growth and customer relationships to daily operations
                  and people management, EVOQ gives your business the tools
                  to work better together.
                </p>
              </div>

              <div>
                <div
                  role="tablist"
                  aria-label="Hero product focus"
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginTop: 32,
                    flexWrap: "wrap",
                  }}
                >
                  {HERO_TABS.map((tab) => {
                    const isActive = tab.key === activeTab;
                    return (
                      <button
                        key={tab.key}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                          padding: "9px 18px",
                          borderRadius: 999,
                          fontFamily: "var(--font-sans)",
                          fontSize: 13.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "background .18s ease, color .18s ease, border-color .18s ease",
                          border: isActive ? "1px solid rgba(255,255,255,0)" : "1px solid rgba(255,255,255,0.28)",
                          background: isActive ? "#fff" : "transparent",
                          color: isActive ? "#4747E0" : "rgba(255,255,255,0.85)",
                        }}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <button
                    onClick={() => setShowGetStarted(true)}
                    className="hero-cta-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px 12px 22px",
                      background: "#4747E0",
                      color: "#fff",
                      borderRadius: 999,
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 600,
                      border: 0,
                      cursor: "pointer",
                      boxShadow:
                        "0 10px 30px -10px rgba(0,0,153,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                  >
                    <span>Get Started</span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.18)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowRight color="#fff" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.section>

            {/* Right column: video swaps per selected tab. Until a
                category's video file is uploaded to /public/videos, this
                renders an empty placeholder frame (see videoStatus / the
                HEAD-check effect above) instead of a static graphic. */}
            <motion.section
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                marginTop: "40px",
              }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Product showcase"
            >
              {/* Decorative backdrop -- soft glow + thin geometric accents,
                  echoing the halo/gradient language used elsewhere in the
                  hero so the frame reads as "premium" rather than bare. */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: "-14% -10%",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-6%",
                    right: "4%",
                    width: "58%",
                    height: "58%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(189,189,255,0.22) 45%, rgba(189,189,255,0) 75%)",
                    filter: "blur(6px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4%",
                    left: "2%",
                    width: "42%",
                    height: "42%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(147,51,234,0.45) 0%, rgba(147,51,234,0) 70%)",
                    filter: "blur(4px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "6%",
                    left: "-2%",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "-4%",
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.16)",
                    transform: "rotate(18deg)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "8%",
                    right: "-2%",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 5px)",
                    gap: 6,
                    opacity: 0.35,
                  }}
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {videoStatus[activeTab] === "ok" ? (
                  <motion.video
                    key={activeTab}
                    src={HERO_TABS.find((t) => t.key === activeTab)!.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                      borderRadius: 24,
                      boxShadow: "0 40px 80px -34px rgba(0,0,153,0.5)",
                    }}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      borderRadius: 24,
                      border: "1px dashed rgba(255,255,255,0.25)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.section>
          </div>
          </div>
        </div>
      </div>
      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}

