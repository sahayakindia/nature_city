import { Chevron } from "./Icons";

/* An animated dropdown button that reveals a panel. Controlled: pass `open` and `onToggle`. */
export default function Disclosure({ id, label, hint, open, onToggle, children, className = "" }) {
  return (
    <div className={`disc ${open ? "is-open" : ""} ${className}`}>
      <button type="button" className="disc-btn" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span className="disc-face">
          <span className="disc-text">
            <b>{label}</b>
            {hint && <small>{hint}</small>}
          </span>
          <span className="disc-chev" aria-hidden="true"><Chevron dir="down" /></span>
        </span>
      </button>
      <div id={id} className="disc-panel" role="region" aria-label={label}>
        <div className="disc-inner">{children}</div>
      </div>
    </div>
  );
}
