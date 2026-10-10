import Hero from "../sections/Hero";
import Glance from "../sections/Glance";
import Overview from "../sections/Overview";
import Tathvas from "../sections/Tathvas";
import MasterplanTeaser from "../sections/MasterplanTeaser";
import Compass from "../sections/Compass";
import Day from "../sections/Day";
import Sustainability from "../sections/Sustainability";
import GalleryStrip from "../sections/GalleryStrip";
import Location from "../sections/Location";
import About from "../sections/About";
import Enquire from "../sections/Enquire";
import usePageMeta from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta("", "The Nature City by Mangal Realty: a 90-acre world-class, resort-style plotted township on NH-26, 50 km from Visakhapatnam, with 250+ amenities.");
  return (
    <>
      <Hero />
      <Glance />
      <Overview />
      <Tathvas />
      <MasterplanTeaser />
      <Compass />
      <Day />
      <Sustainability />
      <GalleryStrip />
      <Location />
      <About />
      <Enquire />
    </>
  );
}
