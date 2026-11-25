"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { BLUE, BODY, INK, LINE, MINT } from "./palette";

/* Works with EVOQ (docs/crm-new-content.md, Section H): a closed deal moves on to billing, projects, support, quotes and campaigns.
   The claim is the shared login only; what data moves between the apps stays out until it is confirmed. */

const APPS = [
  { name: "Billing", line: "Invoice the deals you win.", logo: "billing-menu-icn.png" },
  { name: "Projects", line: "Plan the work that starts after the close.", logo: "evoq-projects-menu-icn.png" },
  { name: "Desk", line: "Support the customers you sold to.", logo: "desk-menu-icn.png" },
  { name: "ConfigX", line: "Configure products and price the quote.", logo: "ConfigX-menu-icn.png" },
  { name: "Campaigns", line: "Reach the segments you built in the CRM.", logo: "campaigns-menu-icn.png" },
];

export function CrmConnected() {
  return (
    <section id="connected" className="cn-sec" aria-labelledby="cn-h2">
      <style>{css}</style>
      <div className="cn-in">
        <div className="cn-head">
          <h2 id="cn-h2" className="cn-h2"><span className="l">Hand a won deal</span> <span className="b">to billing, projects and support.</span></h2>
          <p>EVOQ CRM shares a login with your other EVOQ apps.</p>
        </div>

        <div className="cn-flow">
          <div className="cn-crm">
            <span className="cn-crm-logo"><img src="/site/images/crm-menu-icn.png" alt="" width={44} height={44} /></span>
            <b>EVOQ CRM</b>
            <span className="cn-won"><i />Deal won</span>
          </div>
          <div className="cn-arrow" aria-hidden="true"><svg viewBox="0 0 120 24" preserveAspectRatio="none"><path d="M2 12h108" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" /><path d="M104 5l12 7l-12 7" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <ul className="cn-apps">
            {APPS.map((a) => (
              <li key={a.name} className="cn-app">
                <img src={`/site/images/${a.logo}`} alt="" width={44} height={44} />
                <h3>{a.name}</h3>
                <p>{a.line}</p>
              </li>
            ))}
            <li className="cn-app cn-all">
              <Link href="/products">All EVOQ apps<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              <p>See what else connects to your CRM.</p>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}

const css = `
  .cn-sec{background:#fff;padding:64px 0 72px;scroll-margin-top:16px}
  .cn-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .cn-head{margin-bottom:34px}
  .cn-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0;text-wrap:balance}
  .cn-h2 .l{font-weight:400;color:#5C6785}
  .cn-head p{margin:16px 0 0;font-size:18px;line-height:1.6;color:${BODY}}

  .cn-flow{display:grid;gap:16px;align-items:stretch;--h3-size:19px}
  .cn-crm{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:26px;border-radius:28px;background:linear-gradient(160deg,#1D4ED8,#0C2472);color:#fff;box-shadow:0 24px 54px -26px rgba(12,36,114,.6)}
  .cn-crm-logo{width:64px;height:64px;border-radius:20px;background:#fff;display:flex;align-items:center;justify-content:center}
  .cn-crm b{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;font-weight:600}
  .cn-won{display:inline-flex;align-items:center;gap:8px;margin-top:auto;padding:5px 14px;border-radius:999px;background:rgba(255,255,255,.16);font-size:13px;font-weight:600}
  .cn-won i{width:8px;height:8px;border-radius:50%;background:${MINT}}
  .cn-arrow{display:none}
  .cn-apps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .cn-app{display:flex;flex-direction:column;gap:6px;padding:20px;border-radius:24px;background:#F5F7FC;border:1px solid ${LINE};transition:transform .25s ease,box-shadow .25s ease,background-color .25s ease}
  .cn-app:hover{transform:translateY(-3px);background:#fff;box-shadow:0 20px 40px -24px rgba(15,27,61,.35)}
  .cn-app img{border-radius:12px;margin-bottom:8px}
  .cn-all{justify-content:center;background:transparent;border:1.5px dashed #B8C4DF}
  .cn-all a{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;color:${INK};text-decoration:none}
  .cn-all a:focus-visible{outline:3px solid ${BLUE};outline-offset:3px;border-radius:6px}
  .cn-all:hover a{color:${BLUE}}
  .cn-app h3{font-weight:600;letter-spacing:normal;margin:0}
  .cn-app p{margin:0;font-size:14.5px;line-height:1.5;color:${BODY}}


  @media (min-width:640px){.cn-in{padding:0 24px}.cn-sec{padding:80px 0 88px}.cn-apps{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media (min-width:1024px){
    .cn-sec{padding:96px 0 104px}
    .cn-flow{grid-template-columns:260px 90px minmax(0,1fr);gap:0}
    .cn-arrow{display:flex;align-items:center;justify-content:center;padding:0 8px}
    .cn-arrow svg{width:100%;height:24px}
    .cn-apps{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
  }
  @media (min-width:1200px){.cn-flow{grid-template-columns:280px 100px minmax(0,1fr)}}
`;
