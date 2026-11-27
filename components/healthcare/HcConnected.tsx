/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { C, STANDARDS, TOOLS } from "./hcData";

/* One Connected section: the standards (text unchanged from the previous page) and the integrations that were two sections. */

const Svg = ({ children, stroke }: { children: React.ReactNode; stroke: string }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const ICONS: Record<string, (s: string) => React.ReactNode> = {
  interop: (s) => <Svg stroke={s}><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" /></Svg>,
  privacy: (s) => <Svg stroke={s}><path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></Svg>,
  ecosystems: (s) => <Svg stroke={s}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Svg>,
};

export function HcConnected() {
  return (
    <section id="connected" className="scroll-mt-24" style={{ background: `linear-gradient(180deg, #fff, ${C.TINT} 40%, #fff)`, padding: "96px 0 104px" }}>
      <style>{connectedCss}</style>
      <div className="hc-wrap">
        <div style={{ maxWidth: 820 }} data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.CYAN }}>Connected</p>
          <h2 style={{ margin: 0, letterSpacing: "-.02em", fontWeight: 800, color: C.DEEP }}>Built to work across healthcare systems.</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: C.SOFT }}>Privacy rules, health-data standards and digital-health frameworks vary by country and deployment. Confirm the requirements that apply to your organization with the EVOQ team.</p>
        </div>

        <StandardCards />

        <div className="hn-int" data-rv="2">
          <div className="hn-int-copy">
            <h3>Connect the tools your team uses.</h3>
            <p>Sync appointments with Google Calendar, run virtual consultations over Google Meet, collect payments through Stripe, message patients on WhatsApp, track engagement with Google Analytics, and connect your WooCommerce or Shopify store for retail and wellness products.</p>
            <Link href="/integrations" className="hn-link">Explore all integrations <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
          </div>
          <div className="hn-tools">
            {TOOLS.map((t) => (
              <span key={t.name} className="hn-tool">
                <span className="hn-lg" style={{ background: t.bg }}><img src={`/logos/integrations/${t.src}.svg`} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} /></span>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const connectedCss = `
  .hn-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:44px}
  .hn-card{background:#fff;border:1px solid;border-radius:18px;padding:26px;box-shadow:0 24px 56px -38px rgba(16,42,67,.35)}
  .hn-top{display:flex;gap:16px;align-items:flex-start}
  .hn-tile{flex:none;width:60px;height:60px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center}
  .hn-card h3{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:700;color:${C.DEEP};line-height:1.25}
  .hn-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
  .hn-tags span{font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px}
  .hn-card p{margin:20px 0 0;padding-top:18px;border-top:1px solid ${C.LINE};font-size:14.5px;line-height:1.65;color:${C.SOFT}}
  .hn-int{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:center;margin-top:28px;background:#fff;border:1px solid ${C.LINE};border-radius:18px;padding:36px 40px;box-shadow:0 24px 56px -40px rgba(16,42,67,.35)}
  .hn-int h3{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:var(--h3-size);font-weight:700;letter-spacing:-.015em;color:${C.NAVY}}
  .hn-int p{margin:14px 0 0;font-size:15px;line-height:1.75;color:${C.SOFT}}
  .hn-link{display:inline-flex;align-items:center;gap:8px;margin-top:22px;font-size:15px;font-weight:700;color:${C.BLUE};text-decoration:none}
  .hn-link:hover{text-decoration:underline}
  .hn-tools{display:flex;flex-wrap:wrap;gap:10px}
  .hn-tool{display:inline-flex;align-items:center;gap:10px;padding:8px 16px 8px 8px;border-radius:999px;background:#fff;border:1px solid ${C.LINE};font-size:13px;font-weight:700;color:${C.NAVY};white-space:nowrap}
  .hn-lg{width:32px;height:32px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center}
  @media (max-width:1000px){.hn-cards{grid-template-columns:1fr}.hn-int{grid-template-columns:1fr;gap:28px;padding:28px 24px}}
`;

export function StandardCards() {
  return (
        <div className="hn-cards" data-rv="1">
          {STANDARDS.map((c) => (
            <div key={c.key} className="hn-card" style={{ borderColor: c.border }}>
              <div className="hn-top">
                <span className="hn-tile" style={{ background: c.tile }}>{ICONS[c.key](c.ink)}</span>
                <div>
                  <h3>{c.title}</h3>
                  <div className="hn-tags">{c.tags.map((t) => <span key={t} style={{ background: c.tile, color: c.ink }}>{t}</span>)}</div>
                </div>
              </div>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
  );
}
