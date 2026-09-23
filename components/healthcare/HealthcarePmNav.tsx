import Link from "next/link";
import { HealthcareLogo } from "./HealthcareLogo";
import { HealthcareSwitcher } from "./HealthcareSwitcher";

const MENU = [
  { name: "Overview", href: "#overview", active: true },
  { name: "Features", href: "#features", active: false },
  { name: "Pricing", href: "#pricing", active: false },
];

export function HealthcarePmNav() {
  return (
    <div className="border-b border-[#E2E7EB] bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <Link href="/healthcare/practice-management" className="no-underline">
              <HealthcareLogo label="Healthcare Practice Management" />
            </Link>
            <span className="hidden h-6 w-px bg-[#26384B]/10 lg:block" />
            <div className="hidden lg:block">
              <HealthcareSwitcher current="pm" accent="#2867B2" />
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Healthcare Practice Management">
            {MENU.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative rounded-full px-4 py-2.5 text-sm font-medium no-underline transition-colors ${
                  item.active ? "text-[#2867B2]" : "text-[#64748B] hover:bg-[#F2F4F6] hover:text-[#26384B]"
                }`}
              >
                {item.name}
                {item.active && <span className="absolute inset-x-4 -bottom-[13px] h-[2.5px] rounded-full bg-[#2867B2]" />}
              </a>
            ))}
          </nav>

          <a
            href="#expert"
            className="hidden items-center gap-2 rounded-full bg-[#2867B2] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-[#205995] sm:inline-flex"
          >
            Talk to an expert
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
