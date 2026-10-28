import type { ReactNode } from "react";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { Shot } from "./Shot";

/* Product walkthrough: how CRM works and which tasks it supports.
   Content follows the live CRM app (modules, stages, record layout). It explains product use;
   end-to-end processes live in the example scenarios and screens in the previews. */

const P = "#4747E0";
const DEEP = "#1A1190";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";

type Task = {
  id: string;
  nav: string;
  title: string;
  intro: string;
  steps: [string, string][];
  gets: string;
  screen?: ReactNode;
};

const TASKS: Task[] = [
  { id: "leads", nav: "Capture and organise leads", title: "Keep every prospect in one list",
    intro: "Leads are prospective customers before they become deals. Each one has an owner and a status.",
    steps: [
      ["Open Leads", "See every lead with counts by status: New, Contacted, Nurture, Qualified, Unqualified and Junk."],
      ["Choose a view", "Switch between List, Grid and Kanban."],
      ["Find what you need", "Search by name, company or email, then filter, sort, choose columns and save views."],
      ["Record the lead", "Capture name, company, email, phone, lead source, industry and lead owner."],
    ],
    gets: "Your team can see who owns each prospect and where each one stands.",
    screen: <Shot name="leads" alt="CRM Leads list with status counts, search, filters and a table of leads" /> },
  { id: "convert", nav: "Qualify and convert a lead", title: "Qualify a lead, then turn it into a deal",
    intro: "Open a lead to see its progress, its activity and everything recorded against it.",
    steps: [
      ["Set the lead status", "Move the lead along its stage progress as you learn more: New, Contacted, Nurture, Qualified, Unqualified or Junk."],
      ["Log what happens", "Add notes, comments, attachments and activities (tasks, calls and meetings) to the lead."],
      ["Review the timeline", "Use the Timeline tab to see the history of the record."],
      ["Convert to deal", "When the lead is ready, use Convert to deal to carry it into the pipeline."],
    ],
    gets: "Nothing is re-typed when a prospect becomes an opportunity.",
    screen: <Shot name="lead-record" alt="CRM lead record with stage progress, Convert to deal button and lead details" /> },
  { id: "pipeline", nav: "Move deals through the pipeline", title: "See where every deal stands",
    intro: "Deals are sales opportunities moving through the pipeline, grouped by stage.",
    steps: [
      ["See deals by stage", "Use List, Grid or Kanban. The Kanban view groups deals by stage and shows amount, owner, closing date and account."],
      ["Open a deal", "Stage progress runs Qualification, Demo/Making, Proposal/Quotation, Negotiation, Ready to Close, then Won or Lost."],
      ["Track the numbers", "Each deal shows its amount, probability, expected revenue and closing date."],
      ["Keep the next step clear", "Record the next step and lead source on the deal. Change its stage from the record or the Kanban card."],
    ],
    gets: "Everyone sees the same stage, value and expected close date.",
    screen: <Shot name="pipeline" alt="CRM Deals in Kanban view, grouped by stage, with deal cards" /> },
  { id: "deal", nav: "Add contacts, accounts and products", title: "Put the people and the pricing on the deal",
    intro: "A deal record gathers the people involved, what is being sold and the work around it.",
    steps: [
      ["Link the account", "Each deal belongs to an account. The Accounts list holds the organisation, its owner and website."],
      ["Add contacts", "Attach contacts from the Contacts list and mark the primary one. Contacts carry their title and account."],
      ["Add products", "Add product lines with quantity, rate and discount. The deal shows net and total."],
      ["Keep it together", "Notes, activities, comments and attachments sit on the same record."],
    ],
    gets: "The deal shows who is involved and what is being proposed.",
    screen: <Shot name="deal-products" alt="CRM deal record showing contacts, products and notes" /> },
  { id: "followup", nav: "Plan follow-ups", title: "Schedule the next touchpoint",
    intro: "Tasks, calls and meetings each have their own list, and they also appear on the lead or deal they belong to.",
    steps: [
      ["Create a task", "Give it a title, an owner and a due date. Statuses are Open, In Progress, Completed and Cancelled."],
      ["Schedule a call", "Set the subject, who it is assigned to and when it happens."],
      ["Schedule a meeting", "Set the subject and start time."],
      ["Check the record", "Open a lead or deal to see its tasks, calls and meetings under Activities."],
    ],
    gets: "Follow-ups are tied to the record they relate to.",
    screen: <Shot name="tasks" alt="CRM Tasks list with status counts, due dates and owners" /> },
  { id: "dashboard", nav: "Track progress", title: "Review progress on the dashboard and in reports",
    intro: "The CRM overview summarises leads and deals for a period you choose.",
    steps: [
      ["Choose a period", "Show all time or a narrower period."],
      ["Read the widgets", "Total leads, deals by status, average time to close, sales trend, forecast versus actual, funnel conversion, deals by stage and lost deal reasons."],
      ["Spot the gaps", "Funnel conversion and lost deal reasons show where leads and deals drop off."],
      ["Create a report", "Use Reports to build and organise reports by collection, such as accounts or tasks."],
    ],
    gets: "Managers see progress without compiling it by hand.",
    screen: <Shot name="dashboard" alt="CRM dashboard with deals by status, forecast and funnel conversion" /> },
];

const css = `
  .wk{display:grid;grid-template-columns:260px minmax(0,1fr);gap:56px;align-items:start}
  .wk-nav{position:sticky;top:96px;display:grid;gap:4px}
  .wk-nav p{margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${BODY}}
  .wk-nav a{display:flex;gap:10px;align-items:baseline;padding:9px 12px;border-radius:10px;font-size:14.5px;font-weight:600;color:${INK};text-decoration:none}
  .wk-nav a span{font-size:12px;color:${P};font-weight:700}
  .wk-nav a:hover{background:#F2F2FF}
  .wk-task{scroll-margin-top:96px;padding:0 0 56px;margin-bottom:56px;border-bottom:1px solid ${LINE}}
  .wk-task:last-of-type{border-bottom:0;margin-bottom:0}
  .wk-n{font-size:13px;font-weight:700;letter-spacing:.14em;color:${P}}
  .wk-task h2{margin:8px 0 0;font-size:32px;line-height:1.15;letter-spacing:-.02em;font-weight:700;color:${DEEP};font-family:var(--font-display),system-ui,sans-serif}
  .wk-task>p{margin:14px 0 0;font-size:16.5px;line-height:1.7;color:${BODY};max-width:60ch}
  .wk-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:26px;margin-top:26px}
  .wk-grid.solo{grid-template-columns:minmax(0,1fr)}
  .wk-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;counter-reset:s}
  .wk-steps li{position:relative;padding:16px 18px 16px 58px;border-radius:14px;border:1px solid ${LINE};background:#fff;counter-increment:s}
  .wk-steps li::before{content:counter(s);position:absolute;left:18px;top:16px;width:28px;height:28px;border-radius:50%;background:#EEEDFF;color:#3A3AC9;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .wk-steps b{display:block;font-size:15.5px;color:${INK}}
  .wk-steps span{display:block;margin-top:3px;font-size:14px;line-height:1.6;color:${BODY}}
  .wk-gets{margin-top:18px;padding:14px 18px;border-radius:12px;background:#F6F5FF;font-size:14.5px;line-height:1.6;color:${INK}}
  .wk-gets b{color:#3A3AC9}
  .wk-screen{min-width:0;max-width:880px}
  .wk-aside{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:8px}
  .wk-box{padding:24px;border-radius:18px;border:1px solid ${LINE};background:#fff}
  .wk-box h3{margin:0;font-size:18px;color:${INK}}
  .wk-box p{margin:10px 0 0;font-size:14.5px;line-height:1.7;color:${BODY}}
  .wk-works{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
  .wk-works a{display:inline-flex;align-items:center;gap:8px;padding:7px 14px 7px 8px;border-radius:999px;border:1px solid ${LINE};font-size:14px;font-weight:600;color:${INK};text-decoration:none}
  .wk-works a:hover{border-color:#C9C6FF}
  @media (max-width:980px){.wk-steps{grid-template-columns:1fr}.wk{grid-template-columns:1fr;gap:28px}.wk-nav{position:static;grid-template-columns:repeat(2,minmax(0,1fr))}.wk-nav p{grid-column:1/-1}.wk-grid{grid-template-columns:1fr}.wk-aside{grid-template-columns:1fr}}
  @media (max-width:560px){.wk-nav{grid-template-columns:1fr}.wk-task h2{font-size:26px}}
`;

export function CrmWalkthrough() {
  return (
    <>
      <style>{css}</style>
      <div className="wk">
        <nav className="wk-nav" aria-label="Tasks in this walkthrough">
          <p>Tasks covered</p>
          {TASKS.map((t, i) => <a key={t.id} href={`#${t.id}`}><span>{String(i + 1).padStart(2, "0")}</span>{t.nav}</a>)}
        </nav>

        <div>
          {TASKS.map((t, i) => (
            <section key={t.id} id={t.id} className="wk-task" data-rv="0">
              <span className="wk-n">TASK {String(i + 1).padStart(2, "0")}</span>
              <h2>{t.title}</h2>
              <p>{t.intro}</p>
              <div className={t.screen ? "wk-grid" : "wk-grid solo"}>
                <div>
                  <ol className="wk-steps">
                    {t.steps.map(([name, text]) => <li key={name}><b>{name}</b><span>{text}</span></li>)}
                  </ol>
                  <div className="wk-gets"><b>What you get: </b>{t.gets}</div>
                </div>
                {t.screen && <div className="wk-screen">{t.screen}</div>}
              </div>
            </section>
          ))}

          <div className="wk-aside" data-rv="0">
            <div className="wk-box">
              <h3>Works with other EVOQ applications</h3>
              <p>These EVOQ applications can be used together with CRM.</p>
              <div className="wk-works">
                {[["campaigns", "Campaigns"], ["billing", "Billing"], ["desk", "Desk"]].map(([k, n]) => (
                  <a key={k} href={`/products/${k}`}><ProductBadge productKey={k} size={24} />{n}</a>
                ))}
              </div>
            </div>
            <div className="wk-box">
              <h3>Where EVI and agents help</h3>
              <p>EVI, the EVOQ AI assistant, can help your team find information and prepare next steps, and AI agents can prepare defined tasks for your review. What is available in CRM depends on your configuration.</p>
              <p><a href="/products/ai" style={{ color: P, fontWeight: 600, textDecoration: "none" }}>About EVOQ AI →</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
