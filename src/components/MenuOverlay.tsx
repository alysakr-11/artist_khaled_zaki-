"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatPhone, navigation, socials, studios } from "@/content/site";
import StrataLines from "./StrataLines";
import { ChevronDown, Close, Phone } from "./icons";

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      inert={!open}
      className={[
        "on-dark fixed inset-0 z-50 overflow-y-auto bg-basalt text-chalk",
        "transition-[clip-path,opacity] duration-[900ms] ease-[var(--ease-in-out-quint)]",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      style={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
    >
      <StrataLines tone="bronze" seed={23} count={18} className="opacity-70" />

      <div className="wrap relative flex min-h-full flex-col">
        <div className="flex h-[var(--header-h)] items-center justify-between">
          <span className="font-display text-[1.32rem] leading-[0.9] font-semibold uppercase" aria-hidden="true">
            Khaled
            <br />
            Zaki
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="pill bg-chalk text-ink hover:bg-bronze"
            aria-label="Close navigation menu"
          >
            Close <Close size={15} />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 pt-6 pb-12 md:pt-10">
          <ul className="space-y-1 md:space-y-0">
            {navigation.map((item, i) => {
              const hasChildren = !!item.children?.length;
              const isOpen = expanded === item.label;
              return (
                <li
                  key={item.href}
                  className={open ? "fade-in" : "opacity-0"}
                  style={{ ["--fade-delay" as string]: 260 + i * 70 }}
                >
                  <div className="flex items-center gap-3 md:gap-5">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={[
                        "display text-[clamp(2.6rem,min(9vw,10dvh),5.6rem)] leading-[1.02] transition-colors duration-500",
                        isActive(item.href) ? "text-bronze" : "hover:text-bronze",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        aria-controls={`submenu-${i}`}
                        aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} sections`}
                        className="grid size-11 shrink-0 place-items-center rounded-full border border-chalk/20 transition-colors hover:border-bronze hover:text-bronze"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                  {hasChildren && (
                    <div
                      id={`submenu-${i}`}
                      className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="flex flex-wrap gap-x-7 gap-y-2 overflow-hidden" inert={!isOpen}>
                        {item.children!.map((child) => (
                          <li key={child.href} className="pt-2 pb-4">
                            <Link
                              href={child.href}
                              onClick={onClose}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={`link-line text-sm font-semibold tracking-[0.16em] uppercase ${
                                isActive(child.href) ? "text-bronze" : "text-chalk-muted hover:text-chalk"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-8 border-t border-chalk/15 py-8 md:grid-cols-2">
          <div>
            <p className="eyebrow !text-chalk-muted">Call</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {studios.map((s) => (
                <a key={s.country} href={`tel:${s.phone}`} className="pill pill-outline text-chalk">
                  <Phone size={14} /> {s.country} <span className="sr-only">{formatPhone(s.phone)}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow !text-chalk-muted">Elsewhere</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line text-chalk-muted hover:text-chalk">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
