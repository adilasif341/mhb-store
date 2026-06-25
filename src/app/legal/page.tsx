import type { Metadata } from "next";
import Link from "next/link";
import { legalPages } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal Pages",
  description:
    "MHB Natural policies for privacy, terms, shipping, returns, cancellations, payments, cookies, and product disclaimers.",
};

export default function LegalIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase text-accent">Legal</p>
      <h1 className="mt-2 text-4xl font-black leading-tight">Legal pages and store policies</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
        Customer policies for ordering, payment, delivery, returns, privacy, and safe product use.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {legalPages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className="rounded-lg border border-border bg-surface p-5 transition hover:border-brand"
          >
            <p className="text-sm font-black uppercase text-accent">Updated {page.updatedAt}</p>
            <h2 className="mt-2 text-xl font-black">{page.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
