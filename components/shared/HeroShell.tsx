import type { CSSProperties, ReactNode } from "react";

/* One continuous background behind the site header and the hero, so the
   header never reads as a separate white strip above the hero. The hero's own
   section is transparent; the page passes the hero's background here. The
   header sits above the hero (z-index) so its menus are never clipped. */
export function HeroShell({ bg, topbar, children }: { bg: CSSProperties; topbar: ReactNode; children: ReactNode }) {
  return (
    <div style={{ position: "relative", ...bg }}>
      <div style={{ position: "relative", zIndex: 60 }}>{topbar}</div>
      {children}
    </div>
  );
}
