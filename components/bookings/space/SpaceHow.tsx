"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { I } from "../theme";
import { useInView } from "./fx";
import { BG, DEEP, MUTED, PRIMARY, SAND } from "./palette";
import { BookingFlowUI, CatalogueUI, ReportsUI, ReservationUI, SPACE_IMG } from "./ui";

/* How it works, as a tabbed box: four steps from a new space to a utilization report. The steps take
   turns once while the box is on screen, and a click hands control over. */

const STEPS = [
  {
    k: "Set up spaces", t: "Set up your spaces",
    d: "Add each room, hall and shared item once, with the details people look for before they book.",
    pts: ["Capacity, floor and location", "Amenities, equipment and photos", "Status, so a blocked room is never offered"],
    img: SPACE_IMG.glass, ui: <CatalogueUI count={2} />,
  },
  {
    k: "Publish a booking page", t: "Publish a booking page",
    d: "Share a branded page where visitors find a space, pick a time and answer your questions.",
    pts: ["Search by date, time and capacity", "Layout and equipment choices", "Clear status before they send the request"],
    img: SPACE_IMG.lounge, ui: <BookingFlowUI />,
  },
  {
    k: "Approve and notify", t: "Approve and notify",
    d: "Requests reach your team with the organizer and a booking reference. Every decision tells the organizer.",
    pts: ["Approve, reject or reschedule from the record", "Setup and cleanup time held around the session", "Confirmation and changes sent by email"],
    img: SPACE_IMG.training, ui: <ReservationUI />,
  },
  {
    k: "Track and report", t: "Track and report",
    d: "See what is booked today, who arrived and which spaces sit unused, across every location.",
    pts: ["Check in by QR code or reference", "No shows marked in the booking", "Utilization by location, exported to CSV"],
    img: SPACE_IMG.corridor, ui: <ReportsUI />,
  },
];
const DWELL = 8000;

export function SpaceHow() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  useEffect(() => {
    if (!auto || !seen || i >= STEPS.length - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => n + 1), DWELL);
    return () => clearTimeout(t);
  }, [i, auto, seen]);
  const s = STEPS[i];
  return (
    <section className="sr-out sr-sec hw" id="how-it-works">
      <style>{css}</style>
      <div className="sr-in">
        <div className="sr-head c" data-rv="0">
          <span className="sr-label">How it works</span>
          <h2 className="sr-h2">From a new space to a utilization report.</h2>
        </div>
        <div className="hw-tabs" role="tablist" aria-label="How it works" data-rv="1">
          {STEPS.map((x, n) => (
            <button key={x.k} type="button" role="tab" aria-selected={i === n} className={i === n ? "on" : ""} onClick={() => { setAuto(false); setI(n); }}>
              {i === n && auto && seen && n < STEPS.length - 1 && <i className="hw-bar" aria-hidden />}
              <b>{n + 1}</b>{x.k}
            </button>
          ))}
        </div>
        <div className="hw-box" ref={ref} data-rv="2">
          <div className="hw-copy" key={`c${i}`}>
            <span className="hw-n">{i + 1}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            <ul>{s.pts.map((p) => <li key={p}>{I.check}{p}</li>)}</ul>
          </div>
          <div className="hw-vis" key={`v${i}`}>
            <img src={s.img} alt="" loading="lazy" />
            <div className="hw-ui">{s.ui}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .hw{background:${BG}}
  .hw-tabs{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:-18px 0 26px}
  .hw-tabs button{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:9px;border:1px solid #EADFD4;background:#fff;color:${MUTED};border-radius:999px;padding:9px 18px 9px 10px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:14.5px;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease}
  .hw-tabs button b{width:22px;height:22px;border-radius:50%;background:#F3E8D8;color:${DEEP};display:grid;place-items:center;font-size:11.5px}
  .hw-tabs button:hover{border-color:${PRIMARY}}
  .hw-tabs button.on{background:${DEEP};border-color:${DEEP};color:#fff}
  .hw-tabs button.on b{background:#fff;color:${DEEP}}
  .hw-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:${SAND};transform-origin:left;animation:hwBar ${DWELL}ms linear forwards}
  @keyframes hwBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  .hw-box{position:relative;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:48px;align-items:center;padding:40px 44px;border-radius:30px;background:#F6EDE0;overflow:hidden;box-shadow:0 0 0 1px rgba(43,33,28,.05)}
  .hw-box::before{content:"";position:absolute;right:-120px;top:-140px;width:460px;height:460px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,185,140,.55),rgba(217,185,140,0));pointer-events:none}
  .hw-copy,.hw-vis{position:relative;animation:hwIn .4s ease both}
  @keyframes hwIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .hw-n{width:36px;height:36px;border-radius:50%;background:${PRIMARY};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15px}
  .hw-copy h3{font-size:28px;line-height:1.15;letter-spacing:-.015em;margin:16px 0 12px!important}
  .hw-copy p{margin:0;color:${MUTED};font-size:16.5px}
  .hw-copy ul{list-style:none;margin:18px 0 0;padding:0;display:grid;gap:9px}
  .hw-copy li{display:flex;gap:9px;align-items:flex-start;font-size:15px;color:#2B211C}
  .hw-copy li svg{width:16px;height:16px;color:${PRIMARY};flex-shrink:0;margin-top:4px}
  .hw-vis{padding-bottom:30px}
  .hw-vis>img{width:100%;height:340px;object-fit:cover;border-radius:22px;display:block}
  .hw-ui{position:absolute;right:-8px;bottom:0;width:min(62%,370px)}
  .hw-ui .sr-win{box-shadow:0 30px 60px -26px rgba(43,33,28,.55),0 0 0 1px rgba(43,33,28,.08)}
  @media (max-width:980px){
    .hw-box{grid-template-columns:minmax(0,1fr);gap:28px;padding:28px 24px}
    .hw-vis>img{height:280px}.hw-ui{right:10px;width:min(70%,340px)}
  }
  @media (max-width:560px){
    .hw-tabs button{padding:8px 12px 8px 8px;font-size:13px}
    .hw-tabs{margin-bottom:18px}
    .hw-box{padding:22px 16px;border-radius:24px}
    .hw-vis{padding-bottom:0}.hw-vis>img{height:220px}
    .hw-ui{position:relative;right:auto;width:auto;margin-top:-52px;padding:0 10px;z-index:1}
  }
  @media (prefers-reduced-motion:reduce){.hw-bar{display:none}.hw-copy,.hw-vis{animation:none}}
`;
