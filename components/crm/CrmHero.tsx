"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCrmDemo } from "./CrmShell";
import { BLUE, BODY, INK } from "./palette";

/* Hero for CRM. A two weight headline, a short description and two buttons on the left. On the right, the people who use a CRM, not only sales:
   portrait tiles joined by thin lines, each with a name and a role, in the way of the Referia reference. The tiles are a static composition with one
   gentle fade in on load. The people are illustrations of roles, so there are no company names, quotes or customer claims. The names are made up and
   the photographs come from Unsplash, which the project already allows. */

type Person = { name: string; role: string; id: string; pos: string; x: number; y: number; w: number };

/* x, y and w are in container widths (cqw); every tile is 17 high, so the whole tree is 75.5 high. Order: the centre first, then the rest, so that
   narrow screens show the first six. */
const PEOPLE: Person[] = [
  { name: "Rosa Mendes", role: "Head of Sales", id: "1573497019940-1c28c88b4f3e", pos: "50% 34%", x: 35.5, y: 19.5, w: 29 },
  { name: "Daniel Okafor", role: "Founder", id: "1614023342667-6f060e9d1e04", pos: "50% 26%", x: 23, y: 0, w: 25 },
  { name: "Maya Alvarez", role: "Marketing Manager", id: "1662850886700-4ec19bd30d11", pos: "50% 36%", x: 52, y: 0, w: 25 },
  { name: "Emma Clarke", role: "Support Team Lead", id: "1745434159123-4908d0b9df94", pos: "50% 30%", x: 0, y: 19.5, w: 25 },
  { name: "Karan Mehta", role: "Real Estate Agent", id: "1718209881007-c0ecdfc00f9d", pos: "50% 24%", x: 75, y: 19.5, w: 25 },
  { name: "Sophie Laurent", role: "Customer Success", id: "1494790108377-be9c29b29330", pos: "50% 34%", x: 59, y: 39, w: 25 },
  { name: "Marcus Reed", role: "Recruiting Lead", id: "1522529599102-193c0d76b5b6", pos: "50% 44%", x: 16, y: 39, w: 25 },
  { name: "Meera Nair", role: "Clinic Coordinator", id: "1706943262459-3ef6ce03305c", pos: "50% 46%", x: 37.5, y: 58.5, w: 25 },
];

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&q=75`;

/* thin lines from the centre tile to the others, behind the tiles; the viewBox is 100 wide and 75.5 high */
const LINES = [
  "M35.5 8.5 C35.5 17, 50 18, 50 28", "M64.5 8.5 C64.5 17, 50 18, 50 28",
  "M12.5 28 H50", "M87.5 28 H50",
  "M28.5 47.5 C28.5 38, 50 38, 50 28", "M71.5 47.5 C71.5 38, 50 38, 50 28",
  "M50 28 V67",
  "M9 47.5 H28.5", "M91 47.5 H71.5",
];

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export function CrmHero() {
  const demo = useCrmDemo();
  return (
    <section className="cv-hero" aria-labelledby="cv-h1">
      <style>{css}</style>
      <div className="cv-in">
        <div className="ch-grid">
          <div className="ch-copy">
            <h1 id="cv-h1" className="cv-h1">
              <span className="l">How many deals</span>
              <span className="b">went quiet this week?</span>
            </h1>
            <p>Sales heads see which deals stalled, and deal owners get drafted follow ups to review and send.</p>
            <div className="cv-cta">
              <button type="button" className="cv-btn primary" onClick={() => demo("hero", "Book a demo")}>Book a demo</button>
              <a href="#features" className="cv-btn ghost">See how it works</a>
            </div>
          </div>

          <div className="ch-tree" role="group" aria-label="People who use a CRM: a head of sales, a founder, a marketing manager, a support lead, a real estate agent, a customer success manager, a recruiting lead and a clinic coordinator">
            <svg className="ch-lines" viewBox="0 0 100 75.5" preserveAspectRatio="none" aria-hidden="true">
              {LINES.map((d) => <path key={d} d={d} fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}
            </svg>
            <span className="ch-ic" style={{ "--x": 5, "--y": 43.5, "--d": ".5s" } as CSSProperties} aria-hidden="true">
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            </span>
            <span className="ch-ic" style={{ "--x": 87, "--y": 43.5, "--d": ".6s" } as CSSProperties} aria-hidden="true">
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
            {PEOPLE.map((p, i) => (
              <figure key={p.name} className="ch-t" style={{ "--x": p.x, "--y": p.y, "--w": p.w, "--d": `${0.1 + i * 0.07}s` } as CSSProperties}>
                <Image src={photo(p.id)} alt={`Portrait of ${p.name}, ${p.role}`} fill sizes="(min-width: 1024px) 18vw, 46vw" priority={i < 4} style={{ objectFit: "cover", objectPosition: p.pos }} />
                <figcaption><b>{p.name}</b><small>{p.role}</small></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  @keyframes chIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .cv-hero{padding:8px 0 32px}
  .cv-in{max-width:1300px;margin:0 auto;padding:0 20px}
  .ch-grid{display:grid;gap:28px;margin:12px 0 0;align-items:center}
  .cv-h1{font-size:var(--h1-size);line-height:1.08;letter-spacing:-.03em;font-weight:700}
  .cv-h1 span{display:block;text-wrap:balance}
  .cv-h1 .l{font-weight:400;color:#5C6785}
  .cv-h1 .b{font-weight:700;color:${INK}}
  .ch-copy p{margin:20px 0 0;font-size:16.5px;line-height:1.55;color:${BODY};max-width:42ch}
  .cv-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}

  .ch-tree{position:relative;width:100%;container-type:inline-size;display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .ch-lines,.ch-ic{display:none}
  .ch-t{position:relative;margin:0;height:150px;border-radius:16px;overflow:hidden;background:#DCE4F4;animation:chIn .7s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s)}
  .ch-t:nth-of-type(n+7){display:none}
  .ch-t figcaption{position:absolute;left:8px;bottom:8px;right:8px;max-width:calc(100% - 16px);width:max-content;padding:5px 11px 6px;border-radius:11px;background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 4px 14px rgba(15,27,61,.14)}
  .ch-t figcaption b{display:block;font-size:12.5px;line-height:1.25;font-weight:700;color:${INK}}
  .ch-t figcaption small{display:block;font-size:11px;line-height:1.25;font-weight:500;color:${BODY}}

  @media (min-width:640px){.cv-in{padding:0 24px}.ch-t{height:190px}}
  @media (min-width:1024px){
    .cv-hero{padding:12px 0 36px}
    .ch-grid{grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:48px;margin:18px 0 0}
    .ch-tree{display:block;aspect-ratio:100 / 75.5}
    .ch-lines{display:block;position:absolute;inset:0;width:100%;height:100%;opacity:.85}
    .ch-ic{display:flex;position:absolute;left:calc(var(--x)*1cqw);top:calc(var(--y)*1cqw);width:8cqw;height:8cqw;border-radius:2.2cqw;background:${BLUE};color:#fff;align-items:center;justify-content:center;animation:chIn .7s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s);box-shadow:0 10px 22px -10px rgba(29,78,216,.7)}
    .ch-t,.ch-t:nth-of-type(n+7){display:block;position:absolute;left:calc(var(--x)*1cqw);top:calc(var(--y)*1cqw);width:calc(var(--w)*1cqw);height:17cqw;border-radius:2.1cqw;box-shadow:0 18px 34px -22px rgba(15,27,61,.5)}
    .ch-t figcaption{left:.9cqw;bottom:.9cqw;right:.9cqw;padding:.45cqw 1.1cqw .55cqw;border-radius:1.2cqw}
    .ch-t figcaption b,.ch-t figcaption small{white-space:nowrap}
    .ch-t figcaption b{font-size:max(11px,1.75cqw)}
    .ch-t figcaption small{font-size:max(10px,1.5cqw)}
  }
  @media (prefers-reduced-motion:reduce){.ch-t,.ch-ic{animation:none}}
`;
