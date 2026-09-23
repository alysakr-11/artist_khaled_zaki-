import type { Metadata } from "next";
import CollectionCards from "@/components/CollectionCards";
import DarkSection from "@/components/DarkSection";
import PageIntro from "@/components/PageIntro";
import { drawingAlt, drawingSeries, totals } from "@/content/works";

export const metadata: Metadata = {
  title: "Drawings",
  description:
    "Drawings by Khaled Zaki: sketches of figures, profiles, sitting people and Sufis, and the Time to Return exhibition, Cairo 2002.",
};

const coverIndex: Record<string, number> = {
  figures: 5,
  profiles: 0,
  "sitting-people": 0,
  sufis: 2,
  "time-to-return": 3,
};

export default function DrawingsPage() {
  const cards = drawingSeries.map((s) => {
    const i = coverIndex[s.key] ?? 0;
    return {
      href: `/drawings/${s.key}`,
      eyebrow: s.group,
      title: s.title,
      text: s.intro,
      meta: `${s.sheets.length} drawings`,
      picture: s.sheets[i],
      alt: drawingAlt(s, i + 1),
    };
  });

  return (
    <>
      <PageIntro
        eyebrow="Works on paper"
        title="Drawings"
        seed={13}
        aside={
          <p>
            {totals.drawings} drawings: four series of sketches — figures, profiles, sitting people and Sufis — and the
            works of the Time to Return exhibition, Cairo 2002.
          </p>
        }
      />
      <DarkSection seed={37}>
        <div className="wrap py-20 md:py-28">
          <CollectionCards cards={cards} />
        </div>
      </DarkSection>
    </>
  );
}
