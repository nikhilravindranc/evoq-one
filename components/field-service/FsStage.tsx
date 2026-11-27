/* The stage of each area: a gradient scene with a real photograph, a phone drawn from the product's own screens, and two
   floating cards, in the way Zendesk stages its product. The sample names and numbers match the rest of the page. */

import type { CSSProperties, ReactNode } from "react";
import { C } from "./fsData";

const T = "#172033";
const M = "#64748B";
const L = "#E5EAF3";
const OK = "#16A34A";
const AMB = "#F59E0B";
const RED = "#DC2626";

function Avatar({ t, bg }: { t: string; bg: string }) {
  return <span style={{ width: 30, height: 30, borderRadius: "50%", background: bg, color: "#fff", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{t}</span>;
}
function Tick({ c = OK }: { c?: string }) {
  return <span style={{ width: 28, height: 28, borderRadius: "50%", background: c, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>;
}
function Dot({ c }: { c: string }) {
  return <i style={{ width: 9, height: 9, borderRadius: "50%", background: c, flex: "none" }} />;
}

function Float({ cls, icon, title, sub }: { cls: string; icon: ReactNode; title: string; sub: string }) {
  return (
    <div className={`st-card ${cls}`}>
      {icon}
      <span><b>{title}</b><small>{sub}</small></span>
    </div>
  );
}

function Phone({ title, children, foot }: { title: string; children: ReactNode; foot: ReactNode }) {
  return (
    <div className="st-phone" aria-hidden="true">
      <div className="st-notch" />
      <div className="st-ph-head">{title}</div>
      <div className="st-ph-body">{children}</div>
      <div className="st-ph-foot">{foot}</div>
    </div>
  );
}

const rowS: CSSProperties = { display: "flex", alignItems: "center", gap: 9, padding: "9px 0", borderTop: `1px solid ${L}`, fontSize: 12.5, color: T };
const chipS = (c: string, bg: string): CSSProperties => ({ fontSize: 10.5, fontWeight: 700, color: c, background: bg, padding: "3px 8px", borderRadius: 99, whiteSpace: "nowrap", marginLeft: "auto" });

const SCENES: Record<string, { from: string; to: string; glow: string; body: ReactNode }> = {
  field: {
    from: "#EEF5FE", to: "#D3E4FB", glow: "rgba(23,119,240,.2)",
    body: (
      <>
        <Phone title="Work order WO-2041" foot={<span className="st-btn" style={{ background: C.BLUE }}>Get signature</span>}>
          <div style={{ fontSize: 11, color: M, marginBottom: 8 }}>Level 3 chiller · Halo Clinic</div>
          {[["Isolate the supply", true], ["Replace the relay", true], ["Test run, required", false]].map(([a, d]) => (
            <div key={a as string} style={rowS}>
              <i style={{ width: 16, height: 16, borderRadius: "50%", background: d ? OK : "#fff", boxShadow: d ? "none" : `inset 0 0 0 2px ${AMB}`, flex: "none" }} />
              <span>{a as string}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <span style={chipS(C.NAVY, C.PALE)}>3 photos</span><span style={chipS(C.NAVY, C.PALE)}>Relay x 1</span>
          </div>
        </Phone>
        <Float cls="a" icon={<Tick />} title="Estimate approved" sub="EST-2041 · 7,800" />
        <Float cls="b" icon={<Avatar t="RK" bg={C.NAVY} />} title="Technician dispatched" sub="Ravi Kumar · 18 min away" />
      </>
    ),
  },
  facilities: {
    from: "#EDF2F9", to: "#D2DEEE", glow: "rgba(15,61,117,.18)",
    body: (
      <>
        <Phone title="Open site requests" foot={<span className="st-btn" style={{ background: C.NAVY }}>Book a room</span>}>
          {[["Lift lobby light out", "Due today", RED, "#FEE2E2"], ["Meeting room 2 air conditioning", "Due Fri", "#B45309", "#FEF3C7"], ["Water leak, basement", "Contractor", C.NAVY, C.PALE]].map(([a, b, c, bg]) => (
            <div key={a} style={rowS}><Dot c={c} /><span style={{ minWidth: 0 }}>{a}</span><span style={chipS(c, bg)}>{b}</span></div>
          ))}
          <div style={{ marginTop: 10, padding: "9px 10px", borderRadius: 10, background: "#F3F6FB", fontSize: 12, color: T }}><b>Training room</b><br /><span style={{ color: M }}>Thu 10:30 · awaiting approval</span></div>
        </Phone>
        <Float cls="a" icon={<Avatar t="RK" bg={C.BLUE} />} title="Request assigned" sub="Lift lobby light · Ravi Kumar" />
        <Float cls="b" icon={<Tick />} title="Booking approved" sub="Training room · Thu 10:30" />
      </>
    ),
  },
  maintenance: {
    from: "#FFF3EA", to: "#FBDDC6", glow: "rgba(194,65,12,.18)",
    body: (
      <>
        <Phone title="Service plans" foot={<span className="st-btn" style={{ background: C.BURNT }}>Raise work orders</span>}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <span style={{ flex: 1, background: "#FFF7ED", borderRadius: 10, padding: "8px 10px", fontSize: 11, color: M }}>Due in 30 days<br /><b style={{ fontSize: 18, color: T }}>5</b></span>
            <span style={{ flex: 1, background: "#F3F6FB", borderRadius: 10, padding: "8px 10px", fontSize: 11, color: M }}>Overdue<br /><b style={{ fontSize: 18, color: T }}>0</b></span>
          </div>
          {[["Passenger elevator", "Nov 14"], ["Escalator", "Nov 20"], ["Pump 2", "Nov 24"]].map(([a, b]) => (
            <div key={a} style={rowS}><Dot c={C.BURNT} /><span>{a}</span><span style={chipS("#9A3412", C.POR)}>{b}</span></div>
          ))}
        </Phone>
        <Float cls="a" icon={<Tick c={C.BURNT} />} title="Work order raised" sub="Elevator service · Nov 14" />
        <Float cls="b" icon={<Avatar t="AS" bg="#7C2D12" />} title="Warranty valid" sub="Passenger elevator · to Mar 2027" />
      </>
    ),
  },
};

export function Stage({ area, photo, pos, label }: { area: string; photo: string; pos: string; label: string }) {
  const s = SCENES[area];
  return (
    <div className="st-stage" style={{ background: `radial-gradient(110% 90% at 82% 8%, ${s.glow} 0%, transparent 55%), linear-gradient(150deg, ${s.from}, ${s.to})` }}>
      <div className="st-grid" aria-hidden="true" />
      <div className="st-photo" role="img" aria-label={label} style={{ backgroundImage: `url(${photo})`, backgroundPosition: pos }} />
      {s.body}
    </div>
  );
}

export const stageCss = `
  .st-stage{position:relative;height:440px;border-radius:28px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(23,32,51,.07),0 40px 70px -48px rgba(23,32,51,.35)}
  .st-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(23,32,51,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(23,32,51,.06) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:linear-gradient(120deg,#000,transparent 75%);mask-image:linear-gradient(120deg,#000,transparent 75%)}
  .st-photo{position:absolute;left:30px;top:30px;bottom:30px;width:46%;border-radius:22px 150px 22px 22px;background-size:cover;background-color:rgba(23,32,51,.06);box-shadow:0 0 0 5px rgba(255,255,255,.75),0 30px 50px -28px rgba(23,32,51,.4)}
  .st-phone{position:absolute;right:54px;top:86px;width:252px;height:334px;border-radius:34px;background:#fff;padding:10px 14px 14px;box-shadow:0 0 0 1px ${L},0 0 0 7px rgba(255,255,255,.7),0 40px 70px -30px rgba(23,32,51,.45);display:flex;flex-direction:column;overflow:hidden}
  .st-notch{width:64px;height:6px;border-radius:99px;background:${L};margin:2px auto 10px;flex:none}
  .st-ph-head{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:800;color:${T};margin-bottom:6px;flex:none}
  .st-ph-body{flex:1;min-height:0;overflow:hidden}
  .st-ph-foot{flex:none;padding-top:10px}
  .st-btn{display:block;text-align:center;color:#fff;font-size:12.5px;font-weight:700;padding:10px 0;border-radius:12px}
  .st-card{position:absolute;display:flex;align-items:center;gap:11px;background:#fff;border-radius:16px;padding:11px 16px 11px 12px;box-shadow:0 0 0 1px ${L},0 26px 48px -24px rgba(23,32,51,.4);max-width:250px}
  .st-card b{display:block;font-size:13px;font-weight:700;color:${T};line-height:1.3}
  .st-card small{display:block;font-size:12px;color:${M};line-height:1.35;margin-top:1px}
  .st-card.a{left:36%;bottom:46px}
  .st-card.b{right:30px;top:22px}
  @media (max-width:1100px){.st-stage{height:420px}.st-phone{right:30px}.st-photo{left:22px;width:44%}}
  @media (max-width:760px){
    .st-stage{height:400px;border-radius:22px}
    .st-photo{left:14px;top:18px;bottom:96px;width:50%;border-radius:16px 90px 16px 16px}
    .st-phone{right:12px;top:24px;width:188px;height:300px;border-radius:26px;padding:8px 10px 10px}
    .st-ph-head{font-size:13px}
    .st-card{padding:8px 12px 8px 9px;max-width:200px}
    .st-card.a{left:14px;bottom:18px}
    .st-card.b{display:none}
  }
`;
