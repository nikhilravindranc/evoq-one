"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "./Topbar";
import { Collage } from "./Collage";
import { ArrowRight } from "./icons";
import { GetStartedModal } from "@/components/shared/GetStartedModal";

const GRADIENT =
  `radial-gradient(120% 80% at 60% 0%, #BDBDFF 0%, #8484FF 22%, #5C5CFF 48%, #3333CC 72%, #000099 100%),
   radial-gradient(60% 50% at 20% 35%, rgba(242,242,255,0.55) 0%, rgba(242,242,255,0) 60%),
   radial-gradient(22% 30% at 6% 8%, rgba(242,242,255,0.5) 0%, rgba(242,242,255,0) 65%)`;

const GRAIN_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function HeroSection() {
  const [showGetStarted, setShowGetStarted] = useState(false);

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
              backgroundBlendMode: "screen, normal, normal",
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
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              alignItems: "stretch",
              gap: 32,
              padding: "0 80px 48px",
              minHeight: 0, // needed for flex children with overflow
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
      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}

