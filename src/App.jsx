import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { startLenis, scrollToTarget, scrollTop } from "./hooks/lenis";
import { EnquiryProvider } from "./components/Enquiry";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import GetInTouch from "./components/GetInTouch";
import Home from "./pages/Home";
import LayoutPage from "./pages/LayoutPage";
import AmenitiesPage from "./pages/AmenitiesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => scrollToTarget(hash, { offset: pathname === "/amenities" ? -90 : 0 }), 400);
      return () => clearTimeout(t);
    }
    scrollTop(true);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <section className="section-pad container" style={{ minHeight: "70vh", paddingTop: 180 }}>
      <h1 className="display" style={{ fontSize: "clamp(3rem,8vw,7rem)" }}>Lost in the grove.</h1>
      <p className="lede" style={{ margin: "20px 0 32px" }}>That page doesn't exist. Head back to the start.</p>
      <a className="btn btn-gold" href="/">Go to home</a>
    </section>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => startLenis(), []);
  return (
    <EnquiryProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Preloader />
      <Header />
      <ScrollManager />
      <main id="main" key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/layout" element={<LayoutPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <GetInTouch />
    </EnquiryProvider>
  );
}
