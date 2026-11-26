"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { BookingsNav } from "../BookingsNav";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { track, trackLead } from "@/lib/track";
import { I } from "../theme";
import { ACCENT, BAND, BG, DEEP, ERR, INK, LINE, MIST_SOFT, MUTED, PRIMARY, PRIMARY_HOVER } from "./palette";

export const FAC_BASE = "/products/bookings/facilities";
export const FAC_NAME = "Facilities";
export type FacPage = "home" | "features" | "pricing";
const NAV: { k: FacPage; label: string; href: string }[] = [
  { k: "home", label: "Overview", href: FAC_BASE },
  { k: "features", label: "Features", href: `${FAC_BASE}/features` },
  { k: "pricing", label: "Pricing", href: `${FAC_BASE}/pricing` },
];

const StartCtx = createContext<(location: string) => void>(() => {});
export const useStart = () => useContext(StartCtx);

export function StartButton({ location, className = "fac-btn primary", children = "Get started" }: { location: string; className?: string; children?: ReactNode }) {
  const open = useStart();
  return <button type="button" className={className} onClick={() => open(location)}>{children}</button>;
}

const ORG_TYPES = ["Sports facility or gym", "Hotel or hospitality", "Shared workspace", "Education or university", "Healthcare facility", "Event venue", "Other"];
const LOCATIONS = ["1", "2 to 5", "6 to 20", "More than 20"];
type Fields = { name: string; email: string; org: string; role: string; type: string; locations: string; need: string };
const EMPTY: Fields = { name: "", email: "", org: "", role: "", type: "", locations: "", need: "" };
const REQUIRED: (keyof Fields)[] = ["name", "email", "org", "type", "locations"];

function StartForm({ location, onDone }: { location: string; onDone: () => void }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    if (!started.current) { started.current = true; track("start_get_started_form", { location, page: "facilities" }); }
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
    trackLead("facilities_get_started", { source: location, product: "facilities", org_type: f.type });
    setDone(true);
  };
  if (done)
    return (
      <div className="fac-form-done" role="status">
        <span className="fac-tick">{I.check}</span>
        <h3>Thank you, we have your details.</h3>
        <p>Our team will contact you to set up EVOQ Facilities for your organization.</p>
        <button type="button" className="fac-btn primary" onClick={onDone}>Close</button>
      </div>
    );
  const a = (k: keyof Fields) => ({ id: `fac-${k}`, value: f[k], onChange: set(k), "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `fac-${k}-err` : undefined });
  const field = (k: keyof Fields, label: string, input: ReactNode, optional = false) => (
    <div className={`fac-field${errors[k] ? " err" : ""}`}>
      <label htmlFor={`fac-${k}`}>{label}{optional && <span> (optional)</span>}</label>
      {input}
      {errors[k] && <small id={`fac-${k}-err`}>{errors[k]}</small>}
    </div>
  );
  const select = (k: keyof Fields, opts: string[]) => <select {...a(k)}><option value="">Select an option</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>;
  return (
    <form className="fac-form" onSubmit={submit} noValidate>
      <div className="fac-form-grid">
        {field("name", "Name", <input {...a("name")} autoComplete="name" />)}
        {field("email", "Work email", <input {...a("email")} type="email" autoComplete="email" />)}
        {field("org", "Organization", <input {...a("org")} autoComplete="organization" />)}
        {field("role", "Your role", <input {...a("role")} autoComplete="organization-title" placeholder="For example, Facilities manager" />, true)}
        {field("type", "Facility type", select("type", ORG_TYPES))}
        {field("locations", "Number of locations", select("locations", LOCATIONS))}
        <div className="fac-span">{field("need", "What would you like to set up first?", <textarea {...a("need")} rows={3} placeholder="Resource booking, availability management, online reservations" />, true)}</div>
      </div>
      <button type="submit" className="fac-btn primary">Get started</button>
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
    <div className="fac-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={box} className="fac-modal-box" role="dialog" aria-modal="true" aria-labelledby="fac-modal-title">
        <button type="button" className="fac-modal-x" onClick={onClose} aria-label="Close">×</button>
        <span className="fac-label">Get started</span>
        <h2 id="fac-modal-title" className="fac-modal-title">Set up EVOQ Facilities for your organization.</h2>
        <p className="fac-modal-sub">Tell us about your resources, locations, and booking needs, and we will help you get started.</p>
        <StartForm location={location} onDone={onClose} />
      </div>
    </div>
  );
}

export function FacMark() {
  return (
    <span className="fac-sub-ico" aria-hidden>
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="22" height="16" rx="2" />
        <path d="M3 10h22M9 6v4M19 6v4M7 15h3M7 19h8M13 15h2M13 19h2" />
      </svg>
    </span>
  );
}

function StickyBar({ page }: { page: FacPage }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 560);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fac-stick${on ? " on" : ""}`} aria-hidden={!on}>
      <div className="fac-stick-in">
        <span className="fac-sub-brand"><FacMark /><b>{FAC_NAME}</b></span>
        <nav className="fac-sub-nav" aria-label="Facilities pages">{NAV.map((n) => <a key={n.k} href={n.href} tabIndex={on ? 0 : -1} aria-current={n.k === page ? "page" : undefined}>{n.label}</a>)}</nav>
        <StartButton location="sticky" className="fac-btn primary sm" />
      </div>
    </div>
  );
}

export function FacilitiesShell({ page = "home", hero, children }: { page?: FacPage; hero: ReactNode; children: ReactNode }) {
  const [from, setFrom] = useState<string | null>(null);
  const open = useCallback((location: string) => {
    track("click_get_started", { location, page: "facilities" });
    setFrom(location);
  }, []);
  const close = useCallback(() => setFrom(null), []);
  useEffect(() => { track(`view_facilities_${page}`, { page: "facilities" }); }, [page]);
  return (
    <StartCtx.Provider value={open}>
      <div className="fac-root hs-root">
        <style>{css}</style>
        <HsMotion />
        <header className="fac-hd">
          <span className="fac-hd-bg" aria-hidden />
          <div className="fac-hd-top"><Topbar light darkCTA={false} ctaColor={PRIMARY} /></div>
          <BookingsNav product="facilities" page={page} />
          <div className="fac-hd-body">{hero}</div>
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
  .fac-root{background:#fff;color:${INK};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh}
  .fac-root h1,.fac-root h2,.fac-root h3{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-weight:600;margin:0}
  .fac-root p{text-wrap:pretty}
  .fac-out{padding:0 20px}
  .fac-in{max-width:1240px;margin:0 auto}
  .fac-sec{padding-top:96px;padding-bottom:96px;scroll-margin-top:60px}
  .fac-white{background:#fff}
  .fac-band{background:${BAND}}
  .fac-label{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${PRIMARY}}
  .fac-h2{font-size:38px;line-height:1.12;letter-spacing:-.02em;text-wrap:balance}
  .fac-lead{font-size:18px;line-height:1.6;color:${MUTED};margin:18px 0 0;max-width:62ch;text-wrap:pretty}
  .fac-head{max-width:800px;margin-bottom:44px}
  .fac-head .fac-label{margin-bottom:14px}
  .fac-head.c{margin-left:auto;margin-right:auto;text-align:center}
  .fac-head.c .fac-lead{margin-left:auto;margin-right:auto}
  .fac-head.wide{max-width:1160px}
  .fac-head.wide .fac-lead{max-width:1100px}
  .fac-note{display:flex;align-items:flex-start;gap:12px;margin:40px 0 0;padding:16px 20px;border-radius:16px;background:${MIST_SOFT};color:${INK};font-size:15.5px;line-height:1.5}
  .fac-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border:1px solid ${PRIMARY};border-radius:8px;background:${PRIMARY};color:#fff;font-size:15px;font-weight:500;cursor:pointer;transition:all .2s}
  .fac-btn:hover{background:${PRIMARY_HOVER};border-color:${PRIMARY_HOVER}}
  .fac-btn.primary.sm{padding:8px 16px;font-size:14px}
  .fac-stick{position:fixed;top:0;left:0;right:0;background:#fff;border-bottom:1px solid ${LINE};transform:translateY(-100%);transition:transform .3s;z-index:50;opacity:0;pointer-events:none}
  .fac-stick.on{transform:translateY(0);opacity:1;pointer-events:auto}
  .fac-stick-in{max-width:1240px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:24px}
  .fac-sub-brand{display:flex;align-items:center;gap:8px;font-weight:600;color:${PRIMARY};white-space:nowrap}
  .fac-sub-ico{width:20px;height:20px;display:inline-flex;color:${PRIMARY}}
  .fac-sub-nav{display:flex;gap:24px;flex:1}
  .fac-sub-nav a{color:${INK};text-decoration:none;font-size:14px;transition:color .2s}
  .fac-sub-nav a:hover{color:${ACCENT}}
  .fac-sub-nav a[aria-current="page"]{color:${ACCENT};font-weight:600}
  .fac-hd{background:${BG};position:relative;border-bottom:1px solid ${LINE}}
  .fac-hd-bg{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(74,94,115,0.05) 0%,rgba(23,162,184,0.05) 100%);pointer-events:none}
  .fac-hd-top{position:relative;z-index:1}
  .fac-hd-body{position:relative;z-index:1}
  .fac-modal{position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.4);z-index:100}
  .fac-modal-box{background:#fff;border-radius:16px;padding:40px;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,0.1)}
  .fac-modal-x{position:absolute;top:16px;right:16px;width:32px;height:32px;border:none;background:none;color:${INK};font-size:24px;cursor:pointer}
  .fac-modal-title{font-size:28px;margin:16px 0 8px}
  .fac-modal-sub{color:${MUTED};margin:8px 0 24px;font-size:15px}
  .fac-form{display:flex;flex-direction:column;gap:24px}
  .fac-form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
  .fac-span{grid-column:1/-1}
  .fac-field{display:flex;flex-direction:column;gap:6px}
  .fac-field label{font-weight:500;color:${DEEP};font-size:14px}
  .fac-field input,.fac-field select,.fac-field textarea{padding:10px 12px;border:1px solid ${LINE};border-radius:6px;font-size:14px;font-family:inherit}
  .fac-field input:focus,.fac-field select:focus,.fac-field textarea:focus{outline:none;border-color:${ACCENT};box-shadow:0 0 0 2px rgba(23,162,184,0.1)}
  .fac-field.err input,.fac-field.err select,.fac-field.err textarea{border-color:${ERR}}
  .fac-field.err small{color:${ERR};font-size:12px}
  .fac-form-done{text-align:center;padding:32px}
  .fac-tick{font-size:48px;line-height:1}
  .fac-form-done h3{margin:16px 0 8px}
  .fac-form-done p{color:${MUTED};margin:0 0 24px}
`;
