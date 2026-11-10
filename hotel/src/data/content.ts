/**
 * All copy and imagery for the site lives here so the brand can be swapped
 * without touching components.
 *
 * Images are hot-linked from Unsplash (free licence) as placeholders. Replace
 * them with the property's own photography before launch: hot-linked images
 * can be removed upstream, and stock photos don't sell a real hotel.
 */

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export interface Photo {
  src: string;
  alt: string;
  /** Tone shown behind the image while it loads, or if it fails. */
  tone: string;
}

export const brand = {
  name: "Solenne",
  tagline: "Hotel & Spa",
  location: "Cape Mirelle",
  coords: "6°02′N · 80°13′E",
  established: "Est. 1924",
  phone: "+94 11 000 0000",
  phoneHref: "tel:+94110000000",
  email: "stay@solenne.example",
  address: ["14 Lighthouse Road", "Cape Mirelle", "Southern Coast"],
} as const;

export const nav = [
  { label: "Suites", href: "#suites" },
  { label: "Experiences", href: "#experiences" },
  { label: "Dining", href: "#dining" },
  { label: "Journal", href: "#voices" },
  { label: "Reserve", href: "#reserve" },
] as const;

export const hero: Photo = {
  src: unsplash("1566073771259-6a8506099945", 2400),
  alt: "Infinity pool at dusk, lit from beneath, opening onto the sea",
  tone: "#2b3a3a",
};

export const intro = {
  eyebrow: "A house by the sea",
  statement:
    "Forty-two rooms on a cliff above the Indian Ocean, built around a colonial lighthouse keeper's home. No lobby queues, no wristbands — just salt air, linen, and time that moves at the pace of the tide.",
  stats: [
    { value: "42", label: "Suites & villas" },
    { value: "1924", label: "Lighthouse built" },
    { value: "3", label: "Private coves" },
  ],
  photo: {
    src: unsplash("1520250497591-112f2f40a3f4", 1400),
    alt: "Loungers beside a pool framed by palm trees",
    tone: "#5b6a5a",
  } satisfies Photo,
};

export interface Suite {
  name: string;
  kind: string;
  size: string;
  guests: string;
  from: number;
  photo: Photo;
}

export const suites: Suite[] = [
  {
    name: "Tide Room",
    kind: "Garden view",
    size: "38 m²",
    guests: "2 guests",
    from: 240,
    photo: {
      src: unsplash("1582719478250-c89cae4dc85b", 1400),
      alt: "Bright bedroom with white linen and a reading chair",
      tone: "#cfc3b0",
    },
  },
  {
    name: "Lantern Suite",
    kind: "Ocean view",
    size: "54 m²",
    guests: "2 guests",
    from: 380,
    photo: {
      src: unsplash("1590490360182-c33d57733427", 1400),
      alt: "Suite with a king bed facing tall windows",
      tone: "#bfae96",
    },
  },
  {
    name: "Keeper's Loft",
    kind: "Two levels",
    size: "72 m²",
    guests: "3 guests",
    from: 520,
    photo: {
      src: unsplash("1611892440504-42a792e24d32", 1400),
      alt: "Warm-toned bedroom with timber headboard and soft lamps",
      tone: "#a58e72",
    },
  },
  {
    name: "Cliff Villa",
    kind: "Private pool",
    size: "140 m²",
    guests: "4 guests",
    from: 980,
    photo: {
      src: unsplash("1571896349842-33c89424de2d", 1400),
      alt: "Private villa terrace with a plunge pool",
      tone: "#6e7f78",
    },
  },
];

export interface Experience {
  index: string;
  title: string;
  blurb: string;
  photo: Photo;
}

export const experiences: Experience[] = [
  {
    index: "01",
    title: "Salt Spa",
    blurb: "Coconut-oil rituals and a seawater hammam carved into the rock.",
    photo: {
      src: unsplash("1544161515-4ab6ce6db874", 1000),
      alt: "Massage treatment room with folded towels and candles",
      tone: "#a8937c",
    },
  },
  {
    index: "02",
    title: "Dawn Sailing",
    blurb: "A wooden oruwa out past the reef before the heat arrives.",
    photo: {
      src: unsplash("1507525428034-b723cf961d3e", 1000),
      alt: "Turquoise water meeting a pale sand beach",
      tone: "#7fa3a6",
    },
  },
  {
    index: "03",
    title: "Tea Country",
    blurb: "A day in the hills with a planter, a flask, and no itinerary.",
    photo: {
      src: unsplash("1500530855697-b586d89ba3ee", 1000),
      alt: "Mist settling over green hills",
      tone: "#58705c",
    },
  },
  {
    index: "04",
    title: "Lighthouse Suppers",
    blurb: "Eight seats at the top of the tower, one menu, one sunset.",
    photo: {
      src: unsplash("1414235077428-338989a2e8c0", 1000),
      alt: "Candle-lit dinner table set with glassware",
      tone: "#5a4636",
    },
  },
];

export const dining = {
  eyebrow: "The Sea House",
  title: ["Cooked over", "driftwood fire"],
  body: "Our kitchen buys from the boats that land below the cliff every morning. What isn't caught isn't served — the menu is written at noon and chalked on the wall by four.",
  hours: [
    { label: "Breakfast", value: "07:00 – 11:00" },
    { label: "Lunch", value: "12:30 – 15:00" },
    { label: "Supper", value: "19:00 – 22:30" },
  ],
  photo: {
    src: unsplash("1517248135467-4c7edcad34c4", 2400),
    alt: "Restaurant interior with warm pendant lights and timber tables",
    tone: "#3d2f26",
  } satisfies Photo,
};

export const voices = [
  { quote: "The quietest luxury on the island.", source: "Travel Quarterly" },
  { quote: "A hotel that understands slowness.", source: "The Weekend Edit" },
  { quote: "Book the loft. Thank us later.", source: "Coastline Journal" },
  { quote: "Breakfast alone is worth the flight.", source: "Atlas & Table" },
] as const;

export const roomTypes = suites.map((s) => s.name);
