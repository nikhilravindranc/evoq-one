"use client";
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import {
  ArrowRight, Building2, Check, ChartColumn, Clock, CreditCard, Download, Gauge, Globe, History, KeyRound, LayoutTemplate,
  Layers, Plug, PencilRuler, Play, Radar, Search, ShieldCheck, Shuffle, SlidersHorizontal, Sparkles, TrendingUp,
  Users, Workflow, X, Zap, Activity, Database, GitBranch, type LucideIcon,
} from "lucide-react";
import { C, IMG } from "./data";
import { Demo, Mark, SyncMark, SyncShell } from "./Shell";
import { Label } from "./SyncV1";

/* EVOQ Sync v1 features. Eleven sections, one idea each, in the same light style as the overview page.
   Records, IDs and times in the visuals are the seeded demo workspace of the Sync app. */

function Caps({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 }) {
  return (
    <ul className={`ft-caps c${cols}`}>
      {items.map((x) => <li key={x}><span><Check aria-hidden /></span>{x}</li>)}
    </ul>
  );
}

/* ---------- 1 hero ---------- */
const RAIL: { icon: LucideIcon; t: string; to: string }[] = [
  { icon: Plug, t: "Connections", to: "#connections" },
  { icon: LayoutTemplate, t: "Integrations", to: "#integrations" },
  { icon: Shuffle, t: "Mapping", to: "#mapping" },
  { icon: Workflow, t: "Workflows", to: "#builder" },
  { icon: Play, t: "Executions", to: "#executions" },
  { icon: Radar, t: "Monitoring", to: "#monitoring" },
  { icon: ChartColumn, t: "Reports", to: "#reports" },
];

function Hero() {
  return (
    <section className="sx-out ft-hero">
      <div className="sx-in">
        <div className="ft-hero-copy">
          <h1 data-rv>See how your integrations work.</h1>
          <p data-rv="1">Configure application connections, define data synchronization rules, create workflows and monitor every execution. EVOQ Sync gives you visibility into the process, from the first connection to the latest run.</p>
          <div className="sx-ctas" data-rv="2"><Demo location="features_hero">Book a Walkthrough</Demo></div>
        </div>
        <ol className="ft-rail" data-rv="2">
          {RAIL.map((r) => {
            const I = r.icon;
            return <li key={r.t}><a href={r.to}><span><I aria-hidden /></span>{r.t}</a></li>;
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 2 application connections ---------- */
function Connections() {
  return (
    <section className="sx-sec sx-out" id="connections">
      <div className="sx-in ft-split">
        <div className="ft-copy">
          <Label>Application connections</Label>
          <h2 data-rv>Start with the applications you already use.</h2>
          <p data-rv="1">Select applications from the EVOQ Sync catalog and authorize the connections required for your integrations.</p>
          <p className="ft-note" data-rv="1">Each saved connection represents an authorized application login that can be used when configuring integrations.</p>
          <Caps items={[
            "Browse and search the application catalog.",
            "Configure and authorize application connections.",
            "Reuse saved connections across integrations.",
            "View connection status.",
            "Configure a Custom REST API Connection for an application outside the catalog.",
          ]} cols={1} />
        </div>
        <div className="ft-card" data-rv="1" aria-hidden>
          <div className="ft-dots"><i /><i /><i /></div>
          <div className="ft-search"><Search />Search the application catalog</div>
          <div className="ft-row"><Mark id="shopify" size={30} /><div><b>Shopify Main store</b><small>Used by 2 integrations</small></div><span className="ft-chip ok">Connected</span></div>
          <div className="ft-row"><Mark id="netsuite" size={30} /><div><b>NetSuite EMEA</b><small>Used by 3 integrations</small></div><span className="ft-chip ok">Connected</span></div>
          <div className="ft-row"><Mark id="quickbooks" size={30} /><div><b>QuickBooks Finance</b><small>Refresh token expired</small></div><span className="ft-chip bad">Expired</span></div>
          <div className="ft-row api"><span className="ft-api"><Plug /></span><div><b>Custom REST API Connection</b><small>Base URL, authentication, test call</small></div><em>+</em></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3 integration configuration and management ---------- */
const WAYS: { icon: LucideIcon; t: string }[] = [
  { icon: LayoutTemplate, t: "Integration template" },
  { icon: PencilRuler, t: "From scratch" },
  { icon: Sparkles, t: "Describe it to EVI" },
];

function Integrations() {
  return (
    <section className="sx-sec sx-out sx-grey" id="integrations">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>Integration configuration and management</Label>
          <h2 data-rv>Define what moves between applications.</h2>
          <p data-rv="1">An integration specifies the applications involved, the data being synchronized, the direction of movement and the rules that govern the process. Use the guided configuration process to establish these details before activation.</p>
        </div>
        <div className="ft-ways" data-rv="1">
          <p>Start from an integration template, create an integration from scratch or describe the requirement to EVI.</p>
          <ul>
            {WAYS.map((w) => { const I = w.icon; return <li key={w.t}><span><I aria-hidden /></span>{w.t}</li>; })}
          </ul>
        </div>
        <div className="ft-panel" data-rv="2">
          <Caps items={[
            "Select source and destination applications.",
            "Choose data objects and synchronization direction.",
            "Configure application connections.",
            "Define field mappings and conflict policies.",
            "Test and review the configuration before activation.",
            "View integration health, recent executions, logs and settings.",
          ]} />
        </div>
      </div>
    </section>
  );
}

/* ---------- 4 data mapping and transformation ---------- */
function Mapping() {
  return (
    <section className="sx-sec sx-out" id="mapping">
      <div className="sx-in ft-split rev">
        <div className="ft-card" data-rv aria-hidden>
          <div className="ft-dots"><i /><i /><i /></div>
          <div className="ft-hd"><Mark id="shopify" size={22} /><ArrowRight /><Mark id="netsuite" size={22} /><span className="ft-chip p">Both ways</span></div>
          <div className="ft-map"><b>Order total</b><ArrowRight /><b>amount</b><span className="ft-chip ok">Direct</span></div>
          <div className="ft-map"><b>Customer email</b><ArrowRight /><b>email</b><span className="ft-chip p">lowercase()</span></div>
          <div className="ft-map"><b>Country</b><ArrowRight /><b>country</b><span className="ft-chip p">Lookup</span></div>
          <div className="ft-map"><b>Tax ID</b><ArrowRight /><b>taxRegistrationNumber</b><span className="ft-chip p">Default value</span></div>
          <div className="ft-prev"><small>Preview</small><code>&quot; DE 811 907 980 &quot;</code><ArrowRight /><code>DE811907980</code></div>
          <div className="ft-evi"><Sparkles />EVI suggestion<span className="ft-chip ok">High confidence</span></div>
        </div>
        <div className="ft-copy">
          <Label>Data mapping and transformation</Label>
          <h2 data-rv>Make different data structures work together.</h2>
          <p data-rv="1">Your CRM and ERP may describe the same information differently. Data mapping defines how fields correspond, while transformation rules prepare values for the destination application.</p>
          <Caps items={[
            "Pair source and destination fields.",
            "Map fields directly or use transformed and default values.",
            "Configure bi-directional field mapping.",
            "Define conflict-handling policies.",
            "Validate required fields.",
            "Apply formatting, lookup and default-value transformations.",
            "Preview sample input and output.",
            "Review EVI mapping suggestions and confidence information.",
          ]} cols={1} />
        </div>
      </div>
    </section>
  );
}

/* ---------- 5 visual workflow builder ---------- */
const NODES: { icon: LucideIcon; t: string }[] = [
  { icon: Zap, t: "Triggers" },
  { icon: Database, t: "Data operations" },
  { icon: Shuffle, t: "Transformations" },
  { icon: GitBranch, t: "Logic" },
  { icon: ShieldCheck, t: "Validation" },
  { icon: Plug, t: "Application actions" },
  { icon: Play, t: "Execution" },
];

function Builder() {
  return (
    <section className="sx-sec sx-out sx-grey" id="builder">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>Visual workflow builder</Label>
          <h2 data-rv>See every step in the integration.</h2>
          <p data-rv="1">Create and edit integration workflows on a visual canvas. Arrange the steps, define their settings and test how information moves through the workflow.</p>
        </div>
        <div className="ft-canvas" data-rv="1" aria-hidden>
          <span className="ft-canvas-lab">Workflow components</span>
          <ol>
            {NODES.map((n) => { const I = n.icon; return <li key={n.t}><span><I /></span><b>{n.t}</b></li>; })}
          </ol>
        </div>
        <div className="ft-panel" data-rv="2">
          <Caps items={[
            "Add and arrange workflow nodes on a visual canvas.",
            "Connect nodes to define execution paths.",
            "Configure each node through its settings panel.",
            "Validate workflow configuration.",
            "Insert steps between existing nodes.",
            "Test workflows using sample data.",
            "Review test outcomes across individual nodes.",
            "Use EVI to prepare a sample workflow from a natural-language description.",
          ]} />
        </div>
      </div>
    </section>
  );
}

/* ---------- 6 integration execution and management ---------- */
function Executions() {
  return (
    <section className="sx-sec sx-out" id="executions">
      <div className="sx-in ft-split rev">
        <div className="ft-card" data-rv aria-hidden>
          <div className="ft-dots"><i /><i /><i /></div>
          <div className="ft-ex head"><span>Execution</span><span>Status</span><span>Duration</span><span>Records</span></div>
          <div className="ft-ex"><b>EX-20493</b><span className="ft-chip ok">Succeeded</span><span>2.4 s</span><span>12</span></div>
          <div className="ft-ex"><b>EX-20492</b><span className="ft-chip p">Running</span><span>41 s</span><span>214</span></div>
          <div className="ft-ex"><b>EX-20491</b><span className="ft-chip warn">Partial failure</span><span>18 s</span><span>12</span></div>
          <div className="ft-ex"><b>EX-20490</b><span className="ft-chip bad">Failed</span><span>9 s</span><span>5</span></div>
        </div>
        <div className="ft-copy">
          <Label>Integration execution and management</Label>
          <h2 data-rv>Know what ran and what needs attention.</h2>
          <p data-rv="1">Review the status of your integrations and inspect individual executions to understand how each run progressed.</p>
          <Caps items={[
            "View execution status and history.",
            "Review execution outcomes, duration, records and triggers.",
            "Inspect workflow steps and their individual results.",
            "Review integration settings, notifications and retry policies.",
            "Pause, update or manage integrations according to the configured permissions.",
          ]} cols={1} />
        </div>
      </div>
    </section>
  );
}

/* ---------- 7 integration monitoring and troubleshooting ---------- */
function Monitoring() {
  return (
    <section className="sx-sec sx-out sx-dark" id="monitoring">
      <div className="sx-in ft-split">
        <div className="ft-copy dark">
          <Label>Integration monitoring and troubleshooting</Label>
          <h2 data-rv>Find the failure. Understand the reason. Review the next step.</h2>
          <p data-rv="1">Monitoring brings execution activity, errors and connection alerts into view. When a run fails, inspect the details instead of relying on an error code alone.</p>
          <Caps items={[
            "Filter executions by relevant criteria.",
            "Review execution status counts and the error queue.",
            "Inspect the workflow path and step-level outcomes.",
            "View application responses.",
            "Identify the likely cause of an error.",
            "Review suggested corrective actions.",
            "Check retry eligibility and auto-retry policies.",
            "Inspect record-level logs with sanitized input and output.",
          ]} cols={1} />
        </div>
        <div className="ft-card light" data-rv="1" aria-hidden>
          <div className="ft-hd"><b>EX-20491</b><span className="ft-chip warn">Partial failure</span></div>
          <ol className="ft-path">
            <li className="ok"><span><Check /></span>Trigger</li>
            <li className="ok"><span><Check /></span>Retrieve record</li>
            <li className="err"><span><X /></span>Validate required fields</li>
            <li><span /></li>
          </ol>
          <code className="ft-code">Required field &quot;taxRegistrationNumber&quot; is empty</code>
          <div className="ft-find"><small>Likely cause <i>inferred</i></small><p>Accounts created before March have no tax ID, and the destination requires it for EMEA customers.</p></div>
          <div className="ft-find act"><small>Suggested action</small><p>Add a default or a conditional skip for accounts without a tax ID.</p><span className="ft-chip ok">Eligible for retry · up to 3 attempts, every 2 min</span></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8 reports and analytics ---------- */
const REPORTS: { icon: LucideIcon; t: string }[] = [
  { icon: Activity, t: "Execution Activity" },
  { icon: Layers, t: "Synchronization Volume" },
  { icon: ShieldCheck, t: "Reliability" },
  { icon: Gauge, t: "Performance" },
  { icon: TrendingUp, t: "Application Health" },
  { icon: Users, t: "Usage" },
];

function Reports() {
  return (
    <section className="sx-sec sx-out ft-rep" id="reports">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>Reports and analytics</Label>
          <h2 data-rv>Understand integration activity over time.</h2>
          <p data-rv="1">Use reports to review integration volume, reliability, performance and application health.</p>
        </div>
        <ul className="ft-tiles three" data-rv="1">
          {REPORTS.map((r) => { const I = r.icon; return <li key={r.t}><span><I aria-hidden /></span><b>{r.t}</b></li>; })}
        </ul>
        <div className="ft-rec" data-rv="2">
          <p>Reports also surface recommendations with the reason, proposed change, expected benefit, risk or trade-off and supporting figures. Export report data as CSV for further analysis.</p>
          <span className="ft-pill"><Download aria-hidden />Export CSV</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9 EVI and Sync Agent ---------- */
const AGENT_GROUPS: [string, string[]][] = [
  ["Setup and integration management", ["Integration Setup", "Integration Management"]],
  ["Mapping and transformation", ["Mapping", "Transformation"]],
  ["Monitoring and error diagnosis", ["Monitoring", "Error Diagnosis"]],
  ["Optimization", ["Optimization"]],
];

function Agents() {
  return (
    <section className="sx-sec sx-out sx-grey" id="evi">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>EVI and Sync Agent</Label>
          <h2 data-rv>AI assistance with approval at the centre.</h2>
          <p data-rv="1">EVI helps you understand the integration screen you are working on. The Sync Agent prepares proposals for specialist integration tasks.</p>
        </div>
        <div className="ft-bento">
          <article className="ft-b ft-b-evi" data-rv>
            <div className="ft-who"><img src={`${IMG}/characters/evi-head.webp`} alt="" /><div><b>EVI</b><small>Contextual assistance</small></div></div>
            <p>Ask questions about the current integration, execution, mapping or error. EVI uses screen context to explain what it has inspected and guide you towards the relevant action.</p>
          </article>
          <article className="ft-b ft-b-agent" data-rv="1">
            <div className="ft-who"><img src={`${IMG}/characters/sync-head.webp`} alt="" /><div><b>Sync Agent</b><small>Integration specialist</small></div></div>
            <p>The Sync Agent works across seven capabilities grouped into four areas:</p>
            <div className="ft-groups">
              {AGENT_GROUPS.map(([g, items]) => (
                <div key={g}><small>{g}</small><div>{items.map((x) => <span key={x}>{x}</span>)}</div></div>
              ))}
            </div>
          </article>
          <article className="ft-b ft-b-review" data-rv="2">
            <div className="ft-review-copy">
              <h3>Review before changes are made</h3>
              <p>Each proposal separates observed facts from inference and presents the proposed changes, before-and-after details and risk. You can approve or reject it, and the decision is recorded.</p>
            </div>
            <div className="ft-review-vis" aria-hidden>
              <div className="ft-review-chips"><span>Observed facts</span><span>Inference</span><span>Proposed changes</span><span>Before and after</span><span>Risk</span></div>
              <div className="ft-review-btns"><span>Reject</span><span className="pri">Approve Proposal</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 security, access and governance ---------- */
const SECURITY: { icon: LucideIcon; t: string }[] = [
  { icon: Building2, t: "Organization and user settings" },
  { icon: Users, t: "User roles and permissions" },
  { icon: ShieldCheck, t: "Multi-factor authentication settings" },
  { icon: KeyRound, t: "Single sign-on settings" },
  { icon: Clock, t: "Session-length controls" },
  { icon: Globe, t: "IP allow-list settings" },
  { icon: History, t: "Audit history" },
  { icon: SlidersHorizontal, t: "Agent capability scopes and approval policies" },
  { icon: CreditCard, t: "Usage and plan settings" },
];

function Security() {
  return (
    <section className="sx-sec sx-out" id="security">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>Security, access and governance</Label>
          <h2 data-rv>Keep access and decisions accountable.</h2>
          <p data-rv="1">EVOQ Sync includes administrative controls for managing access, security settings and agent permissions.</p>
        </div>
        <ul className="ft-tiles three plain" data-rv="1">
          {SECURITY.map((r) => { const I = r.icon; return <li key={r.t}><span><I aria-hidden /></span><b>{r.t}</b></li>; })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 11 closing call to action ---------- */
function Final() {
  return (
    <section className="sx-out sx-close-out">
      <div className="sx-in">
        <div className="sx-close" data-rv>
          <div className="sx-close-copy">
            <h2>See the features in action.</h2>
            <p>Explore how EVOQ Sync handles application connections, data mapping, workflow configuration and integration monitoring.</p>
            <div className="sx-ctas">
              <Demo location="closing" className="sx-btn lime">Book a Walkthrough</Demo>
            </div>
          </div>
          <div className="sx-close-art" aria-hidden>
            <div className="sx-close-pair"><Mark id="shopify" size={52} /><i /><SyncMark size={58} bg={C.action} /><i /><Mark id="netsuite" size={52} /></div>
            <div className="sx-close-card">
              <span className="sx-dot ok" />
              <div><b>Shopify orders to NetSuite sales orders</b><small>Test passed. Ready to switch on.</small></div>
              <span className="sx-switch on"><i /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SyncV1Features(): ReactNode {
  return (
    <SyncShell page="features">
      <style>{css}</style>
      <Hero />
      <Connections />
      <Integrations />
      <Mapping />
      <Builder />
      <Executions />
      <Monitoring />
      <Reports />
      <Agents />
      <Security />
      <Final />
    </SyncShell>
  );
}

const css = `
  /* hero */
  .ft-hero{padding-top:64px;padding-bottom:56px;background:radial-gradient(900px 420px at 15% 0,${C.tint},rgba(255,255,255,0) 70%),#fff}
  .ft-hero h1{--h1-size:58px;max-width:16ch}
  .ft-hero-copy>p{max-width:62ch;margin:22px 0 0;font-size:18.5px;line-height:1.6}
  .ft-hero-copy .sx-ctas{margin-top:28px}
  .ft-rail{list-style:none;margin:48px 0 0;padding:0;display:grid;grid-template-columns:repeat(7,1fr);position:relative}
  .ft-rail::before{content:"";position:absolute;left:7%;right:7%;top:26px;height:2px;background:repeating-linear-gradient(90deg,${C.action} 0 6px,transparent 6px 12px);opacity:.7}
  .ft-rail a{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;font-size:14px;font-weight:600;color:${C.ink};text-decoration:none}
  .ft-rail a span{display:flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 10px 20px -12px rgba(46,16,101,.35);color:${C.primary};transition:transform .2s ease,background .2s ease,color .2s ease}
  .ft-rail a span svg{width:22px;height:22px}
  .ft-rail a:hover span{transform:translateY(-3px);background:${C.primary};color:#fff}

  /* shared pieces */
  .ft-split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
  .ft-split.rev .ft-copy{order:2}
  .ft-copy .sx-label{margin-bottom:14px}
  .ft-copy h2{--h2-size:38px}
  .ft-copy>p{margin:16px 0 0;font-size:17px;line-height:1.6;max-width:52ch}
  .ft-copy>p.ft-note{margin-top:12px;font-size:15.5px;color:${C.muted}}
  .ft-copy.dark>p{color:#CDBEE8}
  .ft-caps{list-style:none;margin:26px 0 0;padding:0;display:grid;gap:10px 28px}
  .ft-caps.c2{grid-template-columns:1fr 1fr}
  .ft-caps li{display:flex;gap:10px;font-size:15px;line-height:1.5;color:${C.ink}}
  .ft-caps li>span{display:flex;align-items:center;justify-content:center;width:20px;height:20px;margin-top:1px;border-radius:50%;background:${C.tint};color:${C.primary};flex-shrink:0}
  .ft-caps li>span svg{width:12px;height:12px}
  .sx-dark .ft-caps li{color:#fff}
  .sx-dark .ft-caps li>span{background:rgba(163,230,53,.18);color:${C.lime}}
  .ft-panel{max-width:920px;margin:34px auto 0;padding:26px 30px;border-radius:22px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-panel .ft-caps{margin:0}
  .ft-chip{display:inline-block;padding:3px 10px;border-radius:999px;background:${C.g1};color:${C.body};font-size:12px;font-weight:700;white-space:nowrap}
  .ft-chip.ok{background:#DCFCE7;color:#166534}
  .ft-chip.bad{background:#FEE2E2;color:#991B1B}
  .ft-chip.warn{background:#FEF3C7;color:#92400E}
  .ft-chip.p{background:${C.tint};color:${C.primary}}

  /* app window cards */
  .ft-card{display:grid;gap:8px;padding:18px;border-radius:24px;background:linear-gradient(180deg,#fff,${C.g1});box-shadow:0 0 0 1px ${C.line},0 30px 60px -36px rgba(46,16,101,.4)}
  .ft-card.light{background:#fff}
  .ft-dots{display:flex;gap:6px;margin-bottom:4px}
  .ft-dots i{width:10px;height:10px;border-radius:50%;background:#EF4444}
  .ft-dots i:nth-child(2){background:#F5B83D}
  .ft-dots i:nth-child(3){background:#22A55B}
  .ft-search{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:14px;color:${C.muted}}
  .ft-search svg{width:16px;height:16px}
  .ft-row{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-row>div{flex:1;min-width:0}
  .ft-row b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${C.ink}}
  .ft-row small{display:block;font-size:12.5px;color:${C.muted}}
  .ft-row em{font-style:normal;font-size:20px;line-height:1;color:${C.muted}}
  .ft-row.api{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.soft}}
  .ft-api{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:${C.primary};color:#fff;flex-shrink:0}
  .ft-api svg{width:16px;height:16px}
  .ft-hd{display:flex;align-items:center;gap:8px;padding:0 2px 4px}
  .ft-hd svg{width:16px;height:16px;color:${C.primary}}
  .ft-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${C.ink}}
  .ft-hd .ft-chip{margin-left:auto}
  .ft-map{display:grid;grid-template-columns:1fr auto 1fr auto;align-items:center;gap:10px;padding:11px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-map b{font-size:13.5px;font-weight:600;color:${C.ink};overflow:hidden;text-overflow:ellipsis}
  .ft-map svg{width:15px;height:15px;color:${C.muted}}
  .ft-prev{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:11px 14px;border-radius:12px;background:#120B24;color:#fff}
  .ft-prev small{font-size:12px;color:#B9A8D8}
  .ft-prev code{font-size:12.5px;color:#E9D5FF}
  .ft-prev svg{width:14px;height:14px;color:${C.lime}}
  .ft-evi{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft};font-size:13.5px;font-weight:600;color:${C.primary}}
  .ft-evi svg{width:16px;height:16px}
  .ft-evi .ft-chip{margin-left:auto}
  .ft-ex{display:grid;grid-template-columns:1.1fr 1.3fr .8fr .7fr;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:13.5px;color:${C.body}}
  .ft-ex b{font-family:var(--font-display),system-ui,sans-serif;color:${C.ink}}
  .ft-ex.head{background:transparent;box-shadow:none;padding-top:2px;padding-bottom:2px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:${C.muted}}
  .ft-path{list-style:none;margin:0;padding:6px 2px 4px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
  .ft-path li{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;font-size:12.5px;font-weight:500;line-height:1.3;color:${C.ink}}
  .ft-path li:not(:last-child)::after{content:"";position:absolute;top:14px;left:calc(50% + 18px);right:calc(-50% + 18px);height:2px;background:#DDD8E5}
  .ft-path li.ok:not(:last-child)::after{background:${C.ok};opacity:.5}
  .ft-path li>span{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#DDD8E5;color:#fff}
  .ft-path li.ok>span{background:${C.ok}}
  .ft-path li.err>span{background:${C.err};box-shadow:0 0 0 5px rgba(220,38,38,.15)}
  .ft-path li>span svg{width:14px;height:14px}
  .ft-code{display:block;padding:11px 14px;border-radius:12px;background:#120B24;color:#FECACA;font-size:12.5px;white-space:pre-wrap}
  .ft-find{padding:12px 14px;border-radius:12px;background:${C.g1}}
  .ft-find small{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:${C.muted}}
  .ft-find small i{padding:1px 8px;border-radius:999px;background:#EFF6FF;color:#1D4ED8;font-style:normal;font-size:11px;font-weight:600;text-transform:none;letter-spacing:0}
  .ft-find p{margin:4px 0 0;font-size:13.5px;line-height:1.5;color:${C.ink}}
  .ft-find.act{background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft}}
  .ft-find .ft-chip{margin-top:8px}

  /* integrations: three ways in */
  .ft-ways{max-width:920px;margin:34px auto 0;text-align:center}
  .ft-ways>p{margin:0 0 18px;font-size:15.5px;color:${C.body}}
  .ft-ways ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .ft-ways li{display:flex;flex-direction:column;align-items:center;gap:12px;padding:24px 16px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600;color:${C.ink}}
  .ft-ways li:last-child{background:${C.depth};box-shadow:none;color:#fff}
  .ft-ways li>span{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;background:${C.tint};color:${C.primary}}
  .ft-ways li:last-child>span{background:rgba(255,255,255,.12);color:${C.lime}}
  .ft-ways li>span svg{width:22px;height:22px}

  /* builder canvas */
  .ft-canvas{position:relative;margin-top:34px;padding:50px 24px 34px;border-radius:26px;background-color:#fff;background-image:radial-gradient(${C.soft} 1px,transparent 1.3px);background-size:22px 22px;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-canvas-lab{position:absolute;left:24px;top:18px;font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.muted}}
  .ft-canvas ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(7,1fr);gap:0}
  .ft-canvas li{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
  .ft-canvas li:not(:last-child)::after{content:"";position:absolute;top:30px;left:calc(50% + 34px);right:calc(-50% + 34px);height:2px;background:repeating-linear-gradient(90deg,${C.action} 0 5px,transparent 5px 10px)}
  .ft-canvas li>span{display:flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:18px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 12px 24px -14px rgba(46,16,101,.45);color:${C.primary}}
  .ft-canvas li:first-child>span{background:${C.primary};color:#fff}
  .ft-canvas li:last-child>span{background:${C.lime};color:${C.limeInk}}
  .ft-canvas li>span svg{width:24px;height:24px}
  .ft-canvas li b{font-size:13.5px;font-weight:600;line-height:1.3;color:${C.ink}}

  /* reports and security tiles */
  .ft-rep{background:linear-gradient(180deg,#fff 0,#E6ECFF 14%,#E8DBFB 55%,#FADDEC 90%,#fff 100%)}
  .ft-tiles{list-style:none;margin:34px 0 0;padding:0;display:grid;gap:14px}
  .ft-tiles.three{grid-template-columns:repeat(3,1fr)}
  .ft-tiles li{display:flex;align-items:center;gap:14px;padding:20px 22px;border-radius:20px;background:linear-gradient(160deg,rgba(255,255,255,.95),rgba(255,255,255,.6));box-shadow:inset 0 0 0 1px rgba(255,255,255,.95),0 16px 30px -20px rgba(40,30,70,.4)}
  .ft-tiles li>span{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:13px;background:${C.tint};color:${C.primary};flex-shrink:0}
  .ft-tiles li>span svg{width:21px;height:21px}
  .ft-tiles li b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600;line-height:1.35;color:${C.ink}}
  .ft-tiles.plain li{background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-rec{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;max-width:920px;margin:26px auto 0;padding-top:22px;border-top:1px solid rgba(46,16,101,.12)}
  .ft-rec p{flex:1;min-width:260px;margin:0;font-size:15px;line-height:1.55;color:#5B5870}
  .ft-pill{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;background:#fff;box-shadow:0 8px 18px -10px rgba(40,30,70,.4);font-size:14px;font-weight:600;color:${C.ink}}
  .ft-pill svg{width:16px;height:16px;color:${C.primary}}

  /* EVI and Sync Agent bento */
  .ft-bento{display:grid;grid-template-columns:repeat(12,1fr);gap:16px;margin-top:34px}
  .ft-b{display:flex;flex-direction:column;padding:30px;border-radius:26px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-b-evi{grid-column:span 5}
  .ft-b-agent{grid-column:span 7}
  .ft-b-review{grid-column:1 / -1;flex-direction:row;align-items:center;justify-content:space-between;gap:40px;background:${C.depth};box-shadow:none}
  .ft-who{display:flex;align-items:center;gap:12px}
  .ft-who img{width:46px;height:46px;border-radius:50%;background:${C.tint}}
  .ft-who b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${C.ink}}
  .ft-who small{font-size:13.5px;color:${C.muted}}
  .ft-b>p{margin:16px 0 0;font-size:15.5px;line-height:1.6;color:${C.body}}
  .ft-groups{display:grid;grid-template-columns:1fr 1fr;gap:14px 18px;margin-top:20px}
  .ft-groups small{display:block;margin-bottom:8px;font-size:12.5px;font-weight:600;color:${C.muted}}
  .ft-groups div div{display:flex;flex-wrap:wrap;gap:6px}
  .ft-groups span{padding:5px 11px;border-radius:999px;background:${C.tint};color:${C.primary};font-size:13px;font-weight:600}
  .ft-review-copy{max-width:520px}
  .ft-review-copy h3{--h3-size:26px;color:#fff}
  .ft-review-copy p{margin:12px 0 0;font-size:15.5px;line-height:1.6;color:#CDBEE8}
  .ft-review-vis{display:grid;gap:16px;flex-shrink:0}
  .ft-review-chips{display:flex;flex-wrap:wrap;gap:8px;max-width:420px}
  .ft-review-chips span{padding:6px 13px;border-radius:999px;background:rgba(163,230,53,.14);color:${C.lime};font-size:13px;font-weight:600}
  .ft-review-btns{display:flex;gap:10px}
  .ft-review-btns span{padding:11px 20px;border-radius:11px;background:#fff;color:${C.ink};font-size:14.5px;font-weight:600}
  .ft-review-btns span.pri{background:${C.lime};color:${C.limeInk}}

  @media (max-width:1080px){
    .ft-hero h1{--h1-size:48px}
    .ft-split{gap:40px}
  }
  @media (max-width:980px){
    .ft-split{grid-template-columns:1fr}
    .ft-split.rev .ft-copy{order:0}
    .ft-rail{grid-template-columns:repeat(4,1fr);gap:20px 8px}
    .ft-rail::before{display:none}
    .ft-canvas ol{grid-template-columns:repeat(4,1fr);gap:26px 0}
    .ft-canvas li::after{display:none}
    .ft-tiles.three{grid-template-columns:1fr 1fr}
    .ft-b-evi,.ft-b-agent{grid-column:1 / -1}
    .ft-b-review{flex-direction:column;align-items:flex-start}
  }
  @media (max-width:640px){
    .ft-hero{padding-top:44px}
    .ft-hero h1{--h1-size:36px}
    .ft-hero-copy>p{font-size:17px}
    .ft-copy h2{--h2-size:28px}
    .ft-caps.c2{grid-template-columns:1fr}
    .ft-ways ul{grid-template-columns:1fr}
    .ft-canvas ol{grid-template-columns:repeat(2,1fr)}
    .ft-tiles.three{grid-template-columns:1fr}
    .ft-groups{grid-template-columns:1fr}
    .ft-b{padding:24px}
    .ft-ex{grid-template-columns:1fr 1.3fr .8fr;}
    .ft-ex span:last-child{display:none}
    .ft-panel{padding:22px}
  }
  @media (prefers-reduced-motion:reduce){.ft-rail a span{transition:none}}
`;
