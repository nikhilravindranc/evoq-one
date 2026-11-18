"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftRight, ArrowRight, Check, ChevronDown, CircleAlert, Lightbulb, ListChecks, Plug,
  ShieldCheck, Sparkles, User, X, type LucideIcon,
} from "lucide-react";
import { GLYPHS } from "./glyphs";
import { APP, C, IMAGE_MARKS, IMG, SYNC_BASE } from "./data";
import { Demo, Mark, SyncMark, SyncShell } from "./Shell";
import { VisBuilder, VisConnections, VisMapping, VisMonitoring, VisReports, VisSettings, visCss } from "./Visuals";

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
/* The visual is one small card that plays a short loop while it is on screen. The link between EVOQ Sync and NetSuite
   starts broken. The user asks EVI why, EVI explains and offers a fix, a pointer clicks Approve and the link connects.
   beat: 0 broken, 1 typing the question, 2 sent and EVI is typing, 3 the cause and the fix, 4 pointer arrives,
   5 click and the link connects, 6 EVI confirms. */
const BEATS_AT = [0, 1200, 2600, 3800, 5600, 6700, 7500];
const LOOP_END = 12500;

function useHeroLoop() {
  const [beat, setBeat] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: number[] = [];
    let seen = false;
    const clear = () => { timers.forEach((t) => window.clearTimeout(t)); timers = []; };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.push(window.setTimeout(() => setBeat(6), 0));
      return clear;
    }
    const play = () => {
      clear();
      BEATS_AT.forEach((t, i) => timers.push(window.setTimeout(() => setBeat(i), t)));
      timers.push(window.setTimeout(() => { if (seen) play(); }, LOOP_END));
    };
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      if (seen) play(); else clear();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); clear(); };
  }, []);
  return { beat, ref };
}

function EviAvatar() {
  return <img src={`${IMG}/characters/evi-head.webp`} alt="" />;
}

function HeroCard({ beat }: { beat: number }) {
  const fixed = beat >= 5;
  return (
    <div className="hv" role="img" aria-label="An order fails to sync from Shopify to NetSuite. The user asks EVI why, EVI explains and proposes a fix, and the user approves it">
      <div className="fl" data-s={fixed ? "ok" : "bad"}>
        <div className="fl-row">
          <div className="fl-n"><span className="fl-t"><Mark id="shopify" size={34} /></span><small>Shopify</small></div>
          <span className="fl-lk on" />
          <div className="fl-n"><span className="fl-t"><SyncMark size={42} bg={C.primary} /></span><small>EVOQ Sync</small></div>
          <span className="fl-lk end"><span className="fl-mk"><X className="x" /><Check className="c" /></span></span>
          <div className="fl-n"><span className="fl-t ns"><Mark id="netsuite" size={34} /></span><small>NetSuite</small></div>
        </div>
        <div className="fl-st">
          <span className="fl-chip">{fixed ? "Order synced · 8:41 AM" : "Order sync failed · 8:40 AM"}</span>
          <p>{fixed ? "Shopify order #1042 is now in NetSuite." : "Shopify order #1042 did not reach NetSuite. Required field “taxRegistrationNumber” is empty."}</p>
        </div>
      </div>
      <div className="ch">
        <div className="ch-hd"><EviAvatar /><b>EVI</b><small><i />Reads this page</small></div>
        <div className="ch-body">
          {beat >= 2 && <div className="ch-m me"><p>Why did order #1042 fail?</p></div>}
          {beat === 2 && <div className="ch-m evi"><EviAvatar /><p className="dots"><i /><i /><i /></p></div>}
          {beat >= 3 && (
            <div className="ch-m evi"><EviAvatar />
              <div className="ch-bub">
                <p>It looks like the customer has no tax ID, and NetSuite requires one. I can add a default and retry the order.</p>
                <div className="ch-act">
                  <span className={`ch-btn${fixed ? " done" : ""}`}>{fixed ? <><Check aria-hidden />Approved</> : "Approve"}</span>
                  <span className="ch-btn ghost">Not now</span>
                  <svg className={`ch-cur${beat >= 4 ? " on" : ""}${beat === 5 ? " click" : ""}`} viewBox="0 0 24 24" aria-hidden><path d="M5 3l14 8-6.2 1.6L9.6 19z" fill="#1C1530" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
          )}
          {beat >= 6 && <div className="ch-m evi"><EviAvatar /><p>Done. Order #1042 is now in NetSuite.</p></div>}
        </div>
        <div className="ch-in">
          {beat === 1 ? <span className="ch-typed"><em>Why did order #1042 fail?</em></span> : <span className="ch-ph">Ask EVI</span>}
          <span className="ch-send"><ArrowRight aria-hidden /></span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { beat, ref } = useHeroLoop();
  return (
    <section className="sx-out hx">
      <div className="sx-in hx-grid">
        <div className="hx-copy">
          <span className="hx-eyebrow" data-rv>NO-CODE INTEGRATION PLATFORM</span>
          <h1 data-rv="1"><span className="hx-hl">Sync</span> your orders, customers and invoices between applications.</h1>
          <p data-rv="2">EVOQ Sync keeps your CRM, ERP, accounting and eCommerce applications in step. It explains integration errors in plain English and prepares corrective actions for your review. You approve them. Nothing changes without you.</p>
          <div className="sx-ctas" data-rv="3">
            <Demo location="hero">Get started</Demo>
            <Link href={`${SYNC_BASE}/features`} className="sx-btn secondary">Explore Features<ArrowRight aria-hidden /></Link>
          </div>
          <div className="hx-works" data-rv="4">
            <div className="hx-marks">{["hubspot", "salesforce", "netsuite", "quickbooks", "shopify"].map((id) => <Mark key={id} id={id} size={28} />)}<span className="hx-api"><Plug aria-hidden /></span></div>
            <span>Connect your applications, with a Custom REST API Connection for the systems beyond the catalog.</span>
          </div>
        </div>
        <div className="hx-vis" ref={ref} data-rv="2"><HeroCard beat={beat} /></div>
      </div>
    </section>
  );
}

/* ---------- 2 the problem: the order that never arrived, shown as four steps, then what changes ---------- */
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
          <h2 data-rv>A customer paid on Shopify. <span className="t2">The sales order never reached NetSuite.</span></h2>
        </div>
        <div className="fc-seg" data-rv="1">
          <p className="fc-seg-bad">This is where integration problems become operational problems.</p>
          <p className="fc-seg-good">With EVOQ Sync</p>
        </div>
        <ol className="fc-grid">
          <li className="fc bad" data-rv="0">
            <div className="fc-ph">
              <img src={`${IMG}/problem/step-1.webp`} alt="A customer paying for an order on a laptop" loading="lazy" />
              <span className="fc-n">1</span>
              <span className="fc-chip"><Mark id="shopify" size={20} />Order #1042<i className="ok">Paid</i></span>
            </div>
            <p><b>A customer placed an order.</b> The payment went through.</p>
          </li>
          <li className="fc bad" data-rv="1">
            <div className="fc-ph">
              <img src={`${IMG}/problem/step-2.webp`} alt="A packed parcel sitting on a table, waiting to be sent" loading="lazy" />
              <span className="fc-n">2</span>
              <span className="fc-bd"><X aria-hidden /></span>
              <span className="fc-chip"><Mark id="netsuite" size={20} />Sales order<i className="err">Not received</i></span>
            </div>
            <p><b>But the sales order never reached your ERP.</b></p>
          </li>
          <li className="fc bad" data-rv="2">
            <div className="fc-ph">
              <img src={`${IMG}/problem/step-3.webp`} alt="Hands working through a table of records on a laptop, with red flags beside several rows" loading="lazy" />
              <span className="fc-n">3</span>
              <span className="fc-chip code">Required field &quot;taxRegistrationNumber&quot; is empty</span>
            </div>
            <p><b>You open the integration log and find an error code.</b> Now someone has to investigate the failure, identify the missing information and work out what to do next.</p>
          </li>
          <li className="fc good" data-rv="3">
            <div className="fc-ph">
              <img src={`${IMG}/problem/step-4.webp`} alt="A parcel being handed over to a smiling customer" loading="lazy" />
              <span className="fc-n">4</span>
              <span className="fc-tag">With EVOQ Sync</span>
              <span className="fc-bd ok"><Check aria-hidden /></span>
              <span className="fc-card"><small><Sparkles aria-hidden />Recommended action</small><b>Add a default tax ID, then retry</b><em>Review and approve</em></span>
            </div>
            <p><b>EVOQ Sync gives you a clearer view</b> of what happened, which records were affected and what action may resolve the issue.</p>
          </li>
        </ol>
        <ul className="pb-points">
          {POINTS.map((x, k) => {
            const I = x.icon;
            return <li key={x.t} data-rv={k}><span><I aria-hidden /></span>{x.t}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3 how it works: three connected steps on one rail ---------- */
function HowItWorks() {
  return (
    <section className="sx-sec sx-out" id="how">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>How it works</Label>
          <h2 data-rv>Create a sync between your applications, <span className="t2">step by step.</span></h2>
          <p data-rv="1">Create the sync through a guided process. Choose the applications, select the data to synchronize, define how fields should correspond and test the result before activation.</p>
        </div>
        <ol className="fw">
          <li className="fw-s" data-rv>
            <div className="fw-top"><span className="fw-n">01</span><i className="fw-line" /></div>
            <div className="fw-body">
              <h3>Connect your applications</h3>
              <p>Choose from the application catalog or configure a Custom REST API Connection. Authorize the required connections and select the applications involved.</p>
              <div className="fw-card" aria-hidden>
                <div className="fw-row"><Mark id="shopify" size={26} /><b>Shopify</b><span className="bt-chip ok">Connected</span></div>
                <div className="fw-row"><Mark id="netsuite" size={26} /><b>NetSuite</b><span className="bt-chip">Authorize</span></div>
                <div className="fw-row api"><span className="fw-api"><Plug /></span><b>Custom REST API</b><em>+</em></div>
              </div>
            </div>
          </li>
          <li className="fw-s" data-rv="1">
            <div className="fw-top"><span className="fw-n">02</span><i className="fw-line" /></div>
            <div className="fw-body">
              <h3>Configure your integration</h3>
              <p>Choose the data objects and synchronization direction. Map fields, define transformation rules and set how conflicting records should be handled.</p>
              <div className="fw-card" aria-hidden>
                <div className="fw-row"><small>Data object</small><b>Sales Order</b></div>
                <div className="fw-row"><small>Direction</small><b className="fw-dir"><Mark id="shopify" size={18} /><ArrowRight /><Mark id="netsuite" size={18} /></b></div>
                <div className="fw-row"><small>Conflicts</small><b>Source wins</b></div>
              </div>
            </div>
          </li>
          <li className="fw-s" data-rv="2">
            <div className="fw-top"><span className="fw-n">03</span><i className="fw-line" /><span className="fw-live"><Check aria-hidden />Live</span></div>
            <div className="fw-body">
              <h3>Test and activate</h3>
              <p>Review the configuration, validate sample records and run a test. Once the setup is ready, activate the integration.</p>
              <div className="fw-card" aria-hidden>
                <div className="fw-row"><span className="fw-tick"><Check /></span><b>Test passed</b><small>Sample data</small></div>
                <div className="fw-row"><span className="fw-tick"><Check /></span><b>Required fields mapped</b></div>
                <div className="fw-row"><small>Integration</small><b>Enabled</b><span className="sx-switch on"><i /></span></div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ---------- 4 integration scenarios: one after the other, the one in focus is large ---------- */
type Scenario = { cat: string; t: string; a: string; b: string; two: boolean; d: string; rows: [string, string, string, boolean?][]; foot: string; tone: "ok" | "warn" };
const SCENARIOS: Scenario[] = [
  { cat: "CRM to ERP", t: "Customer records", a: "hubspot", b: "netsuite", two: false, d: "Transfer new customer accounts from HubSpot to NetSuite. Map the required fields and identify missing tax information before records are processed.",
    rows: [["Company", "Acme Ltd", "Acme Ltd"], ["Email", "ops@acme.com", "ops@acme.com"], ["Tax ID", "Empty", "Required", true]], foot: "Missing tax information flagged", tone: "warn" },
  { cat: "eCommerce to ERP", t: "Sales orders", a: "shopify", b: "netsuite", two: false, d: "Send paid Shopify orders to NetSuite as sales orders. Review execution results and identify records that need attention.",
    rows: [["Order", "#1042", "Sales order"], ["Payment", "Paid", "Ready"], ["Items", "3", "3"]], foot: "Execution results reviewed per record", tone: "ok" },
  { cat: "CRM and Accounting", t: "Invoice status", a: "salesforce", b: "quickbooks", two: true, d: "Synchronize invoice information between Salesforce and QuickBooks. Define the synchronization direction and conflict policy for changes made in either application.",
    rows: [["Invoice", "INV-2041", "INV-2041"], ["Status", "Paid", "Paid"], ["Changed in", "Either app", "Either app"]], foot: "Conflict policy applies to both sides", tone: "ok" },
  { cat: "ERP to eCommerce", t: "Inventory", a: "netsuite", b: "shopify", two: false, d: "Send available inventory quantities from NetSuite to Shopify so that product availability reflects the information held in your ERP.",
    rows: [["Product", "Oak desk", "Oak desk"], ["Available", "48", "48"], ["Source", "ERP", "Storefront"]], foot: "Availability follows your ERP", tone: "ok" },
];

function Scenarios() {
  const n = SCENARIOS.length;
  const { i, pick, ref } = useAuto(n, 6000);
  return (
    <section className="sx-sec sx-out sg-sec" id="scenarios">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>Integration scenarios</Label>
          <h2 data-rv>Customers, orders, invoices and stock <span className="t2">synced between your applications.</span></h2>
          <p data-rv="1">Different systems hold different parts of an operational process. EVOQ Sync moves the relevant information between them according to the rules you define.</p>
        </div>
        <div className="sg" ref={ref}>
          <div className="sg-stage">
            {SCENARIOS.map((s, k) => {
              const o = ((((k - i + 1) % n) + n) % n) - 1; // -1 left, 0 in focus, 1 right, 2 waiting
              return (
                <article key={s.t} className={`sg-c${o === 0 ? " on" : ""}`} data-o={o} aria-hidden={o !== 0} onClick={() => { if (o !== 0) pick(k); }}>
                  <div className="sg-mini">
                    <span className="sg-ms"><Mark id={s.a} size={30} /><Mark id={s.b} size={30} /></span>
                    <small>{s.cat}</small>
                    <b>{s.t}</b>
                  </div>
                  <div className="sg-full">
                    <div className="sg-copy">
                      <span className="sg-cat">{s.cat}</span>
                      <h3>{s.t}</h3>
                      <p>{s.d}</p>
                    </div>
                    <div className="sg-vis">
                      <div className="sg-win">
                        <div className="bt-dots"><i /><i /><i /></div>
                        <div className="sg-hd">
                          <span><Mark id={s.a} size={22} />{APP(s.a).name}</span>
                          <i>{s.two ? <ArrowLeftRight aria-hidden /> : <ArrowRight aria-hidden />}</i>
                          <span><Mark id={s.b} size={22} />{APP(s.b).name}</span>
                        </div>
                        {s.rows.map(([l, x, y, flag]) => (
                          <div key={l} className={`sg-r${flag ? " flag" : ""}`}><small>{l}</small><b>{x}</b><b>{y}</b></div>
                        ))}
                        <div className={`sg-foot ${s.tone}`}>{s.tone === "ok" ? <Check aria-hidden /> : <CircleAlert aria-hidden />}{s.foot}</div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="sg-dots" role="tablist" aria-label="Integration scenarios">
            {SCENARIOS.map((s, k) => <button key={s.t} type="button" role="tab" aria-selected={k === i} aria-label={`${s.cat}: ${s.t}`} className={k === i ? "on" : undefined} onClick={() => pick(k)} />)}
          </div>
        </div>
        <p className="sc-note">These are illustrative integration scenarios, not customer case studies.</p>
      </div>
    </section>
  );
}

/* ---------- 5 product tour: the main areas of the app, each linking to the features page ---------- */
const TOUR: { id: string; t: string; d: string; vis: () => ReactNode }[] = [
  { id: "connections", t: "Connections", d: "Authorize each application once and reuse the connection across integrations.", vis: VisConnections },
  { id: "mapping", t: "Data mapping", d: "Pair fields, apply transformations and preview a record before anything runs.", vis: VisMapping },
  { id: "builder", t: "Workflow Builder", d: "Arrange the steps on a visual canvas and test them on sample data.", vis: VisBuilder },
  { id: "monitoring", t: "Monitoring", d: "See what failed, the likely cause and a suggested next step.", vis: VisMonitoring },
  { id: "reports", t: "Reports", d: "Review volume, reliability and performance over time.", vis: VisReports },
  { id: "security", t: "Controls and settings", d: "Roles, security settings and what the Sync Agent may do.", vis: VisSettings },
];

function Tour() {
  const { i, pick, ref } = useAuto(TOUR.length, 7000);
  const V = TOUR[i].vis;
  return (
    <section className="sx-sec sx-out sx-grey" id="tour">
      <div className="sx-in tr" ref={ref}>
        <div className="tr-list">
          <Label>Inside EVOQ Sync</Label>
          <h2 data-rv>Create, test and monitor <span className="t2">syncs between your applications.</span></h2>
          <ul role="tablist" aria-label="Areas of EVOQ Sync">
            {TOUR.map((x, k) => (
              <li key={x.id} className={k === i ? "on" : undefined}>
                <button type="button" role="tab" aria-selected={k === i} onClick={() => pick(k)}>{x.t}<ChevronDown aria-hidden /></button>
                <div className="tr-more"><div>
                  <p>{x.d}</p>
                  <Link href={`${SYNC_BASE}/features#${x.id}`}>See it in Features<ArrowRight aria-hidden /></Link>
                </div></div>
              </li>
            ))}
          </ul>
          <Link href={`${SYNC_BASE}/features`} className="bt-btn">Explore all features<ArrowRight aria-hidden /></Link>
        </div>
        <div className="tr-stage" aria-hidden>
          <div className="tr-win">
            <div className="bt-dots"><i /><i /><i /></div>
            <div className="tr-vis" key={i}><V /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7 EVI and the Sync Agent: one app window that steps through ask, review, approve ---------- */
const EV_STEPS = [
  { t: "Ask EVI", d: "EVI reads the screen you are on and explains the failure: what happened, the likely cause and a suggested fix." },
  { t: "Review the proposal", d: "The Sync Agent prepares the fix with the facts it saw, what it infers, the before and after, and the risk." },
  { t: "Approve or reject", d: "Your decision is recorded in History with your name and the time." },
];
const CAPS = ["Integration Setup", "Integration Management", "Mapping", "Transformation", "Monitoring", "Error Diagnosis", "Optimization"];
const WF = [["Trigger", "ok"], ["Retrieve record", "ok"], ["Validate required fields", "err"], ["Map fields", "skip"]];

function EviPanel() {
  return (
    <>
      <div className="es-hd"><img src={`${IMG}/characters/evi-head.webp`} alt="" /><div><b>EVI</b><small>Looking at: Execution EX-20491</small></div></div>
      <p className="es-me">Diagnose with EVI</p>
      <div className="es-ans">
        <h5>What happened <i>observed</i></h5>
        <p>3 of 12 records failed at the step “Validate required fields”.</p>
        <h5>Likely cause <i className="inf">my inference</i></h5>
        <p>Accounts created before March have no tax ID, and the destination requires it for EMEA customers.</p>
        <h5>Suggested fix</h5>
        <p>A conditional skip for accounts without a tax ID.</p>
      </div>
      <span className="es-pill">Prepare proposal</span>
    </>
  );
}

function Proposal() {
  return (
    <>
      <div className="es-hd"><img src={`${IMG}/characters/sync-head.webp`} alt="" /><div><b>Sync Agent</b><small>Error Diagnosis · Change active mapping</small></div></div>
      <b className="es-t">Make “Tax ID” optional for non-EMEA accounts</b>
      <div className="es-row"><small>Observed</small><span>All 3 failing accounts are outside EMEA.</span></div>
      <div className="es-row"><small>Inferred</small><span>Mapping v7 had no conditional rule. Not confirmed.</span></div>
      <div className="es-row"><small>Change</small>
        <div className="es-ba"><span className="b"><em>Before</em>Required: name, tax_id, country</span><span className="a"><em>After</em>tax_id required only when country is in EMEA</span></div>
      </div>
      <div className="es-row"><small>Risk</small><span><i className="es-risk">Low</i> Configuration change only. No records are modified.</span></div>
      <div className="es-btns"><span>Reject</span><span className="pri">Approve Proposal</span></div>
    </>
  );
}

function Decision() {
  return (
    <>
      <div className="es-hd"><span className="es-you"><User /></span><div><b>You</b><small>Approvals</small></div></div>
      <div className="es-done"><span><Check /></span><div><b>Decision recorded</b><small>Make “Tax ID” optional for non-EMEA accounts</small></div></div>
      <div className="es-hist">
        <small>History</small>
        <div><i className="ok" /><div><b>Make “Tax ID” optional for non-EMEA accounts</b><span>Sync Agent · Error Diagnosis · Approved by you</span></div></div>
        <div><i /><div><b>Retry 2 failed records in EX-20463</b><span>Sync Agent · Integration Management · Pending approval</span></div></div>
      </div>
    </>
  );
}

function EviAgent() {
  const { i, pick, ref } = useAuto(EV_STEPS.length, 7500);
  return (
    <section className="sx-sec sx-out sx-dark es-sec" id="evi">
      <div className="sx-in" ref={ref}>
        <div className="sx-head c">
          <Label>EVI and Sync Agent</Label>
          <h2 data-rv>Ask EVI why a sync failed. <span className="t2">Decide on the fix the Sync Agent proposes.</span></h2>
          <p data-rv="1">EVI is the assistant across EVOQ applications. In EVOQ Sync it reads the screen you are on and works with the Sync Agent, a specialist for integration setup, mapping, monitoring and optimization. Each proposal waits for your approval.</p>
        </div>

        <div className="es" data-rv="1">
          <div className="es-left">
            <div className="es-ex">
              <span className="es-tag">Example</span>
              <div className="es-ex-m"><Mark id="hubspot" size={22} /><ArrowRight aria-hidden /><Mark id="netsuite" size={22} /></div>
              <p><b>HubSpot accounts to NetSuite customers</b><small>Execution EX-20491 · 3 of 12 records failed</small></p>
            </div>
            <ol className="es-steps" role="tablist" aria-label="From a failure to a decision">
              {EV_STEPS.map((s, k) => (
                <li key={s.t} className={k === i ? "on" : undefined}>
                  <button type="button" role="tab" aria-selected={k === i} onClick={() => pick(k)}>
                    <span className="es-n">{k + 1}</span>
                    <span className="es-tx"><b>{s.t}</b><span>{s.d}</span></span>
                  </button>
                  <i className="es-bar"><u key={`${i}-${k}`} /></i>
                </li>
              ))}
            </ol>
          </div>

          <div className="es-win" aria-hidden>
            <div className="es-top"><div className="bt-dots"><i /><i /><i /></div><span>Monitoring › Executions › EX-20491</span></div>
            <div className="es-page">
              <div className="es-ph"><b>EX-20491</b><span className="bt-chip warn">Partial failure</span></div>
              <small className="es-sub">HubSpot accounts → NetSuite customers · Record updated · 18 s</small>
              <ol className="es-path">
                {WF.map(([n, s]) => <li key={n} className={s}><span>{s === "ok" ? <Check /> : s === "err" ? <X /> : null}</span>{n}</li>)}
              </ol>
              <code className="es-code">Required field &quot;taxRegistrationNumber&quot; is empty</code>
              <div className="es-cause"><b>Likely cause</b><span>Accounts created before March have no tax ID.</span></div>
            </div>
            <div className="es-panel" key={i}>
              {i === 0 && <EviPanel />}
              {i === 1 && <Proposal />}
              {i === 2 && <Decision />}
            </div>
          </div>
        </div>

        <div className="es-caps" data-rv="2">
          <small>Sync Agent capabilities, each with its own switch</small>
          <ul>{CAPS.map((c) => <li key={c}><span>{c}</span><span className="sx-switch on"><i /></span></li>)}</ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8 application compatibility: a field of frosted glass tiles ---------- */
const FIELD: { top: number; items: (string | null)[] }[] = [
  { top: 1.4, items: ["hubspot", null] },
  { top: 2.3, items: ["slack", "woocommerce"] },
  { top: 0.8, items: [null, "salesforce", null] },
  { top: 1.6, items: ["netsuite", "sheets"] },
  { top: 0, items: [null, "quickbooks", "xero", null] },
  { top: 1.0, items: ["sap", "stripe", "bigcommerce"] },
  { top: 0.4, items: [null, "shopify", "odoo"] },
  { top: 1.2, items: ["monday", "mailchimp", null] },
  { top: 2.0, items: ["zendesk", "klaviyo"] },
  { top: 1.1, items: [null, "powerbi", "tableau"] },
  { top: 2.4, items: ["pipedrive", "cin7"] },
];

/* the glyph is drawn in the brand colour, or in the mark colour when the brand colour is too pale to read */
function inkFor(hex: string, fg: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.85 ? fg : `#${hex.replace("#", "")}`;
}

function GlassTile({ id, i }: { id: string | null; i: number }) {
  const delay = { animationDelay: `${(i * 0.53) % 5}s` } as CSSProperties;
  if (!id) return <li className="ap-t empty" style={delay} aria-hidden />;
  const a = APP(id);
  const g = GLYPHS[id];
  const glow = g ? `#${g.hex.replace("#", "")}` : a.color;
  return (
    <li className="ap-t" style={{ ...delay, "--g": glow } as CSSProperties} title={a.name}>
      {g
        ? <svg viewBox="0 0 24 24" role="img" aria-label={a.name}><path d={g.path} fill={inkFor(g.hex, g.fg)} /></svg>
        : <img src={IMAGE_MARKS[id]} alt={a.name} />}
    </li>
  );
}

function Apps() {
  let n = 0;
  return (
    <section className="sx-sec sx-out ap-sec" id="apps">
      <div className="sx-in">
        <div className="ap-head">
          <span className="ap-lab">Application compatibility</span>
          <h2 data-rv>Data arrives in the format<br /><span>each application expects.</span></h2>
          <p data-rv="1">EVOQ Sync supports the CRM, ERP, accounting, eCommerce, inventory, marketing and productivity applications your team uses. Each application has its own objects, fields and sign in method, and EVOQ Sync maps them so customers, orders, invoices and stock arrive correctly in the destination.</p>
        </div>
        <div className="ap-field" data-rv="1">
          {FIELD.map((c, k) => (
            <ul key={k} className="ap-col" style={{ marginTop: `calc(var(--t) * ${c.top})` }}>
              {c.items.map((id) => <GlassTile key={`${k}-${n}`} id={id} i={n++} />)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 9 final call to action: a centered band with floating application tiles ---------- */
export function CtaBand({ lead, accent, text, primary = "Get started", secondary }: { lead: string; accent: string; text: string; primary?: string; secondary?: { label: string; href: string } }) {
  return (
    <section className="sx-out cb-out">
      <div className="sx-in">
        <div className="cb" data-rv>
          <div className="cb-tile t1" aria-hidden><Mark id="shopify" size={44} /></div>
          <div className="cb-tile t2" aria-hidden><Mark id="hubspot" size={44} /></div>
          <div className="cb-tile t3" aria-hidden><Mark id="netsuite" size={44} /></div>
          <div className="cb-tile t4" aria-hidden><Mark id="quickbooks" size={44} /></div>
          <div className="cb-copy">
            <h2>{lead} <span>{accent}</span></h2>
            <p>{text}</p>
            <div className="sx-ctas">
              <Demo location="closing" className="sx-btn lime">{primary}</Demo>
              {secondary && <Link href={secondary.href} className="sx-btn ghost-dark">{secondary.label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Final() {
  return (
    <CtaBand
      lead="Create your first"
      accent="integration."
      text="See how EVOQ Sync handles an integration, explains a failed execution and prepares a corrective action for your approval."
      secondary={{ label: "Explore Features", href: `${SYNC_BASE}/features` }}
    />
  );
}

/* ---------- FAQ ---------- */
export const FAQ: [string, string][] = [
  ["Does the AI change things on its own?", "Not by default. EVI explains and guides. The Sync Agent prepares proposals. Consequential actions need your approval, a narrow policy can pre-approve specific retries, and changes to credentials or permissions ask you to sign in again."],
  ["How do I know the AI is right?", "It shows its working. Every answer separates what it observed from what it inferred, and a proposal shows the change as before and after, plus the risk."],
  ["Which apps does it connect to?", "Many business apps today, including HubSpot, Salesforce, NetSuite, SAP Business One, QuickBooks, Xero, Sage, Shopify, WooCommerce, Magento and Klaviyo. Dynamics 365 is coming soon. Anything with a REST API connects through a custom API connection."],
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
      <Tour />
      <Scenarios />
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

export const ctaCss = `
  /* closing call to action */
  .cb-out{padding-top:88px;padding-bottom:88px}
  .cb{position:relative;display:flex;justify-content:center;padding:104px 40px;border-radius:32px;background:radial-gradient(700px 360px at 50% 0%,rgba(168,85,247,.5),transparent 70%),radial-gradient(520px 300px at 50% 120%,rgba(163,230,53,.18),transparent 70%),${C.depth};overflow:hidden;isolation:isolate}
  .cb::before{content:"";position:absolute;inset:0;z-index:-1;background-image:radial-gradient(rgba(255,255,255,.14) 1px,transparent 1.5px);background-size:26px 26px;-webkit-mask-image:radial-gradient(ellipse at center,#000 20%,transparent 75%);mask-image:radial-gradient(ellipse at center,#000 20%,transparent 75%)}
  .cb-copy{position:relative;z-index:2;max-width:640px;text-align:center}
  .cb h2{color:#fff;text-wrap:balance}
  .cb h2 span{color:${C.lime}}
  .cb p{margin:20px auto 0;max-width:52ch;font-size:18px;line-height:1.55;color:#D9CCF0;text-wrap:balance}
  .cb .sx-ctas{justify-content:center;margin-top:32px}
  .cb-tile{position:absolute;display:flex;align-items:center;justify-content:center;width:84px;height:84px;border-radius:24px;background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 1px rgba(255,255,255,.28),0 24px 44px -20px rgba(0,0,0,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);animation:cbFloat 7s ease-in-out infinite}
  .cb-tile.t1{left:7%;top:16%}
  .cb-tile.t2{left:13%;bottom:14%;animation-delay:-2.5s}
  .cb-tile.t3{right:7%;top:20%;animation-delay:-1.2s}
  .cb-tile.t4{right:14%;bottom:12%;animation-delay:-4s}
  @keyframes cbFloat{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-12px) rotate(3deg)}}
  @media (prefers-reduced-motion:reduce){.cb-tile{animation:none}}
  @media (max-width:980px){
    .cb{padding:72px 28px}
    .cb-tile{width:64px;height:64px;border-radius:18px}
    .cb-tile.t1{left:3%}.cb-tile.t2{left:5%}.cb-tile.t3{right:3%}.cb-tile.t4{right:5%}
  }
  @media (max-width:640px){
    .cb-out{padding-top:56px;padding-bottom:56px}
    .cb{padding:56px 22px}
    .cb p{font-size:16.5px}
    .cb-tile{display:none}
  }

`;

const css = `
  ${sharedCss}
  /* hero */
  .hx{padding-top:56px;padding-bottom:72px;background:radial-gradient(900px 480px at 80% 10%,${C.tint},rgba(255,255,255,0) 70%),#fff;overflow:hidden}
  .hx-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
  .hx-eyebrow{display:inline-flex;align-items:center;gap:10px;padding:7px 14px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.soft};font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.08em;color:${C.primary}}
  .hx h1{margin-top:22px!important;}
  .hx-hl{position:relative;color:${C.primary};white-space:nowrap}
  .hx-hl::after{content:"";position:absolute;left:2%;right:4%;bottom:.02em;height:.16em;border-radius:999px;background:${C.lime};z-index:-1}
  .hx h1{position:relative;z-index:0}
  .hx-copy>p{max-width:560px;margin:20px 0 0;font-size:18.5px;line-height:1.6}


  /* problem */

  /* hero visual: one small card, flow on top, EVI chat below */
  .hx-works{display:flex;align-items:center;gap:14px;margin-top:32px;max-width:560px}
  .hx-marks{display:flex;flex-shrink:0}
  .hx-marks>*{margin-right:-6px;box-shadow:0 0 0 2px #fff;border-radius:8px}
  .hx-api{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:${C.tint};color:${C.primary}}
  .hx-api svg{width:15px;height:15px}
  .hx-works>span{padding-left:6px;font-size:14px;line-height:1.5;color:${C.muted}}
  .hx-vis{width:100%;max-width:540px;margin-left:auto}
  .hv{border-radius:22px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 28px 50px -34px rgba(46,16,101,.35);overflow:hidden}
  .fl{padding:22px 24px 18px;background:#FBFAFD;border-bottom:1px solid ${C.line}}
  .fl-row{display:flex;align-items:flex-start}
  .fl-n{display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;flex-shrink:0}
  .fl-n small{font-size:12px;font-weight:600;color:${C.muted}}
  .fl-t{display:flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px ${C.line};transition:box-shadow .3s ease}
  .fl[data-s=bad] .fl-t.ns{box-shadow:0 0 0 2px ${C.err}}
  .fl[data-s=ok] .fl-t.ns{box-shadow:0 0 0 2px ${C.ok}}
  .fl-lk{position:relative;flex:1;height:2px;margin-top:26px;background:repeating-linear-gradient(90deg,${C.action} 0 6px,transparent 6px 11px);opacity:.8}
  .fl-lk.end{opacity:1;background:linear-gradient(90deg,${C.err} 0 36%,transparent 36% 64%,${C.err} 64% 100%);transition:background .3s ease}
  .fl-lk.end::after{content:"";position:absolute;inset:0;background:${C.ok};transform:scaleX(0);transform-origin:left}
  .fl[data-s=ok] .fl-lk.end::after{animation:flDraw .7s ease-out forwards}
  @keyframes flDraw{to{transform:scaleX(1)}}
  .fl-mk{position:absolute;left:50%;top:50%;z-index:1;width:24px;height:24px;margin:-12px 0 0 -12px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${C.err};color:#fff;transition:background .3s ease}
  .fl-mk svg{position:absolute;width:13px;height:13px;transition:opacity .2s ease}
  .fl-mk .c{opacity:0}
  .fl[data-s=ok] .fl-mk{background:${C.ok};animation:flPop .45s ease .55s both}
  .fl[data-s=ok] .fl-mk .x{opacity:0}
  .fl[data-s=ok] .fl-mk .c{opacity:1}
  @keyframes flPop{0%{transform:scale(.6)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
  .fl-st{display:flex;align-items:flex-start;gap:10px;margin-top:16px}
  .fl-chip{flex-shrink:0;padding:3px 10px;border-radius:999px;background:#FEE2E2;color:#991B1B;font-size:12px;font-weight:700;white-space:nowrap;transition:background .3s ease,color .3s ease}
  .fl[data-s=ok] .fl-chip{background:#DCFCE7;color:#166534}
  .fl-st p{margin:1px 0 0;font-size:13px;line-height:1.5;color:${C.body}}

  .ch-hd{display:flex;align-items:center;gap:9px;padding:11px 18px}
  .ch-hd img{width:28px;height:28px;border-radius:50%;background:${C.tint}}
  .ch-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${C.ink}}
  .ch-hd small{display:flex;align-items:center;gap:5px;margin-left:auto;font-size:12px;color:${C.muted}}
  .ch-hd small i{width:7px;height:7px;border-radius:50%;background:${C.ok}}
  .ch-body{display:flex;flex-direction:column;justify-content:flex-end;gap:9px;height:188px;padding:4px 18px 10px;overflow:hidden}
  .ch-m{display:flex;align-items:flex-end;gap:8px;animation:chIn .4s cubic-bezier(.2,.8,.2,1) both}
  @keyframes chIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .ch-m>img{width:24px;height:24px;border-radius:50%;background:${C.tint};flex-shrink:0}
  .ch-m p{margin:0;padding:8px 12px;font-size:13.5px;line-height:1.5;color:${C.ink}}
  .ch-m.evi>p,.ch-bub{background:${C.g1};border-radius:16px 16px 16px 5px}
  .ch-m.me{justify-content:flex-end}
  .ch-m.me p{background:${C.primary};color:#fff;border-radius:16px 16px 5px 16px}
  .ch-m.evi{max-width:94%}
  .dots{display:flex;gap:4px;padding:12px 14px!important}
  .dots i{width:6px;height:6px;border-radius:50%;background:${C.muted};animation:chDot 1s ease-in-out infinite}
  .dots i:nth-child(2){animation-delay:.15s}.dots i:nth-child(3){animation-delay:.3s}
  @keyframes chDot{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}
  .ch-act{position:relative;display:flex;gap:8px;padding:0 12px 10px}
  .ch-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:9px;background:${C.primary};color:#fff;font-size:13px;font-weight:600;transition:background .25s ease}
  .ch-btn svg{width:14px;height:14px}
  .ch-btn.done{background:${C.ok}}
  .ch-btn.ghost{background:#fff;color:${C.ink};box-shadow:inset 0 0 0 1px ${C.line}}
  .ch-cur{position:absolute;left:40px;top:12px;width:22px;height:22px;opacity:0;transform:translate(110px,56px);transition:transform 1s cubic-bezier(.3,.7,.3,1),opacity .3s ease;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3));pointer-events:none}
  .ch-cur.on{opacity:1;transform:none}
  .ch-cur.click{animation:chClick .35s ease}
  @keyframes chClick{50%{transform:scale(.8)}}
  .ch-in{display:flex;align-items:center;gap:10px;margin:0 16px 16px;padding:6px 6px 6px 14px;border-radius:12px;box-shadow:inset 0 0 0 1px ${C.line}}
  .ch-ph,.ch-typed{display:block;flex:1;font-size:13.5px;color:${C.muted};white-space:nowrap;overflow:hidden}
  .ch-typed em{display:inline-block;font-style:normal;color:${C.ink};animation:chType 1.1s steps(24) both}
  @keyframes chType{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
  .ch-send{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:${C.primary};color:#fff;flex-shrink:0}
  .ch-send svg{width:15px;height:15px}

  /* problem: four steps as photo cards, the last one is what changes */
  .sx-sec#problem{padding-top:80px;padding-bottom:88px}
  .pb-head{margin-bottom:36px}
  .sx-head.pb-head,.sx-head.pb-head p{max-width:none}
  .fc-seg,.fc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  .fc-seg{margin-bottom:18px}
  .fc-seg p{margin:0;padding-top:12px;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;line-height:1.35}
  .fc-seg-bad{grid-column:1 / span 3;border-top:3px solid #FCA5A5;color:#991B1B}
  .fc-seg-good{border-top:3px solid ${C.primary};color:${C.primary}}
  .fc-grid{list-style:none;margin:0;padding:0}
  .fc-ph{position:relative;aspect-ratio:3/4;border-radius:16px;overflow:hidden;background:${C.g1};box-shadow:0 0 0 1px ${C.line}}
  .fc-ph img{display:block;width:100%;height:100%;object-fit:cover}
  .fc.bad .fc-ph img{filter:saturate(.8)}
  .fc.good .fc-ph{box-shadow:0 0 0 2px ${C.primary},0 24px 40px -28px rgba(46,16,101,.5)}
  .fc-n{position:absolute;left:12px;top:12px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#fff;color:${C.ink};font-size:13px;font-weight:700;box-shadow:0 4px 10px -4px rgba(0,0,0,.35)}
  .fc-bd{position:absolute;right:12px;top:12px;display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${C.err};color:#fff;box-shadow:0 0 0 3px #fff}
  .fc-bd.ok{background:${C.ok}}
  .fc-bd svg{width:15px;height:15px}
  .fc-tag{display:none;position:absolute;left:48px;top:12px;padding:6px 11px;border-radius:999px;background:${C.primary};color:#fff;font-size:12px;font-weight:700}
  .fc-chip{position:absolute;left:12px;bottom:14px;display:inline-flex;align-items:center;gap:8px;max-width:calc(100% - 24px);padding:7px 12px 7px 8px;border-radius:999px;background:#fff;box-shadow:0 10px 24px -10px rgba(0,0,0,.4);font-size:13px;font-weight:600;color:${C.ink};white-space:nowrap}
  .fc-chip i{padding:2px 8px;border-radius:999px;font-style:normal;font-size:11.5px;font-weight:700}
  .fc-chip i.ok{background:#DCFCE7;color:#166534}
  .fc-chip i.err{background:#FEE2E2;color:#991B1B}
  .fc-chip.code{padding:9px 12px;border-radius:12px;background:#120B24;color:#FECACA;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:500;white-space:normal}
  .fc-card{position:absolute;left:12px;right:12px;bottom:12px;display:grid;gap:2px;padding:10px 12px;border-radius:14px;background:#fff;box-shadow:0 14px 28px -12px rgba(0,0,0,.45)}
  .fc-card small{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.primary}}
  .fc-card small svg{width:13px;height:13px}
  .fc-card b{font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;line-height:1.35;color:${C.ink}}
  .fc-card em{justify-self:start;margin-top:5px;padding:5px 11px;border-radius:9px;background:${C.primary};color:#fff;font-style:normal;font-size:12.5px;font-weight:600}
  .fc>p{margin:16px 0 0;font-size:15px;line-height:1.55;color:${C.body}}
  .fc>p b{font-weight:600;color:${C.ink}}
  .pb-points{list-style:none;display:grid;grid-template-columns:repeat(3,auto);justify-content:space-between;gap:14px 16px;margin:44px 0 0;padding:28px 0 0;border-top:1px solid ${C.line}}
  .pb-points li{display:flex;align-items:center;gap:9px;font-size:14px;line-height:1.4;color:${C.ink};white-space:nowrap}
  @media (max-width:1240px){.pb-points li{white-space:normal}}
  .pb-points li>span{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px;background:${C.tint};color:${C.primary};flex-shrink:0}
  .pb-points li>span svg{width:16px;height:16px}

  @media (prefers-reduced-motion:reduce){.fl-lk.end::after,.fl-mk,.ch-m,.ch-cur,.dots i,.ch-typed em{animation:none!important;transition:none!important}.fl[data-s=ok] .fl-lk.end::after{transform:scaleX(1)}}
  @media (max-width:980px){
    .hx-vis{margin:0 auto}
    .fc-seg{display:block;margin-bottom:22px;text-align:center}
    .fc-seg-bad{border-top:0;padding-top:0}
    .fc-seg-good{display:none}
    .fc-grid{grid-template-columns:1fr 1fr;gap:28px 20px}
    .fc-tag{display:block}
  }
  @media (max-width:760px){
    .hx-works{align-items:flex-start;flex-direction:column;gap:10px}
    .hx-works>span{padding-left:0}
    .fl{padding:18px 16px 14px}
    .fl-n{width:64px}
    .fl-st{flex-direction:column;gap:6px}
    .ch-body{height:230px}
    .pb-head{margin-bottom:26px}
    .pb-points{grid-template-columns:1fr;justify-content:start;margin-top:36px}
  }
  @media (max-width:560px){
    .fc-grid{grid-template-columns:1fr}
    .fc-ph{aspect-ratio:4/3}
    .fc-ph img{object-position:50% 30%}
  }

  /* how it works: three connected steps on a rail */
  .bt-dots{display:flex;gap:6px;margin-bottom:4px}
  .bt-dots i{width:10px;height:10px;border-radius:50%;background:#EF4444}
  .bt-dots i:nth-child(2){background:#F5B83D}
  .bt-dots i:nth-child(3){background:#22A55B}
  .bt-chip{padding:3px 10px;border-radius:999px;background:${C.tint};color:${C.primary};font-size:12px;font-weight:700;white-space:nowrap}
  .bt-chip.ok{background:#DCFCE7;color:#166534}
  .bt-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:12px;background:${C.ink};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;text-decoration:none;transition:background .2s ease}
  .bt-btn:hover{background:${C.primary}}
  .bt-btn svg{width:17px;height:17px}
  .fw{list-style:none;margin:12px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:0 36px}
  .fw-s{display:flex;flex-direction:column}
  .fw-body{display:flex;flex-direction:column;flex:1}
  .fw-top{display:flex;align-items:center;margin-bottom:24px}
  .fw-n{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;background:${C.ink};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:700;flex-shrink:0;box-shadow:0 0 0 6px ${C.tint}}
  .fw-line{flex:1;height:2px;margin:0 8px 0 18px;background:repeating-linear-gradient(90deg,${C.action} 0 6px,transparent 6px 12px);animation:fwFlow 1s linear infinite}
  @keyframes fwFlow{to{background-position:12px 0}}
  .fw-live{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;background:${C.lime};color:${C.limeInk};font-size:13px;font-weight:700}
  .fw-live svg{width:15px;height:15px}
  .fw-s:last-child .fw-line{margin-right:14px}
  .fw-s p{margin:10px 0 0;font-size:15.5px;line-height:1.6;color:${C.body};max-width:38ch}
  .fw-card{margin-top:auto;padding:14px;border-radius:18px;background:${C.g1};display:grid;gap:8px}
  .fw-s p+.fw-card{margin-top:26px}
  .fw-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .fw-row b{flex:1;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${C.ink}}
  .fw-row small{font-size:12.5px;color:${C.muted}}
  .fw-row em{font-style:normal;font-size:18px;line-height:1;color:${C.muted}}
  .fw-row.api{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.soft}}
  .fw-api{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;background:${C.primary};color:#fff;flex-shrink:0}
  .fw-api svg{width:14px;height:14px}
  .fw-row small:first-child{width:86px;flex-shrink:0}
  .fw-dir{display:inline-flex;align-items:center;gap:6px}
  .fw-dir svg{width:14px;height:14px;color:${C.primary}}
  .fw-tick{display:flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:${C.ok};color:#fff;flex-shrink:0}
  .fw-tick svg{width:12px;height:12px}

  /* scenarios: one after the other on a soft gradient */
  .sg-sec{background:linear-gradient(180deg,#fff 0,#E6ECFF 14%,#E8DBFB 55%,#FADDEC 90%,#fff 100%)}
  .sg{margin-top:8px}
  .sg-stage{display:grid;justify-items:center;align-items:center;position:relative}
  .sg-c{grid-area:1/1;position:relative;overflow:hidden;width:min(700px,92vw);border-radius:26px;background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.7),0 40px 70px -40px rgba(60,30,120,.45);cursor:pointer;transition:transform .65s cubic-bezier(.3,.7,.2,1),opacity .5s ease,width .65s cubic-bezier(.3,.7,.2,1),height .65s cubic-bezier(.3,.7,.2,1)}
  .sg-c.on{z-index:3;cursor:default}
  .sg-c:not(.on){width:190px;height:330px;z-index:2;opacity:.8}
  .sg-c[data-o="-1"]{transform:translateX(-470px) scale(.96)}
  .sg-c[data-o="1"]{transform:translateX(470px) scale(.96)}
  .sg-c[data-o="2"]{transform:translateX(560px) scale(.9);opacity:0;pointer-events:none}
  .sg-c[data-o="-1"].on,.sg-c[data-o="1"].on{transform:none}
  .sg-c[data-o="2"]{transition:transform 0s,opacity 0s}
  .sg-mini{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:18px;text-align:center;opacity:1;transition:opacity .3s ease .2s}
  .sg-c.on .sg-mini{opacity:0;pointer-events:none;transition:opacity .15s ease}
  .sg-ms{display:flex}
  .sg-ms>*{box-shadow:0 0 0 3px #fff}
  .sg-ms>*+*{margin-left:-8px}
  .sg-mini small{font-size:12px;font-weight:700;letter-spacing:.04em;color:${C.primary}}
  .sg-mini b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;line-height:1.25;color:${C.ink}}
  .sg-full{display:grid;grid-template-columns:1fr 1.05fr;gap:8px;width:min(700px,92vw);opacity:1;transition:opacity .35s ease .25s}
  .sg-c:not(.on) .sg-full{position:absolute;left:0;top:0;opacity:0;pointer-events:none;transition:opacity .15s ease}
  .sg-copy{display:flex;flex-direction:column;align-items:flex-start;padding:34px 12px 34px 34px}
  .sg-cat{padding:4px 12px;border-radius:999px;background:${C.tint};color:${C.primary};font-size:12.5px;font-weight:700;letter-spacing:.03em}
  .sg-copy h3{margin-top:18px!important}
  .sg-copy p{margin:12px 0 0;font-size:15.5px;line-height:1.6;color:${C.body}}
  .sg-vis{display:flex;align-items:stretch;padding:14px}
  .sg-win{flex:1;display:grid;align-content:center;gap:8px;padding:16px;border-radius:18px;background:linear-gradient(160deg,#F5F0FF,#FDEFF6);box-shadow:inset 0 0 0 1px ${C.soft}}
  .sg-hd{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:2px 2px 6px}
  .sg-hd span{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;font-weight:600;color:${C.ink}}
  .sg-hd i{display:inline-flex;color:${C.primary}}
  .sg-hd i svg{width:18px;height:18px}
  .sg-r{display:grid;grid-template-columns:.8fr 1fr 1fr;gap:8px;align-items:center;padding:10px 12px;border-radius:12px;background:#fff;box-shadow:0 1px 2px rgba(30,20,60,.06)}
  .sg-r small{font-size:12px;color:${C.muted}}
  .sg-r b{font-size:13.5px;font-weight:600;color:${C.ink}}
  .sg-r.flag{box-shadow:inset 0 0 0 1.5px #F5B83D;background:#FFFBEB}
  .sg-r.flag b:last-child{color:#B45309}
  .sg-foot{display:flex;align-items:center;gap:8px;margin-top:4px;padding:10px 12px;border-radius:12px;font-size:13px;font-weight:600}
  .sg-foot svg{width:16px;height:16px;flex-shrink:0}
  .sg-foot.ok{background:#DCFCE7;color:#166534}
  .sg-foot.warn{background:#FEF3C7;color:#92400E}
  .sg-dots{display:flex;justify-content:center;gap:8px;margin-top:30px}
  .sg-dots button{width:9px;height:9px;padding:0;border:0;border-radius:999px;background:rgba(46,16,101,.22);cursor:pointer;transition:width .3s ease,background .3s ease}
  .sg-dots button.on{width:30px;background:${C.primary}}
  .sc-note{margin:22px 0 0;text-align:center;font-size:13.5px;color:#5B5470}

  @media (prefers-reduced-motion:reduce){.sg-c,.sg-mini,.sg-full{transition:none!important}}
  @media (max-width:1080px){
    .sg-c[data-o="-1"]{transform:translateX(-400px) scale(.94)}
    .sg-c[data-o="1"]{transform:translateX(400px) scale(.94)}
  }
  @media (max-width:900px){
    .sg-c:not(.on){display:none}
    .sg-c.on{width:100%}
    .sg-full{width:auto;grid-template-columns:1fr}
    .sg-copy{padding:26px 22px 8px}
    .sg-vis{padding:10px 12px 14px}
  }
  @media (max-width:760px){
    .sg-r{grid-template-columns:.9fr 1fr 1fr}
  }

  /* headings: two tones, a little larger */
  .sx-head h2 .t2,.tr-list h2 .t2{color:#8E8C96}
  .sx-dark .sx-head h2 .t2{color:#A99BC9}

  /* product tour */
  .tr{display:grid;grid-template-columns:.78fr 1.22fr;gap:56px;align-items:center}
  .tr-list .sx-label{margin-bottom:14px}
  .tr-list ul{list-style:none;margin:30px 0 28px;padding:0;border-top:1px solid ${C.line}}
  .tr-list li{border-bottom:1px solid ${C.line}}
  .tr-list li>button{display:flex;align-items:center;justify-content:space-between;width:100%;padding:18px 2px;border:0;background:none;font-family:var(--font-display),system-ui,sans-serif;font-size:19px;font-weight:600;color:${C.muted};text-align:left;cursor:pointer;transition:color .2s ease}
  .tr-list li>button:hover,.tr-list li.on>button{color:${C.ink}}
  .tr-list li>button svg{width:18px;height:18px;flex-shrink:0;transition:transform .25s ease}
  .tr-list li.on>button svg{transform:rotate(180deg)}
  .tr-more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
  .tr-list li.on .tr-more{grid-template-rows:1fr}
  .tr-more>div{overflow:hidden}
  .tr-more p{margin:0 0 10px;font-size:15.5px;line-height:1.6;color:${C.body}}
  .tr-more a{display:inline-flex;align-items:center;gap:6px;margin-bottom:20px;font-size:15px;font-weight:600;color:${C.primary};text-decoration:none}
  .tr-more a:hover{text-decoration:underline}
  .tr-more a svg{width:15px;height:15px}
  .tr-stage{padding:32px;border-radius:30px;background:linear-gradient(135deg,#E6ECFF 0,#E8DBFB 55%,#FADDEC 100%)}
  .tr-win{position:relative;height:470px;border-radius:18px;background:#fff;box-shadow:0 36px 70px -34px rgba(46,16,101,.55),0 0 0 1px rgba(255,255,255,.85);overflow:hidden}
  .tr-win .bt-dots{padding:14px 16px 0;margin:0}
  .tr-win::after{content:"";position:absolute;left:0;right:0;bottom:0;height:70px;background:linear-gradient(180deg,rgba(255,255,255,0),#fff);pointer-events:none}
  .tr-vis{padding:12px 16px 0;animation:trIn .4s ease both}
  .tr-vis .vz{box-shadow:none;border-radius:12px}
  @keyframes trIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.tr-vis{animation:none}.tr-more{transition:none}}
  @media (max-width:980px){
    .tr{grid-template-columns:1fr;gap:34px}
  }
  @media (max-width:640px){
    .tr-stage{padding:14px;border-radius:22px}
    .tr-win{height:420px}
  }

  /* evi and the sync agent: one app window, three steps */
  .es-sec{position:relative;overflow:hidden;background:radial-gradient(900px 480px at 80% 8%,rgba(168,85,247,.38),transparent 70%),radial-gradient(700px 420px at 5% 95%,rgba(163,230,53,.12),transparent 70%),${C.depth}}
  .es{display:grid;grid-template-columns:.78fr 1.22fr;gap:44px;align-items:center;margin-top:30px}
  .es-ex{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 16px 10px 10px;border-radius:16px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
  .es-tag{padding:4px 12px;border-radius:999px;background:${C.lime};color:${C.limeInk};font-size:12.5px;font-weight:700}
  .es-ex-m{display:flex;align-items:center;gap:6px}
  .es-ex-m svg{width:15px;height:15px;color:${C.lime}}
  .es-ex p{margin:0;flex:1;min-width:180px}
  .es-ex b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:#fff}
  .es-ex small{font-size:12.5px;color:#CDBEE8}
  .es-steps{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:6px}
  .es-steps li{position:relative;border-radius:18px;transition:background .25s ease}
  .es-steps li.on{background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
  .es-steps button{display:flex;gap:16px;width:100%;padding:18px 20px;border:0;background:none;text-align:left;cursor:pointer;color:#fff}
  .es-n{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.12);font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:700;color:#CDBEE8;flex-shrink:0;transition:background .25s ease,color .25s ease}
  .es-steps li.on .es-n{background:${C.lime};color:${C.limeInk}}
  .es-tx{display:grid;gap:6px}
  .es-tx b{font-family:var(--font-display),system-ui,sans-serif;font-size:19px;font-weight:600;color:#B7A8D6;transition:color .25s ease}
  .es-steps li.on .es-tx b{color:#fff}
  .es-tx>span{display:none;font-size:15px;line-height:1.55;color:#CDBEE8}
  .es-steps li.on .es-tx>span{display:block}
  .es-bar{position:absolute;left:20px;right:20px;bottom:0;height:2px;border-radius:2px;background:transparent;overflow:hidden}
  .es-steps li.on .es-bar{background:rgba(255,255,255,.12)}
  .es-bar u{display:block;height:100%;width:0;background:${C.lime}}
  .es-steps li.on .es-bar u{animation:esBar 7.5s linear forwards}
  @keyframes esBar{to{width:100%}}

  .es-win{position:relative;height:540px;border-radius:22px;background:#fff;box-shadow:0 50px 90px -40px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.2);overflow:hidden}
  .es-top{display:flex;align-items:center;gap:16px;padding:12px 16px;border-bottom:1px solid ${C.line};background:#FAF9FC;font-size:12.5px;color:${C.muted}}
  .es-top .bt-dots{margin:0}
  .es-page{padding:18px 20px;width:56%;display:grid;gap:12px;align-content:start}
  .es-ph{display:flex;align-items:center;gap:10px}
  .es-ph b{font-family:var(--font-display),system-ui,sans-serif;font-size:20px;color:${C.ink}}
  .es-sub{margin-top:-6px;font-size:12px;color:${C.muted}}
  .es-path{list-style:none;margin:0;padding:12px 8px;display:grid;grid-template-columns:repeat(4,1fr);gap:2px;border-radius:14px;background:${C.g1}}
  .es-path li{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;font-size:11px;font-weight:500;line-height:1.25;color:${C.ink}}
  .es-path li:not(:last-child)::after{content:"";position:absolute;top:12px;left:calc(50% + 14px);right:calc(-50% + 14px);height:2px;background:#DDD8E5}
  .es-path li>span{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#DDD8E5;color:#fff}
  .es-path li.ok>span{background:${C.ok}}
  .es-path li.err>span{background:${C.err};box-shadow:0 0 0 4px rgba(220,38,38,.15)}
  .es-path li>span svg{width:12px;height:12px}
  .es-code{display:block;padding:10px 12px;border-radius:10px;background:#120B24;color:#FECACA;font-size:11.5px;white-space:pre-wrap}
  .es-cause{display:grid;gap:3px;padding:12px;border-radius:12px;background:${C.g1};font-size:12px;color:${C.body}}
  .es-cause b{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:${C.muted}}
  .es-panel{position:absolute;top:47px;right:0;bottom:0;width:48%;display:flex;flex-direction:column;gap:10px;padding:16px;background:#fff;border-left:1px solid ${C.line};box-shadow:-24px 0 40px -28px rgba(46,16,101,.45);animation:esIn .45s cubic-bezier(.2,.8,.2,1) both;overflow:hidden}
  @keyframes esIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
  .es-hd{display:flex;align-items:center;gap:10px;padding-bottom:8px;border-bottom:1px solid ${C.line}}
  .es-hd img{width:34px;height:34px;border-radius:50%;background:${C.tint};flex-shrink:0}
  .es-hd b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;line-height:1.2;color:${C.ink}}
  .es-hd small{display:block;font-size:11.5px;color:${C.muted}}
  .es-you{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:${C.lime};color:${C.limeInk};flex-shrink:0}
  .es-you svg{width:17px;height:17px}
  .es-me{align-self:flex-end;margin:0;padding:7px 13px;border-radius:15px 15px 4px 15px;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line};font-size:12.5px;font-weight:500;color:${C.ink}}
  .es-ans h5{display:flex;align-items:center;gap:7px;margin:9px 0 2px;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:700;color:${C.ink}}
  .es-ans h5:first-child{margin-top:0}
  .es-ans h5 i{padding:1px 8px;border-radius:999px;background:${C.tint};color:${C.primary};font-style:normal;font-size:10.5px;font-weight:600}
  .es-ans h5 i.inf{background:#EFF6FF;color:#1D4ED8}
  .es-ans p{margin:0;font-size:12.5px;line-height:1.5;color:${C.body}}
  .es-pill{align-self:flex-start;margin-top:auto;padding:7px 13px;border-radius:9px;background:${C.tint};color:${C.primary};font-size:12.5px;font-weight:600}
  .es-t{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;line-height:1.3;color:${C.ink}}
  .es-row{display:grid;grid-template-columns:58px 1fr;gap:8px;padding-top:8px;border-top:1px solid ${C.line};font-size:12px;line-height:1.45;color:${C.ink}}
  .es-row small{font-size:11px;font-weight:600;color:${C.muted}}
  .es-ba{display:grid;gap:5px}
  .es-ba span{display:block;padding:6px 9px;border-radius:9px;font-size:11.5px;line-height:1.4}
  .es-ba span em{display:block;font-style:normal;font-size:10px;font-weight:700;opacity:.7}
  .es-ba .b{background:#FEF2F2;box-shadow:inset 0 0 0 1px #FECACA;color:#7F1D1D}
  .es-ba .a{background:#F0FDF4;box-shadow:inset 0 0 0 1px #BBF7D0;color:#14532D}
  .es-risk{display:inline-block;margin-right:4px;padding:1px 8px;border-radius:999px;background:#DCFCE7;color:#166534;font-style:normal;font-size:11px;font-weight:700}
  .es-btns{display:flex;gap:7px;margin-top:auto}
  .es-btns span{flex:1;text-align:center;padding:9px 8px;border-radius:9px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:12.5px;font-weight:600;color:${C.ink}}
  .es-btns span.pri{background:${C.primary};box-shadow:none;color:#fff}
  .es-done{display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;background:#F0FDF4;box-shadow:inset 0 0 0 1px #BBF7D0}
  .es-done>span{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:${C.ok};color:#fff;flex-shrink:0}
  .es-done>span svg{width:17px;height:17px}
  .es-done b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:#14532D}
  .es-done small{display:block;font-size:12px;line-height:1.4;color:#166534}
  .es-hist{display:grid;gap:8px}
  .es-hist>small{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.muted}}
  .es-hist>div{display:flex;gap:10px;padding:10px 12px;border-radius:12px;background:${C.g1}}
  .es-hist i{width:9px;height:9px;margin-top:5px;border-radius:50%;background:${C.warn};flex-shrink:0}
  .es-hist i.ok{background:${C.ok}}
  .es-hist b{display:block;font-size:12.5px;line-height:1.35;color:${C.ink}}
  .es-hist span{display:block;margin-top:2px;font-size:11.5px;color:${C.muted}}

  .es-caps{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-top:34px;padding-top:24px;border-top:1px solid rgba(255,255,255,.14)}
  .es-caps>small{font-size:13px;font-weight:600;color:#CDBEE8}
  .es-caps ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
  .es-caps li{display:flex;align-items:center;gap:10px;padding:7px 8px 7px 14px;border-radius:999px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);font-size:13px;font-weight:600;color:#fff}
  .es-caps .sx-switch{width:32px;height:19px}
  .es-caps .sx-switch i{top:2.5px;left:2.5px;width:14px;height:14px}
  .es-caps .sx-switch.on i{transform:translateX(13px)}
  .es-caps .sx-switch.on{background:${C.lime}}
  @media (prefers-reduced-motion:reduce){.es-panel{animation:none}.es-steps li.on .es-bar u{animation:none;width:100%}}
  @media (max-width:980px){
    .es{grid-template-columns:1fr;gap:28px}
    .es-win{height:auto;min-height:0}
    .es-page{display:none}
    .es-panel{position:relative;top:auto;width:auto;border-left:0;box-shadow:none;min-height:360px}
  }

${ctaCss}

  /* apps: staggered frosted tiles */
  .ap-sec{background:#ECECEF;overflow:hidden}
  .ap-head{max-width:760px}
  .ap-lab{display:inline-flex;align-items:center;gap:10px;font-size:14.5px;font-weight:500;color:${C.ink}}
  .ap-lab::before{content:"";width:14px;height:2px;border-radius:2px;background:${C.primary}}
  .ap-head h2{margin-top:22px!important;line-height:1.08!important;color:${C.ink}}
  .ap-head h2 span{color:#8E8C96}
  .ap-head p{margin:26px 0 0;max-width:54ch;font-size:16px;line-height:1.65;color:#77747F}
  .ap-field{--t:88px;--gap:14px;display:flex;align-items:flex-start;justify-content:center;gap:var(--gap);margin-top:30px;min-height:calc(var(--t) * 5.1);-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 9%,#000 91%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 9%,#000 91%,transparent 100%)}
  .ap-col{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--gap)}
  .ap-t{position:relative;display:flex;align-items:center;justify-content:center;width:var(--t);height:var(--t);border-radius:calc(var(--t) * .27);overflow:hidden;background:linear-gradient(160deg,rgba(255,255,255,.95),rgba(255,255,255,.5));box-shadow:inset 0 0 0 1px rgba(255,255,255,.95),0 14px 26px -16px rgba(40,30,70,.4);animation:apFloat 6s ease-in-out infinite;transition:transform .3s ease}
  .ap-t::before{content:"";position:absolute;inset:-25%;background:radial-gradient(circle at 50% 58%,var(--g) 0,transparent 62%);opacity:.34;filter:blur(10px)}
  .ap-t svg,.ap-t img{position:relative;width:46%;height:46%;object-fit:contain}
  .ap-t.empty{background:rgba(255,255,255,.5);box-shadow:inset 0 0 0 1px rgba(255,255,255,.75)}
  .ap-t.empty::before{display:none}
  .ap-t:not(.empty):hover{transform:translateY(-4px) scale(1.04);animation-play-state:paused}
  @keyframes apFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
  @media (prefers-reduced-motion:reduce){.ap-t{animation:none}}
  @media (max-width:900px){
    .ap-field{--t:min(84px,calc((100vw - 48px - 8*12px) / 9));--gap:12px}
    .ap-col:nth-child(n+10){display:none}
  }
  @media (max-width:640px){
    .ap-field{--t:calc((100vw - 32px - 6*10px) / 7);--gap:10px}
    .ap-col:nth-child(n+8){display:none}
  }

  @media (max-width:980px){
    .hx-grid{grid-template-columns:1fr}
  }
  @media (max-width:760px){
    .hx{padding-top:48px;padding-bottom:56px}
    .hx-copy>p{font-size:17px}
  }

  @media (max-width:860px){
    .fw{grid-template-columns:1fr;gap:34px}
    .fw-s{display:grid;grid-template-columns:52px 1fr;column-gap:18px}
    .fw-top{flex-direction:column;margin:0}
    .fw-line{flex:1;width:2px;height:auto;min-height:24px;margin:10px 0 -34px;background:repeating-linear-gradient(180deg,${C.action} 0 6px,transparent 6px 12px);animation:none}
    .fw-s:last-child .fw-line{display:none}
    .fw-live{display:none}
  }
  @media (prefers-reduced-motion:reduce){.fw-line{animation:none}}
`;
