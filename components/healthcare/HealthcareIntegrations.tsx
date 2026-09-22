import Link from "next/link";

/* ---------- inline icons ---------- */

type IconProps = { stroke?: string; size?: number };

const mk = (stroke: string, size: number) =>
  ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }) as const;

const MeetIcon = ({ stroke = "#00AC47", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="2" y="6" width="13" height="12" rx="2" />
    <path d="m15 10 6-3.5v11L15 14z" />
  </svg>
);

const StripeIcon = ({ stroke = "#635BFF", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <path d="M2 10h20" />
    <path d="M6 15h4" />
  </svg>
);

const WhatsAppIcon = ({ stroke = "#25D366", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M21 12a9 9 0 1 1-4-7.5" />
    <path d="M21 3v6h-6" />
    <path d="M8.5 10c.3 2.8 2.7 5.2 5.5 5.5" strokeLinecap="round" />
  </svg>
);

const AnalyticsIcon = ({ stroke = "#E37400", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

const CalendarIcon = ({ stroke = "#1A73E8", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const WooCommerceIcon = ({ stroke = "#7F54B3", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="2" y="6" width="20" height="14" rx="3" />
    <path d="M7 6V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" />
    <path d="M7 12c.7 1.3 1.5 2 2.5 2s1.4-1 1.5-2c.1 1 .6 2 1.5 2s1.8-.7 2.5-2" />
  </svg>
);

const ShopifyIcon = ({ stroke = "#95BF47", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M7 6V5a3 3 0 0 1 6 0v1" />
    <path d="M6 6h11l1 14H5z" />
    <path d="M10 11a2 2 0 0 0 4 0" />
  </svg>
);

const PlusIcon = ({ stroke = "#18B8D1", size = 18 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const HeartPulseIcon = ({ stroke = "#18B8D1", size = 18 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5" />
    <path d="M3.5 12h3l1.5-2.5 2 5 2-6.5 1.5 2h3" />
    <path d="M12 21c-2-1.2-4-2.8-5.5-4.5M12 21c2-1.2 4-2.8 5.5-4.5" />
  </svg>
);

const ArrowRight = ({ stroke = "currentColor" }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- data ---------- */

type Tile = {
  icon: React.ReactNode;
  name: string;
  bg: string;
  pos: string;
  rot: string;
};

const TILES: Tile[] = [
  { icon: <CalendarIcon />, name: "Google Calendar", bg: "bg-[#E8F1FA]", pos: "left-[4%] top-[52%]", rot: "-rotate-3" },
  { icon: <MeetIcon />, name: "Google Meet", bg: "bg-[#E7F7F5]", pos: "left-[34%] top-[56%]", rot: "rotate-2" },
  { icon: <StripeIcon />, name: "Stripe", bg: "bg-[#EDECFE]", pos: "left-[62%] top-[50%]", rot: "-rotate-2" },
  { icon: <WhatsAppIcon />, name: "WhatsApp", bg: "bg-[#E3F8EA]", pos: "left-[12%] top-[12%]", rot: "rotate-3" },
  { icon: <AnalyticsIcon />, name: "Analytics", bg: "bg-[#FDF0DE]", pos: "left-[46%] top-[6%]", rot: "-rotate-3" },
  { icon: <WooCommerceIcon />, name: "WooCommerce", bg: "bg-[#F0EAFA]", pos: "left-[76%] top-[22%]", rot: "rotate-2" },
  { icon: <ShopifyIcon />, name: "Shopify", bg: "bg-[#EEF6E4]", pos: "left-[80%] top-[56%]", rot: "rotate-3" },
];

const GRID_TILES = [
  { icon: <CalendarIcon />, name: "Google Calendar", bg: "bg-[#E8F1FA]" },
  { icon: <MeetIcon />, name: "Google Meet", bg: "bg-[#E7F7F5]" },
  { icon: <StripeIcon />, name: "Stripe", bg: "bg-[#EDECFE]" },
  { icon: <WhatsAppIcon />, name: "WhatsApp", bg: "bg-[#E3F8EA]" },
  { icon: <AnalyticsIcon />, name: "Analytics", bg: "bg-[#FDF0DE]" },
  { icon: <WooCommerceIcon />, name: "WooCommerce", bg: "bg-[#F0EAFA]" },
  { icon: <ShopifyIcon />, name: "Shopify", bg: "bg-[#EEF6E4]" },
];

/* ---------- section ---------- */

export function HealthcareIntegrations() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* diluted signature gradient environment */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(32,100,182,0.08), rgba(24,184,209,0.12), rgba(109,204,195,0.16))",
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#18B8D1]/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#6DCCC3]/20 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
          {/* copy */}
          <div className="max-w-[520px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#18B8D1]">
              Integrations
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A]">
              Connect the tools your team already uses.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.7] text-[#64748B]">
              EVOQ Healthcare works alongside the apps your organization
              already relies on, so nothing needs to change overnight.
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-[#64748B]">
              Sync appointments with Google Calendar, run virtual
              consultations over Google Meet, collect payments through
              Stripe, message patients on WhatsApp, track engagement with
              Analytics, and connect your WooCommerce or Shopify store for
              retail and wellness products.
            </p>
            <Link
              href="/integrations"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#2064B6] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#185596]"
            >
              Explore all integrations
              <ArrowRight />
            </Link>
          </div>

          {/* floating tiles — lg */}
          <div className="relative hidden h-[460px] lg:block">
            {/* dotted connector grid */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
              <path d="M120 300 H 560 M 320 340 V 120 M 460 320 V 60 M 200 120 V 280 M 640 160 V 280" stroke="#18B8D1" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 7" />
              <circle cx="320" cy="220" r="3.5" fill="#18B8D1" />
              <circle cx="460" cy="180" r="3.5" fill="#6DCCC3" />
              <circle cx="200" cy="200" r="3.5" fill="#2064B6" />
              <circle cx="640" cy="220" r="3.5" fill="#2064B6" />
            </svg>

            {TILES.map((t) => (
              <div
                key={t.name}
                className={`absolute ${t.pos} ${t.rot} flex flex-col items-center gap-2 rounded-2xl border border-[#E2E8EC] bg-white px-4 py-3.5 shadow-[0_18px_45px_-12px_rgba(49,70,90,0.18)]`}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${t.bg}`}>
                  {t.icon}
                </span>
                <span className="max-w-[92px] text-center text-[11.5px] font-bold leading-tight text-[#31465A]">
                  {t.name}
                </span>
              </div>
            ))}

            {/* add-more tile */}
            <div className="absolute left-[30%] top-[30%] flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#18B8D1]/50 bg-white/80 px-4 py-3.5 backdrop-blur-sm">
              <PlusIcon />
              <span className="max-w-[110px] text-center text-[11.5px] font-semibold leading-tight text-[#64748B]">
                More integrations
              </span>
            </div>

            {/* base bar */}
            <div className="absolute bottom-0 left-1/2 flex w-[320px] -translate-x-1/2 items-center justify-center gap-2.5 rounded-2xl border border-[#E2E8EC] bg-white px-6 py-3.5 shadow-[0_20px_50px_-12px_rgba(49,70,90,0.2)]">
              <HeartPulseIcon />
              <span className="text-[15px] font-bold text-[#31465A]">Healthcare</span>
            </div>
          </div>

          {/* wrapping grid — smaller screens */}
          <div className="flex flex-wrap justify-center gap-3 lg:hidden">
            {GRID_TILES.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2.5 rounded-2xl border border-[#E2E8EC] bg-white px-4 py-3 shadow-[0_12px_30px_-10px_rgba(49,70,90,0.15)]"
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${t.bg}`}>
                  {t.icon}
                </span>
                <span className="text-[12.5px] font-bold text-[#31465A]">{t.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 rounded-2xl border border-dashed border-[#18B8D1]/50 bg-white/80 px-4 py-3">
              <PlusIcon />
              <span className="text-[12.5px] font-semibold text-[#64748B]">More integrations</span>
            </div>
            <div className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-[#E2E8EC] bg-white px-6 py-3">
              <HeartPulseIcon />
              <span className="text-[14px] font-bold text-[#31465A]">Healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
