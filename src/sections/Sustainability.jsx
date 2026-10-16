import { Link } from "react-router-dom";
import { SUSTAIN } from "../data/content";
import { Arrow } from "../components/Icons";

export default function Sustainability() {
  return (
    <section className="sus section-pad" id="sustainability">
      <div className="container sus-grid">
        <div className="sus-media">
          <img src="/images/stream.webp" alt="A planted water course beside the cycle path" loading="lazy" />
          <img src="/images/waste-yard.webp" alt="Aerial view of the township's waste management yard" loading="lazy" />
        </div>
        <div className="sus-copy">
          <p className="kicker">Sustainability</p>
          <h2 className="statement">
            Designed for IGBC Green Township, <span className="accent">and zero waste.</span>
          </h2>
          <p className="lede">{SUSTAIN.intro}</p>
          <ul className="sus-points">
            {SUSTAIN.points.map((s) => (
              <li key={s.t}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ul>
          <Link className="btn btn-ghost" to="/amenities#recycle">How waste is managed <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
