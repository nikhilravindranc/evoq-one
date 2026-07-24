"use client";

import { motion, type Easing } from "framer-motion";
import { Person, SyncIc, Check, CheckOutline, Spark } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

export function SectionPlatform() {
  return (
    <section className="s-platform">
      <div className="s-platform-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <h2 className="evoq-h2">
            One <span className="accent">unified</span> platform.
          </h2>
          <p className="evoq-sub">
            Pick one app or use all four. Either way, your data moves with you.
          </p>
        </motion.div>

        <div className="platform-grid">
          {/* CRM */}
          <motion.div className="product-card v-crm" {...fadeUp(0.05)}>
            <div className="product-eyebrow">
              <span className="swatch"><Person size={9} color="#fff"/></span>
              <span>EVOQ · CRM</span>
            </div>
            <h3 className="product-title">Close more deals with less effort</h3>
            <div className="pc-mock">
              <div className="pc-mock-hd"><span>Pipeline</span><span>4 leads</span></div>
              <div className="pc-row">
                <div className="lead">
                  <span className="name">Acme Corp</span>
                  <span className="sub">Follow-up · Due today</span>
                </div>
                <span className="pill solid">Proposal</span>
              </div>
              <div className="pc-row">
                <div className="lead">
                  <span className="name">Bright Solutions</span>
                  <span className="sub">Demo scheduled</span>
                </div>
                <span className="pill tint">Qualified</span>
              </div>
              <div className="pc-row">
                <div className="lead">
                  <span className="name">Nova Retail</span>
                  <span className="sub">Contract sent</span>
                </div>
                <span className="pill outline">Closing</span>
              </div>
              <div className="pc-row">
                <div className="lead">
                  <span className="name">Peak Industries</span>
                  <span className="sub">New lead · Uncontacted</span>
                </div>
                <span className="pill ghost">New</span>
              </div>
            </div>
          </motion.div>

          {/* SYNC */}
          <motion.div className="product-card v-sync" {...fadeUp(0.1)}>
            <div className="product-eyebrow">
              <span className="swatch"><SyncIc size={9} color="#fff"/></span>
              <span>EVOQ · SYNC</span>
            </div>
            <h3 className="product-title">Your data moves the moment it should</h3>
            <div className="pc-mock">
              <div className="pc-mock-hd"><span>Connections</span><span>3 live</span></div>
              <div className="sync-row">
                <span className="label">
                  <span className="swatch" style={{background: "var(--primary)"}}/>
                  EVOQ CRM
                </span>
                <span className="pill tint">Live</span>
              </div>
              <div style={{textAlign: "center"}}>
                <span className="sync-link">&#8593; Auto-sync</span>
              </div>
              <div className="sync-row">
                <span className="label">
                  <span className="swatch" style={{background: "var(--bright)"}}/>
                  EVOQ Projects
                </span>
                <span className="pill tint">Live</span>
              </div>
              <div style={{textAlign: "center"}}>
                <span className="sync-link">&#8595; Auto-sync</span>
              </div>
              <div className="sync-row">
                <span className="label">
                  <span className="swatch" style={{background: "var(--tint)"}}/>
                  ServiceOps
                </span>
                <span className="pill tint">Live</span>
              </div>
              <div style={{textAlign: "center"}}>
                <span className="sync-link" style={{background: "var(--background)", color: "var(--muted)"}}>
                  3rd party
                </span>
              </div>
              <div className="sync-row">
                <span className="label">
                  <span className="swatch" style={{background: "var(--subtle)"}}/>
                  External Tool
                </span>
                <span className="pill ghost">Connect</span>
              </div>
            </div>
          </motion.div>

          {/* PROJECTS */}
          <motion.div className="product-card v-projects" {...fadeUp(0.15)}>
            <div className="product-eyebrow">
              <span className="swatch"><Check size={9} color="#fff"/></span>
              <span>EVOQ · PROJECTS</span>
            </div>
            <h3 className="product-title">Every project, on time, every time</h3>
            <div className="pc-mock">
              <div className="proj-hd">
                <span className="left">Q3 Delivery</span>
                <span className="right">66% Complete</span>
              </div>
              <div className="proj-row">
                <Check size={14} color="#5C5CFF"/>
                <span className="task done">Kickoff documentation</span>
                <span className="status">Done</span>
              </div>
              <div className="proj-row">
                <Check size={14} color="#5C5CFF"/>
                <span className="task done">Design handoff complete</span>
                <span className="status">Done</span>
              </div>
              <div className="proj-row">
                <Check size={14} color="#5C5CFF"/>
                <span className="task">Development sprint 2</span>
                <span className="status">Jun 28</span>
              </div>
              <div className="proj-row">
                <CheckOutline size={14}/>
                <span className="task" style={{color: "var(--subtle)"}}>QA &amp; launch review</span>
                <span className="status">Jul 5</span>
              </div>
            </div>
          </motion.div>

          {/* SERVICEOPS */}
          <motion.div className="product-card v-serviceops" {...fadeUp(0.2)}>
            <div className="product-eyebrow">
              <span className="swatch"><Spark size={9} color="#fff"/></span>
              <span>EVOQ · SERVICEOPS</span>
            </div>
            <h3 className="product-title">Service requests handled automatically</h3>
            <div className="pc-mock">
              <div className="ticket">
                <div className="ticket-hd">
                  <span>#T-1042</span>
                  <span className="pill solid">Open</span>
                </div>
                <div className="ticket-title">AC unit not cooling &#8212; Floor 3</div>
                <div className="ticket-sub">Assigned to Rahul · 7h ago</div>
              </div>
              <div className="ticket">
                <div className="ticket-hd">
                  <span>#T-1041</span>
                  <span className="pill outline">In progress</span>
                </div>
                <div className="ticket-title">Printer offline &#8212; Reception</div>
                <div className="ticket-sub">Assigned to Priya · 5h ago</div>
              </div>
              <div className="ticket">
                <div className="ticket-hd">
                  <span>#T-1040</span>
                  <span className="pill tint">Resolved</span>
                </div>
                <div className="ticket-title">Door lock malfunction &#8212; Gate B</div>
                <div className="ticket-sub">Closed · Yesterday</div>
              </div>
              <div className="ticket">
                <div className="ticket-hd">
                  <span>#T-1039</span>
                  <span className="pill ghost">Pending</span>
                </div>
                <div className="ticket-title">Water dispenser replacement</div>
                <div className="ticket-sub">Unassigned · 1d ago</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
