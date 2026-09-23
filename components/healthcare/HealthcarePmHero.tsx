import Image from "next/image";

type IP = { size?: number; stroke?: string };
const I = ({ size = 22, stroke = "#2867B2", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
const StethIcon = () => (
  <I stroke="#2867B2">
    <path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1" />
    <circle cx="20" cy="12" r="2" />
  </I>
);
const ToothIcon = () => (
  <I stroke="#26B9CF">
    <path d="M7 3c-2.5 0-4 2-4 4.5C3 11 4.5 21 6.5 21c1.5 0 1.5-3.5 2.5-5.5.7-1.4 1.3-1.5 3-1.5s2.3.1 3 1.5c1 2 1 5.5 2.5 5.5 2 0 3.5-10 3.5-13.5C21 5 19.5 3 17 3c-2 0-3 1.2-5 1.2S9 3 7 3z" />
  </I>
);
const CalIcon = () => (
  <I size={24} stroke="#7A8AB8">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </I>
);
const UsersIcon = () => (
  <I size={24} stroke="#7A8AB8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </I>
);
const DocIcon = () => (
  <I size={24} stroke="#7A8AB8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 13h6M9 17h4" />
  </I>
);
const BarsIcon = () => (
  <I size={24} stroke="#7A8AB8">
    <path d="M6 20V10M12 20V4M18 20v-7" />
  </I>
);
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Chev = ({ dir }: { dir: "l" | "r" }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#26384B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "l" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
  </svg>
);

const FEATURES = [
  { icon: <CalIcon />, lines: ["Appointments", "that run on time"] },
  { icon: <UsersIcon />, lines: ["Providers", "and schedules"] },
  { icon: <DocIcon />, lines: ["Services", "and treatments"] },
  { icon: <BarsIcon />, lines: ["A more organized", "day, every day"] },
];

const SCHEDULE = [
  { time: "9:00 AM", img: "ava-b", name: "Ava Thompson", svc: "Consultation", status: "Checked in", row: "bg-[#E4F5EF]", pill: "bg-[#D5EFE6] text-[#3B8F73]" },
  { time: "10:30 AM", img: "rohan", name: "Rohan Mehta", svc: "Physiotherapy", status: "In room", row: "bg-[#E4F4F9]", pill: "bg-[#D2EDF6] text-[#2A8FB0]" },
  { time: "12:00 PM", img: "sophia", name: "Sophia Lee", svc: "Skin Treatment", status: "Scheduled", row: "bg-[#EEEFFA]", pill: "bg-[#DCDDF5] text-[#6C6FB8]" },
  { time: "2:30 PM", img: "daniel", name: "Daniel Kim", svc: "Follow-up", status: "Scheduled", row: "bg-[#EEEFFA]", pill: "bg-[#DCDDF5] text-[#6C6FB8]" },
];

function Chip({ icon, tile, lines, className }: { icon: React.ReactNode; tile: string; lines: string[]; className: string }) {
  return (
    <div className={`absolute flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-[0_18px_40px_-20px_rgba(38,56,75,0.35)] ${className}`}>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tile}`}>{icon}</span>
      <span className="whitespace-nowrap text-[13px] leading-[1.25] text-[#26384B]">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    </div>
  );
}

function TodayCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[20px] bg-white p-5 shadow-[0_30px_64px_-30px_rgba(38,56,75,0.4)] ring-1 ring-[#26384B]/5 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="font-[var(--font-display)] text-[17px] font-bold text-[#26384B]">Today</p>
        <div className="flex items-center gap-2.5 text-[11px] text-[#64748B]">
          Tue, Sep 16, 2025
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F2F4F6]"><Chev dir="l" /></span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F2F4F6]"><Chev dir="r" /></span>
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {SCHEDULE.map((s) => (
          <li key={s.time} className="grid grid-cols-[58px_1fr] items-center gap-2 text-[10.5px] text-[#64748B]">
            <span>{s.time}</span>
            <span className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 ${s.row}`}>
              <Image unoptimized src={`/healthcare/avatars/${s.img}.jpg`} alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-[#26384B]">{s.name}</span>
                <span className="block text-[10px] text-[#64748B]">{s.svc}</span>
              </span>
              <span className={`rounded-md px-2.5 py-1 text-[10px] font-medium ${s.pill}`}>{s.status}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PHOTO = "absolute object-cover shadow-[0_26px_50px_-28px_rgba(38,56,75,0.45)] ring-[6px] ring-white";

export function HealthcarePmHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(115deg,#DDF1FA 0%,#EEF6FC 30%,#FFFFFF 55%,#F3F3FB 100%)" }}
    >
      <div className="pointer-events-none absolute -left-40 -top-32 h-[420px] w-[520px] rounded-full bg-[#BFEAF0]/45 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="relative mx-auto max-w-[1300px] xl:h-[688px]">
          {/* copy */}
          <div className="relative z-10 py-14 xl:absolute xl:left-0 xl:top-0 xl:w-[560px] xl:py-0 xl:pt-[114px]">
            <p className="text-[12.5px] font-medium uppercase tracking-[0.3em] text-[#2867B2]">Practice Management</p>
            <h1 className="mt-6 font-[var(--font-display)] text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#26384B]">
              Keep your practice moving.
            </h1>
            <p className="mt-6 max-w-[500px] text-[17.5px] leading-[1.6] text-[#64748B]">
              Manage patients, appointments, providers, visits, services, and daily practice activity from a workspace
              that keeps the day organized.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="#expert"
                className="inline-flex items-center gap-3 rounded-full bg-[#2867B2] px-8 py-4 text-[16px] font-semibold text-white no-underline shadow-[0_16px_32px_-16px_rgba(40,103,178,0.7)] transition-all hover:-translate-y-px hover:bg-[#205995]"
              >
                Get started
                <ArrowRight />
              </a>
              <a
                href="#expert"
                className="inline-flex items-center gap-3 rounded-full border border-[#2867B2] bg-white/70 px-8 py-4 text-[16px] font-semibold text-[#2867B2] no-underline transition-all hover:-translate-y-px hover:bg-[#F2F4F6]"
              >
                Talk to an expert
                <ArrowRight />
              </a>
            </div>
          </div>

          {/* features strip */}
          <div className="relative z-10 grid grid-cols-2 gap-6 pb-14 sm:grid-cols-4 xl:absolute xl:left-0 xl:top-[528px] xl:w-[560px] xl:gap-0 xl:pb-0">
            {FEATURES.map((f, i) => (
              <div key={f.lines[0]} className={`flex flex-col gap-3 ${i > 0 ? "xl:border-l xl:border-[#26384B]/10 xl:pl-4" : ""}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ECEEF8]">{f.icon}</span>
                <span className="text-[13.5px] leading-[1.45] text-[#64748B]">
                  {f.lines[0]}
                  <br />
                  {f.lines[1]}
                </span>
              </div>
            ))}
          </div>

          {/* below xl: photo collage + schedule */}
          <div className="relative z-10 grid gap-4 pb-14 sm:grid-cols-3 xl:hidden">
            {["pm-hero-a", "pm-hero-b", "pm-hero-c"].map((n) => (
              <div key={n} className="relative h-[220px] overflow-hidden rounded-[28px]">
                <Image src={`/healthcare/stock/${n}.jpg`} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-top" />
              </div>
            ))}
            <TodayCard className="sm:col-span-3" />
          </div>

          {/* xl+: composed visual — 3 photos, 1 schedule card, 3 supporting elements on a 700x640 stage */}
          <div className="absolute right-0 top-[24px] hidden h-[640px] w-[700px] xl:block">
            {/* background shapes: one gradient blob, one lavender arc, one mint circle, one peach dot */}
            <div className="absolute left-[30px] top-[10px] h-[600px] w-[640px] rounded-[46%_54%_48%_52%/52%_44%_56%_48%] bg-gradient-to-br from-[#2867B2]/18 via-[#26B9CF]/18 to-[#7ACFC5]/28" />
            <div className="absolute left-[-10px] top-[300px] h-[250px] w-[250px] rounded-full bg-[#DCDDF5]/70" />
            <div className="absolute right-[10px] top-[70px] h-[110px] w-[110px] rounded-full bg-[#7ACFC5]/35" />
            <div className="absolute right-[120px] top-[300px] h-[26px] w-[26px] rounded-full bg-[#FFDFAE]" />

            {/* photos on a clean two-column grid */}
            <Image
              src="/healthcare/stock/pm-hero-a.jpg"
              alt="Doctor at her desk"
              width={1400}
              height={2098}
              className={`${PHOTO} left-[40px] top-[30px] h-[262px] w-[246px] rounded-t-[123px] rounded-b-[28px]`}
              style={{ objectPosition: "50% 18%" }}
            />
            <Image
              src="/healthcare/stock/pm-hero-b.jpg"
              alt="Healthcare professional"
              width={1400}
              height={933}
              className={`${PHOTO} left-[318px] top-[0px] h-[250px] w-[300px] rounded-[28px] rounded-tr-[110px]`}
              style={{ objectPosition: "50% 20%" }}
            />
            <Image
              src="/healthcare/stock/pm-hero-c.jpg"
              alt="Nurse"
              width={1400}
              height={2100}
              className={`${PHOTO} left-[384px] top-[286px] h-[282px] w-[250px] rounded-[28px] rounded-bl-[110px]`}
              style={{ objectPosition: "50% 18%" }}
            />

            {/* schedule card overlaps the doctor photo and sits left of the nurse */}
            <TodayCard className="absolute left-[10px] top-[252px] w-[372px]" />

            {/* supporting chips and stat */}
            <Chip icon={<StethIcon />} tile="bg-[#E1EDF9]" lines={["Medical", "Clinics"]} className="left-[-22px] top-[140px]" />
            <Chip icon={<ToothIcon />} tile="bg-[#DDF3F1]" lines={["Dental", "Practices"]} className="left-[468px] top-[146px] h-[72px] w-[152px]" />
            <div className="absolute left-[540px] top-[500px] rounded-2xl bg-white p-4 shadow-[0_22px_48px_-22px_rgba(38,56,75,0.4)]">
              <p className="flex items-start gap-1 font-[var(--font-display)] text-[32px] font-bold leading-none text-[#26384B]">
                82
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#26384B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </p>
              <p className="mt-1.5 text-[11px] leading-[1.3] text-[#64748B]">
                Appointments
                <br />
                today
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
