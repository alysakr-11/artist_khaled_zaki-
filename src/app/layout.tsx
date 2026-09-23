import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Naskh_Arabic } from "next/font/google";
import { ViewTransition } from "react";
import RevealObserver from "@/components/RevealObserver";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.khaled-zaki.com"),
  title: {
    default: "Khaled Zaki — Sculptor",
    template: "%s — Khaled Zaki",
  },
  description:
    "Egyptian sculptor Khaled Zaki, born in Suez in 1964: works in stone and bronze made between Egypt and Pietrasanta, Italy, shown in the Egyptian Pavilion of the 2013 Venice Biennale.",
  openGraph: {
    type: "website",
    siteName: "Khaled Zaki",
    images: [{ url: "/art/home/02.jpg", width: 1500, height: 1000 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#efebe4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${naskh.variable} antialiased`}
    >
      <head>
        {/* Opt in to scroll-reveal styles before first paint; without JS, content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="pill pill-solid fixed top-3 left-3 z-[60] -translate-y-24 focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <ViewTransition>
          <main id="main" className="flex-1">
            {children}
          </main>
        </ViewTransition>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
