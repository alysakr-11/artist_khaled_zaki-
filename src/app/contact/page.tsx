import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm, { ContactFormWithSubject } from "@/components/ContactForm";
import DarkSection from "@/components/DarkSection";
import PageIntro from "@/components/PageIntro";
import { ArrowUpRight, Mail, Phone, Pin } from "@/components/icons";
import { email, formatPhone, mapsEmbed, mapsLink, socials, studios } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Khaled Zaki — 6th of October City, Giza, Egypt and Valdicastello, Pietrasanta, Italy.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Enquiries"
        title="Contact"
        seed={97}
        aside={<p>For works, commissions, exhibitions or press — write, or call in Egypt or Italy.</p>}
      />

      <section className="wrap -mt-4 pb-24 md:pb-32" aria-label="Send a message">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="rounded-2xl border border-ink/10 bg-stone-deep/50 p-6 md:p-10 lg:col-span-7">
            <h2 className="display text-[clamp(2rem,4vw,3rem)]">Write</h2>
            <div className="mt-8">
              <Suspense fallback={<ContactForm subject="" />}>
                <ContactFormWithSubject />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">Direct</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${email}`} className="pill pill-outline w-full justify-between">
                  <span className="inline-flex items-center gap-3">
                    <Mail size={15} /> Email
                  </span>
                  <span className="truncate font-medium tracking-normal normal-case">{email}</span>
                </a>
              </li>
              {studios.map((s) => (
                <li key={s.country}>
                  <a href={`tel:${s.phone}`} className="pill pill-outline w-full justify-between">
                    <span className="inline-flex items-center gap-3">
                      <Phone size={15} /> {s.country}
                    </span>
                    <span className="font-medium tracking-normal normal-case tabular-nums">{formatPhone(s.phone)}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12">Elsewhere</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="pill pill-outline">
                    {s.label} <ArrowUpRight size={13} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DarkSection seed={101} labelledBy="studios-title">
        <div className="wrap py-20 md:py-28">
          <p className="eyebrow">Addresses</p>
          <h2 id="studios-title" className="display mt-5 text-[clamp(2.6rem,6vw,4.6rem)]">
            Egypt <span className="display-italic text-bronze">&amp;</span> Italy
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {studios.map((s) => (
              <article key={s.country} data-reveal className="overflow-hidden rounded-2xl bg-basalt-rise ring-1 ring-chalk/10">
                <div className="relative aspect-[16/10] bg-basalt">
                  <iframe
                    title={`Map: ${s.address}`}
                    src={mapsEmbed(s.mapQuery)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full grayscale-[0.85] contrast-[0.95] invert-[0.9] hue-rotate-180"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="display text-4xl">{s.country}</h3>
                  <address className="mt-4 not-italic leading-relaxed text-chalk/85">{s.address}</address>
                  <dl className="mt-4 text-sm text-chalk-muted">
                    <dt className="sr-only">{s.phoneLabel}</dt>
                    <dd>
                      {s.phoneLabel}:{" "}
                      <a href={`tel:${s.phone}`} className="link-line text-chalk tabular-nums">
                        {formatPhone(s.phone)}
                      </a>
                    </dd>
                  </dl>
                  <a
                    href={mapsLink(s.mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill-outline mt-6 text-chalk"
                  >
                    <Pin size={14} /> Open in Google Maps
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </DarkSection>
    </>
  );
}
