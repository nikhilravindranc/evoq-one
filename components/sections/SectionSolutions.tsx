"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Easing } from "framer-motion";
import { Eyebrow } from "./shared";
import { SolutionDash } from "./SolutionDash";
import { EviAgent } from "./eviAgent";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* One featured industry at a time. Each wears its own industry page's palette for the active pill,
   accent clause and button. Each industry shows four use cases, a feed of work across them,
   a real photograph for the setting, and one AI agent (EVI) whose result always waits for review. */
type Tone = "ok" | "warn" | "info";
type FloatCard = { tone: Tone; title: string; sub: string };
type FeedRow = { tag: string; text: string; sub: string; tone: Tone; who: number };
type Industry = {
  key: string; tab: string; name: string;
  lead: string; accent: string; body: string;
  uses: [string, string[]][];
  feedTitle: string; feed: FeedRow[];
  roles: { role: string; img: string }[];
  agent: { name: string; task: string; status: string; line: string };
  hl: FloatCard;
  href: string; cta?: string;
  color: string; deep: string; soft: string; btn?: string;
};

const FACE = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=120&h=120&q=70`;

const PRODUCT_ICON: Record<string, string> = {
  CRM: "crm-menu-icn.png", Campaigns: "campaigns-menu-icn.png", ConfigX: "ConfigX-menu-icn.png", ServiceOps: "serviceops-icon.svg",
  Projects: "evoq-projects-menu-icn.png", Desk: "desk-menu-icn.png", HRMS: "hrms-menu-icn-new.png", Skillberry: "Skillberry-menu-icn.png",
  Billing: "billing-menu-icn.png", Inventory: "inventory-menu-icn.png",
};

const INDUSTRIES: Industry[] = [
  { key: "healthcare", tab: "Healthcare", name: "Healthcare",
    lead: "From referral to return visit, ", accent: "every step has an owner.",
    body: "Referrals reach the first appointment, follow-ups go out on schedule, and patients are asked how their visit went. Providers and the front desk work from the same patient history.",
    uses: [
      ["Referrals tracked to the first appointment", ["CRM"]],
      ["Appointments and providers scheduled", ["Practice Management"]],
      ["Follow-ups and reminders sent on time", ["Campaigns"]],
      ["Feedback and returning-patient rewards", ["Surveys", "Loyalty"]],
    ],
    feedTitle: "Today at Brightwell Clinic",
    feed: [
      { tag: "Practice Management", text: "Sarah Johnson", sub: "Waiting · 12 min", tone: "warn", who: 3 },
      { tag: "CRM", text: "Referral received", sub: "Cardiology · booked for Friday", tone: "info", who: 2 },
      { tag: "Campaigns", text: "3 follow-ups due", sub: "Reminders drafted", tone: "warn", who: 1 },
      { tag: "Surveys", text: "Post-visit survey", sub: "12 responses this week", tone: "ok", who: 3 },
      { tag: "Loyalty", text: "Returning patient", sub: "6 visits · next benefit in 2", tone: "ok", who: 0 },
    ],
    roles: [{ role: "Practitioner", img: FACE("1758691463582-11aea602cd4a") }, { role: "Nurse", img: FACE("1594824476967-48c8b964273f") }, { role: "Front desk", img: FACE("1484863137850-59afcfe05386") }, { role: "Patient", img: FACE("1616286608358-0e1b143f7d2f") }],
    agent: { name: "Follow-up agent", task: "Drafted 4 reminders for overdue follow-ups", status: "Ready for review", line: "Follow-up agent drafts reminders for overdue follow-ups, then waits for your review." },
    hl: { tone: "ok", title: "Appointment confirmed", sub: "Follow-up booked for Friday" },
    cta: "Explore healthcare", href: "/solutions/healthcare",
    color: "#0F766E", deep: "#123B3A", soft: "#DDF5F0" },
  { key: "manufacturing", tab: "Manufacturing", name: "Manufacturing",
    lead: "From configured quote to service call, ", accent: "the record travels with the product.",
    body: "Requirements are captured at enquiry, quotes follow the selected configuration, delivery commitments are confirmed, and service visits start from the product's history.",
    uses: [
      ["Enquiries and accounts recorded", ["CRM"]],
      ["Products configured and quotes prepared", ["ConfigX"]],
      ["Stock checked against open orders", ["Inventory"]],
      ["Service visits and support requests handled", ["ServiceOps", "Desk"]],
    ],
    feedTitle: "Quotes, orders and service",
    feed: [
      { tag: "ConfigX", text: "Quote Q-118 sent", sub: "Modular desk · Oak · ₹48,200", tone: "info", who: 0 },
      { tag: "CRM", text: "Order confirmed", sub: "Northgate Holdings", tone: "ok", who: 3 },
      { tag: "Inventory", text: "Steel sheet 2 mm low", sub: "120 units · reorder flagged", tone: "warn", who: 1 },
      { tag: "Projects", text: "Delivery scheduled", sub: "Oct 9 · installation crew", tone: "info", who: 1 },
      { tag: "ServiceOps", text: "Service visit logged", sub: "Installed desk · Oct 12", tone: "ok", who: 2 },
    ],
    roles: [{ role: "Sales engineer", img: FACE("1522318548694-a0b65c40b0c6") }, { role: "Planner", img: FACE("1742203100124-097602ba52cd") }, { role: "Technician", img: FACE("1742281694796-36a9ae24b59a") }, { role: "Customer", img: FACE("1560250097-0b93528c311a") }],
    agent: { name: "Quote agent", task: "Prepared quote Q-118 from the selected configuration", status: "Ready for review", line: "Quote agent prepares quotes from the selected configuration, then waits for your review." },
    hl: { tone: "ok", title: "Service history attached", sub: "Modular desk · installed Oct 9" },
    cta: "Explore manufacturing", href: "/solutions/manufacturing",
    color: "#2563EB", deep: "#1F2933", soft: "#DBEAFE" },
  { key: "construction", tab: "Construction, Engineering & Real Estate", name: "Construction, Engineering & Real Estate",
    lead: "From bid to handover, ", accent: "site progress, client commitments and billing line up.",
    body: "Bids and property enquiries are followed through project delivery. Milestones, client commitments and invoices are tracked together, and service continues after handover.",
    uses: [
      ["Bids and property enquiries followed up", ["CRM", "Campaigns"]],
      ["Tasks, owners and milestones tracked", ["Projects"]],
      ["Stock and invoices tied to the project", ["Inventory", "Billing"]],
      ["Service after handover", ["ServiceOps"]],
    ],
    feedTitle: "Riverside Block B",
    feed: [
      { tag: "Projects", text: "64% complete", sub: "Next: MEP sign-off · Oct 21", tone: "info", who: 0 },
      { tag: "Billing", text: "Phase 2 invoice raised", sub: "Milestone completed", tone: "ok", who: 2 },
      { tag: "CRM", text: "Client follow-up", sub: "Quote sent to Nova Residences", tone: "info", who: 3 },
      { tag: "Inventory", text: "Cable tray delivery", sub: "Arrives Oct 18", tone: "info", who: 1 },
      { tag: "Projects", text: "Snag list", sub: "4 items assigned", tone: "warn", who: 1 },
    ],
    roles: [{ role: "Project manager", img: FACE("1646227655685-a530813759b3") }, { role: "Site engineer", img: FACE("1672748341520-6a839e6c05bb") }, { role: "Estimator", img: FACE("1564564295391-7f24f26f568b") }, { role: "Client", img: FACE("1519085360753-af0119f7cbe7") }],
    agent: { name: "Milestone agent", task: "Flagged MEP sign-off due Oct 21 and drafted the client update", status: "Ready for review", line: "Milestone agent flags upcoming sign-offs and drafts the client update, then waits for your review." },
    hl: { tone: "ok", title: "Phase 2 handed to the client", sub: "Handover recorded" },
    cta: "Explore construction", href: "/solutions/construction-engineering-real-estate",
    color: "#B4533C", deep: "#7C2D1F", soft: "#E8D8BF" },
  { key: "field-service", tab: "Field Service, Facilities & Maintenance", name: "Field Service, Facilities & Maintenance",
    lead: "Requests, technicians, parts and invoices, ", accent: "on the same job.",
    body: "Service requests are logged and assigned, technicians see the job on mobile, parts are recorded, and the invoice is raised when the job closes. Planned maintenance runs alongside reactive work.",
    uses: [
      ["Requests logged from every channel", ["Desk"]],
      ["Technicians dispatched and jobs tracked", ["ServiceOps"]],
      ["Parts recorded against the job", ["Inventory"]],
      ["Invoices raised on completion", ["Billing"]],
    ],
    feedTitle: "Today's jobs",
    feed: [
      { tag: "ServiceOps", text: "Technician en route", sub: "Arjun · ETA 12 min", tone: "info", who: 1 },
      { tag: "Desk", text: "Request logged", sub: "Level 3 · water leak", tone: "warn", who: 3 },
      { tag: "Inventory", text: "Parts used on WO-1042", sub: "2 filters recorded", tone: "ok", who: 1 },
      { tag: "Billing", text: "Work order closed", sub: "Invoice raised", tone: "ok", who: 0 },
      { tag: "ServiceOps", text: "Pump 2 servicing", sub: "Planned · due Friday", tone: "info", who: 2 },
    ],
    roles: [{ role: "Dispatcher", img: FACE("1744301062835-b5b8fd23251b") }, { role: "Technician", img: FACE("1787672357797-f5fa35bb0d18") }, { role: "Facilities manager", img: FACE("1688841747582-41097036109d") }, { role: "Customer", img: FACE("1651684215020-f7a5b6610f23") }],
    agent: { name: "Dispatch agent", task: "Prepared a dispatch plan for 6 open jobs", status: "Waiting for approval", line: "Dispatch agent prepares a dispatch plan for open jobs, then waits for your approval." },
    hl: { tone: "info", title: "6 technicians on the road", sub: "34 jobs today" },
    cta: "Explore field service", href: "/solutions/field-service-facilities-maintenance",
    color: "#1777F0", deep: "#0F3D75", soft: "#DBEAFE" },
  { key: "hospitality", tab: "Hospitality, Travel & F&B", name: "Hospitality, Travel & F&B",
    lead: "From reservation to repeat visit, ", accent: "the guest is known to every team.",
    body: "Reservations are confirmed, guest requests and preferences are recorded, and follow-up goes out after every visit. Hotels, restaurants and travel operators each start from what they need.",
    uses: [
      ["Enquiries and reservations confirmed", ["CRM"]],
      ["Guest requests assigned and tracked", ["Desk"]],
      ["Feedback collected after each visit", ["Surveys"]],
      ["Offers for returning guests", ["Loyalty", "Campaigns"]],
    ],
    feedTitle: "Today at The Terrace",
    feed: [
      { tag: "CRM", text: "Table for 4 · 8:00 PM", sub: "Confirmed at The Terrace", tone: "ok", who: 2 },
      { tag: "Desk", text: "Special requirements", sub: "Noted for arrival · Elena Rossi", tone: "info", who: 1 },
      { tag: "Loyalty", text: "Returning guest", sub: "Preferences noted at check-in", tone: "ok", who: 3 },
      { tag: "Surveys", text: "Feedback request sent", sub: "James Okafor · checked out", tone: "info", who: 3 },
      { tag: "Desk", text: "Room being prepared", sub: "Tom Becker · Room 214", tone: "warn", who: 0 },
    ],
    roles: [{ role: "Front desk", img: FACE("1662850886700-4ec19bd30d11") }, { role: "Concierge", img: FACE("1775257796019-3e8db981a1a6") }, { role: "Chef", img: FACE("1583394293214-28ded15ee548") }, { role: "Guest", img: FACE("1580489944761-15a19d654956") }],
    agent: { name: "Guest agent", task: "Compiled arrival preferences for 24 guests", status: "Ready for review", line: "Guest agent compiles arrival preferences for the day's guests, then waits for your review." },
    hl: { tone: "info", title: "24 arrivals today", sub: "38 covers booked tonight" },
    cta: "Explore hospitality", href: "/solutions/hospitality-travel-food-and-beverage",
    color: "#14532D", deep: "#064E3B", soft: "#F7F1E3" },
  { key: "finance", tab: "Financial Services", name: "Financial Services",
    lead: "Enquiries, service requests and renewals, ", accent: "answered in turn.",
    body: "Client enquiries are logged, service requests are assigned and closed, and reviews and renewals are scheduled. Every adviser sees the same conversation history.",
    uses: [
      ["Client enquiries logged and followed up", ["CRM"]],
      ["Service requests assigned and tracked", ["Desk"]],
      ["Reviews and renewals scheduled", ["CRM"]],
      ["Client communication sent to the right groups", ["Campaigns"]],
    ],
    feedTitle: "Client activity",
    feed: [
      { tag: "CRM", text: "Harper & Co", sub: "Annual review · Thursday", tone: "warn", who: 3 },
      { tag: "Desk", text: "Statement query", sub: "Closed today", tone: "ok", who: 2 },
      { tag: "CRM", text: "Renewal due", sub: "Northgate Holdings · 12 days", tone: "warn", who: 1 },
      { tag: "Campaigns", text: "Campaign reply", sub: "Bright Path Ltd", tone: "info", who: 3 },
      { tag: "CRM", text: "New enquiry assigned", sub: "Orion Partners", tone: "info", who: 0 },
    ],
    roles: [{ role: "Adviser", img: FACE("1573496359142-b8d87734a5a2") }, { role: "Relationship manager", img: FACE("1573497019940-1c28c88b4f3e") }, { role: "Service agent", img: FACE("1758691737605-69a0e78bd193") }, { role: "Client", img: FACE("1705645930353-0e335311ef20") }],
    agent: { name: "Renewal agent", task: "Listed 6 renewals due this month and drafted outreach", status: "Ready for review", line: "Renewal agent lists upcoming renewals and drafts outreach, then waits for your review." },
    hl: { tone: "ok", title: "Client request resolved", sub: "Statement query closed" },
    href: "/solutions/financial-services", cta: "Explore financial services",
    color: "#1B7F8C", deep: "#0B2D4F", soft: "#E7F3EE", btn: "#0B2D4F" },
  { key: "all", tab: "All industries", name: "All industries",
    lead: "Start with the products your industry needs, ", accent: "add the rest as it grows.",
    body: "EVOQ has dedicated solutions for six industries, and its products combine to fit the rest. Choose what your operation needs first.",
    uses: [
      ["Customer relationships and campaigns", ["CRM", "Campaigns"]],
      ["Projects, service and requests", ["Projects", "ServiceOps", "Desk"]],
      ["Billing and stock", ["Billing", "Inventory"]],
      ["People and learning", ["HRMS", "Skillberry"]],
    ],
    feedTitle: "", feed: [], roles: [],
    agent: { name: "EVI", task: "Which products does a wholesale business need? Start with CRM, Inventory and Billing.", status: "Answered", line: "Ask EVI which products fit your industry, and it points you to where to start." },
    hl: { tone: "info", title: "13 industries · 12 products", sub: "One suite, combined your way" },
    href: "/industries", cta: "Explore all industries",
    color: "#4747E0", deep: "#1F2A60", soft: "#EEEDFF" },
];

function ProductChip({ name, small = false }: { name: string; small?: boolean }) {
  const f = PRODUCT_ICON[name];
  return (
    <span className={`sv-chip${small ? " sm" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {f ? <img src={`/billing/images/${f}`} alt="" width={15} height={15} /> : <i aria-hidden="true" />}
      {name}
    </span>
  );
}

const AUTO_MS = 12000;

// Keep hyphenated words ("follow-up") on one line so titles never break at the hyphen.
const keep = (t: string) =>
  t.split(/(\S*-\S*)/).map((p, i) => (p.includes("-") ? <span key={i} style={{ whiteSpace: "nowrap" }}>{p}</span> : p));

/* The right visual is drawn on a fixed 600x590 canvas so cards and arrows line up exactly; it is scaled down
   to the column width. Below ~540px it falls back to a simple stacked flow without arrows. */
function FitStage({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(1);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width >= 540 ? Math.min(1.12, e.contentRect.width / 600) : null));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={wrap} className={`sx-wrap${scale === null ? " flow" : ""}`} style={scale !== null ? { height: 590 * scale } : undefined}>
      <div className="sx-canvas" style={scale !== null ? { transform: `scale(${scale})`, transformOrigin: scale >= 1 ? "50% 0" : "0 0" } : undefined}>{children}</div>
    </div>
  );
}

/* Smallest width at which each tab label wraps to two lines at most (measured at 14px, weight 600, plus padding). */
const TAB_W: Record<string, number> = { healthcare: 103, manufacturing: 127, construction: 200, "field-service": 181, hospitality: 113, finance: 88, all: 96 };

export function SectionSolutions() {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: false, right: false, overflow: false });

  // One row of tabs that scrolls sideways: track whether there is more to see on either side.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const read = () => setEdge({ overflow: el.scrollWidth > el.clientWidth + 2, left: el.scrollLeft > 2, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
    read();
    el.addEventListener("scroll", read, { passive: true });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", read); ro.disconnect(); };
  }, []);

  // Keep the active tab in view (it changes on its own while auto-advancing).
  useEffect(() => {
    const el = scroller.current;
    const tab = el?.querySelectorAll<HTMLElement>(".sol-tab")[active];
    if (!el || !tab) return;
    const pad = 12;
    if (tab.offsetLeft - pad < el.scrollLeft) el.scrollTo({ left: tab.offsetLeft - pad, behavior: "smooth" });
    else if (tab.offsetLeft + tab.offsetWidth + pad > el.scrollLeft + el.clientWidth) el.scrollTo({ left: tab.offsetLeft + tab.offsetWidth + pad - el.clientWidth, behavior: "smooth" });
  }, [active]);

  const nudge = (dir: -1 | 1) => scroller.current?.scrollBy({ left: dir * Math.max(220, scroller.current.clientWidth * 0.6), behavior: "smooth" });

  // Gentle auto-advance so the hidden industries get seen; stops for good
  // once the visitor picks one themselves.
  useEffect(() => {
    if (stopped) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % INDUSTRIES.length), AUTO_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [stopped]);

  const x = INDUSTRIES[active];

  return (
    <section className="s-solutions">
      <div className="s-solutions-inner">
        <div className="sol-top">
          <motion.div className="evoq-section-head sol-head" {...fadeUp(0)}>
            <Eyebrow>Solutions</Eyebrow>
            <h2 className="evoq-h2">
              How each industry <span className="accent">runs on EVOQ.</span>
            </h2>
          </motion.div>
          <motion.div className="sol-links" {...fadeUp(0.04)}>
            <a href="/solutions" className="sol-more-btn">Solutions overview <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </motion.div>
        </div>

        <motion.div className="sol-tabs-wrap" {...fadeUp(0.08)}>
          {edge.overflow && (
            <button type="button" className="sol-arrow" aria-label="Show previous industries" disabled={!edge.left} onClick={() => nudge(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
          <div className={`sol-scroll${edge.left ? " fl" : ""}${edge.right ? " fr" : ""}`} ref={scroller}>
          <div className="sol-tabs" role="tablist" aria-label="Industries">
            {INDUSTRIES.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={on}
                  className={`sol-tab${on ? " on" : ""}`}
                  style={{ "--tw": `${TAB_W[s.key]}px`, ...(on ? { "--sol-c": s.color, "--sol-soft": s.soft } : {}) } as React.CSSProperties}
                  onClick={() => { setActive(i); setStopped(true); }}
                >
                  {s.tab}
                </button>
              );
            })}
          </div>
          </div>
          {edge.overflow && (
            <button type="button" className="sol-arrow" aria-label="Show more industries" disabled={!edge.right} onClick={() => nudge(1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={x.key}
            className="sol-stage"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ "--sol-c": x.color, "--sol-deep": x.deep, "--sol-soft": x.soft } as React.CSSProperties}
          >
            <div className="sol-copy">
              <p className="sol-name">{x.name}</p>
              <h3 className="sol-title">
                {keep(x.lead)}<span style={{ color: x.color }}>{keep(x.accent)}</span>
              </h3>
              <p className="sol-desc">{x.body}</p>
              <ul className="sv-uses">
                {x.uses.map(([text]) => (
                  <li key={text}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill={x.color} opacity=".14" /><path d="M5.8 10.4l2.8 2.8 5.6-6" stroke={x.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <a href={x.href} className="sol-cta" style={{ background: x.btn ?? x.color }}>
                {x.cta ?? `Explore ${x.tab.toLowerCase()}`}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>

            {x.key === "all" ? (
              <div className="sv-visual sv-all">
                <div className="sol-frame"><SolutionDash k={x.key} c={x.color} /></div>
                <div className="sv-hl">
                  <span className={`sol-float-ic ${x.hl.tone}`}>
                {x.hl.tone === "ok" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                {x.hl.tone === "warn" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 4.5v4.2M8 11.2v.3" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                {x.hl.tone === "info" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 4.8V8l2.2 1.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                  <div><div className="sol-float-t">{x.hl.title}</div><div className="sol-float-s">{x.hl.sub}</div></div>
                </div>
                <div className="sv-agent">
                  <span className="sv-agent-av"><EviAgent size={54} ring="#fff" /></span>
                  <div className="sv-agent-b">
                    <span className="sv-agent-k">AI agent</span>
                    <b>{x.agent.name}</b>
                    <p>{x.agent.task}</p>
                    <span className="sv-status" style={{ color: x.color, background: x.soft }}>{x.agent.status}</span>
                  </div>
                </div>
              </div>
            ) : (
              <FitStage>
                <div className="sx-roles">
                  <span className="sx-roles-k">Used by</span>
                  {x.roles.map((r) => (
                    <span key={r.role} className="sx-role">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.img} alt="" width={30} height={30} />
                      <b>{r.role}</b>
                    </span>
                  ))}
                </div>

                <div className="sx-feed">
                  <div className="sx-feed-h">
                    <b>{x.feedTitle}</b>
                    <span className="sx-live"><i />Live</span>
                  </div>
                  {x.feed.map((r) => (
                    <div key={r.text} className="sx-row">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={`sx-av ${r.tone}`} src={x.roles[r.who].img} alt="" width={32} height={32} title={x.roles[r.who].role} />
                      <div className="sx-row-t"><b>{r.text}</b><span>{r.sub}</span></div>
                      <ProductChip name={r.tag} small />
                    </div>
                  ))}
                </div>

                <svg className="sx-arrows" viewBox="0 0 600 590" fill="none" aria-hidden="true" style={{ color: x.color }}>
                  <defs>
                    <marker id="sxArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto">
                      <path d="M1.5 1.5 L8 5 L1.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </marker>
                  </defs>
                  <path d="M140 434 C 140 458, 206 450, 206 473" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".75" markerEnd="url(#sxArr)" />
                  <path d="M570 474 C 608 412, 606 338, 550 290" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".75" markerEnd="url(#sxArr)" />
                </svg>

                <motion.div className="sx-hl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="sx-hl-k">Result</span>
                  <span className={`sol-float-ic ${x.hl.tone}`}>
                      {x.hl.tone === "ok" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      {x.hl.tone === "warn" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 4.5v4.2M8 11.2v.3" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                      {x.hl.tone === "info" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 4.8V8l2.2 1.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                  <div className="sol-float-t">{x.hl.title}</div>
                  <div className="sol-float-s">{x.hl.sub}</div>
                </motion.div>

                <motion.div className="sx-agent" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="sx-agent-av"><EviAgent size={56} ring="#fff" /></span>
                  <div className="sx-agent-b">
                    <span className="sx-agent-k">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9z" /></svg>
                      AI agent
                    </span>
                    <b>{x.agent.name}</b>
                    <p>{x.agent.task}</p>
                  </div>
                  <span className="sv-status" style={{ color: x.color, background: x.soft }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8.4l3 3 6-6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {x.agent.status}
                  </span>
                </motion.div>
              </FitStage>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
