import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/catalog";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "MHB Natural | Skincare and Hair Care Pakistan",
    template: "%s | MHB Natural",
  },
  description:
    "Shop original MHB Natural skincare, hair care, bundles, serums, face wash, moisturizers, and oils with nationwide delivery in Pakistan.",
  applicationName: "MHB Natural",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: "MHB Natural",
    title: "MHB Natural | Skincare and Hair Care Pakistan",
    description:
      "Natural, practical skincare and hair care routines for customers across Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
