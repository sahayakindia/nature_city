import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import AboutContent from "./AboutContent";
import { Chevron, Mail, Phone, Whatsapp } from "./Icons";
import { NAV } from "../data/content";
import { SITE, whatsappLink } from "../config/site";
import { lockScroll, scrollToTarget, scrollTop } from "../hooks/lenis";
import { useEnquiry } from "./Enquiry";

/* Desktop navigation (≥1100px). Items with `children` open a dropdown; `about` opens the About panel. */
const DESKTOP = [
  { label: "Home", to: "/" },
  { label: "Layout", to: "/layout" },
  { label: "Amenities", to: "/amenities" },
  {
    label: "Experience", id: "exp",
    children: [
      { label: "Five Tathvas", note: "The five elements, one way of living", to: "/#tathvas" },
      { label: "A day here", note: "From sunrise to starlight", to: "/#day" },
      { label: "Gallery", note: "Renders and views", to: "/gallery" },
      { label: "Location", note: "NH-26, 50 km from Visakhapatnam", to: "/#location" },
    ],
  },
  { label: "About", id: "about", about: true },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);       // full-screen menu (phones / tablets)
  const [mAbout, setMAbout] = useState(false);   // About accordion inside that menu
  const [dd, setDd] = useState(null);            // open desktop dropdown id
  const [solid, setSolid] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();
  const { open: openEnquiry } = useEnquiry();
  const navRef = useRef(null);
  const timer = useRef(0);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); setDd(null); }, [loc.pathname, loc.hash]);

  useEffect(() => {
    lockScroll(open, "menu");
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* close dropdowns on outside click / Esc */
  useEffect(() => {
    const onDoc = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setDd(null); };
    const onKey = (e) => e.key === "Escape" && setDd(null);
    document.addEventListener("pointerdown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDoc); window.removeEventListener("keydown", onKey); };
  }, []);

  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const enter = (id) => () => { if (!canHover()) return; clearTimeout(timer.current); setDd(id); };
  const leave = () => { if (!canHover()) return; clearTimeout(timer.current); timer.current = setTimeout(() => setDd(null), 220); };

  const go = (to) => (e) => {
    e?.preventDefault();
    setOpen(false);
    setDd(null);
    const [path, hash] = to.split("#");
    const target = path || "/";
    if (hash === "about") window.dispatchEvent(new Event("nc:open-about"));   // expands the About dropdown on the page
    if (target === loc.pathname && hash) {
      setTimeout(() => scrollToTarget("#" + hash), 120);
      window.history.replaceState(null, "", to);
    } else if (target === loc.pathname) {
      scrollTop(false);
    } else {
      nav(to);
    }
  };

  const isOn = (to) => to && !to.includes("#") && (to === "/" ? loc.pathname === "/" && !loc.hash : loc.pathname.startsWith(to));

  return (
    <>
      <header className={`header ${solid ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
        <Link to="/" className="header-logo" onClick={go("/")} aria-label="The Nature City — home">
          <Logo variant="full" />
        </Link>

        <p className="header-tag" aria-hidden="true">Experience The Nature City</p>

        {/* desktop navigation */}
        <nav className="header-nav" aria-label="Main" ref={navRef}>
          <ul>
            {DESKTOP.map((n) => {
              const isOpen = dd === n.id;
              if (!n.children && !n.about) {
                return (
                  <li key={n.label}>
                    <a className={`nav-link ${isOn(n.to) ? "is-on" : ""}`} href={n.to} onClick={go(n.to)}>{n.label}</a>
                  </li>
                );
              }
              return (
                <li key={n.label} className={`has-dd ${isOpen ? "is-open" : ""}`} onMouseEnter={enter(n.id)} onMouseLeave={leave}>
                  <button className="nav-link" aria-haspopup="true" aria-expanded={isOpen} onClick={() => setDd(isOpen ? null : n.id)}>
                    {n.label}
                    <span className="nav-chev" aria-hidden="true"><Chevron dir="down" /></span>
                  </button>
                  {n.children && (
                    <div className="dd" role="menu">
                      {n.children.map((c) => (
                        <a key={c.label} role="menuitem" href={c.to} onClick={go(c.to)}>
                          <b>{c.label}</b>
                          <small>{c.note}</small>
                        </a>
                      ))}
                    </div>
                  )}
                  {n.about && (
                    <div className="dd dd-wide" aria-label="About Mangal Realty">
                      <div className="dd-head">
                        <p className="kicker">About the builder</p>
                        <h2 className="dd-title">Mangal Realty. <span className="accent">Auspicious, prosperous, blissful.</span></h2>
                      </div>
                      <AboutContent compact />
                      <a className="dd-more" href="/#about" onClick={go("/#about")}>Open the About section</a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="hact" href={`mailto:${SITE.email}`} aria-label="Email us"><Mail /></a>
          <a className="hact hact-wa" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><Whatsapp /></a>
          <a className="hact" href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`}><Phone /></a>
          <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"}>
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* full-screen menu for phones and tablets */}
      <div id="site-menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="menu-inner container">
          <nav aria-label="Main">
            <ul>
              {NAV.map((n, i) => (
                <li key={n.to} style={{ "--i": i }}>
                  {n.to === "/#about" ? (
                    <>
                      <button className="menu-acc" aria-expanded={mAbout} aria-controls="menu-about" tabIndex={open ? 0 : -1} onClick={() => setMAbout((v) => !v)}>
                        About Mangal <span className="menu-acc-chev" aria-hidden="true"><Chevron dir="down" /></span>
                      </button>
                      <div id="menu-about" className={`menu-acc-panel ${mAbout ? "is-open" : ""}`}>
                        <div className="menu-acc-inner">
                          <AboutContent compact />
                          <a className="dd-more" href="/#about" tabIndex={open && mAbout ? 0 : -1} onClick={go("/#about")}>Open the About section</a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <a href={n.to} onClick={go(n.to)} tabIndex={open ? 0 : -1}>{n.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <aside className="menu-aside">
            <p className="kicker">Speak to us</p>
            <a className="menu-contact" href={SITE.phoneHref} tabIndex={open ? 0 : -1}>{SITE.phone}</a>
            <a className="menu-contact small" href={whatsappLink()} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Message on WhatsApp</a>
            <button className="btn btn-gold" tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); setTimeout(openEnquiry, 250); }}>
              Book a site visit
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}
