"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { EVI_AGENT_IMAGE } from "./eviAgent";

/* The AI section's visual: one illustrative request played through four steps.
   EVI (the assistant) takes the request and retrieves context; an agent (a
   defined task) prepares the work, waits for approval, then reports what was
   completed and what failed. Every state the UI can be in is named on screen. */

const STEPS = [
  { key: "request", label: "Request", caption: "You ask EVI in plain language." },
  { key: "context", label: "Context", caption: "EVI retrieves context from the applications it has access to." },
  { key: "prepare", label: "Prepared", caption: "An agent prepares the task and waits for your approval." },
  { key: "result", label: "Result", caption: "Approved actions are carried out. Anything that fails is flagged." },
] as const;
const STEP_MS = [900, 2200, 3000, 4200];
const PREPARING_MS = 1000;

const SOURCES = [
  { product: "crm", app: "CRM", text: "3 opportunities closing this week" },
  { product: "billing", app: "Billing", text: "Bluepeak Studio: invoice INV-2486 overdue" },
  { product: "desk", app: "Desk", text: "Northgate Partners: ticket #4821 open" },
];

type RowState = "preparing" | "ready" | "sent" | "failed";
const TASKS = [
  { to: "Carlos Mendes, Northgate Partners", note: "Mentions the open delivery ticket", end: "sent" as RowState },
  { to: "Amara Okoye, Bluepeak Studio", note: "Asks to settle INV-2486 before renewal", end: "sent" as RowState },
  { to: "Hannah Weber, Alder & Finch", note: "No email address on the contact", end: "failed" as RowState },
];

const STATE_LABEL: Record<RowState, string> = { preparing: "Preparing", ready: "Ready", sent: "Completed", failed: "Failed" };

function StateIcon({ s }: { s: RowState }) {
  if (s === "preparing") return <span className="aq-spin" aria-hidden />;
  if (s === "failed") return <span className="aq-ic failed" aria-hidden>!</span>;
  return (
    <span className={`aq-ic ${s}`} aria-hidden>
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

export function AiSequence() {
  const box = useRef<HTMLDivElement>(null);
  // Start a little before the visual is fully on screen so a reader scrolling down finds it already moving.
  const inView = useInView(box, { amount: 0.1, margin: "0px 0px 160px 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [preparing, setPreparing] = useState(false);
  // Set when someone clicks a step: then the sequence stays where they put it until they scroll away.
  const [held, setHeld] = useState(false);

  // Entering "Prepared" starts the agent in its working state.
  const goTo = (n: number) => {
    setStep(n);
    setPreparing(n === 2);
  };

  // Out of view: rewind, so every visit replays from the request.
  useEffect(() => {
    if (inView) return;
    setStep(0);
    setPreparing(false);
    setHeld(false);
  }, [inView]);

  // Hovering does not pause: when someone scrolls down with the pointer resting on the page,
  // the visual slides under it and would freeze on the first step.
  useEffect(() => {
    if (reduce || !inView || held) return;
    const t = setTimeout(() => goTo((step + 1) % STEPS.length), STEP_MS[step]);
    return () => clearTimeout(t);
  }, [step, inView, held, reduce]);

  // Within "Prepared", the agent first works, then waits for approval.
  useEffect(() => {
    if (!preparing) return;
    const t = setTimeout(() => setPreparing(false), PREPARING_MS);
    return () => clearTimeout(t);
  }, [preparing]);

  const at = reduce ? 3 : step;
  const working = !reduce && preparing;

  const rowState = (end: RowState): RowState =>
    at < 2 ? "preparing" : at === 2 ? (working ? "preparing" : end === "failed" ? "failed" : "ready") : end;

  const agentStatus =
    at < 2 ? null
    : at === 2 ? (working ? { cls: "preparing", text: "Preparing" } : { cls: "awaiting", text: "Awaiting approval" })
    : { cls: "done", text: "Completed with 1 issue" };

  return (
    <div className="aq" ref={box}>
      <div className="aq-top">
        <ol className="aq-rail" aria-label="How a request is handled">
          {STEPS.map((s, i) => (
            <li key={s.key}>
              <button type="button" className={i === at ? "on" : i < at ? "past" : undefined} aria-current={i === at ? "step" : undefined} onClick={() => { setHeld(true); goTo(i); }}>
                <span className="n">{i + 1}</span>{s.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="aq-body">
        {/* EVI: the assistant experience */}
        <div className="aq-panel aq-chat">
          <div className="aq-panel-h">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EVI_AGENT_IMAGE} alt="" width={26} height={26} />
            <b>EVI</b><span>Assistant</span>
          </div>
          <div className="aq-msg user">Prepare follow-ups for this week&apos;s open opportunities.</div>

          <div className={`aq-msg evi aq-step${at >= 1 ? " in" : ""}`}>
            <p>I found 3 opportunities closing this week. Context I used:</p>
            <ul className="aq-src">
              {SOURCES.map((src) => (
                <li key={src.app}>
                  <ProductBadge productKey={src.product} size={20} />
                  <span><b>{src.app}</b> {src.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`aq-msg evi aq-step${at >= 2 ? " in" : ""}`}>
            <p>I&apos;ve passed this to <b>Ava</b>, the Follow-up agent. Ava is set to ask for your approval before sending.</p>
          </div>
        </div>

        {/* The agent: a defined task with visible states */}
        <div className={`aq-panel aq-agent aq-step${at >= 2 ? " in" : ""}`}>
          <div className="aq-panel-h">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="aq-agent-av" src="/characters/ava.webp" alt="" width={30} height={30} />
            <b>Ava</b><span>Follow-up agent</span>
            {agentStatus && <span className={`aq-status ${agentStatus.cls}`}>{agentStatus.text}</span>}
          </div>
          <p className="aq-task">Task: draft a follow-up email for each opportunity, using the context EVI retrieved.</p>

          <ul className="aq-rows">
            {TASKS.map((t) => {
              const s = rowState(t.end);
              return (
                <li key={t.to} className={`aq-row ${s}`}>
                  <StateIcon s={s} />
                  <span className="aq-row-t"><b>{t.to}</b><em>{t.note}</em></span>
                  <span className={`aq-chip ${s}`}>{STATE_LABEL[s]}</span>
                </li>
              );
            })}
          </ul>

          <div className="aq-foot">
            {at === 2 && !working && (
              <>
                <span>2 emails ready to send</span>
                <span className="aq-btns"><i className="ghost">Edit</i><i className="primary">Approve</i></span>
              </>
            )}
            {at === 3 && <span>Approved by Marcus Bell · 2 sent · 1 needs a contact email</span>}
            {(at < 2 || (at === 2 && working)) && <span className="muted">Drafting…</span>}
          </div>
        </div>
      </div>

      <p className="aq-cap" aria-live="polite">{STEPS[at].caption}</p>
    </div>
  );
}
