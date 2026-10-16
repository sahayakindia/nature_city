import { ABOUT } from "../data/content";

/* The About content (intro, numbers, vision, mission, memberships) — used by the About dropdown,
   the header's About menu and the mobile menu. */
export default function AboutContent({ compact = false }) {
  return (
    <div className={`about-content ${compact ? "is-compact" : ""}`}>
      <div className="about-col">
        <p className="about-intro">{ABOUT.intro}</p>
        <dl className="about-stats">
          {ABOUT.stats.map((s) => (
            <div key={s.label}>
              <dt className="display">{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="about-col">
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
    </div>
  );
}
