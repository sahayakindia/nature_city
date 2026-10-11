import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEnquiry } from "./Enquiry";
import PlotScene from "./PlotScene";

/* Floating quote button for a real-estate site.
   - a land-plot scene on the button: a plot is surveyed, a house draws itself, a map pin drops onto the plot,
     birds drift through the air and grass sways
   - a signboard-style hint pops out with a message that matches what the visitor is looking at
     (and a live count of available plots on the layout / masterplan)
   - polite: shows after the entrance, never while a menu/pop-up is open, max 8 per visit, dismissable */

const LABEL = "Get a quote";   // ← button text
const OFF = "nc-genie-off";
const COUNT = "nc-genie-n";
const MAX_PER_VISIT = 8;
const SHOW_MS = 6500;

const SECTIONS = [
  ["hero", ".hero"], ["glance", ".glance-sec"], ["tathvas", "#tathvas"], ["zones", "#amenities"], ["day", "#day"],
  ["masterplan", "#masterplan"], ["sustainability", "#sustainability"], ["moments", "#moments"], ["location", "#location"], ["about", "#about"],
];
const HOME = {
  hero: "Planning a visit? Let's book your site visit.",
  glance: "250+ amenities across 90 acres. Want the full list?",
  tathvas: "Designed around the five elements. Ask us how.",
  day: "Picture your day here. Come and see it in person.",
  sustainability: "A zero-waste township. Want the details?",
  moments: "Like what you see? See it for real.",
  location: "On NH-26, 50 km from Visakhapatnam. Need directions?",
  about: "Questions about Mangal Realty? We're here to help.",
};
const PAGES = {
  "/amenities": "Which amenity interests you most? Ask us.",
  "/gallery": "Like what you see? Visit in person.",
  "/about": "Questions about Mangal Realty? We're here to help.",
};
const NUDGES = ["Questions? We'll call you back.", "Want a call back? Leave your number.", "Need help choosing a plot? Ask us."];

const safe = {
  get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} },
};

export default function GetInTouch() {
  const { open } = useEnquiry();
  const { pathname } = useLocation();
  const [away, setAway] = useState(false);
  const [section, setSection] = useState(null);
  const [plots, setPlots] = useState(null);
  const [bubble, setBubble] = useState(null); // { id, text, out }
  const [burst, setBurst] = useState(false);
  const [nudge, setNudge] = useState(false);

  const hoverBubble = useRef(false);
  const lastAt = useRef(0);
  const count = useRef(Number(safe.get(COUNT)) || 0);
  const off = useRef(safe.get(OFF) === "1");
  const latest = useRef({});
  latest.current = { pathname, section, plots, away, bubble };

  /* live number of available plots, from the same file the layout page uses */
  useEffect(() => {
    fetch("/plot-status.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setPlots(Object.values(d).filter((v) => v === "available").length))
      .catch(() => {});
  }, []);

  /* hide the whole widget while the on-page enquiry form is on screen so it never covers the fields */
  useEffect(() => {
    setAway(false);
    let io;
    const t = setTimeout(() => {
      const els = document.querySelectorAll("#enquire, .enquire");
      if (!els.length) return;
      io = new IntersectionObserver((es) => setAway(es.some((e) => e.isIntersecting)), { threshold: 0.12 });
      els.forEach((el) => io.observe(el));
    }, 500);
    return () => { clearTimeout(t); io && io.disconnect(); };
  }, [pathname]);

  /* which part of the page is in the middle of the screen */
  useEffect(() => {
    let raf = 0;
    const pick = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let found = null;
      for (const [key, sel] of SECTIONS) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { found = key; break; }
      }
      setSection((p) => (p === found ? p : found));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(pick); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [pathname]);

  const messageFor = useCallback(() => {
    const { pathname: p, section: s, plots: n } = latest.current;
    if (p === "/layout") return n != null ? `${n} plots currently available. Ask for yours.` : "Need help choosing a plot? Ask us.";
    if (p !== "/") return PAGES[p] || NUDGES[0];
    if (s === "masterplan") return n != null ? `${n} plots currently available. Want to see them?` : "Curious about a plot? We'll walk you through it.";
    if (s === "zones") {
      const name = document.querySelector(".core-name")?.textContent;
      return name ? `Curious about ${name}? Ask us anything.` : "Gardens, sports or the club house? Ask us.";
    }
    return HOME[s] || NUDGES[0];
  }, []);

  const hide = useCallback(() => {
    setBubble((b) => (b ? { ...b, out: true } : b));
    setTimeout(() => setBubble((b) => (b && b.out ? null : b)), 320);
  }, []);

  const say = useCallback((text) => {
    const { away: aw, bubble: b } = latest.current;
    if (off.current || aw || b || count.current >= MAX_PER_VISIT) return;
    if (document.documentElement.classList.contains("is-gated")) return;   // menu / pop-up / entrance is open
    count.current += 1; safe.set(COUNT, String(count.current));
    lastAt.current = Date.now();
    setBubble({ id: Date.now(), text: text || messageFor() });
  }, [messageFor]);

  /* first hello, a few seconds after the entrance lifts */
  useEffect(() => {
    const html = document.documentElement;
    let t, mo;
    const arm = () => { t = setTimeout(() => say(), 3500); };
    if (html.classList.contains("ready")) arm();
    else {
      mo = new MutationObserver(() => { if (html.classList.contains("ready")) { mo.disconnect(); arm(); } });
      mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    }
    return () => { clearTimeout(t); mo && mo.disconnect(); };
  }, [say]);

  /* react to the visitor moving to a new section / page (after they've settled there) */
  useEffect(() => {
    if (!document.documentElement.classList.contains("ready")) return;
    /* wait until they've settled (1.1s) and the 12s gap since the last hint is over; leaving the section cancels it */
    const wait = Math.max(1100, 12000 - (Date.now() - lastAt.current) + 300);
    const t = setTimeout(() => say(), wait);
    return () => clearTimeout(t);
  }, [section, pathname, say]);

  /* a gentle nudge if they've been idle for a while, and a little wiggle to catch the eye */
  useEffect(() => {
    let k = 0;
    const idle = setInterval(() => {
      if (Date.now() - lastAt.current > 28000 && document.documentElement.classList.contains("ready")) say(NUDGES[k++ % NUDGES.length]);
    }, 8000);
    const wig = setInterval(() => { setNudge(true); setTimeout(() => setNudge(false), 950); }, 9000);
    return () => { clearInterval(idle); clearInterval(wig); };
  }, [say]);

  /* auto-hide the bubble */
  useEffect(() => {
    if (!bubble || bubble.out) return;
    const t = setTimeout(() => { hoverBubble.current ? null : hide(); }, SHOW_MS);
    return () => clearTimeout(t);
  }, [bubble, hide]);

  const dismiss = (e) => { e.stopPropagation(); off.current = true; safe.set(OFF, "1"); hide(); };
  const go = () => {
    setBurst(true); setTimeout(() => setBurst(false), 800);
    if (bubble) hide();
    open();
  };

  if (pathname === "/contact") return null;
  const talking = !!bubble && !bubble.out;
  return (
    <div className={`gt ${away ? "is-away" : ""} ${talking ? "is-talking" : ""} ${burst ? "is-burst" : ""}`} aria-hidden={away}>
      {bubble && (
        <div className={`gt-bubble ${bubble.out ? "is-out" : ""}`} key={bubble.id} aria-hidden="true"
          onMouseEnter={() => (hoverBubble.current = true)} onMouseLeave={() => (hoverBubble.current = false)}>
          <button className="gt-say" tabIndex={-1} onClick={go}>{bubble.text}</button>
          <button className="gt-x" tabIndex={-1} onClick={dismiss} aria-label="Hide hints">×</button>
        </div>
      )}

      <button className="gt-btn" onClick={go} tabIndex={away ? -1 : 0} aria-label={LABEL}>
        <span className="gt-sign">
          <svg className="gt-chain" viewBox="0 0 40 8" preserveAspectRatio="none" aria-hidden="true"><path d="M1 8L20 0L39 8" /></svg>
          <span className="gt-plate gt-label">{LABEL}</span>
        </span>
        <span className={`gt-badge ${nudge ? "hop" : ""}`} aria-hidden="true"><PlotScene /></span>
      </button>
    </div>
  );
}
