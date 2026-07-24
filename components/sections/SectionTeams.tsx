"use client";

import { motion, type Easing } from "framer-motion";
import { Check, Bolt, MailIc } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

export function SectionTeams() {
  return (
    <section className="s-teams">
      <div className="s-teams-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <h2 className="evoq-h2">
            Engineered for <span className="accent">modern teams.</span>
          </h2>
          <p className="evoq-sub">
            EVOQ runs sales, service, operations, and support, so your teams stay in
            sync and decisions happen faster.
          </p>
        </motion.div>

        <div className="teams-grid">
          {/* Row 1, col 1: featured */}
          <motion.div className="team-card featured p-rings-tl" {...fadeUp(0.05)}>
            <h3>Everything works together.</h3>
            <p>One source of truth across sales, service, commerce, and support.</p>
            <div className="team-mock">
              <div className="act-card">
                <div className="act-hd">
                  <span>Unified Activity</span>
                  <span className="live">Live</span>
                </div>
                <div className="act-row">
                  <span className="badge"/>
                  <div className="col">
                    <div className="l">CRM</div>
                    <div className="v">Deal won · Acme Corp</div>
                  </div>
                  <span className="state">Won</span>
                </div>
                <div className="act-row">
                  <span className="badge bright"/>
                  <div className="col">
                    <div className="l">ServiceOps</div>
                    <div className="v">Ticket closed · #482</div>
                  </div>
                  <span className="state" style={{color: "var(--muted)"}}>Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row 1, col 2 */}
          <motion.div className="team-card p-rings-tr" {...fadeUp(0.1)}>
            <h3>See everything, miss nothing.</h3>
            <p>Real-time data across departments, roles, and channels.</p>
            <div className="team-mock">
              <div className="overview-card">
                <div className="ov-hd">
                  <span className="title">Live Overview</span>
                  <span className="badge">Real-time</span>
                </div>
                <div className="ov-stats">
                  <div className="ov-stat">
                    <div className="v">$24.8k</div>
                    <div className="l">Revenue</div>
                    <div className="d">&#9650; 18%</div>
                  </div>
                  <div className="ov-stat">
                    <div className="v">142</div>
                    <div className="l">Deals</div>
                    <div className="d">&#9650; 6%</div>
                  </div>
                  <div className="ov-stat">
                    <div className="v">96%</div>
                    <div className="l">CSAT</div>
                    <div className="d down">&#9660; 2%</div>
                  </div>
                </div>
                <div className="ov-bars">
                  <div className="ov-bar" style={{height: "55%"}}/>
                  <div className="ov-bar" style={{height: "75%"}}/>
                  <div className="ov-bar" style={{height: "45%"}}/>
                  <div className="ov-bar" style={{height: "90%"}}/>
                  <div className="ov-bar" style={{height: "65%"}}/>
                  <div className="ov-bar" style={{height: "80%"}}/>
                  <div className="ov-bar" style={{height: "55%"}}/>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row 1, col 3 */}
          <motion.div className="team-card p-rings-br" {...fadeUp(0.15)}>
            <h3>Automate what slows you down.</h3>
            <p>
              Actions, approvals, and updates run on their own. Your team focuses on
              what matters.
            </p>
            <div className="team-mock">
              <div className="wf-card">
                <div className="wf-hd">
                  <span className="ttl">Workflow Builder</span>
                  <span className="live">Live</span>
                </div>
                <div className="wf-step">
                  <span className="icon"><Bolt size={11} color="#5C5CFF"/></span>
                  <div className="col">
                    <div className="l">Trigger</div>
                    <div className="v">Deal marked as won</div>
                  </div>
                  <Check size={14} color="#5C5CFF"/>
                </div>
                <div className="wf-step">
                  <span className="icon"><MailIc size={11} color="#5C5CFF"/></span>
                  <div className="col">
                    <div className="l">Action</div>
                    <div className="v">Send welcome email</div>
                  </div>
                  <Check size={14} color="#5C5CFF"/>
                </div>
                <div className="wf-step ghost">
                  <span
                    className="icon"
                    style={{
                      background: "transparent",
                      borderStyle: "dashed",
                      borderColor: "var(--tint)",
                    }}
                  />
                  <div className="col">
                    <div className="l">Action</div>
                    <div className="v">Assign account manager</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row 2, col 1+2: spans 2 columns */}
          <motion.div
            className="team-card p-rings-rc"
            style={{gridColumn: "span 2"}}
            {...fadeUp(0.1)}
          >
            <h3>Flexible for your future.</h3>
            <p>Scale teams, add products, or connect systems; EVOQ grows with you.</p>
            <div className="team-mock">
              <div className="apps-card">
                <div className="apps-hd">
                  <span>Apps installed</span>
                  <span className="count">8 / 12</span>
                </div>
                <div className="apps-grid" style={{gridTemplateColumns: "repeat(6, 1fr)"}}>
                  <div className="app-tile">
                    <div className="ic">C</div>
                    <div className="nm">CRM</div>
                    <div className="st">Active</div>
                  </div>
                  <div className="app-tile">
                    <div className="ic bright">So</div>
                    <div className="nm">ServiceOps</div>
                    <div className="st">Active</div>
                  </div>
                  <div className="app-tile">
                    <div className="ic mid">Co</div>
                    <div className="nm">Commerce</div>
                    <div className="st">Add-on</div>
                  </div>
                  <div className="app-tile">
                    <div className="ic deep">P</div>
                    <div className="nm">Projects</div>
                    <div className="st">Live</div>
                  </div>
                  <div className="app-tile">
                    <div className="ic charcoal">I</div>
                    <div className="nm">Integrations</div>
                    <div className="st">12 apps</div>
                  </div>
                  <div className="app-tile ghost">+</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row 2, col 3 */}
          <motion.div className="team-card p-rings-bl" {...fadeUp(0.15)}>
            <h3>Workflows, your way.</h3>
            <p>Customize how your processes run, without jumping between tools.</p>
            <div className="team-mock">
              <div className="flow-card">
                <div className="flow-row">
                  <span className="chk"><Check size={10} color="#fff"/></span>
                  New Lead
                </div>
                <div className="flow-row">
                  <span className="chk"><Check size={10} color="#fff"/></span>
                  Assign Owner
                </div>
                <div className="flow-row">
                  <span className="chk"><Check size={10} color="#fff"/></span>
                  Send Email
                </div>
                <div className="flow-row ghost">
                  <span className="chk"/>
                  Follow Up
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
