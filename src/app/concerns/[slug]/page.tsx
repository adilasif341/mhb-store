import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { concerns, getProductsByConcern } from "@/lib/catalog";
import { toSlug, titleCase } from "@/lib/format";

type ConcernPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return concerns.map((concern) => ({ slug: toSlug(concern) }));
}

export async function generateMetadata({ params }: ConcernPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${titleCase(slug)} Routine`,
    description: `Shop MHB Natural products for ${titleCase(slug)} in Pakistan.`,
  };
}

export default async function ConcernPage({ params }: ConcernPageProps) {
  const { slug } = await params;
  const products = getProductsByConcern(slug);
  if (!products.length) notFound();
  const concern = products.flatMap((product) => product.concerns).find((item) => toSlug(item) === slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase text-accent">Concern</p>
      <h1 className="mt-2 text-3xl font-black sm:text-4xl">{concern || titleCase(slug)}</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Products selected from the MHB catalog for this skin or hair goal.
      </p>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
