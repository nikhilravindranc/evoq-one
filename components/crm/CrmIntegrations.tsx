"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { BLUE, BODY, INK, LINE } from "./palette";

/* Integrations: the tools a sales team already uses, shown on three soft arcs around the CRM. The logos are the ones the site's
   integrations page already shows. Copy rules: no absolutes, no counts, no stock phrases. */

const ARCS = [120, 190, 260];
/* radius index, angle in degrees from the right, logo */
const LOGOS: { r: number; a: number; src: string; name: string }[] = [
  { r: 0, a: 148, src: "/site/images/logos-gmail.svg", name: "Gmail" },
  { r: 0, a: 32, src: "/site/images/logos-googlecalendar.svg", name: "Google Calendar" },
  { r: 1, a: 163, src: "/site/images/logos-microsoft365.svg", name: "Microsoft 365" },
  { r: 1, a: 90, src: "/site/images/logos-slack.svg", name: "Slack" },
  { r: 1, a: 17, src: "/site/images/logos-whatsapp.svg", name: "WhatsApp" },
  { r: 2, a: 150, src: "/site/images/logos-microsoftteams.svg", name: "Microsoft Teams" },
  { r: 2, a: 62, src: "/site/images/logos-stripe.svg", name: "Stripe" },
  { r: 2, a: 26, src: "/site/images/logos-quickbooks.svg", name: "QuickBooks" },
];

const W = 560;
const H = 310;
const CX = W / 2;
const CY = H - 10;

export function CrmIntegrations() {
  return (
    <section id="integrations" className="ig-sec" aria-labelledby="ig-h2">
      <style>{css}</style>
      <div className="ig-in">
        <div className="ig-copy">
          <h2 id="ig-h2" className="ig-h2"><span className="l">Connect the tools</span> <span className="b">you use.</span></h2>
          <p>Email, calendars, messages, payments and accounts connect to the CRM through EVOQ Sync, so a record keeps up with the work without retyping.</p>
          <div className="ig-tags" aria-label="What connects">
            {["Email", "Calendar", "Messaging", "Payments", "Accounting"].map((t) => <em key={t}>{t}</em>)}
          </div>
          <Link href="/integrations" className="ig-link">See the integrations<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
        </div>

        <div className="ig-vis" aria-hidden="true">
          <div className="ig-box" style={{ aspectRatio: `${W} / ${H}` }}>
            {ARCS.map((r, i) => (
              <i key={r} className="ig-arc" style={{ width: `${((r * 2) / W) * 100}%`, height: `${(r / H) * 100}%`, left: `${((CX - r) / W) * 100}%`, top: `${((CY - r) / H) * 100}%`, opacity: 1 - i * 0.18 }} />
            ))}
            {LOGOS.map((l, n) => {
              const rad = (l.a * Math.PI) / 180;
              const x = CX + ARCS[l.r] * Math.cos(rad);
              const y = CY - ARCS[l.r] * Math.sin(rad);
              return (
                <span key={l.name} className="ig-badge" style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, animationDelay: `${n * -0.7}s` }}>
                  <img src={l.src} alt="" width={26} height={26} loading="lazy" />
                </span>
              );
            })}
            <span className="ig-core" style={{ left: `${(CX / W) * 100}%`, top: `${(CY / H) * 100}%` }}>
              <img src="/site/images/crm-menu-icn.png" alt="" width={34} height={34} loading="lazy" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .ig-sec{background:#fff;padding:64px 0 24px}
  .ig-in{max-width:1300px;margin:0 auto;padding:0 20px;display:grid;gap:40px;align-items:center}
  .ig-sec .ig-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0;text-wrap:balance}
  .ig-h2 .l{font-weight:400;color:#5C6785}
  .ig-copy p{margin:18px 0 0;max-width:34em;font-size:18px;line-height:1.6;color:${BODY}}
  .ig-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
  .ig-tags em{font-style:normal;padding:9px 16px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px #CBD4E6;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;line-height:1.2;color:${INK}}
  .ig-link{display:inline-flex;align-items:center;gap:8px;margin-top:28px;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;color:${BLUE};text-decoration:none}
  .ig-link:hover{text-decoration:underline;text-underline-offset:4px}
  .ig-link:focus-visible{outline:3px solid ${BLUE};outline-offset:4px;border-radius:6px}
  .ig-vis{display:flex;justify-content:center}
  .ig-box{position:relative;width:100%;max-width:600px}
  .ig-arc{position:absolute;display:block;border-radius:999px 999px 0 0;background:linear-gradient(180deg,#EDF0F6,#F7F8FC);box-shadow:inset 0 0 0 1px rgba(15,27,61,.03)}
  .ig-badge{position:absolute;width:12%;max-width:58px;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 22px -10px rgba(15,27,61,.4),0 0 0 1px ${LINE};animation:igFloat 6s ease-in-out infinite alternate}
  .ig-badge img{width:46%;height:46%;object-fit:contain}
  .ig-core{position:absolute;width:15%;max-width:72px;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 28px -10px rgba(29,78,216,.55),0 0 0 4px #BCD3FB}
  .ig-core img{width:56%;height:56%;object-fit:contain}
  @keyframes igFloat{from{margin-top:-3px}to{margin-top:3px}}
  @media (prefers-reduced-motion:reduce){.ig-badge{animation:none}}
  @media (min-width:640px){.ig-in{padding:0 24px}.ig-sec{padding:80px 0 32px}}
  @media (min-width:960px){.ig-in{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px}}
  @media (min-width:1024px){.ig-sec{padding:96px 0 40px}}
`;
