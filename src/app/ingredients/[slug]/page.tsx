import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { getProductsByIngredient, ingredients } from "@/lib/catalog";
import { toSlug, titleCase } from "@/lib/format";

type IngredientPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ingredients.map((ingredient) => ({ slug: toSlug(ingredient) }));
}

export async function generateMetadata({ params }: IngredientPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${titleCase(slug)} Products`,
    description: `Shop MHB Natural products with ${titleCase(slug)} in Pakistan.`,
  };
}

export default async function IngredientPage({ params }: IngredientPageProps) {
  const { slug } = await params;
  const products = getProductsByIngredient(slug);
  if (!products.length) notFound();
  const ingredient = products
    .flatMap((product) => product.ingredients)
    .find((item) => toSlug(item) === slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase text-accent">Ingredient</p>
      <h1 className="mt-2 text-3xl font-black sm:text-4xl">{ingredient || titleCase(slug)}</h1>
      <p className="mt-3 text-muted">{products.length} products available.</p>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
