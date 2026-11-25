import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { FsSolutions } from "./FsSolutions";
import { FsAround } from "./FsAround";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";

/* Field Service, Facilities & Maintenance: fast, operational, directional, connected.
   Palette is strictly: EVOQ blue, navy, azure, pale blue, orange, burnt orange, pale orange, cool white, slate black. */
const BLUE = "#1777F0";
const NAVY = "#0F3D75";
const AZURE = "#3B82F6";
const PALE = "#DBEAFE";
const ORANGE = "#F97316";
const BURNT = "#C2410C";
const POR = "#FFEDD5";
const CW = "#F8FAFC";
const INK = "#172033";
const SOFT = "rgba(23,32,51,.72)";
const LINE = "rgba(15,61,117,.16)";

const U = (id: string, w = 1100) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const photo = (src: string, extra: CSSProperties = {}): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", ...extra });

const Arrow = ({ s = 15 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: dark ? ORANGE : BURNT }}>{children}</p>;
}
function Cta({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <a href="#" data-enquiry="" className="fs-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", background: dark ? CW : BLUE, color: dark ? NAVY : CW, boxShadow: dark ? "none" : `0 18px 32px -18px ${BLUE}` }}>{children}<Arrow /></a>
  );
}
const h2: CSSProperties = { margin: 0, letterSpacing: "-.025em", fontWeight: 700, color: NAVY };

/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: "-10%", top: "-30%", width: 780, height: 780, borderRadius: "50%", background: `radial-gradient(closest-side, ${PALE}, rgba(219,234,254,0))` }} />
      <div className="fs-wrap" style={{ position: "relative" }}>
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: SOFT }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: INK, fontWeight: 600 }}>Field Service, Facilities &amp; Maintenance</b></nav>
        <div className="fs-hero">
          <div data-rv="0">
            <Eyebrow>Field Service · Facilities · Maintenance</Eyebrow>
            <h1 className="fs-h1" style={{ margin: 0, letterSpacing: "-.03em", fontWeight: 700, color: NAVY }}>Service requests logged, work assigned, <span style={{ color: BLUE }}>sites and equipment maintained.</span></h1>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.75, color: SOFT, maxWidth: "52ch" }}>Log service requests, assign and dispatch technicians, record parts used and raise the invoice when the job closes. Site requests, inspections and preventive maintenance run alongside reactive jobs, across sites and assets.</p>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 14 }}><Cta>Talk to an expert</Cta><a href="#solutions" className="fs-btn" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", color: NAVY, background: "#fff", boxShadow: `inset 0 0 0 1.5px ${LINE}` }}>Explore the solutions</a></div>
          </div>

          {/* map, route and mobile work order */}
          <div className="fs-hero-vis" data-rv="1" aria-hidden="true">
            <div style={{ position: "absolute", left: 0, top: 0, width: "78%", height: "76%", borderRadius: 26, background: PALE, border: `1px solid ${LINE}`, overflow: "hidden", boxShadow: "0 40px 70px -44px rgba(15,61,117,.6)" }}>
              <svg viewBox="0 0 440 300" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none">
                <g stroke={AZURE} strokeOpacity=".22" strokeWidth="1">{[40, 90, 140, 190, 240].map((y) => <path key={y} d={`M0 ${y}H440`} />)}{[60, 130, 200, 270, 340, 410].map((x) => <path key={x} d={`M${x} 0V300`} />)}</g>
                <path d="M-10 230 C 90 210, 120 120, 210 130 S 330 60, 460 80" stroke={CW} strokeWidth="14" strokeLinecap="round" opacity=".9" />
                <path d="M40 270 C 100 190, 180 210, 240 170 S 360 150, 420 110" stroke={CW} strokeWidth="8" strokeLinecap="round" opacity=".7" />
                <path id="fs-route" d="M60 246 C 120 200, 150 168, 214 150 S 330 110, 372 74" stroke={BLUE} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" className="fs-route" />
                <g transform="translate(372 74)"><circle r="18" fill={ORANGE} opacity=".22" className="fs-pulse" /><circle r="9" fill={ORANGE} /><circle r="3.5" fill={CW} /></g>
                <g><circle r="9" fill={BLUE} stroke={CW} strokeWidth="3"><animateMotion dur="7s" repeatCount="indefinite"><mpath href="#fs-route" /></animateMotion></circle></g>
              </svg>
              <span style={{ position: "absolute", left: 16, top: 14, background: CW, color: BURNT, fontSize: 11.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 8, height: 8, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />Field visit · ETA 18 min</span>
              <span style={{ position: "absolute", left: 16, top: 50, background: CW, color: NAVY, fontSize: 11.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 8, height: 8, background: NAVY, borderRadius: "50%", display: "inline-block" }} />Facilities · Request logged · Level 3</span>
              <span style={{ position: "absolute", left: 16, top: 86, background: POR, color: BURNT, fontSize: 11.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 8, height: 8, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />Maintenance · Pump 2 · PM due Fri</span>
            </div>
            <div style={{ position: "absolute", left: 18, bottom: 0, width: "40%", height: "36%", borderRadius: 22, border: `5px solid ${CW}`, ...photo(U("1613620838744-a0fbfb76bae3", 900)), boxShadow: "0 30px 56px -30px rgba(15,61,117,.7)" }} />
            <div className="fs-phone" style={{ position: "absolute", right: 0, top: 24, width: 218, height: 408, borderRadius: 36, background: NAVY, padding: 9, boxShadow: "0 50px 80px -36px rgba(15,61,117,.8)" }}>
              <div style={{ height: "100%", borderRadius: 28, background: CW, padding: "20px 16px", overflow: "hidden" }}>
                <div style={{ width: 54, height: 5, borderRadius: 3, background: LINE, margin: "0 auto 14px" }} />
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: BURNT }}>Work order</div>
                <div style={{ marginTop: 3, fontSize: 17, fontWeight: 700, color: NAVY }}>WO-2041</div>
                <div style={{ fontSize: 11.5, color: SOFT }}>Preventive maintenance · Line 2</div>
                <div style={{ marginTop: 14, display: "grid", gap: 0 }}>
                  {[["Request", "Logged 09:10", "done"], ["Dispatch", "Ravi assigned", "dispatch"], ["Visit", "On the way", "now"], ["Resolution", "Pending", "next"], ["Follow-up", "Pending", "next"]].map(([t, d, st], i) => (
                    <div key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ width: 16, height: 16, borderRadius: "50%", background: st === "next" ? CW : st === "dispatch" ? ORANGE : BLUE, border: `2px solid ${st === "next" ? LINE : st === "dispatch" ? ORANGE : BLUE}`, boxShadow: st === "now" ? `0 0 0 4px ${PALE}` : "none" }} />
                        {i < 4 && <span style={{ width: 2, height: 24, background: st === "next" ? LINE : AZURE }} />}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginTop: -1 }}>{t}<span style={{ display: "block", fontSize: 10.5, fontWeight: 400, color: SOFT }}>{d}</span></div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, background: BLUE, color: CW, textAlign: "center", fontSize: 12, fontWeight: 700, padding: "10px 0", borderRadius: 10 }}>Update status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. FAQ */
const FAQ: [string, string][] = [
  ["Who is EVOQ Field Service, Facilities & Maintenance for?", "External field service providers, in-house field teams, facilities management companies, internal facilities departments and maintenance teams."],
  ["What is the difference between a work order and a job?", "A work order is the authorized work. A job is the field visit that fulfils it, and one work order can involve several jobs."],
  ["Can EVOQ support both planned and corrective maintenance?", "Yes. Planned maintenance is scheduled and tracked. Corrective repairs are recorded, assigned and kept in the service history."],
  ["Can field technicians manage their work from mobile devices?", "Yes. Technicians open job details and record updates and supporting documents from a mobile device."],
  ["Can the solution support multiple sites?", "Yes. Work and open activity can be organized and reviewed across locations. Setup depends on your structure and access needs."],
  ["Can EVOQ manage inventory and billing alongside service operations?", "ServiceOps handles the service job. Inventory handles stock and Billing handles invoices and payments. The data each product shares depends on your setup."],
  ["Where do bookings fit?", "Bookings covers online booking of service visits, meeting rooms and equipment, and courts, pools, halls and event venues. It sits alongside ServiceOps, which runs the work itself."],
  ["Does an AI agent act on its own?", "No. The agents draft and flag, and a person sends, books or decides."],
  ["Is the solution suitable for both service providers and internal teams?", "Yes. Providers coordinate work for customers. Internal teams organize work across their own facilities, equipment and sites."],
];
function Faq() {
  return (
    <section style={{ background: CW, padding: "96px 0" }}>
      <div className="fs-wrap" style={{ maxWidth: 940 }}>
        <div data-rv="0"><Eyebrow>Questions</Eyebrow><h2 className="fs-h2" style={h2}>Questions about EVOQ for field service, facilities and maintenance.</h2></div>
        <div data-rv="1" style={{ marginTop: 40, borderTop: `1px solid ${LINE}` }}>
          {FAQ.map(([q, a]) => (
            <details key={q} className="fs-faq" style={{ borderBottom: `1px solid ${LINE}` }}>
              <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, padding: "22px 0", fontSize: 18, fontWeight: 600, color: NAVY }}>
                {q}<span aria-hidden="true" className="fs-plus" style={{ flex: "none", width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${BLUE}`, color: BLUE, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18, lineHeight: 1 }}>+</span>
              </summary>
              <p style={{ margin: "0 0 24px", maxWidth: "72ch", fontSize: 15.5, lineHeight: 1.8, color: SOFT }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 5. Final CTA */
function FinalCta() {
  return (
    <section id="talk" style={{ background: CW, padding: "20px 0 96px" }}>
      <div className="fs-wrap">
        <div data-rv="0" className="fs-cta" style={{ position: "relative", overflow: "hidden", borderRadius: 28, background: PALE, border: `1px solid ${LINE}`, color: INK, padding: "60px 60px", display: "block", minHeight: 340 }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(15,61,117,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,61,117,.07) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "linear-gradient(90deg, #000, transparent 90%)", WebkitMaskImage: "linear-gradient(90deg, #000, transparent 90%)" }} />
          <div style={{ position: "relative", maxWidth: 580 }}>
            <Eyebrow>Talk to us</Eyebrow>
            <h2 className="fs-h2" style={h2}>Start with how your service requests and visits work today.</h2>
            <p style={{ margin: "18px 0 28px", fontSize: 15.5, lineHeight: 1.8, color: SOFT, maxWidth: "58ch" }}>Tell us how requests, technician scheduling and maintenance run today, and we will show where EVOQ products fit.</p>
            <Cta>Talk to an expert</Cta>
          </div>
          <div className="fs-ctavis" aria-hidden="true" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "52%", pointerEvents: "none" }}>
            <span style={{ position: "absolute", right: -60, top: -50, width: 300, height: 190, borderRadius: "0 100% 0 100%", background: `linear-gradient(135deg, ${POR}, rgba(255,237,213,0))`, filter: "blur(14px)", opacity: .9 }} />
            <span style={{ position: "absolute", right: 70, top: "12%", width: 340, height: 220, borderRadius: "0 100% 0 100%", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${AZURE}, ${BLUE})`, opacity: .28, border: "2px solid rgba(255,255,255,.9)", boxShadow: "inset 0 0 40px rgba(255,255,255,.55)" }} />
            <span style={{ position: "absolute", right: -80, bottom: -90, width: 360, height: 230, borderRadius: "100% 0 100% 0", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${AZURE}, ${NAVY})`, opacity: .22, border: "2px solid rgba(255,255,255,.9)", boxShadow: "inset 0 0 40px rgba(255,255,255,.55)" }} />
            <span style={{ position: "absolute", right: 250, bottom: -110, width: 300, height: 190, borderRadius: "0 100% 0 100%", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${PALE}, ${AZURE})`, opacity: .4, border: "2px solid rgba(255,255,255,.9)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FieldServicePage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: CW, color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Field Service, Facilities & Maintenance" segments={["Field service provider", "Facilities management company", "Maintenance team", "Other service operation"]} segmentLabel="Your operation" placeholder="Service requests, technicians, parts, scheduling, follow-up..." accent={NAVY} accentSoft={BLUE} />
      <style>{`
        .hs-root .fs-h1{font-weight:600!important;letter-spacing:-.025em!important;line-height:1.1!important;text-wrap:balance}
        .hs-root .fs-h2{font-size:40px!important;font-weight:600!important;letter-spacing:-.02em!important;line-height:1.18!important;text-wrap:balance}
        .hs-root .fs-h3{font-size:30px!important;font-weight:600!important;letter-spacing:-.015em!important;line-height:1.22!important;text-wrap:balance}
        .hs-root .fs-h3s{font-size:22px!important;font-weight:700!important;letter-spacing:-.01em!important;line-height:1.25!important}
        .fs-wrap{max-width:1328px;margin:0 auto;padding:0 24px}
        .fs-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;padding:52px 0 88px}
        .fs-hero-vis{position:relative;height:500px}
        .fs-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}
        .fs-btn{transition:transform .2s ease,box-shadow .2s ease}
        .fs-btn:hover{transform:translateY(-2px)}
        .fs-faq summary::-webkit-details-marker{display:none}
        .fs-faq[open] .fs-plus{background:${BLUE};color:#fff;transform:rotate(45deg)}
        @keyframes fsDash{to{stroke-dashoffset:-44}}
        .fs-route{animation:fsDash 2.4s linear infinite}
        @keyframes fsPulse{0%{r:9;opacity:.5}100%{r:26;opacity:0}}
        .fs-pulse{animation:fsPulse 2s ease-out infinite}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:980px){.fs-hero,.fs-split,.fs-cta{grid-template-columns:1fr!important;gap:34px}.fs-hero-vis{height:470px}.fs-cta{padding:38px 28px!important}}
        @media (max-width:640px){.hs-root .fs-h2{font-size:30px!important}.hs-root .fs-h3{font-size:24px!important}.fs-phone{width:190px!important}}
        @media (prefers-reduced-motion:reduce){.fs-route,.fs-pulse,.fs-btn{animation:none;transition:none}}
      `}</style>
      <HeroShell bg={{ background: CW }} topbar={<Topbar darkCTA={false} light ctaColor={NAVY} />}>
        <Hero />
      </HeroShell>
      <FsSolutions />
      <FsAround />
      <Faq />
      <FinalCta />
      <Footer background={NAVY} />
    </div>
  );
}
