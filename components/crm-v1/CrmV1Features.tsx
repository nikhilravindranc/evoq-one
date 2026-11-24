"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { BLUE, BODY, INK, LINE, MUTED, TINT } from "./palette";

/* Features: a row of cards that slides sideways (docs/crm-v1-new-content.md, Section D). Each card is a pill, a heading, the top features
   and a picture: a real screen of the app (sample data) or a photograph, with one small card drawn over it. */

type Card = { key: string; name: string; line: string; items: string[]; band: string; icon: ReactNode; vis: ReactNode };

const I = (d: ReactNode) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const Screen = ({ src, x = 9, y = 15, w = 108 }: { src: string; x?: number; y?: number; w?: number }) => (
  <div className="hv-screen" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%` }}><img src={src} alt="" loading="lazy" decoding="async" /></div>
);
const Photo = ({ src, alt, pos = "50% 40%" }: { src: string; alt: string; pos?: string }) => (
  <img className="hv-photo" src={src} alt={alt} loading="lazy" decoding="async" style={{ objectPosition: pos }} />
);
const Note = ({ tone = "white", style, t, d, children }: { tone?: "white" | "dark"; style: CSSProperties; t: string; d?: string; children?: ReactNode }) => (
  <div className={`hv-card ${tone}`} style={style}><b>{t}</b>{d && <span>{d}</span>}{children}</div>
);

const CARDS: Card[] = [
  {
    key: "contacts", name: "Contacts & Accounts", line: "Walk into every conversation with the history.", band: "#BCD3FB",
    items: ["Profiles for people and companies", "Activity history on a record", "Notes and conversations in the same place", "An owner on a record", "Import and export of existing data"],
    icon: I(<><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0-3-3.85" /></>),
    vis: <><Screen src="/crm-v1/screens/s-contact.webp" x={-21} y={13} w={130} /><Note style={{ left: "5%", bottom: "7%", width: "50%" }} t="Timeline" d="Calls, emails and notes, in order" /></>,
  },
  {
    key: "pipeline", name: "Leads & Pipeline", line: "Move leads to deals without retyping.", band: "#A9E6CE",
    items: ["Lead statuses from New to Qualified", "List, grid and Kanban views", "Deal stages with probability", "Automatic lead assignment", "Filters, columns and sorting on a list"],
    icon: I(<><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></>),
    vis: <><Screen src="/crm-v1/screens/s-deals.webp" x={-21} y={13} w={130} /><Note tone="dark" style={{ left: "5%", bottom: "7%", width: "52%" }} t="Stage moved" d="Northgate expansion to Proposal" /></>,
  },
  {
    key: "quotes", name: "Quotes & Revenue", line: "Get from proposal to payment on the same record.", band: "#FFD2C2",
    items: ["Generate quotes from a deal", "Approval steps before a quote goes out", "Payment tracking against a deal", "Lead scoring and win probability", "Pairs with ConfigX when quotes need product configuration"],
    icon: I(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /><path d="M9 13h6" /><path d="M13 17h2" /></>),
    vis: <><Photo src="/crm-v1/p-quotes.webp" alt="A person working through invoices at a desk" pos="50% 50%" /><Note style={{ left: "5%", top: "9%", width: "46%" }} t="Quote ready" d="Approved by the manager" /><Note style={{ right: "5%", bottom: "9%", width: "34%" }} t="Paid" d="Against the deal" /></>,
  },
  {
    key: "reports", name: "Reports & Forecasting", line: "Report from the records the team already works in.", band: "#CFCBFA",
    items: ["Dashboards where a card links to its source report", "Saved reports with tags", "Revenue trend and pipeline by stage", "Revenue forecast", "Team performance and conversion trends"],
    icon: I(<><rect x="3" y="12" width="6" height="8" rx="1" /><rect x="9" y="8" width="6" height="12" rx="1" /><rect x="15" y="4" width="6" height="16" rx="1" /></>),
    vis: <><Screen src="/crm-v1/screens/s-reports.webp" x={-21} y={13} w={130} /><Note style={{ right: "5%", bottom: "7%", width: "46%" }} t="Source report" d="A figure can be traced back" /></>,
  },
  {
    key: "tasks", name: "Tasks & Meetings", line: "Give every follow up an owner and a date.", band: "#FFE49E",
    items: ["Tasks with type, priority and due date", "Tasks linked to a contact or deal", "Meetings and reminders", "Calendar sync", "A daily view of tasks due, deals to follow up and meetings"],
    icon: I(<><path d="M11.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" /><path d="M16 3v4M8 3v4M4 11h16" /><path d="M15 19l2 2 4-4" /></>),
    vis: <><Photo src="/crm-v1/p-tasks.webp" alt="A colleague on a call at her desk" pos="50% 35%" /><Note style={{ right: "5%", top: "10%", width: "46%" }} t="Due today"><ul><li>Send the revised quote</li><li>Call Halo Health</li><li>Review the contract</li></ul></Note></>,
  },
  {
    key: "campaigns", name: "Campaigns & Outreach", line: "Send to a segment, then see who responded.", band: "#BFE7F1",
    items: ["Segments by behavior, history or engagement", "Email and SMS campaigns", "Open rate, conversion and engagement tracking", "Results across campaigns in a single dashboard", "Works with EVOQ Campaigns"],
    icon: I(<><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5" /><path d="M12 8l4.5-3.8a.9.9 0 0 1 1.5.7v12.2a.9.9 0 0 1-1.5.7L12 14H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h8" /></>),
    vis: <><Photo src="/crm-v1/photos/outreach.webp" alt="A customer support colleague wearing a headset and smiling" pos="50% 30%" /><Note style={{ left: "5%", top: "10%", width: "50%" }} t="Segment" d="Renewals due this month" /><Note tone="dark" style={{ left: "5%", bottom: "9%", width: "58%" }} t="Opens and replies" d="Tracked on the campaign" /></>,
  },
  {
    key: "automation", name: "Automation & Customization", line: "Set stages, fields and rules the way your team sells.", band: "#F8C9DD",
    items: ["Custom modules and fields", "Workflow automation for repeated steps", "Roles and permissions", "Customizable dashboards and themes", "Data backup"],
    icon: I(<><circle cx="6" cy="10" r="2" /><path d="M6 4v4M6 12v8" /><circle cx="12" cy="16" r="2" /><path d="M12 4v10M12 18v2" /><circle cx="18" cy="7" r="2" /><path d="M18 4v1M18 9v11" /></>),
    vis: <><Screen src="/crm-v1/screens/s-modules.webp" x={-20} y={14} w={130} /><Note tone="dark" style={{ left: "5%", bottom: "7%", width: "64%" }} t="Rule"><pre>{"When  a deal reaches Proposal\nThen  create a follow up task"}</pre></Note></>,
  },
  {
    key: "mobile", name: "Mobile", line: "Take deals, leads and tasks with you.", band: "#C9D6F4",
    items: ["Open deals", "Update leads", "Manage tasks", "Send email", "Keep working offline"],
    icon: I(<><path d="M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" /><path d="M11 4h2M12 17v.01" /></>),
    vis: <><Photo src="/crm-v1/p-mobile.webp" alt="A hand using a phone beside a laptop" pos="55% 50%" /><Note style={{ left: "5%", bottom: "9%", width: "42%" }} t="Deal updated" d="From the phone" /><Note tone="dark" style={{ right: "5%", top: "10%", width: "26%" }} t="Offline" /></>,
  },
];

const Tick = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export function CrmV1Features() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const t = track.current;
    if (!t) return;
    setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    const t = track.current;
    if (!t) return;
    t.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => { t.removeEventListener("scroll", measure); window.removeEventListener("resize", measure); };
  }, [measure]);

  const slide = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector<HTMLElement>(".fx-card");
    const step = (card?.offsetWidth ?? 480) + 20;
    t.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section id="features" className="fx-sec" aria-labelledby="fx-h2">
      <style>{css}</style>
      <div className="fx-in">
        <div className="fx-head">
          <div>
            <h2 id="fx-h2" className="fx-h2"><span className="l">The CRM behind</span> <span className="b">each request.</span></h2>
            <p>The areas teams use most, and the features that matter in them.</p>
          </div>
          <div className="fx-nav">
            <button type="button" aria-label="Previous cards" disabled={edge.start} onClick={() => slide(-1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
            <button type="button" aria-label="Next cards" disabled={edge.end} onClick={() => slide(1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </div>
        </div>
      </div>

      <div className="fx-track" ref={track} tabIndex={0} role="region" aria-label="CRM features, slide sideways">
        {CARDS.map((c, n) => (
          <article key={c.key} className="fx-card" aria-labelledby={`fx-c-${c.key}`}>
            <div className="hv" style={{ "--band": c.band } as CSSProperties}>{c.vis}</div>
            <div className="fx-body">
              <span className="fx-pill"><span className="fx-ico">{c.icon}</span>{c.name}<em>{String(n + 1).padStart(2, "0")}</em></span>
              <h3 id={`fx-c-${c.key}`} className="fx-h3">{c.line}</h3>
              <ul className="fx-list">
                {c.items.map((t) => <li key={t}><span className="fx-tick"><Tick /></span><span>{t}</span></li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="fx-in">
        <div className="fx-end">
          <Link href="/products/crm-v1/features" className="fx-cta">Explore all features<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
        </div>
      </div>
    </section>
  );
}

const css = `
  .fx-sec{background:#F4F6FB;padding:64px 0 72px;scroll-margin-top:16px}
  .fx-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .fx-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:30px}
  .fx-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0;text-wrap:balance}
  .fx-h2 .l{font-weight:400;color:#5C6785}
  .fx-head p{margin:16px 0 0;font-size:18px;line-height:1.6;color:${BODY}}
  .fx-nav{display:none;gap:10px;flex:none}
  .fx-nav button{all:unset;box-sizing:border-box;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#fff;color:${INK};box-shadow:inset 0 0 0 1.5px #C9D2E6;transition:background .2s ease,color .2s ease,box-shadow .2s ease}
  .fx-nav button:hover:not(:disabled){background:${INK};color:#fff;box-shadow:none}
  .fx-nav button:disabled{opacity:.4;cursor:default}
  .fx-nav button:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}

  .fx-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:6px 20px 34px;scroll-padding:0 20px}
  .fx-track::-webkit-scrollbar{display:none}
  .fx-track:focus-visible{outline:3px solid ${BLUE};outline-offset:-3px}
  .fx-card{flex:0 0 min(86vw,480px);scroll-snap-align:start;display:flex;flex-direction:column;border-radius:28px;background:#fff;border:1px solid ${LINE};overflow:hidden;box-shadow:0 24px 54px -34px rgba(15,27,61,.3)}

  .hv{position:relative;overflow:hidden;aspect-ratio:16/10;background:var(--band)}
  .hv-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  .hv-screen{position:absolute;border-radius:14px 0 0 0;overflow:hidden;background:#fff;box-shadow:0 18px 40px -18px rgba(15,27,61,.55),0 0 0 1px rgba(15,27,61,.08)}
  .hv-screen img{display:block;width:100%;height:auto}
  .hv-card{position:absolute;box-sizing:border-box;display:grid;gap:3px;padding:11px 14px;border-radius:14px;background:#fff;color:${INK};box-shadow:0 16px 32px -16px rgba(15,27,61,.5),0 0 0 1px ${LINE}}
  .hv-card.dark{background:${INK};color:#fff;box-shadow:0 16px 32px -16px rgba(15,27,61,.7)}
  .hv-card b{font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;font-weight:600;line-height:1.25}
  .hv-card span{font-size:12px;line-height:1.35;color:${BODY}}
  .hv-card.dark span{color:rgba(255,255,255,.78)}
  .hv-card ul{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:5px}
  .hv-card li{font-size:12px;line-height:1.3;color:${INK};padding-left:16px;position:relative}
  .hv-card li::before{content:"";position:absolute;left:0;top:2px;width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 2px ${BLUE}}
  .hv-card pre{margin:4px 0 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:1.7;color:#C9D6F4;white-space:pre;overflow:hidden}

  .fx-body{padding:26px 26px 30px}
  .fx-pill{display:inline-flex;align-items:center;gap:10px;max-width:100%;padding:6px 16px 6px 7px;border-radius:999px;background:${TINT};color:${BLUE};font-size:14px;font-weight:600;line-height:1.3}
  .fx-pill em{font-style:normal;margin-left:4px;padding-left:12px;border-left:1px solid rgba(29,78,216,.25);color:${MUTED};font-weight:600}
  .fx-ico{flex:none;width:30px;height:30px;border-radius:50%;background:#fff;color:${BLUE};display:flex;align-items:center;justify-content:center}
  .fx-card .fx-h3{font-size:var(--h3-size);line-height:1.2;letter-spacing:normal;font-weight:600;color:${INK};margin:22px 0 0;text-wrap:balance}
  .fx-list{list-style:none;margin:20px 0 0;padding:0;display:grid;gap:2px}
  .fx-list li{display:flex;gap:14px;align-items:flex-start;padding:8px 0;font-size:15.5px;line-height:1.45;color:${INK}}
  .fx-tick{flex:none;width:24px;height:24px;border-radius:50%;background:${TINT};color:${BLUE};display:flex;align-items:center;justify-content:center}

  .fx-end{display:flex;justify-content:center;margin-top:6px}
  .fx-cta{display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:0 30px;text-decoration:none;border-radius:999px;border:0;background:${INK};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;cursor:pointer;transition:background-color .18s ease}
  .fx-cta:hover{background:${BLUE}}
  .fx-cta:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}

  @media (min-width:640px){
    .fx-in{padding:0 24px}
    .fx-sec{padding:80px 0 88px}
    .fx-track{padding-left:24px;padding-right:24px;scroll-padding:0 24px}
  }
  @media (min-width:900px){.fx-nav{display:flex}}
  @media (min-width:1348px){
    .fx-track{padding-left:calc((100vw - 1300px) / 2);padding-right:calc((100vw - 1300px) / 2);scroll-padding:0 calc((100vw - 1300px) / 2)}
  }
  @media (min-width:1024px){.fx-sec{padding:96px 0 104px}}
`;
