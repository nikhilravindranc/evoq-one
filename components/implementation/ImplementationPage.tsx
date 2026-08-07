"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { useRegion } from "@/components/shared/RegionContext";
import { ProductBadge, PRODUCT_BRAND, hexToRgba } from "@/components/shared/ProductBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const eyebrowStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 14px",
  borderRadius: 999,
  background: "rgba(71,71,224,0.08)",
  color: "var(--interactive)",
  fontFamily: "var(--font-display)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

/* ── data ── */

type Pkg = { name: string; price: string; hours: string; timeline: string; recommendedFor: string };

const CRM_LIKE_INDIA: Pkg[] = [
  { name: "Essential", price: "₹45,000", hours: "20 Hours", timeline: "10 Business Days", recommendedFor: "Small businesses" },
  { name: "Standard", price: "₹90,000", hours: "40 Hours", timeline: "1 Week", recommendedFor: "Growing teams" },
  { name: "Premium", price: "₹1,80,000", hours: "80 Hours", timeline: "2 Weeks", recommendedFor: "Mid-sized organizations" },
  { name: "Enterprise", price: "₹3,60,000", hours: "160 Hours", timeline: "4 Weeks", recommendedFor: "Large enterprises" },
];
const CRM_LIKE_INTL: Pkg[] = [
  { name: "Standard", price: "$999", hours: "40 Hours", timeline: "1 Week", recommendedFor: "Growing teams" },
  { name: "Premium", price: "$1,999", hours: "80 Hours", timeline: "2 Weeks", recommendedFor: "Mid-sized organizations" },
  { name: "Custom", price: "Custom", hours: "Custom", timeline: "Custom", recommendedFor: "Large enterprises" },
];
const SERVICEOPS_INDIA: Pkg[] = CRM_LIKE_INDIA.slice(1);
const SERVICEOPS_INTL: Pkg[] = CRM_LIKE_INTL;

type ScopeCategory = { name: string; rows: { activity: string; values: string[] }[] };

const CRM_LIKE_TIERS = ["Essential", "Standard", "Premium", "Enterprise"];
const CRM_LIKE_SCOPE_CATEGORIES: ScopeCategory[] = [
  {
    name: "Project Planning",
    rows: [
      { activity: "Discovery Workshop", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Business Process Review", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Implementation Planning", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Project Kickoff", values: ["✓", "✓", "✓", "✓"] },
    ],
  },
  {
    name: "Organization Setup",
    rows: [
      { activity: "Organization Configuration", values: ["✓", "✓", "✓", "✓"] },
      { activity: "User Setup", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Roles & Permissions", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Profiles", values: ["✓", "✓", "✓", "✓"] },
    ],
  },
  {
    name: "{product} Configuration",
    rows: [
      { activity: "Standard Module Configuration", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Custom Module Configuration", values: ["—", "✓", "✓", "✓"] },
      { activity: "Custom Fields", values: ["Basic", "Standard", "Advanced", "Enterprise-scale"] },
      { activity: "Layout Configuration", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Validation Rules", values: ["Basic", "Standard", "Advanced", "Enterprise-scale"] },
    ],
  },
  {
    name: "Workflow Automation",
    rows: [
      { activity: "Workflow Rules", values: ["Basic", "Standard", "Advanced", "Enterprise-scale"] },
      { activity: "Email Notifications", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Assignment Rules", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Approval Workflows", values: ["—", "✓", "✓", "✓"] },
    ],
  },
  {
    name: "Data Migration",
    rows: [
      { activity: "Spreadsheet Import", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Existing {product} Migration", values: ["—", "✓", "✓", "✓"] },
      { activity: "Data Validation", values: ["—", "✓", "✓", "✓"] },
      { activity: "Migration Planning & Cutover", values: ["—", "—", "✓", "✓"] },
    ],
  },
  {
    name: "Integrations",
    rows: [
      { activity: "Email Integration", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Calendar Integration", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Third-party Integrations", values: ["—", "Optional", "✓", "Complex & Multiple"] },
      { activity: "API Configuration", values: ["—", "—", "✓", "Advanced"] },
    ],
  },
  {
    name: "Reports & Dashboards",
    rows: [
      { activity: "Standard Reports", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Custom Reports", values: ["—", "✓", "✓", "✓"] },
      { activity: "Dashboards", values: ["Standard", "Business", "Operational", "Executive & Departmental"] },
    ],
  },
  {
    name: "Training",
    rows: [
      { activity: "Administrator Training", values: ["✓", "✓", "✓", "✓"] },
      { activity: "End User Training", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Recorded Sessions", values: ["—", "✓", "✓", "✓"] },
      { activity: "Role-based Training", values: ["—", "—", "✓", "✓"] },
      { activity: "Department-specific Training", values: ["—", "—", "—", "✓"] },
    ],
  },
  {
    name: "Go-Live",
    rows: [
      { activity: "Production Deployment", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Go-live Validation", values: ["✓", "✓", "✓", "✓"] },
    ],
  },
  {
    name: "Post-Launch Support",
    rows: [
      { activity: "Email Support", values: ["✓", "✓", "✓", "✓"] },
      { activity: "Priority Support", values: ["—", "—", "✓", "✓"] },
      { activity: "Post-launch Optimization Review", values: ["—", "—", "✓", "✓"] },
      { activity: "Dedicated Implementation Consultant", values: ["—", "—", "—", "✓"] },
      { activity: "Extended Hypercare", values: ["—", "—", "—", "✓"] },
    ],
  },
];
const SERVICEOPS_TIERS = ["Standard", "Premium", "Enterprise"];
const SERVICEOPS_SCOPE_CATEGORIES: ScopeCategory[] = CRM_LIKE_SCOPE_CATEGORIES.map((cat) => ({
  ...cat,
  rows: cat.rows.map((r) => ({ ...r, values: r.values.slice(1) })),
}));

const PRODUCTS = [
  { key: "crm", label: "CRM", india: CRM_LIKE_INDIA, international: CRM_LIKE_INTL, tiers: CRM_LIKE_TIERS, scopeCategories: CRM_LIKE_SCOPE_CATEGORIES },
  { key: "desk", label: "Desk", india: CRM_LIKE_INDIA, international: CRM_LIKE_INTL, tiers: CRM_LIKE_TIERS, scopeCategories: CRM_LIKE_SCOPE_CATEGORIES },
  { key: "hrms", label: "HRMS", india: CRM_LIKE_INDIA, international: CRM_LIKE_INTL, tiers: CRM_LIKE_TIERS, scopeCategories: CRM_LIKE_SCOPE_CATEGORIES },
  { key: "skillberry", label: "Skillberry", india: CRM_LIKE_INDIA, international: CRM_LIKE_INTL, tiers: CRM_LIKE_TIERS, scopeCategories: CRM_LIKE_SCOPE_CATEGORIES },
  { key: "serviceops", label: "ServiceOps", india: SERVICEOPS_INDIA, international: SERVICEOPS_INTL, tiers: SERVICEOPS_TIERS, scopeCategories: SERVICEOPS_SCOPE_CATEGORIES },
];

/* ── Why-section illustrations ──
 * Mini product-UI vignettes rather than generic glyphs — the detail is what
 * makes these read as designed rather than templated.
 */

/* Complementary pastels used only as card canvases — the UI inside each
 * vignette stays on the EVOQ brand blues so the section still reads as EVOQ. */
const PASTEL = {
  lavender: "#EEEAFA",
  green: "#D5EDE0",
  peach: "#F5E3CA",
  pink: "#FDE4E4",
  slate: "#D4DBE5",
};

const INK = "#1F2430";
const HAIRLINE = "#F0F0F6";
const GREEN_INK = "#2E7D53";
const AMBER_INK = "#9A6B25";
const VIOLET_INK = "#7C3AED";

const mockCard: React.CSSProperties = {
  width: "100%",
  maxWidth: 272,
  background: "#fff",
  borderRadius: 16,
  padding: "14px 16px 16px",
  boxShadow: "0 2px 6px rgba(31,36,48,0.06), 0 20px 36px -24px rgba(31,36,48,0.5)",
  fontFamily: "var(--font-sans)",
};

const mockHead: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 12,
};

const mockTitle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 12,
  fontWeight: 700,
  color: INK,
  letterSpacing: "-0.01em",
};

const chip = (bg: string, color: string): React.CSSProperties => ({
  padding: "3px 9px",
  borderRadius: 999,
  background: bg,
  color,
  fontSize: 9.5,
  fontWeight: 700,
  whiteSpace: "nowrap",
});

const rowLabel: React.CSSProperties = { fontSize: 11.5, color: INK };

const dividedRow = (first: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  padding: "9px 0",
  borderTop: first ? "none" : `1px solid ${HAIRLINE}`,
});

function Tick({ size = 10, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 5.2 L4 7.3 L8 2.7" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: 32,
        height: 18,
        borderRadius: 999,
        flexShrink: 0,
        background: on ? "var(--interactive)" : "#DFE1EA",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 16 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 2px rgba(31,36,48,0.28)",
        }}
      />
    </span>
  );
}

function MockConfiguration() {
  const rows: [string, boolean][] = [
    ["Lead assignment", true],
    ["Approval routing", false],
    ["Email alerts", true],
  ];
  return (
    <div style={mockCard}>
      <div style={mockHead}>
        <span style={mockTitle}>Workflow settings</span>
        <span style={chip(PASTEL.lavender, "var(--interactive)")}>CRM</span>
      </div>
      {rows.map(([label, on], i) => (
        <div key={label} style={dividedRow(i === 0)}>
          <span style={rowLabel}>{label}</span>
          <Toggle on={on} />
        </div>
      ))}
    </div>
  );
}

function MockDeployment() {
  const steps = ["Kickoff", "Configure", "Migrate", "Go live"];
  const done = 3;
  return (
    <div style={mockCard}>
      <div style={mockHead}>
        <span style={mockTitle}>Implementation plan</span>
        <span style={chip(PASTEL.green, GREEN_INK)}>On track</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", marginTop: 4 }}>
        {steps.map((s, i) => {
          const complete = i < done;
          return (
            <div key={s} style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {i > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 9,
                    right: "50%",
                    width: "100%",
                    height: 2,
                    background: complete ? "var(--interactive)" : "#E6E6F0",
                  }}
                />
              )}
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: complete ? "var(--interactive)" : "#fff",
                  border: complete ? "none" : "2px solid #E0E0EC",
                }}
              >
                {complete && <Tick />}
              </span>
              <span
                style={{
                  marginTop: 7,
                  fontSize: 9.5,
                  fontWeight: i === done ? 700 : 500,
                  color: i === done ? INK : "var(--muted)",
                }}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockMigration() {
  const rows: [string, boolean][] = [
    ["Contacts", true],
    ["Accounts", true],
    ["Deals", false],
  ];
  return (
    <div style={mockCard}>
      <div style={mockHead}>
        <span style={mockTitle}>Migration status</span>
        <span style={chip(PASTEL.lavender, "var(--interactive)")}>3 record sets</span>
      </div>
      {rows.map(([name, ok], i) => (
        <div key={name} style={dividedRow(i === 0)}>
          <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 6,
                flexShrink: 0,
                background: ok ? PASTEL.green : PASTEL.peach,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {ok ? <Tick color={GREEN_INK} size={9} /> : <span style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER_INK }} />}
            </span>
            <span style={rowLabel}>{name}</span>
          </span>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: ok ? GREEN_INK : AMBER_INK }}>
            {ok ? "Verified" : "In review"}
          </span>
        </div>
      ))}
      <div style={{ marginTop: 12, height: 6, borderRadius: 3, background: "#EEEEF6", overflow: "hidden" }}>
        <div style={{ width: "68%", height: "100%", borderRadius: 3, background: "var(--interactive)" }} />
      </div>
    </div>
  );
}

function MockGuidance() {
  return (
    <div style={mockCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            flexShrink: 0,
            background: "var(--interactive)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
            <circle cx="12" cy="8.5" r="4" fill="#fff" />
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0z" fill="#fff" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 11.5, fontWeight: 700, color: INK }}>
            Implementation Specialist
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3, fontSize: 10, color: "var(--muted)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3BA55D" }} />
            Available now
          </span>
        </span>
      </div>
      <div
        style={{
          background: "#F6F6FB",
          borderRadius: "12px 12px 12px 4px",
          padding: "10px 12px",
          fontSize: 11,
          lineHeight: 1.5,
          color: INK,
        }}
      >
        Your configuration review is scheduled for Thursday.
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 7 }}>
        <span
          style={{
            background: "var(--interactive)",
            color: "#fff",
            borderRadius: "12px 12px 4px 12px",
            padding: "9px 12px",
            fontSize: 11,
          }}
        >
          Perfect — see you then
        </span>
      </div>
    </div>
  );
}

function MockAdoption() {
  const bars = [34, 48, 62, 80, 100];
  const labels = ["W1", "W2", "W3", "W4", "W5"];
  return (
    <div style={mockCard}>
      <div style={mockHead}>
        <span style={mockTitle}>Active users</span>
        <span style={chip(PASTEL.green, GREEN_INK)}>Trending up</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 9, height: 76 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: 6,
              background: i === bars.length - 1 ? "var(--interactive)" : "#DCDCF2",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 9, marginTop: 7 }}>
        {labels.map((l) => (
          <span key={l} style={{ flex: 1, textAlign: "center", fontSize: 9, color: "var(--muted)" }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function MockScale() {
  const tiers = ["Starter", "Growth", "Enterprise"];
  const specs: [string, string][] = [
    ["Users", "Unlimited"],
    ["Modules", "Advanced"],
    ["Support", "Dedicated"],
  ];
  return (
    <div style={mockCard}>
      <div style={{ display: "flex", background: "#F2F2F8", borderRadius: 999, padding: 3, marginBottom: 12 }}>
        {tiers.map((t, i) => (
          <span
            key={t}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "6px 0",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              background: i === 2 ? "var(--interactive)" : "transparent",
              color: i === 2 ? "#fff" : "var(--muted)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {specs.map(([k, v], i) => (
        <div key={k} style={dividedRow(i === 0)}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{k}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: INK }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

type WhyCard = {
  title: string;
  body: string;
  illustration: React.ReactNode;
  background: string;
  height: number;
};

const WHY_CARDS: WhyCard[] = [
  {
    title: "Tailored Configuration",
    body: "Configure EVOQ based on your business processes, users, approvals, and workflows.",
    illustration: <MockConfiguration />,
    background: PASTEL.lavender,
    height: 372,
  },
  {
    title: "Higher User Adoption",
    body: "Train administrators and end users to maximize productivity from day one.",
    illustration: <MockAdoption />,
    background: PASTEL.pink,
    height: 328,
  },
  {
    title: "Faster Deployment",
    body: "Reduce implementation time with a structured approach and proven best practices.",
    illustration: <MockDeployment />,
    background: PASTEL.green,
    height: 320,
  },
  {
    title: "Expert Guidance",
    body: "Work directly with implementation specialists throughout your deployment.",
    illustration: <MockGuidance />,
    background: PASTEL.peach,
    height: 380,
  },
  {
    title: "Secure Data Migration",
    body: "Move your existing business data with validation and minimal disruption.",
    illustration: <MockMigration />,
    background: PASTEL.slate,
    height: 372,
  },
  {
    title: "Built to Scale",
    body: "Start with an implementation designed to grow as your business evolves.",
    illustration: <MockScale />,
    background: PASTEL.lavender,
    height: 328,
  },
];

const FAQS = [
  { q: "Is professional implementation required?", a: "No. EVOQ can be configured independently. Professional implementation is recommended for organizations requiring configuration, migration, integrations, or guided onboarding." },
  { q: "Can implementation be customized?", a: "Yes. Additional implementation hours and custom services can be added based on your project requirements." },
  { q: "Can you migrate data from another system?", a: "Yes. We support data migration from spreadsheets and selected business applications, depending on the implementation package." },
  { q: "Can implementation be completed remotely?", a: "Yes. Most implementation projects are delivered remotely. On-site implementation may be available for enterprise engagements." },
  { q: "How long does implementation take?", a: "The timeline depends on the selected package and project complexity." },
];

/* ── small building blocks ── */

function PrimaryButton({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const style: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
    borderRadius: 999, border: 0, cursor: "pointer",
    background: "var(--interactive)", color: "#fff",
    fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
    boxShadow: "0 8px 28px -8px rgba(71,71,224,0.45)",
    textDecoration: "none",
    transition: "transform 0.15s, background 0.15s",
  };
  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = "var(--mid)"; },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "var(--interactive)"; },
  };
  if (href) return <Link href={href} style={style} {...handlers}>{children}</Link>;
  return <button type="button" onClick={onClick} style={style} {...handlers}>{children}</button>;
}

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
        borderRadius: 999, border: "1px solid var(--border)",
        background: "#fff", color: "#1F2430",
        fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
        textDecoration: "none", transition: "border-color 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--tint)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {children}
    </Link>
  );
}

function BentoCard({ card, delay }: { card: WhyCard; delay: number }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: card.background,
        borderRadius: 24,
        padding: "26px 26px 28px",
        display: "flex",
        flexDirection: "column",
        height: card.height,
      }}
    >
      {/* illustration occupies the flexible upper area, optically centred */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0, paddingBottom: 20 }}>
        {card.illustration}
      </div>

      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 17,
          fontWeight: 700,
          color: "#1F2430",
          margin: "0 0 7px",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
        }}
      >
        {card.title}
      </h4>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.55, color: "var(--body-text)", margin: 0 }}>
        {card.body}
      </p>
    </motion.div>
  );
}

function NumberedCard({ card, number, delay }: { card: WhyCard; number: number; delay: number }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "0 1px 2px rgba(31,36,48,0.04), 0 12px 32px -20px rgba(31,36,48,0.2)",
      }}
    >
      {/* Content area */}
      <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: card.background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 800,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            {String(number).padStart(2, "0")}
          </span>
        </div>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "#1F2430",
            margin: "0 0 8px",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {card.title}
        </h4>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.55, color: "var(--body-text)", margin: 0 }}>
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ── packages & scope presentation ── */

type Accent = { bg: string; ink: string; faint: string };

const TIER_ACCENT: Record<string, Accent> = {
  Essential: { bg: PASTEL.green, ink: GREEN_INK, faint: "#F2FAF5" },
  Standard: { bg: PASTEL.slate, ink: "#4747E0", faint: "#F4F6FA" },
  Premium: { bg: PASTEL.lavender, ink: VIOLET_INK, faint: "#F8F5FD" },
  Enterprise: { bg: PASTEL.peach, ink: AMBER_INK, faint: "#FDF8EF" },
  Custom: { bg: PASTEL.peach, ink: AMBER_INK, faint: "#FDF8EF" },
};
const NEUTRAL_ACCENT: Accent = { bg: PASTEL.slate, ink: "var(--interactive)", faint: "#F4F6FA" };
const tierAccent = (name: string): Accent => TIER_ACCENT[name] ?? NEUTRAL_ACCENT;

/* Category strip stays one neutral accent — color there was decorative
 * noise competing with the status pills, which are the part that actually
 * carries meaning. */
const CATEGORY_TINT: Accent = { bg: "var(--soft)", ink: "var(--interactive)", faint: "#FAFAFD" };

/* Pricing, folded into the table itself as a final row-group instead of a
 * separate card strip — reuses the same tier columns as the scope rows. */
const PLAN_ROWS: { label: string; value: (pkg: Pkg) => string; emphasize?: boolean }[] = [
  { label: "Price", value: (pkg) => pkg.price, emphasize: true },
  { label: "Implementation Hours", value: (pkg) => pkg.hours },
  { label: "Estimated Timeline", value: (pkg) => pkg.timeline },
  { label: "Recommended For", value: (pkg) => pkg.recommendedFor },
];

/* Scope values that read as qualifiers get a pill; everything else is a symbol. */
const VALUE_STYLE: Record<string, { bg: string; ink: string; outlined?: boolean }> = {
  // tier 1 — basic/limited
  Limited: { bg: PASTEL.peach, ink: AMBER_INK },
  Basic: { bg: PASTEL.peach, ink: AMBER_INK },
  Optional: { bg: "#fff", ink: "var(--muted)", outlined: true },
  // tier 2 — standard
  Standard: { bg: PASTEL.slate, ink: INK },
  Expanded: { bg: PASTEL.slate, ink: INK },
  Business: { bg: PASTEL.slate, ink: INK },
  // tier 3 — advanced
  Advanced: { bg: PASTEL.lavender, ink: VIOLET_INK },
  Operational: { bg: PASTEL.lavender, ink: VIOLET_INK },
  // tier 4 — top/unlimited
  Unlimited: { bg: PASTEL.green, ink: GREEN_INK },
  Priority: { bg: PASTEL.green, ink: GREEN_INK },
  Dedicated: { bg: PASTEL.green, ink: GREEN_INK },
  "Enterprise-scale": { bg: PASTEL.green, ink: GREEN_INK },
  "Complex & Multiple": { bg: PASTEL.green, ink: GREEN_INK },
  "Executive & Departmental": { bg: PASTEL.green, ink: GREEN_INK },
};

function CheckMark({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.4" stroke={GREEN_INK} strokeWidth="1.5" />
      <path d="M6.3 10.3 l2.5 2.5 4.9 -5.4" stroke={GREEN_INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScopeValue({ value }: { value: string }) {
  if (value === "✓") return <CheckMark />;
  if (value === "—") return <span style={{ color: "var(--subtle)", fontSize: 15, lineHeight: 1 }}>—</span>;
  const s = VALUE_STYLE[value] ?? { bg: PASTEL.slate, ink: INK };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 11px",
        borderRadius: 999,
        background: s.bg,
        color: s.ink,
        border: s.outlined ? "1px solid var(--border)" : "1px solid transparent",
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}

/* Line icons — one per scope category, keyed on the stored category name. */
const CATEGORY_PATHS: Record<string, React.ReactNode> = {
  "Project Planning": (
    <>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2.5" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  "Organization Setup": (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.8 19.5a5.7 5.7 0 0 1 11.4 0" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6" />
      <path d="M17.6 19.5a5.9 5.9 0 0 0-2.4-4.4" />
    </>
  ),
  "{product} Configuration": (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
    </>
  ),
  "Workflow Automation": <path d="M13.2 2.5 5 13.4h5.6L9.8 21.5 18 10.6h-5.6z" />,
  "Data Migration": (
    <>
      <ellipse cx="12" cy="6" rx="6.8" ry="2.9" />
      <path d="M5.2 6v5.9c0 1.6 3 2.9 6.8 2.9s6.8-1.3 6.8-2.9V6" />
      <path d="M5.2 11.9v5.9c0 1.6 3 2.9 6.8 2.9s6.8-1.3 6.8-2.9v-5.9" />
    </>
  ),
  Integrations: (
    <>
      <path d="M10.2 13.4a4.4 4.4 0 0 0 6.6.5l2.6-2.6a4.4 4.4 0 0 0-6.2-6.2l-1.5 1.5" />
      <path d="M13.8 10.6a4.4 4.4 0 0 0-6.6-.5l-2.6 2.6a4.4 4.4 0 0 0 6.2 6.2l1.5-1.5" />
    </>
  ),
  "Reports & Dashboards": <path d="M4.5 20V11M9.8 20V4.6M15.1 20v-6.6M20.4 20V8.2M2.6 20h18.8" />,
  Training: (
    <>
      <path d="M2.6 8.8 12 4.2l9.4 4.6L12 13.4z" />
      <path d="M6.4 10.8v4.9c0 1.6 2.5 2.9 5.6 2.9s5.6-1.3 5.6-2.9v-4.9" />
    </>
  ),
  "Go-Live": (
    <>
      <path d="M12 2.6c2.8 2.1 4.6 5.8 4.6 9.5L12 16 7.4 12.1c0-3.7 1.8-7.4 4.6-9.5z" />
      <circle cx="12" cy="9.4" r="1.9" />
      <path d="M7.6 15.6 5.4 21l4.6-2M16.4 15.6 18.6 21 14 19" />
    </>
  ),
  "Post-Launch Support": (
    <>
      <path d="M12 21.5s-7.6-4.4-7.6-10.4a4.6 4.6 0 0 1 7.6-3.5 4.6 4.6 0 0 1 7.6 3.5c0 6-7.6 10.4-7.6 10.4z" />
      <path d="M9.4 12.2l1.7 1.7 3.5-3.5" />
    </>
  ),
  "Pricing & Plan Details": (
    <>
      <path d="M3.4 12.4 11.6 3.2a1.8 1.8 0 0 1 1.4-.6h5.4a1.8 1.8 0 0 1 1.8 1.8v5.4a1.8 1.8 0 0 1-.6 1.4L11 20.6a1.8 1.8 0 0 1-2.6 0l-5-5a1.8 1.8 0 0 1 0-2.6z" />
      <circle cx="15.8" cy="8.2" r="1.7" />
    </>
  ),
};

function CategoryIcon({ name, color }: { name: string; color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {CATEGORY_PATHS[name] ?? CATEGORY_PATHS["Project Planning"]}
    </svg>
  );
}

export function ImplementationPage() {
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [productKey, setProductKey] = useState("crm");
  const { region: headerRegion } = useRegion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllScope, setShowAllScope] = useState(false);

  const region = headerRegion === "India" ? "india" : "international";
  const product = useMemo(() => PRODUCTS.find((p) => p.key === productKey) ?? PRODUCTS[0], [productKey]);
  const packages = region === "india" ? product.india : product.international;
  const tierNames = packages.map((p) => p.name);
  const visibleCategories = showAllScope ? product.scopeCategories : product.scopeCategories.slice(0, 3);
  const hiddenCount = product.scopeCategories.length - visibleCategories.length;

  return (
    <div className="why-evoq-page">
      {/* ── Section 1: Hero ── */}
      <section className="s-why-hero">
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(71,71,224,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.6,
          }}
        />
        <div className="s-why-hero-center" style={{ maxWidth: 1100 }}>
          <motion.div {...fadeUp(0)} style={{ ...eyebrowStyle, marginBottom: 20 }}>
            Implementation
          </motion.div>
          <motion.h1 {...fadeUp(0.07)} className="evoq-h2 why-h1" style={{ marginBottom: 20 }}>
            Professional <span className="accent">Implementation</span> Services
          </motion.h1>
          <motion.p {...fadeUp(0.14)} className="evoq-sub" style={{ margin: "0 auto", maxWidth: 660 }}>
            Deploy EVOQ with confidence. From configuration and data migration to
            user training and go-live, our implementation specialists help you
            get up and running faster.
          </motion.p>
          <motion.div {...fadeUp(0.2)} style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <PrimaryButton onClick={() => setShowGetStarted(true)}>Request Implementation</PrimaryButton>
            <SecondaryButton href="/contact">Talk to an Expert</SecondaryButton>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Why Professional Implementation ── */}
      <section className="s-why-changes">
        <div className="s-why-changes-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <h2 className="evoq-h2">Why Choose <span className="accent">Expert Implementation</span>?</h2>
            <p className="why-body" style={{ margin: "16px auto 0", textAlign: "center", maxWidth: "82ch" }}>
              A successful implementation goes beyond software setup. We work alongside your team to
              reduce deployment risks, accelerate adoption, and ensure EVOQ is configured around the way your business operates.
            </p>
          </motion.div>

          <div style={{ maxWidth: 1000, margin: "48px auto 0", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {WHY_CARDS.map((card, i) => (
              <NumberedCard key={i} card={card} number={i + 1} delay={0.04 + i * 0.02} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Implementation Packages & Scope ── */}
      <section className="s-why-flexible">
        <div className="s-why-flexible-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <div style={{ ...eyebrowStyle, marginBottom: 16 }}>Choose Your Package</div>
            <h2 className="evoq-h2">Implementation <span className="accent">Packages &amp; Scope</span></h2>
            <p className="why-body" style={{ margin: "16px auto 0", textAlign: "center", maxWidth: "48ch" }}>
              Select a product to compare packages, pricing,
              timelines, and included services.
            </p>
          </motion.div>

          {/* Product tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 30 }}>
            {PRODUCTS.map((p) => {
              const active = p.key === productKey;
              const brand = PRODUCT_BRAND[p.key] ?? PRODUCT_BRAND.crm;
              const accent = brand.solid ? brand.bg : "var(--interactive)";
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setProductKey(p.key)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 22px 11px 12px",
                    borderRadius: 16,
                    border: `1.5px solid ${active ? accent : "var(--border)"}`,
                    background: active ? hexToRgba(brand.solid ? brand.bg : "#4747E0", 0.07) : "#fff",
                    cursor: "pointer",
                    boxShadow: active
                      ? `0 1px 2px rgba(31,36,48,0.04), 0 10px 24px -14px ${hexToRgba(brand.solid ? brand.bg : "#4747E0", 0.55)}`
                      : "0 1px 2px rgba(31,36,48,0.04)",
                    transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.15s",
                    transform: active ? "translateY(-1px)" : "none",
                  }}
                >
                  <ProductBadge productKey={p.key} size={32} />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: active ? accent : INK,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Unified scope + pricing table */}
          <motion.div
            key={`scope-${product.key}`}
            {...fadeUp(0.1)}
            style={{
              marginTop: 18,
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 20,
              boxShadow: "0 1px 2px rgba(31,36,48,0.04), 0 18px 40px -30px rgba(31,36,48,0.35)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 880, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFAFD" }}>
                    <th style={{ textAlign: "left", padding: "15px 20px", width: 190, fontFamily: "var(--font-display)", fontSize: 12.5, fontWeight: 700, color: INK }}>
                      Category
                    </th>
                    <th style={{ textAlign: "left", padding: "15px 20px", fontFamily: "var(--font-display)", fontSize: 12.5, fontWeight: 700, color: INK }}>
                      Service
                    </th>
                    {tierNames.map((t) => (
                      <th
                        key={t}
                        style={{
                          textAlign: "center",
                          padding: "15px 18px",
                          fontFamily: "var(--font-display)",
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: tierAccent(t).ink,
                          borderLeft: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Pricing & plan details — always visible at the top, same tier columns as the scope rows below.
                      Roomier padding + a tinted background across the whole group so it reads as a deliberate
                      highlight rather than a cramped row squeezed against the scope table. */}
                  {PLAN_ROWS.map((row, ri) => (
                    <tr key={row.label} style={{ background: CATEGORY_TINT.faint, borderTop: ri === 0 ? "none" : `1px solid ${PASTEL.lavender}` }}>
                      {ri === 0 && (
                        <td
                          rowSpan={PLAN_ROWS.length}
                          style={{
                            verticalAlign: "middle",
                            padding: "22px 20px",
                            background: CATEGORY_TINT.faint,
                            borderRight: `1px solid ${PASTEL.lavender}`,
                          }}
                        >
                          <span
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 11,
                              background: CATEGORY_TINT.bg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 12,
                            }}
                          >
                            <CategoryIcon name="Pricing & Plan Details" color={CATEGORY_TINT.ink} />
                          </span>
                          <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: CATEGORY_TINT.ink, lineHeight: 1.35 }}>
                            Pricing &amp; Plan Details
                          </span>
                        </td>
                      )}
                      <td style={{ padding: "20px 20px", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: INK }}>
                        {row.label}
                      </td>
                      {tierNames.map((t) => {
                        const pkg = packages.find((p) => p.name === t);
                        const a = tierAccent(t);
                        return (
                          <td key={t} style={{ padding: "20px 18px", textAlign: "center", borderLeft: `1px solid ${PASTEL.lavender}` }}>
                            {pkg ? (
                              <span
                                style={{
                                  display: "inline-block",
                                  fontFamily: row.emphasize ? "var(--font-display)" : "var(--font-sans)",
                                  fontSize: row.emphasize ? 19 : 13.5,
                                  fontWeight: row.emphasize ? 800 : 500,
                                  color: row.emphasize ? a.ink : INK,
                                  letterSpacing: row.emphasize ? "-0.01em" : "normal",
                                  lineHeight: 1.4,
                                }}
                              >
                                {row.value(pkg)}
                              </span>
                            ) : (
                              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontStyle: "italic", color: "var(--muted)" }}>
                                &mdash;
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {visibleCategories.flatMap((cat, ci) => {
                    const isOngoing = cat.name === "Post-Launch Support";
                    const tint = isOngoing ? { bg: PASTEL.green, ink: GREEN_INK, faint: "#F2FAF5" } : CATEGORY_TINT;
                    const label = cat.name.replace("{product}", product.label);
                    return cat.rows.map((row, ri) => (
                      <tr
                        key={`${cat.name}-${row.activity}`}
                        style={{
                          borderTop:
                            ri === 0
                              ? isOngoing
                                ? `2px dashed ${GREEN_INK}66`
                                : `2px solid var(--border)`
                              : `1px solid ${HAIRLINE}`,
                        }}
                      >
                        {ri === 0 && (
                          <td
                            rowSpan={cat.rows.length}
                            style={{
                              verticalAlign: "middle",
                              padding: "16px 20px",
                              background: tint.faint,
                              borderRight: `1px solid ${isOngoing ? PASTEL.green : "var(--border)"}`,
                              borderTop: ci === 0 ? "2px solid var(--border)" : "none",
                            }}
                          >
                            <span
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: 10,
                                background: tint.bg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 10,
                              }}
                            >
                              <CategoryIcon name={cat.name} color={tint.ink} />
                            </span>
                            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: tint.ink, lineHeight: 1.3 }}>
                              {label}
                            </span>
                            {isOngoing && (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                  marginTop: 8,
                                  padding: "3px 8px 3px 6px",
                                  borderRadius: 999,
                                  background: "#fff",
                                  border: `1px solid ${PASTEL.green}`,
                                }}
                              >
                                <span
                                  style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: GREEN_INK,
                                    flexShrink: 0,
                                  }}
                                />
                                <span
                                  style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: "0.03em",
                                    textTransform: "uppercase",
                                    color: GREEN_INK,
                                  }}
                                >
                                  Ongoing
                                </span>
                              </span>
                            )}
                          </td>
                        )}
                        <td
                          style={{
                            padding: "11px 20px",
                            fontFamily: "var(--font-sans)",
                            fontSize: 13.5,
                            color: INK,
                            background: isOngoing ? tint.faint : "transparent",
                          }}
                        >
                          {row.activity.replace("{product}", product.label)}
                        </td>
                        {row.values.slice(row.values.length - tierNames.length).map((v, vi) => (
                          <td
                            key={vi}
                            style={{
                              padding: "11px 18px",
                              textAlign: "center",
                              borderLeft: "1px solid var(--border)",
                              background: isOngoing ? tint.faint : "transparent",
                            }}
                          >
                            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                              <ScopeValue value={v} />
                            </span>
                          </td>
                        ))}
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", padding: "14px 20px", display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setShowAllScope((v) => !v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "var(--interactive)",
                }}
              >
                {showAllScope ? "Show Fewer Services" : `Show More Services (${hiddenCount})`}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: showAllScope ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: FAQ ── */}
      <section className="s-why-changes">
        <div className="s-why-changes-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <h2 className="evoq-h2">Frequently Asked <span className="accent">Questions</span></h2>
          </motion.div>

          <div style={{ maxWidth: 760, margin: "40px auto 0" }}>
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={f.q}
                  {...fadeUp(0.04 + i * 0.05)}
                  style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, marginBottom: 12, overflow: "hidden" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      gap: 16, padding: "18px 22px", background: "transparent", border: 0, cursor: "pointer",
                      fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#1F2430", textAlign: "left",
                    }}
                  >
                    {f.q}
                    <span style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "rotate(0deg)", fontSize: 20, color: "var(--interactive)", lineHeight: 1 }}>+</span>
                  </button>
                  {open && (
                    <div style={{ padding: "0 22px 20px" }}>
                      <p className="why-body" style={{ margin: 0 }}>{f.a}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 7: Closing CTA ── */}
      <section style={{ padding: "96px 80px", background: "#fff" }}>
        <motion.div
          {...fadeUp(0)}
          style={{
            position: "relative",
            overflow: "hidden",
            maxWidth: 1168,
            margin: "0 auto",
            borderRadius: 36,
            padding: "72px 64px",
            textAlign: "center",
            background: "linear-gradient(135deg, var(--interactive) 0%, var(--deep) 100%)",
          }}
        >
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", top: -160, right: -100, pointerEvents: "none" }} />
          <h2 className="evoq-h2 dark" style={{ position: "relative", zIndex: 1, marginBottom: 16 }}>
            Ready to launch EVOQ?
          </h2>
          <p className="evoq-sub dark" style={{ position: "relative", zIndex: 1, margin: "0 auto 32px", maxWidth: 560 }}>
            Let our implementation specialists configure, migrate, train, and
            deploy your EVOQ solution with confidence.
          </p>
          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setShowGetStarted(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
                borderRadius: 999, border: 0, cursor: "pointer",
                background: "#fff", color: "var(--interactive)",
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Request Implementation
            </button>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
                borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)",
                background: "transparent", color: "#fff",
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                textDecoration: "none", transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            >
              Talk to Sales
            </Link>
          </div>
        </motion.div>
      </section>

      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}
