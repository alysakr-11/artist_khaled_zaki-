"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/content/videos";
import { ArrowUpRight, Play } from "./icons";

// Shows the poster until asked, so no YouTube scripts or cookies load before the visitor presses play.
export default function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <figure className="group" data-reveal>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-basalt-rise ring-1 ring-chalk/10">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${video.title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              fill
              unoptimized
              sizes={featured ? "(max-width: 1023px) 92vw, 66vw" : "(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"}
              className="object-cover opacity-85 transition-[transform,opacity] duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-basalt/70 via-transparent to-transparent" />
            <span
              className={`absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-chalk text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 ${
                featured ? "size-20" : "size-14"
              }`}
            >
              <Play size={featured ? 22 : 16} className="translate-x-[2px]" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className={`${featured ? "font-display text-3xl leading-tight md:text-4xl" : "font-semibold"} text-chalk`}>{video.title}</p>
          <p className="mt-1 text-xs text-chalk-muted">{video.channel}</p>
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 pt-1 text-[0.72rem] font-bold tracking-[0.16em] text-chalk-muted uppercase hover:text-bronze"
        >
          YouTube <ArrowUpRight size={12} />
          <span className="sr-only">: {video.title} (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
