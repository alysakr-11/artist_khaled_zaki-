import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtworkViewer, { type Fact } from "@/components/ArtworkViewer";
import { findWork, sculptureCollections, workAlt, workCaption } from "@/content/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return sculptureCollections.flatMap((c) => c.works.map((w) => ({ collection: c.key, slug: w.slug })));
}

export async function generateMetadata(props: PageProps<"/sculptures/[collection]/[slug]">): Promise<Metadata> {
  const { collection, slug } = await props.params;
  const found = findWork(collection, slug);
  if (!found) return {};
  const { work } = found;
  return {
    title: work.title,
    description: [workCaption(work), work.dimensions].filter(Boolean).join(" · ") + " — Khaled Zaki",
    openGraph: { images: [work.images[0].src] },
  };
}

export default async function WorkPage(props: PageProps<"/sculptures/[collection]/[slug]">) {
  const { collection: key, slug } = await props.params;
  const found = findWork(key, slug);
  if (!found) notFound();
  const { collection, work, index } = found;
  const total = collection.works.length;
  const prev = collection.works[(index - 1 + total) % total];
  const next = collection.works[(index + 1) % total];

  const facts: Fact[] = [
    work.year && { label: "Year", value: work.year },
    work.medium && { label: "Medium", value: work.medium },
    work.dimensions && { label: "Dimensions", value: work.dimensions },
    work.note && { label: "Exhibited", value: work.note, href: "/news/egyptian-pavilion-venice-biennale" },
    work.location && { label: "Location", value: work.location },
    { label: "Collection", value: `${collection.title} · ${collection.group}`, href: `/sculptures/${collection.key}` },
  ].filter(Boolean) as Fact[];

  const base = `/sculptures/${collection.key}`;
  const subject = `Enquiry: ${work.title}${work.year ? ` (${work.year})` : ""}`;

  return (
    <ArtworkViewer
      key={work.slug}
      eyebrow={`Sculptures · ${collection.title}`}
      title={work.title}
      facts={facts}
      images={work.images.map((picture, i) => ({ picture, alt: workAlt(work, i + 1) }))}
      closeHref={base}
      closeLabel={`${collection.title} sculptures`}
      prevHref={`${base}/${prev.slug}`}
      nextHref={`${base}/${next.slug}`}
      position={index + 1}
      total={total}
      enquireHref={`/contact?subject=${encodeURIComponent(subject)}`}
    />
  );
}
