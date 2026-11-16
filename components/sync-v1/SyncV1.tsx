"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftRight, ArrowRight, Check, ChevronDown, CircleAlert, FlaskConical, Lightbulb, ListChecks, Plug,
  History, ShieldCheck, Shuffle, Sparkles, User, Workflow, X, type LucideIcon,
} from "lucide-react";
import { GLYPHS } from "./glyphs";
import { APP, C, IMAGE_MARKS, IMG, SYNC_BASE } from "./data";
import { Demo, Mark, SyncMark, SyncShell } from "./Shell";
import { visCss } from "./Visuals";

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
          <h1 data-rv="1">Get your systems to <span className="hx-hl">agree.</span></h1>
          <p data-rv="2">EVOQ Sync keeps your CRM, ERP, accounting and eCommerce applications in step. It explains integration errors in plain English and prepares corrective actions for your review. You approve them. Nothing changes without you.</p>
          <div className="sx-ctas" data-rv="3">
            <Demo location="hero">Book a Walkthrough</Demo>
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

/* ---------- 2 the problem: the 8:40 Monday moment, shown as four steps, then what changes ---------- */
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
          <h2 data-rv>From application connections to active integrations.</h2>
          <p data-rv="1">Set up an integration through a guided process. Choose the applications, select the data to synchronize, define how fields should correspond and test the result before activation.</p>
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
        <div className="fw-cta" data-rv>
          <Link href={`${SYNC_BASE}/features#integrations`} className="bt-btn">Explore Integration Features<ArrowRight aria-hidden /></Link>
        </div>
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
          <h2 data-rv>Make the information agree across your applications.</h2>
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

/* ---------- 5 monitoring, data mapping and workflow automation, as one light bento ---------- */
const SEE = [
  "Status, duration and record counts",
  "Step by step path",
  "Application responses and logs",
  "Likely cause, marked as an inference",
  "Retry eligibility",
];
const FEATURES: { icon: LucideIcon; t: string }[] = [
  { icon: Shuffle, t: "Data Mapping" },
  { icon: Sparkles, t: "Data Transformation" },
  { icon: ArrowLeftRight, t: "Synchronization Direction" },
  { icon: Workflow, t: "Visual Workflow Builder" },
  { icon: FlaskConical, t: "Test Before Activation" },
];

function Operate() {
  return (
    <section className="sx-sec sx-out sx-grey" id="monitoring">
      <div className="sx-in">
        <div className="og">
          <article className="og-c og-a" data-rv>
            <Label>Monitoring and troubleshooting</Label>
            <h2>Every error, translated.</h2>
            <p className="og-lead">An integration failure should tell you more than a code and a timestamp.</p>
            <div className="ex" aria-hidden>
              <div className="ex-hd"><b>Execution EX-20493</b><span className="bt-chip warn">Partial failure</span></div>
              <div className="ex-stats">
                <div><small>Duration</small><b>2.4 s</b></div>
                <div><small>Records</small><b>12</b></div>
                <div><small>Failed</small><b className="bad">1</b></div>
              </div>
              <ol className="ex-path">
                <li className="ok"><span><Check /></span>Trigger</li>
                <li className="ok"><span><Check /></span>Validate</li>
                <li className="err"><span><X /></span>Create order</li>
                <li><span /></li>
              </ol>
            </div>
          </article>

          <article className="og-c og-b" data-rv="1">
            <h3>Instead of starting with a support ticket, start with an explanation.</h3>
            <ul className="og-pills">{SEE.map((x) => <li key={x}><Check aria-hidden />{x}</li>)}</ul>
            <Link href={`${SYNC_BASE}/features#monitoring`} className="sx-btn secondary sm">Explore Monitoring Features<ArrowRight aria-hidden /></Link>
          </article>

          <article className="og-c og-d sx-dark" id="mapping" data-rv>
            <Label>Data mapping and workflow automation</Label>
            <h2>Define how information moves and what happens along the way.</h2>
            <ul className="og-feat">
              {FEATURES.map((f) => { const I = f.icon; return <li key={f.t}><span><I aria-hidden /></span>{f.t}</li>; })}
            </ul>
          </article>

          <article className="og-c og-map" data-rv="1">
            <h3>Data Mapping</h3>
            <p>Pair fields across applications, validate required fields and preview sample records before execution.</p>
            <div className="mpv" aria-hidden>
              <div className="mpv-hd"><Mark id="shopify" size={22} /><ArrowRight /><Mark id="netsuite" size={22} /><span className="bt-chip">One way</span></div>
              <div className="mpv-r"><b>Order total</b><ArrowRight /><b>amount</b><span className="bt-chip ok">Valid</span></div>
              <div className="mpv-r"><b>Customer email</b><ArrowRight /><b>email</b><span className="bt-chip ok">Valid</span></div>
              <div className="mpv-r"><b>Order date</b><ArrowRight /><b>tranDate</b><span className="bt-chip">Date format</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7 EVI and the Sync Agent: one real example from the app, in three steps ---------- */
function EviAgent() {
  return (
    <section className="sx-sec sx-out sx-dark ev-sec" id="evi">
      <div className="sx-in">
        <div className="sx-head c">
          <Label>EVI and Sync Agent</Label>
          <h2 data-rv>You ask. It prepares. You decide.</h2>
          <p data-rv="1">EVI is the assistant available across EVOQ applications. In EVOQ Sync, it works with the Sync Agent, a specialist for integration setup, mapping, monitoring and optimization.</p>
        </div>

        <div className="ev3-ex" data-rv>
          <span className="ev3-tag">Example</span>
          <Mark id="hubspot" size={22} /><ArrowRight aria-hidden /><Mark id="netsuite" size={22} />
          <b>HubSpot accounts to NetSuite customers</b>
          <small>Execution EX-20491 · 3 of 12 records failed</small>
        </div>

        <ol className="ev3">
          <li className="ev3-s" data-rv>
            <span className="ev3-k">You ask</span>
            <div className="ev3-card" aria-hidden>
              <div className="ev3-hd"><img src={`${IMG}/characters/evi-head.webp`} alt="" /><div><b>EVI</b><small>Looking at: Execution EX-20491</small></div></div>
              <p className="ev3-me">Diagnose with EVI</p>
              <div className="ev3-evi">
                <h5>What happened <i>observed</i></h5>
                <p>3 of 12 records failed at the step “Validate required fields”.</p>
                <h5>Likely cause <i className="inf">my inference</i></h5>
                <p>Accounts created before March have no tax ID, and the destination requires it for EMEA customers.</p>
                <h5>Suggested fix</h5>
                <p>A conditional skip for accounts without a tax ID.</p>
              </div>
              <span className="ev3-pill">Prepare proposal</span>
            </div>
            <p><b>EVI</b> An assistant that has read the page. It uses the current screen as context to explain the situation and guide you to the relevant action.</p>
          </li>

          <li className="ev3-ar" aria-hidden><ArrowRight /></li>

          <li className="ev3-s" data-rv="1">
            <span className="ev3-k">It prepares</span>
            <div className="ev3-card" aria-hidden>
              <div className="ev3-hd"><img src={`${IMG}/characters/sync-head.webp`} alt="" /><div><b>Sync Agent</b><small>Error Diagnosis · Change active mapping</small></div></div>
              <b className="ev3-t">Make “Tax ID” optional for non-EMEA accounts</b>
              <div className="ev3-row"><small>Observed</small><span>All 3 failing accounts are outside EMEA.</span></div>
              <div className="ev3-row"><small>Inferred</small><span>Mapping v7 had no conditional rule. Not confirmed.</span></div>
              <div className="ev3-row"><small>Change</small>
                <div className="ev3-ba"><span className="b"><em>Before</em>Required: name, tax_id, country</span><span className="a"><em>After</em>tax_id required only when country is in EMEA</span></div>
              </div>
              <div className="ev3-row"><small>Risk</small><span><i className="ev3-risk">Low</i> Configuration change only. No records are modified.</span></div>
            </div>
            <p><b>Sync Agent</b> A specialist for integration work. Every proposal shows the facts, the likely inference, the before and after, and the risk.</p>
          </li>

          <li className="ev3-ar" aria-hidden><ArrowRight /></li>

          <li className="ev3-s" data-rv="2">
            <span className="ev3-k">You decide</span>
            <div className="ev3-card" aria-hidden>
              <div className="ev3-hd"><span className="ev3-you"><User /></span><div><b>You</b><small>Approvals</small></div></div>
              <b className="ev3-t">Make “Tax ID” optional for non-EMEA accounts</b>
              <small className="ev3-sub"><i className="ev3-pend">Pending approval</i>Sync Agent · Error Diagnosis</small>
              <div className="ev3-btns"><span className="ev3-btn">Reject</span><span className="ev3-btn pri">Approve Proposal</span></div>
              <div className="ev3-rec"><History />Every decision is recorded in History, with the person and the time.</div>
            </div>
            <p><b>You</b> Approve or reject the proposal. The decision is recorded.</p>
          </li>
        </ol>

        <p className="ev-close" data-rv>Your integrations remain under your control. The agent prepares the work. You decide what happens next.</p>
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
          <h2 data-rv>The applications you use.<br /><span>The connections you need.</span></h2>
          <p data-rv="1">EVOQ Sync includes a catalog of applications across CRM, ERP, accounting, eCommerce, inventory, marketing and productivity categories.</p>
        </div>
        <div className="ap-field" data-rv="1">
          {FIELD.map((c, k) => (
            <ul key={k} className="ap-col" style={{ marginTop: `calc(var(--t) * ${c.top})` }}>
              {c.items.map((id) => <GlassTile key={`${k}-${n}`} id={id} i={n++} />)}
            </ul>
          ))}
        </div>
        <div className="ap-api" data-rv>
          <span className="ap-api-i"><Plug aria-hidden /></span>
          <p>For systems outside the catalog, configure a <b>Custom REST API Connection</b> with its base URL, authentication details and test call.</p>
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
      <Scenarios />
      <Operate />
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
  .hx{padding-top:56px;padding-bottom:72px;background:radial-gradient(900px 480px at 80% 10%,${C.tint},rgba(255,255,255,0) 70%),#fff;overflow:hidden}
  .hx-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
  .hx-eyebrow{display:inline-flex;align-items:center;gap:10px;padding:7px 14px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.soft};font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.08em;color:${C.primary}}
  .hx h1{margin-top:22px!important;--h1-size:60px}
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
  .pb-points{list-style:none;display:flex;justify-content:center;flex-wrap:wrap;gap:14px 40px;margin:44px 0 0;padding:28px 0 0;border-top:1px solid ${C.line}}
  .pb-points li{display:flex;align-items:center;gap:10px;font-size:15px;line-height:1.4;color:${C.ink}}
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
    .pb-points{flex-direction:column;align-items:flex-start;margin-top:36px}
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
  .fw-s h3{--h3-size:22px}
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
  .fw-cta{display:flex;justify-content:center;margin-top:44px}

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
  .sg-copy h3{--h3-size:30px;margin-top:18px!important}
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

  /* monitoring and mapping, one light bento */
  .og{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}
  .og-c{position:relative;display:flex;flex-direction:column;padding:34px;border-radius:26px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};overflow:hidden}
  .og-a{grid-column:span 7}
  .og-b{grid-column:span 5;justify-content:space-between;gap:22px}
  .og-d{grid-column:span 5}
  .og-map{grid-column:span 7}
  .og-c .sx-label{margin-bottom:14px}
  .og-c h2{--h2-size:34px}
  .og-c h3{--h3-size:22px;line-height:1.3!important}
  .og-c>p{margin:10px 0 0;font-size:15.5px;line-height:1.6;color:${C.body};max-width:52ch}
  .og-c>p.og-lead{margin-top:14px;font-size:17.5px;color:${C.ink}}
  .og-b .sx-btn{align-self:flex-start}
  .og-pills{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
  .og-pills li{display:inline-flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line};font-size:13.5px;font-weight:500;color:${C.ink}}
  .og-pills svg{width:14px;height:14px;color:${C.ok}}
  .og-d{background:${C.depth};box-shadow:none}
  .og-feat{list-style:none;margin:auto 0 0;padding:28px 0 0;display:grid;gap:4px}
  .og-feat li{display:flex;align-items:center;gap:14px;padding:10px 0;font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:500;color:#fff}
  .og-feat li+li{border-top:1px solid rgba(255,255,255,.12)}
  .og-feat li>span{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.1);color:${C.lime};flex-shrink:0}
  .og-feat li>span svg{width:17px;height:17px}
  .bt-chip.warn{background:#FEF3C7;color:#92400E}

  .ex{margin-top:auto;padding:16px;border-radius:18px;background:${C.g1};display:grid;gap:12px}
  .og-lead+.ex{margin-top:auto}
  .og-a>p.og-lead{margin-bottom:28px}
  .ex-hd{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .ex-hd b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${C.ink}}
  .ex-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  .ex-stats>div{padding:12px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .ex-stats small{display:block;font-size:12px;color:${C.muted}}
  .ex-stats b{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;color:${C.ink}}
  .ex-stats b.bad{color:${C.err}}
  .ex-path{list-style:none;margin:0;padding:4px 2px 0;display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
  .ex-path li{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:${C.ink};text-align:center}
  .ex-path li:not(:last-child)::after{content:"";position:absolute;top:13px;left:calc(50% + 18px);right:calc(-50% + 18px);height:2px;background:#DDD8E5}
  .ex-path li.ok:not(:last-child)::after{background:${C.ok};opacity:.5}
  .ex-path li>span{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#DDD8E5;color:#fff}
  .ex-path li.ok>span{background:${C.ok}}
  .ex-path li.err>span{background:${C.err};box-shadow:0 0 0 5px rgba(220,38,38,.15)}
  .ex-path li>span svg{width:14px;height:14px}

  .og-map>p{max-width:56ch}
  .mpv{margin-top:auto;padding:16px;border-radius:18px;background:${C.g1};display:grid;gap:8px}
  .og-map>p{margin-bottom:26px}
  .mpv-hd{display:flex;align-items:center;gap:8px;padding:0 2px 4px}
  .mpv-hd svg{width:16px;height:16px;color:${C.primary}}
  .mpv-hd .bt-chip{margin-left:auto}
  .mpv-r{display:grid;grid-template-columns:1fr auto 1fr auto;align-items:center;gap:10px;padding:11px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .mpv-r b{font-size:14px;font-weight:600;color:${C.ink}}
  .mpv-r svg{width:15px;height:15px;color:${C.muted}}

  /* evi and the sync agent, one real example */
  .ev-sec{position:relative;overflow:hidden}
  .ev3-ex{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;width:fit-content;max-width:100%;margin:34px auto 0;padding:8px 18px 8px 8px;border-radius:999px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16)}
  .ev3-ex svg{width:16px;height:16px;color:${C.lime}}
  .ev3-ex b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:#fff}
  .ev3-ex small{font-size:13px;color:#CDBEE8}
  .ev3-tag{padding:4px 12px;border-radius:999px;background:${C.lime};color:${C.limeInk};font-size:12.5px;font-weight:700}
  .ev3{list-style:none;margin:30px 0 0;padding:0;display:grid;grid-template-columns:1fr 40px 1fr 40px 1fr;align-items:stretch}
  .ev3-s{display:flex;flex-direction:column;gap:14px;min-width:0}
  .ev3-k{align-self:flex-start;padding:4px 12px;border-radius:999px;background:rgba(163,230,53,.16);color:${C.lime};font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:700}
  .ev3-card{flex:1;display:flex;flex-direction:column;gap:10px;padding:18px;border-radius:22px;background:#fff;color:${C.ink};box-shadow:0 30px 60px -30px rgba(0,0,0,.6)}
  .ev3-s>p{margin:0;font-size:14.5px;line-height:1.55;color:#CDBEE8}
  .ev3-s>p b{margin-right:6px;color:#fff;font-family:var(--font-display),system-ui,sans-serif}
  .ev3-ar{align-self:center;justify-self:center;display:flex;align-items:center;justify-content:center;width:34px;height:34px;margin-top:-60px;border-radius:50%;background:${C.lime};color:${C.limeInk}}
  .ev3-ar svg{width:17px;height:17px}
  .ev3-hd{display:flex;align-items:center;gap:10px;padding-bottom:6px;border-bottom:1px solid ${C.line}}
  .ev3-hd img{width:34px;height:34px;border-radius:50%;background:${C.tint};flex-shrink:0}
  .ev3-hd b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;line-height:1.2}
  .ev3-hd small{display:block;font-size:12px;color:${C.muted}}
  .ev3-you{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:${C.lime};color:${C.limeInk};flex-shrink:0}
  .ev3-you svg{width:17px;height:17px}
  .ev3-me{align-self:flex-end;margin:0;padding:8px 14px;border-radius:16px 16px 5px 16px;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line};font-size:13px;font-weight:500;color:${C.ink}}
  .ev3-evi h5{display:flex;align-items:center;gap:8px;margin:10px 0 2px;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:700;color:${C.ink}}
  .ev3-evi h5:first-child{margin-top:0}
  .ev3-evi h5 i{padding:1px 8px;border-radius:999px;background:${C.tint};color:${C.primary};font-style:normal;font-size:11px;font-weight:600}
  .ev3-evi h5 i.inf{background:#EFF6FF;color:#1D4ED8}
  .ev3-evi p{margin:0;font-size:13px;line-height:1.5;color:${C.body}}
  .ev3-pill{align-self:flex-start;margin-top:auto;padding:7px 13px;border-radius:10px;background:${C.tint};color:${C.primary};font-size:13px;font-weight:600}
  .ev3-t{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;line-height:1.3;color:${C.ink}}
  .ev3-sub{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12.5px;color:${C.muted};margin-top:-4px}
  .ev3-pend{padding:2px 9px;border-radius:999px;background:#FEF3C7;color:#92400E;font-style:normal;font-size:11.5px;font-weight:700}
  .ev3-row{display:grid;grid-template-columns:62px 1fr;gap:10px;padding:9px 0 0;border-top:1px solid ${C.line};font-size:13px;line-height:1.45;color:${C.ink}}
  .ev3-row small{font-size:12px;font-weight:600;color:${C.muted}}
  .ev3-ba{display:grid;gap:6px}
  .ev3-ba span{display:block;padding:7px 10px;border-radius:10px;font-size:12.5px;line-height:1.4}
  .ev3-ba span em{display:block;font-style:normal;font-size:11px;font-weight:700;opacity:.7}
  .ev3-ba .b{background:#FEF2F2;box-shadow:inset 0 0 0 1px #FECACA;color:#7F1D1D}
  .ev3-ba .a{background:#F0FDF4;box-shadow:inset 0 0 0 1px #BBF7D0;color:#14532D}
  .ev3-risk{display:inline-block;margin-right:4px;padding:1px 9px;border-radius:999px;background:#DCFCE7;color:#166534;font-style:normal;font-size:12px;font-weight:700}
  .ev3-btns{display:flex;gap:8px;margin-top:6px}
  .ev3-btn{flex:1;text-align:center;padding:10px 12px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:13.5px;font-weight:600;color:${C.ink}}
  .ev3-btn.pri{background:${C.primary};box-shadow:none;color:#fff}
  .ev3-rec{display:flex;align-items:flex-start;gap:8px;margin-top:auto;padding:11px 12px;border-radius:12px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft};font-size:12.5px;line-height:1.45;color:${C.body}}
  .ev3-rec svg{width:16px;height:16px;flex-shrink:0;margin-top:1px;color:${C.primary}}
  .ev-close{max-width:760px;margin:48px auto 0;text-align:center;text-wrap:balance;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:600;line-height:1.45;color:#fff}

  /* apps: staggered frosted tiles */
  .ap-sec{background:#ECECEF;overflow:hidden}
  .ap-head{max-width:760px}
  .ap-lab{display:inline-flex;align-items:center;gap:10px;font-size:14.5px;font-weight:500;color:${C.ink}}
  .ap-lab::before{content:"";width:14px;height:2px;border-radius:2px;background:${C.primary}}
  .ap-head h2{--h2-size:50px;margin-top:22px!important;line-height:1.08!important;color:${C.ink}}
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
  .ap-api{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:34px;padding-top:26px;border-top:1px solid rgba(46,16,101,.12)}
  .ap-api p{flex:1;min-width:260px;margin:0;font-size:15px;line-height:1.55;color:#5B5870}
  .ap-api p b{color:${C.ink};font-weight:600}
  .ap-api-i{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:11px;background:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.9),0 6px 14px -8px rgba(40,30,70,.4);color:${C.primary};flex-shrink:0}
  .ap-api-i svg{width:18px;height:18px}
  @media (prefers-reduced-motion:reduce){.ap-t{animation:none}}
  @media (max-width:900px){
    .ap-head h2{--h2-size:40px}
    .ap-field{--t:min(84px,calc((100vw - 48px - 8*12px) / 9));--gap:12px}
    .ap-col:nth-child(n+10){display:none}
  }
  @media (max-width:640px){
    .ap-head h2{--h2-size:32px}
    .ap-field{--t:calc((100vw - 32px - 6*10px) / 7);--gap:10px}
    .ap-col:nth-child(n+8){display:none}
    .ap-api{flex-direction:column;align-items:flex-start}
  }

  @media (max-width:1100px){
    .hx h1{--h1-size:50px}
  }
  @media (max-width:980px){
    .hx-grid{grid-template-columns:1fr}
  }
  @media (max-width:760px){
    .hx{padding-top:48px;padding-bottom:56px}
    .hx h1{--h1-size:40px}
    .hx-copy>p{font-size:17px}
    .ap-api{flex-direction:column;align-items:flex-start}
  }
  @media (max-width:480px){
    .hx h1{--h1-size:36px}
  }

  @media (max-width:980px){
    .og-a,.og-b,.og-d,.og-map{grid-column:1 / -1}
  }
  @media (max-width:860px){
    .fw{grid-template-columns:1fr;gap:34px}
    .fw-s{display:grid;grid-template-columns:52px 1fr;column-gap:18px}
    .fw-top{flex-direction:column;margin:0}
    .fw-line{flex:1;width:2px;height:auto;min-height:24px;margin:10px 0 -34px;background:repeating-linear-gradient(180deg,${C.action} 0 6px,transparent 6px 12px);animation:none}
    .fw-s:last-child .fw-line{display:none}
    .fw-live{display:none}
    .fw-cta{margin-top:34px}
  }
  @media (max-width:560px){
    .og-c{padding:24px;border-radius:22px}
    .og-c h2{--h2-size:28px}
  }
  @media (prefers-reduced-motion:reduce){.fw-line{animation:none}}

  @media (max-width:980px){
    .ev3{grid-template-columns:1fr;gap:10px}
    .ev3-ar{margin:0;transform:rotate(90deg)}
  }
  @media (max-width:560px){
    .ev-close{font-size:18px}
  }
`;
