import { useId, useMemo, useRef, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { DAY } from "../data/content";
import { getLenis } from "../hooks/lenis";

const N = DAY.length;
/* true semicircle: centre (200,200), radius 180, horizon y=200 */
const CX = 200, CY = 200, R = 180;
const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

/* how much daylight / starlight / golden-hour warmth at each stop (06:00 … 21:30) */
const LIGHT = [0.55, 0.8, 1, 0.82, 0.45, 0.1, 0];
const STARS = [0.3, 0, 0, 0, 0.15, 0.8, 1];
const WARM = [1, 0.5, 0, 0.8, 1, 0.25, 0];

/* each time of day gets its own two-tone pair for the timeline bars (same order as DAY in data/content.js) */
const TONES = [
  ["#f29b9b", "#ffd68a"],   // 06:00 dawn      rose → gold
  ["#5fc6d9", "#f2dd8f"],   // 08:00 morning   teal → soft gold
  ["#4aa9e0", "#bfe9f7"],   // 11:00 noon      sky blue → pale blue
  ["#d9964f", "#f5c76d"],   // 16:00 afternoon amber → honey
  ["#c7547d", "#ff9a5c"],   // 18:30 sunset    plum → coral
  ["#6c6fd6", "#b0a2f5"],   // 20:00 dusk      indigo → violet
  ["#3d5bd6", "#9bb8ff"],   // 21:30 night     deep blue → moonlight
];

const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixHex = (a, b, t) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], t))).join(",")})`; };
const rnd = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const STAR_LIST = (() => { const r = rnd(7); return Array.from({ length: 48 }, () => ({ x: r() * 100, y: r() * 72, s: 1 + r() * 1.6, d: r() * 5, t: 2.2 + r() * 3 })); })();
const MOTE_LIST = (() => { const r = rnd(21); return Array.from({ length: 18 }, () => ({ x: r() * 100, s: 2 + r() * 3, d: -r() * 26, t: 16 + r() * 14, dx: (r() - 0.5) * 70 })); })();
const TICKS = Array.from({ length: 13 }, (_, k) => {
  const a = Math.PI * (1 - k / 12), long = k % 3 === 0, r1 = R + 8, r2 = R + (long ? 17 : 13);
  return { x1: CX + r1 * Math.cos(a), y1: CY - r1 * Math.sin(a), x2: CX + r2 * Math.cos(a), y2: CY - r2 * Math.sin(a), long };
});
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Day() {
  const ref = useRef(null);
  const card = useRef(null);
  const uid = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [p, setP] = useState(0);
  const calm = useMemo(reduced, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.7, restDelta: 0.0005 });   // buttery sky + sun
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(N - 1, Math.max(0, Math.floor(v * N)))));
  useMotionValueEvent(calm ? scrollYProgress : smooth, "change", (v) => setP(v));

  const jump = (n) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (el.offsetHeight - window.innerHeight) * ((n + 0.5) / N);
    const l = getLenis();
    l ? l.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* photo follows the pointer a little (mouse only) */
  const tilt = (e) => {
    if (e.pointerType === "touch" || calm || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    const s = card.current.style;
    s.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`); s.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    s.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`); s.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const untilt = () => { const s = card.current?.style; if (!s) return; s.setProperty("--rx", "0deg"); s.setProperty("--ry", "0deg"); s.setProperty("--mx", "50%"); s.setProperty("--my", "30%"); };

  /* continuous position between stops (0 … N-1) drives colour grade, light and the sun */
  const pos = Math.min(N - 1, Math.max(0, p * N - 0.5));
  const i0 = Math.min(N - 2, Math.floor(pos)), t = pos - i0;
  const num = (arr) => lerp(arr[i0], arr[i0 + 1], t);
  const s0 = mixHex(DAY[i0].sky[0], DAY[i0 + 1].sky[0], t);
  const s1 = mixHex(DAY[i0].sky[1], DAY[i0 + 1].sky[1], t);
  const light = num(LIGHT), star = num(STARS), warm = num(WARM);

  const d = DAY[i];
  const night = pos >= 4.6;
  const u = pos / (N - 1);
  const ang = Math.PI * (1 - u);
  const bx = CX + R * Math.cos(ang);
  const by = CY - R * Math.sin(ang);

  return (
    <section className="day" id="day" ref={ref} style={{ height: `${N * 92 + 40}vh` }} aria-label="A day at The Nature City">
      <div className="day-pin" style={{ "--s0": s0, "--s1": s1, "--light": light.toFixed(3), "--star": star.toFixed(3), "--warm": warm.toFixed(3) }}>
        <div className="day-sky" aria-hidden="true">
          <div className="day-bg" />
          <div className="day-wash" />
          <div className="day-stars">{STAR_LIST.map((s, k) => <i key={k} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, "--d": `${s.d}s`, "--t": `${s.t}s` }} />)}</div>
          <div className="day-motes">{MOTE_LIST.map((m, k) => <i key={k} style={{ left: `${m.x}%`, width: m.s, height: m.s, "--d": `${m.d}s`, "--t": `${m.t}s`, "--dx": `${m.dx}px` }} />)}</div>
          <div className="day-birds">
            {[{ y: "17%", t: 34, d: -6, w: 30 }, { y: "27%", t: 46, d: -26, w: 22 }].map((b, k) => (
              <svg key={k} viewBox="0 0 24 10" style={{ top: b.y, width: b.w, "--t": `${b.t}s`, "--d": `${b.d}s` }}>
                <path d="M0 6Q6 0 12 6Q18 0 24 6" fill="none" stroke="#fff8df" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            ))}
          </div>
          <div className="day-veil" />
          <div className="day-vignette" />
          <div className="day-grain" />
        </div>

        <div className="container day-grid">
          <div className="day-left">
            <p className="kicker">A day at The Nature City</p>

            <div className="sun-dial" style={{ "--gx": `${(bx / 4).toFixed(2)}%`, "--gy": `${(by / 2.14).toFixed(2)}%`, "--bloom": night ? "170,195,255" : "255,206,125" }}>
              <div className="sun-glow" aria-hidden="true" />
              <div className="sun-rays" aria-hidden="true" />
              <svg viewBox="0 0 400 214" aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id={`g${uid}`}>
                    <stop offset="0%" stopColor="#ffd36a" stopOpacity=".6" />
                    <stop offset="100%" stopColor="#ffd36a" stopOpacity="0" />
                  </radialGradient>
                  <mask id={`m${uid}`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="40" height="40">
                    <rect x="-20" y="-20" width="40" height="40" fill="#fff" />
                    <circle cx="5" cy="-3" r="8.5" fill="#000" />
                  </mask>
                </defs>
                {TICKS.map((k, n) => <line key={n} x1={k.x1} y1={k.y1} x2={k.x2} y2={k.y2} stroke="rgba(255,248,223,.38)" strokeWidth={k.long ? 1.6 : 1} strokeLinecap="round" />)}
                <line x1="6" y1={CY} x2="394" y2={CY} stroke="rgba(255,248,223,.28)" strokeWidth="1" />
                <path d={ARC} fill="none" stroke="rgba(255,248,223,.34)" strokeWidth="1.4" strokeDasharray="1.5 7" strokeLinecap="round" />
                <path d={ARC} pathLength="1" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="1" strokeDashoffset={1 - u} />
                <g transform={`translate(${bx} ${by})`}>
                  {night ? (
                    <>
                      <circle r="26" fill="rgba(190,205,255,.18)" />
                      <circle r="11" fill="#eef0ff" mask={`url(#m${uid})`} />
                    </>
                  ) : (
                    <>
                      <circle r="32" fill={`url(#g${uid})`} />
                      <circle r="10" fill="#ffd36a" />
                    </>
                  )}
                </g>
              </svg>
              <p className="sun-time display" aria-live="polite" aria-label={d.time}>
                {d.time.split("").map((ch, k) => (
                  <span key={`${d.time}-${k}`} className={ch === ":" ? "colon" : "dig"} style={{ animationDelay: `${k * 45}ms` }} aria-hidden="true">{ch}</span>
                ))}
              </p>
            </div>

            <p className="day-place" key={d.place}>{d.place}</p>
            <p className="lede day-cap" key={d.caption}>{d.caption}</p>
          </div>

          <div className="day-card" ref={card} onPointerMove={tilt} onPointerLeave={untilt}>
            {DAY.map((x, n) => (
              <img key={x.time} src={x.image} alt={n === i ? x.place : ""} className={n === i ? "is-on" : ""} loading="lazy" />
            ))}
          </div>
        </div>

        <ol className="day-ticks container" aria-label="Jump to a time of day">
          {DAY.map((x, n) => {
            const [t1, t2] = TONES[n] || ["#d6b229", "#f5c76d"];
            const f = Math.min(1, Math.max(0, p * N - n));   // how far through this part of the day
            return (
              <li key={x.time} style={{ "--t1": t1, "--t2": t2 }}>
                <button className={n === i ? "is-on" : ""} onClick={() => jump(n)} aria-label={`${x.time} — ${x.place}`}>
                  <span className="tick-bar"><span className="tick-fill" style={{ transform: `scaleX(${f.toFixed(3)})` }} /></span>
                  <span className="tick-t">{x.time}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
