"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Dot } from "./icons";

const PHOTOS: Record<string, string> = {
  sales:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2.4&w=600&h=600&q=80",
  service:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2.6&w=600&h=600&q=80",
  operations:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2.4&w=600&h=600&q=80",
  support:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2.6&w=600&h=600&q=80",
  extra1:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2.6&w=400&h=400&q=80",
  extra2:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2.6&w=400&h=400&q=80",
  extra3:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.6&w=400&h=400&q=80",
};

interface TileLabel {
  name: string;
  sub: string;
  dot: string;
}
interface Tile {
  key: string;
  x: number;
  y: number;
  size: number;
  photo?: string;
  isLogo?: boolean;
  label?: TileLabel;
}

// Exact coordinates from the original hero.jsx
const TILES: Tile[] = [
  { key: "sales",      x: 82,  y: 10,  size: 178, photo: "sales",      label: { name: "Sales",      sub: "Drive revenue growth",       dot: "#5C5CFF" } },
  { key: "extra1",     x: 320, y: 44,  size: 92,  photo: "extra1" },
  { key: "extra2",     x: 440, y: 120, size: 74,  photo: "extra2" },
  { key: "operations", x: 0,   y: 210, size: 162, photo: "operations", label: { name: "Operations", sub: "Streamline processes",         dot: "#5C5CFF" } },
  { key: "logo",       x: 226, y: 228, size: 140, isLogo: true },
  { key: "service",    x: 412, y: 232, size: 152, photo: "service",    label: { name: "Service",    sub: "Deliver exceptional service",  dot: "#5C5CFF" } },
  { key: "extra3",     x: 60,  y: 426, size: 86,  photo: "extra3" },
  { key: "support",    x: 188, y: 416, size: 164, photo: "support",    label: { name: "Support",    sub: "Enable your team",            dot: "#5C5CFF" } },
];

const tileCenter = (key: string) => {
  const t = TILES.find((t) => t.key === key)!;
  return { x: t.x + t.size / 2, y: t.y + t.size / 2 };
};
const LOGO_C = tileCenter("logo");

// operations, service, support use orthogonal (L-shaped) paths; sales stays diagonal
const CONNECTIONS = ["sales", "operations", "service", "support"].map((key, i) => {
  const c = tileCenter(key);
  let svgPath: string | null = null;
  if (key === "operations") {
    // go right to logo x, then down to logo y
    svgPath = `M${c.x},${c.y} L${LOGO_C.x},${c.y} L${LOGO_C.x},${LOGO_C.y}`;
  } else if (key === "service") {
    // go left to logo x, then up to logo y
    svgPath = `M${c.x},${c.y} L${LOGO_C.x},${c.y} L${LOGO_C.x},${LOGO_C.y}`;
  } else if (key === "support") {
    // go up to logo y, then right to logo x
    svgPath = `M${c.x},${c.y} L${c.x},${LOGO_C.y} L${LOGO_C.x},${LOGO_C.y}`;
  }
  return { key, x1: LOGO_C.x, y1: LOGO_C.y, x2: c.x, y2: c.y, delay: i * 0.7, svgPath };
});

export function Collage({ tileRadius = "30%" }: { tileRadius?: string }) {
  return (
    /*
     * Collage container: 580x720 coordinate space, scaled 0.92 to match original.
     * height: 100% fills the stage column; min-height: 720 guarantees the
     * tile coordinates fit without clipping.
     * overflow: visible is intentional -- chips hang 12px below tile bottoms.
     */
    <div
      style={{
        position: "relative",
        width: 580,
        height: "100%",
        minHeight: 720,
        transform: "scale(0.92)",
        transformOrigin: "top left",
        overflow: "visible",
      }}
    >
      {/* Connecting dashed lines + SVG pulse dots (SMIL, matches original) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 580,
          height: 720,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 0,
        }}
        viewBox="0 0 580 720"
        aria-hidden="true"
      >
        {CONNECTIONS.map((c) => (
          <g key={c.key}>
            {c.svgPath ? (
              <path
                d={c.svgPath}
                fill="none"
                stroke="#BDBDFF"
                strokeOpacity="0.55"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <line
                x1={c.x2} y1={c.y2}
                x2={c.x1} y2={c.y1}
                stroke="#BDBDFF"
                strokeOpacity="0.55"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />
            )}
            {/* SVG-native pulse dot */}
            <circle r="3.5" fill="#F2F2FF">
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="2.4s"
                begin={`${c.delay}s`}
                repeatCount="indefinite"
              />
              <animateMotion
                dur="2.4s"
                begin={`${c.delay}s`}
                repeatCount="indefinite"
                path={c.svgPath ?? `M${c.x2},${c.y2} L${c.x1},${c.y1}`}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Decorative grid-dot accents */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 280,
          width: 64,
          height: 64,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1.2px, transparent 1.4px)",
          backgroundSize: "10px 10px",
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 360,
          right: -10,
          width: 64,
          height: 64,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1.2px, transparent 1.4px)",
          backgroundSize: "10px 10px",
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Tiles */}
      {TILES.map((tile, idx) => {
        const tileStyle: React.CSSProperties = {
          position: "absolute",
          left: tile.x,
          top: tile.y,
          width: tile.size,
          height: tile.size,
          borderRadius: tileRadius,
          zIndex: 1,
        };

        if (tile.isLogo) {
          return (
            <motion.div
              key={tile.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                ...tileStyle,
                background: "#F2F2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
                overflow: "hidden",
                boxShadow:
                  "0 30px 60px -22px rgba(31,36,48,0.55), inset 0 0 0 1px rgba(255,255,255,0.7)",
              }}
            >
              <img
                src="/symbol-color.png"
                alt="EVOQ"
                style={{ width: "100%", height: "auto", position: "relative" }}
              />
            </motion.div>
          );
        }

        return (
          <motion.div
            key={tile.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + idx * 0.06 }}
            style={{
              ...tileStyle,
              // NO overflow:hidden here -- chip hangs 12px below tile bottom.
              // Only the inner photo div clips the image.
              boxShadow:
                "0 22px 40px -22px rgba(31,36,48,0.55), inset 0 0 0 1px rgba(255,255,255,0.22)",
            }}
          >
            {/* Photo -- clipped to tile shape */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: tileRadius,
                overflow: "hidden",
              }}
            >
              <Image
                src={PHOTOS[tile.photo!]}
                alt={tile.label?.name ?? ""}
                fill
                sizes={`${tile.size}px`}
                className="object-cover object-[center_25%]"
              />
              {/* Gradient scrim */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(31,36,48,0) 65%, rgba(31,36,48,0.28) 100%)",
                }}
              />
            </div>

            {/* Product label chip -- hangs 12px below tile bottom */}
            {tile.label && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: -12,
                  transform: "translateX(-50%)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px 7px 10px",
                  background: "#ffffff",
                  color: "#1F2430",
                  borderRadius: 12,
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  boxShadow:
                    "0 10px 24px -10px rgba(31,36,48,0.45), inset 0 0 0 1px rgba(31,36,48,0.04)",
                  zIndex: 2,
                }}
              >
                <Dot color={tile.label.dot} size={8} />
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: 1.18,
                  }}
                >
                  {tile.label.name}
                  <small
                    style={{
                      fontWeight: 500,
                      color: "#5F6B7A",
                      fontSize: 10.5,
                      letterSpacing: "0.005em",
                    }}
                  >
                    {tile.label.sub}
                  </small>
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
