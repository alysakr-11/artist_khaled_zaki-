import bodies from "./generated/news-bodies.json";
import { heistImage, type Picture } from "./works";

export type Segment = { text: string; kind?: "label" | "question" };
export type Paragraph = Segment[][];

export type NewsItem = {
  slug: string;
  title: string;
  dateline: string;
  summary: string;
  lang: "en" | "ar";
  byline?: string;
  images: Picture[];
  paragraphs: Paragraph[];
  externalUrl?: string;
};

type BodyKey = keyof typeof bodies;

// The legacy articles end with the author's credit in bold; it is shown as the byline instead.
function withoutCredit(paragraphs: Paragraph[]): Paragraph[] {
  const last = paragraphs.at(-1);
  const lastLine = last?.at(-1);
  if (!last || !lastLine || lastLine[0]?.kind !== "label") return paragraphs;
  const trimmed = last.slice(0, -1);
  return trimmed.length ? [...paragraphs.slice(0, -1), trimmed] : paragraphs.slice(0, -1);
}

function body(key: BodyKey) {
  const entry = bodies[key];
  return { images: entry.images as Picture[], paragraphs: withoutCredit(entry.paragraphs as Paragraph[]) };
}

// Order and wording follow the legacy news page; dates are given exactly as the source states them.
export const news: NewsItem[] = [
  {
    slug: "the-return",
    title: "The Return",
    dateline: "26 September – 9 October · Ubuntu Art Gallery, Zamalek",
    summary: "A solo exhibition at Ubuntu Art Gallery, Zamalek, Cairo, from 26 September to 9 October.",
    lang: "en",
    images: body("the-return-khaled-zaki").images,
    paragraphs: [
      [[{ text: "The solo exhibition The Return runs from 26 September to 9 October at Ubuntu Art Gallery, Zamalek, Cairo, Egypt." }]],
    ],
  },
  {
    slug: "beirut-art-fair",
    title: "Beirut Art Fair",
    dateline: "21 – 24 September",
    summary: "Khaled Zaki at the Beirut Art Fair, 21 – 24 September.",
    lang: "en",
    images: body("beirut-art-fair").images,
    paragraphs: [[[{ text: "Khaled Zaki at the Beirut Art Fair, 21 – 24 September." }]]],
  },
  {
    slug: "egyptian-pavilion-venice-biennale",
    title: "The Egyptian Pavilion",
    dateline: "55th Venice Biennale · 2013",
    summary:
      "The Egyptian Pavilion seems to bring to every Biennale a deeper sign of the political ferment that distinguishes its recent story — an interview with Khaled Zaki, artist and curator of The Treasure of Knowledge.",
    byline: "Maria Giovanna Tumino, “Prototype LuxFlux Art”, Special Venice Biennale",
    lang: "en",
    ...body("news_1"),
  },
  {
    slug: "khaled-zaki-at-heist",
    title: "Khaled Zaki at Heist",
    dateline: "Origins · 5 March – 30 April 2015",
    summary: "The Pregnant, 2014, bronze, 77 × 18 × 20 cm — shown at Heist.",
    lang: "en",
    images: [heistImage],
    paragraphs: [[[{ text: "Khaled Zaki — The Pregnant, 2014, bronze, 77 × 18 × 20 cm. Shown at Heist from 5 March to 30 April 2015." }]]],
    // The legacy link (heist-online.com/origins) now lives on the gallery's new domain.
    externalUrl: "http://www.heistgallery.com/exhibition/origins/",
  },
  {
    slug: "intersections",
    title: "Intersections",
    dateline: "Gallery Misr · 2014",
    summary:
      "I was pondering the concept of intersection while I crossed Hassan Sabry Road to Gallery Misr. The idea has a double connotation: mathematical, and romantic.",
    byline: "Rania Khallaf, Al-Ahram Weekly, 13 March 2015",
    lang: "en",
    ...body("news_5"),
  },
  {
    slug: "in-the-wind-of-january",
    title: "In the Wind of January",
    dateline: "Artspace, Dubai · 2014",
    summary:
      "Into the wind they surrender these elongated bodies. They have round trunks for legs and subtly clasped hands within which they hold a precious stone or flowers, as if it were an offering to an unknown force.",
    byline: "Rebecca Anne Proctor",
    lang: "en",
    ...body("news_3"),
  },
  {
    slug: "riyah-kanun-al-thani",
    title: "«رياح كانون الثاني» تروض الرخام والبرونز",
    dateline: "دبي · محمد أبو عرب",
    summary:
      "يشتغل النحات المصري خالد زكي في معرضه «في رياح كانون الثاني» الذي يستضيفه غاليري آرت سبيس في دبي على واحدة من الموضوعات التي لا يتوقف الفن عن طرحها…",
    lang: "ar",
    ...body("news_8"),
  },
  {
    slug: "european-travelers",
    title: "European Travelers",
    dateline: "Khaled Zaki at Safar Khan · 2002",
    summary:
      "Zaki left Egypt to live in Italy, a fact that has noticeably changed his work. This connection may be quite tenuous but it does bring the two very disparate artists together and allows visitors to the gallery to examine the effect of a place on an artist.",
    lang: "en",
    images: body("news_2").images,
    paragraphs: [
      [
        [
          {
            text: "Zaki left Egypt to live in Italy, a fact that has noticeably changed his work. This connection may be quite tenuous but it does bring the two very disparate artists together and allows visitors to the gallery to examine the effect of a place on an artist.",
          },
        ],
      ],
    ],
  },
  {
    slug: "first-national-prize",
    title: "First National Prize",
    dateline: "Galaa Square, Cairo · 2000",
    summary: "First national prize for the sculpture work and the redesign of Galaa Square, Cairo.",
    lang: "en",
    images: body("news_6").images,
    paragraphs: [[[{ text: "First national prize for the sculpture work and the redesign of Galaa Square, Cairo." }]]],
  },
  {
    slug: "bayn-ibda-tutmusi-wa-sufiyyat-al-rumi",
    title: "خالد زكى (بين إبداع تتموزى وصوفية الرومى)",
    dateline: "ياسر جاد يكتب",
    summary:
      "كان تواجدى بقاعة (جاليرى مصر الخاصة) بحى الزمالك الشهير، والذى كان يستضيف كوكبة من فنانى ومثالى مصر المعاصرين، هو يوم حاسم وفارق فى إنجذابى نحو أعمال الرائع خالد زكى…",
    lang: "ar",
    ...body("news_4"),
  },
  {
    slug: "first-prize-in-painting",
    title: "First Prize in Painting",
    dateline: "Pietrasanta, Italy · 1989",
    summary: "First prize in painting, Pietrasanta, Italy, 1989.",
    lang: "en",
    images: body("news_7").images,
    paragraphs: [[[{ text: "First prize in painting, Pietrasanta, Italy, 1989." }]]],
  },
];

export function getNews(slug: string) {
  const index = news.findIndex((n) => n.slug === slug);
  return index === -1 ? undefined : { item: news[index], index };
}
