"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScaleFit } from "./ScaleFit";

const C = {
  interactive: "#4747E0",
  primary: "#5C5CFF",
  heading: "#0B1230",
  body: "#475467",
  muted: "#667085",
  border: "#EEF0F8",
  soft: "#F2F2FF",
  hi: "#ECECFF",
};
const VP = { once: true, margin: "-60px" } as const;
const EASE = [0.22, 1, 0.36, 1] as const;
const CARD: React.CSSProperties = { background: "#fff", border: `1px solid ${C.border}`, boxShadow: "0 24px 56px -30px rgba(40,40,140,0.35)" };

type IP = { size?: number; stroke?: string };
const Svg = ({ size = 22, stroke = "currentColor", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const BarsIcon = (p: IP) => (<Svg {...p}><rect x="3" y="11" width="5" height="10" rx="1" /><rect x="9.5" y="3" width="5" height="18" rx="1" /><rect x="16" y="8" width="5" height="13" rx="1" /></Svg>);
const UserIcon = (p: IP) => (<Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4.2 4-6 8-6s7 1.8 8 6" /></Svg>);
const DocIcon = (p: IP) => (<Svg {...p}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5M9 13h6M9 17h6" /></Svg>);
const WrenchIcon = (p: IP) => (<Svg {...p}><path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5V21h3.5l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.2-2.2z" /></Svg>);
const ChartIcon = (p: IP) => (<Svg {...p}><path d="M4 20V10M12 20V4M20 20v-7" /></Svg>);
const CalendarIcon = (p: IP) => (<Svg {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></Svg>);
const ChatIcon = (p: IP) => (<Svg {...p}><path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" /></Svg>);
const ChevronIcon = (p: IP) => (<Svg {...p}><path d="M9 6l6 6-6 6" /></Svg>);
const MailIcon = (p: IP) => (<Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></Svg>);
const ArrowIcon = (p: IP) => (<Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>);
const DotsIcon = () => (<svg width="22" height="6" viewBox="0 0 22 6" fill="#475467" aria-hidden="true"><circle cx="3" cy="3" r="2" /><circle cx="11" cy="3" r="2" /><circle cx="19" cy="3" r="2" /></svg>);
const Star = ({ size, color = "#3D6BFF" }: { size: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1c.9 5.6 4 9.1 11 11-7 1.9-10.1 5.4-11 11-.9-5.6-4-9.1-11-11C8 10.100 11.100 6.600 12 1Z" fill={color} /></svg>
);

const INFO_ROWS = [
  { icon: UserIcon, label: "Account owner", value: "Sarah Mitchell" },
  { icon: CalendarIcon, label: "Recent service visit", value: "Sept 28, 2024" },
  { icon: DocIcon, label: "Outstanding invoice", value: "$12,400" },
  { icon: ChatIcon, label: "Last customer contact", value: "Oct 1, 2024" },
];

const APP_CHIPS = [
  { src: "/evoq-ai/apps/crm.png", w: 135, h: 55, alt: "CRM" },
  { src: "/evoq-ai/apps/serviceops.png", w: 253, h: 55, alt: "ServiceOps" },
  { src: "/evoq-ai/apps/billing.png", w: 184, h: 55, alt: "Billing" },
];

const EXTERNAL = [
  { src: "/evoq-ai/systems/salesforce.png", alt: "Salesforce", w: 72, h: 54, x: 343, y: 2, size: 82 },
  { src: "/evoq-ai/systems/sap.png", alt: "SAP", w: 72, h: 50, x: 592, y: 2, size: 82 },
  { src: "/evoq-ai/systems/zendesk.png", alt: "Zendesk", w: 68, h: 62, x: 766, y: 62, size: 78 },
  { src: "/evoq-ai/systems/teams.png", alt: "Microsoft Teams", w: 66, h: 64, x: 926, y: 158, size: 76 },
];

function CustomerPanel() {
  return (
    <div className="relative h-full w-full">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-[var(--font-display)] text-[32px] font-extrabold leading-[1.1]" style={{ color: C.heading }}>Acme Corp.</h4>
          <p className="mt-2 text-[17px]" style={{ color: C.muted }}>Customer · Since 2023</p>
        </div>
        <DotsIcon />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {APP_CHIPS.map((a) => (
          <span key={a.alt} className="flex h-[50px] items-center rounded-full px-4" style={{ background: "#FAFAFF", border: `1px solid ${C.border}` }}>
            <Image src={a.src} alt={a.alt} width={a.w} height={a.h} className="h-6 w-auto" />
          </span>
        ))}
      </div>
      <div className="mt-6 rounded-[18px]" style={{ border: `1px solid ${C.border}` }}>
        {INFO_ROWS.map((r, i) => (
          <div key={r.label} className="flex items-center gap-4 px-4 py-3.5" style={{ borderTop: i ? `1px solid ${C.border}` : undefined }}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: "#F7F7FC" }}>
              <r.icon size={22} stroke="#2A2F45" />
            </span>
            <span className="flex-1">
              <span className="block text-[14px]" style={{ color: C.muted }}>{r.label}</span>
              <span className="block text-[17px] font-semibold" style={{ color: C.heading }}>{r.value}</span>
            </span>
            <ChevronIcon size={18} stroke="#B6BBC8" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EviCard({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`flex items-center gap-5 rounded-[26px] p-6 ${className}`}
      style={{ ...CARD, ...style }}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
    >
      <span className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full" style={{ background: "radial-gradient(circle, #FFFFFF 0%, #E6E3FF 45%, #D3CEFF 100%)", boxShadow: "0 0 0 8px rgba(124,108,255,0.14), 0 14px 30px -10px rgba(92,92,255,0.6)" }}>
        <Image src="/ai/ai-logo-icon.png" alt="EVI" width={52} height={52} className="rounded-full" />
      </span>
      <div>
        <p className="font-[var(--font-display)] text-[26px] font-extrabold leading-none" style={{ color: C.heading }}>EVI</p>
        <p className="mt-2 text-[16px] leading-[1.45]" style={{ color: C.muted }}>Reviewing customer activity across your systems…</p>
        <span className="mt-3 flex gap-1.5">
          {[0, 1, 2, 3].map((d) => (
            <motion.i
              key={d}
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: C.primary }}
              animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.35, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: d * 0.2 }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

function FinanceCard({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`rounded-[28px] p-5 ${className}`}
      style={{ ...CARD, ...style }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
    >
      <div className="flex items-center gap-4">
        <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full" style={{ background: "#E9E6FF" }}>
          <DocIcon size={26} stroke={C.interactive} />
        </span>
        <div className="flex-1">
          <p className="text-[20px] font-extrabold" style={{ color: C.heading }}>Finance agent</p>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13.5px] font-semibold" style={{ background: "#E3F7EC", color: "#0E8F5F" }}>
            ✓ Follow-up ready
          </span>
        </div>
        <DotsIcon />
      </div>
      <div className="mt-5 flex gap-4 rounded-[16px] p-4" style={{ background: "#FAFAFC", border: `1px solid ${C.border}` }}>
        <MailIcon size={26} stroke="#2A2F45" />
        <p className="text-[15.5px] leading-[1.55]" style={{ color: C.body }}>
          Hi team,
          <br />
          Following up on the outstanding invoice for Acme Corp. Based on recent service activity and open orders, here is a summary and the next steps…
        </p>
      </div>
      <div className="mt-5 flex gap-4">
        <span className="flex flex-1 items-center justify-center rounded-[14px] py-3.5 text-[17px] font-semibold" style={{ border: `1.5px solid ${C.interactive}`, color: C.interactive, background: "#fff" }}>Review</span>
        <span className="flex flex-[1.5] items-center justify-center gap-2 rounded-[14px] py-3.5 text-[17px] font-semibold text-white" style={{ background: "#3D2BF0", boxShadow: "0 16px 30px -14px rgba(61,43,240,0.7)" }}>
          Send follow-up <ArrowIcon size={18} stroke="#fff" />
        </span>
      </div>
    </motion.div>
  );
}

function Sidebar({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const items = [BarsIcon, UserIcon, DocIcon, WrenchIcon, ChartIcon];
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`} style={style}>
      {items.map((I, i) => (
        <span key={i} className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px]" style={i === 0 ? { background: "#E4E1FF" } : undefined}>
          <I size={26} stroke={i === 0 ? C.interactive : "#2A2F45"} />
        </span>
      ))}
    </div>
  );
}

export function CrossSystemVisual() {
  return (
    <>
      {/* desktop composition */}
      <div className="hidden lg:block">
        <ScaleFit width={1130}>
          <div className="relative" style={{ width: 1130, height: 800 }}>
            <svg className="pointer-events-none absolute inset-0" width="1130" height="800" fill="none" aria-hidden="true">
              <path d="M250 95 C 300 20, 380 -2, 470 -2 C 560 -2, 700 18, 790 70 C 860 108, 940 150, 962 250 C 972 290, 990 320, 1010 350" stroke="#8F8FF0" strokeWidth="1.4" strokeDasharray="3 6" />
              <circle cx="464" cy="4" r="6" fill={C.primary} />
              <circle cx="753" cy="72" r="5" fill={C.primary} />
              <circle cx="893" cy="168" r="6" fill={C.primary} />
              <path d="M720 368 V 412" stroke={C.primary} strokeWidth="1.5" strokeDasharray="3 4" />
              <path d="m714 404 6 8 6-8" stroke={C.primary} strokeWidth="1.5" />
            </svg>

            {EXTERNAL.map((e, i) => (
              <motion.span
                key={e.alt}
                className="absolute flex items-center justify-center rounded-[18px] bg-white"
                style={{ left: e.x, top: e.y, width: e.size, height: e.size, boxShadow: "0 18px 40px -20px rgba(40,40,140,0.4)", border: `1px solid ${C.border}` }}
                initial={{ opacity: 0, scale: 0.4, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={VP}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 + i * 0.14 }}
              >
                <motion.span
                  className="flex items-center justify-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  <Image src={e.src} alt={e.alt} width={e.w} height={e.h} unoptimized style={{ width: e.w * 0.78, height: "auto" }} />
                </motion.span>
              </motion.span>
            ))}

            {/* window */}
            <motion.div className="absolute rounded-[34px]" initial={{ opacity: 0, y: 50, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VP} transition={{ duration: 0.8, ease: EASE }} style={{ left: 0, top: 90, width: 612, height: 560, background: "#EFEEFF", border: "1px solid #E3E1FA", boxShadow: "0 40px 90px -40px rgba(70,60,200,0.35)" }} />
            <Sidebar className="absolute" style={{ left: 22, top: 112 }} />
            <motion.div className="absolute rounded-[28px] bg-white p-[30px]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ left: 104, top: 106, width: 520, height: 528, boxShadow: "0 24px 60px -30px rgba(40,40,140,0.3)" }}>
              <CustomerPanel />
            </motion.div>

            <EviCard className="absolute" style={{ left: 572, top: 196, width: 360 }} />
            <FinanceCard className="absolute" style={{ left: 552, top: 430, width: 480 }} />
            <motion.div
              className="pointer-events-none absolute"
              style={{ left: 842, top: 232, width: 248 }}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VP}
              transition={{ type: "spring", stiffness: 90, damping: 13, delay: 1.1 }}
            >
              <motion.div animate={{ y: [0, -9, 0], rotate: [0, 2.5, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50% 100%" }}>
                <Image src="/evoq-ai/evi-robot.webp" alt="EVI" width={1350} height={1160} sizes="520px" className="h-auto w-full" style={{ filter: "drop-shadow(0 18px 24px rgba(60,50,200,0.25))" }} />
              </motion.div>
            </motion.div>
            <motion.span className="absolute" style={{ left: 1082, top: 322 }} animate={{ scale: [1, 1.2, 1], rotate: [0, 18, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}><Star size={46} /></motion.span>
            <motion.span className="absolute" style={{ left: 1100, top: 388 }} animate={{ scale: [1, 1.35, 1], rotate: [0, -20, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}><Star size={26} color="#5B3DF0" /></motion.span>
          </div>
        </ScaleFit>
      </div>

      {/* below lg: stacked */}
      <div className="flex flex-col gap-5 lg:hidden">
        <div className="rounded-[26px] bg-white p-5 sm:p-7" style={CARD}>
          <CustomerPanel />
        </div>
        <EviCard />
        <div className="relative mt-14">
          <Image src="/evoq-ai/evi-robot.webp" alt="EVI" width={1350} height={1160} className="pointer-events-none absolute -top-[82px] right-4 z-10 w-[132px]" />
          <FinanceCard />
        </div>
      </div>
    </>
  );
}
