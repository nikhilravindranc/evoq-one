"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DEEP, I, LINE, MUTED, SAGE } from "./theme";

/* The one Bookings bar, shared by the Bookings page and its inner pages, the same way the Healthcare pages work.
   On the Bookings page it shows the EVOQ Bookings mark and the pages of the family. On Spaces and Appointments it
   shows that product's mark with Overview, Features and Pricing, and a switcher on the right to move between the
   Bookings pages. Booking types without a page yet are shown as "Soon". The dark variant sits on the Spaces header. */

export type BookingsProduct = "overview" | "spaces" | "appointments";
export type BookingsPage = "home" | "features" | "pricing";

const BASE = "/products/bookings";
const FAMILY: { key: string; name: string; desc: string; href?: string }[] = [
  { key: "overview", name: "EVOQ Bookings", desc: "One booking system for rooms, appointments, stays and facilities.", href: BASE },
  { key: "spaces", name: "Spaces", desc: "Space and room reservations for offices, venues and communities.", href: `${BASE}/spaces` },
  { key: "appointments", name: "Appointments", desc: "Service-based scheduling across providers and locations.", href: `${BASE}/appointments` },
  { key: "stays", name: "Stays", desc: "Hotel rooms, resort stays and villas." },
  { key: "facilities", name: "Facilities", desc: "Clubs, courts, studios and event venues." },
];

const SpacesMark = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="5" y="7" width="18" height="16" rx="3" /><path d="M10 4.5v4M18 4.5v4M11 23v-6a3 3 0 0 1 6 0v6" />
  </svg>
);
const ApptMark = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="5" y="7" width="18" height="16" rx="3" /><path d="M10 4.5v4M18 4.5v4" /><circle cx="14" cy="15.5" r="4" /><path d="M14 13.8v1.9l1.3.9" />
  </svg>
);

const PRODUCTS = {
  overview: { name: "EVOQ Bookings", base: BASE, tone: SAGE, mark: null },
  spaces: { name: "Spaces", base: `${BASE}/spaces`, tone: "#B4583A", mark: <SpacesMark /> },
  appointments: { name: "Appointments", base: `${BASE}/appointments`, tone: "#4E6F58", mark: <ApptMark /> },
} as const;

function Switcher({ current }: { current: BookingsProduct }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={ref} className="bn-sw">
      <button type="button" className="bn-sw-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
        <span>Bookings</span>
        <svg className={open ? "up" : ""} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="bn-pop">
          <p>Bookings pages</p>
          {FAMILY.map((d) => {
            const active = d.key === current;
            const body = (
              <>
                <span><b>{d.name}{!d.href && <em>Soon</em>}</b><small>{d.desc}</small></span>
                {active && <i aria-hidden>{I.check}</i>}
              </>
            );
            return d.href ? (
              <Link key={d.key} href={d.href} className={active ? "on" : ""} onClick={() => setOpen(false)}>{body}</Link>
            ) : (
              <span key={d.key} className="off" aria-disabled="true">{body}</span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function BookingsNav({ product, page = "home", tone = "light" }: { product: BookingsProduct; page?: BookingsPage; tone?: "light" | "dark" }) {
  const p = PRODUCTS[product];
  const menu: { key: string; name: string; href?: string; on?: boolean }[] =
    product === "overview"
      ? [
          { key: "overview", name: "Overview", href: BASE, on: true },
          { key: "spaces", name: "Spaces", href: `${BASE}/spaces` },
          { key: "appointments", name: "Appointments", href: `${BASE}/appointments` },
          { key: "stays", name: "Stays" },
          { key: "facilities", name: "Facilities" },
        ]
      : [
          { key: "home", name: "Overview", href: p.base, on: page === "home" },
          { key: "features", name: "Features", href: `${p.base}/features`, on: page === "features" },
          { key: "pricing", name: "Pricing", href: `${p.base}/pricing`, on: page === "pricing" },
        ];
  return (
    <div className={`bn bn-${tone}`} style={{ ["--tone" as string]: p.tone }}>
      <style>{css}</style>
      <div className="bn-in">
        <Link href={p.base} className="bn-brand" aria-label={`${p.name} overview`}>
          <i>{p.mark ?? I.rules}</i><b>{p.name}</b>
        </Link>
        <nav className="bn-menu" aria-label={p.name}>
          {menu.map((m) =>
            m.href ? (
              <Link key={m.key} href={m.href} aria-current={m.on ? "page" : undefined} className={m.on ? "on" : ""}>{m.name}</Link>
            ) : (
              <span key={m.key} className="soon" aria-disabled="true">{m.name}<em>Soon</em></span>
            )
          )}
        </nav>
        {product !== "overview" && <div className="bn-end"><Switcher current={product} /></div>}
      </div>
    </div>
  );
}

const css = `
  .bn{position:relative;z-index:6;padding:0 20px;border-bottom:1px solid ${LINE}}
  .bn-in{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;min-height:56px}
  .bn-brand{display:flex;align-items:center;gap:10px;flex-shrink:0;text-decoration:none;color:${DEEP}}
  .bn-brand i{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:var(--tone);color:#fff}
  .bn-brand i svg{width:19px;height:19px}
  .bn-brand b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;white-space:nowrap}
  .bn-menu{display:flex;align-items:center;gap:4px;margin-left:8px;overflow-x:auto;scrollbar-width:none}
  .bn-menu::-webkit-scrollbar{display:none}
  .bn-menu a,.bn-menu .soon{position:relative;display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:500;text-decoration:none;white-space:nowrap;transition:background .18s ease,color .18s ease}
  .bn-menu a{color:${MUTED}}
  .bn-menu a:hover{background:rgba(100,133,109,.1);color:${DEEP}}
  .bn-menu a.on{color:${DEEP};font-weight:600}
  .bn-menu a.on::after{content:"";position:absolute;left:16px;right:16px;bottom:-12px;height:2.5px;border-radius:2px;background:var(--tone)}
  .bn-menu .soon{color:rgba(90,102,93,.6);cursor:default}
  .bn-menu .soon em,.bn-pop b em{font-style:normal;padding:2px 7px;border-radius:999px;background:rgba(100,133,109,.12);font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:${MUTED}}
  .bn-menu a:focus-visible,.bn-sw-btn:focus-visible,.bn-pop a:focus-visible{outline:2px solid var(--tone);outline-offset:2px}
  .bn-end{margin-left:auto;flex-shrink:0}
  .bn-sw{position:relative}
  .bn-sw-btn{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid rgba(49,70,58,.14);border-radius:999px;background:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;color:${MUTED};cursor:pointer;transition:background .18s ease,color .18s ease}
  .bn-sw-btn:hover{background:rgba(100,133,109,.08);color:${DEEP}}
  .bn-sw-btn>svg:first-child{color:var(--tone)}
  .bn-sw-btn svg.up{transform:rotate(180deg)}
  .bn-pop{position:absolute;right:0;top:calc(100% + 10px);z-index:80;width:340px;padding:8px;border-radius:18px;background:#fff;box-shadow:0 24px 60px -20px rgba(30,45,34,.35),0 0 0 1px rgba(30,45,34,.08);text-align:left}
  .bn-pop p{margin:0;padding:8px 14px 4px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#94A39A}
  .bn-pop a,.bn-pop .off{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 14px;border-radius:12px;text-decoration:none}
  .bn-pop a:hover{background:#F6F8F5}
  .bn-pop a.on{background:#F1F5F0}
  .bn-pop .off{opacity:.6;cursor:default}
  .bn-pop span{display:block}
  .bn-pop b{display:flex;align-items:center;gap:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;font-weight:700;color:${DEEP};line-height:1.2}
  .bn-pop small{display:block;margin-top:3px;font-size:12px;line-height:1.4;color:${MUTED}}
  .bn-pop i{display:grid;place-items:center;flex-shrink:0;width:20px;height:20px;border-radius:50%;background:var(--tone);color:#fff}
  .bn-pop i svg{width:12px;height:12px}
  .bn-dark{border-bottom-color:rgba(255,255,255,.18)}
  .bn-dark .bn-brand{color:#fff}
  .bn-dark .bn-brand i{background:#fff;color:var(--tone)}
  .bn-dark .bn-menu a{color:rgba(255,255,255,.78)}
  .bn-dark .bn-menu a:hover{background:rgba(255,255,255,.14);color:#fff}
  .bn-dark .bn-menu a.on{color:#fff}
  .bn-dark .bn-menu a.on::after{background:#fff}
  .bn-dark .bn-menu .soon{color:rgba(255,255,255,.55)}
  .bn-dark .bn-menu .soon em{background:rgba(255,255,255,.16);color:rgba(255,255,255,.85)}
  .bn-dark .bn-sw-btn{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.28);color:#fff}
  .bn-dark .bn-sw-btn:hover{background:rgba(255,255,255,.22)}
  .bn-dark .bn-sw-btn>svg:first-child{color:#fff}
  @media (max-width:760px){
    .bn-in{gap:12px;min-height:52px}
    .bn-brand b{display:none}
    .bn-menu{margin-left:0}
    .bn-menu a,.bn-menu .soon{padding:8px 11px;font-size:14px}
    .bn-menu a.on::after{left:11px;right:11px;bottom:-9px}
    .bn-sw-btn span{display:none}
    .bn-sw-btn{padding:8px 10px}
    .bn-pop{position:fixed;left:12px;right:12px;top:auto;width:auto;margin-top:10px}
  }
`;
