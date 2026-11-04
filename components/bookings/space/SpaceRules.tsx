"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { I } from "../theme";
import { PLAN_ROOMS, PlanMap, PM_CSS, stateAt, type PlanState, type RoomId } from "./PlanMap";
import { SPACE_IMG } from "./ui";
import { Horizon, NightField, useInView } from "./fx";
import { BG, DEEP, INK, LINE, MUTED, NEUTRAL, PRIMARY, PRIMARY_HOVER, SAND } from "./palette";

/* "Ensure fair use": a dark section that rests on a lit horizon. Three views, each a small working
   example: booking rules with a day dial, a floor plan of rooms, and check in with release. */

type Tab = "rules" | "plan" | "checkin";
const TABS: { k: Tab; label: string }[] = [
  { k: "rules", label: "Booking rules" },
  { k: "plan", label: "Floor plan" },
  { k: "checkin", label: "Check in and release" },
];
const COPY: Record<Tab, { t: string; d: string; pts: string[] }> = {
  rules: {
    t: "Set the rules once. Every booking follows them.",
    d: "Hours, notice, length, buffers and approval belong to the space, not to whoever answers the email. People see the limit before they send a request.",
    pts: ["Opening hours and minimum notice per space", "Longest booking and setup time", "Approval only where you need it"],
  },
  plan: {
    t: "See the building, not a list of names.",
    d: "Spaces are organized by location and floor. Booked rooms are shaded, so you see at a glance what is taken and what is free.",
    pts: ["Locations, floors and spaces in a single structure", "Capacity and equipment on every space", "Status that matches the booking page"],
  },
  checkin: {
    t: "Rooms nobody uses go back to the pool.",
    d: "People check in with a QR code or the booking reference. If nobody arrives within the grace period, the room is released for others.",
    pts: ["Check in by QR code or reference", "A grace period you set for each space", "No shows marked in the booking"],
  },
};
const RULES = [
  ["Opening hours", "Mon to Fri, 08:00 to 19:00"],
  ["Minimum notice", "24 hours"],
  ["Longest booking", "4 hours"],
  ["Setup and cleanup", "15 minutes before and after"],
  ["Approval", "Needed for outside groups"],
] as const;

/* ---------- the day dial: 08:00 to 20:00 around a moon ---------- */
const pt = (h: number, r: number) => {
  const a = ((h - 8) / 12) * 2 * Math.PI - Math.PI / 2;
  return [100 + r * Math.cos(a), 100 + r * Math.sin(a)];
};
const arc = (h1: number, h2: number, r: number) => {
  const [x1, y1] = pt(h1, r);
  const [x2, y2] = pt(h2, r);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${h2 - h1 > 6 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};
function Dial({ dur }: { dur: number }) {
  const over = dur > 4;
  const ok = Math.min(dur, 4);
  return (
    <svg className="rl-dial" viewBox="0 0 200 200" role="img" aria-label={over ? "The request is longer than the 4 hour limit" : `Requested slot, 13:00 to ${13 + dur}:00`}>
      <defs>
        <radialGradient id="rlMoon" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#35553F" />
          <stop offset="100%" stopColor="#16241C" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="99" fill="url(#rlMoon)" stroke="rgba(217,185,140,.45)" strokeWidth="1" />
      <circle cx="64" cy="58" r="9" fill={SAND} opacity=".07" />
      <circle cx="132" cy="140" r="14" fill={SAND} opacity=".06" />
      <circle cx="148" cy="62" r="5" fill={SAND} opacity=".08" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="12" />
      <path d={arc(9, 11, 74)} fill="none" stroke={SAND} strokeOpacity=".85" strokeWidth="12" strokeLinecap="round" />
      <path d={arc(15.5, 17, 74)} fill="none" stroke={SAND} strokeOpacity=".85" strokeWidth="12" strokeLinecap="round" />
      <path d={arc(13, 13 + ok, 74)} fill="none" stroke="#8FD0A4" strokeWidth="12" strokeLinecap="round" style={{ transition: "all .35s ease" }} />
      {over && <path d={arc(17, 13 + dur, 74)} fill="none" stroke="#E8A19A" strokeWidth="12" strokeLinecap="round" strokeDasharray="2 7" />}
      {[8, 12, 16].map((h) => {
        const [x, y] = pt(h, 52);
        return <text key={h} x={x} y={y + 3} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,.55)">{String(h).padStart(2, "0")}</text>;
      })}
      <text x="100" y="97" textAnchor="middle" fontSize="19" fontWeight="600" fill="#fff" fontFamily="var(--font-display), system-ui, sans-serif">{over ? "4 h limit" : `${dur} hours`}</text>
      <text x="100" y="115" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,.7)">{over ? "Choose a shorter time" : `13:00 to ${13 + dur}:00`}</text>
    </svg>
  );
}

function RulesCard() {
  const [dur, setDur] = useState(2);
  const over = dur > 4;
  return (
    <div className="rl-rules">
      <Dial dur={dur} />
      <div className="rl-card">
        <div className="rl-card-h"><b>Training Room 2</b><span className="sr-badge warn">Needs approval</span></div>
        <dl>{RULES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        <div className="rl-try">
          <span className="rl-try-k">Try a request</span>
          <div className="rl-chips" role="group" aria-label="Booking length">
            {[2, 4, 6].map((h) => <button key={h} type="button" className={dur === h ? "on" : ""} aria-pressed={dur === h} onClick={() => setDur(h)}>{h} hours</button>)}
          </div>
          <div className={`rl-res ${over ? "no" : "yes"}`} aria-live="polite">
            {over ? <>The longest booking is 4 hours. Choose a shorter time.</> : <>{I.check}Sent to your team for approval. The organizer is told as soon as it is decided.</>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- floor plan: the same plan as the booking tool ---------- */
const fmt = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;

function PlanCard() {
  const [sel, setSel] = useState<RoomId>("train");
  const [t, setT] = useState(13);
  const status = Object.fromEntries(PLAN_ROOMS.map((r) => [r.id, stateAt(r, t)])) as Partial<Record<RoomId, PlanState>>;
  const r = PLAN_ROOMS.find((x) => x.id === sel)!;
  const st = stateAt(r, t);
  const busyUntil = r.busy.find(([a, b]) => t >= a && t < b)?.[1];
  return (
    <div className="rl-plan">
      <div className="rl-plan-top">
        <span className="rl-lvl">Level 1</span>
        <label className="rl-time">
          <span>{fmt(t)}</span>
          <input type="range" min={8} max={17} step={0.5} value={t} aria-label="Time of day" onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <div className="rl-plan-map"><PlanMap status={status} selected={sel} onSelect={setSel} /></div>
      <div className="rl-plan-d">
        <img src={r.img} alt="" />
        <span><b>{r.name}</b><small>{r.meta}</small></span>
        <em className={`sr-badge ${st === "busy" ? "off" : st === "approval" ? "warn" : "ok"}`}>{st === "busy" ? `Booked until ${fmt(busyUntil ?? t)}` : st === "approval" ? "Needs approval" : "Free"}</em>
      </div>
      <div className="rl-plan-k" aria-hidden><span><i className="f" />Free</span><span><i className="b" />Booked</span><span><i className="a" />Needs approval</span></div>
    </div>
  );
}

/* ---------- check in and release: the booking pass on a phone ---------- */
const QRN = 25;
const QR = (() => {
  const g: boolean[][] = Array.from({ length: QRN }, () => Array<boolean>(QRN).fill(false));
  const reserved = (x: number, y: number) => (x < 8 && y < 8) || (x > QRN - 9 && y < 8) || (x < 8 && y > QRN - 9);
  for (let y = 0; y < QRN; y++) for (let x = 0; x < QRN; x++) if (!reserved(x, y)) { const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; g[y][x] = v - Math.floor(v) > 0.52; }
  const finder = (ox: number, oy: number) => { for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) g[oy + y][ox + x] = x === 0 || y === 0 || x === 6 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4); };
  finder(0, 0); finder(QRN - 7, 0); finder(0, QRN - 7);
  return g;
})();

function CheckinCard() {
  const [left, setLeft] = useState(300);
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    if (arrived || left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left, arrived]);
  const released = !arrived && left <= 0;
  const mm = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  return (
    <div className="rl-ci">
      <div className="rl-phone">
        <div className="rl-screen">
          <div className="rl-status"><span>13:00</span><i aria-hidden /><span>EVOQ Bookings</span></div>
          <div className="rl-pass-h">
            <img src={SPACE_IMG.training} alt="" />
            <span><b>Training Room 2</b><small>Thu 19 Nov · 13:00 to 15:00</small></span>
          </div>
          <div className="rl-qr">
            <svg viewBox={`0 0 ${QRN} ${QRN}`} role="img" aria-label="Check in QR code" shapeRendering="crispEdges">
              {QR.flatMap((row, y) => row.map((on, x) => (on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null)))}
            </svg>
            <b>BK 20418</b>
            <small>Scan at the room or enter your reference</small>
          </div>
          <div className={`rl-banner ${arrived ? "ok" : released ? "off" : "warn"}`} aria-live="polite">
            {arrived ? <>{I.check}Checked in at 13:02. Enjoy your session.</> : released ? <>The room was released and is free for others.</> : <>Check in within {mm} or the room is released.</>}
          </div>
          {!arrived && !released && <button type="button" className="sr-btn primary rl-ci-btn" onClick={() => setArrived(true)}>Check in</button>}
          {(arrived || released) && <button type="button" className="sr-btn ghost rl-ci-btn" onClick={() => { setArrived(false); setLeft(300); }}>Replay</button>}
        </div>
      </div>
      <div className={`rl-team ${arrived ? "ok" : released ? "off" : ""}`} aria-live="polite">
        <small>Your team sees</small>
        <b>Training Room 2</b>
        <span>{arrived ? "Checked in 13:02" : released ? "Released, free again" : `Waiting, released in ${mm}`}</span>
      </div>
    </div>
  );
}

export function SpaceRules() {
  const [tab, setTab] = useState<Tab>("rules");
  const [auto, setAuto] = useState(true);
  const [ref, seen] = useInView<HTMLElement>(0.35);
  useEffect(() => {
    if (!auto || !seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const i = TABS.findIndex((t) => t.k === tab);
    if (i >= TABS.length - 1) return;
    const t = setTimeout(() => setTab(TABS[i + 1].k), 9000);
    return () => clearTimeout(t);
  }, [tab, auto, seen]);
  const c = COPY[tab];
  const pick = (k: Tab) => { setAuto(false); setTab(k); };
  return (
    <section ref={ref} className="sr-out rl" id="rules">
      <style>{PM_CSS}{css}</style>
      <NightField stars={54} pings={3} seed={3} />
      <Horizon top="60%" />
      <div className="sr-in rl-in">
        <div className="sr-head c rl-head" data-rv="0">
          <span className="sr-label">Ensure fair use</span>
          <h2 className="sr-h2">Automatic rules keep every booking fair.</h2>
          <p className="sr-lead">Approvals, limits, buffers and check in rules decide when, where and how people book, and release rooms that go unused.</p>
        </div>
        <div className="rl-tabs" role="tablist" aria-label="Fair use features" data-rv="1">
          {TABS.map((t) => (
            <button key={t.k} type="button" role="tab" aria-selected={tab === t.k} className={tab === t.k ? "on" : ""} onClick={() => pick(t.k)}>
              {tab === t.k && auto && seen && t.k !== "checkin" && <i className="rl-bar" aria-hidden />}
              {t.label}
            </button>
          ))}
        </div>
        <div className="rl-stage" key={tab}>
          <div className="rl-copy">
            <h3>{c.t}</h3>
            <p>{c.d}</p>
            <ul>{c.pts.map((p) => <li key={p}>{I.check}{p}</li>)}</ul>
          </div>
          <div className="rl-viz">
            {tab === "rules" && <RulesCard />}
            {tab === "plan" && <PlanCard />}
            {tab === "checkin" && <CheckinCard />}
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .rl{position:relative;isolation:isolate;overflow:hidden;background:#16241C;color:#fff;padding-top:104px;padding-bottom:120px}
  .rl-in{position:relative;z-index:2}
  .rl .sr-h2{color:#fff}
  .rl .sr-label{color:${SAND}}
  .rl .sr-lead{color:rgba(255,255,255,.78)}
  .rl-head{margin-bottom:34px}
  .rl-tabs{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:56px}
  .rl-tabs button{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);color:rgba(255,255,255,.86);border-radius:999px;padding:11px 20px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:14.5px;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease}
  .rl-tabs button:hover{background:rgba(255,255,255,.12)}
  .rl-tabs button.on{background:#fff;color:${DEEP};border-color:#fff}
  .rl-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:${PRIMARY};transform-origin:left;animation:rlBar 9s linear forwards}
  @keyframes rlBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  .rl-stage{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:64px;align-items:center;animation:rlIn .4s ease both}
  @keyframes rlIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .rl-copy h3{font-family:var(--font-display),system-ui,sans-serif;font-size:32px;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 14px}
  .rl-copy p{margin:0;color:rgba(255,255,255,.78);font-size:17px}
  .rl-copy ul{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:10px}
  .rl-copy li{display:flex;gap:10px;align-items:flex-start;color:rgba(255,255,255,.92);font-size:15.5px}
  .rl-copy li svg{width:16px;height:16px;color:${SAND};flex-shrink:0;margin-top:4px}
  .rl-viz{position:relative;min-width:0}

  .rl-rules{position:relative;padding-top:78px;max-width:520px;margin-left:auto}
  .rl-dial{position:absolute;top:-6px;right:-18px;width:150px;height:150px;z-index:3;filter:drop-shadow(0 18px 30px rgba(0,0,0,.45))}
  .rl-card{background:#fff;color:${INK};border-radius:22px;padding:26px;box-shadow:0 40px 80px -34px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.08)}
  .rl-card-h{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-bottom:14px;border-bottom:1px solid ${LINE}}
  .rl-rules .rl-card-h{padding-right:112px}
  .rl-card-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${DEEP}}
  .rl-card dl{margin:0}
  .rl-card dl>div{display:flex;justify-content:space-between;gap:14px;padding:11px 0;border-bottom:1px solid ${LINE};font-size:14.5px}
  .rl-card dt{color:${MUTED}}.rl-card dd{margin:0;color:${DEEP};font-weight:600;text-align:right}
  .rl-try{margin-top:18px;padding:16px;border-radius:14px;background:${BG};display:grid;gap:11px}
  .rl-try-k{font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${PRIMARY}}
  .rl-chips{display:flex;gap:8px;flex-wrap:wrap}
  .rl-chips button{border:1.5px solid ${LINE};background:#fff;border-radius:999px;padding:7px 15px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:13.5px;color:${MUTED};cursor:pointer}
  .rl-chips button.on{border-color:${PRIMARY};color:${PRIMARY_HOVER};background:rgba(78,111,88,.1)}
  .rl-res{display:flex;align-items:flex-start;gap:8px;font-size:14px;min-height:44px}
  .rl-res svg{width:16px;height:16px;margin-top:3px;flex-shrink:0}
  .rl-res.yes{color:#116B38}.rl-res.no{color:#B42318}

  .rl-plan{background:#FBFAF6;color:#1F2A23;border-radius:22px;overflow:hidden;box-shadow:0 40px 80px -34px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.1);max-width:640px;margin-left:auto}
  .rl-plan-top{display:flex;align-items:center;gap:12px;padding:12px 16px;background:#fff;border-bottom:1px solid ${LINE}}
  .rl-lvl{display:inline-flex;align-items:center;height:32px;padding:0 12px;border:1px solid ${LINE};border-radius:8px;font-size:13px;font-weight:600;color:${DEEP};font-family:var(--font-display),system-ui,sans-serif}
  .rl-time{display:flex;align-items:center;gap:10px;flex:1;font-size:13px;font-weight:600;color:${DEEP};font-family:var(--font-display),system-ui,sans-serif}
  .rl-time span{min-width:42px}.rl-time input{flex:1;min-width:0;accent-color:${PRIMARY};cursor:pointer}
  .rl-plan-map{padding:12px 12px 4px}
  .rl-plan-d{display:grid;grid-template-columns:60px minmax(0,1fr) auto;gap:12px;align-items:center;margin:8px 14px 0;padding:10px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .rl-plan-d img{width:60px;height:48px;object-fit:cover;border-radius:9px;display:block}
  .rl-plan-d span{display:grid;min-width:0}.rl-plan-d b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}.rl-plan-d small{font-size:12px;color:${NEUTRAL}}
  .rl-plan-k{display:flex;flex-wrap:wrap;gap:14px;padding:10px 16px 14px;font-size:11.5px;color:${MUTED}}
  .rl-plan-k span{display:inline-flex;align-items:center;gap:6px}
  .rl-plan-k i{width:14px;height:10px;border-radius:3px;display:inline-block;border:1px solid rgba(47,74,56,.35)}
  .rl-plan-k .f{background:rgba(120,190,150,.3)}.rl-plan-k .b{background:rgba(217,185,140,.7)}
  .rl-plan-k .a{background:repeating-linear-gradient(45deg,rgba(120,190,150,.3) 0 3px,rgba(78,111,88,.55) 3px 4px)}

  .rl-ci{position:relative;display:flex;justify-content:center;padding:6px 0}
  .rl-phone{width:292px;border-radius:42px;background:#0C140F;padding:11px;box-shadow:0 50px 90px -30px rgba(0,0,0,.8),0 0 0 1.5px rgba(255,255,255,.14),inset 0 0 0 1px rgba(255,255,255,.06)}
  .rl-screen{border-radius:32px;background:#FBFAF6;color:${INK};padding:12px 14px 16px;display:grid;gap:12px;overflow:hidden}
  .rl-status{display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:600;color:${DEEP}}
  .rl-status i{width:56px;height:16px;border-radius:10px;background:#0C140F}
  .rl-pass-h{display:grid;grid-template-columns:54px minmax(0,1fr);gap:10px;align-items:center}
  .rl-pass-h img{width:54px;height:46px;object-fit:cover;border-radius:10px;display:block}
  .rl-pass-h span{display:grid}.rl-pass-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}.rl-pass-h small{font-size:11.5px;color:${NEUTRAL}}
  .rl-qr{display:grid;justify-items:center;gap:4px;padding:14px 12px 12px;border-radius:18px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .rl-qr svg{width:150px;height:150px;fill:#16241C;display:block}
  .rl-qr b{font-family:var(--font-display),system-ui,sans-serif;letter-spacing:.06em;font-size:14px;color:${DEEP};margin-top:4px}
  .rl-qr small{font-size:11.5px;color:${NEUTRAL};text-align:center}
  .rl-banner{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;font-size:12.5px;line-height:1.35}
  .rl-banner svg{width:15px;height:15px;flex-shrink:0}
  .rl-banner.warn{background:#FBF1DC;color:#7A4A06}.rl-banner.ok{background:#E3F3E8;color:#116B38}.rl-banner.off{background:#ECEFEB;color:${MUTED}}
  .rl-ci-btn{width:100%}
  .rl-team{position:absolute;right:-6px;bottom:96px;min-width:176px;padding:12px 14px;border-radius:14px;background:rgba(251,250,246,.96);color:${INK};display:grid;gap:1px;box-shadow:0 24px 50px -18px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.1);animation:rlIn .35s ease both}
  .rl-team small{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:${PRIMARY};font-weight:600;font-family:var(--font-display),system-ui,sans-serif}
  .rl-team b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}
  .rl-team span{font-size:12.5px;color:${MUTED}}
  .rl-team.ok span{color:#116B38}.rl-team.off span{color:#B42318}

  @media (max-width:980px){
    .rl-stage{grid-template-columns:minmax(0,1fr);gap:40px}
    .rl-rules,.rl-plan{margin-left:0;max-width:none}
    .rl-copy h3{font-size:27px}
    .rl{padding-top:72px;padding-bottom:88px}
  }
  @media (max-width:560px){
    .rl-rules{padding-top:0}
    .rl-rules .rl-card-h{padding-right:0}
    .rl-dial{position:relative;display:block;margin:0 auto -34px;top:auto;right:auto;width:150px;height:150px}
    .rl-card{padding:20px 16px}
    .rl-plan-map{padding:8px 8px 2px}
    .rl-team{right:0;bottom:80px;min-width:150px}
    .rl-tabs button{padding:9px 14px;font-size:13.5px}
    .rl-tabs{margin-bottom:36px}
  }
  @media (prefers-reduced-motion:reduce){.rl-bar{display:none}.rl-stage{animation:none}}
`;
