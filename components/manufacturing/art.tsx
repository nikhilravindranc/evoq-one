/* Technical product silhouette (industrial control unit) with optional dimension markers.
   Drawn in SVG so the page needs no product renders. */
export function ProductArt({ tint = "#E2E8F0", dims = false, mini = false, dark = false }: { tint?: string; dims?: boolean; mini?: boolean; dark?: boolean }) {
  const id = `pa-${tint.replace("#", "")}-${dark ? "d" : "l"}`;
  const hi = dark ? "#4B5563" : "#FFFFFF";
  const lo = dark ? "#111827" : "#94A3B8";
  const line = dark ? "#9CA3AF" : "#64748B";
  return (
    <svg viewBox="0 0 420 300" width="100%" style={{ display: "block", overflow: "visible" }} aria-hidden="true">
      <defs>
        <linearGradient id={id + "b"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={dark ? "#374151" : tint} />
          <stop offset="1" stopColor={lo} />
        </linearGradient>
        <radialGradient id={id + "f"} cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor={hi} />
          <stop offset="1" stopColor={dark ? "#1F2937" : "#A8B4C4"} />
        </radialGradient>
      </defs>
      <ellipse cx="215" cy="262" rx="170" ry="16" fill="#1F2933" opacity=".12" />
      <rect x="40" y="116" width="46" height="74" rx="8" fill={`url(#${id}b)`} stroke={line} strokeWidth="1.2" />
      <rect x="86" y="86" width="190" height="134" rx="14" fill={`url(#${id}b)`} stroke={line} strokeWidth="1.4" />
      <rect x="116" y="60" width="130" height="34" rx="8" fill={`url(#${id}b)`} stroke={line} strokeWidth="1.2" />
      {[112, 132, 152, 172, 192].map((y) => (
        <line key={y} x1="100" y1={y} x2="262" y2={y} stroke={line} strokeWidth="1" opacity=".55" />
      ))}
      <rect x="92" y="220" width="64" height="16" rx="3" fill={lo} stroke={line} strokeWidth="1" />
      <rect x="206" y="220" width="64" height="16" rx="3" fill={lo} stroke={line} strokeWidth="1" />
      <circle cx="300" cy="154" r="68" fill={`url(#${id}b)`} stroke={line} strokeWidth="1.4" />
      <circle cx="300" cy="154" r="52" fill={`url(#${id}f)`} stroke={line} strokeWidth="1.2" />
      <circle cx="300" cy="154" r="34" fill="none" stroke={line} strokeWidth="1.2" />
      <circle cx="300" cy="154" r="16" fill={dark ? "#111827" : "#475569"} stroke={line} strokeWidth="1.2" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={300 + Math.cos(a) * 60} cy={154 + Math.sin(a) * 60} r="3.2" fill={dark ? "#111827" : "#475569"} />;
      })}
      {dims && !mini && (
        <g stroke="#94A3B8" strokeWidth="1" fill="#64748B" fontSize="10" fontFamily="inherit">
          <line x1="40" y1="258" x2="368" y2="258" />
          <line x1="40" y1="252" x2="40" y2="264" />
          <line x1="368" y1="252" x2="368" y2="264" />
          <text x="204" y="274" stroke="none" textAnchor="middle">420 mm</text>
          <line x1="394" y1="86" x2="394" y2="222" />
          <line x1="388" y1="86" x2="400" y2="86" />
          <line x1="388" y1="222" x2="400" y2="222" />
          <text x="406" y="158" stroke="none">180</text>
        </g>
      )}
    </svg>
  );
}
