"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { BLUE, BLUE_HOVER, BODY, INK, LINE, MUTED, TINT } from "./palette";

/* The journey of a deal in four moments (docs/crm-new-content.md, Section D): capture, follow up, quote and report. Four full-width slides
   in a sideways track, one after the other. Each slide has the pill, heading and features on the left, and on the right a picture: a real
   screen of the app (sample data) or a photograph, with small cards drawn over it. A step strip names the four moments and follows the
   scroll. The full list of areas lives on the features page. */

type Card = { key: string; name: string; line: string; items: string[]; band: string; icon: ReactNode; vis: ReactNode };

const I = (d: ReactNode) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const Note = ({ tone = "white", style, t, d, children }: { tone?: "white" | "dark"; style: CSSProperties; t: string; d?: string; children?: ReactNode }) => (
  <div className={`hv-card ${tone}`} style={style}><b>{t}</b>{d && <span>{d}</span>}{children}</div>
);

/* Clean pieces of the product, drawn for this page like the features page tabs: one card with a label above it and a soft stack behind it.
   Names and figures are sample data. */
const AV = (k: string) => `/crm/a-${k}.webp`;
const Vz = ({ label, children }: { label: ReactNode; children: ReactNode }) => (
  <div className="vz">
    <p className="vz-label">{label}</p>
    <div className="vz-stack"><div className="vz-card">{children}</div></div>
  </div>
);
const Row = ({ children }: { children: ReactNode }) => <div className="vz-row">{children}</div>;
const Chip = ({ t, tone = "blue" }: { t: string; tone?: "blue" | "mint" | "amber" | "ink" }) => <em className={`vz-chip ${tone}`}>{t}</em>;
const Person = ({ k, name, sub }: { k: string; name: string; sub: string }) => (
  <><img className="vz-av" src={AV(k)} alt="" width={32} height={32} loading="lazy" /><span className="vz-pt"><b>{name}</b><small>{sub}</small></span></>
);

const CARDS: Card[] = [
  {
    key: "capture", name: "Capture", line: "Bring a lead in and give it an owner.", band: "#A9E6CE",
    items: ["Leads from web forms, chats, imports and integrations", "Automatic lead assignment", "Lead statuses from New to Qualified", "List, grid and Kanban views", "Deal stages with probability"],
    icon: I(<><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></>),
    vis: (
      <>
        <Vz label={<>New leads, <mark>routed by your rules</mark></>}>
          <Row><Person k="asian" name="Sara Kim" sub="Brightwell Foods" /><Chip t="Web form" tone="mint" /><img className="vz-own" src={AV("curly")} alt="" width={24} height={24} loading="lazy" /></Row>
          <Row><Person k="man" name="Raj Mehta" sub="Matrix Corp" /><Chip t="Chat" tone="blue" /><img className="vz-own" src={AV("dark")} alt="" width={24} height={24} loading="lazy" /></Row>
          <Row><Person k="blond" name="James Wilson" sub="Northgate" /><Chip t="Import" tone="amber" /><img className="vz-own" src={AV("curly")} alt="" width={24} height={24} loading="lazy" /></Row>
          <div className="vz-foot"><small>Owner assigned automatically</small><Chip t="3 New" tone="ink" /></div>
        </Vz>
        <Note tone="dark" style={{ right: "6%", bottom: "8%", width: "38%" }} t="Lead assigned" d="To the owner by your rules" />
      </>
    ),
  },
  {
    key: "followup", name: "Follow up", line: "Follow up with the history in front of you.", band: "#BCD3FB",
    items: ["Activity history on a record", "Notes and conversations on the record", "Tasks with type, priority and due date", "Meetings, reminders and calendar sync", "Email and SMS campaigns to a segment"],
    icon: I(<><path d="M11.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" /><path d="M16 3v4M8 3v4M4 11h16" /><path d="M15 19l2 2 4-4" /></>),
    vis: (
      <>
        <Vz label={<>Halo Health, <mark>ready for the call</mark></>}>
          <Row><Person k="asian" name="Meera Iyer" sub="Head of Operations" /></Row>
          <ul className="vz-tl"><li><i />Call on Friday</li><li><i />Proposal sent by email</li><li><i />Renewal discussed, note added</li></ul>
          <div className="vz-sep">Due today</div>
          <Row><span className="vz-box" /><span className="vz-pt"><b>Send the revised quote</b><small>Task, high priority</small></span><Chip t="10:30" tone="amber" /></Row>
          <Row><span className="vz-box" /><span className="vz-pt"><b>Call Halo Health</b><small>Meeting reminder</small></span><Chip t="2:00" tone="blue" /></Row>
        </Vz>
      </>
    ),
  },
  {
    key: "quote", name: "Quote", line: "Take a proposal to payment on the deal record.", band: "#FFD2C2",
    items: ["Generate quotes from a deal", "Approval steps before a quote goes out", "Payment tracking against a deal", "Lead scoring and win probability", "Pairs with ConfigX when quotes need product configuration"],
    icon: I(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /><path d="M9 13h6" /><path d="M13 17h2" /></>),
    vis: (
      <>
        <Vz label={<>Quote for <mark>Northgate expansion</mark></>}>
          <div className="vz-qh"><b>QT-2041</b><Chip t="Approved" tone="mint" /></div>
          <Row><span className="vz-pt"><b>Licenses, 20 users</b><small>Annual plan</small></span><b className="vz-amt">₹2,40,000</b></Row>
          <Row><span className="vz-pt"><b>Onboarding</b><small>One time</small></span><b className="vz-amt">₹60,000</b></Row>
          <Row><span className="vz-pt"><b>Total</b></span><b className="vz-amt big">₹3,00,000</b></Row>
          <div className="vz-steps"><span className="done">Draft</span><span className="done">Approved</span><span className="done">Sent</span><span className="on">Paid</span></div>
        </Vz>
        <Note style={{ left: "5%", bottom: "5%", width: "34%" }} t="Approved" d="By the manager" />
      </>
    ),
  },
  {
    key: "report", name: "Report", line: "Report straight from your CRM records.", band: "#CFCBFA",
    items: ["Dashboards where a card links to its source report", "Saved reports with tags", "Revenue trend and pipeline by stage", "Revenue forecast", "Team performance and conversion trends"],
    icon: I(<><rect x="3" y="12" width="6" height="8" rx="1" /><rect x="9" y="8" width="6" height="12" rx="1" /><rect x="15" y="4" width="6" height="16" rx="1" /></>),
    vis: (
      <>
        <Vz label={<>Pipeline <mark>this quarter</mark></>}>
          <div className="vz-stats">
            <div><small>Open pipeline</small><b>$1.24M</b></div>
            <div><small>Open deals</small><b>12</b></div>
            <div><small>At risk</small><b>6</b></div>
          </div>
          <div className="vz-bars" aria-hidden="true">
            {[["Qualified", 46], ["Proposal", 74], ["Negotiation", 58], ["Won", 34]].map(([n, h]) => (
              <span key={n as string}><i style={{ height: `${h}%` }} /><small>{n}</small></span>
            ))}
          </div>
          <div className="vz-foot"><small>Forecast from deal probability</small><Chip t="Source report" tone="blue" /></div>
        </Vz>
      </>
    ),
  },
];

const Tick = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export function CrmFeatures() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [act, setAct] = useState(0);

  const stepOf = useCallback(() => {
    const t = track.current;
    const cards = t ? t.querySelectorAll<HTMLElement>(".fx-card") : null;
    if (!t || !cards || cards.length < 2) return 0;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }, []);

  const measure = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const st = stepOf();
    setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 28 });
    if (st > 0) setAct(Math.max(0, Math.min(CARDS.length - 1, Math.round(t.scrollLeft / st))));
  }, [stepOf]);

  useEffect(() => {
    measure();
    const t = track.current;
    if (!t) return;
    t.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => { t.removeEventListener("scroll", measure); window.removeEventListener("resize", measure); };
  }, [measure]);

  const go = (n: number) => {
    const t = track.current;
    if (!t) return;
    const k = Math.max(0, Math.min(CARDS.length - 1, n));
    t.scrollTo({ left: k * stepOf(), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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
            <button type="button" aria-label="Previous moment" disabled={edge.start} onClick={() => go(act - 1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
            <button type="button" aria-label="Next moment" disabled={edge.end} onClick={() => go(act + 1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </div>
        </div>
        <ol className="fx-steps" aria-label="The four moments">
          {CARDS.map((c, n) => (
            <li key={c.key} className={n === act ? "on" : n < act ? "done" : undefined}>
              <button type="button" aria-current={n === act ? "step" : undefined} onClick={() => go(n)}><i>{n + 1}</i><span>{c.name}</span></button>
            </li>
          ))}
        </ol>
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
  .fx-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:26px}
  .fx-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0;text-wrap:balance}
  .fx-h2 .l{font-weight:400;color:#5C6785}
  .fx-head p{margin:16px 0 0;font-size:18px;line-height:1.6;color:${BODY}}
  .fx-nav{display:none;gap:10px;flex:none}
  .fx-nav button{all:unset;box-sizing:border-box;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#fff;color:${INK};box-shadow:inset 0 0 0 1.5px #C9D2E6;transition:background .2s ease,color .2s ease,box-shadow .2s ease}
  .fx-nav button:hover:not(:disabled){background:${BLUE};color:#fff;box-shadow:none}
  .fx-nav button:disabled{opacity:.4;cursor:default}
  .fx-nav button:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}

  .fx-steps{list-style:none;margin:0 0 26px;padding:0;display:flex;align-items:center}
  .fx-steps li{display:flex;align-items:center}
  .fx-steps li+li::before{content:"";width:clamp(18px,5vw,72px);height:2px;margin:0 12px;border-radius:2px;background:#CBD3E6;transition:background .3s ease}
  .fx-steps li.on::before,.fx-steps li.done::before{background:${BLUE}}
  .fx-steps button{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:10px;cursor:pointer;color:#5C6785;font-size:15px;font-weight:600;line-height:1;transition:color .2s ease}
  .fx-steps button:focus-visible{outline:3px solid ${BLUE};outline-offset:4px;border-radius:99px}
  .fx-steps i{font-style:normal;width:32px;height:32px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#fff;box-shadow:inset 0 0 0 1.5px #C9D2E6;font-size:13px;font-weight:700;transition:background .25s ease,color .25s ease,box-shadow .25s ease}
  .fx-steps li.on button{color:${INK}}
  .fx-steps li.on i{background:${BLUE};color:#fff;box-shadow:none}
  .fx-steps li.done i{background:${TINT};color:${BLUE};box-shadow:none}
  .fx-steps button:hover i{box-shadow:inset 0 0 0 1.5px ${BLUE}}

  .fx-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:6px 20px 34px;scroll-padding:0 20px;overscroll-behavior-x:contain}
  .fx-track::-webkit-scrollbar{display:none}
  .fx-track:focus-visible{outline:3px solid ${BLUE};outline-offset:-3px}
  .fx-card{flex:0 0 min(86vw,560px);scroll-snap-align:start;display:flex;flex-direction:column;border-radius:28px;background:#fff;border:1px solid ${LINE};overflow:hidden;box-shadow:0 24px 54px -34px rgba(15,27,61,.3)}

  .hv{position:relative;overflow:hidden;aspect-ratio:auto;min-height:450px;background:var(--band)}
  .hv-card{position:absolute;z-index:2;box-sizing:border-box;display:grid;gap:3px;padding:11px 14px;border-radius:14px;background:#fff;color:${INK};box-shadow:0 16px 32px -16px rgba(15,27,61,.5),0 0 0 1px ${LINE}}
  .hv-card.dark{background:${INK};color:#fff;box-shadow:0 16px 32px -16px rgba(15,27,61,.7)}
  .hv-card b{font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;font-weight:600;line-height:1.25}
  .hv-card span{font-size:12px;line-height:1.35;color:${BODY}}
  .hv-card.dark span{color:rgba(255,255,255,.78)}
  .hv-card ul{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:5px}
  .hv-card li{font-size:12px;line-height:1.3;color:${INK};padding-left:16px;position:relative}
  .hv-card li::before{content:"";position:absolute;left:0;top:2px;width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 2px ${BLUE}}
  .hv-card pre{margin:4px 0 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:1.7;color:#C9D6F4;white-space:pre;overflow:hidden}


  .vz{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:34px 32px}
  .vz-label{margin:0;font-size:14px;line-height:1.4;color:#33415C;text-align:center}
  .vz-label mark{background:none;color:${BLUE};font-weight:700}
  .vz-stack{position:relative;width:min(100%,430px)}
  .vz-stack::before,.vz-stack::after{content:"";position:absolute;left:14px;right:14px;height:100%;border-radius:22px;background:rgba(255,255,255,.55)}
  .vz-stack::before{top:-10px;left:30px;right:30px;background:rgba(255,255,255,.35)}
  .vz-stack::after{top:-5px}
  .vz-card{position:relative;z-index:1;border-radius:22px;background:#fff;padding:8px 20px 14px;box-shadow:0 26px 50px -28px rgba(15,27,61,.55),0 0 0 1px rgba(15,27,61,.06)}
  .vz-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #EDF0F7;font-size:13.5px;color:${INK}}
  .vz-row:first-child{border-top:0}
  .vz-av{flex:none;width:34px;height:34px;border-radius:50%;object-fit:cover;object-position:50% 20%}
  .vz-own{flex:none;width:24px;height:24px;border-radius:50%;object-fit:cover;object-position:50% 20%;box-shadow:0 0 0 2px #fff,0 0 0 3px #DCE3F2}
  .vz-pt{display:grid;gap:1px;min-width:0;flex:1}
  .vz-pt b{font-weight:600;font-size:13.5px;line-height:1.3}
  .vz-pt small{font-size:12px;line-height:1.3;color:${MUTED}}
  .vz-chip{font-style:normal;flex:none;font-size:11px;font-weight:700;line-height:1;padding:5px 9px;border-radius:99px;white-space:nowrap}
  .vz-chip.blue{background:${TINT};color:${BLUE}}
  .vz-chip.mint{background:#DDF5EC;color:#0F7A57}
  .vz-chip.amber{background:#FFF1CC;color:#9A6A00}
  .vz-chip.ink{background:${BLUE};color:#fff}
  .vz-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:12px;border-top:1px solid #EDF0F7}
  .vz-foot small{font-size:12px;color:${MUTED}}
  .vz-tl{list-style:none;margin:0 0 4px;padding:0 0 0 4px;display:grid;gap:8px;font-size:12.5px;color:${INK}}
  .vz-tl li{position:relative;padding-left:20px}
  .vz-tl i{position:absolute;left:0;top:4px;width:9px;height:9px;border-radius:50%;box-shadow:inset 0 0 0 2px ${BLUE}}
  .vz-sep{margin:8px 0 0;padding-top:10px;border-top:1px solid #EDF0F7;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${MUTED}}
  .vz-box{flex:none;width:18px;height:18px;border-radius:6px;box-shadow:inset 0 0 0 2px #C3CCE0}
  .vz-qh{display:flex;align-items:center;justify-content:space-between;padding:10px 0 6px;font-size:14px;color:${INK}}
  .vz-amt{font-size:13.5px;font-weight:600;color:${INK};white-space:nowrap}
  .vz-amt.big{font-size:17px}
  .vz-steps{display:flex;gap:6px;padding-top:12px;border-top:1px solid #EDF0F7}
  .vz-steps span{flex:1;text-align:center;font-size:11px;font-weight:700;padding:7px 0;border-radius:8px;background:#EEF2FA;color:#6B7690}
  .vz-steps .done{background:${TINT};color:${BLUE}}
  .vz-steps .on{background:${BLUE};color:#fff}
  .vz-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:10px 0 4px}
  .vz-stats div{background:#F4F6FB;border-radius:12px;padding:9px 11px}
  .vz-stats small{display:block;font-size:11px;color:${MUTED}}
  .vz-stats b{font-family:var(--font-display),system-ui,sans-serif;font-size:19px;font-weight:700;color:${INK}}
  .vz-bars{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;align-items:end;height:92px;padding:10px 4px 0}
  .vz-bars span{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px;height:100%}
  .vz-bars i{display:block;width:100%;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,${BLUE},#9DB8F6)}
  .vz-bars small{font-size:10.5px;color:${MUTED};white-space:nowrap}

  @media (min-width:1024px){
    .vz{gap:20px;padding:40px 36px}
    .vz-label{font-size:15.5px}
    .vz-stack{width:min(100%,500px)}
    .vz-card{padding:10px 24px 18px}
    .vz-row{padding:15px 0;font-size:15px;gap:14px}
    .vz-av{width:40px;height:40px}
    .vz-own{width:28px;height:28px}
    .vz-pt b{font-size:15px}
    .vz-pt small{font-size:13px}
    .vz-chip{font-size:12px;padding:6px 11px}
    .vz-foot small{font-size:13px}
    .vz-tl{font-size:14px;gap:10px}
    .vz-qh{font-size:15.5px}
    .vz-amt{font-size:15px}
    .vz-amt.big{font-size:19px}
    .vz-steps span{font-size:12px;padding:9px 0}
    .vz-stats b{font-size:22px}
    .vz-stats small{font-size:12px}
    .vz-bars{height:110px}
    .vz-bars small{font-size:11.5px}
  }

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
  .fx-cta{display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:0 30px;text-decoration:none;border-radius:999px;border:2px solid ${BLUE};background:${BLUE};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;cursor:pointer;box-shadow:0 12px 24px -12px rgba(29,78,216,.5);transition:background-color .18s ease,border-color .18s ease,box-shadow .18s ease}
  .fx-cta:hover{background:${BLUE_HOVER};border-color:${BLUE_HOVER};box-shadow:0 16px 30px -12px rgba(29,78,216,.55)}
  .fx-cta:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}

  @media (max-width:639px){
    .fx-steps li:not(.on) button span{display:none}
    .fx-steps li+li::before{margin:0 8px;width:clamp(14px,6vw,36px)}
  }
  @media (min-width:640px){
    .fx-in{padding:0 24px}
    .fx-sec{padding:80px 0 88px}
    .fx-track{padding-left:24px;padding-right:24px;scroll-padding:0 24px}
    .fx-card{flex:0 0 min(calc(100vw - 96px),720px)}
  }
  @media (min-width:900px){.fx-nav{display:flex}}
  @media (min-width:1024px){
    .fx-sec{padding:96px 0 104px}
    .fx-card{flex:0 0 calc(100vw - 48px - 64px);flex-direction:row;min-height:500px}
    .fx-card .hv{order:2;flex:0 0 55%;aspect-ratio:auto;height:auto;min-height:500px}
    .fx-body{order:1;flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;padding:44px 48px}
    .fx-card .fx-h3{margin-top:24px}
    .fx-list{margin-top:22px}
  }
  @media (min-width:1348px){
    .fx-track{padding-left:calc((100vw - 1300px) / 2 + 24px);padding-right:calc((100vw - 1300px) / 2 + 24px);scroll-padding:0 calc((100vw - 1300px) / 2 + 24px)}
    .fx-card{flex:0 0 1252px}
  }
`;
