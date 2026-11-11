"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { track } from "@/lib/track";
import { AMBER, AMBER_DEEP, AMBER_HOVER, BODY, FOOT, G1, INK, LINE, MUTED } from "./palette";

/* Shell for the ServiceOps v2 pages: the EVOQ top bar, a quiet product bar, the demo form and the base styles. */

export const V2_BASE = "/products/serviceops-v2";

const DemoCtx = createContext<(location: string, title?: string) => void>(() => {});
export const useV2Demo = () => useContext(DemoCtx);

export function V2Demo({ location, title, className = "v2-btn primary", children = "Request a Demo" }: { location: string; title?: string; className?: string; children?: ReactNode }) {
  const open = useV2Demo();
  return <button type="button" className={className} onClick={() => open(location, title)}>{children}</button>;
}

function ProductBar({ page }: { page: "overview" | "features" | "pricing" }) {
  return (
    <div className="v2-bar">
      <div className="v2-bar-in">
        <Link href={V2_BASE} className="v2-brand" aria-label="ServiceOps overview"><img src="/logos/ServiceOps.png" alt="ServiceOps" height={28} /></Link>
        <nav className="v2-menu" aria-label="ServiceOps">
          <Link href={V2_BASE} className={page === "overview" ? "on" : undefined} aria-current={page === "overview" ? "page" : undefined}>Overview</Link>
          <Link href={`${V2_BASE}/features`} className={page === "features" ? "on" : undefined} aria-current={page === "features" ? "page" : undefined}>Features</Link>
          <Link href={`${V2_BASE}/pricing`} className={page === "pricing" ? "on" : undefined} aria-current={page === "pricing" ? "page" : undefined}>Pricing</Link>
        </nav>
      </div>
    </div>
  );
}

export function V2Shell({ children, page = "overview" }: { children: ReactNode; page?: "overview" | "features" | "pricing" }) {
  const [from, setFrom] = useState<{ loc: string; title: string } | null>(null);
  const open = useCallback((location: string, title = "Request a demo") => {
    track("click_demo_cta", { location, page: "serviceops_v2" });
    setFrom({ loc: location, title });
  }, []);
  useEffect(() => { track("view_serviceops_v2", { page: "serviceops" }); }, []);
  return (
    <DemoCtx.Provider value={open}>
      <div className="v2-root hs-root">
        <style>{css}</style>
        <HsMotion />
        <header className="v2-hd">
          <div className="v2-top"><Topbar light darkCTA={false} ctaColor={AMBER_DEEP} /></div>
          <ProductBar page={page} />
        </header>
        <main>{children}</main>
        <Footer background={FOOT} />
        <GetStartedModal isOpen={from !== null} onClose={() => setFrom(null)} title={from?.title ?? "Request a demo"} source={`serviceops_v2_${from?.loc ?? "demo"}`} />
      </div>
    </DemoCtx.Provider>
  );
}

const css = `
  .v2-root{background:#fff;color:${BODY};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh;overflow-x:clip}
  .v2-root h1,.v2-root h2,.v2-root h3,.v2-root h4{font-family:var(--font-display),system-ui,sans-serif;color:${INK};font-weight:600;margin:0}
  .v2-root p{text-wrap:pretty}
  .v2-root main{position:relative}
  .v2-root img{max-width:100%}
  .v2-out{padding:0 20px}
  .v2-in{max-width:1240px;margin:0 auto}
  .v2-sec{padding-top:96px;padding-bottom:96px;scroll-margin-top:60px}
  .v2-grey{background:${G1}}
  .v2-dots{background-color:${G1};background-image:radial-gradient(rgba(32,26,20,.13) 1px,transparent 1.4px);background-size:22px 22px}
  .v2-label{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${AMBER_DEEP}}
  .v2-head{max-width:860px;margin-bottom:48px}
  .v2-head .v2-label{margin-bottom:14px}
  .v2-head p{margin:16px 0 0;font-size:18px;line-height:1.6;color:${BODY};max-width:64ch}
  .v2-h2{letter-spacing:-.02em;text-wrap:balance}
  .v2-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 24px;border-radius:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:background .18s ease,border-color .18s ease,transform .12s ease;white-space:nowrap}
  .v2-btn:active{transform:translateY(1px)}
  .v2-btn.primary{background:${AMBER};color:${INK}}.v2-btn.primary:hover{background:${AMBER_HOVER}}
  .v2-btn.secondary{background:transparent;color:${INK};border-color:rgba(32,26,20,.28)}.v2-btn.secondary:hover{border-color:${INK};background:#fff}
  .v2-btn.dark{background:${INK};color:#fff}.v2-btn.dark:hover{background:#000}
  .v2-btn svg{width:17px;height:17px}
  .v2-root button:focus-visible,.v2-root a:focus-visible{outline:2px solid ${AMBER_DEEP};outline-offset:2px}
  .v2-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}

  .v2-hd{position:relative;background:#fff}
  .v2-top{position:relative;z-index:60}
  .v2-bar{padding:0 20px;border-bottom:1px solid ${LINE};border-top:1px solid ${LINE}}
  .v2-bar-in{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;min-height:54px}
  .v2-brand{display:flex;align-items:center;flex-shrink:0}.v2-brand img{display:block;height:28px;width:auto}
  .v2-menu{display:flex;gap:4px}
  .v2-menu a{position:relative;padding:8px 14px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:500;color:${MUTED};text-decoration:none;border-radius:8px;transition:color .15s ease,background .15s ease}
  .v2-menu a:hover{color:${INK};background:${G1}}
  .v2-menu a.on{color:${INK};font-weight:600}
  .v2-menu a.on::after{content:"";position:absolute;left:14px;right:14px;bottom:-14px;height:2.5px;border-radius:2px;background:${AMBER}}

  .hs-rv{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
  .hs-rv.hs-in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.hs-rv{transition:none;opacity:1;transform:none}}
  @media (max-width:860px){
    .v2-sec{padding-top:64px;padding-bottom:64px}
    .v2-head{margin-bottom:34px}
    .v2-head p{font-size:16.5px}
    .v2-bar-in{gap:14px;min-height:50px}
    .v2-menu a.on::after{bottom:-12px}
  }
`;

