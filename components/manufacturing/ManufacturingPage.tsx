import type { CSSProperties, ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { ConfigXWindow } from "./ConfigX";
import { MfMotion } from "./MfMotion";
import { EnquiryModal } from "./EnquiryModal";
import { SolutionsTabs } from "./SolutionsTabs";
import { HeroVisual } from "./HeroVisual";

const G = "#1F2933";
const ST = "#475569";
const SL = "#64748B";
const LS = "#94A3B8";
const CG = "#CBD5E1";
const PG = "#F1F5F9";
const BL = "#2563EB";
const PB = "#DBEAFE";
const TX = "#111827";

const U = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const IMG = {
  hero: U("1717386255773-1e3037c81788", 1600),
  motor: U("1736161999520-0a20fa297a89", 900),
  floor: U("1764185800646-f75f7e16e465", 1800),
  warehouse: U("1644079446600-219068676743", 1800),
  delivery: U("1683252162057-07215f03d1ad", 1400),
  manager: U("1532634902-bbce41c89ef6", 900),
  technician: U("1581094487600-9d2381d4eeef", 900),
  coordinator: U("1766066014237-00645c74e9c6", 900),
  robots: U("1647427060118-4911c9821b82", 800),
  excavator: U("1649807533255-bbc9c9fb7d77", 800),
  kitchen: U("1742192757416-27d69a5d5029", 800),
  profiles: U("1738966523829-5d3c195abce3", 800),
  cleanroom: U("1748000970909-845f4aa144d2", 800),
  cnc: U("1740209475472-aa7d280f7452", 800),
  plant: U("1717386255767-52643970d483", 1800),
  factoryMan: U("1598299803204-b73796f43289", 1800),
  truck: U("1543510425-1eccdf3ae819", 1400),
  techTablet: U("1778074762033-c6595907684d", 1400),
};

const ICONS: Record<string, ReactNode> = {
  factory: <><path d="M3 21V10l6 3V10l6 3V5h4v16z" /><path d="M7 17h2M12 17h2M17 17h1" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.2A8 8 0 1 1 21 12z" /><path d="M9 11h6M9 14h4" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
  doc: <><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>,
  cart: <><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.5 12h11L21 7H6" /></>,
  box: <><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
  truck: <><path d="M2 6h12v10H2zM14 9h4l3 3v4h-7" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21a7 7 0 0 1 14 0M17 4a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6.3" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 12 10 5 10-5M2 17l10 5 10-5" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  tag: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.4" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="14" width="5" height="6" rx="2" /><rect x="17" y="14" width="5" height="6" rx="2" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  map: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  sync: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></>,
};
function Ic({ n, s = 20, c = ST, w = 1.7 }: { n: string; s?: number; c?: string; w?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[n]}</svg>;
}

const photoStyle = (src: string, extra: CSSProperties = {}): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", ...extra });

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: light ? "#CBD5E1" : SL }}>{children}</p>;
}
function Btn({ children, dark = true, href = "#", enquiry = false }: { children: ReactNode; dark?: boolean; href?: string; enquiry?: boolean }) {
  return (
    <a href={enquiry ? "#" : href} {...(enquiry ? { "data-enquiry": "" } : {})} className="mf-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 22px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: "none", background: dark ? G : "#fff", color: dark ? "#fff" : G, border: dark ? `1px solid ${G}` : `1px solid ${CG}` }}>{children}</a>
  );
}
function Card({ style, children, cls }: { style?: CSSProperties; children: ReactNode; cls?: string }) {
  return <div className={cls} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${CG}`, boxShadow: "0 24px 50px -28px rgba(31,41,51,.45)", ...style }}>{children}</div>;
}
function Sec({ bg = "#fff", children, id, grid = false, pad = "88px 0" }: { bg?: string; children: ReactNode; id?: string; grid?: boolean; pad?: string }) {
  return (
    <section id={id} style={{ background: bg, padding: pad, position: "relative", overflow: "hidden", backgroundImage: grid ? `linear-gradient(${CG}40 1px, transparent 1px), linear-gradient(90deg, ${CG}40 1px, transparent 1px)` : undefined, backgroundSize: grid ? "40px 40px" : undefined }}>
      <div className="mf-wrap">{children}</div>
    </section>
  );
}
function Chip({ icon, title, sub, style }: { icon?: string; title: string; sub?: string; style?: CSSProperties }) {
  return (
    <div className="mf-float" style={{ position: "absolute", background: "#fff", borderRadius: 10, border: `1px solid ${CG}`, boxShadow: "0 18px 36px -20px rgba(31,41,51,.55)", padding: "8px 12px", display: "flex", alignItems: "center", gap: 9, ...style }}>
      {icon && <span style={{ width: 28, height: 28, borderRadius: 7, background: PG, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n={icon} s={15} /></span>}
      <span style={{ fontSize: 11.5, fontWeight: 700, color: G, lineHeight: 1.25 }}>{title}{sub && <span style={{ display: "block", fontSize: 10, fontWeight: 500, color: SL }}>{sub}</span>}</span>
    </div>
  );
}
function Dots({ ok = true }: { ok?: boolean }) {
  return <span style={{ width: 6, height: 6, borderRadius: "50%", background: ok ? BL : LS, display: "inline-block" }} />;
}

/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  return (
    <section style={{ background: "#fff", position: "relative", overflow: "hidden", backgroundImage: `linear-gradient(${CG}38 1px, transparent 1px), linear-gradient(90deg, ${CG}38 1px, transparent 1px)`, backgroundSize: "44px 44px" }}>
      <div className="mf-wrap" style={{ paddingTop: 22 }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: SL }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: G, fontWeight: 600 }}>Manufacturing</b></nav>
        <div className="mf-hero">
          <div>
            <Eyebrow>Manufacturing solutions</Eyebrow>
            <h1 className="mf-h1">From product enquiry to the field</h1>
            <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.7, color: ST, maxWidth: "50ch" }}>Manufacturing extends beyond production. It involves customer relationships, product configuration, commercial operations, delivery and ongoing service. EVOQ products support the work that moves manufactured products through this lifecycle.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn enquiry>Talk to an expert <Ic n="arrow" s={15} c="#fff" w={2.2} /></Btn>
              <Btn dark={false} href="#solutions">Explore manufacturing solutions</Btn>
            </div>
          </div>
          <div className="mf-hero-visual">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Lifecycle */
/* ------------------------------------------------------------------ 2. Lifecycle */
function Lifecycle() {
  const steps: [string, string, string, string, string?][] = [
    ["chat", "Enquiry", "Capture customer enquiries, accounts and sales opportunities.", "CRM"],
    ["cog", "Configure", "Define product options and specifications around customer requirements.", "ConfigX"],
    ["doc", "Quote", "Prepare quotes that reflect the selected configuration and pricing.", "ConfigX"],
    ["cart", "Order", "Move from an agreed quote into order-related commercial activity.", "CRM · Finance · Billing"],
    ["factory", "Production", "Coordinate project tasks and activities associated with preparing products for delivery, where applicable.", "Projects"],
    ["box", "Inventory & fulfillment", "Track stock and supply information relevant to product availability and fulfillment.", "Inventory", "Also informs production"],
    ["truck", "Delivery", "Coordinate delivery-related projects and activities required to complete customer commitments, where applicable.", "Projects"],
    ["wrench", "Service", "Manage work orders, technician dispatch, maintenance activities and customer support after delivery.", "ServiceOps · Desk"],
  ];
  return (
    <Sec bg="#fff" pad="48px 0 80px" id="lifecycle">
      <Eyebrow>From enquiry to service</Eyebrow>
      <div className="mf-split2" style={{ alignItems: "end" }}>
        <h2 className="mf-h2">One product. <span style={{ color: SL, fontWeight: 400 }}>A longer journey.</span></h2>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: ST, maxWidth: "58ch" }}>A manufactured product passes through commercial and operational stages before and after it reaches the customer. Each stage creates information and responsibilities that need to carry forward as the product moves toward delivery and service.</p>
      </div>
      <div className="mf-g4" style={{ marginTop: 40, rowGap: 22 }}>
        {steps.map(([ic, t, d, app, note], i) => (
          <div key={t} style={{ position: "relative", border: `1px solid ${CG}`, borderRadius: 14, padding: "20px 20px 18px", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="mf-stepic" style={{ width: 46, height: 46, borderRadius: 11, border: `1px solid ${CG}`, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", animationDelay: `${i * 1.05}s` }}><Ic n={ic} s={21} c={G} /></span>
              <span style={{ fontSize: 11, color: LS, letterSpacing: ".14em", fontWeight: 600 }}>0{i + 1}</span>
            </div>
            <div style={{ marginTop: 16, fontSize: 16, fontWeight: 700, color: G }}>{t}</div>
            <p style={{ margin: "7px 0 0", fontSize: 12.5, lineHeight: 1.6, color: ST }}>{d}</p>
            {note && <span style={{ marginTop: 10, alignSelf: "flex-start", fontSize: 10.5, fontWeight: 700, color: BL, background: PB, padding: "3px 10px", borderRadius: 99, display: "inline-flex", gap: 6, alignItems: "center" }}><Ic n="sync" s={11} c={BL} w={2.2} />{note}</span>}
            <div style={{ marginTop: "auto", paddingTop: 14 }}>
              <span style={{ display: "inline-block", borderTop: `1px solid ${PG}`, paddingTop: 11, width: "100%", fontSize: 11, fontWeight: 700, color: SL }}>{app}</span>
            </div>
            {i % 4 !== 3 && <span aria-hidden="true" className="mf-arrow" style={{ position: "absolute", right: -17, top: 34, zIndex: 2, width: 22, height: 22, borderRadius: "50%", background: "#fff", border: `1px solid ${CG}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n="arrow" s={12} c={BL} w={2.2} /></span>}
          </div>
        ))}
      </div>
      <div style={{ position: "relative", marginTop: 26 }}>
        <div aria-hidden="true" style={{ position: "absolute", left: "6%", right: "6%", top: -14, height: 14, borderLeft: `1.5px dashed ${CG}`, borderRight: `1.5px dashed ${CG}` }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", borderRadius: 14, border: `1px solid ${PB}`, background: `linear-gradient(90deg, ${PB}, #fff 80%)`, padding: "18px 24px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/billing/images/sync-menu-icn.png" alt="" width={40} height={40} style={{ width: 40, height: 40, objectFit: "contain" }} />
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: BL }}>Across the lifecycle</div>
            <div style={{ marginTop: 3, fontSize: 14, color: G, fontWeight: 600 }}>Sync</div>
          </div>
          <p style={{ margin: 0, flex: "2 1 380px", fontSize: 13.5, lineHeight: 1.6, color: ST }}>Sync supports data synchronization between EVOQ products and existing systems through supported integrations.</p>
        </div>
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 3. ConfigX */
function ConfigX() {
  const steps = [["cog", "Configure"], ["eye", "Visualize"], ["tag", "Price"], ["doc", "Quote"]];
  return (
    <Sec bg={PG} grid id="configx">
      <div className="mf-split2" style={{ alignItems: "center", gap: 48 }}>
        <div>
          <Eyebrow>Complex product selling</Eyebrow>
          <h2 className="mf-h2">Make complexity <span style={{ color: LS, fontWeight: 400 }}>easier to sell</span></h2>
          <p style={{ margin: "22px 0 0", fontSize: 15.5, lineHeight: 1.7, color: ST, maxWidth: "48ch" }}>Some products involve multiple options, specifications, dimensions, materials and pricing considerations. ConfigX supports a guided configuration experience that helps sales teams visualize selections, calculate pricing and prepare quotes that reflect customer requirements.</p>
          <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {steps.map(([ic, t], i) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 99, background: "#fff", border: `1px solid ${CG}`, fontSize: 13, fontWeight: 700, color: G }}><Ic n={ic} s={16} c={i === 0 ? BL : G} />{t}</span>
                {i < 3 && <Ic n="arrow" s={15} c={LS} />}
              </span>
            ))}
          </div>
          <p style={{ margin: "20px 0 0", fontSize: 14, lineHeight: 1.65, color: SL, maxWidth: "52ch" }}>From modular furniture to industrial equipment, the product-selling experience can reflect the options and specifications relevant to what you manufacture.</p>
          <div style={{ marginTop: 26 }}><Btn enquiry>Explore ConfigX <Ic n="arrow" s={15} c="#fff" w={2.2} /></Btn></div>
        </div>
        <ConfigXWindow />
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 7. Segments */
function Segments() {
  const segs: [string, string, string][] = [
    ["Industrial manufacturing", "Support customer relationships, commercial activity and service operations around industrial products.", IMG.robots],
    ["Equipment manufacturers", "Coordinate product configuration, customer projects and ongoing equipment service.", IMG.excavator],
    ["Furniture & modular products", "Support configurable product sales, customer enquiries and order-related activity.", IMG.kitchen],
    ["Building products", "Manage enquiries, product options, commercial records and relevant fulfillment processes.", IMG.profiles],
    ["Medical devices", "Support product-related customer relationships, commercial operations and post-sale service where applicable.", IMG.cleanroom],
    ["Other configurable products", "Explore how product configuration, quoting and related commercial activities can support other manufacturers.", IMG.cnc],
  ];
  const corner = (pos: CSSProperties): CSSProperties => ({ position: "absolute", width: 14, height: 14, borderColor: "rgba(255,255,255,.85)", borderStyle: "solid", borderWidth: 0, ...pos });
  return (
    <Sec bg="#fff" id="segments" pad="84px 0 88px">
      <div className="mf-split2" style={{ alignItems: "end", marginBottom: 38 }}>
        <div>
          <Eyebrow>Manufacturing segments</Eyebrow>
          <h2 className="mf-h2">Different products. Different operating needs.</h2>
        </div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: ST, maxWidth: "56ch" }}>Manufacturers vary in how they configure products, handle orders, coordinate delivery and support customers after the sale. Explore how EVOQ products may support the work surrounding different product types.</p>
      </div>
      <div className="mf-g3" style={{ gap: 22 }}>
        {segs.map(([t, d, img], i) => (
          <div key={t} className="mf-seg" style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${CG}`, background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
              <div className="mf-seg-img" style={{ position: "absolute", inset: 0, ...photoStyle(img) }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,.28), rgba(15,23,42,0) 40%)" }} />
              <span style={corner({ left: 12, top: 12, borderTopWidth: 1.5, borderLeftWidth: 1.5 })} />
              <span style={corner({ right: 12, bottom: 12, borderBottomWidth: 1.5, borderRightWidth: 1.5 })} />
              <span style={{ position: "absolute", left: 32, top: 12, fontSize: 10.5, fontWeight: 600, letterSpacing: ".18em", color: "#fff", textShadow: "0 1px 6px rgba(15,23,42,.6)" }}>0{i + 1}</span>
            </div>
            <div style={{ padding: "18px 20px 22px" }}>
              <h4 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: G, letterSpacing: "-.005em" }}>{t}</h4>
              <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.65, color: ST }}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 9. CTA */
function Cta() {
  return (
    <section id="talk" style={{ background: PG, padding: "28px 0 88px", backgroundImage: `linear-gradient(${CG}40 1px, transparent 1px), linear-gradient(90deg, ${CG}40 1px, transparent 1px)`, backgroundSize: "40px 40px" }}>
      <div className="mf-wrap">
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 26, background: G, color: "#fff", boxShadow: "0 50px 90px -50px rgba(17,24,39,.7)" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)", backgroundSize: "36px 36px", maskImage: "linear-gradient(90deg, #000, rgba(0,0,0,.25))", WebkitMaskImage: "linear-gradient(90deg, #000, rgba(0,0,0,.25))" }} />
          <div className="mf-cta-box mf-cta-row" style={{ position: "relative", padding: "60px 60px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 700 }}>
              <Eyebrow light>Let's look at your manufacturing operation</Eyebrow>
              <h2 className="mf-h2" style={{ color: "#fff", maxWidth: "18ch" }}>Turn complex products into clearer operations.</h2>
              <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.7, color: CG, maxWidth: "58ch" }}>Every manufacturer has its own products, processes and customer requirements. Start with the way your operation works today and identify where EVOQ products may support the journey from enquiry to service.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 220 }}>
              <Btn dark={false} enquiry>Talk to an expert <Ic n="arrow" s={15} c={G} w={2.2} /></Btn>
              <a href="/" className="mf-btn" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", padding: "13px 22px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: "none", color: "#fff", border: "1px solid rgba(255,255,255,.4)" }}>Explore EVOQ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ManufacturingPage() {
  return (
    <div className="mf-root" style={{ minHeight: "100vh", background: "#fff", color: TX }}>
      <MfMotion />
      <EnquiryModal />
      <style>{`
        .mf-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .mf-h1{margin:14px 0 0;font-size:60px;line-height:1.04;letter-spacing:-.03em;font-weight:600;color:${G}}
        .mf-h2{margin:0;font-size:44px;line-height:1.08;letter-spacing:-.025em;font-weight:600;color:${G}}
        .mf-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:24px;align-items:center;padding:44px 0 64px}
        .mf-hero-visual{position:relative;height:460px}
        .mf-split2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px}
        .mf-steps{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:18px}
        .mf-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
        .mf-g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}
        .mf-g5{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
        .mf-g6{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px}
        .mf-flow{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:34px}
        .mf-btn{transition:transform .2s ease,box-shadow .2s ease}
        .mf-btn:hover{transform:translateY(-2px);box-shadow:0 14px 28px -16px rgba(31,41,51,.6)}
        @keyframes mfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .mf-float{animation:mfFloat 7s ease-in-out infinite}
        @keyframes mfPop{from{opacity:.3;transform:translateY(4px)}to{opacity:1;transform:none}}
        .mf-pop{animation:mfPop .3s ease both}
        .mf-seg-img{transition:transform .5s ease}
        .mf-seg:hover .mf-seg-img{transform:scale(1.06)}
        @media (max-width:1100px){.mf-g6{grid-template-columns:repeat(3,minmax(0,1fr))}.mf-g5{grid-template-columns:repeat(3,minmax(0,1fr))}.mf-steps{grid-template-columns:repeat(4,minmax(0,1fr))}.mf-h1{font-size:50px}.mf-h2{font-size:38px}}
        @media (max-width:900px){.mf-hero,.mf-split2{grid-template-columns:1fr}.mf-g4{grid-template-columns:repeat(2,minmax(0,1fr))!important}.mf-g3{grid-template-columns:1fr}.mf-flow{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.mf-opszone{height:auto!important;display:grid;gap:14px;margin-bottom:14px}.mf-opszone>.mf-bill,.mf-opszone>.mf-n0{position:static!important;width:auto!important;height:auto!important}.mf-cfg{grid-template-columns:1fr!important}.mf-arrow{display:none}}
        @media (max-width:700px){.mf-cta-box{padding:44px 26px 48px!important}}
        @media (max-width:600px){.mf-g6,.mf-g5{grid-template-columns:repeat(2,minmax(0,1fr))}.mf-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.mf-g4{grid-template-columns:1fr!important}.mf-h1{font-size:38px}.mf-h2{font-size:30px}.mf-hero-visual{height:380px}}
        @media (max-width:900px){.mf-fs{height:auto!important;display:grid}.mf-fs-p{position:static!important;width:100%!important;height:200px;clip-path:none!important}.mf-fs-card{position:static!important;width:auto!important;margin:0 0 0!important}.mf-fs-tag{display:none!important}.mf-fs .mf-wrap{order:-1;height:auto!important;padding-bottom:24px}.mf-fs-apps{grid-template-columns:repeat(2,minmax(0,1fr))!important;margin-top:24px!important}}
        @media (max-width:560px){.mf-fs-apps{grid-template-columns:1fr!important}}
        .mf-fs-dot{position:absolute;top:-4px;left:0;width:10px;height:10px;border-radius:50%;background:${BL};box-shadow:0 0 0 4px rgba(255,255,255,.85);animation:mfFsDot 2.6s ease-in-out infinite}
        @keyframes mfFsDot{0%{left:0;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:calc(100% - 10px);opacity:0}}
        .mf-rv{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--mf-d,0ms)}
        .mf-rv.mf-in{opacity:1;transform:none}
        @keyframes mfDash{to{stroke-dashoffset:-48}}
        .mf-dash{animation:mfDash 2.2s linear infinite}
        @keyframes mfStep{0%,100%{box-shadow:0 10px 20px -14px rgba(31,41,51,.5);border-color:${CG}}12%{box-shadow:0 0 0 4px ${PB},0 14px 26px -14px rgba(37,99,235,.6);border-color:${BL}}24%{box-shadow:0 10px 20px -14px rgba(31,41,51,.5);border-color:${CG}}}
        .mf-stepic{animation:mfStep 8.4s ease-in-out infinite}
        .mf-card-h{transition:transform .25s ease,box-shadow .25s ease}
        .mf-card-h:hover{transform:translateY(-5px);box-shadow:0 30px 56px -28px rgba(31,41,51,.6)}
        @media (prefers-reduced-motion:reduce){.mf-fs-dot,.mf-float,.mf-pop,.mf-dash,.mf-stepic,.mf-an,.mf-an svg,.mf-cf{animation:none!important}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${PG}` }}>
        <Topbar darkCTA={false} light ctaColor={G} />
      </div>
      <Hero />
      <Lifecycle />
      <SolutionsTabs />
      <ConfigX />
      <Segments />
      <Cta />
      <Footer background={G} />
    </div>
  );
}
