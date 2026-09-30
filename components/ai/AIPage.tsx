"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { AIMark } from "./AIMark";

/* ---------- palette (EVOQ AI brand guidelines) ---------- */
const C = {
  deep: "#000099",
  mid: "#3333CC",
  interactive: "#4747E0",
  primary: "#5C5CFF",
  bright: "#8484FF",
  tint: "#BDBDFF",
  soft: "#F2F2FF",
  heading: "#0C2472",
  body: "#475467",
  muted: "#667085",
  light: "#98A2B3",
  border: "#E6EAF0",
  surface: "#F8FAFC",
  aiSurface: "#F5F5FF",
  aiHighlight: "#ECECFF",
  // Signature AI gradient, light background treatment (per brand guidelines: #5C5CFF -> #F2F2FF)
  aiGradientSoft: "linear-gradient(115deg, #5C5CFF 0%, #F2F2FF 100%)",
  // Saturated variant of the same sapphire family, for surfaces that carry white text
  aiGradient: "linear-gradient(115deg, #000099 0%, #3333CC 35%, #4747E0 65%, #5C5CFF 100%)",
};

/* ---------- icons ---------- */
type IP = { size?: number; stroke?: string };
const Svg = ({ size = 20, stroke = C.primary, children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const ArrowIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
const PlusIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
const MessageIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Svg>
);
const WrenchIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5V21h3.5l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.2-2.2z" />
  </Svg>
);
const CalendarIcon = (p: IP) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
);
const CardIcon = (p: IP) => (
  <Svg {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19" />
  </Svg>
);
const FlagIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M5 3v18" />
    <path d="M5 4h11l-2.5 4L16 12H5" />
  </Svg>
);
const UsersIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 19c.8-3.2 2.9-4.7 6.5-4.7s5.7 1.5 6.5 4.7" />
    <path d="M15.5 4.3c1.4.5 2.4 1.8 2.4 3.3s-1 2.8-2.4 3.3M18.5 19c-.4-2.1-1.5-3.5-3-4.2" />
  </Svg>
);
const SlidersIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M4 6h9M17 6h3M4 12h3M9 12h11M4 18h13M19 18h1" />
    <circle cx="15" cy="6" r="2" />
    <circle cx="7" cy="12" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Svg>
);
const PlugIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M9 3v5M15 3v5M7 8h10l-1 5a5 5 0 0 1-5 4 5 5 0 0 1-5-4L5 8h2zM12 17v4" />
  </Svg>
);
const TrendIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 6h6v6" />
  </Svg>
);
const RocketIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M14.5 3c2 1 4.5 4 3.9 8.4-2 .3-4-.3-5.5-1.8-1.5-1.5-2.1-3.5-1.8-5.5C12.9 3.1 13.7 3 14.5 3z" />
    <path d="M11 13 5.5 18.5M9.5 15.5 5 17M8.5 14.5 7 10" />
    <path d="M16.5 12.5c1 2 .7 4.7-.5 6.5-1.8-.3-3.5-1.3-4.5-2.8" />
  </Svg>
);
const SyncIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <circle cx="12" cy="18" r="2.4" />
    <path d="M8 7.2 16 7.2M7.5 8.2 11 16M16.5 8.2 13 16" />
  </Svg>
);
const CheckCircleIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.4 2.4L16 10" />
  </Svg>
);
const ClockIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </Svg>
);
const ChevronRightIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M9 6l6 6-6 6" />
  </Svg>
);
const MonitorIcon = (p: IP) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="14" rx="3" />
    <path d="M8 21h8M12 18v3" />
  </Svg>
);
const LightningIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
  </Svg>
);
const NetworkIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M9 6h6M6 9v6M18 9v6M9 18h6" />
  </Svg>
);
const RectIcon = (p: IP) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="14" rx="3" />
  </Svg>
);
const DollarIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M12 2v20M17 7H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6" />
  </Svg>
);
const LockIcon = (p: IP) => (
  <Svg {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Svg>
);
const SparkIcon = ({ size = 13, fill = C.primary }: { size?: number; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
  </svg>
);

/* ---------- data ---------- */
const STATS = [
  { value: "14%", label: "More issues resolved per hour", desc: "AI-assisted customer support teams resolved 14% more issues per hour on average.", color: "#5C5CFF" },
  { value: "9%", label: "Less time spent handling an issue", desc: "AI assistance reduced the average time spent handling customer issues by 9%.", color: "#4747E0" },
  { value: "3–5%", label: "Potential increase in sales productivity", desc: "AI can improve sales productivity by 3–5% through faster preparation, research, follow-up, and routine sales tasks.", color: "#3333CC" },
  { value: "30–45%", label: "Potential productivity value in customer care", desc: "AI can create productivity gains equivalent to 30–45% of current customer care costs.", color: "#000099" },
];

const CATEGORY_COLOR = {
  Growth: "#5C5CFF",
  Operations: "#4747E0",
  Finance: "#000099",
  People: "#3333CC",
  Platform: "#8484FF",
};

const SIGNALS = [
  { icon: TrendIcon, tag: "Growth", count: 3, title: "Opportunities need follow-up", desc: "Two have had no activity in 7 days." },
  { icon: WrenchIcon, tag: "Operations", count: 2, title: "Service jobs are overdue", desc: "Both linked to active accounts." },
  { icon: CardIcon, tag: "Finance", count: 4, title: "Invoices need attention", desc: "Two past payment terms." },
  { icon: FlagIcon, tag: "Operations", count: 1, title: "Project needs review", desc: "A milestone is behind schedule." },
  { icon: UsersIcon, tag: "People", count: 2, title: "Employees need attention", desc: "One certification expires this month." },
  { icon: SlidersIcon, tag: "Platform", count: 3, title: "Configurations are pending", desc: "Two awaiting customer approval." },
  { icon: PlugIcon, tag: "Platform", count: 1, title: "Integration needs review", desc: "A sync workflow failed overnight." },
].map((s) => ({ ...s, color: CATEGORY_COLOR[s.tag as keyof typeof CATEGORY_COLOR] }));

const AGENTS = [
  { icon: TrendIcon, tag: "Growth", name: "Growth agent", desc: "Prepares account briefings from CRM history, campaign engagement, and visual configuration data." },
  { icon: RocketIcon, tag: "Operations", name: "Operations agent", desc: "Prioritizes overdue work orders, project risks, and service desk issues across field and project teams." },
  { icon: UsersIcon, tag: "People", name: "People agent", desc: "Synthesizes HRMS records, skills data, and learning progress for workforce decisions." },
  { icon: CardIcon, tag: "Finance", name: "Finance agent", desc: "Targets collections from billing activity and inventory valuations." },
  { icon: SyncIcon, tag: "Platform", name: "Platform agent", desc: "Orchestrates cross-system workflows and data flows through integration pipelines." },
].map((a) => ({ ...a, color: CATEGORY_COLOR[a.tag as keyof typeof CATEGORY_COLOR] }));

const RESOURCES = [
  { img: "/ai/case-studies.jpg", tag: "Case studies", title: "Case studies", desc: "See how AI is being applied to specific business challenges.", linkText: "Read cases" },
  { img: "/ai/insights.jpg", tag: "Insights", title: "Insights", desc: "Read practical perspectives on AI, automation, and the future of business applications.", linkText: "Read insights" },
  { img: "/ai/resources.jpg", tag: "Resources", title: "Resources", desc: "Explore research, guides, and deeper perspectives on AI adoption.", linkText: "Browse resources" },
];

const FEATURES = [
  { icon: MonitorIcon, title: "Inside the applications", desc: "Use AI to find information, prepare outputs, identify what needs attention, and handle defined tasks without leaving the application." },
  { icon: LightningIcon, title: "Less preparation. More action.", desc: "Instead of gathering information manually, AI can bring the relevant details together, prepare the next step, and handle repetitive tasks." },
  { icon: NetworkIcon, title: "Across EVOQ applications", desc: "Use the same AI experience across sales, service, operations, finance, and people processes as your EVOQ environment grows." },
];

const APP_NAV = [
  { icon: TrendIcon, label: "Sales", active: true },
  { icon: MessageIcon, label: "Service" },
  { icon: RectIcon, label: "Operations" },
  { icon: DollarIcon, label: "Finance" },
  { icon: UsersIcon, label: "People" },
];

const APP_TABLE = [
  { name: "Meridian Manufacturing", owner: "Rachel Okafor", value: "$48,200", status: "Active", statusType: "t" as const, highlight: false, spark: false },
  { name: "Northgate Logistics", owner: "Stefan Meyer", value: "$31,750", status: "Follow-up", statusType: "b" as const, highlight: true, spark: true },
  { name: "Lakeside Retail Group", owner: "Anna Chen", value: "$27,900", status: "Active", statusType: "t" as const, highlight: false, spark: false },
  { name: "Summit Field Services", owner: "Jonas Cruz", value: "$19,400", status: "At risk", statusType: "p" as const, highlight: false, spark: true },
  { name: "Harborview Foods", owner: "Maria Novak", value: "$12,300", status: "Active", statusType: "t" as const, highlight: false, spark: false },
];

const APP_PILL_STYLE = {
  t: { background: "#ECECFF", color: "#3333CC" },
  b: { background: C.aiHighlight, color: C.primary },
  p: { background: "#F2F2FF", color: C.deep },
};

const APP_MINI = [
  { value: "3", label: "open deals" },
  { value: "7d", label: "no activity" },
  { value: "$86k", label: "pipeline" },
];

const APP_SIDEBAR_NAV = [
  { icon: RectIcon, label: "Home" },
  { icon: TrendIcon, label: "CRM" },
  { icon: MessageIcon, label: "Campaigns" },
  { icon: SlidersIcon, label: "ConfigX" },
  { icon: WrenchIcon, label: "ServiceOps" },
  { icon: FlagIcon, label: "Projects" },
  { icon: MessageIcon, label: "Desk" },
  { icon: UsersIcon, label: "HRMS" },
  { icon: RocketIcon, label: "Skillberry" },
  { icon: CardIcon, label: "Billing" },
  { icon: RectIcon, label: "Inventory" },
  { icon: SyncIcon, label: "Sync" },
];

const RECENT_SIGNALS = [
  { icon: TrendIcon, label: "Opportunity from Beta Inc. needs follow-up", time: "2 hours ago" },
  { icon: CardIcon, label: "Invoice INV-2841 is 15 days overdue", time: "3 hours ago" },
  { icon: FlagIcon, label: "Project website redesign milestone is delayed", time: "5 hours ago" },
];

const AGENT_TABS = [
  { icon: TrendIcon, label: "Growth", active: true },
  { icon: RocketIcon, label: "Operations" },
  { icon: UsersIcon, label: "People" },
  { icon: CardIcon, label: "Finance" },
  { icon: SyncIcon, label: "Platform" },
];

const AGENT_STEPS = [
  { label: "Gathering context", desc: "Fetching CRM history, campaign engagement and configuration activity.", status: "done" as const },
  { label: "Preparing account briefing", desc: "Analyzing key activity, customer intent and next steps.", status: "active" as const, progress: 70 },
  { label: "Drafting follow-up recommendations", desc: "Creating personalized outreach for your review.", status: "queued" as const },
];

/* ---------- gradient washes (brand: Subtle / Light) ---------- */
function GradientWash({ variant }: { variant: "subtle" | "light" }) {
  if (variant === "subtle") {
    return (
      <>
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-[560px] w-[760px] rounded-full opacity-90 blur-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${C.primary}70, transparent 65%)`, transform: "rotate(-8deg)" }}
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-[-120px] h-[400px] w-[520px] rounded-full opacity-70 blur-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${C.interactive}55, transparent 65%)` }}
        />
      </>
    );
  }
  return (
    <div
      className="pointer-events-none absolute -right-40 bottom-[-160px] h-[420px] w-[680px] rounded-full opacity-45 blur-3xl"
      style={{ background: `radial-gradient(ellipse at center, ${C.primary}22, transparent 68%)` }}
    />
  );
}

/* ---------- shared bits ---------- */
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.2em]"
      style={{ color: light ? "#fff" : C.primary }}
    >
      <AIMark size={14} />
      {children}
    </p>
  );
}

function SignalPanel() {
  return (
    <div className="rounded-[24px] bg-white ring-1 ring-[#E6EAF0] shadow-[0_24px_60px_-32px_rgba(16,42,67,0.25)]">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: C.muted }}>What EVI found</p>
        <a href="#" className="inline-flex items-center gap-1 text-[12.5px] font-bold" style={{ color: C.primary }}>
          View all
          <ArrowIcon size={12} stroke={C.primary} />
        </a>
      </div>
      <div className="divide-y" style={{ borderColor: C.border }}>
        {SIGNALS.map((s) => (
          <div key={s.title} className="flex items-center gap-3.5 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]" style={{ background: `${s.color}1A` }}>
              <s.icon size={18} stroke={s.color} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold" style={{ color: C.heading }}>{s.title}</p>
              <p className="truncate text-[12.5px]" style={{ color: C.muted }}>{s.desc}</p>
            </div>
            <span className="text-[15px] font-extrabold" style={{ color: C.heading }}>{s.count}</span>
            <ChevronRightIcon size={14} stroke={C.light} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentPanel() {
  return (
    <div className="rounded-[24px] bg-white ring-1 ring-[#E6EAF0] shadow-[0_24px_60px_-32px_rgba(16,42,67,0.25)]">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: C.muted }}>AI agents</p>
        <span className="inline-flex items-center gap-1 text-[12.5px] font-bold" style={{ color: C.muted }}>
          5 specialists
          <ChevronRightIcon size={12} stroke={C.muted} />
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: C.border }}>
        {AGENTS.map((a) => (
          <div key={a.name} className="flex items-center gap-3.5 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]" style={{ background: `${a.color}1A` }}>
              <a.icon size={18} stroke={a.color} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold" style={{ color: C.heading }}>{a.name}</p>
              <p className="truncate text-[12.5px]" style={{ color: C.muted }}>{a.desc}</p>
            </div>
            <ChevronRightIcon size={14} stroke={C.light} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HubVisual() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-[var(--font-display)] text-[22px] font-extrabold" style={{ color: C.heading }}>EVI</p>
      <p className="mt-1 text-[13px]" style={{ color: C.muted }}>Understands your business context</p>
      <div
        className="relative mt-8 flex h-[140px] w-[140px] items-center justify-center rounded-[32px] p-5"
        style={{ background: "linear-gradient(135deg, #F5F5FF 0%, #ECECFF 50%, #F0F0FF 100%)", boxShadow: "0 30px 60px -20px rgba(92,92,255,0.35)" }}
      >
        <Image src="/ai/ai-logo-icon.png" alt="EVI" width={96} height={96} className="h-full w-full rounded-[20px] object-contain" />
      </div>
      <div className="mt-8 w-full max-w-[220px] rounded-[16px] bg-white p-4 text-left" style={{ border: `1px solid ${C.border}` }}>
        {["Analyzes across applications", "Understands relationships", "Assigns to the right agent"].map((item) => (
          <div key={item} className="flex items-center gap-2.5 py-1.5">
            <CheckCircleIcon size={15} stroke={C.primary} />
            <span className="text-[12.5px] font-semibold" style={{ color: C.heading }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingSignalCard({ s }: { s: (typeof SIGNALS)[number] }) {
  return (
    <div
      className="flex w-[228px] items-start gap-3 rounded-[16px] bg-white p-4"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 24px 50px -16px rgba(0,0,0,0.45)" }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]" style={{ background: `${s.color}1A` }}>
        <s.icon size={18} stroke={s.color} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-bold leading-[1.35]" style={{ color: C.heading }}>
          {s.count} {s.title.charAt(0).toLowerCase() + s.title.slice(1)}
        </p>
        <p className="mt-1 text-[11px] leading-[1.4]" style={{ color: C.muted }}>{s.desc}</p>
      </div>
      <ChevronRightIcon size={12} stroke={C.light} />
    </div>
  );
}

function InsightsAppMockup() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] bg-white"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 50px 110px -20px rgba(0,0,0,0.55)" }}
    >
      <div className="grid" style={{ gridTemplateColumns: "220px 1fr" }}>
        <aside className="flex flex-col gap-1 p-3" style={{ background: C.surface, borderRight: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-2 px-2.5 pb-4 pt-1.5">
            <span className="h-[20px] w-[20px] rounded-[6px]" style={{ background: C.aiGradient }} />
            <span className="text-[13px] font-extrabold" style={{ color: C.heading }}>EVOQ</span>
          </div>
          {APP_SIDEBAR_NAV.map((n) => (
            <span key={n.label} className="flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[12px] font-semibold" style={{ color: C.muted }}>
              <n.icon size={14} stroke={C.muted} />
              {n.label}
            </span>
          ))}
        </aside>

        <div className="flex flex-col">
          <div className="flex items-center gap-4 px-6 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
            <span className="flex-1 rounded-[9px] px-3.5 py-2 text-[12.5px]" style={{ background: C.surface, color: C.light, border: `1px solid ${C.border}` }}>
              Search anything…
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: C.surface }}>
              <Svg size={15} stroke={C.muted}>
                <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" />
                <path d="M10 18a2 2 0 0 0 4 0" />
              </Svg>
            </span>
            <span className="flex shrink-0 items-center gap-2.5 pl-3" style={{ borderLeft: `1px solid ${C.border}` }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: C.primary }}>
                DA
              </span>
              <span>
                <p className="text-[12px] font-bold leading-tight" style={{ color: C.heading }}>David Anderson</p>
                <p className="text-[10.5px] leading-tight" style={{ color: C.muted }}>Acme Corporation</p>
              </span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5 p-6">
            {/* EVI panel */}
            <div className="rounded-[18px] p-5" style={{ border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-3">
                <Image src="/ai/ai-logo-icon.png" alt="EVI" width={40} height={40} className="rounded-[12px]" />
                <div>
                  <p className="text-[14px] font-extrabold" style={{ color: C.heading }}>EVI</p>
                  <p className="text-[11px]" style={{ color: C.muted }}>Your AI assistant</p>
                </div>
                <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: C.aiHighlight, color: C.interactive }}>
                  <span className="h-[6px] w-[6px] rounded-full" style={{ background: C.primary }} />
                  Analyzing across EVOQ…
                </span>
              </div>

              <p className="mt-4 text-[13px] leading-[1.65]" style={{ color: C.body }}>
                I&apos;ve found <strong style={{ color: C.heading }}>18 signals</strong> that need your attention. The
                Growth agent is preparing an account briefing for <strong style={{ color: C.heading }}>3 opportunities</strong>.
              </p>

              <div className="mt-4 space-y-2">
                {["Analyzes across applications", "Understands relationships", "Assigns to the right agent"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircleIcon size={14} stroke={C.primary} />
                    <span className="text-[12.5px] font-semibold" style={{ color: C.heading }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                <p className="text-[12px] font-extrabold" style={{ color: C.heading }}>Recent signals</p>
                <span className="inline-flex items-center gap-1 text-[11.5px] font-bold" style={{ color: C.primary }}>
                  View all
                  <ArrowIcon size={11} stroke={C.primary} />
                </span>
              </div>
              <div className="mt-1">
                {RECENT_SIGNALS.map((r) => (
                  <div key={r.label} className="flex items-center gap-2.5 py-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]" style={{ background: C.aiHighlight }}>
                      <r.icon size={13} stroke={C.primary} />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12px] font-semibold" style={{ color: C.heading }}>{r.label}</span>
                    <span className="shrink-0 text-[10.5px]" style={{ color: C.light }}>{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth agent panel */}
            <div className="rounded-[18px] p-5" style={{ border: `1px solid ${C.border}` }}>
              <div className="flex flex-wrap items-center gap-1.5 border-b pb-3" style={{ borderColor: C.border }}>
                {AGENT_TABS.map((t) => (
                  <span
                    key={t.label}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-bold"
                    style={t.active ? { background: C.aiHighlight, color: C.primary } : { color: C.muted }}
                  >
                    <t.icon size={12} stroke={t.active ? C.primary : C.muted} />
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]" style={{ background: `${CATEGORY_COLOR.Growth}1A` }}>
                  <UsersIcon size={18} stroke={CATEGORY_COLOR.Growth} />
                </span>
                <div>
                  <p className="text-[14px] font-extrabold" style={{ color: C.heading }}>Growth agent</p>
                  <p className="text-[11px]" style={{ color: C.muted }}>Working on 3 opportunities</p>
                </div>
                <span className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: C.aiHighlight, color: C.interactive }}>
                  In progress
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {AGENT_STEPS.map((step) => (
                  <div key={step.label} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={
                        step.status === "done"
                          ? { background: C.primary }
                          : step.status === "active"
                            ? { border: `2px solid ${C.primary}` }
                            : { border: `1.5px dashed ${C.border}` }
                      }
                    >
                      {step.status === "done" && <CheckCircleIcon size={12} stroke="#fff" />}
                      {step.status === "active" && <span className="h-2 w-2 rounded-full" style={{ background: C.primary }} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold" style={{ color: step.status === "queued" ? C.light : C.heading }}>
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-[11.5px] leading-[1.5]" style={{ color: step.status === "queued" ? C.light : C.muted }}>
                        {step.desc}
                      </p>
                      {step.status === "active" && "progress" in step && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: C.border }}>
                            <div className="h-full rounded-full" style={{ width: `${step.progress}%`, background: `linear-gradient(90deg, ${C.tint}, ${C.primary})` }} />
                          </div>
                          <span className="shrink-0 text-[10.5px] font-bold" style={{ color: C.primary }}>{step.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <button type="button" className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[12.5px] font-bold text-white" style={{ background: C.primary }}>
                  Review &amp; approve
                  <ArrowIcon size={12} stroke="#fff" />
                </button>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[12.5px] font-bold" style={{ color: C.heading, border: `1px solid ${C.border}` }}>
                  View opportunities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroEviPanel() {
  return (
    <div className="relative" style={{ animation: "aiFloaty 7s ease-in-out infinite" }}>
      <div
        className="pointer-events-none absolute rounded-full opacity-20 blur-3xl"
        style={{ width: "80%", height: 180, top: "50%", left: "10%", transform: "translateY(-50%)", background: `radial-gradient(circle, ${C.primary}55, transparent 70%)` }}
      />
      <div
        className="relative overflow-hidden rounded-[22px] bg-white p-6"
        style={{ border: `1px solid ${C.border}`, boxShadow: "0 32px 80px rgba(12,36,114,0.14)" }}
      >
        <Image
          src="/ai/ai-logo-icon.png"
          alt=""
          width={230}
          height={200}
          aria-hidden="true"
          className="pointer-events-none absolute object-contain opacity-[0.075]"
          style={{ right: -58, bottom: -66, width: 230, height: 200, transform: "rotate(-10deg)" }}
        />

        <div className="relative flex items-center gap-2 border-b pb-3.5" style={{ borderColor: C.border, margin: "-6px -6px 18px" }}>
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
          <span className="ml-1 text-[12px] font-bold" style={{ color: C.heading }}>EVOQ · Sales</span>
        </div>

        <div className="relative mb-[18px] flex items-center gap-3">
          <Image src="/ai/ai-logo-icon.png" alt="EVI" width={38} height={38} className="shrink-0 rounded-[11px]" style={{ boxShadow: "0 6px 18px rgba(92,92,255,0.28)" }} />
          <div>
            <p className="text-[15px] font-extrabold" style={{ color: C.heading }}>EVI</p>
            <p className="mt-0.5 text-[11px]" style={{ color: C.muted }}>AI assistant · across EVOQ</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-bold" style={{ color: C.primary }}>
            <i className="h-[7px] w-[7px] rounded-full" style={{ background: C.primary, animation: "aiPulse 1.8s ease infinite" }} />
            Active
          </span>
        </div>

        <div className="relative rounded-[14px] p-4 text-[13px] leading-[1.6]" style={{ background: C.aiHighlight, color: "#334155" }}>
          <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em]" style={{ color: C.primary }}>Generated summary</p>
          Recent account activity, outstanding actions and the next follow-up have been brought together for review.{" "}
          <b style={{ color: C.heading }}>3 opportunities</b> need follow-up and <b style={{ color: C.heading }}>4 invoices</b> need attention.
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {[
            { label: "Account summary", color: C.primary },
            { label: "Outstanding invoices", color: C.interactive },
            { label: "Prepare follow-up", color: C.deep },
          ].map((c) => (
            <span
              key={c.label}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold"
              style={{ color: C.heading, background: C.surface, border: `1px solid ${C.border}` }}
            >
              <i className="h-[7px] w-[7px] rounded-full" style={{ background: c.color }} />
              {c.label}
            </span>
          ))}
        </div>

        <div className="relative mt-4 flex items-center gap-2.5 rounded-[12px] bg-white px-3.5 py-3 text-[13px]" style={{ border: `1px solid ${C.border}`, color: C.light }}>
          Ask EVI anything across your records…
          <span className="ml-auto flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px]" style={{ background: C.primary }}>
            <ArrowIcon size={12} stroke="#fff" />
          </span>
        </div>
      </div>

      <div
        className="absolute flex items-center gap-2.5 rounded-[16px] bg-white px-4 py-3.5"
        style={{ border: `1px solid ${C.border}`, boxShadow: "0 18px 44px rgba(12,36,114,0.12)", top: -26, right: -18, animation: "aiFloaty 6s ease-in-out .8s infinite" }}
      >
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px]" style={{ background: C.aiHighlight }}>
          <TrendIcon size={16} stroke={C.primary} />
        </span>
        <div>
          <p className="text-[20px] font-black leading-none tracking-[-0.02em]" style={{ color: C.heading }}>14%</p>
          <p className="mt-1 text-[11px] font-semibold leading-[1.35]" style={{ color: C.muted }}>more issues<br />resolved per hour</p>
        </div>
      </div>

      <div
        className="absolute flex items-center gap-2.5 rounded-[16px] bg-white px-4 py-3.5"
        style={{ border: `1px solid ${C.border}`, boxShadow: "0 18px 44px rgba(12,36,114,0.12)", bottom: -38, left: -30, animation: "aiFloaty 6.6s ease-in-out .3s infinite" }}
      >
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px]" style={{ background: C.aiHighlight }}>
          <ClockIcon size={16} stroke={C.interactive} />
        </span>
        <div>
          <p className="text-[20px] font-black leading-none tracking-[-0.02em]" style={{ color: C.heading }}>9%</p>
          <p className="mt-1 text-[11px] font-semibold leading-[1.35]" style={{ color: C.muted }}>less time handling<br />each issue</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes aiFloaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes aiPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(92,92,255,0.45); }
          50% { box-shadow: 0 0 0 6px rgba(92,92,255,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ---------- page ---------- */
export function AIPage() {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <div style={{ background: "#fff" }}>
      {/* ===== 1. HERO ===== */}
      <section id="hero" className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.aiSurface} 0%, #fff 100%)`, scrollMarginTop: 96 }}>
        <div className="pointer-events-none absolute -left-32 -top-32 h-[440px] w-[440px] rounded-full opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${C.primary}30, transparent 70%)` }} />
        <div className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl" style={{ background: `radial-gradient(circle, ${C.primary}30, transparent 70%)` }} />

        <div className="relative px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
            <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h1 className="font-[var(--font-display)] text-[48px] font-extrabold leading-[1.08] tracking-[-0.02em]" style={{ color: "#0B1220" }}>
                  AI that runs
                  <br />
                  your{" "}
                  <span
                    style={{
                      background: `linear-gradient(90deg, ${C.interactive}, ${C.primary})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    processes
                  </span>
                </h1>
                <p className="mt-6 max-w-[540px] text-[17px] leading-[1.75]" style={{ color: C.body }}>
                  Transform your sales, service, operations, finance, and people systems with specialized AI agents.
                  EVOQ fuses AI agents into your existing business environment, where they understand underlying
                  data, execute workflows, and manage the processes behind each task.
                </p>
              </div>

              <HeroEviPanel />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. MEET THE AI BEHIND EVOQ ===== */}
      <section id="meet-ai" className="relative" style={{ scrollMarginTop: 96 }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
            <div
              className="relative overflow-hidden rounded-[36px] p-8 sm:p-12 lg:p-16"
              style={{ background: `linear-gradient(160deg, #F8F8FF 0%, ${C.tint}55 55%, #C7C7FF 100%)` }}
            >
              <GradientWash variant="subtle" />
              <div className="relative text-center">
                <Eyebrow>Meet the AI behind EVOQ</Eyebrow>
                <h2 className="mx-auto mt-5 max-w-[560px] font-[var(--font-display)] text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] sm:text-[30px] lg:max-w-none lg:whitespace-nowrap lg:text-[34px]" style={{ color: C.heading }}>
                  EVI is the assistant. AI agents are the specialists.
                </h2>
                <p className="mt-6 text-[16px] leading-[1.75]" style={{ color: C.body }}>
                  EVI helps you find information, understand activity, prepare outputs, and take action across EVOQ.
                  AI agents handle defined tasks that require multiple steps, from qualifying an enquiry to preparing
                  a service follow-up or checking outstanding invoices.
                </p>
                <p className="mt-4 text-[16px] font-semibold leading-[1.75]" style={{ color: C.heading }}>
                  Together, they give you two ways to use AI: get help when you need it, or assign a task when you
                  want it handled.
                </p>
              </div>

              <div className="relative mt-14 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[26px] bg-white p-8" style={{ border: `1px solid ${C.border}`, boxShadow: "0 24px 60px -32px rgba(16,42,67,0.18)" }}>
                  <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white" style={{ background: C.primary }}>
                    EVI
                  </span>
                  <h3 className="mt-5 font-[var(--font-display)] text-[22px] font-bold leading-[1.3]" style={{ color: C.heading }}>
                    Your AI assistant across EVOQ
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7]" style={{ color: C.body }}>
                    EVI helps you work with the information across your EVOQ applications. Ask for an account
                    summary, find an outstanding invoice, review project activity, prepare a customer response, or
                    identify what needs attention. EVI brings the relevant information together and helps you take
                    the next step without searching through individual records.
                  </p>

                  {/* supporting UI: EVI chat mockup */}
                  <div className="mt-6 overflow-hidden rounded-[16px]" style={{ border: `1px solid ${C.border}` }}>
                    <div className="flex items-center justify-between px-4 py-2.5" style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                      <div className="flex items-center gap-2.5">
                        <span className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F87171" }} />
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FBBF24" }} />
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#34D399" }} />
                        </span>
                        <span className="text-[12px] font-bold" style={{ color: C.heading }}>EVI · Assistant</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: C.muted }}>
                        <span className="h-2 w-2 rounded-full" style={{ background: "#34D399" }} />
                        Online
                      </span>
                    </div>

                    <div className="bg-white p-4">
                      <div className="flex justify-end">
                        <div className="max-w-[85%] rounded-[14px] rounded-tr-sm px-4 py-2.5 text-[12.5px] font-semibold text-white" style={{ background: C.primary }}>
                          Which invoices are past payment terms?
                        </div>
                      </div>

                      <div className="mt-3 flex items-start gap-2.5">
                        <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full" style={{ background: C.primary }} />
                        <div className="flex-1 rounded-[14px] rounded-tl-sm p-3.5" style={{ background: C.aiHighlight }}>
                          <p className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: C.interactive }}>
                            EVI · Generated answer
                          </p>
                          <p className="mt-1.5 text-[12.5px] leading-[1.6]" style={{ color: C.heading }}>
                            <strong>2 invoices</strong> are past terms at <strong>Northgate Logistics</strong>, totaling{" "}
                            <strong>$31,750</strong> — INV-1042 is 6 days overdue. I&apos;ve drafted a follow-up for your review.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold" style={{ color: C.interactive, border: `1px solid ${C.border}` }}>
                              Open invoices
                            </span>
                            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold" style={{ color: C.interactive, border: `1px solid ${C.border}` }}>
                              Review draft
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#fff", borderTop: `1px solid ${C.border}` }}>
                      <span className="flex-1 text-[12.5px]" style={{ color: C.light }}>Ask EVI anything…</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: C.primary }}>
                        <ArrowIcon size={13} stroke="#fff" />
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 pt-5" style={{ borderTop: `1px dashed ${C.border}` }}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ border: `1.5px solid ${C.primary}` }}>
                      <PlusIcon size={10} stroke={C.primary} />
                    </span>
                    <p className="text-[12.5px] leading-[1.6]" style={{ color: C.muted }}>
                      Ask in plain language — EVI gathers the records, activity and context, then prepares the next
                      step with you.
                    </p>
                  </div>
                </div>

                <div className="rounded-[26px] bg-white p-8" style={{ border: `1px solid ${C.border}`, boxShadow: "0 24px 60px -32px rgba(16,42,67,0.18)" }}>
                  <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]" style={{ background: C.aiHighlight, color: C.interactive }}>
                    AI agents
                  </span>
                  <h3 className="mt-5 font-[var(--font-display)] text-[22px] font-bold leading-[1.3]" style={{ color: C.heading }}>
                    Specialists for defined tasks
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7]" style={{ color: C.body }}>
                    AI agents take on specific jobs that involve multiple steps. An agent can qualify an enquiry,
                    prepare a follow-up, review a service request, check overdue invoices, or compile a project
                    update. Each agent follows the task it is assigned, works with the information available to it,
                    and completes the actions within its defined scope.
                  </p>

                  {/* supporting UI: agent task progression */}
                  <div className="mt-6 rounded-[16px]" style={{ border: `1px solid ${C.border}` }}>
                    {[
                      { label: "Qualify inbound enquiry — Northgate", status: "done" as const },
                      { label: "Prepare service follow-up", status: "active" as const, progress: 60 },
                      { label: "Check overdue invoices", status: "queued" as const },
                    ].map((step, i, arr) => (
                      <div key={step.label} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? "border-b" : ""}`} style={{ borderColor: C.border }}>
                        {step.status === "done" ? (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: C.primary }}>
                            <CheckCircleIcon size={13} stroke="#fff" />
                          </span>
                        ) : step.status === "active" ? (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: C.primary }}>
                            <span className="h-2 w-2 rounded-full bg-white" />
                          </span>
                        ) : (
                          <span className="h-6 w-6 shrink-0 rounded-full" style={{ border: `1.5px dashed ${C.border}` }} />
                        )}
                        <span
                          className="flex-1 text-[13px] font-semibold"
                          style={{ color: step.status === "queued" ? C.light : C.heading }}
                        >
                          {step.label}
                        </span>
                        {step.status === "done" && (
                          <span className="text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: C.primary }}>Done</span>
                        )}
                        {step.status === "active" && (
                          <div className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full" style={{ background: C.border }}>
                            <div className="h-full rounded-full" style={{ width: `${step.progress}%`, background: `linear-gradient(90deg, ${C.tint}, ${C.primary})` }} />
                          </div>
                        )}
                        {step.status === "queued" && (
                          <span className="text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: C.light }}>Queued</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 pt-5" style={{ borderTop: `1px dashed ${C.border}` }}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ border: `1.5px solid ${C.primary}` }}>
                      <CheckCircleIcon size={11} stroke={C.primary} />
                    </span>
                    <p className="text-[12.5px] leading-[1.6]" style={{ color: C.muted }}>
                      Assign the task — the agent executes each step inside its defined scope and reports back when
                      done.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 3. STATS ===== */}
      <section id="intelligent-operators" className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.soft} 0%, #FFFFFF 100%)`, scrollMarginTop: 96 }}>
        <GradientWash variant="light" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-12 lg:py-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-6" style={{ background: C.primary }} />
              <p className="text-[12.5px] font-bold uppercase tracking-[0.2em]" style={{ color: C.primary }}>
                The impact
              </p>
            </div>
            <h2 className="mt-4 font-[var(--font-display)] text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[30px]" style={{ color: C.heading }}>
              Turn everyday applications into intelligent operators
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: C.body }}>
              When AI works inside the applications that hold your sales, service, operations, finance, and
              people data, it can reduce routine effort and improve how quickly teams handle important tasks.
            </p>

            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {STATS.map((s, i) => (
                <div key={s.label} className={i > 0 ? "lg:border-l lg:border-[#E6EAF0] lg:pl-8" : ""}>
                  <p className="font-[var(--font-display)] text-[32px] font-extrabold leading-none tracking-[-0.02em] sm:text-[38px]" style={{ color: s.color }}>
                    {s.value}
                  </p>
                  <p className="mt-2.5 text-[14px] font-bold leading-[1.4]" style={{ color: C.heading }}>
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.6]" style={{ color: C.muted }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ===== 4. WHERE RECORDS, PROCESSES, AND AI MEET ===== */}
      <section id="records-processes-ai" className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.aiSurface} 0%, #FFFFFF 55%)`, scrollMarginTop: 96 }}>
        <div className="pointer-events-none absolute -right-40 -top-24 h-[440px] w-[620px] rounded-full opacity-50 blur-3xl" style={{ background: `radial-gradient(ellipse at center, ${C.primary}18, transparent 65%)` }} />
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:items-start">
              <div>
                <Eyebrow>Where your records, processes, and AI meet</Eyebrow>
                <h2 className="mt-5 font-[var(--font-display)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[38px]" style={{ color: C.heading }}>
                  AI built into EVOQ
                </h2>
                <p className="mt-5 max-w-[440px] text-[16px] leading-[1.75]" style={{ color: C.body }}>
                  AI in EVOQ is part of the application experience, not another tool sitting outside it. EVOQ
                  combines EVI and specialized AI agents with the applications where your records, processes, and
                  activity already live.
                </p>
                <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-bold" style={{ color: C.primary }}>
                  Explore EVOQ applications
                  <ArrowIcon size={14} stroke={C.primary} />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:pt-1.5">
                {FEATURES.map((f) => (
                  <div key={f.title}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-[14px]" style={{ background: C.aiHighlight }}>
                      <f.icon size={20} stroke={C.primary} />
                    </span>
                    <h4 className="mt-4 text-[16px] font-extrabold leading-[1.3]" style={{ color: C.heading }}>{f.title}</h4>
                    <p className="mt-1.5 text-[13.5px] leading-[1.65]" style={{ color: C.body }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* app window mockup */}
            <div
              className="relative mt-16 hidden overflow-hidden rounded-[22px] bg-white lg:block"
              style={{ border: `1px solid ${C.border}`, boxShadow: "0 34px 90px -30px rgba(12,36,114,0.25)" }}
            >
              <div className="flex items-center gap-2 px-4.5 py-3" style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
                </span>
                <span className="ml-3 inline-flex items-center gap-1.5 rounded-[8px] bg-white px-3 py-1.5 text-[11px] font-semibold" style={{ color: C.muted, border: `1px solid ${C.border}` }}>
                  <LockIcon size={10} stroke={C.primary} />
                  app.evoq.com/sales/accounts
                </span>
              </div>

              <div className="grid" style={{ gridTemplateColumns: "170px 1fr 300px" }}>
                <aside className="flex flex-col gap-1 p-2.5" style={{ background: C.surface, borderRight: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2 px-2.5 pb-3.5 pt-1.5">
                    <span className="h-[18px] w-[18px] rounded-[6px]" style={{ background: C.aiGradient }} />
                    <span className="text-[12px] font-extrabold" style={{ color: C.heading }}>EVOQ</span>
                  </div>
                  {APP_NAV.map((n) => (
                    <span
                      key={n.label}
                      className="flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[12px] font-semibold"
                      style={n.active ? { background: "#fff", color: C.primary, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(12,36,114,0.07)" } : { color: C.muted }}
                    >
                      <n.icon size={14} stroke={n.active ? C.primary : C.muted} />
                      {n.label}
                    </span>
                  ))}
                  <div className="mt-auto flex items-center gap-2 rounded-[9px] px-2.5 py-2.5 text-[11px] font-extrabold" style={{ background: C.aiHighlight, color: C.heading }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: C.primary }} />
                    EVI is active
                  </div>
                </aside>

                <main className="p-5">
                  <div className="mb-3.5 flex items-center gap-2.5">
                    <h5 className="text-[14px] font-extrabold" style={{ color: C.heading }}>Accounts</h5>
                    <span className="ml-auto rounded-[8px] px-2.5 py-1.5 text-[11px]" style={{ color: C.light, border: `1px solid ${C.border}` }}>Search records…</span>
                    <span className="rounded-[8px] px-3 py-1.5 text-[11px] font-bold text-white" style={{ background: C.primary }}>+ New</span>
                  </div>
                  <div className="overflow-hidden rounded-[12px]" style={{ border: `1px solid ${C.border}` }}>
                    <div className="grid items-center gap-2.5 px-3.5 py-2.5 text-[9.5px] font-extrabold uppercase tracking-[0.06em]" style={{ gridTemplateColumns: "1.4fr .9fr .7fr .8fr 24px", background: C.surface, color: C.light }}>
                      <span>Account</span><span>Owner</span><span>Value</span><span>Status</span><span />
                    </div>
                    {APP_TABLE.map((row) => (
                      <div
                        key={row.name}
                        className="grid items-center gap-2.5 px-3.5 py-2.5 text-[11.5px]"
                        style={{ gridTemplateColumns: "1.4fr .9fr .7fr .8fr 24px", background: row.highlight ? C.aiHighlight : "transparent", borderTop: `1px solid ${C.surface}` }}
                      >
                        <span className="truncate font-bold" style={{ color: C.heading }}>{row.name}</span>
                        <span className="truncate" style={{ color: C.muted }}>{row.owner}</span>
                        <span className="font-bold tabular-nums" style={{ color: C.heading }}>{row.value}</span>
                        <span className="w-fit rounded-full px-2 py-1 text-[9px] font-extrabold uppercase" style={APP_PILL_STYLE[row.statusType]}>{row.status}</span>
                        <span className="flex h-4 w-4 items-center justify-center">{row.spark && <SparkIcon size={13} fill={C.primary} />}</span>
                      </div>
                    ))}
                  </div>
                </main>

                <aside className="flex flex-col gap-3 p-4.5" style={{ background: C.aiSurface, borderLeft: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2.5">
                    <Image src="/ai/ai-logo-icon.png" alt="EVI" width={34} height={34} className="rounded-[10px]" />
                    <div>
                      <p className="text-[13px] font-extrabold" style={{ color: C.heading }}>EVI</p>
                      <p className="text-[11px]" style={{ color: C.muted }}>Account briefing</p>
                    </div>
                  </div>
                  <div className="rounded-[12px] bg-white p-3.5 text-[11.5px] leading-[1.6]" style={{ border: "1px solid #DCE8FA", color: "#334155" }}>
                    <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.06em]" style={{ color: C.interactive }}>Generated briefing</p>
                    <strong>Northgate Logistics</strong> — no activity in 7 days. Last touch: configuration proposal
                    sent Tuesday. Suggested next step: follow-up call with updated pricing.
                  </div>
                  <div className="flex gap-2">
                    {APP_MINI.map((m) => (
                      <div key={m.label} className="flex-1 rounded-[10px] bg-white p-2.5 text-center" style={{ border: `1px solid ${C.border}` }}>
                        <p className="text-[15px] font-black" style={{ color: C.heading }}>{m.value}</p>
                        <p className="text-[9.5px] font-semibold" style={{ color: C.muted }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="mt-auto rounded-[9px] py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#4747E0]" style={{ background: C.primary }}>
                    Prepare follow-up
                  </button>
                </aside>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 5. SURFACE WHAT MATTERS ===== */}
      <section id="surface-execute" className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #050524 0%, #14146B 28%, #3333CC 60%, #4747E0 84%, #5C5CFF 100%)", scrollMarginTop: 96 }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 18% 12%, rgba(255,255,255,0.14), transparent 34%), radial-gradient(circle at 84% 88%, rgba(255,255,255,0.1), transparent 32%)" }} />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl" style={{ background: `radial-gradient(circle, ${C.bright}45, transparent 70%)` }} />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl" style={{ background: `radial-gradient(circle, ${C.bright}45, transparent 70%)` }} />

        <div className="relative px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-20 lg:py-24">

            {/* heading, flanked by floating signal cards that funnel down into the workspace (desktop) */}
            <div className="relative mx-auto lg:min-h-[470px]" style={{ maxWidth: 1200 }}>
              <svg className="pointer-events-none absolute inset-0 hidden lg:block" width="1200" height="470" viewBox="0 0 1200 470" fill="none">
                {[
                  { s: SIGNALS[0], x1: 228, y1: 52 },
                  { s: SIGNALS[1], x1: 258, y1: 172 },
                  { s: SIGNALS[2], x1: 228, y1: 292 },
                ].map(({ s, x1, y1 }) => (
                  <path key={s.title} d={`M${x1} ${y1} C ${(x1 + 420) / 2} ${y1}, ${(x1 + 420) / 2} 180, 420 180`} stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                ))}
                {[
                  { s: SIGNALS[3], x2: 970, y1: 62 },
                  { s: SIGNALS[4], x2: 925, y1: 177 },
                  { s: SIGNALS[5], x2: 942, y1: 292 },
                  { s: SIGNALS[6], x2: 957, y1: 407 },
                ].map(({ s, x2, y1 }) => (
                  <path key={s.title} d={`M${x2} ${y1} C ${(x2 + 780) / 2} ${y1}, ${(x2 + 780) / 2} 200, 780 200`} stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                ))}
                <path d="M420 180 C 500 180, 500 466, 600 466" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" fill="none" />
                <path d="M780 200 C 700 200, 700 466, 600 466" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" fill="none" />
                <circle cx="420" cy="180" r="4" fill="#FFFFFF" fillOpacity="0.7" />
                <circle cx="780" cy="200" r="4" fill="#FFFFFF" fillOpacity="0.7" />
              </svg>

              <div className="absolute left-0 top-0 hidden lg:block"><FloatingSignalCard s={SIGNALS[0]} /></div>
              <div className="absolute left-[30px] top-[120px] hidden lg:block"><FloatingSignalCard s={SIGNALS[1]} /></div>
              <div className="absolute left-0 top-[240px] hidden lg:block"><FloatingSignalCard s={SIGNALS[2]} /></div>
              <div className="absolute right-0 top-[10px] hidden lg:block"><FloatingSignalCard s={SIGNALS[3]} /></div>
              <div className="absolute right-[45px] top-[125px] hidden lg:block"><FloatingSignalCard s={SIGNALS[4]} /></div>
              <div className="absolute right-[28px] top-[240px] hidden lg:block"><FloatingSignalCard s={SIGNALS[5]} /></div>
              <div className="absolute right-[13px] top-[355px] hidden lg:block"><FloatingSignalCard s={SIGNALS[6]} /></div>

              <div className="relative z-10 mx-auto max-w-[680px] text-center lg:max-w-[560px] lg:pt-9">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.2em]" style={{ color: C.tint }}>
                  From insights to action
                </p>
                <h2 className="mt-5 font-[var(--font-display)] text-[32px] font-extrabold leading-[1.2] tracking-[-0.02em] text-white sm:text-[40px]">
                  See what needs attention.
                  <br />
                  Let AI handle the{" "}
                  <span style={{ background: `linear-gradient(90deg, ${C.tint}, #fff)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                    next step.
                  </span>
                </h2>
                <p className="mt-6 text-[16px] leading-[1.75] text-white/75">
                  EVI continuously analyzes activity across EVOQ to surface the issues, opportunities and tasks that
                  need attention. When something requires more than an answer, the right AI agent takes the next
                  steps within its defined scope.
                </p>
              </div>
            </div>

            {/* mobile / tablet: stacked, no connector diagram */}
            <div className="mt-14 flex flex-col items-center gap-8 lg:hidden">
              <div className="w-full max-w-[480px]"><SignalPanel /></div>
              <HubVisual />
              <div className="w-full max-w-[480px]"><AgentPanel /></div>
            </div>

            {/* desktop: the live EVOQ workspace the signals funnel into */}
            <div className="relative z-10 mx-auto -mt-0.5 hidden lg:block" style={{ maxWidth: 1200 }}>
              <InsightsAppMockup />
            </div>

          </div>
        </div>
      </section>

      {/* ===== 6. SEE WHAT AI IS MAKING POSSIBLE ===== */}
      <section id="ai-insights" className="relative" style={{ scrollMarginTop: 96 }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
            <div className="mx-auto max-w-[680px] text-center">
              <Eyebrow>Learn</Eyebrow>
              <h2 className="mt-5 font-[var(--font-display)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[38px]" style={{ color: C.heading }}>
                See what AI is making possible
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75]" style={{ color: C.body }}>
                Explore practical examples, product updates, research, and perspectives on applying AI to everyday
                business processes.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {RESOURCES.map((r) => (
                <a
                  key={r.title}
                  href="#"
                  className="group block overflow-hidden rounded-[22px] bg-white no-underline transition-all duration-300 hover:-translate-y-1.5"
                  style={{ border: `1px solid ${C.border}`, boxShadow: "0 10px 30px -20px rgba(12,36,114,0.15)" }}
                >
                  <div className="relative h-[172px] overflow-hidden">
                    <Image
                      src={r.img}
                      alt={r.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(12,36,114,0.35))" }} />
                    <span
                      className="absolute left-3 top-3 rounded-full px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-white backdrop-blur"
                      style={{ background: "rgba(12,36,114,0.45)", border: "1px solid rgba(255,255,255,0.25)" }}
                    >
                      {r.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[var(--font-display)] text-[22px] font-extrabold tracking-[-0.01em]" style={{ color: C.heading }}>
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.65]" style={{ color: C.muted }}>
                      {r.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-extrabold transition-all duration-200 group-hover:gap-2.5" style={{ color: C.primary }}>
                      {r.linkText}
                      <ArrowIcon size={13} stroke={C.primary} />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-11 flex justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-[14px] font-bold no-underline transition-all hover:-translate-y-0.5"
                style={{ color: C.primary, border: "1px solid #D6D6FF" }}
              >
                Explore AI insights
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 7. FINAL CTA ===== */}
      <section id="final-cta" className="relative" style={{ scrollMarginTop: 96 }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-10 lg:py-14">
            <div
              className="relative overflow-hidden rounded-[32px] px-8 py-16 text-center sm:px-16 sm:py-20"
              style={{ background: C.aiGradient, boxShadow: "0 30px 80px -20px rgba(92,92,255,0.35)" }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(circle at 22% 25%, rgba(255,255,255,0.24), transparent 32%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.14), transparent 30%)" }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage: "repeating-linear-gradient(115deg, rgba(255,255,255,0.12) 0 2px, transparent 2px 26px)",
                  WebkitMaskImage: "linear-gradient(120deg, transparent 30%, #000 80%)",
                  maskImage: "linear-gradient(120deg, transparent 30%, #000 80%)",
                }}
              />
              <Image
                src="/ai/ai-logo-icon.png"
                alt=""
                width={420}
                height={420}
                className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 rotate-[-10deg] opacity-[0.16] sm:block"
              />

              <div className="relative">
                <p className="text-[12.5px] font-extrabold uppercase tracking-[0.2em] text-white">Get started</p>
                <h2 className="mx-auto mt-5 max-w-[680px] font-[var(--font-display)] text-[32px] font-black leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px]">
                  The execution layer for your business operations
                </h2>
                <p className="mx-auto mt-5 max-w-[600px] text-[16.5px] leading-[1.7] text-white/90">
                  See how EVI and AI agents work inside EVOQ applications to help your teams find information,
                  handle defined tasks, and get more done.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowGetStarted(true)}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-white px-7 py-3.5 text-[15px] font-extrabold transition-transform hover:-translate-y-0.5"
                    style={{ color: C.heading }}
                  >
                    Book a demo
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-[10px] px-7 py-3.5 text-[15px] font-extrabold text-white no-underline ring-1 ring-white/55 transition-colors hover:bg-white/10"
                  >
                    Talk to an expert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}
