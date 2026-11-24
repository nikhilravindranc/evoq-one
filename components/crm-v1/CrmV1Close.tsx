"use client";

import { useCrmDemo } from "./CrmV1Shell";
import { BLUE_DEEP, INK } from "./palette";

/* Closing demo section (docs/crm-v1-new-content.md, Section J). The button opens the demo form. */

export function CrmV1Close() {
  const demo = useCrmDemo();
  return (
    <section id="demo" className="cl-sec" aria-labelledby="cl-h2">
      <style>{css}</style>
      <div className="cl-in">
        <div className="cl-card">
          <h2 id="cl-h2" className="cl-h2">Bring a renewal you need to close.</h2>
          <p>Book a demo and we will set up your stages and approval rules around a real deal.</p>
          <div className="cl-cta">
            <button type="button" className="cl-btn primary" onClick={() => demo("closing", "Book a demo")}>Book a demo</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .cl-sec{background:#fff;padding:48px 0 72px}
  .cl-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .cl-card{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;text-align:center;padding:56px 24px;border-radius:32px;background:linear-gradient(135deg,#1D4ED8 0%,${BLUE_DEEP} 100%);color:#fff;box-shadow:0 36px 80px -40px rgba(12,36,114,.7)}
  .cl-card::before{content:"";position:absolute;width:560px;height:560px;border-radius:50%;background:rgba(255,255,255,.08);left:-200px;bottom:-300px}
  .cl-card::after{content:"";position:absolute;width:420px;height:420px;border-radius:50%;background:rgba(255,255,255,.07);right:-140px;top:-210px}
  .cl-card > *{position:relative;z-index:1}
  .cl-sec .cl-h2{font-size:var(--h2-size);line-height:1.12;letter-spacing:-.03em;font-weight:700;color:#fff;margin:0;text-wrap:balance}
  .cl-card p{margin:16px 0 0;font-size:18px;line-height:1.6;color:rgba(255,255,255,.82);text-wrap:balance}
  .cl-cta{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:30px}
  .cl-btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 28px;border-radius:999px;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;cursor:pointer;border:1.5px solid transparent;transition:background-color .18s ease,border-color .18s ease,transform .12s ease}
  .cl-btn.primary{background:#fff;color:${INK}}
  .cl-btn.primary:hover{background:#E3ECFC}
  .cl-btn.ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.5)}
  .cl-btn.ghost:hover{border-color:#fff;background:rgba(255,255,255,.08)}
  .cl-btn:active{transform:translateY(1px)}
  .cl-btn:focus-visible{outline:3px solid #fff;outline-offset:3px}
  @media (min-width:640px){.cl-in{padding:0 24px}.cl-sec{padding:56px 0 88px}.cl-card{padding:72px 44px}}
  @media (min-width:1024px){.cl-sec{padding:64px 0 104px}.cl-card{padding:96px 64px}}
`;
