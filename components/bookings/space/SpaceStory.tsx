"use client";
/* eslint-disable @next/next/no-img-element */

import { I, U } from "../theme";
import { BG, DEEP, LINE, MUTED, PRIMARY } from "./palette";
import { SPACE_IMG } from "./ui";

/* Why choose it: four cards, each with its reason in a sentence. */

const WHY = [
  { img: U("1497366754035-f200968a6e72", 800), t: "A single system", ic: I.layers,
    d: "Requests, rules and calendars live together, so double bookings show before they happen and nobody retypes a booking." },
  { img: U("1724230758718-406bab979e67", 800), t: "Easy for visitors", ic: I.search,
    d: "Find a space, pick a time and send a request from a single booking page, with no requests lost in email." },
  { img: SPACE_IMG.glass, t: "Rules your team controls", ic: I.edit,
    d: "Hours, notice, length, buffers and approval are set for each space, so the rules stop living in a few heads." },
  { img: U("1759038085950-1234ca8f5fed", 800), t: "A clear view of every location", ic: I.pin,
    d: "See what is booked and what sits unused, site by site, for a clear picture of every space. Rooms nobody checks into go back to the pool." },
];

export function SpaceWhy() {
  return (
    <section className="sr-out ss-why" id="why">
      <style>{css}</style>
      <div className="sr-in">
        <div className="sr-head c ss-why-h" data-rv="0">
          <h2 className="sr-h2">Why choose EVOQ Bookings?</h2>
          <p className="sr-lead">Bookings stop living in inboxes and spreadsheets when requests, rules and calendars sit in a single system.</p>
        </div>
        <div className="ss-why-grid">
          {WHY.map((w, i) => (
            <article key={w.t} className="ss-card" data-rv={i}>
              <img src={w.img} alt="" loading="lazy" />
              <div className="ss-card-b">
                <span className="ss-ic sm">{w.ic}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const css = `
  .ss-why{background:#fff;padding:88px 20px}
  .ss-why-h{margin-bottom:36px}
  .ss-why-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
  .ss-card{border-radius:20px;overflow:hidden;background:${BG};box-shadow:0 0 0 1px ${LINE};display:flex;flex-direction:column}
  .ss-card>img{width:100%;height:170px;object-fit:cover;display:block}
  .ss-card-b{padding:18px 20px 22px;display:grid;gap:10px;align-content:start;position:relative}
  .ss-card-b .ss-ic{margin-top:-38px;box-shadow:0 8px 18px -8px rgba(43,33,28,.45);background:#fff}
  .ss-ic{width:44px;height:44px;border-radius:12px;background:rgba(180,88,58,.12);color:${PRIMARY};display:grid;place-items:center}
  .ss-ic svg{width:22px;height:22px}.ss-ic.sm{width:40px;height:40px;border-radius:11px}
  .ss-card h3{font-size:18px;line-height:1.25;margin:2px 0 0!important;color:${DEEP}}
  .ss-card p{margin:0;font-size:14.5px;line-height:1.5;color:${MUTED}}
  @media (max-width:980px){.ss-why-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:600px){.ss-why-grid{grid-template-columns:minmax(0,1fr)}.ss-why{padding-top:64px;padding-bottom:64px}}
`;
