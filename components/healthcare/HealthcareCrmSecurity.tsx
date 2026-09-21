type IP = { size?: number; stroke?: string };
const I = ({ size = 24, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const ShieldIcon = ({ size = 34, stroke = "#18B8D1" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </I>
);
const BuildingIcon = () => (
  <I>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M12 8v6M9 11h6M9 21v-3h6v3" />
  </I>
);
const KeyIcon = () => (
  <I stroke="#18B8D1">
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 9-9M16 7l3 3M14 9l2 2" />
  </I>
);
const FlowIcon = () => (
  <I stroke="#7C6BE0">
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="15" width="6" height="6" rx="1" />
    <path d="M9 6h4a3 3 0 0 1 3 3v6" />
  </I>
);
const PlugIcon = () => (
  <I stroke="#E8813A">
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </I>
);

const TILES = [
  { icon: <BuildingIcon />, tile: "bg-[#E8F1FA]", label: "Organizational requirements" },
  { icon: <KeyIcon />, tile: "bg-[#E1F6F8]", label: "Access policies" },
  { icon: <FlowIcon />, tile: "bg-[#ECE8FB]", label: "Workflows" },
  { icon: <PlugIcon />, tile: "bg-[#FDEBDD]", label: "Integrations" },
];

const ENVIRONMENTS = ["Privacy", "Security", "Regulatory", "Technology"];

export function HealthcareCrmSecurity() {
  return (
    <section className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-[#F2F8FD] to-[#E6F4F6] ring-1 ring-[#31465A]/8">
            <div className="pointer-events-none absolute -left-32 -top-32 h-[340px] w-[340px] rounded-full bg-[#E3F2FA] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 right-[-60px] h-[420px] w-[420px] rounded-full bg-[#DCEAFB]/70 blur-3xl" />

            <div className="relative grid items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-14 lg:py-16">
              {/* copy */}
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#18A0B8]">
                  Privacy. Security. Flexibility.
                </p>
                <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#102A43] sm:text-[50px]">
                  Built for your environment.
                </h2>
                <div className="mt-6 max-w-[600px] text-[16px] leading-[1.6] text-[#31465A]/75">
                  <p>
                    Healthcare organizations operate within different privacy, security, regulatory, and technology
                    environments. EVOQ Healthcare CRM provides a flexible foundation that can be configured around
                    organizational requirements, access policies, workflows, and integrations.
                  </p>
                  <p className="mt-4">
                    Security and compliance requirements can vary by country, healthcare organization, data handled,
                    and deployment model. EVOQ&apos;s healthcare architecture is designed to support the controls and
                    integrations required for the environments in which the platform is deployed.
                  </p>
                </div>
              </div>

              {/* visual */}
              <div className="relative mx-auto w-full max-w-[520px]">
                <div className={`relative rounded-[24px] bg-white p-6 shadow-[0_28px_60px_-30px_rgba(32,100,182,0.4)] ring-1 ring-[#2064B6]/8 sm:p-7`}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#E1F6F8]">
                      <ShieldIcon />
                    </span>
                    <div>
                      <p className="font-[var(--font-display)] text-[17px] font-bold text-[#102A43]">
                        Configured around your environment
                      </p>
                      <p className="mt-0.5 text-[13px] text-[#31465A]/60">One flexible healthcare foundation</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {TILES.map((t) => (
                      <div key={t.label} className="flex items-center gap-3 rounded-2xl bg-[#F6F9FC] px-4 py-3.5 ring-1 ring-[#31465A]/5">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${t.tile}`}>{t.icon}</span>
                        <span className="text-[13.5px] font-semibold leading-[1.3] text-[#102A43]">{t.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-[#31465A]/8 pt-5">
                    <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#31465A]/50">
                      Adapts to different
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {ENVIRONMENTS.map((e) => (
                        <span key={e} className="rounded-full bg-[#E8F1FA] px-4 py-2 text-[13px] font-semibold text-[#2064B6]">
                          {e}
                        </span>
                      ))}
                    </div>
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
