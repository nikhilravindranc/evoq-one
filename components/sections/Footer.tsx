import Image from "next/image";
import { IcLinkedIn, IcFacebook, IcInsta, IcYT } from "./shared";

export function Footer({ background, darkText = false, socialHover }: { background?: string; darkText?: boolean; socialHover?: string } = {}) {
  return (
    <footer className={`evoq-footer${darkText ? " footer-ink" : ""}`} style={background || socialHover ? ({ ...(background ? { background } : {}), ...(socialHover ? { "--footer-social-hover": socialHover } : {}) } as React.CSSProperties) : undefined}>
      <div className="grain"/>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="wordmark">
            <Image
              src="/white-logo.png"
              alt="EVOQ"
              height={30}
              width={30 * (1127 / 230)}
              style={{ height: 30, width: "auto", filter: darkText ? "brightness(0)" : "brightness(0) invert(1)" }}
            />
          </div>
          <div className="tagline">One Suite. Endless Potential.</div>
          <div className="subline">
            A unified business operating system for modern organizations.
          </div>
        </div>

        <div className="footer-col">
          <h6>Growth</h6>
          <ul>
            <li><a href="/products/crm"><img className="footer-pic" src="/footer-icons/crm.png" alt="" width={18} height={18} />CRM</a></li>
            <li><a href="/products/campaigns"><img className="footer-pic" src="/footer-icons/campaigns.png" alt="" width={18} height={18} />Campaigns</a></li>
            <li><a href="/products/configx"><img className="footer-pic" src="/footer-icons/configx.png" alt="" width={18} height={18} />ConfigX</a></li>
          </ul>
          <h6 className="footer-subhead">People</h6>
          <ul>
            <li><a href="/products/hrms"><img className="footer-pic" src="/footer-icons/hrms.png" alt="" width={18} height={18} />HRMS</a></li>
            <li><a href="/products/skillberry"><img className="footer-pic" src="/footer-icons/skillberry.png" alt="" width={18} height={18} />Skillberry</a></li>
          </ul>
          <ul className="footer-ai">
            <li><a href="/products/ai"><img className="footer-pic" src="/footer-icons/ai.svg" alt="" width={18} height={18} />EVOQ AI</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Operations</h6>
          <ul>
            <li><a href="/products/serviceops"><img className="footer-pic" src="/footer-icons/serviceops.svg" alt="" width={18} height={18} />ServiceOps</a></li>
            <li><a href="/products/projects"><img className="footer-pic" src="/footer-icons/projects.png" alt="" width={18} height={18} />Projects</a></li>
            <li><a href="/products/desk"><img className="footer-pic" src="/footer-icons/desk.png" alt="" width={18} height={18} />Desk</a></li>
          </ul>
          <h6 className="footer-subhead">Finance</h6>
          <ul>
            <li><a href="/products/billing"><img className="footer-pic" src="/footer-icons/billing.png" alt="" width={18} height={18} />Billing</a></li>
            <li><a href="/products/inventory"><img className="footer-pic" src="/footer-icons/inventory.png" alt="" width={18} height={18} />Inventory</a></li>
          </ul>
          <h6 className="footer-subhead">Platform</h6>
          <ul>
            <li><a href="/products/sync"><img className="footer-pic" src="/footer-icons/sync.png" alt="" width={18} height={18} />Sync</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Solutions</h6>
          <ul>
            <li><a href="/solutions/healthcare">Healthcare</a></li>
            <li><a href="/solutions/healthcare/patient-relationships">Patient Relationships</a></li>
            <li><a href="/solutions/healthcare/practice-management">Practice Management</a></li>
            <li><a href="/solutions/healthcare/patient-engagement">Patient Engagement</a></li>
            <li><a href="/solutions/manufacturing">Manufacturing</a></li>
            <li><a href="/solutions/construction-engineering-real-estate">Construction, Engineering &amp; Real Estate</a></li>
            <li><a href="/solutions/field-service-facilities-maintenance">Field Service, Facilities &amp; Maintenance</a></li>
            <li><a href="/solutions/hospitality-travel-food-and-beverage">Hospitality, Travel &amp; F&amp;B</a></li>
            <li><a href="/solutions/financial-services">Financial Services</a></li>
            <li><a href="/industries">All Industries</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Company</h6>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/why-evoq">Why EVOQ?</a></li>
            <li><a href="/implementation">Implementation</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&#169; 2026 All rights reserved.</span>
        <div className="footer-bottom-right">
        <nav className="footer-legal" aria-label="Legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="/cookie-preferences">Cookie Preferences</a>
        </nav>
        <div className="socials">
          <a href="#" aria-label="LinkedIn"><IcLinkedIn/></a>
          <a href="#" aria-label="Facebook"><IcFacebook/></a>
          <a href="#" aria-label="Instagram"><IcInsta/></a>
          <a href="#" aria-label="YouTube"><IcYT/></a>
        </div>
        </div>
      </div>
    </footer>
  );
}
