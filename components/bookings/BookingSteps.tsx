"use client";

import { BG, DEEP, I, INK, LINE, MUTED, OK, SAGE, TERRA } from "./theme";

/* How booking works. Every booking type follows three steps, shaped by what is being booked.
   All four workflows are visible at once, one row per type, so nothing is hidden behind a tab or a scroll.
   The chips show the moment in the booking UI that each step produces. Content is illustrative. */

const ROWS = [
  {
    key: "space", name: "Spaces",
    steps: [
      { title: "Explore availability", text: "Browse rooms and spaces and see what is open for the date and time.", chip: "Focus Room A · Available" },
      { title: "Provide booking details", text: "Enter the date, time, duration and number of people.", chip: "Thu, 19 Nov · 4 people" },
      { title: "Complete the reservation", text: "Submit the request and receive the reservation details.", chip: "Reservation submitted" },
    ],
  },
  {
    key: "appt", name: "Appointments",
    steps: [
      { title: "Choose a service and provider", text: "Pick the service, then a provider and a time from the open slots.", chip: "Dr. Dana · 10:30 AM" },
      { title: "Confirm your details", text: "Add contact details and any notes the provider needs.", chip: "Consultation · 30 min" },
      { title: "Receive the confirmation", text: "Get the confirmation, with a link to reschedule or cancel.", chip: "Appointment confirmed" },
    ],
  },
  {
    key: "stay", name: "Stays",
    steps: [
      { title: "Choose dates and a room", text: "Select the dates and guests, then compare the rooms open for the stay.", chip: "Garden Room · 2 nights" },
      { title: "Add guest details", text: "Enter guest information, preferences and any extras.", chip: "2 guests · Late check-in" },
      { title: "Confirm the stay", text: "Submit the booking and send the stay details to the guest.", chip: "Stay confirmed" },
    ],
  },
  {
    key: "activity", name: "Facilities",
    steps: [
      { title: "Choose a facility and slot", text: "Find the court, studio or activity and pick an open time.", chip: "Court 2 · 6:00 PM" },
      { title: "Add group details", text: "Enter the group size, contact details and any equipment needed.", chip: "4 players · Rackets" },
      { title: "Confirm the booking", text: "Submit the booking and send the confirmation with the slot details.", chip: "Booking confirmed" },
    ],
  },
] as const;

const css = `
  .bs-sec{padding:112px 20px;background:#fff;border-top:1px solid ${LINE};border-bottom:1px solid ${LINE}}
  .bs-in{max-width:1240px;margin:0 auto}
  .bs-head{max-width:720px;margin:0 auto 56px;text-align:center}
  .bs-head .bk-label{margin-bottom:14px}
  .bs-head .bk-lead{margin:18px auto 0}
  .bs-board{display:grid;gap:0;border:1px solid ${LINE};border-radius:20px;overflow:hidden;background:${BG}}
  .bs-row{display:grid;grid-template-columns:200px minmax(0,1fr);border-top:1px solid ${LINE}}
  .bs-row:first-child{border-top:0}
  .bs-type{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:28px 24px;background:#fff;border-right:1px solid ${LINE}}
  .bs-type i{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:${SAGE};color:#fff}
  .bs-type i svg{width:20px;height:20px}
  .bs-type b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;font-weight:600;color:${DEEP}}
  .bs-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
  .bs-step{position:relative;display:flex;flex-direction:column;gap:6px;padding:26px 28px 24px}
  .bs-step+.bs-step{border-left:1px dashed #C9CEC6}
  .bs-step+.bs-step::before{content:"";position:absolute;left:-5px;top:36px;width:9px;height:9px;border-radius:50%;background:#C9CEC6}
  .bs-n{font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${TERRA}}
  .bs-step h3{margin:0!important;font-size:17px;line-height:1.3}
  .bs-step p{margin:0 0 12px;font-size:14.5px;line-height:1.55;color:${MUTED}}
  .bs-chip{display:inline-flex;align-items:center;gap:7px;width:fit-content;max-width:100%;margin-top:auto;padding:6px 12px;border-radius:999px;background:#fff;box-shadow:0 0 0 1px ${LINE};font-size:12.5px;font-weight:600;color:${INK};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bs-chip.done{background:rgba(22,138,74,.1);box-shadow:none;color:${OK}}
  .bs-chip svg{width:14px;height:14px;flex-shrink:0}
  @media (max-width:1100px){
    .bs-row{grid-template-columns:1fr}
    .bs-type{flex-direction:row;justify-content:flex-start;align-items:center;padding:18px 24px;border-right:0;border-bottom:1px solid ${LINE}}
  }
  @media (max-width:760px){
    .bs-sec{padding:72px 20px}
    .bs-head{margin-bottom:36px}
    .bs-steps{grid-template-columns:1fr}
    .bs-step{padding:20px 22px}
    .bs-step+.bs-step{border-left:0;border-top:1px dashed #C9CEC6}
    .bs-step+.bs-step::before{display:none}
  }
`;

export function BookingSteps() {
  return (
    <section id="how-it-works" className="bs-sec">
      <style>{css}</style>
      <div className="bs-in">
        <div className="bs-head" data-rv="0">
          <span className="bk-label">How booking works</span>
          <h2 className="bk-h2">From choosing an option to making a reservation.</h2>
          <p className="bk-lead">Every booking type follows three steps, shaped by what is being booked.</p>
        </div>
        <div className="bs-board" data-rv="1">
          {ROWS.map((r) => (
            <div key={r.key} className="bs-row">
              <div className="bs-type"><i>{I[r.key]}</i><b>{r.name}</b></div>
              <div className="bs-steps">
                {r.steps.map((s, i) => (
                  <div key={s.title} className="bs-step">
                    <span className="bs-n">Step 0{i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className={`bs-chip${i === 2 ? " done" : ""}`}>{i === 2 && I.check}{s.chip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
