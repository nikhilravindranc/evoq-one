import Image from "next/image";
import { HealthcareLogo } from "./HealthcareLogo";

type IP = { size?: number; stroke?: string };

const Svg = ({ size = 24, stroke = "currentColor", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const ArrowIcon = (p: IP) => (<Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>);
const CheckCircleIcon = (p: IP) => (<Svg {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.4 2.4L16 10" /></Svg>);
const ClockIcon = (p: IP) => (<Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Svg>);
const CalendarIcon = (p: IP) => (<Svg {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></Svg>);
const MessageIcon = (p: IP) => (<Svg {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Svg>);
const UsersIcon = (p: IP) => (<Svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" /><path d="M16 4.2c1.5.5 2.5 1.9 2.5 3.5s-1 3-2.5 3.5M19 20c-.5-2.3-1.6-3.8-3.2-4.6" /></Svg>);
const HomeIcon = (p: IP) => (<Svg {...p}><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" /></Svg>);
const BarChartIcon = (p: IP) => (<Svg {...p}><path d="M4 20V10M12 20V4M20 20v-7" /></Svg>);
const MegaphoneIcon = (p: IP) => (<Svg {...p}><path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1Z" /><path d="M18 9a4 4 0 0 1 0 6" /></Svg>);

/* ---------- shared pieces ---------- */
type Accent = { eyebrow: string; bg: string; blob: string; navActive: string; navActiveText: string };

function AISectionShell({
  accent, eyebrow, title, lead, body, children, reverse = false,
}: { accent: Accent; eyebrow: string; title: string; lead: string; body: string; children: React.ReactNode; reverse?: boolean }) {
  return (
    <section className={`relative overflow-hidden ${accent.bg}`}>
      <div className={`pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full blur-3xl ${accent.blob}`} />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#4747E0]/10 via-[#5C5CFF]/10 to-[#8484FF]/10 blur-3xl" />
      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1400px] py-16 lg:py-24">
          <div className={`grid gap-14 lg:items-center ${reverse ? "lg:grid-cols-[1.2fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.2fr]"}`}>
            <div className={`max-w-[500px] ${reverse ? "lg:order-2" : ""}`}>
              <p className="text-[12.5px] font-bold uppercase tracking-[0.2em]" style={{ color: accent.eyebrow }}>{eyebrow}</p>
              <h2 className="mt-5 font-[var(--font-display)] text-[36px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#102A43]">{title}</h2>
              <p className="mt-6 text-[16px] font-semibold leading-[1.6] text-[#31465A]">{lead}</p>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#31465A]/70">{body}</p>
              <a
                href="/ai"
                className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#4747E0] to-[#5C5CFF] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_20px_40px_-16px_rgba(71,71,224,0.55)] transition-transform hover:-translate-y-0.5"
              >
                Explore EVOQ AI
                <ArrowIcon size={18} stroke="#fff" />
              </a>
            </div>
            <div className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CardData = {
  answer: React.ReactNode;
  agentName: string;
  status: string;
  rows: { text: string; done: boolean }[];
  button: string;
};

function EviAgentCard({ d, className = "" }: { d: CardData; className?: string }) {
  return (
    <div className={`rounded-[24px] bg-gradient-to-r from-[#000099] via-[#4747E0] to-[#5C5CFF] p-[1.5px] shadow-[0_35px_70px_-24px_rgba(71,71,224,0.55)] ${className}`}>
      <div className="rounded-[22.5px] bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Image src="/ai/ai-logo-icon.png" alt="EVOQ AI" width={32} height={32} className="rounded-[10px]" />
            <span className="text-[15px] font-extrabold text-[#0C2472]">EVI</span>
          </span>
          <span className="rounded-full bg-[#ECECFF] px-3 py-1 text-[11px] font-bold text-[#4747E0]">AI assistant</span>
        </div>
        <div className="mt-3 rounded-[14px] bg-[#F5F5FF] p-3.5 text-[13px] leading-[1.6] text-[#0C2472]">{d.answer}</div>

        <div className="mt-3 rounded-[14px] border border-[#E6E6FA] p-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] font-extrabold text-[#0C2472]">
              <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#ECECFF]">
                <ClockIcon size={14} stroke="#4747E0" />
              </span>
              {d.agentName}
            </span>
            <span className="rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[10.5px] font-bold text-[#B7791F]">{d.status}</span>
          </div>
          <div className="mt-3 flex flex-col gap-2 text-[12.5px] text-[#31465A]/80">
            {d.rows.map((r) => (
              <span key={r.text} className="flex items-center gap-2">
                {r.done ? <CheckCircleIcon size={15} stroke="#0E9F6E" /> : <CalendarIcon size={15} stroke="#B7791F" />}
                {r.text}
              </span>
            ))}
          </div>
          <button type="button" className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#4747E0] px-4 py-2 text-[12.5px] font-bold text-white">
            {d.button}
            <ArrowIcon size={13} stroke="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* desktop composition (980x600, scaled) + mobile fallback (card only) */
/* scaled 980x600 desktop canvas + mobile fallback (EVI card only) */
function Canvas({ card, children, mobileTop }: { card: CardData; children: React.ReactNode; mobileTop?: React.ReactNode }) {
  return (
    <>
      <div className="relative mx-auto hidden w-full max-w-[720px] lg:block" style={{ height: 441 }}>
        <div className="relative h-[600px] w-[980px] origin-top-left" style={{ transform: "scale(0.735)" }}>{children}</div>
      </div>
      <div className="flex flex-col gap-5 lg:hidden">
        {mobileTop}
        <EviAgentCard d={card} className="mx-auto w-full max-w-[480px]" />
      </div>
    </>
  );
}

/* CRM: EVI docked as a side panel, input anchored inside it */
function EviDock({ d, className = "" }: { d: CardData; className?: string }) {
  return (
    <div className={`flex flex-col rounded-[26px] bg-gradient-to-b from-[#4747E0] to-[#5C5CFF] p-[1.5px] shadow-[0_40px_80px_-28px_rgba(71,71,224,0.6)] ${className}`}>
      <div className="flex flex-1 flex-col rounded-[24.5px] bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Image src="/ai/ai-logo-icon.png" alt="EVOQ AI" width={32} height={32} className="rounded-[10px]" />
            <span className="text-[15px] font-extrabold text-[#0C2472]">EVI</span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#4747E0]">
            <i className="h-[7px] w-[7px] rounded-full bg-[#4747E0]" />
            Online
          </span>
        </div>
        <div className="mt-4 flex justify-end">
          <p className="max-w-[250px] rounded-[16px] rounded-br-[5px] bg-gradient-to-r from-[#4747E0] to-[#5C5CFF] px-3.5 py-2.5 text-[12.5px] font-semibold leading-[1.45] text-white">
            Who has not had a reply in 48 hours?
          </p>
        </div>
        <div className="mt-3 rounded-[16px] rounded-bl-[5px] bg-[#F5F5FF] p-3.5 text-[12.5px] leading-[1.6] text-[#0C2472]">{d.answer}</div>
        <div className="mt-3 rounded-[14px] border border-[#E6E6FA] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-extrabold text-[#0C2472]">{d.agentName}</span>
            <span className="rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[10px] font-bold text-[#B7791F]">{d.status}</span>
          </div>
          <div className="mt-2.5 flex flex-col gap-1.5 text-[12px] text-[#31465A]/80">
            {d.rows.map((r) => (
              <span key={r.text} className="flex items-center gap-2">
                {r.done ? <CheckCircleIcon size={14} stroke="#0E9F6E" /> : <CalendarIcon size={14} stroke="#B7791F" />}
                {r.text}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1" />
        <div className="mt-4 rounded-[18px] border-2 border-[#4747E0] bg-white p-3 shadow-[0_14px_30px_-16px_rgba(71,71,224,0.6)]">
          <p className="text-[13px] text-[#31465A]/50">Ask EVI about an enquiry…</p>
          <div className="mt-3 flex items-center gap-3 text-[#4747E0]">
            <MessageIcon size={15} />
            <span className="text-[13px] font-bold">@</span>
            <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#4747E0]">
              <ArrowIcon size={15} stroke="#fff" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ accent, logoLabel, items }: { accent: Accent; logoLabel: string; items: { icon: (p: IP) => React.ReactElement; label: string; active?: boolean }[] }) {
  return (
    <div className="hidden w-[168px] shrink-0 flex-col border-r border-[#31465A]/8 bg-[#FAFBFC] p-4 sm:flex">
      <div className="px-1">
        <HealthcareLogo label={logoLabel} compact />
      </div>
      <nav className="mt-6 flex flex-col gap-0.5">
        {items.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[12.5px] font-semibold"
            style={item.active ? { background: accent.navActive, color: accent.navActiveText } : { color: "rgba(49,70,90,0.6)" }}
          >
            <item.icon size={15} stroke={item.active ? accent.navActiveText : "#31465A99"} />
            {item.label}
          </span>
        ))}
      </nav>
    </div>
  );
}

/* ---------- Healthcare CRM ---------- */
const CRM_ACCENT: Accent = {
  eyebrow: "#0FA3BC",
  bg: "bg-gradient-to-br from-white via-[#F1FBFC] to-[#E0F5F9]",
  blob: "bg-[#C6EEF4]/70",
  navActive: "#E0F5F9",
  navActiveText: "#0E7C93",
};

const PIPELINE = [
  { stage: "New", dot: "#18B8D1", cards: [{ n: "Emily Carter", t: "Skin treatment", w: "2h ago" }, { n: "Noah Brooks", t: "Dental check-up", w: "5h ago" }] },
  { stage: "Contacted", dot: "#4747E0", cards: [{ n: "Priya Nair", t: "Physiotherapy", w: "1d ago" }, { n: "Liam Reed", t: "Consultation", w: "2d ago", flag: true }] },
  { stage: "Booked", dot: "#0E9F6E", cards: [{ n: "Sophia Hale", t: "Consultation", w: "Sep 18" }, { n: "Daniel Cruz", t: "Follow-up", w: "Sep 20" }] },
  { stage: "Needs follow-up", dot: "#F59E0B", cards: [{ n: "Ava Mitchell", t: "No reply 48h", w: "2d ago", flag: true }, { n: "James Wood", t: "No reply 3d", w: "3d ago", flag: true }] },
];

const CRM_CARD: CardData = {
  answer: (<><strong>3 enquiries</strong> have had no reply for 48 hours. Ava Mitchell and James Wood asked about treatment options and have not heard back.</>),
  agentName: "Enquiry follow-up agent",
  status: "Awaiting approval",
  rows: [
    { text: "3 enquiries reviewed", done: true },
    { text: "3 replies drafted", done: true },
    { text: "2 need your approval", done: false },
  ],
  button: "Review replies",
};

export function HealthcareCrmAI() {
  const win = (
    <>
      <Sidebar
        accent={CRM_ACCENT}
        logoLabel="Healthcare CRM"
        items={[
          { icon: HomeIcon, label: "Dashboard" },
          { icon: MessageIcon, label: "Enquiries", active: true },
          { icon: UsersIcon, label: "Patients" },
          { icon: CalendarIcon, label: "Follow-ups" },
          { icon: MegaphoneIcon, label: "Campaigns" },
          { icon: BarChartIcon, label: "Reports" },
        ]}
      />
      <div className="min-w-0 flex-1 overflow-hidden p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-bold text-[#102A43]">Enquiries</p>
            <p className="text-[11.5px] text-[#31465A]/55">Track every enquiry from first contact to booking</p>
          </div>
          <span className="rounded-full bg-[#18B8D1] px-4 py-1.5 text-[11.5px] font-bold text-white">New enquiry</span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {PIPELINE.map((col) => (
            <div key={col.stage} className="rounded-[14px] bg-[#FAFBFC] p-2.5 ring-1 ring-[#31465A]/6">
              <p className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-[#31465A]/70">
                <i className="h-2 w-2 rounded-full" style={{ background: col.dot }} />
                {col.stage}
              </p>
              <div className="mt-2.5 flex flex-col gap-2">
                {col.cards.map((c) => (
                  <div key={c.n} className="rounded-[11px] bg-white p-2.5 ring-1 ring-[#31465A]/8" style={c.flag ? { boxShadow: "inset 3px 0 0 #F59E0B" } : undefined}>
                    <p className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#102A43]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E0F5F9] text-[9px] font-extrabold text-[#0E7C93]">{c.n.split(" ").map((x) => x[0]).join("")}</span>
                      {c.n}
                    </p>
                    <p className="mt-1 text-[10.5px] text-[#31465A]/60">{c.t}</p>
                    <p className="mt-0.5 text-[10px] text-[#31465A]/40">{c.w}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  return (
    <AISectionShell
      accent={CRM_ACCENT}
      reverse
      eyebrow="AI across patient relationships"
      title="EVI and AI agents, working across your enquiries and follow-ups."
      lead="Find who needs a reply. Prepare the response. Keep relationships moving."
      body="EVI, the EVOQ AI assistant, helps your team find the enquiries, patient history, and follow-ups that need attention, and prepares the next step. AI agents handle defined tasks such as drafting replies and preparing reminders, then return the result for your review."
    >
      <Canvas card={CRM_CARD}>
        <div className="absolute left-0 top-[6%] flex h-[490px] w-[700px] overflow-hidden rounded-[22px] bg-white shadow-[0_40px_90px_-30px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/8">
          {win}
        </div>
        <EviDock d={CRM_CARD} className="absolute right-0 top-[40px] h-[540px] w-[340px]" />
      </Canvas>
    </AISectionShell>
  );
}

/* ---------- Healthcare Practice Management ---------- */
const PM_ACCENT: Accent = {
  eyebrow: "#2A8F84",
  bg: "bg-gradient-to-br from-white via-[#F2FBF9] to-[#E2F5F2]",
  blob: "bg-[#CDEEE9]/70",
  navActive: "#DDF3EF",
  navActiveText: "#1F7A70",
};

const PM_CARD: CardData = {
  answer: (<><strong>4 appointments</strong> tomorrow are unconfirmed and <strong>3 provider slots</strong> are open. Dr. Patel has a gap at 10:00 that matches two waitlisted patients.</>),
  agentName: "Scheduling agent",
  status: "Awaiting approval",
  rows: [
    { text: "4 reminders prepared", done: true },
    { text: "2 waitlist patients matched", done: true },
    { text: "1 slot change needs approval", done: false },
  ],
  button: "Review schedule",
};

const PM_PROMPTS = ["Confirm tomorrow's appointments", "Show no-show risk", "Balance provider schedules"];

function PmInputBar({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[30px] bg-gradient-to-r from-[#000099] via-[#4747E0] to-[#5C5CFF] p-[2px] shadow-[0_34px_70px_-26px_rgba(71,71,224,0.7)] ${className}`}>
      <div className="flex items-center gap-4 rounded-[28px] bg-white px-5 py-4">
        <Image src="/ai/ai-logo-icon.png" alt="EVOQ AI" width={44} height={44} className="shrink-0 rounded-[13px]" />
        <p className="flex-1 text-[18px] font-semibold text-[#0C2472]">
          Fill tomorrow&apos;s open slots from the waitlist
          <span className="ml-0.5 inline-block h-[22px] w-[2px] translate-y-[4px] animate-pulse bg-[#4747E0]" />
        </p>
        <span className="hidden items-center gap-1.5 text-[#4747E0] sm:flex">
          <MessageIcon size={18} />
          <span className="text-[15px] font-bold">@</span>
        </span>
        <span className="flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#4747E0] to-[#5C5CFF] px-6 text-[15px] font-bold text-white shadow-[0_14px_28px_-12px_rgba(71,71,224,0.9)]">
          Run
          <ArrowIcon size={17} stroke="#fff" />
        </span>
      </div>
    </div>
  );
}

function PmStep({ n, title, tone, children, className = "" }: { n: number; title: string; tone: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col rounded-[26px] bg-white p-5 ring-1 ring-[#E6E6FA] shadow-[0_30px_60px_-34px_rgba(40,40,140,0.4)] ${className}`}>
      <p className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-extrabold text-white" style={{ background: tone }}>{n}</span>
        <span className="text-[14px] font-extrabold text-[#0C2472]">{title}</span>
      </p>
      <div className="mt-4 flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function PmBoard() {
  const stats = [
    { n: "4", label: "Unconfirmed appointments", sub: "Tomorrow", bg: "#FFF4DB", fg: "#B7791F" },
    { n: "3", label: "Open provider slots", sub: "Dr. Patel, Dr. Okafor", bg: "#E3F7EC", fg: "#0E8F5F" },
    { n: "2", label: "Waitlist matches", sub: "Fit the open slots", bg: "#ECECFF", fg: "#4747E0" },
  ];
  const steps = [
    { t: "Checking provider calendars", done: true },
    { t: "Matching waitlist patients", done: true },
    { t: "Drafting appointment reminders", done: false, active: true },
    { t: "Preparing slot changes", done: false },
  ];
  const actions = [
    { t: "Send 4 reminders", tag: "Ready", tone: "#0E9F6E", bg: "#E3F7EC" },
    { t: "Fill Dr. Patel, 10:00", tag: "Ready", tone: "#0E9F6E", bg: "#E3F7EC" },
    { t: "Move 1 booking to Dr. Okafor", tag: "Approval", tone: "#B7791F", bg: "#FFF4DB" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col">
      <PmInputBar />
      <div className="mt-4 flex flex-wrap gap-2.5">
        {PM_PROMPTS.map((p) => (
          <span key={p} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#0C2472] ring-1 ring-[#D9D9FA]">{p}</span>
        ))}
      </div>

      <div className="mt-5 grid flex-1 grid-cols-[1fr_28px_1.1fr_28px_1.05fr] items-stretch">
        <PmStep n={1} title="EVI found" tone="#B7791F">
          <div className="flex flex-1 flex-col justify-between gap-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-[16px] px-3 py-2.5" style={{ background: s.bg }}>
                <span className="w-[36px] text-center font-[var(--font-display)] text-[34px] font-extrabold leading-none" style={{ color: s.fg }}>{s.n}</span>
                <span>
                  <span className="block text-[13px] font-extrabold leading-[1.25] text-[#0C2472]">{s.label}</span>
                  <span className="block text-[11.5px] text-[#31465A]/60">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </PmStep>

        <span className="flex items-center justify-center"><ArrowIcon size={22} stroke="#8484FF" /></span>

        <PmStep n={2} title="Scheduling agent" tone="#4747E0">
          <span className="-mt-2 mb-3 flex items-center gap-1.5 text-[11px] font-bold text-[#4747E0]">
            <i className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#4747E0]" />
            Working on it
          </span>
          <div className="flex flex-col gap-3.5">
            {steps.map((s) => (
              <span key={s.t} className="flex items-center gap-2.5 text-[13px]" style={{ color: s.done || s.active ? "#0C2472" : "rgba(49,70,90,0.45)", fontWeight: s.active ? 700 : 500 }}>
                {s.done ? (
                  <CheckCircleIcon size={18} stroke="#0E9F6E" />
                ) : s.active ? (
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-[#4747E0]"><i className="h-[6px] w-[6px] rounded-full bg-[#4747E0]" /></span>
                ) : (
                  <span className="h-[18px] w-[18px] rounded-full border-2 border-[#D9DCE8]" />
                )}
                {s.t}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-5">
            <div className="h-2 overflow-hidden rounded-full bg-[#ECECFF]">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#4747E0] to-[#8484FF]" />
            </div>
            <p className="mt-2 text-[11.5px] font-semibold text-[#31465A]/60">68% complete</p>
          </div>
        </PmStep>

        <span className="flex items-center justify-center"><ArrowIcon size={22} stroke="#8484FF" /></span>

        <PmStep n={3} title="Ready for review" tone="#0E9F6E">
          <div className="flex flex-1 flex-col justify-between gap-2.5">
            {actions.map((a) => (
              <div key={a.t} className="flex items-center gap-2 rounded-[14px] border border-[#E6E6FA] px-3 py-4">
                <span className="flex-1 text-[12.5px] font-bold leading-[1.3] text-[#0C2472]">{a.t}</span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: a.bg, color: a.tone }}>{a.tag}</span>
              </div>
            ))}
          </div>
          <span className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#4747E0] py-3 text-[13.5px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(71,71,224,0.8)]">
            Approve all
            <ArrowIcon size={15} stroke="#fff" />
          </span>
        </PmStep>
      </div>
    </div>
  );
}

export function HealthcarePmAI() {
  return (
    <AISectionShell
      accent={PM_ACCENT}
      eyebrow="AI across daily operations"
      title="EVI and AI agents, working across your practice operations."
      lead="Spot schedule gaps. Prepare the next action. Reduce routine admin."
      body="EVI, the EVOQ AI assistant, helps your team find information across appointments, providers, check-ins, and billing, and prepares the next step. AI agents handle defined tasks such as appointment reminders and waitlist matching, then return the result for your review."
    >
      <Canvas card={PM_CARD} mobileTop={<PmInputBar />}>
        <PmBoard />
      </Canvas>
    </AISectionShell>
  );
}
