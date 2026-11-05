"use client";

import { useRef } from "react";
import { DEEP, I, INK, LINE, MUTED, OK, SAGE, TERRA, useScrollSteps } from "./theme";

/* How booking works. An inset panel with four cards, one per booking type. The active card opens to show its
   three steps and the booking moment on a soft gradient; the others stay narrow. On large screens the section
   pins and the cards open one after another as you scroll (the same pattern as the booking categories); on
   smaller screens the cards stack and open on tap. Content is illustrative. */

const TYPES = [
  {
    key: "space", name: "Spaces", line: "Reserve rooms and shared spaces.",
    steps: [
      { title: "Explore availability", text: "Browse rooms and spaces and see what is open for the date and time." },
      { title: "Provide booking details", text: "Enter the date, time, duration and number of people." },
      { title: "Complete the reservation", text: "Submit the request and receive the reservation details." },
    ],
    card: { title: "Focus Room A", meta: "Thu, 19 Nov · 4 people", chips: ["10:30", "11:30", "14:00"], on: 0 },
    glow: "linear-gradient(160deg,#F7DCCB 0%,#EEC7A6 55%,#FBEFDB 100%)",
  },
  {
    key: "appt", name: "Appointments", line: "Book a service with a provider.",
    steps: [
      { title: "Choose a service and provider", text: "Pick the service, then a provider and a time from the open slots." },
      { title: "Confirm your details", text: "Add contact details and any notes the provider needs." },
      { title: "Receive the confirmation", text: "Get the confirmation, with a link to reschedule or cancel." },
    ],
    card: { title: "Initial consultation", meta: "Dr. Priya · 30 min", chips: ["10:30", "14:30", "15:00"], on: 1 },
    glow: "linear-gradient(160deg,#D3E5D7 0%,#B6D3BE 55%,#F0F6EC 100%)",
  },
  {
    key: "stay", name: "Stays", line: "Plan a stay by dates and guests.",
    steps: [
      { title: "Choose dates and a room", text: "Select the dates and guests, then compare the rooms open for the stay." },
      { title: "Add guest details", text: "Enter guest information, preferences and any extras." },
      { title: "Confirm the stay", text: "Submit the booking and send the stay details to the guest." },
    ],
    card: { title: "Garden Room", meta: "19 – 21 Nov · 2 guests", chips: ["2 nights", "Late check-in", "Garden view"], on: 0 },
    glow: "linear-gradient(160deg,#F5E4B8 0%,#E8CC8C 55%,#FBF4DE 100%)",
  },
  {
    key: "activity", name: "Facilities", line: "Reserve courts, studios and activities.",
    steps: [
      { title: "Choose a facility and slot", text: "Find the court, studio or activity and pick an open time." },
      { title: "Add group details", text: "Enter the group size, contact details and any equipment needed." },
      { title: "Confirm the booking", text: "Submit the booking and send the confirmation with the slot details." },
    ],
    card: { title: "Court 2", meta: "Thu, 19 Nov · 4 players", chips: ["18:00", "19:00", "20:00"], on: 0 },
    glow: "linear-gradient(160deg,#D2DEEA 0%,#B3C6DA 55%,#EFF3F8 100%)",
  },
] as const;

const ICONS = [I.search, I.edit, I.check];

const css = `
  .bs-scroll{position:relative}
  .bs-sticky{padding:96px 20px}
  .bs-scroll.pinned .bs-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;padding:20px}
  .bs-panel{width:100%;max-width:clamp(1240px,76vw,1480px);margin:0 auto;padding:56px 40px 40px;border-radius:32px;background:rgba(100,133,109,.09)}
  .bs-scroll.pinned .bs-panel{padding:36px 40px 32px}
  .bs-head{text-align:center;max-width:720px;margin:0 auto 36px}
  .bs-scroll.pinned .bs-head{margin-bottom:26px}
  .bs-head .bk-label{margin-bottom:14px}
  .bs-head .bk-lead{margin:16px auto 0}
  .bs-cards{display:flex;gap:16px;height:min(clamp(500px,34vw,600px),calc(100vh - 330px));min-height:420px}
  .bs-card{position:relative;flex:1 1 0;min-width:0;display:flex;flex-direction:column;overflow:hidden;padding:26px 26px 0;border:0;border-radius:24px;background:#fff;text-align:left;font:inherit;color:inherit;cursor:pointer;box-shadow:0 1px 0 rgba(30,45,34,.04);transition:flex-grow .6s cubic-bezier(.2,.7,.2,1)}
  .bs-card.on{flex-grow:3.1;cursor:default}
  .bs-card:focus-visible{outline:2px solid ${SAGE};outline-offset:3px}
  .bs-card h3{margin:0!important;font-size:24px;line-height:1.2;white-space:nowrap}
  .bs-line{margin:8px 0 0;font-size:15px;line-height:1.5;color:${MUTED}}
  .bs-body{display:grid;gap:14px;margin-top:18px;opacity:0;transform:translateY(10px);transition:opacity .35s ease,transform .45s ease;pointer-events:none;height:0;overflow:hidden}
  .bs-card.on .bs-body{opacity:1;transform:none;pointer-events:auto;height:auto;overflow:visible;transition-delay:.18s}
  .bs-step{display:grid;grid-template-columns:30px minmax(0,1fr);gap:12px;align-items:start}
  .bs-step i{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:rgba(100,133,109,.13);color:${DEEP}}
  .bs-step i svg{width:16px;height:16px}
  .bs-step b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;color:${DEEP};line-height:1.3}
  .bs-step small{display:block;margin-top:2px;font-size:13.5px;line-height:1.45;color:${MUTED}}
  .bs-glow{position:relative;margin:auto -26px 0;height:41%;min-height:140px;border-radius:24px 24px 0 0;overflow:hidden;opacity:.55;transition:opacity .5s ease}
  .bs-card.on .bs-glow{opacity:1}
  .bs-glow::before{content:"";position:absolute;inset:0;background:var(--glow)}
  .bs-mark{position:absolute;left:50%;bottom:-34px;width:150px;height:150px;transform:translateX(-50%);display:grid;place-items:center;border-radius:46px 46px 0 0;background:rgba(255,255,255,.45);color:rgba(30,45,34,.5)}
  .bs-mark svg{width:58px;height:58px}
  .bs-card.on .bs-mark{opacity:0}
  .bs-mock{position:absolute;left:50%;bottom:22px;width:min(330px,calc(100% - 44px));transform:translate(-50%,24px);opacity:0;padding:14px;border-radius:16px;background:#fff;box-shadow:0 24px 44px -22px rgba(30,45,34,.55);transition:opacity .45s ease .25s,transform .55s cubic-bezier(.2,.7,.2,1) .25s}
  .bs-card.on .bs-mock{opacity:1;transform:translate(-50%,0)}
  .bs-mock-t{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .bs-mock-t b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}
  .bs-ok{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;background:rgba(22,138,74,.1);font-size:11.5px;font-weight:600;color:${OK};white-space:nowrap}
  .bs-ok svg{width:12px;height:12px}
  .bs-mock small{display:block;margin-top:2px;font-size:12.5px;color:${MUTED}}
  .bs-chips{display:flex;gap:6px;margin-top:11px}
  .bs-chips span{flex:1;padding:6px 4px;text-align:center;border-radius:8px;box-shadow:0 0 0 1px ${LINE};font-size:12px;font-weight:600;color:${INK};white-space:nowrap}
  .bs-chips span.sel{background:${SAGE};color:#fff;box-shadow:none}
  .bs-dots{display:flex;justify-content:center;gap:8px;margin-top:22px}
  .bs-dots button{width:8px;height:8px;padding:0;border:0;border-radius:50%;background:rgba(30,45,34,.2);cursor:pointer;transition:background .2s ease,transform .2s ease}
  .bs-dots button.on{background:${TERRA};transform:scale(1.25)}
  @media (min-width:1600px){
    .bs-card{padding:32px 32px 0}
    .bs-card h3{font-size:30px}.bs-line{font-size:17px}
    .bs-body{gap:20px;margin-top:24px}
    .bs-step{grid-template-columns:36px minmax(0,1fr);gap:14px}.bs-step i{width:36px;height:36px}.bs-step i svg{width:18px;height:18px}
    .bs-step b{font-size:18px}.bs-step small{font-size:15px}
    .bs-glow{margin:auto -32px 0}
  }
  @media (max-width:1100px){.bs-card h3{font-size:21px}.bs-card.on{flex-grow:3.6}}
  @media (max-width:980px){
    .bs-sticky{padding:72px 20px}
    .bs-panel{padding:40px 20px 24px;border-radius:24px}
    .bs-cards{flex-direction:column;height:auto;min-height:0;gap:12px}
    .bs-card{flex:none;padding:20px 20px 0;transition:none}
    .bs-card.on{flex-grow:0}
    .bs-card:not(.on){padding-bottom:20px}
    .bs-glow{margin:20px -20px 0;height:200px}
    .bs-card:not(.on) .bs-glow{display:none}
    .bs-body{height:0}
    .bs-dots{display:none}
  }
  @media (max-width:560px){.bs-head{margin-bottom:26px}.bs-panel{padding:32px 14px 16px}}
  @media (prefers-reduced-motion:reduce){.bs-card,.bs-body,.bs-mock,.bs-glow{transition:none}}
`;

export function BookingSteps() {
  const root = useRef<HTMLElement>(null);
  const { index, pinned, go } = useScrollSteps(root, TYPES.length);

  return (
    <section ref={root} id="how-it-works" className={`bs-scroll${pinned ? " pinned" : ""}`} style={pinned ? { height: `${TYPES.length * 62 + 100}vh` } : undefined}>
      <style>{css}</style>
      <div className="bs-sticky">
        <div className="bs-panel">
          <div className="bs-head">
            <span className="bk-label">How booking works</span>
            <h2 className="bk-h2">From choosing an option to making a reservation.</h2>
            <p className="bk-lead">Every booking type follows three steps, shaped by what is being booked.</p>
          </div>

          <div className="bs-cards">
            {TYPES.map((t, n) => {
              const on = n === index;
              return (
                <button key={t.key} type="button" className={`bs-card${on ? " on" : ""}`} aria-expanded={on} onClick={() => go(n)}>
                  <h3>{t.name}</h3>
                  <p className="bs-line">{t.line}</p>
                  <span className="bs-body" aria-hidden={!on}>
                    {t.steps.map((s, i) => (
                      <span key={s.title} className="bs-step">
                        <i>{ICONS[i]}</i>
                        <span><b>{s.title}</b><small>{s.text}</small></span>
                      </span>
                    ))}
                  </span>
                  <span className="bs-glow" style={{ ["--glow" as string]: t.glow }} aria-hidden>
                    <span className="bs-mark">{I[t.key]}</span>
                    <span className="bs-mock">
                      <span className="bs-mock-t"><b>{t.card.title}</b><em className="bs-ok">{I.check}Confirmed</em></span>
                      <small>{t.card.meta}</small>
                      <span className="bs-chips">{t.card.chips.map((c, i) => <span key={c} className={i === t.card.on ? "sel" : ""}>{c}</span>)}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bs-dots" role="group" aria-label="Booking type">
            {TYPES.map((t, n) => <button key={t.key} type="button" className={n === index ? "on" : ""} aria-label={t.name} aria-pressed={n === index} onClick={() => go(n)} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
