import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getReviewSummary } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] || "/window.svg";
  const rating = getReviewSummary(product.slug);
  const discount =
    product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-surface-muted">
        {discount > 0 ? (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-accent px-2 py-1 text-xs font-bold text-white">
            Save {discount}%
          </span>
        ) : null}
        <Image
          src={image}
          alt={product.imageAlt || product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold text-muted">
          <span>{product.category}</span>
          <span>{rating.count ? `${rating.average}/5` : "New"}</span>
        </div>
        <Link href={`/products/${product.slug}`} className="line-clamp-2 font-bold leading-6 hover:text-brand">
          {product.title}
        </Link>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-lg font-black text-brand">{formatPrice(product.price)}</p>
            {product.compareAtPrice > product.price ? (
              <p className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</p>
            ) : null}
          </div>
          <AddToCartButton
            product={{
              slug: product.slug,
              title: product.title,
              price: product.price,
              image,
              category: product.category,
            }}
            className="min-w-28"
          />
        </div>
      </div>
    </article>
  );
}
