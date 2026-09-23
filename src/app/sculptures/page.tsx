import type { Metadata } from "next";
import CollectionCards from "@/components/CollectionCards";
import DarkSection from "@/components/DarkSection";
import PageIntro from "@/components/PageIntro";
import { sculptureCollections, totals, workAlt } from "@/content/works";

export const metadata: Metadata = {
  title: "Sculptures",
  description: "Sculptures by Khaled Zaki in stone and bronze, and early works from 1989 to 2000.",
};

const covers: Record<string, string> = {
  stone: "walking-man",
  bronze: "the-wind-of-january",
  "old-works": "the-poet",
};

export default function SculpturesPage() {
  const cards = sculptureCollections.map((c) => {
    const work = c.works.find((w) => w.slug === covers[c.key]) ?? c.works[0];
    return {
      href: `/sculptures/${c.key}`,
      eyebrow: c.group,
      title: c.title,
      text: c.intro,
      meta: `${c.works.length} works`,
      picture: work.images[0],
      alt: workAlt(work),
    };
  });

  return (
    <>
      <PageIntro
        eyebrow="Collections"
        title="Sculptures"
        aside={
          <p>
            {totals.sculptures} works in three collections: recent pieces in stone and in bronze, and the early works made
            between 1989 and 2000.
          </p>
        }
      />
      <DarkSection seed={29}>
        <div className="wrap py-20 md:py-28">
          <CollectionCards cards={cards} />
        </div>
      </DarkSection>
    </>
  );
}
