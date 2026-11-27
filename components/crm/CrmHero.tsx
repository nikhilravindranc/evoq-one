"use client";
/* eslint-disable @next/next/no-img-element */

import { useCrmDemo } from "./CrmShell";
import { BLUE, BODY, CORAL_DEEP, CORAL_TINT, INK, LINE, MINT, MINT_DEEP, MINT_TINT, MUTED, TINT, TINT_SOFT } from "./palette";

/* Hero for CRM. A two weight headline, a short description, and the story in three static steps, left to right, told from the sales head's
   seat: the sales head sees the quiet deals by owner, the deal owners get drafted follow ups, the owners review and send them.
   No motion, no photographs beyond one small portrait, and no mention of EVI or the agents; the section below introduces them.
   The names and numbers are a use case that explains the situation, not figures from the product. */

const OWNERS = [
  { n: "Priya M", deals: 3 },
  { n: "Marcus L", deals: 2 },
  { n: "Anita R", deals: 1 },
];

const Arrow = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export function CrmHero() {
  const demo = useCrmDemo();
  return (
    <section className="cv-hero" aria-labelledby="cv-h1">
      <style>{css}</style>
      <div className="cv-in">
        <div className="cv-head">
          <div>
            <h1 id="cv-h1" className="cv-h1">
              <span className="l">How many deals</span>
              <span className="b">went quiet this week?</span>
            </h1>
          </div>
          <div className="cv-side">
            <p>Sales heads see which deals stalled, and deal owners get drafted follow ups to review and send.</p>
            <div className="cv-cta">
              <button type="button" className="cv-btn primary" onClick={() => demo("hero", "Book a demo")}>Book a demo</button>
              <a href="#features" className="cv-btn ghost">See how it works</a>
            </div>
          </div>
        </div>

        <ol className="cs-steps" aria-label="The sales head sees six quiet deals by owner, the deal owners get drafted follow ups, and the owners review and send them">
          <li className="cs-card">
            <div className="cs-top"><span className="cs-n">1</span><b>The sales head sees</b></div>
            <p className="cs-big">6 quiet deals</p>
            <ul className="cs-list">
              {OWNERS.map((o) => (
                <li key={o.n}><span>{o.n}</span><em className="quiet">{o.deals} {o.deals === 1 ? "deal" : "deals"}</em></li>
              ))}
            </ul>
            <small className="cs-more">No reply for more than a week</small>
          </li>

          <li className="cs-arrow" aria-hidden="true"><Arrow /></li>

          <li className="cs-card">
            <div className="cs-top"><span className="cs-n">2</span><b>Deal owners get drafts</b></div>
            <p className="cs-big">6 follow ups</p>
            <ul className="cs-list">
              {OWNERS.map((o) => (
                <li key={o.n}><span>{o.n}</span><em className="draft">{o.deals} {o.deals === 1 ? "draft" : "drafts"}</em></li>
              ))}
            </ul>
            <small className="cs-more">Written from the deal history</small>
          </li>

          <li className="cs-arrow" aria-hidden="true"><Arrow /></li>

          <li className="cs-card cs-last">
            <div className="cs-top"><span className="cs-n">3</span><b>Owners review and send</b></div>
            <div className="cs-who">
              <img src="/crm/priya.webp" alt="" width={48} height={48} loading="eager" decoding="async" />
              <span><b>Priya M</b><small>Deal owner</small></span>
            </div>
            <p className="cs-say">Reads her 3 drafts, edits where needed and sends.</p>
            <span className="cs-approve" aria-hidden="true">Review and send</span>
          </li>
        </ol>
      </div>
    </section>
  );
}

const css = `
  .cv-hero{padding:8px 0 28px}
  .cv-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .cv-head{display:grid;gap:22px;margin:12px 0 28px}
  .cv-h1{font-size:var(--h1-size);line-height:1.08;letter-spacing:-.03em;font-weight:700}
  .cv-h1 span{display:block;text-wrap:balance}
  .cv-h1 .l{font-weight:400;color:#5C6785}
  .cv-h1 .b{font-weight:700;color:${INK}}
  .cv-side p{font-size:15.5px;line-height:1.55;color:${BODY};max-width:46ch}
  .cv-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}

  .cs-steps{list-style:none;margin:0;padding:18px;border-radius:26px;background:${TINT};display:grid;gap:10px;align-items:stretch}
  .cs-card{display:flex;flex-direction:column;gap:12px;background:#fff;border-radius:20px;padding:20px 22px 22px;box-shadow:0 0 0 1px rgba(15,27,61,.06)}
  .cs-top{display:flex;align-items:center;gap:10px;font-size:14px;color:${INK}}
  .cs-top b{font-weight:600}
  .cs-n{flex:none;width:26px;height:26px;border-radius:50%;background:${BLUE};color:#fff;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center}
  .cs-big{margin:2px 0 0;font-family:var(--font-display),system-ui,sans-serif;font-size:30px;line-height:1.1;font-weight:600;letter-spacing:-.02em;color:${INK}}
  .cs-list{list-style:none;margin:0;padding:0;display:grid;gap:0}
  .cs-list li{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid ${LINE};font-size:14px;line-height:1.3;color:${INK}}
  .cs-list li span{font-weight:600;white-space:nowrap}
  .cs-list em{font-style:normal;font-size:12.5px;font-weight:600;padding:3px 10px;border-radius:999px;white-space:nowrap}
  .cs-list em.quiet{background:${CORAL_TINT};color:${CORAL_DEEP}}
  .cs-list em.draft{background:${TINT_SOFT};color:${BLUE}}
  .cs-more{margin-top:auto;font-size:12.5px;color:${MUTED}}
  .cs-arrow{display:flex;align-items:center;justify-content:center;color:${BLUE};transform:rotate(90deg);height:24px}
  .cs-last{background:#fff}
  .cs-who{display:flex;align-items:center;gap:12px}
  .cs-who img{width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:50% 12%;flex:none;box-shadow:0 0 0 3px ${MINT_TINT}}
  .cs-who b{display:block;font-size:15px;font-weight:600;color:${INK}}
  .cs-who small{display:block;font-size:12.5px;color:${MUTED};margin-top:1px}
  .cs-say{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:22px;line-height:1.25;font-weight:600;letter-spacing:-.015em;color:${INK}}
  .cs-approve{margin-top:auto;align-self:flex-start;display:inline-flex;align-items:center;min-height:40px;padding:0 22px;border-radius:999px;background:${MINT};color:#fff;font-size:14px;font-weight:600}
  .cs-last .cs-top .cs-n{background:${MINT_DEEP}}

  @media (min-width:640px){
    .cv-in{padding:0 24px}
    .cs-steps{padding:22px}
  }
  @media (min-width:1024px){
    .cv-hero{padding:12px 0 44px}
    .cv-head{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:end;gap:48px;margin:20px 0 44px}
    .cs-steps{grid-template-columns:minmax(0,1fr) 28px minmax(0,1fr) 28px minmax(0,1fr);gap:8px;padding:26px}
    .cs-arrow{transform:none;height:auto}
    .cs-card{padding:24px 26px 26px}
    .cs-big{font-size:34px}
  }
`;
