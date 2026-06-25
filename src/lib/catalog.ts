import ordersData from "@/generated/orders.json";
import productsData from "@/generated/products.json";
import reviewsData from "@/generated/reviews.json";
import { toSlug } from "@/lib/format";
import type { Product, Review, StoreOrder } from "@/lib/types";

export const siteConfig = {
  name: "MHB Natural",
  legalName: "Memoona Health and Beauty",
  url: "https://mhb.com.pk",
  phone: "+92 334 2723200",
  whatsapp: "https://wa.me/923342723200",
  email: "support@mhb.com.pk",
};

export const allProducts = productsData as Product[];
export const publicProducts = allProducts.filter((product) => product.published);
export const allOrders = ordersData as StoreOrder[];
export const allReviews = reviewsData as Review[];

export const categories = unique(publicProducts.map((product) => product.category));
export const concerns = unique(publicProducts.flatMap((product) => product.concerns)).sort();
export const ingredients = unique(publicProducts.flatMap((product) => product.ingredients)).sort();

export function absoluteUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}

export function imageUrl(src: string) {
  return src.startsWith("/") ? absoluteUrl(src) : src;
}

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}

export function getPublicProductBySlug(slug: string) {
  return publicProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return publicProducts.filter((product) => toSlug(product.category) === categorySlug);
}

export function getProductsByConcern(concernSlug: string) {
  return publicProducts.filter((product) =>
    product.concerns.some((concern) => toSlug(concern) === concernSlug),
  );
}

export function getProductsByIngredient(ingredientSlug: string) {
  return publicProducts.filter((product) =>
    product.ingredients.some((ingredient) => toSlug(ingredient) === ingredientSlug),
  );
}

export function getFeaturedProducts(limit = 8) {
  return [...publicProducts]
    .sort((a, b) => scoreProduct(b) - scoreProduct(a))
    .slice(0, limit);
}

export function getNewArrivals(limit = 8) {
  return publicProducts.slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return publicProducts
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => ({
      product: candidate,
      score:
        (candidate.category === product.category ? 4 : 0) +
        overlap(candidate.concerns, product.concerns) * 2 +
        overlap(candidate.ingredients, product.ingredients),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}

export function filterProducts(options: {
  q?: string;
  category?: string;
  concern?: string;
  ingredient?: string;
  sort?: string;
}) {
  const query = options.q?.trim().toLowerCase();
  let products = publicProducts.filter((product) => {
    const matchesQuery = query
      ? [product.title, product.description, product.tags.join(" "), product.ingredients.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(query)
      : true;
    const matchesCategory = options.category
      ? toSlug(product.category) === options.category
      : true;
    const matchesConcern = options.concern
      ? product.concerns.some((concern) => toSlug(concern) === options.concern)
      : true;
    const matchesIngredient = options.ingredient
      ? product.ingredients.some((ingredient) => toSlug(ingredient) === options.ingredient)
      : true;

    return matchesQuery && matchesCategory && matchesConcern && matchesIngredient;
  });

  if (options.sort === "price-asc") products = products.sort((a, b) => a.price - b.price);
  if (options.sort === "price-desc") products = products.sort((a, b) => b.price - a.price);
  if (options.sort === "stock") products = products.sort((a, b) => b.stock - a.stock);
  if (!options.sort || options.sort === "featured") {
    products = products.sort((a, b) => scoreProduct(b) - scoreProduct(a));
  }

  return products;
}

export function getReviewsForProduct(slug: string, limit = 6) {
  const direct = allReviews.filter((review) => review.productSlug === slug && review.content);
  const pool = direct.length ? direct : allReviews.filter((review) => review.content);
  return pool.slice(0, limit);
}

export function getReviewSummary(slug: string) {
  const reviews = allReviews.filter((review) => review.productSlug === slug && review.content);
  if (!reviews.length) return { average: 4.8, count: 0 };
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return { average: Math.round(average * 10) / 10, count: reviews.length };
}

export function getOrderStats() {
  const revenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const pending = allOrders.filter((order) => order.fulfillmentStatus !== "fulfilled").length;
  const paid = allOrders.filter((order) => order.financialStatus === "paid").length;
  return {
    revenue,
    pending,
    paid,
    totalOrders: allOrders.length,
    averageOrderValue: allOrders.length ? revenue / allOrders.length : 0,
  };
}

export function getLowStockProducts(limit = 12) {
  return allProducts
    .filter((product) => product.status === "active")
    .sort((a, b) => a.stock - b.stock)
    .slice(0, limit);
}

export function getProductJsonLd(product: Product) {
  const summary = getReviewSummary(product.slug);
  const image = product.images[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map(imageUrl),
    description: product.seoDescription,
    sku: product.variants[0]?.sku || product.id,
    brand: {
      "@type": "Brand",
      name: "MHB Natural",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "PKR",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(summary.count
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: summary.average,
            reviewCount: summary.count,
          },
        }
      : {}),
    ...(image
      ? {
          thumbnailUrl: imageUrl(image),
        }
      : {}),
  };
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function overlap(a: string[], b: string[]) {
  return a.filter((value) => b.includes(value)).length;
}

function scoreProduct(product: Product) {
  return (
    product.stock +
    (product.compareAtPrice > product.price ? 20 : 0) +
    getReviewSummary(product.slug).count * 3 +
    product.images.length
  );
}
