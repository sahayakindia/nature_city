import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEnquiry } from "./Enquiry";
import { Chat } from "./Icons";

export default function GetInTouch() {
  const { open } = useEnquiry();
  const { pathname } = useLocation();
  const [away, setAway] = useState(false);

  /* hide the floating pill while the on-page enquiry form is on screen so it never covers the fields */
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

  if (pathname === "/contact") return null;
  return (
    <button className={`touch-pill ${away ? "is-away" : ""}`} onClick={open} tabIndex={away ? -1 : 0} aria-hidden={away}>
      Get in touch
      <span className="touch-dot"><Chat /></span>
    </button>
  );
}
