import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contact MHB Natural",
  description:
    "Contact MHB Natural for product questions, order support, delivery help, returns, and ecommerce assistance in Pakistan.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase text-accent">Contact</p>
          <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
            Talk to MHB Natural support
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            For product questions, order confirmation, delivery updates, returns, or complaints,
            contact the team through WhatsApp or email.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteConfig.whatsapp}
              className="rounded-md bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-strong"
            >
              WhatsApp support
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-md border border-border px-5 py-3 text-sm font-bold transition hover:border-brand hover:text-brand"
            >
              Email us
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <ContactCard label="WhatsApp" value={siteConfig.phone} href={siteConfig.whatsapp} />
          <ContactCard label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
          <ContactCard label="Order help" value="Track an order" href="/order-tracking" />
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-2xl font-black">Support checklist</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            "Order number or phone number used at checkout",
            "Product name and clear photos if there is an issue",
            "Delivery city, courier status, and any notes from the rider",
          ].map((item) => (
            <div key={item} className="rounded-md bg-background p-4 text-sm font-semibold leading-6 text-muted">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-border bg-surface p-5 transition hover:border-brand">
      <p className="text-sm font-black uppercase text-accent">{label}</p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </Link>
  );
}
