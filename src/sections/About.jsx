import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AboutContent from "../components/AboutContent";
import Disclosure from "../components/Disclosure";

/* About the builder — a dropdown button that reveals the full About content.
   It also opens by itself when someone follows an "About" link (/#about). */
export default function About() {
  const [open, setOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => { if (hash === "#about") setOpen(true); }, [hash]);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("nc:open-about", show);
    return () => window.removeEventListener("nc:open-about", show);
  }, []);

  return (
    <section className="about section-pad" id="about">
      <div className="container">
        <div className="about-top">
          <div className="about-title">
            <p className="kicker">About the builder</p>
            <h2 className="statement">
              Mangal Realty. <span className="accent">Auspicious, prosperous, blissful.</span>
            </h2>
          </div>
          <Disclosure
            id="about-panel"
            className="about-disc"
            label="About Mangal Realty"
            hint="Our story, numbers, vision and mission"
            open={open}
            onToggle={() => setOpen((o) => !o)}
          >
            <AboutContent />
          </Disclosure>
        </div>
      </div>
    </section>
  );
}
