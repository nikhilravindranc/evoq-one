"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { BookingCategories, CATEGORIES } from "./BookingCategories";
import { BookingSteps } from "./BookingSteps";
import { FloorPlan } from "./FloorPlan";
import { BG, DEEP, ERR, GRADIENT, I, INK, LINE, MUTED, NEUTRAL, OK, SAGE, SAGE_HOVER, SAND, TERRA, U } from "./theme";
import { track, trackCta } from "@/lib/track";

/* EVOQ Bookings landing page. Follows the EVOQ Bookings visual design system:
   one colour per role (Sage primary, Terracotta secondary, Sand decoration), light surfaces,
   Figtree headings and DM Sans body. Title sizes match the home page (H1 48px, H2 38px).
   Booking capabilities are proposed, so the product visuals are labelled as conceptual previews. */

const HERO_GRADIENT = GRADIENT;

const IMG = {
  room: U("1431540015161-0bf868a2d407"),
  prayer: U("1792060052578-9dbe661cadbd"),
  clinic: "/healthcare/stock/org-clinic-doctor.jpg",
  stay: U("1596178067639-5c6e68aea6dc"),
  court: U("1499510318569-1a3d67dc3976"),
  panel: U("1698653223247-09aaf01166fc", 1200),
};

/* ---------- content ---------- */
const BOOKING_OPTIONS = [...CATEGORIES.map((c) => c.option), "Other booking requirements"];

const ORG = [
  { icon: I.rules, title: "Availability and booking rules", text: "Define the conditions under which spaces, services or other resources can be reserved." },
  { icon: I.oversight, title: "Reservation oversight", text: "Give staff a way to review booking information and understand the status of reservations." },
  { icon: I.message, title: "Booking communication", text: "Provide visitors with the information they need about their reservations, according to the available communication capabilities." },
  { icon: I.layers, title: "Category-specific requirements", text: "Account for differences between time-slot bookings, space reservations, accommodation stays and scheduled activities." },
];

const INDUSTRIES = ["Office or coworking space", "Religious institution or community center", "Clinic or healthcare practice", "Consulting or professional services", "Hotel, resort or villa operator", "Club, recreation center or event venue", "Other"];
const PROCESSES = ["Phone calls and email", "Spreadsheets or paper records", "A website form", "Existing booking software", "No formal process yet", "Other"];
const TIMEFRAMES = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just exploring"];

/* ---------- hero showcase (conceptual) ----------
   One booking per category, each card showing the detail that matters for that kind of booking:
   a time slot for a room, a provider and slot for an appointment, a date range for a stay,
   participants for a facility. Names and details are illustrative. */
const tileStyle = (i: number) => ({ "--i": i }) as CSSProperties;
const TYPES = [
  { key: "space", label: "Spaces" },
  { key: "appt", label: "Appointments" },
  { key: "stay", label: "Stays" },
  { key: "activity", label: "Facilities" },
] as const;
type TypeKey = (typeof TYPES)[number]["key"];

function HeroShowcase() {
  const [active, setActive] = useState<TypeKey | null>(null);
  const show = useRef<HTMLDivElement>(null);
  const tile = (i: number, key: TypeKey) => ({
    className: `bk-tile${active === key ? " on" : ""}`,
    style: tileStyle(i),
  });
  const choose = (i: number, key: TypeKey) => {
    setActive(key);
    // on phones the tiles are a swipe row: bring the chosen one into view without moving the page
    show.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="bk-show-wrap">
      <div ref={show} className={`bk-show${active ? " has-active" : ""}`}>
        <div {...tile(0, "space")}>
          <figure className="bk-tile-media collage">
            <div className="bk-cell">
              <img src={IMG.room} alt="Meeting room with a long table" loading="eager" />
              <figcaption className="bk-tcard mini">
                <div className="bk-tcard-top"><b>Meeting Room 3</b><span className="bk-badge ok">Confirmed</span></div>
                <small className="bk-tmeta">Thu, 19 Nov · 10:30 – 11:30 AM</small>
              </figcaption>
            </div>
            <div className="bk-cell">
              <img src={IMG.prayer} alt="Quiet prayer and meditation room with floor mats and soft light" loading="eager" />
              <figcaption className="bk-tcard mini">
                <div className="bk-tcard-top"><b>Prayer Room</b><span className="bk-badge ok">Available</span></div>
                <div className="bk-tslots"><span>12:30</span><span className="sel">3:45 PM</span><span>5:30</span></div>
              </figcaption>
            </div>
          </figure>
        </div>

        <div {...tile(1, "appt")}>
          <figure className="bk-tile-media">
            <img src={IMG.clinic} alt="Doctor in a clinic" loading="eager" />
            <figcaption className="bk-tcard">
              <div className="bk-tcard-top"><span className="bk-ttype">{I.appt}Appointment</span></div>
              <b>Physiotherapy consultation</b>
              <small className="bk-tmeta">45 min · Dr. Amara Osei</small>
              <div className="bk-tslots">
                <span>9:15 AM</span><span>10:00 AM</span><span className="sel">11:30 AM</span>
              </div>
            </figcaption>
          </figure>
        </div>

        <div {...tile(2, "stay")}>
          <div className="bk-float tr" aria-hidden>
            <small>Guests</small>
            <div className="bk-stepper"><span>Adults</span><i>−</i><b>2</b><i className="plus">+</i></div>
            <div className="bk-stepper"><span>Children</span><i>−</i><b>1</b><i className="plus">+</i></div>
          </div>
          <figure className="bk-tile-media">
            <img src={IMG.stay} alt="Resort villa beside a pool" loading="eager" />
            <figcaption className="bk-tcard">
              <div className="bk-tcard-top"><span className="bk-ttype">{I.stay}Stay</span><span className="bk-badge warn">Pending</span></div>
              <b>Garden Villa</b>
              <div className="bk-trange">
                <span><small>Check-in</small>Sat, 12 Dec</span>
                <em aria-hidden>{I.arrow}</em>
                <span><small>Check-out</small>Tue, 15 Dec</span>
              </div>
              <small className="bk-tmeta">3 nights · 2 adults, 1 child</small>
            </figcaption>
          </figure>
        </div>

        <div {...tile(3, "activity")}>
          <div className="bk-float br" aria-hidden>
            <span className="bk-mini-tick">{I.check}</span>
            <div><b>Request received</b><small>Court 2 · Sat, 7:00 AM</small></div>
          </div>
          <figure className="bk-tile-media">
            <img src={IMG.court} alt="Tennis court surrounded by trees" loading="eager" />
            <figcaption className="bk-tcard">
              <div className="bk-tcard-top"><span className="bk-ttype">{I.activity}Facility</span><span className="bk-badge ok">Available</span></div>
              <b>Tennis Court 2</b>
              <small className="bk-tmeta">Sat, 21 Nov · 7:00 AM · 60 min</small>
              <div className="bk-tfill"><span><i style={{ width: "50%" }} /></span><small>2 of 4 players</small></div>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="bk-seg" role="group" aria-label="Booking types" onMouseLeave={() => setActive(null)}>
        {TYPES.map((t, i) => (
          <button key={t.key} type="button" aria-pressed={active === t.key} onMouseEnter={() => setActive(t.key)} onFocus={() => setActive(t.key)} onClick={() => choose(i, t.key)}>
            {I[t.key]}{t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- enquiry form ---------- */
type Fields = { name: string; email: string; org: string; website: string; industry: string; category: string; process: string; challenge: string; timeframe: string };
const EMPTY: Fields = { name: "", email: "", org: "", website: "", industry: "", category: "", process: "", challenge: "", timeframe: "" };
const REQUIRED: (keyof Fields)[] = ["name", "email", "org", "industry", "category", "process", "challenge"];

function EnquiryForm({ category, setCategory }: { category: string; setCategory: (v: string) => void }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);
  const v = { ...f, category };
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    if (k === "category") setCategory(e.target.value);
    else setF((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    REQUIRED.forEach((k) => { if (!v[k].trim()) next[k] = "This field is required."; });
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) next.email = "Enter a valid work email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    track("lead_submitted", { source: "bookings_page", category: v.category, industry: v.industry });
    setDone(true);
  };

  if (done)
    return (
      <div className="bk-form bk-form-done" role="status">
        <span className="bk-mini-tick lg">{I.check}</span>
        <h3>Enquiry sent</h3>
        <p>Thank you for sharing your requirements. Our team will review your enquiry and follow up with you.</p>
      </div>
    );

  const field = (k: keyof Fields, label: string, input: ReactNode, optional = false) => (
    <div className={`bk-field${errors[k] ? " err" : ""}`}>
      <label htmlFor={`bk-${k}`}>{label}{optional && <span> (optional)</span>}</label>
      {input}
      {errors[k] && <small id={`bk-${k}-err`}>{errors[k]}</small>}
    </div>
  );
  const a = (k: keyof Fields) => ({ id: `bk-${k}`, value: v[k], onChange: set(k), "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `bk-${k}-err` : undefined });
  const select = (k: keyof Fields, opts: readonly string[]) => (
    <select {...a(k)}><option value="">Select an option</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>
  );

  return (
    <form className="bk-form" onSubmit={submit} noValidate>
      <div className="bk-form-grid">
        {field("name", "Full name", <input {...a("name")} autoComplete="name" />)}
        {field("email", "Work email", <input {...a("email")} type="email" autoComplete="email" />)}
        {field("org", "Organization name", <input {...a("org")} autoComplete="organization" />)}
        {field("website", "Website", <input {...a("website")} type="url" autoComplete="url" placeholder="https://" />, true)}
        {field("industry", "Industry or organization type", select("industry", INDUSTRIES))}
        {field("category", "Booking category", select("category", BOOKING_OPTIONS))}
        {field("process", "Current booking process", select("process", PROCESSES))}
        {field("timeframe", "Implementation timeframe", select("timeframe", TIMEFRAMES), true)}
        <div className="bk-span">{field("challenge", "Main challenge or requirement", <textarea {...a("challenge")} rows={3} placeholder="What do people need to book, and what would you like to improve?" />)}</div>
      </div>
      <button type="submit" className="bk-btn primary">Send Enquiry</button>
    </form>
  );
}

/* ---------- platform: other EVOQ applications ----------
   Descriptions come from the product pages. The small UIs are illustrative. */
const PLATFORM: { key: string; name: string; href: string; text: string; ui: ReactNode; here?: boolean }[] = [
  { key: "bookings", name: "Bookings", href: "#top", here: true, text: "Room reservations, appointments, stays and facility bookings in one product.",
    ui: <div className="bk-pui"><div className="r"><b>Meeting Room 3</b><span className="bk-badge ok">Confirmed</span></div><small>Thu, 19 Nov · 10:30 – 11:30 AM</small></div> },
  { key: "crm", name: "CRM", href: "/products/crm", text: "Track leads, contacts, deals and follow-ups through each stage of the sales process.",
    ui: <div className="bk-pui"><div className="r" style={{ justifyContent: "flex-start", gap: 10 }}><img className="av" src="/healthcare/avatars/sophia.jpg" alt="" /><div style={{ display: "grid" }}><b>Hannah Weber</b><small>Westbridge Labs</small></div><span className="bk-badge ok" style={{ marginLeft: "auto" }}>Qualified</span></div></div> },
  { key: "billing", name: "Billing", href: "/products/billing", text: "Raise invoices, record payments and follow up on what is still outstanding.",
    ui: <div className="bk-pui"><div className="r"><b>INV-2026-0142</b><span className="bk-badge ok">Paid</span></div><div className="r"><small>Due 30 Nov</small><b>1,240.00</b></div></div> },
  { key: "campaigns", name: "Campaigns", href: "/products/campaigns", text: "Plan and launch marketing campaigns to reach and re-engage the right customer segments.",
    ui: <div className="bk-pui"><div className="r"><b>Winter newsletter</b><small>Scheduled</small></div><div className="bars"><i style={{ height: "40%" }} /><i style={{ height: "62%" }} /><i style={{ height: "48%" }} /><i style={{ height: "80%" }} /><i style={{ height: "95%" }} /></div></div> },
  { key: "desk", name: "Desk", href: "/products/desk", text: "Log customer enquiries and service issues as tickets and track each one to resolution.",
    ui: <div className="bk-pui"><div className="r"><b>#1042 Projector not working</b></div><div className="r"><small>Assigned to Facilities</small><span className="bk-badge warn">Open</span></div></div> },
  { key: "sync", name: "Sync", href: "/products/sync", text: "Exchange data between EVOQ applications and your existing systems through supported integrations.",
    ui: <div className="bk-pui"><div className="link"><span>EVOQ</span><s /><span>Your system</span></div><small>Last exchange 2 min ago</small></div> },
  { key: "ai", name: "EVOQ AI", href: "/products/ai", text: "EVI, the AI assistant, and AI agents that prepare defined tasks for your approval.",
    ui: <div className="bk-pui"><div className="bubble">Summarise this week&apos;s open tickets.</div><small>EVI is preparing a summary…</small></div> },
];

function Platform() {
  const track = useRef<HTMLDivElement>(null);
  const move = (dir: number) => track.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section className="bk-out bk-sec" id="platform">
      <div className="bk-in">
        <div className="bk-plat-head" data-rv="0">
          <div>
            <span className="bk-label">The EVOQ platform</span>
            <h2 className="bk-h2">There&apos;s more to bookings than reserving a time.</h2>
            <p className="bk-lead">EVOQ Bookings is part of the EVOQ suite. Use it on its own, or alongside the other EVOQ applications your teams work with.</p>
          </div>
          <div className="bk-plat-nav">
            <button type="button" aria-label="Previous" onClick={() => move(-1)}>{I.arrow}</button>
            <button type="button" aria-label="Next" onClick={() => move(1)}>{I.arrow}</button>
          </div>
        </div>
        <div className="bk-plat-track" ref={track} data-rv="1">
          {PLATFORM.map((p) => (
            <a key={p.key} href={p.href} className={`bk-pcard${p.here ? " here" : ""}`} onClick={(e) => { if (p.here) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>
              <div className="bk-pcard-top">
                {p.here ? <span className="bk-hero-tag" style={{ fontSize: 17 }}><i>{I.rules}</i></span> : <ProductBadge productKey={p.key} size={30} />}
                {p.name}{p.here && <em>You are here</em>}
              </div>
              <div className="bk-pvis">{p.ui}</div>
              <p>{p.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- enquiry pop-up ---------- */
function EnquiryModal({ open, onClose, category, setCategory }: { open: boolean; onClose: () => void; category: string; setCategory: (v: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    box.current?.querySelector<HTMLElement>("input, button")?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="bk-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={box} className="bk-modal-box" role="dialog" aria-modal="true" aria-labelledby="bk-modal-title">
        <button type="button" className="bk-modal-x" onClick={onClose} aria-label="Close">×</button>
        <span className="bk-label">Talk to us</span>
        <h2 id="bk-modal-title" className="bk-modal-title">Let&apos;s discuss your booking requirements.</h2>
        <p className="bk-modal-sub">Tell us what people need to book and what you want to improve.</p>
        <EnquiryForm category={category} setCategory={setCategory} />
      </div>
    </div>
  );
}

/* ---------- page ---------- */
const css = `
  .bk-root{background:${BG};color:${INK};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh}
  .bk-root h1,.bk-root h2,.bk-root h3{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-weight:600;margin:0}
  .bk-out{padding:0 20px}
  .bk-in{max-width:1240px;margin:0 auto}
  .bk-sec{padding-top:112px;padding-bottom:112px}
  .bk-label{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${TERRA}}
  .bk-h1{font-size:48px;line-height:1.08;letter-spacing:-.02em;margin-top:18px!important}
  .bk-h2{font-size:38px;line-height:1.1;letter-spacing:-.02em;text-wrap:balance}
  .bk-lead{font-size:18px;line-height:1.6;color:${MUTED};margin:20px 0 0;max-width:58ch}
  .bk-head{max-width:760px;margin-bottom:56px}
  .bk-head.c{margin-left:auto;margin-right:auto;text-align:center}
  .bk-head.c .bk-lead{margin-left:auto;margin-right:auto}
  .bk-head .bk-label{margin-bottom:16px}

  .bk-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:background .18s ease,border-color .18s ease,color .18s ease}
  .bk-btn:focus-visible,.bk-root button:focus-visible,.bk-root a:focus-visible{outline:2px solid ${SAGE};outline-offset:2px}
  .bk-btn.primary{background:${SAGE};color:#fff}
  .bk-btn.primary:hover:not(:disabled){background:${SAGE_HOVER}}
  .bk-btn.primary:disabled{opacity:.85;cursor:default}
  .bk-btn.secondary{background:transparent;color:${TERRA};border-color:${TERRA}}
  .bk-btn.secondary:hover{background:rgba(200,120,90,.08)}
  .bk-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
  .bk-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:${TERRA};text-decoration:none;background:none;border:0;padding:0;cursor:pointer}
  .bk-link:hover{gap:9px}

  .bk-badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap}
  .bk-badge.ok{background:rgba(22,138,74,.1);color:${OK}}
  .bk-badge.warn{background:rgba(217,119,6,.12);color:#A35A04}
  .bk-badge.off{background:rgba(104,114,128,.12);color:${NEUTRAL}}

  /* hero */
  .bk-hero{padding:4px 16px 0}
  .bk-hero-band{position:relative;border-radius:28px;background:${HERO_GRADIENT};padding:88px 20px 0;overflow:hidden}
  /* gentle supporting shapes, kept behind the content */
  .bk-shape{position:absolute;pointer-events:none;z-index:0}
  .bk-shape.ring{top:-90px;right:7%;width:300px;height:300px;border-radius:50%;border:1.5px solid ${TERRA};opacity:.22}
  .bk-shape.ring.sm{top:auto;right:auto;bottom:22%;left:4%;width:120px;height:120px;border-color:${SAGE};opacity:.3}
  .bk-shape.disc{bottom:-140px;left:-90px;width:360px;height:360px;border-radius:50%;background:${SAGE};opacity:.09}
  .bk-shape.sun{top:120px;left:12%;width:64px;height:64px;border-radius:50%;background:${SAND};opacity:.45}
  .bk-shape.dots{top:96px;right:14%;width:96px;height:72px;background-image:radial-gradient(${TERRA} 1.4px,transparent 1.6px);background-size:16px 16px;opacity:.3}
  .bk-hero-plan{position:absolute;left:50%;bottom:-120px;width:min(1240px,120%);height:auto;transform:translateX(-50%);opacity:.16;pointer-events:none;z-index:0;-webkit-mask-image:linear-gradient(transparent 0%,#000 45%);mask-image:linear-gradient(transparent 0%,#000 45%)}
  .bk-shape.arc{bottom:120px;right:-60px;width:220px;height:110px;border-radius:220px 220px 0 0;border:1.5px solid ${SAND};border-bottom:0;opacity:.7}
  .bk-hero-panel{position:relative;z-index:1;max-width:1240px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center}
  .bk-hero-copy{max-width:860px;display:flex;flex-direction:column;align-items:center}
  .bk-hero-tag{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:18px;font-weight:600;color:${DEEP}}
  .bk-hero-tag i{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:${SAGE};color:#fff}
  .bk-hero-copy .bk-h1{margin-top:22px!important}
  .bk-hero-copy .bk-lead{margin-left:auto;margin-right:auto;color:${INK}}
  .bk-hero-copy .bk-ctas{justify-content:center}
  .bk-hero .bk-btn.secondary{background:rgba(255,255,255,.55)}
  .bk-hero .bk-btn.secondary:hover{background:#fff}
  .bk-show-wrap{width:100%;margin-top:64px;padding-bottom:56px;display:flex;flex-direction:column;align-items:center}
  .bk-show{width:100%;max-width:1160px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;align-items:start;text-align:left}
  .bk-tile{position:relative;animation:bkRise .8s cubic-bezier(.2,.7,.2,1) backwards;animation-delay:calc(var(--i) * 110ms + 150ms);transition:transform .35s ease,opacity .3s ease,filter .3s ease}
  .bk-tile:nth-child(1){margin-top:0}.bk-tile:nth-child(3){margin-top:22px}.bk-tile:nth-child(4){margin-top:60px}
  .bk-tile:hover,.bk-tile.on{transform:translateY(-8px)}
  .bk-show.has-active .bk-tile:not(.on){opacity:.5;filter:saturate(.55)}
  .bk-tile-media{position:relative;margin:0;height:400px;border-radius:16px;overflow:hidden;background:${SAND};box-shadow:0 30px 50px -36px rgba(38,51,43,.55)}
  .bk-tile-media img{display:block;width:100%;height:100%;object-fit:cover}
  .bk-tile-media.collage{height:470px;display:grid;grid-template-rows:1fr 1fr;gap:8px;background:transparent;box-shadow:none;overflow:visible}
  .bk-tile-media.collage::after{display:none}
  .bk-cell{position:relative;border-radius:16px;overflow:hidden;background:${SAND};box-shadow:0 30px 50px -36px rgba(38,51,43,.55)}
  .bk-cell::after{content:"";position:absolute;inset:40% 0 0;background:linear-gradient(transparent,rgba(38,51,43,.35));pointer-events:none}
  .bk-tcard.mini{left:10px;right:10px;bottom:10px;gap:6px;padding:9px 11px}
  .bk-tcard.mini b{font-size:14px}
  .bk-tcard.mini .bk-tslots span{padding:4px 0;font-size:11.5px}
  .bk-tile-media::after{content:"";position:absolute;inset:45% 0 0;background:linear-gradient(transparent,rgba(38,51,43,.35));pointer-events:none}
  .bk-float{position:absolute;z-index:2;padding:12px 14px;border-radius:12px;background:#fff;box-shadow:0 18px 36px -20px rgba(38,51,43,.5);animation:bkRise .8s cubic-bezier(.2,.7,.2,1) backwards,bkBob 6s ease-in-out infinite alternate;animation-delay:calc(var(--i) * 110ms + 650ms),calc(var(--i) * 700ms + 1.6s)}
  .bk-float small{display:block;font-size:11.5px;font-weight:600;color:${MUTED}}
  .bk-float.tl{top:-40px;left:-26px;width:226px}
  .bk-fhead{display:flex;align-items:center;gap:9px}
  .bk-fhead i{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:rgba(200,120,90,.12);color:${TERRA}}
  .bk-fhead i svg{width:16px;height:16px}
  .bk-fhead b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;color:${DEEP}}
  .bk-fhead small{font-weight:400!important}
  .bk-float.tr{top:-34px;right:-22px;width:186px;display:grid;gap:7px}
  .bk-float.br{top:-30px;right:-20px;display:flex;align-items:center;gap:10px;padding:10px 14px 10px 10px}
  .bk-float.br b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:13.5px;color:${DEEP}}
  .bk-float.br small{font-weight:400}
  .bk-fslots{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;margin-top:8px}
  .bk-fslots span{text-align:center;padding:5px 0;border-radius:6px;font-size:11.5px;font-weight:600}
  .bk-fslots .ok{background:rgba(100,133,109,.12);color:${DEEP}}
  .bk-fslots .sel{background:${SAGE};color:#fff}
  .bk-fslots .off{background:${BG};color:#A6ACA5;text-decoration:line-through}
  .bk-stepper{display:grid;grid-template-columns:1fr 22px 18px 22px;align-items:center;gap:4px;font-size:12.5px;color:${INK}}
  .bk-stepper i{display:flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;border:1px solid ${LINE};font-style:normal;color:${MUTED}}
  .bk-stepper i.plus{border-color:${SAGE};color:${SAGE}}
  .bk-stepper b{text-align:center;font-size:13px}
  .bk-seg{display:inline-flex;flex-wrap:wrap;justify-content:center;gap:4px;margin-top:44px;padding:5px;border-radius:12px;background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.9);box-shadow:0 10px 24px -18px rgba(38,51,43,.4)}
  .bk-seg button{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 16px;border:0;border-radius:8px;background:transparent;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${INK};cursor:pointer;transition:background .18s ease,color .18s ease}
  .bk-seg button svg{width:17px;height:17px;color:${TERRA}}
  .bk-seg button:hover,.bk-seg button[aria-pressed="true"]{background:${SAGE};color:#fff}
  .bk-seg button:hover svg,.bk-seg button[aria-pressed="true"] svg{color:#fff}
  .bk-tcard{position:absolute;left:12px;right:12px;bottom:12px;z-index:1;display:grid;gap:8px;padding:14px;border-radius:12px;background:#fff;box-shadow:0 14px 28px -18px rgba(38,51,43,.5)}
  .bk-tcard-top{display:flex;justify-content:space-between;align-items:center;gap:8px;min-height:22px}
  .bk-ttype{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;color:${TERRA}}
  .bk-ttype svg{width:15px;height:15px}
  .bk-tcard b{font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600;line-height:1.3;color:${DEEP}}
  .bk-tmeta{font-size:12.5px;color:${MUTED}}
  .bk-trows{display:grid;gap:5px}
  .bk-trows span{display:flex;align-items:center;gap:7px;font-size:12.5px;color:${INK}}
  .bk-trows i{display:inline-flex;color:${SAGE}}
  .bk-tslots{display:flex;gap:6px}
  .bk-tslots span{flex:1;text-align:center;padding:6px 0;border-radius:8px;border:1px solid ${LINE};font-size:12px;font-weight:500;color:${INK};white-space:nowrap}
  .bk-tslots .sel{background:${SAGE};border-color:${SAGE};color:#fff}
  .bk-trange{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px}
  .bk-trange span{display:grid;padding:6px 8px;border-radius:8px;background:${BG};font-size:12.5px;font-weight:600;color:${INK}}
  .bk-trange small{font-size:11px;font-weight:500;color:${MUTED}}
  .bk-trange em{display:inline-flex;color:${TERRA}}
  .bk-tfill{display:flex;align-items:center;gap:10px}
  .bk-tfill span{flex:1;height:6px;border-radius:3px;background:${LINE};overflow:hidden}
  .bk-tfill i{display:block;height:100%;background:${SAGE};border-radius:3px}
  .bk-tfill small{font-size:12px;color:${MUTED};white-space:nowrap}
  @keyframes bkBob{from{transform:translateY(0)}to{transform:translateY(-8px)}}
  @keyframes bkFlow{to{stroke-dashoffset:-16}}
  @keyframes bkRise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.bk-tile,.bk-float,.bk-merge>svg path{animation:none}}

  /* intro */
  .bk-intro{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:64px;padding:64px;border-radius:16px;background:#fff;border:1px solid ${LINE}}
  .bk-intro p{margin:0 0 16px;font-size:17px;color:${MUTED}}
  .bk-intro p:last-of-type{margin:0}
  .bk-intro{align-items:start}
  .bk-merge{position:relative;margin-top:36px;padding:22px 20px 20px;border-radius:12px;background:${BG};overflow:hidden}
  .bk-merge::before{content:"";position:absolute;top:-36px;right:-36px;width:110px;height:110px;border-radius:50%;border:1.5px solid ${SAND};opacity:.8}
  .bk-merge-top{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
  .bk-merge-top span{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;padding:0 10px;border-radius:999px;background:#fff;border:1px solid ${LINE};font-size:13px;font-weight:600;color:${INK};white-space:nowrap}
  .bk-merge-top svg{width:16px;height:16px;color:${TERRA};flex-shrink:0}
  .bk-merge>svg{display:block;width:100%;height:44px;fill:none;stroke:#C9CEC6;stroke-width:1.5;stroke-dasharray:4 4;vector-effect:non-scaling-stroke}
  .bk-merge>svg path{vector-effect:non-scaling-stroke;animation:bkFlow 1.2s linear infinite}
  .bk-merge-base{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;width:fit-content;margin:0 auto;padding:8px 16px 8px 8px;border-radius:999px;background:#fff;box-shadow:0 12px 24px -18px rgba(38,51,43,.5)}
  .bk-merge-base i{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${SAGE};color:#fff}
  .bk-merge-base i svg{width:16px;height:16px}
  .bk-merge-base b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP};white-space:nowrap}
  .bk-merge-base small{font-size:12.5px;color:${MUTED};white-space:nowrap}
  .bk-rules{margin-top:32px;border:1px solid ${LINE};border-radius:12px;overflow:hidden}
  .bk-rules-head{display:flex;justify-content:space-between;padding:10px 16px;background:${BG};font-size:12px;font-weight:600;color:${MUTED}}
  .bk-rules-head b{font-weight:600}
  .bk-rule{display:grid;grid-template-columns:36px minmax(0,1fr) auto;align-items:center;gap:12px;padding:12px 16px;border-top:1px solid ${LINE};background:#fff}
  .bk-rule i{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:rgba(200,120,90,.1);color:${TERRA}}
  .bk-rule span{display:grid;min-width:0}
  .bk-rule b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;color:${INK}}
  .bk-rule small{font-size:13px;color:${MUTED}}
  .bk-rule em{font-style:normal;padding:4px 10px;border-radius:999px;background:rgba(100,133,109,.12);font-size:12.5px;font-weight:600;color:${DEEP};white-space:nowrap}

  .bk-mini-tick{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(22,138,74,.1);color:${OK}}
  .bk-mini-tick.lg{width:52px;height:52px}

  /* organizations */
  .bk-org{background:rgba(100,133,109,.09)}
  .bk-org-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:64px;align-items:end;margin-bottom:56px}
  .bk-org-head p{margin:0 0 14px;font-size:17px;color:${MUTED}}
  .bk-org-head p:last-child{margin:0}
  .bk-org-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
  .bk-org-card{position:relative;padding:4px 24px 8px;border-left:1px solid rgba(52,72,59,.14)}
  .bk-org-card::before{content:"";position:absolute;left:-1px;top:0;width:2px;height:0;background:${SAGE};transition:height .5s cubic-bezier(.2,.7,.2,1)}
  .bk-org-card:hover::before{height:100%}
  .bk-org-ico{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:#fff;color:${DEEP};box-shadow:0 10px 22px -16px rgba(38,51,43,.5);transition:background .3s ease,color .3s ease,transform .3s ease}
  .bk-org-card:hover .bk-org-ico{background:${SAGE};color:#fff;transform:translateY(-3px)}
  .bk-org-card h3{margin-top:20px!important;font-size:18px;line-height:1.35;min-height:calc(2em * 1.35)}
  .bk-org-card p{margin:8px 0 0;font-size:15px;color:${MUTED}}

  /* who is it for */
  .bk-who{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:64px;align-items:center}
  .bk-who-vis{position:relative;padding:0 0 64px 56px}
  .bk-who-plan{position:absolute;left:0;top:56px;width:72%;padding:16px;border-radius:18px;background:#fff;border:1px solid ${LINE}}
  .bk-who-plan svg{display:block;width:100%;height:auto}
  .bk-who-img{position:relative;z-index:1;width:78%;margin-left:auto;aspect-ratio:1/1;border-radius:18px;overflow:hidden;box-shadow:0 34px 60px -40px rgba(38,51,43,.6)}
  .bk-who-img img{display:block;width:100%;height:100%;object-fit:cover;object-position:62% center}
  .bk-who-card{position:absolute;z-index:2;left:0;bottom:0;width:270px;display:grid;gap:8px;padding:14px;border-radius:14px;background:#fff;box-shadow:0 26px 50px -26px rgba(38,51,43,.55)}
  .bk-who-card>b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;color:${DEEP}}
  .bk-who-row{display:grid;grid-template-columns:30px minmax(0,1fr) auto;align-items:center;gap:9px}
  .bk-who-row i{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:rgba(100,133,109,.12);color:${DEEP}}
  .bk-who-row i svg{width:15px;height:15px}
  .bk-who-row span{display:grid;min-width:0}
  .bk-who-row span b{font-size:13px;font-weight:600;color:${INK}}
  .bk-who-row span small{font-size:11.5px;color:${MUTED}}
  .bk-who-row em{font-style:normal}
  .bk-who ul{list-style:none;margin:32px 0 0;padding:0;display:grid;gap:10px}
  .bk-who li{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid ${LINE};font-size:15.5px;font-weight:500;color:${INK}}
  .bk-who li:first-child{border-top:1px solid ${LINE}}
  .bk-who li i{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:rgba(200,120,90,.1);color:${TERRA};flex-shrink:0}
  .bk-who ul{gap:0!important}

  /* platform: the rest of the EVOQ suite (Calendly "platform" pattern) */
  .bk-plat-head{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;margin-bottom:40px}
  .bk-plat-head .bk-label{margin-bottom:14px}
  .bk-plat-head .bk-lead{margin-top:14px}
  .bk-plat-nav{display:flex;gap:10px;flex-shrink:0}
  .bk-plat-nav button{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;border:1px solid #D6DAD3;background:#fff;color:${DEEP};cursor:pointer;transition:background .18s ease,border-color .18s ease,color .18s ease}
  .bk-plat-nav button:hover{background:${SAGE};border-color:${SAGE};color:#fff}
  .bk-plat-nav button:first-child svg{transform:rotate(180deg)}
  .bk-plat-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px 2px 12px}
  .bk-plat-track::-webkit-scrollbar{display:none}
  .bk-pcard{flex:0 0 300px;scroll-snap-align:start;display:flex;flex-direction:column;text-decoration:none;color:inherit}
  .bk-pcard-top{display:flex;align-items:center;gap:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:600;color:${DEEP}}
  .bk-pcard-top em{margin-left:auto;font-style:normal;padding:3px 9px;border-radius:999px;background:${SAGE};font-size:11.5px;font-weight:600;color:#fff}
  .bk-pvis{position:relative;display:flex;align-items:center;justify-content:center;height:190px;margin-top:14px;border-radius:16px;overflow:hidden;transition:transform .35s ease}
  .bk-pcard:hover .bk-pvis{transform:translateY(-4px)}
  .bk-pcard:nth-child(3n+1) .bk-pvis{background:rgba(100,133,109,.13)}
  .bk-pcard:nth-child(3n+2) .bk-pvis{background:rgba(217,185,140,.28)}
  .bk-pcard:nth-child(3n) .bk-pvis{background:rgba(200,120,90,.13)}
  .bk-pcard.here .bk-pvis{box-shadow:inset 0 0 0 2px ${SAGE}}
  .bk-pui{width:82%;padding:12px;border-radius:12px;background:#fff;box-shadow:0 16px 30px -20px rgba(38,51,43,.5);display:grid;gap:7px;font-size:12.5px;color:${INK}}
  .bk-pui b{font-size:13px;font-weight:600}
  .bk-pui small{font-size:11.5px;color:${MUTED}}
  .bk-pui .r{display:flex;align-items:center;justify-content:space-between;gap:8px}
  .bk-pui .av{width:28px;height:28px;border-radius:50%;object-fit:cover}
  .bk-pui .bars{display:flex;align-items:flex-end;gap:5px;height:34px}
  .bk-pui .bars i{flex:1;border-radius:3px 3px 0 0;background:rgba(100,133,109,.35)}
  .bk-pui .bars i:last-child{background:${SAGE}}
  .bk-pui .link{display:flex;align-items:center;gap:6px}
  .bk-pui .link span{padding:5px 9px;border-radius:8px;background:${BG};font-weight:600}
  .bk-pui .link s{flex:1;height:0;border-top:1.5px dashed #C9CEC6}
  .bk-pui .bubble{padding:8px 10px;border-radius:10px 10px 10px 2px;background:${BG}}
  .bk-pcard p{margin:14px 0 0;font-size:14.5px;line-height:1.6;color:${MUTED}}
  .bk-pcard p b{color:${INK};font-weight:600}
  /* enquiry */
  .bk-enq{padding:0 20px 112px}
  .bk-enq-band{position:relative;overflow:hidden;max-width:1000px;margin:0 auto;border-radius:28px;background:${HERO_GRADIENT};padding:72px 32px;text-align:center}
  .bk-enq-band .bk-shape.ring{top:auto;bottom:-140px;right:auto;left:-80px;width:320px;height:320px}
  .bk-enq-band .bk-shape.dots{top:48px;right:10%}
  .bk-enq-band .bk-shape.sun{top:auto;bottom:56px;left:auto;right:16%}
  .bk-enq-in{position:relative;z-index:1;max-width:720px;margin:0 auto;display:flex;flex-direction:column;align-items:center}
  .bk-enq-in .bk-label{margin-bottom:16px}
  .bk-enq-in p{margin:18px 0 0;font-size:17px;color:${INK};max-width:60ch}
  .bk-enq-in .bk-ctas{justify-content:center;margin-top:30px}

  .bk-modal{position:fixed;inset:0;z-index:200;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px;overflow-y:auto;background:rgba(38,51,43,.45);backdrop-filter:blur(3px);animation:bkFade .25s ease both}
  .bk-modal-box{position:relative;width:100%;max-width:640px;margin:auto;padding:28px 28px 24px;border-radius:18px;background:#fff;box-shadow:0 40px 90px -40px rgba(38,51,43,.6);animation:bkUp .35s cubic-bezier(.2,.7,.2,1) both}
  .bk-modal-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:1px solid ${LINE};background:#fff;font-size:22px;line-height:1;color:${MUTED};cursor:pointer;transition:background .18s ease,color .18s ease}
  .bk-modal-x:hover{background:${BG};color:${INK}}
  .bk-modal-title{margin-top:8px!important;font-size:24px;line-height:1.2;letter-spacing:-.01em;padding-right:44px}
  .bk-modal-sub{margin:6px 0 18px;font-size:14.5px;line-height:1.55;color:${MUTED}}
  .bk-modal .bk-field label{font-size:13.5px}
  .bk-modal .bk-label{font-size:12px}
  .bk-modal .bk-form{padding:0;box-shadow:none;border-radius:0}
  .bk-modal .bk-form-head{display:none}
  @keyframes bkFade{from{opacity:0}to{opacity:1}}
  @keyframes bkUp{from{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.bk-modal,.bk-modal-box{animation:none}}
  .bk-form{padding:32px;border-radius:20px;background:#fff;box-shadow:0 40px 80px -48px rgba(38,51,43,.55)}
  .bk-form-head{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px 16px;margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid ${LINE}}
  .bk-form-head b{font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:600;color:${DEEP}}
  .bk-form-head small{font-size:13px;color:${MUTED}}
  .bk-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 14px;margin-bottom:20px;align-items:end}
  .bk-span{grid-column:1/-1}
  .bk-field{display:grid;gap:6px;align-content:start}
  .bk-field label{font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:500;color:${INK}}
  .bk-field label span{color:${MUTED};font-weight:400}
  .bk-field input,.bk-field select,.bk-field textarea{width:100%;min-height:44px;padding:9px 12px;border-radius:8px;border:1px solid #D6DAD3;background:#fff;font:inherit;font-size:15px;color:${INK};transition:border-color .15s ease,box-shadow .15s ease}
  .bk-field textarea{resize:vertical;min-height:84px}
  .bk-field input:focus,.bk-field select:focus,.bk-field textarea:focus{outline:none;border-color:${SAGE};box-shadow:0 0 0 3px rgba(100,133,109,.18)}
  .bk-field.err input,.bk-field.err select,.bk-field.err textarea{border-color:${ERR}}
  .bk-field small{font-size:13px;color:${ERR}}
  .bk-form .bk-btn{width:100%}
  .bk-form-done{text-align:center;padding:64px 32px;display:grid;justify-items:center;gap:12px}
  .bk-form-done h3{font-size:22px}
  .bk-form-done p{margin:0;max-width:40ch;color:${MUTED}}

  @media (max-width:1100px){
    .bk-hero-band{padding-top:72px}
    .bk-show{grid-template-columns:repeat(2,minmax(0,1fr));max-width:720px}
    .bk-show{row-gap:56px}
    .bk-tile-media,.bk-tile-media.collage{height:360px}
    .bk-tile:nth-child(n){margin-top:0}
    .bk-float.tl{left:-12px}.bk-float.tr,.bk-float.br{right:-10px}
    .bk-org-grid{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:36px}
    .bk-intro,.bk-org-head,.bk-enq-grid{grid-template-columns:1fr;gap:28px}
  }
  @media (max-width:860px){
    .bk-show{display:flex;max-width:none;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -14px;padding:4px 14px 12px;width:calc(100% + 28px)}
    .bk-show::-webkit-scrollbar{display:none}
    .bk-tile{flex:0 0 min(78%,300px);scroll-snap-align:center}
    .bk-tile-media,.bk-tile-media.collage{height:400px}
    .bk-tcard.mini{padding:8px 10px}
    .bk-float.tl,.bk-float.tr,.bk-float.br{top:12px;right:12px;left:auto}
    .bk-float.tl{left:12px;right:auto}
    .bk-show.has-active .bk-tile:not(.on){opacity:1;filter:none}
    .bk-seg{margin-top:24px}
    .bk-seg button{padding:0 12px;font-size:13px}
    .bk-who{grid-template-columns:1fr;gap:36px}
    .bk-plat-head{flex-direction:column;align-items:flex-start}
    .bk-pcard{flex-basis:78%}
    .bk-who-vis{max-width:560px;margin:0 auto;width:100%}
  }
  @media (max-width:640px){
    .bk-sec{padding-top:72px;padding-bottom:72px}
    .bk-h1{font-size:36px}
    .bk-h2{font-size:30px}
    .bk-lead{font-size:17px}
    .bk-hero{padding:4px 10px 0}
    .bk-hero-band{border-radius:20px;padding:48px 14px 0}
    .bk-show-wrap{margin-top:40px;padding-bottom:32px}
    .bk-ctas{width:100%}
    .bk-ctas .bk-btn{width:100%}
    .bk-intro{padding:32px 22px}
    .bk-merge-top span{font-size:12px;padding:0 6px;gap:5px}
    .bk-merge-top svg{display:none}
    .bk-shape.ring{width:200px;height:200px;right:-60px}
    .bk-shape.dots,.bk-shape.arc,.bk-shape.ring.sm{display:none}
    .bk-shape.sun{top:60px;left:-20px}
    .bk-org-grid{grid-template-columns:1fr;row-gap:28px}
    .bk-who-vis{padding:0 0 120px}
    .bk-who-img{width:86%}
    .bk-who-plan{top:40px;width:80%;padding:10px}
    .bk-who-card{width:240px}
    .bk-org-card h3{min-height:0}
    .bk-enq{padding:0 12px 72px}
    .bk-enq-band{border-radius:20px;padding:56px 18px}
    .bk-modal{padding:12px 10px}
    .bk-modal-box{padding:28px 18px 22px;border-radius:16px}
    .bk-modal-title{font-size:21px}
    .bk-form{padding:22px 18px}
    .bk-form-grid{grid-template-columns:1fr}
  }
  .hs-rv{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
  .hs-rv.hs-in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.hs-rv{transition:none;opacity:1;transform:none}}
`;

const Wrap = ({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`bk-out ${className}`}><div className="bk-in">{children}</div></section>
);

export function BookingsPage() {
  const [category, setCategory] = useState("");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const toEnquiry = (option?: string, from = "bookings") => {
    if (option) setCategory(option);
    trackCta("discuss_requirements", from);
    setEnquiryOpen(true);
  };
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  return (
    <div className="bk-root hs-root">
      <style>{css}</style>
      <HsMotion />
      <Topbar darkCTA={false} light ctaColor={SAGE} />

      <main>
        {/* 01 hero: inset gradient panel */}
        <section className="bk-hero">
          <div className="bk-hero-band">
            <span className="bk-shape disc" aria-hidden /><span className="bk-shape ring" aria-hidden /><span className="bk-shape ring sm" aria-hidden />
            <span className="bk-shape sun" aria-hidden />
            <FloorPlan className="bk-hero-plan" labels={false} paper="transparent" />
            <div className="bk-hero-panel">
            <div className="bk-hero-copy">
              <span className="bk-hero-tag"><i>{I.rules}</i>EVOQ Bookings</span>
              <h1 className="bk-h1">One booking system for rooms, appointments, stays and facilities.</h1>
              <p className="bk-lead">From reserving rooms and shared spaces to scheduling appointments, booking accommodation and accessing facilities, EVOQ Bookings brings different reservation needs under one product.</p>
              <div className="bk-ctas">
                <a href="#enquiry" className="bk-btn primary" onClick={(e) => { e.preventDefault(); toEnquiry(undefined, "bookings_hero"); }}>Discuss Your Requirements</a>
                <a href="#booking-types" className="bk-btn secondary" onClick={() => trackCta("explore_booking_types", "bookings_hero")}>Explore Booking Types</a>
              </div>
            </div>
            <HeroShowcase />
          </div></div>
        </section>

        {/* 02 introduction */}
        <Wrap className="bk-sec">
          <div className="bk-intro" data-rv="0">
            <div>
              <h2 className="bk-h2">Different booking needs. One product direction.</h2>
              <div className="bk-rules" aria-label="How each example is booked">
                <div className="bk-rules-head"><b>What is being booked</b><span>Booked by</span></div>
                {[
                  [I.space, "Meeting room", "1 hour · 8 seats", "Time slot"],
                  [I.appt, "Consultation", "45 min · with a provider", "Appointment"],
                  [I.stay, "Resort stay", "3 nights · 2 guests", "Date range"],
                ].map(([icon, name, meta, by]) => (
                  <div key={name as string} className="bk-rule">
                    <i>{icon}</i>
                    <span><b>{name}</b><small>{meta}</small></span>
                    <em>{by}</em>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p>A meeting room, a medical consultation and a resort stay each require a different booking experience. The resource, availability rules and information required for a reservation depend on what is being booked.</p>
              <p>EVOQ Bookings brings these scenarios into a shared product concept, with room for booking experiences to address the requirements of different organizations and industries.</p>
              <div className="bk-merge" aria-hidden>
                <div className="bk-merge-top">
                  <span>{I.space}Time slot</span><span>{I.appt}Appointment</span><span>{I.stay}Date range</span>
                </div>
                <svg viewBox="0 0 300 44" preserveAspectRatio="none"><path d="M50 0 C50 26 150 18 150 44M150 0V44M250 0 C250 26 150 18 150 44" /></svg>
                <div className="bk-merge-base"><i>{I.rules}</i><b>EVOQ Bookings</b><small>One product</small></div>
              </div>
            </div>
          </div>
        </Wrap>

        {/* 03 booking categories: pinned, opens one after another on scroll */}
        <BookingCategories onDiscuss={(o, k) => toEnquiry(o, `bookings_category_${k}`)} />

        {/* 04 how booking works: pinned stepper */}
        <BookingSteps />

        {/* 05 for organizations */}
        <Wrap className="bk-sec bk-org" id="for-organizations">
          <div className="bk-org-head" data-rv="0">
            <div>
              <span className="bk-label" style={{ marginBottom: 16 }}>For organizations</span>
              <h2 className="bk-h2">Keep reservations visible and organized.</h2>
            </div>
            <div>
              <p>Accepting a booking is only one part of the process. Organizations also need to understand what has been requested, which reservations are confirmed and how availability is allocated.</p>
              <p>EVOQ Bookings is intended to provide a shared foundation for booking administration, with the specific requirements determined by each booking category.</p>
            </div>
          </div>
          <div className="bk-org-grid">
            {ORG.map((o, i) => (
              <div key={o.title} className="bk-org-card" data-rv={i}>
                <span className="bk-org-ico">{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        </Wrap>

        {/* 06 who is it for */}
        <Wrap className="bk-sec" id="who-is-it-for">
          <div className="bk-who">
            <div className="bk-who-vis" data-rv="0">
              <div className="bk-who-plan"><FloorPlan states={{ d: "sel", a: "free", e: "busy" }} /></div>
              <div className="bk-who-img"><img src={IMG.panel} alt="Glass-walled meeting room with a whiteboard full of notes and a view of the city" loading="lazy" /></div>
              <div className="bk-who-card">
                <b>Today</b>
                {[[I.space, "Prayer Room", "1:00 PM", "ok", "Confirmed"], [I.appt, "Consultation", "2:30 PM", "ok", "Confirmed"], [I.stay, "Garden Suite", "Check-in 3:00 PM", "warn", "Pending"], [I.activity, "Court 2", "6:00 PM", "ok", "Confirmed"]].map(([ic, a, b, c, d], i) => (
                  <div key={i} className="bk-who-row"><i>{ic}</i><span><b>{a}</b><small>{b}</small></span><em className={`bk-badge ${c}`}>{d}</em></div>
                ))}
              </div>
            </div>
            <div data-rv="1">
              <span className="bk-label" style={{ marginBottom: 16 }}>Who is it for?</span>
              <h2 className="bk-h2">What do you need people to book?</h2>
              <p className="bk-lead">Every organization handles reservations differently. Tell us what you offer, how people book today and where the process needs improvement.</p>
              <ul aria-label="Booking categories">
                {BOOKING_OPTIONS.map((o, i) => (
                  <li key={o}><i>{[I.space, I.appt, I.stay, I.activity, I.other][i]}</i>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>

        {/* 07 the rest of the EVOQ suite */}
        <Platform />

        {/* 08 enquiry: short CTA, the form opens as a pop-up */}
        <section className="bk-enq" id="enquiry">
          <div className="bk-enq-band" data-rv="0">
            <span className="bk-shape ring" aria-hidden /><span className="bk-shape dots" aria-hidden /><span className="bk-shape sun" aria-hidden />
            <div className="bk-enq-in">
              <span className="bk-label">Talk to us</span>
              <h2 className="bk-h2">Let&apos;s discuss your booking requirements.</h2>
              <p>Whether you manage shared spaces, schedule appointments, operate accommodation or offer bookable facilities, the right booking approach starts with understanding your requirements.</p>
              <div className="bk-ctas">
                <button type="button" className="bk-btn primary" onClick={() => toEnquiry(undefined, "bookings_cta")}>Discuss Your Requirements</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer background={DEEP} />
      <EnquiryModal open={enquiryOpen} onClose={closeEnquiry} category={category} setCategory={setCategory} />
    </div>
  );
}
