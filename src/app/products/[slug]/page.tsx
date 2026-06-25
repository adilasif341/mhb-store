import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGrid } from "@/components/product-grid";
import {
  absoluteUrl,
  getProductJsonLd,
  getPublicProductBySlug,
  getRelatedProducts,
  getReviewsForProduct,
  getReviewSummary,
  publicProducts,
} from "@/lib/catalog";
import { formatPrice, toSlug } from "@/lib/format";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publicProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getPublicProductBySlug(slug);
  if (!product) return {};

  return {
    title: {
      absolute: product.seoTitle,
    },
    description: product.seoDescription,
    alternates: {
      canonical: absoluteUrl(`/products/${product.slug}`),
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: product.images[0] ? [{ url: product.images[0], alt: product.imageAlt }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getPublicProductBySlug(slug);
  if (!product) notFound();

  const image = product.images[0] || "/window.svg";
  const reviews = getReviewsForProduct(product.slug);
  const rating = getReviewSummary(product.slug);
  const related = getRelatedProducts(product);
  const jsonLd = getProductJsonLd(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-5 text-sm font-semibold text-muted">
        <Link href="/shop" className="hover:text-brand">
          Shop
        </Link>
        <span> / </span>
        <Link href={`/collections/${toSlug(product.category)}`} className="hover:text-brand">
          {product.category}
        </Link>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-muted">
            <Image
              src={image}
              alt={product.imageAlt || product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {product.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1, 5).map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-md bg-surface-muted">
                  <Image
                    src={src}
                    alt={product.title}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-sm font-black uppercase text-accent">{product.category}</p>
          <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">{product.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted">
            <span>{rating.count ? `${rating.average}/5 from ${rating.count} reviews` : "New product"}</span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-black text-brand">{formatPrice(product.price)}</p>
            {product.compareAtPrice > product.price ? (
              <p className="text-lg text-muted line-through">{formatPrice(product.compareAtPrice)}</p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartButton
              product={{
                slug: product.slug,
                title: product.title,
                price: product.price,
                image,
                category: product.category,
              }}
              label="Add to cart"
              className="px-6"
            />
            <Link
              href="/checkout"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand px-6 py-2 text-sm font-bold text-brand transition hover:bg-surface-muted"
            >
              Checkout
            </Link>
          </div>

          <div className="mt-8 grid gap-4 rounded-lg border border-border bg-surface p-5">
            <h2 className="text-xl font-black">Product details</h2>
            <p className="leading-7 text-muted">{product.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-black uppercase">Concerns</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(product.concerns.length ? product.concerns : ["Daily Care"]).map((concern) => (
                    <Link
                      key={concern}
                      href={`/concerns/${toSlug(concern)}`}
                      className="rounded-md bg-surface-muted px-3 py-2 text-sm font-semibold"
                    >
                      {concern}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-black uppercase">Ingredients</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(product.ingredients.length ? product.ingredients : ["MHB formula"]).map((ingredient) => (
                    <Link
                      key={ingredient}
                      href={`/ingredients/${toSlug(ingredient)}`}
                      className="rounded-md bg-accent-soft px-3 py-2 text-sm font-semibold text-brand"
                    >
                      {ingredient}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-border bg-surface p-5">
          <h2 className="text-xl font-black">How to use</h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            <li>1. Use on clean skin or hair as part of your routine.</li>
            <li>2. Patch test before first full use.</li>
            <li>3. Keep away from eyes and discontinue if irritation occurs.</li>
            <li>4. Store in a cool, dry place.</li>
          </ol>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <h2 className="text-xl font-black">Customer reviews</h2>
          <div className="mt-4 grid gap-3">
            {reviews.map((review) => (
              <figure key={review.id} className="rounded-md bg-background p-4">
                <div className="text-sm font-bold text-accent">{"*".repeat(review.rating)}</div>
                <blockquote className="mt-2 text-sm leading-6 text-muted">{review.content}</blockquote>
                <figcaption className="mt-3 text-sm font-bold">{review.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <p className="text-sm font-black uppercase text-accent">Related</p>
          <h2 className="mt-1 text-2xl font-black">Complete the routine</h2>
        </div>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
