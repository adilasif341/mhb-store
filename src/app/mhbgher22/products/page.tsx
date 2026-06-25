import type { Metadata } from "next";
import Link from "next/link";
import { MerchantShell, StatusBadge } from "@/components/merchant-shell";
import { allProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Merchant Products",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerchantProductsPage() {
  return (
    <MerchantShell>
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="grid min-w-[900px] grid-cols-[1.5fr_140px_120px_120px_120px] gap-3 border-b border-border bg-surface-muted px-4 py-3 text-sm font-black">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
        </div>
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="grid min-w-[900px] grid-cols-[1.5fr_140px_120px_120px_120px] gap-3 border-b border-border px-4 py-3 text-sm last:border-b-0"
          >
            <Link href={`/products/${product.slug}`} className="font-bold hover:text-brand">
              {product.title}
            </Link>
            <span className="text-muted">{product.category}</span>
            <span className="font-bold">{formatPrice(product.price)}</span>
            <span className="font-bold">{product.stock}</span>
            <StatusBadge value={product.status} />
          </div>
        ))}
      </div>
    </MerchantShell>
  );
}
