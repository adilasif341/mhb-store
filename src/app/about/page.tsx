import type { Metadata } from "next";
import Link from "next/link";
import { categories, publicProducts, siteConfig } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About MHB Natural",
  description:
    "Learn about MHB Natural, a Pakistan-focused skincare and hair care store by Memoona Health and Beauty.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-sm font-black uppercase text-accent">About</p>
          <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
            MHB Natural by Memoona Health and Beauty
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            MHB Natural is an ecommerce store for practical skincare, hair care, and daily
            personal care routines made for customers across Pakistan.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-md bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-strong"
            >
              Shop products
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-border px-5 py-3 text-sm font-bold transition hover:border-brand hover:text-brand"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="text-sm font-black uppercase text-accent">Store snapshot</p>
          <dl className="mt-5 grid gap-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <dt className="font-bold text-muted">Products</dt>
              <dd className="text-2xl font-black text-brand">{publicProducts.length}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <dt className="font-bold text-muted">Categories</dt>
              <dd className="text-2xl font-black text-brand">{categories.length}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-bold text-muted">Support</dt>
              <dd className="text-right text-sm font-bold">{siteConfig.phone}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Routine-first catalog",
            body: "Products are grouped by skin goals, hair concerns, ingredients, and bundles so customers can choose complete routines.",
          },
          {
            title: "Pakistan delivery focus",
            body: "The store is structured around local delivery, Cash on Delivery support, order tracking, and WhatsApp assistance.",
          },
          {
            title: "Trust and clarity",
            body: "Product pages include usage guidance, ingredients, reviews, policies, and customer support details.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-xl font-black">{item.title}</h2>
            <p className="mt-3 leading-7 text-muted">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
