/* "At a glance" cards — figures and wording come from the brochure overview. */
// export const GLANCE_CARDS = [
//   { value: "90", label: "Acres", text: "A thoughtfully planned premium township on NH-26, set against a picturesque natural landscape.", image: "/images/aerial-day.webp", icon: "earth" },
//   { value: "250+", label: "Amenities & facilities", text: "Landscaped gardens, sports, clubhouse, wellness and play zones, all inside the gates.", image: "/images/pool-deck.webp", icon: "water" },
//   { value: "17", label: "Types of gardens", text: "From Zen and Chime gardens to butterfly, herbal and farm gardens.", image: "/images/stream.webp", icon: "air" },
//   { value: "05", label: "Elements", text: "Earth, Water, Fire, Air and Space: the five tathvas behind every design choice.", image: "/images/hammock-grove.webp", icon: "space" },
// ];

// src/data/featured.js  (GLANCE_CARDS: `value` replaced by `to` + optional `suffix`)
export const GLANCE_CARDS = [
  { to: 90, label: "Acres", text: "A thoughtfully planned premium township on NH-26, set against a picturesque natural landscape.", image: "/images/aerial-day.webp", icon: "earth" },
  { to: 250, suffix: "+", label: "Amenities & facilities", text: "Landscaped gardens, sports, clubhouse, wellness and play zones, all inside the gates.", image: "/images/pool-deck.webp", icon: "water" },
  { to: 17, label: "Types of gardens", text: "From Zen and Chime gardens to butterfly, herbal and farm gardens.", image: "/images/stream.webp", icon: "air" },
  { to: 5, label: "Elements", text: "Earth, Water, Fire, Air and Space: the five tathvas behind every design choice.", image: "/images/hammock-grove.webp", icon: "space" },
];

/* The four-node compass: four signature zones, each with a short brochure-based pitch. */
export const COMPASS = [
  {
    chip: "Zone 01 · Nature", title: "Seventeen", accent: "Gardens", short: "Gardens",
    tagline: "Gardens that are part of everyday life.",
    points: ["Zen & Chime gardens", "Butterfly & flower gardens", "Herbal & farm gardens"],
    image: "/images/stream.webp", cta: "Explore gardens", to: "/amenities#gardens",
  },
  {
    chip: "Zone 02 · Movement", title: "Everyday", accent: "Sports", short: "Sports",
    tagline: "Sports and movement, part of everyday living.",
    points: ["Turf cricket & tennis", "Pickleball, Kabaddi & Kho-Kho", "Cycle, jog & walking tracks"],
    image: "/images/tennis-day.webp", cta: "Explore sports", to: "/amenities#sports",
  },
  {
    chip: "Zone 03 · Community", title: "The Social", accent: "Club House", short: "Club House",
    tagline: "The social heart of elevated living.",
    points: ["Banquet hall & library", "Cafeteria & business lounge", "Swimming pool & kids' pool"],
    image: "/images/clubhouse-court.webp", cta: "Explore the club house", to: "/amenities#clubhouse",
  },
  {
    chip: "Zone 04 · Ownership", title: "Ready-to-build", accent: "Plots", short: "Plots",
    tagline: "Plug-and-play ownership, planned from day one.",
    points: ["Individual electric meter", "Individual water meter", "Individual sewage line to STP"],
    image: "/images/street-night.webp", cta: "Explore the plots", to: "/layout",
  },
];
