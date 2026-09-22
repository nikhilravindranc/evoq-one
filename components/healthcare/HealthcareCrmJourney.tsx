import Image from "next/image";
import { Caveat } from "next/font/google";

const script = Caveat({ subsets: ["latin"], weight: ["600"] });

const sv = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ChatIcon = () => (
  <svg {...sv} stroke="#2064B6">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
);
const PersonIcon = () => (
  <svg {...sv} stroke="#18B8D1">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </svg>
);
const CalCheckIcon = ({ size = 28, stroke = "#2064B6" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
  </svg>
);
const RefreshIcon = () => (
  <svg {...sv} stroke="#18B8D1">
    <path d="M21 12a9 9 0 0 0-15-6.7L3 8M3 3v5h5M3 12a9 9 0 0 0 15 6.7L21 16M21 21v-5h-5" />
  </svg>
);
const MailIcon = () => (
  <svg {...sv} width={18} height={18} stroke="#2064B6">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const CheckIcon = () => (
  <svg {...sv} width={18} height={18} stroke="#18B8D1">
    <path d="m5 12 5 5 9-10" />
  </svg>
);
const ClockIcon = () => (
  <svg {...sv} width={18} height={18} stroke="#31465A">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const BellIcon = () => (
  <svg {...sv} width={22} height={22} stroke="#2064B6">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const FEATURES = [
  {
    icon: <ChatIcon />,
    tile: "bg-[#E8F1FA]",
    title: ["Capture", "every enquiry"],
    desc: "Bring enquiries from different sources into one place and make sure every new patient gets the attention they need.",
  },
  {
    icon: <PersonIcon />,
    tile: "bg-[#E7F7F5]",
    title: ["Know the", "relationship"],
    desc: "Keep patient information, notes, preferences, interactions, and history together so your team has the right context when they need it.",
  },
  {
    icon: <CalCheckIcon />,
    tile: "bg-[#E8F1FA]",
    title: ["Stay on top", "of follow-ups"],
    desc: "Give every enquiry and patient relationship a clear next step with activities, reminders, ownership, and follow-up management.",
  },
  {
    icon: <RefreshIcon />,
    tile: "bg-[#E7F7F5]",
    title: ["Reconnect", "at the right time"],
    desc: "Identify patients who need another conversation, a follow-up, or a reason to return and keep those relationships moving.",
  },
];

const TIMELINE = [
  { icon: <MailIcon />, tile: "bg-[#E8F1FA]", title: "Enquiry received", date: "Dec 2, 2024" },
  { icon: <CalCheckIcon size={18} />, tile: "bg-[#E8F1FA]", title: "Consultation booked", date: "Dec 10, 2024" },
  { icon: <CheckIcon />, tile: "bg-[#E7F7F5] ring-1 ring-[#18B8D1]/40", title: "Treatment completed", date: "Jan 14, 2025" },
  { icon: <ClockIcon />, tile: "bg-[#F1F5F7]", title: "Follow-up scheduled", date: "Feb 18, 2025" },
];

export function HealthcareCrmJourney() {
  return (
    <section id="features" className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-16 lg:py-20">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-white via-[#F1F7FD] to-[#E4F6F5] ring-1 ring-[#31465A]/8">
            {/* photo panel */}
            <div className="relative h-[360px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46%]">
              <Image
                src="/healthcare/crm-journey-bg.webp"
                alt="Healthcare professional at her desk"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-[85%_center]"
                style={{ maskImage: "linear-gradient(90deg, transparent 0%, #000 28%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 28%)" }}
              />

              {/* script flourish */}
              <div className="pointer-events-none absolute right-8 top-6 hidden -rotate-[14deg] lg:block">
                <p className={`${script.className} text-[34px] leading-[0.95] text-[#18B8D1]`}>
                  Continuing
                  <br />
                  <span className="ml-3 inline-block">Care</span>
                  <br />
                  <span className="ml-6 inline-block">Together</span>
                </p>
                <svg width="90" height="12" viewBox="0 0 110 14" fill="none" className="ml-6 mt-1">
                  <path d="M2 11C30 6 70 3 108 2" stroke="#18B8D1" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* patient timeline card */}
              <div className="absolute left-[4%] top-[12%] hidden w-[272px] rounded-[18px] bg-white/95 p-4 shadow-[0_28px_60px_-28px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/5 lg:block">
                <div className="flex items-center gap-3">
                  <Image src="/healthcare/avatars/sarah.jpg" alt="Sarah Mitchell" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#102A43]">Sarah Mitchell</p>
                    <p className="text-[12.5px] text-[#31465A]/60">Patient</p>
                  </div>
                  <span className="rounded-lg bg-[#E7F7F5] px-4 py-2 text-[12.5px] font-semibold text-[#3D9A92]">Active</span>
                </div>
                <ul className="relative mt-5 flex flex-col gap-4">
                  <span className="absolute bottom-5 left-[19px] top-5 w-px bg-[#31465A]/12" />
                  {TIMELINE.map((t) => (
                    <li key={t.title} className="relative flex items-center gap-3.5">
                      <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.tile}`}>{t.icon}</span>
                      <span>
                        <span className="block text-[13px] font-semibold text-[#102A43]">{t.title}</span>
                        <span className="block text-[12px] text-[#31465A]/55">{t.date}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* dotted grid accent */}
              <div
                className="pointer-events-none absolute bottom-[14%] left-[6%] hidden h-[130px] w-[110px] opacity-70 lg:block"
                style={{ backgroundImage: "radial-gradient(#18B8D1 1.4px, transparent 1.6px)", backgroundSize: "18px 18px" }}
              />

              {/* reminder card */}
              <div className="absolute bottom-[10%] right-[3%] hidden items-center gap-3 rounded-[16px] bg-[#EAF7F5]/95 px-4 py-3.5 shadow-[0_20px_44px_-24px_rgba(16,42,67,0.35)] ring-1 ring-white lg:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <BellIcon />
                </span>
                <span>
                  <span className="block text-[12.5px] font-semibold text-[#102A43]">Follow-up reminder</span>
                  <span className="block text-[11.5px] text-[#31465A]/60">Feb 18, 2025</span>
                </span>
              </div>
            </div>

            {/* copy */}
            <div className="relative z-10 px-6 py-10 sm:px-10 lg:w-[58%] lg:px-14 lg:py-16">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#31465A]/55">
                From enquiry to ongoing care
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#102A43]">
                Keep the patient journey connected.
              </h2>
              <div className="mt-6 max-w-[700px] text-[16.5px] leading-[1.6] text-[#31465A]/75">
                <p>
                  Patient relationships rarely follow a straight line. Someone
                  may enquire today, book later, return months after treatment,
                  or need several follow-ups before making a decision.
                </p>
                <p className="mt-4">
                  EVOQ Healthcare CRM helps your team stay connected through
                  every stage, from the first enquiry and referral to follow-up,
                  appointment-related activity, returning visits, and
                  re-engagement.
                </p>
              </div>

              <div className="mt-9 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
                {FEATURES.map((f) => (
                  <div key={f.title[0]}>
                    <span className={`flex h-[60px] w-[60px] items-center justify-center rounded-full ${f.tile}`}>{f.icon}</span>
                    <h3 className="mt-4 text-[24px] font-bold leading-[1.25] text-[#102A43]">
                      {f.title[0]}
                      <br />
                      {f.title[1]}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.55] text-[#31465A]/65">{f.desc}</p>
                  </div>
                ))}
              </div>

              <a
                href="#features"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#2064B6] px-8 py-4 text-[16px] font-semibold text-white no-underline shadow-[0_14px_30px_-14px_rgba(32,100,182,0.6)] transition-all hover:-translate-y-px hover:bg-[#1A559C]"
              >
                Explore all features
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
