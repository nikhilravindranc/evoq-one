"use client";
/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { BLUE_DEEP } from "./palette";

/* EVI and agents together (docs/crm-new-content.md, Section E): EVI, the assistant, finds what needs attention, and four agents
   prepare the routine jobs inside the roles and approval rules. A deep blue band between the light sections. */

const I = (d: ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const JOBS = [
  { name: "Nudge idle proposals", line: "EVI flags proposals with no reply, and the agent prepares the follow up.", icon: I(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>) },
  { name: "Respond to new leads", line: "EVI shows the new leads, and the agent scores, assigns and moves them along.", icon: I(<><circle cx="9" cy="8" r="4" /><path d="M3 21v-1a6 6 0 0 1 6-6h2" /><path d="M19 8v6M16 11h6" /></>) },
  { name: "Prepare meeting briefs", line: "EVI pulls the account history, and the agent puts the brief on the record before the call.", icon: I(<><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /><path d="M8 14h4" /></>) },
  { name: "Chase renewals", line: "EVI flags renewals approaching their date, and the agent drafts the reminder.", icon: I(<><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" /><path d="M20 20v-4h-4" /></>) },
];

export function CrmJobs() {
  return (
    <section id="jobs" className="jb-sec" aria-labelledby="jb-h2">
      <style>{css}</style>
      <div className="jb-in">
        <div className="jb-head">
          <h2 id="jb-h2" className="jb-h2"><span className="l">EVI finds the follow ups,</span> <span className="b">and agents prepare them.</span></h2>
          <p>EVI, the EVOQ AI assistant, finds stalled deals and overdue follow ups. Agents handle defined tasks, then return the result for your review.</p>
        </div>
        <div className="jb-chat" aria-label="An example of EVI at work">
          <div className="jb-q"><small>You</small><p>What should I focus on this week?</p></div>
          <div className="jb-a">
            <div className="jb-evi"><img src="/symbol-color.png" alt="" width={20} height={20} /><b>EVI</b></div>
            <p>3 proposals are waiting on a reply and 2 renewals close within 14 days.</p>
          </div>
        </div>
        <div className="jb-via" aria-hidden="true"><i /><span>Then the agents prepare the work</span><i /></div>
        <div className="jb-grid">
          {JOBS.map((j, n) => (
            <article key={j.name} className="jb-card">
              <div className="jb-top">
                <span className="jb-ico">{j.icon}</span>
                <span className="jb-n">{String(n + 1).padStart(2, "0")}</span>
              </div>
              <h3>{j.name}</h3>
              <p>{j.line}</p>
              <em className="jb-tag">Agent prepares, you review</em>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const css = `
  .jb-sec{position:relative;background:${BLUE_DEEP};color:#fff;padding:64px 0 72px;overflow:hidden}
  .jb-sec::before{content:"";position:absolute;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(70,110,240,.5),rgba(70,110,240,0) 68%);right:-180px;top:-260px;pointer-events:none}
  .jb-sec::after{content:"";position:absolute;inset:0;background:radial-gradient(rgba(255,255,255,.09) 1.2px,transparent 1.5px) 0 0/26px 26px;pointer-events:none;-webkit-mask-image:linear-gradient(180deg,#000,transparent 75%);mask-image:linear-gradient(180deg,#000,transparent 75%)}
  .jb-in{position:relative;z-index:1;max-width:1300px;margin:0 auto;padding:0 20px}
  .jb-head{margin-bottom:34px}
  .jb-sec .jb-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:#fff;margin:0;text-wrap:balance}
  .jb-sec .jb-h2 .l{font-weight:400;color:rgba(255,255,255,.66)}
  .jb-head p{margin:16px 0 0;font-size:18px;line-height:1.6;color:rgba(255,255,255,.78)}
  .jb-chat{display:grid;gap:12px;margin-bottom:6px}
  .jb-q,.jb-a{border-radius:22px;padding:16px 20px}
  .jb-q{background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);justify-self:start;max-width:420px}
  .jb-q small{display:block;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6)}
  .jb-q p{margin:4px 0 0;font-size:17px;font-weight:600;color:#fff}
  .jb-a{background:#fff;color:${BLUE_DEEP};box-shadow:0 22px 44px -26px rgba(0,0,0,.6);max-width:620px}
  .jb-evi{display:flex;align-items:center;gap:8px}
  .jb-evi b{font-size:13px;font-weight:700;letter-spacing:.04em}
  .jb-evi img{width:20px;height:20px;object-fit:contain}
  .jb-a p{margin:8px 0 0;font-size:16.5px;line-height:1.55;color:#1F2A4A}
  .jb-via{display:flex;align-items:center;gap:14px;margin:22px 0 22px}
  .jb-via i{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4))}
  .jb-via i:last-child{background:linear-gradient(90deg,rgba(255,255,255,.4),transparent)}
  .jb-via span{font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.72);white-space:nowrap}
  .jb-tag{margin-top:auto;align-self:flex-start;font-style:normal;font-size:12px;font-weight:600;color:#fff;background:rgba(255,255,255,.14);padding:5px 11px;border-radius:99px}
  .jb-card p{margin-bottom:10px!important}
  .jb-grid{display:grid;gap:14px;--h3-size:22px}
  .jb-card{display:flex;flex-direction:column;gap:10px;padding:24px 24px 28px;border-radius:26px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:background-color .25s ease,transform .25s ease}
  .jb-card:hover{background:rgba(255,255,255,.11);transform:translateY(-3px)}
  .jb-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
  .jb-ico{width:48px;height:48px;border-radius:16px;background:#fff;color:${BLUE_DEEP};display:flex;align-items:center;justify-content:center}
  .jb-n{font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;letter-spacing:.06em;color:rgba(255,255,255,.5)}
  .jb-sec .jb-card h3{color:#fff;font-weight:600}
  .jb-card p{margin:0;font-size:15.5px;line-height:1.55;color:rgba(255,255,255,.78)}
  @media (min-width:900px){.jb-chat{grid-template-columns:minmax(0,420px) minmax(0,620px);align-items:center;gap:28px}}
  @media (max-width:520px){.jb-via span{white-space:normal;text-align:center}}
  @media (min-width:640px){.jb-in{padding:0 24px}.jb-sec{padding:80px 0 88px}.jb-grid{grid-template-columns:repeat(2,1fr)}}
  @media (min-width:1024px){.jb-sec{padding:96px 0 104px}.jb-grid{grid-template-columns:repeat(4,1fr);gap:16px}.jb-card{padding:28px 26px}}
`;
