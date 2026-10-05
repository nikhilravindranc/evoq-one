"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { AIMark } from "@/components/ai/AIMark";
import { HeroWindow } from "@/components/evoq-ai/HeroWindow";
import { ScaleFit } from "@/components/evoq-ai/ScaleFit";


/* ---------- motion helpers ---------- */
const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, margin: "-80px" } as const;
const rise: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const group = (gap = 0.09, delay = 0): Variants => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } });
const reveal = (delay = 0, y = 28, x = 0) => ({
  initial: { opacity: 0, y, x },
  whileInView: { opacity: 1, y: 0, x: 0 },
  viewport: VP,
  transition: { duration: 0.7, delay, ease: EASE },
});


const cardV: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 16, staggerChildren: 0.14, delayChildren: 0.25 } },
};
const inner: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };


const stepV: Variants = { hidden: { opacity: 0, x: -22 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } };


const stagePop: Variants = { hidden: { opacity: 0, scale: 0.85, rotate: -4 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, ease: EASE } } };
const stagePhoto: Variants = { hidden: { opacity: 0, y: 30, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } } };
const stageSpin: Variants = { hidden: { opacity: 0, scale: 0.4, rotate: -25 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 15 } } };
const stageCard: Variants = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } };

/* advances an index on a timer; any manual change restarts the timer */
function useAutoCycle({ count, ms, index, setIndex, active }: { count: number; ms: number; index: number; setIndex: (n: number) => void; active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setIndex((index + 1) % count), ms);
    return () => clearTimeout(t);
  }, [active, index, count, ms, setIndex]);
}

/* thin bar that fills while a tab is auto-running */
function TabProgress({ ms, running, k, className = "", color = "rgba(255,255,255,0.75)" }: { ms: number; running: boolean; k: string | number; className?: string; color?: string }) {
  return (
    <motion.span
      key={`${k}-${running}`}
      className={`pointer-events-none absolute bottom-0 h-[3px] origin-left rounded-full ${className}`}
      style={{ background: color }}
      initial={{ scaleX: running ? 0 : 1 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: running ? ms / 1000 : 0.25, ease: "linear" }}
    />
  );
}

/* headline that lands word by word */
function WordReveal({ text }: { text: string }) {
  return (
    <motion.span variants={group(0.06, 0.1)} initial="hidden" whileInView="show" viewport={VP} className="inline">
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.6, ease: EASE } } }} className="inline-block">
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* types text in once it scrolls into view, keeping the final layout reserved */
function Typewriter({ text, delay = 0, speed = 24 }: { text: string; delay?: number; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen || reduce) return;
    let i = 0;
    let int: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      int = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length && int) clearInterval(int);
      }, speed);
    }, delay * 1000);
    return () => { clearTimeout(t); if (int) clearInterval(int); };
  }, [seen, text, delay, speed, reduce]);
  const shown = reduce ? text.length : n;
  return (
    <span ref={ref}>
      <span>{text.slice(0, shown)}</span>
      <span style={{ visibility: "hidden" }}>{text.slice(shown)}</span>
    </span>
  );
}

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
  <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
const MessageIcon = (p: IP) => (
  <Svg {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Svg>
);
const WrenchIcon = (p: IP) => (
  <Svg {...p}><path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5V21h3.5l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.2-2.2z" /></Svg>
);
const CardIcon = (p: IP) => (
  <Svg {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 10h19" /></Svg>
);
const FlagIcon = (p: IP) => (
  <Svg {...p}><path d="M5 3v18" /><path d="M5 4h11l-2.5 4L16 12H5" /></Svg>
);
const TrendIcon = (p: IP) => (
  <Svg {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 6h6v6" /></Svg>
);
const CheckCircleIcon = (p: IP) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.4 2.4L16 10" /></Svg>
);
const ChevronRightIcon = (p: IP) => (
  <Svg {...p}><path d="M9 6l6 6-6 6" /></Svg>
);
const MonitorIcon = (p: IP) => (
  <Svg {...p}><rect x="3" y="4" width="18" height="14" rx="3" /><path d="M8 21h8M12 18v3" /></Svg>
);
const FactoryIcon = (p: IP) => (
  <Svg {...p}><path d="M3 21V11l6 4v-4l6 4V7l6 4v10H3Z" /><path d="M7 21v-4M12 21v-4M17 21v-4" /></Svg>
);
const CalendarIcon = (p: IP) => (
  <Svg {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></Svg>
);
const GridIcon = (p: IP) => (
  <Svg {...p}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></Svg>
);
const ChartIcon = (p: IP) => (
  <Svg {...p}><path d="M4 20V10M12 20V4M20 20v-7" /></Svg>
);
const SearchIcon = (p: IP) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Svg>
);
const DocIcon = (p: IP) => (
  <Svg {...p}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5M9 13h6M9 17h6" /></Svg>
);

const BotIcon = (p: IP) => (
  <Svg {...p}><rect x="4" y="8" width="16" height="12" rx="3.5" /><path d="M12 8V4.5M9 13v1.5M15 13v1.5M2 13v3M22 13v3" /><circle cx="12" cy="3.5" r="1" /></Svg>
);
const ClockIcon = (p: IP) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Svg>
);
const BoltIcon = (p: IP) => (
  <Svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Svg>
);
const BranchIcon = (p: IP) => (
  <Svg {...p}><circle cx="6" cy="5" r="2.2" /><circle cx="6" cy="19" r="2.2" /><circle cx="18" cy="9" r="2.2" /><path d="M6 7.2v9.6M18 11.2c0 4-6 3-11 6.2" /></Svg>
);
const SparkleIcon = (p: IP) => (
  <Svg {...p}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" /><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></Svg>
);
const ChevronDownIcon = (p: IP) => (
  <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>
);

const StethoscopeIcon = (p: IP) => (
  <Svg {...p}><path d="M6 3v6a4 4 0 0 0 8 0V3M4 3h4M12 3h4" /><path d="M10 13v2a5 5 0 0 0 10 0v-1.5" /><circle cx="20" cy="11.5" r="2" /></Svg>
);
const UsersIcon = (p: IP) => (
  <Svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17.5 14c2.4.2 4 2 4 5" /></Svg>
);
const CartIcon = (p: IP) => (
  <Svg {...p}><path d="M2.5 4h3l2.2 11h10.6l2-8H6.5" /><circle cx="9.5" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></Svg>
);

const DatabaseIcon = (p: IP) => (
  <Svg {...p}><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" /></Svg>
);
const CubeIcon = (p: IP) => (
  <Svg {...p}><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" /><path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" /></Svg>
);
const MailIcon = (p: IP) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></Svg>
);


/* ---------- gradient washes ---------- */
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

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.2em]" style={{ color: light ? "#fff" : C.primary }}>
      <AIMark size={14} />
      {children}
    </p>
  );
}

/* ---------- data ---------- */
const HERO_INFO_CARDS = [
  {
    icon: DocIcon,
    title: "Get answers across your applications",
    desc: "Find information, summarize activity, and get help with the next step.",
    side: "top" as const,
  },
  {
    icon: ChartIcon,
    title: "Turn information into action",
    desc: "Let AI work with the information and processes available across your workspace.",
    side: "bottom" as const,
  },
];

const MEET_AGENTS = [
  { name: "Sales agent", task: "Review opportunities", status: "Running", type: "active" as const },
  { name: "Service agent", task: "Review overdue work orders", status: "Complete", type: "done" as const },
  { name: "Finance agent", task: "Prepare payment follow-ups", status: "Awaiting approval", type: "pending" as const },
];

const GREEN = { fg: "#0E9F6E", bg: "#E5F7EF" };

const INTERACTION_MODES = [
  {
    tab: "Ask EVI",
    title: ["Ask EVI", "a question"],
    quote: "Which opportunities need follow-up this week?",
    desc: "EVI finds the relevant information and gives you an answer or prepares the next step.",
    icon: MessageIcon,
    tone: { fg: C.primary, bg: C.aiHighlight },
    outcome: { label: ["Answer", "or next step"], icon: MessageIcon, tone: { fg: C.primary, bg: "#EFEFFF" } },
  },
  {
    tab: "Assign an agent",
    title: ["Assign an agent", "give work to an agent"],
    quote: "Review overdue invoices and prepare follow-up actions.",
    desc: "An agent carries out the defined task and returns the result.",
    icon: BotIcon,
    tone: { fg: C.primary, bg: C.aiHighlight },
    outcome: { label: ["Result", "or approval"], icon: DocIcon, tone: { fg: GREEN.fg, bg: GREEN.bg } },
  },
  {
    tab: "Use AI in context",
    title: ["Use AI in context", "get help inside an application"],
    quote: "Summarize this customer's recent activity.",
    desc: "Get relevant AI assistance while working inside an application.",
    icon: MonitorIcon,
    tone: { fg: C.primary, bg: C.aiHighlight },
    outcome: { label: ["Action", "in context"], icon: BoltIcon, tone: { fg: C.interactive, bg: "#E8EEFF" } },
  },
  {
    tab: "Let agents work automatically",
    title: ["Let agents", "run automatically"],
    quote: "",
    desc: "Run defined tasks from schedules, events, or conditions without waiting for a request.",
    icon: ClockIcon,
    tone: { fg: GREEN.fg, bg: GREEN.bg },
    outcome: { label: ["Scheduled", "task"], icon: CalendarIcon, tone: { fg: GREEN.fg, bg: GREEN.bg } },
  },
];

const MODE_STYLE = [
  { accent: "#5C5CFF", bg: "#F0EFFF", line: "#DEDCFF" },
  { accent: "#2F7BF5", bg: "#EAF2FF", line: "#D3E4FF" },
  { accent: "#9B4DFF", bg: "#F5EDFF", line: "#E6D4FF" },
  { accent: "#0E9F6E", bg: "#E8F8F1", line: "#CBEFDF" },
];

function Skel({ w, dot }: { w: string; dot?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: dot ?? "#E3E6F0" }} />
      <span className="h-[7px] rounded-full" style={{ width: w, background: "#E8EBF5" }} />
    </div>
  );
}

function MockShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 rounded-[18px] bg-white p-4" style={{ border: `1px solid ${C.border}`, boxShadow: "0 18px 40px -26px rgba(16,42,67,0.28)" }}>
      {children}
    </div>
  );
}

function EviAvatar({ size = 28 }: { size?: number }) {
  return <Image src="/ai/ai-logo-icon.png" alt="EVI" width={size} height={size} className="shrink-0 rounded-[9px]" />;
}

function ModeMock({ index }: { index: number }) {
  if (index === 0) {
    return (
      <MockShell>
        <div className="flex items-center gap-2">
          <EviAvatar />
          <span className="text-[13px] font-bold" style={{ color: C.heading }}>EVI</span>
        </div>
        <div className="mt-3 rounded-[12px] px-3 py-2 text-[11.5px] leading-[1.45]" style={{ background: C.aiHighlight, color: C.heading }}>
          Which opportunities need follow-up this week?
        </div>
        <div className="mt-3 rounded-[12px] p-3" style={{ border: `1px solid ${C.border}` }}>
          <p className="text-[11.5px] leading-[1.45]" style={{ color: C.heading }}>Here are 5 opportunities that need follow-up this week.</p>
          <div className="mt-3 flex flex-col gap-2">
            <Skel w="70%" />
            <Skel w="52%" dot={C.interactive} />
            <Skel w="80%" dot={GREEN.fg} />
            <Skel w="48%" dot={C.bright} />
          </div>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-[9px] px-3 py-1.5 text-[11px] font-bold" style={{ color: C.interactive, border: `1px solid ${C.tint}` }}>
          <MessageIcon size={12} stroke={C.interactive} />
          Draft follow-up emails
        </span>
      </MockShell>
    );
  }
  if (index === 1) {
    return (
      <MockShell>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-[9px]" style={{ background: C.aiHighlight }}>
            <BotIcon size={15} stroke={C.primary} />
          </span>
          <span className="text-[13px] font-bold" style={{ color: C.heading }}>Create agent task</span>
        </div>
        <div className="mt-3 rounded-[12px] px-3 py-2.5 text-[11.5px] leading-[1.5]" style={{ border: `1px solid ${C.border}`, color: C.body, minHeight: 64 }}>
          Review overdue invoices and prepare follow-up actions.
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 text-[11.5px]">
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: C.heading }}>
            <BotIcon size={13} stroke={C.muted} /> Assign to
          </span>
          <span className="flex flex-1 items-center justify-between rounded-[9px] px-2.5 py-1.5" style={{ border: `1px solid ${C.border}`, color: C.body }}>
            Finance Agent <ChevronDownIcon size={12} stroke={C.muted} />
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-[9px] px-2.5 py-1.5 text-[11.5px]" style={{ border: `1px solid ${C.border}`, color: C.heading }}>
          <span className="flex items-center gap-1.5 font-semibold"><BranchIcon size={13} stroke={C.muted} /> Run now</span>
          <ChevronDownIcon size={12} stroke={C.muted} />
        </div>
        <div className="mt-3 flex justify-end">
          <span className="rounded-[9px] px-3.5 py-2 text-[11.5px] font-bold text-white" style={{ background: C.primary }}>Assign task</span>
        </div>
      </MockShell>
    );
  }
  if (index === 2) {
    return (
      <MockShell>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold" style={{ color: C.heading }}>Customer</span>
          <span className="inline-flex items-center gap-1.5 rounded-[9px] px-2.5 py-1.5 text-[11px] font-bold" style={{ color: C.heading, border: `1px solid ${C.tint}` }}>
            <SparkleIcon size={12} stroke={C.primary} /> Ask EVI
          </span>
        </div>
        <div className="mt-2.5 flex gap-3 text-[10.5px]" style={{ color: C.light }}>
          <span>Overview</span>
          <span className="font-bold" style={{ color: C.primary }}>Activity</span>
          <span>Deals</span>
          <span>Documents</span>
        </div>
        <div className="mt-3 rounded-[12px] p-3" style={{ background: C.aiSurface, border: `1px solid ${C.border}` }}>
          <div className="flex items-start gap-2">
            <EviAvatar size={24} />
            <div className="rounded-[10px] px-2.5 py-1.5 text-[11px] leading-[1.4]" style={{ background: C.aiHighlight, color: C.heading }}>
              Summarize this customer&apos;s recent activity.
            </div>
          </div>
          <div className="mt-3 rounded-[10px] bg-white p-2.5" style={{ border: `1px solid ${C.border}` }}>
            <p className="text-[11px] leading-[1.4]" style={{ color: C.heading }}>Here&apos;s a summary of recent activity for Acme Corp.</p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              <Skel w="66%" />
              <Skel w="44%" dot={C.interactive} />
              <Skel w="76%" dot={GREEN.fg} />
            </div>
          </div>
        </div>
      </MockShell>
    );
  }
  const rows = [
    { icon: CalendarIcon, title: "On a schedule", sub: "Run every Monday at 9:00 AM" },
    { icon: BoltIcon, title: "On an event", sub: "When a new invoice is created" },
    { icon: BranchIcon, title: "On a condition", sub: "When an opportunity is idle for 7 days" },
  ];
  return (
    <MockShell>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: GREEN.bg }}>
          <ClockIcon size={15} stroke={GREEN.fg} />
        </span>
        <span className="text-[13px] font-bold" style={{ color: C.heading }}>Automate with agents</span>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.title} className="flex items-center gap-2.5 rounded-[11px] px-2.5 py-2" style={{ border: `1px solid ${C.border}` }}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]" style={{ background: C.aiHighlight }}>
              <r.icon size={15} stroke={C.interactive} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-bold" style={{ color: C.heading }}>{r.title}</p>
              <p className="truncate text-[10.5px]" style={{ color: C.muted }}>{r.sub}</p>
            </div>
            <ChevronRightIcon size={13} stroke={C.light} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-end">
        <span className="rounded-[9px] px-3.5 py-2 text-[11.5px] font-bold text-white" style={{ background: C.primary }}>Create automation</span>
      </div>
    </MockShell>
  );
}


const WORK_SCENARIOS = [
  {
    tab: "Sales",
    icon: TrendIcon,
    signalTitle: "3 opportunities need follow-up",
    signalDesc: "No activity has been recorded for 7 days.",
    agentName: "Sales agent",
    eviDesc: "Reviews account activity, previous conversations, and opportunity status.",
    agentDesc: "Prepares personalized follow-up actions.",
    result: "3 follow-ups ready for review.",
    dot: "#5C5CFF",
    source: "Sales · CRM",
    agentP: "Works with CRM records, engagement history, and open proposals for each account.",
    resultP: "Each follow-up is drafted with the relevant context and a suggested next step.",
  },
  {
    tab: "Service",
    icon: WrenchIcon,
    signalTitle: "4 service visits need attention",
    signalDesc: "Open work orders require action.",
    agentName: "Service agent",
    eviDesc: "Reviews work order status, technician activity, asset history, and SLA.",
    agentDesc: "Identifies priority actions and prepares the next steps.",
    result: "Priority service actions ready for dispatch.",
    dot: "#8484FF",
    source: "Service · ServiceOps",
    agentP: "Checks schedules, parts availability, and account priorities across ServiceOps.",
    resultP: "Technicians and customers can be notified as soon as the actions are approved.",
  },
  {
    tab: "Finance",
    icon: CardIcon,
    signalTitle: "7 invoices are overdue",
    signalDesc: "Invoices have passed their due dates.",
    agentName: "Finance agent",
    eviDesc: "Reviews outstanding amounts, payment history, and account activity.",
    agentDesc: "Prepares the required customer follow-ups.",
    result: "Follow-up actions ready for approval.",
    dot: "#3333CC",
    source: "Finance · Billing",
    agentP: "Matches each invoice to the right contact, payment history, and account context.",
    resultP: "Review the drafts, approve, and the follow-ups are sent and logged back to Billing.",
  },
  {
    tab: "Projects",
    icon: FlagIcon,
    signalTitle: "1 project needs review",
    signalDesc: "Several project items are overdue.",
    agentName: "Project agent",
    eviDesc: "Reviews project activity, tasks, and recent updates.",
    agentDesc: "Identifies items requiring attention and prepares a project update.",
    result: "A concise project status update is ready.",
    dot: "#BDBDFF",
    source: "Delivery · Projects",
    agentP: "Cross-checks milestones, owners, and recent activity across the project.",
    resultP: "Share it with stakeholders or assign the overdue items to the right owners.",
  },
];

type IndCard = { icon: (p: IP) => React.ReactElement; title: string; desc: string; fg: string; bg: string };
const INDUSTRIES: {
  name: string; tabLabel: string; title: string; desc: string; cta: string; href: string;
  icon: (p: IP) => React.ReactElement; fg: string; bg: string;
  main: string; mainPos: string; mainZoom?: string; circle: string; circlePos: string; detail: string; detailPos: string; detailZoom?: string;
  cards: [IndCard, IndCard, IndCard];
}[] = [
  {
    name: "Healthcare", tabLabel: "Healthcare",
    title: "Turn patient and practice information into action.",
    desc: "Review patient, appointment, treatment, and follow-up information to identify what needs attention and prepare the next step.",
    cta: "Explore healthcare", href: "/healthcare", icon: StethoscopeIcon, fg: "#5C5CFF", bg: "#ECE9FF",
    main: "/industries/v2/hc-main-hd.jpg", mainPos: "50% 20%", circle: "/industries/v2/hc-circle-hd.jpg", circlePos: "40% 30%", detail: "/industries/v2/hc-detail-hd.jpg", detailPos: "50% 30%",
    cards: [
      { icon: DocIcon, title: "Patient summary", desc: "Recent visits, treatments and upcoming appointments", fg: "#5C5CFF", bg: "#ECE9FF" },
      { icon: CalendarIcon, title: "Follow-up needed", desc: "3 patients require attention this week", fg: "#F26A21", bg: "#FFEBDD" },
      { icon: UsersIcon, title: "Care plan", desc: "Draft next steps for the care team", fg: "#0E9F6E", bg: "#DDF6EA" },
    ],
  },
  {
    name: "Manufacturing", tabLabel: "Manufacturing",
    title: "Keep production and orders moving.",
    desc: "Review production, order, and operational information to identify exceptions and prepare the actions needed to keep work moving.",
    cta: "Explore manufacturing", href: "#", icon: FactoryIcon, fg: "#2F7BF5", bg: "#E4EFFF",
    main: "/industries/v2/mf-main-hd.jpg", mainPos: "30% 50%", circle: "/industries/v2/mf-circle-hd.jpg", circlePos: "50% 30%", detail: "/industries/v2/mf-main-hd.jpg", detailPos: "55% 45%", detailZoom: "scale(2.6)",
    cards: [
      { icon: FlagIcon, title: "Order exceptions", desc: "5 orders are at risk of delay this week", fg: "#F26A21", bg: "#FFEBDD" },
      { icon: ChartIcon, title: "Production status", desc: "Line 3 is running behind schedule", fg: "#2F7BF5", bg: "#E4EFFF" },
      { icon: MailIcon, title: "Supplier update", desc: "Draft a delay notice for review", fg: "#0E9F6E", bg: "#DDF6EA" },
    ],
  },
  {
    name: "Field service", tabLabel: "Field service",
    title: "Keep technicians and service visits on schedule.",
    desc: "Review work orders, technician activity, asset history, and service commitments to identify priority work and prepare the next action.",
    cta: "Explore field service", href: "#", icon: WrenchIcon, fg: "#0E9F6E", bg: "#DDF6EA",
    main: "/industries/v2/fs-main-hd.jpg", mainPos: "85% 40%", circle: "/industries/v2/fs-circle-hd.jpg", circlePos: "50% 30%", detail: "/industries/v2/fs-detail-hd.jpg", detailPos: "25% 40%",
    cards: [
      { icon: WrenchIcon, title: "Priority work orders", desc: "4 visits need attention today", fg: "#F26A21", bg: "#FFEBDD" },
      { icon: DocIcon, title: "Asset history", desc: "Recent repairs and service notes", fg: "#5C5CFF", bg: "#ECE9FF" },
      { icon: CalendarIcon, title: "Dispatch plan", desc: "Prepare next visits for technicians", fg: "#0E9F6E", bg: "#DDF6EA" },
    ],
  },
  {
    name: "Professional services", tabLabel: "Professional services",
    title: "Keep clients, projects, and deliverables on track.",
    desc: "Review client, project, task, and activity information to identify what needs attention and prepare updates or follow-up actions.",
    cta: "Explore professional services", href: "#", icon: UsersIcon, fg: "#5C5CFF", bg: "#ECE9FF",
    main: "/industries/v2/ps-main2-hd.jpg", mainPos: "30% 50%", circle: "/industries/v2/ps-circle-hd.jpg", circlePos: "50% 30%", detail: "/industries/v2/ps-detail-hd.jpg", detailPos: "65% 40%",
    cards: [
      { icon: DocIcon, title: "Client update", desc: "Status summary ready for review", fg: "#5C5CFF", bg: "#ECE9FF" },
      { icon: FlagIcon, title: "Overdue tasks", desc: "6 project tasks need review", fg: "#F26A21", bg: "#FFEBDD" },
      { icon: MailIcon, title: "Follow-up", desc: "Draft next steps for the project team", fg: "#0E9F6E", bg: "#DDF6EA" },
    ],
  },
  {
    name: "Retail & commerce", tabLabel: "Retail & commerce",
    title: "Keep customers, orders, and inventory in sync.",
    desc: "Review customer, order, inventory, and engagement information to identify what needs attention and prepare the next action.",
    cta: "Explore retail & commerce", href: "#", icon: CartIcon, fg: "#F26A21", bg: "#FFEBDD",
    main: "/industries/v2/rt-main-hd.jpg", mainPos: "8% 20%", circle: "/industries/v2/rt-circle-hd.jpg", circlePos: "50% 30%", detail: "/industries/v2/rt-main-hd.jpg", detailPos: "12% 40%", detailZoom: "scale(1.15)",
    cards: [
      { icon: CartIcon, title: "Order activity", desc: "12 orders need attention today", fg: "#F26A21", bg: "#FFEBDD" },
      { icon: CubeIcon, title: "Low inventory", desc: "8 items are below reorder level", fg: "#2F7BF5", bg: "#E4EFFF" },
      { icon: MailIcon, title: "Customer follow-up", desc: "Prepare outreach for 5 customers", fg: "#0E9F6E", bg: "#DDF6EA" },
    ],
  },
  {
    name: "More industries", tabLabel: "More industries",
    title: "Put AI to work on your industry's information and processes.",
    desc: "Apply the same AI capabilities to the information, processes, and decisions that matter in your industry.",
    cta: "Explore all industries", href: "/why-evoq", icon: GridIcon, fg: "#5C5CFF", bg: "#ECE9FF",
    main: "/industries/v2/mo-team-hd.jpg", mainPos: "85% 30%", circle: "/industries/v2/mo-circle-hd.jpg", circlePos: "50% 30%", detail: "/industries/v2/mo-detail-hd.jpg", detailPos: "50% 35%",
    cards: [
      { icon: DatabaseIcon, title: "Your information", desc: "Records from the systems you already use", fg: "#5C5CFF", bg: "#ECE9FF" },
      { icon: FlagIcon, title: "Needs attention", desc: "Items EVI flags across your workspace", fg: "#F26A21", bg: "#FFEBDD" },
      { icon: CheckCircleIcon, title: "Next action", desc: "Prepared for your review and approval", fg: "#0E9F6E", bg: "#DDF6EA" },
    ],
  },
];

function IndustryCard({ c, className = "", style }: { c: IndCard; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div variants={stageCard} className={`flex items-center gap-3 rounded-[16px] bg-white p-3.5 ${className}`} style={{ border: "1px solid #EEF0F8", boxShadow: "0 18px 40px -22px rgba(40,40,140,0.35)", ...style }}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: c.bg }}>
        <c.icon size={20} stroke={c.fg} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-extrabold" style={{ color: "#0B1230" }}>{c.title}</span>
        <span className="mt-0.5 block text-[12px] leading-[1.4]" style={{ color: C.muted }}>{c.desc}</span>
      </span>
      <ChevronRightIcon size={14} stroke={c.fg} />
    </motion.div>
  );
}

function IndustryStage({ ind }: { ind: (typeof INDUSTRIES)[number] }) {
  return (
    <>
      {/* desktop: orbit composition */}
      <div className="hidden lg:block">
        <ScaleFit width={640}>
          <motion.div key={ind.name} variants={group(0.08, 0.05)} initial="hidden" animate="show" className="relative" style={{ width: 640, height: 560 }}>
            <svg className="pointer-events-none absolute inset-0" width="640" height="560" fill="none" aria-hidden="true">
              <circle cx="345" cy="285" r="255" stroke="#C9CCF5" strokeWidth="1.2" strokeDasharray="2 5" />
              <circle cx="262" cy="68" r="6" fill="#5C5CFF" />
              <circle cx="95" cy="250" r="6" fill="#5C5CFF" />
              <circle cx="560" cy="62" r="7" fill="#3DD6A0" />
              <circle cx="190" cy="500" r="6" fill="#5C5CFF" />
              <circle cx="570" cy="470" r="6" fill="#5C5CFF" />
            </svg>
            <motion.div variants={stagePop} className="absolute rounded-[34px]" style={{ left: 300, top: 120, width: 270, height: 330, background: "linear-gradient(160deg,#DCD5FF,#EDE9FF)" }} />
            <motion.div variants={stagePhoto} className="absolute overflow-hidden" style={{ left: 245, top: 70, width: 300, height: 410, borderRadius: "34px 34px 90px 34px", boxShadow: "0 30px 60px -30px rgba(40,30,140,0.45)" }}>
              <Image src={ind.main} alt={ind.name} fill sizes="640px" quality={92} className="object-cover" style={{ objectPosition: ind.mainPos, transform: ind.mainZoom, transformOrigin: "95% 50%" }} />
            </motion.div>
            <motion.div variants={stageSpin} className="absolute flex items-center justify-center rounded-[26px]" style={{ left: 205, top: 405, width: 104, height: 104, background: "#ECE8FF", boxShadow: "0 18px 40px -22px rgba(40,40,140,0.4)" }}>
              <ind.icon size={52} stroke={C.interactive} />
            </motion.div>
            <motion.div variants={stageSpin} className="absolute overflow-hidden rounded-full" style={{ left: 495, top: 18, width: 108, height: 108, border: "4px solid #fff", boxShadow: "0 16px 34px -14px rgba(40,40,140,0.45)" }}>
              <Image src={ind.circle} alt="" fill sizes="256px" quality={90} className="object-cover" style={{ objectPosition: ind.circlePos }} />
            </motion.div>
            <motion.div variants={stagePhoto} className="absolute overflow-hidden rounded-[18px]" style={{ left: 478, top: 380, width: 104, height: 128, border: "3px solid #fff", boxShadow: "0 16px 34px -14px rgba(40,40,140,0.45)" }}>
              <Image src={ind.detail} alt="" fill sizes="512px" quality={90} className="object-cover" style={{ objectPosition: ind.detailPos, transform: ind.detailZoom, transformOrigin: "50% 50%" }} />
            </motion.div>
            <motion.div variants={stageSpin} className="absolute flex items-center justify-center rounded-[16px] bg-white" style={{ left: 590, top: 382, width: 50, height: 50, border: "1px solid #E4EEFF", boxShadow: "0 12px 26px -14px rgba(40,100,240,0.5)" }}>
              <SparkleIcon size={24} stroke="#2F7BF5" />
            </motion.div>
            <IndustryCard c={ind.cards[0]} className="absolute" style={{ left: 0, top: 40, width: 285 }} />
            <IndustryCard c={ind.cards[1]} className="absolute" style={{ left: 4, top: 240, width: 285 }} />
            <IndustryCard c={ind.cards[2]} className="absolute" style={{ left: 395, top: 232, width: 245 }} />
          </motion.div>
        </ScaleFit>
      </div>

      {/* below lg: photo + stacked cards */}
      <div className="lg:hidden">
        <div className="relative mx-auto h-[260px] w-full max-w-[420px] overflow-hidden rounded-[28px]">
          <Image src={ind.main} alt={ind.name} fill sizes="420px" className="object-cover" style={{ objectPosition: ind.mainPos }} />
        </div>
        <div className="mx-auto mt-4 flex max-w-[420px] flex-col gap-3">
          {ind.cards.map((c) => (
            <IndustryCard key={c.title} c={c} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- shared visuals ---------- */
function HeroInfoCard({ c, className = "", style }: { c: (typeof HERO_INFO_CARDS)[number]; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: c.side === "top" ? 0 : 1.8 }}
    >
      {/* soft glass halo around the card, as in the reference */}
      <div className="pointer-events-none absolute -inset-[9px] rounded-[24px] border border-white/25 bg-white/[0.14]" style={{ backdropFilter: "blur(6px)" }} />
      <div className="relative flex items-start gap-3 rounded-[16px] bg-white p-4" style={{ boxShadow: "0 24px 50px -18px rgba(10,0,80,0.55)" }}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: C.aiHighlight }}>
          <c.icon size={18} stroke={C.primary} />
        </span>
        <div>
          <p className="text-[13.5px] font-extrabold leading-[1.3]" style={{ color: "#0B1220" }}>{c.title}</p>
          <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: C.muted }}>{c.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}


function HeroWorkspacePanel() {
  const [topCard, bottomCard] = HERO_INFO_CARDS;
  const PX = 360; // panel left inside the 1620px desktop composition
  return (
    <>
      {/* desktop: panel + two floating cards, scaled to fit */}
      <div className="hidden lg:block">
        <ScaleFit width={1620}>
          <div className="relative" style={{ width: 1620, height: 620 }}>
            <div className="pointer-events-none absolute rounded-[28px] border border-white/15 bg-white/[0.09]" style={{ left: PX - 36, top: 160, width: 170, height: 330 }} />
            <div
              className="pointer-events-none absolute rounded-[36px] border border-white/25 bg-white/[0.13]"
              style={{ left: PX - 16, top: 114, width: 932, height: 400, backdropFilter: "blur(8px)", boxShadow: "0 40px 90px -30px rgba(10,0,80,0.5)" }}
            />
            <svg className="pointer-events-none absolute inset-0" width="1620" height="620" fill="none" aria-hidden="true">
              <path d="M1330 94 H1198 V140" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeDasharray="5 5" />
              <path d="M1440 210 V300 H1262" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeDasharray="5 5" />
              <path d="M1145 490 V545 H1228" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="1145" cy="490" r="3.5" fill="#fff" />
            </svg>
            <div className="absolute" style={{ left: PX, top: 130, width: 900 }}>
              <HeroWindow />
            </div>
            <HeroInfoCard c={topCard} className="absolute" style={{ left: 1335, top: 30, width: 290 }} />
            <HeroInfoCard c={bottomCard} className="absolute" style={{ left: 1228, top: 480, width: 340 }} />
          </div>
        </ScaleFit>
      </div>

      {/* below lg: window, then info cards stacked beneath */}
      <div className="lg:hidden">
        <div className="relative mx-auto max-w-[920px]">
          <div
            className="pointer-events-none absolute -inset-4 rounded-[36px] border border-white/25 bg-white/[0.13]"
            style={{ backdropFilter: "blur(8px)", boxShadow: "0 40px 90px -30px rgba(10,0,80,0.5)" }}
          />
          <HeroWindow />
          <div className="relative z-10 mt-12 flex flex-col gap-4">
            {HERO_INFO_CARDS.map((c) => (
              <HeroInfoCard key={c.title} c={c} className="relative text-left" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* the diagram's source column is the single place that lists what EVI works with, grouped by kind */
const EVOQ_SOURCES = [
  { name: "CRM", sub: "Customer information", logo: "/evoq-ai/apps/crm.png", w: 135, h: 55 },
  { name: "ServiceOps", sub: "Service history", logo: "/evoq-ai/apps/serviceops.png", w: 253, h: 55 },
  { name: "Projects", sub: "Project details", logo: "/evoq-ai/apps/projects.png", w: 184, h: 55 },
];
const CONNECTED_SOURCES = [
  { name: "ERP", sub: "Order and product data", icon: DatabaseIcon, fg: "#5C5CFF", bg: "#ECE9FF" },
  { name: "Finance system", sub: "Invoices and payments", icon: ChartIcon, fg: "#2F7BF5", bg: "#E4EFFF" },
];
const SOFT_CARD: React.CSSProperties = { background: "#fff", border: "1px solid #EEF0F8", boxShadow: "0 18px 44px -26px rgba(40,40,140,0.3)" };


function CrossSystemDiagram() {
  /* group card geometry: 12 pad + 34 header + rows of 58 (6 gap) + 12 pad */
  const ROW = 58, ROWGAP = 6, HEAD = 34, PAD = 12, GROUPGAP = 22;
  const groupH = (n: number) => PAD + HEAD + n * ROW + (n - 1) * ROWGAP + PAD;
  const aH = groupH(EVOQ_SOURCES.length);
  const bH = groupH(CONNECTED_SOURCES.length);
  const rowY = (top: number, i: number) => top + PAD + HEAD + i * (ROW + ROWGAP) + ROW / 2;
  const ys = [
    ...EVOQ_SOURCES.map((_, i) => rowY(0, i)),
    ...CONNECTED_SOURCES.map((_, i) => rowY(aH + GROUPGAP, i)),
  ];
  const total = aH + GROUPGAP + bH;
  const hub = 216;
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
        <div className="flex w-full flex-col lg:w-[250px] lg:shrink-0" style={{ gap: GROUPGAP }}>
          <div className="rounded-[20px]" style={{ ...SOFT_CARD, padding: PAD }}>
            <p className="flex items-center gap-2 px-1 text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: C.primary, height: HEAD }}>
              <i className="h-[7px] w-[7px] rounded-full" style={{ background: C.primary }} />
              EVOQ applications
            </p>
            <div className="flex flex-col" style={{ gap: ROWGAP }}>
              {EVOQ_SOURCES.map((x) => (
                <div key={x.name} className="flex flex-col justify-center rounded-[12px] px-3" style={{ height: ROW, background: "#FAFAFF", border: "1px solid #EEF0F8" }}>
                  <Image src={x.logo} alt={x.name} width={x.w} height={x.h} className="h-[22px] w-auto self-start" />
                  <p className="mt-1 truncate text-[11.5px]" style={{ color: C.muted }}>{x.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[20px]" style={{ ...SOFT_CARD, padding: PAD, background: "#FBFAFF" }}>
            <p className="flex items-center gap-2 px-1 text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: "#0E9F6E", height: HEAD }}>
              <i className="h-[7px] w-[7px] rounded-full" style={{ background: "#0E9F6E" }} />
              Connected systems
            </p>
            <div className="flex flex-col" style={{ gap: ROWGAP }}>
              {CONNECTED_SOURCES.map((x) => (
                <div key={x.name} className="flex items-center gap-3 rounded-[12px] bg-white px-3" style={{ height: ROW, border: "1px solid #EEF0F8" }}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]" style={{ background: x.bg }}>
                    <x.icon size={18} stroke={x.fg} />
                  </span>
                  <span className="min-w-0">
                    <p className="text-[13px] font-extrabold" style={{ color: "#0B1230" }}>{x.name}</p>
                    <p className="truncate text-[11.5px]" style={{ color: C.muted }}>{x.sub}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <svg className="hidden shrink-0 lg:block" width="64" height={total} fill="none" aria-hidden="true">
          {ys.map((y, i) => (
            <g key={i}>
              <path d={`M2 ${y} C 30 ${y}, 30 ${hub}, 62 ${hub}`} stroke={C.primary} strokeWidth="1.3" strokeDasharray="3 4" opacity="0.7" />
              <circle cx="2" cy={y} r="2.6" fill={C.primary} />
            </g>
          ))}
          <circle cx="62" cy={hub} r="3.4" fill={C.primary} />
        </svg>
      </div>

      <div className="flex w-full flex-col items-center lg:w-[270px] lg:shrink-0">
        <div className="relative w-full rounded-[22px] px-5 pb-5 pt-14 text-center" style={{ ...SOFT_CARD, minHeight: 2 * (hub - 36), marginTop: 36 }}>
          <span className="absolute -top-9 left-1/2 h-[84px] w-[84px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-white" style={{ boxShadow: "0 0 0 8px #E8E3FF, 0 16px 30px -10px rgba(92,92,255,0.5)" }}>
            <Image src="/healthcare/avatars/priya.jpg" alt="EVI" fill sizes="84px" className="object-cover" />
          </span>
          <h4 className="mt-3 text-[20px] font-extrabold" style={{ color: "#0B1230" }}>EVI</h4>
          <p className="mx-auto mt-1 max-w-[210px] text-[13px] leading-[1.5]" style={{ color: C.muted }}>Finds information across your systems and prepares the next step.</p>
          <div className="mt-4 flex flex-col gap-2 text-left">
            {[{ t: "Search across systems", i: SearchIcon }, { t: "Combine relevant data", i: DocIcon }, { t: "Prepare work or ask an agent", i: SparkleIcon }].map((r) => (
              <div key={r.t} className="flex items-center gap-2.5 rounded-full px-3.5 py-2.5 text-[12px] font-semibold" style={{ background: C.aiSurface, color: "#0B1230" }}>
                <r.i size={15} stroke={C.interactive} />{r.t}
              </div>
            ))}
          </div>
        </div>
        <svg width="14" height="30" viewBox="0 0 14 30" fill="none" stroke={C.primary} strokeWidth="1.4" aria-hidden="true" className="my-1"><path d="M7 0v26" strokeDasharray="3 3" /><path d="m3 22 4 5 4-5" /></svg>
        <div className="w-full rounded-[22px] p-5" style={SOFT_CARD}>
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: C.aiHighlight }}>
              <BotIcon size={22} stroke={C.interactive} />
            </span>
            <div>
              <p className="text-[15px] font-extrabold" style={{ color: "#0B1230" }}>Finance agent</p>
              <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: C.muted }}>Reviews the information, prepares follow-up actions, and completes the task.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            {["Identify outstanding invoices", "Check recent service activity", "Prepare customer follow-up"].map((t) => (
              <div key={t} className="flex items-center gap-2.5 rounded-full px-3 py-2 text-[12px]" style={{ background: C.aiSurface, color: C.body }}>
                <CheckCircleIcon size={15} stroke={C.interactive} />{t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden shrink-0 items-center lg:flex" style={{ width: 52, marginTop: 2 * hub + 70 }}>
        <svg width="52" height="12" viewBox="0 0 52 12" fill="none" stroke={C.primary} strokeWidth="1.4" aria-hidden="true"><path d="M0 6h46" strokeDasharray="3 3" /><path d="m42 2 5 4-5 4" /></svg>
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-[330px] lg:shrink-0 lg:-mt-1">
        <div className="flex w-fit items-center gap-3 rounded-[16px] px-5 py-3.5 lg:ml-6" style={SOFT_CARD}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#0E9F6E" }}>
            <CheckCircleIcon size={18} stroke="#fff" />
          </span>
          <span>
            <p className="text-[14px] font-extrabold" style={{ color: "#0B1230" }}>Follow-up prepared</p>
            <p className="text-[12px]" style={{ color: C.muted }}>Ready to review and send.</p>
          </span>
        </div>
        <div className="rounded-[22px] p-5" style={SOFT_CARD}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: C.aiHighlight }}><MailIcon size={18} stroke={C.interactive} /></span>
            <span className="text-[15px] font-extrabold" style={{ color: "#0B1230" }}>Customer follow-up</span>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-[12px] p-3" style={{ border: "1px solid #EEF0F8" }}>
            <Image src="/healthcare/avatars/james.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-[14px] font-extrabold" style={{ color: "#0B1230" }}>Acme Corp.</p>
              <p className="text-[12px]" style={{ color: C.muted }}>Account · Customer since 2023</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold">
            {["Summary", "Recent activity", "Open invoices", "Next steps"].map((t, i) => (
              <span key={t} className="rounded-full px-2.5 py-1" style={i === 0 ? { background: C.aiHighlight, color: C.interactive } : { color: C.muted }}>{t}</span>
            ))}
          </div>
          <p className="mt-4 text-[13px] font-extrabold" style={{ color: "#0B1230" }}>AI prepared follow-up</p>
          <div className="mt-2 rounded-[12px] p-3.5 text-[12px] leading-[1.6]" style={{ background: C.aiSurface, color: C.body }}>
            Hi team,<br />Following up on the outstanding invoices for Acme Corp. Based on recent service activity and open orders, here is a summary and the next steps…
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-[10px] px-2.5 py-2" style={{ border: "1px solid #EEF0F8" }}>
              <DocIcon size={16} stroke={C.muted} />
              <span><p className="text-[11px] font-bold" style={{ color: "#0B1230" }}>Invoice summary</p><p className="text-[10px]" style={{ color: C.muted }}>PDF · 124 KB</p></span>
            </div>
            <span className="rounded-[10px] px-4 py-3 text-[12.5px] font-bold text-white" style={{ background: "#3D2BD9" }}>Send follow-up</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ type, label }: { type: "active" | "done" | "pending"; label: string }) {
  const style =
    type === "done"
      ? { background: "#ECFDF5", color: "#0E9F6E" }
      : type === "active"
        ? { background: C.aiHighlight, color: C.primary }
        : { background: "#FFF8E8", color: "#B45309" };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold" style={style}>
      <span className="h-[6px] w-[6px] rounded-full" style={{ background: style.color }} />
      {label}
    </span>
  );
}

/* ---------- page ---------- */
export function EvoqAIPage() {
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeMode, setActiveMode] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const industry = INDUSTRIES[activeIndustry];
  const scenario = WORK_SCENARIOS[activeScenario];

  /* auto-running tabs: run while the section is on screen and the pointer is not over it */
  const reduce = useReducedMotion();
  const askRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLDivElement>(null);
  const askIn = useInView(askRef, { amount: 0.35 });
  const workIn = useInView(workRef, { amount: 0.4 });
  const indIn = useInView(indRef, { amount: 0.35 });
  const [askHold, setAskHold] = useState(false);
  const [workHold, setWorkHold] = useState(false);
  const [indHold, setIndHold] = useState(false);
  const ASK_MS = 5000;
  const WORK_MS = 6000;
  const IND_MS = 5500;
  const askRun = askIn && !askHold && !reduce;
  const workRun = workIn && !workHold && !reduce;
  const indRun = indIn && !indHold && !reduce;
  useAutoCycle({ count: INTERACTION_MODES.length, ms: ASK_MS, index: activeMode, setIndex: setActiveMode, active: askRun });
  useAutoCycle({ count: WORK_SCENARIOS.length, ms: WORK_MS, index: activeScenario, setIndex: setActiveScenario, active: workRun });
  useAutoCycle({ count: INDUSTRIES.length, ms: IND_MS, index: activeIndustry, setIndex: setActiveIndustry, active: indRun });

  return (
    <MotionConfig reducedMotion="user">
    <div style={{ background: "#fff" }}>
      {/* ===== 1. HERO — AI that gets work done ===== */}
      <section
        id="hero"
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg, #2417C4 0%, #3A1FDA 42%, #5A1FEA 75%, #8A26F2 100%)", scrollMarginTop: 96 }}
      >
        {/* same curved shapes as the "Get started" banner */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 520 C 160 560, 300 760, 440 1000 L0 1000 Z" fill="#B84DFF" opacity="0.5" />
          <path d="M0 700 C 110 690, 230 810, 340 1000 L0 1000 Z" fill="#9B3CFF" opacity="0.55" />
          <path d="M260 930 C 520 880, 720 1000, 980 960 C 1190 928, 1330 880, 1440 820 L1440 1000 L280 1000 Z" fill="#8A2BFF" opacity="0.55" />
          <path d="M1060 140 C 1160 60, 1300 30, 1440 0 L1440 560 C 1340 470, 1120 430, 1060 140 Z" fill="#5E2BFF" opacity="0.45" />
        </svg>
        {/* same white header lighting as the home hero: wash from the left (behind the logo) and the top-right */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 30% at 100% 0%, rgba(255,255,255,0.34) 0%, rgba(226,220,255,0.2) 35%, rgba(255,255,255,0.07) 62%, rgba(255,255,255,0) 88%), radial-gradient(70% 55% at 0% 0%, rgba(255,255,255,0.4) 0%, rgba(226,220,255,0.22) 40%, rgba(255,255,255,0.08) 65%, rgba(255,255,255,0) 88%), radial-gradient(38% 20% at 6% 8%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0) 90%)",
          }}
        />
        <div className="relative px-5 sm:px-6 lg:px-6">
          <motion.div variants={group(0.12, 0.1)} initial="hidden" animate="show" className="mx-auto max-w-[1100px] pt-36 text-center lg:pt-44">
            <motion.p variants={rise} className="text-[13px] font-semibold uppercase tracking-[0.32em] text-white/90">EVOQ AI</motion.p>
            <motion.h1 variants={rise} className="mx-auto mt-4 max-w-[860px] font-[var(--font-display)] text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[58px]">
              AI that gets work done
            </motion.h1>
            <motion.p variants={rise} className="mx-auto mt-5 max-w-[640px] text-balance text-[17px] leading-[1.7] text-white/90">
              EVOQ AI brings AI into the applications, systems, and processes where your work happens.
            </motion.p>
            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowGetStarted(true)}
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-7 py-3.5 text-[15px] font-bold transition-transform hover:-translate-y-0.5"
                style={{ color: C.interactive }}
              >
                Explore EVOQ AI
                <ArrowIcon size={15} stroke={C.interactive} />
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[10px] px-7 py-3.5 text-[15px] font-bold text-white no-underline transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.55)" }}
              >
                Talk to an expert
              </Link>
            </motion.div>

          </motion.div>
          <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }} className="mx-auto mt-10 max-w-[1500px] pb-24 lg:-mt-12 lg:pb-32">
            <HeroWorkspacePanel />
          </motion.div>
        </div>
      </section>

      {/* ===== 2. MEET EVOQ AI ===== */}
      <section id="meet-evoq-ai" className="relative" style={{ scrollMarginTop: 96 }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
            <div
              className="relative overflow-hidden rounded-[36px] p-8 sm:p-12 lg:p-16"
              style={{ background: `linear-gradient(160deg, #F8F8FF 0%, ${C.tint}55 55%, #C7C7FF 100%)` }}
            >
              <GradientWash variant="subtle" />
              <motion.div {...reveal()} className="relative text-center">
                <Eyebrow>Meet EVOQ AI</Eyebrow>
                <h2 className="mx-auto mt-5 max-w-[640px] font-[var(--font-display)] text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] sm:text-[34px]" style={{ color: C.heading }}>
                  EVI helps you work with AI. Agents perform the work.
                </h2>
              </motion.div>

              <div className="relative mt-14 grid gap-3 sm:grid-cols-2">
                {/* EVI panel */}
                <motion.div {...reveal(0.05, 30, -40)} className="rounded-[26px] bg-white p-8" style={{ border: `1px solid ${C.border}`, boxShadow: "0 24px 60px -32px rgba(16,42,67,0.18)" }}>
                  <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white" style={{ background: C.primary }}>
                    EVI
                  </span>
                  <h3 className="mt-5 font-[var(--font-display)] text-[20px] font-bold leading-[1.3]" style={{ color: C.heading }}>
                    AI. Assist. Act.
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7]" style={{ color: C.body }}>
                    EVI is your AI assistant across EVOQ. Ask questions, find information, understand activity,
                    prepare work, or get help with the next step. Interact with EVI directly, or use it within the
                    application and information you are working with.
                  </p>

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
                      <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VP} transition={{ duration: 0.5, delay: 0.7, ease: EASE }} className="flex justify-end">
                        <div className="max-w-[88%] rounded-[14px] rounded-tr-sm px-4 py-2.5 text-[12.5px] font-semibold text-white" style={{ background: C.primary }}>
                          Which opportunities need follow-up this week?
                        </div>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.55, delay: 1.3, ease: EASE }} className="mt-3 flex items-start gap-2.5">
                        <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full" style={{ background: C.primary }} />
                        <div className="flex-1 rounded-[14px] rounded-tl-sm p-3.5" style={{ background: C.aiHighlight }}>
                          <p className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: C.interactive }}>
                            EVI · Generated answer
                          </p>
                          <p className="mt-1.5 text-[12.5px] leading-[1.6]" style={{ color: C.heading }}>
                            <strong>3 opportunities</strong> need follow-up this week, including <strong>Northgate Logistics</strong>{" "}
                            and <strong>Beta Inc.</strong> Suggested next actions are ready for review.
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#fff", borderTop: `1px solid ${C.border}` }}>
                      <span className="flex-1 text-[12.5px]" style={{ color: C.light }}>Ask EVI anything…</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: C.primary }}>
                        <ArrowIcon size={13} stroke="#fff" />
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* AI agents panel */}
                <motion.div {...reveal(0.15, 30, 40)} className="rounded-[26px] bg-white p-8" style={{ border: `1px solid ${C.border}`, boxShadow: "0 24px 60px -32px rgba(16,42,67,0.18)" }}>
                  <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]" style={{ background: C.aiHighlight, color: C.interactive }}>
                    AI agents
                  </span>
                  <h3 className="mt-5 font-[var(--font-display)] text-[20px] font-bold leading-[1.3]" style={{ color: C.heading }}>
                    Give work to a specialist.
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7]" style={{ color: C.body }}>
                    AI agents handle defined tasks that require multiple steps, decisions, or actions. They work
                    with information across applications and connected systems, then return results or take
                    approved actions. Use agents through EVI, directly from an application, or automatically.
                  </p>

                  <div className="mt-6 overflow-hidden rounded-[16px]" style={{ border: `1px solid ${C.border}` }}>
                    <div className="flex items-center justify-between px-4 py-2.5" style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                      <span className="text-[12px] font-bold" style={{ color: C.heading }}>Agent activity</span>
                      <span className="text-[11px] font-semibold" style={{ color: C.muted }}>3 agents</span>
                    </div>
                    <div className="divide-y bg-white" style={{ borderColor: C.border }}>
                      {MEET_AGENTS.map((a) => (
                        <motion.div initial={{ opacity: 0, x: 26 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.5, delay: 0.7 + MEET_AGENTS.indexOf(a) * 0.2, ease: EASE }} key={a.name} className="flex items-center gap-3 px-4 py-3.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]" style={{ background: C.aiHighlight }}>
                            <TrendIcon size={16} stroke={C.primary} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-bold" style={{ color: C.heading }}>{a.name}</p>
                            <p className="truncate text-[11.5px]" style={{ color: C.muted }}>{a.task}</p>
                          </div>
                          <StatusPill type={a.type} label={a.status} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. AI ACROSS THE SYSTEMS YOU USE ===== */}
      <section id="cross-system" className="relative overflow-hidden" style={{ scrollMarginTop: 96, background: "linear-gradient(180deg, #FBFBFF 0%, #F4F3FF 100%)" }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1480px] py-16 lg:py-24">
            <div className="grid gap-12 xl:grid-cols-[430px_1fr] xl:gap-6">
              <div className="xl:pt-20">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: C.interactive }}>AI across the systems you use</p>
                <h2 className="mt-5 font-[var(--font-display)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[44px]" style={{ color: "#0B1230" }}>
                  Your work extends beyond EVOQ applications.
                </h2>
                <p className="mt-6 text-[15.5px] leading-[1.75]" style={{ color: C.body }}>
                  EVOQ AI can work with information and actions made available through your connected systems.
                </p>
                <p className="mt-4 text-[15.5px] leading-[1.75]" style={{ color: C.body }}>
                  EVI can use that information to answer questions and prepare work. AI agents can use it to perform
                  defined tasks across the applications and systems available to them.
                </p>

                <a
                  href="#evoq-ai-at-work"
                  className="mt-9 inline-flex items-center gap-3 rounded-[14px] px-7 py-4 text-[16px] font-bold text-white no-underline transition-transform hover:-translate-y-0.5"
                  style={{ background: "#3D2BF0", boxShadow: "0 18px 36px -16px rgba(61,43,240,0.7)" }}
                >
                  See how it works
                  <ArrowIcon size={18} stroke="#fff" />
                </a>
              </div>

              <div className="min-w-0 xl:pt-8">
                <ScaleFit width={966}><CrossSystemDiagram /></ScaleFit>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. ASK, ASSIGN, ACT ===== */}
      <section id="ask-assign-act" className="relative" style={{ scrollMarginTop: 96, background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFF 100%)" }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div ref={askRef} onMouseEnter={() => setAskHold(true)} onMouseLeave={() => setAskHold(false)} className="mx-auto max-w-[1300px] py-20 lg:py-24">
            <div className="mx-auto max-w-[1100px] text-center">
              <motion.p {...reveal(0, 14)} className="text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: C.primary }}>How you work with AI</motion.p>
              <h2 className="mt-4 font-[var(--font-display)] text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] sm:text-[32px] lg:text-[38px] lg:whitespace-nowrap" style={{ color: C.heading }}>
                <WordReveal text="There is more than one way to work with EVOQ AI." />
              </h2>
            </div>

            <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VP} transition={{ duration: 0.7, delay: 0.25, ease: EASE }} className="mx-auto mt-10 grid max-w-[1060px] grid-cols-2 gap-2 rounded-[28px] p-2 lg:flex lg:items-center lg:justify-between lg:gap-1 lg:rounded-full lg:p-1.5" style={{ background: "#fff", border: `1px solid ${C.border}`, boxShadow: "0 12px 30px -22px rgba(40,40,140,0.35)" }}>
              {INTERACTION_MODES.map((m, i) => {
                const on = i === activeMode;
                return (
                  <button
                    key={m.tab}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActiveMode(i)}
                    className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-3 py-3 text-[13px] font-bold lg:px-4 lg:text-[13.5px]"
                    style={{ color: on ? "#fff" : C.heading }}
                  >
                    {on && (
                      <motion.span
                        layoutId="mode-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: MODE_STYLE[i].accent, boxShadow: `0 10px 22px -12px ${MODE_STYLE[i].accent}` }}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {on && <TabProgress ms={ASK_MS} running={askRun} k={`ask-${i}`} className="left-5 right-5" />}
                    <span className="relative z-10 flex items-center gap-2">
                      <m.icon size={16} stroke={on ? "#fff" : MODE_STYLE[i].accent} />
                      <span className="text-center leading-[1.2]">{m.tab}</span>
                    </span>
                  </button>
                );
              })}
            </motion.div>

            <motion.div variants={group(0.16, 0.2)} initial="hidden" whileInView="show" viewport={VP} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {INTERACTION_MODES.map((m, i) => {
                const st = MODE_STYLE[i];
                const on = i === activeMode;
                return (
                  <motion.div key={m.tab} variants={cardV} className="flex">
                  <div
                    onClick={() => setActiveMode(i)}
                    className="flex w-full cursor-pointer flex-col overflow-hidden rounded-[26px] transition-all duration-300"
                    style={{
                      background: st.bg,
                      border: `1.5px solid ${on ? st.accent : st.line}`,
                      boxShadow: on ? `0 28px 60px -30px ${st.accent}` : "none",
                      transform: on ? "translateY(-4px)" : undefined,
                    }}
                  >
                    {/* 1 — what you do (tinted) */}
                    <motion.div variants={inner} className="px-5 pb-5 pt-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white" style={{ boxShadow: `0 8px 18px -10px ${st.accent}` }}>
                          <m.icon size={21} stroke={st.accent} />
                        </span>
                        <h4 className="text-[16px] font-extrabold leading-[1.25]" style={{ color: C.heading }}>
                          {m.title[0]}
                          <span className="block text-[13px] font-semibold" style={{ color: st.accent }}>{m.title[1]}</span>
                        </h4>
                      </div>
                      <div className="mt-4 min-h-[64px]">
                        {m.quote && (
                          <div className="rounded-[14px] bg-white px-3.5 py-3 text-[13px] italic leading-[1.5]" style={{ color: C.heading, borderLeft: `3px solid ${st.accent}` }}>
                            &ldquo;<Typewriter text={m.quote} delay={0.9 + i * 0.25} speed={22} />&rdquo;
                          </div>
                        )}
                      </div>
                      <p className="mt-3 min-h-[63px] text-[13px] leading-[1.6]" style={{ color: C.body }}>{m.desc}</p>
                    </motion.div>

                    {/* 2 — what you see (white panel) */}
                    <motion.div variants={inner} className="flex flex-1 flex-col rounded-t-[22px] bg-white px-4 pb-4 pt-3" style={{ boxShadow: "0 -10px 30px -22px rgba(20,20,100,0.35)" }}>
                      <p className="mb-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em]" style={{ color: st.accent }}>In EVOQ</p>
                      <div className="flex flex-1 flex-col">
                        <ModeMock index={i} />
                      </div>
                    </motion.div>

                    {/* 3 — what you get (tinted) */}
                    <motion.div variants={inner} className="flex items-center gap-3 px-5 py-4" style={{ background: st.bg }}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: st.accent }}>
                        <m.outcome.icon size={18} stroke="#fff" />
                      </span>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: C.muted }}>
                        You get
                        <span className="block text-[15px] normal-case tracking-normal" style={{ color: C.heading }}>
                          {m.outcome.label[0]} <span className="text-[13px] font-semibold" style={{ color: C.body }}>{m.outcome.label[1]}</span>
                        </span>
                      </p>
                    </motion.div>
                  </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 5. SEE EVOQ AI AT WORK (interactive console) ===== */}
      <section id="evoq-ai-at-work" className="relative overflow-hidden" style={{ scrollMarginTop: 96, background: "linear-gradient(180deg, #FAFAFF 0%, #F1F0FF 100%)" }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-16 lg:py-24">
            <motion.div {...reveal()} className="mx-auto max-w-[820px] text-center">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: C.primary }}>See EVOQ AI at work</p>
              <h2 className="mt-4 font-[var(--font-display)] text-[28px] font-extrabold leading-[1.2] tracking-[-0.02em] sm:text-[38px]" style={{ color: C.heading }}>
                What needs attention?{" "}
                <span style={{ backgroundImage: "linear-gradient(90deg, #3333CC, #5C5CFF 60%, #8484FF)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  Watch EVI and an agent handle it.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-[680px] text-[16px] leading-[1.7]" style={{ color: C.body }}>
                EVOQ AI identifies what needs attention, understands the relevant information, and helps move the work forward. Select a signal or a tab to see how.
              </p>
            </motion.div>

            <motion.div ref={workRef} onMouseEnter={() => setWorkHold(true)} onMouseLeave={() => setWorkHold(false)} initial={{ opacity: 0, y: 50, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VP} transition={{ duration: 0.8, delay: 0.1, ease: EASE }} className="mx-auto mt-12 max-w-[1120px] overflow-hidden rounded-[26px] bg-white" style={{ border: `1px solid ${C.border}`, boxShadow: "0 30px 80px -30px rgba(0,0,153,0.25)" }}>
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: `1px solid ${C.border}`, background: "#FBFBFF" }}>
                <i className="h-[10px] w-[10px] rounded-full" style={{ background: "#FF5F57" }} />
                <i className="h-[10px] w-[10px] rounded-full" style={{ background: "#FEBC2E" }} />
                <i className="h-[10px] w-[10px] rounded-full" style={{ background: "#28C840" }} />
                <span className="mx-auto flex items-center gap-2 rounded-full px-4 py-1 text-[11.5px] font-semibold" style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.muted }}>
                  <SparkleIcon size={12} stroke={C.primary} />
                  EVOQ AI · Work console
                </span>
                <span className="w-[42px]" />
              </div>

              <div className="grid min-h-[430px] text-left lg:grid-cols-[340px_1fr]">
                {/* signals */}
                <div className="flex flex-col gap-1 p-5" style={{ background: "linear-gradient(180deg, #fff, #F7F7FF)", borderRight: `1px solid ${C.border}` }}>
                  <div className="mb-3 flex items-center gap-2">
                    <h6 className="text-[10.5px] font-extrabold uppercase tracking-[0.14em]" style={{ color: C.muted }}>What needs attention?</h6>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em]" style={{ color: C.primary }}>
                      <i className="evoq-pulse h-[6px] w-[6px] rounded-full" style={{ background: C.primary }} />
                      Live
                    </span>
                  </div>
                  {WORK_SCENARIOS.map((s, i) => {
                    const on = i === activeScenario;
                    return (
                      <button
                        key={s.tab}
                        type="button"
                        onClick={() => setActiveScenario(i)}
                        className="group relative flex w-full items-center gap-3.5 rounded-[13px] px-3.5 py-3.5 text-left"
                      >
                        {on && (
                          <motion.span
                            layoutId="sig-pill"
                            className="absolute inset-0 rounded-[13px] bg-white"
                            style={{ border: `1px solid ${C.tint}`, boxShadow: "0 10px 26px -12px rgba(0,0,153,0.25)" }}
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        )}
                        <i className="relative h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: s.dot }} />
                        <span className="relative min-w-0 flex-1">
                          <span className="block text-[13.5px] font-bold" style={{ color: "#0B1230" }}>{s.signalTitle}</span>
                          <span className="mt-0.5 block text-[11.5px]" style={{ color: C.muted }}>{s.source}</span>
                        </span>
                        <span className={`relative shrink-0 text-[10px] font-extrabold transition-opacity ${on ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} style={{ color: C.primary }}>View →</span>
                      </button>
                    );
                  })}
                </div>

                {/* detail */}
                <div className="flex flex-col px-6 py-6 sm:px-8">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {WORK_SCENARIOS.map((s, i) => {
                      const on = i === activeScenario;
                      return (
                        <button
                          key={s.tab}
                          type="button"
                          onClick={() => setActiveScenario(i)}
                          className="relative overflow-hidden rounded-full px-4 py-2 text-[12px] font-extrabold"
                          style={on ? { color: "#fff" } : { background: "#FBFBFF", color: C.muted, border: `1px solid ${C.border}` }}
                        >
                          {on && (
                            <motion.span
                              layoutId="tab-pill"
                              className="absolute inset-0 rounded-full"
                              style={{ background: C.aiGradient, boxShadow: "0 8px 20px -8px rgba(92,92,255,0.6)" }}
                              transition={{ type: "spring", stiffness: 380, damping: 34 }}
                            />
                          )}
                          {on && <TabProgress ms={WORK_MS} running={workRun} k={`work-${i}`} className="left-4 right-4" />}
                          <span className="relative z-10">{s.tab}</span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div variants={group(0.18, 0.05)} initial="hidden" animate="show" exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }} key={activeScenario} className="evoq-fade flex flex-1 flex-col">
                    {[
                      { k: "Signal", t: scenario.signalTitle, p: scenario.signalDesc, icon: SparkleIcon, kind: "normal" },
                      { k: "EVI", t: "Understands the situation", p: scenario.eviDesc, icon: SparkleIcon, kind: "evi" },
                      { k: `Agent · ${scenario.agentName}`, t: scenario.agentDesc, p: scenario.agentP, icon: CheckCircleIcon, kind: "normal" },
                      { k: "Result", t: scenario.result, p: scenario.resultP, icon: CheckCircleIcon, kind: "result" },
                    ].map((st, idx, arr) => {
                      const evi = st.kind === "evi";
                      const res = st.kind === "result";
                      const fg = res ? "#0E9B6E" : C.primary;
                      return (
                        <motion.div variants={stepV} key={st.k} className="relative flex gap-4" style={{ paddingBottom: idx === arr.length - 1 ? 0 : 22 }}>
                          {idx < arr.length - 1 && <span className="absolute bottom-[2px] left-[17px] top-[38px] w-[1.5px]" style={{ background: `linear-gradient(180deg, ${C.tint}, ${C.soft})` }} />}
                          <span
                            className="z-[1] flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-[11px]"
                            style={evi ? { background: C.aiGradient, boxShadow: "0 8px 20px -6px rgba(92,92,255,0.5)" } : res ? { background: "#F0FBF6", border: "1px solid #BFEBD6" } : { background: C.soft, border: `1px solid ${C.tint}` }}
                          >
                            <st.icon size={16} stroke={evi ? "#fff" : fg} />
                          </span>
                          <div>
                            <p className="mb-0.5 flex items-center text-[10px] font-extrabold uppercase tracking-[0.12em]" style={{ color: fg }}>
                              {st.k}
                              {evi && (
                                <span className="ml-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[9.5px] tracking-[0.08em]" style={{ background: C.soft }}>
                                  <i className="evoq-pulse h-[6px] w-[6px] rounded-full" style={{ background: C.primary }} />
                                  Working
                                </span>
                              )}
                            </p>
                            <p className="text-[14.5px] font-extrabold" style={{ color: res ? C.deep : "#0B1230" }}>{st.t}</p>
                            <p className="mt-1 max-w-[520px] text-[13px] leading-[1.6]" style={{ color: C.muted }}>{st.p}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                    </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <style jsx global>{`
          .evoq-fade { animation: evoqFade 0.45s ease; }
          .no-scrollbar { scrollbar-width: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          @keyframes evoqFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
          .evoq-pulse { animation: evoqPulse 1.6s ease infinite; }
          @keyframes evoqPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(92,92,255,0.4); } 50% { box-shadow: 0 0 0 6px rgba(92,92,255,0); } }
        `}</style>
      </section>

      {/* ===== 6. AI FOR EVERY INDUSTRY ===== */}
      <section id="industries" className="relative overflow-hidden" style={{ scrollMarginTop: 96, background: "linear-gradient(180deg, #FAFAFF 0%, #F4F4FF 100%)" }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div ref={indRef} onMouseEnter={() => setIndHold(true)} onMouseLeave={() => setIndHold(false)} className="mx-auto max-w-[1240px] py-16 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <AnimatePresence mode="wait">
              <motion.div variants={group(0.1)} initial="hidden" animate="show" exit={{ opacity: 0, x: -20, transition: { duration: 0.18 } }} key={industry.name} className="evoq-fade">
                <motion.p variants={rise} className="text-[13px] font-extrabold uppercase tracking-[0.12em]" style={{ color: C.interactive }}>AI for every industry</motion.p>
                <motion.h2 variants={rise} className="mt-5 font-[var(--font-display)] text-[34px] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[46px]" style={{ color: "#0B1230" }}>
                  {industry.title}
                </motion.h2>
                <motion.p variants={rise} className="mt-6 max-w-[520px] text-[17px] leading-[1.7]" style={{ color: C.body }}>{industry.desc}</motion.p>
                <Link
                  href={industry.href}
                  className="mt-8 inline-flex items-center gap-3 rounded-[14px] px-7 py-4 text-[16px] font-bold text-white no-underline transition-transform hover:-translate-y-0.5"
                  style={{ background: "#3D2BF0", boxShadow: "0 18px 36px -16px rgba(61,43,240,0.7)" }}
                >
                  {industry.cta}
                  <ArrowIcon size={18} stroke="#fff" />
                </Link>
              </motion.div>
              </AnimatePresence>
              <IndustryStage ind={industry} />
            </div>

            <motion.div {...reveal(0.1, 20)} className="mt-10 flex items-center gap-4">
              <div className="no-scrollbar grid flex-1 grid-cols-2 gap-1 rounded-[24px] bg-white p-2 sm:flex sm:items-stretch sm:overflow-x-auto sm:rounded-[28px]" style={{ boxShadow: "0 20px 50px -30px rgba(40,40,140,0.35)", border: "1px solid #EEF0F8" }}>
                {INDUSTRIES.map((ind, i) => {
                  const on = i === activeIndustry;
                  return (
                    <button
                      key={ind.name}
                      type="button"
                      onClick={() => setActiveIndustry(i)}
                      aria-pressed={on}
                      className={`relative flex items-center gap-2.5 rounded-[16px] px-3 py-3 text-left sm:shrink-0 sm:gap-3 sm:rounded-none sm:px-5 sm:py-4 lg:min-w-0 lg:flex-1 lg:shrink lg:gap-2.5 lg:px-3 ${i > 0 ? "sm:border-l sm:border-[#EEF0F8]" : ""}`}
                      style={on ? { background: "#F5F5FF" } : undefined}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12" style={{ background: ind.bg }}>
                        <ind.icon size={20} stroke={ind.fg} />
                      </span>
                      <span className="text-[13px] font-extrabold leading-[1.25] sm:whitespace-nowrap sm:text-[15px] lg:whitespace-normal lg:text-[14px]" style={{ color: on ? "#0B1230" : C.heading }}>{ind.tabLabel}</span>
                      {on && <TabProgress ms={IND_MS} running={indRun} k={`ind-${i}`} className="left-3 right-3 sm:left-5 sm:right-5 lg:left-3 lg:right-3" color={C.interactive} />}
                    </button>
                  );
                })}
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                <button type="button" aria-label="Previous industry" onClick={() => setActiveIndustry((activeIndustry + INDUSTRIES.length - 1) % INDUSTRIES.length)} className="flex h-14 w-14 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0 14px 30px -16px rgba(40,40,140,0.4)", border: "1px solid #EEF0F8" }}>
                  <span className="rotate-180"><ArrowIcon size={20} stroke="#0B1230" /></span>
                </button>
                <button type="button" aria-label="Next industry" onClick={() => setActiveIndustry((activeIndustry + 1) % INDUSTRIES.length)} className="flex h-14 w-14 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0 14px 30px -16px rgba(40,40,140,0.4)", border: "1px solid #EEF0F8" }}>
                  <ArrowIcon size={20} stroke="#0B1230" />
                </button>
              </div>
            </motion.div>

            <motion.div {...reveal(0, 30)} className="mt-8 grid items-center gap-6 rounded-[24px] bg-white/70 p-6 lg:grid-cols-[1fr_auto] lg:gap-10 lg:px-8" style={{ border: "1px solid #E9E9FB" }}>
              <div>
                <p className="text-[18px] font-extrabold leading-[1.4] sm:text-[20px]" style={{ color: "#0B1230" }}>
                  AI works differently when the information, processes, and decisions are specific to your industry.
                </p>
                <Link href="/why-evoq" className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold no-underline" style={{ color: C.interactive }}>
                  Explore all industries
                  <ArrowIcon size={16} stroke={C.interactive} />
                </Link>
              </div>
              <div className="lg:max-w-[460px]">
                <p className="text-[13.5px] leading-[1.6]" style={{ color: C.body }}>
                  EVI and AI agents work with the context of your industry to:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { t: "Find information", i: SearchIcon },
                    { t: "Identify what needs attention", i: FlagIcon },
                    { t: "Prepare the next action", i: SparkleIcon },
                  ].map((p) => (
                    <motion.span initial={{ opacity: 0, y: 10, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VP} transition={{ duration: 0.45, delay: 0.3 + ["Find information", "Identify what needs attention", "Prepare the next action"].indexOf(p.t) * 0.12, ease: EASE }} key={p.t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12.5px] font-bold" style={{ color: "#0B1230", border: "1px solid #E4E4FA", boxShadow: "0 8px 20px -14px rgba(40,40,140,0.4)" }}>
                      <p.i size={15} stroke={C.interactive} />
                      {p.t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 7. PUT EVOQ AI TO WORK ===== */}
      <section id="get-started" className="relative" style={{ scrollMarginTop: 96, background: "linear-gradient(180deg, #F4F3FF 0%, #FBFBFF 100%)" }}>
        <div className="px-5 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-[1300px] py-12 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VP} transition={{ duration: 0.85, ease: EASE }}
              className="relative overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-14 sm:py-20"
              style={{ background: "linear-gradient(115deg, #2417C4 0%, #3A1FDA 42%, #5A1FEA 75%, #8A26F2 100%)", boxShadow: "0 30px 80px -30px rgba(60,30,220,0.5)" }}
            >
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 80 C 120 110, 220 230, 330 300 L0 300 Z" fill="#B84DFF" opacity="0.5" />
                <path d="M0 150 C 80 140, 170 220, 260 300 L0 300 Z" fill="#9B3CFF" opacity="0.55" />
                <path d="M180 260 C 380 230, 520 300, 700 285 C 850 272, 950 240, 1000 210 L1000 300 L200 300 Z" fill="#8A2BFF" opacity="0.55" />
                <path d="M740 60 C 800 20, 900 10, 1000 0 L1000 190 C 930 150, 790 130, 740 60 Z" fill="#5E2BFF" opacity="0.45" />
              </svg>
              <div className="relative">
                <motion.p {...reveal(0.2, 16)} className="text-[12.5px] font-extrabold uppercase tracking-[0.2em] text-white/90">Get started</motion.p>
                <motion.h2 {...reveal(0.3, 24)} className="mt-5 font-[var(--font-display)] text-[32px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[46px]">
                  Put EVOQ AI to work
                </motion.h2>
                <motion.p {...reveal(0.42, 24)} className="mx-auto mt-4 max-w-[640px] text-[16px] leading-[1.7] text-white/90 sm:text-[18px]">
                  Bring AI into the applications and systems where your work already happens.
                </motion.p>
                <motion.div {...reveal(0.55, 24)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowGetStarted(true)}
                    className="inline-flex items-center gap-2 rounded-[12px] bg-white px-8 py-4 text-[15px] font-extrabold transition-transform hover:-translate-y-0.5"
                    style={{ color: "#2417C4" }}
                  >
                    Book a demo
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-[12px] px-8 py-4 text-[15px] font-extrabold text-white no-underline ring-1 ring-white/60 transition-colors hover:bg-white/10"
                  >
                    Talk to an expert
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
    </MotionConfig>
  );
}
