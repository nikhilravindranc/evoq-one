"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { I, U } from "../theme";
import { BG, DEEP, INK, LINE, MUTED, NEUTRAL, PRIMARY, PRIMARY_HOVER, ACCENT, SAND } from "./palette";
import { NightField, Horizon, Skyline } from "./fx";
import { DemoButton, SR_BASE, SpaceShell } from "./SpaceShell";
import { SpaceLocations } from "./SpaceLocations";
import { SpaceRules } from "./SpaceRules";
import { SpaceTryIt } from "./SpaceTryIt";
import { CalendarUI, CatalogueUI, BookingFlowUI, ReservationUI, ReportsUI, SPACE_IMG } from "./ui";

/* Space & Room Reservations, Home. The story: the problem, how a booking runs from setup to report,
   the rules that keep it fair, who uses it, the AI assistants, then the demo request. The full
   capability list lives on Features, so nothing here sends visitors away from the page. */

const HERO_PHOTO = U("1431540015161-0bf868a2d407", 2000);

const STEPS = [
  {
    n: "1", t: "Set up your spaces",
    d: "Add each room, hall and shared item once, with the details people look for before they book.",
    pts: ["Capacity, floor and location", "Amenities, equipment and photos", "Status, so a blocked room is never offered"],
    img: SPACE_IMG.glass, ui: <CatalogueUI count={2} />,
  },
  {
    n: "2", t: "Publish a booking page",
    d: "Share a branded page where visitors find a space, pick a time and answer your questions.",
    pts: ["Search by date, time and capacity", "Layout and equipment choices", "Clear status before they send the request"],
    img: SPACE_IMG.lounge, ui: <BookingFlowUI />,
  },
  {
    n: "3", t: "Approve and notify",
    d: "Requests reach your team with the organizer and a booking reference. Every decision tells the organizer.",
    pts: ["Approve, reject or reschedule from the record", "Setup and cleanup time held around the session", "Confirmation and changes sent by email"],
    img: SPACE_IMG.training, ui: <ReservationUI />,
  },
  {
    n: "4", t: "Track and report",
    d: "See what is booked today, who arrived and which spaces sit unused, across every location.",
    pts: ["Check in by QR code or reference", "No shows marked in the booking", "Utilization by location, exported to CSV"],
    img: SPACE_IMG.corridor, ui: <ReportsUI />,
  },
];

const WHO = [
  { name: "Corporate offices", img: SPACE_IMG.board, line: "Meeting rooms stop filling with holds nobody uses.", tags: ["Check in and release", "Utilization reports"] },
  { name: "Coworking spaces", img: SPACE_IMG.lounge, line: "Members book rooms themselves, at the rate you set.", tags: ["Branded booking page", "Rates and payment status"] },
  { name: "Training and education", img: SPACE_IMG.training, line: "The layout, the projector and the setup time are ready before the session.", tags: ["Layouts and equipment", "Setup buffers"] },
  { name: "Venues and facilities", img: SPACE_IMG.prayer, line: "Outside groups send a request and get a clear answer.", tags: ["Approval workflow", "Terms and deposits"] },
];

const AI_DWELL = 6500;
const AI = [
  { k: "visitor", src: "/characters/evi.webp", t: "EVI helps visitors book", d: "Describe the space in plain words and get matching rooms with their availability." },
  { k: "team", src: "/characters/evi.webp", t: "EVI helps your team", d: "Ask about today's bookings, approvals and conflicts and get answers from your records." },
  { k: "agent", src: "/characters/kai.webp", t: "Kai prepares changes", d: "The Operations agent drafts a reschedule or a decision, and a person approves it." },
];

const ATTN = [
  ["2 requests waiting for approval", "Town hall and Client review", "warn", "Review"],
  ["1 conflict", "Hall A is blocked on Friday morning and a workshop is booked there", "off", "Open"],
  ["4 check ins before noon", "Board Room, Glass Room and 2 more", "ok", "View"],
] as const;

/* The characters wear the same violet ring as on the EVOQ home page, so they read as the assistants. */
function AiTile({ src, size }: { src: string; size: number }) {
  return (
    <span className="sh-tile" style={{ width: size, height: size }}>
      <img src={src} alt="" width={size} height={size} />
    </span>
  );
}
const Face = ({ src }: { src: string }) => <img className="sh-face" src={src} alt="" width={36} height={36} />;

export function SpaceHome() {
  const [ai, setAi] = useState(0);
  const [aiAuto, setAiAuto] = useState(true);
  const aiRef = useRef<HTMLDivElement>(null);
  const [aiSeen, setAiSeen] = useState(false);

  // the assistants take turns once while the section is on screen; a click hands control over
  useEffect(() => {
    const el = aiRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAiSeen(true); }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!aiAuto || !aiSeen || ai >= AI.length - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setAi((i) => i + 1), AI_DWELL);
    return () => clearTimeout(t);
  }, [ai, aiAuto, aiSeen]);
  const pickAi = (i: number) => { setAiAuto(false); setAi(i); };
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);

  return (
    <SpaceShell
      page="home"
      full
      heroImg={HERO_PHOTO}
      hero={
        <div className="sr-hd-in sh-hero-grid">
          <div className="sh-hero-copy">
            <h1 className="sh-h1">Rooms, halls and equipment, booked without the back and forth.</h1>
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

      {/* 2. the operational challenge */}
      <section className="sr-out sr-sec" id="challenge">
        <div className="sr-in">
          <div className="sr-head" data-rv="0">
            <h2 className="sr-h2">Double bookings, email requests and calendars nobody trusts.</h2>
            <p className="sr-lead">Most booking problems have little to do with the rooms. Requests arrive in different places, and the rules live in a few people&apos;s heads.</p>
          </div>
          <div className="sh-ba" data-rv="1">
            <div className="sh-before">
              <span className="sh-pill bad">Today</span>
              <div className="sh-mail">
                <div className="sh-mail-h"><i>FD</i><span><b>Facilities inbox</b><small>Re: Hall A on Saturday?</small></span><em>9:41</em></div>
                <p>Hi, could we have the hall from 14:00 for about 40 people? Not sure if the projector is free. Thanks!</p>
              </div>
              <div className="sh-sheet">
                <div className="sh-sheet-r head"><span>Room</span><span>Time</span><span>Team</span></div>
                <div className="sh-sheet-r"><span>Board Room</span><span>10:00</span><span>Sales</span></div>
                <div className="sh-sheet-r clash"><span>Board Room</span><span>10:00</span><span>Finance</span></div>
                <div className="sh-sheet-r"><span>Training 2</span><span>13:00</span><span>People</span></div>
              </div>
              <div className="sh-note">Hall A blocked Fri? Ask Dan</div>
            </div>
            <span className="sh-arrow" aria-hidden>{I.arrow}</span>
            <div className="sh-after">
              <span className="sh-pill good">With EVOQ Bookings</span>
              <CalendarUI compact />
            </div>
          </div>
          <div className="sh-pains">
            {[
              ["Requests in email", "Each request is retyped into a spreadsheet and answered by hand."],
              ["Double bookings", "Two teams arrive at the same room because their bookings lived in different calendars."],
              ["No view across sites", "Each building keeps its own calendar, so nobody sees what is free elsewhere."],
            ].map(([t, d], i) => (
              <div key={t} data-rv={i}><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. how it works, from setup to report */}
      <section className="sr-out sr-sec sh-how" id="how-it-works">
        <div className="sr-in">
          <div className="sr-head c" data-rv="0">
            <span className="sr-label">How it works</span>
            <h2 className="sr-h2">From a new space to a utilization report.</h2>
            <p className="sr-lead">Describe each space once. The page visitors book from and the calendar your team manages always show the same information.</p>
          </div>
          <div className="sh-rows">
            {STEPS.map((s, i) => (
              <div key={s.t} className={`sh-row${i % 2 ? " flip" : ""}`}>
                <div className="sh-row-t" data-rv="0">
                  <span className="sh-row-n">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <ul>{s.pts.map((p) => <li key={p}>{I.check}{p}</li>)}</ul>
                </div>
                <div className="sh-row-v" data-rv="1">
                  <img src={s.img} alt="" loading="lazy" />
                  <div className="sh-row-ui">{s.ui}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. rules, on the lit horizon */}
      <SpaceRules />

      {/* 5. who it's for */}
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

      {/* 6. several locations, the constellation */}
      <SpaceLocations />

      {/* 7. AI assistants */}
      <section className="sr-out sr-sec" id="ai">
        <div className="sr-in">
          <div className="sr-head c" data-rv="0">
            <span className="sr-label">AI assistants</span>
            <h2 className="sr-h2">Describe what you need. Your team approves what changes.</h2>
            <p className="sr-lead">EVI answers from your bookings, and Kai, the Operations agent, prepares changes. Nothing moves until a person approves it.</p>
          </div>
          <div className="sh-ai" data-rv="1" ref={aiRef}>
            <div className="sh-ai-rail" role="tablist" aria-label="AI assistants">
              {AI.map((x, i) => (
                <button key={x.k} type="button" role="tab" aria-selected={ai === i} className={ai === i ? "on" : ""} onClick={() => pickAi(i)}>
                  <AiTile src={x.src} size={46} />
                  <span><b>{x.t}</b><small>{x.d}</small></span>
                  {ai === i && aiAuto && aiSeen && i < AI.length - 1 && <i className="sh-ai-bar" style={{ animationDuration: `${AI_DWELL}ms` }} aria-hidden />}
                </button>
              ))}
            </div>
            <div className="sh-ai-stage" role="tabpanel" key={ai}>
              {ai === 0 && (
                <>
                  <div className="sh-msg me"><span>I need a room for 10 people with a screen, Thursday afternoon.</span><Face src="/characters/sam.webp" /></div>
                  <div className="sh-msg bot">
                    <AiTile src="/characters/evi.webp" size={40} />
                    <div className="sh-bot-b">
                      <span className="sh-crit"><em>Thu 19 Nov</em><em>13:00 to 17:00</em><em>10+ seats</em><em>Screen</em></span>
                      <p>Two spaces match.</p>
                      <div className="sh-opt"><img src={SPACE_IMG.board} alt="" /><span><b>Board Room</b><small>12 seats · Display</small></span><em className="sr-badge ok">Free 14:00</em></div>
                      <div className="sh-opt"><img src={SPACE_IMG.training} alt="" /><span><b>Training Room 2</b><small>24 seats · Projector</small></span><em className="sr-badge warn">Needs approval</em></div>
                    </div>
                  </div>
                </>
              )}
              {ai === 1 && (
                <>
                  <div className="sh-msg me"><span>What needs my attention today?</span><Face src="/characters/mia.webp" /></div>
                  <div className="sh-msg bot">
                    <AiTile src="/characters/evi.webp" size={40} />
                    <div className="sh-bot-b">
                      <p>Three things, from today&apos;s bookings.</p>
                      {ATTN.map(([t, d, k, c]) => (
                        <div key={t} className="sh-attn"><span><b>{t}</b><small>{d}</small></span><em className={`sr-badge ${k}`}>{c}</em></div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {ai === 2 && (
                <>
                  <div className="sh-msg bot">
                    <AiTile src="/characters/evi.webp" size={40} />
                    <div className="sh-bot-b"><p>Hall A is blocked on Friday morning. I asked Kai to prepare a move for the vendor workshop.</p></div>
                  </div>
                  <div className="sh-agent">
                    <AiTile src="/characters/kai.webp" size={56} />
                    <div>
                      <span className="sh-prep-k">{decision === "approved" ? "Approved by Mia" : decision === "rejected" ? "Rejected by Mia" : "Kai · Operations agent · Prepared for review"}</span>
                      <b>Move the vendor workshop to Training Room 2</b>
                      <small>{decision === "approved" ? "The organizer was notified and the calendar is updated." : decision === "rejected" ? "The workshop stays in Hall A. Nothing was changed." : "Same time, Friday 09:00 to 11:00, with the same setup and cleanup buffers."}</small>
                      {!decision ? (
                        <span className="sh-prep-act">
                          <button type="button" className="sr-btn ghost sm" onClick={() => setDecision("rejected")}>Reject</button>
                          <button type="button" className="sr-btn primary sm" onClick={() => setDecision("approved")}>Approve</button>
                        </span>
                      ) : (
                        <span className="sh-prep-act"><button type="button" className="sr-btn ghost sm" onClick={() => setDecision(null)}>Undo</button></span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. closing CTA */}
      <section className="sr-close">
        <NightField stars={64} pings={3} seed={9} />
        <Horizon top="58%" />
        <Skyline />
        <div className="sr-close-band" data-rv="0">
          <h2 className="sr-h2">See your own spaces, rules and locations in EVOQ Bookings.</h2>
          <p className="sr-lead">Tell us how many locations and spaces you manage and what people book today. We will tailor the demo to your setup.</p>
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
  .sh-h1{font-family:var(--font-display),system-ui,sans-serif;font-size:46px;line-height:1.06;letter-spacing:-.025em;font-weight:600;margin:0!important;text-wrap:balance;color:#fff}
  .sh-hero-copy .sr-lead{margin-top:20px}
  .sh-hero-copy .sr-ctas{align-items:center;gap:22px;margin-top:32px}
  .sh-hero-link{display:inline-flex;align-items:center;gap:7px;color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15px;text-decoration:none;border-bottom:1.5px solid rgba(255,255,255,.45);padding-bottom:2px}
  .sh-hero-link:hover{border-bottom-color:#fff}
  .sh-hero-link svg{width:15px;height:15px;transform:rotate(90deg)}

  /* challenge */
  .sh-ba{display:grid;grid-template-columns:minmax(0,1fr) 44px minmax(0,1fr);gap:0;align-items:stretch}
  .sh-before{position:relative;border-radius:22px;background:#E6EDE5;padding:56px 26px 30px;display:grid;gap:14px;align-content:start;overflow:hidden}
  .sh-after{position:relative;border-radius:22px;background:#fff;padding:56px 22px 22px;box-shadow:0 0 0 1px rgba(22,36,28,.07);display:flex;flex-direction:column;justify-content:center}
  .sh-pill{position:absolute;top:18px;left:22px;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:600;padding:4px 11px;border-radius:999px}
  .sh-pill.bad{background:rgba(22,36,28,.1);color:${DEEP}}
  .sh-pill.good{background:rgba(78,111,88,.12);color:${PRIMARY_HOVER}}
  .sh-arrow{align-self:center;justify-self:center;width:36px;height:36px;border-radius:50%;background:${PRIMARY};color:#fff;display:grid;place-items:center;z-index:2;box-shadow:0 0 0 5px ${BG}}
  .sh-arrow svg{width:17px;height:17px}
  .sh-mail{background:#fff;border-radius:12px;padding:14px 16px;box-shadow:0 8px 20px -14px rgba(22,36,28,.5);transform:rotate(-.8deg)}
  .sh-mail-h{display:flex;align-items:center;gap:10px}
  .sh-mail-h i{width:30px;height:30px;border-radius:50%;background:${SAND};color:${DEEP};display:grid;place-items:center;font-style:normal;font-size:11px;font-weight:700}
  .sh-mail-h span{display:grid;line-height:1.3;min-width:0}.sh-mail-h b{font-size:13px;color:${INK}}.sh-mail-h small{font-size:12px;color:${NEUTRAL};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .sh-mail-h em{margin-left:auto;font-style:normal;font-size:11.5px;color:${NEUTRAL}}
  .sh-mail p{margin:10px 0 0;font-size:13.5px;color:${MUTED}}
  .sh-sheet{background:#fff;border-radius:10px;overflow:hidden;font-size:12.5px;box-shadow:0 8px 20px -14px rgba(22,36,28,.5);transform:rotate(.6deg)}
  .sh-sheet-r{display:grid;grid-template-columns:1.3fr .8fr 1fr;padding:7px 14px;border-top:1px solid ${LINE};color:${INK}}
  .sh-sheet-r.head{border-top:0;background:#EEF1EA;color:${NEUTRAL};font-weight:600;font-size:11.5px}
  .sh-sheet-r.clash{background:rgba(220,38,38,.1);color:#B42318;font-weight:600}
  .sh-note{justify-self:start;background:#F8E7A3;color:#5B4A12;font-size:13px;padding:10px 14px;border-radius:4px;transform:rotate(-2deg);box-shadow:0 8px 16px -10px rgba(22,36,28,.5);font-weight:500}
  .sh-pains{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:44px}
  .sh-pains h3{font-size:18px;margin:0 0 6px!important}
  .sh-pains p{margin:0;font-size:15px;color:${MUTED}}

  /* how it works */
  .sh-how{background:#fff}
  .sh-rows{display:grid;gap:84px;margin-top:8px}
  .sh-row{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:64px;align-items:center}
  .sh-row.flip{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)}
  .sh-row.flip .sh-row-t{order:2}
  .sh-row-n{width:36px;height:36px;border-radius:50%;background:${PRIMARY};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15px}
  .sh-row-t h3{font-size:28px;line-height:1.15;letter-spacing:-.015em;margin:16px 0 12px!important}
  .sh-row-t p{margin:0;color:${MUTED};font-size:17px}
  .sh-row-t ul{list-style:none;margin:20px 0 0;padding:0;display:grid;gap:9px}
  .sh-row-t li{display:flex;gap:9px;align-items:flex-start;font-size:15px;color:${INK}}
  .sh-row-t li svg{width:16px;height:16px;color:${PRIMARY};flex-shrink:0;margin-top:4px}
  .sh-row-v{position:relative;padding-bottom:34px}
  .sh-row-v>img{width:100%;height:400px;object-fit:cover;border-radius:22px;display:block}
  .sh-row-ui{position:absolute;right:-18px;bottom:0;width:min(62%,380px)}
  .sh-row.flip .sh-row-ui{right:auto;left:-18px}
  .sh-row-ui .sr-win{box-shadow:0 30px 60px -26px rgba(22,36,28,.55),0 0 0 1px rgba(22,36,28,.08)}

  /* who */
  .sh-who{background:#fff}
  .sh-who-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .sh-who-card{border-radius:20px;overflow:hidden;background:${BG};box-shadow:0 0 0 1px rgba(22,36,28,.07);display:flex;flex-direction:column}
  .sh-who-card img{width:100%;height:210px;object-fit:cover;display:block}
  .sh-who-b{padding:20px 20px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
  .sh-who-b h3{font-size:19px;margin:0!important}
  .sh-who-b p{margin:0;font-size:14.5px;color:${MUTED}}
  .sh-who-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:8px}
  .sh-who-tags em{font-style:normal;font-size:12px;padding:3px 10px;border-radius:999px;background:#fff;color:${MUTED};box-shadow:0 0 0 1px ${LINE}}

  /* AI */
  .sh-ai{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:22px;align-items:stretch}
  .sh-ai-rail{display:grid;gap:12px;align-content:start}
  .sh-ai-rail button{display:grid;grid-template-columns:46px minmax(0,1fr);gap:14px;align-items:center;text-align:left;background:#fff;border:0;border-radius:18px;padding:16px 18px;cursor:pointer;box-shadow:0 0 0 1px rgba(22,36,28,.08);font:inherit;color:inherit;transition:box-shadow .2s ease}
  .sh-ai-rail button{position:relative;overflow:hidden}
  .sh-ai-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:${PRIMARY};transform-origin:left;animation:shBar linear forwards}
  @keyframes shBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @media (prefers-reduced-motion:reduce){.sh-ai-bar{display:none}}
  .sh-ai-rail button:hover{box-shadow:0 0 0 1px rgba(78,111,88,.4)}
  .sh-ai-rail button.on{box-shadow:0 0 0 2px ${PRIMARY},0 18px 34px -24px rgba(22,36,28,.5)}
  .sh-ai-rail button>span{display:grid;gap:2px}
  .sh-ai-rail b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;color:${DEEP}}
  .sh-ai-rail small{font-size:13.5px;color:${MUTED};line-height:1.45}
  .sh-tile{display:block;border-radius:26%;overflow:hidden;background:#E9E4FF;flex-shrink:0;box-shadow:0 0 0 2px #8F7BFF,0 0 0 4.5px rgba(255,255,255,.7)}
  .sh-tile img{width:100%;height:100%;object-fit:cover;display:block}
  .sh-ai-stage{background:#E3EBE2;border-radius:26px;padding:28px;display:grid;gap:16px;align-content:start;min-height:370px;animation:shIn .35s ease both}
  @keyframes shIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .sh-msg.me{display:flex;gap:10px;justify-content:flex-end;align-items:flex-end}
  .sh-msg.me>span{max-width:76%;background:${PRIMARY};color:#fff;padding:11px 16px;border-radius:16px 16px 4px 16px;font-size:14.5px}
  .sh-face{width:36px;height:36px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #fff;flex-shrink:0}
  .sh-msg.bot{display:flex;gap:12px;align-items:flex-start}
  .sh-bot-b{background:#fff;border-radius:4px 16px 16px 16px;padding:14px;display:grid;gap:10px;box-shadow:0 10px 24px -18px rgba(22,36,28,.5);min-width:0;flex:1}
  .sh-bot-b p{margin:0;font-size:14px;color:${INK}}
  .sh-crit{display:flex;flex-wrap:wrap;gap:6px}
  .sh-crit em{font-style:normal;font-size:12px;padding:3px 10px;border-radius:999px;background:${BG};color:${MUTED};box-shadow:0 0 0 1px ${LINE}}
  .sh-opt{display:grid;grid-template-columns:54px minmax(0,1fr) auto;gap:11px;align-items:center;padding:6px;border-radius:11px;box-shadow:0 0 0 1px ${LINE}}
  .sh-opt img{width:54px;height:44px;object-fit:cover;border-radius:8px}
  .sh-opt span{display:grid;min-width:0}.sh-opt b{font-size:13.5px;color:${DEEP}}.sh-opt small{font-size:12px;color:${NEUTRAL}}
  .sh-attn{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 12px;border-radius:11px;box-shadow:0 0 0 1px ${LINE}}
  .sh-attn span{display:grid;min-width:0}.sh-attn b{font-size:13.5px;color:${DEEP}}.sh-attn small{font-size:12px;color:${NEUTRAL}}
  .sh-agent{display:grid;grid-template-columns:56px minmax(0,1fr);gap:16px;align-items:center;background:#fff;border-radius:18px;padding:18px 20px;box-shadow:0 14px 30px -20px rgba(22,36,28,.55)}
  .sh-agent>div{display:grid;gap:3px}
  .sh-prep-k{font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${ACCENT}}
  .sh-agent b{font-size:15.5px;color:${DEEP}}.sh-agent small{font-size:13px;color:${MUTED}}
  .sh-prep-act{display:flex;gap:8px;margin-top:8px}

  @media (max-width:1100px){
    .sh-who-grid{grid-template-columns:repeat(2,1fr)}
    .sh-row,.sh-row.flip{gap:40px}
  }
  @media (max-width:980px){
    .sh-hero-grid,.sh-ai{grid-template-columns:minmax(0,1fr)}
    .sh-ai-stage{min-height:0}
    .sh-hero-grid{gap:36px}
    .sh-row,.sh-row.flip{grid-template-columns:minmax(0,1fr);gap:28px}
    .sh-row.flip .sh-row-t{order:0}
    .sh-rows{gap:64px}
    .sh-row-v>img{height:300px}
    .sh-row-ui,.sh-row.flip .sh-row-ui{right:12px;left:auto;width:min(70%,340px)}
  }
  @media (max-width:860px){
    .sh-h1{font-size:36px}
    .sh-ba{grid-template-columns:minmax(0,1fr);gap:0}
    .sh-arrow{transform:rotate(90deg);margin:-14px 0}
    .sh-pains{grid-template-columns:minmax(0,1fr);gap:20px}
    .sh-hero-grid{padding:36px 0 40px}
  }
  @media (max-width:560px){
    .sh-who-grid{grid-template-columns:minmax(0,1fr)}
    .sh-row-v{padding-bottom:0}
    .sh-row-ui,.sh-row.flip .sh-row-ui{position:relative;z-index:1;right:auto;left:auto;width:auto;margin-top:-56px;padding:0 12px}
    .sh-row-v>img{height:240px}
    .sh-before{padding:52px 16px 22px}
    .sh-after{padding:52px 12px 12px}
    .sh-ai-stage{padding:16px}
    .sh-ai-rail button{padding:14px}
    .sh-attn{align-items:flex-start;flex-direction:column;gap:6px}
    .sh-opt{grid-template-columns:44px minmax(0,1fr)}
    .sh-opt img{width:44px;height:38px}
    .sh-opt .sr-badge{grid-column:2;justify-self:start}
    .sh-agent{grid-template-columns:48px minmax(0,1fr);gap:10px;padding:14px}
  }
`;
