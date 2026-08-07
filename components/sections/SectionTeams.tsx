"use client";

import { motion, type Easing } from "framer-motion";
import { Check } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

function TcBadge({
  icon,
  iconBg,
  label,
  value,
  status,
  statusColor,
  style,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  status?: string;
  statusColor?: string;
  style: React.CSSProperties;
}) {
  return (
    <div className="tc-badge" style={style}>
      <span className="tc-badge-icon" style={{ background: iconBg }}>
        {icon}
      </span>
      <div className="tc-badge-col">
        <div className="tc-badge-label">{label}</div>
        <div className="tc-badge-value">{value}</div>
      </div>
      {status && (
        <span className="tc-badge-status" style={{ color: statusColor }}>
          {status}
        </span>
      )}
    </div>
  );
}

function TcStep({ icon, iconBg, label, sub, done }: { icon: React.ReactNode; iconBg: string; label: string; sub: string; done?: boolean }) {
  return (
    <div className={`tc-step${done === false ? " ghost" : ""}`}>
      <span className="tc-step-icon" style={{ background: iconBg }}>
        {icon}
      </span>
      <div className="tc-step-col">
        <div className="tc-step-label">{label}</div>
        <div className="tc-step-sub">{sub}</div>
      </div>
      {done !== false && (
        <span className="tc-step-check">
          <Check size={11} color="#fff" />
        </span>
      )}
    </div>
  );
}

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
          {/* Row 1, col 1: featured -- full composed graphic (person + all
              stat callouts baked into one image), so it's shown whole
              rather than cropped/recomposed with our own badge markup. */}
          <motion.div className="team-card featured has-hero-image" {...fadeUp(0.05)}>
            <div className="tc-content tc-content-top">
              <h3>Everything works together.</h3>
              <p>One source of truth across sales, service, commerce, and support.</p>
            </div>
            <div className="tc-hero-image">
              <img src="/team/card1-everything.webp" alt="Unified activity across CRM, service, commerce, and support, shown for a sample customer" />
            </div>
          </motion.div>

          {/* Row 1, col 2 */}
          <motion.div className="team-card tone-slate" {...fadeUp(0.1)}>
            <div className="tc-content">
              <h3>See everything, miss nothing.</h3>
              <p>Real-time data across departments, roles, and channels.</p>
            </div>
            <div className="tc-visual">
              <img className="tc-photo" src="/team/card2-see-everything.jpg" alt="" />
              <TcBadge
                icon={<span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>$</span>}
                iconBg="#2554EB"
                label="Revenue"
                value="$24.8K"
                status="▲ 18%"
                statusColor="#0E9F6E"
                style={{ top: "6%", right: "6%" }}
              />
              <TcBadge
                icon={<Check size={11} color="#fff" />}
                iconBg="#6D4FEB"
                label="Deals"
                value="142"
                status="▲ 6%"
                statusColor="#0E9F6E"
                style={{ top: "34%", right: "5%" }}
              />
              <TcBadge
                icon={<span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>%</span>}
                iconBg="#0E9F6E"
                label="CSAT"
                value="96%"
                status="▼ 2%"
                statusColor="rgba(31,36,48,0.5)"
                style={{ bottom: "8%", left: "4%" }}
              />
            </div>
          </motion.div>

          {/* Row 1, col 3 */}
          <motion.div className="team-card tone-peach" {...fadeUp(0.15)}>
            <div className="tc-content">
              <h3>Automate what slows you down.</h3>
              <p>Actions, approvals, and updates run on their own. Your team focuses on what matters.</p>
              <div className="tc-steps">
                <TcStep icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />} iconBg="#2554EB" label="Lead created" sub="Sales" />
                <TcStep icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />} iconBg="#F5A123" label="Assign owner" sub="Sales" />
                <TcStep icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />} iconBg="#E1567C" label="Send welcome email" sub="Automation" />
                <TcStep icon={null} iconBg="transparent" label="Schedule follow-up" sub="In 2 days" done={false} />
              </div>
            </div>
            <div className="tc-visual">
              <img className="tc-photo" src="/team/card3-automate.jpg" alt="" />
            </div>
          </motion.div>

          {/* Row 2, col 1+2: spans 2 columns */}
          <motion.div className="team-card tone-lavender" style={{ gridColumn: "span 2" }} {...fadeUp(0.1)}>
            <div className="tc-content">
              <h3>Flexible for your future.</h3>
              <p>Scale teams, add products, or connect systems; EVOQ grows with you.</p>
              <div className="tc-apps">
                <div className="tc-app"><span className="tc-app-ic" style={{ background: "#2554EB" }}>C</span><div className="tc-app-col"><div className="tc-app-nm">CRM</div><div className="tc-app-st">Active</div></div><span className="tc-app-dot" /></div>
                <div className="tc-app"><span className="tc-app-ic" style={{ background: "#F5A123" }}>So</span><div className="tc-app-col"><div className="tc-app-nm">ServiceOps</div><div className="tc-app-st">Active</div></div><span className="tc-app-dot" /></div>
                <div className="tc-app"><span className="tc-app-ic" style={{ background: "#E1567C" }}>Co</span><div className="tc-app-col"><div className="tc-app-nm">Commerce</div><div className="tc-app-st">Active</div></div><span className="tc-app-dot" /></div>
                <div className="tc-summary">
                  <span className="tc-summary-check"><Check size={13} color="#fff" /></span>
                  <div>
                    <div className="tc-summary-title">10 / 10 apps active</div>
                    <div className="tc-summary-sub">All working. All connected.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tc-visual">
              <img className="tc-photo" src="/team/card4-flexible.jpg" alt="" />
              <TcBadge
                icon={<span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>P</span>}
                iconBg="#6D4FEB"
                label="Projects"
                value="Active"
                style={{ top: "10%", right: "8%" }}
              />
              <TcBadge
                icon={<span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>D</span>}
                iconBg="#0E8C82"
                label="Desk"
                value="Active"
                style={{ top: "42%", right: "3%" }}
              />
              <TcBadge
                icon={<span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>H</span>}
                iconBg="#1F7A4D"
                label="HRMS"
                value="Active"
                style={{ bottom: "10%", right: "10%" }}
              />
            </div>
          </motion.div>

          {/* Row 2, col 3 */}
          <motion.div className="team-card tone-mint" {...fadeUp(0.15)}>
            <div className="tc-content">
              <h3>Workflows, your way.</h3>
              <p>Customize how your processes run, without jumping between tools.</p>
              <div className="tc-steps">
                <TcStep icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />} iconBg="#2554EB" label="New Lead" sub="Web form" />
                <TcStep icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />} iconBg="#F5A123" label="Assign Owner" sub="Manager" />
                <TcStep icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />} iconBg="#0E9F6E" label="Send Email" sub="Automation" />
                <TcStep icon={null} iconBg="transparent" label="Follow Up" sub="In 2 days" done={false} />
              </div>
            </div>
            <div className="tc-visual">
              <img className="tc-photo" src="/team/card5-workflows.jpg" alt="" />
              <div className="tc-badge tc-condition" style={{ bottom: "10%", right: "4%" }}>
                <div className="tc-condition-hd">Condition</div>
                <div className="tc-condition-row"><span className="dot green" />Yes</div>
                <div className="tc-condition-row"><span className="dot" />No</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
