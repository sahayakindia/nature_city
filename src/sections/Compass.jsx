import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COMPASS } from "../data/featured";

const N = COMPASS.length;
const mod = (n) => ((n % N) + N) % N;

/* Four signature zones on a turning compass. The ring rotates so the chosen zone sits at the top.
   Click / tap a number, use ← →, swipe, or (mouse) drag the ring. Auto-advances while in view. */
export default function Compass() {
  const [k, setK] = useState(0);              // integer "turns": keeps rotation going the short way round
  const [drag, setDrag] = useState(null);     // live drag offset in degrees (mouse)
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef(null);
  const ringBox = useRef(null);
  const touch = useRef(null);
  const i = mod(k);
  const z = COMPASS[i];
  const rot = -k * 90 + (drag?.d || 0);

  const go = (to) => {
    const d0 = mod(to - i);
    const d = d0 === 3 ? -1 : d0;             // 0, 1, 2 clockwise or -1
    if (d) setK((n) => n + d);
  };
  const step = (dir) => setK((n) => n + dir);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    root.current && io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || drag || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setK((n) => n + 1), 7500);
    return () => clearInterval(t);
  }, [paused, inView, drag]);

  /* mouse drag around the centre */
  const angleAt = (e) => {
    const r = ringBox.current.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  const down = (e) => {
    if (e.pointerType === "touch" || e.target.closest("button")) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDrag({ a0: angleAt(e), d: 0 });
  };
  const move = (e) => {
    if (!drag) return;
    let d = angleAt(e) - drag.a0;
    if (d > 180) d -= 360; if (d < -180) d += 360;
    setDrag({ ...drag, d });
  };
  const up = () => {
    if (!drag) return;
    const target = Math.round(-(-k * 90 + drag.d) / 90);   // nearest quarter turn
    setDrag(null);
    setK(target);
  };

  const key = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); step(-1); }
  };
  const ts = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const te = (e) => {
    const t = touch.current; if (!t) return;
    const dx = e.changedTouches[0].clientX - t.x, dy = e.changedTouches[0].clientY - t.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  return (
    <section id="amenities" className="cz" aria-label="Four signature zones" ref={root}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onKeyDown={key} onTouchStart={ts} onTouchEnd={te}>
      <div className="cz-stage">
        <div className="cz-bg" aria-hidden="true">
          {COMPASS.map((c, n) => <img key={c.short} src={c.image} alt="" className={n === i ? "is-on" : ""} loading="lazy" />)}
          <div className="cz-shade" />
        </div>

        <p className="cz-turn" aria-hidden="true">Turn the compass</p>

        <div className="container cz-grid">
          <div className="cz-copy" key={z.short}>
            <span className="cz-chip">{z.chip}</span>
            <h2 className="display cz-title">
              <span>{z.title}</span>
              <span className="accent cz-accent">{z.accent}</span>
            </h2>
            <p className="cz-tag">{z.tagline}</p>
            <ul className="cz-points">{z.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <Link className="btn btn-gold cz-cta" to={z.to}>{z.cta} <span aria-hidden="true">↗</span></Link>
          </div>

          <div className={`compass ${drag ? "is-dragging" : ""}`} style={{ "--rot": `${rot}deg` }} role="group" aria-label="Choose a zone">
            <div className="compass-ring" ref={ringBox} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
              {COMPASS.map((c, n) => (
                <div key={c.short} className="cnode" style={{ "--a": `${n * 90}deg` }}>
                  <button className={n === i ? "is-on" : ""} onClick={() => go(n)} aria-label={`Zone ${n + 1}: ${c.short}`} aria-current={n === i}>
                    {String(n + 1).padStart(2, "0")}
                  </button>
                </div>
              ))}
            </div>
            <div className="compass-core" aria-live="polite">
              <p className="core-n display" key={i}>{String(i + 1).padStart(2, "0")}</p>
              <p className="core-of">Of four</p>
              <p className="core-name">{z.short}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cz-all container">
        <Link className="btn btn-ghost" to="/amenities">View all amenities <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
