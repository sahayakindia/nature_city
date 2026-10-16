import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Close } from "./Icons";
import { lockScroll } from "../hooks/lenis";

/* Full-screen video pop-up. The close button (top right) or Esc closes it; the video has its own controls. */
export default function VideoModal({ sources, poster, title = "Video", onClose }) {
  const closeBtn = useRef(null);
  const vid = useRef(null);

  useEffect(() => {
    const back = document.activeElement;
    lockScroll(true, "video");
    closeBtn.current?.focus();
    vid.current?.play().catch(() => {});
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {            // keep focus inside the pop-up
        e.preventDefault();
        (document.activeElement === closeBtn.current ? vid.current : closeBtn.current)?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false, "video");
      back?.focus?.();
    };
    // eslint-disable-next-line
  }, []);

  return createPortal(
    <div className="vm" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <button ref={closeBtn} className="vm-close" aria-label="Close video" onClick={onClose}><Close /></button>
      <video ref={vid} className="vm-video" poster={poster} controls autoPlay playsInline loop onClick={(e) => e.stopPropagation()}>
        {sources.map((v) => <source key={v.src} src={v.src} type={v.type} />)}
      </video>
    </div>,
    document.body
  );
}
