"use client";

/* Feature sections for the Billing features page. Each section uses a different layout (bento,
   tabbed showcase, pipeline, hub, band, switch, timeline) so the page does not repeat
   "text left, image right". Inline styles + a small scoped <style> keep it independent of the
   scoped Billing stylesheet. */
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const D = "#0e342c";
const P = "var(--ac)";
const TINT = "var(--tint)";
const ACD = "var(--acd)";
const ACL = "var(--acl)";
const THEMES: Record<string, Record<string, string>> = {
  green: { "--ac": "#00ab88", "--acd": ACD, "--tint": TINT, "--acl": ACL },
  violet: { "--ac": "#6a54d6", "--acd": "#4a3bb0", "--tint": "#e6e2fb", "--acl": "#c9c1ff" },
  sky: { "--ac": "#2f8fc8", "--acd": "#1f6a9a", "--tint": "#d9effc", "--acl": "#8fd0f5" },
  indigo: { "--ac": "#14a8b8", "--acd": "#0b7482", "--tint": "#d2f1f5", "--acl": "#7fdbe6" },
  amber: { "--ac": "#d79a00", "--acd": "#8a6500", "--tint": "#fdf0c4", "--acl": "#fbe881" },
  coral: { "--ac": "#e9736b", "--acd": "#b8433a", "--tint": "#fde2df", "--acl": "#f6a8a1" },
  orange: { "--ac": "#f08a3c", "--acd": "#b35a14", "--tint": "#ffe6d0", "--acl": "#ffc590" },
  forest2: { "--ac": "#00ab88", "--acd": "#04795f", "--tint": "#d4f1e6", "--acl": "#6fe3c0" },
  forest: { "--ac": "#00ab88", "--acd": ACL, "--tint": "rgba(255,255,255,.14)", "--acl": ACL },
};
const M = "rgba(14, 52, 44, 0.62)";
const SOFT = "0 24px 48px -28px rgba(14, 52, 44, 0.35)";

const ICONS: Record<string, ReactNode> = {
  doc: <><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>,
  tag: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.4" /></>,
  box: <><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
  barcode: <><path d="M4 5v14M8 5v14M12 5v14M16 5v14M20 5v14" /></>,
  card: <><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M8 17v-5M13 17V8M18 17v-9" /></>,
  percent: <><path d="M19 5 5 19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21a7 7 0 0 1 14 0M17 4a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6.3" /></>,
  coins: <><circle cx="9" cy="9" r="6" /><path d="M15.5 6.4A6 6 0 1 1 9 20" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 12 10 5 10-5M2 17l10 5 10-5" /></>,
  receipt: <><path d="M4 3h16v18l-3-2-3 2-3-2-3 2-4-2z" /><path d="M8 8h8M8 12h8" /></>,
  undo: <><path d="M3 7v6h6" /><path d="M3 13a9 9 0 1 0 3-7.7" /></>,
  split: <><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></>,
  plug: <><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z" /><path d="M12 18v4" /></>,
  note: <><path d="M4 4h16v12l-6 6H4z" /><path d="M14 22v-6h6" /></>,
};

function Icon({ name, size = 20, color = "currentColor", sw = 2 }: { name: string; size?: number; color?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ stroke: color }} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function IconTile({ name, bg = TINT, color = P, size = 44 }: { name: string; bg?: string; color?: string; size?: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: size * 0.3, background: bg, color, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={name} size={size * 0.47} />
    </span>
  );
}

function Styles() {
  return (
    <style>{`
      .fx-wrap{max-width:1240px;margin:0 auto;padding:0 20px}
      .fx-h2{font-size:38px;font-weight:600;line-height:1.12;letter-spacing:-.02em;margin:0}
      .fx-bento{display:grid;gap:18px;grid-template-columns:repeat(4,minmax(0,1fr))}
      .fx-g2{display:grid;gap:18px;grid-template-columns:repeat(2,minmax(0,1fr))}
      .fx-g3{display:grid;gap:18px;grid-template-columns:repeat(3,minmax(0,1fr))}
      .fx-g4{display:grid;gap:16px;grid-template-columns:repeat(4,minmax(0,1fr))}
      .fx-g5{display:grid;gap:14px;grid-template-columns:repeat(5,minmax(0,1fr))}
      .fx-hub{display:grid;gap:28px;grid-template-columns:minmax(0,1fr) minmax(0,420px) minmax(0,1fr);align-items:center}
      .fx-split{display:grid;gap:40px;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:center;gap:56px}
      .fx-split-visual{height:416px;width:368px;max-width:100%;margin-left:auto}
      .fx-scale{transform:scale(.8)}
      .fx-nav::-webkit-scrollbar{display:none}
      .fx-nav{scrollbar-width:none}
      .fx-lift{transition:transform .25s ease,box-shadow .25s ease}
      .fx-lift:hover{transform:translateY(-4px)}
      .fx-press{transition:transform .15s ease,background .25s ease,color .25s ease,box-shadow .25s ease}
      .fx-press:active{transform:scale(.97)}
      @keyframes fxDash{to{stroke-dashoffset:-24}}
      @keyframes fxPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,171,136,.5)}50%{box-shadow:0 0 0 9px rgba(0,171,136,0)}}
      @keyframes fxFill{from{width:0}to{width:100%}}
      @keyframes fxRise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      .fx-rise{animation:fxRise .4s ease both}
      @media (max-width:1180px){.fx-split-visual{width:322px;height:364px}.fx-scale{transform:scale(.7)}}
      @media (max-width:1023px){
        .fx-split{grid-template-columns:1fr}
        .fx-split-visual{margin:0 auto}
        .fx-bento{grid-template-columns:repeat(2,minmax(0,1fr))}
        .fx-g4{grid-template-columns:repeat(2,minmax(0,1fr))}
        .fx-g5{grid-template-columns:repeat(3,minmax(0,1fr))}
        .fx-g3{grid-template-columns:repeat(2,minmax(0,1fr))}
        .fx-hub{grid-template-columns:1fr}
        .fx-span2{grid-column:span 2!important}
        .fx-h2{font-size:32px}
      }
      @media (max-width:640px){
        .fx-bento,.fx-g2,.fx-g3,.fx-g4{grid-template-columns:1fr}
        .fx-g5{grid-template-columns:repeat(2,minmax(0,1fr))}
        .fx-span2{grid-column:span 1!important}
        .fx-h2{font-size:28px}
        .fx-split-visual{width:276px;height:312px}.fx-scale{transform:scale(.6)}
      }
      @media (prefers-reduced-motion:reduce){.fx-rise{animation:none}}
    `}</style>
  );
}

function Header({ eyebrow, title, lead, dark = false }: { eyebrow: string; title: string; lead: string; dark?: boolean }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto 48px" }}>
      <p style={{ display: "inline-flex", alignItems: "center", gap: 12, margin: "0 0 18px", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: dark ? ACL : P }}>
        {eyebrow}
        <span style={{ width: 44, height: 2, borderRadius: 9, background: dark ? ACL : P }} />
      </p>
      <h2 className="fx-h2" style={{ color: dark ? "#fff" : D }}>{title}</h2>
      <p style={{ margin: "18px auto 0", fontSize: 17, lineHeight: 1.7, color: dark ? "rgba(255,255,255,.72)" : M, maxWidth: "60ch" }}>{lead}</p>
    </div>
  );
}

function Section({ bg, children, id, theme = "green" }: { bg: string; children: ReactNode; id?: string; theme?: string }) {
  return (
    <section id={id} style={{ ...(THEMES[theme] as CSSProperties), background: bg, padding: "84px 0", position: "relative", overflow: "hidden", scrollMarginTop: 108 }}>
      <div className="fx-wrap">{children}</div>
    </section>
  );
}

const card: CSSProperties = { background: "#fff", borderRadius: 26, padding: 24, boxShadow: SOFT, border: "1px solid rgba(14,52,44,.05)" };

/* ================================================================ 1. Catalog: boxed split with product window */
type Prod = { n: string; d: string; sku: string; price: number; kind: "Products" | "Services"; img: string; unit: string };
const PRODUCTS: Prod[] = [
  { n: "Chai Brew Concentrate", d: "250 ml glass bottle", sku: "SK-100", price: 850, kind: "Products", img: "/billing/products/chai-brew.jpg", unit: "per bottle" },
  { n: "Rooibos Tea Tin", d: "Loose-leaf, 100 g", sku: "SK-101", price: 620, kind: "Products", img: "/billing/products/tea-tin.jpg", unit: "per tin" },
  { n: "Roasted Coffee Beans", d: "Single origin, 250 g", sku: "SK-102", price: 780, kind: "Products", img: "/billing/products/coffee-beans.jpg", unit: "per bag" },
  { n: "Consultation", d: "Initial planning session", sku: "CONS-001", price: 1500, kind: "Services", img: "/billing/products/consultation.jpg", unit: "per hour" },
];
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function Catalog() {
  const [hover] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const idxOn = (x: Prod) => hover === x.sku;
  const lines = PRODUCTS.filter((x) => cart.includes(x.sku));
  const total = lines.reduce((a, x) => a + x.price, 0);
  const feats: [string, string][] = [["box", "Products & services"], ["doc", "Product descriptions"], ["barcode", "Product codes / SKUs"], ["tag", "Selling prices"], ["percent", "Tax settings"], ["layers", "Units of measure"], ["check", "Product status"], ["users", "Customer-specific pricing"]];
  const toggleSku = (sku: string) => setCart((c) => (c.includes(sku) ? c.filter((x) => x !== sku) : [...c, sku]));
  return (
    <Section id="catalog" theme="green" bg="linear-gradient(180deg, #f3f8f6 0%, #eaf4ef 100%)">
      <div style={{ background: "linear-gradient(160deg, #ffffff 0%, #f6fbf9 100%)", borderRadius: 36, border: "1.5px solid rgba(0,171,136,.22)", boxShadow: "0 50px 100px -50px rgba(14,52,44,.45), 0 0 0 6px rgba(255,255,255,.7)", padding: "56px 48px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", right: -120, top: -80, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(170,224,200,.55), rgba(170,224,200,0) 70%)" }} />
        <div className="fx-split" style={{ position: "relative" }}>
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: 12, margin: "0 0 18px", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: P }}>Product catalog<span style={{ width: 44, height: 2, borderRadius: 9, background: P }} /></p>
            <h2 className="fx-h2" style={{ color: D }}>Keep your products and services ready to bill.</h2>
            <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.7, color: M, maxWidth: "46ch" }}>Create a simple catalog of the products and services you sell, with the information needed to build accurate quotes and invoices.</p>
            <div className="fx-g2" style={{ marginTop: 32, gap: "14px 24px" }}>
              {feats.map(([ic, t]) => (
                <div key={t} className="fx-lift" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, fontWeight: 600, color: D }}>
                  <IconTile name={ic} size={42} />{t}
                </div>
              ))}
            </div>
          </div>
          <div className="fx-split-visual">
            <div className="fx-scale" style={{ position: "relative", width: 460, height: 520, transformOrigin: "top left" }}>
              <div aria-hidden="true" style={{ position: "absolute", left: 24, top: 6, width: 436, height: 500, borderRadius: 56, background: "linear-gradient(135deg, #bfeedb, #e6f6ef)", transform: "rotate(2deg)" }} />
              <div style={{ position: "absolute", left: 0, top: 22, width: 440, height: 480, borderRadius: 26, background: "#fff", boxShadow: "0 44px 90px -40px rgba(14,52,44,.55)", overflow: "hidden", padding: "20px 20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 19, fontWeight: 700, color: D }}>Products &amp; services</span>
                  <span style={{ fontSize: 11.5, color: M }}>{PRODUCTS.length} items</span>
                </div>
                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                  {PRODUCTS.map((x, n) => {
                    const on = idxOn(x);
                    const added = cart.includes(x.sku);
                    return (
                      <div key={x.sku} role="button" tabIndex={0} onClick={() => toggleSku(x.sku)} onKeyDown={(e) => { if (e.key === "Enter") toggleSku(x.sku); }} aria-pressed={added} className="fx-rise fx-lift" style={{ animationDelay: `${n * 0.06}s`, cursor: "pointer", borderRadius: 18, background: "#fff", boxShadow: added ? `0 0 0 2px ${P}, 0 18px 30px -18px rgba(0,171,136,.6)` : "0 0 0 1px rgba(14,52,44,.08), 0 14px 26px -22px rgba(14,52,44,.45)", overflow: "hidden", position: "relative" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={x.img} alt={x.n} width={200} height={96} style={{ width: "100%", height: 96, objectFit: "cover", display: "block", transform: on ? "scale(1.04)" : "none" }} />
                        <span style={{ position: "absolute", right: 8, top: 8, width: 28, height: 28, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, lineHeight: 1, background: added ? P : "rgba(255,255,255,.92)", color: added ? "#fff" : D, boxShadow: "0 6px 14px -6px rgba(0,0,0,.4)", transition: "background .2s" }}>{added ? "✓" : "+"}</span>
                        <div style={{ padding: "10px 12px 12px" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: D, lineHeight: 1.25 }}>{x.n}</div>
                          <div style={{ marginTop: 2, fontSize: 10.5, color: M }}>{x.kind === "Services" ? "Service" : "Product"} · {x.unit}</div>
                          <b style={{ display: "block", marginTop: 6, fontSize: 16, color: D }}>{inr(x.price)}</b>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 12, textAlign: "center", fontSize: 11, color: M }}>Tap an item to add it to an invoice</div>
                {/* draft invoice bar */}
                <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, borderRadius: 16, background: D, color: "#fff", padding: "11px 14px", display: "flex", alignItems: "center", gap: 12, transform: lines.length ? "translateY(0)" : "translateY(90px)", opacity: lines.length ? 1 : 0, transition: "transform .4s cubic-bezier(.2,.8,.2,1), opacity .3s", boxShadow: "0 22px 40px -18px rgba(14,52,44,.7)" }}>
                  <span style={{ display: "flex" }}>
                    {lines.slice(0, 4).map((x, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={x.sku} src={x.img} alt="" width={28} height={28} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", marginLeft: i ? -9 : 0, boxShadow: `0 0 0 2px ${D}` }} />
                    ))}
                  </span>
                  <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600 }}>
                    Invoice · {lines.length} item{lines.length === 1 ? "" : "s"}
                    <span style={{ display: "block", fontSize: 10.5, fontWeight: 500, opacity: 0.7 }}>incl. 18% GST</span>
                  </span>
                  <span key={total} className="fx-rise" style={{ fontSize: 17, fontWeight: 700 }}>{inr(Math.round(total * 1.18))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================ shared boxed layout (same as Product catalog) */
function FeatBox({ eyebrow, title, lead, feats, children, border }: { eyebrow: string; title: string; lead: string; feats: [string, string][]; children: ReactNode; border: string }) {
  return (
    <div style={{ background: "linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,.82) 100%)", borderRadius: 36, border: `1.5px solid ${border}`, boxShadow: "0 50px 100px -50px rgba(14,52,44,.4), 0 0 0 6px rgba(255,255,255,.7)", padding: "56px 48px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: -120, top: -80, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--ac) 22%, transparent), transparent 70%)" }} />
      <div className="fx-split" style={{ position: "relative" }}>
        <div>
          <p style={{ display: "inline-flex", alignItems: "center", gap: 12, margin: "0 0 18px", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: ACD }}>{eyebrow}<span style={{ width: 44, height: 2, borderRadius: 9, background: P }} /></p>
          <h2 className="fx-h2" style={{ color: D }}>{title}</h2>
          <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.7, color: M, maxWidth: "46ch" }}>{lead}</p>
          <div className="fx-g2" style={{ marginTop: 32, gap: "14px 24px" }}>
            {feats.map(([ic, t]) => (
              <div key={t} className="fx-lift" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, fontWeight: 600, color: D }}>
                <IconTile name={ic} size={42} />{t}
              </div>
            ))}
          </div>
        </div>
        <div className="fx-split-visual">
          <div className="fx-scale" style={{ position: "relative", width: 460, height: 520, transformOrigin: "top left" }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 24, top: 6, width: 436, height: 500, borderRadius: 56, background: "linear-gradient(135deg, color-mix(in srgb, var(--ac) 28%, white), color-mix(in srgb, var(--tint) 60%, white))", transform: "rotate(2deg)" }} />
            <div style={{ position: "absolute", left: 0, top: 22, width: 440, height: 480, borderRadius: 26, background: "#fff", boxShadow: "0 44px 90px -40px rgba(14,52,44,.55)", overflow: "hidden", padding: 22, display: "flex", flexDirection: "column" }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WinTitle({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <span style={{ fontSize: 19, fontWeight: 700, color: D }}>{title}</span>
      {right}
    </div>
  );
}

function Seg({ opts, val, set }: { opts: string[]; val: number; set: (n: number) => void }) {
  return (
    <span style={{ display: "inline-flex", padding: 3, borderRadius: 99, background: "color-mix(in srgb, var(--tint) 70%, white)" }}>
      {opts.map((o, n) => (
        <button key={o} type="button" className="fx-press" onClick={() => set(n)} aria-pressed={val === n} style={{ fontFamily: "inherit", cursor: "pointer", border: 0, padding: "7px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700, background: val === n ? "#fff" : "transparent", color: val === n ? D : M, boxShadow: val === n ? "0 6px 14px -8px rgba(14,52,44,.4)" : "none" }}>{o}</button>
      ))}
    </span>
  );
}

const rowBtn = (on: boolean): CSSProperties => ({ fontFamily: "inherit", cursor: "pointer", textAlign: "left", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderRadius: 16, border: on ? `2px solid ${P}` : "2px solid transparent", background: on ? "color-mix(in srgb, var(--tint) 40%, white)" : "#f5f7f6" });

/* ---------------- Subscription */
function Subscription() {
  const [yearly, setYearly] = useState(0);
  const [plan, setPlan] = useState(1);
  const [stage, setStage] = useState(2);
  const plans = [["Starter", 490], ["Pro", 1290], ["Scale", 2990]] as const;
  const stages = [["Signup", "users", "Subscribed Jan 4"], ["Trial", "clock", "14-day trial"], ["Active", "refresh", "Billed every cycle"], ["Renewal", "check", "Renews Feb 18"], ["Ends", "undo", "Cancelled or expired"]] as const;
  const price = (m: number) => (yearly ? Math.round(m * 12 * 0.8) : m);
  const feats: [string, string][] = [["layers", "Subscription plans"], ["users", "Customer subscriptions"], ["refresh", "Recurring billing"], ["clock", "Billing frequency"], ["doc", "Subscription start & end dates"], ["bolt", "Trial periods"], ["check", "Subscription renewals"], ["chart", "Subscription status"], ["split", "Plan changes"], ["undo", "Cancellation & expiry"], ["receipt", "Subscription history"]];
  return (
    <Section id="subscription" theme="violet" bg="linear-gradient(180deg, #f7f4ff 0%, #ece7fb 100%)">
      <FeatBox border="rgba(106,84,214,.28)" eyebrow="Subscription" title="Manage recurring customer relationships from signup to renewal." lead="Create subscription plans, assign customers, and let recurring billing run automatically based on the terms of each subscription." feats={feats}>
        <WinTitle title="Subscription plans" right={<Seg opts={["Monthly", "Yearly"]} val={yearly} set={setYearly} />} />
        <div style={{ display: "grid", gap: 10 }}>
          {plans.map(([n, m], i) => (
            <button key={n} type="button" className="fx-press" onClick={() => setPlan(i)} aria-pressed={plan === i} style={rowBtn(plan === i)}>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: D }}>{n}{plan === i && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 99, background: P, color: "#fff" }}>Selected</span>}</span>
              <span style={{ textAlign: "right" }}><b style={{ fontSize: 18, color: D }}>{inr(price(m))}</b><span style={{ display: "block", fontSize: 10.5, color: M }}>{yearly ? "per year · save 20%" : "per month"}</span></span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 18, fontSize: 12.5, fontWeight: 700, color: D }}>Subscription lifecycle</div>
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 22, right: 22, top: 17, height: 2, background: "rgba(14,52,44,.1)" }} />
          {stages.map(([k, ic], n) => (
            <button key={k} type="button" className="fx-press" onClick={() => setStage(n)} aria-pressed={stage === n} style={{ position: "relative", fontFamily: "inherit", cursor: "pointer", border: 0, background: "none", padding: 0, textAlign: "center", width: 62 }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", background: n <= stage ? P : "#fff", color: n <= stage ? "#fff" : M, boxShadow: n <= stage ? "none" : "inset 0 0 0 2px rgba(14,52,44,.14)", transition: "background .3s" }}><Icon name={ic} size={16} /></span>
              <span style={{ display: "block", marginTop: 6, fontSize: 11, fontWeight: stage === n ? 700 : 500, color: stage === n ? D : M }}>{k}</span>
            </button>
          ))}
        </div>
        <div key={stage} className="fx-rise" style={{ marginTop: 14, padding: "12px 14px", borderRadius: 14, background: "color-mix(in srgb, var(--tint) 50%, white)", fontSize: 12.5, color: D }}><b>Northwind Ltd · {plans[plan][0]}</b> — {stages[stage][2]}</div>
      </FeatBox>
    </Section>
  );
}

/* ================================================================ Quick jump */
const NAV = [["catalog", "Product catalog"], ["subscription", "Subscription"], ["billing", "Billing"], ["invoicing", "Invoicing"], ["payments", "Payments"], ["outstanding", "Outstanding"], ["taxes", "Taxes & compliance"], ["automation", "Automation"]];
function QuickNav() {
  const [active, setActive] = useState("catalog");
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let cur = NAV[0][0];
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 220) cur = id;
      });
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div style={{ position: "sticky", top: 52, zIndex: 40, background: "rgba(255,255,255,.88)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(14,52,44,.08)" }}>
      <nav aria-label="Feature sections" className="fx-wrap fx-nav" style={{ display: "flex", gap: 6, overflowX: "auto", padding: "10px 20px" }}>
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", `#${id}`); }} aria-current={active === id ? "true" : undefined} className="fx-press" style={{ flexShrink: 0, textDecoration: "none", fontSize: 13.5, fontWeight: 700, padding: "9px 16px", borderRadius: 99, background: active === id ? D : "transparent", color: active === id ? "#fff" : M, transition: "background .25s, color .25s" }}>{label}</a>
        ))}
      </nav>
    </div>
  );
}

/* ---------------- Billing models */
function Models() {
  const tabs = [
    { k: "One-time", icon: "receipt", rows: [["Website Redesign", "₹42,000"], ["Tax (5%)", "₹2,100"]], foot: "Due in 14 days" },
    { k: "Recurring", icon: "refresh", rows: [["Standard plan", "₹490"], ["Next bill", "Oct 1"]], foot: "Auto-renews" },
    { k: "Usage-based", icon: "chart", rows: [["2,450 API calls", "₹110"], ["Base fee", "₹49"]], foot: "Estimated ₹159" },
    { k: "Seat & quantity", icon: "users", rows: [["12 seats × ₹25", "₹300"], ["+3 added", "₹75"]], foot: "Prorated" },
    { k: "Progress & milestone", icon: "clock", rows: [["Design approved", "40%"], ["Launch", "60%"]], foot: "2 of 5 billed" },
  ];
  const [i, setI] = useState(0);
  const [cur, setCur] = useState(0);
  const curs = ["₹", "$", "€"];
  const feats: [string, string][] = [["receipt", "One-time billing"], ["refresh", "Recurring billing"], ["chart", "Usage-based billing"], ["users", "Seat & quantity-based billing"], ["clock", "Progress & milestone billing"], ["layers", "Centralized pricing"], ["globe", "Multi-currency"]];
  const t = tabs[i];
  const conv = [1, 0.012, 0.011][cur];
  const money = (s: string) => (cur === 0 || !s.startsWith("₹") ? s : curs[cur] + Math.round(Number(s.replace(/[₹,]/g, "")) * conv).toLocaleString());
  return (
    <Section id="billing" theme="sky" bg="linear-gradient(180deg, #f2f9fe 0%, #e1f0fa 100%)">
      <FeatBox border="rgba(47,143,200,.3)" eyebrow="Billing" title="Bill customers the way your business works." lead="Set your prices and choose how customers should be billed. Whether it's a single purchase, recurring service, usage or a project milestone, EVOQ Billing handles different billing arrangements in one place." feats={feats}>
        <WinTitle title="Billing model" right={<Seg opts={curs} val={cur} set={setCur} />} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {tabs.map((x, n) => (
            <button key={x.k} type="button" className="fx-press" onClick={() => setI(n)} aria-pressed={i === n} style={{ ...rowBtn(i === n), padding: "11px 12px", justifyContent: "flex-start", fontSize: 12.5, fontWeight: 700, color: D, gridColumn: n === 4 ? "span 2" : undefined }}>
              <Icon name={x.icon} size={16} color={P} />{x.k}
            </button>
          ))}
        </div>
        <div key={i + "-" + cur} className="fx-rise" style={{ marginTop: 16, borderRadius: 18, background: "color-mix(in srgb, var(--tint) 45%, white)", padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: M, letterSpacing: ".08em", textTransform: "uppercase" }}>Billing cycle</div>
          {t.rows.map(([a, b]) => (
            <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(14,52,44,.08)", fontSize: 13.5, color: D }}><span>{a}</span><b>{money(b)}</b></div>
          ))}
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11.5, color: M }}>Centralized pricing · {curs[cur]}</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 99, background: "#fff", color: ACD }}>{t.foot}</span>
          </div>
        </div>
      </FeatBox>
    </Section>
  );
}

/* ---------------- Invoicing */
function Invoicing() {
  const [done, setDone] = useState(false);
  const [rec, setRec] = useState(true);
  const feats: [string, string][] = [["note", "Quotes"], ["doc", "Invoices"], ["refresh", "Recurring invoices"], ["undo", "Credit & debit notes"], ["layers", "Invoice templates"], ["coins", "Billable charges"]];
  return (
    <Section id="invoicing" theme="indigo" bg="linear-gradient(180deg, #f0fbfc 0%, #d9f1f4 100%)">
      <FeatBox border="rgba(20,168,184,.38)" eyebrow="Invoicing" title="Create accurate invoices without starting from scratch." lead="Turn products, services, completed work or approved quotes into invoices. Keep billing documents organized and automate invoices that repeat." feats={feats}>
        <WinTitle title={done ? "Invoice INV-1048" : "Quote Q-0098"} right={<span key={String(done)} className="fx-rise" style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 99, background: done ? "#d4f1e6" : "#fdf0c4", color: done ? "#04795f" : "#8a6500" }}>{done ? "Sent" : "Approved"}</span>} />
        <div style={{ borderRadius: 18, background: "#f6f6fb", padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: M }}><span>Customer</span><b style={{ color: D }}>Acme Industries</b></div>
          {[["Website Redesign", "₹40,000"], ["Hosting setup", "₹2,000"], ["GST (18%)", "₹7,560"]].map(([a, b]) => (
            <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(14,52,44,.08)", fontSize: 13, color: D }}><span>{a}</span><span>{b}</span></div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, fontSize: 17, fontWeight: 700, color: D }}><span>Total</span><span>₹49,560</span></div>
        </div>
        <button type="button" className="fx-press" onClick={() => setDone((v) => !v)} style={{ marginTop: 14, fontFamily: "inherit", cursor: "pointer", border: 0, borderRadius: 14, padding: "13px 0", fontSize: 13.5, fontWeight: 700, color: "#fff", background: done ? "#1d7a46" : "#0b4a54" }}>
          {done ? "✓ Converted · tap to reset" : "Convert quote to invoice →"}
        </button>
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 14, background: "#f6f6fb" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: D }}><Icon name="refresh" size={16} color={P} />Recurring invoice</span>
          <button type="button" role="switch" aria-checked={rec} aria-label="Recurring invoice" onClick={() => setRec((v) => !v)} style={{ width: 44, height: 26, borderRadius: 99, border: 0, cursor: "pointer", background: rec ? P : "#cfd6d4", position: "relative", transition: "background .25s" }}>
            <span style={{ position: "absolute", top: 3, left: rec ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 2px 6px rgba(0,0,0,.25)" }} />
          </button>
        </div>
      </FeatBox>
    </Section>
  );
}

/* ---------------- Payments */
function Payments() {
  const [m, setM] = useState(0);
  const [paid, setPaid] = useState(false);
  const methods = [["card", "Card"], ["link", "Payment link"], ["coins", "Bank transfer"]];
  const feats: [string, string][] = [["card", "Payment gateways"], ["link", "Payment links"], ["check", "Payment recording"], ["split", "Partial payments"], ["receipt", "Receipts"], ["undo", "Refunds"]];
  return (
    <Section id="payments" theme="amber" bg="linear-gradient(180deg, #fffaf0 0%, #fdf2d4 100%)">
      <FeatBox border="rgba(215,154,0,.35)" eyebrow="Payments" title="Make it easy for customers to pay." lead="Give customers convenient ways to pay and keep payment activity connected to the invoice." feats={feats}>
        <WinTitle title="Pay invoice INV-1048" right={<span style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 99, background: paid ? "#d4f1e6" : "#fdf0c4", color: paid ? "#04795f" : "#8a6500" }}>{paid ? "Paid" : "Due"}</span>} />
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-.02em", color: D }}>₹4,200</div>
        <div style={{ fontSize: 12, color: M, marginBottom: 14 }}>Acme Industries · due Oct 12</div>
        <div style={{ display: "grid", gap: 8 }}>
          {methods.map(([ic, k], n) => (
            <button key={k} type="button" className="fx-press" onClick={() => { setM(n); setPaid(false); }} aria-pressed={m === n} style={{ ...rowBtn(m === n), padding: "12px 14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, fontWeight: 600, color: D }}><Icon name={ic} size={17} color={P} />{k}</span>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${m === n ? P : "#c5ceca"}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{m === n && <span style={{ width: 8, height: 8, borderRadius: "50%", background: P }} />}</span>
            </button>
          ))}
        </div>
        <button type="button" className="fx-press" onClick={() => setPaid((v) => !v)} style={{ marginTop: 14, fontFamily: "inherit", cursor: "pointer", border: 0, borderRadius: 14, padding: "13px 0", fontSize: 13.5, fontWeight: 700, color: "#fff", background: paid ? "#1d7a46" : P }}>
          {paid ? "✓ Payment recorded" : `Pay securely with ${methods[m][1].toLowerCase()}`}
        </button>
        {paid && (
          <div className="fx-rise" style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 14, background: "#f6f5ee", fontSize: 12, color: D }}>
            <Icon name="receipt" size={16} color={P} /><span>Receipt sent · <b>Refund</b> available</span>
          </div>
        )}
      </FeatBox>
    </Section>
  );
}

/* ---------------- Outstanding */
function Outstanding() {
  const [sel, setSel] = useState(0);
  const [sent, setSent] = useState(false);
  const ag = [["0–30 days", "₹65K", 72, "#00ab88"], ["31–60 days", "₹28K", 40, "#fec915"], ["60+ days", "₹12K", 20, "#e9736b"]] as const;
  const feats: [string, string][] = [["chart", "Payment tracking"], ["bell", "Payment reminders"], ["doc", "Customer statements"], ["clock", "Receivables aging"], ["users", "Customer balances"]];
  return (
    <Section id="outstanding" theme="coral" bg="linear-gradient(180deg, #fff7f5 0%, #fde6e2 100%)">
      <FeatBox border="rgba(233,115,107,.35)" eyebrow="Outstanding" title="Know what's paid, what's due and what needs attention." lead="Keep your receivables visible after invoices are sent and follow up when payments are due." feats={feats}>
        <WinTitle title="Receivables aging" right={<span style={{ fontSize: 11.5, color: M }}>Tap a bucket</span>} />
        <div style={{ display: "grid", gap: 10 }}>
          {ag.map(([l, v, w, c], n) => (
            <button key={l} type="button" className="fx-press" onClick={() => setSel(n)} aria-pressed={sel === n} style={{ ...rowBtn(sel === n), display: "block", border: sel === n ? `2px solid ${c}` : "2px solid transparent" }}>
              <span style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: D }}><span>{l}</span><span>{v}</span></span>
              <span style={{ display: "block", marginTop: 8, height: 7, borderRadius: 9, background: "rgba(14,52,44,.08)" }}><span style={{ display: "block", width: `${w}%`, height: "100%", borderRadius: 9, background: c, transition: "width .4s" }} /></span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 14, borderRadius: 18, padding: "16px 18px", background: "linear-gradient(150deg, #3a1d1b, #7a2f2a)", color: "#fff" }}>
          <div style={{ fontSize: 11.5, opacity: 0.75 }}>{ag[sel][0]} · customer balances</div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-.02em" }}>{ag[sel][1]}</div>
        </div>
        <button type="button" className="fx-press" onClick={() => setSent((v) => !v)} style={{ marginTop: 12, fontFamily: "inherit", cursor: "pointer", border: 0, borderRadius: 14, padding: "13px 0", fontSize: 13.5, fontWeight: 700, color: sent ? "#a0332a" : "#fff", background: sent ? "#fde2df" : "#e9736b", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Icon name="bell" size={16} />{sent ? "Reminders sent to 3 customers" : "Send payment reminders"}
        </button>
      </FeatBox>
    </Section>
  );
}

/* ---------------- Taxes */
function Taxes() {
  const [r, setR] = useState(0);
  const [incl, setIncl] = useState(false);
  const d = [{ label: "India GST", rate: "GST (18%)", pct: 0.18, note: "CGST 9% + SGST 9%", cur: "₹" }, { label: "UAE VAT", rate: "VAT (5%)", pct: 0.05, note: "Standard rate 5%", cur: "AED " }][r];
  const base = incl ? Math.round(11800 / (1 + d.pct)) : 10000;
  const tax = Math.round(base * d.pct);
  const feats: [string, string][] = [["percent", "Tax configuration"], ["coins", "Tax-inclusive & tax-exclusive pricing"], ["split", "Tax breakup"], ["globe", "Regional tax support"], ["receipt", "India GST"], ["receipt", "UAE VAT"]];
  return (
    <Section id="taxes" theme="orange" bg="linear-gradient(180deg, #fff8f1 0%, #ffead8 100%)">
      <FeatBox border="rgba(240,138,60,.38)" eyebrow="Taxes & compliance" title="Handle the tax details that come with every bill." lead="Apply the right tax treatment to products, services and invoices while keeping tax information clear for customers." feats={feats}>
        <WinTitle title="Tax breakup" right={<Seg opts={["India GST", "UAE VAT"]} val={r} set={setR} />} />
        <div key={r + "-" + String(incl)} className="fx-rise" style={{ borderRadius: 18, background: "#fbf7f2", padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: M, letterSpacing: ".08em", textTransform: "uppercase" }}>{d.label} · {incl ? "tax-inclusive" : "tax-exclusive"}</div>
          {[[incl ? "Price excl. tax" : "Subtotal", base], [d.rate, tax]].map(([a, b]) => (
            <div key={String(a)} style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid rgba(14,52,44,.08)", fontSize: 14.5, color: D }}><span>{a}</span><span style={{ fontWeight: 600 }}>{d.cur}{Number(b).toLocaleString()}</span></div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, fontSize: 21, fontWeight: 700, color: D }}><span>Total</span><span>{d.cur}{(base + tax).toLocaleString()}</span></div>
          <div style={{ marginTop: 8, fontSize: 11.5, color: M }}>{d.note}</div>
        </div>
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 14, background: "#fbf7f2" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: D }}>Prices include tax</span>
          <button type="button" role="switch" aria-checked={incl} aria-label="Prices include tax" onClick={() => setIncl((v) => !v)} style={{ width: 44, height: 26, borderRadius: 99, border: 0, cursor: "pointer", background: incl ? P : "#cfd6d4", position: "relative", transition: "background .25s" }}>
            <span style={{ position: "absolute", top: 3, left: incl ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 2px 6px rgba(0,0,0,.25)" }} />
          </button>
        </div>
        <div style={{ marginTop: 12, fontSize: 11.5, color: M, textAlign: "center" }}>+ regional tax rules, configured once</div>
      </FeatBox>
    </Section>
  );
}

/* ---------------- Automation */
function Automation() {
  const [on, setOn] = useState(true);
  const steps = [["clock", "Billing schedule", "Monthly · 1st of the month"], ["doc", "Invoice generated", "INV-1049 created automatically"], ["bell", "Reminder sent", "3 days before the due date"], ["check", "Payment status updated", "Marked paid when money arrives"]];
  const feats: [string, string][] = [["clock", "Billing schedules"], ["doc", "Automated invoice generation"], ["bell", "Automated reminders"], ["check", "Payment status updates"]];
  return (
    <Section id="automation" theme="forest2" bg="linear-gradient(180deg, #eefaf5 0%, #d9f1e6 100%)">
      <FeatBox border="rgba(0,171,136,.35)" eyebrow="Automation" title="Set it up once. Let Billing keep it moving." lead="Reduce repetitive billing work with automated schedules, invoices, reminders, and payment updates." feats={feats}>
        <WinTitle title="Automation" right={
          <button type="button" role="switch" aria-checked={on} aria-label="Automation" className="fx-press" onClick={() => setOn((v) => !v)} style={{ fontFamily: "inherit", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, border: 0, background: "none", fontSize: 12, fontWeight: 700, color: on ? ACD : M }}>
            {on ? "On" : "Off"}
            <span style={{ width: 44, height: 26, borderRadius: 99, background: on ? P : "#cfd6d4", position: "relative", transition: "background .25s" }}>
              <span style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s" }} />
            </span>
          </button>
        } />
        <div style={{ position: "relative", display: "grid", gap: 12 }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 21, top: 24, bottom: 24, width: 3, borderRadius: 9, background: "rgba(14,52,44,.1)" }}>
            <div style={{ width: "100%", background: P, borderRadius: 9, height: on ? "100%" : "0%", transition: "height 1.2s ease" }} />
          </div>
          {steps.map(([ic, t, d], n) => (
            <div key={t} style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, padding: "10px 12px", borderRadius: 16, background: "#f5f8f7", opacity: on ? 1 : 0.55, transition: "opacity .4s", transitionDelay: `${n * 0.1}s` }}>
              <span style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, background: on ? P : "#cfd6d4", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .4s" }}><Icon name={ic} size={18} /></span>
              <span><b style={{ display: "block", fontSize: 13.5, color: D }}>{t}</b><span style={{ fontSize: 11.5, color: M }}>{d}</span></span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, textAlign: "center", fontSize: 12, fontWeight: 700, color: on ? ACD : M }}>{on ? "Automation on · runs without you" : "Automation paused"}</div>
      </FeatBox>
    </Section>
  );
}

export function FeaturesSections() {
  return (
    <div>
      <Styles />
      <QuickNav />
      <Catalog />
      <Subscription />
      <Models />
      <Invoicing />
      <Payments />
      <Outstanding />
      <Taxes />
      <Automation />
    </div>
  );
}
