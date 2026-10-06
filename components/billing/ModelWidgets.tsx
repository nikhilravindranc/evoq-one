"use client";

/* Interactive cards for the "From what you sell to how you bill" section.
   Each billing model has its own card design plus its own set of floating cards. Styles are inline
   so the scoped Billing stylesheet cannot override them. */
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const D = "#0e342c";
const P = "#00ab88";
const M = "rgba(14, 52, 44, 0.62)";
const LIFT = "0 22px 44px -22px rgba(14, 52, 44, 0.4)";
const FONT: CSSProperties = { fontFamily: "inherit" };

const people = {
  sarah: "/billing/people/sarah.jpg",
  rohan: "/billing/people/rohan.jpg",
  priya: "/billing/people/priya.jpg",
  noah: "/billing/people/noah.jpg",
  olivia: "/billing/people/olivia.jpg",
  daniel: "/billing/people/daniel.jpg",
  james: "/billing/people/james.jpg",
  sophia: "/billing/people/sophia.jpg",
};

export function ModelStyles() {
  return (
    <style>{`
      @keyframes bmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      @keyframes bmPulse{0%,100%{box-shadow:0 0 0 0 rgba(233,115,107,.45)}50%{box-shadow:0 0 0 7px rgba(233,115,107,0)}}
      @keyframes bmPop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
      .bm-float{animation:bmFloat 6s ease-in-out infinite}
      .bm-lift{transition:transform .25s ease,box-shadow .25s ease}
      .bm-lift:hover{transform:translateY(-4px)}
      .bm-press{transition:transform .15s ease,filter .2s ease,background .25s ease}
      .bm-press:hover{filter:brightness(1.06)}
      .bm-press:active{transform:scale(.96)}
      .bm-face{transition:transform .25s ease}
      .bm-face:hover{transform:scale(1.07)}
      .bm-range{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:99px;outline:none;cursor:pointer}
      .bm-range::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #00ab88;box-shadow:0 4px 10px rgba(14,52,44,.3)}
      .bm-range::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #00ab88}
      @media (prefers-reduced-motion:reduce){.bm-float,.bm-pulse{animation:none!important}}
    `}</style>
  );
}

function Face({ src, size = 36, ring = "#fff" }: { src: string; size?: number; ring?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", boxShadow: `0 0 0 2px ${ring}`, flexShrink: 0 }} />
  );
}

/* ---------------------------------------------------------------- 1. One-time: ticket */
export function OneTimeCard() {
  const [paid, setPaid] = useState(false);
  const notch = "radial-gradient(circle at 0 148px, transparent 11px, #000 12px), radial-gradient(circle at 100% 148px, transparent 11px, #000 12px)";
  return (
    <div style={{ filter: "drop-shadow(0 24px 28px rgba(14, 52, 44, 0.25))" }}>
      <div style={{ background: "#fff", borderRadius: 22, padding: 20, WebkitMaskImage: notch, maskImage: notch, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}>
        <div style={{ height: 128 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Face src={people.sarah} size={40} ring="#d4f1e6" />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: D }}>Sarah Whitfield</div>
              <div style={{ fontSize: 11, color: M }}>Website Redesign</div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 99, transition: "all .3s", background: paid ? "rgba(0,171,136,.15)" : "rgba(254,201,21,.28)", color: paid ? "#04795f" : "#8a6500" }}>{paid ? "Paid" : "Pending"}</span>
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: M }}>Amount due</div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", color: D, lineHeight: 1.15 }}>
            $42,000<span style={{ fontSize: 18, color: M }}>.00</span>
          </div>
        </div>
        <div style={{ borderTop: "2px dashed rgba(14, 52, 44, 0.14)", marginTop: 0, paddingTop: 16 }}>
          {[["Subtotal", "$40,000.00"], ["Tax (5%)", "$2,000.00"]].map(([a, b]) => (
            <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: M, marginBottom: 6 }}>
              <span>{a}</span>
              <span style={{ color: D, fontWeight: 600 }}>{b}</span>
            </div>
          ))}
          <button type="button" className="bm-press" onClick={() => setPaid((v) => !v)} style={{ ...FONT, marginTop: 10, width: "100%", border: 0, cursor: "pointer", borderRadius: 14, padding: "12px 0", fontSize: 13, fontWeight: 700, color: paid ? "#04795f" : "#fff", background: paid ? "rgba(0,171,136,.14)" : P, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {paid ? (
              <>
                <span style={{ animation: "bmPop .4s ease both", display: "inline-flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                Paid · receipt sent (tap to undo)
              </>
            ) : (
              "Pay $42,000 now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 2. Recurring: stacked plan card + invoice timeline */
export function PlanCard() {
  const [yearly, setYearly] = useState(false);
  const months: [string, "paid" | "next" | "later"][] = [["Jan", "paid"], ["Feb", "paid"], ["Mar", "paid"], ["Apr", "next"], ["May", "later"], ["Jun", "later"]];
  const R = 38;
  const C = 2 * Math.PI * R;
  const elapsed = yearly ? 0.28 : 0.7;
  return (
    <div style={{ position: "relative", paddingBottom: 92 }}>
      <div aria-hidden="true" style={{ position: "absolute", left: 14, right: 14, top: -12, height: 120, borderRadius: 24, background: "rgba(255,255,255,.55)", transform: "rotate(-3deg)" }} />
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, padding: 18, color: "#fff", background: "linear-gradient(150deg, #2b2470 0%, #5a4bc8 100%)", boxShadow: LIFT }}>
        <span aria-hidden="true" style={{ position: "absolute", right: -40, top: -50, width: 170, height: 170, borderRadius: "50%", background: "radial-gradient(circle, rgba(190,178,255,.55), transparent 70%)" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
          <Face src={people.rohan} size={38} ring="rgba(255,255,255,.35)" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, whiteSpace: "nowrap" }}>Northwind Ltd</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Pro plan · Active</div>
          </div>
          <div style={{ display: "inline-flex", padding: 3, borderRadius: 99, background: "rgba(255,255,255,.14)" }}>
            {[false, true].map((y) => (
              <button key={String(y)} type="button" className="bm-press" onClick={() => setYearly(y)} style={{ ...FONT, border: 0, cursor: "pointer", padding: "5px 9px", borderRadius: 99, fontSize: 10, fontWeight: 700, background: yearly === y ? "#fff" : "transparent", color: yearly === y ? "#2b2470" : "rgba(255,255,255,.8)" }}>
                {y ? "Yearly" : "Monthly"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", width: 92, height: 92, flexShrink: 0 }}>
            <svg width="92" height="92" viewBox="0 0 92 92" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="46" cy="46" r={R} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="8" />
              <circle cx="46" cy="46" r={R} fill="none" stroke="#cfc7ff" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - elapsed)} style={{ transition: "stroke-dashoffset .6s ease" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{yearly ? 263 : 9}</span>
              <span style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>days to renew</span>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>{yearly ? "$4,704" : "$490"}</span>
              <span style={{ fontSize: 13, opacity: 0.7 }}>{yearly ? "/yr" : "/mo"}</span>
            </div>
            <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: yearly ? "#cfc7ff" : "rgba(255,255,255,.14)", color: yearly ? "#2b2470" : "#fff", transition: "all .3s" }}>
              {yearly ? "Save 20% · billed once" : "Renews Apr 1 · auto-pay"}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: -18, right: -22, bottom: 0, borderRadius: 20, background: "#fff", padding: "12px 14px", boxShadow: "0 22px 40px -20px rgba(14,52,44,.45)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: M, marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: D }}>Invoice timeline</span>
          <span>3 of 6 sent</span>
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          {months.map(([m, st]) => (
            <div key={m} className="bm-lift" style={{ flex: 1, textAlign: "center", borderRadius: 12, padding: "7px 0", background: st === "paid" ? "#e6e2fb" : st === "next" ? "#fdf3d0" : "#f2f5f4", boxShadow: st === "next" ? "0 0 0 2px #fec915" : "none" }}>
              <span style={{ display: "flex", justifyContent: "center", height: 16, color: st === "paid" ? "#5a4bc8" : "#b98a00" }}>
                {st === "paid" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                ) : st === "next" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                ) : (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(14,52,44,.25)", marginTop: 5 }} />
                )}
              </span>
              <span style={{ display: "block", fontSize: 10, fontWeight: 700, color: st === "later" ? M : D, marginTop: 2 }}>{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 3. Usage-based: gauge + slider */
export function UsageCard() {
  const [calls, setCalls] = useState(2450);
  const pct = calls / 5000;
  const bill = Math.round(49 + calls * 0.045);
  const R = 50;
  const C = 2 * Math.PI * R;
  const hot = pct > 0.8;
  const color = hot ? "#e9736b" : P;
  return (
    <div style={{ position: "relative", paddingBottom: 96 }}>
    <div style={{ background: "rgba(255,255,255,.95)", borderRadius: 26, padding: 20, boxShadow: LIFT }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: D }}>Usage this cycle</span>
        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "#fdf3d0", color: "#8a6500" }}>Pay-as-you-go</span>
      </div>
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(14,52,44,.08)" strokeWidth="12" />
            <circle cx="60" cy="60" r={R} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} style={{ transition: "stroke-dashoffset .4s ease, stroke .3s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: D, lineHeight: 1 }}>{Math.round(pct * 100)}%</span>
            <span style={{ fontSize: 9.5, color: M, marginTop: 3 }}>of 5,000</span>
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: M }}>Estimated bill</div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", color: D, lineHeight: 1.1 }}>${bill}</div>
          <div style={{ fontSize: 11, color: hot ? "#c2483d" : "#04795f", fontWeight: 600, marginTop: 4 }}>{calls.toLocaleString()} API calls</div>
        </div>
      </div>
      <input aria-label="Simulate API usage" className="bm-range" type="range" min={0} max={5000} step={50} value={calls} onChange={(e) => setCalls(Number(e.target.value))} style={{ marginTop: 16, background: `linear-gradient(90deg, ${color} ${pct * 100}%, rgba(14,52,44,.1) ${pct * 100}%)` }} />
      <div style={{ marginTop: 4, fontSize: 10, color: M }}>Drag to simulate usage</div>
    </div>
      <div className="bm-lift" style={{ position: "absolute", left: 26, right: -24, bottom: 0, display: "grid", gap: 9, background: "#fff", borderRadius: 20, padding: "14px 16px", boxShadow: "0 22px 40px -20px rgba(14,52,44,.45)", transform: "rotate(1.5deg)" }}>
        {[["Storage", "120 / 500 GB", 24, "#87cefa"], ["Notifications", "890 / 2,000 sent", 44.5, "#fec915"]].map(([n, v, p, c]) => (
          <div key={String(n)}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: M, marginBottom: 4 }}>
              <span>{n}</span>
              <span style={{ color: D, fontWeight: 600 }}>{v}</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: "rgba(14,52,44,.08)" }}>
              <div style={{ width: `${p}%`, height: "100%", borderRadius: 99, background: String(c) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 4. Seat-based: team constellation */
export function SeatCard() {
  const [seats, setSeats] = useState(12);
  const [off, setOff] = useState<string[]>([]);
  const team: { name: string; role: string; src: string; size: number; pos: CSSProperties }[] = [
    { name: "Priya", role: "Admin", src: people.priya, size: 92, pos: { left: -30, top: 28 } },
    { name: "Noah", role: "Finance", src: people.noah, size: 68, pos: { left: 98, top: -22 } },
    { name: "Olivia", role: "Sales", src: people.olivia, size: 84, pos: { right: -26, top: 6 } },
    { name: "Daniel", role: "Support", src: people.daniel, size: 62, pos: { left: 64, top: 128 } },
    { name: "Sophia", role: "Design", src: people.sophia, size: 70, pos: { right: 74, top: 104 } },
  ];
  const active = team.length - off.length;
  const more = Math.max(0, seats - active);
  const toggle = (n: string) => {
    const wasOff = off.includes(n);
    setOff((o) => (wasOff ? o.filter((x) => x !== n) : [...o, n]));
    setSeats((s) => Math.max(1, s + (wasOff ? 1 : -1)));
  };
  const step = (d: number) => setSeats((s) => Math.min(99, Math.max(1, s + d)));
  const btn: CSSProperties = { ...FONT, width: 30, height: 30, borderRadius: 10, border: 0, cursor: "pointer", fontSize: 18, fontWeight: 700, lineHeight: 1, color: D, background: "#eaf5f1" };
  return (
    <div style={{ position: "relative", height: 330 }}>
      <svg aria-hidden="true" width="100%" height="200" viewBox="0 0 320 200" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 40, overflow: "visible" }} fill="none">
        <path d="M30 60 C 80 110, 120 150, 160 190" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeDasharray="4 6" />
        <path d="M290 50 C 250 110, 210 150, 170 190" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeDasharray="4 6" />
      </svg>
      {team.map((t) => {
        const on = !off.includes(t.name);
        return (
          <button key={t.name} type="button" className="bm-face" onClick={() => toggle(t.name)} aria-pressed={on} aria-label={`${on ? "Remove" : "Add"} seat for ${t.name}`} style={{ ...FONT, position: "absolute", border: 0, padding: 0, background: "none", cursor: "pointer", ...t.pos }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.src} alt={t.name} width={t.size} height={t.size} style={{ display: "block", width: t.size, height: t.size, borderRadius: "50%", objectFit: "cover", boxShadow: `0 0 0 4px ${on ? "#fff" : "rgba(255,255,255,.5)"}, 0 16px 30px -12px rgba(14,52,44,.5)`, filter: on ? "none" : "grayscale(1) opacity(.55)", transition: "filter .3s, box-shadow .3s" }} />
            <span style={{ position: "absolute", left: "50%", bottom: -9, transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 9.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, background: on ? P : "#fff", color: on ? "#fff" : M, boxShadow: "0 6px 14px -6px rgba(14,52,44,.5)", transition: "all .3s" }}>{t.role}</span>
          </button>
        );
      })}
      <div style={{ position: "absolute", right: 10, top: 150, width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #ffffff, #cfe8f7)", boxShadow: "0 14px 26px -12px rgba(14,52,44,.45)", color: D, fontWeight: 700, fontSize: 15 }}>
        +{more}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "#fff", borderRadius: 24, padding: "14px 16px", boxShadow: LIFT }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: D }}>Team seats</div>
            <div style={{ fontSize: 11, color: M }}>Tap a person to add or remove</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button type="button" className="bm-press" aria-label="Remove a seat" onClick={() => step(-1)} style={btn}>−</button>
            <span style={{ minWidth: 24, textAlign: "center", fontSize: 18, fontWeight: 700, color: D }}>{seats}</span>
            <button type="button" className="bm-press" aria-label="Add a seat" onClick={() => step(1)} style={{ ...btn, background: P, color: "#fff" }}>+</button>
          </div>
        </div>
        <div style={{ marginTop: 10, padding: "9px 12px", borderRadius: 14, background: "#eef7fb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: M }}>{seats} seats × $25</span>
          <span style={{ fontSize: 19, fontWeight: 700, color: D }}>${(seats * 25).toLocaleString()}<span style={{ fontSize: 11, color: M, fontWeight: 600 }}>/mo</span></span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- floating cards (one set per tab) */
function Chip({ style, delay = 0, children }: { style: CSSProperties; delay?: number; children: ReactNode }) {
  return (
    <div className="bm-float" style={{ position: "absolute", background: "#fff", borderRadius: 18, boxShadow: "0 20px 40px -20px rgba(14, 52, 44, 0.4)", animationDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}
const small: CSSProperties = { fontSize: 10.5, color: "rgba(14, 52, 44, 0.55)" };
const strong: CSSProperties = { fontSize: 13, fontWeight: 700, color: D };

function Group({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div data-model-float="" hidden={index > 0} style={{ position: "absolute", inset: 0 }}>
      {children}
    </div>
  );
}

export function FloatsOneTime() {
  return (
    <Group index={0}>
      <Chip style={{ left: "50%", top: -2, marginLeft: -4, padding: 12, borderRadius: 14 }}>
        <svg width="46" height="46" viewBox="0 0 7 7" shapeRendering="crispEdges" fill={D}>
          <path d="M0 0h3v3H0zM4 0h3v3H4zM0 4h3v3H0z" />
          <path d="M1 1h1v1H1zM5 1h1v1H5zM1 5h1v1H1z" fill="#fff" />
          <path d="M4 4h1v1H4zM6 4h1v1H6zM5 5h1v1H5zM4 6h1v1H4zM6 6h1v1H6z" />
        </svg>
      </Chip>
      <Chip delay={0.6} style={{ left: 0, top: 78, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, width: 176 }}>
        <Face src={people.james} size={36} ring="#d4f1e6" />
        <div>
          <div style={small}>Payment received</div>
          <div style={strong}>$42,000</div>
        </div>
      </Chip>
      <Chip delay={1.2} style={{ right: 0, top: 44, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 11, background: "#d4f1e6", color: P, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
        </span>
        <div>
          <div style={strong}>Receipt sent</div>
          <div style={small}>to sarah@acme.co</div>
        </div>
      </Chip>
    </Group>
  );
}

export function FloatsRecurring() {
  const bars = [14, 20, 17, 26, 24, 32];
  return (
    <Group index={1}>
      <Chip style={{ left: "50%", top: 0, marginLeft: -92, padding: "10px 14px" }}>
        <div style={small}>MRR</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <span style={strong}>+12%</span>
          <svg width="52" height="26" viewBox="0 0 52 26">
            {bars.map((h, i) => <rect key={i} x={i * 9} y={26 - h} width="6" height={h} rx="2" fill={i === 5 ? "#6c5ce0" : "#d3cdf7"} />)}
          </svg>
        </div>
      </Chip>
      <Chip delay={0.8} style={{ left: 0, top: 84, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 38, height: 22, borderRadius: 99, background: "#6c5ce0", position: "relative" }}>
          <span style={{ position: "absolute", right: 3, top: 3, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
        </span>
        <div>
          <div style={strong}>Auto-renew</div>
          <div style={small}>Card ending 4242</div>
        </div>
      </Chip>
      <Chip delay={1.4} style={{ right: 0, top: 46, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 36, borderRadius: 10, overflow: "hidden", textAlign: "center", boxShadow: "inset 0 0 0 1px rgba(14,52,44,.12)" }}>
          <span style={{ display: "block", fontSize: 8, fontWeight: 700, color: "#fff", background: "#e9736b", padding: "1px 0" }}>APR</span>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: D, lineHeight: "20px" }}>1</span>
        </span>
        <div>
          <div style={small}>Next invoice</div>
          <div style={strong}>$490.00</div>
        </div>
      </Chip>
    </Group>
  );
}

export function FloatsUsage() {
  return (
    <Group index={2}>
      <Chip delay={0.2} style={{ left: "50%", top: 2, marginLeft: -10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <span className="bm-pulse" style={{ width: 34, height: 34, borderRadius: "50%", background: "#fde2df", color: "#c2483d", display: "flex", alignItems: "center", justifyContent: "center", animation: "bmPulse 2s infinite" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </span>
        <div>
          <div style={strong}>80% alert</div>
          <div style={small}>Limit almost reached</div>
        </div>
      </Chip>
      <Chip delay={0.9} style={{ left: 0, top: 90, padding: "12px 16px" }}>
        <div style={small}>API calls · 7 days</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={strong}>+18%</span>
          <svg width="64" height="26" viewBox="0 0 64 26" fill="none"><path d="M2 22 14 15l10 4 12-10 12 5 12-9" stroke={P} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </Chip>
      <Chip delay={1.5} style={{ right: 0, top: 50, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 11, background: "#fdf3d0", color: "#b98a00", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
        </span>
        <div>
          <div style={small}>Rate</div>
          <div style={strong}>$0.045 / call</div>
        </div>
      </Chip>
    </Group>
  );
}

export function FloatsSeats() {
  return (
    <Group index={3}>
      <Chip delay={0.3} style={{ left: "50%", top: 0, marginLeft: -16, padding: "9px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex" }}>
          {[people.priya, people.noah, people.olivia].map((s, i) => (
            <span key={s} style={{ marginLeft: i ? -10 : 0 }}><Face src={s} size={28} /></span>
          ))}
        </div>
        <span style={strong}>+3 seats</span>
      </Chip>
      <Chip delay={1} style={{ left: 0, top: 84, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, width: 196 }}>
        <Face src={people.sophia} size={38} ring="#d9effc" />
        <div>
          <div style={strong}>Sophia joined</div>
          <div style={small}>Seat added · just now</div>
        </div>
      </Chip>
      <Chip delay={1.6} style={{ right: 0, top: 48, padding: "12px 16px" }}>
        <div style={small}>Per seat</div>
        <div style={{ ...strong, fontSize: 18 }}>$25<span style={{ fontSize: 11, color: "rgba(14,52,44,.55)", fontWeight: 600 }}> /mo</span></div>
      </Chip>
    </Group>
  );
}
