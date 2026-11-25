"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { BLUE, BODY, INK, LINE, MUTED, TINT } from "./palette";

/* The journey of a deal in four moments (docs/crm-new-content.md, Section D): capture, follow up, quote and report. Each card is a pill,
   a heading, the features behind that moment and a picture: a real screen of the app (sample data) or a photograph, with one small
   card drawn over it. The full list of areas lives on the features page. */

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
    key: "capture", name: "Capture", line: "Bring a lead in and give it an owner.", band: "#A9E6CE",
    items: ["Leads from web forms, chats, imports and integrations", "Automatic lead assignment", "Lead statuses from New to Qualified", "List, grid and Kanban views", "Deal stages with probability"],
    icon: I(<><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></>),
    vis: <><Screen src="/crm/screens/s-leads.webp" x={-21} y={13} w={130} /><Note tone="dark" style={{ left: "5%", bottom: "7%", width: "50%" }} t="Lead assigned" d="To the owner by your rules" /></>,
  },
  {
    key: "followup", name: "Follow up", line: "Follow up with the history in front of you.", band: "#BCD3FB",
    items: ["Activity history on a record", "Notes and conversations on the record", "Tasks with type, priority and due date", "Meetings, reminders and calendar sync", "Email and SMS campaigns to a segment"],
    icon: I(<><path d="M11.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" /><path d="M16 3v4M8 3v4M4 11h16" /><path d="M15 19l2 2 4-4" /></>),
    vis: <><Screen src="/crm/screens/s-contact.webp" x={-21} y={13} w={130} /><Note style={{ right: "5%", top: "10%", width: "44%" }} t="Due today"><ul><li>Send the revised quote</li><li>Call Halo Health</li></ul></Note></>,
  },
  {
    key: "quote", name: "Quote", line: "Take a proposal to payment on the deal record.", band: "#FFD2C2",
    items: ["Generate quotes from a deal", "Approval steps before a quote goes out", "Payment tracking against a deal", "Lead scoring and win probability", "Pairs with ConfigX when quotes need product configuration"],
    icon: I(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /><path d="M9 13h6" /><path d="M13 17h2" /></>),
    vis: <><Photo src="/crm/p-quotes.webp" alt="A person working through invoices at a desk" pos="50% 50%" /><Note style={{ left: "5%", top: "9%", width: "46%" }} t="Quote ready" d="Approved by the manager" /><Note style={{ right: "5%", bottom: "9%", width: "34%" }} t="Paid" d="Against the deal" /></>,
  },
  {
    key: "report", name: "Report", line: "Report straight from your CRM records.", band: "#CFCBFA",
    items: ["Dashboards where a card links to its source report", "Saved reports with tags", "Revenue trend and pipeline by stage", "Revenue forecast", "Team performance and conversion trends"],
    icon: I(<><rect x="3" y="12" width="6" height="8" rx="1" /><rect x="9" y="8" width="6" height="12" rx="1" /><rect x="15" y="4" width="6" height="16" rx="1" /></>),
    vis: <><Screen src="/crm/screens/s-reports.webp" x={-21} y={13} w={130} /><Note style={{ right: "5%", bottom: "7%", width: "46%" }} t="Source report" d="A figure can be traced back" /></>,
  },
];

const Tick = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export function CrmFeatures() {
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
            <h2 id="fx-h2" className="fx-h2"><span className="l">From the first lead</span> <span className="b">to the closed deal.</span></h2>
            <p>Four moments in a deal, and the CRM features behind them.</p>
          </div>
          <div className="fx-nav">
            <button type="button" aria-label="Previous cards" disabled={edge.start} onClick={() => slide(-1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
            <button type="button" aria-label="Next cards" disabled={edge.end} onClick={() => slide(1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </div>
        </div>
      </div>

      <div className="fx-track" ref={track} tabIndex={0} role="region" aria-label="The moments of a deal, slide sideways">
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
          <p className="fx-more">Automation, roles and permissions, mobile access and more are in the full list.</p>
          <Link href="/products/crm/features" className="fx-cta">Explore all features<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
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

  .fx-end{display:flex;flex-direction:column;align-items:center;gap:18px;margin-top:6px}
  .fx-more{margin:0;font-size:16px;line-height:1.6;color:${BODY};text-align:center}
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
