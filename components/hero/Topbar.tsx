"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Chevron, EvoqMonogram } from "./icons";
import { GetStartedModal } from "@/components/shared/GetStartedModal";

const PRODUCTS = [
  { name: "CRM", sub: "Sales & customer relationships" },
  { name: "Sync", sub: "Unify data across systems" },
  { name: "Skillberry", sub: "Learning & talent development" },
  { name: "Projects", sub: "Plan and run work end-to-end" },
  { name: "ServiceOps", sub: "Field service & operations" },
];

export function Topbar({ darkCTA = true, constrained = false, light = false }: { darkCTA?: boolean; constrained?: boolean; light?: boolean }) {
  const [open, setOpen] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="relative z-10">
      <div className={`flex items-center justify-between py-5 lg:py-7 ${
        constrained
          ? "max-w-[1320px] mx-auto px-5 sm:px-[40px] lg:px-[60px]"
          : "px-5 sm:px-8 lg:px-20"
      }`}>
      {/* Brand */}
      <Link href="/" className="inline-flex items-center no-underline">
        <Image
          src={light ? "/black-logo.png" : "/white-logo.png"}
          alt="EVOQ"
          height={22}
          width={22 * (1127 / 230)}
          priority
          style={{ height: 22, width: "auto" }}
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
              className="absolute left-1/2 top-[calc(100%+14px)] w-[340px] -translate-x-1/2 rounded-[22px] bg-white/96 p-3.5 text-[#1F2430] shadow-[0_30px_60px_-20px_rgba(31,36,48,0.45),0_2px_6px_rgba(31,36,48,0.08),inset_0_0_0_1px_rgba(31,36,48,0.04)]"
              style={{ animation: "menuIn 0.15s ease forwards" }}
            >
              <style>{`
                @keyframes menuIn {
                  from { opacity: 0; transform: translateY(-6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              {/* Caret */}
              <div className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-sm bg-white/96 shadow-[-1px_-1px_0_rgba(31,36,48,0.04)]" />

              <div className="px-2.5 pb-2.5 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5F6B7A]">
                EVOQ Suite
              </div>

              <ul className="flex flex-col gap-0.5 p-0 list-none m-0">
                {PRODUCTS.map((p) => (
                  <li key={p.name} role="menuitem">
                    <a
                      href="#"
                      className="group flex items-center gap-3 rounded-xl p-2.5 no-underline text-[#1F2430] transition-colors hover:bg-[#F2F2FF]"
                    >
                      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-content-center rounded-[9px] bg-[#F2F2FF] p-[6px]">
                        <EvoqMonogram color="#000099" />
                      </span>
                      <span className="flex flex-1 flex-col leading-tight">
                        <span className="text-[14px] font-semibold text-[#1F2430]">
                          {p.name}
                        </span>
                        <span className="mt-px text-[12px] font-normal text-[#5F6B7A]">
                          {p.sub}
                        </span>
                      </span>
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#4747E0] text-white opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                        <ArrowRight size={12} />
                      </span>
                    </a>
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
        <a
          href="#"
          className={`inline-flex cursor-pointer rounded-full px-4 py-2.5 transition-colors ${light ? "text-[#1F2430]/80 hover:bg-[#F2F2FF] hover:text-[#1F2430]" : "text-white/88 hover:bg-white/8 hover:text-white"}`}
        >
          Customers
        </a>
        <a
          href="#"
          className={`inline-flex cursor-pointer rounded-full px-4 py-2.5 transition-colors ${light ? "text-[#1F2430]/80 hover:bg-[#F2F2FF] hover:text-[#1F2430]" : "text-white/88 hover:bg-white/8 hover:text-white"}`}
        >
          Resources
        </a>
      </nav>

      {/* Log in + CTA */}
      <div className="flex items-center gap-6">
        <Link
          href="/login"
          className={`inline-flex cursor-pointer text-sm font-semibold no-underline transition-colors ${
            light ? "text-[#1F2430]/80 hover:text-[#1F2430]" : "text-white/88 hover:text-white"
          }`}
        >
          Log in
        </Link>
        <button
          type="button"
          onClick={() => setShowGetStarted(true)}
          className={`inline-flex cursor-pointer items-center gap-3 rounded-full border-0 py-3 pl-[22px] pr-3.5 text-sm font-semibold transition-all hover:-translate-y-px ${
            darkCTA
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
      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </header>
  );
}
