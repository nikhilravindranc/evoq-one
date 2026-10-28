/* A real screenshot of the CRM app (public/crm-app), captured from the development instance
   with its sample data. Sizes are the cropped pixel size of each file. */

const SIZE: Record<string, [number, number]> = {
  leads: [800, 530],
  "lead-record": [800, 530],
  pipeline: [800, 530],
  "deal-record": [800, 530],
  "deal-products": [800, 592],
  tasks: [800, 530],
  dashboard: [800, 592],
};

const css = `
  .shot{margin:0;border-radius:16px;overflow:hidden;background:#fff;border:1px solid #E2E8F0;box-shadow:0 24px 44px -30px rgba(15,42,95,.45)}
  .shot img{display:block;width:100%;height:auto}
  .shot figcaption{padding:8px 14px;border-top:1px solid #E2E8F0;font-size:12px;color:#64748B;background:#F8FAFC}
`;

export function Shot({ name, alt }: { name: keyof typeof SIZE; alt: string }) {
  const [w, h] = SIZE[name];
  return (
    <figure className="shot">
      <style>{css}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/crm-app/${name}.webp`} alt={alt} width={w} height={h} loading="lazy" />
      <figcaption>Screenshot from the CRM app, with sample data</figcaption>
    </figure>
  );
}
