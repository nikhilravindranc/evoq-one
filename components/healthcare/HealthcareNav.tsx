"use client";

import Link from "next/link";
import { HealthcareLogo } from "./HealthcareLogo";

const MENU = [
  { name: "Overview", href: "#overview", active: true },
  { name: "Patient Relationships", href: "/solutions/healthcare/crm", active: false },
  {
    name: "Practice Management",
    href: "/solutions/healthcare/practice-management",
    active: false,
  },
  { name: "Patient Engagement", href: "#patient-engagement", active: false },
];

export function HealthcareNav() {
  return (
    <div className="border-b border-[#102A43]/8">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto flex max-w-[1300px] items-center gap-6 py-3 pl-2 sm:pl-4 md:pl-6 lg:gap-8 lg:pl-[54px]">
          <Link href="/solutions/healthcare" className="shrink-0 no-underline">
            <HealthcareLogo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Healthcare">
            {MENU.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium no-underline transition-colors ${
                  item.active
                    ? "text-[#31465A]"
                    : "text-[#64748B] hover:bg-[#F1F5F7] hover:text-[#31465A]"
                }`}
              >
                {item.name}
                {item.active && (
                  <span className="absolute inset-x-4 -bottom-[13px] h-[2.5px] rounded-full bg-[#2064B6]" />
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
