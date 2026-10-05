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
const CardIcon = (p: IP) => (<Svg {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 10h19" /></Svg>);
const MegaphoneIcon = (p: IP) => (<Svg {...p}><path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1Z" /><path d="M18 9a4 4 0 0 1 0 6" /></Svg>);
const UserCheckIcon = (p: IP) => (<Svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" /><path d="m16 11 2 2 4-4" /></Svg>);

/* ---------- shared pieces ---------- */
type Accent = { eyebrow: string; bg: string; blob: string; navActive: string; navActiveText: string };

function AISectionShell({
  accent, eyebrow, title, lead, body, children,
}: { accent: Accent; eyebrow: string; title: string; lead: string; body: string; children: React.ReactNode }) {
  return (
    <section className={`relative overflow-hidden ${accent.bg}`}>
      <div className={`pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full blur-3xl ${accent.blob}`} />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#4747E0]/10 via-[#5C5CFF]/10 to-[#8484FF]/10 blur-3xl" />
      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1400px] py-16 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.2fr] lg:items-center">
            <div className="max-w-[500px]">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.2em]" style={{ color: accent.eyebrow }}>{eyebrow}</p>
              <h2 className="mt-5 font-[var(--font-display)] text-[36px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#102A43]">{title}</h2>
              <p className="mt-6 text-[16px] font-semibold leading-[1.6] text-[#31465A]">{lead}</p>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#31465A]/70">{body}</p>
              <a
                href="/evoq-ai"
                className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#4747E0] to-[#5C5CFF] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_20px_40px_-16px_rgba(71,71,224,0.55)] transition-transform hover:-translate-y-0.5"
              >
                Explore EVOQ AI
                <ArrowIcon size={18} stroke="#fff" />
              </a>
            </div>
            {children}
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
function Stage({ window: win, card }: { window: React.ReactNode; card: CardData }) {
  return (
    <>
      <div className="relative mx-auto hidden w-full max-w-[720px] lg:block" style={{ height: 441 }}>
        <div className="relative h-[600px] w-[980px] origin-top-left" style={{ transform: "scale(0.735)" }}>
          <span className="absolute right-[2%] top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-14px_rgba(16,42,67,0.4)] ring-1 ring-[#31465A]/8">
            <Image src="/ai/ai-logo-icon.png" alt="EVOQ AI" width={30} height={30} className="rounded-[9px]" />
          </span>
          <div className="absolute left-0 top-[6%] flex h-[490px] w-[860px] overflow-hidden rounded-[22px] bg-white shadow-[0_40px_90px_-30px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/8">
            {win}
          </div>
          <EviAgentCard d={card} className="absolute bottom-0 right-0 w-[480px]" />
        </div>
      </div>
      <div className="lg:hidden">
        <EviAgentCard d={card} className="mx-auto w-full max-w-[480px]" />
      </div>
    </>
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
      eyebrow="AI across patient relationships"
      title="EVI and AI agents, working across your enquiries and follow-ups."
      lead="Find who needs a reply. Prepare the response. Keep relationships moving."
      body="EVI, the EVOQ AI assistant, helps your team find the enquiries, patient history, and follow-ups that need attention, and prepares the next step. AI agents handle defined tasks such as drafting replies and preparing reminders, then return the result for your review."
    >
      <Stage window={win} card={CRM_CARD} />
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

const PROVIDERS = ["Dr. Patel", "Dr. Nguyen", "Dr. Okafor"];
const SLOTS = ["9:00", "10:00", "11:00", "12:00"];
type Appt = { who: string; what: string; state: "confirmed" | "unconfirmed" | "open" } | null;
const SCHEDULE: Appt[][] = [
  [{ who: "Emily Carter", what: "Consultation", state: "confirmed" }, { who: "Noah Brooks", what: "Check-up", state: "unconfirmed" }, null, { who: "Liam Reed", what: "Follow-up", state: "confirmed" }],
  [{ who: "Priya Nair", what: "Physio session", state: "unconfirmed" }, null, { who: "Sophia Hale", what: "Consultation", state: "confirmed" }, { who: "Daniel Cruz", what: "Review", state: "unconfirmed" }],
  [null, { who: "Ava Mitchell", what: "Treatment", state: "confirmed" }, { who: "James Wood", what: "Follow-up", state: "unconfirmed" }, null],
];

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

export function HealthcarePmAI() {
  const win = (
    <>
      <Sidebar
        accent={PM_ACCENT}
        logoLabel="Healthcare Practice Management"
        items={[
          { icon: HomeIcon, label: "Dashboard" },
          { icon: CalendarIcon, label: "Appointments", active: true },
          { icon: UsersIcon, label: "Providers" },
          { icon: UserCheckIcon, label: "Check-in" },
          { icon: CardIcon, label: "Billing" },
          { icon: BarChartIcon, label: "Reports" },
        ]}
      />
      <div className="min-w-0 flex-1 overflow-hidden p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-bold text-[#102A43]">Tomorrow&apos;s schedule</p>
            <p className="text-[11.5px] text-[#31465A]/55">12 appointments · 3 providers</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#F1F4F6] p-1 text-[11px] font-bold text-[#31465A]/60">
            <span className="rounded-full bg-white px-3 py-1 text-[#1F7A70] shadow-sm">Day</span>
            <span className="px-3 py-1">Week</span>
          </span>
        </div>
        <div className="mt-4 grid grid-cols-[48px_repeat(3,1fr)] gap-x-3 gap-y-2.5">
          <span />
          {PROVIDERS.map((p) => (
            <p key={p} className="text-center text-[11px] font-bold text-[#31465A]/70">{p}</p>
          ))}
          {SLOTS.map((t, row) => (
            <div key={t} className="contents">
              <p className="pt-3 text-[10.5px] font-semibold text-[#31465A]/45">{t}</p>
              {SCHEDULE.map((col, c) => {
                const a = col[row];
                if (!a) {
                  return (
                    <div key={c} className="flex h-[64px] items-center justify-center rounded-[11px] border border-dashed border-[#31465A]/15 text-[10.5px] font-semibold text-[#31465A]/35">
                      Open slot
                    </div>
                  );
                }
                const un = a.state === "unconfirmed";
                return (
                  <div key={c} className="h-[64px] rounded-[11px] p-2.5" style={{ background: un ? "#FFF8E6" : "#E6F6F3", boxShadow: `inset 3px 0 0 ${un ? "#F59E0B" : "#2A8F84"}` }}>
                    <p className="truncate text-[11.5px] font-bold text-[#102A43]">{a.who}</p>
                    <p className="truncate text-[10.5px] text-[#31465A]/60">{a.what}</p>
                    <p className="mt-0.5 text-[9.5px] font-bold" style={{ color: un ? "#B7791F" : "#1F7A70" }}>{un ? "Unconfirmed" : "Confirmed"}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  return (
    <AISectionShell
      accent={PM_ACCENT}
      eyebrow="AI across daily operations"
      title="EVI and AI agents, working across your practice operations."
      lead="Spot schedule gaps. Prepare the next action. Reduce routine admin."
      body="EVI, the EVOQ AI assistant, helps your team find information across appointments, providers, check-ins, and billing, and prepares the next step. AI agents handle defined tasks such as appointment reminders and waitlist matching, then return the result for your review."
    >
      <Stage window={win} card={PM_CARD} />
    </AISectionShell>
  );
}
