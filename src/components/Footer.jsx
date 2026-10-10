import { Link } from "react-router-dom";
import Logo from "./Logo";
import { SITE, whatsappLink } from "../config/site";
import { NAV } from "../data/content";
import { useEnquiry } from "./Enquiry";

export default function Footer() {
  const { open } = useEnquiry();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-h">Visit</p>
          <p>{SITE.officeAddress}</p>
          <p className="footer-sub">{SITE.location.label}</p>
          <a className="footer-link" href={SITE.location.mapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </div>
        <div>
          <p className="footer-h">Speak to us</p>
          <a className="footer-link" href={SITE.phoneHref}>{SITE.phone}</a>
          <a className="footer-link" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a className="footer-link" href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp</a>
          <button className="footer-link" onClick={open}>Book a site visit</button>
        </div>
        <div>
          <p className="footer-h">Explore</p>
          {NAV.filter((n) => n.label !== "Home").map((n) => (
            <Link key={n.to} className="footer-link" to={n.to}>{n.label}</Link>
          ))}
        </div>
      </div>
      <div className="container footer-logo">
        <Logo size="lg" />
        <p className="footer-promise">Soil that is alive, not paved over.</p>
      </div>
      <div className="container footer-legal">
        {(SITE.rera || SITE.approvals) && (
          <p>
            {SITE.rera && <>RERA No. {SITE.rera}. </>}
            {SITE.approvals}
          </p>
        )}
        <p>{SITE.disclaimer}</p>
        <p>© {new Date().getFullYear()} {SITE.builder}. All rights reserved.</p>
      </div>
    </footer>
  );
}
