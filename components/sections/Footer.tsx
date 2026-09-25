import Image from "next/image";
import { IcLinkedIn, IcFacebook, IcInsta, IcYT } from "./shared";

export function Footer({ background, darkText = false }: { background?: string; darkText?: boolean } = {}) {
  return (
    <footer className={`evoq-footer${darkText ? " footer-ink" : ""}`} style={background ? { background } : undefined}>
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
            <li><a href="#">CRM</a></li>
            <li><a href="#">Campaigns</a></li>
          </ul>
          <h6 className="footer-subhead">People</h6>
          <ul>
            <li><a href="#">HRMS</a></li>
            <li><a href="#">Skillberry</a></li>
            <li><a href="#">Campaigns</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Operations</h6>
          <ul>
            <li><a href="#">ServiceOps</a></li>
            <li><a href="#">Desk</a></li>
            <li><a href="#">Inventory</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Sync</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Solutions</h6>
          <ul>
            <li><a href="/healthcare">Healthcare</a></li>
            <li><a href="/healthcare/crm">Healthcare CRM</a></li>
            <li><a href="/healthcare/practice-management">Healthcare Practice Management</a></li>
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Preferences</a>
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
