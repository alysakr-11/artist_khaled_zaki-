"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { email } from "@/content/site";
import { ArrowUpRight, Mail } from "./icons";

const field =
  "mt-2 w-full rounded-xl border border-ink/15 bg-stone/60 px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 transition-colors focus:border-porphyry focus:bg-stone focus:outline-none";
const label = "text-[0.7rem] font-bold tracking-[0.18em] text-ink-soft uppercase";

// Prefills the subject from ?subject= (set by the "Enquire" buttons on artwork pages).
export function ContactFormWithSubject() {
  const params = useSearchParams();
  return <ContactForm subject={params.get("subject") ?? ""} />;
}

// There is no mail server behind this site: the form composes the message in the visitor's email app.
export default function ContactForm({ subject: initialSubject }: { subject: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim() || "Enquiry from khaled-zaki.com";
    const message = String(data.get("message") ?? "").trim();
    const body = [message, "", "—", name, from, phone].filter((line, i) => i < 3 || line).join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>
            Phone <span className="font-normal tracking-normal normal-case">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block">
          <span className={label}>Subject</span>
          <input name="subject" defaultValue={initialSubject} key={initialSubject} className={field} placeholder="A work, a commission, an exhibition…" />
        </label>
      </div>
      <label className="block">
        <span className={label}>Message</span>
        <textarea name="message" required rows={6} className={`${field} resize-y`} />
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-sm text-sm text-ink-muted">
          Sending opens your email app with the message ready to go to{" "}
          <a href={`mailto:${email}`} className="link-line text-ink">
            {email}
          </a>
          .
        </p>
        <button type="submit" className="pill pill-solid self-start sm:self-auto">
          <Mail size={14} /> Send <ArrowUpRight size={14} />
        </button>
      </div>
      <p role="status" className="text-sm text-porphyry">
        {sent &&
          `Your email app should now be open with the message. If nothing happened, please write directly to ${email}.`}
      </p>
    </form>
  );
}
