/* The EVI mascot as a violet-ringed tile. One place for every section that shows EVI at a
   larger size, so changing the character again is a one-file job (the poses live in public/characters). */
const POSES = {
  idle: "/characters/evi.webp",
  mirror: "/characters/evi-mirror.webp",
  working: "/characters/evi-working.webp",
  done: "/characters/evi-done.webp",
} as const;

export function EviTile({ pose = "idle", className, style }: { pose?: keyof typeof POSES; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={className}
      style={{
        display: "block",
        aspectRatio: "1 / 1",
        borderRadius: "26%",
        overflow: "hidden",
        background: "#E9E4FF",
        boxShadow: "0 0 0 2.5px #8F7BFF, 0 0 0 6px rgba(255,255,255,0.35), 0 18px 30px -12px rgba(60,50,200,0.45)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POSES[pose]} alt="EVI" width={480} height={480} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </span>
  );
}
