import { SITE } from "../config/site";
import { useEnquiry } from "../components/Enquiry";
import { Pin, Arrow } from "../components/Icons";

export default function Location() {
  const { open } = useEnquiry();
  const { lat, lng, mapsUrl, label } = SITE.location;
  return (
    <section className="loc section-pad" id="location">
      <div className="container loc-grid">
        <div className="loc-copy">
          <p className="kicker">Location</p>
          <h2 className="statement">
            On NH-26, <span className="accent">50 km from Visakhapatnam.</span>
          </h2>
          <p className="lede">
            With excellent NH-26 connectivity, the township sits against a picturesque natural landscape — close enough to the city, far enough to hear the wind in the trees.
          </p>
          <p className="loc-label"><Pin /> {label}</p>
          <div className="hero-cta">
            <a className="btn btn-gold" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <Arrow /></a>
            <button className="btn btn-ghost" onClick={open}>Book a site visit</button>
          </div>
        </div>
        <div className="loc-map">
          <iframe
            title="Map showing the location of The Nature City"
            src={`https://www.google.com/maps?q=${lat},${lng}&z=10&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
