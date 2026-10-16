import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { OVERVIEW } from "../data/content";
import { Arrow, Play } from "../components/Icons";
import VideoModal from "../components/VideoModal";

/* WebM first (Chrome / Firefox / Edge), MP4 as the fallback (Safari / iOS). Replace these files with your own film. */
const VIDEO = {
  card: [{ src: "/videos/overview-card.webm", type: "video/webm" }, { src: "/videos/overview-card.mp4", type: "video/mp4" }],
  full: [{ src: "/videos/overview.webm", type: "video/webm" }, { src: "/videos/overview.mp4", type: "video/mp4" }],
  poster: "/images/overview-poster.webp",
};

export default function Overview() {
  const vid = useRef(null);
  const [show, setShow] = useState(false);
  const [broken, setBroken] = useState(false);
  const calm = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  /* plays by itself (muted, looping) while it is on screen; pauses off screen and while the pop-up is open */
  useEffect(() => {
    const v = vid.current;
    if (!v || calm) return;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !show) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [calm, show]);

  return (
    <section className="overview on-paper section-pad" id="overview">
      <div className="container overview-grid">
        <div className="overview-copy">
          <p className="kicker">Overview</p>
          <h2 className="statement">
            A self-sustained community, <span className="accent">planned for every generation.</span>
          </h2>
          {OVERVIEW.map((p) => (
            <p key={p.slice(0, 20)} className="lede">{p}</p>
          ))}
          <p className="lede">
            Wide internal roads, underground utilities, reliable water supply, efficient drainage, street lighting, security systems and professionally planned facility services — with excellent NH-26 connectivity.
          </p>
          <Link className="btn btn-ghost" to="/amenities">Explore Amenities <Arrow /></Link>
        </div>

        <div className="overview-media">
          <img src="/images/clubhouse-aerial.webp" alt="Aerial view of the clubhouse, pool, play area and amphitheatre" loading="lazy" />
          <button className="ov-video" onClick={() => setShow(true)} aria-label="Watch the film of The Nature City in full screen">
            {broken ? (
              <img src={VIDEO.poster} alt="" loading="lazy" />
            ) : (
              <video ref={vid} muted loop playsInline autoPlay={!calm} preload="metadata" poster={VIDEO.poster} aria-hidden="true" onError={() => setBroken(true)}>
                {VIDEO.card.map((v) => <source key={v.src} src={v.src} type={v.type} />)}
              </video>
            )}
            <span className="ov-shade" aria-hidden="true" />
            <span className="ov-play" aria-hidden="true"><Play /></span>
            <span className="ov-label"><b>Watch the film</b><small>Tap to open full screen</small></span>
          </button>
        </div>
      </div>
      {show && <VideoModal sources={VIDEO.full} poster={VIDEO.poster} title="The Nature City — film" onClose={() => setShow(false)} />}
    </section>
  );
}
