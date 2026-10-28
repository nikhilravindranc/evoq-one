"use client";

import { motion, type Easing } from "framer-motion";
import { Eyebrow } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* PLACEHOLDER CONTENT -- every customer, quote and person below is fictional.
   Replace the two arrays with real material:
   - LOGOS: set `logo` to a file in /public (e.g. "/customers/acme.svg"); when it is set the image
     is shown instead of the stand-in wordmark. Delete `mark`/`weight` once all logos are real.
   - QUOTES: swap in the real quote, name, role, company and a headshot (`photo`). */
const FACE = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=160&h=160&q=70`;

type Mark = "circle" | "tri" | "hex" | "bars" | "diamond" | "arc";
const LOGOS: { name: string; logo?: string; mark: Mark; weight: number; caps?: boolean }[] = [
  { name: "Fernhill", mark: "circle", weight: 700 },
  { name: "Kestrel Works", mark: "tri", weight: 800, caps: true },
  { name: "Westbridge", mark: "bars", weight: 600 },
  { name: "Northgate", mark: "hex", weight: 700 },
  { name: "Bluepeak", mark: "arc", weight: 600 },
  { name: "Alder & Finch", mark: "diamond", weight: 700 },
];

const QUOTES: { quote: string; name: string; role: string; company: string; industry: string; photo: string }[] = [
  { quote: "Bookings, patient follow-ups and billing used to live in three places. Now the front desk sees the whole picture before the patient walks in.",
    name: "Sofia Marchetti", role: "Operations Director", company: "Fernhill Dental Group", industry: "Healthcare", photo: FACE("1573496359142-b8d87734a5a2") },
  { quote: "Quotes, orders and service visits finally follow one thread. Our planners stopped chasing updates across spreadsheets.",
    name: "Daniel Okafor", role: "Plant Manager", company: "Kestrel Works", industry: "Manufacturing", photo: FACE("1519085360753-af0119f7cbe7") },
  { quote: "Dispatch, spare parts and invoices connect, so a finished visit turns into an invoice the same day.",
    name: "Hannah Lindqvist", role: "Head of Service", company: "Westbridge Facilities", industry: "Field service", photo: FACE("1580489944761-15a19d654956") },
];

function MarkGlyph({ m }: { m: Mark }) {
  const p = { width: 26, height: 26, viewBox: "0 0 26 26", fill: "currentColor", "aria-hidden": true } as const;
  switch (m) {
    case "circle": return <svg {...p}><circle cx="13" cy="13" r="11" /><circle cx="13" cy="13" r="5" fill="#fff" /></svg>;
    case "tri": return <svg {...p}><path d="M13 2 24 23H2z" /></svg>;
    case "hex": return <svg {...p}><path d="M13 1.5 23 7v12l-10 5.5L3 19V7z" /></svg>;
    case "bars": return <svg {...p}><rect x="2" y="12" width="5" height="12" rx="1.5" /><rect x="10.5" y="6" width="5" height="18" rx="1.5" /><rect x="19" y="2" width="5" height="22" rx="1.5" /></svg>;
    case "diamond": return <svg {...p}><path d="M13 1 25 13 13 25 1 13z" /></svg>;
    case "arc": return <svg {...p}><path d="M2 21a11 11 0 0 1 22 0h-6a5 5 0 0 0-10 0z" /></svg>;
  }
}

export function SectionProof() {
  return (
    <section className="s-proof">
      <div className="s-proof-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <Eyebrow>Customers</Eyebrow>
          <h2 className="evoq-h2">
            Trusted by teams across <span className="accent">every industry.</span>
          </h2>
          <p className="evoq-sub">
            From clinics to factory floors, teams use EVOQ to run customers, operations and money
            in one place.
          </p>
        </motion.div>

        <motion.ul className="proof-logos" {...fadeUp(0.06)}>
          {LOGOS.map((l) => (
            <li key={l.name} className="proof-logo">
              {l.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.logo} alt={l.name} height={28} loading="lazy" />
              ) : (
                <>
                  <MarkGlyph m={l.mark} />
                  <span style={{ fontWeight: l.weight, textTransform: l.caps ? "uppercase" : undefined, letterSpacing: l.caps ? ".06em" : undefined }}>{l.name}</span>
                </>
              )}
            </li>
          ))}
        </motion.ul>

        <div className="proof-grid">
          {QUOTES.map((q, i) => (
            <motion.figure key={q.name} className="proof-card" {...fadeUp(0.1 + i * 0.08)}>
              <span className="proof-tag">{q.industry}</span>
              <svg className="proof-q" width="30" height="24" viewBox="0 0 30 24" aria-hidden><path d="M0 24V13.5C0 6 4.2 1.2 11.5 0l1.3 3.4C8.6 4.7 6.7 7.4 6.5 10.5H12V24zM17.5 24V13.5C17.5 6 21.7 1.2 29 0l1 3.4c-4.2 1.3-6.1 4-6.3 7.1H29.5V24z" fill="currentColor" /></svg>
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={q.photo} alt="" width={44} height={44} />
                <span><b>{q.name}</b><em>{q.role}, {q.company}</em></span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
