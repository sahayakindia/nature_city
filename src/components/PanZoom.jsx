import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Minus, Fit } from "./Icons";

/* Lightweight pan/zoom viewer. Drag to pan, Ctrl/⌘ + scroll or the buttons to zoom, pinch on touch when zoomed. */
export default function PanZoom({ width, height, children, label, maxScale = 8, className = "" }) {
  const wrap = useRef(null);
  const fitK = useRef(1);
  const pointers = useRef(new Map());
  const pinch = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, k: 1 });
  const [dragging, setDragging] = useState(false);

  const clamp = useCallback(
    ({ x, y, k }) => {
      const w = wrap.current;
      if (!w) return { x, y, k };
      const cw = w.clientWidth, ch = w.clientHeight, sw = width * k, sh = height * k;
      x = sw <= cw ? (cw - sw) / 2 : Math.min(0, Math.max(cw - sw, x));
      y = sh <= ch ? (ch - sh) / 2 : Math.min(0, Math.max(ch - sh, y));
      return { x, y, k };
    },
    [width, height]
  );

  const fit = useCallback(() => {
    const w = wrap.current;
    if (!w) return;
    const cw = w.clientWidth, ch = w.clientHeight;
    /* phones: fill the stage height and pan sideways (a 3:1 plan would otherwise be a tiny sliver) */
    const k = cw < 700 ? Math.max(cw / width, ch / height) : Math.min(cw / width, ch / height);
    fitK.current = k;
    setT(clamp({ x: (cw - width * k) / 2, y: (ch - height * k) / 2, k }));
  }, [width, height, clamp]);

  useEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [fit]);

  const zoomAt = useCallback(
    (factor, cx, cy) =>
      setT((p) => {
        const k = Math.min(fitK.current * maxScale, Math.max(fitK.current, p.k * factor));
        const r = k / p.k;
        return clamp({ k, x: cx - (cx - p.x) * r, y: cy - (cy - p.y) * r });
      }),
    [clamp, maxScale]
  );

  useEffect(() => {
    const el = wrap.current;
    const onWheel = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const zoomed = t.k > fitK.current * 1.02;
  const center = () => [wrap.current.clientWidth / 2, wrap.current.clientHeight / 2];

  const down = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = Math.hypot(a.x - b.x, a.y - b.y);
    }
    setDragging(true);
  };
  const move = (e) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, cur);
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = wrap.current.getBoundingClientRect();
      zoomAt(d / pinch.current, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      pinch.current = d;
    } else if (pointers.current.size === 1) {
      const dx = cur.x - prev.x, dy = cur.y - prev.y;
      setT((p) => clamp({ ...p, x: p.x + dx, y: p.y + dy }));
    }
  };
  const up = (e) => {
    pointers.current.delete(e.pointerId);
    pinch.current = null;
    if (!pointers.current.size) setDragging(false);
  };
  const dbl = (e) => {
    const r = wrap.current.getBoundingClientRect();
    if (zoomed) fit();
    else zoomAt(2.6, e.clientX - r.left, e.clientY - r.top);
  };

  return (
    <div className={`pz ${className}`}>
      <div
        ref={wrap}
        className={`pz-stage ${dragging ? "is-drag" : ""}`}
        style={{ "--ar": `${width} / ${height}`, touchAction: zoomed ? "none" : "pan-y" }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onDoubleClick={dbl}
        role="img"
        aria-label={label}
      >
        <div className="pz-content" style={{ width, height, transform: `translate(${t.x}px, ${t.y}px) scale(${t.k})` }}>
          {children}
        </div>
      </div>
      <div className="pz-ctrl">
        <button onClick={() => zoomAt(1.6, ...center())} aria-label="Zoom in"><Plus /></button>
        <button onClick={() => zoomAt(1 / 1.6, ...center())} aria-label="Zoom out"><Minus /></button>
        <button onClick={fit} aria-label="Reset view"><Fit /></button>
      </div>
      <p className="pz-hint"><span className="hint-mouse">Drag to pan · double-click or use + / − to zoom · Ctrl + scroll</span><span className="hint-touch">Drag to pan · pinch or use + / − to zoom</span></p>
    </div>
  );
}
