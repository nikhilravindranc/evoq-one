"use client";

import { useEffect, useState } from "react";
import { Ic } from "./icons";
import { DEEP, INK, LINE, MUTED, NEUTRAL, PRIMARY, TINT } from "./palette";
import { DemoButton, SO_BASE, ServiceOpsShell } from "./ServiceOpsShell";

/* ServiceOps, Features. Everything in the app today, by area, from the ServiceOps features list. Each line says what
   you can do. Anything that is partial, planned, runs on the demo AI or needs setup says so on the line, so the page
   is as plain about limits as it is about features. */

export type Status = "partial" | "planned" | "demo" | "setup";
export type F = { n: string; d: string; s?: Status; note?: string };
type Area = { id: string; k: string; title: string; lead: string; items: F[] };

export const CHIP: Record<Status, string> = { partial: "Partial", planned: "Planned", demo: "Demo AI", setup: "Needs setup" };

export const AREAS: Area[] = [
  {
    id: "work", k: "Work", title: "From request to finished job.",
    lead: "Requests, work orders, estimates, dispatch and jobs, in the order a job moves.",
    items: [
      { n: "Requests inbox", d: "Every customer ask lands here, whether it came by phone, email, the web form, online booking, the customer portal or a technician. Statuses are New, Reviewing, Converted and Declined." },
      { n: "Requests Pipeline view", d: "The same requests as columns by stage, following your search and filters." },
      { n: "Request quick view", d: "A slide-in card with a stage strip, a Worth knowing list from fixed rules, the full text and next-step buttons." },
      { n: "Draft from notes", d: "Turns pasted email or call notes into a draft request for you to check.", s: "demo" },
      { n: "Email intake", d: "Incoming email can become a draft request that waits for a person to accept or dismiss it.", s: "setup", note: "Needs a webhook secret in production." },
      { n: "Work orders", d: "Approval, estimate, scheduling and history in a record, with status counts." },
      { n: "Estimates", d: "Build from the catalog, add an optional internal approval, send a private link, and the customer approves or declines." },
      { n: "Workflows and approvals", d: "Stages, conditions and approval rules for each work type, set by managers." },
      { n: "Dispatch", d: "Queue, schedule, workload, timeline and map views, with ranked technicians explained in plain words." },
      { n: "Optimize the day", d: "Proposes a day's assignments and says what it held back and why. Nothing is booked until you apply it." },
      { n: "Work type and trade", d: "Every request, work order and job carries two labels. Work type is the kind of work (Installation, Service, Maintenance, Repair or Inspection) and decides the workflow. Trade is the team, such as HVAC or Electrical." },
      { n: "Workflow card on jobs", d: "A job shows the workflow for its work type: the stages, what comes next and the details answered on the work order." },
      { n: "Add on the spot", d: "A missing customer, contact or piece of equipment can be added from the new request, work order, asset or job form with just a name." },
      { n: "Choose columns", d: "A Columns menu on Work orders, Requests, Customers and Assets shows or hides columns, kept on each device." },
      { n: "Jobs", d: "A page for each visit: services and parts, time sheet, costing, trip sheet, attachments and history. Edit and clone." },
      { n: "Failed visit follow-up", d: "Visits that could not be finished are listed for a decision." },
      { n: "Service plans (Gold and Silver)", d: "Shows maintenance due in 30, 60 or 90 days and raises the work orders." },
    ],
  },
  {
    id: "field", k: "Field", title: "The field and technicians.",
    lead: "A phone friendly screen for the person on site.",
    items: [
      { n: "Technician app", d: "Today's jobs, directions, call, start work, checklist, photos, parts used and notes." },
      { n: "Required checklist steps", d: "Steps marked required cannot be skipped." },
      { n: "Customer sign-off options", d: "The customer signs, another person signs, the customer refuses with a reason, or nobody is on site with a reason." },
      { n: "Problem buttons", d: "I can't finish this visit, Stop work unsafe (flags the job and tells managers until it is cleared) and Request extra work." },
      { n: "Works offline", d: "The technician screens keep working with poor signal and sync later. A corner indicator shows the state." },
      { n: "Share my location", d: "Optional live location for dispatch. It stops when turned off, when the job finishes or outside working hours." },
      { n: "Timesheets", d: "Clock in and out, and see the hours worked." },
      { n: "Troubleshooting chat", d: "On the job screen: next checks, parts to check and safety points. It never gives part numbers or prices.", s: "demo" },
      { n: "Hands-free checklist", d: "The phone reads each step and you answer by voice: done, next, skip, repeat, back, note, photo, problem or stop.", s: "partial", note: "Depends on the phone's speech support." },
      { n: "Nameplate scan", d: "Reads an equipment data plate from a photo, and you check every value before saving.", s: "partial", note: "Live reading needs an AI key. Without a key, the demo shows an example only." },
      { n: "Remote video expert", d: "Connect a technician to a remote expert on video.", s: "planned", note: "A scripted demo with sample data is in the AI hub." },
    ],
  },
  {
    id: "records", k: "Records", title: "Customers, equipment and stock.",
    lead: "The records a job draws on.",
    items: [
      { n: "Customers", d: "Contacts, sites, work, assets, balance and status, with filters." },
      { n: "Log a call", d: "Notes or a voice note transcript become a summary, decisions and follow-up tasks that you confirm.", s: "demo" },
      { n: "Assets", d: "Equipment records with status, warranty, next service and history." },
      { n: "Inventory", d: "On hand, reserved, van stock, parts short for upcoming jobs, part requests and returns." },
      { n: "Catalog", d: "Priced services and products used on estimates, work orders and invoices." },
      { n: "CSV import", d: "Bring in customers, assets and parts." },
    ],
  },
  {
    id: "money", k: "Money", title: "Billing, reports and profitability.",
    lead: "What is ready to invoice, what is out, and what each job earned.",
    items: [
      { n: "Billing", d: "Ready to invoice, work in progress, outstanding, overdue, collected and estimates out. Invoices, credit notes and void (managers only).", note: "Some payment and accounting tasks sit in the linked EVOQ Billing product." },
      { n: "Customer message draft", d: "A friendly reminder, follow-up or apology from your own template, for you to check and send.", s: "demo" },
      { n: "Customer payment link", d: "A private page for a customer to view and pay an invoice." },
      { n: "Review link and reply draft", d: "A short page for a customer to rate a visit. Draft reply writes a public reply that you copy. It is never posted anywhere.", s: "demo" },
      { n: "Insights and Reports", d: "What is earning, stuck and coming, weekly manager reports and CSV export." },
      { n: "Ask a question", d: "Type a business question and ServiceOps works out the numbers from your records.", s: "demo", note: "The demo AI picks the measure." },
      { n: "Profitability", d: "Margin by job, customer, trade, work type, technician and plan, with leaks, flagged jobs, settings and CSV export." },
      { n: "Explain this", d: "Says in plain words what drives margin, with ideas. It never ranks or judges people.", s: "demo" },
      { n: "Job costing tab", d: "Book labour, part and other costs on a job and see its margin." },
    ],
  },
  {
    id: "ai", k: "AI", title: "AI and EVI.",
    lead: "AI helpers draft and agents list. A person confirms.",
    items: [
      { n: "EVI assistant", d: "A panel on every signed in screen (a button, the top bar, Ctrl or Cmd+J, or the bar at the bottom of wide screens). It answers from your records and shows only what your role may open." },
      { n: "Ranked what needs attention", d: "Most urgent first, each line opens its screen, with buttons to run the matching agent." },
      { n: "Run an agent from EVI", d: "Say run the collections agent and it opens and runs." },
      { n: "AI hub", d: "A page for status, usage, agents, helpers, schedules and planned items." },
      { n: "Six agents", d: "Dispatch, Intake, Collections, Quote follow-up, Risk flags and Coaching. Fixed rules list what needs a person, and agents never act on their own." },
      { n: "Approve, dismiss and Ask why", d: "Record that you accept or hide a finding, and ask five plain questions about why it appeared." },
      { n: "Schedules in a click", d: "Four automatic alerts (new request, unanswered estimates, overdue invoices, job completed) and a recommended three starter pack. They only tell a manager." },
      { n: "Bring your own model", d: "Connect Claude, a free hosted model (Groq, Google Gemini or OpenRouter) or a local model (Ollama) with three server settings. The AI hub shows what is answering and has a Test connection button.", s: "partial", note: "Tested against a stand-in service, not yet against a live provider." },
      { n: "Company AI switch and limits", d: "Off by default. Managers set daily and hourly limits." },
      { n: "Privacy protections", d: "Contact details are replaced by placeholders before leaving the server, prices and part numbers never come from AI, and every use is recorded." },
      { n: "Web chat receptionist", d: "On the public booking page, EVI collects the details and sends a request to verify. It never confirms a time or a price.", s: "partial", note: "Web chat only." },
      { n: "Agents on a timer", d: "Run agents automatically on the server each day.", s: "planned" },
      { n: "Switch and usage for each helper", d: "Turn each AI helper on or off and see its own usage.", s: "planned" },
      { n: "Phone and SMS receptionist", d: "Answer calls and texts and book visits.", s: "planned", note: "A demo with sample calls and a live text simulator is in the AI hub." },
      { n: "Review import and posting", d: "Bring in reviews from a review site and post approved replies.", s: "planned", note: "A demo with sample reviews is in the AI hub." },
    ],
  },
  {
    id: "customers", k: "Customers", title: "What customers see.",
    lead: "No account needed.",
    items: [
      { n: "Online booking page", d: "A public page where customers request service, at /book/your-address." },
      { n: "Estimate approval link", d: "A private page to approve or decline an estimate." },
      { n: "Payment link", d: "A private page to view and pay an invoice." },
      { n: "Review page", d: "A private page to rate a visit." },
      { n: "Customer portal", d: "Customers with access can send a new request.", s: "partial" },
    ],
  },
  {
    id: "automation", k: "Automation", title: "Automation and notifications.",
    lead: "Rules that run on the server, and messages that land where people look.",
    items: [
      { n: "Automation rules", d: "Plain sentence rules that remind, follow up, escalate, change priority or archive untouched requests, run on the server." },
      { n: "Run now with a dry run", d: "See exactly what would happen before anything is sent." },
      { n: "Run log and health strip", d: "A detailed log plus a short Healthy, Watch or Needs a look summary." },
      { n: "Events", d: "Rules can react at once to a new request, a completed job, a customer answering an estimate or a technician stopping work." },
      { n: "Bell inbox", d: "In-app messages for your role with an unread count, each opening the screen it is about." },
      { n: "Delivery log", d: "Every customer message sent or recorded." },
      { n: "Email, SMS and WhatsApp channels", d: "Email works. SMS and WhatsApp are recorded in a test log until a provider is connected.", s: "partial" },
    ],
  },
  {
    id: "look", k: "Look and feel", title: "Look, feel and finding things.",
    lead: "Layouts, themes and shortcuts that people choose for themselves.",
    items: [
      { n: "Four layouts", d: "Classic, Compact, Clean (a widget Home you can customize) and Minimal (a quiet column). Saved on each device." },
      { n: "Colour themes and banner", d: "A company colour theme and a Home banner, with dark mode." },
      { n: "Colour-block status", d: "In Clean and Minimal, request status shows as a solid colour block." },
      { n: "Customize Home page", d: "Managers build Home dashboards from 13 widgets and assign it to everyone or to a single role." },
      { n: "Home picker", d: "Everyone can choose the standard Home or any dashboard that is switched on, from a small picker on Home." },
      { n: "Text colour that follows the theme", d: "Text on coloured buttons turns white or dark automatically, so it stays readable on any theme." },
      { n: "Wide-screen top bar", d: "Search on the left, then Ask EVI and Create, then status, theme, favorites, messages and account." },
      { n: "Settings pinned in the menu", d: "Settings stays at the bottom of the menu. Users and Integrations are inside Settings." },
      { n: "Modules", d: "Managers rename, reorder and switch off menu items. A switched-off module shows a notice instead of its page." },
      { n: "Custom fields", d: "Managers add their own fields (text, number, date, choice list, yes or no, phone, email, web address) to Requests, Customers and Assets." },
      { n: "Global search", d: "Find customers, jobs, work orders, assets and invoices by number or name with Ctrl or Cmd+K." },
      { n: "Favorites and Recently visited", d: "Star a screen to pin it in the menu and on Home, and see your last screens as tiles on the Clean Home. Kept on this device." },
      { n: "Feature demos", d: "A preview of the planned features with sample data, opened from the Demo only cards in the AI hub. Nothing is connected or saved to your records." },
      { n: "Help centre", d: "In-app help with search, area filters and a for my role filter, plus the written guide." },
      { n: "Accessibility", d: "Keyboard use, skip links, labelled controls and tested colour contrast." },
    ],
  },
  {
    id: "setup", k: "Setup", title: "Setup and control.",
    lead: "Who can do what, and how ServiceOps is set up.",
    items: [
      { n: "Roles and permissions", d: "Administrator, Service manager, Dispatcher, Service coordinator and Technician, each seeing only its screens, enforced on the server too." },
      { n: "Users and invites", d: "Invite people by email and set their role (administrators). Found in Settings." },
      { n: "Settings", d: "Company details, hours, numbering, payments, service types, statuses, priorities, SLA, workflows, certifications, dispatch rules, zones, teams, notifications and templates." },
      { n: "Certifications", d: "Who is qualified for what, with expiry flags." },
      { n: "Activity log", d: "Who changed what, and when." },
      { n: "Integrations", d: "Shows connected systems. Found in Settings." },
      { n: "Sample data and reset", d: "Practice data, replaceable by an administrator after a confirmation." },
    ],
  },
];

export const ROLES: [string, string, string][] = [
  ["Administrator", "Everything, including users and integrations.", "Users, Integrations, Settings"],
  ["Service manager", "All work, billing, insights and settings.", "Insights, Profitability, Billing"],
  ["Dispatcher", "Requests, scheduling, dispatch and jobs.", "Dispatch, Requests, Jobs"],
  ["Service coordinator", "Requests, customers, estimates and billing.", "Requests, Customers, Estimates"],
  ["Technician", "Own jobs, work orders, assets and timesheet.", "My jobs, Assets, Timesheets"],
];

export const NOT_YET = [
  "Agents that run automatically each day on the server.",
  "A switch and a usage count for each AI helper.",
  "Phone and SMS receptionist, and a WhatsApp and Telegram assistant.",
  "A remote video expert.",
  "Review import from review sites and automatic posting.",
  "Grouped, collapsible tables and Pipeline, Gantt or Calendar views on screens other than Requests.",
  "Email follow-up sequences with open and reply rates.",
  "Meeting recording and notes.",
];

const all = AREAS.flatMap((a) => a.items);
const count = { avail: all.filter((f) => !f.s || f.s === "demo" || f.s === "setup").length, partial: all.filter((f) => f.s === "partial").length, planned: all.filter((f) => f.s === "planned").length };

const Chip = ({ s }: { s: Status }) => <em className={`sf-chip ${s}`}>{CHIP[s]}</em>;

function Row({ f }: { f: F }) {
  return (
    <div className="sf-row">
      <div className="sf-row-h"><b>{f.n}</b>{f.s && <Chip s={f.s} />}</div>
      <p>{f.d}{f.note && <span className="sf-note"> {f.note}</span>}</p>
    </div>
  );
}

/* "On this page": the area that is in view on the right is the one lit on the left. */
function Toc() {
  const ids = [...AREAS.map((a) => a.id), "not-yet"];
  const [on, setOn] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.38;
      let cur = els[0]?.id ?? ids[0];
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id;
      setOn((p) => (p === cur ? p : cur));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const items = [...AREAS.map((a, n) => ({ id: a.id, k: a.k, n: String(n + 1).padStart(2, "0") })), { id: "not-yet", k: "Not available yet", n: "10" }];
  return (
    <nav className="sf-toc" aria-label="Features by area">
      <span className="sf-toc-k">On this page</span>
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={it.id === on ? "on" : ""} aria-current={it.id === on ? "true" : undefined}>
          <i>{it.n}</i>{it.k}
        </a>
      ))}
    </nav>
  );
}

export function ServiceOpsFeatures({ base = SO_BASE }: { base?: string }) {
  return (
    <ServiceOpsShell
      base={base}
      page="features"
      hero={
        <div className="so-hd-in sf-hero">
          <div>
            <span className="so-label">ServiceOps · Features</span>
            <h1 className="sf-h1">What ServiceOps does today.</h1>
            <p className="so-lead">The features in the app now, by area. Each line says what you can do, and anything partial or planned says so.</p>
            <p className="sf-sub">AI features run on a built-in demo model with clearly labelled sample answers until a live AI model is connected.</p>
            <div className="so-ctas">
              <DemoButton location="features_hero" />
              <a href={base} className="so-btn secondary">Explore ServiceOps</a>
            </div>
          </div>
          <div className="sf-key">
            <span className="sf-blob" aria-hidden />
            <div className="sf-keycard">
              <span className="sf-keyk">Status key</span>
              <div className="sf-kr"><b>{count.avail}</b><span><em className="sf-chip ok">Available</em><small>Works today. Demo AI and Needs setup are marked on the line.</small></span></div>
              <div className="sf-kr"><b>{count.partial}</b><span><em className="sf-chip partial">Partial</em><small>Works with a stated limit.</small></span></div>
              <div className="sf-kr"><b>{count.planned}</b><span><em className="sf-chip planned">Planned</em><small>Not built yet.</small></span></div>
            </div>
          </div>
        </div>
      }
    >
      <style>{css}</style>

      {/* who can open what */}
      <section className="so-out so-sec so-white" id="roles" style={{ paddingBottom: 72 }}>
        <div className="so-in">
          <div className="so-head c wide" data-rv="0">
            <span className="so-label">Roles</span>
            <h2 className="so-h2">Who can open what.</h2>
            <p className="so-lead">ServiceOps has five roles, set by an administrator. Each person sees the screens their role includes.</p>
          </div>
          <div className="sf-roles" data-rv="1">
            {ROLES.map(([n, d, s]) => (
              <div key={n} className="sf-role">
                <h3>{n}</h3>
                <p>{d}</p>
                <small>{s}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the catalogue */}
      <section className="so-out so-sec so-band" id="catalogue" style={{ paddingTop: 80 }}>
        <div className="so-in sf-layout">
          <Toc />
          <div className="sf-main">
            {AREAS.map((a, n) => (
              <section key={a.id} id={a.id} className="sf-area" data-rv="0">
                <div className="sf-area-h">
                  <span className="sf-num">{String(n + 1).padStart(2, "0")}</span>
                  <div><h2 className="so-h2">{a.title}</h2><p>{a.lead}</p></div>
                </div>
                <div className="sf-rows">{a.items.map((f) => <Row key={f.n} f={f} />)}</div>
              </section>
            ))}
            <section id="not-yet" className="sf-area" data-rv="0">
              <div className="sf-area-h">
                <span className="sf-num">10</span>
                <div><h2 className="so-h2">Not available yet.</h2><p>These are not built, so they are not part of what ServiceOps does today.</p></div>
              </div>
              <ul className="sf-not">{NOT_YET.map((t) => <li key={t}>{Ic.clock}<span>{t}</span></li>)}</ul>
            </section>
          </div>
        </div>
      </section>

      {/* final call to action */}
      <section className="so-close" style={{ paddingTop: 104 }}>
        <div className="so-close-in" data-rv="0">
          <span className="so-cs ring" aria-hidden /><span className="so-cs dots" aria-hidden /><span className="so-cs sun" aria-hidden />
          <div className="so-close-c">
            <h2 className="so-h2">See these features with your own jobs.</h2>
            <p className="so-lead">Tell us how requests, dispatch and invoices run today, and we will walk through ServiceOps in a demo.</p>
            <div className="so-ctas"><DemoButton location="features_close" /><a href={base} className="so-btn secondary">Explore ServiceOps</a></div>
          </div>
        </div>
      </section>
    </ServiceOpsShell>
  );
}

const css = `
  .sf-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding:56px 0 84px}
  .sf-h1{font-size:52px;line-height:1.06;letter-spacing:-.028em;margin:16px 0 0!important;text-wrap:balance}
  .sf-sub{margin:14px 0 0;font-size:15.5px;line-height:1.6;color:${NEUTRAL};max-width:58ch}
  .sf-key{position:relative;padding:40px 0 40px 34px}
  .sf-blob{position:absolute;right:0;top:0;bottom:0;left:16%;border-radius:200px 36px 36px 36px;background:#FCE9B4}
  .sf-keycard{position:relative;display:grid;gap:14px;max-width:440px;margin-left:auto;margin-right:8%;padding:24px;border-radius:24px;background:#fff;box-shadow:0 34px 60px -30px rgba(42,27,12,.55),0 0 0 1px rgba(42,27,12,.07)}
  .sf-keyk{font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY}}
  .sf-kr{display:grid;grid-template-columns:64px minmax(0,1fr);gap:14px;align-items:center;padding-top:14px;border-top:1px solid ${LINE}}
  .sf-kr:first-of-type{border-top:0;padding-top:0}
  .sf-kr>b{font-family:var(--font-display),system-ui,sans-serif;font-size:36px;line-height:1;color:${DEEP}}
  .sf-kr span{display:grid;gap:4px;justify-items:start}.sf-kr small{font-size:13px;line-height:1.45;color:${MUTED}}
  .sf-chip{display:inline-flex;align-items:center;padding:2px 9px;border-radius:999px;font-style:normal;font-size:11.5px;font-weight:700;letter-spacing:.02em;white-space:nowrap}
  .sf-chip.ok{background:rgba(22,138,74,.12);color:#168A4A}
  .sf-chip.partial{background:rgba(217,119,6,.16);color:#92400E}
  .sf-chip.planned{background:rgba(124,106,82,.16);color:#5E4D38}
  .sf-chip.demo{background:${TINT};color:#78350F}
  .sf-chip.setup{background:rgba(194,65,12,.12);color:#C2410C}

  .sf-roles{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:28px}
  .sf-role{padding-top:18px;border-top:2px solid ${DEEP};display:grid;gap:6px;align-content:start}
  .sf-role h3{font-size:19px}
  .sf-role p{margin:0;font-size:15px;line-height:1.5;color:${MUTED}}
  .sf-role small{font-size:13px;font-weight:600;color:${PRIMARY}}

  .sf-layout{display:grid;grid-template-columns:230px minmax(0,1fr);gap:64px;align-items:start}
  .sf-toc{position:sticky;top:84px;display:grid;gap:2px}
  .sf-toc-k{margin-bottom:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${NEUTRAL}}
  .sf-toc a{display:flex;align-items:center;gap:12px;padding:9px 12px;border-radius:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:500;color:${MUTED};text-decoration:none;transition:background .15s ease,color .15s ease}
  .sf-toc a i{font-style:normal;font-size:11.5px;font-weight:700;color:${PRIMARY};min-width:18px}
  .sf-toc a{position:relative}
  .sf-toc a i{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:transparent;transition:background .25s ease,color .25s ease}
  .sf-toc a:hover{background:#fff;color:${DEEP}}
  .sf-toc a.on{background:#fff;color:${DEEP};font-weight:600;box-shadow:0 10px 24px -16px rgba(42,27,12,.5),0 0 0 1px ${LINE}}
  .sf-toc a.on i{background:${PRIMARY};color:#fff}
  .sf-toc a.on::before{content:"";position:absolute;left:-14px;top:9px;bottom:9px;width:3px;border-radius:2px;background:${PRIMARY}}
  .sf-main{display:grid;gap:84px}
  .sf-area{scroll-margin-top:84px}
  .sf-area-h{display:grid;grid-template-columns:56px minmax(0,1fr);gap:20px;align-items:start;margin-bottom:28px}
  .sf-num{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:${PRIMARY};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600}
  .sf-area-h .so-h2{font-size:32px}
  .sf-area-h p{margin:8px 0 0;font-size:16.5px;color:${MUTED}}
  .sf-rows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 44px}
  .sf-row{padding:16px 0;border-top:1px solid ${LINE}}
  .sf-row-h{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .sf-row b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:600;color:${DEEP}}
  .sf-row p{margin:4px 0 0;font-size:15px;line-height:1.55;color:${MUTED}}
  .sf-note{display:inline;color:${INK};font-weight:500}
  .sf-not{list-style:none;margin:0;padding:0;display:grid}
  .sf-not li{display:flex;gap:12px;align-items:flex-start;padding:14px 0;border-top:1px solid ${LINE};font-size:15.5px;color:${INK}}
  .sf-not li:last-child{border-bottom:1px solid ${LINE}}
  .sf-not svg{width:17px;height:17px;color:${NEUTRAL};flex-shrink:0;margin-top:4px}

  @media (max-width:1100px){.sf-roles{grid-template-columns:repeat(3,minmax(0,1fr))}.sf-layout{grid-template-columns:minmax(0,1fr)}.sf-toc{display:none}}
  @media (max-width:980px){
    .sf-hero{grid-template-columns:minmax(0,1fr);gap:40px;padding:36px 0 56px}.sf-h1{font-size:40px}
    .sf-rows{grid-template-columns:minmax(0,1fr)}
  }
  @media (max-width:640px){
    .sf-h1{font-size:34px}
    .sf-key{padding:24px 0 24px 12px}.sf-keycard{margin-right:0;padding:18px}
    .sf-roles{grid-template-columns:minmax(0,1fr)}
    .sf-area-h{grid-template-columns:44px minmax(0,1fr);gap:14px}.sf-num{width:40px;height:40px}.sf-area-h .so-h2{font-size:25px}
  }
`;

