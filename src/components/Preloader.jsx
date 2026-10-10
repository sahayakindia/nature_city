import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { TathvaIcon } from "./Icons";
import { lockScroll } from "../hooks/lenis";

const ICONS = ["earth", "water", "fire", "air", "space"];
const SHOW_MS = 4000;   // the entrance lifts on its own after 2 seconds
const LEAVE_MS = 800;   // lift-away animation
let shownThisLoad = false; // plays on every fresh load / refresh, not on in-app navigation

export default function Preloader() {
  const [phase, setPhase] = useState(shownThisLoad ? "gone" : "show"); // show | leave | gone
  const phaseRef = useRef(phase);
  const timers = useRef([]);
  phaseRef.current = phase;

  function enter() {
    if (phaseRef.current !== "show") return;
    timers.current.forEach(clearTimeout);
    setPhase("leave");
    timers.current = [
      setTimeout(() => {
        shownThisLoad = true;
        setPhase("gone");
        lockScroll(false, "gate");
        document.documentElement.classList.add("ready");
      }, LEAVE_MS),
    ];
  }

  useEffect(() => {
    if (phase === "gone") {
      document.documentElement.classList.add("ready");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lockScroll(true, "gate");
    /* enters automatically: 2s after the page started loading (not 2s after the script finished) */
    const wait = reduce ? 500 : Math.max(1400, SHOW_MS - performance.now());
    timers.current = [setTimeout(enter, wait)];
    const onKey = (e) => {                                          // optional early skip
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") { e.preventDefault(); enter(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line
  }, []);

  if (phase === "gone") return null;
  return (
    <div className={`preloader ${phase === "leave" ? "is-leaving" : ""}`} role="status" aria-label="Loading The Nature City" onClick={enter}>
      <div className="pre-icons" aria-hidden="true">
        {ICONS.map((n, i) => (
          <span key={n} style={{ "--d": `${0.1 + i * 0.14}s` }}>
            <TathvaIcon name={n} />
          </span>
        ))}
      </div>
      <p className="pre-label">Experience The Nature City</p>
      <div className="pre-logo"><Logo size="lg" /></div>
      <button className="pre-tap" onClick={(e) => { e.stopPropagation(); enter(); }}>Tap to skip</button>
    </div>
  );
}
