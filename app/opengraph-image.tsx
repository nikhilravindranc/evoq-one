import { ImageResponse } from "next/og";

export const alt = "EVOQ — One Suite. Endless Potential.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Default social-share image used by every page. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "linear-gradient(135deg, #000099 0%, #3333CC 55%, #7C3AED 100%)", color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 800, letterSpacing: 8 }}>EVOQ</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.08 }}>One Suite. Endless Potential.</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#DDDDFF" }}>CRM, campaigns, service, projects, HR, billing, inventory and AI.</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
