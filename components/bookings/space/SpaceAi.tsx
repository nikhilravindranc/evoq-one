"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useInView } from "./fx";
import { BG, DEEP, INK, LINE, MUTED, NEUTRAL, PRIMARY } from "./palette";
import { SPACE_IMG } from "./ui";

/* AI assistants: three steps on the left, one conversation on the right that moves from a visitor asking,
   to the team asking, to an agent preparing a change that a person approves. Only two characters appear:
   EVI where an assistant answers and Kai where an agent prepares. The scenes take turns once, then wait. */

const VIEWS = ["Visitor asks", "Team asks", "Agent prepares"] as const;
const STEPS = [
  ["Ask", "Visitors and your team describe what they need, the way they would tell a colleague."],
  ["Get matches", "EVI answers from your spaces, rules and bookings."],
  ["Approve", "Kai prepares a change with its impact. A person approves it before anything moves."],
];
const DWELL = 7000;

export function SpaceAi() {
  const [v, setV] = useState(0);
  const [auto, setAuto] = useState(true);
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  useEffect(() => {
    if (!auto || !seen || v >= VIEWS.length - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setV((n) => n + 1), DWELL);
    return () => clearTimeout(t);
  }, [v, auto, seen]);

  return (
    <section className="sr-out sr-sec ai" id="ai">
      <style>{css}</style>
      <div className="sr-in ai-in ai-panel">
        <div className="ai-copy" data-rv="0">
          <span className="sr-label">AI assistants</span>
          <h2 className="sr-h2" style={{ marginTop: 14 }}>Booking help that asks before it acts.</h2>
          <p className="sr-lead">EVI answers from your bookings, and Kai prepares changes for your team to review. Nothing moves until a person approves it.</p>
          <div className="ai-low">
            <img className="ai-evi" src="/characters/evi-cut-tablet.png" alt="EVI, the AI assistant" width={230} height={238} />
          <ol className="ai-steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}><b>{i + 1}</b><span><em>{t}</em>{d}</span></li>
            ))}
          </ol>
          </div>
        </div>

        <div className="ai-card" data-rv="1" ref={ref}>
          <div className="ai-seg" role="tablist" aria-label="AI scenes">
            {VIEWS.map((x, i) => (
              <button key={x} type="button" role="tab" aria-selected={v === i} className={v === i ? "on" : ""} onClick={() => { setAuto(false); setV(i); }}>
                {v === i && auto && seen && i < VIEWS.length - 1 && <i className="ai-bar" aria-hidden />}
                {x}
              </button>
            ))}
          </div>

          <div className="ai-stage" key={v} role="tabpanel">
            {v === 0 && (
              <>
                <div className="ai-me">I need a room for 10 people with a screen, Thursday afternoon.</div>
                <div className="ai-bot">
                  <div>
                    <span className="ai-who">EVI</span>
                    <span className="ai-crit"><em>Thu 19 Nov</em><em>13:00 to 17:00</em><em>10+ seats</em><em>Screen</em></span>
                    <div className="ai-opt"><img src={SPACE_IMG.board} alt="" /><span><b>Board Room</b><small>12 seats · Display</small></span><em className="sr-badge ok">Free 14:00</em></div>
                    <div className="ai-opt"><img src={SPACE_IMG.training} alt="" /><span><b>Training Room 2</b><small>24 seats · Projector</small></span><em className="sr-badge warn">Needs approval</em></div>
                  </div>
                </div>
              </>
            )}
            {v === 1 && (
              <>
                <div className="ai-me">What needs my attention today?</div>
                <div className="ai-bot">
                  <div>
                    <span className="ai-who">EVI</span>
                    {[
                      ["2 requests waiting for approval", "Town hall and Client review", "warn", "Review"],
                      ["1 conflict", "Hall A is blocked on Friday morning and a workshop is booked there", "off", "Open"],
                      ["4 check ins before noon", "Board Room, Glass Room and 2 more", "ok", "View"],
                    ].map(([t, d, k, c]) => (
                      <div key={t} className="ai-row"><span><b>{t}</b><small>{d}</small></span><em className={`sr-badge ${k}`}>{c}</em></div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {v === 2 && (
              <>
                <div className="ai-bot">
                  <img src="/characters/evi.webp" alt="EVI" width={32} height={32} />
                  <div><span className="ai-who">EVI</span><p className="ai-say">Hall A is blocked on Friday morning, so I asked Kai to prepare a move for the vendor workshop.</p></div>
                </div>
                <div className="ai-prep">
                  <div className="ai-prep-h"><img src="/characters/kai.webp" alt="Kai" width={26} height={26} /><span>Kai · prepared for review</span><em className={`sr-badge ${decision === "approved" ? "ok" : decision === "rejected" ? "off" : "warn"}`}>{decision === "approved" ? "Approved" : decision === "rejected" ? "Rejected" : "Waiting"}</em></div>
                  <b>Move the vendor workshop to Training Room 2</b>
                  <dl>
                    <div><dt>When</dt><dd>Friday, 09:00 to 11:00</dd></div>
                    <div><dt>Impact</dt><dd>1 organizer notified</dd></div>
                    <div><dt>Buffers</dt><dd>Same setup and cleanup time</dd></div>
                  </dl>
                  {decision ? (
                    <p className="ai-done">{decision === "approved" ? "Approved. The organizer was notified and the calendar is updated." : "Rejected. The workshop stays in Hall A and nothing changed."} <button type="button" onClick={() => setDecision(null)}>Undo</button></p>
                  ) : (
                    <span className="ai-acts">
                      <button type="button" className="sr-btn ghost sm" onClick={() => setDecision("rejected")}>Reject</button>
                      <button type="button" className="sr-btn primary sm" onClick={() => setDecision("approved")}>Approve</button>
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .ai-in{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:48px;align-items:stretch}
  .ai-panel{text-align:left;position:relative;overflow:hidden;background:#F3E8D8;border-radius:34px;padding:44px 44px 0;box-shadow:0 0 0 1px rgba(43,33,28,.05)}
  .ai-panel::before{content:"";position:absolute;left:-140px;bottom:-160px;width:520px;height:520px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,185,140,.7),rgba(217,185,140,0));pointer-events:none}
  .ai-copy{position:relative;display:flex;flex-direction:column}
  .ai-low{display:grid;grid-template-columns:230px minmax(0,1fr);gap:18px;align-items:end;margin-top:auto;padding-top:18px}
  .ai-evi{width:230px;height:auto;display:block;align-self:end;filter:drop-shadow(0 18px 24px rgba(43,33,28,.18))}
  .ai-card{align-self:center;margin-bottom:44px;position:relative}
  .ai-steps{list-style:none;margin:0 0 30px;padding:0;display:grid;gap:14px}
  .ai-steps li{display:grid;grid-template-columns:30px minmax(0,1fr);gap:14px;align-items:start;font-size:15px;line-height:1.5;color:${MUTED}}
  .ai-steps b{width:30px;height:30px;border-radius:50%;border:1.5px solid ${PRIMARY};color:${PRIMARY};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-size:13px}
  .ai-steps em{display:block;font-style:normal;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:16px;color:${DEEP};margin-bottom:1px}
  .ai-card{background:#fff;border-radius:24px;padding:18px;box-shadow:0 30px 60px -34px rgba(43,33,28,.45),0 0 0 1px ${LINE};min-width:0}
  .ai-seg{display:flex;gap:4px;background:${BG};border-radius:12px;padding:4px;margin-bottom:14px}
  .ai-seg button{position:relative;overflow:hidden;flex:1;border:0;background:none;padding:9px 8px;border-radius:9px;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:13.5px;color:${MUTED};cursor:pointer;white-space:nowrap}
  .ai-seg button.on{background:#fff;color:${DEEP};box-shadow:0 1px 4px rgba(43,33,28,.16)}
  .ai-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:${PRIMARY};transform-origin:left;animation:aiBar ${DWELL}ms linear forwards}
  @keyframes aiBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  .ai-stage{display:grid;gap:12px;align-content:start;min-height:312px;animation:aiIn .35s ease both}
  @keyframes aiIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .ai-me{justify-self:end;max-width:80%;background:${PRIMARY};color:#fff;padding:10px 15px;border-radius:16px 16px 4px 16px;font-size:14.5px}
  .ai-bot{display:block}
  .ai-who{font-family:var(--font-display),system-ui,sans-serif;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY}}
  .ai-bot>div{background:${BG};border-radius:4px 16px 16px 16px;padding:12px;display:grid;gap:9px;min-width:0}
  .ai-say{margin:0;font-size:14px;color:${INK}}
  .ai-crit{display:flex;flex-wrap:wrap;gap:6px}
  .ai-crit em{font-style:normal;font-size:12px;padding:3px 10px;border-radius:999px;background:#fff;color:${MUTED};box-shadow:0 0 0 1px ${LINE}}
  .ai-opt{display:grid;grid-template-columns:50px minmax(0,1fr) auto;gap:10px;align-items:center;padding:6px;border-radius:11px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ai-opt img{width:50px;height:42px;object-fit:cover;border-radius:8px}
  .ai-opt span,.ai-row span{display:grid;min-width:0}.ai-opt b,.ai-row b{font-size:13.5px;color:${DEEP}}.ai-opt small,.ai-row small{font-size:12px;color:${NEUTRAL}}
  .ai-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 11px;border-radius:11px;background:#fff;box-shadow:0 0 0 1px ${LINE}}
  .ai-prep{background:${BG};border-radius:16px;padding:14px 16px;display:grid;gap:10px;box-shadow:0 0 0 1px ${LINE}}
  .ai-prep-h{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${PRIMARY};font-family:var(--font-display),system-ui,sans-serif}
  .ai-prep-h img{width:26px;height:26px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 1.5px #fff,0 0 0 3px #8F7BFF}
  .ai-prep-h .sr-badge{margin-left:auto;letter-spacing:0;text-transform:none}
  .ai-prep>b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .ai-prep dl{margin:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
  .ai-prep dl>div{display:grid;gap:1px}.ai-prep dt{font-size:11px;color:${NEUTRAL}}.ai-prep dd{margin:0;font-size:12.5px;font-weight:600;color:${DEEP}}
  .ai-acts{display:flex;gap:8px;justify-content:flex-end}
  .ai-done{margin:0;font-size:13.5px;color:${MUTED}}
  .ai-done button{background:none;border:0;padding:0 0 0 6px;font:inherit;font-weight:600;color:${PRIMARY};cursor:pointer;text-decoration:underline}
  @media (max-width:980px){
    .ai-in{grid-template-columns:minmax(0,1fr);gap:28px}.ai-stage{min-height:0}
    .ai-panel{padding:30px 24px 0;border-radius:28px}
    .ai-card{margin-bottom:30px}
    .ai-low{grid-template-columns:150px minmax(0,1fr)}.ai-evi{width:150px}
  }
  @media (max-width:560px){
    .ai-panel{padding:24px 16px 0}
    .ai-low{grid-template-columns:minmax(0,1fr)}.ai-evi{width:130px;margin:0 auto -0px;order:2}
    .ai-card{padding:12px}
    .ai-seg button{font-size:12px;padding:8px 4px}
    .ai-opt{grid-template-columns:42px minmax(0,1fr)}.ai-opt img{width:42px;height:36px}.ai-opt .sr-badge{grid-column:2;justify-self:start}
    .ai-row{flex-direction:column;align-items:flex-start;gap:6px}
    .ai-prep dl{grid-template-columns:minmax(0,1fr)}
  }
  @media (prefers-reduced-motion:reduce){.ai-bar{display:none}.ai-stage{animation:none}}
`;
