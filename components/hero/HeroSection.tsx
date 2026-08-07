"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "./Topbar";
import { Collage } from "./Collage";
import { ArrowRight } from "./icons";
import { GetStartedModal } from "@/components/shared/GetStartedModal";

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
  `radial-gradient(85% 70% at 100% 100%, #7C3AED 0%, rgba(124,58,237,0.65) 35%, rgba(124,58,237,0) 70%),
   radial-gradient(120% 80% at 60% 0%, #BDBDFF 0%, #8484FF 22%, #5C5CFF 65%, #4747E0 100%),
   radial-gradient(46% 42% at var(--logo-x, 69%) var(--logo-y, 51%), rgba(242,242,255,0.55) 0%, rgba(242,242,255,0) 62%),
   radial-gradient(18% 22% at var(--topbar-logo-x, 6%) var(--topbar-logo-y, 8%), rgba(242,242,255,0.6) 0%, rgba(242,242,255,0) 65%)`;

const GRAIN_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function HeroSection() {
  const [showGetStarted, setShowGetStarted] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const [logoPos, setLogoPos] = useState<{ x: string; y: string }>({ x: "69%", y: "51%" });
  const [topbarLogoPos, setTopbarLogoPos] = useState<{ x: string; y: string }>({ x: "6%", y: "8%" });

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
              backgroundBlendMode: "screen, screen, normal, normal",
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
                justifyContent: "flex-start",
                padding: "300px 24px 0 0",
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
                  Every team.
                  <br />
                  Every workflow.
                  <br />
                  <span style={{ color: "#BDBDFF" }}>Finally connected.</span>
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
                  Your sales, service, operations, and support teams share one
                  workspace. Data flows between them automatically. Handoffs
                  never get missed.
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    marginTop: 40,
                  }}
                >
                  <button
                    onClick={() => setShowGetStarted(true)}
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

            {/* Right column: collage fills full column height */}
            <motion.section
              style={{
                position: "relative",
                height: "100%",
                overflow: "visible",
                marginTop: "40px",
              }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Product showcase"
            >
              <Collage tileRadius="30%" />
            </motion.section>
          </div>
          </div>
        </div>
      </div>
      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}

