"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { Eyebrow } from "./shared";
import { EVI_AGENT_IMAGE } from "./eviAgent";

/* "Shared context" -- the base every team, product and agent starts from.
   A tall wrapper holds a sticky stage; one scroll value (0 -> 1) bursts seven
   context cards out from behind the character into an arc around it. As each
   Below 861px the stage is not pinned and the cards stack. */

const FACE = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=96&h=96&q=70`;

const W = 1200;       // canvas size the layout is drawn in; scaled to fit
const H = 530;
const CX = 600;       // character centre
const CY = 300;

type Card = { key: string; x: number; y: number; w: number; h: number; body: ReactNode };

const Glyph = ({ d }: { d: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ICON: Record<string, string> = {
  people: "M5.5 7a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4zM1.8 13c.2-2.3 1.7-3.6 3.7-3.6s3.5 1.3 3.7 3.6M11 7.2a1.9 1.9 0 100-3.8M11.4 9.6c1.5.2 2.6 1.3 2.8 3.4",
  contacts: "M8 8a2.6 2.6 0 100-5.2A2.6 2.6 0 008 8zM3 13.5c.3-2.5 2.3-4 5-4s4.7 1.5 5 4",
  conversations: "M2.5 3.5h11v7h-5l-3 2.5v-2.5h-3z",
  documents: "M4 1.8h5l3 3v9.4H4zM9 1.8v3h3M6 8h4M6 10.5h4",
  records: "M2 3.5h12v9H2zM2 7h12M6.5 3.5v9",
  activity: "M1.8 8h3l2-4.5 3 9 2-4.5h2.4",
  access: "M4.5 7V5a3.5 3.5 0 017 0v2M3.5 7h9v6.5h-9z",
};
const Title = ({ k, tag, children }: { k: string; tag?: string; children: ReactNode }) => (
  <div className="wc-card-h"><span className="wc-ic"><Glyph d={ICON[k]} /></span><b>{children}</b>{tag && <span className="wc-tag">{tag}</span>}</div>
);

const CARDS: Card[] = [
  { key: "people", x: 40, y: 0, w: 230, h: 176, body: (
    <>
      <Title k="people" tag="+24 more">People</Title>
      {[["1573496359142-b8d87734a5a2", "Elena Rossi", "Account lead"], ["1573497019940-1c28c88b4f3e", "Marcus Bell", "Operations"], ["1758691737605-69a0e78bd193", "Jun Tanaka", "Support"]].map(([id, n, r]) => (
        <div className="wc-row" key={n}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FACE(id)} alt="" width={24} height={24} />
          <span className="wc-t"><b>{n}</b><em>{r}</em></span>
        </div>
      ))}
    </>
  ) },
  { key: "documents", x: 930, y: 0, w: 230, h: 138, body: (
    <>
      <Title k="documents">Documents</Title>
      {[["Doc", "Site visit notes", "#4747E0"], ["Slides", "Q4 plan", "#E0663A"], ["PDF", "Onboarding guide", "#D83B5B"]].map(([t, n, c]) => (
        <div className="wc-row" key={n}>
          <span className="wc-file" style={{ background: c }}>{t}</span>
          <span className="wc-t"><b>{n}</b></span>
        </div>
      ))}
    </>
  ) },
  { key: "contacts", x: 0, y: 192, w: 230, h: 182, body: (
    <>
      <Title k="contacts">Contacts</Title>
      {[["1484863137850-59afcfe05386", "Hannah Weber", "Alder & Finch"], ["1519085360753-af0119f7cbe7", "Carlos Mendes", "Northgate Partners"], ["1580489944761-15a19d654956", "Amara Okoye", "Bluepeak Studio"]].map(([id, n, o]) => (
        <div className="wc-row" key={n}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FACE(id)} alt="" width={24} height={24} />
          <span className="wc-t"><b>{n}</b><em>{o}</em></span>
        </div>
      ))}
    </>
  ) },
  { key: "records", x: 920, y: 158, w: 280, h: 168, body: (
    <>
      <Title k="records">Records</Title>
      <div className="wc-table">
        <div className="wc-tr h"><span>Name</span><span>Owner</span><span>Status</span></div>
        <div className="wc-tr"><span>Northgate Partners</span><span>Marcus</span><span><i className="ok">Active</i></span></div>
        <div className="wc-tr"><span>Bluepeak Studio</span><span>Elena</span><span><i className="in">Onboarding</i></span></div>
        <div className="wc-tr"><span>Alder & Finch</span><span>Jun</span><span><i className="ok">Active</i></span></div>
      </div>
    </>
  ) },
  { key: "conversations", x: 50, y: 390, w: 230, h: 136, body: (
    <>
      <Title k="conversations">Conversations</Title>
      <div className="wc-msg in">Can we move the review to Thursday?</div>
      <div className="wc-msg out">Thursday, 11:00 AM. <span className="wc-typing"><i /><i /><i /></span></div>
    </>
  ) },
  { key: "activity", x: 920, y: 344, w: 230, h: 146, body: (
    <>
      <Title k="activity">Activity</Title>
      {[["Elena updated 3 records", "5m"], ["Hannah replied", "12m"], ["Marcus shared Q4 plan", "1h"]].map(([t, a]) => (
        <div className="wc-feed" key={t}><i /><span>{t}</span><em>{a}</em></div>
      ))}
    </>
  ) },
  { key: "access", x: 490, y: 0, w: 220, h: 118, body: (
    <>
      <Title k="access">Access</Title>
      <div className="wc-chips"><span className="on">Admin</span><span>Team</span><span>Guest</span></div>
      <div className="wc-lock">Only managers can edit</div>
    </>
  ) },
];

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const seg = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const startAt = (i: number) => 0.03 + i * 0.075;
const tOf = (v: number, i: number) => easeOut(seg(v, startAt(i), startAt(i) + 0.28));

/* Where a line leaves each card and where it meets the character. */
function linePath(c: Card, i: number): string {
  if (c.key === "access") return `M${CX} ${c.y + c.h} L${CX} ${CY - 70}`;
  const left = c.x + c.w / 2 < CX;
  const sx = left ? c.x + c.w : c.x;
  const sy = c.y + c.h / 2;
  const ex = left ? CX - 78 : CX + 78;
  const ey = CY - 30 + (i % 3) * 34;
  const dx = left ? 110 : -110;
  return `M${sx} ${sy} C${sx + dx} ${sy}, ${ex - dx * 0.6} ${ey}, ${ex} ${ey}`;
}

function Line({ c, i, p }: { c: Card; i: number; p: MotionValue<number> }) {
  const pathLength = useTransform(p, (v) => seg(v, startAt(i) + 0.16, startAt(i) + 0.36));
  const opacity = useTransform(p, (v) => (v < startAt(i) + 0.16 ? 0 : 1));
  return <motion.path d={linePath(c, i)} className="wc-line" style={{ pathLength, opacity }} />;
}

function BurstCard({ c, i, p }: { c: Card; i: number; p: MotionValue<number> }) {
  const dx = CX - (c.x + c.w / 2);
  const dy = CY - (c.y + c.h / 2);
  const x = useTransform(p, (v) => dx * (1 - tOf(v, i)));
  const y = useTransform(p, (v) => dy * (1 - tOf(v, i)));
  const scale = useTransform(p, (v) => 0.1 + 0.9 * tOf(v, i));
  const opacity = useTransform(p, (v) => seg(v, startAt(i), startAt(i) + 0.1));
  return (
    <motion.div className="wc-pos" style={{ left: c.x, top: c.y, width: c.w, height: c.h, x, y, scale, opacity }}>
      <div className="wc-card" style={{ animationDelay: `${-i * 1.1}s` }}>{c.body}</div>
    </motion.div>
  );
}

export function SectionWorkContext() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const still = useMotionValue(1);
  const p = reduce ? still : scrollYProgress;

  const [mobile, setMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const fit = () => {
      setMobile(mq.matches);
      const w = (holder.current?.clientWidth ?? W + 80) - 80;
      const hAvail = window.innerHeight - 250;
      setScale(Math.max(0.5, Math.min(1, w / W, hAvail / H)));
    };
    fit();
    mq.addEventListener("change", fit);
    window.addEventListener("resize", fit);
    return () => { mq.removeEventListener("change", fit); window.removeEventListener("resize", fit); };
  }, []);


  const head = (
    <div className="wc-head">
      <div>
        <Eyebrow>Shared data</Eyebrow>
        <h2 className="evoq-h2 wc-h2">Enter it once. <span className="accent">Every product already knows.</span></h2>
      </div>
      <div className="wc-lead">
        <p>A contact, a conversation or a document is saved once and available in every EVOQ product, so sales, service and finance work from the same history, with no re-entry and no duplicates.</p>
        <a href="/products" className="wc-btn">Explore the platform <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <section className="s-wc s-wc-flat" ref={ref}>
        <div className="wc-inner">
          {head}
          <div className="wc-flat-char">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EVI_AGENT_IMAGE} alt="" width={120} height={120} />
          </div>
          <div className="wc-flat-grid">
            {CARDS.map((c) => (
              <motion.div key={c.key} className="wc-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4 }}>
                {c.body}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="s-wc" ref={ref}>
      <div className="wc-stage">
        <div className="wc-inner" ref={holder}>
          {head}
          <div className="wc-canvas-wrap" style={{ width: W * scale, height: H * scale }}>
            <div className="wc-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              <svg className="wc-lines" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
                {CARDS.map((c, i) => <Line key={c.key} c={c} i={i} p={p} />)}
              </svg>

              <div className="wc-char" style={{ left: CX - 120, top: CY - 120 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={EVI_AGENT_IMAGE} alt="" width={240} height={240} />
              </div>

              {CARDS.map((c, i) => <BurstCard key={c.key} c={c} i={i} p={p} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
