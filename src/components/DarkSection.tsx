import type { ReactNode } from "react";
import StrataLines from "./StrataLines";

// A basalt-coloured section whose top edge rises into a plinth step, echoing a sculpture base.
export default function DarkSection({
  children,
  className = "",
  seed = 11,
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  seed?: number;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-header="dark"
      className={`on-dark relative mt-10 rounded-t-[1.75rem] bg-basalt text-chalk md:rounded-t-[2.5rem] ${className}`}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 360 26"
        preserveAspectRatio="none"
        className="absolute bottom-[calc(100%-1px)] left-1/2 h-[18px] w-[min(62vw,22rem)] -translate-x-1/2 text-basalt md:h-[26px]"
      >
        <path d="M0 26 C 14 26 18 24 24 18 L 36 6 C 40 2 44 0 52 0 H 308 C 316 0 320 2 324 6 L 336 18 C 342 24 346 26 360 26 Z" fill="currentColor" />
      </svg>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[inherit]">
        <StrataLines tone="bronze" seed={seed} count={14} />
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
