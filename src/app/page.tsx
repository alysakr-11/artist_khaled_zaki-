import Image from "next/image";
import Link from "next/link";
import DarkSection from "@/components/DarkSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import StrataLines from "@/components/StrataLines";
import { ArrowUpRight } from "@/components/icons";
import { news } from "@/content/news";
import { videos } from "@/content/videos";
import {
  drawingSeries,
  getCollection,
  homeImages,
  totals,
  workAlt,
  type Picture,
} from "@/content/works";

function pick(collection: string, slug: string) {
  const work = getCollection(collection)!.works.find((w) => w.slug === slug)!;
  return { work, picture: work.images[0] };
}

type Tile = {
  href: string;
  title: string;
  text: string;
  meta: string;
  picture: Picture;
  alt: string;
  className: string;
  position?: string;
};

export default function Home() {
  const stone = getCollection("stone")!;
  const bronze = getCollection("bronze")!;
  const oldWorks = getCollection("old-works")!;
  const stoneCover = pick("stone", "lady-with-the-gold-scarf");
  const bronzeCover = pick("bronze", "the-two-sisters");
  const oldCover = pick("old-works", "the-flower");
  const figures = drawingSeries.find((s) => s.key === "figures")!;
  const venice = news.find((n) => n.slug === "egyptian-pavilion-venice-biennale")!;
  const sarcophagus = pick("bronze", "the-sarcophagus");
  const sufi = pick("bronze", "the-sufi-2");
  const keyHolder = pick("bronze", "the-key-holder");

  const tiles: Tile[] = [
    {
      href: "/sculptures/stone",
      title: "Stone",
      text: stone.intro,
      meta: `${stone.works.length} works`,
      picture: stoneCover.picture,
      alt: workAlt(stoneCover.work),
      className: "md:col-span-7 md:row-span-2 min-h-[26rem] md:min-h-[40rem]",
    },
    {
      href: "/sculptures/bronze",
      title: "Bronze",
      text: bronze.intro,
      meta: `${bronze.works.length} works`,
      picture: bronzeCover.picture,
      alt: workAlt(bronzeCover.work),
      className: "md:col-span-5 min-h-[22rem]",
      position: "50% 30%",
    },
    {
      href: "/sculptures/old-works",
      title: "Old works",
      text: oldWorks.intro,
      meta: `${oldWorks.works.length} works · 1989 – 2000`,
      picture: oldCover.picture,
      alt: workAlt(oldCover.work),
      className: "md:col-span-5 min-h-[22rem]",
    },
    {
      href: "/drawings",
      title: "Drawings",
      text: "Sketches of figures, profiles, sitting people and Sufis, and the Time to Return exhibition, Cairo 2002.",
      meta: `${totals.drawings} drawings`,
      picture: figures.sheets[5],
      alt: "A figure drawing by Khaled Zaki",
      className: "md:col-span-4 min-h-[24rem]",
      position: "50% 25%",
    },
    {
      href: "/video",
      title: "Video",
      text: "The Venice Biennale project, the Resurrection films and the carving of a marble portrait.",
      meta: `${videos.length} films`,
      picture: homeImages[0],
      alt: "Khaled Zaki in his studio holding a marble head",
      className: "md:col-span-4 min-h-[24rem]",
      position: "35% 30%",
    },
    {
      href: "/news",
      title: "News",
      text: "Exhibitions, prizes and writing on the work, from Pietrasanta in 1989 to Beirut.",
      meta: `${news.length} entries`,
      picture: venice.images[0],
      alt: "Khaled Zaki's installation in the Egyptian Pavilion, 55th Venice Biennale",
      className: "md:col-span-4 min-h-[24rem]",
    },
  ];

  const slides = homeImages.slice(1).map((picture) => ({ picture, alt: "Marble sculpture by Khaled Zaki" }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-14 md:pt-[calc(var(--header-h)+3.5rem)] md:pb-20">
        <StrataLines seed={5} count={18} />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow fade-in">Sculptor · Egypt &amp; Pietrasanta, Italy</p>
            <h1 className="display mt-6 text-[clamp(4.2rem,13.5vw,9.6rem)] leading-[0.82]">
              <span className="rise-line">
                <span>Khaled</span>
              </span>
              <span className="rise-line" style={{ ["--rise-delay" as string]: 110 }}>
                <span>Zaki</span>
              </span>
            </h1>
            <p
              className="fade-in mt-8 max-w-xl text-[1.12rem] leading-relaxed text-ink-soft"
              style={{ ["--fade-delay" as string]: 350 }}
            >
              {totals.sculptures} sculptures in stone and bronze, and {totals.drawings} drawings — by an artist born in Suez
              in 1964, trained in the workshops of Pietrasanta, and chosen to represent Egypt at the 2013 Venice
              Biennale.
            </p>
            <div className="fade-in mt-9 flex flex-wrap gap-3" style={{ ["--fade-delay" as string]: 480 }}>
              <Link href="/sculptures" className="pill pill-solid">
                View the sculptures <ArrowUpRight size={14} />
              </Link>
              <Link href="/biography" className="pill pill-outline">
                About the artist <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
          <div className="fade-in lg:col-span-6" style={{ ["--fade-delay" as string]: 200 }}>
            <HeroSlideshow slides={slides} />
          </div>
        </div>
        <div className="wrap relative mt-14 hidden items-center gap-4 md:flex">
          <span className="h-px flex-1 bg-ink/15" />
          <a href="#work" className="text-[0.72rem] font-bold tracking-[0.2em] text-ink-muted uppercase hover:text-porphyry">
            Explore ↓
          </a>
        </div>
      </section>

      {/* The work */}
      <DarkSection id="work" labelledBy="work-title" seed={17}>
        <div className="wrap pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7" data-reveal>
              <p className="eyebrow">1989 – 2016</p>
              <h2 id="work-title" className="display mt-5 text-[clamp(3.2rem,9vw,7rem)]">
                The work
                <span className="display-italic mt-1 block text-[0.62em] leading-[1.1] text-bronze">in stone &amp; bronze</span>
              </h2>
            </div>
            <p className="max-w-md text-[1.05rem] leading-relaxed text-chalk-muted md:col-span-5 md:justify-self-end" data-reveal>
              After the revolution of January 2011 the work moved from abstraction to a mix of figurative and abstract
              form — shaped by ancient Egyptian and Mediterranean art, and by the idea of resurrection.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-12 md:gap-6">
            {tiles.map((tile, i) => (
              <Link
                key={tile.href}
                href={tile.href}
                data-reveal
                style={{ ["--reveal-delay" as string]: (i % 3) * 90 }}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-basalt-rise ring-1 ring-chalk/10 transition-shadow duration-500 hover:ring-bronze/70 ${tile.className}`}
              >
                <Image
                  src={tile.picture.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, 58vw"
                  placeholder="blur"
                  blurDataURL={tile.picture.blur}
                  style={{ objectPosition: tile.position ?? "50% 50%" }}
                  className="object-cover opacity-80 transition-[transform,opacity] duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/60 to-transparent" />
                <div className="relative p-6 md:p-8">
                  <h3 className="display text-[clamp(2.4rem,5vw,4rem)]">{tile.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-chalk/80">{tile.text}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                      Open
                      <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="text-xs font-semibold text-bronze">{tile.meta}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Venice */}
          <div className="mt-24 grid gap-10 border-t border-chalk/10 pt-16 md:mt-32 md:grid-cols-12 md:pt-24">
            <div className="md:col-span-5" data-reveal>
              <p className="eyebrow">55th Venice Biennale · 2013</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,6vw,4.8rem)]">
                The Treasure
                <span className="display-italic block text-[0.7em] leading-[1.1] text-bronze">of Knowledge</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-chalk-muted">
                For the Egyptian Pavilion, Zaki — artist and curator of the project — showed an installation of bronze,
                steel and granite sculptures, reading knowledge in two cycles: the knowledge of life, and afterwards
                death and rebirth.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/news/${venice.slug}`} className="pill bg-chalk text-ink hover:bg-bronze">
                  Read the interview <ArrowUpRight size={14} />
                </Link>
                <Link href="/video" className="pill pill-outline text-chalk">
                  Watch <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-7 md:gap-6">
              {[sarcophagus, sufi, keyHolder].map(({ work, picture }, i) => (
                <Link
                  key={work.slug}
                  href={`/sculptures/bronze/${work.slug}`}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: i * 110 }}
                  className={`group relative overflow-hidden rounded-xl ring-1 ring-chalk/10 hover:ring-bronze/70 ${
                    i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={picture.src}
                    alt={workAlt(work)}
                    fill
                    sizes="(max-width: 767px) 92vw, 50vw"
                    placeholder="blur"
                    blurDataURL={picture.blur}
                    className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-basalt/90 to-transparent p-4 pt-12">
                    <p className="text-sm font-semibold">{work.title}</p>
                    <p className="text-xs text-chalk-muted">
                      {work.medium} · {work.dimensions}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact strip */}
          <Link
            href="/contact"
            data-reveal
            className="group mt-24 flex flex-col gap-6 rounded-2xl border border-bronze/25 bg-basalt-rise/70 p-8 transition-colors duration-500 hover:border-bronze/70 md:mt-32 md:flex-row md:items-end md:justify-between md:p-12"
          >
            <div>
              <h2 className="display text-[clamp(2.6rem,6vw,4.6rem)]">Contact</h2>
              <p className="mt-3 text-chalk-muted">In 6th of October City, Giza, and Valdicastello, Pietrasanta.</p>
            </div>
            <span className="inline-flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.2em] text-chalk uppercase">
              Get in touch
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </DarkSection>
    </>
  );
}
