import Image from "next/image";

const sv = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const GlobeIcon = () => (
  <svg {...sv} stroke="#1777F0">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
  </svg>
);
const PhoneIcon = ({ size = 22, stroke = "#0F766E" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const UsersIcon = ({ size = 22, stroke = "#7C3AED" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ChatIcon = ({ size = 22, stroke = "#DB2777" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
);
const CalIcon = ({ size = 22, stroke = "#D97706" }: { size?: number; stroke?: string }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M12 13v5M9.5 15.5h5" />
  </svg>
);
const MailIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...sv} width={size} height={size} stroke="#1777F0">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const DocIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...sv} width={size} height={size} stroke="#1777F0">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 13h6M9 17h4" />
  </svg>
);
const HeartPulse = () => (
  <svg {...sv} width={22} height={22} stroke="#0F766E">
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5" />
    <path d="M3.5 12h3l1.5-2.5 2 5 2-6.5 1.5 2h3" />
    <path d="M12 21c-2-1.2-4-2.8-5.5-4.5M12 21c2-1.2 4-2.8 5.5-4.5" />
  </svg>
);
const BarsIcon = () => (
  <svg {...sv} width={26} height={26} stroke="#1777F0">
    <path d="M6 20V10M12 20V4M18 20v-7" />
  </svg>
);
const HeartIcon = () => (
  <svg {...sv} width={26} height={26} stroke="#7C3AED">
    <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const SOURCES = [
  { label: ["Website", "inquiry"], icon: <GlobeIcon />, tile: "bg-[#EEF6FF]", left: 4, top: 70, w: 92, dot: "#1777F0" },
  { label: ["Phone", "call"], icon: <PhoneIcon />, tile: "bg-[#DDF5F0]", left: 136, top: 0, w: 88, dot: "#0F9488" },
  { label: ["Referral"], icon: <UsersIcon />, tile: "bg-[#F3E8FF]", left: 258, top: 22, w: 88, dot: "#7C3AED" },
  { label: ["Message"], icon: <ChatIcon />, tile: "bg-[#FDEAF3]", left: 384, top: 70, w: 92, dot: "#1777F0" },
  { label: ["Consultation", "request"], icon: <CalIcon />, tile: "bg-[#FEF3E2]", left: 512, top: 118, w: 112, dot: "#0F9488" },
];

const TIMELINE = [
  { icon: <MailIcon />, tile: "bg-[#EEF6FF]", title: "Enquiry received", time: "Today, 10:24 AM" },
  { icon: <PhoneIcon size={16} />, tile: "bg-[#DDF5F0]", title: "Follow-up call scheduled", time: "Today, 11:00 AM" },
  { icon: <CalIcon size={16} stroke="#7C3AED" />, tile: "bg-[#F3E8FF]", title: "Consultation booked", time: "Oct 18, 2024" },
  { icon: <DocIcon />, tile: "bg-[#EEF6FF]", title: "Treatment plan discussed", time: "Oct 21, 2024" },
];

const FIELDS = [
  { label: "Source", value: "Website inquiry" },
  { label: "Interest", value: "Skin treatment" },
  { label: "Assigned to", value: "Alicia Roberts" },
];

const BENEFITS = [
  { icon: <UsersIcon size={26} stroke="#0F766E" />, tile: "bg-[#DDF5F0]", lines: ["More", "engaged patients"] },
  { icon: <BarsIcon />, tile: "bg-[#EEF6FF]", lines: ["Clearer", "conversations"] },
  { icon: <HeartIcon />, tile: "bg-[#F3E8FF]", lines: ["Stronger", "long-term relationships"] },
];

const CONVERGE = { x: 316, y: 252 };

export function HealthcareCrmEnquiry() {
  return (
    <section id="enquiries" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-44 -top-44 h-[460px] w-[460px] rounded-full bg-[#DDF5F0]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-[#EEF6FF] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-[#F4FBFA] blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto grid max-w-[1300px] gap-14 py-20 lg:py-24 xl:grid-cols-[minmax(0,1fr)_640px] xl:gap-12">
          {/* left: copy + benefits */}
          <div className="flex flex-col">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.26em] text-[#0F9488]">
              From first interaction to lasting relationships
            </p>
            <h2 className="mt-4 max-w-[640px] font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#102A43]">
              Every patient relationship starts somewhere.
            </h2>
            <div className="mt-8 max-w-[560px] text-[17px] leading-[1.6] text-[#102A43]/65">
              <p>
                A website inquiry. A phone call. A referral. A message. A
                consultation request.
              </p>
              <p className="mt-5">
                The first interaction is only the beginning. What happens next
                matters just as much.
              </p>
              <p className="mt-5">
                EVOQ Healthcare CRM brings enquiries, patient information,
                conversations, follow-ups, and relationship history into one
                connected workspace. Your team can see what has happened,
                understand what the patient needs, and know what needs
                attention next.
              </p>
            </div>

            <div className="mt-10 grid gap-6 rounded-[20px] bg-white p-5 shadow-[0_10px_40px_-18px_rgba(16,42,67,0.22)] ring-1 ring-[#102A43]/5 sm:grid-cols-3 sm:divide-x sm:divide-[#102A43]/8 xl:mt-auto xl:max-w-[720px]">
              {BENEFITS.map((b) => (
                <div key={b.lines[0]} className="flex items-center gap-3.5 sm:px-3 sm:first:pl-0">
                  <span className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full ${b.tile}`}>
                    {b.icon}
                  </span>
                  <p className="text-[14px] leading-[1.4] text-[#102A43]/75">
                    {b.lines[0]}
                    <br />
                    {b.lines[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* right: sources -> enquiry card (desktop-fixed 640px canvas) */}
          <div className="relative mx-auto hidden h-[606px] w-[640px] max-w-full md:block xl:mx-0">
            <svg className="pointer-events-none absolute inset-0" width="640" height="260" viewBox="0 0 640 260" fill="none">
              {SOURCES.map((s) => {
                const cx = s.left + s.w / 2;
                const cy = s.top + 108;
                return (
                  <g key={s.label[0]}>
                    <path
                      d={`M${cx} ${cy} C ${cx} ${cy + 55}, ${CONVERGE.x} ${CONVERGE.y - 55}, ${CONVERGE.x} ${CONVERGE.y}`}
                      stroke="#2CB6A5"
                      strokeWidth="1.3"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      opacity="0.75"
                    />
                    <circle cx={cx} cy={cy} r="4.5" fill={s.dot} />
                  </g>
                );
              })}
              <circle cx={CONVERGE.x} cy={CONVERGE.y} r="4.5" fill="#0F9488" />
            </svg>

            {SOURCES.map((s) => (
              <div
                key={s.label[0]}
                className="absolute flex flex-col items-center rounded-[16px] bg-white px-2 pb-3 pt-3 text-center shadow-[0_14px_34px_-16px_rgba(16,42,67,0.28)] ring-1 ring-[#102A43]/5"
                style={{ left: s.left, top: s.top, width: s.w }}
              >
                <span className={`flex h-[54px] w-[54px] items-center justify-center rounded-full ${s.tile}`}>{s.icon}</span>
                <span className="mt-2 text-[12px] font-medium leading-[1.25] text-[#102A43]">
                  {s.label[0]}
                  {s.label[1] && (
                    <>
                      <br />
                      {s.label[1]}
                    </>
                  )}
                </span>
              </div>
            ))}

            {/* Patient enquiry card */}
            <div className="absolute inset-x-0 top-[252px] rounded-[18px] bg-white/95 shadow-[0_28px_60px_-28px_rgba(16,42,67,0.35)] ring-1 ring-[#102A43]/5">
              <div className="flex items-center gap-3 px-5 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDF5F0]">
                  <HeartPulse />
                </span>
                <p className="flex-1 font-[var(--font-display)] text-[17px] font-bold text-[#102A43]">Patient enquiry</p>
                <span className="rounded-lg bg-[#DDF5F0] px-4 py-2 text-[12px] font-semibold text-[#0F766E]">New</span>
              </div>

              <div className="mt-5 grid grid-cols-[250px_1fr] gap-5 px-5 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/healthcare/avatars/sarah.jpg"
                      alt="Sarah Mitchell"
                      width={58}
                      height={58}
                      className="h-[58px] w-[58px] shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-[var(--font-display)] text-[15px] font-bold text-[#102A43]">Sarah Mitchell</p>
                      <p className="truncate text-[12px] text-[#102A43]/60">sarah.mitchell@email.com</p>
                      <p className="text-[12px] text-[#102A43]/60">+1 415 555 0123</p>
                    </div>
                  </div>
                  <dl className="mt-6 flex flex-col gap-3.5 text-[12.5px]">
                    {FIELDS.map((f) => (
                      <div key={f.label} className="grid grid-cols-[92px_1fr]">
                        <dt className="text-[#102A43]/55">{f.label}</dt>
                        <dd className="text-[#102A43]">{f.value}</dd>
                      </div>
                    ))}
                    <div className="grid grid-cols-[92px_1fr] items-center">
                      <dt className="text-[#102A43]/55">Status</dt>
                      <dd>
                        <span className="rounded-md bg-[#DDF5F0] px-3 py-1.5 text-[12px] font-medium text-[#0F766E]">New enquiry</span>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="border-l border-[#102A43]/8 pl-5">
                  <div className="flex gap-6 border-b border-[#102A43]/8 text-[12.5px]">
                    {["Activity", "Notes", "Appointments"].map((t, i) => (
                      <span
                        key={t}
                        className={`pb-2.5 font-medium ${i === 0 ? "border-b-2 border-[#0F766E] text-[#0F766E]" : "text-[#102A43]/55"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ul className="relative mt-5 flex flex-col gap-[18px]">
                    <span className="absolute bottom-4 left-[16px] top-4 w-px bg-[#2CB6A5]/40" />
                    {TIMELINE.map((t) => (
                      <li key={t.title} className="relative flex items-center gap-3">
                        <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${t.tile}`}>{t.icon}</span>
                        <span>
                          <span className="block text-[12.5px] font-semibold text-[#102A43]">{t.title}</span>
                          <span className="block text-[11px] text-[#102A43]/50">{t.time}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
