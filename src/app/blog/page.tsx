import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skin and Hair Care Guides",
  description:
    "MHB Natural guides for skincare, hair fall, sulfate free shampoo, Vitamin C routines, and Pakistani weather.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase text-accent">Guides</p>
      <h1 className="mt-2 text-3xl font-black sm:text-4xl">Skin and hair care guides</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/blog/${guide.slug}`}
            className="rounded-lg border border-border bg-surface p-5 transition hover:border-brand"
          >
            <span className="text-xs font-black uppercase text-accent">{guide.category}</span>
            <h2 className="mt-3 text-xl font-black">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{guide.description}</p>
            <p className="mt-4 text-sm font-bold text-brand">{guide.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
