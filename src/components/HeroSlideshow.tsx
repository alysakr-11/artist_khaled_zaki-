"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Picture } from "@/content/works";
import { Pause, Play } from "./icons";

const INTERVAL = 5200;

export default function HeroSlideshow({ slides }: { slides: { picture: Picture; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <figure
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-basalt"
      aria-roledescription="carousel"
      aria-label="Marble sculptures by Khaled Zaki"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.picture.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-out-expo)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.picture.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 1023px) 92vw, 50vw"
            placeholder="blur"
            blurDataURL={slide.picture.blur}
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            className={`object-cover transition-transform duration-[7000ms] ease-out ${i === index ? "scale-[1.04]" : "scale-100"}`}
          />
        </div>
      ))}

      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-basalt/80 to-transparent p-4 pt-16 text-chalk md:p-5 md:pt-20">
        <span className="text-xs tracking-[0.14em] text-chalk/80 uppercase">
          Works in marble
          <span className="ml-3 tabular-nums text-chalk/60">
            {index + 1} / {slides.length}
          </span>
        </span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-chalk/40 text-chalk transition-colors hover:bg-chalk hover:text-ink"
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </figcaption>
    </figure>
  );
}
