import { EnquiryForm } from "../components/Enquiry";
import { SITE, whatsappLink } from "../config/site";

export default function Enquire({ id = "enquire" }) {
  return (
    <section className="enquire on-paper section-pad" id={id}>
      <div className="container enquire-card">
        <div className="enquire-side">
          <img src="/images/gate-day.webp" alt="" loading="lazy" />
          <div className="enquire-side-body">
            <h2 className="statement">Speak to a Nature City advisor</h2>
            <p className="lede">Leave your details and we'll call you back — usually within the day.</p>
            <ul className="enquire-contacts">
              <li><span>Phone</span> <a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><span>WhatsApp</span> <a href={whatsappLink()} target="_blank" rel="noreferrer">Message us</a></li>
              <li><span>Email</span> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="enquire-form">
          <h3 className="enquire-h">Request a call back</h3>
          <EnquiryForm idPrefix="e" dark={false} />
        </div>
      </div>
    </section>
  );
}
