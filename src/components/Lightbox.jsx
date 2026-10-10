import { useEffect, useRef } from "react";
import { lockScroll } from "../hooks/lenis";
import { Close, Chevron } from "./Icons";

export default function Lightbox({ items, index, onClose, onIndex }) {
  const ref = useRef(null);
  const open = index !== null && index >= 0;
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    ref.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, index, items.length, onClose, onIndex]);
  if (!open) return null;
  const it = items[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <button ref={ref} className="icon-btn lb-close" onClick={onClose} aria-label="Close"><Close /></button>
      <button className="icon-btn lb-nav lb-prev" onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous"><Chevron dir="left" /></button>
      <figure>
        <img src={it.src} alt={it.caption} />
        <figcaption>
          <span>{it.caption}</span>
          <span className="lb-count">{index + 1} / {items.length}</span>
        </figcaption>
      </figure>
      <button className="icon-btn lb-nav lb-next" onClick={() => onIndex((index + 1) % items.length)} aria-label="Next"><Chevron dir="right" /></button>
    </div>
  );
}
