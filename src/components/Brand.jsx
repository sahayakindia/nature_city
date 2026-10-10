/* Brochure lettering: the printed brochure sets every lowercase "w" in Aladin and every "&" in Cochin Bold
   inside the Brolian Black headings (e.g. "La*w*ns", "To*w*nship", "Plug *&* Play"). */
export default function Brand({ children }) {
  return String(children)
    .split(/(w|&)/g)
    .map((s, i) => (s === "w" ? <span key={i} className="sw">w</span> : s === "&" ? <span key={i} className="amp">&amp;</span> : s));
}
