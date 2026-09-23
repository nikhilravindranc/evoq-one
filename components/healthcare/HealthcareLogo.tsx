export function HealthcareLogo({ label = "Healthcare" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#E7F7F5]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#18B8D1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5" />
          <path d="M3.5 12h3l1.5-2.5 2 5 2-6.5 1.5 2h3" />
          <path d="M12 21c-2-1.2-4-2.8-5.5-4.5M12 21c2-1.2 4-2.8 5.5-4.5" />
        </svg>
      </span>
      <span className="text-[17px] font-bold tracking-[-0.01em] text-[#31465A]">
        {label}
      </span>
    </span>
  );
}
