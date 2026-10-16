import { useEffect, useRef, useState } from "react";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

/* Counts up from 1 to `to` by itself as soon as it scrolls into view (about 40% visible),
   and counts again if it leaves the screen and comes back.
   Single-digit finals keep a leading zero ("05"). `suffix` is shown throughout (e.g. "90+"). */
export default function CountUp({ to, from = 1, suffix = "", duration = 1900, delay = 0 }) {
  const width = to < 10 ? 2 : 1;
  const fmt = (n) => String(Math.round(n)).padStart(width, "0");
  const ref = useRef(null);
  const [val, setVal] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm || !("IntersectionObserver" in window)) { setVal(to); return; }

    let raf = 0, timer = 0, played = false;
    const run = () => {
      cancelAnimationFrame(raf);
      const dur = Math.min(duration, 500 + (to - from) * 40);   // small numbers finish sooner
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        setVal(lerp(from, to, easeOut(p)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.4 && !played) { played = true; timer = setTimeout(run, delay); }
        else if (e.intersectionRatio === 0) { played = false; clearTimeout(timer); cancelAnimationFrame(raf); setVal(from); }   // reset so it counts again next time
      },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [to, from, duration, delay]);

  return (
    <span ref={ref} className="count">
      <span className="sr-only">{fmt(to)}{suffix}</span>
      <span aria-hidden="true">{fmt(val)}{suffix}</span>
    </span>
  );
}
