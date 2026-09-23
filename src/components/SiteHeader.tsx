"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuOverlay from "./MenuOverlay";

// Sections that sit on a dark ground mark themselves with data-header="dark" so the header can invert.
function useHeaderState() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const probe = 36;
      let isDark = false;
      document.querySelectorAll<HTMLElement>("[data-header='dark']").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) isDark = true;
      });
      setDark(isDark);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Pages swap under a persistent header; re-check when the DOM changes.
    const observer = new MutationObserver(onScroll);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return { scrolled, dark };
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrolled, dark } = useHeaderState();

  // Close the menu whenever the route changes (including browser back/forward).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  const onDark = dark;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={[
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-500",
          scrolled ? "border-b backdrop-blur-md" : "border-b border-transparent",
          onDark
            ? "on-dark text-chalk " + (scrolled ? "border-chalk/10 bg-basalt/80" : "")
            : "text-ink " + (scrolled ? "border-ink/10 bg-stone/80" : ""),
        ].join(" ")}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-[1.32rem] leading-[0.9] font-semibold tracking-[-0.01em] uppercase"
            aria-label="Khaled Zaki — home"
          >
            Khaled
            <br />
            Zaki
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="pill pill-accent hidden sm:inline-flex">
              Enquire
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label="Open navigation menu"
              className={[
                "group grid size-11 place-items-center rounded-xl border transition-colors duration-500",
                onDark
                  ? "border-chalk/25 hover:bg-chalk hover:text-ink"
                  : "border-ink/20 hover:bg-ink hover:text-chalk",
              ].join(" ")}
            >
              <span aria-hidden="true" className="flex w-[1.1rem] flex-col items-end gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-[70%] bg-current transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay open={open} onClose={close} />
    </>
  );
}
