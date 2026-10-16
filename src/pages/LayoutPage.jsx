import { useEffect, useMemo, useState } from "react";
import PageHead from "./PageHead";
import PanZoom from "../components/PanZoom";
import { LEGEND, CATEGORIES } from "../data/legend";
import { MAPS as RENDERS } from "../data/maps";
import { SITE } from "../config/site";
import { useEnquiry } from "../components/Enquiry";
import usePageMeta from "../hooks/usePageMeta";
import { Arrow } from "../components/Icons";

const MAPS = {
  render: { ...RENDERS.render, bg: "transparent", paper: false },
  render2: { ...RENDERS.render2, bg: "transparent", paper: false },
  north: { label: "Plot layout — north & east", w: 2381.1, h: 841.89, src: "/map/layout-north.svg", bg: "#fff", paper: true },
  south: { label: "Plot layout — south", w: 2381.1, h: 841.89, src: "/map/layout-south.svg", bg: "#fff", paper: true },
};

function Availability() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/plot-status.json").then((r) => r.json()).then(setData).catch(() => setData({}));
  }, []);
  if (!data) return null;
  const ids = Object.keys(data).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
  const count = (s) => ids.filter((i) => data[i] === s).length;
  const label = { available: "Available", sold: "Sold", blocked: "On hold" };
  return (
    <section className="avail section-pad">
      <div className="container">
        <p className="kicker">Plot availability</p>
        <h2 className="statement">{count("available")} plots <span className="accent">available now.</span></h2>
        <ul className="avail-key">
          {["available", "sold", "blocked"].map((s) => (
            <li key={s}><i className={`s-${s}`} /> {label[s]} <b>{count(s)}</b></li>
          ))}
        </ul>
        <ul className="avail-grid">
          {ids.map((id) => <li key={id} className={`s-${data[id]}`} title={`${id}: ${label[data[id]]}`}>{id}</li>)}
        </ul>
      </div>
    </section>
  );
}

export default function LayoutPage() {
  usePageMeta("Layout", "Explore the 90-acre masterplan and plot layout of The Nature City, with 77 numbered landmarks.");
  const { open } = useEnquiry();
  const [tab, setTab] = useState("render");
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const m = MAPS[tab];
  const items = useMemo(
    () => LEGEND.filter((l) => (cat === "all" || l.cat === cat) && l.name.toLowerCase().includes(q.trim().toLowerCase())),
    [cat, q]
  );

  return (
    <>
      <PageHead kicker="Layout" title="Ninety acres," accent="mapped end to end." image="/images/aerial-day.webp">
        Start with the two labelled masterplans, then switch to the plot layout to find plot numbers and roads. Click a map to zoom with + and −.
      </PageHead>

      <section className="lay section-pad">
        <div className="container">
          <div className="seg" role="tablist" aria-label="Choose a map">
            {Object.entries(MAPS).map(([k, v]) => (
              <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>{v.label}</button>
            ))}
          </div>
          <PanZoom key={tab} width={m.w} height={m.h} label={m.label} className={m.paper ? "pz-paper" : ""}>
            <img src={m.src} width={m.w} height={m.h} alt="" draggable="false" style={{ background: m.bg, width: m.w, height: m.h }} />
          </PanZoom>
          {m.paper && (
            <p className="note">Plots are numbered in A-, B- and C- series. Plot sizes, facing and pricing are shared on request. <button className="link" onClick={open}>Ask for the price sheet</button></p>
          )}
        </div>
      </section>

      <section className="legend section-pad on-paper">
        <div className="container">
          <div className="legend-head">
            <div>
              <p className="kicker">Landmarks</p>
              <h2 className="statement">What the numbers <span className="accent">stand for.</span></h2>
            </div>
            <label className="search">
              <span className="sr-only">Search landmarks</span>
              <input type="search" placeholder="Search — e.g. tennis, yoga, pond" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>
          <div className="chips chips-paper" role="tablist" aria-label="Filter landmarks">
            {CATEGORIES.map((c) => (
              <button key={c.key} role="tab" aria-selected={cat === c.key} className={cat === c.key ? "is-on" : ""} onClick={() => setCat(c.key)}>{c.label}</button>
            ))}
          </div>
          <ol className="legend-grid" aria-live="polite">
            {items.map((l) => (
              <li key={l.n}><span className="num">{l.n}</span><span>{l.name}</span></li>
            ))}
          </ol>
          {items.length === 0 && <p className="lede">Nothing matches “{q}”. Try a broader word.</p>}
          <p className="note note-paper">The pond appears on the masterplan without a number. Layout is subject to approvals and may change.</p>
          <button className="btn btn-gold" onClick={open}>Book a site visit <Arrow /></button>
        </div>
      </section>

      {SITE.showAvailability && <Availability />}
    </>
  );
}
