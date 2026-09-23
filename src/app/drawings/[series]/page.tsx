import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DarkSection from "@/components/DarkSection";
import MasonryGallery from "@/components/MasonryGallery";
import PageIntro from "@/components/PageIntro";
import { ArrowUpRight } from "@/components/icons";
import { drawingAlt, drawingSeries, getSeries } from "@/content/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return drawingSeries.map((s) => ({ series: s.key }));
}

export async function generateMetadata(props: PageProps<"/drawings/[series]">): Promise<Metadata> {
  const { series } = await props.params;
  const s = getSeries(series);
  if (!s) return {};
  return { title: `${s.title} — Drawings`, description: s.intro, openGraph: { images: [s.sheets[0].src] } };
}

export default async function SeriesPage(props: PageProps<"/drawings/[series]">) {
  const { series: key } = await props.params;
  const series = getSeries(key);
  if (!series) notFound();

  const index = drawingSeries.indexOf(series);
  const next = drawingSeries[(index + 1) % drawingSeries.length];

  const items = series.sheets.map((picture, i) => ({
    key: picture.src,
    href: `/drawings/${series.key}/${i + 1}`,
    picture,
    alt: drawingAlt(series, i + 1),
    title: `No. ${i + 1}`,
    caption: series.title,
  }));

  return (
    <>
      <PageIntro
        eyebrow={`Drawings · ${series.group}`}
        title={series.title}
        accent={`${series.sheets.length} drawings`}
        aside={<p>{series.intro}</p>}
        back={{ href: "/drawings", label: "All drawings" }}
        seed={index + 19}
      />
      <DarkSection seed={index + 43}>
        <div className="wrap py-16 md:py-24">
          <MasonryGallery items={items} label={`${series.title} drawings`} />
          <div className="mt-20 border-t border-chalk/10 pt-10">
            <Link href={`/drawings/${next.key}`} className="group inline-block">
              <span className="eyebrow">Next series</span>
              <span className="display mt-2 flex items-center gap-3 text-[clamp(2rem,4vw,3rem)] group-hover:text-bronze">
                {next.title}
                <ArrowUpRight size={22} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </div>
        </div>
      </DarkSection>
    </>
  );
}
