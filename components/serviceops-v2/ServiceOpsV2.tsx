"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { Ic } from "../serviceops/icons";
import { AMBER, AMBER_DEEP, AMBER_SOFT, BODY, G1, G2, INK, LINE, MUTED } from "./palette";
import { V2_BASE, V2Demo, V2Shell } from "./V2Shell";

/* ServiceOps v2 home page. Names, companies, numbers and times in the visuals are sample data. Photos are listed in
   P so they can be swapped in one place; app screens are captures of the seeded demo workspace. */

export const APP = "/serviceops/app";
const AG = "/serviceops/agents";

export const P = {
  tech: "/solutions/field-service.jpg",
  electric: "/serviceops/v2/hero.jpg",
  panel: "/industries/v2/fs-detail-hd.jpg",
  contractor: "/solutions/construction.jpg",
  plant: "/industries/v2/mf-main-hd.jpg",
  supervisor: "/industries/v2/mf-circle-hd.jpg",
  parts: "/industries/v2/rt-main-hd.jpg",
  field: "/serviceops/v2/technician.jpg",
  manager: "/industries/v2/ps-detail-hd.jpg",
  dispatcher: "/industries/v2/ps-main2-hd.jpg",
  coordinator: "/industries/v2/mo-detail-hd.jpg",
  admin: "/industries/v2/ps-circle-hd.jpg",
  cust1: "/industries/v2/fs-circle-hd.jpg",
  cust2: "/industries/v2/rt-circle-hd.jpg",
  cust3: "/industries/v2/mo-circle-hd.jpg",
  cust4: "/industries/v2/hc-detail-hd.jpg",
  cust5: "/industries/v2/hc-circle-hd.jpg",
};

export const Label = ({ children }: { children: ReactNode }) => <span className="v2-label">{children}</span>;

/* true while the element is on screen */
function useSeen<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const seen = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting; }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* steps through n items while on screen; a click holds the choice for a while */
function useAuto(n: number, ms: number) {
  const [i, setI] = useState(0);
  const hold = useRef(0);
  const { ref, seen } = useSeen<HTMLDivElement>(0.35);
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      if (still || !seen.current || Date.now() < hold.current) return;
      setI((x) => (x + 1) % n);
    }, ms);
    return () => window.clearInterval(id);
  }, [n, ms, seen]);
  const pick = (x: number) => { hold.current = Date.now() + 14000; setI(x); };
  return { i, pick, ref };
}

/* ---------- 1. hero: the people who use ServiceOps, running past ---------- */
type Person = { img: string; n: string; r: string; c: string; pos?: string };
const COL_A: Person[] = [
  { img: P.tech, n: "Daniel Mensah", r: "Field technician", c: "Greenfield Facilities", pos: "28% 40%" },
  { img: P.manager, n: "Priya Shah", r: "Service manager", c: "Summit Facilities", pos: "50% 30%" },
  { img: P.contractor, n: "Ana Souza", r: "Installation contractor", c: "Cedar Build Co.", pos: "50% 25%" },
  { img: P.plant, n: "Meera Iyer", r: "Maintenance technician", c: "Pinnacle Plants", pos: "55% 35%" },
  { img: P.cust1, n: "Margaret Hill", r: "Facility manager", c: "Lakeview Hotel", pos: "60% 35%" },
];
const COL_B: Person[] = [
  { img: P.dispatcher, n: "Nia Brooks", r: "Dispatcher", c: "Metro Building Services", pos: "35% 40%" },
  { img: P.electric, n: "Jake Turner", r: "Electrician", c: "Brightline Electric", pos: "35% 50%" },
  { img: P.parts, n: "Lena Park", r: "Parts and inventory", c: "Northgate Supply", pos: "40% 35%" },
  { img: P.coordinator, n: "Marcus Bell", r: "Service coordinator", c: "Oakwood Services", pos: "45% 40%" },
  { img: P.supervisor, n: "Sam Okoro", r: "Site supervisor", c: "Harbor Mechanical", pos: "50% 30%" },
];

function PersonCard({ p }: { p: Person }) {
  return (
    <figure className="hp">
      <img src={p.img} alt="" style={{ objectPosition: p.pos }} />
      <figcaption><b>{p.n}</b><small>{p.r}, {p.c}</small></figcaption>
    </figure>
  );
}

function Hero() {
  const colC: Person[] = [COL_B[2], COL_A[4], COL_B[0], COL_A[1], COL_B[4]];
  return (
    <section className="hr-out">
      <div className="hr">
        <div className="hr-copy">
          <Label>EVOQ ServiceOps</Label>
          <h1>Keep every service job moving.</h1>
          <p>Manage service requests, work orders, scheduling and technician visits with a clear view of what needs to happen next. From the first customer request to the work completed in the field, ServiceOps gives your office and field teams the tools to coordinate service delivery.</p>
          <div className="v2-ctas">
            <V2Demo location="hero">Request a Demo</V2Demo>
          </div>
        </div>
        <div className="hr-people" aria-label="People who use ServiceOps: technicians, service managers, dispatchers, contractors, coordinators, parts staff, supervisors and facility managers">
          <div className="hr-col a"><div className="hr-track">{[...COL_A, ...COL_A].map((p, i) => <PersonCard key={i} p={p} />)}</div></div>
          <div className="hr-col b"><div className="hr-track">{[...COL_B, ...COL_B].map((p, i) => <PersonCard key={i} p={p} />)}</div></div>
          <div className="hr-col c"><div className="hr-track">{[...colC, ...colC].map((p, i) => <PersonCard key={i} p={p} />)}</div></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. trades, one card each ---------- */
const TRADES: [string, string, ReactNode][] = [
  ["HVAC", "Seasonal tune-ups, repairs and replacements across every site.", Ic.spark],
  ["Electrical", "Panel work, fault finding and scheduled safety checks.", Ic.plug],
  ["Plumbing", "Leaks, blockages and fixture work, logged against the site.", Ic.link],
  ["Mechanical", "Pumps, motors and plant, with a service record for each asset.", Ic.gear],
  ["Elevators", "Inspection schedules and call-outs for every unit.", Ic.arrow],
  ["Fire and life safety", "Recurring tests, certificates and follow-up work.", Ic.shield],
  ["Refrigeration", "Cold rooms and display units on planned service.", Ic.box],
  ["Generators", "Load tests and servicing on a fixed cycle.", Ic.clock],
  ["Water treatment", "Regular dosing visits and the readings that go with them.", Ic.chart],
  ["Facilities", "Mixed requests from one building, sorted by trade.", Ic.map],
  ["Dock and door", "Repairs and planned checks for doors, docks and bays.", Ic.layers],
  ["Preventive maintenance", "Recurring visits raised as work orders on their own.", Ic.calendar],
];

function Trades() {
  return (
    <section className="v2-sec v2-out">
      <div className="v2-in">
        <div className="tr-head" data-rv>
          <div>
            <Label>Service operations across different trades</Label>
            <h2 className="v2-h2">Different services. Different teams. One clear view of the work.</h2>
          </div>
          <p>Whether your team installs equipment, responds to service calls, carries out repairs or manages scheduled maintenance, ServiceOps helps coordinate the work behind each visit.</p>
        </div>
        <ul className="tc">
          {TRADES.map(([t, d, ic], i) => (
            <li key={t} data-rv style={{ ["--hs-d" as string]: `${(i % 4) * 60}ms` }}><i>{ic}</i><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3. the office roles, one at a time ---------- */
const WF_STAGES: [string, string][] = [
  ["Request", "Required"],
  ["Estimate", "Approval needed"],
  ["Schedule", "Technician assigned"],
  ["Visit", "Checklist complete"],
  ["Sign-off", "Customer signature"],
];

/* drawn in code so it stays sharp at any size */
export function AdminWorkflow() {
  return (
    <div className="aw" aria-label="Workflow settings for the Installation work type, with its stages and conditions">
      <b className="aw-t">Workflows</b>
      <span className="aw-s">The stages each type of work goes through, and the conditions between them.</span>
      <span className="aw-type"><small>Work type</small><em>Installation</em></span>
      <ol className="aw-list">
        {WF_STAGES.map(([s, c], n) => (
          <li key={s}>
            <i>{n + 1}</i>
            <b>{s}</b>
            <span className="aw-c">{c}</span>
            <u className="aw-tg" aria-hidden />
          </li>
        ))}
      </ol>
    </div>
  );
}

const ROLES: { r: string; t: string; d: string; opens: string[]; shot?: string; alt?: string; view?: "admin"; person: { img: string; n: string; c: string; pos: string } }[] = [
  {
    person: { img: P.manager, n: "Priya Shah", c: "Service manager, Summit Facilities", pos: "50% 28%" }, r: "Service managers", t: "Keep the whole operation in view.",
    d: "See what is waiting, what is approved and what is overdue. Review profitability by job, customer, trade, work type, technician or service plan, and read the weekly manager report.",
    opens: ["Insights", "Profitability", "Billing"], shot: "billing.png", alt: "Billing in ServiceOps: ready to invoice, in progress, outstanding, overdue and collected",
  },
  {
    person: { img: P.dispatcher, n: "Nia Brooks", c: "Dispatcher, Metro Building Services", pos: "35% 38%" }, r: "Dispatchers", t: "Fill the day with the right technicians.",
    d: "Work from the queue, the timeline, the workload view or the map. Compare ranked technician options and review proposed daily assignments before applying them.",
    opens: ["Dispatch", "Requests", "Jobs"],
  },
  {
    person: { img: P.coordinator, n: "Marcus Bell", c: "Service coordinator, Oakwood Services", pos: "55% 35%" }, r: "Service coordinators", t: "Turn requests into approved work.",
    d: "Review incoming requests, create the work order, prepare the estimate from your catalog and send the customer a private link to approve or decline.",
    opens: ["Requests", "Customers", "Estimates"], shot: "requests-list.png", alt: "The Requests list with requests from the web form, customer portal, online booking, email and phone",
  },
  {
    person: { img: P.admin, n: "Owen Clarke", c: "Administrator, Summit Facilities", pos: "50% 30%" }, r: "Administrators", t: "Set ServiceOps up the way you work.",
    d: "Invite people and give each a role. Configure workflows, service types, zones, teams, numbering and templates, and see who changed what in the activity log.",
    opens: ["Users", "Integrations", "Settings"], view: "admin",
  },
];

function Roles() {
  const { i, pick, ref } = useAuto(ROLES.length, 6500);
  const r = ROLES[i];
  return (
    <section className="v2-sec v2-out v2-grey">
      <div className="v2-in" ref={ref}>
        <div className="v2-head" data-rv>
          <Label>Office and management</Label>
          <h2 className="v2-h2">Built for everyone who keeps the work moving.</h2>
          <p>Service managers, dispatchers, coordinators and administrators each get the screens their role needs. An administrator sets who sees what, and the server enforces it.</p>
        </div>
        <div className="rl" data-rv>
          <div className="rl-main" key={i}>
            <div className="rl-text">
              <figure className="rl-who">
                <img src={r.person.img} alt="" style={{ objectPosition: r.person.pos }} />
                <figcaption><b>{r.person.n}</b><small>{r.person.c}</small></figcaption>
              </figure>
              <span className="rl-role">{r.r}</span>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
              <div className="rl-opens"><small>Opens</small>{r.opens.map((o) => <em key={o}>{o}</em>)}</div>
            </div>
            <div className="rl-pic">
              {r.view === "admin" ? <AdminWorkflow /> : r.shot ? <div className="rl-shot"><img src={`${APP}/${r.shot}`} alt={r.alt} /></div> : <MiniDispatch />}
            </div>
          </div>
          <ol className="rl-tabs">
            {ROLES.map((x, n) => (
              <li key={x.r}>
                <button type="button" className={n === i ? "on" : ""} onClick={() => pick(n)} aria-pressed={n === i}>
                  <span className="rl-bar"><i /></span>
                  <em>{n + 1}</em>{x.r}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. technician: the phone follows the point being read ---------- */
const FIELD: [string, string][] = [
  ["Know what is scheduled", "Give technicians a phone-friendly view of today's jobs, with access to directions, contact details and work instructions."],
  ["Follow the job requirements", "Use job checklists to guide service activity. Required steps cannot be skipped, helping teams record the work that must be completed."],
  ["Record work as it happens", "Add photos, notes, parts used and time entries directly to the job. Capture customer sign-off or record why a signature could not be obtained."],
  ["Stay productive with limited connectivity", "Technicians can continue using the field app when the signal is poor. Changes sync when the connection returns."],
  ["Flag problems from the site", "Report an unfinished visit, raise an unsafe-work flag or request additional work so the office can decide what happens next."],
];

export function Screen({ n }: { n: number }) {
  if (n === 0) return (
    <>
      <div className="ps-top"><b>Today</b><small>Wed, Nov 11</small></div>
      {[["9:00", "HVAC maintenance", "ABC Manufacturing, Building C", "prog"], ["11:30", "Elevator inspection", "City Facilities, Building A", ""], ["2:30", "Pump repair", "Oakwood Residences", ""], ["4:00", "Lighting retrofit", "Lakeside Resort", ""]].map(([t, a, b, s]) => (
        <div key={a} className={`ps-job${s ? " on" : ""}`}><em>{t}</em><span><b>{a}</b><small>{b}</small></span></div>
      ))}
      <div className="ps-acts"><span>{Ic.pin}Directions</span><span>{Ic.chat}Call</span></div>
    </>
  );
  if (n === 1) return (
    <>
      <div className="ps-top"><b>Checklist</b><small>3 of 5</small></div>
      {([["Isolate power", 1, 1], ["Check filters", 1, 0], ["Record meter reading", 1, 1], ["Take after photo", 0, 1], ["Customer sign-off", 0, 1]] as [string, number, number][]).map(([t, d, req]) => (
        <span key={t} className={`ps-chk${d ? " done" : ""}`}><i>{d ? Ic.check : null}</i>{t}{req ? <em>Required</em> : null}</span>
      ))}
      <div className="ps-note">Required steps cannot be skipped.</div>
    </>
  );
  if (n === 2) return (
    <>
      <div className="ps-top"><b>Work record</b><small>WO-2026-00410</small></div>
      <div className="ps-photos"><img src={P.panel} alt="" /><img src={P.electric} alt="" /><span>+ Photo</span></div>
      <div className="ps-rows"><span><small>Parts used</small><b>Filter set, 2</b></span><span><small>Time on site</small><b>1 h 40 min</b></span><span><small>Notes</small><b>Belt worn, replace next visit</b></span></div>
      <span className="ps-cta">Get customer sign-off</span>
    </>
  );
  if (n === 3) return (
    <>
      <div className="ps-off"><i />Working offline</div>
      <div className="ps-top"><b>Changes waiting</b><small>3</small></div>
      {["Checklist step completed", "Photo added", "Parts used recorded"].map((t) => <span key={t} className="ps-q">{Ic.clock}{t}</span>)}
      <div className="ps-note">They sync when the connection returns.</div>
    </>
  );
  return (
    <>
      <div className="ps-top"><b>Something wrong?</b><small>The office decides</small></div>
      <span className="ps-flag">I can&apos;t finish this visit</span>
      <span className="ps-flag red">Stop work, unsafe</span>
      <span className="ps-flag">Request extra work</span>
      <div className="ps-note">Managers are told until it is cleared.</div>
    </>
  );
}

function Field() {
  const { i, pick, ref } = useAuto(FIELD.length, 5200);
  return (
    <section className="v2-sec v2-out">
      <div className="v2-in fd" ref={ref}>
        <div className="fd-vis" data-rv>
          <div className="fd-photo"><img src={P.tech} alt="A technician on site" /></div>
          <div className="fd-phone">
            <i className="fd-notch" aria-hidden />
            <div className="fd-scr" key={i}><Screen n={i} /></div>
          </div>
        </div>
        <div className="fd-copy" data-rv>
          <Label>Technician experience</Label>
          <h2 className="v2-h2">The right job details, wherever the work takes place.</h2>
          <p className="fd-lead">Technicians need more than an address and a job title. They need the information, instructions and records required to carry out each visit and report what happened.</p>
          <ol className="fd-points">
            {FIELD.map(([t, d], n) => (
              <li key={t} className={n === i ? "on" : ""}>
                <button type="button" onClick={() => pick(n)} aria-pressed={n === i}>
                  <span className="fd-bar"><i /></span>
                  <b>{t}</b>
                  <p>{d}</p>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. delighted customers ---------- */
export const DELIGHT: { ui: ReactNode; text: ReactNode }[] = [
  {
    ui: (
      <>
        <b className="du-h">Book a service visit</b>
        <span className="du-f"><small>Your name</small>Margaret Hill</span>
        <span className="du-f"><small>What needs attention?</small>AC not cooling, Room 204</span>
        <span className="du-f"><small>Preferred time</small>Tomorrow morning</span>
        <span className="du-btn">Send request</span>
      </>
    ),
    text: <>Let customers <b>request service online</b> from your public booking page.</>,
  },
  {
    ui: (
      <>
        <b className="du-h">Estimate EST-0412</b>
        <span className="du-l"><small>Compressor contactor</small>$186.50</span>
        <span className="du-l"><small>Labour, 3 hours</small>$420.00</span>
        <span className="du-l tot"><small>Total</small>$651.50</span>
        <span className="du-btn">Approve</span><span className="du-btn ghost">Decline</span>
      </>
    ),
    text: <>Send a <b>private link to approve or decline</b> the estimate, with no account needed.</>,
  },
  {
    ui: (
      <>
        <span className="du-mail"><i>{Ic.bell}</i><span><small>Summit Facilities</small><b>Your visit is tomorrow at 9:00</b></span></span>
        <span className="du-p">Hello Margaret, Ravi from our team will arrive between 9:00 and 10:00 to look at the cooling in Room 204.</span>
        <span className="du-p muted">Reply to this email if the time does not suit you.</span>
      </>
    ),
    text: <>Send <b>follow-ups and reminders by email</b>, written from your own templates.</>,
  },
  {
    ui: (
      <>
        <b className="du-h">Invoice INV-2291</b>
        <span className="du-big">$651.50</span>
        <small className="du-s">Due Nov 25 · Summit Facilities</small>
        <span className="du-btn">Pay invoice</span>
        <span className="du-cards"><i /><i /><i /></span>
      </>
    ),
    text: <>Share a <b>private page to view and pay</b> the invoice.</>,
  },
  {
    ui: (
      <>
        <b className="du-h">How was the visit?</b>
        <span className="du-stars">★★★★★</span>
        <span className="du-f tall"><small>Tell us more</small>Ravi was on time and explained the fix.</span>
        <span className="du-btn">Send rating</span>
      </>
    ),
    text: <>Ask for a <b>rating after the visit</b>, and draft a public reply to copy.</>,
  },
];

function Delight() {
  return (
    <section className="v2-sec v2-out dl-sec">
      <div className="v2-in">
        <div className="dl-head" data-rv>
          <Label>Customer experience</Label>
          <h2 className="v2-h2">Delighted customers, from request to review.</h2>
          <p>Give customers simple ways to book, approve, pay and rate the work, without signing in or waiting for a call back.</p>
        </div>
        <ol className="dl">
          {DELIGHT.map((d, i) => (
            <li key={i} data-rv style={{ ["--hs-d" as string]: `${i * 80}ms` }}>
              <span className="dl-step"><em>{i + 1}</em></span>
              <div className="dl-ui"><div className="dl-scr">{d.ui}</div></div>
              <p>{d.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 6. the lifecycle, with the workflow inside it ---------- */
const STAGES: { t: string; s: string; d: string; photo: string; pos: string; shot?: string; alt?: string; chips?: string[] }[] = [
  { t: "Capture the work", s: "Record customer requests, requirements, sites and equipment details.", d: "Bring customer requests into a central inbox. Review the details, identify what needs attention and convert accepted requests into work orders.", photo: P.dispatcher, pos: "35% 40%", shot: "requests-list.png", alt: "The Requests list with requests from the web form, customer portal, online booking, email and phone" },
  { t: "Plan the service", s: "Apply the relevant work type, workflow, estimate and approval process.", d: "Configure separate processes for Installation, Service, Maintenance, Repair and Inspection, with their own stages, conditions and internal approval rules. Create estimates from your catalog and share a private link for the customer to approve or decline.", photo: P.contractor, pos: "50% 25%", shot: "work-orders.png", alt: "Work orders with their work type and trade", chips: ["Installation", "Service", "Repair", "Maintenance", "Inspection"] },
  { t: "Coordinate the visit", s: "Schedule technicians, review workloads and prepare the resources needed for the job.", d: "View the dispatch queue, technician workload, schedules and locations. Review ranked technician recommendations and proposed daily assignments before applying them.", photo: P.tech, pos: "28% 40%" },
  { t: "Deliver and record", s: "Complete the visit, follow the checklist, record parts and time, and capture the outcome.", d: "Each open job shows its status and next step, so the office can see which visits are booked, which are in progress and which need a decision.", photo: P.electric, pos: "40% 50%", shot: "customer-detail.png", alt: "A customer record with open work orders, their status and next step" },
  { t: "Continue the relationship", s: "Maintain customer and asset records, follow up on outstanding work and plan future maintenance.", d: "Gold and Silver service plans show maintenance due over the next 30, 60 or 90 days, and raise the work orders for it.", photo: P.plant, pos: "55% 40%", shot: "plans.png", alt: "Service plans with maintenance due in the next 30 days" },
];

export function MiniDispatch() {
  const rows: [string, [number, number, string, string][]][] = [
    ["Michael T.", [[0, 2.5, "Chiller repair", "a"], [4, 3, "Quarterly maintenance", "b"]]],
    ["Sarah W.", [[1, 3, "Panel installation", "c"]]],
    ["Ravi K.", [[0, 2, "Boiler service", "b"]]],
    ["Chris W.", [[0, 4, "Rooftop unit repair", "a"], [4.5, 3, "Lighting repair", "a"]]],
  ];
  return (
    <div className="md">
      <div className="md-h"><b>Dispatch</b><small>Tue, Nov 10</small><span className="md-opt">Optimize the day</span></div>
      <div className="md-hrs"><span />{["7", "8", "9", "10", "11", "12", "1", "2", "3"].map((h) => <small key={h}>{h}</small>)}</div>
      {rows.map(([n, jobs]) => (
        <div key={n} className="md-row"><b>{n}</b><span className="md-track">{jobs.map(([s, w, t, k]) => <em key={t} className={`md-job ${k}`} style={{ left: `${(s / 9) * 100}%`, width: `calc(${(w / 9) * 100}% - 4px)` }}>{t}</em>)}{n === "Ravi K." && <em className="md-ghost" style={{ left: `${(3.2 / 9) * 100}%`, width: `calc(${(1.5 / 9) * 100}% - 4px)` }}>Suggested</em>}</span></div>
      ))}
    </div>
  );
}

function Lifecycle() {
  const { i, pick, ref } = useAuto(STAGES.length, 6500);
  const s = STAGES[i];
  return (
    <section className="v2-sec v2-out v2-grey">
      <div className="v2-in" ref={ref}>
        <div className="v2-head" data-rv>
          <Label>The ServiceOps lifecycle</Label>
          <h2 className="v2-h2">From the first request to the next service visit.</h2>
          <p>Service work involves more than completing individual jobs. Requests need to be assessed, work needs to be planned, technicians need to be prepared, and customers and equipment need attention after each visit. An installation does not follow the same steps as a repair, so each type of work can have its own process.</p>
        </div>
        <div className="lc" data-rv>
          <ol className="lc-tabs">
            {STAGES.map((x, n) => (
              <li key={x.t}>
                <button type="button" className={n === i ? "on" : n < i ? "past" : ""} onClick={() => pick(n)} aria-pressed={n === i}>
                  <span className="lc-bar"><i /></span>
                  <em>{String(n + 1).padStart(2, "0")}</em>{x.t}
                </button>
              </li>
            ))}
          </ol>
          <div className="lc-body" key={i}>
            <div className="lc-text">
              <h3>{s.t}</h3>
              <p className="lc-s">{s.s}</p>
              <p>{s.d}</p>
              {s.chips && <div className="lc-chips">{s.chips.map((c) => <em key={c}>{c}</em>)}</div>}
            </div>
            <div className="lc-vis">
              <div className="lc-photo"><img src={s.photo} alt="" style={{ objectPosition: s.pos }} /></div>
              <div className="lc-over">{s.shot ? <div className="lc-shot"><img src={`${APP}/${s.shot}`} alt={s.alt} /></div> : <MiniDispatch />}</div>
            </div>
          </div>
        </div>
        <p className="lc-close" data-rv>Each stage contributes to the next. ServiceOps gives service managers, coordinators, dispatchers and technicians visibility into the work they are responsible for.</p>
      </div>
    </section>
  );
}

/* ---------- 7. integrations, EVI and the agents ---------- */
type Tile = { kind: "app" | "face" | "icon" | "logo" | "empty"; v?: string; label?: string; ic?: ReactNode };
const T = (kind: Tile["kind"], v?: string, label?: string, ic?: ReactNode): Tile => ({ kind, v, label, ic });
const TILES: Tile[] = [
  T("empty"), T("icon", "", "Accounting", Ic.receipt), T("empty"), T("face", "intake-agent", "Intake Agent"), T("app", "crm", "EVOQ CRM"), T("face", "dispatch-agent", "Dispatch Agent"), T("empty"), T("icon", "", "Payments", Ic.card), T("face", "quote-follow-up-agent", "Quote Follow-up Agent"), T("empty"), T("app", "sync", "EVOQ Sync"), T("empty"),
  T("face", "ai-receptionist", "AI Receptionist (web chat)"), T("empty"), T("app", "desk", "EVOQ Desk"), T("icon", "", "Email and messaging", Ic.chat), T("logo", "", "ServiceOps"), T("face", "evi-ai-assistant", "EVI"), T("icon", "", "CRM and communication", Ic.users), T("face", "collections-agent", "Collections Agent"), T("empty"), T("face", "risk-flags-agent", "Risk Flags Agent"), T("app", "billing", "EVOQ Billing"), T("face", "coaching-agent", "Coaching Agent"),
  T("empty"), T("face", "field-ai", "Field AI"), T("empty"), T("app", "inventory", "EVOQ Inventory"), T("face", "job-costing-ai", "Job Costing and Profitability AI"), T("empty"), T("icon", "", "ERP and inventory", Ic.box), T("face", "review-replies-agent", "Review Replies"), T("empty"), T("empty"), T("icon", "", "Your other systems", Ic.link), T("empty"),
];

function Connect() {
  return (
    <section className="v2-sec v2-out ct-sec">
      <div className="v2-in">
        <div className="ct-head" data-rv>
          <Label>Integrations and EVI</Label>
          <h2 className="ct-h"><span>Connect your systems.</span> <span>Let EVI and the agents help.</span></h2>
          <p>ServiceOps shows your connected systems in its Integrations area and works alongside EVOQ applications. EVI answers questions about the records your role can open, and the agents surface work for a person to review, approve or dismiss.</p>
        </div>
        <div className="tg" data-rv>
          {TILES.map((t, n) => (
            <span key={n} className={`tg-t ${t.kind}`} title={t.label} style={{ ["--c" as string]: n % 12 }}>
              {t.kind === "app" && <ProductBadge productKey={t.v!} size={44} />}
              {t.kind === "face" && <img src={`${AG}/${t.v}.jpg`} alt="" />}
              {t.kind === "icon" && <i>{t.ic}</i>}
              {t.kind === "logo" && <img className="so" src="/logos/serviceops-icon.png" alt="" />}
              {t.label && <em>{t.label}</em>}
            </span>
          ))}
        </div>
        <ul className="ct-legend" data-rv>
          <li><b>Your systems</b>Accounting, CRM, messaging, payments and ERP, where supported integrations exist.</li>
          <li><b>EVOQ applications</b>CRM, Desk, Inventory, Billing and Sync, when you want the rest of the company on the same footing.</li>
          <li><b>EVI and the agents</b>Drafts and findings support review. Your team decides what to send, approve or change.</li>
        </ul>
      </div>
    </section>
  );
}

/* ---------- 8. final call to action ---------- */
/* flush: the section above is white and already ends with its own 96px, so the box does not add more */
export function Closing({ flush = false }: { flush?: boolean }) {
  return (
    <section className={`v2-out cta-out${flush ? " flush" : ""}`}>
      <div className="v2-in cta" data-rv>
        <div className="cta-copy">
          <h2 className="cta-h"><span>See how ServiceOps fits</span> <span>your service operation.</span></h2>
          <p className="cta-sub">Explore how requests, work orders, dispatch, technician visits and ongoing maintenance can be managed through ServiceOps.</p>
          <div className="v2-ctas">
            <V2Demo location="closing" className="v2-btn dark">Request a Demo</V2Demo>
            <Link href={`${V2_BASE}/pricing`} className="v2-btn ghost">Explore Pricing</Link>
          </div>
        </div>
        <div className="cta-ui" aria-hidden>
          <div className="cta-photo"><img src={P.tech} alt="" style={{ objectPosition: "30% 40%" }} /></div>
          <div className="cta-wo">
            <div className="cta-wo-h"><b>WO-2026-00410</b><small>HVAC maintenance</small></div>
            {["Request received", "Estimate approved", "Technician assigned", "Visit completed"].map((s, n) => (
              <div key={s} className={`cta-st${n === 3 ? " now" : ""}`}><i>{n === 3 ? null : Ic.check}</i><span>{s}</span></div>
            ))}
          </div>
          <div className="cta-chip c1"><i>{Ic.wrench}</i><span><b>Ravi Kumar</b><small>Arriving at 9:00</small></span></div>
          <div className="cta-chip c2"><i>{Ic.check}</i><span><b>Invoice paid</b><small>$651.50</small></span></div>
        </div>
      </div>
    </section>
  );
}

export function ServiceOpsV2() {
  return (
    <V2Shell>
      <style>{homeCss}</style>
      <Hero />
      <Trades />
      <Roles />
      <Field />
      <Delight />
      <Lifecycle />
      <Connect />
      <Closing />
    </V2Shell>
  );
}

export const homeCss = `
  .v2-chip{display:inline-block;padding:2px 10px;border-radius:999px;font-style:normal;font-size:12px;font-weight:600;line-height:1.6;white-space:nowrap}
  .v2-chip.ok{background:#E3F5EA;color:#167A43}.v2-chip.soft{background:${AMBER_SOFT};color:#7A4A07}
  .v2-btn.ghost{background:transparent;color:${INK};border-color:rgba(32,26,20,.45)}.v2-btn.ghost:hover{background:rgba(255,255,255,.35)}

  /* hero: full width, copy on the left, columns of people running past on the right */
  .hr-out{padding:0}
  .hr{position:relative;display:grid;grid-template-columns:minmax(0,560px) minmax(0,1fr);gap:56px;align-items:center;min-height:max(600px,calc(100svh - 166px));padding-left:max(20px,calc((100vw - 1240px) / 2 + 20px));background:linear-gradient(135deg,#F7F5F1 0%,#EEEBE5 100%);overflow:hidden;border-bottom:1px solid ${LINE}}
  .hr-copy{padding:72px 0}
  .hr-copy .v2-label{margin-bottom:16px}
  .hr-copy h1{text-wrap:balance}
  .hr-copy p{margin:20px 0 0;font-size:18px;line-height:1.65;color:${BODY};max-width:52ch}
  .hr-people{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;grid-template-rows:minmax(0,1fr);align-self:stretch;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 10%,#000 90%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 10%,#000 90%,transparent 100%)}
  .hr-col{position:relative;overflow:hidden}
  .hr-track{position:absolute;left:0;right:0;top:0;display:grid;gap:16px;animation:hrUp 46s linear infinite}
  .hr-col.b .hr-track{animation-direction:reverse;animation-duration:52s}
  .hr-col.c .hr-track{animation-duration:58s}
  .hr-people:hover .hr-track{animation-play-state:paused}
  @keyframes hrUp{from{transform:translateY(0)}to{transform:translateY(calc(-50% - 8px))}}
  @media (prefers-reduced-motion:reduce){.hr-track{animation:none}}
  .hp{position:relative;margin:0;aspect-ratio:4/5;border-radius:22px;overflow:hidden;background:${G2}}
  .hp img{width:100%;height:100%;object-fit:cover}
  .hp figcaption{position:absolute;left:10px;right:10px;bottom:10px;padding:10px 13px;border-radius:14px;background:rgba(255,255,255,.94);box-shadow:0 10px 24px -14px rgba(32,26,20,.6)}
  .hp b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;line-height:1.25;color:${INK}}
  .hp small{display:block;margin-top:1px;font-size:12px;line-height:1.35;color:${MUTED}}

  /* trades as a sentence with pictures */
  .tc{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
  .tc li{padding:22px 22px 24px;border-radius:18px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE};transition:transform .25s ease,box-shadow .25s ease,background .25s ease}
  .tc li:hover{transform:translateY(-3px);background:#fff;box-shadow:inset 0 0 0 1px ${AMBER},0 18px 36px -26px rgba(32,26,20,.45)}
  .tc i{display:grid;place-items:center;width:42px;height:42px;margin-bottom:16px;border-radius:12px;background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .tc i svg{width:21px;height:21px}
  .tc h3{--h3-size:18px;line-height:1.25;margin-bottom:6px!important}
  .tc p{margin:0;font-size:15px;line-height:1.55}
  .tr-head{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:24px 72px;align-items:end;margin-bottom:56px;padding-bottom:40px;border-bottom:1px solid ${LINE}}
  .tr-head .v2-label{margin-bottom:14px}
  .tr-head h2{letter-spacing:-.02em;text-wrap:balance}
  .tr-head p{margin:0;font-size:18px;line-height:1.6;color:${BODY}}

  /* roles, one card at a time */
  .rl-main{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:0;min-height:440px;border-radius:28px;background:#fff;overflow:hidden;box-shadow:0 30px 60px -40px rgba(32,26,20,.45),0 0 0 1px ${LINE};animation:fadeIn .5s ease both}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .rl-text{display:flex;flex-direction:column;justify-content:center;padding:48px 52px}
  .rl-role{font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${AMBER_DEEP}}
  .rl-text h3{margin:10px 0 14px!important;line-height:1.15;letter-spacing:-.02em;text-wrap:balance}
  .rl-text p{margin:0;font-size:16.5px;line-height:1.6;max-width:46ch}
  .rl-opens{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:22px}
  .rl-opens small{margin-right:4px;font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${MUTED}}
  .rl-opens em{padding:4px 12px;border-radius:999px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE};font-style:normal;font-size:13px;font-weight:600;color:${INK}}
  .rl-who{position:relative;margin:0 0 22px;height:170px;border-radius:16px;overflow:hidden;background:${G2}}
  .rl-who img{width:100%;height:100%;object-fit:cover}
  .rl-who figcaption{position:absolute;left:10px;bottom:10px;padding:8px 12px;border-radius:12px;background:rgba(255,255,255,.94);box-shadow:0 8px 20px -10px rgba(32,26,20,.5)}
  .rl-who b{display:block;font-size:13.5px;line-height:1.25;color:${INK}}.rl-who small{display:block;font-size:12px;color:${MUTED}}
  .rl-pic{position:relative;display:grid;place-items:center;min-height:440px;padding:32px;background:${G1};border-left:1px solid ${LINE}}
  .rl-shot{width:100%;max-height:380px;overflow:hidden;border-radius:14px;background:#fff;box-shadow:0 26px 50px -30px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .rl-shot img{display:block;width:100%}
  .rl-pic .md{width:100%}
  .rl-tabs{list-style:none;margin:20px 0 0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
  .rl-tabs button,.lc-tabs button{display:block;width:100%;padding:0;border:0;background:none;text-align:left;cursor:pointer;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;color:${MUTED};transition:color .25s ease}
  .rl-tabs button:hover,.lc-tabs button:hover{color:${INK}}
  .rl-tabs button.on,.lc-tabs button.on{color:${INK}}
  .rl-tabs em,.lc-tabs em{margin-right:10px;font-style:normal;color:#B4AB9F}
  .rl-tabs button.on em,.lc-tabs button.on em{color:${AMBER_DEEP}}
  .rl-bar,.lc-bar,.fd-bar{display:block;height:3px;margin-bottom:14px;border-radius:2px;background:#DDD7CE;overflow:hidden}
  .rl-bar i,.lc-bar i,.fd-bar i{display:block;height:100%;width:0;background:${AMBER}}
  .rl-tabs button.on .rl-bar i{animation:fill 6.5s linear forwards}
  .lc-tabs button.on .lc-bar i{animation:fill 6.5s linear forwards}
  .lc-tabs button.past .lc-bar i{width:100%}
  @keyframes fill{to{width:100%}}

  /* technician */
  .fd{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:80px;align-items:center}
  .fd-copy .v2-label{margin-bottom:14px}
  .fd-lead{margin:16px 0 0;font-size:17.5px;line-height:1.6;max-width:56ch}
  .fd-points{list-style:none;margin:28px 0 0;padding:0}
  .fd-points li{border-top:1px solid ${LINE}}
  .fd-points li:last-child{border-bottom:1px solid ${LINE}}
  .fd-points button{display:block;width:100%;padding:16px 0 15px;border:0;background:none;text-align:left;cursor:pointer;font:inherit;color:inherit}
  .fd-points .fd-bar{height:2px;margin:-16px 0 14px;background:transparent}
  .fd-points li.on .fd-bar i{animation:fill 5.2s linear forwards}
  .fd-points b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:#A39A8E;transition:color .25s ease}
  .fd-points p{max-height:0;margin:0;overflow:hidden;font-size:15px;line-height:1.55;opacity:0;transition:max-height .45s ease,opacity .35s ease,margin .35s ease}
  .fd-points li.on b{color:${INK}}
  .fd-points li.on p{max-height:90px;margin-top:6px;opacity:1}
  .fd-points button:hover b{color:${INK}}
  .fd-vis{position:relative;height:600px}
  .fd-photo{position:absolute;left:0;top:0;width:72%;height:88%;border-radius:28px;overflow:hidden;box-shadow:0 40px 70px -40px rgba(32,26,20,.5)}
  .fd-photo img{width:100%;height:100%;object-fit:cover;object-position:28% 50%}
  .fd-phone{position:absolute;right:0;bottom:0;z-index:2;width:276px;padding:9px;border-radius:42px;background:#1E1812;box-shadow:0 40px 70px -30px rgba(32,26,20,.7)}
  .fd-notch{position:absolute;z-index:2;left:50%;top:15px;width:70px;height:18px;margin-left:-35px;border-radius:12px;background:#1E1812}
  .fd-scr{display:flex;flex-direction:column;gap:9px;min-height:470px;padding:44px 14px 16px;border-radius:34px;background:#FAF9F7;animation:fadeIn .45s ease both}
  .ps-top{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:4px}
  .ps-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${INK}}
  .ps-top small{font-size:12px;color:${MUTED}}
  .ps-job{display:flex;gap:11px;align-items:flex-start;padding:11px 12px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ps-job.on{box-shadow:0 0 0 2px ${AMBER}}
  .ps-job em{flex-shrink:0;padding:2px 7px;border-radius:7px;background:${G1};font-style:normal;font-size:12px;font-weight:700;color:${INK}}
  .ps-job b,.ps-rows b{display:block;font-size:13.5px;color:${INK};line-height:1.3}
  .ps-job small,.ps-rows small{display:block;font-size:12px;color:${MUTED}}
  .ps-acts{display:flex;gap:8px;margin-top:auto}
  .ps-acts span{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:9px;border-radius:11px;background:${AMBER};font-size:12.5px;font-weight:600;color:${INK}}
  .ps-acts svg{width:14px;height:14px}
  .ps-chk{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};font-size:13.5px;color:${BODY}}
  .ps-chk i{display:grid;place-items:center;flex-shrink:0;width:19px;height:19px;border-radius:6px;border:2px solid #D6CEC2}
  .ps-chk.done{color:${MUTED}}.ps-chk.done i{background:${AMBER};border-color:${AMBER};color:${INK}}
  .ps-chk i svg{width:11px;height:11px}
  .ps-chk em{margin-left:auto;font-style:normal;font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:${AMBER_DEEP}}
  .ps-note{margin-top:auto;padding:10px 12px;border-radius:12px;background:${AMBER_SOFT};font-size:12.5px;font-weight:600;color:#7A4A07}
  .ps-photos{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px}
  .ps-photos img,.ps-photos span{display:grid;place-items:center;height:70px;width:100%;border-radius:12px;object-fit:cover}
  .ps-photos span{background:#fff;box-shadow:inset 0 0 0 1.5px ${LINE};font-size:12px;font-weight:600;color:${INK}}
  .ps-rows{display:grid;gap:7px}
  .ps-rows span{padding:10px 12px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ps-cta{display:flex;align-items:center;justify-content:center;min-height:42px;margin-top:auto;border-radius:12px;background:${AMBER};font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${INK}}
  .ps-off{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:12px;background:${INK};color:#fff;font-size:13px;font-weight:600}
  .ps-off i{width:8px;height:8px;border-radius:50%;background:${AMBER}}
  .ps-q{display:flex;align-items:center;gap:9px;padding:11px 12px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};font-size:13.5px;color:${BODY}}
  .ps-q svg{width:16px;height:16px;color:${MUTED}}
  .ps-flag{display:flex;align-items:center;justify-content:center;min-height:46px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1.5px ${LINE};font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${INK}}
  .ps-flag.red{background:#FDE8E6;box-shadow:inset 0 0 0 1.5px #F4B7B1;color:#B42318}

  /* delighted customers: Zoho style cards in a row, joined as steps */
  .dl-sec{background-color:#fff;background-image:repeating-linear-gradient(90deg,transparent 0 calc(20% - 1px),${LINE} calc(20% - 1px) 20%);background-size:100% 100%}
  .dl-head{max-width:820px;margin-bottom:52px}
  .dl-head .v2-label{margin-bottom:14px}
  .dl-head p{margin:18px 0 0;font-size:18px;line-height:1.6;max-width:60ch}
  .dl{position:relative;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:24px}
  .dl::before{content:"";position:absolute;left:12px;right:12px;top:13px;border-top:2px dashed #D6CEC2}
  .dl-step{position:relative;z-index:1;display:block;margin-bottom:18px}
  .dl-step em{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:${AMBER};font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:700;color:${INK};box-shadow:0 0 0 5px #fff}
  .dl-ui{display:flex;min-height:340px;padding:14px;border-radius:18px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE}}
  .dl-scr{display:flex;flex:1;flex-direction:column;gap:7px;padding:14px 13px;border-radius:13px;background:#fff;box-shadow:0 18px 36px -24px rgba(32,26,20,.5),0 0 0 1px ${LINE};transition:transform .35s ease}
  .dl li:hover .dl-scr{transform:translateY(-3px)}
  .du-h{display:block;margin-bottom:3px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${INK}}
  .du-f{display:block;padding:7px 9px;border-radius:9px;background:${G1};font-size:12px;line-height:1.35;color:${INK}}
  .du-f small{display:block;font-size:10.5px;color:${MUTED}}
  .du-f.tall{min-height:64px}
  .du-btn{display:flex;flex-shrink:0;align-items:center;justify-content:center;min-height:32px;margin-top:auto;padding:0 8px;text-align:center;line-height:1.2;border-radius:9px;background:${AMBER};font-size:12.5px;font-weight:600;color:${INK}}
  .du-btn.ghost{margin-top:0;background:#fff;box-shadow:inset 0 0 0 1.5px ${LINE}}
  .du-l{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-top:1px solid ${LINE};font-size:12px;font-weight:600;color:${INK}}
  .du-l small{font-size:12px;font-weight:400;color:${BODY}}
  .du-l.tot{border-top:2px solid ${INK};font-size:13.5px}
  .du-mail{display:flex;gap:9px;align-items:flex-start;padding-bottom:9px;border-bottom:1px solid ${LINE}}
  .du-mail i{display:grid;place-items:center;flex-shrink:0;width:28px;height:28px;border-radius:50%;background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .du-mail i svg{width:14px;height:14px}
  .du-mail small{display:block;font-size:10.5px;color:${MUTED}}.du-mail b{display:block;font-size:12.5px;line-height:1.3;color:${INK}}
  .du-p{font-size:12px;line-height:1.45;color:${BODY}}.du-p.muted{color:${MUTED}}
  .du-big{display:block;margin-top:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:28px;font-weight:700;color:${INK}}
  .du-s{display:block;font-size:11.5px;color:${MUTED}}
  .du-cards{display:flex;gap:5px;justify-content:center}.du-cards i{width:26px;height:16px;border-radius:4px;background:${G2}}
  .du-stars{display:block;margin:6px 0 4px;color:${AMBER};font-size:22px;letter-spacing:3px}
  .dl p{margin:16px 0 0;font-size:16px;line-height:1.5;color:${INK}}
  .dl p b{font-weight:700}

  /* lifecycle */
  .lc-tabs{list-style:none;margin:0 0 22px;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px}
  .lc-body{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px;align-items:center;min-height:470px;padding:40px 44px;border-radius:28px;background:#fff;box-shadow:0 30px 60px -40px rgba(32,26,20,.45),0 0 0 1px ${LINE};animation:fadeIn .45s ease both}
  .lc-text h3{margin-bottom:10px!important;letter-spacing:-.02em}
  .lc-s{margin:0 0 14px;font-size:17px;line-height:1.55;color:${INK}}
  .lc-text p{margin:0;font-size:15.5px;line-height:1.6}
  .lc-text p.lc-s{margin:0 0 12px;font-size:17px;color:${INK}}
  .lc-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:18px}
  .lc-chips em{padding:5px 13px;border-radius:999px;background:${AMBER_SOFT};font-style:normal;font-size:13px;font-weight:600;color:#7A4A07}
  .lc-vis{position:relative;height:430px}
  .lc-photo{position:absolute;left:0;top:0;width:70%;height:100%;border-radius:20px;overflow:hidden;background:${G2}}
  .lc-photo img{width:100%;height:100%;object-fit:cover}
  .lc-over{position:absolute;right:0;bottom:0;width:66%}
  .lc-shot{max-height:300px;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 26px 50px -30px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .lc-shot img{display:block;width:100%}
  .lc-close{margin:36px 0 0;max-width:66ch;font-size:17px;line-height:1.6;color:${INK}}
  .md{padding:18px;border-radius:16px;background:#fff;box-shadow:0 26px 50px -30px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .md-h{display:flex;align-items:center;gap:10px;margin-bottom:12px}
  .md-h b{font-size:16px;color:${INK}}.md-h small{font-size:12.5px;color:${MUTED};margin-right:auto}
  .md-opt{padding:5px 12px;border-radius:999px;background:${AMBER};font-size:12.5px;font-weight:700;color:${INK}}
  .md-hrs,.md-row{display:grid;grid-template-columns:84px repeat(9,minmax(0,1fr))}
  .md-hrs small{font-size:11.5px;color:${MUTED}}
  .md-row{grid-template-columns:84px minmax(0,1fr);border-top:1px solid ${LINE}}
  .md-row b{padding:12px 0;font-size:13px;color:${INK}}
  .md-track{position:relative;min-height:50px;background-image:linear-gradient(90deg,${LINE} 1px,transparent 1px);background-size:calc(100% / 9) 100%}
  .md-job,.md-ghost{position:absolute;top:9px;bottom:9px;display:block;padding:0 8px;border-radius:8px;font-style:normal;font-size:12px;font-weight:600;line-height:32px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .md-job.a{background:#FDE6D2;color:#9A3412}.md-job.b{background:#DDF3E6;color:#166534}.md-job.c{background:#DCE8FC;color:#1E429F}
  .md-ghost{border:2px dashed ${AMBER_DEEP};background:${AMBER_SOFT};line-height:28px;color:#7A4A07}

  /* integrations: a field of tiles */
  .ct-sec{background:#ECEBE8}
  .ct-head{max-width:760px}
  .ct-head .v2-label{margin-bottom:14px}
  .ct-h span{display:block}.ct-h span+span{color:#9C958B}
  .ct-head p{margin:18px 0 0;font-size:17px;line-height:1.6;max-width:62ch}
  .tg{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:14px;margin:56px 0 0}
  .tg-t{position:relative;aspect-ratio:1/1;display:grid;place-items:center;border-radius:22px;background:rgba(255,255,255,.72);box-shadow:0 14px 30px -18px rgba(32,26,20,.4),inset 0 0 0 1px rgba(255,255,255,.9);transform:translateY(calc(var(--c) * 0px + (var(--c) - 6) * (var(--c) - 6) * 2.2px));transition:transform .3s ease,box-shadow .3s ease}
  .tg-t.empty{background:rgba(255,255,255,.32);box-shadow:none}
  .tg-t:not(.empty):hover{box-shadow:0 22px 40px -18px rgba(32,26,20,.5);z-index:3}
  .tg-t img{width:76%;height:76%;border-radius:18px;object-fit:cover}
  .tg-t img.so{width:58%;height:58%;border-radius:14px}
  .tg-t.logo{background:#fff}
  .tg-t i{display:grid;place-items:center;width:52%;height:52%;border-radius:14px;background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .tg-t i svg{width:52%;height:52%}
  .tg-t em{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translate(-50%,4px);padding:5px 10px;border-radius:8px;background:${INK};color:#fff;font-style:normal;font-size:12px;font-weight:600;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}
  .tg-t:hover em{opacity:1;transform:translate(-50%,0)}
  .ct-legend{list-style:none;margin:96px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px}
  .ct-legend li{padding-top:18px;border-top:1px solid #D9D5CE;font-size:15px;line-height:1.55}
  .ct-legend b{display:block;margin-bottom:4px;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${INK}}

  /* call to action: the same shape as the EVOQ home page closing band, in amber */
  .cta-out{padding-top:96px;padding-bottom:96px}
  .cta-out.flush{padding-top:0}
  @media (max-width:860px){.cta-out{padding-top:64px;padding-bottom:64px}.cta-out.flush{padding-top:0}}
  .cta{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:48px;align-items:center;padding:72px 64px;border-radius:28px;background:${AMBER}}
  .cta::before{content:"";position:absolute;width:520px;height:520px;left:-160px;top:-260px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.28),rgba(255,255,255,0) 68%);pointer-events:none}
  .cta::after{content:"";position:absolute;width:560px;height:560px;right:-180px;bottom:-320px;border-radius:50%;background:radial-gradient(circle,rgba(180,83,9,.35),rgba(180,83,9,0) 68%);pointer-events:none}
  .cta>*{position:relative;z-index:1}
  .cta-h{line-height:1.15!important;letter-spacing:-.02em}
  .cta-h span{display:block}.cta-h span+span{color:rgba(32,26,20,.62)}
  .cta-sub{margin:18px 0 0;max-width:46ch;font-size:17px;line-height:1.55;color:#33291d}
  .cta .v2-ctas{margin-top:30px}
  .cta-ui{position:relative;min-height:380px}
  .cta-photo{position:absolute;right:0;top:0;width:290px;height:330px;border-radius:22px;overflow:hidden;background:${G2};box-shadow:0 30px 60px -30px rgba(80,40,0,.6)}
  .cta-photo img{width:100%;height:100%;object-fit:cover}
  .cta-wo{position:absolute;left:0;top:70px;width:260px;padding:18px;border-radius:18px;background:#fff;box-shadow:0 30px 60px -28px rgba(80,40,0,.55)}
  .cta-wo-h{margin-bottom:10px;padding-bottom:12px;border-bottom:1px solid ${LINE}}
  .cta-wo-h b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${INK}}.cta-wo-h small{font-size:12.5px;color:${MUTED}}
  .cta-st{display:flex;align-items:center;gap:10px;padding:7px 0;font-size:13.5px;color:${INK}}
  .cta-st i{display:grid;place-items:center;flex-shrink:0;width:20px;height:20px;border-radius:50%;background:${AMBER};color:${INK}}.cta-st i svg{width:11px;height:11px}
  .cta-st.now i{background:#fff;box-shadow:inset 0 0 0 2px ${AMBER}}.cta-st.now{font-weight:600}
  .cta-chip{position:absolute;display:flex;align-items:center;gap:10px;padding:10px 14px 10px 10px;border-radius:14px;background:#fff;box-shadow:0 20px 40px -22px rgba(80,40,0,.55);white-space:nowrap}
  .cta-chip i{display:grid;place-items:center;width:32px;height:32px;border-radius:10px;background:${AMBER_SOFT};color:${AMBER_DEEP}}.cta-chip i svg{width:16px;height:16px}
  .cta-chip b{display:block;font-size:13.5px;line-height:1.25;color:${INK}}.cta-chip small{display:block;font-size:12px;color:${MUTED}}
  .cta-chip.c1{right:14px;bottom:0}
  .cta-chip.c2{left:12px;top:0}
  .aw{display:flex;flex-direction:column;gap:10px;width:100%;padding:22px;border-radius:14px;background:#fff;box-shadow:0 26px 50px -30px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .aw-t{font-family:var(--font-display),system-ui,sans-serif;font-size:20px;color:${INK}}
  .aw-s{font-size:13.5px;line-height:1.5;color:${BODY}}
  .aw-type{display:flex;align-items:center;gap:10px;font-size:13px;color:${MUTED}}
  .aw-type small{font-size:13px}
  .aw-type em{font-style:normal;padding:6px 12px;border-radius:8px;box-shadow:inset 0 0 0 1.5px ${LINE};font-weight:600;color:${INK}}
  .aw-list{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:8px}
  .aw-list li{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;background:${G1}}
  .aw-list i{display:grid;place-items:center;flex-shrink:0;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 1.5px ${LINE};font-style:normal;font-size:12px;font-weight:600;color:${INK}}
  .aw-list b{font-size:14px;color:${INK}}
  .aw-c{margin-left:auto;font-size:12.5px;color:${MUTED}}
  .aw-tg{position:relative;flex-shrink:0;width:30px;height:18px;border-radius:999px;background:${AMBER}}
  .aw-tg::after{content:"";position:absolute;right:2px;top:2px;width:14px;height:14px;border-radius:50%;background:#fff}

  @media (max-width:1280px){.hr-people{grid-template-columns:1fr 1fr}.hr-col.c{display:none}}
  @media (max-width:1180px){
    .fd{gap:44px}
    .rl-text{padding:36px}.lc-body{padding:32px;gap:32px}
    .tg{gap:10px}
  }
  @media (max-width:980px){
    .hr{grid-template-columns:1fr;padding:0 20px;min-height:0;gap:0}
    .hr-copy{padding:56px 0 8px}
    .hr-people{height:460px;padding:0}
    .tc{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
  .tc li{padding:22px 22px 24px;border-radius:18px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE};transition:transform .25s ease,box-shadow .25s ease,background .25s ease}
  .tc li:hover{transform:translateY(-3px);background:#fff;box-shadow:inset 0 0 0 1px ${AMBER},0 18px 36px -26px rgba(32,26,20,.45)}
  .tc i{display:grid;place-items:center;width:42px;height:42px;margin-bottom:16px;border-radius:12px;background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .tc i svg{width:21px;height:21px}
  .tc h3{--h3-size:18px;line-height:1.25;margin-bottom:6px!important}
  .tc p{margin:0;font-size:15px;line-height:1.55}
  .tr-head{grid-template-columns:1fr;margin-bottom:40px;padding-bottom:28px}
    .cta{grid-template-columns:1fr;padding:56px 36px 40px}.cta-ui{min-height:380px;max-width:460px;width:100%;margin:0 auto}
    .tc{grid-template-columns:repeat(3,minmax(0,1fr))}
    .rl-main{grid-template-columns:1fr}.rl-pic{min-height:320px}
    .rl-tabs{grid-template-columns:1fr 1fr}
    .fd{grid-template-columns:1fr;gap:40px}
    .fd-vis{max-width:560px;width:100%;margin:0 auto}
    .dl{grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 20px}.dl::before{display:none}
    .lc-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
    .lc-body{grid-template-columns:1fr}
    .lc-vis{height:380px}
    .rl-who{position:relative;margin:0 0 22px;height:170px;border-radius:16px;overflow:hidden;background:${G2}}
  .rl-who img{width:100%;height:100%;object-fit:cover}
  .rl-who figcaption{position:absolute;left:10px;bottom:10px;padding:8px 12px;border-radius:12px;background:rgba(255,255,255,.94);box-shadow:0 8px 20px -10px rgba(32,26,20,.5)}
  .rl-who b{display:block;font-size:13.5px;line-height:1.25;color:${INK}}.rl-who small{display:block;font-size:12px;color:${MUTED}}
  .rl-pic{border-left:0;border-top:1px solid ${LINE};min-height:0}
    .tg{grid-template-columns:repeat(6,minmax(0,1fr))}.tg-t{transform:none}.tg-t:nth-child(n+25){display:none}
    .ct-legend{grid-template-columns:1fr;margin-top:48px}
  }
  @media (max-width:640px){
    .hr{padding:0 16px}
    .hr-people{height:380px;gap:10px}.hr-track{gap:10px}
    .hp figcaption{left:6px;right:6px;bottom:6px;padding:7px 9px}.hp b{font-size:12.5px}.hp small{font-size:11px}
    .tc{grid-template-columns:1fr 1fr;gap:12px}.tc li{padding:18px 16px}
    .rl-text{padding:26px 20px}
    .fd-vis{height:540px}.fd-phone{width:250px}.fd-photo{width:80%}
    .dl{grid-template-columns:1fr 1fr}
    .lc-tabs{grid-template-columns:1fr 1fr}
    .lc-body{padding:22px 16px}
    .lc-vis{height:auto}.lc-photo{position:relative;width:100%;height:220px}.lc-over{position:relative;width:auto;margin:-48px 10px 0}
    .rl-who{position:relative;margin:0 0 22px;height:170px;border-radius:16px;overflow:hidden;background:${G2}}
  .rl-who img{width:100%;height:100%;object-fit:cover}
  .rl-who figcaption{position:absolute;left:10px;bottom:10px;padding:8px 12px;border-radius:12px;background:rgba(255,255,255,.94);box-shadow:0 8px 20px -10px rgba(32,26,20,.5)}
  .rl-who b{display:block;font-size:13.5px;line-height:1.25;color:${INK}}.rl-who small{display:block;font-size:12px;color:${MUTED}}
  .rl-pic{padding:16px}
    .tg{grid-template-columns:repeat(4,minmax(0,1fr))}.tg-t:nth-child(n+17){display:none}
    .cta-h span{display:inline}
    .cta{padding:44px 22px 28px;border-radius:22px}
    .cta-ui{min-height:410px}.cta-photo{width:62%;height:330px}.cta-wo{width:min(250px,76%)}
    .aw{padding:16px}.aw-c{display:none}
    .v2-ctas .v2-btn{width:100%}
  }
`;
