// Everything here comes from the legacy khaled-zaki.com site (biography, contacts, news pages).

export const artist = {
  name: "Khaled Zaki",
  role: "Sculptor",
  born: "Born in Suez, Egypt in 1964",
} as const;

export const biography = [
  "Sculptor Khaled Zaki holds a Master in Restoration from the Faculty of Archaeology and a Bachelor in Management from the Faculty of Commerce at Cairo University.",
  "Zaki studied Sculpture at the Al Khonany Museum of Art in Giza and perfected his use of stone and bronze in the various workshops in Pietrasanta (LU), Italy.",
  "In 2000 he won a national competition for the design and execution of a monumental sculpture in Galaa Square, Cairo.",
  "In 2015 he won the “International Artist prize” from ART Taipei, Taiwan.",
  "During the Egyptian revolution of January 25th his works clearly moved from abstract to a mix between figurative and abstract, where the artist in his style could capture and express the feelings, dreams, and expectations of human beings in general, and above all of today’s Egyptian and Arab society.",
  "Zaki’s passion for the ancient Egyptian and Mediterranean arts and his deep concern with the subject of resurrection can be felt in the forms, techniques and colours of his sculptures.",
  "He held the honour of representing his homeland in the Egypt Pavilion of the 2013 Venice Biennale.",
  "Zaki has participated in global exhibitions and symposiums.",
];

export const collections = {
  museums: ["Egyptian Museum for Modern Art, Cairo", "Egyptian Museum for Modern Sculpture, Aswan"],
  privateCollections: [
    "United States",
    "Belgium",
    "Italy",
    "Germany",
    "Ireland",
    "Mexico",
    "Kuwait",
    "UAE",
    "KSA",
  ],
};

export const milestones: { year: string; text: string; href?: string }[] = [
  { year: "1964", text: "Born in Suez, Egypt." },
  { year: "1989", text: "First prize in painting, Pietrasanta, Italy.", href: "/news/first-prize-in-painting" },
  {
    year: "2000",
    text: "First national prize for the monumental sculpture and redesign of Galaa Square, Cairo.",
    href: "/news/first-national-prize",
  },
  { year: "2002", text: "Time to Return exhibition, Cairo.", href: "/drawings/time-to-return" },
  { year: "2002", text: "European Travelers — Safar Khan, Cairo.", href: "/news/european-travelers" },
  {
    year: "2013",
    text: "Represents Egypt at the 55th Venice Biennale with The Treasure of Knowledge.",
    href: "/news/egyptian-pavilion-venice-biennale",
  },
  { year: "2014", text: "In the Wind of January — Artspace, Dubai.", href: "/news/in-the-wind-of-january" },
  { year: "2014", text: "Intersections — Gallery Misr, Cairo.", href: "/news/intersections" },
  { year: "2015", text: "Khaled Zaki at Heist, 5 March – 30 April.", href: "/news/khaled-zaki-at-heist" },
  { year: "2015", text: "International Artist prize, ART Taipei, Taiwan." },
];

export type Studio = {
  country: string;
  address: string;
  phoneLabel: string;
  phone: string;
  mapQuery: string;
};

export const mapsLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const mapsEmbed = (query: string) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;

export const studios: Studio[] = [
  {
    country: "Egypt",
    address: "Dream Land building 304/32, 6th of October City, Giza",
    phoneLabel: "Mobile",
    phone: "+201222188606",
    mapQuery: "6th of October City, Giza, Egypt",
  },
  {
    country: "Italy",
    address: "Via Pizzetto 13, Valdicastello, 55045 Pietrasanta (LU)",
    phoneLabel: "Telephone",
    phone: "+390584796120",
    mapQuery: "Via Pizzetto 13, 55045 Pietrasanta LU, Italy",
  },
];

export function formatPhone(phone: string) {
  if (phone.startsWith("+20")) return `+20 ${phone.slice(3, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`;
  if (phone.startsWith("+39")) return `+39 ${phone.slice(3, 7)} ${phone.slice(7)}`;
  return phone;
}

// Listed as the author contact in the legacy site's metadata.
export const email = "kaledzaki@gmail.com";

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/khaled.zaki.92/" },
  { label: "Facebook", href: "https://www.facebook.com/sculptorkhaledzaki" },
  { label: "YouTube", href: "https://www.youtube.com/@khaledzaki4264" },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const navigation: NavItem[] = [
  {
    label: "Sculptures",
    href: "/sculptures",
    children: [
      { label: "Stone", href: "/sculptures/stone" },
      { label: "Bronze", href: "/sculptures/bronze" },
      { label: "Old works", href: "/sculptures/old-works" },
    ],
  },
  {
    label: "Drawings",
    href: "/drawings",
    children: [
      { label: "Figures", href: "/drawings/figures" },
      { label: "Profiles", href: "/drawings/profiles" },
      { label: "Sitting people", href: "/drawings/sitting-people" },
      { label: "Sufis", href: "/drawings/sufis" },
      { label: "Time to Return, 2002", href: "/drawings/time-to-return" },
    ],
  },
  { label: "Biography", href: "/biography" },
  { label: "Video", href: "/video" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];
