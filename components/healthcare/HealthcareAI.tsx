import Image from "next/image";
import { HealthcareLogo } from "./HealthcareLogo";

type IP = { size?: number; stroke?: string; className?: string };

const Svg = ({ size = 24, stroke = "currentColor", className, children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    {children}
  </svg>
);

const MessageIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Svg>
);
const CalendarIcon = (p: IP) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
);
const ClockIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Svg>
);
const ArrowIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
const FileIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M8 3h6l4 4v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v4h4" />
  </Svg>
);
const HeartIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M12 20.5s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5.5c-2.5 4.65-9.5 9-9.5 9z" />
  </Svg>
);
const DotsIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </Svg>
);
const HomeIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
  </Svg>
);
const UsersIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" />
    <path d="M16 4.2c1.5.5 2.5 1.9 2.5 3.5s-1 3-2.5 3.5M19 20c-.5-2.3-1.6-3.8-3.2-4.6" />
  </Svg>
);
const CreditCardIcon = (p: IP) => (
  <Svg {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19" />
  </Svg>
);
const BarChartIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M4 20V10M12 20V4M20 20v-7" />
  </Svg>
);
const CheckCircleIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.4 2.4L16 10" />
  </Svg>
);

const NAV = [
  { icon: HomeIcon, label: "Home" },
  { icon: UsersIcon, label: "Patients", active: true },
  { icon: MessageIcon, label: "Enquiries" },
  { icon: CalendarIcon, label: "Appointments" },
  { icon: HeartIcon, label: "Visits" },
  { icon: FileIcon, label: "Treatments" },
  { icon: CreditCardIcon, label: "Billing" },
  { icon: MessageIcon, label: "Messages" },
  { icon: BarChartIcon, label: "Reports" },
];

const TABS = ["Overview", "Enquiries", "Appointments", "Visits", "Treatments", "Notes", "Activity"];

const JOURNEY = [
  { icon: MessageIcon, label: "Enquiry", meta: "Sep 10, 2025", desc: "Skin treatment", tile: "bg-[#E6F0FD]", stroke: "#2064B6" },
  { icon: CalendarIcon, label: "Appointment", meta: "Sep 18, 2025", desc: "Consultation", tile: "bg-[#ECE8FB]", stroke: "#6B5CE7" },
  { icon: HeartIcon, label: "Visit", meta: "Sep 24, 2025", desc: "Skin rejuvenation (Session 1)", tile: "bg-[#E1F6F3]", stroke: "#0F766E", active: true },
  { icon: FileIcon, label: "Treatment", meta: "In progress", desc: "Package plan", tile: "bg-[#FDEFE1]", stroke: "#C2792F" },
  { icon: ClockIcon, label: "Follow-up", meta: "Sep 30, 2025", desc: "Post-treatment check-in", tile: "bg-[#EEF1F4]", stroke: "#31465A" },
];

const ACTIVITY = [
  { icon: HeartIcon, tile: "bg-[#E1F6F3]", stroke: "#0F766E", title: "Visit completed", desc: "Skin rejuvenation (Session 1)", date: "Sep 24, 2025" },
  { icon: CalendarIcon, tile: "bg-[#ECE8FB]", stroke: "#6B5CE7", title: "Appointment attended", desc: "Consultation", date: "Sep 18, 2025" },
  { icon: MessageIcon, tile: "bg-[#E6F0FD]", stroke: "#2064B6", title: "Enquiry received", desc: "Interested in skin treatment", date: "Sep 10, 2025" },
];

export function HealthcareAISpotlight() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F1FBF9] to-[#E1F6F3]">
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#C9EFEB]/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#14B8A6]/10 via-[#3B82F6]/10 to-[#8B5CF6]/10 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1400px] py-16 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.2fr] lg:items-center">
            {/* copy */}
            <div className="max-w-[500px]">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#0FA3BC]">
                AI across the patient journey
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-[36px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#102A43]">
                EVI and AI agents, working across the patient journey.
              </h2>
              <p className="mt-6 text-[16px] font-semibold leading-[1.6] text-[#31465A]">
                Find what needs attention. Prepare the next step. Reduce routine work.
              </p>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#31465A]/70">
                EVI, the EVOQ AI assistant, helps your team find patient information across enquiries, appointments,
                visits, and treatments, and prepares the next step. AI agents handle defined tasks such as follow-ups
                and reminders, then return the result for your review.
              </p>

              <a
                href="/evoq-ai"
                className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#14B8A6] via-[#3B82F6] to-[#8B5CF6] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_20px_40px_-16px_rgba(59,130,246,0.5)] transition-transform hover:-translate-y-0.5"
              >
                Explore EVOQ AI
                <ArrowIcon size={18} stroke="#fff" />
              </a>
            </div>

            {/* visual: full product mockup, authored at 980x600 and scaled down to fit an even column */}
            <div className="relative mx-auto hidden w-full max-w-[720px] lg:block" style={{ height: 441 }}>
            <div className="relative h-[600px] w-[980px] origin-top-left" style={{ transform: "scale(0.735)" }}>
              {/* floating sparkle bubble */}
              <span className="absolute right-[2%] top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-14px_rgba(16,42,67,0.4)] ring-1 ring-[#31465A]/8">
                <Image src="/ai/ai-logo-icon.png" alt="EVOQ AI" width={30} height={30} className="rounded-[9px]" />
              </span>

              {/* app window */}
              <div className="absolute left-0 top-[6%] flex h-[490px] w-[860px] overflow-hidden rounded-[22px] bg-white shadow-[0_40px_90px_-30px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/8">
                {/* sidebar */}
                <div className="hidden w-[168px] shrink-0 flex-col border-r border-[#31465A]/8 bg-[#FAFBFC] p-4 sm:flex">
                  <div className="px-1">
                    <HealthcareLogo />
                  </div>
                  <nav className="mt-6 flex flex-col gap-0.5">
                    {NAV.map((item) => (
                      <span
                        key={item.label}
                        className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[12.5px] font-semibold ${
                          item.active ? "bg-[#E6F0FD] text-[#2064B6]" : "text-[#31465A]/60"
                        }`}
                      >
                        <item.icon size={15} stroke={item.active ? "#2064B6" : "#31465A99"} />
                        {item.label}
                      </span>
                    ))}
                  </nav>
                </div>

                {/* main */}
                <div className="min-w-0 flex-1 overflow-hidden p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Image src="/healthcare/avatars/priya.jpg" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white" />
                      <div>
                        <span className="flex items-center gap-2">
                          <p className="text-[15px] font-bold text-[#102A43]">Emily Carter</p>
                          <span className="rounded-full bg-[#DDF5F0] px-2.5 py-0.5 text-[10.5px] font-bold text-[#0F766E]">Active</span>
                        </span>
                        <p className="text-[11.5px] text-[#31465A]/55">P-10458 &nbsp;|&nbsp; 32 years &nbsp;|&nbsp; +1 415 555 0187</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-full border border-[#31465A]/15 px-3 py-1.5 text-[11.5px] font-bold text-[#31465A]/70">
                        View full profile
                      </span>
                      <DotsIcon size={16} stroke="#31465A66" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 overflow-hidden border-b border-[#31465A]/8 text-[12px] font-semibold text-[#31465A]/40">
                    {TABS.map((t) => (
                      <span
                        key={t}
                        className={`-mb-px shrink-0 border-b-2 pb-2 ${t === "Overview" ? "border-[#2064B6] text-[#2064B6]" : "border-transparent"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="relative mt-5 grid grid-cols-5 gap-1.5">
                    <div className="pointer-events-none absolute left-[10%] right-[10%] top-[16px] h-px bg-[#31465A]/12" />
                    {JOURNEY.map((step) => (
                      <div key={step.label} className="relative flex flex-col items-center text-center">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${step.tile} ${step.active ? "ring-2 ring-offset-2 ring-[#0F766E]" : ""}`}>
                          <step.icon size={14} stroke={step.stroke} />
                        </span>
                        <p className="mt-2 text-[11px] font-bold text-[#102A43]">{step.label}</p>
                        <p className="mt-0.5 text-[10px] font-semibold text-[#31465A]/50">{step.meta}</p>
                        <p className="mt-0.5 truncate text-[10px] text-[#31465A]/50">{step.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[16px] bg-[#FAFBFC] p-4 ring-1 ring-[#31465A]/6">
                    <div className="flex items-center justify-between">
                      <p className="text-[12.5px] font-bold text-[#102A43]">Recent activity</p>
                      <span className="text-[11px] font-bold text-[#2064B6]">View all</span>
                    </div>
                    <div className="mt-2 divide-y divide-[#31465A]/8">
                      {ACTIVITY.map((a) => (
                        <div key={a.title} className="flex items-center gap-3 py-2.5">
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.tile}`}>
                            <a.icon size={14} stroke={a.stroke} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[12px] font-bold text-[#102A43]">{a.title}</p>
                            <p className="truncate text-[11px] text-[#31465A]/55">{a.desc}</p>
                          </div>
                          <p className="shrink-0 text-[10.5px] font-semibold text-[#31465A]/45">{a.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* EVI answer + follow-up agent, overlapping the window's bottom-right corner */}
              <div className="absolute bottom-0 right-0 w-[480px] rounded-[24px] bg-gradient-to-r from-[#000099] via-[#4747E0] to-[#5C5CFF] p-[1.5px] shadow-[0_35px_70px_-24px_rgba(71,71,224,0.55)]">
                <div className="rounded-[22.5px] bg-white p-5 pb-12">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Image src="/ai/ai-logo-icon.png" alt="EVOQ AI" width={32} height={32} className="rounded-[10px]" />
                      <span className="text-[15px] font-extrabold text-[#0C2472]">EVI</span>
                    </span>
                    <span className="rounded-full bg-[#ECECFF] px-3 py-1 text-[11px] font-bold text-[#4747E0]">
                      AI assistant
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <p className="max-w-[330px] rounded-[16px] rounded-br-[5px] bg-gradient-to-r from-[#4747E0] to-[#5C5CFF] px-3.5 py-2.5 text-[12.5px] font-semibold leading-[1.45] text-white">
                      Which patients need a follow-up this week?
                    </p>
                  </div>
                  <div className="mt-2.5 rounded-[16px] rounded-bl-[5px] bg-[#F5F5FF] p-3.5 text-[13px] leading-[1.6] text-[#0C2472]">
                    <strong>3 patients</strong> need follow-up this week. Emily Carter completed her first skin
                    rejuvenation session on Sep 24 and has no next appointment booked.
                  </div>

                  <div className="mt-3 rounded-[14px] border border-[#E6E6FA] p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[13px] font-extrabold text-[#0C2472]">
                        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#ECECFF]">
                          <ClockIcon size={14} stroke="#4747E0" />
                        </span>
                        Follow-up agent
                      </span>
                      <span className="rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[10.5px] font-bold text-[#B7791F]">
                        Awaiting approval
                      </span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 text-[12.5px] text-[#31465A]/80">
                      <span className="flex items-center gap-2">
                        <CheckCircleIcon size={15} stroke="#0E9F6E" />
                        3 patients reviewed
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircleIcon size={15} stroke="#0E9F6E" />
                        2 follow-ups prepared
                      </span>
                      <span className="flex items-center gap-2">
                        <CalendarIcon size={15} stroke="#B7791F" />
                        1 needs your approval
                      </span>
                    </div>
                    <button
                      type="button"
                      className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#4747E0] px-4 py-2 text-[12.5px] font-bold text-white"
                    >
                      Review follow-ups
                      <ArrowIcon size={13} stroke="#fff" />
                    </button>
                  </div>
                </div>
              </div>

              {/* separate input layer floating over the card's bottom edge */}
              <div className="absolute -bottom-8 right-0 z-10 w-[600px] rounded-full bg-gradient-to-r from-[#000099] via-[#4747E0] to-[#5C5CFF] p-[2px] shadow-[0_34px_70px_-18px_rgba(71,71,224,0.75)]">
                <div className="flex items-center gap-4 rounded-full bg-white py-3.5 pl-6 pr-3.5">
                  <MessageIcon size={20} stroke="#4747E0" />
                  <span className="flex-1 text-[15px] font-medium text-[#31465A]/60">Ask EVI about a patient, appointment, or follow-up…</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#4747E0] to-[#5C5CFF] shadow-[0_12px_24px_-8px_rgba(71,71,224,0.9)]">
                    <ArrowIcon size={20} stroke="#fff" />
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
