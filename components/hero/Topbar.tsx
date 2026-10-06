"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Chevron, EvoqMonogram } from "./icons";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { useRegion } from "@/components/shared/RegionContext";
import { AIMark, AIBadge } from "@/components/ai/AIMark";

type ProductIconProps = { size?: number };

const ProductSvg = ({ size = 17, children }: ProductIconProps & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const UsersGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 19c.8-3.2 2.9-4.7 6.5-4.7s5.7 1.5 6.5 4.7" />
    <path d="M15.5 4.3c1.4.5 2.4 1.8 2.4 3.3s-1 2.8-2.4 3.3M18.5 19c-.4-2.1-1.5-3.5-3-4.2" />
  </ProductSvg>
);
const TrendGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 6h6v6" />
  </ProductSvg>
);
const LeafGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="M4 20c8 0 14-6 14-15C9 5 4 11 4 20z" />
    <path d="M4 20c3-5 6-8 12-11" />
  </ProductSvg>
);
const GrapeGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="M12 3v3" />
    <circle cx="9" cy="9" r="2" />
    <circle cx="15" cy="9" r="2" />
    <circle cx="7" cy="14" r="2" />
    <circle cx="12" cy="14" r="2" />
    <circle cx="17" cy="14" r="2" />
    <circle cx="9.5" cy="19" r="2" />
    <circle cx="14.5" cy="19" r="2" />
  </ProductSvg>
);
const WrenchGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5V21h3.5l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.2-2.2z" />
  </ProductSvg>
);
const RocketGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="M14.5 3c2 1 4.5 4 3.9 8.4-2 .3-4-.3-5.5-1.8-1.5-1.5-2.1-3.5-1.8-5.5C12.9 3.1 13.7 3 14.5 3z" />
    <path d="M11 13 5.5 18.5M9.5 15.5 5 17M8.5 14.5 7 10" />
    <path d="M16.5 12.5c1 2 .7 4.7-.5 6.5-1.8-.3-3.5-1.3-4.5-2.8" />
  </ProductSvg>
);
const ChatGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4A8.4 8.4 0 0 1 4 11.9 8.4 8.4 0 0 1 12.6 3.5 8.4 8.4 0 0 1 21 11.5z" />
    <path d="M8 11h8M8 14.5h5" />
  </ProductSvg>
);
const CardGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19" />
  </ProductSvg>
);
const BoxGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="m3.5 8 8.5-5 8.5 5-8.5 5-8.5-5z" />
    <path d="M3.5 8v8l8.5 5 8.5-5V8M12 13v8" />
  </ProductSvg>
);
const SyncGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <circle cx="12" cy="18" r="2.4" />
    <path d="M8 7.2 16 7.2M7.5 8.2 11 16M16.5 8.2 13 16" />
  </ProductSvg>
);
const SparklesGlyph = (p: ProductIconProps) => (
  <ProductSvg {...p}>
    <path d="M12 3l1.7 4.6L18 9l-4.3 1.6L12 15l-1.7-4.4L6 9l4.3-1.4z" />
    <path d="M19 15l.8 1.9L21.5 17.5l-1.7.7L19 20l-.8-1.8-1.7-.7 1.7-.6z" />
  </ProductSvg>
);
const PRODUCT_GROUPS: {
  title: string;
  items: { name: string; sub: string; icon: (p: ProductIconProps) => React.ReactElement; tile: string; href?: string }[];
}[] = [
  {
    title: "Growth",
    items: [
      { name: "CRM", sub: "Sales & customer relationships", icon: UsersGlyph, tile: "bg-[#4747E0]" },
      { name: "Campaigns", sub: "Plan and launch marketing", icon: TrendGlyph, tile: "bg-[#7C3AED]" },
    ],
  },
  {
    title: "People",
    items: [
      { name: "HRMS", sub: "Core HR & workforce data", icon: LeafGlyph, tile: "bg-[#0F9D74]" },
      { name: "Skillberry", sub: "Learning & talent development", icon: GrapeGlyph, tile: "bg-[#C2477F]" },
    ],
  },
  {
    title: "AI",
    items: [
      { name: "AI", sub: "Assistants · Agents", icon: AIMark, tile: "bg-[#F2F2FF]", href: "/ai" },
    ],
  },
  {
    title: "Operations",
    items: [
      { name: "ServiceOps", sub: "Field service & operations", icon: WrenchGlyph, tile: "bg-[#E8792C]" },
      { name: "Projects", sub: "Plan and run work end-to-end", icon: RocketGlyph, tile: "bg-[#7C3AED]" },
      { name: "Desk", sub: "Support tickets & helpdesk", icon: ChatGlyph, tile: "bg-[#0FA3BC]" },
    ],
  },
  {
    title: "Finance",
    items: [
      { name: "Billing", sub: "Invoicing & revenue", icon: CardGlyph, tile: "bg-[#4747E0]", href: "/billing" },
      { name: "Inventory", sub: "Stock & supply tracking", icon: BoxGlyph, tile: "bg-[#C2477F]" },
    ],
  },
  {
    title: "Platform",
    items: [{ name: "Sync", sub: "Unify data across systems", icon: SyncGlyph, tile: "bg-[#0F9D74]" }],
  },
];

const SOLUTIONS: {
  name: string;
  sub: string;
  href: string;
  children?: { name: string; href: string }[];
}[] = [
  {
    name: "Healthcare",
    sub: "Connected care workflows",
    href: "/healthcare",
    children: [
      { name: "Healthcare CRM", href: "/healthcare/crm" },
      { name: "Healthcare Practice Management", href: "/healthcare/practice-management" },
    ],
  },
  {
    name: "Manufacturing",
    sub: "From enquiry to the field",
    href: "/manufacturing",
  },
];

const HealthcareMark = () => (
  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#E7F7F5]">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18B8D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5" />
      <path d="M3.5 12h3l1.5-2.5 2 5 2-6.5 1.5 2h3" />
      <path d="M12 21c-2-1.2-4-2.8-5.5-4.5M12 21c2-1.2 4-2.8 5.5-4.5" />
    </svg>
  </span>
);

const ManufacturingMark = () => (
  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#F1F5F9]">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  </span>
);

export function Topbar({ darkCTA = true, constrained = false, light = false, ctaColor }: { darkCTA?: boolean; constrained?: boolean; light?: boolean; ctaColor?: string }) {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const { region, setRegion } = useRegion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  useEffect(() => {
    setSubOpen(solutionsOpen);
  }, [solutionsOpen]);

  useEffect(() => {
    if (!solutionsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node))
        setSolutionsOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSolutionsOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [solutionsOpen]);

  useEffect(() => {
    if (!regionOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (regionRef.current && !regionRef.current.contains(e.target as Node))
        setRegionOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRegionOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [regionOpen]);

  return (
    <header className="relative z-50">
      <div className={
        constrained
          ? "px-5 sm:px-[40px] lg:px-[60px]"
          : "px-5 sm:px-6 lg:px-6"
      }>
      <div className={`flex items-center justify-between py-5 lg:py-7 ${
        constrained ? "max-w-[1200px] mx-auto" : "max-w-[1300px] mx-auto"
      }`}>
      {/* Brand */}
      <Link href="/" className="inline-flex items-center no-underline">
        <Image
          id="hero-topbar-logo"
          src={light ? "/black-logo.png" : "/white-logo.png"}
          alt="EVOQ"
          height={28}
          width={28 * (1127 / 230)}
          priority
          className={light ? undefined : "evoq-logo-glow"}
          style={{ height: 28, width: "auto" }}
        />
      </Link>

      {/* Nav pill */}
      <nav
        className={`flex items-center gap-1 rounded-full px-1.5 py-1.5 text-sm font-medium backdrop-blur-lg ${
          light
            ? "border border-[#E6EAF0] bg-white/80 text-[#1F2430]/90"
            : "border border-white/20 bg-white/14 text-white/90"
        }`}
        aria-label="Primary"
        style={{ backdropFilter: "blur(18px) saturate(140%)" }}
      >
        {/* Products with dropdown */}
        <div className="relative" ref={wrapRef}>
          <button
            type="button"
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-transparent px-4 py-2.5 font-[inherit] text-sm font-medium transition-colors ${
              light
                ? `text-[#1F2430]/80 hover:bg-[#F2F2FF] hover:text-[#1F2430] ${open ? "bg-[#F2F2FF] text-[#4747E0]" : ""}`
                : `text-white/88 hover:bg-white/8 hover:text-white ${open ? "bg-[#4747E0] text-white shadow-[0_4px_14px_-4px_rgba(0,0,153,0.5)]" : ""}`
            }`}
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open && (
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#BDBDFF]" />
            )}
            <span>Products</span>
            <span
              className="inline-flex transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <Chevron />
            </span>
          </button>

          {open && (
            <div
              role="menu"
              className="absolute left-1/2 top-[calc(100%+14px)] w-[880px] max-w-[92vw] -translate-x-1/2 rounded-[24px] bg-white p-6 text-[#1F2430] shadow-[0_30px_60px_-20px_rgba(31,36,48,0.45),0_2px_6px_rgba(31,36,48,0.08),inset_0_0_0_1px_rgba(31,36,48,0.04)]"
              style={{ animation: "menuIn 0.15s ease forwards" }}
            >
              <style>{`
                @keyframes menuIn {
                  from { opacity: 0; transform: translateY(-6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              {/* Caret */}
              <div className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-sm bg-white shadow-[-1px_-1px_0_rgba(31,36,48,0.04)]" />

              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {PRODUCT_GROUPS.map((group, i) => (
                  <div key={group.title} className={i >= 3 ? "border-t border-[#EEF0F5] pt-6" : ""}>
                    <p className="px-2.5 pb-2 text-[13px] font-bold text-[#1F2430]">{group.title}</p>
                    <ul className="flex flex-col gap-0.5 p-0 list-none m-0">
                      {group.items.map((p) => (
                        <li key={p.name} role="menuitem">
                          <Link
                            href={p.href ?? "#"}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-3 rounded-xl p-2.5 no-underline text-[#1F2430] transition-colors hover:bg-[#F2F2FF]"
                          >
                            {p.name === "AI" ? (
                              <AIBadge size={34} />
                            ) : (
                              <span className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] ${p.tile}`}>
                                <p.icon size={17} />
                              </span>
                            )}
                            <span className="flex flex-1 flex-col leading-tight">
                              <span className="text-[14px] font-semibold text-[#1F2430]">{p.name}</span>
                              <span className="mt-px whitespace-nowrap text-[12px] font-normal text-[#5F6B7A]">{p.sub}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Solutions with dropdown */}
        <div className="relative" ref={solutionsRef}>
          <button
            type="button"
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-transparent px-4 py-2.5 font-[inherit] text-sm font-medium transition-colors ${
              light
                ? `text-[#1F2430]/80 hover:bg-[#F2F2FF] hover:text-[#1F2430] ${solutionsOpen ? "bg-[#F2F2FF] text-[#4747E0]" : ""}`
                : `text-white/88 hover:bg-white/8 hover:text-white ${solutionsOpen ? "bg-[#4747E0] text-white shadow-[0_4px_14px_-4px_rgba(0,0,153,0.5)]" : ""}`
            }`}
            aria-expanded={solutionsOpen}
            aria-haspopup="menu"
            onClick={() => setSolutionsOpen((o) => !o)}
          >
            {solutionsOpen && (
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#BDBDFF]" />
            )}
            <span>Solutions</span>
            <span
              className="inline-flex transition-transform duration-200"
              style={{ transform: solutionsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <Chevron />
            </span>
          </button>

          {solutionsOpen && (
            <div
              role="menu"
              className="absolute left-1/2 top-[calc(100%+14px)] w-[360px] -translate-x-1/2 rounded-[22px] bg-white p-3.5 text-[#1F2430] shadow-[0_30px_60px_-20px_rgba(31,36,48,0.45),0_2px_6px_rgba(31,36,48,0.08),inset_0_0_0_1px_rgba(31,36,48,0.04)]"
              style={{ animation: "menuIn 0.15s ease forwards" }}
            >
              <style>{`
                @keyframes menuIn {
                  from { opacity: 0; transform: translateY(-6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              {/* Caret */}
              <div className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-sm bg-white shadow-[-1px_-1px_0_rgba(31,36,48,0.04)]" />

              <div className="px-2.5 pb-2.5 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5F6B7A]">
                Industry Solutions
              </div>

              <ul className="flex flex-col gap-0.5 p-0 list-none m-0">
                {SOLUTIONS.map((s) => (
                  <li key={s.name} role="menuitem" onMouseEnter={() => s.children && setSubOpen(true)}>
                    <div className="flex items-center">
                      <Link
                        href={s.href}
                        onClick={() => setSolutionsOpen(false)}
                        className="group flex flex-1 items-center gap-3 rounded-xl p-2.5 no-underline text-[#1F2430] transition-colors hover:bg-[#F2F2FF]"
                      >
                        {s.name === "Healthcare" ? (
                          <HealthcareMark />
                        ) : s.name === "Manufacturing" ? (
                          <ManufacturingMark />
                        ) : (
                          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-content-center rounded-[9px] bg-[#F2F2FF] p-[6px]">
                            <EvoqMonogram color="#000099" />
                          </span>
                        )}
                        <span className="flex flex-1 flex-col leading-tight">
                          <span className="text-[14px] font-semibold text-[#1F2430]">{s.name}</span>
                          <span className="mt-px text-[12px] font-normal text-[#5F6B7A]">{s.sub}</span>
                        </span>
                        {!s.children && (
                          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#4747E0] text-white opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                            <ArrowRight size={12} />
                          </span>
                        )}
                      </Link>
                      {s.children && (
                        <button
                          type="button"
                          aria-label={`${subOpen ? "Collapse" : "Expand"} ${s.name}`}
                          aria-expanded={subOpen}
                          onClick={() => setSubOpen((o) => !o)}
                          className="ml-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[#5F6B7A] transition-colors hover:bg-[#F2F2FF]"
                        >
                          <span className="inline-flex transition-transform duration-200" style={{ transform: subOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <Chevron />
                          </span>
                        </button>
                      )}
                    </div>
                    {s.children && subOpen && (
                      <ul className="m-0 mb-1 ml-[27px] mt-0.5 flex list-none flex-col gap-0.5 border-l border-[#E3E6F0] p-0 pl-3">
                        {s.children.map((c) => (
                          <li key={c.name}>
                            <Link
                              href={c.href}
                              onClick={() => setSolutionsOpen(false)}
                              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-[#1F2430] no-underline transition-colors hover:bg-[#F2F2FF]"
                            >
                              <span className="flex-1">{c.name}</span>
                              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#4747E0] text-white opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                <ArrowRight size={12} />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Link
          href="/why-evoq"
          className={`inline-flex cursor-pointer rounded-full px-4 py-2.5 no-underline transition-colors ${light ? "text-[#1F2430]/80 hover:bg-[#F2F2FF] hover:text-[#1F2430]" : "text-white/88 hover:bg-white/8 hover:text-white"}`}
        >
          Why EVOQ?
        </Link>
      </nav>

      {/* Log in + Region + CTA */}
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className={`inline-flex cursor-pointer text-sm font-semibold no-underline transition-colors ${
            light ? "text-[#1F2430]/80 hover:text-[#1F2430]" : "text-white/88 hover:text-white"
          }`}
        >
          Log in
        </Link>

        {/* Region selector */}
        <div className="relative" ref={regionRef}>
          <button
            type="button"
            onClick={() => setRegionOpen(!regionOpen)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
              light
                ? "text-[#1F2430]/80 hover:bg-[#F2F2FF] hover:text-[#1F2430]"
                : "text-white/88 hover:bg-white/8 hover:text-white"
            }`}
            aria-expanded={regionOpen}
            aria-haspopup="menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
            <span>{region}</span>
          </button>

          {regionOpen && (
            <div
              role="menu"
              className={`absolute right-0 top-[calc(100%+8px)] w-[160px] rounded-[16px] p-2 shadow-[0_30px_60px_-20px_rgba(31,36,48,0.45),0_2px_6px_rgba(31,36,48,0.08),inset_0_0_0_1px_rgba(31,36,48,0.04)] ${
                light ? "bg-white text-[#1F2430]" : "bg-white text-[#1F2430]"
              }`}
              style={{ animation: "menuIn 0.15s ease forwards" }}
            >
              <style>{`
                @keyframes menuIn {
                  from { opacity: 0; transform: translateY(-6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <button
                role="menuitem"
                onClick={() => {
                  setRegion("India");
                  setRegionOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-[#F2F2FF] transition-colors"
              >
                India
              </button>
              <button
                role="menuitem"
                onClick={() => {
                  setRegion("USA");
                  setRegionOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-[#F2F2FF] transition-colors"
              >
                USA
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowGetStarted(true)}
          style={ctaColor ? { background: ctaColor } : undefined}
          className={`inline-flex cursor-pointer items-center gap-3 rounded-full border-0 py-3 pl-[22px] pr-3.5 text-sm font-semibold transition-all hover:-translate-y-px ${
            ctaColor
              ? "text-white shadow-[0_10px_30px_-12px_rgba(31,36,48,0.4)] hover:brightness-95"
              : darkCTA
              ? "bg-[#4747E0] text-white shadow-[0_10px_30px_-10px_rgba(0,0,153,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-[#3333CC]"
              : "bg-white text-[#4747E0] shadow-[0_10px_30px_-12px_rgba(31,36,48,0.4)]"
          }`}
        >
          <span>Get Started</span>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/18">
            <ArrowRight color="currentColor" />
          </span>
        </button>
      </div>
      </div>
      </div>
      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </header>
  );
}
