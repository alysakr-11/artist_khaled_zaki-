import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtworkViewer from "@/components/ArtworkViewer";
import { drawingAlt, drawingSeries, getSeries } from "@/content/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return drawingSeries.flatMap((s) => s.sheets.map((_, i) => ({ series: s.key, number: String(i + 1) })));
}

function resolve(seriesKey: string, number: string) {
  const series = getSeries(seriesKey);
  const n = Number(number);
  if (!series || !Number.isInteger(n) || n < 1 || n > series.sheets.length) return undefined;
  return { series, n };
}

export async function generateMetadata(props: PageProps<"/drawings/[series]/[number]">): Promise<Metadata> {
  const { series, number } = await props.params;
  const found = resolve(series, number);
  if (!found) return {};
  return {
    title: `${found.series.title}, No. ${found.n}`,
    description: drawingAlt(found.series, found.n),
    openGraph: { images: [found.series.sheets[found.n - 1].src] },
  };
}

export default async function DrawingPage(props: PageProps<"/drawings/[series]/[number]">) {
  const { series: key, number } = await props.params;
  const found = resolve(key, number);
  if (!found) notFound();
  const { series, n } = found;
  const total = series.sheets.length;
  const prev = ((n - 2 + total) % total) + 1;
  const next = (n % total) + 1;
  const base = `/drawings/${series.key}`;

  return (
    <ArtworkViewer
      key={`${series.key}-${n}`}
      eyebrow={`Drawings · ${series.title}`}
      title={`${series.title}, No. ${n}`}
      facts={[
        { label: "Series", value: series.group === "Sketches" ? `Sketches · ${series.title}` : series.title, href: base },
        ...(series.key === "time-to-return" ? [{ label: "Exhibited", value: "Time to Return, Cairo, 2002" }] : []),
      ]}
      images={[{ picture: series.sheets[n - 1], alt: drawingAlt(series, n) }]}
      closeHref={base}
      closeLabel={`${series.title} drawings`}
      prevHref={`${base}/${prev}`}
      nextHref={`${base}/${next}`}
      position={n}
      total={total}
      enquireHref={`/contact?subject=${encodeURIComponent(`Enquiry: ${series.title} drawing No. ${n}`)}`}
    />
  );
}
