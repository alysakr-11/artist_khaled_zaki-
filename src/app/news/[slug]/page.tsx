import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StrataLines from "@/components/StrataLines";
import { ArrowUpRight, ChevronLeft } from "@/components/icons";
import { getNews, news, type Segment } from "@/content/news";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const found = getNews(slug);
  if (!found) return {};
  return {
    title: found.item.title,
    description: found.item.summary,
    openGraph: { images: [found.item.images[0].src] },
  };
}

function Line({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === "label" ? (
          <strong key={i} className="font-semibold text-ink">
            {seg.text}
          </strong>
        ) : seg.kind === "question" ? (
          <em key={i} className="text-ink">
            {seg.text}
          </em>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

export default async function NewsArticle(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const found = getNews(slug);
  if (!found) notFound();
  const { item, index } = found;
  const rtl = item.lang === "ar";
  const next = news[(index + 1) % news.length];
  const [hero, ...more] = item.images;
  const portraitHero = hero.height > hero.width;

  return (
    <article className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-24 md:pt-[calc(var(--header-h)+4.5rem)]">
      <StrataLines seed={index + 91} />
      <div className="wrap relative">
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-ink-soft uppercase hover:text-porphyry"
        >
          <ChevronLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-1" />
          All news
        </Link>

        <header className="mt-10 max-w-4xl" lang={item.lang} dir={rtl ? "rtl" : "ltr"}>
          <p className={`eyebrow fade-in ${rtl ? "font-arabic !text-sm !tracking-normal" : ""}`}>{item.dateline}</p>
          <h1
            className={
              rtl
                ? "fade-in mt-5 font-arabic text-[clamp(2rem,5vw,3.6rem)] leading-[1.35] font-semibold"
                : "display mt-5 text-[clamp(2.8rem,8vw,6.4rem)]"
            }
          >
            {rtl ? (
              item.title
            ) : (
              <span className="rise-line">
                <span>{item.title}</span>
              </span>
            )}
          </h1>
          {item.byline && (
            <p className="fade-in mt-6 text-sm text-ink-muted" style={{ ["--fade-delay" as string]: 200 }}>
              {rtl ? item.byline : `By ${item.byline}`}
            </p>
          )}
        </header>

        <figure className={`fade-in mt-12 ${portraitHero ? "max-w-xl" : "max-w-5xl"}`} style={{ ["--fade-delay" as string]: 150 }}>
          <Image
            src={hero.src}
            width={hero.width}
            height={hero.height}
            alt={`${item.title} — image from the original article`}
            priority
            placeholder="blur"
            blurDataURL={hero.blur}
            sizes="(max-width: 1023px) 92vw, 64rem"
            className="h-auto w-full rounded-2xl"
          />
        </figure>

        <div
          lang={item.lang}
          dir={rtl ? "rtl" : "ltr"}
          className={`mt-14 max-w-3xl space-y-6 text-ink-soft ${
            rtl ? "font-arabic text-[1.15rem] leading-[2.1]" : "text-[1.08rem] leading-[1.8]"
          }`}
        >
          {item.paragraphs.map((paragraph, p) => (
            <p key={p} data-reveal>
              {paragraph.map((line, l) => (
                <span key={l}>
                  {l > 0 && <br />}
                  <Line segments={line} />
                </span>
              ))}
            </p>
          ))}
        </div>

        {more.length > 0 && (
          <div className="mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
            {more.map((img) => (
              <Image
                key={img.src}
                src={img.src}
                width={img.width}
                height={img.height}
                alt={`${item.title} — further image from the original article`}
                placeholder="blur"
                blurDataURL={img.blur}
                sizes="(max-width: 639px) 92vw, 46vw"
                className="h-auto w-full rounded-2xl"
                data-reveal
              />
            ))}
          </div>
        )}

        {item.externalUrl && (
          <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="pill pill-solid mt-12">
            Visit the exhibition page <ArrowUpRight size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}

        <div className="mt-24 border-t border-ink/10 pt-10">
          <Link href={`/news/${next.slug}`} className="group inline-block" lang={next.lang} dir={next.lang === "ar" ? "rtl" : "ltr"}>
            <span className="eyebrow" lang="en">
              Next
            </span>
            <span
              className={`mt-2 flex items-center gap-3 group-hover:text-porphyry ${
                next.lang === "ar"
                  ? "font-arabic text-[clamp(1.5rem,3vw,2.2rem)] font-semibold"
                  : "display text-[clamp(2rem,4vw,3rem)]"
              }`}
            >
              {next.title}
              <ArrowUpRight size={22} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
