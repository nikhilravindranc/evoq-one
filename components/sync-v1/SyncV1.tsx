"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, Check, ChevronDown, Clock, Database, Eye, Filter, GitBranch, History, Lightbulb, MessageSquare, Pencil,
  Plug, RotateCw, Search, ShieldCheck, Sparkles, Type, X, Zap, type LucideIcon,
} from "lucide-react";
import { APPS, C, CAT_LABEL, CATS, IMG, KEYWORDS, SYNC_BASE, type Cat } from "./data";
import { Closing, Demo, Mark, SyncMark, SyncShell } from "./Shell";
import { VisBuilder, VisConnections, VisMapping, visCss } from "./Visuals";

/* EVOQ Sync v1 home. Copy follows the GTM and messaging playbook (12 Nov 2026). Records, IDs and times in the visuals
   are the seeded demo workspace of the Sync app, and the screens are captures of that app. */

export const Label = ({ children }: { children: ReactNode }) => <span className="sx-label">{children}</span>;

/* a browser frame around an app capture */
export function Shot({ src, alt, pos = "top left", ratio = "16 / 10", className = "", zoom = 1 }: { src: string; alt: string; pos?: string; ratio?: string; className?: string; zoom?: number }) {
  return (
    <figure className={`sx-shot ${className}`}>
      <div className="sx-shot-bar" aria-hidden><i /><i /><i /><span>EVOQ Sync</span></div>
      <div className="sx-shot-img" style={{ aspectRatio: ratio }}><img src={`${IMG}/app/${src}.webp`} alt={alt} loading="lazy" style={{ objectPosition: pos, transform: zoom !== 1 ? `scale(${zoom})` : undefined, transformOrigin: pos }} /></div>
    </figure>
  );
}

/* steps through n items while on screen; a click holds the choice for a while */
export function useAuto(n: number, ms: number) {
  const [i, setI] = useState(0);
  const hold = useRef(0);
  const seen = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      if (still || !seen.current || Date.now() < hold.current) return;
      setI((x) => (x + 1) % n);
    }, ms);
    return () => { io.disconnect(); window.clearInterval(id); };
  }, [n, ms]);
  const pick = (x: number) => { hold.current = Date.now() + 15000; setI(x); };
  return { i, pick, ref };
}

/* ---------- hero: describe it, EVI drafts the workflow ---------- */
type Node = { app?: string; icon?: LucideIcon; tone: string; t: string; s: string };
const FLOWS: { ask: string; nodes: Node[] }[] = [
  {
    ask: "When a Shopify order is paid, create the customer and sales order in NetSuite",
    nodes: [
      { app: "shopify", tone: C.primary, t: "Order paid", s: "Trigger" },
      { icon: ShieldCheck, tone: C.warn, t: "Validate required fields", s: "Validation" },
      { icon: Search, tone: "#0F766E", t: "Find customer", s: "NetSuite search" },
      { icon: GitBranch, tone: "#1D4ED8", t: "Customer exists?", s: "Condition" },
      { app: "netsuite", tone: C.primary, t: "Create sales order", s: "App action" },
    ],
  },
  {
    ask: "Sync HubSpot accounts to NetSuite customers",
    nodes: [
      { app: "hubspot", tone: C.primary, t: "Account updated", s: "Trigger" },
      { icon: Database, tone: "#0F766E", t: "Retrieve account", s: "Data" },
      { icon: ShieldCheck, tone: C.warn, t: "Validate required fields", s: "Validation" },
      { icon: Type, tone: "#0369A1", t: "Country to ISO code", s: "Transformation" },
      { app: "netsuite", tone: C.primary, t: "Create or update customer", s: "App action" },
    ],
  },
  {
    ask: "Send low stock alerts to Slack",
    nodes: [
      { icon: Clock, tone: C.primary, t: "Every 5 minutes", s: "Schedule" },
      { app: "netsuite", tone: "#0F766E", t: "Search inventory", s: "Data" },
      { icon: Filter, tone: "#1D4ED8", t: "Below reorder point", s: "Filter" },
      { icon: Type, tone: "#0369A1", t: "Format message", s: "Transformation" },
      { app: "slack", tone: C.primary, t: "Post to #warehouse", s: "App action" },
    ],
  },
];

function HeroStage() {
  const [f, setF] = useState(0);
  const [step, setStep] = useState(0);
  const [hold, setHold] = useState(false);
  const flow = FLOWS[f];
  const half = Math.ceil(flow.ask.length / 2);
  const typed = Math.min(flow.ask.length, step * 2);
  const built = Math.max(0, step - half);
  const end = half + flow.nodes.length + 1;
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => setStep((x) => (still ? 9999 : x >= end ? x : x + 1)), 38);
    return () => window.clearInterval(id);
  }, [f, end]);
  useEffect(() => {
    if (hold || step < end) return;
    const id = window.setTimeout(() => { setStep(0); setF((x) => (x + 1) % FLOWS.length); }, 3800);
    return () => window.clearTimeout(id);
  }, [step, end, hold]);
  const choose = (k: number) => { setHold(true); setStep(0); setF(k); };
  const done = built > flow.nodes.length;
  return (
    <div className="hx-stage" data-rv>
      <div className="hx-prompt">
        <img src={`${IMG}/characters/evi-head.webp`} alt="" className="hx-evi" />
        <div className="hx-ask">
          <small>Tell EVI what should move</small>
          <p>{flow.ask.slice(0, typed)}<span className={`hx-caret${typed >= flow.ask.length ? " off" : ""}`} /></p>
        </div>
        <span className="hx-build"><Sparkles aria-hidden />Build with EVI</span>
      </div>
      <div className="hx-picks" role="tablist" aria-label="Example requests">
        {FLOWS.map((x, k) => (
          <button key={x.ask} type="button" role="tab" aria-selected={k === f} className={k === f ? "on" : undefined} onClick={() => choose(k)}>
            {["Shopify to NetSuite", "HubSpot to NetSuite", "Low stock to Slack"][k]}
          </button>
        ))}
      </div>
      <div className="hx-canvas">
        <div className="hx-canvas-top">
          <span className="hx-tag">Sample workflow, prepared for your review</span>
          <span className={`hx-valid${done ? " on" : ""}`}><Check aria-hidden />{done ? "Valid" : "Drafting"}</span>
        </div>
        <ol className="hx-flow">
          {flow.nodes.map((n, k) => {
            const I = n.icon;
            return (
              <li key={`${f}-${k}`} className={k < built ? "in" : undefined}>
                <span className="hx-node" style={{ background: n.app ? "#fff" : n.tone }}>
                  {n.app ? <Mark id={n.app} size={34} /> : I ? <I aria-hidden /> : null}
                </span>
                <b>{n.t}</b>
                <small>{n.s}</small>
              </li>
            );
          })}
        </ol>
        <div className="hx-canvas-foot">
          <span className="hx-run"><Zap aria-hidden />Run Test</span>
          <span className="hx-foot-note">Nothing runs until you test it and switch it on</span>
          <span className="hx-enabled">Enabled<span className="sx-switch"><i /></span></span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const ids = ["hubspot", "salesforce", "netsuite", "quickbooks", "xero", "shopify", "sap", "stripe", "mailchimp", "slack"];
  return (
    <section className="sx-out hx">
      <div className="sx-in">
        <div className="hx-copy">
          <span className="hx-eyebrow" data-rv><SyncMark size={22} />EVOQ Sync · Integration platform for business apps</span>
          <h1 data-rv="1">Get your systems to agree.</h1>
          <p data-rv="2">EVOQ Sync keeps your CRM, ERP, accounting and shop in step. When a record fails, it tells you what happened, why, and what is safe to do. An assistant prepares the fix. You approve it.</p>
          <div className="sx-ctas hx-ctas" data-rv="3">
            <Demo location="hero" />
            <a href="#monday" className="sx-btn secondary">See a failed sync explained<ArrowRight aria-hidden /></a>
          </div>
          <div className="hx-works" data-rv="4">
            <div className="hx-marks">{ids.map((id) => <Mark key={id} id={id} size={30} title />)}</div>
            <span>Works with HubSpot, Salesforce, NetSuite, QuickBooks, Xero, Shopify and 26 more, plus any REST API.</span>
          </div>
        </div>
        <HeroStage />
      </div>
    </section>
  );
}

/* ---------- what it covers, in the words buyers search with ---------- */
function Covers() {
  return (
    <section className="sx-out cv-out" aria-label="What EVOQ Sync covers">
      <div className="sx-in cv">
        <span className="cv-t">What it covers</span>
        <ul>
          {KEYWORDS.map((k) => {
            const href = k.href.startsWith("#") ? k.href : `${SYNC_BASE}/${k.href}`;
            return <li key={k.k}><a href={href} title={k.what}>{k.k}</a></li>;
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- the 8:40 Monday moment ---------- */
const PATH = [
  { t: "Trigger", s: "94 ms", st: "ok" },
  { t: "Retrieve record", s: "131 ms", st: "ok" },
  { t: "Validate required fields", s: "168 ms", st: "err" },
  { t: "Map fields", s: "skipped", st: "skip" },
  { t: "Create customer", s: "skipped", st: "skip" },
];
const EXPLAIN = [
  { k: "What happened", tag: "Observed", icon: Eye, body: "3 of 12 records failed at the step “Validate required fields”. The other 9 reached NetSuite.", list: ["Execution EX-20491, HubSpot accounts to NetSuite customers", "Records that failed: Soylent, Contoso Ltd, Initech"] },
  { k: "Likely cause", tag: "Inferred, not confirmed", icon: Lightbulb, body: "Accounts created before March have no tax ID. The NetSuite subsidiary now requires it for EMEA customers.", list: ["Labelled as an inference, because it is", "EVI shows what it looked at before saying so"] },
  { k: "What to do", tag: "Suggested fix", icon: Pencil, body: "Add a default, or skip the check when the account is outside EMEA. The 3 records are eligible for retry after the change.", list: ["Eligible for retry: up to 3 attempts, every 2 min", "Prepare proposal sends the fix for your approval"] },
];

function Monday() {
  const { i, pick, ref } = useAuto(EXPLAIN.length, 5200);
  const e = EXPLAIN[i];
  const I = e.icon;
  return (
    <section className="sx-sec sx-out sx-grey" id="monday">
      <div className="sx-in md">
        <div className="md-copy">
          <Label>Explained failures</Label>
          <h2 data-rv>It is 8:40 on Monday. The order is in Shopify. It is not in NetSuite.</h2>
          <p data-rv="1">Your warehouse is waiting. The error says <code>Required field “taxRegistrationNumber” is empty</code>. Most integration tools stop at that sentence. EVOQ Sync keeps going, in this order:</p>
          <div className="md-tabs" role="tablist" aria-label="How a failure is explained" data-rv="2">
            {EXPLAIN.map((x, k) => {
              const J = x.icon;
              return (
                <button key={x.k} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : undefined} onClick={() => pick(k)}>
                  <span className="md-n">{k + 1}</span><J aria-hidden /><b>{x.k}</b><span className="md-bar"><i key={`${i}-${k}`} /></span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="md-card" ref={ref} data-rv="1">
          <div className="md-card-hd">
            <div><b>EX-20491</b><span className="md-pill warn">Partial failure</span></div>
            <small>HubSpot accounts to NetSuite customers · 12 records · 9 ok · 3 failed</small>
          </div>
          <ol className="md-path">
            {PATH.map((p) => (
              <li key={p.t} className={p.st}>
                <span>{p.st === "ok" ? <Check aria-hidden /> : p.st === "err" ? <X aria-hidden /> : null}</span>
                <b>{p.t}</b><small>{p.s}</small>
              </li>
            ))}
          </ol>
          <pre className="md-code">Required field &quot;taxRegistrationNumber&quot; is empty</pre>
          <div className="md-explain" key={i}>
            <div className="md-explain-hd"><I aria-hidden /><b>{e.k}</b><span className={`md-tag${i === 1 ? " inf" : ""}`}>{e.tag}</span></div>
            <p>{e.body}</p>
            <ul>{e.list.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="md-actions">
            <span className="md-act evi"><img src={`${IMG}/characters/evi-head.webp`} alt="" />Diagnose with EVI</span>
            <span className="md-act">Correct configuration</span>
            <span className="md-act pri"><RotateCw aria-hidden />Retry eligible (3)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- how it works ---------- */
function HowItWorks() {
  return (
    <section className="sx-sec sx-out" id="how">
      <div className="sx-in">
        <div className="sx-head">
          <Label>How it works</Label>
          <h2 data-rv>Connect, describe, test. Then switch it on.</h2>
          <p data-rv="1">A Get started checklist walks you from sign in to a live integration in five steps: connect apps, create an integration, match fields, run a test, go live.</p>
        </div>
        <div className="hw">
          <article className="hw-c" data-rv>
            <span className="hw-n">1</span>
            <h3>Connect your apps</h3>
            <p>Pick from 32 business systems. Sign in with OAuth 2.0, an API key or a token. EVOQ Sync remembers the connection and shows which integrations depend on it.</p>
            <div className="hw-vis"><VisConnections /></div>
          </article>
          <article className="hw-c" data-rv="1">
            <span className="hw-n">2</span>
            <h3>Say what should move</h3>
            <p>Start from a template for a common app pair, draw it on the canvas, or tell EVI in a sentence and review the draft it prepares.</p>
            <div className="hw-vis hw-ways">
              <div className="hw-way"><span><Database aria-hidden /></span><div><b>Start with a template</b><small>CRM to ERP, shop to ERP, CRM to marketing</small></div></div>
              <div className="hw-way"><span><GitBranch aria-hidden /></span><div><b>Create from scratch</b><small>Choose every app, object, mapping and rule</small></div></div>
              <div className="hw-way evi"><img src={`${IMG}/characters/evi-head.webp`} alt="" /><div><b>Describe it to EVI</b><small>“When a Shopify order is paid, create the sales order in NetSuite”</small></div></div>
            </div>
          </article>
          <article className="hw-c" data-rv="2">
            <span className="hw-n">3</span>
            <h3>Test it, then switch it on</h3>
            <p>Run Test on sample data and watch each step report back. Flip the Enabled switch when the result looks right.</p>
            <div className="hw-vis"><VisBuilder /></div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- EVI and the Sync Agent ---------- */
const BEATS = [
  { k: "You ask EVI", who: "EVI", img: "evi-tile.webp", shot: "16-evi-diagnosis", alt: "EVI panel diagnosing a failed execution", t: "EVI has read the page", p: "Ask “why did this fail?” on an execution and EVI already knows which execution you mean. It separates what it observed from what it infers, and shows what it looked at.", pos: "100% 0%" },
  { k: "The Sync Agent prepares", who: "Sync Agent", img: "sync-tile.webp", shot: "24-approval-review", alt: "Proposal review with facts, inference, before and after, and risk", t: "A proposal you can check", p: "EVI hands the fix to the Sync Agent. The proposal lists observed facts, the inferred reasoning, the change as before and after, and the risk.", pos: "100% 0%" },
  { k: "You decide", who: "You", img: "", shot: "25-history", alt: "History of requests, proposals and decisions", t: "Approve, reject, and keep the trail", p: "Approve Proposal or Reject. Changes to credentials or permissions ask you to sign in again. Every decision is written to History and the audit log with your name and the time.", pos: "50% 0%" },
];

function EviAgent() {
  const { i, pick, ref } = useAuto(BEATS.length, 6000);
  const b = BEATS[i];
  return (
    <section className="sx-sec sx-out sx-dark ev-sec" id="evi">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>AI companion and Sync Agent</Label>
          <h2 data-rv>An assistant that has actually read the page.</h2>
          <p data-rv="1">EVI is the EVOQ assistant on every screen. The Sync Agent is the specialist behind it that prepares changes. You stay the person who decides.</p>
        </div>
        <div className="ev" ref={ref}>
          <div className="ev-beats" role="tablist" aria-label="EVI, the Sync Agent and you">
            {BEATS.map((x, k) => (
              <button key={x.k} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : undefined} onClick={() => pick(k)}>
                {x.img ? <img src={`${IMG}/characters/${x.img}`} alt="" /> : <span className="ev-you"><Check aria-hidden /></span>}
                <span><small>Step {k + 1}</small><b>{x.k}</b></span>
                {k < BEATS.length - 1 && <ArrowRight aria-hidden className="ev-arrow" />}
              </button>
            ))}
          </div>
          <div className="ev-body" key={i}>
            <div className="ev-copy">
              <h3>{b.t}</h3>
              <p>{b.p}</p>
              {i === 1 && <img src={`${IMG}/characters/sync-pose-1.webp`} alt="The Sync Agent" className="ev-char" />}
              {i === 0 && <img src={`${IMG}/characters/evi-a.webp`} alt="EVI" className="ev-char" />}
              {i === 2 && (
                <div className="ev-btns"><span className="ev-btn">Reject</span><span className="ev-btn pri">Approve Proposal</span></div>
              )}
            </div>
            <Shot src={b.shot} alt={b.alt} pos={b.pos} className="ev-shot" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- control ---------- */
const SKILLS = [
  { n: "Integration Setup", d: "Guides creation and configuration", scope: "Read integrations, draft integrations" },
  { n: "Integration Management", d: "Pauses, retries or updates when permitted", scope: "Propose lifecycle changes" },
  { n: "Mapping", d: "Recommends field pairs with confidence", scope: "Read schemas, masked sample records" },
  { n: "Transformation", d: "Prepares rules with sample input and output", scope: "Read schemas, draft transformations" },
  { n: "Monitoring", d: "Reviews health and ranks issues", scope: "Read executions, connection metadata" },
  { n: "Error Diagnosis", d: "Finds the likely cause and proposes a fix", scope: "Read executions, masked record logs" },
  { n: "Optimization", d: "Recommends changes from execution patterns", scope: "Read executions and reports" },
];
const POLICY = [
  ["Read and explain", "Allowed within your permissions"],
  ["Suggest a mapping or transformation", "Free to suggest, approval to apply"],
  ["Create or activate an integration", "Explicit approval"],
  ["Change sync direction or active mapping", "Explicit approval"],
  ["Change workflow logic", "Explicit approval"],
  ["Create, update or delete records", "Approval by risk, deletion needs more"],
  ["Retry with possible side effects", "Approval, or a narrow policy you set"],
  ["Change credentials or permissions", "Approval and signing in again"],
];

function Control() {
  const [on, setOn] = useState<boolean[]>(SKILLS.map(() => true));
  return (
    <section className="sx-sec sx-out" id="control">
      <div className="sx-in">
        <div className="sx-head">
          <Label>Agent governance</Label>
          <h2 data-rv>You decide how much it may do.</h2>
          <p data-rv="1">The Sync Agent has seven capabilities. Each has a scope and a switch. Turn a capability off and it stops proposing that kind of change. History is kept.</p>
        </div>
        <div className="ct">
          <div className="ct-skills" data-rv>
            <div className="ct-skills-hd"><img src={`${IMG}/characters/sync-head.webp`} alt="" /><div><b>Sync Agent</b><small>Controls · {on.filter(Boolean).length} of 7 capabilities on</small></div></div>
            <ul>
              {SKILLS.map((s, k) => (
                <li key={s.n} className={on[k] ? undefined : "off"}>
                  <div><b>{s.n}</b><small>{on[k] ? s.d : "Off. No new proposals of this kind."}</small><em>{s.scope}</em></div>
                  <button type="button" role="switch" aria-checked={on[k]} aria-label={`${s.n} capability`} className={`sx-switch${on[k] ? " on" : ""}`} onClick={() => setOn((o) => o.map((v, j) => (j === k ? !v : v)))}><i /></button>
                </li>
              ))}
            </ul>
          </div>
          <div className="ct-policy" data-rv="1">
            <h3>Approval and autonomy policy</h3>
            <p>What the Sync Agent may do on its own, what needs your approval, and what needs you to sign in again.</p>
            <table>
              <thead><tr><th scope="col">Action</th><th scope="col">Default control</th></tr></thead>
              <tbody>{POLICY.map(([a, b]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td></tr>)}</tbody>
            </table>
            <div className="ct-audit"><History aria-hidden /><span>Every request, proposal and decision is recorded with the person and the time.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- two-way ---------- */
function TwoWay() {
  const pts = [
    ["Direction per field", "Map each field in a single direction or both. Fields synced both ways carry a conflict policy."],
    ["Decide who wins first", "Source wins, destination wins or last write wins, set before both sides ever change."],
    ["Required fields flagged", "Unmapped required destination fields show before you test, not after a run fails."],
    ["Preview the record", "A sample record shown before and after mapping, so the effect of a rule is visible."],
    ["Suggestions you accept", "EVI suggests mappings and transformations with a confidence score. Nothing applies until you accept it."],
  ];
  return (
    <section className="sx-sec sx-out sx-surface" id="two-way">
      <div className="sx-in tw">
        <div className="tw-copy">
          <Label>Data mapping and two way sync</Label>
          <h2 data-rv>Two systems. The same truth.</h2>
          <ul className="tw-list">
            {pts.map(([t, d], k) => <li key={t} data-rv={k}><span><Check aria-hidden /></span><div><b>{t}</b><p>{d}</p></div></li>)}
          </ul>
        </div>
        <div className="tw-vis" data-rv="1">
          <VisMapping />
          <div className="tw-float">
            <Mark id="salesforce" size={30} /><span className="tw-dir">Both directions</span><Mark id="quickbooks" size={30} />
            <small>Conflict policy: Accounting wins (QuickBooks)</small>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- apps ---------- */
function Apps() {
  const [cat, setCat] = useState<Cat | "All">("All");
  const list = APPS.filter((a) => cat === "All" || a.cat === cat);
  return (
    <section className="sx-sec sx-out" id="apps">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>Connectors</Label>
          <h2 data-rv>Start with the 32 apps your business runs on.</h2>
          <p data-rv="1">CRM, ERP, accounting, eCommerce, inventory, marketing and productivity. For anything else, connect any REST API. New connectors are added on request.</p>
        </div>
        <div className="ap-cats" role="tablist" aria-label="App categories" data-rv>
          {(["All", ...CATS] as const).map((c) => {
            const n = c === "All" ? APPS.length : APPS.filter((a) => a.cat === c).length;
            return <button key={c} type="button" role="tab" aria-selected={cat === c} className={cat === c ? "on" : undefined} onClick={() => setCat(c)}>{c === "All" ? "All apps" : CAT_LABEL[c]}<span>{n}</span></button>;
          })}
        </div>
        <ul className="ap-grid">
          {list.map((a) => (
            <li key={a.id} className="ap-c">
              <Mark id={a.id} size={40} />
              <div><b>{a.name}{a.soon && <em>Coming soon</em>}</b><small>{a.objects.slice(0, 4).join(", ")}</small></div>
            </li>
          ))}
          <li className="ap-c ap-api">
            <span className="ap-api-i"><Plug aria-hidden /></span>
            <div><b>Custom API connection</b><small>Any REST API: base URL, authentication, test call</small></div>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ---------- common integrations ---------- */
const CASES = [
  { a: "hubspot", b: "netsuite", two: false, t: "CRM accounts to ERP customers", d: "Older accounts have no tax ID and EMEA customers require it.", s: "Explains the missing field and proposes a default or a conditional skip for approval." },
  { a: "shopify", b: "netsuite", two: true, t: "Shop orders to ERP sales orders", d: "Bursts of orders hit the NetSuite rate limit (HTTP 429).", s: "Shows the records are eligible for retry, flags the side effect risk, and asks before retrying." },
  { a: "salesforce", b: "quickbooks", two: true, t: "Invoices in both directions", d: "Salesforce and QuickBooks both change invoice status.", s: "Maps the fields both ways with a stated conflict policy and a preview before it runs." },
  { a: "netsuite", b: "shopify", two: false, t: "ERP stock to the storefront", d: "Available quantity must reach Shopify without overselling.", s: "Pushes quantity every 5 minutes. Optimization proposes a concurrency cap from the pattern it sees." },
  { a: "hubspot", b: "mailchimp", two: false, t: "CRM contacts to a marketing list", d: "Contacts must reach Mailchimp without duplicates.", s: "Validates the email, matches on it, and logs every record it skips." },
];
function Cases() {
  return (
    <section className="sx-sec sx-out sx-grey" id="cases">
      <div className="sx-in">
        <div className="sx-head">
          <Label>Common integrations</Label>
          <h2 data-rv>Where systems usually disagree, and what Sync does about it.</h2>
        </div>
        <div className="cs">
          {CASES.map((c, k) => (
            <article key={c.t} className="cs-c" data-rv={k % 3}>
              <div className="cs-pair"><Mark id={c.a} size={38} /><span className="cs-arrow">{c.two ? "⇄" : "→"}</span><Mark id={c.b} size={38} /></div>
              <h3>{c.t}</h3>
              <p className="cs-d"><b>The disagreement</b>{c.d}</p>
              <p className="cs-s"><b>What EVOQ Sync does</b>{c.s}</p>
            </article>
          ))}
          <article className="cs-c cs-ask" data-rv="2">
            <MessageSquare aria-hidden />
            <h3>Your two systems are not here?</h3>
            <p>Tell us which pair disagrees most. If it has a REST API, it can be connected.</p>
            <Demo location="cases" className="sx-btn primary sm">Book a walkthrough</Demo>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- who ---------- */
const WHO = [
  ["Operations", "See what is wrong and what to do, without waiting for IT.", "Plain language errors, attention queue, guided start"],
  ["Finance", "Trust that the invoice in your CRM is the invoice in accounting.", "Two way sync, conflict policy, record preview"],
  ["Integration managers", "Get a proper canvas, a test mode and logs for every record.", "Workflow Builder, Run Test, record logs, scripts"],
  ["Security and admins", "Say yes to AI, because it asks first and leaves a trail.", "Scopes and switches, roles, MFA, SSO, audit history"],
  ["Consultants and partners", "Hand over an integration your client can read.", "Templates, InfoTips, documented history"],
];
function Who() {
  return (
    <section className="sx-sec sx-out" id="who">
      <div className="sx-in">
        <div className="sx-head">
          <Label>Who it is for</Label>
          <h2 data-rv>Built for the people who live with the integration.</h2>
        </div>
        <div className="wh">
          {WHO.map(([t, d, f], k) => (
            <article key={t} className="wh-c" data-rv={k % 3}>
              <span className="wh-n">{String(k + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <small>{f}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export const FAQ: [string, string][] = [
  ["Does the AI change things on its own?", "Not by default. EVI explains and guides. The Sync Agent prepares proposals. Consequential actions need your approval, a narrow policy can pre-approve specific retries, and changes to credentials or permissions ask you to sign in again."],
  ["How do I know the AI is right?", "It shows its working. Every answer separates what it observed from what it inferred, and a proposal shows the change as before and after, plus the risk."],
  ["Which apps does it connect to?", "32 today, including HubSpot, Salesforce, NetSuite, SAP Business One, QuickBooks, Xero, Sage, Shopify, WooCommerce, Magento and Klaviyo. Dynamics 365 is coming soon. Anything with a REST API connects through a custom API connection."],
  ["Do I need a developer?", "No. Templates, a ten step wizard and a visual canvas cover most integrations. Developers get scripts, logs and full detail when they want it."],
  ["Can I see who approved what?", "Yes. Every request, proposal and decision is recorded with the person and the time, in History and the audit log."],
  ["Can I turn the AI off?", "Yes, capability by capability, on the Controls screen."],
];
export function Faq({ items = FAQ, grey = true }: { items?: [string, string][]; grey?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`sx-sec sx-out${grey ? " sx-grey" : ""}`} id="faq">
      <div className="sx-in fq">
        <div className="fq-head">
          <Label>FAQ</Label>
          <h2 data-rv>Questions teams ask first.</h2>
        </div>
        <div className="fq-list">
          {items.map(([q, a], k) => (
            <div key={q} className={`fq-i${open === k ? " open" : ""}`}>
              <button type="button" aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)}>{q}<ChevronDown aria-hidden /></button>
              <div className="fq-a"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SyncV1() {
  return (
    <SyncShell page="overview">
      <style>{css}</style>
      <Hero />
      <Covers />
      <Monday />
      <HowItWorks />
      <EviAgent />
      <Control />
      <TwoWay />
      <Apps />
      <Cases />
      <Who />
      <Faq />
      <Closing />
    </SyncShell>
  );
}

/* shared section styles, also used by the features and pricing pages */
export const sharedCss = `
  ${visCss}
  .sx-shot{margin:0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px ${C.line},0 30px 60px -30px rgba(46,16,101,.35)}
  .sx-shot-bar{display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;background:#F3F1F7;border-bottom:1px solid ${C.line}}
  .sx-shot-bar i{width:9px;height:9px;border-radius:50%;background:#D9D4E2}
  .sx-shot-bar span{margin-left:10px;font-size:11.5px;color:${C.muted};font-family:var(--font-sans),system-ui,sans-serif}
  .sx-shot-img{position:relative;overflow:hidden}
  .sx-shot-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}

  .fq{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:start}
  .fq-head .sx-label{margin-bottom:14px}
  .fq-head h2{text-align:left}
  .fq-list{display:grid;gap:10px}
  .fq-i{border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};transition:box-shadow .2s ease}
  .fq-i.open{box-shadow:inset 0 0 0 1.5px ${C.soft}}
  .fq-i button{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;padding:20px 22px;border:0;background:none;text-align:left;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;color:${C.ink};cursor:pointer}
  .fq-i button svg{width:18px;height:18px;flex-shrink:0;color:${C.primary};transition:transform .25s ease}
  .fq-i.open button svg{transform:rotate(180deg)}
  .fq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
  .fq-i.open .fq-a{grid-template-rows:1fr}
  .fq-a p{overflow:hidden;margin:0;padding:0 22px;font-size:15.5px;line-height:1.65}
  .fq-i.open .fq-a p{padding-bottom:20px}
  @media (max-width:860px){.fq{grid-template-columns:1fr;gap:28px}}
`;

const css = `
  ${sharedCss}
  /* hero */
  .hx{padding-top:72px;padding-bottom:40px;background:radial-gradient(900px 420px at 50% 0%,${C.tint},rgba(255,255,255,0) 70%),#fff}
  .hx-copy{max-width:880px;margin:0 auto;text-align:center}
  .hx-eyebrow{display:inline-flex;align-items:center;gap:10px;padding:6px 14px 6px 6px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.soft};font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;font-weight:600;color:${C.primary}}
  .hx h1{margin-top:22px!important}
  .hx-copy>p{max-width:700px;margin:20px auto 0;font-size:19px;line-height:1.6}
  .hx-ctas{justify-content:center}
  .hx-works{display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:30px}
  .hx-marks{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
  .hx-works>span{font-size:14px;color:${C.muted}}

  .hx-stage{position:relative;margin:52px auto 0;max-width:1120px;padding:26px;border-radius:26px;background:${C.depth};box-shadow:0 40px 80px -40px rgba(46,16,101,.7);isolation:isolate;overflow:hidden}
  .hx-stage::before{content:"";position:absolute;inset:0;z-index:-1;background-image:radial-gradient(rgba(255,255,255,.09) 1px,transparent 1.3px);background-size:20px 20px}
  .hx-stage::after{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(520px 260px at 85% 0%,rgba(168,85,247,.4),transparent 70%)}
  .hx-prompt{display:flex;align-items:center;gap:14px;padding:14px 14px 14px 16px;border-radius:18px;background:#fff}
  .hx-evi{width:46px;height:46px;border-radius:50%;background:${C.tint};flex-shrink:0}
  .hx-ask{flex:1;min-width:0;text-align:left}
  .hx-ask small{display:block;font-size:12px;font-weight:600;color:${C.muted};letter-spacing:.02em}
  .hx-ask p{margin:2px 0 0;min-height:27px;font-family:var(--font-display),system-ui,sans-serif;font-size:18px;font-weight:500;color:${C.ink};line-height:1.45}
  .hx-caret{display:inline-block;width:2px;height:20px;margin-left:2px;vertical-align:-3px;background:${C.primary};animation:hxBlink 1s steps(1) infinite}
  .hx-caret.off{opacity:0;animation:none}
  @keyframes hxBlink{50%{opacity:0}}
  .hx-build{display:inline-flex;align-items:center;gap:8px;flex-shrink:0;padding:11px 16px;border-radius:12px;background:${C.primary};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600}
  .hx-build svg{width:16px;height:16px}
  .hx-picks{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 0}
  .hx-picks button{padding:7px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.22);background:transparent;color:#E2D6F5;font-size:13.5px;font-weight:500;cursor:pointer;transition:background .2s ease,border-color .2s ease,color .2s ease}
  .hx-picks button:hover{border-color:rgba(255,255,255,.5)}
  .hx-picks button.on{background:${C.lime};border-color:${C.lime};color:${C.limeInk}}
  .hx-canvas{margin-top:16px;border-radius:18px;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);padding:18px 20px}
  .hx-canvas-top{display:flex;justify-content:space-between;align-items:center;gap:12px}
  .hx-tag{font-size:13px;color:#CDBEE8}
  .hx-valid{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.08);color:#CDBEE8;font-size:12.5px;font-weight:600}
  .hx-valid svg{width:14px;height:14px}
  .hx-valid.on{background:${C.lime};color:${C.limeInk}}
  .hx-flow{list-style:none;margin:26px 0 22px;padding:0;display:grid;grid-template-columns:repeat(5,1fr);gap:12px;position:relative}
  .hx-flow li{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;opacity:0;transform:translateY(10px) scale(.96);transition:opacity .35s ease,transform .35s cubic-bezier(.2,.8,.2,1)}
  .hx-flow li.in{opacity:1;transform:none}
  .hx-flow li:not(:last-child)::after{content:"";position:absolute;top:27px;left:calc(50% + 34px);right:calc(-50% + 34px);height:2px;background:repeating-linear-gradient(90deg,${C.lime} 0 7px,transparent 7px 12px);opacity:0;transition:opacity .3s ease .2s}
  .hx-flow li.in:not(:last-child)::after{opacity:.9}
  .hx-node{display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:16px;color:#fff;box-shadow:0 0 0 4px rgba(255,255,255,.08)}
  .hx-node svg{width:24px;height:24px}
  .hx-flow b{margin-top:12px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:#fff;line-height:1.3}
  .hx-flow small{margin-top:3px;font-size:12.5px;color:#B9A8D8}
  .hx-canvas-foot{display:flex;align-items:center;gap:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.12)}
  .hx-run{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:10px;background:${C.primary};color:#fff;font-size:13.5px;font-weight:600}
  .hx-run svg{width:14px;height:14px}
  .hx-foot-note{font-size:13px;color:#CDBEE8}
  .hx-enabled{margin-left:auto;display:inline-flex;align-items:center;gap:10px;font-size:13.5px;font-weight:600;color:#fff}

  /* covers */
  .cv-out{border-bottom:1px solid ${C.line}}
  .cv{display:flex;align-items:center;gap:22px;padding:22px 0}
  .cv-t{flex-shrink:0;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${C.muted}}
  .cv ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
  .cv a{display:inline-block;padding:6px 12px;border-radius:999px;background:${C.g1};font-size:13.5px;font-weight:500;color:${C.ink};text-decoration:none;transition:background .18s ease,color .18s ease}
  .cv a:hover{background:${C.tint};color:${C.primary}}

  /* monday */
  .md{display:grid;grid-template-columns:.95fr 1.05fr;gap:56px;align-items:center}
  .md-copy .sx-label{margin-bottom:14px}
  .md-copy>p{margin:18px 0 0;font-size:17.5px}
  .md-copy code{display:inline;padding:2px 7px;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:14.5px;color:${C.err};white-space:normal}
  .md-tabs{display:grid;gap:10px;margin-top:28px}
  .md-tabs button{position:relative;display:flex;align-items:center;gap:12px;padding:16px 18px;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};text-align:left;cursor:pointer;overflow:hidden;transition:box-shadow .2s ease}
  .md-tabs button svg{width:18px;height:18px;color:${C.primary}}
  .md-tabs button b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;color:${C.ink}}
  .md-tabs button.on{box-shadow:inset 0 0 0 1.5px ${C.primary}}
  .md-n{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;background:${C.tint};color:${C.primary};font-size:13px;font-weight:700}
  .md-bar{position:absolute;left:0;right:0;bottom:0;height:3px}
  .md-tabs button.on .md-bar i{display:block;height:100%;background:${C.primary};animation:mdBar 5.2s linear forwards}
  @keyframes mdBar{from{width:0}to{width:100%}}
  .md-card{padding:22px;border-radius:22px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 40px 70px -40px rgba(46,16,101,.4)}
  .md-card-hd>div{display:flex;align-items:center;gap:10px}
  .md-card-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;color:${C.ink};letter-spacing:-.01em}
  .md-card-hd small{display:block;margin-top:4px;font-size:13.5px;color:${C.muted}}
  .md-pill{padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600}
  .md-pill.warn{background:#FEF3C7;color:#92400E}
  .md-path{list-style:none;margin:20px 0 0;padding:16px 8px;display:grid;grid-template-columns:repeat(5,1fr);gap:6px;border-radius:14px;background:${C.g1}}
  .md-path li{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center}
  .md-path li:not(:last-child)::after{content:"";position:absolute;top:17px;left:calc(50% + 22px);right:calc(-50% + 22px);height:2px;background:#DDD8E5}
  .md-path li>span{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#DDD8E5;color:#fff}
  .md-path li>span svg{width:17px;height:17px}
  .md-path li.ok>span{background:${C.ok}}
  .md-path li.err>span{background:${C.err};box-shadow:0 0 0 5px rgba(220,38,38,.15)}
  .md-path b{margin-top:8px;font-size:12.5px;line-height:1.3;color:${C.ink}}
  .md-path small{font-size:11.5px;color:${C.muted}}
  .md-path li.skip b{color:${C.muted}}
  .md-code{margin:16px 0 0;padding:14px 16px;border-radius:12px;background:#120B24;color:#F5F3FF;font-size:13.5px;white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
  .md-explain{margin-top:14px;padding:18px;border-radius:14px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft};animation:mdIn .4s ease}
  @keyframes mdIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .md-explain-hd{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .md-explain-hd svg{width:18px;height:18px;color:${C.primary}}
  .md-explain-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${C.ink}}
  .md-tag{margin-left:auto;padding:3px 10px;border-radius:999px;background:#fff;font-size:12px;font-weight:600;color:${C.primary};box-shadow:inset 0 0 0 1px ${C.soft}}
  .md-tag.inf{color:#1D4ED8;box-shadow:inset 0 0 0 1px #BFDBFE}
  .md-explain p{margin:10px 0 0;font-size:15.5px;color:${C.ink}}
  .md-explain ul{margin:10px 0 0;padding-left:18px;font-size:14px;color:${C.body}}
  .md-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
  .md-act{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border-radius:10px;font-size:13.5px;font-weight:600;color:${C.ink};box-shadow:inset 0 0 0 1px ${C.line}}
  .md-act img{width:20px;height:20px;border-radius:50%}
  .md-act svg{width:14px;height:14px}
  .md-act.evi{background:${C.tint};box-shadow:none;color:${C.primary}}
  .md-act.pri{background:${C.primary};color:#fff;box-shadow:none}

  /* how */
  .hw{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .hw-c{display:flex;flex-direction:column;padding:26px 26px 0;border-radius:22px;background:${C.g1};overflow:hidden}
  .hw-n{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:${C.primary};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-weight:700}
  .hw-c h3{--h3-size:22px;margin-top:18px!important}
  .hw-c>p{margin:10px 0 0;font-size:15.5px}
  .hw-vis{margin-top:auto;padding-top:24px}
  .hw-vis .sx-shot{border-radius:14px 14px 0 0}
  .hw-ways{display:grid;gap:10px;padding-bottom:26px}
  .hw-way{display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .hw-way>span{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;background:${C.tint};color:${C.primary};flex-shrink:0}
  .hw-way>span svg{width:19px;height:19px}
  .hw-way img{width:38px;height:38px;border-radius:50%;background:${C.tint};flex-shrink:0}
  .hw-way b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${C.ink}}
  .hw-way small{display:block;font-size:13px;color:${C.muted};line-height:1.45}
  .hw-way.evi{box-shadow:inset 0 0 0 1.5px ${C.action}}

  /* evi */
  .ev-sec{position:relative;overflow:hidden}
  .ev-beats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .ev-beats button{position:relative;display:flex;align-items:center;gap:12px;padding:12px 14px;border:0;border-radius:16px;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);text-align:left;cursor:pointer;color:#fff;transition:background .2s ease,box-shadow .2s ease}
  .ev-beats button.on{background:#fff;box-shadow:none}
  .ev-beats img{width:46px;height:46px;border-radius:12px;flex-shrink:0}
  .ev-you{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:12px;background:${C.lime};color:${C.limeInk};flex-shrink:0}
  .ev-you svg{width:22px;height:22px}
  .ev-beats small{display:block;font-size:12px;color:#B9A8D8}
  .ev-beats b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px}
  .ev-beats button.on b{color:${C.ink}}
  .ev-beats button.on small{color:${C.muted}}
  .ev-arrow{position:absolute;right:-17px;top:50%;width:22px;height:22px;margin-top:-11px;z-index:2;color:${C.lime}}
  .ev-body{display:grid;grid-template-columns:.75fr 1.25fr;gap:40px;align-items:center;margin-top:28px;animation:mdIn .45s ease}
  .ev-copy h3{--h3-size:28px}
  .ev-copy p{margin:14px 0 0;font-size:17px;color:#D9CCF0}
  .ev-char{display:block;width:210px;height:auto;margin-top:24px}
  .ev-btns{display:flex;gap:10px;margin-top:26px}
  .ev-btn{padding:10px 18px;border-radius:10px;background:#fff;color:${C.ink};font-weight:600;font-size:14.5px}
  .ev-btn.pri{background:${C.primary};color:#fff}
  .ev-shot{box-shadow:0 0 0 1px rgba(255,255,255,.14),0 40px 80px -30px rgba(0,0,0,.6)}

  /* control */
  .ct{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
  .ct-skills{padding:22px;border-radius:22px;background:${C.g1}}
  .ct-skills-hd{display:flex;align-items:center;gap:12px;padding-bottom:16px}
  .ct-skills-hd img{width:46px;height:46px;border-radius:12px;background:#D6EEFB}
  .ct-skills-hd b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${C.ink}}
  .ct-skills-hd small{font-size:13.5px;color:${C.muted}}
  .ct-skills ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
  .ct-skills li{display:flex;align-items:center;gap:16px;padding:14px 16px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};transition:opacity .2s ease}
  .ct-skills li>div{flex:1;min-width:0}
  .ct-skills li b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${C.ink}}
  .ct-skills li small{display:block;font-size:14px;color:${C.body};line-height:1.45}
  .ct-skills li em{display:inline-block;margin-top:6px;padding:2px 8px;border-radius:6px;background:${C.g1};font-style:normal;font-size:12px;color:${C.muted}}
  .ct-skills li.off small{color:${C.muted}}
  .ct-skills li.off b{color:${C.muted}}
  .ct-skills button.sx-switch{border:0;cursor:pointer;padding:0}
  .ct-policy{padding:28px;border-radius:22px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ct-policy h3{--h3-size:22px}
  .ct-policy>p{margin:8px 0 18px;font-size:15px}
  .ct-policy table{width:100%;border-collapse:collapse;font-size:14.5px}
  .ct-policy th,.ct-policy td{padding:11px 0;border-top:1px solid ${C.line};text-align:left;vertical-align:top}
  .ct-policy thead th{border-top:0;padding-top:0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${C.muted};font-weight:600}
  .ct-policy tbody th{font-weight:600;color:${C.ink};padding-right:16px;width:52%}
  .ct-policy td{color:${C.body}}
  .ct-audit{display:flex;gap:10px;align-items:flex-start;margin-top:18px;padding:14px 16px;border-radius:12px;background:${C.surface};font-size:14.5px;color:${C.ink}}
  .ct-audit svg{width:18px;height:18px;color:${C.primary};flex-shrink:0;margin-top:2px}

  /* two way */
  .tw{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center}
  .tw-copy .sx-label{margin-bottom:14px}
  .tw-list{list-style:none;margin:28px 0 0;padding:0;display:grid;gap:18px}
  .tw-list li{display:flex;gap:14px}
  .tw-list li>span{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:${C.primary};color:#fff;flex-shrink:0}
  .tw-list li>span svg{width:15px;height:15px}
  .tw-list b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;color:${C.ink}}
  .tw-list p{margin:3px 0 0;font-size:15.5px}
  .tw-vis{position:relative}
  .tw-float{position:absolute;left:-24px;bottom:-22px;display:grid;grid-template-columns:auto auto auto;align-items:center;gap:8px 10px;padding:14px 16px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 24px 40px -20px rgba(46,16,101,.45)}
  .tw-dir{padding:4px 10px;border-radius:999px;background:${C.lime};color:${C.limeInk};font-size:12.5px;font-weight:700}
  .tw-float small{grid-column:1/-1;font-size:12.5px;color:${C.muted}}

  /* apps */
  .ap-cats{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:30px}
  .ap-cats button{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;border:1px solid ${C.line};background:#fff;font-size:14px;font-weight:500;color:${C.ink};cursor:pointer;transition:background .18s ease,border-color .18s ease,color .18s ease}
  .ap-cats button span{font-size:12px;color:${C.muted}}
  .ap-cats button:hover{border-color:${C.soft}}
  .ap-cats button.on{background:${C.primary};border-color:${C.primary};color:#fff}
  .ap-cats button.on span{color:${C.soft}}
  .ap-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  .ap-c{display:flex;align-items:center;gap:14px;padding:16px;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};transition:box-shadow .2s ease,transform .2s ease}
  .ap-c:hover{box-shadow:inset 0 0 0 1.5px ${C.soft};transform:translateY(-2px)}
  .ap-c>div{min-width:0}
  .ap-c b{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${C.ink};line-height:1.3}
  .ap-c b em{padding:1px 7px;border-radius:6px;background:#FEF3C7;font-style:normal;font-size:11px;font-weight:600;color:#92400E}
  .ap-c small{display:block;margin-top:2px;font-size:13px;color:${C.muted};line-height:1.4}
  .ap-api{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.soft}}
  .ap-api-i{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:11px;background:${C.primary};color:#fff;flex-shrink:0}
  .ap-api-i svg{width:20px;height:20px}

  /* cases */
  .cs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .cs-c{display:flex;flex-direction:column;padding:24px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .cs-pair{display:flex;align-items:center;gap:10px}
  .cs-arrow{font-size:20px;color:${C.primary};font-weight:700}
  .cs-c h3{--h3-size:19px;margin-top:18px!important}
  .cs-c p{margin:12px 0 0;font-size:15px}
  .cs-c p b{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${C.muted};font-weight:600;margin-bottom:2px}
  .cs-s{padding-top:12px;border-top:1px solid ${C.line}}
  .cs-ask{background:${C.depth};box-shadow:none;color:#D9CCF0}
  .cs-ask svg{width:30px;height:30px;color:${C.lime}}
  .cs-ask h3{color:#fff}
  .cs-ask .sx-btn{margin-top:auto;align-self:flex-start;background:${C.lime};color:${C.limeInk};box-shadow:none}
  .cs-ask p{margin-bottom:20px}

  /* who */
  .wh{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
  .wh-c{padding:22px;border-radius:20px;background:${C.g1};display:flex;flex-direction:column}
  .wh-n{font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:700;color:${C.primary}}
  .wh-c h3{--h3-size:18px;margin-top:14px!important}
  .wh-c p{margin:10px 0 0;font-size:15px;color:${C.ink}}
  .wh-c small{display:block;margin-top:auto;padding-top:16px;font-size:13px;color:${C.muted};line-height:1.45}

  @media (max-width:1100px){
    .ap-grid{grid-template-columns:repeat(3,1fr)}
    .wh{grid-template-columns:repeat(3,1fr)}
  }
  @media (max-width:980px){
    .md,.tw,.ct{grid-template-columns:1fr}
    .hw,.cs{grid-template-columns:1fr 1fr}
    .ev-body{grid-template-columns:1fr}
    .ev-char{display:none}
    .tw-float{left:12px}
  }
  @media (max-width:760px){
    .hx{padding-top:48px}
    .hx-copy>p{font-size:17px}
    .hx-stage{padding:14px;border-radius:20px;margin-top:40px}
    .hx-prompt{flex-wrap:wrap}
    .hx-build{width:100%;justify-content:center}
    .hx-picks{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-right:-14px;padding-right:14px}
    .hx-picks button{flex-shrink:0}
    .hx-ask p{font-size:16px}
    .hx-flow{grid-template-columns:1fr;gap:0;margin:18px 0}
    .hx-flow li{flex-direction:row;text-align:left;gap:12px;padding:8px 0;flex-wrap:wrap}
    .hx-flow li:not(:last-child)::after{top:auto;bottom:-6px;left:27px;right:auto;width:2px;height:16px;background:repeating-linear-gradient(180deg,${C.lime} 0 5px,transparent 5px 9px)}
    .hx-flow b{margin:0}
    .hx-flow small{margin:0;width:100%;padding-left:68px;margin-top:-22px}
    .hx-flow li>b{flex:1}
    .hx-foot-note{display:none}
    .cv{flex-direction:column;align-items:flex-start;gap:12px}
    .md-path{grid-template-columns:repeat(5,minmax(0,1fr));padding:12px 4px}
    .md-path b{font-size:11px}
    .md-path li:not(:last-child)::after{left:calc(50% + 18px);right:calc(-50% + 18px)}
    .hw,.cs,.wh{grid-template-columns:1fr}
    .ap-grid{grid-template-columns:1fr 1fr}
    .ev-beats{grid-template-columns:1fr}
    .ev-arrow{display:none}
    .ct-policy{padding:20px}
    .tw-float{position:static;margin-top:14px}
  }
  @media (max-width:480px){
    .ap-grid{grid-template-columns:1fr}
    .md-path small{display:none}
  }
`;
