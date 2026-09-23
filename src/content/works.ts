import generated from "./generated/collections.json";
import siteImages from "./generated/site-images.json";

export type Picture = { src: string; width: number; height: number; blur: string };

export type Sculpture = {
  slug: string;
  title: string;
  year: string | null;
  medium: string | null;
  dimensions: string | null;
  note: string | null;
  location: string | null;
  images: Picture[];
};

export type SculptureCollection = {
  key: string;
  title: string;
  group: string;
  intro: string;
  works: Sculpture[];
};

export type DrawingSeries = {
  key: string;
  title: string;
  group: string;
  intro: string;
  sheets: Picture[];
};

const sculptureMeta: Record<string, Omit<SculptureCollection, "key" | "works">> = {
  stone: {
    title: "Stone",
    group: "Recent works",
    intro: "Porphyry, statuary marble, travertine and granite — several of them paired with bronze.",
  },
  bronze: {
    title: "Bronze",
    group: "Recent works",
    intro: "Figures cast in bronze, including the works shown in the Egyptian Pavilion at the 2013 Venice Biennale.",
  },
  "old-works": {
    title: "Old works",
    group: "1989 – 2000",
    intro: "Early works in marble, stone and bronze, made between 1989 and 2000.",
  },
};

const drawingMeta: Record<string, Omit<DrawingSeries, "key" | "sheets">> = {
  figures: { title: "Figures", group: "Sketches", intro: "Ink, pencil and wash studies of the figure." },
  profiles: { title: "Profiles", group: "Sketches", intro: "Studies of the figure in profile." },
  "sitting-people": { title: "Sitting people", group: "Sketches", intro: "Studies of seated figures." },
  sufis: { title: "Sufis", group: "Sketches", intro: "Studies of the Sufi figure." },
  "time-to-return": {
    title: "Time to Return",
    group: "Exhibition · Cairo 2002",
    intro: "Drawings from the Time to Return exhibition, Cairo, 2002.",
  },
};

export const sculptureCollections: SculptureCollection[] = generated.sculptures.map((c) => ({
  key: c.key,
  ...sculptureMeta[c.key],
  works: c.works as Sculpture[],
}));

export const drawingSeries: DrawingSeries[] = generated.drawings.map((d) => ({
  key: d.key,
  ...drawingMeta[d.key],
  sheets: d.sheets,
}));

export const homeImages: Picture[] = siteImages.home;
export const portrait: Picture = siteImages.portrait;
export const heistImage: Picture = siteImages.heist;

export function getCollection(key: string) {
  return sculptureCollections.find((c) => c.key === key);
}

export function getSeries(key: string) {
  return drawingSeries.find((s) => s.key === key);
}

export function findWork(collectionKey: string, slug: string) {
  const collection = getCollection(collectionKey);
  if (!collection) return undefined;
  const index = collection.works.findIndex((w) => w.slug === slug);
  if (index === -1) return undefined;
  return { collection, work: collection.works[index], index };
}

export function workCaption(work: Sculpture) {
  return [work.medium, work.year].filter(Boolean).join(" · ");
}

export function workAlt(work: Sculpture, view = 1) {
  const base = `${work.title}${work.year ? `, ${work.year}` : ""} — ${work.medium ?? "sculpture"} by Khaled Zaki`;
  return view > 1 ? `${base} (view ${view})` : base;
}

export function drawingAlt(series: DrawingSeries, number: number) {
  return `${series.title}, drawing ${number} of ${series.sheets.length} by Khaled Zaki`;
}

export const totals = {
  sculptures: sculptureCollections.reduce((n, c) => n + c.works.length, 0),
  drawings: drawingSeries.reduce((n, s) => n + s.sheets.length, 0),
};
