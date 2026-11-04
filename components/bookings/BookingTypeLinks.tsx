"use client";
/* eslint-disable @next/next/no-img-element */

import { CATEGORIES, LIVE_PAGES } from "./BookingCategories";
import { BG, DEEP, I, LINE, MUTED } from "./theme";

/* Quick access to the booking type pages, right under the hero. Each card has a single action: open the
   microsite where one exists, or talk to the team for the booking types whose page is still to come.
   The thin top line carries each microsite's own color, so the family reads at a glance. */

const TONE: Record<string, string> = { space: "#B4583A", appt: "#4E6F58", stay: "#9A6B1F", activity: "#4A5E73" };

export function BookingTypeLinks({ onDiscuss }: { onDiscuss: (option: string, key: string) => void }) {
  return (
    <section id="booking-links" className="bt-out">
      <style>{css}</style>
      <div className="bt-in">
        <div className="bt-head" data-rv="0">
          <span className="bk-label">Booking types</span>
          <h2 className="bt-h">Go straight to the booking type you need.</h2>
        </div>
        <div className="bt-grid">
          {CATEGORIES.map((c, i) => {
            const href = LIVE_PAGES[c.key];
            const body = (
              <>
                <span className="bt-photo"><img src={c.img} alt="" loading="lazy" /></span>
                <span className="bt-body">
                  <span className="bt-name"><i>{I[c.key]}</i>{c.name}</span>
                  <small>{c.fit}</small>
                  <em>{href ? "Explore" : "Talk to us"} {I.arrow}</em>
                </span>
              </>
            );
            const style = { ["--tone" as string]: TONE[c.key] };
            return href ? (
              <a key={c.key} href={href} className="bt-card" style={style} data-rv={i}>{body}</a>
            ) : (
              <button key={c.key} type="button" className="bt-card" style={style} data-rv={i} onClick={() => onDiscuss(c.option, c.key)}>{body}</button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const css = `
  .bt-out{padding:64px 20px 8px}
  .bt-in{max-width:1240px;margin:0 auto}
  .bt-head{display:flex;align-items:baseline;gap:18px;flex-wrap:wrap;margin-bottom:22px}
  .bt-head .bk-label{margin:0}
  .bt-h{font-family:var(--font-display),system-ui,sans-serif;font-size:30px;line-height:1.15;letter-spacing:-.015em;color:${DEEP};margin:0;font-weight:600}
  .bt-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
  .bt-card{position:relative;display:flex;flex-direction:column;text-align:left;padding:0;border:0;border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px ${LINE};text-decoration:none;color:inherit;cursor:pointer;font:inherit;transition:box-shadow .2s ease,transform .2s ease}
  .bt-card::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:var(--tone);z-index:2}
  .bt-card:hover{box-shadow:0 0 0 2px var(--tone),0 22px 40px -28px rgba(38,51,43,.5);transform:translateY(-2px)}
  .bt-card:focus-visible{outline:2px solid var(--tone);outline-offset:3px}
  .bt-photo{display:block;height:150px;background:${BG};overflow:hidden}
  .bt-photo img{width:100%;height:100%;object-fit:cover;display:block}
  .bt-body{display:grid;gap:6px;padding:16px 18px 18px;flex:1;align-content:start}
  .bt-name{display:flex;align-items:center;gap:9px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:16.5px;line-height:1.25;color:${DEEP}}
  .bt-name i{width:30px;height:30px;border-radius:9px;background:var(--tone);color:#fff;display:grid;place-items:center;flex-shrink:0}
  .bt-name svg{width:16px;height:16px}
  .bt-body small{font-size:13.5px;line-height:1.45;color:${MUTED}}
  .bt-body em{margin-top:6px;display:inline-flex;align-items:center;gap:6px;font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:var(--tone)}
  .bt-body em svg{width:15px;height:15px;transition:transform .2s ease}
  .bt-card:hover em svg{transform:translateX(3px)}
  @media (max-width:1000px){.bt-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:560px){
    .bt-out{padding-top:44px}
    .bt-h{font-size:24px}
    .bt-grid{grid-template-columns:minmax(0,1fr);gap:12px}
    .bt-card{flex-direction:row}
    .bt-photo{width:112px;height:auto;flex-shrink:0}
    .bt-body{padding:12px 14px}
  }
`;
