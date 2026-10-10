export function Sprig({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 34" fill="none" aria-hidden="true">
      <path d="M2 30 C 22 27, 44 20, 76 4" stroke="#44b03e" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M30 22 C 28 12, 38 6, 46 8 C 46 16, 38 22, 30 22Z" fill="#44b03e" />
      <path d="M50 14 C 50 6, 58 1, 66 2 C 66 9, 58 14, 50 14Z" fill="#44b03e" />
      <path d="M64 7 C 66 3, 71 1, 76 1 C 75 5, 70 8, 64 7Z" fill="#44b03e" />
    </svg>
  );
}

export default function Logo({ size = "md", className = "" }) {
  return (
    <span className={`logo logo-${size} ${className}`} aria-label="The Nature City by Mangal Realty">
      <span className="logo-top">
        <span className="logo-the">THE</span>
        <Sprig className="logo-sprig" />
      </span>
      <span className="logo-nature">NATURE</span>
      <span className="logo-city">
        CITY <em>BY <b>MANGAL REALTY</b></em>
      </span>
    </span>
  );
}
