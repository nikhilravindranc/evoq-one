import Image from "next/image";
import { Caveat } from "next/font/google";

const script = Caveat({ subsets: ["latin"], weight: ["600"] });

const sv = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ChatIcon = ({ size = 26 }: { size?: number }) => (
  <svg {...sv} width={size} height={size} stroke="#1777F0">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
);

const CalPlusIcon = ({ size = 26 }: { size?: number }) => (
  <svg {...sv} width={size} height={size} stroke="#0F766E">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M12 13v5M9.5 15.5h5" />
  </svg>
);

const BellIcon = () => (
  <svg {...sv} stroke="#7C3AED">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const CheckIcon = () => (
  <svg {...sv} stroke="#0F766E">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ENQUIRIES = [
  { initials: "JS", name: "Jane Smith", source: "Website", status: "New", pill: "bg-[#DDF5F0] text-[#0F766E]" },
  { initials: "RK", name: "Rahul Kapoor", source: "Referral", status: "Consultation", pill: "bg-[#EEF6FF] text-[#1777F0]" },
  { initials: "SL", name: "Sandra Lee", source: "Phone", status: "Follow-up", pill: "bg-[#F3E8FF] text-[#7C3AED]" },
  { initials: "MP", name: "Michael Park", source: "Campaign", status: "New", pill: "bg-[#DDF5F0] text-[#0F766E]" },
];

const DETAILS = [
  { label: "Phone", value: "+1 415 555 0123" },
  { label: "Email", value: "emily.carter@email.com" },
  { label: "Next appointment", value: "Oct 15, 2024 · 10:00 AM" },
];

const ACTIVITY = [
  { icon: <CalPlusIcon size={16} />, tile: "bg-[#EEF6FF]", title: "Appointment scheduled", time: "Oct 15, 2024 · 10:00 AM" },
  { icon: <BellIcon />, tile: "bg-[#F3E8FF]", title: "Follow-up reminder", time: "Oct 10, 2024" },
  { icon: <CheckIcon />, tile: "bg-[#DDF5F0]", title: "Consultation completed", time: "Oct 2, 2024" },
  { icon: <ChatIcon size={16} />, tile: "bg-[#F3E8FF]", title: "Enquiry received", time: "Sep 28, 2024" },
];

const CARD =
  "absolute rounded-[18px] bg-white/95 shadow-[0_24px_50px_-24px_rgba(16,42,67,0.35),0_2px_8px_rgba(16,42,67,0.06)] ring-1 ring-[#102A43]/5 backdrop-blur";

export function HealthcareCrmHero() {
  return (
    <section id="overview" className="relative overflow-hidden bg-[#F4FBFA]">
      <style>{`
        @keyframes crmFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .crm-float { animation: crmFloat 5.6s ease-in-out infinite; }
      `}</style>

      {/* soft mint washes */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-[#DDF5F0]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-[420px] w-[420px] rounded-full bg-[#DDF5F0]/50 blur-3xl" />

      {/* background photo, fading up into the pale hero */}
      <div className="absolute inset-x-0 bottom-0 h-[420px] lg:h-[640px]">
        <Image
          src="/healthcare/crm-hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_66%]"
        />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#F4FBFA] via-[#F4FBFA]/60 to-transparent" />
      </div>

      <div className="relative z-10 px-5 sm:px-6 lg:px-6">
        <div className="relative mx-auto max-w-[1300px] pt-14 lg:pt-[72px]">
          {/* script flourish (xl+) */}
          <div className="pointer-events-none absolute left-2 top-[110px] hidden -rotate-[12deg] xl:block">
            <p className={`${script.className} text-[44px] leading-[0.95] text-[#0F9488]`}>
              Better
              <br />
              <span className="ml-3 inline-block">Care</span>
              <br />
              <span className="ml-6 inline-block">Together</span>
            </p>
            <svg width="110" height="14" viewBox="0 0 110 14" fill="none" className="ml-1 mt-2">
              <path d="M2 11C30 6 70 3 108 2" stroke="#0F9488" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* tagline (xl+) */}
          <div className="absolute right-0 top-[92px] hidden xl:block">
            <div className="border-l-2 border-[#102A43]/12 pl-5">
              <p className="max-w-[170px] text-[14px] leading-[1.5] text-[#102A43]/65">
                More meaningful patient relationships for a healthier tomorrow.
              </p>
              <span className="mt-3 block h-[3px] w-9 rounded-full bg-[#2CB6A5]" />
            </div>
          </div>

          {/* copy */}
          <div className="mx-auto max-w-[1040px] text-center">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.3em] text-[#0F9488]">
              Patient relationships that last
            </p>
            <h1 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#102A43] sm:text-[46px] lg:text-[54px]">
              Turn every patient interaction<br className="hidden sm:block" /> into a lasting relationship.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[16.5px] leading-[1.65] text-[#102A43]/70">
              From the first enquiry to the next appointment and every follow-up
              in between, keep patient conversations, relationships, and
              activities connected. EVOQ Healthcare CRM gives hospitals, clinics,
              medical centers, specialty practices, and healthcare groups a
              clearer way to manage patient relationships throughout the patient
              journey.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#expert"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#0F766E] px-7 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_12px_28px_-12px_rgba(15,118,110,0.6)] transition-all hover:-translate-y-px hover:bg-[#0B5F58]"
              >
                Talk to an expert
                <ArrowRight size={15} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2.5 rounded-full border border-[#0F766E] bg-white/70 px-7 py-3.5 text-[15px] font-semibold text-[#0F766E] no-underline backdrop-blur transition-all hover:-translate-y-px hover:bg-white"
              >
                Explore features
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* photo stage with floating UI cards */}
          <div className="relative mt-8 h-[300px] lg:h-[560px]">
            {/* Enquiries list */}
            <div className={`${CARD} crm-float left-0 top-[60px] hidden w-[270px] p-5 lg:block`}>
              <div className="flex items-center justify-between">
                <p className="font-[var(--font-display)] text-[15px] font-bold text-[#102A43]">Enquiries</p>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#102A43]/55">
                  View all <ArrowRight size={10} />
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-3.5">
                {ENQUIRIES.map((e) => (
                  <div key={e.name} className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DDF5F0] text-[11px] font-bold text-[#123B3A]">
                      {e.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-semibold text-[#102A43]">{e.name}</span>
                      <span className="block text-[10.5px] text-[#102A43]/50">{e.source}</span>
                    </span>
                    <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${e.pill}`}>{e.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enquiries chip */}
            <div className={`${CARD} crm-float left-[285px] top-[0px] hidden w-[68px] flex-col items-center gap-1 p-2.5 lg:flex`} style={{ animationDelay: "0.8s" }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6FF]">
                <ChatIcon />
              </span>
              <span className="text-[10px] font-semibold text-[#102A43]">Enquiries</span>
            </div>

            {/* Patient card */}
            <div className={`${CARD} crm-float left-[calc(50%+40px)] top-[60px] hidden w-[320px] p-5 lg:block`} style={{ animationDelay: "1.4s" }}>
              <div className="flex items-start gap-3">
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#DDF5F0] font-[var(--font-display)] text-[17px] font-bold text-[#0F766E]">
                  EC
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-[var(--font-display)] text-[16px] font-bold text-[#102A43]">Emily Carter</p>
                  <p className="text-[12px] text-[#102A43]/55">Patient</p>
                  <p className="text-[12px] text-[#102A43]/55">ID &nbsp;#10492</p>
                </div>
                <span className="text-[16px] font-bold leading-none tracking-widest text-[#102A43]/50">···</span>
              </div>
              <div className="mt-4 flex gap-4 border-b border-[#102A43]/8 text-[11.5px]">
                {["Overview", "Appointments", "Notes", "Activity"].map((t, i) => (
                  <span
                    key={t}
                    className={`pb-2 font-medium ${i === 0 ? "border-b-2 border-[#0F766E] text-[#0F766E]" : "text-[#102A43]/55"}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <dl className="mt-3.5 flex flex-col gap-2.5 text-[12px]">
                {DETAILS.map((d) => (
                  <div key={d.label} className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="text-[#102A43]/55">{d.label}</dt>
                    <dd className="font-medium text-[#102A43]">{d.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <dt className="text-[#102A43]/55">Status</dt>
                  <dd>
                    <span className="rounded-md bg-[#DDF5F0] px-2.5 py-1 text-[11px] font-semibold text-[#0F766E]">Active</span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Appointments chip */}
            <div className={`${CARD} crm-float right-[16px] top-[0px] hidden w-[86px] flex-col items-center gap-1 p-2.5 lg:flex`} style={{ animationDelay: "2s" }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDF5F0]">
                <CalPlusIcon />
              </span>
              <span className="text-[10px] font-semibold text-[#102A43]">Appointments</span>
            </div>

            {/* Recent activity */}
            <div className={`${CARD} crm-float right-0 top-[140px] hidden w-[260px] p-5 lg:block`} style={{ animationDelay: "0.4s" }}>
              <p className="font-[var(--font-display)] text-[13px] font-bold text-[#102A43]">Recent activity</p>
              <ul className="mt-4 flex flex-col gap-3.5">
                {ACTIVITY.map((a) => (
                  <li key={a.title} className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.tile}`}>{a.icon}</span>
                    <span>
                      <span className="block text-[11.5px] font-semibold text-[#102A43]">{a.title}</span>
                      <span className="block text-[10px] text-[#102A43]/50">{a.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
