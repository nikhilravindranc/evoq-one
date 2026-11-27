import Link from "next/link";
import { HealthcareLogo } from "@/components/healthcare/HealthcareLogo";
import { HealthcareSwitcher } from "@/components/healthcare/HealthcareSwitcher";

const MENU = [
  { name: "Overview", href: "/solutions/healthcare/patient-relationships" },
  { name: "Features", href: "/solutions/healthcare/patient-relationships/features" },
];

export function HcCrmNav() {
  return (
    <div className="border-b border-[#102A43]/8">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto flex max-w-[1300px] items-center gap-6 py-3 pl-2 sm:pl-4 md:pl-6 lg:gap-8 lg:pl-[54px]">
          <Link href="/solutions/healthcare/patient-relationships" className="shrink-0 no-underline">
            <HealthcareLogo label="Patient Relationships" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Patient Relationships">
            {MENU.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-[#102A43]/70 no-underline transition-colors hover:bg-[#F4FBFA] hover:text-[#102A43]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden md:block">
            <HealthcareSwitcher current="crm" accent="#0F766E" />
          </div>
        </div>
      </div>
    </div>
  );
}
