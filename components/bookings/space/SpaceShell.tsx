"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { track } from "@/lib/track";
import { I } from "../theme";
import { FX_CSS, NightField } from "./fx";
import { BG, DEEP, ERR, INK, LINE, MUTED, NEUTRAL, OK, PRIMARY, PRIMARY_HOVER, ACCENT, SAND, HERO_GRADIENT, HERO_VIGNETTE, HERO_SCRIM, GRAIN } from "./palette";

/* Shell for the Space & Room Reservations microsite inside EVOQ Bookings: the EVOQ top bar, a
   microsite bar (Home, Features, Pricing and a Request a demo button), the demo request form and
   the shared styles. The microsite keeps the EVOQ Bookings identity; it is a category, not a brand. */

export const SR_BASE = "/products/bookings/space-and-room-reservations";
export type SrPage = "home" | "features" | "pricing";
const NAV: { k: SrPage; label: string; href: string }[] = [
  { k: "home", label: "Home", href: SR_BASE },
  { k: "features", label: "Features", href: `${SR_BASE}/features` },
  { k: "pricing", label: "Pricing", href: `${SR_BASE}/pricing` },
];

const DemoCtx = createContext<(location: string) => void>(() => {});
export const useDemo = () => useContext(DemoCtx);

export function DemoButton({ location, className = "sr-btn primary", children = "Request a demo" }: { location: string; className?: string; children?: ReactNode }) {
  const open = useDemo();
  return <button type="button" className={className} onClick={() => open(location)}>{children}</button>;
}

/* ---------- demo request form (fields from the microsite plan) ---------- */
const ORG_TYPES = ["Corporate office", "Coworking space", "Training or education facility", "Venue or shared facility", "Organization with several locations", "Other"];
const LOCATIONS = ["1", "2 to 5", "6 to 20", "More than 20"];
const SPACES = ["Up to 10", "11 to 50", "51 to 200", "More than 200"];
type Fields = { name: string; email: string; org: string; role: string; type: string; locations: string; spaces: string; need: string; time: string };
const EMPTY: Fields = { name: "", email: "", org: "", role: "", type: "", locations: "", spaces: "", need: "", time: "" };
const REQUIRED: (keyof Fields)[] = ["name", "email", "org", "role", "type", "locations", "spaces", "need"];

function DemoForm({ location, onDone }: { location: string; onDone: () => void }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    if (!started.current) { started.current = true; track("start_demo_form", { location, page: "space_and_room" }); }
    setF((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    REQUIRED.forEach((k) => { if (!f[k].trim()) next[k] = "This field is required."; });
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) next.email = "Enter a valid work email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    track("submit_demo_form", { location, page: "space_and_room", org_type: f.type, locations: f.locations, spaces: f.spaces });
    setDone(true);
  };
  if (done)
    return (
      <div className="sr-form-done" role="status">
        <span className="sr-tick">{I.check}</span>
        <h3>Thank you, your request is in.</h3>
        <p>Our team will contact you to arrange a demo of Space &amp; Room Reservations for your organization.</p>
        <button type="button" className="sr-btn primary" onClick={onDone}>Close</button>
      </div>
    );
  const a = (k: keyof Fields) => ({ id: `sr-${k}`, value: f[k], onChange: set(k), "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `sr-${k}-err` : undefined });
  const field = (k: keyof Fields, label: string, input: ReactNode, optional = false) => (
    <div className={`sr-field${errors[k] ? " err" : ""}`}>
      <label htmlFor={`sr-${k}`}>{label}{optional && <span> (optional)</span>}</label>
      {input}
      {errors[k] && <small id={`sr-${k}-err`}>{errors[k]}</small>}
    </div>
  );
  const select = (k: keyof Fields, opts: string[]) => <select {...a(k)}><option value="">Select an option</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>;
  return (
    <form className="sr-form" onSubmit={submit} noValidate>
      <div className="sr-form-grid">
        {field("name", "Name", <input {...a("name")} autoComplete="name" />)}
        {field("email", "Work email", <input {...a("email")} type="email" autoComplete="email" />)}
        {field("org", "Organization", <input {...a("org")} autoComplete="organization" />)}
        {field("role", "Your role", <input {...a("role")} autoComplete="organization-title" placeholder="For example, Facilities manager" />)}
        {field("type", "Organization type", select("type", ORG_TYPES))}
        {field("locations", "Number of locations", select("locations", LOCATIONS))}
        {field("spaces", "Approximate number of spaces and resources", select("spaces", SPACES))}
        {field("time", "Preferred contact time", <input {...a("time")} placeholder="For example, weekday mornings" />, true)}
        <div className="sr-span">{field("need", "Main requirement", <textarea {...a("need")} rows={3} placeholder="What do people book today, and what would you like to change?" />)}</div>
      </div>
      <button type="submit" className="sr-btn primary">Request a demo</button>
    </form>
  );
}

function DemoModal({ location, onClose }: { location: string | null; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!location) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    box.current?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [location, onClose]);
  if (!location) return null;
  return (
    <div className="sr-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={box} className="sr-modal-box" role="dialog" aria-modal="true" aria-labelledby="sr-modal-title">
        <button type="button" className="sr-modal-x" onClick={onClose} aria-label="Close">×</button>
        <span className="sr-label">Request a demo</span>
        <h2 id="sr-modal-title" className="sr-modal-title">See Space &amp; Room Reservations with your own spaces in mind.</h2>
        <p className="sr-modal-sub">Tell us about your locations and what people book. We will tailor the demo to it.</p>
        <DemoForm location={location} onDone={onClose} />
      </div>
    </div>
  );
}

/* ---------- header: one gradient behind the EVOQ top bar, the microsite bar and the hero ---------- */
export const SR_NAME = "Spaces & Rooms";

const TOP_THEME = { navBg: "rgba(58,28,18,0.5)", navFg: "#FFFFFF", ctaBg: "#FFFFFF", ctaFg: "#3B2A22", loginFg: "#FFFFFF" };

/* The mark: a room door inside a booking calendar, drawn in the same rounded tile and stroke style as the EVOQ Bookings mark. */
function SrMark() {
  return (
    <span className="sr-sub-ico" aria-hidden>
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="7" width="18" height="16" rx="3" />
        <path d="M10 4.5v4M18 4.5v4M11 23v-6a3 3 0 0 1 6 0v6" />
      </svg>
    </span>
  );
}

function SubNav({ page }: { page: SrPage }) {
  return (
    <div className="sr-sub">
      <div className="sr-sub-in">
        <a href={SR_BASE} className="sr-sub-brand" aria-label="Spaces and Rooms home">
          <SrMark />
          <b>{SR_NAME}</b>
        </a>
        <nav className="sr-sub-nav" aria-label="Spaces and Rooms">
          {NAV.map((n) => <a key={n.k} href={n.href} aria-current={n.k === page ? "page" : undefined}>{n.label}</a>)}
        </nav>
      </div>
    </div>
  );
}

/* Appears once the header has scrolled away, so the demo button stays within reach. */
function StickyBar({ page }: { page: SrPage }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 520);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`sr-stick${on ? " on" : ""}`} aria-hidden={!on}>
      <div className="sr-stick-in">
        <span className="sr-sub-brand"><SrMark /><b>{SR_NAME}</b></span>
        <nav className="sr-sub-nav" aria-label="Spaces and Rooms sections">
          {NAV.map((n) => <a key={n.k} href={n.href} tabIndex={on ? 0 : -1} aria-current={n.k === page ? "page" : undefined}>{n.label}</a>)}
        </nav>
        <DemoButton location={`sticky_${page}`} className="sr-btn primary sm" />
      </div>
    </div>
  );
}

export function SpaceShell({ page, hero, full, heroImg, children }: { page: SrPage; hero: ReactNode; full?: boolean; heroImg?: string; children: ReactNode }) {
  const [demoFrom, setDemoFrom] = useState<string | null>(null);
  const open = useCallback((location: string) => {
    track("click_demo_cta", { location, page: "space_and_room" });
    setDemoFrom(location);
  }, []);
  const close = useCallback(() => setDemoFrom(null), []);
  useEffect(() => {
    track(page === "features" ? "view_features_page" : page === "pricing" ? "view_pricing_page" : "view_space_home", { page: "space_and_room" });
  }, [page]);
  return (
    <DemoCtx.Provider value={open}>
      <div className="sr-root hs-root">
        <style>{css}</style>
        <HsMotion />
        <header className={`sr-hd${full ? " full" : ""}`}>
          {heroImg ? (
            <>
              <span className="sr-hd-photo" aria-hidden style={{ backgroundImage: `url(${heroImg})` }} />
              <span className="sr-hd-scrim" aria-hidden />
            </>
          ) : (
            <>
              <span className="sr-hd-bg" aria-hidden />
              <NightField stars={36} pings={2} seed={5} />
            </>
          )}
          <div className="sr-hd-top"><Topbar darkCTA light={false} theme={TOP_THEME} /></div>
          <SubNav page={page} />
          <div className="sr-hd-body">{hero}</div>
        </header>
        <StickyBar page={page} />
        <main>{children}</main>
        <Footer background="#1A0F0A" />
        <DemoModal location={demoFrom} onClose={close} />
      </div>
    </DemoCtx.Provider>
  );
}

const css = `
  ${FX_CSS}
  .sr-root{background:${BG};color:${INK};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh}
  .sr-root h1,.sr-root h2,.sr-root h3{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-weight:600;margin:0}
  .sr-out{padding:0 20px}
  .sr-in{max-width:1240px;margin:0 auto}
  .sr-sec{padding-top:104px;padding-bottom:104px}
  .sr-sec.tight{padding-top:72px}
  .sr-label{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${ACCENT}}
  .sr-h1{font-size:48px;line-height:1.08;letter-spacing:-.02em;margin-top:16px!important;text-wrap:balance}
  .sr-h2{font-size:38px;line-height:1.12;letter-spacing:-.02em;text-wrap:balance}
  .sr-h3{font-size:20px;line-height:1.3}
  .sr-lead{font-size:18px;line-height:1.6;color:${MUTED};margin:18px 0 0;max-width:60ch;text-wrap:pretty}
  .sr-head{max-width:780px;margin-bottom:52px}
  .sr-head .sr-label{margin-bottom:14px}
  .sr-head.c{margin-left:auto;margin-right:auto;text-align:center}
  .sr-head.c .sr-lead{margin-left:auto;margin-right:auto}
  .sr-root p{text-wrap:pretty}

  .sr-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:background .18s ease,border-color .18s ease,color .18s ease;white-space:nowrap}
  .sr-btn.sm{min-height:36px;padding:0 14px;font-size:13.5px;border-radius:7px}
  .sr-btn.primary{background:${PRIMARY};color:#fff}
  .sr-btn.primary:hover{background:${PRIMARY_HOVER}}
  .sr-btn.secondary{background:transparent;color:${ACCENT};border-color:${ACCENT}}
  .sr-btn.secondary:hover{background:rgba(180,88,58,.08)}
  .sr-btn.ghost{background:#fff;color:${INK};border-color:${LINE}}
  .sr-btn.light{background:#fff;color:#6E3320}
  .sr-btn.light:hover{background:#F8ECE5}
  .sr-btn.outline-light{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}
  .sr-btn.outline-light:hover{background:rgba(255,255,255,.14)}
  .sr-root button:focus-visible,.sr-root a:focus-visible,.sr-root summary:focus-visible{outline:2px solid ${PRIMARY};outline-offset:2px}
  .sr-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
  .sr-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:${ACCENT};text-decoration:none}
  .sr-link svg{width:15px;height:15px}
  .sr-link:hover{gap:9px}

  .sr-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.5}
  .sr-badge svg{width:12px;height:12px}
  .sr-badge.ok{background:rgba(22,138,74,.1);color:${OK}}
  .sr-badge.warn{background:rgba(217,119,6,.12);color:#A35A04}
  .sr-badge.off{background:rgba(104,114,128,.12);color:${NEUTRAL}}
  .sr-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:#fff;border:1px solid ${LINE};font-size:11.5px;color:${MUTED};white-space:nowrap}
  .sr-chip svg{width:12px;height:12px}

  /* header */
  .sr-hd{position:relative;isolation:isolate;color:#fff}
  .sr-hd.full{min-height:100vh;display:flex;flex-direction:column}
  .sr-hd-bg{position:absolute;inset:0;z-index:-1;background:${HERO_VIGNETTE},${HERO_GRADIENT};overflow:hidden}
  .sr-hd-bg::after{content:"";position:absolute;inset:0;background-image:${GRAIN};opacity:.07;mix-blend-mode:overlay;pointer-events:none}
  .sr-hd-photo{position:absolute;inset:0;z-index:-2;background-size:cover;background-position:center}
  .sr-hd-scrim{position:absolute;inset:0;z-index:-1;background:${HERO_VIGNETTE},${HERO_SCRIM}}
  .sr-hd-top{position:relative;z-index:60}
  .sr-hd-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 20px}
  .sr-hd-in{width:100%;max-width:1240px;margin:0 auto}
  .sr-hd h1,.sr-hd .sr-h1{color:#fff}
  .sr-hd .sr-lead{color:rgba(255,255,255,.92);text-shadow:0 1px 12px rgba(40,20,12,.5)}
  .sr-hd .sr-label{color:rgba(255,255,255,.8)}
  .sr-sub{position:relative;z-index:5;border-bottom:1px solid rgba(255,255,255,.18);padding:0 20px}
  .sr-sub-in{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:24px;min-height:52px}
  .sr-sub-brand{display:flex;align-items:center;gap:9px;text-decoration:none;color:inherit;flex-shrink:0}
  .sr-sub-brand b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;line-height:1.2;white-space:nowrap}
  .sr-sub-brand small{font-size:12px;opacity:.7;white-space:nowrap}
  .sr-sub-ico{width:30px;height:30px;border-radius:9px;background:#fff;color:#6E3320;display:grid;place-items:center;flex-shrink:0}
  .sr-sub-ico svg{width:20px;height:20px}
  .sr-sub-nav{display:flex;gap:22px;margin-left:auto}
  .sr-sub-nav a{position:relative;padding:15px 0;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:rgba(255,255,255,.78);text-decoration:none}
  .sr-sub-nav a:hover{color:#fff}
  .sr-sub-nav a[aria-current="page"]{color:#fff}
  .sr-sub-nav a[aria-current="page"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#fff;border-radius:2px}
  .sr-stick{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(255,255,255,.94);backdrop-filter:saturate(1.4) blur(10px);border-bottom:1px solid ${LINE};transform:translateY(-100%);transition:transform .25s ease;color:${DEEP}}
  .sr-stick.on{transform:none}
  .sr-stick-in{max-width:1240px;margin:0 auto;padding:8px 20px;display:flex;align-items:center;gap:24px}
  .sr-stick .sr-sub-ico{background:${PRIMARY};color:#fff}
  .sr-stick .sr-sub-nav a{color:${MUTED};padding:8px 0}
  .sr-stick .sr-sub-nav a:hover,.sr-stick .sr-sub-nav a[aria-current="page"]{color:${DEEP}}
  .sr-stick .sr-sub-nav a[aria-current="page"]::after{background:${PRIMARY};bottom:0}
  .sr-stick .sr-btn{margin-left:0}

  /* product windows */
  .sr-win{background:#fff;border-radius:14px;box-shadow:0 30px 60px -30px rgba(43,33,28,.45),0 0 0 1px rgba(43,33,28,.07);overflow:hidden;text-align:left}
  .sr-win-bar{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid ${LINE};font-size:13px}
  .sr-win-bar b{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .sr-win-dots{display:inline-flex;gap:4px}
  .sr-win-dots i{width:8px;height:8px;border-radius:50%;background:${LINE}}
  .sr-win-right{margin-left:auto;min-width:0;overflow:hidden}
  .sr-win-body{padding:14px}
  .sr-seg{display:inline-flex;background:${BG};border-radius:7px;padding:2px}
  .sr-seg em{font-style:normal;font-size:11.5px;padding:2px 8px;border-radius:5px;color:${MUTED}}
  .sr-seg em.on{background:#fff;color:${DEEP};font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,.08)}
  .sr-cal-top{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:10px;font-size:13px}
  .sr-cal-top b{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};margin-right:auto}
  .sr-cal{display:grid;gap:6px}
  .sr-cal-head,.sr-cal-row{display:grid;grid-template-columns:128px minmax(0,1fr);gap:10px;align-items:center}
  .sr-cal-hours{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));font-size:10px;color:${NEUTRAL}}
  .sr-cal-hours i{font-style:normal}
  .sr-cal-name b{display:block;font-size:12.5px;color:${DEEP};line-height:1.2}
  .sr-cal-name small{display:block;font-size:10.5px;color:${NEUTRAL};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .sr-cal-lane{position:relative;height:30px;border-radius:7px;background:repeating-linear-gradient(90deg,${BG} 0 calc(10% - 1px),${LINE} calc(10% - 1px) 10%)}
  .sr-blk{position:absolute;top:3px;bottom:3px;border-radius:5px;padding:0 6px;font-size:10.5px;font-weight:600;line-height:24px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .sr-blk.ok{background:rgba(180,88,58,.2);color:${DEEP};box-shadow:inset 3px 0 0 ${PRIMARY}}
  .sr-blk.warn{background:rgba(245,158,11,.16);color:#92400E;box-shadow:inset 3px 0 0 #D97706}
  .sr-blk.off{background:repeating-linear-gradient(135deg,#E6EAF0 0 6px,#DDE1EA 6px 12px);color:${NEUTRAL}}
  .sr-win.compact .sr-cal-head,.sr-win.compact .sr-cal-row{grid-template-columns:100px 1fr}
  .sr-win.compact .sr-cal-hours i:nth-child(even){visibility:hidden}
  .sr-legend{display:flex;gap:14px;margin-top:12px;font-size:11px;color:${MUTED}}
  .sr-legend span{display:inline-flex;align-items:center;gap:5px}
  .sr-legend i{width:9px;height:9px;border-radius:3px}
  .sr-legend i.ok{background:${PRIMARY}}.sr-legend i.warn{background:#D97706}.sr-legend i.off{background:#B7BECB}

  .sr-cat{display:grid;gap:8px}
  .sr-cat-card{display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:12px;align-items:center;padding:8px;border-radius:10px;border:1px solid ${LINE}}
  .sr-cat-card img{width:64px;height:48px;border-radius:7px;object-fit:cover}
  .sr-cat-txt b{display:block;font-size:13.5px;color:${DEEP};line-height:1.25}
  .sr-cat-txt small{display:block;font-size:11.5px;color:${NEUTRAL}}
  .sr-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
  .sr-tags em{font-style:normal;font-size:10.5px;padding:1px 7px;border-radius:999px;background:${BG};color:${MUTED}}

  .sr-pub-space{display:flex;gap:12px;align-items:center;margin-bottom:12px}
  .sr-pub-space img{width:72px;height:54px;border-radius:8px;object-fit:cover}
  .sr-pub-space b{display:block;font-size:14px;color:${DEEP}}
  .sr-pub-space small{font-size:11.5px;color:${NEUTRAL}}
  .sr-pub-label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${NEUTRAL};margin:6px 0 8px}
  .sr-days{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:8px}
  .sr-days span{border:1px solid ${LINE};border-radius:8px;padding:5px 0;text-align:center;line-height:1.2}
  .sr-days small{display:block;font-size:10.5px;color:${NEUTRAL}}
  .sr-days b{font-size:13px;color:${DEEP}}
  .sr-days span.on{border-color:${PRIMARY};background:rgba(180,88,58,.1)}
  .sr-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
  .sr-slots span{border:1px solid ${LINE};border-radius:7px;padding:5px 0;text-align:center;font-size:12px;font-weight:600;color:${DEEP}}
  .sr-slots span.taken{color:#B4BCC8;text-decoration:line-through;background:#F8FAFC}
  .sr-slots span.on{background:${PRIMARY};border-color:${PRIMARY};color:#fff}
  .sr-pub-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
  .sr-pub-opts span{border:1px solid ${LINE};border-radius:8px;padding:6px 10px;line-height:1.3}
  .sr-pub-opts small{display:block;font-size:10.5px;color:${NEUTRAL}}
  .sr-pub-opts b{font-size:12.5px;color:${DEEP}}
  .sr-pub-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 10px;margin-top:12px}

  .sr-dl{display:grid;gap:7px;margin:0}
  .sr-dl div{display:grid;grid-template-columns:120px 1fr;gap:10px;font-size:12.5px}
  .sr-dl dt{color:${NEUTRAL}}.sr-dl dd{margin:0;color:${DEEP};font-weight:600}
  .sr-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid ${LINE}}
  .sr-hist{display:grid;gap:6px;margin-top:14px;padding-top:12px;border-top:1px solid ${LINE};font-size:12px;color:${MUTED}}
  .sr-hist span{display:flex;align-items:center;gap:6px}
  .sr-hist svg{width:14px;height:14px;color:${OK}}

  .sr-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px}
  .sr-kpis span{border-radius:9px;background:${BG};padding:8px 10px;line-height:1.25}
  .sr-kpis small{display:block;font-size:10.5px;color:${NEUTRAL}}
  .sr-kpis b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${DEEP}}
  .sr-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid ${LINE}}
  .sr-ico{width:28px;height:28px;border-radius:8px;background:rgba(180,88,58,.12);color:${PRIMARY};display:grid;place-items:center;flex-shrink:0}
  .sr-ico svg{width:15px;height:15px}
  .sr-txt{flex:1;min-width:0}
  .sr-txt b{display:block;font-size:12.5px;color:${DEEP};line-height:1.25}
  .sr-txt small{display:block;font-size:11px;color:${NEUTRAL}}
  .sr-tag{font-style:normal;font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:999px;background:rgba(180,88,58,.1);color:${ACCENT};white-space:nowrap}

  .sr-qr{display:flex;gap:14px;align-items:center}
  .sr-qr svg{width:96px;height:96px;fill:${DEEP};flex-shrink:0}
  .sr-qr b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .sr-qr small{display:block;font-size:12px;color:${NEUTRAL};margin-bottom:8px}
  .sr-note{font-size:12px;color:${MUTED};margin:12px 0 0}
  .sr-bars{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;height:110px;align-items:end;margin-bottom:8px}
  .sr-bars span{display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end}
  .sr-bars i{width:100%;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,${PRIMARY},rgba(180,88,58,.55))}
  .sr-bars small{font-size:10px;color:${NEUTRAL}}
  .sr-set{display:grid}
  .sr-set div{display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-top:1px solid ${LINE};font-size:12.5px}
  .sr-set div:first-child{border-top:0}
  .sr-set span{color:${MUTED}}.sr-set b{color:${DEEP};text-align:right}

  /* cards and grids */
  .sr-card{background:#fff;border-radius:16px;padding:26px;box-shadow:0 0 0 1px rgba(43,33,28,.07),0 18px 36px -28px rgba(43,33,28,.4)}
  .sr-card h3{font-size:19px;line-height:1.3;margin-bottom:8px!important}
  .sr-card p{margin:0;color:${MUTED};font-size:15px}
  .sr-grid{display:grid;gap:18px}
  .sr-grid.c2{grid-template-columns:repeat(2,1fr)}.sr-grid.c3{grid-template-columns:repeat(3,1fr)}
  .sr-list{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:8px}
  .sr-list li{display:flex;gap:9px;font-size:15px;color:${INK};line-height:1.45}
  .sr-list li svg{width:16px;height:16px;color:${PRIMARY};flex-shrink:0;margin-top:3px}

  /* demo modal and form */
  .sr-modal{position:fixed;inset:0;z-index:100;background:rgba(43,33,28,.5);display:grid;place-items:center;padding:20px;overflow-y:auto}
  .sr-modal-box{position:relative;width:min(760px,100%);background:#fff;border-radius:18px;padding:34px;max-height:calc(100vh - 40px);overflow-y:auto}
  .sr-modal-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:0;background:${BG};font-size:22px;line-height:1;cursor:pointer;color:${INK}}
  .sr-modal-title{font-size:26px;line-height:1.2;margin-top:10px!important}
  .sr-modal-sub{color:${MUTED};margin:8px 0 20px}
  .sr-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;margin-bottom:20px}
  .sr-span{grid-column:1 / -1}
  .sr-field label{display:block;font-size:13.5px;font-weight:600;color:${DEEP};margin-bottom:6px}
  .sr-field label span{font-weight:400;color:${NEUTRAL}}
  .sr-field input,.sr-field select,.sr-field textarea{width:100%;box-sizing:border-box;border:1.5px solid ${LINE};border-radius:8px;padding:10px 12px;font:inherit;font-size:15px;color:${INK};background:#fff}
  .sr-field input:focus,.sr-field select:focus,.sr-field textarea:focus{outline:none;border-color:${PRIMARY}}
  .sr-field.err input,.sr-field.err select,.sr-field.err textarea{border-color:${ERR}}
  .sr-field small{display:block;color:${ERR};font-size:12.5px;margin-top:4px}
  .sr-form-done{text-align:center;padding:20px 0}
  .sr-form-done h3{font-size:22px;margin:12px 0 6px!important}
  .sr-form-done p{color:${MUTED};margin:0 auto 20px;max-width:46ch}
  .sr-tick{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:50%;background:rgba(22,138,74,.12);color:${OK}}
  .sr-tick svg{width:26px;height:26px}

  /* closing band, shared by all pages */
  .sr-close{position:relative;isolation:isolate;overflow:hidden;background:#2B1912;color:#fff;padding:112px 16px calc(var(--sky,clamp(120px,11vw,210px)) + 64px)}
  .sr-close-band{position:relative;z-index:2;max-width:820px;margin:0 auto;text-align:center}
  .sr-close-band h2{color:#fff}.sr-close-band .sr-lead{color:rgba(255,255,255,.82);margin-left:auto;margin-right:auto}.sr-close-band .sr-label{color:${SAND}}
  .sr-close-band .sr-ctas{justify-content:center}
  .sr-close-band.one{max-width:980px}.sr-close-band.one .sr-h2,.sr-close-band.one .sr-lead{white-space:nowrap;max-width:none}
  @media (max-width:900px){.sr-close-band.one .sr-h2,.sr-close-band.one .sr-lead{white-space:normal}}
  @media (max-width:640px){.sr-close{padding:80px 16px calc(var(--sky,120px) + 48px)}}

  .hs-rv{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
  .hs-rv.hs-in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.hs-rv{transition:none;opacity:1;transform:none}}

  @media (max-width:1024px){.sr-grid.c3{grid-template-columns:repeat(2,1fr)}}
  @media (max-width:980px){.sr-hd-scrim{background:rgba(58,28,18,.82)}}
  @media (max-width:860px){
    .sr-sub-brand small{display:none}
    .sr-sub-in{gap:14px}
    .sr-stick .sr-sub-nav{display:none}
    .sr-stick-in{justify-content:space-between}
    .sr-h1{font-size:36px}.sr-h2{font-size:29px}
    .sr-sec{padding-top:72px;padding-bottom:72px}
    .sr-grid.c2,.sr-grid.c3{grid-template-columns:minmax(0,1fr)}
    .sr-form-grid{grid-template-columns:minmax(0,1fr)}
    .sr-modal-box{padding:24px 20px}
  }
  @media (max-width:480px){
    .sr-sub-nav{gap:16px}
    .sr-sub-brand b{font-size:14px}
    .sr-cal-head,.sr-cal-row{grid-template-columns:84px minmax(0,1fr)}
    .sr-cal-hours i:nth-child(even){visibility:hidden}
    .sr-cat-card{grid-template-columns:52px minmax(0,1fr)}
    .sr-cat-card img{width:52px;height:42px}
    .sr-cat-card .sr-badge{grid-column:2;justify-self:start}
    .sr-qr svg{width:72px;height:72px}
    .sr-qr>div{min-width:0}
    .sr-qr .sr-badge{white-space:normal}
    .sr-kpis{grid-template-columns:1fr 1fr}
    .sr-seg em:not(.on){display:none}
    .sr-win-body{padding:12px}
  }
`;

