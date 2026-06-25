import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/catalog";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/mhbgher22/", "/checkout/", "/cart/", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
