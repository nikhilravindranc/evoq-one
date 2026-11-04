"use client";

import { track } from "@/lib/track";
import { I } from "../theme";
import { BG, DEEP, MUTED, PRIMARY, ACCENT } from "./palette";
import { NightField, Horizon, Skyline } from "./fx";
import { DemoButton, SR_BASE, SpaceShell } from "./SpaceShell";

/* Space & Room Reservations, Pricing. Plans, prices and entitlements are not approved yet, so
   this page explains how pricing is prepared and answers the FAQ without inventing commercial
   terms. Answers marked "confirm" in the hand-off notes need product owner sign-off. */

const F = `${SR_BASE}/features`;

const STEPS = [
  { t: "Tell us about your setup", d: "Your locations, the spaces and resources people book, and who manages reservations." },
  { t: "See it in a demo", d: "We show Space & Room Reservations with spaces and rules close to yours." },
  { t: "Receive your pricing", d: "Pricing for your organization, with what is included and any implementation work." },
];

const ASK = [
  { t: "Locations", d: "How many buildings or sites you manage, and whether each has its own administrators." },
  { t: "Spaces and resources", d: "Meeting rooms, halls, training rooms, shared spaces and equipment people can reserve." },
  { t: "People who manage bookings", d: "Facilities teams, front desk staff and location managers who review and approve." },
  { t: "Capabilities you plan to use", d: "Such as AI assistants, notifications, payments for bookings and integrations." },
  { t: "Implementation needs", d: "Onboarding, moving data from your current booking process and training." },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  { q: "What types of spaces and resources can be reserved?", a: "Meeting rooms, conference rooms, halls, training rooms, prayer rooms, shared spaces and equipment such as projector kits. Each resource has its own capacity, amenities and booking rules." },
  { q: "Can we manage several locations?", a: "Yes. Each location has its own details, operating hours, floors and the categories it offers, and reports can be filtered by location." },
  { q: "Can we set different availability rules for different spaces?", a: "Yes. Operating hours, slot intervals, notice periods, booking length, buffers and blocked periods can be set per space and per location." },
  { q: "Can reservations require approval?", a: "Yes. You choose which spaces need approval. Requests for those spaces stay pending until an operator approves or rejects them." },
  { q: "Can visitors book without creating an account?", a: "Visitors book from your public booking page by entering their organizer details and answering your questions. Each booking gets a reference the visitor can use to manage it." },
  { q: "Can we control cancellation and rescheduling rules?", a: "Yes. You set how long before a booking people can cancel or reschedule it, and the rules can differ by space." },
  { q: "Does EVOQ Bookings support recurring reservations?", a: "Recurring reservations are covered where your configuration supports them. Ask us during the demo and we will check your case." },
  { q: "How does check in work?", a: "Each booking has a reference and a QR code. At check in the reference is validated. Bookings that are not checked in within your grace period can be released or marked as no shows." },
  { q: "Can we publish a branded booking page?", a: "Yes. The public booking page carries your branding and shows the spaces you choose to publish." },
  { q: "What can the AI Booking Assistant help visitors do?", a: <>Visitors describe the space they need in their own words. The assistant interprets the date, time, capacity and requirements, then shows matching spaces and availability with links into the booking flow. <a href={`${F}#ai`}>See the AI capabilities</a>.</> },
  { q: "What can the Administrative Assistant help operators with?", a: "Questions about today's bookings, available spaces, pending approvals and booking conflicts. It points to the relevant records so the operator can act." },
  { q: "Can AI agents approve or change bookings automatically?", a: "No. An agent can prepare an approval, a reschedule or another change, but a person has to approve it before the reservation changes." },
  { q: "Are AI capabilities included in every plan?", a: "AI entitlements are set out in your pricing. We will tell you what is included for your setup." },
  { q: "Does EVOQ integrate with Google Calendar, Outlook or Microsoft 365?", a: "EVOQ Bookings has connection settings for Google Calendar, Outlook and Microsoft 365, and every booking can be saved as a calendar file (.ics). We confirm which connections are available for your setup during the demo." },
  { q: "Are email, SMS and WhatsApp notifications sent automatically?", a: "Templates and channel settings for email, SMS and WhatsApp are part of EVOQ Bookings. Which channels send messages for your organization is confirmed during setup." },
  { q: "Can we export reservation and utilization reports?", a: "Yes. Reservation and utilization reports can be filtered by period and location and exported to CSV." },
  { q: "How is pricing calculated?", a: "Pricing is prepared for your organization once we understand your locations, spaces, the people who manage bookings and the capabilities you need." },
  { q: "Is onboarding or implementation included?", a: "Onboarding and implementation are discussed during the demo and set out with your pricing." },
];

export function SpacePricing() {
  return (
    <SpaceShell
      page="pricing"
      hero={
        <div className="sr-hd-in sp-top-in">
          <span className="sr-label">Pricing</span>
          <h1 className="sr-h1">Pricing for Space &amp; Room Reservations, prepared for your setup.</h1>
          <p className="sr-lead">Pricing depends on how many locations and spaces you manage and which capabilities you use. Tell us about your setup and we will prepare pricing for your organization.</p>
          <div className="sr-ctas">
            <DemoButton location="space_pricing_top" className="sr-btn light">Request pricing</DemoButton>
            <a href={F} className="sr-btn outline-light">Explore features</a>
          </div>
        </div>
      }
    >
      <style>{css}</style>

      <section className="sr-out sr-sec tight">
        <div className="sr-in">
          <div className="sr-head" data-rv="0">
            <span className="sr-label">How it works</span>
            <h2 className="sr-h2">Three steps from your first message to your pricing.</h2>
          </div>
          <ol className="sp-steps">
            {STEPS.map((s, i) => (
              <li key={s.t} data-rv={i}><span>{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sr-out sr-sec sp-ask">
        <div className="sr-in sp-ask-in">
          <div data-rv="0">
            <span className="sr-label">What we ask about</span>
            <h2 className="sr-h2" style={{ marginTop: 14 }}>The details that shape your pricing.</h2>
            <p className="sr-lead">These are the questions we go through with you. Having rough numbers ready is enough.</p>
          </div>
          <ul className="sp-ask-list" data-rv="1">
            {ASK.map((x) => <li key={x.t}><i>{I.check}</i><span><b>{x.t}</b><small>{x.d}</small></span></li>)}
          </ul>
        </div>
      </section>

      <section className="sr-out sr-sec" id="faq">
        <div className="sr-in sp-faq-in">
          <div className="sr-head" data-rv="0">
            <span className="sr-label">FAQ</span>
            <h2 className="sr-h2">Questions about setup, booking, AI and pricing.</h2>
          </div>
          <div className="sp-faq">
            {FAQ.map((f, i) => (
              <details key={f.q} onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) track("faq_expand", { question: i + 1, page: "space_and_room" }); }}>
                <summary>{f.q}<span aria-hidden>{I.arrow}</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-close">
        <NightField stars={64} pings={3} seed={9} />
        <Horizon top="58%" />
        <Skyline />
        <div className="sr-close-band" data-rv="0">
          <h2 className="sr-h2">Get pricing for your locations and spaces.</h2>
          <p className="sr-lead">Share your setup and we will come back with pricing, or see the product first in a demo.</p>
          <div className="sr-ctas">
            <DemoButton location="space_pricing_close" className="sr-btn light">Request pricing</DemoButton>
            <DemoButton location="space_pricing_close_demo" className="sr-btn outline-light">Request a demo</DemoButton>
          </div>
        </div>
      </section>
    </SpaceShell>
  );
}

const css = `
    .sp-top-in{max-width:860px!important;text-align:center;padding:56px 0 64px}
  .sp-top-in .sr-lead{margin-left:auto;margin-right:auto}
  .sp-top-in .sr-ctas{justify-content:center}
  .sp-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .sp-steps li{background:#fff;border-radius:16px;padding:26px;box-shadow:0 0 0 1px rgba(22,36,28,.07)}
  .sp-steps li>span{width:34px;height:34px;border-radius:10px;background:rgba(78,111,88,.14);color:${PRIMARY};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:700;margin-bottom:14px}
  .sp-steps h3{font-size:18px;margin-bottom:6px!important}
  .sp-steps p{margin:0;color:${MUTED};font-size:15px}
  .sp-ask{background:#fff}
  .sp-ask-in{display:grid;grid-template-columns:1fr 1.1fr;gap:48px;align-items:start}
  .sp-ask-list{list-style:none;margin:0;padding:0;display:grid;gap:12px}
  .sp-ask-list li{display:flex;gap:14px;align-items:flex-start;background:${BG};border-radius:14px;padding:16px 18px}
  .sp-ask-list i{width:28px;height:28px;border-radius:8px;background:${PRIMARY};color:#fff;display:grid;place-items:center;flex-shrink:0}
  .sp-ask-list i svg{width:15px;height:15px}
  .sp-ask-list b{display:block;font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-size:16px}
  .sp-ask-list small{display:block;font-size:14.5px;color:${MUTED};line-height:1.45;margin-top:2px}
  .sp-faq-in{max-width:880px}
  .sp-faq{display:grid;gap:10px}
  .sp-faq details{background:#fff;border-radius:14px;box-shadow:0 0 0 1px rgba(22,36,28,.07)}
  .sp-faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 20px;font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:600;color:${DEEP}}
  .sp-faq summary::-webkit-details-marker{display:none}
  .sp-faq summary span{color:${ACCENT};transition:transform .2s ease;flex-shrink:0}
  .sp-faq summary span svg{width:16px;height:16px;transform:rotate(90deg)}
  .sp-faq details[open] summary span{transform:rotate(180deg)}
  .sp-faq details p{margin:0;padding:0 20px 18px;color:${MUTED};font-size:15.5px}
  .sp-faq details p a{color:${ACCENT};font-weight:600}
  @media (max-width:860px){.sp-steps,.sp-ask-in{grid-template-columns:minmax(0,1fr)}}
`;

