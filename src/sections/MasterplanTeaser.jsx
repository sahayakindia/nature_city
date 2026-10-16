import { useState } from "react";
import { Link } from "react-router-dom";
import PanZoom from "../components/PanZoom";
import { Arrow } from "../components/Icons";
import { MAPS } from "../data/maps";

export default function MasterplanTeaser() {
  const [tab, setTab] = useState("render");
  const m = MAPS[tab];
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
          <p className="lede">From the Grand Clock Tower entrance to the pond, tree house, clubhouse and farm gardens — every landmark is numbered and mapped across two maps. Click a map to zoom in with + and −.</p>
          <Link className="btn btn-gold" to="/layout">Open the full layout <Arrow /></Link>
        </div>
      </div>

      <div className="container mp-view">
        <div className="seg" role="tablist" aria-label="Choose a masterplan map">
          {Object.entries(MAPS).map(([k, v]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>{v.label}</button>
          ))}
        </div>
        <p className="mp-note">{m.note}</p>
        <PanZoom key={tab} width={m.w} height={m.h} label={`Labelled masterplan — ${m.label}`}>
          <img src={m.src} width={m.w} height={m.h} alt="" draggable="false" style={{ width: m.w, height: m.h }} />
        </PanZoom>
      </div>
    </section>
  );
}
