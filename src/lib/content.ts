import { absoluteUrl } from "@/lib/catalog";

export const guides = [
  {
    slug: "vitamin-c-routine-pakistan",
    title: "Vitamin C Routine For Bright Skin In Pakistan",
    description:
      "A simple morning routine for dullness, uneven tone, and daily city exposure using cleanser, toner, serum, moisturizer, and SPF.",
    category: "Skin Care",
    readTime: "5 min",
    productQuery: "vitamin c",
    sections: [
      "Start with a gentle cleanser so serum applies evenly.",
      "Use toner if your skin tolerates it and you want a fresher finish.",
      "Apply Vitamin C serum before moisturizer in the morning.",
      "Finish with sunscreen when you are going outdoors.",
    ],
  },
  {
    slug: "hair-fall-routine-pakistan",
    title: "Hair Fall Control Routine For Weak Hair",
    description:
      "A practical routine for hair fall, breakage, dry ends, and weak roots using shampoo, conditioner, mask, oil, and serum.",
    category: "Hair Care",
    readTime: "6 min",
    productQuery: "hair",
    sections: [
      "Keep scalp cleansing consistent instead of switching products every few days.",
      "Use conditioner on lengths, not the scalp, to reduce roughness.",
      "Add a mask weekly when hair feels dry or brittle.",
      "Use oil and serum as support products, not replacements for cleansing.",
    ],
  },
  {
    slug: "sulfate-free-shampoo-guide",
    title: "How To Choose Sulfate Free Shampoo",
    description:
      "What to look for when buying sulfate free shampoo for dry, frizzy, treated, or falling hair in Pakistan.",
    category: "Hair Care",
    readTime: "4 min",
    productQuery: "sulfate free shampoo",
    sections: [
      "Choose by scalp concern first, then by hair length and texture.",
      "Pair shampoo with conditioner if your ends become rough after wash day.",
      "Use a bundle when you want a complete routine without mismatched products.",
      "Keep expectations realistic: consistency matters more than one heavy wash.",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideJsonLd(guide: (typeof guides)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: absoluteUrl(`/blog/${guide.slug}`),
    author: {
      "@type": "Organization",
      name: "MHB Natural",
    },
    publisher: {
      "@type": "Organization",
      name: "MHB Natural",
    },
  };
}
