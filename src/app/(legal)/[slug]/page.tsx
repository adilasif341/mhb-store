import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/legal-page-view";
import { absoluteUrl } from "@/lib/catalog";
import { getLegalPage, legalPages } from "@/lib/legal";

type LegalRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: LegalRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: absoluteUrl(`/${page.slug}`),
    },
  };
}

export default async function LegalRoutePage({ params }: LegalRouteProps) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return <LegalPageView page={page} />;
}
