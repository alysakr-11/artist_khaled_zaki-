import type { MetadataRoute } from "next";
import { news } from "@/content/news";
import { drawingSeries, sculptureCollections } from "@/content/works";

const base = "https://www.khaled-zaki.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/sculptures",
    "/drawings",
    "/biography",
    "/video",
    "/news",
    "/contact",
    ...sculptureCollections.flatMap((c) => [`/sculptures/${c.key}`, ...c.works.map((w) => `/sculptures/${c.key}/${w.slug}`)]),
    ...drawingSeries.flatMap((s) => [`/drawings/${s.key}`, ...s.sheets.map((_, i) => `/drawings/${s.key}/${i + 1}`)]),
    ...news.map((n) => `/news/${n.slug}`),
  ];
  return paths.map((path) => ({ url: `${base}${path}` }));
}
