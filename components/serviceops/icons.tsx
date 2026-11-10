import type { ReactNode } from "react";

/* Small stroke icons in one style (24 grid, 1.9 stroke), used across the ServiceOps pages. */
const s = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{d}</svg>
);

export const Ic = {
  check: s(<path d="m5 12.5 4.5 4.5L19 7.5" />),
  arrow: s(<path d="M5 12h14M13 6l6 6-6 6" />),
  wrench: s(<path d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6 12.6 21l-3-3 8.4-8.4M3 21l3-3M14.7 6.3l-2-2a4 4 0 0 0-5.4 5.4l2 2" />),
  inbox: s(<><path d="M4 13l2-7h12l2 7" /><path d="M4 13v6h16v-6h-5l-1 2h-4l-1-2z" /></>),
  receipt: s(<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>),
  pin: s(<><path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21z" /><circle cx="12" cy="10" r="2.4" /></>),
  checklist: s(<><path d="M9 6h11M9 12h11M9 18h11" /><path d="m3.5 6 1.2 1.2L6.5 5M3.5 12l1.2 1.2L6.5 11M3.5 18l1.2 1.2L6.5 17" /></>),
  calendar: s(<><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /></>),
  users: s(<><circle cx="9" cy="9" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 5.8M17.5 14.2a5.2 5.2 0 0 1 3 4.8" /></>),
  chart: s(<><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></>),
  spark: s(<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />),
  chat: s(<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3.5V16A2.5 2.5 0 0 1 4 13.5z" />),
  camera: s(<><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.2-2h5.6L16 6h1.5A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" /><circle cx="12" cy="12.5" r="3.3" /></>),
  link: s(<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" />),
  gear: s(<><circle cx="12" cy="12" r="3.2" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" /></>),
  shield: s(<><path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></>),
  clock: s(<><circle cx="12" cy="12" r="8" /><path d="M12 7.5V12l3 2" /></>),
  bell: s(<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15zM10 20.5a2.2 2.2 0 0 0 4 0" />),
  layers: s(<><path d="m12 4 8.5 4.5L12 13 3.5 8.5z" /><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" /></>),
  star: s(<path d="m12 3.8 2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z" />),
  card: s(<><rect x="3.5" y="6" width="17" height="12" rx="2.5" /><path d="M3.5 10.5h17M7 15h3" /></>),
  mic: s(<><rect x="9" y="3.5" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" /></>),
  alert: s(<><path d="M12 4 3.5 19h17z" /><path d="M12 10v4M12 16.5v.2" /></>),
  search: s(<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>),
  box: s(<><path d="M4 8l8-4 8 4v8l-8 4-8-4z" /><path d="M4 8l8 4 8-4M12 12v8" /></>),
  map: s(<><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z" /><path d="M9 4v14M15 6v14" /></>),
  edit: s(<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17zM14.5 7.5l3 3" />),
  plug: s(<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" />),
};
