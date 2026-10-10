// src/components/CountUp.jsx
import { useEffect, useRef, useState } from "react";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* Counts from 01 up to `to` the first time it scrolls into view. */
export default function CountUp({ to, from = 1, suffix = "", duration = 1800, delay = 0 }) {
  const width = Math.max(2, String(to).length);               // 90 -> "01…90", 250 -> "001…250"
  const fmt = (n) => String(Math.round(n)).padStart(width, "0");
  const ref = useRef(null);
  const [val, setVal] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setVal(to); return; }

    const dur = Math.min(duration, 500 + (to - from) * 40);   // small numbers finish faster
    let raf, timer;
    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        setVal(from + (to - from) * easeOut(p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();                                       // play once
        timer = setTimeout(run, delay);
      },
      { threshold: 0.4 }
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