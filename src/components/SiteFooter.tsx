import Link from "next/link";
import { formatPhone, navigation, socials, studios } from "@/content/site";
import StrataLines from "./StrataLines";
import { Phone } from "./icons";

export default function SiteFooter() {
  return (
    <footer data-header="dark" className="on-dark relative overflow-hidden border-t border-chalk/10 bg-basalt text-chalk">
      <StrataLines tone="bronze" seed={41} count={12} />
      <div className="wrap relative py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link href="/" className="display block text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.88]">
            Khaled
            <br />
            Zaki
          </Link>
          <div className="flex flex-wrap gap-2">
            {studios.map((s) => (
              <a key={s.country} href={`tel:${s.phone}`} className="pill pill-outline text-chalk">
                <Phone size={14} />
                <span>
                  {s.country} <span className="sr-only">{formatPhone(s.phone)}</span>
                </span>
              </a>
            ))}
            <Link href="/contact" className="pill bg-chalk text-ink hover:bg-bronze">
              Write
            </Link>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-14 border-t border-chalk/10 pt-8">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line text-chalk-muted hover:text-chalk">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-4 text-sm text-chalk-muted sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line hover:text-chalk">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} Khaled Zaki · Egypt &amp; Pietrasanta, Italy</p>
        </div>
      </div>
    </footer>
  );
}
