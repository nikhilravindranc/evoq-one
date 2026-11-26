import Image from "next/image";
import Link from "next/link";

const sv = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const TagIcon = ({ size = 18, stroke = "#7C3AED" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <path d="M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .6 1.4l9 9a2 2 0 0 0 2.8 0l7.6-7.6a2 2 0 0 0 0-2.8l-9-9a2 2 0 0 0-1.4-.6z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill={stroke} stroke="none" />
  </svg>
);
const CalIcon = ({ size = 18, stroke = "#1777F0" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const ClockIcon = ({ size = 18, stroke = "#0F766E" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const PhoneIcon = ({ size = 18, stroke = "#0F766E" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const MailIcon = ({ size = 18, stroke = "#1777F0" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const CalCheckIcon = ({ size = 18, stroke = "#7C3AED" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
  </svg>
);
const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 6 6 6-6 6" />
  </svg>
);

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Healthcare", href: "/solutions/healthcare" },
  { label: "Patient Relationships", href: "/solutions/healthcare/patient-relationships" },
];

const PATIENT_ROWS = [
  { icon: <TagIcon />, tile: "bg-[#F3E8FF]", label: "Primary interest", value: "Skin treatment" },
  { icon: <CalIcon />, tile: "bg-[#EEF6FF]", label: "Last visit", value: "Jan 18, 2025" },
  { icon: <ClockIcon />, tile: "bg-[#DDF5F0]", label: "Next follow up", value: "Jan 25, 2025" },
];

const INTERACTIONS = [
  { icon: <PhoneIcon />, tile: "bg-[#DDF5F0]", title: "Follow up call", date: "Jan 22, 2025" },
  { icon: <MailIcon />, tile: "bg-[#EEF6FF]", title: "Sent information", date: "Jan 20, 2025" },
  { icon: <CalCheckIcon />, tile: "bg-[#F3E8FF]", title: "Appointment scheduled", date: "Jan 18, 2025" },
];

export function HcCrmFeaturesHero() {
  return (
    <section id="features" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full bg-white/20 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] pt-6 lg:pt-8">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#102A43]/50">
            {BREADCRUMB.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5">
                <Link href={b.href} className="text-[#102A43]/50 no-underline transition-colors hover:text-[#0F766E]">
                  {b.label}
                </Link>
                <ChevronIcon />
              </span>
            ))}
            <span className="font-semibold text-[#102A43]">Features</span>
          </nav>

          <div className="grid items-center gap-10 py-12 lg:gap-14 lg:py-14 xl:grid-cols-[minmax(0,1fr)_600px]">
              {/* left: copy */}
              <div>
                <p className="text-[12.5px] font-bold uppercase tracking-[0.26em] text-[#0F9488]">Features</p>
                <h1 className="mt-4 max-w-[600px] font-[var(--font-display)] text-[30px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#102A43] sm:text-[38px] lg:text-[40px]">
                  Features for enquiries,<br className="hidden sm:block" /> follow ups and patient history.
                </h1>
                <p className="mt-5 max-w-[500px] text-[16px] leading-[1.65] text-[#102A43]/70">
                  EVOQ CRM brings patient enquiries, follow ups, conversations and
                  history together on the patient's record, so your team sees what
                  has happened and what needs attention next.
                </p>
                <a
                  href="/solutions/healthcare/patient-relationships-v1#expert"
                  className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#0F766E] px-7 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_12px_28px_-12px_rgba(15,118,110,0.6)] transition-all hover:-translate-y-px hover:bg-[#0B5F58]"
                >
                  Talk to an expert
                  <ArrowRight size={15} />
                </a>
              </div>

              {/* right: one photograph and one small card */}
              <div className="relative mx-auto h-[320px] w-full max-w-[560px] sm:h-[380px] xl:mx-0">
                <div className="relative h-full w-full overflow-hidden rounded-[12px] rounded-tr-[110px] shadow-[0_30px_70px_-34px_rgba(16,42,67,0.5)]">
                  <Image
                    src="/healthcare/stock/crm-features-doctor.jpg"
                    alt="Doctor reviewing a patient record on a tablet"
                    fill
                    priority
                    sizes="(min-width: 1280px) 560px, 90vw"
                    className="object-cover"
                    style={{ objectPosition: "62% 30%" }}
                  />
                </div>
                <div className="absolute -left-4 bottom-6 flex items-center gap-3 rounded-[14px] bg-white px-4 py-3 shadow-[0_0_0_1px_#E2E8EC,0_24px_44px_-22px_rgba(16,42,67,0.4)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DDF5F0]">
                    <CalIcon stroke="#0F766E" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-[#102A43]">Next follow up</span>
                    <span className="block text-[12px] text-[#102A43]/55">Emily Carter, Jan 25, 10:00 AM</span>
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
