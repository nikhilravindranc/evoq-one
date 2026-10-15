"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

/* These product pages come from the live EVOQ site's static export (public/site/*.html), which carries its own scripts for
   tabs, FAQs, carousels and the pricing toggle. They are shown in a frame that grows to the page's height, with the live
   header and footer hidden so this site's header and footer are used instead. */

/* Bump when the files in public/site change, so browsers do not reuse an older cached copy. */
const EMBED_VERSION = 5;

const EXISTING = new Set(["/", "/about", "/contact", "/implementation", "/integrations", "/why-evoq", "/products", "/products/ai", "/products/billing", "/products/billing/features", "/products/billing/pricing", "/products/crm", "/products/crm/features", "/products/crm/pricing", "/products/campaigns", "/products/configx", "/products/desk", "/products/hrms", "/products/hrms/features", "/products/inventory", "/products/inventory/features", "/products/inventory/pricing", "/products/projects", "/products/projects/features", "/products/serviceops", "/products/skillberry", "/products/sync", "/products/sync/features", "/products/sync/pricing", "/solutions", "/solutions/healthcare", "/privacy-policy", "/cookie-policy", "/cookie-preferences"]);

function routeFor(href: string): string | null {
  const m = href.match(/^(?:https?:\/\/[^/]+)?\/?(?:site\/)?([^?#/]+)\.html(#.*)?$/);
  if (!m) return null;
  const name = m[1];
  const frag = m[2] || "";
  let route = name === "index" ? "/" : "/" + name.replace(/^(products|solutions)-/, "$1/").replace(/-/g, "/");
  // products-crm-features -> /products/crm/features, but keep multi-word names intact where they exist
  if (!EXISTING.has(route)) route = name.startsWith("products-") ? "/products" : "/";
  return route + frag;
}

export function LiveFrame({ file, title, after }: { file: string; title: string; after?: ReactNode }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(900);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let ro: ResizeObserver | undefined;
    let timer: number | undefined;

    const setup = () => {
      const d = frame.contentDocument;
      if (!d || !d.body) return;
      const st = d.createElement("style");
      st.textContent = `
        div[data-theme] > header:first-of-type, footer { display: none !important; }
        .min-h-screen { min-height: 0 !important; }
        html, body { height: auto !important; min-height: 0 !important; overflow-y: hidden; }
      `;
      d.head.appendChild(st);

      const measure = () => {
        setReady(true);
        const h = Math.ceil(d.documentElement.getBoundingClientRect().height);
        setHeight((prev) => (Math.abs(prev - h) > 2 ? h : prev));
      };
      ro = new ResizeObserver(measure);
      ro.observe(d.documentElement);
      measure();
      timer = window.setInterval(measure, 800);

      d.addEventListener("click", (e) => {
        const el = e.target as Element | null;
        const a = el?.closest?.("a");
        if (a) {
          const href = a.getAttribute("href") || "";
          const route = routeFor(href);
          if (route) { e.preventDefault(); e.stopPropagation(); router.push(route); return; }
        }
        const btn = el?.closest?.("button");
        if (btn && /(book a demo|request a demo|get started|start free trial|request pricing|talk to)/i.test(btn.textContent || "")) {
          e.preventDefault(); e.stopPropagation();
          const target = Array.from(document.querySelectorAll("button, a")).find((b) => /get started/i.test(b.textContent || "") && b.ownerDocument === document);
          (target as HTMLElement | undefined)?.click();
        }
      }, true);
    };

    // Start as soon as the page's DOM exists (the window "load" event waits for every image and can take seconds).
    let started = false;
    const poll = window.setInterval(() => {
      const d = frame.contentDocument;
      if (started || !d || !d.body || d.location.pathname.indexOf("/site/") !== 0 || d.readyState === "loading" || !d.body.children.length) return;
      started = true;
      window.clearInterval(poll);
      setup();
    }, 40);
    return () => {
      window.clearInterval(poll);
      ro?.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, [router]);

  return (
    <>
    <iframe
      ref={ref}
      src={`/site/${file}?v=${EMBED_VERSION}`}
      title={title}
      scrolling="no"
      style={{ display: "block", width: "100%", height, border: 0, opacity: ready ? 1 : 0, transition: "opacity .15s ease" }}
    />
    {ready ? after : null}
    </>
  );
}
