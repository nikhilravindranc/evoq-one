import Image from "next/image";
import Link from "next/link";

/* ---------- shared bits (Practice Management palette) ---------- */

const ICONS = {
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 10h.01M12 10h.01M16 10h.01",
  cal: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 16l2 2 4-4",
  calplus: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM12 13v5M9.5 15.5h5",
  steth: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1M20 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  card: "M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM2 10h20M6 15h4",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  refresh: "M21 12a9 9 0 0 0-15-6.7L3 8M3 3v5h5M3 12a9 9 0 0 0 15 6.7L21 16M21 21v-5h-5",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  clip: "M9 3h6v3H9zM7 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1M9 12h6M9 16h4",
  tooth: "M7 3c-2.5 0-4 2-4 4.5C3 11 4.5 21 6.5 21c1.5 0 1.5-3.5 2.5-5.5.7-1.4 1.3-1.5 3-1.5s2.3.1 3 1.5c1 2 1 5.5 2.5 5.5 2 0 3.5-10 3.5-13.5C21 5 19.5 3 17 3c-2 0-3 1.2-5 1.2S9 3 7 3z",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z",
  drop: "M12 2.7c4 4.5 6 7.5 6 10.3a6 6 0 0 1-12 0c0-2.8 2-5.8 6-10.3z",
  dumbbell: "M6 6v12M18 6v12M3 9v6M21 9v6M6 12h12",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c3-5 6-8 10-10",
  star: "m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  heart: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  mega: "m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6",
  receipt: "M4 2v20l2-1.5L8 22l2-1.5L12 22l2-1.5L16 22l2-1.5L20 22V2l-2 1.5L16 2l-2 1.5L12 2l-2 1.5L8 2 6 3.5zM9 8h6M9 12h6",
  plus: "M12 5v14M5 12h14",
  check: "m5 12 5 5 9-10",
  pulse: "M22 12h-4l-3 9L9 3l-3 9H2",
  login: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  usercheck: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 11l2 2 4-4",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4",
  bars: "M6 20V10M12 20V4M18 20v-7",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  shield: "M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6zM9 12l2 2 4-4",
  code: "m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  building: "M4 3h16v18H4zM12 8v6M9 11h6M9 21v-3h6v3",
} as const;
type IconName = keyof typeof ICONS;

function Ic({ n, size = 24, stroke = "#2867B2" }: { n: IconName; size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[n]} />
    </svg>
  );
}

function ShieldNetworkIcon({ size = 28, stroke = "#fff" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.6 4.5 5.4v5.7c0 4.9 3.2 8.7 7.5 9.9 4.3-1.2 7.5-5 7.5-9.9V5.4z" />
      <circle cx="12" cy="8.6" r="1.35" fill={stroke} stroke="none" />
      <circle cx="9" cy="13.6" r="1.35" fill={stroke} stroke="none" />
      <circle cx="15" cy="13.6" r="1.35" fill={stroke} stroke="none" />
      <path d="M11.3 9.8 9.6 12.4M12.7 9.8l1.7 2.6M10.3 13.6h3.4" strokeWidth="1.4" />
    </svg>
  );
}

const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const H2 = "font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#26384B]";
const H3 = "font-[var(--font-display)] text-[24px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#26384B]";
const LEAD = "text-[16.5px] leading-[1.65] text-[#64748B]";
const WRAP = "px-5 sm:px-6 lg:px-6";
const INNER = "mx-auto max-w-[1300px]";
const CARD = "rounded-[20px] bg-white shadow-[0_28px_60px_-30px_rgba(38,56,75,0.42)] ring-1 ring-[#26384B]/5";
const BTN_PRIMARY =
  "inline-flex items-center gap-3 rounded-full bg-[#2867B2] px-8 py-4 text-[16px] font-semibold text-white no-underline shadow-[0_16px_32px_-16px_rgba(40,103,178,0.7)] transition-all hover:-translate-y-px hover:bg-[#205995]";
const BTN_SECONDARY =
  "inline-flex items-center gap-3 rounded-full border border-[#2867B2] bg-white px-8 py-4 text-[16px] font-semibold text-[#2867B2] no-underline transition-all hover:-translate-y-px hover:bg-[#F2F4F6]";

function Avatar({ src, initials, tone = "bg-[#DCDDF5] text-[#5B5FC7]", size = 32 }: { src?: string; initials?: string; tone?: string; size?: number }) {
  if (src) {
    return <Image unoptimized src={src} alt="" width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />;
  }
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${tone}`} style={{ width: size, height: size }}>
      {initials}
    </span>
  );
}

/* ---------- 1. every part of the day has a place ---------- */

export function HealthcarePmDay() {
  return (
    <section className="bg-[#F2F4F6]">
      <div className={WRAP}>
        <div className={`${INNER} grid items-start gap-8 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24`}>
          <h2 className={H2}>Every part of the day has a place.</h2>
          <div className={LEAD}>
            <p>
              A practice runs through hundreds of small activities. Appointments are scheduled, patients arrive,
              providers see patients, services are delivered, notes are recorded, follow-ups are planned, and the next
              visit needs to be arranged.
            </p>
            <p className="mt-4">
              Practice Management brings these activities together so your team can work with the information they
              need, when they need it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. from appointment to next visit ---------- */

const WORKFLOW = [
  { icon: "calplus", title: "Schedule", desc: "Create and manage appointments around provider availability, services, locations, and practice schedules." },
  { icon: "login", title: "Arrive", desc: "See who has arrived, who is waiting, and what needs attention at the front desk." },
  { icon: "usercheck", title: "Check in", desc: "Keep patient status and appointment information current as the day progresses." },
  { icon: "steth", title: "Visit", desc: "Give providers access to relevant patient information and record visit details, notes, forms, and documents." },
  { icon: "clip", title: "Service", desc: "Associate services and treatments with the visit and maintain the information needed for follow-up." },
  { icon: "bell", title: "Follow-up", desc: "Record follow-up requirements and keep the next step visible to the appropriate staff." },
  { icon: "receipt", title: "Billing", desc: "Pass the relevant service and visit information into the billing process." },
  { icon: "refresh", title: "Next visit", desc: "Continue the patient relationship with a clear view of previous activity and upcoming appointments." },
] as const;

const WF_TILES = ["bg-[#DCDDF5]", "bg-[#E5F8FB]", "bg-[#E7F7F5]", "bg-[#FFF3DF]"];
const WF_STROKES = ["#5B5FC7", "#26B9CF", "#3FA99B", "#D98E1F"];

export function HealthcarePmWorkflow() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#DCDDF5]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#E5F8FB] blur-3xl" />
      <div className={`relative ${WRAP}`}>
        <div className={`${INNER} py-16 lg:py-24`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_460px]">
            <div className="max-w-[680px]">
              <h2 className={H2}>From appointment to next visit.</h2>
              <p className={`mt-6 ${LEAD}`}>Follow the patient journey through every stage of the practice workflow.</p>
            </div>
            <div className="relative hidden pb-4 lg:block">
              <div className="absolute -left-8 -top-8 h-[170px] w-[170px] rounded-full bg-[#CFEEE8]" />
              <div className="relative h-[242px] overflow-hidden rounded-[28px] rounded-tr-[120px] rounded-br-[64px] shadow-[0_28px_60px_-32px_rgba(38,56,75,0.5)] ring-[6px] ring-white">
                <Image src="/healthcare/pm/checkin.jpg" alt="Patient checking in at the front desk" fill sizes="460px" className="object-cover" />
              </div>
              <div className="absolute -bottom-2 -left-10 flex items-center gap-4 rounded-[22px] bg-white py-3.5 pl-4 pr-8 shadow-[0_20px_44px_-22px_rgba(38,56,75,0.4)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DDF3EE]">
                  <Ic n="check" size={20} stroke="#3FA99B" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-[#26384B]">Checked in</span>
                  <span className="block text-[12.5px] text-[#64748B]">Ready for provider</span>
                </span>
              </div>
            </div>
          </div>

          <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {WORKFLOW.map((s, i) => (
              <li key={s.title} className="relative flex flex-col rounded-[22px] bg-white p-6 shadow-[0_18px_44px_-30px_rgba(38,56,75,0.38)] ring-1 ring-[#E2E7EB]">
                <div className="flex items-center justify-between">
                  <span className={`flex h-[54px] w-[54px] items-center justify-center rounded-full ${WF_TILES[i % 4]}`}>
                    <Ic n={s.icon} size={24} stroke={WF_STROKES[i % 4]} />
                  </span>
                  <span className="font-[var(--font-display)] text-[28px] font-extrabold text-[#26384B]/10">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-[24px] font-bold text-[#26384B]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#64748B]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. feature blocks ---------- */

type Geo = { l: number; t: number; w: number };
type BlockProps = {
  flip?: boolean;
  eyebrow: string;
  title: string;
  sub: string;
  paras: string[];
  photo: string;
  alt: string;
  ratio: [number, number];
  pos?: string;
  zoom?: [number, string];
  radius: string;
  blobA: string;
  blobB: string;
  geo?: Geo;
  card?: React.ReactNode;
};

function FeatureBlock({ flip, eyebrow, title, sub, paras, photo, alt, ratio, pos, zoom, radius, blobA, blobB, geo, card }: BlockProps) {
  const vars = geo ? ({ "--l": `${geo.l}%`, "--t": `${geo.t}%`, "--w": `${geo.w}%` } as React.CSSProperties) : undefined;
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={flip ? "lg:order-2" : ""}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2867B2]">{eyebrow}</p>
        <h2 className={`mt-3 ${H2}`}>{title}</h2>
        <p className="mt-5 text-[17px] font-semibold leading-[1.5] text-[#26384B]/85">{sub}</p>
        <div className={`mt-4 max-w-[540px] ${LEAD}`}>
          {paras.map((p, i) => (
            <p key={i} className={i ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className={`relative mx-auto w-full max-w-[580px] pb-2 ${geo ? "lg:pb-[76px]" : ""} ${flip ? "lg:order-1" : ""}`}>
        <div className={`relative w-full lg:w-[72%] ${flip ? "mr-auto" : "ml-auto"}`} style={{ aspectRatio: `${ratio[0]} / ${ratio[1]}`, ...vars }}>
          <div className="absolute -left-8 -top-8 aspect-square h-[46%] rounded-full" style={{ background: blobA }} />
          <div className={`absolute top-[16%] h-[62%] w-[16%] ${flip ? "-left-6 rounded-l-full" : "-right-6 rounded-r-full"}`} style={{ background: blobB }} />
          <div className={`absolute inset-0 overflow-hidden ${radius} shadow-[0_30px_60px_-32px_rgba(38,56,75,0.5)] ring-[5px] ring-white`}>
            <Image src={photo} alt={alt} fill sizes="420px" className="object-cover" style={{ objectPosition: pos, transform: zoom ? `scale(${zoom[0]})` : undefined, transformOrigin: zoom?.[1] }} />
          </div>
          {card && geo && (
            <div className="absolute hidden lg:left-[var(--l)] lg:top-[var(--t)] lg:block lg:w-[var(--w)]">{card}</div>
          )}
        </div>
        {card && <div className="mt-5 lg:hidden">{card}</div>}
      </div>
    </div>
  );
}

const Pill = ({ children, tone }: { children: React.ReactNode; tone: string }) => (
  <span className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[9.5px] font-semibold ${tone}`}>{children}</span>
);

const MiniCard = `${CARD} min-h-[170px] rounded-[16px] p-3.5`;

function KV({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-2 text-[10px]">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[38%_1fr] gap-2 border-b border-[#E2E7EB]/70 py-[5px] last:border-0">
          <dt className="text-[#64748B]">{k}</dt>
          <dd className="font-medium text-[#26384B]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Tabs({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex gap-3 border-b border-[#E2E7EB] text-[9.5px]">
      {items.map((t, i) => (
        <span key={t} className={`pb-1.5 font-medium ${i === 0 ? "border-b-2 border-[#2867B2] text-[#2867B2]" : "text-[#64748B]"}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

function PatientCard() {
  return (
    <div className={MiniCard}>
      <div className="flex items-center gap-2.5">
        <Avatar src="/healthcare/avatars/emily.jpg" size={34} />
        <div className="flex-1">
          <p className="text-[11.5px] font-bold text-[#26384B]">Emily Carter</p>
          <p className="text-[9px] text-[#64748B]">PID 10045 · 28 years</p>
        </div>
        <Pill tone="bg-[#DDF3EA] text-[#3B8F73]">Active</Pill>
      </div>
      <Tabs items={["Overview", "Visits", "Documents", "Notes"]} />
      <KV
        rows={[
          ["Phone", "+1 415 555 0123"],
          ["Email", "emily.carter@email.com"],
          ["Next appointment", "Thu, Sep 18, 2025 · 10:00 AM"],
          ["Primary provider", "Dr. Sarah Mitchell"],
        ]}
      />
    </div>
  );
}

function FrontDeskCard() {
  const q = [
    { img: "olivia", name: "Olivia Bennett", s: "Checked in", tone: "bg-[#DDF3EA] text-[#3B8F73]", t: "9:15 AM" },
    { img: "daniel", name: "Daniel Kim", s: "Waiting · 10 min", tone: "bg-[#FFF1D9] text-[#B87A14]", t: "9:30 AM" },
    { img: "sophia", name: "Sophia Lee", s: "Arrived", tone: "bg-[#DDF3EA] text-[#3B8F73]", t: "9:45 AM" },
  ];
  return (
    <div className={MiniCard}>
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-bold text-[#26384B]">Front desk · Today</p>
        <span className="text-[9px] text-[#64748B]">View all →</span>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
        {[["12", "Arrived", "bg-[#E1F5EF]"], ["3", "Waiting", "bg-[#FFF1D9]"], ["2", "Checked in", "bg-[#E3EEFB]"]].map(([n, l, bg]) => (
          <div key={l} className={`rounded-lg py-2 ${bg}`}>
            <p className="font-[var(--font-display)] text-[17px] font-bold leading-none text-[#26384B]">{n}</p>
            <p className="mt-1 text-[9px] text-[#64748B]">{l}</p>
          </div>
        ))}
      </div>
      <ul className="mt-2.5 flex flex-col gap-2">
        {q.map((p) => (
          <li key={p.name} className="flex items-center gap-2">
            <Avatar src={`/healthcare/avatars/${p.img}.jpg`} size={22} />
            <span className="flex-1 text-[10px] font-semibold text-[#26384B]">{p.name}</span>
            <Pill tone={p.tone}>{p.s}</Pill>
            <span className="w-[42px] text-right text-[9px] text-[#64748B]">{p.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisitCard() {
  return (
    <div className={MiniCard}>
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-bold text-[#26384B]">Visit · Sep 16, 2025</p>
        <Pill tone="bg-[#DDF3EA] text-[#3B8F73]">In progress</Pill>
      </div>
      <div className="mt-2.5 flex items-center gap-2.5">
        <Avatar src="/healthcare/avatars/daniel.jpg" size={30} />
        <div>
          <p className="text-[11px] font-bold text-[#26384B]">Daniel Kim</p>
          <p className="text-[9px] text-[#64748B]">PID 10072 · 42 years</p>
        </div>
      </div>
      <Tabs items={["Summary", "Notes", "Forms", "Documents"]} />
      <KV
        rows={[
          ["Provider", "Dr. Michael Chen"],
          ["Service", "General Consultation"],
          ["Appointment", "Tue, Sep 16, 2025 · 11:00 AM"],
          ["Status", "In progress"],
        ]}
      />
    </div>
  );
}

function ProvidersCard() {
  const p = [
    { i: "AS", n: "Dr. Amy Stevens", s: "Dermatology", st: "Available", tone: "bg-[#DDF3EA] text-[#3B8F73]", h: "9:00 AM – 5:00 PM" },
    { i: "JR", n: "Dr. James Rivera", s: "Aesthetics", st: "In session", tone: "bg-[#E3EEFB] text-[#2867B2]", h: "9:00 AM – 1:00 PM" },
    { i: "NP", n: "Dr. Neha Patel", s: "General Practice", st: "Available", tone: "bg-[#DDF3EA] text-[#3B8F73]", h: "10:00 AM – 6:00 PM" },
  ];
  return (
    <div className={MiniCard}>
      <p className="text-[11.5px] font-bold text-[#26384B]">Providers · Availability</p>
      <div className="mt-2.5 flex items-center justify-between text-[9.5px] text-[#64748B]">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEFFA] text-[#5B5FC7]">‹</span>
        Tue, Sep 16, 2025
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEEFFA] text-[#5B5FC7]">›</span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-2.5">
        {p.map((x) => (
          <li key={x.n} className="flex items-center gap-2">
            <Avatar initials={x.i} size={26} />
            <span className="flex-1">
              <span className="block text-[10px] font-semibold text-[#26384B]">{x.n}</span>
              <span className="block text-[8.5px] text-[#64748B]">{x.s}</span>
            </span>
            <span className="text-right">
              <Pill tone={x.tone}>{x.st}</Pill>
              <span className="mt-0.5 block text-[8px] text-[#64748B]">{x.h}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const R_TR = "rounded-[44px] rounded-tr-[120px]";
const R_TL = "rounded-[44px] rounded-tl-[120px]";

export function HealthcarePmFeatures() {
  return (
    <section id="features" className="bg-white">
      <div className={WRAP}>
        <div className={`${INNER} flex flex-col gap-20 py-16 lg:gap-24 lg:py-24`}>
          <FeatureBlock
            eyebrow="Patient information"
            title="Know the patient beyond the appointment."
            sub="Patient information should remain useful before, during, and after a visit."
            paras={[
              "Maintain patient profiles, contact details, relationships, visit history, notes, documents, custom information, and other details your practice needs. Staff can find the information they need without treating every appointment as a new starting point.",
            ]}
            photo="/healthcare/pm/stock-patient.jpg"
            alt="Doctor speaking with a patient"
            ratio={[288, 214]}
            pos="55% 40%"
            zoom={[1.25, "55% 60%"]}
            radius={R_TR}
            blobA="#D6F0EA"
            blobB="#DCDDF5"
            geo={{ l: -26.4, t: 47.2, w: 81.3 }}
            card={<PatientCard />}
          />
          <FeatureBlock
            flip
            eyebrow="Front desk operations"
            title="Give the front desk a clearer day."
            sub="The front desk manages a constantly changing schedule."
            paras={[
              "Practice Management gives staff a current view of appointments, arrivals, check-ins, queues, cancellations, rescheduling, waitlists, and provider availability.",
              "With patient and appointment information available together, front-desk staff can respond to changes as they happen and keep the day moving.",
            ]}
            photo="/healthcare/pm/stock-frontdesk.jpg"
            alt="Front desk team member welcoming a patient"
            ratio={[326, 268]}
            pos="62% 50%"
            zoom={[1.5, "60% 94%"]}
            radius={R_TL}
            blobA="#DCDDF5"
            blobB="#D6F0EA"
            geo={{ l: 49.1, t: 49.6, w: 75.5 }}
            card={<FrontDeskCard />}
          />
          <FeatureBlock
            eyebrow="Visit management"
            title="Keep the visit connected."
            sub="A visit brings together the patient, provider, service, appointment, and information gathered during the interaction."
            paras={[
              "Practice Management supports lightweight clinical documentation with consultation notes, medical history, forms, consent, treatment information, documents, and follow-up details. Providers can work with relevant information while the practice maintains a consistent record of the visit.",
            ]}
            photo="/healthcare/pm/stock-visit.jpg"
            alt="Doctor reviewing patient records on a laptop"
            ratio={[309, 261]}
            pos="50% 19%"
            radius={R_TR}
            blobA="#FFEBCB"
            blobB="#D6E9FA"
            geo={{ l: -19.1, t: 44.8, w: 71.5 }}
            card={<VisitCard />}
          />
          <FeatureBlock
            flip
            eyebrow="Providers and schedules"
            title="Organize providers, services, and schedules."
            sub="The practice depends on more than a patient calendar."
            paras={[
              "Manage provider profiles, specialties, working hours, availability, services, treatment types, locations, rooms, resources, and provider-service assignments. Keep scheduling aligned with the people and services available at each location.",
            ]}
            photo="/healthcare/pm/stock-provider-smile.jpg"
            alt="Smiling healthcare provider"
            ratio={[308, 255]}
            pos="50% 10%"
            radius={R_TL}
            blobA="#FFEBCB"
            blobB="#DCDDF5"
            geo={{ l: 66.2, t: 46.7, w: 66.2 }}
            card={<ProvidersCard />}
          />
          <FeatureBlock
            eyebrow="Practice insights"
            title="See how the practice is running."
            sub="Practice owners and managers need more than a list of appointments."
            paras={[
              "Review appointment activity, visits, provider activity, services, cancellations, no-shows, follow-ups, and other operational information through reports and dashboards. Use the information to understand what is happening across the practice and where attention is needed.",
            ]}
            photo="/healthcare/stock/pm-insights.jpg"
            alt="Practice manager reviewing reports on a laptop"
            ratio={[312, 234]}
            pos="55% 50%"
            radius={R_TR}
            blobA="#D6E9FA"
            blobB="#DCDDF5"
          />

          <div className="flex justify-center">
            <a href="#expert" className={BTN_PRIMARY}>
              Explore all features
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. for practices ---------- */

const PRACTICES = [
  { icon: "steth", title: "Medical clinics", desc: "Manage appointments, patients, providers, services, visits, and everyday clinic activity.", tile: "bg-[#E1F6F3]", stroke: "#3FA99B", photo: "clinics" },
  { icon: "tooth", title: "Dental practices", desc: "Coordinate patient schedules, providers, services, visits, documentation, and follow-ups.", tile: "bg-[#EEEFFA]", stroke: "#5B5FC7", photo: "dental" },
  { icon: "spark", title: "Medical aesthetics", desc: "Manage consultations, appointments, providers, treatments, patient information, and ongoing visits.", tile: "bg-[#FDEAF3]", stroke: "#C2477F", photo: "aesthetics" },
  { icon: "drop", title: "Dermatology", desc: "Keep patient information, appointments, consultations, treatments, documentation, and follow-ups organized.", tile: "bg-[#FFF3DF]", stroke: "#D98E1F", photo: "derm" },
  { icon: "dumbbell", title: "Physiotherapy", desc: "Coordinate appointments, providers, treatment services, visit information, and ongoing patient care.", tile: "bg-[#E5F8FB]", stroke: "#26B9CF", photo: "physio" },
  { icon: "leaf", title: "Wellness", desc: "Manage clients, schedules, services, providers, visits, and recurring practice activity.", tile: "bg-[#E1F6F3]", stroke: "#3FA99B", photo: "wellness" },
  { icon: "building", title: "Specialty practices", desc: "Adapt practice operations around the services, providers, schedules, and patient journeys specific to the specialty.", tile: "bg-[#EEEFFA]", stroke: "#5B5FC7", photo: "specialty" },
] as const;

const TILE_POS: Record<string, string> = {
  clinics: "30% 24%",
  dental: "50% 45%",
  aesthetics: "50% 55%",
  derm: "50% 45%",
  physio: "50% 40%",
  wellness: "50% 60%",
  specialty: "50% 22%",
};

type Cell = { kind: "tile"; photo: string; label: string } | { kind: "blank"; tone: string } | { kind: "word"; text: string };

const T = (photo: string, label: string): Cell => ({ kind: "tile", photo, label });
const B = (tone: string): Cell => ({ kind: "blank", tone });
const W = (text: string): Cell => ({ kind: "word", text });

const MOSAIC: { shift: string; cells: Cell[] }[] = [
  { shift: "", cells: [B("bg-white/45"), T("clinics", "Medical clinics"), W("Different"), T("dental", "Dental practices"), W("practices."), T("aesthetics", "Medical aesthetics"), B("bg-white/45")] },
  { shift: "md:translate-x-[-90px]", cells: [T("derm", "Dermatology"), W("A"), T("physio", "Physiotherapy"), W("consistent"), B("bg-[#FFF3DF]/80"), W("way"), T("wellness", "Wellness")] },
  { shift: "md:translate-x-[60px]", cells: [B("bg-[#DCDDF5]/80"), W("to care."), T("specialty", "Specialty practices"), B("bg-white/45")] },
];

const LABEL = "absolute bottom-2.5 left-2.5 rounded-full bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#26384B] shadow-[0_8px_18px_-10px_rgba(38,56,75,0.5)]";

function Tile({ photo, label, className = "" }: { photo: string; label: string; className?: string }) {
  return (
    <div className={`relative h-[132px] w-[214px] shrink-0 overflow-hidden rounded-[22px] ring-[4px] ring-white/80 ${className}`}>
      <Image src={`/healthcare/stock/pm-tile-${photo}.jpg`} alt={label} fill sizes="214px" className="object-cover" style={{ objectPosition: TILE_POS[photo] }} />
      <span className={LABEL}>{label}</span>
    </div>
  );
}

export function HealthcarePmPractices() {
  return (
    <section className="bg-white">
      <div className={WRAP}>
        <div className={`${INNER} py-8 lg:py-14`}>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#DCDDF5] via-[#C6E9F1] to-[#8ED6CB] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/45 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-40 h-[380px] w-[380px] rounded-full bg-[#2867B2]/15 blur-3xl" />
            <div className="pointer-events-none absolute right-16 top-14 h-6 w-6 rounded-full bg-[#FFDFAE]" />

            <div className="relative max-w-[860px]">
              <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#2867B2]">
                Practice types
              </span>
              <h2 className={`mt-5 ${H2}`}>For practices with patients to care for and days to manage.</h2>
              <p className="mt-5 max-w-[620px] text-[17px] leading-[1.65] text-[#26384B]/75">
                Practice Management supports different practice environments while keeping the core workflow consistent.
              </p>
            </div>

            <div className="relative mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {PRACTICES.map((p) => (
                <article key={p.title} className="group flex flex-col rounded-[22px] bg-white/95 p-6 shadow-[0_24px_50px_-32px_rgba(38,56,75,0.55)] ring-1 ring-white transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className={`flex h-[54px] w-[54px] items-center justify-center rounded-full ${p.tile}`}>
                      <Ic n={p.icon} size={26} stroke={p.stroke} />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF3FB] text-[#2867B2] transition-colors group-hover:bg-[#2867B2] group-hover:text-white">
                      <Arrow size={15} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-[24px] font-bold text-[#26384B]">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#64748B]">{p.desc}</p>
                </article>
              ))}
              <a
                href="#expert"
                className="group flex flex-col justify-between rounded-[22px] bg-gradient-to-br from-[#2867B2] to-[#26B9CF] p-6 text-white no-underline shadow-[0_24px_50px_-28px_rgba(40,103,178,0.8)] transition-all hover:-translate-y-1"
              >
                <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white/20">
                  <Ic n="users" size={26} stroke="#fff" />
                </span>
                <span>
                  <span className="mt-6 block text-[19px] font-bold leading-[1.25]">Not sure which fits?</span>
                  <span className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[14.5px] font-semibold text-[#2867B2]">
                    Explore who it&apos;s for
                    <Arrow size={15} />
                  </span>
                </span>
              </a>
            </div>

            {/* people mosaic */}
            <div className="relative mt-14 hidden flex-col gap-5 md:flex">
              {MOSAIC.map((row, ri) => (
                <div key={ri} className="flex justify-center">
                  <div className={`flex shrink-0 items-center gap-5 ${row.shift}`}>
                    {row.cells.map((c, ci) =>
                      c.kind === "tile" ? (
                        <Tile key={ci} photo={c.photo} label={c.label} />
                      ) : c.kind === "blank" ? (
                        <div key={ci} className={`h-[132px] w-[214px] shrink-0 rounded-[22px] ${c.tone}`} />
                      ) : (
                        <span key={ci} className="whitespace-nowrap font-[var(--font-display)] text-[44px] font-extrabold leading-none tracking-[-0.035em] text-[#26384B] lg:text-[52px]">
                          {c.text}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-12 md:hidden">
              <p className="font-[var(--font-display)] text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#26384B]">
                Different practices. A consistent way to care.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {PRACTICES.map((p) => (
                  <div key={p.photo} className="relative h-[130px] overflow-hidden rounded-[18px] ring-[3px] ring-white/80">
                    <Image src={`/healthcare/stock/pm-tile-${p.photo}.jpg`} alt={p.title} fill sizes="200px" className="object-cover" style={{ objectPosition: TILE_POS[p.photo] }} />
                    <span className="absolute bottom-2 left-2 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold text-[#26384B]">{p.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. room to grow ---------- */

export function HealthcarePmGrow() {
  return (
    <section className="bg-white">
      <div className={WRAP}>
        <div className={`${INNER} py-6 lg:py-10`}>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#E5F8FB] via-white to-[#E7F7F5] px-6 py-14 ring-1 ring-[#E2E7EB] sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-[#DCDDF5]/60 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-28 -right-16 h-[320px] w-[320px] rounded-full bg-[#7ACFC5]/25 blur-2xl" />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
              <div>
                <h2 className={H2}>Practice management, with room to grow.</h2>
                <p className={`mt-6 max-w-[560px] ${LEAD}`}>
                  Practice Management provides the operational foundation for the practice while other EVOQ
                  applications can support the wider patient journey.
                </p>
                <p className={`mt-4 max-w-[560px] ${LEAD}`}>
                  Information can move between the applications as the patient journey continues, giving each
                  application a clear role without forcing every function into Practice Management.
                </p>
                <Link href="/healthcare" className={`mt-8 ${BTN_PRIMARY}`}>
                  Explore Healthcare Solutions
                  <Arrow />
                </Link>
              </div>

              <div className="relative">
                <div className="mx-auto flex h-[128px] w-[128px] flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#2867B2] to-[#26B9CF] text-center text-white shadow-[0_26px_56px_-24px_rgba(40,103,178,0.7)] ring-[8px] ring-white/70">
                  <Ic n="cal" size={28} stroke="#fff" />
                  <span className="mt-1 text-[12.5px] font-bold leading-tight">
                    Practice
                    <br />
                    Management
                  </span>
                </div>
                <div className="mx-auto h-8 w-px bg-[#26B9CF]/45" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: "users", title: "Healthcare CRM", body: "Manage enquiries, referrals, patient relationships, follow-ups, and conversion before the patient reaches the appointment stage.", tile: "bg-[#E7F7F5]", stroke: "#3FA99B", href: "/healthcare/crm" },
                    { icon: "heart", title: "Patient Engagement", body: "Extend the experience with Booking Engine, Billing, Campaigns, Surveys, and Loyalty.", tile: "bg-[#FFF3DF]", stroke: "#D98E1F", href: "/healthcare" },
                  ].map((c) => (
                    <Link key={c.title} href={c.href} className="block rounded-[22px] bg-white p-6 no-underline shadow-[0_22px_50px_-34px_rgba(38,56,75,0.4)] ring-1 ring-[#E2E7EB] transition-all hover:-translate-y-1">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${c.tile}`}>
                        <Ic n={c.icon as IconName} size={24} stroke={c.stroke} />
                      </span>
                      <h3 className="mt-4 text-[24px] font-bold text-[#26384B]">{c.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-[1.6] text-[#64748B]">{c.body}</p>
                    </Link>
                  ))}
                </div>
                <p className="mt-4 flex items-center justify-center gap-2 text-[12.5px] font-medium text-[#64748B]">
                  <Ic n="refresh" size={15} stroke="#26B9CF" />
                  Information moves between applications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. interoperability, privacy & healthcare standards ---------- */

type MarketCategory = {
  key: string;
  icon: IconName;
  accent: string;
  tile: string;
  title: string;
  standards: string[];
  desc: string;
};

const MARKET_CATEGORIES: MarketCategory[] = [
  {
    key: "interop",
    icon: "refresh",
    accent: "#2867B2",
    tile: "bg-[#E3EEFB]",
    title: "Interoperability",
    standards: ["HL7", "FHIR"],
    desc: "Support standards-based exchange of healthcare information between connected applications and systems.",
  },
  {
    key: "privacy",
    icon: "shield",
    accent: "#26B9CF",
    tile: "bg-[#E5F8FB]",
    title: "Privacy & security",
    standards: ["HIPAA", "Regional privacy requirements"],
    desc: "Support applicable privacy and security requirements based on the organization, location, and deployment.",
  },
  {
    key: "ecosystems",
    icon: "globe",
    accent: "#5B5FC7",
    tile: "bg-[#EEEFFA]",
    title: "Digital health ecosystems",
    standards: ["ABDM", "NABIDH", "Riayati", "Malaffi"],
    desc: "Support relevant digital-health and health-information exchange requirements where applicable to the organization and deployment.",
  },
];

export function HealthcarePmMarket() {
  return (
    <section className="bg-[#F2F4F6]">
      <div className={WRAP}>
        <div className={`${INNER} py-16 lg:py-24`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[720px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#26B9CF]">
                Interoperability, privacy &amp; healthcare standards
              </p>
              <h2 className={`mt-4 ${H2}`}>Built to work across healthcare systems.</h2>
              <p className={`mt-5 ${LEAD}`}>
                Healthcare organizations rely on a growing network of clinical, operational, billing, communication,
                and health-information systems. EVOQ Healthcare Practice Management provides an operational
                foundation that can work alongside this ecosystem through relevant interoperability standards,
                privacy requirements, integrations, and regional digital-health frameworks.
              </p>
            </div>
            <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2867B2] to-[#26B9CF] lg:mt-1">
              <ShieldNetworkIcon size={28} stroke="#fff" />
            </span>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {MARKET_CATEGORIES.map((c) => (
              <div key={c.key} className={`${CARD} flex flex-col p-6`}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${c.tile}`}>
                  <Ic n={c.icon} size={22} stroke={c.accent} />
                </span>

                <p className="mt-4 font-[var(--font-display)] text-[17px] font-bold leading-[1.3] text-[#26384B]">
                  {c.title}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.standards.map((s) => (
                    <span
                      key={s}
                      className={`inline-flex items-center rounded-full ${c.tile} px-2.5 py-1 text-[11.5px] font-semibold`}
                      style={{ color: c.accent }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="mt-4 flex-1 text-[13.5px] leading-[1.6] text-[#64748B]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. final CTA ---------- */

export function HealthcarePmCTA() {
  return (
    <section id="expert" className="bg-white">
      <div className={WRAP}>
        <div className={`${INNER} pb-16 pt-6 lg:pb-24`}>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2867B2] via-[#26B9CF] to-[#7ACFC5] px-6 py-14 sm:px-10 lg:px-16 lg:py-24">
            <div className="pointer-events-none absolute -right-20 -top-24 h-[380px] w-[380px] rounded-full bg-[#DCDDF5]/40 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 top-10 h-[300px] w-[300px] rounded-full border border-white/25" />
            <div className="pointer-events-none absolute bottom-8 right-24 h-5 w-5 rounded-full bg-[#FFDFAE]" />
            <div className="relative mx-auto text-center">
              <h2 className="font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
                Give your practice a clearer way to work.
              </h2>
              <p className="mx-auto mt-5 max-w-[680px] text-[17px] leading-[1.6] text-white/90">
                Bring patient information, appointments, visits, providers, services, and daily practice activity into
                a more organized operating environment.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <a href="#expert" className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[16px] font-semibold text-[#2867B2] no-underline shadow-[0_16px_34px_-16px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-px hover:bg-[#F2F4F6]">
                  Get started
                  <Arrow />
                </a>
                <a href="#expert" className="inline-flex items-center gap-3 rounded-full border border-white/70 px-8 py-4 text-[16px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-white/15">
                  Talk to an expert
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
