"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { I } from "../theme";
import { SPACE_IMG } from "../space/ui";
import { ApptShell, StartButton } from "./ApptShell";
import { ApptTryIt } from "./ApptTryIt";
import { BG, DEEP, INK, LINE, MIST, MIST_SOFT, MUTED, NEUTRAL, PRIMARY, SAND } from "./palette";

/* Appointment Scheduling, Home. Content from the microsite brief: online booking, appointment management,
   availability rules, the appointment lifecycle, industries, EVI, integrations, why EVOQ Appointments and
   how to get started. Every section is on a light background. Sample data in every product view. */

const PH = (f: string) => `/healthcare/pm/${f}`;

/* turn taking for tabbed visuals: once while on screen, a click hands control over */
function useTurns(count: number, dwell: number) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto || !seen || i >= count - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => n + 1), dwell);
    return () => clearTimeout(t);
  }, [i, auto, seen, count, dwell]);
  const pick = (n: number) => { setAuto(false); setI(n); };
  return [ref, { i, pick, running: auto && seen }] as const;
}

const Win = ({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) => (
  <div className={`ap-win ${className}`}>
    <div className="ap-chrome"><span className="ap-dots" aria-hidden><i /><i /><i /></span><span className="ap-url">{url}</span></div>
    <div className="ah-win-b">{children}</div>
  </div>
);

/* ---------- 2. online booking ---------- */
const BOOK = [
  { t: "Service selection", d: "Present available services with descriptions and appointment durations." },
  { t: "Provider selection", d: "Let clients choose a preferred provider where applicable." },
  { t: "Location selection", d: "Allow clients to choose where their appointment will take place." },
  { t: "Available time slots", d: "Display appointment times according to configured availability." },
  { t: "Booking details", d: "Collect contact information and relevant appointment details." },
  { t: "Online booking page", d: "Share your booking page directly or add it to your website." },
];
const PEOPLE = [
  { n: "Dr. Priya", r: "General practitioner", img: PH("doctor.jpg"), s: "Next free Thu 14:30" },
  { n: "Ana", r: "Nurse practitioner", img: PH("nurse.jpg"), s: "Next free today 16:00" },
  { n: "Joy", r: "Physiotherapist", img: PH("stock-provider-smile.jpg"), s: "Next free Fri 09:30" },
];
function BookView({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="ah-list">
        {[["Initial consultation", "30 min", PH("stock-patient.jpg")], ["Follow up visit", "20 min", PH("practice-clinics.jpg")], ["Physiotherapy session", "45 min", PH("practice-physio.jpg")], ["Skin check", "15 min", PH("practice-derm.jpg")]].map(([n, d, im]) => (
          <div key={n} className="ah-item"><img src={im} alt="" /><span><b>{n}</b><small>{d} · In person</small></span><em className="ap-badge moss">{d}</em></div>
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div className="ah-list">
        <div className="ah-item any"><span className="ah-any">{I.people}</span><span><b>Any available provider</b><small>Shows the earliest time</small></span></div>
        {PEOPLE.map((p) => <div key={p.n} className="ah-item"><img className="round" src={p.img} alt="" /><span><b>{p.n}</b><small>{p.r}</small></span><em className="ap-badge ok">{p.s}</em></div>)}
      </div>
    );
  if (i === 2)
    return (
      <div className="ah-list">
        {[["Riverside Clinic", "Ground floor · 6 rooms", "Nearest"], ["City Centre", "Level 2 · 4 rooms", ""], ["Northside", "Ground floor · 3 rooms", ""], ["Video appointment", "Online", ""]].map(([n, d, b]) => (
          <div key={n} className="ah-item"><span className="ah-any">{n === "Video appointment" ? I.message : I.pin}</span><span><b>{n}</b><small>{d}</small></span>{b && <em className="ap-badge moss">{b}</em>}</div>
        ))}
      </div>
    );
  if (i === 3)
    return (
      <div>
        <div className="ah-seg">{["Wed 18", "Thu 19", "Fri 20", "Sat 21"].map((d, n) => <span key={d} className={n === 1 ? "on" : ""}>{d}</span>)}</div>
        <div className="ah-slots">{["09:00", "09:30", "10:00", "11:00", "11:30", "13:30", "14:30", "15:00", "16:00"].map((t, n) => <span key={t} className={n === 6 ? "on" : n === 2 || n === 4 ? "off" : ""}>{t}</span>)}</div>
        <p className="ah-fine">Times follow provider hours, the service length and buffers.</p>
      </div>
    );
  if (i === 4)
    return (
      <div className="ah-form">
        {[["Full name", "Sam Lee"], ["Email", "sam@example.com"], ["Phone", "+00 0000 0000"], ["Reason for the visit", "Back pain for two weeks"]].map(([k, v]) => <label key={k}>{k}<span>{v}</span></label>)}
        <span className="ah-check">{I.check}I agree to the clinic&apos;s booking policy</span>
      </div>
    );
  return (
    <div className="ah-share">
      <div className="ah-link"><span>book.riverside-clinic.example</span><em>Copy link</em></div>
      <div className="ah-code">&lt;script src=&quot;book.riverside-clinic.example/embed.js&quot;&gt;&lt;/script&gt;</div>
      <div className="ah-list">
        {[["Website button", "Opens the booking page"], ["Embedded page", "Booking inside your site"], ["Direct link", "For email and social profiles"]].map(([n, d]) => <div key={n} className="ah-item"><span className="ah-any">{I.layers}</span><span><b>{n}</b><small>{d}</small></span></div>)}
      </div>
    </div>
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

/* ---------- 5. lifecycle ---------- */
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
  { t: "Healthcare & clinics", d: "Schedule consultations, follow-up appointments and provider visits. Manage practitioner availability, appointment durations and location-based schedules.", img: PH("practice-clinics.jpg") },
  { t: "Beauty & aesthetics", d: "Organize consultations and aesthetic services with provider selection, service durations, appointment preparation and booking requirements.", img: PH("practice-aesthetics.jpg") },
  { t: "Salons & spas", d: "Manage services, stylist or therapist schedules, appointment durations and client bookings across individual providers.", img: SPACE_IMG.lounge },
  { t: "Wellness & fitness", d: "Schedule personal sessions, instructor-led appointments and group activities with appropriate availability and capacity.", img: PH("practice-physio.jpg") },
  { t: "Professional services", d: "Coordinate consultations and client meetings with specialist selection, appointment requirements and virtual or in-person options.", img: "/industries/v2/ps-main2-hd.jpg" },
  { t: "Education & training", d: "Manage student consultations, tutoring sessions and instructor appointments, including individual and group scheduling.", img: SPACE_IMG.training },
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
  { t: "Service-led scheduling", d: "Configure appointment services with their own durations, pricing and booking requirements.", img: PH("practice-aesthetics.jpg") },
  { t: "Provider-based availability", d: "Manage schedules around the people delivering each service.", img: PH("doctor.jpg") },
  { t: "Controlled booking", d: "Define when and how clients can book available appointments.", img: PH("stock-visit.jpg") },
  { t: "Client-facing booking", d: "Give clients a direct way to find and confirm appointments.", img: PH("stock-frontdesk.jpg") },
  { t: "Multi-location operations", d: "Coordinate services, providers and schedules across supported locations.", img: "/industries/v2/hc-main-hd.jpg" },
  { t: "EVOQ ecosystem", d: "Extend appointment processes through connected EVOQ applications.", img: "/healthcare/journey-consult.jpg" },
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
  const [bookRef, book] = useTurns(BOOK.length, 6000);
  const [lifeRef, life] = useTurns(LIFE.length, 7000);
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
          <ApptTryIt />
        </div>
      }
    >
      <style>{css}</style>

      {/* 2. online appointment booking */}
      <section className="ap-out ap-sec ap-white" id="booking">
        <div className="ap-in">
          <div className="ap-head" data-rv="0">
            <span className="ap-label">Online appointment booking</span>
            <h2 className="ap-h2">Make it easier for clients to book the services they need.</h2>
            <p className="ap-lead">Give clients a clear path from choosing a service to confirming an appointment. They can select a provider, find an available time and submit their details through your online booking page.</p>
          </div>
          <div className="ah-split" ref={bookRef} data-rv="1">
            <div className="ah-tabs" role="tablist" aria-label="Booking capabilities">
              {BOOK.map((b, n) => (
                <button key={b.t} type="button" role="tab" aria-selected={book.i === n} className={book.i === n ? "on" : ""} onClick={() => book.pick(n)}>
                  <b>{n + 1}</b><span><em>{b.t}</em><small>{b.d}</small></span>
                  {book.i === n && book.running && n < BOOK.length - 1 && <i className="ap-bar" style={{ ["--dwell" as string]: "6s" }} aria-hidden />}
                </button>
              ))}
            </div>
            <Win url="book.riverside-clinic.example" className="ah-book">
              <div className="ah-book-h"><span className="ah-logo">R</span><b>Riverside Clinic</b><small>{BOOK[book.i].t}</small></div>
              <div className="ah-view" key={book.i}><BookView i={book.i} /></div>
            </Win>
          </div>
          <p className="ap-note">{I.check}Clients can book at a time that suits them, without having to coordinate every appointment through calls and messages.</p>
        </div>
      </section>

      {/* 3. appointment management */}
      <section className="ap-out ap-sec" id="management">
        <div className="ap-in ah-two">
          <div data-rv="0">
            <span className="ap-label">Appointment management</span>
            <h2 className="ap-h2" style={{ marginTop: 14 }}>A clear view of every appointment and provider schedule.</h2>
            <p className="ap-lead">Keep track of daily appointments, provider availability and booking updates through a centralized scheduling interface. See what is coming up, identify schedule changes and manage appointments as they progress.</p>
            <ul className="ah-checks">
              {["Day, week and month calendar views", "Appointments organized by provider, service and location", "Appointment status tracking", "Manual appointment creation and updates", "Rescheduling and cancellation management", "Access to upcoming and past appointments"].map((t) => <li key={t}>{I.check}{t}</li>)}
            </ul>
            <p className="ap-note">{I.clock}From the first booking to the final appointment update, maintain visibility into your daily schedule.</p>
          </div>
          <div data-rv="1"><CalView /></div>
        </div>
      </section>

      {/* 4. availability and scheduling controls */}
      <section className="ap-out ap-sec ap-white" id="availability">
        <div className="ap-in ah-two flip">
          <div data-rv="1"><RulesView /></div>
          <div data-rv="0">
            <span className="ap-label">Availability &amp; scheduling controls</span>
            <h2 className="ap-h2" style={{ marginTop: 14 }}>Set the rules behind every available time slot.</h2>
            <p className="ap-lead">Appointment availability depends on more than operating hours. Configure schedules around service durations, provider working hours, preparation time and booking policies.</p>
            <ul className="ah-checks cols">
              {["Organization and location operating hours", "Individual provider availability", "Service-specific durations", "Preparation and buffer times", "Booking intervals and advance booking limits", "Blocked dates, breaks and unavailable periods", "Cancellation and rescheduling policies", "Appointment capacity and scheduling rules"].map((t) => <li key={t}>{I.check}{t}</li>)}
            </ul>
            <p className="ap-note">{I.edit}Control when services can be booked and which appointment slots are offered to clients.</p>
          </div>
        </div>
      </section>

      {/* 5. the appointment lifecycle */}
      <section className="ap-out ap-sec" id="lifecycle">
        <div className="ap-in">
          <div className="ap-head c" data-rv="0">
            <span className="ap-label">Manage the appointment lifecycle</span>
            <h2 className="ap-h2">More control over the work surrounding each booking.</h2>
            <p className="ap-lead">An appointment involves more than selecting a date and time. Collect the right information, keep clients informed and manage the updates that happen before and after a scheduled visit.</p>
          </div>
          <div className="ah-pills" role="tablist" aria-label="Lifecycle" data-rv="1">
            {LIFE.map((l, n) => (
              <button key={l.t} type="button" role="tab" aria-selected={life.i === n} className={life.i === n ? "on" : ""} onClick={() => life.pick(n)}>
                {life.i === n && life.running && n < LIFE.length - 1 && <i className="ap-bar" style={{ ["--dwell" as string]: "7s", background: SAND }} aria-hidden />}
                {l.t}
              </button>
            ))}
          </div>
          <div className="ah-box" ref={lifeRef} data-rv="2">
            <div className="ah-box-t" key={`t${life.i}`}>
              <span className="ah-n">{life.i + 1}</span>
              <h3>{LIFE[life.i].t}</h3>
              <p>{LIFE[life.i].d}</p>
            </div>
            <div className="ah-box-v" key={`v${life.i}`}><LifeView i={life.i} /></div>
          </div>
          <p className="ap-note">{I.check}Keep the details and administrative tasks associated with each appointment within view.</p>
        </div>
      </section>

      {/* 6. industries */}
      <section className="ap-out ap-sec ap-white" id="industries">
        <div className="ap-in">
          <div className="ap-head" data-rv="0">
            <span className="ap-label">Appointment scheduling across industries</span>
            <h2 className="ap-h2">Different services. Different scheduling needs.</h2>
            <p className="ap-lead">Appointment requirements vary by industry. EVOQ Appointments supports service-based scheduling across a range of organizations, with services, providers, durations and availability configured around how each organization operates.</p>
          </div>
          <div className="ah-ind">
            {INDUSTRIES.map((x, n) => (
              <article key={x.t} className="ah-ind-c" data-rv={n % 3}>
                <img src={x.img} alt="" loading="lazy" />
                <div><h3>{x.t}</h3><p>{x.d}</p></div>
              </article>
            ))}
          </div>
          <div className="ap-ctas" style={{ justifyContent: "center" }}><a href="#booking" className="ap-btn secondary">Explore features</a></div>
        </div>
      </section>

      {/* 7. EVI */}
      <section className="ap-out ap-sec" id="evi">
        <div className="ap-in ah-evi">
          <div data-rv="0">
            <span className="ap-label">EVI, AI assistance for appointments</span>
            <h2 className="ap-h2" style={{ marginTop: 14 }}>A smarter way to work with appointment information.</h2>
            <p className="ap-lead">EVI is evolving to help administrators work with appointment schedules, identify relevant information and prepare actions through natural-language interactions.</p>
            <ol className="ah-steps">{EVI_POINTS.map(([t, d], n) => <li key={t}><b>{n + 1}</b><span><em>{t}</em>{d}</span></li>)}</ol>
            <div className="ap-ctas"><a href="/products/ai" className="ap-btn secondary">Explore EVI</a></div>
          </div>
          <div data-rv="1">
            <EviCard />
            <p className="ah-fine">EVI can help interpret the request, review relevant scheduling information and prepare suitable options, subject to available integrations and implemented capabilities.</p>
          </div>
        </div>
      </section>

      {/* 8. integrations and the EVOQ ecosystem */}
      <section className="ap-out ap-sec ap-white" id="integrations">
        <div className="ap-in">
          <div className="ap-head c" data-rv="0">
            <span className="ap-label">Integrations &amp; EVOQ ecosystem</span>
            <h2 className="ap-h2">Appointment scheduling within your wider operations.</h2>
            <p className="ap-lead">Appointments are often part of a larger client relationship. Connect scheduling with supported applications to help information move between the systems involved in managing enquiries, client relationships, payments and communication.</p>
          </div>
          <div className="ah-hub">
            <div className="ah-hub-col">{INT_L.map((n) => <div key={n.t} className="ah-node l"><span className="ah-ic">{n.ic}</span><span><b>{n.t}</b><small>{n.d}</small></span></div>)}</div>
            <div className="ah-core" data-rv="1">
              <div className="ah-core-h"><img className="round" src={PH("doctor.jpg")} alt="" /><span><b>Initial consultation</b><small>AP 31027 · Thu 19 Nov, 14:30</small></span><em className="ap-badge ok">Confirmed</em></div>
              <ul>{SYNC.map(([ic, t]) => <li key={t}><span className="ah-dot">{ic}</span>{t}<em>{I.check}</em></li>)}</ul>
            </div>
            <div className="ah-hub-col">{INT_R.map((n) => <div key={n.t} className="ah-node r"><span className="ah-ic">{n.ic}</span><span><b>{n.t}</b><small>{n.d}</small></span></div>)}</div>
          </div>
          <p className="ap-note">{I.layers}Keep appointment scheduling aligned with the wider tools and processes your organization relies on.</p>
        </div>
      </section>

      {/* 9. why EVOQ Appointments */}
      <section className="ap-out ap-sec" id="why">
        <div className="ap-in">
          <div className="ap-head c" data-rv="0">
            <span className="ap-label">Why EVOQ Appointments</span>
            <h2 className="ap-h2">Appointment management that reflects how services are delivered.</h2>
            <p className="ap-lead">A booking calendar is only part of appointment operations. Service configuration, provider availability, booking requirements and ongoing appointment administration all influence how well scheduling works. EVOQ Appointments brings these capabilities into a service-based scheduling experience.</p>
          </div>
          <div className="ah-why">
            {WHY.map((w, n) => (
              <article key={w.t} className="ah-why-c" data-rv={n % 3}>
                <img src={w.img} alt="" loading="lazy" />
                <div><h3>{w.t}</h3><p>{w.d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. get started */}
      <section className="ap-out ap-sec ap-white" id="start">
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
                <span className="ah-ic">{s.ic}</span>
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
          <h2 className="ap-h2">Give every appointment a clearer path from booking to completion.</h2>
          <p className="ap-lead">Manage services, provider schedules, availability and client bookings with EVOQ Appointments.</p>
          <div className="ap-ctas"><StartButton location="close" /><a href="#booking" className="ap-btn secondary">Explore features</a></div>
        </div>
      </section>
    </ApptShell>
  );
}

const css = `
  .ah-hero{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:44px;align-items:center;padding:44px 0 64px}
  .ah-h1{font-size:50px;line-height:1.06;letter-spacing:-.025em;margin:14px 0 0!important;text-wrap:balance}
  .ah-sub{margin:14px 0 0;font-size:15.5px;line-height:1.6;color:${NEUTRAL};max-width:56ch}
  .ah-win-b{padding:14px}
  .round{border-radius:50%!important}

  /* booking */
  .ah-split{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:28px;align-items:start}
  .ah-tabs{display:grid;gap:8px}
  .ah-tabs button{position:relative;overflow:hidden;display:grid;grid-template-columns:30px minmax(0,1fr);gap:14px;align-items:start;text-align:left;border:0;background:${BG};border-radius:16px;padding:13px 16px;cursor:pointer;font:inherit;color:inherit;box-shadow:0 0 0 1px ${LINE}}
  .ah-tabs button:hover{box-shadow:0 0 0 1px rgba(78,111,88,.5)}
  .ah-tabs button.on{background:#fff;box-shadow:0 0 0 2px ${PRIMARY},0 16px 30px -22px rgba(30,45,34,.45)}
  .ah-tabs b{width:28px;height:28px;border-radius:50%;background:${MIST};color:${DEEP};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px}
  .ah-tabs button.on b{background:${PRIMARY};color:#fff}
  .ah-tabs span{display:grid;gap:1px}.ah-tabs em{font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15.5px;color:${DEEP}}.ah-tabs small{font-size:13px;line-height:1.4;color:${MUTED}}
  .ah-book-h{display:flex;align-items:center;gap:9px;margin-bottom:12px}
  .ah-logo{width:24px;height:24px;border-radius:7px;background:${DEEP};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:700;font-size:13px}
  .ah-book-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}.ah-book-h small{margin-left:auto;font-size:12px;color:${NEUTRAL}}
  .ah-view{min-height:300px;animation:apIn .35s ease both}
  .ah-list{display:grid;gap:8px}
  .ah-item{display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:11px;align-items:center;padding:7px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ah-item img{width:48px;height:42px;object-fit:cover;border-radius:9px;display:block}
  .ah-item img.round{width:42px;height:42px;margin:0 3px}
  .ah-item span:not(.ah-any){display:grid;min-width:0}.ah-item b{font-size:13.5px;color:${DEEP}}.ah-item small{font-size:12px;color:${NEUTRAL}}
  .ah-any{width:42px;height:42px;margin:0 3px;border-radius:12px;background:${MIST_SOFT};color:${PRIMARY};display:grid;place-items:center}.ah-any svg{width:19px;height:19px}
  .ah-seg{display:inline-flex;gap:2px;background:${BG};border-radius:9px;padding:3px;box-shadow:0 0 0 1px ${LINE};margin-bottom:12px}
  .ah-seg span,.ah-seg button{border:0;background:none;padding:6px 12px;border-radius:7px;font-size:12.5px;font-weight:600;color:${MUTED};font-family:var(--font-display),system-ui,sans-serif;cursor:pointer}
  .ah-seg .on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(30,45,34,.18)}
  .ah-seg.sm{margin:0}
  .ah-slots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
  .ah-slots span{padding:10px 0;text-align:center;border-radius:10px;background:#fff;box-shadow:0 0 0 1.5px ${LINE};font-size:13px;font-weight:600;color:${INK};font-family:var(--font-display),system-ui,sans-serif}
  .ah-slots .on{background:${PRIMARY};color:#fff;box-shadow:none}
  .ah-slots .off{background:repeating-linear-gradient(135deg,#F1F3EF 0 6px,#E8ECE6 6px 12px);color:#A4ADA5}
  .ah-fine{margin:12px 0 0;font-size:12.5px;color:${NEUTRAL}}
  .ah-form{display:grid;gap:10px}
  .ah-form label{display:grid;gap:4px;font-size:12px;font-weight:600;color:${NEUTRAL}}
  .ah-form label span{padding:10px 12px;border-radius:9px;background:#fff;box-shadow:0 0 0 1.5px ${LINE};font-size:13.5px;font-weight:500;color:${INK}}
  .ah-check{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:${MUTED}}.ah-check svg{width:15px;height:15px;color:#fff;background:${PRIMARY};border-radius:4px;padding:1px}
  .ah-share{display:grid;gap:10px}
  .ah-link{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:${MIST_SOFT};font-size:13px;font-weight:600;color:${DEEP}}
  .ah-link em{font-style:normal;font-size:12px;color:${PRIMARY}}
  .ah-code{padding:10px 12px;border-radius:10px;background:#F1F3EF;font-family:ui-monospace,monospace;font-size:11.5px;color:${MUTED};overflow:hidden;white-space:nowrap;text-overflow:ellipsis}

  /* two column sections */
  .ah-two{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px;align-items:center}
  .ah-two.flip{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}
  .ah-checks{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:9px}
  .ah-checks.cols{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px 18px}
  .ah-checks li{display:flex;gap:9px;align-items:flex-start;font-size:15px;color:${INK}}
  .ah-checks li svg{width:16px;height:16px;color:${PRIMARY};flex-shrink:0;margin-top:4px}

  /* calendar */
  .ah-cal-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
  .ah-cal-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}
  .ah-day{display:grid;grid-template-columns:46px repeat(3,minmax(0,1fr));gap:8px;height:300px}
  .ah-hours{display:grid;grid-template-rows:repeat(6,1fr);padding-top:34px;font-size:11px;color:${NEUTRAL}}
  .ah-colm{display:grid;grid-template-rows:auto 1fr;gap:6px;min-width:0}
  .ah-colh{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:${DEEP};height:28px;white-space:nowrap;overflow:hidden}
  .ah-colh img{width:26px;height:26px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #fff,0 2px 5px rgba(30,45,34,.25)}
  .ah-colb{position:relative;border-radius:10px;background:repeating-linear-gradient(180deg,${BG} 0 calc(16.66% - 1px),${LINE} calc(16.66% - 1px) 16.66%)}
  .ah-colb i{position:absolute;left:4px;right:4px;border-radius:7px;padding:5px 7px;font-style:normal;font-size:11px;font-weight:600;line-height:1.25;overflow:hidden}
  .ah-colb i.ok{background:rgba(78,111,88,.16);color:${DEEP};box-shadow:inset 3px 0 0 ${PRIMARY}}
  .ah-colb i.warn{background:#FBF1DC;color:#7A4A06;box-shadow:inset 3px 0 0 #D97706}
  .ah-colb i.off{background:repeating-linear-gradient(135deg,#ECEFEA 0 6px,#E3E8E1 6px 12px);color:${NEUTRAL}}
  .ah-week{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;align-items:end;height:300px;padding:10px 4px 0}
  .ah-week div{display:grid;justify-items:center;gap:6px;align-content:end;height:100%}
  .ah-week b{font-size:12px;color:${DEEP};order:3}.ah-week span{width:60%;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,${PRIMARY},rgba(78,111,88,.55))}.ah-week small{font-size:11.5px;color:${NEUTRAL}}
  .ah-month{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;height:300px;align-content:start}
  .ah-month span{display:grid;gap:5px;padding:7px;border-radius:8px;background:${BG};box-shadow:0 0 0 1px ${LINE}}
  .ah-month span.off{opacity:.5}.ah-month b{font-size:11px;color:${DEEP}}.ah-month i{height:5px;border-radius:5px;background:${PRIMARY};opacity:.7}
  .ah-legend{display:flex;gap:14px;margin-top:12px;font-size:12px;color:${MUTED}}
  .ah-legend span{display:inline-flex;align-items:center;gap:6px}.ah-legend i{width:12px;height:9px;border-radius:3px}
  .ah-legend .ok{background:rgba(78,111,88,.3)}.ah-legend .warn{background:#F5D9A0}.ah-legend .off{background:#E3E8E1}

  /* rules */
  .ah-rules{background:#fff;border-radius:22px;padding:22px;box-shadow:0 30px 60px -34px rgba(30,45,34,.4),0 0 0 1px ${LINE};display:grid;gap:12px}
  .ah-rules-h{display:flex;align-items:center;gap:11px;padding-bottom:12px;border-bottom:1px solid ${LINE}}
  .ah-rules-h img{width:40px;height:40px;border-radius:50%;object-fit:cover}
  .ah-rules-h span{display:grid}.ah-rules-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}.ah-rules-h small{font-size:12.5px;color:${NEUTRAL}}
  .ah-week-h{display:grid;gap:6px}
  .ah-week-h div{display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px;align-items:center;font-size:12px;color:${MUTED}}
  .ah-week-h b{font-weight:600;color:${DEEP}}
  .ah-week-h span{position:relative;height:16px;border-radius:5px;background:${BG};box-shadow:0 0 0 1px ${LINE}}
  .ah-week-h i{position:absolute;top:3px;bottom:3px;border-radius:3px;background:${PRIMARY}}
  .ah-week-h em{position:absolute;left:8px;top:-1px;font-style:normal;font-size:11px;color:${NEUTRAL}}
  .ah-ctl{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 0;border-top:1px solid ${LINE};font-size:13.5px;color:${MUTED}}
  .ah-ctl b{color:${DEEP};text-align:right}
  .ah-chips{display:flex;gap:6px}
  .ah-chips button{border:1.5px solid ${LINE};background:#fff;border-radius:999px;padding:5px 12px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:12.5px;color:${MUTED};cursor:pointer}
  .ah-chips button.on{border-color:${PRIMARY};color:${DEEP};background:${MIST_SOFT}}
  .ah-out{padding:12px 14px;border-radius:14px;background:${MIST_SOFT};display:grid;gap:8px;font-size:13.5px;color:${MUTED}}
  .ah-out b{color:${DEEP}}
  .ah-out div{display:flex;flex-wrap:wrap;gap:6px}
  .ah-out em{font-style:normal;font-size:12px;font-weight:600;padding:3px 9px;border-radius:7px;background:#fff;color:${DEEP};box-shadow:0 0 0 1px ${LINE}}

  /* lifecycle box */
  .ah-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:-14px 0 24px}
  .ah-pills button{position:relative;overflow:hidden;border:1px solid ${LINE};background:#fff;color:${MUTED};border-radius:999px;padding:9px 18px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:14px;cursor:pointer}
  .ah-pills button:hover{border-color:${PRIMARY}}
  .ah-pills button.on{background:${PRIMARY};border-color:${PRIMARY};color:#fff}
  .ah-box{position:relative;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:48px;align-items:center;padding:40px 44px;border-radius:30px;background:#EDF2EA;overflow:hidden;box-shadow:0 0 0 1px rgba(30,45,34,.05)}
  .ah-box::before{content:"";position:absolute;right:-120px;top:-140px;width:460px;height:460px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,185,140,.5),rgba(217,185,140,0));pointer-events:none}
  .ah-box-t,.ah-box-v{position:relative;animation:apIn .4s ease both}
  .ah-n{width:36px;height:36px;border-radius:50%;background:${PRIMARY};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15px}
  .ah-box-t h3{font-size:28px;line-height:1.15;margin:16px 0 10px!important}
  .ah-box-t p{margin:0;font-size:16.5px;color:${MUTED}}
  .ah-card{background:#fff;border-radius:20px;padding:20px;display:grid;gap:10px;box-shadow:0 24px 50px -30px rgba(30,45,34,.45),0 0 0 1px ${LINE};max-width:440px;margin-left:auto}
  .ah-k{font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY}}
  .ah-q{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid ${LINE};font-size:13.5px;color:${MUTED}}
  .ah-q b{color:${DEEP}}.ah-q.hot{background:${MIST_SOFT};margin:0 -10px;padding:9px 10px;border-radius:9px;border-bottom:0}
  .ah-card .ap-badge{justify-self:start}
  .ah-move{display:flex;align-items:center;gap:12px;font-size:13.5px;font-weight:600;color:${MUTED}}
  .ah-move span{padding:7px 12px;border-radius:9px;background:${BG};box-shadow:0 0 0 1px ${LINE}}.ah-move span.on{background:${PRIMARY};color:#fff;box-shadow:none}
  .ah-move svg{width:16px;height:16px;color:${PRIMARY}}
  .ah-msgs{display:grid;gap:10px;max-width:440px;margin-left:auto}
  .ah-msg{display:grid;gap:2px;padding:12px 14px;border-radius:16px 16px 16px 4px;background:#fff;box-shadow:0 14px 30px -22px rgba(30,45,34,.5),0 0 0 1px ${LINE}}
  .ah-msg.team{border-radius:16px 16px 4px 16px;background:${MIST_SOFT};justify-self:end}
  .ah-ch{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${PRIMARY}}.ah-msg b{font-size:14px;color:${DEEP}}.ah-msg small{font-size:12.5px;color:${MUTED}}

  /* industries and why */
  .ah-ind,.ah-why{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
  .ah-ind-c,.ah-why-c{border-radius:20px;overflow:hidden;background:${BG};box-shadow:0 0 0 1px ${LINE};display:flex;flex-direction:column}
  .ah-why-c{background:#fff}
  .ah-ind-c img,.ah-why-c img{width:100%;height:190px;object-fit:cover;display:block}
  .ah-ind-c>div,.ah-why-c>div{padding:18px 20px 22px;display:grid;gap:8px}
  .ah-ind-c h3,.ah-why-c h3{font-size:18.5px}
  .ah-ind-c p,.ah-why-c p{margin:0;font-size:14.5px;line-height:1.55;color:${MUTED}}

  /* EVI */
  .ah-evi{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:56px;align-items:center;background:#EDF2EA;border-radius:34px;padding:48px}
  .ah-steps{list-style:none;margin:24px 0 0;padding:0;display:grid;gap:14px}
  .ah-steps li{display:grid;grid-template-columns:30px minmax(0,1fr);gap:14px;align-items:start;font-size:14.5px;line-height:1.5;color:${MUTED}}
  .ah-steps b{width:30px;height:30px;border-radius:50%;border:1.5px solid ${PRIMARY};color:${PRIMARY};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;background:#fff}
  .ah-steps em{display:block;font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:16px;color:${DEEP}}
  .ah-chat{background:#fff;border-radius:24px;padding:18px;display:grid;gap:12px;box-shadow:0 30px 60px -34px rgba(30,45,34,.45),0 0 0 1px ${LINE}}
  .ah-me{justify-self:end;max-width:82%;background:${PRIMARY};color:#fff;padding:10px 15px;border-radius:16px 16px 4px 16px;font-size:14.5px}
  .ah-bot{display:grid;gap:8px;padding:12px;border-radius:4px 16px 16px 16px;background:${BG}}
  .ah-bot p{margin:0;font-size:14px;color:${INK}}
  .ah-who{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-display),system-ui,sans-serif;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY}}
  .ah-who img{width:24px;height:24px;border-radius:50%;object-fit:cover;background:#E3DCC9;box-shadow:0 0 0 1.5px #fff,0 0 0 3px rgba(78,111,88,.5)}
  .ah-prep{display:grid;gap:4px;padding:14px 16px;border-radius:16px;background:${MIST_SOFT};box-shadow:0 0 0 1px ${LINE}}
  .ah-prep b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}.ah-prep small{font-size:13px;color:${MUTED}}
  .ah-acts{display:flex;gap:8px;justify-content:flex-end;margin-top:6px}
  .ah-undo{justify-self:start;background:none;border:0;padding:0;font:inherit;font-size:13px;font-weight:600;color:${PRIMARY};cursor:pointer;text-decoration:underline}

  /* integrations hub */
  .ah-hub{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,380px) minmax(0,1fr);gap:56px;align-items:center}
  .ah-hub-col{display:grid;gap:14px}
  .ah-node{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;align-items:start;background:${BG};border-radius:18px;padding:16px 18px;box-shadow:0 0 0 1px ${LINE}}
  .ah-node span:last-child{display:grid;gap:3px}.ah-node b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}.ah-node small{font-size:13.5px;line-height:1.45;color:${MUTED}}
  .ah-node::after{content:"";position:absolute;top:50%;width:56px;border-top:2px dashed rgba(78,111,88,.45)}
  .ah-node.l::after{left:100%}.ah-node.r::after{right:100%}
  .ah-node::before{content:"";position:absolute;top:50%;width:9px;height:9px;margin-top:-4px;border-radius:50%;background:${PRIMARY};z-index:1}
  .ah-node.l::before{right:-5px}.ah-node.r::before{left:-5px}
  .ah-ic{width:44px;height:44px;border-radius:12px;background:${MIST};color:${PRIMARY};display:grid;place-items:center}.ah-ic svg{width:22px;height:22px}
  .ah-core{background:#fff;border-radius:24px;padding:18px;box-shadow:0 30px 60px -34px rgba(30,45,34,.45),0 0 0 1px ${LINE}}
  .ah-core-h{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:12px;align-items:center;padding-bottom:14px;border-bottom:1px solid ${LINE}}
  .ah-core-h img{width:44px;height:44px;object-fit:cover}
  .ah-core-h span{display:grid}.ah-core-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${DEEP}}.ah-core-h small{font-size:12px;color:${NEUTRAL}}
  .ah-core ul{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px}
  .ah-core li{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:10px;align-items:center;font-size:13.5px;color:${DEEP};font-weight:500}
  .ah-dot{width:34px;height:34px;border-radius:50%;background:${MIST_SOFT};color:${PRIMARY};display:grid;place-items:center}.ah-dot svg{width:16px;height:16px}
  .ah-core li em{color:${PRIMARY}}.ah-core li em svg{width:15px;height:15px}

  /* get started */
  .ah-start{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;counter-reset:s}
  .ah-start li{position:relative;background:${BG};border-radius:20px;padding:22px;display:grid;gap:8px;align-content:start;box-shadow:0 0 0 1px ${LINE}}
  .ah-start-n{position:absolute;top:18px;right:20px;font-family:var(--font-display),system-ui,sans-serif;font-weight:700;font-size:28px;color:rgba(78,111,88,.22)}
  .ah-start h3{font-size:18px;margin-top:6px!important}
  .ah-start p{margin:0;font-size:14.5px;line-height:1.5;color:${MUTED}}

  @media (max-width:1100px){.ah-hub{grid-template-columns:minmax(0,1fr) minmax(0,340px) minmax(0,1fr);gap:40px}.ah-node::after{width:40px}}
  @media (max-width:980px){
    .ah-hero,.ah-split,.ah-two,.ah-two.flip,.ah-box,.ah-evi{grid-template-columns:minmax(0,1fr)}
    .ah-hero{gap:36px;padding:32px 0 48px}
    .ah-h1{font-size:38px}
    .ah-box,.ah-evi{padding:28px 24px;gap:28px}
    .ah-card,.ah-msgs{margin-left:0}
    .ah-hub{grid-template-columns:minmax(0,1fr);gap:18px}.ah-core{order:-1;max-width:440px;width:100%;margin:0 auto}
    .ah-hub-col{grid-template-columns:repeat(2,minmax(0,1fr))}.ah-node::after,.ah-node::before{display:none}
    .ah-ind,.ah-why,.ah-start{grid-template-columns:repeat(2,minmax(0,1fr))}
  }
  @media (max-width:600px){
    .ah-h1{font-size:33px}
    .ah-ind,.ah-why,.ah-start,.ah-hub-col,.ah-checks.cols{grid-template-columns:minmax(0,1fr)}
    .ah-tabs small{display:none}
    .ah-day{grid-template-columns:38px repeat(3,minmax(0,1fr));gap:5px}
    .ah-colb i{font-size:10px;padding:4px 5px}
    .ah-colh{font-size:11px}
    .ah-slots{grid-template-columns:repeat(3,minmax(0,1fr))}
    .ah-item{grid-template-columns:44px minmax(0,1fr)}.ah-item .ap-badge{grid-column:2;justify-self:start}
    .ah-ctl{flex-direction:column;align-items:flex-start;gap:6px}.ah-ctl b{text-align:left}
  }
  @media (prefers-reduced-motion:reduce){.ah-view,.ah-box-t,.ah-box-v{animation:none}}
`;
