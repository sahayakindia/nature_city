import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_SLIDES } from "../data/content";
import { useEnquiry } from "../components/Enquiry";
import { Arrow } from "../components/Icons";

export default function Hero() {
  const [i, setI] = useState(0);
  const { open } = useEnquiry();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-media" aria-hidden="true">
        {HERO_SLIDES.map((s, n) => (
          <img key={s.src} src={s.src} alt="" className={n === i ? "is-on" : ""} fetchpriority={n === 0 ? "high" : "auto"} />
        ))}
        <div className="hero-shade" />
      </div>

      <div className="container hero-body">
        <h1 className="display hero-title">
          <span className="hero-line"><span>A 90-acre township</span></span>
          <span className="hero-line"><span className="accent hero-accent">grown around nature.</span></span>
        </h1>
        <p className="lede hero-sub">
          A world-class, resort-style residential township on NH-26, 50&nbsp;km from Visakhapatnam — with 250+ amenities inside the gates.
        </p>
        <div className="hero-cta">
          <button className="btn btn-gold" onClick={open}>Book a site visit <Arrow /></button>
          <Link className="btn btn-ghost" to="/layout">Explore the layout</Link>
        </div>
      </div>

      <div className="container hero-foot">
        <div className="hero-dots" role="tablist" aria-label="Hero images">
          {HERO_SLIDES.map((s, n) => (
            <button key={s.src} role="tab" aria-selected={n === i} aria-label={s.alt} className={n === i ? "is-on" : ""} onClick={() => setI(n)} />
          ))}
        </div>
      </div>
    </section>
  );
}
