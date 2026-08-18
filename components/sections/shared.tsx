/* Shared icons and helpers for page sections */

export const ArrowRt = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Check = ({ size = 14, color = "#5C5CFF" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="13" height="13" rx="3" fill={color}/>
    <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckOutline = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="13" height="13" rx="3" fill="none" stroke="#BDBDFF" strokeWidth="1.4"/>
  </svg>
);

export const Bolt = ({ size = 14, color = "#5C5CFF" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M9 1 3 9h4l-1 6 6-8H8z" fill={color}/>
  </svg>
);

export const MailIc = ({ size = 14, color = "#5C5CFF" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <path d="M2.5 4.5 8 9l5.5-4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const Person = ({ size = 14, color = "#5C5CFF" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="6" r="2.5" stroke={color} strokeWidth="1.5"/>
    <path d="M3 13c1-2 3-3 5-3s4 1 5 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SyncIc = ({ size = 14, color = "#5C5CFF" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8a5 5 0 0 1 9-3l1-1M13 8a5 5 0 0 1-9 3l-1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 4h2V2M5 12H3v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const Spark = ({ size = 14, color = "#5C5CFF" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1 9 7l5.5 1L9 9l-1 5.5L7 9 1.5 8 7 7z" fill={color}/>
  </svg>
);

export const IcLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.51 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.46h-4.56v-6.62c0-1.58-.03-3.62-2.21-3.62-2.21 0-2.55 1.73-2.55 3.51V22H7.73V8z"/>
  </svg>
);

export const IcX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2H21.5l-7.59 8.67L22.5 22h-6.81l-5.34-6.97L4.27 22H1L9.07 12.73 1 2h6.91l4.83 6.39L18.244 2zm-1.19 18h1.84L7.05 4h-1.9l11.9 16z"/>
  </svg>
);

export const IcInsta = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

export const IcYT = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/>
  </svg>
);

export const EvoqWord = ({ height = 14, color = "currentColor" }: { height?: number; color?: string }) => (
  <svg height={height} viewBox="0 0 132 30" fill="none" aria-label="EVOQ">
    <rect x="0"  y="2"    width="22" height="3.6" fill={color}/>
    <rect x="0"  y="13.2" width="22" height="3.6" fill={color}/>
    <rect x="0"  y="24.4" width="22" height="3.6" fill={color}/>
    <path d="M28 2 L38 28 L48 2" stroke={color} strokeWidth="3.6" strokeLinejoin="miter" fill="none"/>
    <circle cx="63" cy="15" r="11.5" stroke={color} strokeWidth="3.6" fill="none"/>
    <circle cx="92" cy="15" r="11.5" stroke={color} strokeWidth="3.6" fill="none"/>
    <path d="M97 22 L106 30" stroke={color} strokeWidth="3.6" strokeLinecap="round"/>
  </svg>
);

export const Eyebrow = ({ children, dark, noDot }: { children: React.ReactNode; dark?: boolean; noDot?: boolean }) => (
  <div className={`evoq-eyebrow${dark ? " dark" : ""}`}>
    {!noDot && <span className="dot"/>}
    <span>{children}</span>
  </div>
);
