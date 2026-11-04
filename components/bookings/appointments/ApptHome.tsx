"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, type ReactNode } from "react";
import { I } from "../theme";
import { ApptShell, StartButton } from "./ApptShell";
import { BAND, DEEP, INK, LINE, MIST, MIST_SOFT, MUTED, NEUTRAL, PRIMARY, VIS } from "./palette";

/* Appointment Scheduling, Home. Content from the microsite brief: online booking, appointment management,
   availability rules, the appointment lifecycle, industries, EVI, integrations, why EVOQ Appointments and
   how to get started. White and pale grey sections, real photography, and plain lists instead of card
   grids; the moss green stays on buttons, labels and small marks. Sample data in every product view. */

const PH = (f: string) => `/healthcare/pm/${f}`;
const ST = (f: string) => `/healthcare/stock/${f}`;

const Win = ({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) => (
  <div className={`ap-win ${className}`}>
    <div className="ap-chrome"><span className="ap-dots" aria-hidden><i /><i /><i /></span><span className="ap-url">{url}</span></div>
    <div className="ah-win-b">{children}</div>
  </div>
);

/* ---------- 1. hero: photo mosaic with two phone screens ---------- */
function HeroVisual() {
  return (
    <div className="ah-mos">
      <div className="ah-mos-grid" aria-hidden>
        <img className="a" src={ST("care-aesthetics.jpg")} alt="" />
        <img className="b" src={ST("pm-tile-wellness.jpg")} alt="" />
        <img className="c" src={ST("pm-tile-physio.jpg")} alt="" />
        <img className="d" src={ST("pm-tile-derm.jpg")} alt="" />
      </div>

      <div className="ah-phone one" aria-label="Client booking screen, sample">
        <div className="ah-ph-notch" />
        <div className="ah-ph-in">
          <div className="ah-ph-top"><span className="ah-logo">R</span><b>Riverside Clinic</b></div>
          <small className="ah-ph-k">Service</small>
          <div className="ah-ph-svc"><b>Initial consultation</b><small>30 min · In person</small></div>
          <small className="ah-ph-k">Provider</small>
          <div className="ah-ph-pro"><img src={PH("doctor.jpg")} alt="" /><b>Dr. Priya</b><em>Next free 14:30</em></div>
          <small className="ah-ph-k">Thursday 19 November</small>
          <div className="ah-ph-slots">
            {["09:00", "09:30", "10:00", "11:00", "14:30", "15:00"].map((t, n) => <span key={t} className={n === 4 ? "on" : n === 2 ? "off" : ""}>{t}</span>)}
          </div>
          <span className="ah-ph-btn">Confirm booking</span>
        </div>
      </div>

      <div className="ah-today" aria-hidden><i />7 appointments today</div>

      <div className="ah-toast" aria-hidden>
        <span className="ah-toast-i">{I.check}</span>
        <span><b>New booking</b><small>Sam Lee · Thu 14:30</small></span>
      </div>
    </div>
  );
}

/* ---------- 2. online booking: one booking page, all six capabilities ---------- */
const BOOK = [
  { t: "Service selection", d: "Present available services with descriptions and appointment durations." },
  { t: "Provider selection", d: "Let clients choose a preferred provider where applicable." },
  { t: "Location selection", d: "Allow clients to choose where their appointment will take place." },
  { t: "Available time slots", d: "Display appointment times according to configured availability." },
  { t: "Booking details", d: "Collect contact information and relevant appointment details." },
  { t: "Online booking page", d: "Share your booking page directly or add it to your website." },
];

function BookingPage({ hl }: { hl: number | null }) {
  const g = (n: number) => `ah-g${hl === n ? " on" : ""}`;
  return (
    <Win url="book.riverside-clinic.example" className={`ah-bkwin${hl ? " hl" : ""}`}>
      <div className="ah-bk-top"><span className="ah-logo">R</span><b>Riverside Clinic</b><small>Book an appointment</small></div>
      <div className="ah-bk">
        <div className="ah-bk-col">
          <div className={g(1)}>
            <div className="ah-bk-h"><b>1</b>Service</div>
            {[["Initial consultation", "30 min"], ["Follow up visit", "20 min"], ["Physiotherapy session", "45 min"]].map(([n, d], i) => (
              <div key={n} className={`ah-row${i === 0 ? " sel" : ""}`}><span className="ah-radio" /><span><b>{n}</b><small>{d} · In person</small></span></div>
            ))}
          </div>
          <div className={g(2)}>
            <div className="ah-bk-h"><b>2</b>Provider</div>
            <div className="ah-pros">
              {[["Dr. Priya", PH("doctor.jpg")], ["Ana", PH("nurse.jpg")], ["Joy", PH("stock-provider-smile.jpg")]].map(([n, im], i) => (
                <span key={n} className={i === 0 ? "sel" : ""}><img src={im} alt="" />{n}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="ah-bk-col">
          <div className={g(3)}>
            <div className="ah-bk-h"><b>3</b>Location</div>
            {[["Riverside Clinic", "Ground floor · 6 rooms"], ["City Centre", "Level 2 · 4 rooms"], ["Video appointment", "Online"]].map(([n, d], i) => (
              <div key={n} className={`ah-row${i === 0 ? " sel" : ""}`}><span className="ah-radio" /><span><b>{n}</b><small>{d}</small></span></div>
            ))}
          </div>
          <div className={g(4)}>
            <div className="ah-bk-h"><b>4</b>Time</div>
            <div className="ah-seg">{["Wed 18", "Thu 19", "Fri 20"].map((d, n) => <span key={d} className={n === 1 ? "on" : ""}>{d}</span>)}</div>
            <div className="ah-slots">{["09:00", "09:30", "10:00", "11:00", "14:30", "15:00"].map((t, n) => <span key={t} className={n === 4 ? "on" : n === 2 ? "off" : ""}>{t}</span>)}</div>
          </div>
        </div>
        <div className="ah-bk-col">
          <div className={g(5)}>
            <div className="ah-bk-h"><b>5</b>Your details</div>
            <div className="ah-form">
              {[["Full name", "Sam Lee"], ["Email", "sam@example.com"], ["Reason for the visit", "Back pain for two weeks"]].map(([k, v]) => <label key={k}>{k}<span>{v}</span></label>)}
            </div>
            <span className="ah-btn-mock">Confirm booking</span>
          </div>
          <div className={g(6)}>
            <div className="ah-bk-h"><b>6</b>Booking page</div>
            <div className="ah-link"><span>book.riverside-clinic.example</span><em>Copy link</em></div>
          </div>
        </div>
      </div>
    </Win>
  );
}

function BookingSection() {
  const [hl, setHl] = useState<number | null>(null);
  return (
    <section className="ap-out ap-sec ap-band" id="booking">
      <div className="ap-in">
        <div className="ap-head c wide" data-rv="0">
          <span className="ap-label">Online appointment booking</span>
          <h2 className="ap-h2">Make it easier for clients to book the services they need.</h2>
          <p className="ap-lead">Give clients a clear path from choosing a service to confirming an appointment. They can select a provider, find an available time and submit their details through your online booking page.</p>
        </div>
        <div data-rv="1"><BookingPage hl={hl} /></div>
        <p className="ah-caps-hint">Each step below matches the numbered area of the booking page above.</p>
        <ol className="ah-caps">
          {BOOK.map((b, n) => (
            <li key={b.t} tabIndex={0} className={hl === n + 1 ? "on" : ""} onMouseEnter={() => setHl(n + 1)} onMouseLeave={() => setHl(null)} onFocus={() => setHl(n + 1)} onBlur={() => setHl(null)}>
              <em className="ah-cap-n">{n + 1}</em>
              <span><b>{b.t}</b><small>{b.d}</small></span>
            </li>
          ))}
        </ol>
        <p className="ap-note">{I.check}Clients can book at a time that suits them, without having to coordinate every appointment through calls and messages.</p>
      </div>
    </section>
  );
}

/* ---------- 3. appointment management ---------- */
const COLS = [
  { n: "Dr. Priya", img: PH("doctor.jpg"), b: [[0, 1, "Lee, consultation", "ok"], [2, 1, "Patel, follow up", "ok"], [4, 2, "Garcia, review", "warn"]] },
  { n: "Ana", img: PH("nurse.jpg"), b: [[1, 1, "Chen, vaccination", "ok"], [3, 1, "Walk in", "off"], [5, 1, "Okafor, check", "ok"]] },
  { n: "Joy", img: PH("stock-provider-smile.jpg"), b: [[0, 2, "Silva, physio", "ok"], [3, 2, "Brown, physio", "warn"]] },
] as const;
function CalView() {
  const [view, setView] = useState<"Day" | "Week" | "Month">("Day");
  return (
    <Win url="app.riverside-clinic.example/calendar" className="ah-cal">
      <div className="ah-cal-top">
        <b>Thursday, 19 November</b>
        <span className="ah-seg sm">{(["Day", "Week", "Month"] as const).map((v) => <button key={v} type="button" className={view === v ? "on" : ""} aria-pressed={view === v} onClick={() => setView(v)}>{v}</button>)}</span>
      </div>
      {view === "Day" && (
        <div className="ah-day">
          <div className="ah-hours">{["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"].map((h) => <span key={h}>{h}</span>)}</div>
          {COLS.map((c) => (
            <div key={c.n} className="ah-colm">
              <span className="ah-colh"><img src={c.img} alt="" />{c.n}</span>
              <div className="ah-colb">{c.b.map(([s, l, t, k]) => <i key={t} className={k} style={{ top: `${(s as number) * 16.66}%`, height: `calc(${(l as number) * 16.66}% - 4px)` }}>{t}</i>)}</div>
            </div>
          ))}
        </div>
      )}
      {view === "Week" && (
        <div className="ah-week">
          {[["Mon", 14], ["Tue", 18], ["Wed", 16], ["Thu", 21], ["Fri", 12]].map(([d, n]) => (
            <div key={d}><b>{d}</b><span style={{ height: `${(n as number) * 4}px` }} /><small>{n} appts</small></div>
          ))}
        </div>
      )}
      {view === "Month" && (
        <div className="ah-month">{Array.from({ length: 30 }, (_, n) => <span key={n} className={n % 7 === 6 ? "off" : ""}><b>{n + 1}</b><i style={{ width: `${30 + ((n * 37) % 60)}%` }} /></span>)}</div>
      )}
      <div className="ah-legend"><span><i className="ok" />Confirmed</span><span><i className="warn" />Pending</span><span><i className="off" />Blocked</span></div>
    </Win>
  );
}

/* ---------- 4. availability ---------- */
function RulesView() {
  const [buffer, setBuffer] = useState(10);
  const [step, setStep] = useState(30);
  const len = 30;
  const slot = Math.ceil((len + buffer) / step) * step;
  const slots: string[] = [];
  for (let m = 9 * 60; m + len <= 17 * 60; m += slot) {
    if (m >= 12 * 60 && m < 13 * 60) continue;
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return (
    <div className="ah-rules">
      <div className="ah-rules-h"><img src={PH("doctor.jpg")} alt="" /><span><b>Dr. Priya</b><small>Initial consultation · 30 min</small></span></div>
      <div className="ah-week-h">
        {[["Mon", 20, 70], ["Tue", 20, 70], ["Wed", 30, 50], ["Thu", 20, 70], ["Fri", 20, 50], ["Sat", 0, 0]].map(([d, s, w]) => (
          <div key={d as string}><b>{d}</b><span>{(w as number) > 0 ? <i style={{ left: `${s}%`, width: `${w}%` }} /> : <em>Off</em>}</span></div>
        ))}
      </div>
      <div className="ah-ctl">
        <span>Buffer after</span>
        <div className="ah-chips" role="group" aria-label="Buffer">{[0, 10, 15].map((b) => <button key={b} type="button" className={buffer === b ? "on" : ""} aria-pressed={buffer === b} onClick={() => setBuffer(b)}>{b} min</button>)}</div>
      </div>
      <div className="ah-ctl">
        <span>Booking interval</span>
        <div className="ah-chips" role="group" aria-label="Interval">{[15, 30].map((s) => <button key={s} type="button" className={step === s ? "on" : ""} aria-pressed={step === s} onClick={() => setStep(s)}>{s} min</button>)}</div>
      </div>
      <div className="ah-ctl"><span>Advance booking</span><b>Up to 60 days</b></div>
      <div className="ah-ctl"><span>Blocked</span><b>12:00 to 13:00 lunch · Fri 27 Nov</b></div>
      <div className="ah-out" aria-live="polite">
        <span><b>{slots.length} slots</b> offered on Thursday</span>
        <div>{slots.slice(0, 8).map((s) => <em key={s}>{s}</em>)}{slots.length > 8 && <em>+{slots.length - 8}</em>}</div>
      </div>
    </div>
  );
}

/* ---------- 5. lifecycle: every stage shown in turn, no tabs ---------- */
const LIFE = [
  { t: "Appointment intake", d: "Collect client contact details, service-specific information and custom responses during the booking process." },
  { t: "Confirmations & reminders", d: "Keep clients and providers informed with appointment confirmations, reminders and scheduling updates through supported communication channels." },
  { t: "Payments & deposits", d: "Configure service pricing and payment requirements. Where supported, collect deposits or advance payments as part of the booking process." },
  { t: "Rescheduling & cancellations", d: "Manage appointment changes and apply configured booking policies." },
  { t: "Waitlists", d: "Keep track of clients waiting for a suitable appointment and identify opportunities when availability opens up." },
];
function LifeView({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="ah-card">
        <span className="ah-k">Before your visit</span>
        {[["Date of birth", "12 Mar 1990"], ["Is this your first visit?", "Yes"], ["Any allergies?", "None"], ["Insurance provider", "Optional"]].map(([k, v]) => <div key={k} className="ah-q"><span>{k}</span><b>{v}</b></div>)}
      </div>
    );
  if (i === 1)
    return (
      <div className="ah-msgs">
        <div className="ah-msg"><span className="ah-ch">Email · Booked</span><b>Your appointment is confirmed</b><small>Thu 19 Nov, 14:30 with Dr. Priya</small></div>
        <div className="ah-msg"><span className="ah-ch">SMS · Day before</span><b>Reminder: tomorrow at 14:30</b><small>Reply C to confirm or R to reschedule</small></div>
        <div className="ah-msg team"><span className="ah-ch">Provider · Morning</span><b>Your day: 7 appointments</b><small>First at 09:00, Lee, consultation</small></div>
      </div>
    );
  if (i === 2)
    return (
      <div className="ah-card">
        <span className="ah-k">Payment</span>
        <div className="ah-q"><span>Initial consultation</span><b>$80.00</b></div>
        <div className="ah-q"><span>Deposit at booking</span><b>$20.00</b></div>
        <div className="ah-q"><span>Due at the visit</span><b>$60.00</b></div>
        <span className="ap-badge ok">{I.check}Deposit paid</span>
      </div>
    );
  if (i === 3)
    return (
      <div className="ah-card">
        <span className="ah-k">Policy</span>
        <div className="ah-q"><span>Free changes</span><b>Up to 24 hours before</b></div>
        <div className="ah-q"><span>Late cancellation</span><b>Deposit kept</b></div>
        <div className="ah-move"><span>Thu 14:30</span>{I.arrow}<span className="on">Fri 09:30</span></div>
        <small className="ah-fine">The client and the provider are both told about the change.</small>
      </div>
    );
  return (
    <div className="ah-card">
      <span className="ah-k">Waitlist · Physiotherapy</span>
      {[["Ana Ruiz", "Any weekday morning"], ["Tom Hart", "Thursdays"], ["Mei Lin", "After 15:00"]].map(([n, p], k) => <div key={n} className={`ah-q${k === 0 ? " hot" : ""}`}><span>{n}</span><b>{p}</b></div>)}
      <span className="ap-badge moss">{I.clock}Slot opened Fri 09:30 · offer to Ana</span>
    </div>
  );
}

/* ---------- 6. industries ---------- */
const INDUSTRIES = [
  { t: "Healthcare & clinics", d: "Schedule consultations, follow-up appointments and provider visits. Manage practitioner availability, appointment durations and location-based schedules.", img: ST("care-clinics-2.jpg"), alt: "Clinician speaking with a patient at a desk" },
  { t: "Beauty & aesthetics", d: "Organize consultations and aesthetic services with provider selection, service durations, appointment preparation and booking requirements.", img: ST("care-aesthetics.jpg"), alt: "Client receiving a facial treatment" },
  { t: "Salons & spas", d: "Manage services, stylist or therapist schedules, appointment durations and client bookings across individual providers.", img: ST("org-aesthetics-facial.jpg"), alt: "Therapist giving a light treatment to a client" },
  { t: "Wellness & fitness", d: "Schedule personal sessions, instructor-led appointments and group activities with appropriate availability and capacity.", img: ST("pm-tile-wellness.jpg"), alt: "Group yoga class in a bright studio" },
  { t: "Professional services", d: "Coordinate consultations and client meetings with specialist selection, appointment requirements and virtual or in-person options.", img: "/industries/v2/ps-main2-hd.jpg", alt: "Adviser meeting a client in an office" },
  { t: "Education & training", d: "Manage student consultations, tutoring sessions and instructor appointments, including individual and group scheduling.", img: "/industries/v2/mo-team-hd.jpg", alt: "Small group working together at a table" },
];

/* ---------- 7. EVI ---------- */
const EVI_POINTS = [
  ["Understand your appointment schedule", "Ask questions about upcoming appointments, provider schedules and appointment activity."],
  ["Find scheduling opportunities", "Identify available provider slots, scheduling gaps and potential conflicts."],
  ["Prepare administrative actions", "Get assistance with schedule updates and other appointment-related tasks, with actions presented for review and approval before execution."],
  ["Assist with booking interactions", "Evolving AI capabilities can help interpret appointment enquiries, identify relevant services and guide clients towards suitable booking options."],
];
function EviCard() {
  const [d, setD] = useState<"ok" | "no" | null>(null);
  return (
    <div className="ah-chat">
      <div className="ah-me">Find an available consultation slot with a provider this Thursday afternoon.</div>
      <div className="ah-bot">
        <span className="ah-who"><img src="/characters/evi-face-idle.png" alt="" width={24} height={24} />EVI</span>
        <p>Two providers have a free consultation slot on Thursday afternoon.</p>
        <div className="ah-item"><img className="round" src={PH("doctor.jpg")} alt="" /><span><b>Dr. Priya</b><small>Thu 19 Nov · 14:30</small></span><em className="ap-badge ok">Free</em></div>
        <div className="ah-item"><img className="round" src={PH("nurse.jpg")} alt="" /><span><b>Ana</b><small>Thu 19 Nov · 16:00</small></span><em className="ap-badge ok">Free</em></div>
      </div>
      <div className="ah-prep">
        <span className="ah-k">{d === "ok" ? "Approved" : d === "no" ? "Rejected" : "Prepared for review"}</span>
        <b>Hold Thursday 14:30 with Dr. Priya for Sam Lee</b>
        <small>{d === "ok" ? "The slot is held and Sam was sent the details." : d === "no" ? "Nothing changed." : "A person approves it before anything changes."}</small>
        {!d ? <span className="ah-acts"><button type="button" className="ap-btn ghost sm" onClick={() => setD("no")}>Reject</button><button type="button" className="ap-btn primary sm" onClick={() => setD("ok")}>Approve</button></span> : <button type="button" className="ah-undo" onClick={() => setD(null)}>Undo</button>}
      </div>
    </div>
  );
}

/* ---------- 8. integrations ---------- */
const INT_L = [
  { ic: I.rules, t: "Calendar & scheduling", d: "Work with supported calendar services to coordinate availability and appointments." },
  { ic: I.message, t: "Communication services", d: "Use supported email and SMS integrations for appointment-related communication." },
];
const INT_R = [
  { ic: I.layers, t: "Payment integrations", d: "Support appointment payment requirements through available payment connections." },
  { ic: I.space, t: "EVOQ applications", d: "Extend appointment operations through relevant EVOQ applications, including CRM and other connected services." },
];
const SYNC = [
  [I.rules, "Added to the provider's calendar"],
  [I.message, "Confirmation sent by email and SMS"],
  [I.layers, "Deposit recorded"],
  [I.people, "Linked to the client in EVOQ CRM"],
] as const;

/* ---------- 9. why ---------- */
const WHY = [
  { ic: I.edit, t: "Service-led scheduling", d: "Configure appointment services with their own durations, pricing and booking requirements." },
  { ic: I.people, t: "Provider-based availability", d: "Manage schedules around the people delivering each service." },
  { ic: I.rules, t: "Controlled booking", d: "Define when and how clients can book available appointments." },
  { ic: I.appt, t: "Client-facing booking", d: "Give clients a direct way to find and confirm appointments." },
  { ic: I.pin, t: "Multi-location operations", d: "Coordinate services, providers and schedules across supported locations." },
  { ic: I.layers, t: "EVOQ ecosystem", d: "Extend appointment processes through connected EVOQ applications." },
];

/* ---------- 10. get started ---------- */
const START = [
  { ic: I.space, t: "Organization profile", d: "Add your organization details and select your industry." },
  { ic: I.pin, t: "Locations", d: "Set up the places where appointments take place." },
  { ic: I.layers, t: "Services", d: "Add services, descriptions, durations and pricing." },
  { ic: I.people, t: "Providers", d: "Create provider profiles and assign services." },
  { ic: I.clock, t: "Availability & rules", d: "Configure operating hours, provider schedules and booking policies." },
  { ic: I.rules, t: "Booking page", d: "Set up your public booking experience and prepare to accept appointments." },
];

export function ApptHome() {
  return (
    <ApptShell
      hero={
        <div className="ap-hd-in ah-hero">
          <div className="ah-hero-copy">
            <span className="ap-label">EVOQ Appointments</span>
            <h1 className="ah-h1">Appointment scheduling, from first booking to final update.</h1>
            <p className="ap-lead">Give clients an easier way to book services while keeping provider schedules, availability and appointment operations under control.</p>
            <p className="ah-sub">EVOQ Appointments brings online booking and appointment management together, helping service-led organizations coordinate appointments across providers, services and locations.</p>
            <div className="ap-ctas">
              <StartButton location="hero" />
              <a href="#booking" className="ap-btn secondary">Explore features</a>
            </div>
          </div>
          <HeroVisual />
        </div>
      }
    >
      <style>{css}</style>

      {/* 2. online appointment booking */}
      <BookingSection />

      {/* 3. appointment management */}
      <section className="ap-out ap-sec ap-white" id="management">
        <div className="ap-in ah-two">
          <div data-rv="0">
            <span className="ap-label">Appointment management</span>
            <h2 className="ap-h2" style={{ marginTop: 14 }}>A clear view of every appointment and provider schedule.</h2>
            <p className="ap-lead">Keep track of daily appointments, provider availability and booking updates through a centralized scheduling interface. See what is coming up, identify schedule changes and manage appointments as they progress.</p>
            <ul className="ah-list">
              {["Day, week and month calendar views", "Appointments organized by provider, service and location", "Appointment status tracking", "Manual appointment creation and updates", "Rescheduling and cancellation management", "Access to upcoming and past appointments"].map((t) => <li key={t}>{I.check}{t}</li>)}
            </ul>
            <p className="ap-note">{I.clock}From the first booking to the final appointment update, maintain visibility into your daily schedule.</p>
          </div>
          <div data-rv="1"><CalView /></div>
        </div>
      </section>

      {/* 4. availability and scheduling controls */}
      <section className="ap-out ap-sec ap-band" id="availability">
        <div className="ap-in ah-two flip">
          <div data-rv="1"><RulesView /></div>
          <div data-rv="0">
            <span className="ap-label">Availability &amp; scheduling controls</span>
            <h2 className="ap-h2" style={{ marginTop: 14 }}>Set the rules behind every available time slot.</h2>
            <p className="ap-lead">Appointment availability depends on more than operating hours. Configure schedules around service durations, provider working hours, preparation time and booking policies.</p>
            <ul className="ah-list cols">
              {["Organization and location operating hours", "Individual provider availability", "Service-specific durations", "Preparation and buffer times", "Booking intervals and advance booking limits", "Blocked dates, breaks and unavailable periods", "Cancellation and rescheduling policies", "Appointment capacity and scheduling rules"].map((t) => <li key={t}>{I.check}{t}</li>)}
            </ul>
            <p className="ap-note">{I.edit}Control when services can be booked and which appointment slots are offered to clients.</p>
          </div>
        </div>
      </section>

      {/* 5. the appointment lifecycle */}
      <section className="ap-out ap-sec ap-white" id="lifecycle">
        <div className="ap-in">
          <div className="ap-head c wide" data-rv="0">
            <span className="ap-label">Manage the appointment lifecycle</span>
            <h2 className="ap-h2">More control over the work surrounding each booking.</h2>
            <p className="ap-lead">An appointment involves more than selecting a date and time. Collect the right information, keep clients informed and manage the updates that happen before and after a scheduled visit.</p>
          </div>
          <div className="ah-life">
            {LIFE.map((l, n) => (
              <div key={l.t} className="ah-life-i" data-rv={n % 3}>
                <div className="ah-life-t"><span className="ah-n">{n + 1}</span><h3>{l.t}</h3></div>
                <p>{l.d}</p>
                <div className="ah-vis"><LifeView i={n} /></div>
              </div>
            ))}
          </div>
          <p className="ap-note">{I.check}Keep the details and administrative tasks associated with each appointment within view.</p>
          <div className="ap-ctas" style={{ justifyContent: "center" }}><a href="#booking" className="ap-btn secondary">Explore features</a></div>
        </div>
      </section>

      {/* 6. industries */}
      <section className="ap-out ap-sec ap-band" id="industries">
        <div className="ap-in">
          <div className="ap-head" data-rv="0">
            <span className="ap-label">Appointment scheduling across industries</span>
            <h2 className="ap-h2">Different services. Different scheduling needs.</h2>
            <p className="ap-lead">Appointment requirements vary by industry. EVOQ Appointments supports service-based scheduling across a range of organizations, with services, providers, durations and availability configured around how each organization operates.</p>
          </div>
          <div className="ah-ind">
            {INDUSTRIES.map((x, n) => (
              <article key={x.t} data-rv={n % 3}>
                <img src={x.img} alt={x.alt} loading="lazy" />
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EVI */}
      <section className="ap-out ap-sec ap-white" id="evi">
        <div className="ap-in ah-two">
          <div data-rv="0">
            <span className="ap-label">EVI, AI assistance for appointments</span>
            <h2 className="ap-h2" style={{ marginTop: 14 }}>A smarter way to work with appointment information.</h2>
            <p className="ap-lead">EVI is evolving to help administrators work with appointment schedules, identify relevant information and prepare actions through natural-language interactions.</p>
            <ol className="ah-steps">{EVI_POINTS.map(([t, d], n) => <li key={t}><b>{n + 1}</b><span><em>{t}</em>{d}</span></li>)}</ol>
            <div className="ap-ctas"><a href="/products/ai" className="ap-btn secondary">Explore EVI</a></div>
          </div>
          <div data-rv="1">
            <div className="ah-evi-bg"><EviCard /></div>
            <p className="ah-fine">EVI can help interpret the request, review relevant scheduling information and prepare suitable options, subject to available integrations and implemented capabilities.</p>
          </div>
        </div>
      </section>

      {/* 8. integrations and the EVOQ ecosystem */}
      <section className="ap-out ap-sec ap-band" id="integrations">
        <div className="ap-in">
          <div className="ap-head c" data-rv="0">
            <span className="ap-label">Integrations &amp; EVOQ ecosystem</span>
            <h2 className="ap-h2">Appointment scheduling within your wider operations.</h2>
            <p className="ap-lead">Appointments are often part of a larger client relationship. Connect scheduling with supported applications to help information move between the systems involved in managing enquiries, client relationships, payments and communication.</p>
          </div>
          <div className="ah-hub">
            <div className="ah-hub-col l">{INT_L.map((n) => <div key={n.t} className="ah-node"><span className="ah-ic">{n.ic}</span><span><b>{n.t}</b><small>{n.d}</small></span></div>)}</div>
            <div className="ah-core" data-rv="1">
              <div className="ah-core-h"><img className="round" src={PH("doctor.jpg")} alt="" /><span><b>Initial consultation</b><small>AP 31027 · Thu 19 Nov, 14:30</small></span><em className="ap-badge ok">Confirmed</em></div>
              <ul>{SYNC.map(([ic, t]) => <li key={t}><span className="ah-dot">{ic}</span>{t}<em>{I.check}</em></li>)}</ul>
            </div>
            <div className="ah-hub-col">{INT_R.map((n) => <div key={n.t} className="ah-node"><span className="ah-ic">{n.ic}</span><span><b>{n.t}</b><small>{n.d}</small></span></div>)}</div>
          </div>
          <p className="ap-note">{I.layers}Keep appointment scheduling aligned with the wider tools and processes your organization relies on.</p>
        </div>
      </section>

      {/* 9. why EVOQ Appointments: a photo and a plain list */}
      <section className="ap-out ap-sec ap-white" id="why">
        <div className="ap-in">
          <div className="ap-head c" data-rv="0">
            <span className="ap-label">Why EVOQ Appointments</span>
            <h2 className="ap-h2">Appointment management that reflects how services are delivered.</h2>
            <p className="ap-lead">A booking calendar is only part of appointment operations. Service configuration, provider availability, booking requirements and ongoing appointment administration all influence how well scheduling works. EVOQ Appointments brings these capabilities into a service-based scheduling experience.</p>
          </div>
          <div className="ah-why">
            <img className="ah-why-img" src={PH("stock-patient.jpg")} alt="Provider welcoming a client at a clinic desk" loading="lazy" data-rv="0" />
            <ul data-rv="1">
              {WHY.map((w) => (
                <li key={w.t}>
                  <span className="ah-why-ic">{w.ic}</span>
                  <span><b>{w.t}</b><small>{w.d}</small></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 10. get started */}
      <section className="ap-out ap-sec ap-band" id="start">
        <div className="ap-in">
          <div className="ap-head c" data-rv="0">
            <span className="ap-label">Get started with Appointments</span>
            <h2 className="ap-h2">Set up your appointment operations around the way you work.</h2>
            <p className="ap-lead">Start with your organization profile and configure the details that shape your booking experience.</p>
          </div>
          <ol className="ah-start">
            {START.map((s, n) => (
              <li key={s.t} data-rv={n % 3}>
                <span className="ah-start-n">{String(n + 1).padStart(2, "0")}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="ap-ctas" style={{ justifyContent: "center" }}><StartButton location="get_started_steps" /></div>
        </div>
      </section>

      {/* 11. final call to action */}
      <section className="ap-close">
        <div className="ap-close-in" data-rv="0">
          <span className="ap-cs ring" aria-hidden /><span className="ap-cs dots" aria-hidden /><span className="ap-cs sun" aria-hidden />
          <div className="ap-close-c">
            <h2 className="ap-h2">Give every appointment a clearer path from booking to completion.</h2>
            <p className="ap-lead">Manage services, provider schedules, availability and client bookings with EVOQ Appointments.</p>
            <div className="ap-ctas"><StartButton location="close" /><a href="#booking" className="ap-btn secondary">Explore features</a></div>
          </div>
        </div>
      </section>
    </ApptShell>
  );
}

const css = `
  .round{border-radius:50%!important}
  .ah-win-b{padding:16px}
  .ah-logo{width:24px;height:24px;border-radius:7px;background:${DEEP};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:700;font-size:13px;flex-shrink:0}
  .ah-fine{margin:12px 0 0;font-size:12.5px;color:${NEUTRAL}}

  /* hero */
  .ah-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:48px;align-items:center;padding:56px 0 88px}
  .ah-h1{font-size:54px;line-height:1.05;letter-spacing:-.028em;margin:16px 0 0!important;text-wrap:balance}
  .ah-sub{margin:14px 0 0;font-size:15.5px;line-height:1.6;color:${NEUTRAL};max-width:56ch}
  .ah-mos{position:relative;height:580px}
  .ah-mos-grid{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1.25fr .75fr;gap:12px}
  .ah-mos-grid img{width:100%;height:100%;object-fit:cover;border-radius:20px;display:block}
  .ah-mos-grid .a{grid-column:1/3;grid-row:1}
  .ah-mos-grid .b{grid-column:3;grid-row:1/3;object-position:30% center}
  .ah-mos-grid .c{grid-column:1;grid-row:2;object-position:60% center}
  .ah-mos-grid .d{grid-column:2;grid-row:2;object-position:35% center}
  .ah-phone{position:absolute;width:226px;padding:9px;border-radius:36px;background:#fff;box-shadow:0 44px 70px -30px rgba(30,45,34,.6),0 0 0 1px rgba(30,45,34,.12)}
  .ah-phone.one{left:32%;top:46px;z-index:2}
  .ah-ph-notch{width:62px;height:6px;border-radius:6px;background:#E3E6E0;margin:5px auto 9px}
  .ah-ph-in{padding:0 8px 12px;display:grid;gap:7px;font-size:12px;color:${INK}}
  .ah-ph-top{display:flex;align-items:center;gap:8px;padding-bottom:4px}
  .ah-ph-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${DEEP}}
  .ah-ph-top small{margin-left:auto;font-size:11px;color:${NEUTRAL}}
  .ah-ph-k{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${NEUTRAL};margin-top:3px}
  .ah-ph-svc{display:grid;padding:8px 10px;border-radius:10px;box-shadow:0 0 0 1.5px ${PRIMARY};background:#fff}
  .ah-ph-svc b{font-size:12.5px;color:${DEEP}}.ah-ph-svc small{font-size:11px;color:${NEUTRAL}}
  .ah-ph-pro{display:grid;grid-template-columns:28px auto minmax(0,1fr);align-items:center;gap:8px;padding:6px 8px;border-radius:10px;box-shadow:0 0 0 1px ${LINE}}
  .ah-ph-pro img{width:28px;height:28px;border-radius:50%;object-fit:cover}
  .ah-ph-pro b{font-size:12.5px;color:${DEEP}}.ah-ph-pro em{justify-self:end;font-style:normal;font-size:10.5px;font-weight:600;color:${PRIMARY};white-space:nowrap}
  .ah-ph-slots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
  .ah-ph-slots span{padding:7px 0;text-align:center;border-radius:8px;box-shadow:0 0 0 1px ${LINE};font-size:11.5px;font-weight:600;color:${INK};font-family:var(--font-display),system-ui,sans-serif}
  .ah-ph-slots .on{background:${PRIMARY};color:#fff;box-shadow:none}
  .ah-ph-slots .off{background:repeating-linear-gradient(135deg,#F1F3EF 0 5px,#E8ECE6 5px 10px);color:#A4ADA5;box-shadow:none}
  .ah-ph-btn{margin-top:4px;padding:10px 0;text-align:center;border-radius:9px;background:${DEEP};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:600}
  .ah-today{position:absolute;left:16px;top:16px;z-index:4;display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:#fff;font-size:12.5px;font-weight:600;color:${DEEP};box-shadow:0 14px 28px -16px rgba(30,45,34,.55)}
  .ah-today i{width:8px;height:8px;border-radius:50%;background:${PRIMARY}}
  .ah-toast{position:absolute;right:16px;bottom:18px;z-index:4;display:flex;align-items:center;gap:10px;padding:10px 16px 10px 10px;border-radius:14px;background:#fff;box-shadow:0 24px 44px -20px rgba(30,45,34,.55),0 0 0 1px rgba(30,45,34,.08)}
  .ah-toast-i{width:30px;height:30px;border-radius:50%;background:rgba(22,138,74,.12);color:#168A4A;display:grid;place-items:center}.ah-toast-i svg{width:16px;height:16px}
  .ah-toast span:last-child{display:grid}.ah-toast b{font-size:13px;color:${DEEP}}.ah-toast small{font-size:11.5px;color:${NEUTRAL}}

  /* shared product bits */
  .ah-seg{display:inline-flex;gap:2px;background:#fff;border-radius:9px;padding:3px;box-shadow:0 0 0 1px ${LINE};margin-bottom:10px}
  .ah-seg span,.ah-seg button{border:0;background:none;padding:6px 12px;border-radius:7px;font-size:12.5px;font-weight:600;color:${MUTED};font-family:var(--font-display),system-ui,sans-serif;cursor:pointer}
  .ah-seg .on{background:${BAND};color:${DEEP};box-shadow:0 1px 3px rgba(30,45,34,.16)}
  .ah-seg.sm{margin:0}
  .ah-slots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
  .ah-slots span{padding:9px 0;text-align:center;border-radius:9px;background:#fff;box-shadow:0 0 0 1.5px ${LINE};font-size:12.5px;font-weight:600;color:${INK};font-family:var(--font-display),system-ui,sans-serif}
  .ah-slots .on{background:${PRIMARY};color:#fff;box-shadow:none}
  .ah-slots .off{background:repeating-linear-gradient(135deg,#F1F3EF 0 6px,#E8ECE6 6px 12px);color:#A4ADA5;box-shadow:none}
  .ah-item{display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:11px;align-items:center;padding:7px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ah-item img.round{width:42px;height:42px;margin:0 3px;object-fit:cover}
  .ah-item span{display:grid;min-width:0}.ah-item b{font-size:13.5px;color:${DEEP}}.ah-item small{font-size:12px;color:${NEUTRAL}}
  .ah-form{display:grid;gap:8px}
  .ah-form label{display:grid;gap:3px;font-size:11.5px;font-weight:600;color:${NEUTRAL}}
  .ah-form label span{padding:9px 11px;border-radius:9px;background:#fff;box-shadow:0 0 0 1.5px ${LINE};font-size:13px;font-weight:500;color:${INK}}
  .ah-link{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:${BAND};font-size:12.5px;font-weight:600;color:${DEEP}}
  .ah-link span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ah-link em{font-style:normal;font-size:12px;color:${PRIMARY};white-space:nowrap}

  /* booking page window */
  .ah-bkwin{max-width:1120px;margin:0 auto}
  .ah-bk-top{display:flex;align-items:center;gap:9px;padding-bottom:14px;margin-bottom:16px;border-bottom:1px solid ${LINE}}
  .ah-bk-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}.ah-bk-top small{margin-left:auto;font-size:12.5px;color:${NEUTRAL}}
  .ah-bk{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
  .ah-bk-col{display:grid;gap:22px;align-content:start}
  .ah-g{display:grid;gap:9px;padding:10px;margin:-10px;border-radius:14px;transition:opacity .2s ease,background .2s ease,box-shadow .2s ease}
  .ah-bkwin.hl .ah-g:not(.on){opacity:.38}
  .ah-g.on{background:${MIST_SOFT};box-shadow:0 0 0 2px ${PRIMARY}}
  .ah-bk-h{display:flex;align-items:center;gap:9px;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;font-weight:600;color:${DEEP}}
  .ah-bk-h b{width:22px;height:22px;border-radius:50%;background:${DEEP};color:#fff;display:grid;place-items:center;font-size:11.5px}
  .ah-row{display:grid;grid-template-columns:18px minmax(0,1fr);gap:11px;align-items:center;padding:10px 12px;border-radius:11px;box-shadow:0 0 0 1px ${LINE};background:#fff}
  .ah-row.sel{box-shadow:0 0 0 2px ${PRIMARY}}
  .ah-row span:last-child{display:grid}.ah-row b{font-size:13.5px;color:${DEEP}}.ah-row small{font-size:12px;color:${NEUTRAL}}
  .ah-radio{width:16px;height:16px;border-radius:50%;box-shadow:inset 0 0 0 1.5px #B9C2BA}
  .ah-row.sel .ah-radio{box-shadow:inset 0 0 0 5px ${PRIMARY}}
  .ah-pros{display:flex;flex-wrap:wrap;gap:8px}
  .ah-pros span{display:inline-flex;align-items:center;gap:7px;padding:4px 12px 4px 4px;border-radius:999px;box-shadow:0 0 0 1px ${LINE};font-size:13px;font-weight:600;color:${INK}}
  .ah-pros span.sel{box-shadow:0 0 0 2px ${PRIMARY};color:${DEEP}}
  .ah-pros img{width:26px;height:26px;border-radius:50%;object-fit:cover}
  .ah-btn-mock{margin-top:2px;padding:11px 0;text-align:center;border-radius:9px;background:${PRIMARY};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;font-weight:600}
  .ah-caps-hint{margin:34px 0 0;text-align:center;font-size:14px;color:${NEUTRAL}}
  .ah-caps{list-style:none;margin:16px auto 0;padding:0;max-width:1120px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px 24px}
  .ah-caps li{display:grid;grid-template-columns:32px minmax(0,1fr);gap:14px;align-items:start;padding:14px;border-radius:14px;cursor:default;transition:background .2s ease}
  .ah-caps li:hover,.ah-caps li.on{background:#fff}
  .ah-caps li:focus-visible{outline:2px solid ${PRIMARY}}
  .ah-cap-n{width:30px;height:30px;border-radius:50%;background:${DEEP};color:#fff;font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:13.5px;display:grid;place-items:center}
  .ah-caps li span:last-child{display:grid;gap:3px}.ah-caps b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;color:${DEEP}}.ah-caps small{font-size:14.5px;line-height:1.5;color:${MUTED}}

  /* two column sections */
  .ah-two{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:64px;align-items:center}
  .ah-two.flip{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .ah-list{list-style:none;margin:26px 0 0;padding:0;display:grid}
  .ah-list li{display:flex;gap:12px;align-items:flex-start;padding:11px 0;border-top:1px solid ${LINE};font-size:15.5px;color:${INK}}
  .ah-list li:last-child{border-bottom:1px solid ${LINE}}
  .ah-list li svg{width:16px;height:16px;color:${PRIMARY};flex-shrink:0;margin-top:5px}
  .ah-list.cols{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:28px}
  .ah-list.cols li:nth-last-child(2){border-bottom:1px solid ${LINE}}

  /* calendar */
  .ah-cal-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
  .ah-cal-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}
  .ah-day{display:grid;grid-template-columns:46px repeat(3,minmax(0,1fr));gap:8px;height:320px}
  .ah-hours{display:grid;grid-template-rows:repeat(6,1fr);padding-top:34px;font-size:11px;color:${NEUTRAL}}
  .ah-colm{display:grid;grid-template-rows:auto 1fr;gap:6px;min-width:0}
  .ah-colh{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:${DEEP};height:28px;white-space:nowrap;overflow:hidden}
  .ah-colh img{width:26px;height:26px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #fff,0 2px 5px rgba(30,45,34,.25)}
  .ah-colb{position:relative;border-radius:10px;background:repeating-linear-gradient(180deg,${BAND} 0 calc(16.66% - 1px),${LINE} calc(16.66% - 1px) 16.66%)}
  .ah-colb i{position:absolute;left:4px;right:4px;border-radius:7px;padding:5px 7px;font-style:normal;font-size:11px;font-weight:600;line-height:1.25;overflow:hidden}
  .ah-colb i.ok{background:${MIST};color:${DEEP};box-shadow:inset 3px 0 0 ${PRIMARY}}
  .ah-colb i.warn{background:#FBF1DC;color:#7A4A06;box-shadow:inset 3px 0 0 #D97706}
  .ah-colb i.off{background:repeating-linear-gradient(135deg,#ECEFEA 0 6px,#E3E8E1 6px 12px);color:${NEUTRAL}}
  .ah-week{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;align-items:end;height:320px;padding:10px 4px 0}
  .ah-week div{display:grid;justify-items:center;gap:6px;align-content:end;height:100%}
  .ah-week b{font-size:12px;color:${DEEP};order:3}.ah-week span{width:60%;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,${PRIMARY},rgba(78,111,88,.55))}.ah-week small{font-size:11.5px;color:${NEUTRAL}}
  .ah-month{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;height:320px;align-content:start}
  .ah-month span{display:grid;gap:5px;padding:7px;border-radius:8px;background:${BAND};box-shadow:0 0 0 1px ${LINE}}
  .ah-month span.off{opacity:.5}.ah-month b{font-size:11px;color:${DEEP}}.ah-month i{height:5px;border-radius:5px;background:${PRIMARY};opacity:.7}
  .ah-legend{display:flex;gap:14px;margin-top:12px;font-size:12px;color:${MUTED}}
  .ah-legend span{display:inline-flex;align-items:center;gap:6px}.ah-legend i{width:12px;height:9px;border-radius:3px}
  .ah-legend .ok{background:${MIST}}.ah-legend .warn{background:#F5D9A0}.ah-legend .off{background:#E3E8E1}

  /* rules */
  .ah-rules{background:#fff;border-radius:20px;padding:22px;box-shadow:0 30px 60px -36px rgba(30,45,34,.35),0 0 0 1px ${LINE};display:grid;gap:12px}
  .ah-rules-h{display:flex;align-items:center;gap:11px;padding-bottom:12px;border-bottom:1px solid ${LINE}}
  .ah-rules-h img{width:40px;height:40px;border-radius:50%;object-fit:cover}
  .ah-rules-h span{display:grid}.ah-rules-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}.ah-rules-h small{font-size:12.5px;color:${NEUTRAL}}
  .ah-week-h{display:grid;gap:6px}
  .ah-week-h div{display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px;align-items:center;font-size:12px;color:${MUTED}}
  .ah-week-h b{font-weight:600;color:${DEEP}}
  .ah-week-h span{position:relative;height:16px;border-radius:5px;background:${BAND};box-shadow:0 0 0 1px ${LINE}}
  .ah-week-h i{position:absolute;top:3px;bottom:3px;border-radius:3px;background:${PRIMARY}}
  .ah-week-h em{position:absolute;left:8px;top:-1px;font-style:normal;font-size:11px;color:${NEUTRAL}}
  .ah-ctl{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 0;border-top:1px solid ${LINE};font-size:13.5px;color:${MUTED}}
  .ah-ctl b{color:${DEEP};text-align:right}
  .ah-chips{display:flex;gap:6px}
  .ah-chips button{border:1.5px solid ${LINE};background:#fff;border-radius:999px;padding:5px 12px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:12.5px;color:${MUTED};cursor:pointer}
  .ah-chips button.on{border-color:${PRIMARY};color:${DEEP};background:${MIST_SOFT}}
  .ah-out{padding:12px 14px;border-radius:14px;background:${BAND};display:grid;gap:8px;font-size:13.5px;color:${MUTED}}
  .ah-out b{color:${DEEP}}
  .ah-out div{display:flex;flex-wrap:wrap;gap:6px}
  .ah-out em{font-style:normal;font-size:12px;font-weight:600;padding:3px 9px;border-radius:7px;background:#fff;color:${DEEP};box-shadow:0 0 0 1px ${LINE}}

  /* lifecycle: three stages on top, two below */
  .ah-life{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:44px 36px}
  .ah-life-i{grid-column:span 2;display:flex;flex-direction:column}
  .ah-life-i:nth-child(n+4){grid-column:span 3}
  .ah-life-t{display:flex;align-items:center;gap:12px}
  .ah-n{width:34px;height:34px;border-radius:50%;background:${PRIMARY};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15px;flex-shrink:0}
  .ah-life-t h3{font-size:21px;line-height:1.2}
  .ah-life-i p{margin:12px 0 18px;font-size:15.5px;line-height:1.55;color:${MUTED}}
  .ah-vis{flex:1;border-radius:20px;background:${VIS};padding:20px;display:grid;place-items:center}
  .ah-card{width:100%;max-width:440px;background:#fff;border-radius:18px;padding:20px;display:grid;gap:10px;box-shadow:0 24px 50px -32px rgba(30,45,34,.4),0 0 0 1px ${LINE}}
  .ah-k{font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY}}
  .ah-q{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid ${LINE};font-size:13.5px;color:${MUTED}}
  .ah-q b{color:${DEEP}}.ah-q.hot{background:${MIST_SOFT};margin:0 -10px;padding:9px 10px;border-radius:9px;border-bottom:0}
  .ah-card .ap-badge{justify-self:start}
  .ah-move{display:flex;align-items:center;gap:12px;font-size:13.5px;font-weight:600;color:${MUTED}}
  .ah-move span{padding:7px 12px;border-radius:9px;background:${BAND};box-shadow:0 0 0 1px ${LINE}}.ah-move span.on{background:${PRIMARY};color:#fff;box-shadow:none}
  .ah-move svg{width:16px;height:16px;color:${PRIMARY}}
  .ah-msgs{display:grid;gap:10px;width:100%;max-width:420px}
  .ah-msg{display:grid;gap:2px;padding:12px 14px;border-radius:16px 16px 16px 4px;background:#fff;box-shadow:0 14px 30px -22px rgba(30,45,34,.5),0 0 0 1px ${LINE}}
  .ah-msg.team{border-radius:16px 16px 4px 16px;background:${MIST_SOFT};justify-self:end}
  .ah-ch{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${PRIMARY}}.ah-msg b{font-size:14px;color:${DEEP}}.ah-msg small{font-size:12.5px;color:${MUTED}}

  /* industries: photos with captions, no cards */
  .ah-ind{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:44px 28px;margin-bottom:48px}
  .ah-ind article{display:grid;gap:8px;align-content:start}
  .ah-ind img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:18px;display:block;margin-bottom:10px}
  .ah-ind h3{font-size:20px}
  .ah-ind p{margin:0;font-size:15px;line-height:1.55;color:${MUTED}}

  /* EVI */
  .ah-steps{list-style:none;margin:24px 0 0;padding:0;display:grid}
  .ah-steps li{display:grid;grid-template-columns:30px minmax(0,1fr);gap:14px;align-items:start;padding:14px 0;border-top:1px solid ${LINE};font-size:14.5px;line-height:1.5;color:${MUTED}}
  .ah-steps li:last-child{border-bottom:1px solid ${LINE}}
  .ah-steps b{width:30px;height:30px;border-radius:50%;background:${BAND};color:${DEEP};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-size:13px}
  .ah-steps em{display:block;font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:16px;color:${DEEP}}
  .ah-evi-bg{border-radius:24px;background:${VIS};padding:28px}
  .ah-chat{background:#fff;border-radius:20px;padding:18px;display:grid;gap:12px;box-shadow:0 24px 50px -32px rgba(30,45,34,.4),0 0 0 1px ${LINE}}
  .ah-me{justify-self:end;max-width:82%;background:${DEEP};color:#fff;padding:10px 15px;border-radius:16px 16px 4px 16px;font-size:14.5px}
  .ah-bot{display:grid;gap:8px;padding:12px;border-radius:4px 16px 16px 16px;background:${BAND}}
  .ah-bot p{margin:0;font-size:14px;color:${INK}}
  .ah-who{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-display),system-ui,sans-serif;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY}}
  .ah-who img{width:24px;height:24px;border-radius:50%;object-fit:cover;background:#E3DCC9;box-shadow:0 0 0 1.5px #fff,0 0 0 3px rgba(78,111,88,.5)}
  .ah-prep{display:grid;gap:4px;padding:14px 16px;border-radius:16px;background:${MIST_SOFT};box-shadow:0 0 0 1px ${LINE}}
  .ah-prep b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}.ah-prep small{font-size:13px;color:${MUTED}}
  .ah-acts{display:flex;gap:8px;justify-content:flex-end;margin-top:6px}
  .ah-undo{justify-self:start;background:none;border:0;padding:0;font:inherit;font-size:13px;font-weight:600;color:${PRIMARY};cursor:pointer;text-decoration:underline}

  /* integrations */
  .ah-hub{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,400px) minmax(0,1fr);gap:56px;align-items:center}
  .ah-hub-col{display:grid;gap:34px}
  .ah-node{display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;align-items:start}
  .ah-hub-col.l .ah-node{grid-template-columns:minmax(0,1fr) 44px;text-align:right}
  .ah-hub-col.l .ah-node .ah-ic{order:2}
  .ah-node span:last-child{display:grid;gap:3px}.ah-node b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP}}.ah-node small{font-size:14.5px;line-height:1.5;color:${MUTED}}
  .ah-ic{width:44px;height:44px;border-radius:50%;background:#fff;color:${PRIMARY};display:grid;place-items:center;box-shadow:0 0 0 1px ${LINE}}.ah-ic svg{width:21px;height:21px}
  .ah-core{background:#fff;border-radius:22px;padding:18px;box-shadow:0 30px 60px -36px rgba(30,45,34,.4),0 0 0 1px ${LINE}}
  .ah-core-h{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:12px;align-items:center;padding-bottom:14px;border-bottom:1px solid ${LINE}}
  .ah-core-h img{width:44px;height:44px;object-fit:cover}
  .ah-core-h span{display:grid}.ah-core-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${DEEP}}.ah-core-h small{font-size:12px;color:${NEUTRAL}}
  .ah-core ul{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px}
  .ah-core li{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:10px;align-items:center;font-size:13.5px;color:${DEEP};font-weight:500}
  .ah-dot{width:34px;height:34px;border-radius:50%;background:${BAND};color:${PRIMARY};display:grid;place-items:center}.ah-dot svg{width:16px;height:16px}
  .ah-core li em{color:${PRIMARY}}.ah-core li em svg{width:15px;height:15px}

  /* why: one photo and a plain list */
  .ah-why{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:64px;align-items:stretch}
  .ah-why-img{width:100%;height:100%;min-height:440px;object-fit:cover;border-radius:24px;display:block}
  .ah-why ul{list-style:none;margin:0;padding:0;display:grid;align-content:center}
  .ah-why li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:16px;align-items:start;padding:20px 0;border-top:1px solid ${LINE}}
  .ah-why li:first-child{border-top:0;padding-top:0}.ah-why li:last-child{padding-bottom:0}
  .ah-why-ic{width:44px;height:44px;border-radius:50%;background:${BAND};color:${PRIMARY};display:grid;place-items:center}.ah-why-ic svg{width:20px;height:20px}
  .ah-why li span:last-child{display:grid;gap:3px}.ah-why b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${DEEP}}.ah-why small{font-size:15px;line-height:1.5;color:${MUTED}}

  /* get started */
  .ah-start{list-style:none;margin:0 0 44px;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px 36px}
  .ah-start li{padding-top:18px;border-top:2px solid ${DEEP};display:grid;gap:6px;align-content:start}
  .ah-start-n{font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:14px;letter-spacing:.06em;color:${PRIMARY}}
  .ah-start h3{font-size:21px}
  .ah-start p{margin:0;font-size:15.5px;line-height:1.55;color:${MUTED}}

  @media (max-width:1100px){.ah-hub{grid-template-columns:minmax(0,1fr) minmax(0,340px) minmax(0,1fr);gap:36px}.ah-h1{font-size:46px}}
  @media (max-width:980px){
    .ah-hero,.ah-two,.ah-two.flip,.ah-why{grid-template-columns:minmax(0,1fr)}
    .ah-hero{gap:44px;padding:36px 0 56px}
    .ah-h1{font-size:40px}
    .ah-mos{height:480px;max-width:640px;margin:0 auto;width:100%}
    .ah-phone{width:206px}.ah-phone.one{left:30%}
    .ah-bk{grid-template-columns:minmax(0,1fr);gap:20px}
    .ah-caps{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ah-life{grid-template-columns:repeat(2,minmax(0,1fr))}.ah-life-i,.ah-life-i:nth-child(n+4){grid-column:span 1}
    .ah-hub{grid-template-columns:minmax(0,1fr);gap:28px}.ah-core{order:-1;max-width:440px;width:100%;margin:0 auto}
    .ah-hub-col,.ah-hub-col.l{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
    .ah-hub-col.l .ah-node{grid-template-columns:44px minmax(0,1fr);text-align:left}.ah-hub-col.l .ah-node .ah-ic{order:0}
    .ah-ind{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ah-start{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ah-why-img{min-height:0;aspect-ratio:3/2}
  }
  @media (max-width:600px){
    .ah-h1{font-size:34px}
    .ah-mos{height:440px}
    .ah-mos-grid{gap:8px}
    .ah-phone.one{left:auto;right:8px;width:178px;top:52px;padding:7px;border-radius:30px}
    .ah-ph-in{padding:0 4px 8px;font-size:11px}.ah-ph-pro,.ah-ph-k{display:none}
    .ah-ph-slots span{padding:6px 0;font-size:10.5px}
    .ah-today{left:10px;top:10px;font-size:11.5px}
    .ah-ph-in{gap:6px}
    .ah-toast{display:none}
    .ah-caps li{padding:12px 8px}
    .ah-caps,.ah-ind,.ah-start,.ah-hub-col,.ah-hub-col.l,.ah-list.cols{grid-template-columns:minmax(0,1fr)}
    .ah-list.cols li:nth-last-child(2){border-bottom:0}
    .ah-life{grid-template-columns:minmax(0,1fr)}
    .ah-vis{padding:16px 12px}
    .ah-evi-bg{padding:14px}
    .ah-day{grid-template-columns:38px repeat(3,minmax(0,1fr));gap:5px}
    .ah-colb i{font-size:10px;padding:4px 5px}.ah-colh{font-size:11px}
    .ah-ctl{flex-direction:column;align-items:flex-start;gap:6px}.ah-ctl b{text-align:left}
    .ah-item{grid-template-columns:44px minmax(0,1fr)}.ah-item .ap-badge{grid-column:2;justify-self:start}
  }
`;
