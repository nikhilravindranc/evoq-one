import Image from "next/image";

/* ── product logo marks ──
 * Real product logos, cropped to icon-only (see public/logos/*-icon.png).
 * CRM/Desk/ServiceOps ship their own colored badge baked into the PNG.
 * HRMS/Skillberry are bare glyphs with their OWN ink color (dark green /
 * multicolor berries respectively, not white), so they get a wrapper here
 * -- but the wrapper must contrast with that ink, not match it. hrms used
 * to wrap its dark-green glyph in an equally dark-green circle, which made
 * the icon nearly disappear into its own background (confirmed by
 * compositing the pixels); it now gets the same light-tint treatment as
 * skillberry.
 *
 * Campaigns/Sync/Projects only shipped as full wordmark lockups (icon +
 * text), no separate icon-only crop. Their icon square sits flush at the
 * left edge and is exactly as wide as the image is tall (verified against
 * the source PNGs), so `object-fit: cover` + `object-position: left` on a
 * square box reproduces the same icon-only crop the other products get
 * from a dedicated file, with no new assets needed.
 */

export const PRODUCT_BRAND: Record<string, { bg: string; solid: boolean }> = {
  crm: { bg: "#2554EB", solid: true },
  desk: { bg: "#0E8C82", solid: true },
  hrms: { bg: "#D5EDE0", solid: false },
  skillberry: { bg: "var(--soft)", solid: false },
  serviceops: { bg: "#F5A123", solid: true },
  campaigns: { bg: "#6D4FEB", solid: true },
  sync: { bg: "#0E9F6E", solid: true },
  projects: { bg: "#6D4FEB", solid: true },
  inventory: { bg: "#0E8C9E", solid: true },
  billing: { bg: "#7C6EF0", solid: true },
};

export const PRODUCT_LOGO_SRC: Record<string, string> = {
  crm: "/logos/crm-icon.png",
  desk: "/logos/desk-icon.png",
  hrms: "/logos/hrms-icon.png",
  skillberry: "/logos/skillberry-icon.png",
  serviceops: "/logos/serviceops-icon.png",
  campaigns: "/logos/campaigns.png",
  sync: "/logos/sync.png",
  projects: "/logos/projects.png",
  inventory: "/logos/inventory.svg",
  billing: "/logos/billing.svg",
};

// Products whose PNG is a bare glyph and needs a color wrapper drawn here.
const NEEDS_WRAPPER = new Set(["hrms", "skillberry"]);

// Products with no icon-only crop — get one via CSS from the full lockup.
const CROP_ICON = new Set(["campaigns", "sync", "projects", "inventory", "billing"]);

export function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ProductBadge({ productKey, size = 34 }: { productKey: string; size?: number }) {
  const brand = PRODUCT_BRAND[productKey] ?? PRODUCT_BRAND.crm;
  const src = PRODUCT_LOGO_SRC[productKey] ?? PRODUCT_LOGO_SRC.crm;

  if (CROP_ICON.has(productKey)) {
    return (
      <span
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.32),
          overflow: "hidden",
          position: "relative",
          display: "block",
          flexShrink: 0,
        }}
      >
        <Image src={src} alt="" fill sizes={`${size}px`} style={{ objectFit: "cover", objectPosition: "left center" }} />
      </span>
    );
  }

  if (!NEEDS_WRAPPER.has(productKey)) {
    return (
      <span style={{ width: size, height: size, flexShrink: 0, position: "relative", display: "block" }}>
        <Image src={src} alt="" fill sizes={`${size}px`} style={{ objectFit: "contain" }} />
      </span>
    );
  }

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.32),
        background: brand.bg,
        border: brand.solid ? "none" : "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ width: Math.round(size * 0.56), height: Math.round(size * 0.56), position: "relative", display: "block" }}>
        <Image src={src} alt="" fill sizes={`${Math.round(size * 0.56)}px`} style={{ objectFit: "contain" }} />
      </span>
    </span>
  );
}
