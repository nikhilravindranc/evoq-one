"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";
import { I } from "../theme";
import { DemoButton } from "./SpaceShell";
import { PLAN_ROOMS, PM_CSS, PlanMap, stateAt, type PlanRoom, type PlanState, type RoomId } from "./PlanMap";
import { SPACE_IMG } from "./ui";
import { BG, DEEP, INK, LINE, MUTED, NEUTRAL, PRIMARY, PRIMARY_HOVER, SAND } from "./palette";

/* The hero tool: the booking page in a browser window, and under it the team's admin window.
   The visitor chooses a location first, then picks a space on that location's floor plan, then books.
   The team is told, approves, and both sides can change the booking. It plays once by itself and hands
   over on the first click. On narrow screens the same page reflows to a phone layout. Sample data. */

type Screen = "loc" | "map" | "sent" | "confirmed" | "cancelled";
type LocId = "hq" | "river" | "train";

const LOCS: { id: LocId; name: string; sub: string; img: string }[] = [
  { id: "hq", name: "Head office", sub: "24 spaces · Level 1 to 3", img: SPACE_IMG.corridor },
  { id: "river", name: "Riverside campus", sub: "38 spaces · 4 buildings", img: SPACE_IMG.lounge },
  { id: "train", name: "Training center", sub: "12 spaces · Ground floor", img: SPACE_IMG.prayer },
];
const SLOTS = [9, 11, 13, 15];
const DAYS = [["Wed", 18], ["Thu", 19], ["Fri", 20]] as const;
const roomById = (id: RoomId) => PLAN_ROOMS.find((r) => r.id === id)!;
const fmt = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;
const Arrow = ({ dir }: { dir: "down" | "left" | "up" }) => (
  <svg className={`st-arr ${dir}`} viewBox="0 0 16 16" width="13" height="13" aria-hidden>
    <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
/* A numbered pointer that says what to do next. */
const Coach = ({ n, dir, children }: { n: number; dir: "down" | "left" | "up"; children: string }) => (
  <span className={`st-coach ${dir}`}><b>{n}</b>{children}<Arrow dir={dir} /></span>
);
const STEPS = ["Find", "Book", "Approve", "Manage"];
const STORY = [
  "Sam from People needs a room for an onboarding session.",
  "Sam picks Training Room 2 on the plan and asks to book it.",
  "Mia from Operations sees the request and decides.",
  "Mia approved it. Sam can still reschedule or cancel.",
];
/* The cast from the EVOQ home page: Sam from People books, Mia from Operations decides. */
const SAM = "/characters/sam.webp";
const MIA = "/characters/mia.webp";
const Face = ({ src, size = 28 }: { src: string; size?: number }) => (
  <img className="st-face" src={src} alt="" width={size} height={size} style={{ width: size, height: size }} />
);

export function SpaceTryIt() {
  const [loc, setLoc] = useState<LocId | null>(null);
  const [screen, setScreen] = useState<Screen>("loc");
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState(13);
  const [pick, setPick] = useState<RoomId | null>(null);
  const [moved, setMoved] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [auto, setAuto] = useState(0);
  const touched = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const room: PlanRoom | null = pick ? roomById(pick) : null;
  const start = moved ? slot + 2 : slot;
  const when = `${DAYS[day][0]} ${DAYS[day][1]} Nov`;
  const range = `${fmt(start)} to ${fmt(start + 2)}`;
  const placed = screen === "sent" || screen === "confirmed" || screen === "cancelled";
  const confirmed = screen === "confirmed";
  const step = screen === "loc" ? 0 : screen === "map" ? (pick ? 1 : 0) : screen === "sent" ? 2 : 3;
  const locName = LOCS.find((l) => l.id === loc)?.name ?? "Head office";

  const plan: Partial<Record<RoomId, PlanState>> = {};
  PLAN_ROOMS.forEach((r) => { plan[r.id] = stateAt(r, slot); });
  if (room && placed) plan[room.id] = screen === "sent" ? "pending" : confirmed ? "mine" : stateAt(room, slot);

  const say = (m: string) => setLog((l) => [...l.slice(-1), m]);
  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setAuto(-1);
  }, []);
  const mark = useCallback((event: string, props: Record<string, string | number> = {}) => {
    if (!touched.current) { touched.current = true; track("start_space_widget", { page: "space_and_room" }); }
    track(event, { page: "space_and_room", ...props });
  }, []);
  const act = useCallback((fn: () => void, event: string, props?: Record<string, string | number>) => () => {
    stop();
    mark(event, props);
    fn();
  }, [stop, mark]);

  const chooseLoc = (id: LocId) => { setLoc(id); setPick(null); setScreen("map"); };
  const chooseRoom = (id: RoomId) => { setPick(id); setScreen("map"); setMoved(false); };
  const request = () => {
    if (!room) return;
    setMoved(false);
    if (room.approval) { setScreen("sent"); setLog(["Request sent to your team."]); }
    else { setScreen("confirmed"); setLog(["Booked. Your team sees it on the calendar."]); }
  };
  const approve = () => { setScreen("confirmed"); say("Mia approved it. Sam was notified."); };
  const decline = () => { setScreen("cancelled"); say("Mia declined it. Sam was notified."); };
  const reschedule = (by: string) => { setMoved((m) => !m); say(by === "team" ? "Mia moved it. Sam was notified." : "Sam moved it. Mia was notified."); };
  const cancel = (by: string) => { setScreen("cancelled"); say(by === "team" ? "Mia cancelled it. Sam was notified." : "Sam cancelled it. The space is free again."); };
  const reset = () => { stop(); setLoc(null); setScreen("loc"); setPick(null); setMoved(false); setLog([]); setSlot(13); setDay(1); };

  useEffect(() => {
    Object.values(SPACE_IMG).forEach((src) => { const i = new Image(); i.src = src; });
  }, []);

  // plays once, unless people prefer less motion
  useEffect(() => {
    if (auto === -1) return;
    const next: Record<number, () => void> = {
      0: () => setAuto(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? -1 : 1),
      1: () => { chooseLoc("hq"); setAuto(2); },
      2: () => { chooseRoom("train"); setAuto(3); },
      3: () => { request(); setAuto(4); },
      4: () => { approve(); setAuto(5); },
      5: () => setAuto(-1),
    };
    const wait = [1500, 1800, 2000, 2000, 2600, 1800][auto] ?? 1500;
    timer.current = setTimeout(() => next[auto]?.(), wait);
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  const pulse = (on: boolean) => (on ? " st-pulse" : "");
  const busy = !!room && stateAt(room, slot) === "busy";

  return (
    <div className="st-scene" onPointerDown={() => { if (auto > 0) stop(); }} onKeyDown={() => { if (auto > 0) stop(); }}>
      <style>{PM_CSS}{css}</style>

      {/* the visitor: the booking page in a browser */}
      <div className="st-win">
        <div className="st-chrome">
          <span className="st-dots" aria-hidden><i /><i /><i /></span>
          <span className="st-url"><svg viewBox="0 0 16 16" width="11" height="11" aria-hidden><path d="M5 7V5a3 3 0 0 1 6 0v2M4 7h8v6H4z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>book.northwind.example</span>
          <button type="button" className="st-reset" onClick={reset}>Start over</button>
        </div>

        <div className="st-site">
          <div className="st-brand"><span className="st-logo" aria-hidden>N</span><b>Northwind House</b><span className="st-who"><Face src={SAM} size={22} />Hi, Sam</span></div>

          {screen === "loc" && (
            <div className="st-locwrap">
              <div className="st-lochead"><h4>Where do you want to book?</h4><Coach n={1} dir="down">Choose a location</Coach></div>
              <ul className="st-locs">
                {LOCS.map((l, i) => (
                  <li key={l.id}>
                    <button type="button" className={pulse(auto === 1 && i === 0).trim()} onClick={act(() => chooseLoc(l.id), "pick_location", { location: l.name })}>
                      <img src={l.img} alt="" />
                      <span><b>{l.name}</b><small>{l.sub}</small></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {screen !== "loc" && (
            <>
              <div className="st-tools">
                <button type="button" className="st-back" onClick={act(() => { setScreen("loc"); setPick(null); }, "back_to_locations")}>‹ {locName}</button>
                <span className="st-lvl">Level 1</span>
                <div className="st-seg" role="group" aria-label="Day">
                  {DAYS.map(([d, n], i) => <button key={d} type="button" className={i === day ? "on" : ""} aria-pressed={i === day} onClick={act(() => setDay(i), "pick_day")}>{d} {n}</button>)}
                </div>
                <div className="st-seg" role="group" aria-label="Start time">
                  {SLOTS.map((h) => <button key={h} type="button" className={h === slot ? "on" : ""} aria-pressed={h === slot} onClick={act(() => { setSlot(h); setMoved(false); }, "pick_time")}>{fmt(h)}</button>)}
                </div>
              </div>

              <div className="st-split">
                <div className="st-plan">
                  <PlanMap status={plan} selected={pick} onSelect={(id) => { stop(); mark("pick_space", { space: roomById(id).name }); chooseRoom(id); }} />
                  <div className="st-legend" aria-hidden>
                    <span><i className="f" />Free</span><span><i className="b" />Booked</span><span><i className="a" />Needs approval</span><span><i className="m" />Yours</span>
                  </div>
                </div>

                <div className="st-side" key={`${screen}-${pick ?? "none"}`}>
                  {!placed && !room && (
                    <div className="st-ask">
                      <h4>Choose a space</h4>
                      <p>Select a room on the plan. The colors show what is free at {fmt(slot)} on {when}.</p>
                      <Coach n={2} dir="left">Pick a room on the plan</Coach>
                    </div>
                  )}

                  {!placed && room && (
                    <div className="st-room">
                      <img className="st-hero" src={room.img} alt="" />
                      <h4>{room.name}</h4>
                      <p className="st-meta">{room.meta}</p>
                      <div className="st-sum"><span>{I.clock}{when} · {range}</span></div>
                      <em className={`sr-badge ${busy ? "off" : room.approval ? "warn" : "ok"}`}>{busy ? "Booked at this time" : room.approval ? "Needs approval" : "Free"}</em>
                      {!busy && <div className="st-coachrow"><Coach n={3} dir="down">{room.approval ? "Send the request" : "Book it"}</Coach></div>}
                      <button type="button" disabled={busy} className={`sr-btn primary st-wide${pulse(auto === 3)}`} onClick={act(request, "request_space_booking", { space: room.name })}>{busy ? "Choose another time" : room.approval ? "Request booking" : "Book now"}</button>
                    </div>
                  )}

                  {placed && room && (
                    <div className="st-room st-done">
                      <span className={`st-big ${screen}`}>{screen === "cancelled" ? "×" : I.check}</span>
                      <h4>{screen === "sent" ? "Request sent" : confirmed ? "Booking confirmed" : "Booking cancelled"}</h4>
                      <p className="st-meta">{room.name} · {when}, {range}</p>
                      <span className="st-ref">BK 20418</span>
                      <p className="st-note">{screen === "sent" ? "Your team will decide soon. We will tell you here and by email." : confirmed ? "A confirmation was sent to sam@northwind.example." : "Nothing is held for you. Book again any time."}</p>
                      {confirmed && (
                        <div className="st-pa">
                          <button type="button" className="sr-btn ghost sm" onClick={act(() => reschedule("visitor"), "manage_in_widget", { action: "reschedule", by: "visitor" })}>{moved ? "Move back" : "Reschedule"}</button>
                          <button type="button" className="sr-btn ghost sm" onClick={act(() => cancel("visitor"), "manage_in_widget", { action: "cancel", by: "visitor" })}>Cancel</button>
                        </div>
                      )}
                      {screen === "cancelled" && <button type="button" className="sr-btn ghost sm" onClick={reset}>Start over</button>}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={`st-gap${screen === "sent" ? " down" : confirmed ? " up" : ""}`} aria-hidden>
        <span className="st-gap-i"><Arrow dir={confirmed ? "up" : "down"} /></span>
        <span className="st-gap-t">{screen === "sent" ? "The request goes to Mia" : confirmed ? "Sam is told, and either of them can still change it" : screen === "cancelled" ? "Both are told" : "Requests from visitors reach the team here"}</span>
        <span className="st-gap-l" />
        {screen === "sent" && <Coach n={4} dir="down">Mia decides</Coach>}
      </div>

      {/* the team: a slim strip under the window */}
      <div className={`st-team${screen === "sent" ? " ask" : ""}`} role="status" aria-live="polite">
        <span className="st-team-k"><Face src={MIA} size={26} />Team view</span>
        {screen === "sent" && room ? (
          <>
            <Face src={SAM} size={28} />
            <span className="st-team-t"><b>Sam requested {room.name}</b><small>{when}, {range} · for the onboarding session</small></span>
            <span className="st-team-a">
              <button type="button" className="sr-btn ghost sm" onClick={act(decline, "decline_in_widget")}>Decline</button>
              <button type="button" className={`sr-btn primary sm${pulse(auto === 4)}`} onClick={act(approve, "approve_in_widget")}>Approve</button>
            </span>
          </>
        ) : placed && room ? (
          <>
            <span className={`st-dot ${screen}`} aria-hidden />
            <span className="st-team-t"><b>{log[log.length - 1]}</b><small>{room.name} · BK 20418 · {confirmed ? "Confirmed" : "Cancelled"}</small></span>
            {confirmed && (
              <span className="st-team-a">
                <button type="button" className="sr-btn ghost sm" onClick={act(() => reschedule("team"), "manage_in_widget", { action: "reschedule", by: "team" })}>{moved ? "Move back" : "Move"}</button>
                <button type="button" className="sr-btn ghost sm" onClick={act(() => cancel("team"), "manage_in_widget", { action: "cancel", by: "team" })}>Cancel</button>
              </span>
            )}
          </>
        ) : (
          <span className="st-team-t"><b>Mia, Operations</b><small>No requests waiting. New requests appear here.</small></span>
        )}
      </div>

      <div className="st-story">
        <span className="st-cast" aria-hidden>
          <Face src={SAM} size={26} />{step >= 2 && <Face src={MIA} size={26} />}
        </span>
        <p key={step}>{STORY[step]}</p>
        {confirmed ? (
          <DemoButton location="space_home_widget" className="sr-btn light sm">Want this? Request a demo</DemoButton>
        ) : (
          <ol className="st-steps" aria-label="Steps">
            {STEPS.map((s, i) => <li key={s} className={i === step ? "on" : i < step ? "done" : ""} title={s}><i>{i < step ? I.check : i + 1}</i></li>)}
          </ol>
        )}
      </div>
    </div>
  );
}

const css = `
  .st-scene{position:relative;width:100%;max-width:700px;margin-left:auto;text-align:left;font-size:14px;line-height:1.4}
  .st-win{position:relative;z-index:2;background:#FBFAF6;color:${INK};border-radius:16px;overflow:hidden;box-shadow:0 40px 70px -30px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.14)}
  .st-chrome{display:flex;align-items:center;gap:12px;padding:7px 14px;background:#E9ECE6;border-bottom:1px solid ${LINE}}
  .st-dots{display:inline-flex;gap:6px}.st-dots i{width:10px;height:10px;border-radius:50%;background:#C9CFC7}
  .st-url{display:inline-flex;align-items:center;gap:7px;flex:1;max-width:300px;margin:0 auto 0 8px;height:24px;padding:0 12px;border-radius:12px;background:#fff;font-size:11.5px;color:${MUTED};box-shadow:0 0 0 1px ${LINE}}
  .st-reset{margin-left:auto;background:none;border:0;font-size:12px;color:${NEUTRAL};cursor:pointer;padding:4px 2px}
  .st-reset:hover{color:${DEEP}}
  .st-site{padding:10px 14px 12px;display:grid;gap:8px}
  .st-brand{display:flex;align-items:center;gap:9px}
  .st-logo{width:24px;height:24px;border-radius:7px;background:${DEEP};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:700;font-size:13px}
  .st-brand b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}
  .st-who{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:${MUTED}}
  .st-locwrap{display:grid;gap:12px;padding:6px 0 4px}
  .st-locwrap h4,.st-ask h4,.st-room h4{font-family:var(--font-display),system-ui,sans-serif;font-size:19px;line-height:1.2;color:${DEEP};margin:0}
  .st-locs{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
  .st-locs button{width:100%;text-align:left;padding:0;border:0;border-radius:14px;background:#fff;box-shadow:0 0 0 1px ${LINE};cursor:pointer;font:inherit;color:inherit;overflow:hidden;display:grid}
  .st-locs button:hover{box-shadow:0 0 0 2px ${PRIMARY}}
  .st-locs img{width:100%;height:104px;object-fit:cover;display:block}
  .st-locs span{display:grid;padding:10px 12px 12px}.st-locs b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}.st-locs small{font-size:12px;color:${NEUTRAL}}
  .st-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .st-back{background:none;border:0;padding:4px 2px;font-size:13px;font-weight:600;color:${PRIMARY_HOVER};cursor:pointer;font-family:var(--font-display),system-ui,sans-serif;white-space:nowrap}
  .st-lvl{display:inline-flex;align-items:center;height:28px;padding:0 10px;border:1px solid ${LINE};border-radius:8px;background:#fff;font-size:12px;font-weight:600;color:${DEEP};font-family:var(--font-display),system-ui,sans-serif}
  .st-seg{display:inline-flex;background:${BG};border-radius:9px;padding:2px;box-shadow:0 0 0 1px ${LINE}}
  .st-seg button{border:0;background:none;padding:5px 9px;border-radius:7px;font-size:12px;font-weight:600;color:${MUTED};cursor:pointer;font-family:var(--font-display),system-ui,sans-serif;white-space:nowrap}
  .st-seg button.on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(22,36,28,.18)}
  .st-split{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:12px;align-items:start}
  .st-plan{min-width:0}
  .st-plan .pm{--pm-ls:1.3;border-radius:8px;box-shadow:0 0 0 1px ${LINE}}
  .st-legend{display:flex;flex-wrap:wrap;gap:10px;padding:7px 2px 0;font-size:11px;color:${MUTED}}
  .st-legend span{display:inline-flex;align-items:center;gap:5px}
  .st-legend i{width:13px;height:9px;border-radius:3px;display:inline-block;border:1px solid rgba(47,74,56,.35)}
  .st-legend .f{background:rgba(120,190,150,.3)}.st-legend .b{background:rgba(217,185,140,.7)}
  .st-legend .a{background:repeating-linear-gradient(45deg,rgba(120,190,150,.3) 0 3px,rgba(78,111,88,.55) 3px 4px)}.st-legend .m{background:rgba(78,111,88,.55)}
  .st-side{min-width:0;background:#fff;border-radius:14px;box-shadow:0 0 0 1px ${LINE};padding:12px;animation:stIn .3s ease both;min-height:0;display:grid;align-content:start}
  .st-ask{display:grid;gap:8px}
  .st-ask p{margin:0;font-size:12.5px;color:${MUTED}}
  .st-hint{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;color:${DEEP}}
  .st-hint i{width:9px;height:9px;border-radius:50%;background:${PRIMARY};animation:stDot 1.4s ease-in-out infinite}
  @keyframes stDot{0%,100%{box-shadow:0 0 0 0 rgba(78,111,88,.5)}50%{box-shadow:0 0 0 7px rgba(78,111,88,0)}}
  .st-room{display:grid;gap:8px;align-content:start}
  .st-hero{width:100%;height:78px;object-fit:cover;border-radius:10px;display:block}
  .st-room h4{font-size:16px}
  .st-meta{margin:0;font-size:12px;color:${NEUTRAL}}
  .st-sum{display:flex;align-items:center;gap:8px;font-size:12px;color:${MUTED}}.st-sum span{display:inline-flex;align-items:center;gap:6px}.st-sum svg{width:13px;height:13px}
  .st-room .sr-badge{justify-self:start}
  .st-wide{width:100%}
  .st-done{justify-items:center;text-align:center;gap:6px}
  .st-big{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;font-size:26px;line-height:1;background:rgba(232,170,80,.22);color:#92400E}
  .st-big.confirmed{background:#E3F3E8;color:#116B38}.st-big.cancelled{background:#ECEFEB;color:${MUTED}}.st-big svg{width:24px;height:24px}
  .st-ref{font-family:var(--font-display),system-ui,sans-serif;letter-spacing:.06em;font-weight:600;font-size:12.5px;color:${DEEP};padding:3px 11px;border-radius:999px;background:${BG};box-shadow:0 0 0 1px ${LINE}}
  .st-note{margin:0;font-size:11.5px;color:${MUTED}}
  .st-pa{display:flex;gap:8px;margin-top:2px}

  .st-lochead{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .st-coachrow{display:flex;justify-content:flex-end}
  .st-coach{display:inline-flex;align-items:center;gap:7px;padding:4px 10px 4px 5px;border-radius:999px;background:#F4D9A3;color:#3B2A12;font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;white-space:nowrap;box-shadow:0 8px 18px -8px rgba(59,42,18,.55)}
  .st-coach b{width:18px;height:18px;border-radius:50%;background:#3B2A12;color:#F4D9A3;display:grid;place-items:center;font-size:10.5px}
  .st-arr{flex-shrink:0}.st-arr.left{transform:rotate(90deg)}.st-arr.up{transform:rotate(180deg)}
  .st-coach.down .st-arr{animation:stNudgeY 1.4s ease-in-out infinite}
  .st-coach.left .st-arr{animation:stNudgeX 1.4s ease-in-out infinite}
  @keyframes stNudgeY{0%,100%{translate:0 0}50%{translate:0 3px}}
  @keyframes stNudgeX{0%,100%{translate:0 0}50%{translate:-3px 0}}
  .st-gap{display:flex;align-items:center;gap:10px;min-height:34px;padding:0 14px;color:rgba(255,255,255,.82);font-size:12px}
  .st-gap-i{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.16);display:grid;place-items:center;flex-shrink:0}
  .st-gap.down .st-gap-i{background:#F4D9A3;color:#3B2A12}.st-gap.up .st-gap-i{background:#8FD0A4;color:#0F2A19}
  .st-gap-t{font-weight:600;white-space:nowrap}
  .st-gap-l{flex:1;min-width:16px;border-top:1.5px dashed rgba(255,255,255,.3)}
  .st-team{position:relative;z-index:1;display:flex;align-items:center;gap:10px;margin:0;padding:10px 14px;background:#fff;color:${INK};border-radius:14px;box-shadow:0 24px 44px -26px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.12);min-height:62px;animation:stIn .3s ease both}
  .st-face{border-radius:50%;object-fit:cover;display:block;flex-shrink:0;box-shadow:0 0 0 2px #fff,0 2px 6px rgba(22,36,28,.25)}
  .st-team-k{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY};white-space:nowrap}
  .st-team-t{display:grid;min-width:0;flex:1}.st-team-t b{font-size:13px;color:${DEEP}}.st-team-t small{font-size:11.5px;color:${NEUTRAL};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .st-team-a{display:flex;gap:8px;flex-shrink:0}
  .st-av{width:28px;height:28px;border-radius:50%;background:${SAND};color:${DEEP};display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-size:10.5px;font-weight:700;flex-shrink:0}
  .st-dot{width:9px;height:9px;border-radius:50%;background:${PRIMARY};flex-shrink:0}.st-dot.cancelled{background:#B7BDB8}

  .st-story{display:flex;align-items:center;gap:12px;margin-top:14px;padding:0 4px}
  .st-cast{display:inline-flex}.st-cast .st-face+.st-face{margin-left:-8px}.st-cast .st-face{box-shadow:0 0 0 2px #1B2D22}
  .st-story p{margin:0;flex:1;font-size:13.5px;line-height:1.35;color:rgba(255,255,255,.92);animation:stIn .35s ease both}
  .st-steps{list-style:none;margin:0;padding:0;display:flex;gap:6px;flex-shrink:0}
  .st-steps li{display:flex}
  .st-steps i{width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,.16);color:rgba(255,255,255,.8);display:grid;place-items:center;font-style:normal;font-size:10.5px;font-weight:700;font-family:var(--font-display),system-ui,sans-serif}
  .st-steps i svg{width:11px;height:11px}
  .st-steps li.on i{background:#fff;color:${DEEP}}.st-steps li.done i{background:rgba(255,255,255,.34);color:#fff}

  .st-pulse{animation:stPulse 1.4s ease-in-out infinite}
  @keyframes stPulse{0%,100%{box-shadow:0 0 0 0 rgba(143,208,164,.7)}50%{box-shadow:0 0 0 7px rgba(143,208,164,0)}}
  .st-locs button.st-pulse{animation:stPulseR 1.4s ease-in-out infinite}
  @keyframes stPulseR{0%,100%{box-shadow:0 0 0 2px ${PRIMARY},0 0 0 0 rgba(78,111,88,.45)}50%{box-shadow:0 0 0 2px ${PRIMARY},0 0 0 8px rgba(78,111,88,0)}}
  @keyframes stIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .st-scene button:focus-visible{outline:2px solid ${PRIMARY_HOVER};outline-offset:2px}
  .st-scene button:disabled{opacity:.55;cursor:not-allowed}
  @media (prefers-reduced-motion:reduce){.st-coach .st-arr{animation:none}.st-pulse,.st-side,.st-toast,.st-hint i,.st-locs button.st-pulse{animation:none}.st-me{transition:none}}
  @media (max-width:980px){.st-scene{margin:0 auto}}
  @media (max-width:700px){
    .st-url{max-width:none}.st-reset{display:none}
    .st-locs{grid-template-columns:minmax(0,1fr)}
    .st-locs button{grid-template-columns:76px minmax(0,1fr);align-items:center}.st-locs img{height:64px}.st-locs span{padding:8px 10px}
    .st-split{grid-template-columns:minmax(0,1fr)}
    .st-plan .pm{--pm-ls:1.55;--pm-seats:none}
    .st-side{min-height:0}
    .st-team{margin:0;flex-wrap:wrap}.st-team-a{width:100%;justify-content:flex-end}
    .st-gap-t{white-space:normal;line-height:1.25}.st-gap-l{display:none}.st-gap{flex-wrap:wrap;padding:6px 6px}
    .st-story{flex-wrap:wrap}.st-story p{flex-basis:100%;order:3}.st-story>.sr-btn,.st-steps{order:4}
  }
`;
