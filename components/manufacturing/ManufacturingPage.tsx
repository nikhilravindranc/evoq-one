import type { CSSProperties, ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { ConfigXWindow } from "./ConfigX";
import { MfMotion } from "./MfMotion";

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
  technician: U("1610259998914-d1b9afe0dc55", 900),
  coordinator: U("1766066014237-00645c74e9c6", 900),
  robots: U("1647427060118-4911c9821b82", 800),
  excavator: U("1649807533255-bbc9c9fb7d77", 800),
  kitchen: U("1742192757416-27d69a5d5029", 800),
  profiles: U("1738966523829-5d3c195abce3", 800),
  cleanroom: U("1748000970909-845f4aa144d2", 800),
  cnc: U("1740209475472-aa7d280f7452", 800),
  plant: U("1717386255767-52643970d483", 1800),
};

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
function Btn({ children, dark = true, href = "#" }: { children: ReactNode; dark?: boolean; href?: string }) {
  return (
    <a href={href} className="mf-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 22px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: "none", background: dark ? G : "#fff", color: dark ? "#fff" : G, border: dark ? `1px solid ${G}` : `1px solid ${CG}` }}>{children}</a>
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
              <Btn href="#talk">Talk to an expert <Ic n="arrow" s={15} c="#fff" w={2.2} /></Btn>
              <Btn dark={false} href="#segments">Explore manufacturing solutions</Btn>
            </div>
          </div>
          <div className="mf-hero-visual">
            <div style={{ position: "absolute", right: 0, top: 16, width: "78%", height: "88%", borderRadius: 14, ...photoStyle(IMG.hero), boxShadow: "0 40px 80px -40px rgba(31,41,51,.6)" }} />
            <div className="mf-float" style={{ position: "absolute", left: "30%", top: "30%", width: "44%", aspectRatio: "4 / 3", borderRadius: 14, border: "4px solid #fff", boxShadow: "0 30px 60px -24px rgba(31,41,51,.7)", ...photoStyle(IMG.motor) }} />
            <Card style={{ position: "absolute", left: "2%", top: 8, width: 230, padding: 14 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: G }}>Industrial Control Unit</div>
              {[["Configuration", "11 options"], ["Material", "Aluminium"], ["Status", "Ready for quote"], ["Price (Estimated)", "₹4,800"]].map(([a, b]) => (
                <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "6px 0", borderBottom: `1px solid ${PG}`, color: SL }}><span>{a}</span><b style={{ color: G }}>{b}</b></div>
              ))}
            </Card>
            <Card style={{ position: "absolute", left: "8%", bottom: 6, width: 210, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontWeight: 700, color: G }}>Configuration<span style={{ color: SL, fontWeight: 500 }}>01 / 04</span></div>
              {[["Housing", "Aluminium"], ["Motor", "High torque"], ["Mounting", "Base mount"]].map(([a, b]) => (
                <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, padding: "6px 8px", marginTop: 6, borderRadius: 6, border: `1px solid ${CG}`, color: SL }}>{a}<b style={{ color: G }}>{b}</b></div>
              ))}
            </Card>
            <div style={{ position: "absolute", right: "4%", bottom: 6, display: "flex", gap: 6 }}>
              {[0, 1, 2, 3].map((n) => (
                <span key={n} style={{ width: 58, height: 46, borderRadius: 8, background: n === 0 ? PB : "#fff", border: `1px solid ${n === 0 ? BL : CG}`, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 6 }}><span style={{ width: "100%", height: "100%", borderRadius: 5, display: "block", ...photoStyle([IMG.motor, IMG.cnc, IMG.robots, IMG.profiles][n]) }} /></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Lifecycle */
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
        <svg aria-hidden="true" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 280" style={{ position: "absolute", inset: 0 }} fill="none"><path className="mf-dash" d="M40 200 C 200 120, 330 200, 480 150 S 780 110, 960 170" stroke="#fff" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" opacity=".9" /></svg>
        <Chip icon="chat" title="Customer enquiry" sub="Industrial equipment" style={{ left: "5%", top: 70 }} />
        <Chip icon="doc" title="Quote" sub="₹4,820" style={{ left: "26%", top: 120 }} />
        <Chip icon="cart" title="Order #4021" sub="Confirmed" style={{ left: "43%", top: 60 }} />
        <Chip icon="box" title="In stock" sub="12 units" style={{ left: "58%", top: 140 }} />
        <Chip icon="truck" title="Out for delivery" style={{ left: "72%", top: 70 }} />
        <Chip icon="wrench" title="Service visit" sub="Scheduled" style={{ left: "84%", top: 150 }} />
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
    <Sec bg="#fff" pad="88px 0 72px">
      <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <Eyebrow>Commercial operations</Eyebrow>
        <h2 className="mf-h2">Keep the order moving</h2>
        <p style={{ margin: "18px auto 0", fontSize: 15.5, lineHeight: 1.7, color: ST }}>Winning the order is only the beginning. Customer information, pricing, stock and delivery all need to move with the sale. The less information gets lost between these steps, the easier it is to keep the order on track.</p>
      </div>
      <div style={{ position: "relative", marginTop: 44, minHeight: 540 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, borderRadius: 14, ...photoStyle(IMG.warehouse, { backgroundPosition: "center 60%" }), maskImage: "linear-gradient(180deg, transparent, #000 45%)", WebkitMaskImage: "linear-gradient(180deg, transparent, #000 45%)" }} />
        <Card style={{ position: "absolute", left: 0, top: 0, width: 230, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: SL, display: "flex", alignItems: "center", gap: 6 }}><Ic n="users" s={14} />CRM</div>
          <div style={{ marginTop: 8, fontSize: 10.5, color: SL }}>Customers and opportunities</div>
          <div style={{ marginTop: 8, padding: 8, borderRadius: 8, background: PG, fontSize: 11.5, fontWeight: 700, color: G }}>ABC Industries<span style={{ display: "block", fontSize: 10, fontWeight: 500, color: SL }}>Industrial equipment · Opportunity</span></div>
        </Card>
        <Card style={{ position: "absolute", right: 0, top: 0, width: 230, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: SL, display: "flex", alignItems: "center", gap: 6 }}><Ic n="doc" s={14} />Billing</div>
          <div style={{ marginTop: 8, fontSize: 10.5, color: SL }}>Quotes, invoices and payments</div>
          {[["Invoice #INV-4871", "Paid"], ["Amount", "₹4,820"], ["Payment term", "Net 30"], ["Due date", "Nov 28, 2026"]].map(([a, b]) => (
            <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, padding: "5px 0", color: SL, borderBottom: `1px solid ${PG}` }}><span>{a}</span><b style={{ color: G }}>{b}</b></div>
          ))}
        </Card>
        <div className="mf-flow" style={{ position: "relative", top: 150 }}>
          {nodes.map(([ic, t, d], i) => (
            <div key={t} style={{ animationDelay: `${i * 0.35}s`, position: "relative", background: "#fff", borderRadius: 10, border: `1px solid ${i === 3 ? BL : CG}`, boxShadow: i === 3 ? `0 0 0 4px ${PB}, 0 20px 40px -22px rgba(37,99,235,.6)` : "0 14px 30px -20px rgba(31,41,51,.5)", padding: "12px 10px", textAlign: "center" }}>
              <Ic n={ic} s={20} c={i === 3 ? BL : G} />
              <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 700, color: G }}>{t}</div>
              <div style={{ fontSize: 10, color: SL, marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
        <div className="mf-g3" style={{ position: "absolute", left: "8%", right: "8%", bottom: 10 }}>
          {[["box", "Inventory", "Products and availability"], ["layers", "Projects", "Delivery and project coordination"], ["wrench", "ServiceOps", "Service and maintenance"]].map(([ic, t, d]) => (
            <Card key={t} style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 34, height: 34, borderRadius: 8, background: PG, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n={ic} s={17} c={G} /></span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: G }}>{t}<span style={{ display: "block", fontSize: 10.5, fontWeight: 500, color: SL }}>{d}</span></span>
            </Card>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 5. Factory to field */
function Field() {
  const apps = [["layers", "Projects", "Plan and coordinate delivery and installation."], ["wrench", "ServiceOps", "Manage service visits, maintenance and repairs."], ["box", "Inventory", "Track products, spare parts and stock availability."], ["headset", "Desk", "Support customers with questions and service requests."]];
  return (
    <Sec bg={PG} grid id="field">
      <div className="mf-split2" style={{ alignItems: "center", gap: 48 }}>
        <div>
          <Eyebrow>From factory to field</Eyebrow>
          <h2 className="mf-h2">The product keeps moving</h2>
          <p style={{ margin: "22px 0 0", fontSize: 15.5, lineHeight: 1.7, color: ST, maxWidth: "46ch" }}>Delivery is not always the end of the relationship. Installation, commissioning, maintenance, service visits, spare parts and customer support can continue long after the original order.</p>
          <div style={{ marginTop: 28 }}><Btn href="#talk">Explore service and delivery <Ic n="arrow" s={15} c="#fff" w={2.2} /></Btn></div>
        </div>
        <div style={{ position: "relative", height: 420 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, ...photoStyle(IMG.delivery), boxShadow: "0 40px 80px -40px rgba(31,41,51,.6)" }} />
          <Card style={{ position: "absolute", right: 16, top: 16, width: 190, padding: 12 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: G, display: "flex", gap: 8, alignItems: "center" }}><Ic n="wrench" s={15} />Field service</div>
            <div style={{ fontSize: 10.5, color: SL, marginTop: 6, lineHeight: 1.6 }}>Installation<br />Maintenance<br />Ongoing support</div>
          </Card>
          <Card style={{ position: "absolute", left: 16, bottom: 16, width: 200, padding: 12 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: G, display: "flex", gap: 8, alignItems: "center" }}><Ic n="truck" s={15} />Delivery</div>
            <div style={{ fontSize: 10.5, color: SL, marginTop: 6, lineHeight: 1.6 }}>Shipment · Tracking<br />Delivery · Out for delivery</div>
          </Card>
          <Card style={{ position: "absolute", left: 16, top: 16, width: 170, padding: 12 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: G, display: "flex", gap: 8, alignItems: "center" }}><Ic n="cog" s={15} />Factory</div>
            <div style={{ fontSize: 10.5, color: SL, marginTop: 6, lineHeight: 1.6 }}>Production · Quality<br />Ready for delivery</div>
          </Card>
        </div>
      </div>
      <div className="mf-g4" style={{ marginTop: 44 }}>
        {apps.map(([ic, t, d]) => (
          <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ width: 38, height: 38, borderRadius: 9, background: "#fff", border: `1px solid ${CG}`, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic n={ic} s={18} c={G} /></span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: G }}>{t}<span style={{ display: "block", fontSize: 12, fontWeight: 400, color: SL, lineHeight: 1.5, marginTop: 2 }}>{d}</span></span>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 6. People */
function People() {
  const roles = [
    { img: IMG.manager, pos: "center 30%", role: "Operations manager", ic: "users", chip: ["Production plan", "On track"], pts: ["Production and delivery planning", "Team coordination", "Visibility across orders, inventory and service"] },
    { img: IMG.technician, pos: "center 30%", role: "Field technician", ic: "wrench", chip: ["Service visit", "Completed"], pts: ["Service visits and maintenance", "Access to product and customer information", "Parts and warranty support"] },
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
        <a href="#" style={{ fontSize: 13, fontWeight: 600, color: BL, textDecoration: "none" }}>View all industries →</a>
      </div>
      <div className="mf-g6">
        {segs.map(([t, d, img, pos]) => (
          <a key={t} href="#" className="mf-seg" style={{ position: "relative", display: "block", height: 210, borderRadius: 12, overflow: "hidden", border: `1px solid ${CG}`, textDecoration: "none" }}>
            <div className="mf-seg-img" style={{ position: "absolute", inset: 0, ...photoStyle(img, { backgroundPosition: pos }) }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,41,51,0) 35%, rgba(31,41,51,.82))" }} />
            <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, color: "#fff" }}>
              <b style={{ display: "block", fontSize: 13.5, lineHeight: 1.25 }}>{t}</b>
              <span style={{ display: "block", fontSize: 10.5, opacity: 0.8, marginTop: 3, lineHeight: 1.35 }}>{d}</span>
            </div>
            <span style={{ position: "absolute", right: 10, top: 10, width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,.92)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n="arrow" s={13} c={G} w={2.2} /></span>
          </a>
        ))}
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 8. Applications */
function Apps() {
  const main = [
    ["/evoq-ai/apps/crm.png", "CRM", "Customers, opportunities and quotes", "users"],
    ["/evoq-ai/apps/billing.png", "Billing", "Quotes, invoices and payments", "doc"],
    ["/evoq-ai/apps/inventory.png", "Inventory", "Products, stock and availability", "box"],
    ["/evoq-ai/apps/projects.png", "Projects", "Delivery, installation and implementation", "layers"],
    ["/evoq-ai/apps/serviceops.png", "ServiceOps", "Service, maintenance and field operations", "wrench"],
  ] as const;
  const sup = [["/evoq-ai/apps/desk.png", "Desk", "Customer support and service requests"], ["/logos/hrms.png", "HRMS", "People, attendance and workforce management"], ["/logos/skillberry.png", "Skillberry", "Training and skills development"], ["/evoq-ai/apps/sync.png", "Sync", "Integrations and data synchronization"]];
  return (
    <Sec bg="#fff" pad="76px 0">
      <div className="mf-split2" style={{ alignItems: "end", marginBottom: 32 }}>
        <div><Eyebrow>EVOQ applications</Eyebrow><h2 className="mf-h2" style={{ fontSize: 34 }}>The applications behind the operation</h2></div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: ST }}>From customer relationships and quoting to inventory, delivery and service, EVOQ brings together the manufacturing teams need to manage the work around the product.</p>
      </div>
      <div className="mf-g5">
        {main.map(([img, t, d, ic]) => (
          <Card key={t} cls="mf-card-h" style={{ padding: 16, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`EVOQ ${t}`} height={26} style={{ height: 26, width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 11.5, color: SL, lineHeight: 1.5, minHeight: 34 }}>{d}</p>
            <div style={{ margin: "12px 0", height: 78, borderRadius: 8, background: PG, padding: 8, display: "grid", gap: 5, alignContent: "center" }}>
              {[70, 100, 55].map((w, i) => <span key={i} style={{ display: "block", height: 8, width: `${w}%`, borderRadius: 4, background: i === 0 ? CG : "#fff", border: `1px solid ${CG}` }} />)}
            </div>
            <a href="#" style={{ fontSize: 12, fontWeight: 600, color: BL, textDecoration: "none", marginTop: "auto" }}>Explore →</a>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 20, border: `1px solid ${CG}`, borderRadius: 12, background: PG, padding: "16px 20px", display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12.5, color: G, fontWeight: 700, minWidth: 150 }}>Supporting applications<span style={{ display: "block", fontSize: 10.5, fontWeight: 400, color: SL }}>Additional applications that support the operation.</span></div>
        {sup.map(([img, t, d]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 180px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`EVOQ ${t}`} height={22} style={{ height: t === "HRMS" || t === "Skillberry" ? 34 : 22, width: "auto", objectFit: "contain", flexShrink: 0, ...(t === "HRMS" || t === "Skillberry" ? { background: G, padding: "6px 10px", borderRadius: 8 } : {}) }} />
            <span style={{ fontSize: 10.5, color: SL, lineHeight: 1.4 }}>{d}</span>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ 9. CTA */
function Cta() {
  return (
    <section id="talk" style={{ position: "relative", overflow: "hidden", background: G, color: "#fff", padding: "84px 0" }}>
      <div style={{ position: "absolute", inset: 0, ...photoStyle(IMG.plant, { opacity: 0.55 }) }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${G} 28%, rgba(31,41,51,.25))` }} />
      <div className="mf-wrap" style={{ position: "relative" }}>
        <Eyebrow light>Let's look at your manufacturing operation</Eyebrow>
        <h2 className="mf-h2" style={{ color: "#fff", maxWidth: "16ch" }}>Turn complex products into simpler operations.</h2>
        <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.7, color: CG, maxWidth: "50ch" }}>Every manufacturer has its own products, processes and customer journey. Start with the way your operation works today. Find where EVOQ can support the journey from enquiry to service.</p>
        <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn dark={false} href="/contact">Talk to an expert <Ic n="arrow" s={15} c={G} w={2.2} /></Btn>
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
        .mf-flow{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:14px;max-width:880px;margin:0 auto}
        .mf-btn{transition:transform .2s ease,box-shadow .2s ease}
        .mf-btn:hover{transform:translateY(-2px);box-shadow:0 14px 28px -16px rgba(31,41,51,.6)}
        @keyframes mfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .mf-float{animation:mfFloat 7s ease-in-out infinite}
        @keyframes mfPop{from{opacity:.3;transform:translateY(4px)}to{opacity:1;transform:none}}
        .mf-pop{animation:mfPop .3s ease both}
        .mf-seg-img{transition:transform .5s ease}
        .mf-seg:hover .mf-seg-img{transform:scale(1.06)}
        @media (max-width:1100px){.mf-g6{grid-template-columns:repeat(3,minmax(0,1fr))}.mf-g5{grid-template-columns:repeat(3,minmax(0,1fr))}.mf-steps{grid-template-columns:repeat(4,minmax(0,1fr))}.mf-h1{font-size:50px}.mf-h2{font-size:38px}}
        @media (max-width:900px){.mf-hero,.mf-split2{grid-template-columns:1fr}.mf-g4{grid-template-columns:repeat(2,minmax(0,1fr))!important}.mf-g3{grid-template-columns:1fr}.mf-flow{grid-template-columns:repeat(3,minmax(0,1fr))}.mf-cfg{grid-template-columns:1fr!important}.mf-arrow{display:none}}
        @media (max-width:600px){.mf-g6,.mf-g5{grid-template-columns:repeat(2,minmax(0,1fr))}.mf-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.mf-g4{grid-template-columns:1fr!important}.mf-h1{font-size:38px}.mf-h2{font-size:30px}.mf-hero-visual{height:380px}}
        .mf-rv{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--mf-d,0ms)}
        .mf-rv.mf-in{opacity:1;transform:none}
        @keyframes mfDash{to{stroke-dashoffset:-48}}
        .mf-dash{animation:mfDash 2.2s linear infinite}
        @keyframes mfStep{0%,100%{box-shadow:0 10px 20px -14px rgba(31,41,51,.5);border-color:${CG}}12%{box-shadow:0 0 0 4px ${PB},0 14px 26px -14px rgba(37,99,235,.6);border-color:${BL}}24%{box-shadow:0 10px 20px -14px rgba(31,41,51,.5);border-color:${CG}}}
        .mf-stepic{animation:mfStep 8.4s ease-in-out infinite}
        @keyframes mfNode{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        .mf-flow>*{animation:mfNode 5s ease-in-out infinite}
        .mf-card-h{transition:transform .25s ease,box-shadow .25s ease}
        .mf-card-h:hover{transform:translateY(-5px);box-shadow:0 30px 56px -28px rgba(31,41,51,.6)}
        @media (prefers-reduced-motion:reduce){.mf-float,.mf-pop,.mf-dash,.mf-stepic,.mf-flow>*{animation:none}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${PG}` }}>
        <Topbar darkCTA={false} light ctaColor={G} />
      </div>
      <Hero />
      <Lifecycle />
      <ConfigX />
      <Operations />
      <Field />
      <People />
      <Segments />
      <Apps />
      <Cta />
      <Footer background={BL} />
    </div>
  );
}
