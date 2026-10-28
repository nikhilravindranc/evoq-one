/* Application preview: the CRM interface, screen by screen. The screens are screenshots of the CRM app
   with sample data, and each description lists only what appears on that screen. */

import type { ReactNode } from "react";
import { Shot } from "./Shot";

const P = "#4747E0";
const DEEP = "#1A1190";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";

const SCREENS: { id: string; kicker: string; title: string; lead: string; screen: ReactNode; elements: [string, string][] }[] = [
  { id: "dashboard", kicker: "Screen 1", title: "Dashboard",
    lead: "The CRM overview summarises leads and deals for the period you choose.",
    screen: <Shot name="dashboard" alt="CRM dashboard with deals by status, average time to close, sales trend, forecast and funnel conversion" />,
    elements: [
      ["Total leads", "How many leads there are, and how many are converted or still open."],
      ["Deals by status", "Deal count and value at each stage."],
      ["Average time to close and sales trend", "How long won deals take, and leads and deals over time."],
      ["Forecast vs actual", "The weighted pipeline alongside what has been won."],
      ["Funnel conversion", "How many leads have converted, with the count at each lead status."],
    ] },
  { id: "pipeline", kicker: "Screen 2", title: "Deals pipeline",
    lead: "The Kanban view groups deals by stage so the state of the pipeline is visible at a glance.",
    screen: <Shot name="pipeline" alt="CRM Deals in Kanban view, grouped by stage, with deal cards" />,
    elements: [
      ["Views", "Switch between List, Grid and Kanban, and group the board by stage."],
      ["Stage columns", "Qualification, Demo/Making, Proposal/Quotation and onward, each with its deal count."],
      ["Deal cards", "Amount, deal owner, closing date and account name for each deal."],
      ["Stage selector", "Change a deal's stage from its card."],
    ] },
  { id: "deal", kicker: "Screen 3", title: "Deal record",
    lead: "A deal record shows where the deal stands and the numbers that matter at the top of the screen.",
    screen: <Shot name="deal-record" alt="CRM deal record with stage progress and key figures" />,
    elements: [
      ["Header and tabs", "The deal name, stage, record number and account, with Edit and Delete, and Overview and Timeline tabs."],
      ["Stage progress", "Where the deal is across Qualification to Won or Lost."],
      ["Key figures", "Amount, probability, expected revenue and closing date."],
      ["Deal summary", "Deal name, account name, amount and closing date at a glance."],
    ] },
];

const css = `
  .pv-note{display:flex;gap:12px;align-items:flex-start;padding:14px 18px;border-radius:14px;background:#FDF8EC;border:1px solid #F3E3B8;font-size:14px;line-height:1.6;color:#7A4A05;margin-bottom:44px}
  .pv-screen{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:40px;align-items:center;padding:42px 0;border-top:1px solid ${LINE}}
  .pv-screen:first-of-type{border-top:0;padding-top:0}
  .pv-screen.flip{grid-template-columns:minmax(0,1fr) minmax(0,1.7fr)}
  .pv-screen.flip .pv-art{order:2}
  .pv-art{min-width:0}
  
  .pv-k{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${P}}
  .pv-screen h2{margin:8px 0 0;font-size:32px;line-height:1.15;letter-spacing:-.02em;font-weight:700;color:${DEEP};font-family:var(--font-display),system-ui,sans-serif}
  .pv-lead{margin:14px 0 0;font-size:16.5px;line-height:1.7;color:${BODY}}
  .pv-el{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:12px}
  .pv-el li{display:grid;grid-template-columns:10px minmax(0,1fr);gap:12px;font-size:14.5px;line-height:1.6;color:${BODY}}
  .pv-el li::before{content:"";width:8px;height:8px;margin-top:8px;border-radius:50%;background:${P}}
  .pv-el b{color:${INK}}
  @media (max-width:980px){.pv-screen,.pv-screen.flip{grid-template-columns:1fr;gap:26px}.pv-screen.flip .pv-art{order:0}.pv-screen h2{font-size:26px}}
`;

export function CrmPreview() {
  return (
    <>
      <style>{css}</style>
      <div className="pv-note" data-rv="0">
        <span aria-hidden>ⓘ</span>
        <span>These are screenshots of the CRM app with sample data. Screens in your account may look different depending on your configuration.</span>
      </div>
      {SCREENS.map((s, i) => (
        <section key={s.id} id={s.id} className={`pv-screen${i % 2 ? " flip" : ""}`} data-rv="0">
          <div className="pv-art">{s.screen}</div>
          <div>
            <span className="pv-k">{s.kicker}</span>
            <h2>{s.title}</h2>
            <p className="pv-lead">{s.lead}</p>
            <ul className="pv-el">
              {s.elements.map(([k, v]) => <li key={k}><span><b>{k}.</b> {v}</span></li>)}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
