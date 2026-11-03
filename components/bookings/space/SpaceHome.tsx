"use client";

import { useState } from "react";
import { BG, DEEP, I, LINE, MUTED, NEUTRAL, SAGE, TERRA } from "../theme";
import { DemoButton, SR_BASE, SpaceShell } from "./SpaceShell";
import { BookingFlowUI, CalendarUI, CatalogueUI, DashboardUI, ReservationUI } from "./ui";

/* Space & Room Reservations, Home: the narrative page. Problem, product, journey, audiences,
   use cases, product preview and an AI teaser. The full capability list lives on Features. */

const F = `${SR_BASE}/features`;

const CHALLENGES = [
  { t: "Room conflicts", d: "Two teams arrive at the Board Room at 10:00 because each booking lived in a different calendar." },
  { t: "Manual requests", d: "Hall requests arrive by email and phone, and someone retypes them into a spreadsheet." },
  { t: "Calendars split by building", d: "Each site keeps its own calendar, so nobody can see availability across locations." },
  { t: "Unclear availability", d: "People cannot tell whether a room is free, blocked for maintenance or waiting for approval." },
  { t: "Rules that depend on who you ask", d: "Approval, cancellation and setup time rules change from person to person instead of from space to space." },
];

const FLOW = [
  { t: "Configure spaces", d: "Capacity, amenities, equipment, photos and status.", href: `${F}#spaces` },
  { t: "Set availability", d: "Hours, notice periods, booking length and buffers.", href: `${F}#availability` },
  { t: "Publish a booking page", d: "People find a space and pick a time.", href: `${F}#public-booking` },
  { t: "Manage reservations", d: "Approve, reschedule, cancel and keep the history.", href: `${F}#lifecycle` },
];

const STEPS = [
  { t: "Configure locations and spaces", d: "Add buildings and floors, then each bookable room, hall or item with its capacity, amenities and photos.", href: `${F}#locations` },
  { t: "Define the rules", d: "Set operating hours, minimum notice, how far ahead people can book, booking length, buffers and which spaces need approval.", href: `${F}#rules` },
  { t: "Publish", d: "Share a branded booking page where visitors discover spaces, choose a time and answer your questions.", href: `${F}#public-booking` },
  { t: "Receive reservations", d: "Requests and confirmed bookings land in the calendar with the organizer and a booking reference.", href: `${F}#calendar` },
  { t: "Review and manage", d: "Approve, reject, reschedule or cancel, and every change stays in the reservation history.", href: `${F}#lifecycle` },
  { t: "Check in and report", d: "Confirm arrivals by QR code or reference, mark no shows and review utilization by location.", href: `${F}#checkin` },
];

const AUDIENCES = [
  {
    k: "offices", name: "Corporate offices",
    problem: "Meeting rooms fill up with holds that nobody uses, while teams with a real need cannot find a room.",
    flow: "Employees book by capacity and equipment from the calendar. Bookings that are not checked in within the grace period are released, and facilities teams see which rooms are actually used.",
    features: ["Check in and release", "Resource aware calendar", "Utilization reports"],
  },
  {
    k: "coworking", name: "Coworking spaces",
    problem: "Members expect to book meeting rooms themselves, and what they pay depends on the room and the time.",
    flow: "Members book from your branded page, rates apply where you set them, and each booking is kept on the member's contact record with its payment status.",
    features: ["Branded booking page", "Rates and payment status", "Contacts and history"],
  },
  {
    k: "training", name: "Training and education",
    problem: "A training room is only ready when the layout, the projector and the setup time are right.",
    flow: "Bookers choose a layout and the equipment they need. Setup and cleanup buffers hold the room around each session, and equipment cannot be reserved twice for the same time.",
    features: ["Layouts and equipment", "Setup and cleanup buffers", "Custom booking fields"],
  },
  {
    k: "venues", name: "Venues and shared facilities",
    problem: "Outside groups request halls weeks ahead, and each request needs a decision and a clear answer.",
    flow: "Requests arrive through your booking page with answers to your questions and acceptance of your terms. They wait for approval, and deposits apply where you configure them.",
    features: ["Approval workflow", "Custom questions and terms", "Deposits where configured"],
  },
  {
    k: "locations", name: "Several locations",
    problem: "Each site runs its own process, so nobody can compare demand or share spaces across the organization.",
    flow: "Each location keeps its own hours, floors and administrators, while reports compare bookings and utilization across sites.",
    features: ["Locations and floors", "Roles by location", "Reports by location"],
  },
];

const USES = [
  { t: "Employee meeting room booking", need: "A team needs a room for six people with a screen at 14:00.", act: "They filter by capacity and equipment and book a free room from the calendar.", res: "The room is confirmed and the organizer gets a calendar file for the meeting." },
  { t: "Coworking member reservation", need: "A member wants the meeting room on Friday morning.", act: "The member books on your public page at the rate you set for that room.", res: "The booking and its payment status sit on the member's contact record." },
  { t: "Training room with equipment", need: "The people team runs a two hour onboarding session with a projector.", act: "The booking includes the classroom layout, the projector kit and setup time before the session.", res: "Facilities knows what to prepare, and the projector is not booked twice." },
  { t: "External venue request", need: "A community group asks for Hall A on a Saturday.", act: "The request arrives pending approval, with their answers to your booking questions.", res: "An operator approves it, and the group receives a confirmation with a booking reference." },
  { t: "Facilities utilization review", need: "Facilities wants to know which rooms are underused.", act: "They filter reports by location and period, then export the data to CSV.", res: "Hall A is booked for 22% of its bookable hours, so it opens to outside groups." },
];

const PREVIEW = [
  { k: "dashboard", name: "Dashboard", ui: <DashboardUI />, notes: ["Today's reservations, approvals and check ins for the selected location", "Approvals waiting for a decision, with the requesting team", "Switch location to see another site"] },
  { k: "calendar", name: "Calendar", ui: <CalendarUI />, notes: ["Day, week, month and list views", "Each space and item on its own row, so conflicts are visible", "Confirmed, pending and blocked time shown differently"] },
  { k: "spaces", name: "Spaces", ui: <CatalogueUI />, notes: ["Capacity, location and floor for every space", "Amenities and equipment people can filter by", "Which spaces need approval before a booking is confirmed"] },
  { k: "booking", name: "Booking page", ui: <BookingFlowUI />, notes: ["Visitors choose a date, a time and the duration", "Layout and equipment choices where the space offers them", "Clear status before they send the request"] },
  { k: "reservation", name: "Reservation", ui: <ReservationUI />, notes: ["Everything about the booking, including setup and cleanup time", "Approve, reject or reschedule from the record", "A booking reference for check in and changes"] },
];

export function SpaceHome() {
  const [aud, setAud] = useState(AUDIENCES[0].k);
  const [pv, setPv] = useState(PREVIEW[0].k);
  const a = AUDIENCES.find((x) => x.k === aud)!;
  const p = PREVIEW.find((x) => x.k === pv)!;

  return (
    <SpaceShell page="home">
      <style>{css}</style>

      {/* 1. hero */}
      <section className="sh-hero">
        <div className="sh-hero-band">
          <span className="sh-shape ring" aria-hidden /><span className="sh-shape disc" aria-hidden />
          <div className="sh-hero-grid">
            <div className="sh-hero-copy">
              <span className="sh-tag"><i>{I.rules}</i>EVOQ Bookings · Space &amp; Room Reservations</span>
              <h1 className="sr-h1">Make every space easier to find, reserve and manage.</h1>
              <p className="sr-lead">Publish meeting rooms, halls, training rooms and shared equipment with their own availability and rules. People book what they need, and your team reviews, confirms and tracks each reservation across locations.</p>
              <div className="sr-ctas">
                <DemoButton location="space_home_hero" />
                <a href={F} className="sr-btn secondary">Explore features</a>
              </div>
            </div>
            <div className="sh-hero-vis" aria-hidden>
              <div className="sh-hero-cal"><CalendarUI compact /></div>
              <div className="sh-hero-pub"><BookingFlowUI /></div>
              <div className="sh-hero-chip"><span className="sr-badge warn">Pending approval</span><b>Hall A · Town hall</b><small>Sat 21 Nov · 15:00</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. the operational challenge */}
      <section className="sr-out sr-sec" id="challenge">
        <div className="sr-in">
          <div className="sr-head" data-rv="0">
            <span className="sr-label">The operational challenge</span>
            <h2 className="sr-h2">Double bookings, email requests and calendars nobody trusts.</h2>
            <p className="sr-lead">Most room booking problems have little to do with the rooms. They start when requests arrive in different places and the rules live in a few people&apos;s heads.</p>
          </div>
          <div className="sh-chal">
            {CHALLENGES.map((c, i) => (
              <div key={c.t} className="sh-chal-card" data-rv={i}>
                <span className="sh-chal-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. space reservation management, explained */}
      <section className="sr-out sr-sec sh-explain">
        <div className="sr-in">
          <div className="sr-head c" data-rv="0">
            <span className="sr-label">Space reservation management</span>
            <h2 className="sr-h2">Describe each space once. People book it within your rules.</h2>
            <p className="sr-lead">The space, its availability and its booking rules are kept together, so the page visitors book from and the calendar your team manages show the same information.</p>
          </div>
          <div className="sh-flow" data-rv="1">
            {FLOW.map((f, i) => (
              <a key={f.t} href={f.href} className="sh-flow-node">
                <span className="sh-flow-n">{i + 1}</span>
                <b>{f.t}</b>
                <small>{f.d}</small>
                <em>See the features {I.arrow}</em>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. how it works */}
      <section className="sr-out sr-sec" id="how-it-works">
        <div className="sr-in">
          <div className="sr-head" data-rv="0">
            <span className="sr-label">How it works</span>
            <h2 className="sr-h2">From a new space to a utilization report, in six steps.</h2>
          </div>
          <ol className="sh-steps">
            {STEPS.map((s, i) => (
              <li key={s.t} data-rv={i}>
                <span className="sh-step-n">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <a href={s.href} className="sr-link">Related features {I.arrow}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. who it's for */}
      <section className="sr-out sr-sec sh-who" id="who-its-for">
        <div className="sr-in">
          <div className="sr-head" data-rv="0">
            <span className="sr-label">Who it&apos;s for</span>
            <h2 className="sr-h2">An office books rooms differently from a coworking space.</h2>
            <p className="sr-lead">Choose the setup closest to yours to see the problem it usually starts with and how EVOQ Bookings handles it.</p>
          </div>
          <div className="sh-tabs" role="tablist" aria-label="Who it is for">
            {AUDIENCES.map((x) => (
              <button key={x.k} type="button" role="tab" aria-selected={x.k === aud} className={x.k === aud ? "on" : ""} onClick={() => setAud(x.k)}>{x.name}</button>
            ))}
          </div>
          <div className="sh-aud" role="tabpanel" key={a.k}>
            <div className="sh-aud-col">
              <span className="sh-aud-k">The problem</span>
              <p className="sh-aud-problem">{a.problem}</p>
            </div>
            <div className="sh-aud-col">
              <span className="sh-aud-k">How it works in EVOQ</span>
              <p>{a.flow}</p>
              <div className="sh-aud-feat">{a.features.map((f) => <span key={f}>{I.check}{f}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. use cases */}
      <section className="sr-out sr-sec" id="use-cases">
        <div className="sr-in">
          <div className="sr-head" data-rv="0">
            <span className="sr-label">Use cases</span>
            <h2 className="sr-h2">What a booking looks like from start to finish.</h2>
          </div>
          <div className="sh-uses">
            {USES.map((u, i) => (
              <article key={u.t} className="sh-use" data-rv={i % 3}>
                <h3>{u.t}</h3>
                <dl>
                  <div><dt>The need</dt><dd>{u.need}</dd></div>
                  <div><dt>In EVOQ</dt><dd>{u.act}</dd></div>
                  <div className="res"><dt>The result</dt><dd>{u.res}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. product experience preview */}
      <section className="sr-out sr-sec sh-prev" id="product">
        <div className="sr-in">
          <div className="sr-head c" data-rv="0">
            <span className="sr-label">Product preview</span>
            <h2 className="sr-h2">The screens your team and your visitors use.</h2>
          </div>
          <div className="sh-tabs c" role="tablist" aria-label="Product screens">
            {PREVIEW.map((x) => (
              <button key={x.k} type="button" role="tab" aria-selected={x.k === pv} className={x.k === pv ? "on" : ""} onClick={() => setPv(x.k)}>{x.name}</button>
            ))}
          </div>
          <div className="sh-prev-stage" role="tabpanel" key={p.k}>
            <div className="sh-prev-ui">{p.ui}</div>
            <ul className="sh-prev-notes">
              {p.notes.map((n, i) => <li key={n}><span>{i + 1}</span>{n}</li>)}
              <li className="more"><a href={F} className="sr-link">All features {I.arrow}</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. AI and assisted operations teaser */}
      <section className="sr-out sr-sec" id="ai">
        <div className="sr-in sh-ai">
          <div data-rv="0">
            <span className="sr-label">AI assistants</span>
            <h2 className="sr-h2" style={{ marginTop: 14 }}>Visitors describe what they need. Your team approves what changes.</h2>
            <p className="sr-lead">A booking assistant helps visitors find a suitable space from a plain request. An administrative assistant answers questions about today&apos;s bookings, approvals and conflicts. When an agent prepares a change to a reservation, it waits for a person to approve it.</p>
            <div className="sr-ctas"><a href={`${F}#ai`} className="sr-btn secondary">See the AI capabilities</a></div>
          </div>
          <div className="sh-ai-vis" data-rv="1" aria-hidden>
            <div className="sh-bubble me">I need a room for 10 people with a screen, Thursday afternoon.</div>
            <div className="sh-bubble bot">
              <small>Interpreted as</small>
              <span className="sh-crit"><em>Thu 19 Nov</em><em>13:00 to 17:00</em><em>10+ seats</em><em>Screen</em></span>
              <b>2 spaces match</b>
              <span className="sh-match"><span>Board Room · 12 seats</span><span className="sr-badge ok">Free 14:00</span></span>
              <span className="sh-match"><span>Training Room 2 · 24 seats</span><span className="sr-badge warn">Needs approval</span></span>
            </div>
            <div className="sh-prepared">
              <span className="sh-prep-k">Prepared for review</span>
              <b>Move the vendor workshop to Training Room 2</b>
              <small>Hall A is blocked for maintenance on Friday morning.</small>
              <span className="sh-prep-act"><span className="sr-btn ghost sm">Reject</span><span className="sr-btn primary sm">Approve</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. closing CTA */}
      <section className="sr-close">
        <div className="sr-close-band" data-rv="0">
          <span className="sr-label">For offices, coworking spaces, training centers and venues</span>
          <h2 className="sr-h2" style={{ marginTop: 14 }}>See your own spaces, rules and locations in EVOQ Bookings.</h2>
          <p className="sr-lead">Tell us how many locations and spaces you manage and what people book today. We will tailor the demo to your setup.</p>
          <div className="sr-ctas">
            <DemoButton location="space_home_close" />
            <a href={`${SR_BASE}/pricing`} className="sr-btn secondary">View pricing</a>
          </div>
        </div>
      </section>
    </SpaceShell>
  );
}

const css = `
  .sh-hero{padding:4px 16px 0}
  .sh-hero-band{position:relative;border-radius:28px;background:linear-gradient(100deg,#DCE8DF 0%,#F3E8D8 52%,#E8C9B7 100%);padding:72px 24px 80px;overflow:hidden}
  .sh-shape{position:absolute;pointer-events:none}
  .sh-shape.ring{top:-90px;right:6%;width:300px;height:300px;border-radius:50%;border:1.5px solid ${TERRA};opacity:.2}
  .sh-shape.disc{bottom:-150px;left:-100px;width:360px;height:360px;border-radius:50%;background:${SAGE};opacity:.08}
  .sh-hero-grid{position:relative;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:44px;align-items:center}
  .sh-tag{display:inline-flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:999px;background:rgba(255,255,255,.7);font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;color:${DEEP}}
  .sh-tag i{width:24px;height:24px;border-radius:50%;background:${SAGE};color:#fff;display:grid;place-items:center}
  .sh-tag i svg{width:14px;height:14px}
  .sh-hero-vis{position:relative;min-height:540px}
  .sh-hero-cal{position:absolute;top:0;left:10%;right:0}
  .sh-hero-pub{position:absolute;left:0;bottom:0;width:52%;transform:rotate(-1deg)}
  .sh-hero-chip{position:absolute;right:4%;bottom:36px;background:#fff;border-radius:12px;padding:10px 14px;box-shadow:0 18px 36px -18px rgba(38,51,43,.5);display:grid;gap:3px;line-height:1.3}
  .sh-hero-chip b{font-size:13px;color:${DEEP}}.sh-hero-chip small{font-size:11.5px;color:${NEUTRAL}}

  .sh-chal{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
  .sh-chal-card{background:#fff;border-radius:16px;padding:22px;box-shadow:0 0 0 1px rgba(38,51,43,.07)}
  .sh-chal-n{font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:700;color:${TERRA}}
  .sh-chal-card h3{font-size:17px;line-height:1.3;margin:10px 0 8px!important}
  .sh-chal-card p{margin:0;font-size:14.5px;color:${MUTED}}

  .sh-explain{background:#fff}
  .sh-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative}
  .sh-flow::before{content:"";position:absolute;top:30px;left:12%;right:12%;border-top:2px dashed ${LINE}}
  .sh-flow-node{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;padding:0 10px 18px;text-decoration:none;color:inherit}
  .sh-flow-n{width:60px;height:60px;border-radius:50%;background:${BG};border:2px solid ${SAGE};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:700;color:${SAGE};margin-bottom:8px}
  .sh-flow-node b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP}}
  .sh-flow-node small{font-size:14px;color:${MUTED};line-height:1.45}
  .sh-flow-node em{font-style:normal;font-size:13.5px;font-weight:600;color:${TERRA};display:inline-flex;align-items:center;gap:5px;margin-top:4px}
  .sh-flow-node em svg{width:14px;height:14px}
  .sh-flow-node:hover .sh-flow-n{background:${SAGE};color:#fff}

  .sh-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;counter-reset:s}
  .sh-steps li{background:#fff;border-radius:16px;padding:24px;box-shadow:0 0 0 1px rgba(38,51,43,.07);display:flex;flex-direction:column}
  .sh-step-n{width:34px;height:34px;border-radius:10px;background:rgba(100,133,109,.14);color:${SAGE};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:700;margin-bottom:14px}
  .sh-steps h3{font-size:18px;margin-bottom:8px!important}
  .sh-steps p{margin:0 0 14px;color:${MUTED};font-size:15px;flex:1}

  .sh-who{background:#fff}
  .sh-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
  .sh-tabs.c{justify-content:center}
  .sh-tabs button{border:1.5px solid ${LINE};background:#fff;border-radius:999px;padding:9px 16px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:${MUTED};cursor:pointer}
  .sh-tabs button.on{border-color:${SAGE};background:${SAGE};color:#fff}
  .sh-aud{display:grid;grid-template-columns:1fr 1.2fr;gap:20px;animation:shIn .35s ease}
  .sh-aud-col{background:${BG};border-radius:18px;padding:28px}
  .sh-aud-k{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${TERRA}}
  .sh-aud-problem{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;line-height:1.35;color:${DEEP};margin:10px 0 0}
  .sh-aud-col p{margin:10px 0 0;font-size:16px}
  .sh-aud-feat{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
  .sh-aud-feat span{display:inline-flex;align-items:center;gap:6px;background:#fff;border-radius:999px;padding:6px 12px;font-size:13.5px;font-weight:600;color:${DEEP}}
  .sh-aud-feat svg{width:14px;height:14px;color:${SAGE}}
  @keyframes shIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

  .sh-uses{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .sh-use{background:#fff;border-radius:16px;padding:24px;box-shadow:0 0 0 1px rgba(38,51,43,.07)}
  .sh-use h3{font-size:18px;margin-bottom:14px!important}
  .sh-use dl{margin:0;display:grid;gap:12px}
  .sh-use dt{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${NEUTRAL}}
  .sh-use dd{margin:2px 0 0;font-size:15px;color:${MUTED}}
  .sh-use .res{background:rgba(100,133,109,.08);border-radius:10px;padding:10px 12px}
  .sh-use .res dt{color:${SAGE}}.sh-use .res dd{color:${DEEP};font-weight:500}

  .sh-prev{background:#fff}
  .sh-prev-stage{display:grid;grid-template-columns:1.4fr 1fr;gap:36px;align-items:center;animation:shIn .35s ease}
  .sh-prev-ui{background:${BG};border-radius:22px;padding:28px}
  .sh-prev-notes{list-style:none;margin:0;padding:0;display:grid;gap:16px}
  .sh-prev-notes li{display:flex;gap:12px;font-size:16px;line-height:1.5}
  .sh-prev-notes li span{width:26px;height:26px;border-radius:50%;background:${SAGE};color:#fff;display:grid;place-items:center;font-size:13px;font-weight:700;flex-shrink:0}
  .sh-prev-notes li.more{padding-left:38px}

  .sh-ai{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
  .sh-ai-vis{background:linear-gradient(140deg,#DCE8DF,#F3E8D8);border-radius:22px;padding:28px;display:grid;gap:12px}
  .sh-bubble{max-width:88%;border-radius:16px;padding:12px 14px;font-size:14px;line-height:1.45}
  .sh-bubble.me{justify-self:end;background:${SAGE};color:#fff;border-bottom-right-radius:4px}
  .sh-bubble.bot{background:#fff;border-bottom-left-radius:4px;display:grid;gap:7px;box-shadow:0 12px 28px -20px rgba(38,51,43,.5)}
  .sh-bubble.bot small{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${NEUTRAL}}
  .sh-bubble.bot b{color:${DEEP}}
  .sh-crit{display:flex;flex-wrap:wrap;gap:5px}
  .sh-crit em{font-style:normal;font-size:12px;padding:2px 8px;border-radius:999px;background:${BG};color:${DEEP}}
  .sh-match{display:flex;justify-content:space-between;gap:10px;align-items:center;font-size:13px;color:${DEEP};padding-top:6px;border-top:1px solid ${LINE}}
  .sh-prepared{background:#fff;border-radius:14px;padding:14px 16px;display:grid;gap:4px;box-shadow:0 0 0 1.5px rgba(217,119,6,.35)}
  .sh-prep-k{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#A35A04}
  .sh-prepared b{font-size:14.5px;color:${DEEP}}.sh-prepared small{font-size:12.5px;color:${MUTED}}
  .sh-prep-act{display:flex;justify-content:flex-end;gap:8px;margin-top:6px}

  @media (max-width:1100px){.sh-chal{grid-template-columns:repeat(3,1fr)}}
  @media (max-width:960px){
    .sh-hero-grid,.sh-ai,.sh-prev-stage,.sh-aud{grid-template-columns:minmax(0,1fr)}
    .sh-hero-vis{min-height:0;display:grid;gap:14px}
    .sh-hero-cal,.sh-hero-pub,.sh-hero-chip{position:static;width:auto;transform:none}
    .sh-hero-pub,.sh-hero-chip{display:none}
    .sh-steps,.sh-uses{grid-template-columns:repeat(2,minmax(0,1fr))}
    .sh-flow{grid-template-columns:repeat(2,1fr);row-gap:28px}.sh-flow::before{display:none}
  }
  @media (max-width:640px){
    .sh-hero-band{padding:48px 18px 48px}
    .sh-chal,.sh-steps,.sh-uses,.sh-flow{grid-template-columns:minmax(0,1fr)}
    .sh-hero-cal{display:none}
    .sh-hero-pub{display:block}
    .sh-aud-problem{font-size:19px}
    .sh-prev-ui{padding:14px}
  }
`;

