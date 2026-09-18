"use client";

import Link from "next/link";
import { HealthcareLogo } from "./HealthcareLogo";

const MENU = [
  { name: "Overview", href: "#overview", active: true },
  { name: "Healthcare CRM", href: "#healthcare-crm", active: false },
  {
    name: "Healthcare Practice Management",
    href: "#practice-management",
    active: false,
  },
  { name: "Patient Engagement", href: "#patient-engagement", active: false },
];

export function HealthcareNav() {
  return (
    <div className="border-b border-[#102A43]/8 bg-white/90 backdrop-blur-lg">
      <div className="px-5 sm:px-8 lg:px-20">
        <div className="mx-auto flex max-w-[1168px] items-center justify-between py-3">
        <Link href="/healthcare" className="no-underline">
          <HealthcareLogo />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Healthcare"
        >
          {MENU.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`relative rounded-full px-4 py-2.5 text-sm font-medium no-underline transition-colors ${
                item.active
                  ? "text-[#102A43]"
                  : "text-[#102A43]/60 hover:bg-[#F4FBFA] hover:text-[#102A43]"
              }`}
            >
              {item.name}
              {item.active && (
                <span className="absolute inset-x-4 -bottom-[13px] h-[2.5px] rounded-full bg-[#0F766E]" />
              )}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="hidden cursor-pointer items-center gap-2 rounded-full border border-[#102A43]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#102A43] transition-all hover:-translate-y-px hover:border-[#0F766E]/40 hover:text-[#0F766E] sm:inline-flex"
        >
          Talk to an expert
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        </div>
      </div>
    </div>
  );
}
