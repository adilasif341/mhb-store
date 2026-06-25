import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { categories, getProductsByCategory } from "@/lib/catalog";
import { toSlug, titleCase } from "@/lib/format";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: toSlug(category) }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${titleCase(slug)} Products`,
    description: `Shop ${titleCase(slug)} products by MHB Natural in Pakistan.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const products = getProductsByCategory(slug);
  if (!products.length) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase text-accent">Collection</p>
      <h1 className="mt-2 text-3xl font-black sm:text-4xl">{products[0].category}</h1>
      <p className="mt-3 text-muted">{products.length} products available.</p>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
