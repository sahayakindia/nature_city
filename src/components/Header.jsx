import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { NAV } from "../data/content";
import { SITE, whatsappLink } from "../config/site";
import { lockScroll, scrollToTarget, scrollTop } from "../hooks/lenis";
import { useEnquiry } from "./Enquiry";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();
  const { open: openEnquiry } = useEnquiry();

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname, loc.hash]);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (to) => (e) => {
    e.preventDefault();
    setOpen(false);
    const [path, hash] = to.split("#");
    const target = path || "/";
    if (target === loc.pathname && hash) {
      setTimeout(() => scrollToTarget("#" + hash), 120);
      window.history.replaceState(null, "", to);
    } else if (target === loc.pathname) {
      scrollTop(false);
    } else {
      nav(to);
    }
  };

  return (
    <>
      <header className={`header ${solid ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
        <Link to="/" className="header-logo" onClick={go("/")} aria-label="The Nature City — home">
          <Logo size="sm" />
        </Link>
        <p className="header-tag" aria-hidden="true">
          Experience The Nature City
        </p>
        <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"}>
          <span />
          <span />
        </button>
      </header>

      <div id="site-menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="menu-inner container">
          <nav aria-label="Main">
            <ul>
              {NAV.map((n, i) => (
                <li key={n.to} style={{ "--i": i }}>
                  <a href={n.to} onClick={go(n.to)} tabIndex={open ? 0 : -1}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <aside className="menu-aside">
            <p className="kicker">Speak to us</p>
            <a className="menu-contact" href={SITE.phoneHref} tabIndex={open ? 0 : -1}>
              {SITE.phone}
            </a>
            <a className="menu-contact small" href={whatsappLink()} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              Message on WhatsApp
            </a>
            <button className="btn btn-gold" tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); setTimeout(openEnquiry, 250); }}>
              Book a site visit
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}
