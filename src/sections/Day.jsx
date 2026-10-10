import { useId, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { DAY } from "../data/content";
import { getLenis } from "../hooks/lenis";

const N = DAY.length;
/* true semicircle: centre (200,200), radius 180, horizon y=200 */
const CX = 200, CY = 200, R = 180;
const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

export default function Day() {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setP(v);
    setI(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  const jump = (n) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (el.offsetHeight - window.innerHeight) * ((n + 0.5) / N);
    const l = getLenis();
    l ? l.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  const d = DAY[i];
  const night = i >= 5;
  /* 0 = first stop on the left horizon, 1 = last stop on the right horizon; sits exactly on each stop at its slot centre */
  const u = Math.min(1, Math.max(0, (p * N - 0.5) / (N - 1)));
  const ang = Math.PI * (1 - u);
  const bx = CX + R * Math.cos(ang);
  const by = CY - R * Math.sin(ang);

  return (
    <section className="day" id="day" ref={ref} style={{ height: `${N * 92 + 40}vh` }} aria-label="A day at The Nature City">
      <div className="day-pin">
        <div className="day-sky" aria-hidden="true">
          {DAY.map((x, n) => (
            <span key={x.time} className={n === i ? "is-on" : ""} style={{ background: `linear-gradient(170deg, ${x.sky[0]} 0%, ${x.sky[1]} 140%)` }} />
          ))}
          <div className="day-veil" />
        </div>

        <div className="container day-grid">
          <div className="day-left">
            <p className="kicker">A day at The Nature City</p>

            <div className="sun-dial">
              <svg viewBox="0 0 400 214" aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id={`g${uid}`}>
                    <stop offset="0%" stopColor="#ffd36a" stopOpacity=".55" />
                    <stop offset="100%" stopColor="#ffd36a" stopOpacity="0" />
                  </radialGradient>
                  <mask id={`m${uid}`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="40" height="40">
                    <rect x="-20" y="-20" width="40" height="40" fill="#fff" />
                    <circle cx="5" cy="-3" r="8.5" fill="#000" />
                  </mask>
                </defs>
                <line x1="6" y1={CY} x2="394" y2={CY} stroke="rgba(255,248,223,.28)" strokeWidth="1" />
                <path d={ARC} fill="none" stroke="rgba(255,248,223,.34)" strokeWidth="1.4" strokeDasharray="1.5 7" strokeLinecap="round" />
                <path d={ARC} pathLength="1" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="1" strokeDashoffset={1 - u} />
                <g transform={`translate(${bx} ${by})`}>
                  {night ? (
                    <circle r="11" fill="#eef0ff" mask={`url(#m${uid})`} />
                  ) : (
                    <>
                      <circle r="30" fill={`url(#g${uid})`} />
                      <circle r="10" fill="#ffd36a" />
                    </>
                  )}
                </g>
              </svg>
              <p className="sun-time display" key={d.time} aria-live="polite">{d.time}</p>
            </div>

            <p className="day-place">{d.place}</p>
            <p className="lede day-cap" key={d.caption}>{d.caption}</p>
          </div>

          <div className="day-card">
            {DAY.map((x, n) => (
              <img key={x.time} src={x.image} alt={n === i ? x.place : ""} className={n === i ? "is-on" : ""} loading="lazy" />
            ))}
          </div>
        </div>

        <ol className="day-ticks container" aria-label="Jump to a time of day">
          {DAY.map((x, n) => (
            <li key={x.time}>
              <button className={n === i ? "is-on" : ""} onClick={() => jump(n)} aria-label={`${x.time} — ${x.place}`}>
                <span className="tick-bar" />
                <span className="tick-t">{x.time}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
