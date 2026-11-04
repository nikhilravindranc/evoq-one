"use client";
/* eslint-disable @next/next/no-img-element */

import { DEEP, I, INK, LINE, MUTED, NEUTRAL, OK, SAGE, SAND, U } from "./theme";

/* Booking categories: all four booking types visible at once as cards. Each card has a photo with a
   small booking UI, what it is for, and one action: open the microsite, or talk to the team where the
   page is still to come. */

/* booking types that already have their own microsite */
export const LIVE_PAGES: Record<string, string> = {
  space: "/products/bookings/space-and-room-reservations",
  appt: "/products/bookings/appointment-scheduling",
};

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

const SHORT: Record<string, string> = { space: "Spaces", appt: "Appointments" };
const TONE: Record<string, string> = { space: "#B4583A", appt: "#4E6F58", stay: "#9A6B1F", activity: "#4A5E73" };

const css = `
  .bc-sec{padding:112px 20px}
  .bc-in{max-width:1240px;margin:0 auto}
  .bc-head{max-width:720px;margin:0 auto 56px;text-align:center}
  .bc-head .bk-label{margin-bottom:14px}
  .bc-head .bk-lead{margin:18px auto 0}
  .bc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
  .bc-card{position:relative;display:flex;flex-direction:column;border-radius:20px;background:#fff;box-shadow:0 0 0 1px ${LINE};overflow:hidden;transition:box-shadow .25s ease,transform .25s ease}
  .bc-card:hover,.bc-card:focus-within{box-shadow:0 0 0 2px var(--tone),0 28px 48px -32px rgba(38,51,43,.55);transform:translateY(-4px)}
  .bc-photo{position:relative;aspect-ratio:4/3;background:${SAND};overflow:hidden}
  .bc-photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
  .bc-card:hover .bc-photo img{transform:scale(1.04)}
  .bc-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,51,43,0) 45%,rgba(38,51,43,.4));pointer-events:none}
  .bc-ui-wrap{position:absolute;left:12px;right:12px;bottom:12px;z-index:1}
  .bc-ui{padding:8px;border-radius:12px;background:#fff;box-shadow:0 18px 34px -20px rgba(38,51,43,.6);display:grid;gap:8px}
  .bc-ui-head,.bc-row:not(.sel),.bc-txt small,.bc-time{display:none}
  .bc-row{display:grid;grid-template-columns:34px minmax(0,1fr) auto;align-items:center;gap:10px;padding:6px 8px;border-radius:10px;border:1px solid var(--tone);background:#fff}
  .bc-ico{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;background:rgba(100,133,109,.12);color:${DEEP}}
  .bc-ico svg{width:17px;height:17px}
  .bc-av{width:34px;height:34px;border-radius:50%;object-fit:cover}
  .bc-txt{display:grid;min-width:0}
  .bc-txt b{font-size:13px;font-weight:600;color:${INK};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bc-txt small{font-size:11.5px;color:${MUTED};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bc-badge{padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600;white-space:nowrap}
  .bc-badge.ok{background:rgba(22,138,74,.1);color:${OK}}
  .bc-badge.off{background:rgba(104,114,128,.12);color:${NEUTRAL}}
  .bc-time{font-size:11.5px;font-weight:600;color:${DEEP};white-space:nowrap}
  .bc-cap{display:flex;align-items:center;gap:6px}
  .bc-cap i{display:block;width:34px;height:5px;border-radius:3px;background:${LINE};overflow:hidden}
  .bc-cap s{display:block;height:100%;background:${SAGE};border-radius:3px}
  .bc-cap small{font-size:11px;color:${MUTED}}
  .bc-body{display:flex;flex-direction:column;flex:1;padding:22px 22px 24px}
  .bc-name{display:flex;align-items:center;gap:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${MUTED}}
  .bc-name i{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px;background:var(--tone);color:#fff;flex-shrink:0}
  .bc-name i svg{width:17px;height:17px}
  .bc-body h3{margin:14px 0 0!important;font-size:20px;line-height:1.25;letter-spacing:-.01em}
  .bc-fit{margin:10px 0 0;font-size:14.5px;line-height:1.55;color:${MUTED}}
  .bc-go{position:static;display:inline-flex;align-items:center;gap:6px;width:fit-content;margin-top:auto;padding:18px 0 0;border:0;background:none;font:inherit;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:var(--tone);text-decoration:none;cursor:pointer;transition:gap .2s ease}
  .bc-go::after{content:"";position:absolute;inset:0}
  .bc-go svg{width:16px;height:16px}
  .bc-card:hover .bc-go{gap:10px}
  .bc-go:focus-visible{outline:2px solid var(--tone);outline-offset:-4px;border-radius:20px}
  @keyframes bcIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @media (max-width:1100px){.bc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:640px){
    .bc-sec{padding:72px 20px}
    .bc-head{margin-bottom:36px}
    .bc-grid{grid-template-columns:minmax(0,1fr);gap:16px}
    .bc-body{padding:20px}
  }
`;

export function BookingCategories({ onDiscuss }: { onDiscuss: (option: string, key: string) => void }) {
  return (
    <section id="booking-types" className="bc-sec">
      <style>{css}</style>
      <div className="bc-in">
        <div className="bc-head" data-rv="0">
          <span className="bk-label">Booking categories</span>
          <h2 className="bk-h2">Find the booking experience that fits your needs.</h2>
          <p className="bk-lead">Choose the type of booking you offer to see how it works for your organization.</p>
        </div>
        <div className="bc-grid">
          {CATEGORIES.map((c, i) => {
            const href = LIVE_PAGES[c.key];
            const style = { ["--tone" as string]: TONE[c.key] };
            return (
              <article key={c.key} className="bc-card" style={style} data-rv={i}>
                <div className="bc-photo">
                  <img src={c.img} alt={c.alt} loading="lazy" />
                  <div className="bc-ui-wrap" aria-hidden><StageUI k={c.key} /></div>
                </div>
                <div className="bc-body">
                  <span className="bc-name"><i>{I[c.key]}</i>{c.name}</span>
                  <h3>{c.title}</h3>
                  <p className="bc-fit">{c.fit}</p>
                  {href ? (
                    <a className="bc-go" href={href}>Explore {SHORT[c.key]} {I.arrow}</a>
                  ) : (
                    <button type="button" className="bc-go" onClick={() => onDiscuss(c.option, c.key)}>Talk to us about this {I.arrow}</button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
