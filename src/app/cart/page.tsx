import type { Metadata } from "next";
import { CartPageClient } from "@/app/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Cart",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <CartPageClient />
    </div>
  );
}
