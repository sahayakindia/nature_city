import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { SITE, whatsappLink } from "../config/site";
import { lockScroll } from "../hooks/lenis";
import { Close, Arrow } from "./Icons";

const Ctx = createContext({ open: () => {} });
export const useEnquiry = () => useContext(Ctx);

const INTENTS = ["Book a site visit", "Request a call back", "Get the brochure", "Ask about plots"];

export function EnquiryForm({ idPrefix = "f", onDone, dark = true }) {
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ name: "", phone: "", email: "", intent: INTENTS[0], message: "", company: "" });
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (data.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^[+]?[\d\s-]{8,16}$/.test(data.phone.trim())) e.phone = "Enter a valid phone or WhatsApp number.";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setState("sending");
    try {
      const res = await fetch(SITE.enquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.href }),
      });
      if (!res.ok) throw new Error("bad status");
      setState("done");
      onDone && setTimeout(onDone, 2600);
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="form-done" role="status">
        <p className="statement">Thank you, {data.name.split(" ")[0]}.</p>
        <p className="lede">Our team will reach out on {data.phone} shortly to {data.intent.toLowerCase()}.</p>
      </div>
    );
  }

  return (
    <form className={`enq ${dark ? "" : "enq-light"}`} onSubmit={submit} noValidate>
      <div className="enq-row">
        <div className="field">
          <label htmlFor={`${idPrefix}-name`}>Full name</label>
          <input id={`${idPrefix}-name`} value={data.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <span className="err">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-phone`}>Phone / WhatsApp</label>
          <input id={`${idPrefix}-phone`} type="tel" inputMode="tel" value={data.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} />
          {errors.phone && <span className="err">{errors.phone}</span>}
        </div>
      </div>
      <div className="enq-row">
        <div className="field">
          <label htmlFor={`${idPrefix}-email`}>Email (optional)</label>
          <input id={`${idPrefix}-email`} type="email" value={data.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email && <span className="err">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-intent`}>I'd like to</label>
          <select id={`${idPrefix}-intent`} value={data.intent} onChange={set("intent")}>
            {INTENTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-msg`}>Message (optional)</label>
        <textarea id={`${idPrefix}-msg`} rows="3" value={data.message} onChange={set("message")} />
      </div>
      {/* honeypot — real visitors never see this */}
      <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={data.company} onChange={set("company")} name="company" />
      <button className="btn btn-gold" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Request a call back"} <Arrow />
      </button>
      {state === "error" && (
        <p className="err form-err" role="alert">
          We couldn't send that. Try again, or{" "}
          <a href={whatsappLink(`Hi, I'm ${data.name}. I'd like to ${data.intent.toLowerCase()} at The Nature City.`)} target="_blank" rel="noreferrer">
            message us on WhatsApp
          </a>
          .
        </p>
      )}
      <p className="fine">By submitting you agree to be contacted about The Nature City. We never share your details.</p>
    </form>
  );
}

export function EnquiryProvider({ children }) {
  const [isOpen, setOpen] = useState(false);
  const dlg = useRef(null);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    setTimeout(() => dlg.current?.querySelector("input")?.focus(), 60);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Speak to an advisor" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="modal-card" ref={dlg}>
            <button className="icon-btn modal-x" onClick={close} aria-label="Close">
              <Close />
            </button>
            <p className="kicker">Speak to an advisor</p>
            <h2 className="statement">
              Plan a visit to <span className="accent">The Nature City.</span>
            </h2>
            <EnquiryForm idPrefix="m" onDone={close} />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
