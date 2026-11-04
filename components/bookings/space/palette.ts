/* Colors for the Space & Room Reservations microsite. They branch from the EVOQ Bookings design system
   (components/bookings/theme.tsx: terracotta, sand and warm paper) rather than its sage, which is the
   Bookings product color itself. No other EVOQ product uses clay: CRM is blue, Desk and Inventory teal,
   ServiceOps orange, Campaigns and Projects violet, Sync and HRMS green. Dark surfaces use a deep clay
   brown, with sand for the glows. Status colors (confirmed, pending, blocked) keep green, amber and gray. */

export const PRIMARY = "#B4583A";        // buttons, links, icon tiles (white text passes 4.5:1)
export const PRIMARY_HOVER = "#9A472D";
export const ACCENT = "#B4583A";
export const SAND = "#D9B98C";           // glows, sparks, lit windows
export const INK = "#2B211C";
export const DEEP = "#3B2A22";
export const MUTED = "#6A5C54";
export const NEUTRAL = "#7A6F68";
export const LINE = "#EADFD4";
export const BG = "#FAF6F0";             // warm paper
export const OK = "#168A4A";
export const ERR = "#DC2626";

/* Dark surfaces */
export const FOREST = "#2B1912";         // deepest night, a deep clay brown
export const FOREST_MID = "#3A2218";
export const MIST = "#F3E8D8";

/* Header: a normal photo when the page has one. A light fade sits only behind the text. */
export const HERO_GRADIENT =
  "radial-gradient(60% 70% at 100% 0%, rgba(217,185,140,0.22) 0%, rgba(217,185,140,0) 70%), linear-gradient(110deg, #3A1F16 0%, #5E2F20 40%, #8E442D 78%, #A9553A 100%)";
export const HERO_VIGNETTE = "linear-gradient(180deg, rgba(40,20,12,0.32) 0%, rgba(40,20,12,0) 30%)";
export const HERO_SCRIM =
  "linear-gradient(90deg, rgba(58,28,18,0.74) 0%, rgba(58,28,18,0.6) 32%, rgba(58,28,18,0.2) 62%, rgba(58,28,18,0.06) 100%)";
export const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
/* Closing bands */
export const BAND_GRADIENT = "linear-gradient(100deg, #5E2F20 0%, #8E442D 55%, #B4583A 100%)";
