"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import {
  ArrowLeftRight, ArrowRight, Check, Code, ChartColumn, ChevronDown, Download, LayoutTemplate,
  Plug, Play, Radar, Search, ShieldCheck, Shuffle, Sparkles,
  Workflow, X, Zap, Activity, Database, GitBranch, LayoutDashboard, Plus, Settings, type LucideIcon,
} from "lucide-react";
import { C, IMG } from "./data";
import { Mark, SyncMark, SyncShell } from "./Shell";
import { CtaBand, ctaCss } from "./SyncV1";

/* EVOQ Sync v1 features. After the hero, one explorer: the features are listed on the left and the app window on the
   right shows the selected feature, with a short guided tour inside it (what it is, why it matters, how it works).
   Records, IDs and times in the visuals are the seeded demo workspace of the Sync app. */

function Hero() {
  return (
    <section className="sx-out ft-hero">
      <div className="sx-in">
        <div className="fh">
          <div className="ft-hero-copy">
            <span className="fh-tag" data-rv><Sparkles aria-hidden />Features</span>
            <h1 data-rv="1">Connect your applications <span className="t2">and sync their data.</span></h1>
            <p data-rv="2">Configure application connections, define data synchronization rules, create workflows and monitor every execution. EVOQ Sync gives you visibility into the process, from the first connection to the latest run.</p>
          </div>
          <div className="fh-stage" data-rv="2" aria-hidden>
            <div className="fh-card c1">
              <span className="fh-k">Connections</span>
              <div className="fh-app"><Mark id="shopify" size={30} /><b>Shopify Main store</b><span className="ft-chip ok">Connected</span></div>
              <div className="fh-app"><Mark id="netsuite" size={30} /><b>NetSuite EMEA</b><span className="ft-chip ok">Connected</span></div>
            </div>
            <div className="fh-card c2">
              <div className="fh-top"><span className="fh-k">Execution EX-20491</span><span className="ft-chip warn">Partial failure</span></div>
              <ol className="ft-path">
                <li className="ok"><span><Check /></span>Trigger</li>
                <li className="ok"><span><Check /></span>Retrieve</li>
                <li className="err"><span><X /></span>Validate</li>
                <li><span /></li>
              </ol>
              <code className="ft-code">Required field &quot;taxRegistrationNumber&quot; is empty</code>
            </div>
            <div className="fh-card c3">
              <div className="fh-evi"><img src={`${IMG}/characters/evi-head.webp`} alt="" /><div><b>EVI</b><small>Likely cause</small></div></div>
              <p>Accounts created before March have no tax ID.</p>
              <span className="ft-chip ok">Review proposal</span>
            </div>
            <div className="fh-card c4">
              <span className="fh-k">Mapping</span>
              <div className="fh-map"><b>Tax ID</b><ArrowRight /><b>taxRegistrationNumber</b></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- the product visuals shown in the app window ---------- */
const NODES: { icon: LucideIcon; t: string }[] = [
  { icon: Zap, t: "Triggers" },
  { icon: Database, t: "Data operations" },
  { icon: Shuffle, t: "Transformations" },
  { icon: GitBranch, t: "Logic" },
  { icon: ShieldCheck, t: "Validation" },
  { icon: Plug, t: "Application actions" },
  { icon: Play, t: "Execution" },
];

const FLOW: [string, string, LucideIcon][] = [
  ["Trigger", "New Shopify order", Zap],
  ["Data operation", "Retrieve the order", Database],
  ["Transformation", "Format the fields", Shuffle],
  ["Validation", "Check required fields", ShieldCheck],
  ["Application action", "Create sales order in NetSuite", Plug],
];

/* bar heights are for the picture only: [succeeded, failed] */
const BARS: [number, number][] = [[46, 4], [58, 3], [52, 6], [66, 2], [60, 4], [72, 3], [44, 14], [62, 5], [70, 2], [64, 3], [76, 2], [68, 4], [74, 3], [80, 2]];

const ConnectionsVisual = () => (
  <div className="ft-card cn" aria-hidden>
    <div className="cn-hd"><div><h4>Application catalog</h4><p>Search prebuilt connectors by application, category or capability.</p></div><span className="cn-btn api"><Code />Custom API Connection</span></div>
    <div className="cn-find"><span className="cn-s"><Search /><span className="q-ph">Search apps, categories or capabilities</span><span className="q-t">Shopify</span></span><span className="cn-pill on">All</span><span className="cn-pill">CRM</span><span className="cn-pill">eCommerce</span></div>
    <div className="cn-grid">
      <div className="cn-card shop"><div className="cn-top"><Mark id="shopify" size={36} /><div><b>Shopify</b><small>eCommerce</small></div></div><p>Order · Customer · Product</p><div className="cn-tags"><span className="ft-chip p">Prebuilt connector</span><span className="ft-chip ok s-on">Connected</span></div><div className="cn-act"><span className="cn-btn pri s-off">Connect</span><span className="cn-btn s-on">Manage</span></div></div>
      <div className="cn-card hub"><div className="cn-top"><Mark id="hubspot" size={36} /><div><b>HubSpot</b><small>CRM</small></div></div><p>Customer · Contact · Deal</p><div className="cn-tags"><span className="ft-chip p">Prebuilt connector</span><span className="ft-chip ok">Connected</span></div><div className="cn-act"><span className="cn-btn">Manage</span><em>Used by 2 integrations</em></div></div>
    </div>
  </div>
);

const IntegrationsVisual = () => (
  <div className="ft-card iw" aria-hidden>
    <div className="iw-hd"><div><h4>Create Integration</h4><p>Template-led setup</p></div><span className="cn-btn">Save draft &amp; exit</span></div>
    <ol className="iw-steps">
      {Array.from({ length: 10 }, (_, k) => <li key={k}><i>{k + 1}</i><Check /></li>)}
    </ol>
    <div className="iw-card">
      <div className="iw-pane p0"><h5>1. General</h5><p>Give it a name you will recognise later.</p><label>Integration name *</label><div className="iw-in"><span className="iw-t">Shopify orders to NetSuite</span></div></div>
      <div className="iw-pane p1"><h5>4. Mappings</h5><p>Match each source field to its destination.</p><div className="iw-map"><span>Order number</span><ArrowRight /><span>Reference</span></div><div className="iw-map"><span>Customer email</span><ArrowRight /><span>Customer</span></div><div className="iw-map"><span>Order total</span><ArrowRight /><span>Amount</span></div></div>
      <div className="iw-pane p2"><h5>8. Test</h5><p>Run it on sample data before it goes live.</p><span className="ft-chip ok">Test passed</span></div>
      <div className="iw-pane p3"><h5>10. Review and activate</h5><p>Everything is checked. Switch it on when you are ready.</p><span className="ft-chip ok">Ready to activate</span></div>
    </div>
    <div className="iw-foot"><span className="cn-btn">Back</span><span className="cn-btn pri iw-continue"><span className="iw-c1">Continue</span><span className="iw-c2">Activate</span></span></div>
  </div>
);

const MappingVisual = () => (
  <div className="ft-card" aria-hidden>
    <div className="ft-dots"><i /><i /><i /></div>
    <div className="cn-hd"><div><h4>Mappings</h4><p>Shopify to NetSuite, sales order</p></div><span className="ft-chip p">Both ways</span></div>
    <div className="ft-map"><b>Order total</b><ArrowRight /><b>amount</b><span className="ft-chip ok">Direct</span></div>
    <div className="ft-map"><b>Customer email</b><ArrowRight /><b>email</b><span className="ft-chip p">lowercase()</span></div>
    <div className="ft-map"><b>Country</b><ArrowRight /><b>country</b><span className="ft-chip p">Lookup</span></div>
    <div className="ft-map"><b>Tax ID</b><ArrowRight /><b className="m-b"><span className="m-off">Choose a field</span><span className="m-on">taxRegistrationNumber</span></b><span className="ft-chip p m-on">Remove spaces</span></div>
    <div className="ft-prev"><small>Preview</small><code>&quot; DE 811 907 980 &quot;</code><span className="r-on"><ArrowRight /></span><code className="r-on">DE811907980</code></div>
    <div className="ft-evi"><Sparkles />EVI suggestion<span className="ft-chip ok">High confidence</span></div>
  </div>
);

const BuilderVisual = () => (
  <div className="ft-canvas" aria-hidden>
    <span className="ft-canvas-lab">Shopify orders to NetSuite sales orders</span>
    <span className="ft-chip ok ft-canvas-res">Test passed</span>
    <ol className="ft-flow">
      {FLOW.map(([k, name, ic], i) => { const I = ic; return (
        <li key={name} className={i === 0 ? "first" : i === FLOW.length - 1 ? "last" : undefined}>
          <span><I /></span><small>{k}</small><b>{name}</b>
        </li>
      ); })}
    </ol>
    <div className="ft-legend"><small>Node library</small>
      {NODES.map((n) => { const I = n.icon; return <span key={n.t}><I />{n.t}</span>; })}
    </div>
    <div className="bd-bar"><span className="cn-btn pri bd-run"><Play />Run Test</span><span className="cn-btn">Save</span><span className="cn-btn"><Plus />Add node</span></div>
  </div>
);

const ExecutionsVisual = () => (
  <div className="ft-card" aria-hidden>
    <div className="ex-top">
      <div className="cn-hd"><div><h4>Monitoring</h4><p>Every execution is traceable from integration to workflow node to record outcome.</p></div></div>
      <div className="ex-stats"><div><small>Executions</small><b>102</b></div><div><small>Success rate</small><b>94.1%</b></div><div><small>Failed executions</small><b className="bad">6</b></div></div>
      <div className="ex-tabs"><b>Executions<i>103</i></b><span>Error queue<i>12</i></span><span>Connection alerts<i>3</i></span></div>
    </div>
    <div className="ft-ex head"><span>Execution ID</span><span>Integration</span><span>Records</span><span>Outcome</span></div>
    <div className="ft-ex"><b>EX-20493</b><span>Shopify orders → NetSuite sales orders</span><span>10 ok</span><span className="ft-chip ok">Success</span></div>
    <div className="ft-ex"><b>EX-20492</b><span>NetSuite inventory → Shopify stock</span><span>214 ok</span><span><span className="ft-chip p x-off">Running</span><span className="ft-chip ok x-on">Success</span></span></div>
    <div className="ft-ex"><b>EX-20491</b><span>HubSpot accounts → NetSuite customers</span><span>9 ok · 3 failed</span><span className="ft-chip warn">Partial failure</span></div>
    <div className="ft-ex"><b>EX-20490</b><span>NetSuite inventory → Shopify stock</span><span>116 ok · 5 failed</span><span className="ft-chip warn">Partial failure</span></div>
  </div>
);

const MonitoringVisual = () => (
  <div className="ft-card light" aria-hidden>
    <div className="ft-hd"><b>EX-20491</b><span className="ft-chip warn h-off">Partial failure</span><span className="ft-chip p h-on">Retry queued</span></div>
    <p className="mo-int">HubSpot accounts → NetSuite customers</p>
    <div className="mo-btns"><span className="cn-btn mo-evi"><img src={`${IMG}/characters/evi-head.webp`} alt="" />Diagnose with EVI</span><span className="cn-btn">Correct configuration</span><span className="cn-btn pri mo-retry">Retry eligible (3)</span></div>
    <ol className="ft-path">
      <li className="ok"><span><Check /></span>Trigger</li>
      <li className="ok"><span><Check /></span>Retrieve record</li>
      <li className="err"><span><X /></span>Validate required fields</li>
      <li><span /></li>
    </ol>
    <code className="ft-code">Required field &quot;taxRegistrationNumber&quot; is empty</code>
    <div className="ft-find"><small>Likely cause <i>inferred</i></small><p>Accounts created before March have no tax ID, and the destination requires it for EMEA customers.</p></div>
    <div className="ft-find act"><small>Suggested action</small><p>Add a default or a conditional skip for accounts without a tax ID.</p></div>
  </div>
);

const ReportsVisual = () => (
  <div className="ft-card rp" aria-hidden>
    <div className="cn-hd"><div><h4>Execution activity</h4><p>Runs by time, integration, application and trigger.</p></div><span className="cn-btn rp-exp"><Download /><span className="e-off">Export CSV</span><span className="e-on">CSV exported</span></span></div>
    <div className="ex-stats rp-stats"><div><small>Executions</small><b>102</b></div><div><small>Records processed</small><b>4,657</b></div><div className="rp-sr"><small>Success rate</small><b>94.1%</b></div><div><small>Avg duration</small><b>34s</b></div></div>
    <div className="rp-box">
      <div className="rp-ct"><b>Runs over time</b><span className="rp-key"><span><i />Succeeded</span><span><i className="b" />Failed</span></span></div>
      <div className="ft-chart">
        {BARS.map(([ok, bad], k) => <span key={k} style={{ ["--i" as string]: k }}><i className="b" style={{ height: `${bad}%` }} /><i style={{ height: `${ok}%` }} /></span>)}
      </div>
    </div>
  </div>
);

const AgentsVisual = () => (
  <div className="ft-card" aria-hidden>
    <div className="cn-hd"><div><h4>Needs your approval</h4><p>The Sync Agent prepares each change and waits for you.</p></div></div>
    <div className="ap-list">
      <div className="ap-row"><img src="/characters/agents/sync.webp" alt="" /><span><b>Make &quot;Tax ID&quot; optional for non-EMEA accounts</b><small>Error Diagnosis · HubSpot accounts → NetSuite customers</small></span><span className="ft-chip warn">Pending approval</span></div>
      <div className="ap-row"><img src="/characters/agents/sync.webp" alt="" /><span><b>Retry 2 failed records</b><small>Integration Management · Shopify orders → NetSuite</small></span><span className="ft-chip warn">Pending approval</span></div>
    </div>
    <div className="ft-find act"><small>Proposal from the Sync Agent</small><p>Add a default or a conditional skip for accounts without a tax ID.</p></div>
    <div className="ft-review-chips"><span>Observed facts</span><span>Inference</span><span>Proposed changes</span><span>Before and after</span><span>Risk</span></div>
    <div className="ft-review-btns"><span>Reject</span><span className="pri">Approve Proposal</span></div>
    <span className="ft-chip ok d-on">Approved and recorded</span>
  </div>
);

const SecurityVisual = () => (
  <div className="ft-card" aria-hidden>
    <div className="cn-hd"><div><h4>Security</h4><p>Organization-wide configuration for EVOQ Sync.</p></div></div>
    <div className="se-note"><ShieldCheck /><span><b>Secrets are never shown.</b> Credentials are encrypted and redacted from logs and AI context.</span></div>
    <div className="ft-sw se-mfa"><span className="se-l"><b>Require multi-factor authentication</b><small>All users must verify with a second factor.</small></span><span className="sx-switch"><i /></span></div>
    <div className="ft-sw"><span className="se-l"><b>Single sign-on (SAML)</b><small>Available on supported plans.</small></span><span className="sx-switch"><i /></span></div>
    <div className="ft-sw se-ip"><span className="se-l"><b>Restrict access by IP allow-list</b><small>Only allow sign-in from approved networks.</small></span><span className="sx-switch"><i /></span></div>
    <div className="ft-sw se-mask"><span className="se-l"><b>Mask sensitive data in logs and AI context</b><small>Tokens, passwords, API keys and personal data are redacted.</small></span><span className="sx-switch on"><i /></span></div>
  </div>
);

/* ---------- the nine features ---------- */
/* Each feature is a screen of the app with a user trying it: a cursor goes from place to place, a tag of a few words
   follows it, and its clicks change the screen. */
type Act = { to: string; tag: string; hold: number; click?: boolean; auto?: boolean; fx?: number; fy?: number };
type Feature = {
  id: string; group: string; name: string; icon: LucideIcon; tag: string; lead: string; rest: string;
  what: ReactNode; use: string; nav: string; visual: ReactNode; demo: Act[];
};

const FEATURES: Feature[] = [
  {
    id: "connections", group: "Set up", name: "Connections", icon: Plug, tag: "Application connections", nav: "connections",
    lead: "Connect the applications", rest: "you want to sync.", visual: <ConnectionsVisual />,
    what: <p>Select applications from the EVOQ Sync catalog, or connect any other application through its API with a Custom REST API Connection. Authorize each connection and reuse it across your integrations.</p>,
    use: "Lets EVOQ Sync sign in to your applications, so every integration can reuse the same saved login.",
    demo: [
      { to: ".cn-s", tag: "Search the catalog", hold: 2500, fx: 0.3 },
      { to: ".cn-card.shop .cn-btn.s-off", tag: "Authorize it once", hold: 2700, click: true },
      { to: ".cn-card.hub", tag: "Reuse in any integration", hold: 2500, fx: 0.5, fy: 0.3 },
      { to: ".cn-btn.api", tag: "Not listed? Use its API", hold: 2700, click: true },
    ],
  },
  {
    id: "integrations", group: "Set up", name: "Integrations", icon: LayoutTemplate, tag: "Integration configuration and management", nav: "integrations",
    lead: "Choose which data syncs", rest: "and in which direction.", visual: <IntegrationsVisual />,
    what: <p>An integration specifies the applications involved, the data being synchronized, the direction of movement and the rules that govern the process. Use the guided configuration process to establish these details before activation.</p>,
    use: "Decides which information moves between two applications, in which direction and under which rules.",
    demo: [
      { to: ".iw-in", tag: "Name it", hold: 2500, fx: 0.4 },
      { to: ".iw-continue", tag: "Map the fields", hold: 2300, click: true },
      { to: ".iw-continue", tag: "Test it first", hold: 2300, click: true },
      { to: ".iw-continue", tag: "Switch it on", hold: 2700, click: true },
    ],
  },
  {
    id: "mapping", group: "Set up", name: "Data mapping", icon: Shuffle, tag: "Data mapping and transformation", nav: "integrations",
    lead: "Map fields between your applications", rest: "and format their values.", visual: <MappingVisual />,
    what: <p>Your CRM and ERP may describe the same information differently. Data mapping defines how fields correspond, while transformation rules prepare values for the destination application.</p>,
    use: "Makes sure each value lands in the right field, in the format the destination expects.",
    demo: [
      { to: ".ft-map:nth-child(6) .m-b", tag: "Pick the field", hold: 2200, click: true, fx: 0.4 },
      { to: ".ft-map:nth-child(6) .ft-chip", tag: "Clean up the value", hold: 2400, click: true },
      { to: ".ft-prev", tag: "Preview before it runs", hold: 2200, fx: 0.5 },
      { to: ".ft-evi", tag: "Check EVI's suggestions", hold: 2200, fx: 0.4 },
    ],
  },
  {
    id: "builder", group: "Set up", name: "Workflow builder", icon: Workflow, tag: "Visual workflow builder", nav: "builder",
    lead: "Build and test the steps of a sync", rest: "on a visual canvas.", visual: <BuilderVisual />,
    what: <p>Create and edit integration workflows on a visual canvas. Arrange the steps, define their settings and test how information moves through the workflow.</p>,
    use: "Shows the steps an integration follows and lets you change them without writing code.",
    demo: [
      { to: ".ft-legend span:nth-child(5)", tag: "Pick a step", hold: 2200, click: true },
      { to: ".ft-flow li:nth-child(4)", tag: "It joins the workflow", hold: 2000, fx: 0.5 },
      { to: ".bd-run", tag: "Test on sample data", hold: 3400, click: true },
    ],
  },
  {
    id: "executions", group: "Run", name: "Executions", icon: Play, tag: "Integration execution and management", nav: "monitoring",
    lead: "See which syncs worked", rest: "and which need attention.", visual: <ExecutionsVisual />,
    what: <p>Review the status of your integrations and inspect individual executions to understand how each run progressed.</p>,
    use: "Tells you whether each run worked, how long it took and how many records it handled.",
    demo: [
      { to: ".ft-ex.head", tag: "Every run in one place", hold: 2000, fx: 0.4 },
      { to: ".ft-ex:nth-child(4) .ft-chip", tag: "A run finishes", hold: 2400, auto: true },
      { to: ".ft-ex:nth-child(5)", tag: "Open a run to see why", hold: 2600, click: true, fx: 0.6 },
    ],
  },
  {
    id: "monitoring", group: "Run", name: "Monitoring", icon: Radar, tag: "Integration monitoring and troubleshooting", nav: "monitoring",
    lead: "Find out why a sync failed", rest: "and what to do next.", visual: <MonitoringVisual />,
    what: <p>Monitoring brings execution activity, errors and connection alerts into view. When a run fails, inspect the details instead of relying on an error code alone.</p>,
    use: "Explains why a run failed and what to do next, so you do not have to read raw logs.",
    demo: [
      { to: ".ft-path li.err>span", tag: "A sync failed", hold: 2000 },
      { to: ".ft-code", tag: "See the exact error", hold: 2200, fx: 0.4 },
      { to: ".mo-evi", tag: "Diagnose with EVI", hold: 2600, click: true },
      { to: ".ft-find.act", tag: "Cause and suggested fix", hold: 2600, fx: 0.4 },
      { to: ".mo-retry", tag: "Retry the failed records", hold: 2700, click: true },
    ],
  },
  {
    id: "reports", group: "Improve and control", name: "Reports", icon: ChartColumn, tag: "Reports and analytics", nav: "reports",
    lead: "See how your syncs perform", rest: "over time.", visual: <ReportsVisual />,
    what: <p>Use reports to review integration volume, reliability, performance and application health.</p>,
    use: "Shows how your integrations perform over time, so you can spot what needs attention.",
    demo: [
      { to: ".rp-sr", tag: "Success rate at a glance", hold: 2300, fx: 0.5 },
      { to: ".ft-chart>span:nth-child(7) i.b", tag: "Spot what needs attention", hold: 2500, fx: 0.5, fy: 0.5 },
      { to: ".rp-exp", tag: "Take it with you", hold: 2700, click: true },
    ],
  },
  {
    id: "evi", group: "Improve and control", name: "EVI and Sync Agent", icon: Sparkles, tag: "EVI and Sync Agent", nav: "agents",
    lead: "Ask EVI for help.", rest: "Review what the Sync Agent proposes.", visual: <AgentsVisual />,
    what: <p>EVI helps you understand the integration screen you are working on. The Sync Agent prepares proposals for specialist integration tasks.</p>,
    use: "Helps you understand a problem and prepares a fix. Nothing changes until you approve it.",
    demo: [
      { to: ".ap-row:first-child", tag: "Open what needs approval", hold: 2300, click: true },
      { to: ".ft-find.act", tag: "The Sync Agent proposes a fix", hold: 2400, fx: 0.4 },
      { to: ".ft-review-chips span:nth-child(2)", tag: "Facts kept apart from inference", hold: 2400 },
      { to: ".ft-review-btns span.pri", tag: "You decide", hold: 2800, click: true },
    ],
  },
  {
    id: "security", group: "Improve and control", name: "Security", icon: ShieldCheck, tag: "Security, access and governance", nav: "settings",
    lead: "Manage access to EVOQ Sync", rest: "and keep an audit history.", visual: <SecurityVisual />,
    what: <p>EVOQ Sync includes administrative controls for managing access, security settings and agent permissions.</p>,
    use: "Controls who can view and change integrations, and keeps a record of decisions.",
    demo: [
      { to: ".se-mfa .sx-switch", tag: "Turn on multi-factor", hold: 2400, click: true, fx: 0.5 },
      { to: ".se-ip .sx-switch", tag: "Limit sign-in to your networks", hold: 2600, click: true, fx: 0.5 },
      { to: ".se-note", tag: "Secrets stay hidden", hold: 2300, fx: 0.4 },
    ],
  },
];

/* the app's own navigation: a slim rail of icons, with no names, so nothing here repeats the list on the left */
const APP_RAIL: [string, LucideIcon][] = [
  ["overview", LayoutDashboard],
  ["connections", Plug],
  ["integrations", ArrowLeftRight],
  ["builder", Workflow],
  ["monitoring", Activity],
  ["reports", ChartColumn],
  ["agents", Sparkles],
  ["settings", Settings],
];

/* ---------- the explorer ---------- */
function useMobile() {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia("(max-width:639px)"); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia("(max-width:639px)").matches,
    () => false,
  );
}

function useHash() {
  return useSyncExternalStore(
    (cb) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); },
    () => window.location.hash.slice(1),
    () => "",
  );
}

function useReduced() {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia("(prefers-reduced-motion: reduce)"); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const IDLE = { i: -1, p: 0, x: 0, y: 0, flip: false };

/* plays the acts one after another and loops; i is the act, p turns 1 when its click lands */
function useDemo(acts: Act[], active: boolean, paused: boolean, page: RefObject<HTMLDivElement | null>, onEnd?: () => void) {
  const reduce = useReduced();
  const [d, setD] = useState(IDLE);
  const end = useRef(onEnd);
  useEffect(() => { end.current = onEnd; });

  useEffect(() => {
    if (!active || paused || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const go = (i: number) => {
      const box = page.current;
      const el = box?.querySelector<HTMLElement>(acts[i].to);
      if (!box || !el) return;
      const r = el.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      const x = r.left - b.left + r.width * (acts[i].fx ?? 0.6);
      const y = r.top - b.top + r.height * (acts[i].fy ?? 0.55);
      setD({ i, p: 0, x, y, flip: x > b.width - 200 });
      if (acts[i].click || acts[i].auto) at(() => setD((s) => ({ ...s, p: 1 })), 950);
      if (i + 1 < acts.length) at(() => go(i + 1), acts[i].hold);
      else {
        // when the tour is running, the next feature takes over; otherwise the same demo plays again
        at(() => { setD(IDLE); end.current?.(); }, acts[i].hold);
        at(() => go(0), acts[i].hold + 1300);
      }
    };
    at(() => go(0), 700);
    return () => timers.forEach(clearTimeout);
  }, [acts, active, paused, reduce, page]);

  // leaving the feature puts the screen back to how it began
  useEffect(() => () => setD(IDLE), [active]);

  // reduced motion: no cursor, the screen shows where the demo ends
  return reduce ? { ...IDLE, i: acts.length - 1, p: 1 } : d;
}

/* the app window: a screen of the app, and a cursor using it */
function Win({ f, active, onEnd }: { f: Feature; active: boolean; onEnd?: () => void }) {
  const [paused, setPaused] = useState(false);
  const page = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  const d = useDemo(f.demo, active, paused, page, onEnd);

  return (
    <div className="fm-win" id={`fm-${f.id}`} role="tabpanel" aria-labelledby={`fmb-${f.id}`} hidden={!active}>
      <div className="fm-bar"><div className="ft-dots"><i /><i /><i /></div><span>EVOQ Sync</span></div>
      <div className="app demo" data-f={f.id} data-a={d.i} data-p={d.p}>
        <aside className="app-rail" aria-hidden>
          <SyncMark size={30} />
          {APP_RAIL.map(([k, I]) => <span key={k} className={k === f.nav ? "on" : undefined}><I /></span>)}
        </aside>
        <div className="app-main">
          <div className="app-top" aria-hidden>
            <span className="app-org"><b>EV</b><span><i>EVOQ Demo Org</i><small>Production workspace</small></span><ChevronDown /></span>
            <span className="app-search"><Search /><span>Search integrations, apps, executions</span><kbd>Ctrl K</kbd></span>
            <span className="app-create"><Plus />Create Integration</span>
            <i className="app-av" />
          </div>
          <div ref={page} className={`app-page fb-stage${active ? " hs-in" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {f.visual}
            {!reduce && (
              <div className={`app-cur${d.i >= 0 ? " on" : ""}${d.flip ? " flip" : ""}`} style={{ transform: `translate(${d.x}px,${d.y}px)` }} aria-hidden>
                <svg viewBox="0 0 20 20" fill="none"><path d="M3 2.5 15.5 8.8 9.8 10.3 8 16.2 3 2.5Z" fill="#1F2430" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                {d.i >= 0 && <span className="app-cur-tag" key={d.i}>{f.demo[d.i].tag}</span>}
                {d.p === 1 && f.demo[d.i]?.click && <i className="app-cur-rip" key={`r${d.i}`} />}
              </div>
            )}
          </div>
          <img className="app-evi" src={`${IMG}/characters/evi-head.webp`} alt="" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function Explorer() {
  const hash = useHash();
  const mobile = useMobile();
  const [sel, setSel] = useState<{ id: string; hash: string } | null>(null);
  // a link to another feature (a changed address hash) wins over the last click
  const id = hash !== sel?.hash && FEATURES.some((f) => f.id === hash) ? hash : sel?.id ?? FEATURES[0].id;

  // the features take turns on their own until someone picks one; then the visitor is in control
  const [tour, setTour] = useState(true);
  const next = () => {
    const k = FEATURES.findIndex((f) => f.id === id);
    setSel({ id: FEATURES[(k + 1) % FEATURES.length].id, hash });
  };
  const go = (nid: string) => {
    window.history.replaceState(null, "", `#${nid}`);
    setSel({ id: nid, hash: nid });
    setTour(false);
  };
  const win = (f: Feature) => <Win key={f.id} f={f} active={f.id === id} onEnd={tour && !mobile && f.id === id ? next : undefined} />;

  return (
    <section className="sx-sec sx-out fm-sec" id="features-explorer">
      <div className="sx-in">
        <div className="fm">
          <ul className="fm-list" role={mobile ? undefined : "tablist"} aria-orientation="vertical" aria-label="Features">
            {FEATURES.map((f, k) => {
              const on = f.id === id;
              const I = f.icon;
              return (
                <li key={f.id} id={f.id} className={`fm-item${on ? " on" : ""}`}>
                  {(k === 0 || FEATURES[k - 1].group !== f.group) && <span className="fm-g">{f.group}</span>}
                  <button
                    type="button"
                    id={`fmb-${f.id}`}
                    role={mobile ? undefined : "tab"}
                    aria-selected={mobile ? undefined : on}
                    aria-expanded={mobile ? on : undefined}
                    aria-controls={`fm-${f.id}`}
                    onClick={() => go(f.id)}
                  >
                    <span className="fm-ic"><I aria-hidden /></span>
                    <span className="fm-n">{f.name}</span>
                    <ChevronDown className="fm-chev" aria-hidden />
                  </button>
                  {on && (
                    <div className="fm-desc">
                      <p className="fm-t">{f.lead} <span className="t2">{f.rest}</span></p>
                      <div className="fm-what">{f.what}{mobile && <p className="fm-why"><b>Why it matters</b>{f.use}</p>}</div>
                    </div>
                  )}
                  {mobile && win(f)}
                </li>
              );
            })}
          </ul>
          {!mobile && (
            <div className="fm-col">
              {FEATURES.map(win)}
              <p className="fm-why fm-why-b" key={id}><b>Why it matters</b>{FEATURES.find((f) => f.id === id)?.use}</p>
            </div>
          )}
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
      <Explorer />
      <CtaBand
        lead="Start syncing"
        accent="your applications."
        text="Explore how EVOQ Sync handles application connections, data mapping, workflow configuration and integration monitoring."
      />
    </SyncShell>
  );
}

const css = `
  /* hero */
  .ft-hero{position:relative;padding-top:56px;padding-bottom:56px;overflow:hidden;background:radial-gradient(900px 460px at 0 0,${C.tint},rgba(255,255,255,0) 70%),radial-gradient(700px 400px at 100% 10%,#FADDEC,rgba(255,255,255,0) 70%),#fff}
  .fh{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center}
  .fh-tag{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.soft};font-size:13px;font-weight:700;color:${C.primary}}
  .fh-tag svg{width:14px;height:14px}
  .ft-hero h1{margin-top:22px!important;max-width:18ch}
  .ft-hero h1 .t2{color:#8E8C96}
  .ft-hero-copy>p{max-width:50ch;margin:22px 0 0;font-size:18px;line-height:1.62}
  .fh-stage{position:relative;height:540px;border-radius:32px;background:radial-gradient(520px 300px at 85% 0,rgba(168,85,247,.5),transparent 70%),radial-gradient(420px 260px at 0 100%,rgba(163,230,53,.16),transparent 70%),${C.depth};overflow:hidden;isolation:isolate}
  .fh-stage::before{content:"";position:absolute;inset:0;z-index:-1;background-image:radial-gradient(rgba(255,255,255,.14) 1px,transparent 1.5px);background-size:24px 24px;-webkit-mask-image:radial-gradient(ellipse at center,#000 25%,transparent 80%);mask-image:radial-gradient(ellipse at center,#000 25%,transparent 80%)}
  .fh-card{position:absolute;display:grid;gap:10px;padding:16px;border-radius:18px;background:#fff;box-shadow:0 30px 60px -26px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.5);animation:fhFloat 7s ease-in-out infinite}
  .fh-card.c1{left:6%;top:7%;width:46%}
  .fh-card.c2{right:5%;top:34%;width:56%;animation-delay:-2s}
  .fh-card.c3{left:8%;bottom:7%;width:44%;animation-delay:-4s}
  .fh-card.c4{right:9%;bottom:9%;width:42%;animation-delay:-1s}
  @keyframes fhFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  .fh-k{font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.muted}}
  .fh-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .fh-app{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:12px;background:${C.g1}}
  .fh-app b{flex:1;min-width:0;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;color:${C.ink};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .fh-card .ft-path li{font-size:11.5px}
  .fh-card .ft-code{font-size:11.5px;padding:9px 11px}
  .fh-evi{display:flex;align-items:center;gap:10px}
  .fh-evi img{width:34px;height:34px;border-radius:50%;background:${C.tint}}
  .fh-evi b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${C.ink}}
  .fh-evi small{font-size:12px;color:${C.muted}}
  .fh-card>p{margin:0;font-size:13px;line-height:1.5;color:${C.body}}
  .fh-card>.ft-chip{justify-self:start}
  .fh-map{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;background:${C.g1};font-size:12.5px;color:${C.ink}}
  .fh-map svg{width:14px;height:14px;color:${C.primary};flex-shrink:0}
  .fh-map b{font-weight:600;overflow:hidden;text-overflow:ellipsis}
  @media (prefers-reduced-motion:reduce){.fh-card{animation:none}}

  /* a feature block: numbered title, one large stage, capability cards */
  .fb-stage{position:relative;display:flex;flex-direction:column;justify-content:center;gap:0;padding:56px;border-radius:32px;overflow:hidden}
  .fb-stage.s1{background:linear-gradient(135deg,#E6ECFF 0,#E8DBFB 55%,#FADDEC 100%)}
  .fb-stage.s2{background:linear-gradient(135deg,#FDE8D6 0,#F8DCEF 50%,#E3DCFB 100%)}
  .fb-stage.s3{background:linear-gradient(135deg,#D9F3EA 0,#E2EAFB 55%,#EBDDFB 100%)}
  .fb-stage.s4{background:radial-gradient(700px 360px at 85% 0,rgba(168,85,247,.55),transparent 70%),radial-gradient(500px 300px at 0 100%,rgba(163,230,53,.16),transparent 70%),#3B1A7A}
  .fb-stage>.ft-card,.fb-stage>.ft-canvas{width:100%;max-width:700px;margin:0 auto}
  .fb-stage>.ft-card.wide,.fb-stage>.ft-canvas{max-width:none}
  .sx-dark{background:${C.depth}}

  .ft-chip{display:inline-block;padding:3px 10px;border-radius:999px;background:${C.g1};color:${C.body};font-size:12px;font-weight:700;white-space:nowrap}
  .ft-chip.ok{background:#DCFCE7;color:#166534}
  .ft-chip.bad{background:#FEE2E2;color:#991B1B}
  .ft-chip.warn{background:#FEF3C7;color:#92400E}
  .ft-chip.p{background:${C.tint};color:${C.primary}}

  /* app window cards */
  .ft-card{display:grid;gap:10px;padding:22px;border-radius:22px;background:#fff;box-shadow:0 40px 80px -36px rgba(46,16,101,.55),0 0 0 1px rgba(255,255,255,.9)}
  .ft-dots{display:flex;gap:6px;margin-bottom:4px}
  .ft-dots i{width:10px;height:10px;border-radius:50%;background:#EF4444}
  .ft-dots i:nth-child(2){background:#F5B83D}
  .ft-dots i:nth-child(3){background:#22A55B}
  .ft-search{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:${C.g1};font-size:14px;color:${C.muted}}
  .ft-search svg{width:16px;height:16px}
  .ft-row{display:flex;align-items:center;gap:14px;padding:13px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-row>div{flex:1;min-width:0}
  .ft-row b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${C.ink}}
  .ft-row small{display:block;font-size:13px;color:${C.muted}}
  .ft-row em{font-style:normal;font-size:22px;line-height:1;color:${C.muted}}
  .ft-row.api{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.soft}}
  .ft-api{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:${C.primary};color:#fff;flex-shrink:0}
  .ft-api svg{width:17px;height:17px}
  .ft-hd{display:flex;align-items:center;gap:8px;padding:0 2px 4px}
  .ft-hd svg{width:16px;height:16px;color:${C.primary}}
  .ft-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${C.ink}}
  .ft-hd .ft-chip{margin-left:auto}
  .ft-map{display:grid;grid-template-columns:1fr auto 1fr auto;align-items:center;gap:10px;padding:13px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-map b{font-size:14px;font-weight:600;color:${C.ink};overflow:hidden;text-overflow:ellipsis}
  .ft-map svg{width:15px;height:15px;color:${C.muted}}
  .ft-prev{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 14px;border-radius:12px;background:#120B24;color:#fff}
  .ft-prev small{font-size:12px;color:#B9A8D8}
  .ft-prev code{font-size:12.5px;color:#E9D5FF}
  .ft-prev svg{width:14px;height:14px;color:${C.lime}}
  .ft-evi{display:flex;align-items:center;gap:8px;padding:11px 14px;border-radius:12px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft};font-size:14px;font-weight:600;color:${C.primary}}
  .ft-evi svg{width:16px;height:16px}
  .ft-evi .ft-chip{margin-left:auto}
  .ft-ex{display:grid;grid-template-columns:1.1fr 1.3fr .8fr .7fr;align-items:center;gap:10px;padding:14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:14px;color:${C.body}}
  .ft-ex b{font-family:var(--font-display),system-ui,sans-serif;color:${C.ink}}
  .ft-ex.head{background:transparent;box-shadow:none;padding-top:2px;padding-bottom:2px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:${C.muted}}
  .ft-path{list-style:none;margin:0;padding:6px 2px 4px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
  .ft-path li{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;font-size:13px;font-weight:500;line-height:1.3;color:${C.ink}}
  .ft-path li:not(:last-child)::after{content:"";position:absolute;top:14px;left:calc(50% + 18px);right:calc(-50% + 18px);height:2px;background:#DDD8E5}
  .ft-path li.ok:not(:last-child)::after{background:${C.ok};opacity:.5}
  .ft-path li>span{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#DDD8E5;color:#fff}
  .ft-path li.ok>span{background:${C.ok}}
  .ft-path li.err>span{background:${C.err};box-shadow:0 0 0 5px rgba(220,38,38,.15)}
  .ft-path li>span svg{width:14px;height:14px}
  .ft-code{display:block;padding:12px 14px;border-radius:12px;background:#120B24;color:#FECACA;font-size:13px;white-space:pre-wrap}
  .ft-find{padding:14px;border-radius:12px;background:${C.g1}}
  .ft-find small{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:${C.muted}}
  .ft-find small i{padding:1px 8px;border-radius:999px;background:#EFF6FF;color:#1D4ED8;font-style:normal;font-size:11px;font-weight:600;text-transform:none;letter-spacing:0}
  .ft-find p{margin:4px 0 0;font-size:14px;line-height:1.5;color:${C.ink}}
  .ft-find.act{background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft}}
  .ft-find .ft-chip{margin-top:8px}

  /* integrations: a guided setup */
  .ft-lead{margin:0;font-size:14.5px;line-height:1.5;color:${C.body}}
  .ft-ways{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  .ft-ways li{display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;color:${C.ink}}
  .ft-ways li.on{background:${C.depth};box-shadow:none;color:#fff}
  .ft-ways li>span{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:11px;background:${C.tint};color:${C.primary};flex-shrink:0}
  .ft-ways li.on>span{background:rgba(255,255,255,.12);color:${C.lime}}
  .ft-ways li>span svg{width:18px;height:18px}
  .ft-steps{list-style:none;margin:6px 0 0;padding:16px 4px 4px;display:grid;grid-template-columns:repeat(6,1fr);gap:4px;border-top:1px solid ${C.line}}
  .ft-steps li{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
  .ft-steps li:not(:last-child)::after{content:"";position:absolute;top:13px;left:calc(50% + 17px);right:calc(-50% + 17px);height:2px;background:#DDD8E5}
  .ft-steps li.done:not(:last-child)::after{background:${C.ok};opacity:.5}
  .ft-steps li>span{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line};font-size:12.5px;font-weight:700;color:${C.muted}}
  .ft-steps li.done>span{background:${C.ok};box-shadow:none;color:#fff}
  .ft-steps li.now>span{background:${C.primary};box-shadow:0 0 0 5px ${C.tint};color:#fff}
  .ft-steps li>span svg{width:14px;height:14px}
  .ft-steps b{margin-top:6px;font-size:13.5px;color:${C.ink}}
  .ft-steps small{font-size:12px;line-height:1.35;color:${C.muted}}

  /* builder canvas */
  .ft-canvas{position:relative;padding:60px 26px 26px;border-radius:22px;background-color:#fff;background-image:radial-gradient(${C.soft} 1px,transparent 1.3px);background-size:22px 22px;box-shadow:0 40px 80px -36px rgba(46,16,101,.5)}
  .ft-canvas-lab{position:absolute;left:26px;top:22px;font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.muted}}
  .ft-flow{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(5,1fr);gap:22px}
  .ft-flow li{position:relative;display:flex;flex-direction:column;gap:4px;padding:16px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 14px 26px -16px rgba(46,16,101,.45)}
  .ft-flow li:not(:last-child)::after{content:"";position:absolute;top:34px;left:100%;width:22px;height:2px;background:repeating-linear-gradient(90deg,${C.action} 0 4px,transparent 4px 8px)}
  .ft-flow li>span{display:flex;align-items:center;justify-content:center;width:36px;height:36px;margin-bottom:8px;border-radius:11px;background:${C.tint};color:${C.primary}}
  .ft-flow li.first>span{background:${C.primary};color:#fff}
  .ft-flow li.last>span{background:${C.lime};color:${C.limeInk}}
  .ft-flow li>span svg{width:18px;height:18px}
  .ft-flow small{font-size:11.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${C.muted}}
  .ft-flow b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;line-height:1.3;color:${C.ink}}
  .ft-legend{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:22px;padding-top:18px;border-top:1px solid ${C.line}}
  .ft-legend small{margin-right:6px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.muted}}
  .ft-legend span{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;background:${C.g1};font-size:12.5px;font-weight:600;color:${C.ink}}
  .ft-legend svg{width:14px;height:14px;color:${C.primary}}

  /* reports and security tiles */
  .ft-tiles{list-style:none;margin:0;padding:0;display:grid;gap:14px}
  .ft-tiles.three{grid-template-columns:repeat(3,1fr)}
  .ft-tiles li{display:flex;align-items:center;gap:14px;padding:22px;border-radius:20px;background:#fff;box-shadow:0 20px 40px -26px rgba(46,16,101,.5)}
  .ft-tiles li>span{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;background:${C.tint};color:${C.primary};flex-shrink:0}
  .ft-tiles li>span svg{width:22px;height:22px}
  .ft-tiles li b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600;line-height:1.35;color:${C.ink}}
  .ft-tabs{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
  .ft-tabs li{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:${C.g1};font-size:12.5px;font-weight:600;color:${C.body}}
  .ft-tabs li.on{background:${C.primary};color:#fff}
  .ft-tabs svg{width:14px;height:14px}
  .ft-chart{display:grid;grid-template-columns:repeat(14,1fr);align-items:end;gap:8px;height:170px;margin-top:10px;padding:14px 14px 0;border-radius:14px;background:linear-gradient(180deg,${C.g1},#fff);border-bottom:1px solid ${C.line}}
  .ft-chart>span{display:flex;flex-direction:column;justify-content:flex-end;height:100%;gap:2px}
  .ft-chart i{display:block;border-radius:4px 4px 0 0;background:${C.action}}
  .ft-chart i.b{background:${C.err};border-radius:4px}
  .ft-chart-key{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:4px;font-size:12.5px;color:${C.muted}}
  .ft-chart-key span:not(.ft-pill){display:inline-flex;align-items:center;gap:6px}
  .ft-chart-key i{width:10px;height:10px;border-radius:3px;background:${C.action}}
  .ft-chart-key i.b{background:${C.err}}
  .ft-chart-key .ft-pill{margin-left:auto;padding:6px 12px;font-size:12.5px;box-shadow:inset 0 0 0 1px ${C.line}}
  .ft-rec{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:28px;padding-top:24px;border-top:1px solid rgba(46,16,101,.14)}
  .ft-rec p{flex:1;min-width:260px;margin:0;font-size:15.5px;line-height:1.55;color:#4B4863}
  .ft-pill{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;background:#fff;box-shadow:0 8px 18px -10px rgba(40,30,70,.4);font-size:14px;font-weight:600;color:${C.ink}}
  .ft-pill svg{width:16px;height:16px;color:${C.primary}}

  /* EVI and Sync Agent bento */
  .ft-bento{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}
  .ft-b{display:flex;flex-direction:column;padding:30px;border-radius:24px;background:#fff;box-shadow:0 24px 50px -32px rgba(46,16,101,.5)}
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
  .ft-review-copy h3{color:#fff}
  .ft-review-copy p{margin:12px 0 0;font-size:15.5px;line-height:1.6;color:#CDBEE8}
  .ft-review-vis{display:grid;gap:16px;flex-shrink:0}
  .ft-review-chips{display:flex;flex-wrap:wrap;gap:8px;max-width:420px}
  .ft-review-chips span{padding:6px 13px;border-radius:999px;background:rgba(163,230,53,.14);color:${C.lime};font-size:13px;font-weight:600}
  .ft-review-btns{display:flex;gap:10px}
  .ft-review-btns span{padding:11px 20px;border-radius:11px;background:#fff;color:${C.ink};font-size:14.5px;font-weight:600}
  .ft-review-btns span.pri{background:${C.lime};color:${C.limeInk}}

  /* motion: every visual plays when its stage scrolls into view, in the order the content describes */
  @keyframes ftUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes ftPop{0%{opacity:0;transform:scale(.55)}70%{opacity:1;transform:scale(1.1)}100%{opacity:1;transform:none}}
  @keyframes ftGrow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
  @keyframes ftLine{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes ftDash{to{background-position:8px 0}}
  @keyframes ftNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
  @keyframes ftShake{0%,100%{transform:none}20%,60%{transform:translateX(-3px)}40%,80%{transform:translateX(3px)}}
  @keyframes ftPulse{0%,100%{box-shadow:0 0 0 0 rgba(126,34,206,.0)}50%{box-shadow:0 0 0 6px rgba(126,34,206,.22)}}
  @keyframes ftPulseR{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0)}50%{box-shadow:0 0 0 6px rgba(220,38,38,.22)}}
  @keyframes ftNode{0%,16%,100%{box-shadow:0 0 0 1px ${C.line},0 14px 26px -16px rgba(46,16,101,.45)}5%,11%{box-shadow:0 0 0 2px ${C.action},0 0 0 8px rgba(168,85,247,.2),0 14px 26px -16px rgba(46,16,101,.45)}}

  /* cards: each row arrives in turn */
  .fb-stage.hs-in .ft-card>*{animation:ftUp .55s cubic-bezier(.2,.7,.2,1) both}
  .fb-stage.hs-in .ft-card>*:nth-child(1){animation-delay:0ms}
  .fb-stage.hs-in .ft-card>*:nth-child(2){animation-delay:110ms}
  .fb-stage.hs-in .ft-card>*:nth-child(3){animation-delay:220ms}
  .fb-stage.hs-in .ft-card>*:nth-child(4){animation-delay:330ms}
  .fb-stage.hs-in .ft-card>*:nth-child(5){animation-delay:440ms}
  .fb-stage.hs-in .ft-card>*:nth-child(6){animation-delay:550ms}
  .fb-stage.hs-in .ft-card>*:nth-child(7){animation-delay:660ms}
  .fb-stage.hs-in .ft-card>*:nth-child(8){animation-delay:770ms}
  .fb-stage.hs-in .ft-card>*:nth-child(9){animation-delay:880ms}
  .fb-stage.hs-in .ft-row .ft-chip,.fb-stage.hs-in .ft-ex .ft-chip,.fb-stage.hs-in .ft-map .ft-chip{animation:ftPop .45s both;animation-delay:.7s}
  .fb-stage.hs-in .ft-chip.bad{animation:ftPop .45s both .9s,ftPulseR 2.4s ease-in-out 1.6s infinite}
  .fb-stage.hs-in .ft-chip.warn{animation:ftPop .45s both .9s}
  .fb-stage.hs-in .ft-ex .ft-chip.p{animation:ftPop .45s both .8s,ftPulse 2s ease-in-out 1.5s infinite}
  .fb-stage.hs-in .ft-map svg{animation:ftNudge 1.8s ease-in-out 1.3s infinite}

  /* integrations: the setup steps tick off one by one */
  .fb-stage.hs-in .ft-ways li{animation:ftPop .5s both}
  .fb-stage.hs-in .ft-ways li:nth-child(1){animation-delay:300ms}
  .fb-stage.hs-in .ft-ways li:nth-child(2){animation-delay:440ms}
  .fb-stage.hs-in .ft-ways li:nth-child(3){animation-delay:580ms}
  .fb-stage.hs-in .ft-steps li>span{animation:ftPop .45s both}
  .fb-stage.hs-in .ft-steps li>span:nth-child(1){animation-delay:900ms}
  .fb-stage.hs-in .ft-steps li>span:nth-child(2){animation-delay:1160ms}
  .fb-stage.hs-in .ft-steps li>span:nth-child(3){animation-delay:1420ms}
  .fb-stage.hs-in .ft-steps li>span:nth-child(4){animation-delay:1680ms}
  .fb-stage.hs-in .ft-steps li>span:nth-child(5){animation-delay:1940ms}
  .fb-stage.hs-in .ft-steps li>span:nth-child(6){animation-delay:2200ms}
  .fb-stage.hs-in .ft-steps li::after{transform-origin:left;animation:ftLine .4s ease both}
  .fb-stage.hs-in .ft-steps li::after:nth-child(1){animation-delay:1000ms}
  .fb-stage.hs-in .ft-steps li::after:nth-child(2){animation-delay:1260ms}
  .fb-stage.hs-in .ft-steps li::after:nth-child(3){animation-delay:1520ms}
  .fb-stage.hs-in .ft-steps li::after:nth-child(4){animation-delay:1780ms}
  .fb-stage.hs-in .ft-steps li::after:nth-child(5){animation-delay:2040ms}
  .fb-stage.hs-in .ft-steps li::after:nth-child(6){animation-delay:2300ms}
  .fb-stage.hs-in .ft-steps li.now>span{animation:ftPop .45s both 1.9s,ftPulse 2s ease-in-out 2.6s infinite}

  /* workflow: the steps appear, then a highlight travels along them */
  .fb-stage.hs-in .ft-flow li{animation:ftUp .55s cubic-bezier(.2,.7,.2,1) both,ftNode 6.5s ease-in-out infinite}
  .fb-stage.hs-in .ft-flow li:nth-child(1){animation-delay:0ms,1400ms}
  .fb-stage.hs-in .ft-flow li:nth-child(2){animation-delay:180ms,2700ms}
  .fb-stage.hs-in .ft-flow li:nth-child(3){animation-delay:360ms,4000ms}
  .fb-stage.hs-in .ft-flow li:nth-child(4){animation-delay:540ms,5300ms}
  .fb-stage.hs-in .ft-flow li:nth-child(5){animation-delay:720ms,6600ms}
  .fb-stage.hs-in .ft-flow li:not(:last-child)::after{animation:ftDash .6s linear infinite}
  .fb-stage.hs-in .ft-legend span{animation:ftUp .5s both}
  .fb-stage.hs-in .ft-legend span:nth-child(1){animation-delay:1070ms}
  .fb-stage.hs-in .ft-legend span:nth-child(2){animation-delay:1140ms}
  .fb-stage.hs-in .ft-legend span:nth-child(3){animation-delay:1210ms}
  .fb-stage.hs-in .ft-legend span:nth-child(4){animation-delay:1280ms}
  .fb-stage.hs-in .ft-legend span:nth-child(5){animation-delay:1350ms}
  .fb-stage.hs-in .ft-legend span:nth-child(6){animation-delay:1420ms}
  .fb-stage.hs-in .ft-legend span:nth-child(7){animation-delay:1490ms}
  .fb-stage.hs-in .ft-legend span:nth-child(8){animation-delay:1560ms}

  /* monitoring: the run ticks through, fails, then the cause and the fix appear */
  .fb-stage.hs-in .ft-card.light .ft-path li>span{animation:ftPop .45s both}
  .fb-stage.hs-in .ft-card.light .ft-path li:nth-child(1)>span{animation-delay:.5s}
  .fb-stage.hs-in .ft-card.light .ft-path li:nth-child(2)>span{animation-delay:1s}
  .fb-stage.hs-in .ft-card.light .ft-path li:nth-child(3)>span{animation:ftPop .45s both 1.5s,ftShake .5s ease 2s,ftPulseR 2.4s ease-in-out 2.6s infinite}
  .fb-stage.hs-in .ft-card.light .ft-path li:nth-child(4)>span{animation-delay:1.7s}
  .fb-stage.hs-in .ft-card.light .ft-path li::after{transform-origin:left;animation:ftLine .4s ease both}
  .fb-stage.hs-in .ft-card.light .ft-path li:nth-child(1)::after{animation-delay:.7s}
  .fb-stage.hs-in .ft-card.light .ft-path li:nth-child(2)::after{animation-delay:1.2s}
  .fb-stage.hs-in .ft-card.light .ft-path li:nth-child(3)::after{animation-delay:1.7s}
  .fb-stage.hs-in .ft-card.light>.ft-code{animation-delay:2.1s}
  .fb-stage.hs-in .ft-card.light>.ft-find{animation-delay:2.5s}
  .fb-stage.hs-in .ft-card.light>.ft-find.act{animation-delay:3s}

  /* reports: bars rise one after another */
  .fb-stage.hs-in .ft-chart i{transform-origin:bottom;animation:ftGrow .7s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i) * 60ms + 350ms)}
  .fb-stage.hs-in .ft-tabs li{animation:ftUp .45s both}
  .fb-stage.hs-in .ft-tabs li:nth-child(1){animation-delay:150ms}
  .fb-stage.hs-in .ft-tabs li:nth-child(2){animation-delay:220ms}
  .fb-stage.hs-in .ft-tabs li:nth-child(3){animation-delay:290ms}
  .fb-stage.hs-in .ft-tabs li:nth-child(4){animation-delay:360ms}
  .fb-stage.hs-in .ft-tabs li:nth-child(5){animation-delay:430ms}
  .fb-stage.hs-in .ft-tabs li:nth-child(6){animation-delay:500ms}

  /* EVI and Sync Agent: EVI, the agent, then the review step */
  .fb-stage.hs-in .ft-b{animation:ftUp .6s cubic-bezier(.2,.7,.2,1) both}
  .fb-stage.hs-in .ft-b-evi{animation-delay:.05s}
  .fb-stage.hs-in .ft-b-agent{animation-delay:.3s}
  .fb-stage.hs-in .ft-b-review{animation-delay:.6s}
  .fb-stage.hs-in .ft-groups span,.fb-stage.hs-in .ft-review-chips span{animation:ftPop .4s both}
  .fb-stage.hs-in .ft-review-chips span:nth-child(1){animation-delay:1120ms}
  .fb-stage.hs-in .ft-review-chips span:nth-child(2){animation-delay:1240ms}
  .fb-stage.hs-in .ft-review-chips span:nth-child(3){animation-delay:1360ms}
  .fb-stage.hs-in .ft-review-chips span:nth-child(4){animation-delay:1480ms}
  .fb-stage.hs-in .ft-review-chips span:nth-child(5){animation-delay:1600ms}
  .fb-stage.hs-in .ft-review-btns span.pri{animation:ftPulse 2.2s ease-in-out 2.2s infinite}
  .fb-stage.hs-in .ft-groups>div:nth-child(1) span{animation-delay:.7s}
  .fb-stage.hs-in .ft-groups>div:nth-child(2) span{animation-delay:.85s}
  .fb-stage.hs-in .ft-groups>div:nth-child(3) span{animation-delay:1s}
  .fb-stage.hs-in .ft-groups>div:nth-child(4) span{animation-delay:1.15s}

  /* security: controls appear in turn */
  .fb-stage.hs-in .ft-tiles li{animation:ftPop .45s both}
  .fb-stage.hs-in .ft-tiles li:nth-child(1){animation-delay:230ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(2){animation-delay:310ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(3){animation-delay:390ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(4){animation-delay:470ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(5){animation-delay:550ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(6){animation-delay:630ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(7){animation-delay:710ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(8){animation-delay:790ms}
  .fb-stage.hs-in .ft-tiles li:nth-child(9){animation-delay:870ms}

  @media (prefers-reduced-motion:reduce){
    .fb-stage.hs-in *,.fb-stage.hs-in *::after{animation:none!important}
  }

  /* the explorer: the feature list on the left, a screen of the app on the right with its help running on its own */
  .fm-sec{padding-top:56px;padding-bottom:88px;background:#fff}
  .fm{display:grid;grid-template-columns:380px minmax(0,1fr);gap:0;align-items:start}
  .fm-list{padding-right:32px}
  .fm-list{list-style:none;margin:0;padding:0;position:sticky;top:24px;display:grid;gap:2px}
  .fm-g{display:block;margin:14px 0 4px 14px;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.muted}}
  .fm-item:first-child .fm-g{margin-top:0}
  .fm-item{scroll-margin-top:90px;border-radius:18px}
  .fm-item>button{display:flex;align-items:center;gap:12px;width:100%;padding:8px 12px;border:0;border-radius:16px;background:transparent;text-align:left;cursor:pointer;font:600 15.5px var(--font-display),system-ui,sans-serif;color:${C.body};transition:background .2s ease,color .2s ease,box-shadow .2s ease}
  .fm-item>button:hover{background:${C.g1};color:${C.ink}}
  .fm-ic{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:${C.tint};color:${C.primary};flex-shrink:0;transition:background .2s ease,color .2s ease}
  .fm-ic svg{width:17px;height:17px}
  .fm-n{flex:1}
  .fm-chev{display:none;width:18px;height:18px;color:${C.muted};transition:transform .25s ease}
  .fm-item.on>button{background:#fff;box-shadow:0 0 0 1.5px ${C.primary},0 14px 28px -20px rgba(46,16,101,.45);color:${C.ink}}
  .fm-item.on .fm-ic{background:${C.primary};color:#fff}
  .fm-desc{margin:8px 14px 10px 60px;animation:fmIn .35s ease both}
  .fm-t{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;line-height:1.4;color:${C.ink}}
  .fm-t .t2{color:#8E8C96}
  .fm-what p{margin:6px 0 0;font-size:14.5px;line-height:1.6;color:${C.body}}
  @keyframes fmIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .fm-col{min-width:0;align-self:stretch;padding-left:32px;border-left:1px solid ${C.line}}
  .fm-why-b{margin:22px 0 0;padding:12px 16px;border-radius:14px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft};font-size:14.5px;line-height:1.5;color:${C.ink};animation:fmIn .35s ease both}
  .fm-win{border-radius:26px;background:#fff;box-shadow:0 40px 80px -44px rgba(46,16,101,.55),0 0 0 1px ${C.line};overflow:hidden}
  .fm-bar{display:flex;align-items:center;gap:14px;padding:11px 18px;border-bottom:1px solid ${C.line};background:#FAF9FC;font-size:12.5px;color:${C.muted}}
  .fm-bar .ft-dots{margin:0}

  /* the app screen */
  .app{display:grid;grid-template-columns:60px minmax(0,1fr);height:600px;background:#fff}
  /* the app shell, as in the real app: a slim icon rail, the top bar, and the floating EVI */
  .app-rail{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 0;background:${C.depth}}
  .app-rail>svg{margin-bottom:10px}
  .app-rail>span{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;color:rgba(255,255,255,.72)}
  .app-rail>span svg{width:20px;height:20px}
  .app-rail>span.on{background:#E9DDFB;color:${C.primary}}
  .app-top{display:flex;align-items:center;gap:12px;height:56px;padding:0 16px;border-bottom:1px solid ${C.line};background:#fff}
  .app-org{display:flex;align-items:center;gap:9px;flex-shrink:0}
  .app-org>b{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:${C.depth};color:#fff;font-size:12px}
  .app-org>span{display:grid;line-height:1.2}
  .app-org i{font-style:normal;font-size:13px;font-weight:700;color:${C.ink};white-space:nowrap}
  .app-org small{font-size:11px;color:${C.muted};white-space:nowrap}
  .app-org svg{width:14px;height:14px;color:${C.muted}}
  .app-search{display:flex;align-items:center;gap:8px;flex:1;min-width:0;padding:7px 12px;border-radius:12px;box-shadow:inset 0 0 0 1px ${C.line};font-size:12.5px;color:${C.muted}}
  .app-search svg{width:14px;height:14px;flex-shrink:0}
  .app-search>span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .app-search kbd{padding:1px 6px;border-radius:6px;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line};font:600 10.5px var(--font-sans),system-ui,sans-serif;color:${C.muted}}
  .app-create{display:inline-flex;align-items:center;gap:6px;flex-shrink:0;padding:8px 14px;border-radius:12px;background:${C.primary};color:#fff;font-size:12.5px;font-weight:600;white-space:nowrap}
  .app-create svg{width:14px;height:14px}
  .app-av{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,${C.action},${C.primary});flex-shrink:0}
  .app-evi{position:absolute;right:16px;bottom:16px;z-index:4;width:44px;height:44px;border-radius:50%;object-fit:cover;background:${C.tint};box-shadow:0 0 0 3px #fff,0 10px 22px -8px rgba(46,16,101,.55);pointer-events:none}
  .app-main{position:relative}
  .app-main{display:flex;flex-direction:column;min-width:0;min-height:0}
  .fm-win .app-page.fb-stage{flex:1;min-height:0;height:auto;padding:14px 18px;border-radius:0;background:#F6F5FA;overflow:hidden}
  .app-page>.ft-card,.app-page>.ft-canvas{width:100%;max-width:none;margin:0}
  .app-page .ft-card{padding:0;gap:7px;background:transparent;box-shadow:none}
  .app-page .ft-card.light{background:transparent}
  .app-page .ft-card{grid-template-columns:minmax(0,1fr)}
  .app-page .ft-dots{display:none}
  .app-page .ft-row,.app-page .ft-search,.app-page .ft-map,.app-page .ft-ex,.app-page .ft-sw{padding:9px 12px}
  .app-page .ft-find{padding:10px 12px;background:#fff}
  .app-page .ft-find.act{background:${C.surface}}
  .app-page .ft-search{background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .app-page .ft-path{background:#fff;border-radius:12px;padding:10px 6px}
  .app-page .ft-code,.app-page .ft-prev,.app-page .ft-evi{padding:9px 12px}
  .app-page .ft-ways li{background:#fff}
  .app-page .ft-ways li.on{background:${C.depth}}
  .app-page .ft-chart{height:150px}
  .app-page .ft-agents>div{background:#fff}
  .app-page .ft-canvas{padding:46px 16px 16px;box-shadow:inset 0 0 0 1px ${C.line}}
  .app-page .ft-flow{gap:16px}
  .app-page .ft-flow li{padding:12px}
  .app-page .ft-flow li:not(:last-child)::after{width:16px}
  .app-page .ft-flow b{font-size:13px}
  .app-page .ft-steps b{font-size:12.5px}
  .app-page .ft-steps small{font-size:11.5px}

  /* the help that runs on its own, docked at the bottom of the app */

  /* the agents and security windows */
  .ft-agents{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .ft-agents>div{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:${C.g1}}
  .ft-agents img{width:40px;height:40px;border-radius:50%;background:${C.tint};object-fit:cover;flex-shrink:0}
  .ft-agents b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${C.ink}}
  .ft-agents small{font-size:12.5px;color:${C.muted}}
  .ft-card .ft-review-chips{max-width:none}
  .ft-card .ft-review-chips span{background:${C.tint};color:${C.primary}}
  .ft-card .ft-review-btns span{background:${C.g1};color:${C.ink}}
  .ft-card .ft-review-btns span.pri{background:${C.primary};color:#fff}
  .ft-sw{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:14px;color:${C.ink}}
  .ft-sw>span:first-child{display:flex;align-items:center;gap:10px;font-weight:600}
  .ft-sw svg{width:16px;height:16px;color:${C.primary}}


  @media (max-width:979px){
    .fm{grid-template-columns:1fr;gap:18px}
    .fm-col{padding-left:0;border-left:0}
    .fm-list{position:static;display:flex;overflow-x:auto;gap:8px;padding:2px 2px 8px;scrollbar-width:none}
    .fm-list::-webkit-scrollbar{display:none}
    .fm-item{flex-shrink:0}
    .fm-g,.fm-desc{display:none}
    .fm-item>button{padding:8px 16px 8px 8px;border-radius:999px;box-shadow:inset 0 0 0 1px ${C.line};white-space:nowrap}
    .fm-item.on>button{box-shadow:0 0 0 1.5px ${C.primary}}
    .fm-ic{width:30px;height:30px;border-radius:50%}
    .fm-n{flex:none}
  }
  @media (max-width:639px){
    .fm-sec{padding-top:36px;padding-bottom:56px}
    .fm-list{display:grid;overflow:visible;gap:8px;padding:0}
    .fm-item{flex-shrink:1;background:#fff;box-shadow:0 0 0 1px ${C.line};border-radius:18px}
    .fm-item>button{border-radius:18px;box-shadow:none;padding:12px 14px 12px 12px;white-space:normal}
    .fm-item.on>button{box-shadow:none;background:${C.tint}}
    .fm-ic{width:34px;height:34px;border-radius:10px}
    .fm-n{flex:1}
    .fm-chev{display:block}
    .fm-item.on .fm-chev{transform:rotate(180deg)}
    .fm-desc{display:block;margin:10px 16px 4px}
    .fm-item .fm-win{margin:12px 8px 8px;box-shadow:0 0 0 1px ${C.line}}
    .app{grid-template-columns:1fr;height:auto}
    .app-rail{display:none}
    .app-top{height:48px;padding:0 12px;gap:10px}
    .app-org>span,.app-org svg,.app-create{display:none}
    .fm-win .app.demo{height:auto}
    .fm-win .cn-grid{grid-template-columns:1fr}
    .fm-win .cn-hd{flex-wrap:wrap}
    .fm-win .cn-hd>div{min-width:0;flex:1 1 200px}
    .fm-win .cn-find{flex-wrap:wrap}
    .fm-win .cn-s{flex:1 1 100%}
    .fm-win .iw-steps{flex-wrap:wrap}
    .fm-win .ex-stats.rp-stats{grid-template-columns:repeat(2,1fr)}
    .fm-win .app-page .ft-flow{grid-template-columns:1fr 1fr;gap:10px}
    .fm-win .app-page .ft-flow li::after{display:none}
    .fm-win .app-page.fb-stage{padding:12px;min-height:0;flex:none}
    .ft-agents{grid-template-columns:1fr}
  }
  @media (prefers-reduced-motion:reduce){.fm-desc,.app-help-bar{animation:none;transform:none}.fm-item>button{transition:none}}

  /* the demo: a cursor using the screen */
  .app.demo .ft-card *,.app.demo .ft-canvas *{animation:none!important}
  .app.demo{height:540px}
  .app-page{position:relative}
  .app-cur{position:absolute;left:0;top:0;z-index:6;pointer-events:none;opacity:0;transition:transform .85s cubic-bezier(.45,.05,.2,1),opacity .3s ease;will-change:transform}
  .app-cur.on{opacity:1}
  .app-cur svg{display:block;width:24px;height:24px;filter:drop-shadow(0 2px 3px rgba(20,14,70,.4))}
  .app-cur-tag{position:absolute;left:20px;top:18px;padding:5px 11px;border-radius:999px;background:${C.primary};color:#fff;font:600 12.5px var(--font-sans),system-ui,sans-serif;white-space:nowrap;box-shadow:0 8px 18px -8px rgba(46,16,101,.6);animation:fmTag .3s ease both}
  .app-cur.flip .app-cur-tag{left:auto;right:12px}
  @keyframes fmTag{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
  .app-cur-rip{position:absolute;left:-8px;top:-8px;width:20px;height:20px;border-radius:50%;box-shadow:0 0 0 2px ${C.primary};animation:fmClick .6s ease-out both}
  @keyframes fmClick{from{transform:scale(.4);opacity:1}to{transform:scale(2.4);opacity:0}}

  /* demo: connections, laid out like the app's application catalog */
  .cn-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
  .cn-hd h4{margin:0;font:700 20px var(--font-display),system-ui,sans-serif;color:${C.ink}}
  .cn-hd p{margin:3px 0 0;font-size:12.5px;color:${C.muted}}
  .cn-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 13px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:12.5px;font-weight:600;color:${C.ink};white-space:nowrap;transition:box-shadow .3s ease,background .3s ease}
  .cn-btn svg{width:14px;height:14px}
  .cn-btn.pri{background:${C.primary};color:#fff;box-shadow:none}
  .cn-find{display:flex;align-items:center;gap:8px;margin-top:6px}
  .cn-s{display:flex;align-items:center;gap:8px;flex:1;min-width:0;padding:8px 12px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:12.5px;color:${C.muted}}
  .cn-s svg{width:14px;height:14px;flex-shrink:0}
  .cn-pill{padding:6px 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:12px;font-weight:600;color:${C.body}}
  .cn-pill.on{background:${C.tint};color:${C.primary};box-shadow:none}
  .cn-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px}
  .cn-card{display:grid;gap:8px;padding:14px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};transition:box-shadow .3s ease}
  .cn-top{display:flex;align-items:center;gap:10px}
  .cn-top b{display:block;font:700 14.5px var(--font-display),system-ui,sans-serif;color:${C.ink}}
  .cn-top small{display:block;font-size:12px;color:${C.muted}}
  .cn-card p{margin:0;font-size:12.5px;color:${C.body}}
  .cn-tags{display:flex;flex-wrap:wrap;gap:6px}
  .cn-act{display:flex;align-items:center;gap:12px;margin-top:2px}
  .cn-act em{font-style:normal;font-size:12px;color:${C.muted}}
  .app[data-f="connections"] .q-t,.app[data-f="connections"] .s-on{display:none}
  .app[data-f="connections"]:not([data-a="-1"]) .q-ph{display:none}
  .app[data-f="connections"]:not([data-a="-1"]) .q-t{display:inline-block;max-width:7ch;overflow:hidden;white-space:nowrap;font-weight:600;color:${C.ink};animation:fmType .9s steps(7) .5s both!important}
  @keyframes fmType{from{max-width:0}to{max-width:7ch}}
  .app[data-f="connections"][data-a="0"] .cn-card.shop{box-shadow:inset 0 0 0 2px ${C.primary}}
  .app[data-f="connections"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .s-off{display:none}
  .app[data-f="connections"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .cn-btn.s-on{display:inline-flex}
  .app[data-f="connections"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .ft-chip.s-on{display:inline-block}
  .app[data-f="connections"][data-a="2"] .cn-card.hub{box-shadow:inset 0 0 0 2px ${C.primary}}
  .app[data-f="connections"][data-a="3"][data-p="1"] .cn-btn.api{box-shadow:inset 0 0 0 2px ${C.primary};background:${C.tint};color:${C.primary}}

  /* demo: monitoring, as the app's execution detail */
  .mo-int{margin:0;font-size:12.5px;font-weight:600;color:${C.primary}}
  .mo-btns{display:flex;flex-wrap:wrap;gap:8px}
  .mo-evi{background:${C.tint};color:${C.primary};box-shadow:none}
  .mo-evi img{width:18px;height:18px;border-radius:50%;object-fit:cover}
  .app[data-f="monitoring"] .ft-find{visibility:hidden;opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease,visibility .45s}
  .app[data-f="monitoring"]:is([data-a="2"][data-p="1"],[data-a="3"],[data-a="4"]) .ft-find{visibility:visible;opacity:1;transform:none}
  .app[data-f="monitoring"] .h-on{display:none}
  .app[data-f="monitoring"][data-a="4"][data-p="1"] .h-off{display:none}
  .app[data-f="monitoring"][data-a="4"][data-p="1"] .h-on{display:inline-block}
  .app[data-f="monitoring"][data-a="4"][data-p="1"] .mo-retry{box-shadow:0 0 0 3px ${C.tint}}
  .app[data-f="monitoring"][data-a="1"] .ft-code{box-shadow:0 0 0 2px ${C.primary}}
  .app[data-f="monitoring"] .ft-code{transition:box-shadow .3s ease}

  /* demo: integrations, shown as the app's guided Create Integration setup */
  .iw-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
  .iw-hd h4{margin:0;font:700 20px var(--font-display),system-ui,sans-serif;color:${C.ink}}
  .iw-hd p{margin:3px 0 0;font-size:12.5px;color:${C.muted}}
  .iw-steps{list-style:none;margin:6px 0 0;padding:0;display:flex;gap:8px}
  .iw-steps li{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line};font-size:12px;font-weight:700;color:${C.muted};transition:background .35s ease,color .35s ease,box-shadow .35s ease}
  .iw-steps li i{font-style:normal}
  .iw-steps li svg{display:none;width:13px;height:13px}
  .iw-card{margin-top:6px;padding:16px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};min-height:178px}
  .iw-pane h5{margin:0;font:700 16px var(--font-display),system-ui,sans-serif;color:${C.ink}}
  .iw-pane p{margin:3px 0 12px;font-size:12.5px;color:${C.muted}}
  .iw-pane label{display:block;margin-bottom:5px;font-size:12px;font-weight:700;color:${C.ink}}
  .iw-in{padding:9px 12px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:13px;color:${C.ink};min-height:36px}
  .iw-map{display:flex;align-items:center;gap:10px;margin-top:6px;font-size:12.5px;color:${C.ink}}
  .iw-map span{flex:1;padding:7px 12px;border-radius:10px;background:${C.g1}}
  .iw-map svg{width:14px;height:14px;color:${C.muted};flex-shrink:0}
  .iw-foot{display:flex;justify-content:space-between;margin-top:6px}
  .iw-c2{display:none}
  .app[data-f="integrations"] .iw-pane{display:none}
  .app[data-f="integrations"] .iw-pane.p0{display:block}
  .app[data-f="integrations"] .iw-t{display:inline-block;max-width:0;overflow:hidden;white-space:nowrap;vertical-align:bottom}
  .app[data-f="integrations"]:not([data-a="-1"]) .iw-t{animation:fmType2 1s steps(26) .4s both!important}
  @keyframes fmType2{from{max-width:0}to{max-width:26ch}}
  .app[data-f="integrations"] .iw-steps li:nth-child(1){background:${C.primary};color:#fff;box-shadow:0 0 0 4px ${C.tint}}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-pane.p0{display:none}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-pane.p1{display:block}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-pane.p1{display:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-pane.p2{display:block}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-pane.p2{display:none}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-pane.p3{display:block}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-c1{display:none}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-c2{display:inline}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(1){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(1) i{display:none}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(1) svg{display:block}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(2){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(2) i{display:none}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(2) svg{display:block}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(3){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(3) i{display:none}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(3) svg{display:block}
  .app[data-f="integrations"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .iw-steps li:nth-child(4){background:${C.primary};color:#fff;box-shadow:0 0 0 4px ${C.tint}}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(4){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(4) i{display:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(4) svg{display:block}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(5){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(5) i{display:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(5) svg{display:block}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(6){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(6) i{display:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(6) svg{display:block}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(7){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(7) i{display:none}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(7) svg{display:block}
  .app[data-f="integrations"]:is([data-a="2"][data-p="1"],[data-a="3"]) .iw-steps li:nth-child(8){background:${C.primary};color:#fff;box-shadow:0 0 0 4px ${C.tint}}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-steps li:nth-child(8){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-steps li:nth-child(8) i{display:none}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-steps li:nth-child(8) svg{display:block}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-steps li:nth-child(9){background:${C.ok};color:#fff;box-shadow:none}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-steps li:nth-child(9) i{display:none}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-steps li:nth-child(9) svg{display:block}
  .app[data-f="integrations"]:is([data-a="3"][data-p="1"]) .iw-steps li:nth-child(10){background:${C.primary};color:#fff;box-shadow:0 0 0 4px ${C.tint}}

  /* demo: data mapping */
  .app[data-f="mapping"] .m-b{display:grid}
  .app[data-f="mapping"] .m-b>span{grid-area:1/1}
  .app[data-f="mapping"] .m-on,.app[data-f="mapping"] .r-on{visibility:hidden;opacity:0;transition:opacity .4s ease,visibility .4s}
  .app[data-f="mapping"] .m-off{color:${C.muted};font-weight:500}
  .app[data-f="mapping"] .m-b{border-radius:8px;transition:box-shadow .3s ease}
  .app[data-f="mapping"]:is([data-a="0"][data-p="1"],[data-a="1"],[data-a="2"],[data-a="3"]) .m-off{visibility:hidden}
  .app[data-f="mapping"]:is([data-a="0"][data-p="1"],[data-a="1"],[data-a="2"],[data-a="3"]) .m-on{visibility:visible;opacity:1}
  .app[data-f="mapping"]:is([data-a="1"][data-p="1"],[data-a="2"],[data-a="3"]) .r-on{visibility:visible;opacity:1}
  .app[data-f="mapping"][data-a="3"] .ft-evi{box-shadow:inset 0 0 0 2px ${C.primary}}

  /* demo: workflow builder */
  .app[data-f="builder"] .ft-flow li:nth-child(4){opacity:0;transform:scale(.92);visibility:hidden;transition:opacity .45s ease,transform .45s ease,visibility .45s}
  .app[data-f="builder"]:is([data-a="0"][data-p="1"],[data-a="1"],[data-a="2"]) .ft-flow li:nth-child(4){opacity:1;transform:none;visibility:visible}
  .app[data-f="builder"][data-a="1"] .ft-flow li:nth-child(4){box-shadow:0 0 0 2px ${C.primary},0 14px 26px -16px rgba(46,16,101,.45)}
  .app[data-f="builder"] .ft-canvas-res{position:absolute;right:20px;top:14px;visibility:hidden;opacity:0;transition:opacity .4s ease .2s,visibility .4s}
  .app[data-f="builder"][data-a="2"][data-p="1"] .ft-canvas-res{visibility:visible;opacity:1;transition-delay:2.2s}
  .app[data-f="builder"][data-a="2"][data-p="1"] .ft-flow li{animation:fmRun .5s ease both!important}
  .app[data-f="builder"][data-a="2"][data-p="1"] .ft-flow li:nth-child(2){animation-delay:.4s!important}
  .app[data-f="builder"][data-a="2"][data-p="1"] .ft-flow li:nth-child(3){animation-delay:.8s!important}
  .app[data-f="builder"][data-a="2"][data-p="1"] .ft-flow li:nth-child(4){animation-delay:1.2s!important}
  .app[data-f="builder"][data-a="2"][data-p="1"] .ft-flow li:nth-child(5){animation-delay:1.6s!important}
  @keyframes fmRun{from{box-shadow:0 0 0 1px ${C.line}}to{box-shadow:0 0 0 2px ${C.ok},0 14px 26px -16px rgba(46,16,101,.45)}}

  /* shared pieces of the app's pages */
  .ex-top{display:grid;gap:8px}
  .ex-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  .ex-stats.rp-stats{grid-template-columns:repeat(4,1fr)}
  .ex-stats>div{padding:8px 12px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};transition:box-shadow .3s ease}
  .ex-stats small{display:block;font-size:11.5px;color:${C.muted}}
  .ex-stats b{display:block;font:700 17px var(--font-display),system-ui,sans-serif;color:${C.ink}}
  .ex-stats b.bad{color:${C.err}}
  .ex-tabs{display:flex;gap:16px;font-size:12.5px;color:${C.muted}}
  .ex-tabs b{color:${C.ink};padding-bottom:3px;box-shadow:0 2px 0 ${C.primary}}
  .ex-tabs i{font-style:normal;font-weight:600;margin-left:5px;color:${C.muted}}
  .bd-bar{display:flex;gap:8px;margin-top:14px}
  .bd-bar svg{width:13px;height:13px}
  .ap-list{display:grid;gap:6px}
  .ap-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px;padding:8px 12px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};transition:box-shadow .3s ease}
  .ap-row img{width:30px;height:30px;border-radius:50%;background:${C.tint};object-fit:cover}
  .ap-row b{display:block;font-size:12.5px;color:${C.ink};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ap-row small{display:block;font-size:11.5px;color:${C.muted};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ap-row span:nth-child(2){min-width:0}
  .se-note{display:flex;align-items:flex-start;gap:9px;padding:10px 12px;border-radius:12px;background:#ECFDF3;box-shadow:inset 0 0 0 1px #BBF7D0;font-size:12.5px;line-height:1.45;color:#166534;transition:box-shadow .3s ease}
  .se-note svg{width:16px;height:16px;flex-shrink:0;margin-top:1px;color:#16A34A}
  .ft-sw>span.se-l:first-child{display:grid;gap:1px;font-weight:400}
  .se-l b{font-size:13px;color:${C.ink}}
  .se-l small{font-size:11.5px;color:${C.muted}}
  .rp-box{padding:10px 12px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .rp-ct{display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:${C.ink}}
  .rp-key{display:flex;gap:12px;font-size:11.5px;color:${C.muted}}
  .rp-key span{display:inline-flex;align-items:center;gap:5px}
  .rp-key i{width:9px;height:9px;border-radius:3px;background:${C.action}}
  .rp-key i.b{background:${C.err}}
  .rp-box .ft-chart{margin-top:6px;height:132px;background:transparent;box-shadow:none;padding:6px 4px 0}

  /* demo: executions */
  .app[data-f="executions"] .ft-ex{grid-template-columns:.9fr 2fr 1.1fr 1fr;padding:8px 12px;font-size:12.5px;transition:box-shadow .3s ease}
  .app[data-f="executions"] .ft-ex>span:nth-child(2){min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .app[data-f="executions"] .ft-ex>.ft-chip,.app[data-f="executions"] .ft-ex>span:nth-child(4){justify-self:start}
  .app[data-f="executions"] .x-on{display:none}
  .app[data-f="executions"]:is([data-a="1"][data-p="1"],[data-a="2"]) .x-off{display:none}
  .app[data-f="executions"]:is([data-a="1"][data-p="1"],[data-a="2"]) .x-on{display:inline-block}
  .app[data-f="executions"][data-a="0"] .ft-ex.head{box-shadow:inset 0 0 0 2px ${C.primary};border-radius:12px}
  .app[data-f="executions"][data-a="2"][data-p="1"] .ft-ex:nth-child(5){box-shadow:inset 0 0 0 2px ${C.primary}}

  /* demo: reports */
  .app[data-f="reports"] .e-on{display:none}
  .app[data-f="reports"][data-a="2"][data-p="1"] .e-off{display:none}
  .app[data-f="reports"][data-a="2"][data-p="1"] .e-on{display:inline}
  .app[data-f="reports"][data-a="0"] .rp-sr{box-shadow:inset 0 0 0 2px ${C.primary}}
  .app[data-f="reports"][data-a="1"] .ft-chart>span:nth-child(7) i.b{box-shadow:0 0 0 3px ${C.primary};border-radius:4px}
  .app[data-f="reports"][data-a="2"][data-p="1"] .rp-exp{box-shadow:inset 0 0 0 2px ${C.primary};color:${C.primary}}

  /* demo: EVI and Sync Agent */
  .app[data-f="evi"] .ft-find.act,.app[data-f="evi"] .ft-review-chips,.app[data-f="evi"] .ft-review-btns{visibility:hidden;opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease,visibility .45s}
  .app[data-f="evi"]:is([data-a="0"][data-p="1"],[data-a="1"],[data-a="2"],[data-a="3"]) .ft-find.act{visibility:visible;opacity:1;transform:none}
  .app[data-f="evi"]:is([data-a="1"],[data-a="2"],[data-a="3"]) .ft-review-chips{visibility:visible;opacity:1;transform:none}
  .app[data-f="evi"]:is([data-a="2"],[data-a="3"]) .ft-review-btns{visibility:visible;opacity:1;transform:none}
  .app[data-f="evi"][data-a="0"][data-p="1"] .ap-row:first-child{box-shadow:inset 0 0 0 2px ${C.primary}}
  .app[data-f="evi"] .d-on{visibility:hidden;opacity:0;justify-self:start;transition:opacity .4s ease,visibility .4s}
  .app[data-f="evi"][data-a="3"][data-p="1"] .d-on{visibility:visible;opacity:1}
  .app[data-f="evi"][data-a="3"][data-p="1"] .ft-review-btns{visibility:hidden;opacity:0}
  .app[data-f="evi"] .ft-card{position:relative}
  .app[data-f="evi"][data-a="3"][data-p="1"] .d-on{position:absolute;right:0;bottom:6px}

  /* demo: security */
  .app[data-f="security"]:is([data-a="0"][data-p="1"],[data-a="1"],[data-a="2"]) .se-mfa .sx-switch{background:${C.primary}}
  .app[data-f="security"]:is([data-a="0"][data-p="1"],[data-a="1"],[data-a="2"]) .se-mfa .sx-switch i{transform:translateX(17px)}
  .app[data-f="security"]:is([data-a="1"][data-p="1"],[data-a="2"]) .se-ip .sx-switch{background:${C.primary}}
  .app[data-f="security"]:is([data-a="1"][data-p="1"],[data-a="2"]) .se-ip .sx-switch i{transform:translateX(17px)}
  .app[data-f="security"][data-a="2"] .se-note{box-shadow:inset 0 0 0 2px #16A34A}
  .app[data-f="security"] .ft-sw{transition:box-shadow .3s ease}

  /* the one line of why on the left */
  .fm-what p.fm-why{margin-top:10px;padding:10px 12px;border-radius:12px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft};font-size:14px;line-height:1.5;color:${C.ink}}
  .fm-why b{display:block;margin-bottom:1px;font-size:11.5px;letter-spacing:.07em;text-transform:uppercase;color:${C.primary}}

  ${ctaCss}

  @media (max-width:980px){
    .fh{grid-template-columns:1fr;gap:36px}
    .ft-flow{grid-template-columns:repeat(2,1fr)}
    .ft-flow li::after{display:none}
    .ft-steps{grid-template-columns:repeat(3,1fr);gap:18px 4px}
    .ft-steps li::after{display:none}
    .ft-tiles.three{grid-template-columns:1fr 1fr}
    .ft-b-evi,.ft-b-agent{grid-column:1 / -1}
    .ft-b-review{flex-direction:column;align-items:flex-start}
  }
  @media (max-width:640px){
    .ft-hero{padding-top:36px}
    .ft-hero-copy>p{font-size:17px}
    .fh-stage{height:auto;display:grid;gap:12px;padding:16px}
    .fh-card{position:static;width:auto!important;animation:none}
    .fh-card.c4{display:none}
    .ft-card{padding:16px}
    .ft-ways{grid-template-columns:1fr}
    .ft-flow{grid-template-columns:1fr}
    .ft-chart{gap:4px}
    .ft-tiles.three{grid-template-columns:1fr}
    .ft-groups{grid-template-columns:1fr}
    .ft-b{padding:24px}
    .ft-ex{grid-template-columns:1fr 1.3fr .8fr}
    .ft-ex span:last-child{display:none}
  }
`;
