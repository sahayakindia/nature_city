import { useState } from "react";
import { Link } from "react-router-dom";
import { GALLERY } from "../data/content";
import useDragScroll from "../hooks/useDragScroll";
import Lightbox from "../components/Lightbox";
import { Arrow } from "../components/Icons";

const PICK = ["gate-day","hammock-grove","pool-deck","pond-aerial","treehouse-day","cricket-night","clubhouse-court","jacaranda-road","aerial-night","rock-garden"];
const ITEMS = PICK.map((p) => GALLERY.find((g) => g.src.includes(`/${p}.`))).filter(Boolean);

export default function GalleryStrip() {
  const ref = useDragScroll();
  const [idx, setIdx] = useState(null);
  return (
    <section className="strip section-pad" id="moments">
      <div className="container strip-head">
        <div>
          <p className="kicker">Gallery</p>
          <h2 className="statement">
            Moments at <span className="accent">The Nature City.</span>
          </h2>
        </div>
        <Link className="btn btn-ghost" to="/gallery">View the full gallery <Arrow /></Link>
      </div>
      <div className="strip-scroll" ref={ref}>
        <ul>
          {ITEMS.map((g, n) => (
            <li key={g.src}>
              <button onClick={() => setIdx(n)} aria-label={`Open: ${g.caption}`}>
                <img src={g.src} alt={g.caption} loading="lazy" draggable="false" />
                <span>{g.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={ITEMS} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </section>
  );
}
