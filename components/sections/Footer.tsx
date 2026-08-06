import { EvoqWord, IcLinkedIn, IcX, IcInsta, IcYT } from "./shared";

export function Footer() {
  return (
    <footer className="evoq-footer">
      <div className="grain"/>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="wordmark"><EvoqWord height={20} color="#FFFFFF"/></div>
          <div className="tagline">
            One Suite.<br/>
            <em>Endless Potential.</em>
          </div>
          <div className="subline">
            A unified business operating system for modern organizations.
          </div>
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
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
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
        <span>&#169; 2026 Social DNA Labs. All rights reserved.</span>
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
