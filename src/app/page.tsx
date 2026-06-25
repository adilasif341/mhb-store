import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import {
  categories,
  concerns,
  getFeaturedProducts,
  getNewArrivals,
  ingredients,
  publicProducts,
} from "@/lib/catalog";
import { formatNumber, toSlug } from "@/lib/format";

export default function Home() {
  const heroProduct = getFeaturedProducts(1)[0];
  const featured = getFeaturedProducts(8);
  const arrivals = getNewArrivals(4);
  const heroImage = heroProduct?.images[0] || "/window.svg";

  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto grid min-h-[calc(100svh-96px)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase text-accent">Original MHB products</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
              MHB Natural skincare and hair care in Pakistan
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Shop serums, face wash, moisturizers, sulfate-free shampoo, oils, and complete
              routines from the previous MHB catalog.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-md bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-strong"
              >
                Shop all products
              </Link>
              <Link
                href="/collections/bundles"
                className="rounded-md border border-border px-5 py-3 text-sm font-bold transition hover:border-brand hover:text-brand"
              >
                View bundles
              </Link>
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <div className="border-l-2 border-accent pl-3">
                <dt className="text-2xl font-black">{formatNumber(publicProducts.length)}</dt>
                <dd className="text-xs font-semibold text-muted">Live products</dd>
              </div>
              <div className="border-l-2 border-accent pl-3">
                <dt className="text-2xl font-black">{categories.length}</dt>
                <dd className="text-xs font-semibold text-muted">Categories</dd>
              </div>
              <div className="border-l-2 border-accent pl-3">
                <dt className="text-2xl font-black">{concerns.length}</dt>
                <dd className="text-xs font-semibold text-muted">Concerns</dd>
              </div>
            </dl>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-surface-muted">
            <Image
              src={heroImage}
              alt={heroProduct?.imageAlt || "MHB Natural product"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            {heroProduct ? (
              <Link
                href={`/products/${heroProduct.slug}`}
                className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 p-4 shadow-sm backdrop-blur"
              >
                <span className="text-xs font-black uppercase text-accent">Featured</span>
                <p className="mt-1 font-black text-foreground">{heroProduct.title}</p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="scrollbar-none flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/collections/${toSlug(category)}`}
                className="min-w-fit rounded-md bg-surface px-4 py-3 text-sm font-bold text-brand shadow-sm"
              >
                {category}
              </Link>
            ))}
            {ingredients.slice(0, 6).map((ingredient) => (
              <Link
                key={ingredient}
                href={`/ingredients/${toSlug(ingredient)}`}
                className="min-w-fit rounded-md border border-border bg-surface px-4 py-3 text-sm font-bold"
              >
                {ingredient}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Best sellers"
          title="Popular routines from the MHB catalog"
          actionHref="/shop"
          actionLabel="View shop"
        />
        <ProductGrid products={featured} />
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Shop by concern" title="Find products by skin and hair goal" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {concerns.slice(0, 8).map((concern) => (
              <Link
                key={concern}
                href={`/concerns/${toSlug(concern)}`}
                className="rounded-lg border border-border bg-background p-5 transition hover:border-brand hover:bg-surface"
              >
                <p className="font-black">{concern}</p>
                <p className="mt-2 text-sm text-muted">
                  {publicProducts.filter((product) => product.concerns.includes(concern)).length} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="New catalog"
          title="Freshly migrated products"
          actionHref="/shop?sort=stock"
          actionLabel="Browse inventory"
        />
        <ProductGrid products={arrivals} />
      </section>
    </>
  );
}
