"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";
import { BG, DEEP, I, INK, LINE, MUTED, NEUTRAL, OK, SAGE, SAND, TERRA, U, useScrollSteps } from "./theme";

/* Booking categories in the Calendly "Scheduling capabilities" pattern: the section pins while you scroll
   and the categories open one after another, each with its own photo and booking UI on the right.
   Photos differ from the hero. On tablets and phones it is not pinned; items open on tap. */

export const CATEGORIES = [
  { key: "space", name: "Space & Room Reservations", title: "Make space reservations easier to organize.", text: "From meeting rooms and prayer rooms to halls and shared facilities, give people a clear way to explore spaces and request reservations according to availability and usage requirements.", fit: "Offices, coworking spaces, religious institutions and community centers.", img: U("1497366754035-f200968a6e72", 1200), alt: "Corridor of glass-walled meeting rooms", option: "Meeting rooms, prayer rooms and shared spaces" },
  { key: "appt", name: "Appointment Scheduling", title: "Make time for the services people need.", text: "Support booking scenarios where availability depends on a service, provider or appointment duration. From consultations and treatments to professional services, the booking process should reflect how each appointment is scheduled.", fit: "Clinics, healthcare practices, consultants and service providers.", img: "/healthcare/pm/stock-frontdesk.jpg", alt: "Visitor speaking with a receptionist at a clinic front desk", option: "Consultations, treatments and professional services" },
  { key: "stay", name: "Hospitality Reservations", title: "Give guests a clearer way to plan their stay.", text: "Hotel rooms, resort stays and villas involve date-based availability and accommodation requirements. A hospitality booking experience needs to account for the details that matter when guests plan a stay.", fit: "Hotels, resorts, villa operators and accommodation providers.", img: U("1611892440504-42a792e24d32", 1200), alt: "Hotel bedroom opening onto a private garden", option: "Hotel rooms, resort stays and villas" },
  { key: "activity", name: "Activities & Facility Booking", title: "Make facilities and activities available to reserve.", text: "Clubs, recreation centers and venues offer more than rooms. Their bookable options may include activity sessions, event spaces, recreational facilities and member amenities, each with its own reservation requirements.", fit: "Clubs, resorts, recreation centers and event venues.", img: U("1782958995190-75701221aab4", 1200), alt: "Indoor swimming pool with lanes and natural light", option: "Club facilities, activities and event spaces" },
] as const;

/* ---------- the booking UI shown on the stage, one per category (illustrative) ---------- */
function StageUI({ k }: { k: (typeof CATEGORIES)[number]["key"] }) {
  if (k === "space")
    return (
      <div className="bc-ui">
        <div className="bc-ui-head"><b>Find a space</b><span className="bc-chips"><em>Today</em><em>2:00 PM</em><em>6+ people</em></span></div>
        {[["Focus Room A", "4 seats · Level 1", "ok", "Available"], ["Prayer Room", "20 seats · Level 2", "ok", "Available"], ["Board Room", "12 seats · Level 3", "off", "Booked until 3 PM"]].map(([a, b, c, d], i) => (
          <div key={a} className={`bc-row${i === 0 ? " sel" : ""}`} style={{ animationDelay: `${180 + i * 90}ms` }}>
            <span className="bc-ico">{I.space}</span><span className="bc-txt"><b>{a}</b><small>{b}</small></span><span className={`bc-badge ${c}`}>{d}</span>
          </div>
        ))}
      </div>
    );
  if (k === "appt")
    return (
      <div className="bc-ui">
        <div className="bc-ui-head"><b>Choose a provider</b><span className="bc-chips"><em>Consultation · 30 min</em></span></div>
        {[["/healthcare/avatars/emily.jpg", "Dr. Emily Carter", "General practice", "Next: 10:15 AM"], ["/healthcare/avatars/rohan.jpg", "Dr. Rohan Mehta", "Dermatology", "Next: 11:30 AM"], ["/healthcare/avatars/olivia.jpg", "Olivia Brooks", "Physiotherapy", "Next: 2:00 PM"]].map(([img, a, b, c], i) => (
          <div key={a} className={`bc-row${i === 1 ? " sel" : ""}`} style={{ animationDelay: `${180 + i * 90}ms` }}>
            <img src={img} alt="" className="bc-av" /><span className="bc-txt"><b>{a}</b><small>{b}</small></span><span className="bc-time">{c}</span>
          </div>
        ))}
      </div>
    );
  if (k === "stay")
    return (
      <div className="bc-ui">
        <div className="bc-ui-head"><b>Select a room</b><span className="bc-chips"><em>12–15 Dec · 3 nights</em><em>2 guests</em></span></div>
        {[["Deluxe King", "Sleeps 2 · City view", "ok", "2 left"], ["Garden Suite", "Sleeps 3 · Private garden", "ok", "Available"], ["Pool Villa", "Sleeps 4 · Plunge pool", "off", "Sold out"]].map(([a, b, c, d], i) => (
          <div key={a} className={`bc-row${i === 1 ? " sel" : ""}`} style={{ animationDelay: `${180 + i * 90}ms` }}>
            <span className="bc-ico">{I.stay}</span><span className="bc-txt"><b>{a}</b><small>{b}</small></span><span className={`bc-badge ${c}`}>{d}</span>
          </div>
        ))}
      </div>
    );
  return (
    <div className="bc-ui">
      <div className="bc-ui-head"><b>This week</b><span className="bc-chips"><em>Members</em><em>All facilities</em></span></div>
      {[["Lane swimming", "Tue · 7:00 AM · Indoor pool", 4, 6], ["Tennis court hire", "Sat · 7:00 AM · Court 2", 2, 4], ["Function hall", "Sun · 6:00 PM · Up to 80 guests", 0, 1]].map(([a, b, n, cap], i) => (
        <div key={a as string} className={`bc-row${i === 0 ? " sel" : ""}`} style={{ animationDelay: `${180 + i * 90}ms` }}>
          <span className="bc-ico">{I.activity}</span>
          <span className="bc-txt"><b>{a}</b><small>{b}</small></span>
          {Number(cap) > 1
            ? <span className="bc-cap"><i><s style={{ width: `${(Number(n) / Number(cap)) * 100}%` }} /></i><small>{n}/{cap}</small></span>
            : <span className="bc-badge ok">Enquire</span>}
        </div>
      ))}
    </div>
  );
}

const css = `
  .bc-scroll{position:relative}
  .bc-sticky{padding:112px 20px}
  .bc-scroll.pinned .bc-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;padding:24px 20px}
  .bc{width:100%;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:72px;align-items:center}
  .bc-head .bk-label{margin-bottom:14px}
  .bc-head .bk-h2{text-align:left}
  .bc-list{margin-top:32px;border-bottom:1px solid ${LINE}}
  .bc-item{position:relative;display:block;width:100%;padding:18px 0;border:0;border-top:1px solid ${LINE};background:none;text-align:left;font:inherit;color:${INK};cursor:pointer}
  .bc-bar{position:absolute;left:0;top:-1px;height:2px;width:0;background:${SAGE};transition:width .12s linear}
  .bc-name{display:flex;align-items:center;gap:12px;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;color:${MUTED};transition:color .3s ease}
  .bc-item.on .bc-name{color:${DEEP}}
  .bc-name i{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:rgba(200,120,90,.1);color:${TERRA};flex-shrink:0;transition:background .3s ease,color .3s ease}
  .bc-name i svg{width:18px;height:18px}
  .bc-item.on .bc-name i{background:${SAGE};color:#fff}
  .bc-more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.2,.7,.2,1)}
  .bc-item.on .bc-more{grid-template-rows:1fr}
  .bc-more>div{overflow:hidden}
  .bc-more h3{margin:12px 0 0!important;font-size:19px;line-height:1.3}
  .bc-more p{margin:6px 0 0;font-size:15px;line-height:1.6;color:${MUTED}}
  .bc-fit{font-size:13.5px!important}
  .bc-fit b{color:${INK};font-weight:600}
  .bc-go{display:inline-flex;align-items:center;gap:6px;margin-top:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:${TERRA};transition:gap .2s ease}
  .bc-go:hover{gap:9px}

  .bc-stage{position:relative;height:min(620px,calc(100vh - 120px));min-height:460px;border-radius:24px;overflow:hidden;background:${SAND}}
  .bc-stage img.bc-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.06);transition:opacity .7s ease,transform 1.2s cubic-bezier(.2,.7,.2,1)}
  .bc-stage img.bc-photo.on{opacity:1;transform:scale(1)}
  .bc-stage::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,51,43,0) 35%,rgba(38,51,43,.38));pointer-events:none}
  .bc-ui-wrap{position:absolute;left:28px;right:28px;bottom:28px;z-index:1;display:flex;justify-content:flex-end}
  .bc-ui{width:min(400px,100%);padding:16px;border-radius:14px;background:#fff;box-shadow:0 26px 50px -26px rgba(38,51,43,.6);display:grid;gap:8px;animation:bcIn .55s cubic-bezier(.2,.7,.2,1) both}
  .bc-ui-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:2px}
  .bc-ui-head b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP};white-space:nowrap}
  .bc-chips{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}
  .bc-chips em{font-style:normal;padding:3px 9px;border-radius:999px;background:${BG};font-size:11.5px;font-weight:600;color:${MUTED};white-space:nowrap}
  .bc-row{display:grid;grid-template-columns:34px minmax(0,1fr) auto;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;border:1px solid ${LINE};animation:bcIn .5s cubic-bezier(.2,.7,.2,1) both}
  .bc-row.sel{border-color:${SAGE};box-shadow:inset 0 0 0 1px ${SAGE}}
  .bc-ico{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;background:rgba(100,133,109,.12);color:${DEEP}}
  .bc-ico svg{width:17px;height:17px}
  .bc-av{width:34px;height:34px;border-radius:50%;object-fit:cover}
  .bc-txt{display:grid;min-width:0}
  .bc-txt b{font-size:13.5px;font-weight:600;color:${INK};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bc-txt small{font-size:12px;color:${MUTED};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bc-badge{padding:3px 9px;border-radius:999px;font-size:11.5px;font-weight:600;white-space:nowrap}
  .bc-badge.ok{background:rgba(22,138,74,.1);color:${OK}}
  .bc-badge.off{background:rgba(104,114,128,.12);color:${NEUTRAL}}
  .bc-time{font-size:12px;font-weight:600;color:${DEEP};white-space:nowrap}
  .bc-cap{display:flex;align-items:center;gap:7px}
  .bc-cap i{display:block;width:54px;height:5px;border-radius:3px;background:${LINE};overflow:hidden}
  .bc-cap s{display:block;height:100%;background:${SAGE};border-radius:3px}
  .bc-cap small{font-size:11.5px;color:${MUTED}}
  @keyframes bcIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.bc-ui,.bc-row{animation:none}.bc-stage img.bc-photo{transition:opacity .2s}}
  @media (max-width:980px){
    .bc{grid-template-columns:1fr;gap:28px}
    .bc-stage{height:auto;min-height:0;aspect-ratio:4/3}
    .bc-head{text-align:center}.bc-head .bk-h2{text-align:center}
  }
  @media (max-width:640px){
    .bc-sticky{padding:72px 20px}
    .bc-stage{aspect-ratio:auto;height:420px;border-radius:16px}
    .bc-ui-wrap{left:12px;right:12px;bottom:12px}
    .bc-ui{padding:12px}
    .bc-chips em:nth-child(n+2){display:none}
  }
`;

export function BookingCategories({ onDiscuss }: { onDiscuss: (option: string, key: string) => void }) {
  const root = useRef<HTMLElement>(null);
  const { index, local, pinned, go } = useScrollSteps(root, CATEGORIES.length);
  const active = CATEGORIES[index];

  return (
    <section ref={root} id="booking-types" className={`bc-scroll${pinned ? " pinned" : ""}`} style={pinned ? { height: `${CATEGORIES.length * 75 + 100}vh` } : undefined}>
      <style>{css}</style>
      <div className="bc-sticky">
        <div className="bc">
          <div>
            <div className="bc-head">
              <span className="bk-label">Booking categories</span>
              <h2 className="bk-h2">Find the booking experience that fits your needs.</h2>
            </div>
            <div className="bc-list" role="tablist" aria-label="Booking categories">
              {CATEGORIES.map((c, i) => {
                const on = i === index;
                return (
                  <div key={c.key} role="tab" tabIndex={0} aria-selected={on} className={`bc-item${on ? " on" : ""}`}
                    onClick={() => go(i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(i); } }}>
                    <span className="bc-bar" style={{ width: on && pinned ? `${Math.round(local * 100)}%` : on ? "100%" : 0 }} />
                    <div className="bc-name"><i>{I[c.key]}</i><span>{c.name}</span></div>
                    <div className="bc-more" aria-hidden={!on}>
                      <div>
                        <h3>{c.title}</h3>
                        <p>{c.text}</p>
                        <p className="bc-fit"><b>Relevant for:</b> {c.fit}</p>
                        <button type="button" className="bc-go" tabIndex={on ? 0 : -1} onClick={(e) => { e.stopPropagation(); onDiscuss(c.option, c.key); }}>Discuss this booking type {I.arrow}</button>
                        {c.key === "space" && <a className="bc-go" style={{ display: "flex", width: "fit-content", textDecoration: "none" }} tabIndex={on ? 0 : -1} href="/products/bookings/space-and-room-reservations" onClick={(e) => e.stopPropagation()}>Explore Space &amp; Room Reservations {I.arrow}</a>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bc-stage" aria-live="polite">
            {CATEGORIES.map((c, i) => <img key={c.key} src={c.img} alt={i === index ? c.alt : ""} className={`bc-photo${i === index ? " on" : ""}`} />)}
            <div className="bc-ui-wrap"><StageUI key={active.key} k={active.key} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
