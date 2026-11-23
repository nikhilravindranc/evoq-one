"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Ic } from "./icons";
import { DemoCursor, demoCursorCss, useDemo, type Act } from "../shared/appDemo";
import { AMBER, AMBER_DEEP, AMBER_SOFT, BODY, G1, INK, LINE, MUTED } from "./palette";

/* The app screen guide on the ServiceOps features page: a window with the real app's top bar and a cursor that uses the
   screen, one window for each feature area. The features themselves are listed under it. People and companies are the
   app's own sample data. */

const Menu = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
const Flag = ({ c }: { c: string }) => <svg viewBox="0 0 24 24" aria-hidden width="13" height="13" fill={c}><path d="M6 3h2v18H6zM9 4h10l-2.5 4L19 12H9z" /></svg>;
const Tick = () => <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8.5 6.5 12 13 4.5" /></svg>;
const Crumb = ({ t }: { t: string }) => <small className="ag-crumb">{t}</small>;
const Hd = ({ t, p, b }: { t: string; p?: string; b?: ReactNode }) => <div className="ag-hd"><div><h4>{t}</h4>{p && <p>{p}</p>}</div>{b}</div>;
const Stat = ({ k, v, s, cls }: { k: string; v: ReactNode; s?: ReactNode; cls?: string }) => <div className={cls}><small>{k}</small><b>{v}</b>{s && <em>{s}</em>}</div>;
const Dual = ({ a, b }: { a: ReactNode; b: ReactNode }) => <><span className="d-off">{a}</span><span className="d-on">{b}</span></>;

/* ---------- Work: a request becomes a work order, and gets scheduled ---------- */
function Work() {
  return (
    <div className="wk stack">
      <div className="st-s s1">
        <Crumb t="Home › Work › Requests" />
        <Hd t="Requests" p="Every customer ask in one inbox, before it becomes a work order." b={<span className="ag-btn pri">+ New request</span>} />
        <div className="ag-stats"><Stat k="New" v="4" /><Stat k="Reviewing" v="1" /><Stat k="Converted" v="0" /></div>
        <div className="ag-tbl">
          <div className="ag-tr head r4"><span>Request #</span><span>Request</span><span>Customer</span><span>Priority</span><span>Status</span><span /></div>
          <div className="ag-tr r4"><b className="lnk">REQ-1003</b><span>Low water pressure, floors 6 to 8<small>Lakeview Hotel</small></span><span>Lakeview Hotel<small>Ana Souza</small></span><span className="pr hi"><Flag c="#B91C1C" />High</span><em className="ag-chip rv">Reviewing</em><span /></div>
          <div className="ag-tr r4 r1"><b className="lnk">REQ-1001</b><span>Treatment room 3 not cooling<small>Harbor Dental, 14 Quay St</small></span><span>Harbor Dental<small>Priya Nair</small></span><span className="pr hi"><Flag c="#B91C1C" />High</span><em className="ag-chip nw">New</em><span className="ag-btn sm wk-conv">Convert</span></div>
          <div className="ag-tr r4"><b className="lnk">REQ-1002</b><span>Flickering lights in food court<small>Cedar Mall, Level 2</small></span><span>Cedar Mall<small>Tom Ellis</small></span><span className="pr md"><Flag c="#B45309" />Medium</span><em className="ag-chip nw">New</em><span /></div>
        </div>
      </div>
      <div className="st-s s2">
        <Crumb t="Home › Work Orders" />
        <Hd t="Work Orders" p="Service requests and their path from approval to the field." b={<span className="ag-btn pri">+ New work order</span>} />
        <div className="ag-stats four"><Stat k="New" v={<Dual a="3" b="2" />} /><Stat k="To schedule" v="6" cls="wk-sched" /><Stat k="Scheduled" v={<Dual a="43" b="44" />} /><Stat k="In progress" v="13" /></div>
        <div className="ag-tbl">
          <div className="ag-tr head r5"><span>Work order #</span><span>Title</span><span>Customer</span><span>Status</span><span>Assigned to</span></div>
          <div className="ag-tr r5 wk-new"><b className="lnk">WO-2026-00417</b><span>Treatment room 3 not cooling<small>HVAC · High</small></span><span>Harbor Dental<small>14 Quay St</small></span><em className="ag-chip nw wk-st"><Dual a="New" b="Scheduled" /></em><span><span className="d-off dim">Not assigned</span><span className="d-on">Michael Thomas</span></span></div>
          <div className="ag-tr r5"><b className="lnk">WO-2026-00410</b><span>HVAC maintenance<small>Rooftop HVAC Unit</small></span><span>ABC Manufacturing<small>New York, NY</small></span><em className="ag-chip pg">In progress</em><span>Michael Thomas</span></div>
          <div className="ag-tr r5"><b className="lnk">WO-2026-00412</b><span>Pump repair<small>Booster Pump</small></span><span>City Facilities<small>New York, NY</small></span><em className="ag-chip sc">Scheduled</em><span>Ravi Kumar</span></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Field: a job, from the technician's checklist to the customer's sign-off ---------- */
const STEPS = ["Request", "Schedule", "Inspection with checklist", "Sign-off", "Certificate issued", "Invoice"];
function Field() {
  return (
    <div className="fdv">
      <Crumb t="Home › Jobs › JOB-10484" />
      <Hd t="JOB-10484: Electrical panel check" b={<span className="ag-btns"><span className="ag-btn">Edit job</span><span className="ag-btn">Clone</span></span>} />
      <div className="fd-tabs"><b>Overview</b><span>Services and Parts</span><span>Time Sheet</span><span>Costing</span><span>Attachments</span></div>
      <div className="fd-flow">
        <small>Inspection workflow</small>
        <ol className="fd-steps">
          {STEPS.map((s, i) => <li key={s} className={`fd-s${i + 1}${i < 2 ? " done" : ""}`}><i className="n">{i + 1}</i><i className="ck"><Tick /></i><span>{s}</span></li>)}
        </ol>
        <p className="fd-say"><Dual a="The technician is doing the work" b="Checklist complete. Waiting for the customer's sign-off." /><span className="d-on2">Signed off. The certificate is next.</span></p>
      </div>
      <div className="fd-grid">
        <div className="fd-card"><b>Job details</b><dl><div><dt>Work type</dt><dd>Inspection</dd></div><div><dt>Trade</dt><dd>Electrical</dd></div><div><dt>Priority</dt><dd className="pr hi"><Flag c="#B91C1C" />High</dd></div><div><dt>Scheduled</dt><dd>Nov 23, 01:00 PM – 03:00 PM</dd></div></dl></div>
        <div className="fd-card fd-tech"><b>Technician</b><div className="fd-who"><i>CW</i><span>Chris Walker<small>Electrical Technician</small></span></div><dl><div><dt>Trip status</dt><dd><em className="ag-chip ok">Arrived</em></dd></div><div><dt>Travel time</dt><dd>48 mins</dd></div></dl></div>
      </div>
    </div>
  );
}

/* ---------- Records: a customer, from the list to the full record ---------- */
function Records() {
  return (
    <div className="wk stack">
      <div className="st-s s1">
        <Crumb t="Home › Customers" />
        <Hd t="Customers" p="Who you service, where, and the state of each relationship." b={<span className="ag-btn pri">+ Add customer</span>} />
        <div className="rc-filters"><span>All customer types</span><span>All locations</span><span>All status</span><span>Any activity</span></div>
        <div className="ag-tbl">
          <div className="ag-tr head r6"><span>Customer</span><span>Location</span><span>Open work orders</span><span>Balance</span><span>Status</span></div>
          <div className="ag-tr r6"><span><b>ABC Manufacturing</b><small>Industrial · Gold AMC</small></span><span>New York, NY</span><span>6</span><span>$21,594<small>Not due yet</small></span><em className="ag-chip ok">Active</em></div>
          <div className="ag-tr r6 rc-row"><span><b>City Facilities</b><small>Public sector · Gold AMC</small></span><span>New York, NY</span><span>3</span><span className="rc-bal">$16,733<small className="over">$2,030 overdue</small></span><em className="ag-chip ok">Active</em></div>
          <div className="ag-tr r6"><span><b>Global Electronics</b><small>Industrial · Silver AMC</small></span><span>Newark, NJ</span><span>5</span><span>$5,664<small>Not due yet</small></span><em className="ag-chip ok">Active</em></div>
        </div>
      </div>
      <div className="st-s s2">
        <Crumb t="Home › Customers › City Facilities" />
        <Hd t="City Facilities" p="Public sector · Gold AMC" b={<em className="ag-chip ok">Active</em>} />
        <div className="ag-stats four rc-stats"><Stat k="Open work orders" v="3" /><Stat k="Active jobs" v="3" /><Stat k="Assets" v="4" /><Stat k="Balance" v="$16,733" s={<span className="over">$2,030 overdue</span>} /></div>
        <div className="fd-grid">
          <div className="fd-card"><b>Primary contact</b><div className="fd-who"><i>MA</i><span>Mark Allen<small>+1 212 555 0201</small></span></div></div>
          <div className="fd-card"><b>Location</b><dl><div><dt>Address</dt><dd>New York, NY</dd></div><div><dt>Zone</dt><dd>Central zone</dd></div><div><dt>Last service</dt><dd>Nov 2, 2026</dd></div></dl></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Money: finished work becomes invoices ---------- */
function Money() {
  return (
    <div className="mn">
      <Crumb t="Home › Billing" />
      <Hd t="Billing" p="Service charges from completed job to collected payment." b={<span className="ag-btn pri mn-inv"><Dual a="Invoice 2 ready jobs" b="2 jobs invoiced" /></span>} />
      <div className="ag-stats mn-stats">
        <Stat k="Ready to invoice" v={<Dual a="$11,650" b="$0" />} s={<Dual a="2 completed jobs" b="0 completed jobs" />} cls="mn-ready" />
        <Stat k="Work in progress" v="$64,494" s="13 jobs accruing" />
        <Stat k="Outstanding" v={<Dual a="$133,894" b="$145,544" />} s={<Dual a="43 open invoices" b="45 open invoices" />} />
        <Stat k="Overdue" v="$22,055" s="7 invoices" cls="mn-over" />
        <Stat k="Collected" v="$224,076" s="62 paid in full" />
        <Stat k="Estimates out" v="$6,791" s="2 awaiting approval" />
      </div>
      <div className="mn-tabs"><b>Billable jobs<i>2</i></b><span>Invoices<i>43</i></span><span>Estimates<i>2</i></span><span>Partner payables<i>3</i></span></div>
      <div className="ag-tbl">
        <div className="ag-tr head r4m"><span>Job #</span><span>Work done</span><span>Amount</span><span>Billing</span></div>
        <div className="ag-tr r4m"><b className="lnk">JOB-10495</b><span>AC not cooling</span><span>$5,428</span><em className="ag-chip nw mn-st"><Dual a="Ready to invoice" b="Invoiced" /></em></div>
        <div className="ag-tr r4m"><b className="lnk">JOB-10497</b><span>Compressor inspection</span><span>$6,222</span><em className="ag-chip nw mn-st"><Dual a="Ready to invoice" b="Invoiced" /></em></div>
      </div>
    </div>
  );
}

/* ---------- AI: an agent finds work, a person decides ---------- */
function Ai() {
  return (
    <div className="ai">
      <Crumb t="Home › AI › AI hub" />
      <Hd t="AI hub" p="What EVI and the agents do, and who can use them. Nothing is sent, booked or changed until a person acts." />
      <div className="fd-tabs"><b>Agents</b><span>Schedules</span><span>AI helpers</span><span>Activity</span></div>
      <div className="ai-cards">
        <div className="ai-c ai-d">
          <div className="ai-h"><img src="/serviceops/v2/agents/dispatch-agent.jpg" alt="" /><b>Dispatch agent</b><em className="ag-chip ok">Enabled</em></div>
          <p>Finds work orders that are ready to schedule, and technicians who are booked past a full day or free while work waits.</p>
          <dl><div className="ai-g"><dt>Guardrail</dt><dd>Suggests, never books. A person decides in Dispatch.</dd></div><div><dt>Reads</dt><dd>Work orders, jobs, technician schedules</dd></div></dl>
          <div className="ai-f"><Dual a="Not run yet" b="8 found, 8 to review." /></div>
          <div className="ag-btns"><span className="ag-btn pri sm ai-run">Run now</span><span className="ag-btn sm ai-review">Review results</span><span className="ag-btn sm">Open Dispatch</span></div>
        </div>
        <div className="ai-c">
          <div className="ai-h"><img src="/serviceops/v2/agents/intake-agent.jpg" alt="" /><b>Intake agent</b><em className="ag-chip ok">Enabled</em></div>
          <p>Checks new requests for missing details, and open requests that look like duplicates (same customer, similar title).</p>
          <dl><div><dt>Guardrail</dt><dd>Never merges, declines or contacts anyone.</dd></div><div><dt>Reads</dt><dd>Requests</dd></div></dl>
          <div className="ai-f">4 found, 4 to review.</div>
          <div className="ag-btns"><span className="ag-btn sm">Run now</span><span className="ag-btn sm">Review results</span></div>
        </div>
      </div>
      <div className="ai-panel">
        <b>Dispatch agent · ready to schedule</b>
        <span><i>WO-2026-00417</i>Treatment room 3 not cooling, Harbor Dental<em>Suggest Michael Thomas</em></span>
        <span><i>WO-2026-00418</i>Low water pressure, Lakeview Hotel<em>Suggest Ravi Kumar</em></span>
        <small>You choose the technician and the time. The agent only suggests.</small>
      </div>
    </div>
  );
}

/* ---------- Customers: what a customer sees, a request out and an estimate back ---------- */
function Customers() {
  return (
    <div className="wk stack cu">
      <div className="st-s s1">
        <div className="cu-card">
          <b className="cu-h">Book a service visit</b>
          <span className="cu-f"><small>Your name</small>Margaret Hill</span>
          <span className="cu-f cu-what"><small>What needs attention?</small>AC not cooling, Room 204</span>
          <span className="cu-f"><small>Preferred time</small>Tomorrow morning</span>
          <span className="cu-btn cu-send"><Dual a="Send request" b="Request sent" /></span>
          <p className="cu-note d-on">Thanks, Margaret. We will confirm your visit shortly.</p>
        </div>
      </div>
      <div className="st-s s2">
        <div className="cu-card">
          <b className="cu-h">Estimate EST-0412</b>
          <span className="cu-l"><small>Compressor contactor</small>$186.50</span>
          <span className="cu-l"><small>Labour, 3 hours</small>$420.00</span>
          <span className="cu-l tot"><small>Total</small>$651.50</span>
          <div className="cu-btns"><span className="cu-btn cu-ok"><Dual a="Approve" b="Approved" /></span><span className="cu-btn ghost">Decline</span></div>
          <p className="cu-note d-on">Thank you. The work can now be scheduled.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Automation: rules written as plain sentences, tried as a dry run ---------- */
function Automation() {
  const rules: [string, string, string][] = [
    ["Decline untouched requests", "When a request has been untouched for 14 days, archive the request.", "au-r1"],
    ["Follow up on estimates", "When an estimate was sent and has had no answer for 3 days, send the customer a follow-up by email.", "au-r2"],
    ["Remind about overdue invoices", "When an invoice is overdue, send the customer a reminder by email.", "au-r3"],
  ];
  return (
    <div className="au">
      <Crumb t="Home › Settings › Automations" />
      <Hd t="Automations" p="Rules that follow up, remind and escalate for you, even when nobody has the app open." b={<span className="ag-btns"><span className="ag-btn">Test all (dry run)</span><span className="ag-btn pri">+ New rule</span></span>} />
      <div className="au-list">
        {rules.map(([t, d, c]) => (
          <div key={t} className={`au-rule ${c}`}>
            <div><b>{t}</b><p>{d}</p><small className="au-st"><Dual a="Last run: never" b="Dry run done. Nothing was sent." /></small></div>
            <span className="ag-btn sm au-test">Test</span>
          </div>
        ))}
      </div>
      <div className="au-ch"><b>Channels</b><span className="on">Email</span><span>SMS</span><span>WhatsApp</span><small>Rules only reach customers on the channels switched on here.</small></div>
    </div>
  );
}

/* ---------- Look and feel: a brand colour and a layout, in one click each ---------- */
const THEMES: [string, string, string][] = [["ServiceOps Amber", "#F5A524", "Default"], ["Clinic Blue", "#2563A8", "Healthcare and clinics"], ["Fresh Teal", "#0F9D8A", "Cleaning and facilities"], ["Slate Indigo", "#4F46E5", "Professional services"]];
const LAYOUTS = ["Classic", "Compact", "Clean", "Minimal"];
function Look() {
  return (
    <div className="lk">
      <Crumb t="Home › Settings › Appearance" />
      <Hd t="Appearance" p="Colour theme, layout and the Home banner." b={<span className="ag-btn pri">Use this theme</span>} />
      <b className="lk-k">Colour theme</b>
      <div className="lk-themes">
        {THEMES.map(([n, c, d], i) => <div key={n} className={`lk-t lk-t${i + 1}${i === 0 ? " on" : ""}`}><i style={{ background: c }} /><span>{n}<small>{d}</small></span></div>)}
      </div>
      <b className="lk-k">Layout</b>
      <div className="lk-layouts">
        {LAYOUTS.map((l, i) => <div key={l} className={`lk-l lk-l${i + 1}${i === 0 ? " on" : ""}`}><span /><b>{l}</b></div>)}
      </div>
    </div>
  );
}

/* ---------- Setup: people and their roles ---------- */
const MENU: [string, string[]][] = [["Organization", ["General", "Appearance", "Numbering"]], ["Service setup", ["Trades", "Job statuses", "Dispatch rules"]], ["Access and workspace", ["Users", "Integrations", "Roles & permissions"]]];
function Setup() {
  return (
    <div className="su">
      <aside className="su-menu">
        {MENU.map(([g, items]) => (
          <div key={g}><small>{g}</small>{items.map((i) => <span key={i} className={i === "General" ? "on su-gen" : i === "Users" ? "su-users" : undefined}>{i}</span>)}</div>
        ))}
      </aside>
      <div className="su-pane stack">
        <div className="st-s s1">
          <Hd t="General" p="How ServiceOps describes your business and formats information." b={<span className="ag-btn pri">Save changes</span>} />
          <div className="su-form"><span><small>Company name</small>Riverside Services</span><span><small>Time zone</small>Eastern Time (UTC−05:00)</span><span><small>Currency</small>USD ($)</span><span><small>Distance units</small>Miles</span></div>
        </div>
        <div className="st-s s2">
          <Hd t="Users" p="Each person sees the screens their role includes." b={<span className="ag-btn pri">+ Add user</span>} />
          <div className="ag-tbl">
            <div className="ag-tr head r3u"><span>Name</span><span>Role</span><span>Status</span></div>
            <div className="ag-tr r3u"><span><b>Owen Clarke</b></span><em className="ag-chip pg">Administrator</em><em className="ag-chip ok">Active</em></div>
            <div className="ag-tr r3u su-row"><span><b>Nia Brooks</b></span><em className="ag-chip su-role"><Dual a="Technician" b="Dispatcher" /></em><em className="ag-chip ok">Active</em></div>
            <div className="ag-tr r3u"><span><b>Chris Walker</b></span><em className="ag-chip sc">Technician</em><em className="ag-chip ok">Active</em></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const GUIDES: Record<string, { page: ReactNode; demo: Act[]; bare?: boolean; label?: string }> = {
  work: {
    page: <Work />,
    demo: [
      { to: ".wk .r1", tag: "Every ask lands in the inbox", hold: 2400, fx: 0.3 },
      { to: ".wk-conv", tag: "Turn it into a work order", hold: 2700, click: true },
      { to: ".wk-sched", tag: "See what needs scheduling", hold: 2300, fx: 0.5 },
      { to: ".wk-new .wk-st", tag: "Assign and schedule", hold: 2800, click: true, fx: 0.4 },
    ],
  },
  field: {
    page: <Field />,
    demo: [
      { to: ".fd-steps", tag: "Every step of the job, in order", hold: 2300, fx: 0.5 },
      { to: ".fd-tech", tag: "Who is on site, and when they arrived", hold: 2400, fx: 0.4 },
      { to: ".fd-s3", tag: "Checklist done on the spot", hold: 2500, click: true, fx: 0.3 },
      { to: ".fd-s4", tag: "Sign-off from the customer", hold: 2700, click: true, fx: 0.3 },
    ],
  },
  records: {
    page: <Records />,
    demo: [
      { to: ".rc-filters", tag: "Find any customer fast", hold: 2300, fx: 0.4 },
      { to: ".rc-bal", tag: "See what each customer owes", hold: 2400, fx: 0.4 },
      { to: ".rc-row", tag: "Open the full record", hold: 2600, click: true, fx: 0.3 },
      { to: ".rc-stats", tag: "Work, assets and balance together", hold: 2700, fx: 0.5 },
    ],
  },
  money: {
    page: <Money />,
    demo: [
      { to: ".mn-ready", tag: "Finished work, ready to invoice", hold: 2400, fx: 0.4 },
      { to: ".mn-inv", tag: "Invoice with a click", hold: 2800, click: true, fx: 0.4 },
      { to: ".mn-over", tag: "See what is overdue", hold: 2600, fx: 0.4 },
    ],
  },
  ai: {
    page: <Ai />,
    demo: [
      { to: ".ai-g", tag: "Guardrails you can read", hold: 2400, fx: 0.5 },
      { to: ".ai-run", tag: "Run an agent", hold: 2400, click: true },
      { to: ".ai-review", tag: "Review what it found", hold: 2500, click: true },
      { to: ".ai-panel", tag: "A person decides", hold: 2700, fx: 0.5 },
    ],
  },
  customers: {
    bare: true,
    label: "What your customer sees",
    page: <Customers />,
    demo: [
      { to: ".cu-what", tag: "Describe the problem", hold: 2300, fx: 0.5 },
      { to: ".cu-send", tag: "Request it online", hold: 2500, click: true },
      { to: ".cu-ok", tag: "Approve an estimate from a link", hold: 2800, click: true, fx: 0.5 },
    ],
  },
  automation: {
    page: <Automation />,
    demo: [
      { to: ".au-r2", tag: "A rule in plain words", hold: 2500, fx: 0.4 },
      { to: ".au-r2 .au-test", tag: "Try it as a dry run", hold: 2700, click: true },
      { to: ".au-ch", tag: "Only on the channels you switch on", hold: 2500, fx: 0.4 },
    ],
  },
  look: {
    page: <Look />,
    demo: [
      { to: ".lk-themes", tag: "Pick your brand colour", hold: 2300, fx: 0.5 },
      { to: ".lk-t2", tag: "Switch to your brand colour", hold: 2700, click: true },
      { to: ".lk-l3", tag: "Choose a layout", hold: 2700, click: true },
    ],
  },
  setup: {
    page: <Setup />,
    demo: [
      { to: ".su-menu", tag: "Every setting is in Settings", hold: 2400, fx: 0.5, fy: 0.3 },
      { to: ".su-users", tag: "Add your people", hold: 2500, click: true, fx: 0.4 },
      { to: ".su-role", tag: "Give each person a role", hold: 2700, click: true },
    ],
  },
};

/* a window with the app's top bar; the cursor only plays while the window is on screen, and stops when it is hovered */
export function AppGuide({ id, onEnd }: { id: string; onEnd?: () => void }) {
  const g = GUIDES[id];
  const root = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const d = useDemo(g.demo, seen, paused, page, onEnd);
  return (
    <div className="ag-win" ref={root}>
      <div className="ag-bar"><div className="ag-dots"><i /><i /><i /></div><span>{g.label ?? "EVOQ ServiceOps"}</span></div>
      <div className={`ag${g.bare ? " bare" : ""}`} data-f={id} data-a={d.i} data-p={d.p}>
        {!g.bare && (
          <div className="ag-top" aria-hidden>
            <i className="ag-menu"><Menu /></i>
            <span className="ag-sp" />
            <i className="ag-ic">{Ic.search}</i>
            <span className="ag-create">+ Create</span>
            <span className="ag-sync"><u />Online · synced</span>
            <i className="ag-ic">{Ic.bell}</i>
            <b className="ag-av">DA</b>
          </div>
        )}
        <div ref={page} className="ag-page" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {g.page}
          <DemoCursor d={d} acts={g.demo} />
        </div>
      </div>
    </div>
  );
}

/* the screens that swap: the stacked ones sit in one cell, and the second shows when its act has clicked */
const swap = (f: string, cond: string) => `
  .ag[data-f="${f}"] .st-s.s2{opacity:0;visibility:hidden}
  .ag[data-f="${f}"]:is(${cond}) .st-s.s1{opacity:0;visibility:hidden}
  .ag[data-f="${f}"]:is(${cond}) .st-s.s2{opacity:1;visibility:visible}`;
const A = (a: number) => `[data-a="${a}"]`;
const AP = (a: number) => `[data-a="${a}"][data-p="1"]`;
const ring = (sel: string, w = 2) => `${sel}{box-shadow:inset 0 0 0 ${w}px ${AMBER}!important}`;

export const guideCss = `
  .fz-main{grid-template-columns:minmax(0,1fr)}
  .fz-area{min-width:0}
  .ag-win,.ag,.wk,.st-s,.su-pane{min-width:0}
  .ag-tr>*{min-width:0}
  .ag-win{border-radius:24px;background:#fff;box-shadow:0 40px 80px -44px rgba(32,26,20,.55),0 0 0 1px ${LINE};overflow:hidden;margin-bottom:20px}
  .ag-bar{display:flex;align-items:center;gap:14px;padding:11px 18px;border-bottom:1px solid ${LINE};background:#FAF8F5;font-size:12.5px;color:${MUTED}}
  .ag-dots{display:flex;gap:6px}.ag-dots i{width:10px;height:10px;border-radius:50%;background:#E4DED5}
  .ag-dots i:nth-child(1){background:#F26D5B}.ag-dots i:nth-child(2){background:#F5B83D}.ag-dots i:nth-child(3){background:#58C26B}
  .ag{--acc:${AMBER};--acc-ink:${INK};position:relative;display:flex;flex-direction:column;height:500px;background:#fff}
  .ag-top{display:flex;align-items:center;gap:12px;height:52px;padding:0 16px;border-bottom:1px solid ${LINE};background:#fff;flex-shrink:0}
  .ag-sp{flex:1}
  .ag-menu,.ag-ic{display:flex;align-items:center;justify-content:center;width:34px;height:34px;color:${INK}}
  .ag-menu svg{width:20px;height:20px}.ag-ic svg{width:17px;height:17px}
  .ag-create{padding:7px 14px;border-radius:10px;background:var(--acc);font-size:12.5px;font-weight:700;color:var(--acc-ink);transition:background .35s ease}
  .ag-sync{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;box-shadow:inset 0 0 0 1px ${LINE};font-size:11.5px;font-weight:600;color:${INK};white-space:nowrap}
  .ag-sync u{width:7px;height:7px;border-radius:50%;background:#22C55E}
  .ag-av{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--acc);font-size:11px;color:var(--acc-ink);transition:background .35s ease}
  .ag-page{position:relative;flex:1;min-height:0;padding:14px 22px;overflow:hidden;background:linear-gradient(180deg,#FFF8EC,#fff 220px)}
  .ag.bare .ag-page{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#FFF3D9,#F6E9FF)}
  .ag-crumb{display:block;font-size:11.5px;color:${MUTED}}
  .ag-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-top:4px}
  .ag-hd h4{margin:0;font:700 22px var(--font-display),system-ui,sans-serif;color:${INK}}
  .ag-hd p{margin:2px 0 0;font-size:12.5px;color:${BODY}}
  .ag-btns{display:flex;gap:8px;flex-wrap:wrap}
  .ag-btn{display:inline-flex;align-items:center;padding:8px 14px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:12.5px;font-weight:600;color:${INK};white-space:nowrap;transition:box-shadow .3s ease,background .3s ease,color .3s ease}
  .ag-btn.pri{background:var(--acc);color:var(--acc-ink);box-shadow:none}
  .ag-btn.sm{padding:5px 11px;font-size:11.5px}
  .ag-btn.sm:not(.pri){background:${AMBER_SOFT};box-shadow:none;color:${AMBER_DEEP}}
  .ag-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}
  .ag-stats.four{grid-template-columns:repeat(4,1fr)}
  .ag-stats>div{padding:9px 14px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};transition:box-shadow .3s ease}
  .ag-stats small{display:block;font-size:11.5px;color:${MUTED}}
  .ag-stats b{display:block;font:700 20px var(--font-display),system-ui,sans-serif;color:${INK}}
  .ag-stats em{display:block;font-style:normal;font-size:11px;color:${MUTED}}
  .ag-tbl{margin-top:10px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};overflow:hidden}
  .ag-tr{display:grid;align-items:center;gap:10px;padding:9px 14px;border-top:1px solid ${LINE};font-size:12px;color:${INK};transition:box-shadow .3s ease,background .3s ease}
  .ag-tr.head{border-top:0;background:${G1};font-size:11px;font-weight:600;color:${MUTED}}
  .ag-tr.r4{grid-template-columns:.8fr 2.2fr 1.4fr .8fr .9fr .9fr}
  .ag-tr.r5{grid-template-columns:1.1fr 2fr 1.4fr .9fr 1.1fr}
  .ag-tr.r6{grid-template-columns:2fr 1.2fr 1fr 1.3fr .8fr}
  .ag-tr.r4m{grid-template-columns:.9fr 2fr 1fr 1.2fr}
  .ag-tr.r3u{grid-template-columns:2fr 1.4fr 1fr}
  .ag-tr small{display:block;font-size:11px;color:${MUTED}}
  .ag-tr .lnk{color:#2563EB;font-weight:600}
  .ag-tr b{font-weight:600}
  .ag-tr .dim{color:${MUTED}}
  .over{color:#B91C1C!important;font-weight:600}
  .pr{display:inline-flex;align-items:center;gap:4px;font-weight:600}.pr.hi{color:#B91C1C}.pr.md{color:${AMBER_DEEP}}
  .ag-chip{display:inline-block;justify-self:start;padding:2px 10px;border-radius:999px;font-style:normal;font-size:11px;font-weight:600;white-space:nowrap}
  .ag-chip.nw{background:#EDE9FE;color:#5B21B6}.ag-chip.rv{background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .ag-chip.pg{background:#E0ECFF;color:#1D4ED8}.ag-chip.sc{background:#DDEEFF;color:#1D4ED8}.ag-chip.ok{background:#E3F5EA;color:#167A43}
  ${demoCursorCss(AMBER_DEEP, "rgba(120,53,15,.55)")}

  /* screens that swap, and the values that change when a click lands */
  .stack{display:grid}
  .st-s{grid-area:1/1;transition:opacity .4s ease,visibility .4s}
  .ag .d-on,.ag .d-on2{display:none}
  .fd-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
  .fd-card{padding:11px 14px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};transition:box-shadow .3s ease}
  .fd-card>b{display:block;font:700 13px var(--font-display),system-ui,sans-serif;color:${INK}}
  .fd-card dl{display:grid;gap:5px;margin:8px 0 0}.fd-card dl div{display:grid;grid-template-columns:90px minmax(0,1fr);gap:8px;font-size:12px}
  .fd-card dt{color:${MUTED}}.fd-card dd{margin:0;color:${INK}}
  .fd-who{display:flex;align-items:center;gap:10px;margin-top:8px}
  .fd-who i{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:${AMBER_SOFT};font-style:normal;font-size:12px;font-weight:700;color:${AMBER_DEEP}}
  .fd-who span{font-size:13px;font-weight:600;color:${INK}}.fd-who small{display:block;font-size:11.5px;font-weight:400;color:${MUTED}}

  /* work */
  ${swap("work", `${AP(1)},${A(2)},${A(3)}`)}
  .ag[data-f="work"][data-a="3"][data-p="1"] .d-off{display:none}
  .ag[data-f="work"][data-a="3"][data-p="1"] .d-on{display:inline}
  ${ring('.ag[data-f="work"][data-a="0"] .wk .r1')}
  ${ring('.ag[data-f="work"][data-a="1"] .wk-conv')}
  .ag[data-f="work"][data-a="2"] .wk-sched{box-shadow:0 0 0 2px ${AMBER}}
  ${ring('.ag[data-f="work"][data-a="3"] .wk-new')}
  .ag[data-f="work"][data-a="3"][data-p="1"] .wk-st{background:#DDEEFF;color:#1D4ED8}

  /* field */
  .fd-tabs{display:flex;gap:16px;margin-top:8px;font-size:12.5px;color:${MUTED}}
  .fd-tabs b{padding-bottom:4px;color:${INK};box-shadow:0 2px 0 ${AMBER}}
  .fd-flow{margin-top:10px;padding:12px 14px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .fd-flow>small{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${MUTED}}
  .fd-steps{list-style:none;margin:10px 0 0;padding:0;display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
  .fd-steps li{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;font-size:11.5px;line-height:1.3;color:${BODY}}
  .fd-steps li:not(:last-child)::after{content:"";position:absolute;top:13px;left:calc(50% + 16px);right:calc(-50% + 16px);height:2px;background:#DDD8CE;transition:background .4s ease}
  .fd-steps li.done:not(:last-child)::after{background:#22C55E}
  .fd-steps .n,.fd-steps .ck{display:flex;align-items:center;justify-content:center;width:27px;height:27px;border-radius:50%;font-style:normal;font-size:12px;font-weight:700;transition:background .4s ease,color .4s ease,box-shadow .4s ease}
  .fd-steps .n{background:${G1};box-shadow:inset 0 0 0 1px ${LINE};color:${MUTED}}
  .fd-steps .ck{display:none;background:#22C55E;color:#fff}
  .fd-steps li.done .n{display:none}.fd-steps li.done .ck{display:flex}
  .fd-steps .fd-s3 .n{background:${AMBER};color:${INK};box-shadow:0 0 0 4px ${AMBER_SOFT}}
  .fd-say{margin:12px 0 0;font-size:12.5px;font-weight:600;color:${INK}}
  .ag[data-f="field"]:is(${AP(2)},${A(3)}) .fd-s3 .n{display:none}
  .ag[data-f="field"]:is(${AP(2)},${A(3)}) .fd-s3 .ck{display:flex}
  .ag[data-f="field"]:is(${AP(2)},${A(3)}) .fd-s3::after{background:#22C55E}
  .ag[data-f="field"]:is(${AP(2)},${A(3)}) .fd-s4 .n{background:${AMBER};color:${INK};box-shadow:0 0 0 4px ${AMBER_SOFT}}
  .ag[data-f="field"]:is(${AP(2)},${A(3)}) .fd-say .d-off{display:none}
  .ag[data-f="field"]:is(${AP(2)},${A(3)}) .fd-say .d-on{display:inline}
  .ag[data-f="field"]${AP(3)} .fd-s4 .n{display:none}
  .ag[data-f="field"]${AP(3)} .fd-s4 .ck{display:flex}
  .ag[data-f="field"]${AP(3)} .fd-s4::after{background:#22C55E}
  .ag[data-f="field"]${AP(3)} .fd-s5 .n{background:${AMBER};color:${INK};box-shadow:0 0 0 4px ${AMBER_SOFT}}
  .ag[data-f="field"]${AP(3)} .fd-say .d-on{display:none}
  .ag[data-f="field"]${AP(3)} .fd-say .d-on2{display:inline}
  ${ring('.ag[data-f="field"][data-a="1"] .fd-tech', 2)}

  /* records */
  .rc-filters{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
  .rc-filters span{padding:7px 12px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:12px;color:${BODY}}
  ${swap("records", `${AP(2)},${A(3)}`)}
  ${ring('.ag[data-f="records"][data-a="2"] .rc-row')}
  .ag[data-f="records"][data-a="1"] .rc-bal{box-shadow:0 0 0 2px ${AMBER};border-radius:6px}
  .ag[data-f="records"][data-a="3"] .rc-stats{box-shadow:0 0 0 2px ${AMBER};border-radius:12px}
  .rc-bal{padding:2px 4px;transition:box-shadow .3s ease}

  /* money */
  .mn-tabs{display:flex;gap:16px;margin-top:12px;font-size:12.5px;color:${MUTED}}
  .mn-tabs b{padding-bottom:4px;color:${INK};box-shadow:0 2px 0 ${AMBER}}
  .mn-tabs i{margin-left:5px;font-style:normal;font-weight:600}
  .ag[data-f="money"][data-a="1"][data-p="1"] .d-off,.ag[data-f="money"][data-a="2"] .d-off{display:none}
  .ag[data-f="money"][data-a="1"][data-p="1"] .d-on,.ag[data-f="money"][data-a="2"] .d-on{display:inline}
  .ag[data-f="money"][data-a="1"][data-p="1"] .mn-st,.ag[data-f="money"][data-a="2"] .mn-st{background:#E3F5EA;color:#167A43}
  .ag[data-f="money"][data-a="0"] .mn-ready{box-shadow:0 0 0 2px ${AMBER}}
  .ag[data-f="money"][data-a="1"] .mn-inv{box-shadow:0 0 0 3px ${AMBER_SOFT}}
  .ag[data-f="money"][data-a="2"] .mn-over{box-shadow:0 0 0 2px #DC2626}

  /* ai */
  .ai-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
  .ai-c{display:flex;flex-direction:column;gap:7px;padding:11px 13px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ai-h{display:flex;align-items:center;gap:9px}.ai-h img{width:32px;height:32px;border-radius:50%;object-fit:cover}
  .ai-h b{font:700 13px var(--font-display),system-ui,sans-serif;color:${INK}}.ai-h .ag-chip{margin-left:auto}
  .ai-c p{margin:0;font-size:11.5px;line-height:1.45;color:${BODY}}
  .ai-c dl{display:grid;gap:4px;margin:0}.ai-c dl div{display:grid;grid-template-columns:62px minmax(0,1fr);gap:6px;font-size:11px;line-height:1.35;border-radius:6px;transition:box-shadow .3s ease}
  .ai-c dt{color:${MUTED}}.ai-c dd{margin:0;color:${INK}}
  .ai-f{font-size:11.5px;font-weight:600;color:${INK}}
  .ai-panel{display:grid;gap:5px;margin-top:10px;padding:10px 13px;border-radius:12px;background:#FFFBF2;box-shadow:inset 0 0 0 1px ${AMBER};visibility:hidden;opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease,visibility .45s,box-shadow .3s ease}
  .ai-panel>b{font:700 12.5px var(--font-display),system-ui,sans-serif;color:${INK}}
  .ai-panel span{display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:8px;background:#fff;font-size:11.5px;color:${INK}}
  .ai-panel span i{font-style:normal;font-weight:600;color:#2563EB}.ai-panel span em{margin-left:auto;font-style:normal;color:${AMBER_DEEP};font-weight:600}
  .ai-panel small{font-size:11px;color:${MUTED}}
  .ag[data-f="ai"][data-a="1"][data-p="1"] .d-off,.ag[data-f="ai"]:is([data-a="2"],[data-a="3"]) .d-off{display:none}
  .ag[data-f="ai"][data-a="1"][data-p="1"] .d-on,.ag[data-f="ai"]:is([data-a="2"],[data-a="3"]) .d-on{display:inline}
  .ag[data-f="ai"]:is(${AP(2)},${A(3)}) .ai-panel{visibility:visible;opacity:1;transform:none}
  .ag[data-f="ai"][data-a="0"] .ai-g{box-shadow:0 0 0 2px ${AMBER}}
  .ag[data-f="ai"][data-a="3"] .ai-panel{box-shadow:inset 0 0 0 2px ${AMBER}}

  /* customers */
  .cu{width:100%}
  .cu-card{display:grid;gap:8px;width:330px;max-width:100%;margin:0 auto;padding:18px;border-radius:16px;background:#fff;box-shadow:0 26px 50px -30px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .cu-h{font:700 17px var(--font-display),system-ui,sans-serif;color:${INK}}
  .cu-f,.cu-l{display:block;padding:8px 12px;border-radius:10px;background:${G1};font-size:13px;color:${INK};transition:box-shadow .3s ease}
  .cu-f small{display:block;font-size:11px;color:${MUTED}}
  .cu-l{display:flex;justify-content:space-between}.cu-l small{font-size:12.5px;color:${BODY}}.cu-l.tot{font-weight:700}
  .cu-btns{display:flex;gap:8px}
  .cu-btn{display:inline-flex;align-items:center;justify-content:center;flex:1;padding:10px 14px;border-radius:10px;background:${AMBER};font-size:13px;font-weight:700;color:${INK};transition:background .3s ease,color .3s ease}
  .cu-btn.ghost{background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-weight:600}
  .cu-note{margin:0;font-size:12.5px;font-weight:600;color:#167A43}
  .ag[data-f="customers"] .cu-note.d-on{display:none}
  .ag[data-f="customers"]:is(${AP(1)},${A(2)}) .s1 .cu-note.d-on{display:block}
  .ag[data-f="customers"]${AP(2)} .s2 .cu-note.d-on{display:block}
  ${swap("customers", `${A(2)}`)}
  .ag[data-f="customers"]:is(${AP(1)},${A(2)}) .s1 .d-off{display:none}
  .ag[data-f="customers"]:is(${AP(1)},${A(2)}) .s1 .d-on:not(.cu-note){display:inline}
  .ag[data-f="customers"]${AP(2)} .s2 .d-off{display:none}
  .ag[data-f="customers"]${AP(2)} .s2 .d-on:not(.cu-note){display:inline}
  .ag[data-f="customers"][data-a="0"] .cu-what{box-shadow:0 0 0 2px ${AMBER}}
  .ag[data-f="customers"]${AP(2)} .cu-ok{background:#22C55E;color:#fff}

  /* automation */
  .au-list{display:grid;gap:8px;margin-top:10px}
  .au-rule{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:11px 14px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};transition:box-shadow .3s ease}
  .au-rule b{font:700 13px var(--font-display),system-ui,sans-serif;color:${INK}}
  .au-rule p{margin:3px 0 0;font-size:12px;line-height:1.45;color:${BODY}}
  .au-rule small{display:block;margin-top:3px;font-size:11px;color:${MUTED}}
  .au-ch{display:flex;align-items:center;gap:8px;margin-top:10px;padding:9px 14px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};font-size:12px;transition:box-shadow .3s ease}
  .au-ch b{font:700 12.5px var(--font-display),system-ui,sans-serif;color:${INK}}
  .au-ch span{padding:4px 11px;border-radius:999px;background:${G1};color:${MUTED};font-weight:600}.au-ch span.on{background:#E3F5EA;color:#167A43}
  .au-ch small{margin-left:auto;font-size:11px;color:${MUTED}}
  .ag[data-f="automation"][data-a="1"][data-p="1"] .au-r2 .d-off,.ag[data-f="automation"][data-a="2"] .au-r2 .d-off{display:none}
  .ag[data-f="automation"][data-a="1"][data-p="1"] .au-r2 .d-on,.ag[data-f="automation"][data-a="2"] .au-r2 .d-on{display:inline}
  .ag[data-f="automation"][data-a="0"] .au-r2{box-shadow:0 0 0 2px ${AMBER}}
  .ag[data-f="automation"][data-a="2"] .au-ch{box-shadow:0 0 0 2px ${AMBER}}
  .ag[data-f="automation"][data-a="1"] .au-r2 .au-test{box-shadow:inset 0 0 0 2px ${AMBER}}

  /* look and feel */
  .lk-k{display:block;margin-top:12px;font:700 12.5px var(--font-display),system-ui,sans-serif;color:${INK}}
  .lk-themes{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:8px}
  .lk-t{display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};font-size:12px;font-weight:600;color:${INK};transition:box-shadow .3s ease}
  .lk-t i{width:24px;height:24px;border-radius:50%;flex-shrink:0}.lk-t small{display:block;font-size:10.5px;font-weight:400;color:${MUTED}}
  .lk-t.on{box-shadow:0 0 0 2px ${AMBER}}
  .lk-layouts{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:8px}
  .lk-l{padding:10px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};transition:box-shadow .3s ease}
  .lk-l span{display:block;height:46px;margin-bottom:8px;border-radius:8px;background:${G1}}
  .lk-l b{font-size:12px;color:${INK}}
  .lk-l.on{box-shadow:0 0 0 2px var(--acc)}
  .ag[data-f="look"]:is(${AP(1)},${A(2)}) .lk-t1{box-shadow:0 0 0 1px ${LINE}}
  .ag[data-f="look"]:is(${AP(1)},${A(2)}) .lk-t2{box-shadow:0 0 0 2px #2563A8}
  .ag[data-f="look"]:is(${AP(1)},${A(2)}){--acc:#2563A8;--acc-ink:#fff}
  .ag[data-f="look"]${AP(2)} .lk-l1{box-shadow:0 0 0 1px ${LINE}}
  .ag[data-f="look"]${AP(2)} .lk-l3{box-shadow:0 0 0 2px #2563A8}

  /* setup */
  .su{display:grid;grid-template-columns:150px minmax(0,1fr);gap:18px}
  .su-menu{display:grid;align-content:start;gap:10px;transition:box-shadow .3s ease}
  .su-menu small{display:block;margin-bottom:3px;font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${MUTED}}
  .su-menu span{display:block;padding:6px 10px;border-radius:8px;font-size:12px;color:${BODY};transition:background .3s ease,color .3s ease}
  .su-menu span.on{background:${AMBER_SOFT};font-weight:600;color:${INK}}
  ${swap("setup", `${AP(1)},${A(2)}`)}
  .ag[data-f="setup"]:is(${AP(1)},${A(2)}) .su-gen{background:transparent;font-weight:400;color:${BODY}}
  .ag[data-f="setup"]:is(${AP(1)},${A(2)}) .su-users{background:${AMBER_SOFT};font-weight:600;color:${INK}}
  .su-form{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
  .su-form span{padding:9px 12px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:13px;color:${INK}}
  .su-form small{display:block;font-size:11px;color:${MUTED}}
  .ag[data-f="setup"][data-a="0"] .su-menu{box-shadow:0 0 0 2px ${AMBER};border-radius:10px}
  .ag[data-f="setup"][data-a="2"][data-p="1"] .d-off{display:none}
  .ag[data-f="setup"][data-a="2"][data-p="1"] .d-on{display:inline}
  .ag[data-f="setup"][data-a="2"][data-p="1"] .su-role{background:#E0ECFF;color:#1D4ED8}
  .ag[data-f="setup"][data-a="2"] .su-row{background:#FFFBF2}

  @media (max-width:760px){
    .ag-stats.four{grid-template-columns:1fr 1fr}
    .lk-themes,.lk-layouts{grid-template-columns:1fr 1fr}
    .ai-cards{grid-template-columns:1fr}
    .ai-c:nth-child(2){display:none}
    .fd-grid{grid-template-columns:1fr}
    .fd-steps{grid-template-columns:repeat(3,1fr);row-gap:14px}.fd-steps li::after{display:none}
    .su{grid-template-columns:1fr}.su-menu{display:none}
  }
  @media (max-width:640px){
    .ag{height:auto}
    .ag-page{padding:12px;min-height:440px}
    .ag-sync,.ag-ic{display:none}
    .ag-hd p{display:none}
    .ag-hd{flex-wrap:wrap}
    .ag-stats{grid-template-columns:1fr 1fr}
    .fd-tabs,.mn-tabs{flex-wrap:wrap;gap:6px 14px}
    .ag-tr.r4{grid-template-columns:2fr 1fr 1fr}.ag-tr.r4>:nth-child(1),.ag-tr.r4>:nth-child(3),.ag-tr.r4>:nth-child(4){display:none}
    .ag-tr.r5{grid-template-columns:1fr 2fr 1fr}.ag-tr.r5>:nth-child(3),.ag-tr.r5>:nth-child(5){display:none}
    .ag-tr.r6{grid-template-columns:2fr 1fr 1fr}.ag-tr.r6>:nth-child(2),.ag-tr.r6>:nth-child(3){display:none}
    .ag-tr.r4m{grid-template-columns:2fr 1fr 1.4fr}.ag-tr.r4m>:nth-child(1){display:none}
    .au-ch small{display:none}
    .ag-btns .ag-btn:not(.pri){display:none}
  }
`;
