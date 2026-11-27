const STEPS = ["Enquiry", "Conversation", "Follow up", "Referral", "Return visit"];

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function HcCrmCTA() {
  return (
    <section id="expert" className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#F1FBFC] to-[#E0F5F9]">
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#C6EEF4]/70 blur-3xl" />
      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#0FA3BC]">Talk to the EVOQ team</p>
              <h2 className="mt-5 max-w-[680px] font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#102A43]">
                Start with how your practice handles enquiries today.
              </h2>
              <p className="mt-6 max-w-[620px] text-[16px] leading-[1.6] text-[#31465A]/75">
                Show us how enquiries, follow ups and patient history are handled today, and we will show where
                EVOQ CRM fits.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#"
                  data-enquiry=""
                  className="inline-flex items-center gap-3 rounded-full bg-[#2064B6] px-6 py-3.5 text-[14.5px] font-semibold text-white no-underline shadow-[0_14px_30px_-14px_rgba(32,100,182,0.6)] transition-all hover:-translate-y-px hover:bg-[#1A559C]"
                >
                  Talk to an expert
                  <ArrowRight />
                </a>
                <a
                  href="/solutions/healthcare"
                  className="inline-flex items-center gap-3 rounded-full border border-[#2064B6] bg-white/70 px-6 py-3.5 text-[14.5px] font-semibold text-[#2064B6] no-underline transition-all hover:-translate-y-px hover:bg-white"
                >
                  Explore healthcare solutions
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* relationship timeline */}
            <ol className="relative mx-auto hidden w-full max-w-[320px] flex-col gap-3 lg:flex">
              <span className="absolute bottom-6 left-[26px] top-6 w-px bg-[#2064B6]/20" />
              {STEPS.map((s, i) => (
                <li key={s} className="relative flex items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_30px_-22px_rgba(16,42,67,0.35)] ring-1 ring-[#31465A]/8">
                  <span className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#2064B6] text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[14.5px] font-semibold text-[#102A43]">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
