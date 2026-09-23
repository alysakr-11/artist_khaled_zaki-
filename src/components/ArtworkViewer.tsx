"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Picture } from "@/content/works";
import { ArrowUpRight, ChevronLeft, ChevronRight, Close, Expand } from "./icons";

export type Fact = { label: string; value: string; href?: string };

type Props = {
  eyebrow: string;
  title: string;
  facts: Fact[];
  images: { picture: Picture; alt: string }[];
  closeHref: string;
  closeLabel: string;
  prevHref: string;
  nextHref: string;
  position: number;
  total: number;
  enquireHref?: string;
};

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

export default function ArtworkViewer(props: Props) {
  const { eyebrow, title, facts, images, closeHref, closeLabel, prevHref, nextHref, position, total, enquireHref } = props;
  const router = useRouter();
  const [view, setView] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = images[Math.min(view, images.length - 1)];

  useEffect(() => {
    router.prefetch(prevHref);
    router.prefetch(nextHref);
  }, [router, prevHref, nextHref]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (fullscreen || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (document.getElementById("site-menu")?.getAttribute("aria-hidden") === "false") return;
      if (e.key === "ArrowLeft") router.push(prevHref, { scroll: false });
      else if (e.key === "ArrowRight") router.push(nextHref, { scroll: false });
      else if (e.key === "Escape") router.push(closeHref);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prevHref, nextHref, closeHref, fullscreen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (fullscreen && !dialog.open) dialog.showModal();
    if (!fullscreen && dialog.open) dialog.close();
  }, [fullscreen]);

  const counter = `${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div data-header="dark" className="on-dark relative min-h-dvh bg-basalt text-chalk">
      <div className="wrap pt-[calc(var(--header-h)+1.5rem)] pb-16 md:pb-24">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={closeHref}
            className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-chalk-muted uppercase hover:text-chalk"
          >
            <ChevronLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-1" />
            {eyebrow}
          </Link>
          <Link
            href={closeHref}
            aria-label={`Close and return to ${closeLabel}`}
            className="grid size-11 place-items-center rounded-full border border-chalk/25 transition-colors hover:bg-chalk hover:text-ink"
          >
            <Close size={16} />
          </Link>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="group relative mx-auto block w-fit max-w-full cursor-zoom-in overflow-hidden rounded-xl"
              aria-label={`View ${title} full screen`}
            >
              <Image
                key={current.picture.src}
                src={current.picture.src}
                width={current.picture.width}
                height={current.picture.height}
                placeholder="blur"
                blurDataURL={current.picture.blur}
                alt={current.alt}
                priority
                sizes="(max-width: 1023px) 92vw, 62vw"
                className="fade-in mx-auto h-auto max-h-[72dvh] w-auto max-w-full rounded-xl object-contain lg:max-h-[calc(100dvh-13rem)]"
              />
              <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-basalt/70 text-chalk opacity-80 backdrop-blur transition-opacity group-hover:opacity-100">
                <Expand size={16} />
              </span>
            </button>

            {images.length > 1 && (
              <div className="mt-4 flex flex-wrap justify-center gap-3" role="group" aria-label="Views of this work">
                {images.map((img, i) => (
                  <button
                    key={img.picture.src}
                    type="button"
                    onClick={() => setView(i)}
                    aria-label={`Show view ${i + 1} of ${images.length}`}
                    aria-pressed={i === view}
                    className={`relative size-16 overflow-hidden rounded-lg ring-1 transition-all duration-500 md:size-20 ${
                      i === view ? "ring-bronze" : "opacity-60 ring-chalk/15 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.picture.src}
                      alt=""
                      fill
                      sizes="80px"
                      placeholder="blur"
                      blurDataURL={img.picture.blur}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 lg:pt-2">
            <h1 className="display fade-in text-[clamp(2.3rem,5vw,3.8rem)] leading-[0.95]">{title}</h1>
            <dl className="mt-8 divide-y divide-chalk/10 border-y border-chalk/10">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-sm">
                  <dt className="pt-0.5 text-[0.72rem] font-bold tracking-[0.18em] text-chalk-muted uppercase">{fact.label}</dt>
                  <dd className="text-chalk">
                    {fact.href ? (
                      <Link href={fact.href} className="link-line text-bronze">
                        {fact.value}
                      </Link>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link
                  href={prevHref}
                  scroll={false}
                  aria-label="Previous work"
                  className="grid size-11 place-items-center rounded-full border border-chalk/25 transition-colors hover:bg-chalk hover:text-ink"
                >
                  <ChevronLeft size={16} />
                </Link>
                <span className="min-w-[4.5rem] text-center text-xs font-bold tracking-[0.18em] text-chalk-muted tabular-nums">
                  <span className="sr-only">Work </span>
                  {counter}
                </span>
                <Link
                  href={nextHref}
                  scroll={false}
                  aria-label="Next work"
                  className="grid size-11 place-items-center rounded-full border border-chalk/25 transition-colors hover:bg-chalk hover:text-ink"
                >
                  <ChevronRight size={16} />
                </Link>
              </div>
              {enquireHref && (
                <Link href={enquireHref} className="pill pill-accent">
                  Enquire <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
            <p className="mt-6 hidden text-xs text-chalk-muted lg:block">
              Use ← → to move between works, Esc to return.
            </p>
          </aside>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setFullscreen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setFullscreen(false);
        }}
        aria-label={`${title}, full screen`}
        className="on-dark m-0 h-dvh max-h-none w-dvw max-w-none bg-basalt/95 p-0 text-chalk backdrop:bg-basalt/90"
      >
        {fullscreen && (
          <div className="relative flex h-full w-full items-center justify-center p-4 md:p-10" onClick={() => setFullscreen(false)}>
            <Image
              src={current.picture.src}
              width={current.picture.width}
              height={current.picture.height}
              alt={current.alt}
              sizes="100vw"
              quality={75}
              className="fade-in h-auto max-h-full w-auto max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="pill absolute top-4 right-4 bg-chalk text-ink hover:bg-bronze"
              autoFocus
            >
              Close <Close size={14} />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
