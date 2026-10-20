"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PALETTE } from "@/components/sections/SectionPlatform";

/* Products section: category filter chips over a grid of product cards. Each card
   shows a small product preview, what the product does, and the products it works with.
   Card colors come from each product's own palette (PALETTE, shared with the home page suite cards). */

const P = "#4747E0";
const DEEP = "#1A1190";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";
const I = (f: string) => `/billing/images/${f}`;

type CatKey = "Growth" | "Operations" | "People" | "Finance" | "Platform";
const CAT: Record<CatKey, { line: string }> = {
  Growth: { line: "Win customers and keep the relationship moving." },
  Operations: { line: "Deliver the work and support the customer after the sale." },
  People: { line: "Look after the team behind the work." },
  Finance: { line: "Keep revenue and stock records in view." },
  Platform: { line: "Connect products and existing systems." },
};

type Tone = "red" | "amber" | "green" | "indigo";
const TONE: Record<Tone, [string, string]> = { red: ["#FDECEC", "#B42318"], amber: ["#FEF3DC", "#93600B"], green: ["#E6F6EE", "#137A48"], indigo: ["#EEEDFE", "#3C3489"] };

type Product = { name: string; cat: CatKey; icon: string; line: string; href: string; preview: [string, string, Tone][]; works: string[] };
const PRODUCTS: Product[] = [
  { name: "CRM", cat: "Growth", icon: I("crm-menu-icn.png"), href: "/products/crm", line: "Manage customer accounts, enquiries, opportunities and follow-ups throughout the sales process.", preview: [["Northgate · Renewal", "Follow up", "amber"], ["Acme Ltd · Expansion", "Won", "green"]], works: ["Campaigns", "Billing", "Desk"] },
  { name: "Campaigns", cat: "Growth", icon: I("campaigns-menu-icn.png"), href: "/products/campaigns", line: "Plan and launch marketing campaigns to reach prospective customers and support demand generation.", preview: [["Spring launch · Email", "Live", "green"], ["Webinar invite", "Scheduled", "indigo"]], works: ["CRM", "ConfigX"] },
  { name: "ConfigX", cat: "Growth", icon: I("ConfigX-menu-icn.png"), href: "/products/configx", line: "Configure products, visualize options, calculate pricing and prepare customer quotes.", preview: [["Modular desk · 3 options", "₹48,200", "indigo"], ["Quote Q-118", "Sent", "green"]], works: ["CRM", "Billing", "Inventory"] },
  { name: "ServiceOps", cat: "Operations", icon: I("serviceops-icon.svg"), href: "/products/serviceops", line: "Manage work orders, technician dispatch, maintenance activities and service visits.", preview: [["WO-1042 · Pump service", "En route", "indigo"], ["WO-1043 · Valve repair", "Waiting", "red"]], works: ["Desk", "Inventory", "Billing"] },
  { name: "Projects", cat: "Operations", icon: I("evoq-projects-menu-icn.png"), href: "/products/projects", line: "Plan and coordinate project tasks, responsibilities and delivery-related work.", preview: [["Riverside fit-out", "On track", "green"], ["Harbor office · Phase 2", "Review", "amber"]], works: ["HRMS", "Billing"] },
  { name: "Desk", cat: "Operations", icon: I("desk-menu-icn.png"), href: "/products/desk", line: "Track customer enquiries, product questions and service issues through resolution.", preview: [["#2291 · Login issue", "Open", "red"], ["#2290 · Delivery date", "Resolved", "green"]], works: ["CRM", "ServiceOps"] },
  { name: "HRMS", cat: "People", icon: I("hrms-menu-icn-new.png"), href: "/products/hrms", line: "Manage employee information and workforce administration.", preview: [["Sana K. · Engineer", "Onboarding", "indigo"], ["Leave requests", "3 pending", "amber"]], works: ["Skillberry", "Projects"] },
  { name: "Skillberry", cat: "People", icon: I("Skillberry-menu-icn.png"), href: "/products/skillberry", line: "Support employee learning, training and skills development.", preview: [["Safety basics", "86% complete", "green"], ["New-hire path", "12 enrolled", "indigo"]], works: ["HRMS"] },
  { name: "Billing", cat: "Finance", icon: I("billing-menu-icn.png"), href: "/products/billing", line: "Manage invoicing, payments and revenue-related activity.", preview: [["INV-2291 · Acme Ltd", "Overdue", "red"], ["INV-2293 · Globex", "Paid", "green"]], works: ["CRM", "Inventory", "ServiceOps"] },
  { name: "Inventory", cat: "Finance", icon: I("inventory-menu-icn.png"), href: "/products/inventory", line: "Track stock and supply information relevant to product availability and fulfillment.", preview: [["Valve kit V-20", "2 left", "red"], ["Filter F-11", "40 in stock", "green"]], works: ["ServiceOps", "Billing"] },
  { name: "Sync", cat: "Platform", icon: I("sync-menu-icn.png"), href: "/products/sync", line: "Synchronize data between EVOQ products and existing systems through supported integrations.", preview: [["Accounts → ERP", "Synced", "green"], ["Orders ← Store", "2 min ago", "indigo"]], works: ["CRM", "Billing", "Inventory"] },
];
const iconOf = (n: string) => PRODUCTS.find((p) => p.name === n)?.icon ?? "";
const FILTERS: ("All" | CatKey)[] = ["All", "Growth", "Operations", "People", "Finance", "Platform"];

const Arrow = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

export function ProductsGrid() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = PRODUCTS.filter((p) => f === "All" || p.cat === f);

  return (
    <div>
      <style>{`
        .pg-chips{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin:0 auto 14px}
        .pg-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;border:1px solid ${LINE};background:#fff;color:${INK};font-size:14px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
        .pg-chip:hover{border-color:#C9C6FF}
        .pg-chip.on{background:${DEEP};border-color:${DEEP};color:#fff}
        .pg-chip i{font-style:normal;font-size:12px;font-weight:700;min-width:20px;padding:1px 6px;border-radius:20px;background:#F2F2FF;color:${P}}
        .pg-chip.on i{background:rgba(255,255,255,.18);color:#fff}
        .pg-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
        .pg-card{display:flex;flex-direction:column;background:#fff;border:1px solid ${LINE};border-radius:20px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .pg-card:hover{transform:translateY(-5px);box-shadow:0 30px 56px -32px rgba(26,17,144,.4);border-color:var(--ps)}
        .pg-prev{position:relative;height:132px;padding:18px 18px 0;overflow:hidden}
        .pg-win{position:relative;background:#fff;border-radius:12px 12px 0 0;box-shadow:0 18px 36px -22px rgba(26,17,144,.45);padding:10px 12px 4px;transition:transform .35s ease}
        .pg-card:hover .pg-win{transform:translateY(-6px)}
        .pg-go{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:700;color:var(--pc)}
        .pg-go svg{transition:transform .2s ease}.pg-card:hover .pg-go svg{transform:translateX(4px)}
        @media (max-width:1100px){.pg-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (max-width:640px){.pg-grid{grid-template-columns:1fr}.pg-chips{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;margin:0 -24px 14px;padding:0 24px 4px}}
        @media (prefers-reduced-motion:reduce){.pg-card,.pg-win{transition:none}}
      `}</style>

      <div className="pg-chips" role="group" aria-label="Filter products by area">
        {FILTERS.map((k) => (
          <button key={k} type="button" className={`pg-chip${f === k ? " on" : ""}`} aria-pressed={f === k} onClick={() => setF(k)}>
            {k}<i>{k === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === k).length}</i>
          </button>
        ))}
      </div>
      <p style={{ textAlign: "center", margin: "0 0 34px", fontSize: 14.5, color: BODY, minHeight: 22 }}>{f === "All" ? "Every EVOQ product, ready to use on its own or together." : CAT[f].line}</p>

      <motion.div layout className="pg-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => {
            const c = PALETTE[p.name.toLowerCase()];
            return (
              <motion.a key={p.name} href={p.href} className="pg-card" style={{ ["--pc" as string]: c.primary, ["--ps" as string]: c.soft }} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}>
                <div className="pg-prev" style={{ background: `radial-gradient(120% 90% at 100% 0%, ${c.tint} 0%, transparent 62%), radial-gradient(90% 90% at 0% 100%, ${c.soft}55 0%, transparent 70%), ${c.surface}` }} aria-hidden="true">
                  <span style={{ position: "absolute", right: 16, top: 14, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: c.primary }}>{p.cat}</span>
                  <div className="pg-win" style={{ marginTop: 22 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                      <span style={{ display: "flex", gap: 3 }}>{[0, 1, 2].map((d) => <b key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#E3E6EE", display: "block" }} />)}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: c.depth, marginLeft: 4 }}>{p.name}</span>
                    </div>
                    {p.preview.map(([a, s, t]) => (
                      <div key={a} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "6px 0", borderTop: "1px solid #F0F1F6", fontSize: 11.5 }}>
                        <span style={{ color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a}</span>
                        <span style={{ flex: "none", fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: TONE[t][0], color: TONE[t][1] }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt="" width={40} height={40} style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 11 }} />
                    <h4 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: INK }}>{p.name}</h4>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: BODY, flex: 1 }}>{p.line}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, paddingTop: 12, borderTop: `1px solid ${LINE}` }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: BODY }}>
                      <span style={{ display: "flex", paddingLeft: 6 }}>
                        {p.works.map((w) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={w} src={iconOf(w)} alt={w} title={w} width={24} height={24} style={{ width: 24, height: 24, objectFit: "contain", borderRadius: 7, marginLeft: -6, background: "#fff", border: "2px solid #fff" }} />
                        ))}
                      </span>
                      Works with
                    </span>
                    <span className="pg-go">Explore <Arrow /></span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
