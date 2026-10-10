import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, easeInOut } from "framer-motion";
import { TATHVAS } from "../data/content";
import { TathvaIcon } from "../components/Icons";
import { getLenis } from "../hooks/lenis";

const ICON = { prithvi: "earth", jal: "water", agni: "fire", vayu: "air", akash: "space" };
const N = TATHVAS.length;
const REST = 0.4; // share of each scroll slot where a panel holds still before sliding on

/* vertical scroll progress (0..1) → horizontal "panel position" (0..N-1), with a pause on every panel */
const IN = [], OUT = [];
for (let k = 0; k < N; k++) { IN.push(k / N, k / N + REST / N); OUT.push(k, k); }
IN.push(1); OUT.push(N - 1);

const clamp = (v) => Math.max(-1.2, Math.min(1.2, v));
const pad = (n) => String(n).padStart(2, "0");

function Panel({ t, k, unit }) {
  const imgX = useTransform(unit, (u) => `${clamp(k - u) * -4}%`);   // photo drifts the other way: depth
  const textX = useTransform(unit, (u) => `${clamp(k - u) * 12}vw`); // text trails the slide slightly
  return (
    <article className="tx-panel" style={{ "--c": t.color, "--on": t.on || "#fff" }} aria-label={`${t.sanskrit} — ${t.word}`}>
      <motion.img src={t.image} alt="" style={{ x: imgX }} loading={k < 2 ? "eager" : "lazy"} decoding="async" />
      <div className="tx-shade" />
      <motion.div className="container tx-body" style={{ x: textX }}>
        <span className="tx-chip"><TathvaIcon name={ICON[t.id]} /> {t.sanskrit}</span>
        <h3 className="display tx-word">{t.word}</h3>
        <p className="tx-text">{t.text}</p>
      </motion.div>
    </article>
  );
}

function NavItem({ t, k, unit, active, onJump }) {
  const fill = useTransform(unit, (u) => Math.max(0, 1 - Math.abs(u - k)));
  return (
    <button className={active ? "is-on" : ""} onClick={() => onJump(k)} aria-label={`Show ${t.sanskrit} (${t.word})`} aria-current={active}>
      <span className="tx-bar"><motion.span style={{ scaleX: fill }} /></span>
      <span className="tx-lab">{t.sanskrit}</span>
    </button>
  );
}

export default function Tathvas() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const unit = useTransform(scrollYProgress, IN, OUT, { ease: easeInOut });
  const x = useTransform(unit, (u) => `${(-u / N) * 100}%`);
  useMotionValueEvent(unit, "change", (u) => setI(Math.round(u)));

  const jump = (k) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (el.offsetHeight - window.innerHeight) * ((k + REST / 2) / N);
    const l = getLenis();
    l ? l.scrollTo(y, { duration: 1.3 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="tathvas" className="tathvas" aria-label="The five tathvas">
      <div className="tathvas-intro container">
        <p className="kicker">Sustainable in Five Tathvas</p>
        <h2 className="statement">
          Five elements, <span className="accent">one way of living.</span>
        </h2>
        <p className="lede">
          True sustainability was never only about how a home is built. It is about whether Earth, Water, Fire, Air and Space are all still present in the life lived inside it. That balance, as old as the idea of the tathvas themselves, is the quiet standard The Nature City is designed to meet.
        </p>
        <p className="tx-hint" aria-hidden="true">Keep scrolling — the elements slide across.</p>
      </div>

      <div className="tx" ref={ref} style={{ "--n": N }}>
        <div className="tx-stage">
          <motion.div className="tx-track" style={{ x }}>
            {TATHVAS.map((t, k) => <Panel key={t.id} t={t} k={k} unit={unit} />)}
          </motion.div>

          <div className="tx-ui container">
            <p className="tx-top"><span className="tx-count" aria-live="polite">{pad(i + 1)} <i>/ {pad(N)}</i></span></p>
            <nav className="tx-nav" aria-label="Choose an element">
              {TATHVAS.map((t, k) => <NavItem key={t.id} t={t} k={k} unit={unit} active={k === i} onJump={jump} />)}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
