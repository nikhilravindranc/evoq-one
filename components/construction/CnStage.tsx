/* The stage of each buyer: a gradient scene with a real photograph, a phone drawn from the products' own screens, and two floating
   cards, as on the Field Service page. The sample names and numbers are sample data. */

import type { CSSProperties, ReactNode } from "react";
import type { Panel } from "./cnData";

const T = "#1F2A37";
const M = "#64748B";
const L = "#E8E2DA";
const OK = "#16A34A";
const AMB = "#F59E0B";
const RED = "#DC2626";
const TERRA = "#B4533C";

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
    <div className={`cs-card ${cls}`}>
      {icon}
      <span><b>{title}</b><small>{sub}</small></span>
    </div>
  );
}
function Phone({ title, children, foot, accent }: { title: string; children: ReactNode; foot: string; accent: string }) {
  return (
    <div className="cs-phone" aria-hidden="true">
      <div className="cs-notch" />
      <div className="cs-ph-head">{title}</div>
      <div className="cs-ph-body">{children}</div>
      <div className="cs-ph-foot"><span className="cs-btn" style={{ background: accent }}>{foot}</span></div>
    </div>
  );
}

const rowS: CSSProperties = { display: "flex", alignItems: "center", gap: 9, padding: "9px 0", borderTop: `1px solid ${L}`, fontSize: 12.5, color: T };
const chipS = (c: string, bg: string): CSSProperties => ({ fontSize: 10.5, fontWeight: 700, color: c, background: bg, padding: "3px 8px", borderRadius: 99, whiteSpace: "nowrap", marginLeft: "auto" });
const subS: CSSProperties = { display: "block", fontSize: 11, color: M, marginTop: 1 };

type Row = [string, string, string, string, string];

function Rows({ rows }: { rows: Row[] }) {
  return (
    <>
      {rows.map(([a, b, chip, c, bg]) => (
        <div key={a} style={rowS}>
          <Dot c={c} />
          <span style={{ minWidth: 0 }}>{a}{b && <small style={subS}>{b}</small>}</span>
          <span style={chipS(c, bg)}>{chip}</span>
        </div>
      ))}
    </>
  );
}

const SCENES: Record<string, ReactNode> = {
  construction: (
    <>
      <Phone title="Site tasks" foot="Add a task" accent={TERRA}>
        <Rows rows={[
          ["Pour level 2 slab", "Sam Ortiz", "Due Fri", AMB, "#FEF3C7"],
          ["Rebar delivery", "Stock below reorder level", "Alert", RED, "#FEE2E2"],
          ["Client walk-through", "Level 1 handover", "Mon", "#274B7A", "#E4ECF6"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c={TERRA} />} title="Milestone invoice ready" sub="Level 2 slab complete" />
      <Float cls="b" icon={<Avatar t="SO" bg="#7C2D1F" />} title="Task assigned" sub="Pour level 2 slab, Sam Ortiz" />
    </>
  ),
  engineering: (
    <>
      <Phone title="Project deadlines" foot="Add a deadline" accent="#274B7A">
        <Rows rows={[
          ["Structural review", "Anita Rao", "Due Thu", AMB, "#FEF3C7"],
          ["Client drawings", "Westgate Infra", "Mon", "#274B7A", "#E4ECF6"],
          ["Site survey", "Completed", "Done", OK, "#DCFCE7"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Avatar t="WI" bg="#274B7A" />} title="Follow up scheduled" sub="Westgate Infra, call on Friday" />
      <Float cls="b" icon={<Tick c="#274B7A" />} title="Training assigned" sub="Site safety induction" />
    </>
  ),
  agencies: (
    <>
      <Phone title="Viewings today" foot="Send reminders" accent="#2E5A47">
        <Rows rows={[
          ["Flat 4B, Lakeview", "Maya Rao", "10:00", "#2E5A47", "#E1EFE7"],
          ["Villa 12, Greenfield", "Raj Mehta", "12:30", "#2E5A47", "#E1EFE7"],
          ["Penthouse, Harbour Tower", "Sara Kim", "3:00", AMB, "#FEF3C7"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c="#2E5A47" />} title="Viewing booked" sub="Saturday 11:30, reminder set" />
      <Float cls="b" icon={<Avatar t="PN" bg="#2E5A47" />} title="Enquiry assigned" sub="To Priya Nair" />
    </>
  ),
  developers: (
    <>
      <Phone title="Buyers" foot="Send launch update" accent="#7C2D1F">
        <Rows rows={[
          ["Meera Iyer", "Show unit visit", "Saturday", "#2E5A47", "#E1EFE7"],
          ["Raj Mehta", "Options quote sent", "Quote", AMB, "#FEF3C7"],
          ["Sara Kim", "Booking amount", "Paid", OK, "#DCFCE7"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c="#7C2D1F" />} title="Quote approved" sub="Unit 804, graphite finish" />
      <Float cls="b" icon={<Avatar t="SK" bg="#7C2D1F" />} title="Invoice paid" sub="Booking amount, 5,00,000" />
    </>
  ),
  operations: (
    <>
      <Phone title="Open requests" foot="Book a room" accent="#1F6F6B">
        <Rows rows={[
          ["Lift lobby light out", "Tower B", "Due today", RED, "#FEE2E2"],
          ["Air conditioning noise", "Tower A, level 4", "Due Fri", AMB, "#FEF3C7"],
          ["Clubhouse booking", "Saturday, 6:00", "Approval", "#1F6F6B", "#DDF0EE"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Avatar t="RK" bg="#1F6F6B" />} title="Request assigned" sub="Lift lobby light, Ravi Kumar" />
      <Float cls="b" icon={<Tick c="#1F6F6B" />} title="Booking approved" sub="Clubhouse, Saturday 6:00" />
    </>
  ),
};

export function Stage({ p, label }: { p: Panel; label: string }) {
  return (
    <div className="cs-stage" style={{ background: `radial-gradient(110% 90% at 82% 8%, ${p.glow} 0%, transparent 55%), linear-gradient(150deg, ${p.from}, ${p.to})` }}>
      <div className="cs-grid" aria-hidden="true" />
      <div className="cs-photo" role="img" aria-label={label} style={{ backgroundImage: `url(${p.photo})`, backgroundPosition: p.pos }} />
      {SCENES[p.key]}
    </div>
  );
}

export const stageCss = `
  .cs-stage{position:relative;height:440px;border-radius:10px;overflow:hidden;box-shadow:0 40px 70px -46px rgba(41,20,10,.8)}
  .cs-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:linear-gradient(120deg,#000,transparent 75%);mask-image:linear-gradient(120deg,#000,transparent 75%)}
  .cs-photo{position:absolute;left:30px;top:30px;bottom:30px;width:46%;border-radius:6px 150px 6px 6px;background-size:cover;background-color:rgba(255,255,255,.18);box-shadow:0 30px 50px -28px rgba(0,0,0,.6)}
  .cs-phone{position:absolute;right:54px;top:86px;width:252px;height:334px;border-radius:30px;background:#fff;padding:10px 14px 14px;box-shadow:0 0 0 7px rgba(255,255,255,.16),0 40px 70px -28px rgba(0,0,0,.7);display:flex;flex-direction:column;overflow:hidden}
  .cs-notch{width:64px;height:6px;border-radius:99px;background:${"#E8E2DA"};margin:2px auto 10px;flex:none}
  .cs-ph-head{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:800;color:${T};margin-bottom:6px;flex:none}
  .cs-ph-body{flex:1;min-height:0;overflow:hidden}
  .cs-ph-foot{flex:none;padding-top:10px}
  .cs-btn{display:block;text-align:center;color:#fff;font-size:12.5px;font-weight:700;padding:10px 0;border-radius:8px}
  .cs-card{position:absolute;display:flex;align-items:center;gap:11px;background:#fff;border-radius:12px;padding:11px 16px 11px 12px;box-shadow:0 26px 48px -22px rgba(0,0,0,.6);max-width:250px}
  .cs-card b{display:block;font-size:13px;font-weight:700;color:${T};line-height:1.3}
  .cs-card small{display:block;font-size:12px;color:${M};line-height:1.35;margin-top:1px}
  .cs-card.a{left:36%;bottom:46px}
  .cs-card.b{right:30px;top:22px}
  @media (max-width:1100px){.cs-stage{height:420px}.cs-phone{right:30px}.cs-photo{left:22px;width:44%}}
  @media (max-width:760px){
    .cs-stage{height:400px;border-radius:8px}
    .cs-photo{left:14px;top:18px;bottom:96px;width:50%;border-radius:6px 90px 6px 6px}
    .cs-phone{right:12px;top:24px;width:188px;height:300px;border-radius:24px;padding:8px 10px 10px}
    .cs-ph-head{font-size:13px}
    .cs-card{padding:8px 12px 8px 9px;max-width:200px}
    .cs-card.a{left:14px;bottom:18px}
    .cs-card.b{display:none}
  }
`;
