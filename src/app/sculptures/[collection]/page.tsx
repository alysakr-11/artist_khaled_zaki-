import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DarkSection from "@/components/DarkSection";
import MasonryGallery from "@/components/MasonryGallery";
import PageIntro from "@/components/PageIntro";
import { ArrowUpRight } from "@/components/icons";
import { getCollection, sculptureCollections, workAlt, workCaption } from "@/content/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return sculptureCollections.map((c) => ({ collection: c.key }));
}

export async function generateMetadata(props: PageProps<"/sculptures/[collection]">): Promise<Metadata> {
  const { collection } = await props.params;
  const c = getCollection(collection);
  if (!c) return {};
  return {
    title: `${c.title} — Sculptures`,
    description: c.intro,
    openGraph: { images: [c.works[0].images[0].src] },
  };
}

export default async function CollectionPage(props: PageProps<"/sculptures/[collection]">) {
  const { collection: key } = await props.params;
  const collection = getCollection(key);
  if (!collection) notFound();

  const index = sculptureCollections.indexOf(collection);
  const next = sculptureCollections[(index + 1) % sculptureCollections.length];

  const items = collection.works.map((work) => ({
    key: work.slug,
    href: `/sculptures/${collection.key}/${work.slug}`,
    picture: work.images[0],
    alt: workAlt(work),
    title: work.title,
    caption: workCaption(work),
  }));

  return (
    <>
      <PageIntro
        eyebrow={`Sculptures · ${collection.group}`}
        title={collection.title}
        accent={`${collection.works.length} works`}
        aside={<p>{collection.intro}</p>}
        back={{ href: "/sculptures", label: "All sculptures" }}
        seed={index + 8}
      />
      <DarkSection seed={index + 31}>
        <div className="wrap py-16 md:py-24">
          <MasonryGallery items={items} label={`${collection.title} sculptures`} />
          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-chalk/10 pt-10 sm:flex-row sm:items-center">
            <Link href={`/sculptures/${next.key}`} className="group">
              <span className="eyebrow">Next collection</span>
              <span className="display mt-2 flex items-center gap-3 text-[clamp(2rem,4vw,3rem)] group-hover:text-bronze">
                {next.title}
                <ArrowUpRight size={22} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
            <Link href="/contact" className="pill bg-chalk text-ink hover:bg-bronze">
              Enquire about a work <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </DarkSection>
    </>
  );
}
