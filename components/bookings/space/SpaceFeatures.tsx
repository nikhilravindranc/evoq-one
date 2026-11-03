"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/track";
import { BG, DEEP, I, LINE, MUTED, NEUTRAL, SAGE, TERRA } from "../theme";
import { DemoButton, SR_BASE, SpaceShell } from "./SpaceShell";
import { BookingFlowUI, CalendarUI, CatalogueUI, CheckInUI, ReportsUI, ReservationUI, SettingsUI } from "./ui";

/* Space & Room Reservations, Features: the full capability catalogue, grouped as in the microsite
   plan, with the dedicated AI section.

   Release status: each group (and AI capability) can carry one of the plan's website status labels.
   They are left unset until the product owner approves the feature to website status matrix; set
   `status` to show the label next to the group title. */

type Status = "Available" | "Limited availability" | "In development" | "Integration interface" | "AI assisted demonstration";

type Group = { id: string; t: string; intro: string; items: string[]; ui: ReactNode; note?: string; status?: Status };

const GROUPS: Group[] = [
  {
    id: "spaces", t: "Space and resource management",
    intro: "Keep a catalogue of everything people can reserve, with the details that decide whether it fits a booking.",
    items: ["Space catalogue for meeting rooms, conference rooms, halls, prayer rooms, shared spaces and equipment", "Resource types and capacity", "Rates where applicable", "Setup and cleanup time", "Approval requirements per resource", "Amenities and equipment", "Status and maintenance", "Resource images", "Custom booking fields"],
    ui: <CatalogueUI />,
  },
  {
    id: "locations", t: "Locations and floors",
    intro: "Organize spaces by building and floor, and decide which categories each location offers.",
    items: ["Multiple locations with their own details", "Operating hours per location", "Floors linked to their spaces", "Category availability by location", "Floor and space organization"],
    ui: <SettingsUI title="Location · Head office" rows={[["Operating hours", "Mon to Fri, 08:00 to 19:00"], ["Floors", "Ground, Level 1, Level 2, Level 3"], ["Categories offered", "Meeting rooms, halls, equipment"], ["Spaces", "14"]]} />,
  },
  {
    id: "availability", t: "Availability management",
    intro: "Define when each space and location can be booked, down to the slot interval and the buffer around each booking.",
    items: ["Weekly operating hours", "Custom hours and date overrides", "Slot intervals", "Minimum notice", "Maximum advance booking", "Minimum and maximum reservation length", "Setup and cleanup buffers", "Blocked periods and maintenance blocks", "Availability by resource and by location"],
    ui: <SettingsUI title="Availability · Training Room 2" rows={[["Slot interval", "30 minutes"], ["Minimum notice", "2 hours"], ["Book up to", "60 days ahead"], ["Booking length", "30 minutes to 4 hours"], ["Setup and cleanup", "15 minutes each"], ["Blocked", "24 Dec to 1 Jan"]]} />,
  },
  {
    id: "calendar", t: "Calendar and scheduling",
    intro: "See every space side by side, spot conflicts and create bookings straight from the calendar.",
    items: ["Day, week, month and list views", "Resource aware calendar", "Date navigation and filters", "Inspect a reservation from the calendar", "Create a booking from the calendar", "Conflict visibility"],
    ui: <CalendarUI />,
  },
  {
    id: "lifecycle", t: "Reservation lifecycle",
    intro: "Follow each reservation from request to completion, with a reference and a history for every change.",
    items: ["Reservations created by administrators", "Public booking requests", "Pending approval, confirmation and rejection", "Rescheduling and cancellation", "Completion and no shows", "Reservation history and booking references", "Recurring reservations where supported"],
    ui: <ReservationUI />,
  },
  {
    id: "rules", t: "Booking rules and policies",
    intro: "Write your booking policy into the system, so every request is checked against the same rules.",
    items: ["Approval requirements", "Capacity checks", "Booking length rules and advance booking limits", "Cancellation and rescheduling windows", "Booking limits", "Check in grace period and release settings", "Custom questions and terms"],
    ui: <SettingsUI title="Policy · Hall A" rows={[["Approval", "Required"], ["Capacity check", "On"], ["Cancel", "Up to 24 hours before"], ["Reschedule", "Up to 12 hours before"], ["Bookings per person", "3 a week"], ["Check in grace period", "15 minutes, then release"], ["Terms", "Must be accepted"]]} />,
  },
  {
    id: "public-booking", t: "Public booking experience",
    intro: "Give visitors a branded page to discover spaces and request a booking on any screen size.",
    items: ["Branded booking page", "Public space discovery and resource details", "Date, time and duration selection", "Layout and equipment choices", "Organizer details and custom questions", "Booking summary and confirmation", "Manage booking page", "Calendar file (.ics) for the booking"],
    ui: <BookingFlowUI />,
  },
  {
    id: "checkin", t: "Check in and attendance",
    intro: "Confirm who actually turned up, and free the space when nobody does.",
    items: ["QR code presentation", "Booking reference validation", "Check in and check in confirmation", "Invalid and expired reference states", "No show and completion handling"],
    ui: <CheckInUI />,
  },
  {
    id: "contacts", t: "Contacts and organizers",
    intro: "Keep organizers and their bookings connected, so you can see who books what.",
    items: ["Organizer and contact records linked to reservations", "Contact information", "Booking history per contact", "Search across contacts and bookings"],
    ui: <SettingsUI title="Contact · Priya Nair" rows={[["Team", "People team"], ["Email", "priya.nair@northwind.example"], ["Bookings this year", "12"], ["Last booking", "Training Room 2 · 19 Nov"], ["Next booking", "Board Room · 26 Nov"]]} />,
  },
  {
    id: "payments", t: "Payments and charges",
    intro: "Record the charges that belong to a booking: rates, deposits where you configure them and their payment status.",
    items: ["Rates per space where applicable", "Deposits where configured", "Payment status on the booking", "Refunds and adjustments relevant to a reservation"],
    note: "Invoicing and accounting stay in EVOQ Billing. Bookings records only the charges that belong to a reservation.",
    ui: <SettingsUI title="Charges · BK 20418" rows={[["Rate", "40.00 per hour"], ["Deposit", "25% when confirmed"], ["Payment status", "Deposit paid"], ["Adjustment", "None"]]} />,
  },
  {
    id: "notifications", t: "Notifications",
    intro: "Prepare the messages people receive about their bookings and choose the channel for each.",
    items: ["Email, SMS and WhatsApp templates", "Booking related notification types", "Template preview", "Channel configuration"],
    ui: <SettingsUI title="Template · Booking confirmed" rows={[["Channels", "Email, SMS, WhatsApp"], ["Sent when", "A booking is confirmed"], ["Preview", "Your booking for Training Room 2 on Thu 19 Nov at 13:00 is confirmed."]]} />,
  },
  {
    id: "reports", t: "Reports and analytics",
    intro: "Understand demand and utilization with defined metrics you can filter and export.",
    items: ["Reservation reports", "Period and location filters", "Booking status", "Demand and lead time", "Utilization", "Booking reasons and channels where available", "Charts, tables and CSV export"],
    ui: <ReportsUI />,
  },
  {
    id: "access", t: "Multiple locations, administration and access",
    intro: "Give each location its own administrators and decide what every role can see and change.",
    items: ["Organization and location settings", "Workspace context", "User roles and permissions", "Responsibilities by location", "Related configuration"],
    ui: <SettingsUI title="Roles" rows={[["Organization admin", "All locations and settings"], ["Location manager", "Spaces, rules and approvals at a location"], ["Front desk", "Calendar, check in and reservations"], ["Requester", "Book and manage own reservations"]]} />,
  },
  {
    id: "integrations", t: "Integrations and developer capabilities",
    intro: "Connection settings for calendars, plus API keys and webhooks for your own systems.",
    items: ["Google Calendar connection settings", "Outlook and Microsoft 365 connection settings", "API key management", "Webhook configuration and delivery logs", "Calendar file (.ics) export"],
    ui: <SettingsUI title="Integrations" rows={[["Google Calendar", "Connection settings"], ["Outlook and Microsoft 365", "Connection settings"], ["API keys", "2 keys"], ["Webhooks", "Booking confirmed, booking cancelled"], ["Delivery log", "Last 30 days"]]} />,
  },
];

type Ai = { t: string; helps: string; uses: string; approval: string; demo: ReactNode; status?: Status };
const AI: Ai[] = [
  {
    t: "Visitor booking assistant",
    helps: "Visitors describe the space they need in their own words and see suitable options.",
    uses: "Date, time, capacity and requirements taken from the request, matched against spaces and availability.",
    approval: "The visitor still chooses and sends the booking; approval rules apply as usual.",
    demo: <><p className="sf-q">A quiet room for 4 on Monday at 9</p><p className="sf-a">Focus Room 4, Level 2, is free from 09:00. Board Room also fits and has a screen.</p></>,
  },
  {
    t: "Administrative assistant",
    helps: "Operators find booking information and handle routine reservation questions.",
    uses: "Today's bookings, available spaces, pending approvals and booking conflicts.",
    approval: "It answers and points to the records. Changes are made by a person.",
    demo: <><p className="sf-q">What is waiting for approval at Head office?</p><p className="sf-a">3 requests: Town hall in Hall A, Client review in Board Room and a vendor workshop on Friday.</p></>,
  },
  {
    t: "Agent prepared booking actions",
    helps: "An agent prepares an action or a recommendation for an operator to review.",
    uses: "The reservation, the space rules and the calendar around it.",
    approval: "Changes to reservations need explicit approval. Nothing is approved, cancelled or moved silently.",
    demo: <><p className="sf-k">Prepared for review</p><p className="sf-a">Reschedule the vendor workshop to Training Room 2, Friday 10:00. Impact: 1 organizer notified.</p><p className="sf-acts"><span className="sr-btn ghost sm">Reject</span><span className="sr-btn primary sm">Approve</span></p></>,
  },
  {
    t: "Rescheduling and alternatives",
    helps: "Finds other spaces or times when a requested space is unavailable or a booking has to move.",
    uses: "Capacity, equipment, location and availability of comparable spaces.",
    approval: "Suggestions only. The booking moves when the organizer or an operator confirms it.",
    demo: <><p className="sf-k">Hall A is blocked on Friday morning</p><p className="sf-a">Training Room 2 at 10:00 fits 24 people and has a projector. Hall A is free again at 14:00.</p></>,
  },
  {
    t: "Analytics assistant",
    helps: "Interprets reservation and utilization data and summarizes patterns.",
    uses: "The same reports and metrics your team sees, for the period and locations you choose.",
    approval: "Summaries are tied to visible data, so you can check every figure in the reports.",
    demo: <><p className="sf-q">Which rooms were underused last month?</p><p className="sf-a">Hall A was booked for 22% of its bookable hours. Peak demand was Tuesday to Thursday, 10:00 to 12:00.</p></>,
  },
  {
    t: "Conversational product help",
    helps: "A conversation that helps people move through booking information and related actions.",
    uses: "The screens and records the person already has access to.",
    approval: "It links to the right screen or record. It does not act outside the person's permissions.",
    demo: <><p className="sf-q">Show me my bookings next week</p><p className="sf-a">You have 2: Board Room on Tuesday and Training Room 2 on Thursday. Open them in My bookings.</p></>,
  },
];

const STATES = [
  { k: "Recommendation", d: "A suggestion to look at. Nothing is prepared or changed.", c: "rec" },
  { k: "Prepared action", d: "A change is ready, with its impact, and waits for approval.", c: "prep" },
  { k: "Executed action", d: "A person approved it, and the change is recorded in the history.", c: "done" },
];

export function SpaceFeatures() {
  const [active, setActive] = useState(GROUPS[0].id);
  const seen = useRef(new Set<string>());

  // The active section is the last one whose top has passed 40% of the viewport, so jumping
  // straight to a section (or to AI) highlights the right link.
  useEffect(() => {
    const ids = [...GROUPS.map((g) => g.id), "ai"];
    const update = () => {
      const line = window.innerHeight * 0.4;
      let id = ids[0];
      for (const k of ids) {
        const el = document.getElementById(k);
        if (el && el.getBoundingClientRect().top <= line) id = k;
      }
      setActive(id);
      if (!seen.current.has(id)) {
        seen.current.add(id);
        track(id === "ai" ? "view_ai_features" : "view_feature_section", { section: id, page: "space_and_room" });
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <SpaceShell page="features">
      <style>{css}</style>

      <section className="sr-out sf-top">
        <div className="sr-in">
          <span className="sr-label">Features</span>
          <h1 className="sr-h1">Room booking features for spaces, availability, reservations and reports.</h1>
          <p className="sr-lead">From the space catalogue and availability rules to the public booking page, check in, reports and integrations. The AI assistants and agent actions are explained in their own section below.</p>
          <div className="sr-ctas"><DemoButton location="space_features_top" /><a href="#ai" className="sr-btn secondary">Go to AI capabilities</a></div>
        </div>
      </section>

      <div className="sr-out">
        <div className="sr-in sf-layout">
          <nav className="sf-nav" aria-label="Feature groups">
            <span className="sf-nav-k">On this page</span>
            {GROUPS.map((g) => <a key={g.id} href={`#${g.id}`} className={active === g.id ? "on" : ""}>{g.t}</a>)}
            <a href="#ai" className={`ai${active === "ai" ? " on" : ""}`}>AI assistants and agents</a>
          </nav>

          <div className="sf-main">
            {GROUPS.map((g, i) => (
              <section key={g.id} id={g.id} className="sf-group">
                <div className="sf-copy">
                  <span className="sf-n">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="sf-h2">{g.t}{g.status && <span className="sf-status">{g.status}</span>}</h2>
                  <p className="sf-intro">{g.intro}</p>
                  <ul className="sr-list">{g.items.map((x) => <li key={x}>{I.check}{x}</li>)}</ul>
                  {g.note && <p className="sf-note">{g.note}</p>}
                </div>
                <div className="sf-vis" aria-hidden>{g.ui}</div>
              </section>
            ))}

            <section id="ai" className="sf-ai">
              <span className="sr-label">AI assistants and agents</span>
              <h2 className="sr-h2" style={{ marginTop: 14 }}>What each assistant helps with, what it uses and where a person decides.</h2>
              <p className="sr-lead">Assistants help visitors and operators find information and prepare work. Any change to a reservation that an agent prepares waits for explicit human approval.</p>
              <div className="sf-states">
                {STATES.map((s) => <div key={s.k} className={`sf-state ${s.c}`}><b>{s.k}</b><span>{s.d}</span></div>)}
              </div>
              <div className="sf-ai-grid">
                {AI.map((a) => (
                  <article key={a.t} className="sf-ai-card">
                    <h3>{a.t}{a.status && <span className="sf-status">{a.status}</span>}</h3>
                    <dl>
                      <div><dt>Helps you</dt><dd>{a.helps}</dd></div>
                      <div><dt>Uses</dt><dd>{a.uses}</dd></div>
                      <div><dt>Where a person decides</dt><dd>{a.approval}</dd></div>
                    </dl>
                    <div className="sf-demo" aria-hidden>{a.demo}</div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="sr-close">
        <div className="sr-close-band" data-rv="0">
          <h2 className="sr-h2">See these features with your own spaces and rules.</h2>
          <p className="sr-lead">We will set up the demo around the locations, spaces and approval rules you describe.</p>
          <div className="sr-ctas"><DemoButton location="space_features_close" /><a href={`${SR_BASE}/pricing`} className="sr-btn secondary">View pricing</a></div>
        </div>
      </section>
    </SpaceShell>
  );
}

const css = `
  .sf-top{padding-top:72px;padding-bottom:56px}
  .sf-layout{display:grid;grid-template-columns:240px minmax(0,1fr);gap:48px;align-items:start;padding-bottom:40px}
  .sf-nav{position:sticky;top:84px;display:flex;flex-direction:column;gap:2px;max-height:calc(100vh - 110px);overflow-y:auto;padding-right:6px}
  .sf-nav-k{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${NEUTRAL};margin:0 0 8px 10px}
  .sf-nav a{padding:7px 10px;border-radius:8px;font-size:14px;line-height:1.35;color:${MUTED};text-decoration:none;border-left:2px solid transparent}
  .sf-nav a:hover{color:${DEEP};background:rgba(100,133,109,.07)}
  .sf-nav a.on{color:${DEEP};font-weight:600;background:rgba(100,133,109,.12);border-left-color:${SAGE};border-radius:0 8px 8px 0}
  .sf-nav a.ai{margin-top:8px;color:${TERRA};font-weight:600}
  .sf-group{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;padding:56px 0;border-top:1px solid ${LINE};scroll-margin-top:90px}
  .sf-group:first-child{border-top:0;padding-top:8px}
  .sf-n{font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:700;color:${TERRA}}
  .sf-h2{font-size:28px;line-height:1.2;margin-top:6px!important;display:flex;flex-wrap:wrap;align-items:center;gap:10px;text-wrap:balance}
  .sf-status{font-family:var(--font-sans),system-ui,sans-serif;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;background:rgba(100,133,109,.14);color:${SAGE}}
  .sf-intro{font-size:16.5px;color:${MUTED};margin:10px 0 0}
  .sf-note{margin:16px 0 0;padding:10px 14px;border-radius:10px;background:rgba(200,120,90,.08);color:${DEEP};font-size:14px}
  .sf-vis{background:${BG};border-radius:20px;padding:22px}
  .sf-ai{padding:72px 0 24px;border-top:1px solid ${LINE};scroll-margin-top:90px}
  .sf-states{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:28px 0 24px}
  .sf-state{border-radius:14px;padding:16px 18px;display:grid;gap:4px;background:#fff;box-shadow:0 0 0 1px rgba(38,51,43,.07)}
  .sf-state b{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-size:16px}
  .sf-state span{font-size:14px;color:${MUTED}}
  .sf-state.rec{box-shadow:inset 4px 0 0 #9AA79D,0 0 0 1px rgba(38,51,43,.07)}
  .sf-state.prep{box-shadow:inset 4px 0 0 #D9A23A,0 0 0 1px rgba(38,51,43,.07)}
  .sf-state.done{box-shadow:inset 4px 0 0 ${SAGE},0 0 0 1px rgba(38,51,43,.07)}
  .sf-ai-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .sf-ai-card{background:#fff;border-radius:16px;padding:24px;box-shadow:0 0 0 1px rgba(38,51,43,.07);display:flex;flex-direction:column}
  .sf-ai-card h3{font-size:19px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px!important}
  .sf-ai-card dl{margin:0 0 16px;display:grid;gap:10px}
  .sf-ai-card dt{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${NEUTRAL}}
  .sf-ai-card dd{margin:2px 0 0;font-size:15px;color:${MUTED}}
  .sf-demo{margin-top:auto;background:${BG};border-radius:12px;padding:14px;display:grid;gap:8px}
  .sf-demo p{margin:0;font-size:13.5px;line-height:1.45;border-radius:12px;padding:9px 12px}
  .sf-demo .sf-q{justify-self:end;max-width:85%;background:${SAGE};color:#fff;border-bottom-right-radius:4px}
  .sf-demo .sf-a{background:#fff;color:${DEEP};max-width:92%;border-bottom-left-radius:4px}
  .sf-demo .sf-k{padding:0;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#A35A04}
  .sf-demo .sf-acts{padding:0;display:flex;justify-content:flex-end;gap:8px}
  @media (max-width:1100px){.sf-group{grid-template-columns:minmax(0,1fr);gap:24px}}
  @media (max-width:860px){.sf-nav{top:100px!important}}
  @media (max-width:900px){
    .sf-layout{grid-template-columns:minmax(0,1fr);gap:0}
    .sf-nav{position:sticky;top:57px;z-index:5;flex-direction:row;overflow-x:auto;max-height:none;background:${BG};padding:8px 0;margin:0 -4px}
    .sf-nav-k{display:none}
    .sf-nav a{white-space:nowrap;border-left:0;border-radius:999px!important;border:1px solid ${LINE}}
    .sf-nav a.on{border-color:${SAGE}}
    .sf-nav a.ai{margin-top:0}
    .sf-states,.sf-ai-grid{grid-template-columns:minmax(0,1fr)}
    .sf-vis{padding:12px}
  }
`;
