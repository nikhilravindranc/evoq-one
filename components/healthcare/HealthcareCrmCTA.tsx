const STEPS = ["Enquiry", "Conversation", "Follow-up", "Referral", "Return visit"];

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function HealthcareCrmCTA() {
  return (
    <section id="expert" className="isolate bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] pb-16 pt-6 lg:pb-24">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#123B5E] via-[#2064B6] to-[#18B8D1] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -right-4 top-6 h-[260px] w-[260px] rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <h2 className="max-w-[680px] font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
                  One patient relationship. Every interaction in context.
                </h2>
                <div className="mt-6 max-w-[620px] text-[16px] leading-[1.6] text-white/80">
                  <p>
                    The patient journey does not end with an appointment. Every enquiry, conversation, follow-up,
                    referral, and return visit contributes to the relationship.
                  </p>
                  <p className="mt-4">
                    EVOQ Healthcare CRM helps your team keep those interactions connected, so every patient
                    conversation starts with context and every follow-up has a clear next step.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#features"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-[14.5px] font-semibold text-[#2064B6] no-underline shadow-[0_14px_30px_-14px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-px hover:bg-[#F1F7FD]"
                  >
                    Explore healthcare CRM features
                    <ArrowRight />
                  </a>
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-3 rounded-full border border-white/50 px-5 py-3.5 text-[14.5px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-white/10"
                  >
                    Explore pricing
                    <ArrowRight />
                  </a>
                  <a
                    href="#expert"
                    className="inline-flex items-center gap-3 rounded-full border border-white/50 px-5 py-3.5 text-[14.5px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-white/10"
                  >
                    Talk to an expert
                    <ArrowRight />
                  </a>
                </div>
              </div>

              {/* relationship timeline */}
              <ol className="relative mx-auto hidden w-full max-w-[320px] flex-col gap-3 lg:flex">
                <span className="absolute bottom-6 left-[26px] top-6 w-px bg-white/30" />
                {STEPS.map((s, i) => (
                  <li key={s} className="relative flex items-center gap-4 rounded-2xl bg-white/12 px-4 py-3 ring-1 ring-white/20 backdrop-blur">
                    <span className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#2064B6]">
                      {i + 1}
                    </span>
                    <span className="text-[14.5px] font-semibold text-white">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
