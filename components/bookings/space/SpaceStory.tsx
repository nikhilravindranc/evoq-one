"use client";
/* eslint-disable @next/next/no-img-element */

import { I, U } from "../theme";
import { useInView } from "./fx";
import { BG, DEEP, LINE, MUTED, NEUTRAL, PRIMARY } from "./palette";
import { SPACE_IMG } from "./ui";

/* The solution and the reasons to choose it, between the challenge and how it works. */

const LEFT = [
  { ic: I.space, t: "Space catalogue", d: "Every room, hall and item with its capacity, equipment and photos." },
  { ic: I.pin, t: "Booking page", d: "A branded page where visitors find a space and ask to book it." },
  { ic: I.rules, t: "Calendar", d: "Every space on its own row, so conflicts show before they happen." },
];
const RIGHT = [
  { ic: I.oversight, t: "Approvals", d: "Requests reach your team, and every decision tells the organizer." },
  { ic: I.clock, t: "Check in", d: "QR code or reference, and unused rooms go back to the pool." },
  { ic: I.layers, t: "Reports", d: "Utilization by location, ready to export." },
];
const LIFE = [
  { ic: I.pin, t: "Requested on the booking page", d: "Sam, Thu 19 Nov" },
  { ic: I.check, t: "Approved by Mia", d: "Confirmation emailed" },
  { ic: I.clock, t: "Checked in by QR code", d: "13:02" },
  { ic: I.layers, t: "Counted in the utilization report", d: "Operations, this week" },
];

const WHY = [
  { img: U("1497366754035-f200968a6e72", 800), t: "A single system", d: "Requests, rules and calendars live together, so nobody retypes a booking.", ic: I.layers },
  { img: U("1724230758718-406bab979e67", 800), t: "Easy for visitors", d: "Find a space, pick a time and send a request from a single booking page.", ic: I.search },
  { img: SPACE_IMG.glass, t: "Rules your team controls", d: "Hours, notice, length, buffers and approval, set for each space.", ic: I.edit },
  { img: U("1759038085950-1234ca8f5fed", 800), t: "A clear view of every location", d: "See what is booked and what sits unused, site by site.", ic: I.pin },
];

function Node({ n, side }: { n: (typeof LEFT)[number]; side: "l" | "r" }) {
  return (
    <div className={`ss-node ${side}`} data-rv="0">
      <span className="ss-ic">{n.ic}</span>
      <span><b>{n.t}</b><small>{n.d}</small></span>
    </div>
  );
}

export function SpaceSolution() {
  const [ref, on] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="sr-out sr-sec ss-all" id="solution">
      <style>{css}</style>
      <div className="sr-in">
        <div className="sr-head c" data-rv="0">
          <h2 className="sr-h2">Run every booking from a single system.</h2>
          <p className="sr-lead">From the first request to the utilization report, each step happens in the same place and tells the next one.</p>
        </div>
        <div className={`ss-hub${on ? " on" : ""}`} ref={ref}>
          <div className="ss-col">{LEFT.map((n) => <Node key={n.t} n={n} side="l" />)}</div>
          <div className="ss-core" data-rv="1">
            <div className="ss-core-h">
              <img src={SPACE_IMG.training} alt="" />
              <span><b>Training Room 2</b><small>Booking BK 20418</small></span>
              <em className="sr-badge ok">Confirmed</em>
            </div>
            <ol>
              {LIFE.map((l, i) => (
                <li key={l.t} style={{ animationDelay: `${i * 1.6}s` }}>
                  <span className="ss-dot">{l.ic}</span>
                  <span><b>{l.t}</b><small>{l.d}</small></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="ss-col">{RIGHT.map((n) => <Node key={n.t} n={n} side="r" />)}</div>
        </div>
      </div>
    </section>
  );
}

export function SpaceWhy() {
  return (
    <section className="sr-out ss-why" id="why">
      <style>{css}</style>
      <div className="sr-in">
        <div className="sr-head c ss-why-h" data-rv="0">
          <h2 className="sr-h2">Why choose Spaces &amp; Rooms?</h2>
          <p className="sr-lead">Four reasons teams move their bookings out of inboxes and spreadsheets.</p>
        </div>
        <div className="ss-why-grid">
          {WHY.map((w, i) => (
            <article key={w.t} className="ss-card" data-rv={i}>
              <img src={w.img} alt="" loading="lazy" />
              <div className="ss-card-b">
                <span className="ss-ic sm">{w.ic}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const css = `
  .ss-all{background:${BG};padding-top:88px;padding-bottom:88px}
  .ss-all .sr-head{margin-bottom:40px}
  .ss-hub{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,380px) minmax(0,1fr);gap:56px;align-items:center}
  .ss-col{display:grid;gap:14px}
  .ss-node{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;align-items:start;background:#fff;border-radius:18px;padding:16px 18px;box-shadow:0 0 0 1px ${LINE}}
  .ss-node span:last-child{display:grid;gap:3px}
  .ss-node b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .ss-node small{font-size:13.5px;line-height:1.45;color:${MUTED}}
  .ss-node::after{content:"";position:absolute;top:50%;width:56px;border-top:2px dashed rgba(180,88,58,.45)}
  .ss-node.l::after{left:100%}.ss-node.r::after{right:100%}
  .ss-node::before{content:"";position:absolute;top:50%;width:9px;height:9px;margin-top:-4px;border-radius:50%;background:${PRIMARY};z-index:1}
  .ss-node.l::before{right:-5px}.ss-node.r::before{left:-5px}
  .ss-ic{width:44px;height:44px;border-radius:12px;background:rgba(180,88,58,.12);color:${PRIMARY};display:grid;place-items:center}
  .ss-ic svg{width:22px;height:22px}.ss-ic.sm{width:40px;height:40px;border-radius:11px}
  .ss-core{background:#fff;border-radius:24px;padding:18px;box-shadow:0 30px 60px -34px rgba(43,33,28,.5),0 0 0 1px ${LINE}}
  .ss-core-h{display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:12px;align-items:center;padding-bottom:14px;border-bottom:1px solid ${LINE}}
  .ss-core-h img{width:52px;height:44px;object-fit:cover;border-radius:9px}
  .ss-core-h span{display:grid}.ss-core-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${DEEP}}.ss-core-h small{font-size:12px;color:${NEUTRAL}}
  .ss-core ol{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:0;position:relative}
  .ss-core li{position:relative;display:grid;grid-template-columns:36px minmax(0,1fr);gap:12px;align-items:center;padding:9px 0;opacity:.45;animation:ssStep 6.4s ease-in-out infinite;animation-play-state:paused}
  .ss-hub.on .ss-core li{animation-play-state:running}
  .ss-core li:not(:last-child)::after{content:"";position:absolute;left:17px;top:44px;bottom:-8px;border-left:2px dashed rgba(180,88,58,.35)}
  .ss-dot{width:36px;height:36px;border-radius:50%;background:#F3E8D8;color:${DEEP};display:grid;place-items:center}.ss-dot svg{width:17px;height:17px}
  .ss-core li span:last-child{display:grid}.ss-core li b{font-size:13.5px;color:${DEEP}}.ss-core li small{font-size:12px;color:${NEUTRAL}}
  @keyframes ssStep{0%,8%{opacity:.45}14%,34%{opacity:1}44%,100%{opacity:.45}}
  .ss-why{background:#fff;padding:88px 20px}
  .ss-why-h{margin-bottom:36px}
  .ss-why-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
  .ss-card{border-radius:20px;overflow:hidden;background:${BG};box-shadow:0 0 0 1px ${LINE};display:flex;flex-direction:column}
  .ss-card>img{width:100%;height:170px;object-fit:cover;display:block}
  .ss-card-b{padding:18px 20px 22px;display:grid;gap:8px;align-content:start;position:relative}
  .ss-card-b .ss-ic{margin-top:-38px;box-shadow:0 8px 18px -8px rgba(43,33,28,.45);background:#fff}
  .ss-card h3{font-size:18px;line-height:1.25;margin:2px 0 0!important}
  .ss-card p{margin:0;font-size:14.5px;line-height:1.5;color:${MUTED}}
  @media (max-width:1100px){.ss-hub{grid-template-columns:minmax(0,1fr) minmax(0,340px) minmax(0,1fr);gap:40px}.ss-node::after{width:40px}}
  @media (max-width:980px){
    .ss-hub{grid-template-columns:minmax(0,1fr);gap:18px}.ss-core{order:-1;max-width:420px;width:100%;margin:0 auto}
    .ss-col{grid-template-columns:repeat(2,minmax(0,1fr))}.ss-node::after,.ss-node::before{display:none}
    .ss-why-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  }
  @media (max-width:600px){.ss-col,.ss-why-grid{grid-template-columns:minmax(0,1fr)}.ss-all,.ss-why{padding-top:64px;padding-bottom:64px}}
  @media (prefers-reduced-motion:reduce){.ss-core li{animation:none;opacity:1}}
`;
