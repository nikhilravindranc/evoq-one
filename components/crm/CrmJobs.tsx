"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { BLUE, BLUE_DEEP } from "./palette";
import { END, JobStory } from "./CrmJobStories";

/* EVI and agents together (docs/crm-new-content.md, Section E). Built like the Growth tab of the home hero: the heading, the description and four job
   pills on the left, one story card on the right. Each pill plays one short story in the card. The four stories play once, one after the other, when the
   section first comes into view, and then rest. They never loop. A click on a pill plays that job again, once. With reduced motion the card shows the
   finished story and the pills still switch it. */

const I = (d: ReactNode) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const JOBS = [
  { name: "Nudge idle proposals", line: "EVI flags proposals with no reply, and the agent prepares the follow up.", done: "3 follow ups sent" },
  { name: "Respond to new leads", line: "EVI shows the new leads, and the agent scores, assigns and moves them along.", done: "3 leads moved to Contacted" },
  { name: "Prepare meeting briefs", line: "EVI pulls the account history, and the agent puts the brief on the record before the call.", done: "Brief on the Northgate record" },
  { name: "Chase renewals", line: "EVI flags renewals approaching their date, and the agent drafts the reminder.", done: "3 reminders sent" },
];

export function CrmJobs() {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [job, setJob] = useState(0);
  const [run, setRun] = useState(0);
  const [started, setStarted] = useState(false);
  const [chain, setChain] = useState(true); // true until the visitor clicks a pill
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = panel.current;
    if (!el || typeof IntersectionObserver === "undefined") { setStarted(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduce) return;
    setPlaying(true);
    const stop = window.setTimeout(() => setPlaying(false), (END + 0.9) * 1000);
    let next: number | undefined;
    if (chain && job < JOBS.length - 1) next = window.setTimeout(() => setJob((j) => j + 1), (END + 1.8) * 1000);
    return () => { window.clearTimeout(stop); if (next) window.clearTimeout(next); };
  }, [started, job, run, chain, reduce]);

  const pick = (n: number) => {
    setChain(false); setStarted(true); setJob(n); setRun((r) => r + 1);
    // when the story sits below the list (narrow screens), bring it into view
    if (window.innerWidth < 1024) panel.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };
  const J = JOBS[job];

  return (
    <section id="jobs" className="jb-sec" aria-labelledby="jb-h2">
      <style>{css}</style>
      <div className="jb-in">
        <div className="jb-left">
          <h2 id="jb-h2" className="jb-h2"><span className="l">EVI finds the follow ups,</span> <span className="b">and agents prepare them.</span></h2>
          <p className="jb-p">EVI, the EVOQ AI assistant, finds stalled deals and overdue follow ups. Agents handle defined tasks, then return the result for your review.</p>
          <p className="jb-pick">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v14M6 12l6 6 6-6" /></svg>
            Pick a job to see it play
          </p>
          <div className="jb-list" role="group" aria-label="Jobs EVI and the agents do">
            {JOBS.map((j, n) => {
              const on = n === job;
              const mark = on && playing ? <i className="jb-live" aria-hidden="true" /> : I(<path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />);
              return (
                <button key={j.name} type="button" className={`jb-item${on ? " on" : ""}`} aria-pressed={on} onClick={() => pick(n)}>
                  <span className="jb-t">{mark}{j.name}</span>
                  {on && <span className="jb-d">{j.line}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="jb-panel" ref={panel} role="group" aria-label={`A story of EVI at work in EVOQ CRM: ${J.name}`}>
          <JobStory key={`${job}-${run}`} job={job} />
        </div>
        <p className="sr-only" aria-live="polite">{started && !playing ? `${J.name}: ${J.done}` : ""}</p>
      </div>
    </section>
  );
}

const css = `
  @keyframes jbPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
  .sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
  .jb-sec{position:relative;background:${BLUE};color:#fff;padding:56px 0 64px;overflow:hidden}
  .jb-sec::before{content:"";position:absolute;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(70,110,240,.5),rgba(70,110,240,0) 68%);right:-180px;top:-260px;pointer-events:none}
  .jb-sec::after{content:"";position:absolute;inset:0;background:radial-gradient(rgba(255,255,255,.09) 1.2px,transparent 1.5px) 0 0/26px 26px;pointer-events:none;-webkit-mask-image:linear-gradient(180deg,#000,transparent 75%);mask-image:linear-gradient(180deg,#000,transparent 75%)}
  .jb-in{position:relative;z-index:1;max-width:1300px;margin:0 auto;padding:0 20px;display:grid;gap:32px;align-items:center}
  .jb-sec .jb-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:#fff;margin:0;text-wrap:balance}
  .jb-sec .jb-h2 .l{font-weight:400;color:rgba(255,255,255,.66)}
  .jb-sec .jb-p{margin:16px 0 0;font-size:17px;line-height:1.6;color:rgba(255,255,255,.78);max-width:52ch}
  .jb-sec .jb-pick{display:flex;align-items:center;gap:8px;margin:26px 0 12px;font-size:14.5px;font-weight:600;color:#fff}
  .jb-pick svg{animation:jbPulse 1.8s ease-in-out infinite}
  .jb-list{display:grid;gap:10px;justify-items:start}
  .jb-item{all:unset;box-sizing:border-box;cursor:pointer;display:block;padding:11px 20px 11px 16px;border-radius:999px;background:rgba(255,255,255,.1);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22);color:#fff;transition:background-color .25s ease,box-shadow .25s ease,transform .25s ease}
  .jb-item:hover{background:rgba(255,255,255,.2);box-shadow:inset 0 0 0 1px rgba(255,255,255,.5);transform:translateY(-1px)}
  .jb-item:focus-visible{outline:3px solid #fff;outline-offset:3px}
  .jb-t{display:flex;align-items:center;gap:10px;font-size:15.5px;font-weight:600;line-height:1.3}
  .jb-t svg{flex:none;color:#fff}
  .jb-item.on{width:100%;max-width:460px;border-radius:20px;padding:16px 20px 18px;background:#fff;color:${BLUE_DEEP};box-shadow:0 18px 34px -16px rgba(0,0,0,.6)}
  .jb-item.on:hover{transform:none}
  .jb-item.on .jb-t svg{color:${BLUE}}
  .jb-sec .jb-d{display:block;margin:8px 0 0 26px;font-size:14.5px;line-height:1.55;font-weight:400;color:#44506B}
  .jb-live{flex:none;width:10px;height:10px;margin:0 3px;border-radius:50%;background:${BLUE};animation:jbPulse 1.2s ease-in-out infinite}
  .jb-panel{min-width:0;border-radius:26px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16);padding:14px 16px}

  @media (min-width:640px){.jb-in{padding:0 24px}.jb-sec{padding:64px 0 72px}}
  @media (min-width:1024px){
    .jb-sec{padding:72px 0 80px}
    .jb-in{grid-template-columns:minmax(0,1fr) 560px;gap:56px}
  }
  @media (prefers-reduced-motion:reduce){.jb-pick svg,.jb-live{animation:none}}
`;
