"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { CrmV1Close } from "./CrmV1Close";
import { CrmV1Shell } from "./CrmV1Shell";
import { AREAS, type Area } from "./featuresData";
import { BLUE, BODY, INK, LINE, MUTED, TINT } from "./palette";

/* The CRM v1 features page (docs/crm-v1-features-content.md). A tab bar of the areas, and one card below it for the open area: the visual on
   the left, the title, description and three feature tags on the right. The three features take turns lighting up, and the areas take turns
   on their own until a visitor picks one or is reading. */

const STEP_MS = 2800;
function useMedia(q: string) {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(q); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(q).matches,
    () => false,
  );
}

/* Monday style card: a soft panel with the visual on the left and the title, description and the three features as tags on the right.
   The visual is a small clean piece of the product, drawn for this page, and the part that the active feature describes is ringed. */

function LeadFragment({ step }: { step: number }) {
  const cur = step === 0 ? 0 : 3;
  return (
    <div className="lf" data-step={step}>
      <p className="lf-label">New lead from the <mark>web form</mark></p>
      <div className="lf-stack">
        <i className="lf-ghost g2" />
        <i className="lf-ghost g1" />
        <div className="lf-card">
          <img className="lf-av" src="/crm-v1/a-asian.webp" alt="" width={64} height={64} />
          <b className="lf-name">Meera Iyer</b>
          <span className="lf-role">Head of Operations, Halo Health</span>
          <div className="lf-facts">
            <div data-p="0"><small>Source</small><b>Web form</b></div>
            <div data-p="2"><small>Owner</small><b><img src="/crm-v1/a-curly.webp" alt="" width={20} height={20} />Priya Nair</b></div>
            <div className="wide" data-p="1">
              <small>Stage</small>
              <span className="lf-bar"><i style={{ width: `${(cur / 3) * 100}%` }} /></span>
              <span className="lf-ends"><em className={cur === 0 ? "on" : ""}>New</em><em className={cur === 3 ? "on" : ""}>Qualified</em></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Clean visuals for the other tabs. Each one is a single card with a label above it and three boxes inside; the box that the active
   feature describes gets a thin blue ring. All names and figures are sample data. */

const Ico = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const AV = (k: string) => `/crm-v1/a-${k}.webp`;

function Shell({ step, label, children }: { step: number; label: ReactNode; children: ReactNode }) {
  return (
    <div className="fg" data-step={step}>
      <p className="fg-label">{label}</p>
      <div className="lf-stack">
        <i className="lf-ghost g2" />
        <i className="lf-ghost g1" />
        <div className="fg-card">{children}</div>
      </div>
    </div>
  );
}

function ContactFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Contact record for <mark>Meera Iyer</mark></>}>
      <div className="fg-row"><img className="fg-av" src={AV("asian")} alt="" width={44} height={44} /><div><b className="fg-name">Meera Iyer</b><span className="fg-sub">Head of Operations</span></div></div>
      <div className="fg-grid">
        <div className="bx" data-p="0"><small>Contact</small><b>meera@halohealth.in</b><span>+91 80 4521 7788</span></div>
        <div className="bx" data-p="1"><small>Account</small><b>Halo Health</b><span>Owned by Priya Nair</span></div>
      </div>
      <div className="bx" data-p="2">
        <small>Timeline</small>
        <ul className="fg-tl"><li><i />Call on Friday</li><li><i />Proposal sent by email</li><li><i />Renewal discussed, note added</li></ul>
      </div>
    </Shell>
  );
}

function PipelineFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Deal <mark>Northgate expansion</mark></>}>
      <div className="bx" data-p="0">
        <small>Stage</small>
        <div className="fg-seg"><i className="d" /><i className="d" /><i className="d" /><i className="n" /><i /></div>
        <div className="fg-ends"><span>Qualification</span><b>Proposal</b><span>Closed won</span></div>
      </div>
      <div className="fg-box3" data-p="1">
        <div className="bx"><small>Amount</small><b>₹5,00,000</b></div>
        <div className="bx"><small>Closing</small><b>30 June</b></div>
        <div className="bx"><small>Next step</small><b>Call Friday</b></div>
      </div>
      <div className="bx fg-between" data-p="2">
        <div className="fg-row"><span className="fg-ic"><Ico d="M14 3v4a1 1 0 0 0 1 1h4M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /></span><div><b>Quote ready</b><span>Created from the deal</span></div></div>
        <em className="fg-btn">Send</em>
      </div>
    </Shell>
  );
}

function TasksFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Follow ups <mark>due today</mark></>}>
      <div className="bx" data-p="0">
        <small>Due today</small>
        <ul className="fg-list">
          <li className="done"><i><Ico d="M5 12.5l4.5 4.5L19 7.5" size={12} /></i>Send the revised quote</li>
          <li><i />Call Halo Health</li>
          <li><i />Review the contract</li>
        </ul>
      </div>
      <div className="bx fg-between" data-p="1">
        <div className="fg-row"><span className="fg-ic"><Ico d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z" /></span><div><b>Halo Health renewal</b><span>Friday at 10:00</span></div></div>
        <span className="fg-avs"><img src={AV("curly")} alt="" width={26} height={26} /><img src={AV("man")} alt="" width={26} height={26} /><img src={AV("glasses")} alt="" width={26} height={26} /></span>
      </div>
      <div className="bx" data-p="2">
        <div className="fg-row"><span className="fg-ic"><Ico d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></span><div><b>Reminder at 9:00</b><span>Follow up with Northgate</span></div></div>
      </div>
    </Shell>
  );
}

function CampaignFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Campaign <mark>Renewal reminder</mark></>}>
      <div className="bx fg-between" data-p="0">
        <div className="fg-row"><span className="fg-ic"><Ico d="M3 7l9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></span><div><b>Email</b><span>To renewals due this month</span></div></div>
        <em className="fg-chip">Sent</em>
      </div>
      <div className="bx fg-between" data-p="1">
        <div className="fg-row"><span className="fg-ic"><Ico d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z" /></span><div><b>SMS</b><span>Short nudge the next day</span></div></div>
        <em className="fg-chip">Sent</em>
      </div>
      <div className="bx" data-p="2">
        <small>Responses</small>
        <div className="fg-meter"><span>Opens</span><i style={{ width: "78%" }} /></div>
        <div className="fg-meter"><span>Clicks</span><i style={{ width: "46%" }} /></div>
        <div className="fg-meter"><span>Replies</span><i style={{ width: "24%" }} /></div>
      </div>
    </Shell>
  );
}

function TeamFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>The team <mark>this quarter</mark></>}>
      <div className="bx" data-p="0">
        <small>Goals</small>
        {[["curly", "Priya", 86], ["man", "Daniel", 64], ["teal", "Nisha", 42]].map(([k, n, w]) => (
          <div className="fg-goal" key={n as string}><img src={AV(k as string)} alt="" width={24} height={24} /><span>{n}</span><u><i style={{ width: `${w}%` }} /></u></div>
        ))}
      </div>
      <div className="fg-grid">
        <div className="bx" data-p="1">
          <small>Closed deals</small>
          <div className="fg-bars">{[34, 52, 44, 66, 58, 82].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        </div>
        <div className="bx" data-p="2">
          <small>Forecast</small>
          <svg viewBox="0 0 120 56" className="fg-line" aria-hidden="true"><path d="M4 46C22 44 30 36 46 30S72 22 84 16" fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" /><path d="M84 16C94 12 104 9 116 6" fill="none" stroke="#1D4ED8" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" /></svg>
        </div>
      </div>
    </Shell>
  );
}

function ReportFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Reports <mark>from your records</mark></>}>
      <div className="bx" data-p="0">
        <small>Saved reports</small>
        <ul className="fg-rep">
          <li><b>Deal list</b><em>deals</em><em>sales</em></li>
          <li><b>Deal with stage</b><em>deals</em><em>pipeline</em></li>
          <li><b>Account list</b><em>accounts</em></li>
        </ul>
      </div>
      <div className="fg-grid">
        <div className="bx" data-p="1">
          <small>Open deals</small>
          <svg viewBox="0 0 120 40" className="fg-line short" aria-hidden="true"><path d="M3 32C20 30 30 22 48 20S80 14 117 6" fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" /></svg>
          <span className="fg-link">Source report: Deal list</span>
        </div>
        <div className="bx" data-p="2">
          <small>Pipeline by stage</small>
          <div className="fg-meter"><span>Qualified</span><i style={{ width: "82%" }} /></div>
          <div className="fg-meter"><span>Proposal</span><i style={{ width: "54%" }} /></div>
          <div className="fg-meter"><span>Won</span><i style={{ width: "28%" }} /></div>
        </div>
      </div>
    </Shell>
  );
}

function AutomationFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Rule <mark>when a deal reaches Proposal</mark></>}>
      <div className="bx" data-p="0">
        <div className="fg-node"><span className="fg-ic a"><Ico d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></span><div><small>When</small><b>A deal reaches Proposal</b></div></div>
        <i className="fg-link-v" />
        <div className="fg-node"><span className="fg-ic"><Ico d="M5 12.5l4.5 4.5L19 7.5" /></span><div><small>Then</small><b>Create a follow up task</b></div></div>
      </div>
      <div className="bx" data-p="1">
        <small>Deal fields</small>
        <div className="fg-chips"><em>Amount</em><em>Closing date</em><em>Next step</em><em className="add">Add field</em></div>
      </div>
      <div className="bx fg-between" data-p="2">
        <div className="fg-row"><span className="fg-ic"><Ico d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4" /></span><div><b>Approval needed</b><span>A large discount waits for a manager</span></div></div>
        <img className="fg-av s" src={AV("glasses")} alt="" width={28} height={28} />
      </div>
    </Shell>
  );
}

function AccessFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Roles <mark>and what each can do</mark></>}>
      <div className="bx" data-p="0">
        <small>Role hierarchy</small>
        <ul className="fg-tree">
          <li><img src={AV("orange")} alt="" width={26} height={26} />Administrator</li>
          <li className="l1"><img src={AV("glasses")} alt="" width={26} height={26} />Operations manager</li>
          <li className="l2"><img src={AV("man")} alt="" width={26} height={26} />Sales executive</li>
        </ul>
      </div>
      <div className="bx" data-p="1">
        <small>Operations manager can</small>
        <div className="fg-chips"><em className="ok">View</em><em className="ok">Edit</em><em>Delete</em><em className="ok">Export</em></div>
      </div>
      <div className="bx fg-between" data-p="2">
        <span className="fg-avs lg"><img src={AV("curly")} alt="" width={30} height={30} /><img src={AV("man")} alt="" width={30} height={30} /><img src={AV("teal")} alt="" width={30} height={30} /><img src={AV("blond")} alt="" width={30} height={30} /></span>
        <em className="fg-btn">Add user</em>
      </div>
    </Shell>
  );
}

function ViewsFragment({ step }: { step: number }) {
  return (
    <Shell step={step} label={<>Find it, <mark>wherever you are</mark></>}>
      <div className="bx" data-p="0">
        <div className="fg-search"><Ico d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3" size={15} /><span>Halo</span><em>Ctrl K</em></div>
        <ul className="fg-res"><li><b>Halo Health</b><span>Account</span></li><li><b>Halo Health renewal</b><span>Deal</span></li></ul>
      </div>
      <div className="fg-grid">
        <div className="bx" data-p="1">
          <small>Theme</small>
          <div className="fg-theme"><span className="lt">Light</span><span className="dk">Dark</span></div>
        </div>
        <div className="bx" data-p="2">
          <small>On your phone</small>
          <div className="fg-phone"><div><p><i />Halo Health</p><p><i />Northgate</p><p><i />Brightwell</p></div></div>
        </div>
      </div>
    </Shell>
  );
}

const FRAG: Partial<Record<string, (p: { step: number }) => ReactNode>> = {
  leads: (p) => <LeadFragment step={p.step} />,
  contacts: (p) => <ContactFragment step={p.step} />,
  pipeline: (p) => <PipelineFragment step={p.step} />,
  tasks: (p) => <TasksFragment step={p.step} />,
  campaigns: (p) => <CampaignFragment step={p.step} />,
  team: (p) => <TeamFragment step={p.step} />,
  reports: (p) => <ReportFragment step={p.step} />,
  automation: (p) => <AutomationFragment step={p.step} />,
  access: (p) => <AccessFragment step={p.step} />,
  views: (p) => <ViewsFragment step={p.step} />,
};

/* the three headline features as plain tags; the active one matches the part of the visual that is ringed */
function Tags({ a, step, onStep }: { a: Area; step: number; onStep: (n: number) => void }) {
  return (
    <div className="fc-tags" role="group" aria-label={`${a.name} features`}>
      {a.top.map((f, n) => (
        <button key={f.n} type="button" className={step === n ? "on" : ""} aria-pressed={step === n} onClick={() => onStep(n)}>{f.n}</button>
      ))}
    </div>
  );
}

function Card({ a, step, onStep }: { a: Area; step: number; onStep: (n: number) => void }) {
  const V = FRAG[a.id];
  return (
    <>
      <div className="fc" key={a.id}>
        <div className="fc-txt">
          <h3 className="fc-h">{a.head}</h3>
          <p className="fc-lead">{a.lead}</p>
          <Tags a={a} step={step} onStep={onStep} />
        </div>
        <div className="fc-vis">{V && <V step={step} />}</div>
      </div>
      {a.also.length > 0 && (
        <p className="ex-also"><span>Also in this area</span>{a.also.map((x) => <em key={x}>{x}</em>)}</p>
      )}
    </>
  );
}

/* short names for the tab bar */
const TAB: Record<string, string> = {
  leads: "Leads", contacts: "Contacts", pipeline: "Pipeline", tasks: "Tasks", campaigns: "Campaigns",
  team: "Team", reports: "Reports", automation: "Automation", access: "Access", views: "Views",
};

function Explorer() {
  const mobile = useMedia("(max-width:899px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [id, setId] = useState(AREAS[0].id);
  const [step, setStep] = useState(0);
  const [tour, setTour] = useState(true);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* a tab that is off screen on a narrow bar slides into view, sideways only, so the page never jumps */
  useEffect(() => {
    const b = bar.current;
    const t = tabs.current[id];
    if (!b || !t) return;
    b.scrollTo({ left: t.offsetLeft - (b.clientWidth - t.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
  }, [id, reduced]);

  const running = !mobile && !reduced && inView && !held;
  const idx = AREAS.findIndex((a) => a.id === id);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (step < 2) setStep(step + 1);
      else if (tour) { setId(AREAS[(idx + 1) % AREAS.length].id); setStep(0); }
      else setStep(0);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, step, tour, idx]);

  const go = useCallback((nid: string) => { setId(nid); setStep(0); setTour(false); }, []);
  const pick = useCallback((n: number) => { setStep(n); setTour(false); }, []);

  const key = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = AREAS[(idx + (e.key === "ArrowRight" ? 1 : AREAS.length - 1)) % AREAS.length].id;
    go(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="ex" ref={root}>
      <div className="ex-tabs" role="tablist" aria-label="CRM features by area" ref={bar} onKeyDown={key}>
        {AREAS.map((a) => (
          <button key={a.id} id={`tab-${a.id}`} ref={(el) => { tabs.current[a.id] = el; }} type="button" role="tab" aria-selected={a.id === id} aria-controls="ex-panel" tabIndex={a.id === id ? 0 : -1} className={a.id === id ? "on" : ""} onClick={() => go(a.id)}>{TAB[a.id]}</button>
        ))}
      </div>
      <div id="ex-panel" role="tabpanel" aria-labelledby={`tab-${id}`} onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}>
        <Card a={AREAS[idx]} step={step} onStep={pick} />
      </div>
    </div>
  );
}

/* The hero: a person using the phone, with two small cards that tell the three moments of the headline (a lead arrives, a deal moves,
   a follow up is set). The cards are drawn for this page, they are not a product screen. */
const BEATS = [
  { k: "New lead", t: "Halo Health added from a web form", o: "Owner", ot: "Assigned to Priya Nair", d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6" },
  { k: "Deal moved", t: "Northgate moved to Proposal", o: "Quote", ot: "Ready for approval", d: "M3 17l6-6 4 4 8-8M14 7h7v7" },
  { k: "Follow up", t: "Call Halo Health on Friday", o: "Reminder", ot: "Set for 9:00", d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" },
] as const;

function FeaturesHero() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [b, setB] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setB((b + 1) % BEATS.length), 3400);
    return () => window.clearTimeout(t);
  }, [b, reduced]);
  const cur = BEATS[b];
  return (
    <section className="fh" aria-labelledby="fh-h1">
      <style>{css}</style>
      <div className="fh-in">
        <div className="fh-copy">
          <span className="fh-eyebrow">EVOQ CRM features</span>
          <h1 id="fh-h1" className="fh-h1">Capture leads, move deals and follow up on time.</h1>
          <p>The areas of the CRM in the order a deal moves, from the first lead to the closed sale, and the people and settings around it.</p>
        </div>
        <div className="fh-vis">
          <div className="fh-photo"><img src="/crm-v1/hero-user.jpg" alt="A woman at an outdoor desk with a laptop, smiling and holding her phone" /></div>
          <span className="fh-dot" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 9h18M8 2v4M16 2v4" /></svg>
          </span>
          <div className="fh-card c1" key={`a${b}`} aria-live="polite">
            <div><b>{cur.k}</b><span>{cur.t}</span></div>
            <i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={cur.d} /></svg></i>
          </div>
          <div className="fh-card c2" key={`b${b}`} aria-hidden="true">
            <img src="/crm-v1/priya.webp" alt="" width={36} height={36} />
            <div><b>{cur.o}</b><span>{cur.ot}</span></div>
          </div>
          <div className="fh-dots" role="group" aria-label="Moments">
            {BEATS.map((m, n) => <button key={m.k} type="button" className={n === b ? "on" : ""} aria-label={m.k} aria-pressed={n === b} onClick={() => setB(n)} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CrmV1FeaturesPage() {
  return (
    <CrmV1Shell active="features" hero={<FeaturesHero />}>
      <section id="features" className="ex-sec" aria-label="Features by area">
        <style>{css}</style>
        <div className="ex-in"><Explorer /></div>
      </section>
      <CrmV1Close />
    </CrmV1Shell>
  );
}

const css = `
  .fh{padding:8px 0 28px}
  .fh-in{max-width:1300px;margin:0 auto;padding:0 20px;display:grid;gap:28px;align-items:center}
  .fh-eyebrow{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${BLUE};margin-bottom:14px}
  .fh .fh-h1{font-size:var(--h1-size);line-height:1.08;letter-spacing:-.03em;font-weight:700;color:${INK};text-wrap:balance;max-width:16ch}
  .fh-copy p{margin:20px 0 0;font-size:18px;line-height:1.6;color:${BODY};max-width:46ch}
  .fh-vis{position:relative;height:400px;margin-top:8px}
  .fh-vis::before{content:"";position:absolute;right:-10%;top:-12%;width:80%;height:130%;border-radius:50%;background:radial-gradient(closest-side,rgba(29,78,216,.16),rgba(29,78,216,0));pointer-events:none}
  .fh-photo{position:absolute;right:0;top:0;width:76%;height:calc(100% - 28px);border-radius:28px;overflow:hidden;background:#BCD3FB;box-shadow:0 36px 70px -34px rgba(15,27,61,.55)}
  .fh-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 22%;animation:fhZoom 18s ease-in-out infinite alternate}
  .fh-dot{position:absolute;left:14%;top:12%;width:50px;height:50px;border-radius:50%;background:${INK};color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 26px -12px rgba(15,27,61,.6);animation:fhBob 5s ease-in-out infinite alternate}
  .fh-card{position:absolute;display:flex;align-items:center;gap:12px;background:#fff;border-radius:18px;padding:12px 14px 12px 16px;box-shadow:0 22px 40px -22px rgba(15,27,61,.5),0 0 0 1px ${LINE};animation:fhSwap .55s ease both}
  .fh-card div{min-width:0;display:grid;gap:2px}
  .fh-card b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;line-height:1.25;color:${INK}}
  .fh-card span{font-size:13px;line-height:1.35;color:${BODY};text-wrap:balance}
  .fh-card i{flex:none;width:36px;height:36px;border-radius:12px;background:${TINT};color:${BLUE};display:flex;align-items:center;justify-content:center}
  .fh-card img{flex:none;width:36px;height:36px;border-radius:50%;object-fit:cover}
  .fh-card.c1{left:0;bottom:92px;width:min(330px,68%)}
  .fh-card.c2{left:6%;bottom:22px;width:min(270px,58%);animation-delay:.12s}
  .fh-dots{position:absolute;right:0;bottom:0;width:76%;display:flex;justify-content:center;gap:8px}
  .fh-dots button{all:unset;display:block;box-sizing:border-box;width:8px;height:8px;border-radius:999px;background:#C5CEE3;cursor:pointer;transition:width .3s ease,background .3s ease}
  .fh-dots button.on{width:24px;background:${INK}}
  .fh-dots button:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}
  @keyframes fhZoom{from{transform:scale(1)}to{transform:scale(1.06)}}
  @keyframes fhBob{from{transform:translateY(-4px)}to{transform:translateY(4px)}}
  @keyframes fhSwap{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.fh-photo img,.fh-dot,.fh-card{animation:none}}
  @media (min-width:640px){.fh-in{padding:0 24px}.fh{padding:12px 0 44px}.fh-vis{height:460px}}
  @media (min-width:1024px){.fh-in{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}.fh-vis{height:500px;margin-top:0}.fh-photo{width:72%}.fh-dots{width:72%}}
  @media (max-width:420px){.fh-card.c1{width:86%;bottom:84px}.fh-card.c2{width:72%}.fh-photo{width:84%}.fh-dots{width:84%}.fh-dot{left:8%}}

  .ex-sec{background:#F4F6FB;padding:48px 0 64px;scroll-margin-top:16px}
  .ex-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .ex{display:grid;gap:22px}
  .ex-tabs{display:flex;gap:6px;padding:8px;border-radius:999px;background:#E2E8F4;overflow-x:auto;scrollbar-width:none}
  .ex-tabs::-webkit-scrollbar{display:none}
  .ex-tabs button{all:unset;flex:none;box-sizing:border-box;cursor:pointer;padding:12px 20px;border-radius:999px;text-align:center;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;line-height:1.2;color:${BODY};white-space:nowrap;transition:background .25s ease,color .25s ease}
  .ex-tabs button:hover{color:${INK}}
  .ex-tabs button.on{background:#BCD3FB;color:${INK}}
  .ex-tabs button:focus-visible{outline:3px solid ${BLUE};outline-offset:-3px}
  @media (min-width:1024px){.ex-tabs button{flex:1 1 auto}}


  .ex .ex-also{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:28px 0 0;padding:0 8px;font-size:13px;color:${MUTED}}
  .ex-also span{margin-right:4px}
  .ex-also em{font-style:normal;padding:4px 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:13px;font-weight:600;color:${INK}}

  .fc{display:grid;gap:0;padding:12px;border-radius:28px;background:#E2E8F4}
  .fc-vis{position:relative;display:flex;align-items:center;justify-content:center;min-height:460px;padding:36px 24px;border-radius:20px;background:#F7F9FD;box-shadow:inset 0 0 0 1px rgba(15,27,61,.05)}
  .fc-txt{padding:26px 20px 16px}
  .fc-txt .fc-h{font-size:clamp(24px,2.3vw,34px);line-height:1.18;letter-spacing:-.01em;font-weight:600;color:${INK};text-wrap:balance;max-width:15em;margin:0}
  .fc-txt .fc-lead{margin:16px 0 0;max-width:34em;font-size:16px;line-height:1.6;color:${BODY}}
  .fg{width:100%;max-width:440px;display:grid;gap:18px;justify-items:center;font-family:var(--font-sans),system-ui,sans-serif}
  .fg-label{margin:0;font-size:14.5px;line-height:1.3;color:${INK};text-align:center}
  .fg-label mark{background:#CFE0FD;color:${INK};padding:2px 7px;border-radius:6px}
  .fg-card{position:relative;display:grid;gap:10px;padding:18px;border-radius:20px;background:#fff;box-shadow:0 18px 40px -22px rgba(15,27,61,.4),0 0 0 1px rgba(15,27,61,.06)}
  .fg-row{display:flex;align-items:center;gap:12px;min-width:0}
  .fg-row b,.fg-node b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;line-height:1.25;color:${INK}}
  .fg-row>div>span,.fg-node small{display:block;margin-top:2px;font-size:12.5px;line-height:1.35;color:${MUTED}}
  .fg-name{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;line-height:1.25;color:${INK}}
  .fg-sub{display:block;margin-top:2px;font-size:13px;color:${MUTED}}
  .fg-av{flex:none;width:44px;height:44px;border-radius:50%;object-fit:cover}
  .fg-av.s{width:28px;height:28px}
  .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .fg-box3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:6px;margin:-6px;border-radius:16px;transition:box-shadow .3s ease,background .3s ease}
  .fg-box3 .bx{padding:11px 12px}
  .bx{display:grid;gap:7px;padding:12px 14px;border-radius:12px;background:#F4F7FC;min-width:0;transition:box-shadow .3s ease,background .3s ease}
  .bx small{font-size:11.5px;line-height:1;color:${MUTED}}
  .bx b{font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;line-height:1.25;color:${INK};white-space:nowrap}
  .bx>span{font-size:12.5px;line-height:1.3;color:${BODY}}
  .fg-between{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .fg .fg-ic{flex:none;width:34px;height:34px;border-radius:10px;background:${TINT};color:${BLUE};display:flex;align-items:center;justify-content:center}
  .fg-ic.a{background:#FFF1D1;color:#B7791F}
  .fg-btn,.fg-chip{flex:none;font-style:normal;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;line-height:1}
  .fg-btn{background:${INK};color:#fff}
  .fg-chip{background:#DDF6EE;color:#0B6B53}
  .fg-tl,.fg-list,.fg-rep,.fg-res,.fg-tree{list-style:none;margin:0;padding:0;display:grid;gap:8px}
  .fg-tl li{display:flex;align-items:center;gap:9px;font-size:13px;line-height:1.3;color:${INK}}
  .fg-tl i{flex:none;width:8px;height:8px;border-radius:50%;background:${BLUE}}
  .fg-list li{display:flex;align-items:center;gap:10px;font-size:13.5px;line-height:1.3;color:${INK}}
  .fg-list i{flex:none;width:18px;height:18px;border-radius:50%;box-shadow:inset 0 0 0 2px #C3CCE0;display:flex;align-items:center;justify-content:center;color:#fff}
  .fg-list li.done{color:${MUTED};text-decoration:line-through}
  .fg-list li.done i{background:#14A37F;box-shadow:none}
  .fg-avs{display:flex;flex:none}
  .fg-avs img{width:26px;height:26px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #F4F7FC;margin-left:-8px}
  .fg-avs img:first-child{margin-left:0}
  .fg-avs.lg img{width:30px;height:30px}
  .fg-meter{display:grid;grid-template-columns:62px 1fr;align-items:center;gap:8px;font-size:12px;color:${BODY}}
  .fg-meter i{display:block;height:6px;border-radius:3px;background:${BLUE};opacity:.85}
  .fg-goal{display:grid;grid-template-columns:24px 46px 1fr;align-items:center;gap:9px;font-size:12.5px;color:${INK}}
  .fg-goal img{width:24px;height:24px;border-radius:50%;object-fit:cover}
  .fg-goal u{display:block;height:6px;border-radius:3px;background:#DCE4F3;overflow:hidden}
  .fg-goal u i{display:block;height:100%;border-radius:3px;background:${BLUE}}
  .fg-bars{display:flex;align-items:flex-end;gap:5px;height:52px}
  .fg-bars i{flex:1;border-radius:3px 3px 0 0;background:#9DB9F2}
  .fg-bars i:last-child{background:${BLUE}}
  .fg-line{display:block;width:100%;height:auto}
  .fg-line.short{max-height:34px}
  .fg-link{font-size:11.5px;line-height:1.2;color:${BLUE};font-weight:600}
  .fg-rep li{display:flex;align-items:center;gap:6px;font-size:13px}
  .fg-rep b{margin-right:auto;font-size:13.5px}
  .fg-rep em,.fg-chips em{font-style:normal;padding:4px 10px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px #D2DAEA;font-size:11.5px;font-weight:600;line-height:1;color:${BODY}}
  .fg-chips{display:flex;flex-wrap:wrap;gap:7px}
  .fg-chips em{padding:6px 12px;font-size:12.5px}
  .fg-chips em.ok{background:#DDF6EE;color:#0B6B53;box-shadow:none}
  .fg-chips em.add{color:${BLUE};box-shadow:inset 0 0 0 1px #B7CBF3}
  .fg-seg{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
  .fg-seg i{display:block;height:6px;border-radius:3px;background:#DCE4F3}
  .fg-seg i.d{background:#9DB9F2}
  .fg-seg i.n{background:${BLUE}}
  .fg-ends{display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:${MUTED}}
  .fg-ends b{font-size:12.5px}
  .fg-node{display:flex;align-items:center;gap:12px}
  .fg-node small{margin:0 0 2px}
  .fg-link-v{display:block;width:2px;height:12px;margin:2px 0 2px 16px;background:#C3CCE0}
  .fg-tree li{display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:500;color:${INK}}
  .fg-tree li img{width:26px;height:26px;border-radius:50%;object-fit:cover}
  .fg-tree li.l1{margin-left:20px}
  .fg-tree li.l2{margin-left:40px}
  .fg-search{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px #D2DAEA;color:${MUTED};font-size:13.5px}
  .fg-search span{flex:1;color:${INK}}
  .fg-search em{font-style:normal;padding:3px 8px;border-radius:6px;background:#EEF2FA;font-size:11px;font-weight:600;color:${BODY}}
  .fg-res li{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px;color:${INK}}
  .fg-res b{font-size:13px}
  .fg-res span{font-size:11.5px;color:${MUTED}}
  .fg-theme{display:grid;grid-template-columns:1fr 1fr;gap:6px;align-self:start}
  .fg-theme span{display:block;padding:22px 0;border-radius:10px;text-align:center;font-size:12px;font-weight:600}
  .fg-theme .lt{background:#fff;color:${INK};box-shadow:inset 0 0 0 1px #D2DAEA}
  .fg-theme .dk{background:${INK};color:#fff}
  .fg-phone{width:104px;height:132px;margin:4px auto 0;padding:6px;border-radius:18px;background:${INK}}
  .fg-phone>div{height:100%;border-radius:13px;background:#fff;padding:12px 9px;display:grid;align-content:start;gap:9px;overflow:hidden}
  .fg-phone p{display:flex;align-items:center;gap:6px;margin:0;font-size:10px;font-weight:600;line-height:1.2;color:${INK};white-space:nowrap}
  .fg-phone i{flex:none;width:12px;height:12px;border-radius:50%;background:#BCD3FB}
  .fg[data-step="0"] [data-p="0"],.fg[data-step="1"] [data-p="1"],.fg[data-step="2"] [data-p="2"]{box-shadow:0 0 0 2px ${BLUE};background:#fff}
  .fc-txt{display:flex;flex-direction:column;justify-content:center}
  .fc-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
  .fc-tags button{all:unset;box-sizing:border-box;cursor:pointer;padding:9px 13px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px #CBD4E6;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;line-height:1.2;color:${INK};transition:background .25s ease,color .25s ease,box-shadow .25s ease}
  .fc-tags button:hover{box-shadow:inset 0 0 0 1.5px ${BLUE}}
  .fc-tags button.on{background:${BLUE};color:#fff;box-shadow:none}
  .fc-tags button:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}
  .lf{width:100%;max-width:340px;display:grid;gap:22px;justify-items:center;font-family:var(--font-sans),system-ui,sans-serif}
  .lf-label{margin:0;font-size:14.5px;line-height:1.3;color:${INK};text-align:center}
  .lf-label mark{background:#CFE0FD;color:${INK};padding:2px 7px;border-radius:6px}
  .lf-stack{position:relative;width:100%}
  .lf-ghost{position:absolute;display:block;left:0;right:0;border-radius:20px;background:#fff;box-shadow:0 0 0 1px rgba(15,27,61,.05)}
  .lf-ghost.g1{top:-9px;left:16px;right:16px;bottom:9px;opacity:.75}
  .lf-ghost.g2{top:-17px;left:32px;right:32px;bottom:17px;opacity:.5}
  .lf-card{position:relative;display:grid;justify-items:center;padding:26px 22px 22px;border-radius:20px;background:#fff;box-shadow:0 18px 40px -22px rgba(15,27,61,.4),0 0 0 1px rgba(15,27,61,.06);text-align:center}
  .lf-av{width:64px;height:64px;border-radius:50%;object-fit:cover}
  .lf-name{margin-top:12px;font-family:var(--font-display),system-ui,sans-serif;font-size:18px;font-weight:600;line-height:1.25;color:${INK}}
  .lf-role{margin-top:3px;font-size:13px;line-height:1.4;color:${MUTED}}
  .lf-facts{width:100%;margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:left}
  .lf-facts>div{display:grid;gap:5px;padding:12px;border-radius:12px;background:#F4F7FC;transition:box-shadow .3s ease,background .3s ease}
  .lf-facts .wide{grid-column:1 / -1}
  .lf-facts small{font-size:11.5px;line-height:1;color:${MUTED}}
  .lf-facts b{display:flex;align-items:center;gap:7px;white-space:nowrap;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;line-height:1.2;color:${INK}}
  .lf-facts b img{width:20px;height:20px;border-radius:50%;object-fit:cover}
  .lf-bar{display:block;height:6px;margin-top:3px;border-radius:3px;background:#DCE4F3;overflow:hidden}
  .lf-bar i{display:block;height:100%;min-width:6%;border-radius:3px;background:${BLUE};transition:width 1s cubic-bezier(.45,.05,.2,1)}
  .lf-ends{display:flex;justify-content:space-between;margin-top:2px}
  .lf-ends em{font-style:normal;font-size:11.5px;line-height:1;color:${MUTED};transition:color .3s ease}
  .lf-ends em.on{color:${INK};font-weight:600}
  .lf[data-step="0"] [data-p="0"],.lf[data-step="1"] [data-p="1"],.lf[data-step="2"] [data-p="2"]{background:#fff;box-shadow:0 0 0 2px ${BLUE}}
  @media (min-width:900px){.fc{grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr)}.fc-txt{padding:30px 30px 18px 34px}}


  @media (min-width:640px){.ex-in{padding:0 24px}.ex-sec{padding:56px 0 80px}}
  @media (min-width:1024px){.ex-sec{padding:72px 0 96px}}
`;
