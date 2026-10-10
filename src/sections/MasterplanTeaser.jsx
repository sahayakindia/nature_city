import { Link } from "react-router-dom";
import useDragScroll from "../hooks/useDragScroll";
import { Arrow } from "../components/Icons";

export default function MasterplanTeaser() {
  const ref = useDragScroll();
  return (
    <section className="mp section-pad" id="masterplan">
      <div className="container mp-head">
        <div>
          <p className="kicker">The masterplan</p>
          <h2 className="statement">
            Seventy-seven landmarks, <span className="accent">one walkable township.</span>
          </h2>
        </div>
        <div>
          <p className="lede">From the Grand Clock Tower entrance to the pond, tree house, clubhouse and farm gardens — every landmark is numbered and mapped. Drag to look around.</p>
          <Link className="btn btn-gold" to="/layout">Open the full layout <Arrow /></Link>
        </div>
      </div>
      <div className="mp-scroll" ref={ref} tabIndex={0} aria-label="Labelled masterplan, scrolls sideways">
        <img src="/images/masterplan-labelled.webp" alt="Labelled aerial masterplan of The Nature City showing 77 numbered landmarks" width="2172" height="724" loading="lazy" draggable="false" />
      </div>
    </section>
  );
}
