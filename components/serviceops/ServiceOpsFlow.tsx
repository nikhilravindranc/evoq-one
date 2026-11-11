"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Ic } from "./icons";
import { BAND, DEEP, INK, LINE, MUTED, NEUTRAL, PAPER, PRIMARY } from "./palette";

/* The story after the hero. First a pinned scene: the customer's phone tracks one job from request to sign-off
   while the left side explains the step in view. Then the five work types, each with a photo and its stages.
   Names, times and the work order number are sample data. */

const Eyebrow = ({ children }: { children: ReactNode }) => <span className="so-label">{children}</span>;

/* ---------- 1. the visit, as the customer's device shows it ---------- */
const STEPS: { t: string; d: string; m: string; s: string }[] = [
  { t: "The journey begins with a request.", d: "A customer reports an issue, requests an installation or needs scheduled maintenance. Requests can arrive by phone, email, online booking, the customer portal or from a technician.", m: "Request received", s: "We will confirm a time shortly." },
  { t: "The work is reviewed and authorized.", d: "The service coordinator reviews the request, creates a work order, prepares an estimate when required and obtains the necessary approvals.", m: "Request approved", s: "Your estimate has been approved." },
  { t: "The right workflow takes over.", d: "The work type determines the process. Installation, Service, Repair, Maintenance and Inspection can each follow their own stages, questions and conditions.", m: "Service plan set", s: "The right steps for this type of work." },
  { t: "A technician is assigned.", d: "Dispatchers review workload, availability and scheduling options before assigning the work.", m: "Ryan is assigned", s: "Arriving between 10:00 and 11:00." },
  { t: "The service visit takes place.", d: "The technician follows the required checklist, records work performed, adds photos and parts, reports issues and obtains customer sign-off.", m: "Visit in progress", s: "Ryan is on site. Checklist 3 of 5." },
  { t: "The job moves towards closure.", d: "Completed work is ready for billing, while service history, equipment records and follow-up requirements remain available for future visits.", m: "Work complete", s: "Signed off. Your invoice is ready." },
];
const ST_CHIPS = ["Dispatch board", "Parts and stock", "Checklists", "Estimates", "Approvals", "Job costing"];

function Statement() {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const wide = window.matchMedia("(min-width:981px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wide.matches || still.matches) { setIdx(STEPS.length - 1); return; }
      const r = root.getBoundingClientRect();
      const p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      setIdx((prev) => { const i = Math.floor(p * STEPS.length); return prev === i ? prev : i; });
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

  const go = (i: number) => {
    const root = ref.current;
    if (!root || !window.matchMedia("(min-width:981px)").matches) return;
    const r = root.getBoundingClientRect();
    const y = window.scrollY + r.top + ((i + 0.5) / STEPS.length) * (r.height - window.innerHeight);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const cur = STEPS[idx];
  return (
    <section className="st-sec" ref={ref}>
      <div className="st-stick">
        <div className="st-in">
          <div className="st-copy">
            <h2 className="st-h"><span>Your customer never sees your software.</span> <span>They see the visit.</span></h2>
            <p className="st-lead">They do not see the scheduling, the stock or the paperwork behind a job. They see a technician who arrives informed, finishes the work and leaves a clear record.</p>

            <div className="st-step" key={idx}>
              <span className="st-count"><b>{String(idx + 1).padStart(2, "0")}</b> of {String(STEPS.length).padStart(2, "0")}</span>
              <h3>{cur.t}</h3>
              <p>{cur.d}</p>
            </div>
            <ol className="st-dots" aria-label="Steps from request to sign-off">
              {STEPS.map((s, i) => (
                <li key={s.m}><button type="button" className={i === idx ? "on" : i < idx ? "done" : ""} onClick={() => go(i)} aria-label={`Step ${i + 1}: ${s.t}`} /></li>
              ))}
            </ol>

            <ol className="st-all">
              {STEPS.map((s, i) => (
                <li key={s.t}><em>{String(i + 1).padStart(2, "0")}</em><div><b>{s.t}</b><p>{s.d}</p></div></li>
              ))}
            </ol>
          </div>

          <div className="st-scene">
            {ST_CHIPS.map((c, i) => <span key={c} className={`st-chip c${i}`}>{c}</span>)}
            <div className="st-phone">
              <i className="st-notch" aria-hidden />
              <div className="st-scr">
                <div className="st-top"><b>Your visit</b><small>WO-1042</small></div>
                <ol className="st-tl" style={{ ["--si" as string]: idx }}>
                  <span className="st-rail" aria-hidden><i style={{ height: `${(idx / (STEPS.length - 1)) * 100}%` }} /></span>
                  <span className="st-token" aria-hidden>{Ic.wrench}</span>
                  {STEPS.map((s, i) => (
                    <li key={s.m} className={i < idx ? "done" : i === idx ? "now" : ""}>
                      <i>{i <= idx ? Ic.check : null}</i>
                      <span><b>{s.m}</b><small>{s.s}</small></span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. five work types: a photo each, and the stages it follows ---------- */
const TYPES: { k: string; n: string; d: string; ic: ReactNode; img: string; alt: string; pos: string; stages: string[] }[] = [
  { k: "install", n: "Installation", d: "Coordinate new equipment installation, required checks and completion.", ic: Ic.plug, img: "/solutions/construction.jpg", alt: "A site lead checking installation plans", pos: "50% 30%", stages: ["Requested", "Approved", "Checks", "Installed", "Complete"] },
  { k: "service", n: "Service", d: "Handle customer reported service needs and planned service visits.", ic: Ic.wrench, img: "/industries/v2/fs-main-hd.jpg", alt: "A technician during a service visit", pos: "60% 35%", stages: ["Requested", "Scheduled", "Visit", "Complete"] },
  { k: "repair", n: "Repair", d: "Record the issue, guide the repair process and document the work performed.", ic: Ic.gear, img: "/industries/v2/fs-detail-hd.jpg", alt: "A technician repairing a control panel", pos: "40% 40%", stages: ["Issue recorded", "Approved", "Repair", "Documented", "Complete"] },
  { k: "maint", n: "Maintenance", d: "Schedule recurring maintenance and raise work orders when service is due.", ic: Ic.calendar, img: "/industries/v2/mf-main-hd.jpg", alt: "A maintenance technician beside plant equipment", pos: "55% 40%", stages: ["Plan due", "Work order", "Visit", "Complete"] },
  { k: "inspect", n: "Inspection", d: "Follow inspection stages and record the required findings.", ic: Ic.search, img: "/industries/v2/mf-circle-hd.jpg", alt: "An inspector on a plant floor", pos: "50% 30%", stages: ["Scheduled", "Inspect", "Findings recorded", "Complete"] },
];

function WorkTypes() {
  const [on, setOn] = useState(0);
  const t = TYPES[on];
  return (
    <div className="wt" data-rv>
      <ul className="wt-list" role="tablist" aria-label="Work types">
        {TYPES.map((x, i) => (
          <li key={x.k} className={i === on ? "on" : ""}>
            <button type="button" role="tab" aria-selected={i === on} onClick={() => setOn(i)}>
              <i>{x.ic}</i>
              <span><b>{x.n}</b><small>{x.d}</small></span>
            </button>
          </li>
        ))}
      </ul>
      <div className="wt-pic">
        {TYPES.map((x, i) => (
          <img key={x.k} src={x.img} alt={x.alt} style={{ objectPosition: x.pos }} className={i === on ? "on" : ""} />
        ))}
        <div className="wt-path" key={t.k}>
          <ol>
            {t.stages.map((s, i) => (
              <li key={s} style={{ ["--d" as string]: `${i * 70}ms` }}><i>{i + 1}</i>{s}</li>
            ))}
          </ol>
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
        <h3 className="wt-h" data-rv>Five work types, five defined paths.</h3>
        <WorkTypes />
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
    </>
  );
}

const css = `
  /* the pinned scene: copy and the step in view on the left, the customer's phone on the right */
  .st-sec{position:relative;height:340vh;padding:0 20px;background:#fff}
  .st-stick{position:sticky;top:84px;height:calc(100vh - 108px);min-height:560px;max-height:680px;max-width:1240px;margin:0 auto}
  .st-in{position:relative;overflow:hidden;height:100%;border-radius:40px;background:${BAND};padding:0 64px;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:48px;align-items:center}
  .st-h{margin:0;text-wrap:balance}
  .st-h span{display:block}.st-h span+span{color:${PRIMARY}}
  .st-lead{margin:18px 0 0;max-width:52ch;font-size:16.5px;line-height:1.6;color:${MUTED}}
  .st-step{margin-top:26px;padding:20px 22px;border-radius:22px;background:#fff;box-shadow:0 18px 40px -28px rgba(42,27,12,.5),0 0 0 1px ${LINE};animation:stIn .45s cubic-bezier(.2,.7,.2,1) both}
  @keyframes stIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .st-count{display:block;margin-bottom:8px;font-size:12.5px;letter-spacing:.06em;color:${NEUTRAL}}
  .st-count b{color:${PRIMARY};font-family:var(--font-display),system-ui,sans-serif;font-size:14px}
  .st-step h3{--h3-size:20px;margin:0 0 6px!important;line-height:1.25}
  .st-step p{margin:0;font-size:15px;line-height:1.55;color:${MUTED}}
  .st-dots{list-style:none;display:flex;gap:8px;margin:18px 0 0;padding:0}
  .st-dots button{display:block;width:34px;height:6px;padding:0;border:0;border-radius:3px;background:#DCCFB8;cursor:pointer;transition:background .3s ease,width .3s ease}
  .st-dots button.done{background:#E0A25A}.st-dots button.on{background:${PRIMARY};width:52px}
  .st-all{display:none;list-style:none;margin:26px 0 0;padding:0}
  .st-scene{position:relative;height:100%;display:grid;place-items:center}
  .st-phone{position:relative;z-index:2;width:262px;border-radius:40px;background:#22160A;padding:9px;box-shadow:0 36px 70px -26px rgba(42,27,12,.6)}
  .st-notch{position:absolute;z-index:2;left:50%;top:15px;width:70px;height:18px;margin-left:-35px;border-radius:12px;background:#22160A}
  .st-scr{border-radius:32px;background:#FFFDF8;min-height:476px;padding:42px 14px 16px}
  .st-top{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px}
  .st-top b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${DEEP}}
  .st-top small{font-size:12px;color:${NEUTRAL}}
  .st-tl{position:relative;list-style:none;margin:0;padding:0}
  .st-rail{position:absolute;left:12px;top:16px;bottom:26px;width:3px;border-radius:2px;background:#EADFC9}
  .st-rail i{position:absolute;left:0;top:0;width:100%;border-radius:2px;background:${PRIMARY};transition:height .6s cubic-bezier(.4,0,.2,1)}
  .st-token{position:absolute;z-index:3;left:0;top:calc(var(--si,0) * 66px + 2px);display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#fff;color:${PRIMARY};box-shadow:0 6px 14px -4px rgba(42,27,12,.55),0 0 0 2px ${PRIMARY};transition:top .6s cubic-bezier(.4,0,.2,1)}
  .st-token svg{width:14px;height:14px}
  .st-tl li{position:relative;display:flex;gap:14px;align-items:flex-start;height:66px;padding-top:2px}
  .st-tl li>i{position:relative;z-index:2;display:grid;place-items:center;flex-shrink:0;width:26px;height:26px;border-radius:50%;background:#fff;border:3px solid #E0D4BE;color:#fff;transition:background .4s ease,border-color .4s ease}
  .st-tl li>i svg{width:12px;height:12px}
  .st-tl li.done>i{background:${PRIMARY};border-color:${PRIMARY}}
  .st-tl li.now>i{opacity:0}
  .st-tl li span{display:block;padding-top:1px;opacity:.38;transition:opacity .4s ease}
  .st-tl li.done span,.st-tl li.now span{opacity:1}
  .st-tl li b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;line-height:1.25;color:${DEEP}}
  .st-tl li small{display:block;margin-top:2px;font-size:12.5px;line-height:1.35;color:${NEUTRAL}}
  .st-chip{position:absolute;z-index:1;padding:9px 15px;border-radius:999px;background:#fff;box-shadow:0 10px 26px -12px rgba(42,27,12,.35);font-size:13px;font-weight:600;color:${INK};filter:blur(2px);opacity:.75;animation:stFloat 7s ease-in-out infinite}
  .st-chip.c0{left:2%;top:14%}.st-chip.c1{right:0;top:22%;animation-delay:-2s}.st-chip.c2{left:-4%;top:44%;animation-delay:-4s}
  .st-chip.c3{right:-2%;top:52%;animation-delay:-1s}.st-chip.c4{left:4%;top:74%;animation-delay:-5s}.st-chip.c5{right:4%;top:80%;animation-delay:-3s}
  @keyframes stFloat{50%{transform:translateY(-9px)}}

  /* five work types */
  .wt-h{--h3-size:28px;margin:72px 0 26px!important;letter-spacing:-.01em}
  .wt{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px;align-items:stretch}
  .wt-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
  .wt-list li{flex:1;border-top:1px solid ${LINE}}
  .wt-list li:last-child{border-bottom:1px solid ${LINE}}
  .wt-list button{display:flex;gap:16px;align-items:flex-start;width:100%;height:100%;padding:18px 4px;border:0;background:none;text-align:left;cursor:pointer;font:inherit;color:inherit}
  .wt-list i{display:grid;place-items:center;flex-shrink:0;width:42px;height:42px;border-radius:13px;background:${PAPER};color:#B8AA92;box-shadow:inset 0 0 0 1px ${LINE};transition:background .3s ease,color .3s ease}
  .wt-list i svg{width:21px;height:21px}
  .wt-list b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:21px;font-weight:600;letter-spacing:-.01em;color:#B8AA92;transition:color .3s ease}
  .wt-list small{display:block;max-height:0;overflow:hidden;font-size:15px;line-height:1.55;color:${MUTED};opacity:0;transition:max-height .45s ease,opacity .35s ease,margin .35s ease}
  .wt-list button:hover b{color:#7C6A52}
  .wt-list li.on b{color:${DEEP}}
  .wt-list li.on i{background:${PRIMARY};color:#fff;box-shadow:none}
  .wt-list li.on small{max-height:70px;margin-top:5px;opacity:1}
  .wt-pic{position:relative;min-height:420px;border-radius:28px;overflow:hidden;background:#2A1B0C;box-shadow:0 34px 70px -36px rgba(42,27,12,.55)}
  .wt-pic>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.04);transition:opacity .6s ease,transform 1.2s ease}
  .wt-pic>img.on{opacity:1;transform:none}
  .wt-pic::after{content:"";position:absolute;inset:auto 0 0 0;height:46%;background:linear-gradient(180deg,rgba(42,27,12,0),rgba(42,27,12,.55));pointer-events:none}
  .wt-path{position:absolute;z-index:2;left:18px;right:18px;bottom:18px;padding:14px 18px;border-radius:18px;background:rgba(255,255,255,.96);box-shadow:0 18px 40px -18px rgba(42,27,12,.6)}
  .wt-path ol{list-style:none;display:flex;margin:0;padding:0}
  .wt-path li{position:relative;flex:1 1 0;display:flex;flex-direction:column;align-items:flex-start;gap:7px;padding-right:6px;min-width:0;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;line-height:1.25;color:${DEEP};animation:wtIn .5s calc(var(--d,0ms)) cubic-bezier(.2,.7,.2,1) both}
  .wt-path li i{position:relative;z-index:1;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:${PRIMARY};color:#fff;font-style:normal;font-size:12px}
  .wt-path li:not(:last-child)::before{content:"";position:absolute;left:28px;right:4px;top:11px;height:2px;border-radius:1px;background:#E5D3B2}
  @keyframes wtIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .lc-close{margin:44px auto 0;max-width:64ch;text-align:center;font-family:var(--font-display),system-ui,sans-serif;font-size:19px;line-height:1.5;color:${DEEP};text-wrap:balance}

  @media (prefers-reduced-motion:reduce){.st-step,.wt-path li{animation:none}.st-token,.st-rail i{transition:none}}
  @media (max-width:1180px){.st-in{padding:0 40px;gap:32px}.wt{gap:36px}}
  @media (max-width:980px){
    .st-sec{height:auto;padding-bottom:24px}
    .st-stick{position:static;height:auto;min-height:0;max-height:none}
    .st-in{height:auto;grid-template-columns:1fr;gap:28px;padding:56px 28px 48px}
    .st-step,.st-dots{display:none}
    .st-all{display:grid;gap:16px}
    .st-all li{display:flex;gap:14px;align-items:flex-start;padding-top:14px;border-top:1px solid rgba(180,83,9,.22)}
    .st-all em{font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.06em;color:${PRIMARY};padding-top:2px}
    .st-all b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;color:${DEEP};margin-bottom:3px}
    .st-all p{margin:0;font-size:14.5px;line-height:1.55;color:${MUTED}}
    .st-scene{height:auto;min-height:520px}
    .st-chip.c2{left:0}.st-chip.c3{right:0}
    .wt{grid-template-columns:1fr;gap:26px}
    .wt-pic{min-height:360px}
    .wt-h{margin-top:56px!important;--h3-size:24px}
  }
  @media (max-width:640px){
    .st-in{border-radius:28px;padding:44px 20px 36px}.st-sec{padding:0 12px 12px}
    .wt-path{left:10px;right:10px;bottom:10px;padding:10px 12px}
    .wt-path li{font-size:11px;gap:5px}
    .wt-path li i{width:20px;height:20px;font-size:11px}
    .wt-path li:not(:last-child)::before{left:23px;top:9px}
    .lc-close{font-size:17px}
  }
`;
