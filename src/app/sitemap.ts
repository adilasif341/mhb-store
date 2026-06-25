import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  categories,
  concerns,
  imageUrl,
  ingredients,
  publicProducts,
} from "@/lib/catalog";
import { guides } from "@/lib/content";
import { toSlug } from "@/lib/format";
import { legalPages } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/shop"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: absoluteUrl("/legal"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = publicProducts.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
    images: product.images.slice(0, 3).map(imageUrl),
  }));

  const collectionRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/collections/${toSlug(category)}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const concernRoutes: MetadataRoute.Sitemap = concerns.map((concern) => ({
    url: absoluteUrl(`/concerns/${toSlug(concern)}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const ingredientRoutes: MetadataRoute.Sitemap = ingredients.map((ingredient) => ({
    url: absoluteUrl(`/ingredients/${toSlug(ingredient)}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.72,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/blog/${guide.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const legalRoutes: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...collectionRoutes,
    ...concernRoutes,
    ...ingredientRoutes,
    ...guideRoutes,
    ...legalRoutes,
  ];
}
