import Image from "next/image";
import Link from "next/link";
import type { Picture } from "@/content/works";

export type GalleryItem = {
  key: string;
  href: string;
  picture: Picture;
  alt: string;
  title: string;
  caption?: string;
};

// Distribute items into columns by running height so columns stay balanced while reading order stays left-to-right.
function toColumns(items: GalleryItem[], count: number) {
  const columns: GalleryItem[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  for (const item of items) {
    const target = heights.indexOf(Math.min(...heights));
    columns[target].push(item);
    heights[target] += item.picture.height / item.picture.width + 0.12;
  }
  return columns;
}

// One pre-balanced layout per breakpoint; hidden layouts cost markup only, since lazy images there never load.
const layouts = [
  { count: 1, className: "flex sm:hidden" },
  { count: 2, className: "hidden sm:flex lg:hidden" },
  { count: 3, className: "hidden lg:flex 2xl:hidden" },
  { count: 4, className: "hidden 2xl:flex" },
];

// Identical across layouts so every copy resolves to the same (cached) file.
const SIZES = "(max-width: 639px) 92vw, (max-width: 1023px) 46vw, (max-width: 1535px) 31vw, 24vw";

function Tile({ item, sizes, eager }: { item: GalleryItem; sizes: string; eager: boolean }) {
  return (
    <Link
      href={item.href}
      data-reveal
      className="group relative block overflow-hidden rounded-xl bg-basalt-rise ring-1 ring-chalk/10 transition-shadow duration-500 hover:ring-bronze/80 focus-visible:ring-bronze"
    >
      <Image
        src={item.picture.src}
        width={item.picture.width}
        height={item.picture.height}
        placeholder="blur"
        blurDataURL={item.picture.blur}
        alt={item.alt}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="h-auto w-full transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-basalt/90 via-basalt/45 to-transparent px-4 pt-14 pb-4">
        <p className="text-[0.95rem] leading-snug font-semibold text-chalk">{item.title}</p>
        {item.caption && <p className="mt-0.5 text-xs text-chalk-muted">{item.caption}</p>}
      </div>
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-chalk/90 text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
        </svg>
      </span>
    </Link>
  );
}

export default function MasonryGallery({ items, label }: { items: GalleryItem[]; label: string }) {
  return (
    <div role="list" aria-label={label}>
      {layouts.map((layout) => {
        const columns = toColumns(items, layout.count);
        return (
          <div key={layout.count} className={`${layout.className} items-start gap-4 md:gap-6`}>
            {columns.map((column, c) => (
              <div
                key={c}
                className={`flex min-w-0 flex-1 flex-col gap-4 md:gap-6 ${layout.count > 2 && c % 2 === 1 ? "lg:pt-16" : ""}`}
              >
                {column.map((item, i) => (
                  <div role="listitem" key={item.key}>
                    <Tile item={item} sizes={SIZES} eager={i === 0} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
