import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DarkSection from "@/components/DarkSection";
import PageIntro from "@/components/PageIntro";
import { ArrowUpRight } from "@/components/icons";
import { news } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description: "Exhibitions, prizes and writing on the work of Khaled Zaki.",
};

export default function NewsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Exhibitions · Prizes · Press"
        title="News"
        seed={83}
        aside={<p>Exhibitions, prizes, interviews and reviews — in English and Arabic.</p>}
      />
      <DarkSection seed={89}>
        <div className="wrap py-16 md:py-24">
          <ol className="divide-y divide-chalk/10 border-y border-chalk/10">
            {news.map((item, i) => {
              const image = item.images[0];
              const rtl = item.lang === "ar";
              return (
                <li key={item.slug} data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 60 }}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group grid gap-6 py-8 md:grid-cols-12 md:items-center md:gap-10 md:py-10"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-basalt-rise ring-1 ring-chalk/10 transition-shadow duration-500 group-hover:ring-bronze/70 md:col-span-4">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 92vw, 30vw"
                        placeholder="blur"
                        blurDataURL={image.blur}
                        className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="md:col-span-7" lang={item.lang} dir={rtl ? "rtl" : "ltr"}>
                      <p className={`eyebrow ${rtl ? "font-arabic !text-sm !tracking-normal" : ""}`}>{item.dateline}</p>
                      <h2
                        className={
                          rtl
                            ? "mt-3 font-arabic text-[clamp(1.6rem,3vw,2.3rem)] leading-snug font-semibold transition-colors group-hover:text-bronze"
                            : "display mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] transition-colors group-hover:text-bronze"
                        }
                      >
                        {item.title}
                      </h2>
                      <p className={`mt-4 line-clamp-3 max-w-2xl text-chalk-muted ${rtl ? "font-arabic leading-loose" : "leading-relaxed"}`}>
                        {item.summary}
                      </p>
                    </div>
                    <span className="hidden justify-self-end md:col-span-1 md:block" aria-hidden="true">
                      <span className="grid size-12 place-items-center rounded-full border border-chalk/20 transition-colors duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
                        <ArrowUpRight size={16} />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </DarkSection>
    </>
  );
}
