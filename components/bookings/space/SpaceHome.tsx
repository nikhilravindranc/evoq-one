"use client";
/* eslint-disable @next/next/no-img-element */

import { I, U } from "../theme";
import { BG, LINE, MUTED } from "./palette";
import { NightField, Horizon, Skyline } from "./fx";
import { DemoButton, SR_BASE, SpaceShell } from "./SpaceShell";
import { SpaceAi } from "./SpaceAi";
import { SpaceChallenge } from "./SpaceChallenge";
import { SpaceHow } from "./SpaceHow";
import { SpaceRules } from "./SpaceRules";
import { SpaceSolution, SpaceWhy } from "./SpaceStory";
import { SpaceTryIt } from "./SpaceTryIt";
import { SPACE_IMG } from "./ui";

/* Space & Room Reservations, Home. The order: the problem, the solution, why choose it, how it works,
   the rules that keep it fair (with several locations as a tab), who uses it, the AI assistants and then
   the demo request. The full capability list lives on Features, so nothing here sends visitors away. */

const HERO_PHOTO = U("1431540015161-0bf868a2d407", 2000);

const WHO = [
  { name: "Corporate offices", img: SPACE_IMG.board, line: "Meeting rooms stop filling with holds nobody uses.", tags: ["Check in and release", "Utilization reports"] },
  { name: "Coworking spaces", img: SPACE_IMG.lounge, line: "Members book rooms themselves, at the rate you set.", tags: ["Branded booking page", "Rates and payment status"] },
  { name: "Training and education", img: SPACE_IMG.training, line: "The layout, the projector and the setup time are ready before the session.", tags: ["Layouts and equipment", "Setup buffers"] },
  { name: "Venues and facilities", img: SPACE_IMG.prayer, line: "Outside groups send a request and get a clear answer.", tags: ["Approval workflow", "Terms and deposits"] },
];

export function SpaceHome() {
  return (
    <SpaceShell
      page="home"
      full
      heroImg={HERO_PHOTO}
      hero={
        <div className="sr-hd-in sh-hero-grid">
          <div className="sh-hero-copy">
            <h1 className="sh-h1">Space reservations, handled start to finish.</h1>
            <p className="sr-lead">Visitors pick a space and a time on your booking page. Your team approves requests, moves bookings and sees every location in a single calendar.</p>
            <div className="sr-ctas">
              <DemoButton location="space_home_hero" className="sr-btn light" />
              <a href="#how-it-works" className="sh-hero-link">See how it works {I.arrow}</a>
            </div>
          </div>
          <SpaceTryIt />
        </div>
      }
    >
      <style>{css}</style>

      {/* 2. the challenge, a picture for each problem */}
      <SpaceChallenge />

      {/* 3. the solution and 4. why choose it */}
      <SpaceSolution />
      <SpaceWhy />

      {/* 5. how it works */}
      <SpaceHow />

      {/* 6. rules, with several locations as a tab */}
      <SpaceRules />

      {/* 7. who it's for */}
      <section className="sr-out sr-sec sh-who" id="who-its-for">
        <div className="sr-in">
          <div className="sr-head" data-rv="0">
            <span className="sr-label">Who it&apos;s for</span>
            <h2 className="sr-h2">An office books rooms differently from a coworking space.</h2>
          </div>
          <div className="sh-who-grid">
            {WHO.map((w, i) => (
              <article key={w.name} className="sh-who-card" data-rv={i}>
                <img src={w.img} alt="" loading="lazy" />
                <div className="sh-who-b">
                  <h3>{w.name}</h3>
                  <p>{w.line}</p>
                  <span className="sh-who-tags">{w.tags.map((t) => <em key={t}>{t}</em>)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AI assistants */}
      <SpaceAi />

      {/* 9. closing call to action */}
      <section className="sr-close">
        <NightField stars={64} pings={3} seed={9} />
        <Horizon top="58%" />
        <Skyline />
        <div className="sr-close-band one" data-rv="0">
          <h2 className="sr-h2">See your own spaces, rules and locations.</h2>
          <p className="sr-lead">Tell us how many sites and spaces you manage, and we will tailor the demo.</p>
          <div className="sr-ctas">
            <DemoButton location="space_home_close" className="sr-btn light" />
            <a href={`${SR_BASE}/pricing`} className="sr-btn outline-light">View pricing</a>
          </div>
        </div>
      </section>
    </SpaceShell>
  );
}

const css = `
  .sh-hero-grid{position:relative;padding:48px 0 56px;display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);gap:40px;align-items:center}
  .sh-h1{font-family:var(--font-display),system-ui,sans-serif;font-size:48px;line-height:1.06;letter-spacing:-.025em;font-weight:600;margin:0!important;text-wrap:balance;color:#fff;text-shadow:0 2px 22px rgba(40,20,12,.5)}
  .sh-hero-copy .sr-lead{margin-top:20px}
  .sh-hero-copy .sr-ctas{align-items:center;gap:22px;margin-top:32px}
  .sh-hero-link{display:inline-flex;align-items:center;gap:7px;color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15px;text-decoration:none;border-bottom:1.5px solid rgba(255,255,255,.45);padding-bottom:2px}
  .sh-hero-link:hover{border-bottom-color:#fff}
  .sh-hero-link svg{width:15px;height:15px;transform:rotate(90deg)}

  /* who */
  .sh-who{background:#fff}
  .sh-who-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .sh-who-card{border-radius:20px;overflow:hidden;background:${BG};box-shadow:0 0 0 1px rgba(43,33,28,.07);display:flex;flex-direction:column}
  .sh-who-card img{width:100%;height:210px;object-fit:cover;display:block}
  .sh-who-b{padding:20px 20px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
  .sh-who-b h3{font-size:19px;margin:0!important}
  .sh-who-b p{margin:0;font-size:14.5px;color:${MUTED}}
  .sh-who-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:8px}
  .sh-who-tags em{font-style:normal;font-size:12px;padding:3px 10px;border-radius:999px;background:#fff;color:${MUTED};box-shadow:0 0 0 1px ${LINE}}

  @media (max-width:1100px){.sh-who-grid{grid-template-columns:repeat(2,1fr)}}
  @media (max-width:980px){.sh-hero-grid{grid-template-columns:minmax(0,1fr);gap:36px}}
  @media (max-width:860px){
    .sh-h1{font-size:36px}
    .sh-hero-grid{padding:36px 0 40px}
  }
  @media (max-width:560px){
    .sh-who-grid{grid-template-columns:minmax(0,1fr)}
  }
`;
