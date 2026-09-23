import Link from "next/link";
import StrataLines from "@/components/StrataLines";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden pt-[var(--header-h)]">
      <StrataLines seed={404} />
      <div className="wrap relative py-24">
        <p className="eyebrow">Page not found</p>
        <h1 className="display mt-5 text-[clamp(3.2rem,10vw,8rem)]">
          Lost
          <span className="display-italic block text-[0.55em] leading-[1.15] text-porphyry">in the stone</span>
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
          This page doesn’t exist, or it has moved with the new site.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="pill pill-solid">
            Home <ArrowUpRight size={14} />
          </Link>
          <Link href="/sculptures" className="pill pill-outline">
            Sculptures <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
