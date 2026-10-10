import { useMemo, useState } from "react";
import PageHead from "./PageHead";
import Lightbox from "../components/Lightbox";
import { GALLERY, GALLERY_FILTERS } from "../data/content";
import usePageMeta from "../hooks/usePageMeta";

export default function GalleryPage() {
  usePageMeta("Gallery", "Renders of The Nature City: aerials, gardens, sports courts, clubhouse, swimming pool, streets and indicative homes.");
  const [f, setF] = useState("all");
  const [idx, setIdx] = useState(null);
  const items = useMemo(() => (f === "all" ? GALLERY : GALLERY.filter((g) => g.tags.includes(f))), [f]);
  return (
    <>
      <PageHead kicker="Gallery" title="The township," accent="seen up close." image="/images/pond-aerial.webp">
        Artistic impressions of the landscape, amenities and streets. Images are indicative.
      </PageHead>
      <section className="gal section-pad">
        <div className="container">
          <div className="chips" role="tablist" aria-label="Filter images">
            {GALLERY_FILTERS.map((x) => (
              <button key={x.key} role="tab" aria-selected={f === x.key} className={f === x.key ? "is-on" : ""} onClick={() => setF(x.key)}>{x.label}</button>
            ))}
          </div>
          <ul className="masonry">
            {items.map((g, n) => (
              <li key={g.src}>
                <button onClick={() => setIdx(n)} aria-label={`Open: ${g.caption}`}>
                  <img src={g.src} alt={g.caption} loading="lazy" />
                  <span>{g.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Lightbox items={items} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}
