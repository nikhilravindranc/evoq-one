"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { AgentContextStage, H, W, type Reveal } from "./AgentContextStage";

/* Live demos of the AI agent context section with each way of bringing EVI into view, for /hero-versions. Each one
   loops by itself (the home page drives the same stage with scroll). Everything but the character reveal is identical. */

type Demo = { key: Reveal; n: string; name: string; text: string; tag?: string; note?: string };

const DEMOS: Demo[] = [
  { key: "pencil", n: "0", name: "Pencil drawing", tag: "On the home page now", text: "A pencil line drawing of EVI that fills with colour from the bottom as the cards arrive. The version in use. It is close to the drawing reveal on Monday's site." },
  { key: "focus", n: "A", name: "Focus pull", text: "She starts soft, blurred and washed out, and sharpens into full colour as each card arrives, like a camera finding its subject. The clearer picture is the extra context." },
  { key: "scan", n: "B", name: "Scan beam", text: "A thin beam of light sweeps across a pale ghost of her and colour appears behind it, as if she is being read in." },
  { key: "focus-scan", n: "A+B", name: "Scan beam with a focus pull", text: "The beam sweeps across while the ghost behind it starts out of focus, so she sharpens and gains colour in the same pass." },
  { key: "mosaic", n: "C", name: "Mosaic that sharpens", text: "She appears as big coloured blocks, like a low resolution image, and the blocks get smaller until she is sharp." },
  { key: "halftone", n: "D", name: "Halftone dots", text: "She is made of print style dots that grow and merge into the finished picture." },
  { key: "silhouette", n: "E", name: "Flat silhouette to colour", text: "A single pale violet shape first. The jacket, then the face, then the hair take their colour." },
  { key: "layers", n: "F", name: "Built from layers", text: "Jacket, then face, then hair rise into place one after another.", note: "An approximation cut from one image. The real version needs the artwork cut into separate pieces." },
];

function DemoStage({ reveal }: { reveal: Reveal }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  const reduce = !!useReducedMotion();
  const inView = useInView(wrap, { amount: 0.25 });
  const p = useMotionValue(reduce ? 1 : 0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // one pass takes about 13 seconds, then it rests on the finished picture before starting again.
  // /hero-versions?at=0.4 holds every demo at that point (0 to 1), to compare the styles at the same moment.
  useEffect(() => {
    const at = new URLSearchParams(window.location.search).get("at");
    if (at !== null && at !== "" && !Number.isNaN(Number(at))) {
      p.set(Math.max(0, Math.min(1, Number(at))));
      return;
    }
    if (reduce || !inView) return;
    const c = animate(p, [0, 1], { duration: 13, ease: "linear", repeat: Infinity, repeatDelay: 3 });
    return () => c.stop();
  }, [inView, reduce, p]);

  return (
    <div ref={wrap} className="rv-stage" style={{ height: H * scale }}>
      <div className="wc-canvas" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        <AgentContextStage p={p} reveal={reveal} />
      </div>
    </div>
  );
}

export function ContextRevealDemos() {
  return (
    <div className="rv-list">
      {DEMOS.map((d) => (
        <section key={d.key} className="rv-card">
          <header>
            <div className="rv-head">
              <span className="rv-n">{d.n}</span>
              <h3>{d.name}</h3>
              {d.tag && <span className="rv-tag">{d.tag}</span>}
            </div>
            <p>{d.text}</p>
            {d.note && <p className="rv-note">{d.note}</p>}
            <p className="rv-file"><code>reveal=&quot;{d.key}&quot;</code> in <code>components/sections/AgentContextStage.tsx</code></p>
          </header>
          <DemoStage reveal={d.key} />
        </section>
      ))}
    </div>
  );
}
