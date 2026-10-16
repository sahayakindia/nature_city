// Content taken from the brochure. Colours match each chapter's heading colour in the print brochure.
export const AMENITIES = [
  {
    id: "gardens",
    title: "Gardens",
    color: "#fefad6",
    image: "/images/hammock-grove.webp",
    stat: { value: "17", label: "types of gardens" },
    blurb:
      "Gardens are not merely landscapes — they are part of everyday life. From peaceful Zen and Chime Gardens to colourful Butterfly and Flower Gardens, healing herbal spaces and nourishing farm gardens, every green corner invites residents to pause, connect and grow with nature.",
    groups: [
      {
        name: "Gardens",
        items: ["Neem Garden","Zen Garden","Chime Garden","Bamboo Garden","Butterfly Garden","Hammock Garden","Orchid Park / Green Park","Palm Garden","Rock Garden","Coconut Garden","Flower Garden","Aroma Garden","Vegetable Gardens","Spice Gardens","Herbal Gardens","Millet Gardens","Pulses Gardens"],
      },
    ],
  },
  {
    id: "lawns",
    title: "Lawns & Open Areas",
    color: "#edf5e6",
    image: "/images/clubhouse-lawn.webp",
    blurb:
      "Open spaces bring people, traditions and celebrations together. From the serenity of the Temple to family lawns, festive gatherings, cultural experiences and outdoor play, every space is thoughtfully created for residents to connect, celebrate and build lasting memories as one community.",
    groups: [
      {
        name: "Lawns & Open Area",
        items: ["Temple","Family Activity Lawn","Party Lawn","Panchayat Lawn","Cultural Zone","Open Play Area – Outdoor Kids Play","Senior Citizen Park","Pergola with Seating","Stone Chair","Landscape Seating","Tulip Seating","Luxury Tents","Selfie Point Near Entrance at Owner's Land","Lazy Deck","Tree Plaza with Gazebo","Tree House with Mountain View","Reading Zone","Swing Areas"],
      },
    ],
  },
  {
    id: "naturopathy",
    title: "Naturopathy",
    color: "#edf8fa",
    image: "/images/yoga-gazebo.webp",
    blurb:
      "Seating and green zones transform everyday pauses into meaningful moments. From peaceful senior-citizen spaces and reading corners to gazebos, luxury tents, swings and a tree house with mountain views, every setting invites residents to relax, connect and enjoy nature at their own pace.",
    groups: [
      {
        name: "Naturopathy",
        items: ["Reflexology Pathway","Stepping Stone Pathway","Natural Trail Walkway","Senior Citizen Park","Pergola with Seating","Stone Chair","Landscape Seating","Tulip Seating","Luxury Tents","Selfie Point Near Entrance at Owner's Land","Lazy Deck","Tree Plaza with Gazebo","Tree House with Mountain View","Reading Zone","Swing Areas"],
      },
    ],
  },
  {
    id: "sports",
    title: "Sports",
    color: "#fbb372",
    image: "/images/cricket-day.webp",
    blurb:
      "Sports and movement are part of everyday living. From cricket, tennis and pickleball to traditional games like Kabaddi and Kho-Kho, alongside cycling, jogging and walking tracks, every facility encourages residents of all ages to stay active, compete, connect and grow together.",
    groups: [
      {
        name: "Sports",
        items: ["Basketball Court","Volleyball Court","Badminton Court","Tennis Court","Turf Cricket","Futsal Court","Kabaddi Court","Cycle Track","Cycle with Baby Wagon","Segway","Jogging Track","Walking Track","Complimentary Bikes with Cycle Stand","Throwball Court","Kho-Kho Court","Pickleball Court"],
      },
    ],
  },
  {
    id: "wellness",
    title: "Health & Wellness",
    color: "#fdf5b6",
    image: "/images/yoga-garden.webp",
    blurb:
      "Wellness is not a routine — it is a way of life. Through yoga, meditation, outdoor fitness, natural sunlight, fresh-air zones and spaces for relaxation and laughter, residents are encouraged to strengthen the body, calm the mind and embrace a healthier, more balanced life.",
    groups: [
      {
        name: "Health & Wellness",
        items: ["Outdoor Yoga","Vitamin D Zone","Relaxation Zone","Meditation Zone","Traditional Living Zone","O2 Zone","Outdoor Gym","Laughing Park","HIIT Workout Area"],
      },
    ],
  },
  {
    id: "clubhouse",
    title: "Club House",
    color: "#d6b229",
    image: "/images/clubhouse-court.webp",
    blurb:
      "The Clubhouse is the social heart of elevated living. From lounges, libraries and entertainment spaces to a cafeteria, banquet hall, business facilities and wellness areas, it offers residents a refined setting to relax, connect, celebrate and belong.",
    groups: [
      { name: "Club House", items: ["Preview Theater","Resident Lounge Area","Reception","Library","Business Lounge","Male Toilet","Female Toilet","Locker Room","Cafeteria","Banquet Hall","Kids Waiting Lounge","Digital Library","Association Room","Mobile Charging Station","TV Lounge","Bean Bags","Massage Lounge"] },
      { name: "Fitness", items: ["Indoor Yoga","Dance Floor","Zumba Room","Aerobic Area","Indoor Gym","Interactive Gym","Functional Training","Digital Workout","Senior Citizen's Gym","Meditation Room","Punching Bag"] },
      { name: "Recreation Area", items: ["Ball Pit","Carrom","Chess","Snooker","Table Tennis","Video Games Room","Ludo","Tic-Tac-Toe","Interactive Floor Games","Dart Game","Foosball Table","Art & Craft Room","Virtual Gaming","Air Hockey Table"] },
    ],
  },
  {
    id: "pool",
    title: "Swimming Pool",
    color: "#ffffff",
    image: "/images/pool-deck.webp",
    blurb:
      "The swimming pool is a complete destination for fitness, fun and relaxation. From aqua workouts and children's water play to poolside celebrations, sunken seating and leisurely decks, every experience is designed to create refreshing moments for the entire family.",
    groups: [
      { name: "Swimming Pool", items: ["Swimming Pool","Toddler Pool","Aqua Gym","Kids Play Pool","Water Throw Ball","Poolside Party Deck","Pool Viewing Deck with Swing","Aqua Volleyball","Sun Loungers","Sunken Seating","Bath Area","Male Changing Room","Female Changing Room","Water Bucket Fall","Outdoor Shower for Kids"] },
    ],
  },
];

// Services, shown on the Amenities page below the leisure chapters.
export const SERVICES = [
  {
    id: "facility",
    title: "Health & Daily Needs",
    color: "#ffffff",
    image: "/images/clinic-pharmacy.webp",
    blurb:
      "Residents' well-being is supported by essential healthcare close to home. With a First Aid Centre, dedicated ambulance service, society clinic and pharmacy, timely medical assistance is always within reach.",
    groups: [
      { name: "Health & Medical", items: ["Dedicated Ambulance Service","Society Clinic Center","Pharmacy"] },
      { name: "Groceries", items: ["Online Grocery Delivery","Farm Organic Fruits","Farm Organic Vegetables"] },
    ],
  },
  {
    id: "management",
    title: "Township Management",
    color: "#fbbf94",
    image: "/images/gate-night.webp",
    blurb:
      "Professional township management ensures a safe, organised and well-maintained living environment. With 24/7 security, on-site administration, dedicated staff facilities, in-house electrical and plumbing support, and tree plantation services for plot owners, everyday life remains seamless and worry-free.",
    groups: [
      { name: "Township Management Services", items: ["24/7 Security","On Site Management","Security Personnel Accommodation","Accommodation for Staff People / Rooms","Administrative Office","Toilets for Drivers and Servants","Maintenance Staff Lounge","In-house Electrical and Plumber on Call","Tree Plantation for Plot Owners"] },
    ],
  },
  {
    id: "recycle",
    title: "Recycle",
    color: "#ffffff",
    image: "/images/waste-yard.webp",
    blurb:
      "Waste is managed responsibly at every stage — from collection and segregation to treatment, recycling and safe disposal. With an STP, specialised systems for kitchen, biodegradable, agricultural, plastic and e-waste, and mechanised street cleaning, the township supports a cleaner and more sustainable living environment.",
    groups: [
      { name: "Waste Management", items: ["Kitchen Waste Management","Sewage Treatment Plant (STP)","Bio-Degradable Waste Management","Physical Sludge Management","Agro Based Waste Management","E-Waste Management","Plastic Waste Recycle Management","Street Cleaning Machines","Physical Collection, Grading & Dumping of Daily Waste"] },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    color: "#ffdeae",
    image: "/images/avenue-day.webp",
    blurb:
      "Infrastructure is designed to work quietly, efficiently and reliably behind every beautiful experience. From signature entrances, safe roads and thoughtfully planned pathways to underground electrification, treated water, drainage, solar energy, rainwater harvesting and fire-safety systems, every detail supports secure, sustainable and hassle-free living.",
    groups: [
      { name: "Township-wide infrastructure", items: ["Signature entrances","Safe internal roads","Planned pathways","Underground electrification","Treated water","Drainage","Solar energy","Rainwater harvesting","Fire-safety systems"] },
    ],
  },
  {
    id: "plug",
    title: "Plug & Play Plots",
    color: "#fcb540",
    image: "/images/street-day.webp",
    blurb:
      "Every plot is designed for convenient, plug-and-play ownership. With clear demarcation, individual access, postal identity, electricity, water metering and sewage connectivity already planned, plot owners can begin building with greater ease, clarity and confidence.",
    groups: [
      { name: "Every plot gets", items: ["Individual Post Box Facility","Individual Plot Number","Demarcation of Each Plot","Individual Entry Ramp","Individual Electric Meter","Individual Electric Cables","Individual Domestic Water","Individual Municipal Water","Individual Water Meter","Individual Sewage Line to STP"] },
    ],
  },
];
