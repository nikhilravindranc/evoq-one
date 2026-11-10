"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Ic } from "./icons";
import { BAND, DEEP, INK, LINE, MUTED, NEUTRAL, PAPER, PRIMARY } from "./palette";

/* The two story sections after the hero: the scroll-revealed statement with what the customer sees, and the
   lifecycle (one road, one technician, six stops, five selectable work type paths). Sample data is illustrative. */

const Eyebrow = ({ children }: { children: ReactNode }) => <span className="so-label">{children}</span>;

/* ---------- statement: words fill in as you scroll, the customer's phone fills with messages ---------- */
const ST_P = [
  "Your customer never sees the scheduling, the stock or the paperwork behind a job. They see a technician who arrives informed, finishes the work and leaves a clear record.",
  "ServiceOps is built around that moment, and around everyone who makes it happen before and after.",
];
const ST_CHIPS = ["Dispatch board", "Parts and stock", "Checklists", "Estimates", "Approvals", "Job costing"];
const ST_MSGS: { t: string; d: string; at: number }[] = [
  { t: "Request received", d: "We will confirm a time shortly.", at: 0.12 },
  { t: "Ryan is assigned", d: "Arriving between 10:00 and 11:00.", at: 0.36 },
  { t: "Ryan is on the way", d: "Parking at the main entrance.", at: 0.6 },
  { t: "Work complete", d: "Signed off. Your invoice is ready.", at: 0.82 },
];

function Statement() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = [...root.querySelectorAll<HTMLElement>("[data-w]")];
    const msgs = [...root.querySelectorAll<HTMLElement>("[data-b]")];
    const wide = window.matchMedia("(min-width:981px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const live = wide.matches && !still.matches;
      const p = live ? Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight))) : 1;
      words.forEach((w, i) => {
        const t = ((p - 0.04) / 0.62) * words.length - i;
        w.style.opacity = String(0.2 + 0.8 * Math.min(1, Math.max(0, t)));
      });
      msgs.forEach((m) => m.classList.toggle("on", p >= Number(m.dataset.b)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="st-sec" ref={ref}>
      <div className="st-stick">
        <div className="st-in">
          <div className="st-copy">
            <h2 className="st-h">To your customer, the visit is the product.</h2>
            <div className="st-p">
              {ST_P.map((p, pi) => (
                <p key={pi}>
                  {p.split(" ").map((w, i) => <span key={i} data-w className="st-w">{w} </span>)}
                </p>
              ))}
            </div>
          </div>
          <div className="st-scene">
            {ST_CHIPS.map((c, i) => <span key={c} className={`st-chip c${i}`}>{c}</span>)}
            <div className="st-phone">
              <i className="st-notch" aria-hidden />
              <div className="st-scr">
                <div className="st-top"><b>Your visit</b><small>Today</small></div>
                {ST_MSGS.map((m) => (
                  <div key={m.t} className="st-msg" data-b={m.at}>
                    <img src="/logos/serviceops-icon.png" alt="" />
                    <span><b>{m.t}</b><small>{m.d}</small></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- lifecycle road: six stops, driven by a work order that travels down the page ---------- */
const STEPS: { t: string; d: string }[] = [
  { t: "The journey begins with a request.", d: "A customer reports an issue, requests an installation or needs scheduled maintenance. Requests can arrive by phone, email, online booking, the customer portal or from a technician." },
  { t: "The work is reviewed and authorized.", d: "The service coordinator reviews the request, creates a work order, prepares an estimate when required and obtains the necessary approvals." },
  { t: "The right workflow takes over.", d: "The work type determines the process. Installation, Service, Repair, Maintenance and Inspection can each follow their own stages, questions and conditions." },
  { t: "A technician is assigned.", d: "Dispatchers review workload, availability and scheduling options before assigning the work." },
  { t: "The service visit takes place.", d: "The technician follows the required checklist, records work performed, adds photos and parts, reports issues and obtains customer sign-off." },
  { t: "The job moves towards closure.", d: "Completed work is ready for billing, while service history, equipment records and follow-up requirements remain available for future visits." },
];

function Road() {
  return (
    <div className="rd">
      <span className="rd-road" aria-hidden><i /></span>
      <ol className="rd-grid">
        {STEPS.map((s, i) => (
          <li key={s.t} className="rd-stop">
            <span className="rd-node" data-n={i} />
            <span className="rd-txt"><em>{String(i + 1).padStart(2, "0")}</em><b>{s.t}</b><span>{s.d}</span></span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* The work order that leaves the hero and rides the page down into the road, one step per stop. Its position is a
   function of the scroll position only, so it flows with the reader and never needs a timer. */
const FO_LABELS = ["Request received", "Request authorized", "Workflow set", "Technician assigned", "Visit in progress", "Closed, ready to bill"];
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => { const x = clamp(t, 0, 1); return x * x * (3 - 2 * x); };

function FlowObject() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const main = el?.parentElement;
    if (!el || !main) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.display = "none"; return; }
    const label = el.querySelector<HTMLElement>("[data-fl]");
    let raf = 0;
    let lastX = 0;
    let tilt = 0;
    let shown = -1;

    const center = (n: Element) => {
      const r = n.getBoundingClientRect();
      return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY };
    };

    const update = () => {
      raf = 0;
      const start = document.querySelector("[data-fo-start]");
      const nodes = [...document.querySelectorAll("[data-n]")];
      const rd = document.querySelector<HTMLElement>(".rd");
      if (!start || nodes.length < STEPS.length || !rd) return;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const m = main.getBoundingClientRect();
      const mx = m.left + window.scrollX;
      const my = m.top + window.scrollY;
      const a0 = center(start);
      const ns = nodes.map(center);
      const row = Math.abs(ns[ns.length - 1].y - ns[0].y) < 40;

      /* scroll positions at which the object sits on each anchor */
      const P = [a0, ...ns];
      const S: number[] = [0];
      const first = row ? ns[0].y - vh * 0.78 : ns[0].y - vh * 0.55;
      S.push(Math.max(first, 80));
      for (let k = 1; k < ns.length; k++) S.push(row ? S[1] + k * 88 : Math.max(ns[k].y - vh * 0.55, S[k] + 60));
      const end = S[S.length - 1];

      let i = 0;
      while (i < S.length - 2 && sy >= S[i + 1]) i++;
      const t = clamp((sy - S[i]) / Math.max(1, S[i + 1] - S[i]), 0, 1);
      let x: number;
      let y: number;
      if (sy >= end) { x = P[P.length - 1].x; y = P[P.length - 1].y; }
      else if (i === 0) {
        /* the long flight from the hero: it glides down the page and swings across to the road at the end */
        y = P[0].y + (P[1].y - P[0].y) * t;
        x = P[0].x + (P[1].x - P[0].x) * smooth((t - 0.55) / 0.45);
      } else {
        const e = smooth((t - 0.12) / 0.76);
        x = P[i].x + (P[i + 1].x - P[i].x) * e;
        y = P[i].y + (P[i + 1].y - P[i].y) * e;
      }
      /* which stop it has reached: lights the road and sets the label */
      let k = -1;
      for (let j = 1; j < S.length; j++) if (sy >= S[j] - (S[j] - S[j - 1]) * 0.4) k = j - 1;
      if (k !== shown) {
        shown = k;
        if (label) label.textContent = FO_LABELS[Math.max(0, k)];
        rd.querySelectorAll<HTMLElement>(".rd-stop").forEach((s, n) => {
          s.classList.toggle("on", n <= k);
          s.classList.toggle("now", n === k);
        });
      }
      const w = el.offsetWidth;
      const off = 0;
      const px = clamp(x + off - mx - w / 2, 8 - mx, window.innerWidth - 8 - w - mx);
      const bob = Math.sin(sy / 90) * 5;
      tilt += (clamp((x - lastX) * 0.5, -10, 10) - tilt) * 0.2;
      lastX = x;
      el.style.transform = `translate3d(${px}px,${y - my - el.offsetHeight / 2 + bob}px,0) rotate(${tilt}deg)`;
      el.style.opacity = String(sy > end + 140 ? clamp(1 - (sy - end - 140) / 260, 0, 1) : 1);

      const fill = k < 0 ? 0 : row ? Math.max(0, x - ns[0].x) : Math.max(0, y - ns[0].y);
      rd.style.setProperty("--fx", `${fill}px`);
      rd.style.setProperty("--fy", `${fill}px`);
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    const ro = new ResizeObserver(onScroll);
    ro.observe(main);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    const late = window.setTimeout(onScroll, 600);
    return () => {
      ro.disconnect();
      window.clearTimeout(late);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fo" ref={ref} aria-hidden>
      <div className="fo-card">
        <i>{Ic.wrench}</i>
        <span><small>WO-1042</small><b data-fl>Request received</b></span>
      </div>
    </div>
  );
}

/* ---------- five work types, five defined paths: a work order travels the selected path ---------- */
const TYPES: { k: string; n: string; d: string; ic: ReactNode; stages: string[] }[] = [
  { k: "install", n: "Installation", d: "Coordinate new equipment installation, required checks and completion.", ic: Ic.plug, stages: ["Requested", "Approved", "Checks", "Installed", "Complete"] },
  { k: "service", n: "Service", d: "Handle customer reported service needs and planned service visits.", ic: Ic.wrench, stages: ["Requested", "Scheduled", "Visit", "Complete"] },
  { k: "repair", n: "Repair", d: "Record the issue, guide the repair process and document the work performed.", ic: Ic.gear, stages: ["Issue recorded", "Approved", "Repair", "Documented", "Complete"] },
  { k: "maint", n: "Maintenance", d: "Schedule recurring maintenance and raise work orders when service is due.", ic: Ic.calendar, stages: ["Plan due", "Work order", "Visit", "Complete"] },
  { k: "inspect", n: "Inspection", d: "Follow inspection stages and record the required findings.", ic: Ic.search, stages: ["Scheduled", "Inspect", "Findings recorded", "Complete"] },
];

function WorkPaths() {
  const [on, setOn] = useState(0);
  const [tick, setTick] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  const type = TYPES[on];
  const last = type.stages.length - 1;
  const step = Math.min(tick, last);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      if (still || !seen.current) return;
      setTick((t) => (t >= 9 ? 0 : t + 1));
    }, 1000);
    return () => { io.disconnect(); window.clearInterval(id); };
  }, []);

  return (
    <div className="wp" ref={root} data-rv>
      <div className="wp-tabs" role="tablist" aria-label="Work types">
        {TYPES.map((t, i) => (
          <button key={t.k} type="button" role="tab" aria-selected={i === on} className={`wp-tab${i === on ? " on" : ""}`} onClick={() => { setOn(i); setTick(0); }}>
            {t.ic}{t.n}
          </button>
        ))}
      </div>
      <div className="wp-stage">
        <div className="wp-info">
          <b>{type.n}</b>
          <p>{type.d}</p>
          <span className="wp-pills"><em>Own stages</em><em>Own questions</em><em>Own conditions</em></span>
        </div>
        <div className="wp-track">
          <span className="wp-tok" style={{ left: `${((step + 0.5) / type.stages.length) * 100}%` }} aria-hidden>
            <span className="wp-card">{type.ic}<b>WO-1042</b>{step === last && <i>{Ic.check}</i>}</span>
          </span>
          {type.stages.map((s, i) => (
            <span key={s + i} className={`wp-n${i <= step ? " done" : ""}${i === step ? " cur" : ""}`}>
              <i>{i < step || (i === step && step === last) ? Ic.check : null}</i>
              <b>{s}</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Lifecycle() {
  return (
    <section className="so-sec so-white" id="lifecycle">
      <div className="so-out"><div className="so-in">
        <div className="so-head c" data-rv>
          <Eyebrow>From first request to final sign-off</Eyebrow>
          <h2 className="so-h2">Not every service job follows the same path.</h2>
          <p className="so-lead">An installation is different from a repair. A maintenance visit has different requirements from an inspection. ServiceOps lets companies define workflows around the type of work they perform, so each job follows the right stages, requirements and approvals.</p>
        </div>

        <Road />

        <h3 className="wp-h" data-rv>Five work types, five defined paths.</h3>
        <WorkPaths />
        <p className="lc-close" data-rv>Your service processes can differ. ServiceOps gives each type of work a defined path, while keeping the wider operation coordinated.</p>
      </div></div>
    </section>
  );
}

export function ServiceOpsFlow() {
  return (
    <>
      <style>{css}</style>
      <Statement />
      <Lifecycle />
      <FlowObject />
    </>
  );
}

const css = `
  /* statement */
  .st-sec{position:relative;height:210vh;padding:0 20px;background:#fff}
  .st-stick{position:sticky;top:84px;height:calc(100vh - 108px);min-height:540px;max-height:660px;max-width:1240px;margin:0 auto}
  .st-in{position:relative;overflow:hidden;height:100%;border-radius:40px;background:${BAND};padding:0 64px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:48px;align-items:center}
  .st-h{--h2-size:38px;max-width:15ch;text-wrap:balance}
  .st-p{margin-top:22px}
  .st-p p{margin:0 0 14px;font-size:19px;line-height:1.6;color:${DEEP}}
  .st-w{opacity:.2;transition:opacity .15s linear}
  .st-scene{position:relative;height:100%;display:grid;place-items:center}
  .st-phone{position:relative;z-index:2;width:236px;border-radius:38px;background:#22160A;padding:8px;box-shadow:0 36px 70px -26px rgba(42,27,12,.6)}
  .st-notch{position:absolute;z-index:2;left:50%;top:14px;width:64px;height:16px;margin-left:-32px;border-radius:12px;background:#22160A}
  .st-scr{border-radius:30px;background:#FFFDF8;min-height:430px;padding:38px 12px 14px;display:flex;flex-direction:column;gap:10px}
  .st-top{display:flex;align-items:baseline;justify-content:space-between}
  .st-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP}}
  .st-top small,.st-msg small{display:block;font-size:12px;line-height:1.4;color:${NEUTRAL}}
  .st-msg{display:flex;gap:10px;align-items:flex-start;padding:11px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px ${LINE};opacity:0;transform:translateY(16px) scale(.97);transition:opacity .5s ease,transform .5s cubic-bezier(.2,.7,.2,1)}
  .st-msg.on{opacity:1;transform:none}
  .st-msg img{width:26px;height:26px;border-radius:8px;flex-shrink:0}
  .st-msg b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;color:${DEEP}}
  .st-chip{position:absolute;z-index:1;padding:9px 15px;border-radius:999px;background:#fff;box-shadow:0 10px 26px -12px rgba(42,27,12,.35);font-size:13px;font-weight:600;color:${INK};filter:blur(2px);opacity:.75;animation:stFloat 7s ease-in-out infinite}
  .st-chip.c0{left:2%;top:14%}.st-chip.c1{right:0;top:22%;animation-delay:-2s}.st-chip.c2{left:-4%;top:44%;animation-delay:-4s}
  .st-chip.c3{right:-2%;top:52%;animation-delay:-1s}.st-chip.c4{left:4%;top:74%;animation-delay:-5s}.st-chip.c5{right:4%;top:80%;animation-delay:-3s}
  @keyframes stFloat{50%{transform:translateY(-9px)}}

  /* road: the work order rides down into it and lights each stop in turn */
  .rd{position:relative;margin-top:8px}
  .rd-grid{position:relative;z-index:2;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0 22px}
  .rd-stop{position:relative}
  .rd-node{display:block;width:18px;height:18px;margin:0 0 24px 2px;border-radius:50%;background:#fff;border:3px solid #D9C9A8;transition:background .4s ease,border-color .4s ease,transform .4s ease}
  .rd-stop.on .rd-node{border-color:${PRIMARY};background:${PRIMARY}}
  .rd-stop.now .rd-node{transform:scale(1.35)}
  .rd-txt{display:block;transition:opacity .4s ease}
  .rd-txt em{display:block;margin-bottom:6px;font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.06em;color:#B8AA92;transition:color .4s ease}
  .rd-stop.on .rd-txt em{color:${PRIMARY}}
  .rd-txt b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600;line-height:1.3;color:${DEEP};margin-bottom:8px;text-wrap:balance}
  .rd-txt span{display:block;font-size:14.5px;line-height:1.55;color:${MUTED}}
  .rd-stop:not(.on) .rd-txt{opacity:.5}
  .rd-road{position:absolute;z-index:1;left:11px;right:0;top:10.5px;height:0;border-top:3px dashed #D9C9A8}
  .rd-road i{position:absolute;left:0;top:-3px;height:3px;width:var(--fx,0);background:${PRIMARY}}

  /* the work order */
  .fo{position:absolute;left:0;top:0;z-index:30;pointer-events:none;will-change:transform}
  .fo-card{display:flex;align-items:center;gap:10px;padding:8px 20px 8px 8px;border-radius:999px;background:#fff;box-shadow:0 20px 44px -14px rgba(42,27,12,.55),0 0 0 1px ${LINE};opacity:0;animation:foIn .7s .9s cubic-bezier(.2,.8,.2,1) forwards}
  .fo-card i{display:grid;place-items:center;width:34px;height:34px;flex-shrink:0;border-radius:50%;background:${PRIMARY};color:#fff}
  .fo-card i svg{width:18px;height:18px}
  .fo-card small{display:block;font-size:11px;line-height:1.2;letter-spacing:.05em;color:${NEUTRAL}}
  .fo-card b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;line-height:1.3;color:${DEEP};white-space:nowrap}
  @keyframes foIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:none}}
  @media (max-width:900px){.fo-card{padding:7px}.fo-card span{display:none}}
  @media (prefers-reduced-motion:reduce){.fo{display:none}}

  /* work types */
  .wp-h{--h3-size:28px;margin:96px 0 24px!important;letter-spacing:-.01em}
  .wp{border-radius:32px;background:${PAPER};box-shadow:inset 0 0 0 1px ${LINE};padding:30px 32px 36px}
  .wp-tabs{display:flex;flex-wrap:wrap;gap:8px}
  .wp-tab{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;border:1.5px solid ${LINE};background:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;color:${MUTED};cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease,transform .2s ease}
  .wp-tab svg{width:17px;height:17px}
  .wp-tab:hover{border-color:${DEEP};color:${DEEP}}
  .wp-tab.on{background:${DEEP};border-color:${DEEP};color:#fff}
  .wp-stage{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:56px;align-items:center;margin-top:36px;min-height:170px}
  .wp-info b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:22px;color:${DEEP}}
  .wp-info p{margin:8px 0 16px;font-size:15.5px;line-height:1.55;color:${MUTED}}
  .wp-pills{display:flex;flex-wrap:wrap;gap:6px}
  .wp-pills em{padding:4px 11px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-style:normal;font-size:12.5px;font-weight:600;color:${MUTED}}
  .wp-track{position:relative;display:flex;align-items:flex-start;padding-top:62px}
  .wp-tok{position:absolute;top:0;z-index:3;transform:translateX(-50%);transition:left .85s cubic-bezier(.65,0,.35,1)}
  .wp-card{position:relative;display:flex;align-items:center;gap:7px;padding:7px 12px 7px 9px;border-radius:12px;background:#fff;box-shadow:0 12px 26px -10px rgba(42,27,12,.45),0 0 0 1px ${LINE};color:${PRIMARY};white-space:nowrap}
  .wp-card svg{width:16px;height:16px}
  .wp-card b{font-size:12.5px;color:${DEEP}}
  .wp-card i{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#168A4A;color:#fff}
  .wp-card i svg{width:11px;height:11px}
  .wp-card::after{content:"";position:absolute;left:50%;bottom:-6px;width:12px;height:12px;margin-left:-6px;background:#fff;transform:rotate(45deg);box-shadow:3px 3px 4px -2px rgba(42,27,12,.2)}
  .wp-n{position:relative;flex:1 1 0;display:flex;flex-direction:column;align-items:center;text-align:center;min-width:0}
  .wp-n::before{content:"";position:absolute;top:11px;right:50%;width:100%;height:3px;border-radius:2px;background:#E6D9BD;transition:background .5s ease}
  .wp-n:first-of-type::before{display:none}
  .wp-n.done::before{background:${PRIMARY}}
  .wp-n i{position:relative;z-index:1;display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#fff;border:3px solid #D9C9A8;color:#fff;transition:background .4s ease,border-color .4s ease,transform .4s ease}
  .wp-n i svg{width:12px;height:12px}
  .wp-n.done i{background:${PRIMARY};border-color:${PRIMARY}}
  .wp-n.cur i{transform:scale(1.18)}
  .wp-n b{margin-top:12px;padding:0 4px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;line-height:1.3;color:${NEUTRAL};transition:color .3s ease}
  .wp-n.done b{color:${DEEP}}
  .lc-close{margin:44px auto 0;max-width:64ch;text-align:center;font-family:var(--font-display),system-ui,sans-serif;font-size:19px;line-height:1.5;color:${DEEP};text-wrap:balance}

  @media (max-width:1180px){
    .st-in{padding:0 40px}
    .rd-grid{gap:0 14px}.rd-txt span{font-size:14px}
    .wp-stage{gap:36px}
  }
  @media (max-width:980px){
    .st-sec{height:auto;padding-bottom:24px}
    .st-stick{position:static;height:auto;min-height:0;max-height:none}
    .st-in{height:auto;grid-template-columns:1fr;gap:12px;padding:56px 28px 48px}
    .st-scene{height:auto;min-height:480px}
    .st-chip.c2{left:0}.st-chip.c3{right:0}
  }
  @media (max-width:900px){
    .rd-grid{grid-template-columns:1fr;gap:34px 0;padding-left:44px}
    .rd-node{position:absolute;left:-44px;top:2px;margin:0}
    .rd-road{left:7.5px;right:auto;top:11px;bottom:70px;height:auto;border-top:0;border-left:3px dashed #D9C9A8}
    .rd-road i{left:-3px;top:0;width:3px;height:var(--fy,0)}
    .wp-stage{grid-template-columns:1fr;gap:28px}
    .wp-h{margin-top:72px!important;--h3-size:24px}
  }
  @media (max-width:640px){
    .st-in{border-radius:28px;padding:44px 20px 36px}.st-sec{padding:0 12px 12px}.st-p p{font-size:17px}
    .wp{padding:20px 16px 26px;border-radius:24px}
    .wp-tab{padding:9px 14px;font-size:14px}
    .wp-n b{font-size:12px;padding:0 1px}
    .wp-card{padding:6px 10px 6px 8px}
    .lc-close{font-size:17px}
  }
`;
