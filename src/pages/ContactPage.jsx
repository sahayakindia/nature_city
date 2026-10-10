import PageHead from "./PageHead";
import Enquire from "../sections/Enquire";
import Location from "../sections/Location";
import usePageMeta from "../hooks/usePageMeta";

export default function ContactPage() {
  usePageMeta("Contact", "Book a site visit or request a call back from The Nature City advisors.");
  return (
    <>
      <PageHead kicker="Contact" title="Come and" accent="see the land." image="/images/treehouse-day.webp">
        Book a site visit, ask about plots, or request the brochure. We'll get back to you the same day.
      </PageHead>
      <Enquire id="contact-form" />
      <Location />
    </>
  );
}
