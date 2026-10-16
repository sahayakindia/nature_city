/* The Nature City logo (TNC_LOGO.png).
   "full" = the complete lockup with the "World-class resort style residential township" line — used everywhere
            (header, footer, entrance). "mark" is a cropped version without the line and is no longer used.
   Sizes are set in styles/refresh.css. */
export default function Logo({ variant, size, className = "" }) {
  const v = variant || "full";
  const full = v === "full";
  return (
    <img
      className={`logo-img logo-${v} ${className}`}
      src={full ? "/images/logo-full.webp" : "/images/logo-mark.webp"}
      width={full ? 1100 : 760}
      height={full ? 678 : 386}
      alt="The Nature City by Mangal Realty"
      decoding="async"
    />
  );
}
