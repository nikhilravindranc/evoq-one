"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftRight, ArrowRight, Check, ChevronDown, FlaskConical, Lightbulb, ListChecks, Plug, ShieldCheck, Shuffle,
  Sparkles, Workflow, X, type LucideIcon,
} from "lucide-react";
import { APPS, C, CAT_LABEL, CATS, IMG, SYNC_BASE, type Cat } from "./data";
import { Demo, Mark, SyncMark, SyncShell } from "./Shell";
import { VisBuilder, VisConnections, VisMapping, VisMonitoring, visCss } from "./Visuals";

/* EVOQ Sync v1 home, nine sections: hero, the problem, how it works, integration scenarios, monitoring, data mapping
   and workflow automation, EVI and the Sync Agent, application compatibility, final call to action. Records, IDs and
   times in the visuals are the seeded demo workspace of the Sync app, and the screens are captures of that app. */

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


/* ---------- 1 hero ---------- */
const HUB_L = ["shopify", "salesforce", "hubspot"];
const HUB_R = ["netsuite", "quickbooks", "xero"];

function HeroHub() {
  // lines from each app to the Sync mark in the middle; the dashes travel toward the hub on the left, away on the right
  const ys = [70, 200, 330];
  return (
    <div className="hb" aria-hidden>
      <svg className="hb-lines" viewBox="0 0 560 400" preserveAspectRatio="none">
        {ys.map((y) => <path key={`l${y}`} className="hb-path in" d={`M78 ${y} C 190 ${y}, 200 200, 280 200`} />)}
        {ys.map((y) => <path key={`r${y}`} className="hb-path out" d={`M280 200 C 360 200, 370 ${y}, 482 ${y}`} />)}
      </svg>
      <div className="hb-col l">{HUB_L.map((id) => <span key={id} className="hb-app"><Mark id={id} size={46} /></span>)}</div>
      <div className="hb-core"><span className="hb-ring" /><SyncMark size={84} bg={C.primary} /></div>
      <div className="hb-col r">{HUB_R.map((id) => <span key={id} className="hb-app"><Mark id={id} size={46} /></span>)}</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="sx-out hx">
      <div className="sx-in hx-grid">
        <div className="hx-copy">
          <span className="hx-eyebrow" data-rv><SyncMark size={22} />NO-CODE INTEGRATION PLATFORM</span>
          <h1 data-rv="1">Get your systems to <span className="hx-hl">agree.</span></h1>
          <p data-rv="2">EVOQ Sync keeps your CRM, ERP, accounting and eCommerce applications in step. It explains integration errors in plain English and prepares corrective actions for your review. You approve them. Nothing changes without you.</p>
          <div className="sx-ctas" data-rv="3">
            <Demo location="hero">Book a Walkthrough</Demo>
            <Link href={`${SYNC_BASE}/features`} className="sx-btn secondary">Explore Features<ArrowRight aria-hidden /></Link>
          </div>
          <div className="hx-works" data-rv="4">
            <div className="hx-marks">{["hubspot", "salesforce", "netsuite", "quickbooks", "shopify"].map((id) => <Mark key={id} id={id} size={28} />)}<span className="hx-api"><Plug aria-hidden /></span></div>
            <span>Connect 32 applications, with a Custom REST API Connection for the systems beyond the catalog.</span>
          </div>
        </div>
        <div className="hx-vis" data-rv="2">
          <HeroHub />
          <div className="hx-alert">
            <div className="hx-alert-hd"><span className="hx-alert-i"><X aria-hidden /></span><b>Order sync failed</b><small>8:40 AM</small></div>
            <p>Shopify order #1042 did not reach NetSuite. Required field “taxRegistrationNumber” is empty.</p>
            <div className="hx-alert-by"><img src={`${IMG}/characters/evi-head.webp`} alt="" /><span>EVI and Sync Agent</span></div>
            <div className="hx-alert-rec"><small>Recommended</small><span>Add a default tax ID for this subsidiary, then retry the order.</span></div>
            <span className="hx-alert-btn">Review and approve</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2 the problem: the 8:40 Monday moment ---------- */
const STEPS = [
  { t: "Order placed", s: "Shopify #1042", st: "ok" },
  { t: "Payment captured", s: "Shopify", st: "ok" },
  { t: "Create sales order", s: "NetSuite", st: "err" },
  { t: "Notify warehouse", s: "Not reached", st: "skip" },
];
const POINTS: { icon: LucideIcon; t: string }[] = [
  { icon: ListChecks, t: "Know which records were synchronized and which failed." },
  { icon: Lightbulb, t: "Understand the reason behind an execution error." },
  { icon: ShieldCheck, t: "Review the suggested corrective action before proceeding." },
];

function Problem() {
  return (
    <section className="sx-sec sx-out sx-grey" id="problem">
      <div className="sx-in">
        <div className="sx-head c pb-head">
          <Label>The problem</Label>
          <h2 data-rv>It is 8:40 on Monday. The order is in Shopify. It is not in NetSuite.</h2>
          <p data-rv="1">A customer placed an order. The payment went through. But the sales order never reached your ERP.</p>
          <p data-rv="2">You open the integration log and find an error code. Now someone has to investigate the failure, identify the missing information and work out what to do next.</p>
        </div>
        <div className="pb-card" data-rv="1">
          <div className="pb-card-hd">
            <div><b>Shopify orders to NetSuite sales orders</b><small>Execution EX-20493 · 8:40 AM</small></div>
            <span className="pb-pill">Failed</span>
          </div>
          <ol className="pb-steps">
            {STEPS.map((p) => (
              <li key={p.t} className={p.st}>
                <span>{p.st === "ok" ? <Check aria-hidden /> : p.st === "err" ? <X aria-hidden /> : null}</span>
                <b>{p.t}</b><small>{p.s}</small>
              </li>
            ))}
          </ol>
          <pre className="pb-code">Required field &quot;taxRegistrationNumber&quot; is empty</pre>
          <div className="pb-boxes">
            <div className="pb-box">
              <div className="pb-box-hd"><Lightbulb aria-hidden /><b>Likely cause</b><span className="pb-tag">Inferred</span></div>
              <p>The customer account has no tax ID, and the NetSuite subsidiary requires one for sales orders.</p>
            </div>
            <div className="pb-box act">
              <div className="pb-box-hd"><Sparkles aria-hidden /><b>Recommended action</b><span className="pb-tag ok">Eligible for retry</span></div>
              <p>Add a default tax ID rule for this subsidiary, then retry the order.</p>
            </div>
          </div>
        </div>
        <div className="pb-turn" data-rv>
          <h3>This is where integration problems become operational problems.</h3>
          <p>EVOQ Sync gives you a clearer view of what happened, which records were affected and what action may resolve the issue.</p>
        </div>
        <ul className="pb-points">
          {POINTS.map((x, k) => {
            const I = x.icon;
            return <li key={x.t} data-rv={k}><span><I aria-hidden /></span><p>{x.t}</p></li>;
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3 how it works ---------- */
function HowItWorks() {
  return (
    <section className="sx-sec sx-out" id="how">
      <div className="sx-in">
        <div className="sx-head hw-head">
          <div>
            <Label>How it works</Label>
            <h2 data-rv>From application connections to active integrations.</h2>
          </div>
          <div>
            <p data-rv="1">Set up an integration through a guided process. Choose the applications, select the data to synchronize, define how fields should correspond and test the result before activation.</p>
            <Link href={`${SYNC_BASE}/features#integrations`} className="sx-btn secondary hw-cta" data-rv="2">Explore Integration Features<ArrowRight aria-hidden /></Link>
          </div>
        </div>
        <div className="hw">
          <article className="hw-c" data-rv>
            <span className="hw-n">01</span>
            <h3>Connect your applications</h3>
            <p>Choose from the application catalog or configure a Custom REST API Connection. Authorize the required connections and select the applications involved.</p>
            <div className="hw-vis"><VisConnections /></div>
          </article>
          <article className="hw-c" data-rv="1">
            <span className="hw-n">02</span>
            <h3>Configure your integration</h3>
            <p>Choose the data objects and synchronization direction. Map fields, define transformation rules and set how conflicting records should be handled.</p>
            <div className="hw-vis hw-cfg">
              <div className="hw-row"><small>Data object</small><b>Sales Order</b></div>
              <div className="hw-row"><small>Direction</small><b className="hw-dir"><Mark id="shopify" size={20} /><ArrowRight aria-hidden /><Mark id="netsuite" size={20} />One way</b></div>
              <div className="hw-row"><small>Field mapping</small><b>14 of 14 required fields mapped</b></div>
              <div className="hw-row"><small>Transformation</small><b>Date format, currency lookup</b></div>
              <div className="hw-row"><small>Conflict policy</small><b>Source wins</b></div>
            </div>
          </article>
          <article className="hw-c" data-rv="2">
            <span className="hw-n">03</span>
            <h3>Test and activate</h3>
            <p>Review the configuration, validate sample records and run a test. Once the setup is ready, activate the integration.</p>
            <div className="hw-vis"><VisBuilder /></div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4 integration scenarios ---------- */
const SCENARIOS = [
  { cat: "CRM to ERP", t: "Customer records", a: "hubspot", b: "netsuite", two: false, d: "Transfer new customer accounts from HubSpot to NetSuite. Map the required fields and identify missing tax information before records are processed." },
  { cat: "eCommerce to ERP", t: "Sales orders", a: "shopify", b: "netsuite", two: false, d: "Send paid Shopify orders to NetSuite as sales orders. Review execution results and identify records that need attention." },
  { cat: "CRM and Accounting", t: "Invoice status", a: "salesforce", b: "quickbooks", two: true, d: "Synchronize invoice information between Salesforce and QuickBooks. Define the synchronization direction and conflict policy for changes made in either application." },
  { cat: "ERP to eCommerce", t: "Inventory", a: "netsuite", b: "shopify", two: false, d: "Send available inventory quantities from NetSuite to Shopify so that product availability reflects the information held in your ERP." },
];

function Scenarios() {
  return (
    <section className="sx-sec sx-out sx-grey" id="scenarios">
      <div className="sx-in">
        <div className="sx-head">
          <Label>Integration scenarios</Label>
          <h2 data-rv>Make the information agree across your applications.</h2>
          <p data-rv="1">Different systems hold different parts of an operational process. EVOQ Sync moves the relevant information between them according to the rules you define.</p>
        </div>
        <div className="sc">
          {SCENARIOS.map((s, k) => (
            <article key={s.t} className="sc-c" data-rv={k % 2}>
              <div className="sc-top">
                <div className="sc-pair"><Mark id={s.a} size={40} /><span className="sc-arrow">{s.two ? <ArrowLeftRight aria-hidden /> : <ArrowRight aria-hidden />}</span><Mark id={s.b} size={40} /></div>
                <span className="sc-cat">{s.cat}</span>
              </div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
        <p className="sc-note">These are illustrative integration scenarios, not customer case studies.</p>
      </div>
    </section>
  );
}

/* ---------- 5 monitoring and troubleshooting ---------- */
const SEE = [
  "Execution status, duration and record counts.",
  "The workflow path and outcome of each step.",
  "Application responses and record-level logs.",
  "The likely cause of a failure, identified as an inference where applicable.",
  "Suggested corrective actions and retry eligibility.",
];

function Monitoring() {
  return (
    <section className="sx-sec sx-out" id="monitoring">
      <div className="sx-in mo">
        <div className="mo-copy">
          <Label>Monitoring and troubleshooting</Label>
          <h2 data-rv>Every error, translated.</h2>
          <p className="mo-lead" data-rv="1">An integration failure should tell you more than a code and a timestamp.</p>
          <p data-rv="1">EVOQ Sync gives you an execution-level view of the workflow, including the step that failed, its application response, the likely cause and a suggested corrective action.</p>
          <h4 data-rv="2">What you can see</h4>
          <ul className="mo-list" data-rv="2">{SEE.map((x) => <li key={x}><Check aria-hidden />{x}</li>)}</ul>
          <p className="mo-end" data-rv="3">Instead of starting with a support ticket, start with an explanation.</p>
          <Link href={`${SYNC_BASE}/features#monitoring`} className="sx-btn secondary" data-rv="3">Explore Monitoring Features<ArrowRight aria-hidden /></Link>
        </div>
        <div className="mo-vis" data-rv="1">
          <VisMonitoring />
        </div>
      </div>
    </section>
  );
}

/* ---------- 6 data mapping and workflow automation ---------- */
const MAP: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Shuffle, t: "Data Mapping", d: "Pair fields across applications, validate required fields and preview sample records before execution." },
  { icon: Sparkles, t: "Data Transformation", d: "Apply formatting, lookup and default-value rules to prepare information for the destination application." },
  { icon: ArrowLeftRight, t: "Synchronization Direction", d: "Configure one-way or bi-directional synchronization and define how conflicting changes should be handled." },
  { icon: Workflow, t: "Visual Workflow Builder", d: "Arrange triggers, data operations, transformations, logic, validations and application actions on a visual canvas." },
  { icon: FlaskConical, t: "Test Before Activation", d: "Run workflows against sample data and review the outcome of each step before enabling the integration." },
];

function Mapping() {
  return (
    <section className="sx-sec sx-out sx-surface" id="mapping">
      <div className="sx-in">
        <div className="sx-head">
          <Label>Data mapping and workflow automation</Label>
          <h2 data-rv>Define how information moves and what happens along the way.</h2>
          <p data-rv="1">Applications rarely use identical field names, formats or data structures. EVOQ Sync lets you define how information should correspond before synchronization takes place.</p>
        </div>
        <div className="mp">
          <div className="mp-vis" data-rv>
            <VisMapping />
            <div className="mp-float">
              <Mark id="salesforce" size={28} /><span className="mp-dir">Both directions</span><Mark id="quickbooks" size={28} />
              <small>Conflict policy: QuickBooks wins</small>
            </div>
          </div>
          <ul className="mp-list">
            {MAP.map((m, k) => {
              const I = m.icon;
              return <li key={m.t} data-rv={k % 3}><span><I aria-hidden /></span><div><h3>{m.t}</h3><p>{m.d}</p></div></li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7 EVI and the Sync Agent ---------- */
const CAN = [
  "Integration setup and configuration.",
  "Integration management.",
  "Field mapping and transformation rules.",
  "Execution monitoring and error diagnosis.",
  "Integration optimization.",
];
const SHOWS = ["Observed facts", "Likely inference", "Before and after", "Risk"];

function EviAgent() {
  return (
    <section className="sx-sec sx-out sx-dark ev-sec" id="evi">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>EVI and Sync Agent</Label>
          <h2 data-rv>You ask. It prepares. You decide.</h2>
          <p data-rv="1">EVI is the assistant available across EVOQ applications. In EVOQ Sync, it works with the Sync Agent, a specialist for integration setup, mapping, monitoring and optimization.</p>
          <p data-rv="2">EVI understands the screen you are working on and helps explain what is happening. When a change is needed, the Sync Agent prepares a proposal for you to review.</p>
        </div>
        <div className="ev-pair">
          <article className="ev-card" data-rv>
            <img src={`${IMG}/characters/evi-a.webp`} alt="EVI" className="ev-img" />
            <div>
              <small>EVI</small>
              <h3>An assistant that has read the page.</h3>
              <p>Ask about an integration, an execution or a mapping issue. EVI uses the current screen as context to explain the situation and guide you to the relevant action.</p>
            </div>
          </article>
          <article className="ev-card" data-rv="1">
            <img src={`${IMG}/characters/sync-pose-1.webp`} alt="The Sync Agent" className="ev-img" />
            <div>
              <small>Sync Agent</small>
              <h3>A specialist for integration work.</h3>
              <p>The Sync Agent can prepare proposals for:</p>
              <ul>{CAN.map((x) => <li key={x}><Check aria-hidden />{x}</li>)}</ul>
            </div>
          </article>
        </div>
        <div className="ev-prop" data-rv>
          <div className="ev-prop-copy">
            <h3>Every proposal shows what matters.</h3>
            <p>Review the observed facts, the likely inference, the proposed before-and-after changes and the associated risk. Approve or reject the proposal. The decision is recorded.</p>
            <div className="ev-chips">{SHOWS.map((x) => <span key={x}>{x}</span>)}</div>
            <div className="ev-btns"><span className="ev-btn">Reject</span><span className="ev-btn pri">Approve Proposal</span></div>
          </div>
          <Shot src="24-approval-review" alt="A Sync Agent proposal with facts, inference, before and after, and risk" pos="100% 0%" className="ev-shot" />
        </div>
        <p className="ev-close" data-rv>Your integrations remain under your control. The agent prepares the work. You decide what happens next.</p>
      </div>
    </section>
  );
}

/* ---------- 8 application compatibility ---------- */
function Apps() {
  const [cat, setCat] = useState<Cat | "All">("All");
  const list = APPS.filter((a) => cat === "All" || a.cat === cat);
  return (
    <section className="sx-sec sx-out" id="apps">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>Application compatibility</Label>
          <h2 data-rv>The applications you use. The connections you need.</h2>
          <p data-rv="1">EVOQ Sync includes a catalog of 32 applications across CRM, ERP, accounting, eCommerce, inventory, marketing and productivity categories.</p>
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
        </ul>
        <div className="ap-api" data-rv>
          <span className="ap-api-i"><Plug aria-hidden /></span>
          <div><b>Custom REST API Connection</b><p>For systems outside the catalog, configure a Custom REST API Connection with its base URL, authentication details and test call.</p></div>
          <Demo location="apps">Book a Walkthrough</Demo>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9 final call to action ---------- */
function Final() {
  return (
    <section className="sx-out sx-close-out">
      <div className="sx-in">
        <div className="sx-close" data-rv>
          <div className="sx-close-copy">
            <h2>Make your applications agree.</h2>
            <p>See how EVOQ Sync handles an integration, explains a failed execution and prepares a corrective action for your approval.</p>
            <div className="sx-ctas">
              <Demo location="closing" className="sx-btn lime">Book a Walkthrough</Demo>
              <Link href={`${SYNC_BASE}/features`} className="sx-btn ghost-dark">Explore Features</Link>
            </div>
          </div>
          <div className="sx-close-art" aria-hidden>
            <div className="sx-close-pair"><Mark id="shopify" size={52} /><i /><SyncMark size={58} bg={C.action} /><i /><Mark id="netsuite" size={52} /></div>
            <div className="sx-close-card">
              <span className="sx-dot ok" />
              <div><b>Shopify orders to NetSuite sales orders</b><small>Order #1042 retried and created in NetSuite.</small></div>
              <span className="sx-switch on"><i /></span>
            </div>
            <img src="/sync-v1/characters/sync-pose-5.webp" alt="" className="sx-close-agent" />
          </div>
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
      <Problem />
      <HowItWorks />
      <Scenarios />
      <Monitoring />
      <Mapping />
      <EviAgent />
      <Apps />
      <Final />
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
  .hx{padding-top:72px;padding-bottom:88px;background:radial-gradient(900px 480px at 80% 10%,${C.tint},rgba(255,255,255,0) 70%),#fff;overflow:hidden}
  .hx-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
  .hx-eyebrow{display:inline-flex;align-items:center;gap:10px;padding:6px 14px 6px 6px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.soft};font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.08em;color:${C.primary}}
  .hx h1{margin-top:22px!important;--h1-size:60px}
  .hx-hl{position:relative;color:${C.primary};white-space:nowrap}
  .hx-hl::after{content:"";position:absolute;left:2%;right:4%;bottom:.02em;height:.16em;border-radius:999px;background:${C.lime};z-index:-1}
  .hx h1{position:relative;z-index:0}
  .hx-copy>p{max-width:560px;margin:20px 0 0;font-size:18.5px;line-height:1.6}
  .hx-works{display:flex;align-items:center;gap:14px;margin-top:32px;max-width:560px}
  .hx-marks{display:flex;flex-shrink:0}
  .hx-marks>*{margin-right:-6px;box-shadow:0 0 0 2px #fff;border-radius:8px}
  .hx-api{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:${C.tint};color:${C.primary}}
  .hx-api svg{width:15px;height:15px}
  .hx-works>span{padding-left:6px;font-size:14px;line-height:1.5;color:${C.muted}}

  .hx-vis{position:relative;padding-bottom:196px}
  .hb{position:relative;aspect-ratio:560/400;border-radius:26px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 40px 80px -40px rgba(46,16,101,.35);background-image:radial-gradient(${C.soft} 1px,transparent 1.3px);background-size:22px 22px}
  .hb-lines{position:absolute;inset:0;width:100%;height:100%}
  .hb-path{fill:none;stroke:${C.action};stroke-width:2;stroke-dasharray:6 7;opacity:.7;animation:hbFlow 1.4s linear infinite}
  .hb-path.out{animation-direction:normal}
  @keyframes hbFlow{to{stroke-dashoffset:-26}}
  .hb-col{position:absolute;display:flex;flex-direction:column;justify-content:space-between;top:calc(70/400*100% - 32px);bottom:calc(70/400*100% - 32px);padding:0}
  .hb-col.l{left:calc(78/560*100% - 32px)}
  .hb-col.r{right:calc(78/560*100% - 32px)}
  .hb-app{display:flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:18px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 12px 24px -14px rgba(46,16,101,.4)}
  .hb-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex}
  .hb-core svg{position:relative;filter:drop-shadow(0 18px 30px rgba(126,34,206,.45))}
  .hb-ring{position:absolute;inset:-18px;border-radius:40px;background:${C.tint};animation:hbPulse 2.8s ease-in-out infinite}
  @keyframes hbPulse{0%,100%{transform:scale(.92);opacity:.9}50%{transform:scale(1.05);opacity:.5}}
  .hx-alert{position:absolute;right:calc(50% - 170px);bottom:0;width:340px;padding:16px;border-radius:18px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 30px 60px -24px rgba(46,16,101,.45);animation:hxIn .6s cubic-bezier(.2,.8,.2,1) 1.2s both}
  @keyframes hxIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  .hx-alert-hd{display:flex;align-items:center;gap:10px}
  .hx-alert-i{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#FEE2E2;color:${C.err}}
  .hx-alert-i svg{width:14px;height:14px}
  .hx-alert-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${C.ink}}
  .hx-alert-hd small{margin-left:auto;font-size:12.5px;color:${C.muted}}
  .hx-alert>p{margin:8px 0 0;font-size:13.5px;line-height:1.5;color:${C.body}}
  .hx-alert-by{display:flex;align-items:center;gap:8px;margin-top:12px;font-size:12.5px;font-weight:600;color:${C.primary}}
  .hx-alert-by img{width:24px;height:24px;border-radius:50%;background:${C.tint}}
  .hx-alert-rec{margin-top:8px;padding:10px 12px;border-radius:12px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft};font-size:13.5px;line-height:1.45;color:${C.ink}}
  .hx-alert-rec small{display:block;margin-bottom:2px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.primary}}
  .hx-alert-btn{display:flex;justify-content:center;margin-top:12px;padding:9px 12px;border-radius:10px;background:${C.primary};color:#fff;font-size:13.5px;font-weight:600}

  /* problem */
  .pb-head{max-width:860px}
  .pb-head p+p{margin-top:12px}
  .pb-card{max-width:900px;margin:0 auto;padding:24px;border-radius:24px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 40px 70px -40px rgba(46,16,101,.4)}
  .pb-card-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
  .pb-card-hd b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${C.ink}}
  .pb-card-hd small{display:block;margin-top:3px;font-size:13.5px;color:${C.muted}}
  .pb-pill{flex-shrink:0;padding:4px 12px;border-radius:999px;background:#FEE2E2;color:#991B1B;font-size:12.5px;font-weight:700}
  .pb-steps{list-style:none;margin:20px 0 0;padding:18px 8px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;border-radius:16px;background:${C.g1}}
  .pb-steps li{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center}
  .pb-steps li:not(:last-child)::after{content:"";position:absolute;top:18px;left:calc(50% + 24px);right:calc(-50% + 24px);height:2px;background:#DDD8E5}
  .pb-steps li.ok:not(:last-child)::after{background:${C.ok};opacity:.5}
  .pb-steps li>span{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#DDD8E5;color:#fff}
  .pb-steps li>span svg{width:18px;height:18px}
  .pb-steps li.ok>span{background:${C.ok}}
  .pb-steps li.err>span{background:${C.err};box-shadow:0 0 0 6px rgba(220,38,38,.15)}
  .pb-steps b{margin-top:10px;font-size:14px;line-height:1.3;color:${C.ink}}
  .pb-steps small{margin-top:2px;font-size:12.5px;color:${C.muted}}
  .pb-steps li.skip b{color:${C.muted}}
  .pb-code{margin:16px 0 0;padding:13px 16px;border-radius:12px;background:#120B24;color:#FECACA;font-size:13.5px;white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
  .pb-boxes{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
  .pb-box{padding:16px 18px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .pb-box.act{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.soft}}
  .pb-box-hd{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .pb-box-hd svg{width:18px;height:18px;color:${C.primary}}
  .pb-box-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${C.ink}}
  .pb-tag{margin-left:auto;padding:2px 9px;border-radius:999px;background:#EFF6FF;font-size:11.5px;font-weight:600;color:#1D4ED8}
  .pb-tag.ok{background:#DCFCE7;color:#166534}
  .pb-box p{margin:8px 0 0;font-size:14.5px;line-height:1.55;color:${C.ink}}
  .pb-turn{max-width:760px;margin:64px auto 0;text-align:center}
  .pb-turn h3{--h3-size:26px}
  .pb-turn p{margin:12px 0 0;font-size:17px}
  .pb-points{list-style:none;margin:36px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .pb-points li{display:flex;flex-direction:column;gap:14px;padding:24px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .pb-points li>span{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:${C.tint};color:${C.primary}}
  .pb-points li>span svg{width:21px;height:21px}
  .pb-points p{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;line-height:1.4;color:${C.ink}}

  /* how */
  .hw-head{display:grid;grid-template-columns:1fr 1fr;gap:48px;max-width:none;align-items:end}
  .hw-head p{margin-top:0!important}
  .hw-cta{margin-top:20px}
  .hw{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .hw-c{display:flex;flex-direction:column;padding:26px 26px 0;border-radius:22px;background:${C.g1};overflow:hidden}
  .hw-n{align-self:flex-start;padding:5px 11px;border-radius:10px;background:${C.primary};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:700;letter-spacing:.04em}
  .hw-c h3{--h3-size:22px;margin-top:18px!important}
  .hw-c>p{margin:10px 0 0;font-size:15.5px}
  .hw-vis{margin-top:auto;padding-top:24px}
  .hw-vis .sx-shot{border-radius:14px 14px 0 0}
  .hw-vis.hw-cfg{display:grid;gap:8px;margin-top:0;padding-bottom:26px}
  .hw-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .hw-row small{font-size:12.5px;color:${C.muted};flex-shrink:0}
  .hw-row b{font-size:13.5px;color:${C.ink};text-align:right}
  .hw-dir{display:inline-flex;align-items:center;gap:6px}
  .hw-dir svg{width:14px;height:14px;color:${C.primary}}

  /* scenarios */
  .sc{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .sc-c{padding:26px;border-radius:22px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .sc-top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .sc-pair{display:flex;align-items:center;gap:10px}
  .sc-arrow{display:inline-flex;color:${C.primary}}
  .sc-arrow svg{width:20px;height:20px}
  .sc-cat{padding:4px 11px;border-radius:999px;background:${C.tint};font-size:12.5px;font-weight:700;letter-spacing:.04em;color:${C.primary}}
  .sc-c h3{--h3-size:21px;margin-top:20px!important}
  .sc-c p{margin:10px 0 0;font-size:15.5px}
  .sc-note{margin:22px 0 0;font-size:13.5px;color:${C.muted}}

  /* monitoring */
  .mo{display:grid;grid-template-columns:.95fr 1.05fr;gap:56px;align-items:center}
  .mo-copy .sx-label{margin-bottom:14px}
  .mo-copy>p{margin:16px 0 0;font-size:16.5px}
  .mo-copy>p.mo-lead{font-size:19px;color:${C.ink}}
  .mo-copy h4{margin-top:26px!important;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:${C.muted}!important}
  .mo-list{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:10px}
  .mo-list li{display:flex;gap:10px;font-size:15.5px;line-height:1.5;color:${C.ink}}
  .mo-list svg{width:18px;height:18px;margin-top:3px;flex-shrink:0;color:${C.ok}}
  .mo-copy>p.mo-end{margin:26px 0 22px;padding-left:14px;border-left:3px solid ${C.lime};font-family:var(--font-display),system-ui,sans-serif;font-size:18px;font-weight:600;color:${C.ink}}
  .mo-vis{position:relative}

  /* mapping */
  .mp{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}
  .mp-vis{position:relative;padding-bottom:28px}
  .mp-float{position:absolute;left:-20px;bottom:0;display:grid;grid-template-columns:auto auto auto;align-items:center;gap:8px 10px;padding:12px 14px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 24px 40px -20px rgba(46,16,101,.45)}
  .mp-dir{padding:4px 10px;border-radius:999px;background:${C.lime};color:${C.limeInk};font-size:12.5px;font-weight:700}
  .mp-float small{grid-column:1/-1;font-size:12.5px;color:${C.muted}}
  .mp-list{list-style:none;margin:0;padding:0;display:grid;gap:20px}
  .mp-list li{display:flex;gap:14px}
  .mp-list li>span{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:11px;background:#fff;box-shadow:inset 0 0 0 1px ${C.soft};color:${C.primary};flex-shrink:0}
  .mp-list li>span svg{width:19px;height:19px}
  .mp-list h3{--h3-size:17.5px}
  .mp-list p{margin:4px 0 0;font-size:15px}

  /* evi */
  .ev-sec{position:relative;overflow:hidden}
  .ev-sec .sx-head p+p{margin-top:12px}
  .ev-pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .ev-card{display:flex;gap:22px;align-items:flex-start;padding:26px;border-radius:22px;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
  .ev-img{width:120px;height:auto;flex-shrink:0;border-radius:16px;background:rgba(255,255,255,.08)}
  .ev-card small{font-size:12.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.lime}}
  .ev-card h3{--h3-size:21px;margin-top:6px!important}
  .ev-card p{margin:10px 0 0;font-size:15.5px;color:#D9CCF0}
  .ev-card ul{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px}
  .ev-card li{display:flex;gap:9px;font-size:15px;color:#fff}
  .ev-card li svg{width:16px;height:16px;margin-top:3px;flex-shrink:0;color:${C.lime}}
  .ev-prop{display:grid;grid-template-columns:.8fr 1.2fr;gap:40px;align-items:center;margin-top:20px;padding:30px;border-radius:24px;background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
  .ev-prop h3{--h3-size:24px}
  .ev-prop p{margin:12px 0 0;font-size:16px;color:#D9CCF0}
  .ev-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
  .ev-chips span{padding:6px 12px;border-radius:999px;background:rgba(163,230,53,.14);color:${C.lime};font-size:13px;font-weight:600}
  .ev-btns{display:flex;gap:10px;margin-top:22px}
  .ev-btn{padding:10px 18px;border-radius:10px;background:#fff;color:${C.ink};font-weight:600;font-size:14.5px}
  .ev-btn.pri{background:${C.lime};color:${C.limeInk}}
  .ev-shot{box-shadow:0 0 0 1px rgba(255,255,255,.14),0 40px 80px -30px rgba(0,0,0,.6)}
  .ev-close{max-width:760px;margin:44px auto 0;text-align:center;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:600;line-height:1.45;color:#fff}

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
  .ap-api{display:flex;align-items:center;gap:18px;margin-top:20px;padding:22px 24px;border-radius:20px;background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.soft}}
  .ap-api>div{flex:1;min-width:0}
  .ap-api b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${C.ink}}
  .ap-api p{margin:4px 0 0;font-size:15px}
  .ap-api-i{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:13px;background:${C.primary};color:#fff;flex-shrink:0}
  .ap-api-i svg{width:22px;height:22px}

  @media (prefers-reduced-motion:reduce){.hb-path,.hb-ring,.hx-alert{animation:none}}
  @media (max-width:1100px){
    .ap-grid{grid-template-columns:repeat(3,1fr)}
    .hx h1{--h1-size:50px}
  }
  @media (max-width:980px){
    .hx-grid,.mo,.mp,.ev-prop{grid-template-columns:1fr}
    .hx-vis{max-width:600px;width:100%;margin:0 auto}
    .hw{grid-template-columns:1fr 1fr}
    .hw-head{grid-template-columns:1fr;gap:16px}
    .ev-pair{grid-template-columns:1fr}
    .mp-float{left:12px}
  }
  @media (max-width:760px){
    .hx{padding-top:48px;padding-bottom:56px}
    .hx h1{--h1-size:40px}
    .hx-copy>p{font-size:17px}
    .hx-works{align-items:flex-start;flex-direction:column;gap:10px}
    .hx-works>span{padding-left:0}
    .hx-vis{padding-bottom:0}
    .hx-alert{position:relative;right:auto;width:auto;margin:14px 0 0}
    .hb-app{width:48px;height:48px;border-radius:14px}
    .hb-app .sx-mark{transform:scale(.78)}
    .hb-col.l{left:calc(78/560*100% - 24px)}
    .hb-col.r{right:calc(78/560*100% - 24px)}
    .hb-col{top:calc(70/400*100% - 24px);bottom:calc(70/400*100% - 24px)}
    .hb-core svg{width:60px;height:60px}
    .hb-ring{inset:-12px;border-radius:28px}
    .pb-card{padding:16px;border-radius:20px}
    .pb-card-hd{flex-direction:column;gap:10px}
    .pb-card-hd b{font-size:16px;text-wrap:balance}
    .hw-row{flex-direction:column;align-items:flex-start;gap:2px}
    .hw-row b{text-align:left}
    .pb-steps{padding:14px 4px}
    .pb-steps b{font-size:12px}
    .pb-steps small{display:none}
    .pb-steps li:not(:last-child)::after{left:calc(50% + 20px);right:calc(-50% + 20px)}
    .pb-boxes{grid-template-columns:1fr}
    .pb-turn{margin-top:44px}
    .pb-turn h3{--h3-size:22px}
    .pb-points{grid-template-columns:1fr}
    .hw,.sc{grid-template-columns:1fr}
    .ap-grid{grid-template-columns:1fr 1fr}
    .ev-card{flex-direction:column;padding:22px}
    .ev-img{width:96px}
    .ev-prop{padding:20px}
    .ev-close{font-size:18px}
    .mp-float{position:static;margin-top:14px}
    .mp-vis{padding-bottom:0}
    .ap-api{flex-direction:column;align-items:flex-start}
  }
  @media (max-width:480px){
    .ap-grid{grid-template-columns:1fr}
    .hx h1{--h1-size:36px}
  }
`;
