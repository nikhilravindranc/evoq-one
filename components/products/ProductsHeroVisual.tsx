"use client";

import { useEffect, useRef, useState } from "react";

/* Products hero visual: a real person asks EVI a question in a command palette,
   the product windows that hold the answer come forward, and the matching icons
   lift in the product dock. Three scenes cycle; reduced motion shows scene one. */

const P = "#4747E0";
const DEEP = "#1A1190";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";
const I = (f: string) => `/billing/images/${f}`;

type Tone = "red" | "amber" | "green" | "indigo";
const TONE: Record<Tone, [string, string]> = { red: ["#FDECEC", "#B42318"], amber: ["#FEF3DC", "#93600B"], green: ["#E6F6EE", "#137A48"], indigo: ["#EEEDFE", "#3C3489"] };

type Win = { name: string; icon: string; rows: [string, string, Tone, string][] };
const WINDOWS: Win[] = [
  { name: "Billing", icon: I("billing-menu-icn.png"), rows: [["INV-2291", "Acme Ltd", "red", "Overdue"], ["INV-2292", "Northwind", "amber", "Due in 5 days"], ["INV-2293", "Globex", "green", "Paid"]] },
  { name: "CRM", icon: I("crm-menu-icn.png"), rows: [["Acme Ltd", "Renewal", "indigo", "Open"], ["Northwind", "Proposal", "amber", "Sent"], ["Globex", "Expansion", "green", "Won"]] },
  { name: "ServiceOps", icon: I("serviceops-icon.svg"), rows: [["WO-1042", "Pump service", "indigo", "En route"], ["WO-1043", "Valve repair", "red", "Waiting on part"], ["WO-1044", "Inspection", "green", "Completed"]] },
  { name: "Inventory", icon: I("inventory-menu-icn.png"), rows: [["V-20", "Valve kit", "red", "2 left"], ["F-11", "Filter", "green", "40 left"], ["P-3", "Pump", "amber", "8 left"]] },
  { name: "Projects", icon: I("evoq-projects-menu-icn.png"), rows: [["Riverside fit-out", "Phase 2", "red", "Short 2 people"], ["Harbor office", "Phase 1", "green", "On track"], ["Lakeview", "Handover", "amber", "Review"]] },
  { name: "HRMS", icon: I("hrms-menu-icn-new.png"), rows: [["Rahul S.", "Engineer", "green", "Free from Mon"], ["Sana K.", "Engineer", "green", "Free from Mon"], ["Dev M.", "Site lead", "amber", "On leave"]] },
];

type Scene = { photo: string; pos: string; person: string; role: string; initials: string; query: string; results: [string, string][]; answer: string; windows: [string, string, string] };
const SCENES: Scene[] = [
  { photo: "/finance/desk.jpg", pos: "50% 30%", person: "Priya", role: "Finance lead", initials: "PR", query: "Overdue invoices this week", results: [["Billing", "2 invoices overdue, ₹4.8L in total"], ["CRM", "Acme Ltd has a renewal open"]], answer: "Acme's renewal is open. Send a payment reminder before Thursday's call?", windows: ["Billing", "CRM", "ServiceOps"] },
  { photo: "/products/people-service.jpg", pos: "50% 34%", person: "Arjun", role: "Service manager", initials: "AR", query: "Work orders at risk today", results: [["ServiceOps", "WO-1043 is waiting on a part"], ["Inventory", "Valve kit V-20: only 2 left"]], answer: "Reserve a valve kit for WO-1043 and notify the technician?", windows: ["ServiceOps", "Inventory", "Projects"] },
  { photo: "/team/ops-center.jpg", pos: "30% 30%", person: "Meera", role: "Projects lead", initials: "ME", query: "Projects short on people next week", results: [["Projects", "Riverside fit-out needs 2 more people"], ["HRMS", "Rahul and Sana are free from Monday"]], answer: "Assign Rahul and Sana to Riverside fit-out from Monday?", windows: ["Projects", "HRMS", "Billing"] },
];

const DOCK: { name: string; icon: string }[] = [
  { name: "CRM", icon: I("crm-menu-icn.png") }, { name: "Campaigns", icon: I("campaigns-menu-icn.png") }, { name: "ConfigX", icon: I("ConfigX-menu-icn.png") },
  { name: "ServiceOps", icon: I("serviceops-icon.svg") }, { name: "Projects", icon: I("evoq-projects-menu-icn.png") }, { name: "Desk", icon: I("desk-menu-icn.png") },
  { name: "EVI", icon: "/ai/ai-logo-icon.png" },
  { name: "HRMS", icon: I("hrms-menu-icn-new.png") }, { name: "Skillberry", icon: I("Skillberry-menu-icn.png") },
  { name: "Billing", icon: I("billing-menu-icn.png") }, { name: "Inventory", icon: I("inventory-menu-icn.png") }, { name: "Sync", icon: I("sync-menu-icn.png") },
];
const iconOf = (n: string) => DOCK.find((d) => d.name === n)?.icon ?? "";

/* Back-to-front slots for the stacked windows: front sits lower-left, the rest step up and right. */
const SLOT = [
  { x: 0, y: 92, z: 0, o: 1 },
  { x: 46, y: 46, z: -70, o: 0.92 },
  { x: 90, y: 0, z: -140, o: 0.8 },
];

export function ProductsHeroVisual() {
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const [answer, setAnswer] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);

  /* The scene is drawn at 600x584 and scaled to whatever width the hero column gives it. */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setFit(Math.min(1, e.contentRect.width / 600)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => { setTyped(SCENES[0].query.length); setShown(2); setAnswer(true); }, 0);
      return () => clearTimeout(t);
    }
    const s = SCENES[scene];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let k = 0;
    const typing = setInterval(() => {
      k += 1; setTyped(k);
      if (k >= s.query.length) {
        clearInterval(typing);
        timers.push(setTimeout(() => setShown(1), 250), setTimeout(() => setShown(2), 600), setTimeout(() => setAnswer(true), 1100));
        timers.push(setTimeout(() => { setTyped(0); setShown(0); setAnswer(false); setScene((v) => (v + 1) % SCENES.length); }, 5200));
      }
    }, 48);
    return () => { clearInterval(typing); timers.forEach(clearTimeout); };
  }, [scene]);

  const s = SCENES[scene];
  const active = s.results.slice(0, shown).map((r) => r[0]);

  return (
    <div ref={box} aria-hidden="true" style={{ width: "100%", height: 584 * fit }}>
    <div className="pv" style={{ transform: `scale(${fit})`, transformOrigin: "top left", marginLeft: fit < 1 ? 0 : undefined }}>
      <style>{`
        .pv{position:relative;width:600px;height:584px;margin:0 auto}
        .pv-ph{position:absolute;left:0;top:18px;width:236px;height:272px;border-radius:24px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(26,17,144,.55)}
        .pv-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .7s ease,transform 6s ease}
        .pv-stage{position:absolute;left:192px;top:20px;width:400px;height:300px;perspective:1500px}
        .pv-tilt{position:absolute;inset:0;transform:rotateX(6deg) rotateY(-13deg);transform-style:preserve-3d}
        .pv-win{position:absolute;width:300px;background:#fff;border:1px solid ${LINE};border-radius:16px;padding:12px 14px 6px;box-shadow:0 26px 50px -28px rgba(26,17,144,.45);transition:transform .9s cubic-bezier(.2,.8,.2,1),opacity .7s ease,left .9s cubic-bezier(.2,.8,.2,1),top .9s cubic-bezier(.2,.8,.2,1)}
        .pv-pal{position:absolute;left:96px;top:300px;width:468px;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border:1px solid #D9D6F5;border-radius:18px;box-shadow:0 40px 80px -36px rgba(26,17,144,.6),0 0 0 6px rgba(71,71,224,.06);overflow:hidden;z-index:20}
        .pv-res{transition:opacity .35s ease,transform .35s ease}
        .pv-dock{position:absolute;left:50%;bottom:0;transform:translateX(-50%);display:flex;align-items:flex-end;gap:8px;padding:9px 11px;background:rgba(255,255,255,.88);backdrop-filter:blur(10px);border:1px solid ${LINE};border-radius:18px;box-shadow:0 20px 40px -26px rgba(26,17,144,.5);z-index:21}
        .pv-ic{position:relative;width:36px;height:36px;border-radius:11px;background:#fff;border:1px solid ${LINE};display:flex;align-items:center;justify-content:center;transition:transform .25s cubic-bezier(.2,.8,.2,1)}
        .pv-ic:hover{transform:translateY(-8px) scale(1.28)}
        .pv-ic.on{transform:translateY(-7px);border-color:#C9C6FF;box-shadow:0 10px 18px -10px rgba(71,71,224,.7)}
        .pv-ic.on::after{content:"";position:absolute;bottom:-7px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:${P}}
        .pv-ic img{width:24px;height:24px;object-fit:contain;border-radius:6px}
        .pv-caret{display:inline-block;width:1.5px;height:16px;background:${P};margin-left:2px;vertical-align:-3px;animation:pvBlink 1s steps(1) infinite}
        @keyframes pvBlink{50%{opacity:0}}
        @media (prefers-reduced-motion:reduce){.pv-win,.pv-ph img,.pv-res,.pv-ic{transition:none}.pv-caret{animation:none}}
      `}</style>

      <div className="pv-ph">
        {SCENES.map((sc, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={sc.photo} src={sc.photo} alt="" style={{ objectPosition: sc.pos, opacity: i === scene ? 1 : 0, transform: i === scene ? "scale(1.06)" : "scale(1)" }} />
        ))}
        <div style={{ position: "absolute", inset: "auto 0 0 0", height: 120, background: "linear-gradient(180deg, rgba(10,8,60,0), rgba(10,8,60,.55))" }} />
        <span style={{ position: "absolute", left: 16, top: 16, display: "flex", alignItems: "center", gap: 6, padding: "5px 11px 5px 6px", borderRadius: 20, background: "rgba(255,255,255,.94)", fontSize: 11.5, fontWeight: 700, color: DEEP, lineHeight: 1 }}>
          <span style={{ width: 16, height: 16, flex: "none", borderRadius: "50%", backgroundImage: "url(/ai/ai-logo-icon.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} />
          <span>Asked EVI</span>
        </span>
        <div style={{ position: "absolute", left: 12, right: 44, bottom: 12, display: "flex", alignItems: "center", gap: 10, padding: "8px 11px", borderRadius: 14, background: "rgba(255,255,255,.94)" }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#EEEDFE", color: DEEP, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{s.initials}</span>
          <span style={{ lineHeight: 1.25 }}>
            <b style={{ display: "block", fontSize: 13, color: INK }}>{s.person}</b>
            <span style={{ fontSize: 11.5, color: BODY }}>{s.role}</span>
          </span>
        </div>
      </div>

      <div className="pv-stage">
        <div className="pv-tilt">
          {WINDOWS.map((w) => {
            const slot = s.windows.indexOf(w.name);
            const pos = slot === -1 ? { x: 168, y: -40, z: -220, o: 0 } : SLOT[slot];
            const hot = active.includes(w.name);
            return (
              <div key={w.name} className="pv-win" style={{ left: pos.x, top: pos.y, transform: `translateZ(${pos.z}px)`, opacity: pos.o, zIndex: slot === -1 ? 0 : 3 - slot, borderColor: hot ? "#C9C6FF" : LINE }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ display: "flex", gap: 4, marginRight: 4 }}>{[0, 1, 2].map((d) => <i key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#E3E6EE", display: "block" }} />)}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.icon} alt="" width={18} height={18} style={{ width: 18, height: 18, objectFit: "contain", borderRadius: 5 }} />
                  <b style={{ fontSize: 13, color: DEEP }}>{w.name}</b>
                  {hot && <span style={{ marginLeft: "auto", fontSize: 10.5, fontWeight: 700, color: P, background: "#EEEDFE", padding: "2px 8px", borderRadius: 20 }}>EVI found this</span>}
                </div>
                {w.rows.map(([a, b, tone, st], ri) => (
                  <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: "1px solid #F0F1F6", fontSize: 12 }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", background: ["#E0DEFB", "#D7ECF7", "#F6E2D9"][ri], flex: "none" }} />
                    <span style={{ minWidth: 0, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><b style={{ color: INK, fontWeight: 600 }}>{a}</b> <span style={{ color: BODY }}>· {b}</span></span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: TONE[tone][0], color: TONE[tone][1], whiteSpace: "nowrap" }}>{st}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pv-pal">
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", borderBottom: `1px solid ${LINE}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ai/ai-logo-icon.png" alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
          <span style={{ fontSize: 15, color: INK, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden" }}>{s.query.slice(0, typed)}<span className="pv-caret" /></span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: BODY, border: `1px solid ${LINE}`, borderRadius: 7, padding: "2px 7px", flex: "none" }}>⌘K</span>
        </div>
        <div style={{ padding: "8px 8px 0", minHeight: 96 }}>
          {s.results.map(([prod, text], i) => (
            <div key={prod + scene} className="pv-res" style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 9px", borderRadius: 10, background: i === 0 ? "#F6F5FF" : "transparent", opacity: i < shown ? 1 : 0, transform: i < shown ? "none" : "translateY(6px)" }}>
              <span style={{ width: 28, height: 28, borderRadius: 9, border: `1px solid ${LINE}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconOf(prod)} alt="" width={18} height={18} style={{ width: 18, height: 18, objectFit: "contain", borderRadius: 5 }} />
              </span>
              <span style={{ fontSize: 13, color: INK, flex: 1 }}>{text}</span>
              <span style={{ fontSize: 11, color: BODY }}>{prod}</span>
            </div>
          ))}
        </div>
        <div className="pv-res" style={{ margin: "8px 10px 10px", padding: "10px 12px", borderRadius: 12, background: `linear-gradient(90deg, ${DEEP}, ${P})`, color: "#fff", fontSize: 12.5, lineHeight: 1.5, display: "flex", gap: 10, alignItems: "center", opacity: answer ? 1 : 0, transform: answer ? "none" : "translateY(6px)" }}>
          <span style={{ flex: 1 }}>{s.answer}</span>
          <span style={{ flex: "none", fontSize: 11.5, fontWeight: 700, background: "rgba(255,255,255,.16)", padding: "5px 10px", borderRadius: 8 }}>Do it</span>
        </div>
      </div>

      <div className="pv-dock">
        {DOCK.map((d) => (
          <span key={d.name} className={`pv-ic${active.includes(d.name) ? " on" : ""}`} title={d.name} style={d.name === "EVI" ? { background: "#F2F2FF", borderColor: "#C9C6FF" } : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.icon} alt="" width={24} height={24} />
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}
