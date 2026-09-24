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
        <div className="mx-auto flex max-w-[1300px] items-center gap-6 py-3 pl-2 sm:pl-4 md:pl-6 lg:gap-8 lg:pl-[54px]">
          <Link href="/healthcare/practice-management" className="shrink-0 no-underline">
            <HealthcareLogo label="Healthcare Practice Management" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Healthcare Practice Management">
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

          <div className="ml-auto hidden md:block">
            <HealthcareSwitcher current="pm" accent="#2867B2" />
          </div>
        </div>
      </div>
    </div>
  );
}
