/* Colors for the Space & Room Reservations microsite. They come from the EVOQ Bookings design system
   (components/bookings/theme.tsx: sage, sand and warm paper). The sage is taken a step deeper into a
   forest family for dark surfaces, with sand for the glows, so the microsite has a night plan look:
   a quiet building at night where booked rooms light up like windows.
   Status colors (confirmed, pending, blocked) keep their usual green, amber and gray. */

export const PRIMARY = "#4E6F58";        // buttons, links, icon tiles (white text passes 4.5:1)
export const PRIMARY_HOVER = "#3E5C47";
export const ACCENT = "#4E6F58";
export const SAND = "#D9B98C";           // glows, sparks, lit windows
export const INK = "#1F2A23";
export const DEEP = "#243A2D";
export const MUTED = "#58645B";
export const NEUTRAL = "#6B766E";
export const LINE = "#E2E7E1";
export const BG = "#F6F5EF";             // warm paper (EVOQ Bookings background)
export const OK = "#168A4A";
export const ERR = "#DC2626";

/* Dark surfaces */
export const FOREST = "#16241C";         // deepest night
export const FOREST_MID = "#1F3328";
export const MIST = "#DCE8DF";           // Bookings mist, light text on dark and soft panels

/* Header: a normal photo when the page has one, with a fade behind the text so everything above it stays legible. */
export const HERO_GRADIENT =
  "radial-gradient(60% 70% at 100% 0%, rgba(217,185,140,0.14) 0%, rgba(217,185,140,0) 70%), linear-gradient(110deg, #16241C 0%, #1F3328 45%, #2B4636 80%, #36563F 100%)";
export const HERO_VIGNETTE = "linear-gradient(180deg, rgba(14,24,18,0.45) 0%, rgba(14,24,18,0) 38%)";
export const HERO_SCRIM =
  "linear-gradient(90deg, rgba(14,26,19,0.92) 0%, rgba(14,26,19,0.8) 34%, rgba(14,26,19,0.42) 64%, rgba(14,26,19,0.2) 100%)";
export const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
/* Closing bands */
export const BAND_GRADIENT = "linear-gradient(100deg, #16241C 0%, #1F3328 50%, #2F4A38 100%)";
