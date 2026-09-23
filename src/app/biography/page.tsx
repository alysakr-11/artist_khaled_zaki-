import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DarkSection from "@/components/DarkSection";
import StrataLines from "@/components/StrataLines";
import { ArrowUpRight } from "@/components/icons";
import { artist, biography, collections, milestones } from "@/content/site";
import { homeImages, portrait } from "@/content/works";

export const metadata: Metadata = {
  title: "Biography",
  description:
    "Khaled Zaki, born in Suez in 1964: training in Giza and Pietrasanta, the Galaa Square monument, the 2013 Venice Biennale and the ART Taipei International Artist prize.",
};

export default function BiographyPage() {
  const [lead, ...rest] = biography;
  const studio = homeImages[0];

  return (
    <>
      <section className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-20 md:pt-[calc(var(--header-h)+5rem)] md:pb-28">
        <StrataLines seed={61} />
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow fade-in">Biography</p>
            <h1 className="display mt-5 text-[clamp(3.2rem,10vw,8rem)]">
              <span className="rise-line">
                <span>Khaled Zaki</span>
              </span>
              <span className="rise-line" style={{ ["--rise-delay" as string]: 120 }}>
                <span className="display-italic text-[0.5em] leading-[1.2] text-porphyry">{artist.born}</span>
              </span>
            </h1>
            <p className="fade-in mt-10 max-w-2xl font-display text-[clamp(1.45rem,2.4vw,1.9rem)] leading-[1.35] text-ink" style={{ ["--fade-delay" as string]: 260 }}>
              {lead}
            </p>
            <div className="mt-10 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
              {rest.map((paragraph) => (
                <p key={paragraph} data-reveal>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="fade-in lg:sticky lg:top-[calc(var(--header-h)+2rem)]" style={{ ["--fade-delay" as string]: 180 }}>
              <div className="overflow-hidden rounded-2xl bg-basalt">
                <Image
                  src={portrait.src}
                  width={portrait.width}
                  height={portrait.height}
                  alt="Portrait of Khaled Zaki"
                  priority
                  placeholder="blur"
                  blurDataURL={portrait.blur}
                  sizes="(max-width: 1023px) 92vw, 36vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-xs tracking-[0.14em] text-ink-muted uppercase">Khaled Zaki</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <DarkSection seed={67}>
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <p className="eyebrow">Milestones</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,6vw,4.6rem)]">
                1964
                <span className="display-italic block text-[0.62em] leading-[1.15] text-bronze">to 2015</span>
              </h2>
              <div className="relative mt-10 hidden aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-chalk/10 lg:block">
                <Image
                  src={studio.src}
                  alt="Khaled Zaki in his studio holding a marble head"
                  fill
                  sizes="36vw"
                  placeholder="blur"
                  blurDataURL={studio.blur}
                  className="object-cover object-[30%_50%]"
                />
              </div>
            </div>
            <ol className="lg:col-span-7">
              {milestones.map((m, i) => (
                <li
                  key={`${m.year}-${m.text}`}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: (i % 4) * 60 }}
                  className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-chalk/10 py-5 md:grid-cols-[6rem_1fr]"
                >
                  <span className="font-display text-2xl font-semibold text-bronze tabular-nums">{m.year}</span>
                  <span className="pt-1 leading-relaxed text-chalk/90">
                    {m.href ? (
                      <Link href={m.href} className="group inline">
                        <span className="link-line">{m.text}</span>
                        <ArrowUpRight size={12} className="ml-1.5 inline text-bronze" />
                      </Link>
                    ) : (
                      m.text
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-24 grid gap-12 border-t border-chalk/10 pt-16 md:grid-cols-2" data-reveal>
            <div>
              <p className="eyebrow">Museum collections</p>
              <ul className="mt-5 space-y-3 font-display text-2xl leading-snug md:text-3xl">
                {collections.museums.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Private collections</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {collections.privateCollections.map((c) => (
                  <li key={c} className="rounded-full border border-chalk/20 px-4 py-2 text-sm text-chalk/90">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DarkSection>
    </>
  );
}
