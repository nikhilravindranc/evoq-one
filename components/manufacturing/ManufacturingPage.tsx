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

const STEP = 12.5;
const NB = `border-color:${CG};box-shadow:0 14px 30px -20px rgba(31,41,51,.5)`;
const NA = `border-color:${BL};box-shadow:0 0 0 4px ${PB},0 20px 40px -22px rgba(37,99,235,.6)`;
const CB = `border-color:${CG};box-shadow:0 24px 50px -28px rgba(31,41,51,.45)`;
const FLOWCSS = (() => {
  let c = ".mf-opszone{position:relative;height:186px}.mf-fn{position:relative;background:#fff;border-radius:10px;border:1px solid " + CG + ";box-shadow:0 14px 30px -20px rgba(31,41,51,.5);padding:12px 10px;text-align:center}";
  c += ".mf-vl{position:absolute;top:126px;bottom:0;width:2px}.mf-vl-l{left:calc((100% - 170px)/12 - 1px)}.mf-vl-r{right:calc((100% - 170px)/12 - 1px)}";
  c += `.mf-vline{position:absolute;inset:0;background:repeating-linear-gradient(180deg,${CG} 0 5px,transparent 5px 9px)}`;
  c += `.mf-vhead{position:absolute;left:-4px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent}.mf-vhead-d{bottom:-2px;border-top:8px solid ${BL}}.mf-vhead-u{top:-2px;border-bottom:8px solid ${BL}}`;
  c += `.mf-vdot{position:absolute;left:-4px;top:0;width:10px;height:10px;border-radius:50%;background:${BL};box-shadow:0 0 0 4px ${PB};opacity:0}`;
  c += `.mf-vlab{position:absolute;top:50%;margin-top:-8px;font-size:10.5px;font-weight:700;color:${BL};white-space:nowrap}`;
  c += `.mf-fc{position:absolute;left:100%;top:50%;width:34px;height:2px;margin-top:-1px}.mf-cf{position:absolute;left:0;top:0;width:calc(100% - 6px);height:2px;background:${BL};transform:scaleX(0);transform-origin:left}`;
  c += `.mf-fc:before{content:"";position:absolute;left:0;top:0;width:calc(100% - 6px);height:2px;background:repeating-linear-gradient(90deg,${CG} 0 4px,transparent 4px 7px)}`;
  c += `.mf-fh{position:absolute;right:-1px;top:-4px;width:0;height:0;border-left:8px solid ${CG};border-top:5px solid transparent;border-bottom:5px solid transparent}.mf-fhb{border-left-color:${BL};opacity:0}`;
  for (let k = 0; k <= 7; k++) {
    const sp = k * STEP, a = sp + 1, b = Math.min(sp + 10, 97), r = Math.min(sp + 13, 99.5);
    const base = k === 0 || k === 7 ? CB : NB;
    c += `@keyframes mfA${k}{0%,${sp}%{${base}}${a}%,${b}%{${NA}}${r}%,100%{${base}}}`;
    c += `.mf-n${k}{animation:mfA${k} 11.2s linear infinite}`;
    if (k >= 1 && k <= 6) {
      c += `@keyframes mfI${k}{0%,${sp}%{stroke:${G}}${a}%,${b}%{stroke:${BL}}${r}%,100%{stroke:${G}}}.mf-n${k} svg{animation:mfI${k} 11.2s linear infinite}`;
    }
    if (k >= 1 && k <= 5) {
      const f0 = sp + 6, f1 = sp + 12;
      c += `@keyframes mfF${k}{0%,${f0}%{transform:scaleX(0)}${f1}%,96%{transform:scaleX(1)}99%,100%{transform:scaleX(0)}}`;
      c += `@keyframes mfH${k}{0%,${f0 + 4}%{opacity:0}${f1}%,96%{opacity:1}99%,100%{opacity:0}}`;
    }
  }
  c += ".mf-cf,.mf-fhb{animation-duration:11.2s;animation-timing-function:linear;animation-iteration-count:infinite}";
  c += "@keyframes mfV0{0%{opacity:0;transform:translateY(0)}1%{opacity:1;transform:translateY(0)}10%{opacity:1;transform:translateY(50px)}11%,100%{opacity:0;transform:translateY(50px)}}";
  c += `@keyframes mfV7{0%,${7 * STEP}%{opacity:0;transform:translateY(50px)}${7 * STEP + 1}%{opacity:1;transform:translateY(50px)}${7 * STEP + 10}%{opacity:1;transform:translateY(0)}${7 * STEP + 11}%,100%{opacity:0;transform:translateY(0)}}`;
  c += ".mf-vd0{animation:mfV0 11.2s linear infinite}.mf-vd7{animation:mfV7 11.2s linear infinite}";
  return c;
})();

const ICONS: Record<string, ReactNode> = {
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
            <Eyebrow>Manufacturing</Eyebrow>
            <h1 className="mf-h1">From product enquiry to the field</h1>
            <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.7, color: ST, maxWidth: "46ch" }}>Manufacturing does not stop at the factory. Manage the commercial and operational work that surrounds your products, from complex configuration and quoting to delivery and service.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn enquiry>Talk to an expert <Ic n="arrow" s={15} c="#fff" w={2.2} /></Btn>
              <Btn dark={false} href="#segments">Explore manufacturing solutions</Btn>
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
/* The dashed route is drawn through the centre of every chip, so the line meets each touchpoint (x in %, y in px of a 1000 x 280 frame). */
const LIFE_CHIPS = [
  { icon: "chat", title: "Customer enquiry", sub: "Industrial equipment", x: 9, y: 90 },
  { icon: "doc", title: "Quote", sub: "₹4,820", x: 26, y: 160 },
  { icon: "cart", title: "Order #4021", sub: "Confirmed", x: 42, y: 85 },
  { icon: "box", title: "In stock", sub: "12 units", x: 58, y: 165 },
  { icon: "truck", title: "Out for delivery", sub: undefined, x: 74, y: 90 },
  { icon: "wrench", title: "Service visit", sub: "Scheduled", x: 90, y: 170 },
];
const LIFE_PATH = (() => {
  const pts = LIFE_CHIPS.map((c) => [c.x * 10, c.y]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }
  return d;
})();

function Lifecycle() {
  const steps = [["chat", "Enquiry", "Customer requirement"], ["cog", "Configure", "Product options"], ["doc", "Quote", "Price and specification"], ["cart", "Order", "Confirmed requirement"], ["box", "Inventory", "Products and availability"], ["truck", "Delivery", "Project and fulfilment"], ["wrench", "Service", "Installation, maintenance and support"]];
  return (
    <Sec bg="#fff" pad="40px 0 72px">
      <Eyebrow>The manufacturing lifecycle</Eyebrow>
      <div className="mf-split2" style={{ alignItems: "end" }}>
        <h2 className="mf-h2">One product. <span style={{ color: SL, fontWeight: 400 }}>A longer journey.</span></h2>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: ST, maxWidth: "58ch" }}>A manufactured product passes through many hands before and after it reaches the customer. An enquiry becomes a configuration. A configuration becomes a quote. A quote becomes an order. From there, availability, delivery and service take over. EVOQ brings that journey into one view.</p>
      </div>
      <div className="mf-steps" style={{ marginTop: 36 }}>
        {steps.map(([ic, t, d], i) => (
          <div key={t} style={{ position: "relative" }}>
            <div style={{ fontSize: 10.5, color: LS, marginBottom: 8, letterSpacing: ".1em" }}>0{i + 1}</div>
            <span className="mf-stepic" style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${CG}`, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", animationDelay: `${i * 1.2}s` }}><Ic n={ic} s={20} c={G} /></span>
            <div style={{ marginTop: 12, fontSize: 14.5, fontWeight: 700, color: G }}>{t}</div>
            <div style={{ marginTop: 2, fontSize: 11.5, color: SL, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", marginTop: 28, height: 280, borderRadius: 14, overflow: "hidden", border: `1px solid ${CG}` }}>
        <div style={{ position: "absolute", inset: 0, ...photoStyle(IMG.floor, { backgroundPosition: "center 55%" }) }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,.35), rgba(15,23,42,.05) 60%)" }} />
        <svg aria-hidden="true" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 280" style={{ position: "absolute", inset: 0 }} fill="none"><path className="mf-dash" d={LIFE_PATH} stroke="#fff" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" opacity=".9" /></svg>
        {LIFE_CHIPS.map((c) => (
          <div key={c.title} style={{ position: "absolute", left: `${c.x}%`, top: c.y, width: "max-content", transform: "translate(-50%, -50%)" }}>
            <Chip icon={c.icon} title={c.title} sub={c.sub} style={{ position: "relative" }} />
          </div>
        ))}
      </div>
      <div className="mf-g4" style={{ marginTop: 28, gridTemplateColumns: "1.5fr 1fr 1fr 1fr", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 70, height: 56, borderRadius: 8, border: `1px solid ${CG}`, flexShrink: 0, ...photoStyle(IMG.motor) }} />
          <div><b style={{ display: "block", fontSize: 14, color: G }}>The product is the constant.</b><span style={{ fontSize: 12.5, color: SL }}>The work around it keeps moving.</span></div>
        </div>
        {[["arrow", "From first enquiry", "to final service"], ["layers", "Information stays", "with the product"], ["users", "Multiple teams", "across the lifecycle"]].map(([ic, a, b]) => (
          <div key={a} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12.5, color: ST, lineHeight: 1.35 }}><Ic n={ic} s={20} c={SL} />{a}<br />{b}</div>
        ))}
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 3. ConfigX */
function ConfigX() {
  const steps = [["cog", "1. Configure", "Select product options and apply your rules."], ["eye", "2. Visualize", "See an accurate 2D or 3D representation."], ["tag", "3. Price", "Apply configuration-based pricing."], ["doc", "4. Quote", "Create a customer-ready quotation."]];
  return (
    <Sec bg={PG} grid id="configx">
      <div className="mf-split2" style={{ alignItems: "center", gap: 48 }}>
        <div>
          <Eyebrow>Complex product sales</Eyebrow>
          <h2 className="mf-h2">Make complexity <span style={{ color: LS, fontWeight: 400 }}>easier to sell</span></h2>
          <p style={{ margin: "22px 0 0", fontSize: 15.5, lineHeight: 1.7, color: ST, maxWidth: "46ch" }}>Some products cannot be sold from a standard catalog. Options, specifications and pricing rules all need to be right. Give sales teams a clearer way to configure the product, see what they are selling, set the right price and prepare the quote.</p>
          <div style={{ marginTop: 28 }}><Btn href="#talk">Explore ConfigX <Ic n="arrow" s={15} c="#fff" w={2.2} /></Btn></div>
        </div>
        <ConfigXWindow />
      </div>
      <div className="mf-g4" style={{ marginTop: 48 }}>
        {steps.map(([ic, t, d], i) => (
          <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12, position: "relative" }}>
            <span style={{ width: 38, height: 38, borderRadius: 9, background: "#fff", border: `1px solid ${CG}`, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic n={ic} s={18} c={i === 0 ? BL : G} /></span>
            <div style={{ flex: 1 }}><b style={{ display: "block", fontSize: 13.5, color: G }}>{t}</b><span style={{ fontSize: 12, color: SL, lineHeight: 1.5 }}>{d}</span></div>
            {i < 3 && <span aria-hidden="true" className="mf-arrow" style={{ position: "absolute", right: -10, top: 8 }}><Ic n="arrow" s={16} c={LS} /></span>}
          </div>
        ))}
      </div>
      <p style={{ margin: "30px 0 0", fontSize: 12.5, color: SL }}>From furniture and modular products to industrial equipment and engineered products, the selling experience can reflect the product itself.</p>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 4. Commercial operations */
function Operations() {
  const nodes = [["users", "Customer", "Account and requirement"], ["layers", "Opportunity", "Deal and pipeline"], ["doc", "Quote", "Price and specification"], ["cart", "Order", "Confirmed requirement"], ["box", "Availability", "Stock and allocation"], ["truck", "Fulfilment", "Delivery and shipment"]];
  return (
    <Sec bg="#fff" pad="64px 0 56px">
      <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <Eyebrow>Commercial operations</Eyebrow>
        <h2 className="mf-h2">Keep the order moving</h2>
        <p style={{ margin: "18px auto 0", fontSize: 15.5, lineHeight: 1.7, color: ST }}>Winning the order is only the beginning. Customer information, pricing, stock and delivery all need to move with the sale. The less information gets lost between these steps, the easier it is to keep the order on track.</p>
      </div>
      <div style={{ position: "relative", marginTop: 30 }}>
        <div style={{ position: "relative", maxWidth: 960, margin: "0 auto" }}>
          <div className="mf-opszone">
            <Card cls="mf-an mf-n0" style={{ position: "absolute", left: 0, top: 0, width: 230, height: 126, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: SL, display: "flex", alignItems: "center", gap: 6 }}><Ic n="users" s={14} />CRM</div>
              <div style={{ marginTop: 8, padding: 8, borderRadius: 8, background: PG, fontSize: 11.5, fontWeight: 700, color: G }}>ABC Industries<span style={{ display: "block", fontSize: 10, fontWeight: 500, color: SL }}>Industrial equipment · Opportunity</span></div>
              <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, color: BL }}><Dots />Deal won · starts the order</div>
            </Card>
            <Card cls="mf-an mf-n7 mf-bill" style={{ position: "absolute", right: 0, top: 0, width: 230, height: 126, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: SL, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><Ic n="doc" s={14} />Billing</div>
              {[["Invoice #INV-4871", "Paid"], ["Amount", "₹4,820"], ["Due date", "Nov 28, 2026"]].map(([a, b]) => (
                <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, padding: "5px 0", color: SL, borderBottom: `1px solid ${PG}` }}><span>{a}</span><b style={{ color: G }}>{b}</b></div>
              ))}
            </Card>
            <div className="mf-arrow mf-vl mf-vl-l"><i className="mf-vline" /><i className="mf-vhead mf-vhead-d" /><i className="mf-an mf-vdot mf-vd0" /><span className="mf-vlab" style={{ left: 14 }}>Opportunity won</span></div>
            <div className="mf-arrow mf-vl mf-vl-r"><i className="mf-vline" /><i className="mf-vhead mf-vhead-u" /><i className="mf-an mf-vdot mf-vd7" /><span className="mf-vlab" style={{ right: 14 }}>Invoice raised</span></div>
          </div>
          <div className="mf-flow">
            {nodes.map(([ic, t, d], i) => (
              <div key={t} className={`mf-an mf-n${i + 1} mf-fn`}>
                <Ic n={ic} s={20} c={G} />
                <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 700, color: G }}>{t}</div>
                <div style={{ fontSize: 10, color: SL, marginTop: 2 }}>{d}</div>
                {i < 5 && <span className="mf-arrow mf-fc"><i className="mf-an mf-cf" style={{ animationName: `mfF${i + 1}` }} /><b className="mf-fh" /><b className="mf-an mf-fh mf-fhb" style={{ animationName: `mfH${i + 1}` }} /></span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: LS }}>Also connected</span>
          {[["box", "Inventory", "Products and availability"], ["layers", "Projects", "Delivery and coordination"], ["wrench", "ServiceOps", "Service and maintenance"]].map(([ic, t, d]) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px 7px 8px", borderRadius: 99, border: `1px solid ${CG}`, background: "#fff", fontSize: 12.5, fontWeight: 700, color: G }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: PG, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n={ic} s={14} c={G} /></span>{t}<span style={{ fontWeight: 400, color: SL }}>{d}</span>
            </span>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 5. Factory to field */
function Field() {
  const apps = [
    ["/evoq-ai/apps/projects.png", "Projects", "Plan and coordinate delivery and installation."],
    ["/evoq-ai/apps/serviceops.png", "ServiceOps", "Manage service visits, maintenance and repairs."],
    ["/evoq-ai/apps/inventory.png", "Inventory", "Track products, spare parts and stock availability."],
    ["/evoq-ai/apps/desk.png", "Desk", "Support customers with questions and service requests."],
  ];
  const tag = { position: "absolute", background: "#fff", borderRadius: 10, border: `1px solid ${CG}`, boxShadow: "0 18px 36px -20px rgba(31,41,51,.55)", padding: "9px 13px", display: "flex", alignItems: "center", gap: 10 } as CSSProperties;
  return (
    <section id="field" style={{ background: "#fff", position: "relative" }}>
      <div className="mf-fs" style={{ position: "relative", overflow: "hidden", height: 540 }}>
        <div className="mf-fs-p mf-fs-a" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "62%", ...photoStyle(IMG.factoryMan, { backgroundPosition: "center 55%" }) }} />
        <div className="mf-fs-p mf-fs-b" style={{ position: "absolute", left: "46%", top: 0, bottom: 0, width: "33%", clipPath: "polygon(16% 0, 100% 0, 84% 100%, 0 100%)", ...photoStyle(IMG.truck) }} />
        <div className="mf-fs-p mf-fs-c" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "30%", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)", ...photoStyle(IMG.techTablet, { backgroundPosition: "62% center" }) }} />

        <div className="mf-wrap" style={{ position: "relative", height: "100%" }}>
          <div className="mf-fs-card" style={{ position: "absolute", left: 24, top: 36, width: 590, padding: "28px 30px 30px", borderRadius: 18, background: "rgba(255,255,255,.93)", backdropFilter: "blur(10px)", boxShadow: "0 30px 60px -30px rgba(15,23,42,.55)", border: "1px solid rgba(255,255,255,.7)" }}>
            <Eyebrow>From factory to field</Eyebrow>
            <h2 className="mf-h2">The product keeps moving</h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: ST }}>Delivery is not always the end of the relationship. Installation, commissioning, maintenance, service visits, spare parts and customer support can continue long after the original order.</p>
            <div style={{ marginTop: 22 }}><Btn enquiry>Connect with an expert <Ic n="arrow" s={15} c="#fff" w={2.2} /></Btn></div>
          </div>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: "linear-gradient(180deg, rgba(15,23,42,0), rgba(15,23,42,.55))", pointerEvents: "none" }} />
        {[["01", "Factory", { left: "4%" }], ["02", "Delivery", { left: "56%" }], ["03", "Field service", { right: "4%" }]].map(([n, t, pos]) => (
          <div key={t as string} className="mf-fs-tag" style={{ position: "absolute", bottom: 64, color: "#fff", display: "flex", alignItems: "baseline", gap: 9, textShadow: "0 2px 12px rgba(15,23,42,.7)", ...(pos as CSSProperties) }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", opacity: 0.8 }}>{n as string}</span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: ".02em", paddingBottom: 3, borderBottom: "1.5px solid rgba(255,255,255,.7)" }}>{t as string}</span>
          </div>
        ))}
      </div>

      <div className="mf-wrap">
        <div className="mf-fs-apps" style={{ position: "relative", marginTop: -44, background: "#fff", borderRadius: 14, border: `1px solid ${CG}`, boxShadow: "0 30px 60px -36px rgba(31,41,51,.5)", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
          {apps.map(([img, t, d], i) => (
            <div key={t} style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 9, borderLeft: i ? `1px solid ${PG}` : 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`EVOQ ${t}`} height={24} style={{ height: 24, width: "auto", objectFit: "contain", alignSelf: "flex-start" }} />
              <span style={{ fontSize: 12.5, lineHeight: 1.5, color: SL }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 56 }} />
    </section>
  );
}

/* ------------------------------------------------------------------ 6. People */
function People() {
  const roles = [
    { img: IMG.manager, pos: "center 30%", role: "Operations manager", ic: "users", chip: ["Production plan", "On track"], pts: ["Production and delivery planning", "Team coordination", "Visibility across orders, inventory and service"] },
    { img: IMG.technician, pos: "center 42%", role: "Field technician", ic: "wrench", chip: ["Service visit", "Completed"], pts: ["Service visits and maintenance", "Access to product and customer information", "Parts and warranty support"] },
    { img: IMG.coordinator, pos: "center 30%", role: "Service coordinator", ic: "headset", chip: ["Open requests", "12"], pts: ["Schedule and dispatch service visits", "Track ongoing requests", "Keep customers informed"] },
  ];
  return (
    <Sec bg="#fff" pad="80px 0">
      <div className="mf-split2" style={{ alignItems: "end", marginBottom: 36 }}>
        <div><Eyebrow>People behind production</Eyebrow><h2 className="mf-h2">The operation runs on people</h2></div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: ST }}>Sales, operations, service and support all depend on people having the right information, skills and assistance they need to do their best work. Give those teams the systems they need without taking the focus away from the work itself.</p>
      </div>
      <div className="mf-g3">
        {roles.map((r) => (
          <div key={r.role}>
            <div style={{ position: "relative", height: 280, borderRadius: 12, overflow: "hidden", border: `1px solid ${CG}` }}>
              <div style={{ position: "absolute", inset: 0, ...photoStyle(r.img, { backgroundPosition: r.pos }) }} />
              <Card style={{ position: "absolute", right: 12, top: 12, padding: "8px 12px", width: 150 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: G }}>{r.chip[0]}</div>
                <div style={{ fontSize: 10.5, color: BL, fontWeight: 600, marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}><Dots />{r.chip[1]}</div>
              </Card>
            </div>
            <Card style={{ marginTop: -26, marginLeft: 14, marginRight: 14, position: "relative", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, fontWeight: 700, color: G }}><span style={{ width: 32, height: 32, borderRadius: 8, background: PG, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n={r.ic} s={17} c={G} /></span>{r.role}</div>
              <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 7 }}>
                {r.pts.map((t) => <li key={t} style={{ display: "flex", gap: 8, fontSize: 12, color: ST, lineHeight: 1.4 }}><Ic n="check" s={13} c={BL} w={2.6} />{t}</li>)}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 7. Segments */
function Segments() {
  const segs: [string, string, string, string][] = [
    ["Industrial manufacturing", "Machinery, components and production systems", IMG.robots, "center"],
    ["Equipment manufacturers", "Configurable and heavy equipment", IMG.excavator, "center"],
    ["Furniture & modular products", "Kitchen, storage and custom interiors", IMG.kitchen, "center"],
    ["Building products", "Doors, windows, facades and materials", IMG.profiles, "center"],
    ["Medical devices", "Regulated and configurable devices", IMG.cleanroom, "center"],
    ["Other configurable products", "Specialized and custom products", IMG.cnc, "center"],
  ];
  return (
    <Sec bg={PG} id="segments" pad="76px 0">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
        <div>
          <Eyebrow>Manufacturing segments</Eyebrow>
          <h2 className="mf-h2" style={{ fontSize: 34 }}>Different products. Different operating models.</h2>
          <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.7, color: ST, maxWidth: "70ch" }}>Manufacturing looks different across industries. A configurable furniture product, an industrial machine and a medical device can follow very different paths from enquiry to service. EVOQ adapts to the commercial and operational work around the products you make.</p>
        </div>
      </div>
      <div className="mf-g6">
        {segs.map(([t, d, img, pos]) => (
          <div key={t} className="mf-seg" style={{ position: "relative", display: "block", height: 210, borderRadius: 12, overflow: "hidden", border: `1px solid ${CG}` }}>
            <div className="mf-seg-img" style={{ position: "absolute", inset: 0, ...photoStyle(img, { backgroundPosition: pos }) }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,41,51,0) 35%, rgba(31,41,51,.82))" }} />
            <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, color: "#fff" }}>
              <b style={{ display: "block", fontSize: 13.5, lineHeight: 1.25 }}>{t}</b>
              <span style={{ display: "block", fontSize: 10.5, opacity: 0.8, marginTop: 3, lineHeight: 1.35 }}>{d}</span>
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
    <section id="talk" style={{ position: "relative", overflow: "hidden", background: "#1D4ED8", color: "#fff", padding: "84px 0" }}>
      <div style={{ position: "absolute", inset: 0, ...photoStyle(IMG.plant, { opacity: 0.4, mixBlendMode: "luminosity" }) }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, #1D4ED8 30%, rgba(29,78,216,.55))` }} />
      <div className="mf-wrap" style={{ position: "relative" }}>
        <Eyebrow light>Let's look at your manufacturing operation</Eyebrow>
        <h2 className="mf-h2" style={{ color: "#fff", maxWidth: "16ch" }}>Turn complex products into simpler operations.</h2>
        <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.7, color: "#DBEAFE", maxWidth: "50ch" }}>Every manufacturer has its own products, processes and customer journey. Start with the way your operation works today. Find where EVOQ can support the journey from enquiry to service.</p>
        <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn dark={false} enquiry>Talk to an expert <Ic n="arrow" s={15} c={G} w={2.2} /></Btn>
          <a href="/" className="mf-btn" style={{ display: "inline-flex", alignItems: "center", padding: "13px 22px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: "none", color: "#fff", border: "1px solid rgba(255,255,255,.4)" }}>Explore EVOQ</a>
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
        ${FLOWCSS}
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
      <Operations />
      <Field />
      <People />
      <Segments />
      <Cta />
      <Footer background={G} />
    </div>
  );
}
