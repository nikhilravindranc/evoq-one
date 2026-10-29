import { useEffect, useState, type ReactNode, type RefObject } from "react";

/* EVOQ Bookings design tokens (EVOQ Bookings visual design system): one colour per role,
   no shade scales. Shared by every Bookings section. */

export const SAGE = "#64856D";
export const SAGE_HOVER = "#526F5A";
export const TERRA = "#C8785A";
export const SAND = "#D9B98C";
export const BG = "#F7F5EF";
export const DEEP = "#34483B";
export const INK = "#26332B";
export const MUTED = "#59645B";
export const LINE = "#E5E7E3";
export const OK = "#168A4A";
export const ERR = "#DC2626";
export const NEUTRAL = "#687280";
/* Recommended gradient: Pale Sage, Warm Cream, Soft Terracotta. For hero, enquiry and transitions. */
export const GRADIENT = "linear-gradient(100deg, #DCE8DF 0%, #F3E8D8 52%, #E8C9B7 100%)";

export const U = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

/* ---------- icons (line, 1.8 stroke) ---------- */
export const Ico = ({ children, size = 22 }: { children: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
export const I = {
  space: <Ico><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M2 21h20M16 8h2a2 2 0 0 1 2 2v11M11 12h.01" /></Ico>,
  appt: <Ico><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Ico>,
  stay: <Ico><path d="M3 18V7M3 13h18v5M21 18v-3a3 3 0 0 0-3-3h-7v1" /><circle cx="7" cy="10" r="1.6" /></Ico>,
  activity: <Ico><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></Ico>,
  other: <Ico><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></Ico>,
  rules: <Ico><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4M8 14h3M8 17h6" /></Ico>,
  oversight: <Ico><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="3" /></Ico>,
  message: <Ico><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" /><path d="M8 10h8M8 13h5" /></Ico>,
  layers: <Ico><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /></Ico>,
  search: <Ico><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Ico>,
  edit: <Ico><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="m13.5 6.5 4 4" /></Ico>,
  arrow: <Ico size={16}><path d="M5 12h14M13 6l6 6-6 6" /></Ico>,
  check: <Ico size={16}><path d="m5 12 5 5 9-10" /></Ico>,
  clock: <Ico size={15}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Ico>,
  people: <Ico size={15}><circle cx="9" cy="8" r="3" /><path d="M3 20c.7-3.3 2.8-5 6-5s5.3 1.7 6 5M16 4.5a3 3 0 0 1 0 6M21 20c-.4-2.3-1.5-3.8-3.2-4.5" /></Ico>,
  pin: <Ico size={15}><path d="M12 21s7-6 7-11.5a7 7 0 0 0-14 0C5 15 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></Ico>,
};

/* Scroll-driven steps for a pinned section (Calendly "Scheduling capabilities" pattern): the section is
   tall, its content sticks to the viewport, and the active index follows scroll progress, so items open
   one after another. Below `minWidth` it is not pinned and items change on click. `local` is the progress
   (0..1) through the active item, for progress bars. */
export function useScrollSteps(ref: RefObject<HTMLElement | null>, count: number, minWidth = 981) {
  const [state, setState] = useState({ index: 0, local: 0, pinned: false });
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      if (!mq.matches) { setState((s) => (s.pinned ? { ...s, pinned: false } : s)); return; }
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-el.getBoundingClientRect().top / Math.max(total, 1), 0), 0.9999);
      const index = Math.floor(p * count);
      const local = p * count - index;
      setState((s) => (s.index === index && s.pinned && Math.abs(s.local - local) < 0.01 ? s : { index, local, pinned: true }));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); mq.removeEventListener("change", onScroll); };
  }, [ref, count, minWidth]);
  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    if (!state.pinned) { setState((s) => ({ ...s, index: i, local: 0 })); return; }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + total * ((i + 0.08) / count), behavior: "smooth" });
  };
  return { ...state, go };
}
