import Brand from "../components/Brand";
import { useState } from "react";
import PageHead from "./PageHead";
import { AMENITIES, SERVICES } from "../data/amenities";
import { scrollToTarget } from "../hooks/lenis";
import usePageMeta from "../hooks/usePageMeta";
import Enquire from "../sections/Enquire";

function Chapter({ a, i }) {
  const count = a.groups.reduce((s, g) => s + g.items.length, 0);
  return (
    <section id={a.id} className={`chap ${i % 2 ? "is-flip" : ""}`} style={{ "--c": a.color }}>
      <div className="container chap-grid">
        <figure className="chap-img">
          <img src={a.image} alt={`${a.title} at The Nature City`} loading="lazy" />
        </figure>
        <div className="chap-copy">
          <h2 className="display chap-title" style={{ color: a.color }}><Brand>{a.title}</Brand></h2>
          <p className="lede">{a.blurb}</p>
          {a.stat && <p className="chap-stat"><b>{a.stat.value}</b> {a.stat.label}</p>}
          {a.groups.map((g) => (
            <div className="chap-group" key={g.name}>
              {a.groups.length > 1 || count > 0 ? <h3>{g.name} <span>{g.items.length}</span></h3> : null}
              <ul>
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AmenitiesPage() {
  usePageMeta("Amenities", "250+ amenities at The Nature City: 17 types of gardens, sports courts, a clubhouse, swimming pool, wellness zones and township services.");
  const all = [...AMENITIES, ...SERVICES];
  const [active, setActive] = useState("");
  return (
    <>
      <PageHead kicker="Amenities" title="250+ amenities," accent="inside the gates." image="/images/clubhouse-lawn.webp">
        Gardens, sports, wellness, a clubhouse and pool — plus the quiet services that keep a township running.
      </PageHead>
      <nav className="chap-nav" aria-label="Amenity chapters">
        <div className="container">
          <ul>
            {all.map((a) => (
              <li key={a.id}>
                <a href={`#${a.id}`} className={active === a.id ? "is-on" : ""} onClick={(e) => { e.preventDefault(); setActive(a.id); scrollToTarget("#" + a.id, { offset: -90 }); window.history.replaceState(null, "", `#${a.id}`); }}>
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {AMENITIES.map((a, i) => <Chapter key={a.id} a={a} i={i} />)}
      <div className="chap-divider container"><p className="kicker">Services &amp; infrastructure</p></div>
      {SERVICES.map((a, i) => <Chapter key={a.id} a={a} i={i} />)}
      <Enquire />
    </>
  );
}
