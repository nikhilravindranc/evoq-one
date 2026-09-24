type IP = { size?: number; stroke?: string };

const Svg = ({ size = 26, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const ExchangeIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" />
  </Svg>
);
const ShieldCheckIcon = (p: IP) => (
  <Svg {...p}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);
const GlobeIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Svg>
);

const CARDS = [
  {
    key: "interop",
    icon: (size: number) => <ExchangeIcon size={size} stroke="#1777F0" />,
    title: "Interoperability",
    tags: ["HL7", "FHIR", "APIs"],
    desc: "Support standards-based exchange of healthcare information across connected applications and systems.",
    tile: "bg-[#E6F0FD]",
    tag: "bg-[#E6F0FD] text-[#1777F0]",
    border: "border-[#BFD9F7]",
    glow: "from-[#DCEBFD]",
  },
  {
    key: "privacy",
    icon: (size: number) => <ShieldCheckIcon size={size} stroke="#18B8D1" />,
    title: "Privacy & security",
    tags: ["HIPAA", "DPDP", "UAE PDPL"],
    desc: "Support applicable privacy and data-protection requirements according to the organization, location, and deployment.",
    tile: "bg-[#DDF6F8]",
    tag: "bg-[#DDF6F8] text-[#0FA3BC]",
    border: "border-[#B5E6EE]",
    glow: "from-[#D8F3F6]",
  },
  {
    key: "ecosystems",
    icon: (size: number) => <GlobeIcon size={size} stroke="#6B5CE7" />,
    title: "Digital health ecosystems",
    tags: ["ABDM", "NABIDH", "Riayati", "Malaffi"],
    desc: "Support relevant digital-health and health-information exchange requirements where applicable to the organization and deployment.",
    tile: "bg-[#ECE8FB]",
    tag: "bg-[#ECE8FB] text-[#5B4BD5]",
    border: "border-[#D3CCF5]",
    glow: "from-[#E7E2FA]",
  },
];

function Hub() {
  return (
    <div className="relative mx-auto hidden h-[400px] w-full max-w-[600px] lg:block">
      <div className="absolute left-1/2 top-[46%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2064B6]/10" />
      <div className="absolute left-1/2 top-[46%] h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E4EEFC]/60 ring-1 ring-[#2064B6]/8" />
      <div className="absolute left-1/2 top-[46%] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D3E4FB]/70 blur-[2px]" />

      <svg
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_30px_rgba(32,100,182,0.25)]"
        width="150"
        height="170"
        viewBox="0 0 150 170"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hcShield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#D5E5FB" />
          </linearGradient>
        </defs>
        <path d="M75 6 16 28v52c0 38 25 68 59 84 34-16 59-46 59-84V28z" fill="url(#hcShield)" stroke="#C4DAF7" strokeWidth="2" />
        <rect x="52" y="76" width="46" height="40" rx="8" fill="#1777F0" />
        <path d="M60 76V64a15 15 0 0 1 30 0v12" stroke="#1777F0" strokeWidth="9" strokeLinecap="round" />
        <circle cx="75" cy="94" r="5" fill="#fff" />
        <path d="M75 96v10" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <span className="absolute left-[38%] top-[8%] h-3 w-3 rounded-full bg-[#1777F0] ring-4 ring-[#1777F0]/15" />
      <span className="absolute right-[16%] top-[3%] h-3 w-3 rounded-full bg-[#18B8D1] ring-4 ring-[#18B8D1]/15" />
      <span className="absolute left-[51%] top-[76%] h-3 w-3 rounded-full bg-[#6B5CE7] ring-4 ring-[#6B5CE7]/15" />

      <div className="absolute left-0 top-[14%] flex items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-6 shadow-[0_22px_50px_-22px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6F0FD]">
          <ExchangeIcon size={20} stroke="#1777F0" />
        </span>
        <span className="text-[14px] font-semibold text-[#102A43]">Interoperability</span>
      </div>
      <div className="absolute right-0 top-[14%] flex items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-6 shadow-[0_22px_50px_-22px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DDF6F8]">
          <ShieldCheckIcon size={20} stroke="#18B8D1" />
        </span>
        <span className="text-[14px] font-semibold text-[#102A43]">Privacy &amp; security</span>
      </div>
      <div className="absolute bottom-[4%] left-[27%] flex items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-6 shadow-[0_22px_50px_-22px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ECE8FB]">
          <GlobeIcon size={20} stroke="#6B5CE7" />
        </span>
        <span className="text-[14px] font-semibold text-[#102A43]">Digital health ecosystems</span>
      </div>
    </div>
  );
}

export function HealthcareStandards() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F4F8FC] to-white">
      <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-[#DCEBFD]/60 blur-3xl" />
      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
            <div className="max-w-[640px]">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.24em] text-[#18B8D1]">
                Interoperability, privacy &amp; healthcare standards
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#102A43]">
                Designed for the realities of healthcare technology.
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-[#31465A]/75">
                Healthcare organizations operate within a complex environment of healthcare standards, privacy
                requirements, and regional digital-health frameworks. EVOQ Healthcare is designed with these
                requirements in mind, supporting the standards and frameworks relevant to the organization,
                location, and deployment.
              </p>
            </div>
            <Hub />
          </div>

          <div className="mt-12 grid gap-6 lg:mt-10 lg:grid-cols-3">
            {CARDS.map((c) => (
              <div
                key={c.key}
                className={`relative overflow-hidden rounded-[22px] border bg-white p-6 shadow-[0_24px_56px_-34px_rgba(16,42,67,0.3)] ${c.border}`}
              >
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${c.glow} to-transparent opacity-70`} />
                <div className="relative flex items-start gap-4">
                  <span className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${c.tile}`}>
                    {c.icon(28)}
                  </span>
                  <div>
                    <p className="font-[var(--font-display)] text-[20px] font-bold leading-[1.2] text-[#102A43]">{c.title}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className={`rounded-full px-3 py-1 text-[12px] font-semibold ${c.tag}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative mt-5 border-t border-[#31465A]/8 pt-5 text-[14.5px] leading-[1.6] text-[#31465A]/75">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
