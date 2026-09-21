import Image from "next/image";
import { Caveat } from "next/font/google";

const script = Caveat({ subsets: ["latin"], weight: ["600"] });

type IP = { size?: number; stroke?: string };
const I = ({ size = 20, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const PhoneIcon = ({ size, stroke }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </I>
);
const MailIcon = ({ size, stroke }: IP) => (
  <I size={size} stroke={stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </I>
);
const ChatIcon = ({ size, stroke }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </I>
);
const CalIcon = ({ size, stroke }: IP) => (
  <I size={size} stroke={stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </I>
);
const BellIcon = () => (
  <I size={22}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </I>
);
const CheckIcon = () => (
  <I size={22} stroke="#18B8D1">
    <path d="m5 12 5 5 9-10" />
  </I>
);
const ArrowRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 6 6 6-6 6" />
  </svg>
);

const CHANNELS = [
  { label: "Call", icon: <PhoneIcon size={22} />, tile: "bg-[#E1EEFB]", left: 49.5, top: 163 },
  { label: "Email", icon: <MailIcon size={22} stroke="#18B8D1" />, tile: "bg-[#E1F6F3]", left: 48.2, top: 250 },
  { label: "Message", icon: <ChatIcon size={22} stroke="#7C6BE0" />, tile: "bg-[#ECE8FB]", left: 48.5, top: 347 },
  { label: "Schedule", icon: <CalIcon size={22} stroke="#E8813A" />, tile: "bg-[#FDEBDD]", left: 50.4, top: 446 },
];

const TODAY = [
  { img: "sarah", name: "Sarah Mitchell", task: "Follow up on treatment options", time: "9:30 AM", icon: <PhoneIcon size={20} />, tile: "bg-[#DCEBFA]", active: true },
  { img: "james", name: "James Carter", task: "Send consultation details", time: "11:00 AM", icon: <MailIcon size={20} stroke="#18B8D1" />, tile: "bg-[#E1F6F3]" },
  { img: "priya", name: "Priya Desai", task: "Check on lab results", time: "2:00 PM", icon: <ChatIcon size={20} stroke="#7C6BE0" />, tile: "bg-[#ECE8FB]" },
  { img: "emily", name: "Emily Roberts", task: "Follow up after consultation", time: "4:30 PM", icon: <CalIcon size={20} stroke="#E8813A" />, tile: "bg-[#FDEBDD]" },
];

const CARD_SHADOW = "shadow-[0_26px_60px_-30px_rgba(32,100,182,0.35)] ring-1 ring-[#2064B6]/6";

function TodayCard({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-[18px] bg-white ${CARD_SHADOW} ${className}`} style={style}>
      <div className="flex items-start justify-between px-5 pt-5">
        <div>
          <p className="font-[var(--font-display)] text-[16px] font-bold text-[#102A43]">Today</p>
          <p className="mt-0.5 text-[12.5px] text-[#31465A]/60">Tue, Jan 28, 2025</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[12.5px] text-[#31465A]/70">
          View all <Chevron />
        </span>
      </div>
      <ul className="mt-3 flex flex-col px-2 pb-3">
        {TODAY.map((t) => (
          <li
            key={t.name}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${t.active ? "bg-[#EAF1FB]" : "border-t border-[#31465A]/6"}`}
          >
            <Image src={`/healthcare/avatars/${t.img}.jpg`} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-[#102A43]">{t.name}</span>
              <span className="block truncate text-[12px] text-[#31465A]/60">{t.task}</span>
            </span>
            <span className="text-[12px] text-[#31465A]/60">{t.time}</span>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.tile}`}>{t.icon}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HealthcareCrmFollowUp() {
  return (
    <section className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#F2F7FD] via-[#EAF2FC] to-[#E4EFFB] ring-1 ring-[#2064B6]/8 xl:h-[629px]">
            {/* decorative shapes (xl+) */}
            <div className="pointer-events-none absolute left-[41%] top-[-60px] hidden h-[720px] w-[560px] rounded-full bg-[#DCEAFB]/70 xl:block" />
            <div className="pointer-events-none absolute left-[60%] top-[-90px] hidden h-[420px] w-[420px] rounded-full bg-[#D3E5FA]/60 xl:block" />

            {/* copy */}
            <div className="relative z-10 px-6 py-10 sm:px-10 xl:absolute xl:left-0 xl:top-0 xl:w-[47%] xl:px-14 xl:py-0 xl:pt-[54px]">
              <p className="text-[12.5px] font-medium uppercase tracking-[0.24em] text-[#2064B6]">
                Stay connected. At the right time.
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.04] tracking-[-0.025em] text-[#102A43] sm:text-[46px]">
                Keep every follow-up within reach.
              </h2>
              <div className="mt-6 text-[15.5px] leading-[1.6] text-[#31465A]/75">
                <p>
                  Some patients are ready to book immediately. Others need more information, time to decide, or a
                  follow-up after their consultation. When these conversations depend on memory, notes, or separate
                  systems, opportunities to stay connected can easily be missed.
                </p>
                <p className="mt-4">
                  EVOQ Healthcare CRM helps your team keep track of what needs attention and when. With the right
                  information in front of them, your team can follow up with greater consistency and continue the
                  conversation at the right time.
                </p>
              </div>
              <a
                href="#expert"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#2064B6] px-8 py-4 text-[16px] font-semibold text-white no-underline shadow-[0_14px_30px_-14px_rgba(32,100,182,0.6)] transition-all hover:-translate-y-px hover:bg-[#1A559C]"
              >
                See healthcare CRM in action
                <ArrowRight />
              </a>
            </div>

            <div className="pointer-events-none absolute bottom-6 left-14 hidden -rotate-[8deg] xl:block">
              <p className={`${script.className} text-[22px] leading-[1.15] text-[#5B7BD5]`}>
                <span className="block">More conversations</span>
                <span className="block ml-2">More appointments</span>
                <span className="block ml-4">Stronger relationships</span>
              </p>
              <svg width="190" height="10" viewBox="0 0 190 10" fill="none" className="mt-1 ml-6">
                <path d="M2 8C50 3 120 2 188 2" stroke="#5B7BD5" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* below xl: simple stacked card */}
            <div className="relative px-4 pb-8 sm:px-8 xl:hidden">
              <TodayCard />
            </div>

            {/* xl+: composed visual */}
            <div className="hidden xl:block">
              {/* decor photos */}
              <Image
                src="/healthcare/crm-followup-plant.jpg"
                alt=""
                width={134}
                height={445}
                className="absolute bottom-[13px] right-0 h-auto w-[101px]"
                style={{ maskImage: "linear-gradient(90deg, transparent 0%, #000 45%), linear-gradient(180deg, transparent 0%, #000 30%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 45%), linear-gradient(180deg, transparent 0%, #000 30%)", maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
              />
              <Image
                src="/healthcare/crm-followup-notebook.jpg"
                alt=""
                width={460}
                height={107}
                className="absolute bottom-[13px] left-[68%] h-auto w-[348px]"
                style={{ maskImage: "linear-gradient(90deg, transparent 0%, #000 22%, #000 90%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 35%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 22%, #000 90%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 35%)", maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
              />

              {/* dashed channel path */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1720 832" preserveAspectRatio="none" fill="none">
                <path
                  d="M853 170 C 815 260, 850 330, 830 430 S 890 560, 889 667"
                  stroke="#7FA9E6"
                  strokeWidth="1.4"
                  strokeDasharray="5 6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="absolute left-[49.6%] top-[128px] h-2 w-2 rounded-full bg-[#7FA9E6]" />
              <span className="absolute left-[51.6%] top-[506px] h-2 w-2 rounded-full bg-[#7FA9E6]" />

              {CHANNELS.map((c) => (
                <div key={c.label} className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5" style={{ left: `${c.left}%`, top: c.top - 24 }}>
                  <span className={`flex h-[48px] w-[48px] items-center justify-center rounded-full shadow-[0_8px_20px_-10px_rgba(32,100,182,0.4)] ${c.tile}`}>{c.icon}</span>
                  <span className="text-[11.5px] text-[#31465A]/70">{c.label}</span>
                </div>
              ))}

              <TodayCard className="absolute left-[53.4%] top-[126px] w-[487px]" />

              <div className={`absolute left-[66.9%] top-[62px] z-10 flex w-[262px] items-center gap-3 rounded-[16px] bg-white px-4 py-4 ${CARD_SHADOW}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E1EEFB]">
                  <BellIcon />
                </span>
                <span className="flex-1">
                  <span className="block text-[13px] font-bold text-[#102A43]">Next follow-up</span>
                  <span className="block text-[12px] text-[#31465A]/60">Today at 11:00 AM</span>
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EBFA] text-[#5B7BD5]">
                  <ArrowRight size={15} />
                </span>
              </div>

              <div className={`absolute left-[69.5%] top-[454px] z-10 flex w-[268px] items-center gap-3 rounded-[16px] bg-white px-4 py-4 ${CARD_SHADOW}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E1F6F3]">
                  <CheckIcon />
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-[#102A43]">Follow-ups on track</span>
                  <span className="block text-[12px] text-[#31465A]/60">Nothing important is missed.</span>
                </span>
              </div>

              <div className="pointer-events-none absolute right-[2.4%] top-[190px] -rotate-[12deg]">
                <p className={`${script.className} text-[22px] leading-[1.05] text-[#5B7BD5]`}>
                  <span className="block">Better</span>
                  <span className="block ml-1">Patient</span>
                  <span className="block ml-2">Journeys</span>
                </p>
                <svg width="70" height="8" viewBox="0 0 70 8" fill="none" className="mt-1">
                  <path d="M2 6C20 2 45 2 68 1" stroke="#5B7BD5" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
