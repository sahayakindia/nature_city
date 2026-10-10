import { OVERVIEW } from "../data/content";
import { Link } from "react-router-dom";
import { Arrow } from "../components/Icons";

export default function Overview() {
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
          <Link className="btn btn-ghost" to="/amenities">See every amenity <Arrow /></Link>
        </div>
        <div className="overview-media">
          <img src="/images/clubhouse-aerial.webp" alt="Aerial view of the clubhouse, pool, play area and amphitheatre" loading="lazy" />
          <img src="/images/rock-garden.webp" alt="Rock Garden under a canopy of trees" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
