"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { APPS, C, CAT_LABEL, CATS, IMG } from "./data";
import { Closing, Demo, Mark, SyncShell } from "./Shell";
import { Faq, Label, Shot, sharedCss } from "./SyncV1";
import { VIS } from "./Visuals";

/* EVOQ Sync v1 features. Every area and item is taken from the EVOQ Sync Product Guide (12 Nov 2026); the screens are
   captures of the app's seeded demo workspace. */

type Area = { id: string; k: string; t: string; p: string; shot: string; alt: string; pos?: string; ratio?: string; items: [string, string][]; extra?: "catalog" | "wizard" | "nodes" | "policy" };

const AREAS: Area[] = [
  {
    id: "overview", k: "Dashboard", t: "Is everything fine, and if not, what needs you?", shot: "03-dashboard", alt: "Overview dashboard with status cards, EVI prompt box and attention queue",
    p: "The Overview opens on status cards, a ranked attention queue and the EVI prompt box. Date range and application filters apply to the whole page.",
    items: [
      ["Status cards", "Total integrations, active, records processed, success rate, failed executions and attention required. Each card opens the list behind it."],
      ["Execution activity", "Succeeded, partial and failed runs over the last 7 days or the range you choose."],
      ["Attention queue", "Expired credentials, failed records, delayed runs and approvals waiting, each linked to the screen that fixes it."],
      ["EVI prompt box", "Describe an integration in a sentence, or start with a template, from scratch, or by connecting an app."],
    ],
  },
  {
    id: "connections", k: "Connections", t: "Sign in to each app once. See who depends on it.", shot: "04-connections", alt: "My connections with status, last used and dependants",
    p: "A connection is a saved, authorized login to an application, so integrations can read and write its data.",
    items: [
      ["My connections", "Status (Connected, Attention, Expired), last used time and how many integrations depend on each connection."],
      ["Application catalog", "32 apps with their logos, grouped by category, with the data objects each supports and how it signs in: OAuth 2.0, API key or token."],
      ["Custom API connection", "For anything not listed: configure a REST API with base URL, authentication and a test call."],
      ["Connection alerts", "Expiring or failed logins, with a direct link to reauthorize."],
    ],
    extra: "catalog",
  },
  {
    id: "integrations", k: "Integrations", t: "Everything you have built, with its health.", shot: "08-integration-detail", alt: "Integration detail with attention banner, health panel and EVI actions",
    p: "Filter by status (Active, Drafts, Paused, Failed, Attention required), search by name, and open, edit, test, pause or archive from the row.",
    items: [
      ["Overview", "Purpose, apps, direction, health summary, recent executions and EVI shortcuts: Explain, Summarize health, Diagnose the latest issue."],
      ["Configuration", "General settings, connections used, data objects, direction and conflict policy."],
      ["Workflow", "The integration's workflow, with a link to open it in the Builder."],
      ["Executions and logs", "Every run with outcome, duration, records and trigger, plus logs for every record in the selected run."],
      ["Settings", "Notifications, retry policy and archive."],
    ],
  },
  {
    id: "wizard", k: "Guided wizard", t: "Ten steps from blank to live, and you can click back through any of them.", shot: "07-wizard", alt: "Create Integration with template and from scratch options", ratio: "16 / 4.6",
    p: "Create Integration offers three ways in: start with a template, create from scratch, or describe it to EVI. Expert assisted implementation is available for custom connectors and unusual requirements.",
    items: [],
    extra: "wizard",
  },
  {
    id: "mapping", k: "Data mapping", t: "Pair the fields, see the result before anything runs.", shot: "09-mapping", alt: "Data Mapping with field pairs, transformations and validation", pos: "55% 0%",
    p: "Data Mapping pairs fields between source and destination, flags what is missing and previews the effect.",
    items: [
      ["Field mappings", "Source field, destination field, mapping type (direct, transformed, default value) and validation for each pair."],
      ["Both directions", "A direction toggle per field. Fields synced both ways show a conflict policy so the app knows which side wins."],
      ["Required fields", "Unmapped required destination fields are flagged before you test."],
      ["Transformations", "Formatting, lookups such as country names to ISO codes, and defaults, each with sample input and output."],
      ["Preview", "A sample record before and after mapping."],
      ["EVI suggestions", "Suggest Mapping and Suggest Transformation with a confidence score. Applied only when you accept them."],
    ],
  },
  {
    id: "builder", k: "Workflow Builder", t: "A canvas for the steps an integration runs.", shot: "10-builder", alt: "Workflow Builder canvas with node library and run controls", pos: "60% 50%",
    p: "Drag nodes, connect ports, and click + on a connection to insert a step between two nodes. A minimap and zoom help on large workflows.",
    items: [
      ["Node panel", "Plain language descriptions and validation. Guarded steps, such as deleting records, require the Administrator role."],
      ["Tabs", "Build, Run history, Connections, Scripts and Audit log."],
      ["Run Test and Enabled", "Run Test simulates the workflow on sample data and lights up each node with its outcome. The Enabled switch turns it on."],
      ["Describe it", "Ask EVI for a workflow in a sentence and review the sample workflow it prepares."],
    ],
    extra: "nodes",
  },
  {
    id: "monitoring", k: "Monitoring", t: "What actually happened, and what to do about it.", shot: "14-execution-detail", alt: "Execution detail with failing step, error, likely cause and suggested fix",
    p: "Every execution with integration, trigger, start time, duration, records processed and outcome. Filter by range, app, workflow, trigger or status.",
    items: [
      ["Execution detail", "The workflow path with each step's outcome and timing, and the application response in a code block."],
      ["Likely cause and fix", "The cause, labelled as inferred, a suggested corrective action, retry eligibility and the auto retry policy."],
      ["Error queue", "Failed records grouped by cause, with counts, so a single fix clears many records."],
      ["Record logs", "Sanitized input and output for every record in the run."],
    ],
  },
  {
    id: "reports", k: "Reports", t: "Executions turned into trends and answers.", shot: "13-reports-reliability", alt: "Reports reliability view with outcomes and recurring error categories",
    p: "Six views, each exportable to CSV, plus a Recommendations view you can accept or dismiss.",
    items: [
      ["Execution activity", "Runs over time, by integration and trigger, with success rate and average duration."],
      ["Synchronization volume", "Records processed by object and direction, and records per day."],
      ["Reliability", "Outcomes over time, recurring error categories and success rate per integration."],
      ["Performance", "Average duration and processing rate. Slow integrations are highlighted."],
      ["Application health and usage", "Health of each connected app, and consumption against your plan."],
      ["Recommendations", "Each with the reason, the proposed change, the expected benefit, the trade off and the numbers behind it."],
    ],
  },
  {
    id: "evi", k: "EVI", t: "The assistant that knows which screen you are on.", shot: "16-evi-diagnosis", alt: "EVI panel with what happened, likely cause and suggested fix", pos: "100% 0%",
    p: "EVI opens as a side panel, so your screen stays visible. Its header shows what it is looking at, and its suggestions change with the screen.",
    items: [
      ["Answers that show their working", "A Looked at row lists what EVI inspected. Observed facts and inference are labelled separately."],
      ["Diagnose with EVI", "On a failed execution: what happened, likely cause, suggested fix, and Prepare proposal."],
      ["Simple or Technical", "Switch how EVI explains: plain and short, or with more detail."],
      ["Skills menu", "Ready made prompts for the current screen."],
    ],
  },
  {
    id: "agent", k: "Sync Agent and approvals", t: "Proposals you review before anything changes.", shot: "24-approval-review", alt: "Approval review drawer with facts, inference, before and after, and risk", pos: "100% 0%",
    p: "The Sync Agent is the EVOQ Sync specialist behind EVI. It has seven capabilities in four groups, so you never pick between separate bots.",
    items: [
      ["Setup and management", "Integration Setup guides creation. Integration Management pauses, retries or updates when permitted."],
      ["Mapping and transformation", "Recommends field pairs with confidence, and prepares rules with sample input and output."],
      ["Monitoring and diagnosis", "Reviews health and ranks issues, then investigates failures and proposes a fix."],
      ["Optimization", "Studies execution patterns and recommends changes backed by evidence."],
      ["Approvals", "Pending, Approved, Rejected and Failed. A Side effect tag marks proposals that could touch external records."],
      ["History", "A searchable timeline of every request, proposal and decision."],
    ],
  },
  {
    id: "controls", k: "Controls and policy", t: "A scope and a switch for every capability.", shot: "26-controls", alt: "Controls with capability scopes and switches",
    p: "Controls lists each capability with its allowed scope, apps, typical outputs and an on or off switch. Turning a capability off stops new proposals of that kind and does not affect history.",
    items: [],
    extra: "policy",
  },
  {
    id: "settings", k: "Settings and security", t: "Who can do what, and a record of who did.", shot: "31-settings-org", alt: "Settings organization profile",
    p: "Organization, users and roles, notifications, security, audit history, usage and plan, agent policies and appearance.",
    items: [
      ["Users and roles", "Invite teammates and assign Owner, Administrator, Integration Manager or other roles."],
      ["Security", "Multi factor authentication, single sign on, session length and IP allow list."],
      ["Audit history", "A searchable record of who did what, including every agent approval and rejection."],
      ["Notifications", "Email and in app alerts for failed executions, recurring errors, expired credentials, delays, approvals and a weekly digest."],
      ["Help and learning", "A guided tour, InfoTips beside technical words, page tips and a glossary of integration terms."],
    ],
  },
];

const WIZARD = ["General", "Applications", "Connections", "Data objects", "Direction", "Mapping", "Rules", "Test", "Review", "Activate"];
const WIZ_D = ["Name and describe it", "Pick source and destination", "Choose or create the logins", "Choose what moves", "A single direction or both", "Review suggested field pairs", "Conflict policy, filters, validation", "Run on sample data", "Everything before activation", "Turn it on, as draft or live"];
const NODES: [string, string[]][] = [
  ["Triggers", ["Record created", "Record updated", "Webhook", "Schedule", "Manual run"]],
  ["Data", ["Retrieve record", "Search records", "Create record", "Update record", "Delete record"]],
  ["Transformation", ["Format", "Convert", "Concatenate", "Split", "Replace", "Normalize", "Map values"]],
  ["Logic", ["Condition", "Filter", "Branch", "Comparison", "AND / OR group"]],
  ["Validation", ["Required field", "Data type", "Duplicate check", "Custom validation"]],
  ["Application actions", ["App action"]],
  ["Execution", ["Delay", "Retry policy", "End"]],
];
const POLICY = [
  ["Read and explain", "Allowed within your permissions"],
  ["Suggest a mapping or transformation", "Free to suggest, approval to apply"],
  ["Create or activate an integration", "Explicit approval"],
  ["Change sync direction or active mapping", "Explicit approval"],
  ["Modify workflow logic", "Explicit approval"],
  ["Create, update or delete records", "Approval by risk, deletion needs more"],
  ["Retry with possible side effects", "Approval, or a narrow policy you set"],
  ["Change credentials or permissions", "Approval and signing in again"],
];
const TERMS: [string, string][] = [
  ["Application", "A business system EVOQ Sync can connect to."],
  ["Connection", "A saved, authorized login to an application."],
  ["Integration", "Rules that keep data in step between apps: what moves, which direction, and how."],
  ["Data mapping", "The pairing of fields, such as Billing Email in HubSpot to Email in NetSuite, plus any transformation."],
  ["Workflow", "The chain of steps an integration runs: a trigger, data steps, rules and app actions."],
  ["Execution", "A run of an integration. It succeeds, partly fails or fails, and logs every record."],
  ["EVI", "The EVOQ assistant you talk to. It explains, guides and prepares."],
  ["Sync Agent", "The specialist EVI hands integration work to. It prepares proposals and waits."],
  ["Proposal", "A change a person must approve or reject before it is applied."],
];

function Extra({ kind }: { kind: NonNullable<Area["extra"]> }) {
  if (kind === "catalog") {
    return (
      <div className="fx-cat">
        {CATS.map((c) => {
          const list = APPS.filter((a) => a.cat === c);
          return (
            <div key={c} className="fx-cat-row">
              <b>{CAT_LABEL[c]}</b>
              <ul>{list.map((a) => <li key={a.id}><Mark id={a.id} size={22} />{a.name}{a.soon && <em>Soon</em>}</li>)}</ul>
            </div>
          );
        })}
      </div>
    );
  }
  if (kind === "wizard") {
    return (
      <ol className="fx-wiz">
        {WIZARD.map((w, k) => <li key={w}><span>{k + 1}</span><div><b>{w}</b><small>{WIZ_D[k]}</small></div></li>)}
      </ol>
    );
  }
  if (kind === "nodes") {
    return (
      <div className="fx-nodes">
        {NODES.map(([g, ns]) => (
          <div key={g}><b>{g}</b><ul>{ns.map((n) => <li key={n}>{n}</li>)}</ul></div>
        ))}
      </div>
    );
  }
  return (
    <table className="fx-policy">
      <thead><tr><th scope="col">Action</th><th scope="col">Default control</th></tr></thead>
      <tbody>{POLICY.map(([a, b]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td></tr>)}</tbody>
    </table>
  );
}

function useSpy(ids: string[]) {
  const [on, setOn] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const pick = () => {
      const y = 160;
      let cur = ids[0];
      els.forEach((el) => { if (el.getBoundingClientRect().top - y <= 0) cur = el.id; });
      setOn(cur);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    return () => window.removeEventListener("scroll", pick);
  }, [ids]);
  return on;
}

const IDS = AREAS.map((a) => a.id);

export function SyncV1Features() {
  const on = useSpy(IDS);
  return (
    <SyncShell page="features">
      <style>{css}</style>
      <section className="sx-out fh">
        <div className="sx-in fh-in">
          <div className="fh-copy">
            <Label>Features</Label>
            <h1 data-rv>Every screen in EVOQ Sync, and what it does for you.</h1>
            <p data-rv="1">Connectors, data mapping, the Workflow Builder, monitoring, reports, EVI, the Sync Agent and the controls around it. This is what the product does today.</p>
            <div className="sx-ctas" data-rv="2"><Demo location="features_hero" /><a href="#terms" className="sx-btn secondary">Read the terms first</a></div>
          </div>
          <div className="fh-stats" data-rv="1">
            {[["32", "apps in the catalog, plus any REST API"], ["10", "steps in the guided wizard"], ["30", "workflow nodes in 7 groups"], ["7", "Sync Agent capabilities, each with a switch"]].map(([n, l]) => (
              <div key={l}><b>{n}</b><span>{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <div className="sx-out fx-out">
        <div className="sx-in fx">
          <nav className="fx-toc" aria-label="Feature areas">
            <span>Areas</span>
            <ul>{AREAS.map((a) => <li key={a.id}><a href={`#${a.id}`} className={on === a.id ? "on" : undefined}>{a.k}</a></li>)}</ul>
          </nav>
          <div className="fx-list">
            {AREAS.map((a, k) => (
              <section key={a.id} id={a.id} className="fx-a">
                <div className="fx-a-hd">
                  <span className="fx-k">{String(k + 1).padStart(2, "0")} · {a.k}</span>
                  <h2>{a.t}</h2>
                  <p>{a.p}</p>
                </div>
                {VIS[a.id] ? VIS[a.id]() : <Shot src={a.shot} alt={a.alt} pos={a.pos} ratio={a.ratio ?? "16 / 10"} />}
                {a.items.length > 0 && (
                  <ul className="fx-items">
                    {a.items.map(([t, d]) => <li key={t}><span><Check aria-hidden /></span><div><b>{t}</b><p>{d}</p></div></li>)}
                  </ul>
                )}
                {a.extra && <Extra kind={a.extra} />}
              </section>
            ))}
          </div>
        </div>
      </div>

      <section className="sx-sec sx-out sx-grey" id="terms">
        <div className="sx-in">
          <div className="sx-head">
            <Label>The words the app uses</Label>
            <h2 data-rv>Terms, each in a sentence.</h2>
            <p data-rv="1">The same definitions appear in the app as InfoTips beside every technical word.</p>
          </div>
          <dl className="fx-terms">
            {TERMS.map(([t, d]) => <div key={t} data-rv><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
          <div className="fx-chars">
            <img src={`${IMG}/characters/evi-c.webp`} alt="EVI" />
            <img src={`${IMG}/characters/sync-pose-3.webp`} alt="The Sync Agent" />
          </div>
        </div>
      </section>

      <Faq grey={false} items={[
        ["Is every feature on this page available today?", "These are the screens of the EVOQ Sync product as it stands. Dynamics 365 is marked coming soon in the catalog. Ask on the walkthrough about anything specific to your setup."],
        ["Can developers go deeper?", "Yes. The Builder has Scripts and an Audit log tab, executions show the application response and sanitized input and output, and custom API connections take any REST API."],
        ["Does EVI see my data?", "EVI reads the screen you are on: the integration, the execution and whether an error is present. Record logs it reads are masked, and its scope is set per capability on the Controls screen."],
        ["Can I export reports?", "Yes. Every report view exports to CSV."],
      ]} />
      <Closing title="See your own integration on these screens." text="Bring the two systems that disagree most, and we will walk through the mapping, the test and the first failed record together." />
    </SyncShell>
  );
}

const css = `
  ${sharedCss}
  .fh{padding-top:72px;padding-bottom:64px;background:radial-gradient(800px 380px at 0% 0%,${C.tint},rgba(255,255,255,0) 70%),#fff;border-bottom:1px solid ${C.line}}
  .fh-in{display:grid;grid-template-columns:1.2fr .8fr;gap:56px;align-items:end}
  .fh-copy .sx-label{margin-bottom:16px}
  .fh-copy>p{margin:18px 0 0;font-size:18.5px;max-width:58ch}
  .fh-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .fh-stats div{padding:20px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .fh-stats b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:38px;line-height:1;color:${C.primary};letter-spacing:-.02em}
  .fh-stats span{display:block;margin-top:8px;font-size:14px;line-height:1.45;color:${C.body}}

  .fx-out{padding-top:72px;padding-bottom:40px}
  .fx{display:grid;grid-template-columns:220px 1fr;gap:56px;align-items:start}
  .fx-toc{position:sticky;top:84px}
  .fx-toc>span{display:block;margin-bottom:10px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${C.muted}}
  .fx-toc ul{list-style:none;margin:0;padding:0;border-left:1.5px solid ${C.line}}
  .fx-toc a{display:block;margin-left:-1.5px;padding:7px 0 7px 16px;border-left:1.5px solid transparent;font-size:14.5px;color:${C.muted};text-decoration:none;transition:color .15s ease,border-color .15s ease}
  .fx-toc a:hover{color:${C.ink}}
  .fx-toc a.on{color:${C.primary};border-left-color:${C.primary};font-weight:600}
  .fx-list{min-width:0}
  .fx-a{padding-bottom:88px;scroll-margin-top:80px}
  .fx-a-hd{max-width:720px;margin-bottom:26px}
  .fx-k{display:block;margin-bottom:12px;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${C.primary}}
  .fx-a-hd h2{--h2-size:30px}
  .fx-a-hd p{margin:12px 0 0;font-size:17px}
  .fx-items{list-style:none;margin:28px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:18px 32px}
  .fx-items li{display:flex;gap:12px}
  .fx-items li>span{display:flex;align-items:center;justify-content:center;width:24px;height:24px;margin-top:2px;border-radius:7px;background:${C.tint};color:${C.primary};flex-shrink:0}
  .fx-items li>span svg{width:14px;height:14px}
  .fx-items b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${C.ink}}
  .fx-items p{margin:3px 0 0;font-size:15px;line-height:1.55}

  .fx-cat{display:grid;gap:10px;margin-top:28px;padding:20px;border-radius:18px;background:${C.g1}}
  .fx-cat-row{display:grid;grid-template-columns:140px 1fr;gap:16px;align-items:start;padding-bottom:10px;border-bottom:1px solid ${C.line}}
  .fx-cat-row:last-child{border-bottom:0;padding-bottom:0}
  .fx-cat-row>b{padding-top:5px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${C.ink}}
  .fx-cat-row ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
  .fx-cat-row li{display:inline-flex;align-items:center;gap:7px;padding:4px 10px 4px 4px;border-radius:999px;background:#fff;font-size:13.5px;color:${C.ink};box-shadow:inset 0 0 0 1px ${C.line}}
  .fx-cat-row em{padding:0 6px;border-radius:5px;background:#FEF3C7;font-style:normal;font-size:11px;font-weight:600;color:#92400E}

  .fx-wiz{list-style:none;margin:28px 0 0;padding:0;display:grid;grid-template-columns:repeat(5,1fr);gap:10px;counter-reset:w}
  .fx-wiz li{display:flex;flex-direction:column;gap:10px;padding:16px;border-radius:16px;background:${C.g1}}
  .fx-wiz li>span{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:${C.primary};color:#fff;font-size:13px;font-weight:700}
  .fx-wiz li:nth-child(8) >span{background:${C.lime};color:${C.limeInk}}
  .fx-wiz b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${C.ink}}
  .fx-wiz small{display:block;margin-top:2px;font-size:13px;color:${C.muted};line-height:1.45}

  .fx-nodes{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:28px}
  .fx-nodes>div{padding:16px;border-radius:16px;background:${C.g1}}
  .fx-nodes b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${C.ink}}
  .fx-nodes ul{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
  .fx-nodes li{padding:3px 9px;border-radius:7px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:13px;color:${C.body}}

  .fx-policy{width:100%;margin-top:28px;border-collapse:collapse;font-size:15px}
  .fx-policy th,.fx-policy td{padding:12px 0;border-top:1px solid ${C.line};text-align:left;vertical-align:top}
  .fx-policy thead th{border-top:0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${C.muted};font-weight:600}
  .fx-policy tbody th{font-weight:600;color:${C.ink};width:50%;padding-right:20px}

  .fx-terms{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0}
  .fx-terms div{padding:20px;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .fx-terms dt{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:600;color:${C.ink}}
  .fx-terms dd{margin:6px 0 0;font-size:15px;line-height:1.55}
  .fx-chars{display:flex;justify-content:center;gap:12px;margin-top:36px}
  .fx-chars img{width:150px;height:auto}

  @media (max-width:980px){
    .fh-in{grid-template-columns:1fr}
    .fx{grid-template-columns:minmax(0,1fr);gap:0}
    .fx>*{min-width:0}
    .fx-toc{position:sticky;top:52px;z-index:20;margin:0 -20px 28px;padding:10px 20px;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border-bottom:1px solid ${C.line}}
    .fx-toc>span{display:none}
    .fx-toc ul{display:flex;gap:6px;overflow-x:auto;border-left:0;scrollbar-width:none}
    .fx-toc a{margin:0;padding:6px 12px;border:0;border-radius:999px;white-space:nowrap;background:${C.g1}}
    .fx-toc a.on{background:${C.primary};color:#fff}
    .fx-wiz{grid-template-columns:repeat(2,1fr)}
    .fx-terms{grid-template-columns:1fr 1fr}
  }
  @media (max-width:640px){
    .fh{padding-top:48px}
    .fx-out{padding-top:0}
    .fx-a{padding-bottom:64px;scroll-margin-top:130px}
    .fx-a-hd h2{--h2-size:26px}
    .fx-items,.fx-nodes,.fx-terms{grid-template-columns:1fr}
    .fx-cat-row{grid-template-columns:1fr;gap:8px}
    .fh-stats b{font-size:30px}
  }
`;
