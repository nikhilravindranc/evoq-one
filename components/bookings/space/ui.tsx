/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { I, U } from "../theme";

/* Coded product screens for the Space & Room Reservations microsite. They show the capabilities
   listed in the microsite plan; replace them with approved app screenshots when those exist.
   Names, rooms and times are sample data. */

export const SPACE_IMG = {
  board: U("1431540015161-0bf868a2d407", 900),
  corridor: U("1497366754035-f200968a6e72", 900),
  glass: U("1698653223247-09aaf01166fc", 900),
  prayer: U("1792060052578-9dbe661cadbd", 900),
  training: U("1573164574572-cb89e39749b4", 900),
};

export function Window({ title, right, children, className = "" }: { title: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`sr-win ${className}`}>
      <div className="sr-win-bar">
        <span className="sr-win-dots" aria-hidden><i /><i /><i /></span>
        <b>{title}</b>
        {right && <span className="sr-win-right">{right}</span>}
      </div>
      <div className="sr-win-body">{children}</div>
    </div>
  );
}

/* ---------- calendar: resource timeline for a day ---------- */
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
type Block = { s: number; e: number; t: string; k: "ok" | "warn" | "off" };
const ROWS: { name: string; meta: string; blocks: Block[] }[] = [
  { name: "Board Room", meta: "12 seats · Level 3", blocks: [{ s: 9, e: 10.5, t: "Leadership sync", k: "ok" }, { s: 13, e: 14, t: "Client review", k: "warn" }] },
  { name: "Training Room 2", meta: "24 seats · Level 1", blocks: [{ s: 8.5, e: 12, t: "Onboarding", k: "ok" }, { s: 14, e: 16.5, t: "Workshop", k: "ok" }] },
  { name: "Hall A", meta: "120 seats · Ground floor", blocks: [{ s: 10, e: 11, t: "Maintenance", k: "off" }, { s: 15, e: 17.5, t: "Town hall", k: "warn" }] },
  { name: "Focus Room 4", meta: "4 seats · Level 2", blocks: [{ s: 11, e: 12, t: "Interview", k: "ok" }] },
  { name: "Projector kit", meta: "Equipment", blocks: [{ s: 13, e: 14, t: "Client review", k: "warn" }] },
];
const pct = (h: number) => `${((h - 8) / 10) * 100}%`;

export function CalendarUI({ compact = false }: { compact?: boolean }) {
  return (
    <Window title="Calendar" className={compact ? "compact" : ""} right={<span className="sr-seg"><em className="on">Day</em><em>Week</em><em>Month</em><em>List</em></span>}>
      <div className="sr-cal-top">
        <b>Thursday, 19 November</b>
        <span className="sr-chip">{I.pin}Head office</span>
        {!compact && <span className="sr-chip">All spaces</span>}
      </div>
      <div className="sr-cal">
        <div className="sr-cal-head">
          <span />
          <div className="sr-cal-hours">{HOURS.map((h) => <i key={h}>{h}:00</i>)}</div>
        </div>
        {ROWS.slice(0, compact ? 4 : 5).map((r) => (
          <div key={r.name} className="sr-cal-row">
            <span className="sr-cal-name"><b>{r.name}</b><small>{r.meta}</small></span>
            <div className="sr-cal-lane">
              {r.blocks.map((b) => (
                <span key={b.t + b.s} className={`sr-blk ${b.k}`} style={{ left: pct(b.s), width: `calc(${pct(b.e)} - ${pct(b.s)})` }}>{b.t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="sr-legend"><span><i className="ok" />Confirmed</span><span><i className="warn" />Pending approval</span><span><i className="off" />Blocked</span></div>
    </Window>
  );
}

/* ---------- space catalogue ---------- */
const SPACES = [
  { img: SPACE_IMG.board, name: "Board Room", meta: "12 seats · Level 3", tags: ["Display", "Video call kit"], st: ["ok", "Available"] },
  { img: SPACE_IMG.glass, name: "Focus Room 4", meta: "4 seats · Level 2", tags: ["Whiteboard"], st: ["ok", "Available"] },
  { img: SPACE_IMG.training, name: "Training Room 2", meta: "24 seats · Level 1", tags: ["Projector", "Classroom layout"], st: ["warn", "Needs approval"] },
  { img: SPACE_IMG.prayer, name: "Prayer Room", meta: "20 people · Level 2", tags: ["Quiet space"], st: ["ok", "Available"] },
] as const;

export function CatalogueUI({ count = 4 }: { count?: number }) {
  return (
    <Window title="Spaces" right={<span className="sr-chip">{I.search}Search spaces</span>}>
      <div className="sr-cat">
        {SPACES.slice(0, count).map((s) => (
          <div key={s.name} className="sr-cat-card">
            <img src={s.img} alt="" loading="lazy" />
            <div className="sr-cat-txt">
              <b>{s.name}</b>
              <small>{s.meta}</small>
              <span className="sr-tags">{s.tags.map((t) => <em key={t}>{t}</em>)}</span>
            </div>
            <span className={`sr-badge ${s.st[0]}`}>{s.st[1]}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}

/* ---------- public booking page ---------- */
export function BookingFlowUI() {
  return (
    <Window title="Northwind House · Book a space" className="sr-public">
      <div className="sr-pub-space">
        <img src={SPACE_IMG.training} alt="" loading="lazy" />
        <div><b>Training Room 2</b><small>24 seats · Level 1 · Classroom layout</small></div>
      </div>
      <div className="sr-pub-label">Choose a time</div>
      <div className="sr-days">{[["Mon", "16"], ["Tue", "17"], ["Wed", "18"], ["Thu", "19"], ["Fri", "20"]].map(([d, n], i) => <span key={d} className={i === 3 ? "on" : ""}><small>{d}</small><b>{n}</b></span>)}</div>
      <div className="sr-slots">{[["09:00", ""], ["10:00", "taken"], ["11:00", ""], ["13:00", "on"], ["14:00", ""], ["15:00", "taken"]].map(([t, k]) => <span key={t} className={k}>{t}</span>)}</div>
      <div className="sr-pub-opts">
        <span><small>Duration</small><b>2 hours</b></span>
        <span><small>Equipment</small><b>Projector</b></span>
      </div>
      <div className="sr-pub-foot">
        <span className="sr-badge warn">Needs approval</span>
        <span className="sr-btn primary sm">Request booking</span>
      </div>
    </Window>
  );
}

/* ---------- reservation detail with approval ---------- */
export function ReservationUI({ state = "pending" }: { state?: "pending" | "approved" }) {
  return (
    <Window title="Reservation BK 20418" right={<span className={`sr-badge ${state === "approved" ? "ok" : "warn"}`}>{state === "approved" ? "Confirmed" : "Pending approval"}</span>}>
      <dl className="sr-dl">
        <div><dt>Space</dt><dd>Training Room 2 · Level 1</dd></div>
        <div><dt>When</dt><dd>Thu 19 Nov · 13:00 to 15:00</dd></div>
        <div><dt>Setup and cleanup</dt><dd>15 minutes before and after</dd></div>
        <div><dt>Organizer</dt><dd>Priya Nair · People team</dd></div>
        <div><dt>Attendees</dt><dd>18 of 24 seats</dd></div>
        <div><dt>Equipment</dt><dd>Projector kit</dd></div>
      </dl>
      {state === "pending" ? (
        <div className="sr-actions"><span className="sr-btn ghost sm">Reschedule</span><span className="sr-btn ghost sm">Reject</span><span className="sr-btn primary sm">Approve</span></div>
      ) : (
        <div className="sr-hist"><span>{I.check}Approved by Daniel K. · 10:42</span><span>{I.message}Confirmation sent to organizer</span></div>
      )}
    </Window>
  );
}

/* ---------- operations dashboard ---------- */
export function DashboardUI() {
  return (
    <Window title="Today" right={<span className="sr-chip">{I.pin}Head office</span>}>
      <div className="sr-kpis">
        {[["Reservations", "18"], ["Pending approval", "3"], ["Checked in", "9"], ["Spaces in use", "6 of 14"]].map(([k, v]) => (
          <span key={k}><small>{k}</small><b>{v}</b></span>
        ))}
      </div>
      <div className="sr-pub-label">Waiting for approval</div>
      {[["Town hall", "Hall A · 15:00", "Facilities"], ["Client review", "Board Room · 13:00", "Sales"], ["Vendor workshop", "Training Room 2 · Fri", "External"]].map(([a, b, c]) => (
        <div key={a} className="sr-row"><span className="sr-ico">{I.space}</span><span className="sr-txt"><b>{a}</b><small>{b}</small></span><em className="sr-tag">{c}</em></div>
      ))}
    </Window>
  );
}

/* ---------- check in ---------- */
export function CheckInUI() {
  return (
    <Window title="Check in">
      <div className="sr-qr">
        <svg viewBox="0 0 21 21" aria-hidden>{QR.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)}</svg>
        <div><b>BK 20418</b><small>Training Room 2 · 13:00</small><span className="sr-badge ok">{I.check}Checked in at 12:56</span></div>
      </div>
      <p className="sr-note">Unclaimed bookings are released after the grace period you set.</p>
    </Window>
  );
}
// a fixed, decorative QR style pattern (not a scannable code)
const QR: [number, number][] = (() => {
  const out: [number, number][] = [];
  const finder = (ox: number, oy: number) => { for (let x = 0; x < 7; x++) for (let y = 0; y < 7; y++) if (x === 0 || y === 0 || x === 6 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5)) out.push([ox + x, oy + y]); };
  finder(0, 0); finder(14, 0); finder(0, 14);
  let seed = 7;
  for (let x = 0; x < 21; x++) for (let y = 0; y < 21; y++) {
    const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    seed = (seed * 9301 + 49297) % 233280;
    if (!inFinder && seed / 233280 > 0.55) out.push([x, y]);
  }
  return out;
})();

/* ---------- reports ---------- */
export function ReportsUI() {
  const bars = [52, 64, 71, 58, 80, 44, 30];
  return (
    <Window title="Utilization" right={<span className="sr-chip">Last 30 days</span>}>
      <div className="sr-bars" aria-hidden>{bars.map((h, i) => <span key={i}><i style={{ height: `${h}%` }} /><small>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</small></span>)}</div>
      <div className="sr-row"><span className="sr-txt"><b>Busiest space</b><small>Board Room · 81% of bookable hours</small></span></div>
      <div className="sr-row"><span className="sr-txt"><b>Least used</b><small>Hall A · 22% of bookable hours</small></span><em className="sr-tag">Export CSV</em></div>
    </Window>
  );
}

/* ---------- a small settings panel used by feature groups ---------- */
export function SettingsUI({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <Window title={title}>
      <div className="sr-set">
        {rows.map(([k, v]) => (
          <div key={k}><span>{k}</span><b>{v}</b></div>
        ))}
      </div>
    </Window>
  );
}
