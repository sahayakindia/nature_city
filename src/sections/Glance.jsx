import { GLANCE_CARDS } from "../data/featured";
import { TathvaIcon } from "../components/Icons";
import CountUp from "../components/CountUp";

/* "At a glance": four image cards in their own section (not inside the home banner). */
export default function Glance() {
  return (
    <section className="glance-sec" aria-label="The Nature City at a glance">
      <div className="container">
        <p className="kicker">The Nature City, at a glance</p>
        <h2 className="statement glance-head">
          A township, <span className="accent">measured in what matters.</span>
        </h2>
      </div>

      <ul className="gcards container">
        {GLANCE_CARDS.map((c, i) => (
          <li key={c.label} className="gcard">
            <img src={c.image} alt="" loading="lazy" />
            <span className="gcard-ico"><TathvaIcon name={c.icon} /></span>
            <div className="gcard-body">
              <p className="gcard-v display"><CountUp to={c.to} suffix={c.suffix} delay={i * 150} /></p>
              <p className="gcard-l">{c.label}</p>
              <p className="gcard-t">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="gcap container"><span>World-class resort style residential township</span></p>
    </section>
  );
}
