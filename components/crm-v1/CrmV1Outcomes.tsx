"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { BLUE, BODY, CORAL_DEEP, CORAL_TINT, INK, LINE, MINT_DEEP, MINT_TINT, MUTED, TINT, TINT_SOFT } from "./palette";

/* Outcomes: the five requests a sales team makes in the CRM, and what EVI prepares for each (docs/crm-v1-new-content.md, Section B).
   EVI is the CRM's assistant: a person asks, EVI checks the record and prepares the work, and approval follows the mode the admin sets.
   A tab list on the left, and for the selected request an EVI panel: the request, the record EVI checks, and the prepared work. */

type Tone = "blue" | "mint";
type Outcome = {
  key: string;
  tab: string;
  say: string;
  record: { title: string; fields: [string, string][] };
  does: string;
  approval: string;
  chip: string;
  tone: Tone;
  tint: string;
};

const OUTCOMES: Outcome[] = [
  {
    key: "renewal", tab: "Close this renewal", say: "Close the Halo Health renewal.",
    record: { title: "Halo Health, renewal", fields: [["Contract value", "₹6,00,000"], ["Renewal", "Due in 14 days"], ["Last conversation", "Call, 9 days ago"], ["Open tasks", "1"]] },
    does: "EVI drafts the renewal follow up and adds a call task for the owner.",
    approval: "Sent after the account owner approves, or on its own if your admin sets this job to automatic.", chip: "Waiting for approval", tone: "blue",
    tint: "#BCD3FB",
  },
  {
    key: "proposal", tab: "Chase this proposal", say: "Follow up on proposals waiting for a reply.",
    record: { title: "Deals in Proposal", fields: [["Deals waiting", "3"], ["Idle for", "8 to 12 days"], ["Contact history", "Emails and calls"]] },
    does: "EVI drafts a follow up for each and schedules a task.",
    approval: "Sent after review, or automatically if your admin sets this job to automatic.", chip: "Review or automatic", tone: "blue",
    tint: "#A9E6CE",
  },
  {
    key: "lead", tab: "Qualify this lead", say: "Qualify the leads that came in this week.",
    record: { title: "Leads from this week", fields: [["Lead source", "Web form and import"], ["Status", "New, no contact yet"], ["History", "Pages and emails opened"]] },
    does: "EVI scores each lead, assigns an owner and moves the status.",
    approval: "The manager confirms assignments, or lets the rules run.", chip: "Manager confirms", tone: "blue",
    tint: "#FFD2C2",
  },
  {
    key: "meeting", tab: "Prepare this meeting", say: "Prepare Thursday's call with Vertex Retail.",
    record: { title: "Vertex Retail, account", fields: [["Open deals", "2"], ["Last conversation", "3 days ago"], ["Notes", "Pricing for a second location"], ["Open tasks", "1"]] },
    does: "EVI puts a short brief on the record, ready before the call.",
    approval: "Nothing leaves the CRM, so no approval is needed.", chip: "No approval needed", tone: "mint",
    tint: "#CFCBFA",
  },
  {
    key: "quarter", tab: "Report this quarter", say: "How does the pipeline look this quarter?",
    record: { title: "Pipeline, this quarter", fields: [["By stage", "Qualification to Won"], ["Forecast", "From deal probability"], ["Deals at risk", "6"]] },
    does: "EVI answers with the figures and links each to its source report.",
    approval: "Read only, so no approval is needed.", chip: "No approval needed", tone: "mint",
    tint: "#FFE49E",
  },
];

const Row = ({ a, b, c, tone }: { a: string; b: string; c: string; tone?: "idle" | "ok" }) => (
  <li><b>{a}</b><span>{b}</span><em className={tone}>{c}</em></li>
);

function Artifact({ k }: { k: string }): ReactNode {
  if (k === "renewal") {
    return (
      <div className="co-art">
        <div className="co-art-h">Draft follow up to Halo Health</div>
        <p className="co-mail">Hello, your renewal is coming up in 14 days. The terms stay as they were, and I can walk you through the summary on Friday.</p>
        <div className="co-task"><i />Call task for Friday added to the owner</div>
      </div>
    );
  }
  if (k === "proposal") {
    return (
      <ul className="co-rows" aria-label="Proposals waiting for a reply">
        <Row a="Beta Inc." b="9 days idle" c="Draft ready" tone="idle" />
        <Row a="Matrix Corp" b="8 days idle" c="Draft ready" tone="idle" />
        <Row a="Northgate" b="12 days idle" c="Draft ready" tone="idle" />
      </ul>
    );
  }
  if (k === "lead") {
    return (
      <ul className="co-rows" aria-label="Scored leads">
        <Row a="Sara Kim" b="Score 82" c="To Priya M" tone="ok" />
        <Row a="Raj Mehta" b="Score 64" c="To Dev K" tone="ok" />
        <Row a="James Wilson" b="Score 71" c="To Priya M" tone="ok" />
      </ul>
    );
  }
  if (k === "meeting") {
    return (
      <div className="co-art">
        <div className="co-art-h">Brief for Vertex Retail</div>
        <div className="co-stats">
          <div><b>2</b><span>Open deals</span></div>
          <div><b>3 days</b><span>Since last talk</span></div>
          <div><b>1</b><span>Open task</span></div>
        </div>
        <p className="co-mail">Asked about pricing for a second location. Quote is waiting on their reply.</p>
      </div>
    );
  }
  return (
    <div className="co-art">
      <div className="co-art-h">Pipeline this quarter</div>
      <div className="co-stats">
        <div><b>$1.24M</b><span>Open pipeline</span></div>
        <div><b>12</b><span>Open deals</span></div>
        <div><b>6</b><span>Deals at risk</span></div>
      </div>
      <div className="co-src"><i />Each figure opens its source report</div>
    </div>
  );
}

function useMedia(q: string) {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(q); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(q).matches,
    () => false,
  );
}

/* On wide screens a small paper plane flies from the request to the records to the result, and each card appears as it arrives.
   run.step: 0 request, 1 flying to the records, 2 records shown, 3 flying to the result, 4 result shown, 5 approval pulse. */
const FLIGHT_AT = [300, 1100, 1500, 2400, 3200];

export function CrmV1Outcomes() {
  const [run, setRun] = useState({ i: 0, step: 0, n: 0 });
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(true); // the tabs open one after the other until a visitor picks one
  const [held, setHeld] = useState(false); // pointer or focus is inside, so the sequence waits
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const sayEl = useRef<HTMLDivElement>(null);
  const gathEl = useRef<HTMLDivElement>(null);
  const resEl = useRef<HTMLDivElement>(null);
  const planeEl = useRef<HTMLSpanElement>(null);
  const pathA = useRef<SVGPathElement>(null);
  const pathB = useRef<SVGPathElement>(null);
  const wide = useMedia("(min-width:1280px)");
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const fly = wide && !still;
  const { i, step } = run;
  const o = OUTCOMES[i];
  const select = (n: number) => { setAuto(false); setRun((r) => ({ i: n, step: 0, n: r.n + 1 })); };
  const autoOn = auto && !still && inView && !held;
  const dwell = fly ? 8200 : 7000;
  const shown = (s: number) => !fly || step >= s;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + OUTCOMES.length) % OUTCOMES.length;
    select(n);
    tabs.current[n]?.focus();
  };

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!fly || !inView) return;
    const n = run.n;
    const ts = FLIGHT_AT.map((ms, k) => setTimeout(() => setRun((r) => (r.n === n ? { ...r, step: k + 1 } : r)), ms));
    return () => ts.forEach(clearTimeout);
  }, [fly, inView, run.n]);

  useEffect(() => {
    if (!autoOn) return;
    const t = setTimeout(() => setRun((r) => ({ i: (r.i + 1) % OUTCOMES.length, step: 0, n: r.n + 1 })), dwell);
    return () => clearTimeout(t);
  }, [autoOn, dwell, run.n]);

  useLayoutEffect(() => {
    if (!fly) return;
    const plane = planeEl.current, a = pathA.current, b = pathB.current, say = sayEl.current, gath = gathEl.current, res = resEl.current;
    if (!plane || !a || !b || !say || !gath || !res) return;
    const sx = say.offsetLeft + say.offsetWidth - 30, sy = say.offsetTop + say.offsetHeight / 2;
    const gx = gath.offsetLeft + gath.offsetWidth + 10, gy = gath.offsetTop + gath.offsetHeight / 2;
    const rx = res.offsetLeft - 10, ry = res.offsetTop + 64;
    a.setAttribute("d", `M${sx},${sy} C${sx + 110},${sy - 30} ${gx + 90},${gy - 50} ${gx},${gy}`);
    b.setAttribute("d", `M${gx},${gy} C${gx + 130},${gy + 20} ${rx - 150},${ry - 70} ${rx},${ry}`);
    const at = (p: SVGPathElement, t: number) => {
      const L = p.getTotalLength();
      const pt = p.getPointAtLength(L * t);
      const q = p.getPointAtLength(Math.min(L, L * t + 2));
      const deg = (Math.atan2(q.y - pt.y, q.x - pt.x) * 180) / Math.PI + 45;
      plane.style.transform = `translate(${pt.x - 18}px,${pt.y - 18}px) rotate(${deg}deg)`;
    };
    let raf = 0;
    const go = (p: SVGPathElement, ms: number) => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / ms);
        at(p, k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (step === 0) at(a, 0);
    else if (step === 1) go(a, 800);
    else if (step === 2) at(a, 1);
    else if (step === 3) go(b, 900);
    else at(b, 1);
    return () => cancelAnimationFrame(raf);
  }, [fly, run.step, run.i, step]);

  return (
    <section id="outcomes" className="co-sec" aria-labelledby="co-h2">
      <style>{css}</style>
      <div className="co-in">
        <div className="co-head">
          <h2 id="co-h2" className="co-h2"><span className="l">Say the outcome.</span> <span className="b">See the work.</span></h2>
          <p>Ask EVI for the outcome. EVI checks the record and prepares the work for your approval.</p>
        </div>

        <div className={`co-grid${held ? " held" : ""}`} onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)} onFocus={() => setHeld(true)} onBlur={() => setHeld(false)}>
          <div className="co-tabs" role="tablist" aria-label="Sales requests" aria-orientation="vertical" onKeyDown={onKey}>
            {OUTCOMES.map((x, n) => (
              <button
                key={x.key}
                ref={(el) => { tabs.current[n] = el; }}
                type="button"
                role="tab"
                id={`co-t-${x.key}`}
                aria-selected={n === i}
                aria-controls="co-panel"
                tabIndex={n === i ? 0 : -1}
                className={`co-tab${n === i ? " on" : ""}`}
                onClick={() => select(n)}
              >
                <span className="co-n">{n + 1}</span>
                <span className="co-tl">{x.tab}</span>
                {n === i && autoOn && <i key={run.n} className="co-fill" style={{ animationDuration: `${dwell}ms` }} />}
              </button>
            ))}
          </div>

          <div className="co-panel" id="co-panel" ref={panel} role="tabpanel" aria-labelledby={`co-t-${o.key}`}>
            <div key={`bg${o.key}`} className="co-bg" aria-hidden="true" style={{ "--tint": o.tint } as CSSProperties} />
            <div key={o.key} className="co-stage" data-fly={fly ? 1 : 0}>
              <div className="co-say" ref={sayEl}>
                <small><i className="co-step">1</i>Ask EVI<img className="co-evi" src="/symbol-color.png" alt="" width={16} height={16} /></small>
                <div className="co-ask"><img src="/crm-v1/priya.webp" alt="" width={34} height={34} /><div><p>{o.say}</p><span>Priya Nair, account owner</span></div></div>
              </div>

              <div className={`co-gath${shown(2) ? "" : " co-hid"}`} ref={gathEl}>
                <small><i className="co-step">2</i>EVI checks the record</small>
                <b className="co-rt">{o.record.title}</b>
                <dl>{o.record.fields.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              </div>

              <div className={`co-res${shown(4) ? "" : " co-hid"}`} ref={resEl}>
                <small><i className="co-step">3</i>EVI prepares, you approve</small>
                <p className="co-does">{o.does}</p>
                <Artifact k={o.key} />
                <div className={`co-ok${fly && step >= 5 ? " pulse" : ""}`}>
                  <span className="co-ok-l">Approval</span>
                  <p>{o.approval}</p>
                  <em className={o.tone}>{o.chip}</em>
                </div>
              </div>

              {fly && (
                <>
                  <svg className="co-fly" aria-hidden="true">
                    <path ref={pathA} className="co-guide" style={{ opacity: step >= 1 ? 1 : 0 }} />
                    <path ref={pathB} className="co-guide" style={{ opacity: step >= 3 ? 1 : 0 }} />
                  </svg>
                  <span ref={planeEl} className="co-plane" style={{ opacity: step >= 5 ? 0 : 1 }} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  @keyframes coIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .co-sec{background:#fff;padding:64px 0 72px;scroll-margin-top:16px}
  .co-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .co-head{max-width:820px;margin-bottom:32px}
  .co-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0;text-wrap:balance}
  .co-h2 .l{font-weight:400;color:#5C6785}
  .co-head p{margin:16px 0 0;font-size:18px;line-height:1.6;color:${BODY};max-width:56ch}

  .co-grid{display:grid;gap:16px}
  .co-tabs{display:flex;flex-wrap:wrap;gap:8px}
  .co-tab{flex:none;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:16px;border:1px solid ${LINE};background:#F5F7FC;color:${INK};font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;cursor:pointer;text-align:left;transition:background-color .2s ease,color .2s ease,border-color .2s ease;white-space:nowrap}
  .co-tab{position:relative;overflow:hidden}
  .co-fill{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.55);transform-origin:left;animation:coFill linear forwards}
  @keyframes coFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  .co-tab:hover{border-color:#B8C4DF}
  .co-tab:focus-visible{outline:3px solid ${BLUE};outline-offset:2px}
  .co-tab.on{background:${INK};border-color:${INK};color:#fff}
  .co-n{flex:none;width:24px;height:24px;border-radius:50%;background:#fff;color:${INK};font-size:12.5px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .co-tab.on .co-n{background:rgba(255,255,255,.18);color:#fff}

  .co-panel{position:relative;border-radius:24px;overflow:hidden;background:${TINT_SOFT};border:1px solid ${LINE}}
  .co-bg{display:block;width:100%;height:120px;border-bottom:1px solid ${LINE};animation:coIn .5s ease both;background:radial-gradient(circle at 82% 20%,rgba(255,255,255,.55) 0,rgba(255,255,255,0) 46%),radial-gradient(rgba(15,27,61,.13) 1.3px,transparent 1.6px) 0 0/22px 22px,linear-gradient(135deg,var(--tint),#EFF4FE)}
  .co-stage{position:relative;display:grid;gap:12px;padding:14px;animation:coIn .5s ease both}
  .co-stage small{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${MUTED}}
  .co-stage p{margin:0}
  .co-step{flex:none;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:${BLUE};color:#fff;font-style:normal;font-size:11px;font-weight:700;letter-spacing:0}
  .co-say .co-step{background:#fff;color:${INK}}

  .co-say{display:grid;gap:8px;background:${INK};color:#fff;border-radius:18px;padding:12px 16px 14px;box-shadow:0 12px 30px rgba(15,27,61,.2)}
  .co-say small{color:rgba(255,255,255,.66)}
  .co-evi{width:16px;height:16px;object-fit:contain;margin-left:2px}
  .co-ask{display:flex;align-items:center;gap:12px;padding:8px 12px 8px 8px;border-radius:999px;background:rgba(255,255,255,.1)}
  .co-ask img{flex:none;width:34px;height:34px;border-radius:50%;object-fit:cover;object-position:50% 12%}
  .co-say p{font-size:15.5px;font-weight:600;line-height:1.3}
  .co-ask span{display:block;margin-top:1px;font-size:11.5px;line-height:1.3;color:rgba(255,255,255,.62)}

  .co-gath,.co-res{background:#fff;border-radius:18px;padding:14px 16px;box-shadow:0 12px 30px rgba(15,27,61,.12),0 0 0 1px rgba(15,27,61,.05)}
  .co-rt{display:block;margin-top:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;line-height:1.3;color:${INK}}
  .co-gath dl{margin:10px 0 0;display:grid;gap:6px}
  .co-gath dl div{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:7px 10px;border-radius:10px;background:#F5F7FC;font-size:13px;line-height:1.3}
  .co-gath dt{color:${MUTED};white-space:nowrap}
  .co-gath dd{margin:0;color:${INK};font-weight:600;text-align:right}

  .co-does{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;line-height:1.35;font-weight:600;color:${INK};margin:6px 0 12px !important}
  .co-art{background:#F5F7FC;border-radius:12px;padding:12px 14px}
  .co-art-h{font-size:12.5px;font-weight:700;color:${INK};margin-bottom:6px}
  .co-mail{font-size:13.5px !important;line-height:1.5;color:${BODY}}
  .co-task{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:12.5px;font-weight:600;color:${BLUE}}
  .co-task i,.co-src i{flex:none;width:8px;height:8px;border-radius:50%;background:${BLUE}}
  .co-src{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:12.5px;font-weight:600;color:${BLUE}}
  .co-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:8px}
  .co-stats div{background:#fff;border-radius:10px;padding:8px 10px;min-width:0}
  .co-stats b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:19px;line-height:1.1;color:${INK};letter-spacing:-.01em}
  .co-stats span{display:block;font-size:11.5px;color:${MUTED};line-height:1.3;margin-top:2px}
  .co-rows{list-style:none;margin:0;padding:0;display:grid;gap:6px}
  .co-rows li{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) auto;align-items:center;gap:8px;background:#F5F7FC;border-radius:10px;padding:9px 12px;font-size:13px;line-height:1.3}
  .co-rows b{color:${INK};font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .co-rows span{color:${MUTED};white-space:nowrap}
  .co-rows em,.co-ok em{font-style:normal;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600;white-space:nowrap}
  .co-rows em.idle{background:${CORAL_TINT};color:${CORAL_DEEP}}
  .co-rows em.ok{background:${MINT_TINT};color:${MINT_DEEP}}
  .co-ok{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:12px;padding-top:12px;border-top:1px solid ${LINE}}
  .co-ok-l{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${MUTED}}
  .co-ok p{flex:1 1 220px;font-size:13.5px;line-height:1.45;color:${BODY}}
  .co-ok em.blue{background:${TINT};color:${BLUE}}
  .co-ok em.mint{background:${MINT_TINT};color:${MINT_DEEP}}

  @keyframes coPulse{0%{box-shadow:0 0 0 0 rgba(29,78,216,.45)}100%{box-shadow:0 0 0 12px rgba(29,78,216,0)}}
  .co-ok.pulse em{animation:coPulse 1.2s ease 1}

  @media (min-width:640px){
    .co-in{padding:0 24px}
    .co-sec{padding:80px 0 88px}
    .co-stage{padding:20px;gap:14px}
    .co-bg{height:150px}
  }
  @media (min-width:1024px){
    .co-grid{grid-template-columns:260px minmax(0,1fr);gap:20px;align-items:start}
    .co-tabs{flex-direction:column;flex-wrap:nowrap}
    .co-tab{white-space:normal;padding:15px 18px;font-size:15.5px}
    .co-sec{padding:96px 0 104px}
  }
  @media (min-width:1280px){
    .co-panel{min-height:580px}
    .co-bg{position:absolute;inset:0;width:100%;height:100%;border-bottom:0}
    .co-bg::before{content:"";position:absolute;width:520px;height:520px;border-radius:50%;background:rgba(255,255,255,.34);right:-140px;top:-190px}
    .co-bg::after{content:"";position:absolute;width:360px;height:360px;border-radius:50%;background:rgba(255,255,255,.22);left:-110px;bottom:-170px}
    .co-stage{position:absolute;inset:0;display:block;padding:0;z-index:1}
    .co-say{position:absolute;left:24px;top:24px;width:430px}
    .co-gath{position:absolute;left:24px;top:150px;width:340px}
    .co-res{position:absolute;right:24px;bottom:24px;width:480px;padding:18px 20px}
    .co-does{font-size:18px}
    .co-gath,.co-res{transition:opacity .55s ease,transform .55s cubic-bezier(.2,.7,.2,1)}
    .co-hid{opacity:0;transform:translateY(14px) scale(.98)}
    .co-fly{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:3}
    .co-guide{fill:none;stroke:${BLUE};stroke-width:2.2;stroke-linecap:round;stroke-dasharray:1 9;transition:opacity .5s ease}
    .co-plane{position:absolute;left:0;top:0;z-index:4;width:36px;height:36px;border-radius:50%;background:${BLUE};color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(29,78,216,.5);pointer-events:none;transition:opacity .6s ease}
  }
  @media (prefers-reduced-motion:reduce){
    .co-stage,.co-bg{animation:none}
    .co-ok.pulse em{animation:none}
  }
`;
