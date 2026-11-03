/* The EVI character as a round avatar (home Solutions, AI sequence, hero chips, EVOQ AI page).
   It is the face crop of the current mascot; replace the file at EVI_AGENT_IMAGE to change it everywhere.
   Larger placements use components/shared/EviTile.tsx. */
export const EVI_AGENT_IMAGE = "/evoq-ai/evi-avatar.webp";

export function EviAgent({ size = 56, ring = "#fff" }: { size?: number; ring?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={EVI_AGENT_IMAGE}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain", borderRadius: "50%", background: "#fff", boxShadow: `0 0 0 3px ${ring}, 0 10px 22px -10px rgba(10,10,60,.5)`, flex: "none" }}
    />
  );
}
