import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { ShopFilters } from "@/components/shop-filters";
import { filterProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop MHB Natural skincare, hair care, bundles, serums, face wash, moisturizers, and oils in Pakistan.",
};

type ShopPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    concern?: string;
    ingredient?: string;
    sort?: string;
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const products = filterProducts(params);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-black uppercase text-accent">MHB store</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Shop all products</h1>
        <p className="mt-3 max-w-2xl text-muted">
          {products.length} products from the migrated MHB inventory.
        </p>
      </div>
      <ShopFilters defaults={params} />
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
