/* A tiny land-plot scene for the quote button:
   earth + a surveyed plot, a house that draws itself, a map pin that drops onto the plot,
   birds drifting through the air, and grass swaying in the breeze. Animation lives in genie.css. */
export default function PlotScene() {
  return (
    <svg className="ps" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="ps-clip"><circle cx="28" cy="28" r="27" /></clipPath>
        <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23735a" />
          <stop offset="1" stopColor="#0f3d2e" />
        </linearGradient>
        <linearGradient id="ps-earth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c49a3c" />
          <stop offset="1" stopColor="#6f4f1f" />
        </linearGradient>
      </defs>

      <g clipPath="url(#ps-clip)">
        <rect width="56" height="56" fill="url(#ps-sky)" />
        <circle className="ps-sun" cx="13.5" cy="14.5" r="4.2" fill="#f3c94a" />

        {/* air: two birds */}
        <g className="ps-bird b1"><path className="ps-wing" d="M0 0q2.2-2.6 4.4 0q2.2-2.6 4.4 0" fill="none" stroke="#fff8df" strokeWidth="1" strokeLinecap="round" /></g>
        <g className="ps-bird b2"><path className="ps-wing" d="M0 0q1.8-2.1 3.6 0q1.8-2.1 3.6 0" fill="none" stroke="#fff8df" strokeWidth=".9" strokeLinecap="round" /></g>

        {/* earth + the surveyed plot */}
        <path d="M0 39Q14 36.5 28 38.5T56 37V56H0Z" fill="url(#ps-earth)" />
        <path className="ps-plot" d="M9 46.5L22 43.2L48 45L43 51.5L13 51.5Z" fill="rgba(255,248,223,.1)" stroke="#fff8df" strokeWidth=".9" strokeDasharray="2 1.6" strokeLinejoin="round" />

        {/* grass in the air */}
        <g className="ps-grass" stroke="#5fc95f" strokeWidth="1.3" strokeLinecap="round" fill="none">
          <path d="M33.5 40q-.7-3 .8-4.7" /><path d="M35.6 40q.4-3.4 2.1-4.5" /><path d="M51 38.5q-.8-2.6.4-4" />
        </g>

        {/* the house draws itself */}
        <g fill="none" stroke="#fff8df" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path className="ps-wall" pathLength="1" d="M14 40V31.5H30V40" />
          <path className="ps-roof" pathLength="1" d="M12 32.6L22 23.5L32 32.6" />
          <path className="ps-door" pathLength="1" d="M20 40V35.6H24V40" />
        </g>
        <rect className="ps-win" x="15.7" y="33.3" width="2.6" height="2.6" rx=".4" fill="#f3c94a" />

        {/* the map pin lands on the plot */}
        <ellipse className="ps-ripple" cx="42" cy="46.5" rx="5" ry="1.8" fill="none" stroke="#f3c94a" strokeWidth=".9" />
        <g className="ps-pin">
          <path d="M42 46.5c-3-3.4-5.4-6-5.4-9a5.4 5.4 0 0 1 10.8 0c0 3-2.4 5.6-5.4 9z" fill="#f3c94a" />
          <circle cx="42" cy="37.5" r="2" fill="#0c3626" />
        </g>
      </g>
      <circle cx="28" cy="28" r="26.6" fill="none" stroke="#d6b229" strokeWidth="1.2" />
    </svg>
  );
}
