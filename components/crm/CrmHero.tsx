"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useCrmDemo } from "./CrmShell";
import { ArtPipeline } from "./art";
import { BLUE, BLUE_DEEP, BODY, CORAL, CORAL_DEEP, CORAL_TINT, INK, LINE, MINT, MINT_DEEP, MINT_TINT, MUTED, TINT, TINT_SOFT } from "./palette";

/* Hero for CRM. A two weight headline, a short description, and a stepped mosaic of seven tiles. Photography and the real CRM screen carry the
   image tiles. The tiles tell one story in four beats, played once and replayed when the hero scrolls back into view:
   0 quiet (6 deals went quiet, EVI is checking), 1 prepared (6 follow ups drafted, waiting for approval), 2 approved (Priya M approves),
   3 sent (the follow ups go out and a call is booked). Between beats some tiles change places. The sequence pauses on hover or focus,
   and with reduced motion the hero stays on beat 0. */

const QUIET = 6;
const AT = [0, 4600, 8600, 12200]; // when each beat begins, in ms
const END = 12200;
const COUNT_FROM = 900;
const COUNT_STEP = 170;

const CAP: [string, string][] = [["Deals quiet", "this week"], ["Follow ups", "prepared"], ["Follow ups", "approved"], ["Follow ups", "sent"]];
const DOT = [CORAL, BLUE, MINT, MINT];
const WHO = ["EVI is checking", "EVI prepared", "EVI prepared", "EVI prepared"];
const BIG = ["6 quiet deals", "6 follow ups", "6 follow ups", "6 follow ups"];
const CHIP = ["Preparing follow ups", "Waiting for approval", "Approved by Priya M", "Sent"];
const BTN = ["Approve", "Approve", "Approved", "Sent"];
const GLASS = ["Northgate, 12 days idle", "Northgate, follow up drafted", "Northgate, follow up approved", "Northgate, follow up sent"];
const CO_SUB = ["$27k, closes in 14 days", "Reminder drafted", "Reminder approved", "Reminder sent"];
const CO_BADGE = ["12 days idle", "Drafted", "Approved", "Call Friday"];
const OWNER = ["Account owner", "Account owner", "Approved", "Approved"];

const PREPARED = [
  { n: "Beta Inc.", a: "Proposal follow up" },
  { n: "Vertex Retail", a: "Proposal follow up" },
  { n: "Halo Health", a: "Renewal reminder" },
];
const actionFor = (beat: number, a: string) => (beat === 0 ? "Checking history" : beat === 3 ? "Sent" : a);

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export function CrmHero() {
  const demo = useCrmDemo();
  const [beat, setBeat] = useState(0);
  const [count, setCount] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const held = useRef(false); // pointer or focus is on the mosaic
  const seen = useRef(false); // the mosaic is on screen
  const clock = useRef(0);
  const done = useRef(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setCount(QUIET), 0);
      return () => clearTimeout(t);
    }
    const apply = () => {
      const ms = clock.current;
      let b = 0;
      AT.forEach((a, i) => { if (ms >= a) b = i; });
      setBeat(b);
      setCount(ms < COUNT_FROM ? 0 : Math.min(QUIET, Math.floor((ms - COUNT_FROM) / COUNT_STEP) + 1));
    };
    let last = performance.now();
    const iv = setInterval(() => {
      const now = performance.now();
      const dt = Math.min(now - last, 1500);
      last = now;
      if (!seen.current || held.current || done.current) return;
      clock.current += dt;
      apply();
      if (clock.current >= END) done.current = true;
    }, 100);
    const io = new IntersectionObserver(([e]) => {
      seen.current = e.isIntersecting;
      if (e.isIntersecting && done.current) { done.current = false; clock.current = 0; apply(); }
    }, { threshold: 0.45 });
    io.observe(el);
    const on = () => { held.current = true; };
    const off = () => { held.current = false; };
    const evs: [string, () => void][] = [["mouseenter", on], ["mouseleave", off], ["focusin", on], ["focusout", off]];
    evs.forEach(([n, f]) => el.addEventListener(n, f));
    return () => { clearInterval(iv); io.disconnect(); evs.forEach(([n, f]) => el.removeEventListener(n, f)); };
  }, []);

  const fade = (txt: string) => <span key={`${txt}${beat}`} className="cv-fade">{txt}</span>;

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
            <p>EVOQ CRM finds the proposals nobody answered and the renewals nobody called, then prepares the follow ups for the owner to approve.</p>
            <div className="cv-cta">
              <button type="button" className="cv-btn primary" onClick={() => demo("hero", "Book a demo")}>Book a demo</button>
              <a href="#outcomes" className="cv-btn ghost">See how it works</a>
            </div>
          </div>
        </div>

        <div className="cv-mosw" ref={stage}>
          <div className="cv-mos" data-b={beat} role="group" aria-label="Six quiet deals are found, EVI prepares the follow ups, the owner approves them and they are sent">
            {/* Photograph: colleagues reviewing a deal, with the deal that went quiet */}
            <div className="cv-t cv-img cv-w1" style={{ "--d": "0s" } as CSSProperties}>
              <img src="/crm/colleagues-wide.webp" alt="Two colleagues reviewing a deal on a tablet" loading="eager" decoding="async" />
              <span className="cv-glass"><i style={{ background: DOT[beat] }} />{fade(GLASS[beat])}</span>
            </div>

            {/* A pipeline drawn as an idea: stages rising, deals moving, one gone quiet */}
            <div className="cv-t cv-img cv-w2" style={{ "--d": ".2s" } as CSSProperties}>
              <ArtPipeline compact />
            </div>

            {/* The account owner who approves */}
            <div className={`cv-t cv-img cv-w3${beat >= 2 ? " on" : ""}`} style={{ "--d": ".15s" } as CSSProperties}>
              <img src="/crm/priya.webp" alt="Priya M, account owner" loading="eager" decoding="async" style={{ objectPosition: "50% 12%" }} />
              <span className="cv-glass cv-who"><b>Priya M</b><small>{fade(OWNER[beat])}</small></span>
            </div>

            {/* Open pipeline */}
            <div className="cv-t cv-win cv-w4" style={{ "--d": ".35s" } as CSSProperties}>
              <div className="cv-l2">Open pipeline</div>
              <div className="cv-n3">$1.24M</div>
              <svg className="cv-spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,26 20,22 40,24 60,15 80,17 100,8 120,4" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>
              <div className="cv-l2">12 open deals</div>
            </div>

            <div className="cv-t cv-white cv-stat" style={{ "--d": ".1s" } as CSSProperties}>
              <div className="cv-num" aria-hidden="true">{count}</div>
              <div className="cv-cap"><i style={{ background: DOT[beat] }} /><span key={`cap${beat}`} className="cv-fade">{CAP[beat][0]}<br />{CAP[beat][1]}</span></div>
            </div>

            <div className="cv-t cv-white cv-evi" style={{ "--d": ".3s" } as CSSProperties}>
              <div className="cv-evi-l">
                <div className="cv-evi-who"><span className="cv-mark"><img src="/symbol-color.png" alt="" width={20} height={20} /></span>{fade(WHO[beat])}</div>
                <div className="cv-evi-big">{fade(BIG[beat])}</div>
                <span className={`cv-chip${beat >= 2 ? " ok" : ""}`}>{fade(CHIP[beat])}</span>
              </div>
              <ul className="cv-list" aria-label="Follow ups">
                {PREPARED.map((p) => (
                  <li key={p.n}><b>{p.n}</b><span key={`${p.n}${beat}`} className="cv-fade">{actionFor(beat, p.a)}</span></li>
                ))}
              </ul>
              <div className="cv-evi-r">
                <span className={`cv-approve${beat === 0 ? " off" : beat >= 2 ? " ok" : ""}`}>{beat >= 2 && <Check />}{fade(BTN[beat])}</span>
                <small>Priya M, owner</small>
              </div>
            </div>

            <div className={`cv-t cv-coral s${beat}`} style={{ "--d": ".4s" } as CSSProperties}>
              <span className="cv-tag">Renewal</span>
              <div>
                <div className="cv-co-n">Halo Health</div>
                <div className="cv-co-s">{fade(CO_SUB[beat])}</div>
              </div>
              <span className="cv-co-b">{fade(CO_BADGE[beat])}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  @keyframes cvKen{from{transform:scale(1)}to{transform:scale(1.09)}}
  @keyframes cvPan{from{transform:translate(0,0)}to{transform:translate(-16%,-12%)}}
  @keyframes cvIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
  @keyframes cvPop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
  @keyframes cvFade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
  @keyframes cvPress{0%{transform:scale(1)}40%{transform:scale(.94)}100%{transform:scale(1)}}

  .cv-hero{padding:8px 0 28px}
  .cv-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .cv-head{display:grid;gap:22px;margin:12px 0 28px}
  .cv-h1{font-size:var(--h1-size);line-height:1.08;letter-spacing:-.03em;font-weight:700}
  .cv-h1 span{display:block;text-wrap:balance}
  .cv-h1 .l{font-weight:400;color:#5C6785}
  .cv-h1 .b{font-weight:700;color:${INK}}
  .cv-side p{font-size:15.5px;line-height:1.55;color:${BODY};max-width:46ch}
  .cv-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}

  .cv-mosw{container-type:inline-size}
  .cv-mos{--u:8px;--r:18px;--f:max(11px,calc(var(--u)*1.05));--big:46px;display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .cv-t{position:relative;border-radius:var(--r);overflow:hidden;animation:cvIn .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s);transition:left .95s cubic-bezier(.65,0,.25,1),top .95s cubic-bezier(.65,0,.25,1),background-color .6s ease,box-shadow .5s ease}
  .cv-fade{display:inline-block;animation:cvFade .5s ease both}
  .cv-win{background:${TINT};padding:16px;display:flex;flex-direction:column;justify-content:space-between;gap:10px}
  .cv-w1{grid-column:1/-1;height:220px}
  .cv-w2,.cv-w3{height:160px;order:1}
  .cv-w4{display:none}
  .cv-img{background:#DCE4F4;padding:0}
  .cv-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  .cv-w1 img{object-position:72% 38%}
  .cv-w2{background:#BCD3FB}
  .cv-w2 svg{position:absolute;inset:0;width:100%;height:100%;display:block;padding:10px;box-sizing:border-box}
  .cv-w3.on{box-shadow:0 0 0 3px ${MINT}}
  .cv-glass{position:absolute;left:12px;bottom:12px;display:inline-flex;align-items:center;gap:8px;max-width:calc(100% - 24px);padding:7px 13px;border-radius:999px;background:rgba(255,255,255,.86);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);font-size:12px;font-weight:600;line-height:1.2;color:${INK};box-shadow:0 4px 16px rgba(15,27,61,.16);white-space:nowrap}
  .cv-glass i{flex:none;width:8px;height:8px;border-radius:50%;transition:background-color .4s ease}
  .cv-glass.cv-who{display:flex;flex-direction:column;align-items:flex-start;gap:1px;border-radius:14px;padding:7px 12px;right:12px}
  .cv-w1 img{animation:cvKen 24s ease-in-out infinite alternate;transform-origin:50% 40%}
  .cv-w3 img{animation:cvKen 20s ease-in-out infinite alternate;transform-origin:50% 35%}
  .cv-who b{font-size:13px;font-weight:700}
  .cv-who small{font-size:11px;font-weight:500;color:${MUTED}}

  .cv-n3{font-family:var(--font-display),system-ui,sans-serif;font-size:28px;line-height:1;font-weight:600;color:${INK};letter-spacing:-.02em}
  .cv-l2{font-size:12px;line-height:1.3;color:${BODY}}
  .cv-spark{width:100%;height:30px;display:block}

  .cv-white{background:#fff;box-shadow:0 0 0 1px rgba(15,27,61,.06)}
  .cv-stat{display:flex;flex-direction:column;justify-content:space-between;padding:16px;min-height:150px}
  .cv-num{font-family:var(--font-display),system-ui,sans-serif;font-size:var(--big);line-height:1;font-weight:400;color:${INK};letter-spacing:-.03em;font-variant-numeric:tabular-nums}
  .cv-cap{display:flex;align-items:flex-start;gap:8px;font-size:11px;line-height:1.35;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${MUTED}}
  .cv-cap i{flex:none;width:8px;height:8px;border-radius:50%;margin-top:3px;transition:background-color .4s ease}

  .cv-evi{grid-column:1/-1;display:grid;gap:14px;padding:16px}
  .cv-evi-who{display:flex;align-items:center;gap:10px;font-size:12.5px;font-weight:600;color:${MUTED};white-space:nowrap}
  .cv-mark{flex:none;width:30px;height:30px;border-radius:50%;background:${TINT_SOFT};display:flex;align-items:center;justify-content:center}
  .cv-mark img{width:20px;height:20px;object-fit:contain}
  .cv-evi-big{font-family:var(--font-display),system-ui,sans-serif;font-size:28px;line-height:1.1;font-weight:600;color:${INK};letter-spacing:-.02em;margin:8px 0 10px;white-space:nowrap}
  .cv-chip{display:inline-block;background:${TINT_SOFT};color:${BLUE};border-radius:999px;padding:3px 11px;font-size:12px;font-weight:600;white-space:nowrap;transition:background-color .5s ease,color .5s ease}
  .cv-chip.ok{background:${MINT_TINT};color:${MINT_DEEP}}
  .cv-list{list-style:none;margin:0;padding:0;display:grid;gap:7px}
  .cv-list li{display:flex;gap:8px;align-items:baseline;font-size:13px;line-height:1.3;border-top:1px solid ${LINE};padding-top:7px}
  .cv-list b{color:${INK};font-weight:600;white-space:nowrap}
  .cv-list span{color:${MUTED};min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cv-evi-r{display:flex;align-items:center;gap:12px}
  .cv-evi-r small{font-size:12px;color:${MUTED};line-height:1.3;white-space:nowrap}
  .cv-approve{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:38px;padding:0 20px;border-radius:999px;background:${BLUE};color:#fff;font-size:13.5px;font-weight:600;white-space:nowrap;transition:background-color .5s ease}
  .cv-approve.off{background:#B9C3DA}
  .cv-approve.ok{background:${MINT};animation:cvPress .5s ease}

  .cv-coral{--cc:${CORAL_DEEP};--cb:${CORAL};background:${CORAL_TINT};padding:16px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;min-height:150px}
  .cv-coral.s1{--cc:${BLUE_DEEP};--cb:${BLUE};background:${TINT}}
  .cv-coral.s2,.cv-coral.s3{--cc:${MINT_DEEP};--cb:${MINT};background:${MINT_TINT}}
  .cv-tag{align-self:flex-start;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--cc);transition:color .5s ease}
  .cv-co-n{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;line-height:1.1;font-weight:600;color:var(--cc);letter-spacing:-.02em;transition:color .5s ease}
  .cv-co-s{font-size:13px;color:var(--cc);margin-top:4px;text-wrap:balance;transition:color .5s ease}
  .cv-co-b{align-self:flex-start;background:var(--cb);color:#fff;border-radius:999px;padding:3px 11px;font-size:12px;font-weight:600;white-space:nowrap;transition:background-color .5s ease}
  .cv-stat{order:1}
  .cv-coral{order:2}
  .cv-evi{order:3}

  @media (min-width:640px){
    .cv-in{padding:0 24px}
    .cv-w1{height:250px}
    .cv-w1 img{object-position:55% 38%}
    .cv-w2,.cv-w3{height:200px}
    .cv-mos{--u:10px;--big:60px;--bh:118px}
    .cv-evi{grid-template-columns:auto 1fr auto;align-items:center;gap:24px;padding:20px 24px}
    .cv-evi-r{flex-direction:column;align-items:flex-start;gap:8px}
  }
  @media (min-width:1024px){
    .cv-hero{padding:12px 0 44px}
    .cv-head{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:end;gap:48px;margin:20px 0 44px}
    .cv-mos{--u:1cqw;--r:2.2cqw;--f:max(11px,calc(var(--u)*1.05));--big:calc(var(--u)*6.4);--bh:max(54px,calc(var(--u)*6.2));display:block;position:relative;height:calc(var(--u)*31);grid-template-columns:none}
    .cv-t{position:absolute;left:calc(var(--u)*var(--x));top:calc(var(--u)*var(--y));width:calc(var(--u)*var(--w));height:calc(var(--u)*var(--h));min-height:0;grid-column:auto}
    .cv-win{padding:calc(var(--u)*1.5)}
    .cv-img{padding:0}
    .cv-glass{left:calc(var(--u)*1);bottom:calc(var(--u)*1)}
    .cv-glass.cv-who{right:calc(var(--u)*1)}
    .cv-w1{--x:14;--y:0;--w:48;--h:15}
    .cv-w1 img{object-position:50% 38%}
    .cv-w2{--x:78.8;--y:0;--w:21.2;--h:15}
    .cv-w3{--x:0;--y:16;--w:14;--h:15}
    .cv-w4{--x:62.8;--y:16;--w:15.2;--h:15;display:flex}
    .cv-stat{--x:62.8;--y:0;--w:15.2;--h:15;padding:calc(var(--u)*1.5);z-index:2}
    .cv-evi{--x:14.8;--y:16;--w:47.2;--h:15;grid-template-columns:auto 1fr auto;gap:calc(var(--u)*2);padding:0 calc(var(--u)*2.2)}
    .cv-coral{--x:78.8;--y:16;--w:21.2;--h:15;padding:calc(var(--u)*1.5);gap:calc(var(--u)*.5);z-index:2}
    .cv-evi-big{font-size:max(22px,calc(var(--u)*2.4));margin:calc(var(--u)*.5) 0 calc(var(--u)*.8)}
    .cv-co-n{font-size:max(19px,calc(var(--u)*2.1))}
    .cv-n3{font-size:max(24px,calc(var(--u)*2.6))}
    .cv-mos:is([data-b="1"],[data-b="2"],[data-b="3"]) .cv-stat{--y:16}
    .cv-mos:is([data-b="1"],[data-b="2"],[data-b="3"]) .cv-w4{--y:0}
    .cv-mos:is([data-b="2"],[data-b="3"]) .cv-coral{--y:0}
    .cv-mos:is([data-b="2"],[data-b="3"]) .cv-w2{--y:16}
  }
  @media (min-width:1024px) and (max-width:1199px){
    .cv-list{display:none}
    .cv-evi{grid-template-columns:1fr auto}
  }
  @media (prefers-reduced-motion:reduce){
    .cv-t,.cv-img img,.cv-fade,.cv-approve{animation:none;transition:none}
  }
`;
