"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import { CrmV1Close } from "./CrmV1Close";
import { CrmV1Shell, useCrmDemo } from "./CrmV1Shell";
import { ANNUAL_OFF, COMPARE, FAQ, PLANS, PRICE_FACTORS, REGIONS, type Plan, type RegionKey } from "./pricingData";
import { BLUE, BODY, INK, LINE, MUTED, TINT } from "./palette";

/* The CRM v1 pricing page (docs/crm-v1-pricing-plan.md): a hero, the three plans with a monthly and annual switch and a region switch,
   a comparison split into tabs, what changes the price, questions, and the closing demo card. Every plan button books a demo. */

const Tick = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

function price(region: RegionKey, key: "pro" | "max", annual: boolean) {
  const r = REGIONS[region];
  const v = (key === "pro" ? r.pro : r.max) * (annual ? 1 - ANNUAL_OFF : 1);
  if (region === "in") return `${r.sym}${Math.round(v).toLocaleString("en-IN")}`;
  return `${r.sym}${Number.isInteger(Math.round(v * 100) / 100) ? Math.round(v * 100) / 100 : (Math.round(v * 100) / 100).toFixed(2)}`;
}

function PricingHero() {
  return (
    <section className="ph" aria-labelledby="ph-h1">
      <style>{css}</style>
      <div className="ph-in">
        <div className="ph-copy">
          <span className="ph-eyebrow">EVOQ CRM pricing</span>
          <h1 id="ph-h1" className="ph-h1">Plans for the size of your sales team.</h1>
          <p>Pay per user, billed monthly or annually. Book a demo and we will walk through the plan that fits.</p>
        </div>
        <div className="ph-vis">
          <div className="ph-photo"><img src="/crm-v1/photos/team.webp" alt="A sales team reviewing work together around a table" /></div>
          <div className="ph-card c1"><b>Users</b><span>Add or remove users at any time</span></div>
          <div className="ph-card c2"><b>Annual billing</b><span>15% off the monthly price</span></div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ p, region, annual }: { p: Plan; region: RegionKey; annual: boolean }) {
  const demo = useCrmDemo();
  const custom = p.key === "enterprise";
  return (
    <article className={`pl-card${p.key === "max" ? " lift" : ""}`} aria-labelledby={`pl-${p.key}`}>
      <span className="pl-tag">{p.name}</span>
      <h3 id={`pl-${p.key}`} className="pl-fit">{p.fit}</h3>
      <div className="pl-price">
        {custom ? (
          <>
            <b className="cu">Custom pricing</b>
            <span>Based on your users and implementation needs</span>
          </>
        ) : (
          <>
            <b>{price(region, p.key as "pro" | "max", annual)}</b>
            <span>per user a month, billed {annual ? "annually" : "monthly"}</span>
          </>
        )}
      </div>
      <button type="button" className="pl-btn" onClick={() => demo(`plan_${p.key}`, "Book a demo")}>Book a demo</button>
      <p className="pl-lab">Included</p>
      <ul className="pl-list">
        {p.included.map((t) => <li key={t}><i><Tick /></i>{t}</li>)}
      </ul>
      <div className="pl-chips">{p.limits.map((t) => <em key={t}>{t}</em>)}</div>
    </article>
  );
}

function Plans() {
  const [region, setRegion] = useState<RegionKey>("in");
  const [annual, setAnnual] = useState(true);
  return (
    <section id="plans" className="pl-sec" aria-label="Plans">
      <div className="pl-in">
        <div className="pl-ctl">
          <div className="seg" role="group" aria-label="Billing">
            <button type="button" className={!annual ? "on" : ""} aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
            <button type="button" className={annual ? "on" : ""} aria-pressed={annual} onClick={() => setAnnual(true)}>Annual<em>Save 15%</em></button>
          </div>
          <div className="seg" role="group" aria-label="Region">
            {(Object.keys(REGIONS) as RegionKey[]).map((k) => (
              <button key={k} type="button" className={region === k ? "on" : ""} aria-pressed={region === k} onClick={() => setRegion(k)}>{REGIONS[k].label}<small>{REGIONS[k].sym} {REGIONS[k].code}</small></button>
            ))}
          </div>
        </div>
        <div className="pl-grid">
          {PLANS.map((p) => <PlanCard key={p.key} p={p} region={region} annual={annual} />)}
        </div>
        <p className="pl-note">Prices are per user a month. Applicable taxes, including GST, VAT, sales tax or other local indirect taxes, are charged in addition.</p>
      </div>
    </section>
  );
}

function Compare() {
  const [g, setG] = useState(0);
  const [diff, setDiff] = useState(true);
  const group = COMPARE[g];
  const rows = diff ? group.rows.filter((r) => !(r[1] === r[2] && r[2] === r[3])) : group.rows;
  const cell = (v: string) => (v === "Y" ? <span className="cp-y"><Tick s={13} /></span> : v === "-" ? <span className="cp-n">Not included</span> : <span className="cp-t">{v}</span>);
  return (
    <section id="compare" className="cp-sec" aria-labelledby="cp-h2">
      <div className="cp-in">
        <h2 id="cp-h2" className="cp-h2"><span className="l">Compare</span> <span className="b">the plans.</span></h2>
        <p className="cp-sub">See what changes from Pro to Enterprise, a group at a time.</p>
        <div className="cp-bar">
          <div className="cp-tabs" role="tablist" aria-label="Comparison groups">
            {COMPARE.map((x, n) => (
              <button key={x.k} type="button" role="tab" aria-selected={n === g} className={n === g ? "on" : ""} onClick={() => setG(n)}>{x.k}</button>
            ))}
          </div>
          <label className="cp-sw"><input type="checkbox" checked={diff} onChange={(e) => setDiff(e.target.checked)} /><span aria-hidden="true" />Show only what differs</label>
        </div>
        <div className="cp-card" role="tabpanel">
          <table>
            <thead><tr><th scope="col"><span className="sr">Feature</span></th><th scope="col">Pro</th><th scope="col" className="mx">Max</th><th scope="col">Enterprise</th></tr></thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={4} className="cp-empty">The plans are the same in this group.</td></tr>}
              {rows.map((r) => (
                <tr key={r[0]}><th scope="row">{r[0]}</th><td>{cell(r[1])}</td><td className="mx">{cell(r[2])}</td><td>{cell(r[3])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Factors() {
  return (
    <section className="wc-sec" aria-labelledby="wc-h2">
      <div className="wc-in">
        <h2 id="wc-h2" className="wc-h2"><span className="l">What changes</span> <span className="b">the price.</span></h2>
        <div className="wc-grid">
          {PRICE_FACTORS.map((f) => (
            <article key={f.t} className="wc-card">
              <span className="wc-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={f.icon} /></svg></span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
              {f.t === "Implementation" && <Link href="/implementation" className="wc-link">See implementation details<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section id="questions" className="fq-sec" aria-labelledby="fq-h2">
      <div className="fq-in">
        <h2 id="fq-h2" className="fq-h2"><span className="l">Questions</span> <span className="b">about pricing.</span></h2>
        <div className="fq-list">
          {FAQ.map((f) => (
            <details key={f.q} className="fq-item">
              <summary>{f.q}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrmV1PricingPage() {
  return (
    <CrmV1Shell active="pricing" hero={<PricingHero />}>
      <style>{css}</style>
      <Plans />
      <Compare />
      <Factors />
      <Questions />
      <CrmV1Close />
    </CrmV1Shell>
  );
}

const css = `
  .ph{padding:8px 0 28px}
  .ph-in{max-width:1300px;margin:0 auto;padding:0 20px;display:grid;gap:28px;align-items:center}
  .ph-eyebrow{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${BLUE};margin-bottom:14px}
  .ph .ph-h1{font-size:var(--h1-size);line-height:1.08;letter-spacing:-.03em;font-weight:700;color:${INK};text-wrap:balance;max-width:14ch}
  .ph-copy p{margin:20px 0 0;font-size:18px;line-height:1.6;color:${BODY};max-width:42ch}
  .ph-vis{position:relative;height:360px}
  .ph-vis::before{content:"";position:absolute;right:-10%;top:-12%;width:80%;height:130%;border-radius:50%;background:radial-gradient(closest-side,rgba(29,78,216,.16),rgba(29,78,216,0));pointer-events:none}
  .ph-photo{position:absolute;right:0;top:0;width:84%;height:100%;border-radius:28px;overflow:hidden;background:#BCD3FB;box-shadow:0 36px 70px -34px rgba(15,27,61,.55)}
  .ph-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 40%}
  .ph-card{position:absolute;display:grid;gap:2px;padding:12px 16px;border-radius:16px;background:#fff;box-shadow:0 22px 40px -22px rgba(15,27,61,.5),0 0 0 1px ${LINE}}
  .ph-card b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;line-height:1.25;color:${INK}}
  .ph-card span{font-size:13px;line-height:1.35;color:${BODY}}
  .ph-card.c1{left:0;bottom:62px}
  .ph-card.c2{left:8%;bottom:6px}
  @media (min-width:640px){.ph-in{padding:0 24px}.ph{padding:12px 0 44px}.ph-vis{height:420px}}
  @media (min-width:1024px){.ph-in{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}.ph-vis{height:440px}.ph-photo{width:76%}}

  .pl-sec{background:#F4F6FB;padding:48px 0 24px}
  .pl-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .pl-ctl{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;margin-bottom:26px}
  .seg{display:inline-flex;gap:4px;padding:5px;border-radius:999px;background:#E2E8F4}
  .seg button{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;line-height:1.2;color:${BODY};white-space:nowrap;transition:background .2s ease,color .2s ease}
  .seg button.on{background:#fff;color:${INK};box-shadow:0 2px 8px rgba(15,27,61,.12)}
  .seg button:focus-visible{outline:3px solid ${BLUE};outline-offset:-3px}
  .seg em{font-style:normal;padding:3px 8px;border-radius:999px;background:#DDF6EE;color:#0B6B53;font-size:11.5px;line-height:1}
  .seg small{font-size:12px;font-weight:500;color:${MUTED}}
  .pl-grid{display:grid;gap:18px;align-items:stretch}
  .pl-card{position:relative;display:flex;flex-direction:column;padding:28px 26px 26px;border-radius:28px;background:#fff;border:1px solid ${LINE};box-shadow:0 24px 54px -36px rgba(15,27,61,.3)}
  .pl-card.lift{background:${INK};border-color:${INK};color:#fff;box-shadow:0 36px 70px -34px rgba(15,27,61,.75)}
  .pl-tag{align-self:flex-start;padding:5px 14px;border-radius:999px;background:${TINT};color:${BLUE};font-size:13px;font-weight:600;line-height:1.3}
  .pl-card.lift .pl-tag{background:rgba(255,255,255,.14);color:#fff}
  .pl-card .pl-fit{margin:16px 0 0;font-size:16px;line-height:1.5;font-weight:500;color:${BODY};font-family:var(--font-sans),system-ui,sans-serif;min-height:3em}
  .pl-card.lift .pl-fit{color:rgba(255,255,255,.78)}
  .pl-price{margin:22px 0 22px;display:grid;gap:4px;min-height:84px;align-content:start}
  .pl-price b.cu{font-size:32px;line-height:1.15;white-space:nowrap}
  .pl-price b{font-family:var(--font-display),system-ui,sans-serif;font-size:40px;line-height:1.05;letter-spacing:-.02em;font-weight:700;color:${INK}}
  .pl-card.lift .pl-price b{color:#fff}
  .pl-price span{font-size:14px;line-height:1.4;color:${MUTED}}
  .pl-card.lift .pl-price span{color:rgba(255,255,255,.7)}
  .pl-btn{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;justify-content:center;min-height:50px;border-radius:999px;background:${INK};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;transition:background .2s ease}
  .pl-btn:hover{background:${BLUE}}
  .pl-card.lift .pl-btn{background:#fff;color:${INK}}
  .pl-card.lift .pl-btn:hover{background:#E3ECFC}
  .pl-btn:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}
  .pl-card .pl-lab{margin:26px 0 12px;font-size:11.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${MUTED}}
  .pl-card.lift .pl-lab{color:rgba(255,255,255,.6)}
  .pl-list{list-style:none;margin:0 0 24px;padding:0;display:grid;gap:10px}
  .pl-list li{display:flex;gap:11px;align-items:flex-start;font-size:15px;line-height:1.4;color:${INK}}
  .pl-card.lift .pl-list li{color:#fff}
  .pl-list i{flex:none;width:20px;height:20px;margin-top:1px;border-radius:50%;background:${TINT};color:${BLUE};display:flex;align-items:center;justify-content:center}
  .pl-card.lift .pl-list i{background:rgba(255,255,255,.16);color:#fff}
  .pl-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:20px;border-top:1px solid ${LINE}}
  .pl-card.lift .pl-chips{border-top-color:rgba(255,255,255,.16)}
  .pl-chips em{font-style:normal;padding:6px 12px;border-radius:999px;background:#F1F4FA;font-size:12.5px;font-weight:600;line-height:1.2;color:${INK}}
  .pl-card.lift .pl-chips em{background:rgba(255,255,255,.12);color:#fff}
  .pl-cur{display:none}
  .pl-in .pl-note{margin:32px 0 0;font-size:13px;line-height:1.5;color:${MUTED};text-align:center}

  .cp-sec{background:#fff;padding:64px 0 40px}
  .cp-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .cp-sec .cp-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0;text-wrap:balance}
  .cp-h2 .l{font-weight:400;color:#5C6785}
  .cp-in .cp-sub{margin:16px 0 0;font-size:18px;line-height:1.6;color:${BODY}}
  .cp-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;margin:28px 0 18px}
  .cp-tabs{display:flex;gap:6px;padding:6px;border-radius:999px;background:#E2E8F4;overflow-x:auto;scrollbar-width:none;max-width:100%}
  .cp-tabs::-webkit-scrollbar{display:none}
  .cp-tabs button{all:unset;flex:none;box-sizing:border-box;cursor:pointer;padding:10px 16px;border-radius:999px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;line-height:1.2;color:${BODY};white-space:nowrap}
  .cp-tabs button.on{background:#BCD3FB;color:${INK}}
  .cp-tabs button:focus-visible{outline:3px solid ${BLUE};outline-offset:-3px}
  .cp-sw{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-size:14.5px;font-weight:500;color:${INK}}
  .cp-sw input{position:absolute;opacity:0;width:1px;height:1px}
  .cp-sw span{position:relative;width:42px;height:24px;border-radius:999px;background:#C3CCE0;transition:background .2s ease}
  .cp-sw span::after{content:"";position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s ease}
  .cp-sw input:checked+span{background:${BLUE}}
  .cp-sw input:checked+span::after{transform:translateX(18px)}
  .cp-sw input:focus-visible+span{outline:3px solid ${BLUE};outline-offset:3px}
  .cp-card{border-radius:24px;background:#F7F9FD;border:1px solid ${LINE};overflow-x:auto}
  .cp-card table{width:100%;min-width:560px;border-collapse:collapse}
  .cp-card thead th{padding:16px 18px;text-align:center;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;color:${INK};border-bottom:1px solid ${LINE}}
  .cp-card tbody th{padding:15px 18px;text-align:left;font-size:15px;font-weight:500;color:${INK}}
  .cp-card td{padding:15px 18px;text-align:center;font-size:14.5px;color:${INK}}
  .cp-card tbody tr+tr th,.cp-card tbody tr+tr td{border-top:1px solid #E4E9F3}
  .cp-card .mx{background:rgba(188,211,251,.28)}
  .cp-y{display:inline-flex;width:24px;height:24px;border-radius:50%;background:${TINT};color:${BLUE};align-items:center;justify-content:center}
  .cp-n{font-size:13px;color:${MUTED}}
  .cp-t{font-weight:600}
  .cp-empty{padding:28px;text-align:center;color:${MUTED}}
  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

  .wc-sec{background:#fff;padding:40px 0 64px}
  .wc-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .wc-sec .wc-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0 0 28px;text-wrap:balance}
  .wc-h2 .l{font-weight:400;color:#5C6785}
  .wc-grid{display:grid;gap:16px}
  .wc-card{padding:26px;border-radius:24px;background:#F4F6FB;border:1px solid ${LINE}}
  .wc-ic{display:flex;width:46px;height:46px;border-radius:14px;background:#fff;color:${BLUE};align-items:center;justify-content:center;box-shadow:0 0 0 1px ${LINE}}
  .wc-sec .wc-card h3{--h3-size:20px;margin:18px 0 0;font-weight:600}
  .wc-card p{margin:8px 0 0;font-size:15px;line-height:1.55;color:${BODY}}
  .wc-link{display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:14.5px;font-weight:600;color:${BLUE};text-decoration:none}
  .wc-link:hover{text-decoration:underline;text-underline-offset:4px}

  .fq-sec{background:#F4F6FB;padding:64px 0 72px}
  .fq-in{max-width:900px;margin:0 auto;padding:0 20px}
  .fq-sec .fq-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:${INK};margin:0 0 28px;text-wrap:balance}
  .fq-h2 .l{font-weight:400;color:#5C6785}
  .fq-list{display:grid;gap:10px}
  .fq-item{border-radius:18px;background:#fff;border:1px solid ${LINE};overflow:hidden}
  .fq-item summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 22px;font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:600;line-height:1.35;color:${INK}}
  .fq-item summary::-webkit-details-marker{display:none}
  .fq-item summary svg{flex:none;color:${MUTED};transition:transform .2s ease}
  .fq-item[open] summary svg{transform:rotate(180deg)}
  .fq-item summary:focus-visible{outline:3px solid ${BLUE};outline-offset:-3px}
  .fq-item p{margin:0;padding:0 22px 20px;font-size:15.5px;line-height:1.6;color:${BODY}}

  @media (min-width:640px){
    .pl-in,.cp-in,.wc-in,.fq-in{padding-left:24px;padding-right:24px}
    .pl-sec{padding:56px 0 32px}
    .cp-sec{padding:80px 0 48px}
    .wc-sec{padding:48px 0 80px}
    .fq-sec{padding:80px 0 88px}
    .wc-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media (min-width:1024px){
    .pl-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
    .pl-card.lift{margin-top:-14px;padding-top:42px}
    .cp-sec{padding:96px 0 56px}
    .wc-sec{padding:56px 0 96px}
    .wc-grid{grid-template-columns:repeat(4,1fr)}
    .fq-sec{padding:96px 0 104px}
  }
`;
