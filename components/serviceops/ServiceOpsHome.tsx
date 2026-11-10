"use client";
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import Link from "next/link";
import { ServiceOpsFlow } from "./ServiceOpsFlow";
import { ServiceOpsEco } from "./ServiceOpsEco";
import { Ic } from "./icons";
import { DEEP, INK, LINE, MUTED, NEUTRAL, PAPER, PRIMARY, SAND, TINT } from "./palette";
import { DemoButton, SO_BASE, ServiceOpsShell } from "./ServiceOpsShell";

/* ServiceOps, Overview. Story order: the promise to the customer, the lifecycle that follows the work, the office,
   the technician, equipment, money, customers, and the connected ecosystem with EVI and agents.
   Sample data in every visual is illustrative. Integration categories are not an existing catalogue. */

const Eyebrow = ({ children }: { children: ReactNode }) => <span className="so-label">{children}</span>;

function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`sh-phone ${className}`}>
      <i className="sh-notch" aria-hidden />
      <div className="sh-scr">{children}</div>
    </div>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="sh-points">
      {items.map((t) => (
        <li key={t}><i>{Ic.check}</i><span>{t}</span></li>
      ))}
    </ul>
  );
}

/* ---------- 1. hero ---------- */
function Hero() {
  return (
    <div className="so-hd-in sh-hero">
      <div className="sh-copy">
        <Eyebrow>Field service management</Eyebrow>
        <h1 className="sh-h1"><span>Every service visit is a promise.</span> <span>Make sure you deliver.</span></h1>
        <p className="sh-sub">
          From the first service request to the final sign-off, give customers a service experience they can rely on.
          Coordinate office operations, guide technicians in the field and keep every job moving towards completion.
        </p>
        <div className="so-ctas">
          <Link href={`${SO_BASE}/features`} className="so-btn primary">Explore ServiceOps {Ic.arrow}</Link>
          <DemoButton location="hero_expert" className="so-btn secondary">Talk to an Expert</DemoButton>
        </div>
      </div>

      <div className="sh-vis">
        <span className="sh-blob" aria-hidden />
        <img className="sh-photo" src="/industries/v2/fs-detail-hd.jpg" alt="A technician working on equipment at a customer site" />
        <span className="sh-anchor" data-fo-start aria-hidden />
        <div className="sh-pop sh-p2">
          <img src="/logos/serviceops-icon.png" alt="" />
          <span><small>ServiceOps, now</small><b>Your technician is on the way</b><em>Ryan arrives between 10:00 and 11:00</em></span>
        </div>
        <div className="sh-pop sh-p3">
          <div className="sh-p3-h"><span className="sh-tick">{Ic.check}</span><b>Visit complete</b></div>
          <ul><li>Checklist complete</li><li>Photos added</li><li>Customer signed</li></ul>
          <div className="sh-sig">
            <svg viewBox="0 0 120 30" aria-hidden><path d="M4 22c8-18 14-18 12-4s8 6 14-6 8 12 16 2 6-10 12 0 14 4 22-8" fill="none" pathLength="1" /></svg>
            <small>Signed by customer</small>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. office ---------- */
const OFFICE: { t: string; d: string; ic: ReactNode }[] = [
  { t: "Requests and approvals", d: "Review incoming requests, assess what needs action and move approved work into the service operation.", ic: Ic.inbox },
  { t: "Workload and availability", d: "See technician workload, available capacity and scheduled visits before making assignments.", ic: Ic.users },
  { t: "Dispatch decisions", d: "Compare ranked technician options, review scheduling views and evaluate proposed daily assignments before applying them.", ic: Ic.calendar },
  { t: "Exceptions and follow-ups", d: "Identify visits that could not be completed, work awaiting approval, outstanding estimates and other items requiring a decision.", ic: Ic.alert },
];

/* The office view: the Dispatch screen drawn as live UI, with work waiting on the left and a technician
   timeline on the right. Names and jobs are sample data. */
const DP_JOBS = [
  { t: "Rooftop unit not cooling", c: "Northgate Gym", m: "2 h", p: "High", pick: false },
  { t: "Door reopening on floor 3", c: "Pine St. Clinic", m: "1 h", p: "Normal", pick: true },
  { t: "Low water pressure, floors 6 to 8", c: "Lakeview Hotel", m: "3 h", p: "Normal", pick: false },
];
const DP_HOURS = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"];
const DP_TECHS: { n: string; z: string; l: string; i: string; jobs: { s: number; w: number; t: string; k: string }[]; ghost?: boolean }[] = [
  { n: "Michael Thompson", z: "North", l: "6 of 9 h", i: "MT", jobs: [{ s: 0, w: 2.5, t: "Chiller repair", k: "a" }, { s: 4, w: 3, t: "Quarterly maintenance", k: "b" }] },
  { n: "Sarah Wilson", z: "South", l: "5 of 9 h", i: "SW", jobs: [{ s: 1, w: 3, t: "Panel installation", k: "c" }, { s: 5.5, w: 2, t: "Inspection", k: "d" }] },
  { n: "Ravi Kumar", z: "Central", l: "2 of 9 h", i: "RK", jobs: [{ s: 0, w: 2, t: "Boiler service", k: "b" }], ghost: true },
  { n: "Chris Walker", z: "North", l: "7 of 9 h", i: "CW", jobs: [{ s: 0, w: 4, t: "Rooftop unit repair", k: "a" }, { s: 4.5, w: 3, t: "Lighting repair", k: "a" }] },
  { n: "Emily Johnson", z: "East", l: "3 of 9 h", i: "EJ", jobs: [{ s: 2, w: 3, t: "Water pressure check", k: "d" }] },
];

function Dispatch() {
  return (
    <div className="dp" data-rv>
      <div className="dp-chrome" aria-hidden><i /><i /><i /><span>ServiceOps, Dispatch</span></div>
      <div className="dp-body">
        <aside className="dp-side">
          <div className="dp-side-h"><b>To schedule</b><em>3</em></div>
          <div className="dp-tabs"><span className="on">Work orders</span><span>Attention</span><span>Follow-ups</span></div>
          <ul>
            {DP_JOBS.map((j) => (
              <li key={j.t} className={j.pick ? "pick" : ""}>
                <b>{j.t}</b>
                <small>{j.c}</small>
                <span><em className={`dp-p ${j.p.toLowerCase()}`}>{j.p}</em><em className="dp-m">{j.m}</em></span>
              </li>
            ))}
          </ul>
        </aside>
        <div className="dp-main">
          <div className="dp-top">
            <div><b>Tue, Nov 10</b><small>5 technicians, 3 jobs waiting</small></div>
            <div className="dp-seg"><span>Workload</span><span className="on">Timeline</span><span>Map</span></div>
            <span className="dp-opt"><img src="/serviceops/agents/evi-ai-assistant.jpg" alt="" />Optimize the day</span>
          </div>
          <div className="dp-scroll">
            <div className="dp-grid">
              <div className="dp-hours"><span />{DP_HOURS.map((h) => <small key={h}>{h}</small>)}</div>
              <span className="dp-now" aria-hidden />
              {DP_TECHS.map((t) => (
                <div className="dp-row" key={t.n}>
                  <div className="dp-who"><i>{t.i}</i><span><b>{t.n}</b><small>{t.z} · {t.l}</small></span></div>
                  <div className="dp-track">
                    {t.jobs.map((j) => (
                      <em key={j.t} className={`dp-job ${j.k}`} style={{ left: `${(j.s / 9) * 100}%`, width: `calc(${(j.w / 9) * 100}% - 4px)` }}>{j.t}</em>
                    ))}
                    {t.ghost && (
                      <>
                        <em className="dp-ghost" style={{ left: `${(3.2 / 9) * 100}%`, width: `calc(${(1.5 / 9) * 100}% - 4px)` }}>Door reopening</em>
                        <div className="dp-pop" style={{ left: `calc(${(4.8 / 9) * 100}% + 14px)` }}>
                          <b>Ranked options</b>
                          <span><i>1</i>Ravi Kumar<em className="so-badge ok">Available</em></span>
                          <span><i>2</i>Sarah Wilson<em className="so-badge soft">Partly booked</em></span>
                          <span><i>3</i>Emily Johnson<em className="so-badge soft">Other zone</em></span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Office() {
  return (
    <section className="so-sec so-white" id="office">
      <div className="so-out"><div className="so-in">
        <div className="of-head" data-rv>
          <div>
            <Eyebrow>Office operations</Eyebrow>
            <h2 className="so-h2">Know what needs attention before the day gets away from you.</h2>
          </div>
          <p className="so-lead">Service managers, dispatchers and coordinators need more than a list of open jobs. They need to understand what is waiting, what is approved, who is available and which issues require intervention. ServiceOps gives the office a working view of daily service operations.</p>
        </div>
        <Dispatch />
        <ul className="of-cols">
          {OFFICE.map((o, i) => (
            <li key={o.t} data-rv style={{ ["--hs-d" as string]: `${i * 70}ms` }}>
              <i>{o.ic}</i><b>{o.t}</b><small>{o.d}</small>
            </li>
          ))}
        </ul>
      </div></div>
    </section>
  );
}

/* ---------- 4. technician ---------- */
const TECH_POINTS = [
  "Today's assigned jobs and visit details.",
  "Directions and customer contact.",
  "Required job checklists and work instructions.",
  "Photos, notes, parts used and time records.",
  "Customer sign-off and visit completion.",
  "Options to report unsafe conditions, request extra work or flag an unfinished visit.",
  "Offline working with changes synchronized when connectivity returns.",
];

function Technician() {
  return (
    <section className="so-sec so-white" id="technician">
      <div className="so-out"><div className="so-in sx">
        <div className="sx-copy" data-rv>
          <Eyebrow>Field execution</Eyebrow>
          <h2 className="so-h2">Give technicians the information they need at the job site.</h2>
          <p className="so-lead">Technicians should spend their time completing service work, not searching for instructions or calling the office for basic job details. The ServiceOps technician app gives them access to assigned jobs, work instructions, checklists, customer information and the records needed to document each visit.</p>
          <Points items={TECH_POINTS} />
        </div>

        <div className="sx-vis tk-vis" data-rv>
          <span className="sx-shape" aria-hidden />
          <img className="tk-photo" src="/solutions/field-service.jpg" alt="A technician checking parts on site" />
          <Phone className="tk-phone">
            <div className="ph-top"><b>Today</b><small>4 jobs</small></div>
            <div className="ph-job">
              <div className="ph-job-h"><span className="so-badge soft">Repair</span><span className="so-badge warn">In progress</span></div>
              <b>Rooftop unit repair</b>
              <small>Greenfield Logistics, Dock 3</small>
              <div className="ph-acts"><span>{Ic.pin}Directions</span><span>{Ic.chat}Call</span></div>
            </div>
            <div className="ph-list">
              <small>Checklist</small>
              {[["Isolate power", 1], ["Check filters", 1], ["Record meter reading", 1], ["Take after photo", 0]].map(([t, d]) => (
                <span key={t as string} className={d ? "done" : ""}><i>{d ? Ic.check : null}</i>{t}</span>
              ))}
            </div>
            <div className="ph-bar"><span>{Ic.camera}Photos</span><span>{Ic.box}Parts</span><span>{Ic.clock}Time</span><span>{Ic.edit}Sign-off</span></div>
            <div className="ph-off"><i />Offline. Changes sync when you are back online.</div>
          </Phone>
        </div>
      </div></div>
    </section>
  );
}

/* ---------- 5. equipment ---------- */
const EQ_POINTS = [
  "Equipment records with make, model and serial number.",
  "Warranty and equipment status.",
  "Service history and next service information.",
  "Gold and Silver maintenance plans.",
  "Maintenance due dates across the next 30, 60 or 90 days.",
  "Work order creation for maintenance that is due.",
  "Nameplate scanning to help capture equipment details, with values checked before saving.",
];

function Equipment() {
  return (
    <section className="so-sec so-band" id="equipment">
      <div className="so-out"><div className="so-in sx flip">
        <div className="sx-vis eq-vis" data-rv>
          <span className="sx-shape" aria-hidden />
          <div className="eq-card">
            <div className="eq-h">
              <i className="so-ic">{Ic.gear}</i>
              <span><b>Rooftop unit RTU-04</b><small>Greenfield Logistics, Dock 3</small></span>
              </div>
            <dl className="eq-f">
              <div><dt>Make</dt><dd>Carrier</dd></div>
              <div><dt>Model</dt><dd>48TC-D08</dd></div>
              <div><dt>Serial</dt><dd>2419G10382</dd></div>
              <div><dt>Warranty</dt><dd>Active</dd></div>
            </dl>
            <div className="eq-plan"><span className="so-badge ok">In service</span><span className="so-badge warn">Gold plan</span><small>Maintenance due in the next</small>
              <span className="eq-win"><u>30</u><u className="on">60</u><u>90</u><small>days</small></span>
            </div>
            <div className="eq-hist">
              <small>Service history</small>
              {[["Repair", "Compressor contactor replaced"], ["Maintenance", "Quarterly visit completed"], ["Installation", "Commissioned and signed off"]].map(([a, b]) => (
                <span key={a}><i /><b>{a}</b>{b}</span>
              ))}
            </div>
            <div className="eq-next"><span><small>Next service</small><b>Quarterly maintenance</b></span><span className="so-btn primary sm">Create work order</span></div>
          </div>
          <div className="eq-scan">
            <img src="/industries/v2/fs-main-hd.jpg" alt="A technician inspecting equipment" />
            <span className="eq-scan-c">{Ic.camera}<b>Nameplate scanned</b></span>
          </div>
        </div>

        <div className="sx-copy" data-rv>
          <Eyebrow>Asset and maintenance records</Eyebrow>
          <h2 className="so-h2">Know the equipment. Know what needs attention next.</h2>
          <p className="so-lead">Service history should not disappear after a job is closed. Keep equipment records, warranty information, previous visits and upcoming maintenance accessible when the next service requirement arrives.</p>
          <Points items={EQ_POINTS} />
        </div>
      </div></div>
    </section>
  );
}

/* ---------- 6. parts and costs ---------- */
const COST_POINTS = [
  "Track stock on hand, reserved parts and technician van stock.",
  "Identify parts shortages for upcoming jobs.",
  "Manage parts requests and returns.",
  "Record labour, parts and other job costs.",
  "Review profitability by job, customer, trade, work type, technician or maintenance plan.",
  "Identify unbilled work, margin issues and other cost concerns.",
];

function Costs() {
  return (
    <section className="so-sec so-white" id="costs">
      <div className="so-out"><div className="so-in sx">
        <div className="sx-copy" data-rv>
          <Eyebrow>Operational and financial visibility</Eyebrow>
          <h2 className="so-h2">Understand what each service job takes, and what it earns.</h2>
          <p className="so-lead">Service completion is only part of the picture. Managers also need to understand parts consumption, labour costs, outstanding invoices and the margin generated by each job. ServiceOps brings operational records and job-level financial information into view.</p>
          <Points items={COST_POINTS} />
        </div>

        <div className="sx-vis cs-vis" data-rv>
          <span className="sx-shape" aria-hidden />
          <div className="cs-job">
            <div className="cs-h"><span><b>Job costing</b><small>Rooftop unit repair</small></span><em className="so-badge soft">Repair</em></div>
            {[["Labour", "$420.00"], ["Parts", "$286.50"], ["Other costs", "$45.00"]].map(([a, b]) => (
              <span key={a} className="cs-r"><small>{a}</small><b>{b}</b></span>
            ))}
            <span className="cs-r tot"><small>Total cost</small><b>$751.50</b></span>
            <span className="cs-r"><small>Invoiced</small><b>$1,150.00</b></span>
            <span className="cs-m"><small>Margin</small><b>34.7%</b></span>
          </div>
          <div className="cs-rep">
            <div className="cs-h"><span><b>Profitability</b><small>By work type</small></span><em className="so-badge soft">Group by</em></div>
            {[["Installation", 62], ["Service", 48], ["Repair", 35], ["Maintenance", 54], ["Inspection", 29]].map(([n, v]) => (
              <span key={n as string} className="cs-bar"><small>{n}</small><u><i style={{ width: `${v}%` }} /></u><b>{v}%</b></span>
            ))}
            <div className="cs-stock">
              <span><small>On hand</small><b>24</b></span>
              <span><small>Reserved</small><b>6</b></span>
              <span><small>Van stock</small><b>11</b></span>
              <span className="warn"><small>Shortage</small><b>2 parts</b></span>
            </div>
          </div>
        </div>
      </div></div>
    </section>
  );
}

/* ---------- 7. customers ---------- */
const CUST_POINTS = [
  "Public online service request page.",
  "Web chat receptionist to collect service details.",
  "Private estimate approval and decline links.",
  "Invoice viewing and payment links.",
  "Customer review pages.",
  "Customer portal access for submitting requests, where enabled.",
];

function Customers() {
  return (
    <section className="so-sec so-band" id="customers">
      <div className="so-out"><div className="so-in sx flip">
        <div className="sx-vis cu-vis" data-rv>
          <span className="sx-shape" aria-hidden />
          <Phone className="cu-a">
            <div className="ph-top"><b>Request service</b></div>
            <div className="cu-f"><small>Your name</small><span>Sarah Mitchell</span></div>
            <div className="cu-f"><small>What do you need?</small><span>Repair</span></div>
            <div className="cu-f"><small>Describe the issue</small><span className="tall">The air conditioning stopped cooling this morning.</span></div>
            <div className="cu-f"><small>Preferred time</small><span>Tomorrow morning</span></div>
            <span className="cu-btn">Send request</span>
          </Phone>
          <Phone className="cu-b">
            <div className="ph-top"><b>Estimate</b><small>For your approval</small></div>
            <div className="cu-est">
              {[["Compressor contactor", "$186.50"], ["Labour, 3 hours", "$420.00"], ["Call out", "$45.00"]].map(([a, b]) => (
                <span key={a}><small>{a}</small><b>{b}</b></span>
              ))}
              <span className="tot"><small>Total</small><b>$651.50</b></span>
            </div>
            <span className="cu-btn">Approve estimate</span>
            <span className="cu-btn ghost">Decline</span>
          </Phone>
        </div>

        <div className="sx-copy" data-rv>
          <Eyebrow>Customer experience</Eyebrow>
          <h2 className="so-h2">Make the next step clear for your customers.</h2>
          <p className="so-lead">Give customers convenient ways to request service, review estimates, pay invoices and share feedback. ServiceOps provides customer-facing pages and links that reduce the need for customers to sign in or wait for an office response.</p>
          <Points items={CUST_POINTS} />
        </div>
      </div></div>
    </section>
  );
}

/* ---------- 9. closing ---------- */
function Closing() {
  return (
    <section className="so-close">
      <div className="so-close-in" data-rv>
        <span className="so-cs ring" aria-hidden /><span className="so-cs dots" aria-hidden /><span className="so-cs sun" aria-hidden />
        <div className="so-close-c">
          <h2 className="so-h2">Give every service job a clearer path forward.</h2>
          <p className="so-lead">Coordinate service requests, technicians, equipment, parts and financial outcomes with ServiceOps.</p>
          <div className="so-ctas">
            <Link href={`${SO_BASE}/features`} className="so-btn primary">Explore ServiceOps {Ic.arrow}</Link>
            <DemoButton location="closing_expert" className="so-btn secondary">Talk to an Expert</DemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceOpsHome() {
  return (
    <ServiceOpsShell page="home" hero={<Hero />}>
      <style>{css}</style>
      <ServiceOpsFlow />
      <Office />
      <Technician />
      <Equipment />
      <Costs />
      <Customers />
      <ServiceOpsEco />
      <Closing />
    </ServiceOpsShell>
  );
}

const css = `
  .so-root{--h3-size:22px}
  .so-root small{display:block;font-size:13px;line-height:1.45;color:${NEUTRAL}}
  .so-btn.sm{min-height:36px;padding:0 14px;font-size:13px;border-radius:8px}

  /* hero */
  .sh-hero{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(0,1fr);gap:64px;align-items:center;padding:64px 0 100px}
  .sh-copy .so-label{margin-bottom:18px}
  .sh-h1 span{display:block;text-wrap:balance}.sh-h1 span+span{color:${PRIMARY}}
  .sh-sub{font-size:19px;line-height:1.6;color:${MUTED};margin:24px 0 0;max-width:48ch}
  .sh-vis{position:relative;aspect-ratio:1/1;max-width:580px;width:100%;margin-left:auto}
  .sh-blob{position:absolute;inset:-8% -12% -10% -4%;background:radial-gradient(40% 40% at 78% 24%,rgba(253,214,140,.55),transparent 70%),radial-gradient(38% 38% at 20% 82%,rgba(244,186,150,.4),transparent 70%);filter:blur(30px)}
  .sh-photo{position:absolute;inset:0 6% 12% 0;width:94%;height:88%;object-fit:cover;object-position:30% 30%;border-radius:36px;box-shadow:0 30px 70px -28px rgba(42,27,12,.5)}
  .sh-pop{position:absolute;opacity:0;transform:translateY(14px) scale(.94);animation:shPop .7s cubic-bezier(.2,.8,.2,1) forwards;background:#fff;box-shadow:0 18px 40px -16px rgba(42,27,12,.5),0 0 0 1px ${LINE}}
  .sh-anchor{position:absolute;top:9%;right:13%;width:1px;height:1px}
  .sh-p2 b,.sh-p3 b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP};line-height:1.25}
  .sh-p2{left:-8%;top:38%;width:280px;display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:20px;animation-delay:1.7s}
  .sh-p2 img{width:38px;height:38px;border-radius:11px;flex-shrink:0}
  .sh-p2 em{display:block;margin-top:3px;font-style:normal;font-size:13px;line-height:1.4;color:${MUTED}}
  .sh-p3{right:-3%;bottom:0;width:236px;padding:16px 18px;border-radius:22px;animation-delay:3s}
  .sh-p3-h{display:flex;align-items:center;gap:10px}
  .sh-tick{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#168A4A;color:#fff}
  .sh-tick svg{width:14px;height:14px}
  .sh-p3 ul{list-style:none;margin:12px 0 10px;padding:0}
  .sh-p3 li{display:flex;align-items:center;gap:8px;padding:3px 0;font-size:13px;color:${INK}}
  .sh-p3 li::before{content:"";width:6px;height:6px;border-radius:50%;background:#168A4A}
  .sh-sig{padding-top:8px;border-top:1px solid ${LINE}}
  .sh-sig svg{display:block;width:120px;height:30px}
  .sh-sig path{stroke:${DEEP};stroke-width:2;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:shSign 1.4s ease 3.6s forwards}
  @keyframes shPop{to{opacity:1;transform:none}}
  @keyframes shSign{to{stroke-dashoffset:0}}
  @media (prefers-reduced-motion:reduce){.sh-pop{opacity:1;transform:none;animation:none}.sh-sig path{animation:none;stroke-dashoffset:0}}

  /* shared two column rows */
  .sx{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.04fr);gap:88px;align-items:center}
  .sx.flip{grid-template-columns:minmax(0,1.04fr) minmax(0,1fr)}
  #office .sx.flip{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  #equipment .sx.flip{grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr)}
  .sx-copy .so-label{margin-bottom:14px}
  .sx-vis{position:relative;min-height:470px}
  .tk-vis{min-height:560px}.cu-vis{min-height:520px}
  .sx-shape{position:absolute;inset:-4% -6%;background:radial-gradient(42% 42% at 72% 28%,rgba(253,214,140,.55),transparent 70%),radial-gradient(40% 40% at 22% 78%,rgba(244,186,150,.4),transparent 70%);filter:blur(28px)}
  .sh-points{list-style:none;margin:22px 0 0;padding:0}
  .sh-points li{display:flex;gap:12px;align-items:flex-start;padding:9px 0;border-top:1px solid ${LINE};font-size:15.5px;color:${INK}}
  .sh-points li:last-child{border-bottom:1px solid ${LINE}}
  .sh-points i{flex-shrink:0;display:grid;place-items:center;width:22px;height:22px;margin-top:1px;border-radius:50%;background:${TINT};color:${PRIMARY}}
  .sh-points i svg{width:12px;height:12px}
  .sh-rows{list-style:none;margin:22px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:0 28px}
  .sh-rows li{display:flex;flex-direction:column;gap:10px;padding:16px 0;border-top:1px solid ${LINE}}
  .sh-rows li:nth-last-child(-n+2){border-bottom:1px solid ${LINE}}
  .sh-rows i{flex-shrink:0;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#fff;color:${PRIMARY};box-shadow:0 0 0 1px ${LINE}}
  .sh-rows i svg{width:20px;height:20px}
  .sh-rows b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP};margin-bottom:3px}
  .sh-rows small{font-size:14px;color:${MUTED}}

  /* office: a large, readable Dispatch screen and four plain columns */
  .dp{border-radius:24px;background:#fff;overflow:hidden;box-shadow:0 40px 80px -40px rgba(42,27,12,.45),0 0 0 1px ${LINE}}
  .dp-chrome{display:flex;align-items:center;gap:7px;padding:12px 18px;background:${PAPER};border-bottom:1px solid ${LINE}}
  .dp-chrome i{width:10px;height:10px;border-radius:50%;background:#E6D9BD}
  .dp-chrome span{margin-left:10px;font-size:12.5px;color:${NEUTRAL}}
  .dp-body{display:grid;grid-template-columns:280px minmax(0,1fr)}
  .dp-side{padding:20px 18px;border-right:1px solid ${LINE};background:#FFFDF9}
  .dp-side-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .dp-side-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .dp-side-h em{display:grid;place-items:center;min-width:24px;height:24px;border-radius:999px;background:${TINT};font-style:normal;font-size:12px;font-weight:700;color:#78350F}
  .dp-tabs{display:flex;gap:4px;margin-bottom:14px;padding:3px;border-radius:999px;background:${PAPER}}
  .dp-tabs span{flex:1;padding:6px 4px;border-radius:999px;text-align:center;font-size:12px;font-weight:600;color:${MUTED};white-space:nowrap}
  .dp-tabs span.on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(42,27,12,.15)}
  .dp-side ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  .dp-side li{padding:12px 13px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .dp-side li.pick{box-shadow:0 0 0 2px ${PRIMARY};background:#FFF8EC}
  .dp-side li b{display:block;font-size:13.5px;line-height:1.3;color:${DEEP}}
  .dp-side li small{display:block;margin:2px 0 8px;font-size:12.5px;color:${NEUTRAL}}
  .dp-side li span{display:flex;gap:6px}
  .dp-p,.dp-m{padding:2px 9px;border-radius:999px;font-style:normal;font-size:11.5px;font-weight:600}
  .dp-p.high{background:rgba(194,65,12,.12);color:#C2410C}.dp-p.normal{background:${TINT};color:#78350F}.dp-p.low{background:#EEF0F2;color:#5B6572}
  .dp-m{background:${PAPER};color:${MUTED}}
  .dp-main{min-width:0;padding:20px 22px 22px}
  .dp-top{display:flex;align-items:center;gap:16px;margin-bottom:16px}
  .dp-top>div:first-child{margin-right:auto}
  .dp-top b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP}}
  .dp-top small{display:block;font-size:12.5px;color:${NEUTRAL}}
  .dp-seg{display:flex;padding:3px;border-radius:999px;background:${PAPER}}
  .dp-seg span{padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:600;color:${MUTED}}
  .dp-seg span.on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(42,27,12,.15)}
  .dp-opt{display:inline-flex;align-items:center;gap:8px;padding:5px 16px 5px 5px;border-radius:999px;background:#F59E0B;font-size:13px;font-weight:700;color:#2A1B0C;white-space:nowrap}
  .dp-opt img{width:26px;height:26px;border-radius:50%;object-fit:cover}
  .dp-scroll{overflow-x:auto}
  .dp-grid{position:relative;min-width:640px}
  .dp-hours,.dp-row{display:grid;grid-template-columns:172px minmax(0,1fr)}
  .dp-hours{margin-bottom:6px}
  .dp-hours small{display:inline}
  .dp-hours{grid-template-columns:172px repeat(9,minmax(0,1fr))}
  .dp-hours small{font-size:12px;color:${NEUTRAL}}
  .dp-row{border-top:1px solid ${LINE}}
  .dp-who{display:flex;align-items:center;gap:10px;padding:12px 0}
  .dp-who i{display:grid;place-items:center;width:34px;height:34px;flex-shrink:0;border-radius:50%;background:${TINT};font-style:normal;font-size:12px;font-weight:700;color:#78350F}
  .dp-who b{display:block;font-size:13.5px;line-height:1.2;color:${DEEP}}
  .dp-who small{display:block;font-size:12px;color:${NEUTRAL}}
  .dp-track{position:relative;height:100%;min-height:68px;background-image:linear-gradient(90deg,${LINE} 1px,transparent 1px);background-size:calc(100% / 9) 100%}
  .dp-job{position:absolute;top:11px;bottom:11px;display:block;padding:0 10px;border-radius:9px;font-style:normal;font-size:12.5px;font-weight:600;line-height:44px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .dp-job.a{background:#FDE6D2;color:#9A3412;box-shadow:inset 3px 0 0 #EA7B2C}
  .dp-job.b{background:#DDF3E6;color:#166534;box-shadow:inset 3px 0 0 #2FA566}
  .dp-job.c{background:#DCE8FC;color:#1E429F;box-shadow:inset 3px 0 0 #4F7CE0}
  .dp-job.d{background:#EBE3FA;color:#5B3FB0;box-shadow:inset 3px 0 0 #8A6BE3}
  .dp-ghost{position:absolute;top:11px;bottom:11px;display:block;padding:0 8px;border-radius:9px;border:2px dashed ${PRIMARY};background:rgba(253,230,138,.35);font-style:normal;font-size:12px;font-weight:700;line-height:40px;color:#78350F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .dp-now{position:absolute;z-index:3;top:20px;bottom:0;left:calc(172px + (100% - 172px) * .3778);width:2px;background:#E5484D}
  .dp-now::before{content:"";position:absolute;left:-4px;top:-4px;width:10px;height:10px;border-radius:50%;background:#E5484D}
  .dp-pop{position:absolute;z-index:6;top:50%;translate:0 -50%;width:262px;padding:14px 16px;border-radius:18px;background:#fff;box-shadow:0 26px 54px -18px rgba(42,27,12,.6),0 0 0 1px ${LINE};animation:dpPop .6s .4s cubic-bezier(.2,.8,.2,1) both}
  .dp-pop::before{content:"";position:absolute;left:-6px;top:50%;margin-top:-6px;width:12px;height:12px;background:#fff;transform:rotate(45deg);box-shadow:-2px 2px 3px -1px rgba(42,27,12,.12)}
  .dp-pop b{display:block;margin-bottom:6px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${DEEP}}
  .dp-pop span{display:flex;align-items:center;gap:9px;padding:6px 0;font-size:13px;font-weight:600;color:${DEEP};white-space:nowrap}
  .dp-pop span i{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:${TINT};color:${PRIMARY};font-style:normal;font-size:11px;font-weight:700}
  .dp-pop span em{margin-left:auto}
  @keyframes dpPop{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}

  /* office: a large, readable Dispatch screen and four plain columns */
  #office.so-sec{padding-top:88px;padding-bottom:88px}
  .of-head{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:64px;align-items:end;margin-bottom:44px}
  .of-head .so-label{margin-bottom:14px}
  .of-head .so-lead{margin:0}
  .dp{border-radius:24px;background:#fff;overflow:hidden;box-shadow:0 40px 80px -40px rgba(42,27,12,.45),0 0 0 1px ${LINE}}
  .dp-chrome{display:flex;align-items:center;gap:7px;padding:12px 18px;background:${PAPER};border-bottom:1px solid ${LINE}}
  .dp-chrome i{width:10px;height:10px;border-radius:50%;background:#E6D9BD}
  .dp-chrome span{margin-left:10px;font-size:12.5px;color:${NEUTRAL}}
  .dp-body{display:grid;grid-template-columns:280px minmax(0,1fr)}
  .dp-side{padding:20px 18px;border-right:1px solid ${LINE};background:#FFFDF9}
  .dp-side-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .dp-side-h b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .dp-side-h em{display:grid;place-items:center;min-width:24px;height:24px;border-radius:999px;background:${TINT};font-style:normal;font-size:12px;font-weight:700;color:#78350F}
  .dp-tabs{display:flex;gap:4px;margin-bottom:14px;padding:3px;border-radius:999px;background:${PAPER}}
  .dp-tabs span{flex:1;padding:6px 4px;border-radius:999px;text-align:center;font-size:12px;font-weight:600;color:${MUTED};white-space:nowrap}
  .dp-tabs span.on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(42,27,12,.15)}
  .dp-side ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  .dp-side li{padding:12px 13px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .dp-side li.pick{box-shadow:0 0 0 2px ${PRIMARY};background:#FFF8EC}
  .dp-side li b{display:block;font-size:13.5px;line-height:1.3;color:${DEEP}}
  .dp-side li small{display:block;margin:2px 0 8px;font-size:12.5px;color:${NEUTRAL}}
  .dp-side li span{display:flex;gap:6px}
  .dp-p,.dp-m{padding:2px 9px;border-radius:999px;font-style:normal;font-size:11.5px;font-weight:600}
  .dp-p.high{background:rgba(194,65,12,.12);color:#C2410C}.dp-p.normal{background:${TINT};color:#78350F}.dp-p.low{background:#EEF0F2;color:#5B6572}
  .dp-m{background:${PAPER};color:${MUTED}}
  .dp-main{min-width:0;padding:20px 22px 22px}
  .dp-top{display:flex;align-items:center;gap:16px;margin-bottom:16px}
  .dp-top>div:first-child{margin-right:auto}
  .dp-top b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP}}
  .dp-top small{display:block;font-size:12.5px;color:${NEUTRAL}}
  .dp-seg{display:flex;padding:3px;border-radius:999px;background:${PAPER}}
  .dp-seg span{padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:600;color:${MUTED}}
  .dp-seg span.on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(42,27,12,.15)}
  .dp-opt{display:inline-flex;align-items:center;gap:8px;padding:5px 16px 5px 5px;border-radius:999px;background:#F59E0B;font-size:13px;font-weight:700;color:#2A1B0C;white-space:nowrap}
  .dp-opt img{width:26px;height:26px;border-radius:50%;object-fit:cover}
  .dp-scroll{overflow-x:auto}
  .dp-grid{position:relative;min-width:640px}
  .dp-hours,.dp-row{display:grid;grid-template-columns:172px minmax(0,1fr)}
  .dp-hours{margin-bottom:6px}
  .dp-hours small{display:inline}
  .dp-hours{grid-template-columns:172px repeat(9,minmax(0,1fr))}
  .dp-hours small{font-size:12px;color:${NEUTRAL}}
  .dp-row{border-top:1px solid ${LINE}}
  .dp-who{display:flex;align-items:center;gap:10px;padding:12px 0}
  .dp-who i{display:grid;place-items:center;width:34px;height:34px;flex-shrink:0;border-radius:50%;background:${TINT};font-style:normal;font-size:12px;font-weight:700;color:#78350F}
  .dp-who b{display:block;font-size:13.5px;line-height:1.2;color:${DEEP}}
  .dp-who small{display:block;font-size:12px;color:${NEUTRAL}}
  .dp-track{position:relative;height:100%;min-height:68px;background-image:linear-gradient(90deg,${LINE} 1px,transparent 1px);background-size:calc(100% / 9) 100%}
  .dp-job{position:absolute;top:11px;bottom:11px;display:block;padding:0 10px;border-radius:9px;font-style:normal;font-size:12.5px;font-weight:600;line-height:44px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .dp-job.a{background:#FDE6D2;color:#9A3412;box-shadow:inset 3px 0 0 #EA7B2C}
  .dp-job.b{background:#DDF3E6;color:#166534;box-shadow:inset 3px 0 0 #2FA566}
  .dp-job.c{background:#DCE8FC;color:#1E429F;box-shadow:inset 3px 0 0 #4F7CE0}
  .dp-job.d{background:#EBE3FA;color:#5B3FB0;box-shadow:inset 3px 0 0 #8A6BE3}
  .dp-ghost{position:absolute;top:11px;bottom:11px;display:block;padding:0 8px;border-radius:9px;border:2px dashed ${PRIMARY};background:rgba(253,230,138,.35);font-style:normal;font-size:12px;font-weight:700;line-height:40px;color:#78350F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .dp-now{position:absolute;z-index:3;top:20px;bottom:0;left:calc(172px + (100% - 172px) * .3778);width:2px;background:#E5484D}
  .dp-now::before{content:"";position:absolute;left:-4px;top:-4px;width:10px;height:10px;border-radius:50%;background:#E5484D}
  .dp-pop{position:absolute;z-index:6;top:50%;translate:0 -50%;width:262px;padding:14px 16px;border-radius:18px;background:#fff;box-shadow:0 26px 54px -18px rgba(42,27,12,.6),0 0 0 1px ${LINE};animation:dpPop .6s .4s cubic-bezier(.2,.8,.2,1) both}
  .dp-pop::before{content:"";position:absolute;left:-6px;top:50%;margin-top:-6px;width:12px;height:12px;background:#fff;transform:rotate(45deg);box-shadow:-2px 2px 3px -1px rgba(42,27,12,.12)}
  .dp-pop b{display:block;margin-bottom:6px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${DEEP}}
  .dp-pop span{display:flex;align-items:center;gap:9px;padding:6px 0;font-size:13px;font-weight:600;color:${DEEP};white-space:nowrap}
  .dp-pop span i{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:${TINT};color:${PRIMARY};font-style:normal;font-size:11px;font-weight:700}
  .dp-pop span em{margin-left:auto}
  @keyframes dpPop{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}
  .of-cols{list-style:none;margin:48px 0 0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:36px}
  .of-cols li{padding-top:20px;border-top:2px solid ${DEEP}}
  .of-cols i{display:grid;place-items:center;width:40px;height:40px;margin-bottom:14px;border-radius:12px;background:${TINT};color:${PRIMARY}}
  .of-cols i svg{width:20px;height:20px}
  .of-cols b{display:block;margin-bottom:6px;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP}}
  .of-cols small{font-size:14.5px;line-height:1.55;color:${MUTED}}

  /* phones */
  .sh-phone{position:relative;width:262px;border-radius:40px;background:#22160A;padding:9px;box-shadow:0 36px 70px -26px rgba(42,27,12,.6)}
  .sh-notch{position:absolute;z-index:2;left:50%;top:15px;width:70px;height:18px;margin-left:-35px;border-radius:12px;background:#22160A}
  .sh-scr{border-radius:32px;background:#FFFDF8;min-height:500px;padding:40px 14px 16px;display:flex;flex-direction:column;gap:11px;overflow:hidden}
  .ph-top{display:flex;align-items:baseline;justify-content:space-between}
  .ph-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:19px;color:${DEEP}}
  .ph-top small{font-size:12px}
  .ph-job{padding:13px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ph-job-h{display:flex;gap:6px;margin-bottom:8px}
  .ph-job b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${DEEP}}
  .ph-acts{display:flex;gap:8px;margin-top:11px}
  .ph-acts span{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;border-radius:10px;background:${TINT};color:#78350F;font-size:12.5px;font-weight:600}
  .ph-acts svg{width:14px;height:14px}
  .ph-list{padding:12px 13px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ph-list>small{font-weight:600;margin-bottom:4px}
  .ph-list span{display:flex;align-items:center;gap:9px;padding:5px 0;font-size:13px;color:${INK}}
  .ph-list span i{display:grid;place-items:center;width:17px;height:17px;border-radius:5px;border:1.8px solid #D9C9A8;flex-shrink:0}
  .ph-list span.done{color:${NEUTRAL}}
  .ph-list span.done i{background:${PRIMARY};border-color:${PRIMARY};color:#fff}
  .ph-list span i svg{width:10px;height:10px}
  .ph-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:auto}
  .ph-bar span{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 2px;border-radius:12px;background:${TINT};color:#78350F;font-size:11px;font-weight:600}
  .ph-bar svg{width:17px;height:17px}
  .ph-off{display:flex;align-items:center;gap:8px;font-size:11.5px;color:${MUTED}}
  .ph-off i{width:8px;height:8px;border-radius:50%;background:#D97706;flex-shrink:0}

  /* technician */
  .tk-vis{display:flex;justify-content:flex-end}
  .tk-photo{position:absolute;left:0;top:2%;width:74%;height:90%;object-fit:cover;object-position:28% 50%;border-radius:30px;box-shadow:0 30px 70px -30px rgba(42,27,12,.5)}
  .tk-phone{position:relative;z-index:2;margin:36px 0 0 0}

  /* equipment */
  .eq-vis{min-height:450px}
  .eq-card{position:absolute;left:0;top:13%;width:88%;background:#fff;border-radius:22px;padding:18px;box-shadow:0 26px 60px -26px rgba(42,27,12,.4),0 0 0 1px ${LINE}}
  .eq-h{display:flex;align-items:center;gap:12px}
  .eq-h>span{min-width:0;margin-right:auto}
  .eq-h b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .eq-f{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0;padding:12px 0;border-top:1px solid ${LINE};border-bottom:1px solid ${LINE}}
  .eq-f div{min-width:0}
  .eq-f dt{font-size:12px;color:${NEUTRAL}}.eq-f dd{margin:2px 0 0;font-size:13.5px;font-weight:600;color:${DEEP}}
  .eq-plan{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .eq-plan>small{display:inline}
  .eq-win{display:inline-flex;align-items:center;gap:4px;margin-left:auto}
  .eq-win u{text-decoration:none;padding:3px 10px;border-radius:999px;font-size:12.5px;font-weight:600;color:${MUTED};background:${PAPER}}
  .eq-win u.on{background:${PRIMARY};color:#fff}
  .eq-win small{display:inline;margin-left:3px}
  .eq-hist{margin-top:12px}
  .eq-hist>small{font-weight:600;margin-bottom:6px}
  .eq-hist span{position:relative;display:block;padding:6px 0 6px 20px;font-size:13px;color:${MUTED}}
  .eq-hist span::before{content:"";position:absolute;left:4px;top:18px;bottom:-12px;border-left:2px solid ${LINE}}
  .eq-hist span:last-child::before{display:none}
  .eq-hist span i{position:absolute;left:0;top:11px;width:10px;height:10px;border-radius:50%;background:${SAND};box-shadow:0 0 0 3px #fff}
  .eq-hist b{color:${DEEP};margin-right:8px}
  .eq-next{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;padding:11px 14px;border-radius:14px;background:${PAPER}}
  .eq-next b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}
  .eq-scan{position:absolute;right:0;top:0;width:34%}
  .eq-scan img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;object-position:80% 40%;border-radius:24px;box-shadow:0 26px 60px -24px rgba(42,27,12,.55)}
  .eq-scan-c{position:absolute;left:8px;bottom:8px;display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:14px;background:#fff;box-shadow:0 16px 36px -14px rgba(42,27,12,.5);color:${PRIMARY}}
  .eq-scan-c svg{width:20px;height:20px;flex-shrink:0}
  .eq-scan-c b{display:block;font-size:13px;color:${DEEP}}
  .eq-scan-c small{font-size:12px}

  /* costs */
  .cs-job{position:absolute;left:0;top:2%;width:47%;background:#fff;border-radius:22px;padding:20px;box-shadow:0 26px 60px -26px rgba(42,27,12,.4),0 0 0 1px ${LINE}}
  .cs-rep{position:absolute;right:0;bottom:2%;width:52%;background:#fff;border-radius:22px;padding:20px;box-shadow:0 26px 60px -26px rgba(42,27,12,.45),0 0 0 1px ${LINE}}
  .cs-h{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px}
  .cs-h b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .cs-r{display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-top:1px solid ${LINE}}
  .cs-r small{font-size:13.5px}
  .cs-r b{font-size:14.5px;font-weight:600;color:${DEEP}}
  .cs-r.tot{border-top:2px solid ${DEEP}}
  .cs-m{display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding:12px 14px;border-radius:12px;background:${TINT}}
  .cs-m b{font-family:var(--font-display),system-ui,sans-serif;font-size:21px;color:${PRIMARY}}
  .cs-m small{color:#78350F;font-weight:600}
  .cs-bar{display:grid;grid-template-columns:78px 1fr 34px;gap:8px;align-items:center;padding:6px 0}
  .cs-bar small{font-size:13px;color:${INK}}
  .cs-bar u{height:9px;border-radius:5px;background:${TINT};overflow:hidden}
  .cs-bar u i{display:block;height:100%;border-radius:5px;background:${PRIMARY}}
  .cs-bar b{font-size:13px;color:${DEEP};text-align:right}
  .cs-stock{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid ${LINE}}
  .cs-stock span{padding:9px 10px;border-radius:12px;background:${PAPER}}
  .cs-stock b{display:block;margin-top:2px;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .cs-stock small{font-size:11.5px}
  .cs-stock .warn{background:rgba(217,119,6,.14)}.cs-stock .warn b{color:#92400E}

  /* customers */
  .cu-vis{display:flex;align-items:center;justify-content:center}
  .cu-a{position:relative;z-index:1;transform:translateX(-26px) rotate(-3deg)}
  .cu-b{position:relative;z-index:2;transform:translate(-40px,38px) rotate(2.5deg)}
  .cu-a .sh-scr,.cu-b .sh-scr{min-height:470px}
  .cu-f small{font-weight:600;margin-bottom:4px}
  .cu-f span{display:block;padding:10px 12px;border-radius:11px;background:#fff;box-shadow:0 0 0 1px ${LINE};font-size:13.5px;color:${INK}}
  .cu-f span.tall{min-height:62px}
  .cu-btn{display:flex;align-items:center;justify-content:center;min-height:42px;margin-top:auto;border-radius:11px;background:${PRIMARY};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600}
  .cu-btn.ghost{margin-top:0;background:transparent;color:${MUTED};box-shadow:inset 0 0 0 1.5px ${LINE}}
  .cu-est{padding:6px 14px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .cu-est span{display:flex;justify-content:space-between;gap:10px;padding:11px 0;border-top:1px solid ${LINE};align-items:baseline}
  .cu-est span:first-child{border-top:0}
  .cu-est small{font-size:13px;color:${INK}}
  .cu-est b{font-size:13.5px;color:${DEEP}}
  .cu-est .tot{border-top:2px solid ${DEEP}}.cu-est .tot b{font-size:16px}
  .cu-b .cu-btn{margin-top:auto}.cu-b .cu-btn.ghost{margin-top:0}

  /* wide screens */
  @media (max-width:1180px){
    .sh-hero{gap:44px}
    .sx,.sx.flip{gap:56px}
    .so-band .so-in{padding:48px 40px}
  }
  @media (max-width:980px){
    .sh-hero{grid-template-columns:1fr;padding:40px 0 72px}
    .of-head{grid-template-columns:1fr;gap:16px}.of-cols{grid-template-columns:1fr 1fr}
    .sh-vis{margin:16px auto 0;max-width:520px}
    .sx,.sx.flip,#office .sx.flip,#equipment .sx.flip{grid-template-columns:1fr;gap:48px}
    .sx .sx-copy,.sx.flip .sx-copy{order:-1}
    .sx-vis{min-height:460px;max-width:560px;width:100%;margin:0 auto}
  }
  @media (max-width:760px){
    .sh-sub{font-size:17px}
    .of-head{grid-template-columns:1fr;gap:16px}
    .dp-body{grid-template-columns:1fr}
    .dp-side{display:none}
    .of-cols{grid-template-columns:1fr 1fr;gap:28px 22px}
    .dp-top{flex-wrap:wrap}
    .sh-vis{margin-bottom:56px}
    .sh-p2{left:-2%;top:30%;width:214px;padding:10px;gap:9px}
    .sh-p2 img{width:30px;height:30px}
    .sh-p2 em{font-size:12px}
    .sh-p3{right:0;bottom:-18%;width:186px;padding:11px 13px}
  }
  @media (max-width:520px){
    .sx-vis{min-height:0;padding:18px 12px}
    .sx-shape{inset:0}
    .tk-vis{flex-direction:column;align-items:center;gap:14px}
    .tk-photo{position:relative;left:0;top:0;width:100%;height:220px}
    .tk-phone{margin:0}
    .eq-card,.cs-job,.cs-rep,.eq-scan{position:relative;left:0;right:0;top:0;bottom:0;width:100%}
    .eq-scan,.cs-rep{margin-top:14px}
    .eq-scan-c{left:10px}
    .cu-vis{flex-direction:column;gap:18px}
    .cu-a,.cu-b{transform:none}
    .sh-phone{width:min(262px,100%)}
    .so-close-c .so-ctas{flex-direction:column;align-self:stretch}
    .so-close-c .so-btn{width:100%}
  }
`;
