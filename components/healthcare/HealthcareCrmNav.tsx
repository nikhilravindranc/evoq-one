import Link from "next/link";
import { HealthcareLogo } from "./HealthcareLogo";

const MENU = [
  { name: "Overview", href: "#overview" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
];

export function HealthcareCrmNav() {
  return (
    <div className="border-b border-[#102A43]/8 bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between py-3">
          <Link href="/healthcare/crm" className="no-underline">
            <HealthcareLogo label="Healthcare CRM" />
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Healthcare CRM">
            {MENU.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-[#102A43]/70 no-underline transition-colors hover:bg-[#F4FBFA] hover:text-[#102A43]"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <a
            href="#expert"
            className="hidden items-center gap-2 rounded-full bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-[#0B5F58] sm:inline-flex"
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
