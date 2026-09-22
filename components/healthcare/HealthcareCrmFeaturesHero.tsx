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
  { label: "Healthcare", href: "/healthcare" },
  { label: "Healthcare CRM", href: "/healthcare/crm" },
];

const PATIENT_ROWS = [
  { icon: <TagIcon />, tile: "bg-[#F3E8FF]", label: "Primary interest", value: "Skin treatment" },
  { icon: <CalIcon />, tile: "bg-[#EEF6FF]", label: "Last visit", value: "Jan 18, 2025" },
  { icon: <ClockIcon />, tile: "bg-[#DDF5F0]", label: "Next follow-up", value: "Jan 25, 2025" },
];

const INTERACTIONS = [
  { icon: <PhoneIcon />, tile: "bg-[#DDF5F0]", title: "Follow-up call", date: "Jan 22, 2025" },
  { icon: <MailIcon />, tile: "bg-[#EEF6FF]", title: "Sent information", date: "Jan 20, 2025" },
  { icon: <CalCheckIcon />, tile: "bg-[#F3E8FF]", title: "Appointment scheduled", date: "Jan 18, 2025" },
];

export function HealthcareCrmFeaturesHero() {
  return (
    <section id="features" className="relative overflow-hidden bg-gradient-to-br from-white via-[#DDF5F0] to-[#18B8D1]">
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
                  Everything your team needs<br className="hidden sm:block" /> to manage patient relationships.
                </h1>
                <p className="mt-5 max-w-[500px] text-[16px] leading-[1.65] text-[#102A43]/70">
                  EVOQ Healthcare CRM brings patient enquiries, relationships,
                  follow-ups, communication, and engagement into one connected
                  workspace. Give every team member the context they need to
                  understand each relationship, stay on top of every next step,
                  and keep the patient journey moving.
                </p>
                <a
                  href="/healthcare/crm#expert"
                  className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#0F766E] px-7 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_12px_28px_-12px_rgba(15,118,110,0.6)] transition-all hover:-translate-y-px hover:bg-[#0B5F58]"
                >
                  Talk to an expert
                  <ArrowRight size={15} />
                </a>
              </div>

              {/* right: photo + context cards */}
              <div className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[400px] xl:mx-0 xl:h-[420px]">
                <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(16,42,67,0.45)]">
                  <Image
                    src="/healthcare/stock/crm-features-doctor.jpg"
                    alt="Doctor reviewing a patient record on a tablet"
                    fill
                    sizes="(min-width: 1280px) 560px, 90vw"
                    className="object-cover"
                    style={{ objectPosition: "62% 30%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/20 via-transparent to-transparent" />
                </div>

                {/* patient profile card */}
                <div className="absolute -left-4 top-3 hidden w-[300px] rounded-[16px] bg-white/95 p-4 shadow-[0_24px_54px_-26px_rgba(16,42,67,0.4)] ring-1 ring-[#102A43]/5 backdrop-blur sm:block">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/healthcare/avatars/emily.jpg"
                      alt="Emily Carter"
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-bold text-[#102A43]">Emily Carter</p>
                      <p className="text-[11.5px] text-[#102A43]/55">P-10458 &nbsp;·&nbsp; +1 415 555 0187</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-[#DDF5F0] px-2.5 py-1 text-[10.5px] font-semibold text-[#0F766E]">Active</span>
                  </div>
                  <dl className="mt-3.5 flex flex-col gap-2.5 border-t border-[#102A43]/8 pt-3.5">
                    {PATIENT_ROWS.map((r) => (
                      <div key={r.label} className="flex items-center gap-2.5">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${r.tile}`}>{r.icon}</span>
                        <dt className="text-[11.5px] text-[#102A43]/55">{r.label}</dt>
                        <dd className="ml-auto text-[11.5px] font-semibold text-[#102A43]">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* next follow-up chip */}
                <div className="absolute -right-4 top-[38%] hidden w-[188px] items-center gap-3 rounded-[16px] bg-white/95 p-3.5 shadow-[0_20px_44px_-24px_rgba(16,42,67,0.4)] ring-1 ring-[#102A43]/5 backdrop-blur sm:flex">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DDF5F0]">
                    <CalIcon stroke="#0F766E" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11.5px] font-bold text-[#102A43]">Next follow-up</span>
                    <span className="block text-[11px] text-[#102A43]/55">Jan 25 · 10:00 AM</span>
                  </span>
                </div>

                {/* recent interactions card */}
                <div className="absolute -bottom-6 left-2 hidden w-[280px] rounded-[16px] bg-white/95 p-4 shadow-[0_24px_54px_-26px_rgba(16,42,67,0.4)] ring-1 ring-[#102A43]/5 backdrop-blur sm:block">
                  <div className="flex items-center justify-between">
                    <p className="text-[13.5px] font-bold text-[#102A43]">Recent interactions</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1777F0]">
                      View all <ArrowRight size={10} />
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {INTERACTIONS.map((it) => (
                      <li key={it.title} className="flex items-center gap-2.5">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${it.tile}`}>{it.icon}</span>
                        <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-[#102A43]">{it.title}</span>
                        <span className="shrink-0 text-[11px] text-[#102A43]/50">{it.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
