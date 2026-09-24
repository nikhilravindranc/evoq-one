"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DESTINATIONS = [
  { key: "solutions", name: "Healthcare Solutions", sub: "Overview", href: "/healthcare" },
  { key: "crm", name: "Healthcare CRM", sub: "Patient relationships", href: "/healthcare/crm" },
  { key: "pm", name: "Healthcare Practice Management", sub: "Practice operations", href: "/healthcare/practice-management" },
] as const;

type DestKey = (typeof DESTINATIONS)[number]["key"];

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

export function HealthcareSwitcher({ current, accent = "#2064B6" }: { current: DestKey; accent?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[#31465A]/12 bg-white px-3.5 py-2 text-[13px] font-semibold text-[#31465A]/75 transition-colors hover:bg-[#F1F5F7] hover:text-[#31465A]"
        aria-expanded={open}
      >
        <span style={{ color: accent }}>
          <GridIcon />
        </span>
        Healthcare
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[300px] rounded-[18px] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(16,42,67,0.3)] ring-1 ring-[#31465A]/8">
          <p className="px-3.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#94A3B0]">
            Healthcare products
          </p>
          {DESTINATIONS.map((d) => {
            const active = d.key === current;
            return (
              <Link
                key={d.key}
                href={d.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-3 rounded-[12px] px-3.5 py-3 no-underline transition-colors ${
                  active ? "bg-[#F1F5F7]" : "hover:bg-[#F8FAFB]"
                }`}
              >
                <span>
                  <span className="block text-[13.5px] font-bold leading-tight text-[#102A43]">{d.name}</span>
                  <span className="mt-0.5 block text-[12px] leading-tight text-[#64748B]">{d.sub}</span>
                </span>
                {active && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: accent }}>
                    <CheckIcon />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
