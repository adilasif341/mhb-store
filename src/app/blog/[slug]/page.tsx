import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { filterProducts } from "@/lib/catalog";
import { getGuideBySlug, getGuideJsonLd, guides } from "@/lib/content";

type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const products = filterProducts({ q: guide.productQuery }).slice(0, 4);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getGuideJsonLd(guide)) }}
      />
      <Link href="/blog" className="text-sm font-bold text-brand">
        Back to guides
      </Link>
      <p className="mt-6 text-sm font-black uppercase text-accent">{guide.category}</p>
      <h1 className="mt-2 text-4xl font-black leading-tight">{guide.title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{guide.description}</p>
      <div className="mt-8 grid gap-4">
        {guide.sections.map((section, index) => (
          <section key={section} className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-xl font-black">Step {index + 1}</h2>
            <p className="mt-3 leading-7 text-muted">{section}</p>
          </section>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="text-2xl font-black">Products for this routine</h2>
        <div className="mt-5">
          <ProductGrid products={products} />
        </div>
      </section>
    </article>
  );
}
