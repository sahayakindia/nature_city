import { ABOUT } from "../data/content";

export default function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="container">
        <div className="about-head">
          <div>
            <p className="kicker">About the builder</p>
            <h2 className="statement">
              Mangal Realty. <span className="accent">Auspicious, prosperous, blissful.</span>
            </h2>
          </div>
          <p className="lede">{ABOUT.intro}</p>
        </div>

        <dl className="about-stats">
          {ABOUT.stats.map((s) => (
            <div key={s.label}>
              <dt className="display">{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="about-vm">
          <article>
            <h3>Our vision</h3>
            <p>“{ABOUT.vision}”</p>
          </article>
          <article>
            <h3>Our mission</h3>
            <p>“{ABOUT.mission}”</p>
          </article>
        </div>
        <p className="about-members">
          Proud members of {ABOUT.memberships.slice(0, -1).join(", ")} and {ABOUT.memberships.slice(-1)}.
        </p>
      </div>
    </section>
  );
}
