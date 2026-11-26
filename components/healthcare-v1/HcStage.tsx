/* The stage of each care setting: a gradient scene with a real photograph, a phone drawn from the products' own screens, and two floating
   cards, as on the Construction page. The sample names and numbers are sample data. */

import type { CSSProperties, ReactNode } from "react";
import type { Panel } from "./hcData";

const T = "#1F2A37";
const M = "#64748B";
const L = "#E2E8EC";
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
    <div className={`hx-card ${cls}`}>
      {icon}
      <span><b>{title}</b><small>{sub}</small></span>
    </div>
  );
}
function Phone({ title, children, foot, accent }: { title: string; children: ReactNode; foot: string; accent: string }) {
  return (
    <div className="hx-phone" aria-hidden="true">
      <div className="hx-notch" />
      <div className="hx-ph-head">{title}</div>
      <div className="hx-ph-body">{children}</div>
      <div className="hx-ph-foot"><span className="hx-btn" style={{ background: accent }}>{foot}</span></div>
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
  clinics: (
    <>
      <Phone title="Today's appointments" foot="Book an appointment" accent="#2064B6">
        <Rows rows={[
          ["Maya Rao", "Dr. Iyer, follow up", "9:30", "#2064B6", "#E4ECF6"],
          ["Sam Ortiz", "Dr. Shah, new patient", "10:15", AMB, "#FEF3C7"],
          ["Anita Das", "Dr. Iyer, review", "11:00", OK, "#DCFCE7"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c="#2064B6" />} title="Appointment booked" sub="Maya Rao, Thursday 9:30" />
      <Float cls="b" icon={<Avatar t="DI" bg="#0B2A4F" />} title="Follow up assigned" sub="Sam Ortiz, call on Friday" />
    </>
  ),
  dental: (
    <>
      <Phone title="Recalls due" foot="Send reminders" accent="#0E8FA5">
        <Rows rows={[
          ["Meera Iyer", "Six month check up", "Due now", AMB, "#FEF3C7"],
          ["Raj Mehta", "Cleaning", "Booked", OK, "#DCFCE7"],
          ["Sara Kim", "Crown fitting", "Mon", "#0E8FA5", "#DDF3F6"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c="#0E8FA5" />} title="Reminder sent" sub="Meera Iyer, check up" />
      <Float cls="b" icon={<Avatar t="RM" bg="#0E8FA5" />} title="Invoice paid" sub="Cleaning, Raj Mehta" />
    </>
  ),
  aesthetics: (
    <>
      <Phone title="Consultations" foot="Add a consultation" accent="#2F8A7F">
        <Rows rows={[
          ["Priya Nair", "Skin treatment enquiry", "Today", "#2F8A7F", "#DDF0EC"],
          ["Emily Carter", "Session 2 of 4", "Thu", "#2F8A7F", "#DDF0EC"],
          ["Sara Kim", "Feedback requested", "Sent", AMB, "#FEF3C7"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c="#2F8A7F" />} title="Consultation booked" sub="Priya Nair, Saturday 11:30" />
      <Float cls="b" icon={<Avatar t="EC" bg="#2F8A7F" />} title="Membership renewed" sub="Emily Carter" />
    </>
  ),
  hospitals: (
    <>
      <Phone title="Referrals" foot="Assign a referral" accent="#31465A">
        <Rows rows={[
          ["Cardiology, North", "Meera Iyer", "New", "#31465A", "#E4EAF0"],
          ["Orthopaedics, East", "Raj Mehta", "Booked", OK, "#DCFCE7"],
          ["Paediatrics, North", "Sara Kim", "Follow up", AMB, "#FEF3C7"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c="#31465A" />} title="Referral assigned" sub="Cardiology, North" />
      <Float cls="b" icon={<Avatar t="DS" bg="#31465A" />} title="Schedule updated" sub="Dr. Shah, East location" />
    </>
  ),
  diagnostics: (
    <>
      <Phone title="Test bookings" foot="Send reminders" accent="#5B4BD5">
        <Rows rows={[
          ["Blood panel", "Maya Rao", "8:00", "#5B4BD5", "#ECE8FB"],
          ["Ultrasound", "Sam Ortiz", "9:30", "#5B4BD5", "#ECE8FB"],
          ["Repeat test", "Anita Das", "Due", AMB, "#FEF3C7"],
        ]} />
      </Phone>
      <Float cls="a" icon={<Tick c="#5B4BD5" />} title="Test booked" sub="Blood panel, Friday 8:00" />
      <Float cls="b" icon={<Avatar t="DR" bg="#5B4BD5" />} title="Referral received" sub="Dr. Rao, Anita Das" />
    </>
  ),
};

export function Stage({ p, label }: { p: Panel; label: string }) {
  return (
    <div className="hx-stage" style={{ background: `radial-gradient(110% 90% at 82% 8%, ${p.glow} 0%, transparent 55%), linear-gradient(150deg, ${p.from}, ${p.to})` }}>
      <div className="hx-grid" aria-hidden="true" />
      <div className="hx-photo" role="img" aria-label={label} style={{ backgroundImage: `url(${p.photo})`, backgroundPosition: p.pos }} />
      {SCENES[p.key]}
    </div>
  );
}

export const stageCss = `
  .hx-stage{position:relative;height:440px;border-radius:14px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(16,42,67,.07),0 40px 70px -48px rgba(16,42,67,.35)}
  .hx-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(16,42,67,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(16,42,67,.06) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:linear-gradient(120deg,#000,transparent 75%);mask-image:linear-gradient(120deg,#000,transparent 75%)}
  .hx-photo{position:absolute;left:30px;top:30px;bottom:30px;width:46%;border-radius:10px 150px 10px 10px;background-size:cover;background-color:rgba(16,42,67,.06);box-shadow:0 0 0 5px rgba(255,255,255,.75),0 30px 50px -28px rgba(16,42,67,.4)}
  .hx-phone{position:absolute;right:54px;top:86px;width:252px;height:334px;border-radius:30px;background:#fff;padding:10px 14px 14px;box-shadow:0 0 0 1px ${L},0 0 0 7px rgba(255,255,255,.7),0 40px 70px -30px rgba(16,42,67,.45);display:flex;flex-direction:column;overflow:hidden}
  .hx-notch{width:64px;height:6px;border-radius:99px;background:${L};margin:2px auto 10px;flex:none}
  .hx-ph-head{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:800;color:${T};margin-bottom:6px;flex:none}
  .hx-ph-body{flex:1;min-height:0;overflow:hidden}
  .hx-ph-foot{flex:none;padding-top:10px}
  .hx-btn{display:block;text-align:center;color:#fff;font-size:12.5px;font-weight:700;padding:10px 0;border-radius:8px}
  .hx-card{position:absolute;display:flex;align-items:center;gap:11px;background:#fff;border-radius:12px;padding:11px 16px 11px 12px;box-shadow:0 0 0 1px ${L},0 26px 48px -24px rgba(16,42,67,.4);max-width:250px}
  .hx-card b{display:block;font-size:13px;font-weight:700;color:${T};line-height:1.3}
  .hx-card small{display:block;font-size:12px;color:${M};line-height:1.35;margin-top:1px}
  .hx-card.a{left:36%;bottom:46px}
  .hx-card.b{right:30px;top:22px}
  @media (max-width:1100px){.hx-stage{height:420px}.hx-phone{right:30px}.hx-photo{left:22px;width:44%}}
  @media (max-width:760px){
    .hx-stage{height:400px;border-radius:10px}
    .hx-photo{left:14px;top:18px;bottom:96px;width:50%;border-radius:8px 90px 8px 8px}
    .hx-phone{right:12px;top:24px;width:188px;height:300px;border-radius:24px;padding:8px 10px 10px}
    .hx-ph-head{font-size:13px}
    .hx-card{padding:8px 12px 8px 9px;max-width:200px}
    .hx-card.a{left:14px;bottom:18px}
    .hx-card.b{display:none}
  }
`;
