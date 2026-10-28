/* The EVI character used as the AI agent avatar in the home Solutions section.
   When the final EVI artwork is supplied, replace the file at EVI_AGENT_IMAGE (or change this one path);
   nothing else in the section depends on the image itself. */
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
