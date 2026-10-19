"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ProductBadge } from "@/components/shared/ProductBadge";

/* Industry dashboards for the home Solutions section. Each one is drawn at a
   fixed 680 x 468 canvas and scaled to the frame, so it stays proportional
   from desktop down to phones. All names and figures are sample data. */
const W = 680;
const H = 468;

const INK = "#1F2430";
const MUTE = "#6B7280";
const LINE = "#ECEEF2";

type Tone = "ok" | "warn" | "info" | "muted" | "solid";
function Pill({ tone, children, c }: { tone: Tone; children: ReactNode; c: string }) {
  const t: Record<Tone, CSSProperties> = {
    ok: { background: "#E7F7EE", color: "#15803D" },
    warn: { background: "#FEF3C7", color: "#B45309" },
    info: { background: "color-mix(in srgb, " + c + " 12%, #fff)", color: c },
    muted: { background: "#F1F2F5", color: MUTE },
    solid: { background: c, color: "#fff" },
  };
  return <span className="sd-pill" style={t[tone]}>{children}</span>;
}
function Av({ name, c }: { name: string; c: string }) {
  const ini = name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  return <span className="sd-av" style={{ background: "color-mix(in srgb, " + c + " 16%, #fff)", color: c }}>{ini}</span>;
}
function Card({ title, right, children, style }: { title: string; right?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="sd-card" style={style}>
      <div className="sd-card-h"><b>{title}</b>{right}</div>
      {children}
    </div>
  );
}
function Stat({ n, l, c, icon }: { n: string; l: string; c: string; icon: string }) {
  return (
    <div className="sd-stat">
      <span className="sd-stat-ic" style={{ background: "color-mix(in srgb, " + c + " 12%, #fff)" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d={icon} /></svg>
      </span>
      <div><b>{n}</b><span>{l}</span></div>
    </div>
  );
}
const IC = {
  cal: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
  check: "M5 12.5l4.5 4.5L19 7",
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  play: "M9 7l8 5-8 5z",
  box: "M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8",
  alert: "M12 4l9 16H3zM12 10v4M12 17v.5",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  bed: "M3 18V8M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6",
  gauge: "M4 16a8 8 0 1 1 16 0M12 16l4-5",
  grid: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
};

function Shell({ c, brand, children }: { c: string; brand: string; children: ReactNode }) {
  return (
    <div className="sd-shell">
      <aside className="sd-side">
        <span className="sd-logo" style={{ background: c }} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="sd-nav" style={i === 0 ? { background: "color-mix(in srgb, " + c + " 14%, #fff)" } : undefined}>
            <i style={{ background: i === 0 ? c : "#C9CDD5" }} />
          </span>
        ))}
      </aside>
      <div className="sd-main">
        <div className="sd-top">
          <span className="sd-brand" style={{ color: c }}>{brand}</span>
          <span className="sd-search">Search…</span>
          <span className="sd-new" style={{ background: c }}>+ New</span>
          <span className="sd-me" style={{ background: "color-mix(in srgb, " + c + " 16%, #fff)", color: c }}>AP</span>
        </div>
        <div className="sd-body">{children}</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Healthcare */
function Healthcare({ c }: { c: string }) {
  const rows: [string, string, string, string, Tone, string, boolean][] = [
    ["10:00", "Sarah Johnson", "Injectable treatment", "Waiting · 12 min", "warn", "Start visit", true],
    ["10:00", "David Wilson", "Physiotherapy session", "In visit", "info", "View visit", false],
    ["10:15", "Michael Thomas", "Follow-up", "Waiting · 5 min", "warn", "Start visit", true],
    ["10:45", "Priya Menon", "Treatment review", "Arrived", "ok", "Move to waiting", false],
    ["11:00", "Marcus Lee", "Skin consultation", "Scheduled", "muted", "Check in", false],
  ];
  return (
    <Shell c={c} brand="Healthcare">
      <div className="sd-band" style={{ background: `linear-gradient(110deg, color-mix(in srgb, ${c} 10%, #fff), #fff 70%)` }}>
        <div>
          <span className="sd-k">Wednesday, October 7 · Brightwell Clinic</span>
          <div className="sd-h">Good morning, Dr. Patel</div>
          <span className="sd-k" style={{ color: INK }}>Sarah Johnson has been waiting 12 minutes.</span>
        </div>
        <div className="sd-g2">
          <Stat n="20" l="Appointments" c={c} icon={IC.cal} />
          <Stat n="8" l="Arrived" c="#15803D" icon={IC.check} />
          <Stat n="3" l="Waiting" c="#B45309" icon={IC.clock} />
          <Stat n="1" l="In progress" c={c} icon={IC.play} />
        </div>
      </div>
      <Card title="Today's schedule" right={<span className="sd-tabs"><b style={{ color: c, borderColor: c }}>Today</b><span>Providers</span><span>Rooms</span></span>} style={{ flex: 1 }}>
        {rows.map(([t, n, s, st, tone, a, primary]) => (
          <div key={n} className="sd-row" style={{ gridTemplateColumns: "38px 1.25fr 1.2fr 1fr 92px", boxShadow: tone === "warn" ? `inset 2px 0 0 #F59E0B` : undefined }}>
            <span>{t}</span>
            <span className="sd-who"><Av name={n} c={c} /><b>{n}</b></span>
            <span className="sd-mute">{s}</span>
            <span><Pill tone={tone} c={c}>{st}</Pill></span>
            <span className={primary ? "sd-btn" : "sd-btn ghost"} style={primary ? { background: c } : { color: c, borderColor: "color-mix(in srgb, " + c + " 35%, #fff)" }}>{a}</span>
          </div>
        ))}
      </Card>
    </Shell>
  );
}

/* ------------------------------------------------------------- Manufacturing */
function Manufacturing({ c }: { c: string }) {
  const stages = ["Cutting", "Assembly", "QC", "Ready"];
  const rows: [string, string, string, number, string][] = [
    ["MO-2214", "Modular desk · Oak · 1600", "40", 1, "Oct 9"],
    ["MO-2215", "Storage cabinet · Grey · 4 door", "24", 2, "Oct 9"],
    ["MO-2217", "Meeting table · Walnut · 2400", "6", 0, "Oct 11"],
    ["MO-2218", "Desk frame · Black · Sit-stand", "120", 3, "Oct 8"],
    ["MO-2220", "Shelving unit · Birch · 5 tier", "60", 1, "Oct 12"],
    ["MO-2221", "Reception counter · White · L", "2", 0, "Oct 14"],
    ["MO-2223", "Task chair · Mesh · Black", "80", 2, "Oct 15"],
  ];
  return (
    <Shell c={c} brand="Manufacturing">
      <div className="sd-g4">
        <Stat n="48" l="Open orders" c={c} icon={IC.box} />
        <Stat n="12" l="Released today" c="#15803D" icon={IC.check} />
        <Stat n="3" l="Low stock items" c="#B45309" icon={IC.alert} />
        <div className="sd-stat" style={{ display: "block" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span className="sd-k">Line capacity</span><b style={{ fontSize: 13 }}>78%</b></div>
          <div className="sd-bar"><i style={{ width: "78%", background: c }} /></div>
        </div>
      </div>
      <Card title="Manufacturing orders" right={<span className="sd-k">Sorted by due date</span>} style={{ flex: 1 }}>
        <div className="sd-row sd-th" style={{ gridTemplateColumns: "62px 1.6fr 34px 1.5fr 44px" }}><span>Order</span><span>Configured product</span><span>Qty</span><span>Stage</span><span>Due</span></div>
        {rows.map(([wo, p, q, st, d]) => (
          <div key={wo} className="sd-row" style={{ gridTemplateColumns: "62px 1.6fr 34px 1.5fr 44px" }}>
            <b style={{ color: c }}>{wo}</b>
            <span>{p}</span>
            <span className="sd-mute">{q}</span>
            <span className="sd-steps">
              {stages.map((s, i) => (
                <span key={s} className="sd-step">
                  <i style={{ background: i < st ? c : i === st ? "#fff" : "#E5E7EB", borderColor: i <= st ? c : "#E5E7EB" }} />
                  {i === st && <em style={{ color: c }}>{s}</em>}
                </span>
              ))}
            </span>
            <span className="sd-mute">{d}</span>
          </div>
        ))}
      </Card>
    </Shell>
  );
}

/* -------------------------------------------------------------- Construction */
function Construction({ c }: { c: string }) {
  const phases: [string, number, number, "done" | "now" | "next"][] = [
    ["Foundation", 0, 3, "done"],
    ["Structure", 2, 6, "done"],
    ["MEP works", 5, 9, "now"],
    ["Finishes", 8, 11, "next"],
    ["External works", 9, 12, "next"],
  ];
  const col = 100 / 12;
  return (
    <Shell c={c} brand="Construction">
      <div className="sd-card" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 14, alignItems: "center", padding: "12px 14px" }}>
        <div><span className="sd-k" style={{ display: "block" }}>Project · Nova Residences</span><div className="sd-h" style={{ fontSize: 15 }}>Riverside Block B</div></div>
        <div><span className="sd-k" style={{ display: "block" }}>Progress</span><b style={{ fontSize: 15 }}>64%</b><div className="sd-bar"><i style={{ width: "64%", background: c }} /></div></div>
        <div><span className="sd-k" style={{ display: "block" }}>Budget used</span><b style={{ fontSize: 15 }}>58%</b><div className="sd-bar"><i style={{ width: "58%", background: "#D6B88C" }} /></div></div>
        <div><span className="sd-k" style={{ display: "block" }}>Next milestone</span><b style={{ fontSize: 12.5 }}>MEP sign-off</b><span className="sd-k" style={{ display: "block" }}>Oct 21</span></div>
      </div>
      <Card title="Schedule" right={<span className="sd-tabs"><span>Weeks</span><b style={{ color: c, borderColor: c }}>Months</b></span>} style={{ flex: 1 }}>
        <div className="sd-gantt">
          <div className="sd-gh">
            <span />
            <div>{["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          {phases.map(([n, a, b, st]) => (
            <div key={n} className="sd-gr">
              <span>{n}</span>
              <div>
                <i style={{ left: `${a * col}%`, width: `${(b - a) * col}%`, background: st === "done" ? c : st === "now" ? `repeating-linear-gradient(135deg, ${c}, ${c} 6px, color-mix(in srgb, ${c} 75%, #fff) 6px, color-mix(in srgb, ${c} 75%, #fff) 12px)` : "#E7E1D8" }}>
                  {st === "done" && "Done"}{st === "now" && "In progress"}
                </i>
              </div>
            </div>
          ))}
          <div className="sd-gr">
            <span>Handover</span>
            <div><b className="sd-diamond" style={{ left: `calc(${11.5 * col}% - 6px)`, background: c }} /></div>
          </div>
          <span className="sd-today" style={{ left: `calc(96px + (100% - 96px) * ${7.2 / 12})`, background: c }}><em style={{ background: c }}>Today</em></span>
        </div>
      </Card>
    </Shell>
  );
}

/* ------------------------------------------------------------- Field Service */
function FieldService({ c }: { c: string }) {
  const techs: [string, [number, number, string, Tone][]][] = [
    ["Arjun Rao", [[0, 2, "WO-881 · HVAC repair", "ok"], [2.5, 5, "WO-886 · Boiler service", "info"]]],
    ["Lena Park", [[0.5, 3, "WO-882 · Lift inspection", "ok"], [3.5, 6, "WO-889 · Fire alarm test", "muted"]]],
    ["Omar Haddad", [[1, 4, "WO-884 · Generator PM", "info"], [4.5, 6, "WO-890", "muted"]]],
    ["Mia Chen", [[0, 1.5, "WO-879 · Leak", "ok"], [2, 4.5, "WO-887 · Chiller check", "info"]]],
    ["Ravi Kumar", [[1.5, 3.5, "WO-885 · Pump repair", "info"], [4, 6, "WO-891 · Site survey", "muted"]]],
  ];
  const tone = (t: Tone): CSSProperties => t === "ok" ? { background: "#E7F7EE", color: "#15803D", borderColor: "#86D3A5" } : t === "info" ? { background: c, color: "#fff", borderColor: c } : { background: "#F1F2F5", color: MUTE, borderColor: "#DADDE3" };
  return (
    <Shell c={c} brand="Field Service">
      <div className="sd-g4">
        <Stat n="34" l="Jobs today" c={c} icon={IC.cal} />
        <Stat n="6" l="En route" c={c} icon={IC.truck} />
        <Stat n="21" l="Completed" c="#15803D" icon={IC.check} />
        <Stat n="1" l="Overdue" c="#B45309" icon={IC.alert} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 168px", gap: 12, flex: 1, minHeight: 0 }}>
        <Card title="Dispatch board" right={<span className="sd-k">Today · 8 AM to 2 PM</span>}>
          <div className="sd-disp">
            <div className="sd-dh"><span />{["8", "9", "10", "11", "12", "1"].map((h) => <span key={h}>{h}</span>)}</div>
            {techs.map(([n, jobs]) => (
              <div key={n} className="sd-dr">
                <span className="sd-who"><Av name={n} c={c} /><b>{n.split(" ")[0]}</b></span>
                <div>
                  {jobs.map(([a, b, l, t]) => (
                    <i key={l} style={{ left: `${(a / 6) * 100}%`, width: `calc(${((b - a) / 6) * 100}% - 4px)`, ...tone(t) }}>{l}</i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="sd-card sd-map">
          <svg viewBox="0 0 168 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="168" height="220" fill="#EEF2F6" />
            <path d="M0 60h168M0 140h168M50 0v220M118 0v220" stroke="#fff" strokeWidth="9" />
            <path d="M0 100h168M84 0v220" stroke="#fff" strokeWidth="4" />
            <path d="M30 180 C 50 150, 70 150, 84 120 S 110 80, 132 50" fill="none" stroke={c} strokeWidth="3" strokeDasharray="6 5" />
            {[[30, 180], [84, 120], [132, 50], [50, 70]].map(([x, y], i) => (
              <g key={i}><circle cx={x} cy={y} r="9" fill={i === 1 ? c : "#fff"} stroke={c} strokeWidth="2.5" /><circle cx={x} cy={y} r="3" fill={i === 1 ? "#fff" : c} /></g>
            ))}
          </svg>
          <span className="sd-map-tag">6 technicians on the road</span>
        </div>
      </div>
    </Shell>
  );
}

/* --------------------------------------------------------------- Hospitality */
function Hospitality({ c }: { c: string }) {
  const rows: [string, string, string, string, Tone][] = [
    ["Elena Rossi", "412", "3 nights", "VIP · Arriving 2 PM", "solid"],
    ["James Okafor", "208", "2 nights", "Checked in", "ok"],
    ["Hana Sato", "315", "5 nights", "Arriving 4 PM", "info"],
    ["Tom Becker", "120", "1 night", "Room being prepared", "warn"],
    ["Amara Diallo", "506", "4 nights", "Checked in", "ok"],
    ["Lucas Moreau", "221", "2 nights", "Arriving 6 PM", "info"],
  ];
  const slots: [string, string, boolean][] = [["7:00", "4 covers", false], ["7:30", "2 covers", false], ["8:00", "4 covers", true], ["8:30", "6 covers", false], ["9:00", "2 covers", false]];
  return (
    <Shell c={c} brand="Hospitality">
      <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", gap: 12, flex: 1, minHeight: 0 }}>
        <div className="sd-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <svg width="104" height="104" viewBox="0 0 104 104" aria-hidden="true">
            <circle cx="52" cy="52" r="42" fill="none" stroke="#EEF0F3" strokeWidth="11" />
            <circle cx="52" cy="52" r="42" fill="none" stroke={c} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${0.86 * 264} 264`} transform="rotate(-90 52 52)" />
            <text x="52" y="52" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK}>86%</text>
            <text x="52" y="68" textAnchor="middle" fontSize="9.5" fill={MUTE}>Occupancy</text>
          </svg>
          <div className="sd-mini">
            <span><b>112</b>In-house</span><span><b>24</b>Arrivals</span><span><b>18</b>Departures</span>
          </div>
        </div>
        <Card title="Today's arrivals" right={<span className="sd-k">24 guests</span>}>
          {rows.map(([n, r, ni, st, t]) => (
            <div key={n} className="sd-row" style={{ gridTemplateColumns: "1.4fr 40px 58px 1.4fr" }}>
              <span className="sd-who"><Av name={n} c={c} /><b>{n}</b></span>
              <span className="sd-mute">{r}</span>
              <span className="sd-mute">{ni}</span>
              <span><Pill tone={t} c={c}>{st}</Pill></span>
            </div>
          ))}
        </Card>
      </div>
      <Card title="Tonight at The Terrace" right={<span className="sd-k">38 covers booked</span>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {slots.map(([t, cv, on]) => (
            <div key={t} className="sd-slot" style={on ? { borderColor: c, background: "color-mix(in srgb, " + c + " 8%, #fff)" } : undefined}>
              <b style={on ? { color: c } : undefined}>{t} PM</b><span>{cv}</span>
            </div>
          ))}
        </div>
      </Card>
    </Shell>
  );
}

/* ------------------------------------------------------- Financial services */
function Finance({ c }: { c: string }) {
  const rows: [string, string, string, string, Tone, string][] = [
    ["Harper & Co", "Maya Chen", "2 days ago", "Annual review call", "warn", "Follow-up due"],
    ["Northgate Holdings", "Daniel Ortiz", "Today", "Proposal sent", "ok", "On track"],
    ["Lena Fischer", "Maya Chen", "5 days ago", "Statement query", "info", "Request open"],
    ["Bright Path Ltd", "Sam Rivera", "Yesterday", "Renewal reminder", "ok", "On track"],
    ["Orion Partners", "Daniel Ortiz", "1 week ago", "Intro meeting", "warn", "Follow-up due"],
    ["Kavya Iyer", "Sam Rivera", "3 days ago", "Document request", "info", "Request open"],
  ];
  return (
    <Shell c={c} brand="Financial services">
      <div className="sd-g4">
        <Stat n="1,284" l="Clients" c={c} icon={IC.cal} />
        <Stat n="14" l="Follow-ups due" c="#B45309" icon={IC.clock} />
        <Stat n="9" l="Open requests" c={c} icon={IC.alert} />
        <Stat n="62" l="Campaign replies" c="#15803D" icon={IC.check} />
      </div>
      <Card title="Client follow-ups" right={<span className="sd-tabs"><b style={{ color: c, borderColor: c }}>All</b><span>Due this week</span><span>Requests</span></span>} style={{ flex: 1 }}>
        <div className="sd-row sd-th" style={{ gridTemplateColumns: "1.3fr 1.1fr 0.8fr 1.1fr 0.9fr" }}><span>Client</span><span>Relationship manager</span><span>Last contact</span><span>Next step</span><span>Status</span></div>
        {rows.map(([n, rm, last, step, tone, st]) => (
          <div key={n} className="sd-row" style={{ gridTemplateColumns: "1.3fr 1.1fr 0.8fr 1.1fr 0.9fr", boxShadow: tone === "warn" ? "inset 2px 0 0 #F59E0B" : undefined }}>
            <span className="sd-who"><Av name={n} c={c} /><b>{n}</b></span>
            <span className="sd-who"><Av name={rm} c="#64748B" /><span>{rm}</span></span>
            <span className="sd-mute">{last}</span>
            <span>{step}</span>
            <span><Pill tone={tone} c={c}>{st}</Pill></span>
          </div>
        ))}
      </Card>
    </Shell>
  );
}

/* -------------------------------------------------------------- All industries */
/* Rows come straight from the industry list on /industries, so every dot is a
   real "this product is relevant" from that page. Columns are the eight
   everyday products; Skillberry stands in for learning. */
const FIT_COLS: { key: string; label: string }[] = [
  { key: "crm", label: "CRM" }, { key: "campaigns", label: "Campaigns" }, { key: "projects", label: "Projects" },
  { key: "serviceops", label: "ServiceOps" }, { key: "desk", label: "Desk" }, { key: "billing", label: "Billing" },
  { key: "inventory", label: "Inventory" }, { key: "skillberry", label: "Skillberry" },
];
const FIT_ROWS: [string, string[]][] = [
  ["Professional services", ["crm", "projects", "billing", "desk"]],
  ["Wholesale and distribution", ["crm", "inventory", "billing", "desk"]],
  ["Education and training", ["crm", "campaigns", "skillberry", "desk", "billing"]],
  ["Retail and e-commerce", ["crm", "campaigns", "inventory", "billing", "desk"]],
  ["Logistics and transportation", ["crm", "projects", "billing", "desk"]],
  ["Financial services", ["crm", "campaigns", "desk"]],
  ["Automotive and equipment", ["crm", "serviceops", "inventory", "billing", "desk"]],
  ["Energy and utilities", ["crm", "serviceops", "projects", "inventory", "billing", "desk"]],
];
function AllIndustries({ c }: { c: string }) {
  const grid = "158px repeat(8, 1fr)";
  return (
    <Shell c={c} brand="All industries">
      <div className="sd-g4">
        <Stat n="13" l="Industries" c={c} icon={IC.grid} />
        <Stat n="11" l="Products" c={c} icon={IC.box} />
        <Stat n="5" l="Dedicated solutions" c="#15803D" icon={IC.check} />
        <Stat n="1" l="Suite" c="#B45309" icon={IC.gauge} />
      </div>
      <Card title="Product fit by industry" right={<span className="sd-k">Start with what you need</span>} style={{ flex: 1 }}>
        <div className="sd-fit-h" style={{ gridTemplateColumns: grid }}>
          <span />
          {FIT_COLS.map((col) => (
            <span key={col.key} title={col.label}><ProductBadge productKey={col.key} size={20} /></span>
          ))}
        </div>
        {FIT_ROWS.map(([name, apps], i) => (
          <div key={name} className="sd-fit-r" style={{ gridTemplateColumns: grid, animationDelay: `${i * 1.1}s`, ["--fit" as string]: c } as CSSProperties}>
            <b>{name}</b>
            {FIT_COLS.map((col) => (
              <span key={col.key}>{apps.includes(col.key) && <i style={{ background: c }} />}</span>
            ))}
          </div>
        ))}
      </Card>
    </Shell>
  );
}

const BOARDS: Record<string, (p: { c: string }) => ReactNode> = {
  healthcare: Healthcare,
  manufacturing: Manufacturing,
  construction: Construction,
  "field-service": FieldService,
  hospitality: Hospitality,
  finance: Finance,
  all: AllIndustries,
};

export function SolutionDash({ k, c }: { k: string; c: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0.8);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const Board = BOARDS[k];
  return (
    <div ref={ref} className="sd-fit" aria-hidden="true">
      <div className="sd-canvas" style={{ width: W, height: H, transform: `scale(${s})` }}>
        <Board c={c} />
      </div>
    </div>
  );
}
