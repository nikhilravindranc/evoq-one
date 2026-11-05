"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { BookingsNav } from "../BookingsNav";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { track } from "@/lib/track";
import { I } from "../theme";
import { BAND, BG, DEEP, ERR, INK, LINE, MIST, MIST_SOFT, MUTED, NEUTRAL, OK, PRIMARY, PRIMARY_HOVER, SAND } from "./palette";

/* Shell for the Appointment Scheduling microsite inside EVOQ Bookings: the EVOQ top bar, a light microsite
   bar, the get started form and the shared styles. Every surface is light; the page keeps the Bookings
   family look (type, corners, windows, pointers) that Spaces uses, in the moss palette. */

export const AP_BASE = "/products/bookings/appointments";
export const AP_NAME = "Appointments";
export type ApPage = "home" | "features" | "pricing";
const NAV: { k: ApPage; label: string; href: string }[] = [
  { k: "home", label: "Overview", href: AP_BASE },
  { k: "features", label: "Features", href: `${AP_BASE}/features` },
  { k: "pricing", label: "Pricing", href: `${AP_BASE}/pricing` },
];

const StartCtx = createContext<(location: string) => void>(() => {});
export const useStart = () => useContext(StartCtx);

export function StartButton({ location, className = "ap-btn primary", children = "Get started" }: { location: string; className?: string; children?: ReactNode }) {
  const open = useStart();
  return <button type="button" className={className} onClick={() => open(location)}>{children}</button>;
}

/* ---------- get started form ---------- */
const ORG_TYPES = ["Healthcare or clinic", "Beauty and aesthetics", "Salon or spa", "Wellness or fitness", "Professional services", "Education or training", "Other"];
const LOCATIONS = ["1", "2 to 5", "6 to 20", "More than 20"];
const PROVIDERS = ["1 to 5", "6 to 20", "21 to 50", "More than 50"];
type Fields = { name: string; email: string; org: string; role: string; type: string; locations: string; providers: string; need: string };
const EMPTY: Fields = { name: "", email: "", org: "", role: "", type: "", locations: "", providers: "", need: "" };
const REQUIRED: (keyof Fields)[] = ["name", "email", "org", "type", "locations", "providers"];

function StartForm({ location, onDone }: { location: string; onDone: () => void }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    if (!started.current) { started.current = true; track("start_get_started_form", { location, page: "appointments" }); }
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
    track("submit_get_started_form", { location, page: "appointments", org_type: f.type, locations: f.locations, providers: f.providers });
    setDone(true);
  };
  if (done)
    return (
      <div className="ap-form-done" role="status">
        <span className="ap-tick">{I.check}</span>
        <h3>Thank you, we have your details.</h3>
        <p>Our team will contact you to set up EVOQ Appointments around your services, providers and locations.</p>
        <button type="button" className="ap-btn primary" onClick={onDone}>Close</button>
      </div>
    );
  const a = (k: keyof Fields) => ({ id: `ap-${k}`, value: f[k], onChange: set(k), "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `ap-${k}-err` : undefined });
  const field = (k: keyof Fields, label: string, input: ReactNode, optional = false) => (
    <div className={`ap-field${errors[k] ? " err" : ""}`}>
      <label htmlFor={`ap-${k}`}>{label}{optional && <span> (optional)</span>}</label>
      {input}
      {errors[k] && <small id={`ap-${k}-err`}>{errors[k]}</small>}
    </div>
  );
  const select = (k: keyof Fields, opts: string[]) => <select {...a(k)}><option value="">Select an option</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>;
  return (
    <form className="ap-form" onSubmit={submit} noValidate>
      <div className="ap-form-grid">
        {field("name", "Name", <input {...a("name")} autoComplete="name" />)}
        {field("email", "Work email", <input {...a("email")} type="email" autoComplete="email" />)}
        {field("org", "Organization", <input {...a("org")} autoComplete="organization" />)}
        {field("role", "Your role", <input {...a("role")} autoComplete="organization-title" placeholder="For example, Practice manager" />, true)}
        {field("type", "Industry", select("type", ORG_TYPES))}
        {field("locations", "Number of locations", select("locations", LOCATIONS))}
        {field("providers", "Number of providers", select("providers", PROVIDERS))}
        <div className="ap-span">{field("need", "What would you like to set up first?", <textarea {...a("need")} rows={3} placeholder="Services, providers, a booking page, reminders" />, true)}</div>
      </div>
      <button type="submit" className="ap-btn primary">Get started</button>
    </form>
  );
}

function StartModal({ location, onClose }: { location: string | null; onClose: () => void }) {
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
    <div className="ap-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={box} className="ap-modal-box" role="dialog" aria-modal="true" aria-labelledby="ap-modal-title">
        <button type="button" className="ap-modal-x" onClick={onClose} aria-label="Close">×</button>
        <span className="ap-label">Get started</span>
        <h2 id="ap-modal-title" className="ap-modal-title">Set up EVOQ Appointments around the way you work.</h2>
        <p className="ap-modal-sub">Tell us about your services, providers and locations, and we will help you set it up.</p>
        <StartForm location={location} onDone={onClose} />
      </div>
    </div>
  );
}

/* The mark: a calendar with a clock inside, in the Bookings tile and stroke style. */
export function ApMark() {
  return (
    <span className="ap-sub-ico" aria-hidden>
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="7" width="18" height="16" rx="3" />
        <path d="M10 4.5v4M18 4.5v4" />
        <circle cx="14" cy="15.5" r="4" />
        <path d="M14 13.8v1.9l1.3.9" />
      </svg>
    </span>
  );
}

function StickyBar({ page }: { page: ApPage }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 560);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`ap-stick${on ? " on" : ""}`} aria-hidden={!on}>
      <div className="ap-stick-in">
        <span className="ap-sub-brand"><ApMark /><b>{AP_NAME}</b></span>
        <nav className="ap-sub-nav" aria-label="Appointments pages">{NAV.map((n) => <a key={n.k} href={n.href} tabIndex={on ? 0 : -1} aria-current={n.k === page ? "page" : undefined}>{n.label}</a>)}</nav>
        <StartButton location="sticky" className="ap-btn primary sm" />
      </div>
    </div>
  );
}

export function ApptShell({ page = "home", hero, children }: { page?: ApPage; hero: ReactNode; children: ReactNode }) {
  const [from, setFrom] = useState<string | null>(null);
  const open = useCallback((location: string) => {
    track("click_get_started", { location, page: "appointments" });
    setFrom(location);
  }, []);
  const close = useCallback(() => setFrom(null), []);
  useEffect(() => { track(`view_appointments_${page}`, { page: "appointments" }); }, [page]);
  return (
    <StartCtx.Provider value={open}>
      <div className="ap-root hs-root">
        <style>{css}</style>
        <HsMotion />
        <header className="ap-hd">
          <span className="ap-hd-bg" aria-hidden />
          <div className="ap-hd-top"><Topbar light darkCTA={false} ctaColor={PRIMARY} /></div>
          <BookingsNav product="appointments" page={page} />
          <div className="ap-hd-body">{hero}</div>
        </header>
        <StickyBar page={page} />
        <main>{children}</main>
        <Footer />
        <StartModal location={from} onClose={close} />
      </div>
    </StartCtx.Provider>
  );
}

const css = `
  .ap-root{background:#fff;color:${INK};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh}
  .ap-root h1,.ap-root h2,.ap-root h3{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-weight:600;margin:0}
  .ap-root p{text-wrap:pretty}
  .ap-out{padding:0 20px}
  .ap-in{max-width:1240px;margin:0 auto}
  .ap-sec{padding-top:96px;padding-bottom:96px;scroll-margin-top:60px}
  .ap-white{background:#fff}
  .ap-band{background:${BAND}}
  .ap-label{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${PRIMARY}}
  .ap-h2{font-size:38px;line-height:1.12;letter-spacing:-.02em;text-wrap:balance}
  .ap-lead{font-size:18px;line-height:1.6;color:${MUTED};margin:18px 0 0;max-width:62ch;text-wrap:pretty}
  .ap-head{max-width:800px;margin-bottom:44px}
  .ap-head .ap-label{margin-bottom:14px}
  .ap-head.c{margin-left:auto;margin-right:auto;text-align:center}
  .ap-head.c .ap-lead{margin-left:auto;margin-right:auto}
  .ap-head.wide{max-width:1160px}
  .ap-head.wide .ap-lead{max-width:1100px}
  .ap-note{display:flex;align-items:flex-start;gap:12px;margin:40px 0 0;padding:16px 20px;border-radius:16px;background:${MIST_SOFT};color:${INK};font-size:15.5px;line-height:1.5}
  .ap-note svg{width:18px;height:18px;color:${PRIMARY};flex-shrink:0;margin-top:2px}

  .ap-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:background .18s ease,border-color .18s ease,color .18s ease;white-space:nowrap}
  .ap-btn.sm{min-height:36px;padding:0 14px;font-size:13.5px;border-radius:7px}
  .ap-btn.primary{background:${PRIMARY};color:#fff}.ap-btn.primary:hover{background:${PRIMARY_HOVER}}
  .ap-btn.secondary{background:#fff;color:${PRIMARY};border-color:${PRIMARY}}.ap-btn.secondary:hover{background:${MIST_SOFT}}
  .ap-btn.ghost{background:#fff;color:${INK};border-color:${LINE}}
  .ap-root button:focus-visible,.ap-root a:focus-visible{outline:2px solid ${PRIMARY};outline-offset:2px}
  .ap-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
  .ap-badge{font-style:normal;display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.5}
  .ap-badge svg{width:12px;height:12px}
  .ap-badge.ok{background:rgba(22,138,74,.1);color:${OK}}.ap-badge.warn{background:rgba(217,119,6,.12);color:#A35A04}.ap-badge.off{background:rgba(104,114,128,.12);color:${NEUTRAL}}
  .ap-badge.moss{background:${MIST};color:${DEEP}}

  /* header, always light */
  .ap-hd{position:relative;isolation:isolate}
  .ap-hd-bg{position:absolute;inset:0;z-index:-1;overflow:hidden;background:radial-gradient(55% 60% at 92% 8%,rgba(217,185,140,.45),rgba(217,185,140,0) 70%),radial-gradient(60% 55% at 0% 100%,rgba(143,182,154,.35),rgba(143,182,154,0) 70%),linear-gradient(180deg,${MIST_SOFT} 0%,${BG} 100%)}
  .ap-hd-top{position:relative;z-index:60}
  .ap-hd-body{padding:0 20px}
  .ap-hd-in{width:100%;max-width:1240px;margin:0 auto}
  .ap-sub{position:relative;z-index:5;border-bottom:1px solid ${LINE};padding:0 20px}
  .ap-sub-in{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:24px;min-height:52px}
  .ap-sub-brand{display:flex;align-items:center;gap:9px;text-decoration:none;color:${DEEP};flex-shrink:0}
  .ap-sub-brand b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;line-height:1.2;white-space:nowrap}
  .ap-sub-ico{width:30px;height:30px;border-radius:9px;background:${PRIMARY};color:#fff;display:grid;place-items:center;flex-shrink:0}
  .ap-sub-ico svg{width:20px;height:20px}
  .ap-sub-nav{display:flex;gap:22px;margin-left:auto;overflow-x:auto;scrollbar-width:none}
  .ap-sub-nav a{position:relative;padding:15px 0;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:${MUTED};text-decoration:none;white-space:nowrap}
  .ap-sub-nav a:hover{color:${DEEP}}
  .ap-sub-nav a[aria-current="page"]{color:${DEEP}}
  .ap-stick{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(255,255,255,.95);backdrop-filter:saturate(1.4) blur(10px);border-bottom:1px solid ${LINE};transform:translateY(-100%);transition:transform .25s ease}
  .ap-stick.on{transform:none}
  .ap-stick-in{max-width:1240px;margin:0 auto;padding:8px 20px;display:flex;align-items:center;gap:24px}
  .ap-stick .ap-sub-nav a{padding:8px 0}

  /* windows */
  .ap-win{background:#fff;border-radius:16px;overflow:hidden;text-align:left;box-shadow:0 30px 60px -30px rgba(30,45,34,.4),0 0 0 1px rgba(30,45,34,.08);font-size:14px;line-height:1.4;color:${INK}}
  .ap-chrome{display:flex;align-items:center;gap:12px;padding:7px 14px;background:#EAEEE7;border-bottom:1px solid ${LINE}}
  .ap-dots{display:inline-flex;gap:6px}.ap-dots i{width:10px;height:10px;border-radius:50%;background:#C7CFC5}
  .ap-url{display:inline-flex;align-items:center;gap:7px;height:24px;padding:0 12px;border-radius:12px;background:#fff;font-size:11.5px;color:${MUTED};box-shadow:0 0 0 1px ${LINE};margin-left:8px;white-space:nowrap;overflow:hidden}
  .ap-face{border-radius:50%;object-fit:cover;flex-shrink:0;box-shadow:0 0 0 2px #fff,0 2px 6px rgba(30,45,34,.22)}
  .ap-coach{display:inline-flex;align-items:center;gap:7px;padding:4px 10px 4px 5px;border-radius:999px;background:#F4D9A3;color:#3B2A12;font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;white-space:nowrap;box-shadow:0 8px 18px -8px rgba(59,42,18,.55)}
  .ap-coach b{width:18px;height:18px;border-radius:50%;background:#3B2A12;color:#F4D9A3;display:grid;place-items:center;font-size:10.5px}

  /* tabs and bars */
  .ap-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:${PRIMARY};transform-origin:left;animation:apBar var(--dwell,7s) linear forwards}
  @keyframes apBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes apIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

  /* closing band: inset panel, like the EVOQ Bookings enquiry band */
  .ap-close{padding:0 20px 96px;background:${BG}}
  .ap-close-in{position:relative;overflow:hidden;max-width:1240px;margin:0 auto;border-radius:32px;padding:120px 40px;text-align:center;background:radial-gradient(55% 70% at 92% 0%,rgba(217,185,140,.45),rgba(217,185,140,0) 70%),radial-gradient(60% 70% at 0% 100%,rgba(143,182,154,.4),rgba(143,182,154,0) 70%),linear-gradient(180deg,${MIST_SOFT} 0%,${BG} 100%)}
  .ap-close-c{position:relative;z-index:1;max-width:1080px;margin:0 auto;display:flex;flex-direction:column;align-items:center}
  .ap-close-c .ap-h2{font-size:46px}
  .ap-close-c .ap-lead{margin-left:auto;margin-right:auto;font-size:19px;max-width:none}
  .ap-close-c .ap-ctas{justify-content:center}
  .ap-cs{position:absolute;pointer-events:none;z-index:0}
  .ap-cs.ring{bottom:-180px;left:-100px;width:400px;height:400px;border-radius:50%;border:1.5px solid ${PRIMARY};opacity:.2}
  .ap-cs.dots{top:48px;right:10%;width:96px;height:72px;background-image:radial-gradient(${PRIMARY} 1.4px,transparent 1.6px);background-size:16px 16px;opacity:.3}
  .ap-cs.sun{bottom:56px;right:16%;width:64px;height:64px;border-radius:50%;background:${SAND};opacity:.45}
  @media (max-width:860px){.ap-close{padding:0 12px 64px}.ap-close-in{border-radius:20px;padding:64px 18px}.ap-close-c .ap-h2{font-size:30px}.ap-cs.dots{display:none}}

  /* get started modal */
  .ap-modal{position:fixed;inset:0;z-index:100;background:rgba(30,45,34,.45);display:grid;place-items:center;padding:20px;overflow-y:auto}
  .ap-modal-box{position:relative;width:min(760px,100%);background:#fff;border-radius:18px;padding:34px;max-height:calc(100vh - 40px);overflow-y:auto}
  .ap-modal-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:0;background:${BG};font-size:22px;line-height:1;cursor:pointer;color:${INK}}
  .ap-modal-title{font-size:26px;line-height:1.2;margin-top:10px!important}
  .ap-modal-sub{color:${MUTED};margin:8px 0 20px}
  .ap-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;margin-bottom:20px}
  .ap-span{grid-column:1 / -1}
  .ap-field label{display:block;font-size:13.5px;font-weight:600;color:${DEEP};margin-bottom:6px}
  .ap-field label span{font-weight:400;color:${NEUTRAL}}
  .ap-field input,.ap-field select,.ap-field textarea{width:100%;box-sizing:border-box;border:1.5px solid ${LINE};border-radius:8px;padding:10px 12px;font:inherit;font-size:15px;color:${INK};background:#fff}
  .ap-field input:focus,.ap-field select:focus,.ap-field textarea:focus{outline:none;border-color:${PRIMARY}}
  .ap-field.err input,.ap-field.err select,.ap-field.err textarea{border-color:${ERR}}
  .ap-field small{display:block;color:${ERR};font-size:12.5px;margin-top:4px}
  .ap-form-done{text-align:center;padding:20px 0}
  .ap-form-done h3{font-size:22px;margin:12px 0 6px!important}
  .ap-form-done p{color:${MUTED};margin:0 auto 20px;max-width:46ch}
  .ap-tick{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:50%;background:rgba(22,138,74,.12);color:${OK}}
  .ap-tick svg{width:26px;height:26px}

  .hs-rv{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
  .hs-rv.hs-in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.hs-rv{transition:none;opacity:1;transform:none}.ap-bar{display:none}}
  @media (max-width:860px){
    .ap-h2{font-size:29px}
    .ap-sec{padding-top:68px;padding-bottom:68px}
    .ap-form-grid{grid-template-columns:minmax(0,1fr)}
    .ap-modal-box{padding:24px 20px}
    .ap-sub-in{gap:14px}
    .ap-stick .ap-sub-nav{display:none}.ap-stick-in{justify-content:space-between}
  }
  @media (max-width:560px){.ap-sub .ap-sub-nav{display:none}}
`;

