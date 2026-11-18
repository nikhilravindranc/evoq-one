"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, Building2, Check, ChartColumn, Clock, CreditCard, Download, Gauge, Globe, History, KeyRound, LayoutTemplate,
  Layers, Plug, PencilRuler, Play, Radar, Search, ShieldCheck, Shuffle, SlidersHorizontal, Sparkles, TrendingUp,
  Users, Workflow, X, Zap, Activity, Database, GitBranch, type LucideIcon,
} from "lucide-react";
import { C, IMG } from "./data";
import { Mark, SyncShell } from "./Shell";
import { CtaBand, ctaCss } from "./SyncV1";

/* EVOQ Sync v1 features. Eleven sections. Each product area has the same shape: a numbered title with its
   description, one large product stage, then the capabilities as a grid of cards.
   Records, IDs and times in the visuals are the seeded demo workspace of the Sync app. */

/* a numbered feature block: title and description on top, the product visual on a stage, capabilities below */
const SHOWN = 4;

/* the capability cards: the first four, and the rest on request */
function CapGrid({ caps }: { caps: string[] }) {
  const [open, setOpen] = useState(false);
  const more = caps.length > SHOWN;
  const cols = open ? (caps.length % 4 === 0 ? 4 : 3) : 4;
  return (
    <div data-rv="2">
      <ul className={`fb-caps n${cols}`}>
        {caps.map((x, k) => <li key={x} className={!open && k >= SHOWN ? "x" : undefined}><span><Check aria-hidden /></span>{x}</li>)}
      </ul>
      {more && (
        <button type="button" className="fb-more" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Show fewer" : `Show all ${caps.length} capabilities`}
        </button>
      )}
    </div>
  );
}

function Block({
  n, id, tag, lead, rest, tone = "", stage = "s1", children, caps, dark, intro, use, eg,
}: {
  n: string; id: string; tag: string; lead: string; rest: string; tone?: string; stage?: string;
  children: ReactNode; caps?: string[]; dark?: boolean; intro: ReactNode; use: string; eg: string;
}) {
  return (
    <section className={`sx-sec sx-out ${tone}`} id={id}>
      <div className="sx-in">
        <div className="fb-head">
          <div>
            <span className="fb-tag" data-rv><b>{n}</b>{tag}</span>
            <h2 data-rv="1">{lead} <span className="t2">{rest}</span></h2>
            <div className="fb-intro" data-rv="1">{intro}</div>
          </div>
          <div className="fb-for" data-rv="2">
            <small>What it is for</small>
            <p>{use}</p>
            <p className="eg"><b>For example</b>{eg}</p>
          </div>
        </div>
        <div className={`fb-stage ${stage}${dark ? " dk" : ""}`} data-rv="1">{children}</div>
        {caps && <CapGrid caps={caps} />}
      </div>
    </section>
  );
}

/* ---------- 1 hero ---------- */
const TAB_GROUPS: { k: string; items: { id: string; t: string; icon: LucideIcon }[] }[] = [
  {
    k: "Set up",
    items: [
      { id: "connections", t: "Connections", icon: Plug },
      { id: "integrations", t: "Integrations", icon: LayoutTemplate },
      { id: "mapping", t: "Data mapping", icon: Shuffle },
      { id: "builder", t: "Workflow builder", icon: Workflow },
    ],
  },
  {
    k: "Run",
    items: [
      { id: "executions", t: "Executions", icon: Play },
      { id: "monitoring", t: "Monitoring", icon: Radar },
    ],
  },
  {
    k: "Improve and control",
    items: [
      { id: "reports", t: "Reports", icon: ChartColumn },
      { id: "evi", t: "EVI and Sync Agent", icon: Sparkles },
      { id: "security", t: "Security", icon: ShieldCheck },
    ],
  },
];
const TAB_IDS = TAB_GROUPS.flatMap((g) => g.items.map((i) => i.id));

/* a sticky shortcut bar: jump to a feature, and see which one you are reading */
function Tabs() {
  const [active, setActive] = useState(TAB_IDS[0]);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      let cur = TAB_IDS[0];
      for (const id of TAB_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const r = rail.current;
    const b = r?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (r && b) r.scrollTo({ left: b.offsetLeft - r.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="ft-tabs-bar" aria-label="Feature sections">
      <div className="ft-tabs-rail" ref={rail}>
        {TAB_GROUPS.map((g) => (
          <div className="ft-tg" key={g.k}>
            <small>{g.k}</small>
            {g.items.map((r) => {
              const I = r.icon;
              return (
                <a key={r.id} href={`#${r.id}`} data-id={r.id} className={r.id === active ? "on" : undefined} aria-current={r.id === active ? "true" : undefined}>
                  <I aria-hidden />{r.t}
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}

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

/* ---------- 2 application connections ---------- */
function Connections() {
  return (
    <Block
      n="01" id="connections" tag="Application connections" lead="Connect the applications" rest="you want to sync."
      use="Lets EVOQ Sync sign in to your applications, so every integration can reuse the same saved login." eg="Connect Shopify and NetSuite a single time, then use them in as many integrations as you need."
      stage="s1"
      intro={<><p>Select applications from the EVOQ Sync catalog, or connect any other application through its API with a Custom REST API Connection. Authorize each connection and reuse it across your integrations.</p><p className="m">Each saved connection represents an authorized application login that can be used when configuring integrations.</p></>}
      caps={[
        "Browse and search the application catalog.",
        "Configure and authorize application connections.",
        "Reuse saved connections across integrations.",
        "View connection status.",
        "Configure a Custom REST API Connection for an application outside the catalog.",
      ]}
    >
      <div className="ft-card" aria-hidden>
        <div className="ft-dots"><i /><i /><i /></div>
        <div className="ft-search"><Search />Search the application catalog</div>
        <div className="ft-row"><Mark id="shopify" size={34} /><div><b>Shopify Main store</b><small>Used by 2 integrations</small></div><span className="ft-chip ok">Connected</span></div>
        <div className="ft-row"><Mark id="netsuite" size={34} /><div><b>NetSuite EMEA</b><small>Used by 3 integrations</small></div><span className="ft-chip ok">Connected</span></div>
        <div className="ft-row"><Mark id="quickbooks" size={34} /><div><b>QuickBooks Finance</b><small>Refresh token expired</small></div><span className="ft-chip bad">Expired</span></div>
        <div className="ft-row api"><span className="ft-api"><Plug /></span><div><b>Custom REST API Connection</b><small>Base URL, authentication, test call</small></div><em>+</em></div>
      </div>
    </Block>
  );
}

/* ---------- 3 integration configuration and management ---------- */
const STEPS: [string, string][] = [
  ["Applications", "Shopify to NetSuite"],
  ["Data", "Sales Order, one way"],
  ["Connections", "Authorized"],
  ["Mappings", "Match the fields"],
  ["Test", "Run sample data"],
  ["Activate", "Switch it on"],
];

const WAYS: { icon: LucideIcon; t: string }[] = [
  { icon: LayoutTemplate, t: "Integration template" },
  { icon: PencilRuler, t: "From scratch" },
  { icon: Sparkles, t: "Describe it to EVI" },
];

function Integrations() {
  return (
    <Block
      n="02" id="integrations" tag="Integration configuration and management" lead="Choose which data syncs" rest="and in which direction."
      use="Decides which information moves between two applications, in which direction and under which rules." eg="Send new Shopify orders to NetSuite as sales orders."
      tone="sx-grey" stage="s2"
      intro={<><p>An integration specifies the applications involved, the data being synchronized, the direction of movement and the rules that govern the process.</p><p className="m">Use the guided configuration process to establish these details before activation.</p></>}
      caps={[
        "Select source and destination applications.",
        "Choose data objects and synchronization direction.",
        "Configure application connections.",
        "Define field mappings and conflict policies.",
        "Test and review the configuration before activation.",
        "View integration health, recent executions, logs and settings.",
      ]}
    >
      <div className="ft-card wide" aria-hidden>
        <div className="ft-dots"><i /><i /><i /></div>
        <div className="ft-hd"><b>New integration</b><span className="ft-chip p">Draft</span></div>
        <p className="ft-lead">Start from an integration template, create an integration from scratch or describe the requirement to EVI.</p>
        <ul className="ft-ways">
          {WAYS.map((w, k) => { const I = w.icon; return <li key={w.t} className={k === 2 ? "on" : undefined}><span><I aria-hidden /></span>{w.t}</li>; })}
        </ul>
        <ol className="ft-steps">
          {STEPS.map(([s, d], k) => (
            <li key={s} className={k < 3 ? "done" : k === 3 ? "now" : undefined}>
              <span>{k < 3 ? <Check /> : k + 1}</span>
              <b>{s}</b><small>{d}</small>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  );
}

/* ---------- 4 data mapping and transformation ---------- */
function Mapping() {
  return (
    <Block
      n="03" id="mapping" tag="Data mapping and transformation" lead="Map fields between your applications" rest="and format their values."
      use="Makes sure each value lands in the right field, in the format the destination expects." eg="A customer Tax ID in Shopify is saved as taxRegistrationNumber in NetSuite, with the spaces removed."
      stage="s3"
      intro={<p>Your CRM and ERP may describe the same information differently. Data mapping defines how fields correspond, while transformation rules prepare values for the destination application.</p>}
      caps={[
        "Pair source and destination fields.",
        "Map fields directly or use transformed and default values.",
        "Configure bi-directional field mapping.",
        "Define conflict-handling policies.",
        "Validate required fields.",
        "Apply formatting, lookup and default-value transformations.",
        "Preview sample input and output.",
        "Review EVI mapping suggestions and confidence information.",
      ]}
    >
      <div className="ft-card" aria-hidden>
        <div className="ft-dots"><i /><i /><i /></div>
        <div className="ft-hd"><Mark id="shopify" size={24} /><ArrowRight /><Mark id="netsuite" size={24} /><span className="ft-chip p">Both ways</span></div>
        <div className="ft-map"><b>Order total</b><ArrowRight /><b>amount</b><span className="ft-chip ok">Direct</span></div>
        <div className="ft-map"><b>Customer email</b><ArrowRight /><b>email</b><span className="ft-chip p">lowercase()</span></div>
        <div className="ft-map"><b>Country</b><ArrowRight /><b>country</b><span className="ft-chip p">Lookup</span></div>
        <div className="ft-map"><b>Tax ID</b><ArrowRight /><b>taxRegistrationNumber</b><span className="ft-chip p">Default value</span></div>
        <div className="ft-prev"><small>Preview</small><code>&quot; DE 811 907 980 &quot;</code><ArrowRight /><code>DE811907980</code></div>
        <div className="ft-evi"><Sparkles />EVI suggestion<span className="ft-chip ok">High confidence</span></div>
      </div>
    </Block>
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

const FLOW: [string, string, LucideIcon][] = [
  ["Trigger", "New Shopify order", Zap],
  ["Data operation", "Retrieve the order", Database],
  ["Transformation", "Format the fields", Shuffle],
  ["Validation", "Check required fields", ShieldCheck],
  ["Application action", "Create sales order in NetSuite", Plug],
];

function Builder() {
  return (
    <Block
      n="04" id="builder" tag="Visual workflow builder" lead="Build and test the steps of a sync" rest="on a visual canvas."
      use="Shows the steps an integration follows and lets you change them without writing code." eg="Add a validation step before an order is created in NetSuite."
      tone="sx-grey" stage="s1"
      intro={<p>Create and edit integration workflows on a visual canvas. Arrange the steps, define their settings and test how information moves through the workflow.</p>}
      caps={[
        "Add and arrange workflow nodes on a visual canvas.",
        "Connect nodes to define execution paths.",
        "Configure each node through its settings panel.",
        "Validate workflow configuration.",
        "Insert steps between existing nodes.",
        "Test workflows using sample data.",
        "Review test outcomes across individual nodes.",
        "Use EVI to prepare a sample workflow from a natural-language description.",
      ]}
    >
      <div className="ft-canvas" aria-hidden>
        <span className="ft-canvas-lab">Shopify orders to NetSuite sales orders</span>
        <ol className="ft-flow">
          {FLOW.map(([k, name, ic], i) => { const I = ic; return (
            <li key={name} className={i === 0 ? "first" : i === FLOW.length - 1 ? "last" : undefined}>
              <span><I /></span><small>{k}</small><b>{name}</b>
            </li>
          ); })}
        </ol>
        <div className="ft-legend"><small>Workflow components</small>
          {NODES.map((n) => { const I = n.icon; return <span key={n.t}><I />{n.t}</span>; })}
        </div>
      </div>
    </Block>
  );
}

/* ---------- 6 integration execution and management ---------- */
function Executions() {
  return (
    <Block
      n="05" id="executions" tag="Integration execution and management" lead="See which syncs worked" rest="and which need attention."
      use="Tells you whether each run worked, how long it took and how many records it handled." eg="Open a run to see which records went through and which did not."
      stage="s2"
      intro={<p>Review the status of your integrations and inspect individual executions to understand how each run progressed.</p>}
      caps={[
        "View execution status and history.",
        "Review execution outcomes, duration, records and triggers.",
        "Inspect workflow steps and their individual results.",
        "Review integration settings, notifications and retry policies.",
        "Pause, update or manage integrations according to the configured permissions.",
      ]}
    >
      <div className="ft-card" aria-hidden>
        <div className="ft-dots"><i /><i /><i /></div>
        <div className="ft-ex head"><span>Execution</span><span>Status</span><span>Duration</span><span>Records</span></div>
        <div className="ft-ex"><b>EX-20493</b><span className="ft-chip ok">Succeeded</span><span>2.4 s</span><span>12</span></div>
        <div className="ft-ex"><b>EX-20492</b><span className="ft-chip p">Running</span><span>41 s</span><span>214</span></div>
        <div className="ft-ex"><b>EX-20491</b><span className="ft-chip warn">Partial failure</span><span>18 s</span><span>12</span></div>
        <div className="ft-ex"><b>EX-20490</b><span className="ft-chip bad">Failed</span><span>9 s</span><span>5</span></div>
      </div>
    </Block>
  );
}

/* ---------- 7 integration monitoring and troubleshooting ---------- */
function Monitoring() {
  return (
    <Block
      n="06" id="monitoring" tag="Integration monitoring and troubleshooting" lead="Find out why a sync failed" rest="and what to do next."
      use="Explains why a run failed and what to do next, so you do not have to read raw logs." eg="A required tax ID is missing. EVOQ Sync names the cause and suggests a fix for your review."
      tone="sx-dark" stage="s4" dark
      intro={<p>Monitoring brings execution activity, errors and connection alerts into view. When a run fails, inspect the details instead of relying on an error code alone.</p>}
      caps={[
        "Filter executions by relevant criteria.",
        "Review execution status counts and the error queue.",
        "Inspect the workflow path and step-level outcomes.",
        "View application responses.",
        "Identify the likely cause of an error.",
        "Review suggested corrective actions.",
        "Check retry eligibility and auto-retry policies.",
        "Inspect record-level logs with sanitized input and output.",
      ]}
    >
      <div className="ft-card light" aria-hidden>
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
    </Block>
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

/* bar heights are for the picture only: [succeeded, failed] */
const BARS: [number, number][] = [[46, 4], [58, 3], [52, 6], [66, 2], [60, 4], [72, 3], [44, 14], [62, 5], [70, 2], [64, 3], [76, 2], [68, 4], [74, 3], [80, 2]];

function Reports() {
  return (
    <Block
      n="07" id="reports" tag="Reports and analytics" lead="See how your syncs perform" rest="over time."
      use="Shows how your integrations perform over time, so you can spot what needs attention." eg="See which integration fails most often, and when."
      stage="s3"
      intro={<p>Use reports to review integration volume, reliability, performance and application health.</p>}
    >
      <div className="ft-card wide" aria-hidden>
        <div className="ft-dots"><i /><i /><i /></div>
        <ul className="ft-tabs">
          {REPORTS.map((r, k) => { const I = r.icon; return <li key={r.t} className={k === 0 ? "on" : undefined}><I />{r.t}</li>; })}
        </ul>
        <div className="ft-chart">
          {BARS.map(([ok, bad], k) => <span key={k} style={{ ["--i" as string]: k }}><i className="b" style={{ height: `${bad}%` }} /><i style={{ height: `${ok}%` }} /></span>)}
        </div>
        <div className="ft-chart-key"><span><i />Succeeded</span><span><i className="b" />Failed</span><span className="ft-pill sm"><Download aria-hidden />Export CSV</span></div>
      </div>
      <div className="ft-rec">
        <p>Reports also surface recommendations with the reason, proposed change, expected benefit, risk or trade-off and supporting figures. Export report data as CSV for further analysis.</p>
        <span className="ft-pill"><Download aria-hidden />Export CSV</span>
      </div>
    </Block>
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
    <Block
      n="08" id="evi" tag="EVI and Sync Agent" lead="Ask EVI for help." rest="Review what the Sync Agent proposes."
      use="Helps you understand a problem and prepares a fix. Nothing changes until you approve it." eg="Ask EVI why an order failed. The Sync Agent proposes a change and waits for your decision."
      tone="sx-grey" stage="s1"
      intro={<p>EVI helps you understand the integration screen you are working on. The Sync Agent prepares proposals for specialist integration tasks.</p>}
    >
      <div className="ft-bento">
        <article className="ft-b ft-b-evi">
          <div className="ft-who"><img src={`${IMG}/characters/evi-head.webp`} alt="" /><div><b>EVI</b><small>Contextual assistance</small></div></div>
          <p>Ask questions about the current integration, execution, mapping or error. EVI uses screen context to explain what it has inspected and guide you towards the relevant action.</p>
        </article>
        <article className="ft-b ft-b-agent">
          <div className="ft-who"><img src={`${IMG}/characters/sync-head.webp`} alt="" /><div><b>Sync Agent</b><small>Integration specialist</small></div></div>
          <p>The Sync Agent works across seven capabilities grouped into four areas:</p>
          <div className="ft-groups">
            {AGENT_GROUPS.map(([g, items]) => (
              <div key={g}><small>{g}</small><div>{items.map((x) => <span key={x}>{x}</span>)}</div></div>
            ))}
          </div>
        </article>
        <article className="ft-b ft-b-review">
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
    </Block>
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
    <Block
      n="09" id="security" tag="Security, access and governance" lead="Manage access to EVOQ Sync" rest="and keep an audit history."
      use="Controls who can view and change integrations, and keeps a record of decisions." eg="Decide who can edit an integration and who can only view it."
      stage="s2"
      intro={<p>EVOQ Sync includes administrative controls for managing access, security settings and agent permissions.</p>}
    >
      <ul className="ft-tiles three plain">
        {SECURITY.map((r) => { const I = r.icon; return <li key={r.t}><span><I aria-hidden /></span><b>{r.t}</b></li>; })}
      </ul>
    </Block>
  );
}

export function SyncV1Features(): ReactNode {
  return (
    <SyncShell page="features">
      <style>{css}</style>
      <Hero />
      <Tabs />
      <Connections />
      <Integrations />
      <Mapping />
      <Builder />
      <Executions />
      <Monitoring />
      <Reports />
      <Agents />
      <Security />
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
  .ft-tabs-bar{position:sticky;top:0;z-index:40;padding:0 20px;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid ${C.line}}
  .ft-tabs-rail{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:6px;padding:10px 0;overflow-x:auto;scrollbar-width:none}
  .ft-tabs-rail::-webkit-scrollbar{display:none}
  .ft-tg{display:flex;align-items:center;gap:4px;flex-shrink:0}
  .ft-tg+.ft-tg{margin-left:10px;padding-left:16px;border-left:1px solid ${C.line}}
  .ft-tg small{margin-right:6px;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.muted};white-space:nowrap}
  .ft-tg a{display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:999px;font-size:14px;font-weight:600;color:${C.body};text-decoration:none;white-space:nowrap;transition:background .2s ease,color .2s ease}
  .ft-tg a svg{width:16px;height:16px;color:${C.muted};transition:color .2s ease}
  .ft-tg a:hover{background:${C.g1};color:${C.ink}}
  .ft-tg a.on{background:${C.primary};color:#fff}
  .ft-tg a.on svg{color:#fff}
  section.sx-sec[id]{scroll-margin-top:80px}

  /* a feature block: numbered title, one large stage, capability cards */
  .fb-head{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start;margin-bottom:40px}
  .fb-tag{display:inline-flex;align-items:center;gap:10px;margin-bottom:18px;padding:5px 14px 5px 5px;border-radius:999px;background:${C.tint};color:${C.primary};font-size:13px;font-weight:700;letter-spacing:.02em}
  .fb-tag b{display:flex;align-items:center;justify-content:center;min-width:28px;height:28px;border-radius:999px;background:${C.primary};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px}
  .fb-head h2{max-width:20ch;color:${C.ink};text-wrap:balance}
  .fb-head h2 .t2{color:#8E8C96}
  .fb-intro{margin-top:18px}
  .fb-intro p{margin:0;font-size:17px;line-height:1.62;color:${C.body};max-width:54ch}
  .fb-intro p.m{margin-top:12px;font-size:15.5px;color:${C.muted}}
  .fb-for{padding:22px 24px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .fb-for small{display:block;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.primary}}
  .fb-for p{margin:8px 0 0;font-size:16.5px;line-height:1.55;font-weight:500;color:${C.ink}}
  .fb-for p.eg{margin-top:14px;padding-top:14px;border-top:1px solid ${C.line};font-size:15px;font-weight:400;color:${C.body}}
  .fb-for p.eg b{display:block;margin-bottom:2px;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.muted}}
  .sx-dark .fb-for{background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
  .sx-dark .fb-for small{color:${C.lime}}
  .sx-dark .fb-for p{color:#fff}
  .sx-dark .fb-for p.eg{border-top-color:rgba(255,255,255,.14);color:#CDBEE8}
  .sx-dark .fb-for p.eg b{color:#A99BC9}
  .fb-stage{position:relative;display:flex;flex-direction:column;justify-content:center;gap:0;padding:56px;border-radius:32px;overflow:hidden}
  .fb-stage.s1{background:linear-gradient(135deg,#E6ECFF 0,#E8DBFB 55%,#FADDEC 100%)}
  .fb-stage.s2{background:linear-gradient(135deg,#FDE8D6 0,#F8DCEF 50%,#E3DCFB 100%)}
  .fb-stage.s3{background:linear-gradient(135deg,#D9F3EA 0,#E2EAFB 55%,#EBDDFB 100%)}
  .fb-stage.s4{background:radial-gradient(700px 360px at 85% 0,rgba(168,85,247,.55),transparent 70%),radial-gradient(500px 300px at 0 100%,rgba(163,230,53,.16),transparent 70%),#3B1A7A}
  .fb-stage>.ft-card,.fb-stage>.ft-canvas{width:100%;max-width:700px;margin:0 auto}
  .fb-stage>.ft-card.wide,.fb-stage>.ft-canvas{max-width:none}
  .fb-caps{list-style:none;margin:20px 0 0;padding:0;display:grid;gap:12px}
  .fb-caps.n3{grid-template-columns:repeat(3,1fr)}
  .fb-caps.n4{grid-template-columns:repeat(4,1fr)}
  .fb-caps li.x{display:none}
  .fb-more{display:block;margin:16px auto 0;padding:10px 20px;border:0;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font:600 14.5px var(--font-sans),system-ui,sans-serif;color:${C.primary};cursor:pointer}
  .fb-more:hover{background:${C.tint}}
  .sx-dark .fb-more{background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2);color:#fff}
  .fb-caps li{display:flex;gap:12px;align-items:flex-start;padding:18px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:15px;line-height:1.5;color:${C.ink}}
  .sx-grey .fb-caps li{background:#fff}
  .fb-caps li>span{display:flex;align-items:center;justify-content:center;width:22px;height:22px;margin-top:1px;border-radius:50%;background:${C.tint};color:${C.primary};flex-shrink:0}
  .fb-caps li>span svg{width:13px;height:13px}
  .sx-dark{background:${C.depth}}
  .sx-dark .fb-head h2{color:#fff}
  .sx-dark .fb-head h2 .t2{color:#A99BC9}
  .sx-dark .fb-intro p{color:#CDBEE8}
  .sx-dark .fb-tag{background:rgba(255,255,255,.1);color:#E9D5FF}
  .sx-dark .fb-tag b{background:${C.lime};color:${C.limeInk}}
  .sx-dark .fb-caps li{background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);color:#fff}
  .sx-dark .fb-caps li>span{background:rgba(163,230,53,.18);color:${C.lime}}

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

  ${ctaCss}

  @media (max-width:1080px){
    .fb-head{gap:36px}
    .fb-caps.n4{grid-template-columns:repeat(2,1fr)}
  }
  @media (max-width:980px){
    .fh{grid-template-columns:1fr;gap:36px}
    .fb-head{grid-template-columns:1fr;gap:20px;margin-bottom:30px}
    .fb-stage{padding:28px}
    .ft-flow{grid-template-columns:repeat(2,1fr)}
    .ft-flow li::after{display:none}
    .ft-steps{grid-template-columns:repeat(3,1fr);gap:18px 4px}
    .ft-steps li::after{display:none}
    .ft-tiles.three{grid-template-columns:1fr 1fr}
    .fb-caps.n3{grid-template-columns:repeat(2,1fr)}
    .ft-b-evi,.ft-b-agent{grid-column:1 / -1}
    .ft-b-review{flex-direction:column;align-items:flex-start}
  }
  @media (max-width:640px){
    .ft-hero{padding-top:36px}
    .ft-hero-copy>p{font-size:17px}
    .fh-stage{height:auto;display:grid;gap:12px;padding:16px}
    .fh-card{position:static;width:auto!important;animation:none}
    .fh-card.c4{display:none}
    .fb-stage{padding:16px;border-radius:24px}
    .fb-caps.n3,.fb-caps.n4{grid-template-columns:1fr}
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
  @media (prefers-reduced-motion:reduce){.ft-tg a{transition:none}}
`;
