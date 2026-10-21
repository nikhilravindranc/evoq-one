"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PALETTE } from "@/components/sections/SectionPlatform";

/* Products section: category filter chips over a grid of product cards. Each card sits on
   its product's own tint with a large icon tile, the product name and a short tagline, so
   each product is recognisable at a glance. Colours come from PALETTE, shared with the
   home page suite cards. */

const P = "#4747E0";
const DEEP = "#1A1190";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";
const I = (f: string) => `/billing/images/${f}`;

type CatKey = "Growth" | "Operations" | "People" | "Finance" | "Platform" | "AI";
const CAT: Record<CatKey, { line: string }> = {
  Growth: { line: "Win customers and keep the relationship moving." },
  Operations: { line: "Deliver the work and support the customer after the sale." },
  People: { line: "Look after the team behind the work." },
  Finance: { line: "Keep revenue and stock records in view." },
  Platform: { line: "Connect products and existing systems." },
  AI: { line: "Bring AI into the products and processes where your work happens." },
};

type Key = "crm" | "campaigns" | "configx" | "serviceops" | "projects" | "desk" | "hrms" | "skillberry" | "billing" | "inventory" | "sync" | "ai";
type Product = { key: Key; name: string; cat: CatKey; icon: string; tag: string; line: string; href: string; works: string[] };
const PRODUCTS: Product[] = [
  { key: "crm", name: "CRM", cat: "Growth", icon: I("crm-menu-icn.png"), tag: "Sales pipeline", href: "/products/crm", line: "Manage customer accounts, enquiries, opportunities and follow-ups throughout the sales process.", works: ["Campaigns", "Billing", "Desk"] },
  { key: "campaigns", name: "Campaigns", cat: "Growth", icon: I("campaigns-menu-icn.png"), tag: "Reach and engage", href: "/products/campaigns", line: "Plan and launch marketing campaigns to reach prospective customers and support demand generation.", works: ["CRM", "ConfigX"] },
  { key: "configx", name: "ConfigX", cat: "Growth", icon: I("ConfigX-menu-icn.png"), tag: "Configure, price, quote", href: "/products/configx", line: "Configure products, visualize options, calculate pricing and prepare customer quotes.", works: ["CRM", "Billing", "Inventory"] },
  { key: "serviceops", name: "ServiceOps", cat: "Operations", icon: I("serviceops-icon.svg"), tag: "Field service", href: "/products/serviceops", line: "Manage work orders, technician dispatch, maintenance activities and service visits.", works: ["Desk", "Inventory", "Billing"] },
  { key: "projects", name: "Projects", cat: "Operations", icon: I("evoq-projects-menu-icn.png"), tag: "Delivery planning", href: "/products/projects", line: "Plan and coordinate project tasks, responsibilities and delivery-related work.", works: ["HRMS", "Billing"] },
  { key: "desk", name: "Desk", cat: "Operations", icon: I("desk-menu-icn.png"), tag: "Customer support", href: "/products/desk", line: "Track customer enquiries, product questions and service issues through resolution.", works: ["CRM", "ServiceOps"] },
  { key: "hrms", name: "HRMS", cat: "People", icon: I("hrms-menu-icn-new.png"), tag: "People operations", href: "/products/hrms", line: "Manage employee information and workforce administration.", works: ["Skillberry", "Projects"] },
  { key: "skillberry", name: "Skillberry", cat: "People", icon: I("Skillberry-menu-icn.png"), tag: "Learning and skills", href: "/products/skillberry", line: "Support employee learning, training and skills development.", works: ["HRMS"] },
  { key: "billing", name: "Billing", cat: "Finance", icon: I("billing-menu-icn.png"), tag: "Invoices and payments", href: "/products/billing", line: "Manage invoicing, payments and revenue-related activity.", works: ["CRM", "Inventory", "ServiceOps"] },
  { key: "inventory", name: "Inventory", cat: "Finance", icon: I("inventory-menu-icn.png"), tag: "Stock and supply", href: "/products/inventory", line: "Track stock and supply information relevant to product availability and fulfillment.", works: ["ServiceOps", "Billing"] },
  { key: "sync", name: "Sync", cat: "Platform", icon: I("sync-menu-icn.png"), tag: "Integrations", href: "/products/sync", line: "Synchronize data between EVOQ products and existing systems through supported integrations.", works: ["CRM", "Billing", "Inventory"] },
  { key: "ai", name: "EVOQ AI", cat: "AI", icon: "/ai/ai-logo-icon.png", tag: "AI across the suite", href: "/products/ai", line: "Ask EVI for help, assign work to AI agents, or let AI work automatically across your products.", works: ["CRM", "ServiceOps", "Billing"] },
];
const iconOf = (n: string) => PRODUCTS.find((p) => p.name === n)?.icon ?? "";
const FILTERS: ("All" | CatKey)[] = ["All", "Growth", "Operations", "People", "Finance", "Platform", "AI"];

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
        .pg-card{position:relative;display:flex;flex-direction:column;padding:22px 22px 18px;border-radius:20px;text-decoration:none;color:${INK};background:var(--sf);border:1px solid var(--sb);transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .pg-card:hover{transform:translateY(-5px);border-color:var(--pc);box-shadow:0 30px 56px -34px var(--pc)}
        .pg-tile{display:flex;transition:transform .35s cubic-bezier(.2,.7,.2,1)}
        .pg-card:hover .pg-tile{transform:translateY(-3px) scale(1.04)}
        .pg-go{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:700;color:var(--pc)}
        .pg-go svg{transition:transform .2s ease}.pg-card:hover .pg-go svg{transform:translateX(4px)}
        @media (max-width:1100px){.pg-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (max-width:640px){.pg-grid{grid-template-columns:1fr}.pg-chips{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;margin:0 -24px 14px;padding:0 24px 4px}}
        @media (prefers-reduced-motion:reduce){.pg-card,.pg-tile{transition:none}}
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
            const c = PALETTE[p.key];
            return (
              <motion.a
                key={p.name}
                href={p.href}
                className="pg-card"
                style={{ ["--sf" as string]: c.surface, ["--sb" as string]: c.soft + "99", ["--pc" as string]: c.primary, ["--tt" as string]: c.tint }}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <span style={{ position: "absolute", top: 20, right: 20, fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: c.primary, padding: "4px 10px", borderRadius: 99, background: "#fff", border: `1px solid ${c.soft}` }}>{p.cat}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingRight: 96 }}>
                  <span className="pg-tile">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt="" width={52} height={52} style={{ width: 52, height: 52, objectFit: "contain", borderRadius: 13 }} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: 22, lineHeight: 1.15, fontWeight: 700, letterSpacing: "-.015em", color: c.depth, fontFamily: "var(--font-display), system-ui, sans-serif" }}>{p.name}</h4>
                    <span style={{ display: "block", marginTop: 4, fontSize: 13.5, fontWeight: 700, color: c.primary }}>{p.tag}</span>
                  </span>
                </div>
                <p style={{ margin: "16px 0 0", fontSize: 14, lineHeight: 1.65, color: BODY, flex: 1 }}>{p.line}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 20, paddingTop: 14, borderTop: `1px solid ${c.soft}` }}>
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
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
