import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { FsSolutions } from "./FsSolutions";
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
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  ServiceOps: I("serviceops-icon.svg"), CRM: I("crm-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"), Desk: I("desk-menu-icn.png"),
  Projects: I("evoq-projects-menu-icn.png"), HRMS: I("hrms-menu-icn-new.png"), Campaigns: I("campaigns-menu-icn.png"), Skillberry: I("Skillberry-menu-icn.png"), Sync: I("sync-menu-icn.png"),
};

const Arrow = ({ s = 15 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: dark ? ORANGE : BURNT }}>{children}</p>;
}
function Cta({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <a href="#" data-enquiry="" className="fs-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", background: dark ? CW : BLUE, color: dark ? NAVY : CW, boxShadow: dark ? "none" : `0 18px 32px -18px ${BLUE}` }}>{children}<Arrow /></a>
  );
}
function Chips({ list }: { list: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((a) => (
        <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 6px", borderRadius: 10, background: CW, border: `1px solid ${LINE}`, fontSize: 12.5, fontWeight: 700, color: NAVY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ICON[a]} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain", borderRadius: 5 }} />{a}
        </span>
      ))}
    </div>
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
            <h1 className="fs-h1" style={{ margin: 0, letterSpacing: "-.03em", fontWeight: 700, color: NAVY }}>Where service jobs are completed and <span style={{ color: BLUE }}>sites stay operational.</span></h1>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.75, color: SOFT, maxWidth: "52ch" }}>Service teams handle field visits, facility requests and equipment maintenance, often across many sites. EVOQ products help assign work, track every job and keep follow-up connected.</p>
            <div style={{ marginTop: 32 }}><Cta>Talk to an expert</Cta></div>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", fontSize: 13.5, fontWeight: 700, color: NAVY }}>
              {[["Field service", BLUE], ["Facilities", NAVY], ["Maintenance", ORANGE]].map(([t, c]) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><i style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />{t}</span>
              ))}
            </div>
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

/* ------------------------------------------------------------------ 3. Ecosystem */
function Ecosystem() {
  const apps: { name: string; line: string; body: string; main?: boolean }[] = [
    { name: "ServiceOps", line: "Coordinate the work.", body: "Manage service requests, work orders, jobs, scheduling, technicians, assets and maintenance activity.", main: true },
    { name: "Desk", line: "Handle incoming requests.", body: "Support request handling where Desk is used as part of the service intake process." },
    { name: "Inventory", line: "Account for parts and stock.", body: "Manage inventory and stock processes, including the broader purchasing and inventory requirements associated with service operations." },
    { name: "Billing", line: "Handle the financial side.", body: "Manage invoicing, payments and related financial processes associated with billable service work." },
  ];
  return (
    <section style={{ background: PALE, padding: "96px 0 100px" }}>
      <div className="fs-wrap">
        <div className="fs-split" data-rv="0" style={{ alignItems: "end" }}>
          <div><Eyebrow>The EVOQ ecosystem</Eyebrow><h2 className="fs-h2" style={h2}>One service job involves requests, technicians, parts and invoices.</h2></div>
          <div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: SOFT, maxWidth: "58ch" }}>Field service, facilities management and maintenance involve more than the work order itself. Requests need to be handled, technicians need the right job information, parts must be accounted for and billable work may need to be invoiced.</p>
            <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.8, color: SOFT, maxWidth: "58ch" }}>EVOQ brings together products that address different parts of these operations, with ServiceOps at the center of service delivery.</p>
          </div>
        </div>

        <div data-rv="1" style={{ marginTop: 52 }}>
          <div className="fs-root" aria-hidden="true"><span className="fs-pill">Service delivery</span></div>
          <div className="fs-tree fs-g4x" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="fs-g4x">
            {apps.map((a) => (
              <article key={a.name} className="fs-card" style={{ background: a.main ? NAVY : CW, color: a.main ? CW : INK, border: `1px solid ${a.main ? NAVY : LINE}`, borderRadius: 18, padding: "24px 22px 26px", boxShadow: a.main ? `0 30px 50px -30px ${NAVY}` : "none" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICON[a.name]} alt="" width={46} height={46} style={{ width: 46, height: 46, objectFit: "contain", background: CW, borderRadius: 12, padding: 5 }} />
                <h3 className="fs-h3s" style={{ margin: "16px 0 0", fontWeight: 700, color: a.main ? CW : NAVY }}>{a.name}</h3>
                <div style={{ marginTop: 4, fontSize: 15, fontWeight: 700, color: a.main ? "#FDBA74" : BURNT }}>{a.line}</div>
                <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.7, color: a.main ? "rgba(248,250,252,.82)" : SOFT }}>{a.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div data-rv="0" style={{ marginTop: 40, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <p style={{ margin: 0, paddingLeft: 18, borderLeft: `3px solid ${ORANGE}`, fontSize: 15.5, lineHeight: 1.75, color: INK, maxWidth: "72ch" }}>Use the products relevant to your operating model. The objective is to give service teams a clearer view of the work while supporting the inventory and financial processes around it.</p>
          <a href="/products" className="fs-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", background: BLUE, color: CW, boxShadow: `0 18px 32px -18px ${BLUE}` }}>Explore EVOQ products<Arrow /></a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. FAQ */
const FAQ: [string, string][] = [
  ["Who is EVOQ Field Service, Facilities & Maintenance for?", "The solution is relevant to external field service providers, in-house field service teams, facilities management companies, internal facilities departments and maintenance teams responsible for equipment and assets."],
  ["What is the difference between a work order and a job?", "A work order represents an authorized service requirement or piece of work. A job represents the field work carried out to fulfill it. Depending on the service requirement, one work order may involve multiple jobs or visits."],
  ["Can EVOQ support both planned and corrective maintenance?", "Yes. ServiceOps supports planned maintenance activities as well as corrective maintenance work. Teams can organize scheduled maintenance, record equipment issues, assign repair work and maintain service history."],
  ["Can field technicians manage their work from mobile devices?", "ServiceOps supports mobile field workflows that help technicians access job information and record work updates and supporting documentation while carrying out service visits."],
  ["Can the solution support multiple sites?", "The solution can support service and maintenance operations across locations, helping teams organize work and review outstanding activity. The appropriate setup depends on the organization's operational structure and access requirements."],
  ["Can EVOQ manage inventory and billing alongside service operations?", "ServiceOps addresses the service-delivery side of the process. EVOQ Inventory supports broader stock and inventory management, while EVOQ Billing handles invoicing and payment processes. The exact data exchange and integration between these products should be confirmed for the proposed deployment."],
  ["Is the solution suitable for both service providers and internal teams?", "Yes. External providers can use the solution to coordinate service delivery for customers, while internal teams can organize work across company facilities, equipment and operational sites. The configuration and processes can reflect the requirements of each operating model."],
];
function Faq() {
  return (
    <section style={{ background: CW, padding: "96px 0" }}>
      <div className="fs-wrap" style={{ maxWidth: 940 }}>
        <div data-rv="0"><Eyebrow>FAQ</Eyebrow><h2 className="fs-h2" style={h2}>Frequently asked questions</h2></div>
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
            <Eyebrow>Take the next step</Eyebrow>
            <h2 className="fs-h2" style={h2}>Bring your jobs, sites and assets into one workflow.</h2>
            <p style={{ margin: "18px 0 28px", fontSize: 15.5, lineHeight: 1.8, color: SOFT, maxWidth: "58ch" }}>Explore how EVOQ can support your service requests, technician scheduling, facilities work orders and equipment maintenance processes.</p>
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
        .fs-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .fs-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;padding:52px 0 88px}
        .fs-hero-vis{position:relative;height:500px}
        .fs-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}
        .fs-g4x{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}
        .fs-root{display:flex;justify-content:center}
        .fs-pill{background:${NAVY};color:#fff;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:9px 18px;border-radius:99px}
        .fs-tree{height:44px}
        .fs-tree i{position:relative;display:block}
        .fs-tree i::before{content:"";position:absolute;top:21px;height:2px;background:${AZURE}}
        .fs-tree i::after{content:"";position:absolute;left:calc(50% - 1px);width:2px;bottom:0;top:21px;background:${AZURE}}
        .fs-tree i:nth-child(1)::before{left:50%;right:-11px}
        .fs-tree i:nth-child(2)::before,.fs-tree i:nth-child(3)::before{left:-11px;right:-11px}
        .fs-tree i:nth-child(4)::before{left:-11px;right:50%}
        .fs-tree i:nth-child(2)::after{top:0}
        .fs-btn{transition:transform .2s ease,box-shadow .2s ease}
        .fs-btn:hover{transform:translateY(-2px)}
        .fs-card{transition:transform .3s ease,box-shadow .3s ease}
        .fs-card:hover{transform:translateY(-5px);box-shadow:0 28px 52px -30px rgba(15,61,117,.55)}
        .fs-faq summary::-webkit-details-marker{display:none}
        .fs-faq[open] .fs-plus{background:${BLUE};color:#fff;transform:rotate(45deg)}
        @keyframes fsDash{to{stroke-dashoffset:-44}}
        .fs-route{animation:fsDash 2.4s linear infinite}
        @keyframes fsPulse{0%{r:9;opacity:.5}100%{r:26;opacity:0}}
        .fs-pulse{animation:fsPulse 2s ease-out infinite}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1100px){.fs-g4x{grid-template-columns:repeat(2,minmax(0,1fr))}.fs-root,.fs-tree{display:none}}
        @media (max-width:980px){.fs-hero,.fs-split,.fs-cta{grid-template-columns:1fr!important;gap:34px}.fs-hero-vis{height:470px}.fs-cta{padding:38px 28px!important}}
        @media (max-width:640px){.hs-root .fs-h2{font-size:30px!important}.hs-root .fs-h3{font-size:24px!important}.fs-g4x{grid-template-columns:1fr}.fs-phone{width:190px!important}}
        @media (prefers-reduced-motion:reduce){.fs-route,.fs-pulse,.fs-card,.fs-btn{animation:none;transition:none}}
      `}</style>
      <HeroShell bg={{ background: CW }} topbar={<Topbar darkCTA={false} light ctaColor={NAVY} />}>
        <Hero />
      </HeroShell>
      <FsSolutions />
      <Ecosystem />
      <Faq />
      <FinalCta />
      <Footer background={NAVY} />
    </div>
  );
}
