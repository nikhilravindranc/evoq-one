/* global React, ReactDOM */
/* depends on: sections-shared.jsx + sections-styles.jsx */

const {
  ArrowRt, Check, CheckOutline, Bolt, MailIc, Person, SyncIc, Spark,
  IcLinkedIn, IcX, IcInsta, IcYT, EvoqWord, Eyebrow, evoqSectionStyles
} = window;

/* ============================================================
   SECTION 1 — One Unified Platform
   ============================================================ */

function SectionPlatform() {
  return (
    <section className="s-platform" data-screen-label="02 Unified Platform">
      <div className="s-platform-inner">
        <div className="evoq-section-head">
          <h2 className="evoq-h2">One <span className="accent">unified</span> platform.</h2>
          <p className="evoq-sub">Pick one app or use all four. Either way, your data moves with you.</p>
        </div>

        <div className="platform-grid">
          {/* CRM */}
          <div className="product-card v-crm">
            <div className="product-eyebrow">
              <span className="swatch"><Person size={9} color="#fff"/></span>
              <span>EVOQ · CRM</span>
            </div>
            <h3 className="product-title">Close more deals with less effort</h3>
            <div className="pc-mock">
              <div className="pc-mock-hd"><span>Pipeline</span><span>4 leads</span></div>
              <div className="pc-row">
                <div className="lead"><span className="name">Acme Corp</span><span className="sub">Follow-up · Due today</span></div>
                <span className="pill solid">Proposal</span>
              </div>
              <div className="pc-row">
                <div className="lead"><span className="name">Bright Solutions</span><span className="sub">Demo scheduled</span></div>
                <span className="pill tint">Qualified</span>
              </div>
              <div className="pc-row">
                <div className="lead"><span className="name">Nova Retail</span><span className="sub">Contract sent</span></div>
                <span className="pill outline">Closing</span>
              </div>
              <div className="pc-row">
                <div className="lead"><span className="name">Peak Industries</span><span className="sub">New lead · Uncontacted</span></div>
                <span className="pill ghost">New</span>
              </div>
            </div>
          </div>

          {/* SYNC */}
          <div className="product-card v-sync">
            <div className="product-eyebrow">
              <span className="swatch"><SyncIc size={9} color="#fff"/></span>
              <span>EVOQ · SYNC</span>
            </div>
            <h3 className="product-title">Your data moves the moment it should</h3>
            <div className="pc-mock">
              <div className="pc-mock-hd"><span>Connections</span><span>3 live</span></div>
              <div className="sync-row">
                <span className="label"><span className="swatch" style={{background: "var(--primary)"}}/>EVOQ CRM</span>
                <span className="pill tint">Live</span>
              </div>
              <div style={{textAlign: "center"}}><span className="sync-link">↑ Auto-sync</span></div>
              <div className="sync-row">
                <span className="label"><span className="swatch" style={{background: "var(--bright)"}}/>EVOQ Projects</span>
                <span className="pill tint">Live</span>
              </div>
              <div style={{textAlign: "center"}}><span className="sync-link">↓ Auto-sync</span></div>
              <div className="sync-row">
                <span className="label"><span className="swatch" style={{background: "var(--tint)"}}/>ServiceOps</span>
                <span className="pill tint">Live</span>
              </div>
              <div style={{textAlign: "center"}}><span className="sync-link" style={{background: "var(--background)", color: "var(--muted)"}}>3rd party</span></div>
              <div className="sync-row">
                <span className="label"><span className="swatch" style={{background: "var(--subtle)"}}/>External Tool</span>
                <span className="pill ghost">Connect</span>
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="product-card v-projects">
            <div className="product-eyebrow">
              <span className="swatch"><Check size={9} color="#fff"/></span>
              <span>EVOQ · PROJECTS</span>
            </div>
            <h3 className="product-title">Every project, on time, every time</h3>
            <div className="pc-mock">
              <div className="proj-hd"><span className="left">Q3 Delivery</span><span className="right">66% Complete</span></div>
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
          </div>

          {/* SERVICEOPS */}
          <div className="product-card v-serviceops">
            <div className="product-eyebrow">
              <span className="swatch"><Spark size={9} color="#fff"/></span>
              <span>EVOQ · SERVICEOPS</span>
            </div>
            <h3 className="product-title">Service requests handled automatically</h3>
            <div className="pc-mock">
              <div className="ticket">
                <div className="ticket-hd"><span>#T-1042</span><span className="pill solid">Open</span></div>
                <div className="ticket-title">AC unit not cooling — Floor 3</div>
                <div className="ticket-sub">Assigned to Rahul · 7h ago</div>
              </div>
              <div className="ticket">
                <div className="ticket-hd"><span>#T-1041</span><span className="pill outline">In progress</span></div>
                <div className="ticket-title">Printer offline — Reception</div>
                <div className="ticket-sub">Assigned to Priya · 5h ago</div>
              </div>
              <div className="ticket">
                <div className="ticket-hd"><span>#T-1040</span><span className="pill tint">Resolved</span></div>
                <div className="ticket-title">Door lock malfunction — Gate B</div>
                <div className="ticket-sub">Closed · Yesterday</div>
              </div>
              <div className="ticket">
                <div className="ticket-hd"><span>#T-1039</span><span className="pill ghost">Pending</span></div>
                <div className="ticket-title">Water dispenser replacement</div>
                <div className="ticket-sub">Unassigned · 1d ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 2 — AI Assist (DARK)
   ============================================================ */

function SectionAI() {
  return (
    <section className="s-ai" data-screen-label="03 AI Assist">
      <div className="grain"/>
      <div className="vignette"/>
      <div className="s-ai-inner">
        <div className="ai-copy">
          <Eyebrow dark>★ EVOQ AI Assist</Eyebrow>
          <h2 className="evoq-h2 dark">
            Intelligence is built into <span className="accent">every workflow.</span>
          </h2>
          <p className="lead">
            Meet Evoq AI Assist, a context-aware AI that thinks across your entire
            suite, recommends what to do next, and executes work at scale.
          </p>
          <p className="body">
            Most tools give you data. EVOQ Assist gives you decisions. It reads across
            your CRM, service jobs, and projects, then tells you what needs attention,
            what can wait, and what it handles for you.
          </p>
        </div>

        <div className="ai-card">
          <div className="ai-input">
            <div>
              <div className="placeholder">Ask Evoq AI Assist about your business…</div>
              <div className="micro"><span>@</span><span>+</span><span>★</span></div>
            </div>
            <button className="ai-send" aria-label="Send"><ArrowRt color="#fff"/></button>
          </div>

          <div className="ai-suggestion">
            <span>Summarise stalled deals this week</span>
            <span className="arr"><ArrowRt size={12}/></span>
          </div>
          <div className="ai-suggestion">
            <span>Draft follow-up email for Acme Corp</span>
            <span className="arr"><ArrowRt size={12}/></span>
          </div>
          <div className="ai-suggestion">
            <span>Show jobs at risk of delay</span>
            <span className="arr"><ArrowRt size={12}/></span>
          </div>

          <div className="ai-cta-row">
            <div className="agent"><span className="av"/>Evoq AI · ready</div>
            <button className="ai-cta-plan">
              <span>Create a Project Plan</span>
              <span className="ic"><ArrowRt size={11} color="#fff"/></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 3 — Engineered for Modern Teams
   ============================================================ */

function SectionTeams() {
  return (
    <section className="s-teams" data-screen-label="04 Engineered for Modern Teams">
      <div className="s-teams-inner">
        <div className="evoq-section-head">
          <h2 className="evoq-h2">Engineered for <span className="accent">modern teams.</span></h2>
          <p className="evoq-sub">EVOQ runs sales, service, operations, and support, so your teams stay in sync and decisions happen faster.</p>
        </div>

        <div className="teams-grid">
          {/* Row 1, col 1: featured — Everything works together */}
          <div className="team-card featured p-rings-tl">
            <h3>Everything works together.</h3>
            <p>One source of truth across sales, service, commerce, and support.</p>
            <div className="team-mock">
              <div className="act-card">
                <div className="act-hd"><span>Unified Activity</span><span className="live">Live</span></div>
                <div className="act-row">
                  <span className="badge"/>
                  <div className="col"><div className="l">CRM</div><div className="v">Deal won · Acme Corp</div></div>
                  <span className="state">Won</span>
                </div>
                <div className="act-row">
                  <span className="badge bright"/>
                  <div className="col"><div className="l">ServiceOps</div><div className="v">Ticket closed · #482</div></div>
                  <span className="state" style={{color: "var(--muted)"}}>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 1, col 2: See everything */}
          <div className="team-card p-rings-tr">
            <h3>See everything, miss nothing.</h3>
            <p>Real-time data across departments, roles, and channels.</p>
            <div className="team-mock">
              <div className="overview-card">
                <div className="ov-hd">
                  <span className="title">Live Overview</span>
                  <span className="badge">Real-time</span>
                </div>
                <div className="ov-stats">
                  <div className="ov-stat"><div className="v">$24.8k</div><div className="l">Revenue</div><div className="d">▲ 18%</div></div>
                  <div className="ov-stat"><div className="v">142</div><div className="l">Deals</div><div className="d">▲ 6%</div></div>
                  <div className="ov-stat"><div className="v">96%</div><div className="l">CSAT</div><div className="d down">▼ 2%</div></div>
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
          </div>

          {/* Row 1, col 3: Automate */}
          <div className="team-card p-rings-br">
            <h3>Automate what slows you down.</h3>
            <p>Actions, approvals, and updates run on their own. Your team focuses on what matters.</p>
            <div className="team-mock">
              <div className="wf-card">
                <div className="wf-hd">
                  <span className="ttl">Workflow Builder</span>
                  <span className="live">Live</span>
                </div>
                <div className="wf-step">
                  <span className="icon"><Bolt size={11} color="#5C5CFF"/></span>
                  <div className="col"><div className="l">Trigger</div><div className="v">Deal marked as won</div></div>
                  <Check size={14} color="#5C5CFF"/>
                </div>
                <div className="wf-step">
                  <span className="icon"><MailIc size={11} color="#5C5CFF"/></span>
                  <div className="col"><div className="l">Action</div><div className="v">Send welcome email</div></div>
                  <Check size={14} color="#5C5CFF"/>
                </div>
                <div className="wf-step ghost">
                  <span className="icon" style={{background: "transparent", borderStyle: "dashed", borderColor: "var(--tint)"}}/>
                  <div className="col"><div className="l">Action</div><div className="v">Assign account manager</div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2, col 1+2: Flexible (spans 2) */}
          <div className="team-card p-rings-rc" style={{gridColumn: "span 2"}}>
            <h3>Flexible for your future.</h3>
            <p>Scale teams, add products, or connect systems; EVOQ grows with you.</p>
            <div className="team-mock">
              <div className="apps-card">
                <div className="apps-hd"><span>Apps installed</span><span className="count">8 / 12</span></div>
                <div className="apps-grid" style={{gridTemplateColumns: "repeat(6, 1fr)"}}>
                  <div className="app-tile"><div className="ic">C</div><div className="nm">CRM</div><div className="st">Active</div></div>
                  <div className="app-tile"><div className="ic bright">So</div><div className="nm">ServiceOps</div><div className="st">Active</div></div>
                  <div className="app-tile"><div className="ic mid">Co</div><div className="nm">Commerce</div><div className="st">Add-on</div></div>
                  <div className="app-tile"><div className="ic deep">P</div><div className="nm">Projects</div><div className="st">Live</div></div>
                  <div className="app-tile"><div className="ic charcoal">I</div><div className="nm">Integrations</div><div className="st">12 apps</div></div>
                  <div className="app-tile ghost">+</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2, col 3: Workflows your way */}
          <div className="team-card p-rings-bl">
            <h3>Workflows, your way.</h3>
            <p>Customize how your processes run, without jumping between tools.</p>
            <div className="team-mock">
              <div className="flow-card">
                <div className="flow-row"><span className="chk"><Check size={10} color="#fff"/></span>New Lead</div>
                <div className="flow-row"><span className="chk"><Check size={10} color="#fff"/></span>Assign Owner</div>
                <div className="flow-row"><span className="chk"><Check size={10} color="#fff"/></span>Send Email</div>
                <div className="flow-row ghost"><span className="chk"/>Follow Up</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 4 — Real Business Impact
   ============================================================ */

function SectionImpact() {
  return (
    <section className="s-impact" data-screen-label="05 Real Business Impact">
      <div className="s-impact-inner">
        <div className="evoq-section-head">
          <h2 className="evoq-h2">Real business <span className="accent">impact.</span></h2>
          <p className="evoq-sub">Real results from real businesses who chose unified operations over scattered tools.</p>
        </div>

        <div className="impact-stats">
          <div className="stat">
            <div className="v">90%</div>
            <div className="l">Spent on manual updates and cross-tool reporting</div>
          </div>
          <div className="stat">
            <div className="v">30%</div>
            <div className="l">After workflow automation and shared visibility</div>
          </div>
          <div className="stat">
            <div className="v">15%</div>
            <div className="l">Through loyalty programs, repeat purchases, and stronger</div>
          </div>
          <div className="stat">
            <div className="v">100%</div>
            <div className="l">Across tools and roles. No silos, no guesswork, just clarity.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 5 — Start with one. Scale with all.
   ============================================================ */

function SectionCTA() {
  return (
    <section className="s-cta" data-screen-label="06 Start CTA">
      <div className="s-cta-inner">
        <div className="cta-left">
          <h2 className="evoq-h2">Start with one.<br/><span className="accent">Scale with all.</span></h2>
          <p>
            Every EVOQ app is complete on its own. Connect two and your data flows
            automatically. Use all four and you have a fully unified business operating system.
          </p>
          <button className="cta-talk">
            <span>Talk to us</span>
            <span className="ic"><ArrowRt color="#fff"/></span>
          </button>
        </div>

        <div className="steps">
          <div className="step">
            <div className="num">01</div>
            <div className="text">
              <h4>Pick the app your team needs today</h4>
              <p>Each app is fully standalone. Start with whichever solves your most immediate challenge — no compromises, no dependencies required.</p>
            </div>
          </div>
          <div className="step">
            <div className="num">02</div>
            <div className="text">
              <h4>Add another app, data connects automatically</h4>
              <p>No imports, no re-entry. The moment you add a second app, EVOQ recognises it and begins sharing data in real time across your business.</p>
            </div>
          </div>
          <div className="step">
            <div className="num">03</div>
            <div className="text">
              <h4>Run your entire business from one suite</h4>
              <p>All four apps work as a single operating system — one source of truth, zero duplication, complete visibility across every team.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER — DARK
   ============================================================ */

function Footer() {
  return (
    <footer className="evoq-footer" data-screen-label="07 Footer">
      <div className="grain"/>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="wordmark"><EvoqWord height={20} color="#FFFFFF"/></div>
          <div className="tagline">One Suite.<br/><em>Endless Potential.</em></div>
          <div className="subline">A unified business operating system for modern organizations.</div>
        </div>
        <div className="footer-col">
          <h6>Products</h6>
          <ul>
            <li><a href="#">CRM</a></li>
            <li><a href="#">Sync</a></li>
            <li><a href="#">Skillberry</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">ServiceOps</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h6>Learn</h6>
          <ul>
            <li><a href="#">Why EVOQ?</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Customers</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h6>Company</h6>
          <ul>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h6>Legal</h6>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Preferences</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Social DNA Labs. All rights reserved.</span>
        <div className="socials">
          <a href="#" aria-label="LinkedIn"><IcLinkedIn/></a>
          <a href="#" aria-label="X"><IcX/></a>
          <a href="#" aria-label="Instagram"><IcInsta/></a>
          <a href="#" aria-label="YouTube"><IcYT/></a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- assemble ---------- */

function Page() {
  return (
    <div className="evoq-page">
      <style>{evoqSectionStyles}</style>
      <SectionPlatform />
      <SectionAI />
      <SectionTeams />
      <SectionImpact />
      <SectionCTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("sections-mount")).render(<Page />);
