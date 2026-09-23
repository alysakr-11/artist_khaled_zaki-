import Image from "next/image";
import Link from "next/link";
import type { Picture } from "@/content/works";
import { ArrowUpRight } from "./icons";

export type CollectionCard = {
  href: string;
  eyebrow: string;
  title: string;
  text: string;
  meta: string;
  picture: Picture;
  alt: string;
};

export default function CollectionCards({ cards, columns = 3 }: { cards: CollectionCard[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 md:gap-6 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {cards.map((card, i) => (
        <li key={card.href} data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 90 }}>
          <Link
            href={card.href}
            className="group block overflow-hidden rounded-2xl bg-basalt-rise ring-1 ring-chalk/10 transition-shadow duration-500 hover:ring-bronze/70"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={card.picture.src}
                alt={card.alt}
                fill
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                placeholder="blur"
                blurDataURL={card.picture.blur}
                className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6">
              <p className="eyebrow">{card.eyebrow}</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.2rem)]">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-chalk-muted">{card.text}</p>
              <div className="mt-6 flex items-center justify-between border-t border-chalk/10 pt-4">
                <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                  Open <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-xs font-semibold text-bronze">{card.meta}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
