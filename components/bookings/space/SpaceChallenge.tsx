"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, type ReactNode } from "react";
import { I } from "../theme";
import { useInView } from "./fx";
import { BG, DEEP, INK, LINE, MUTED, NEUTRAL, PRIMARY, PRIMARY_HOVER, SAND } from "./palette";
import { SPACE_IMG } from "./ui";

/* The challenge: six everyday problems on the left, and on the right what it looks like today next to
   what it looks like with EVOQ Bookings. The picture follows the problem you choose; the problems take
   turns once while the section is on screen, and a click hands control over. Sample data. */

type Scene = { t: string; d: string; img: string; before: ReactNode; after: ReactNode };

const SCENES: Scene[] = [
  {
    t: "Requests in email", d: "Retyped into a spreadsheet and answered by hand.", img: SPACE_IMG.prayer,
    before: (
      <>
        <div className="cx-mail"><div className="cx-mail-h"><i>FD</i><span><b>Facilities inbox</b><small>Re: Hall A on Saturday?</small></span><em>9:41</em></div><p>Could we have the hall from 14:00 for about 40 people? Not sure if the projector is free. Thanks!</p></div>
        <div className="cx-tag bad">Copied into a sheet by hand</div>
      </>
    ),
    after: (
      <div className="cx-card">
        <div className="cx-req"><i className="cx-av">S</i><span><b>Sam requested Hall A</b><small>Sat 21 Nov · 14:00 to 17:00</small></span></div>
        <div className="cx-btns"><span className="cx-b ghost">Decline</span><span className="cx-b">Approve</span></div>
        <div className="cx-tag good">{I.check}Sam is told by email</div>
      </div>
    ),
  },
  {
    t: "Double bookings", d: "Two teams arrive at a room that two calendars both gave away.", img: SPACE_IMG.board,
    before: (
      <>
        <div className="cx-sheet">
          <div className="r head"><span>Room</span><span>Time</span><span>Team</span></div>
          <div className="r"><span>Board Room</span><span>10:00</span><span>Sales</span></div>
          <div className="r clash"><span>Board Room</span><span>10:00</span><span>Finance</span></div>
        </div>
        <div className="cx-tag bad">Two calendars, one room</div>
      </>
    ),
    after: (
      <div className="cx-card">
        <div className="cx-lane"><span>Board Room</span><div><i style={{ left: "22%", width: "26%" }}>Sales</i></div></div>
        <div className="cx-blocked">{I.clock}Finance tried 10:00. It is already booked.</div>
        <div className="cx-tag good">{I.check}Shown before it is sent</div>
      </div>
    ),
  },
  {
    t: "No view across sites", d: "Each building keeps its own calendar and nobody sees what is free.", img: SPACE_IMG.corridor,
    before: (
      <>
        <div className="cx-cals">
          {["Head office", "Riverside", "Annex"].map((n) => <div key={n}><b>{n}</b><i /><i /><i /></div>)}
        </div>
        <div className="cx-tag bad">What is free elsewhere?</div>
      </>
    ),
    after: (
      <div className="cx-card">
        {[["Head office", 24, 7, 64, SPACE_IMG.corridor], ["Riverside", 38, 11, 71, SPACE_IMG.lounge], ["Annex", 9, 2, 33, SPACE_IMG.glass]].map(([n, s, b, u, im]) => (
          <div key={n as string} className="cx-site"><img src={im as string} alt="" /><b>{n}</b><small>{s} spaces · {b} booked</small><i><i style={{ width: `${u}%` }} /></i></div>
        ))}
        <div className="cx-tag good">{I.check}Every site in a single list</div>
      </div>
    ),
  },
  {
    t: "Rules in a few heads", d: "Approval and cancellation depend on who answers the email.", img: SPACE_IMG.glass,
    before: (
      <>
        <div className="cx-notes"><span>Ask Dan first</span><span>Does the hall need approval?</span><span>Mia said 24 hours notice. Or was it 48?</span></div>
        <div className="cx-tag bad">Different answer each time</div>
      </>
    ),
    after: (
      <div className="cx-card">
        {[["Opening hours", "Mon to Fri, 08:00 to 19:00"], ["Minimum notice", "24 hours"], ["Approval", "Outside groups"], ["Longest booking", "4 hours"]].map(([k, v]) => (
          <div key={k} className="cx-rule"><span>{I.check}{k}</span><b>{v}</b></div>
        ))}
        <div className="cx-tag good">{I.check}Set once for each space</div>
      </div>
    ),
  },
  {
    t: "Rooms held and unused", d: "Bookings nobody turns up for keep the room from others.", img: SPACE_IMG.training,
    before: (
      <>
        <div className="cx-room"><img src={SPACE_IMG.training} alt="" /><span><b>Training Room 2</b><small>Booked 13:00 to 15:00</small></span><em>Empty</em></div>
        <div className="cx-tag bad">Held all afternoon, nobody came</div>
      </>
    ),
    after: (
      <div className="cx-card">
        <div className="cx-room"><img src={SPACE_IMG.training} alt="" /><span><b>Training Room 2</b><small>Released at 13:05</small></span><em className="ok">Free</em></div>
        <div className="cx-btns"><span className="cx-b">Book this room</span></div>
        <div className="cx-tag good">{I.check}Back in the pool after the grace period</div>
      </div>
    ),
  },
  {
    t: "No clear picture", d: "Nobody can say which spaces are busy and which sit empty.", img: SPACE_IMG.lounge,
    before: (
      <>
        <div className="cx-guess"><span>?</span><span>?</span><span>?</span></div>
        <div className="cx-note">Which rooms are busy? No idea.</div>
        <div className="cx-tag bad">Decisions by guesswork</div>
      </>
    ),
    after: (
      <div className="cx-card">
        {[["Board Room", 81, "Busy", SPACE_IMG.board], ["Training Room 2", 56, "Steady", SPACE_IMG.training], ["Hall A", 22, "Quiet", SPACE_IMG.prayer]].map(([n, u, k, im]) => (
          <div key={n as string} className="cx-site"><img src={im as string} alt="" /><b>{n}</b><small>{k}</small><i><i style={{ width: `${u}%` }} /></i></div>
        ))}
        <div className="cx-tag good">{I.check}Utilization you can export</div>
      </div>
    ),
  },
];
const DWELL = 6000;

export function SpaceChallenge() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  useEffect(() => {
    if (!auto || !seen || i >= SCENES.length - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => n + 1), DWELL);
    return () => clearTimeout(t);
  }, [i, auto, seen]);
  const s = SCENES[i];
  return (
    <section className="sr-out sr-sec cx" id="challenge">
      <style>{css}</style>
      <div className="sr-in">
        <div className="sr-head" data-rv="0">
          <h2 className="sr-h2">Space booking breaks in more places than the calendar.</h2>
          <p className="sr-lead">Requests pile up in inboxes, rules live in a few heads, and nobody can say which rooms are really used.</p>
        </div>
        <div className="cx-grid" ref={ref} data-rv="1">
          <div className="cx-list" role="tablist" aria-label="Problems">
            {SCENES.map((x, n) => (
              <button key={x.t} type="button" role="tab" aria-selected={i === n} className={i === n ? "on" : ""} onClick={() => { setAuto(false); setI(n); }}>
                <b>{n + 1}</b><span><em>{x.t}</em><small>{x.d}</small></span>
                {i === n && auto && seen && n < SCENES.length - 1 && <i className="cx-bar" aria-hidden />}
              </button>
            ))}
          </div>
          <div className="cx-stage" key={i} role="tabpanel">
            <div className="cx-pane before"><span className="cx-fill" style={{ backgroundImage: `url(${s.img})` }} aria-hidden /><span className="cx-pill bad">Today</span>{s.before}</div>
            <span className="cx-arrow" aria-hidden>{I.arrow}</span>
            <div className="cx-pane after"><div className="cx-band" aria-hidden><img src={s.img} alt="" /></div><span className="cx-pill good">With EVOQ Bookings</span>{s.after}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .cx.sr-sec{padding-top:88px;padding-bottom:88px}
  .cx .sr-head{margin-bottom:30px}
  .cx-grid{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:28px;align-items:stretch}
  .cx-list{display:grid;gap:8px;align-content:start}
  .cx-list button{position:relative;overflow:hidden;display:grid;grid-template-columns:30px minmax(0,1fr);gap:14px;align-items:start;text-align:left;border:0;background:#fff;border-radius:16px;padding:13px 16px;cursor:pointer;font:inherit;color:inherit;box-shadow:0 0 0 1px ${LINE};transition:box-shadow .2s ease}
  .cx-list button:hover{box-shadow:0 0 0 1px rgba(180,88,58,.45)}
  .cx-list button.on{box-shadow:0 0 0 2px ${PRIMARY},0 16px 30px -22px rgba(43,33,28,.5)}
  .cx-list b{width:28px;height:28px;border-radius:50%;background:#F3E8D8;color:${DEEP};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px}
  .cx-list button.on b{background:${PRIMARY};color:#fff}
  .cx-list span{display:grid;gap:1px}.cx-list em{font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:15.5px;color:${DEEP}}
  .cx-list small{font-size:13px;line-height:1.4;color:${MUTED}}
  .cx-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:${PRIMARY};transform-origin:left;animation:cxBar ${DWELL}ms linear forwards}
  @keyframes cxBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  .cx-stage{display:grid;grid-template-columns:minmax(0,1fr) 40px minmax(0,1fr);align-items:stretch;animation:cxIn .35s ease both;min-height:340px}
  @keyframes cxIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .cx-pane{position:relative;border-radius:22px;padding:52px 18px 18px;display:grid;gap:12px;align-content:center;overflow:hidden}
  .cx-pane.before{background:#E9DDCF;isolation:isolate}
  .cx-fill{position:absolute;inset:0;z-index:-1;background-size:cover;background-position:center;filter:grayscale(.85) contrast(.9);opacity:.5}
  .cx-pane.before::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(239,230,218,.55),rgba(233,221,207,.86))}
  .cx-pane.after{background:#fff;box-shadow:0 0 0 1px rgba(43,33,28,.07);padding-top:0;align-content:stretch;grid-template-rows:minmax(104px,1fr) auto}
  .cx-band{margin:0 -18px;overflow:hidden;position:relative;min-height:104px}
  .cx-band img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  .cx-band::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(43,33,28,.18),rgba(43,33,28,0) 55%)}
  .cx-pane.after .cx-pill{background:#fff;color:${PRIMARY_HOVER};box-shadow:0 6px 14px -8px rgba(43,33,28,.5)}
  .cx-pane.after>:not(.cx-band):not(.cx-pill){position:relative}
  .cx-pane.after .cx-card{margin-top:-34px;background:#fff;border-radius:16px;padding:14px;box-shadow:0 14px 30px -18px rgba(43,33,28,.55),0 0 0 1px ${LINE}}
  .cx-pill{position:absolute;top:16px;left:18px;font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;padding:4px 11px;border-radius:999px}
  .cx-pill.bad{background:rgba(43,33,28,.1);color:${DEEP}}.cx-pill.good{background:rgba(180,88,58,.12);color:${PRIMARY_HOVER}}
  .cx-arrow{align-self:center;justify-self:center;width:34px;height:34px;border-radius:50%;background:${PRIMARY};color:#fff;display:grid;place-items:center;z-index:2;box-shadow:0 0 0 5px ${BG}}
  .cx-arrow svg{width:16px;height:16px}
  .cx-card{display:grid;gap:10px}
  .cx-tag{display:inline-flex;align-items:center;gap:6px;justify-self:start;font-size:12px;font-weight:600;padding:5px 10px;border-radius:999px}
  .cx-tag svg{width:13px;height:13px}
  .cx-tag.bad{background:#fff;color:#B42318;box-shadow:0 6px 14px -8px rgba(43,33,28,.45)}.cx-tag.good{background:rgba(22,138,74,.1);color:#116B38}
  .cx-mail{background:#fff;border-radius:12px;padding:12px 14px;box-shadow:0 8px 20px -14px rgba(43,33,28,.5);transform:rotate(-.8deg)}
  .cx-mail-h{display:flex;align-items:center;gap:9px}.cx-mail-h i{width:28px;height:28px;border-radius:50%;background:${SAND};color:${DEEP};display:grid;place-items:center;font-style:normal;font-size:10.5px;font-weight:700}
  .cx-mail-h span{display:grid;line-height:1.3;min-width:0}.cx-mail-h b{font-size:12.5px;color:${INK}}.cx-mail-h small{font-size:11.5px;color:${NEUTRAL};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cx-mail-h em{margin-left:auto;font-style:normal;font-size:11px;color:${NEUTRAL}}
  .cx-mail p{margin:8px 0 0;font-size:12.5px;color:${MUTED}}
  .cx-req{display:flex;align-items:center;gap:10px;background:${BG};border-radius:12px;padding:10px 12px}
  .cx-av{width:30px;height:30px;border-radius:50%;background:${SAND};color:${DEEP};display:grid;place-items:center;font-style:normal;font-weight:700;font-size:12px;font-family:var(--font-display),system-ui,sans-serif}
  .cx-req span{display:grid}.cx-req b{font-size:13px;color:${DEEP}}.cx-req small{font-size:11.5px;color:${NEUTRAL}}
  .cx-btns{display:flex;gap:8px;justify-content:flex-end}
  .cx-b{font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;padding:7px 14px;border-radius:8px;background:${PRIMARY};color:#fff}.cx-b.ghost{background:#fff;color:${INK};box-shadow:0 0 0 1px ${LINE}}
  .cx-sheet{background:#fff;border-radius:10px;overflow:hidden;font-size:12px;box-shadow:0 8px 20px -14px rgba(43,33,28,.5);transform:rotate(.6deg)}
  .cx-sheet .r{display:grid;grid-template-columns:1.3fr .8fr 1fr;padding:7px 12px;border-top:1px solid ${LINE};color:${INK}}
  .cx-sheet .head{border-top:0;background:#F4EEE6;color:${NEUTRAL};font-weight:600;font-size:11px}.cx-sheet .clash{background:rgba(220,38,38,.1);color:#B42318;font-weight:600}
  .cx-lane{display:grid;grid-template-columns:78px minmax(0,1fr);gap:8px;align-items:center;font-size:12px;font-weight:600;color:${DEEP}}
  .cx-lane div{position:relative;height:28px;border-radius:7px;background:${BG};box-shadow:0 0 0 1px ${LINE}}
  .cx-lane i{position:absolute;top:3px;bottom:3px;border-radius:5px;background:${PRIMARY};color:#fff;font-style:normal;font-size:11px;line-height:22px;padding:0 8px}
  .cx-blocked{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:10px;background:#FBF1DC;color:#7A4A06;font-size:12.5px;font-weight:600}.cx-blocked svg{width:14px;height:14px;flex-shrink:0}
  .cx-cals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
  .cx-cals div{background:#fff;border-radius:10px;padding:10px;display:grid;gap:5px;box-shadow:0 6px 16px -12px rgba(43,33,28,.5)}
  .cx-cals b{font-size:11.5px;color:${DEEP}}.cx-cals i{height:8px;border-radius:4px;background:#E8DACB}.cx-cals i:nth-of-type(2){width:70%}.cx-cals i:nth-of-type(3){width:45%}
  .cx-site{display:grid;grid-template-columns:32px minmax(0,1fr) auto;gap:2px 10px;align-items:center}
  .cx-site>img{width:32px;height:28px;object-fit:cover;border-radius:7px;grid-row:1/3}
  .cx-site b{font-size:13px;color:${DEEP}}.cx-site small{font-size:11.5px;color:${NEUTRAL};text-align:right}
  .cx-site>i{grid-column:2/-1;height:7px;border-radius:7px;background:#EDE4D8;overflow:hidden;display:block}.cx-site>i>i{display:block;height:100%;background:${PRIMARY};border-radius:7px}
  .cx-notes{display:grid;gap:8px}
  .cx-notes span{justify-self:start;background:#F8E7A3;color:#5B4A12;font-size:12.5px;font-weight:500;padding:8px 12px;border-radius:4px;box-shadow:0 8px 16px -10px rgba(43,33,28,.5)}
  .cx-notes span:nth-child(1){transform:rotate(-2deg)}.cx-notes span:nth-child(2){transform:rotate(1.5deg);margin-left:22px}.cx-notes span:nth-child(3){transform:rotate(-1deg)}
  .cx-rule{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid ${LINE};font-size:12.5px}
  .cx-rule span{display:inline-flex;align-items:center;gap:7px;color:${MUTED}}.cx-rule svg{width:13px;height:13px;color:#168A4A}.cx-rule b{color:${DEEP};text-align:right}
  .cx-room{display:grid;grid-template-columns:54px minmax(0,1fr) auto;gap:10px;align-items:center;background:#fff;border-radius:12px;padding:8px;box-shadow:0 8px 20px -14px rgba(43,33,28,.5)}
  .cx-room img{width:54px;height:44px;object-fit:cover;border-radius:8px}.cx-room span{display:grid}.cx-room b{font-size:13px;color:${DEEP}}.cx-room small{font-size:11.5px;color:${NEUTRAL}}
  .cx-room em{font-style:normal;font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:#ECE4D8;color:${MUTED}}.cx-room em.ok{background:#E3F3E8;color:#116B38}
  .cx-guess{display:flex;gap:10px;justify-content:center}
  .cx-guess span{width:54px;height:80px;border-radius:10px;border:2px dashed #CDBBA8;display:grid;place-items:center;font-size:26px;color:#B7A592;font-family:var(--font-display),system-ui,sans-serif}
  .cx-note{justify-self:center;background:#F8E7A3;color:#5B4A12;font-size:13px;padding:9px 14px;border-radius:4px;transform:rotate(-2deg);box-shadow:0 8px 16px -10px rgba(43,33,28,.5);font-weight:500}
  @media (max-width:1000px){.cx-grid{grid-template-columns:minmax(0,1fr)}.cx-stage{min-height:0}}
  @media (max-width:640px){
    .cx.sr-sec{padding-top:64px;padding-bottom:64px}
    .cx-stage{grid-template-columns:minmax(0,1fr)}.cx-arrow{transform:rotate(90deg);margin:-14px 0}
    .cx-list small{display:none}
  }
  @media (prefers-reduced-motion:reduce){.cx-bar{display:none}.cx-stage{animation:none}}
`;
