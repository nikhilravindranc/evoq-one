"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";
import { I } from "../theme";
import { BG, DEEP, INK, LINE, MIST, MIST_SOFT, MUTED, NEUTRAL, PRIMARY, PRIMARY_HOVER } from "./palette";

/* The hero tool: a client books an appointment on a clinic's booking page, and the front desk sees it
   land in the provider's schedule. Sam books, Mia runs the front desk, Dana and Marcus are providers.
   It plays once by itself and hands over on the first click. Sample data; nothing is sent anywhere. */

type Step = "service" | "time" | "details" | "done" | "moved" | "cancelled";
const SERVICES = [
  { id: "consult", name: "Initial consultation", d: "30 min · First visit with a practitioner", img: "/healthcare/pm/stock-patient.jpg" },
  { id: "follow", name: "Follow up visit", d: "20 min · Review and next steps", img: "/healthcare/pm/practice-clinics.jpg" },
  { id: "physio", name: "Physiotherapy session", d: "45 min · Treatment and exercises", img: "/healthcare/pm/practice-physio.jpg" },
];
const PROVIDERS = [
  { id: "dana", name: "Dana", role: "General practitioner", img: "/characters/dana.webp", free: ["09:30", "11:00", "14:30", "16:00"] },
  { id: "marcus", name: "Marcus", role: "Physiotherapist", img: "/characters/marcus.webp", free: ["10:00", "13:30", "15:00"] },
];
const TIMES = ["09:30", "10:00", "11:00", "13:30", "14:30", "15:00", "16:00"];
const DAYS = ["Wed 18", "Thu 19", "Fri 20"];
const SAM = "/characters/sam.webp";
const MIA = "/characters/mia.webp";
const STORY = [
  "Sam needs a consultation at Riverside Clinic.",
  "Sam picks a provider and a time that suits.",
  "Sam adds the details and confirms the booking.",
  "Mia sees it in the provider's schedule and can still change it.",
];

const Coach = ({ n, children }: { n: number; children: string }) => (
  <span className="at-coach"><b>{n}</b>{children}<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden><path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
);

export function ApptTryIt() {
  const [step, setStep] = useState<Step>("service");
  const [svc, setSvc] = useState(SERVICES[0]);
  const [prov, setProv] = useState(PROVIDERS[0]);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState<string | null>(null);
  const [auto, setAuto] = useState(0);
  const touched = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => { if (timer.current) clearTimeout(timer.current); setAuto(-1); }, []);
  const mark = useCallback((event: string, props: Record<string, string | number> = {}) => {
    if (!touched.current) { touched.current = true; track("start_appointment_widget", { page: "appointments" }); }
    track(event, { page: "appointments", ...props });
  }, []);
  const act = useCallback((fn: () => void, event: string, props?: Record<string, string | number>) => () => { stop(); mark(event, props); fn(); }, [stop, mark]);

  const placed = step === "done" || step === "moved" || step === "cancelled";
  const storyIx = step === "service" ? 0 : step === "time" ? 1 : step === "details" ? 2 : 3;
  const when = `${DAYS[day]} Nov, ${time ?? ""}`;
  const shown = step === "moved" ? "16:00" : time;
  const reset = () => { stop(); setStep("service"); setSvc(SERVICES[0]); setProv(PROVIDERS[0]); setDay(1); setTime(null); };

  useEffect(() => {
    if (auto === -1) return;
    const next: Record<number, () => void> = {
      0: () => setAuto(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? -1 : 1),
      1: () => { setSvc(SERVICES[0]); setStep("time"); setAuto(2); },
      2: () => { setTime("14:30"); setAuto(3); },
      3: () => { setStep("details"); setAuto(4); },
      4: () => { setStep("done"); setAuto(5); },
      5: () => setAuto(-1),
    };
    const wait = [1500, 1700, 1500, 1500, 2000, 1800][auto] ?? 1500;
    timer.current = setTimeout(() => next[auto]?.(), wait);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [auto]);

  const pulse = (on: boolean) => (on ? " at-pulse" : "");

  return (
    <div className="at" onPointerDown={() => { if (auto > 0) stop(); }} onKeyDown={() => { if (auto > 0) stop(); }}>
      <style>{css}</style>
      <div className="at-win">
        <div className="at-chrome">
          <span className="at-dots" aria-hidden><i /><i /><i /></span>
          <span className="at-url"><svg viewBox="0 0 16 16" width="11" height="11" aria-hidden><path d="M5 7V5a3 3 0 0 1 6 0v2M4 7h8v6H4z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>book.riverside-clinic.example</span>
          <button type="button" className="at-reset" onClick={reset}>Start over</button>
        </div>
        <div className="at-site">
          <div className="at-brand"><span className="at-logo" aria-hidden>R</span><b>Riverside Clinic</b><span className="at-who"><img className="at-face" src={SAM} alt="" width={22} height={22} />Hi, Sam</span></div>
          <ol className="at-progress" aria-label="Booking steps">
            {["Service", "Provider and time", "Details", "Confirmed"].map((s, i) => <li key={s} className={i === storyIx ? "on" : i < storyIx ? "done" : ""}><i>{i < storyIx ? I.check : i + 1}</i>{s}</li>)}
          </ol>

          <div className="at-body" key={step}>
            {step === "service" && (
              <>
                <div className="at-row"><h4>Which service do you need?</h4><Coach n={1}>Choose a service</Coach></div>
                <div className="at-svcs">
                  {SERVICES.map((s, i) => (
                    <button key={s.id} type="button" className={`at-svc${pulse(auto === 1 && i === 0)}`} onClick={act(() => { setSvc(s); setStep("time"); }, "pick_service", { service: s.name })}>
                      <img src={s.img} alt="" />
                      <span><b>{s.name}</b><small>{s.d}</small></span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === "time" && (
              <div className="at-two">
                <div>
                  <div className="at-provs" role="group" aria-label="Provider">
                    {PROVIDERS.map((p) => (
                      <button key={p.id} type="button" className={prov.id === p.id ? "on" : ""} aria-pressed={prov.id === p.id} onClick={act(() => { setProv(p); setTime(null); }, "pick_provider", { provider: p.name })}>
                        <img className="at-face" src={p.img} alt="" width={30} height={30} /><span><b>{p.name}</b><small>{p.role}</small></span>
                      </button>
                    ))}
                  </div>
                  <div className="at-days" role="group" aria-label="Day">{DAYS.map((d, i) => <button key={d} type="button" className={i === day ? "on" : ""} aria-pressed={i === day} onClick={act(() => { setDay(i); setTime(null); }, "pick_day")}>{d}</button>)}</div>
                  <div className="at-times" role="group" aria-label="Time">
                    {TIMES.map((t) => {
                      const free = prov.free.includes(t);
                      return <button key={t} type="button" disabled={!free} className={`${time === t ? "on" : ""}${pulse(auto === 2 && t === "14:30")}`} aria-pressed={time === t} onClick={act(() => setTime(t), "pick_time", { time: t })}>{t}</button>;
                    })}
                  </div>
                </div>
                <div className="at-sum">
                  <span className="at-k">Your appointment</span>
                  <b>{svc.name}</b>
                  <small>{prov.name}, {prov.role}</small>
                  <small>{time ? when : "Choose a time"}</small>
                  <small>Riverside Clinic, Room 2</small>
                  {time ? <Coach n={2}>Continue</Coach> : <Coach n={2}>Pick a time</Coach>}
                  <button type="button" disabled={!time} className={`at-btn${pulse(auto === 3)}`} onClick={act(() => setStep("details"), "continue_to_details")}>Continue</button>
                </div>
              </div>
            )}

            {step === "details" && (
              <div className="at-two">
                <div className="at-form" aria-hidden>
                  <label>Name<span>Sam Lee</span></label>
                  <label>Email<span>sam@example.com</span></label>
                  <label>Reason for the visit<span>Back pain for two weeks</span></label>
                </div>
                <div className="at-sum">
                  <span className="at-k">Confirm</span>
                  <b>{svc.name}</b>
                  <small>{prov.name} · {when}</small>
                  <small>Reminder the day before by email</small>
                  <Coach n={3}>Confirm the booking</Coach>
                  <button type="button" className={`at-btn${pulse(auto === 4)}`} onClick={act(() => setStep("done"), "confirm_appointment")}>Confirm appointment</button>
                </div>
              </div>
            )}

            {placed && (
              <div className="at-done">
                <span className={`at-big ${step}`}>{step === "cancelled" ? "×" : I.check}</span>
                <h4>{step === "cancelled" ? "Appointment cancelled" : step === "moved" ? "Appointment moved" : "Appointment confirmed"}</h4>
                <p>{svc.name} with {prov.name} · {DAYS[day]} Nov, {shown}</p>
                <span className="at-ref">AP 31027</span>
                <small>{step === "cancelled" ? "The slot is free for other clients." : "A confirmation and a reminder go to sam@example.com."}</small>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="at-gap" aria-hidden><span className={`at-gap-i${placed ? " on" : ""}`}>{I.arrow}</span><span>{placed ? "The booking lands in the provider's schedule" : "New bookings reach the front desk here"}</span><i /></div>

      <div className="at-team" role="status" aria-live="polite">
        <span className="at-team-k"><img className="at-face" src={MIA} alt="" width={26} height={26} />Front desk</span>
        <div className="at-sched" aria-hidden>
          <span className="at-sched-p"><img className="at-face" src={prov.img} alt="" width={20} height={20} />{prov.name}</span>
          <div className="at-lane">
            {["09:00", "10:30", "12:00"].map((t, i) => <i key={t} className="bk" style={{ left: `${10 + i * 18}%` }} />)}
            {placed && step !== "cancelled" && <i className="me" style={{ left: step === "moved" ? "82%" : "66%" }}>Sam</i>}
          </div>
        </div>
        {placed && step !== "cancelled" ? (
          <span className="at-team-a">
            <button type="button" className="at-ghost" onClick={act(() => setStep(step === "moved" ? "done" : "moved"), "manage_in_widget", { action: "reschedule" })}>{step === "moved" ? "Move back" : "Reschedule"}</button>
            <button type="button" className="at-ghost" onClick={act(() => setStep("cancelled"), "manage_in_widget", { action: "cancel" })}>Cancel</button>
          </span>
        ) : (
          <span className="at-team-t">{step === "cancelled" ? "Cancelled. Sam was told." : "No new bookings yet"}</span>
        )}
      </div>

      <div className="at-story">
        <span className="at-cast" aria-hidden><img className="at-face" src={SAM} alt="" width={26} height={26} />{storyIx === 3 && <img className="at-face" src={MIA} alt="" width={26} height={26} />}</span>
        <p key={storyIx}>{STORY[storyIx]}</p>
      </div>
    </div>
  );
}

const css = `
  .at{width:100%;max-width:640px;margin-left:auto;text-align:left;font-size:14px;line-height:1.4;color:${INK}}
  .at-win{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 36px 70px -32px rgba(30,45,34,.45),0 0 0 1px rgba(30,45,34,.08)}
  .at-chrome{display:flex;align-items:center;gap:12px;padding:7px 14px;background:#EAEEE7;border-bottom:1px solid ${LINE}}
  .at-dots{display:inline-flex;gap:6px}.at-dots i{width:10px;height:10px;border-radius:50%;background:#C7CFC5}
  .at-url{display:inline-flex;align-items:center;gap:7px;flex:1;max-width:300px;margin-left:8px;height:24px;padding:0 12px;border-radius:12px;background:#fff;font-size:11.5px;color:${MUTED};box-shadow:0 0 0 1px ${LINE};overflow:hidden;white-space:nowrap}
  .at-reset{margin-left:auto;background:none;border:0;font-size:12px;color:${NEUTRAL};cursor:pointer}
  .at-site{padding:12px 16px 16px;display:grid;gap:10px}
  .at-brand{display:flex;align-items:center;gap:9px}
  .at-logo{width:24px;height:24px;border-radius:7px;background:${DEEP};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:700;font-size:13px}
  .at-brand b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}
  .at-who{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:${MUTED}}
  .at-face{border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #fff,0 2px 6px rgba(30,45,34,.22);flex-shrink:0}
  .at-progress{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
  .at-progress li{display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;color:${NEUTRAL};font-family:var(--font-display),system-ui,sans-serif;white-space:nowrap;overflow:hidden}
  .at-progress i{width:18px;height:18px;border-radius:50%;background:${BG};display:grid;place-items:center;font-style:normal;font-size:10px;flex-shrink:0}
  .at-progress i svg{width:11px;height:11px}
  .at-progress li.on{color:${DEEP}}.at-progress li.on i{background:${PRIMARY};color:#fff}.at-progress li.done i{background:${MIST};color:${PRIMARY}}
  .at-body{min-height:228px;display:grid;gap:10px;align-content:start;animation:atIn .3s ease both}
  @keyframes atIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .at-row{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
  .at-body h4{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${DEEP};margin:0}
  .at-svcs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
  .at-svc{display:grid;text-align:left;padding:0;border:0;border-radius:14px;background:#fff;box-shadow:0 0 0 1px ${LINE};overflow:hidden;cursor:pointer;font:inherit;color:inherit}
  .at-svc:hover{box-shadow:0 0 0 2px ${PRIMARY}}
  .at-svc img{width:100%;height:96px;object-fit:cover;display:block}
  .at-svc span{display:grid;gap:2px;padding:9px 11px 11px}.at-svc b{font-size:13.5px;color:${DEEP};font-family:var(--font-display),system-ui,sans-serif}.at-svc small{font-size:11.5px;color:${NEUTRAL};line-height:1.35}
  .at-two{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:12px;align-items:start}
  .at-provs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:10px}
  .at-provs button{display:flex;align-items:center;gap:9px;padding:8px 10px;border:0;border-radius:12px;background:#fff;box-shadow:0 0 0 1px ${LINE};cursor:pointer;font:inherit;color:inherit;text-align:left}
  .at-provs button.on{box-shadow:0 0 0 2px ${PRIMARY};background:${MIST_SOFT}}
  .at-provs span{display:grid}.at-provs b{font-size:13px;color:${DEEP}}.at-provs small{font-size:11px;color:${NEUTRAL}}
  .at-days{display:inline-flex;background:${BG};border-radius:9px;padding:2px;box-shadow:0 0 0 1px ${LINE};margin-bottom:10px}
  .at-days button{border:0;background:none;padding:5px 10px;border-radius:7px;font-size:12px;font-weight:600;color:${MUTED};cursor:pointer;font-family:var(--font-display),system-ui,sans-serif}
  .at-days button.on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(30,45,34,.18)}
  .at-times{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
  .at-times button{padding:7px 0;border:1.5px solid ${LINE};border-radius:9px;background:#fff;font-size:12px;font-weight:600;color:${INK};cursor:pointer;font-family:var(--font-display),system-ui,sans-serif}
  .at-times button.on{background:${PRIMARY};border-color:${PRIMARY};color:#fff}
  .at-times button:disabled{background:repeating-linear-gradient(135deg,#F1F3EF 0 6px,#E8ECE6 6px 12px);color:#A4ADA5;cursor:not-allowed}
  .at-sum{display:grid;gap:4px;padding:12px;border-radius:14px;background:${MIST_SOFT};box-shadow:0 0 0 1px ${LINE};justify-items:start}
  .at-k{font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY};font-family:var(--font-display),system-ui,sans-serif}
  .at-sum b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}.at-sum small{font-size:12px;color:${MUTED}}
  .at-sum .at-coach{margin-top:6px}
  .at-btn{width:100%;margin-top:4px;min-height:38px;border:0;border-radius:8px;background:${PRIMARY};color:#fff;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:13.5px;cursor:pointer}
  .at-btn:hover{background:${PRIMARY_HOVER}}.at-btn:disabled{opacity:.5;cursor:not-allowed}
  .at-form{display:grid;gap:8px}
  .at-form label{display:grid;gap:3px;font-size:11.5px;font-weight:600;color:${NEUTRAL}}
  .at-form span{display:block;padding:9px 11px;border-radius:9px;background:#fff;box-shadow:0 0 0 1.5px ${LINE};font-size:13px;font-weight:500;color:${INK}}
  .at-done{display:grid;justify-items:center;text-align:center;gap:6px;padding:10px 0}
  .at-done h4{font-size:18px}.at-done p{margin:0;font-size:13px;color:${MUTED}}.at-done small{font-size:12px;color:${NEUTRAL}}
  .at-big{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;background:#E3F3E8;color:#116B38;font-size:24px;line-height:1}.at-big svg{width:24px;height:24px}
  .at-big.cancelled{background:#ECEFEA;color:${MUTED}}
  .at-ref{font-family:var(--font-display),system-ui,sans-serif;letter-spacing:.06em;font-weight:600;font-size:12.5px;color:${DEEP};padding:3px 11px;border-radius:999px;background:${BG};box-shadow:0 0 0 1px ${LINE}}
  .at-coach{display:inline-flex;align-items:center;gap:7px;padding:4px 10px 4px 5px;border-radius:999px;background:#F4D9A3;color:#3B2A12;font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;white-space:nowrap;box-shadow:0 8px 18px -8px rgba(59,42,18,.55)}
  .at-coach b{width:18px;height:18px;border-radius:50%;background:#3B2A12;color:#F4D9A3;display:grid;place-items:center;font-size:10.5px}
  .at-coach svg{animation:atNudge 1.4s ease-in-out infinite}
  @keyframes atNudge{0%,100%{translate:0 0}50%{translate:0 3px}}
  .at-gap{display:flex;align-items:center;gap:10px;min-height:34px;padding:0 12px;font-size:12px;font-weight:600;color:${MUTED}}
  .at-gap-i{width:22px;height:22px;border-radius:50%;background:${MIST};color:${PRIMARY};display:grid;place-items:center;transform:rotate(90deg)}
  .at-gap-i svg{width:12px;height:12px}.at-gap-i.on{background:${PRIMARY};color:#fff}
  .at-gap i{flex:1;border-top:1.5px dashed rgba(78,111,88,.35)}
  .at-team{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:14px;background:#fff;box-shadow:0 24px 44px -28px rgba(30,45,34,.45),0 0 0 1px rgba(30,45,34,.08)}
  .at-team-k{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY};white-space:nowrap}
  .at-sched{flex:1;display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:center;min-width:0}
  .at-sched-p{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:${DEEP}}
  .at-lane{position:relative;height:24px;border-radius:6px;background:${BG};box-shadow:0 0 0 1px ${LINE}}
  .at-lane i{position:absolute;top:3px;bottom:3px;width:15%;border-radius:4px}
  .at-lane i.bk{background:repeating-linear-gradient(135deg,#E5EAE3 0 6px,#DCE2DA 6px 12px)}
  .at-lane i.me{background:${PRIMARY};color:#fff;font-style:normal;font-size:10.5px;font-weight:700;line-height:18px;text-align:center;transition:left .5s ease;animation:atIn .35s ease both}
  .at-team-a{display:flex;gap:6px;flex-shrink:0}
  .at-ghost{border:0;border-radius:7px;padding:6px 11px;background:#fff;box-shadow:0 0 0 1px ${LINE};font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:12px;color:${INK};cursor:pointer}
  .at-team-t{font-size:12px;color:${NEUTRAL};white-space:nowrap}
  .at-story{display:flex;align-items:center;gap:12px;margin-top:12px;padding:0 4px}
  .at-cast{display:inline-flex}.at-cast .at-face+.at-face{margin-left:-8px}
  .at-story p{margin:0;font-size:13.5px;color:${INK};animation:atIn .35s ease both}
  .at-pulse{animation:atPulse 1.4s ease-in-out infinite}
  @keyframes atPulse{0%,100%{box-shadow:0 0 0 2px ${PRIMARY},0 0 0 0 rgba(78,111,88,.45)}50%{box-shadow:0 0 0 2px ${PRIMARY},0 0 0 8px rgba(78,111,88,0)}}
  .at button:focus-visible{outline:2px solid ${PRIMARY_HOVER};outline-offset:2px}
  @media (prefers-reduced-motion:reduce){.at-pulse,.at-body,.at-story p,.at-coach svg,.at-lane i.me{animation:none}}
  @media (max-width:980px){.at{margin:0 auto}}
  @media (max-width:640px){
    .at-reset{display:none}.at-url{max-width:none}
    .at-svcs{grid-template-columns:minmax(0,1fr)}.at-svc{grid-template-columns:76px minmax(0,1fr)}.at-svc img{height:100%;min-height:64px}
    .at-two{grid-template-columns:minmax(0,1fr)}
    .at-progress li{font-size:0;gap:0}.at-progress li i{font-size:10px}
    .at-team{flex-wrap:wrap}.at-sched{flex-basis:100%;order:3}
  }
`;
