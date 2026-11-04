"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { FloorPlan } from "./FloorPlan";
import { BG, DEEP, I, INK, LINE, MUTED, OK, SAGE, TERRA, U, useScrollSteps } from "./theme";

/* How booking works. Each step pairs a photo with the booking UI for that moment, over an
   architectural floor-plan layer; the step text sits beside it and a progress rail runs underneath.
   The section pins while you scroll so the steps play in order (on phones, steps change on tap).
   Content is illustrative. */

const STEPS = [
  { title: "Explore availability", text: "Identify the relevant room, space, service, accommodation or activity and review the available options." },
  { title: "Provide booking details", text: "Enter the information required for the reservation, such as the date, time, duration, guest details or preferred service." },
  { title: "Complete the reservation", text: "Submit the booking and receive the relevant reservation details according to the applicable booking process." },
];
const PHOTO = {
  room: U("1431540015161-0bf868a2d407", 900),
  team: U("1573164574572-cb89e39749b4", 1000),
  done: U("1606836591695-4d58a73eba1e", 1000),
};

/* the other three booking types share one scene layout, driven by this data */
const OTHER = [
  {
    key: "appt", label: "Appointments",
    photos: ["/healthcare/pm/stock-patient.jpg", U("1573164574572-cb89e39749b4", 1000), U("1606836591695-4d58a73eba1e", 1000)],
    steps: [
      { title: "Choose a service and provider", text: "Pick the service, then the provider and a time from the open slots." },
      { title: "Confirm your details", text: "Add contact details and any notes the provider needs before the visit." },
      { title: "Receive the confirmation", text: "The appointment is confirmed, with reminders and a link to reschedule or cancel." },
    ],
    pick: { title: "Available times", items: [["Initial consultation", "30 min · Dr. Dana", "10:30"], ["Initial consultation", "30 min · Dr. Marcus", "11:00"], ["Follow-up visit", "15 min · Dr. Dana", "11:45"]] },
    form: { title: "Your details", sub: "Initial consultation", fields: [["Name", "Sam Carter"], ["Email", "sam@example.com"], ["Notes", "First visit"]] },
    done: { title: "Appointment confirmed", ref: "Reminder set for the day before", rows: [["Service", "Initial consultation"], ["When", "Thu, 19 Nov · 10:30 AM"]] },
  },
  {
    key: "stay", label: "Stays",
    photos: [U("1596178067639-5c6e68aea6dc", 1000), U("1573164574572-cb89e39749b4", 1000), U("1596178067639-5c6e68aea6dc", 1000)],
    steps: [
      { title: "Choose dates and a room", text: "Select the dates and guests, then compare the rooms that are open for the stay." },
      { title: "Add guest details", text: "Enter the guest information, preferences and any extras for the stay." },
      { title: "Confirm the stay", text: "Submit the booking and send the stay details to the guest." },
    ],
    pick: { title: "Open rooms", items: [["Garden Room", "2 guests · 2 nights", "Open"], ["Deluxe Suite", "3 guests · 2 nights", "Open"], ["Family Room", "4 guests · 2 nights", "Open"]] },
    form: { title: "Guest details", sub: "Garden Room", fields: [["Guest", "Sam Carter"], ["Stay", "19 – 21 Nov, 2 nights"], ["Requests", "Late check-in"]] },
    done: { title: "Stay confirmed", ref: "Details sent to the guest", rows: [["Room", "Garden Room"], ["Stay", "19 – 21 Nov"]] },
  },
  {
    key: "activity", label: "Facilities",
    photos: [U("1499510318569-1a3d67dc3976", 1000), U("1573164574572-cb89e39749b4", 1000), U("1499510318569-1a3d67dc3976", 1000)],
    steps: [
      { title: "Choose a facility and slot", text: "Find the court, studio or activity and pick an open time slot." },
      { title: "Add group details", text: "Enter the group size, contact details and any equipment needed." },
      { title: "Confirm the booking", text: "Submit the booking and send the confirmation with the slot details." },
    ],
    pick: { title: "Open slots", items: [["Court 2", "60 min · Thursday", "18:00"], ["Court 3", "60 min · Thursday", "19:00"], ["Studio A", "45 min · Thursday", "19:30"]] },
    form: { title: "Group details", sub: "Court 2", fields: [["Name", "Sam Carter"], ["Group size", "4 players"], ["Equipment", "Rackets"]] },
    done: { title: "Booking confirmed", ref: "Confirmation sent", rows: [["Facility", "Court 2"], ["When", "Thu, 19 Nov · 6:00 PM"]] },
  },
];

const TYPES = [
  { key: "space", label: "Spaces", steps: STEPS },
  ...OTHER.map((o) => ({ key: o.key, label: o.label, steps: o.steps })),
];

function OtherScene({ t, n, on }: { t: number; n: number; on: boolean }) {
  const d = OTHER[t - 1];
  return (
    <div className={`bs-scene${on ? " on" : ""}`} aria-hidden={!on}>
      <div className="bs-photo"><img src={d.photos[n]} alt="" /></div>
      {n === 0 && (
        <div className="bs-card bs-pick">
          <b>{d.pick.title}</b>
          {d.pick.items.map(([a, m, t2], i) => (
            <div key={a + m} className={`bs-opt${i === 0 ? " sel" : ""}`}><span><strong>{a}</strong><small>{m}</small></span><em>{t2}</em></div>
          ))}
        </div>
      )}
      {n === 1 && (
        <div className="bs-card bs-form">
          <div className="bs-r"><b>{d.form.title}</b><small>{d.form.sub}</small></div>
          {d.form.fields.map(([a, b], i) => (
            <label key={a} className={`bs-field${i === 2 ? " focus" : ""}`}><small>{a}</small><span>{b}{i === 2 && <i className="bs-caret" />}</span></label>
          ))}
        </div>
      )}
      {n === 2 && (
        <div className="bs-card bs-done">
          <span className="bs-tick">{I.check}</span>
          <b>{d.done.title}</b>
          <small>{d.done.ref}</small>
          <dl>{d.done.rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
          <span className="bs-badge ok">Confirmed</span>
        </div>
      )}
    </div>
  );
}

function Scene({ n, on }: { n: number; on: boolean }) {
  return (
    <div className={`bs-scene${on ? " on" : ""}`} aria-hidden={!on}>
      {n === 0 && (
        <>
          <div className="bs-plan"><FloorPlan states={{ a: "sel", b: "free", c: "busy", d: "free", e: "busy", f: "free" }} /></div>
          <div className="bs-card bs-room">
            <img src={PHOTO.room} alt="" />
            <div className="bs-room-body">
              <div className="bs-r"><b>Focus Room A</b><span className="bs-badge ok">Available</span></div>
              <small>4 seats · Level 1</small>
              <div className="bs-tags"><em>Screen</em><em>Whiteboard</em><em>Natural light</em></div>
            </div>
          </div>
          <div className="bs-card bs-key">
            <span><i className="free" />Available</span><span><i className="busy" />Booked</span><span><i className="sel" />Selected</span>
          </div>
        </>
      )}
      {n === 1 && (
        <>
          <div className="bs-photo"><img src={PHOTO.team} alt="" /></div>
          <div className="bs-plan small"><FloorPlan labels={false} states={{ a: "sel" }} /></div>
          <div className="bs-card bs-form">
            <div className="bs-r"><b>Booking details</b><small>Focus Room A</small></div>
            {[["Date", "Thu, 19 Nov 2026"], ["Time", "10:30 – 11:30 AM"], ["Attendees", "4 people"]].map(([a, b], i) => (
              <label key={a} className={`bs-field${i === 2 ? " focus" : ""}`}><small>{a}</small><span>{b}{i === 2 && <i className="bs-caret" />}</span></label>
            ))}
          </div>
        </>
      )}
      {n === 2 && (
        <>
          <div className="bs-photo"><img src={PHOTO.done} alt="" /></div>
          <div className="bs-card bs-done">
            <span className="bs-tick">{I.check}</span>
            <b>Reservation submitted</b>
            <small>Reference BK-2026-0418</small>
            <dl>
              <div><dt>Space</dt><dd>Focus Room A</dd></div>
              <div><dt>When</dt><dd>Thu, 19 Nov · 10:30 AM</dd></div>
            </dl>
            <span className="bs-badge ok">Confirmed</span>
          </div>
        </>
      )}
    </div>
  );
}

const css = `
  .bs-scroll{position:relative}
  .bs-sticky{padding:112px 20px}
  .bs-scroll.pinned .bs-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;padding:24px 20px}
  .bs{width:100%;max-width:1240px;margin:0 auto;display:grid;gap:40px}
  .bs-head{text-align:center;max-width:760px;margin:0 auto}
  .bs-head .bk-label{margin-bottom:14px}
  .bs-main{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:72px;align-items:center}

  .bs-visual{position:relative;height:min(460px,calc(100vh - 330px));min-height:360px}
  .bs-scene{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .5s ease,visibility 0s linear .5s}
  .bs-scene.on{opacity:1;visibility:visible;transition:opacity .5s ease}
  .bs-scene.on .bs-card{animation:bsIn .6s cubic-bezier(.2,.7,.2,1) both}
  .bs-scene.on .bs-card:nth-of-type(2){animation-delay:.12s}
  .bs-plan{position:absolute;left:0;top:0;width:78%;padding:18px;border-radius:18px;background:#fff;border:1px solid ${LINE};box-shadow:0 30px 60px -44px rgba(38,51,43,.5)}
  .bs-plan svg{display:block;width:100%;height:auto}
  .bs-plan.small{left:6%;top:auto;bottom:0;width:36%;padding:10px}
  .bs-photo{position:absolute;left:0;top:0;width:76%;height:88%;border-radius:18px;overflow:hidden;background:${BG}}
  .bs-photo img{width:100%;height:100%;object-fit:cover}
  .bs-card{position:absolute;padding:14px;border-radius:14px;background:#fff;box-shadow:0 26px 50px -26px rgba(38,51,43,.55);font-size:13px;color:${INK}}
  .bs-r{display:flex;justify-content:space-between;align-items:center;gap:10px}
  .bs-card b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}
  .bs-card small{font-size:12px;color:${MUTED}}
  .bs-room{right:0;bottom:0;width:250px;padding:0;overflow:hidden}
  .bs-room img{display:block;width:100%;height:120px;object-fit:cover}
  .bs-room-body{display:grid;gap:4px;padding:12px 14px 14px}
  .bs-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
  .bs-tags em{font-style:normal;padding:3px 8px;border-radius:999px;background:${BG};font-size:11px;font-weight:600;color:${MUTED}}
  .bs-key{left:18px;bottom:22px;display:flex;gap:12px;padding:9px 12px}
  .bs-key span{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;color:${MUTED}}
  .bs-key i{width:10px;height:10px;border-radius:3px}
  .bs-key i.free{background:rgba(100,133,109,.3)}.bs-key i.busy{background:rgba(200,120,90,.35)}.bs-key i.sel{background:${SAGE}}
  .bs-form{right:0;top:8%;width:270px;display:grid;gap:9px}
  .bs-field{display:grid;gap:3px}
  .bs-field small{font-size:11.5px;font-weight:500}
  .bs-field span{display:flex;align-items:center;min-height:36px;padding:0 10px;border-radius:8px;border:1px solid ${LINE};font-size:13px;color:${INK}}
  .bs-field.focus span{border-color:${SAGE};box-shadow:0 0 0 3px rgba(100,133,109,.16)}
  .bs-caret{display:inline-block;width:1.5px;height:15px;margin-left:2px;background:${INK};animation:bsBlink 1s steps(1) infinite}
  .bs-done{right:0;bottom:6%;width:270px;display:grid;justify-items:center;gap:4px;text-align:center;padding:20px 16px}
  .bs-done b{font-size:16px}
  .bs-done dl{width:100%;margin:10px 0 6px;display:grid;gap:5px;padding-top:10px;border-top:1px solid ${LINE}}
  .bs-done dl div{display:flex;justify-content:space-between;font-size:12.5px}
  .bs-done dt{color:${MUTED}}.bs-done dd{margin:0;font-weight:600}
  .bs-tick{display:flex;align-items:center;justify-content:center;width:52px;height:52px;margin-bottom:6px;border-radius:50%;background:rgba(22,138,74,.1);color:${OK};animation:bsPop .6s cubic-bezier(.2,1.4,.4,1) both}
  .bs-tick svg{width:24px;height:24px}
  .bs-badge{padding:3px 9px;border-radius:999px;font-size:11.5px;font-weight:600}
  .bs-badge.ok{background:rgba(22,138,74,.1);color:${OK}}

  .bs-pick{right:0;bottom:8%;width:290px;display:grid;gap:8px}
  .bs-opt{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 11px;border-radius:10px;border:1px solid ${LINE}}
  .bs-opt.sel{border-color:${SAGE};background:rgba(100,133,109,.08)}
  .bs-opt span{display:grid;gap:1px}
  .bs-opt strong{font-size:13px;color:${DEEP};font-weight:600}
  .bs-opt em{font-style:normal;font-size:12px;font-weight:700;color:${SAGE};white-space:nowrap}
  .bs-types{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:22px}
  .bs-type{padding:9px 18px;border-radius:999px;border:1px solid #D6DAD3;background:#fff;font:inherit;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${MUTED};cursor:pointer;transition:background .18s ease,color .18s ease,border-color .18s ease}
  .bs-type:hover{border-color:${SAGE};color:${DEEP}}
  .bs-type.on{background:${SAGE};border-color:${SAGE};color:#fff}

  .bs-copy{position:relative;min-height:220px}
  .bs-text{position:absolute;inset:0 0 auto;opacity:0;transform:translateY(16px);transition:opacity .45s ease,transform .45s cubic-bezier(.2,.7,.2,1);pointer-events:none}
  .bs-text.on{position:relative;opacity:1;transform:none;pointer-events:auto}
  .bs-step-ico{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:${SAGE};color:#fff}
  .bs-step-ico svg{width:20px;height:20px}
  .bs-text .bs-num{display:block;margin-top:18px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${TERRA}}
  .bs-text h3{margin-top:6px!important;font-size:28px;line-height:1.2}
  .bs-text p{margin:12px 0 0;max-width:42ch;font-size:16.5px;line-height:1.65;color:${MUTED}}

  .bs-rail{display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;gap:20px}
  .bs-arrow{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;border:1px solid #D6DAD3;background:#fff;color:${DEEP};cursor:pointer;transition:background .18s ease,color .18s ease,border-color .18s ease}
  .bs-arrow:hover:not(:disabled){background:${SAGE};border-color:${SAGE};color:#fff}
  .bs-arrow:disabled{opacity:.35;cursor:default}
  .bs-arrow.prev svg{transform:rotate(180deg)}
  .bs-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
  .bs-tab{display:grid;gap:10px;padding:0;border:0;background:none;font:inherit;text-align:left;cursor:pointer}
  .bs-tab i{display:block;height:3px;border-radius:3px;background:${LINE};overflow:hidden}
  .bs-tab i s{display:block;height:100%;width:0;background:${SAGE};transition:width .15s linear}
  .bs-tab span{font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${MUTED};transition:color .3s ease}
  .bs-tab.on span{color:${TERRA}}

  @keyframes bsIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
  @keyframes bsPop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}
  @keyframes bsBlink{50%{opacity:0}}
  @media (prefers-reduced-motion:reduce){.bs-scene.on .bs-card,.bs-tick,.bs-caret{animation:none}}
  @media (max-width:980px){
    .bs-main{grid-template-columns:1fr;gap:32px}
    .bs-visual{height:420px}
    .bs-copy{min-height:0;text-align:center}
    .bs-text p{margin-left:auto;margin-right:auto}
    .bs-step-ico{margin:0 auto}
  }
  @media (max-width:640px){
    .bs-sticky{padding:72px 20px}
    .bs{gap:28px}
    .bs-visual{height:360px;min-height:0}
    .bs-plan{width:92%;padding:10px}
    .bs-photo{width:92%;height:78%}
    .bs-room{width:200px}.bs-room img{height:84px}
    .bs-form,.bs-done,.bs-pick{width:230px}
    .bs-key{display:none}
    .bs-plan.small{display:none}
    .bs-text h3{font-size:23px}
    .bs-rail{grid-template-columns:1fr}
    .bs-arrow{display:none}
    .bs-tab span{font-size:11.5px}
  }
`;

const ICONS = [I.search, I.edit, I.check];

export function BookingSteps() {
  const root = useRef<HTMLElement>(null);
  const { index, local, pinned, go } = useScrollSteps(root, STEPS.length);
  const [type, setType] = useState(0);
  const steps = TYPES[type].steps;

  return (
    <section ref={root} id="how-it-works" className={`bs-scroll${pinned ? " pinned" : ""}`} style={pinned ? { height: `${STEPS.length * 70 + 100}vh` } : undefined}>
      <style>{css}</style>
      <div className="bs-sticky">
        <div className="bs">
          <div className="bs-head">
            <span className="bk-label">How booking works</span>
            <h2 className="bk-h2">From choosing an option to making a reservation.</h2>
            <div className="bs-types" role="group" aria-label="Booking type">
              {TYPES.map((t, i) => (
                <button key={t.key} type="button" className={`bs-type${i === type ? " on" : ""}`} aria-pressed={i === type} onClick={() => setType(i)}>{t.label}</button>
              ))}
            </div>
          </div>

          <div className="bs-main">
            <div className="bs-visual">
              {type === 0
                ? STEPS.map((s, i) => <Scene key={s.title} n={i} on={i === index} />)
                : STEPS.map((s, i) => <OtherScene key={TYPES[type].key + i} t={type} n={i} on={i === index} />)}
            </div>
            <div className="bs-copy" aria-live="polite">
              {steps.map((s, i) => (
                <div key={TYPES[type].key + s.title} className={`bs-text${i === index ? " on" : ""}`} aria-hidden={i !== index}>
                  <span className="bs-step-ico">{ICONS[i]}</span>
                  <span className="bs-num">Step 0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bs-rail">
            <button type="button" className="bs-arrow prev" aria-label="Previous step" disabled={index === 0} onClick={() => go(index - 1)}>{I.arrow}</button>
            <div className="bs-tabs">
              {steps.map((s, i) => (
                <button key={s.title} type="button" className={`bs-tab${i === index ? " on" : ""}`} aria-pressed={i === index} onClick={() => go(i)}>
                  <i><s style={{ width: i < index ? "100%" : i === index ? `${pinned ? Math.round(local * 100) : 100}%` : 0 }} /></i>
                  <span>Step 0{i + 1}</span>
                </button>
              ))}
            </div>
            <button type="button" className="bs-arrow" aria-label="Next step" disabled={index === STEPS.length - 1} onClick={() => go(index + 1)}>{I.arrow}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
