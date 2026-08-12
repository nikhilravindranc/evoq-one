export function ArrowRight({
  size = 14,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Chevron({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 4.5 6 7.5l3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EvoqMark({
  height = 22,
  color = "currentColor",
}: {
  height?: number;
  color?: string;
}) {
  return (
    <svg
      height={height}
      viewBox="0 0 132 30"
      fill="none"
      aria-label="EVOQ"
      role="img"
    >
      <rect x="0" y="2" width="22" height="3.6" fill={color} />
      <rect x="0" y="13.2" width="22" height="3.6" fill={color} />
      <rect x="0" y="24.4" width="22" height="3.6" fill={color} />
      <path
        d="M28 2 L38 28 L48 2"
        stroke={color}
        strokeWidth="3.6"
        strokeLinejoin="miter"
        fill="none"
      />
      <circle cx="63" cy="15" r="11.5" stroke={color} strokeWidth="3.6" fill="none" />
      <circle cx="92" cy="15" r="11.5" stroke={color} strokeWidth="3.6" fill="none" />
      <path
        d="M97 22 L106 30"
        stroke={color}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EvoqMonogram({ color = "#1F2430" }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <rect x="8" y="16" width="84" height="14" rx="2" fill={color} />
      <rect x="8" y="43" width="84" height="14" rx="2" fill={color} />
      <rect x="8" y="70" width="84" height="14" rx="2" fill={color} />
    </svg>
  );
}

export function Dot({
  color = "#1F2430",
  size = 8,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
      }}
    />
  );
}
