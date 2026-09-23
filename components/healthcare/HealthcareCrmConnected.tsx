import { Caveat } from "next/font/google";

const script = Caveat({ subsets: ["latin"], weight: ["600"] });

type IP = { size?: number; stroke?: string };
const I = ({ size = 26, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const PracticeIcon = ({ size, stroke = "#18B8D1" }: IP) => (
  <I size={size} stroke={stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
  </I>
);
const BookingIcon = ({ size, stroke = "#2064B6" }: IP) => (
  <I size={size} stroke={stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M12 13v5M9.5 15.5h5" />
  </I>
);
const BillingIcon = ({ size, stroke = "#E8A13A" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M4 2v20l2-1.5L8 22l2-1.5L12 22l2-1.5L16 22l2-1.5L20 22V2l-2 1.5L16 2l-2 1.5L12 2l-2 1.5L8 2 6 3.5z" />
    <path d="M9 8h6M9 12h6" />
  </I>
);
const CampaignIcon = ({ size, stroke = "#DB4C8F" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </I>
);
const SurveyIcon = ({ size, stroke = "#7C6BE0" }: IP) => (
  <I size={size} stroke={stroke}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </I>
);
const LoyaltyIcon = ({ size, stroke = "#18B8D1" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </I>
);
const SystemsIcon = ({ size, stroke = "#2064B6" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </I>
);
const HeartPulse = () => (
  <I size={30} stroke="#18B8D1">
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5" />
    <path d="M3.5 12h3l1.5-2.5 2 5 2-6.5 1.5 2h3" />
    <path d="M12 21c-2-1.2-4-2.8-5.5-4.5M12 21c2-1.2 4-2.8 5.5-4.5" />
  </I>
);
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const APPS = [
  {
    title: "Healthcare Practice Management",
    desc: "Connect patient relationships with providers, schedules, services, appointments, and operational workflows.",
    icon: <PracticeIcon />,
    tile: "bg-[#E1F6F3]",
    chip: <PracticeIcon size={22} />,
  },
  {
    title: "Booking Engine",
    desc: "Move from patient interest to appointment booking with a connected experience.",
    icon: <BookingIcon />,
    tile: "bg-[#E8F1FA]",
    chip: <BookingIcon size={22} />,
  },
  {
    title: "Billing",
    desc: "Keep billing, invoices, payments, and outstanding balances connected to the patient relationship.",
    icon: <BillingIcon />,
    tile: "bg-[#FEF0DC]",
    chip: <BillingIcon size={22} />,
  },
  {
    title: "Campaigns",
    desc: "Use patient and relationship context to create more relevant campaigns and outreach.",
    icon: <CampaignIcon />,
    tile: "bg-[#FDEAF3]",
    chip: <CampaignIcon size={22} />,
  },
  {
    title: "Surveys",
    desc: "Bring patient feedback into the broader relationship history.",
    icon: <SurveyIcon />,
    tile: "bg-[#ECE8FB]",
    chip: <SurveyIcon size={22} />,
  },
  {
    title: "Loyalty",
    desc: "Connect loyalty activity with patient relationships and returning patients.",
    icon: <LoyaltyIcon />,
    tile: "bg-[#E1F6F8]",
    chip: <LoyaltyIcon size={22} />,
  },
];

const HUB = 420;
const RADIUS = 152;

function Hub() {
  const c = HUB / 2;
  return (
    <div className="relative mx-auto hidden shrink-0 md:block" style={{ width: HUB, height: HUB }}>
      <div className="absolute rounded-full border border-dashed border-[#2064B6]/25" style={{ inset: c - RADIUS }} />
      <div className="absolute rounded-full bg-[#DCEAFB]/60" style={{ inset: c - 105 }} />
      <div className="absolute flex flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_24px_54px_-24px_rgba(32,100,182,0.45)] ring-1 ring-[#2064B6]/8" style={{ inset: c - 62 }}>
        <HeartPulse />
        <span className="mt-1.5 text-[12.5px] font-bold leading-tight text-[#102A43]">
          Healthcare
          <br />
          CRM
        </span>
      </div>
      {APPS.map((a, i) => {
        const angle = (-90 + i * 60) * (Math.PI / 180);
        return (
          <span
            key={a.title}
            className="absolute flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_14px_30px_-14px_rgba(32,100,182,0.45)] ring-1 ring-[#2064B6]/8"
            style={{ left: c + RADIUS * Math.cos(angle), top: c + RADIUS * Math.sin(angle) }}
          >
            {a.chip}
          </span>
        );
      })}
    </div>
  );
}

export function HealthcareCrmConnected() {
  return (
    <section className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-[#F2F8FD] to-[#E6F4F6] p-6 ring-1 ring-[#31465A]/8 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -left-32 -top-32 h-[340px] w-[340px] rounded-full bg-[#E3F2FA] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-0 h-[360px] w-[360px] rounded-full bg-[#E1F6F3]/80 blur-3xl" />

            {/* header */}
            <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
              <div className="max-w-[640px]">
                <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#18A0B8]">
                  Connected across your practice
                </p>
                <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#102A43]">
                  Connect patient relationships with the rest of your practice.
                </h2>
                <p className="mt-6 max-w-[560px] text-[16px] leading-[1.6] text-[#31465A]/75">
                  Healthcare CRM works alongside the systems and applications that manage other parts of the patient
                  journey.
                </p>
                <div className="pointer-events-none mt-6 hidden -rotate-[4deg] lg:block">
                  <p className={`${script.className} text-[24px] leading-none text-[#18B8D1]`}>One relationship. Every touchpoint.</p>
                  <svg width="150" height="10" viewBox="0 0 150 10" fill="none" className="mt-1">
                    <path d="M2 7C40 2 100 2 148 3" stroke="#18B8D1" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <Hub />
            </div>

            {/* app cards */}
            <div className="relative mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {APPS.map((a) => (
                <article
                  key={a.title}
                  className="flex flex-col rounded-[22px] bg-white p-5 shadow-[0_18px_44px_-30px_rgba(16,42,67,0.3)] ring-1 ring-[#31465A]/6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_52px_-28px_rgba(16,42,67,0.36)]"
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full ${a.tile}`}>
                      {a.chip}
                    </span>
                    <h3 className="flex-1 text-[18px] font-bold leading-[1.2] text-[#102A43]">{a.title}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F1FA] text-[#2064B6]">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[1.5] text-[#31465A]/70">{a.desc}</p>
                </article>
              ))}
            </div>

            {/* healthcare systems */}
            <div className="relative mt-5 flex flex-col gap-5 rounded-[22px] bg-gradient-to-r from-[#EEF4FB] via-[#F1F8FC] to-[#E9F5F7] px-6 py-6 ring-1 ring-[#31465A]/6 sm:px-9 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#DFEBF8]">
                  <SystemsIcon size={30} />
                </span>
                <div>
                  <p className="text-[17px] font-bold leading-[1.3] text-[#102A43]">Healthcare systems</p>
                  <p className="mt-1 max-w-[680px] text-[14px] leading-[1.5] text-[#31465A]/70">
                    Connect with existing healthcare systems and other business applications through integrations and
                    APIs where supported.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2.5">
                {["Integrations", "APIs"].map((t) => (
                  <span key={t} className="rounded-full bg-white px-5 py-2.5 text-[13.5px] font-semibold text-[#2064B6] shadow-[0_10px_24px_-16px_rgba(32,100,182,0.5)] ring-1 ring-[#2064B6]/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
