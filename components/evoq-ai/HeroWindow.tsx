import Image from "next/image";

const C = {
  interactive: "#4747E0",
  tint: "#BDBDFF",
  light: "#98A2B3",
  aiHighlight: "#ECECFF",
};

type IP = { size?: number; stroke?: string };
const Svg = ({ size = 20, stroke = "#5C5CFF", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const HomeIcon = (p: IP) => (<Svg {...p}><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9h12v-9" /></Svg>);
const LayersIcon = (p: IP) => (<Svg {...p}><path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" /><path d="M2.5 13 12 18l9.5-5M2.5 10.5 12 15.5l9.5-5" /></Svg>);
const GridIcon = (p: IP) => (<Svg {...p}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></Svg>);
const ChartIcon = (p: IP) => (<Svg {...p}><path d="M4 20V10M12 20V4M20 20v-7" /></Svg>);
const GearIcon = (p: IP) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 13.5a1.8 1.8 0 0 0 .36 1.98l.06.06a2.2 2.2 0 1 1-3.1 3.1l-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V20a2.2 2.2 0 1 1-4.4 0v-.1a1.8 1.8 0 0 0-1.17-1.65 1.8 1.8 0 0 0-1.98.36l-.06.06a2.2 2.2 0 1 1-3.1-3.1l.06-.06a1.8 1.8 0 0 0 .36-1.98 1.8 1.8 0 0 0-1.65-1.1H2.5a2.2 2.2 0 1 1 0-4.4h.1a1.8 1.8 0 0 0 1.65-1.17 1.8 1.8 0 0 0-.36-1.98l-.06-.06a2.2 2.2 0 1 1 3.1-3.1l.06.06a1.8 1.8 0 0 0 1.98.36H9a1.8 1.8 0 0 0 1.1-1.65V2.5a2.2 2.2 0 1 1 4.4 0v.1a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.06-.06a2.2 2.2 0 1 1 3.1 3.1l-.06.06a1.8 1.8 0 0 0-.36 1.98V9a1.8 1.8 0 0 0 1.65 1.1h.1a2.2 2.2 0 1 1 0 4.4h-.1a1.8 1.8 0 0 0-1.65 1.1Z" />
  </Svg>
);
const PaperclipIcon = (p: IP) => (<Svg {...p}><path d="M8 13.5 15.5 6a3 3 0 0 1 4.24 4.24L11 18.9a4.5 4.5 0 0 1-6.36-6.36L13 4.2" /></Svg>);
const AtIcon = (p: IP) => (<Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-4 7.5" /></Svg>);
const GlobeIcon = (p: IP) => (<Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Svg>);
const SendIcon = (p: IP) => (<Svg {...p}><path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" /></Svg>);
const SearchIcon = (p: IP) => (<Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Svg>);
const DocIcon = (p: IP) => (<Svg {...p}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5M9 13h6M9 17h6" /></Svg>);
const PlayIcon = (p: IP) => (<Svg {...p}><path d="M7 4.5v15l13-7.5L7 4.5Z" /></Svg>);

const HERO_SIDEBAR_NAV = [
  { icon: HomeIcon, active: true },
  { icon: LayersIcon },
  { icon: GridIcon },
  { icon: ChartIcon },
  { icon: GearIcon },
];

const HERO_SUGGESTIONS = [
  { icon: SearchIcon, label: "Find information" },
  { icon: DocIcon, label: "Summarize activity" },
  { icon: PlayIcon, label: "Prepare work" },
];

/* the "How can I help you today?" EVOQ AI window (shared by /evoq-ai hero and the home page) */
export function HeroWindow() {
  return (
    <div className="relative z-10 flex items-stretch">
      <aside
        className="hidden w-[100px] shrink-0 flex-col items-center gap-3 rounded-[20px] bg-white py-6 sm:flex"
        style={{ margin: "-18px -30px -18px 0", position: "relative", zIndex: 2, boxShadow: "0 24px 48px -16px rgba(10,0,80,0.45)" }}
      >
        <Image src="/symbol-color.png" alt="EVOQ" width={225} height={230} priority className="mb-3 h-[38px] w-auto" />
        {HERO_SIDEBAR_NAV.map((n, i) => (
          <span
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-[12px]"
            style={n.active ? { background: C.aiHighlight } : {}}
          >
            <n.icon size={22} stroke={n.active ? C.interactive : "#1F2430"} />
          </span>
        ))}
      </aside>

      <div
        className="relative flex min-h-[330px] flex-1 flex-col items-center justify-center rounded-[22px] bg-white px-5 pb-14 pt-24 sm:py-16 sm:pl-[60px] sm:pr-8"
        style={{ boxShadow: "0 30px 70px -20px rgba(10,0,80,0.45)" }}
      >
        <Image
          src="/healthcare/avatars/priya.jpg"
          alt="Profile"
          width={46}
          height={46}
          className="absolute right-5 top-5 h-[46px] w-[46px] rounded-full object-cover"
          style={{ boxShadow: "0 0 0 3px #fff, 0 8px 20px rgba(92,92,255,0.4)" }}
        />

        <h3 className="text-center font-[var(--font-display)] text-[22px] font-bold sm:text-[26px]" style={{ color: "#0B1220" }}>
          How can I help you today?
        </h3>

        <div className="mt-7 w-full max-w-[540px] rounded-[16px] bg-white p-4" style={{ border: `1.5px solid ${C.tint}`, boxShadow: "0 10px 30px -14px rgba(92,92,255,0.35)" }}>
          <p className="text-[14px]" style={{ color: C.light }}>Ask a question or describe what you need…</p>
          <div className="mt-5 flex items-center gap-4">
            <PaperclipIcon size={17} stroke={C.interactive} />
            <AtIcon size={17} stroke={C.interactive} />
            <GlobeIcon size={17} stroke={C.interactive} />
            <span className="ml-auto flex h-8 w-8 items-center justify-center">
              <SendIcon size={19} stroke={C.interactive} />
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {HERO_SUGGESTIONS.map((s) => (
            <span
              key={s.label}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[12.5px] font-semibold"
              style={{ color: "#0B1220", boxShadow: "0 8px 22px -10px rgba(92,92,255,0.35)", border: `1px solid ${C.aiHighlight}` }}
            >
              <s.icon size={15} stroke={C.interactive} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
