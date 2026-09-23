import Link from "next/link";
import type { ReactNode } from "react";
import StrataLines from "./StrataLines";
import { ChevronLeft } from "./icons";

export default function PageIntro({
  eyebrow,
  title,
  accent,
  aside,
  back,
  seed = 3,
  titleLang,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  aside?: ReactNode;
  back?: { href: string; label: string };
  seed?: number;
  titleLang?: string;
}) {
  return (
    <div className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-16 md:pt-[calc(var(--header-h)+5rem)] md:pb-24">
      <StrataLines seed={seed} />
      <div className="wrap relative grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow fade-in">{eyebrow}</p>
          <h1 className="display mt-5 text-[clamp(3.2rem,10vw,8rem)]" lang={titleLang}>
            <span className="rise-line">
              <span>{title}</span>
            </span>
            {accent && (
              <span className="rise-line" style={{ ["--rise-delay" as string]: 120 }}>
                <span className="display-italic text-[0.62em] leading-[1.1] text-porphyry">{accent}</span>
              </span>
            )}
          </h1>
        </div>
        {aside && (
          <div className="fade-in max-w-md text-[1.05rem] leading-relaxed text-ink-soft md:col-span-5 md:justify-self-end" style={{ ["--fade-delay" as string]: 250 }}>
            {aside}
          </div>
        )}
      </div>
      {back && (
        <div className="wrap relative mt-10">
          <Link
            href={back.href}
            className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-ink-soft uppercase hover:text-porphyry"
          >
            <ChevronLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-1" />
            {back.label}
          </Link>
        </div>
      )}
    </div>
  );
}
