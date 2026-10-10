// ─────────────────────────────────────────────────────────────
//  SITE CONFIG — everything marked TODO needs your real details
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: "The Nature City",
  builder: "Mangal Realty",
  tagline: "World-class resort style residential township",
  url: "https://thenaturecity.com", // TODO: final domain

  // TODO: replace with real contact details
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsappNumber: "910000000000", // country code + number, no "+"
  email: "sales@example.com",
  officeAddress: "Mangal Realty, Visakhapatnam, Andhra Pradesh", // TODO

  // TODO: Legal. Shown in the footer only when filled in.
  rera: "", // e.g. "P01234567890"
  approvals: "", // e.g. "DTCP / VUDA approved"
  disclaimer:
    "Images are artistic impressions and are indicative only. Amenities, specifications and layouts are subject to change at the discretion of the developer and approvals from competent authorities.",

  // TODO: exact pin for the project gate. Used by the location map + directions button.
  location: {
    label: "The Nature City, NH-26, Visakhapatnam",
    lat: 17.6868, // placeholder = Visakhapatnam city centre
    lng: 83.2185,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Visakhapatnam",
  },

  // Show the plot availability panel on the Layout page.
  // Reads /plot-status.json. Keep false until plot IDs match the layout drawing (A-/B-/C- series).
  showAvailability: false,

  // Enquiry endpoint (Vercel serverless function in /api/enquiry.js)
  enquiryEndpoint: "/api/enquiry",
};

export const whatsappLink = (text = "Hi, I'd like to know more about The Nature City.") =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
