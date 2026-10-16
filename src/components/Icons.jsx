const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };

export const Arrow = (p) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M2 8h12M9 3l5 5-5 5" />
  </svg>
);
export const Plus = (p) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M8 2v12M2 8h12" />
  </svg>
);
export const Minus = (p) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M2 8h12" />
  </svg>
);
export const Fit = (p) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
  </svg>
);
export const Close = (p) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
);
export const Chevron = ({ dir = "right", ...p }) => (
  <svg viewBox="0 0 16 16" {...base} {...p} style={{ transform: `rotate(${{ right: 0, down: 90, left: 180, up: 270 }[dir]}deg)` }}>
    <path d="M6 2l6 6-6 6" />
  </svg>
);
export const Chat = (p) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M3 4h14v9H9l-4 3v-3H3z" />
  </svg>
);
export const Phone = (p) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M4 3h3l1.5 4-2 1.2a9 9 0 0 0 5.3 5.3L13 11.5l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A13.5 13.5 0 0 1 2.5 4.6 1.5 1.5 0 0 1 4 3z" />
  </svg>
);
export const Mail = (p) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <rect x="2.5" y="4.5" width="15" height="11" rx="1.8" />
    <path d="M3 5.6l7 5.1 7-5.1" />
  </svg>
);
export const Whatsapp = (p) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M10 2.4a7.6 7.6 0 0 0-6.5 11.5L2.5 17.5l3.7-1A7.6 7.6 0 1 0 10 2.4z" />
    <path d="M7.5 6.7c.3-.4.6-.4.9 0l.8 1.3c.1.3 0 .5-.2.8l-.4.5c.6 1.1 1.5 2 2.7 2.6l.5-.5c.3-.2.5-.3.8-.1l1.3.7c.3.2.4.5.2.9-.4 1-1.4 1.5-2.5 1.3-2.6-.6-4.6-2.6-5.2-5.2-.1-.9.3-1.8 1.1-2.3z" />
  </svg>
);
export const Play = (p) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...p}>
    <path d="M6.2 3.6v12.8a.8.8 0 0 0 1.2.7l10.3-6.4a.8.8 0 0 0 0-1.4L7.4 2.9a.8.8 0 0 0-1.2.7z" />
  </svg>
);
export const Pin = (p) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M10 18s6-5.2 6-9.5a6 6 0 1 0-12 0C4 12.8 10 18 10 18z" />
    <circle cx="10" cy="8.5" r="2.2" />
  </svg>
);

/* The five tathvas, drawn as thin line icons for the preloader and section markers */
export const TathvaIcon = ({ name, ...p }) => {
  const s = { ...base, strokeWidth: 1.2 };
  switch (name) {
    case "earth":
      return (
        <svg viewBox="0 0 32 32" {...s} {...p}>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 6v20M6 16h20" opacity=".45" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 32 32" {...s} {...p}>
          <path d="M16 4c4.5 6 8 9.5 8 14a8 8 0 0 1-16 0c0-4.5 3.5-8 8-14z" />
          <path d="M12 19a4 4 0 0 0 4 4" opacity=".55" />
        </svg>
      );
    case "fire":
      return (
        <svg viewBox="0 0 32 32" {...s} {...p}>
          <path d="M16 4c1 5 7 8 7 15a7 7 0 0 1-14 0c0-3 1.5-5 3-6.5.3 2 1.2 3 2.2 3.5C14 12 14.5 8 16 4z" />
        </svg>
      );
    case "air":
      return (
        <svg viewBox="0 0 32 32" {...s} {...p}>
          <path d="M4 12h15a3.5 3.5 0 1 0-3.5-3.5M4 18h20a3.5 3.5 0 1 1-3.5 3.5M4 24h9" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" {...s} {...p}>
          <circle cx="16" cy="16" r="2.4" />
          <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(-25 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(35 16 16)" opacity=".5" />
        </svg>
      );
  }
};
